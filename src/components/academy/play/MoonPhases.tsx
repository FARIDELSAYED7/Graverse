"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, MoonStar, RotateCcw } from "lucide-react";
import { GameReward } from "./GameReward";
import { MOON_PHASES, MoonPhaseDisk } from "./MoonPhaseDisk";
import { StageFrame } from "./StageFrame";
import { useProgress } from "@/lib/use-progress";
import type { PlayGame } from "@/types/play";

const MoonScene = dynamic(() => import("./MoonScene"), {
  ssr: false,
  loading: () => (
    <p className="flex h-full items-center justify-center text-xs font-medium uppercase tracking-[0.16em] text-[#9FB2CC]">
      Moving the Moon…
    </p>
  ),
});

const targets = [4, 2, 1];
const hints = [
  "A full Moon happens when Earth is between the Moon and the Sun.",
  "At first quarter the Moon has travelled a quarter of the way around Earth. You see half of its lit side.",
  "A crescent appears when the Moon is only a little to the side of the Sun in our sky.",
];

export function MoonPhases({ game }: { game: PlayGame }) {
  const [round, setRound] = useState(0);
  const [phase, setPhase] = useState(0);
  const [score, setScore] = useState(0);
  const [finalStars, setFinalStars] = useState(0);
  const [wrongThisRound, setWrongThisRound] = useState(false);
  const [checked, setChecked] = useState<"correct" | "wrong" | null>(null);
  const [finished, setFinished] = useState(false);
  const [message, setMessage] = useState(
    "Look at the target, then move the Moon until the view from Earth matches."
  );
  const { state, recordGame } = useProgress();
  const earned = state.badges.includes(game.badge.id);
  const target = targets[round]!;

  function move(delta: number) {
    setPhase((current) => (current + delta + 8) % 8);
    setChecked(null);
  }

  function check() {
    if (phase === target) {
      const nextScore = wrongThisRound ? score : score + 1;
      setScore(nextScore);
      setChecked("correct");
      if (round === targets.length - 1) {
        setFinished(true);
        setFinalStars(Math.max(1, nextScore));
        setMessage(
          `Mission complete — you matched ${nextScore} of 3 phases on the first try.`
        );
        recordGame(game.id, game.badge.id, Math.max(1, nextScore));
      } else {
        setMessage(
          `Yes! ${MOON_PHASES[target]} is correct. Press Next phase to keep going.`
        );
      }
    } else {
      setWrongThisRound(true);
      setChecked("wrong");
      setMessage(
        `Not quite. You are showing ${MOON_PHASES[phase]}. ${hints[round]}`
      );
    }
  }

  function next() {
    setRound((current) => current + 1);
    setPhase(0);
    setChecked(null);
    setWrongThisRound(false);
    setMessage("New target. Move the Moon, then check the view from Earth.");
  }

  function restart() {
    setRound(0);
    setPhase(0);
    setScore(0);
    setFinalStars(0);
    setChecked(null);
    setWrongThisRound(false);
    setFinished(false);
    setMessage("New mission. Match all three Moon phases.");
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <StageFrame
          label="Toy Earth–Moon–Sun · not to scale · drag to look"
          fallback={
            <span>
              3D is unavailable in this browser. The phase diagrams and the
              slider still work, so the whole mission is playable.
            </span>
          }
        >
          <MoonScene phase={phase} />
        </StageFrame>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px] font-semibold text-[#5A6472]">
          <span className="rounded-full bg-[#FFC93C]/25 px-2 py-1 text-[#7C4A03]">
            Sun on the left
          </span>
          <span className="rounded-full bg-[#2B7FFF]/12 px-2 py-1 text-[#1D4ED8]">
            Earth in the middle
          </span>
          <span className="rounded-full bg-[#9C4321]/12 px-2 py-1 text-[#9C4321]">
            Moon on its orbit
          </span>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-[#5A6472]">{game.toyNote}</p>
      </div>

      <div className="academy-card rounded-3xl p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9C4321]">
              Round {round + 1} of 3
            </p>
            <h2 className="mt-1 text-xl font-semibold text-[#14213B]">
              Match this phase
            </h2>
          </div>
          <span className="rounded-full bg-[#9C4321]/10 px-3 py-1 font-mono text-sm font-semibold text-[#9C4321]">
            {score} ★
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-[#9C4321]/20 bg-[#E4ECF7]/60 p-3 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9C4321]">
              Target
            </p>
            <div className="mt-2 flex justify-center">
              <MoonPhaseDisk phase={target} size={104} />
            </div>
            <p className="mt-2 text-sm font-semibold text-[#14213B]">
              {MOON_PHASES[target]}
            </p>
          </div>
          <div className="rounded-2xl border border-[#14213B]/10 bg-white/70 p-3 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9C4321]">
              From Earth now
            </p>
            <div className="mt-2 flex justify-center">
              <MoonPhaseDisk phase={phase} size={104} />
            </div>
            <p className="mt-2 text-sm font-semibold text-[#14213B]">
              {MOON_PHASES[phase]}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <label
            htmlFor="moon-phase-slider"
            className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9C4321]"
          >
            Move the Moon
          </label>
          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Move the Moon one step back"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#14213B]/15 bg-white/70 text-[#14213B] hover:bg-white"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            </button>
            <input
              id="moon-phase-slider"
              type="range"
              min={0}
              max={7}
              step={1}
              value={phase}
              onChange={(event) => {
                setPhase(Number(event.target.value));
                setChecked(null);
              }}
              aria-valuetext={MOON_PHASES[phase]}
              className="h-2 w-full cursor-pointer accent-[#B4472A]"
            />
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Move the Moon one step forward"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#14213B]/15 bg-white/70 text-[#14213B] hover:bg-white"
            >
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-1 text-center text-xs text-[#5F6B83]">
            {phase + 1} of 8 positions · {MOON_PHASES[phase]}
          </p>
        </div>

        <p
          role="status"
          aria-live="polite"
          className={`mt-4 min-h-12 rounded-xl px-3 py-2 text-sm leading-relaxed ${
            checked === "correct"
              ? "bg-[#0F766E]/10 text-[#0F4F49]"
              : checked === "wrong"
                ? "bg-[#FEE2E2] text-[#7F1D1D]"
                : "bg-[#14213B]/5 text-[#4B5563]"
          }`}
        >
          {message}
        </p>

        {finished ? (
          <>
            <button
              type="button"
              onClick={restart}
              className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-[#14213B]/20 px-5 text-sm font-semibold text-[#14213B] hover:bg-[#14213B]/5"
            >
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              Play again
            </button>
            <GameReward game={game} stars={Math.max(1, finalStars)} earned={earned} />
          </>
        ) : checked === "correct" ? (
          <button
            type="button"
            onClick={next}
            className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#B4472A] px-5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            <Check aria-hidden="true" className="h-4 w-4" />
            Next phase
          </button>
        ) : (
          <button
            type="button"
            onClick={check}
            className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#B4472A] px-5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            <MoonStar aria-hidden="true" className="h-4 w-4" />
            Check the Moon
          </button>
        )}

        <p className="mt-3 text-[11px] leading-relaxed text-[#5F6B83]">{game.controls}</p>
      </div>
    </div>
  );
}
