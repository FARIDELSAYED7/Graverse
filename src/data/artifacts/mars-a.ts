import { defineArtifact, event, image } from "./helpers";

const VIKING = "SRC-VIKING";
const PATHFINDER = "SRC-MARS-PATHFINDER";

export const marsArtifactsA = [
  defineArtifact({
    id: "viking-1-lander",
    name: "Viking 1 Lander",
    alternateNames: ["Viking Lander 1"],
    missionName: "Viking 1",
    programName: "Viking Program",
    destination: "Mars",
    destinationGroup: "mars",
    hardwareType: "lander",
    shortDescription:
      "The first spacecraft to land successfully on Mars and return images and data from the surface.",
    overview:
      "Viking 1 landed in Chryse Planitia on 20 July 1976, seven years to the day after Apollo 11 landed on the Moon. The lander returned the first images from the Martian surface and ran a set of biology experiments designed to look for signs of life. It operated for more than six years, far beyond its planned lifetime.",
    scientificPurpose:
      "Viking 1 was designed to image the Martian surface, study the atmosphere and weather, analyze soil chemistry and search for evidence of biological activity.",
    missionStatus: "completed",
    missionStatusOriginal:
      "NASA lists Viking 1 as a completed mission; the lander operated until 1982.",
    hardwareStatus: "inactive",
    hardwareStatusOriginal:
      "The lander stopped communicating in November 1982 and remains on Mars.",
    launchDate: "1975-08-20",
    arrivalDate: "1976-07-20",
    missionEndDate: "1982-11-13",
    lastContactDate: "1982-11-13",
    primaryMilestone: event(
      "viking1-landing",
      "landing",
      "1976-07-20",
      "20 July 1976",
      "First successful Mars landing",
      "Viking 1 touched down in Chryse Planitia and began returning surface data.",
      [VIKING, "SRC-NSSDCA-VIKING-1"]
    ),
    timelineEvents: [
      event(
        "viking1-launch",
        "launch",
        "1975-08-20",
        "20 August 1975",
        "Launched from Earth",
        "A Titan IIIE-Centaur launched the Viking 1 spacecraft.",
        [VIKING, "SRC-NSSDCA-VIKING-1"]
      ),
      event(
        "viking1-landing",
        "landing",
        "1976-07-20",
        "20 July 1976",
        "Landed in Chryse Planitia",
        "Viking 1 became the first spacecraft to land successfully on Mars.",
        [VIKING]
      ),
      event(
        "viking1-last-contact",
        "last-contact",
        "1982-11-13",
        "13 November 1982",
        "Last contact",
        "The lander stopped communicating after years of surface operations.",
        ["SRC-NSSDCA-VIKING-1"]
      ),
    ],
    scientificContributions: [
      {
        kind: "science",
        title: "First images from the Martian surface",
        summary:
          "Viking 1 returned the first photographs taken from the surface of Mars.",
      },
      {
        kind: "science",
        title: "Ran the first Mars biology experiments",
        summary:
          "The lander's biology instruments tested soil samples for signs of metabolic activity; the results remain debated.",
      },
      {
        kind: "science",
        title: "Tracked Martian weather",
        summary:
          "Viking 1 recorded temperature, pressure, wind and dust at Chryse Planitia for years.",
      },
    ],
    fate:
      "Viking 1 remains on Mars in Chryse Planitia. It stopped communicating in November 1982 and is inactive.",
    location: {
      body: "Mars",
      locationName: "Chryse Planitia",
      precision: "region",
      note: "The landing region is documented; no coordinate pair is plotted here.",
    },
    technicalDetails: [
      { label: "Mission type", value: "Orbiter and lander" },
      { label: "Launch vehicle", value: "Titan IIIE-Centaur" },
      { label: "Lander mass", value: "About 576 kg" },
      { label: "Landing site", value: "Chryse Planitia" },
      { label: "Last contact", value: "13 November 1982" },
    ],
    media: image(
      "/images/viking-1-lander.jpg",
      "Technicians prepare to remove the aeroshell cover from Viking Lander 1 in a clean room.",
      "Technicians prepare to remove Viking Lander 1's aeroshell cover at Kennedy Space Center's Spacecraft Assembly and Encapsulation Facility 2.",
      "NASA",
      "101-KSC-75P-12",
      1600,
      1253
    ),
    relatedIds: ["viking-2-lander", "mars-pathfinder-lander", "phoenix"],
    sourceIds: [VIKING, "SRC-NSSDCA-VIKING-1"],
    dataNotes: [
      "The Viking biology results were not a definitive detection of life; NASA describes them as ambiguous and still discussed.",
      "The image shows the lander during ground processing, not on Mars.",
    ],
  }),

  defineArtifact({
    id: "viking-2-lander",
    name: "Viking 2 Lander",
    alternateNames: ["Viking Lander 2"],
    missionName: "Viking 2",
    programName: "Viking Program",
    destination: "Mars",
    destinationGroup: "mars",
    hardwareType: "lander",
    shortDescription:
      "The second Viking lander, which touched down at Utopia Planitia and studied the Martian surface and atmosphere.",
    overview:
      "Viking 2 landed at Utopia Planitia on 3 September 1976, a few weeks after Viking 1. It carried the same camera, weather and biology instruments and operated until 1980. Together the two landers gave NASA its first long-term view of conditions on the Martian surface.",
    scientificPurpose:
      "Viking 2 was designed to study the geology, atmosphere, weather and soil chemistry at a second Martian site and to continue the search for biological activity.",
    missionStatus: "completed",
    missionStatusOriginal:
      "NASA lists Viking 2 as a completed mission; the lander operated until 1980.",
    hardwareStatus: "inactive",
    hardwareStatusOriginal:
      "The lander stopped communicating in April 1980 and remains on Mars.",
    launchDate: "1975-09-09",
    arrivalDate: "1976-09-03",
    missionEndDate: "1980-04-11",
    lastContactDate: "1980-04-11",
    primaryMilestone: event(
      "viking2-landing",
      "landing",
      "1976-09-03",
      "3 September 1976",
      "Landed at Utopia Planitia",
      "Viking 2 touched down at a second Martian site and began surface operations.",
      [VIKING, "SRC-NSSDCA-VIKING-2"]
    ),
    timelineEvents: [
      event(
        "viking2-launch",
        "launch",
        "1975-09-09",
        "9 September 1975",
        "Launched from Earth",
        "A Titan IIIE-Centaur launched the Viking 2 spacecraft.",
        [VIKING, "SRC-NSSDCA-VIKING-2"]
      ),
      event(
        "viking2-landing",
        "landing",
        "1976-09-03",
        "3 September 1976",
        "Landed at Utopia Planitia",
        "Viking 2 began its surface mission.",
        [VIKING]
      ),
      event(
        "viking2-last-contact",
        "last-contact",
        "1980-04-11",
        "11 April 1980",
        "Last contact",
        "The lander stopped communicating after its extended mission.",
        ["SRC-NSSDCA-VIKING-2"]
      ),
    ],
    scientificContributions: [
      {
        kind: "science",
        title: "A second surface laboratory",
        summary:
          "Viking 2 provided a second set of images, weather records and soil measurements from a different Martian region.",
      },
      {
        kind: "science",
        title: "Observed frost and seasonal change",
        summary:
          "The lander's cameras and weather sensors recorded seasonal changes at Utopia Planitia.",
      },
    ],
    fate:
      "Viking 2 remains on Mars at Utopia Planitia. It stopped communicating in April 1980 and is inactive.",
    location: {
      body: "Mars",
      locationName: "Utopia Planitia",
      precision: "region",
      note: "The landing region is documented; no coordinate pair is plotted here.",
    },
    technicalDetails: [
      { label: "Mission type", value: "Orbiter and lander" },
      { label: "Launch vehicle", value: "Titan IIIE-Centaur" },
      { label: "Lander mass", value: "About 576 kg" },
      { label: "Landing site", value: "Utopia Planitia" },
      { label: "Last contact", value: "11 April 1980" },
    ],
    media: image(
      "/images/viking-2-lander.jpg",
      "Technicians inspect Viking Lander 2 in a clean room at Kennedy Space Center.",
      "Technicians inspect Viking Lander 2 in Kennedy Space Center's Spacecraft Assembly and Encapsulation Facility 1 before launch.",
      "NASA",
      "101-KSC-75P-110",
      1600,
      1281
    ),
    relatedIds: ["viking-1-lander", "phoenix", "mars-pathfinder-lander"],
    sourceIds: [VIKING, "SRC-NSSDCA-VIKING-2"],
    dataNotes: [
      "Viking 2 landed at a different site from Viking 1, which is why the two records are kept separate.",
    ],
  }),

  defineArtifact({
    id: "mars-pathfinder-lander",
    name: "Mars Pathfinder Lander",
    alternateNames: ["Pathfinder", "Mars Environmental Survey Pathfinder"],
    missionName: "Mars Pathfinder",
    programName: "Discovery Program",
    destination: "Mars",
    destinationGroup: "mars",
    hardwareType: "lander",
    shortDescription:
      "A low-cost lander that used airbags to reach the surface and deployed the Sojourner rover.",
    overview:
      "Mars Pathfinder landed at Ares Vallis on 4 July 1997 using a novel airbag system. The stationary lander served as a weather station and communications relay while its small rover, Sojourner, explored nearby rocks. The mission captured public attention and demonstrated a faster, cheaper approach to Mars exploration.",
    scientificPurpose:
      "Pathfinder was designed to demonstrate a low-cost landing system and to study the geology, rocks and atmosphere at a site where ancient floods had deposited material.",
    missionStatus: "completed",
    missionStatusOriginal:
      "NASA lists Mars Pathfinder as a completed mission.",
    hardwareStatus: "inactive",
    hardwareStatusOriginal:
      "The lander stopped communicating in September 1997 and remains at Ares Vallis.",
    launchDate: "1996-12-04",
    arrivalDate: "1997-07-04",
    missionEndDate: "1997-09-27",
    lastContactDate: "1997-09-27",
    primaryMilestone: event(
      "pathfinder-landing",
      "landing",
      "1997-07-04",
      "4 July 1997",
      "Airbag landing at Ares Vallis",
      "Pathfinder bounced to a stop and began its surface mission.",
      [PATHFINDER, "SRC-NSSDCA-MARS-PATHFINDER"]
    ),
    timelineEvents: [
      event(
        "pathfinder-launch",
        "launch",
        "1996-12-04",
        "4 December 1996",
        "Launched from Earth",
        "A Delta II launched the Mars Pathfinder spacecraft.",
        [PATHFINDER, "SRC-NSSDCA-MARS-PATHFINDER"]
      ),
      event(
        "pathfinder-landing",
        "landing",
        "1997-07-04",
        "4 July 1997",
        "Landed at Ares Vallis",
        "Pathfinder reached the surface using airbags.",
        [PATHFINDER]
      ),
      event(
        "pathfinder-rover",
        "deployment",
        "1997-07-06",
        "6 July 1997",
        "Sojourner deployed",
        "The rover rolled off the lander and began exploring nearby rocks.",
        [PATHFINDER, "SRC-NSSDCA-MARS-PATHFINDER"]
      ),
      event(
        "pathfinder-last-contact",
        "last-contact",
        "1997-09-27",
        "27 September 1997",
        "Last contact",
        "The lander stopped communicating after its extended mission.",
        ["SRC-NSSDCA-MARS-PATHFINDER"]
      ),
    ],
    scientificContributions: [
      {
        kind: "engineering",
        title: "Demonstrated airbag landing",
        summary:
          "Pathfinder proved that a spacecraft could survive a Mars landing by bouncing across the surface inside airbags.",
      },
      {
        kind: "science",
        title: "Studied flood-deposited rocks",
        summary:
          "The lander and rover examined rocks and soil at Ares Vallis, a region shaped by ancient water flows.",
      },
      {
        kind: "engineering",
        title: "Showed a small rover could work on Mars",
        summary:
          "Sojourner's success helped pave the way for the larger Mars Exploration Rovers.",
      },
    ],
    fate:
      "The Pathfinder lander remains at Ares Vallis. It stopped communicating in September 1997; its final condition has not been documented.",
    location: {
      body: "Mars",
      locationName: "Ares Vallis",
      precision: "region",
      note: "The landing region is documented; no coordinate pair is plotted here.",
    },
    technicalDetails: [
      { label: "Mission type", value: "Stationary lander with rover" },
      { label: "Launch vehicle", value: "Delta II" },
      { label: "Lander mass", value: "About 264 kg" },
      { label: "Landing system", value: "Airbags" },
      { label: "Rover", value: "Sojourner, about 10.6 kg" },
      { label: "Last contact", value: "27 September 1997" },
    ],
    media: image(
      "/images/mars-pathfinder-lander.jpg",
      "A composite showing the Mars Pathfinder lander during testing and on the Martian surface.",
      "The Mars Pathfinder lander shown in test configuration and on Mars. The mission used airbags to reach the surface at Ares Vallis.",
      "NASA/JPL-Caltech",
      "PIA01550",
      1600,
      1229
    ),
    relatedIds: ["sojourner", "viking-1-lander", "spirit"],
    sourceIds: [PATHFINDER, "SRC-NSSDCA-MARS-PATHFINDER"],
    dataNotes: [
      "Pathfinder and Sojourner are separate artifacts in this dataset because the lander and rover had different roles and operating histories.",
    ],
  }),

  defineArtifact({
    id: "sojourner",
    name: "Sojourner Rover",
    alternateNames: ["Microrover Flight Experiment", "MFEX"],
    missionName: "Mars Pathfinder",
    programName: "Discovery Program",
    destination: "Mars",
    destinationGroup: "mars",
    hardwareType: "rover",
    shortDescription:
      "A small, six-wheeled rover that became the first wheeled vehicle to operate on another planet.",
    overview:
      "Sojourner traveled to Mars attached to the Mars Pathfinder lander and rolled onto the surface on 6 July 1997. It was designed for a short technology demonstration but operated for weeks, examining rocks and soil with its camera and alpha-particle X-ray spectrometer.",
    scientificPurpose:
      "The rover was a technology experiment designed to prove that a small vehicle could drive on Mars and place an instrument against rocks for close-up analysis.",
    missionStatus: "completed",
    missionStatusOriginal:
      "NASA lists the Mars Pathfinder mission, including Sojourner, as completed.",
    hardwareStatus: "inactive",
    hardwareStatusOriginal:
      "The rover stopped operating when the lander lost contact in September 1997; it remains at Ares Vallis.",
    launchDate: "1996-12-04",
    arrivalDate: "1997-07-04",
    missionEndDate: "1997-09-27",
    lastContactDate: "1997-09-27",
    primaryMilestone: event(
      "sojourner-deploy",
      "deployment",
      "1997-07-06",
      "6 July 1997",
      "First drive on another planet",
      "Sojourner rolled off the Pathfinder lander onto the Martian surface.",
      [PATHFINDER, "SRC-NSSDCA-MARS-PATHFINDER"]
    ),
    timelineEvents: [
      event(
        "sojourner-launch",
        "launch",
        "1996-12-04",
        "4 December 1996",
        "Launched with Pathfinder",
        "Sojourner traveled to Mars attached to the Pathfinder lander.",
        [PATHFINDER]
      ),
      event(
        "sojourner-arrival",
        "landing",
        "1997-07-04",
        "4 July 1997",
        "Arrived at Ares Vallis",
        "The Pathfinder lander reached Mars with the rover aboard.",
        [PATHFINDER]
      ),
      event(
        "sojourner-deploy",
        "first-operation",
        "1997-07-06",
        "6 July 1997",
        "Rover deployed",
        "Sojourner became the first wheeled vehicle to operate on another planet.",
        [PATHFINDER, "SRC-NSSDCA-MARS-PATHFINDER"]
      ),
      event(
        "sojourner-last-contact",
        "last-contact",
        "1997-09-27",
        "27 September 1997",
        "Last contact",
        "The lander stopped communicating, ending rover operations.",
        ["SRC-NSSDCA-MARS-PATHFINDER"]
      ),
    ],
    scientificContributions: [
      {
        kind: "engineering",
        title: "First wheeled rover on another planet",
        summary:
          "Sojourner demonstrated that a small robotic vehicle could drive and work on Mars.",
      },
      {
        kind: "science",
        title: "Analyzed rocks and soil",
        summary:
          "The rover's spectrometer measured the composition of rocks near the lander.",
      },
    ],
    fate:
      "Sojourner remains at Ares Vallis with the Pathfinder lander. It stopped operating in September 1997 and is inactive.",
    location: {
      body: "Mars",
      locationName: "Ares Vallis",
      precision: "region",
      note: "The operating region is documented; no coordinate pair is plotted here.",
    },
    technicalDetails: [
      { label: "Mission type", value: "Small technology-demonstration rover" },
      { label: "Mass", value: "About 10.6 kg" },
      { label: "Dimensions", value: "About 65 cm long, 48 cm wide and 30 cm high" },
      { label: "Power", value: "Solar panel and batteries" },
      { label: "Mobility", value: "Six wheels; about 100 m driven" },
      { label: "Operating period", value: "July to September 1997" },
    ],
    media: image(
      "/images/sojourner.jpg",
      "The Sojourner rover sits beside a rock nicknamed Wedge in the Rock Garden at Ares Vallis.",
      "Sojourner approaches the rock Wedge in the Rock Garden at Ares Vallis, photographed by the Pathfinder lander's Imager for Mars Pathfinder.",
      "NASA/JPL-Caltech",
      "PIA04318",
      819,
      415
    ),
    relatedIds: ["mars-pathfinder-lander", "spirit", "opportunity"],
    sourceIds: [PATHFINDER, "SRC-NSSDCA-MARS-PATHFINDER"],
    dataNotes: [
      "Sojourner was designed as a short technology demonstration but operated for about 83 sols.",
      "The rover remains on Mars with the Pathfinder lander.",
    ],
  }),

  defineArtifact({
    id: "spirit",
    name: "Spirit Rover",
    alternateNames: ["Mars Exploration Rover A", "MER-A"],
    missionName: "Mars Exploration Rover - Spirit",
    programName: "Mars Exploration Program",
    destination: "Mars",
    destinationGroup: "mars",
    hardwareType: "rover",
    shortDescription:
      "A solar-powered rover that found evidence of past water at Gusev Crater and kept working years beyond its planned mission.",
    overview:
      "Spirit landed at Gusev Crater in January 2004. It was designed for a 90-sol mission but operated for more than six years, studying volcanic rocks, driving to Husband Hill and uncovering evidence that water had once altered the local geology. It became stuck in soft soil in 2009 and eventually stopped communicating.",
    scientificPurpose:
      "Spirit was sent to investigate whether Gusev Crater had once been a lake or otherwise had conditions that could support life, and to study the geology and atmosphere of Mars.",
    missionStatus: "completed",
    missionStatusOriginal:
      "NASA declared the mission over in 2011 after the rover stopped communicating.",
    hardwareStatus: "inactive",
    hardwareStatusOriginal:
      "The rover stopped communicating in March 2010 and remains on Mars.",
    launchDate: "2003-06-10",
    arrivalDate: "2004-01-04",
    missionEndDate: "2010-03-22",
    lastContactDate: "2010-03-22",
    primaryMilestone: event(
      "spirit-landing",
      "landing",
      "2004-01-04",
      "4 January 2004",
      "Landed at Gusev Crater",
      "Spirit began its investigation of a crater that may once have held a lake.",
      ["SRC-SPIRIT", "SRC-NSSDCA-SPIRIT"]
    ),
    timelineEvents: [
      event(
        "spirit-launch",
        "launch",
        "2003-06-10",
        "10 June 2003",
        "Launched from Earth",
        "A Delta II launched Spirit toward Mars.",
        ["SRC-SPIRIT", "SRC-NSSDCA-SPIRIT"]
      ),
      event(
        "spirit-landing",
        "landing",
        "2004-01-04",
        "4 January 2004",
        "Landed at Gusev Crater",
        "Spirit began its surface mission.",
        ["SRC-SPIRIT"]
      ),
      event(
        "spirit-husband",
        "milestone",
        "2005-08-21",
        "August 2005",
        "Reached Husband Hill",
        "The rover climbed to a vantage point overlooking Gusev Crater.",
        ["SRC-SPIRIT"],
        "month"
      ),
      event(
        "spirit-last-contact",
        "last-contact",
        "2010-03-22",
        "22 March 2010",
        "Last contact",
        "Spirit stopped communicating after becoming stuck in soft soil.",
        ["SRC-SPIRIT", "SRC-NSSDCA-SPIRIT"]
      ),
      event(
        "spirit-end",
        "end-of-mission",
        "2011-05-25",
        "25 May 2011",
        "Mission ended",
        "NASA concluded the mission after repeated attempts to restore contact.",
        ["SRC-SPIRIT"]
      ),
    ],
    scientificContributions: [
      {
        kind: "science",
        title: "Found evidence of past water",
        summary:
          "Spirit's instruments identified minerals and rock textures formed with the help of water.",
      },
      {
        kind: "science",
        title: "Studied a Martian volcano",
        summary:
          "The rover examined volcanic rocks and altered deposits around Gusev Crater.",
      },
      {
        kind: "engineering",
        title: "Far exceeded its design life",
        summary:
          "Spirit operated for more than six years despite a planned 90-sol mission.",
      },
    ],
    fate:
      "Spirit is inactive at Gusev Crater. It became embedded in soft soil, could not free itself, and stopped communicating in March 2010. NASA ended the mission in 2011.",
    location: {
      body: "Mars",
      locationName: "Gusev Crater",
      precision: "region",
      note: "The landing region is documented; the rover's final position is not plotted here.",
    },
    technicalDetails: [
      { label: "Mission type", value: "Solar-powered rover" },
      { label: "Mass", value: "About 185 kg" },
      { label: "Power", value: "Solar arrays and batteries" },
      { label: "Distance driven", value: "About 7.73 km" },
      { label: "Landing site", value: "Gusev Crater" },
      { label: "Last contact", value: "22 March 2010" },
    ],
    media: image(
      "/images/spirit.jpg",
      "Spirit takes a self-portrait on Mars, with the rover's solar panels and instruments visible.",
      "Spirit's self-portrait, assembled from images taken around sols 329 and 330 of the mission.",
      "NASA/JPL-Caltech/Cornell University",
      "PIA07371",
      1600,
      1458
    ),
    relatedIds: ["opportunity", "curiosity", "perseverance"],
    sourceIds: ["SRC-SPIRIT", "SRC-NSSDCA-SPIRIT"],
    dataNotes: [
      "Spirit and Opportunity were twin rovers but landed at different sites and had separate operating histories.",
      "The rover remains on Mars; 'inactive' describes its operating state.",
    ],
  }),

  defineArtifact({
    id: "opportunity",
    name: "Opportunity Rover",
    alternateNames: ["Mars Exploration Rover B", "MER-B", "Oppy"],
    missionName: "Mars Exploration Rover - Opportunity",
    programName: "Mars Exploration Program",
    destination: "Mars",
    destinationGroup: "mars",
    hardwareType: "rover",
    shortDescription:
      "A long-lived rover that explored Meridiani Planum for nearly 15 years and set a distance record on another world.",
    overview:
      "Opportunity landed at Meridiani Planum on 25 January 2004, three weeks after Spirit. It found evidence that liquid water had once existed at its landing site and went on to explore craters and outcrops for nearly 15 years. A planet-wide dust storm in 2018 cut off its power, and NASA ended the mission in 2019.",
    scientificPurpose:
      "Opportunity was sent to study sedimentary rocks at Meridiani Planum and determine whether the region had once been wet enough to support life.",
    missionStatus: "completed",
    missionStatusOriginal:
      "NASA declared the mission over on 13 February 2019 after the rover stopped communicating.",
    hardwareStatus: "no-longer-communicating",
    hardwareStatusOriginal:
      "The rover last communicated on 10 June 2018 during a global dust storm. NASA ended recovery efforts in February 2019.",
    launchDate: "2003-07-08",
    arrivalDate: "2004-01-25",
    missionEndDate: "2018-06-10",
    lastContactDate: "2018-06-10",
    primaryMilestone: event(
      "opp-landing",
      "landing",
      "2004-01-25",
      "25 January 2004",
      "Landed at Meridiani Planum",
      "Opportunity began its mission at a site rich in sedimentary rock.",
      ["SRC-OPPORTUNITY", "SRC-NSSDCA-OPPORTUNITY"]
    ),
    timelineEvents: [
      event(
        "opp-launch",
        "launch",
        "2003-07-08",
        "8 July 2003 (UTC)",
        "Launched from Earth",
        "A Delta II launched Opportunity toward Mars.",
        ["SRC-OPPORTUNITY", "SRC-NSSDCA-OPPORTUNITY"]
      ),
      event(
        "opp-landing",
        "landing",
        "2004-01-25",
        "25 January 2004",
        "Landed at Meridiani Planum",
        "Opportunity began its surface mission.",
        ["SRC-OPPORTUNITY"]
      ),
      event(
        "opp-water",
        "milestone",
        "2004-03-02",
        "2 March 2004",
        "Evidence of past water",
        "NASA announced that Opportunity had found evidence of a watery past at Meridiani Planum.",
        ["SRC-OPPORTUNITY"]
      ),
      event(
        "opp-last-contact",
        "last-contact",
        "2018-06-10",
        "10 June 2018",
        "Last contact",
        "A global dust storm cut off the rover's solar power.",
        ["SRC-OPPORTUNITY", "SRC-NSSDCA-OPPORTUNITY"]
      ),
      event(
        "opp-end",
        "end-of-mission",
        "2019-02-13",
        "13 February 2019",
        "Mission ended",
        "NASA concluded the mission after months without contact.",
        ["SRC-OPPORTUNITY"]
      ),
    ],
    scientificContributions: [
      {
        kind: "science",
        title: "Found evidence of ancient water",
        summary:
          "Opportunity's study of sedimentary rocks showed that liquid water had once flowed at Meridiani Planum.",
      },
      {
        kind: "science",
        title: "Explored multiple craters",
        summary:
          "The rover examined a series of impact craters that exposed different layers of Martian history.",
      },
      {
        kind: "engineering",
        title: "Set a long-distance driving record",
        summary:
          "Opportunity drove about 45.16 km, a record for a vehicle on another world until Perseverance surpassed it.",
      },
    ],
    fate:
      "Opportunity is inactive at Meridiani Planum. It last communicated on 10 June 2018 after a global dust storm reduced its power. NASA ended the mission on 13 February 2019.",
    location: {
      body: "Mars",
      locationName: "Meridiani Planum",
      precision: "region",
      note: "The landing region is documented; the rover's final position is not plotted here.",
    },
    technicalDetails: [
      { label: "Mission type", value: "Solar-powered rover" },
      { label: "Mass", value: "About 185 kg" },
      { label: "Power", value: "Solar arrays and batteries" },
      { label: "Distance driven", value: "About 45.16 km" },
      { label: "Landing site", value: "Meridiani Planum" },
      { label: "Last contact", value: "10 June 2018" },
    ],
    media: image(
      "/images/opportunity.jpg",
      "Opportunity takes a self-portrait on Mars in January 2014, with its solar panels and rock-strewn ground visible.",
      "A self-portrait by Opportunity in January 2014, about three weeks before the rover completed a decade of work on Mars.",
      "NASA/JPL-Caltech/Cornell University/Arizona State University",
      "PIA17759",
      1600,
      1301
    ),
    relatedIds: ["spirit", "perseverance", "curiosity"],
    sourceIds: ["SRC-OPPORTUNITY", "SRC-NSSDCA-OPPORTUNITY"],
    dataNotes: [
      "NASA's mission page lists a 7 July 2003 launch in U.S. Eastern time; this record uses the UTC date, 8 July 2003.",
      "The rover's last contact was in 2018, but NASA formally ended the mission in 2019; both dates are shown.",
    ],
  }),
];
