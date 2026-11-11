"use client";

import Link from "next/link";
import { Award, Lock, Star } from "lucide-react";
import { useProgress } from "@/lib/use-progress";
import type { PlayGame } from "@/types/play";

export function PlayBadgeShelf({ games }: { games: PlayGame[] }) {
  const { state } = useProgress();
  const earned = games.filter((game) => state.badges.includes(game.badge.id)).length;

  return (
    <div className="academy-card rounded-3xl p-5">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9C4321]">
            Badge shelf
          </p>
          <h2 className="mt-1 text-xl font-semibold text-[#14213B]">
            {earned} of {games.length} earned
          </h2>
        </div>
        <Link
          href="/academy/progress"
          className="text-xs font-semibold text-[#14213B] underline-offset-4 hover:underline"
        >
          See all progress
        </Link>
      </div>

      <ul className="mt-4 grid gap-2 sm:grid-cols-3">
        {games.map((game) => {
          const record = state.games[game.id];
          const has = state.badges.includes(game.badge.id);
          return (
            <li
              key={game.id}
              className={`rounded-2xl border p-3 ${
                has ? "bg-white" : "bg-[#14213B]/3"
              }`}
              style={{ borderColor: has ? `${game.accent}55` : "rgba(21,34,56,0.1)" }}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: has ? game.softAccent : "rgba(21,34,56,0.06)",
                    color: has ? game.accent : "#8B95A5",
                  }}
                >
                  {has ? (
                    <Award aria-hidden="true" className="h-5 w-5" />
                  ) : (
                    <Lock aria-hidden="true" className="h-4 w-4" />
                  )}
                </span>
                {record ? (
                  <span className="inline-flex items-center gap-0.5 font-mono text-xs text-[#7C4A03]">
                    {record.stars}
                    <Star aria-hidden="true" className="h-3 w-3 fill-current" />
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-sm font-semibold text-[#14213B]">{game.badge.name}</p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-[#5A6472]">
                {has ? "Earned on this device." : `Play ${game.title} to unlock.`}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
