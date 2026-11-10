/**
 * Canonical GRAVERSE data model.
 *
 * Facts are normalized from public NASA mission pages and NASA/NSSDCA
 * technical records. Original status wording is preserved alongside the
 * normalized status so the UI never silently rewrites a source.
 */

export type DestinationGroup = "moon" | "mars" | "deep-space";

export type HardwareType =
  | "rover"
  | "lander"
  | "orbiter"
  | "probe"
  | "instrument"
  | "surface-equipment"
  | "aircraft";

export type MissionStatus =
  | "planned"
  | "ongoing"
  | "completed"
  | "ended"
  | "lost-contact"
  | "unknown";

export type HardwareStatus =
  | "operating"
  | "inactive"
  | "no-longer-communicating"
  | "impacted"
  | "destroyed"
  | "still-traveling"
  | "unknown";

export type EventType =
  | "launch"
  | "landing"
  | "orbit-insertion"
  | "flyby"
  | "deployment"
  | "first-operation"
  | "first-flight"
  | "milestone"
  | "last-contact"
  | "end-of-mission"
  | "shutdown"
  | "impact"
  | "other";

export type DatePrecision = "day" | "month" | "year";

export type SourceType =
  | "mission-page"
  | "technical-archive"
  | "news-release"
  | "image-record";

export interface SourceRecord {
  id: string;
  organization: string;
  title: string;
  url: string;
  type: SourceType;
  accessedAt: string;
  notes?: string;
}

export interface MissionEvent {
  id: string;
  type: EventType;
  date: string;
  datePrecision: DatePrecision;
  dateLabel: string;
  label: string;
  description: string;
  sourceIds: string[];
}

export interface Contribution {
  title: string;
  summary: string;
  kind: "science" | "engineering";
}

export interface ArtifactMedia {
  type: "image";
  src: string;
  thumb: string;
  alt: string;
  caption: string;
  credit: string;
  nasaId: string;
  sourceUrl: string;
  isIllustration: boolean;
  width: number;
  height: number;
}

export interface ArtifactLocation {
  body: string;
  locationName: string;
  precision: "exact" | "approximate" | "region" | "unknown";
  note?: string;
}

export interface Artifact {
  id: string;
  name: string;
  alternateNames?: string[];
  missionName: string;
  programName: string;
  destination: string;
  destinationGroup: DestinationGroup;
  hardwareType: HardwareType;
  shortDescription: string;
  overview: string;
  scientificPurpose: string;
  missionStatus: MissionStatus;
  missionStatusOriginal: string;
  hardwareStatus: HardwareStatus;
  hardwareStatusOriginal: string;
  launchDate?: string;
  arrivalDate?: string;
  missionEndDate?: string;
  lastContactDate?: string;
  primaryMilestone: MissionEvent;
  timelineEvents: MissionEvent[];
  scientificContributions: Contribution[];
  fate: string;
  location: ArtifactLocation;
  technicalDetails: Array<{ label: string; value: string }>;
  /** Missing media is represented as absent, never as a fabricated placeholder. */
  media?: ArtifactMedia;
  relatedIds: string[];
  sourceIds: string[];
  lastVerified: string;
  dataNotes: string[];
}
