import { defineArtifact, event, image } from "./helpers";

const A11 = "SRC-APOLLO-11";
const A12 = "SRC-APOLLO-12";

export const moonArtifactsA = [
  defineArtifact({
    id: "ranger-7",
    name: "Ranger 7",
    alternateNames: ["Ranger Block 3"],
    missionName: "Ranger 7",
    programName: "Ranger Program",
    destination: "Moon",
    destinationGroup: "moon",
    hardwareType: "probe",
    shortDescription:
      "The first U.S. spacecraft to return close-up images of the Moon, deliberately impacting the surface after a 17-minute image sequence.",
    overview:
      "Ranger 7 was a robotic impact probe built to photograph the Moon at close range before crashing into it. On 31 July 1964 it transmitted thousands of images during its final approach, giving scientists their first detailed look at the lunar surface and proving the camera system that later Rangers would use.",
    scientificPurpose:
      "The mission was designed to obtain high-resolution images of the lunar surface during the final minutes before impact, helping planners understand terrain and select safe landing sites for future missions.",
    missionStatus: "completed",
    missionStatusOriginal:
      "NASA lists Ranger 7 as a successful mission that returned the first U.S. close-up images of the Moon.",
    hardwareStatus: "impacted",
    hardwareStatusOriginal:
      "The spacecraft struck the Moon as planned at the end of its imaging sequence; no part of the flight hardware remains operational.",
    launchDate: "1964-07-28",
    arrivalDate: "1964-07-31",
    missionEndDate: "1964-07-31",
    primaryMilestone: event(
      "ranger7-impact",
      "impact",
      "1964-07-31",
      "31 July 1964",
      "Impacted the Moon after imaging",
      "Ranger 7 returned close-up photographs during its final approach and struck the lunar surface as planned.",
      ["SRC-RANGER-7", "SRC-NSSDCA-RANGER-7"]
    ),
    timelineEvents: [
      event(
        "ranger7-launch",
        "launch",
        "1964-07-28",
        "28 July 1964",
        "Launched from Earth",
        "An Atlas-Agena B launched Ranger 7 from Cape Kennedy.",
        ["SRC-RANGER-7", "SRC-NSSDCA-RANGER-7"]
      ),
      event(
        "ranger7-impact",
        "impact",
        "1964-07-31",
        "31 July 1964",
        "Impacted the Moon",
        "The spacecraft sent back a sequence of close-up images before hitting the surface.",
        ["SRC-RANGER-7"]
      ),
    ],
    scientificContributions: [
      {
        kind: "science",
        title: "First U.S. close-up lunar images",
        summary:
          "Ranger 7 returned thousands of photographs of the Moon at resolutions far better than Earth-based telescopes could achieve.",
      },
      {
        kind: "engineering",
        title: "Validated the Ranger camera system",
        summary:
          "The successful image sequence demonstrated the spacecraft and television system that later Ranger missions also used.",
      },
      {
        kind: "science",
        title: "Supported landing-site planning",
        summary:
          "The images helped scientists assess lunar terrain as NASA prepared for future robotic and crewed landings.",
      },
    ],
    fate:
      "Ranger 7 impacted the Moon on 31 July 1964 as intended. The spacecraft was destroyed by the impact; its final images were returned before contact ended.",
    location: {
      body: "Moon",
      locationName: "Mare Cognitum region",
      precision: "region",
      note: "The impact region is documented, but this record does not plot a precise coordinate.",
    },
    technicalDetails: [
      { label: "Mission type", value: "Robotic lunar impact probe" },
      { label: "Launch vehicle", value: "Atlas-Agena B" },
      { label: "Mass", value: "About 366 kg" },
      { label: "Imaging", value: "Six television cameras; images returned during terminal descent" },
      { label: "Outcome", value: "Planned impact after imaging" },
    ],
    media: image(
      "/images/ranger-7.jpg",
      "Ranger 7 spacecraft in a clean room at NASA's Jet Propulsion Laboratory, with engineers standing beside it.",
      "Ranger 7 in the Spacecraft Assembly Facility's High Bay 1 at NASA's Jet Propulsion Laboratory on 10 December 1963.",
      "NASA/JPL-Caltech",
      "PIA23520",
      1600,
      2004
    ),
    relatedIds: ["surveyor-1", "lunar-prospector", "lcross"],
    sourceIds: ["SRC-RANGER-7", "SRC-NSSDCA-RANGER-7"],
    dataNotes: [
      "Ranger 7's impact was intentional. 'Impacted' describes the hardware outcome, not a mission failure.",
      "The image shows the spacecraft during ground processing, not on the lunar surface.",
    ],
  }),

  defineArtifact({
    id: "surveyor-1",
    name: "Surveyor 1",
    alternateNames: ["Surveyor A"],
    missionName: "Surveyor 1",
    programName: "Surveyor Program",
    destination: "Moon",
    destinationGroup: "moon",
    hardwareType: "lander",
    shortDescription:
      "The first U.S. spacecraft to make a controlled soft landing on the Moon, returning thousands of surface images.",
    overview:
      "Surveyor 1 was a robotic lander designed to demonstrate a controlled lunar soft landing and to study the surface. It touched down in the Ocean of Storms on 2 June 1966 and returned images and engineering data that helped prepare the Apollo landings.",
    scientificPurpose:
      "The mission tested landing technology and measured the lunar surface's bearing strength and texture, information NASA needed to design safe crewed landers.",
    missionStatus: "completed",
    missionStatusOriginal:
      "NASA lists Surveyor 1 as a successful soft-landing mission.",
    hardwareStatus: "inactive",
    hardwareStatusOriginal:
      "The lander operated on the lunar surface until contact was lost in January 1967.",
    launchDate: "1966-05-30",
    arrivalDate: "1966-06-02",
    missionEndDate: "1967-01-07",
    lastContactDate: "1967-01-07",
    primaryMilestone: event(
      "surveyor1-landing",
      "landing",
      "1966-06-02",
      "2 June 1966",
      "First U.S. soft landing on the Moon",
      "Surveyor 1 touched down in the Ocean of Storms and began returning surface images.",
      ["SRC-SURVEYOR-1", "SRC-NSSDCA-SURVEYOR-1"]
    ),
    timelineEvents: [
      event(
        "surveyor1-launch",
        "launch",
        "1966-05-30",
        "30 May 1966",
        "Launched from Earth",
        "An Atlas-Centaur launched Surveyor 1 toward the Moon.",
        ["SRC-SURVEYOR-1", "SRC-NSSDCA-SURVEYOR-1"]
      ),
      event(
        "surveyor1-landing",
        "landing",
        "1966-06-02",
        "2 June 1966",
        "Soft landing in the Ocean of Storms",
        "Surveyor 1 became the first U.S. spacecraft to land softly on the Moon.",
        ["SRC-SURVEYOR-1"]
      ),
      event(
        "surveyor1-last-contact",
        "last-contact",
        "1967-01-07",
        "7 January 1967",
        "Last contact",
        "The lander stopped responding after months of surface operations.",
        ["SRC-NSSDCA-SURVEYOR-1"]
      ),
    ],
    scientificContributions: [
      {
        kind: "engineering",
        title: "Demonstrated a lunar soft landing",
        summary:
          "Surveyor 1 proved that a spacecraft could descend to the lunar surface and operate there, a key step toward Apollo.",
      },
      {
        kind: "science",
        title: "Returned surface images",
        summary:
          "The lander sent back thousands of photographs showing the texture and structure of the lunar surface.",
      },
      {
        kind: "engineering",
        title: "Measured surface properties",
        summary:
          "Surveyor's data helped engineers understand how the lunar soil would behave under the weight of a lander.",
      },
    ],
    fate:
      "Surveyor 1 remains on the Moon in the Ocean of Storms. It stopped communicating in January 1967 and is inactive.",
    location: {
      body: "Moon",
      locationName: "Oceanus Procellarum (Ocean of Storms)",
      precision: "region",
      note: "The landing region is documented; no precise coordinate is plotted here.",
    },
    technicalDetails: [
      { label: "Mission type", value: "Robotic lunar lander" },
      { label: "Launch vehicle", value: "Atlas-Centaur" },
      { label: "Mass", value: "About 995 kg at launch" },
      { label: "Landing site", value: "Oceanus Procellarum" },
      { label: "Last contact", value: "7 January 1967" },
    ],
    media: image(
      "/images/surveyor-1.jpg",
      "A small bright shape marks Surveyor 1 on the lunar surface in a photograph taken from lunar orbit.",
      "Surveyor 1 on the lunar surface, photographed by Lunar Orbiter III. The spacecraft appears as the small light-colored area inside the crater.",
      "NASA/Langley Research Center",
      "LRC-1967-B701_P-04028",
      1600,
      1537
    ),
    relatedIds: ["surveyor-3", "ranger-7", "apollo-11-lm-descent-stage"],
    sourceIds: ["SRC-SURVEYOR-1", "SRC-NSSDCA-SURVEYOR-1"],
    dataNotes: [
      "Surveyor 1 landed before Apollo 11; it was a robotic precursor, not part of the crewed Apollo program.",
    ],
  }),

  defineArtifact({
    id: "surveyor-3",
    name: "Surveyor 3",
    alternateNames: ["Surveyor C"],
    missionName: "Surveyor 3",
    programName: "Surveyor Program",
    destination: "Moon",
    destinationGroup: "moon",
    hardwareType: "lander",
    shortDescription:
      "A robotic lunar lander that was later visited by the Apollo 12 crew, who returned parts of it to Earth.",
    overview:
      "Surveyor 3 landed in the Ocean of Storms in April 1967 and studied the lunar surface. In November 1969 the Apollo 12 crew landed nearby and walked to the spacecraft, photographing it and returning selected components for analysis on Earth.",
    scientificPurpose:
      "Surveyor 3 was built to demonstrate soft-landing technology and study the lunar surface. Its later examination by Apollo 12 added a rare look at how hardware survived years on the Moon.",
    missionStatus: "completed",
    missionStatusOriginal:
      "NASA lists Surveyor 3 as a successful lunar landing mission.",
    hardwareStatus: "inactive",
    hardwareStatusOriginal:
      "The lander stopped operating in 1967. It remains on the Moon and was visited by Apollo 12 astronauts in 1969.",
    launchDate: "1967-04-17",
    arrivalDate: "1967-04-20",
    missionEndDate: "1967-05-04",
    lastContactDate: "1967-05-04",
    primaryMilestone: event(
      "surveyor3-landing",
      "landing",
      "1967-04-20",
      "20 April 1967",
      "Landed in the Ocean of Storms",
      "Surveyor 3 touched down and began its surface investigation.",
      ["SRC-SURVEYOR-3", "SRC-NSSDCA-SURVEYOR-3"]
    ),
    timelineEvents: [
      event(
        "surveyor3-launch",
        "launch",
        "1967-04-17",
        "17 April 1967",
        "Launched from Earth",
        "An Atlas-Centaur launched Surveyor 3 toward the Moon.",
        ["SRC-SURVEYOR-3", "SRC-NSSDCA-SURVEYOR-3"]
      ),
      event(
        "surveyor3-landing",
        "landing",
        "1967-04-20",
        "20 April 1967",
        "Landed in the Ocean of Storms",
        "Surveyor 3 began its mission on the lunar surface.",
        ["SRC-SURVEYOR-3"]
      ),
      event(
        "surveyor3-apollo12",
        "milestone",
        "1969-11-20",
        "20 November 1969",
        "Visited by Apollo 12",
        "Astronauts Conrad and Bean walked to Surveyor 3 and returned hardware samples to Earth.",
        ["SRC-APOLLO-12", "SRC-NSSDCA-APOLLO-12-LM"]
      ),
      event(
        "surveyor3-last-contact",
        "last-contact",
        "1967-05-04",
        "4 May 1967",
        "Last contact",
        "The lander stopped communicating after its short surface mission.",
        ["SRC-NSSDCA-SURVEYOR-3"]
      ),
    ],
    scientificContributions: [
      {
        kind: "engineering",
        title: "Tested lunar landing hardware",
        summary:
          "Surveyor 3 added to the engineering evidence that spacecraft could land safely on the Moon.",
      },
      {
        kind: "science",
        title: "Studied the lunar surface",
        summary:
          "The lander returned images and soil-mechanics data from the Ocean of Storms.",
      },
      {
        kind: "science",
        title: "Provided a long-duration exposure sample",
        summary:
          "Parts returned by Apollo 12 let scientists study how materials and microbes had fared during more than two years on the Moon.",
      },
    ],
    fate:
      "Surveyor 3 is inactive on the Moon. Apollo 12 astronauts visited it in 1969 and brought selected parts back to Earth; the rest of the lander remains at the site.",
    location: {
      body: "Moon",
      locationName: "Oceanus Procellarum, near the Apollo 12 landing site",
      precision: "approximate",
      note: "The site is documented in mission records; this record does not plot a coordinate.",
    },
    technicalDetails: [
      { label: "Mission type", value: "Robotic lunar lander" },
      { label: "Launch vehicle", value: "Atlas-Centaur" },
      { label: "Mass", value: "About 1,026 kg at launch" },
      { label: "Landing site", value: "Oceanus Procellarum" },
      { label: "Last contact", value: "4 May 1967" },
      { label: "Later visit", value: "Apollo 12, November 1969" },
    ],
    media: image(
      "/images/surveyor-3.jpg",
      "The Surveyor 3 lander sits in a shallow crater on the Moon, photographed during the Apollo 12 second moonwalk.",
      "Surveyor 3 in its crater, photographed during the Apollo 12 second extravehicular activity on 20 November 1969.",
      "NASA",
      "as12-48-7121",
      1600,
      1600
    ),
    relatedIds: ["surveyor-1", "apollo-12-alsep", "apollo-11-lm-descent-stage"],
    sourceIds: [
      "SRC-SURVEYOR-3",
      "SRC-NSSDCA-SURVEYOR-3",
      "SRC-APOLLO-12",
      "SRC-NSSDCA-APOLLO-12-LM",
    ],
    dataNotes: [
      "Surveyor 3's mission ended in 1967; the 1969 Apollo 12 visit is a separate mission event that affected the artifact's history.",
    ],
  }),

  defineArtifact({
    id: "apollo-11-lm-descent-stage",
    name: "Apollo 11 Lunar Module Descent Stage",
    alternateNames: ["LM-5 descent stage", "Eagle descent stage"],
    missionName: "Apollo 11",
    programName: "Apollo Program",
    destination: "Moon",
    destinationGroup: "moon",
    hardwareType: "lander",
    shortDescription:
      "The lower half of the Eagle lunar module, left behind at Tranquility Base after carrying the first astronauts to the Moon.",
    overview:
      "The Apollo 11 lunar module Eagle had two stages. The descent stage carried the crew, landing gear and surface equipment to the Moon; after touchdown it served as the launch platform for the ascent stage. It remains at Tranquility Base, where it was left when Armstrong and Aldrin lifted off.",
    scientificPurpose:
      "The descent stage was the landing system for the first crewed lunar landing. It carried the propellant, engine and gear needed to place Eagle safely on the surface.",
    missionStatus: "completed",
    missionStatusOriginal:
      "NASA lists Apollo 11 as a completed crewed lunar landing mission.",
    hardwareStatus: "inactive",
    hardwareStatusOriginal:
      "The descent stage remains at Tranquility Base. The ascent stage lifted off and was jettisoned after rendezvous.",
    launchDate: "1969-07-16",
    arrivalDate: "1969-07-20",
    missionEndDate: "1969-07-24",
    primaryMilestone: event(
      "a11-landing",
      "landing",
      "1969-07-20",
      "20 July 1969",
      "First crewed landing on the Moon",
      "Eagle landed in the Sea of Tranquility with Neil Armstrong and Buzz Aldrin aboard.",
      [A11, "SRC-NSSDCA-APOLLO-11-LM"]
    ),
    timelineEvents: [
      event(
        "a11-launch",
        "launch",
        "1969-07-16",
        "16 July 1969",
        "Launched from Earth",
        "A Saturn V launched Apollo 11 from Kennedy Space Center.",
        [A11]
      ),
      event(
        "a11-landing",
        "landing",
        "1969-07-20",
        "20 July 1969",
        "Landed at Tranquility Base",
        "Eagle touched down in Mare Tranquillitatis.",
        [A11]
      ),
      event(
        "a11-eva",
        "first-operation",
        "1969-07-21",
        "21 July 1969",
        "First moonwalk",
        "Armstrong and Aldrin became the first humans to walk on the Moon.",
        [A11, "SRC-ALSJ-A11-EASEP"]
      ),
      event(
        "a11-liftoff",
        "milestone",
        "1969-07-21",
        "21 July 1969",
        "Ascent stage lifts off",
        "The ascent stage left the descent stage behind and returned the crew to lunar orbit.",
        [A11, "SRC-NSSDCA-APOLLO-11-LM"]
      ),
      event(
        "a11-splashdown",
        "end-of-mission",
        "1969-07-24",
        "24 July 1969",
        "Splashdown",
        "The crew returned to Earth and the mission ended in the Pacific Ocean.",
        [A11]
      ),
    ],
    scientificContributions: [
      {
        kind: "engineering",
        title: "Achieved the first crewed lunar landing",
        summary:
          "The descent stage placed Armstrong and Aldrin on the Moon and then served as the launch platform for their return to orbit.",
      },
      {
        kind: "science",
        title: "Supported the first surface science",
        summary:
          "The crew deployed experiments and collected samples during the first moonwalk.",
      },
    ],
    fate:
      "The descent stage remains at Tranquility Base. The ascent stage was jettisoned after the crew rejoined the command module and was not tracked to a documented final condition.",
    location: {
      body: "Moon",
      locationName: "Tranquility Base, Mare Tranquillitatis",
      precision: "approximate",
      note: "The landing site is documented; no coordinate pair is plotted in this record.",
    },
    technicalDetails: [
      { label: "Mission type", value: "Crewed lunar landing" },
      { label: "Crew", value: "Neil Armstrong and Buzz Aldrin (surface); Michael Collins (orbit)" },
      { label: "Launch vehicle", value: "Saturn V" },
      { label: "Descent stage mass", value: "About 10,300 kg fueled" },
      { label: "Landing site", value: "Mare Tranquillitatis" },
      { label: "Disposition", value: "Descent stage remains on the Moon" },
    ],
    media: image(
      "/images/apollo-11-lm-descent-stage.jpg",
      "Buzz Aldrin prepares to deploy experiments beside the Apollo 11 lunar module on the Moon.",
      "Buzz Aldrin prepares to deploy the Early Apollo Scientific Experiments Package beside Eagle at Tranquility Base on 20 July 1969.",
      "NASA",
      "as11-40-5927",
      1600,
      1600
    ),
    relatedIds: ["apollo-11-lrrr", "apollo-14-lm-descent-stage", "apollo-17-lm-descent-stage"],
    sourceIds: [A11, "SRC-NSSDCA-APOLLO-11-LM", "SRC-ALSJ-A11-EASEP"],
    dataNotes: [
      "This record covers the descent stage only. The ascent stage had a separate fate and is not described as still intact.",
      "Mission success and hardware condition are separate: Apollo 11 completed its mission, while the ascent stage's final condition is undocumented.",
    ],
  }),

  defineArtifact({
    id: "apollo-11-lrrr",
    name: "Apollo 11 Laser Ranging Retroreflector",
    alternateNames: ["LR-3", "Lunar Laser Ranging Retroreflector"],
    missionName: "Apollo 11",
    programName: "Apollo Program",
    destination: "Moon",
    destinationGroup: "moon",
    hardwareType: "instrument",
    shortDescription:
      "A passive mirror array left at Tranquility Base that still returns laser pulses sent from Earth.",
    overview:
      "The Laser Ranging Retroreflector is a panel of corner-cube mirrors designed to reflect a laser beam directly back toward its source. Apollo 11 astronauts deployed the first one during their moonwalk in July 1969. Because it has no power supply or moving parts, it has continued to serve as a lunar ranging target for decades.",
    scientificPurpose:
      "Ground stations fire short laser pulses at the array and time the return. Those measurements help scientists track the Moon's orbit and orientation and test aspects of gravity.",
    missionStatus: "completed",
    missionStatusOriginal:
      "NASA lists Apollo 11 as a completed lunar landing mission.",
    hardwareStatus: "operating",
    hardwareStatusOriginal:
      "The passive retroreflector is still used for lunar laser ranging; it requires no power and has no moving parts.",
    launchDate: "1969-07-16",
    arrivalDate: "1969-07-20",
    missionEndDate: "1969-07-24",
    primaryMilestone: event(
      "a11-lrrr-deploy",
      "deployment",
      "1969-07-21",
      "21 July 1969",
      "Retroreflector deployed",
      "The Apollo 11 crew set up the laser ranging retroreflector at Tranquility Base.",
      [A11, "SRC-ALSJ-A11-EASEP", "SRC-NSSDCA-APOLLO-11-LRRR"]
    ),
    timelineEvents: [
      event(
        "a11-launch",
        "launch",
        "1969-07-16",
        "16 July 1969",
        "Launched from Earth",
        "Apollo 11 departed for the Moon.",
        [A11]
      ),
      event(
        "a11-landing",
        "landing",
        "1969-07-20",
        "20 July 1969",
        "Landed at Tranquility Base",
        "Eagle touched down in the Sea of Tranquility.",
        [A11]
      ),
      event(
        "a11-lrrr-deploy",
        "deployment",
        "1969-07-21",
        "21 July 1969",
        "LRRR deployed",
        "The crew placed the retroreflector on the lunar surface during the first moonwalk.",
        [A11, "SRC-ALSJ-A11-EASEP", "SRC-NSSDCA-APOLLO-11-LRRR"]
      ),
    ],
    scientificContributions: [
      {
        kind: "science",
        title: "A long-lived lunar laboratory",
        summary:
          "The array lets observatories measure the Earth-Moon distance with extraordinary precision.",
      },
      {
        kind: "science",
        title: "Tests gravity and lunar interior models",
        summary:
          "Laser ranging data constrain the Moon's orbit, libration and internal structure.",
      },
      {
        kind: "engineering",
        title: "Proved a passive surface experiment",
        summary:
          "The retroreflector demonstrated that a simple, unpowered instrument could keep returning data for decades.",
      },
    ],
    fate:
      "The retroreflector remains at Tranquility Base and is still used for lunar laser ranging. The Apollo 11 mission is complete, but the instrument itself remains functional.",
    location: {
      body: "Moon",
      locationName: "Tranquility Base, Mare Tranquillitatis",
      precision: "approximate",
      note: "The deployment site is documented; no coordinate pair is plotted in this record.",
    },
    technicalDetails: [
      { label: "Instrument type", value: "Passive corner-cube retroreflector array" },
      { label: "Power required", value: "None" },
      { label: "Deployment site", value: "Tranquility Base" },
      { label: "Deployment date", value: "21 July 1969" },
      { label: "Status", value: "Still used for lunar laser ranging" },
    ],
    media: image(
      "/images/apollo-11-lrrr.jpg",
      "The Apollo 11 laser ranging retroreflector and passive seismometer sit deployed on the lunar surface.",
      "Two components of the Early Apollo Scientific Experiments Package on the Moon. The laser ranging retroreflector is at right; the passive seismometer is in the background.",
      "NASA",
      "as11-37-5551",
      1600,
      1600
    ),
    relatedIds: ["apollo-15-lrrr", "apollo-11-lm-descent-stage", "apollo-12-alsep"],
    sourceIds: [A11, "SRC-NSSDCA-APOLLO-11-LRRR", "SRC-ALSJ-A11-EASEP"],
    dataNotes: [
      "'Operating' means the passive array still returns laser pulses. It has no powered electronics.",
      "Apollo 11, Apollo 14 and Apollo 15 each deployed a retroreflector; this record covers the Apollo 11 array.",
    ],
  }),

  defineArtifact({
    id: "apollo-12-alsep",
    name: "Apollo 12 ALSEP",
    alternateNames: ["Apollo Lunar Surface Experiments Package"],
    missionName: "Apollo 12",
    programName: "Apollo Program",
    destination: "Moon",
    destinationGroup: "moon",
    hardwareType: "surface-equipment",
    shortDescription:
      "The first full Apollo lunar surface experiment station, deployed in the Ocean of Storms in November 1969.",
    overview:
      "Apollo 12 carried the first complete Apollo Lunar Surface Experiments Package to the Moon. The crew deployed a central station and a set of instruments, including a seismometer and a magnetometer, then left them to operate remotely. The station sent data back to Earth until the ALSEP network was shut down in 1977.",
    scientificPurpose:
      "ALSEP was designed to make long-term measurements of the lunar environment after the astronauts left, including seismic activity, the magnetic field, the solar wind and the thin lunar atmosphere.",
    missionStatus: "completed",
    missionStatusOriginal:
      "NASA lists Apollo 12 as a completed crewed lunar landing mission.",
    hardwareStatus: "inactive",
    hardwareStatusOriginal:
      "The Apollo 12 ALSEP operated until the lunar surface experiment network was shut down on 30 September 1977.",
    launchDate: "1969-11-14",
    arrivalDate: "1969-11-19",
    missionEndDate: "1969-11-24",
    primaryMilestone: event(
      "a12-alsep-deploy",
      "deployment",
      "1969-11-19",
      "19 November 1969",
      "ALSEP deployed",
      "The Apollo 12 crew set up the first full lunar surface experiment station.",
      [A12, "SRC-ALSJ-A12-ALSEP", "SRC-NSSDCA-APOLLO-12-LM"]
    ),
    timelineEvents: [
      event(
        "a12-launch",
        "launch",
        "1969-11-14",
        "14 November 1969",
        "Launched from Earth",
        "Apollo 12 lifted off from Kennedy Space Center.",
        [A12]
      ),
      event(
        "a12-landing",
        "landing",
        "1969-11-19",
        "19 November 1969",
        "Landed in the Ocean of Storms",
        "The lunar module Intrepid touched down near Surveyor 3.",
        [A12]
      ),
      event(
        "a12-alsep-deploy",
        "deployment",
        "1969-11-19",
        "19 November 1969",
        "ALSEP deployed",
        "Astronauts Conrad and Bean deployed the experiment package.",
        [A12, "SRC-ALSJ-A12-ALSEP"]
      ),
      event(
        "a12-alsep-shutdown",
        "shutdown",
        "1977-09-30",
        "30 September 1977",
        "ALSEP network shut down",
        "NASA ended the lunar surface experiment network after years of operation.",
        ["SRC-ALSJ-A12-ALSEP"]
      ),
    ],
    scientificContributions: [
      {
        kind: "science",
        title: "First long-term lunar geophysics station",
        summary:
          "ALSEP returned seismic, magnetic and atmospheric measurements long after the crew departed.",
      },
      {
        kind: "science",
        title: "Recorded moonquakes",
        summary:
          "The passive seismometer contributed to the discovery and study of lunar seismic activity.",
      },
      {
        kind: "engineering",
        title: "Demonstrated remote surface operations",
        summary:
          "The station showed that experiments could be deployed and operated remotely for years.",
      },
    ],
    fate:
      "The Apollo 12 ALSEP remains at the Ocean of Storms site. The network was switched off on 30 September 1977; the hardware is inactive.",
    location: {
      body: "Moon",
      locationName: "Oceanus Procellarum, Apollo 12 site",
      precision: "approximate",
      note: "The deployment site is documented; no coordinate pair is plotted here.",
    },
    technicalDetails: [
      { label: "Mission type", value: "Crewed lunar landing with surface experiments" },
      { label: "Package", value: "Central station plus geophysical instruments" },
      { label: "Key instruments", value: "Passive seismometer, magnetometer, solar wind and ion detectors" },
      { label: "Power", value: "Radioisotope thermoelectric generator" },
      { label: "Network shutdown", value: "30 September 1977" },
    ],
    media: image(
      "/images/apollo-12-alsep.jpg",
      "Components of the Apollo 12 ALSEP sit deployed on the lunar surface, with the central station and seismometer visible.",
      "Three components of the Apollo 12 ALSEP on the Moon, photographed by Alan Bean during the first Apollo 12 moonwalk on 19 November 1969.",
      "NASA",
      "as12-47-6918",
      1600,
      1548
    ),
    relatedIds: ["apollo-11-lrrr", "surveyor-3", "apollo-14-lm-descent-stage"],
    sourceIds: [A12, "SRC-ALSJ-A12-ALSEP", "SRC-NSSDCA-APOLLO-12-LM"],
    dataNotes: [
      "The ALSEP shutdown was a program decision, not a hardware failure; 'inactive' reflects its current operating state.",
      "Apollo 12's ALSEP was the first full package; Apollo 11 carried the smaller EASEP.",
    ],
  }),
];
