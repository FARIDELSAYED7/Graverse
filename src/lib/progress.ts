import type { ProgressState } from "@/types/progress";

export const PROGRESS_KEY = "graverse:progress:v1";
export const PROGRESS_VERSION = 1 as const;

export function emptyProgress(): ProgressState {
  return {
    version: PROGRESS_VERSION,
    lessons: {},
    journeys: {},
    games: {},
    badges: [],
    updatedAt: new Date().toISOString(),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Validate imported progress before it touches storage. Unknown fields are
 * dropped, and every lesson/journey key must be a non-empty string.
 */
export function validateProgress(value: unknown): ProgressState | null {
  if (!isRecord(value)) return null;
  if (value.version !== PROGRESS_VERSION) return null;

  const lessons: ProgressState["lessons"] = {};
  if (isRecord(value.lessons)) {
    for (const [key, entry] of Object.entries(value.lessons)) {
      if (!key || !isRecord(entry)) return null;
      const { completedAt, score, total } = entry;
      if (typeof completedAt !== "string" || Number.isNaN(Date.parse(completedAt))) {
        return null;
      }
      if (
        typeof score !== "number" ||
        typeof total !== "number" ||
        !Number.isFinite(score) ||
        !Number.isFinite(total) ||
        score < 0 ||
        total < 0 ||
        score > total
      ) {
        return null;
      }
      lessons[key] = { completedAt, score, total };
    }
  } else {
    return null;
  }

  const journeys: ProgressState["journeys"] = {};
  if (isRecord(value.journeys)) {
    for (const [key, entry] of Object.entries(value.journeys)) {
      if (!key || !isRecord(entry)) return null;
      if (typeof entry.startedAt !== "string" || Number.isNaN(Date.parse(entry.startedAt))) {
        return null;
      }
      const completedSteps = Array.isArray(entry.completedSteps)
        ? entry.completedSteps.filter((step): step is string => typeof step === "string")
        : [];
      const completedAt =
        typeof entry.completedAt === "string" ? entry.completedAt : undefined;
      journeys[key] = {
        startedAt: entry.startedAt,
        completedSteps,
        ...(completedAt ? { completedAt } : {}),
      };
    }
  } else {
    return null;
  }

  const games: ProgressState["games"] = {};
  if (value.games !== undefined) {
    if (!isRecord(value.games)) return null;
    for (const [key, entry] of Object.entries(value.games)) {
      if (!key || !isRecord(entry)) return null;
      if (
        typeof entry.completedAt !== "string" ||
        Number.isNaN(Date.parse(entry.completedAt))
      ) {
        return null;
      }
      if (
        typeof entry.stars !== "number" ||
        !Number.isInteger(entry.stars) ||
        entry.stars < 0 ||
        entry.stars > 3
      ) {
        return null;
      }
      games[key] = { completedAt: entry.completedAt, stars: entry.stars };
    }
  }

  const badges = Array.isArray(value.badges)
    ? value.badges.filter((badge): badge is string => typeof badge === "string")
    : [];

  return {
    version: PROGRESS_VERSION,
    lessons,
    journeys,
    games,
    badges,
    lastVisited: typeof value.lastVisited === "string" ? value.lastVisited : undefined,
    updatedAt:
      typeof value.updatedAt === "string" ? value.updatedAt : new Date().toISOString(),
  };
}

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const raw = window.localStorage.getItem(PROGRESS_KEY);
    if (!raw) return emptyProgress();
    return validateProgress(JSON.parse(raw)) ?? emptyProgress();
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(state: ProgressState): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function resetProgress(): ProgressState {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(PROGRESS_KEY);
    } catch {
      /* Storage may be disabled; the in-memory store still resets. */
    }
  }
  return emptyProgress();
}

export function exportProgress(state: ProgressState): string {
  return JSON.stringify(state, null, 2);
}

export function progressSummary(state: ProgressState) {
  const lessons = Object.keys(state.lessons).length;
  const journeys = Object.keys(state.journeys);
  const completedJourneys = journeys.filter(
    (id) => state.journeys[id]?.completedAt
  ).length;
  const steps = journeys.reduce(
    (sum, id) => sum + (state.journeys[id]?.completedSteps.length ?? 0),
    0
  );
  return {
    lessons,
    journeysStarted: journeys.length,
    journeysCompleted: completedJourneys,
    steps,
    games: Object.keys(state.games).length,
    badges: state.badges.length,
  };
}
