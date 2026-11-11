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
      <div className="container-content pt-10">
        <Link
          href="/academy"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#152238] underline-offset-4 hover:underline"
        >
          <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
          Space Academy
        </Link>
        <div className="mt-4 max-w-3xl">
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B4532A]">
            <Bot aria-hidden="true" className="h-3.5 w-3.5" />
            Robot lab
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#152238] sm:text-4xl">
            Talk to a machine&apos;s guide
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[#4B5563] sm:text-base">
            Pick an artifact, then ask a question. The guide matches your words to one
            of its fixed answers and shows the source record. It is a scripted
            interface, not a generative AI, and it will say when a question is outside
            its script.
          </p>
          <p className="mt-3 flex items-start gap-2 rounded-xl border border-[#152238]/10 bg-white/70 px-4 py-3 text-xs leading-relaxed text-[#5A6472]">
            <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            Answers come from the same source-linked museum records. They contain no
            new facts, no predictions about the future and no personal advice.
          </p>
        </div>
      </div>

      <div className="container-content mt-6">
        <div className="rounded-3xl bg-[#0A1426] p-3 sm:p-5">
          <RobotLab profiles={robots} initialRobotId="perseverance" />
        </div>
      </div>
    </div>
  );
}
