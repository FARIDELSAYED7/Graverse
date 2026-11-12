"use client";

import { normalizeText } from "@/lib/ask/local/normalize";
import type { AskAnswerProvider, AskSourceRef } from "@/lib/ask/types";

/**
 * The browser-side answer cache.
 *
 * A validated answer is kept in `localStorage` for seven days, so a visitor
 * who asks the same question again gets the answer immediately — without a
 * round trip to the server and without spending the shared free-tier quota.
 *
 * Nothing personal is stored: the key is the question text, the language and
 * the contextual record. The conversation itself is never written down.
 */

const STORAGE_KEY = "graverse-ask-cache";
const TTL_MS = 7 * 24 * 60 * 60 * 1000;
const MAX_ENTRIES = 40;

export interface ClientCachedAnswer {
  key: string;
  answer: string;
  sources: AskSourceRef[];
  provider: AskAnswerProvider;
  model?: string;
  createdAt: number;
}

/** The cache key for one question. */
export function askClientCacheKey(input: {
  question: string;
  locale: string;
  contextKind: string;
  contextId: string;
}): string {
  return [
    normalizeText(input.question),
    input.locale,
    input.contextKind,
    input.contextId,
  ].join("|");
}

interface CacheShape {
  version: 1;
  entries: ClientCachedAnswer[];
}

function readAll(): CacheShape {
  if (typeof window === "undefined") return { version: 1, entries: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { version: 1, entries: [] };
    const parsed = JSON.parse(raw) as CacheShape;
    if (!parsed || parsed.version !== 1 || !Array.isArray(parsed.entries)) {
      return { version: 1, entries: [] };
    }
    return parsed;
  } catch {
    return { version: 1, entries: [] };
  }
}

/** Reads a cached answer, or `null` when there is none that is still fresh. */
export function readClientAnswer(key: string): ClientCachedAnswer | null {
  const shape = readAll();
  const entry = shape.entries.find((candidate) => candidate.key === key);
  if (!entry) return null;
  if (Date.now() - entry.createdAt > TTL_MS) return null;
  if (!entry.answer || entry.answer.trim().length === 0) return null;
  return entry;
}

/** Stores a validated answer. */
export function writeClientAnswer(
  key: string,
  value: Omit<ClientCachedAnswer, "key" | "createdAt">
): void {
  if (typeof window === "undefined") return;
  if (!value.answer || value.answer.trim().length === 0) return;

  const shape = readAll();
  const entries = shape.entries.filter((entry) => entry.key !== key);
  entries.unshift({
    key,
    answer: value.answer,
    sources: value.sources ?? [],
    provider: value.provider,
    model: value.model,
    createdAt: Date.now(),
  });

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: 1,
        entries: entries.slice(0, MAX_ENTRIES),
      } satisfies CacheShape)
    );
  } catch {
    // A full or blocked storage must never break the assistant.
  }
}

/** Empties the browser cache. */
export function clearClientAnswers(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing to do.
  }
}
