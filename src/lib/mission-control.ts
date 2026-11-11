import type { Artifact } from "@/types/artifact";
import { allArtifacts } from "@/data/artifacts";

/**
 * Communication status is a third, independent question.
 *
 * GRAVERSE does not add a separate "live" field to every artifact record. The
 * collection already stores the documented hardware status, the original source
 * wording and the last verified date. This module derives a conservative
 * communication label from those fields and always tells the reader that the
 * label is derived rather than a new source claim.
 */
export type CommunicationStatus =
  | "communicating"
  | "lost-contact"
  | "intermittent"
  | "not-applicable"
  | "unknown";

export const communicationStatusLabels: Record<CommunicationStatus, string> = {
  communicating: "Communicating",
  "lost-contact": "Lost contact",
  intermittent: "Intermittent",
  "not-applicable": "Not applicable",
  unknown: "Unknown",
};

/** Passive hardware that never had an independent radio link. */
const PASSIVE_IDS = new Set([
  "apollo-11-lrrr",
  "apollo-15-lrrr",
  "apollo-15-lunar-rover",
]);

const DESCENT_STAGE_IDS = new Set([
  "apollo-11-lm-descent-stage",
  "apollo-14-lm-descent-stage",
  "apollo-17-lm-descent-stage",
]);

export function deriveCommunicationStatus(
  artifact: Artifact
): CommunicationStatus {
  if (PASSIVE_IDS.has(artifact.id) || DESCENT_STAGE_IDS.has(artifact.id)) {
    return "not-applicable";
  }
  switch (artifact.hardwareStatus) {
    case "operating":
      return "communicating";
    case "no-longer-communicating":
      return "lost-contact";
    case "destroyed":
    case "impacted":
      return "not-applicable";
    case "inactive":
      return "lost-contact";
    case "still-traveling":
      return "unknown";
    default:
      return "unknown";
  }
}

export function communicationStatusNote(artifact: Artifact): string {
  const status = deriveCommunicationStatus(artifact);
  if (status === "not-applicable") {
    if (PASSIVE_IDS.has(artifact.id)) {
      return "This is passive hardware. It returns a signal only when an external laser or radio source is aimed at it; it does not carry its own transmitter.";
    }
    return "This hardware was deliberately left behind, destroyed on impact, or had no independent radio link after its mission phase.";
  }
  if (status === "communicating") {
    return "The record lists this hardware as operating. Communication is inferred from that recorded status, not from a live telemetry feed.";
  }
  if (status === "lost-contact") {
    return "The record states that the hardware is inactive or no longer communicating. Loss of contact is not the same as confirmed destruction.";
  }
  return "The collection does not establish a communication state for this hardware.";
}

export type Freshness = "current" | "recent" | "snapshot";

export interface FreshnessInfo {
  key: Freshness;
  label: string;
  description: string;
  days: number;
}

const DAY_MS = 86_400_000;

export function freshnessFor(lastVerified: string, now = new Date()): FreshnessInfo {
  const verified = new Date(`${lastVerified}T00:00:00Z`);
  const days = Math.max(
    0,
    Math.round((now.getTime() - verified.getTime()) / DAY_MS)
  );
  if (days <= 30) {
    return {
      key: "current",
      label: "Checked this cycle",
      description: "The record was verified within the last 30 days.",
      days,
    };
  }
  if (days <= 180) {
    return {
      key: "recent",
      label: "Recently checked",
      description: "The record was verified within the last six months.",
      days,
    };
  }
  return {
    key: "snapshot",
    label: "Historical snapshot",
    description:
      "The record was verified more than six months ago. Treat the status as a snapshot, not live data.",
    days,
  };
}

export interface StatusBoardRow {
  artifact: Artifact;
  communication: CommunicationStatus;
  freshness: FreshnessInfo;
}

export function statusBoard(
  source: Artifact[] = allArtifacts,
  now = new Date()
): StatusBoardRow[] {
  return source.map((artifact) => ({
    artifact,
    communication: deriveCommunicationStatus(artifact),
    freshness: freshnessFor(artifact.lastVerified, now),
  }));
}

export interface MissionControlSummary {
  total: number;
  operating: number;
  inactive: number;
  destroyedOrImpacted: number;
  unknownHardware: number;
  communicating: number;
  lostContact: number;
  notApplicable: number;
  ongoingMissions: number;
  completedMissions: number;
  lastVerified: string;
  destinations: Record<string, number>;
}

export function missionControlSummary(
  source: Artifact[] = allArtifacts
): MissionControlSummary {
  const rows = statusBoard(source);
  const lastVerified = source.reduce(
    (latest, artifact) =>
      artifact.lastVerified > latest ? artifact.lastVerified : latest,
    ""
  );
  const destinations: Record<string, number> = {};
  for (const artifact of source) {
    destinations[artifact.destination] =
      (destinations[artifact.destination] ?? 0) + 1;
  }
  return {
    total: source.length,
    operating: source.filter((a) => a.hardwareStatus === "operating").length,
    inactive: source.filter((a) => a.hardwareStatus === "inactive").length,
    destroyedOrImpacted: source.filter(
      (a) => a.hardwareStatus === "destroyed" || a.hardwareStatus === "impacted"
    ).length,
    unknownHardware: source.filter((a) => a.hardwareStatus === "unknown").length,
    communicating: rows.filter((row) => row.communication === "communicating")
      .length,
    lostContact: rows.filter((row) => row.communication === "lost-contact")
      .length,
    notApplicable: rows.filter((row) => row.communication === "not-applicable")
      .length,
    ongoingMissions: source.filter((a) => a.missionStatus === "ongoing").length,
    completedMissions: source.filter((a) => a.missionStatus === "completed")
      .length,
    lastVerified,
    destinations,
  };
}

export const communicationStatusTone: Record<
  CommunicationStatus,
  "positive" | "caution" | "neutral" | "muted"
> = {
  communicating: "positive",
  "lost-contact": "caution",
  intermittent: "caution",
  "not-applicable": "neutral",
  unknown: "muted",
};
