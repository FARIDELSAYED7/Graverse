import type { SourceRecord } from "@/types/artifact";

/**
 * Source registry.
 *
 * Every factual claim in `data/artifacts` points at one of these records.
 * Records normalize public NASA mission pages, NASA/NSSDCA technical
 * archives, NASA image records and the Apollo Lunar Surface Journal.
 *
 * All URLs below were requested during the build session and returned a
 * successful response. Access dates are recorded on every entry.
 */
const ACCESSED = "2026-11-10";

function source(
  id: string,
  organization: string,
  title: string,
  url: string,
  type: SourceRecord["type"],
  notes: string,
  accessedAt = ACCESSED
): SourceRecord {
  return { id, organization, title, url, type, accessedAt, notes };
}

/**
 * The official 2026 NASA Space Apps Challenge resource list was published on
 * 13 November 2026. Records added from that list carry the date they were
 * checked rather than the original collection access date.
 */
const CHALLENGE_ACCESSED = "2026-11-13";

export const sources: SourceRecord[] = [
  /* ------------------------------------------------------------------ Moon */
  source(
    "SRC-RANGER-7",
    "NASA Science",
    "Ranger 7",
    "https://science.nasa.gov/mission/ranger-7/",
    "mission-page",
    "Mission overview, launch and impact dates, and the first close-up lunar images."
  ),
  source(
    "SRC-NSSDCA-RANGER-7",
    "NASA NSSDCA",
    "Ranger 7",
    "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1964-041A",
    "technical-archive",
    "Spacecraft identifier, launch date, mass and impact record."
  ),
  source(
    "SRC-SURVEYOR-1",
    "NASA Science",
    "Surveyor 1",
    "https://science.nasa.gov/mission/surveyor-1/",
    "mission-page",
    "Mission overview, soft landing and surface operations."
  ),
  source(
    "SRC-NSSDCA-SURVEYOR-1",
    "NASA NSSDCA",
    "Surveyor 1",
    "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1966-045A",
    "technical-archive",
    "Spacecraft identifier, launch and landing dates, mass and last contact."
  ),
  source(
    "SRC-SURVEYOR-3",
    "NASA Science",
    "Surveyor 3",
    "https://science.nasa.gov/mission/surveyor-3/",
    "mission-page",
    "Mission overview, landing site and the later Apollo 12 visit."
  ),
  source(
    "SRC-NSSDCA-SURVEYOR-3",
    "NASA NSSDCA",
    "Surveyor 3",
    "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1967-035A",
    "technical-archive",
    "Spacecraft identifier, launch and landing dates, mass and last contact."
  ),
  source(
    "SRC-APOLLO-11",
    "NASA",
    "Apollo 11",
    "https://www.nasa.gov/mission/apollo-11/",
    "mission-page",
    "Crew, launch, landing and splashdown dates; mission overview."
  ),
  source(
    "SRC-NSSDCA-APOLLO-11-LM",
    "NASA NSSDCA",
    "Apollo 11 Lunar Module / EASEP",
    "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C",
    "technical-archive",
    "Lunar Module identifier, mass and hardware disposition notes."
  ),
  source(
    "SRC-NSSDCA-APOLLO-11-LRRR",
    "NASA NSSDCA",
    "Laser Ranging Retroreflector, Apollo 11",
    "https://nssdc.gsfc.nasa.gov/nmc/experiment/display.action?id=1969-059C-04",
    "technical-archive",
    "Experiment identifier and passive instrument description."
  ),
  source(
    "SRC-ALSJ-A11-EASEP",
    "NASA Apollo Lunar Surface Journal",
    "Apollo 11 Early Apollo Scientific Experiments Package",
    "https://www.hq.nasa.gov/alsj/a11/a11.easep.html",
    "technical-archive",
    "Deployment sequence and descriptions of the EASEP instruments."
  ),
  source(
    "SRC-APOLLO-12",
    "NASA",
    "Apollo 12",
    "https://www.nasa.gov/mission/apollo-12/",
    "mission-page",
    "Crew, launch, landing and splashdown dates; mission overview."
  ),
  source(
    "SRC-NSSDCA-APOLLO-12-LM",
    "NASA NSSDCA",
    "Apollo 12 Lunar Module / ALSEP",
    "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C",
    "technical-archive",
    "Lunar Module identifier, mass and ALSEP payload notes."
  ),
  source(
    "SRC-ALSJ-A12-ALSEP",
    "NASA Apollo Lunar Surface Journal",
    "Apollo 12 Apollo Lunar Surface Experiments Package",
    "https://www.hq.nasa.gov/alsj/a12/a12.alsep.html",
    "technical-archive",
    "ALSEP deployment sequence and instrument descriptions."
  ),
  source(
    "SRC-APOLLO-14",
    "NASA",
    "Apollo 14",
    "https://www.nasa.gov/mission/apollo-14/",
    "mission-page",
    "Crew, launch, landing and splashdown dates; mission overview."
  ),
  source(
    "SRC-NSSDCA-APOLLO-14-LM",
    "NASA NSSDCA",
    "Apollo 14 Lunar Module",
    "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-008C",
    "technical-archive",
    "Lunar Module identifier, mass and hardware disposition notes."
  ),
  source(
    "SRC-APOLLO-15",
    "NASA",
    "Apollo 15",
    "https://www.nasa.gov/mission/apollo-15/",
    "mission-page",
    "Crew, launch, landing and splashdown dates; Hadley-Apennine overview."
  ),
  source(
    "SRC-LRV",
    "NASA NSSDCA",
    "The Apollo Lunar Roving Vehicle",
    "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html",
    "technical-archive",
    "Lunar Roving Vehicle specifications, deployment and traverse distances."
  ),
  source(
    "SRC-NSSDCA-LRV",
    "NASA NSSDCA",
    "Apollo 15 Lunar Roving Vehicle",
    "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C",
    "technical-archive",
    "Spacecraft record for the lunar roving vehicle left on the Moon after Apollo 15.",
    CHALLENGE_ACCESSED
  ),
  source(
    "SRC-ALSJ-A15-LRV",
    "NASA Apollo Lunar Surface Journal",
    "Apollo 15 Lunar Roving Vehicle",
    "https://www.hq.nasa.gov/alsj/a15/a15.lrv.html",
    "technical-archive",
    "Rover deployment, driving and surface operations."
  ),
  source(
    "SRC-NSSDCA-APOLLO-15-LRRR",
    "NASA NSSDCA",
    "Laser Ranging Retroreflector, Apollo 15",
    "https://nssdc.gsfc.nasa.gov/nmc/experiment/display.action?id=1971-063C-08",
    "technical-archive",
    "Experiment identifier and passive instrument description."
  ),
  source(
    "SRC-LRRR",
    "NASA Science",
    "The Apollo 15 Lunar Laser Ranging Retroreflector",
    "https://science.nasa.gov/photojournal/the-apollo-15-lunar-laser-ranging-retroreflector-a-fundamental-point-on-the-moon/",
    "technical-archive",
    "Passive operation and continuing laser-ranging use."
  ),
  source(
    "SRC-APOLLO-17",
    "NASA",
    "Apollo 17",
    "https://www.nasa.gov/mission/apollo-17/",
    "mission-page",
    "Crew, launch, landing and splashdown dates; Taurus-Littrow overview."
  ),
  source(
    "SRC-NSSDCA-APOLLO-17-LM",
    "NASA NSSDCA",
    "Apollo 17 Lunar Module",
    "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1972-096C",
    "technical-archive",
    "Lunar Module identifier, mass and hardware disposition notes."
  ),
  source(
    "SRC-LUNAR-PROSPECTOR",
    "NASA Science",
    "Lunar Prospector",
    "https://science.nasa.gov/mission/lunar-prospector/",
    "mission-page",
    "Mission overview, orbit insertion, science results and controlled impact."
  ),
  source(
    "SRC-NSSDCA-LUNAR-PROSPECTOR",
    "NASA NSSDCA",
    "Lunar Prospector",
    "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1998-001A",
    "technical-archive",
    "Spacecraft identifier, launch date, mass and instrument payload."
  ),
  source(
    "SRC-LCROSS",
    "NASA Science",
    "LCROSS",
    "https://science.nasa.gov/mission/lcross/",
    "mission-page",
    "Mission overview, launch, impact and water-ice results."
  ),
  source(
    "SRC-NSSDCA-LCROSS",
    "NASA NSSDCA",
    "LCROSS",
    "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2009-031B",
    "technical-archive",
    "Spacecraft identifier, launch date, mass and impact record."
  ),

  /* ------------------------------------------------------------------ Mars */
  source(
    "SRC-VIKING",
    "NASA Science",
    "Viking",
    "https://science.nasa.gov/mission/viking/",
    "mission-page",
    "Mission overview, two landers, landing dates and science results."
  ),
  source(
    "SRC-NSSDCA-VIKING-1",
    "NASA NSSDCA",
    "Viking 1 Lander",
    "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1975-075C",
    "technical-archive",
    "Lander identifier, launch and landing dates, mass and last contact."
  ),
  source(
    "SRC-NASA-VIKING-1",
    "NASA Science",
    "Viking 1",
    "https://science.nasa.gov/mission/viking-1/",
    "mission-page",
    "Viking 1 lander overview, landing date, experiments and mission results.",
    CHALLENGE_ACCESSED
  ),
  source(
    "SRC-NSSDCA-VIKING-2",
    "NASA NSSDCA",
    "Viking 2 Lander",
    "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1975-083C",
    "technical-archive",
    "Lander identifier, launch and landing dates, mass and last contact."
  ),
  source(
    "SRC-MARS-PATHFINDER",
    "NASA Science",
    "Mars Pathfinder",
    "https://science.nasa.gov/mission/mars-pathfinder/",
    "mission-page",
    "Mission overview, airbag landing, Sojourner rover and last contact."
  ),
  source(
    "SRC-NSSDCA-MARS-PATHFINDER",
    "NASA NSSDCA",
    "Mars Pathfinder / Sojourner",
    "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1996-068A",
    "technical-archive",
    "Spacecraft identifier, launch and landing dates, mass and payload."
  ),
  source(
    "SRC-SPIRIT",
    "NASA Science",
    "Spirit (Mars Exploration Rover A)",
    "https://science.nasa.gov/mission/mer-spirit/",
    "mission-page",
    "Mission overview, landing, science results and last contact."
  ),
  source(
    "SRC-NSSDCA-SPIRIT",
    "NASA NSSDCA",
    "Mars Exploration Rover A (Spirit)",
    "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-027A",
    "technical-archive",
    "Spacecraft identifier, launch and landing dates, mass and power source."
  ),
  source(
    "SRC-OPPORTUNITY",
    "NASA Science",
    "Opportunity (Mars Exploration Rover B)",
    "https://science.nasa.gov/mission/mer-opportunity/",
    "mission-page",
    "Mission overview, landing, distance record, last contact and mission end."
  ),
  source(
    "SRC-NASA-MER",
    "NASA Science",
    "Mars Exploration Rovers: Spirit and Opportunity",
    "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/",
    "mission-page",
    "Combined Spirit and Opportunity mission overview, science results and mission endings.",
    CHALLENGE_ACCESSED
  ),
  source(
    "SRC-NSSDCA-OPPORTUNITY",
    "NASA NSSDCA",
    "Mars Exploration Rover B (Opportunity)",
    "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-032A",
    "technical-archive",
    "Spacecraft identifier, launch and landing dates, mass and power source."
  ),
  source(
    "SRC-PHOENIX",
    "NASA Science",
    "Phoenix",
    "https://science.nasa.gov/mission/phoenix/",
    "mission-page",
    "Mission overview, landing, water-ice confirmation and last contact."
  ),
  source(
    "SRC-NSSDCA-PHOENIX",
    "NASA NSSDCA",
    "Phoenix Mars Lander",
    "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2007-034A",
    "technical-archive",
    "Spacecraft identifier, launch and landing dates, mass and power source."
  ),
  source(
    "SRC-CURIOSITY",
    "NASA Science",
    "Mars Science Laboratory: Curiosity Rover",
    "https://science.nasa.gov/mission/msl-curiosity/",
    "mission-page",
    "Mission overview, landing, science results and current status."
  ),
  source(
    "SRC-NSSDCA-CURIOSITY",
    "NASA NSSDCA",
    "Mars Science Laboratory (MSL)",
    "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2011-070A",
    "technical-archive",
    "Spacecraft mass, dimensions, power source and launch record."
  ),
  source(
    "SRC-INSIGHT",
    "NASA Science",
    "InSight Lander",
    "https://science.nasa.gov/mission/insight/",
    "mission-page",
    "Mission overview, launch, landing, science results and end of mission."
  ),
  source(
    "SRC-NSSDCA-INSIGHT",
    "NASA NSSDCA",
    "InSight",
    "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2018-042A",
    "technical-archive",
    "Spacecraft mass, dimensions, power source and launch record."
  ),
  source(
    "SRC-PERSEVERANCE",
    "NASA Science",
    "Mars 2020: Perseverance Rover",
    "https://science.nasa.gov/mission/mars-2020-perseverance/",
    "mission-page",
    "Mission overview, landing site, sample record and current status."
  ),
  source(
    "SRC-PERSEVERANCE-SPEC",
    "NASA/JPL-Caltech",
    "Perseverance Rover Components and Technical Specs",
    "https://mars.nasa.gov/mars2020/spacecraft/rover/",
    "technical-archive",
    "Mass, dimensions, power source and top speed."
  ),
  source(
    "SRC-NSSDCA-MARS-2020",
    "NASA NSSDCA",
    "Mars 2020",
    "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2020-052A",
    "technical-archive",
    "Spacecraft identifier, launch and landing dates, mass and payload."
  ),
  source(
    "SRC-INGENUITY",
    "NASA Science",
    "Ingenuity Mars Helicopter",
    "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/",
    "mission-page",
    "First flight, 72-flight total, final flight and mission completion."
  ),

  /* ------------------------------------------------------------ Deep space */
  source(
    "SRC-PIONEER-10",
    "NASA Science",
    "Pioneer 10",
    "https://science.nasa.gov/mission/pioneer-10/",
    "mission-page",
    "Launch, Jupiter flyby, last signal, mission end and continuing trajectory."
  ),
  source(
    "SRC-NSSDCA-PIONEER-10",
    "NASA NSSDCA",
    "Pioneer 10",
    "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1972-012A",
    "technical-archive",
    "Spacecraft mass, power source, dimensions and instrument identifiers."
  ),
  source(
    "SRC-PIONEER-11",
    "NASA Science",
    "Pioneer 11",
    "https://science.nasa.gov/mission/pioneer-11/",
    "mission-page",
    "Launch, Jupiter and Saturn flybys, last contact and continuing trajectory."
  ),
  source(
    "SRC-NSSDCA-PIONEER-11",
    "NASA NSSDCA",
    "Pioneer 11",
    "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1973-019A",
    "technical-archive",
    "Spacecraft mass, power source, dimensions and instrument identifiers."
  ),
  source(
    "SRC-VOYAGER-1",
    "NASA Science",
    "Voyager 1",
    "https://science.nasa.gov/mission/voyager/voyager-1/",
    "mission-page",
    "Launch, Jupiter and Saturn flybys, interstellar crossing and mission status."
  ),
  source(
    "SRC-NSSDCA-VOYAGER-1",
    "NASA NSSDCA",
    "Voyager 1",
    "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1977-084A",
    "technical-archive",
    "Spacecraft mass, power source and instrument identifiers."
  ),
  source(
    "SRC-VOYAGER-2",
    "NASA Science",
    "Voyager 2",
    "https://science.nasa.gov/mission/voyager/voyager-2/",
    "mission-page",
    "Launch, four giant-planet flybys, interstellar crossing and mission status."
  ),
  source(
    "SRC-NSSDCA-VOYAGER-2",
    "NASA NSSDCA",
    "Voyager 2",
    "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1977-076A",
    "technical-archive",
    "Spacecraft mass, power source and instrument identifiers."
  ),
  source(
    "SRC-NEW-HORIZONS",
    "NASA Science",
    "New Horizons",
    "https://science.nasa.gov/mission/new-horizons/",
    "mission-page",
    "Launch, Jupiter gravity assist, Pluto flyby, Arrokoth flyby and extended mission."
  ),
  source(
    "SRC-NSSDCA-NEW-HORIZONS",
    "NASA NSSDCA",
    "New Horizons Pluto Kuiper Belt Flyby",
    "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2006-001A",
    "technical-archive",
    "Spacecraft mass, power source and instrument identifiers."
  ),
  source(
    "SRC-CASSINI",
    "NASA Science",
    "Cassini-Huygens",
    "https://science.nasa.gov/mission/cassini/",
    "mission-page",
    "Launch, Saturn arrival, Huygens landing, discoveries and end of mission."
  ),
  source(
    "SRC-NASA-DAWN",
    "NASA Science",
    "Dawn",
    "https://science.nasa.gov/mission/dawn/",
    "mission-page",
    "Mission overview, launch date, targets Vesta and Ceres, and successful mission status.",
    CHALLENGE_ACCESSED
  ),
  source(
    "SRC-NSSDCA-DAWN",
    "NASA NSSDCA",
    "Dawn",
    "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2007-043A",
    "technical-archive",
    "Spacecraft mass, ion propulsion, Vesta and Ceres arrival dates, and the end of communications on 31 October 2018.",
    CHALLENGE_ACCESSED
  ),
  source(
    "SRC-NASA-NEAR-SHOEMAKER",
    "NASA Science",
    "NEAR Shoemaker",
    "https://science.nasa.gov/mission/near-shoemaker/",
    "mission-page",
    "Launch, Mathilde flyby, Eros orbit insertion, landing and last contact.",
    CHALLENGE_ACCESSED
  ),
  source(
    "SRC-NSSDCA-NEAR-SHOEMAKER",
    "NASA NSSDCA",
    "NEAR Shoemaker",
    "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1996-008A",
    "technical-archive",
    "Spacecraft mass, power, instrument complement and the 12 February 2001 touchdown.",
    CHALLENGE_ACCESSED
  ),
  source(
    "SRC-NASA-KEPLER",
    "NASA Science",
    "Kepler / K2",
    "https://science.nasa.gov/mission/kepler/",
    "mission-page",
    "Mission overview, launch, reaction-wheel failure, K2 extension, retirement and exoplanet legacy.",
    CHALLENGE_ACCESSED
  ),
  source(
    "SRC-NSSDCA-KEPLER",
    "NASA NSSDCA",
    "Kepler",
    "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2009-011A",
    "technical-archive",
    "Launch date, launch vehicle, mass and Earth-trailing heliocentric orbit.",
    CHALLENGE_ACCESSED
  ),

  /* --------------------------------------------- Solar system fact sheets */
  source(
    "SRC-NASA-PLANETARY-FACTS",
    "NASA NSSDCA",
    "Planetary Fact Sheet",
    "https://nssdc.gsfc.nasa.gov/planetary/factsheet/",
    "fact-sheet",
    "Reference values for mass, radius, distance, orbital period, rotation and temperature."
  ),
  source(
    "SRC-NASA-SOLAR-SYSTEM",
    "NASA Science",
    "Solar System Exploration",
    "https://science.nasa.gov/solar-system/",
    "reference",
    "Overview of the Sun, planets, dwarf planets and moons."
  ),
  source(
    "SRC-NASA-SUN",
    "NASA Science",
    "The Sun",
    "https://science.nasa.gov/sun/",
    "reference",
    "Solar structure, surface temperature and age."
  ),
  source(
    "SRC-NASA-MERCURY",
    "NASA Science",
    "Mercury",
    "https://science.nasa.gov/mercury/",
    "reference",
    "Planet overview, surface conditions and exploration."
  ),
  source(
    "SRC-NASA-VENUS",
    "NASA Science",
    "Venus",
    "https://science.nasa.gov/venus/",
    "reference",
    "Atmosphere, surface temperature and exploration."
  ),
  source(
    "SRC-NASA-EARTH",
    "NASA Science",
    "Earth",
    "https://science.nasa.gov/earth/",
    "reference",
    "Earth overview, atmosphere and habitability."
  ),
  source(
    "SRC-NASA-MARS",
    "NASA Science",
    "Mars",
    "https://science.nasa.gov/mars/",
    "reference",
    "Mars overview, geology, atmosphere and exploration."
  ),
  source(
    "SRC-NASA-JUPITER",
    "NASA Science",
    "Jupiter",
    "https://science.nasa.gov/jupiter/",
    "reference",
    "Gas giant overview, Great Red Spot and moons."
  ),
  source(
    "SRC-NASA-SATURN",
    "NASA Science",
    "Saturn",
    "https://science.nasa.gov/saturn/",
    "reference",
    "Ring system, atmosphere and moons."
  ),
  source(
    "SRC-NASA-URANUS",
    "NASA Science",
    "Uranus",
    "https://science.nasa.gov/uranus/",
    "reference",
    "Ice giant overview, axial tilt and moons."
  ),
  source(
    "SRC-NASA-NEPTUNE",
    "NASA Science",
    "Neptune",
    "https://science.nasa.gov/neptune/",
    "reference",
    "Ice giant overview, winds and moons."
  ),
  source(
    "SRC-NASA-PLUTO",
    "NASA Science",
    "Pluto",
    "https://science.nasa.gov/dwarf-planets/pluto/",
    "reference",
    "Dwarf planet overview and New Horizons results."
  ),
  source(
    "SRC-NASA-MOON",
    "NASA Science",
    "Earth's Moon",
    "https://science.nasa.gov/moon/",
    "reference",
    "Lunar surface, exploration history and science."
  ),
  source(
    "SRC-NASA-MOONS",
    "NASA Science",
    "Moons of Our Solar System",
    "https://science.nasa.gov/solar-system/moons/",
    "reference",
    "Major moons, their orbits and key characteristics."
  ),

  /* ---------------------------------------------------------- Deep sky */
  source(
    "SRC-NASA-ORION",
    "NASA Science",
    "Messier 42 — Orion Nebula",
    "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-42/",
    "reference",
    "Distance, appearance and star-forming structure of the Orion Nebula."
  ),
  source(
    "SRC-NASA-CRAB",
    "NASA Science",
    "Messier 1 — Crab Nebula",
    "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-1/",
    "reference",
    "Supernova remnant history, distance and structure."
  ),
  source(
    "SRC-NASA-ANDROMEDA",
    "NASA Science",
    "Messier 31 — Andromeda Galaxy",
    "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-31/",
    "reference",
    "Distance, size and structure of the nearest large spiral galaxy."
  ),
  source(
    "SRC-NASA-SGR-A",
    "NASA Science",
    "Black Holes",
    "https://science.nasa.gov/universe/black-holes/",
    "reference",
    "Black hole formation, the Milky Way's center and event horizon observations."
  ),
  source(
    "SRC-NASA-PILLARS",
    "NASA Science",
    "Messier 16 — Eagle Nebula",
    "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-16/",
    "reference",
    "The Eagle Nebula and the Pillars of Creation."
  ),
  source(
    "SRC-NASA-WHIRLPOOL",
    "NASA Science",
    "Messier 51 — Whirlpool Galaxy",
    "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-51/",
    "reference",
    "Distance, interacting spiral structure and star formation."
  ),
  source(
    "SRC-NASA-SOMBRERO",
    "NASA Science",
    "Messier 104 — Sombrero Galaxy",
    "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-104/",
    "reference",
    "Distance, dust lane and central bulge."
  ),
  source(
    "SRC-NASA-MILKY-WAY",
    "NASA Science",
    "Galaxies",
    "https://science.nasa.gov/universe/galaxies/",
    "reference",
    "Galaxy types, structure and the Milky Way."
  ),

  /* ----------------------------------------------------------- Missions */
  source(
    "SRC-NASA-APOLLO-15",
    "NASA",
    "Apollo 15",
    "https://www.nasa.gov/mission/apollo-15/",
    "mission-page",
    "Mission overview, lunar module landing and lunar rover operations."
  ),
  source(
    "SRC-NASA-VIKING",
    "NASA Science",
    "Viking 1 and 2",
    "https://science.nasa.gov/mission/viking/",
    "mission-page",
    "Orbiters and landers, landing dates and biology experiments."
  ),
  source(
    "SRC-NASA-PATHFINDER",
    "NASA Science",
    "Mars Pathfinder",
    "https://science.nasa.gov/mission/mars-pathfinder/",
    "mission-page",
    "Lander and Sojourner rover mission overview."
  ),
  source(
    "SRC-NASA-SPIRIT",
    "NASA Science",
    "Mars Exploration Rover — Spirit",
    "https://science.nasa.gov/mission/mars-exploration-rover-spirit/",
    "mission-page",
    "Spirit rover mission overview and operational timeline."
  ),
  source(
    "SRC-NASA-OPPORTUNITY",
    "NASA Science",
    "Mars Exploration Rover — Opportunity",
    "https://science.nasa.gov/mission/mars-exploration-rover-opportunity/",
    "mission-page",
    "Opportunity rover mission overview and operational timeline."
  ),
  source(
    "SRC-NASA-CURIOSITY",
    "NASA Science",
    "Curiosity",
    "https://science.nasa.gov/mission/msl-curiosity/",
    "mission-page",
    "Curiosity rover mission overview, landing and science."
  ),
  source(
    "SRC-NASA-MARS-2020",
    "NASA Science",
    "Mars 2020 Perseverance",
    "https://science.nasa.gov/mission/mars-2020-perseverance/",
    "mission-page",
    "Perseverance rover and Ingenuity helicopter mission overview."
  ),
  source(
    "SRC-NASA-VOYAGER",
    "NASA Science",
    "Voyager",
    "https://science.nasa.gov/mission/voyager/",
    "mission-page",
    "Voyager 1 and 2 mission overview, planetary encounters and interstellar status."
  ),
  source(
    "SRC-NASA-NEW-HORIZONS",
    "NASA Science",
    "New Horizons",
    "https://science.nasa.gov/mission/new-horizons/",
    "mission-page",
    "Pluto flyby and Kuiper Belt exploration."
  ),
  source(
    "SRC-NASA-CASSINI-MISSION",
    "NASA Science",
    "Cassini",
    "https://science.nasa.gov/mission/cassini/",
    "mission-page",
    "Saturn orbital mission, Huygens and Grand Finale."
  ),

  /* ---------------------------------------------- Catalogues and indexes */
  source(
    "SRC-NSSDCA",
    "NASA NSSDCA",
    "NASA Space Science Data Coordinated Archive",
    "https://nssdc.gsfc.nasa.gov/",
    "technical-archive",
    "Master catalogue for spacecraft, experiments, personnel and data collections. The starting point for checking an object's identity and disposition.",
    CHALLENGE_ACCESSED
  ),
  source(
    "SRC-NSSDCA-PLANETARY-CATALOG",
    "NASA NSSDCA",
    "Planetary Mission Catalog",
    "https://nssdc.gsfc.nasa.gov/planetary/projects.html",
    "technical-archive",
    "Index of planetary missions by project, used to cross-check destination and mission context.",
    CHALLENGE_ACCESSED
  ),
  source(
    "SRC-NASA-MISSIONS",
    "NASA Science",
    "NASA Science Missions",
    "https://science.nasa.gov/mission/",
    "reference",
    "Mission descriptions, science objectives, imagery and historical information.",
    CHALLENGE_ACCESSED
  ),
  source(
    "SRC-NASA-MISSIONS-AZ",
    "NASA",
    "A to Z of NASA Missions",
    "https://www.nasa.gov/a-to-z-of-nasa-missions/",
    "reference",
    "Broad agency index of past, present and future NASA missions.",
    CHALLENGE_ACCESSED
  ),
  source(
    "SRC-LPI-APOLLO-DOCUMENTS",
    "Lunar and Planetary Institute",
    "Apollo Documents",
    "https://www.lpi.usra.edu/lunar/documents/",
    "technical-archive",
    "Apollo-era technical reports, mission documents and historical research.",
    CHALLENGE_ACCESSED
  ),
  source(
    "SRC-NASA-RPS-MISSIONS",
    "NASA Science",
    "Radioisotope Power Systems — Missions",
    "https://science.nasa.gov/planetary-science/programs/radioisotope-power-systems/missions/",
    "reference",
    "Missions that use radioisotope power systems, with links to their power-system context.",
    CHALLENGE_ACCESSED
  ),

  /* ----------------------------------------------------------- Agencies */
  source(
    "SRC-NASA-AGENCY",
    "NASA",
    "About NASA",
    "https://www.nasa.gov/about/",
    "reference",
    "Agency mandate, history and current programs."
  ),
  source(
    "SRC-ESA-AGENCY",
    "European Space Agency",
    "About ESA",
    "https://www.esa.int/About_Us",
    "reference",
    "Agency mandate and member states."
  ),
  source(
    "SRC-JAXA-AGENCY",
    "JAXA",
    "About JAXA",
    "https://global.jaxa.jp/about/",
    "reference",
    "Agency mandate and programs."
  ),
  source(
    "SRC-ISRO-AGENCY",
    "ISRO",
    "About ISRO",
    "https://www.isro.gov.in/AboutISRO.html",
    "reference",
    "Agency mandate and programs."
  ),
  source(
    "SRC-CNSA-AGENCY",
    "CNSA",
    "China National Space Administration",
    "https://www.cnsa.gov.cn/",
    "reference",
    "Agency mandate and programs."
  ),
  source(
    "SRC-ROSCOSMOS-AGENCY",
    "Roscosmos",
    "Roscosmos State Corporation",
    "https://roscosmos.ru/",
    "reference",
    "Agency mandate and programs."
  ),
  source(
    "SRC-CSA-AGENCY",
    "Canadian Space Agency",
    "About the CSA",
    "https://www.asc-csa.gc.ca/eng/about/",
    "reference",
    "Agency mandate and programs."
  ),
  source(
    "SRC-UKSA-AGENCY",
    "UK Space Agency",
    "About the UK Space Agency",
    "https://www.gov.uk/government/organisations/uk-space-agency/about",
    "reference",
    "Agency mandate and programs."
  ),
];

export const sourceMap = new Map(sources.map((item) => [item.id, item]));

export function getSource(id: string): SourceRecord | undefined {
  return sourceMap.get(id);
}

export function getSources(ids: string[]): SourceRecord[] {
  return ids
    .map((id) => sourceMap.get(id))
    .filter((item): item is SourceRecord => Boolean(item));
}

export const sourceTypeLabels: Record<SourceRecord["type"], string> = {
  "mission-page": "Mission page",
  "technical-archive": "Technical archive",
  "fact-sheet": "Fact sheet",
  reference: "Reference",
  "news-release": "News release",
  "image-record": "Image record",
};
