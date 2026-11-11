import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Building2, ExternalLink } from "lucide-react";
import { SourceList } from "@/components/ui/SourceList";
import { agencies, getAgency } from "@/data/space/agencies";
import { missions } from "@/data/missions";
import { getArtifactsByIds } from "@/data/artifacts";
import { missionStatusLabels } from "@/lib/status";
import { formatDate } from "@/lib/format";

type PageProps = { params: { id: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return agencies.map((agency) => ({ id: agency.id }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const agency = getAgency(params.id);
  if (!agency) return { title: "Agency not found" };
  return {
    title: `${agency.name} (${agency.shortName})`,
    description: agency.summary,
  };
}

export default function AgencyPage({ params }: PageProps) {
  const agency = getAgency(params.id);
  if (!agency) notFound();

  const agencyMissions = missions.filter(
    (mission) => mission.agencyId === agency.id
  );
  const artifactIds = [
    ...new Set(agencyMissions.flatMap((mission) => mission.artifactIds)),
  ];
  const artifacts = getArtifactsByIds(artifactIds);
  const index = agencies.findIndex((entry) => entry.id === agency.id);
  const previous = index > 0 ? agencies[index - 1] : undefined;
  const next =
    index >= 0 && index < agencies.length - 1 ? agencies[index + 1] : undefined;

  return (
    <article className="container-content pb-16 pt-8">
      <nav aria-label="Breadcrumb" className="text-xs text-text-muted">
        <Link href="/museum" className="hover:text-white">
          Museum
        </Link>
        <span aria-hidden="true" className="px-1.5">
          /
        </span>
        <Link href="/museum/agencies" className="hover:text-white">
          Agencies
        </Link>
        <span aria-hidden="true" className="px-1.5">
          /
        </span>
        <span className="text-text-secondary">{agency.shortName}</span>
      </nav>

      <header className="mt-5 max-w-3xl">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]"
            style={{
              borderColor: `${agency.accent}55`,
              backgroundColor: `${agency.accent}18`,
              color: agency.accent,
            }}
          >
            {agency.shortName}
          </span>
          <span className="text-[11px] uppercase tracking-[0.16em] text-text-muted">
            {agency.country} · founded {agency.founded}
          </span>
        </div>
        <h1 className="mt-4 text-balance text-3xl font-semibold leading-[1.08] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
          {agency.name}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
          {agency.summary}
        </p>
        <a
          href={agency.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent-bright hover:text-white"
        >
          Official website
          <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
        <div className="min-w-0 space-y-10">
          <section aria-labelledby="focus-heading">
            <h2
              id="focus-heading"
              className="text-lg font-semibold tracking-tight text-text-primary"
            >
              Focus areas
            </h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {agency.focus.map((focus) => (
                <li
                  key={focus}
                  className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/[0.02] p-3 text-sm text-text-secondary"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: agency.accent }}
                  />
                  {focus}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="programs-heading">
            <h2
              id="programs-heading"
              className="text-lg font-semibold tracking-tight text-text-primary"
            >
              Notable programs
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {agency.notablePrograms.map((program) => (
                <li
                  key={program}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-text-secondary"
                >
                  {program}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="missions-heading">
            <h2
              id="missions-heading"
              className="text-lg font-semibold tracking-tight text-text-primary"
            >
              Missions in this collection
            </h2>
            {agencyMissions.length ? (
              <ul className="mt-3 space-y-2">
                {agencyMissions.map((mission) => (
                  <li key={mission.id}>
                    <Link
                      href={`/museum/missions/${mission.id}`}
                      className="group flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-3.5 transition-colors hover:border-brand-violet/40 hover:bg-white/[0.04]"
                    >
                      <span>
                        <span className="block text-sm font-medium text-text-primary">
                          {mission.name}
                        </span>
                        <span className="mt-0.5 block text-xs text-text-muted">
                          {mission.destinationLabel} ·{" "}
                          {formatDate(mission.launchDate, "year")} ·{" "}
                          {missionStatusLabels[mission.status]}
                        </span>
                      </span>
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-white"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-text-muted">
                No mission in the current collection is derived from this
                agency&apos;s hardware. The agency is listed for mission context.
              </p>
            )}
          </section>

          <section aria-labelledby="artifacts-heading">
            <h2
              id="artifacts-heading"
              className="text-lg font-semibold tracking-tight text-text-primary"
            >
              Artifact records
            </h2>
            <p className="mt-1.5 text-sm text-text-muted">
              {artifacts.length} hardware record
              {artifacts.length === 1 ? "" : "s"} linked through this agency.
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {artifacts.map((artifact) => (
                <li key={artifact.id}>
                  <Link
                    href={`/museum/${artifact.id}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-text-secondary transition-colors hover:border-brand-violet/40 hover:text-white"
                  >
                    {artifact.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="sources-heading">
            <div className="flex items-center gap-2">
              <Building2 aria-hidden="true" className="h-4 w-4 text-brand-violet" />
              <h2
                id="sources-heading"
                className="text-lg font-semibold tracking-tight text-text-primary"
              >
                Sources
              </h2>
            </div>
            <div className="mt-4">
              <SourceList ids={agency.sourceIds} title="Agency sources" />
            </div>
          </section>

          <nav
            aria-label="Agency navigation"
            className="grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2"
          >
            {previous ? (
              <Link
                href={`/museum/agencies/${previous.id}`}
                className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-brand-violet/40"
              >
                <ArrowLeft
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-violet"
                />
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-text-muted">
                    Previous agency
                  </span>
                  <span className="mt-1 block text-sm font-medium text-text-primary">
                    {previous.shortName}
                  </span>
                </span>
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
            {next ? (
              <Link
                href={`/museum/agencies/${next.id}`}
                className="group flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-end transition-colors hover:border-brand-violet/40"
              >
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-text-muted">
                    Next agency
                  </span>
                  <span className="mt-1 block text-sm font-medium text-text-primary">
                    {next.shortName}
                  </span>
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-violet"
                />
              </Link>
            ) : null}
          </nav>
        </div>

        <aside className="lg:sticky lg:top-24">
          <div className="rounded-xl border border-white/10 bg-bg-elevated/60 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">
              At a glance
            </p>
            <dl className="mt-3 space-y-3 text-xs">
              <div>
                <dt className="text-text-muted">Short name</dt>
                <dd className="mt-0.5 font-medium text-text-primary">
                  {agency.shortName}
                </dd>
              </div>
              <div>
                <dt className="text-text-muted">Country</dt>
                <dd className="mt-0.5 font-medium text-text-primary">
                  {agency.country}
                </dd>
              </div>
              <div>
                <dt className="text-text-muted">Founded</dt>
                <dd className="mt-0.5 font-mono tabular-nums text-text-primary">
                  {agency.founded}
                </dd>
              </div>
              <div>
                <dt className="text-text-muted">Missions here</dt>
                <dd className="mt-0.5 font-medium text-text-primary">
                  {agencyMissions.length}
                </dd>
              </div>
              <div>
                <dt className="text-text-muted">Artifacts here</dt>
                <dd className="mt-0.5 font-medium text-text-primary">
                  {artifacts.length}
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </article>
  );
}
