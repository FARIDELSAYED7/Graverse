import Link from "next/link";
import { ArrowRight, Award, Clock, Route } from "lucide-react";
import { ageBandMeta, type Journey } from "@/types/academy";

export function JourneyCard({ journey }: { journey: Journey }) {
  const band = ageBandMeta[journey.ageBand];
  return (
    <article className="academy-card group relative overflow-hidden rounded-2xl p-5">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: journey.accent }}
      />
      <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em]">
        <span className="rounded-full px-2 py-0.5" style={{ background: `${journey.accent}1f`, color: journey.accent }}>
          {band.label}
        </span>
        <span className="inline-flex items-center gap-1 text-[#6B7280]">
          <Clock aria-hidden="true" className="h-3 w-3" />
          {journey.minutes} min
        </span>
        <span className="inline-flex items-center gap-1 text-[#6B7280]">
          <Route aria-hidden="true" className="h-3 w-3" />
          {journey.steps.length} steps
        </span>
      </div>
      <h3 className="mt-3 text-xl font-semibold text-[#152238]">{journey.title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-[#4B5563]">{journey.promise}</p>
      <p className="mt-2 text-xs leading-relaxed text-[#6B7280]">{journey.summary}</p>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#7C4A03]">
          <Award aria-hidden="true" className="h-3.5 w-3.5" />
          Badge: {journey.badge.name}
        </span>
        <Link
          href={`/academy/journeys/${journey.id}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#152238] underline-offset-4 hover:underline"
        >
          Start
          <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
