import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Clock,
  Gamepad2,
  Puzzle,
  Users,
} from "lucide-react";
import { AcademyArtifactCard } from "@/components/academy/AcademyArtifactCard";
import { getArtifactsByIds } from "@/data/artifacts";
import { getLesson } from "@/data/lessons";
import { getBody } from "@/data/space/bodies";
import type { CelestialBody } from "@/types/space";
import type { PlayGame } from "@/types/play";
import { AcademySourceLinks } from "./AcademySourceLinks";

/**
 * Shared server shell for a playground game: breadcrumb, hero, the interactive
 * game, then links back to the verified lesson, artifacts, bodies and sources.
 */
export function GamePageLayout({
  game,
  children,
}: {
  game: PlayGame;
  children: ReactNode;
}) {
  const lesson = getLesson(game.lessonId);
  const artifacts = getArtifactsByIds(game.artifactIds);
  const bodies = game.bodyIds
    .map(getBody)
    .filter((body): body is CelestialBody => Boolean(body));

  return (
    <div className="pb-16">
      <section className="relative overflow-hidden border-b border-[#152238]/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 82% -12%, ${game.accent}33, transparent 55%), radial-gradient(ellipse at 6% 110%, ${game.accent}22, transparent 52%)`,
          }}
        />
        <div className="container-content relative py-9 sm:py-12">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[#6B7280]">
              <li>
                <Link href="/academy" className="underline-offset-4 hover:underline">
                  Space Academy
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/academy/play" className="underline-offset-4 hover:underline">
                  Space Playground
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[#152238]">{game.title}</li>
            </ol>
          </nav>

          <div className="mt-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em]">
              <span
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1"
                style={{ background: `${game.accent}1f`, color: game.accent }}
              >
                <Gamepad2 aria-hidden="true" className="h-3 w-3" />
                3D game
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#152238]/6 px-2.5 py-1 text-[#374151]">
                <Users aria-hidden="true" className="h-3 w-3" />
                Ages {game.ages.join(", ")}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#152238]/6 px-2.5 py-1 text-[#374151]">
                <Clock aria-hidden="true" className="h-3 w-3" />
                About {game.minutes} min
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#FFC93C]/20 px-2.5 py-1 text-[#7C4A03]">
                <Award aria-hidden="true" className="h-3 w-3" />
                {game.badge.name}
              </span>
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#152238] sm:text-5xl">
              {game.title}
            </h1>
            <p className="mt-2 text-lg font-semibold" style={{ color: game.accent }}>
              {game.tagline}
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#4B5563] sm:text-base">
              {game.description}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-1.5 text-[10px] font-semibold">
            {game.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 rounded-full border border-[#152238]/10 bg-white/70 px-2.5 py-1 text-[#374151]"
              >
                <Puzzle aria-hidden="true" className="h-3 w-3" />
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="container-content pt-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Link
            href="/academy/play"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#152238] underline-offset-4 hover:underline"
          >
            <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
            All playground games
          </Link>
          <p className="text-[11px] font-medium text-[#6B7280]">
            Keyboard, touch and a no-3D fallback are built in.
          </p>
        </div>

        <div className="mt-5">{children}</div>

        <section className="mt-12" aria-labelledby="real-records-heading">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B4532A]">
              Back to the real record
            </p>
            <h2
              id="real-records-heading"
              className="mt-1 text-2xl font-semibold text-[#152238] sm:text-3xl"
            >
              The game is a toy. The mission is real.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#5A6472]">
              {game.toyNote} Everything below is the same source-linked material
              used by the museum and the Academy lessons.
            </p>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-start">
            <div className="space-y-6">
              {lesson ? (
                <Link
                  href={`/academy/lessons/${lesson.id}`}
                  className="academy-card group flex items-start justify-between gap-4 rounded-2xl p-5"
                >
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#B4532A]">
                      Linked lesson
                    </p>
                    <p className="mt-1 text-lg font-semibold text-[#152238]">
                      {lesson.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-[#5A6472]">
                      {lesson.summary}
                    </p>
                  </div>
                  <ArrowRight
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 shrink-0 text-[#152238]/40 transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              ) : null}

              {bodies.length > 0 ? (
                <div className="academy-card rounded-2xl p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#B4532A]">
                    Destinations
                  </h3>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    {bodies.map((body) => (
                      <li key={body.id}>
                        <Link
                          href={`/explorer/bodies/${body.id}`}
                          className="font-medium text-[#152238] underline-offset-4 hover:underline"
                        >
                          {body.name}
                        </Link>
                        <span className="text-[#6B7280]"> — {body.tagline}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {artifacts.length > 0 ? (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#B4532A]">
                    Real hardware linked from this game
                  </h3>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {artifacts.map((artifact) => (
                      <AcademyArtifactCard key={artifact.id} artifact={artifact} />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <AcademySourceLinks ids={game.sourceIds} />
          </div>
        </section>
      </div>
    </div>
  );
}
