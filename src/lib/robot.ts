import {
  destinationMeta,
  hardwareTypeSingular,
} from "@/data/artifacts";
import { juniorArtifactIds } from "@/data/kids";
import { formatDate, formatYear } from "@/lib/format";
import {
  hardwareStatusLabels,
  missionStatusLabels,
} from "@/lib/status";
import type {
  Artifact,
  HardwareStatus,
  HardwareType,
  MissionStatus,
} from "@/types/artifact";
import type { RobotChip, RobotIntent, RobotProfile } from "@/types/robot";

const placeLines: Record<Artifact["destinationGroup"], string> = {
  moon: "That is Earth's Moon.",
  mars: "That is the red planet.",
  "deep-space": "That is beyond Earth's neighborhood.",
};

const missionKid: Record<MissionStatus, string> = {
  planned: "That means my mission has not started yet.",
  ongoing: "That means my mission is still going.",
  completed: "That means my mission is complete.",
  ended: "That means my mission has ended.",
  "lost-contact": "That means the team lost contact with me.",
  unknown: "My record does not say more about my mission status.",
};

const hardwareKid: Record<HardwareStatus, string> = {
  operating: "That means my machine is still working.",
  inactive: "That means my machine is not active now.",
  "no-longer-communicating": "That means I am no longer sending signals.",
  impacted: "That means I hit the surface.",
  destroyed: "That means my hardware was destroyed.",
  "still-traveling": "That means I am still traveling through space.",
  unknown: "My record does not say more about my hardware status.",
};

const locationNotes: Record<Artifact["location"]["precision"], string> = {
  exact: "The record marks this location as exact.",
  approximate: "The record marks this location as approximate.",
  region: "The record describes the region rather than an exact spot.",
  unknown: "The record does not give an exact location.",
};

const moveLines: Record<HardwareType, string> = {
  rover: "I move on wheels. My record lists me as a rover.",
  lander: "I land and stay in one place. My record lists me as a lander.",
  orbiter:
    "I travel around a planet or moon in orbit. My record lists me as an orbiter.",
  probe:
    "I fly through space, sometimes past planets. My record lists me as a probe.",
  instrument:
    "I stay in one place and take measurements. My record lists me as an instrument.",
  "surface-equipment":
    "I am equipment set up on a surface. My record lists me as surface equipment.",
  aircraft: "I fly. My record lists me as an aircraft.",
};

function article(word: string): string {
  return /^[aeiou]/i.test(word) ? "an" : "a";
}

function statusAnswer(artifact: Artifact): string {
  return [
    "Here are two different answers.",
    `Mission status: ${missionStatusLabels[artifact.missionStatus]}. ${missionKid[artifact.missionStatus]}`,
    `Hardware status: ${hardwareStatusLabels[artifact.hardwareStatus]}. ${hardwareKid[artifact.hardwareStatus]}`,
    "A mission can be complete while its hardware is still working, or a machine can go silent after a successful mission.",
  ].join(" ");
}

function scienceAnswer(artifact: Artifact): string {
  if (artifact.scientificContributions.length === 0) {
    return "My record does not list science results yet.";
  }
  const titles = artifact.scientificContributions
    .slice(0, 3)
    .map((contribution) => contribution.title)
    .join("; ");
  return `Here is what my record says I helped with: ${titles}. The full record explains each one.`;
}

function locationAnswer(artifact: Artifact): string {
  const place = artifact.location.locationName
    ? `${artifact.location.body} — ${artifact.location.locationName}`
    : artifact.location.body;
  return `My record lists my location as ${place}. ${locationNotes[artifact.location.precision]}`;
}

function techAnswer(
  artifact: Artifact,
  pattern: RegExp,
  label: string
): string {
  const entries = artifact.technicalDetails.filter((detail) =>
    pattern.test(detail.label)
  );
  if (entries.length === 0) {
    return `My record does not list my ${label} yet.`;
  }
  const listed = entries
    .map((entry) => `${entry.label.toLowerCase()}: ${entry.value}`)
    .join("; ");
  return `My record lists ${listed}.`;
}

function moveAnswer(artifact: Artifact): string {
  let answer = moveLines[artifact.hardwareType];
  if (artifact.hardwareType === "rover") {
    const distance = artifact.technicalDetails.find((detail) =>
      /distance/i.test(detail.label)
    );
    if (distance) {
      answer += ` My record also lists ${distance.label.toLowerCase()}: ${distance.value}.`;
    }
  }
  if (artifact.hardwareType === "aircraft") {
    const flights = artifact.technicalDetails.find((detail) =>
      /flights/i.test(detail.label)
    );
    if (flights) {
      answer += ` My record lists ${flights.label.toLowerCase()}: ${flights.value}.`;
    }
  }
  return answer;
}

function lookAnswer(artifact: Artifact): string {
  if (!artifact.media) {
    return "My record does not include a NASA image.";
  }
  const kind = artifact.media.isIllustration
    ? "an artist's concept"
    : "a NASA image";
  return `My record has ${kind}. The description says: “${artifact.media.alt}” Credit: ${artifact.media.credit}.`;
}

function chipSet(artifact: Artifact): RobotChip[] {
  const candidates: RobotChip[] = [
    { label: "Where did you go?", intent: "destination" },
    { label: "What did you do?", intent: "milestone" },
    { label: "Are you still working?", intent: "status" },
    { label: "What did you learn?", intent: "science" },
    { label: "When did you launch?", intent: "launch" },
  ];

  if (artifact.media) {
    candidates.push({ label: "What do you look like?", intent: "look" });
  } else {
    candidates.push({ label: "What happened to you?", intent: "fate" });
  }

  return candidates.slice(0, 6);
}

function buildAnswers(artifact: Artifact): Record<RobotIntent, string | null> {
  const hardwareLabel = hardwareTypeSingular[artifact.hardwareType];

  return {
    hello: `Beep! Hello, explorer. I'm ${artifact.name}. Ask me where I went, what I did, or whether I'm still working.`,
    who: `I'm ${artifact.name}, ${article(
      hardwareLabel.toLowerCase()
    )} ${hardwareLabel.toLowerCase()}. My mission is ${artifact.missionName}, part of the ${artifact.programName}.`,
    origin: `I'm part of the ${artifact.programName}. My mission is ${artifact.missionName}. My full record lists the sources for my hardware.`,
    destination: `My record lists my destination as ${artifact.destination}. ${
      placeLines[artifact.destinationGroup]
    }`,
    job: `${artifact.shortDescription}\n\nMy record describes my job this way: ${artifact.scientificPurpose}`,
    milestone: `${artifact.primaryMilestone.dateLabel}: ${artifact.primaryMilestone.label}. ${artifact.primaryMilestone.description}`,
    status: statusAnswer(artifact),
    launch: artifact.launchDate
      ? `The mission that carried me launched on ${formatDate(artifact.launchDate)}.`
      : "My record does not list a launch date.",
    arrival: artifact.arrivalDate
      ? `My record lists my arrival date as ${formatDate(artifact.arrivalDate)}.`
      : "My record does not list an arrival date.",
    science: scienceAnswer(artifact),
    location: locationAnswer(artifact),
    fate: `My record says: ${artifact.fate}`,
    size: techAnswer(
      artifact,
      /mass|weight|dimensions|size|rotor diameter/i,
      "measurements"
    ),
    speed: techAnswer(artifact, /speed/i, "speed"),
    power: techAnswer(artifact, /power/i, "power"),
    move: moveAnswer(artifact),
    look: lookAnswer(artifact),
    source: `Every answer I give is selected from my artifact record. My record lists ${
      artifact.sourceIds.length
    } source ${
      artifact.sourceIds.length === 1 ? "ID" : "IDs"
    } and was last verified on ${formatDate(
      artifact.lastVerified
    )}. I do not add facts that are not in it.`,
    "not-ai": `I'm the scripted robot guide for ${artifact.name}. I'm not an AI. I match your question to answers written from my artifact record, and I say so when the record does not cover something.`,
    help: "You can ask me: Where did you go? What did you do? Are you still working? What did you learn? When did you launch? What do you look like?",
    joke: `My joke chip is not in the NASA record, so I will not make one up. Here is a real fact instead: ${artifact.shortDescription}`,
    thanks: "You're welcome, explorer. Keep asking questions.",
    goodbye:
      "Bye for now. My record stays here whenever you want to come back.",
    record:
      "My full record has the sources, dates and technical details. Open it below — I cannot add anything that is not in it.",
  };
}

/**
 * Builds the complete, serializable robot guide for one artifact. All wording
 * comes from fields on the record; the only added language explains status
 * wording, hardware types and how the guide works.
 */
export function buildRobotProfile(
  artifact: Artifact,
  kidNote?: string
): RobotProfile {
  const hardwareLabel = hardwareTypeSingular[artifact.hardwareType];
  const note = kidNote ?? artifact.shortDescription;
  const intro = `Beep! I'm ${artifact.name}, ${article(
    hardwareLabel.toLowerCase()
  )} ${hardwareLabel.toLowerCase()} from the ${artifact.programName}. ${note} Ask me a question — I only answer from my NASA-sourced record.`;

  return {
    id: artifact.id,
    name: artifact.name,
    href: `/museum/${artifact.id}`,
    destination: artifact.destination,
    destinationGroup: artifact.destinationGroup,
    destinationLabel: destinationMeta[artifact.destinationGroup].name,
    accent: destinationMeta[artifact.destinationGroup].accent,
    hardwareType: artifact.hardwareType,
    hardwareTypeLabel: hardwareLabel,
    missionName: artifact.missionName,
    programName: artifact.programName,
    year: formatYear(artifact.primaryMilestone.date),
    launchLabel: artifact.launchDate
      ? formatDate(artifact.launchDate)
      : "Not documented",
    missionStatus: artifact.missionStatus,
    hardwareStatus: artifact.hardwareStatus,
    missionStatusLabel: missionStatusLabels[artifact.missionStatus],
    hardwareStatusLabel: hardwareStatusLabels[artifact.hardwareStatus],
    featured: (juniorArtifactIds as readonly string[]).includes(artifact.id),
    intro,
    chips: chipSet(artifact),
    answers: buildAnswers(artifact),
    fallback:
      "My record doesn't cover that one. I can answer questions about where I went, what I did, what I found, when I launched, and whether I'm still working. Try a question chip below.",
    media: artifact.media,
  };
}

export function buildRobotProfiles(
  artifacts: Artifact[],
  notes: Record<string, string> = {}
): RobotProfile[] {
  return artifacts.map((artifact) =>
    buildRobotProfile(artifact, notes[artifact.id])
  );
}
