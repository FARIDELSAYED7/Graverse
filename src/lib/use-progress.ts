"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  emptyProgress,
  exportProgress,
  loadProgress,
  resetProgress,
  saveProgress,
  validateProgress,
} from "@/lib/progress";
import type { ProgressState } from "@/types/progress";

export type StorageMode = "loading" | "local" | "memory";

export function useProgress() {
  const [state, setState] = useState<ProgressState>(() => emptyProgress());
  const [mode, setMode] = useState<StorageMode>("loading");

  useEffect(() => {
    const loaded = loadProgress();
    setState(loaded);
    setMode(saveProgress(loaded) ? "local" : "memory");
  }, []);

  const commit = useCallback((next: ProgressState) => {
    const stamped = { ...next, updatedAt: new Date().toISOString() };
    setState(stamped);
    setMode(saveProgress(stamped) ? "local" : "memory");
    return stamped;
  }, []);

  const markLesson = useCallback(
    (lessonId: string, score: number, total: number, badgeId?: string) => {
      setState((previous) => {
        const next: ProgressState = {
          ...previous,
          lessons: {
            ...previous.lessons,
            [lessonId]: {
              completedAt: new Date().toISOString(),
              score,
              total,
            },
          },
          badges:
            badgeId && !previous.badges.includes(badgeId)
              ? [...previous.badges, badgeId]
              : previous.badges,
          updatedAt: new Date().toISOString(),
        };
        saveProgress(next);
        return next;
      });
      setMode((current) => (current === "loading" ? "local" : current));
    },
    []
  );

  const completeStep = useCallback(
    (
      journeyId: string,
      stepId: string,
      allStepIds: string[],
      badgeId?: string
    ) => {
      setState((previous) => {
        const existing = previous.journeys[journeyId];
        const completedSteps = existing?.completedSteps ?? [];
        if (completedSteps.includes(stepId)) return previous;
        const updatedSteps = [...completedSteps, stepId];
        const complete = allStepIds.every((id) => updatedSteps.includes(id));
        const next: ProgressState = {
          ...previous,
          journeys: {
            ...previous.journeys,
            [journeyId]: {
              startedAt: existing?.startedAt ?? new Date().toISOString(),
              completedSteps: updatedSteps,
              ...(complete ? { completedAt: new Date().toISOString() } : {}),
            },
          },
          badges:
            complete && badgeId && !previous.badges.includes(badgeId)
              ? [...previous.badges, badgeId]
              : previous.badges,
          updatedAt: new Date().toISOString(),
        };
        saveProgress(next);
        return next;
      });
    },
    []
  );

  const reset = useCallback(() => {
    const empty = resetProgress();
    setState(empty);
    setMode(saveProgress(empty) ? "local" : "memory");
  }, []);

  const recordGame = useCallback(
    (gameId: string, badgeId: string, stars: number) => {
      const safeStars = Math.max(0, Math.min(3, Math.round(stars)));
      setState((previous) => {
        const best = Math.max(previous.games[gameId]?.stars ?? 0, safeStars);
        const next: ProgressState = {
          ...previous,
          games: {
            ...previous.games,
            [gameId]: {
              completedAt: new Date().toISOString(),
              stars: best,
            },
          },
          badges:
            badgeId && !previous.badges.includes(badgeId)
              ? [...previous.badges, badgeId]
              : previous.badges,
          updatedAt: new Date().toISOString(),
        };
        saveProgress(next);
        return next;
      });
      setMode((current) => (current === "loading" ? "local" : current));
    },
    []
  );

  const importJson = useCallback((raw: string): { ok: boolean; error?: string } => {
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return { ok: false, error: "That file is not valid JSON." };
    }
    const validated = validateProgress(parsed);
    if (!validated) {
      return {
        ok: false,
        error:
          "The file does not match the GRAVERSE progress format (version 1). Nothing was imported.",
      };
    }
    commit(validated);
    return { ok: true };
  }, [commit]);

  const summary = useMemo(() => {
    const lessons = Object.keys(state.lessons).length;
    const journeyIds = Object.keys(state.journeys);
    const journeysCompleted = journeyIds.filter(
      (id) => state.journeys[id]?.completedAt
    ).length;
    const steps = journeyIds.reduce(
      (sum, id) => sum + (state.journeys[id]?.completedSteps.length ?? 0),
      0
    );
    return {
      lessons,
      journeysStarted: journeyIds.length,
      journeysCompleted,
      steps,
      games: Object.keys(state.games).length,
      badges: state.badges.length,
    };
  }, [state]);

  return {
    state,
    mode,
    summary,
    markLesson,
    completeStep,
    recordGame,
    reset,
    exportJson: () => exportProgress(state),
    importJson,
  };
}
