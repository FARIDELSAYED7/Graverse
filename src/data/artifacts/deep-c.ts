import { defineArtifact, event, image } from "./helpers";

const DAWN = "SRC-NASA-DAWN";
const DAWN_NSSDCA = "SRC-NSSDCA-DAWN";
const NEAR = "SRC-NASA-NEAR-SHOEMAKER";
const NEAR_NSSDCA = "SRC-NSSDCA-NEAR-SHOEMAKER";
const KEPLER = "SRC-NASA-KEPLER";
const KEPLER_NSSDCA = "SRC-NSSDCA-KEPLER";

/**
 * Deep-space records added from the official 2026 NASA Space Apps Challenge
 * resource list. These three objects close the last gaps in that list: each
 * was launched, completed its mission and is now beyond operational use, but
 * none is on a planetary surface.
 */
export const deepSpaceArtifactsC = [
  defineArtifact({
    id: "dawn",
    name: "Dawn",
    alternateNames: ["Dawn spacecraft"],
    missionName: "Dawn",
    programName: "Discovery Program",
    destination: "Asteroid belt — Vesta and Ceres",
    destinationGroup: "deep-space",
    hardwareType: "orbiter",
    shortDescription:
      "The first spacecraft to orbit two extraterrestrial bodies, asteroid Vesta and dwarf planet Ceres.",
    overview:
      "Dawn launched in 2007 and used ion propulsion to travel to the asteroid belt, where it became the first spacecraft to orbit one body and then leave for another. It circled Vesta from 2011 to 2012 and Ceres from 2015 onward. When its hydrazine ran out in 2018, NASA ended the mission and left the spacecraft in a stable orbit around Ceres.",
    scientificPurpose:
      "Dawn was designed to characterize the internal structure, shape, composition and surface geology of Vesta and Ceres, two very different small worlds that formed in the early solar system.",
    missionStatus: "completed",
    missionStatusOriginal:
      "NASA describes Dawn as a successful mission that ended in 2018 after the spacecraft ran out of hydrazine.",
    hardwareStatus: "inactive",
    hardwareStatusOriginal:
      "Communications ended on 31 October 2018. Dawn remains in a stable, unpowered orbit around Ceres.",
    launchDate: "2007-09-27",
    arrivalDate: "2011-07-16",
    missionEndDate: "2018-10-31",
    lastContactDate: "2018-10-31",
    primaryMilestone: event(
      "dawn-ceres-arrival",
      "orbit-insertion",
      "2015-03-06",
      "6 March 2015",
      "Entered orbit around Ceres",
      "Dawn became the first spacecraft to orbit a dwarf planet and the first to orbit two bodies beyond Earth.",
      [DAWN, DAWN_NSSDCA]
    ),
    timelineEvents: [
      event(
        "dawn-launch",
        "launch",
        "2007-09-27",
        "27 September 2007",
        "Launched from Cape Canaveral",
        "A Delta II 7925-H launched Dawn on a trajectory toward the asteroid belt.",
        [DAWN, DAWN_NSSDCA]
      ),
      event(
        "dawn-mars-assist",
        "flyby",
        "2009-02-18",
        "18 February 2009",
        "Mars gravity assist",
        "Dawn passed about 542 km above Mars, using the planet's gravity to shape its path to Vesta.",
        [DAWN_NSSDCA]
      ),
      event(
        "dawn-vesta-arrival",
        "orbit-insertion",
        "2011-07-16",
        "16 July 2011",
        "Entered orbit around Vesta",
        "Dawn became the first spacecraft to orbit an object in the main asteroid belt.",
        [DAWN, DAWN_NSSDCA]
      ),
      event(
        "dawn-vesta-departure",
        "milestone",
        "2012-09-05",
        "5 September 2012",
        "Departed Vesta",
        "Dawn left Vesta and began its cruise to Ceres using its ion engines.",
        [DAWN_NSSDCA]
      ),
      event(
        "dawn-ceres-arrival",
        "orbit-insertion",
        "2015-03-06",
        "6 March 2015",
        "Entered orbit around Ceres",
        "Dawn arrived at Ceres and began a sequence of lower science orbits.",
        [DAWN, DAWN_NSSDCA]
      ),
      event(
        "dawn-end",
        "end-of-mission",
        "2018-10-31",
        "31 October 2018",
        "End of mission",
        "After the hydrazine supply was exhausted, NASA retired Dawn in its stable orbit around Ceres.",
        [DAWN, DAWN_NSSDCA]
      ),
    ],
    scientificContributions: [
      {
        kind: "science",
        title: "First orbiter of two extraterrestrial bodies",
        summary:
          "Dawn showed that a single spacecraft could orbit one world, leave it and orbit another, a first for planetary exploration.",
      },
      {
        kind: "engineering",
        title: "Ion propulsion as a planetary mission tool",
        summary:
          "Dawn's xenon ion engines provided the long, gentle thrust needed to reach and maneuver around two bodies in the asteroid belt.",
      },
      {
        kind: "science",
        title: "Two windows into the early solar system",
        summary:
          "Vesta's dry, rocky surface and Ceres' ice-rich crust gave scientists two different records of how small worlds formed and evolved.",
      },
    ],
    fate:
      "Dawn is inactive in a stable orbit around Ceres. It has no fuel and no working communications link, and NASA expects its orbit to remain stable for centuries.",
    location: {
      body: "Ceres",
      locationName: "Stable orbit around Ceres",
      precision: "region",
      note: "The spacecraft is not tracked as an active mission; its orbit is described rather than plotted as a live position.",
    },
    technicalDetails: [
      { label: "Mission type", value: "Asteroid-belt orbiter" },
      { label: "Launch vehicle", value: "Delta II 7925-H" },
      { label: "Dry mass", value: "747.1 kg" },
      { label: "Launch mass", value: "1,217.7 kg" },
      { label: "Power", value: "Two solar arrays; ion propulsion" },
      { label: "Vesta arrival", value: "16 July 2011" },
      { label: "Ceres arrival", value: "6 March 2015" },
      { label: "Last contact", value: "31 October 2018" },
    ],
    media: image(
      "/images/dawn.jpg",
      "Technicians secure the Dawn spacecraft onto a movable stand in a clean room before launch.",
      "The Dawn spacecraft during processing at Astrotech's payload facility in 2007, before its launch to Vesta and Ceres.",
      "NASA/KSC",
      "KSC-07PD-0859",
      1063,
      1600
    ),
    relatedIds: ["near-shoemaker", "kepler", "new-horizons"],
    sourceIds: [DAWN, DAWN_NSSDCA],
    lastVerified: "2026-11-13",
    dataNotes: [
      "Dawn is not on a planetary surface: it remains in orbit around Ceres without fuel or communications.",
      "The mission ended when the hydrazine supply was exhausted; the end date is the last communications date.",
    ],
  }),

  defineArtifact({
    id: "near-shoemaker",
    name: "NEAR Shoemaker",
    alternateNames: [
      "Near Earth Asteroid Rendezvous — Shoemaker",
      "NEAR",
    ],
    missionName: "NEAR Shoemaker",
    programName: "Discovery Program",
    destination: "Asteroid 433 Eros",
    destinationGroup: "deep-space",
    hardwareType: "orbiter",
    shortDescription:
      "The first spacecraft to orbit an asteroid and the first to touch down on one.",
    overview:
      "NEAR Shoemaker launched in 1996 and became the first spacecraft to orbit an asteroid when it arrived at 433 Eros in 2000. Although it was not designed to land, controllers guided it to a gentle touchdown in February 2001. It survived and returned data for about two weeks before the cold ended the mission.",
    scientificPurpose:
      "NEAR was designed to measure Eros' bulk properties, composition, mineralogy, surface shape, internal mass distribution and magnetic field, and to study how a near-Earth asteroid relates to meteorites.",
    missionStatus: "completed",
    missionStatusOriginal:
      "NASA describes NEAR as the first spacecraft to orbit an asteroid and the first to land on one. The mission ended after touchdown in 2001.",
    hardwareStatus: "inactive",
    hardwareStatusOriginal:
      "The spacecraft landed on Eros and returned data for about two weeks. The last contact was on 28 February 2001.",
    launchDate: "1996-02-17",
    arrivalDate: "2000-02-14",
    missionEndDate: "2001-02-28",
    lastContactDate: "2001-02-28",
    primaryMilestone: event(
      "near-orbit",
      "orbit-insertion",
      "2000-02-14",
      "14 February 2000",
      "First orbit of an asteroid",
      "NEAR became the first human-made object to orbit an asteroid when it entered orbit around 433 Eros.",
      [NEAR, NEAR_NSSDCA]
    ),
    timelineEvents: [
      event(
        "near-launch",
        "launch",
        "1996-02-17",
        "17 February 1996",
        "Launched from Cape Canaveral",
        "A Delta II 7925-8 launched NEAR on the first mission of NASA's Discovery program.",
        [NEAR, NEAR_NSSDCA]
      ),
      event(
        "near-mathilde",
        "flyby",
        "1997-06-27",
        "27 June 1997",
        "Flyby of asteroid Mathilde",
        "NEAR passed about 1,200 km from asteroid 253 Mathilde and photographed much of its cratered surface.",
        [NEAR, NEAR_NSSDCA]
      ),
      event(
        "near-earth-assist",
        "flyby",
        "1998-01-23",
        "23 January 1998",
        "Earth gravity assist",
        "NEAR passed about 540 km from Earth, changing its trajectory toward Eros.",
        [NEAR, NEAR_NSSDCA]
      ),
      event(
        "near-eros-flyby",
        "flyby",
        "1998-12-23",
        "23 December 1998",
        "First flyby of Eros",
        "A delayed trajectory gave NEAR an early close look at Eros before orbit insertion.",
        [NEAR, NEAR_NSSDCA]
      ),
      event(
        "near-orbit",
        "orbit-insertion",
        "2000-02-14",
        "14 February 2000",
        "Entered orbit around Eros",
        "NEAR became the first spacecraft to orbit an asteroid.",
        [NEAR, NEAR_NSSDCA]
      ),
      event(
        "near-landing",
        "landing",
        "2001-02-12",
        "12 February 2001",
        "Touchdown on Eros",
        "NEAR made a controlled descent and landed south of the Himeros saddle, despite not being designed as a lander.",
        [NEAR, NEAR_NSSDCA]
      ),
      event(
        "near-last-contact",
        "last-contact",
        "2001-02-28",
        "28 February 2001",
        "Last contact",
        "The spacecraft stopped responding after exposure to the cold; a later contact attempt in 2002 also failed.",
        [NEAR, NEAR_NSSDCA]
      ),
    ],
    scientificContributions: [
      {
        kind: "engineering",
        title: "First orbit and first landing on an asteroid",
        summary:
          "NEAR demonstrated that a spacecraft could rendezvous with, orbit and touch down on a small body.",
      },
      {
        kind: "science",
        title: "A detailed portrait of Eros",
        summary:
          "The mission mapped more than 70 percent of Eros, returned about 160,000 images and found no detectable magnetic field.",
      },
      {
        kind: "science",
        title: "Linked an asteroid to meteorites",
        summary:
          "NEAR's composition measurements helped connect Eros, an S-class asteroid, to the most common meteorites found on Earth.",
      },
    ],
    fate:
      "NEAR Shoemaker rests on the surface of asteroid 433 Eros, south of the Himeros saddle. It stopped communicating on 28 February 2001.",
    location: {
      body: "Asteroid 433 Eros",
      locationName: "Surface of Eros, south of the Himeros saddle",
      precision: "region",
      note: "The landing site is described by region; GRAVERSE does not plot an invented exact coordinate.",
    },
    technicalDetails: [
      { label: "Mission type", value: "Asteroid rendezvous, orbiter and lander" },
      { label: "Launch vehicle", value: "Delta II 7925-8" },
      { label: "Launch mass", value: "805 kg" },
      { label: "Dry mass", value: "About 487 kg" },
      { label: "Power", value: "Solar cells" },
      { label: "Orbit insertion", value: "14 February 2000" },
      { label: "Touchdown", value: "12 February 2001" },
      { label: "Last contact", value: "28 February 2001" },
    ],
    media: image(
      "/images/near-shoemaker.jpg",
      "Artist's concept of the NEAR spacecraft approaching asteroid Eros.",
      "An artist's concept of NEAR Shoemaker at asteroid Eros. The spacecraft became the first to orbit and land on an asteroid.",
      "NASA/JPL-Caltech",
      "PIA18177",
      1600,
      1213,
      true
    ),
    relatedIds: ["dawn", "kepler", "opportunity"],
    sourceIds: [NEAR, NEAR_NSSDCA],
    lastVerified: "2026-11-13",
    dataNotes: [
      "NEAR was designed as an orbiter, not a lander. The touchdown was an extended-mission decision, and the spacecraft survived it.",
      "NASA's mission page lists a spacecraft mass of 805 kg; NSSDCA lists 487 kg. The record gives both rather than choosing one silently.",
      "The image is an artist's concept, not a photograph of the spacecraft at Eros.",
    ],
  }),

  defineArtifact({
    id: "kepler",
    name: "Kepler Space Telescope",
    alternateNames: ["Kepler", "Kepler/K2"],
    missionName: "Kepler",
    programName: "Discovery Program",
    destination: "Earth-trailing heliocentric orbit",
    destinationGroup: "deep-space",
    hardwareType: "probe",
    shortDescription:
      "NASA's first planet-hunting space telescope, which showed that planets are common around other stars.",
    overview:
      "Kepler launched in 2009 to search for Earth-sized planets by watching the brightness of more than 100,000 stars. After the loss of a second reaction wheel in 2013, engineers devised the K2 mission, which used sunlight pressure to keep the telescope stable. Kepler ran out of fuel in 2018 and was retired in its Earth-trailing orbit.",
    scientificPurpose:
      "Kepler was designed to detect transiting exoplanets, measure their sizes and orbital periods, and estimate how common Earth-sized planets are in the habitable zones of their stars.",
    missionStatus: "completed",
    missionStatusOriginal:
      "NASA retired the Kepler spacecraft on 30 October 2018 after it ran out of fuel for further science operations.",
    hardwareStatus: "inactive",
    hardwareStatusOriginal:
      "Kepler has no fuel and no active science operations. It remains in a safe, Earth-trailing heliocentric orbit.",
    launchDate: "2009-03-06",
    missionEndDate: "2018-10-30",
    lastContactDate: "2018-10-30",
    primaryMilestone: event(
      "kepler-retirement",
      "end-of-mission",
      "2018-10-30",
      "30 October 2018",
      "Retired after nine years",
      "With its fuel exhausted, Kepler was retired in its current safe orbit after completing the K2 mission.",
      [KEPLER, KEPLER_NSSDCA]
    ),
    timelineEvents: [
      event(
        "kepler-launch",
        "launch",
        "2009-03-06",
        "6 March 2009",
        "Launched from Cape Canaveral",
        "A Delta II launched Kepler into an Earth-trailing heliocentric orbit. NSSDCA records the launch at 03:50 UT on 7 March.",
        [KEPLER, KEPLER_NSSDCA]
      ),
      event(
        "kepler-first-planets",
        "milestone",
        "2010-01-04",
        "4 January 2010",
        "First five exoplanets announced",
        "Kepler's first discoveries included five planets larger than Jupiter, announced after the first six weeks of operation.",
        [KEPLER]
      ),
      event(
        "kepler-wheel-failure",
        "milestone",
        "2013-05-11",
        "May 2013",
        "Lost a second reaction wheel",
        "The failure ended the original mission's ability to hold a fixed field of view, but led to the K2 mission.",
        [KEPLER]
      ),
      event(
        "kepler-k2",
        "milestone",
        "2014-05-30",
        "May 2014",
        "K2 mission begins",
        "Engineers used solar radiation pressure to stabilize the spacecraft along the ecliptic, giving Kepler a second mission.",
        [KEPLER],
        "month"
      ),
      event(
        "kepler-retirement",
        "end-of-mission",
        "2018-10-30",
        "30 October 2018",
        "Retired",
        "NASA retired Kepler after the spacecraft ran out of fuel, ending nine years of exoplanet observations.",
        [KEPLER, KEPLER_NSSDCA]
      ),
    ],
    scientificContributions: [
      {
        kind: "science",
        title: "More than 2,600 confirmed planets",
        summary:
          "Kepler's transit survey produced a large share of the known exoplanets and showed that most stars have planets.",
      },
      {
        kind: "science",
        title: "Earth-sized worlds in habitable zones",
        summary:
          "Kepler found the first Earth-sized planets in the habitable zones of their stars, a major step toward understanding where life might exist.",
      },
      {
        kind: "engineering",
        title: "A second mission from a failed pointing system",
        summary:
          "The K2 mission used sunlight pressure as a virtual reaction wheel, extending the telescope's life by years.",
      },
    ],
    fate:
      "Kepler is inactive in an Earth-trailing heliocentric orbit. It has no fuel and is not expected to return to service.",
    location: {
      body: "Heliocentric orbit",
      locationName: "Earth-trailing heliocentric orbit",
      precision: "region",
      note: "The orbit trails Earth around the Sun; its exact position changes continuously and is not plotted here.",
    },
    technicalDetails: [
      { label: "Mission type", value: "Exoplanet transit observatory" },
      { label: "Launch vehicle", value: "Delta II" },
      { label: "Mass", value: "About 1,052 kg" },
      { label: "Telescope aperture", value: "About 1.4 m" },
      { label: "Orbit", value: "Earth-trailing heliocentric, about 372.5 days" },
      { label: "Original mission", value: "2009–2013" },
      { label: "K2 mission", value: "2014–2018" },
      { label: "Retirement", value: "30 October 2018" },
    ],
    media: image(
      "/images/kepler.jpg",
      "The Kepler spacecraft in a clean room at Ball Aerospace before launch.",
      "NASA's Kepler spacecraft at Ball Aerospace & Technologies Corp. in Boulder, Colorado, before launch.",
      "NASA/JPL-Caltech/Ball",
      "PIA11733",
      1071,
      1600
    ),
    relatedIds: ["dawn", "near-shoemaker", "new-horizons"],
    sourceIds: [KEPLER, KEPLER_NSSDCA],
    lastVerified: "2026-11-13",
    dataNotes: [
      "NASA Science gives the launch date as 6 March 2009; NSSDCA gives 7 March 2009 at 03:50 UT. Both refer to the same launch in different time zones.",
      "Kepler is not in orbit around Earth. It trails Earth in a heliocentric orbit.",
      "Retirement is not destruction: the spacecraft remains in a safe orbit without fuel or an active science mission.",
    ],
  }),
];
