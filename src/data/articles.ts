import type { Article } from "@/types/space";

/** Short, source-linked explainers that connect the three experiences. */
export const articles: Article[] = [
  {
    id: "why-hardware-outlives-missions",
    title: "Why the hardware outlives the mission",
    dek: "A finished mission is a paperwork event. The machine may still be on the Moon, in orbit, or crossing interstellar space.",
    readingMinutes: 4,
    topics: ["Provenance", "Hardware", "Mission status"],
    sections: [
      {
        heading: "Two clocks",
        paragraphs: [
          "Mission teams measure success in objectives and operating time. Museums measure an object in physical survival. These are different clocks, and they rarely stop at the same moment.",
          "Apollo 11's mission ended when the crew splashed down. Its lunar module descent stage and retroreflector stayed behind. The retroreflector is still used for laser ranging.",
        ],
      },
      {
        heading: "What the record can support",
        paragraphs: [
          "A source may say a rover stopped communicating, but not that it was destroyed. Those are different claims. GRAVERSE records 'no longer communicating' unless a source documents physical destruction.",
          "When the fate is genuinely unknown, the page says so. That is not a gap in the interface; it is a finding about the evidence.",
        ],
      },
    ],
    relatedArtifactIds: ["apollo-11-lrrr", "apollo-11-lm-descent-stage", "opportunity", "voyager-1"],
    relatedBodyIds: ["moon", "mars"],
    sourceIds: ["SRC-NASA-MOON", "SRC-NASA-OPPORTUNITY", "SRC-NASA-VOYAGER"],
    lastVerified: "2026-11-10",
  },
  {
    id: "reading-a-rover-fate",
    title: "Reading a rover's fate",
    dek: "Spirit, Opportunity and Ingenuity all stopped communicating. Their endings were not the same.",
    readingMinutes: 5,
    topics: ["Mars", "Rovers", "Hardware status"],
    sections: [
      {
        heading: "Endings are specific",
        paragraphs: [
          "Spirit became embedded in soft soil and later stopped communicating. Opportunity was silenced by a global dust storm. Ingenuity suffered rotor damage during a flight and could no longer fly.",
          "Each ending is documented differently. A responsible record keeps those differences instead of reducing them to 'failed'.",
        ],
      },
      {
        heading: "What survives",
        paragraphs: [
          "The hardware remains on Mars. The missions are over. The data and the engineering lessons continue to be used.",
          "GRAVERSE separates the mission outcome from the physical object so a reader can see all three facts at once.",
        ],
      },
    ],
    relatedArtifactIds: ["spirit", "opportunity", "ingenuity"],
    relatedBodyIds: ["mars"],
    sourceIds: ["SRC-NASA-SPIRIT", "SRC-NASA-OPPORTUNITY", "SRC-NASA-MARS-2020"],
    lastVerified: "2026-11-10",
  },
  {
    id: "the-grand-tour",
    title: "The Grand Tour",
    dek: "A rare planetary alignment let two spacecraft visit the outer solar system. Both are still traveling.",
    readingMinutes: 6,
    topics: ["Voyager", "Gravity assist", "Deep space"],
    sections: [
      {
        heading: "A window that opens rarely",
        paragraphs: [
          "The outer planets line up in a way that allows a single spacecraft to visit them in sequence roughly every 176 years. The late 1970s were one of those windows.",
          "Voyager 1 and 2 used gravity assists at Jupiter and Saturn. Voyager 2 continued to Uranus and Neptune; Voyager 1 used a Titan flyby to leave the planetary plane.",
        ],
      },
      {
        heading: "Interstellar space",
        paragraphs: [
          "Both spacecraft eventually crossed the heliopause, the boundary where the Sun's influence gives way to the interstellar medium. They are still sending data, though their power declines each year.",
          "Their mission status is ongoing. Their hardware is aging. Both statements are true.",
        ],
      },
    ],
    relatedArtifactIds: ["voyager-1", "voyager-2", "pioneer-10", "pioneer-11"],
    relatedBodyIds: ["jupiter", "saturn", "uranus", "neptune"],
    sourceIds: ["SRC-NASA-VOYAGER", "SRC-NASA-JUPITER", "SRC-NASA-SATURN"],
    lastVerified: "2026-11-10",
  },
  {
    id: "what-mars-rovers-look-for",
    title: "What Mars rovers actually look for",
    dek: "Not little green men. Water, chemistry, and the conditions that could have supported life.",
    readingMinutes: 5,
    topics: ["Mars", "Astrobiology", "Rovers"],
    sections: [
      {
        heading: "Habitability, not life",
        paragraphs: [
          "Rovers search for evidence of past water, organic molecules and chemical energy sources. Together these describe whether an environment could have been habitable.",
          "A habitable environment is not proof that life existed. No Mars mission has confirmed life.",
        ],
      },
      {
        heading: "Samples for the future",
        paragraphs: [
          "Perseverance is collecting rock cores and caching them. Bringing them to Earth would let laboratories use instruments far too large to send to Mars.",
          "That return has not happened yet. GRAVERSE marks it as planned, not completed.",
        ],
      },
    ],
    relatedArtifactIds: ["curiosity", "perseverance", "opportunity", "sojourner"],
    relatedBodyIds: ["mars"],
    sourceIds: ["SRC-NASA-MARS", "SRC-NASA-CURIOSITY", "SRC-NASA-MARS-2020"],
    lastVerified: "2026-11-10",
  },
  {
    id: "the-moon-as-a-laboratory",
    title: "The Moon as a laboratory",
    dek: "Six Apollo landings left experiments behind. Some are still returning data.",
    readingMinutes: 4,
    topics: ["Moon", "Apollo", "Instruments"],
    sections: [
      {
        heading: "Instruments that stayed",
        paragraphs: [
          "Apollo crews deployed seismometers, magnetometers, heat-flow probes and retroreflectors. The retroreflectors are passive: they need no power and still reflect laser pulses.",
          "The seismometers recorded moonquakes and helped reveal the Moon's internal structure. Most were switched off decades ago.",
        ],
      },
      {
        heading: "A shared surface record",
        paragraphs: [
          "Later missions have imaged the Apollo sites from orbit. The hardware is part of a growing archaeological record on the Moon.",
          "GRAVERSE treats each experiment package as a separate artifact because each has its own hardware status.",
        ],
      },
    ],
    relatedArtifactIds: ["apollo-11-lrrr", "apollo-12-alsep", "apollo-15-lrrr", "apollo-15-lunar-rover"],
    relatedBodyIds: ["moon"],
    sourceIds: ["SRC-NASA-MOON", "SRC-NSSDCA-APOLLO-11-LRRR", "SRC-NASA-APOLLO-15"],
    lastVerified: "2026-11-10",
  },
  {
    id: "why-lander-sites-matter",
    title: "Why lander sites matter",
    dek: "A landing site is chosen for safety first, science second, and sometimes history third.",
    readingMinutes: 4,
    topics: ["Landing", "Engineering", "Mars"],
    sections: [
      {
        heading: "Safe, then interesting",
        paragraphs: [
          "Engineers need a flat, rock-free area within reach of the science targets. A scientifically perfect site is useless if the spacecraft cannot land there.",
          "Perseverance's Jezero Crater site was selected for its ancient river delta, but the descent system still had to avoid hazards on the way down.",
        ],
      },
      {
        heading: "The site becomes a record",
        paragraphs: [
          "Once a lander is on the surface, its location becomes part of the artifact record. A precise coordinate is only shown when the source provides one.",
          "For older missions, the documented location may be a region rather than an exact point. GRAVERSE keeps that precision.",
        ],
      },
    ],
    relatedArtifactIds: ["perseverance", "viking-1-lander", "insight", "apollo-11-lm-descent-stage"],
    relatedBodyIds: ["mars", "moon"],
    sourceIds: ["SRC-NASA-MARS-2020", "SRC-NASA-VIKING", "SRC-NASA-MOON"],
    lastVerified: "2026-11-10",
  },
  {
    id: "what-a-3d-model-can-and-cannot-show",
    title: "What a 3D model can and cannot show",
    dek: "A reconstruction is a tool for understanding scale. It is not a photograph.",
    readingMinutes: 3,
    topics: ["3D", "Media literacy", "Provenance"],
    sections: [
      {
        heading: "Reconstructions are labelled",
        paragraphs: [
          "GRAVERSE uses NASA imagery for artifacts. Where an artifact is shown as a schematic or reconstruction, the interface labels it as an illustration.",
          "No fictional spacecraft is presented as real hardware. A model that only approximates a shape is not evidence of what the object looks like.",
        ],
      },
      {
        heading: "Why 3D at all",
        paragraphs: [
          "Spatial views help with scale and relationships: how far apart the planets are, how a lander sits on the surface, how a timeline spans decades.",
          "Every 3D view has a 2D alternative so the information remains available without WebGL.",
        ],
      },
    ],
    relatedArtifactIds: ["perseverance", "voyager-1"],
    relatedBodyIds: ["earth", "mars"],
    sourceIds: ["SRC-NASA-MARS-2020", "SRC-NASA-VOYAGER"],
    lastVerified: "2026-11-10",
  },
  {
    id: "how-to-read-a-source",
    title: "How to read a source",
    dek: "A URL is not a citation. The organization, page type and access date matter.",
    readingMinutes: 4,
    topics: ["Provenance", "Methodology", "Sources"],
    sections: [
      {
        heading: "Primary and secondary",
        paragraphs: [
          "A NASA mission page is a secondary summary written by the agency. An NSSDCA spacecraft record is a technical archive entry. Both are useful, but they answer different questions.",
          "GRAVERSE records the organization, title, URL, type and access date for every source. The type tells you what kind of document you are reading.",
        ],
      },
      {
        heading: "Pages change",
        paragraphs: [
          "Agency pages are edited. The access date records what GRAVERSE saw, not a permanent edition. If a page changes later, the record still shows when it was checked.",
          "Where a value is missing, the honest interface shows the gap. Where sources disagree, the note says so.",
        ],
      },
    ],
    relatedArtifactIds: ["apollo-11-lrrr", "curiosity", "new-horizons"],
    relatedBodyIds: ["moon", "mars", "pluto"],
    sourceIds: ["SRC-NASA-MOON", "SRC-NASA-PLANETARY-FACTS", "SRC-NASA-NEW-HORIZONS"],
    lastVerified: "2026-11-10",
  },
];

export const articleMap = new Map(articles.map((article) => [article.id, article]));
