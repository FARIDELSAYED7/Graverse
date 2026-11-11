/**
 * Mission Experience Lab metadata.
 *
 * Each simulator is an educational model. The `approximation` field is shown
 * in the interface so a visitor can never mistake a model output for a NASA
 * flight prediction or an observation.
 */

export type SimulationId =
  | "landing"
  | "power"
  | "communication"
  | "orbit"
  | "rover"
  | "planning"
  | "what-if"
  | "failure";

export interface SimulationDefinition {
  id: SimulationId;
  number: string;
  title: string;
  tagline: string;
  description: string;
  objectives: string[];
  concepts: string[];
  href: string;
  accent: string;
  artifactIds: string[];
  sourceIds: string[];
  approximation: string;
}

export const simulations: SimulationDefinition[] = [
  {
    id: "landing",
    number: "S01",
    title: "Mars landing sequence",
    tagline: "Heat shield, parachute, powered descent, touchdown.",
    description:
      "Adjust entry conditions and landing hardware, then watch a simplified altitude and velocity profile. Learn why the atmosphere helps — and why it is not enough on its own.",
    objectives: [
      "Order the stages of a Mars entry, descent and landing sequence.",
      "Explain why a parachute alone cannot deliver a heavy rover.",
      "Compare a retro-rocket landing with a sky-crane architecture.",
    ],
    concepts: ["Atmospheric drag", "Ballistic coefficient", "Propellant mass", "Terminal descent"],
    href: "/simulations/landing",
    accent: "#f08a6a",
    artifactIds: ["viking-1-lander", "mars-pathfinder-lander", "curiosity", "perseverance", "mars-2020-descent-stage"],
    sourceIds: ["SRC-VIKING", "SRC-MARS-PATHFINDER", "SRC-CURIOSITY", "SRC-PERSEVERANCE"],
    approximation:
      "A one-dimensional educational model. It uses a simplified exponential atmosphere and constant gravity; it is not a NASA trajectory simulation.",
  },
  {
    id: "power",
    number: "S02",
    title: "Spacecraft power budget",
    tagline: "Balance generation, storage and instrument load.",
    description:
      "Choose a power source, size the array, add instruments and see whether the mission survives a Martian day and night. Compare a solar rover with an RTG-powered laboratory.",
    objectives: [
      "Build a daily energy budget in watt-hours.",
      "Explain how dust and latitude reduce solar output.",
      "Compare solar and radioisotope power for a long mission.",
    ],
    concepts: ["Energy", "Power", "Duty cycle", "Margins", "Solar irradiance"],
    href: "/simulations/power",
    accent: "#f2b33d",
    artifactIds: ["spirit", "opportunity", "curiosity", "perseverance"],
    sourceIds: ["SRC-SPIRIT", "SRC-OPPORTUNITY", "SRC-CURIOSITY", "SRC-PERSEVERANCE-SPEC"],
    approximation:
      "An energy-bookkeeping exercise with representative values. Real spacecraft power systems include thermal control, degradation, battery limits and operational constraints that this model simplifies.",
  },
  {
    id: "communication",
    number: "S03",
    title: "Signal across the solar system",
    tagline: "Light time, distance and the cost of a reply.",
    description:
      "Pick a destination, send a command and see how long the round trip takes. Compare a direct link with a relay and explore why deep-space communication needs large antennas.",
    objectives: [
      "Calculate one-way and round-trip light time.",
      "Explain why a rover may use an orbiter relay.",
      "Describe how distance weakens a radio signal.",
    ],
    concepts: ["Speed of light", "Light time", "Inverse-square spreading", "Relay geometry"],
    href: "/simulations/communication",
    accent: "#7dd3fc",
    artifactIds: ["voyager-1", "voyager-2", "new-horizons", "perseverance", "apollo-11-lrrr"],
    sourceIds: ["SRC-VOYAGER-1", "SRC-VOYAGER-2", "SRC-NEW-HORIZONS", "SRC-PERSEVERANCE"],
    approximation:
      "Distances are representative values from the collection and public fact sheets. Light time is computed from distance; link strength is a qualitative comparison, not a link-budget prediction.",
  },
  {
    id: "orbit",
    number: "S04",
    title: "Orbital mechanics lab",
    tagline: "Change an orbit with a burn — and pay for it.",
    description:
      "Move a spacecraft between two circular orbits with a simplified Hohmann transfer. See the velocity changes, the transfer time and why planetary alignments matter.",
    objectives: [
      "Explain what a Hohmann transfer is.",
      "Compare the cost of raising an orbit with the cost of a plane change.",
      "Connect transfer windows to real mission launch dates.",
    ],
    concepts: ["Delta-v", "Transfer orbit", "Period", "Vis-viva equation", "Launch window"],
    href: "/simulations/orbit",
    accent: "#c3a6ff",
    artifactIds: ["voyager-1", "new-horizons", "cassini", "lunar-prospector"],
    sourceIds: ["SRC-NASA-PLANETARY-FACTS", "SRC-VOYAGER-1", "SRC-NEW-HORIZONS", "SRC-CASSINI"],
    approximation:
      "An idealised two-impulse Hohmann transfer around a point-mass Sun. It ignores inclination changes, planetary gravity assists, atmospheric drag and finite burn duration.",
  },
  {
    id: "rover",
    number: "S05",
    title: "Rover traverse planner",
    tagline: "Reach the science target without running out of energy.",
    description:
      "Plan a route across a simplified terrain grid. Balance distance, slope, battery and science value, then compare your plan with a safer or more ambitious route.",
    objectives: [
      "Explain why rover drivers plan in sols, not minutes.",
      "Balance energy, terrain risk and science return.",
      "Recognise when a shorter route is not the safest route.",
    ],
    concepts: ["Traverse planning", "Slope", "Energy per metre", "Risk", "Science priority"],
    href: "/simulations/rover",
    accent: "#55c99a",
    artifactIds: ["spirit", "opportunity", "curiosity", "perseverance"],
    sourceIds: ["SRC-SPIRIT", "SRC-OPPORTUNITY", "SRC-CURIOSITY", "SRC-PERSEVERANCE"],
    approximation:
      "A grid-based educational game with invented terrain. The terrain is not a map of Mars and the energy values are illustrative, not rover specifications.",
  },
  {
    id: "planning",
    number: "S06",
    title: "Mission planning desk",
    tagline: "Fit the science inside the mass and power budget.",
    description:
      "Choose a destination, power source and instrument suite under a mass and energy limit. Discover why mission design is a negotiation between science and engineering.",
    objectives: [
      "Allocate a finite mass and power budget.",
      "Explain trade-offs between payload, mobility and lifetime.",
      "Justify a design against a scientific question.",
    ],
    concepts: ["Mass budget", "Power budget", "Payload", "Margin", "Requirements"],
    href: "/simulations/planning",
    accent: "#fbbf24",
    artifactIds: ["mars-pathfinder-lander", "curiosity", "perseverance", "voyager-1"],
    sourceIds: ["SRC-MARS-PATHFINDER", "SRC-CURIOSITY", "SRC-PERSEVERANCE", "SRC-VOYAGER-1"],
    approximation:
      "Budget values are simplified for teaching. They are not the actual mass or power specifications of the linked missions.",
  },
  {
    id: "what-if",
    number: "S07",
    title: "What if? lab",
    tagline: "Change one documented condition and explore the consequence.",
    description:
      "Choose a real mission event, change a condition such as dust or communication delay, and read a clearly labelled hypothetical outcome. The real record stays visible beside the scenario.",
    objectives: [
      "Separate a documented event from a hypothetical variation.",
      "Identify which conditions most affect a mission.",
      "Explain why counterfactual reasoning needs evidence.",
    ],
    concepts: ["Counterfactual", "Sensitivity", "Uncertainty", "Evidence"],
    href: "/simulations/what-if",
    accent: "#f08a6a",
    artifactIds: ["opportunity", "insight", "spirit", "phoenix"],
    sourceIds: ["SRC-OPPORTUNITY", "SRC-INSIGHT", "SRC-SPIRIT", "SRC-PHOENIX"],
    approximation:
      "Every outcome in this lab is a hypothetical scenario, not a historical claim. The real mission record is shown separately and is never altered by the scenario.",
  },
  {
    id: "failure",
    number: "S08",
    title: "Failure investigation",
    tagline: "Read the evidence before naming a cause.",
    description:
      "Investigate documented mission endings using the record's own evidence. Choose a hypothesis, compare it with the source wording and learn why 'lost contact' is not the same as 'destroyed'.",
    objectives: [
      "Distinguish observation from interpretation.",
      "Use source wording to test a hypothesis.",
      "Explain why uncertainty should be preserved.",
    ],
    concepts: ["Evidence", "Hypothesis", "Root cause", "Uncertainty", "Status separation"],
    href: "/simulations/failure",
    accent: "#f17d83",
    artifactIds: ["opportunity", "insight", "ingenuity", "cassini", "mars-2020-descent-stage"],
    sourceIds: ["SRC-OPPORTUNITY", "SRC-INSIGHT", "SRC-INGENUITY", "SRC-CASSINI", "SRC-PERSEVERANCE"],
    approximation:
      "The evidence panels quote the collection's recorded status wording. The investigation exercise does not claim to reproduce an official accident investigation.",
  },
];

export function getSimulation(id: string): SimulationDefinition | undefined {
  return simulations.find((simulation) => simulation.id === id);
}
