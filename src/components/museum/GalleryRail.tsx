"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { accentFor } from "@/lib/gallery";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import type { GalleryItem } from "@/types/gallery";

type GalleryRailProps = {
  items: GalleryItem[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  locale: Locale;
};

/**
 * The strip of bays below the room. It mirrors the 3D layout exactly, so a
 * visitor can see the whole selection at once and step through it without
 * using the 3D view at all.
 */
export function GalleryRail({
  items,
  selectedIndex,
  onSelect,
  locale,
}: GalleryRailProps) {
  const railRef = useRef<HTMLUListElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  // Keep the selected bay in view as the visitor moves through the room.
  useEffect(() => {
    const active = activeRef.current;
    const rail = railRef.current;
    if (!active || !rail) return;
    const offset =
      active.offsetLeft - rail.clientWidth / 2 + active.clientWidth / 2;
    rail.scrollTo({ left: Math.max(0, offset), behavior: "smooth" });
  }, [selectedIndex, items]);

  return (
    <div className="border-t border-white/10 bg-black/25 px-4 py-4 sm:px-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
          {t(locale, "gallery.rooms")}
        </p>
        <p className="hidden text-[11px] text-text-muted sm:block">
          {t(locale, "gallery.roomsHint")}
        </p>
      </div>

      <ul ref={railRef} className="exhibit-rail mt-3 flex gap-2 overflow-x-auto pb-2">
        {items.map((item, index) => {
          const active = index === selectedIndex;
          const accent = accentFor(item.destinationGroup);
          return (
            <li key={item.id} className="shrink-0">
              <button
                ref={active ? activeRef : undefined}
                type="button"
                onClick={() => onSelect(index)}
                aria-pressed={active}
                aria-label={`${t(locale, "gallery.bay")} ${index + 1}: ${item.name}`}
                style={
                  active
                    ? { borderColor: accent, backgroundColor: `${accent}1f` }
                    : undefined
                }
                className={cn(
                  "exhibit-thumb flex w-[150px] items-center gap-2.5 rounded-xl border p-1.5 text-start",
                  active ? "border-white/30" : "border-white/10 bg-white/[0.03]"
                )}
              >
                <span className="relative h-12 w-11 shrink-0 overflow-hidden rounded-md bg-bg-elevated">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="44px"
                    loading="lazy"
                    className="object-cover"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-0.5"
                    style={{ background: accent }}
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11px] font-medium text-white">
                    {item.name}
                  </span>
                  <span className="mt-0.5 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.12em] text-text-muted">
                    <span className="font-mono text-[10px] text-white/55">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.year}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
