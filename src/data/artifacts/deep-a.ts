import { defineArtifact, event, image } from "./helpers";

const P10 = "SRC-PIONEER-10";
const P11 = "SRC-PIONEER-11";

export const deepSpaceArtifactsA = [
  defineArtifact({
    id: "pioneer-10",
    name: "Pioneer 10",
    alternateNames: ["Pioneer F"],
    missionName: "Pioneer 10",
    programName: "Pioneer Program",
    destination: "Deep Space",
    destinationGroup: "deep-space",
    hardwareType: "probe",
    shortDescription:
      "The first spacecraft to fly through the asteroid belt and past Jupiter, and the first to leave the outer solar system.",
    overview:
      "Pioneer 10 launched in 1972 and became the first spacecraft to cross the asteroid belt and fly past Jupiter. It returned the first close-up images of the giant planet and continued outward, eventually becoming one of the first human-made objects to head out of the solar system. NASA lost contact in 2003.",
    scientificPurpose:
      "Pioneer 10 was designed to test the hazards of the asteroid belt, study Jupiter's atmosphere, radiation environment and moons, and explore the outer heliosphere.",
    missionStatus: "completed",
    missionStatusOriginal:
      "NASA ended the Pioneer 10 mission in 1997; the last signal was received in January 2003.",
    hardwareStatus: "no-longer-communicating",
    hardwareStatusOriginal:
      "The spacecraft stopped transmitting in January 2003 and continues on a passive trajectory out of the solar system.",
    launchDate: "1972-03-02",
    arrivalDate: "1973-12-03",
    missionEndDate: "2003-01-23",
    lastContactDate: "2003-01-23",
    primaryMilestone: event(
      "p10-jupiter",
      "flyby",
      "1973-12-03",
      "3 December 1973",
      "First Jupiter flyby",
      "Pioneer 10 passed Jupiter and returned the first close-up images of the planet.",
      [P10, "SRC-NSSDCA-PIONEER-10"]
    ),
    timelineEvents: [
      event(
        "p10-launch",
        "launch",
        "1972-03-02",
        "2 March 1972",
        "Launched from Earth",
        "An Atlas-Centaur launched Pioneer 10 from Cape Canaveral.",
        [P10, "SRC-NSSDCA-PIONEER-10"]
      ),
      event(
        "p10-belt",
        "milestone",
        "1973-02-01",
        "February 1973",
        "Crossed the asteroid belt",
        "Pioneer 10 became the first spacecraft to pass through the asteroid belt.",
        [P10],
        "month"
      ),
      event(
        "p10-jupiter",
        "flyby",
        "1973-12-03",
        "3 December 1973",
        "Jupiter flyby",
        "The spacecraft returned the first close-up views of Jupiter.",
        [P10]
      ),
      event(
        "p10-last-contact",
        "last-contact",
        "2003-01-23",
        "23 January 2003",
        "Last signal received",
        "NASA received the final transmission from Pioneer 10.",
        [P10, "SRC-NSSDCA-PIONEER-10"]
      ),
    ],
    scientificContributions: [
      {
        kind: "science",
        title: "First close-up images of Jupiter",
        summary:
          "Pioneer 10 revealed details of Jupiter's atmosphere, clouds and radiation environment.",
      },
      {
        kind: "engineering",
        title: "Proved the asteroid belt was passable",
        summary:
          "The spacecraft's safe crossing reduced concerns about debris hazards for later outer-planet missions.",
      },
      {
        kind: "science",
        title: "Explored the outer heliosphere",
        summary:
          "Pioneer 10 measured the solar wind and cosmic environment far beyond the planets.",
      },
    ],
    fate:
      "Pioneer 10 is no longer communicating. It continues outward on a passive trajectory; NASA has no way to track its current condition.",
    location: {
      body: "Interstellar space",
      locationName: "Outbound trajectory beyond the solar system",
      precision: "unknown",
      note: "The spacecraft is not being tracked; its exact current position is not plotted.",
    },
    technicalDetails: [
      { label: "Mission type", value: "Outer-planet flyby probe" },
      { label: "Launch vehicle", value: "Atlas-Centaur" },
      { label: "Mass", value: "About 258 kg" },
      { label: "Power", value: "Radioisotope thermoelectric generators" },
      { label: "Jupiter flyby", value: "3 December 1973" },
      { label: "Last contact", value: "23 January 2003" },
    ],
    media: image(
      "/images/pioneer-10.jpg",
      "The Pioneer 10 spacecraft is prepared for launch at Cape Kennedy, with its instrument booms visible.",
      "Pioneer 10 at Cape Kennedy being prepared for its mission. The spacecraft carries a plaque designed for any civilization that might encounter it.",
      "NASA/Ames Research Center",
      "ARC-1972-AC72-2135",
      1600,
      1067
    ),
    relatedIds: ["pioneer-11", "voyager-1", "voyager-2"],
    sourceIds: [P10, "SRC-NSSDCA-PIONEER-10"],
    dataNotes: [
      "The official mission ended in 1997, but the last signal was received in 2003; this record shows the last-contact date separately.",
      "Pioneer 10 is often described as the first spacecraft to leave the solar system, but it has not crossed the heliopause in the same way the Voyagers have.",
    ],
  }),

  defineArtifact({
    id: "pioneer-11",
    name: "Pioneer 11",
    alternateNames: ["Pioneer G"],
    missionName: "Pioneer 11",
    programName: "Pioneer Program",
    destination: "Deep Space",
    destinationGroup: "deep-space",
    hardwareType: "probe",
    shortDescription:
      "The first spacecraft to fly past Saturn, after a Jupiter flyby that used the giant planet's gravity to change course.",
    overview:
      "Pioneer 11 followed Pioneer 10 to Jupiter, then used a gravity assist to swing toward Saturn. In 1979 it became the first spacecraft to fly past Saturn, returning the first close-up images of the planet and its rings. It continued outward until contact was lost in 1995.",
    scientificPurpose:
      "The mission was designed to explore Jupiter and Saturn, study their magnetic fields and radiation environments, and test the gravity-assist technique for later missions.",
    missionStatus: "completed",
    missionStatusOriginal:
      "NASA ended the Pioneer 11 mission in 1995 after the spacecraft could no longer be reliably controlled.",
    hardwareStatus: "no-longer-communicating",
    hardwareStatusOriginal:
      "The last contact was in September 1995; the spacecraft continues on a passive trajectory.",
    launchDate: "1973-04-05",
    arrivalDate: "1974-12-02",
    missionEndDate: "1995-09-30",
    lastContactDate: "1995-09-30",
    primaryMilestone: event(
      "p11-saturn",
      "flyby",
      "1979-09-01",
      "1 September 1979",
      "First Saturn flyby",
      "Pioneer 11 became the first spacecraft to fly past Saturn.",
      [P11, "SRC-NSSDCA-PIONEER-11"]
    ),
    timelineEvents: [
      event(
        "p11-launch",
        "launch",
        "1973-04-05",
        "5 April 1973",
        "Launched from Earth",
        "An Atlas-Centaur launched Pioneer 11 from Cape Canaveral.",
        [P11, "SRC-NSSDCA-PIONEER-11"]
      ),
      event(
        "p11-jupiter",
        "flyby",
        "1974-12-02",
        "2 December 1974",
        "Jupiter flyby",
        "Pioneer 11 passed Jupiter and used its gravity to redirect toward Saturn.",
        [P11]
      ),
      event(
        "p11-saturn",
        "flyby",
        "1979-09-01",
        "1 September 1979",
        "Saturn flyby",
        "The spacecraft returned the first close-up images of Saturn and its rings.",
        [P11]
      ),
      event(
        "p11-last-contact",
        "last-contact",
        "1995-09-30",
        "30 September 1995",
        "Last contact",
        "NASA lost reliable contact with Pioneer 11.",
        [P11, "SRC-NSSDCA-PIONEER-11"]
      ),
    ],
    scientificContributions: [
      {
        kind: "science",
        title: "First close-up views of Saturn",
        summary:
          "Pioneer 11 revealed new details of Saturn's rings, atmosphere and magnetic environment.",
      },
      {
        kind: "engineering",
        title: "Demonstrated a gravity assist",
        summary:
          "The Jupiter flyby showed how a planet's gravity could redirect a spacecraft toward another target.",
      },
      {
        kind: "science",
        title: "Studied Jupiter's polar regions",
        summary:
          "Pioneer 11's trajectory gave a different view of Jupiter than Pioneer 10's.",
      },
    ],
    fate:
      "Pioneer 11 is no longer communicating. It continues outward on a passive trajectory, and its current condition is unknown.",
    location: {
      body: "Interstellar space",
      locationName: "Outbound trajectory beyond the solar system",
      precision: "unknown",
      note: "The spacecraft is not being tracked; its exact current position is not plotted.",
    },
    technicalDetails: [
      { label: "Mission type", value: "Outer-planet flyby probe" },
      { label: "Launch vehicle", value: "Atlas-Centaur" },
      { label: "Mass", value: "About 259 kg" },
      { label: "Power", value: "Radioisotope thermoelectric generators" },
      { label: "Jupiter flyby", value: "2 December 1974" },
      { label: "Saturn flyby", value: "1 September 1979" },
      { label: "Last contact", value: "30 September 1995" },
    ],
    media: image(
      "/images/pioneer-11.jpg",
      "An Atlas-Centaur rocket lifts off carrying the Pioneer 11 spacecraft.",
      "The launch of the Atlas-Centaur carrying Pioneer 11 on 5 April 1973.",
      "NASA",
      "9139575",
      1600,
      1216
    ),
    relatedIds: ["pioneer-10", "voyager-1", "voyager-2"],
    sourceIds: [P11, "SRC-NSSDCA-PIONEER-11"],
    dataNotes: [
      "Pioneer 11's Saturn flyby preceded the Voyager encounters and provided the first close-up data on the Saturn system.",
    ],
  }),

  defineArtifact({
    id: "voyager-1",
    name: "Voyager 1",
    alternateNames: ["Voyager 1 spacecraft"],
    missionName: "Voyager",
    programName: "Voyager Program",
    destination: "Deep Space",
    destinationGroup: "deep-space",
    hardwareType: "probe",
    shortDescription:
      "The most distant human-made object, now exploring interstellar space after flybys of Jupiter and Saturn.",
    overview:
      "Voyager 1 launched in 1977 and flew past Jupiter and Saturn, returning detailed images of their atmospheres, rings and moons. In 2012 it crossed into interstellar space, becoming the first spacecraft to do so. It continues to return data about the environment beyond the Sun's influence.",
    scientificPurpose:
      "Voyager 1 was designed to explore Jupiter and Saturn and, after those encounters, to continue outward as part of the Voyager interstellar mission.",
    missionStatus: "ongoing",
    missionStatusOriginal:
      "NASA continues to operate Voyager 1 as an interstellar mission.",
    hardwareStatus: "operating",
    hardwareStatusOriginal:
      "The spacecraft is still communicating and returning data, although some instruments have been turned off to conserve power.",
    launchDate: "1977-09-05",
    arrivalDate: "1979-03-05",
    primaryMilestone: event(
      "v1-interstellar",
      "milestone",
      "2012-08-25",
      "25 August 2012",
      "Crossed into interstellar space",
      "Voyager 1 became the first spacecraft to enter the interstellar medium.",
      ["SRC-VOYAGER-1", "SRC-NSSDCA-VOYAGER-1"]
    ),
    timelineEvents: [
      event(
        "v1-launch",
        "launch",
        "1977-09-05",
        "5 September 1977",
        "Launched from Earth",
        "A Titan IIIE-Centaur launched Voyager 1 from Cape Canaveral.",
        ["SRC-VOYAGER-1", "SRC-NSSDCA-VOYAGER-1"]
      ),
      event(
        "v1-jupiter",
        "flyby",
        "1979-03-05",
        "5 March 1979",
        "Jupiter flyby",
        "Voyager 1 returned detailed images of Jupiter and its moons.",
        ["SRC-VOYAGER-1"]
      ),
      event(
        "v1-saturn",
        "flyby",
        "1980-11-12",
        "12 November 1980",
        "Saturn flyby",
        "The spacecraft studied Saturn, its rings and Titan.",
        ["SRC-VOYAGER-1"]
      ),
      event(
        "v1-interstellar",
        "milestone",
        "2012-08-25",
        "25 August 2012",
        "Interstellar space",
        "Voyager 1 crossed the heliopause into the interstellar medium.",
        ["SRC-VOYAGER-1", "SRC-NSSDCA-VOYAGER-1"]
      ),
    ],
    scientificContributions: [
      {
        kind: "science",
        title: "Transformed understanding of Jupiter and Saturn",
        summary:
          "Voyager 1 discovered active volcanism on Io and revealed complex structure in Saturn's rings.",
      },
      {
        kind: "science",
        title: "First spacecraft in interstellar space",
        summary:
          "Voyager 1's crossing of the heliopause opened a new phase of direct interstellar measurements.",
      },
      {
        kind: "engineering",
        title: "A decades-long deep-space mission",
        summary:
          "The spacecraft has operated for decades on radioisotope power, far beyond its original design life.",
      },
    ],
    fate:
      "Voyager 1 is still operating in interstellar space. NASA continues to manage its power and instruments as the spacecraft ages.",
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
      { label: "Jupiter flyby", value: "5 March 1979" },
      { label: "Saturn flyby", value: "12 November 1980" },
      { label: "Interstellar crossing", value: "25 August 2012" },
    ],
    media: image(
      "/images/voyager-1.jpg",
      "Artist's rendering of a Voyager spacecraft against a starry background.",
      "An artist's rendering of the Voyager spacecraft. Voyager 1 launched on 5 September 1977.",
      "NASA/JPL-Caltech",
      "PIA14111",
      1600,
      1200,
      true
    ),
    relatedIds: ["voyager-2", "pioneer-10", "new-horizons"],
    sourceIds: ["SRC-VOYAGER-1", "SRC-NSSDCA-VOYAGER-1"],
    dataNotes: [
      "The mission is ongoing; instrument and power status can change after the last-verified date.",
      "The image is an artist's rendering, not a photograph of the spacecraft in flight.",
    ],
  }),
];
