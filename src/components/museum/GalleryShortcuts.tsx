"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

type GalleryShortcutsProps = {
  onClose: () => void;
  locale: Locale;
};

/**
 * The keyboard reference. Focus moves into the panel when it opens so the
 * list can be read and dismissed without hunting for the trigger.
 */
export function GalleryShortcuts({ onClose, locale }: GalleryShortcutsProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  const shortcuts: Array<[string, string]> = [
    ["← / →", t(locale, "gallery.shortcutMove")],
    ["Space", t(locale, "gallery.shortcutTour")],
    ["R", t(locale, "gallery.shortcutReset")],
    ["+ / −", t(locale, "gallery.shortcutZoom")],
    ["?", t(locale, "gallery.shortcutTitle")],
  ];

  return (
    <div
      className="hall-help absolute inset-x-3 bottom-20 z-30 rounded-2xl border border-white/15 bg-[#050f1c]/94 p-4 shadow-2xl backdrop-blur-md sm:inset-x-auto sm:end-4 sm:bottom-20 sm:w-72"
      role="dialog"
      aria-modal="false"
      aria-label={t(locale, "gallery.shortcutTitle")}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-bright">
          {t(locale, "gallery.shortcutTitle")}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t(locale, "gallery.shortcutTitle")}
          className="rounded-full p-1 text-text-muted transition-colors hover:text-white"
        >
          <X aria-hidden="true" className="h-3.5 w-3.5" />
        </button>
      </div>
      <dl className="mt-3 space-y-2 text-xs">
        {shortcuts.map(([key, label]) => (
          <div key={key} className="flex items-center justify-between gap-3">
            <dt className="font-mono text-[11px] text-white/70">{key}</dt>
            <dd className="text-end text-text-secondary">{label}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
