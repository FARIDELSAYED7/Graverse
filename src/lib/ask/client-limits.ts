/**
 * Limits that are safe to ship to the browser.
 *
 * The server is the authority — it re-validates every one of these values —
 * but the interface needs the same numbers so it can stop a visitor before a
 * pointless round trip. This module deliberately contains no environment
 * access and no server-only code.
 */
export const ASK_CLIENT_LIMITS = {
  /** Maximum characters in a single question. */
  maxQuestionLength: 600,
  /** Maximum number of conversation turns kept in the browser. */
  maxHistoryMessages: 8,
  /**
   * Client-side cooldown after an answer. The published free-model limits are
   * 20 requests per minute, so a short cooldown keeps a curious visitor from
   * burning the shared quota in a few seconds.
   */
  cooldownMs: 5_000,
} as const;
