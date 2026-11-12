import {
  ASK_LIMITS,
  OPENROUTER_APP_TITLE,
  OPENROUTER_CHAT_COMPLETIONS_URL,
  resolveReferer,
} from "./config";
import type { AskProviderMessage } from "./types";

/**
 * The OpenRouter client.
 *
 * It uses the platform's native `fetch`, so the project adds no SDK
 * dependency. Everything provider-specific — the key, the headers, the
 * timeout, the error mapping — stays inside this module and never reaches the
 * browser.
 */

export type OpenRouterFailure =
  | "unauthorized"
  | "insufficient_credits"
  | "rate_limited"
  | "provider_error"
  | "timeout"
  | "malformed";

export type OpenRouterOutcome =
  | { ok: true; text: string; model: string }
  | { ok: false; reason: OpenRouterFailure; status?: number };

export interface OpenRouterRequest {
  apiKey: string;
  model: string;
  messages: AskProviderMessage[];
  maxTokens?: number;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
  referer?: string;
  signal?: AbortSignal;
}

/** Reads the assistant's text out of an OpenAI-compatible response body. */
export function readProviderText(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  const choices = (payload as { choices?: unknown }).choices;
  if (!Array.isArray(choices) || choices.length === 0) return null;
  const first = choices[0] as { message?: { content?: unknown } };
  const content = first?.message?.content;
  if (typeof content !== "string") return null;
  const trimmed = content.trim();
  return trimmed.length > 0 ? trimmed : null;
}

/**
 * Sends one chat completion request to OpenRouter.
 *
 * The function never throws for a provider problem: every failure mode is
 * mapped to a stable reason so the route can answer with a safe message
 * instead of a stack trace.
 */
export async function callOpenRouter(
  request: OpenRouterRequest
): Promise<OpenRouterOutcome> {
  const {
    apiKey,
    model,
    messages,
    maxTokens = ASK_LIMITS.maxOutputTokens,
    timeoutMs = ASK_LIMITS.requestTimeoutMs,
    fetchImpl = fetch,
    referer = resolveReferer(),
  } = request;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  // Combine an externally supplied signal with the timeout signal.
  const external = request.signal;
  const onExternalAbort = () => controller.abort();
  if (external) {
    if (external.aborted) controller.abort();
    else external.addEventListener("abort", onExternalAbort, { once: true });
  }

  try {
    const response = await fetchImpl(OPENROUTER_CHAT_COMPLETIONS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": referer,
        "X-OpenRouter-Title": OPENROUTER_APP_TITLE,
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: maxTokens,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      // The provider's error body is not forwarded: it can echo request
      // details. Only the status is used.
      if (response.status === 401) {
        return { ok: false, reason: "unauthorized", status: 401 };
      }
      if (response.status === 402) {
        return { ok: false, reason: "insufficient_credits", status: 402 };
      }
      if (response.status === 429) {
        return { ok: false, reason: "rate_limited", status: 429 };
      }
      return { ok: false, reason: "provider_error", status: response.status };
    }

    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      return { ok: false, reason: "malformed", status: response.status };
    }

    const text = readProviderText(payload);
    if (text === null) {
      return { ok: false, reason: "malformed", status: response.status };
    }

    const reported =
      payload && typeof payload === "object"
        ? (payload as { model?: unknown }).model
        : undefined;

    return {
      ok: true,
      text,
      model: typeof reported === "string" && reported.length > 0 ? reported : model,
    };
  } catch (error) {
    if (
      error instanceof Error &&
      (error.name === "AbortError" || error.name === "TimeoutError")
    ) {
      return { ok: false, reason: "timeout" };
    }
    if (controller.signal.aborted) {
      return { ok: false, reason: "timeout" };
    }
    return { ok: false, reason: "provider_error" };
  } finally {
    clearTimeout(timer);
    if (external) external.removeEventListener("abort", onExternalAbort);
  }
}
