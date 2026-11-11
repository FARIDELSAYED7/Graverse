import type { GameProgress } from "./play";

export type { GameProgress };

export interface LessonProgress {
  completedAt: string;
  score: number;
  total: number;
}

export interface JourneyProgress {
  startedAt: string;
  completedSteps: string[];
  completedAt?: string;
}

export interface ProgressState {
  version: 1;
  lessons: Record<string, LessonProgress>;
  journeys: Record<string, JourneyProgress>;
  /** Playground completions. Optional for files exported before games existed. */
  games: Record<string, GameProgress>;
  badges: string[];
  lastVisited?: string;
  updatedAt: string;
}
