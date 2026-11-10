import Link from "next/link";
import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { ArtifactVisual } from "@/components/artifacts/ArtifactVisual";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { hardwareTypeSingular } from "@/data/artifacts";
import { formatYear } from "@/lib/format";
import type { Artifact } from "@/types/artifact";

type JuniorArtifactCardProps = {
  artifact: Artifact;
  note: string;
  priority?: boolean;
};

/**
 * Kid-facing card for one verified artifact. The note is a simplified wording
 * of the record; the full record remains one link away.
 */
export function JuniorArtifactCard({
  artifact,
  note,
  priority = false,
}: JuniorArtifactCardProps) {
  return (
    <article
      data-kids-artifact={artifact.id}
      data-destination={artifact.destinationGroup}
      className="artifact-card card-hover group relative flex h-full flex-col overflow-hidden rounded-card border border-white/10 bg-surface/70"
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-bg-elevated">
        <ArtifactVisual
          media={artifact.media}
          priority={priority}
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 100vw"
          imageClassName="group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
        <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur">
          <MapPin aria-hidden="true" className="artifact-pin h-3 w-3" />
          {artifact.destination}
        </span>
        <span className="absolute right-3 top-3 z-10 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 font-mono text-[11px] tabular-nums text-white/90 backdrop-blur">
          {formatYear(artifact.primaryMilestone.date)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] uppercase tracking-[0.16em] text-text-muted">
          <span className="text-accent-bright">
            {hardwareTypeSingular[artifact.hardwareType]}
          </span>
          <span aria-hidden="true">/</span>
          <span>{artifact.missionName}</span>
        </p>

        <h3 className="text-xl font-semibold leading-snug text-text-primary">
          <Link
            href={`/museum/${artifact.id}`}
            className="after:absolute after:inset-0 after:z-20 focus-visible:outline-none"
          >
            {artifact.name}
          </Link>
        </h3>

        <p className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary">
          <Sparkles
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 text-brand-amber"
          />
          <span>{note}</span>
        </p>

        <div className="mt-auto space-y-3 pt-1">
          <div className="flex flex-wrap gap-1.5">
            <StatusBadge
              kind="mission"
              status={artifact.missionStatus}
              compact
            />
            <StatusBadge
              kind="hardware"
              status={artifact.hardwareStatus}
              compact
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 text-[11px] text-text-muted">
            <span>
              {artifact.media
                ? `Image: ${artifact.media.credit}`
                : "No image in this record"}
            </span>
            <span className="artifact-cta inline-flex items-center gap-1 font-semibold">
              Read the real record
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
