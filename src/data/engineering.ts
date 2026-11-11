/**
 * Engineering Lab content.
 *
 * Every topic is anchored to records already in the collection. The prose
 * explains engineering trade-offs; the linked artifact records carry the
 * source-backed specifications. No new mission facts are invented here.
 */

export type EngineeringSystem =
  | "power"
  | "mobility"
  | "landing"
  | "communication"
  | "instruments"
  | "materials"
  | "evolution";

export interface EngineeringTopic {
  id: string;
  system: EngineeringSystem;
  title: string;
  question: string;
  summary: string;
  body: string[];
  artifactIds: string[];
  sourceIds: string[];
  takeaway: string;
  comparison?: Array<{ label: string; value: string }>;
}

export const engineeringSystemLabels: Record<EngineeringSystem, string> = {
  power: "Power systems",
  mobility: "Mobility",
  landing: "Entry, descent and landing",
  communication: "Communication",
  instruments: "Scientific instruments",
  materials: "Materials and structure",
  evolution: "Engineering evolution",
};

export const engineeringTopics: EngineeringTopic[] = [
  {
    id: "power-solar-or-rtg",
    system: "power",
    title: "Solar panels or a radioisotope power source?",
    question:
      "Why do some Mars spacecraft use solar arrays while others carry a radioisotope power system?",
    summary:
      "The choice is a trade between available sunlight, dust, mission length, mass and the need to keep instruments warm.",
    body: [
      "Solar arrays convert sunlight into electricity. Their output depends on how much light reaches the panels, the angle of the array and how much dust settles on the surface. Mars is farther from the Sun than Earth, so the same panel receives less sunlight than it would in Earth orbit.",
      "A radioisotope thermoelectric generator (RTG) converts heat from the decay of a radioactive material into electricity. It does not depend on sunlight, which matters for long missions, dusty seasons or destinations far from the Sun. It also adds mass, cost and operational constraints.",
      "The collection shows both approaches. Spirit and Opportunity relied on solar power and both were eventually affected by dust and the Martian winter. Curiosity and Perseverance carry RTGs, which is one reason they can operate through seasons and dust events that would challenge a solar-powered rover.",
      "This is an engineering comparison, not a claim that one choice is always better. A short mission with abundant sunlight may favour solar power; a long mission in a dusty or distant environment may favour an RTG.",
    ],
    artifactIds: ["sojourner", "spirit", "opportunity", "curiosity", "perseverance"],
    sourceIds: [
      "SRC-CURIOSITY",
      "SRC-PERSEVERANCE-SPEC",
      "SRC-SPIRIT",
      "SRC-OPPORTUNITY",
    ],
    takeaway:
      "Power design follows the environment and the mission lifetime. It is never a single universal answer.",
    comparison: [
      { label: "Solar examples", value: "Sojourner, Spirit, Opportunity" },
      { label: "RTG examples", value: "Curiosity, Perseverance" },
      { label: "Key environmental factor", value: "Sunlight, dust, season, distance" },
    ],
  },
  {
    id: "wheels-and-mobility",
    system: "mobility",
    title: "Why are rover wheels designed so differently?",
    question:
      "What changes when a vehicle has to drive on the Moon rather than on Mars?",
    summary:
      "Wheel design responds to gravity, soil, rock fields, payload mass and the distance the vehicle must survive.",
    body: [
      "The Apollo Lunar Roving Vehicle was a crewed vehicle built for short expeditions in low gravity. Its wire-mesh wheels were designed to be light and to grip loose lunar soil while carrying two astronauts and their tools.",
      "Mars rovers face a different problem. They are robotic, they must survive for years, and they drive over sharp rocks and soft sand. Sojourner was a small technology demonstrator. Spirit and Opportunity were larger solar-powered rovers. Curiosity and Perseverance are much heavier laboratories with six wheels, suspension systems and the ability to climb slopes.",
      "Wheel failures are part of the engineering story too. The collection records the documented operational history of each rover; it does not claim that every wheel problem ended a mission. Engineers use that history to design the next generation.",
    ],
    artifactIds: [
      "apollo-15-lunar-rover",
      "sojourner",
      "spirit",
      "opportunity",
      "curiosity",
      "perseverance",
    ],
    sourceIds: ["SRC-LRV", "SRC-ALSJ-A15-LRV", "SRC-CURIOSITY", "SRC-PERSEVERANCE-SPEC"],
    takeaway:
      "Mobility is a system: wheels, suspension, mass, gravity and terrain all constrain one another.",
  },
  {
    id: "landing-on-mars",
    system: "landing",
    title: "How do you land a laboratory on Mars?",
    question:
      "Why did landing methods change from Viking to Perseverance?",
    summary:
      "Mars has an atmosphere — but not enough to slow a heavy spacecraft without help.",
    body: [
      "A Mars landing combines a heat shield, a parachute and, for larger payloads, powered descent. The atmosphere slows the spacecraft, but it is much thinner than Earth's. A parachute alone cannot safely deliver a large rover.",
      "Viking used a lander with retro-rockets. Mars Pathfinder used airbags. Phoenix used retro-rockets. Curiosity and Perseverance used a sky-crane manoeuvre: a descent stage lowered the rover on cables, then flew away to crash at a safe distance.",
      "The collection includes the Mars 2020 descent stage as a separate artifact from the Perseverance rover. That separation matters: the rover is still operating, while the descent stage impacted the surface after delivering it. They are different pieces of hardware with different fates.",
      "GRAVERSE's landing simulator uses a simplified model. It is built to teach the sequence and the trade-offs, not to reproduce a NASA flight computer.",
    ],
    artifactIds: [
      "viking-1-lander",
      "mars-pathfinder-lander",
      "phoenix",
      "curiosity",
      "perseverance",
      "mars-2020-descent-stage",
    ],
    sourceIds: [
      "SRC-VIKING",
      "SRC-MARS-PATHFINDER",
      "SRC-PHOENIX",
      "SRC-CURIOSITY",
      "SRC-PERSEVERANCE",
    ],
    takeaway:
      "Landing architecture scales with payload mass and the amount of energy the atmosphere can remove.",
  },
  {
    id: "talking-across-the-solar-system",
    system: "communication",
    title: "How does a spacecraft talk to Earth?",
    question:
      "Why do some missions use a large dish while rovers use small antennas and orbiters?",
    summary:
      "Communication is limited by distance, antenna size, power and the geometry between the spacecraft and Earth.",
    body: [
      "A radio signal travels at the speed of light. That sounds instant, but across the solar system it is not. The farther a spacecraft is, the longer the one-way light time and the weaker the signal at Earth.",
      "Voyager and New Horizons use high-gain antennas and NASA's Deep Space Network to communicate across enormous distances. Mars rovers use smaller direct-to-Earth links and, in many cases, relay through orbiters that have a better view and a stronger link.",
      "The collection distinguishes hardware status from communication status. A mission can be complete while a passive instrument such as a lunar retroreflector still returns measurements. A spacecraft can also lose contact without being confirmed destroyed.",
      "The communication simulator in GRAVERSE computes light time from distance and lets you compare a direct link with a relay. The numbers are educational approximations, clearly labelled.",
    ],
    artifactIds: ["voyager-1", "voyager-2", "new-horizons", "perseverance", "apollo-11-lrrr"],
    sourceIds: ["SRC-VOYAGER-1", "SRC-VOYAGER-2", "SRC-NEW-HORIZONS", "SRC-PERSEVERANCE"],
    takeaway:
      "Distance sets the physics; antenna design, power and relay geometry decide what is practical.",
  },
  {
    id: "instruments-and-questions",
    system: "instruments",
    title: "Instruments are built around questions",
    question:
      "Why does a rover carry several different instruments instead of one camera?",
    summary:
      "Different instruments answer different questions: what a rock looks like, what it is made of, how old it is, and whether it could support life.",
    body: [
      "A camera records morphology and context. A spectrometer studies light to infer composition. A drill or scoop acquires a sample. A laboratory instrument prepares and analyses that sample. Each measurement is useful on its own, but the combination is what makes a mission scientifically powerful.",
      "Apollo surface experiments included passive retroreflectors, seismometers and heat-flow packages. Viking carried biology experiments designed to test soil for metabolic activity; their results were ambiguous and are still discussed. Curiosity and Perseverance carry instruments that study chemistry, mineralogy and the potential preservation of organic material.",
      "The collection records what each mission was designed to do and what it contributed. It does not turn every instrument into a discovery claim. Where a result was debated, the record says so.",
    ],
    artifactIds: ["apollo-12-alsep", "apollo-11-lrrr", "viking-1-lander", "curiosity", "perseverance"],
    sourceIds: [
      "SRC-ALSJ-A12-ALSEP",
      "SRC-NSSDCA-APOLLO-11-LRRR",
      "SRC-VIKING",
      "SRC-CURIOSITY",
      "SRC-PERSEVERANCE",
    ],
    takeaway:
      "An instrument is an answer machine. The mission question decides which machines are worth the mass.",
  },
  {
    id: "materials-and-survival",
    system: "materials",
    title: "Materials have to survive the journey and the destination",
    question:
      "What does a spacecraft structure have to endure before it can do any science?",
    summary:
      "Launch loads, vacuum, temperature swings, radiation and dust all shape the materials and structure of a spacecraft.",
    body: [
      "A spacecraft is exposed to severe vibration and acoustic loads during launch, then to vacuum and large temperature swings in space. On a planetary surface it may also face dust, salt, sharp rocks or corrosive chemistry.",
      "Thermal protection keeps a spacecraft from overheating during atmospheric entry. Structural materials must be strong but light, because every kilogram costs energy to launch. Electronics may be shielded or hardened against radiation.",
      "The collection's technical details record only what the public sources state. Where a material or mass is not documented, the record does not guess. That restraint is part of the engineering story: a museum should distinguish a specification from an assumption.",
    ],
    artifactIds: ["apollo-11-lm-descent-stage", "viking-1-lander", "curiosity", "perseverance"],
    sourceIds: [
      "SRC-NSSDCA-APOLLO-11-LM",
      "SRC-NSSDCA-VIKING-1",
      "SRC-CURIOSITY",
      "SRC-PERSEVERANCE-SPEC",
    ],
    takeaway:
      "Survival engineering is invisible in most photographs, but it determines whether the mission reaches the surface at all.",
  },
  {
    id: "three-generations-of-mars-exploration",
    system: "evolution",
    title: "Three generations of Mars exploration",
    question:
      "How did Mars surface missions change between Viking and Perseverance?",
    summary:
      "The direction of change is clear: from stationary landers to mobile laboratories, from short missions to multi-year operations, and from direct remote control to increasingly autonomous driving.",
    body: [
      "Viking demonstrated that a spacecraft could land on Mars and operate for years. Mars Pathfinder and Sojourner showed that a small rover could travel with a lander. Spirit and Opportunity turned rovers into long-duration field geologists. Curiosity and Perseverance added larger payloads, sample analysis and, in Perseverance's case, sample caching.",
      "The collection is not a complete history of Mars exploration. It is a curated set of records chosen to show the arc. Each record states its own mission and hardware status, so the comparison does not flatten different outcomes into one story.",
      "Use the comparison tool to put two records side by side. The table shows what the sources actually document, including the fields that remain unknown.",
    ],
    artifactIds: [
      "viking-1-lander",
      "mars-pathfinder-lander",
      "sojourner",
      "spirit",
      "opportunity",
      "curiosity",
      "perseverance",
    ],
    sourceIds: [
      "SRC-VIKING",
      "SRC-MARS-PATHFINDER",
      "SRC-SPIRIT",
      "SRC-OPPORTUNITY",
      "SRC-CURIOSITY",
      "SRC-PERSEVERANCE",
    ],
    takeaway:
      "Evolution is not a straight line of bigger machines; it is a series of answers to new scientific questions.",
    comparison: [
      { label: "1990s", value: "Pathfinder + Sojourner: lander and small rover" },
      { label: "2000s", value: "Spirit and Opportunity: long-duration solar rovers" },
      { label: "2010s–2020s", value: "Curiosity and Perseverance: RTG laboratories" },
    ],
  },
];

export function getEngineeringTopic(id: string): EngineeringTopic | undefined {
  return engineeringTopics.find((topic) => topic.id === id);
}
