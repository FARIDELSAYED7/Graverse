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
      <section className="border-b border-[#14213B]/10 bg-white/60">
        <div className="container-content py-7 sm:py-9">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[#5F6B83]">
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
              <li className="text-[#14213B]">{game.title}</li>
            </ol>
          </nav>

          <div className="mt-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em]">
              <span
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1"
                style={{ background: `${game.accent}1f`, color: game.accent }}
              >
                <Gamepad2 aria-hidden="true" className="h-3 w-3" />
                3D game
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#14213B]/6 px-2.5 py-1 text-[#374151]">
                <Users aria-hidden="true" className="h-3 w-3" />
                Ages {game.ages.join(", ")}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#14213B]/6 px-2.5 py-1 text-[#374151]">
                <Clock aria-hidden="true" className="h-3 w-3" />
                About {game.minutes} min
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#F2B33D]/20 px-2.5 py-1 text-[#8A5A00]">
                <Award aria-hidden="true" className="h-3 w-3" />
                {game.badge.name}
              </span>
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#14213B] sm:text-4xl lg:text-5xl">
              {game.title}
            </h1>
            <p className="mt-2 text-base font-semibold" style={{ color: game.accent }}>
              {game.tagline}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5 text-[10px] font-semibold">
            {game.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 rounded-full border border-[#14213B]/10 bg-white px-2.5 py-1 text-[#374151]"
              >
                <Puzzle aria-hidden="true" className="h-3 w-3" />
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="container-content pt-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Link
            href="/academy/play"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14213B] underline-offset-4 hover:underline"
          >
            <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
            All playground games
          </Link>
          <p className="text-[11px] font-medium text-[#5F6B83]">
            Keyboard, touch and a no-3D fallback are built in.
          </p>
        </div>

        <div className="mt-4">{children}</div>

        <section className="mt-12" aria-labelledby="real-records-heading">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9C4321]">
              Back to the real record
            </p>
            <h2
              id="real-records-heading"
              className="mt-1 text-2xl font-semibold text-[#14213B] sm:text-3xl"
            >
              The game is a toy. The mission is real.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#46536B]">
              {game.toyNote}
            </p>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-start">
            <div className="space-y-5">
              {lesson ? (
                <Link
                  href={`/academy/lessons/${lesson.id}`}
                  className="academy-card group flex items-start justify-between gap-4 rounded-2xl p-5"
                >
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9C4321]">
                      Linked lesson
                    </p>
                    <p className="mt-1 text-lg font-semibold text-[#14213B]">
                      {lesson.title}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[#46536B]">
                      {lesson.summary}
                    </p>
                  </div>
                  <ArrowRight
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 shrink-0 text-[#14213B]/40 transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              ) : null}

              {bodies.length > 0 ? (
                <div className="academy-card rounded-2xl p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9C4321]">
                    Destinations
                  </h3>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    {bodies.map((body) => (
                      <li key={body.id}>
                        <Link
                          href={`/explorer/bodies/${body.id}`}
                          className="font-medium text-[#14213B] underline-offset-4 hover:underline"
                        >
                          {body.name}
                        </Link>
                        <span className="text-[#5F6B83]"> — {body.tagline}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {artifacts.length > 0 ? (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9C4321]">
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
