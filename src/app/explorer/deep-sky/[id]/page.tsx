import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Telescope } from "lucide-react";
import { FactGrid } from "@/components/explorer/FactGrid";
import { ClaimLegend } from "@/components/ui/ClaimBadge";
import { SourceList } from "@/components/ui/SourceList";
import { deepSkyObjects, getDeepSkyObject } from "@/data/space/deep-sky";

type PageProps = { params: { id: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return deepSkyObjects.map((object) => ({ id: object.id }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const object = getDeepSkyObject(params.id);
  if (!object) return { title: "Deep-sky object not found" };
  return {
    title: `${object.name} (${object.catalogName})`,
    description: object.summary,
    openGraph: {
      title: `${object.name} · GRAVERSE`,
      description: object.summary,
    },
  };
}

export default function DeepSkyPage({ params }: PageProps) {
  const object = getDeepSkyObject(params.id);
  if (!object) notFound();

  const index = deepSkyObjects.findIndex((entry) => entry.id === object.id);
  const previous = index > 0 ? deepSkyObjects[index - 1] : undefined;
  const next =
    index >= 0 && index < deepSkyObjects.length - 1
      ? deepSkyObjects[index + 1]
      : undefined;

  return (
    <article className="container-content pb-16 pt-8">
      <nav aria-label="Breadcrumb" className="text-xs text-text-muted">
        <Link href="/explorer" className="hover:text-white">
          Explorer
        </Link>
        <span aria-hidden="true" className="px-1.5">
          /
        </span>
        <Link href="/explorer/deep-sky" className="hover:text-white">
          Deep sky
        </Link>
        <span aria-hidden="true" className="px-1.5">
          /
        </span>
        <span className="text-text-secondary">{object.name}</span>
      </nav>

      <header className="mt-5 max-w-3xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-brand-cyan/35 bg-brand-cyan/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-cyan">
            {object.kindLabel}
          </span>
          <span className="text-[11px] uppercase tracking-[0.16em] text-text-muted">
            {object.catalogName} · {object.constellation}
          </span>
        </div>
        <h1
          className="mt-4 text-balance text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl"
          style={{ color: object.accent }}
        >
          {object.name}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
          {object.summary}
        </p>
      </header>

      <div
        aria-hidden="true"
        className="mt-6 h-40 overflow-hidden rounded-2xl border border-white/10 sm:h-56"
        style={{
          backgroundImage: `radial-gradient(circle at 28% 30%, ${object.accent}66, transparent 58%), radial-gradient(circle at 72% 68%, ${object.accent}33, transparent 62%), linear-gradient(140deg, #050b18, #0a1426)`,
        }}
      >
        <p className="flex h-full items-end justify-end p-3 text-[10px] uppercase tracking-[0.14em] text-text-muted">
          Schematic gradient — no telescope image is included
        </p>
      </div>

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
              {object.overview.map((paragraph) => (
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
                Last verified {object.lastVerified}
              </p>
            </div>
            <div className="mt-3">
              <FactGrid facts={object.facts} />
            </div>
            <div className="mt-4">
              <ClaimLegend />
            </div>
          </section>

          <section aria-labelledby="history-heading">
            <h2
              id="history-heading"
              className="text-lg font-semibold tracking-tight text-text-primary"
            >
              Discovery and observation
            </h2>
            <dl className="mt-3 space-y-4 text-sm leading-relaxed">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                  Discovery
                </dt>
                <dd className="mt-1 text-text-secondary">{object.discovery}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                  Observation
                </dt>
                <dd className="mt-1 text-text-secondary">{object.observation}</dd>
              </div>
            </dl>
          </section>

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
              Checked against the linked NASA record on {object.lastVerified}.
              Distances published as ranges stay ranges.
            </p>
            <div className="mt-4">
              <SourceList ids={object.sourceIds} title="Reference records" />
            </div>
          </section>

          <nav
            aria-label="Deep-sky navigation"
            className="grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2"
          >
            {previous ? (
              <Link
                href={`/explorer/deep-sky/${previous.id}`}
                className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-brand-cyan/40"
              >
                <ArrowLeft
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan"
                />
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-text-muted">
                    Previous object
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
                href={`/explorer/deep-sky/${next.id}`}
                className="group flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-right transition-colors hover:border-brand-cyan/40"
              >
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-text-muted">
                    Next object
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
                <dt className="text-text-muted">Catalog</dt>
                <dd className="mt-0.5 font-medium text-text-primary">
                  {object.catalogName}
                </dd>
              </div>
              <div>
                <dt className="text-text-muted">Type</dt>
                <dd className="mt-0.5 font-medium text-text-primary">
                  {object.kindLabel}
                </dd>
              </div>
              <div>
                <dt className="text-text-muted">Constellation</dt>
                <dd className="mt-0.5 font-medium text-text-primary">
                  {object.constellation}
                </dd>
              </div>
              <div>
                <dt className="text-text-muted">Distance</dt>
                <dd className="mt-0.5 font-medium text-text-primary">
                  {object.distance}
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </article>
  );
}
