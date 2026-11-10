import type {
  EventType,
  HardwareStatus,
  MissionStatus,
} from "@/types/artifact";

export const missionStatusLabels: Record<MissionStatus, string> = {
  planned: "Planned",
  ongoing: "Ongoing",
  completed: "Completed",
  ended: "Ended",
  "lost-contact": "Lost contact",
  unknown: "Unknown",
};

export const hardwareStatusLabels: Record<HardwareStatus, string> = {
  operating: "Operating",
  inactive: "Inactive",
  "no-longer-communicating": "No longer communicating",
  impacted: "Impacted",
  destroyed: "Destroyed",
  "still-traveling": "Still traveling",
  unknown: "Unknown",
};

export const eventTypeLabels: Record<EventType, string> = {
  launch: "Launch",
  landing: "Landing",
  "orbit-insertion": "Orbit insertion",
  flyby: "Flyby",
  deployment: "Deployment",
  "first-operation": "First operation",
  "first-flight": "First flight",
  milestone: "Milestone",
  "last-contact": "Last contact",
  "end-of-mission": "End of mission",
  shutdown: "Shutdown",
  impact: "Impact",
  other: "Other",
};

export type StatusTone = "positive" | "neutral" | "caution" | "negative" | "muted";

export function missionStatusTone(status: MissionStatus): StatusTone {
  switch (status) {
    case "ongoing":
      return "positive";
    case "completed":
      return "neutral";
    case "ended":
      return "muted";
    case "lost-contact":
      return "caution";
    case "planned":
      return "muted";
    default:
      return "muted";
  }
}

export function hardwareStatusTone(status: HardwareStatus): StatusTone {
  switch (status) {
    case "operating":
      return "positive";
    case "still-traveling":
      return "neutral";
    case "inactive":
      return "muted";
    case "no-longer-communicating":
      return "caution";
    case "impacted":
    case "destroyed":
      return "negative";
    default:
      return "muted";
  }
}

export function statusToneClasses(tone: StatusTone): string {
  switch (tone) {
    case "positive":
      return "border-success/40 bg-success/10 text-[#8CF0C4]";
    case "neutral":
      return "border-accent/40 bg-accent/10 text-[#A9E2FF]";
    case "caution":
      return "border-warning/40 bg-warning/10 text-[#FFD79A]";
    case "negative":
      return "border-danger/40 bg-danger/10 text-[#FFB3B8]";
    default:
      return "border-white/15 bg-white/5 text-text-secondary";
  }
}
