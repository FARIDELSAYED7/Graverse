"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  CircleDot,
  Gauge,
  RotateCcw,
  Route,
  Signal,
  Sparkles,
} from "lucide-react";
import { usePersonal } from "@/lib/use-personal";
import {
  communicationTargets,
  defaultLandingInput,
  defaultPowerInput,
  evaluatePlan,
  evaluateRoverRoute,
  formatDuration,
  hohmannTransfer,
  lightTimeSeconds,
  orbitDestinations,
  planningParts,
  relativeSignalStrength,
  roverGoal,
  roverStart,
  roverTerrain,
  roundTripSeconds,
  simulateLanding,
  simulatePower,
  type LandingInput,
  type PlanningInput,
  type PowerInput,
  type RoverCell,
} from "@/lib/simulations";
import { getSimulation, type SimulationId } from "@/data/simulations";
import { allArtifacts } from "@/data/artifacts";
import { cn } from "@/lib/cn";
import { t, type Locale } from "@/lib/i18n";

/* --------------------------------------------------------------- shared UI */

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span className="flex items-center justify-between gap-2 font-medium text-text-primary">
        {label}
        {hint ? <span className="font-mono text-xs text-accent-bright">{hint}</span> : null}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function Range({
  label,
  value,
  min,
  max,
  step = 1,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <Field label={label} hint={`${value}${suffix ? ` ${suffix}` : ""}`}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-[#5eead4]"
      />
    </Field>
  );
}

function Stat({
  label,
  value,
  tone = "text-text-primary",
}: {
  label: string;
  value: string;
  tone?: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <dt className="text-[10px] uppercase tracking-[0.14em] text-text-muted">{label}</dt>
      <dd className={cn("mt-1 font-mono text-lg tabular-nums", tone)}>{value}</dd>
    </div>
  );
}

function ResultPanel({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  return (
    <div className="rounded-2xl border border-accent/25 bg-surface p-4 sm:p-5">
      <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-bright">
        <Gauge aria-hidden="true" className="h-3.5 w-3.5" />
        {t(locale, "sim.result")}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Notes({ notes }: { notes: string[] }) {
  if (notes.length === 0) return null;
  return (
    <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-text-secondary">
      {notes.map((note) => (
        <li key={note} className="flex items-start gap-1.5">
          <CircleDot aria-hidden="true" className="mt-0.5 h-3 w-3 shrink-0 text-accent-bright" />
          {note}
        </li>
      ))}
    </ul>
  );
}

function Completion({
  id,
  score,
  locale,
}: {
  id: SimulationId;
  score?: number;
  locale: Locale;
}) {
  const { state, completeSimulation } = usePersonal();
  const record = state.simulations[id];
  const done = Boolean(record);
  const savedScore = record?.score;
  return (
    <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
      <button
        type="button"
        onClick={() => completeSimulation(id, score)}
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
          done
            ? "border border-emerald-400/40 bg-emerald-400/10 text-emerald-200"
            : "btn-primary"
        )}
      >
        <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
        {done ? t(locale, "sim.completed") : t(locale, "sim.complete")}
      </button>
      {done && typeof savedScore === "number" ? (
        <span className="font-mono text-xs text-text-secondary">
          {t(locale, "sim.score")}: {savedScore}
        </span>
      ) : null}
      <span className="text-xs text-text-muted">
        {t(locale, "common.localOnly")}. It is not a grade or a NASA result.
      </span>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
}

/* ----------------------------------------------------------------- Landing */

function LandingSimulator({ locale }: { locale: Locale }) {
  const [input, setInput] = useState<LandingInput>(defaultLandingInput);
  const result = useMemo(() => simulateLanding(input), [input]);
  const update = <K extends keyof LandingInput>(key: K, value: LandingInput[K]) =>
    setInput((previous) => ({ ...previous, [key]: value }));

  const maxT = Math.max(1, ...result.samples.map((sample) => sample.t));
  const maxAlt = Math.max(1, ...result.samples.map((sample) => sample.altitude));
  const points = result.samples
    .filter((_, index) => index % Math.max(1, Math.floor(result.samples.length / 120)) === 0)
    .map((sample) => {
      const x = (sample.t / maxT) * 320;
      const y = 140 - (sample.altitude / maxAlt) * 130;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          <Range label="Entry speed" value={input.entrySpeed} min={3000} max={7500} step={100} suffix="m/s" onChange={(value) => update("entrySpeed", value)} />
          <Range label="Entry angle" value={input.entryAngle} min={5} max={30} suffix="deg" onChange={(value) => update("entryAngle", value)} />
          <Range label="Parachute diameter" value={input.parachuteDiameter} min={0} max={30} step={0.5} suffix="m" onChange={(value) => update("parachuteDiameter", value)} />
          <Range label="Parachute deploy altitude" value={input.parachuteDeployAltitude} min={2000} max={20000} step={500} suffix="m" onChange={(value) => update("parachuteDeployAltitude", value)} />
          <Range label="Retro-propellant" value={input.retroPropellant} min={0} max={1200} step={25} suffix="kg" onChange={(value) => update("retroPropellant", value)} />
          <Range label="Throttle" value={input.throttle} min={0} max={1} step={0.05} onChange={(value) => update("throttle", value)} />
          <Range label="Entry mass" value={input.mass} min={300} max={3000} step={50} suffix="kg" onChange={(value) => update("mass", value)} />
          <div className="flex flex-wrap gap-4 text-sm">
            <label className="inline-flex items-center gap-2 text-text-secondary">
              <input type="checkbox" checked={input.heatShield} onChange={(event) => update("heatShield", event.target.checked)} className="accent-[#5eead4]" />
              Heat shield
            </label>
            <label className="inline-flex items-center gap-2 text-text-secondary">
              <input type="checkbox" checked={input.skyCrane} onChange={(event) => update("skyCrane", event.target.checked)} className="accent-[#5eead4]" />
              Sky-crane terminal descent
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-[#050d1b] p-3">
            <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted">
              Modelled altitude profile
            </p>
            <svg viewBox="0 0 320 150" role="img" aria-label="Modelled altitude against time. The curve starts high and falls toward the surface." className="mt-2 w-full">
              <line x1="0" y1="140" x2="320" y2="140" stroke="rgba(255,255,255,0.2)" />
              <line x1="0" y1="10" x2="0" y2="140" stroke="rgba(255,255,255,0.2)" />
              <polyline points={points} fill="none" stroke="#5eead4" strokeWidth="2" />
            </svg>
            <p className="mt-1 flex justify-between font-mono text-[10px] text-text-muted">
              <span>t = 0 s</span>
              <span>t = {maxT.toFixed(0)} s</span>
            </p>
          </div>

          <ResultPanel locale={locale}>
            <div
              className={cn(
                "flex items-center gap-2 rounded-xl border p-3 text-sm font-semibold",
                result.survived
                  ? "border-emerald-400/35 bg-emerald-400/10 text-emerald-200"
                  : "border-danger/40 bg-danger/10 text-[#FFB3B8]"
              )}
            >
              {result.survived ? (
                <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
              ) : (
                <AlertTriangle aria-hidden="true" className="h-4 w-4" />
              )}
              {result.outcome}
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-2">
              <Stat label="Touchdown speed" value={`${result.touchdownSpeed.toFixed(1)} m/s`} />
              <Stat label="Propellant used" value={`${result.fuelUsed.toFixed(0)} kg`} />
              <Stat label="Propellant left" value={`${result.fuelRemaining.toFixed(0)} kg`} />
              <Stat label="Phases" value={String(result.phases.length)} />
            </dl>
            <p className="mt-3 text-xs text-text-secondary">
              Phase order: {result.phases.join(" → ")}
            </p>
            <Notes notes={result.notes} />
          </ResultPanel>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => setInput(defaultLandingInput)} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-text-secondary hover:text-white">
          <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
          {t(locale, "sim.reset")}
        </button>
      </div>
      <Completion id="landing" score={result.survived ? 100 : 0} locale={locale} />
    </div>
  );
}

/* ------------------------------------------------------------------- Power */

function PowerSimulator({ locale }: { locale: Locale }) {
  const [input, setInput] = useState<PowerInput>(defaultPowerInput);
  const result = useMemo(() => simulatePower(input), [input]);
  const update = <K extends keyof PowerInput>(key: K, value: PowerInput[K]) =>
    setInput((previous) => ({ ...previous, [key]: value }));

  const maxBar = Math.max(result.generationWh, result.consumptionWh, 1);
  const tone =
    result.status === "healthy"
      ? "text-emerald-300"
      : result.status === "tight"
        ? "text-amber-300"
        : "text-[#FFB3B8]";

  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          <Field label="Power source">
            <div className="flex gap-2">
              {(["solar", "rtg"] as const).map((source) => (
                <button
                  key={source}
                  type="button"
                  onClick={() => update("source", source)}
                  aria-pressed={input.source === source}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium",
                    input.source === source
                      ? "border-accent/50 bg-accent/15 text-white"
                      : "border-white/10 bg-white/[0.03] text-text-secondary hover:text-white"
                  )}
                >
                  {source === "solar" ? "Solar array" : "Radioisotope generator"}
                </button>
              ))}
            </div>
          </Field>
          {input.source === "solar" ? (
            <>
              <Range label="Array area" value={input.arrayArea} min={0} max={20} step={0.5} suffix="m²" onChange={(value) => update("arrayArea", value)} />
              <Range label="Array efficiency" value={input.arrayEfficiency} min={0.1} max={0.4} step={0.01} onChange={(value) => update("arrayEfficiency", value)} />
              <Range label="Useful sunlight per sol" value={input.sunHours} min={2} max={16} suffix="h" onChange={(value) => update("sunHours", value)} />
              <Range label="Dust factor" value={input.dustFactor} min={0.2} max={1} step={0.05} onChange={(value) => update("dustFactor", value)} />
              <Range label="Battery capacity" value={input.batteryWh} min={200} max={4000} step={100} suffix="Wh" onChange={(value) => update("batteryWh", value)} />
            </>
          ) : (
            <Range label="RTG output" value={input.rtgWatts} min={40} max={300} step={5} suffix="W" onChange={(value) => update("rtgWatts", value)} />
          )}
          <Range label="Instrument load" value={input.instrumentLoadW} min={0} max={250} step={5} suffix="W" onChange={(value) => update("instrumentLoadW", value)} />
          <Range label="Heater load" value={input.heaterLoadW} min={0} max={200} step={5} suffix="W" onChange={(value) => update("heaterLoadW", value)} />
          <Range label="Mobility load" value={input.mobilityLoadW} min={0} max={300} step={10} suffix="W" onChange={(value) => update("mobilityLoadW", value)} />
          <Range label="Driving per sol" value={input.driveHours} min={0} max={8} step={0.5} suffix="h" onChange={(value) => update("driveHours", value)} />
        </div>

        <div className="space-y-4">
          <ResultPanel locale={locale}>
            <p className={cn("flex flex-wrap items-center gap-2 text-sm font-semibold", tone)}>
              <span className="text-[10px] uppercase tracking-[0.16em] text-text-muted">
                {t(locale, "sim.status")}
              </span>
              {result.status === "healthy"
                ? t(locale, "sim.power.healthy")
                : result.status === "tight"
                  ? t(locale, "sim.power.tight")
                  : t(locale, "sim.power.deficit")}
            </p>
            <dl className="mt-3 grid grid-cols-2 gap-2">
              <Stat label="Generation" value={`${result.generationWh} Wh`} tone="text-emerald-300" />
              <Stat label="Consumption" value={`${result.consumptionWh} Wh`} tone="text-amber-300" />
              <Stat label="Net per sol" value={`${result.netWh} Wh`} tone={result.netWh >= 0 ? "text-emerald-300" : "text-[#FFB3B8]"} />
              <Stat label="Margin" value={`${result.marginPercent}%`} tone={tone} />
              <Stat label="Night load" value={`${result.nightNeedWh} Wh`} />
              <Stat label="Battery" value={`${input.batteryWh} Wh`} />
            </dl>
            <div className="mt-4 space-y-2">
              {[
                { label: "Generation", value: result.generationWh, color: "bg-emerald-400/70" },
                { label: "Consumption", value: result.consumptionWh, color: "bg-amber-400/70" },
              ].map((bar) => (
                <div key={bar.label}>
                  <p className="flex justify-between text-[10px] uppercase tracking-[0.12em] text-text-muted">
                    <span>{bar.label}</span>
                    <span className="font-mono">{bar.value} Wh</span>
                  </p>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className={cn("h-full rounded-full", bar.color)} style={{ width: `${Math.min(100, (bar.value / maxBar) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <Notes notes={result.notes} />
          </ResultPanel>
        </div>
      </div>
      <div className="mt-4">
        <button type="button" onClick={() => setInput(defaultPowerInput)} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-text-secondary hover:text-white">
          <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
          {t(locale, "sim.reset")}
        </button>
      </div>
      <Completion id="power" score={result.status === "healthy" ? 100 : result.status === "tight" ? 60 : 20} locale={locale} />
    </div>
  );
}

/* ----------------------------------------------------------- Communication */

function CommunicationSimulator({ locale }: { locale: Locale }) {
  const [targetId, setTargetId] = useState(communicationTargets[1].id);
  const target = communicationTargets.find((entry) => entry.id === targetId) ?? communicationTargets[0];
  const oneWay = lightTimeSeconds(target.distanceKm);
  const roundTrip = roundTripSeconds(target.distanceKm);
  const strength = relativeSignalStrength(target.distanceKm);

  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          <Field label="Destination">
            <select
              value={targetId}
              onChange={(event) => setTargetId(event.target.value)}
              className="h-10 w-full rounded-xl border border-white/10 bg-[#07111f] px-3 text-sm text-text-primary focus:border-accent/50 focus:outline-none"
            >
              {communicationTargets.map((entry) => (
                <option key={entry.id} value={entry.id}>
                  {entry.label}
                </option>
              ))}
            </select>
          </Field>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm leading-relaxed text-text-secondary">
            <p className="font-medium text-text-primary">{target.label}</p>
            <p className="mt-1 font-mono text-xs text-accent-bright">
              {(target.distanceKm / 1_000_000).toFixed(1)} million km
            </p>
            <p className="mt-2 text-xs">{target.note}</p>
          </div>
          <p className="text-xs leading-relaxed text-text-muted">
            The model computes light time from distance. A real link also depends
            on antenna gain, transmit power, pointing, weather and the Deep Space
            Network schedule — none of which are modelled here.
          </p>
        </div>

        <ResultPanel locale={locale}>
          <dl className="grid grid-cols-2 gap-2">
            <Stat label="One-way light time" value={formatDuration(oneWay)} />
            <Stat label="Round trip" value={formatDuration(roundTrip)} />
            <Stat label="Relative strength" value={`${strength.toExponential(2)}× Moon`} />
            <Stat label="Distance" value={`${(target.distanceKm / 1_000_000).toFixed(1)}M km`} />
          </dl>
          <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-text-secondary">
            <Signal aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-bright" />
            A command sent to {target.label} would take {formatDuration(oneWay)} to
            arrive. You could not have a real-time conversation at this distance.
          </p>
          <div className="mt-4 space-y-1.5">
            {communicationTargets.map((entry) => {
              const seconds = lightTimeSeconds(entry.distanceKm);
              return (
                <div key={entry.id} className="flex items-center justify-between gap-2 text-xs">
                  <span className={entry.id === target.id ? "font-medium text-accent-bright" : "text-text-secondary"}>
                    {entry.label}
                  </span>
                  <span className="font-mono tabular-nums text-text-muted">{formatDuration(seconds)}</span>
                </div>
              );
            })}
          </div>
        </ResultPanel>
      </div>
      <Completion id="communication" locale={locale} />
    </div>
  );
}

/* ------------------------------------------------------------------- Orbit */

function OrbitSimulator({ locale }: { locale: Locale }) {
  const [from, setFrom] = useState("earth");
  const [to, setTo] = useState("mars");
  const origin = orbitDestinations.find((entry) => entry.id === from) ?? orbitDestinations[2];
  const destination = orbitDestinations.find((entry) => entry.id === to) ?? orbitDestinations[3];
  const result = useMemo(() => hohmannTransfer(origin.au, destination.au), [origin.au, destination.au]);

  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          <Row>
            <Field label="Starting orbit">
              <select value={from} onChange={(event) => setFrom(event.target.value)} className="h-10 w-full rounded-xl border border-white/10 bg-[#07111f] px-3 text-sm text-text-primary focus:border-accent/50 focus:outline-none">
                {orbitDestinations.map((entry) => (
                  <option key={entry.id} value={entry.id}>{entry.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Target orbit">
              <select value={to} onChange={(event) => setTo(event.target.value)} className="h-10 w-full rounded-xl border border-white/10 bg-[#07111f] px-3 text-sm text-text-primary focus:border-accent/50 focus:outline-none">
                {orbitDestinations.map((entry) => (
                  <option key={entry.id} value={entry.id}>{entry.label}</option>
                ))}
              </select>
            </Field>
          </Row>
          <p className="text-xs leading-relaxed text-text-muted">
            A Hohmann transfer is an idealised two-burn manoeuvre between circular
            orbits. Real missions use gravity assists, plane changes and finite
            burns. Those are not modelled.
          </p>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm leading-relaxed text-text-secondary">
            <p className="font-medium text-text-primary">Why alignments matter</p>
            <p className="mt-1.5">
              The transfer must arrive when the target is in the right place. That
              is why launch windows are narrow and why mission planners work years
              ahead.
            </p>
          </div>
        </div>

        <ResultPanel locale={locale}>
          <dl className="grid grid-cols-2 gap-2">
            <Stat label="First burn" value={`${result.deltaV1} km/s`} />
            <Stat label="Second burn" value={`${result.deltaV2} km/s`} />
            <Stat label="Total delta-v" value={`${result.totalDeltaV} km/s`} tone="text-accent-bright" />
            <Stat label="Transfer time" value={`${result.transferYears} years`} />
            <Stat label="Direction" value={result.direction} />
            <Stat label="Orbit radii" value={`${result.r1Au} → ${result.r2Au} AU`} />
          </dl>
          <Notes notes={[
            "The transfer assumes circular, coplanar orbits and ignores the mass of the spacecraft.",
            "A real mission also needs to match the target's position at arrival, not only its orbit.",
          ]} />
        </ResultPanel>
      </div>
      <Completion id="orbit" locale={locale} />
    </div>
  );
}

/* ------------------------------------------------------------------- Rover */

function RoverSimulator({ locale }: { locale: Locale }) {
  const [path, setPath] = useState<RoverCell[]>([roverTerrain[roverStart.y][roverStart.x]]);
  const [score, setScore] = useState<number | undefined>(undefined);
  const result = useMemo(() => evaluateRoverRoute(path), [path]);
  const visited = new Set(path.map((cell) => `${cell.x},${cell.y}`));

  function addCell(cell: RoverCell) {
    const last = path[path.length - 1];
    if (visited.has(`${cell.x},${cell.y}`)) return;
    if (Math.abs(cell.x - last.x) > 1 || Math.abs(cell.y - last.y) > 1) return;
    const next = [...path, cell];
    setPath(next);
    const evaluation = evaluateRoverRoute(next);
    if (evaluation.valid) setScore(100);
  }

  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div>
          <div className="grid grid-cols-6 gap-1.5" role="group" aria-label="Rover terrain grid">
            {roverTerrain.flatMap((row) =>
              row.map((cell) => {
                const isStart = cell.x === roverStart.x && cell.y === roverStart.y;
                const isGoal = cell.x === roverGoal.x && cell.y === roverGoal.y;
                const inPath = visited.has(`${cell.x},${cell.y}`);
                return (
                  <button
                    key={`${cell.x},${cell.y}`}
                    type="button"
                    onClick={() => addCell(cell)}
                    aria-label={`Column ${cell.x + 1}, row ${cell.y + 1}: slope ${cell.slope} degrees, science ${cell.science}`}
                    aria-pressed={inPath}
                    className={cn(
                      "relative aspect-square rounded-lg border text-[10px] font-mono transition-colors",
                      inPath
                        ? "border-accent-bright bg-accent/25 text-white"
                        : "border-white/10 bg-white/[0.03] text-text-muted hover:border-white/25",
                      isStart && "ring-2 ring-emerald-400/70",
                      isGoal && "ring-2 ring-amber-400/70"
                    )}
                  >
                    {isStart ? "S" : isGoal ? "G" : cell.science > 0 ? "★" : cell.slope}
                  </button>
                );
              })
            )}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-text-muted">
            Click adjacent cells to build a route from S to G. Numbers show slope in
            degrees; ★ marks a science target. The terrain is invented for teaching.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={() => setPath([roverTerrain[roverStart.y][roverStart.x]])} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-text-secondary hover:text-white">
              <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
              {t(locale, "sim.reset")}
            </button>
            <button type="button" onClick={() => setPath((previous) => previous.slice(0, -1))} disabled={path.length <= 1} className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-text-secondary hover:text-white disabled:opacity-40">
              Undo step
            </button>
          </div>
        </div>

        <ResultPanel locale={locale}>
          <p className={cn("flex items-center gap-2 text-sm font-semibold", result.valid ? "text-emerald-300" : "text-amber-200")}>
            <Route aria-hidden="true" className="h-4 w-4" />
            {result.message}
          </p>
          <dl className="mt-3 grid grid-cols-2 gap-2">
            <Stat label="Steps" value={String(Math.max(0, path.length - 1))} />
            <Stat label="Energy" value={`${result.energyWh} Wh`} tone={result.energyWh > 45 ? "text-[#FFB3B8]" : "text-emerald-300"} />
            <Stat label="Science" value={`${result.science} points`} tone="text-accent-bright" />
            <Stat label={t(locale, "sim.budget")} value="45 Wh" />
          </dl>
          <Notes notes={[
            "The budget is a teaching value, not the specification of any real rover.",
            "A shorter route is not always safer: slope and science value matter too.",
          ]} />
        </ResultPanel>
      </div>
      <Completion id="rover" score={score} locale={locale} />
    </div>
  );
}

/* ---------------------------------------------------------------- Planning */

function PlanningSimulator({ locale }: { locale: Locale }) {
  const [input, setInput] = useState<PlanningInput>({
    parts: ["camera", "spectrometer"],
    powerSource: "solar",
    rtgWatts: 110,
    solarWatts: 80,
    massLimitKg: 120,
    powerLimitW: 100,
  });
  const result = useMemo(() => evaluatePlan(input), [input]);

  function togglePart(id: string) {
    setInput((previous) => ({
      ...previous,
      parts: previous.parts.includes(id)
        ? previous.parts.filter((entry) => entry !== id)
        : [...previous.parts, id],
    }));
  }

  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          <fieldset>
            <legend className="text-sm font-medium text-text-primary">Payload</legend>
            <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
              {planningParts.map((part) => (
                <label key={part.id} className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/[0.02] p-2.5 text-xs text-text-secondary">
                  <input type="checkbox" checked={input.parts.includes(part.id)} onChange={() => togglePart(part.id)} className="mt-0.5 accent-[#5eead4]" />
                  <span>
                    <span className="block font-medium text-text-primary">{part.label}</span>
                    {part.massKg} kg · {part.powerW} W · science {part.science}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <Field label="Power source">
            <div className="flex gap-2">
              {(["solar", "rtg"] as const).map((source) => (
                <button key={source} type="button" onClick={() => setInput((previous) => ({ ...previous, powerSource: source }))} aria-pressed={input.powerSource === source} className={cn("rounded-full border px-3 py-1.5 text-xs font-medium", input.powerSource === source ? "border-accent/50 bg-accent/15 text-white" : "border-white/10 bg-white/[0.03] text-text-secondary hover:text-white")}>
                  {source === "solar" ? "Solar" : "RTG"}
                </button>
              ))}
            </div>
          </Field>
          <Range label="Mass limit" value={input.massLimitKg} min={40} max={200} step={5} suffix="kg" onChange={(value) => setInput((previous) => ({ ...previous, massLimitKg: value }))} />
          <Range label="Power limit" value={input.powerLimitW} min={20} max={200} step={5} suffix="W" onChange={(value) => setInput((previous) => ({ ...previous, powerLimitW: value }))} />
        </div>

        <ResultPanel locale={locale}>
          <p className={cn("text-sm font-semibold", result.valid ? "text-emerald-300" : "text-[#FFB3B8]")}>
            {result.valid ? t(locale, "sim.valid") : t(locale, "sim.invalid")}
          </p>
          <dl className="mt-3 grid grid-cols-2 gap-2">
            <Stat label="Payload mass" value={`${result.massKg} kg`} tone={result.massMarginKg < 0 ? "text-[#FFB3B8]" : "text-text-primary"} />
            <Stat label="Mass margin" value={`${result.massMarginKg} kg`} tone={result.massMarginKg < 0 ? "text-[#FFB3B8]" : "text-emerald-300"} />
            <Stat label="Payload power" value={`${result.powerW} W`} tone={result.powerMarginW < 0 ? "text-[#FFB3B8]" : "text-text-primary"} />
            <Stat label="Power margin" value={`${result.powerMarginW} W`} tone={result.powerMarginW < 0 ? "text-[#FFB3B8]" : "text-emerald-300"} />
            <Stat label="Science return" value={`${result.science} points`} tone="text-accent-bright" />
            <Stat label="Source" value={input.powerSource === "solar" ? "Solar" : "RTG"} />
          </dl>
          <Notes notes={result.notes} />
        </ResultPanel>
      </div>
      <Completion id="planning" score={result.valid ? Math.min(100, result.science * 12) : 0} locale={locale} />
    </div>
  );
}

/* ---------------------------------------------------------------- What if */

const whatIfScenarios = [
  {
    id: "opportunity",
    artifactId: "opportunity",
    title: "Opportunity and a long dust storm",
    condition: "Dust severity",
    low: "Less dust than the recorded event",
    high: "More dust than the recorded event",
    hypothesis: (value: number) =>
      value > 70
        ? "In this hypothetical, the solar array stays heavily covered and the rover cannot recover enough power. This is a scenario, not a claim about the real mission."
        : "In this hypothetical, the array clears enough for the rover to keep operating. This is a scenario, not a claim about the real mission.",
  },
  {
    id: "insight",
    artifactId: "insight",
    title: "InSight and available power",
    condition: "Power available",
    low: "Very low power",
    high: "More power than the recorded mission had",
    hypothesis: (value: number) =>
      value < 30
        ? "In this hypothetical, the lander cannot keep its instruments warm and must shut down. This is a scenario, not a claim about the real mission."
        : "In this hypothetical, the lander retains enough power to continue listening. This is a scenario, not a claim about the real mission.",
  },
  {
    id: "phoenix",
    artifactId: "phoenix",
    title: "Phoenix and the Martian winter",
    condition: "Winter sunlight",
    low: "A darker winter",
    high: "A brighter winter",
    hypothesis: (value: number) =>
      value < 30
        ? "In this hypothetical, the lander loses power earlier in the winter. This is a scenario, not a claim about the real mission."
        : "In this hypothetical, the lander keeps more power through the winter. This is a scenario, not a claim about the real mission.",
  },
  {
    id: "spirit",
    artifactId: "spirit",
    title: "Spirit and a dust-cleaning event",
    condition: "Dust clearing",
    low: "No cleaning event",
    high: "A strong cleaning event",
    hypothesis: (value: number) =>
      value < 30
        ? "In this hypothetical, the array stays dusty and the rover's energy margin shrinks. This is a scenario, not a claim about the real mission."
        : "In this hypothetical, the array clears and the rover gains energy. This is a scenario, not a claim about the real mission.",
  },
] as const;

function WhatIfSimulator({ locale }: { locale: Locale }) {
  const [scenarioId, setScenarioId] = useState<string>(whatIfScenarios[0].id);
  const [value, setValue] = useState(50);
  const scenario = whatIfScenarios.find((entry) => entry.id === scenarioId) ?? whatIfScenarios[0];
  const artifact = allArtifacts.find((entry) => entry.id === scenario.artifactId);

  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          <Field label="Scenario">
            <select value={scenarioId} onChange={(event) => setScenarioId(event.target.value as typeof scenarioId)} className="h-10 w-full rounded-xl border border-white/10 bg-[#07111f] px-3 text-sm text-text-primary focus:border-accent/50 focus:outline-none">
              {whatIfScenarios.map((entry) => (
                <option key={entry.id} value={entry.id}>{entry.title}</option>
              ))}
            </select>
          </Field>
          <Range label={scenario.condition} value={value} min={0} max={100} suffix="%" onChange={setValue} />
          <div className="rounded-xl border border-amber-400/30 bg-amber-400/[0.07] p-4 text-sm leading-relaxed text-text-secondary">
            <p className="flex items-center gap-2 font-semibold text-amber-200">
              <AlertTriangle aria-hidden="true" className="h-4 w-4" />
              Hypothetical scenario
            </p>
            <p className="mt-1.5">{scenario.hypothesis(value)}</p>
            <p className="mt-2 text-xs text-text-muted">
              The slider changes the scenario only. It never changes the real record.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
            The real record stays here
          </p>
          {artifact ? (
            <>
              <h3 className="mt-2 text-base font-semibold text-text-primary">{artifact.name}</h3>
              <p className="mt-1 text-xs text-text-muted">{artifact.missionName}</p>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{artifact.fate}</p>
              <dl className="mt-3 grid grid-cols-2 gap-2">
                <Stat label="Hardware status" value={artifact.hardwareStatus.replace(/-/g, " ")} />
                <Stat label="Last verified" value={artifact.lastVerified} />
              </dl>
            </>
          ) : null}
          <p className="mt-3 text-xs leading-relaxed text-text-muted">
            A counterfactual is a reasoning exercise. It is not evidence that the
            alternative happened.
          </p>
        </div>
      </div>
      <Completion id="what-if" locale={locale} />
    </div>
  );
}

/* ---------------------------------------------------------------- Failure */

const hypotheses = [
  { id: "destroyed", label: "The hardware was destroyed" },
  { id: "lost-contact", label: "Contact was lost, but destruction is not established" },
  { id: "operating", label: "The hardware is still operating" },
  { id: "impact", label: "The hardware was deliberately impacted" },
] as const;

function expectedHypothesis(artifactId: string): string {
  const artifact = allArtifacts.find((entry) => entry.id === artifactId);
  if (!artifact) return "lost-contact";
  switch (artifact.hardwareStatus) {
    case "destroyed":
      return "destroyed";
    case "impacted":
      return "impact";
    case "operating":
      return "operating";
    case "no-longer-communicating":
    case "inactive":
      return "lost-contact";
    default:
      return "lost-contact";
  }
}

function FailureSimulator({ locale }: { locale: Locale }) {
  const failureIds = ["opportunity", "insight", "ingenuity", "cassini", "mars-2020-descent-stage"];
  const [artifactId, setArtifactId] = useState(failureIds[0]);
  const [choice, setChoice] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const artifact = allArtifacts.find((entry) => entry.id === artifactId);
  const expected = expectedHypothesis(artifactId);
  const correct = choice === expected;

  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          <Field label="Choose a documented ending">
            <select
              value={artifactId}
              onChange={(event) => {
                setArtifactId(event.target.value);
                setChoice(null);
                setChecked(false);
              }}
              className="h-10 w-full rounded-xl border border-white/10 bg-[#07111f] px-3 text-sm text-text-primary focus:border-accent/50 focus:outline-none"
            >
              {failureIds.map((id) => {
                const entry = allArtifacts.find((artifactEntry) => artifactEntry.id === id);
                return (
                  <option key={id} value={id}>
                    {entry?.name ?? id}
                  </option>
                );
              })}
            </select>
          </Field>
          {artifact ? (
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm leading-relaxed text-text-secondary">
              <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted">
                Recorded wording
              </p>
              <p className="mt-1.5 font-medium text-text-primary">{artifact.hardwareStatusOriginal}</p>
              <p className="mt-2">{artifact.fate}</p>
            </div>
          ) : null}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          <fieldset>
            <legend className="text-sm font-semibold text-text-primary">
              Which conclusion does the record support?
            </legend>
            <div className="mt-3 space-y-2">
              {hypotheses.map((hypothesis) => (
                <label key={hypothesis.id} className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/[0.02] p-2.5 text-sm text-text-secondary">
                  <input
                    type="radio"
                    name="failure-hypothesis"
                    checked={choice === hypothesis.id}
                    onChange={() => {
                      setChoice(hypothesis.id);
                      setChecked(false);
                    }}
                    className="mt-0.5 accent-[#5eead4]"
                  />
                  {hypothesis.label}
                </label>
              ))}
            </div>
          </fieldset>
          <button
            type="button"
            disabled={!choice}
            onClick={() => setChecked(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-text-secondary hover:text-white disabled:opacity-40"
          >
            <Sparkles aria-hidden="true" className="h-4 w-4" />
            Check against the record
          </button>
          {checked ? (
            <div
              className={cn(
                "mt-4 rounded-xl border p-3 text-sm leading-relaxed",
                correct
                  ? "border-emerald-400/35 bg-emerald-400/10 text-emerald-100"
                  : "border-amber-400/35 bg-amber-400/10 text-amber-100"
              )}
              role="status"
            >
              <p className="font-semibold">
                {correct ? "Supported by the recorded status" : "Not the conclusion the record supports"}
              </p>
              <p className="mt-1">
                The record&apos;s normalized hardware status is{" "}
                <span className="font-mono">{artifact?.hardwareStatus}</span>. The
                original wording is “{artifact?.hardwareStatusOriginal}”.
              </p>
              <p className="mt-2 text-xs opacity-90">
                This is a reading exercise, not an official accident
                investigation. The collection does not establish a root cause
                beyond what its sources state.
              </p>
            </div>
          ) : null}
        </div>
      </div>
      <Completion id="failure" score={correct ? 100 : 0} locale={locale} />
    </div>
  );
}

/* ------------------------------------------------------------------ export */

export function Simulator({ id, locale }: { id: SimulationId; locale: Locale }) {
  switch (id) {
    case "landing":
      return <LandingSimulator locale={locale} />;
    case "power":
      return <PowerSimulator locale={locale} />;
    case "communication":
      return <CommunicationSimulator locale={locale} />;
    case "orbit":
      return <OrbitSimulator locale={locale} />;
    case "rover":
      return <RoverSimulator locale={locale} />;
    case "planning":
      return <PlanningSimulator locale={locale} />;
    case "what-if":
      return <WhatIfSimulator locale={locale} />;
    case "failure":
      return <FailureSimulator locale={locale} />;
    default:
      return null;
  }
}

export function simulatorTitle(id: SimulationId): string {
  return getSimulation(id)?.title ?? "Simulation";
}
