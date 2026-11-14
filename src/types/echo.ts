/**
 * ECHOES — Stories Beyond Earth.
 *
 * The content model for the interactive storytelling experience. Every user
 * facing string is bilingual (English + Arabic) so neither language is a
 * translation of the other at render time: both are authored side by side.
 *
 * Facts follow the same rule the rest of GRAVERSE uses: a date, a status or a
 * discovery always points at a source record, and anything a source does not
 * establish is represented as missing rather than invented.
 */

export type EchoLocale = "en" | "ar";

export interface Localized {
  en: string;
  ar: string;
}

export interface LocalizedList {
  en: string[];
  ar: string[];
}

/**
 * How an image or video should be labelled. The distinction matters: a
 * reconstruction is not a NASA photograph and must never be presented as one.
 */
export type MediaKind =
  | "photograph"
  | "visualization"
  | "illustration"
  | "reconstruction"
  | "video"
  | "model";

export interface EchoMedia {
  /** NASA Image and Video Library id, or a local id for in-app diagrams. */
  id: string;
  kind: MediaKind;
  /** Local path served by GRAVERSE. */
  src: string;
  thumb?: string;
  /** Only for videos. */
  poster?: string;
  alt: Localized;
  caption: Localized;
  /** Who made the asset, e.g. "NASA/JPL-Caltech". */
  credit: string;
  /** The NASA centre or contributing organisation. */
  organization: string;
  /** Original NASA page for the asset. */
  sourceUrl: string;
  /** NASA Image and Video Library id, when the asset came from there. */
  nasaId?: string;
  /** Usage status of the asset. */
  usage: Localized;
  accessedAt: string;
  width?: number;
  height?: number;
  /** Transcript lines for videos. */
  transcript?: LocalizedList;
  /** Original NASA caption track URL, when NASA published one. */
  captionsUrl?: string;
}

export interface EchoFact {
  label: Localized;
  value: Localized;
}

export interface EchoGlossaryTerm {
  id: string;
  term: Localized;
  simple: Localized;
  technical?: Localized;
}

export interface EchoQuizOption {
  id: string;
  label: Localized;
}

export interface EchoQuizQuestion {
  id: string;
  prompt: Localized;
  options: EchoQuizOption[];
  correctOptionId: string;
  explanation: Localized;
}

export interface EchoChallenge {
  id: string;
  prompt: Localized;
  /** What the visitor could do, in plain language. */
  options: EchoQuizOption[];
  correctOptionId: string;
  /** The real engineering trade-off the mission faced. */
  reality: Localized;
}

/**
 * A small scientific investigation. Each discovery explains what was wanted,
 * which instrument was used, what happened, what was found and why it
 * mattered — instead of listing achievements.
 */
export interface EchoDiscovery {
  id: string;
  title: Localized;
  question: Localized;
  instrument: Localized;
  method: Localized;
  data: Localized;
  finding: Localized;
  significance: Localized;
  media?: EchoMedia[];
  sourceIds: string[];
}

export interface EchoTimelineEvent {
  id: string;
  date: string;
  dateLabel: Localized;
  label: Localized;
  description: Localized;
  /** "launch" | "landing" | "deployment" | "milestone" | "last-contact" | ... */
  type: string;
  sourceIds: string[];
}

/**
 * In-app SVG diagrams. Every point is authored, so the labels stay accurate
 * and the diagram works in both languages and in both writing directions.
 */
export type DiagramKind =
  | "rover-components"
  | "small-rover-components"
  | "lander-components"
  | "instrument-components"
  | "journey-map";

export interface DiagramPoint {
  id: string;
  x: number;
  y: number;
  label: Localized;
  detail: Localized;
}

export interface EchoDiagram {
  kind: DiagramKind;
  title: Localized;
  intro: Localized;
  points: DiagramPoint[];
  /** Journey diagrams only: the labelled route. */
  route?: { label: Localized; description: Localized }[];
}

export interface EchoChapter {
  id: string;
  /** The narrative role of the chapter, so the engine can adapt the layout. */
  kind:
    | "meet"
    | "mission"
    | "journey"
    | "discoveries"
    | "ending"
    | "legacy";
  eyebrow: Localized;
  title: Localized;
  summary: Localized;
  narrative: LocalizedList;
  /** What ECHO says when this chapter opens. */
  echo: Localized;
  media?: EchoMedia[];
  facts?: EchoFact[];
  diagram?: EchoDiagram;
  discoveries?: EchoDiscovery[];
  timeline?: EchoTimelineEvent[];
  quiz?: EchoQuizQuestion[];
  challenge?: EchoChallenge;
  glossary?: EchoGlossaryTerm[];
  /** Narration script for the optional read-aloud. */
  narration?: LocalizedList;
  sourceIds?: string[];
  /**
   * Optional authored sequence for the visual reader. Older stories can omit
   * this and receive the chapter-kind scene sequence from the renderer.
   */
  scenes?: EchoScene[];
}

/** A composable page in the graphic-novel reader, not an article block. */
export type EchoSceneKind =
  | "cinematic"
  | "comic"
  | "split"
  | "discovery"
  | "evidence"
  | "artifact";

export interface EchoScene {
  id: string;
  kind: EchoSceneKind;
  kicker?: Localized;
  title: Localized;
  narration: Localized;
  /** A scene can explicitly select a local, attributed media record. */
  mediaId?: string;
}

/** A component of a 3D artifact the visitor can select. */
export interface EchoHotspot {
  id: string;
  /** Normalised position on the model, in model space after auto-fit. */
  position: [number, number, number];
  label: Localized;
  detail: Localized;
}

export interface EchoModel {
  /** Local .glb path, or "procedural" for the in-app reconstruction. */
  src?: string;
  procedural?: "sojourner";
  title: Localized;
  /** How the model should be described to the visitor. */
  description: Localized;
  credit: string;
  organization: string;
  sourceUrl: string;
  /** How the visitor should be told this model was made. */
  provenance: Localized;
  hotspots: EchoHotspot[];
}

export type EchoStatusKind =
  | "active"
  | "complete"
  | "silent"
  | "left-behind"
  | "destroyed"
  | "traveling";

export interface EchoStory {
  id: string;
  slug: string;
  /** The equipment name. */
  title: Localized;
  /** The narrative title of the story. */
  storyTitle: Localized;
  dek: Localized;
  summary: Localized;
  location: Localized;
  locationNote?: Localized;
  equipmentType: Localized;
  missionPeriod: Localized;
  missionStatus: Localized;
  hardwareStatus: Localized;
  statusKind: EchoStatusKind;
  accent: string;
  accentSoft: string;
  /** Badge earned by finishing the story. */
  badge: Localized;
  badgeKey: string;
  hero: EchoMedia;
  gallery: EchoMedia[];
  facts: EchoFact[];
  model?: EchoModel;
  chapters: EchoChapter[];
  /** Filters. */
  tags: EchoTag[];
  /** The matching museum record, when there is one. */
  artifactId?: string;
  sourceIds: string[];
  relatedStorySlugs: string[];
  echoIntro: Localized;
  echoSignoff: Localized;
  lastVerified: string;
  /** The closing statement of the story. */
  legacyStatement: Localized;
}

export type EchoTag =
  | "moon"
  | "mars"
  | "deep-space"
  | "lander"
  | "rover"
  | "instrument"
  | "remnant";

export interface EchoStorySummary {
  slug: string;
  title: Localized;
  storyTitle: Localized;
  dek: Localized;
  location: Localized;
  equipmentType: Localized;
  hero: EchoMedia;
  accent: string;
  chapterCount: number;
  discoveryCount: number;
  minutes: number;
  tags: EchoTag[];
  launchYear: number;
}
