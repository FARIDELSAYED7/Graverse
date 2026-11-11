"use client";

import Link from "next/link";
import {
  ArrowRight,
  Gamepad2,
  MoonStar,
  Rocket,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { useProgress } from "@/lib/use-progress";
import type { PlayGame } from "@/types/play";

const icons = {
  rocket: Rocket,
  moon: MoonStar,
  rover: Truck,
} as const;

function PlayGameCard({ game }: { game: PlayGame }) {
  const { state } = useProgress();
  const record = state.games[game.id];
  const Icon = icons[game.id];

  return (
    <article className="academy-card group flex flex-col overflow-hidden rounded-3xl">
      <div
        className="relative flex h-36 items-center justify-center overflow-hidden"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${game.softAccent} 0%, #FFFDF7 58%, ${game.softAccent} 100%)`,
        }}
      >
        <div
          aria-hidden="true"
          className="absolute -left-8 -top-8 h-28 w-28 rounded-full opacity-60 blur-2xl"
          style={{ background: game.accent }}
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-10 right-0 h-32 w-32 rounded-full border-[10px] opacity-20"
          style={{ borderColor: game.accent }}
        />
        <Icon
          aria-hidden="true"
          className="relative h-16 w-16 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
          style={{ color: game.accent }}
        />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-[#152238] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#FFF7EA]">
          <Gamepad2 aria-hidden="true" className="h-3 w-3" />
          3D game
        </span>
        {record ? (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-[#0F766E] shadow-sm">
            <Star aria-hidden="true" className="h-3 w-3 fill-current" />
            {record.stars}/3
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-[#152238]">{game.title}</h3>
        <p className="mt-0.5 text-sm font-semibold" style={{ color: game.accent }}>
          {game.tagline}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[#5A6472]">{game.description}</p>

        <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] font-semibold">
          <span className="rounded-full bg-[#152238]/6 px-2 py-1 text-[#374151]">
            Ages {game.ages.join(", ")}
          </span>
          <span className="rounded-full bg-[#152238]/6 px-2 py-1 text-[#374151]">
            {game.minutes} min
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#FFC93C]/20 px-2 py-1 text-[#7C4A03]">
            <Sparkles aria-hidden="true" className="h-3 w-3" />
            {game.badge.name}
          </span>
        </div>

        <Link
          href={`/academy/play/${game.id}`}
          className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          style={{ backgroundColor: game.accent }}
        >
          {record ? "Play again" : "Open the game"}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

export function PlayGameGrid({ games }: { games: PlayGame[] }) {
  return (
    <div className="mt-5 grid gap-4 md:grid-cols-3">
      {games.map((game) => (
        <PlayGameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
