import type {
  ArtifactMedia,
  DestinationGroup,
  HardwareStatus,
  HardwareType,
  MissionStatus,
} from "@/types/artifact";

/**
 * The robot guide is deliberately not an AI. It maps a question to one of a
 * fixed set of intents, then reads a pre-written answer built from the
 * artifact record. Every answer is generated at build time, so the browser
 * never composes a fact.
 */
export type RobotIntent =
  | "hello"
  | "who"
  | "origin"
  | "destination"
  | "job"
  | "milestone"
  | "status"
  | "launch"
  | "arrival"
  | "science"
  | "location"
  | "fate"
  | "size"
  | "speed"
  | "power"
  | "move"
  | "look"
  | "source"
  | "not-ai"
  | "help"
  | "joke"
  | "thanks"
  | "goodbye"
  | "record";

export interface RobotChip {
  label: string;
  intent: RobotIntent;
}

export interface RobotProfile {
  id: string;
  name: string;
  href: string;
  destination: string;
  destinationGroup: DestinationGroup;
  destinationLabel: string;
  accent: string;
  hardwareType: HardwareType;
  hardwareTypeLabel: string;
  missionName: string;
  programName: string;
  year: string;
  launchLabel: string;
  missionStatus: MissionStatus;
  hardwareStatus: HardwareStatus;
  missionStatusLabel: string;
  hardwareStatusLabel: string;
  featured: boolean;
  intro: string;
  chips: RobotChip[];
  answers: Record<RobotIntent, string | null>;
  fallback: string;
  media?: ArtifactMedia;
}
