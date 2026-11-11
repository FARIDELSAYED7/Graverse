import { Flag, Gem, Mountain, Truck } from "lucide-react";
import {
  ROVER_BASE,
  ROVER_GRID,
  ROVER_ROCKS,
  ROVER_SAMPLES,
  samePoint,
  type RoverPoint,
} from "@/lib/rover-quest";

/** Flat map alternative — always available, including without WebGL. */
export function RoverMap({ rover }: { rover: RoverPoint }) {
  const sampleText = ROVER_SAMPLES.map((sample) => `${sample.id} at column ${sample.x + 1}, row ${sample.z + 1}`).join("; ");
  const rockText = ROVER_ROCKS.map((rock) => `column ${rock.x + 1}, row ${rock.z + 1}`).join("; ");

  return (
    <div>
      <div
        role="img"
        aria-label={`Top-down rover map. Rover at column ${rover.x + 1}, row ${rover.z + 1}. Base at column ${ROVER_BASE.x + 1}, row ${ROVER_BASE.z + 1}. Samples: ${sampleText}. Rocks block these cells: ${rockText}.`}
        className="mx-auto grid w-full max-w-sm gap-0.5 rounded-2xl border border-[#14213B]/10 bg-[#7A3418] p-2"
        style={{ gridTemplateColumns: `repeat(${ROVER_GRID}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: ROVER_GRID }).flatMap((_, z) =>
          Array.from({ length: ROVER_GRID }).map((__, x) => {
            const point = { x, z };
            const isRover = samePoint(rover, point);
            const isBase = samePoint(ROVER_BASE, point);
            const sample = ROVER_SAMPLES.find((candidate) => samePoint(candidate, point));
            const rock = ROVER_ROCKS.some((candidate) => samePoint(candidate, point));

            return (
              <div
                key={`${x}-${z}`}
                className={`relative flex aspect-square items-center justify-center rounded-[3px] ${
                  (x + z) % 2 === 0 ? "bg-[#C56A3F]" : "bg-[#B85C33]"
                } ${isBase ? "ring-2 ring-inset ring-[#0F766E]" : ""}`}
              >
                {rock ? (
                  <Mountain aria-hidden="true" className="h-4 w-4 text-[#4A2A1C]" />
                ) : sample ? (
                  <Gem aria-hidden="true" className="h-4 w-4 text-[#FFE08A]" />
                ) : isBase ? (
                  <Flag aria-hidden="true" className="h-4 w-4 text-[#0F766E]" />
                ) : null}
                {isRover ? (
                  <span className="absolute inset-0 flex items-center justify-center rounded-[3px] bg-[#14213B]/85">
                    <Truck aria-hidden="true" className="h-4 w-4 text-[#FFF8EC]" />
                  </span>
                ) : null}
              </div>
            );
          })
        )}
      </div>
      <div className="mt-2 flex flex-wrap justify-center gap-3 text-[10px] font-medium text-[#5A6472]">
        <span className="inline-flex items-center gap-1">
          <Truck aria-hidden="true" className="h-3 w-3" /> Rover
        </span>
        <span className="inline-flex items-center gap-1">
          <Gem aria-hidden="true" className="h-3 w-3 text-[#B7791F]" /> Sample
        </span>
        <span className="inline-flex items-center gap-1">
          <Mountain aria-hidden="true" className="h-3 w-3" /> Rock
        </span>
        <span className="inline-flex items-center gap-1">
          <Flag aria-hidden="true" className="h-3 w-3 text-[#0F766E]" /> Landing pad
        </span>
      </div>
    </div>
  );
}
