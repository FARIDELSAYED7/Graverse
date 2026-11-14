import { getArtifactById, getArtifactsByIds } from "@/data/artifacts";
import { getMission, missions } from "@/data/missions";
import { getBody, celestialBodies } from "@/data/space/bodies";
import { deepSkyObjects } from "@/data/space/deep-sky";
import { agencies, getAgency } from "@/data/space/agencies";
import { lessons } from "@/data/lessons";
import { engineeringTopics } from "@/data/engineering";
import { simulations } from "@/data/simulations";
import { storyCollections } from "@/data/stories";
import { articles } from "@/data/articles";
import { formatDate } from "@/lib/format";
import { hardwareStatusLabels, missionStatusLabels } from "@/lib/status";
import type { AskLocale } from "../types";
import type { LocalEntityKind } from "./entities";

/**
 * Layer C — dynamic record answers.
 *
 * Every answer here is assembled from fields that actually exist in the
 * GRAVERSE datasets. A builder returns `null` when the record does not
 * establish the requested aspect, and the question then falls through to the
 * provider rather than being answered with a gap.
 *
 * Templates are shared: the same builder serves every record of a kind, so
 * there is one place to keep the wording honest.
 */

export type LocalAspect =
  | "overview"
  | "purpose"
  | "status"
  | "fate"
  | "location"
  | "dates"
  | "science"
  | "technical"
  | "mission"
  | "agency"
  | "related"
  | "facts"
  | "metrics"
  | "exploration"
  | "discovery"
  | "highlights"
  | "objectives"
  | "achievements"
  | "hardware";

export interface LocalAspectDefinition {
  aspect: LocalAspect;
  /** Phrases that point at this aspect. */
  triggers: string[][];
  /** The same phrases in Arabic. */
  triggersAr: string[][];
  /** The record kinds this aspect can be answered for. */
  kinds: LocalEntityKind[];
}

export interface LocalDraft {
  answer: string;
  sourceIds: string[];
}

/* ------------------------------------------------------------- formatting */

function bullet(label: string, value: string): string {
  return `- **${label}:** ${value}`;
}

function cite(ids: string[]): string {
  const unique = [...new Set(ids)];
  if (unique.length === 0) return "";
  return ` ${unique.map((id) => `[${id}]`).join(" ")}`;
}

function recordLink(href: string, label: string): string {
  return `\n\nOpen the full record: \`${href}\` (${label}).`;
}

const NOT_ESTABLISHED = {
  en: "The GRAVERSE records do not establish this.",
  ar: "سجلات GRAVERSE لا تثبت هذه المعلومة.",
};

function notEstablished(locale: AskLocale): string {
  return locale === "ar" ? NOT_ESTABLISHED.ar : NOT_ESTABLISHED.en;
}

/* ------------------------------------------------------- aspect registry */

export const LOCAL_ASPECTS: LocalAspectDefinition[] = [
  {
    aspect: "overview",
    triggers: [
      ["what", "is"],
      ["explain"],
      ["tell", "me", "about"],
      ["describe"],
      ["more", "about"],
      ["who", "is"],
      ["what", "does", "it", "do"],
      ["introduce"],
      ["overview"],
    ],
    triggersAr: [
      ["اشرح"],
      ["ما", "هو"],
      ["ما", "هي"],
      ["حدثني", "عن"],
      ["عرفني", "بـ"],
      ["أخبرني", "عن"],
      ["نبذة"],
    ],
    kinds: [
      "artifact",
      "mission",
      "body",
      "deep-sky",
      "agency",
      "lesson",
      "story",
      "engineering",
      "simulation",
      "article",
    ],
  },
  {
    aspect: "purpose",
    triggers: [
      ["why", "was", "it", "sent"],
      ["what", "was", "it", "for"],
      ["purpose"],
      ["why", "does", "it"],
      ["why", "was", "it", "built"],
      ["mission", "objective"],
    ],
    triggersAr: [
      ["لماذا", "أرسلت"],
      ["لماذا", "أُرسلت"],
      ["الغرض"],
      ["ماذا", "كان", "الهدف"],
      ["لماذا", "بُني"],
    ],
    kinds: ["artifact", "mission", "engineering"],
  },
  {
    aspect: "status",
    triggers: [
      ["status"],
      ["mission", "status"],
      ["hardware", "status"],
      ["status", "of"],
      ["what", "status"],
      ["current", "status"],
      ["still", "working"],
      ["still", "operating"],
      ["is", "it", "alive"],
      ["is", "it", "still", "there"],
      ["difference", "between", "mission", "status"],
    ],
    triggersAr: [
      ["حالة"],
      ["الحالة"],
      ["ما", "حالتها"],
      ["لا", "يزال", "يعمل"],
      ["الفرق", "بين", "حالة"],
    ],
    kinds: ["artifact", "mission"],
  },
  {
    aspect: "fate",
    triggers: [
      ["what", "happened", "to"],
      ["what", "happened", "to", "the", "hardware"],
      ["what", "became"],
      ["became", "of"],
      ["fate"],
      ["where", "is", "it", "now"],
      ["is", "it", "still", "there"],
      ["still", "on"],
      ["abandoned"],
      ["left", "behind"],
      ["end", "of", "the", "mission"],
    ],
    triggersAr: [
      ["ماذا", "حدث"],
      ["ما", "مستقبلها"],
      ["أين", "الآن"],
      ["هل", "لا", "يزال", "موجود"],
      ["متروك"],
      ["مهجور"],
    ],
    kinds: ["artifact"],
  },
  {
    aspect: "location",
    triggers: [
      ["where", "is"],
      ["where", "are"],
      ["location"],
      ["located"],
      ["where", "located"],
      ["position"],
      ["where", "did", "it", "land"],
      ["where", "did", "it", "touch", "down"],
      ["where", "did", "it", "arrive"],
    ],
    triggersAr: [
      ["أين", "يقع"],
      ["أين", "تقع"],
      ["الموقع"],
      ["أين", "هبطت"],
    ],
    kinds: ["artifact", "body", "deep-sky"],
  },
  {
    aspect: "dates",
    triggers: [
      ["when", "was"],
      ["when", "did"],
      ["when", "launched"],
      ["launch", "date"],
      ["launched"],
      ["launch"],
      ["date"],
      ["dates"],
      ["timeline"],
      ["what", "year"],
    ],
    triggersAr: [
      ["متى", "أُطلق"],
      ["متى", "انطلق"],
      ["تاريخ", "الإطلاق"],
      ["متى"],
    ],
    kinds: ["artifact", "mission", "body"],
  },
  {
    aspect: "science",
    triggers: [
      ["discover"],
      ["discovered"],
      ["discovery"],
      ["discoveries"],
      ["what", "did", "it", "find"],
      ["what", "did", "it", "learn"],
      ["science"],
      ["scientific", "contribution"],
      ["find"],
      ["found"],
      ["what", "it", "found"],
    ],
    triggersAr: [
      ["اكتشف"],
      ["اكتشافات"],
      ["ماذا", "اكتشف"],
      ["علم"],
      ["نتائج"],
    ],
    kinds: ["artifact", "mission", "body"],
  },
  {
    aspect: "technical",
    triggers: [
      ["technical"],
      ["specification"],
      ["specifications"],
      ["specs"],
      ["how", "does", "it", "work"],
      ["how", "is", "it", "built"],
      ["weight"],
      ["mass"],
      ["power"],
    ],
    triggersAr: [
      ["مواصفات"],
      ["كيف", "يعمل"],
      ["كيف", "تُصنّع"],
      ["الوزن"],
      ["الكتلة"],
      ["الطاقة"],
    ],
    kinds: ["artifact", "engineering", "simulation"],
  },
  {
    aspect: "mission",
    triggers: [
      ["which", "mission"],
      ["what", "mission"],
      ["mission"],
      ["program"],
      ["launched", "by"],
    ],
    triggersAr: [
      ["أي", "مهمة"],
      ["ما", "المهمة"],
      ["المهمة"],
      ["البرنامج"],
    ],
    kinds: ["artifact", "body", "agency"],
  },
  {
    aspect: "agency",
    triggers: [
      ["which", "agency"],
      ["what", "agency"],
      ["who", "operates"],
      ["who", "built"],
      ["who", "ran"],
      ["operator"],
      ["operator"],
    ],
    triggersAr: [
      ["أي", "وكالة"],
      ["من", "يشغّل"],
      ["من", "بنى"],
      ["الوكالة"],
    ],
    kinds: ["artifact", "mission", "agency"],
  },
  {
    aspect: "related",
    triggers: [
      ["related"],
      ["what", "else"],
      ["connected"],
      ["connection"],
      ["associated"],
      ["similar"],
    ],
    triggersAr: [
      ["ذو", "علاقة"],
      ["مرتبطة"],
      ["ما", "أخرى"],
      ["المتعلقة"],
    ],
    kinds: ["artifact", "mission", "body", "lesson"],
  },
  {
    aspect: "facts",
    triggers: [
      ["facts"],
      ["measurements"],
      ["statistics"],
      ["numbers"],
      ["how", "big"],
      ["how", "far"],
      ["how", "long"],
    ],
    triggersAr: [
      ["حقائق"],
      ["قياسات"],
      ["أرقام"],
      ["كم", "حجم"],
      ["كم", "بعيد"],
    ],
    kinds: ["body", "deep-sky"],
  },
  {
    aspect: "metrics",
    triggers: [
      ["radius"],
      ["diameter"],
      ["temperature"],
      ["orbital", "period"],
      ["day", "length"],
      ["how", "many", "moons"],
    ],
    triggersAr: [
      ["نصف", "القطر"],
      ["الحرارة"],
      ["الدورة", "المدارية"],
      ["طول", "اليوم"],
      ["كم", "قمر"],
    ],
    kinds: ["body"],
  },
  {
    aspect: "exploration",
    triggers: [
      ["exploration"],
      ["explored"],
      ["who", "visited"],
      ["missions", "to"],
      ["landed", "on"],
    ],
    triggersAr: [
      ["الاستكشاف"],
      ["استكشف"],
      ["من", "زار"],
      ["مهام", "إلى"],
    ],
    kinds: ["body", "deep-sky"],
  },
  {
    aspect: "discovery",
    triggers: [
      ["discovery", "history"],
      ["who", "discovered"],
      ["when", "was", "it", "discovered"],
      ["discovered", "by"],
    ],
    triggersAr: [
      ["تاريخ", "الاكتشاف"],
      ["من", "اكتشفه"],
      ["متى", "اكتُشف"],
    ],
    kinds: ["body", "deep-sky"],
  },
  {
    aspect: "highlights",
    triggers: [
      ["highlights"],
      ["interesting"],
      ["famous"],
      ["notable"],
      ["best", "features"],
    ],
    triggersAr: [
      ["أبرز"],
      ["مثير", "للاهتمام"],
      ["أشهر"],
      ["مميز"],
    ],
    kinds: ["body", "deep-sky"],
  },
  {
    aspect: "objectives",
    triggers: [
      ["objectives"],
      ["goals"],
      ["teaches"],
      ["what", "will", "i", "learn"],
      ["learning", "objectives"],
    ],
    triggersAr: [
      ["الأهداف"],
      ["ماذا", "أتعلم"],
      ["سأتعلم"],
    ],
    kinds: ["lesson", "story", "engineering", "simulation"],
  },
  {
    aspect: "achievements",
    triggers: [
      ["achievements"],
      ["what", "did", "the", "mission", "achieve"],
      ["accomplish"],
      ["success"],
    ],
    triggersAr: [
      ["الإنجازات"],
      ["ماذا", "أنجزت"],
      ["ما", "نجز"],
    ],
    kinds: ["mission"],
  },
  {
    aspect: "hardware",
    triggers: [
      ["hardware", "on"],
      ["machines", "on"],
      ["which", "machines"],
      ["what", "machines"],
      ["equipment", "on"],
      ["still", "there"],
    ],
    triggersAr: [
      ["العتاد", "على"],
      ["الآلات", "على"],
      ["أي", "آلات"],
      ["المعدات", "على"],
    ],
    kinds: ["mission", "body"],
  },
];


/**
 * The opening line of a record answer.
 *
 * GRAVERSE's editorial field values are English, so the body of a local
 * answer quotes them as they are. The frame around them — the first line —
 * is written in the visitor's language, so the answer still opens in
 * Arabic when the visitor asked in Arabic.
 */
function lead(name: string, locale: AskLocale, aspect: LocalAspect): string {
  if (locale !== "ar") return "";
  const arabic: Partial<Record<LocalAspect, string>> = {
    overview: `**${name}** — ما يثبته سجل GRAVERSE.`,
    purpose: `**${name}** — لماذا أُرسل إلى الفضاء.`,
    status: `**${name}** — سؤالان مختلفان، وإجابتان مختلفتان.`,
    fate: `**${name}** — ما حدث للعتاد.`,
    location: `**${name}** — الموقع المسجّل.`,
    dates: `**${name}** — التواريخ المسجّلة.`,
    science: `**${name}** — النتائج التي سجّلها GRAVERSE.`,
    technical: `**${name}** — المواصفات المسجّلة.`,
    mission: `**${name}** — المهمة التي كان جزءاً منها.`,
    agency: `**${name}** — الوكالة التي شغّلته.`,
    related: `**${name}** — ما هو مرتبط به.`,
    facts: `**${name}** — الحقائق المسجّلة.`,
    metrics: `**${name}** — القيم المرجعية المقيسة.`,
    exploration: `**${name}** — الاستكشاف.`,
    discovery: `**${name}** — تاريخ الاكتشاف.`,
    highlights: `**${name}** — ما يميّزه.`,
    objectives: `**${name}** — ما يعلّمه.`,
    achievements: `**${name}** — الإنجازات المسجّلة.`,
    hardware: `**${name}** — العتاد المرتبط به.`,
  };
  return arabic[aspect] ?? "";
}

/* ---------------------------------------------------------- kind builders */

function artifactDraft(
  id: string,
  aspect: LocalAspect,
  locale: AskLocale
): LocalDraft | null {
  const artifact = getArtifactById(id);
  if (!artifact) return null;

  const sourceIds = artifact.sourceIds;
  const mission = missions.find((entry) => entry.name === artifact.missionName);

  switch (aspect) {
    case "overview": {
      const lines = [
        locale === "ar"
          ? `**${artifact.name}** — عربة من نوع ${hardwareTypeSingular(
              artifact.hardwareType
            )} وصلت إلى ${artifact.destination}، وحالة عتادها **${hardwareStatusLabels[
              artifact.hardwareStatus
            ].toLowerCase()}**.`
          : `**${artifact.name}** is a ${hardwareTypeSingular(
              artifact.hardwareType
            )} that went to ${artifact.destination}. Its hardware status is **${hardwareStatusLabels[
              artifact.hardwareStatus
            ].toLowerCase()}**.`,
        "",
        artifact.overview,
        "",
        bullet("Type", hardwareTypeSingular(artifact.hardwareType)),
        bullet("Mission", artifact.missionName),
        bullet("Program", artifact.programName),
        bullet(
          "Mission status",
          `${missionStatusLabels[artifact.missionStatus]} — ${artifact.missionStatusOriginal}`
        ),
        bullet(
          "Hardware status",
          `${hardwareStatusLabels[artifact.hardwareStatus]} — ${artifact.hardwareStatusOriginal}`
        ),
      ];
      return {
        answer: `${lines.join("\n")}${cite(sourceIds)}${recordLink(
          `/museum/${artifact.id}`,
          artifact.name
        )}`,
        sourceIds,
      };
    }
    case "purpose": {
      return {
        answer: `**${artifact.name}** was sent to ${artifact.destination} for one reason: ${lowerFirst(
          artifact.scientificPurpose
        )}\n\n${artifact.shortDescription}${cite(sourceIds)}${recordLink(
          `/museum/${artifact.id}`,
          artifact.name
        )}`,
        sourceIds,
      };
    }
    case "status": {
      return {
        answer: `**${artifact.name}** — two different questions, two different answers.\n\n**Mission status: ${missionStatusLabels[
          artifact.missionStatus
        ]}.** ${artifact.missionStatusOriginal}\n\n**Hardware status: ${hardwareStatusLabels[
          artifact.hardwareStatus
        ]}.** ${artifact.hardwareStatusOriginal}\n\n${
          artifact.hardwareStatusOriginal.toLowerCase().includes("telemetry")
            ? ""
            : "The hardware status is a recorded snapshot from the source, last verified " +
              artifact.lastVerified +
              ", not a live reading."
        }${cite(sourceIds)}${recordLink(`/museum/${artifact.id}`, artifact.name)}`,
        sourceIds,
      };
    }
    case "fate": {
      const location =
        artifact.location.precision === "unknown"
          ? ""
          : `\n\nThe record places it at ${artifact.location.locationName}, ${artifact.location.body} (${artifact.location.precision}).`;
      return {
        answer: `**${artifact.name}** — what happened to the hardware.\n\n${artifact.fate}${location}${cite(
          sourceIds
        )}${recordLink(`/museum/${artifact.id}`, artifact.name)}`,
        sourceIds,
      };
    }
    case "location": {
      const note = artifact.location.note ? `\n\n${artifact.location.note}` : "";
      return {
        answer: `**${artifact.name}** is recorded at ${artifact.location.locationName}, ${artifact.location.body}.\n\nThe location precision in the GRAVERSE record is "${artifact.location.precision}".${note}${cite(
          sourceIds
        )}${recordLink(`/museum/${artifact.id}`, artifact.name)}`,
        sourceIds,
      };
    }
    case "dates": {
      const rows = [
        artifact.launchDate
          ? bullet("Launch", `${formatDate(artifact.launchDate)} (${artifact.launchDate})`)
          : "",
        artifact.arrivalDate
          ? bullet(
              "Arrival / deployment",
              `${formatDate(artifact.arrivalDate)} (${artifact.arrivalDate})`
            )
          : "",
        artifact.missionEndDate
          ? bullet(
              "Mission end",
              `${formatDate(artifact.missionEndDate)} (${artifact.missionEndDate})`
            )
          : "",
        artifact.lastContactDate
          ? bullet(
              "Last contact",
              `${formatDate(artifact.lastContactDate)} (${artifact.lastContactDate})`
            )
          : "",
        bullet(
          "Defining milestone",
          `${artifact.primaryMilestone.dateLabel} — ${artifact.primaryMilestone.label}`
        ),
      ].filter(Boolean);
      return {
        answer: `**${artifact.name}** — the recorded dates.\n\n${rows.join(
          "\n"
        )}\n\n${artifact.timelineEvents
          .map(
            (event) => `- ${event.dateLabel} — ${event.label}: ${event.description}`
          )
          .join("\n")}${cite(sourceIds)}${recordLink(
          `/museum/${artifact.id}`,
          artifact.name
        )}`,
        sourceIds,
      };
    }
    case "science": {
      if (artifact.scientificContributions.length === 0) return null;
      return {
        answer: `**${artifact.name}** — what GRAVERSE records as its results.\n\n${artifact.scientificContributions
          .map(
            (contribution) =>
              `- **${contribution.title}** (${contribution.kind}): ${contribution.summary}`
          )
          .join("\n")}${cite(sourceIds)}${recordLink(
          `/museum/${artifact.id}`,
          artifact.name
        )}`,
        sourceIds,
      };
    }
    case "technical": {
      if (artifact.technicalDetails.length === 0) return null;
      return {
        answer: `**${artifact.name}** — the recorded specifications.\n\n${artifact.technicalDetails
          .map((detail) => bullet(detail.label, detail.value))
          .join("\n")}${cite(sourceIds)}${recordLink(
          `/museum/${artifact.id}`,
          artifact.name
        )}`,
        sourceIds,
      };
    }
    case "mission": {
      if (!mission) {
        return {
          answer: `**${artifact.name}** belongs to the ${artifact.programName} and flew as part of the ${artifact.missionName} mission.${cite(
            sourceIds
          )}`,
          sourceIds,
        };
      }
      const agency = getAgency(mission.agencyId);
      return {
        answer: `**${artifact.name}** flew on the **${mission.name}** mission, operated by ${agency?.name ?? "a space agency"}.\n\n${mission.summary}\n\n${bullet(
          "Program",
          mission.program
        )}\n${bullet("Destination", mission.destinationLabel)}\n${bullet(
          "Launch",
          `${formatDate(mission.launchDate)} (${mission.launchDate})`
        )}${cite(sourceIds)}${recordLink(
          `/museum/missions/${mission.id}`,
          mission.name
        )}`,
        sourceIds,
      };
    }
    case "agency": {
      if (!mission) return null;
      const agency = getAgency(mission.agencyId);
      if (!agency) return null;
      return {
        answer: `**${artifact.name}** was operated by **${agency.name}** (${agency.shortName}), ${agency.country}, founded ${agency.founded}.\n\n${agency.summary}\n\n${bullet(
          "Focus",
          agency.focus.join("; ")
        )}${cite(sourceIds)}${recordLink(
          `/museum/agencies/${agency.id}`,
          agency.name
        )}`,
        sourceIds: [...new Set([...sourceIds, ...agency.sourceIds])],
      };
    }
    case "related": {
      const related = getArtifactsByIds(artifact.relatedIds);
      if (related.length === 0) return null;
      return {
        answer: `**${artifact.name}** is linked in GRAVERSE to ${related.length} other ${
          related.length === 1 ? "record" : "records"
        }:\n\n${related
          .map(
            (entry) =>
              `- **${entry.name}** — ${entry.missionName}, ${entry.destination} (hardware: ${hardwareStatusLabels[
                entry.hardwareStatus
              ].toLowerCase()})`
          )
          .join("\n")}${cite(sourceIds)}${recordLink(
          `/museum/${artifact.id}`,
          artifact.name
        )}`,
        sourceIds,
      };
    }
    default:
      return null;
  }
}

function missionDraft(
  id: string,
  aspect: LocalAspect,
  locale: AskLocale
): LocalDraft | null {
  const mission = getMission(id);
  if (!mission) return null;
  const agency = getAgency(mission.agencyId);
  const sourceIds = mission.sourceIds;

  switch (aspect) {
    case "overview": {
      return {
        answer: `**${mission.name}** was a ${mission.program} mission to ${mission.destinationLabel}, operated by ${agency?.name ?? "a space agency"}.\n\n${mission.summary}\n\n${bullet(
          "Launch",
          `${formatDate(mission.launchDate)} (${mission.launchDate})`
        )}\n${bullet(
          "Mission status",
          `${missionStatusLabels[mission.status]} — ${mission.statusNote}`
        )}${cite(sourceIds)}${recordLink(
          `/museum/missions/${mission.id}`,
          mission.name
        )}`,
        sourceIds,
      };
    }
    case "purpose": {
      if (mission.objectives.length === 0) return null;
      return {
        answer: `**${mission.name}** set out to:\n\n${mission.objectives
          .map((objective) => `- ${objective}`)
          .join("\n")}${cite(sourceIds)}${recordLink(
          `/museum/missions/${mission.id}`,
          mission.name
        )}`,
        sourceIds,
      };
    }
    case "status": {
      return {
        answer: `**${mission.name}** — mission status: ${missionStatusLabels[
          mission.status
        ]}.\n\n${mission.statusNote}\n\nThe hardware in this mission keeps its own status, separate from the mission's.${cite(
          sourceIds
        )}${recordLink(`/museum/missions/${mission.id}`, mission.name)}`,
        sourceIds,
      };
    }
    case "dates": {
      return {
        answer: `**${mission.name}** — the recorded dates.\n\n${bullet(
          "Launch",
          `${formatDate(mission.launchDate)} (${mission.launchDate})`
        )}\n${mission.endDate ? bullet("End", `${formatDate(mission.endDate)} (${mission.endDate})`) : ""}\n${bullet(
          "Status",
          missionStatusLabels[mission.status]
        )}${cite(sourceIds)}${recordLink(
          `/museum/missions/${mission.id}`,
          mission.name
        )}`,
        sourceIds,
      };
    }
    case "objectives": {
      if (mission.objectives.length === 0) return null;
      return {
        answer: `**${mission.name}** — the recorded objectives.\n\n${mission.objectives
          .map((objective) => `- ${objective}`)
          .join("\n")}${cite(sourceIds)}${recordLink(
          `/museum/missions/${mission.id}`,
          mission.name
        )}`,
        sourceIds,
      };
    }
    case "achievements": {
      if (mission.achievements.length === 0) return null;
      return {
        answer: `**${mission.name}** — the recorded achievements.\n\n${mission.achievements
          .map((achievement) => `- ${achievement}`)
          .join("\n")}${cite(sourceIds)}${recordLink(
          `/museum/missions/${mission.id}`,
          mission.name
        )}`,
        sourceIds,
      };
    }
    case "hardware": {
      const artifacts = getArtifactsByIds(mission.artifactIds);
      if (artifacts.length === 0) return null;
      return {
        answer: `**${mission.name}** carried ${artifacts.length} ${
          artifacts.length === 1 ? "machine" : "machines"
        }.\n\n${artifacts
          .map(
            (artifact) =>
              `- **${artifact.name}** — ${artifact.destination}. Hardware status: ${hardwareStatusLabels[
                artifact.hardwareStatus
              ].toLowerCase()}.`
          )
          .join("\n")}${cite(sourceIds)}${recordLink(
          `/museum/missions/${mission.id}`,
          mission.name
        )}`,
        sourceIds,
      };
    }
    case "agency": {
      if (!agency) return null;
      return {
        answer: `**${mission.name}** was operated by **${agency.name}** (${agency.shortName}), ${agency.country}.\n\n${agency.summary}\n\n${bullet(
          "Focus",
          agency.focus.join("; ")
        )}\n${bullet("Notable programs", agency.notablePrograms.join("; "))}${cite(
          sourceIds
        )}${recordLink(`/museum/agencies/${agency.id}`, agency.name)}`,
        sourceIds: [...new Set([...sourceIds, ...agency.sourceIds])],
      };
    }
    default:
      return null;
  }
}

function bodyDraft(
  id: string,
  aspect: LocalAspect,
  locale: AskLocale
): LocalDraft | null {
  const body = getBody(id);
  if (!body) return null;
  const sourceIds = body.sourceIds;

  switch (aspect) {
    case "overview": {
      return {
        answer: `**${body.name}** is a ${body.kind.replace("-", " ")} in the Solar System — ${lowerFirst(
          body.tagline
        )}.\n\n${body.summary}\n\n${body.overview
          .map((paragraph) => paragraph)
          .join("\n\n")}${cite(sourceIds)}${recordLink(
          `/explorer/bodies/${body.id}`,
          body.name
        )}`,
        sourceIds,
      };
    }
    case "facts": {
      if (body.facts.length === 0) return null;
      return {
        answer: `**${body.name}** — the recorded facts, with their claim labels.\n\n${body.facts
          .map((fact) => bullet(`${fact.label} [${fact.claim}]`, fact.value))
          .join("\n")}${cite(sourceIds)}${recordLink(
          `/explorer/bodies/${body.id}`,
          body.name
        )}`,
        sourceIds,
      };
    }
    case "metrics": {
      return {
        answer: `**${body.name}** — the measured reference values.\n\n${bullet(
          "Distance from the Sun",
          body.distanceLabel
        )}\n${bullet("Orbital period", body.orbitalPeriod)}\n${bullet(
          "Day length",
          body.dayLength
        )}\n${bullet("Radius", body.radius)}\n${bullet("Moons", body.moonCount)}\n${bullet(
          "Mean temperature",
          body.temperature
        )}${cite(sourceIds)}${recordLink(
          `/explorer/bodies/${body.id}`,
          body.name
        )}`,
        sourceIds,
      };
    }
    case "exploration": {
      const artifacts = getArtifactsByIds(body.relatedArtifactIds);
      return {
        answer: `**${body.name}** — exploration.\n\n${body.exploration}\n\n${
          artifacts.length > 0
            ? `The GRAVERSE records hold ${artifacts.length} ${
                artifacts.length === 1 ? "machine" : "machines"
              } connected to this destination: ${artifacts
                .map((artifact) => artifact.name)
                .join(", ")}.`
            : ""
        }${cite(sourceIds)}${recordLink(
          `/explorer/bodies/${body.id}`,
          body.name
        )}`,
        sourceIds,
      };
    }
    case "discovery": {
      return {
        answer: `**${body.name}** — discovery history.\n\n${body.discovery}${cite(
          sourceIds
        )}${recordLink(`/explorer/bodies/${body.id}`, body.name)}`,
        sourceIds,
      };
    }
    case "highlights": {
      if (body.highlights.length === 0) return null;
      return {
        answer: `**${body.name}** — what stands out.\n\n${body.highlights
          .map((highlight) => `- ${highlight}`)
          .join("\n")}${cite(sourceIds)}${recordLink(
          `/explorer/bodies/${body.id}`,
          body.name
        )}`,
        sourceIds,
      };
    }
    case "location": {
      return {
        answer: `**${body.name}** — ${body.distanceLabel}.\n\nIt orbits the Sun in ${body.orbitalPeriod}, with a day length of ${body.dayLength} and a radius of ${body.radius}.${cite(
          sourceIds
        )}${recordLink(`/explorer/bodies/${body.id}`, body.name)}`,
        sourceIds,
      };
    }
    case "dates": {
      return {
        answer: `**${body.name}** — ${body.discovery}\n\n${bullet(
          "Distance from the Sun",
          body.distanceLabel
        )}\n${bullet("Orbital period", body.orbitalPeriod)}${cite(
          sourceIds
        )}${recordLink(`/explorer/bodies/${body.id}`, body.name)}`,
        sourceIds,
      };
    }
    case "mission": {
      const artifacts = getArtifactsByIds(body.relatedArtifactIds);
      if (artifacts.length === 0) return null;
      const missionsTouching = [
        ...new Set(artifacts.map((artifact) => artifact.missionName)),
      ];
      return {
        answer: `**${body.name}** — the missions that worked there.\n\n${missionsTouching
          .map((name) => `- ${name}`)
          .join("\n")}${cite(sourceIds)}${recordLink(
          `/explorer/bodies/${body.id}`,
          body.name
        )}`,
        sourceIds,
      };
    }
    case "hardware": {
      const artifacts = getArtifactsByIds(body.relatedArtifactIds);
      if (artifacts.length === 0) return null;
      return {
        answer: `**${body.name}** — the ${artifacts.length} ${
          artifacts.length === 1 ? "machine" : "machines"
        } GRAVERSE holds for this destination.\n\n${artifacts
          .map(
            (artifact) =>
              `- **${artifact.name}** — ${artifact.missionName}. Hardware status: ${hardwareStatusLabels[
                artifact.hardwareStatus
              ].toLowerCase()}.`
          )
          .join("\n")}${cite(sourceIds)}${recordLink(
          `/explorer/bodies/${body.id}`,
          body.name
        )}`,
        sourceIds,
      };
    }
    default:
      return null;
  }
}

function deepSkyDraft(
  id: string,
  aspect: LocalAspect,
  locale: AskLocale
): LocalDraft | null {
  const object = deepSkyObjects.find((entry) => entry.id === id);
  if (!object) return null;
  const sourceIds = object.sourceIds;

  switch (aspect) {
    case "overview":
      return {
        answer: `**${object.name}** (${object.catalogName}) is a ${lowerFirst(
          object.kindLabel
        )} in ${object.constellation} — ${object.distance}.\n\n${object.summary}\n\n${object.overview.join(
          "\n\n"
        )}${cite(sourceIds)}${recordLink(
          `/explorer/deep-sky/${object.id}`,
          object.name
        )}`,
        sourceIds,
      };
    case "facts":
      return {
        answer: `**${object.name}** — the recorded facts, with their claim labels.\n\n${object.facts
          .map((fact) => bullet(`${fact.label} [${fact.claim}]`, fact.value))
          .join("\n")}${cite(sourceIds)}${recordLink(
          `/explorer/deep-sky/${object.id}`,
          object.name
        )}`,
        sourceIds,
      };
    case "location":
      return {
        answer: `**${object.name}** is ${object.distance} away, in ${object.constellation}.\n\n${object.summary}${cite(
          sourceIds
        )}${recordLink(`/explorer/deep-sky/${object.id}`, object.name)}`,
        sourceIds,
      };
    case "discovery":
      return {
        answer: `**${object.name}** — discovery history.\n\n${object.discovery}${cite(
          sourceIds
        )}${recordLink(`/explorer/deep-sky/${object.id}`, object.name)}`,
        sourceIds,
      };
    case "exploration":
      return {
        answer: `**${object.name}** — how it is observed.\n\n${object.observation}${cite(
          sourceIds
        )}${recordLink(`/explorer/deep-sky/${object.id}`, object.name)}`,
        sourceIds,
      };
    case "highlights":
      return {
        answer: `**${object.name}** — what stands out.\n\n${object.summary}\n\n${bullet(
          "Type",
          object.kindLabel
        )}\n${bullet("Distance", object.distance)}\n${bullet(
          "Constellation",
          object.constellation
        )}${cite(sourceIds)}${recordLink(
          `/explorer/deep-sky/${object.id}`,
          object.name
        )}`,
        sourceIds,
      };
    case "dates":
      return {
        answer: `**${object.name}** — ${object.discovery}${cite(
          sourceIds
        )}${recordLink(`/explorer/deep-sky/${object.id}`, object.name)}`,
        sourceIds,
      };
    default:
      return null;
  }
}

function agencyDraft(
  id: string,
  aspect: LocalAspect,
  locale: AskLocale
): LocalDraft | null {
  const agency = getAgency(id);
  if (!agency) return null;
  const sourceIds = agency.sourceIds;
  const agencyMissions = missions.filter(
    (mission) => mission.agencyId === agency.id
  );

  switch (aspect) {
    case "overview":
      return {
        answer: `**${agency.name}** (${agency.shortName}) is the space agency of ${agency.country}, founded ${agency.founded}.\n\n${agency.summary}\n\n${bullet(
          "Focus",
          agency.focus.join("; ")
        )}\n${bullet(
          "Notable programs",
          agency.notablePrograms.join("; ")
        )}${cite(sourceIds)}${recordLink(
          `/museum/agencies/${agency.id}`,
          agency.name
        )}`,
        sourceIds,
      };
    case "mission":
      if (agencyMissions.length === 0) return null;
      return {
        answer: `**${agency.name}** (${agency.shortName}) — ${
          agencyMissions.length
        } ${agencyMissions.length === 1 ? "mission" : "missions"} in the GRAVERSE collection.\n\n${agencyMissions
          .map((mission) => `- **${mission.name}** — ${mission.destinationLabel}`)
          .join("\n")}${cite(sourceIds)}${recordLink(
          `/museum/agencies/${agency.id}`,
          agency.name
        )}`,
        sourceIds,
      };
    case "hardware":
      if (agencyMissions.length === 0) return null;
      return {
        answer: `**${agency.name}** — the hardware GRAVERSE holds for this agency.\n\n${agencyMissions
          .map(
            (mission) =>
              `- **${mission.name}** — ${getArtifactsByIds(mission.artifactIds)
                .map((artifact) => artifact.name)
                .join(", ")}`
          )
          .join("\n")}${cite(sourceIds)}${recordLink(
          `/museum/agencies/${agency.id}`,
          agency.name
        )}`,
        sourceIds,
      };
    default:
      return null;
  }
}

function lessonDraft(
  id: string,
  aspect: LocalAspect,
  locale: AskLocale
): LocalDraft | null {
  const lesson = lessons.find((entry) => entry.id === id);
  if (!lesson) return null;
  const sourceIds = lesson.sourceIds;

  switch (aspect) {
    case "overview":
      return {
        answer: `**${lesson.title}** is a Space Academy lesson for ages ${lesson.ageBand}, about ${lesson.minutes} minutes.\n\n${lesson.summary}\n\n${bullet(
          "By the end you can",
          lesson.objectives.join("; ")
        )}\n${bullet(
          "Key terms",
          lesson.keyTerms.map((term) => term.term).join(", ")
        )}${cite(sourceIds)}${recordLink(
          `/academy/lessons/${lesson.id}`,
          lesson.title
        )}`,
        sourceIds,
      };
    case "objectives":
      return {
        answer: `**${lesson.title}** — what the lesson teaches.\n\n${lesson.objectives
          .map((objective) => `- ${objective}`)
          .join("\n")}\n\n${lesson.sections
          .map((section) => `**${section.heading}** — ${section.paragraphs[0] ?? ""}`)
          .join("\n\n")}${cite(sourceIds)}${recordLink(
          `/academy/lessons/${lesson.id}`,
          lesson.title
        )}`,
        sourceIds,
      };
    case "related": {
      const artifacts = getArtifactsByIds(lesson.artifactIds);
      if (artifacts.length === 0) return null;
      return {
        answer: `**${lesson.title}** teaches using ${artifacts.length} ${
          artifacts.length === 1 ? "record" : "records"
        } from the collection.\n\n${artifacts
          .map(
            (artifact) =>
              `- **${artifact.name}** — ${artifact.destination}, ${artifact.missionName}`
          )
          .join("\n")}${cite(sourceIds)}${recordLink(
          `/academy/lessons/${lesson.id}`,
          lesson.title
        )}`,
        sourceIds,
      };
    }
    default:
      return null;
  }
}

function storyDraft(
  id: string,
  aspect: LocalAspect,
  locale: AskLocale
): LocalDraft | null {
  const story = storyCollections.find((entry) => entry.id === id);
  if (!story) return null;
  const sourceIds = story.sourceIds;

  switch (aspect) {
    case "overview":
      return {
        answer: `**${story.title}** — ${story.eyebrow}.\n\n${story.dek}\n\n${story.summary}\n\n${story.sections
          .map((section) => `**${section.heading}** — ${section.paragraphs[0] ?? ""}`)
          .join("\n\n")}${cite(sourceIds)}${recordLink(
          `/stories/${story.id}`,
          story.title
        )}`,
        sourceIds,
      };
    case "objectives":
      return {
        answer: `**${story.title}** — the reading path.\n\n${story.sections
          .map((section) => `- **${section.heading}** — ${section.paragraphs[0] ?? ""}`)
          .join("\n")}${cite(sourceIds)}${recordLink(
          `/stories/${story.id}`,
          story.title
        )}`,
        sourceIds,
      };
    case "related": {
      const artifacts = getArtifactsByIds(story.artifactIds);
      if (artifacts.length === 0) return null;
      return {
        answer: `**${story.title}** draws on ${artifacts.length} ${
          artifacts.length === 1 ? "record" : "records"
        }.\n\n${artifacts
          .map((artifact) => `- **${artifact.name}** — ${artifact.destination}`)
          .join("\n")}${cite(sourceIds)}${recordLink(
          `/stories/${story.id}`,
          story.title
        )}`,
        sourceIds,
      };
    }
    default:
      return null;
  }
}

function engineeringDraft(
  id: string,
  aspect: LocalAspect,
  locale: AskLocale
): LocalDraft | null {
  const topic = engineeringTopics.find((entry) => entry.id === id);
  if (!topic) return null;
  const sourceIds = topic.sourceIds;

  switch (aspect) {
    case "overview":
    case "technical":
      return {
        answer: `**${topic.title}** — ${topic.question}\n\n${topic.summary}\n\n${topic.body
          .map((paragraph) => `- ${paragraph}`)
          .join("\n")}\n\n**Takeaway:** ${topic.takeaway}${cite(
          sourceIds
        )}${recordLink(`/engineering/${topic.id}`, topic.title)}`,
        sourceIds,
      };
    case "purpose":
      return {
        answer: `**${topic.title}** answers a specific engineering question: ${topic.question}\n\n${topic.summary}\n\n**Takeaway:** ${topic.takeaway}${cite(
          sourceIds
        )}${recordLink(`/engineering/${topic.id}`, topic.title)}`,
        sourceIds,
      };
    case "related": {
      const artifacts = getArtifactsByIds(topic.artifactIds);
      if (artifacts.length === 0) return null;
      return {
        answer: `**${topic.title}** is illustrated by ${artifacts.length} ${
          artifacts.length === 1 ? "record" : "records"
        } in the collection.\n\n${artifacts
          .map((artifact) => `- **${artifact.name}** — ${artifact.destination}`)
          .join("\n")}${cite(sourceIds)}${recordLink(
          `/engineering/${topic.id}`,
          topic.title
        )}`,
        sourceIds,
      };
    }
    default:
      return null;
  }
}

function simulationDraft(
  id: string,
  aspect: LocalAspect,
  locale: AskLocale
): LocalDraft | null {
  const simulation = simulations.find((entry) => entry.id === id);
  if (!simulation) return null;
  const sourceIds = simulation.sourceIds;

  switch (aspect) {
    case "overview":
      return {
        answer: `**${simulation.title}** (${simulation.number}) — ${simulation.tagline}.\n\n${simulation.description}\n\n${bullet(
          "Learning objectives",
          simulation.objectives.join("; ")
        )}\n${bullet("Concepts", simulation.concepts.join("; "))}\n\n**Important:** ${simulation.approximation}${cite(
          sourceIds
        )}${recordLink(`/simulations/${simulation.id}`, simulation.title)}`,
        sourceIds,
      };
    case "technical":
      return {
        answer: `**${simulation.title}** — how the model works.\n\n${simulation.description}\n\n${bullet(
          "Concepts",
          simulation.concepts.join("; ")
        )}\n\n**Important:** ${simulation.approximation}${cite(
          sourceIds
        )}${recordLink(`/simulations/${simulation.id}`, simulation.title)}`,
        sourceIds,
      };
    case "related": {
      const artifacts = getArtifactsByIds(simulation.artifactIds);
      if (artifacts.length === 0) return null;
      return {
        answer: `**${simulation.title}** is built on ${artifacts.length} ${
          artifacts.length === 1 ? "record" : "records"
        }.\n\n${artifacts
          .map((artifact) => `- **${artifact.name}** — ${artifact.destination}`)
          .join("\n")}\n\n**Important:** ${simulation.approximation}${cite(
          sourceIds
        )}${recordLink(`/simulations/${simulation.id}`, simulation.title)}`,
        sourceIds,
      };
    }
    default:
      return null;
  }
}

function articleDraft(
  id: string,
  aspect: LocalAspect,
  locale: AskLocale
): LocalDraft | null {
  const article = articles.find((entry) => entry.id === id);
  if (!article) return null;
  const sourceIds = article.sourceIds;

  if (aspect !== "overview") return null;
  return {
    answer: `**${article.title}** — ${article.dek}\n\n${article.sections
      .map((section) => `**${section.heading}** — ${section.paragraphs[0] ?? ""}`)
      .join("\n\n")}${cite(sourceIds)}${recordLink(
      `/academy/articles/${article.id}`,
      article.title
    )}`,
    sourceIds,
  };
}

/* ------------------------------------------------------------------ entry */

/**
 * Builds the local answer for one record and aspect.
 *
 * Returns `null` when the record does not establish that aspect, which is the
 * signal to fall through to the provider.
 */
export function buildRecordAnswer(
  kind: LocalEntityKind,
  id: string,
  aspect: LocalAspect,
  locale: AskLocale
): LocalDraft | null {
  switch (kind) {
    case "artifact":
      return artifactDraft(id, aspect, locale);
    case "mission":
      return missionDraft(id, aspect, locale);
    case "body":
      return bodyDraft(id, aspect, locale);
    case "deep-sky":
      return deepSkyDraft(id, aspect, locale);
    case "agency":
      return agencyDraft(id, aspect, locale);
    case "lesson":
      return lessonDraft(id, aspect, locale);
    case "story":
      return storyDraft(id, aspect, locale);
    case "engineering":
      return engineeringDraft(id, aspect, locale);
    case "simulation":
      return simulationDraft(id, aspect, locale);
    case "article":
      return articleDraft(id, aspect, locale);
    default:
      return null;
  }
}

/** The aspects that can be answered for a record kind. */
export function aspectsForKind(kind: LocalEntityKind): LocalAspect[] {
  return LOCAL_ASPECTS.filter((definition) =>
    definition.kinds.includes(kind)
  ).map((definition) => definition.aspect);
}

function lowerFirst(value: string): string {
  if (!value) return value;
  return value.charAt(0).toLowerCase() + value.slice(1);
}

function hardwareTypeSingular(type: string): string {
  const map: Record<string, string> = {
    rover: "rover",
    lander: "lander",
    orbiter: "orbiter",
    probe: "probe",
    instrument: "instrument",
    "surface-equipment": "surface equipment",
    aircraft: "aircraft",
  };
  return map[type] ?? type;
}

/** The bodies GRAVERSE records, for the relationship layer. */
export const LOCAL_BODIES = celestialBodies;
/** The agencies GRAVERSE records, for the relationship layer. */
export const LOCAL_AGENCIES = agencies;
