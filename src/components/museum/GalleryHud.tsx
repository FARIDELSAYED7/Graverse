"use client";

import {
  ChevronLeft,
  ChevronRight,
  Expand,
  Keyboard,
  Minus,
  Orbit,
  Pause,
  Play,
  Plus,
  RotateCcw,
} from "lucide-react";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { accentFor } from "@/lib/gallery";
import { cn } from "@/lib/cn";
import type { GalleryItem } from "@/types/gallery";

type GalleryHudProps = {
  items: GalleryItem[];
  selectedIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  touring: boolean;
  onToggleTour: () => void;
  onResetView: () => void;
  onZoom: (factor: number) => void;
  fullscreen: boolean;
  onToggleFullscreen: () => void;
  helpOpen: boolean;
  onToggleHelp: () => void;
  looking: boolean;
  locale: Locale;
};

/**
 * The chrome that floats over the room: where you are, the tour controls,
 * the view controls and the keyboard reference. Every control is a real
 * button so the hall can be driven without a pointer.
 */
export function GalleryHud({
  items,
  selectedIndex,
  onPrevious,
  onNext,
  touring,
  onToggleTour,
  onResetView,
  onZoom,
  fullscreen,
  onToggleFullscreen,
  helpOpen,
  onToggleHelp,
  looking,
  locale,
}: GalleryHudProps) {
  const count = Math.max(items.length, 1);
  const current = items[selectedIndex];
  const accent = current ? accentFor(current.destinationGroup) : "#83d7ff";

  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-2 p-3 sm:p-4">
        <div className="pointer-events-auto flex min-w-0 items-center gap-2.5 rounded-full border border-white/12 bg-black/55 py-1.5 ps-2.5 pe-3 backdrop-blur-md sm:pe-3.5">
          <span
            aria-hidden="true"
            className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border"
            style={{
              borderColor: `${accent}66`,
              backgroundColor: `${accent}1f`,
            }}
          >
            <Orbit className="h-3.5 w-3.5" style={{ color: accent }} />
          </span>
          <span className="min-w-0">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/85">
              <span className="hidden sm:inline">
                {t(locale, "gallery.badge")}
              </span>
              <span className="sm:hidden">{t(locale, "gallery.bay")}</span>
            </span>
            <span className="mt-0.5 block truncate text-[11px] text-white/60">
              {selectedIndex + 1} / {count}
              {current ? ` · ${current.destination}` : ""}
            </span>
          </span>
        </div>

        <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/12 bg-black/55 p-1 backdrop-blur-md">
          <HudButton
            label={touring ? t(locale, "gallery.tourStop") : t(locale, "gallery.tourStart")}
            onClick={onToggleTour}
            active={touring}
          >
            <span className="relative flex h-4 w-4 items-center justify-center">
              {touring ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              {touring ? (
                <span
                  aria-hidden="true"
                  className="hall-tour-ring absolute inset-0 rounded-full border border-white/70"
                />
              ) : null}
            </span>
          </HudButton>

          <span className="hidden sm:contents">
            <HudButton
              label={t(locale, "gallery.resetView")}
              onClick={onResetView}
              active={looking}
            >
              <RotateCcw className="h-4 w-4" />
            </HudButton>
          </span>

          <span aria-hidden="true" className="mx-0.5 hidden h-5 w-px bg-white/15 sm:block" />

          <HudButton label={t(locale, "gallery.zoomOut")} onClick={() => onZoom(0.82)}>
            <Minus className="h-4 w-4" />
          </HudButton>
          <HudButton label={t(locale, "gallery.zoomIn")} onClick={() => onZoom(1.22)}>
            <Plus className="h-4 w-4" />
          </HudButton>

          <span aria-hidden="true" className="mx-0.5 hidden h-5 w-px bg-white/15 sm:block" />

          <HudButton
            label={
              fullscreen
                ? t(locale, "gallery.exitFullscreen")
                : t(locale, "gallery.fullscreen")
            }
            onClick={onToggleFullscreen}
          >
            <Expand className="h-4 w-4" />
          </HudButton>
          <span className="hidden sm:contents">
            <HudButton
              label={t(locale, "gallery.shortcuts")}
              onClick={onToggleHelp}
              active={helpOpen}
            >
              <Keyboard className="h-4 w-4" />
            </HudButton>
          </span>
        </div>
      </div>

      <p
        className={cn(
          "pointer-events-none absolute bottom-3 start-3 z-20 hidden rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[10px] uppercase tracking-[0.16em] backdrop-blur-md transition-colors sm:block",
          looking ? "text-accent-bright" : "text-white/50"
        )}
      >
        {looking
          ? t(locale, "gallery.looking")
          : t(locale, "gallery.lookHint")}
      </p>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-2 p-3 sm:p-4">
        <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/12 bg-black/55 p-1.5 backdrop-blur-md">
          <button
            type="button"
            onClick={onPrevious}
            aria-label={t(locale, "gallery.previous")}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft aria-hidden="true" className="h-4 w-4" />
          </button>

          <span className="flex items-center gap-2 px-1">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
            <span className="font-mono text-[11px] tabular-nums text-white/85">
              {String(selectedIndex + 1).padStart(2, "0")}
              <span className="text-white/40">
                /{String(count).padStart(2, "0")}
              </span>
            </span>
          </span>

          <div
            aria-hidden="true"
            className="hidden h-1 w-24 overflow-hidden rounded-full bg-white/12 sm:block"
          >
            <span
              className="block h-full rounded-full transition-[width] duration-500"
              style={{
                width: `${((selectedIndex + 1) / count) * 100}%`,
                background: accent,
              }}
            />
          </div>

          <button
            type="button"
            onClick={onNext}
            aria-label={t(locale, "gallery.next")}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
}

function HudButton({
  label,
  onClick,
  active,
  children,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
        active
          ? "bg-white/15 text-white"
          : "text-white/70 hover:bg-white/10 hover:text-white"
      )}
    >
      {children}
    </button>
  );
}
