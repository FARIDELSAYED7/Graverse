import type { Lesson } from "@/types/academy";

/**
 * Academy lessons.
 *
 * Every factual statement is drawn from the source-linked artifact and body
 * records. Lessons add explanation and sequencing, not new claims.
 */
export const lessons: Lesson[] = [
  {
    id: "what-is-an-artifact",
    title: "What is a space artifact?",
    ageBand: "5-7",
    minutes: 6,
    summary:
      "A space artifact is a real machine that people built and sent into space. Meet four of them.",
    objectives: [
      "Say what an artifact is in your own words.",
      "Name one machine on the Moon and one on Mars.",
      "Explain why a mission can be finished while its hardware is still there.",
    ],
    sections: [
      {
        heading: "A machine with a story",
        paragraphs: [
          "An artifact is something people made. A space artifact is a machine that was sent to space. Some are still working. Some are silent. Some are sitting on another world.",
          "Every artifact in GRAVERSE has a story: why it was sent, what it did, and what happened to it afterwards.",
        ],
      },
      {
        heading: "Finished is not the same as gone",
        paragraphs: [
          "A mission can be finished even when the machine is still there. The Apollo 11 lunar module's descent stage stayed on the Moon after the astronauts left. The mission ended. The hardware is still on the surface.",
          "GRAVERSE shows mission status and hardware status separately so these two ideas do not get mixed up.",
        ],
        callout:
          "Look for two badges on every artifact: one for the mission, one for the hardware.",
      },
      {
        heading: "Four machines to meet",
        paragraphs: [
          "Apollo 11's retroreflector is a mirror left on the Moon. Scientists still bounce lasers off it today.",
          "Sojourner was the first rover on Mars. Perseverance is a much newer rover, and Ingenuity was a small helicopter that flew there.",
        ],
      },
    ],
    keyTerms: [
      { term: "Artifact", definition: "A human-made object sent to space." },
      { term: "Mission", definition: "A spaceflight with a spacecraft and a goal." },
    ],
    tryIt:
      "Pick one artifact and find its two status badges. Ask: is the mission finished? Is the hardware still there?",
    quiz: [
      {
        prompt: "What is a space artifact?",
        options: [
          "A picture of space",
          "A machine people built and sent to space",
          "A planet",
        ],
        correctIndex: 1,
        explanation:
          "An artifact is a physical, human-made object. Pictures and planets are not artifacts.",
      },
      {
        prompt: "Can a mission be finished while its hardware is still on another world?",
        options: [
          "No, the hardware disappears",
          "Yes, the mission and the hardware are different things",
          "Only if the hardware is broken",
        ],
        correctIndex: 1,
        explanation:
          "Apollo 11's mission ended, but its descent stage and retroreflector are still on the Moon.",
      },
    ],
    artifactIds: [
      "apollo-11-lrrr",
      "apollo-11-lm-descent-stage",
      "sojourner",
      "perseverance",
    ],
    bodyIds: ["moon", "mars"],
    sourceIds: ["SRC-NASA-MOON", "SRC-NASA-MARS-2020"],
    accent: "#FF6B5A",
  },
  {
    id: "our-neighbor-the-moon",
    title: "Our neighbor, the Moon",
    ageBand: "5-7",
    minutes: 7,
    summary:
      "The Moon is close enough to visit. Learn why it has craters, why it changes shape, and who has walked on it.",
    objectives: [
      "Describe the Moon's surface.",
      "Explain why the Moon looks different each night.",
      "Name the first mission that landed people on the Moon.",
    ],
    sections: [
      {
        heading: "A world of craters",
        paragraphs: [
          "The Moon has no thick atmosphere to protect it. Rocks from space have hit it for billions of years, leaving bowl-shaped craters.",
          "Apollo astronauts brought rocks home. Scientists study them to understand how the Moon and Earth formed.",
        ],
      },
      {
        heading: "Why it changes shape",
        paragraphs: [
          "The Moon does not make its own light. We see the part lit by the Sun. As the Moon orbits Earth, we see different amounts of that lit side, which is why it seems to grow and shrink.",
        ],
      },
      {
        heading: "People on the Moon",
        paragraphs: [
          "Apollo 11 landed two astronauts on the Moon in July 1969. Five more Apollo missions landed crews between 1969 and 1972.",
          "Robotic missions from several countries have visited since. NASA's Artemis programme is working to return humans to the Moon.",
        ],
        callout: "Twelve people have walked on the Moon. All of them were Apollo astronauts.",
      },
    ],
    keyTerms: [
      { term: "Crater", definition: "A bowl-shaped hole made by an impact." },
      { term: "Orbit", definition: "The path one object takes around another." },
    ],
    tryIt:
      "Look at the Moon for several nights. Draw its shape each night and see how it changes.",
    quiz: [
      {
        prompt: "Why does the Moon have so many craters?",
        options: [
          "The wind blows the surface",
          "Rocks hit it for billions of years",
          "People dug them",
        ],
        correctIndex: 1,
        explanation:
          "With almost no atmosphere, the Moon keeps a record of impacts that Earth's weather would erase.",
      },
      {
        prompt: "Which mission first landed people on the Moon?",
        options: ["Apollo 11", "Voyager 1", "Perseverance"],
        correctIndex: 0,
        explanation:
          "Apollo 11 landed Neil Armstrong and Buzz Aldrin on 20 July 1969.",
      },
    ],
    artifactIds: [
      "ranger-7",
      "surveyor-1",
      "apollo-11-lm-descent-stage",
      "apollo-15-lunar-rover",
    ],
    bodyIds: ["moon", "earth"],
    sourceIds: ["SRC-NASA-MOON", "SRC-RANGER-7", "SRC-SURVEYOR-1"],
    accent: "#14B8A6",
  },
  {
    id: "how-rockets-leave-earth",
    title: "How a rocket leaves Earth",
    ageBand: "5-7",
    minutes: 6,
    summary:
      "Rockets push gas out one way and move the other way. That is how heavy machines get off the ground.",
    objectives: [
      "Explain thrust in simple words.",
      "Describe why rockets are built in stages.",
      "Recognise that most of a rocket's mass is fuel at launch.",
    ],
    sections: [
      {
        heading: "Push and push back",
        paragraphs: [
          "A rocket burns fuel and pushes hot gas out of its engine. The gas goes down, and the rocket is pushed up. This is called thrust.",
          "In space there is nothing to push against. The rocket still works because it is pushing its own exhaust away.",
        ],
      },
      {
        heading: "Drop the empty parts",
        paragraphs: [
          "Most of a rocket at launch is fuel and the tanks that hold it. When a tank is empty, the rocket can drop that stage so it does not have to carry the extra weight.",
          "This is why rockets look tall and thin, and why you sometimes see them break apart in a planned way during launch.",
        ],
      },
      {
        heading: "Fast enough to stay up",
        paragraphs: [
          "Getting above the air is not enough. A spacecraft must move sideways fast enough to keep falling around Earth instead of back into it. That speed is about 7.8 kilometres per second near Earth's surface.",
        ],
        callout: "Orbit is falling around a planet, not floating above it.",
      },
    ],
    keyTerms: [
      { term: "Thrust", definition: "The force that pushes a rocket forward." },
      { term: "Stage", definition: "A section of a rocket that can be dropped when its fuel is used up." },
    ],
    tryIt:
      "Blow up a balloon and let it go. The air rushes one way and the balloon moves the other way — a tiny rocket.",
    quiz: [
      {
        prompt: "Which way does hot gas leave a rocket engine?",
        options: [
          "Out the top",
          "Out the back, opposite to the direction of travel",
          "It stays inside",
        ],
        correctIndex: 1,
        explanation:
          "The engine pushes gas backwards, so the rocket is pushed forwards.",
      },
      {
        prompt: "Why do rockets drop empty stages?",
        options: [
          "To look smaller",
          "To save weight",
          "Because they are broken",
        ],
        correctIndex: 1,
        explanation:
          "Dropping empty tanks means the remaining rocket does not have to carry useless mass.",
      },
    ],
    artifactIds: ["apollo-11-lm-descent-stage", "perseverance", "voyager-1"],
    bodyIds: ["earth", "moon"],
    sourceIds: ["SRC-NASA-MOON", "SRC-NASA-VOYAGER"],
    accent: "#FFC93C",
  },
  {
    id: "rovers-are-robot-explorers",
    title: "Rovers are robot explorers",
    ageBand: "5-7",
    minutes: 7,
    summary:
      "A rover is a wheeled robot that drives across another world, taking pictures and testing rocks.",
    objectives: [
      "Explain what a rover does.",
      "Name two Mars rovers.",
      "Describe why rover drivers must plan carefully.",
    ],
    sections: [
      {
        heading: "A robot with wheels",
        paragraphs: [
          "A rover carries cameras and tools. It drives to rocks and uses a robot arm to touch them. Some rovers can drill into rock and study the powder inside.",
          "Sojourner was the first rover on Mars in 1997. Spirit and Opportunity followed in 2004, then Curiosity in 2012 and Perseverance in 2021.",
        ],
      },
      {
        heading: "Driving from far away",
        paragraphs: [
          "Rovers are driven by teams on Earth. A command takes several minutes to reach Mars, so the rover must protect itself between instructions.",
          "Drivers use pictures to plan a safe path. They avoid sharp rocks, steep slopes and sand that could trap the wheels.",
        ],
        callout:
          "The rover always moves more slowly than the people driving it would like. Safety comes first.",
      },
      {
        heading: "A helicopter on Mars",
        paragraphs: [
          "Ingenuity was a small helicopter that travelled to Mars with Perseverance. It made the first powered flight on another planet in 2021.",
        ],
      },
    ],
    keyTerms: [
      { term: "Rover", definition: "A wheeled robot that explores a surface." },
      { term: "Command", definition: "An instruction sent to a spacecraft." },
    ],
    tryIt:
      "Draw a rover with a camera, wheels and an arm. Label what each part is for.",
    quiz: [
      {
        prompt: "What was Sojourner?",
        options: ["The first Mars rover", "A Moon lander", "A space telescope"],
        correctIndex: 0,
        explanation:
          "Sojourner drove on Mars in 1997 as part of the Mars Pathfinder mission.",
      },
      {
        prompt: "Why must rover drivers plan carefully?",
        options: [
          "The rover is too fast",
          "Commands take minutes to arrive, so the rover must stay safe on its own",
          "The rover cannot take pictures",
        ],
        correctIndex: 1,
        explanation:
          "Radio signals take minutes to cross the distance to Mars, so drivers cannot correct mistakes instantly.",
      },
    ],
    artifactIds: ["sojourner", "spirit", "opportunity", "curiosity", "perseverance", "ingenuity"],
    bodyIds: ["mars"],
    sourceIds: ["SRC-NASA-PATHFINDER", "SRC-NASA-MARS-2020"],
    accent: "#F5A524",
  },
  {
    id: "reading-a-mission-timeline",
    title: "Reading a mission timeline",
    ageBand: "8-9",
    minutes: 8,
    summary:
      "Launch, arrival, first operation, last contact. Learn the order of events and why dates have different precision.",
    objectives: [
      "Order the main events of a mission.",
      "Distinguish launch from arrival.",
      "Explain why some dates are known only to the year.",
    ],
    sections: [
      {
        heading: "The shape of a mission",
        paragraphs: [
          "Most missions begin with a launch, then a cruise, then arrival at a target. Arrival can mean entering orbit, landing, or flying past.",
          "After arrival come operations: taking pictures, driving, drilling or measuring. The mission may end with a planned shutdown, a loss of contact, or an impact.",
        ],
      },
      {
        heading: "Why dates matter",
        paragraphs: [
          "A launch date and an arrival date can be years apart. Voyager 1 launched in 1977 and reached Jupiter in 1979. New Horizons launched in 2006 and flew past Pluto in 2015.",
          "Some records give a full day, some only a month or a year. GRAVERSE keeps that precision instead of pretending every date is exact.",
        ],
      },
      {
        heading: "The same event, different names",
        paragraphs: [
          "NASA sources do not always use the same labels. One page may say 'ended mission' while another says 'last contact'. GRAVERSE stores the original wording on the artifact and shows the normalized status separately.",
        ],
        callout:
          "When the record is uncertain, the honest answer is often a range or a note, not a made-up day.",
      },
    ],
    keyTerms: [
      { term: "Arrival", definition: "The moment a spacecraft reaches its target, by orbit, landing or flyby." },
      { term: "Date precision", definition: "How exact a date is — day, month or year." },
    ],
    tryIt:
      "Choose a mission on the timeline and list its events in order. Circle the one you would most want to know more about.",
    quiz: [
      {
        prompt: "Which usually comes first?",
        options: ["Arrival at the target", "Launch", "Last contact"],
        correctIndex: 1,
        explanation:
          "A mission launches before it travels to its target and begins operations.",
      },
      {
        prompt: "Why might a record show only a year?",
        options: [
          "The source only provides that precision",
          "GRAVERSE lost the rest of the date",
          "The event did not really happen",
        ],
        correctIndex: 0,
        explanation:
          "GRAVERSE preserves the precision available in the source rather than inventing a day.",
      },
    ],
    artifactIds: ["voyager-1", "new-horizons", "ranger-7", "perseverance"],
    bodyIds: ["jupiter", "pluto", "moon", "mars"],
    sourceIds: ["SRC-NASA-VOYAGER", "SRC-NASA-NEW-HORIZONS", "SRC-RANGER-7"],
    accent: "#14B8A6",
  },
  {
    id: "landers-and-orbiters",
    title: "Landers and orbiters",
    ageBand: "8-9",
    minutes: 8,
    summary:
      "Some spacecraft touch the surface. Others stay above it. Each gives us a different view.",
    objectives: [
      "Compare a lander with an orbiter.",
      "Explain one advantage of each.",
      "Recognise that the same mission can include both.",
    ],
    sections: [
      {
        heading: "Down on the surface",
        paragraphs: [
          "A lander touches down and works from one place. It can measure the atmosphere, dig into the soil and take close-up pictures. Viking 1 and 2 were landers; InSight was a lander that studied marsquakes.",
          "Surface operations are limited by dust, temperature and power. A lander cannot drive away from a problem.",
        ],
      },
      {
        heading: "Watching from above",
        paragraphs: [
          "An orbiter circles a body and maps large areas over time. It can photograph landing sites, track weather and relay data from rovers.",
          "Orbiters also carry instruments that need to be above the atmosphere, such as cameras and radar that map the surface below.",
        ],
      },
      {
        heading: "Working as a team",
        paragraphs: [
          "Many Mars missions combine an orbiter and a lander. The orbiter can act as a communications relay for the surface vehicle, sending its data back to Earth.",
        ],
        callout:
          "The question is not which is better. It is which view the science needs.",
      },
    ],
    keyTerms: [
      { term: "Lander", definition: "A spacecraft that touches down and operates on a surface." },
      { term: "Orbiter", definition: "A spacecraft that circles a body." },
    ],
    tryIt:
      "Compare Viking 1 (a lander) with a Mars orbiter. List one thing each can do that the other cannot.",
    quiz: [
      {
        prompt: "Which spacecraft stays in orbit around a body?",
        options: ["Lander", "Orbiter", "Rover"],
        correctIndex: 1,
        explanation:
          "An orbiter circles the body; a lander touches down and a rover moves on the surface.",
      },
      {
        prompt: "How can an orbiter help a rover?",
        options: [
          "It can drive the rover",
          "It can relay the rover's data to Earth",
          "It can refuel the rover",
        ],
        correctIndex: 1,
        explanation:
          "Orbiters often act as communications relays between surface vehicles and Earth.",
      },
    ],
    artifactIds: ["viking-1-lander", "insight", "curiosity", "cassini", "lunar-prospector"],
    bodyIds: ["mars", "saturn", "moon"],
    sourceIds: ["SRC-NASA-VIKING", "SRC-NASA-CURIOSITY", "SRC-NASA-CASSINI-MISSION"],
    accent: "#43B9FF",
  },
  {
    id: "why-mars-is-red",
    title: "Why Mars is red",
    ageBand: "8-9",
    minutes: 7,
    summary:
      "Iron-rich dust gives Mars its colour. Beneath the dust, rovers have found evidence of ancient water.",
    objectives: [
      "Explain the cause of Mars's colour.",
      "Describe one piece of evidence for ancient water.",
      "Distinguish evidence of past water from evidence of life.",
    ],
    sections: [
      {
        heading: "Rust in the dust",
        paragraphs: [
          "Mars's surface contains iron minerals that have reacted with oxygen. The resulting iron oxide — rust — gives the planet its red and orange colour.",
          "Dust storms can lift that fine material high into the atmosphere and sometimes cover the whole planet.",
        ],
      },
      {
        heading: "Water wrote the landscape",
        paragraphs: [
          "Orbiters have photographed valleys, deltas and layered sediments that look like they were shaped by flowing water. Rovers have found minerals that form in water.",
          "That evidence points to ancient liquid water. It does not, by itself, show that life ever existed there.",
        ],
        callout:
          "Water is a key ingredient for life as we know it. Finding water is not the same as finding life.",
      },
      {
        heading: "Reading the rocks",
        paragraphs: [
          "Curiosity studied layered rocks in Gale Crater. Perseverance is collecting rock cores in Jezero Crater, where a river delta once met a lake.",
          "Those samples are being cached for a possible future mission that would bring them to Earth.",
        ],
      },
    ],
    keyTerms: [
      { term: "Iron oxide", definition: "A compound of iron and oxygen, familiar as rust." },
      { term: "Delta", definition: "A fan of sediment deposited where a river meets a standing body of water." },
    ],
    tryIt:
      "Find a rusty object and a wet stone. Which one reminds you of Mars, and why?",
    quiz: [
      {
        prompt: "What gives Mars its red colour?",
        options: ["Iron oxide dust", "Liquid water", "Green plants"],
        correctIndex: 0,
        explanation:
          "Iron minerals in the dust have oxidized, forming rust-coloured iron oxide.",
      },
      {
        prompt: "Evidence of ancient water on Mars proves that life existed there.",
        options: ["True", "False — it shows water, not life"],
        correctIndex: 1,
        explanation:
          "Water is relevant to habitability, but no mission has confirmed life on Mars.",
      },
    ],
    artifactIds: ["curiosity", "perseverance", "opportunity", "phoenix"],
    bodyIds: ["mars"],
    sourceIds: ["SRC-NASA-MARS", "SRC-NASA-CURIOSITY", "SRC-NASA-MARS-2020"],
    accent: "#F97362",
  },
  {
    id: "signals-across-space",
    title: "Signals across space",
    ageBand: "8-9",
    minutes: 8,
    summary:
      "Radio signals travel at light speed, but space is huge. Learn why distance makes conversation slow.",
    objectives: [
      "Explain why there is a delay in talking to a spacecraft.",
      "Estimate the one-way light time to Mars.",
      "Describe what happens when a spacecraft is behind the Sun.",
    ],
    sections: [
      {
        heading: "The speed limit",
        paragraphs: [
          "Radio waves travel at the speed of light: about 300,000 kilometres per second. That sounds fast, but Mars can be more than 200 million kilometres away.",
          "At that distance, a signal takes more than 11 minutes one way. A question and answer take over 22 minutes.",
        ],
      },
      {
        heading: "No real-time joystick",
        paragraphs: [
          "Because of the delay, engineers send a sequence of commands and let the spacecraft execute it. Rovers are designed to stop safely if a command does not arrive.",
          "Deep-space missions use large dish antennas on Earth to send and receive very faint signals.",
        ],
      },
      {
        heading: "Behind the Sun",
        paragraphs: [
          "When a spacecraft is on the opposite side of the Sun from Earth, the Sun's plasma can disrupt radio signals. Missions plan quiet periods around these conjunctions.",
        ],
        callout:
          "The farther away a spacecraft is, the more autonomy it needs.",
      },
    ],
    keyTerms: [
      { term: "Light-time", definition: "The time light or radio takes to travel between two points." },
      { term: "Conjunction", definition: "A geometry where a spacecraft and Earth are on opposite sides of the Sun." },
    ],
    tryIt:
      "If Mars is 225 million km away, how long does a radio signal take one way? Divide by 300,000 km/s.",
    quiz: [
      {
        prompt: "Why can't engineers drive a Mars rover with a joystick in real time?",
        options: [
          "The rover has no wheels",
          "Radio signals take minutes to travel each way",
          "Mars has no radio waves",
        ],
        correctIndex: 1,
        explanation:
          "The round-trip light time can exceed 20 minutes, so commands must be planned in advance.",
      },
      {
        prompt: "What is solar conjunction?",
        options: [
          "A spacecraft landing on the Sun",
          "The Sun between Earth and a spacecraft, disrupting communications",
          "A solar eclipse on Mars",
        ],
        correctIndex: 1,
        explanation:
          "During conjunction the Sun's plasma can interfere with radio signals.",
      },
    ],
    artifactIds: ["perseverance", "voyager-1", "new-horizons", "cassini"],
    bodyIds: ["mars", "earth", "sun"],
    sourceIds: ["SRC-NASA-VOYAGER", "SRC-NASA-MARS-2020"],
    accent: "#FFC93C",
  },
  {
    id: "mission-status-vs-hardware-status",
    title: "Mission status vs hardware status",
    ageBand: "10-12",
    minutes: 9,
    summary:
      "The most important distinction in GRAVERSE: a finished mission does not tell you what happened to the machine.",
    objectives: [
      "Define mission status and hardware status separately.",
      "Give an example where they differ.",
      "Explain why collapsing them would mislead a reader.",
    ],
    sections: [
      {
        heading: "Two different questions",
        paragraphs: [
          "Mission status answers: is the mission still operating, finished, lost, or planned? Hardware status answers: what is documented about the physical object today?",
          "A mission can be completed while its hardware is still operating, inactive, destroyed, or still traveling. Voyager's missions are still ongoing, and both spacecraft are still traveling and communicating.",
        ],
      },
      {
        heading: "Why the difference matters",
        paragraphs: [
          "If a museum labels every completed mission 'dead', it erases the objects that survive on the Moon and Mars. Apollo 11's mission is completed, but its retroreflector is still used for laser ranging.",
          "If a page labels every still-existing object 'active', it overstates the evidence. A descent stage on the Moon is not operating just because it is still there.",
        ],
        callout:
          "GRAVERSE keeps the original NASA wording next to the normalized status so the source is never hidden.",
      },
      {
        heading: "How GRAVERSE normalizes",
        paragraphs: [
          "Mission status uses planned, ongoing, completed, ended, lost-contact and unknown. Hardware status uses operating, inactive, no longer communicating, impacted, destroyed, still traveling and unknown.",
          "Neither scale is a score. 'Unknown' is a legitimate, honest value.",
        ],
      },
    ],
    keyTerms: [
      { term: "Mission status", definition: "The state of the mission as a whole." },
      { term: "Hardware status", definition: "The documented state of the physical object." },
    ],
    tryIt:
      "Find one artifact with a completed mission and a non-operating hardware status. Then find one where the hardware is still traveling.",
    quiz: [
      {
        prompt: "A mission is marked completed. What can you conclude about its hardware?",
        options: [
          "Nothing yet — hardware status is a separate field",
          "It was destroyed",
          "It is still operating",
        ],
        correctIndex: 0,
        explanation:
          "Mission completion does not determine the physical fate of the hardware.",
      },
      {
        prompt: "Why does GRAVERSE keep the original NASA status wording?",
        options: [
          "To make pages longer",
          "To preserve traceability when normalization changes the wording",
          "Because NASA requires it",
        ],
        correctIndex: 1,
        explanation:
          "The original wording lets a reader check the source and see what was normalized.",
      },
    ],
    artifactIds: ["apollo-11-lrrr", "voyager-1", "opportunity", "lcross", "ingenuity"],
    bodyIds: ["moon", "mars"],
    sourceIds: ["SRC-NASA-MOON", "SRC-NASA-VOYAGER", "SRC-NASA-OPPORTUNITY"],
    accent: "#14B8A6",
  },
  {
    id: "gravity-assists-and-the-grand-tour",
    title: "Gravity assists and the Grand Tour",
    ageBand: "10-12",
    minutes: 10,
    summary:
      "How Voyager used planetary gravity to visit four giant planets — and why the alignment was rare.",
    objectives: [
      "Explain how a gravity assist changes a spacecraft's path.",
      "Describe the planetary alignment that enabled the Grand Tour.",
      "Identify why Voyager 1 and 2 ended up on different trajectories.",
    ],
    sections: [
      {
        heading: "Borrowing momentum",
        paragraphs: [
          "A gravity assist uses a planet's motion around the Sun to change a spacecraft's speed and direction. In the planet's frame the spacecraft is deflected; in the Sun's frame it can gain or lose energy.",
          "The manoeuvre costs no fuel. It does require careful timing and a favourable geometry.",
        ],
      },
      {
        heading: "A once-in-176-years lineup",
        paragraphs: [
          "In the late 1970s the outer planets were arranged so that a single spacecraft could visit Jupiter, Saturn, Uranus and Neptune in sequence. That alignment repeats roughly every 176 years.",
          "Voyager 2 took advantage of it. Voyager 1 flew past Jupiter and Saturn, then used a Titan flyby to bend its path out of the planetary plane and toward interstellar space.",
        ],
      },
      {
        heading: "Still traveling",
        paragraphs: [
          "Both Voyagers are now in interstellar space. They are powered by radioisotope thermoelectric generators, which produce less power each year.",
          "Their missions are ongoing, but their hardware is aging. GRAVERSE records both facts rather than choosing one.",
        ],
        callout:
          "A gravity assist is not a slingshot from science fiction. It is a precise exchange of orbital energy.",
      },
    ],
    keyTerms: [
      { term: "Gravity assist", definition: "Using a planet's gravity to change a spacecraft's speed or direction." },
      { term: "RTG", definition: "A radioisotope thermoelectric generator, which converts heat from radioactive decay into electricity." },
    ],
    tryIt:
      "Trace Voyager 2's path on the Explorer timeline. List the planets it visited in order.",
    quiz: [
      {
        prompt: "What does a gravity assist change?",
        options: [
          "The spacecraft's speed and direction",
          "The planet's orbit permanently",
          "The spacecraft's colour",
        ],
        correctIndex: 0,
        explanation:
          "The spacecraft exchanges orbital energy with the planet, changing its trajectory.",
      },
      {
        prompt: "Why was the Voyager Grand Tour possible in the late 1970s?",
        options: [
          "The planets were unusually close to Earth",
          "The outer planets were aligned in a rare configuration",
          "NASA had invented faster rockets",
        ],
        correctIndex: 1,
        explanation:
          "The alignment allowed one spacecraft to visit multiple giant planets in sequence.",
      },
    ],
    artifactIds: ["voyager-1", "voyager-2", "pioneer-10", "pioneer-11", "cassini"],
    bodyIds: ["jupiter", "saturn", "uranus", "neptune"],
    sourceIds: ["SRC-NASA-VOYAGER", "SRC-NASA-SATURN", "SRC-NASA-JUPITER"],
    accent: "#A78BFA",
  },
  {
    id: "engineering-for-another-world",
    title: "Engineering for another world",
    ageBand: "10-12",
    minutes: 10,
    summary:
      "Heat, dust, cold and distance shape every design. Compare the engineering trade-offs behind four machines.",
    objectives: [
      "Identify three environmental hazards a spacecraft must survive.",
      "Compare power options for short and long missions.",
      "Explain why redundancy matters when repair is impossible.",
    ],
    sections: [
      {
        heading: "The environment is the specification",
        paragraphs: [
          "A Mars rover must survive dust storms, extreme cold and a thin atmosphere. A Venus lander must survive crushing pressure and heat. A Moon lander must handle vacuum and temperature swings.",
          "Engineers cannot send a repair crew, so designs use redundancy: backup components, safe modes and the ability to recover from faults.",
        ],
      },
      {
        heading: "Power choices",
        paragraphs: [
          "Solar panels work well near the Sun but produce less power as dust accumulates and sunlight weakens. Mars rovers have used both solar power and radioisotope power.",
          "Radioisotope generators produce steady power for decades, which is why Voyager and Curiosity use them. They are heavier and require careful handling.",
        ],
      },
      {
        heading: "Landing is the hard part",
        paragraphs: [
          "Perseverance used a heat shield, a parachute and a rocket-powered sky crane to lower the rover to the surface. Each stage had to work in sequence with no second chance.",
          "The engineering is not decoration. It determines what science a mission can attempt.",
        ],
        callout:
          "Every gram of mass is a trade-off between protection, power, instruments and fuel.",
      },
    ],
    keyTerms: [
      { term: "Redundancy", definition: "Backup systems that let a spacecraft continue after a failure." },
      { term: "Sky crane", definition: "A rocket-powered descent stage that lowers a rover on cables." },
    ],
    tryIt:
      "Compare Perseverance and InSight. What does each carry, and what does that tell you about its power and mass budget?",
    quiz: [
      {
        prompt: "Why do spacecraft use redundant systems?",
        options: [
          "To make them heavier",
          "Because repairs in space are usually impossible",
          "Because NASA requires two of everything",
        ],
        correctIndex: 1,
        explanation:
          "Backups let a mission survive a component failure when no repair mission is possible.",
      },
      {
        prompt: "Which power source is better suited to a decades-long deep-space mission?",
        options: ["Solar panels", "Radioisotope thermoelectric generators", "Batteries only"],
        correctIndex: 1,
        explanation:
          "RTGs produce steady power for decades, while sunlight weakens far from the Sun.",
      },
    ],
    artifactIds: ["perseverance", "curiosity", "insight", "voyager-1", "cassini"],
    bodyIds: ["mars", "saturn", "jupiter"],
    sourceIds: ["SRC-NASA-MARS-2020", "SRC-NASA-CURIOSITY", "SRC-NASA-VOYAGER"],
    accent: "#F5A524",
  },
  {
    id: "how-we-know-what-we-know",
    title: "How we know what we know",
    ageBand: "10-12",
    minutes: 9,
    summary:
      "Sources, dates and uncertainty. Learn to read GRAVERSE like a researcher, not a headline.",
    objectives: [
      "Distinguish confirmed, estimated, simulated and unknown claims.",
      "Find the source and verification date for a fact.",
      "Explain why a missing value can be more honest than a guess.",
    ],
    sections: [
      {
        heading: "Every claim has a status",
        paragraphs: [
          "Confirmed means a primary source states it directly. Estimated means the source gives a range or approximation. Simulated means GRAVERSE computed it from published parameters. Unknown means no source in the record establishes it.",
          "The label is not a judgement about importance. It is a statement about evidence.",
        ],
      },
      {
        heading: "Follow the citation",
        paragraphs: [
          "Each artifact page lists the NASA pages used for its dates, statuses and descriptions. Each source has an access date, because web pages change.",
          "If two sources disagree, GRAVERSE records the discrepancy in the data notes instead of silently choosing one.",
        ],
      },
      {
        heading: "Uncertainty is information",
        paragraphs: [
          "A missing launch time is not a failure of the interface. It is a true statement about the record. Showing 'unknown' preserves trust.",
          "The same applies to 3D models. A schematic is labelled as a schematic. It is never presented as a photograph of the real object.",
        ],
        callout:
          "The strongest claim you can make is the one you can trace.",
      },
    ],
    keyTerms: [
      { term: "Provenance", definition: "The record of where a fact came from and when it was checked." },
      { term: "Confidence", definition: "How strongly the evidence supports a claim." },
    ],
    tryIt:
      "Open any artifact and find one confirmed fact and one note about uncertainty. Explain the difference in one sentence.",
    quiz: [
      {
        prompt: "What does 'estimated' mean in GRAVERSE?",
        options: [
          "The value was invented",
          "A source gives a range or approximation",
          "The value is wrong",
        ],
        correctIndex: 1,
        explanation:
          "Estimated values are still sourced; they are just not single exact measurements.",
      },
      {
        prompt: "Why show 'unknown' instead of a plausible guess?",
        options: [
          "Because the interface looks better",
          "Because a guess would misrepresent the evidence",
          "Because NASA forbids all estimates",
        ],
        correctIndex: 1,
        explanation:
          "GRAVERSE is a source-linked record. An unsourced guess would undermine the entire dataset.",
      },
    ],
    artifactIds: ["apollo-11-lrrr", "perseverance", "voyager-1", "cassini"],
    bodyIds: ["moon", "mars", "earth"],
    sourceIds: ["SRC-NASA-MOON", "SRC-NASA-MARS-2020", "SRC-NASA-VOYAGER", "SRC-NASA-PLANETARY-FACTS"],
    accent: "#FF6B5A",
  },
];

export const lessonMap = new Map(lessons.map((lesson) => [lesson.id, lesson]));

export function getLesson(id: string) {
  return lessonMap.get(id);
}

export function getLessonsByAge(age: Lesson["ageBand"]) {
  return lessons.filter((lesson) => lesson.ageBand === age);
}
