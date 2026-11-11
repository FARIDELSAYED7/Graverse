import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Trophy } from "lucide-react";
import type { PlayGame } from "@/types/play";

export function GameReward({
  game,
  stars,
  earned,
}: {
  game: PlayGame;
  stars: number;
  earned: boolean;
}) {
  return (
    <div
      role="status"
      className="mt-4 rounded-2xl border p-4"
      style={{
        borderColor: `${game.accent}55`,
        backgroundColor: game.softAccent,
      }}
    >
      <p className="flex items-center gap-2 text-sm font-semibold text-[#14213B]">
        <Trophy aria-hidden="true" className="h-4 w-4" style={{ color: game.accent }} />
        {earned ? `Badge earned: ${game.badge.name}` : `Game complete: ${game.title}`}
        <span aria-label={`${stars} of 3 stars`} className="ml-auto font-mono text-xs">
          {"★".repeat(stars)}
          <span className="text-[#14213B]/25">{"★".repeat(3 - stars)}</span>
        </span>
      </p>
      <p className="mt-1 text-xs leading-relaxed text-[#46536B]">{game.badge.description}</p>
      <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold">
        <Link
          href="/academy/progress"
          className="inline-flex items-center gap-1 underline-offset-4 hover:underline"
          style={{ color: game.accent }}
        >
          <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5" />
          See it in your progress
        </Link>
        <Link
          href={`/academy/lessons/${game.lessonId}`}
          className="inline-flex items-center gap-1 text-[#14213B] underline-offset-4 hover:underline"
        >
          Read the real mission lesson
          <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
