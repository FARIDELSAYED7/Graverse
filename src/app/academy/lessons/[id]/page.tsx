import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Lightbulb,
  Target,
  Wrench,
} from "lucide-react";
import { AcademyArtifactCard } from "@/components/academy/AcademyArtifactCard";
import { AcademySourceLinks } from "@/components/academy/play/AcademySourceLinks";
import { LessonQuiz } from "@/components/academy/LessonQuiz";
import { getArtifactsByIds } from "@/data/artifacts";
import { getLesson, lessons } from "@/data/lessons";
import { getBody } from "@/data/space/bodies";
import { ageBandMeta } from "@/types/academy";

type PageProps = { params: { id: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return lessons.map((lesson) => ({ id: lesson.id }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const lesson = getLesson(params.id);
  if (!lesson) return { title: "Lesson not found" };
  return {
    title: `${lesson.title} — Academy lesson`,
    description: lesson.summary,
  };
}

export default function LessonPage({ params }: PageProps) {
  const lesson = getLesson(params.id);
  if (!lesson) notFound();

  const band = ageBandMeta[lesson.ageBand];
  const artifacts = getArtifactsByIds(lesson.artifactIds);
  const bodies = lesson.bodyIds.map(getBody).filter((body) => Boolean(body));
  const index = lessons.findIndex((entry) => entry.id === lesson.id);
  const next = index >= 0 && index < lessons.length - 1 ? lessons[index + 1] : undefined;

  return (
    <div className="pb-16">
      <div className="container-content pt-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[#5F6B83]">
            <li>
              <Link href="/academy" className="underline-offset-4 hover:underline">
                Space Academy
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/academy/lessons" className="underline-offset-4 hover:underline">
                Lessons
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-[#14213B]">{lesson.title}</li>
          </ol>
        </nav>
      </div>

      <article className="container-content mt-6">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em]">
              <span
                className="rounded-full px-2.5 py-1"
                style={{ background: `${band.accent}22`, color: band.accent }}
              >
                {band.label}
              </span>
              <span className="rounded-full bg-[#14213B]/6 px-2.5 py-1 text-[#374151]">
                {lesson.minutes} min
              </span>
              <span className="rounded-full bg-[#14213B]/6 px-2.5 py-1 text-[#374151]">
                {lesson.quiz.length} questions
              </span>
            </div>
            <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-[#14213B] sm:text-4xl">
              {lesson.title}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-[#4B5563]">
              {lesson.summary}
            </p>

            <section className="academy-card mt-5 rounded-2xl p-5" aria-labelledby="objectives">
              <h2 id="objectives" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#9C4321]">
                <Target aria-hidden="true" className="h-4 w-4" />
                By the end you can
              </h2>
              <ul className="mt-2 space-y-1.5">
                {lesson.objectives.map((objective) => (
                  <li key={objective} className="flex items-start gap-2 text-sm leading-relaxed text-[#344054]">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: lesson.accent }}
                    />
                    {objective}
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-8 space-y-7">
              {lesson.sections.map((section) => (
                <section key={section.heading} aria-label={section.heading}>
                  <h2 className="text-xl font-semibold text-[#14213B] sm:text-2xl">
                    {section.heading}
                  </h2>
                  <div className="mt-2 space-y-3">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-relaxed text-[#344054]">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.callout ? (
                    <p className="mt-4 flex items-start gap-2 rounded-xl border-s-4 border-[#F2B33D] bg-[#F2B33D]/12 px-4 py-3 text-sm leading-relaxed text-[#6B4A05]">
                      <Lightbulb aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                      {section.callout}
                    </p>
                  ) : null}
                </section>
              ))}
            </div>

            <details className="mt-8 rounded-2xl border border-[#14213B]/10 bg-white p-5">
              <summary className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#9C4321]">
                <BookOpen aria-hidden="true" className="h-4 w-4" />
                Key words ({lesson.keyTerms.length})
                <span className="disclosure-icon ml-auto text-lg font-normal text-[#5F6B83]">
                  +
                </span>
              </summary>
              <dl className="mt-3 grid gap-2 sm:grid-cols-2">
                {lesson.keyTerms.map((term) => (
                  <div key={term.term} className="rounded-xl border border-[#14213B]/10 bg-[#FFF8EC] p-3">
                    <dt className="text-sm font-semibold text-[#14213B]">{term.term}</dt>
                    <dd className="mt-0.5 text-xs leading-relaxed text-[#46536B]">
                      {term.definition}
                    </dd>
                  </div>
                ))}
              </dl>
            </details>

            <section className="mt-6 rounded-2xl bg-[#0F766E]/10 p-5" aria-labelledby="try-it">
              <h2 id="try-it" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#0F766E]">
                <Wrench aria-hidden="true" className="h-4 w-4" />
                Try it
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#0F4F49]">{lesson.tryIt}</p>
            </section>

            <div className="mt-8">
              <LessonQuiz lesson={lesson} />
            </div>

            <nav aria-label="Lesson navigation" className="mt-8 flex flex-wrap items-center justify-between gap-3">
              <Link
                href="/academy/lessons"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#14213B] underline-offset-4 hover:underline"
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                All lessons
              </Link>
              {next ? (
                <Link
                  href={`/academy/lessons/${next.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#14213B] px-4 py-2 text-sm font-semibold text-[#FFF8EC]"
                >
                  Next: {next.title}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              ) : null}
            </nav>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-20">
            {bodies.length > 0 ? (
              <div className="academy-card rounded-2xl p-5">
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9C4321]">
                  Destinations
                </h2>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {bodies.map((body) => (
                    <li key={body!.id}>
                      <Link
                        href={`/explorer/bodies/${body!.id}`}
                        className="font-medium text-[#14213B] underline-offset-4 hover:underline"
                      >
                        {body!.name}
                      </Link>
                      <span className="text-[#5F6B83]"> — {body!.tagline}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {artifacts.length > 0 ? (
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9C4321]">
                  Real hardware in this lesson
                </h2>
                <div className="mt-3 grid gap-3">
                  {artifacts.map((artifact) => (
                    <AcademyArtifactCard key={artifact.id} artifact={artifact} />
                  ))}
                </div>
              </div>
            ) : null}

            <div className="academy-card rounded-2xl p-5">
              <AcademySourceLinks ids={lesson.sourceIds} title="Sources" />
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}
