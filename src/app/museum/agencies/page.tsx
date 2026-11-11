import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, ExternalLink } from "lucide-react";
import { agencies } from "@/data/space/agencies";
import { missions } from "@/data/missions";

export const metadata: Metadata = {
  title: "Space agencies — who operated the hardware",
  description:
    "Space agencies referenced by the GRAVERSE collection, with the missions and artifacts connected to each one.",
};

export default function AgenciesPage() {
  return (
    <div className="container-content pb-16 pt-8 sm:pt-10">
      <nav aria-label="Breadcrumb" className="text-xs text-text-muted">
        <Link href="/museum" className="hover:text-white">
          Museum
        </Link>
        <span aria-hidden="true" className="px-1.5">
          /
        </span>
        <span className="text-text-secondary">Agencies</span>
      </nav>

      <header className="mt-5 max-w-3xl">
        <p className="eyebrow">Museum · Index</p>
        <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
          The organisations behind the missions
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
          Hardware records name a mission; mission records name an agency. This
          index keeps that chain explicit. A mission is only listed under an
          agency when the underlying artifact record establishes it.
        </p>
      </header>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {agencies.map((agency) => {
          const agencyMissions = missions.filter(
            (mission) => mission.agencyId === agency.id
          );
          return (
            <li key={agency.id}>
              <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-sm font-semibold"
                      style={{
                        borderColor: `${agency.accent}55`,
                        backgroundColor: `${agency.accent}18`,
                        color: agency.accent,
                      }}
                    >
                      {agency.shortName}
                    </span>
                    <div>
                      <h2 className="text-base font-semibold leading-snug text-text-primary">
                        <Link
                          href={`/museum/agencies/${agency.id}`}
                          className="hover:text-white"
                        >
                          {agency.name}
                        </Link>
                      </h2>
                      <p className="mt-0.5 text-xs text-text-muted">
                        {agency.country} · founded {agency.founded}
                      </p>
                    </div>
                  </div>
                  <Building2 aria-hidden="true" className="h-4 w-4 text-text-muted" />
                </div>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
                  {agency.summary}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {agency.focus.slice(0, 4).map((focus) => (
                    <span
                      key={focus}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] text-text-muted"
                    >
                      {focus}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
                  <span className="text-text-muted">
                    {agencyMissions.length} mission
                    {agencyMissions.length === 1 ? "" : "s"} in this collection
                  </span>
                  <Link
                    href={`/museum/agencies/${agency.id}`}
                    className="inline-flex items-center gap-1 font-medium text-accent-bright hover:text-white"
                  >
                    Open
                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <a
                  href={agency.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-text-muted hover:text-white"
                >
                  Official website
                  <ExternalLink aria-hidden="true" className="h-3 w-3" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
