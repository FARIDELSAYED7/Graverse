import Link from "next/link";
import type { AgeBand } from "@/types/academy";

export function AgeBandMetaGrid({
  bands,
  meta,
}: {
  bands: AgeBand[];
  meta: Record<
    AgeBand,
    { label: string; short: string; description: string; accent: string }
  >;
}) {
  return (
    <div className="mt-5 grid gap-4 md:grid-cols-3">
      {bands.map((band) => {
        const entry = meta[band];
        return (
          <Link
            key={band}
            href={`/academy/lessons?age=${band}`}
            className="academy-card group rounded-2xl p-5 transition-transform hover:-translate-y-0.5"
          >
            <span
              aria-hidden="true"
              className="inline-flex h-9 items-center rounded-full px-3 text-xs font-bold"
              style={{ background: `${entry.accent}22`, color: entry.accent }}
            >
              {entry.label}
            </span>
            <p className="mt-3 text-lg font-semibold text-[#152238]">{entry.short}</p>
            <p className="mt-1 text-sm leading-relaxed text-[#5A6472]">
              {entry.description}
            </p>
            <span className="mt-3 inline-block text-xs font-semibold text-[#152238] underline-offset-4 group-hover:underline">
              See lessons for this age →
            </span>
          </Link>
        );
      })}
    </div>
  );
}
