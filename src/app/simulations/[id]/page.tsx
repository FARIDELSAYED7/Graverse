import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, FlaskConical, Target } from "lucide-react";
import { ArtifactCard } from "@/components/artifacts/ArtifactCard";
import { ApproximationNote } from "@/components/ui/ApproximationNote";
import { SourceList } from "@/components/ui/SourceList";
import { Simulator } from "@/components/simulations/Simulators";
import { AskGraverseButton } from "@/components/ask/AskGraverseButton";
import { AskGraverseScope } from "@/components/ask/AskGraverseScope";
import { getSimulation, simulations } from "@/data/simulations";
import { getArtifacts } from "@/data/artifacts";
import { getLocale } from "@/lib/locale";

type PageProps = { params: { id: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return simulations.map((simulation) => ({ id: simulation.id }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const simulation = getSimulation(params.id);
  if (!simulation) return { title: "Simulation not found" };
  return { title: simulation.title, description: simulation.description };
}

export default function SimulationPage({ params }: PageProps) {
  const simulation = getSimulation(params.id);
  if (!simulation) notFound();
  const locale = getLocale();

  const index = simulations.findIndex((entry) => entry.id === simulation.id);
  const previous = index > 0 ? simulations[index - 1] : undefined;
  const next =
    index >= 0 && index < simulations.length - 1 ? simulations[index + 1] : undefined;
  const artifacts = getArtifacts(simulation.artifactIds);

  return (
    <article className="pb-16">
      <div
        aria-hidden="true"
        className="h-1 w-full"
        style={{ backgroundColor: simulation.accent }}
      />
      <div className="container-content pt-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-text-muted">
            <li>
              <Link href="/simulations" className="-my-1.5 inline-flex items-center py-1.5 hover:text-white">
                Mission Experience Lab
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-text-secondary">{simulation.title}</li>
          </ol>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p
              className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: simulation.accent }}
            >
              <FlaskConical aria-hidden="true" className="h-3.5 w-3.5" />
              {simulation.number} · Educational model
            </p>
            <h1 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              {simulation.title}
            </h1>
            <p className="mt-2 text-base font-medium text-text-secondary">
              {simulation.tagline}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-secondary">
              {simulation.description}
            </p>

            <AskGraverseScope
              context={{
                kind: "simulation",
                id: simulation.id,
                title: simulation.title,
                subtitle: `Educational model ${simulation.number}`,
                href: `/simulations/${simulation.id}`,
              }}
            >
              <div className="mt-4">
                <AskGraverseButton locale={locale} />
              </div>
            </AskGraverseScope>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-text-primary">
              <Target aria-hidden="true" className="h-4 w-4 text-accent-bright" />
              Learning objectives
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-text-secondary">
              {simulation.objectives.map((objective) => (
                <li key={objective} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-bright" />
                  {objective}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[10px] uppercase tracking-[0.14em] text-text-muted">
              Concepts
            </p>
            <ul className="mt-1.5 flex flex-wrap gap-1.5">
              {simulation.concepts.map((concept) => (
                <li
                  key={concept}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-text-secondary"
                >
                  {concept}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="container-content mt-8">
        <ApproximationNote locale={locale}>{simulation.approximation}</ApproximationNote>
      </div>

      <div className="container-content mt-6 rounded-2xl border border-white/10 bg-bg-elevated/60 p-4 sm:p-6">
        <Simulator id={simulation.id} locale={locale} />
      </div>

      <div className="container-content mt-12">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-text-secondary">
          Records used in this lab
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {artifacts.map((artifact) => (
            <ArtifactCard key={artifact.id} artifact={artifact} />
          ))}
        </div>
      </div>

      <div className="container-content mt-10 max-w-3xl">
        <SourceList ids={simulation.sourceIds} title="Sources behind this lab" compact />
      </div>

      <div className="container-content mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6">
        {previous ? (
          <Link href={previous.href} className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-white">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={next.href} className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-white">
            {next.title}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
