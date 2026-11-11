import type { AgeBand } from "./academy";

export type PlayGameId = "rocket" | "moon" | "rover";

/**
 * Metadata for an Academy playground game.
 *
 * Games are toys built from simple shapes, not reconstructions of real
 * spacecraft. Each one links back to a verified lesson, artifact or body so a
 * child can move from the game to the sourced record.
 */
export interface PlayGame {
  id: PlayGameId;
  title: string;
  tagline: string;
  description: string;
  ages: AgeBand[];
  minutes: number;
  accent: string;
  softAccent: string;
  badge: {
    id: string;
    name: string;
    description: string;
  };
  skills: string[];
  controls: string;
  toyNote: string;
  lessonId: string;
  artifactIds: string[];
  bodyIds: string[];
  sourceIds: string[];
}

export interface GameProgress {
  completedAt: string;
  /** Best result, 1–3. */
  stars: number;
}

export interface RocketConfig {
  nose: "pointy" | "round";
  body: "short" | "tall";
  fins: 3 | 4;
  engine: "small" | "big";
  bodyColor: string;
  noseColor: string;
  finColor: string;
}
