"use client";

import dynamic from "next/dynamic";
import { useState, type KeyboardEvent } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Gem,
  Mountain,
  RotateCcw,
  Truck,
} from "lucide-react";
import { GameReward } from "./GameReward";
import { RoverMap } from "./RoverMap";
import { StageFrame } from "./StageFrame";
import { useProgress } from "@/lib/use-progress";
import {
  ROVER_BASE,
  ROVER_GRID,
  ROVER_SAMPLES,
  isRock,
  samePoint,
  starsForMoves,
  type RoverPoint,
} from "@/lib/rover-quest";
import type { PlayGame } from "@/types/play";

const RoverScene = dynamic(() => import("./RoverScene"), {
  ssr: false,
  loading: () => (
    <p className="flex h-full items-center justify-center text-xs font-medium uppercase tracking-[0.16em] text-[#9FB2CC]">
      Driving onto the surface…
    </p>
  ),
});

const directions = [
  { key: "up", label: "Drive north", dx: 0, dz: -1, Icon: ArrowUp },
  { key: "left", label: "Drive west", dx: -1, dz: 0, Icon: ArrowLeft },
  { key: "right", label: "Drive east", dx: 1, dz: 0, Icon: ArrowRight },
  { key: "down", label: "Drive south", dx: 0, dz: 1, Icon: ArrowDown },
] as const;

export function RoverQuest({ game }: { game: PlayGame }) {
  const [rover, setRover] = useState<RoverPoint>({ ...ROVER_BASE });
  const [collected, setCollected] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [finalStars, setFinalStars] = useState(0);
  const [message, setMessage] = useState(
    "You are on the landing pad. Drive out, collect three gold samples, then come home."
  );
  const { state, recordGame } = useProgress();
  const earned = state.badges.includes(game.badge.id);
  const remaining = ROVER_SAMPLES.length - collected.length;

  function move(dx: number, dz: number) {
    if (won) return;
    const next = { x: rover.x + dx, z: rover.z + dz };

    if (next.x < 0 || next.x >= ROVER_GRID || next.z < 0 || next.z >= ROVER_GRID) {
      setMessage("That is the edge of the map. Try another direction.");
      return;
    }
    if (isRock(next)) {
      setMessage("A rock blocks the way. Drive around it.");
      return;
    }

    const sample = ROVER_SAMPLES.find(
      (candidate) => !collected.includes(candidate.id) && samePoint(candidate, next)
    );
    const nextCollected = sample ? [...collected, sample.id] : collected;
    const nextMoves = moves + 1;

    setRover(next);
    setCollected(nextCollected);
    setMoves(nextMoves);

    if (samePoint(next, ROVER_BASE) && nextCollected.length === ROVER_SAMPLES.length) {
      const stars = starsForMoves(nextMoves);
      setWon(true);
      setFinalStars(stars);
      setMessage(
        `You brought all three samples home in ${nextMoves} moves. Mission complete!`
      );
      recordGame(game.id, game.badge.id, stars);
    } else if (sample) {
      setMessage(
        `Sample ${sample.id} collected! ${nextCollected.length} of ${ROVER_SAMPLES.length} on board. ${
          nextCollected.length === ROVER_SAMPLES.length
            ? "Now drive back to the landing pad."
            : "Keep exploring."
        }`
      );
    } else if (samePoint(next, ROVER_BASE)) {
      setMessage(
        `Back on the landing pad with ${nextCollected.length} of ${ROVER_SAMPLES.length} samples. Keep going.`
      );
    } else {
      setMessage(
        `Moved to column ${next.x + 1}, row ${next.z + 1}. ${remaining} sample${
          remaining === 1 ? "" : "s"
        } still out there.`
      );
    }
  }

  function reset() {
    setRover({ ...ROVER_BASE });
    setCollected([]);
    setMoves(0);
    setWon(false);
    setFinalStars(0);
    setMessage("Fresh mission. Collect three samples, then return to the pad.");
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const key = event.key.toLowerCase();
    const mapping: Record<string, [number, number]> = {
      arrowup: [0, -1],
      w: [0, -1],
      arrowdown: [0, 1],
      s: [0, 1],
      arrowleft: [-1, 0],
      a: [-1, 0],
      arrowright: [1, 0],
      d: [1, 0],
    };
    const movement = mapping[key];
    if (!movement) return;
    event.preventDefault();
    move(movement[0], movement[1]);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <StageFrame
          label="Toy rover · invented terrain · drag to look"
          fallback={
            <span>
              3D is unavailable in this browser. Use the flat map below — the
              whole mission is playable without 3D.
            </span>
          }
        >
          <RoverScene position={rover} collected={collected} won={won} />
        </StageFrame>

        <div className="mt-4 academy-card rounded-2xl p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-[#152238]">Map view</h2>
            <span className="text-[11px] font-medium text-[#5A6472]">
              Always available, with or without 3D
            </span>
          </div>
          <div className="mt-3">
            <RoverMap rover={rover} />
          </div>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-[#5A6472]">{game.toyNote}</p>
      </div>

      <div className="academy-card rounded-3xl p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#0F766E]">
              Rover quest
            </p>
            <h2 className="mt-1 text-xl font-semibold text-[#152238]">Drive the toy rover</h2>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#0F766E]/10 px-3 py-1 font-mono text-sm font-semibold text-[#0F766E]">
            <Gem aria-hidden="true" className="h-3.5 w-3.5" />
            {collected.length}/3
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-[#152238]/5 p-3">
            <p className="font-mono text-2xl leading-none text-[#152238]">{moves}</p>
            <p className="mt-1 text-[10px] font-medium text-[#5A6472]">Moves</p>
          </div>
          <div className="rounded-xl bg-[#152238]/5 p-3">
            <p className="font-mono text-2xl leading-none text-[#152238]">{remaining}</p>
            <p className="mt-1 text-[10px] font-medium text-[#5A6472]">Samples left</p>
          </div>
        </div>

        <div
          role="group"
          aria-label="Rover controls"
          aria-describedby="rover-help"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="mt-5 rounded-2xl border border-[#152238]/10 bg-white/60 p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]"
        >
          <div className="mx-auto grid w-fit grid-cols-3 grid-rows-3 gap-2">
            <span aria-hidden="true" />
            <button
              type="button"
              onClick={() => move(0, -1)}
              aria-label="Drive north one square"
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F766E] text-white shadow-sm transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <ArrowUp aria-hidden="true" className="h-6 w-6" />
            </button>
            <span aria-hidden="true" />
            <button
              type="button"
              onClick={() => move(-1, 0)}
              aria-label="Drive west one square"
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F766E] text-white shadow-sm transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <ArrowLeft aria-hidden="true" className="h-6 w-6" />
            </button>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#0F766E]/25 bg-[#0F766E]/10">
              <Truck aria-hidden="true" className="h-6 w-6 text-[#0F766E]" />
            </div>
            <button
              type="button"
              onClick={() => move(1, 0)}
              aria-label="Drive east one square"
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F766E] text-white shadow-sm transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <ArrowRight aria-hidden="true" className="h-6 w-6" />
            </button>
            <span aria-hidden="true" />
            <button
              type="button"
              onClick={() => move(0, 1)}
              aria-label="Drive south one square"
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F766E] text-white shadow-sm transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <ArrowDown aria-hidden="true" className="h-6 w-6" />
            </button>
            <span aria-hidden="true" />
          </div>
          <p id="rover-help" className="mt-3 text-center text-[11px] text-[#5A6472]">
            Tap an arrow, or focus this panel and use the arrow keys or W A S D.
          </p>
        </div>

        <p
          role="status"
          aria-live="polite"
          className="mt-4 min-h-12 rounded-xl bg-[#0F766E]/8 px-3 py-2 text-sm leading-relaxed text-[#0F4F49]"
        >
          {message}
        </p>

        <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-semibold text-[#5A6472]">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#F5A524]/15 px-2 py-1 text-[#7C4A03]">
            <Gem aria-hidden="true" className="h-3 w-3" /> Gold = sample
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#152238]/8 px-2 py-1">
            <Mountain aria-hidden="true" className="h-3 w-3" /> Grey = rock
          </span>
        </div>

        {won ? (
          <>
            <button
              type="button"
              onClick={reset}
              className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-[#152238]/20 px-5 text-sm font-semibold text-[#152238] hover:bg-[#152238]/5"
            >
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              Play again
            </button>
            <GameReward game={game} stars={finalStars} earned={earned} />
          </>
        ) : (
          <button
            type="button"
            onClick={reset}
            className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-full px-4 text-xs font-semibold text-[#5A6472] hover:text-[#152238]"
          >
            <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
            Start over
          </button>
        )}

        <p className="mt-2 text-[11px] leading-relaxed text-[#6B7280]">{game.controls}</p>
      </div>
    </div>
  );
}
