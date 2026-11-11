export interface GlossaryEntry {
  term: string;
  definition: string;
  category: "hardware" | "mission" | "science" | "data";
  relatedArtifactIds?: string[];
  sourceIds?: string[];
}

/** Plain-language definitions used by Academy lessons and in-page tooltips. */
export const glossary: GlossaryEntry[] = [
  { term: "Artifact", definition: "A piece of human-made hardware that was sent to space or left on another world. GRAVERSE uses the word for physical objects, not for data files.", category: "data" },
  { term: "Mission", definition: "An organised spaceflight effort with a spacecraft, a launch, and one or more objectives. A mission can include several artifacts.", category: "mission" },
  { term: "Lander", definition: "A spacecraft designed to touch down and operate on a surface.", category: "hardware", relatedArtifactIds: ["viking-1-lander", "insight"] },
  { term: "Rover", definition: "A wheeled vehicle that moves across a planetary surface carrying instruments.", category: "hardware", relatedArtifactIds: ["perseverance", "curiosity", "sojourner"] },
  { term: "Orbiter", definition: "A spacecraft that travels around a body rather than landing on it.", category: "hardware" },
  { term: "Flyby", definition: "A close pass by a spacecraft that does not go into orbit or land.", category: "mission" },
  { term: "Descent stage", definition: "The part of a lander that lowers a payload to the surface. On Apollo missions it stayed on the Moon after the ascent stage left.", category: "hardware", relatedArtifactIds: ["apollo-11-lm-descent-stage"] },
  { term: "Ascent stage", definition: "The upper part of a lunar module that lifted astronauts back into lunar orbit.", category: "hardware" },
  { term: "Retroreflector", definition: "A mirror array that reflects laser light straight back to its source, used to measure the Earth–Moon distance.", category: "hardware", relatedArtifactIds: ["apollo-11-lrrr"] },
  { term: "Seismometer", definition: "An instrument that measures ground motion such as moonquakes or marsquakes.", category: "hardware", relatedArtifactIds: ["apollo-12-alsep", "insight"] },
  { term: "Payload", definition: "The scientific instruments or cargo a spacecraft carries, as distinct from the vehicle itself.", category: "hardware" },
  { term: "Probe", definition: "A spacecraft built to investigate a target, often without returning samples.", category: "hardware" },
  { term: "Aphelion", definition: "The point in an orbit farthest from the Sun.", category: "science" },
  { term: "Perihelion", definition: "The point in an orbit closest to the Sun.", category: "science" },
  { term: "Orbit", definition: "The curved path an object follows around a more massive body because of gravity.", category: "science" },
  { term: "Escape velocity", definition: "The speed needed to leave a body's gravity without further propulsion.", category: "science" },
  { term: "Trajectory", definition: "The path a spacecraft follows through space over time.", category: "mission" },
  { term: "Gravity assist", definition: "Using a planet's gravity to change a spacecraft's speed or direction without using fuel.", category: "mission" },
  { term: "Solar conjunction", definition: "A period when a spacecraft and Earth are on opposite sides of the Sun, which can interrupt communications.", category: "mission" },
  { term: "Telemetry", definition: "Data a spacecraft sends back about its own condition and measurements.", category: "data" },
  { term: "Downlink", definition: "The transmission of data from a spacecraft to Earth.", category: "data" },
  { term: "Uplink", definition: "The transmission of commands or data from Earth to a spacecraft.", category: "data" },
  { term: "Light-time", definition: "The time light takes to travel between two points. It limits how quickly controllers can react to a distant spacecraft.", category: "science" },
  { term: "Regolith", definition: "The loose layer of dust, soil and broken rock covering a planetary surface.", category: "science" },
  { term: "Crater", definition: "A bowl-shaped depression created by an impact or, sometimes, by volcanic activity.", category: "science" },
  { term: "Mineral", definition: "A naturally occurring solid with a defined chemical composition and crystal structure.", category: "science" },
  { term: "Sediment", definition: "Particles deposited by water, wind or ice. Layered sediment can preserve a record of past environments.", category: "science" },
  { term: "Biosignature", definition: "A chemical or physical signal that could indicate past or present life. A possible biosignature is not proof of life.", category: "science" },
  { term: "Habitability", definition: "The potential of an environment to support life as we know it, not evidence that life exists there.", category: "science" },
  { term: "Atmosphere", definition: "The layer of gases held around a planet or moon by gravity.", category: "science" },
  { term: "Magnetosphere", definition: "The region around a body where its magnetic field influences charged particles.", category: "science" },
  { term: "Radiation belt", definition: "A zone of trapped charged particles around a planet, such as Earth's Van Allen belts.", category: "science" },
  { term: "Spectrometer", definition: "An instrument that separates light or particles by wavelength or energy to identify composition.", category: "hardware" },
  { term: "Sample return", definition: "A mission that brings material from another world back to Earth for laboratory study.", category: "mission" },
  { term: "Mission status", definition: "Whether the mission as a whole is planned, ongoing, completed or ended. It is separate from the condition of its hardware.", category: "data" },
  { term: "Hardware status", definition: "What is documented about the physical object today, such as operating, inactive, still traveling or destroyed.", category: "data" },
  { term: "Confirmed", definition: "Directly stated by a primary source in GRAVERSE's source registry.", category: "data" },
  { term: "Estimated", definition: "A range, approximation or model-derived value published by a source, rather than a single measured number.", category: "data" },
  { term: "Simulated", definition: "Computed by GRAVERSE from published parameters. A simulation is not an observation.", category: "data" },
  { term: "Unknown", definition: "No primary source in the record establishes the value. GRAVERSE shows the gap instead of guessing.", category: "data" },
];

export const glossaryMap = new Map(
  glossary.map((entry) => [entry.term.toLowerCase(), entry])
);
