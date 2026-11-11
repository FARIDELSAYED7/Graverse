import { allArtifacts } from "@/data/artifacts";
import { articles } from "@/data/articles";
import { journeys } from "@/data/journeys";
import { lessons } from "@/data/lessons";
import { missions, getMissionByName } from "@/data/missions";
import { deepSkyObjects } from "@/data/space/deep-sky";
import { agencies } from "@/data/space/agencies";
import { celestialBodies } from "@/data/space/bodies";

export type EntityKind =
  | "artifact"
  | "mission"
  | "body"
  | "deep-sky"
  | "agency"
  | "lesson"
  | "journey"
  | "article";

export type RelationType =
  | "mission-of"
  | "mission-artifact"
  | "located-on"
  | "artifact-location"
  | "parent-body"
  | "child-body"
  | "operated-by"
  | "agency-mission"
  | "related"
  | "featured-in"
  | "includes"
  | "authored-for";

export interface EntityRef {
  id: string;
  kind: EntityKind;
  name: string;
  href: string;
}

export interface Relation {
  from: string;
  to: EntityRef;
  type: RelationType;
  label: string;
}

const refs = new Map<string, EntityRef>();

function ref(id: string, kind: EntityKind, name: string, href: string): EntityRef {
  return { id, kind, name, href };
}

for (const artifact of allArtifacts) {
  refs.set(
    `artifact:${artifact.id}`,
    ref(`artifact:${artifact.id}`, "artifact", artifact.name, `/museum/${artifact.id}`)
  );
}
for (const mission of missions) {
  refs.set(
    `mission:${mission.id}`,
    ref(`mission:${mission.id}`, "mission", mission.name, `/museum/missions/${mission.id}`)
  );
}
for (const body of celestialBodies) {
  refs.set(
    `body:${body.id}`,
    ref(`body:${body.id}`, "body", body.name, `/explorer/bodies/${body.id}`)
  );
}
for (const object of deepSkyObjects) {
  refs.set(
    `deep-sky:${object.id}`,
    ref(`deep-sky:${object.id}`, "deep-sky", object.name, `/explorer/deep-sky/${object.id}`)
  );
}
for (const agency of agencies) {
  refs.set(
    `agency:${agency.id}`,
    ref(`agency:${agency.id}`, "agency", agency.shortName, `/museum/agencies/${agency.id}`)
  );
}
for (const lesson of lessons) {
  refs.set(
    `lesson:${lesson.id}`,
    ref(`lesson:${lesson.id}`, "lesson", lesson.title, `/academy/lessons/${lesson.id}`)
  );
}
for (const journey of journeys) {
  refs.set(
    `journey:${journey.id}`,
    ref(`journey:${journey.id}`, "journey", journey.title, `/academy/journeys/${journey.id}`)
  );
}
for (const article of articles) {
  refs.set(
    `article:${article.id}`,
    ref(`article:${article.id}`, "article", article.title, `/academy/articles/${article.id}`)
  );
}

const index = new Map<string, Relation[]>();

const inverseType: Record<RelationType, RelationType> = {
  "mission-of": "mission-artifact",
  "mission-artifact": "mission-of",
  "located-on": "artifact-location",
  "artifact-location": "located-on",
  "parent-body": "child-body",
  "child-body": "parent-body",
  "operated-by": "agency-mission",
  "agency-mission": "operated-by",
  related: "related",
  "featured-in": "featured-in",
  includes: "includes",
  "authored-for": "authored-for",
};

function addEdge(
  fromId: string,
  target: EntityRef,
  type: RelationType,
  label: string
) {
  const list = index.get(fromId) ?? [];
  if (!list.some((relation) => relation.to.id === target.id && relation.type === type)) {
    list.push({ from: fromId, to: target, type, label });
    index.set(fromId, list);
  }
}

function link(
  fromId: string,
  toKind: EntityKind,
  toKey: string,
  type: RelationType,
  label: string
) {
  const target = refs.get(`${toKind}:${toKey}`);
  const from = refs.get(fromId);
  if (!target || !from) return;
  addEdge(fromId, target, type, label);
  addEdge(target.id, from, inverseType[type], label);
}

/* Artifact → mission, location, related records. */
for (const artifact of allArtifacts) {
  const from = `artifact:${artifact.id}`;
  const mission = getMissionByName(artifact.missionName);
  if (mission) link(from, "mission", mission.id, "mission-of", "Part of mission");

  if (artifact.destinationGroup === "moon") {
    link(from, "body", "moon", "located-on", "Destination");
  } else if (artifact.destinationGroup === "mars") {
    link(from, "body", "mars", "located-on", "Destination");
  } else if (artifact.id === "new-horizons") {
    link(from, "body", "pluto", "located-on", "Flyby target");
  } else if (artifact.id === "cassini") {
    link(from, "body", "saturn", "located-on", "Orbited");
  }

  for (const relatedId of artifact.relatedIds) {
    link(from, "artifact", relatedId, "related", "Related artifact");
  }
}

/* Mission → agency and artifacts. */
for (const mission of missions) {
  const from = `mission:${mission.id}`;
  link(from, "agency", mission.agencyId, "operated-by", "Operated by");
  for (const artifactId of mission.artifactIds) {
    link(from, "artifact", artifactId, "mission-artifact", "Artifact");
  }
}

/* Body hierarchy. */
for (const body of celestialBodies) {
  if (body.parentId) {
    link(`body:${body.id}`, "body", body.parentId, "parent-body", "Orbits");
  }
}

/* Educational content. */
for (const lesson of lessons) {
  for (const artifactId of lesson.artifactIds) {
    link(`lesson:${lesson.id}`, "artifact", artifactId, "featured-in", "Used in lesson");
  }
  for (const bodyId of lesson.bodyIds) {
    link(`lesson:${lesson.id}`, "body", bodyId, "featured-in", "Used in lesson");
  }
}
for (const article of articles) {
  for (const artifactId of article.relatedArtifactIds) {
    link(`article:${article.id}`, "artifact", artifactId, "featured-in", "Referenced in article");
  }
  for (const bodyId of article.relatedBodyIds) {
    link(`article:${article.id}`, "body", bodyId, "featured-in", "Referenced in article");
  }
}
for (const journey of journeys) {
  for (const step of journey.steps) {
    if (step.kind === "lesson") {
      const id = step.href.split("/academy/lessons/")[1]?.split("#")[0];
      if (id) link(`journey:${journey.id}`, "lesson", id, "includes", "Journey step");
    }
    if (step.kind === "article") {
      const id = step.href.split("/academy/articles/")[1]?.split("#")[0];
      if (id) link(`journey:${journey.id}`, "article", id, "includes", "Journey step");
    }
    if (step.kind === "artifact") {
      const id = step.href.split("/museum/")[1]?.split("?")[0];
      if (id) link(`journey:${journey.id}`, "artifact", id, "includes", "Journey step");
    }
    if (step.kind === "body") {
      const id = step.href.split("/explorer/bodies/")[1];
      if (id) link(`journey:${journey.id}`, "body", id, "includes", "Journey step");
    }
  }
}

export function getRelations(entityId: string): Relation[] {
  return index.get(entityId) ?? [];
}

export function getEntityRef(kind: EntityKind, id: string): EntityRef | undefined {
  return refs.get(`${kind}:${id}`);
}

export function relationCounts() {
  let edges = 0;
  for (const relations of index.values()) edges += relations.length;
  return { entities: refs.size, edges };
}

/** Used by the data validator: every relation must point at a known entity. */
export function listRelations(): Relation[] {
  return [...index.values()].flat();
}
