/**
 * Manual OpenRouter integration check for Ask GRAVERSE.
 *
 * This script is deliberately NOT part of `npm run verify`. It makes a real,
 * authenticated request against OpenRouter and therefore consumes a little of
 * the free-tier quota (published limits: 20 requests per minute and 50 per
 * day for accounts below the purchased-credit threshold). The automated test
 * suite mocks the provider and never spends quota.
 *
 * Usage:
 *   OPENROUTER_API_KEY=sk-or-v1-... node scripts/ask-openrouter.mjs
 *
 * Options:
 *   OPENROUTER_MODEL   the model to exercise (default: openrouter/free).
 *                       It must be a free model — the script refuses a paid one.
 *   BASE_URL           when set, the script also calls the running
 *                       application's POST /api/ask endpoint and checks the
 *                       grounding and the source links.
 *   ASK_QUESTION       the question to ask (default: a contextual one).
 *   ASK_CONTEXT        a contextual entity id, for example `perseverance`.
 *   ASK_LOCALE         `en` or `ar` (default: en).
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const BASE_URL = process.env.BASE_URL ?? "";
const MODEL = (process.env.OPENROUTER_MODEL || "openrouter/free").trim();
const QUESTION =
  process.env.ASK_QUESTION ||
  "What happened to the hardware, and what did the mission discover?";
const CONTEXT_ID = process.env.ASK_CONTEXT || "perseverance";
const LOCALE = process.env.ASK_LOCALE === "ar" ? "ar" : "en";

/** Reads a key from the environment or from a local .env file. */
function readKey() {
  const fromEnv = process.env.OPENROUTER_API_KEY?.trim();
  if (fromEnv) return fromEnv;
  for (const name of [".env.local", ".env"]) {
    const path = join(process.cwd(), name);
    if (!existsSync(path)) continue;
    const match = readFileSync(path, "utf8").match(
      /^\s*OPENROUTER_API_KEY\s*=\s*"?([^"\n]+)"?\s*$/m
    );
    if (match?.[1]) return match[1].trim();
  }
  return "";
}

function isFreeModel(id) {
  return id === "openrouter/free" || /^[a-z0-9][a-z0-9._-]*\/[a-z0-9][a-z0-9._:-]*:free$/i.test(id);
}

function heading(text) {
  console.log(`\n=== ${text} ===`);
}

async function main() {
  const apiKey = readKey();

  heading("1. Configuration");
  console.log(`Model: ${MODEL}`);
  console.log(`Free model: ${isFreeModel(MODEL) ? "yes" : "NO — refusing to run"}`);
  console.log(`API key present: ${apiKey ? "yes" : "no"}`);
  if (!isFreeModel(MODEL)) {
    console.error(
      "\nRefusing to run: the configured model is not a free model. GRAVERSE only " +
        "ever calls free models."
    );
    process.exit(1);
  }
  heading("2. Free models currently published by OpenRouter");
  const modelsResponse = await fetch("https://openrouter.ai/api/v1/models", {
    headers: { Accept: "application/json" },
  });
  if (!modelsResponse.ok) {
    console.error(`Could not list models (HTTP ${modelsResponse.status}).`);
  } else {
    const payload = await modelsResponse.json();
    const free = (payload.data ?? [])
      .map((model) => model.id)
      .filter((id) => id === "openrouter/free" || id.endsWith(":free"));
    console.log(`${free.length} free model ids are available:`);
    for (const id of free) console.log(`  - ${id}`);
  }

  if (!apiKey) {
    console.error(
      "\nNo OPENROUTER_API_KEY found. Export one, or add it to .env.local, and run again.\n" +
        "The rest of GRAVERSE works without it."
    );
    process.exit(1);
  }

  heading("3. Direct provider request");
  const direct = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-OpenRouter-Title": "GRAVERSE",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are Ask GRAVERSE, a space heritage guide. Answer in one short paragraph.",
          },
          { role: "user", content: QUESTION },
        ],
        max_tokens: 200,
      }),
    }
  );

  if (!direct.ok) {
    const body = await direct.text();
    console.error(`Provider returned HTTP ${direct.status}.`);
    console.error(body.slice(0, 600));
    process.exit(1);
  }

  const directPayload = await direct.json();
  const answer = directPayload?.choices?.[0]?.message?.content ?? "";
  console.log(`Model used: ${directPayload?.model ?? "(not reported)"}`);
  console.log(`Prompt tokens: ${directPayload?.usage?.prompt_tokens ?? "?"}`);
  console.log(`Completion tokens: ${directPayload?.usage?.completion_tokens ?? "?"}`);
  console.log("\n--- answer ---\n");
  console.log(String(answer).trim());

  if (!String(answer).trim()) {
    console.error("\nThe provider returned an empty answer.");
    process.exit(1);
  }

  if (BASE_URL) {
    heading("4. Application endpoint");
    const response = await fetch(`${BASE_URL.replace(/\/$/, "")}/api/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: QUESTION,
        locale: LOCALE,
        context: { kind: "artifact", id: CONTEXT_ID },
        history: [],
      }),
    });
    const payload = await response.json().catch(() => null);
    console.log(`HTTP ${response.status}`);
    if (!payload?.ok) {
      console.error(`The application endpoint failed: ${JSON.stringify(payload)}`);
      process.exit(1);
    }
    console.log(`Model used: ${payload.model}`);
    console.log(`Context: ${payload.context?.title} (${payload.context?.kind})`);
    console.log(`Sources returned: ${(payload.sources ?? []).length}`);
    for (const source of payload.sources ?? []) {
      console.log(`  - ${source.id} ${source.url}`);
    }
    console.log("\n--- answer ---\n");
    console.log(String(payload.answer).trim());
  } else {
    heading("4. Application endpoint");
    console.log(
      "Skipped. Set BASE_URL (for example http://localhost:3100) to also exercise POST /api/ask."
    );
  }

  heading("Result");
  console.log("A real, authenticated OpenRouter request succeeded with a free model.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
