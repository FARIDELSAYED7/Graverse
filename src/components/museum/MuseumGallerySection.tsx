"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExhibitPanel } from "./ExhibitPanel";
import { GalleryHud } from "./GalleryHud";
import { GalleryRail } from "./GalleryRail";
import { GalleryShortcuts } from "./GalleryShortcuts";
import { GalleryStage } from "./GalleryStage";
import { HallChronology } from "./HallChronology";
import { HallPlan } from "./HallPlan";
import { accentFor } from "@/lib/gallery";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import type {
  GalleryFilter,
  GalleryItem,
  GallerySort,
  HallControls,
} from "@/types/gallery";

type MuseumGallerySectionProps = {
  items: GalleryItem[];
  featuredIds: string[];
  locale: Locale;
};

const TOUR_INTERVAL = 7000;

const filterKeys: Record<GalleryFilter, string> = {
  featured: "gallery.filterFeatured",
  moon: "gallery.filterMoon",
  mars: "gallery.filterMars",
  "deep-space": "gallery.filterDeepSpace",
};

const filterHints: Record<GalleryFilter, string> = {
  featured: "gallery.filterFeaturedHint",
  moon: "gallery.filterMoonHint",
  mars: "gallery.filterMarsHint",
  "deep-space": "gallery.filterDeepSpaceHint",
};

export function MuseumGallerySection({
  items,
  featuredIds,
  locale,
}: MuseumGallerySectionProps) {
  const [filter, setFilter] = useState<GalleryFilter>("featured");
  const [sort, setSort] = useState<GallerySort>("curated");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [touring, setTouring] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [looking, setLooking] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const controls = useRef<HallControls>({ yaw: 0, pitch: 0, zoom: 1 });

  const group = useMemo(() => {
    if (filter === "featured") {
      return featuredIds
        .map((id) => items.find((item) => item.id === id))
        .filter((item): item is GalleryItem => Boolean(item));
    }
    return items.filter((item) => item.destinationGroup === filter);
  }, [featuredIds, filter, items]);

  const list = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const searched = needle
      ? group.filter(
          (item) =>
            item.name.toLowerCase().includes(needle) ||
            item.missionName.toLowerCase().includes(needle) ||
            item.destination.toLowerCase().includes(needle)
        )
      : group;
    if (sort === "chronological") {
      return [...searched].sort((a, b) => a.sortDate.localeCompare(b.sortDate));
    }
    return searched;
  }, [group, query, sort]);

  useEffect(() => {
    if (!list.some((item) => item.id === selectedId)) {
      setSelectedId(list[0]?.id ?? null);
    }
  }, [list, selectedId]);

  const selected = useMemo(
    () => list.find((item) => item.id === selectedId) ?? list[0],
    [list, selectedId]
  );

  const selectedIndex = useMemo(
    () => Math.max(0, list.findIndex((item) => item.id === selected?.id)),
    [list, selected]
  );

  const selectByIndex = useCallback(
    (index: number) => {
      if (list.length === 0) return;
      const next = list[(index + list.length) % list.length];
      if (!next) return;
      setSelectedId(next.id);
      controls.current.yaw = 0;
      controls.current.pitch = 0;
      setLooking(false);
    },
    [list]
  );

  const previous = useCallback(
    () => selectByIndex(selectedIndex - 1),
    [selectByIndex, selectedIndex]
  );
  const next = useCallback(
    () => selectByIndex(selectedIndex + 1),
    [selectByIndex, selectedIndex]
  );

  /* The guided tour walks the room on its own and stops at the end. */
  useEffect(() => {
    if (!touring) return;
    const timer = window.setInterval(() => {
      setSelectedId((current) => {
        const index = list.findIndex((item) => item.id === current);
        const upcoming = list[(index + 1) % Math.max(list.length, 1)];
        return upcoming?.id ?? current;
      });
    }, TOUR_INTERVAL);
    return () => window.clearInterval(timer);
  }, [touring, list]);

  useEffect(() => {
    if (!touring) return;
    const stop = window.setInterval(() => {
      controls.current.yaw = 0;
      controls.current.pitch = 0;
      setLooking(false);
    }, 400);
    return () => window.clearInterval(stop);
  }, [touring]);

  /* Fullscreen is driven by the browser, so the button state follows it. */
  useEffect(() => {
    const onChange = () => {
      setFullscreen(document.fullscreenElement === stageRef.current);
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const element = stageRef.current;
    if (!element) return;
    try {
      if (document.fullscreenElement === element) {
        await document.exitFullscreen();
      } else {
        await element.requestFullscreen();
      }
    } catch {
      setFullscreen(false);
    }
  }, []);

  const zoom = useCallback((factor: number) => {
    const current = controls.current;
    current.zoom = Math.min(1.9, Math.max(0.62, current.zoom * factor));
  }, []);

  const resetView = useCallback(() => {
    controls.current.yaw = 0;
    controls.current.pitch = 0;
    controls.current.zoom = 1;
    setLooking(false);
  }, []);

  /* Keyboard shortcuts for the room itself. */
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      switch (event.key) {
        case "ArrowRight":
          event.preventDefault();
          next();
          break;
        case "ArrowLeft":
          event.preventDefault();
          previous();
          break;
        case "Home":
          event.preventDefault();
          selectByIndex(0);
          break;
        case "End":
          event.preventDefault();
          selectByIndex(list.length - 1);
          break;
        case " ":
          if (target?.tagName === "BUTTON") return;
          event.preventDefault();
          setTouring((value) => !value);
          break;
        case "r":
        case "R":
          resetView();
          break;
        case "+":
        case "=":
          zoom(1.15);
          break;
        case "-":
        case "_":
          zoom(0.87);
          break;
        case "?":
          setHelpOpen((value) => !value);
          break;
        case "Escape":
          setHelpOpen(false);
          break;
        default:
          break;
      }
    }

    node.addEventListener("keydown", onKeyDown);
    return () => node.removeEventListener("keydown", onKeyDown);
  }, [list.length, next, previous, resetView, selectByIndex, zoom]);

  const selectedAccent = selected ? accentFor(selected.destinationGroup) : "#83d7ff";

  return (
    <section
      id="gallery"
      ref={sectionRef}
      aria-labelledby="gallery-title"
      className="container-content relative py-14 sm:py-16"
    >
      <SectionHeading
        eyebrow={t(locale, "gallery.eyebrow")}
        title={t(locale, "gallery.title")}
        description={t(locale, "gallery.description")}
        action={
          <Link
            href="#collection"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-accent/50 hover:text-white"
          >
            {t(locale, "gallery.skip")}
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>
        }
      />

      {/* Room controls ------------------------------------------------- */}
      <div className="gallery-toolbar mt-7 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="group"
          aria-label={t(locale, "gallery.filters")}
          className="gallery-filters flex flex-wrap items-center gap-2"
        >
          {(Object.keys(filterKeys) as GalleryFilter[]).map((key) => {
            const active = filter === key;
            const count =
              key === "featured"
                ? featuredIds.length
                : items.filter((item) => item.destinationGroup === key).length;
            const accent =
              key === "featured" ? "#c4b5fd" : accentFor(key);
            return (
              <button
                key={key}
                type="button"
                aria-pressed={active}
                title={t(locale, filterHints[key])}
                onClick={() => {
                  setFilter(key);
                  setSelectedId(null);
                  setTouring(false);
                }}
                style={
                  active
                    ? {
                        borderColor: accent,
                        backgroundColor: `${accent}22`,
                        boxShadow: `0 0 26px -8px ${accent}`,
                        color: "#ffffff",
                      }
                    : undefined
                }
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium transition-colors sm:text-sm",
                  active
                    ? "border-white/30 text-white"
                    : "border-white/12 bg-white/[0.03] text-text-secondary hover:border-white/30 hover:text-white"
                )}
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background: accent,
                    boxShadow: `0 0 8px ${accent}`,
                  }}
                />
                {t(locale, filterKeys[key])}
                <span className="font-mono text-[10px] text-text-secondary">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="sr-only" htmlFor="gallery-search">
            {t(locale, "gallery.search")}
          </label>
          <span className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute start-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-muted"
            />
            <input
              id="gallery-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t(locale, "gallery.searchPlaceholder")}
              className="h-9 w-full rounded-full border border-white/12 bg-white/[0.03] ps-9 pe-8 text-xs text-white placeholder:text-text-muted focus:border-accent/50 sm:w-56"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label={t(locale, "gallery.search")}
                className="absolute end-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-text-muted transition-colors hover:text-white"
              >
                <X aria-hidden="true" className="h-3 w-3" />
              </button>
            ) : null}
          </span>

          <label className="sr-only" htmlFor="gallery-sort">
            {t(locale, "gallery.sort")}
          </label>
          <select
            id="gallery-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as GallerySort)}
            className="h-9 rounded-full border border-white/12 bg-white/[0.03] px-3 text-xs font-medium text-text-secondary transition-colors hover:border-white/30 hover:text-white"
          >
            <option value="curated">{t(locale, "gallery.sortCurated")}</option>
            <option value="chronological">
              {t(locale, "gallery.sortChronological")}
            </option>
          </select>
        </div>
      </div>

      {/* The room ------------------------------------------------------ */}
      {selected ? (
        <div className="gallery-shell mt-4 rounded-[1.6rem] sm:rounded-[2rem]">
        <div className="grid lg:h-[690px] lg:grid-cols-[minmax(0,1fr)_380px]">
          <div ref={stageRef} className="hall-stage relative flex flex-col">
            <div className="relative min-h-[420px] flex-1 sm:min-h-[520px]">
              <span className="sr-only" id="gallery-title">
                {t(locale, "gallery.description")}
              </span>

              {/* The canvas is absolutely positioned so the stage always has a
                  definite height for the renderer to measure. */}
              <div className="absolute inset-0">
                <GalleryStage
                  items={list}
                  selected={selected}
                  selectedIndex={selectedIndex}
                  onSelect={selectByIndex}
                  controls={controls}
                  onLookChange={setLooking}
                  locale={locale}
                >
                  <GalleryHud
                    items={list}
                    selectedIndex={selectedIndex}
                    onPrevious={previous}
                    onNext={next}
                    touring={touring}
                    onToggleTour={() => setTouring((value) => !value)}
                    onResetView={resetView}
                    onZoom={zoom}
                    fullscreen={fullscreen}
                    onToggleFullscreen={toggleFullscreen}
                    helpOpen={helpOpen}
                    onToggleHelp={() => setHelpOpen((value) => !value)}
                    looking={looking}
                    locale={locale}
                  />

                  <div className="hall-plan-wrap">
                    <HallPlan
                      items={list}
                      selectedIndex={selectedIndex}
                      onSelect={selectByIndex}
                      locale={locale}
                    />
                  </div>

                  {helpOpen ? (
                    <GalleryShortcuts
                      onClose={() => setHelpOpen(false)}
                      locale={locale}
                    />
                  ) : null}
                </GalleryStage>
              </div>
            </div>

            <div className="border-t border-white/10 bg-black/20 px-4 py-3.5 sm:px-5">
              <HallChronology
                items={list}
                selectedIndex={selectedIndex}
                onSelect={selectByIndex}
                locale={locale}
              />
            </div>
          </div>

          <aside className="relative border-t border-white/10 bg-[#040c19]/85 lg:overflow-y-auto lg:border-l lg:border-t-0">
            <ExhibitPanel
              item={selected}
              bayNumber={selectedIndex + 1}
              bayCount={list.length}
              locale={locale}
            />
          </aside>
        </div>

        <GalleryRail
          items={list}
          selectedIndex={selectedIndex}
          onSelect={selectByIndex}
          locale={locale}
        />
        </div>
      ) : (
        <div className="gallery-shell mt-4 rounded-[1.6rem] px-6 py-14 text-center sm:rounded-[2rem]">
          <p className="mx-auto max-w-md text-sm leading-relaxed text-text-secondary">
            {t(locale, "gallery.searchEmpty")}
          </p>
        </div>
      )}

      <p role="status" aria-live="polite" className="sr-only">
        {selected
          ? `${t(locale, "gallery.announce")
              .replace("{name}", selected.name)
              .replace("{index}", String(selectedIndex + 1))
              .replace("{total}", String(list.length))}`
          : ""}
      </p>

      <p className="mt-3 text-end text-[11px] text-text-muted">
        {t(locale, "gallery.foot")}
      </p>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute start-0 top-24 h-px w-24"
        style={{ background: selectedAccent, opacity: 0.5 }}
      />
    </section>
  );
}
