import type { JuniorQuizSeed, WordLabEntry } from "@/types/kids";

/**
 * Curated entry points for the Junior Explorers guide.
 *
 * These are only selections from the existing artifact records. The notes
 * below simplify wording; they do not add facts beyond the linked record.
 */
export const juniorArtifactIds = [
  "apollo-11-lm-descent-stage",
  "apollo-15-lunar-rover",
  "perseverance",
  "ingenuity",
  "voyager-1",
  "new-horizons",
] as const;

export const juniorArtifactNotes: Record<string, string> = {
  "apollo-11-lm-descent-stage":
    "This is the lower half of Eagle, the lunar module that carried the first astronauts to the Moon. It was left behind at Tranquility Base.",
  "apollo-15-lunar-rover":
    "The first rover driven on the Moon. It helped Apollo 15 astronauts travel farther and carry more tools.",
  perseverance:
    "A car-sized rover exploring Jezero Crater. It is collecting rock samples for a possible future trip to Earth.",
  ingenuity:
    "A small helicopter that made the first powered, controlled flight on another planet. It flew 72 times.",
  "voyager-1":
    "The most distant human-made object. It flew past Jupiter and Saturn and is now in interstellar space.",
  "new-horizons":
    "The first spacecraft to fly past Pluto. It later explored a Kuiper Belt object.",
};

export const wordLabEntries: WordLabEntry[] = [
  {
    term: "Rover",
    hardwareType: "rover",
    definition:
      "A wheeled vehicle that drives across a surface and carries cameras or tools.",
  },
  {
    term: "Lander",
    hardwareType: "lander",
    definition:
      "A spacecraft that touches down and stays on a surface.",
  },
  {
    term: "Orbiter",
    hardwareType: "orbiter",
    definition:
      "A spacecraft that circles a planet or moon to study it from above.",
  },
  {
    term: "Probe",
    hardwareType: "probe",
    definition:
      "A robot spacecraft sent to explore space, often flying past planets.",
  },
  {
    term: "Instrument",
    hardwareType: "instrument",
    definition:
      "A tool or sensor that takes measurements. Some keep working for decades.",
  },
  {
    term: "Surface equipment",
    hardwareType: "surface-equipment",
    definition:
      "Gear set up on a surface to run experiments or take measurements.",
  },
  {
    term: "Aircraft",
    hardwareType: "aircraft",
    definition:
      "A flying machine. Ingenuity was the first to fly on another planet.",
  },
];

/**
 * Quiz seeds. Destination and hardware answers come straight from each
 * artifact. Milestone answers use the artifact's recorded primary milestone.
 */
export const juniorQuizSeeds: JuniorQuizSeed[] = [
  { artifactId: "perseverance", kind: "destination" },
  { artifactId: "apollo-15-lunar-rover", kind: "hardware" },
  { artifactId: "voyager-1", kind: "destination" },
  { artifactId: "ingenuity", kind: "hardware" },
  {
    artifactId: "new-horizons",
    kind: "milestone",
    optionArtifactIds: [
      "new-horizons",
      "ingenuity",
      "apollo-15-lunar-rover",
      "viking-1-lander",
    ],
  },
];
