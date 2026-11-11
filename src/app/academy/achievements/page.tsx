import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Trophy } from "lucide-react";
import { AchievementsView } from "@/components/academy/AchievementsView";

export const metadata: Metadata = {
  title: "Achievements — Space Academy",
  description:
    "Badges derived from lessons, journeys, playground games, favourites, simulations and rover builds stored on this device.",
};

export default function AchievementsPage() {
  return (
    <div className="container-content max-w-6xl pb-16 pt-10">
      <Link
        href="/academy"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14213B] underline-offset-4 hover:underline"
      >
        <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
        Space Academy
      </Link>
      <div className="mt-4 max-w-2xl">
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9C4321]">
          <Trophy aria-hidden="true" className="h-3.5 w-3.5" />
          Personal record
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#14213B] sm:text-4xl">
          Achievements
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-[#46536B] sm:text-base">
          Every badge is calculated from activity saved in this browser. Nothing is
          uploaded and no account is needed.
        </p>
      </div>
      <div className="mt-6">
        <AchievementsView />
      </div>
    </div>
  );
}
