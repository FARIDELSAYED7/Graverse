import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Bot, Info } from "lucide-react";
import { RobotLab } from "@/components/kids/RobotLab";
import { artifacts } from "@/data/artifacts";
import { buildRobotProfiles } from "@/lib/robot";

export const metadata: Metadata = {
  title: "Robot lab",
  description:
    "Ask a scripted robot guide about any of the 30 GRAVERSE artifacts. Fixed, source-linked answers with optional read-aloud. Not an AI.",
};

export default function RobotLabPage() {
  const robots = buildRobotProfiles(artifacts);

  return (
    <div className="pb-16">
      <div className="container-content pt-8">
        <Link
          href="/academy"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14213B] underline-offset-4 hover:underline"
        >
          <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
          Space Academy
        </Link>
        <div className="mt-4 max-w-3xl">
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9C4321]">
            <Bot aria-hidden="true" className="h-3.5 w-3.5" />
            Robot lab
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#14213B] sm:text-4xl">
            Talk to a machine&apos;s guide
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[#46536B] sm:text-base">
            Pick an artifact, then ask a question. The guide gives a fixed,
            source-linked answer.
          </p>
          <p className="mt-3 flex items-start gap-2 rounded-xl border border-[#14213B]/10 bg-white px-4 py-3 text-xs leading-relaxed text-[#46536B]">
            <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            Scripted from the museum record. Not AI, no predictions, and it says
            when a question is outside its script.
          </p>
        </div>
      </div>

      <div className="container-content mt-5">
        <RobotLab profiles={robots} initialRobotId="perseverance" />
      </div>
    </div>
  );
}
