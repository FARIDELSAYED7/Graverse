import {
  allArtifacts,
  getArtifactById,
  getArtifactsByIds,
  hardwareTypeSingular,
} from "@/data/artifacts";
import { getSources } from "@/data/sources";
import { getMission } from "@/data/missions";
import { getLesson } from "@/data/lessons";
import { articles } from "@/data/articles";
import { deepSkyObjects } from "@/data/space/deep-sky";
import {
  engineeringSystemLabels,
  getEngineeringTopic,
} from "@/data/engineering";
import { getSimulation } from "@/data/simulations";
import { getStoryCollection } from "@/data/stories";
import { getBody } from "@/data/space/bodies";
import { getAgency } from "@/data/space/agencies";
import { formatDate } from "@/lib/format";
import { hardwareStatusLabels, missionStatusLabels } from "@/lib/status";
import { searchDocs } from "@/lib/search-index";
import type { AskContextKind, AskContextSummary, AskSourceRef } from "./types";

/**
 * Grounded retrieval for Ask GRAVERSE.
 *
 * The assistant never invents a fact. Everything it may say has to come from
 * a record in `src/data`, and every source it may link has to come from the
 * registry in `src/data/sources.ts`. This module turns a visitor question and
 * an optional *context hint* into:
 *
 *   1. a small set of real GRAVERSE records (as plain text lines),
 *   2. the registered source records behind those records,
 *   3. a resolved context summary.
 *
 * The browser only ever sends an entity id. The record is resolved here,
 * on the server, against the real datasets. An id that does not resolve is
 * dropped rather than trusted.
 */

export interface RetrievedRecord {
  kind: AskContextKind;
  id: string;
  title: string;
  href?: string;
  lines: string[];
  sourceIds: string[];
}

export interface RetrievalResult {
  records: RetrievedRecord[];
  sources: AskSourceRef[];
  context: AskContextSummary | null;
  /** True when no GRAVERSE record could be attached to the question. */
  empty: boolean;
}

/* ------------------------------------------------------------------ helpers */

function clean(value: string | undefined | null): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * A small query-expansion dictionary.
 *
 * GRAVERSE's editorial records are English. When a visitor writes in Arabic,
 * these aliases give the retrieval a chance to find the right record instead
 * of returning nothing. The aliases are vocabulary only — they never add a
 * fact to a record.
 */
const QUERY_ALIASES: Array<[RegExp, string[]]> = [
  [/القمر|قمر/, ["moon", "lunar"]],
  [/المريخ|مريخ/, ["mars"]],
  [/زحل/, ["saturn"]],
  [/أبولو|ابولو/, ["apollo"]],
  [/ناسا/, ["nasa"]],
  [/روفر/, ["rover"]],
  [/مركبة/, ["spacecraft"]],
  [/مستكشف|مجسّ/, ["probe"]],
  [/هبوط|هبط/, ["landing"]],
  [/وحدة الإنزال|مركبة الإنزال/, ["descent"]],
  [/voyager/i, ["voyager"]],
  [/viking/i, ["viking"]],
  [/curiosity/i, ["curiosity"]],
  [/perseverance/i, ["perseverance"]],
  [/ماء|بحار/, ["water"]],
  [/أجهزة|مجهر|تلسكوب/, ["instrument"]],
  [/طاقة/, ["power"]],
  [/اتصال|إرسال/, ["communication"]],
  [/مركبة هبوط|هبطت/, ["lander"]],
  [/مسبار|مرصد/, ["orbiter"]],
];

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "of",
  "in",
  "on",
  "to",
  "for",
  "and",
  "or",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "it",
  "its",
  "this",
  "that",
  "these",
  "those",
  "what",
  "why",
  "how",
  "when",
  "where",
  "who",
  "which",
  "did",
  "do",
  "does",
  "can",
  "could",
  "would",
  "should",
  "tell",
  "me",
  "about",
  "explain",
  "please",
  "you",
  "your",
  "i",
  "we",
  "us",
  "difference",
  "status",
  "mission",
  "hardware",
  "work",
  "works",
  "happen",
  "happened",
  "happens",
  "thing",
  "things",
  "any",
  "some",
  "there",
  "here",
  "and",
]);

/** Splits a question into meaningful search terms. */
export function askQueryTerms(question: string): string[] {
  const base = normalize(question)
    .split(/[^a-z0-9\u0600-\u06ff]+/)
    .filter((term) => term.length >= 3 && !STOP_WORDS.has(term));

  const expanded = new Set(base);
  for (const [pattern, aliases] of QUERY_ALIASES) {
    if (pattern.test(question)) {
      for (const alias of aliases) expanded.add(alias);
    }
  }
  return [...expanded];
}

/* --------------------------------------------------------- record builders */

function artifactRecord(artifactId: string): RetrievedRecord | null {
  const artifact = getArtifactById(artifactId);
  if (!artifact) return null;

  const lines: string[] = [
    `Name: ${artifact.name}`,
    artifact.alternateNames?.length
      ? `Also called: ${artifact.alternateNames.join(", ")}`
      : "",
    `Record type: artifact (${hardwareTypeSingular[artifact.hardwareType]})`,
    `Mission: ${artifact.missionName}`,
    `Program: ${artifact.programName}`,
    `Destination: ${artifact.destination}`,
    `Summary: ${artifact.shortDescription}`,
    `Overview: ${artifact.overview}`,
    `Scientific purpose: ${artifact.scientificPurpose}`,
    `Mission status (GRAVERSE label): ${missionStatusLabels[artifact.missionStatus]}`,
    `Mission status (source wording): ${artifact.missionStatusOriginal}`,
    `Hardware status (GRAVERSE label): ${hardwareStatusLabels[artifact.hardwareStatus]}`,
    `Hardware status (source wording): ${artifact.hardwareStatusOriginal}`,
    artifact.launchDate
      ? `Launch date: ${formatDate(artifact.launchDate)} (${artifact.launchDate})`
      : "Launch date: not documented",
    artifact.arrivalDate
      ? `Arrival / deployment: ${formatDate(artifact.arrivalDate)} (${artifact.arrivalDate})`
      : "Arrival / deployment: not documented",
    artifact.missionEndDate
      ? `Mission end: ${formatDate(artifact.missionEndDate)} (${artifact.missionEndDate})`
      : "Mission end: not documented",
    artifact.lastContactDate
      ? `Last contact: ${formatDate(artifact.lastContactDate)} (${artifact.lastContactDate})`
      : "Last contact: not documented",
    "Recorded timeline:",
    ...artifact.timelineEvents.map(
      (event) =>
        `  - ${event.dateLabel} — ${event.label}: ${event.description}`
    ),
    "Scientific and engineering contributions:",
    ...artifact.scientificContributions.map(
      (contribution) =>
        `  - [${contribution.kind}] ${contribution.title}: ${contribution.summary}`
    ),
    `What happened to the hardware: ${artifact.fate}`,
    `Location: ${artifact.location.body} — ${artifact.location.locationName} (${artifact.location.precision}${
      artifact.location.note ? `; ${artifact.location.note}` : ""
    })`,
    "Technical details:",
    ...artifact.technicalDetails.map(
      (detail) => `  - ${detail.label}: ${detail.value}`
    ),
  ];

  const related = getArtifactsByIds(artifact.relatedIds);
  if (related.length > 0) {
    lines.push(
      `Related GRAVERSE records: ${related
        .map((entry) => `${entry.name} (${entry.destination})`)
        .join("; ")}`
    );
  }
  if (artifact.dataNotes.length > 0) {
    lines.push("Uncertainty notes recorded with this artifact:");
    for (const note of artifact.dataNotes) lines.push(`  - ${note}`);
  }

  return {
    kind: "artifact",
    id: artifact.id,
    title: artifact.name,
    href: `/museum/${artifact.id}`,
    lines: lines.filter(Boolean),
    sourceIds: [...artifact.sourceIds],
  };
}

function missionRecord(missionId: string): RetrievedRecord | null {
  const mission = getMission(missionId);
  if (!mission) return null;

  const artifacts = getArtifactsByIds(mission.artifactIds);
  const lines: string[] = [
    `Name: ${mission.name}`,
    `Record type: mission`,
    `Program: ${mission.program}`,
    `Destination: ${mission.destinationLabel}`,
    `Launch date: ${formatDate(mission.launchDate)} (${mission.launchDate})`,
    mission.endDate
      ? `Mission end: ${formatDate(mission.endDate)} (${mission.endDate})`
      : "Mission end: not documented",
    `Mission status (GRAVERSE label): ${missionStatusLabels[mission.status]}`,
    `Mission status (source wording): ${mission.statusNote}`,
    `Summary: ${mission.summary}`,
    "Objectives:",
    ...mission.objectives.map((objective) => `  - ${objective}`),
    "Recorded achievements:",
    ...mission.achievements.map((achievement) => `  - ${achievement}`),
    artifacts.length > 0
      ? `Hardware in this mission: ${artifacts
          .map((artifact) => {
            const label = hardwareStatusLabels[artifact.hardwareStatus];
            return `${artifact.name} (${artifact.hardwareStatus}, hardware status: ${label})`;
          })
          .join("; ")}`
      : "",
  ];

  return {
    kind: "mission",
    id: mission.id,
    title: mission.name,
    href: `/museum/missions/${mission.id}`,
    lines: lines.filter(Boolean),
    sourceIds: [...mission.sourceIds],
  };
}

function lessonRecord(lessonId: string): RetrievedRecord | null {
  const lesson = getLesson(lessonId);
  if (!lesson) return null;

  const artifacts = getArtifactsByIds(lesson.artifactIds);
  const lines: string[] = [
    `Title: ${lesson.title}`,
    `Record type: academy lesson`,
    `Age band: ${lesson.ageBand}`,
    `Estimated time: ${lesson.minutes} minutes`,
    `Summary: ${lesson.summary}`,
    "Learning objectives:",
    ...lesson.objectives.map((objective) => `  - ${objective}`),
    "Lesson sections:",
    ...lesson.sections.flatMap((section) => [
      `  - ${section.heading}`,
      ...section.paragraphs.map((paragraph) => `      ${paragraph}`),
      ...(section.callout ? [`      Callout: ${section.callout}`] : []),
    ]),
    "Key terms:",
    ...lesson.keyTerms.map(
      (term) => `  - ${term.term}: ${term.definition}`
    ),
    `Try it: ${lesson.tryIt}`,
    artifacts.length > 0
      ? `Records used in this lesson: ${artifacts
          .map((artifact) => artifact.name)
          .join("; ")}`
      : "",
  ];

  return {
    kind: "lesson",
    id: lesson.id,
    title: lesson.title,
    href: `/academy/lessons/${lesson.id}`,
    lines: lines.filter(Boolean),
    sourceIds: [...lesson.sourceIds],
  };
}

function engineeringRecord(topicId: string): RetrievedRecord | null {
  const topic = getEngineeringTopic(topicId);
  if (!topic) return null;

  const artifacts = getArtifactsByIds(topic.artifactIds);
  const lines: string[] = [
    `Title: ${topic.title}`,
    `Record type: engineering explainer`,
    `System: ${engineeringSystemLabels[topic.system]}`,
    `Question it answers: ${topic.question}`,
    `Summary: ${topic.summary}`,
    "Explanation:",
    ...topic.body.map((paragraph) => `  - ${paragraph}`),
    `Takeaway: ${topic.takeaway}`,
  ];

  if (topic.comparison?.length) {
    lines.push("Comparison:");
    for (const row of topic.comparison) {
      lines.push(`  - ${row.label}: ${row.value}`);
    }
  }
  if (artifacts.length > 0) {
    lines.push(
      `Records used here: ${artifacts.map((artifact) => artifact.name).join("; ")}`
    );
  }

  return {
    kind: "engineering",
    id: topic.id,
    title: topic.title,
    href: `/engineering/${topic.id}`,
    lines: lines.filter(Boolean),
    sourceIds: [...topic.sourceIds],
  };
}

function simulationRecord(simulationId: string): RetrievedRecord | null {
  const simulation = getSimulation(simulationId);
  if (!simulation) return null;

  const artifacts = getArtifactsByIds(simulation.artifactIds);
  const lines: string[] = [
    `Title: ${simulation.title}`,
    `Record type: educational simulation (${simulation.number})`,
    `Tagline: ${simulation.tagline}`,
    `Description: ${simulation.description}`,
    "Learning objectives:",
    ...simulation.objectives.map((objective) => `  - ${objective}`),
    "Concepts:",
    ...simulation.concepts.map((concept) => `  - ${concept}`),
    `IMPORTANT — this is an educational approximation, not a NASA prediction: ${simulation.approximation}`,
    artifacts.length > 0
      ? `Records used here: ${artifacts.map((artifact) => artifact.name).join("; ")}`
      : "",
  ];

  return {
    kind: "simulation",
    id: simulation.id,
    title: simulation.title,
    href: `/simulations/${simulation.id}`,
    lines: lines.filter(Boolean),
    sourceIds: [...simulation.sourceIds],
  };
}

function storyRecord(storyId: string): RetrievedRecord | null {
  const story = getStoryCollection(storyId);
  if (!story) return null;

  const artifacts = getArtifactsByIds(story.artifactIds);
  const lines: string[] = [
    `Title: ${story.title}`,
    `Record type: curated story`,
    `Section: ${story.eyebrow}`,
    `Summary: ${story.summary}`,
    ...story.sections.flatMap((section) => [
      `  - ${section.heading}`,
      ...section.paragraphs.map((paragraph) => `      ${paragraph}`),
    ]),
    artifacts.length > 0
      ? `Records in this story: ${artifacts.map((artifact) => artifact.name).join("; ")}`
      : "",
  ];

  return {
    kind: "story",
    id: story.id,
    title: story.title,
    href: `/stories/${story.id}`,
    lines: lines.filter(Boolean),
    sourceIds: [...story.sourceIds],
  };
}

function bodyRecord(bodyId: string): RetrievedRecord | null {
  const body = getBody(bodyId);
  if (!body) return null;

  const lines: string[] = [
    `Name: ${body.name}`,
    `Record type: destination body (${body.kind})`,
    `Tagline: ${body.tagline}`,
    `Summary: ${body.summary}`,
    ...body.overview.map((paragraph) => `  - ${paragraph}`),
    "Recorded facts (claim label in brackets):",
    ...body.facts.map(
      (fact) => `  - ${fact.label}: ${fact.value} [${fact.claim}]`
    ),
    `Distance reference: ${body.distanceLabel}`,
    `Orbital period: ${body.orbitalPeriod}`,
    `Day length: ${body.dayLength}`,
    `Radius: ${body.radius}`,
    `Mean temperature: ${body.temperature}`,
    `Discovery: ${body.discovery}`,
    `Exploration: ${body.exploration}`,
    `Highlights: ${body.highlights.join("; ")}`,
  ];

  return {
    kind: "body",
    id: body.id,
    title: body.name,
    href: `/explorer/bodies/${body.id}`,
    lines: lines,
    sourceIds: [...body.sourceIds],
  };
}

function deepSkyRecord(objectId: string): RetrievedRecord | null {
  const object = deepSkyObjects.find((entry) => entry.id === objectId);
  if (!object) return null;
  return {
    kind: "deep-sky",
    id: object.id,
    title: object.name,
    href: `/explorer/deep-sky/${object.id}`,
    lines: [
      `Name: ${object.name}`,
      `Catalog: ${object.catalogName}`,
      `Record type: deep-sky object (${object.kindLabel})`,
      `Constellation: ${object.constellation}`,
      `Distance: ${object.distance}`,
      `Summary: ${object.summary}`,
      ...object.overview.map((paragraph) => `  - ${paragraph}`),
      "Recorded facts:",
      ...object.facts.map(
        (fact) => `  - ${fact.label}: ${fact.value} [${fact.claim}]`
      ),
      `Discovery: ${object.discovery}`,
      `Observation: ${object.observation}`,
    ],
    sourceIds: [...object.sourceIds],
  };
}

function articleRecord(articleId: string): RetrievedRecord | null {
  const article = articles.find((entry) => entry.id === articleId);
  if (!article) return null;
  return {
    kind: "article",
    id: article.id,
    title: article.title,
    href: `/academy/articles/${article.id}`,
    lines: [
      `Title: ${article.title}`,
      "Record type: long-form article",
      `Summary: ${article.dek}`,
      `Topics: ${article.topics.join(", ")}`,
      ...article.sections.map(
        (section) => `  - ${section.heading}: ${section.paragraphs[0] ?? ""}`
      ),
    ],
    sourceIds: [...article.sourceIds],
  };
}

function agencyRecord(agencyId: string): RetrievedRecord | null {
  const agency = getAgency(agencyId);
  if (!agency) return null;

  const lines: string[] = [
    `Name: ${agency.name}`,
    `Record type: agency`,
    `Short name: ${agency.shortName}`,
    `Country: ${agency.country}`,
    `Founded: ${agency.founded}`,
    `Summary: ${agency.summary}`,
    `Focus: ${agency.focus.join("; ")}`,
    `Notable programs: ${agency.notablePrograms.join("; ")}`,
    `Website: ${agency.website}`,
  ];

  return {
    kind: "agency",
    id: agency.id,
    title: agency.name,
    href: `/museum/agencies/${agency.id}`,
    lines,
    sourceIds: [...agency.sourceIds],
  };
}

/** Builds the record for any supported entity kind. Unknown ids return null. */
export function buildAskRecord(
  kind: AskContextKind,
  id: string
): RetrievedRecord | null {
  switch (kind) {
    case "artifact":
      return artifactRecord(id);
    case "mission":
      return missionRecord(id);
    case "lesson":
      return lessonRecord(id);
    case "engineering":
      return engineeringRecord(id);
    case "simulation":
      return simulationRecord(id);
    case "story":
      return storyRecord(id);
    case "body":
      return bodyRecord(id);
    case "agency":
      return agencyRecord(id);
    case "deep-sky":
      return deepSkyRecord(id);
    case "article":
      return articleRecord(id);
    default:
      return null;
  }
}

/* --------------------------------------------------------------- resolution */

/**
 * Resolves a browser-supplied context hint against the real datasets.
 * The browser never supplies the title or the facts — only an id.
 */
export function resolveAskContext(
  kind: AskContextKind,
  id: string
): { summary: AskContextSummary; record: RetrievedRecord } | null {
  const record = buildAskRecord(kind, id);
  if (!record) return null;

  let subtitle: string | undefined;
  if (kind === "artifact") {
    const artifact = getArtifactById(id);
    subtitle = artifact
      ? `${artifact.missionName} · ${artifact.destination}`
      : undefined;
  } else if (kind === "mission") {
    const mission = getMission(id);
    subtitle = mission ? mission.destinationLabel : undefined;
  } else if (kind === "lesson") {
    const lesson = getLesson(id);
    subtitle = lesson ? `Academy lesson · ages ${lesson.ageBand}` : undefined;
  } else if (kind === "engineering") {
    const topic = getEngineeringTopic(id);
    subtitle = topic ? engineeringSystemLabels[topic.system] : undefined;
  } else if (kind === "simulation") {
    const simulation = getSimulation(id);
    subtitle = simulation ? `Educational model ${simulation.number}` : undefined;
  } else if (kind === "story") {
    const story = getStoryCollection(id);
    subtitle = story ? story.eyebrow : undefined;
  } else if (kind === "body") {
    const body = getBody(id);
    subtitle = body ? body.kind.replace("-", " ") : undefined;
  } else if (kind === "agency") {
    const agency = getAgency(id);
    subtitle = agency ? agency.country : undefined;
  } else if (kind === "deep-sky") {
    const object = deepSkyObjects.find((entry) => entry.id === id);
    subtitle = object ? object.kindLabel : undefined;
  } else if (kind === "article") {
    const article = articles.find((entry) => entry.id === id);
    subtitle = article ? "Academy article" : undefined;
  }

  return {
    summary: {
      kind,
      id: record.id,
      title: record.title,
      subtitle,
      href: record.href,
    },
    record,
  };
}

/* ---------------------------------------------------------------- searching */

/**
 * Selects candidate records for a free-form question.
 *
 * `searchAll` in `src/lib/search-index.ts` requires every term to match, which
 * is right for the site search box but wrong for a natural-language question.
 * The index is reused here as the candidate pool; the terms are then scored
 * with OR semantics so a question like "what happened to the Mars rovers"
 * still finds the right records.
 */
export function selectAskRecords(question: string, limit = 6): RetrievedRecord[] {
  const terms = askQueryTerms(question);
  if (terms.length === 0) return [];

  const scored = searchDocs
    .map((doc) => {
      const title = normalize(doc.title);
      const haystack = `${title} ${normalize(doc.meta ?? "")} ${doc.keywords}`;
      let score = 0;
      let matched = 0;
      for (const term of terms) {
        if (title.includes(term)) {
          score += title === term ? 120 : title.startsWith(term) ? 70 : 45;
          matched += 1;
        } else if (haystack.includes(term)) {
          score += 12;
          matched += 1;
        }
      }
      return { doc, score, matched };
    })
    .filter((entry) => entry.matched > 0 && entry.score > 0)
    .sort((a, b) => b.score - a.score);

  const records: RetrievedRecord[] = [];
  const seen = new Set<string>();

  for (const { doc } of scored) {
    if (records.length >= limit) break;
    const separator = doc.id.indexOf(":");
    const kind = doc.id.slice(0, separator);
    const id = doc.id.slice(separator + 1);
    const key = `${kind}:${id}`;
    if (seen.has(key)) continue;

    const record = buildAskRecordForSearchKind(kind, id);
    if (!record) continue;
    seen.add(key);
    records.push(record);
  }

  return records;
}

function buildAskRecordForSearchKind(
  kind: string,
  id: string
): RetrievedRecord | null {
  switch (kind) {
    case "artifact":
      return artifactRecord(id);
    case "mission":
      return missionRecord(id);
    case "lesson":
      return lessonRecord(id);
    case "engineering":
      return engineeringRecord(id);
    case "simulation":
      return simulationRecord(id);
    case "story":
      return storyRecord(id);
    case "body":
      return bodyRecord(id);
    case "agency":
      return agencyRecord(id);
    case "deep-sky":
      return deepSkyRecord(id);
    case "article":
      return articleRecord(id);
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ context */

/**
 * A compact index of the collection. It carries no prose and no extra facts —
 * only the names, destinations and the two separate status bands that a
 * visitor's question may be about. It lets the assistant point at a real
 * record instead of guessing, without shipping every record to the model.
 */
function collectionIndex(): string {
  return allArtifacts
    .map(
      (artifact) =>
        `- ${artifact.name} | mission: ${artifact.missionName} | destination: ${artifact.destination} | hardware type: ${hardwareTypeSingular[artifact.hardwareType]} | mission status: ${missionStatusLabels[artifact.missionStatus]} | hardware status: ${hardwareStatusLabels[artifact.hardwareStatus]}`
    )
    .join("\n");
}

/**
 * Picks a small set of records that illustrate the difference between mission
 * status and hardware status.
 *
 * The selection is made from the dataset rather than written down by hand, so
 * it can never drift away from the records it points at. Three cases are
 * chosen: a mission that ended on purpose with its hardware destroyed, a
 * mission that ended while its hardware is still in use, and a mission that
 * ended while its hardware was simply left behind.
 */
export function illustrativeStatusRecords(): RetrievedRecord[] {
  const categories: Array<(artifact: (typeof allArtifacts)[number]) => boolean> = [
    (artifact) =>
      artifact.missionStatus === "completed" &&
      (artifact.hardwareStatus === "impacted" ||
        artifact.hardwareStatus === "destroyed"),
    (artifact) =>
      artifact.missionStatus === "completed" &&
      artifact.hardwareStatus === "operating",
    (artifact) =>
      artifact.missionStatus === "completed" &&
      (artifact.hardwareStatus === "inactive" ||
        artifact.hardwareStatus === "no-longer-communicating"),
  ];

  const picked: RetrievedRecord[] = [];
  for (const matches of categories) {
    const artifact = allArtifacts.find(matches);
    if (!artifact) continue;
    const record = artifactRecord(artifact.id);
    if (record) picked.push(record);
  }
  return picked;
}

/** True when the question is about the two status bands themselves. */
export function asksAboutStatus(question: string): boolean {
  const normalized = normalize(question);
  if (/mission status|hardware status|status of the (mission|hardware)/.test(normalized)) {
    return true;
  }
  return /حالة\s*(المهمة|العتاد)/.test(question);
}

/**
 * Builds the full retrieval for one question.
 *
 * Contextual questions are answered from the record the visitor is viewing
 * (plus the records it is directly related to). Global questions are answered
 * from the search index plus the compact collection index.
 */
export function retrieveForAsk(
  question: string,
  contextHint?: { kind: string; id: string } | null
): RetrievalResult {
  const records: RetrievedRecord[] = [];
  let resolvedContext: AskContextSummary | null = null;

  const hintKind = contextHint?.kind;
  const hintId = contextHint?.id?.trim();
  if (hintKind && hintId) {
    const resolved = resolveAskContext(hintKind as AskContextKind, hintId);
    if (resolved) {
      resolvedContext = resolved.summary;
      records.push(resolved.record);
    }
  }

  if (records.length === 0) {
    records.push(...selectAskRecords(question, 6));
  } else {
    // A contextual answer is strengthened by the records that record links to.
    const related = selectAskRecords(question, 4).filter(
      (record) =>
        !records.some(
          (existing) =>
            existing.kind === record.kind && existing.id === record.id
        )
    );
    records.push(...related.slice(0, 2));
  }

  if (!resolvedContext && asksAboutStatus(question)) {
    // The conceptual question needs examples, not just names.
    for (const record of illustrativeStatusRecords()) {
      if (
        !records.some(
          (existing) => existing.kind === record.kind && existing.id === record.id
        )
      ) {
        records.push(record);
      }
      if (records.length >= 6) break;
    }
  }

  const sourceIds = [
    ...new Set(records.flatMap((record) => record.sourceIds)),
  ];
  const sources = getSources(sourceIds).map(
    (source): AskSourceRef => ({
      id: source.id,
      organization: source.organization,
      title: source.title,
      url: source.url,
      type: source.type,
      accessedAt: source.accessedAt,
      notes: source.notes,
    })
  );

  return {
    records,
    sources,
    context: resolvedContext,
    empty: records.length === 0,
  };
}

/**
 * Formats the retrieved records and their sources as the grounded context
 * block that is sent to the model.
 */
export function formatAskContextBlock(
  retrieval: RetrievalResult,
  includeCollectionIndex: boolean
): string {
  const parts: string[] = [];

  parts.push("=== GRAVERSE RECORDS (the only facts you may use) ===");
  if (retrieval.records.length === 0) {
    parts.push(
      "No GRAVERSE record matched this question. You must say that the available GRAVERSE records do not establish this information, and you may still describe the collection using the index below."
    );
  } else {
    retrieval.records.forEach((record, index) => {
      parts.push(
        `[Record ${index + 1} | ${record.kind} | ${record.title}${
          record.href ? ` | ${record.href}` : ""
        }]`
      );
      parts.push(...record.lines);
      parts.push("");
    });
  }

  if (includeCollectionIndex) {
    parts.push("=== GRAVERSE COLLECTION INDEX (names and status bands only) ===");
    parts.push(collectionIndex());
    parts.push("");
  }

  parts.push("=== SOURCES (cite by id, for example [SRC-APOLLO-11]) ===");
  if (retrieval.sources.length === 0) {
    parts.push("No source is attached to the records above.");
  } else {
    for (const source of retrieval.sources) {
      parts.push(
        `${source.id} | ${source.organization} | ${source.title} | ${source.type} | accessed ${source.accessedAt} | ${source.url}`
      );
    }
  }

  return parts.join("\n");
}
