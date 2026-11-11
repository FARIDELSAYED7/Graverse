import Link from "next/link";
import { ArrowRight, Award, Clock, Route } from "lucide-react";
import { ageBandMeta, type Journey } from "@/types/academy";

export function JourneyCard({ journey }: { journey: Journey }) {
  const band = ageBandMeta[journey.ageBand];
  return (
    <article className="academy-card group relative flex h-full flex-col overflow-hidden rounded-2xl p-5">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: journey.accent }}
      />
      <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em]">
        <span
          className="rounded-full px-2 py-0.5"
          style={{ background: `${journey.accent}1f`, color: journey.accent }}
        >
          {band.label}
        </span>
        <span className="inline-flex items-center gap-1 text-[#5F6B83]">
          <Clock aria-hidden="true" className="h-3 w-3" />
          {journey.minutes} min
        </span>
        <span className="inline-flex items-center gap-1 text-[#5F6B83]">
          <Route aria-hidden="true" className="h-3 w-3" />
          {journey.steps.length} steps
        </span>
      </div>
      <h3 className="mt-2 text-xl font-semibold text-[#14213B]">{journey.title}</h3>
      <p className="mt-1 line-clamp-2 flex-1 text-sm leading-relaxed text-[#46536B]">
        {journey.promise}
      </p>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#8A5A00]">
          <Award aria-hidden="true" className="h-3.5 w-3.5" />
          {journey.badge.name}
        </span>
        <Link
          href={`/academy/journeys/${journey.id}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#14213B] underline-offset-4 hover:underline"
        >
          Start
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </article>
  );
}
