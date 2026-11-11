import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Cog, Wrench } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  engineeringSystemLabels,
  engineeringTopics,
  type EngineeringSystem,
} from "@/data/engineering";
import { getArtifacts } from "@/data/artifacts";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Engineering Lab — how space hardware works",
  description:
    "Source-linked explainers on power, mobility, landing, communication, instruments and materials, anchored to real artifacts in the collection.",
};

const systemOrder: EngineeringSystem[] = [
  "power",
  "mobility",
  "landing",
  "communication",
  "instruments",
  "materials",
  "evolution",
];

export default function EngineeringPage() {
  const locale = getLocale();

  return (
    <div className="pb-16">
      <section className="border-b border-white/10">
        <div className="container-content py-12 sm:py-16">
          <p className="eyebrow flex items-center gap-2">
            <Wrench aria-hidden="true" className="h-3.5 w-3.5" />
            {t(locale, "sections.engineering.eyebrow")}
          </p>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
            {t(locale, "sections.engineering.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
            {t(locale, "sections.engineering.description")}
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-muted">
            Each topic explains an engineering trade-off. The specifications
            themselves stay on the linked artifact records, with their own
            sources.
          </p>
        </div>
      </section>

      <div className="container-content space-y-12 pt-10">
        {systemOrder.map((system) => {
          const topics = engineeringTopics.filter((topic) => topic.system === system);
          if (topics.length === 0) return null;
          return (
            <section key={system} aria-labelledby={`system-${system}`}>
              <SectionHeading
                eyebrow={`System ${String(systemOrder.indexOf(system) + 1).padStart(2, "0")}`}
                title={engineeringSystemLabels[system]}
              />
              <ul className="mt-5 grid gap-4 lg:grid-cols-2">
                {topics.map((topic) => {
                  const artifacts = getArtifacts(topic.artifactIds);
                  return (
                    <li key={topic.id}>
                      <Link
                        href={`/engineering/${topic.id}`}
                        className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-accent/40 hover:bg-white/[0.05]"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent-bright">
                            <Cog aria-hidden="true" className="h-4 w-4" />
                          </span>
                          <span className="text-[10px] uppercase tracking-[0.16em] text-text-muted">
                            {artifacts.length} linked records
                          </span>
                        </div>
                        <h3 className="mt-4 text-lg font-semibold leading-snug text-text-primary">
                          {topic.title}
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                          {topic.summary}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-bright">
                          Read the explainer
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
          );
        })}
      </div>
    </div>
  );
}
