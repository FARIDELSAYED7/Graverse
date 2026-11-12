import { allArtifacts } from "@/data/artifacts";
import { articles } from "@/data/articles";
import { deepSkyObjects } from "@/data/space/deep-sky";
import { agencies } from "@/data/space/agencies";
import { celestialBodies } from "@/data/space/bodies";
import { engineeringTopics } from "@/data/engineering";
import { getMission, missions } from "@/data/missions";
import { lessons } from "@/data/lessons";
import { simulations } from "@/data/simulations";
import { storyCollections } from "@/data/stories";
import { normalizeText, tokenize } from "./normalize";
import { ARABIC_ENTITY_ALIASES } from "./arabic-aliases";

/**
 * The entity index for the local answer engine.
 *
 * Every GRAVERSE record that a visitor can ask about gets one entry, with the
 * names and aliases it can be reached by. The index is built once, lazily, on
 * the server, and then reused — the datasets are already in memory, so this
 * costs one pass and no extra I/O.
 */

export type LocalEntityKind =
  | "artifact"
  | "mission"
  | "body"
  | "deep-sky"
  | "agency"
  | "lesson"
  | "story"
  | "engineering"
  | "simulation"
  | "article";

export interface LocalEntity {
  /** `kind:id`, the same key the relation graph uses. */
  key: string;
  kind: LocalEntityKind;
  id: string;
  /** The display name. */
  name: string;
  /** Normalised names the entity can be reached by. */
  aliases: string[];
  /** The token sequence of each alias, ready for phrase matching. */
  aliasTokens: string[][];
  /** The tokens of the record's own name. */
  nameTokens: string[];
  /** Every token of every alias. */
  tokens: Set<string>;
  /** The route that shows the record. */
  href: string;
}

let index: Map<string, LocalEntity> | null = null;
let bySingleToken: Map<string, LocalEntity[]> | null = null;
let byAnyToken: Map<string, LocalEntity[]> | null = null;
let byNameToken: Map<string, LocalEntity[]> | null = null;
let ordered: LocalEntity[] = [];

function add(
  kind: LocalEntityKind,
  id: string,
  name: string,
  href: string,
  extraAliases: string[] = []
) {
  const arabic = ARABIC_ENTITY_ALIASES[id] ?? [];
  const aliases = [name, ...extraAliases, ...arabic]
    .map((alias) => normalizeText(alias))
    .filter((alias) => alias.length > 0);
  const uniqueAliases = [...new Set(aliases)];
  const aliasTokens = uniqueAliases.map((alias) => tokenize(alias));
  const nameTokens = tokenize(name);
  const tokens = new Set<string>();
  for (const sequence of aliasTokens) {
    for (const token of sequence) tokens.add(token);
  }
  const entity: LocalEntity = {
    key: `${kind}:${id}`,
    kind,
    id,
    name,
    aliases: uniqueAliases,
    aliasTokens,
    nameTokens,
    tokens,
    href,
  };
  index!.set(entity.key, entity);
  ordered.push(entity);
}

function build(): void {
  index = new Map();
  ordered = [];

  for (const artifact of allArtifacts) {
    add(
      "artifact",
      artifact.id,
      artifact.name,
      `/museum/${artifact.id}`,
      artifact.alternateNames ?? []
    );
  }
  for (const mission of missions) {
    add("mission", mission.id, mission.name, `/museum/missions/${mission.id}`);
  }
  for (const body of celestialBodies) {
    add("body", body.id, body.name, `/explorer/bodies/${body.id}`);
  }
  for (const object of deepSkyObjects) {
    add(
      "deep-sky",
      object.id,
      object.name,
      `/explorer/deep-sky/${object.id}`
    );
  }
  for (const agency of agencies) {
    add("agency", agency.id, agency.name, `/museum/agencies/${agency.id}`, [
      agency.shortName,
    ]);
  }
  for (const lesson of lessons) {
    add("lesson", lesson.id, lesson.title, `/academy/lessons/${lesson.id}`);
  }
  for (const story of storyCollections) {
    add("story", story.id, story.title, `/stories/${story.id}`);
  }
  for (const topic of engineeringTopics) {
    add("engineering", topic.id, topic.title, `/engineering/${topic.id}`);
  }
  for (const simulation of simulations) {
    add(
      "simulation",
      simulation.id,
      simulation.title,
      `/simulations/${simulation.id}`
    );
  }
  for (const article of articles) {
    add("article", article.id, article.title, `/academy/articles/${article.id}`);
  }

  bySingleToken = new Map();
  byAnyToken = new Map();
  byNameToken = new Map();
  for (const entity of ordered) {
    for (const token of entity.nameTokens) {
      const list = byNameToken.get(token) ?? [];
      list.push(entity);
      byNameToken.set(token, list);
    }
  }
  for (const entity of ordered) {
    for (const sequence of entity.aliasTokens) {
      if (sequence.length === 1) {
        const token = sequence[0];
        if (token) {
          const list = bySingleToken.get(token) ?? [];
          list.push(entity);
          bySingleToken.set(token, list);
        }
      }
      for (const token of sequence) {
        const list = byAnyToken.get(token) ?? [];
        list.push(entity);
        byAnyToken.set(token, list);
      }
    }
  }
}

/** Builds the index on first use and returns it. */
export function localEntityIndex(): Map<string, LocalEntity> {
  if (!index) build();
  return index!;
}

/** Every indexed entity, in a stable order. */
export function localEntities(): LocalEntity[] {
  if (!index) build();
  return ordered;
}

/** Entities reachable through a single-word alias, such as `mars` or `nasa`. */
export function localEntitiesByToken(token: string): LocalEntity[] {
  if (!bySingleToken) build();
  return bySingleToken!.get(token) ?? [];
}

/** Entities that contain a token anywhere in their name or aliases. */
export function localEntitiesByAnyToken(token: string): LocalEntity[] {
  if (!byAnyToken) build();
  return byAnyToken!.get(token) ?? [];
}

/** Entities whose own name contains a token. */
export function localEntitiesByNameToken(token: string): LocalEntity[] {
  if (!byNameToken) build();
  return byNameToken!.get(token) ?? [];
}

/** Looks an entity up by its `kind:id` key. */
export function localEntity(
  kind: LocalEntityKind,
  id: string
): LocalEntity | undefined {
  return localEntityIndex().get(`${kind}:${id}`);
}

/** The mission record for an artifact, when there is one. */
export function missionOfArtifact(artifactId: string) {
  const artifact = allArtifacts.find((entry) => entry.id === artifactId);
  if (!artifact) return undefined;
  return getMission(
    missions.find((mission) => mission.name === artifact.missionName)?.id ?? ""
  );
}
