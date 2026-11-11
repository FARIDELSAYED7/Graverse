import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, MapPin, Telescope } from "lucide-react";
import { ArtifactCard } from "@/components/artifacts/ArtifactCard";
import { FactGrid } from "@/components/explorer/FactGrid";
import { ClaimLegend } from "@/components/ui/ClaimBadge";
import { SourceList } from "@/components/ui/SourceList";
import { getArtifacts } from "@/data/artifacts";
import { celestialBodies, getBody } from "@/data/space/bodies";
import { getRelations } from "@/data/relations";
import type { EntityKind } from "@/data/relations";

type PageProps = { params: { id: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return celestialBodies.map((body) => ({ id: body.id }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const body = getBody(params.id);
  if (!body) return { title: "Destination not found" };
  return {
    title: `${body.name} — destination record`,
    description: body.summary,
    openGraph: { title: `${body.name} · GRAVERSE`, description: body.summary },
  };
}

const kindLabels: Record<string, string> = {
  star: "Star",
  planet: "Planet",
  "dwarf-planet": "Dwarf planet",
  moon: "Moon",
};

const relatedKindHeading: Partial<Record<EntityKind, string>> = {
  artifact: "Artifacts",
  lesson: "Academy lessons",
  journey: "Academy journeys",
  article: "Articles",
  mission: "Missions",
  agency: "Agencies",
  body: "Related worlds",
  "deep-sky": "Deep sky",
};

export default function BodyPage({ params }: PageProps) {
  const body = getBody(params.id);
  if (!body) notFound();

  const relatedArtifacts = getArtifacts(body.relatedArtifactIds);
  const relations = getRelations(`body:${body.id}`);
  const parent = body.parentId ? getBody(body.parentId) : undefined;
  const children = celestialBodies.filter((entry) => entry.parentId === body.id);
  const index = celestialBodies.findIndex((entry) => entry.id === body.id);
  const previous = index > 0 ? celestialBodies[index - 1] : undefined;
  const next =
    index >= 0 && index < celestialBodies.length - 1
      ? celestialBodies[index + 1]
      : undefined;

  const grouped = new Map<EntityKind, typeof relations>();
  for (const relation of relations) {
    const list = grouped.get(relation.to.kind) ?? [];
    list.push(relation);
    grouped.set(relation.to.kind, list);
  }

  return (
    <article className="container-content pb-16 pt-8">
      <nav aria-label="Breadcrumb" className="text-xs text-text-muted">
        <Link href="/explorer" className="hover:text-white">
          Explorer
        </Link>
        <span aria-hidden="true" className="px-1.5">
          /
        </span>
        <Link href="/explorer/bodies" className="hover:text-white">
          Destinations
        </Link>
        <span aria-hidden="true" className="px-1.5">
          /
        </span>
        <span className="text-text-secondary">{body.name}</span>
      </nav>

      <header className="mt-5 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-brand-cyan/35 bg-brand-cyan/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-cyan">
              {kindLabels[body.kind] ?? body.kind}
            </span>
            {parent ? (
              <Link
                href={`/explorer/bodies/${parent.id}`}
                className="text-[11px] uppercase tracking-[0.14em] text-text-muted hover:text-white"
              >
                Orbits {parent.name}
              </Link>
            ) : null}
          </div>
          <h1
            className="mt-4 text-balance text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl"
            style={{ color: body.accent }}
          >
            {body.name}
          </h1>
          <p className="mt-2 text-base text-text-secondary">{body.tagline}</p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-text-secondary">
            {body.summary}
          </p>
          <p className="mt-4 flex items-center gap-1.5 text-xs text-text-muted">
            <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
            {body.distanceLabel}
          </p>
        </div>

        <div
          aria-hidden="true"
          className="relative aspect-square max-h-72 overflow-hidden rounded-2xl border border-white/10"
          style={{
            background: `radial-gradient(circle at 35% 28%, ${body.accent}66, transparent 55%), radial-gradient(circle at 70% 76%, ${body.accent}26, #040a14 70%)`,
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: `radial-gradient(circle at 32% 28%, ${body.accent}, ${body.accent}55 58%, #040a14 100%)`,
              boxShadow: `0 0 80px ${body.accent}40`,
            }}
          />
          <p className="absolute bottom-3 right-3 rounded-full border border-white/10 bg-black/40 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-text-muted">
            Schematic, not a photo
          </p>
        </div>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
        <div className="min-w-0 space-y-12">
          <section aria-labelledby="overview-heading">
            <h2
              id="overview-heading"
              className="text-lg font-semibold tracking-tight text-text-primary"
            >
              Overview
            </h2>
            <div className="mt-3 space-y-3 text-[15px] leading-7 text-text-secondary">
              {body.overview.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section aria-labelledby="facts-heading">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h2
                id="facts-heading"
                className="text-lg font-semibold tracking-tight text-text-primary"
              >
                Key facts
              </h2>
              <p className="text-xs text-text-muted">
                Last verified {body.lastVerified}
              </p>
            </div>
            <div className="mt-3">
              <FactGrid facts={body.facts} />
            </div>
            <div className="mt-4">
              <ClaimLegend />
            </div>
          </section>

          <section aria-labelledby="exploration-heading">
            <h2
              id="exploration-heading"
              className="text-lg font-semibold tracking-tight text-text-primary"
            >
              Exploration
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-text-secondary">
              {body.exploration}
            </p>
            <h3 className="mt-5 text-sm font-semibold text-text-primary">
              What makes it notable
            </h3>
            <ul className="mt-2 space-y-1.5">
              {body.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: body.accent }}
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          </section>

          {relatedArtifacts.length ? (
            <section aria-labelledby="artifacts-heading">
              <h2
                id="artifacts-heading"
                className="text-lg font-semibold tracking-tight text-text-primary"
              >
                Hardware in the collection
              </h2>
              <p className="mt-1.5 text-sm text-text-muted">
                Source-linked museum records associated with this destination.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {relatedArtifacts.map((artifact) => (
                  <ArtifactCard key={artifact.id} artifact={artifact} />
                ))}
              </div>
            </section>
          ) : null}

          {children.length ? (
            <section aria-labelledby="children-heading">
              <h2
                id="children-heading"
                className="text-lg font-semibold tracking-tight text-text-primary"
              >
                Worlds that orbit {body.name}
              </h2>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {children.map((child) => (
                  <li key={child.id}>
                    <Link
                      href={`/explorer/bodies/${child.id}`}
                      className="group flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-3.5 transition-colors hover:border-brand-cyan/40 hover:bg-white/[0.04]"
                    >
                      <span>
                        <span className="block text-sm font-medium text-text-primary">
                          {child.name}
                        </span>
                        <span className="mt-0.5 block text-xs text-text-muted">
                          {child.tagline}
                        </span>
                      </span>
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-text-muted group-hover:text-white"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {grouped.size ? (
            <section aria-labelledby="relations-heading">
              <h2
                id="relations-heading"
                className="text-lg font-semibold tracking-tight text-text-primary"
              >
                Connected records
              </h2>
              <p className="mt-1.5 text-sm text-text-muted">
                Typed, bidirectional links from the shared collection graph.
              </p>
              <div className="mt-4 space-y-4">
                {[...grouped.entries()].map(([kind, list]) => (
                  <div key={kind}>
                    <h3 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                      {relatedKindHeading[kind] ?? kind}
                    </h3>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {list.map((relation) => (
                        <li key={`${relation.type}-${relation.to.id}`}>
                          <Link
                            href={relation.to.href}
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-text-secondary transition-colors hover:border-brand-cyan/40 hover:text-white"
                          >
                            {relation.to.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section aria-labelledby="sources-heading">
            <div className="flex items-center gap-2">
              <Telescope aria-hidden="true" className="h-4 w-4 text-brand-cyan" />
              <h2
                id="sources-heading"
                className="text-lg font-semibold tracking-tight text-text-primary"
              >
                Sources and verification
              </h2>
            </div>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-text-muted">
              Values were checked against these public NASA and agency records
              on {body.lastVerified}. Links open in a new tab.
            </p>
            <div className="mt-4">
              <SourceList ids={body.sourceIds} title="Reference records" />
            </div>
          </section>

          <nav
            aria-label="Destination navigation"
            className="grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2"
          >
            {previous ? (
              <Link
                href={`/explorer/bodies/${previous.id}`}
                className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-brand-cyan/40"
              >
                <ArrowLeft
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan"
                />
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-text-muted">
                    Previous destination
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
                href={`/explorer/bodies/${next.id}`}
                className="group flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-right transition-colors hover:border-brand-cyan/40"
              >
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-text-muted">
                    Next destination
                  </span>
                  <span className="mt-1 block text-sm font-medium text-text-primary">
                    {next.name}
                  </span>
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan"
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
                <dt className="text-text-muted">Orbital period</dt>
                <dd className="mt-0.5 font-medium text-text-primary">
                  {body.orbitalPeriod}
                </dd>
              </div>
              <div>
                <dt className="text-text-muted">Day length</dt>
                <dd className="mt-0.5 font-medium text-text-primary">
                  {body.dayLength}
                </dd>
              </div>
              <div>
                <dt className="text-text-muted">Radius</dt>
                <dd className="mt-0.5 font-mono tabular-nums text-text-primary">
                  {body.radius}
                </dd>
              </div>
              <div>
                <dt className="text-text-muted">Moons</dt>
                <dd className="mt-0.5 font-medium text-text-primary">
                  {body.moonCount}
                </dd>
              </div>
              <div>
                <dt className="text-text-muted">Temperature</dt>
                <dd className="mt-0.5 font-medium text-text-primary">
                  {body.temperature}
                </dd>
              </div>
              <div>
                <dt className="text-text-muted">Discovery</dt>
                <dd className="mt-0.5 font-medium text-text-primary">
                  {body.discovery}
                </dd>
              </div>
            </dl>
          </div>
          <div className="mt-4 rounded-xl border border-white/10 bg-bg-elevated/60 p-4 text-xs leading-relaxed text-text-muted">
            Facts are never presented as more certain than their sources. Values
            without a primary source are labelled Unknown.
          </div>
        </aside>
      </div>
    </article>
  );
}
