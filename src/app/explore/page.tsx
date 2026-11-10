import type { Metadata } from "next";
import {
  ExploreExperience,
  type ExploreInitialState,
  type ExploreMode,
  type ExploreView,
} from "@/components/explore/ExploreExperience";
import {
  defaultFilters,
  getFilterOptions,
  type ArtifactFilters,
  type SortOption,
} from "@/lib/explore";
import type {
  DestinationGroup,
  HardwareStatus,
  HardwareType,
  MissionStatus,
} from "@/types/artifact";

export const metadata: Metadata = {
  title: "Explore the timeline",
  description:
    "Browse NASA space hardware by time, destination or artifact type. Every milestone links to a source-linked museum record.",
};

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function oneOf<T extends string>(
  value: string | undefined,
  options: readonly T[],
  fallback: T
): T {
  return value && (options as readonly string[]).includes(value)
    ? (value as T)
    : fallback;
}

export default function ExplorePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const options = getFilterOptions();

  const mode = oneOf<ExploreMode>(
    first(searchParams.mode),
    ["timeline", "destinations", "artifacts"],
    "timeline"
  );
  const view = oneOf<ExploreView>(
    first(searchParams.view),
    ["visual", "list"],
    "visual"
  );
  const scope = oneOf(first(searchParams.scope), ["primary", "all"], "primary");
  const sort = oneOf<SortOption>(
    first(searchParams.sort),
    ["oldest", "newest", "name"],
    "oldest"
  );

  const filters: ArtifactFilters = {
    destination: oneOf<DestinationGroup | "all">(
      first(searchParams.destination),
      ["all", ...options.destinations],
      defaultFilters.destination
    ),
    hardwareType: oneOf<HardwareType | "all">(
      first(searchParams.hardwareType),
      ["all", ...options.hardwareTypes],
      defaultFilters.hardwareType
    ),
    missionStatus: oneOf<MissionStatus | "all">(
      first(searchParams.missionStatus),
      ["all", ...options.missionStatuses],
      defaultFilters.missionStatus
    ),
    hardwareStatus: oneOf<HardwareStatus | "all">(
      first(searchParams.hardwareStatus),
      ["all", ...options.hardwareStatuses],
      defaultFilters.hardwareStatus
    ),
    decade: oneOf(
      first(searchParams.decade),
      ["all", ...options.decades],
      defaultFilters.decade
    ),
    eventType: oneOf(
      first(searchParams.eventType),
      ["all", ...options.eventTypes],
      defaultFilters.eventType
    ),
  };

  const initial: ExploreInitialState = {
    mode,
    view,
    scope,
    sort,
    filters,
    eventKey: first(searchParams.event),
    artifactId: first(searchParams.artifact),
  };

  return (
    <div className="container-content pb-16 pt-8 sm:pt-10">
      <ExploreExperience initial={initial} />
    </div>
  );
}
