import type { HardwareType } from "@/types/artifact";

export type JuniorQuizKind = "destination" | "hardware" | "milestone";

export type JuniorQuizSeed = {
  artifactId: string;
  kind: JuniorQuizKind;
  /** Used only for milestone questions; the correct artifact must be included. */
  optionArtifactIds?: string[];
};

export type JuniorQuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  artifactId: string;
  artifactName: string;
  artifactHref: string;
};

export type WordLabEntry = {
  term: string;
  hardwareType: HardwareType;
  definition: string;
};
