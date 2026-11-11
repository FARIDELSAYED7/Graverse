import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Award, Clock, Route, Sparkles } from "lucide-react";
import { AcademyArtifactCard } from "@/components/academy/AcademyArtifactCard";
import { JourneySteps } from "@/components/academy/JourneySteps";
import { AcademySourceLinks } from "@/components/academy/play/AcademySourceLinks";
import { getArtifactsByIds } from "@/data/artifacts";
import { getJourney, journeys } from "@/data/journeys";
import { getBody } from "@/data/space/bodies";
import { ageBandMeta } from "@/types/academy";

type PageProps = { params: { id: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return journeys.map((journey) => ({ id: journey.id }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const journey = getJourney(params.id);
  if (!journey) return { title: "Journey not found" };
  return {
    title: `${journey.title} — Academy journey`,
    description: journey.promise,
  };
}

export default function JourneyPage({ params }: PageProps) {
  const journey = getJourney(params.id);
  if (!journey) notFound();
  const band = ageBandMeta[journey.ageBand];
  const artifacts = getArtifactsByIds(
    journey.steps
      .filter((step) => step.kind === "artifact")
      .map((step) => step.href.split("/museum/")[1]?.split("?")[0] ?? "")
      .filter(Boolean)
  );
  const bodyIds = [
    ...new Set(
      journey.steps
        .filter((step) => step.kind === "body")
        .map((step) => step.href.split("/explorer/bodies/")[1] ?? "")
        .filter(Boolean)
    ),
  ];
  const bodies = bodyIds.map(getBody).filter((body) => Boolean(body));

  return (
    <div className="pb-16">
      <section className="border-b border-[#14213B]/10 bg-white/60">
        <div className="container-content py-8 sm:py-10">
          <Link
            href="/academy/journeys"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14213B] underline-offset-4 hover:underline"
          >
            <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
            All journeys
          </Link>
          <div className="mt-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em]">
              <span
                className="rounded-full px-2.5 py-1"
                style={{ background: `${journey.accent}1f`, color: journey.accent }}
              >
                {band.label}
              </span>
              <span className="inline-flex items-center gap-1 text-[#5F6B83]">
                <Clock aria-hidden="true" className="h-3 w-3" /> {journey.minutes} min
              </span>
              <span className="inline-flex items-center gap-1 text-[#5F6B83]">
                <Route aria-hidden="true" className="h-3 w-3" /> {journey.steps.length} steps
              </span>
              <span className="inline-flex items-center gap-1 text-[#8A5A00]">
                <Award aria-hidden="true" className="h-3 w-3" /> {journey.badge.name}
              </span>
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#14213B] sm:text-4xl lg:text-5xl">
              {journey.title}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-[#46536B] sm:text-lg">
              {journey.promise}
            </p>
            <details className="group mt-4 max-w-2xl">
              <summary className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-[#14213B] underline-offset-4 hover:underline">
                <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-[#9C4321]" />
                What this journey covers
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-[#46536B]">
                {journey.summary}
              </p>
            </details>
          </div>
        </div>
      </section>

      <div className="container-content grid gap-10 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <JourneySteps journey={journey} />

        <aside className="space-y-5">
          <div className="academy-card rounded-2xl p-5">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#9C4321]">
              <Award aria-hidden="true" className="h-3.5 w-3.5" />
              Badge to earn
            </p>
            <h2 className="mt-2 text-lg font-semibold text-[#14213B]">
              {journey.badge.name}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-[#46536B]">
              {journey.badge.description}
            </p>
          </div>

          {artifacts.length > 0 ? (
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9C4321]">
                Museum records in this journey
              </h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {artifacts.map((artifact) => (
                  <AcademyArtifactCard key={artifact.id} artifact={artifact} />
                ))}
              </div>
            </div>
          ) : null}

          {bodies.length > 0 ? (
            <div className="academy-card rounded-2xl p-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9C4321]">
                Destinations
              </h2>
              <ul className="mt-2 space-y-1.5 text-sm">
                {bodies.map((body) => (
                  <li key={body!.id}>
                    <Link
                      href={`/explorer/bodies/${body!.id}`}
                      className="font-medium text-[#14213B] underline-offset-4 hover:underline"
                    >
                      {body!.name} — {body!.tagline}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <AcademySourceLinks ids={journey.sourceIds} title="Sources" />
        </aside>
      </div>
    </div>
  );
}
