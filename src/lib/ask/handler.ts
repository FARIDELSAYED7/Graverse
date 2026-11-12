import { z } from "zod";
import {
  ASK_LIMITS,
  DEFAULT_OPENROUTER_MODEL,
  type AskEnv,
  isFreeOpenRouterModel,
  resolveOpenRouterKey,
  resolveOpenRouterModel,
  resolveReferer,
} from "./config";
import { callOpenRouter } from "./openrouter";
import {
  buildAskMessages,
  extractCitedSourceIds,
} from "./prompt";
import {
  formatAskContextBlock,
  resolveAskContext,
  retrieveForAsk,
} from "./retrieval";
import { checkAskRateLimit } from "./rate-limit";
import {
  askCacheKey,
  clearAskCache,
  readAskCache,
  writeAskCache,
} from "./local/cache";
import { resolveLocalAnswer } from "./local/engine";
import {
  isAskContextKind,
  type AskErrorCode,
  type AskLocale,
  type AskRequestPayload,
  type AskResponseBody,
  type AskServiceInfo,
} from "./types";

/**
 * The Ask GRAVERSE request handler.
 *
 * It is deliberately free of Next.js imports so it can be unit-tested with a
 * mocked provider. `src/app/api/ask/route.ts` is a thin adapter around it.
 *
 * The order of operations is the security model:
 *
 *   validate → local engine → cache → key → model → throttle → provider.
 *
 * The local engine runs **before** the key check and before the throttle, so
 * a question GRAVERSE can answer from its own records never needs a
 * credential, never consumes a provider request and never touches the free
 * tier's quota.
 *
 * Nothing reaches the provider that the visitor could have invented, and
 * nothing comes back that was not asked for.
 */

const requestSchema = z.object({
  question: z
    .string({ required_error: "A question is required." })
    .trim()
    .min(1, "A question is required.")
    .max(
      ASK_LIMITS.maxQuestionLength,
      `A question may be at most ${ASK_LIMITS.maxQuestionLength} characters.`
    ),
  locale: z.enum(["en", "ar"]).default("en"),
  context: z
    .object({
      kind: z.string().min(1).max(40),
      id: z
        .string()
        .min(1)
        .max(ASK_LIMITS.maxContextIdLength)
        .regex(
          /^[A-Za-z0-9._-]+$/,
          "The record id contains characters that are not allowed."
        ),
    })
    .nullable()
    .optional(),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z
          .string()
          .min(1)
          .max(ASK_LIMITS.maxHistoryMessageLength),
      })
    )
    .max(ASK_LIMITS.maxHistoryMessages)
    .optional(),
});

export interface AskHandlerOptions {
  /** Injected in tests so no real provider request is ever made. */
  fetchImpl?: typeof fetch;
  env?: AskEnv;
  now?: () => number;
  /** Overrides the provider timeout. Used by the test suite. */
  timeoutMs?: number;
}

export interface AskHandlerResult {
  status: number;
  body: AskResponseBody;
  headers?: Record<string, string>;
}

const ERROR_MESSAGES: Record<AskErrorCode, string> = {
  invalid_request: "That request could not be understood.",
  not_configured:
    "Ask GRAVERSE is not configured on this deployment. The Museum, Academy and Explorer remain fully available.",
  model_misconfigured:
    "The Ask GRAVERSE model configuration is not a free OpenRouter model. The assistant is paused.",
  quota_exceeded:
    "Ask GRAVERSE has temporarily reached its free AI usage limit. You can continue exploring the Museum, Academy, and Explorer while the service is unavailable.",
  provider_unauthorized:
    "Ask GRAVERSE could not reach OpenRouter. The Museum, Academy and Explorer remain fully available.",
  provider_insufficient_credits:
    "Ask GRAVERSE has temporarily reached its free AI usage limit. You can continue exploring the Museum, Academy, and Explorer while the service is unavailable.",
  provider_error:
    "The AI service did not answer. You can continue exploring the Museum, Academy, and Explorer.",
  provider_timeout:
    "The AI service took too long to answer. You can continue exploring the Museum, Academy, and Explorer.",
  provider_malformed:
    "The AI service returned an unreadable answer. You can continue exploring the Museum, Academy, and Explorer.",
  no_context: "No GRAVERSE record was attached to this question.",
};

function errorBody(code: AskErrorCode, message?: string): AskResponseBody {
  return {
    ok: false,
    error: { code, message: message ?? ERROR_MESSAGES[code] },
  };
}

/** The client key used for throttling. Never a raw personal identifier. */
export function askClientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first.slice(0, 64);
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp.slice(0, 64);
  return "anonymous";
}

/** Reads the service state without contacting the provider. */
export function askServiceInfo(env: AskEnv = process.env): AskServiceInfo {
  const model = resolveOpenRouterModel(env);
  return {
    ok: true,
    configured: resolveOpenRouterKey(env).length > 0,
    model,
    freeOnly: isFreeOpenRouterModel(model),
    limits: {
      maxQuestionLength: ASK_LIMITS.maxQuestionLength,
      maxHistoryMessages: ASK_LIMITS.maxHistoryMessages,
      maxOutputTokens: ASK_LIMITS.maxOutputTokens,
    },
  };
}

/**
 * Handles one Ask GRAVERSE request.
 */
export async function handleAskRequest(
  request: Request,
  options: AskHandlerOptions = {}
): Promise<AskHandlerResult> {
  const env = options.env ?? process.env;
  const now = options.now ?? (() => Date.now());

  /* ---------------------------------------------------------- 1. validation */

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return { status: 400, body: errorBody("invalid_request") };
  }

  const parsed = requestSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return {
      status: 400,
      body: errorBody("invalid_request", first?.message),
    };
  }

  const payload: AskRequestPayload = {
    question: parsed.data.question,
    locale: parsed.data.locale as AskLocale,
    context: parsed.data.context ?? null,
    history: parsed.data.history ?? [],
  };

  /* ------------------------------------------------- 2. local intelligence */

  const contextHint =
    payload.context && isAskContextKind(payload.context.kind)
      ? { kind: payload.context.kind, id: payload.context.id }
      : null;

  const local = resolveLocalAnswer({
    question: payload.question,
    locale: payload.locale,
    context: contextHint,
  });

  if (local.handled && local.answer) {
    // A local answer never needs a key, a model or the provider, and it is
    // never throttled: the throttle exists to protect the free tier.
    return {
      status: 200,
      body: {
        ok: true,
        answer: local.answer.answer,
        sources: local.answer.sources,
        context: local.answer.context ?? contextSummary(contextHint),
        provider: "local",
      },
    };
  }

  /* ---------------------------------------------------- 3. validated cache */

  const cacheKey = askCacheKey({
    question: payload.question,
    locale: payload.locale,
    contextKind: contextHint?.kind ?? "",
    contextId: contextHint?.id ?? "",
  });

  const cached = readAskCache(cacheKey, now());
  if (cached) {
    return {
      status: 200,
      body: {
        ok: true,
        answer: cached.answer,
        sources: cached.sources,
        context: contextSummary(contextHint),
        provider: "cache",
        model: cached.model,
      },
    };
  }

  /* --------------------------------------------------------------- 4. key */

  const apiKey = resolveOpenRouterKey(env);
  if (apiKey.length === 0) {
    return { status: 503, body: errorBody("not_configured") };
  }

  /* ---------------------------------------------------------- 5. model */

  const model = resolveOpenRouterModel(env);
  if (!isFreeOpenRouterModel(model)) {
    return { status: 500, body: errorBody("model_misconfigured") };
  }

  /* --------------------------------------------------------- 6. throttle */

  const decision = checkAskRateLimit(askClientKey(request), now());
  if (!decision.allowed) {
    return {
      status: 429,
      body: errorBody("quota_exceeded"),
      headers: { "Retry-After": String(decision.retryAfterSeconds) },
    };
  }

  /* -------------------------------------------------------- 7. retrieval */

  const retrieval = retrieveForAsk(payload.question, contextHint);
  // The compact collection index is the fallback material for a global
  // question. It is not needed once a contextual record has been resolved.
  const includeCollectionIndex = retrieval.context === null;
  const contextBlock = formatAskContextBlock(retrieval, includeCollectionIndex);

  /* ----------------------------------------------------------- 8. prompt */

  const history = (payload.history ?? []).slice(-ASK_LIMITS.maxHistoryMessages);
  const messages = buildAskMessages({
    locale: payload.locale,
    question: payload.question,
    contextBlock,
    history,
  });

  /* --------------------------------------------------------- 9. provider */

  const outcome = await callOpenRouter({
    apiKey,
    model,
    messages,
    fetchImpl: options.fetchImpl,
    timeoutMs: options.timeoutMs,
    referer: resolveReferer(env),
  });

  if (!outcome.ok) {
    switch (outcome.reason) {
      case "unauthorized":
        return { status: 502, body: errorBody("provider_unauthorized") };
      case "insufficient_credits":
        return {
          status: 503,
          body: errorBody("provider_insufficient_credits"),
        };
      case "rate_limited":
        return {
          status: 429,
          body: errorBody("quota_exceeded"),
          headers: { "Retry-After": "60" },
        };
      case "timeout":
        return { status: 504, body: errorBody("provider_timeout") };
      case "malformed":
        return { status: 502, body: errorBody("provider_malformed") };
      default:
        return { status: 502, body: errorBody("provider_error") };
    }
  }

  /* ---------------------------------------------------------- 10. answer */

  const answer = outcome.text.trim();
  if (answer.length === 0) {
    return { status: 502, body: errorBody("provider_malformed") };
  }

  const retrievedSourceIds = retrieval.sources.map((source) => source.id);
  const cited = extractCitedSourceIds(answer, retrievedSourceIds);
  const chosen = cited.length > 0 ? cited : retrievedSourceIds.slice(0, 6);
  const chosenSet = new Set(chosen.slice(0, 8));
  const sources = [
    ...cited
      .filter((id) => chosenSet.has(id))
      .map((id) => retrieval.sources.find((source) => source.id === id))
      .filter((source): source is (typeof retrieval.sources)[number] =>
        Boolean(source)
      ),
    ...retrieval.sources.filter(
      (source) => chosenSet.has(source.id) && !cited.includes(source.id)
    ),
  ];

  // A validated answer is cached so the same question does not spend the
  // free tier twice.
  writeAskCache(
    cacheKey,
    { answer, sources, model: outcome.model || model },
    now()
  );

  return {
    status: 200,
    body: {
      ok: true,
      answer,
      sources,
      context: retrieval.context,
      model: outcome.model || model || DEFAULT_OPENROUTER_MODEL,
      provider: "openrouter",
    },
  };
}

/** The context summary for a resolved hint, when there is one. */
function contextSummary(
  hint: { kind: string; id: string } | null
): AskResponseBody["context"] {
  if (!hint) return null;
  const resolved = resolveAskContext(
    hint.kind as Parameters<typeof resolveAskContext>[0],
    hint.id
  );
  return resolved?.summary ?? null;
}
