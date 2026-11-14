import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Bot,
  CalendarClock,
  CircleHelp,
  Compass,
  Database,
  FlaskConical,
  Heart,
  Landmark,
  MapPin,
  Microscope,
  PackageOpen,
  Plane,
  Radio,
  Satellite,
  Search,
  Sparkles,
  ScrollText,
  Truck,
  Wrench,
} from "lucide-react";
import { ArtifactCard } from "@/components/artifacts/ArtifactCard";
import { ArtifactVisual } from "@/components/artifacts/ArtifactVisual";
import { SpaceCanvas } from "@/components/three/SpaceCanvas";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  artifacts,
  countByDestination,
  destinationMeta,
  destinationOrder,
  featuredIds,
  getArtifacts,
} from "@/data/artifacts";
import { experiences } from "@/lib/experience";
import { pluralize } from "@/lib/format";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "GRAVERSE — Explore the history of space exploration",
  description:
    "Discover the machines that shaped our understanding of space. Explore NASA hardware across the Moon, Mars and deep space through an interactive timeline and source-linked museum.",
};

const popularSearches = ["Perseverance", "Apollo 11", "Voyager 1", "Ingenuity"];

/** Entrance choreography helper: stagger index + optional base delay (ms). */
const enter = (i: number, base = 0): CSSProperties =>
  ({ "--enter-i": i, "--enter-base": `${base}ms` }) as CSSProperties;

export default function HomePage() {
  const locale = getLocale();
  const featured = getArtifacts(featuredIds);
  const destinationCounts = countByDestination();
  const decadeCount = new Set(
    artifacts.map((artifact) =>
      Math.floor(Number(artifact.primaryMilestone.date.slice(0, 4)) / 10) * 10
    )
  ).size;

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="hero-photo" aria-hidden="true">
          <Image
            src="/images/destination-deep-space.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-[-22rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(43,90,148,0.26),transparent_64%)] blur-2xl" />
          <div className="absolute -left-24 top-24 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(94,234,212,0.12),transparent_66%)] blur-2xl" />
          <div className="absolute right-[-10rem] top-20 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(43,108,145,0.2),transparent_65%)] blur-2xl" />
        </div>
        <div className="horizon opacity-25" aria-hidden="true" />
        {/* Soft landing into the page so the photograph has no hard edge. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent via-bg/60 to-bg"
        />

        <div className="container-content relative grid gap-12 pb-24 pt-14 sm:pt-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-16 lg:pb-28 lg:pt-24">
          <div className="max-w-2xl">
            <p
              className="eyebrow enter flex items-center gap-2"
              style={enter(0)}
            >
              <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
              {t(locale, "home.eyebrow")}
            </p>
            <h1
              className="enter mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-text-primary sm:text-5xl lg:text-6xl"
              style={enter(1)}
            >
              {t(locale, "home.titleLead")}{" "}
              <span className="text-accent">{t(locale, "home.titleAccent")}</span>{" "}
              {t(locale, "home.titleTail")}
            </h1>
            <p
              className="enter mt-6 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg"
              style={enter(2)}
            >
              {t(locale, "home.subtitle")}
            </p>

            {/* One primary action, one secondary action. */}
            <div
              className="enter mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={enter(3)}
            >
              <Link
                href="/explorer"
                className="btn-primary inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold"
              >
                {t(locale, "home.exploreTimeline")}
                <Compass aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                href="/museum"
                className="btn-secondary inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold"
              >
                {t(locale, "home.browseMuseum")}
                <BookOpen aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>

            {/* Utility: the archive query line. */}
            <form
              action="/search"
              role="search"
              className="enter mt-6 flex flex-col gap-2 sm:flex-row"
              style={enter(4)}
            >
              <label htmlFor="home-search" className="sr-only">
                {t(locale, "common.searchHint")}
              </label>
              <div className="relative flex-1">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
                />
                <input
                  id="home-search"
                  name="q"
                  type="search"
                  placeholder={t(locale, "home.searchPlaceholder")}
                  className="h-11 w-full rounded-full border border-white/10 bg-white/[0.04] ps-11 pe-4 text-sm text-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] placeholder:text-text-muted focus:border-accent/60 focus:bg-white/[0.07] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="btn-secondary inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium"
              >
                {t(locale, "home.searchButton")}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </form>

            <div
              className="enter mt-3 flex flex-wrap items-center gap-2 text-xs text-text-muted"
              style={enter(5)}
            >
              <span className="meta-label">{t(locale, "home.try")}</span>
              {popularSearches.map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[11px] tracking-wide text-text-secondary transition-colors hover:border-accent/40 hover:text-white"
                >
                  {term}
                </Link>
              ))}
            </div>

            {/* Collection telemetry. */}
            <dl
              className="enter mt-10 grid max-w-lg grid-cols-3 gap-3 border-t border-white/10 pt-6"
              style={enter(6)}
            >
              <div className="data-tile">
                <dt className="meta-label">
                  {t(locale, "home.artifacts")}
                </dt>
                <dd className="mt-1 font-mono text-2xl tabular-nums text-brand-cyan">
                  {artifacts.length}
                </dd>
              </div>
              <div className="data-tile">
                <dt className="meta-label">
                  {t(locale, "home.destinations")}
                </dt>
                <dd className="mt-1 font-mono text-2xl tabular-nums text-brand-amber">
                  {destinationOrder.length}
                </dd>
              </div>
              <div className="data-tile">
                <dt className="meta-label">
                  {t(locale, "home.decades")}
                </dt>
                <dd className="mt-1 font-mono text-2xl tabular-nums text-brand-teal">
                  {decadeCount}
                </dd>
              </div>
            </dl>
          </div>

          {/* The featured artifact: a cinematic telemetry panel. */}
          <div
            className="enter relative mx-auto w-full max-w-xl lg:max-w-none"
            style={enter(2, 180)}
          >
            <div
              aria-hidden="true"
              className="absolute -inset-8 rounded-[2rem] bg-[radial-gradient(circle_at_50%_40%,rgba(94,234,212,0.14),transparent_62%)]"
            />
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2"
            >
              <div className="h-full w-full animate-[spin_80s_linear_infinite] rounded-full border border-brand-cyan/10" />
            </div>
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[104%] w-[104%] -translate-x-1/2 -translate-y-1/2"
            >
              <div className="h-full w-full animate-[spin-reverse_120s_linear_infinite] rounded-full border border-dashed border-brand-teal/15" />
            </div>
            <SpaceCanvas />

            <div className="corner-frame relative overflow-hidden rounded-[1.6rem] border border-brand-teal/25 bg-bg-elevated/80 p-2 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.95)] backdrop-blur">
              <div className="relative aspect-[4/3.2] overflow-hidden rounded-[1.2rem]">
                <ArtifactVisual
                  media={featured[0]?.media}
                  priority
                  sizes="(min-width: 1024px) 46vw, 92vw"
                />
                <span className="scan-line" aria-hidden="true" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040a14] via-transparent to-transparent" />

                <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2">
                  <span className="telemetry-chip">
                    <span className="telemetry-chip__dot" aria-hidden="true" />
                    Featured record
                  </span>
                  <span className="telemetry-chip" style={{ "--telemetry-accent": "#f2b33d" } as CSSProperties}>
                    01 / {artifacts.length}
                  </span>
                </div>

                <div className="absolute inset-x-4 bottom-4 flex flex-col gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    <StatusBadge
                      kind="mission"
                      status={featured[0]?.missionStatus ?? "completed"}
                      compact
                    />
                    <StatusBadge
                      kind="hardware"
                      status={featured[0]?.hardwareStatus ?? "unknown"}
                      compact
                    />
                  </div>
                  <p className="meta-label text-accent-bright">
                    {featured[0]
                      ? `${featured[0].primaryMilestone.dateLabel} · ${featured[0].destination}`
                      : "Moon"}
                  </p>
                  <p className="text-lg font-semibold text-white">
                    {featured[0]?.name ?? "Apollo 11 Lunar Module"}
                  </p>
                </div>
              </div>
            </div>

            <div className="glass corner-frame absolute start-[-0.75rem] top-[38%] hidden rounded-xl px-3.5 py-3 shadow-card sm:block lg:start-[-2.5rem]">
              <p className="meta-label flex items-center gap-1.5">
                <CalendarClock aria-hidden="true" className="h-3 w-3" />
                First landing
              </p>
              <p className="mt-1 font-mono text-xl tabular-nums text-white">
                1969
              </p>
            </div>

            <div className="glass corner-frame absolute end-[-0.5rem] bottom-10 hidden rounded-xl px-3.5 py-3 shadow-card sm:block lg:end-[-1.5rem]">
              <p className="meta-label flex items-center gap-1.5">
                <Database aria-hidden="true" className="h-3 w-3" />
                Source-linked
              </p>
              <p className="mt-1 text-sm font-medium text-white">
                Every artifact
              </p>
            </div>
          </div>
        </div>

        {/* Scroll cue for the demo narrative. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center lg:flex"
        >
          <span className="meta-label flex items-center gap-2 text-text-muted">
            Scroll
            <span className="block h-px w-10 bg-gradient-to-r from-brand-teal/60 to-transparent" />
          </span>
        </div>
      </section>

      <section className="container-content pt-14 sm:pt-16">
        <SectionHeading
          eyebrow="Four experiences, one collection"
          title="Choose how you want to explore"
          description="The same verified records, arranged for different questions. Learn the basics, read the full story, or investigate the data."
        />
        <ul className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
          {experiences.map((experience, index) => {
            const Icon =
              experience.id === "academy"
                ? BookOpen
                : experience.id === "museum"
                  ? Landmark
                  : experience.id === "stories"
                    ? Sparkles
                    : Compass;
            return (
              <li key={experience.id}>
                <Link
                  href={experience.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 focus-visible:-translate-y-1"
                  style={{
                    borderColor: `${experience.accent}40`,
                    background: "rgba(21, 32, 55, 0.9)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-0.5 opacity-70 transition-opacity group-hover:opacity-100"
                    style={{ backgroundColor: experience.accent }}
                  />
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105"
                      style={{
                        borderColor: `${experience.accent}45`,
                        backgroundColor: `${experience.accent}18`,
                        color: experience.accent,
                      }}
                    >
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span
                      className="index-number"
                      aria-hidden="true"
                    >
                      0{index + 1} · {experience.eyebrow}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-text-primary">
                    {experience.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-text-secondary">
                    {experience.tagline}
                  </p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">
                    {experience.description}
                  </p>
                  <span
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium"
                    style={{ color: experience.linkColor ?? experience.accent }}
                  >
                    Open {experience.name}
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 max-w-3xl text-xs leading-relaxed text-text-muted">
          {t(locale, "home.provenance")}
        </p>
      </section>

      <section className="container-content pt-14 sm:pt-16" aria-labelledby="more-surfaces-heading">
        <SectionHeading
          eyebrow={t(locale, "home.moreEyebrow")}
          title={t(locale, "home.moreTitle")}
          description={t(locale, "home.moreDescription")}
        />
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              href: "/mission-control",
              icon: Radio,
              labelKey: "sections.missionControl.title",
              descriptionKey: "sections.missionControl.description",
              accent: "#5EEAD4",
            },
            {
              href: "/engineering",
              icon: Wrench,
              labelKey: "sections.engineering.title",
              descriptionKey: "sections.engineering.description",
              accent: "#F2B33D",
            },
            {
              href: "/stories",
              icon: ScrollText,
              labelKey: "sections.stories.title",
              descriptionKey: "sections.stories.description",
              accent: "#F08A6A",
            },
            {
              href: "/research",
              icon: Microscope,
              labelKey: "sections.research.title",
              descriptionKey: "sections.research.description",
              accent: "#7DD3FC",
            },
            {
              href: "/simulations",
              icon: FlaskConical,
              labelKey: "sections.simulations.title",
              descriptionKey: "sections.simulations.description",
              accent: "#9FE3E8",
            },
            {
              href: "/my-universe",
              icon: Heart,
              labelKey: "sections.myUniverse.title",
              descriptionKey: "sections.myUniverse.description",
              accent: "#FFF8EC",
            },
          ].map((surface) => {
            const Icon = surface.icon;
            return (
              <li key={surface.href}>
                <Link
                  href={surface.href}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-surface/60 p-4 transition-colors hover:border-white/25"
                >
                  <span
                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border"
                    style={{
                      borderColor: `${surface.accent}45`,
                      backgroundColor: `${surface.accent}18`,
                      color: surface.accent,
                    }}
                  >
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-white">
                    {t(locale, surface.labelKey)}
                  </h3>
                  <p className="mt-1 flex-1 text-xs leading-relaxed text-text-muted">
                    {t(locale, surface.descriptionKey)}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent-bright">
                    {t(locale, "home.openSurface")}
                    <ArrowRight
                      aria-hidden="true"
                      className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="container-content py-16 sm:py-20">
        <Reveal>
        <SectionHeading
          eyebrow="Choose a destination"
          title="Three places. Very different kinds of hardware."
          description="Start with where the artifact is — or was last documented. Each collection includes its real operational state, not just its mission outcome."
          action={
            <Link
              href="/explorer?mode=destinations"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-accent/50 hover:text-white"
            >
              All destinations
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
          }
        />
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {destinationOrder.map((destination, index) => {
            const meta = destinationMeta[destination];
            const count = destinationCounts[destination];
            return (
              <Link
                key={destination}
                href={`/explorer?mode=artifacts&destination=${destination}`}
                data-destination={destination}
                className="destination-card card-hover group relative overflow-hidden rounded-card border border-white/10 bg-surface/60"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <ArtifactVisual
                    media={{
                      type: "image",
                      src: meta.image,
                      thumb: meta.image,
                      alt: meta.imageAlt,
                      caption: "",
                      credit: meta.credit,
                      nasaId: "",
                      sourceUrl: "",
                      isIllustration: destination === "deep-space",
                      width: 1600,
                      height: 900,
                    }}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    imageClassName="group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/25 to-transparent" />
                  <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
                    <span className="rounded-full border border-white/15 bg-black/55 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-white/85 backdrop-blur">
                      0{index + 1} · {destination === "deep-space" ? "Deep space" : destination === "mars" ? "Mars" : "Moon"}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 font-mono text-[11px] tabular-nums text-white/85 backdrop-blur">
                      <span aria-hidden="true" className="destination-dot h-1.5 w-1.5 rounded-full" />
                      {pluralize(count, "artifact")}
                    </span>
                  </div>
                </div>
                <div className="relative p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">
                      {meta.name}
                    </h3>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-text-secondary transition-all group-hover:border-white/30 group-hover:bg-white/5 group-hover:text-white">
                      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {meta.description}
                  </p>
                  <p className="mt-4 flex items-center gap-1.5 text-xs text-text-secondary">
                    <MapPin aria-hidden="true" className="h-3.5 w-3.5" style={{ color: meta.accent }} />
                    Browse {meta.name} artifacts
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container-content py-16 sm:py-20">
        <Reveal>
        <SectionHeading
          eyebrow="Featured records"
          title="Start with an artifact"
          description="Four verified records that span the collection: a lunar lander, a rover, surface equipment and an interstellar probe."
          action={
            <Link
              href="/explorer?mode=artifacts"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-accent/50 hover:text-white"
            >
              All {artifacts.length} artifacts
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
          }
        />
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {featured.map((artifact, index) => (
            <ArtifactCard
              key={artifact.id}
              artifact={artifact}
              priority={index < 2}
            />
          ))}
        </div>
      </section>

      <section className="container-content pt-14 sm:pt-16" aria-labelledby="problem-heading">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="panel p-5 sm:p-6">
            <p className="eyebrow flex items-center gap-2">
              <CircleHelp aria-hidden="true" className="h-3.5 w-3.5" />
              {t(locale, "home.problemEyebrow")}
            </p>
            <h2
              id="problem-heading"
              className="mt-2 text-xl font-semibold tracking-tight text-text-primary"
            >
              {t(locale, "home.problemTitle")}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              {t(locale, "home.problemBody")}
            </p>
          </div>
          <div className="panel p-5 sm:p-6" style={{ borderColor: "rgba(94,234,212,0.25)" }}>
            <p className="eyebrow flex items-center gap-2">
              <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
              {t(locale, "home.answerEyebrow")}
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-text-primary">
              {t(locale, "home.answerTitle")}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              {t(locale, "home.answerBody")}
            </p>
          </div>
        </div>
      </section>

      <section className="container-content py-16 sm:py-20">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-brand-teal/20 bg-surface p-6 sm:p-10">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(43,108,145,0.2),transparent_65%)]"
          />
          <div className="relative">
            <p className="eyebrow">How to explore</p>
            <h2 className="mt-2 max-w-xl text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Timeline → artifact → story.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
              GRAVERSE is built around three connected routes to the same
              records. Use whichever one fits how you think.
            </p>
            <ol className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  icon: Compass,
                  step: "01",
                  title: "Pick a moment",
                  body: "Browse the timeline by milestone, or switch to the destination and artifact views. Filters apply instantly.",
                  href: "/explorer",
                  cta: "Open Explore",
                  tone: "border-brand-teal/30 bg-brand-teal/10 text-brand-teal",
                  edge: "via-brand-teal/60",
                },
                {
                  icon: Search,
                  step: "02",
                  title: "Find the artifact",
                  body: "Search by name, mission, destination or hardware type. Every result leads to the same reusable museum record.",
                  href: "/search",
                  cta: "Search the archive",
                  tone: "border-brand-amber/30 bg-brand-amber/10 text-brand-amber",
                  edge: "via-brand-amber/60",
                },
                {
                  icon: BookOpen,
                  step: "03",
                  title: "Read the fate",
                  body: "Each story separates mission status from hardware status, then shows the sources behind the facts.",
                  href: "/about",
                  cta: "How the data works",
                  tone: "border-brand-teal/30 bg-brand-teal/10 text-brand-teal",
                  edge: "via-brand-teal/60",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.step}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/20"
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${item.edge} to-transparent`}
                    />
                    <div className="flex items-center justify-between">
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-xl border ${item.tone}`}
                      >
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      <span className={`font-mono text-xs ${item.tone.split(" ").pop()}`}>
                        {item.step}
                      </span>
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {item.body}
                    </p>
                    <Link
                      href={item.href}
                      className={`mt-4 inline-flex items-center gap-1 text-xs font-semibold ${item.tone.split(" ").pop()} hover:text-white`}
                    >
                      {item.cta}
                      <ArrowRight aria-hidden="true" className="h-3 w-3" />
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <section className="container-content py-16 sm:py-20">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-brand-amber/25 bg-surface p-6 sm:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(242,179,61,0.16),transparent_68%)] blur-xl"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            <div>
              <p className="eyebrow flex items-center gap-2">
                <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
Space Academy · Ages 5–12
              </p>
              <h2 className="mt-2 max-w-xl text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                A kid-sized way into the{" "}
                <span className="text-accent">collection.</span>
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
                Four guided journeys, twelve short lessons, quizzes, a glossary
                and a robot lab. The same verified records, rewritten for ages
                5–12 and split into three age bands.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/academy"
                  className="btn-primary inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold"
                >
                  Open Space Academy
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <Link
                  href="/academy/robot-lab"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold text-text-primary transition-colors hover:border-accent/50 hover:bg-white/5"
                >
                  <Bot aria-hidden="true" className="h-4 w-4 text-brand-cyan" />
                  Talk to a robot
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: "Rover",
                  detail: "Drives across a surface",
                  icon: Truck,
                  tone: "border-brand-teal/30 bg-brand-teal/10 text-brand-teal",
                },
                {
                  label: "Lander",
                  detail: "Touches down and stays",
                  icon: PackageOpen,
                  tone: "border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan",
                },
                {
                  label: "Probe",
                  detail: "Explores far away",
                  icon: Satellite,
                  tone: "border-brand-violet/30 bg-brand-violet/10 text-brand-violet",
                },
                {
                  label: "Helicopter",
                  detail: "Flew on Mars",
                  icon: Plane,
                  tone: "border-brand-magenta/30 bg-brand-magenta/10 text-brand-magenta",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl border ${item.tone}`}
                    >
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <p className="mt-3 text-sm font-semibold text-white">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-[11px] text-text-muted">
                      {item.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="container-content pb-6 pt-8">
        <div className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl border border-brand-teal/25 bg-surface px-6 py-7 sm:flex-row sm:items-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(94,234,212,0.12),transparent_68%)] blur-xl"
          />
          <div className="relative">
            <h2 className="text-xl font-semibold text-white">
              Some machines stopped working.{" "}
              <span className="text-accent">Their discoveries did not.</span>
            </h2>
            <p className="mt-1.5 max-w-2xl text-sm text-text-secondary">
              But not every machine has stopped. The collection includes active
              rovers and probes as well as artifacts that ended decades ago.
            </p>
          </div>
          <Link
            href="/explorer"
            className="btn-primary relative inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-5 text-sm font-semibold"
          >
            Explore the timeline
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
