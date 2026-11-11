import { allArtifacts } from "@/data/artifacts";
import { articles } from "@/data/articles";
import { engineeringTopics, engineeringSystemLabels } from "@/data/engineering";
import { glossary } from "@/data/glossary";
import { journeys } from "@/data/journeys";
import { lessons } from "@/data/lessons";
import { missions } from "@/data/missions";
import { methodSections } from "@/data/research";
import { simulations } from "@/data/simulations";
import { storyCollections } from "@/data/stories";
import { agencies } from "@/data/space/agencies";
import { celestialBodies } from "@/data/space/bodies";
import { deepSkyObjects } from "@/data/space/deep-sky";

export type SearchKind =
  | "artifact"
  | "mission"
  | "body"
  | "deep-sky"
  | "lesson"
  | "journey"
  | "article"
  | "agency"
  | "glossary"
  | "engineering"
  | "story"
  | "simulation"
  | "research";

export interface SearchDoc {
  id: string;
  kind: SearchKind;
  title: string;
  description: string;
  href: string;
  keywords: string;
  meta?: string;
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const docs: SearchDoc[] = [
  ...allArtifacts.map((artifact) => ({
    id: `artifact:${artifact.id}`,
    kind: "artifact" as const,
    title: artifact.name,
    description: artifact.shortDescription,
    href: `/museum/${artifact.id}`,
    meta: `${artifact.destination} · ${artifact.missionName}`,
    keywords: normalize(
      [
        artifact.name,
        artifact.alternateNames?.join(" ") ?? "",
        artifact.missionName,
        artifact.programName,
        artifact.destination,
        artifact.hardwareType,
        artifact.shortDescription,
        artifact.overview,
        artifact.scientificPurpose,
        artifact.location.body,
        artifact.location.locationName,
      ].join(" ")
    ),
  })),
  ...missions.map((mission) => ({
    id: `mission:${mission.id}`,
    kind: "mission" as const,
    title: mission.name,
    description: mission.summary,
    href: `/museum/missions/${mission.id}`,
    meta: mission.destinationLabel,
    keywords: normalize(
      [mission.name, mission.program, mission.destinationLabel, mission.summary].join(" ")
    ),
  })),
  ...celestialBodies.map((body) => ({
    id: `body:${body.id}`,
    kind: "body" as const,
    title: body.name,
    description: body.summary,
    href: `/explorer/bodies/${body.id}`,
    meta: body.kind.replace("-", " "),
    keywords: normalize(
      [body.name, body.kind, body.tagline, body.summary, body.facts.map((f) => f.label).join(" ")].join(" ")
    ),
  })),
  ...deepSkyObjects.map((object) => ({
    id: `deep-sky:${object.id}`,
    kind: "deep-sky" as const,
    title: object.name,
    description: object.summary,
    href: `/explorer/deep-sky/${object.id}`,
    meta: `${object.catalogName} · ${object.kindLabel}`,
    keywords: normalize(
      [object.name, object.catalogName, object.kindLabel, object.constellation, object.summary].join(" ")
    ),
  })),
  ...lessons.map((lesson) => ({
    id: `lesson:${lesson.id}`,
    kind: "lesson" as const,
    title: lesson.title,
    description: lesson.summary,
    href: `/academy/lessons/${lesson.id}`,
    meta: `${lesson.ageBand} · ${lesson.minutes} min`,
    keywords: normalize(
      [lesson.title, lesson.summary, lesson.objectives.join(" "), lesson.keyTerms.map((t) => t.term).join(" ")].join(" ")
    ),
  })),
  ...journeys.map((journey) => ({
    id: `journey:${journey.id}`,
    kind: "journey" as const,
    title: journey.title,
    description: journey.promise,
    href: `/academy/journeys/${journey.id}`,
    meta: `${journey.ageBand} · ${journey.minutes} min`,
    keywords: normalize(
      [journey.title, journey.promise, journey.summary, journey.steps.map((s) => s.title).join(" ")].join(" ")
    ),
  })),
  ...articles.map((article) => ({
    id: `article:${article.id}`,
    kind: "article" as const,
    title: article.title,
    description: article.dek,
    href: `/academy/articles/${article.id}`,
    meta: `${article.readingMinutes} min read`,
    keywords: normalize(
      [article.title, article.dek, article.topics.join(" "), article.sections.map((s) => s.heading).join(" ")].join(" ")
    ),
  })),
  ...agencies.map((agency) => ({
    id: `agency:${agency.id}`,
    kind: "agency" as const,
    title: agency.name,
    description: agency.summary,
    href: `/museum/agencies/${agency.id}`,
    meta: agency.shortName,
    keywords: normalize(
      [agency.name, agency.shortName, agency.country, agency.summary, agency.focus.join(" ")].join(" ")
    ),
  })),
  ...glossary.map((entry) => ({
    id: `glossary:${normalize(entry.term)}`,
    kind: "glossary" as const,
    title: entry.term,
    description: entry.definition,
    href: `/academy/glossary#${normalize(entry.term).replace(/[^a-z0-9]+/g, "-")}`,
    meta: "Glossary",
    keywords: normalize([entry.term, entry.definition, entry.category].join(" ")),
  })),
  ...engineeringTopics.map((topic) => ({
    id: `engineering:${topic.id}`,
    kind: "engineering" as const,
    title: topic.title,
    description: topic.summary,
    href: `/engineering/${topic.id}`,
    meta: engineeringSystemLabels[topic.system],
    keywords: normalize(
      [
        topic.title,
        topic.question,
        topic.summary,
        topic.body.join(" "),
        topic.takeaway,
        engineeringSystemLabels[topic.system],
      ].join(" ")
    ),
  })),
  ...storyCollections.map((story) => ({
    id: `story:${story.id}`,
    kind: "story" as const,
    title: story.title,
    description: story.dek,
    href: `/stories/${story.id}`,
    meta: story.eyebrow,
    keywords: normalize(
      [
        story.title,
        story.eyebrow,
        story.dek,
        story.summary,
        story.sections.map((section) => section.heading).join(" "),
      ].join(" ")
    ),
  })),
  ...simulations.map((simulation) => ({
    id: `simulation:${simulation.id}`,
    kind: "simulation" as const,
    title: simulation.title,
    description: simulation.description,
    href: simulation.href,
    meta: `${simulation.number} · educational model`,
    keywords: normalize(
      [
        simulation.title,
        simulation.tagline,
        simulation.description,
        simulation.objectives.join(" "),
        simulation.concepts.join(" "),
      ].join(" ")
    ),
  })),
  ...methodSections.map((section) => ({
    id: `research:${section.id}`,
    kind: "research" as const,
    title: section.heading,
    description: section.paragraphs[0] ?? "Research Archive method",
    href: `/research#${section.id}`,
    meta: "Research Archive",
    keywords: normalize(
      [section.heading, section.paragraphs.join(" "), "method sources limits"].join(" ")
    ),
  })),
];

export const searchDocs = docs;

export const kindLabels: Record<SearchKind, string> = {
  artifact: "Artifact",
  mission: "Mission",
  body: "Destination",
  "deep-sky": "Deep sky",
  lesson: "Lesson",
  journey: "Journey",
  article: "Article",
  agency: "Agency",
  glossary: "Glossary",
  engineering: "Engineering",
  story: "Story",
  simulation: "Simulation",
  research: "Research",
};

export interface SearchResult {
  doc: SearchDoc;
  score: number;
}

export function searchAll(query: string, limit = 60): SearchResult[] {
  const q = normalize(query);
  if (!q) return [];
  const terms = q.split(" ").filter(Boolean);

  return docs
    .map((doc) => {
      const title = normalize(doc.title);
      let score = 0;
      for (const term of terms) {
        let termScore = 0;
        if (title === term) termScore += 140;
        else if (title.startsWith(term)) termScore += 95;
        else if (title.includes(term)) termScore += 65;
        if (doc.meta && normalize(doc.meta).includes(term)) termScore += 25;
        if (doc.keywords.includes(term)) termScore += 12;
        if (termScore === 0) return null;
        score += termScore;
      }
      return { doc, score };
    })
    .filter((result): result is SearchResult => result !== null)
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.doc.title.localeCompare(b.doc.title)
    )
    .slice(0, limit);
}
