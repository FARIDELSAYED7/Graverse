import type { Metadata } from "next";
import Link from "next/link";
import {
  Database,
  Download,
  FileJson,
  History,
  Microscope,
  ShieldCheck,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  apiEndpoints,
  changelog,
  coverageNotes,
  methodSections,
} from "@/data/research";
import { allArtifacts } from "@/data/artifacts";
import { sources } from "@/data/sources";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Research Archive — method, sources and limits",
  description:
    "How GRAVERSE selects records, labels claims, separates mission, hardware and communication status, and documents what the collection does not cover.",
};

export default function ResearchPage() {
  const locale = getLocale();
  const lastVerified = allArtifacts.reduce(
    (latest, artifact) => (artifact.lastVerified > latest ? artifact.lastVerified : latest),
    ""
  );

  return (
    <div className="pb-16">
      <section className="border-b border-white/10">
        <div className="container-content py-12 sm:py-16">
          <p className="eyebrow flex items-center gap-2">
            <Microscope aria-hidden="true" className="h-3.5 w-3.5" />
            {t(locale, "sections.research.eyebrow")}
          </p>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
            {t(locale, "sections.research.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
            {t(locale, "sections.research.description")}
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Artifact records", value: allArtifacts.length },
              { label: "Registered sources", value: sources.length },
              { label: "Method sections", value: methodSections.length },
              { label: "Last verified", value: lastVerified },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <dt className="text-[10px] uppercase tracking-[0.14em] text-text-muted">
                  {stat.label}
                </dt>
                <dd className="mt-1 font-mono text-lg tabular-nums text-brand-cyan">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="container-content grid gap-10 pt-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
        <div className="min-w-0 space-y-12">
          {methodSections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <SectionHeading title={section.heading} />
              <div className="mt-4 space-y-3">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="max-w-3xl text-[15px] leading-7 text-text-secondary">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <section id="coverage" className="scroll-mt-24">
            <SectionHeading
              title="Coverage and known gaps"
              description="The collection is finite. A missing record is a gap, not evidence that an object does not exist."
            />
            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full border-collapse text-start text-sm">
                <thead className="bg-white/[0.04] text-[10px] uppercase tracking-[0.14em] text-text-muted">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-medium">Area</th>
                    <th scope="col" className="px-4 py-3 font-medium">Coverage</th>
                    <th scope="col" className="hidden px-4 py-3 font-medium sm:table-cell">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {coverageNotes.map((row) => (
                    <tr key={row.label} className="border-t border-white/[0.06] align-top">
                      <td className="px-4 py-3 font-medium text-text-primary">{row.label}</td>
                      <td className="px-4 py-3 text-text-secondary">{row.value}</td>
                      <td className="hidden px-4 py-3 text-xs text-text-muted sm:table-cell">
                        {row.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="changelog" className="scroll-mt-24">
            <SectionHeading title="Changelog" description="Every dataset change is dated." />
            <ol className="mt-4 space-y-4 border-s border-white/12 ps-6">
              {changelog.map((entry) => (
                <li key={entry.version} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -start-[31px] top-1.5 h-3 w-3 rounded-full border border-accent-bright bg-accent-bright"
                  />
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-accent-bright">
                      v{entry.version}
                    </span>
                    <span className="text-xs text-text-muted">{entry.date}</span>
                  </div>
                  <h3 className="mt-1 text-base font-semibold text-text-primary">
                    {entry.title}
                  </h3>
                  <ul className="mt-2 list-disc space-y-1 ps-5 text-sm leading-relaxed text-text-secondary">
                    {entry.changes.map((change) => (
                      <li key={change}>{change}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>

          <section id="limitations" className="scroll-mt-24">
            <SectionHeading
              title="Honest limitations"
              description="These are known gaps in this build, not hidden implementation details."
            />
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                {
                  title: "Editorial prose is English-only",
                  body: "Navigation, footer, homepage and the new section chrome are translated into Arabic with RTL layout. Full Arabic translation of every artifact and lesson is not complete.",
                },
                {
                  title: "No photoreal 3D reconstructions",
                  body: "The schematic viewer is built from generic primitives and labels. It is not a reconstruction of a specific spacecraft.",
                },
                {
                  title: "Status is a snapshot",
                  body: "Communication status is derived from the recorded hardware status. No live telemetry is ingested, and old verification dates are shown as snapshots.",
                },
                {
                  title: "Personal data stays local",
                  body: "Favourites, collections, recent views and simulation completions are stored in this browser. There is no account, cloud sync or server profile.",
                },
              ].map((item) => (
                <li key={item.title} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <h3 className="text-sm font-semibold text-text-primary">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{item.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="api" className="scroll-mt-24">
            <SectionHeading
              title="Open dataset"
              description="The public dataset is available as JSON. It is generated from the same typed modules that build the pages."
            />
            <div className="mt-4 space-y-3">
              {apiEndpoints.map((endpoint) => (
                <div key={endpoint.path} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded border border-emerald-400/30 bg-emerald-400/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-200">
                      {endpoint.method}
                    </span>
                    <code className="font-mono text-sm text-text-primary">{endpoint.path}</code>
                  </div>
                  <p className="mt-2 text-sm text-text-secondary">{endpoint.description}</p>
                  <p className="mt-1 text-xs text-text-muted">{endpoint.notes}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="/api/export"
                className="btn-primary inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
              >
                <Download aria-hidden="true" className="h-4 w-4" />
                Download the full dataset
              </a>
              <a
                href="/api/export?dataset=sources"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-accent/50 hover:text-white"
              >
                <FileJson aria-hidden="true" className="h-4 w-4" />
                Source registry only
              </a>
            </div>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <nav
            aria-label="Research sections"
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-4"
          >
            <h2 className="text-sm font-semibold text-text-primary">On this page</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                ...methodSections.map((section) => ({ id: section.id, heading: section.heading })),
                { id: "coverage", heading: "Coverage and known gaps" },
                { id: "changelog", heading: "Changelog" },
                { id: "limitations", heading: "Honest limitations" },
                { id: "api", heading: "Open dataset" },
              ].map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-text-secondary hover:text-white">
                    {item.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-sm leading-relaxed text-text-secondary">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-text-primary">
              <ShieldCheck aria-hidden="true" className="h-4 w-4 text-accent-bright" />
              Source registry
            </h2>
            <p className="mt-2">
              Every source records its organisation, title, URL, type and access date.
            </p>
            <Link
              href="/sources"
              className="mt-3 inline-flex items-center gap-1.5 font-medium text-accent-bright hover:text-white"
            >
              Open the registry
              <Database aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-sm leading-relaxed text-text-secondary">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-text-primary">
              <History aria-hidden="true" className="h-4 w-4 text-accent-bright" />
              Update procedure
            </h2>
            <p className="mt-2">
              A status change requires a new or updated source. Records are never
              silently rewritten.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
