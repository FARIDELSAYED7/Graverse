"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Filter, Search, SlidersHorizontal, X } from "lucide-react";
import type { EchoStorySummary, EchoTag } from "@/types/echo";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { StoryCard } from "./StoryCard";

/**
 * The story explorer.
 *
 * Discovery stays deliberately light: one search field, one row of
 * destination chips and one sort menu are always visible. Mission-type
 * filters live behind a "More filters" disclosure, so the ten-year-old who
 * just wants a story never meets nine chips at once. Everything runs on the
 * client because the list is short enough to filter instantly.
 */

type SortKey = "curated" | "newest" | "oldest" | "longest";

const DESTINATION_TAGS: EchoTag[] = ["moon", "mars", "deep-space"];
const TYPE_TAGS: EchoTag[] = ["lander", "rover", "instrument", "remnant"];

export function StoriesIndex({
  stories,
  locale,
  tagLabels,
}: {
  stories: EchoStorySummary[];
  locale: Locale;
  tagLabels: Record<EchoTag, { en: string; ar: string }>;
}) {
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState<EchoTag[]>([]);
  const [sort, setSort] = useState<SortKey>("curated");
  const [moreFilters, setMoreFilters] = useState(false);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const result = stories.filter((story) => {
      const matchesTag =
        tags.length === 0 || tags.every((tag) => story.tags.includes(tag));
      if (!matchesTag) return false;
      if (!needle) return true;
      const haystack = [
        story.title.en,
        story.title.ar,
        story.storyTitle.en,
        story.storyTitle.ar,
        story.dek.en,
        story.dek.ar,
        story.location.en,
        story.location.ar,
        story.equipmentType.en,
        story.equipmentType.ar,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });

    const ordered = [...result];
    if (sort === "newest") {
      ordered.sort((a, b) => b.launchYear - a.launchYear);
    } else if (sort === "oldest") {
      ordered.sort((a, b) => a.launchYear - b.launchYear);
    } else if (sort === "longest") {
      ordered.sort((a, b) => b.minutes - a.minutes);
    }
    return ordered;
  }, [stories, query, tags, sort]);

  function toggleTag(tag: EchoTag) {
    setTags((current) =>
      current.includes(tag)
        ? current.filter((entry) => entry !== tag)
        : [...current, tag]
    );
  }

  const activeTypeTags = tags.filter((tag) => TYPE_TAGS.includes(tag));
  const hasFilters = query.trim().length > 0 || tags.length > 0;

  function clearFilters() {
    setQuery("");
    setTags([]);
  }

  return (
    <div>
      {/* Compact control bar ------------------------------------------------ */}
      <div className="echo-card rounded-3xl p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <label htmlFor="echo-story-search" className="sr-only">
              {t(locale, "echo.searchPlaceholder")}
            </label>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b6484]"
            />
            <input
              id="echo-story-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t(locale, "echo.searchPlaceholder")}
              className="h-11 w-full rounded-full border border-[#1a1338]/15 bg-white ps-10 pe-4 text-sm text-[#1a1338] placeholder:text-[#6b6484] focus:border-[#6d4aff] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="echo-story-sort"
              className="flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold text-[#4a4266]"
            >
              <SlidersHorizontal aria-hidden="true" className="h-3.5 w-3.5" />
              {t(locale, "echo.sortLabel")}
            </label>
            <select
              id="echo-story-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="h-11 rounded-full border border-[#1a1338]/15 bg-white px-4 text-sm text-[#1a1338] focus:border-[#6d4aff] focus:outline-none"
            >
              <option value="curated">{t(locale, "echo.sortCurated")}</option>
              <option value="newest">{t(locale, "echo.sortNewest")}</option>
              <option value="oldest">{t(locale, "echo.sortOldest")}</option>
              <option value="longest">{t(locale, "echo.sortLongest")}</option>
            </select>
          </div>
        </div>

        {/* Destination chips — the primary, always-visible filter. */}
        <fieldset className="mt-4">
          <legend className="sr-only">{t(locale, "echo.destinationLabel")}</legend>
          <div className="flex flex-wrap items-center gap-2">
            {DESTINATION_TAGS.map((tag) => {
              const active = tags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  aria-pressed={active}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    active
                      ? "border-[#5b3fe0] bg-[#5b3fe0] text-white"
                      : "border-[#1a1338]/15 bg-white text-[#4a4266] hover:border-[#6d4aff]/50 hover:text-[#1a1338]"
                  }`}
                >
                  {tagLabels[tag][locale]}
                </button>
              );
            })}

            {/* Progressive disclosure for the mission-type filters. */}
            <button
              type="button"
              onClick={() => setMoreFilters(!moreFilters)}
              aria-expanded={moreFilters}
              className={`inline-flex items-center gap-1 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                activeTypeTags.length > 0
                  ? "border-[#5b3fe0] bg-[#5b3fe0]/10 text-[#5b3fe0]"
                  : "border-[#1a1338]/15 bg-white text-[#4a4266] hover:border-[#6d4aff]/50 hover:text-[#1a1338]"
              }`}
            >
              <Filter aria-hidden="true" className="h-3 w-3" />
              {moreFilters
                ? t(locale, "echo.filtersLess")
                : t(locale, "echo.filtersMore")}
              {activeTypeTags.length > 0
                ? ` · ${activeTypeTags.length}`
                : null}
              <ChevronDown
                aria-hidden="true"
                className={`h-3 w-3 transition-transform ${moreFilters ? "rotate-180" : ""}`}
              />
            </button>

            {hasFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1 rounded-full border border-[#ef6f8e]/40 bg-[#ef6f8e]/10 px-3 py-1.5 text-xs font-semibold text-[#b8325a] hover:bg-[#ef6f8e]/20"
              >
                <X aria-hidden="true" className="h-3 w-3" />
                {t(locale, "echo.clearFilters")}
              </button>
            ) : null}
          </div>

          {moreFilters ? (
            <div className="mt-3 rounded-2xl border border-dashed border-[#1a1338]/15 bg-[#f6f1e6]/60 p-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#6b6484]">
                {t(locale, "echo.typeLabel")}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {TYPE_TAGS.map((tag) => {
                  const active = tags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      aria-pressed={active}
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                        active
                          ? "border-[#5b3fe0] bg-[#5b3fe0] text-white"
                          : "border-[#1a1338]/15 bg-white text-[#4a4266] hover:border-[#6d4aff]/50 hover:text-[#1a1338]"
                      }`}
                    >
                      {tagLabels[tag][locale]}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </fieldset>
      </div>

      <p className="mt-4 text-sm text-[#6b6484]" role="status" aria-live="polite">
        {filtered.length === 1
          ? t(locale, "echo.resultCountOne")
          : t(locale, "echo.resultCount").replace("{count}", String(filtered.length))}
      </p>

      {filtered.length === 0 ? (
        <div className="echo-card mt-4 rounded-3xl p-10 text-center">
          <p className="text-base font-semibold text-[#1a1338]">
            {t(locale, "echo.noResults")}
          </p>
          <p className="mt-2 text-sm text-[#4a4266]">
            {locale === "ar"
              ? "جرّب كلمة أقصر، أو امسح عوامل التصفية لترى القصص كلها."
              : "Try a shorter search, or clear the filters to see every story."}
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#5b3fe0] px-4 py-2 text-sm font-semibold text-white"
          >
            {t(locale, "echo.clearFilters")}
          </button>
        </div>
      ) : (
        <ul className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((story) => (
            <StoryCard key={story.slug} story={story} locale={locale} />
          ))}
        </ul>
      )}
    </div>
  );
}
