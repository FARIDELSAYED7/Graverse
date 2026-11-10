import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Brain,
  CheckCircle2,
  Compass,
  GraduationCap,
  Lightbulb,
  MapPin,
  Orbit,
  PackageOpen,
  Palette,
  Pencil,
  Plane,
  Radar,
  Rocket,
  Satellite,
  Sparkles,
  Star,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { ArtifactVisual } from "@/components/artifacts/ArtifactVisual";
import { JuniorArtifactCard } from "@/components/kids/JuniorArtifactCard";
import { JuniorQuiz } from "@/components/kids/JuniorQuiz";
import { RobotLab } from "@/components/kids/RobotLab";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  artifacts,
  countByDestination,
  destinationMeta,
  destinationOrder,
  getArtifactById,
} from "@/data/artifacts";
import {
  juniorArtifactNotes,
  wordLabEntries,
} from "@/data/kids";
import { buildJuniorQuizQuestions, getJuniorArtifacts } from "@/lib/kids";
import { buildRobotProfiles } from "@/lib/robot";
import { pluralize } from "@/lib/format";
import type { HardwareType } from "@/types/artifact";

export const metadata: Metadata = {
  title: "Junior Explorers — space artifacts for ages 7–12",
  description:
    "A kid-friendly guide to real NASA space artifacts for ages 7–12. Meet six machines, talk to a scripted robot guide for every artifact, learn the words NASA uses, and try a five-question mission quiz built from source-linked records.",
  openGraph: {
    title: "Junior Explorers · GRAVERSE",
    description:
      "Big space machines, explained for young explorers. Talk to a robot guide, meet real NASA hardware and try the mission quiz.",
    type: "website",
  },
};

const jumpLinks = [
  { href: "#places", label: "Places" },
  { href: "#meet", label: "Machines" },
  { href: "#robot-lab", label: "Robot lab" },
  { href: "#word-lab", label: "Word lab" },
  { href: "#quiz", label: "Quiz" },
  { href: "#challenge", label: "Challenge" },
];

const kidPlaceLines: Record<string, string> = {
  moon: "Landers, a rover and experiments left on the surface.",
  mars: "Rovers, landers and a helicopter that flew on another planet.",
  "deep-space": "Probes that toured the giant planets, plus a Saturn orbiter.",
};

const wordIcons: Record<HardwareType, LucideIcon> = {
  rover: Truck,
  lander: PackageOpen,
  orbiter: Orbit,
  probe: Satellite,
  instrument: Radar,
  "surface-equipment": Wrench,
  aircraft: Plane,
};

const wordTones: Record<HardwareType, string> = {
  rover: "border-brand-teal/30 bg-brand-teal/10 text-brand-teal",
  lander: "border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan",
  orbiter: "border-brand-violet/30 bg-brand-violet/10 text-brand-violet",
  probe: "border-brand-magenta/30 bg-brand-magenta/10 text-brand-magenta",
  instrument: "border-brand-amber/30 bg-brand-amber/10 text-brand-amber",
  "surface-equipment": "border-brand-emerald/30 bg-brand-emerald/10 text-brand-emerald",
  aircraft: "border-accent/30 bg-accent/10 text-accent-bright",
};

const challenges = [
  {
    title: "Draw the machine",
    description:
      "Pick one artifact photo. Look closely at its shape, then draw it from memory.",
    icon: Pencil,
    tone: "border-brand-teal/30 bg-brand-teal/10 text-brand-teal",
  },
  {
    title: "Explain it to a grown-up",
    description:
      "Choose a machine and explain what it does in three sentences. The word lab can help.",
    icon: Lightbulb,
    tone: "border-brand-violet/30 bg-brand-violet/10 text-brand-violet",
  },
  {
    title: "Design a mission patch",
    description:
      "Invent a patch for your favorite artifact. Include its destination, one shape from the machine and one color that matches the place it explored.",
    icon: Palette,
    tone: "border-brand-magenta/30 bg-brand-magenta/10 text-brand-magenta",
  },
];

export default function KidsPage() {
  const juniorArtifacts = getJuniorArtifacts();
  const questions = buildJuniorQuizQuestions();
  const robots = buildRobotProfiles(artifacts, juniorArtifactNotes);
  const destinationCounts = countByDestination();
  const heroArtifact =
    getArtifactById("perseverance") ?? juniorArtifacts[0];
  const wowArtifact = getArtifactById("apollo-11-lrrr");

  return (
    <div className="pb-16">
      <section className="relative overflow-hidden pb-12 pt-10 sm:pb-16 sm:pt-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -left-28 top-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(94,234,212,0.2),transparent_66%)] blur-2xl" />
          <div className="absolute left-1/2 top-[-14rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.24),transparent_65%)] blur-2xl" />
          <div className="absolute -right-24 top-16 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(244,114,208,0.16),transparent_68%)] blur-2xl" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg" />
        </div>

        <div className="container-content relative">
          <nav aria-label="Junior Explorers sections">
            <ul className="flex flex-wrap gap-2">
              {jumpLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-brand-violet/50 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-14">
            <div className="max-w-2xl">
              <p className="eyebrow flex items-center gap-2">
                <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
                Junior Explorers · Ages 7–12
              </p>
              <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.06] tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
                Big space machines,{" "}
                <span className="text-gradient">explained for young explorers.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
                Meet real NASA robots and spacecraft. Learn what they are, where
                they went, and what they found — then talk to a robot guide or
                try the five-question mission quiz.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="#robot-lab"
                  className="btn-gradient inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold"
                >
                  <Bot aria-hidden="true" className="h-4 w-4" />
                  Talk to a robot
                </Link>
                <Link
                  href="#meet"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm font-semibold text-text-primary transition-colors hover:border-accent/50 hover:bg-white/5"
                >
                  Meet the machines
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <Link
                  href="#quiz"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm font-semibold text-text-primary transition-colors hover:border-accent/50 hover:bg-white/5"
                >
                  <Star aria-hidden="true" className="h-4 w-4 text-brand-amber" />
                  Play the quiz
                </Link>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-text-muted">
                The same {artifacts.length} verified artifact records as the rest
                of GRAVERSE, with simpler words. Robot answers are scripted, not
                AI.
              </p>

              <dl className="mt-9 grid max-w-2xl grid-cols-2 gap-4 border-t border-white/10 pt-6 sm:grid-cols-4">
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
                    Places
                  </dt>
                  <dd className="mt-1 font-mono text-2xl tabular-nums text-brand-violet">
                    {destinationOrder.length}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-text-muted">
                    Robot guides
                  </dt>
                  <dd className="mt-1 font-mono text-2xl tabular-nums text-brand-teal">
                    {robots.length}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-text-muted">
                    Quiz questions
                  </dt>
                  <dd className="mt-1 font-mono text-2xl tabular-nums text-brand-magenta">
                    {questions.length}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_50%_40%,rgba(244,114,208,0.16),transparent_64%)]"
              />
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-[112%] w-[112%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-brand-violet/15"
              />
              <div className="relative overflow-hidden rounded-[1.6rem] border border-brand-violet/25 bg-bg-elevated/80 p-2 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.95),0_0_60px_-24px_rgba(167,139,250,0.5)] backdrop-blur">
                <div className="relative aspect-[4/3.2] overflow-hidden rounded-[1.2rem]">
                  <ArtifactVisual
                    media={heroArtifact.media}
                    priority
                    sizes="(min-width: 1024px) 44vw, 92vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040a14] via-transparent to-transparent" />
                  <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                    <span className="rounded-full border border-brand-teal/35 bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-teal backdrop-blur">
                      Rover
                    </span>
                    <span className="rounded-full border border-brand-violet/35 bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-violet backdrop-blur">
                      Helicopter
                    </span>
                    <span className="rounded-full border border-brand-magenta/35 bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-magenta backdrop-blur">
                      Mars
                    </span>
                  </div>
                  <div className="absolute inset-x-4 bottom-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-amber/35 bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-amber backdrop-blur">
                      <Star aria-hidden="true" className="h-3 w-3" />
                      Ages 7–12
                    </span>
                    <p className="mt-2 text-sm font-medium text-white">
                      Perseverance took this selfie with Ingenuity on Mars.
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-[11px] leading-relaxed text-text-muted">
                {heroArtifact.media ? (
                  <>
                    {heroArtifact.media.credit} ·{" "}
                    {heroArtifact.media.isIllustration
                      ? "Artist's concept"
                      : "NASA photograph"}
                  </>
                ) : (
                  "No NASA image is included in this record."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="places" className="container-content py-14 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Choose a place"
            title="Where should we explore first?"
            description="Every artifact belongs to one of three places. Pick one to see its real records in Explore."
          />
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {destinationOrder.map((destination) => {
            const meta = destinationMeta[destination];
            return (
              <Link
                key={destination}
                href={`/explore?mode=artifacts&destination=${destination}`}
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
                    <span
                      aria-hidden="true"
                      className="destination-dot h-1.5 w-1.5 rounded-full"
                    />
                    {pluralize(destinationCounts[destination], "artifact")}
                  </span>
                </div>
                <div className="relative p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-semibold text-white">
                      {meta.name}
                    </h3>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-text-secondary transition-colors group-hover:border-white/30 group-hover:text-white">
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {kidPlaceLines[destination]}
                  </p>
                  <p className="mt-4 flex items-center gap-1.5 text-xs font-medium text-text-secondary">
                    <MapPin
                      aria-hidden="true"
                      className="h-3.5 w-3.5"
                      style={{ color: meta.accent }}
                    />
                    See the {meta.shortLabel} artifacts
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section id="meet" className="container-content py-14 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Meet six machines"
            title="Real hardware. Kid-sized stories."
            description="These six artifacts are a good place to start. Each card opens the full NASA-sourced record."
            action={
              <Link
                href="/museum"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-accent/50 hover:text-white"
              >
                All {artifacts.length} artifacts
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            }
          />
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {juniorArtifacts.map((artifact) => (
            <JuniorArtifactCard
              key={artifact.id}
              artifact={artifact}
              note={
                juniorArtifactNotes[artifact.id] ??
                artifact.shortDescription
              }
            />
          ))}
        </div>

        <p className="mt-5 max-w-3xl text-xs leading-relaxed text-text-muted">
          The two badges on each card answer different questions. A mission can
          be complete while its machine is still working, or a machine can go
          silent after a successful mission.{" "}
          <Link
            href="/about#mission"
            className="font-medium text-accent-bright hover:text-white"
          >
            Learn how the two statuses work
          </Link>
          .
        </p>
      </section>

      <section id="robot-lab" className="container-content py-14 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Robot lab · scripted, not AI"
            title="Talk to the machines"
            description="Every artifact has a robot guide. Pick one, tap a question or type your own. Each answer is read from that artifact's record — the robot cannot make things up."
            action={
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-3.5 py-2 text-xs font-semibold text-brand-cyan">
                <Bot aria-hidden="true" className="h-4 w-4" />
                {robots.length} robot guides
              </span>
            }
          />
        </Reveal>

        <div className="mt-8">
          <Reveal delay={80}>
            <RobotLab profiles={robots} initialRobotId="perseverance" />
          </Reveal>
        </div>

        <p className="mt-4 max-w-3xl text-xs leading-relaxed text-text-muted">
          No AI is used. The robot matches your question to a fixed answer built
          from the artifact record, and every guide links back to the full
          NASA-sourced page.{" "}
          <Link
            href="/about#method"
            className="font-medium text-accent-bright hover:text-white"
          >
            How the records work
          </Link>
          .
        </p>
      </section>

      {wowArtifact ? (
        <section className="container-content pb-4">
          <div className="relative overflow-hidden rounded-[1.5rem] border border-brand-teal/25 bg-[linear-gradient(120deg,rgba(94,234,212,0.1),rgba(167,139,250,0.12)_48%,rgba(251,191,36,0.08))] p-6 sm:p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(94,234,212,0.2),transparent_68%)]"
            />
            <div className="relative grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-center">
              <div>
                <p className="eyebrow flex items-center gap-2">
                  <Star aria-hidden="true" className="h-3.5 w-3.5" />
                  Wow fact
                </p>
                <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  There is a mirror on the Moon that still works.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base">
                  Apollo 11 astronauts left a panel of mirrors at Tranquility
                  Base. Scientists on Earth still bounce laser light off it to
                  track the Moon&apos;s orbit and test aspects of gravity.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  <StatusBadge kind="mission" status={wowArtifact.missionStatus} />
                  <StatusBadge kind="hardware" status={wowArtifact.hardwareStatus} />
                </div>
                <Link
                  href={`/museum/${wowArtifact.id}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-teal hover:text-white"
                >
                  Meet the retroreflector
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
              <figure className="min-w-0">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/12 bg-bg-elevated">
                  <ArtifactVisual
                    media={wowArtifact.media}
                    sizes="(min-width: 1024px) 32vw, 100vw"
                  />
                </div>
                <figcaption className="mt-2 text-[11px] leading-relaxed text-text-muted">
                  {wowArtifact.media?.caption} Credit:{" "}
                  {wowArtifact.media?.credit ?? "NASA"}.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>
      ) : null}

      <section id="word-lab" className="container-content py-14 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Space word lab"
            title="Learn the words NASA uses"
            description="These are the machine types in the collection. Open a word to see real examples in Explore."
          />
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wordLabEntries.map((entry) => {
            const Icon = wordIcons[entry.hardwareType];
            const count = artifacts.filter(
              (artifact) => artifact.hardwareType === entry.hardwareType
            ).length;
            return (
              <Link
                key={entry.term}
                href={`/explore?mode=artifacts&hardwareType=${entry.hardwareType}`}
                className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/25 hover:bg-white/[0.04]"
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border ${wordTones[entry.hardwareType]}`}
                >
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {entry.term}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {entry.definition}
                </p>
                <span className="mt-auto flex items-center justify-between gap-2 pt-4 text-xs font-medium text-text-muted">
                  <span>{pluralize(count, "artifact")}</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section id="quiz" className="container-content py-14 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-10">
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <SectionHeading
                eyebrow="Mission quiz"
                title="Can you match the machine to its mission?"
                description="Five questions, all built from the same artifact records. Choose an answer to see why."
              />
              <ul className="mt-6 space-y-3 text-sm text-text-secondary">
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal"
                  />
                  Five questions about real artifacts
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan"
                  />
                  No timer — take your time
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-violet"
                  />
                  An explanation after every answer
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-magenta"
                  />
                  Play again as often as you like
                </li>
              </ul>
              <p className="mt-5 text-xs leading-relaxed text-text-muted">
                Questions are generated from the records. No new facts were
                added for the quiz.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <JuniorQuiz questions={questions} />
          </Reveal>
        </div>
      </section>

      <section id="challenge" className="container-content py-14 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Explorer challenge"
            title="Three things to try offline"
            description="No screen needed for these. Grab paper and pencils."
          />
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {challenges.map((challenge) => {
            const Icon = challenge.icon;
            return (
              <div
                key={challenge.title}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5"
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border ${challenge.tone}`}
                >
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {challenge.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {challenge.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-content py-14 sm:py-16">
        <div className="rounded-[1.5rem] border border-white/10 bg-bg-elevated/70 p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="eyebrow flex items-center gap-2">
                <GraduationCap aria-hidden="true" className="h-3.5 w-3.5" />
                A note for grown-ups
              </p>
              <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Simpler words. Same source-linked records.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
                Junior Explorers is a simplified layer over the same{" "}
                {artifacts.length} artifact records used across GRAVERSE. The
                wording is shorter and friendlier, but no new facts, dates or
                images were added. Full records keep the original NASA status
                wording, technical details and source links.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  href: "/about#method",
                  label: "How the data works",
                  icon: Brain,
                },
                {
                  href: "/about#sources",
                  label: "Sources and dates",
                  icon: BookOpen,
                },
                { href: "/museum", label: "Full museum", icon: Compass },
                { href: "/explore", label: "Interactive timeline", icon: Rocket },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 text-sm font-medium text-text-secondary transition-colors hover:border-accent/40 hover:text-white"
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-4 w-4 text-accent-bright"
                    />
                    {item.label}
                    <ArrowRight
                      aria-hidden="true"
                      className="ml-auto h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="container-content pb-6 pt-4">
        <div className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl border border-brand-violet/25 bg-[linear-gradient(120deg,rgba(94,234,212,0.08),rgba(167,139,250,0.1)_45%,rgba(244,114,208,0.09))] px-6 py-7 sm:flex-row sm:items-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.16),transparent_68%)] blur-xl"
          />
          <div className="relative">
            <h2 className="text-xl font-semibold text-white">
              Ready to explore the whole collection?
            </h2>
            <p className="mt-1.5 max-w-2xl text-sm text-text-secondary">
              All {artifacts.length} artifacts are waiting in the museum and the
              interactive timeline.
            </p>
          </div>
          <Link
            href="/museum"
            className="btn-gradient relative inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-5 text-sm font-semibold"
          >
            Open the museum
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
