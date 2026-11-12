/**
 * Server-side configuration for the Ask GRAVERSE assistant.
 *
 * Everything in this module is server-only. The OpenRouter key is read from
 * the environment inside the route handler and is never sent to the browser,
 * never written into the client bundle, and never logged.
 */

import { ASK_CLIENT_LIMITS } from "./client-limits";

/** OpenRouter's OpenAI-compatible API base. */
export const OPENROUTER_API_BASE = "https://openrouter.ai/api/v1";

/** The single endpoint this project talks to. */
export const OPENROUTER_CHAT_COMPLETIONS_URL = `${OPENROUTER_API_BASE}/chat/completions`;

/** OpenRouter's official free-model router. */
export const OPENROUTER_FREE_ROUTER = "openrouter/free";

/** The default model. It is the free router, so no paid model can be reached. */
export const DEFAULT_OPENROUTER_MODEL = OPENROUTER_FREE_ROUTER;

/** The title OpenRouter shows in its dashboard for this application. */
export const OPENROUTER_APP_TITLE = "GRAVERSE";

/**
 * Hard limits.
 *
 * The published free-model limits are 20 requests per minute and 50 requests
 * per day for accounts below the purchased-credit threshold. The local
 * throttles below sit *under* those numbers on purpose: the project must
 * never depend on buying credits to stay inside them.
 */
export const ASK_LIMITS = {
  /** Maximum characters in a single question. */
  maxQuestionLength: ASK_CLIENT_LIMITS.maxQuestionLength,
  /** Maximum number of conversation turns sent to the provider. */
  maxHistoryMessages: ASK_CLIENT_LIMITS.maxHistoryMessages,
  /** Maximum characters in one stored history turn. */
  maxHistoryMessageLength: 1200,
  /** Maximum characters in a contextual entity id. */
  maxContextIdLength: 120,
  /** Maximum tokens the model may produce for one answer. */
  maxOutputTokens: 700,
  /** Provider request timeout. */
  requestTimeoutMs: 45_000,
  /** Per client, per minute. Under the published 20/minute free limit. */
  perMinutePerClient: 5,
  /** Per client, per day. Under the published 50/day free limit. */
  perDayPerClient: 20,
  /** Whole instance, per minute. Protects the shared account quota. */
  perMinuteGlobal: 15,
  /** Whole instance, per day. Protects the shared account quota. */
  perDayGlobal: 40,
} as const;

/**
 * The environment shape the assistant reads. It is deliberately looser than
 * `NodeJS.ProcessEnv` so the configuration can be injected by a test without
 * carrying the framework's required variables.
 */
export type AskEnv = Record<string, string | undefined>;

/**
 * A model is acceptable only when it is OpenRouter's free router or an
 * explicit free variant (`vendor/model:free`). Anything else is rejected
 * before a request is made, so a paid model can never be reached — not by a
 * misconfiguration, not by a fallback, and not by a provider-side default.
 */
export function isFreeOpenRouterModel(model: string | undefined | null): boolean {
  if (typeof model !== "string") return false;
  const id = model.trim();
  if (id.length === 0) return false;
  if (id === OPENROUTER_FREE_ROUTER) return true;
  return /^[a-z0-9][a-z0-9._-]*\/[a-z0-9][a-z0-9._:-]*:free$/i.test(id);
}

/**
 * The configured model, resolved at call time so the value can be changed
 * without rebuilding and so tests can override it.
 */
export function resolveOpenRouterModel(
  env: AskEnv = process.env
): string {
  const raw = env.OPENROUTER_MODEL;
  const model = typeof raw === "string" && raw.trim().length > 0
    ? raw.trim()
    : DEFAULT_OPENROUTER_MODEL;
  return model;
}

/** The OpenRouter key. Returns an empty string when it is not configured. */
export function resolveOpenRouterKey(
  env: AskEnv = process.env
): string {
  const raw = env.OPENROUTER_API_KEY;
  return typeof raw === "string" ? raw.trim() : "";
}

/** The deployment origin used for the `HTTP-Referer` header. */
export function resolveReferer(env: AskEnv = process.env): string {
  const site = env.NEXT_PUBLIC_SITE_URL?.trim();
  if (site) return site;
  const vercel = env.VERCEL_URL?.trim();
  if (vercel) {
    return vercel.startsWith("http") ? vercel : `https://${vercel}`;
  }
  return "http://localhost:3000";
}
