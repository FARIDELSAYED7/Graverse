/**
 * Research Archive content.
 *
 * This file documents the method behind the collection. It deliberately keeps
 * the distinction between a source, a claim and an interpretation.
 */

export interface MethodSection {
  id: string;
  heading: string;
  paragraphs: string[];
}

export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  changes: string[];
}

export interface CoverageRow {
  label: string;
  value: string;
  note: string;
}

export const methodSections: MethodSection[] = [
  {
    id: "scope",
    heading: "Scope and selection",
    paragraphs: [
      "GRAVERSE is a curated exhibition, not a complete inventory of everything NASA has launched. Records are selected to cover the Moon, Mars and deep space, and to include hardware in different states: operating, inactive, destroyed, impacted and unknown.",
      "A record is included only when a public source establishes the object's identity and enough of its mission context to tell a source-linked story. The collection does not pad its count with objects that cannot be documented.",
    ],
  },
  {
    id: "sources",
    heading: "Source hierarchy",
    paragraphs: [
      "Primary preference is given to NASA mission pages, NASA Science, NASA/JPL mission archives, NASA/NSSDCA spacecraft records and official NASA image records. The Apollo Lunar Surface Journal is used for Apollo surface operations where it provides the relevant detail.",
      "Secondary institutional sources are used only when a primary record is unavailable. Every registered source records its organization, title, URL, type and access date.",
    ],
  },
  {
    id: "claims",
    heading: "Claim labels",
    paragraphs: [
      "A fact is labelled Confirmed when a primary source directly states it. Estimated means a range, approximation or model-derived value from a source. Simulated means GRAVERSE computed it from published parameters; it is never an observation. Unknown means no source in the record establishes the value.",
      "Normalized status labels are a convenience for filtering. The original source wording is preserved on every artifact record and displayed next to the normalized label.",
    ],
  },
  {
    id: "status",
    heading: "Three independent status questions",
    paragraphs: [
      "Mission status answers whether the mission was planned, ongoing, completed, ended, lost or unknown. Hardware status answers what is known about the physical object: operating, inactive, no longer communicating, impacted, destroyed, still traveling or unknown. Communication status answers whether a link exists.",
      "These questions are kept separate. A completed mission can have hardware that still operates. A spacecraft can lose contact without being confirmed destroyed. A passive retroreflector can remain useful without carrying a transmitter.",
    ],
  },
  {
    id: "uncertainty",
    heading: "Uncertainty and conflict",
    paragraphs: [
      "Where sources disagree, the record preserves the disagreement in its data notes rather than silently choosing one value. Where a location is known only as a region, the record says so and does not plot an invented coordinate.",
      "The collection's coverage is finite. Missing records are a gap, not evidence that the hardware does not exist.",
    ],
  },
  {
    id: "media",
    heading: "Images and models",
    paragraphs: [
      "Images are used only when a NASA image record provides the source, credit and caption. Artist's concepts are labelled as illustrations, not photographs.",
      "No photoreal 3D model of a specific spacecraft is included. The 3D experiences use clearly labelled schematic geometry built from primitives, and the artifact pages say so. A schematic can teach a layout; it is not a reconstruction.",
    ],
  },
  {
    id: "update",
    heading: "Update procedure",
    paragraphs: [
      "A record is updated by checking its registered sources, changing only the fields the sources support, updating the access date and last-verified date, and recording the change in the changelog.",
      "A status change requires a new or updated source. The UI never presents an old verification date as live data.",
    ],
  },
];

export const changelog: ChangelogEntry[] = [
  {
    version: "1.1.0",
    date: "2026-11-11",
    title: "Mission Control, Engineering Lab, Stories, Research Archive and Simulations",
    changes: [
      "Added a Mission Control status board that keeps mission, hardware and communication status separate.",
      "Added the Engineering Lab, Space Stories, Research Archive and Mission Experience Lab.",
      "Added My Universe local favourites, collections and recently viewed records.",
      "Added a schematic artifact anatomy viewer, clearly labelled as a non-reconstruction.",
      "Added the Arabic/English interface shell with RTL layout for translated navigation and section chrome.",
      "Extended the search index to cover engineering topics, stories, simulations and research pages.",
    ],
  },
  {
    version: "1.0.0",
    date: "2026-11-10",
    title: "Initial source-linked collection",
    changes: [
      "30 artifact records, 24 derived missions, 20 solar-system bodies and 8 deep-sky objects.",
      "Academy journeys, lessons, articles, glossary, playground games and local progress.",
      "Explorer timeline, destination view, artifact view and 3D orrery.",
      "Source registry with per-record provenance and validation.",
    ],
  },
];

export const apiEndpoints = [
  {
    method: "GET",
    path: "/api/export",
    description:
      "Download the public dataset as JSON: artifacts, missions, sources, bodies, lessons, stories and engineering topics.",
    notes: "Read-only. No authentication. Generated at build time from the typed data modules.",
  },
  {
    method: "GET",
    path: "/api/export?dataset=artifacts",
    description: "Download only the artifact records.",
    notes: "Useful for checking provenance fields without the full dataset.",
  },
  {
    method: "GET",
    path: "/api/export?dataset=sources",
    description: "Download the source registry.",
    notes: "Includes access dates and source types.",
  },
];

export const coverageNotes: CoverageRow[] = [
  {
    label: "Destinations",
    value: "Moon, Mars, deep space",
    note: "Three destination groups, not a complete planetary catalogue.",
  },
  {
    label: "Hardware classes",
    value: "Rovers, landers, orbiters, probes, instruments, surface equipment, aircraft",
    note: "Descent stages are recorded as separate artifacts where the source treats them separately.",
  },
  {
    label: "Operational states",
    value: "Operating, inactive, no longer communicating, impacted, destroyed, still traveling",
    note: "Unknown is used where the record does not establish a state.",
  },
  {
    label: "Known gaps",
    value: "Many missions and objects are not included",
    note: "The collection is intentionally finite and does not claim completeness.",
  },
];
