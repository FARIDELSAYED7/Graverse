"use client";

import { useState } from "react";
import { ScrollText } from "lucide-react";
import type { EchoTimelineEvent } from "@/types/echo";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { pick } from "@/lib/echo/localized";

/**
 * The mission log.
 *
 * The same events as the timeline, written as short records in a table-like
 * list. It is the reference view: a visitor who wants to check a date finds
 * it here without hunting through the story.
 */
export function MissionLog({
  events,
  locale,
}: {
  events: EchoTimelineEvent[];
  locale: Locale;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section
      aria-label={t(locale, "echo.log")}
      className="echo-card rounded-3xl p-5 sm:p-6"
    >
      <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-[#5b3fe0]">
        <ScrollText aria-hidden="true" className="h-4 w-4" />
        {t(locale, "echo.log")}
      </h3>

      <ul className="mt-4 divide-y divide-[#1a1338]/10">
        {events.map((event) => {
          const open = expanded === event.id;
          return (
            <li key={event.id} className="py-3">
              <button
                type="button"
                onClick={() => setExpanded(open ? null : event.id)}
                aria-expanded={open}
                className="flex w-full items-baseline gap-3 text-start"
              >
                <span className="w-28 shrink-0 font-mono text-[11px] tabular-nums text-[#6b6484]">
                  {event.date}
                </span>
                <span className="flex-1 text-sm font-semibold text-[#1a1338]">
                  {pick(locale, event.label)}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#5b3fe0]">
                  {event.type.replace(/-/g, " ")}
                </span>
              </button>
              {open ? (
                <p className="mt-2 ps-31 text-sm leading-relaxed text-[#4a4266] sm:ps-31">
                  {pick(locale, event.description)}
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
