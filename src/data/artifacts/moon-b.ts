import { defineArtifact, event, image } from "./helpers";

const A14 = "SRC-APOLLO-14";
const A15 = "SRC-APOLLO-15";
const A17 = "SRC-APOLLO-17";

export const moonArtifactsB = [
  defineArtifact({
    id: "apollo-14-lm-descent-stage",
    name: "Apollo 14 Lunar Module Descent Stage",
    alternateNames: ["LM-8 descent stage", "Antares descent stage"],
    missionName: "Apollo 14",
    programName: "Apollo Program",
    destination: "Moon",
    destinationGroup: "moon",
    hardwareType: "lander",
    shortDescription:
      "The descent stage of the Antares lunar module, left in the Fra Mauro highlands after the third crewed Moon landing.",
    overview:
      "Apollo 14's lunar module Antares landed in the Fra Mauro formation in February 1971. The descent stage carried the crew and equipment to the surface and remained behind when the ascent stage lifted off. The mission is remembered for its successful recovery from docking problems and for the geology work at Fra Mauro.",
    scientificPurpose:
      "The descent stage was the landing and launch platform for the Apollo 14 surface mission. The crew used the site to sample material ejected from the Imbrium impact basin.",
    missionStatus: "completed",
    missionStatusOriginal:
      "NASA lists Apollo 14 as a completed crewed lunar landing mission.",
    hardwareStatus: "inactive",
    hardwareStatusOriginal:
      "The descent stage remains at the Fra Mauro landing site; the ascent stage departed and was jettisoned.",
    launchDate: "1971-01-31",
    arrivalDate: "1971-02-05",
    missionEndDate: "1971-02-09",
    primaryMilestone: event(
      "a14-landing",
      "landing",
      "1971-02-05",
      "5 February 1971",
      "Landed at Fra Mauro",
      "Antares touched down in the Fra Mauro highlands with Alan Shepard and Edgar Mitchell aboard.",
      [A14, "SRC-NSSDCA-APOLLO-14-LM"]
    ),
    timelineEvents: [
      event(
        "a14-launch",
        "launch",
        "1971-01-31",
        "31 January 1971",
        "Launched from Earth",
        "Apollo 14 lifted off from Kennedy Space Center.",
        [A14]
      ),
      event(
        "a14-landing",
        "landing",
        "1971-02-05",
        "5 February 1971",
        "Landed at Fra Mauro",
        "Antares began the third crewed lunar landing mission.",
        [A14]
      ),
      event(
        "a14-eva",
        "first-operation",
        "1971-02-05",
        "5 February 1971",
        "First surface excursion",
        "Shepard and Mitchell began their first moonwalk at Fra Mauro.",
        [A14]
      ),
      event(
        "a14-splashdown",
        "end-of-mission",
        "1971-02-09",
        "9 February 1971",
        "Splashdown",
        "The crew returned to Earth.",
        [A14]
      ),
    ],
    scientificContributions: [
      {
        kind: "science",
        title: "Sampled Imbrium basin ejecta",
        summary:
          "The Fra Mauro site gave the crew access to material thrown out by the giant Imbrium impact.",
      },
      {
        kind: "engineering",
        title: "Recovered from a docking emergency",
        summary:
          "The mission demonstrated problem-solving in lunar flight after difficulties docking the command and lunar modules.",
      },
    ],
    fate:
      "The descent stage remains at the Apollo 14 landing site in the Fra Mauro highlands. The ascent stage departed after the surface mission and was jettisoned.",
    location: {
      body: "Moon",
      locationName: "Fra Mauro formation",
      precision: "region",
      note: "The landing region is documented; no coordinate pair is plotted here.",
    },
    technicalDetails: [
      { label: "Mission type", value: "Crewed lunar landing" },
      { label: "Crew", value: "Alan Shepard and Edgar Mitchell (surface); Stuart Roosa (orbit)" },
      { label: "Launch vehicle", value: "Saturn V" },
      { label: "Landing site", value: "Fra Mauro formation" },
      { label: "Disposition", value: "Descent stage remains on the Moon" },
    ],
    media: image(
      "/images/apollo-14-lm-descent-stage.jpg",
      "The Apollo 14 lunar module Antares stands on the Moon, reflecting a circular flare from the sun.",
      "A front view of the Apollo 14 lunar module Antares during the first surface excursion on 5 February 1971.",
      "NASA",
      "as14-66-9306",
      1600,
      1662
    ),
    relatedIds: ["apollo-11-lm-descent-stage", "apollo-17-lm-descent-stage", "apollo-12-alsep"],
    sourceIds: [A14, "SRC-NSSDCA-APOLLO-14-LM"],
    dataNotes: [
      "This record describes the descent stage. The ascent stage's final condition is not part of this artifact record.",
    ],
  }),

  defineArtifact({
    id: "apollo-15-lunar-rover",
    name: "Apollo 15 Lunar Roving Vehicle",
    alternateNames: ["LRV", "Lunar Rover"],
    missionName: "Apollo 15",
    programName: "Apollo Program",
    destination: "Moon",
    destinationGroup: "moon",
    hardwareType: "rover",
    shortDescription:
      "The first lunar roving vehicle, used by Apollo 15 astronauts to extend their geological traverses at Hadley-Apennine.",
    overview:
      "The Lunar Roving Vehicle was a lightweight, battery-powered car designed to fold for launch and unfold on the Moon. Apollo 15 was the first mission to use one. David Scott and James Irwin drove it across the Hadley-Apennine region, reaching sites that would have been impossible to explore on foot during a short stay.",
    scientificPurpose:
      "The rover increased the distance astronauts could cover and the equipment and samples they could carry, allowing more ambitious geological field work.",
    missionStatus: "completed",
    missionStatusOriginal:
      "NASA lists Apollo 15 as a completed crewed lunar landing mission.",
    hardwareStatus: "inactive",
    hardwareStatusOriginal:
      "The rover was left on the Moon at the end of the mission and is not operating.",
    launchDate: "1971-07-26",
    arrivalDate: "1971-07-30",
    missionEndDate: "1971-08-07",
    primaryMilestone: event(
      "a15-first-drive",
      "first-operation",
      "1971-07-31",
      "31 July 1971",
      "First lunar rover drive",
      "Scott and Irwin deployed and drove the first Lunar Roving Vehicle.",
      [A15, "SRC-LRV", "SRC-ALSJ-A15-LRV"]
    ),
    timelineEvents: [
      event(
        "a15-launch",
        "launch",
        "1971-07-26",
        "26 July 1971",
        "Launched from Earth",
        "Apollo 15 departed for Hadley-Apennine.",
        [A15]
      ),
      event(
        "a15-landing",
        "landing",
        "1971-07-30",
        "30 July 1971",
        "Landed at Hadley-Apennine",
        "The lunar module Falcon touched down near Hadley Rille.",
        [A15]
      ),
      event(
        "a15-first-drive",
        "first-operation",
        "1971-07-31",
        "31 July 1971",
        "First rover drive",
        "The crew deployed the rover and began the first of three surface excursions.",
        [A15, "SRC-ALSJ-A15-LRV"]
      ),
      event(
        "a15-splashdown",
        "end-of-mission",
        "1971-08-07",
        "7 August 1971",
        "Splashdown",
        "The crew returned to Earth.",
        [A15]
      ),
    ],
    scientificContributions: [
      {
        kind: "engineering",
        title: "First crewed surface vehicle on the Moon",
        summary:
          "The Apollo 15 rover demonstrated that astronauts could drive across another world.",
      },
      {
        kind: "science",
        title: "Extended geological traverses",
        summary:
          "The rover let the crew reach and sample a wider range of terrains around Hadley-Apennine.",
      },
      {
        kind: "engineering",
        title: "Carried tools and samples",
        summary:
          "The vehicle transported astronauts, cameras, tools and collected samples across the surface.",
      },
    ],
    fate:
      "The Apollo 15 rover remains on the Moon at Hadley-Apennine. It is inactive and was left behind when the crew departed.",
    location: {
      body: "Moon",
      locationName: "Hadley-Apennine, near Hadley Rille",
      precision: "region",
      note: "The operating region is documented; no coordinate pair is plotted here.",
    },
    technicalDetails: [
      { label: "Mission type", value: "Crewed lunar landing with surface rover" },
      { label: "Unloaded mass", value: "About 210 kg (460 lb)" },
      { label: "Payload capacity", value: "About 490 kg on the Moon" },
      { label: "Power", value: "Batteries; each wheel had its own electric motor" },
      { label: "Apollo 15 distance", value: "About 27.8 km" },
      { label: "Crew", value: "David Scott and James Irwin (surface); Alfred Worden (orbit)" },
    ],
    media: image(
      "/images/apollo-15-lunar-rover.jpg",
      "The Apollo 15 lunar roving vehicle parked on the Moon during a surface excursion.",
      "The Lunar Roving Vehicle during the Apollo 15 mission. The battery-powered rover greatly extended the crew's surface range.",
      "NASA",
      "7022585",
      1600,
      1410
    ),
    relatedIds: ["apollo-15-lrrr", "apollo-17-lm-descent-stage", "apollo-11-lm-descent-stage"],
    sourceIds: [A15, "SRC-LRV", "SRC-ALSJ-A15-LRV"],
    dataNotes: [
      "Apollo 15 was the first of three missions to use the Lunar Roving Vehicle.",
      "The rover remains on the Moon; 'inactive' describes its operating state, not whether the hardware still exists.",
    ],
  }),

  defineArtifact({
    id: "apollo-15-lrrr",
    name: "Apollo 15 Lunar Laser Ranging Retroreflector",
    alternateNames: ["LRRR", "Lunar Laser Ranging Retroreflector"],
    missionName: "Apollo 15",
    programName: "Apollo Program",
    destination: "Moon",
    destinationGroup: "moon",
    hardwareType: "instrument",
    shortDescription:
      "A passive mirror array at Hadley-Apennine that still reflects laser pulses sent from Earth.",
    overview:
      "The Apollo 15 Lunar Laser Ranging Retroreflector is an array of corner-cube mirrors designed to bounce a laser beam directly back to its source. Astronauts David Scott and James Irwin deployed it at Hadley-Apennine in 1971. It needs no power and has no moving parts, so it has remained usable long after the mission ended.",
    scientificPurpose:
      "The experiment lets ground stations measure the round-trip travel time of laser pulses to the Moon, providing a precise way to study the Earth-Moon distance and the Moon's motion.",
    missionStatus: "completed",
    missionStatusOriginal:
      "NASA lists Apollo 15 as a completed crewed lunar landing mission.",
    hardwareStatus: "operating",
    hardwareStatusOriginal:
      "NASA's retroreflector record states that the distance to the Apollo arrays is still routinely measured; the instrument is passive and requires no power.",
    launchDate: "1971-07-26",
    arrivalDate: "1971-07-30",
    missionEndDate: "1971-08-07",
    primaryMilestone: event(
      "a15-lrrr-deploy",
      "deployment",
      "1971-07-31",
      "31 July 1971",
      "Deployed at Hadley-Apennine",
      "Apollo 15 astronauts placed the retroreflector array on the lunar surface.",
      [A15, "SRC-LRRR", "SRC-NSSDCA-APOLLO-15-LRRR"]
    ),
    timelineEvents: [
      event(
        "a15-launch",
        "launch",
        "1971-07-26",
        "26 July 1971",
        "Launched from Earth",
        "Apollo 15 lifted off on its mission to Hadley-Apennine.",
        [A15]
      ),
      event(
        "a15-landing",
        "landing",
        "1971-07-30",
        "30 July 1971",
        "Landed at Hadley-Apennine",
        "The lunar module Falcon landed near Hadley Rille.",
        [A15]
      ),
      event(
        "a15-lrrr-deploy",
        "deployment",
        "1971-07-31",
        "31 July 1971",
        "Retroreflector deployed",
        "The crew set up the laser ranging experiment on the surface.",
        [A15, "SRC-NSSDCA-APOLLO-15-LRRR"]
      ),
      event(
        "a15-splashdown",
        "end-of-mission",
        "1971-08-07",
        "7 August 1971",
        "Splashdown",
        "The crew returned to Earth after the mission.",
        [A15]
      ),
    ],
    scientificContributions: [
      {
        kind: "science",
        title: "Measures the Earth-Moon distance",
        summary:
          "Laser ranging to the retroreflector arrays provides precise distance measurements used to study the Earth-Moon system.",
      },
      {
        kind: "science",
        title: "Tracks lunar motion",
        summary:
          "Repeated ranging measurements help constrain the Moon's orbit, orientation and internal structure.",
      },
      {
        kind: "engineering",
        title: "A long-lived passive experiment",
        summary:
          "The array has no power source or moving parts, so it can keep working decades after the crew departed.",
      },
    ],
    fate:
      "The retroreflector remains at the Apollo 15 landing site and is still used for laser ranging. Its mission is complete, but the instrument is not retired in the same way a powered spacecraft is.",
    location: {
      body: "Moon",
      locationName: "Hadley-Apennine, near Hadley Rille",
      precision: "region",
      note: "The deployment region is documented; no coordinate pair is plotted in this record.",
    },
    technicalDetails: [
      { label: "Mission type", value: "Crewed lunar landing with surface experiments" },
      { label: "Instrument type", value: "Passive corner-cube retroreflector array" },
      { label: "Power required", value: "None" },
      { label: "Deployment site", value: "Hadley-Apennine" },
      { label: "Status", value: "Still used for lunar laser ranging" },
    ],
    media: image(
      "/images/apollo-15-lrrr.jpg",
      "A Lunar Reconnaissance Orbiter view of the Apollo 15 laser ranging retroreflector on the Moon.",
      "The Apollo 15 Lunar Laser Ranging Retroreflector, imaged from lunar orbit by NASA's Lunar Reconnaissance Orbiter.",
      "NASA/GSFC/Arizona State University",
      "PIA13037",
      752,
      752
    ),
    relatedIds: ["apollo-11-lrrr", "apollo-15-lunar-rover", "apollo-17-lm-descent-stage"],
    sourceIds: [A15, "SRC-LRRR", "SRC-NSSDCA-APOLLO-15-LRRR"],
    dataNotes: [
      "The instrument is still used even though the Apollo 15 mission is complete; mission status and hardware status are intentionally separate.",
    ],
  }),

  defineArtifact({
    id: "apollo-17-lm-descent-stage",
    name: "Apollo 17 Lunar Module Descent Stage",
    alternateNames: ["LM-12 descent stage", "Challenger descent stage"],
    missionName: "Apollo 17",
    programName: "Apollo Program",
    destination: "Moon",
    destinationGroup: "moon",
    hardwareType: "lander",
    shortDescription:
      "The descent stage of Challenger, left in the Taurus-Littrow valley after the final crewed Moon landing.",
    overview:
      "Apollo 17 was the last crewed lunar landing mission. Its lunar module Challenger landed in the Taurus-Littrow valley in December 1972, carrying Eugene Cernan and Harrison Schmitt. The descent stage stayed on the surface when the ascent stage lifted off, and the site has since been imaged from lunar orbit.",
    scientificPurpose:
      "The descent stage supported the final Apollo surface mission, which focused on sampling ancient highland material and investigating the valley's geology.",
    missionStatus: "completed",
    missionStatusOriginal:
      "NASA lists Apollo 17 as a completed crewed lunar landing mission.",
    hardwareStatus: "inactive",
    hardwareStatusOriginal:
      "The descent stage remains at Taurus-Littrow. The ascent stage departed after the surface mission and was jettisoned.",
    launchDate: "1972-12-07",
    arrivalDate: "1972-12-11",
    missionEndDate: "1972-12-19",
    primaryMilestone: event(
      "a17-landing",
      "landing",
      "1972-12-11",
      "11 December 1972",
      "Landed at Taurus-Littrow",
      "Challenger touched down in the Taurus-Littrow valley for the final Apollo landing.",
      [A17, "SRC-NSSDCA-APOLLO-17-LM"]
    ),
    timelineEvents: [
      event(
        "a17-launch",
        "launch",
        "1972-12-07",
        "7 December 1972",
        "Launched from Earth",
        "Apollo 17 began with a night launch from Kennedy Space Center.",
        [A17]
      ),
      event(
        "a17-landing",
        "landing",
        "1972-12-11",
        "11 December 1972",
        "Landed at Taurus-Littrow",
        "Challenger landed in the valley with Cernan and Schmitt aboard.",
        [A17]
      ),
      event(
        "a17-eva",
        "first-operation",
        "1972-12-11",
        "11 December 1972",
        "First surface excursion",
        "The crew began the first of three moonwalks.",
        [A17]
      ),
      event(
        "a17-splashdown",
        "end-of-mission",
        "1972-12-19",
        "19 December 1972",
        "Splashdown",
        "The crew returned to Earth, ending the Apollo lunar landing program.",
        [A17]
      ),
    ],
    scientificContributions: [
      {
        kind: "science",
        title: "Sampled ancient highland material",
        summary:
          "The Taurus-Littrow site allowed the crew to collect some of the oldest lunar samples returned by Apollo.",
      },
      {
        kind: "science",
        title: "Studied a complex valley",
        summary:
          "The mission investigated landslide deposits, volcanic material and highland massifs in one region.",
      },
      {
        kind: "engineering",
        title: "Closed out the Apollo landing program",
        summary:
          "Apollo 17 demonstrated the mature capability built up over the earlier landing missions.",
      },
    ],
    fate:
      "The descent stage remains in the Taurus-Littrow valley. The ascent stage left the surface after the mission and was jettisoned. The site has been photographed from lunar orbit.",
    location: {
      body: "Moon",
      locationName: "Taurus-Littrow valley",
      precision: "region",
      note: "The valley is documented as the landing region; no coordinate pair is included in this record.",
    },
    technicalDetails: [
      { label: "Mission type", value: "Crewed lunar landing" },
      { label: "Crew", value: "Eugene Cernan and Harrison Schmitt (surface); Ronald Evans (orbit)" },
      { label: "Launch vehicle", value: "Saturn V" },
      { label: "Landing site", value: "Taurus-Littrow valley" },
      { label: "Disposition", value: "Descent stage remains on the Moon" },
    ],
    media: image(
      "/images/apollo-17-lm-descent-stage.jpg",
      "A Lunar Reconnaissance Orbiter view of the Apollo 17 lunar module descent stage in the Taurus-Littrow valley.",
      "The Apollo 17 lunar module Challenger descent stage, imaged by NASA's Lunar Reconnaissance Orbiter.",
      "NASA/GSFC/Arizona State University",
      "PIA12920",
      776,
      776
    ),
    relatedIds: ["apollo-17-lm-descent-stage", "apollo-15-lunar-rover", "apollo-14-lm-descent-stage"],
    sourceIds: [A17, "SRC-NSSDCA-APOLLO-17-LM"],
    dataNotes: [
      "This record covers the descent stage only. Apollo 17 was the final crewed lunar landing mission.",
    ],
  }),

  defineArtifact({
    id: "lunar-prospector",
    name: "Lunar Prospector",
    alternateNames: ["Discovery 3"],
    missionName: "Lunar Prospector",
    programName: "Discovery Program",
    destination: "Moon",
    destinationGroup: "moon",
    hardwareType: "orbiter",
    shortDescription:
      "A small orbiter that mapped the Moon's composition and found evidence of hydrogen near the poles.",
    overview:
      "Lunar Prospector orbited the Moon from January 1998 to July 1999. Its instruments mapped surface composition and gravity, and its neutron spectrometer detected excess hydrogen at the poles, a strong clue that water ice might exist in permanently shadowed regions. The mission ended with a deliberate impact near the south pole.",
    scientificPurpose:
      "The mission was designed to map the Moon's elemental composition, magnetic field and gravity field, and to search for polar water ice.",
    missionStatus: "completed",
    missionStatusOriginal:
      "NASA lists Lunar Prospector as a completed mission that ended with a controlled impact.",
    hardwareStatus: "impacted",
    hardwareStatusOriginal:
      "The spacecraft was deliberately directed into the lunar surface at the end of its mission in July 1999.",
    launchDate: "1998-01-07",
    arrivalDate: "1998-01-11",
    missionEndDate: "1999-07-31",
    primaryMilestone: event(
      "lp-orbit",
      "orbit-insertion",
      "1998-01-11",
      "11 January 1998",
      "Entered lunar orbit",
      "Lunar Prospector began its mapping mission around the Moon.",
      ["SRC-LUNAR-PROSPECTOR", "SRC-NSSDCA-LUNAR-PROSPECTOR"]
    ),
    timelineEvents: [
      event(
        "lp-launch",
        "launch",
        "1998-01-07",
        "7 January 1998",
        "Launched from Earth",
        "A Lockheed Martin Athena II launched Lunar Prospector.",
        ["SRC-LUNAR-PROSPECTOR", "SRC-NSSDCA-LUNAR-PROSPECTOR"]
      ),
      event(
        "lp-orbit",
        "orbit-insertion",
        "1998-01-11",
        "11 January 1998",
        "Entered lunar orbit",
        "The spacecraft began its global mapping mission.",
        ["SRC-LUNAR-PROSPECTOR"]
      ),
      event(
        "lp-impact",
        "impact",
        "1999-07-31",
        "31 July 1999",
        "Controlled impact",
        "Lunar Prospector was deliberately crashed near the lunar south pole at the end of its mission.",
        ["SRC-LUNAR-PROSPECTOR"]
      ),
    ],
    scientificContributions: [
      {
        kind: "science",
        title: "Mapped lunar composition",
        summary:
          "Lunar Prospector's spectrometers produced global maps of key elements on the lunar surface.",
      },
      {
        kind: "science",
        title: "Found polar hydrogen signatures",
        summary:
          "Neutron data revealed excess hydrogen at both poles, supporting the idea of water ice in shadowed craters.",
      },
      {
        kind: "science",
        title: "Improved the gravity map",
        summary:
          "Tracking the orbiter refined models of the Moon's gravity field and internal structure.",
      },
    ],
    fate:
      "Lunar Prospector impacted the Moon on 31 July 1999 in a planned crash. The spacecraft was destroyed; the impact was intended to support observations of the polar region.",
    location: {
      body: "Moon",
      locationName: "Near the lunar south pole",
      precision: "region",
      note: "The impact target was near the south pole; this record does not plot a precise coordinate.",
    },
    technicalDetails: [
      { label: "Mission type", value: "Lunar polar orbiter" },
      { label: "Launch vehicle", value: "Athena II" },
      { label: "Mass", value: "About 296 kg at launch" },
      { label: "Key instruments", value: "Gamma-ray, neutron and alpha-particle spectrometers; magnetometer; gravity experiment" },
      { label: "End of mission", value: "Planned impact, 31 July 1999" },
    ],
    media: image(
      "/images/lunar-prospector.jpg",
      "Artist's concept of the Lunar Prospector spacecraft in lunar orbit with its instrument masts deployed.",
      "An artist's concept of Lunar Prospector in lunar orbit with its instrument masts fully deployed. This is an illustration, not a photograph.",
      "NASA/Ames Research Center",
      "PIA18162",
      1600,
      1275,
      true
    ),
    relatedIds: ["lcross", "ranger-7", "surveyor-1"],
    sourceIds: ["SRC-LUNAR-PROSPECTOR", "SRC-NSSDCA-LUNAR-PROSPECTOR"],
    dataNotes: [
      "The polar hydrogen detection was evidence for water ice, not a direct measurement of liquid water.",
      "The final impact was intentional; 'impacted' is a hardware outcome, not a mission failure.",
    ],
  }),

  defineArtifact({
    id: "lcross",
    name: "LCROSS",
    alternateNames: ["Lunar CRater Observation and Sensing Satellite"],
    missionName: "LCROSS",
    programName: "Lunar Precursor Robotic Program",
    destination: "Moon",
    destinationGroup: "moon",
    hardwareType: "probe",
    shortDescription:
      "A mission that deliberately crashed a rocket stage into a polar crater and confirmed the presence of water ice.",
    overview:
      "LCROSS traveled to the Moon with the Lunar Reconnaissance Orbiter in 2009. It directed a spent Centaur upper stage into the Cabeus crater near the south pole, then flew through the resulting debris plume and observed it before impacting the surface itself. The data provided strong evidence for water ice in a permanently shadowed crater.",
    scientificPurpose:
      "The mission was designed to excavate material from a permanently shadowed polar crater and measure its composition, especially the presence of water.",
    missionStatus: "completed",
    missionStatusOriginal:
      "NASA lists LCROSS as a completed mission that successfully impacted the Moon as planned.",
    hardwareStatus: "impacted",
    hardwareStatusOriginal:
      "Both the Centaur impactor and the LCROSS shepherding spacecraft struck the Moon on 9 October 2009.",
    launchDate: "2009-06-18",
    arrivalDate: "2009-10-09",
    missionEndDate: "2009-10-09",
    primaryMilestone: event(
      "lcross-impact",
      "impact",
      "2009-10-09",
      "9 October 2009",
      "Impacts in Cabeus crater",
      "LCROSS sent a Centaur stage into the crater and observed the plume before impacting the surface.",
      ["SRC-LCROSS", "SRC-NSSDCA-LCROSS"]
    ),
    timelineEvents: [
      event(
        "lcross-launch",
        "launch",
        "2009-06-18",
        "18 June 2009",
        "Launched with LRO",
        "LCROSS shared a launch with the Lunar Reconnaissance Orbiter.",
        ["SRC-LCROSS", "SRC-NSSDCA-LCROSS"]
      ),
      event(
        "lcross-impact",
        "impact",
        "2009-10-09",
        "9 October 2009",
        "Centaur impact",
        "The spent Centaur stage struck Cabeus crater, creating an observable plume.",
        ["SRC-LCROSS"]
      ),
      event(
        "lcross-end",
        "end-of-mission",
        "2009-10-09",
        "9 October 2009",
        "Shepherding spacecraft impact",
        "LCROSS flew through the plume and then impacted the Moon.",
        ["SRC-LCROSS"]
      ),
    ],
    scientificContributions: [
      {
        kind: "science",
        title: "Confirmed water ice at the lunar poles",
        summary:
          "LCROSS measurements of the impact plume provided direct evidence of water in Cabeus crater.",
      },
      {
        kind: "science",
        title: "Studied a permanently shadowed region",
        summary:
          "The mission sampled material from a crater floor that never receives direct sunlight.",
      },
      {
        kind: "engineering",
        title: "Used an impact as a scientific tool",
        summary:
          "LCROSS demonstrated that a controlled impact could expose and analyze subsurface material.",
      },
    ],
    fate:
      "Both spacecraft elements were destroyed in planned impacts on 9 October 2009. The mission is complete and the hardware no longer exists as an intact spacecraft.",
    location: {
      body: "Moon",
      locationName: "Cabeus crater, near the lunar south pole",
      precision: "region",
      note: "The impact site is documented; no coordinate pair is plotted in this record.",
    },
    technicalDetails: [
      { label: "Mission type", value: "Lunar impact and plume-observation mission" },
      { label: "Launch vehicle", value: "Atlas V 401" },
      { label: "Impactor", value: "Spent Centaur upper stage" },
      { label: "Observer", value: "LCROSS shepherding spacecraft" },
      { label: "Impact date", value: "9 October 2009" },
    ],
    media: image(
      "/images/lcross.jpg",
      "The LCROSS spacecraft in a clean room at Astrotech before launch.",
      "NASA's LCROSS spacecraft at Astrotech in Titusville, Florida, after arriving for launch processing in 2009.",
      "NASA/Kim Shiflett",
      "KSC-2009-1754",
      1600,
      1071
    ),
    relatedIds: ["lunar-prospector", "ranger-7", "surveyor-1"],
    sourceIds: ["SRC-LCROSS", "SRC-NSSDCA-LCROSS"],
    dataNotes: [
      "Both LCROSS impacts were intentional. 'Impacted' describes the hardware outcome.",
      "The water-ice finding refers to material in a permanently shadowed polar crater, not to liquid water on the surface.",
    ],
  }),
];
