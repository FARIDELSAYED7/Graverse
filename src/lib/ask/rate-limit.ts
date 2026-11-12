import { ASK_LIMITS } from "./config";

/**
 * In-memory throttling for the Ask GRAVERSE endpoint.
 *
 * The published OpenRouter free-model limits are 20 requests per minute and
 * 50 requests per day for accounts below the purchased-credit threshold. The
 * counters below are deliberately kept under those numbers so the service
 * degrades politely instead of exhausting the account quota.
 *
 * LIMITATION — this limiter is process-local. On a serverless or multi-instance
 * deployment every instance keeps its own counters, so the effective ceiling
 * is the per-instance limit multiplied by the number of instances, and the
 * counters reset whenever an instance is recycled. A shared store (for
 * example Upstash Redis) would be needed to enforce one global ceiling, but
 * that would add a paid dependency, which this project does not use. The
 * in-process limits are therefore a first line of defence, and the upstream
 * free-tier limit remains the real backstop.
 */

export type RateLimitScope =
  | "client-minute"
  | "client-day"
  | "global-minute"
  | "global-day";

export interface RateLimitDecision {
  allowed: boolean;
  scope: RateLimitScope;
  limit: number;
  remaining: number;
  /** Seconds the caller should wait before retrying. */
  retryAfterSeconds: number;
}

interface Window {
  timestamps: number[];
}

const clientMinute = new Map<string, Window>();
const clientDay = new Map<string, Window>();
let globalMinute: number[] = [];
let globalDay: number[] = [];

const MINUTE = 60_000;
const DAY = 24 * 60 * 60 * 1000;

function prune(timestamps: number[], now: number, windowMs: number): number[] {
  const cutoff = now - windowMs;
  const kept = timestamps.filter((stamp) => stamp > cutoff);
  return kept;
}

function decision(
  allowed: boolean,
  scope: RateLimitScope,
  limit: number,
  used: number,
  retryAfterMs: number
): RateLimitDecision {
  return {
    allowed,
    scope,
    limit,
    remaining: Math.max(0, limit - used),
    retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)),
  };
}

/**
 * Checks, and on success consumes, one unit of quota.
 *
 * The check is ordered from the tightest limit to the loosest one. A rejected
 * request is not counted as a successful answer and does not consume quota.
 */
export function checkAskRateLimit(
  clientKey: string,
  now: number = Date.now()
): RateLimitDecision {
  const key = clientKey || "anonymous";

  const minuteStamps = prune(
    clientMinute.get(key)?.timestamps ?? [],
    now,
    MINUTE
  );
  const dayStamps = prune(clientDay.get(key)?.timestamps ?? [], now, DAY);
  globalMinute = prune(globalMinute, now, MINUTE);
  globalDay = prune(globalDay, now, DAY);

  if (minuteStamps.length >= ASK_LIMITS.perMinutePerClient) {
    const oldest = minuteStamps[0] ?? now;
    return decision(
      false,
      "client-minute",
      ASK_LIMITS.perMinutePerClient,
      minuteStamps.length,
      oldest + MINUTE - now
    );
  }
  if (dayStamps.length >= ASK_LIMITS.perDayPerClient) {
    const oldest = dayStamps[0] ?? now;
    return decision(
      false,
      "client-day",
      ASK_LIMITS.perDayPerClient,
      dayStamps.length,
      oldest + DAY - now
    );
  }
  if (globalMinute.length >= ASK_LIMITS.perMinuteGlobal) {
    const oldest = globalMinute[0] ?? now;
    return decision(
      false,
      "global-minute",
      ASK_LIMITS.perMinuteGlobal,
      globalMinute.length,
      oldest + MINUTE - now
    );
  }
  if (globalDay.length >= ASK_LIMITS.perDayGlobal) {
    const oldest = globalDay[0] ?? now;
    return decision(
      false,
      "global-day",
      ASK_LIMITS.perDayGlobal,
      globalDay.length,
      oldest + DAY - now
    );
  }

  minuteStamps.push(now);
  dayStamps.push(now);
  globalMinute.push(now);
  globalDay.push(now);
  clientMinute.set(key, { timestamps: minuteStamps });
  clientDay.set(key, { timestamps: dayStamps });

  return decision(
    true,
    "client-minute",
    ASK_LIMITS.perMinutePerClient,
    minuteStamps.length,
    0
  );
}

/** Clears every counter. Used by the test suite. */
export function resetAskRateLimits(): void {
  clientMinute.clear();
  clientDay.clear();
  globalMinute = [];
  globalDay = [];
}
