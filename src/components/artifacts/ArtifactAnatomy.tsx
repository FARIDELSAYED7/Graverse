import type { Artifact } from "@/types/artifact";

const MAX_BLOCKS = 6;

/**
 * A schematic grouping of the specifications that the record actually
 * contains. It deliberately does not claim to be a physical layout: no part
 * positions or proportions are invented.
 */
export function ArtifactAnatomy({ artifact }: { artifact: Artifact }) {
  const details = artifact.technicalDetails.slice(0, MAX_BLOCKS);

  return (
    <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-text-primary">
          Recorded anatomy
        </h3>
        <span className="rounded-full border border-warning/30 bg-warning/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#FFD79A]">
          Schematic, not a reconstruction
        </span>
      </div>

      {details.length ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {details.map((detail) => (
            <div
              key={detail.label}
              className="rounded-xl border border-white/10 bg-[#07111f]/60 p-3"
            >
              <p className="text-[10px] uppercase tracking-[0.16em] text-text-muted">
                {detail.label}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                {detail.value}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-sm text-text-muted">
          This record has no listed technical specifications, so no anatomy is
          drawn.
        </p>
      )}

      <p className="mt-4 border-t border-white/10 pt-3 text-xs leading-relaxed text-text-muted">
        These blocks group the specifications recorded on this page. Their order
        and layout are a reading aid only. They do not show where components sit
        on the real hardware, and no geometry or dimensions have been invented.
        A schematic can explain a system; it is not a photograph or a
        reconstruction.
      </p>
    </div>
  );
}
