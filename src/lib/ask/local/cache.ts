import { sources } from "@/data/sources";
import { datasetStats } from "@/data/artifacts";
import { normalizeText } from "./normalize";
import type { AskSourceRef } from "../types";

/**
 * The answer cache.
 *
 * A validated provider answer is stored so that the same question does not
 * spend free-tier quota twice. The cache is deliberately small and in
 * process: no Redis, no database, no third-party service.
 *
 * Two rules keep it honest:
 *
 * 1. A cached answer is only reused while every source it cites is still
 *    registered, with the same URL. A record that changed its provenance
 *    invalidates the answer built on it.
 * 2. The cache is keyed by the question, the language, the scope and the
 *    contextual record, and it carries the version of the dataset it was built
 *    from. A different dataset version is a different key.
 */

/** How long a cached answer stays usable. */
export const ASK_CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

/** The maximum number of answers kept in the in-process cache. */
export const ASK_CACHE_MAX_ENTRIES = 200;

/**
 * The version of the knowledge the cache was built against.
 *
 * It changes whenever the dataset or the source registry changes, which
 * invalidates every cached answer at once.
 */
export const GRAVERSE_DATA_VERSION = `${datasetStats.lastVerified}-${
  sources.length
}-${datasetStats.total}`;

export interface CachedAnswer {
  answer: string;
  sources: AskSourceRef[];
  model: string;
  createdAt: number;
  dataVersion: string;
}

const cache = new Map<string, CachedAnswer>();

/** Builds the cache key for one question. */
export function askCacheKey(input: {
  question: string;
  locale: string;
  contextId: string;
  contextKind: string;
}): string {
  return [
    normalizeText(input.question),
    input.locale,
    input.contextKind,
    input.contextId,
  ].join("|");
}

/** True when every source is still registered with the same URL. */
function sourcesAreValid(sourcesList: AskSourceRef[]): boolean {
  const registry = new Map(sources.map((source) => [source.id, source.url]));
  return sourcesList.every((source) => {
    const url = registry.get(source.id);
    return url !== undefined && url === source.url;
  });
}

/**
 * Reads a cached answer.
 *
 * Returns `null` when the entry is missing, older than the time to live,
 * built against a different dataset version, or cites a source that has
 * changed or been removed.
 */
export function readAskCache(
  key: string,
  now: number = Date.now()
): CachedAnswer | null {
  const entry = cache.get(key);
  if (!entry) return null;

  if (now - entry.createdAt > ASK_CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  if (entry.dataVersion !== GRAVERSE_DATA_VERSION) {
    cache.delete(key);
    return null;
  }
  if (!sourcesAreValid(entry.sources)) {
    cache.delete(key);
    return null;
  }
  return entry;
}

/** Stores a validated answer. */
export function writeAskCache(
  key: string,
  value: Omit<CachedAnswer, "dataVersion" | "createdAt">,
  now: number = Date.now()
): void {
  if (!value.answer || value.answer.trim().length === 0) return;
  if (!sourcesAreValid(value.sources)) return;

  if (cache.size >= ASK_CACHE_MAX_ENTRIES) {
    const oldest = [...cache.entries()].sort(
      (a, b) => a[1].createdAt - b[1].createdAt
    )[0];
    if (oldest) cache.delete(oldest[0]);
  }

  cache.set(key, {
    answer: value.answer,
    sources: value.sources,
    model: value.model,
    createdAt: now,
    dataVersion: GRAVERSE_DATA_VERSION,
  });
}

/** Empties the in-process cache. Used by the test suite. */
export function clearAskCache(): void {
  cache.clear();
}

/** The number of cached answers. Used by the test suite. */
export function askCacheSize(): number {
  return cache.size;
}
