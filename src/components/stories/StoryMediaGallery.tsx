"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { EchoMedia } from "@/types/echo";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { pick } from "@/lib/echo/localized";
import { MediaAttribution } from "./MediaAttribution";

/**
 * The media gallery.
 *
 * A thumbnail strip with a lightbox. The lightbox is a real dialog: it traps
 * focus, closes on Escape and can be dismissed with the close button, so it
 * behaves the way a keyboard user expects.
 */
export function StoryMediaGallery({
  media,
  locale,
}: {
  media: EchoMedia[];
  locale: Locale;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenIndex(null);
    }
    window.addEventListener("keydown", onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [openIndex]);

  const active = openIndex === null ? null : media[openIndex];

  return (
    <section aria-label={t(locale, "echo.gallery")}>
      <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[#5b3fe0]">
        {t(locale, "echo.gallery")}
      </h3>
      <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {media.map((entry, index) => (
          <li key={entry.id}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group relative block w-full overflow-hidden rounded-2xl border border-[#1a1338]/10"
            >
              <img
                src={entry.thumb ?? entry.src}
                alt={pick(locale, entry.alt)}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#150f36]/85 to-transparent p-2 text-start text-[11px] font-semibold text-white">
                {pick(locale, entry.caption).slice(0, 68)}
                {pick(locale, entry.caption).length > 68 ? "…" : ""}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={pick(locale, active.caption)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0d0a24]/92 p-4"
          onClick={() => setOpenIndex(null)}
        >
          <div
            className="echo-card max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl p-4 sm:p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <h4 className="text-base font-semibold text-[#1a1338]">
                {pick(locale, active.caption)}
              </h4>
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                aria-label={t(locale, "common.back")}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#1a1338]/15 text-[#4a4266] hover:bg-[#1a1338]/5"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
            <img
              src={active.src}
              alt={pick(locale, active.alt)}
              className="mt-3 w-full rounded-2xl"
            />
            <p className="mt-3 text-sm leading-relaxed text-[#4a4266]">
              {pick(locale, active.alt)}
            </p>
            <div className="mt-4">
              <MediaAttribution media={active} locale={locale} />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
