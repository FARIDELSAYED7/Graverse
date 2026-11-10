import { defineArtifact, event, image } from "./helpers";

const V2 = "SRC-VOYAGER-2";
const NH = "SRC-NEW-HORIZONS";

export const deepSpaceArtifactsB = [
  defineArtifact({
    id: "voyager-2",
    name: "Voyager 2",
    alternateNames: ["Voyager 2 spacecraft"],
    missionName: "Voyager",
    programName: "Voyager Program",
    destination: "Deep Space",
    destinationGroup: "deep-space",
    hardwareType: "probe",
    shortDescription:
      "The only spacecraft to visit all four giant planets, now exploring interstellar space.",
    overview:
      "Voyager 2 launched in 1977 and went on to fly past Jupiter, Saturn, Uranus and Neptune, making it the only spacecraft to visit all four giant planets. It discovered new moons and rings, studied Neptune's atmosphere, and crossed into interstellar space in 2018. It continues to return data.",
    scientificPurpose:
      "Voyager 2 was designed to explore the outer planets and, after the planetary encounters, to continue outward as part of the Voyager interstellar mission.",
    missionStatus: "ongoing",
    missionStatusOriginal:
      "NASA continues to operate Voyager 2 as an interstellar mission.",
    hardwareStatus: "operating",
    hardwareStatusOriginal:
      "The spacecraft is still communicating and returning data, although some instruments have been turned off to conserve power.",
    launchDate: "1977-08-20",
    arrivalDate: "1979-07-09",
    primaryMilestone: event(
      "v2-neptune",
      "flyby",
      "1989-08-25",
      "25 August 1989",
      "Neptune flyby",
      "Voyager 2 completed the first and only close flyby of Neptune.",
      [V2, "SRC-NSSDCA-VOYAGER-2"]
    ),
    timelineEvents: [
      event(
        "v2-launch",
        "launch",
        "1977-08-20",
        "20 August 1977",
        "Launched from Earth",
        "A Titan IIIE-Centaur launched Voyager 2 from Cape Canaveral.",
        [V2, "SRC-NSSDCA-VOYAGER-2"]
      ),
      event(
        "v2-jupiter",
        "flyby",
        "1979-07-09",
        "9 July 1979",
        "Jupiter flyby",
        "Voyager 2 studied Jupiter and its moons.",
        [V2]
      ),
      event(
        "v2-saturn",
        "flyby",
        "1981-08-25",
        "25 August 1981",
        "Saturn flyby",
        "The spacecraft continued its tour of the giant planets.",
        [V2]
      ),
      event(
        "v2-uranus",
        "flyby",
        "1986-01-24",
        "24 January 1986",
        "Uranus flyby",
        "Voyager 2 became the first spacecraft to fly past Uranus.",
        [V2]
      ),
      event(
        "v2-neptune",
        "flyby",
        "1989-08-25",
        "25 August 1989",
        "Neptune flyby",
        "Voyager 2 completed the first close encounter with Neptune.",
        [V2]
      ),
      event(
        "v2-interstellar",
        "milestone",
        "2018-11-05",
        "5 November 2018",
        "Interstellar space",
        "Voyager 2 crossed the heliopause into the interstellar medium.",
        [V2, "SRC-NSSDCA-VOYAGER-2"]
      ),
    ],
    scientificContributions: [
      {
        kind: "science",
        title: "The only grand tour of all four giant planets",
        summary:
          "Voyager 2 returned the first close-up data from Uranus and Neptune and added to the Jupiter and Saturn results.",
      },
      {
        kind: "science",
        title: "Discovered new moons and rings",
        summary:
          "The mission found previously unknown satellites and ring structures around the outer planets.",
      },
      {
        kind: "science",
        title: "Crossed into interstellar space",
        summary:
          "Voyager 2's heliopause crossing provided a second set of direct interstellar measurements.",
      },
    ],
    fate:
      "Voyager 2 is still operating in interstellar space. NASA continues to manage its power and instruments as the spacecraft ages.",
    location: {
      body: "Interstellar space",
      locationName: "Beyond the heliopause",
      precision: "unknown",
      note: "The spacecraft is moving outward; its exact position changes continuously and is not plotted here.",
    },
    technicalDetails: [
      { label: "Mission type", value: "Outer-planet flyby and interstellar probe" },
      { label: "Launch vehicle", value: "Titan IIIE-Centaur" },
      { label: "Mass", value: "About 722 kg" },
      { label: "Power", value: "Radioisotope thermoelectric generators" },
      { label: "Uranus flyby", value: "24 January 1986" },
      { label: "Neptune flyby", value: "25 August 1989" },
      { label: "Interstellar crossing", value: "5 November 2018" },
    ],
    media: image(
      "/images/voyager-2.jpg",
      "Engineers work on the Voyager 2 spacecraft in a clean room in March 1977.",
      "Engineers working on the Voyager 2 spacecraft on 23 March 1977, before launch.",
      "NASA/JPL-Caltech",
      "PIA21736",
      1600,
      1273
    ),
    relatedIds: ["voyager-1", "pioneer-10", "new-horizons"],
    sourceIds: [V2, "SRC-NSSDCA-VOYAGER-2"],
    dataNotes: [
      "Voyager 2 launched before Voyager 1 but followed a slower trajectory, so it reached Jupiter second.",
      "The mission is ongoing; instrument and power status can change after the last-verified date.",
    ],
  }),

  defineArtifact({
    id: "new-horizons",
    name: "New Horizons",
    alternateNames: ["New Horizons Pluto Kuiper Belt Flyby"],
    missionName: "New Horizons",
    programName: "New Frontiers Program",
    destination: "Deep Space",
    destinationGroup: "deep-space",
    hardwareType: "probe",
    shortDescription:
      "The first spacecraft to fly past Pluto, and later the first to explore a Kuiper Belt object.",
    overview:
      "New Horizons launched in 2006 and flew past Jupiter in 2007 for a gravity assist. In July 2015 it made the first close flyby of Pluto, revealing a complex world of ice mountains and nitrogen glaciers. On 1 January 2019 it flew past Arrokoth, a small Kuiper Belt object, and it continues to explore the outer solar system.",
    scientificPurpose:
      "The mission was designed to characterize Pluto and its moons, explore the Kuiper Belt, and study the formation and evolution of the outer solar system.",
    missionStatus: "ongoing",
    missionStatusOriginal:
      "NASA continues to operate New Horizons in its extended mission.",
    hardwareStatus: "operating",
    hardwareStatusOriginal:
      "The spacecraft is still communicating and carrying out its extended mission.",
    launchDate: "2006-01-19",
    arrivalDate: "2015-07-14",
    primaryMilestone: event(
      "nh-pluto",
      "flyby",
      "2015-07-14",
      "14 July 2015",
      "First Pluto flyby",
      "New Horizons made the first close encounter with Pluto and its moons.",
      [NH, "SRC-NSSDCA-NEW-HORIZONS"]
    ),
    timelineEvents: [
      event(
        "nh-launch",
        "launch",
        "2006-01-19",
        "19 January 2006",
        "Launched from Earth",
        "An Atlas V launched New Horizons on a fast trajectory toward Pluto.",
        [NH, "SRC-NSSDCA-NEW-HORIZONS"]
      ),
      event(
        "nh-jupiter",
        "flyby",
        "2007-02-28",
        "28 February 2007",
        "Jupiter gravity assist",
        "The spacecraft passed Jupiter and used its gravity to speed up.",
        [NH]
      ),
      event(
        "nh-pluto",
        "flyby",
        "2015-07-14",
        "14 July 2015",
        "Pluto flyby",
        "New Horizons returned the first close-up images of Pluto and its moons.",
        [NH]
      ),
      event(
        "nh-arrokoth",
        "flyby",
        "2019-01-01",
        "1 January 2019",
        "Arrokoth flyby",
        "The spacecraft flew past a small Kuiper Belt object.",
        [NH]
      ),
    ],
    scientificContributions: [
      {
        kind: "science",
        title: "Revealed Pluto as a complex world",
        summary:
          "New Horizons found ice mountains, nitrogen ice plains and a layered atmosphere at Pluto.",
      },
      {
        kind: "science",
        title: "Explored the Kuiper Belt",
        summary:
          "The Arrokoth flyby provided the first close-up look at a primitive Kuiper Belt object.",
      },
      {
        kind: "engineering",
        title: "A fast, long-distance mission",
        summary:
          "New Horizons reached Pluto in about nine and a half years and continues to operate far from Earth.",
      },
    ],
    fate:
      "New Horizons is still operating in the outer solar system. NASA continues its extended mission, and the spacecraft is expected to keep returning data as power allows.",
    location: {
      body: "Outer solar system",
      locationName: "Kuiper Belt and beyond",
      precision: "unknown",
      note: "The spacecraft is moving outward; its exact position changes continuously and is not plotted here.",
    },
    technicalDetails: [
      { label: "Mission type", value: "Outer solar system flyby probe" },
      { label: "Launch vehicle", value: "Atlas V 551" },
      { label: "Mass", value: "About 478 kg" },
      { label: "Power", value: "Radioisotope thermoelectric generator" },
      { label: "Pluto flyby", value: "14 July 2015" },
      { label: "Arrokoth flyby", value: "1 January 2019" },
    ],
    media: image(
      "/images/new-horizons.jpg",
      "Pluto's crescent, backlit by the Sun, with layers of haze visible in the atmosphere.",
      "A high-resolution farewell view of Pluto's crescent taken by New Horizons about 200,000 km from the dwarf planet.",
      "NASA/Johns Hopkins University Applied Physics Laboratory/Southwest Research Institute",
      "PIA21590",
      1600,
      900
    ),
    relatedIds: ["voyager-1", "voyager-2", "cassini"],
    sourceIds: [NH, "SRC-NSSDCA-NEW-HORIZONS"],
    dataNotes: [
      "The mission is ongoing; its extended-mission targets and power status can change after the last-verified date.",
      "The image shows Pluto, not the spacecraft.",
    ],
  }),

  defineArtifact({
    id: "cassini",
    name: "Cassini",
    alternateNames: ["Cassini orbiter", "Cassini-Huygens"],
    missionName: "Cassini-Huygens",
    programName: "Flagship Program",
    destination: "Deep Space",
    destinationGroup: "deep-space",
    hardwareType: "orbiter",
    shortDescription:
      "A Saturn orbiter that spent 13 years studying the planet, its rings and moons, and delivered the Huygens probe to Titan.",
    overview:
      "Cassini reached Saturn in 2004 and spent more than a decade exploring the planet, its rings and its moons. It carried the European Space Agency's Huygens probe, which landed on Titan in 2005. Cassini discovered geysers at Enceladus and ended its mission in 2017 with a deliberate plunge into Saturn's atmosphere.",
    scientificPurpose:
      "The mission was designed to study Saturn, its rings, magnetosphere and moons, and to investigate Titan's atmosphere and surface through the Huygens probe.",
    missionStatus: "completed",
    missionStatusOriginal:
      "NASA lists Cassini as a completed mission that ended with a planned atmospheric entry on 15 September 2017.",
    hardwareStatus: "destroyed",
    hardwareStatusOriginal:
      "The spacecraft was deliberately sent into Saturn's atmosphere and was destroyed to protect the moons from possible contamination.",
    launchDate: "1997-10-15",
    arrivalDate: "2004-07-01",
    missionEndDate: "2017-09-15",
    primaryMilestone: event(
      "cassini-saturn",
      "orbit-insertion",
      "2004-07-01",
      "1 July 2004",
      "Entered Saturn orbit",
      "Cassini became the first spacecraft to orbit Saturn.",
      ["SRC-CASSINI"]
    ),
    timelineEvents: [
      event(
        "cassini-launch",
        "launch",
        "1997-10-15",
        "15 October 1997",
        "Launched from Earth",
        "A Titan IVB-Centaur launched Cassini-Huygens.",
        ["SRC-CASSINI"]
      ),
      event(
        "cassini-saturn",
        "orbit-insertion",
        "2004-07-01",
        "1 July 2004",
        "Entered Saturn orbit",
        "Cassini began its long orbital study of the Saturn system.",
        ["SRC-CASSINI"]
      ),
      event(
        "cassini-huygens",
        "landing",
        "2005-01-14",
        "14 January 2005",
        "Huygens landed on Titan",
        "The Huygens probe descended through Titan's atmosphere and reached the surface.",
        ["SRC-CASSINI"]
      ),
      event(
        "cassini-end",
        "end-of-mission",
        "2017-09-15",
        "15 September 2017",
        "Grand Finale",
        "Cassini plunged into Saturn's atmosphere, ending the mission.",
        ["SRC-CASSINI"]
      ),
    ],
    scientificContributions: [
      {
        kind: "science",
        title: "Revealed the Saturn system",
        summary:
          "Cassini returned detailed images and measurements of Saturn's rings, atmosphere and magnetosphere.",
      },
      {
        kind: "science",
        title: "Found geysers at Enceladus",
        summary:
          "The spacecraft discovered water-vapor plumes erupting from the moon Enceladus, pointing to a subsurface ocean.",
      },
      {
        kind: "science",
        title: "Delivered Huygens to Titan",
        summary:
          "The Huygens probe made the first landing in the outer solar system, on Saturn's moon Titan.",
      },
    ],
    fate:
      "Cassini was destroyed by design on 15 September 2017 when it entered Saturn's atmosphere. The spacecraft no longer exists intact.",
    location: {
      body: "Saturn",
      locationName: "Saturn's atmosphere",
      precision: "region",
      note: "The final entry site is in Saturn's atmosphere; no coordinate is plotted here.",
    },
    technicalDetails: [
      { label: "Mission type", value: "Saturn orbiter with Titan probe" },
      { label: "Launch vehicle", value: "Titan IVB-Centaur" },
      { label: "Orbiter mass", value: "About 5,700 kg at launch" },
      { label: "Huygens probe", value: "About 319 kg" },
      { label: "Saturn arrival", value: "1 July 2004" },
      { label: "End of mission", value: "15 September 2017" },
    ],
    media: image(
      "/images/cassini.jpg",
      "Artist's illustration of the Cassini spacecraft orbiting Saturn, with the rings and planet in the background.",
      "An illustration of Cassini in orbit around Saturn. The mission ended on 15 September 2017 with a final plunge into the planet.",
      "NASA/JPL-Caltech",
      "PIA22766",
      1600,
      675,
      true
    ),
    relatedIds: ["voyager-1", "voyager-2", "new-horizons"],
    sourceIds: ["SRC-CASSINI"],
    dataNotes: [
      "Cassini's destruction was intentional and designed to avoid contaminating Saturn's moons.",
      "The image is an illustration, not a photograph of the spacecraft in flight.",
    ],
  }),
];
