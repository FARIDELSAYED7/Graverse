/**
 * Rover build model for the Academy Engineering Lab.
 *
 * The numbers are teaching values chosen so that trade-offs are visible. They
 * are not the mass or power specifications of any real rover. The interface
 * must show that limitation next to the result.
 */

export type RoverCategory =
  | "wheels"
  | "power"
  | "instrument"
  | "communication"
  | "thermal";

export interface RoverPart {
  id: string;
  category: RoverCategory;
  label: string;
  massKg: number;
  powerW: number;
  science: number;
  mobility: number;
  reliability: number;
  note: string;
}

export interface RoverBuild {
  wheels: string;
  power: string;
  instruments: string[];
  communication: string;
  thermal: string;
}

export interface RoverBuildResult {
  massKg: number;
  powerW: number;
  science: number;
  mobility: number;
  reliability: number;
  valid: boolean;
  score: number;
  verdict: string;
  notes: string[];
}

export const ROVER_MASS_LIMIT_KG = 120;
export const ROVER_POWER_LIMIT_W = 100;

export const roverParts: RoverPart[] = [
  {
    id: "wheels-small",
    category: "wheels",
    label: "Small wheels",
    massKg: 6,
    powerW: 8,
    science: 0,
    mobility: 1,
    reliability: 1,
    note: "Light and efficient, but limited on rough or steep terrain.",
  },
  {
    id: "wheels-medium",
    category: "wheels",
    label: "Medium wheels",
    massKg: 10,
    powerW: 14,
    science: 0,
    mobility: 2,
    reliability: 2,
    note: "A balance between mass, grip and energy use.",
  },
  {
    id: "wheels-large",
    category: "wheels",
    label: "Large wheels",
    massKg: 16,
    powerW: 22,
    science: 0,
    mobility: 3,
    reliability: 2,
    note: "Better on rocks and slopes, at the cost of mass and power.",
  },
  {
    id: "power-solar",
    category: "power",
    label: "Solar array",
    massKg: 8,
    powerW: -55,
    science: 0,
    mobility: 0,
    reliability: 1,
    note: "Generates electricity from sunlight. Dust and winter reduce output.",
  },
  {
    id: "power-rtg",
    category: "power",
    label: "Radioisotope power",
    massKg: 22,
    powerW: -90,
    science: 0,
    mobility: 0,
    reliability: 3,
    note: "Steady power independent of sunlight, but heavier and more complex.",
  },
  {
    id: "instrument-camera",
    category: "instrument",
    label: "Context camera",
    massKg: 4,
    powerW: 8,
    science: 2,
    mobility: 0,
    reliability: 0,
    note: "Images and terrain context.",
  },
  {
    id: "instrument-spectrometer",
    category: "instrument",
    label: "Spectrometer",
    massKg: 6,
    powerW: 10,
    science: 2,
    mobility: 0,
    reliability: 0,
    note: "Infers composition from light.",
  },
  {
    id: "instrument-drill",
    category: "instrument",
    label: "Sample drill",
    massKg: 12,
    powerW: 18,
    science: 3,
    mobility: 0,
    reliability: 0,
    note: "Reaches material below the surface.",
  },
  {
    id: "instrument-weather",
    category: "instrument",
    label: "Weather station",
    massKg: 3,
    powerW: 5,
    science: 1,
    mobility: 0,
    reliability: 0,
    note: "Measures pressure, temperature and wind.",
  },
  {
    id: "instrument-seismometer",
    category: "instrument",
    label: "Seismometer",
    massKg: 5,
    powerW: 4,
    science: 2,
    mobility: 0,
    reliability: 0,
    note: "Detects ground motion and impacts.",
  },
  {
    id: "communication-low",
    category: "communication",
    label: "Low-gain antenna",
    massKg: 3,
    powerW: 6,
    science: 0,
    mobility: 0,
    reliability: 1,
    note: "Simple and light, with a modest data rate.",
  },
  {
    id: "communication-high",
    category: "communication",
    label: "High-gain antenna",
    massKg: 7,
    powerW: 12,
    science: 0,
    mobility: 0,
    reliability: 2,
    note: "More data, but pointing requirements are stricter.",
  },
  {
    id: "communication-relay",
    category: "communication",
    label: "Orbiter relay radio",
    massKg: 9,
    powerW: 15,
    science: 0,
    mobility: 0,
    reliability: 3,
    note: "Uses an orbiter overhead for a stronger link.",
  },
  {
    id: "thermal-passive",
    category: "thermal",
    label: "Passive thermal control",
    massKg: 2,
    powerW: 0,
    science: 0,
    mobility: 0,
    reliability: 1,
    note: "Coatings and insulation. Light, but limited in extreme cold.",
  },
  {
    id: "thermal-heater",
    category: "thermal",
    label: "Radioisotope heater units",
    massKg: 8,
    powerW: 20,
    science: 0,
    mobility: 0,
    reliability: 3,
    note: "Keeps electronics warm through cold nights.",
  },
];

export const defaultRoverBuild: RoverBuild = {
  wheels: "wheels-medium",
  power: "power-solar",
  instruments: ["instrument-camera", "instrument-spectrometer"],
  communication: "communication-high",
  thermal: "thermal-passive",
};

export function getRoverPart(id: string): RoverPart | undefined {
  return roverParts.find((part) => part.id === id);
}

export function partsByCategory(category: RoverCategory): RoverPart[] {
  return roverParts.filter((part) => part.category === category);
}

export function selectedRoverParts(build: RoverBuild): RoverPart[] {
  const ids = [
    build.wheels,
    build.power,
    ...build.instruments,
    build.communication,
    build.thermal,
  ];
  return ids
    .map((id) => getRoverPart(id))
    .filter((part): part is RoverPart => Boolean(part));
}

export function evaluateRoverBuild(build: RoverBuild): RoverBuildResult {
  const selected = selectedRoverParts(build);
  const massKg = selected.reduce((sum, part) => sum + part.massKg, 0);
  const powerW = selected.reduce((sum, part) => sum + part.powerW, 0);
  const science = selected.reduce((sum, part) => sum + part.science, 0);
  const mobility = selected.reduce((sum, part) => sum + part.mobility, 0);
  const reliability = selected.reduce((sum, part) => sum + part.reliability, 0);
  const notes: string[] = [];

  const hasPower = build.power === "power-solar" || build.power === "power-rtg";
  const hasWheels = build.wheels.startsWith("wheels-");
  const hasCommunication = build.communication.startsWith("communication-");
  const hasThermal = build.thermal.startsWith("thermal-");

  if (!hasPower) notes.push("The rover has no power source.");
  if (!hasWheels) notes.push("The rover has no mobility system.");
  if (!hasCommunication) notes.push("The rover has no way to send data home.");
  if (!hasThermal) notes.push("The rover has no thermal control.");
  if (build.instruments.length === 0) {
    notes.push("The rover carries no science instrument, so it has no question to answer.");
  }
  if (massKg > ROVER_MASS_LIMIT_KG) {
    notes.push(
      `The build is ${massKg - ROVER_MASS_LIMIT_KG} kg over the ${ROVER_MASS_LIMIT_KG} kg launch limit.`
    );
  }
  if (powerW > ROVER_POWER_LIMIT_W) {
    notes.push(
      `The instruments need ${powerW} W, above the ${ROVER_POWER_LIMIT_W} W supply.`
    );
  }

  const valid =
    hasPower &&
    hasWheels &&
    hasCommunication &&
    hasThermal &&
    build.instruments.length > 0 &&
    massKg <= ROVER_MASS_LIMIT_KG &&
    powerW <= ROVER_POWER_LIMIT_W;

  const scienceScore = Math.min(30, science * 5);
  const mobilityScore = Math.min(20, mobility * 7);
  const reliabilityScore = Math.min(25, reliability * 4);
  const marginMass = Math.max(0, ROVER_MASS_LIMIT_KG - massKg);
  const marginPower = Math.max(0, ROVER_POWER_LIMIT_W - powerW);
  const marginScore = Math.min(
    25,
    Math.round(marginMass * 0.15 + marginPower * 0.15)
  );
  const score = valid
    ? Math.min(100, scienceScore + mobilityScore + reliabilityScore + marginScore)
    : Math.max(0, Math.round((scienceScore + mobilityScore + reliabilityScore) * 0.4));

  if (valid && science >= 6) {
    notes.push("A strong science return within both limits.");
  } else if (valid && science < 3) {
    notes.push("The rover fits, but the science return is modest.");
  }
  if (valid && marginMass < 5) {
    notes.push("Mass margin is very small. Real missions usually keep a reserve.");
  }
  if (valid && marginPower < 5) {
    notes.push("Power margin is very small. A cold or dusty sol could be a problem.");
  }

  return {
    massKg,
    powerW,
    science,
    mobility,
    reliability,
    valid,
    score,
    verdict: valid ? "Build fits the limits" : "Build does not fit the limits",
    notes,
  };
}
