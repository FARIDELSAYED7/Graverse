import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { ArtifactVisual } from "@/components/artifacts/ArtifactVisual";
import { hardwareStatusLabels, missionStatusLabels } from "@/lib/status";
import type { Artifact } from "@/types/artifact";

/** Light-surface artifact card used inside the Academy. */
export function AcademyArtifactCard({ artifact }: { artifact: Artifact }) {
  return (
    <article className="academy-card group overflow-hidden rounded-2xl">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#EADCC8]">
        <ArtifactVisual
          media={artifact.media}
          sizes="(min-width: 1024px) 30vw, 100vw"
          imageClassName="group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-4">
        <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9C4321]">
          <MapPin aria-hidden="true" className="h-3 w-3" />
          {artifact.destination} · {artifact.missionName}
        </p>
        <h3 className="mt-1 text-base font-semibold text-[#14213B]">
          <Link
            href={`/museum/${artifact.id}`}
            className="underline-offset-4 hover:underline"
          >
            {artifact.name}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#5A6472]">
          {artifact.shortDescription}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] font-medium">
          <span className="rounded-full bg-[#14213B]/6 px-2 py-0.5 text-[#374151]">
            Mission: {missionStatusLabels[artifact.missionStatus]}
          </span>
          <span className="rounded-full bg-[#14213B]/6 px-2 py-0.5 text-[#374151]">
            Hardware: {hardwareStatusLabels[artifact.hardwareStatus]}
          </span>
        </div>
        <Link
          href={`/museum/${artifact.id}`}
          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#14213B] underline-offset-4 hover:underline"
        >
          Open the museum record
          <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
