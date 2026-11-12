"use client";

import { useMemo } from "react";
import { accentFor } from "@/lib/gallery";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import type { GalleryItem } from "@/types/gallery";

type HallChronologyProps = {
  items: GalleryItem[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  locale: Locale;
};

const RATIO_SCALE = 10000;

/** Rounds so the server and client render the same axis. */
function round(value: number): number {
  return Math.round(value * RATIO_SCALE) / RATIO_SCALE;
}

/**
 * The room read as time. Every exhibit in the current selection is placed on
 * a shared axis by launch date, so the collection's sixty-year span is
 * visible at a glance and any point on it can be visited.
 */
export function HallChronology({
  items,
  selectedIndex,
  onSelect,
  locale,
}: HallChronologyProps) {
  const points = useMemo(() => {
    const dated = items.map((item, index) => {
      const parsed = Date.parse(item.sortDate);
      const time = Number.isNaN(parsed) ? null : parsed;
      return { item, index, time };
    });
    const known = dated.filter((entry) => entry.time !== null);
    const min = known.length ? Math.min(...known.map((entry) => entry.time as number)) : 0;
    const max = known.length ? Math.max(...known.map((entry) => entry.time as number)) : 1;
    const span = Math.max(max - min, 1);
    return dated.map((entry) => ({
      ...entry,
      ratio:
        entry.time === null ? 0.5 : Math.min(1, Math.max(0, (entry.time - min) / span)),
    }));
  }, [items]);

  const years = useMemo(() => {
    const known = points
      .map((point) => (point.time === null ? null : new Date(point.time).getFullYear()))
      .filter((year): year is number => year !== null);
    if (known.length === 0) return [];
    const min = Math.min(...known);
    const max = Math.max(...known);
    const step = Math.max(1, Math.round((max - min) / 4));
    const ticks: number[] = [];
    for (let year = min; year <= max; year += step) ticks.push(year);
    if (ticks[ticks.length - 1] !== max) ticks.push(max);
    return ticks;
  }, [points]);

  const firstYear = years[0];
  const lastYear = years[years.length - 1];

  return (
    <div className="hall-chronology">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
          {t(locale, "gallery.chronology")}
        </p>
        <p className="font-mono text-[10px] tabular-nums text-text-muted">
          {firstYear} — {lastYear}
        </p>
      </div>

      <div className="hall-chronology__track">
        <span aria-hidden="true" className="hall-chronology__line" />

        <div className="hall-chronology__rail">
          {years.map((year) => (
            <span
              key={year}
              aria-hidden="true"
              className="hall-chronology__tick"
              style={{
                left: `${
                  firstYear === lastYear
                    ? 50
                    : round(((year - firstYear) / (lastYear - firstYear)) * 100)
                }%`,
              }}
            />
          ))}

          {points.map((point) => {
            const active = point.index === selectedIndex;
            const accent = accentFor(point.item.destinationGroup);
            return (
              <button
                key={point.item.id}
                type="button"
                onClick={() => onSelect(point.index)}
                aria-pressed={active}
                data-active={active}
                aria-label={`${point.item.name} — ${point.item.year}`}
                className="hall-chronology__dot"
                style={
                  {
                    left: `${round(point.ratio * 100)}%`,
                    backgroundColor: accent,
                    "--dot-accent": accent,
                    "--dot-scale": active ? 1.35 : 1,
                  } as React.CSSProperties
                }
              >
                <span className="sr-only">
                  {point.item.name} — {point.item.year}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="sr-only">{t(locale, "gallery.chronologyHint")}</p>
    </div>
  );
}
