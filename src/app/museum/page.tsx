import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, CircleDot, Radio, Sparkles } from "lucide-react";
import { ArtifactCard } from "@/components/artifacts/ArtifactCard";
import { MuseumGallerySection } from "@/components/museum/MuseumGallerySection";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  artifacts,
  countByDestination,
  destinationMeta,
  destinationOrder,
  museumHighlights,
} from "@/data/artifacts";
import {
  hardwareStatusLabels,
  missionStatusLabels,
} from "@/lib/status";
import { pluralize } from "@/lib/format";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import { galleryHardwareLabels } from "@/lib/gallery";
import type { HardwareStatus, MissionStatus } from "@/types/artifact";
import type { GalleryItem } from "@/types/gallery";

export const metadata: Metadata = {
  title: "The museum collection",
  description:
    "Browse all 33 source-linked NASA artifacts in the GRAVERSE museum, grouped by destination and with mission and hardware status shown separately.",
};

const missionOrder: MissionStatus[] = [
  "ongoing",
  "completed",
  "ended",
  "lost-contact",
  "unknown",
];

const hardwareOrder: HardwareStatus[] = [
  "operating",
  "still-traveling",
  "inactive",
  "no-longer-communicating",
  "destroyed",
  "impacted",
  "unknown",
];

export default function MuseumPage() {
  const locale = getLocale();
  const counts = countByDestination();
  const featuredIds = destinationOrder.flatMap(
    (destination) => museumHighlights[destination]
  );
  const galleryItems: GalleryItem[] = artifacts.map((artifact) => ({
    id: artifact.id,
    name: artifact.name,
    missionName: artifact.missionName,
    programName: artifact.programName,
    destination: artifact.destination,
    destinationGroup: artifact.destinationGroup,
    hardwareType: artifact.hardwareType,
    dateLabel: artifact.primaryMilestone.dateLabel,
    year: artifact.primaryMilestone.date.slice(0, 4),
    sortDate: artifact.launchDate ?? artifact.primaryMilestone.date,
    missionStatus: artifact.missionStatus,
    hardwareStatus: artifact.hardwareStatus,
    description: artifact.shortDescription,
    overview: artifact.overview,
    fate: artifact.fate,
    contributions: artifact.scientificContributions.map((entry) => ({
      title: entry.title,
      summary: entry.summary,
    })),
    facts: [
      {
        label: t(locale, "gallery.factType"),
        value: galleryHardwareLabels[artifact.hardwareType],
      },
      { label: t(locale, "gallery.factProgram"), value: artifact.programName },
      { label: t(locale, "gallery.factMission"), value: artifact.missionName },
      {
        label: t(locale, "gallery.factDestination"),
        value: artifact.destination,
      },
      ...artifact.technicalDetails.slice(0, 2).map((detail) => ({
        label: detail.label,
        value: detail.value,
      })),
    ],
    image: artifact.media?.src ?? `/images/gallery/${artifact.id}.webp`,
    alt: artifact.media?.alt ?? `Exhibit image for ${artifact.name}`,
    isIllustration: artifact.media?.isIllustration ?? false,
    texture: `/images/gallery/${artifact.id}.webp`,
  }));
  const missionCounts = missionOrder
    .map((status) => ({
      status,
      count: artifacts.filter((artifact) => artifact.missionStatus === status)
        .length,
    }))
    .filter((entry) => entry.count > 0);
  const hardwareCounts = hardwareOrder
    .map((status) => ({
      status,
      count: artifacts.filter((artifact) => artifact.hardwareStatus === status)
        .length,
    }))
    .filter((entry) => entry.count > 0);

  return (
    <>
      <section className="relative overflow-hidden pb-14 pt-12 sm:pt-16">
        <div className="museum-hero-photo" aria-hidden="true">
          <Image
            src="/images/moon.webp"
            alt=""
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(94,234,212,0.16),transparent_66%)] blur-2xl" />
          <div className="absolute left-1/2 top-[-10rem] h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(43,108,145,0.2),transparent_66%)] blur-2xl" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-bg/50 to-bg"
        />
        <div className="container-content relative">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="eyebrow">The museum</p>
            <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
              The collection,{" "}
              <span className="text-accent">artifact by artifact</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base">
              Each record combines one object with one mission story: what it
              was built to do, what happened during the mission, what it
              contributed, and what is actually documented about the hardware
              today.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/explorer"
                className="btn-primary inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold"
              >
                Open the timeline
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="btn-secondary inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold"
              >
                <BookOpen aria-hidden="true" className="h-4 w-4" />
                How the data works
              </Link>
            </div>
            <nav aria-label="Museum indexes" className="mt-5 flex flex-wrap gap-2">
              {[
                { href: "/museum/missions", label: "Missions" },
                { href: "/museum/agencies", label: "Agencies" },
                { href: "/sources", label: "Source registry" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-text-secondary transition-colors hover:border-brand-teal/40 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="glass corner-frame relative overflow-hidden rounded-2xl p-5">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(94,234,212,0.16),transparent_68%)]"
            />
            <div className="relative flex items-center justify-between gap-4">
              <p className="meta-label text-text-secondary">
                Collection at a glance
              </p>
              <span className="rounded-full border border-brand-violet/30 bg-brand-violet/10 px-2.5 py-1 font-mono text-xs text-brand-violet">
                {artifacts.length} records
              </span>
            </div>
            <dl className="mt-5 grid grid-cols-3 gap-3 border-b border-white/10 pb-5">
              {destinationOrder.map((destination) => (
                <div key={destination} className="data-tile">
                  <dt className="meta-label flex items-center gap-1.5">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: destinationMeta[destination].accent }}
                    />
                    {destinationMeta[destination].name}
                  </dt>
                  <dd
                    className="mt-1 font-mono text-2xl tabular-nums"
                    style={{ color: destinationMeta[destination].accent }}
                  >
                    {counts[destination]}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 space-y-4">
              <div>
                <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                  <CircleDot aria-hidden="true" className="h-3 w-3" />
                  Mission status
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {missionCounts.map(({ status, count }) => (
                    <span
                      key={status}
                      className="rounded-full border border-white/12 bg-white/[0.03] px-2 py-1 text-[11px] text-text-secondary"
                    >
                      {missionStatusLabels[status]}{" "}
                      <span className="font-mono text-text-primary">{count}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                  <Radio aria-hidden="true" className="h-3 w-3" />
                  Hardware status
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {hardwareCounts.map(({ status, count }) => (
                    <span
                      key={status}
                      className="rounded-full border border-white/12 bg-white/[0.03] px-2 py-1 text-[11px] text-text-secondary"
                    >
                      {hardwareStatusLabels[status]}{" "}
                      <span className="font-mono text-text-primary">{count}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      <MuseumGallerySection
        items={galleryItems}
        featuredIds={featuredIds}
        locale={locale}
      />

      <section className="container-content pb-6">
        <div className="relative overflow-hidden rounded-2xl border border-brand-teal/20 bg-surface p-5 sm:p-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(94,234,212,0.12),transparent_70%)]"
          />
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-lg font-semibold text-white">
                Why every record shows two statuses
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                A mission can be complete while its hardware is still intact, or
                a spacecraft can stop communicating while its physical condition
                remains undocumented. GRAVERSE keeps those facts separate and
                names the uncertainty instead of filling it in.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                <p className="text-[10px] uppercase tracking-[0.16em] text-text-muted">
                  Example
                </p>
                <StatusBadge
                  kind="mission"
                  status="completed"
                  className="mt-1.5"
                />
              </div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                <p className="text-[10px] uppercase tracking-[0.16em] text-text-muted">
                  Not the same thing
                </p>
                <StatusBadge kind="hardware" status="unknown" className="mt-1.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-content pb-6">
        <div className="relative overflow-hidden rounded-2xl border border-brand-amber/25 bg-surface p-5 sm:p-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(242,179,61,0.14),transparent_70%)]"
          />
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow flex items-center gap-2">
                <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
                Space Academy · Ages 5–12
              </p>
              <h2 className="mt-2 text-lg font-semibold text-white">
                Visiting with a young explorer?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                Space Academy turns the same verified records into age-banded
                lessons, guided journeys, quizzes and a robot lab — split into
                ages 5–7, 8–9 and 10–12.
              </p>
            </div>
            <Link
              href="/academy"
              className="btn-primary inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold"
            >
              Open Space Academy
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <div id="collection" className="relative">
        {destinationOrder.map((destination) => {
        const meta = destinationMeta[destination];
        const list = artifacts.filter(
          (artifact) => artifact.destinationGroup === destination
        );
        return (
          <section key={destination} className="container-content py-10 sm:py-12">
            <Reveal>
            <SectionHeading
              eyebrow={`${pluralize(list.length, "artifact")} · ${meta.name}`}
              title={meta.name}
              description={meta.description}
              action={
                <Link
                  href={`/explorer?mode=artifacts&destination=${destination}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-accent/50 hover:text-white"
                >
                  Filter Explore by {meta.name}
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                </Link>
              }
            />
            </Reveal>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {list.map((artifact) => (
                <ArtifactCard key={artifact.id} artifact={artifact} />
              ))}
            </div>
          </section>
        );
      })}
      </div>
    </>
  );
}
