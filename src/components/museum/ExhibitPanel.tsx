"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Bookmark, BookmarkCheck, Library } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { accentFor } from "@/lib/gallery";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { usePersonal } from "@/lib/use-personal";
import { cn } from "@/lib/cn";
import type { GalleryItem } from "@/types/gallery";

type ExhibitPanelProps = {
  item: GalleryItem;
  bayNumber: number;
  bayCount: number;
  locale: Locale;
};

/**
 * The written label beside the exhibit. Everything the 3D room shows as
 * light, colour or shape is also stated here in words, so the panel is a
 * complete record on its own.
 */
export function ExhibitPanel({ item, bayNumber, bayCount, locale }: ExhibitPanelProps) {
  const personal = usePersonal();
  const saved = personal.isFavorite(item.id);
  const accent = accentFor(item.destinationGroup);

  return (
    <div className="exhibit-panel flex h-full flex-col">
      <div
        tabIndex={0}
        aria-label={`${t(locale, "gallery.selected")}: ${item.name}`}
        className="thin-scrollbar flex-1 overflow-y-auto p-5 sm:p-6"
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-bright">
            {t(locale, "gallery.selected")}
          </p>
          <span className="flex items-center gap-2">
            <span
              className="rounded-full border px-2 py-0.5 font-mono text-[10px]"
              style={{ borderColor: `${accent}55`, color: accent }}
            >
              {item.year}
            </span>
            <span className="rounded-full border border-white/12 px-2 py-0.5 font-mono text-[10px] text-text-secondary">
              {String(bayNumber).padStart(2, "0")}/{String(bayCount).padStart(2, "0")}
            </span>
          </span>
        </div>

        <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-xl border border-white/12 bg-bg-elevated">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="(min-width: 1024px) 380px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040c19]/85 via-transparent to-transparent" />
          <span className="absolute bottom-2 left-2 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-2 py-0.5 text-[10px] font-medium text-white/85 backdrop-blur">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: accent }}
            />
            {item.destination}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] uppercase tracking-[0.16em] text-text-muted">
          <span style={{ color: accent }}>{item.missionName}</span>
          <span aria-hidden="true">/</span>
          <span>{item.dateLabel}</span>
        </div>

        <h3 className="mt-2 text-xl font-semibold leading-snug text-white">
          {item.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          {item.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <StatusBadge kind="mission" status={item.missionStatus} compact />
          <StatusBadge kind="hardware" status={item.hardwareStatus} compact />
        </div>

        {item.facts.length > 0 ? (
          <div className="mt-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
              {t(locale, "gallery.keyFacts")}
            </p>
            <dl className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {item.facts.map((fact) => (
                <div key={fact.label} className="min-w-0">
                  <dt className="truncate text-[10px] uppercase tracking-[0.14em] text-text-muted">
                    {fact.label}
                  </dt>
                  <dd className="mt-0.5 truncate text-xs font-medium text-white/90">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}

        {item.contributions.length > 0 ? (
          <div className="mt-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
              {t(locale, "gallery.contributions")}
            </p>
            <ul className="mt-2 space-y-2">
              {item.contributions.slice(0, 2).map((contribution) => (
                <li key={contribution.title} className="flex gap-2 text-xs leading-relaxed">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                    style={{ background: accent }}
                  />
                  <span className="min-w-0 text-text-secondary">
                    <span className="font-medium text-white/90">{contribution.title}</span>
                    {" — "}
                    {contribution.summary}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="shrink-0 border-t border-white/10 bg-[#06121f]/90 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/museum/${item.id}`}
            className="btn-primary inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold"
          >
            {t(locale, "gallery.openRecord")}
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={() => personal.favorite(item.id)}
            aria-pressed={saved}
            className={cn(
              "inline-flex h-10 items-center gap-1.5 rounded-full border px-3.5 text-xs font-medium transition-colors",
              saved
                ? "border-brand-magenta/50 bg-brand-magenta/15 text-white"
                : "border-white/15 text-text-secondary hover:border-accent/50 hover:text-white"
            )}
          >
            {saved ? (
              <BookmarkCheck aria-hidden="true" className="h-4 w-4 text-brand-magenta" />
            ) : (
              <Bookmark aria-hidden="true" className="h-4 w-4" />
            )}
            {saved ? t(locale, "gallery.saved") : t(locale, "gallery.save")}
          </button>
          <Link
            href="#collection"
            className="inline-flex h-10 items-center gap-1.5 rounded-full border border-white/15 px-3.5 text-xs font-medium text-text-secondary transition-colors hover:border-accent/50 hover:text-white"
          >
            <Library aria-hidden="true" className="h-3.5 w-3.5" />
            {t(locale, "gallery.allArtifacts")}
          </Link>
        </div>
      </div>
    </div>
  );
}
