/**
 * Personal, local-only state: favourites, collections, recently viewed records
 * and completed simulations. It is deliberately separate from Academy progress
 * so importing an old progress file cannot corrupt a visitor's collection.
 */

export const PERSONAL_KEY = "graverse:personal:v1";
export const PERSONAL_VERSION = 1 as const;
export const MAX_RECENT = 16;

export interface RecentEntry {
  id: string;
  viewedAt: string;
}

export interface PersonalCollection {
  id: string;
  name: string;
  artifactIds: string[];
  createdAt: string;
}

export interface SimulationRecord {
  completedAt: string;
  score?: number;
}

export interface PersonalState {
  version: 1;
  favorites: string[];
  collections: PersonalCollection[];
  recent: RecentEntry[];
  simulations: Record<string, SimulationRecord>;
  updatedAt: string;
}

export function emptyPersonal(): PersonalState {
  return {
    version: PERSONAL_VERSION,
    favorites: [],
    collections: [],
    recent: [],
    simulations: {},
    updatedAt: new Date().toISOString(),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validDate(value: unknown): value is string {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function uniqueStrings(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return Array.from(
    new Set(value.filter((entry): entry is string => typeof entry === "string" && entry.length > 0))
  );
}

export function validatePersonal(value: unknown): PersonalState | null {
  if (!isRecord(value) || value.version !== PERSONAL_VERSION) return null;

  const favorites = uniqueStrings(value.favorites);

  const collections: PersonalCollection[] = [];
  if (value.collections !== undefined) {
    if (!Array.isArray(value.collections)) return null;
    for (const entry of value.collections) {
      if (!isRecord(entry)) return null;
      if (typeof entry.id !== "string" || !entry.id) return null;
      if (typeof entry.name !== "string" || !entry.name.trim()) return null;
      if (!validDate(entry.createdAt)) return null;
      collections.push({
        id: entry.id,
        name: entry.name.trim().slice(0, 80),
        artifactIds: uniqueStrings(entry.artifactIds),
        createdAt: entry.createdAt,
      });
    }
  }

  const recent: RecentEntry[] = [];
  if (value.recent !== undefined) {
    if (!Array.isArray(value.recent)) return null;
    for (const entry of value.recent) {
      if (!isRecord(entry)) return null;
      if (typeof entry.id !== "string" || !entry.id) return null;
      if (!validDate(entry.viewedAt)) return null;
      recent.push({ id: entry.id, viewedAt: entry.viewedAt });
    }
  }

  const simulations: Record<string, SimulationRecord> = {};
  if (value.simulations !== undefined) {
    if (!isRecord(value.simulations)) return null;
    for (const [key, entry] of Object.entries(value.simulations)) {
      if (!key || !isRecord(entry) || !validDate(entry.completedAt)) return null;
      simulations[key] = {
        completedAt: entry.completedAt,
        ...(typeof entry.score === "number" && Number.isFinite(entry.score)
          ? { score: entry.score }
          : {}),
      };
    }
  }

  return {
    version: PERSONAL_VERSION,
    favorites,
    collections,
    recent: recent.slice(0, MAX_RECENT),
    simulations,
    updatedAt: validDate(value.updatedAt)
      ? value.updatedAt
      : new Date().toISOString(),
  };
}

export function loadPersonal(): PersonalState {
  if (typeof window === "undefined") return emptyPersonal();
  try {
    const raw = window.localStorage.getItem(PERSONAL_KEY);
    if (!raw) return emptyPersonal();
    return validatePersonal(JSON.parse(raw)) ?? emptyPersonal();
  } catch {
    return emptyPersonal();
  }
}

export function savePersonal(state: PersonalState): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(PERSONAL_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function toggleFavorite(state: PersonalState, artifactId: string): PersonalState {
  const exists = state.favorites.includes(artifactId);
  return {
    ...state,
    favorites: exists
      ? state.favorites.filter((id) => id !== artifactId)
      : [...state.favorites, artifactId],
    updatedAt: new Date().toISOString(),
  };
}

export function addRecent(state: PersonalState, artifactId: string): PersonalState {
  const next: RecentEntry = { id: artifactId, viewedAt: new Date().toISOString() };
  return {
    ...state,
    recent: [next, ...state.recent.filter((entry) => entry.id !== artifactId)].slice(
      0,
      MAX_RECENT
    ),
    updatedAt: next.viewedAt,
  };
}

export function createCollection(
  state: PersonalState,
  name: string,
  artifactIds: string[] = []
): PersonalState {
  const clean = name.trim().slice(0, 80);
  if (!clean) return state;
  const id = `col-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
  return {
    ...state,
    collections: [
      ...state.collections,
      {
        id,
        name: clean,
        artifactIds: Array.from(new Set(artifactIds)),
        createdAt: new Date().toISOString(),
      },
    ],
    updatedAt: new Date().toISOString(),
  };
}

export function deleteCollection(state: PersonalState, collectionId: string): PersonalState {
  return {
    ...state,
    collections: state.collections.filter((collection) => collection.id !== collectionId),
    updatedAt: new Date().toISOString(),
  };
}

export function toggleCollectionItem(
  state: PersonalState,
  collectionId: string,
  artifactId: string
): PersonalState {
  return {
    ...state,
    collections: state.collections.map((collection) => {
      if (collection.id !== collectionId) return collection;
      const exists = collection.artifactIds.includes(artifactId);
      return {
        ...collection,
        artifactIds: exists
          ? collection.artifactIds.filter((id) => id !== artifactId)
          : [...collection.artifactIds, artifactId],
      };
    }),
    updatedAt: new Date().toISOString(),
  };
}

export function recordSimulation(
  state: PersonalState,
  simulationId: string,
  score?: number
): PersonalState {
  return {
    ...state,
    simulations: {
      ...state.simulations,
      [simulationId]: {
        completedAt: new Date().toISOString(),
        ...(typeof score === "number" ? { score } : {}),
      },
    },
    updatedAt: new Date().toISOString(),
  };
}

export function exportPersonal(state: PersonalState): string {
  return JSON.stringify(state, null, 2);
}

export function resetPersonal(): PersonalState {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(PERSONAL_KEY);
    } catch {
      /* Storage may be disabled; the in-memory store still resets. */
    }
  }
  return emptyPersonal();
}

export function importPersonal(raw: string): PersonalState | null {
  try {
    return validatePersonal(JSON.parse(raw));
  } catch {
    return null;
  }
}
