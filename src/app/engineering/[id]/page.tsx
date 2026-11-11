import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Cog, Lightbulb, Wrench } from "lucide-react";
import { ArtifactCard } from "@/components/artifacts/ArtifactCard";
import { SourceList } from "@/components/ui/SourceList";
import {
  engineeringSystemLabels,
  engineeringTopics,
  getEngineeringTopic,
} from "@/data/engineering";
import { getArtifacts } from "@/data/artifacts";

type PageProps = { params: { id: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return engineeringTopics.map((topic) => ({ id: topic.id }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const topic = getEngineeringTopic(params.id);
  if (!topic) return { title: "Engineering topic not found" };
  return {
    title: topic.title,
    description: topic.summary,
  };
}

export default function EngineeringTopicPage({ params }: PageProps) {
  const topic = getEngineeringTopic(params.id);
  if (!topic) notFound();

  const artifacts = getArtifacts(topic.artifactIds);
  const index = engineeringTopics.findIndex((entry) => entry.id === topic.id);
  const previous = index > 0 ? engineeringTopics[index - 1] : undefined;
  const next =
    index >= 0 && index < engineeringTopics.length - 1
      ? engineeringTopics[index + 1]
      : undefined;

  return (
    <article className="pb-16">
      <div className="brand-rule" />
      <div className="container-content pt-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-text-muted">
            <li>
              <Link href="/engineering" className="-my-1.5 inline-flex items-center py-1.5 hover:text-white">
                Engineering Lab
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>{engineeringSystemLabels[topic.system]}</li>
            <li aria-hidden="true">/</li>
            <li className="text-text-secondary">{topic.title}</li>
          </ol>
        </nav>

        <div className="mt-6 max-w-3xl">
          <p className="eyebrow flex items-center gap-2">
            <Wrench aria-hidden="true" className="h-3.5 w-3.5" />
            {engineeringSystemLabels[topic.system]}
          </p>
          <h1 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-text-primary sm:text-4xl">
            {topic.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-text-secondary">
            {topic.question}
          </p>
        </div>
      </div>

      <div className="container-content mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
        <div className="min-w-0 space-y-8">
          {topic.body.map((paragraph) => (
            <p key={paragraph} className="max-w-3xl text-[15px] leading-7 text-text-secondary">
              {paragraph}
            </p>
          ))}

          {topic.comparison ? (
            <section aria-labelledby="comparison-heading">
              <h2
                id="comparison-heading"
                className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-text-secondary"
              >
                <Cog aria-hidden="true" className="h-4 w-4 text-accent-bright" />
                At a glance
              </h2>
              <dl className="mt-4 grid gap-3 sm:grid-cols-3">
                {topic.comparison.map((row) => (
                  <div key={row.label} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <dt className="text-[10px] uppercase tracking-[0.14em] text-text-muted">
                      {row.label}
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-text-primary">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}

          <section
            aria-labelledby="takeaway-heading"
            className="rounded-2xl border border-accent/25 bg-surface p-5"
          >
            <h2
              id="takeaway-heading"
              className="flex items-center gap-2 text-sm font-semibold text-text-primary"
            >
              <Lightbulb aria-hidden="true" className="h-4 w-4 text-accent-bright" />
              Engineering takeaway
            </h2>
            <p className="mt-2 text-[15px] leading-7 text-text-primary">
              {topic.takeaway}
            </p>
          </section>

          <section aria-labelledby="linked-heading">
            <h2
              id="linked-heading"
              className="text-sm font-semibold uppercase tracking-[0.16em] text-text-secondary"
            >
              Linked artifact records
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {artifacts.map((artifact) => (
                <ArtifactCard key={artifact.id} artifact={artifact} />
              ))}
            </div>
          </section>

          <SourceList ids={topic.sourceIds} title="Sources for this explainer" compact />
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <h2 className="text-sm font-semibold text-text-primary">In this lab</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {engineeringTopics.map((entry) => (
                <li key={entry.id}>
                  <Link
                    href={`/engineering/${entry.id}`}
                    aria-current={entry.id === topic.id ? "page" : undefined}
                    className={
                      entry.id === topic.id
                        ? "font-medium text-accent-bright"
                        : "text-text-secondary hover:text-white"
                    }
                  >
                    {entry.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-sm leading-relaxed text-text-secondary">
            <h2 className="text-sm font-semibold text-text-primary">Build one yourself</h2>
            <p className="mt-2">
              The Academy has a rover builder with a simple mass and power budget.
            </p>
            <Link
              href="/academy/build-rover"
              className="mt-3 inline-flex items-center gap-1.5 font-medium text-accent-bright hover:text-white"
            >
              Open the rover builder
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
          </div>
        </aside>
      </div>

      <div className="container-content mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6">
        {previous ? (
          <Link
            href={`/engineering/${previous.id}`}
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-white"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/engineering/${next.id}`}
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-white"
          >
            {next.title}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
