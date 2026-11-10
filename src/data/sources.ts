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
  notes: string
): SourceRecord {
  return { id, organization, title, url, type, accessedAt: ACCESSED, notes };
}

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
  "mission-page": "NASA mission page",
  "technical-archive": "NASA technical archive",
  "news-release": "NASA news release",
  "image-record": "NASA image record",
};
