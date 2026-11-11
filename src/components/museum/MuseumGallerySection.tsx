"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Orbit,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { GalleryStage } from "./GalleryStage";
import { cn } from "@/lib/cn";
import type { GalleryFilter, GalleryItem } from "@/types/gallery";

type MuseumGallerySectionProps = {
  items: GalleryItem[];
  featuredIds: string[];
};

const destinationAccents = {
  moon: "#8fc7ff",
  mars: "#ff9d7a",
  "deep-space": "#c3a6ff",
} as const;

const filters: Array<{
  id: GalleryFilter;
  label: string;
  hint: string;
  accent: string;
}> = [
  {
    id: "featured",
    label: "Highlights",
    hint: "A cross-section of the collection",
    accent: "#c4b5fd",
  },
  { id: "moon", label: "The Moon", hint: "12 lunar artifacts", accent: "#8fc7ff" },
  { id: "mars", label: "Mars", hint: "12 Mars artifacts", accent: "#ff9d7a" },
  {
    id: "deep-space",
    label: "Deep Space",
    hint: "6 outer-solar-system artifacts",
    accent: "#c3a6ff",
  },
];

export function MuseumGallerySection({
  items,
  featuredIds,
}: MuseumGallerySectionProps) {
  const [filter, setFilter] = useState<GalleryFilter>("featured");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const list = useMemo(() => {
    if (filter === "featured") {
      return featuredIds
        .map((id) => items.find((item) => item.id === id))
        .filter((item): item is GalleryItem => Boolean(item));
    }
    return items.filter((item) => item.destinationGroup === filter);
  }, [featuredIds, filter, items]);

  useEffect(() => {
    if (!list.some((item) => item.id === selectedId)) {
      setSelectedId(list[0]?.id ?? null);
    }
  }, [list, selectedId]);

  const selected = useMemo(
    () => list.find((item) => item.id === selectedId) ?? list[0],
    [list, selectedId]
  );

  if (!selected) return null;

  const selectedIndex = Math.max(
    0,
    list.findIndex((item) => item.id === selected.id)
  );
  const selectedAccent =
    destinationAccents[selected.destinationGroup] ?? "#83d7ff";

  function selectByIndex(index: number) {
    const next = list[(index + list.length) % list.length];
    if (next) setSelectedId(next.id);
  }

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="container-content relative py-14 sm:py-16"
    >
      <SectionHeading
        eyebrow="The exhibition hall"
        title="Walk the collection in three dimensions"
        description="An interactive rotunda of NASA imagery. Move through the hall exhibit by exhibit, or drop into the full collection below — both routes lead to the same source-linked records."
        action={
          <Link
            href="#collection"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-accent/50 hover:text-white"
          >
            Skip to the collection
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>
        }
      />

      <div
        role="group"
        aria-label="Filter the 3D exhibition hall"
        className="mt-7 flex flex-wrap items-center gap-2"
      >
        {filters.map((entry) => (
          <button
            key={entry.id}
            type="button"
            aria-pressed={filter === entry.id}
            onClick={() => {
              setFilter(entry.id);
              setSelectedId(null);
            }}
            style={
              filter === entry.id
                ? {
                    borderColor: entry.accent,
                    backgroundColor: `${entry.accent}22`,
                    boxShadow: `0 0 24px -8px ${entry.accent}`,
                    color: "#ffffff",
                  }
                : undefined
            }
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium transition-colors sm:text-sm",
              filter === entry.id
                ? "border-white/30 text-white"
                : "border-white/12 bg-white/[0.03] text-text-secondary hover:border-white/30 hover:text-white"
            )}
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: entry.accent,
                boxShadow: `0 0 8px ${entry.accent}`,
              }}
            />
            {entry.label}
            <span className="font-mono text-[10px] text-text-secondary">
              {entry.id === "featured"
                ? featuredIds.length
                : items.filter((item) => item.destinationGroup === entry.id)
                    .length}
            </span>
          </button>
        ))}
        <span className="ml-auto hidden text-[11px] text-text-muted sm:block">
          {selectedIndex + 1} / {list.length} · move your pointer to look around
        </span>
      </div>

      <div className="gallery-shell mt-4 rounded-[1.6rem] sm:rounded-[2rem]">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_370px]">
          <div className="relative min-h-[440px] sm:min-h-[540px] lg:min-h-[620px]">
            <span className="sr-only" id="gallery-title">
              A decorative 3D exhibition hall. Use the exhibit list and selected
              record panel to browse the collection.
            </span>

            <GalleryStage
              items={list}
              selected={selected}
              selectedIndex={selectedIndex}
              onSelect={selectByIndex}
            />

            <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/12 bg-black/45 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white/75 backdrop-blur sm:left-5 sm:top-5">
              <Orbit aria-hidden="true" className="h-3.5 w-3.5 text-accent-bright" />
              3D exhibition hall
            </div>

            <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2 sm:bottom-5">
              <button
                type="button"
                aria-label="Previous exhibit"
                onClick={() => selectByIndex(selectedIndex - 1)}
                className="inline-flex h-10 items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-3.5 text-xs font-medium text-white/85 backdrop-blur transition-colors hover:border-accent/50 hover:bg-black/65 hover:text-white"
              >
                <ChevronLeft aria-hidden="true" className="h-4 w-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>
              <span className="rounded-full border border-white/12 bg-black/45 px-3 py-2 font-mono text-[11px] tabular-nums text-white/75 backdrop-blur">
                {selectedIndex + 1} / {list.length}
              </span>
              <button
                type="button"
                aria-label="Next exhibit"
                onClick={() => selectByIndex(selectedIndex + 1)}
                className="inline-flex h-10 items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-3.5 text-xs font-medium text-white/85 backdrop-blur transition-colors hover:border-accent/50 hover:bg-black/65 hover:text-white"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          </div>

          <aside className="relative border-t border-white/10 bg-[#040c19]/80 lg:border-l lg:border-t-0">
            <div
              key={selected.id}
              className="exhibit-panel flex h-full flex-col p-5 sm:p-6"
              aria-live="polite"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-bright">
                  Selected exhibit
                </p>
                <span
                  className="rounded-full border px-2 py-0.5 font-mono text-[10px]"
                  style={{
                    borderColor: `${selectedAccent}55`,
                    color: selectedAccent,
                  }}
                >
                  {selected.year}
                </span>
              </div>

              <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-xl border border-white/12 bg-bg-elevated">
                <Image
                  src={selected.image}
                  alt={selected.alt}
                  fill
                  sizes="(min-width: 1024px) 370px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040c19]/80 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-2 py-0.5 text-[10px] font-medium text-white/85 backdrop-blur">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: selectedAccent }}
                  />
                  {selected.destination}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] uppercase tracking-[0.16em] text-text-muted">
                <span style={{ color: selectedAccent }}>
                  {selected.missionName}
                </span>
                <span aria-hidden="true">/</span>
                <span>{selected.dateLabel}</span>
              </div>

              <h3 className="mt-2 text-xl font-semibold leading-snug text-white">
                {selected.name}
              </h3>
              <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-text-secondary">
                {selected.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                <StatusBadge
                  kind="mission"
                  status={selected.missionStatus}
                  compact
                />
                <StatusBadge
                  kind="hardware"
                  status={selected.hardwareStatus}
                  compact
                />
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
                <Link
                  href={`/museum/${selected.id}`}
                  className="btn-primary inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold"
                >
                  Open the full record
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <Link
                  href="#collection"
                  className="inline-flex h-10 items-center gap-1.5 rounded-full border border-white/15 px-3.5 text-xs font-medium text-text-secondary transition-colors hover:border-accent/50 hover:text-white"
                >
                  All artifacts
                </Link>
              </div>
            </div>
          </aside>
        </div>

        <div className="border-t border-white/10 bg-black/20 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
              Exhibits in this room
            </p>
            <p className="text-[11px] text-text-muted">
              Keyboard-accessible exhibit list
            </p>
          </div>
          <ul className="exhibit-rail mt-3 flex gap-2 overflow-x-auto pb-2">
            {list.map((item) => {
              const active = item.id === selected.id;
              return (
                <li key={item.id} className="shrink-0">
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedId(item.id)}
                    style={
                      active
                        ? {
                            borderColor: destinationAccents[item.destinationGroup],
                            backgroundColor: `${destinationAccents[item.destinationGroup]}18`,
                          }
                        : undefined
                    }
                    className={cn(
                      "exhibit-thumb flex w-[124px] items-center gap-2 rounded-xl border p-1.5 text-left",
                      active
                        ? "border-white/30"
                        : "border-white/10 bg-white/[0.03]"
                    )}
                  >
                    <span className="relative h-12 w-10 shrink-0 overflow-hidden rounded-md bg-bg-elevated">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="40px"
                        loading="lazy"
                        className="object-cover"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[11px] font-medium text-white">
                        {item.name}
                      </span>
                      <span className="mt-0.5 block text-[9px] uppercase tracking-[0.12em] text-text-muted">
                        {item.year}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <p className="mt-3 text-right text-[11px] text-text-muted">
        Exhibit imagery: NASA. The 3D hall is decorative; all information is in
        the accessible panel and the collection below.
      </p>
    </section>
  );
}
