import {
  artifacts as allArtifacts,
  hardwareTypeLabels,
  hardwareTypeOrder,
  hardwareTypeSingular,
} from "@/data/artifacts";
import type {
  Artifact,
  DestinationGroup,
  HardwareStatus,
  HardwareType,
  MissionEvent,
  MissionStatus,
} from "@/types/artifact";
import { decadeOf } from "./format";
import { hardwareStatusLabels, missionStatusLabels } from "./status";

export type SortOption = "oldest" | "newest" | "name";

export interface ArtifactFilters {
  destination: DestinationGroup | "all";
  hardwareType: HardwareType | "all";
  missionStatus: MissionStatus | "all";
  hardwareStatus: HardwareStatus | "all";
  decade: string | "all";
  eventType: string | "all";
}

export const defaultFilters: ArtifactFilters = {
  destination: "all",
  hardwareType: "all",
  missionStatus: "all",
  hardwareStatus: "all",
  decade: "all",
  eventType: "all",
};

export interface TimelineEntry {
  key: string;
  artifact: Artifact;
  event: MissionEvent;
}

const searchExtras = new Map(
  allArtifacts.map((artifact) => [
    artifact.id,
    [
      artifact.name,
      artifact.alternateNames?.join(" ") ?? "",
      artifact.missionName,
      artifact.programName,
      artifact.destination,
      hardwareTypeLabels[artifact.hardwareType],
      hardwareTypeSingular[artifact.hardwareType],
      artifact.shortDescription,
      artifact.overview,
      artifact.scientificPurpose,
      artifact.fate,
      artifact.location.body,
      artifact.location.locationName,
      artifact.timelineEvents.map((event) => event.label).join(" "),
      artifact.scientificContributions
        .map((contribution) => contribution.title)
        .join(" "),
    ]
      .join(" ")
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, ""),
  ])
);

export function searchScore(artifact: Artifact, query: string): number {
  const normalized = query
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");
  if (!normalized) return 0;

  const terms = normalized.split(/\s+/).filter(Boolean);
  const name = artifact.name.toLowerCase();
  const mission = artifact.missionName.toLowerCase();
  const aliases = (artifact.alternateNames ?? []).join(" ").toLowerCase();
  const haystack = searchExtras.get(artifact.id) ?? "";

  let score = 0;
  for (const term of terms) {
    let termScore = 0;
    if (name === term) termScore += 120;
    else if (name.startsWith(term)) termScore += 80;
    else if (name.includes(term)) termScore += 55;
    if (mission.includes(term)) termScore += 35;
    if (aliases.includes(term)) termScore += 30;
    if (
      artifact.destination.toLowerCase().includes(term) ||
      hardwareTypeLabels[artifact.hardwareType].toLowerCase().includes(term)
    ) {
      termScore += 20;
    }
    if (haystack.includes(term)) termScore += 10;
    if (termScore === 0) return 0;
    score += termScore;
  }
  return score;
}

export function searchArtifacts(
  query: string,
  source: Artifact[] = allArtifacts
): Artifact[] {
  if (!query.trim()) return source;
  return source
    .map((artifact) => ({ artifact, score: searchScore(artifact, query) }))
    .filter((entry) => entry.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.artifact.primaryMilestone.date.localeCompare(
          b.artifact.primaryMilestone.date
        )
    )
    .map((entry) => entry.artifact);
}

export function matchesFilters(
  artifact: Artifact,
  filters: ArtifactFilters
): boolean {
  if (
    filters.destination !== "all" &&
    artifact.destinationGroup !== filters.destination
  ) {
    return false;
  }
  if (
    filters.hardwareType !== "all" &&
    artifact.hardwareType !== filters.hardwareType
  ) {
    return false;
  }
  if (
    filters.missionStatus !== "all" &&
    artifact.missionStatus !== filters.missionStatus
  ) {
    return false;
  }
  if (
    filters.hardwareStatus !== "all" &&
    artifact.hardwareStatus !== filters.hardwareStatus
  ) {
    return false;
  }
  if (
    filters.decade !== "all" &&
    decadeOf(artifact.primaryMilestone.date) !== filters.decade
  ) {
    return false;
  }
  if (
    filters.eventType !== "all" &&
    artifact.primaryMilestone.type !== filters.eventType
  ) {
    return false;
  }
  return true;
}

export function filterArtifacts(
  filters: ArtifactFilters,
  source: Artifact[] = allArtifacts
): Artifact[] {
  return source.filter((artifact) => matchesFilters(artifact, filters));
}

export function sortArtifacts(
  list: Artifact[],
  sort: SortOption = "oldest"
): Artifact[] {
  const copy = [...list];
  if (sort === "name") {
    return copy.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sort === "newest") {
    return copy.sort((a, b) =>
      b.primaryMilestone.date.localeCompare(a.primaryMilestone.date)
    );
  }
  return copy.sort((a, b) =>
    a.primaryMilestone.date.localeCompare(b.primaryMilestone.date)
  );
}

/** One or every timeline event per artifact, always sorted chronologically. */
export function timelineEntries(
  scope: "primary" | "all",
  filters: ArtifactFilters,
  source: Artifact[] = allArtifacts
): TimelineEntry[] {
  // Event type is applied to the individual event below, not only to each
  // artifact's primary milestone, so "all events" can surface any matching
  // launch, flyby or end-of-mission milestone.
  const list = filterArtifacts({ ...filters, eventType: "all" }, source);
  const entries: TimelineEntry[] = [];
  for (const artifact of list) {
    if (scope === "primary") {
      entries.push({
        key: `${artifact.id}:${artifact.primaryMilestone.id}`,
        artifact,
        event: artifact.primaryMilestone,
      });
      continue;
    }
    for (const event of artifact.timelineEvents) {
      entries.push({
        key: `${artifact.id}:${event.id}`,
        artifact,
        event,
      });
    }
  }
  return entries
    .filter(
      (entry) =>
        filters.eventType === "all" || entry.event.type === filters.eventType
    )
    .sort(
      (a, b) =>
        a.event.date.localeCompare(b.event.date) ||
        a.artifact.name.localeCompare(b.artifact.name)
    );
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

export function countByHardwareType(
  source: Artifact[] = allArtifacts
): Array<{ type: HardwareType; count: number }> {
  return hardwareTypeOrder
    .map((type) => ({
      type,
      count: source.filter((artifact) => artifact.hardwareType === type).length,
    }))
    .filter((entry) => entry.count > 0);
}

export function getDecadeOptions(
  source: Artifact[] = allArtifacts
): string[] {
  return Array.from(
    new Set(source.map((artifact) => decadeOf(artifact.primaryMilestone.date)))
  ).sort();
}

export function getFilterOptions(source: Artifact[] = allArtifacts) {
  const destinations = Array.from(
    new Set(source.map((artifact) => artifact.destinationGroup))
  );
  const hardwareTypes = Array.from(
    new Set(source.map((artifact) => artifact.hardwareType))
  ).sort(
    (a, b) => hardwareTypeOrder.indexOf(a) - hardwareTypeOrder.indexOf(b)
  );
  const missionStatuses = Array.from(
    new Set(source.map((artifact) => artifact.missionStatus))
  );
  const hardwareStatuses = Array.from(
    new Set(source.map((artifact) => artifact.hardwareStatus))
  );
  const eventTypes = Array.from(
    new Set(source.map((artifact) => artifact.primaryMilestone.type))
  );
  return {
    destinations,
    hardwareTypes,
    missionStatuses,
    hardwareStatuses,
    eventTypes,
    decades: getDecadeOptions(source),
  };
}

export function activeFilterCount(filters: ArtifactFilters): number {
  return Object.values(filters).filter((value) => value !== "all").length;
}

export function hasActiveFilters(filters: ArtifactFilters): boolean {
  return activeFilterCount(filters) > 0;
}

export const missionStatusLabelsExport = missionStatusLabels;
export const hardwareStatusLabelsExport = hardwareStatusLabels;
