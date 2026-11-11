"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Layers,
  MapPin,
} from "lucide-react";
import { ArtifactVisual } from "@/components/artifacts/ArtifactVisual";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { hardwareTypeSingular } from "@/data/artifacts";
import { eventTypeLabels } from "@/lib/status";
import { cn } from "@/lib/cn";
import { formatYear } from "@/lib/format";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import type { TimelineEntry } from "@/lib/explore";

type TimelineStageProps = {
  entries: TimelineEntry[];
  selected: TimelineEntry | undefined;
  onSelect: (key: string) => void;
};

export function TimelineStage({
  entries,
  selected,
  onSelect,
}: TimelineStageProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef(new Map<string, HTMLButtonElement>());
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();

  const selectedIndex = useMemo(
    () => entries.findIndex((entry) => entry.key === selected?.key),
    [entries, selected?.key]
  );

  useEffect(() => {
    if (!selected || reduced) return;
    const marker = markerRefs.current.get(selected.key);
    const rail = railRef.current;
    if (!marker || !rail) return;
    const target =
      marker.offsetLeft - rail.clientWidth / 2 + marker.clientWidth / 2;
    rail.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [selected?.key, reduced, selected]);

  function move(delta: number) {
    if (!entries.length) return;
    const nextIndex = Math.min(
      Math.max((selectedIndex < 0 ? 0 : selectedIndex) + delta, 0),
      entries.length - 1
    );
    const next = entries[nextIndex];
    if (next) onSelect(next.key);
  }

  function onMarkerKeyDown(event: React.KeyboardEvent, index: number) {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = Math.min(index + 1, entries.length - 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = Math.max(index - 1, 0);
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = entries.length - 1;
    }
    if (nextIndex === null) return;
    event.preventDefault();
    const next = entries[nextIndex];
    if (!next) return;
    onSelect(next.key);
    markerRefs.current.get(next.key)?.focus();
  }

  if (!selected) {
    return (
      <div className="rounded-card border border-dashed border-white/15 bg-bg-elevated/40 px-6 py-14 text-center">
        <p className="text-sm text-text-secondary">
          No timeline milestones match the current filters.
        </p>
      </div>
    );
  }

  const { artifact, event } = selected;
  const typeLabel = eventTypeLabels[event.type];
  const year = formatYear(event.date);

  return (
    <div className="relative overflow-hidden rounded-[1.35rem] border border-white/12 bg-[#05101f]/85 shadow-card">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="timeline-stars absolute inset-0 opacity-70" />
        <div className="absolute -bottom-48 left-1/2 h-[34rem] w-[130%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(56,146,220,0.24),rgba(6,16,31,0.85)_52%,transparent_72%)]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#040c18] to-transparent" />
      </div>

      <div className="relative grid gap-7 p-5 sm:p-7 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:gap-10">
        <div key={selected.key} className="min-w-0 animate-fade-up">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/35 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-bright">
              <CalendarDays aria-hidden="true" className="h-3 w-3" />
              {typeLabel}
            </span>
            <span className="rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-1 text-[11px] text-text-secondary">
              {artifact.missionName}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-end gap-x-4 gap-y-1">
            <span className="font-mono text-6xl font-light leading-none tabular-nums text-white sm:text-7xl">
              {year}
            </span>
            <span className="pb-1.5 text-sm text-text-secondary">
              {event.dateLabel}
            </span>
          </div>

          <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
            {event.label}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-[15px]">
            {event.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            <StatusBadge kind="mission" status={artifact.missionStatus} compact />
            <StatusBadge
              kind="hardware"
              status={artifact.hardwareStatus}
              compact
            />
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-white/10 pt-4 text-xs sm:grid-cols-3">
            <div>
              <dt className="text-text-muted">Artifact</dt>
              <dd className="mt-0.5 font-medium text-text-primary">
                {artifact.name}
              </dd>
            </div>
            <div>
              <dt className="text-text-muted">Destination</dt>
              <dd className="mt-0.5 flex items-center gap-1 font-medium text-text-primary">
                <MapPin aria-hidden="true" className="h-3 w-3 text-accent-bright" />
                {artifact.destination}
              </dd>
            </div>
            <div>
              <dt className="text-text-muted">Hardware</dt>
              <dd className="mt-0.5 flex items-center gap-1 font-medium text-text-primary">
                <Layers aria-hidden="true" className="h-3 w-3 text-accent-bright" />
                {hardwareTypeSingular[artifact.hardwareType]}
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Link
              href={`/museum/${artifact.id}`}
              className="btn-primary inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold"
            >
              Explore artifact
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <div className="ml-auto flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => move(-1)}
                disabled={selectedIndex <= 0}
                aria-label="Previous timeline event"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-text-secondary transition-colors hover:border-accent/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                disabled={selectedIndex < 0 || selectedIndex >= entries.length - 1}
                aria-label="Next timeline event"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-text-secondary transition-colors hover:border-accent/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute inset-6 rounded-full bg-[radial-gradient(circle,rgba(67,185,255,0.26),transparent_68%)] blur-xl"
          />
          <div
            className="relative transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform: reduced
                ? undefined
                : `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
            }}
            onPointerMove={(event) => {
              if (reduced) return;
              const rect = event.currentTarget.getBoundingClientRect();
              const px = (event.clientX - rect.left) / rect.width - 0.5;
              const py = (event.clientY - rect.top) / rect.height - 0.5;
              setTilt({ x: px * 7, y: -py * 5 });
            }}
            onPointerLeave={() => setTilt({ x: 0, y: 0 })}
          >
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[1.5rem] border border-accent/15"
            />
            <div className="relative overflow-hidden rounded-[1.1rem] border border-white/15 bg-bg-elevated p-1.5 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.95)]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[0.8rem]">
                <ArtifactVisual
                  media={artifact.media}
                  sizes="(min-width: 1024px) 38vw, 90vw"
                  imageClassName="scale-[1.01]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05101f]/85 via-transparent to-transparent" />
                <p className="absolute inset-x-3 bottom-3 text-[11px] leading-snug text-white/80">
                  {artifact.media?.caption ?? "No NASA image available"}
                </p>
              </div>
            </div>
            <div className="glass absolute start-[-0.75rem] bottom-8 hidden rounded-lg px-2.5 py-1.5 text-[10px] uppercase tracking-[0.16em] text-text-secondary sm:block">
              {artifact.media?.isIllustration ? "Artist concept" : "NASA image"}
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-black/20 px-3 pb-3 pt-4 sm:px-5">
        <div className="mb-1 flex items-center justify-between gap-3 px-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
            Chronological timeline
          </p>
          <p className="text-[10px] text-text-muted">
            Scroll, swipe or use ← →
          </p>
        </div>

        <div
          ref={railRef}
          role="group"
          aria-label="Timeline events"
          className="no-scrollbar relative overflow-x-auto overscroll-x-contain pb-1"
        >
          <div className="relative flex min-w-full items-start gap-0 px-1">
            <div
              aria-hidden="true"
              className="timeline-rail pointer-events-none absolute left-2 right-2 top-[2.45rem] h-px opacity-60"
            />
            {entries.map((entry, index) => {
              const isSelected = entry.key === selected.key;
              const previous = entries[index - 1];
              const showYear =
                !previous ||
                previous.event.date.slice(0, 4) !== entry.event.date.slice(0, 4);
              return (
                <button
                  key={entry.key}
                  ref={(node) => {
                    if (node) markerRefs.current.set(entry.key, node);
                    else markerRefs.current.delete(entry.key);
                  }}
                  type="button"
                  aria-pressed={isSelected}
                  aria-label={`${entry.event.label}, ${entry.artifact.name}, ${entry.event.dateLabel}`}
                  onClick={() => onSelect(entry.key)}
                  onKeyDown={(event) => onMarkerKeyDown(event, index)}
                  className="group relative z-10 flex w-[92px] shrink-0 snap-center flex-col items-center rounded-lg pb-2 outline-offset-4 sm:w-[104px]"
                >
                  <span
                    className={cn(
                      "flex h-[18px] items-center font-mono text-[11px] tabular-nums transition-colors",
                      isSelected
                        ? "text-accent-bright"
                        : "text-text-muted group-hover:text-text-secondary"
                    )}
                  >
                    {showYear ? entry.event.date.slice(0, 4) : "\u00A0"}
                  </span>
                  <span className="relative mt-2 flex h-6 w-6 items-center justify-center">
                    {isSelected ? (
                      <span className="timeline-glow absolute inset-[-10px] rounded-full" />
                    ) : null}
                    <span
                      className={cn(
                        "relative rounded-full border transition-all",
                        isSelected
                          ? "h-3.5 w-3.5 border-accent-bright bg-accent-bright shadow-[0_0_16px_rgba(131,215,255,0.95)]"
                          : "h-2.5 w-2.5 border-white/35 bg-[#0b1b30] group-hover:border-accent/70"
                      )}
                    />
                  </span>
                  <span
                    className={cn(
                      "mt-1.5 line-clamp-2 min-h-[2.2em] px-0.5 text-center text-[10px] leading-[1.15] transition-colors",
                      isSelected
                        ? "font-medium text-white"
                        : "text-text-muted group-hover:text-text-secondary"
                    )}
                  >
                    {entry.event.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
