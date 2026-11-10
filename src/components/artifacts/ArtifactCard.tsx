import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { ArtifactVisual } from "./ArtifactVisual";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { hardwareTypeSingular } from "@/data/artifacts";
import { formatYear } from "@/lib/format";
import type { Artifact } from "@/types/artifact";

type ArtifactCardProps = {
  artifact: Artifact;
  priority?: boolean;
  className?: string;
};

export function ArtifactCard({
  artifact,
  priority = false,
  className,
}: ArtifactCardProps) {
  return (
    <article
      data-destination={artifact.destinationGroup}
      className={`artifact-card card-hover group relative flex h-full flex-col overflow-hidden rounded-card border border-white/10 bg-surface/70 ${
        className ?? ""
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-bg-elevated">
        <ArtifactVisual
          media={artifact.media}
          priority={priority}
          sizes="(min-width: 1280px) 23vw, (min-width: 768px) 45vw, 100vw"
          imageClassName="group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
        <span className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white/85 backdrop-blur">
          <MapPin aria-hidden="true" className="artifact-pin h-3 w-3" />
          {artifact.destination}
        </span>
        <span className="absolute bottom-3 right-3 z-10 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 font-mono text-[11px] tabular-nums text-white/85 backdrop-blur">
          {formatYear(artifact.primaryMilestone.date)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] uppercase tracking-[0.16em] text-text-muted">
          <span className="text-accent-bright">
            {hardwareTypeSingular[artifact.hardwareType]}
          </span>
          <span aria-hidden="true">/</span>
          <span>{artifact.missionName}</span>
        </div>

        <h3 className="text-lg font-semibold leading-snug text-text-primary">
          <Link
            href={`/museum/${artifact.id}`}
            className="after:absolute after:inset-0 after:z-20 focus-visible:outline-none"
          >
            {artifact.name}
          </Link>
        </h3>

        <p className="line-clamp-3 text-sm leading-relaxed text-text-secondary">
          {artifact.shortDescription}
        </p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          <StatusBadge kind="mission" status={artifact.missionStatus} compact />
          <StatusBadge
            kind="hardware"
            status={artifact.hardwareStatus}
            compact
          />
        </div>

        <span className="artifact-cta inline-flex items-center gap-1 text-xs font-medium opacity-80 transition-opacity group-hover:opacity-100">
          View the story
          <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
        </span>
      </div>
    </article>
  );
}
