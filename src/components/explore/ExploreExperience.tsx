"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Box,
  Compass,
  Cpu,
  Globe2,
  Layers,
  List,
  Moon,
  Orbit,
  Plane,
  Rocket,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  Truck,
  Waypoints,
  Wrench,
  X,
} from "lucide-react";
import { ArtifactCard } from "@/components/artifacts/ArtifactCard";
import { ArtifactListRow } from "@/components/artifacts/ArtifactListRow";
import { ArtifactVisual } from "@/components/artifacts/ArtifactVisual";
import { TimelineStage } from "@/components/explore/TimelineStage";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  artifacts as allArtifacts,
  destinationMeta,
  destinationOrder,
  eventTypeLabels,
  hardwareTypeSingular,
} from "@/data/artifacts";
import {
  countByDestination,
  countByHardwareType,
  defaultFilters,
  filterArtifacts,
  getFilterOptions,
  sortArtifacts,
  timelineEntries,
  type ArtifactFilters,
  type SortOption,
  type TimelineEntry,
} from "@/lib/explore";
import {
  hardwareStatusLabels,
  missionStatusLabels,
} from "@/lib/status";
import { pluralize, formatShortDate } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { ArtifactMedia, DestinationGroup, HardwareType } from "@/types/artifact";

export type ExploreMode = "timeline" | "destinations" | "artifacts";
export type ExploreView = "visual" | "list";

export type ExploreInitialState = {
  mode: ExploreMode;
  view: ExploreView;
  scope: "primary" | "all";
  sort: SortOption;
  filters: ArtifactFilters;
  eventKey?: string;
  artifactId?: string;
};

type ExploreExperienceProps = {
  initial: ExploreInitialState;
};

const filterOptions = getFilterOptions();
const destinationCountsAll = countByDestination();

const modeTabs: Array<{
  id: ExploreMode;
  label: string;
  icon: typeof Waypoints;
}> = [
  { id: "timeline", label: "Timeline", icon: Waypoints },
  { id: "destinations", label: "By destination", icon: Compass },
  { id: "artifacts", label: "By artifact", icon: Layers },
];

const hardwareIcons: Record<HardwareType, typeof Truck> = {
  rover: Truck,
  lander: Box,
  orbiter: Orbit,
  probe: Rocket,
  instrument: Cpu,
  "surface-equipment": Wrench,
  aircraft: Plane,
};

const destinationIcons: Record<DestinationGroup, typeof Moon> = {
  moon: Moon,
  mars: Globe2,
  "deep-space": Sparkles,
};

function destinationMedia(destination: DestinationGroup): ArtifactMedia {
  const meta = destinationMeta[destination];
  return {
    type: "image",
    src: meta.image,
    thumb: meta.image,
    alt: meta.imageAlt,
    caption: meta.description,
    credit: meta.credit,
    nasaId: "",
    sourceUrl: "",
    isIllustration: destination === "deep-space",
    width: 1600,
    height: 900,
  };
}

export function ExploreExperience({ initial }: ExploreExperienceProps) {
  const [mode, setMode] = useState<ExploreMode>(initial.mode);
  const [view, setView] = useState<ExploreView>(initial.view);
  const [scope, setScope] = useState<"primary" | "all">(initial.scope);
  const [sort, setSort] = useState<SortOption>(initial.sort);
  const [filters, setFilters] = useState<ArtifactFilters>(initial.filters);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | undefined>(
    initial.eventKey
  );
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const filtersPanelId = useId();
  const panelId = useId();

  const entries = useMemo(
    () => timelineEntries(scope, filters),
    [scope, filters]
  );

  const selectedEntry = useMemo<TimelineEntry | undefined>(() => {
    return (
      entries.find((entry) => entry.key === selectedKey) ??
      entries.find((entry) => entry.artifact.id === initial.artifactId) ??
      entries[0]
    );
  }, [entries, selectedKey, initial.artifactId]);

  const visibleArtifacts = useMemo(
    () => sortArtifacts(filterArtifacts(filters), sort),
    [filters, sort]
  );

  const activeFilters = useMemo(
    () =>
      (Object.keys(filters) as Array<keyof ArtifactFilters>).filter(
        (key) => filters[key] !== "all"
      ),
    [filters]
  );

  const contextualDestinationCounts = useMemo(
    () =>
      countByDestination(filterArtifacts({ ...filters, destination: "all" })),
    [filters]
  );

  const categoryCounts = useMemo(
    () => countByHardwareType(filterArtifacts({ ...filters, hardwareType: "all" })),
    [filters]
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (mode !== "timeline") params.set("mode", mode);
    if (view === "list") params.set("view", "list");
    if (scope === "all") params.set("scope", "all");
    if (sort !== "oldest") params.set("sort", sort);
    (Object.keys(filters) as Array<keyof ArtifactFilters>).forEach((key) => {
      if (filters[key] !== "all") params.set(key, filters[key]);
    });
    if (selectedEntry) params.set("event", selectedEntry.key);
    const query = params.toString();
    window.history.replaceState(
      null,
      "",
      query ? `/explore?${query}` : "/explore"
    );
  }, [mode, view, scope, sort, filters, selectedEntry]);

  function updateFilter<K extends keyof ArtifactFilters>(
    key: K,
    value: ArtifactFilters[K]
  ) {
    setFilters((previous) => ({ ...previous, [key]: value }));
  }

  function clearFilters() {
    setFilters({ ...defaultFilters });
  }

  function selectMode(next: ExploreMode) {
    setMode(next);
    if (next !== "timeline" && view === "list" && next === "destinations") {
      setView("visual");
    }
  }

  function onTabKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % modeTabs.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + modeTabs.length) % modeTabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = modeTabs.length - 1;
    }
    if (nextIndex === null) return;
    event.preventDefault();
    const next = modeTabs[nextIndex];
    selectMode(next.id);
    tabRefs.current[nextIndex]?.focus();
  }

  const activeTab = modeTabs.find((tab) => tab.id === mode) ?? modeTabs[0];
  const filterLabelFor = (key: keyof ArtifactFilters): string => {
    const value = filters[key];
    if (value === "all") return "";
    switch (key) {
      case "destination":
        return destinationMeta[value as DestinationGroup].name;
      case "hardwareType":
        return hardwareTypeSingular[value as HardwareType];
      case "missionStatus":
        return missionStatusLabels[value as keyof typeof missionStatusLabels];
      case "hardwareStatus":
        return hardwareStatusLabels[value as keyof typeof hardwareStatusLabels];
      case "decade":
        return value;
      case "eventType":
        return eventTypeLabels[value as keyof typeof eventTypeLabels] ?? value;
      default:
        return value;
    }
  };

  const resultLabel =
    mode === "timeline"
      ? view === "visual"
        ? `${pluralize(entries.length, "milestone")}`
        : `${pluralize(visibleArtifacts.length, "artifact")}`
      : mode === "artifacts"
        ? `${visibleArtifacts.length} of ${allArtifacts.length} artifacts`
        : `${destinationOrder.length} destinations`;

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow">Explore</p>
          <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            Explore the history of{" "}
            <span className="text-gradient">space exploration</span>
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base">
            Move through time, filter by destination or hardware type, and open
            the source-linked story behind every artifact.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Explore modes"
          className="no-scrollbar flex w-full gap-1 overflow-x-auto rounded-full border border-white/10 bg-white/[0.03] p-1 lg:w-auto"
        >
          {modeTabs.map((tab, index) => {
            const Icon = tab.icon;
            const active = mode === tab.id;
            return (
              <button
                key={tab.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`explore-tab-${tab.id}`}
                aria-selected={active}
                aria-controls={panelId}
                tabIndex={active ? 0 : -1}
                onClick={() => selectMode(tab.id)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
                className={cn(
                  "inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-medium transition-colors sm:text-sm lg:flex-none",
                  active
                    ? "btn-gradient text-[#04101f] shadow-[0_0_24px_rgba(167,139,250,0.35)]"
                    : "text-text-secondary hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon aria-hidden="true" className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-bg-elevated/50">
        <div className="flex flex-wrap items-center gap-2 p-3">
          <button
            type="button"
            onClick={() => setFiltersOpen((open) => !open)}
            aria-expanded={filtersOpen}
            aria-controls={filtersPanelId}
            className={cn(
              "inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-sm font-medium transition-colors",
              filtersOpen || activeFilters.length
                ? "border-brand-violet/45 bg-brand-violet/10 text-brand-violet"
                : "border-white/12 text-text-secondary hover:border-brand-violet/35 hover:text-white"
            )}
          >
            <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
            Filters
            {activeFilters.length ? (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-violet px-1 text-[10px] font-bold text-[#06111f]">
                {activeFilters.length}
              </span>
            ) : null}
          </button>

          <p
            aria-live="polite"
            className="px-1 text-xs text-text-muted sm:text-sm"
          >
            <span className="font-medium text-text-primary">{resultLabel}</span>
            {activeFilters.length ? " with the current filters" : ""}
          </p>

          <div className="ml-auto flex flex-wrap items-center gap-2">
            {mode !== "destinations" ? (
              <div
                role="group"
                aria-label="Result view"
                className="flex rounded-full border border-white/10 bg-white/[0.03] p-0.5"
              >
                <button
                  type="button"
                  aria-pressed={view === "visual"}
                  onClick={() => setView("visual")}
                  className={cn(
                    "inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors",
                    view === "visual"
                      ? "bg-white/10 text-white"
                      : "text-text-muted hover:text-white"
                  )}
                >
                  {mode === "timeline" ? (
                    <Waypoints aria-hidden="true" className="h-3.5 w-3.5" />
                  ) : (
                    <Layers aria-hidden="true" className="h-3.5 w-3.5" />
                  )}
                  {mode === "timeline" ? "Timeline" : "Grid"}
                </button>
                <button
                  type="button"
                  aria-pressed={view === "list"}
                  onClick={() => setView("list")}
                  className={cn(
                    "inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors",
                    view === "list"
                      ? "bg-white/10 text-white"
                      : "text-text-muted hover:text-white"
                  )}
                >
                  <List aria-hidden="true" className="h-3.5 w-3.5" />
                  List
                </button>
              </div>
            ) : null}

            {mode !== "timeline" || view === "list" ? (
              <div className="flex items-center gap-1.5">
                <label
                  htmlFor="explore-sort"
                  className="text-xs text-text-muted"
                >
                  Sort
                </label>
                <select
                  id="explore-sort"
                  value={sort}
                  onChange={(event) =>
                    setSort(event.target.value as SortOption)
                  }
                  className="h-9 rounded-full border border-white/12 bg-[#0a1426] px-3 pr-7 text-xs text-text-primary focus:border-accent/60 focus:outline-none"
                >
                  <option value="oldest">Oldest first</option>
                  <option value="newest">Newest first</option>
                  <option value="name">Name A–Z</option>
                </select>
              </div>
            ) : null}
          </div>
        </div>

        {activeFilters.length ? (
          <div className="flex flex-wrap items-center gap-1.5 border-t border-white/10 px-3 py-2.5">
            {activeFilters.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => updateFilter(key, "all")}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-violet/35 bg-brand-violet/10 px-2.5 py-1 text-[11px] text-brand-violet transition-colors hover:border-brand-violet/60 hover:text-white"
              >
                <span className="text-brand-violet/70">
                  {key === "destination"
                    ? "Destination"
                    : key === "hardwareType"
                      ? "Type"
                      : key === "missionStatus"
                        ? "Mission"
                        : key === "hardwareStatus"
                          ? "Hardware"
                          : key === "decade"
                            ? "Decade"
                            : "Milestone"}
                  :
                </span>
                {filterLabelFor(key)}
                <X aria-hidden="true" className="h-3 w-3" />
                <span className="sr-only">Remove filter</span>
              </button>
            ))}
            <button
              type="button"
              onClick={clearFilters}
              className="ml-1 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium text-text-secondary underline-offset-4 hover:text-white hover:underline"
            >
              <RotateCcw aria-hidden="true" className="h-3 w-3" />
              Clear all
            </button>
          </div>
        ) : null}

        {filtersOpen ? (
          <div
            id={filtersPanelId}
            className="border-t border-white/10 p-4 sm:p-5"
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              <FilterSelect
                id="filter-destination"
                label="Destination"
                value={filters.destination}
                onChange={(value) =>
                  updateFilter(
                    "destination",
                    value as ArtifactFilters["destination"]
                  )
                }
                options={filterOptions.destinations.map((destination) => ({
                  value: destination,
                  label: destinationMeta[destination].name,
                }))}
              />
              <FilterSelect
                id="filter-hardware"
                label="Hardware type"
                value={filters.hardwareType}
                onChange={(value) =>
                  updateFilter(
                    "hardwareType",
                    value as ArtifactFilters["hardwareType"]
                  )
                }
                options={filterOptions.hardwareTypes.map((type) => ({
                  value: type,
                  label: hardwareTypeSingular[type],
                }))}
              />
              <FilterSelect
                id="filter-mission"
                label="Mission status"
                value={filters.missionStatus}
                onChange={(value) =>
                  updateFilter(
                    "missionStatus",
                    value as ArtifactFilters["missionStatus"]
                  )
                }
                options={filterOptions.missionStatuses.map((status) => ({
                  value: status,
                  label: missionStatusLabels[status],
                }))}
              />
              <FilterSelect
                id="filter-hardware-status"
                label="Hardware status"
                value={filters.hardwareStatus}
                onChange={(value) =>
                  updateFilter(
                    "hardwareStatus",
                    value as ArtifactFilters["hardwareStatus"]
                  )
                }
                options={filterOptions.hardwareStatuses.map((status) => ({
                  value: status,
                  label: hardwareStatusLabels[status],
                }))}
              />
              <FilterSelect
                id="filter-decade"
                label="Decade"
                value={filters.decade}
                onChange={(value) =>
                  updateFilter("decade", value as ArtifactFilters["decade"])
                }
                options={filterOptions.decades.map((decade) => ({
                  value: decade,
                  label: decade,
                }))}
              />
              <FilterSelect
                id="filter-event"
                label="Milestone type"
                value={filters.eventType}
                onChange={(value) =>
                  updateFilter(
                    "eventType",
                    value as ArtifactFilters["eventType"]
                  )
                }
                options={filterOptions.eventTypes.map((type) => ({
                  value: type,
                  label: eventTypeLabels[type] ?? type,
                }))}
              />
            </div>
            <p className="mt-3 text-xs text-text-muted">
              Filters apply to every mode and are reflected in the URL. Event
              type filters individual milestones in timeline mode.
            </p>
          </div>
        ) : null}
      </div>

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={`explore-tab-${activeTab.id}`}
        className="mt-6"
      >
        {mode === "timeline" ? (
          view === "visual" ? (
            entries.length ? (
              <div>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div
                    role="group"
                    aria-label="Timeline event scope"
                    className="flex rounded-full border border-white/10 bg-white/[0.03] p-0.5"
                  >
                    <button
                      type="button"
                      aria-pressed={scope === "primary"}
                      onClick={() => setScope("primary")}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                        scope === "primary"
                          ? "bg-white/10 text-white"
                          : "text-text-muted hover:text-white"
                      )}
                    >
                      Primary milestones
                    </button>
                    <button
                      type="button"
                      aria-pressed={scope === "all"}
                      onClick={() => setScope("all")}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                        scope === "all"
                          ? "bg-white/10 text-white"
                          : "text-text-muted hover:text-white"
                      )}
                    >
                      All mission events
                    </button>
                  </div>
                  <p className="text-xs text-text-muted">
                    {scope === "all"
                      ? "Every launch, flyby, landing and ending in the records."
                      : "One defining milestone per artifact."}
                  </p>
                </div>
                <TimelineStage
                  entries={entries}
                  selected={selectedEntry}
                  onSelect={setSelectedKey}
                />
              </div>
            ) : (
              <EmptyState
                title="No milestones match those filters"
                description="Try removing a filter, widening the decade, or switching to all mission events."
                action={
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="btn-gradient rounded-full px-4 py-2 text-sm font-semibold"
                  >
                    Clear all filters
                  </button>
                }
              />
            )
          ) : (
            <div className="grid gap-3">
              {visibleArtifacts.length ? (
                visibleArtifacts.map((artifact) => (
                  <ArtifactListRow
                    key={artifact.id}
                    artifact={artifact}
                    context={`${eventTypeLabels[artifact.primaryMilestone.type] ?? "Milestone"} · ${formatShortDate(artifact.primaryMilestone.date, artifact.primaryMilestone.datePrecision)}`}
                  />
                ))
              ) : (
                <EmptyState
                  title="No artifacts match those filters"
                  description="The list view uses the same records as the timeline. Clear a filter to bring them back."
                  action={
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="btn-gradient rounded-full px-4 py-2 text-sm font-semibold"
                    >
                      Clear all filters
                    </button>
                  }
                />
              )}
            </div>
          )
        ) : null}

        {mode === "destinations" ? (
          <div>
            <div className="grid gap-4 md:grid-cols-3">
              {destinationOrder.map((destination) => {
                const meta = destinationMeta[destination];
                const Icon = destinationIcons[destination];
                const count = contextualDestinationCounts[destination];
                const total = destinationCountsAll[destination];
                return (
                  <button
                    key={destination}
                    type="button"
                    disabled={count === 0}
                    onClick={() => {
                      updateFilter("destination", destination);
                      setMode("artifacts");
                      setView("visual");
                    }}
                    className={cn(
                      "card-hover group relative overflow-hidden rounded-card border border-white/10 bg-surface/60 text-left transition-opacity",
                      count === 0 && "cursor-not-allowed opacity-55"
                    )}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <ArtifactVisual
                        media={destinationMedia(destination)}
                        sizes="(min-width: 768px) 33vw, 100vw"
                        imageClassName="group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/25 to-transparent" />
                      <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white/85 backdrop-blur">
                        {pluralize(count, "match", "matches")}
                      </span>
                    </div>
                    <div className="relative p-5">
                      <div className="flex items-center justify-between">
                        <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
                          <Icon
                            aria-hidden="true"
                            className="h-4 w-4 text-accent-bright"
                          />
                          {meta.name}
                        </h2>
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-text-secondary transition-colors group-hover:border-accent/50 group-hover:text-accent-bright">
                          <ArrowRight aria-hidden="true" className="h-4 w-4" />
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                        {meta.description}
                      </p>
                      <p className="mt-4 text-xs font-medium text-accent-bright">
                        {count === 0
                          ? "No records match the current filters"
                          : `View ${pluralize(count, "artifact")} · ${total} in the full collection`}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
            {activeFilters.length ? (
              <p className="mt-4 text-xs text-text-muted">
                Counts reflect the current filters.{" "}
                <button
                  type="button"
                  onClick={clearFilters}
                  className="font-medium text-accent-bright underline-offset-4 hover:underline"
                >
                  Clear filters
                </button>{" "}
                to see the full collection counts.
              </p>
            ) : null}
          </div>
        ) : null}

        {mode === "artifacts" ? (
          <div>
            <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
              <button
                type="button"
                aria-pressed={filters.hardwareType === "all"}
                onClick={() => updateFilter("hardwareType", "all")}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition-colors",
                  filters.hardwareType === "all"
                    ? "border-accent/50 bg-accent/12 text-white"
                    : "border-white/10 bg-white/[0.02] text-text-secondary hover:border-accent/35 hover:text-white"
                )}
              >
                <Layers aria-hidden="true" className="h-4 w-4" />
                All types
                <span className="font-mono text-[11px] text-text-muted">
                  {allArtifacts.length}
                </span>
              </button>
              {categoryCounts.map(({ type, count }) => {
                const Icon = hardwareIcons[type];
                const active = filters.hardwareType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    aria-pressed={active}
                    onClick={() =>
                      updateFilter("hardwareType", active ? "all" : type)
                    }
                    className={cn(
                      "inline-flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition-colors",
                      active
                        ? "border-accent/50 bg-accent/12 text-white"
                        : "border-white/10 bg-white/[0.02] text-text-secondary hover:border-accent/35 hover:text-white"
                    )}
                  >
                    <Icon aria-hidden="true" className="h-4 w-4" />
                    {hardwareTypeSingular[type]}
                    <span className="font-mono text-[11px] text-text-muted">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5">
              {visibleArtifacts.length ? (
                view === "visual" ? (
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {visibleArtifacts.map((artifact, index) => (
                      <ArtifactCard
                        key={artifact.id}
                        artifact={artifact}
                        priority={index < 3}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-3">
                    {visibleArtifacts.map((artifact) => (
                      <ArtifactListRow key={artifact.id} artifact={artifact} />
                    ))}
                  </div>
                )
              ) : (
                <EmptyState
                  title="No artifacts match those filters"
                  description="The combination of destination, hardware type, status or decade is empty in this collection. Clear a filter to continue."
                  action={
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="btn-gradient rounded-full px-4 py-2 text-sm font-semibold"
                    >
                      Clear all filters
                    </button>
                  }
                />
              )}
            </div>
          </div>
        ) : null}
      </div>

      {mode === "timeline" && view === "visual" && entries.length ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-xs text-text-muted">
          <p>
            Keyboard: focus a milestone, then use the arrow keys to move between
            events.
          </p>
          <Link
            href="/explore?mode=artifacts&view=list"
            className="inline-flex items-center gap-1 font-medium text-accent-bright hover:text-white"
          >
            Prefer a simple list? Open the artifact table
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : null}
    </div>
  );
}

function FilterSelect({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[11px] font-medium text-text-secondary">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full rounded-lg border border-white/12 bg-[#0a1426] px-3 text-sm text-text-primary focus:border-accent/60 focus:outline-none"
      >
        <option value="all">All</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
