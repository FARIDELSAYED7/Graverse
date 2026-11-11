export type AgeBand = "5-7" | "8-9" | "10-12";

export const ageBands: AgeBand[] = ["5-7", "8-9", "10-12"];

export const ageBandMeta: Record<
  AgeBand,
  { label: string; short: string; description: string; accent: string }
> = {
  "5-7": {
    label: "Ages 5–7",
    short: "First explorers",
    description:
      "Short stories, big pictures and one idea at a time. Grown-ups can read along.",
    accent: "#9C4321",
  },
  "8-9": {
    label: "Ages 8–9",
    short: "Junior detectives",
    description:
      "Follow clues, compare machines and learn how missions are planned.",
    accent: "#0F766E",
  },
  "10-12": {
    label: "Ages 10–12",
    short: "Mission engineers",
    description:
      "Dig into engineering trade-offs, mission status and real scientific data.",
    accent: "#8A5A00",
  },
};

export interface LessonSection {
  heading: string;
  paragraphs: string[];
  callout?: string;
}

export interface LessonQuizQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  ageBand: AgeBand;
  minutes: number;
  summary: string;
  objectives: string[];
  sections: LessonSection[];
  keyTerms: Array<{ term: string; definition: string }>;
  tryIt: string;
  quiz: LessonQuizQuestion[];
  artifactIds: string[];
  bodyIds: string[];
  sourceIds: string[];
  accent: string;
}

export type JourneyStepKind =
  | "lesson"
  | "artifact"
  | "body"
  | "article"
  | "challenge";

export interface JourneyStep {
  id: string;
  title: string;
  kind: JourneyStepKind;
  description: string;
  href: string;
}

export interface Journey {
  id: string;
  title: string;
  ageBand: AgeBand;
  promise: string;
  minutes: number;
  summary: string;
  accent: string;
  badge: {
    id: string;
    name: string;
    description: string;
  };
  steps: JourneyStep[];
  sourceIds: string[];
}
