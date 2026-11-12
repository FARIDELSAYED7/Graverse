import type { AskContextKind } from "@/lib/ask/types";

/**
 * Suggested questions.
 *
 * The keys are literal so the localisation test can confirm that every
 * suggestion exists in both dictionaries. The arrays are ordered from the most
 * immediately useful question to the most exploratory one.
 */

export const GLOBAL_SUGGESTION_KEYS = [
  "ask.suggest.global.whatIsGraverse",
  "ask.suggest.global.operatingHardware",
  "ask.suggest.global.statusDifference",
  "ask.suggest.global.moonEquipment",
  "ask.suggest.global.marsDiscovery",
  "ask.suggest.global.explainToChild",
];

const KIND_SUGGESTION_KEYS: Record<AskContextKind, string[]> = {
  artifact: [
    "ask.suggest.artifact.explain",
    "ask.suggest.artifact.whySent",
    "ask.suggest.artifact.discoveries",
    "ask.suggest.artifact.hardware",
    "ask.suggest.artifact.explainToTwelve",
    "ask.suggest.artifact.compare",
    "ask.suggest.artifact.statusDifference",
  ],
  mission: [
    "ask.suggest.mission.overview",
    "ask.suggest.mission.hardware",
    "ask.suggest.mission.engineering",
    "ask.suggest.mission.explainToTwelve",
  ],
  lesson: [
    "ask.suggest.lesson.goals",
    "ask.suggest.lesson.records",
    "ask.suggest.lesson.explainToTwelve",
  ],
  engineering: [
    "ask.suggest.engineering.howItWorks",
    "ask.suggest.engineering.records",
    "ask.suggest.engineering.explainToTwelve",
  ],
  simulation: [
    "ask.suggest.simulation.approximation",
    "ask.suggest.simulation.records",
    "ask.suggest.simulation.explainToTwelve",
  ],
  body: [
    "ask.suggest.body.history",
    "ask.suggest.body.explainToTwelve",
  ],
  story: [
    "ask.suggest.story.summary",
    "ask.suggest.story.records",
  ],
  agency: [
    "ask.suggest.agency.role",
    "ask.suggest.agency.records",
  ],
  "deep-sky": [
    "ask.suggest.deepSky.overview",
    "ask.suggest.deepSky.distance",
    "ask.suggest.deepSky.discovery",
  ],
  article: [
    "ask.suggest.article.summary",
    "ask.suggest.article.records",
  ],
};

/** The suggested questions for the current mode. */
export function askSuggestionKeys(kind: AskContextKind | null): string[] {
  if (!kind) return GLOBAL_SUGGESTION_KEYS;
  return KIND_SUGGESTION_KEYS[kind] ?? GLOBAL_SUGGESTION_KEYS;
}
