"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { useEcho } from "@/lib/echo/provider";

/**
 * The hero CTA of a story.
 *
 * A first visit says "Start the journey". A returning reader who left
 * mid-story gets "Continue the journey" and lands on the exact chapter they
 * were reading, because progress is stored on the device.
 */
export function StartJourney({
  chapterIds,
  locale,
}: {
  chapterIds: string[];
  locale: Locale;
}) {
  const { progress, storySlug } = useEcho();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const active =
    mounted && storySlug ? progress.active[storySlug] ?? null : null;
  const returning = Boolean(active && chapterIds.includes(active));
  const label = returning
    ? t(locale, "echo.continueJourney")
    : t(locale, "echo.startJourney");

  return (
    <a
      href={returning ? `#chapter-${active}` : `#chapter-${chapterIds[0]}`}
      className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#1a1338] shadow-lg transition-transform hover:-translate-y-0.5"
    >
      {label}
      <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
    </a>
  );
}
