import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Gamepad2,
  HelpCircle,
  Keyboard,
  MonitorPlay,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PlayBadgeShelf } from "@/components/academy/play/PlayBadgeShelf";
import { PlayGameGrid } from "@/components/academy/play/PlayGameGrid";
import { playGames } from "@/data/games";
import { lessons } from "@/data/lessons";

export const metadata: Metadata = {
  title: "Space Playground — 3D games for kids",
  description:
    "Three playful 3D space games for ages 5–12: build a toy rocket, match Moon phases and drive a toy rover. Keyboard, touch and no-3D fallbacks included. Progress stays on this device.",
};

const promises = [
  {
    icon: MonitorPlay,
    title: "Simple 3D toys",
    text: "Spin the model and change its parts. Everything is built from simple shapes.",
  },
  {
    icon: Keyboard,
    title: "Keyboard or touch",
    text: "Every game has buttons, not just a canvas, plus arrow-key controls.",
  },
  {
    icon: ShieldCheck,
    title: "No account needed",
    text: "Badges and best scores stay in this browser. Nothing is uploaded.",
  },
];

export default function PlaygroundPage() {
  const linkedLessons = [...new Set(playGames.map((game) => game.lessonId))]
    .map((id) => lessons.find((lesson) => lesson.id === id))
    .filter((lesson): lesson is (typeof lessons)[number] => Boolean(lesson));

  return (
    <div className="pb-16">
      <section className="border-b border-[#14213B]/10 bg-white/60">
        <div className="container-content py-9 sm:py-12">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#9C4321]/30 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9C4321]">
            <Gamepad2 aria-hidden="true" className="h-3.5 w-3.5" />
            Space Playground · ages 5–12
          </p>
          <div className="mt-4 max-w-2xl">
            <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-[#14213B] sm:text-5xl">
              Pick a game. <span className="text-accent">Play in 3D.</span>
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-[#46536B] sm:text-lg">
              Build a rocket, match Moon phases or drive a rover. Each game takes a
              few minutes and earns a badge.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="#games"
                className="btn-primary inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
              >
                <Sparkles aria-hidden="true" className="h-4 w-4" />
                Pick a game
              </Link>
              <Link
                href="/academy/lessons"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-[#14213B]/15 bg-white px-5 text-sm font-semibold text-[#14213B] hover:bg-[#14213B]/5"
              >
                Browse the lessons
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        id="games"
        className="container-content scroll-mt-24 pt-9"
        aria-labelledby="games-heading"
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9C4321]">
              Choose a game
            </p>
            <h2
              id="games-heading"
              className="mt-1 text-2xl font-semibold text-[#14213B] sm:text-3xl"
            >
              Three ways to play
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#46536B]">
            Start anywhere. Each game saves its own badge and best score.
          </p>
        </div>
        <PlayGameGrid games={playGames} />
      </section>

      <section className="container-content pt-8" aria-labelledby="shelf-heading">
        <h2 id="shelf-heading" className="sr-only">
          Playground badge shelf
        </h2>
        <PlayBadgeShelf games={playGames} />
      </section>

      <section className="container-content pt-10">
        <div className="grid gap-3 md:grid-cols-3">
          {promises.map((promise) => (
            <div key={promise.title} className="academy-card rounded-2xl p-5">
              <promise.icon aria-hidden="true" className="h-5 w-5 text-[#9C4321]" />
              <h2 className="mt-2 text-base font-semibold text-[#14213B]">
                {promise.title}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-[#46536B]">
                {promise.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-content pt-8">
        <details className="rounded-2xl border border-[#14213B]/10 bg-white p-5">
          <summary className="flex items-center gap-2 text-sm font-semibold text-[#14213B]">
            <HelpCircle aria-hidden="true" className="h-4 w-4 text-[#9C4321]" />
            Grown-up note: what is real here?
          </summary>
          <div className="mt-3 space-y-2 text-sm leading-relaxed text-[#46536B]">
            <p>
              The 3D models are toys made from simple shapes. They are not
              reconstructions of real spacecraft, and the rover terrain is invented
              for the game.
            </p>
            <p>
              Real facts stay in the source-linked lessons and museum records. If a
              device cannot start WebGL, each game switches to a complete
              button-and-diagram version, so no game is locked behind 3D.
            </p>
          </div>
        </details>
      </section>

      <section className="container-content pt-8" aria-labelledby="lessons-heading">
        <div className="academy-card rounded-2xl p-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9C4321]">
                After you play
              </p>
              <h2
                id="lessons-heading"
                className="mt-1 text-xl font-semibold text-[#14213B]"
              >
                Read the mission behind each toy
              </h2>
            </div>
            <Link
              href="/academy/lessons"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#14213B] underline-offset-4 hover:underline"
            >
              All lessons
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
          <ul className="mt-4 grid gap-2 sm:grid-cols-3">
            {linkedLessons.map((lesson) => (
              <li key={lesson.id}>
                <Link
                  href={`/academy/lessons/${lesson.id}`}
                  className="flex h-full flex-col rounded-xl border border-[#14213B]/10 bg-[#FFF8EC] p-4 transition-colors hover:bg-white"
                >
                  <span className="text-sm font-semibold text-[#14213B]">
                    {lesson.title}
                  </span>
                  <span className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#46536B]">
                    {lesson.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
