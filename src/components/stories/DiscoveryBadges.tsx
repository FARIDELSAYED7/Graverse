"use client";

import { Award } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { pick } from "@/lib/echo/localized";
import { useEcho } from "@/lib/echo/provider";
import type { Localized } from "@/types/echo";

/**
 * The discovery badge.
 *
 * Badges celebrate learning, not time spent: the badge is awarded when the
 * last chapter of the story has been read. It is stored on the device only.
 */
export function DiscoveryBadges({
  badge,
  badgeKey,
  locale,
  chapterCount,
  accent = "#6d4aff",
}: {
  badge: Localized;
  badgeKey: string;
  locale: Locale;
  chapterCount: number;
  accent?: string;
}) {
  const { completedChapters, awardBadge, reset } = useEcho();
  const earned = completedChapters.length >= chapterCount;

  return (
    <section
      aria-label={t(locale, "echo.badge")}
      className="echo-card overflow-hidden rounded-2xl"
    >
      <div
        className="flex items-center gap-4 px-5 py-5"
        style={{ backgroundColor: `${accent}12` }}
      >
        <span
          aria-hidden="true"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-dashed"
          style={{ borderColor: accent, color: accent }}
        >
          <Award className="h-7 w-7" />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#5b3fe0]">
            {t(locale, "echo.badge")}
          </p>
          <p className="mt-0.5 text-lg font-semibold text-[#1a1338]">
            {pick(locale, badge)}
          </p>
          <p className="mt-0.5 text-xs text-[#4a4266]">
            {earned
              ? t(locale, "echo.badgeEarned")
              : t(locale, "echo.badgeLocked")}
          </p>
        </div>
      </div>

      {earned ? (
        <div className="flex flex-wrap items-center gap-3 border-t border-[#1a1338]/10 px-5 py-4">
          <p className="text-xs text-[#4a4266]">
            {t(locale, "echo.completedNote")}
          </p>
          <button
            type="button"
            onClick={() => awardBadge(badgeKey)}
            className="ms-auto rounded-full border border-[#1a1338]/15 bg-white px-3 py-1.5 text-xs font-semibold text-[#4a4266] transition-colors hover:border-[#6d4aff]/50 hover:text-[#1a1338]"
          >
            {t(locale, "echo.badgeEarned")}
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-[#1a1338]/12 px-3 py-1.5 text-xs font-semibold text-[#6b6484] transition-colors hover:text-[#1a1338]"
          >
            {t(locale, "echo.resetProgress")}
          </button>
        </div>
      ) : (
        <div className="border-t border-[#1a1338]/10 px-5 py-3.5">
          <p className="text-xs text-[#6b6484]">
            {completedChapters.length} / {chapterCount}{" "}
            {t(locale, "echo.completed")} · {t(locale, "echo.completedNote")}
          </p>
        </div>
      )}
    </section>
  );
}
