import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { JourneyCard } from "@/components/academy/JourneyCard";
import { journeys } from "@/data/journeys";
import { ageBandMeta } from "@/types/academy";

export const metadata: Metadata = {
  title: "Learning journeys",
  description:
    "Four guided space learning journeys for ages 5–12, linking lessons, museum artifacts, destinations and explainers.",
};

export default function JourneysPage() {
  const bands = ["5-7", "8-9", "10-12"] as const;
  return (
    <div className="container-content pb-16 pt-10">
      <Link
        href="/academy"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#152238] underline-offset-4 hover:underline"
      >
        <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
        Space Academy
      </Link>
      <div className="mt-4 max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B4532A]">
          Learning journeys
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#152238] sm:text-4xl">
          Pick a route through the archive
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#4B5563] sm:text-base">
          A journey combines lessons, museum records and short challenges in a
          deliberate order. Mark each step done as you go; finish the route to earn
          its badge.
        </p>
      </div>

      {bands.map((band) => {
        const items = journeys.filter((journey) => journey.ageBand === band);
        if (items.length === 0) return null;
        return (
          <section key={band} className="mt-10" aria-labelledby={`band-${band}`}>
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full"
                style={{ background: ageBandMeta[band].accent }}
              />
              <h2 id={`band-${band}`} className="text-sm font-semibold uppercase tracking-[0.16em] text-[#152238]">
                {ageBandMeta[band].label} · {ageBandMeta[band].short}
              </h2>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {items.map((journey) => (
                <JourneyCard key={journey.id} journey={journey} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
