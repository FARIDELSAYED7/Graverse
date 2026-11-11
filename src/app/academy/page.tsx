import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Bot,
  CheckCircle2,
  Compass,
  GraduationCap,
  Library,
  Sparkles,
  Star,
  Telescope,
} from "lucide-react";
import { ArticleCard } from "@/components/academy/ArticleCard";
import { JourneyCard } from "@/components/academy/JourneyCard";
import { LessonCard } from "@/components/academy/LessonCard";
import { ProgressSnapshot } from "@/components/academy/ProgressSnapshot";
import { AgeBandMetaGrid } from "@/components/academy/AgeBandMetaGrid";
import { articles } from "@/data/articles";
import { journeys } from "@/data/journeys";
import { lessons } from "@/data/lessons";
import { ageBands, ageBandMeta } from "@/types/academy";

export const metadata: Metadata = {
  title: "Space Academy — learn about real space hardware",
  description:
    "Guided space learning for ages 5–12: four journeys, twelve lessons, quizzes, a scripted robot guide and local progress. Every lesson links to source-backed museum records.",
};

export default function AcademyPage() {
  const featuredJourneys = journeys;
  const featuredLessons = lessons.filter((lesson) =>
    ["what-is-an-artifact", "reading-a-mission-timeline", "why-mars-is-red", "how-we-know-what-we-know"].includes(
      lesson.id
    )
  );
  const featuredArticles = articles.slice(0, 3);

  return (
    <div className="pb-16">
      <section className="relative overflow-hidden border-b border-[#152238]/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_-10%,rgba(255,107,90,0.22),transparent_55%),radial-gradient(ellipse_at_8%_18%,rgba(20,184,166,0.18),transparent_50%),radial-gradient(ellipse_at_52%_110%,rgba(255,201,60,0.28),transparent_58%)]"
        />
        <div className="container-content relative grid gap-10 pb-14 pt-12 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pb-20">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#FF6B5A]/30 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B4532A]">
              <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
              Space Academy · ages 5–12
            </p>
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-[#152238] sm:text-5xl lg:text-6xl">
              Big ideas about{" "}
              <span className="text-[#FF6B5A]">real space machines.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
              Follow a journey, take a short lesson, try a quiz. Every stop connects
              to a real NASA artifact in the museum, with sources you can check.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="#journeys"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-[#152238] px-6 text-sm font-semibold text-[#FFF7EA] transition-transform hover:-translate-y-0.5"
              >
                Start a journey
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                href="/academy/lessons"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-[#152238]/20 bg-white/70 px-6 text-sm font-semibold text-[#152238] hover:bg-white"
              >
                <BookOpen aria-hidden="true" className="h-4 w-4" />
                Browse lessons
              </Link>
              <Link
                href="/academy/robot-lab"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-[#152238]/20 bg-white/70 px-6 text-sm font-semibold text-[#152238] hover:bg-white"
              >
                <Bot aria-hidden="true" className="h-4 w-4" />
                Robot lab
              </Link>
            </div>
            <p className="mt-4 text-xs text-[#6B7280]">
              Twelve lessons · four journeys · no account required · progress stays
              in your browser.
            </p>
          </div>

          <div className="academy-card relative overflow-hidden rounded-3xl p-5 sm:p-6">
            <div
              aria-hidden="true"
              className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-[#FFC93C]/35 blur-2xl"
            />
            <div className="relative flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B4532A]">
                  Your progress
                </p>
                <p className="mt-1 text-lg font-semibold text-[#152238]">
                  Saved on this device
                </p>
              </div>
              <GraduationCap aria-hidden="true" className="h-9 w-9 text-[#152238]/25" />
            </div>
            <ProgressSnapshot />
            <div className="mt-5 grid grid-cols-2 gap-2">
              <Link
                href="/academy/progress"
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#152238] px-3 text-xs font-semibold text-[#FFF7EA]"
              >
                View progress
              </Link>
              <Link
                href="/academy/glossary"
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full border border-[#152238]/15 px-3 text-xs font-semibold text-[#152238] hover:bg-[#152238]/5"
              >
                Word lab
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-content pt-12" aria-labelledby="ages-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B4532A]">
              Choose a level
            </p>
            <h2 id="ages-heading" className="mt-1 text-2xl font-semibold text-[#152238] sm:text-3xl">
              Three ages, three ways in
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#5A6472]">
            The same verified records, written for different reading levels. Younger
            explorers get shorter steps and more picture-led explanations.
          </p>
        </div>
        <AgeBandMetaGrid bands={ageBands} meta={ageBandMeta} />
      </section>

      <section id="journeys" className="container-content scroll-mt-24 pt-14" aria-labelledby="journeys-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B4532A]">
              Learning journeys
            </p>
            <h2 id="journeys-heading" className="mt-1 text-2xl font-semibold text-[#152238] sm:text-3xl">
              A route, not a pile of pages
            </h2>
          </div>
          <Link
            href="/academy/journeys"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#152238] underline-offset-4 hover:underline"
          >
            All journeys
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {featuredJourneys.map((journey) => (
            <JourneyCard key={journey.id} journey={journey} />
          ))}
        </div>
      </section>

      <section className="container-content pt-14" aria-labelledby="lessons-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B4532A]">
              Lesson library
            </p>
            <h2 id="lessons-heading" className="mt-1 text-2xl font-semibold text-[#152238] sm:text-3xl">
              Start anywhere
            </h2>
          </div>
          <Link
            href="/academy/lessons"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#152238] underline-offset-4 hover:underline"
          >
            All {lessons.length} lessons
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </section>

      <section className="container-content pt-14" aria-labelledby="robot-heading">
        <div className="rounded-3xl bg-[#152238] p-6 text-[#F4F7FC] sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FFC93C]">
                <Bot aria-hidden="true" className="h-3.5 w-3.5" />
                Robot lab
              </p>
              <h2 id="robot-heading" className="mt-2 text-2xl font-semibold sm:text-3xl">
                Ask a scripted robot guide about any artifact
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#C7D2E4]">
                Thirty artifact guides, each built from the museum record. The robot
                is not an AI and does not invent answers: it matches your question to
                a fixed, source-linked answer. Every reply shows where it came from.
              </p>
              <ul className="mt-4 grid gap-2 text-sm text-[#C7D2E4] sm:grid-cols-2">
                {[
                  "Works without a network or a model API",
                  "Optional read-aloud with the browser voice",
                  "Shows the artifact's mission and hardware status",
                  "Answers only from the verified record",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 text-[#14B8A6]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/academy/robot-lab"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#FFC93C] px-6 text-sm font-semibold text-[#152238] hover:bg-[#FFD966]"
            >
              <Bot aria-hidden="true" className="h-4 w-4" />
              Open robot lab
            </Link>
          </div>
        </div>
      </section>

      <section className="container-content pt-14" aria-labelledby="articles-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B4532A]">
              Explainers
            </p>
            <h2 id="articles-heading" className="mt-1 text-2xl font-semibold text-[#152238] sm:text-3xl">
              The story behind the record
            </h2>
          </div>
          <Link
            href="/academy/articles"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#152238] underline-offset-4 hover:underline"
          >
            All articles
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      <section className="container-content pt-14">
        <div className="grid gap-3 sm:grid-cols-3">
          <Link href="/museum" className="academy-card group rounded-2xl p-5">
            <Telescope aria-hidden="true" className="h-6 w-6 text-[#A78BFA]" />
            <p className="mt-3 text-lg font-semibold text-[#152238]">Visit the museum</p>
            <p className="mt-1 text-sm text-[#5A6472]">
              The full artifact record, sources and fate for every object.
            </p>
          </Link>
          <Link href="/explorer" className="academy-card group rounded-2xl p-5">
            <Compass aria-hidden="true" className="h-6 w-6 text-[#43B9FF]" />
            <p className="mt-3 text-lg font-semibold text-[#152238]">Open the explorer</p>
            <p className="mt-1 text-sm text-[#5A6472]">
              Filter the timeline or move through the solar system.
            </p>
          </Link>
          <Link href="/academy/glossary" className="academy-card group rounded-2xl p-5">
            <Library aria-hidden="true" className="h-6 w-6 text-[#14B8A6]" />
            <p className="mt-3 text-lg font-semibold text-[#152238]">Use the word lab</p>
            <p className="mt-1 text-sm text-[#5A6472]">
              Forty plain-language definitions, from aphelion to telemetry.
            </p>
          </Link>
        </div>
      </section>

      <section className="container-content pt-14" aria-label="Academy principles">
        <div className="rounded-2xl border border-[#152238]/10 bg-white/70 p-5">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#B4532A]">
            <Star aria-hidden="true" className="h-3.5 w-3.5" />
            How the Academy works
          </p>
          <div className="mt-3 grid gap-4 text-sm leading-relaxed text-[#4B5563] md:grid-cols-3">
            <p>
              <strong className="text-[#152238]">Verified, not invented.</strong>{" "}
              Lessons reuse the same source-linked records as the museum. They add
              explanation, not new facts.
            </p>
            <p>
              <strong className="text-[#152238]">Progress without accounts.</strong>{" "}
              Lesson scores and journey steps stay in local storage and can be
              exported, imported or reset.
            </p>
            <p>
              <strong className="text-[#152238]">Honest about uncertainty.</strong>{" "}
              Where the record is incomplete, the lesson says so instead of filling
              the gap.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
