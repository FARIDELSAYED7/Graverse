import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Bot,
  CalendarClock,
  Compass,
  Database,
  Landmark,
  MapPin,
  PackageOpen,
  Plane,
  Satellite,
  Search,
  Sparkles,
  Truck,
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

export const metadata: Metadata = {
  title: "GRAVERSE — Explore the history of space exploration",
  description:
    "Discover the machines that shaped our understanding of space. Explore NASA hardware across the Moon, Mars and deep space through an interactive timeline and source-linked museum.",
};

const popularSearches = ["Perseverance", "Apollo 11", "Voyager 1", "Ingenuity"];

export default function HomePage() {
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
            src="/images/deep-space.webp"
            alt=""
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-[-22rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(43,90,148,0.3),transparent_64%)] blur-2xl" />
          <div className="absolute -left-24 top-24 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(94,234,212,0.14),transparent_66%)] blur-2xl" />
          <div className="absolute right-[-10rem] top-20 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(43,108,145,0.18),transparent_65%)] blur-2xl" />
        </div>
        <div className="horizon opacity-70" aria-hidden="true" />

        <div className="container-content relative grid gap-12 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-16 lg:pb-28 lg:pt-24">
          <div className="max-w-2xl">
            <p className="eyebrow flex items-center gap-2">
              <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
              A NASA Space Apps Challenge experience
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
              Discover the machines that{" "}
              <span className="text-accent">shaped our understanding</span> of
              space.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
              Explore the hardware, missions and discoveries left across the
              Moon, Mars and beyond — then find out what is actually known about
              what happened to each machine.
            </p>

            <form
              action="/search"
              role="search"
              className="mt-8 flex flex-col gap-2 sm:flex-row"
            >
              <label htmlFor="home-search" className="sr-only">
                Search artifacts, missions and destinations
              </label>
              <div className="relative flex-1">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
                />
                <input
                  id="home-search"
                  name="q"
                  type="search"
                  placeholder="Search an artifact, mission or destination"
                  className="h-12 w-full rounded-full border border-white/12 bg-white/[0.05] pl-11 pr-4 text-sm text-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] placeholder:text-text-muted focus:border-accent/60 focus:bg-white/[0.07] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="btn-primary inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold"
              >
                Search the archive
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-text-muted">
              <span>Try</span>
              {popularSearches.map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="rounded-full border border-white/10 px-2.5 py-1 text-text-secondary transition-colors hover:border-accent/40 hover:text-white"
                >
                  {term}
                </Link>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/explorer"
                className="btn-primary inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold"
              >
                Explore the timeline
                <Compass aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                href="/museum"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm font-semibold text-text-primary transition-colors hover:border-accent/50 hover:bg-white/5"
              >
                Browse the museum
                <BookOpen aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.18em] text-text-muted">
                  Artifacts
                </dt>
                <dd className="mt-1 font-mono text-2xl tabular-nums text-brand-cyan">
                  {artifacts.length}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.18em] text-text-muted">
                  Destinations
                </dt>
                <dd className="mt-1 font-mono text-2xl tabular-nums text-brand-amber">
                  {destinationOrder.length}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.18em] text-text-muted">
                  Decades
                </dt>
                <dd className="mt-1 font-mono text-2xl tabular-nums text-brand-teal">
                  {decadeCount}
                </dd>
              </div>
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <SpaceCanvas />
            <div
              aria-hidden="true"
              className="absolute -inset-8 rounded-[2rem] bg-[radial-gradient(circle_at_50%_40%,rgba(94,234,212,0.14),transparent_62%)]"
            />
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 animate-[spin_60s_linear_infinite] rounded-[50%] border border-accent/10"
            />
            <div className="relative overflow-hidden rounded-[1.6rem] border border-brand-teal/25 bg-bg-elevated/80 p-2 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.95)] backdrop-blur">
              <div className="relative aspect-[4/3.2] overflow-hidden rounded-[1.2rem]">
                <ArtifactVisual
                  media={featured[0]?.media}
                  priority
                  sizes="(min-width: 1024px) 46vw, 92vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040a14] via-transparent to-transparent" />
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
                  <p className="text-[11px] uppercase tracking-[0.2em] text-accent-bright">
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

            <div className="glass absolute -left-3 top-6 hidden rounded-xl px-3.5 py-3 shadow-card sm:block lg:-left-8">
              <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-text-muted">
                <CalendarClock aria-hidden="true" className="h-3 w-3" />
                First landing
              </p>
              <p className="mt-1 font-mono text-xl tabular-nums text-white">
                1969
              </p>
            </div>

            <div className="glass absolute -right-2 bottom-10 hidden rounded-xl px-3.5 py-3 shadow-card sm:block lg:-right-6">
              <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-text-muted">
                <Database aria-hidden="true" className="h-3 w-3" />
                Source-linked
              </p>
              <p className="mt-1 text-sm font-medium text-white">
                Every artifact
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-content pt-14 sm:pt-16">
        <SectionHeading
          eyebrow="Three experiences, one collection"
          title="Choose how you want to explore"
          description="The same verified records, arranged for different questions. Learn the basics, read the full story, or investigate the data."
        />
        <ul className="mt-6 grid gap-4 lg:grid-cols-3">
          {experiences.map((experience) => {
            const Icon =
              experience.id === "academy"
                ? BookOpen
                : experience.id === "museum"
                  ? Landmark
                  : Compass;
            return (
              <li key={experience.id}>
                <Link
                  href={experience.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border p-5 transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
                  style={{
                    borderColor: `${experience.accent}40`,
                    background: "rgba(21, 32, 55, 0.9)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-0.5"
                    style={{ backgroundColor: experience.accent }}
                  />
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border"
                      style={{
                        borderColor: `${experience.accent}45`,
                        backgroundColor: `${experience.accent}18`,
                        color: experience.accent,
                      }}
                    >
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span
                      className="text-[10px] font-semibold uppercase tracking-[0.18em]"
                      style={{ color: experience.accent }}
                    >
                      {experience.eyebrow}
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
                    style={{ color: experience.accent }}
                  >
                    Open {experience.name}
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
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
          {destinationOrder.map((destination) => {
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
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white/85 backdrop-blur">
                    <span aria-hidden="true" className="destination-dot h-1.5 w-1.5 rounded-full" />
                    {pluralize(count, "artifact")}
                  </span>
                </div>
                <div className="relative p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">
                      {meta.name}
                    </h3>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-text-secondary transition-colors group-hover:border-white/30 group-hover:text-white">
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
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
