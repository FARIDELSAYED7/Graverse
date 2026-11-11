import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarClock, ExternalLink, MapPin } from "lucide-react";
import { ArtifactCard } from "@/components/artifacts/ArtifactCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SourceList } from "@/components/ui/SourceList";
import { getArtifactsByIds } from "@/data/artifacts";
import { getMission, missions } from "@/data/missions";
import { getAgencyForMission } from "@/data/space/agencies";
import { missionStatusLabels } from "@/lib/status";
import { formatDate } from "@/lib/format";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

type PageProps = { params: { id: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return missions.map((mission) => ({ id: mission.id }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const mission = getMission(params.id);
  if (!mission) return { title: "Mission not found" };
  return {
    title: `${mission.name} — mission record`,
    description: mission.summary.slice(0, 180),
  };
}

export default function MissionPage({ params }: PageProps) {
  const mission = getMission(params.id);
  if (!mission) notFound();
  const locale = getLocale();

  const artifacts = getArtifactsByIds(mission.artifactIds);
  const agency = getAgencyForMission(mission);
  const index = missions.findIndex((entry) => entry.id === mission.id);
  const previous = index > 0 ? missions[index - 1] : undefined;
  const next =
    index >= 0 && index < missions.length - 1 ? missions[index + 1] : undefined;

  return (
    <article className="pb-16">
      <div className="brand-rule" />
      <div className="container-content pt-8">
        <nav aria-label="Breadcrumb" className="text-xs text-text-muted">
          <Link href="/museum" className="hover:text-white">
            Museum
          </Link>
          <span aria-hidden="true" className="px-1.5">
            /
          </span>
          <Link href="/museum/missions" className="hover:text-white">
            Missions
          </Link>
          <span aria-hidden="true" className="px-1.5">
            /
          </span>
          <span className="text-text-secondary">{mission.name}</span>
        </nav>

        <header className="mt-5 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-brand-violet/35 bg-brand-violet/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-violet">
              Mission
            </span>
            <StatusBadge kind="mission" status={mission.status} />
          </div>
          <h1 className="mt-4 text-balance text-3xl font-semibold leading-[1.08] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            <span className="text-accent">{mission.name}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
            {mission.summary}
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-text-muted">
            <span className="inline-flex items-center gap-1.5">
              <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
              {mission.destinationLabel}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarClock aria-hidden="true" className="h-3.5 w-3.5" />
              Launch {formatDate(mission.launchDate, "year")}
              {mission.endDate
                ? ` · End ${formatDate(mission.endDate, "year")}`
                : ""}
            </span>
            {agency ? (
              <Link
                href={`/museum/agencies/${agency.id}`}
                className="inline-flex items-center gap-1.5 hover:text-white"
              >
                Operated by {agency.shortName}
                <ArrowRight aria-hidden="true" className="h-3 w-3" />
              </Link>
            ) : null}
          </div>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <div className="min-w-0 space-y-10">
            <section aria-labelledby="objectives-heading">
              <h2
                id="objectives-heading"
                className="text-lg font-semibold tracking-tight text-text-primary"
              >
                Objectives
              </h2>
              <ul className="mt-3 space-y-2">
                {mission.objectives.map((objective) => (
                  <li
                    key={objective}
                    className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet"
                    />
                    {objective}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="achievements-heading">
              <h2
                id="achievements-heading"
                className="text-lg font-semibold tracking-tight text-text-primary"
              >
                What the mission achieved
              </h2>
              <ul className="mt-3 space-y-3">
                {mission.achievements.map((achievement) => (
                  <li
                    key={achievement}
                    className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm leading-relaxed text-text-secondary"
                  >
                    {achievement}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="artifacts-heading">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <h2
                  id="artifacts-heading"
                  className="text-lg font-semibold tracking-tight text-text-primary"
                >
                  Artifacts in this mission
                </h2>
                <p className="text-xs text-text-muted">
                  {mission.artifactIds.length} museum record
                  {mission.artifactIds.length === 1 ? "" : "s"}
                </p>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {artifacts.map((artifact) => (
                  <ArtifactCard key={artifact.id} artifact={artifact} />
                ))}
              </div>
            </section>

            <section aria-labelledby="status-heading">
              <h2
                id="status-heading"
                className="text-lg font-semibold tracking-tight text-text-primary"
              >
                How this status is derived
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {mission.statusNote}
              </p>
            </section>

            <section aria-labelledby="sources-heading">
              <h2
                id="sources-heading"
                className="text-lg font-semibold tracking-tight text-text-primary"
              >
                Sources
              </h2>
              <p className="mt-1.5 text-sm text-text-muted">
                Every source cited by the mission&apos;s artifacts. Last verified{" "}
                {mission.lastVerified}.
              </p>
              <div className="mt-4">
                <SourceList ids={mission.sourceIds} title="Mission sources" />
              </div>
            </section>

            <nav
              aria-label="Mission navigation"
              className="grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2"
            >
              {previous ? (
                <Link
                  href={`/museum/missions/${previous.id}`}
                  className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-brand-violet/40"
                >
                  <ArrowLeft
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-violet"
                  />
                  <span>
                    <span className="block text-[10px] uppercase tracking-[0.16em] text-text-muted">
                      Previous mission
                    </span>
                    <span className="mt-1 block text-sm font-medium text-text-primary">
                      {previous.name}
                    </span>
                  </span>
                </Link>
              ) : (
                <span aria-hidden="true" />
              )}
              {next ? (
                <Link
                  href={`/museum/missions/${next.id}`}
                  className="group flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-end transition-colors hover:border-brand-violet/40"
                >
                  <span>
                    <span className="block text-[10px] uppercase tracking-[0.16em] text-text-muted">
                      Next mission
                    </span>
                    <span className="mt-1 block text-sm font-medium text-text-primary">
                      {next.name}
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
                Mission facts
              </p>
              <dl className="mt-3 space-y-3 text-xs">
                <div>
                  <dt className="text-text-muted">Program</dt>
                  <dd className="mt-0.5 font-medium text-text-primary">
                    {mission.program || t(locale, "common.none")}
                  </dd>
                </div>
                <div>
                  <dt className="text-text-muted">Agency</dt>
                  <dd className="mt-0.5 font-medium text-text-primary">
                    {agency?.name ?? t(locale, "common.none")}
                  </dd>
                </div>
                <div>
                  <dt className="text-text-muted">Launch</dt>
                  <dd className="mt-0.5 font-mono tabular-nums text-text-primary">
                    {formatDate(mission.launchDate, "year")}
                  </dd>
                </div>
                <div>
                  <dt className="text-text-muted">Status</dt>
                  <dd className="mt-0.5 font-medium text-text-primary">
                    {missionStatusLabels[mission.status]}
                  </dd>
                </div>
              </dl>
            </div>
            {agency ? (
              <a
                href={agency.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-accent-bright hover:text-white"
              >
                {agency.shortName} website
                <ExternalLink aria-hidden="true" className="h-3 w-3" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : null}
          </aside>
        </div>
      </div>
    </article>
  );
}
