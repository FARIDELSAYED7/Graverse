"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
import { ArtifactCard } from "@/components/artifacts/ArtifactCard";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  destinationMeta,
  destinationOrder,
  hardwareTypeSingular,
} from "@/data/artifacts";
import {
  defaultFilters,
  filterArtifacts,
  getFilterOptions,
  searchArtifacts,
  sortArtifacts,
  type ArtifactFilters,
  type SortOption,
} from "@/lib/explore";
import { hardwareStatusLabels, missionStatusLabels } from "@/lib/status";
import type { DestinationGroup, HardwareStatus, HardwareType, MissionStatus } from "@/types/artifact";

export type SearchInitialState = {
  query: string;
  filters: ArtifactFilters;
  sort: SortOption;
};

const filterOptions = getFilterOptions();

const suggestions = [
  "Apollo 11",
  "Perseverance",
  "Voyager",
  "Moon",
  "Rover",
  "Ingenuity",
];

export function SearchExperience({ initial }: { initial: SearchInitialState }) {
  const [query, setQuery] = useState(initial.query);
  const [activeQuery, setActiveQuery] = useState(initial.query);
  const [filters, setFilters] = useState<ArtifactFilters>(initial.filters);
  const [sort, setSort] = useState<SortOption>(initial.sort);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setActiveQuery(query), 220);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [query]);

  const results = useMemo(() => {
    const searched = searchArtifacts(activeQuery);
    return sortArtifacts(filterArtifacts(filters, searched), sort);
  }, [activeQuery, filters, sort]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (activeQuery.trim()) params.set("q", activeQuery.trim());
    (Object.keys(filters) as Array<keyof ArtifactFilters>).forEach((key) => {
      if (filters[key] !== "all") params.set(key, filters[key]);
    });
    if (sort !== "oldest") params.set("sort", sort);
    const value = params.toString();
    window.history.replaceState(null, "", value ? `/search?${value}` : "/search");
  }, [activeQuery, filters, sort]);

  const activeFilters = (Object.keys(filters) as Array<keyof ArtifactFilters>).filter(
    (key) => filters[key] !== "all"
  );

  function updateFilter<K extends keyof ArtifactFilters>(
    key: K,
    value: ArtifactFilters[K]
  ) {
    setFilters((previous) => ({ ...previous, [key]: value }));
  }

  function clearAll() {
    setFilters({
      destination: "all",
      hardwareType: "all",
      missionStatus: "all",
      hardwareStatus: "all",
      decade: "all",
      eventType: "all",
    });
    setQuery("");
    setActiveQuery("");
    inputRef.current?.focus();
  }

  function clearFilters() {
    setFilters({ ...defaultFilters });
  }

  const filterLabelFor = (key: keyof ArtifactFilters): string => {
    const value = filters[key];
    if (value === "all") return "";
    switch (key) {
      case "destination":
        return destinationMeta[value as DestinationGroup].name;
      case "hardwareType":
        return hardwareTypeSingular[value as HardwareType];
      case "missionStatus":
        return missionStatusLabels[value as MissionStatus];
      case "hardwareStatus":
        return hardwareStatusLabels[value as HardwareStatus];
      default:
        return value;
    }
  };

  function applySuggestion(term: string) {
    setQuery(term);
    setActiveQuery(term);
    inputRef.current?.focus();
  }

  const hasQuery = activeQuery.trim().length > 0;

  return (
    <div className="mx-auto max-w-5xl">
      <div className="max-w-2xl">
        <p className="eyebrow">Search the archive</p>
        <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
          Find an artifact, mission or{" "}
          <span className="text-gradient">destination</span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
          Search across artifact and mission names, alternate names, destinations,
          hardware types, event labels and summaries. Partial and
          case-insensitive matches work.
        </p>
      </div>

      <form
        role="search"
        className="mt-7 flex flex-col gap-2 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          setActiveQuery(query);
        }}
      >
        <label htmlFor="search-page-input" className="sr-only">
          Search artifacts, missions and destinations
        </label>
        <div className="relative flex-1">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
          />
          <input
            ref={inputRef}
            id="search-page-input"
            name="q"
            type="search"
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="e.g. Perseverance, Apollo, Moon, rover"
            aria-describedby="search-result-count"
            className="h-12 w-full rounded-full border border-white/12 bg-white/[0.05] pl-11 pr-10 text-sm text-text-primary placeholder:text-text-muted focus:border-accent/60 focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveQuery("");
                inputRef.current?.focus();
              }}
              aria-label="Clear search text"
              className="absolute right-3 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-text-muted hover:bg-white/10 hover:text-white"
            >
              <X aria-hidden="true" className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </div>
        <button
          type="submit"
          className="btn-gradient h-12 rounded-full px-6 text-sm font-semibold"
        >
          Search
        </button>
      </form>

      {!query ? (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-text-muted">
          <span>Try a search</span>
          {suggestions.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => applySuggestion(term)}
              className="rounded-full border border-white/10 px-2.5 py-1 text-text-secondary hover:border-accent/40 hover:text-white"
            >
              {term}
            </button>
          ))}
        </div>
      ) : null}

      <div className="mt-7 rounded-2xl border border-white/10 bg-bg-elevated/50">
        <div className="flex flex-wrap items-center gap-2 p-3">
          <button
            type="button"
            onClick={() => setFiltersOpen((open) => !open)}
            aria-expanded={filtersOpen}
            aria-controls="search-filters"
            className="inline-flex h-9 items-center gap-2 rounded-full border border-white/12 px-3.5 text-sm font-medium text-text-secondary transition-colors hover:border-accent/40 hover:text-white"
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
            id="search-result-count"
            aria-live="polite"
            className="px-1 text-xs text-text-secondary sm:text-sm"
          >
            {hasQuery ? (
              <>
                <span className="font-semibold text-text-primary">
                  {results.length}
                </span>{" "}
                {results.length === 1 ? "result" : "results"} for{" "}
                <span className="text-accent-bright">“{activeQuery.trim()}”</span>
              </>
            ) : (
              <>
                <span className="font-semibold text-text-primary">
                  {results.length}
                </span>{" "}
                artifacts in the collection
              </>
            )}
          </p>

          <div className="ml-auto flex items-center gap-1.5">
            <label htmlFor="search-sort" className="text-xs text-text-muted">
              Sort
            </label>
            <select
              id="search-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              className="h-9 rounded-full border border-white/12 bg-[#0a1426] px-3 text-xs text-text-primary focus:border-accent/60 focus:outline-none"
            >
              <option value="oldest">Oldest first</option>
              <option value="newest">Newest first</option>
              <option value="name">Name A–Z</option>
            </select>
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
                        : "Hardware"}
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
          <div id="search-filters" className="border-t border-white/10 p-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <label className="flex flex-col gap-1.5 text-[11px] font-medium text-text-secondary">
                Destination
                <select
                  value={filters.destination}
                  onChange={(event) =>
                    updateFilter(
                      "destination",
                      event.target.value as DestinationGroup | "all"
                    )
                  }
                  className="h-10 rounded-lg border border-white/12 bg-[#0a1426] px-3 text-sm text-text-primary focus:border-accent/60 focus:outline-none"
                >
                  <option value="all">All destinations</option>
                  {destinationOrder.map((destination) => (
                    <option key={destination} value={destination}>
                      {destinationMeta[destination].name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1.5 text-[11px] font-medium text-text-secondary">
                Hardware type
                <select
                  value={filters.hardwareType}
                  onChange={(event) =>
                    updateFilter(
                      "hardwareType",
                      event.target.value as HardwareType | "all"
                    )
                  }
                  className="h-10 rounded-lg border border-white/12 bg-[#0a1426] px-3 text-sm text-text-primary focus:border-accent/60 focus:outline-none"
                >
                  <option value="all">All hardware types</option>
                  {filterOptions.hardwareTypes.map((type) => (
                    <option key={type} value={type}>
                      {hardwareTypeSingular[type]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1.5 text-[11px] font-medium text-text-secondary">
                Mission status
                <select
                  value={filters.missionStatus}
                  onChange={(event) =>
                    updateFilter(
                      "missionStatus",
                      event.target.value as MissionStatus | "all"
                    )
                  }
                  className="h-10 rounded-lg border border-white/12 bg-[#0a1426] px-3 text-sm text-text-primary focus:border-accent/60 focus:outline-none"
                >
                  <option value="all">All mission statuses</option>
                  {filterOptions.missionStatuses.map((status) => (
                    <option key={status} value={status}>
                      {missionStatusLabels[status]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1.5 text-[11px] font-medium text-text-secondary">
                Hardware status
                <select
                  value={filters.hardwareStatus}
                  onChange={(event) =>
                    updateFilter(
                      "hardwareStatus",
                      event.target.value as HardwareStatus | "all"
                    )
                  }
                  className="h-10 rounded-lg border border-white/12 bg-[#0a1426] px-3 text-sm text-text-primary focus:border-accent/60 focus:outline-none"
                >
                  <option value="all">All hardware statuses</option>
                  {filterOptions.hardwareStatuses.map((status) => (
                    <option key={status} value={status}>
                      {hardwareStatusLabels[status]}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <p className="text-xs text-text-muted">
                Filters use the same normalized data as Explore.
              </p>
              {activeFilters.length ? (
                <button
                  type="button"
                  onClick={clearAll}
                  className="ml-auto text-xs font-medium text-accent-bright hover:text-white"
                >
                  Clear search and filters
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-6">
        {results.length ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {results.map((artifact, index) => (
              <ArtifactCard
                key={artifact.id}
                artifact={artifact}
                priority={index < 2}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No matching records"
            description={
              hasQuery
                ? `Nothing in the collection matches “${activeQuery.trim()}” with these filters. Try a broader term, check the spelling, or clear the filters.`
                : "No artifacts match the selected filters. Clear a filter to see the collection."
            }
            action={
              <button
                type="button"
                onClick={clearAll}
                className="btn-gradient rounded-full px-4 py-2 text-sm font-semibold"
              >
                Clear search and filters
              </button>
            }
          />
        )}
      </div>
    </div>
  );
}
