import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CircleDot,
  Clock,
  Cog,
  ExternalLink,
  FlaskConical,
  ImageOff,
  MapPin,
  Radio,
  Rocket,
  Scan,
  ShieldAlert,
} from "lucide-react";
import { ArtifactActions } from "@/components/artifacts/ArtifactActions";
import { ArtifactAnatomy } from "@/components/artifacts/ArtifactAnatomy";
import { ArtifactCard } from "@/components/artifacts/ArtifactCard";
import { ArtifactVisual } from "@/components/artifacts/ArtifactVisual";
import { BackButton } from "@/components/artifacts/BackButton";
import { LessonCard } from "@/components/academy/LessonCard";
import { AskGraverseButton } from "@/components/ask/AskGraverseButton";
import { AskGraverseScope } from "@/components/ask/AskGraverseScope";
import { CommunicationBadge } from "@/components/ui/CommunicationBadge";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  artifacts,
  getArtifact,
  getArtifacts,
  hardwareTypeSingular,
} from "@/data/artifacts";
import { getSources, sourceTypeLabels } from "@/data/sources";
import { getMissionByName } from "@/data/missions";
import { getAgency } from "@/data/space/agencies";
import { lessons } from "@/data/lessons";
import { eventTypeLabels } from "@/lib/status";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import {
  communicationStatusNote,
  deriveCommunicationStatus,
  freshnessFor,
} from "@/lib/mission-control";
import { formatDate } from "@/lib/format";
import type { Artifact } from "@/types/artifact";

type PageProps = { params: { id: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return artifacts.map((artifact) => ({ id: artifact.id }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const artifact = getArtifact(params.id);
  if (!artifact) {
    return { title: "Artifact not found" };
  }
  return {
    title: artifact.name,
    description: artifact.shortDescription,
    openGraph: {
      title: `${artifact.name} · GRAVERSE`,
      description: artifact.shortDescription,
      images: artifact.media
        ? [{ url: artifact.media.src, alt: artifact.media.alt }]
        : undefined,
    },
  };
}

const locationPrecisionLabels: Record<
  Artifact["location"]["precision"],
  string
> = {
  exact: "Documented location",
  approximate: "Approximate location",
  region: "Documented region",
  unknown: "Location not documented",
};

const journey = [
  "overview",
  "purpose",
  "journey",
  "science",
  "fate",
  "provenance",
  "communication",
  "technical",
  "anatomy",
  "media",
  "lessons",
  "related",
  "sources",
];

const journeyLabels: Record<string, string> = {
  overview: "Overview",
  purpose: "Mission purpose",
  journey: "The journey",
  science: "What we learned",
  fate: "What happened to it",
  provenance: "Provenance",
  communication: "Communication status",
  technical: "Technical details",
  anatomy: "Recorded anatomy",
  media: "Media and model",
  lessons: "Academy lessons",
  related: "Related records",
  sources: "Sources",
};

export default function ArtifactPage({ params }: PageProps) {
  const artifact = getArtifact(params.id);
  if (!artifact) notFound();
  const locale = getLocale();

  const sources = getSources(artifact.sourceIds);
  const related = getArtifacts(artifact.relatedIds);
  const mission = getMissionByName(artifact.missionName);
  const agency = mission ? getAgency(mission.agencyId) : undefined;
  const artifactIndex = artifacts.findIndex((entry) => entry.id === artifact.id);
  const previousArtifact =
    artifactIndex > 0 ? artifacts[artifactIndex - 1] : undefined;
  const nextArtifact =
    artifactIndex >= 0 && artifactIndex < artifacts.length - 1
      ? artifacts[artifactIndex + 1]
      : undefined;
  const relatedLessons = lessons.filter((lesson) =>
    lesson.artifactIds.includes(artifact.id)
  );
  const compareId =
    related[0]?.id ??
    artifacts.find((entry) => entry.id !== artifact.id)?.id ??
    artifact.id;
  const communication = deriveCommunicationStatus(artifact);
  const freshness = freshnessFor(artifact.lastVerified);

  const quickFacts = [
    artifact.launchDate
      ? { label: "Launch", value: formatDate(artifact.launchDate) }
      : null,
    artifact.arrivalDate
      ? {
          label:
            artifact.destinationGroup === "mars"
              ? "Arrival at Mars"
              : "Arrival / deployment",
          value: formatDate(artifact.arrivalDate),
        }
      : null,
    artifact.missionEndDate
      ? { label: "Mission end", value: formatDate(artifact.missionEndDate) }
      : null,
    artifact.lastContactDate
      ? { label: "Last contact", value: formatDate(artifact.lastContactDate) }
      : null,
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact));

  return (
    <article
      className="pb-16"
      data-destination={artifact.destinationGroup}
      data-artifact-atmosphere={artifact.destinationGroup}
    >
      {/* Pre-paint route atmosphere: the backdrop photograph follows the
          artifact's destination before first paint on direct loads. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `try{document.documentElement.dataset.atmosphere=${JSON.stringify(
            artifact.destinationGroup
          )}}catch(e){}`,
        }}
      />
      <div className="brand-rule" />
      <div className="container-content pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-text-muted">
              <li>
                <Link
                  href="/museum"
                  className="-my-1.5 inline-flex items-center py-1.5 hover:text-white"
                >
                  Museum
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href={`/explorer?mode=artifacts&destination=${artifact.destinationGroup}`}
                  className="-my-1.5 inline-flex items-center py-1.5 hover:text-white"
                >
                  {artifact.destination}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-text-secondary">{artifact.name}</li>
            </ol>
          </nav>
          <BackButton label={t(locale, "common.back")} />
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-brand-cyan/35 bg-brand-cyan/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-cyan">
                {hardwareTypeSingular[artifact.hardwareType]}
              </span>
              <span className="text-[11px] uppercase tracking-[0.16em] text-text-muted">
                {artifact.programName}
              </span>
            </div>

            <h1 className="mt-4 text-balance text-3xl font-semibold leading-[1.08] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              <span className="text-accent">{artifact.name}</span>
            </h1>
            <p className="mt-2 text-sm text-text-secondary">
              Mission:{" "}
              {mission ? (
                <Link
                  href={`/museum/missions/${mission.id}`}
                  className="font-medium text-accent-bright hover:text-white"
                >
                  {artifact.missionName}
                </Link>
              ) : (
                <span className="font-medium text-text-primary">
                  {artifact.missionName}
                </span>
              )}
              {agency ? (
                <>
                  {" · "}
                  <Link
                    href={`/museum/agencies/${agency.id}`}
                    className="text-accent-bright hover:text-white"
                  >
                    {agency.shortName}
                  </Link>
                </>
              ) : null}
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
              {artifact.shortDescription}
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              <StatusBadge kind="mission" status={artifact.missionStatus} />
              <StatusBadge kind="hardware" status={artifact.hardwareStatus} />
            </div>

            <ArtifactActions
              artifactId={artifact.id}
              artifactName={artifact.name}
              compareId={compareId}
            />

            <AskGraverseScope
              context={{
                kind: "artifact",
                id: artifact.id,
                title: artifact.name,
                subtitle: `${artifact.missionName} · ${artifact.destination}`,
                href: `/museum/${artifact.id}`,
              }}
            >
              <div className="mt-3">
                <AskGraverseButton locale={locale} />
              </div>
            </AskGraverseScope>

            <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:grid-cols-3">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.16em] text-text-muted">
                  Destination
                </dt>
                <dd className="mt-1 flex items-center gap-1.5 text-sm font-medium text-text-primary">
                  <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-accent-bright" />
                  {artifact.destination}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.16em] text-text-muted">
                  Location
                </dt>
                <dd className="mt-1 text-sm font-medium text-text-primary">
                  {artifact.location.precision === "unknown"
                    ? "Not documented"
                    : artifact.location.locationName}
                </dd>
              </div>
              {quickFacts.slice(0, 4).map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-text-muted">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 font-mono text-sm tabular-nums text-text-primary">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="min-w-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/12 bg-bg-elevated">
              <ArtifactVisual
                media={artifact.media}
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
              />
            </div>
            {artifact.media ? (
              <figcaption className="mt-3 space-y-1.5 text-xs leading-relaxed text-text-muted">
                <p className="text-text-secondary">{artifact.media.caption}</p>
                <p>
                  Credit: {artifact.media.credit}
                  {artifact.media.isIllustration
                    ? " · Artist's concept, not a photograph of the hardware"
                    : ""}
                </p>
                {artifact.media.nasaId ? (
                  <a
                    href={artifact.media.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-accent-bright hover:text-white"
                  >
                    NASA image record {artifact.media.nasaId}
                    <ExternalLink aria-hidden="true" className="h-3 w-3" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                ) : (
                  <a
                    href={artifact.media.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-accent-bright hover:text-white"
                  >
                    NASA image source
                    <ExternalLink aria-hidden="true" className="h-3 w-3" />
                  </a>
                )}
              </figcaption>
            ) : (
              <figcaption className="mt-3 flex items-start gap-2 text-xs text-text-muted">
                <ImageOff aria-hidden="true" className="mt-0.5 h-3.5 w-3.5" />
                No NASA image is included in this record.
              </figcaption>
            )}
          </figure>
        </div>
      </div>

      <div className="container-content mt-10">
        <section
          id="communication"
          aria-labelledby="status-heading"
          className="scroll-mt-24 rounded-2xl border border-white/10 bg-bg-elevated/60 p-4 sm:p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2
              id="status-heading"
              className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-text-secondary"
            >
              <ShieldAlert aria-hidden="true" className="h-4 w-4 text-accent-bright" />
              Two different questions
            </h2>
            <p className="text-xs text-text-muted">
              Mission status and hardware status are separate fields
            </p>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-text-primary">
                  <CircleDot aria-hidden="true" className="h-3.5 w-3.5 text-accent-bright" />
                  Mission status
                </p>
                <StatusBadge kind="mission" status={artifact.missionStatus} compact />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {artifact.missionStatusOriginal}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-text-primary">
                  <Radio aria-hidden="true" className="h-3.5 w-3.5 text-accent-bright" />
                  Hardware status
                </p>
                <StatusBadge kind="hardware" status={artifact.hardwareStatus} compact />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {artifact.hardwareStatusOriginal}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-text-primary">
                  <Radio aria-hidden="true" className="h-3.5 w-3.5 text-accent-bright" />
                  Communication
                </p>
                <CommunicationBadge status={communication} compact locale={locale} />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {communicationStatusNote(artifact)}
              </p>
              <p className="mt-2 text-[11px] leading-relaxed text-text-muted">
                {t(locale, "common.derivedNote")} Record checked{" "}
                {artifact.lastVerified} ({freshness.label.toLowerCase()}).
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="container-content mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start">
        <div className="min-w-0 space-y-12">
          <section id="overview" className="scroll-mt-24">
            <SectionLabel index="A" title="What is it?" />
            <p className="mt-4 max-w-3xl text-[15px] leading-7 text-text-secondary">
              {artifact.overview}
            </p>
          </section>

          <section id="purpose" className="scroll-mt-24">
            <SectionLabel index="B" title="Why was it sent?" />
            <p className="mt-4 max-w-3xl text-[15px] leading-7 text-text-secondary">
              {artifact.scientificPurpose}
            </p>
          </section>

          <section id="journey" className="scroll-mt-24">
            <SectionLabel index="C" title="What happened?" />
            <p className="mt-2 text-sm text-text-muted">
              Key events as recorded by NASA. Event types and dates are shown as
              stated; the defining milestone is marked.
            </p>
            <ol className="relative mt-6 space-y-5 border-s border-white/12 ps-6">
              {artifact.timelineEvents.map((event) => {
                const isPrimary = event.id === artifact.primaryMilestone.id;
                return (
                  <li key={event.id} className="relative">
                    <span
                      aria-hidden="true"
                      className={`absolute -start-[31px] top-1.5 h-3 w-3 rounded-full border ${
                        isPrimary
                          ? "border-accent-bright bg-accent-bright shadow-[0_0_12px_rgba(131,215,255,0.7)]"
                          : "border-white/40 bg-[#0a1526]"
                      }`}
                    />
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="font-mono text-[11px] tabular-nums text-accent-bright">
                        {event.dateLabel}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-text-muted">
                        {eventTypeLabels[event.type]}
                      </span>
                      {isPrimary ? (
                        <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent-bright">
                          Defining milestone
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-1 text-sm font-semibold text-text-primary">
                      {event.label}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm leading-relaxed text-text-secondary">
                      {event.description}
                    </p>
                  </li>
                );
              })}
            </ol>
          </section>

          <section id="science" className="scroll-mt-24">
            <SectionLabel index="D" title="What did we learn?" />
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {artifact.scientificContributions.map((contribution) => {
                const Icon =
                  contribution.kind === "science" ? FlaskConical : Cog;
                return (
                  <div
                    key={contribution.title}
                    className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
                  >
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-accent/25 bg-accent/10 text-accent-bright">
                        <Icon aria-hidden="true" className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.16em] text-text-muted">
                        {contribution.kind === "science"
                          ? "Scientific result"
                          : "Engineering result"}
                      </span>
                    </div>
                    <h3 className="mt-3 text-sm font-semibold text-text-primary">
                      {contribution.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                      {contribution.summary}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="fate" className="scroll-mt-24">
            <SectionLabel index="E" title="What happened to the hardware?" />
            <div className="mt-4 rounded-2xl border border-accent/25 bg-surface p-5">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge
                  kind="hardware"
                  status={artifact.hardwareStatus}
                  compact
                />
                <span className="text-[11px] text-text-muted">
                  Last verified {artifact.lastVerified}
                </span>
              </div>
              <p className="mt-3 max-w-3xl text-[15px] leading-7 text-text-primary">
                {artifact.fate}
              </p>
              <div className="mt-4 flex items-start gap-2 border-t border-white/10 pt-4 text-sm text-text-secondary">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent-bright"
                />
                <div>
                  <p className="font-medium text-text-primary">
                    {artifact.location.body} · {artifact.location.locationName}
                  </p>
                  <p className="mt-0.5 text-xs text-text-muted">
                    {locationPrecisionLabels[artifact.location.precision]}
                    {artifact.location.note ? ` — ${artifact.location.note}` : ""}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section
            id="provenance"
            aria-labelledby="provenance-heading"
            className="scroll-mt-24"
          >
            <SectionLabel index="E2" title="Provenance" />
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <h3
                id="provenance-heading"
                className="text-sm font-semibold text-text-primary"
              >
                How this record is sourced
              </h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-text-secondary">
                This page is compiled from{" "}
                {sources.length === 1
                  ? "one public record"
                  : `${sources.length} public records`}
                , last checked on {artifact.lastVerified}. Dates, locations and
                status wording are taken from those records. The normalized
                status labels are a GRAVERSE convenience; the original wording
                is shown above and is never silently rewritten.
              </p>
              <dl className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-text-muted">
                    Mission
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-text-primary">
                    {mission ? (
                      <Link
                        href={`/museum/missions/${mission.id}`}
                        className="hover:text-accent-bright"
                      >
                        {mission.name}
                      </Link>
                    ) : (
                      artifact.missionName
                    )}
                  </dd>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-text-muted">
                    Agency
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-text-primary">
                    {agency ? (
                      <Link
                        href={`/museum/agencies/${agency.id}`}
                        className="hover:text-accent-bright"
                      >
                        {agency.shortName}
                      </Link>
                    ) : (
                      t(locale, "common.none")
                    )}
                  </dd>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-text-muted">
                    Source records
                  </dt>
                  <dd className="mt-1 font-mono text-sm tabular-nums text-text-primary">
                    {sources.length}
                  </dd>
                </div>
              </dl>
              <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-text-muted">
                <ShieldAlert
                  aria-hidden="true"
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning"
                />
                {artifact.dataNotes.length
                  ? "Uncertainty notes for this record are listed with the sources below."
                  : "No field in this record is marked uncertain. Status and distance figures can still change as sources are updated."}
              </p>
            </div>
          </section>

          <section id="technical" className="scroll-mt-24">
            <SectionLabel index="F" title="Technical details" />
            <details className="group mt-4 rounded-xl border border-white/10 bg-white/[0.02]">
              <summary className="flex items-center justify-between gap-3 px-4 py-3.5 text-sm font-medium text-text-primary">
                Show the recorded specifications
                <span
                  aria-hidden="true"
                  className="disclosure-icon text-lg leading-none text-accent-bright transition-transform"
                >
                  +
                </span>
              </summary>
              <dl className="grid gap-x-6 gap-y-3 border-t border-white/10 px-4 py-4 sm:grid-cols-2">
                {artifact.technicalDetails.map((detail) => (
                  <div key={detail.label}>
                    <dt className="text-[10px] uppercase tracking-[0.16em] text-text-muted">
                      {detail.label}
                    </dt>
                    <dd className="mt-0.5 text-sm text-text-secondary">
                      {detail.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </details>
          </section>

          <section id="anatomy" className="scroll-mt-24">
            <SectionLabel index="F2" title="Recorded anatomy" />
            <ArtifactAnatomy artifact={artifact} />
          </section>

          <section id="media" className="scroll-mt-24">
            <SectionLabel index="G" title="Media and model" />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <p className="flex items-center gap-2 text-sm font-medium text-text-primary">
                  <Scan aria-hidden="true" className="h-4 w-4 text-accent-bright" />
                  NASA image
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                  {artifact.media
                    ? `${artifact.media.isIllustration ? "An artist's concept" : "A NASA image"} is shown at the top of this record. The caption and credit are recorded with the image.`
                    : "No image is available in this record."}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <p className="flex items-center gap-2 text-sm font-medium text-text-primary">
                  <Rocket aria-hidden="true" className="h-4 w-4 text-text-muted" />
                  3D model
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                  3D model unavailable for this artifact. A NASA image is shown
                  instead; no model geometry was invented for this build.
                </p>
              </div>
            </div>
          </section>

          <section id="lessons" className="scroll-mt-24">
            <SectionLabel index="H" title="Academy lessons" />
            {relatedLessons.length ? (
              <>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
                  Lessons that use this artifact record. They add explanation and
                  sequencing, not new facts.
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {relatedLessons.map((lesson) => (
                    <LessonCard key={lesson.id} lesson={lesson} />
                  ))}
                </div>
              </>
            ) : (
              <p className="mt-4 text-sm text-text-muted">
                No Academy lesson currently uses this artifact as a teaching
                example.
              </p>
            )}
          </section>

          <section id="related" className="scroll-mt-24">
            <SectionLabel index="I" title="Related records" />
            {related.length ? (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {related.map((relatedArtifact) => (
                  <ArtifactCard
                    key={relatedArtifact.id}
                    artifact={relatedArtifact}
                  />
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-text-muted">
                No explicit related records are listed for this artifact.
              </p>
            )}
          </section>

          <section id="sources" className="scroll-mt-24">
            <SectionLabel index="J" title="Sources and verification" />
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
              Facts were checked against these public NASA records on{" "}
              {artifact.lastVerified}. Links open in a new tab. Where a field was
              not documented, this record says so rather than guessing.
            </p>
            <ul className="mt-5 space-y-3">
              {sources.map((source) => (
                <li
                  key={source.id}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-text-muted">
                      {sourceTypeLabels[source.type]}
                    </span>
                    <span className="text-[10px] text-text-muted">
                      Accessed {source.accessedAt}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm font-medium text-text-primary">
                    {source.organization} — {source.title}
                  </p>
                  {source.notes ? (
                    <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                      {source.notes}
                    </p>
                  ) : null}
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 break-all text-xs text-accent-bright hover:text-white"
                  >
                    {source.url}
                    <ExternalLink aria-hidden="true" className="h-3 w-3 shrink-0" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>

            {artifact.dataNotes.length ? (
              <div className="mt-5 rounded-xl border border-warning/25 bg-warning/[0.06] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FFD79A]">
                  Data notes and uncertainty
                </p>
                <ul className="mt-2 space-y-1.5">
                  {artifact.dataNotes.map((note) => (
                    <li
                      key={note}
                      className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-warning"
                      />
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>

          <nav aria-label="Artifact navigation" className="border-t border-white/10 pt-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                Artifact {artifactIndex + 1} of {artifacts.length}
              </p>
              <p className="text-xs text-text-muted">
                Chronological collection order
              </p>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {previousArtifact ? (
                <Link
                  href={`/museum/${previousArtifact.id}`}
                  className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-accent/40 hover:bg-white/[0.04]"
                >
                  <ArrowLeft
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent-bright transition-transform group-hover:-translate-x-0.5"
                  />
                  <span className="min-w-0">
                    <span className="block text-[10px] uppercase tracking-[0.16em] text-text-muted">
                      Previous artifact
                    </span>
                    <span className="mt-1 block text-sm font-medium leading-snug text-text-primary">
                      {previousArtifact.name}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-text-muted">
                      {previousArtifact.missionName}
                    </span>
                  </span>
                </Link>
              ) : (
                <span aria-hidden="true" className="hidden sm:block" />
              )}

              {nextArtifact ? (
                <Link
                  href={`/museum/${nextArtifact.id}`}
                  className="group flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-end transition-colors hover:border-accent/40 hover:bg-white/[0.04]"
                >
                  <span className="min-w-0">
                    <span className="block text-[10px] uppercase tracking-[0.16em] text-text-muted">
                      Next artifact
                    </span>
                    <span className="mt-1 block text-sm font-medium leading-snug text-text-primary">
                      {nextArtifact.name}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-text-muted">
                      {nextArtifact.missionName}
                    </span>
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent-bright transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              ) : null}
            </div>
          </nav>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6">
            <BackButton label={t(locale, "common.back")} />
            <Link
              href="/explorer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-bright hover:text-white"
            >
              Continue exploring
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24">
          <nav
            aria-label="On this page"
            className="rounded-xl border border-white/10 bg-bg-elevated/60 p-4"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">
              On this page
            </p>
            <ul className="mt-3 space-y-1">
              {journey.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="block rounded-md px-2 py-1.5 text-xs text-text-secondary transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {journeyLabels[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-4 rounded-xl border border-white/10 bg-bg-elevated/60 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">
              Quick facts
            </p>
            <dl className="mt-3 space-y-3 text-xs">
              <div>
                <dt className="text-text-muted">Hardware</dt>
                <dd className="mt-0.5 font-medium text-text-primary">
                  {hardwareTypeSingular[artifact.hardwareType]}
                </dd>
              </div>
              <div>
                <dt className="text-text-muted">Destination</dt>
                <dd className="mt-0.5 font-medium text-text-primary">
                  {artifact.destination}
                </dd>
              </div>
              {quickFacts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-text-muted">{fact.label}</dt>
                  <dd className="mt-0.5 font-mono tabular-nums text-text-primary">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-bg-elevated/60 p-4 text-xs leading-relaxed text-text-muted">
            <p className="flex items-center gap-1.5 font-medium text-text-secondary">
              <Clock aria-hidden="true" className="h-3.5 w-3.5" />
              Verified {artifact.lastVerified}
            </p>
            <p className="mt-2">
              Status and distance figures can change. The source list is the
              record of what this page is based on.
            </p>
          </div>
        </aside>
      </div>
    </article>
  );
}

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-mono text-[10px] text-accent-bright">
        {index}
      </span>
      <h2 className="text-xl font-semibold tracking-tight text-text-primary sm:text-2xl">
        {title}
      </h2>
    </div>
  );
}
