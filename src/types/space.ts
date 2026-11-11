import type { ClaimType } from "./provenance";

export type BodyKind = "star" | "planet" | "dwarf-planet" | "moon";

export interface BodyFact {
  label: string;
  value: string;
  claim: ClaimType;
  sourceIds?: string[];
}

export interface OrbitData {
  /** Semi-major axis in astronomical units. Used for the schematic orrery. */
  au: number;
  /** Orbital period in Earth years. */
  periodYears: number;
  /** Visual radius on the schematic map. Not a physical scale. */
  visualRadius: number;
  color: string;
  /** Relative size on the schematic map. Not a physical scale. */
  visualSize: number;
}

export interface CelestialBody {
  id: string;
  name: string;
  kind: BodyKind;
  parentId?: string;
  tagline: string;
  summary: string;
  overview: string[];
  facts: BodyFact[];
  distanceLabel: string;
  orbitalPeriod: string;
  dayLength: string;
  radius: string;
  moonCount: string;
  temperature: string;
  discovery: string;
  exploration: string;
  highlights: string[];
  accent: string;
  orbit?: OrbitData;
  relatedArtifactIds: string[];
  sourceIds: string[];
  lastVerified: string;
}

export type DeepSkyKind =
  | "emission-nebula"
  | "supernova-remnant"
  | "planetary-nebula"
  | "spiral-galaxy"
  | "galaxy"
  | "black-hole"
  | "star-forming-region";

export interface DeepSkyObject {
  id: string;
  name: string;
  catalogName: string;
  kind: DeepSkyKind;
  kindLabel: string;
  constellation: string;
  distance: string;
  summary: string;
  overview: string[];
  facts: BodyFact[];
  discovery: string;
  observation: string;
  accent: string;
  gradient: string;
  sourceIds: string[];
  lastVerified: string;
}

export interface Agency {
  id: string;
  name: string;
  shortName: string;
  country: string;
  founded: string;
  summary: string;
  focus: string[];
  notablePrograms: string[];
  website: string;
  accent: string;
  sourceIds: string[];
}

export type MissionRecordStatus =
  | "planned"
  | "ongoing"
  | "completed"
  | "ended"
  | "lost-contact"
  | "unknown";

export interface MissionRecord {
  id: string;
  name: string;
  agencyId: string;
  program: string;
  destinationBodyId?: string;
  destinationLabel: string;
  launchDate: string;
  endDate?: string;
  status: MissionRecordStatus;
  statusNote: string;
  summary: string;
  objectives: string[];
  achievements: string[];
  artifactIds: string[];
  sourceIds: string[];
  lastVerified: string;
}

export interface Article {
  id: string;
  title: string;
  dek: string;
  readingMinutes: number;
  topics: string[];
  sections: Array<{ heading: string; paragraphs: string[] }>;
  relatedArtifactIds: string[];
  relatedBodyIds: string[];
  sourceIds: string[];
  lastVerified: string;
}
