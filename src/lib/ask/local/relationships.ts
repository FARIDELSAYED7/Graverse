import { getArtifactById, getArtifactsByIds } from "@/data/artifacts";
import { getMission, missions } from "@/data/missions";
import { getBody } from "@/data/space/bodies";
import { deepSkyObjects } from "@/data/space/deep-sky";
import { getAgency } from "@/data/space/agencies";
import { getRelations } from "@/data/relations";
import { formatDate } from "@/lib/format";
import { hardwareStatusLabels, missionStatusLabels } from "@/lib/status";
import type { AskLocale } from "../types";
import type { LocalEntityKind } from "./entities";

/**
 * Layer E — local comparison and relationship answers.
 *
 * These answers are built from the relationship graph GRAVERSE already
 * maintains, and only from fields that **both** records actually have. When a
 * field exists for one record and not the other, it is left out and the gap
 * is stated, rather than being filled in.
 */

export interface LocalRelationshipDraft {
  answer: string;
  sourceIds: string[];
}

interface ComparableField {
  label: string;
  value: string;
}

interface ComparableRecord {
  kind: LocalEntityKind;
  id: string;
  name: string;
  href: string;
  sourceIds: string[];
  fields: ComparableField[];
  /** A sortable date, when the record has one. */
  date?: { label: string; iso: string; display: string };
}

function artifactComparable(id: string): ComparableRecord | null {
  const artifact = getArtifactById(id);
  if (!artifact) return null;
  return {
    kind: "artifact",
    id: artifact.id,
    name: artifact.name,
    href: `/museum/${artifact.id}`,
    sourceIds: artifact.sourceIds,
    fields: [
      { label: "Destination", value: artifact.destination },
      { label: "Type", value: artifact.hardwareType.replace("-", " ") },
      { label: "Mission", value: artifact.missionName },
      {
        label: "Mission status",
        value: missionStatusLabels[artifact.missionStatus],
      },
      {
        label: "Hardware status",
        value: hardwareStatusLabels[artifact.hardwareStatus],
      },
    ],
    date: artifact.launchDate
      ? {
          label: "Launch",
          iso: artifact.launchDate,
          display: formatDate(artifact.launchDate),
        }
      : undefined,
  };
}

function missionComparable(id: string): ComparableRecord | null {
  const mission = getMission(id);
  if (!mission) return null;
  return {
    kind: "mission",
    id: mission.id,
    name: mission.name,
    href: `/museum/missions/${mission.id}`,
    sourceIds: mission.sourceIds,
    fields: [
      { label: "Destination", value: mission.destinationLabel },
      { label: "Program", value: mission.program },
      { label: "Mission status", value: missionStatusLabels[mission.status] },
    ],
    date: {
      label: "Launch",
      iso: mission.launchDate,
      display: formatDate(mission.launchDate),
    },
  };
}

function bodyComparable(id: string): ComparableRecord | null {
  const body = getBody(id);
  if (!body) return null;
  return {
    kind: "body",
    id: body.id,
    name: body.name,
    href: `/explorer/bodies/${body.id}`,
    sourceIds: body.sourceIds,
    fields: [
      { label: "Type", value: body.kind.replace("-", " ") },
      { label: "Distance from the Sun", value: body.distanceLabel },
      { label: "Orbital period", value: body.orbitalPeriod },
      { label: "Day length", value: body.dayLength },
      { label: "Radius", value: body.radius },
      { label: "Moons", value: body.moonCount },
      { label: "Mean temperature", value: body.temperature },
    ],
  };
}

function deepSkyComparable(id: string): ComparableRecord | null {
  const object = deepSkyObjects.find((entry) => entry.id === id);
  if (!object) return null;
  return {
    kind: "deep-sky",
    id: object.id,
    name: object.name,
    href: `/explorer/deep-sky/${object.id}`,
    sourceIds: object.sourceIds,
    fields: [
      { label: "Type", value: object.kindLabel },
      { label: "Distance", value: object.distance },
      { label: "Constellation", value: object.constellation },
      { label: "Catalog", value: object.catalogName },
    ],
  };
}

function agencyComparable(id: string): ComparableRecord | null {
  const agency = getAgency(id);
  if (!agency) return null;
  return {
    kind: "agency",
    id: agency.id,
    name: agency.name,
    href: `/museum/agencies/${agency.id}`,
    sourceIds: agency.sourceIds,
    fields: [
      { label: "Country", value: agency.country },
      { label: "Founded", value: agency.founded },
    ],
  };
}

export function comparableRecord(
  kind: LocalEntityKind,
  id: string
): ComparableRecord | null {
  switch (kind) {
    case "artifact":
      return artifactComparable(id);
    case "mission":
      return missionComparable(id);
    case "body":
      return bodyComparable(id);
    case "deep-sky":
      return deepSkyComparable(id);
    case "agency":
      return agencyComparable(id);
    default:
      return null;
  }
}

/**
 * Compares two records.
 *
 * Only the fields both records have are shown. When the two disagree on a
 * field, that is the interesting part, so it is called out.
 */
export function buildComparisonAnswer(
  first: { kind: LocalEntityKind; id: string },
  second: { kind: LocalEntityKind; id: string },
  locale: AskLocale
): LocalRelationshipDraft | null {
  const a = comparableRecord(first.kind, first.id);
  const b = comparableRecord(second.kind, second.id);
  if (!a || !b) return null;

  const labels = new Set([...a.fields, ...b.fields].map((field) => field.label));
  const rows: string[] = [];
  const differences: string[] = [];

  for (const label of labels) {
    const left = a.fields.find((field) => field.label === label);
    const right = b.fields.find((field) => field.label === label);
    if (!left || !right) continue;
    const same = left.value.toLowerCase() === right.value.toLowerCase();
    rows.push(
      `- **${label}:** ${left.value} — ${right.value}${same ? "" : "  ← different"}`
    );
    if (!same) differences.push(label);
  }

  if (rows.length === 0) return null;

  const parts: string[] = [
    locale === "ar"
      ? `**${a.name}** مقارنةً بـ **${b.name}**`
      : `**${a.name}** compared with **${b.name}**`,
    "",
    ...rows,
  ];

  if (a.date && b.date && a.date.iso !== b.date.iso) {
    const earlier = a.date.iso < b.date.iso ? a : b;
    const later = a.date.iso < b.date.iso ? b : a;
    const earlierDate = earlier.date;
    const laterDate = later.date;
    if (earlierDate && laterDate) {
      parts.push(
        "",
        locale === "ar"
          ? `في ${a.date.label} كانت **${earlier.name}** الأسبق: ${earlierDate.display} مقابل ${laterDate.display} لـ ${later.name}.`
          : `On ${a.date.label.toLowerCase()}, **${earlier.name}** was first: ${earlierDate.display} against ${laterDate.display} for ${later.name}.`
      );
    }
  }

  if (differences.length > 0) {
    parts.push(
      "",
      locale === "ar"
        ? `ويختلفان في ${differences.join("، ")}. أما بقية الحقول التي يشتركان فيها فمذكورة أعلاه.`
        : `They differ on ${differences.join(", ").toLowerCase()}. Everything else the records share is listed above.`
    );
  } else {
    parts.push(
      "",
      locale === "ar"
        ? "السجلان متفقان في كل حقل يشتركان فيه."
        : "The records agree on every field they both hold."
    );
  }

  const sourceIds = [...new Set([...a.sourceIds, ...b.sourceIds])];
  const citations = sourceIds.map((id) => `[${id}]`).join(" ");

  return {
    answer: `${parts.join("\n")} ${citations}\n\n${
      locale === "ar"
        ? `افتح السجلين كاملين: \`${a.href}\` و\`${b.href}\`.`
        : `Open the full records: \`${a.href}\` and \`${b.href}\`.`
    }`,
    sourceIds,
  };
}

/**
 * Lists what a record is connected to.
 *
 * This uses the relation graph GRAVERSE already maintains, so the answer can
 * never drift from the links in the interface.
 */
export function buildRelatedAnswer(
  kind: LocalEntityKind,
  id: string,
  locale: AskLocale
): LocalRelationshipDraft | null {
  const relations = getRelations(`${kind}:${id}`);
  if (relations.length === 0) return null;

  const grouped = new Map<string, string[]>();
  for (const relation of relations) {
    const list = grouped.get(relation.label) ?? [];
    list.push(relation.to.name);
    grouped.set(relation.label, list);
  }

  const sourceIds = [
    ...new Set(
      relations
        .map((relation) => {
          if (relation.to.kind === "artifact") {
            return getArtifactById(relation.to.id)?.sourceIds ?? [];
          }
          if (relation.to.kind === "body") {
            return getBody(relation.to.id)?.sourceIds ?? [];
          }
          if (relation.to.kind === "mission") {
            return getMission(relation.to.id)?.sourceIds ?? [];
          }
          return [];
        })
        .flat()
    ),
  ];

  const title =
    kind === "artifact"
      ? getArtifactById(id)?.name
      : kind === "mission"
        ? getMission(id)?.name
        : kind === "body"
          ? getBody(id)?.name
          : id;

  const lines = [...grouped.entries()].map(
    ([label, names]) => `- **${label}:** ${[...new Set(names)].join(", ")}`
  );

  return {
    answer: `${
      locale === "ar"
        ? `**${title ?? id}** مرتبط بـ ${relations.length} ${
            relations.length === 1 ? "سجل" : "سجلات"
          } في GRAVERSE.`
        : `**${title ?? id}** is connected to ${relations.length} ${
            relations.length === 1 ? "record" : "records"
          } in GRAVERSE.`
    }\n\n${lines.join("\n")}${
      sourceIds.length > 0
        ? ` ${sourceIds.map((sourceId) => `[${sourceId}]`).join(" ")}`
        : ""
    }`,
    sourceIds,
  };
}

/**
 * Answers "which missions explored this destination?" from the destination's
 * own artifact list.
 */
export function buildMissionsAtDestination(
  bodyId: string,
  locale: AskLocale
): LocalRelationshipDraft | null {
  const body = getBody(bodyId);
  if (!body) return null;
  const artifacts = getArtifactsByIds(body.relatedArtifactIds);
  if (artifacts.length === 0) return null;

  const missionNames = [...new Set(artifacts.map((artifact) => artifact.missionName))];
  const sourceIds = [...new Set([...body.sourceIds, ...artifacts.flatMap((a) => a.sourceIds)])];

  return {
    answer: `**${missionNames.length}** ${
      missionNames.length === 1 ? "mission" : "missions"
    } worked at ${body.name}: ${missionNames.join(", ")}.\n\n${body.exploration}\n\nThe GRAVERSE collection holds ${
      artifacts.length
    } ${
      artifacts.length === 1 ? "machine" : "machines"
    } linked to this destination: ${artifacts
      .map((artifact) => artifact.name)
      .join(", ")}. ${sourceIds.map((id) => `[${id}]`).join(" ")}`,
    sourceIds,
  };
}

/**
 * Answers "which missions did this agency operate?" from the mission list.
 */
export function buildAgencyMissions(
  agencyId: string,
  locale: AskLocale
): LocalRelationshipDraft | null {
  const agency = getAgency(agencyId);
  if (!agency) return null;
  const agencyMissions = missions.filter(
    (mission) => mission.agencyId === agency.id
  );
  if (agencyMissions.length === 0) return null;

  const sourceIds = [
    ...new Set([...agency.sourceIds, ...agencyMissions.flatMap((m) => m.sourceIds)]),
  ];

  return {
    answer: `**${agency.name}** (${agency.shortName}) operated ${
      agencyMissions.length
    } ${
      agencyMissions.length === 1 ? "mission" : "missions"
    } in the GRAVERSE collection.\n\n${agencyMissions
      .map(
        (mission) =>
          `- **${mission.name}** — ${mission.destinationLabel}, launched ${formatDate(
            mission.launchDate,
            "year"
          )}`
      )
      .join("\n")} ${sourceIds.map((id) => `[${id}]`).join(" ")}`,
    sourceIds,
  };
}
