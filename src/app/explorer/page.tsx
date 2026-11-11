import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Orbit, Telescope } from "lucide-react";
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
  title: "Explorer — timeline, destinations and artifacts",
  description:
    "Investigate NASA space hardware by time, destination or artifact type. Every milestone links to a source-linked museum record, and every claim says how well it is established.",
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

export default function ExplorerPage({
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
      <header className="mb-8 max-w-3xl">
        <p className="eyebrow">Explorer</p>
        <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
          The archive, arranged three ways
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
          Move through time, sort by destination, or compare artifact types. The
          same records power the museum; this is the investigative view. Every
          record states what is confirmed, estimated or unknown.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href="/explorer/solar-system"
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-text-secondary transition-colors hover:border-brand-cyan/40 hover:text-white"
          >
            <Orbit aria-hidden="true" className="h-3.5 w-3.5 text-brand-cyan" />
            Solar system orrery
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/explorer/bodies"
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-text-secondary transition-colors hover:border-brand-cyan/40 hover:text-white"
          >
            <Telescope aria-hidden="true" className="h-3.5 w-3.5 text-brand-cyan" />
            Destinations and deep sky
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>
      <ExploreExperience initial={initial} />
    </div>
  );
}
