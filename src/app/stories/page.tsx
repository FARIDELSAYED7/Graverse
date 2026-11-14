import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookMarked, Compass } from "lucide-react";
import { EchoesHero } from "@/components/stories/EchoesHero";
import { StoriesIndex } from "@/components/stories/StoriesIndex";
import { SourcesExplorer } from "@/components/stories/SourcesExplorer";
import { MeetEcho } from "@/components/stories/MeetEcho";
import { storyCollections } from "@/data/stories";
import { echoStories, echoTagLabels } from "@/data/echoes";
import { toStorySummary } from "@/data/echoes/summary";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import { pick } from "@/lib/echo/localized";

export const metadata: Metadata = {
  title: "ECHOES — Stories Beyond Earth",
  description:
    "An interactive storytelling experience about the machines NASA left on the Moon and Mars. Real NASA photography, a 3D robot companion, bilingual narration and chapter by chapter discoveries.",
};

export default function StoriesPage() {
  const locale = getLocale();
  const featured = echoStories[0];
  const summaries = echoStories
    .slice(1)
    .map(toStorySummary);

  return (
    <div className="pb-20">
      {/* 1 — Hero ---------------------------------------------------------- */}
      <EchoesHero locale={locale} image={featured.hero} />

      {/* 2 — Featured story -------------------------------------------------- */}
      <section className="container-content pt-12" aria-labelledby="echo-featured-heading">
        <div className="echo-card group grid overflow-hidden rounded-3xl lg:grid-cols-2">
          <div className="relative min-h-[19rem] overflow-hidden lg:min-h-full">
            <img
              src={featured.hero.src}
              alt={pick(locale, featured.hero.alt)}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#150f36]/55 to-transparent"
            />
            <div className="absolute start-4 top-4 flex items-center gap-1.5 rounded-full bg-[#150f36]/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-lg backdrop-blur-sm">
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: featured.accent }}
              />
              {pick(locale, featured.equipmentType)}
            </div>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-10">
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#5b3fe0]">
              {t(locale, "echo.featured")}
            </p>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6b6484]">
              {pick(locale, featured.location)}
            </p>
            <h2
              id="echo-featured-heading"
              className="mt-1 text-balance text-3xl font-semibold leading-tight tracking-tight text-[#1a1338] sm:text-4xl"
            >
              <Link href={`/stories/${featured.slug}`} className="hover:text-[#5b3fe0]">
                {pick(locale, featured.storyTitle)}
              </Link>
            </h2>
            <p className="mt-3 text-lg font-medium leading-snug text-[#4a4266]">
              {pick(locale, featured.dek)}
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-[#6b6484]">
              {pick(locale, featured.summary)}
            </p>

            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#6b6484]">
              <li>
                {featured.chapters.length} {t(locale, "echo.chapters")}
              </li>
              <li>
                {featured.chapters.reduce(
                  (total, chapter) => total + (chapter.discoveries?.length ?? 0),
                  0
                )}{" "}
                {t(locale, "echo.discoveries")}
              </li>
              <li>
                {featured.gallery.length + 1} {t(locale, "echo.photos")}
              </li>
            </ul>

            <Link
              href={`/stories/${featured.slug}`}
              className="mt-7 inline-flex h-12 w-fit items-center gap-2 rounded-full bg-[#5b3fe0] px-6 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#4a30c4]"
            >
              {t(locale, "echo.startJourney")}
              <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3 — Explore stories --------------------------------------------------- */}
      <section
        id="echo-explore"
        className="container-content scroll-mt-24 pt-16"
        aria-labelledby="echo-all-heading"
      >
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#5b3fe0]">
            <Compass aria-hidden="true" className="h-3.5 w-3.5" />
            {t(locale, "echo.exploreStories")}
          </p>
          <h2
            id="echo-all-heading"
            className="mt-1 text-balance text-2xl font-semibold tracking-tight text-[#1a1338] sm:text-3xl"
          >
            {t(locale, "echo.pickStory")}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#4a4266]">
            {t(locale, "echo.exploreIntro")}
          </p>
        </div>

        <div className="mt-6">
          <StoriesIndex
            stories={summaries}
            locale={locale}
            tagLabels={echoTagLabels}
          />
        </div>
      </section>

      {/* 4 — Curated reading paths --------------------------------------------- */}
      <section className="container-content pt-16" aria-labelledby="echo-paths-heading">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#5b3fe0]">
            <BookMarked aria-hidden="true" className="h-3.5 w-3.5" />
            {t(locale, "echo.readingPaths")}
          </p>
          <h2
            id="echo-paths-heading"
            className="mt-1 text-balance text-2xl font-semibold tracking-tight text-[#1a1338] sm:text-3xl"
          >
            {t(locale, "echo.collection")}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#4a4266]">
            {t(locale, "echo.readingPathsBody")}
          </p>
        </div>

        <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {storyCollections.map((collection) => (
            <li key={collection.id}>
              <Link
                href={`/stories/${collection.id}`}
                className="echo-card group flex h-full flex-col rounded-2xl p-4 transition-transform hover:-translate-y-0.5"
                style={{ borderTop: `3px solid ${collection.accent}` }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#6b6484]">
                  {collection.eyebrow}
                </p>
                <p className="mt-1 flex-1 text-base font-semibold leading-snug text-[#1a1338]">
                  {collection.title}
                </p>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#6b6484]">
                  {collection.dek}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#5b3fe0]">
                  {collection.sections.length} sections
                  <ArrowRight
                    aria-hidden="true"
                    className="h-3 w-3 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 5 — Meet ECHO ----------------------------------------------------------- */}
      <div className="pt-16">
        <MeetEcho locale={locale} intro={featured.echoIntro} />
      </div>

      {/* 6 — NASA resources ------------------------------------------------------- */}
      <div className="pt-14">
        <SourcesExplorer locale={locale} />
      </div>

      <section className="container-content pt-10">
        <p className="rounded-2xl border border-[#1a1338]/10 bg-white/60 p-4 text-xs leading-relaxed text-[#6b6484]">
          {t(locale, "echo.sourceNote")}
        </p>
      </section>
    </div>
  );
}
