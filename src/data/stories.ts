/**
 * Editorial story collections.
 *
 * Every section is a way of reading records that already exist in the
 * collection. The prose does not introduce new dates, locations, statuses or
 * discoveries; it points back to the source-linked artifact pages.
 */

export interface StorySection {
  heading: string;
  paragraphs: string[];
  artifactIds: string[];
}

export interface StoryCollection {
  id: string;
  title: string;
  eyebrow: string;
  dek: string;
  summary: string;
  accent: string;
  artifactIds: string[];
  sourceIds: string[];
  sections: StorySection[];
}

export const storyCollections: StoryCollection[] = [
  {
    id: "first-machines-on-the-moon",
    title: "The first machines on the Moon",
    eyebrow: "First contact",
    dek: "Before footprints, there were impact probes, soft landers and experiment packages.",
    summary:
      "A short history of the robotic hardware that reached the Moon before and alongside the Apollo crews.",
    accent: "#9cc7ee",
    artifactIds: [
      "ranger-7",
      "surveyor-1",
      "surveyor-3",
      "apollo-11-lm-descent-stage",
      "apollo-11-lrrr",
      "apollo-12-alsep",
    ],
    sourceIds: ["SRC-RANGER-7", "SRC-SURVEYOR-1", "SRC-SURVEYOR-3", "SRC-APOLLO-11", "SRC-APOLLO-12"],
    sections: [
      {
        heading: "Ranger: the first close-up",
        paragraphs: [
          "Ranger 7 was built to do something simple and dangerous: fly into the Moon while sending back pictures. It returned the first close-up images of the lunar surface before impact.",
          "Its fate is recorded as an impact. That is not a failure of the machine; it was the mission design.",
        ],
        artifactIds: ["ranger-7"],
      },
      {
        heading: "Surveyor: a soft landing",
        paragraphs: [
          "Surveyor 1 and Surveyor 3 demonstrated that a spacecraft could land softly on the Moon and operate there. Surveyor 3 is also part of a later story: Apollo 12 astronauts visited its landing site and brought pieces of the spacecraft home.",
          "The collection keeps the lander and the later human visit as connected records rather than flattening them into one event.",
        ],
        artifactIds: ["surveyor-1", "surveyor-3"],
      },
      {
        heading: "What Apollo left behind",
        paragraphs: [
          "The Apollo lunar modules were not designed to return their descent stages to Earth. The descent stage stayed on the surface. The lunar retroreflectors and the Apollo Lunar Surface Experiments Packages were deployed around the landing sites.",
          "The retroreflectors are passive: they do not transmit. They return a laser pulse sent from Earth, which is why they can still be used long after the mission ended.",
        ],
        artifactIds: ["apollo-11-lm-descent-stage", "apollo-11-lrrr", "apollo-12-alsep"],
      },
    ],
  },
  {
    id: "evolution-of-mars-rovers",
    title: "The evolution of Mars rovers",
    eyebrow: "Five machines, one planet",
    dek: "From a microwave-sized demonstrator to a mobile laboratory that caches samples.",
    summary:
      "How the Mars rover went from a short technology experiment to a long-lived field scientist.",
    accent: "#f08a6a",
    artifactIds: ["sojourner", "spirit", "opportunity", "curiosity", "perseverance"],
    sourceIds: ["SRC-MARS-PATHFINDER", "SRC-SPIRIT", "SRC-OPPORTUNITY", "SRC-CURIOSITY", "SRC-PERSEVERANCE"],
    sections: [
      {
        heading: "Sojourner: prove the idea",
        paragraphs: [
          "Sojourner was small, solar-powered and slow, and it was never meant to be a long-duration explorer. It proved that a rover could leave a lander and move around on Mars.",
        ],
        artifactIds: ["sojourner"],
      },
      {
        heading: "Spirit and Opportunity: field geologists",
        paragraphs: [
          "The Mars Exploration Rovers were designed for longer traverses and a much larger scientific payload. Both outlived their planned missions by years. Their records show that a mission can be complete while the hardware's story continues for a long time.",
          "The two rovers also show that identical designs can have very different fates. Their records are kept separate for that reason.",
        ],
        artifactIds: ["spirit", "opportunity"],
      },
      {
        heading: "Curiosity and Perseverance: laboratories",
        paragraphs: [
          "Curiosity and Perseverance are much heavier and carry radioisotope power systems and complex instrument suites. Perseverance also collects and caches samples for a possible future return.",
          "Bigger is not automatically better. It is a response to new questions that need more power, more instruments and more mobility.",
        ],
        artifactIds: ["curiosity", "perseverance"],
      },
    ],
  },
  {
    id: "journey-beyond-the-solar-system",
    title: "The journey beyond the solar system",
    eyebrow: "Interstellar",
    dek: "Four probes that kept traveling after their planetary encounters were over.",
    summary:
      "Pioneer and Voyager are not abandoned hardware on a surface. They are spacecraft still moving through interstellar space.",
    accent: "#5eead4",
    artifactIds: ["pioneer-10", "pioneer-11", "voyager-1", "voyager-2", "new-horizons"],
    sourceIds: ["SRC-PIONEER-10", "SRC-PIONEER-11", "SRC-VOYAGER-1", "SRC-VOYAGER-2", "SRC-NEW-HORIZONS"],
    sections: [
      {
        heading: "Pioneer: the first outbound",
        paragraphs: [
          "Pioneer 10 and Pioneer 11 explored the outer solar system and then continued outward. The collection records them as no longer communicating, not as destroyed.",
        ],
        artifactIds: ["pioneer-10", "pioneer-11"],
      },
      {
        heading: "Voyager: the grand tour",
        paragraphs: [
          "Voyager 1 and Voyager 2 used a rare planetary alignment to tour the outer planets. Both later crossed into interstellar space and both remain in the collection as operating spacecraft.",
          "They are the clearest example of why GRAVERSE separates 'hardware left at a destination' from 'spacecraft still in transit'.",
        ],
        artifactIds: ["voyager-1", "voyager-2"],
      },
      {
        heading: "New Horizons: a different target",
        paragraphs: [
          "New Horizons was not part of the original Grand Tour. It was built to reach Pluto and later flew past a Kuiper Belt object. Its record shows how a mission can be designed around a single, distant target.",
        ],
        artifactIds: ["new-horizons"],
      },
    ],
  },
  {
    id: "forgotten-spacecraft",
    title: "Forgotten spacecraft",
    eyebrow: "Left behind",
    dek: "Hardware that did its job, then became part of the landscape.",
    summary:
      "A reading list of records that are easy to miss because their missions ended quietly.",
    accent: "#c3a6ff",
    artifactIds: ["surveyor-1", "viking-2-lander", "pioneer-11", "lunar-prospector", "lcross", "phoenix", "insight"],
    sourceIds: ["SRC-SURVEYOR-1", "SRC-NSSDCA-VIKING-2", "SRC-PIONEER-11", "SRC-LUNAR-PROSPECTOR", "SRC-LCROSS", "SRC-PHOENIX", "SRC-INSIGHT"],
    sections: [
      {
        heading: "Quiet endings",
        paragraphs: [
          "Not every mission ends with a dramatic announcement. Some landers simply stop answering. Some orbiters are deliberately targeted at the surface. Some spacecraft are left in a safe configuration.",
          "The records in this collection use the original status wording alongside the normalized label, so a quiet ending is not rewritten as a failure.",
        ],
        artifactIds: ["surveyor-1", "viking-2-lander", "phoenix"],
      },
      {
        heading: "Deliberate impacts",
        paragraphs: [
          "Lunar Prospector and LCROSS were both deliberately sent into the Moon at the end of their missions. Their impact records are part of the science story, not an accident report.",
        ],
        artifactIds: ["lunar-prospector", "lcross"],
      },
      {
        heading: "The last signal",
        paragraphs: [
          "Pioneer 11 and InSight are examples of hardware that stopped communicating after long service. The collection distinguishes loss of contact from confirmed destruction.",
        ],
        artifactIds: ["pioneer-11", "insight"],
      },
    ],
  },
  {
    id: "machines-still-working",
    title: "Machines that are still working",
    eyebrow: "Still on the job",
    dek: "Not every artifact in a museum is finished.",
    summary:
      "The collection includes operating spacecraft and passive instruments alongside records of missions that ended decades ago.",
    accent: "#55c99a",
    artifactIds: ["voyager-1", "voyager-2", "new-horizons", "curiosity", "perseverance", "apollo-11-lrrr", "apollo-15-lrrr"],
    sourceIds: ["SRC-VOYAGER-1", "SRC-VOYAGER-2", "SRC-NEW-HORIZONS", "SRC-CURIOSITY", "SRC-PERSEVERANCE", "SRC-LRRR"],
    sections: [
      {
        heading: "Active spacecraft",
        paragraphs: [
          "Voyager 1, Voyager 2, New Horizons, Curiosity and Perseverance are recorded as operating. That label is a snapshot verified on the date shown on each record, not a live telemetry feed.",
        ],
        artifactIds: ["voyager-1", "voyager-2", "new-horizons", "curiosity", "perseverance"],
      },
      {
        heading: "Passive instruments",
        paragraphs: [
          "The Apollo lunar retroreflectors do not have a power source or a transmitter. They are still useful because they reflect laser pulses sent from Earth. Calling them 'operating' means the hardware still performs its function, not that it is sending data on its own.",
        ],
        artifactIds: ["apollo-11-lrrr", "apollo-15-lrrr"],
      },
    ],
  },
  {
    id: "evolution-of-space-communication",
    title: "The evolution of space communication",
    eyebrow: "Hearing from far away",
    dek: "From direct radio links to orbiter relays and the Deep Space Network.",
    summary:
      "How the distance to a spacecraft changes what engineers can build and what scientists can send home.",
    accent: "#7dd3fc",
    artifactIds: ["voyager-1", "voyager-2", "new-horizons", "perseverance", "apollo-11-lrrr"],
    sourceIds: ["SRC-VOYAGER-1", "SRC-VOYAGER-2", "SRC-NEW-HORIZONS", "SRC-PERSEVERANCE", "SRC-LRRR"],
    sections: [
      {
        heading: "Distance is the first constraint",
        paragraphs: [
          "A signal takes time to travel, and it spreads out as it goes. The farther away a spacecraft is, the larger the antenna and the more careful the pointing have to be.",
          "The communication simulator uses real distances from the collection and computes light time. It labels the result as a calculation, not an observation.",
        ],
        artifactIds: ["voyager-1", "new-horizons"],
      },
      {
        heading: "Relay networks",
        paragraphs: [
          "A rover can talk directly to Earth, but an orbiter overhead often has a better view and a stronger link. Relay architecture is a system design choice, not a single antenna.",
        ],
        artifactIds: ["perseverance"],
      },
      {
        heading: "Passive returns",
        paragraphs: [
          "The lunar retroreflectors show that communication can be a two-way measurement rather than a transmission. A laser pulse goes out, and a reflection comes back.",
        ],
        artifactIds: ["apollo-11-lrrr"],
      },
    ],
  },
  {
    id: "machines-that-changed-planetary-science",
    title: "The machines that changed planetary science",
    eyebrow: "Knowledge",
    dek: "Records where the hardware changed what humanity could ask about another world.",
    summary:
      "A source-linked tour of missions whose instruments and observations reshaped planetary science.",
    accent: "#f2b33d",
    artifactIds: ["viking-1-lander", "mars-pathfinder-lander", "opportunity", "curiosity", "cassini", "new-horizons"],
    sourceIds: ["SRC-VIKING", "SRC-MARS-PATHFINDER", "SRC-OPPORTUNITY", "SRC-CURIOSITY", "SRC-CASSINI", "SRC-NEW-HORIZONS"],
    sections: [
      {
        heading: "First images, first chemistry",
        paragraphs: [
          "Viking returned the first images from the Martian surface and ran the first biology experiments there. The results were ambiguous, and the record says so.",
        ],
        artifactIds: ["viking-1-lander"],
      },
      {
        heading: "Water and habitability",
        paragraphs: [
          "Opportunity and Curiosity both contributed evidence about past water and environmental conditions on Mars. Their records describe the contributions without turning every result into a single headline.",
        ],
        artifactIds: ["opportunity", "curiosity"],
      },
      {
        heading: "The outer solar system",
        paragraphs: [
          "Cassini studied Saturn and its moons for years before its deliberate end in Saturn's atmosphere. New Horizons gave humanity its first close view of Pluto.",
        ],
        artifactIds: ["cassini", "new-horizons"],
      },
    ],
  },
  {
    id: "final-days",
    title: "The final days of historic missions",
    eyebrow: "Endings",
    dek: "What the record actually says about how a mission ended.",
    summary:
      "Dust storms, lost contact, deliberate impacts and the difference between a completed mission and a destroyed machine.",
    accent: "#f17d83",
    artifactIds: ["opportunity", "insight", "ingenuity", "cassini", "phoenix", "spirit"],
    sourceIds: ["SRC-OPPORTUNITY", "SRC-INSIGHT", "SRC-INGENUITY", "SRC-CASSINI", "SRC-PHOENIX", "SRC-SPIRIT"],
    sections: [
      {
        heading: "When the signal stops",
        paragraphs: [
          "A mission can end because the hardware stops communicating, because the mission team declares it complete, or because the spacecraft is deliberately destroyed. These are different outcomes.",
          "GRAVERSE keeps mission status, hardware status and communication status separate so the ending is described accurately.",
        ],
        artifactIds: ["opportunity", "insight", "spirit"],
      },
      {
        heading: "Deliberate endings",
        paragraphs: [
          "Cassini's mission ended with a deliberate plunge into Saturn's atmosphere. That is a planned ending, not an accident.",
        ],
        artifactIds: ["cassini"],
      },
      {
        heading: "A final flight",
        paragraphs: [
          "Ingenuity's record describes a technology demonstration that became a repeated flight campaign. Its final status is recorded as inactive, not as a mission that never worked.",
        ],
        artifactIds: ["ingenuity"],
      },
    ],
  },
];

export function getStoryCollection(id: string): StoryCollection | undefined {
  return storyCollections.find((story) => story.id === id);
}
