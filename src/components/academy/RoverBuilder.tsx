"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, RotateCcw, Wrench } from "lucide-react";
import {
  ROVER_MASS_LIMIT_KG,
  ROVER_POWER_LIMIT_W,
  defaultRoverBuild,
  evaluateRoverBuild,
  partsByCategory,
  type RoverBuild,
} from "@/lib/rover-builder";
import { usePersonal } from "@/lib/use-personal";
import { ROVER_BUILDER_ID } from "@/lib/achievements";
import { cn } from "@/lib/cn";

const categories = [
  { key: "wheels", label: "Mobility" },
  { key: "power", label: "Power source" },
  { key: "communication", label: "Communication" },
  { key: "thermal", label: "Thermal control" },
] as const;

export function RoverBuilder() {
  const [build, setBuild] = useState<RoverBuild>(defaultRoverBuild);
  const result = useMemo(() => evaluateRoverBuild(build), [build]);
  const personal = usePersonal();
  const completed = Boolean(personal.state.simulations[ROVER_BUILDER_ID]);

  function choose(category: "wheels" | "power" | "communication" | "thermal", id: string) {
    setBuild((previous) => ({ ...previous, [category]: id }));
  }

  function toggleInstrument(id: string) {
    setBuild((previous) => ({
      ...previous,
      instruments: previous.instruments.includes(id)
        ? previous.instruments.filter((entry) => entry !== id)
        : [...previous.instruments, id],
    }));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-start">
      <div className="space-y-6">
        {categories.map((category) => (
          <fieldset key={category.key}>
            <legend className="text-sm font-semibold text-[#14213B]">{category.label}</legend>
            <div className="mt-2 grid gap-2">
              {partsByCategory(category.key).map((part) => {
                const selected = build[category.key] === part.id;
                return (
                  <button
                    key={part.id}
                    type="button"
                    onClick={() => choose(category.key, part.id)}
                    aria-pressed={selected}
                    className={cn(
                      "rounded-xl border p-3 text-start text-sm transition-colors",
                      selected
                        ? "border-[#14213B] bg-[#14213B] text-[#FFF8EC]"
                        : "border-[#14213B]/15 bg-white text-[#46536B] hover:border-[#14213B]/40"
                    )}
                  >
                    <span className="flex items-center justify-between gap-2 font-semibold">
                      {part.label}
                      <span className="font-mono text-xs opacity-80">{part.massKg} kg</span>
                    </span>
                    <span className={cn("mt-1 block text-xs leading-relaxed", selected ? "text-[#FFF8EC]/80" : "text-[#5F6B83]")}>
                      {part.note}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}

        <fieldset>
          <legend className="text-sm font-semibold text-[#14213B]">Science instruments</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {partsByCategory("instrument").map((part) => {
              const selected = build.instruments.includes(part.id);
              return (
                <label
                  key={part.id}
                  className={cn(
                    "flex items-start gap-2 rounded-xl border p-3 text-xs",
                    selected ? "border-[#14213B] bg-[#14213B]/5" : "border-[#14213B]/15 bg-white"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => toggleInstrument(part.id)}
                    className="mt-0.5 accent-[#14213B]"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-[#14213B]">{part.label}</span>
                    <span className="text-[#5F6B83]">
                      {part.massKg} kg · science {part.science}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      <div className="academy-card rounded-2xl p-5 lg:sticky lg:top-24">
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9C4321]">
          <Wrench aria-hidden="true" className="h-3.5 w-3.5" />
          Build result
        </p>
        <p className={cn("mt-2 text-xl font-semibold", result.valid ? "text-[#14213B]" : "text-[#9C4321]")}>
          {result.verdict}
        </p>

        <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
          {[
            { label: "Mass", value: `${result.massKg} / ${ROVER_MASS_LIMIT_KG} kg`, bad: result.massKg > ROVER_MASS_LIMIT_KG },
            { label: "Power", value: `${result.powerW} / ${ROVER_POWER_LIMIT_W} W`, bad: result.powerW > ROVER_POWER_LIMIT_W },
            { label: "Science", value: `${result.science} points`, bad: false },
            { label: "Mobility", value: `${result.mobility} points`, bad: false },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-[#14213B]/10 bg-white p-3">
              <dt className="text-[10px] uppercase tracking-[0.14em] text-[#5F6B83]">{stat.label}</dt>
              <dd className={cn("mt-0.5 font-mono text-sm", stat.bad ? "text-[#9C4321]" : "text-[#14213B]")}>
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-[#5F6B83]">
            <span>Design score</span>
            <span className="font-mono">{result.score}/100</span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-[#14213B]/10">
            <div className="h-full rounded-full bg-[#9C4321]" style={{ width: `${result.score}%` }} />
          </div>
        </div>

        <ul className="mt-4 space-y-1.5 text-xs leading-relaxed text-[#46536B]">
          {result.notes.map((note) => (
            <li key={note} className="flex items-start gap-1.5">
              <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#9C4321]" />
              {note}
            </li>
          ))}
        </ul>

        <p className="mt-4 rounded-xl border border-[#9C4321]/20 bg-[#FFF8EC] p-3 text-[11px] leading-relaxed text-[#46536B]">
          These mass and power values are teaching numbers. They are not the
          specifications of any real rover. The goal is to feel the trade-offs,
          not to reproduce a NASA design review.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => personal.completeSimulation(ROVER_BUILDER_ID, result.score)}
            className="inline-flex items-center gap-2 rounded-full bg-[#14213B] px-4 py-2 text-sm font-semibold text-[#FFF8EC]"
          >
            <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
            {completed ? "Save this build again" : "Save this build"}
          </button>
          <button
            type="button"
            onClick={() => setBuild(defaultRoverBuild)}
            className="inline-flex items-center gap-2 rounded-full border border-[#14213B]/20 px-4 py-2 text-sm font-medium text-[#14213B]"
          >
            <RotateCcw aria-hidden="true" className="h-4 w-4" />
            Reset
          </button>
        </div>
        {completed ? (
          <p className="mt-2 text-xs text-[#5F6B83]">
            A build is saved on this device and counts toward the Rover engineer
            achievement.
          </p>
        ) : null}
      </div>
    </div>
  );
}
