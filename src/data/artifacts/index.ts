import type { Artifact, DestinationGroup, HardwareType } from "@/types/artifact";
import { eventTypeLabels } from "@/lib/status";
import { moonArtifactsA } from "./moon-a";
import { moonArtifactsB } from "./moon-b";
import { marsArtifactsA } from "./mars-a";
import { marsArtifactsB } from "./mars-b";
import { deepSpaceArtifactsA } from "./deep-a";
import { deepSpaceArtifactsB } from "./deep-b";
import { deepSpaceArtifactsC } from "./deep-c";

export const allArtifacts: Artifact[] = [
  ...moonArtifactsA,
  ...moonArtifactsB,
  ...marsArtifactsA,
  ...marsArtifactsB,
  ...deepSpaceArtifactsA,
  ...deepSpaceArtifactsB,
  ...deepSpaceArtifactsC,
].sort((a, b) => {
  const aDate = a.launchDate ?? a.primaryMilestone.date;
  const bDate = b.launchDate ?? b.primaryMilestone.date;
  return aDate.localeCompare(bDate);
});

const artifactMap = new Map(allArtifacts.map((artifact) => [artifact.id, artifact]));

export function getAllArtifacts(): Artifact[] {
  return allArtifacts;
}

export function getArtifactById(id: string): Artifact | undefined {
  return artifactMap.get(id);
}

export function getArtifactsByIds(ids: string[]): Artifact[] {
  return ids
    .map((id) => artifactMap.get(id))
    .filter((artifact): artifact is Artifact => Boolean(artifact));
}

export function getArtifactsByDestination(group: DestinationGroup): Artifact[] {
  return allArtifacts.filter((artifact) => artifact.destinationGroup === group);
}

export function getArtifactsByHardwareType(type: HardwareType): Artifact[] {
  return allArtifacts.filter((artifact) => artifact.hardwareType === type);
}

export function countByDestination(
  source: Artifact[] = allArtifacts
): Record<DestinationGroup, number> {
  return source.reduce(
    (counts, artifact) => {
      counts[artifact.destinationGroup] += 1;
      return counts;
    },
    { moon: 0, mars: 0, "deep-space": 0 } as Record<DestinationGroup, number>
  );
}

export const hardwareTypeOrder: HardwareType[] = [
  "rover",
  "lander",
  "orbiter",
  "probe",
  "instrument",
  "surface-equipment",
  "aircraft",
];

export const hardwareTypeSingular: Record<HardwareType, string> = {
  rover: "Rover",
  lander: "Lander",
  orbiter: "Orbiter",
  probe: "Probe",
  instrument: "Instrument",
  "surface-equipment": "Surface equipment",
  aircraft: "Aircraft",
};

export const hardwareTypeLabels: Record<HardwareType, string> = {
  rover: "Rovers",
  lander: "Landers",
  orbiter: "Orbiters",
  probe: "Probes",
  instrument: "Instruments",
  "surface-equipment": "Surface equipment",
  aircraft: "Aircraft",
};

export interface DestinationMeta {
  id: DestinationGroup;
  name: string;
  shortLabel: string;
  description: string;
  image: string;
  imageAlt: string;
  credit: string;
  accent: string;
  eyebrow: string;
}

export const destinationMeta: Record<DestinationGroup, DestinationMeta> = {
  moon: {
    id: "moon",
    name: "The Moon",
    shortLabel: "Moon",
    description:
      "Impact probes, soft landers, rover tracks, experiment packages and the first human footprints beyond Earth.",
    image: "/images/destination-moon.jpg",
    imageAlt:
      "Earth rising above the Moon's horizon, photographed during Apollo 11.",
    credit: "NASA/JSC",
    accent: "#8fc7ff",
    eyebrow: "Earth's nearest neighbor",
  },
  mars: {
    id: "mars",
    name: "Mars",
    shortLabel: "Mars",
    description:
      "Landers and rovers that turned a distant red point of light into a place with weather, rocks and a watery past.",
    image: "/images/destination-mars.jpg",
    imageAlt: "A NASA global view of Mars from the Viking era.",
    credit: "NASA/JPL/USGS",
    accent: "#ff9d7a",
    eyebrow: "The red planet",
  },
  "deep-space": {
    id: "deep-space",
    name: "Deep Space",
    shortLabel: "Deep Space",
    description:
      "Probes that left the inner solar system, toured the giant planets and crossed into interstellar space.",
    image: "/images/destination-deep-space.jpg",
    imageAlt:
      "Artist's concept of a Voyager spacecraft traveling through deep space.",
    credit: "NASA/JPL-Caltech",
    accent: "#c3a6ff",
    eyebrow: "Beyond the planets",
  },
};

export const destinationOrder: DestinationGroup[] = ["moon", "mars", "deep-space"];

export const destinations = destinationOrder.map(
  (destination) => destinationMeta[destination]
);

export const featuredIds = [
  "apollo-11-lrrr",
  "perseverance",
  "voyager-1",
  "apollo-15-lunar-rover",
];

export const museumHighlights: Record<DestinationGroup, string[]> = {
  moon: [
    "apollo-11-lm-descent-stage",
    "apollo-11-lrrr",
    "apollo-15-lunar-rover",
    "apollo-17-lm-descent-stage",
  ],
  mars: ["viking-1-lander", "sojourner", "curiosity", "perseverance"],
  "deep-space": ["pioneer-10", "voyager-1", "voyager-2", "new-horizons"],
};

export const datasetStats = {
  total: allArtifacts.length,
  moon: countByDestination().moon,
  mars: countByDestination().mars,
  deepSpace: countByDestination()["deep-space"],
  ongoing: allArtifacts.filter((artifact) => artifact.missionStatus === "ongoing")
    .length,
  operating: allArtifacts.filter(
    (artifact) => artifact.hardwareStatus === "operating"
  ).length,
  lastVerified: "2026-11-13",
};

/* Compatibility aliases used by the UI layer. */
export const artifacts = allArtifacts;
export const getArtifact = getArtifactById;
export const getArtifacts = getArtifactsByIds;
export { eventTypeLabels };
