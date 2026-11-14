"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  ChevronDown,
  Database,
  ExternalLink,
  Globe2,
  Navigation,
  Orbit,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import {
  PRIMARY_CHALLENGE_RESOURCES,
  SUPPORTING_RESEARCH_RESOURCES,
  type ChallengeCategoryFilter,
} from "./ChallengeResourcesNavigator";

/**
 * Explore the Sources.
 *
 * The NASA resource archive is supporting research material, not the point
 * of the page, so it lives in one compact, collapsed section near the end.
 * Every primary challenge resource and every supporting reference is kept —
 * titles, descriptions and the verified original URLs — with primary and
 * supporting clearly distinguished.
 */
export function SourcesExplorer({ locale }: { locale: Locale }) {
  const [filter, setFilter] = useState<ChallengeCategoryFilter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return PRIMARY_CHALLENGE_RESOURCES;
    return PRIMARY_CHALLENGE_RESOURCES.filter(
      (item) => item.category === filter
    );
  }, [filter]);

  const filters: { key: ChallengeCategoryFilter; label: string }[] = [
    { key: "all", label: locale === "ar" ? "الكل (14)" : "All 14" },
    { key: "nasa-data", label: locale === "ar" ? "أرشيف ناسا" : "NASA Archive" },
    { key: "moon", label: locale === "ar" ? "القمر" : "The Moon" },
    {
      key: "mars-deep-space",
      label: locale === "ar" ? "المريخ والفضاء العميق" : "Mars & Deep Space",
    },
  ];

  return (
    <section
      id="echo-sources"
      className="container-content scroll-mt-24"
      aria-labelledby="echo-sources-heading"
    >
      <details className="echo-card group rounded-3xl">
        <summary className="flex cursor-pointer flex-wrap items-center justify-between gap-3 p-5 sm:p-7">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#5b3fe0]">
              <BookOpen aria-hidden="true" className="h-3.5 w-3.5" />
              NASA Space Apps Challenge · Primary Resources
            </p>
            <h2
              id="echo-sources-heading"
              className="mt-1 text-balance text-2xl font-semibold tracking-tight text-[#1a1338] sm:text-3xl"
            >
              {t(locale, "echo.sourcesTitle")}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#4a4266]">
              {t(locale, "echo.sourcesIntro")}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#1a1338]/15 bg-white text-[#5b3fe0] transition-transform group-open:rotate-180"
          >
            <ChevronDown className="h-4 w-4" />
          </span>
        </summary>

        <div className="border-t border-[#1a1338]/10 p-5 sm:p-7">
          {/* Primary resources ------------------------------------------------ */}
          <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[#1a1338]">
            {t(locale, "echo.primaryResources")}
            <span className="ms-2 font-mono text-xs font-normal text-[#6b6484]">
              {PRIMARY_CHALLENGE_RESOURCES.length}
            </span>
          </h3>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {filters.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setFilter(tab.key)}
                aria-pressed={filter === tab.key}
                className={`rounded-full px-3.5 py-1.5 font-medium transition-colors ${
                  filter === tab.key
                    ? "bg-[#5b3fe0] text-white"
                    : "bg-[#150f36]/5 text-[#4a4266] hover:bg-[#150f36]/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <ol className="mt-5 divide-y divide-[#1a1338]/8 rounded-2xl border border-[#1a1338]/10 bg-white/70">
            {filtered.map((item) => {
              const isArchive = item.disposition.type === "archive";
              const isOrbit = item.disposition.type === "orbit";
              const isDeepSpace = item.disposition.type === "deep-space";
              return (
                <li key={item.id} className="p-4 sm:p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex min-w-0 items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 rounded bg-[#5b3fe0]/10 px-2 py-0.5 font-mono text-xs font-bold text-[#5b3fe0]"
                      >
                        #{String(item.number).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <a
                          href={item.nasaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold leading-snug text-[#1a1338] hover:text-[#5b3fe0]"
                        >
                          {item.title[locale]}
                          <ExternalLink
                            aria-hidden="true"
                            className="ms-1.5 inline h-3 w-3 text-[#6b6484]"
                          />
                        </a>
                        <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-[#6b6484]">
                          <span>{item.organization}</span>
                          <span aria-hidden="true">·</span>
                          <span className="inline-flex items-center gap-1 text-[#4a4266]">
                            {isArchive ? (
                              <Database
                                aria-hidden="true"
                                className="h-3 w-3"
                              />
                            ) : isOrbit ? (
                              <Orbit aria-hidden="true" className="h-3 w-3" />
                            ) : isDeepSpace ? (
                              <Navigation
                                aria-hidden="true"
                                className="h-3 w-3"
                              />
                            ) : (
                              <Globe2 aria-hidden="true" className="h-3 w-3" />
                            )}
                            {item.destination[locale]}
                          </span>
                          <span
                            aria-hidden="true"
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                              isArchive
                                ? "bg-amber-500/15 text-amber-900"
                                : isOrbit
                                  ? "bg-purple-500/15 text-purple-900"
                                  : isDeepSpace
                                    ? "bg-cyan-500/15 text-cyan-900"
                                    : "bg-emerald-500/15 text-emerald-900"
                            }`}
                          >
                            {item.disposition[locale]}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="mt-2 max-w-3xl text-xs leading-relaxed text-[#4a4266]">
                    {item.summary[locale]}
                  </p>

                  {item.stories.length > 0 ? (
                    <div className="mt-2.5 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-semibold text-[#6b6484]">
                        {locale === "ar" ? "القصص المرتبطة:" : "Related stories:"}
                      </span>
                      {item.stories.map((story) => (
                        <Link
                          key={story.slug}
                          href={`/stories/${story.slug}`}
                          className="inline-flex items-center gap-1 rounded-full bg-[#5b3fe0]/10 px-3 py-1 text-[11px] font-semibold text-[#5b3fe0] transition-colors hover:bg-[#5b3fe0] hover:text-white"
                        >
                          <BookOpen aria-hidden="true" className="h-3 w-3" />
                          {story.title[locale]}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2.5 text-[11px] font-medium text-[#6b6484]">
                      {t(locale, "echo.masterIndex")}
                    </p>
                  )}
                </li>
              );
            })}
          </ol>

          {/* Supporting research ---------------------------------------------- */}
          <h3 className="mt-8 text-sm font-bold uppercase tracking-[0.16em] text-[#1a1338]">
            {t(locale, "echo.supportingResources")}
            <span className="ms-2 font-mono text-xs font-normal text-[#6b6484]">
              {SUPPORTING_RESEARCH_RESOURCES.length}
            </span>
          </h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SUPPORTING_RESEARCH_RESOURCES.map((supp) => (
              <li
                key={supp.id}
                className="rounded-2xl border border-[#1a1338]/10 bg-[#f6f1e6]/70 p-4"
              >
                <a
                  href={supp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold leading-snug text-[#1a1338] hover:text-[#5b3fe0]"
                >
                  {supp.title[locale]}
                  <ExternalLink
                    aria-hidden="true"
                    className="ms-1.5 inline h-3 w-3 text-[#6b6484]"
                  />
                </a>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-[#6b6484]">
                  {supp.organization}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-[#4a4266]">
                  {supp.summary[locale]}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-6 rounded-2xl bg-[#150f36]/5 p-4 text-xs leading-relaxed text-[#4a4266]">
            {t(locale, "echo.sourcesHint")}
          </p>
        </div>
      </details>
    </section>
  );
}
