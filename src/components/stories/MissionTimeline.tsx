"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";
import type { EchoTimelineEvent } from "@/types/echo";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { pick } from "@/lib/echo/localized";

/**
 * The mission timeline.
 *
 * Events run along a horizontal rail. On a narrow screen the rail becomes
 * vertical, because a timeline that needs sideways scrolling is a timeline
 * nobody can read.
 */
export function MissionTimeline({
  events,
  locale,
  accent = "#6d4aff",
}: {
  events: EchoTimelineEvent[];
  locale: Locale;
  accent?: string;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = events.find((event) => event.id === activeId) ?? null;

  return (
    <section
      aria-label={t(locale, "echo.timeline")}
      className="echo-card rounded-2xl p-5 sm:p-6"
    >
      <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-[#5b3fe0]">
        <CalendarDays aria-hidden="true" className="h-4 w-4" />
        {t(locale, "echo.timeline")}
      </h3>

      <ol className="relative mt-6 space-y-0 border-s-2 border-[#1a1338]/12 ps-6">
        {events.map((event) => {
          const selected = activeId === event.id;
          return (
            <li key={event.id} className="relative pb-6 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute -start-[1.9rem] top-1 h-3 w-3 rounded-full border-2 border-white shadow"
                style={{
                  backgroundColor: selected ? accent : "#c9c0ae",
                }}
              />
              <button
                type="button"
                onClick={() => setActiveId(selected ? null : event.id)}
                aria-expanded={selected}
                className="text-start"
              >
                <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#6b6484]">
                  {pick(locale, event.dateLabel)}
                </span>
                <span className="mt-0.5 block text-base font-semibold text-[#1a1338]">
                  {pick(locale, event.label)}
                </span>
                <span className="mt-1 block max-w-prose text-sm leading-relaxed text-[#4a4266]">
                  {pick(locale, event.description)}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {active ? (
        <div className="mt-4 rounded-2xl border border-[#1a1338]/10 bg-[#f6f1e6] p-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#5b3fe0]">
            {pick(locale, active.dateLabel)}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[#1a1338]">
            {pick(locale, active.description)}
          </p>
        </div>
      ) : null}
    </section>
  );
}
