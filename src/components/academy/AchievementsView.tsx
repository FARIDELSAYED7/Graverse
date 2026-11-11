"use client";

import {
  BookOpen,
  Eye,
  FlaskConical,
  FolderHeart,
  Gamepad2,
  Heart,
  Route,
  Star,
  Trophy,
  Wrench,
} from "lucide-react";
import { useMemo } from "react";
import { achievementSummary, type AchievementIcon } from "@/lib/achievements";
import { usePersonal } from "@/lib/use-personal";
import { useProgress } from "@/lib/use-progress";
import { cn } from "@/lib/cn";

const icons = {
  book: BookOpen,
  route: Route,
  game: Gamepad2,
  star: Star,
  heart: Heart,
  folder: FolderHeart,
  eye: Eye,
  flask: FlaskConical,
  wrench: Wrench,
  trophy: Trophy,
} satisfies Record<AchievementIcon, typeof BookOpen>;

export function AchievementsView() {
  const progress = useProgress();
  const personal = usePersonal();

  const summary = useMemo(
    () =>
      achievementSummary({
        progress: progress.state,
        personal: personal.state,
      }),
    [progress.state, personal.state]
  );

  const storageLabel =
    progress.mode === "local" && personal.mode === "local"
      ? "Saved in this browser"
      : progress.mode === "loading" || personal.mode === "loading"
        ? "Loading saved data…"
        : "This session only — storage is blocked";

  return (
    <div className="space-y-6">
      <div className="academy-card rounded-2xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9C4321]">
              Badge shelf
            </p>
            <p className="mt-1 text-2xl font-semibold text-[#14213B]">
              {summary.unlocked} of {summary.total} unlocked
            </p>
          </div>
          <p className="text-xs font-medium text-[#5F6B83]">{storageLabel}</p>
        </div>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[#14213B]/10">
          <div
            className="h-full rounded-full bg-[#9C4321] transition-[width]"
            style={{ width: `${summary.percent}%` }}
          />
        </div>
        <p className="mt-2 text-xs leading-relaxed text-[#5F6B83]">
          Achievements are derived from activity stored on this device. They are a
          personal record, not a certificate from NASA or any school.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {summary.statuses.map((achievement) => {
          const Icon = icons[achievement.icon];
          return (
            <div
              key={achievement.id}
              className={cn(
                "rounded-2xl border p-4 transition-colors",
                achievement.unlocked
                  ? "border-[#0F766E]/30 bg-[#0F766E]/5"
                  : "border-[#14213B]/10 bg-white"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <span
                  className={cn(
                    "inline-flex h-9 w-9 items-center justify-center rounded-full",
                    achievement.unlocked
                      ? "bg-[#0F766E] text-white"
                      : "bg-[#14213B]/5 text-[#5F6B83]"
                  )}
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]",
                    achievement.unlocked
                      ? "bg-[#0F766E]/15 text-[#0F4F49]"
                      : "bg-[#14213B]/5 text-[#5F6B83]"
                  )}
                >
                  {achievement.unlocked ? "Unlocked" : "Locked"}
                </span>
              </div>
              <p className="mt-3 text-sm font-semibold text-[#14213B]">
                {achievement.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#5F6B83]">
                {achievement.description}
              </p>
              <div className="mt-3">
                <div className="flex items-center justify-between text-[11px] text-[#5F6B83]">
                  <span>
                    {achievement.value} / {achievement.target} {achievement.unit}
                  </span>
                  <span className="font-mono">{achievement.percent}%</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#14213B]/10">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      achievement.unlocked ? "bg-[#0F766E]" : "bg-[#9C4321]"
                    )}
                    style={{ width: `${achievement.percent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="rounded-2xl border border-[#14213B]/10 bg-white p-4 text-xs leading-relaxed text-[#5F6B83]">
        Academy progress and personal collection data are stored separately. You can
        export or reset them from{" "}
        <a href="/academy/progress" className="font-semibold text-[#14213B] underline underline-offset-4">
          Academy progress
        </a>{" "}
        and{" "}
        <a href="/my-universe" className="font-semibold text-[#14213B] underline underline-offset-4">
          My Universe
        </a>
        .
      </p>
    </div>
  );
}
