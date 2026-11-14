/**
 * The official 2026 NASA Space Apps Challenge resource list.
 *
 * The challenge page published its Resources tab on 13 November 2026. This
 * module reproduces only the official NASA and NASA-affiliated links from that
 * tab, grouped the way the challenge presents them, and connects each entry to
 * the GRAVERSE records that document it.
 *
 * This is a reading list, not a second source registry: every factual claim in
 * an artifact still points at the normal `sources.ts` record.
 */

export type ChallengeResourceCategory =
  | "nasa-data"
  | "moon"
  | "mars-deep-space";

export interface ChallengeResource {
  id: string;
  /** The number used on the challenge Resources tab. */
  number: number;
  title: string;
  organization: string;
  category: ChallengeResourceCategory;
  url: string;
  destination: string;
  summary: string;
  artifactIds: string[];
  sourceIds: string[];
}

export interface ChallengeSupportingResource {
  id: string;
  title: string;
  organization: string;
  url: string;
  summary: string;
}

export const challengeResourceMeta = {
  challenge:
    "Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars",
  publisher: "NASA Space Apps Challenge",
  url: "https://www.spaceappschallenge.org/2026/challenges/nasas-discarded-equipment-storytelling/?tab=resources",
  publishedAt: "2026-11-13",
  accessedAt: "2026-11-13",
  note:
    "The Resources tab opened on 13 November 2026. GRAVERSE reproduces only the official NASA and NASA-affiliated links from that tab; third-party or unrelated links that appeared in the page's raw markup are not included.",
};

export const challengeResourceCategoryMeta: Record<
  ChallengeResourceCategory,
  { label: string; description: string }
> = {
  "nasa-data": {
    label: "NASA data and resources",
    description:
      "The catalogues and indexes used to check an object's identity, mission and final disposition.",
  },
  moon: {
    label: "The Moon",
    description:
      "Hardware left on the lunar surface during the Apollo and Surveyor programmes.",
  },
  "mars-deep-space": {
    label: "Mars and deep space",
    description:
      "Landers, rovers, helicopters and spacecraft that completed their missions far from Earth.",
  },
};

export const challengeResources: ChallengeResource[] = [
  {
    id: "nssdca-catalog",
    number: 1,
    title: "NASA Space Science Data Coordinated Archive (NSSDCA)",
    organization: "NASA NSSDCA",
    category: "nasa-data",
    url: "https://nssdc.gsfc.nasa.gov/",
    destination: "All",
    summary:
      "NASA's public catalogue of spacecraft and space instruments. Use it to check an object's identity, launch and mission parameters, operational status and final disposition.",
    artifactIds: [],
    sourceIds: ["SRC-NSSDCA", "SRC-NSSDCA-PLANETARY-CATALOG"],
  },
  {
    id: "apollo-lunar-modules",
    number: 2,
    title: "Apollo Lunar Modules",
    organization: "NASA NSSDCA",
    category: "moon",
    url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C",
    destination: "The Moon",
    summary:
      "The descent stages of the Apollo Lunar Modules were left on the Moon after the ascent stages returned the crews to orbit. The NSSDCA record identifies the hardware and its disposition.",
    artifactIds: [
      "apollo-11-lm-descent-stage",
      "apollo-14-lm-descent-stage",
      "apollo-17-lm-descent-stage",
    ],
    sourceIds: ["SRC-NSSDCA-APOLLO-11-LM"],
  },
  {
    id: "lunar-roving-vehicles",
    number: 3,
    title: "Lunar Roving Vehicles",
    organization: "NASA NSSDCA",
    category: "moon",
    url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C",
    destination: "The Moon",
    summary:
      "Three electric vehicles were driven by Apollo astronauts and remain parked on the lunar surface. Their records document mobility, engineering and the history of lunar exploration.",
    artifactIds: ["apollo-15-lunar-rover"],
    sourceIds: ["SRC-NSSDCA-LRV", "SRC-LRV", "SRC-ALSJ-A15-LRV"],
  },
  {
    id: "alsep-packages",
    number: 4,
    title: "ALSEP Scientific Packages",
    organization: "NASA NSSDCA",
    category: "moon",
    url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C",
    destination: "The Moon",
    summary:
      "The Apollo Lunar Surface Experiments Packages carried seismometers, magnetometers and other instruments that continued returning data after the astronauts left.",
    artifactIds: ["apollo-12-alsep", "apollo-11-lrrr"],
    sourceIds: ["SRC-NSSDCA-APOLLO-12-LM", "SRC-ALSJ-A12-ALSEP"],
  },
  {
    id: "surveyor-landers",
    number: 5,
    title: "Surveyor Landers",
    organization: "NASA Science",
    category: "moon",
    url: "https://science.nasa.gov/mission/surveyor-3/",
    destination: "The Moon",
    summary:
      "Robotic probes launched in the 1960s to demonstrate that soft landings on the Moon were possible. Surveyor 3 was later visited by the Apollo 12 crew.",
    artifactIds: ["surveyor-1", "surveyor-3"],
    sourceIds: ["SRC-SURVEYOR-3", "SRC-NSSDCA-SURVEYOR-3"],
  },
  {
    id: "sojourner-rover",
    number: 6,
    title: "Sojourner Rover",
    organization: "NASA Science",
    category: "mars-deep-space",
    url: "https://science.nasa.gov/mission/mars-pathfinder/",
    destination: "Mars",
    summary:
      "The first rover to operate on Mars, delivered by the Mars Pathfinder lander in 1997. It was a milestone in low-cost robotic planetary exploration.",
    artifactIds: ["sojourner", "mars-pathfinder-lander"],
    sourceIds: ["SRC-MARS-PATHFINDER", "SRC-NASA-PATHFINDER"],
  },
  {
    id: "spirit-opportunity",
    number: 7,
    title: "Spirit and Opportunity",
    organization: "NASA Science",
    category: "mars-deep-space",
    url: "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/",
    destination: "Mars",
    summary:
      "Twin Mars Exploration Rovers that operated for years beyond their planned missions. Both ended on the Martian surface after losing contact.",
    artifactIds: ["spirit", "opportunity"],
    sourceIds: ["SRC-NASA-MER", "SRC-SPIRIT", "SRC-OPPORTUNITY"],
  },
  {
    id: "viking-landers",
    number: 8,
    title: "Viking 1 and 2 Landers",
    organization: "NASA Science",
    category: "mars-deep-space",
    url: "https://science.nasa.gov/mission/viking-1/",
    destination: "Mars",
    summary:
      "The first U.S. landers to operate successfully on Mars, in 1976. They conducted experiments, photographed the surface and remain at their landing sites.",
    artifactIds: ["viking-1-lander", "viking-2-lander"],
    sourceIds: ["SRC-NASA-VIKING-1", "SRC-VIKING"],
  },
  {
    id: "phoenix-insight",
    number: 9,
    title: "Phoenix and InSight Landers",
    organization: "NASA Science",
    category: "mars-deep-space",
    url: "https://science.nasa.gov/mission/insight/",
    destination: "Mars",
    summary:
      "Phoenix investigated Martian soil and water ice; InSight studied the planet's interior and marsquakes. Both missions eventually lost power.",
    artifactIds: ["phoenix", "insight"],
    sourceIds: ["SRC-INSIGHT", "SRC-PHOENIX"],
  },
  {
    id: "dawn",
    number: 10,
    title: "Dawn Spacecraft",
    organization: "NASA Science",
    category: "mars-deep-space",
    url: "https://science.nasa.gov/mission/dawn/",
    destination: "Vesta and Ceres",
    summary:
      "Dawn explored asteroid Vesta and dwarf planet Ceres, then ran out of fuel in 2018. It remains in an unpowered but stable orbit around Ceres.",
    artifactIds: ["dawn"],
    sourceIds: ["SRC-NASA-DAWN", "SRC-NSSDCA-DAWN"],
  },
  {
    id: "near-shoemaker",
    number: 11,
    title: "NEAR Shoemaker",
    organization: "NASA Science",
    category: "mars-deep-space",
    url: "https://science.nasa.gov/mission/near-shoemaker/",
    destination: "Asteroid 433 Eros",
    summary:
      "The first spacecraft to orbit an asteroid and the first to land on one. NEAR Shoemaker touched down on Eros in 2001 after an extended mission.",
    artifactIds: ["near-shoemaker"],
    sourceIds: ["SRC-NASA-NEAR-SHOEMAKER", "SRC-NSSDCA-NEAR-SHOEMAKER"],
  },
  {
    id: "pioneer-10-11",
    number: 12,
    title: "Pioneer 10 and 11",
    organization: "NASA Science",
    category: "mars-deep-space",
    url: "https://science.nasa.gov/mission/pioneer-10/",
    destination: "Deep space",
    summary:
      "Early deep-space probes that explored Jupiter and Saturn and then continued outward. Both are now silent and traveling through the solar system.",
    artifactIds: ["pioneer-10", "pioneer-11"],
    sourceIds: ["SRC-PIONEER-10", "SRC-PIONEER-11"],
  },
  {
    id: "ingenuity",
    number: 13,
    title: "Ingenuity Mars Helicopter",
    organization: "NASA Science",
    category: "mars-deep-space",
    url: "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/",
    destination: "Mars",
    summary:
      "The first aircraft to achieve powered, controlled flight on another planet. Ingenuity completed 72 flights before rotor damage ended its mission in January 2024.",
    artifactIds: ["ingenuity"],
    sourceIds: ["SRC-INGENUITY"],
  },
  {
    id: "kepler",
    number: 14,
    title: "Kepler Space Telescope",
    organization: "NASA Science",
    category: "mars-deep-space",
    url: "https://science.nasa.gov/mission/kepler/",
    destination: "Earth-trailing heliocentric orbit",
    summary:
      "A revolutionary exoplanet telescope that showed planets are common around other stars. It ran out of fuel and was retired in 2018, remaining in an Earth-trailing orbit.",
    artifactIds: ["kepler"],
    sourceIds: ["SRC-NASA-KEPLER", "SRC-NSSDCA-KEPLER"],
  },
];

/**
 * Further NASA research links listed alongside the 14 main resources.
 * They are not tied to a single artifact, so they stay in this small list
 * rather than inflating the numbered challenge set.
 */
export const challengeSupportingResources: ChallengeSupportingResource[] = [
  {
    id: "nssdca-planetary-catalog",
    title: "NSSDCA — Planetary Mission Catalog",
    organization: "NASA NSSDCA",
    url: "https://nssdc.gsfc.nasa.gov/planetary/projects.html",
    summary: "Search NASA planetary missions by project.",
  },
  {
    id: "nasa-science-missions",
    title: "NASA Science — Missions",
    organization: "NASA Science",
    url: "https://science.nasa.gov/mission/",
    summary:
      "Mission descriptions, scientific objectives, images and historical information.",
  },
  {
    id: "nasa-missions-a-z",
    title: "NASA Missions A–Z",
    organization: "NASA",
    url: "https://www.nasa.gov/a-to-z-of-nasa-missions/",
    summary: "A broader index of NASA missions.",
  },
  {
    id: "lpi-apollo-documents",
    title: "Lunar and Planetary Institute — Apollo Documents",
    organization: "Lunar and Planetary Institute",
    url: "https://www.lpi.usra.edu/lunar/documents/",
    summary:
      "Historical documents, technical reports and Apollo-era research.",
  },
  {
    id: "nasa-rps-missions",
    title: "NASA — Radioisotope Power Systems Missions",
    organization: "NASA Science",
    url: "https://science.nasa.gov/planetary-science/programs/radioisotope-power-systems/missions/",
    summary: "Information about spacecraft power systems and missions.",
  },
];

export const challengeResourceCoverage = {
  total: challengeResources.length,
  linked: challengeResources.filter((resource) => resource.artifactIds.length > 0)
    .length,
  artifactCount: new Set(
    challengeResources.flatMap((resource) => resource.artifactIds)
  ).size,
};
