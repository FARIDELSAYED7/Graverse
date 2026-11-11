import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Wrench } from "lucide-react";
import { RoverBuilder } from "@/components/academy/RoverBuilder";

export const metadata: Metadata = {
  title: "Build a rover — Space Academy",
  description:
    "A teaching exercise in engineering trade-offs: choose mobility, power, communication and thermal systems, then see the mass and power budget change. Values are educational approximations, not real rover specifications.",
};

export default function BuildRoverPage() {
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
          <Wrench aria-hidden="true" className="h-3.5 w-3.5" />
          Engineering Lab
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#14213B] sm:text-4xl">
          Build a rover
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-[#46536B] sm:text-base">
          Every choice adds mass and draws power. There is no single correct rover —
          only trade-offs a mission team would have to justify.
        </p>
      </div>
      <div className="mt-6">
        <RoverBuilder />
      </div>
    </div>
  );
}
