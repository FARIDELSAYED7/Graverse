import { allArtifacts } from "@/data/artifacts";
import { bodyMap } from "@/data/space/bodies";
import type {
  Artifact,
  DestinationGroup,
  MissionStatus,
} from "@/types/artifact";
import type { MissionRecord, MissionRecordStatus } from "@/types/space";

/**
 * Mission entities are derived from the verified artifact records rather than
 * hand-copied. Every mission therefore stays in sync with the artifacts that
 * cite it, and no mission date or status is invented here.
 */
const missionSlugs: Record<string, string> = {
  "Ranger 7": "ranger-7",
  "Surveyor 1": "surveyor-1",
  "Surveyor 3": "surveyor-3",
  "Apollo 11": "apollo-11",
  "Apollo 12": "apollo-12",
  "Apollo 14": "apollo-14",
  "Apollo 15": "apollo-15",
  "Apollo 17": "apollo-17",
  "Pioneer 10": "pioneer-10",
  "Pioneer 11": "pioneer-11",
  "Viking 1": "viking-1",
  "Viking 2": "viking-2",
  "Voyager": "voyager",
  "Mars Pathfinder": "mars-pathfinder",
  "Cassini-Huygens": "cassini-huygens",
  "Lunar Prospector": "lunar-prospector",
  "Mars Exploration Rover - Spirit": "mer-spirit",
  "Mars Exploration Rover - Opportunity": "mer-opportunity",
  "New Horizons": "new-horizons",
  Phoenix: "phoenix",
  LCROSS: "lcross",
  "Mars Science Laboratory": "msl-curiosity",
  InSight: "insight",
  "Mars 2020": "mars-2020",
};

const statusPrecedence: MissionStatus[] = [
  "ongoing",
  "lost-contact",
  "completed",
  "ended",
  "planned",
  "unknown",
];

function destinationFor(group: DestinationGroup, artifacts: Artifact[]): {
  bodyId?: string;
  label: string;
} {
  if (group === "moon") return { bodyId: "moon", label: "The Moon" };
  if (group === "mars") return { bodyId: "mars", label: "Mars" };
  const label = artifacts[0]?.destination ?? "Deep space";
  return { label };
}

function missionIdFor(name: string): string {
  return (
    missionSlugs[name] ??
    name
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  );
}

function buildMissions(): MissionRecord[] {
  const groups = new Map<string, Artifact[]>();
  for (const artifact of allArtifacts) {
    const list = groups.get(artifact.missionName) ?? [];
    list.push(artifact);
    groups.set(artifact.missionName, list);
  }

  return [...groups.entries()]
    .map(([name, missionArtifacts]): MissionRecord => {
      const status =
        statusPrecedence.find((candidate) =>
          missionArtifacts.some((artifact) => artifact.missionStatus === candidate)
        ) ?? "unknown";
      const sourceIds = [
        ...new Set(missionArtifacts.flatMap((artifact) => artifact.sourceIds)),
      ];
      const dates = missionArtifacts
        .flatMap((artifact) => [
          artifact.launchDate,
          artifact.missionEndDate,
          artifact.lastContactDate,
        ])
        .filter((value): value is string => Boolean(value))
        .sort();
      const launchDate =
        missionArtifacts
          .map((artifact) => artifact.launchDate)
          .filter((value): value is string => Boolean(value))
          .sort()[0] ?? missionArtifacts[0].primaryMilestone.date;
      const endDate = dates.length > 0 ? dates[dates.length - 1] : undefined;
      const group = missionArtifacts[0].destinationGroup;
      const destination = destinationFor(group, missionArtifacts);
      const programs = [...new Set(missionArtifacts.map((a) => a.programName))];
      const objectives = [
        ...new Set(missionArtifacts.map((a) => a.scientificPurpose)),
      ].slice(0, 4);
      const achievements = missionArtifacts
        .flatMap((artifact) =>
          artifact.scientificContributions.map(
            (contribution) => `${contribution.title} — ${contribution.summary}`
          )
        )
        .slice(0, 5);

      return {
        id: missionIdFor(name),
        name,
        agencyId: "nasa",
        program: programs.join(" · "),
        destinationBodyId:
          destination.bodyId && bodyMap.has(destination.bodyId)
            ? destination.bodyId
            : undefined,
        destinationLabel: destination.label,
        launchDate,
        endDate: endDate && endDate !== launchDate ? endDate : undefined,
        status: status as MissionRecordStatus,
        statusNote:
          "Normalized from the mission status recorded on the mission's GRAVERSE artifact records. The original NASA wording is preserved on each artifact page.",
        summary: missionArtifacts.map((a) => a.shortDescription).join(" "),
        objectives,
        achievements,
        artifactIds: missionArtifacts.map((artifact) => artifact.id),
        sourceIds,
        lastVerified: "2026-11-10",
      };
    })
    .sort((a, b) => a.launchDate.localeCompare(b.launchDate));
}

export const missions = buildMissions();

export const missionMap = new Map(missions.map((mission) => [mission.id, mission]));

export function getMission(id: string) {
  return missionMap.get(id);
}

export function getMissionByName(name: string) {
  return missions.find((mission) => mission.name === name);
}

export function getMissionForArtifact(artifact: Artifact) {
  return missions.find((mission) => mission.artifactIds.includes(artifact.id));
}
