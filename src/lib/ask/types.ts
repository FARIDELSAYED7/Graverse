/**
 * Shared contract for "Ask GRAVERSE", the OpenRouter-backed space heritage
 * assistant.
 *
 * The types here are deliberately transport-shaped rather than model-shaped:
 * the browser never sends facts, only a question, a short conversation
 * history and a *hint* about which GRAVERSE record is being viewed. The
 * server resolves that hint against the real datasets before anything is sent
 * to the provider.
 */

/** Locales the assistant can answer in. Mirrors the interface locales. */
export type AskLocale = "en" | "ar";

/**
 * The GRAVERSE entity kinds the assistant can be contextualised by.
 * Every kind resolves to a real record in `src/data`.
 */
export const ASK_CONTEXT_KINDS = [
  "artifact",
  "mission",
  "lesson",
  "engineering",
  "simulation",
  "story",
  "body",
  "agency",
  "deep-sky",
  "article",
] as const;

export type AskContextKind = (typeof ASK_CONTEXT_KINDS)[number];

export function isAskContextKind(value: unknown): value is AskContextKind {
  return (
    typeof value === "string" &&
    (ASK_CONTEXT_KINDS as readonly string[]).includes(value)
  );
}

/** A source record exactly as registered in `src/data/sources.ts`. */
export interface AskSourceRef {
  id: string;
  organization: string;
  title: string;
  url: string;
  type: string;
  accessedAt: string;
  notes?: string;
}

/** The record the visitor is currently looking at, resolved on the server. */
export interface AskContextSummary {
  kind: AskContextKind;
  id: string;
  title: string;
  subtitle?: string;
  href?: string;
}

/** One turn of the conversation. Only user and assistant turns are kept. */
export interface AskChatMessage {
  role: "user" | "assistant";
  content: string;
}

/** A message in the OpenAI-compatible request body sent to the provider. */
export interface AskProviderMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

/** The request body accepted by `POST /api/ask`. */
export interface AskRequestPayload {
  question: string;
  locale: AskLocale;
  context?: { kind: string; id: string } | null;
  history?: AskChatMessage[];
}

/** Stable error codes. The interface maps these to a localised message. */
export type AskErrorCode =
  | "invalid_request"
  | "not_configured"
  | "model_misconfigured"
  | "quota_exceeded"
  | "provider_unauthorized"
  | "provider_insufficient_credits"
  | "provider_error"
  | "provider_timeout"
  | "provider_malformed"
  | "no_context";

export interface AskErrorBody {
  code: AskErrorCode;
  /** A short, safe, human-readable message. Never contains provider secrets. */
  message: string;
}

/**
 * Where an answer came from.
 *
 * - `local` — assembled by GRAVERSE's own records, with no external service.
 * - `cache` — a previously validated provider answer, reused.
 * - `openrouter` — written by a free OpenRouter model from the same records.
 */
export type AskAnswerProvider = "local" | "cache" | "openrouter";

/** The response body returned by `POST /api/ask`. */
export interface AskResponseBody {
  ok: boolean;
  answer?: string;
  sources?: AskSourceRef[];
  context?: AskContextSummary | null;
  model?: string;
  /** Which part of the system produced the answer. */
  provider?: AskAnswerProvider;
  error?: AskErrorBody;
}

/** Service information returned by `GET /api/ask`. Never includes the key. */
export interface AskServiceInfo {
  ok: boolean;
  configured: boolean;
  model: string;
  freeOnly: boolean;
  limits: {
    maxQuestionLength: number;
    maxHistoryMessages: number;
    maxOutputTokens: number;
  };
}
