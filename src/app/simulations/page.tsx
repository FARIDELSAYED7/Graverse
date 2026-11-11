import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FlaskConical, PlayCircle } from "lucide-react";
import { simulations } from "@/data/simulations";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Mission Experience Lab — eight educational space simulations",
  description:
    "Explore landing, power, communication, orbital mechanics, rover traverses, mission planning, counterfactuals and failure investigation. Every model is labelled as an educational approximation.",
};

export default function SimulationsPage() {
  const locale = getLocale();

  return (
    <div className="pb-16">
      <section className="border-b border-white/10">
        <div className="container-content py-12 sm:py-16">
          <p className="eyebrow flex items-center gap-2">
            <FlaskConical aria-hidden="true" className="h-3.5 w-3.5" />
            {t(locale, "sections.simulations.eyebrow")}
          </p>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
            {t(locale, "sections.simulations.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
            {t(locale, "sections.simulations.description")}
          </p>
          <p className="mt-4 inline-flex items-start gap-2 rounded-xl border border-violet-400/25 bg-violet-400/[0.07] px-3 py-2 text-xs leading-relaxed text-violet-100">
            <FlaskConical aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            These are teaching models, not flight software, mission predictions or
            observations. Each simulator states its own simplifications.
          </p>
        </div>
      </section>

      <div className="container-content pt-10">
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {simulations.map((simulation) => (
            <li key={simulation.id}>
              <Link
                href={simulation.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-transform hover:-translate-y-0.5 hover:border-white/20"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5"
                  style={{ backgroundColor: simulation.accent }}
                />
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs" style={{ color: simulation.accent }}>
                    {simulation.number}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-text-muted">
                    <FlaskConical aria-hidden="true" className="h-3 w-3" />
                    Approximation
                  </span>
                </div>
                <h2 className="mt-3 text-xl font-semibold tracking-tight text-text-primary">
                  {simulation.title}
                </h2>
                <p className="mt-1 text-sm font-medium text-text-secondary">
                  {simulation.tagline}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">
                  {simulation.description}
                </p>
                <span
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium"
                  style={{ color: simulation.accent }}
                >
                  <PlayCircle aria-hidden="true" className="h-4 w-4" />
                  Open simulator
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
