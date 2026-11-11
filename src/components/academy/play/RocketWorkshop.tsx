"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Rocket, Shuffle, Sparkles } from "lucide-react";
import { GameReward } from "./GameReward";
import { StageFrame } from "./StageFrame";
import { useProgress } from "@/lib/use-progress";
import type { PlayGame, RocketConfig } from "@/types/play";

const RocketScene = dynamic(() => import("./RocketScene"), {
  ssr: false,
  loading: () => (
    <p className="flex h-full items-center justify-center text-xs font-medium uppercase tracking-[0.16em] text-[#9FB2CC]">
      Building the workshop…
    </p>
  ),
});

const colors = [
  { name: "Rust", value: "#9C4321" },
  { name: "Teal", value: "#0F766E" },
  { name: "Sunshine", value: "#F5A524" },
  { name: "Navy", value: "#3E5C8A" },
  { name: "Rose", value: "#B4432A" },
  { name: "Sky", value: "#2B7FFF" },
];

const initialConfig: RocketConfig = {
  nose: "pointy",
  body: "tall",
  fins: 4,
  engine: "big",
  bodyColor: "#9C4321",
  noseColor: "#FFF8EC",
  finColor: "#0F766E",
};

type Option<T extends string | number> = { value: T; label: string };

function OptionGroup<T extends string | number>({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset>
      <legend className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9C4321]">
        {legend}
      </legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option.value)}
              className={`h-11 rounded-full border px-4 text-sm font-semibold transition-colors ${
                selected
                  ? "border-[#14213B] bg-[#14213B] text-[#FFF8EC]"
                  : "border-[#14213B]/15 bg-white/70 text-[#14213B] hover:bg-white"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function ColorGroup({
  legend,
  value,
  onChange,
}: {
  legend: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9C4321]">
        {legend}
      </legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {colors.map((color) => {
          const selected = color.value === value;
          return (
            <button
              key={color.value}
              type="button"
              aria-label={color.name}
              aria-pressed={selected}
              onClick={() => onChange(color.value)}
              className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-transform hover:scale-110 ${
                selected ? "border-[#14213B] scale-110" : "border-white"
              }`}
              style={{ backgroundColor: color.value }}
            >
              {selected ? (
                <span aria-hidden="true" className="text-sm font-bold text-white drop-shadow">
                  ✓
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function RocketWorkshop({ game }: { game: PlayGame }) {
  const [config, setConfig] = useState<RocketConfig>(initialConfig);
  const [launching, setLaunching] = useState(false);
  const [launchKey, setLaunchKey] = useState(0);
  const [launches, setLaunches] = useState(0);
  const [complete, setComplete] = useState(false);
  const [message, setMessage] = useState(
    "Your rocket is on the pad. Change a part, spin the model, then launch."
  );
  const timer = useRef<number | null>(null);
  const { state, recordGame } = useProgress();
  const earned = state.badges.includes(game.badge.id);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  function launch() {
    if (launching) return;
    setLaunching(true);
    setLaunchKey((key) => key + 1);
    setLaunches((count) => count + 1);
    setMessage("Liftoff! Your toy rocket is climbing. Watch the flame.");
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setLaunching(false);
      setMessage(
        "Great launch. Try a different nose, body, fin count or colour, then launch again."
      );
      setComplete(true);
      recordGame(game.id, game.badge.id, 3);
    }, 2500);
  }

  function surprise() {
    const pick = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)]!;
    setConfig({
      nose: pick(["pointy", "round"] as const),
      body: pick(["short", "tall"] as const),
      fins: pick([3, 4] as const),
      engine: pick(["small", "big"] as const),
      bodyColor: pick(colors).value,
      noseColor: pick(colors).value,
      finColor: pick(colors).value,
    });
    setMessage("A surprise rocket! Launch it or change a part.");
  }

  const summary = `${config.nose === "pointy" ? "Pointy" : "Round"} nose, ${
    config.body === "tall" ? "tall" : "short"
  } body, ${config.fins} fins, ${config.engine} engine.`;

  return (
    <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <StageFrame
          label="Toy rocket · not to scale · drag to spin"
          fallback={
            <span>
              3D is unavailable in this browser, but the workshop still works.
              Build with the buttons and launch to earn the badge.
            </span>
          }
        >
          <RocketScene config={config} launching={launching} launchKey={launchKey} />
        </StageFrame>
        <p className="mt-3 text-xs leading-relaxed text-[#5A6472]">
          {game.toyNote}
        </p>
      </div>

      <div className="academy-card rounded-3xl p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9C4321]">
              Build station
            </p>
            <h2 className="mt-1 text-xl font-semibold text-[#14213B]">Make it yours</h2>
          </div>
          <button
            type="button"
            onClick={surprise}
            className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-[#14213B]/15 px-3 text-xs font-semibold text-[#14213B] hover:bg-[#14213B]/5"
          >
            <Shuffle aria-hidden="true" className="h-3.5 w-3.5" />
            Surprise me
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <OptionGroup
            legend="Nose"
            value={config.nose}
            options={[
              { value: "pointy", label: "Pointy" },
              { value: "round", label: "Round" },
            ]}
            onChange={(nose) => setConfig((current) => ({ ...current, nose }))}
          />
          <OptionGroup
            legend="Body"
            value={config.body}
            options={[
              { value: "short", label: "Short" },
              { value: "tall", label: "Tall" },
            ]}
            onChange={(body) => setConfig((current) => ({ ...current, body }))}
          />
          <OptionGroup
            legend="Fins"
            value={config.fins}
            options={[
              { value: 3, label: "3 fins" },
              { value: 4, label: "4 fins" },
            ]}
            onChange={(fins) => setConfig((current) => ({ ...current, fins }))}
          />
          <OptionGroup
            legend="Engine"
            value={config.engine}
            options={[
              { value: "small", label: "Small" },
              { value: "big", label: "Big" },
            ]}
            onChange={(engine) => setConfig((current) => ({ ...current, engine }))}
          />
          <ColorGroup
            legend="Body colour"
            value={config.bodyColor}
            onChange={(bodyColor) => setConfig((current) => ({ ...current, bodyColor }))}
          />
          <ColorGroup
            legend="Nose colour"
            value={config.noseColor}
            onChange={(noseColor) => setConfig((current) => ({ ...current, noseColor }))}
          />
          <ColorGroup
            legend="Fin colour"
            value={config.finColor}
            onChange={(finColor) => setConfig((current) => ({ ...current, finColor }))}
          />
        </div>

        <div className="mt-5 rounded-2xl bg-[#14213B]/5 p-3">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-[#14213B]">
            <Rocket aria-hidden="true" className="h-3.5 w-3.5" />
            Your rocket
          </p>
          <p className="mt-1 text-xs leading-relaxed text-[#5A6472]">{summary}</p>
        </div>

        <button
          type="button"
          onClick={launch}
          disabled={launching}
          className="mt-4 inline-flex h-[3.25rem] w-full items-center justify-center gap-2 rounded-full bg-[#B4432A] px-6 py-3.5 text-base font-bold text-white shadow-[0_10px_24px_-12px_rgba(180,67,42,0.9)] transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
        >
          <Sparkles aria-hidden="true" className="h-5 w-5" />
          {launching ? "Launching…" : "Launch my rocket"}
        </button>

        <p role="status" aria-live="polite" className="mt-3 min-h-10 text-sm leading-relaxed text-[#0F4F49]">
          {message}
        </p>
        <p className="text-[11px] text-[#5F6B83]">
          Launches on this visit: {launches}. {game.controls}
        </p>

        {complete ? <GameReward game={game} stars={3} earned={earned || complete} /> : null}
      </div>
    </div>
  );
}
