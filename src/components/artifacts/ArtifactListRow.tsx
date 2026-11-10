import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { ArtifactVisual } from "./ArtifactVisual";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { hardwareTypeSingular } from "@/data/artifacts";
import { formatShortDate } from "@/lib/format";
import type { Artifact } from "@/types/artifact";

type ArtifactListRowProps = {
  artifact: Artifact;
  /** Optional extra line, e.g. the matched timeline event in Explore. */
  context?: string;
};

export function ArtifactListRow({ artifact, context }: ArtifactListRowProps) {
  return (
    <article className="group relative flex flex-col gap-4 overflow-hidden rounded-card border border-white/10 bg-surface/60 p-3 transition-colors hover:border-accent/40 hover:bg-surface sm:flex-row sm:items-center sm:p-4">
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl bg-bg-elevated sm:h-24 sm:w-32">
        <ArtifactVisual
          media={artifact.media}
          sizes="(min-width: 640px) 128px, 100vw"
          imageClassName="group-hover:scale-105"
          showLabel={false}
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] uppercase tracking-[0.16em] text-text-muted">
          <span className="text-accent-bright">
            {hardwareTypeSingular[artifact.hardwareType]}
          </span>
          <span aria-hidden="true">/</span>
          <span>{artifact.missionName}</span>
          <span aria-hidden="true">/</span>
          <span className="inline-flex items-center gap-1">
            <MapPin aria-hidden="true" className="h-3 w-3" />
            {artifact.destination}
          </span>
        </p>
        <h3 className="mt-1.5 truncate text-base font-semibold text-text-primary">
          <Link
            href={`/museum/${artifact.id}`}
            className="after:absolute after:inset-0 after:z-20 focus-visible:outline-none"
          >
            {artifact.name}
          </Link>
        </h3>
        {context ? (
          <p className="mt-0.5 text-xs text-accent-bright/90">{context}</p>
        ) : null}
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-text-secondary">
          {artifact.shortDescription}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <StatusBadge kind="mission" status={artifact.missionStatus} compact />
          <StatusBadge
            kind="hardware"
            status={artifact.hardwareStatus}
            compact
          />
          <span className="ml-1 font-mono text-[11px] tabular-nums text-text-muted">
            {formatShortDate(
              artifact.primaryMilestone.date,
              artifact.primaryMilestone.datePrecision
            )}
          </span>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-text-muted transition-colors group-hover:border-accent/40 group-hover:text-accent-bright sm:flex"
      >
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </article>
  );
}
