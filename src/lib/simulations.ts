/**
 * Educational simulation models.
 *
 * These functions are deliberately small, deterministic and testable. They are
 * teaching models, not flight software. Every simulator page displays the
 * approximation note from `data/simulations.ts`.
 */

export const MARS_GRAVITY = 3.711; // m/s^2
export const MARS_SURFACE_DENSITY = 0.02; // kg/m^3, approximate
export const MARS_SCALE_HEIGHT = 11_100; // m, approximate
export const LIGHT_SPEED_KM_S = 299_792.458;
export const AU_KM = 149_597_870.7;
export const SUN_MU_KM3_S2 = 1.327_124_400_18e11;

/* ------------------------------------------------------------------ Landing */

export type LandingPhase =
  | "Entry"
  | "Parachute"
  | "Powered descent"
  | "Sky crane"
  | "Touchdown";

export interface LandingInput {
  entrySpeed: number; // m/s at entry interface
  entryAngle: number; // degrees below horizontal
  heatShield: boolean;
  parachuteDiameter: number; // m
  parachuteDeployAltitude: number; // m
  retroPropellant: number; // kg
  throttle: number; // 0..1
  skyCrane: boolean;
  mass: number; // kg at entry
}

export interface LandingSample {
  t: number;
  altitude: number;
  velocity: number;
  phase: LandingPhase;
}

export interface LandingResult {
  samples: LandingSample[];
  touchdownSpeed: number;
  survived: boolean;
  fuelUsed: number;
  fuelRemaining: number;
  phases: LandingPhase[];
  outcome: string;
  notes: string[];
}

export const defaultLandingInput: LandingInput = {
  entrySpeed: 5800,
  entryAngle: 14,
  heatShield: true,
  parachuteDiameter: 21.5,
  parachuteDeployAltitude: 11_000,
  retroPropellant: 400,
  throttle: 0.85,
  skyCrane: true,
  mass: 1000,
};

/**
 * One-dimensional descent model. It is intentionally simple: an exponential
 * atmosphere, constant gravity, a disk parachute and a retro-rocket stage.
 */
export function simulateLanding(input: LandingInput): LandingResult {
  const notes: string[] = [];
  const phasesSeen: LandingPhase[] = [];
  const samples: LandingSample[] = [];
  const dt = 0.25;
  const maxSteps = 20_000;

  let altitude = 125_000;
  let velocity = input.entrySpeed;
  let mass = Math.max(200, input.mass);
  let fuel = Math.max(0, input.retroPropellant);
  let t = 0;
  let phase: LandingPhase = "Entry";
  let survived = true;

  const parachuteArea = Math.PI * (input.parachuteDiameter / 2) ** 2;
  const capsuleArea = 12; // m^2, representative
  const isp = 300; // s, representative
  const g0 = 9.80665;
  const maxThrust = 12_000; // N, representative

  const push = (nextPhase: LandingPhase) => {
    if (phasesSeen[phasesSeen.length - 1] !== nextPhase) {
      phasesSeen.push(nextPhase);
    }
    phase = nextPhase;
  };

  push("Entry");

  for (let step = 0; step < maxSteps && altitude > 0; step += 1) {
    const density =
      MARS_SURFACE_DENSITY * Math.exp(-Math.max(0, altitude) / MARS_SCALE_HEIGHT);

    if (!input.heatShield && altitude > 40_000) {
      survived = false;
      notes.push(
        "Without a heat shield the model fails during entry. Atmospheric heating is not modelled in detail, but the vehicle is treated as lost."
      );
      break;
    }

    let area = capsuleArea;
    let dragCoefficient = 1.2;

    if (
      altitude <= input.parachuteDeployAltitude &&
      velocity < 1_500 &&
      input.parachuteDiameter > 0
    ) {
      area = parachuteArea;
      dragCoefficient = 1.5;
      push("Parachute");
    }

    if (altitude <= 2_000 && fuel > 0 && input.throttle > 0) {
      push("Powered descent");
    }

    const dragForce =
      0.5 * density * velocity * Math.abs(velocity) * dragCoefficient * area;
    let acceleration = -MARS_GRAVITY + dragForce / mass;

    if (
      altitude <= 2_000 &&
      fuel > 0 &&
      input.throttle > 0 &&
      velocity > 0
    ) {
      const thrust = maxThrust * input.throttle;
      acceleration -= thrust / mass;
      const burn = (thrust / (isp * g0)) * dt;
      const used = Math.min(fuel, burn);
      fuel -= used;
      mass = Math.max(150, mass - used);
    }

    if (
      input.skyCrane &&
      altitude <= 25 &&
      altitude > 0 &&
      velocity < 12 &&
      fuel > 0
    ) {
      push("Sky crane");
      acceleration = Math.max(acceleration, -MARS_GRAVITY - 1.2);
    }

    const previousVelocity = velocity;
    velocity += acceleration * dt;
    if (velocity < 0 && altitude > 1) {
      // The model should not tunnel below zero; clamp the final approach.
      velocity = Math.max(velocity, -2);
    }
    altitude += velocity * dt;
    t += dt;

    if (step % 4 === 0 || altitude <= 0) {
      samples.push({
        t: Number(t.toFixed(2)),
        altitude: Math.max(0, Math.round(altitude)),
        velocity: Number(velocity.toFixed(2)),
        phase,
      });
    }

    if (previousVelocity > 0 && velocity <= 0 && altitude > 50) {
      // A numerical overshoot is not a real landing; stop and evaluate.
      break;
    }
  }

  if (altitude <= 0) {
    push("Touchdown");
    samples.push({ t: Number(t.toFixed(2)), altitude: 0, velocity: Number(velocity.toFixed(2)), phase });
  }

  const touchdownSpeed = Math.abs(Math.min(velocity, input.entrySpeed));
  if (altitude > 0) {
    survived = false;
    notes.push(
      "The vehicle did not reach the surface within the model's step limit. Try a lower entry speed, a larger parachute or more propellant."
    );
  } else if (touchdownSpeed > 6) {
    survived = false;
    notes.push(
      `Touchdown speed was ${touchdownSpeed.toFixed(1)} m/s. The model treats anything above 6 m/s as a crash for a legged lander or rover.`
    );
  } else {
    notes.push(
      `Touchdown speed was ${touchdownSpeed.toFixed(1)} m/s. The model treats this as a survivable landing.`
    );
  }

  if (fuel <= 0 && altitude > 0) {
    notes.push("The retro-propellant ran out before touchdown.");
  }

  return {
    samples,
    touchdownSpeed,
    survived,
    fuelUsed: Number((input.retroPropellant - fuel).toFixed(1)),
    fuelRemaining: Number(fuel.toFixed(1)),
    phases: phasesSeen,
    outcome: survived ? "Survivable landing" : "Landing failure",
    notes,
  };
}

/* -------------------------------------------------------------------- Power */

export type PowerSource = "solar" | "rtg";

export interface PowerInput {
  source: PowerSource;
  arrayArea: number; // m^2
  arrayEfficiency: number; // 0..1
  sunHours: number; // hours of useful sunlight per sol
  dustFactor: number; // 0..1
  batteryWh: number;
  instrumentLoadW: number;
  heaterLoadW: number;
  mobilityLoadW: number;
  driveHours: number;
  rtgWatts: number;
}

export interface PowerResult {
  generationWh: number;
  consumptionWh: number;
  netWh: number;
  marginPercent: number;
  nightNeedWh: number;
  status: "healthy" | "tight" | "deficit";
  notes: string[];
}

export const defaultPowerInput: PowerInput = {
  source: "solar",
  arrayArea: 4,
  arrayEfficiency: 0.28,
  sunHours: 12,
  dustFactor: 0.85,
  batteryWh: 1_200,
  instrumentLoadW: 60,
  heaterLoadW: 40,
  mobilityLoadW: 120,
  driveHours: 2,
  rtgWatts: 110,
};

/** Mars solar irradiance at the top of the atmosphere, W/m^2, approximate. */
export const MARS_SOLAR_IRRADIANCE = 590;

export function simulatePower(input: PowerInput): PowerResult {
  const notes: string[] = [];
  const generationWh =
    input.source === "solar"
      ? input.arrayArea *
        MARS_SOLAR_IRRADIANCE *
        input.arrayEfficiency *
        input.sunHours *
        input.dustFactor
      : input.rtgWatts * 24;

  const consumptionWh =
    (input.instrumentLoadW + input.heaterLoadW) * 24 +
    input.mobilityLoadW * input.driveHours;
  const netWh = generationWh - consumptionWh;
  const marginPercent =
    consumptionWh > 0 ? (netWh / consumptionWh) * 100 : 100;
  const nightNeedWh =
    input.source === "solar"
      ? (input.instrumentLoadW + input.heaterLoadW) * Math.max(0, 24 - input.sunHours)
      : 0;

  let status: PowerResult["status"] = "healthy";
  if (netWh < 0) status = "deficit";
  else if (marginPercent < 15) status = "tight";

  if (input.source === "solar" && input.dustFactor < 0.6) {
    notes.push(
      "Dust is significantly reducing solar output. Real missions must plan for dust accumulation and seasonal sunlight."
    );
  }
  if (input.source === "solar" && nightNeedWh > input.batteryWh) {
    notes.push(
      "The battery cannot cover the modelled night-time load. Reduce the load, add battery capacity or shorten the night."
    );
    if (status === "healthy") status = "tight";
  }
  if (input.source === "rtg") {
    notes.push(
      "An RTG provides steady power independent of sunlight, but it adds mass and has its own thermal and safety constraints."
    );
  }
  if (netWh >= 0) {
    notes.push(
      `The modelled budget has ${Math.max(0, netWh).toFixed(0)} Wh of surplus per sol.`
    );
  } else {
    notes.push(
      `The modelled budget is short by ${Math.abs(netWh).toFixed(0)} Wh per sol. The mission would need to shed load or generate more power.`
    );
  }

  return {
    generationWh: Math.round(generationWh),
    consumptionWh: Math.round(consumptionWh),
    netWh: Math.round(netWh),
    marginPercent: Number(marginPercent.toFixed(1)),
    nightNeedWh: Math.round(nightNeedWh),
    status,
    notes,
  };
}

/* ------------------------------------------------------------ Communication */

export interface CommunicationTarget {
  id: string;
  label: string;
  distanceKm: number;
  note: string;
}

export const communicationTargets: CommunicationTarget[] = [
  {
    id: "moon",
    label: "The Moon",
    distanceKm: 384_400,
    note: "Average Earth–Moon distance. The actual distance varies through the month.",
  },
  {
    id: "mars",
    label: "Mars (typical)",
    distanceKm: 225_000_000,
    note: "Earth–Mars distance varies substantially as the planets orbit. This is a representative value, not a fixed number.",
  },
  {
    id: "jupiter",
    label: "Jupiter",
    distanceKm: 778_500_000,
    note: "Representative distance from the Sun; Earth–Jupiter distance varies with orbital geometry.",
  },
  {
    id: "saturn",
    label: "Saturn",
    distanceKm: 1_430_000_000,
    note: "Representative distance from the Sun; the actual Earth–spacecraft distance varies.",
  },
  {
    id: "pluto",
    label: "Pluto",
    distanceKm: 5_900_000_000,
    note: "Representative distance. New Horizons has traveled farther since its 2015 flyby.",
  },
  {
    id: "voyager-1",
    label: "Voyager 1 (approximate)",
    distanceKm: 24_700_000_000,
    note: "A rounded, time-dependent distance. Voyager 1 continues to move outward.",
  },
];

export function lightTimeSeconds(distanceKm: number): number {
  return distanceKm / LIGHT_SPEED_KM_S;
}

export function roundTripSeconds(distanceKm: number): number {
  return lightTimeSeconds(distanceKm) * 2;
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds.toFixed(1)} s`;
  if (seconds < 3_600) {
    const minutes = Math.floor(seconds / 60);
    const rest = Math.round(seconds % 60);
    return `${minutes} min ${rest} s`;
  }
  if (seconds < 86_400) {
    const hours = Math.floor(seconds / 3_600);
    const minutes = Math.round((seconds % 3_600) / 60);
    return `${hours} h ${minutes} min`;
  }
  const days = Math.floor(seconds / 86_400);
  const hours = Math.round((seconds % 86_400) / 3_600);
  return `${days} d ${hours} h`;
}

/**
 * Relative signal spreading. This is a qualitative teaching value, not a link
 * budget: it compares the area over which a signal spreads at two distances.
 */
export function relativeSignalStrength(
  distanceKm: number,
  referenceKm = 384_400
): number {
  if (distanceKm <= 0) return 0;
  return (referenceKm / distanceKm) ** 2;
}

/* -------------------------------------------------------------------- Orbit */

export interface TransferResult {
  r1Au: number;
  r2Au: number;
  v1: number; // km/s
  v2: number; // km/s
  transferPerihelionVelocity: number;
  transferAphelionVelocity: number;
  deltaV1: number;
  deltaV2: number;
  totalDeltaV: number;
  transferYears: number;
  direction: "outward" | "inward";
}

export function circularVelocity(rKm: number, mu = SUN_MU_KM3_S2): number {
  return Math.sqrt(mu / rKm);
}

export function hohmannTransfer(r1Au: number, r2Au: number): TransferResult {
  const r1 = r1Au * AU_KM;
  const r2 = r2Au * AU_KM;
  const a = (r1 + r2) / 2;
  const v1 = circularVelocity(r1);
  const v2 = circularVelocity(r2);
  const vTransfer1 = Math.sqrt(SUN_MU_KM3_S2 * (2 / r1 - 1 / a));
  const vTransfer2 = Math.sqrt(SUN_MU_KM3_S2 * (2 / r2 - 1 / a));
  const deltaV1 = Math.abs(vTransfer1 - v1);
  const deltaV2 = Math.abs(v2 - vTransfer2);
  const periodSeconds = 2 * Math.PI * Math.sqrt(a ** 3 / SUN_MU_KM3_S2);
  return {
    r1Au,
    r2Au,
    v1: Number(v1.toFixed(3)),
    v2: Number(v2.toFixed(3)),
    transferPerihelionVelocity: Number(vTransfer1.toFixed(3)),
    transferAphelionVelocity: Number(vTransfer2.toFixed(3)),
    deltaV1: Number(deltaV1.toFixed(3)),
    deltaV2: Number(deltaV2.toFixed(3)),
    totalDeltaV: Number((deltaV1 + deltaV2).toFixed(3)),
    transferYears: Number((periodSeconds / 2 / 31_557_600).toFixed(2)),
    direction: r2 > r1 ? "outward" : "inward",
  };
}

export const orbitDestinations = [
  { id: "mercury", label: "Mercury", au: 0.387 },
  { id: "venus", label: "Venus", au: 0.723 },
  { id: "earth", label: "Earth", au: 1.0 },
  { id: "mars", label: "Mars", au: 1.524 },
  { id: "jupiter", label: "Jupiter", au: 5.203 },
  { id: "saturn", label: "Saturn", au: 9.537 },
  { id: "uranus", label: "Uranus", au: 19.191 },
  { id: "neptune", label: "Neptune", au: 30.07 },
];

/* -------------------------------------------------------------------- Rover */

export interface RoverCell {
  x: number;
  y: number;
  slope: number; // degrees
  science: number; // 0..3
  label?: string;
}

export interface RoverRouteResult {
  path: RoverCell[];
  distance: number;
  energyWh: number;
  science: number;
  valid: boolean;
  message: string;
}

/**
 * A small fixed terrain used by the traverse planner. The terrain is invented
 * for teaching; it is not a map of Mars.
 */
export const roverTerrain: RoverCell[][] = Array.from({ length: 6 }, (_, y) =>
  Array.from({ length: 6 }, (_, x) => {
    const slopePattern = [2, 6, 14, 4, 9, 18, 3, 8, 22, 5, 12, 7, 1, 10, 16, 3, 6, 20, 4, 9, 13, 2, 8, 15, 5, 11, 7, 1, 14, 19, 6, 3, 12, 2, 9, 17];
    const sciencePattern = [0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0];
    const index = y * 6 + x;
    return {
      x,
      y,
      slope: slopePattern[index],
      science: sciencePattern[index],
      label: `column ${x + 1}, row ${y + 1}`,
    };
  })
);

export const roverStart = { x: 0, y: 0 };
export const roverGoal = { x: 5, y: 5 };

export function roverRouteEnergy(cells: RoverCell[]): number {
  let energy = 0;
  for (let i = 1; i < cells.length; i += 1) {
    const previous = cells[i - 1];
    const current = cells[i];
    const distance = Math.hypot(current.x - previous.x, current.y - previous.y);
    energy += distance * (4 + current.slope * 0.9);
  }
  return Math.round(energy * 10) / 10;
}

export function evaluateRoverRoute(
  cells: RoverCell[],
  budgetWh = 45
): RoverRouteResult {
  if (cells.length === 0) {
    return { path: [], distance: 0, energyWh: 0, science: 0, valid: false, message: "No route selected." };
  }
  const startsAtStart =
    cells[0].x === roverStart.x && cells[0].y === roverStart.y;
  const endsAtGoal =
    cells[cells.length - 1].x === roverGoal.x &&
    cells[cells.length - 1].y === roverGoal.y;
  const adjacent = cells.every((cell, index) => {
    if (index === 0) return true;
    const previous = cells[index - 1];
    return Math.abs(cell.x - previous.x) <= 1 && Math.abs(cell.y - previous.y) <= 1;
  });
  const unique = new Set(cells.map((cell) => `${cell.x},${cell.y}`)).size === cells.length;
  const distance = cells.length - 1;
  const energyWh = roverRouteEnergy(cells);
  const science = cells.reduce((sum, cell) => sum + cell.science, 0);

  let valid = true;
  let message = "Route accepted. Compare the energy cost with the science return.";
  if (!startsAtStart) {
    valid = false;
    message = "The route must start at the landing site (column 1, row 1).";
  } else if (!endsAtGoal) {
    valid = false;
    message = "The route must end at the target (column 6, row 6).";
  } else if (!adjacent) {
    valid = false;
    message = "Each step must move to an adjacent cell, including diagonals.";
  } else if (!unique) {
    valid = false;
    message = "The route cannot visit the same cell twice.";
  } else if (energyWh > budgetWh) {
    valid = false;
    message = `The route needs ${energyWh} Wh, above the ${budgetWh} Wh budget.`;
  }

  return { path: cells, distance, energyWh, science, valid, message };
}

/* ------------------------------------------------------------------ Planning */

export interface PlanningPart {
  id: string;
  label: string;
  massKg: number;
  powerW: number;
  science: number;
  note: string;
}

export const planningParts: PlanningPart[] = [
  { id: "camera", label: "Context camera", massKg: 8, powerW: 12, science: 1, note: "Images and terrain context." },
  { id: "spectrometer", label: "Spectrometer", massKg: 14, powerW: 18, science: 2, note: "Composition from reflected or emitted light." },
  { id: "drill", label: "Sample drill", massKg: 30, powerW: 40, science: 3, note: "Accesses material below the surface." },
  { id: "weather", label: "Weather station", massKg: 6, powerW: 8, science: 1, note: "Pressure, temperature and wind." },
  { id: "seismometer", label: "Seismometer", massKg: 12, powerW: 6, science: 2, note: "Detects ground motion and impacts." },
  { id: "mobility", label: "Mobility system", massKg: 55, powerW: 90, science: 2, note: "Lets the mission reach more than one site." },
  { id: "relay", label: "High-gain antenna", massKg: 18, powerW: 22, science: 0, note: "Improves the data return link." },
  { id: "heater", label: "Thermal control", massKg: 20, powerW: 35, science: 0, note: "Keeps electronics within operating limits." },
];

export interface PlanningInput {
  parts: string[];
  powerSource: PowerSource;
  rtgWatts: number;
  solarWatts: number;
  massLimitKg: number;
  powerLimitW: number;
}

export interface PlanningResult {
  massKg: number;
  powerW: number;
  science: number;
  massMarginKg: number;
  powerMarginW: number;
  valid: boolean;
  verdict: string;
  notes: string[];
}

export function evaluatePlan(input: PlanningInput): PlanningResult {
  const selected = planningParts.filter((part) => input.parts.includes(part.id));
  const massKg = selected.reduce((sum, part) => sum + part.massKg, 0);
  const payloadPowerW = selected.reduce((sum, part) => sum + part.powerW, 0);
  const sourcePowerW = input.powerSource === "rtg" ? input.rtgWatts : input.solarWatts;
  const science = selected.reduce((sum, part) => sum + part.science, 0);
  const massMarginKg = input.massLimitKg - massKg;
  const powerMarginW = sourcePowerW - payloadPowerW;
  const valid = massMarginKg >= 0 && powerMarginW >= 0 && science > 0;
  const notes: string[] = [];

  if (science === 0) notes.push("The plan has no science instruments. A mission needs a question to answer.");
  if (massMarginKg < 0) notes.push("The plan is over the mass limit. Remove a component or choose a smaller payload.");
  if (powerMarginW < 0) notes.push("The power source cannot supply the selected instruments at full load.");
  if (valid && science >= 6) notes.push("A strong science return within both budgets.");
  if (valid && science < 3) notes.push("The plan fits, but the science return is modest. Is there a better trade?");
  if (input.powerSource === "rtg") notes.push("An RTG provides steady power but adds a fixed mass and cost that this simplified model does not charge.");

  return {
    massKg,
    powerW: payloadPowerW,
    science,
    massMarginKg,
    powerMarginW,
    valid,
    verdict: valid ? "Design fits the budget" : "Design does not fit",
    notes,
  };
}
