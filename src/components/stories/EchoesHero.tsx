"use client";

import Link from "next/link";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

/**
 * The ECHOES hero.
 *
 * A full-bleed cinematic opening: a real NASA archive photograph graded dark
 * under the copy, with the promise of the experience on top. The 3D
 * companion lives further down the page in its own "Meet ECHO" section, so
 * the hero carries the story world and the robot carries the welcome.
 */
export function EchoesHero({
  locale,
  image,
}: {
  locale: Locale;
  image: { src: string };
}) {
  return (
    <section className="relative overflow-hidden bg-[#150f36]">
      {/* NASA archive photograph — decorative backdrop, graded for legibility. */}
      <div aria-hidden="true" className="absolute inset-0">
        <img
          src={image.src}
          alt=""
          className="h-full w-full object-cover opacity-55"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#150f36]/95 via-[#150f36]/78 to-[#150f36]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0920]/95 via-transparent to-[#150f36]/55" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-24 bottom-0 h-64 w-64 rounded-full bg-[#12a89b]/20 blur-3xl"
      />

      <div className="container-content relative py-20 sm:py-28 lg:py-36">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur">
          <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
          {t(locale, "echo.eyebrow")}
        </p>

        <h1 className="mt-6 max-w-3xl text-balance text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
          {t(locale, "echo.brand")}
          <span className="mt-2 block text-[#c9bfff] sm:text-3xl lg:text-4xl">
            {t(locale, "echo.subtitle")}
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
          {t(locale, "echo.tagline")}
        </p>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/65">
          {t(locale, "echo.heroBody")}
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href="#echo-explore"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#1a1338] shadow-lg transition-transform hover:-translate-y-0.5"
          >
            {t(locale, "echo.exploreStories")}
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 rtl:rotate-180"
            />
          </a>
          <Link
            href="/stories/opportunity"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
          >
            {t(locale, "echo.startJourney")}
          </Link>
        </div>

        <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/75 backdrop-blur">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-[#35e0c8]"
          />
          {t(locale, "echo.core")}
        </p>
      </div>
    </section>
  );
}
