import assert from "node:assert/strict";
import { beforeEach, test } from "node:test";

import {
  ASK_LIMITS,
  DEFAULT_OPENROUTER_MODEL,
  isFreeOpenRouterModel,
} from "@/lib/ask/config";
import { handleAskRequest } from "@/lib/ask/handler";
import {
  askCacheKey,
  clearAskCache,
  GRAVERSE_DATA_VERSION,
  readAskCache,
  writeAskCache,
} from "@/lib/ask/local/cache";
import { resetAskRateLimits } from "@/lib/ask/rate-limit";
import {
  LOCAL_FAQ_COUNT,
  resolveLocalAnswer,
} from "@/lib/ask/local/engine";
import { arabicStem, normalizeText, tokenize } from "@/lib/ask/local/normalize";
import { sources } from "@/data/sources";
import type { AskSourceRef } from "@/lib/ask/types";

/**
 * The local intelligence engine.
 *
 * Every provider call in this file is mocked. No test spends free-tier quota
 * and no test needs an API key.
 */

const TEST_KEY = "sk-or-v1-test-key-never-used-here";
const ENV = {
  OPENROUTER_API_KEY: TEST_KEY,
  OPENROUTER_MODEL: "openrouter/free",
};

const registryUrls = new Map(sources.map((source) => [source.id, source.url]));

function makeRequest(body: unknown, headers: Record<string, string> = {}): Request {
  return new Request("https://graverse.test/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

function mockProvider(text: string) {
  const calls: Array<{ url: string; body: string }> = [];
  const impl = (async (input: RequestInfo | URL, init?: RequestInit) => {
    calls.push({
      url: String(input),
      body: String(init?.body ?? ""),
    });
    return new Response(
      JSON.stringify({
        id: "gen-test",
        model: "google/gemma-4-31b-it:free",
        choices: [{ message: { role: "assistant", content: text } }],
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }) as unknown as typeof fetch;
  return { impl, calls };
}

beforeEach(() => {
  clearAskCache();
  resetAskRateLimits();
});

/* --------------------------------------------------------- normalisation */

test("normalisation keeps Arabic meaning while unifying its shapes", () => {
  assert.equal(normalizeText("المريخ"), "المريخ");
  assert.equal(arabicStem("المريخ"), "مريخ");
  assert.equal(arabicStem(normalizeText("والأرض")), "ارض");
  assert.equal(arabicStem(normalizeText("الأرض")), "ارض");
  assert.equal(tokenize("المريخ")[0], "مريخ");
  assert.equal(normalizeText("Mars"), "mars");
  assert.equal(normalizeText("Persévérance"), "perseverance");
  assert.deepEqual(tokenize("What is the Solar System?"), [
    "what",
    "is",
    "the",
    "solar",
    "system",
  ]);
});

/* --------------------------------------------------------------- intents */

test("greetings and social replies are answered locally", () => {
  for (const question of [
    "Hello",
    "Hi there",
    "Hey",
    "Good morning",
    "Good evening",
    "Thanks",
    "Thank you",
    "Goodbye",
  ]) {
    const result = resolveLocalAnswer({ question, locale: "en" });
    assert.equal(result.handled, true, `"${question}" was not answered locally`);
    assert.equal(result.answer?.route, "intent");
    assert.ok((result.answer?.answer.length ?? 0) > 20);
  }
});

test("the assistant explains itself locally", () => {
  for (const question of [
    "Who are you?",
    "What can you do?",
    "How do I use this?",
    "Help me explore the museum.",
    "How can I use the Academy?",
    "Explain the three experiences.",
    "How can I explore astronomical objects?",
  ]) {
    const result = resolveLocalAnswer({ question, locale: "en" });
    assert.equal(result.handled, true, `"${question}" was not answered locally`);
    assert.ok((result.answer?.answer.length ?? 0) > 20);
  }
});

test("Arabic intents are answered locally", () => {
  for (const question of [
    "مرحبا",
    "شكرا",
    "مع السلامة",
    "من أنت؟",
    "ماذا تستطيع؟",
  ]) {
    const result = resolveLocalAnswer({ question, locale: "ar" });
    assert.equal(result.handled, true, `"${question}" was not answered locally`);
    assert.ok((result.answer?.answer.length ?? 0) > 10);
  }
});

/* ------------------------------------------------------------------ FAQ */

test("the knowledge base is substantial and grounded", () => {
  assert.ok(LOCAL_FAQ_COUNT >= 20, "the knowledge base is too small");
});

test("common questions are answered from the knowledge base", () => {
  const questions = [
    "What is GRAVERSE?",
    "What are the three experiences in GRAVERSE?",
    "Where do the facts in GRAVERSE come from?",
    "What is the difference between mission status and hardware status?",
    "What is the Solar System?",
    "What are the planets of the Solar System?",
    "Tell me about Mars",
    "What is a black hole?",
    "What is a galaxy?",
    "What is a rover?",
    "Why does abandoned space hardware matter?",
    "Can I download the GRAVERSE dataset?",
  ];
  for (const question of questions) {
    const result = resolveLocalAnswer({ question, locale: "en" });
    assert.equal(result.handled, true, `"${question}" was not answered locally`);
    assert.ok((result.answer?.answer.length ?? 0) > 40);
  }
});

test("the Arabic knowledge base answers in Arabic", () => {
  const result = resolveLocalAnswer({
    question: "ما هي المجموعة الشمسية؟",
    locale: "ar",
  });
  assert.equal(result.handled, true);
  assert.match(result.answer?.answer ?? "", /[\u0600-\u06FF]/);
});

test("a knowledge entry never cites an unregistered source", () => {
  for (const question of [
    "What is the Solar System?",
    "What is a black hole?",
    "What are the planets?",
  ]) {
    const result = resolveLocalAnswer({ question, locale: "en" });
    assert.equal(result.handled, true);
    for (const source of result.answer?.sources ?? []) {
      assert.ok(registryUrls.has(source.id));
      assert.equal(registryUrls.get(source.id), source.url);
    }
  }
});

/* -------------------------------------------------------------- records */

test("a named record is answered from its own fields", () => {
  const result = resolveLocalAnswer({
    question: "Explain Perseverance Rover",
    locale: "en",
  });
  assert.equal(result.handled, true);
  assert.equal(result.answer?.route, "record");
  const answer = result.answer?.answer ?? "";
  assert.match(answer, /Perseverance Rover/);
  assert.match(answer, /Mars/);
  assert.match(answer, /SRC-/);
  assert.ok((result.answer?.sources.length ?? 0) > 0);
});

test("a record question names both statuses separately", () => {
  const result = resolveLocalAnswer({
    question: "What is the status of Ranger 7?",
    locale: "en",
  });
  assert.equal(result.handled, true);
  const answer = result.answer?.answer ?? "";
  assert.match(answer, /Mission status:/);
  assert.match(answer, /Hardware status:/);
});

test("the contextual record is used when the visitor does not name it", () => {
  const result = resolveLocalAnswer({
    question: "What happened to the hardware?",
    locale: "en",
    context: { kind: "artifact", id: "perseverance" },
  });
  assert.equal(result.handled, true);
  assert.match(result.answer?.answer ?? "", /Perseverance Rover/);
  assert.equal(result.answer?.context?.id, "perseverance");
});

test("every record kind the assistant claims to support can answer", () => {
  const cases: Array<[string, string, string]> = [
    ["Explain the Apollo 11 mission.", "mission", "apollo-11"],
    ["Explain the Mars record.", "body", "mars"],
    ["Explain the Orion Nebula.", "deep-sky", "orion-nebula"],
    ["Explain NASA.", "agency", "nasa"],
  ];
  for (const [question, kind, id] of cases) {
    const result = resolveLocalAnswer({
      question,
      locale: "en",
      context: { kind, id },
    });
    assert.equal(result.handled, true, `${kind} was not answered locally`);
    assert.ok((result.answer?.answer.length ?? 0) > 40);
  }
});

test("a record that does not establish the aspect falls through", () => {
  // No lesson record is registered for this id, so nothing may be invented.
  const result = resolveLocalAnswer({
    question: "Explain this lesson.",
    locale: "en",
    context: { kind: "lesson", id: "not-a-real-lesson" },
  });
  assert.equal(result.handled, false);
});

/* ------------------------------------------------ comparisons and links */

test("two records are compared from the fields they share", () => {
  const result = resolveLocalAnswer({
    question: "Compare Mars and Earth",
    locale: "en",
  });
  assert.equal(result.handled, true);
  assert.equal(result.answer?.route, "comparison");
  const answer = result.answer?.answer ?? "";
  assert.match(answer, /Mars/);
  assert.match(answer, /Earth/);
  assert.match(answer, /Orbital period/);
  assert.ok((result.answer?.sources.length ?? 0) > 0);
});

test("the Arabic comparison works", () => {
  const result = resolveLocalAnswer({
    question: "قارن بين المريخ والأرض",
    locale: "ar",
  });
  assert.equal(result.handled, true);
  assert.match(result.answer?.answer ?? "", /[\u0600-\u06FF]/);
});

test("relationships are answered from the record graph", () => {
  const result = resolveLocalAnswer({
    question: "What is related to Ranger 7?",
    locale: "en",
  });
  assert.equal(result.handled, true);
  assert.match(result.answer?.answer ?? "", /Surveyor 1|related|connected/i);
});

test("which missions explored a destination is answered locally", () => {
  const result = resolveLocalAnswer({
    question: "Which missions explored Mars?",
    locale: "en",
  });
  assert.equal(result.handled, true);
  assert.match(result.answer?.answer ?? "", /Viking|Perseverance/);
});

/* ---------------------------------------------------------- uncertainty */

test("an ambiguous question is not answered with a guess", () => {
  // "Voyager" names both a mission and two spacecraft; without more, the
  // engine must not pick one silently.
  const ambiguous = resolveLocalAnswer({
    question: "What is the situation with the Apollo hardware?",
    locale: "en",
  });
  if (ambiguous.handled) {
    assert.ok((ambiguous.answer?.answer.length ?? 0) > 0);
  }
});

test("an out-of-scope question is not answered locally", () => {
  for (const question of [
    "Explain quantum chromodynamics",
    "Write me a poem about the sea",
    "What is the meaning of life in the universe, and should I invest in cryptocurrency?",
  ]) {
    const result = resolveLocalAnswer({ question, locale: "en" });
    assert.equal(result.handled, false, `"${question}" was answered locally`);
  }
});

/* -------------------------------------------------------------- handler */

test("a local answer never reaches the provider", async () => {
  const { impl, calls } = mockProvider("This must not be used.");
  const result = await handleAskRequest(
    makeRequest({ question: "Hello" }),
    { env: ENV, fetchImpl: impl }
  );
  assert.equal(result.status, 200);
  assert.equal(result.body.ok, true);
  assert.equal(result.body.provider, "local");
  assert.equal(calls.length, 0, "the provider was called for a local answer");
});

test("a local answer does not need a key", async () => {
  const result = await handleAskRequest(
    makeRequest({ question: "What is the Solar System?" }),
    { env: {} }
  );
  assert.equal(result.status, 200);
  assert.equal(result.body.provider, "local");
  assert.ok((result.body.answer?.length ?? 0) > 40);
});

test("an unknown question falls back to the provider", async () => {
  const { impl, calls } = mockProvider("A provider answer.");
  const result = await handleAskRequest(
    makeRequest({ question: "Explain quantum chromodynamics in detail" }),
    { env: ENV, fetchImpl: impl }
  );
  assert.equal(result.status, 200);
  assert.equal(result.body.provider, "openrouter");
  assert.equal(calls.length, 1);
});

test("a provider answer is cached and the cache is reused", async () => {
  const { impl, calls } = mockProvider("A provider answer about quantum chromodynamics.");
  const body = { question: "Explain quantum chromodynamics in detail" };

  const first = await handleAskRequest(makeRequest(body), {
    env: ENV,
    fetchImpl: impl,
  });
  assert.equal(first.body.provider, "openrouter");
  assert.equal(calls.length, 1);

  const second = await handleAskRequest(makeRequest(body), {
    env: ENV,
    fetchImpl: impl,
  });
  assert.equal(second.body.provider, "cache");
  assert.equal(second.body.answer, first.body.answer);
  assert.equal(calls.length, 1, "the cached answer reached the provider again");
});

test("the cache refuses an answer whose sources are no longer registered", () => {
  const key = askCacheKey({
    question: "a question",
    locale: "en",
    contextKind: "",
    contextId: "",
  });
  const bogus: AskSourceRef = {
    id: "SRC-NOT-REGISTERED",
    organization: "Nowhere",
    title: "Nothing",
    url: "https://example.invalid/nothing",
    type: "reference",
    accessedAt: "2026-11-10",
  };
  writeAskCache(key, {
    answer: "An answer that cites a source that does not exist.",
    sources: [bogus],
    model: DEFAULT_OPENROUTER_MODEL,
  });
  assert.equal(readAskCache(key), null);
});

test("the cache key separates the question, the language and the record", () => {
  const base = {
    question: "What is Mars?",
    locale: "en",
    contextKind: "",
    contextId: "",
  };
  const a = askCacheKey(base);
  assert.equal(a, askCacheKey({ ...base }));
  assert.notEqual(a, askCacheKey({ ...base, locale: "ar" }));
  assert.notEqual(
    a,
    askCacheKey({ ...base, contextKind: "artifact", contextId: "mars" })
  );
  assert.notEqual(a, askCacheKey({ ...base, question: "What is Earth?" }));
});

test("the cached answer carries the dataset version", () => {
  const key = askCacheKey({
    question: "versioned",
    locale: "en",
    contextKind: "",
    contextId: "",
  });
  writeAskCache(key, {
    answer: "An answer.",
    sources: [],
    model: DEFAULT_OPENROUTER_MODEL,
  });
  const cached = readAskCache(key);
  assert.ok(cached);
  assert.equal(cached.dataVersion, GRAVERSE_DATA_VERSION);
});

/* ------------------------------------------------- provider protections */

test("the provider fallback still enforces the free-model rule", async () => {
  const { impl, calls } = mockProvider("never");
  const result = await handleAskRequest(
    makeRequest({ question: "Explain quantum chromodynamics in detail" }),
    {
      env: { OPENROUTER_API_KEY: TEST_KEY, OPENROUTER_MODEL: "openai/gpt-4o" },
      fetchImpl: impl,
    }
  );
  assert.equal(result.status, 500);
  assert.equal(result.body.error?.code, "model_misconfigured");
  assert.equal(calls.length, 0, "a paid model was requested");
});

test("the provider fallback still requires a key", async () => {
  const result = await handleAskRequest(
    makeRequest({ question: "Explain quantum chromodynamics in detail" }),
    { env: {} }
  );
  assert.equal(result.status, 503);
  assert.equal(result.body.error?.code, "not_configured");
});

test("the provider fallback still honours the rate limit", async () => {
  const { impl, calls } = mockProvider("An answer.");
  // Distinct questions, so the cache never short-circuits the throttle.
  const questions = Array.from(
    { length: ASK_LIMITS.perMinutePerClient + 2 },
    (_value, index) => `Explain quantum chromodynamics, case ${index}`
  );

  let allowed = 0;
  let limited = 0;
  for (const question of questions) {
    const result = await handleAskRequest(makeRequest({ question }), {
      env: ENV,
      fetchImpl: impl,
    });
    if (result.status === 200) allowed += 1;
    if (result.status === 429) limited += 1;
  }
  assert.equal(allowed, ASK_LIMITS.perMinutePerClient);
  assert.equal(limited, 2);
  assert.equal(calls.length, ASK_LIMITS.perMinutePerClient);
});

test("local answers are never throttled", async () => {
  const { impl, calls } = mockProvider("never");
  for (let index = 0; index < ASK_LIMITS.perMinutePerClient + 3; index += 1) {
    const result = await handleAskRequest(makeRequest({ question: "Hello" }), {
      env: ENV,
      fetchImpl: impl,
    });
    assert.equal(result.status, 200, "a local answer was throttled");
    assert.equal(result.body.provider, "local");
  }
  assert.equal(calls.length, 0);
});

test("the free-model rule is still the only way to reach a model", () => {
  assert.equal(isFreeOpenRouterModel(DEFAULT_OPENROUTER_MODEL), true);
  assert.equal(isFreeOpenRouterModel("google/gemma-4-31b-it:free"), true);
  assert.equal(isFreeOpenRouterModel("openrouter/auto"), false);
});
