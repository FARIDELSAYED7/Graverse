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
    title: "Real 3D toys",
    text: "Spin the model, change its parts and watch it react. Everything is built from simple shapes and labelled as a toy, not an official spacecraft model.",
  },
  {
    icon: Keyboard,
    title: "Playable by keyboard",
    text: "Every game has buttons and keyboard controls, not just a canvas. The rover works from a focused arrow-key panel.",
  },
  {
    icon: ShieldCheck,
    title: "No account, no tracking",
    text: "Badges and best scores are saved in this browser with the rest of your Academy progress. Nothing is uploaded.",
  },
];

export default function PlaygroundPage() {
  const linkedLessons = [
    ...new Set(playGames.map((game) => game.lessonId)),
  ]
    .map((id) => lessons.find((lesson) => lesson.id === id))
    .filter((lesson): lesson is (typeof lessons)[number] => Boolean(lesson));

  return (
    <div className="pb-16">
      <section className="relative overflow-hidden border-b border-[#152238]/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_-10%,rgba(124,92,229,0.22),transparent_55%),radial-gradient(ellipse_at_10%_20%,rgba(255,107,90,0.2),transparent_50%),radial-gradient(ellipse_at_50%_110%,rgba(20,184,166,0.22),transparent_55%)]"
        />
        <div className="container-content relative py-11 sm:py-16">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#7C5CE5]/30 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5B3BC4]">
            <Gamepad2 aria-hidden="true" className="h-3.5 w-3.5" />
            Space Playground · ages 5–12
          </p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="max-w-2xl">
              <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-[#152238] sm:text-5xl lg:text-6xl">
                Learn by <span className="text-[#7C5CE5]">playing</span> with space.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
                Build a rocket and launch it. Slide the Moon until the phase
                matches. Drive a rover out to collect samples and bring them home.
                Three small 3D games, each with a badge and a path back to a real
                mission lesson.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="#games"
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-[#7C5CE5] px-6 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles aria-hidden="true" className="h-4 w-4" />
                  Pick a game
                </Link>
                <Link
                  href="/academy/lessons"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-[#152238]/20 bg-white/70 px-6 text-sm font-semibold text-[#152238] hover:bg-white"
                >
                  Browse the lessons
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="academy-card rounded-3xl p-5">
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#B4532A]">
                <HelpCircle aria-hidden="true" className="h-3.5 w-3.5" />
                Grown-up note
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">
                The 3D models are toys made from simple shapes. They are not
                reconstructions of real spacecraft, and the rover terrain is
                invented for the game. Real facts stay in the source-linked
                lessons and museum records.
              </p>
              <p className="mt-3 text-xs leading-relaxed text-[#6B7280]">
                If a device cannot start WebGL, each game switches to a complete
                button-and-diagram version. No game is locked behind 3D.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="games"
        className="container-content scroll-mt-24 pt-12"
        aria-labelledby="games-heading"
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B4532A]">
              Choose a game
            </p>
            <h2
              id="games-heading"
              className="mt-1 text-2xl font-semibold text-[#152238] sm:text-3xl"
            >
              Three ways to play
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#5A6472]">
            Start anywhere. Each game takes a few minutes and saves its own badge
            and best star score.
          </p>
        </div>
        <PlayGameGrid games={playGames} />
      </section>

      <section className="container-content pt-10" aria-labelledby="shelf-heading">
        <h2 id="shelf-heading" className="sr-only">
          Playground badge shelf
        </h2>
        <PlayBadgeShelf games={playGames} />
      </section>

      <section className="container-content pt-12" aria-labelledby="how-heading">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B4532A]">
            How the playground works
          </p>
          <h2
            id="how-heading"
            className="mt-1 text-2xl font-semibold text-[#152238] sm:text-3xl"
          >
            Play first, read next
          </h2>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {promises.map((promise) => (
            <div key={promise.title} className="academy-card rounded-2xl p-5">
              <promise.icon
                aria-hidden="true"
                className="h-6 w-6 text-[#7C5CE5]"
              />
              <h3 className="mt-3 text-lg font-semibold text-[#152238]">
                {promise.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#5A6472]">
                {promise.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-content pt-12" aria-labelledby="lessons-heading">
        <div className="academy-card rounded-3xl p-5 sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B4532A]">
                After you play
              </p>
              <h2
                id="lessons-heading"
                className="mt-1 text-xl font-semibold text-[#152238] sm:text-2xl"
              >
                Read the missions behind the toys
              </h2>
            </div>
            <Link
              href="/academy/lessons"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#152238] underline-offset-4 hover:underline"
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
                  className="flex h-full flex-col rounded-2xl border border-[#152238]/10 bg-white/70 p-4 transition-colors hover:bg-white"
                >
                  <span className="text-sm font-semibold text-[#152238]">
                    {lesson.title}
                  </span>
                  <span className="mt-1 text-xs leading-relaxed text-[#5A6472]">
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
