import type { Journey } from "@/types/academy";

/**
 * Four MVP journeys. A journey is the Academy's primary unit; lessons,
 * artifacts and challenges are steps inside it.
 */
export const journeys: Journey[] = [
  {
    id: "first-flight",
    title: "First Flight",
    ageBand: "5-7",
    promise: "Meet the machines that first left Earth and landed on the Moon.",
    minutes: 25,
    summary:
      "A gentle introduction to space hardware for the youngest explorers: one big idea per step, with pictures and a short quiz.",
    accent: "#FF6B5A",
    badge: {
      id: "badge-first-flight",
      name: "First Flight",
      description: "Completed the First Flight journey.",
    },
    steps: [
      {
        id: "first-flight-what",
        title: "What is a space artifact?",
        kind: "lesson",
        description: "A machine with a story, and the difference between a mission and its hardware.",
        href: "/academy/lessons/what-is-an-artifact",
      },
      {
        id: "first-flight-moon",
        title: "Our neighbor, the Moon",
        kind: "lesson",
        description: "Craters, moonlight and the first people on another world.",
        href: "/academy/lessons/our-neighbor-the-moon",
      },
      {
        id: "first-flight-eagle",
        title: "Visit the Eagle's descent stage",
        kind: "artifact",
        description: "The part of Apollo 11's lunar module that stayed on the Moon.",
        href: "/museum/apollo-11-lm-descent-stage",
      },
      {
        id: "first-flight-rocket",
        title: "How a rocket leaves Earth",
        kind: "lesson",
        description: "Push, thrust and why rockets drop their empty stages.",
        href: "/academy/lessons/how-rockets-leave-earth",
      },
      {
        id: "first-flight-check",
        title: "Mission check",
        kind: "challenge",
        description: "Answer two questions about artifacts and the Moon.",
        href: "/academy/lessons/what-is-an-artifact#quiz",
      },
    ],
    sourceIds: ["SRC-NASA-MOON", "SRC-RANGER-7", "SRC-NASA-APOLLO-15"],
  },
  {
    id: "moon-detectives",
    title: "Moon Detectives",
    ageBand: "8-9",
    promise: "Follow the clues left by six Apollo landings and the robots that came before them.",
    minutes: 35,
    summary:
      "Read the surface like a detective: impact craters, experiment packages, rover tracks and the evidence each one left behind.",
    accent: "#14B8A6",
    badge: {
      id: "badge-moon-detectives",
      name: "Moon Detective",
      description: "Completed the Moon Detectives journey.",
    },
    steps: [
      {
        id: "moon-detectives-timeline",
        title: "Reading a mission timeline",
        kind: "lesson",
        description: "Launch, arrival, operations and last contact.",
        href: "/academy/lessons/reading-a-mission-timeline",
      },
      {
        id: "moon-detectives-ranger",
        title: "Ranger 7's final picture",
        kind: "artifact",
        description: "The impact probe that sent back the first close-up lunar images.",
        href: "/museum/ranger-7",
      },
      {
        id: "moon-detectives-lrrr",
        title: "A mirror still in use",
        kind: "artifact",
        description: "Apollo 11's retroreflector and the laser ranging experiment.",
        href: "/museum/apollo-11-lrrr",
      },
      {
        id: "moon-detectives-moon",
        title: "The Moon as a laboratory",
        kind: "article",
        description: "How instruments left on the surface kept returning data.",
        href: "/academy/articles/the-moon-as-a-laboratory",
      },
      {
        id: "moon-detectives-museum",
        title: "Compare four Moon artifacts",
        kind: "challenge",
        description: "A rover, a lander, an experiment package and an impact probe.",
        href: "/explorer?mode=artifacts&destination=moon",
      },
      {
        id: "moon-detectives-check",
        title: "Detective check",
        kind: "challenge",
        description: "Explain why mission status and hardware status can differ.",
        href: "/academy/lessons/mission-status-vs-hardware-status#quiz",
      },
    ],
    sourceIds: ["SRC-NASA-MOON", "SRC-RANGER-7", "SRC-NSSDCA-APOLLO-11-LRRR", "SRC-NASA-APOLLO-15"],
  },
  {
    id: "mission-engineer",
    title: "Mission Engineer",
    ageBand: "10-12",
    promise: "Design for heat, dust, distance and the impossibility of repair.",
    minutes: 45,
    summary:
      "An engineering-focused journey through power, landing systems, redundancy and the trade-offs behind real missions.",
    accent: "#F5A524",
    badge: {
      id: "badge-mission-engineer",
      name: "Mission Engineer",
      description: "Completed the Mission Engineer journey.",
    },
    steps: [
      {
        id: "engineer-status",
        title: "Mission status vs hardware status",
        kind: "lesson",
        description: "The distinction that shapes the entire archive.",
        href: "/academy/lessons/mission-status-vs-hardware-status",
      },
      {
        id: "engineer-engineering",
        title: "Engineering for another world",
        kind: "lesson",
        description: "Power, redundancy and the descent sequence.",
        href: "/academy/lessons/engineering-for-another-world",
      },
      {
        id: "engineer-perseverance",
        title: "Perseverance and the sky crane",
        kind: "artifact",
        description: "A landing sequence with no second chance.",
        href: "/museum/perseverance",
      },
      {
        id: "engineer-insight",
        title: "InSight: a stationary seismometer",
        kind: "artifact",
        description: "What a lander can do that a rover cannot.",
        href: "/museum/insight",
      },
      {
        id: "engineer-rovers",
        title: "What Mars rovers look for",
        kind: "article",
        description: "Habitability, chemistry and cached samples.",
        href: "/academy/articles/what-mars-rovers-look-for",
      },
      {
        id: "engineer-check",
        title: "Engineering check",
        kind: "challenge",
        description: "Answer the quiz on power and redundancy.",
        href: "/academy/lessons/engineering-for-another-world#quiz",
      },
    ],
    sourceIds: ["SRC-NASA-MARS-2020", "SRC-NASA-CURIOSITY", "SRC-NASA-VOYAGER"],
  },
  {
    id: "rock-to-rover",
    title: "Rock to Rover",
    ageBand: "8-9",
    promise: "From a rock in a laboratory to a rover on Mars — how evidence becomes exploration.",
    minutes: 40,
    summary:
      "A cross-experience journey linking lunar samples, Mars geology, rover engineering and the Explorer's destination maps.",
    accent: "#A78BFA",
    badge: {
      id: "badge-rock-to-rover",
      name: "Rock to Rover",
      description: "Completed the Rock to Rover journey.",
    },
    steps: [
      {
        id: "rock-mars",
        title: "Why Mars is red",
        kind: "lesson",
        description: "Iron oxide, ancient water and the limits of the evidence.",
        href: "/academy/lessons/why-mars-is-red",
      },
      {
        id: "rock-sojourner",
        title: "Sojourner, the first Mars rover",
        kind: "artifact",
        description: "A small rover that began a new era of surface exploration.",
        href: "/museum/sojourner",
      },
      {
        id: "rock-curiosity",
        title: "Curiosity in Gale Crater",
        kind: "artifact",
        description: "A laboratory on wheels reading layered rocks.",
        href: "/museum/curiosity",
      },
      {
        id: "rock-perseverance",
        title: "Perseverance in Jezero Crater",
        kind: "artifact",
        description: "A rover caching samples for a possible return to Earth.",
        href: "/museum/perseverance",
      },
      {
        id: "rock-explorer",
        title: "Explore Mars by destination",
        kind: "body",
        description: "See the planet, its moons and every linked artifact.",
        href: "/explorer/bodies/mars",
      },
      {
        id: "rock-check",
        title: "Science check",
        kind: "challenge",
        description: "Separate evidence of water from evidence of life.",
        href: "/academy/lessons/why-mars-is-red#quiz",
      },
    ],
    sourceIds: ["SRC-NASA-MARS", "SRC-NASA-PATHFINDER", "SRC-NASA-CURIOSITY", "SRC-NASA-MARS-2020"],
  },
];

export const journeyMap = new Map(journeys.map((journey) => [journey.id, journey]));

export function getJourney(id: string) {
  return journeyMap.get(id);
}
