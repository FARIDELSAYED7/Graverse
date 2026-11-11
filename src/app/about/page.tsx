import type { Metadata } from "next";
import Link from "next/link";
import {
  Accessibility,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Database,
  ExternalLink,
  FileWarning,
  Layers,
  ListChecks,
  Radio,
  ShieldCheck,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { artifacts } from "@/data/artifacts";
import { sources, sourceTypeLabels } from "@/data/sources";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "About and sources",
  description:
    "How GRAVERSE normalizes NASA records, separates mission status from hardware status, handles missing data, and attributes every artifact fact.",
};

const distinctions = [
  {
    id: "apollo-11-lm-descent-stage",
    name: "Apollo 11 Lunar Module Descent Stage",
    mission: "completed" as const,
    hardware: "inactive" as const,
    note: "The mission succeeded. The descent stage remains on the Moon; the ascent stage was jettisoned and its final condition is not documented.",
  },
  {
    id: "opportunity",
    name: "Opportunity Rover",
    mission: "completed" as const,
    hardware: "no-longer-communicating" as const,
    note: "The mission is complete after contact was lost in a dust storm, but NASA has not documented the rover as destroyed.",
  },
  {
    id: "cassini",
    name: "Cassini Orbiter",
    mission: "completed" as const,
    hardware: "destroyed" as const,
    note: "This is the documented exception: Cassini was intentionally sent into Saturn's atmosphere at the end of its mission.",
  },
  {
    id: "pioneer-10",
    name: "Pioneer 10",
    mission: "completed" as const,
    hardware: "no-longer-communicating" as const,
    note: "The mission is complete and the spacecraft is silent. NASA has not documented it as destroyed, and it continues outward on a passive trajectory.",
  },
  {
    id: "apollo-15-lrrr",
    name: "Apollo 15 Lunar Laser Ranging Retroreflector",
    mission: "completed" as const,
    hardware: "operating" as const,
    note: "The mission is complete, but the passive instrument is still used for laser ranging from Earth.",
  },
];

const coverage = [
  {
    field: "Artifact and mission names",
    state: "Included",
    detail:
      "Normalized from NASA mission pages and NSSDCA records. Alternate names are preserved where a source uses them.",
  },
  {
    field: "Launch, arrival and mission-end dates",
    state: "Included where documented",
    detail:
      "Dates keep day, month or year precision. A date is never invented to fill a gap.",
  },
  {
    field: "Mission and hardware status",
    state: "Included and separated",
    detail:
      "Normalized labels sit alongside the original NASA wording. Unknown stays unknown.",
  },
  {
    field: "Last contact",
    state: "Only where documented",
    detail:
      "Present for records such as InSight, Opportunity and Pioneer 10. Omitted for missions where it is not a meaningful field.",
  },
  {
    field: "Surface coordinates",
    state: "Not included",
    detail:
      "The records keep named landing regions and sites. No map pin or coordinate pair is fabricated.",
  },
  {
    field: "3D models",
    state: "Not included",
    detail:
      "No verified artifact models were supplied. The product shows NASA imagery and says plainly that a 3D model is unavailable.",
  },
  {
    field: "Official challenge dataset",
    state: "Not present in the workspace",
    detail:
      "The supplied folder contained the blueprint and visual reference, but not the official NASA challenge data bundle. This build therefore normalizes public NASA records and documents that substitution.",
  },
];

export default function AboutPage() {
  return (
    <div className="pb-16">
      <section className="container-content pt-12 sm:pt-16">
        <div className="max-w-3xl">
          <p className="eyebrow">About GRAVERSE</p>
          <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
            A connected, source-linked way to explore{" "}
            <span className="text-accent">space heritage</span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
            GRAVERSE is a hackathon project built for the NASA Space Apps
            Challenge. It turns scattered records about human-made space hardware
            into three connected experiences — a Space Academy for ages 5–12, a
            cinematic museum, and a data-first Explorer — without pretending
            that uncertain or missing information is known.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/explorer"
              className="btn-primary inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold"
            >
              Explore the timeline
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <a
              href="#sources"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold text-text-primary transition-colors hover:border-accent/50 hover:bg-white/5"
            >
              Jump to sources
              <Database aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </div>

        <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-4 border-t border-white/10 pt-6 sm:grid-cols-4">
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-text-muted">
              Artifacts
            </dt>
            <dd className="mt-1 font-mono text-2xl tabular-nums text-white">
              {artifacts.length}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-text-muted">
              NASA sources
            </dt>
            <dd className="mt-1 font-mono text-2xl tabular-nums text-white">
              {sources.length}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-text-muted">
              Destinations
            </dt>
            <dd className="mt-1 font-mono text-2xl tabular-nums text-white">3</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-text-muted">
              Last verified
            </dt>
            <dd className="mt-1 font-mono text-sm tabular-nums text-white">
              10 Nov 2026
            </dd>
          </div>
        </dl>
      </section>

      <div className="container-content mt-12 grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
        <aside className="lg:sticky lg:top-24">
          <nav
            aria-label="About page contents"
            className="rounded-xl border border-white/10 bg-bg-elevated/60 p-4"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">
              On this page
            </p>
            <ul className="mt-3 space-y-1">
              {[
                ["mission", "Two kinds of status"],
                ["method", "How the data is built"],
                ["coverage", "What is included"],
                ["limitations", "Limitations"],
                ["accessibility", "Accessibility"],
                ["sources", "Sources"],
              ].map(([id, label]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="block rounded-md px-2 py-1.5 text-xs text-text-secondary transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="min-w-0 space-y-14">
          <section id="mission" className="scroll-mt-24">
            <div className="flex items-center gap-2">
              <Radio aria-hidden="true" className="h-5 w-5 text-accent-bright" />
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                Two kinds of status, never merged
              </h2>
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-text-secondary">
              A mission is the program of work. Hardware is the physical object.
              One can end while the other continues, and the physical condition
              of a silent spacecraft is often simply not known. GRAVERSE keeps
              the two fields separate, shows both on every card and detail page,
              and preserves the source phrasing in a note.
            </p>

            <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
              <ul className="divide-y divide-white/10">
                {distinctions.map((example) => (
                  <li
                    key={example.id}
                    className="grid gap-2 px-4 py-4 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] sm:items-start sm:gap-6"
                  >
                    <div>
                      <Link
                        href={`/museum/${example.id}`}
                        className="text-sm font-medium text-text-primary hover:text-accent-bright"
                      >
                        {example.name}
                      </Link>
                      <p className="mt-1 text-xs leading-relaxed text-text-muted">
                        {example.note}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <StatusBadge
                        kind="mission"
                        status={example.mission}
                        compact
                      />
                      <StatusBadge
                        kind="hardware"
                        status={example.hardware}
                        compact
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="method" className="scroll-mt-24">
            <div className="flex items-center gap-2">
              <Layers aria-hidden="true" className="h-5 w-5 text-accent-bright" />
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                How the data is built
              </h2>
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-text-secondary">
              The official Space Apps challenge dataset was not included in this
              workspace. Instead of inventing records, this build uses public
              NASA pages and adapts them to one canonical model. The process is
              intentionally visible so a reviewer can check it.
            </p>

            <div className="mt-6 rounded-xl border border-warning/30 bg-warning/[0.06] p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-[#FFD79A]">
                <FileWarning aria-hidden="true" className="h-4 w-4" />
                Provenance limitation
              </p>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                The supplied project folder contained{" "}
                <code className="rounded bg-black/30 px-1.5 py-0.5 text-xs text-text-primary">
                  GRAVERSE_PROJECT_BLUEPRINT.md
                </code>{" "}
                and a visual reference image, but not the official NASA challenge
                data files or resource bundle. The normalized dataset was
                therefore built from public NASA mission pages, NASA/NSSDCA
                spacecraft and experiment records, and NASA image records. This
                is a documented substitution, not a claim that the official
                dataset was used.
              </p>
            </div>

            <ol className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                {
                  title: "Inspect the supplied workspace",
                  body: "Inventory the blueprint, reference image, repository and any data files. No official challenge dataset was found.",
                },
                {
                  title: "Choose public NASA records",
                  body: "Use NASA mission pages for current status and NSSDCA records for identifiers and technical facts; use NASA image records for media.",
                },
                {
                  title: "Normalize into one model",
                  body: "Map names, dates, events, statuses, contributions, location, media and source IDs into the canonical Artifact type.",
                },
                {
                  title: "Preserve original wording",
                  body: "Keep the source status wording in dedicated fields so mapping decisions can be reviewed.",
                },
                {
                  title: "Validate and flag gaps",
                  body: "Reject unknown source IDs, keep date precision, and label uncertainty instead of filling gaps.",
                },
                {
                  title: "Verify against sources",
                  body: "Open each source during the build, record the access date, and list every source on the artifact page.",
                },
              ].map((step, index) => (
                <li
                  key={step.title}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
                >
                  <p className="font-mono text-[10px] text-accent-bright">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-sm font-semibold text-text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section id="coverage" className="scroll-mt-24">
            <div className="flex items-center gap-2">
              <ListChecks aria-hidden="true" className="h-5 w-5 text-accent-bright" />
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                What is included — and what is not
              </h2>
            </div>
            <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">
                  Data fields included in the normalized records
                </caption>
                <thead className="bg-white/[0.03] text-[10px] uppercase tracking-[0.14em] text-text-muted">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Field
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      State
                    </th>
                    <th scope="col" className="hidden px-4 py-3 font-medium md:table-cell">
                      Detail
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {coverage.map((row) => (
                    <tr key={row.field} className="align-top">
                      <th
                        scope="row"
                        className="px-4 py-3 text-xs font-medium text-text-primary sm:text-sm"
                      >
                        {row.field}
                        <p className="mt-1 text-xs font-normal leading-relaxed text-text-muted md:hidden">
                          {row.detail}
                        </p>
                      </th>
                      <td className="px-4 py-3 text-xs text-text-secondary">
                        {row.state}
                      </td>
                      <td className="hidden px-4 py-3 text-xs leading-relaxed text-text-muted md:table-cell">
                        {row.detail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="limitations" className="scroll-mt-24">
            <div className="flex items-center gap-2">
              <AlertTriangle aria-hidden="true" className="h-5 w-5 text-warning" />
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                Limitations to keep in mind
              </h2>
            </div>
            <ul className="mt-4 space-y-3">
              {[
                "The official NASA challenge dataset was unavailable. Public NASA pages are the source base; they may be updated after this build, and the access date is recorded with every source.",
                "A mission can be complete while its hardware remains intact. Where a source does not document a final physical condition, the record uses Unknown and explains why.",
                "Named landing sites and regions are preserved. Coordinates are not plotted because the normalized records do not include a verified coordinate pair.",
                "No 3D models were supplied or verified, so no geometry was invented. NASA imagery is used, and artist concepts are labelled.",
                "Perseverance's odometer, Voyager instrument health and similar current figures are time-sensitive. The record shows the reported date rather than implying live telemetry.",
              ].map((limitation) => (
                <li
                  key={limitation}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-text-secondary"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-warning"
                  />
                  {limitation}
                </li>
              ))}
            </ul>
          </section>

          <section id="accessibility" className="scroll-mt-24">
            <div className="flex items-center gap-2">
              <Accessibility
                aria-hidden="true"
                className="h-5 w-5 text-accent-bright"
              />
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                Accessibility and performance choices
              </h2>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                {
                  title: "List view is a first-class route",
                  body: "Every timeline record can be read in a plain list. The timeline never hides information that the list does not contain.",
                },
                {
                  title: "Keyboard support",
                  body: "Mode tabs, timeline milestones, filters, menus and disclosures work with the keyboard. Arrow keys move between timeline events.",
                },
                {
                  title: "Reduced motion",
                  body: "The site respects the operating-system preference and includes an explicit motion toggle. CSS depth and parallax are removed when motion is reduced.",
                },
                {
                  title: "No WebGL dependency",
                  body: "The timeline uses HTML, CSS and lightweight transforms. No 3D engine is needed to access any fact or action.",
                },
                {
                  title: "Honest media",
                  body: "Images have descriptive alt text, captions and credits. Artist concepts are labelled. Missing media shows a neutral placeholder.",
                },
                {
                  title: "Reserved media space",
                  body: "Images load through Next.js image optimization with fixed aspect ratios to avoid layout shifts.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
                >
                  <p className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                    <CheckCircle2
                      aria-hidden="true"
                      className="h-4 w-4 text-success"
                    />
                    {item.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section id="sources" className="scroll-mt-24">
            <div className="flex items-center gap-2">
              <ShieldCheck
                aria-hidden="true"
                className="h-5 w-5 text-accent-bright"
              />
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                Sources
              </h2>
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-secondary">
              Every record points at the NASA pages used to build it. All links
              were opened during the build session; access dates are recorded.
              Source notes describe which facts each page supports.
            </p>
            <ul className="mt-6 space-y-2.5">
              {sources.map((source) => (
                <li
                  key={source.id}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-text-muted">
                      {sourceTypeLabels[source.type]}
                    </span>
                    <span className="font-mono text-[10px] text-text-muted">
                      {source.id}
                    </span>
                    <span className="text-[10px] text-text-muted">
                      Accessed {formatDate(source.accessedAt)}
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
                    className="mt-2 inline-flex items-baseline gap-1.5 break-all text-xs text-accent-bright hover:text-white"
                  >
                    {source.url}
                    <ExternalLink
                      aria-hidden="true"
                      className="h-3 w-3 shrink-0 self-center"
                    />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <div className="relative overflow-hidden rounded-2xl border border-brand-teal/25 bg-surface p-6">
            <h2 className="text-lg font-semibold text-white">
              Start with a real record
            </h2>
            <p className="mt-1.5 max-w-2xl text-sm text-text-secondary">
              Open Apollo 11&apos;s Eagle, Perseverance or Voyager 1 to see how
              the story, status separation and sources fit together.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                ["/museum/apollo-11-lm-descent-stage", "Apollo 11 Eagle"],
                ["/museum/perseverance", "Perseverance"],
                ["/museum/voyager-1", "Voyager 1"],
              ].map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-text-primary transition-colors hover:border-accent/50 hover:bg-white/[0.08]"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
