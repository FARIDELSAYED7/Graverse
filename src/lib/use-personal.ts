"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  addRecent,
  createCollection,
  deleteCollection,
  emptyPersonal,
  exportPersonal,
  importPersonal,
  loadPersonal,
  recordSimulation,
  resetPersonal,
  savePersonal,
  toggleCollectionItem,
  toggleFavorite,
} from "@/lib/personal";
import type { PersonalState } from "@/lib/personal";

export type PersonalStorageMode = "loading" | "local" | "memory";

/**
 * Local-only personal state. Nothing is sent to a server, and the hook keeps
 * working in memory when localStorage is unavailable.
 */
export function usePersonal() {
  const [state, setState] = useState<PersonalState>(() => emptyPersonal());
  const [mode, setMode] = useState<PersonalStorageMode>("loading");
  const stateRef = useRef(state);

  useEffect(() => {
    const loaded = loadPersonal();
    stateRef.current = loaded;
    setState(loaded);
    setMode(savePersonal(loaded) ? "local" : "memory");
  }, []);

  const commit = useCallback(
    (update: (previous: PersonalState) => PersonalState) => {
      const next = update(stateRef.current);
      stateRef.current = next;
      setState(next);
      setMode(savePersonal(next) ? "local" : "memory");
    },
    []
  );

  const isFavorite = useCallback(
    (artifactId: string) => state.favorites.includes(artifactId),
    [state.favorites]
  );

  const favorite = useCallback(
    (artifactId: string) => commit((previous) => toggleFavorite(previous, artifactId)),
    [commit]
  );

  const view = useCallback(
    (artifactId: string) => commit((previous) => addRecent(previous, artifactId)),
    [commit]
  );

  const makeCollection = useCallback(
    (name: string, artifactIds: string[] = []) =>
      commit((previous) => createCollection(previous, name, artifactIds)),
    [commit]
  );

  const removeCollection = useCallback(
    (collectionId: string) =>
      commit((previous) => deleteCollection(previous, collectionId)),
    [commit]
  );

  const toggleItem = useCallback(
    (collectionId: string, artifactId: string) =>
      commit((previous) => toggleCollectionItem(previous, collectionId, artifactId)),
    [commit]
  );

  const completeSimulation = useCallback(
    (simulationId: string, score?: number) =>
      commit((previous) => recordSimulation(previous, simulationId, score)),
    [commit]
  );

  const reset = useCallback(() => {
    const empty = resetPersonal();
    stateRef.current = empty;
    setState(empty);
    setMode(savePersonal(empty) ? "local" : "memory");
  }, []);

  const importJson = useCallback(
    (raw: string): { ok: boolean; error?: string } => {
      const validated = importPersonal(raw);
      if (!validated) {
        return {
          ok: false,
          error:
            "That file does not match the GRAVERSE personal-data format (version 1). Nothing was imported.",
        };
      }
      stateRef.current = validated;
      setState(validated);
      setMode(savePersonal(validated) ? "local" : "memory");
      return { ok: true };
    },
    []
  );

  const summary = useMemo(
    () => ({
      favorites: state.favorites.length,
      collections: state.collections.length,
      recent: state.recent.length,
      simulations: Object.keys(state.simulations).length,
    }),
    [state]
  );

  return {
    state,
    mode,
    summary,
    isFavorite,
    favorite,
    view,
    makeCollection,
    removeCollection,
    toggleItem,
    completeSimulation,
    reset,
    exportJson: () => exportPersonal(state),
    importJson,
  };
}
