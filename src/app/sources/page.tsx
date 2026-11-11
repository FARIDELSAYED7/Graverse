import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, ShieldCheck } from "lucide-react";
import { sources, sourceTypeLabels } from "@/data/sources";
import { ClaimLegend } from "@/components/ui/ClaimBadge";
import { allArtifacts } from "@/data/artifacts";
import { celestialBodies } from "@/data/space/bodies";
import { deepSkyObjects } from "@/data/space/deep-sky";
import { agencies } from "@/data/space/agencies";
import { missions } from "@/data/missions";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Source registry and methodology",
  description:
    "Every public record GRAVERSE cites, with the date it was accessed. The registry is the audit trail for the museum, Explorer and Academy datasets.",
};

const accessDate = "2026-11-10";

export default function SourcesPage() {
  const byType = new Map<string, typeof sources>();
  for (const source of sources) {
    const list = byType.get(source.type) ?? [];
    list.push(source);
    byType.set(source.type, list);
  }

  const recordCount =
    allArtifacts.length +
    celestialBodies.length +
    deepSkyObjects.length +
    agencies.length +
    missions.length +
    articles.length;

  return (
    <div className="container-content pb-16 pt-8 sm:pt-10">
      <header className="max-w-3xl">
        <p className="eyebrow">Provenance</p>
        <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
          Source registry and methodology
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
          GRAVERSE does not invent dates, locations, statuses or findings. Each
          record names the public source it depends on, and every page says when
          that record was last checked. This page lists the complete registry.
        </p>
      </header>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Sources in registry" value={sources.length} />
        <Stat label="Records using them" value={recordCount} />
        <Stat label="Last verification pass" value={accessDate} />
        <Stat
          label="Registry type"
          value={`${byType.size} source types`}
        />
      </div>

      <section aria-labelledby="method-heading" className="mt-10 max-w-3xl">
        <h2
          id="method-heading"
          className="text-lg font-semibold tracking-tight text-text-primary"
        >
          How a claim is labelled
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
          A number is only as useful as its evidence. These four labels are used
          everywhere in the product.
        </p>
        <div className="mt-4">
          <ClaimLegend />
        </div>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-text-secondary">
          <li className="flex items-start gap-2">
            <ShieldCheck
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal"
            />
            A confirmed or estimated value must point to at least one source in
            this registry. Validation fails the build if it does not.
          </li>
          <li className="flex items-start gap-2">
            <ShieldCheck
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal"
            />
            Simulated values are computed by GRAVERSE from published parameters
            and are never described as measurements.
          </li>
          <li className="flex items-start gap-2">
            <ShieldCheck
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal"
            />
            Where a fact is not established, the interface says Unknown. It does
            not fill the gap with a plausible number.
          </li>
        </ul>
      </section>

      <section aria-labelledby="registry-heading" className="mt-10">
        <h2
          id="registry-heading"
          className="text-lg font-semibold tracking-tight text-text-primary"
        >
          The registry
        </h2>
        <p className="mt-1.5 text-sm text-text-muted">
          {sources.length} records. All links open in a new tab.
        </p>

        <div className="mt-5 space-y-8">
          {[...byType.entries()].map(([type, entries]) => (
            <div key={type}>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                {sourceTypeLabels[type as keyof typeof sourceTypeLabels] ?? type} ·{" "}
                {entries.length}
              </h3>
              <ol className="mt-3 space-y-2">
                {entries.map((source) => (
                  <li
                    key={source.id}
                    className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-text-muted">
                      <span className="font-mono">{source.id}</span>
                      <span aria-hidden="true">·</span>
                      <span>{source.organization}</span>
                      <span aria-hidden="true">·</span>
                      <span>Accessed {source.accessedAt}</span>
                    </div>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-flex items-start gap-1.5 text-sm font-medium text-accent-bright hover:text-white"
                    >
                      {source.title}
                      <ExternalLink
                        aria-hidden="true"
                        className="mt-0.5 h-3.5 w-3.5 shrink-0"
                      />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                    {source.notes ? (
                      <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                        {source.notes}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="limits-heading"
        className="mt-12 max-w-3xl rounded-2xl border border-warning/25 bg-warning/[0.05] p-5"
      >
        <h2
          id="limits-heading"
          className="text-sm font-semibold uppercase tracking-[0.14em] text-[#FFD79A]"
        >
          Known limits
        </h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-text-secondary">
          <li>
            The collection is intentionally finite: {allArtifacts.length}{" "}
            artifacts, {missions.length} derived missions,{" "}
            {celestialBodies.length} solar-system records and{" "}
            {deepSkyObjects.length} deep-sky records. It is not a complete
            inventory of space history.
          </li>
          <li>
            Some records deliberately omit imagery or a 3D model rather than
            substitute a generated asset.
          </li>
          <li>
            Status values can change. The access date on each source is the
            boundary of what was checked.
          </li>
          <li>
            Lunar and planetary coordinates are only shown at the precision the
            source supports.
          </li>
        </ul>
      </section>

      <nav aria-label="Related" className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/museum"
          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-text-secondary hover:border-accent/40 hover:text-white"
        >
          The museum
        </Link>
        <Link
          href="/explorer"
          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-text-secondary hover:border-accent/40 hover:text-white"
        >
          Explorer
        </Link>
        <Link
          href="/about#sources"
          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-text-secondary hover:border-accent/40 hover:text-white"
        >
          About and methodology
        </Link>
      </nav>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <p className="text-[10px] uppercase tracking-[0.16em] text-text-muted">
        {label}
      </p>
      <p className="mt-1 text-xl font-semibold tabular-nums text-text-primary">
        {value}
      </p>
    </div>
  );
}
