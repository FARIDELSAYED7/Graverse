import type { Metadata } from "next";
import {
  SearchExperience,
  type SearchInitialState,
} from "@/components/search/SearchExperience";
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
  title: "Search",
  description:
    "Search NASA artifacts, missions, destinations and hardware types across the GRAVERSE collection.",
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

export default function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const options = getFilterOptions();

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
    decade: "all",
    eventType: "all",
  };

  const initial: SearchInitialState = {
    query: first(searchParams.q) ?? "",
    filters,
    sort: oneOf<SortOption>(
      first(searchParams.sort),
      ["oldest", "newest", "name"],
      "oldest"
    ),
  };

  return (
    <div className="container-content pb-16 pt-8 sm:pt-10">
      <SearchExperience initial={initial} />
    </div>
  );
}
