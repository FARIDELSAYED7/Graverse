"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, RotateCcw, Search, X } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  kindLabels,
  searchAll,
  type SearchKind,
  type SearchResult,
} from "@/lib/search-index";
import { cn } from "@/lib/cn";

export type SearchInitialState = {
  query: string;
  kind: SearchKind | "all";
};

const suggestions = [
  "Apollo 11",
  "Perseverance",
  "Voyager",
  "Moon",
  "Rover",
  "Ingenuity",
  "Europa",
];

const kindOrder: SearchKind[] = [
  "artifact",
  "mission",
  "body",
  "deep-sky",
  "lesson",
  "journey",
  "article",
  "agency",
  "glossary",
];

export function SearchExperience({ initial }: { initial: SearchInitialState }) {
  const [query, setQuery] = useState(initial.query);
  const [activeQuery, setActiveQuery] = useState(initial.query);
  const [kind, setKind] = useState<SearchKind | "all">(initial.kind);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setActiveQuery(query), 200);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [query]);

  const allResults = useMemo(() => searchAll(activeQuery, 200), [activeQuery]);
  const results = useMemo(
    () =>
      kind === "all"
        ? allResults
        : allResults.filter((result) => result.doc.kind === kind),
    [allResults, kind]
  );

  const counts = useMemo(() => {
    const map = new Map<SearchKind, number>();
    for (const result of allResults) {
      map.set(result.doc.kind, (map.get(result.doc.kind) ?? 0) + 1);
    }
    return map;
  }, [allResults]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (activeQuery.trim()) params.set("q", activeQuery.trim());
    if (kind !== "all") params.set("kind", kind);
    const value = params.toString();
    const next = value ? `/search?${value}` : "/search";
    if (`${window.location.pathname}${window.location.search}` !== next) {
      window.history.replaceState(null, "", next);
    }
  }, [activeQuery, kind]);

  const grouped = useMemo(() => {
    const map = new Map<SearchKind, SearchResult[]>();
    for (const result of results) {
      const list = map.get(result.doc.kind) ?? [];
      list.push(result);
      map.set(result.doc.kind, list);
    }
    return map;
  }, [results]);

  const hasQuery = activeQuery.trim().length > 0;

  function applySuggestion(term: string) {
    setQuery(term);
    setActiveQuery(term);
    setKind("all");
    inputRef.current?.focus();
  }

  function clearAll() {
    setQuery("");
    setActiveQuery("");
    setKind("all");
    inputRef.current?.focus();
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="max-w-2xl">
        <p className="eyebrow">Search everything</p>
        <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
          One search across the{" "}
          <span className="text-gradient">whole collection</span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
          Artifacts, missions, destinations, deep-sky records, lessons,
          journeys, articles, agencies and glossary terms. Partial and
          case-insensitive matches work; every result opens its own record.
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
          Search artifacts, missions, destinations, lessons and more
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
            placeholder="e.g. Perseverance, Apollo, Moon, rover, quiz"
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

      <div className="mt-7 rounded-2xl border border-white/10 bg-bg-elevated/50 p-3">
        <div className="flex flex-wrap items-center gap-2">
          <p
            id="search-result-count"
            aria-live="polite"
            className="text-xs text-text-secondary sm:text-sm"
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
              "Type to search the collection"
            )}
          </p>
          {activeQuery || kind !== "all" ? (
            <button
              type="button"
              onClick={clearAll}
              className="ml-auto inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[11px] font-medium text-text-secondary hover:text-white"
            >
              <RotateCcw aria-hidden="true" className="h-3 w-3" />
              Reset
            </button>
          ) : null}
        </div>

        {allResults.length ? (
          <div
            role="group"
            aria-label="Filter results by record type"
            className="mt-3 flex flex-wrap gap-1.5 border-t border-white/10 pt-3"
          >
            <button
              type="button"
              onClick={() => setKind("all")}
              aria-pressed={kind === "all"}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors",
                kind === "all"
                  ? "border-accent/50 bg-accent/10 text-accent-bright"
                  : "border-white/10 text-text-muted hover:text-white"
              )}
            >
              All {allResults.length}
            </button>
            {kindOrder.map((entry) => {
              const count = counts.get(entry) ?? 0;
              if (!count) return null;
              return (
                <button
                  key={entry}
                  type="button"
                  onClick={() => setKind(entry)}
                  aria-pressed={kind === entry}
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors",
                    kind === entry
                      ? "border-accent/50 bg-accent/10 text-accent-bright"
                      : "border-white/10 text-text-muted hover:text-white"
                  )}
                >
                  {kindLabels[entry]} {count}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="mt-6">
        {!hasQuery ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h2 className="text-sm font-semibold text-text-primary">
              What is in the index
            </h2>
            <dl className="mt-3 grid gap-2 sm:grid-cols-3">
              {kindOrder.map((entry) => (
                <div
                  key={entry}
                  className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2"
                >
                  <dt className="text-[10px] uppercase tracking-[0.14em] text-text-muted">
                    {kindLabels[entry]}
                  </dt>
                  <dd className="mt-0.5 text-sm font-semibold tabular-nums text-text-primary">
                    {counts.get(entry) ?? 0}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ) : results.length ? (
          <div className="space-y-8">
            {kindOrder.map((entry) => {
              const list = grouped.get(entry);
              if (!list?.length) return null;
              return (
                <section key={entry} aria-labelledby={`results-${entry}`}>
                  <h2
                    id={`results-${entry}`}
                    className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted"
                  >
                    {kindLabels[entry]} · {list.length}
                  </h2>
                  <ul className="mt-2.5 space-y-2">
                    {list.map(({ doc }) => (
                      <li key={doc.id}>
                        <Link
                          href={doc.href}
                          className="group flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-accent/40 hover:bg-white/[0.04]"
                        >
                          <span className="min-w-0">
                            <span className="flex flex-wrap items-center gap-2">
                              <span className="text-sm font-semibold text-text-primary">
                                {doc.title}
                              </span>
                              {doc.meta ? (
                                <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] text-text-muted">
                                  {doc.meta}
                                </span>
                              ) : null}
                            </span>
                            <span className="mt-1 block line-clamp-2 text-xs leading-relaxed text-text-secondary">
                              {doc.description}
                            </span>
                          </span>
                          <ArrowUpRight
                            aria-hidden="true"
                            className="mt-0.5 h-4 w-4 shrink-0 text-text-muted transition-colors group-hover:text-white"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        ) : (
          <EmptyState
            title="No matching records"
            description={`Nothing matches “${activeQuery.trim()}”${
              kind !== "all" ? ` in ${kindLabels[kind]}` : ""
            }. Try a broader term, check the spelling, or reset the type filter.`}
            action={
              <button
                type="button"
                onClick={clearAll}
                className="btn-gradient rounded-full px-4 py-2 text-sm font-semibold"
              >
                Reset search
              </button>
            }
          />
        )}
      </div>
    </div>
  );
}
