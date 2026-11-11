import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarClock, MapPin } from "lucide-react";
import { missions } from "@/data/missions";
import { missionStatusLabels } from "@/lib/status";
import { formatShortDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Missions — the programs behind the hardware",
  description:
    "Every mission represented in the GRAVERSE collection, derived from the verified artifact records rather than copied. Dates and status bands link to the underlying sources.",
};

export default function MissionsPage() {
  const byDecade = new Map<string, typeof missions>();
  for (const mission of missions) {
    const decade = `${mission.launchDate.slice(0, 3)}0s`;
    const list = byDecade.get(decade) ?? [];
    list.push(mission);
    byDecade.set(decade, list);
  }

  return (
    <div className="container-content pb-16 pt-8 sm:pt-10">
      <nav aria-label="Breadcrumb" className="text-xs text-text-muted">
        <Link href="/museum" className="hover:text-white">
          Museum
        </Link>
        <span aria-hidden="true" className="px-1.5">
          /
        </span>
        <span className="text-text-secondary">Missions</span>
      </nav>

      <header className="mt-5 max-w-3xl">
        <p className="eyebrow">Museum · Index</p>
        <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
          {missions.length} missions, one collection
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
          A mission page is a view over its artifacts, not a second copy of
          them. That means the mission dates, status band and objectives stay
          consistent with the museum records. Original NASA status wording is
          preserved on each artifact page.
        </p>
      </header>

      <div className="mt-8 space-y-10">
        {[...byDecade.entries()].map(([decade, entries]) => (
          <section key={decade} aria-labelledby={`decade-${decade}`}>
            <h2
              id={`decade-${decade}`}
              className="text-lg font-semibold tracking-tight text-text-primary"
            >
              {decade}
            </h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {entries.map((mission) => (
                <li key={mission.id}>
                  <Link
                    href={`/museum/missions/${mission.id}`}
                    className="group flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-brand-violet/40 hover:bg-white/[0.04]"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-text-muted">
                        {missionStatusLabels[mission.status]}
                      </span>
                      <span className="font-mono text-[11px] tabular-nums text-text-muted">
                        {formatShortDate(mission.launchDate, "year")}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-text-primary">
                      {mission.name}
                    </p>
                    <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-text-muted">
                      <MapPin aria-hidden="true" className="h-3 w-3" />
                      {mission.destinationLabel}
                    </p>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-text-secondary">
                      {mission.summary.slice(0, 150)}
                      {mission.summary.length > 150 ? "…" : ""}
                    </p>
                    <span className="mt-3 flex items-center justify-between text-[11px] text-text-muted">
                      {mission.artifactIds.length} artifact record
                      {mission.artifactIds.length === 1 ? "" : "s"}
                      <ArrowRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs text-text-muted">
        <CalendarClock aria-hidden="true" className="h-3.5 w-3.5" />
        Mission status is normalized to the same six bands used across
        GRAVERSE. The underlying wording from NASA is shown on each artifact.
      </div>
    </div>
  );
}
