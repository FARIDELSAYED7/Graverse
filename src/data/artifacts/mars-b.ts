import { defineArtifact, event, image } from "./helpers";

const PHOENIX = "SRC-PHOENIX";
const CURIOSITY = "SRC-CURIOSITY";
const INSIGHT = "SRC-INSIGHT";
const PERSEVERANCE = "SRC-PERSEVERANCE";

export const marsArtifactsB = [
  defineArtifact({
    id: "phoenix",
    name: "Phoenix Lander",
    alternateNames: ["Phoenix Mars Lander", "Mars Scout 1"],
    missionName: "Phoenix",
    programName: "Mars Scout Program",
    destination: "Mars",
    destinationGroup: "mars",
    hardwareType: "lander",
    shortDescription:
      "A stationary lander that confirmed water ice beneath the Martian surface in the planet's northern arctic region.",
    overview:
      "Phoenix landed in the northern arctic plain of Mars on 25 May 2008. It used a robotic arm to dig into the soil and exposed water ice, then analyzed samples with a suite of instruments. The mission also monitored the local weather and observed seasonal changes before the onset of Martian winter.",
    scientificPurpose:
      "Phoenix was designed to study the history of water in the Martian arctic and to assess whether the region could have been habitable for microbial life.",
    missionStatus: "completed",
    missionStatusOriginal:
      "NASA lists Phoenix as a completed mission that operated until late 2008.",
    hardwareStatus: "inactive",
    hardwareStatusOriginal:
      "The lander stopped communicating in November 2008 as winter conditions reduced its power.",
    launchDate: "2007-08-04",
    arrivalDate: "2008-05-25",
    missionEndDate: "2008-11-10",
    lastContactDate: "2008-11-02",
    primaryMilestone: event(
      "phoenix-landing",
      "landing",
      "2008-05-25",
      "25 May 2008",
      "Landed in the Martian arctic",
      "Phoenix touched down at a high-latitude site and began digging into the soil.",
      [PHOENIX, "SRC-NSSDCA-PHOENIX"]
    ),
    timelineEvents: [
      event(
        "phoenix-launch",
        "launch",
        "2007-08-04",
        "4 August 2007",
        "Launched from Earth",
        "A Delta II launched the Phoenix spacecraft.",
        [PHOENIX, "SRC-NSSDCA-PHOENIX"]
      ),
      event(
        "phoenix-landing",
        "landing",
        "2008-05-25",
        "25 May 2008",
        "Landed at Vastitas Borealis",
        "Phoenix began its arctic surface mission.",
        [PHOENIX]
      ),
      event(
        "phoenix-ice",
        "milestone",
        "2008-06-20",
        "June 2008",
        "Water ice exposed",
        "The robotic arm uncovered bright material that was confirmed as water ice.",
        [PHOENIX],
        "month"
      ),
      event(
        "phoenix-last-contact",
        "last-contact",
        "2008-11-02",
        "2 November 2008",
        "Last contact",
        "Winter conditions reduced the lander's power and it stopped communicating.",
        ["SRC-NSSDCA-PHOENIX"]
      ),
      event(
        "phoenix-end",
        "end-of-mission",
        "2008-11-10",
        "10 November 2008",
        "Mission ended",
        "NASA declared the mission over after contact was lost.",
        [PHOENIX]
      ),
    ],
    scientificContributions: [
      {
        kind: "science",
        title: "Confirmed subsurface water ice",
        summary:
          "Phoenix directly exposed and analyzed water ice in the Martian soil, confirming a key resource for future exploration.",
      },
      {
        kind: "science",
        title: "Studied the arctic atmosphere",
        summary:
          "The lander tracked pressure, temperature, wind and dust at a high-latitude site.",
      },
      {
        kind: "science",
        title: "Observed seasonal change",
        summary:
          "Phoenix recorded frost, clouds and the approach of winter before its power ran out.",
      },
    ],
    fate:
      "Phoenix is inactive at its landing site in the Martian arctic. It last communicated on 2 November 2008; NASA ended the mission later that month. The lander's physical condition after the Martian winter has not been documented.",
    location: {
      body: "Mars",
      locationName: "Vastitas Borealis, northern arctic plain",
      precision: "region",
      note: "The landing region is documented; no coordinate pair is plotted here.",
    },
    technicalDetails: [
      { label: "Mission type", value: "Stationary polar lander" },
      { label: "Launch vehicle", value: "Delta II" },
      { label: "Mass", value: "About 350 kg" },
      { label: "Power", value: "Solar arrays and batteries" },
      { label: "Key instruments", value: "Robotic arm, TEGA, MECA, weather station" },
      { label: "Last contact", value: "2 November 2008" },
    ],
    media: image(
      "/images/phoenix.jpg",
      "A Mars Reconnaissance Orbiter image shows the Phoenix lander on the Martian surface with its solar panels deployed.",
      "An enhanced-color HiRISE image of the Phoenix lander with its solar panels deployed on the Martian surface.",
      "NASA/JPL-Caltech/University of Arizona",
      "PIA10701",
      508,
      600
    ),
    relatedIds: ["viking-1-lander", "viking-2-lander", "insight"],
    sourceIds: [PHOENIX, "SRC-NSSDCA-PHOENIX"],
    dataNotes: [
      "Phoenix confirmed water ice; it did not detect liquid water or living organisms.",
      "The lander was not designed to survive the Martian winter, and contact was lost as expected power levels fell.",
    ],
  }),

  defineArtifact({
    id: "curiosity",
    name: "Curiosity Rover",
    alternateNames: ["Mars Science Laboratory", "MSL"],
    missionName: "Mars Science Laboratory",
    programName: "Mars Exploration Program",
    destination: "Mars",
    destinationGroup: "mars",
    hardwareType: "rover",
    shortDescription:
      "A nuclear-powered rover studying whether Gale Crater once offered conditions suitable for microbial life.",
    overview:
      "Curiosity is the rover element of NASA's Mars Science Laboratory mission. It landed in Gale Crater in 2012 and has been climbing the layered rocks of Mount Sharp, using a drill and laboratory instruments to study the area's ancient environments and chemistry.",
    scientificPurpose:
      "The mission was designed to determine whether Gale Crater ever had environmental conditions suitable for microbial life, and to study the planet's climate and geology over time.",
    missionStatus: "ongoing",
    missionStatusOriginal:
      "Active Mission. NASA continues to operate Curiosity in its extended mission.",
    hardwareStatus: "operating",
    hardwareStatusOriginal:
      "NASA reports the rover remains operational on Mars.",
    launchDate: "2011-11-26",
    arrivalDate: "2012-08-06",
    primaryMilestone: event(
      "curio-landing",
      "landing",
      "2012-08-06",
      "6 August 2012",
      "Landed in Gale Crater",
      "Curiosity touched down at Bradbury Landing to begin its investigation of Gale Crater.",
      [CURIOSITY, "SRC-NSSDCA-CURIOSITY"]
    ),
    timelineEvents: [
      event(
        "curio-launch",
        "launch",
        "2011-11-26",
        "26 November 2011",
        "Launched from Earth",
        "An Atlas V launched the Mars Science Laboratory spacecraft.",
        [CURIOSITY, "SRC-NSSDCA-CURIOSITY"]
      ),
      event(
        "curio-landing",
        "landing",
        "2012-08-06",
        "6 August 2012",
        "Landed in Gale Crater",
        "Curiosity began its mission at Bradbury Landing.",
        [CURIOSITY]
      ),
      event(
        "curio-habitable",
        "milestone",
        "2013-03-12",
        "12 March 2013",
        "Ancient habitable conditions confirmed",
        "NASA announced that Curiosity had found evidence of a past environment that could have supported microbial life.",
        [CURIOSITY]
      ),
      event(
        "curio-mount-sharp",
        "milestone",
        "2014-09-11",
        "September 2014",
        "Reached the base of Mount Sharp",
        "The rover arrived at the layered mountain that has been its main study area.",
        [CURIOSITY],
        "month"
      ),
    ],
    scientificContributions: [
      {
        kind: "science",
        title: "Found an ancient habitable environment",
        summary:
          "Curiosity's observations showed that Gale Crater once had water and chemical conditions that could have supported microbial life.",
      },
      {
        kind: "science",
        title: "Detected organic molecules",
        summary:
          "The rover's laboratory instruments identified organic molecules preserved in Martian rocks, adding to the picture of the planet's chemical history.",
      },
      {
        kind: "science",
        title: "Measured the modern atmosphere",
        summary:
          "Curiosity's weather and atmospheric instruments have tracked temperature, radiation, wind and methane in Gale Crater.",
      },
    ],
    fate:
      "Curiosity remains operational on Mars. NASA reports that the rover is still exploring Mount Sharp; its hardware is active even as the mission continues beyond its original prime duration.",
    location: {
      body: "Mars",
      locationName: "Gale Crater and Mount Sharp",
      precision: "region",
      note: "Gale Crater is the documented landing region. No live rover coordinate is plotted.",
    },
    technicalDetails: [
      { label: "Mass", value: "899 kg (1,982 lb)" },
      { label: "Dimensions", value: "About 3 m long, 2.8 m wide and 2.2 m high" },
      { label: "Power", value: "Multi-Mission Radioisotope Thermoelectric Generator (MMRTG)" },
      { label: "Top speed", value: "About 4 cm/s (0.09 mph)" },
      { label: "Key instruments", value: "Mastcam, ChemCam, SAM, CheMin, DAN, RAD, REMS" },
      { label: "Landing site", value: "Gale Crater" },
    ],
    media: image(
      "/images/curiosity.jpg",
      "Curiosity takes a self-portrait at the Okoruso drill site on lower Mount Sharp.",
      "Curiosity's self-portrait at the Okoruso drill site on the Naukluft Plateau of lower Mount Sharp, taken in May 2016.",
      "NASA/JPL-Caltech/MSSS",
      "PIA20602",
      1430,
      1919
    ),
    relatedIds: ["perseverance", "opportunity", "insight"],
    sourceIds: [CURIOSITY, "SRC-NSSDCA-CURIOSITY"],
    dataNotes: [
      "Curiosity and Perseverance are separate rovers in separate missions; both are active as of this build.",
      "The mission is ongoing, so its status can change after the last-verified date.",
    ],
  }),

  defineArtifact({
    id: "insight",
    name: "InSight Lander",
    alternateNames: ["Interior Exploration using Seismic Investigations, Geodesy and Heat Transport"],
    missionName: "InSight",
    programName: "Discovery Program",
    destination: "Mars",
    destinationGroup: "mars",
    hardwareType: "lander",
    shortDescription:
      "A stationary lander that listened for marsquakes and studied the interior of Mars.",
    overview:
      "InSight was a geophysics lander designed to study the deep interior of Mars. It carried a seismometer, a heat-flow probe and a radio experiment to measure the planet's rotation. The mission detected many marsquakes and revealed the layered structure beneath the surface.",
    scientificPurpose:
      "InSight was built to determine the size, composition and internal structure of Mars, and to measure how seismically active the planet is today. Its instruments were designed to probe the crust, mantle and core.",
    missionStatus: "completed",
    missionStatusOriginal:
      "Mission ended in December 2022 after the lander stopped responding.",
    hardwareStatus: "no-longer-communicating",
    hardwareStatusOriginal:
      "The lander stopped communicating after dust reduced the power available to its solar arrays. NASA declared the mission over.",
    launchDate: "2018-05-05",
    arrivalDate: "2018-11-26",
    missionEndDate: "2022-12-15",
    lastContactDate: "2022-12-15",
    primaryMilestone: event(
      "insight-landing",
      "landing",
      "2018-11-26",
      "26 November 2018",
      "Landed on Mars",
      "InSight touched down in Elysium Planitia to begin its geophysics mission.",
      [INSIGHT, "SRC-NSSDCA-INSIGHT"]
    ),
    timelineEvents: [
      event(
        "insight-launch",
        "launch",
        "2018-05-05",
        "5 May 2018",
        "Launched from Earth",
        "An Atlas V launched InSight from Vandenberg Air Force Base.",
        [INSIGHT, "SRC-NSSDCA-INSIGHT"]
      ),
      event(
        "insight-landing",
        "landing",
        "2018-11-26",
        "26 November 2018",
        "Landed at Elysium Planitia",
        "InSight began its surface mission on the Martian plains.",
        [INSIGHT]
      ),
      event(
        "insight-quake",
        "first-operation",
        "2019-04-06",
        "6 April 2019",
        "First marsquake detected",
        "InSight's seismometer recorded the first confirmed seismic event on Mars.",
        [INSIGHT]
      ),
      event(
        "insight-end",
        "end-of-mission",
        "2022-12-15",
        "15 December 2022",
        "End of mission",
        "NASA declared the mission over after the lander stopped communicating.",
        [INSIGHT]
      ),
    ],
    scientificContributions: [
      {
        kind: "science",
        title: "First seismometer on Mars",
        summary:
          "InSight placed a seismometer on the Martian surface and detected more than 1,300 marsquakes.",
      },
      {
        kind: "science",
        title: "Mapped the planet's interior",
        summary:
          "Seismic data revealed the thickness and structure of the crust, mantle and core, giving Mars its first detailed interior check-up.",
      },
      {
        kind: "science",
        title: "Studied the local weather",
        summary:
          "InSight's weather station tracked pressure, temperature, wind and dust at Elysium Planitia.",
      },
    ],
    fate:
      "InSight is no longer communicating. Its solar arrays gradually accumulated dust, reducing power until the lander could not keep its systems running. NASA ended the mission in December 2022. The hardware remains on Mars; its physical condition has not been documented since contact was lost.",
    location: {
      body: "Mars",
      locationName: "Elysium Planitia",
      precision: "region",
      note: "The landing region is documented; no coordinate pair is plotted in this record.",
    },
    technicalDetails: [
      { label: "Mass", value: "358 kg (794 lb)" },
      { label: "Dimensions", value: "About 6 m wide with solar arrays deployed" },
      { label: "Power", value: "Solar arrays" },
      { label: "Key instruments", value: "SEIS seismometer, HP3 heat-flow probe, RISE radio science" },
      { label: "Marsquakes detected", value: "More than 1,300" },
      { label: "Landing site", value: "Elysium Planitia" },
      { label: "Last contact", value: "15 December 2022" },
    ],
    media: image(
      "/images/insight.jpg",
      "Artist's concept of the InSight lander operating on the surface of Mars, with its solar panels deployed.",
      "An artist's illustration of InSight on the surface of Mars with its solar arrays deployed. This is an illustration, not a photograph of the landed hardware.",
      "NASA/JPL-Caltech",
      "PIA22571",
      1600,
      897,
      true
    ),
    relatedIds: ["curiosity", "perseverance", "phoenix"],
    sourceIds: [INSIGHT, "SRC-NSSDCA-INSIGHT"],
    dataNotes: [
      "InSight is described as no longer communicating rather than destroyed; NASA has not documented the lander's physical condition after contact was lost.",
      "The lead image is an artist's concept, clearly labelled in the caption.",
    ],
  }),

  defineArtifact({
    id: "perseverance",
    name: "Perseverance Rover",
    alternateNames: ["Mars 2020 rover", "Percy"],
    missionName: "Mars 2020",
    programName: "Mars Exploration Program",
    destination: "Mars",
    destinationGroup: "mars",
    hardwareType: "rover",
    shortDescription:
      "A car-sized Mars rover exploring Jezero Crater, caching rock samples, and testing technologies for future human missions.",
    overview:
      "Perseverance is the central rover of NASA's Mars 2020 mission. It landed in Jezero Crater, a site with an ancient lake and river delta, and has been studying the geology and past habitability of the area. It carries a drill and sample-caching system, a suite of remote-sensing instruments, and two technology demonstrations: the Ingenuity helicopter and the MOXIE oxygen experiment.",
    scientificPurpose:
      "The mission is designed to seek signs of ancient microbial life, study the geology and climate of Jezero Crater, collect and cache rock and regolith samples for possible return to Earth, and prepare for future human exploration of Mars.",
    missionStatus: "ongoing",
    missionStatusOriginal:
      "Active Mission. NASA describes the rover as still operating in its extended mission.",
    hardwareStatus: "operating",
    hardwareStatusOriginal:
      "NASA continues to operate the rover on Mars and reports its driving and sampling progress.",
    launchDate: "2020-07-30",
    arrivalDate: "2021-02-18",
    primaryMilestone: event(
      "perse-landing",
      "landing",
      "2021-02-18",
      "18 February 2021",
      "Landed in Jezero Crater",
      "Perseverance touched down in Jezero Crater to search for signs of ancient life and collect samples.",
      [PERSEVERANCE, "SRC-NSSDCA-MARS-2020"]
    ),
    timelineEvents: [
      event(
        "perse-launch",
        "launch",
        "2020-07-30",
        "30 July 2020",
        "Launched from Earth",
        "An Atlas V launched the Mars 2020 spacecraft carrying Perseverance and Ingenuity.",
        [PERSEVERANCE, "SRC-NSSDCA-MARS-2020"]
      ),
      event(
        "perse-landing",
        "landing",
        "2021-02-18",
        "18 February 2021",
        "Landed in Jezero Crater",
        "Perseverance began its surface mission at an ancient lake and river delta.",
        [PERSEVERANCE]
      ),
      event(
        "perse-moxie",
        "first-operation",
        "2021-04-20",
        "20 April 2021",
        "MOXIE produced oxygen",
        "The MOXIE instrument generated oxygen from the Martian atmosphere for the first time.",
        [PERSEVERANCE]
      ),
      event(
        "perse-sample",
        "milestone",
        "2021-09-01",
        "September 2021",
        "First rock sample collected",
        "Perseverance sealed its first Martian rock core sample for possible future return to Earth.",
        [PERSEVERANCE],
        "month"
      ),
    ],
    scientificContributions: [
      {
        kind: "science",
        title: "Revealed a watery Jezero Crater",
        summary:
          "Orbital and rover observations show that river channels once fed a lake inside Jezero Crater, depositing sediments that preserve a record of past environments.",
      },
      {
        kind: "science",
        title: "Collected a diverse sample collection",
        summary:
          "NASA reports that Perseverance has collected a set of geologically diverse rock samples for possible return to Earth.",
      },
      {
        kind: "engineering",
        title: "Tested exploration technologies",
        summary:
          "Perseverance carried MOXIE, which made oxygen from the Martian atmosphere, and deployed Ingenuity, the first aircraft to fly on another planet.",
      },
    ],
    fate:
      "Perseverance is still operating on Mars. Its cached samples remain on Mars awaiting a possible future sample-return mission.",
    location: {
      body: "Mars",
      locationName: "Jezero Crater",
      precision: "region",
      note: "Jezero Crater is the documented landing region. This record does not plot a live rover coordinate.",
    },
    technicalDetails: [
      { label: "Mass", value: "1,025 kg (2,260 lb)" },
      { label: "Dimensions", value: "About 3 m long, 2.7 m wide and 2.2 m high" },
      { label: "Power", value: "Multi-Mission Radioisotope Thermoelectric Generator (MMRTG)" },
      { label: "Top speed", value: "4.2 cm/s (0.1 mph)" },
      { label: "Key instruments", value: "Mastcam-Z, SuperCam, PIXL, SHERLOC, MEDA" },
      { label: "Sample caching", value: "Rock cores sealed for possible return to Earth" },
      { label: "Landing site", value: "Jezero Crater" },
    ],
    media: image(
      "/images/perseverance.jpg",
      "Perseverance takes a selfie with the Ingenuity helicopter on the Martian surface.",
      "Perseverance's selfie with the Ingenuity helicopter, taken on 6 April 2021, the 46th sol of the mission.",
      "NASA/JPL-Caltech/MSSS",
      "PIA24542",
      1600,
      1177
    ),
    relatedIds: ["ingenuity", "curiosity", "mars-2020-descent-stage"],
    sourceIds: [
      PERSEVERANCE,
      "SRC-PERSEVERANCE-SPEC",
      "SRC-NSSDCA-MARS-2020",
    ],
    dataNotes: [
      "The mission is ongoing; its status and sample totals can change after the last-verified date.",
      "The cached samples have not been returned to Earth.",
    ],
  }),

  defineArtifact({
    id: "ingenuity",
    name: "Ingenuity Mars Helicopter",
    alternateNames: ["Mars Helicopter", "Ginny"],
    missionName: "Mars 2020",
    programName: "Mars Exploration Program",
    destination: "Mars",
    destinationGroup: "mars",
    hardwareType: "aircraft",
    shortDescription:
      "A small solar-powered helicopter that made the first powered, controlled flight on another planet.",
    overview:
      "Ingenuity traveled to Mars attached to Perseverance's belly. After deployment, it became the first aircraft to achieve powered, controlled flight on another world. What began as a short technology demonstration grew into 72 flights, including scouting work for the rover.",
    scientificPurpose:
      "Ingenuity was a technology demonstration designed to test whether controlled flight was possible in Mars' thin atmosphere and to explore how aerial scouting could support future rover missions.",
    missionStatus: "completed",
    missionStatusOriginal:
      "Mission completed after 72 flights. NASA announced the end of the helicopter's flight operations in January 2024.",
    hardwareStatus: "inactive",
    hardwareStatusOriginal:
      "The helicopter is no longer flying after damage to its rotor blades. It remains on the Martian surface.",
    launchDate: "2020-07-30",
    arrivalDate: "2021-02-18",
    missionEndDate: "2024-01-25",
    primaryMilestone: event(
      "ing-first-flight",
      "first-flight",
      "2021-04-19",
      "19 April 2021",
      "First flight on another planet",
      "Ingenuity achieved the first powered, controlled flight in the atmosphere of another world.",
      ["SRC-INGENUITY"]
    ),
    timelineEvents: [
      event(
        "ing-launch",
        "launch",
        "2020-07-30",
        "30 July 2020",
        "Launched with Perseverance",
        "Ingenuity traveled to Mars attached to the Mars 2020 rover.",
        ["SRC-INGENUITY"]
      ),
      event(
        "ing-arrival",
        "landing",
        "2021-02-18",
        "18 February 2021",
        "Arrived at Jezero Crater",
        "The helicopter reached Mars with Perseverance.",
        ["SRC-INGENUITY"]
      ),
      event(
        "ing-first-flight",
        "first-flight",
        "2021-04-19",
        "19 April 2021",
        "First flight",
        "Ingenuity flew in the Martian atmosphere for the first time.",
        ["SRC-INGENUITY"]
      ),
      event(
        "ing-last-flight",
        "milestone",
        "2024-01-18",
        "18 January 2024",
        "72nd and final flight",
        "A final flight ended with rotor damage that prevented further flying.",
        ["SRC-INGENUITY"]
      ),
      event(
        "ing-complete",
        "end-of-mission",
        "2024-01-25",
        "25 January 2024",
        "Mission completed",
        "NASA announced the end of Ingenuity's flight operations.",
        ["SRC-INGENUITY"]
      ),
    ],
    scientificContributions: [
      {
        kind: "engineering",
        title: "First powered flight on another planet",
        summary:
          "Ingenuity demonstrated that controlled, powered flight is possible in Mars' thin atmosphere.",
      },
      {
        kind: "engineering",
        title: "An operational scout",
        summary:
          "After its demonstration phase, the helicopter flew reconnaissance routes that helped the Perseverance team plan drives.",
      },
      {
        kind: "engineering",
        title: "A new kind of Mars mission",
        summary:
          "Ingenuity's 72 flights showed how small aerial vehicles could support future surface exploration.",
      },
    ],
    fate:
      "Ingenuity is inactive on the surface of Mars in Jezero Crater. NASA ended flight operations after damage to its rotor blades during its final flight. The helicopter is not expected to fly again.",
    location: {
      body: "Mars",
      locationName: "Jezero Crater",
      precision: "region",
      note: "The helicopter operated in Jezero Crater; the record does not plot a final coordinate.",
    },
    technicalDetails: [
      { label: "Mass", value: "About 1.8 kg (4 lb)" },
      { label: "Rotor diameter", value: "1.2 m (4 ft)" },
      { label: "Power", value: "Solar array and rechargeable batteries" },
      { label: "Rotor configuration", value: "Two counter-rotating rotors" },
      { label: "Flights completed", value: "72" },
      { label: "First flight", value: "19 April 2021" },
      { label: "Final flight", value: "18 January 2024" },
    ],
    media: image(
      "/images/ingenuity.jpg",
      "The flight model of NASA's Ingenuity Mars Helicopter.",
      "The flight model of NASA's Ingenuity Mars Helicopter. The solar-powered aircraft made the first powered flight on another planet.",
      "NASA/JPL-Caltech",
      "PIA23882",
      1600,
      1067
    ),
    relatedIds: ["perseverance", "mars-2020-descent-stage", "curiosity"],
    sourceIds: ["SRC-INGENUITY", PERSEVERANCE],
    dataNotes: [
      "Ingenuity's mission is complete, but the helicopter is not destroyed; 'inactive' reflects its documented condition.",
      "The image shows the flight model during ground processing, not the helicopter on Mars.",
    ],
  }),

  defineArtifact({
    id: "mars-2020-descent-stage",
    name: "Mars 2020 Descent Stage",
    alternateNames: ["Sky crane descent stage", "Perseverance descent stage"],
    missionName: "Mars 2020",
    programName: "Mars Exploration Program",
    destination: "Mars",
    destinationGroup: "mars",
    hardwareType: "lander",
    shortDescription:
      "The rocket-powered sky crane that lowered Perseverance to the Martian surface and then flew away to crash.",
    overview:
      "The Mars 2020 descent stage used retrorockets to slow the spacecraft and a bridle to lower Perseverance onto the surface. After the rover touched down, the descent stage separated and flew away to a planned impact site, so it would not damage the rover or its landing area.",
    scientificPurpose:
      "The descent stage was an engineering system, not a science instrument. Its job was to deliver the rover safely to Jezero Crater using the sky-crane landing method first demonstrated by Curiosity.",
    missionStatus: "completed",
    missionStatusOriginal:
      "NASA lists Mars 2020 as an ongoing surface mission; the landing phase completed successfully.",
    hardwareStatus: "impacted",
    hardwareStatusOriginal:
      "After releasing the rover, the descent stage flew to a planned impact location and crashed, as designed.",
    launchDate: "2020-07-30",
    arrivalDate: "2021-02-18",
    missionEndDate: "2021-02-18",
    primaryMilestone: event(
      "m2020-skycrane",
      "landing",
      "2021-02-18",
      "18 February 2021",
      "Sky-crane landing",
      "The descent stage lowered Perseverance to the surface and then departed to a planned impact site.",
      [PERSEVERANCE, "SRC-NSSDCA-MARS-2020"]
    ),
    timelineEvents: [
      event(
        "m2020-launch",
        "launch",
        "2020-07-30",
        "30 July 2020",
        "Launched from Earth",
        "The Mars 2020 spacecraft departed with the rover, helicopter and descent stage.",
        [PERSEVERANCE, "SRC-NSSDCA-MARS-2020"]
      ),
      event(
        "m2020-skycrane",
        "landing",
        "2021-02-18",
        "18 February 2021",
        "Sky-crane landing",
        "The descent stage lowered Perseverance to Jezero Crater.",
        [PERSEVERANCE]
      ),
      event(
        "m2020-impact",
        "impact",
        "2021-02-18",
        "18 February 2021",
        "Planned impact",
        "After release, the descent stage flew away and struck the surface at a planned location.",
        [PERSEVERANCE]
      ),
    ],
    scientificContributions: [
      {
        kind: "engineering",
        title: "Delivered a car-sized rover",
        summary:
          "The sky crane placed Perseverance gently on the surface despite the rover's size and the thin Martian atmosphere.",
      },
      {
        kind: "engineering",
        title: "Kept the landing zone clear",
        summary:
          "Flying the descent stage away after release reduced the risk of damaging the rover or its science targets.",
      },
    ],
    fate:
      "The descent stage impacted Mars on 18 February 2021 in a planned crash after releasing Perseverance. It was destroyed by design.",
    location: {
      body: "Mars",
      locationName: "Jezero Crater region",
      precision: "region",
      note: "The planned impact area is near the landing site; no precise coordinate is plotted here.",
    },
    technicalDetails: [
      { label: "Mission type", value: "Sky-crane descent stage" },
      { label: "Function", value: "Slow the spacecraft and lower the rover on a bridle" },
      { label: "Landing method", value: "Retrorockets plus sky-crane bridle" },
      { label: "Outcome", value: "Planned impact after rover release" },
    ],
    media: image(
      "/images/mars-2020-descent-stage.jpg",
      "A technician works on the Mars 2020 descent stage inside a spacecraft assembly facility.",
      "A technician works on the Mars 2020 descent stage inside JPL's Spacecraft Assembly Facility before launch.",
      "NASA/JPL-Caltech",
      "PIA22342",
      1600,
      1059
    ),
    relatedIds: ["perseverance", "ingenuity", "curiosity"],
    sourceIds: [PERSEVERANCE, "SRC-NSSDCA-MARS-2020"],
    dataNotes: [
      "The descent stage's impact was intentional. 'Impacted' describes the hardware outcome, not a failure.",
      "The mission status refers to the overall Mars 2020 mission; this artifact's own flight ended at the planned impact.",
    ],
  }),
];
