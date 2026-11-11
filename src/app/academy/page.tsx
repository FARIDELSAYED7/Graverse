import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Bot,
  CheckCircle2,
  Compass,
  Gamepad2,
  GraduationCap,
  Library,
  Sparkles,
  Telescope,
} from "lucide-react";
import { ArticleCard } from "@/components/academy/ArticleCard";
import { JourneyCard } from "@/components/academy/JourneyCard";
import { LessonCard } from "@/components/academy/LessonCard";
import { ProgressSnapshot } from "@/components/academy/ProgressSnapshot";
import { AgeBandMetaGrid } from "@/components/academy/AgeBandMetaGrid";
import { PlayGameGrid } from "@/components/academy/play/PlayGameGrid";
import { articles } from "@/data/articles";
import { playGames } from "@/data/games";
import { journeys } from "@/data/journeys";
import { lessons } from "@/data/lessons";
import { ageBands, ageBandMeta } from "@/types/academy";

export const metadata: Metadata = {
  title: "Space Academy — learn and play with real space hardware",
  description:
    "Guided space learning for ages 5–12: four journeys, twelve lessons, quizzes, three 3D playground games, a scripted robot guide and local progress. Every lesson links to source-backed museum records.",
};

const featuredLessons = lessons.filter((lesson) =>
  [
    "what-is-an-artifact",
    "reading-a-mission-timeline",
    "why-mars-is-red",
    "how-we-know-what-we-know",
  ].includes(lesson.id)
);

export default function AcademyPage() {
  return (
    <div className="pb-16">
      <section className="border-b border-[#14213B]/10">
        <div className="container-content grid gap-8 pb-10 pt-10 sm:pt-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:pb-12">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#9C4321]/30 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9C4321]">
              <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
              Space Academy · ages 5–12
            </p>
            <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-[#14213B] sm:text-5xl lg:text-6xl">
              Learn space by{" "}
              <span className="text-accent">playing.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#46536B] sm:text-lg">
              Build a rocket, match Moon phases or drive a rover. Then read the
              short lesson behind it.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/academy/play"
                className="btn-primary inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold transition-transform hover:-translate-y-0.5"
              >
                <Gamepad2 aria-hidden="true" className="h-4 w-4" />
                Play in 3D
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                href="/academy/lessons"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-[#14213B] px-6 text-sm font-semibold text-[#FFF8EC] transition-transform hover:-translate-y-0.5"
              >
                <BookOpen aria-hidden="true" className="h-4 w-4" />
                Browse lessons
              </Link>
            </div>
            <p className="mt-3 text-xs text-[#5F6B83]">
              3 games · 12 lessons · 4 journeys · no account needed
            </p>
          </div>

          <div className="academy-card relative overflow-hidden rounded-3xl p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9C4321]">
                  Your progress
                </p>
                <p className="mt-1 text-lg font-semibold text-[#14213B]">
                  Saved on this device
                </p>
              </div>
              <GraduationCap aria-hidden="true" className="h-9 w-9 text-[#14213B]/20" />
            </div>
            <ProgressSnapshot />
            <Link
              href="/academy/progress"
              className="mt-5 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-full bg-[#14213B] px-3 text-xs font-semibold text-[#FFF8EC]"
            >
              View my progress
            </Link>
          </div>
        </div>
      </section>

      <section className="container-content pt-10" aria-labelledby="play-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9C4321]">
              <Gamepad2 aria-hidden="true" className="h-3.5 w-3.5" />
              Space Playground
            </p>
            <h2 id="play-heading" className="mt-1 text-2xl font-semibold text-[#14213B] sm:text-3xl">
              Pick a game
            </h2>
          </div>
          <Link
            href="/academy/play"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#14213B] underline-offset-4 hover:underline"
          >
            Open the playground
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <PlayGameGrid games={playGames} />
      </section>

      <section className="container-content pt-12" aria-labelledby="ages-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9C4321]">
              Choose a level
            </p>
            <h2 id="ages-heading" className="mt-1 text-2xl font-semibold text-[#14213B] sm:text-3xl">
              Three ages, three ways in
            </h2>
          </div>
        </div>
        <AgeBandMetaGrid bands={ageBands} meta={ageBandMeta} />
      </section>

      <section id="journeys" className="container-content scroll-mt-24 pt-12" aria-labelledby="journeys-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9C4321]">
              Learning journeys
            </p>
            <h2 id="journeys-heading" className="mt-1 text-2xl font-semibold text-[#14213B] sm:text-3xl">
              A route, not a pile of pages
            </h2>
          </div>
          <Link
            href="/academy/journeys"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#14213B] underline-offset-4 hover:underline"
          >
            All journeys
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {journeys.map((journey) => (
            <JourneyCard key={journey.id} journey={journey} />
          ))}
        </div>
      </section>

      <section className="container-content pt-12" aria-labelledby="lessons-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9C4321]">
              Lesson library
            </p>
            <h2 id="lessons-heading" className="mt-1 text-2xl font-semibold text-[#14213B] sm:text-3xl">
              Start anywhere
            </h2>
          </div>
          <Link
            href="/academy/lessons"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#14213B] underline-offset-4 hover:underline"
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

      <section className="container-content pt-12" aria-labelledby="robot-heading">
        <div className="rounded-3xl bg-[#14213B] p-6 text-[#FFF8EC] sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F2B33D]">
                <Bot aria-hidden="true" className="h-3.5 w-3.5" />
                Robot lab
              </p>
              <h2 id="robot-heading" className="mt-2 text-2xl font-semibold sm:text-3xl">
                Ask a robot about a real machine
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#C9D3E3]">
                The robot gives fixed answers from the museum record. It is not AI
                and it will say when it does not know.
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#C9D3E3]">
                {["Works offline", "Can read aloud", "Shows its source"].map((item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5 text-[#5EEAD4]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/academy/robot-lab"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#F2B33D] px-6 text-sm font-semibold text-[#14213B] hover:bg-[#FBBF24]"
            >
              <Bot aria-hidden="true" className="h-4 w-4" />
              Open robot lab
            </Link>
          </div>
        </div>
      </section>

      <section className="container-content pt-12" aria-labelledby="more-heading">
        <h2 id="more-heading" className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9C4321]">
          More to explore
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/academy/glossary" className="academy-card group rounded-2xl p-4">
            <Library aria-hidden="true" className="h-5 w-5 text-[#0F766E]" />
            <p className="mt-2 text-base font-semibold text-[#14213B]">Word lab</p>
            <p className="mt-0.5 text-xs text-[#5F6B83]">40 space words, explained simply.</p>
          </Link>
          <Link href="/academy/articles" className="academy-card group rounded-2xl p-4">
            <BookOpen aria-hidden="true" className="h-5 w-5 text-[#9C4321]" />
            <p className="mt-2 text-base font-semibold text-[#14213B]">Explainers</p>
            <p className="mt-0.5 text-xs text-[#5F6B83]">Short reads about real missions.</p>
          </Link>
          <Link href="/museum" className="academy-card group rounded-2xl p-4">
            <Telescope aria-hidden="true" className="h-5 w-5 text-[#3E5C8A]" />
            <p className="mt-2 text-base font-semibold text-[#14213B]">Museum</p>
            <p className="mt-0.5 text-xs text-[#5F6B83]">Every artifact, source and fate.</p>
          </Link>
          <Link href="/explorer" className="academy-card group rounded-2xl p-4">
            <Compass aria-hidden="true" className="h-5 w-5 text-[#8A5A00]" />
            <p className="mt-2 text-base font-semibold text-[#14213B]">Explorer</p>
            <p className="mt-0.5 text-xs text-[#5F6B83]">Timeline and solar system maps.</p>
          </Link>
        </div>
      </section>

      <section className="container-content pt-10" aria-labelledby="articles-heading">
        <h2 id="articles-heading" className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9C4321]">
          Read next
        </h2>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      <section className="container-content pt-10" aria-label="Academy principles">
        <details className="rounded-2xl border border-[#14213B]/10 bg-white p-5">
          <summary className="flex items-center gap-2 text-sm font-semibold text-[#14213B]">
            <Sparkles aria-hidden="true" className="h-4 w-4 text-[#9C4321]" />
            How the Academy works
          </summary>
          <div className="mt-3 grid gap-3 text-sm leading-relaxed text-[#46536B] md:grid-cols-3">
            <p>Lessons reuse the same source-linked records as the museum.</p>
            <p>Progress stays in this browser. No account, no cloud.</p>
            <p>When the evidence is incomplete, the lesson says so.</p>
          </div>
        </details>
      </section>
    </div>
  );
}
