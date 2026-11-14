import { existsSync } from "node:fs";
import { join } from "node:path";

import { allArtifacts } from "@/data/artifacts";
import { articles } from "@/data/articles";
import { playGames } from "@/data/games";
import { glossary } from "@/data/glossary";
import { journeys } from "@/data/journeys";
import { lessons } from "@/data/lessons";
import { missions } from "@/data/missions";
import { sources } from "@/data/sources";
import { agencies } from "@/data/space/agencies";
import { celestialBodies } from "@/data/space/bodies";
import { deepSkyObjects } from "@/data/space/deep-sky";
import { listRelations } from "@/data/relations";
import {
  agencySchema,
  articleSchema,
  artifactSchema,
  bodySchema,
  deepSkySchema,
  journeySchema,
  lessonSchema,
  missionSchema,
  playGameSchema,
  sourceSchema,
} from "@/lib/schemas";

const errors: string[] = [];
const warnings: string[] = [];

function check(label: string, condition: boolean, message: string) {
  if (!condition) errors.push(`${label}: ${message}`);
}

function uniqueIds(label: string, records: Array<{ id: string }>) {
  const seen = new Set<string>();
  for (const record of records) {
    if (seen.has(record.id)) errors.push(`${label}: duplicate id "${record.id}"`);
    seen.add(record.id);
  }
}

uniqueIds("sources", sources);
uniqueIds("artifacts", allArtifacts);
uniqueIds("bodies", celestialBodies);
uniqueIds("deep-sky", deepSkyObjects);
uniqueIds("lessons", lessons);
uniqueIds("journeys", journeys);
uniqueIds("missions", missions);
uniqueIds("articles", articles);
uniqueIds("agencies", agencies);
uniqueIds("play-games", playGames);

const sourceIds = new Set(sources.map((source) => source.id));

function checkSources(label: string, ids: string[]) {
  for (const id of ids) {
    check(label, sourceIds.has(id), `missing source "${id}"`);
  }
}

sources.forEach((record, index) => {
  const result = sourceSchema.safeParse(record);
  if (!result.success) errors.push(`source[${index}]: ${result.error.message}`);
});

allArtifacts.forEach((artifact) => {
  const label = `artifact:${artifact.id}`;
  const result = artifactSchema.safeParse(artifact);
  if (!result.success) errors.push(`${label}: ${result.error.message}`);
  checkSources(label, artifact.sourceIds);
  artifact.timelineEvents.forEach((event) =>
    checkSources(`${label}.event:${event.id}`, event.sourceIds)
  );
  checkSources(`${label}.primaryMilestone`, artifact.primaryMilestone.sourceIds);
  for (const relatedId of artifact.relatedIds) {
    check(label, allArtifacts.some((a) => a.id === relatedId), `missing related artifact "${relatedId}"`);
  }
  if (artifact.media) {
    const src = artifact.media.src;
    if (src.startsWith("/")) {
      check(label, existsSync(join(process.cwd(), "public", src)), `missing media file ${src}`);
    } else {
      check(label, /^https:\/\//.test(src), `media URL must use https: ${src}`);
    }
  }
  const dates = [
    artifact.launchDate,
    artifact.arrivalDate,
    artifact.missionEndDate,
    artifact.lastContactDate,
    artifact.lastVerified,
  ].filter((value): value is string => Boolean(value));
  for (const date of dates) {
    check(label, !Number.isNaN(Date.parse(date)), `unparseable date "${date}"`);
  }
});

celestialBodies.forEach((body) => {
  const label = `body:${body.id}`;
  const result = bodySchema.safeParse(body);
  if (!result.success) errors.push(`${label}: ${result.error.message}`);
  checkSources(label, body.sourceIds);
  for (const fact of body.facts) {
    if (fact.claim !== "unknown") {
      check(label, (fact.sourceIds ?? []).length > 0, `fact "${fact.label}" has no source`);
      checkSources(`${label}.fact:${fact.label}`, fact.sourceIds ?? []);
    }
  }
  for (const artifactId of body.relatedArtifactIds) {
    check(label, allArtifacts.some((a) => a.id === artifactId), `missing artifact "${artifactId}"`);
  }
  if (body.parentId) {
    check(label, celestialBodies.some((b) => b.id === body.parentId), `missing parent body "${body.parentId}"`);
  }
});

deepSkyObjects.forEach((object) => {
  const label = `deep-sky:${object.id}`;
  const result = deepSkySchema.safeParse(object);
  if (!result.success) errors.push(`${label}: ${result.error.message}`);
  checkSources(label, object.sourceIds);
  for (const fact of object.facts) {
    if (fact.claim !== "unknown") {
      check(label, (fact.sourceIds ?? []).length > 0, `fact "${fact.label}" has no source`);
      checkSources(`${label}.fact:${fact.label}`, fact.sourceIds ?? []);
    }
  }
});

lessons.forEach((lesson) => {
  const label = `lesson:${lesson.id}`;
  const result = lessonSchema.safeParse(lesson);
  if (!result.success) errors.push(`${label}: ${result.error.message}`);
  checkSources(label, lesson.sourceIds);
  for (const artifactId of lesson.artifactIds) {
    check(label, allArtifacts.some((a) => a.id === artifactId), `missing artifact "${artifactId}"`);
  }
  for (const bodyId of lesson.bodyIds) {
    check(label, celestialBodies.some((b) => b.id === bodyId), `missing body "${bodyId}"`);
  }
  lesson.quiz.forEach((question, index) => {
    check(
      `${label}.quiz[${index}]`,
      question.correctIndex < question.options.length,
      "correctIndex is outside the options array"
    );
  });
});

journeys.forEach((journey) => {
  const label = `journey:${journey.id}`;
  const result = journeySchema.safeParse(journey);
  if (!result.success) errors.push(`${label}: ${result.error.message}`);
  checkSources(label, journey.sourceIds);
  for (const step of journey.steps) {
    const [path, hash] = step.href.split("#");
    if (step.kind === "lesson") {
      const id = path.replace("/academy/lessons/", "");
      check(label, lessons.some((lesson) => lesson.id === id), `missing lesson "${id}"`);
      if (hash === "quiz") {
        check(label, lessons.find((lesson) => lesson.id === id)?.quiz.length! > 0, "quiz anchor on a lesson with no quiz");
      }
    }
    if (step.kind === "article") {
      const id = path.replace("/academy/articles/", "");
      check(label, articles.some((article) => article.id === id), `missing article "${id}"`);
    }
    if (step.kind === "artifact") {
      const id = path.replace("/museum/", "").split("?")[0];
      check(label, allArtifacts.some((artifact) => artifact.id === id), `missing artifact "${id}"`);
    }
    if (step.kind === "body") {
      const id = path.replace("/explorer/bodies/", "");
      check(label, celestialBodies.some((body) => body.id === id), `missing body "${id}"`);
    }
  }
});

playGames.forEach((game) => {
  const label = `play-game:${game.id}`;
  const result = playGameSchema.safeParse(game);
  if (!result.success) errors.push(`${label}: ${result.error.message}`);
  checkSources(label, game.sourceIds);
  const lesson = lessons.find((entry) => entry.id === game.lessonId);
  check(label, Boolean(lesson), `missing lesson "${game.lessonId}"`);
  if (lesson) {
    for (const sourceId of game.sourceIds) {
      check(
        label,
        lesson.sourceIds.includes(sourceId),
        `source "${sourceId}" is not cited by lesson "${lesson.id}"`
      );
    }
    for (const artifactId of game.artifactIds) {
      check(
        label,
        lesson.artifactIds.includes(artifactId),
        `artifact "${artifactId}" is not part of lesson "${lesson.id}"`
      );
    }
    for (const bodyId of game.bodyIds) {
      check(
        label,
        lesson.bodyIds.includes(bodyId),
        `body "${bodyId}" is not part of lesson "${lesson.id}"`
      );
    }
  }
  for (const artifactId of game.artifactIds) {
    check(label, allArtifacts.some((a) => a.id === artifactId), `missing artifact "${artifactId}"`);
  }
  for (const bodyId of game.bodyIds) {
    check(label, celestialBodies.some((b) => b.id === bodyId), `missing body "${bodyId}"`);
  }
});

const badgeIds = [...journeys.map((journey) => journey.badge.id), ...playGames.map((game) => game.badge.id)];
check("badges", new Set(badgeIds).size === badgeIds.length, "duplicate badge id across journeys and games");

missions.forEach((mission) => {
  const label = `mission:${mission.id}`;
  const result = missionSchema.safeParse(mission);
  if (!result.success) errors.push(`${label}: ${result.error.message}`);
  checkSources(label, mission.sourceIds);
  for (const artifactId of mission.artifactIds) {
    check(label, allArtifacts.some((a) => a.id === artifactId), `missing artifact "${artifactId}"`);
  }
  check(label, agencies.some((agency) => agency.id === mission.agencyId), `missing agency "${mission.agencyId}"`);
});

articles.forEach((article) => {
  const label = `article:${article.id}`;
  const result = articleSchema.safeParse(article);
  if (!result.success) errors.push(`${label}: ${result.error.message}`);
  checkSources(label, article.sourceIds);
  for (const artifactId of article.relatedArtifactIds) {
    check(label, allArtifacts.some((a) => a.id === artifactId), `missing artifact "${artifactId}"`);
  }
  for (const bodyId of article.relatedBodyIds) {
    check(label, celestialBodies.some((b) => b.id === bodyId), `missing body "${bodyId}"`);
  }
});

agencies.forEach((agency) => {
  const label = `agency:${agency.id}`;
  const result = agencySchema.safeParse(agency);
  if (!result.success) errors.push(`${label}: ${result.error.message}`);
  checkSources(label, agency.sourceIds);
});

const relations = listRelations();
for (const relation of relations) {
  const reverse = relations.some(
    (candidate) =>
      candidate.from === relation.to.id &&
      candidate.to.id === relation.from
  );
  check("relations", reverse, `missing reverse edge for ${relation.from} → ${relation.to.id}`);
  check("relations", !relation.from.startsWith("undefined"), "relation has an undefined source");
}

check("glossary", glossary.length <= 40, "glossary exceeds the approved ceiling of 40 entries");
check("artifacts", allArtifacts.length <= 33, "artifact count exceeds the approved ceiling of 33");
check("lessons", lessons.length <= 12, "lesson count exceeds the approved ceiling of 12");

if (warnings.length > 0) {
  console.warn(warnings.map((warning) => `WARN ${warning}`).join("\n"));
}

if (errors.length > 0) {
  console.error(`Data validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`  ✗ ${error}`);
  process.exitCode = 1;
} else {
  console.log(
    `Data validation passed: ${allArtifacts.length} artifacts, ${celestialBodies.length} bodies, ` +
      `${deepSkyObjects.length} deep-sky objects, ${missions.length} missions, ${lessons.length} lessons, ` +
      `${journeys.length} journeys, ${playGames.length} playground games, ${articles.length} articles, ` +
      `${sources.length} sources, ${relations.length} directed relation edges.`
  );
}
