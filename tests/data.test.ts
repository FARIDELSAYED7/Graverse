import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import { allArtifacts, getArtifactById } from "@/data/artifacts";
import { articles } from "@/data/articles";
import { engineeringTopics } from "@/data/engineering";
import { playGames } from "@/data/games";
import { glossary } from "@/data/glossary";
import { journeys } from "@/data/journeys";
import { lessons } from "@/data/lessons";
import { missions } from "@/data/missions";
import { methodSections } from "@/data/research";
import { simulations } from "@/data/simulations";
import { sources } from "@/data/sources";
import { storyCollections } from "@/data/stories";
import { agencies } from "@/data/space/agencies";
import { celestialBodies } from "@/data/space/bodies";
import { deepSkyObjects } from "@/data/space/deep-sky";
import { listRelations } from "@/data/relations";
import { achievementSummary } from "@/lib/achievements";
import { experienceForPath } from "@/lib/experience";
import {
  addRecent,
  createCollection,
  deleteCollection,
  emptyPersonal,
  exportPersonal,
  importPersonal,
  MAX_RECENT,
  recordSimulation,
  toggleCollectionItem,
  toggleFavorite,
  validatePersonal,
} from "@/lib/personal";
import { deriveCommunicationStatus } from "@/lib/mission-control";
import { isValidClaim } from "@/lib/provenance";
import {
  defaultRoverBuild,
  evaluateRoverBuild,
  ROVER_MASS_LIMIT_KG,
  ROVER_POWER_LIMIT_W,
} from "@/lib/rover-builder";
import { searchAll } from "@/lib/search-index";
import { isRtl, LOCALE_COOKIE, localeMeta } from "@/lib/i18n";
import { validateProgress } from "@/lib/progress";
import type { ProgressState } from "@/types/progress";
import {
  ROVER_BASE,
  ROVER_GRID,
  ROVER_ROCKS,
  ROVER_SAMPLES,
  isRock,
  starsForMoves,
} from "@/lib/rover-quest";

const sourceIds = new Set(sources.map((source) => source.id));

test("the collection has the expected size and unique ids", () => {
  assert.equal(allArtifacts.length, 30);
  assert.equal(celestialBodies.length, 20);
  assert.equal(deepSkyObjects.length, 8);
  assert.equal(missions.length, 24);
  assert.equal(lessons.length, 12);
  assert.equal(journeys.length, 4);
  assert.equal(articles.length, 8);
  assert.equal(agencies.length, 8);
  assert.ok(sources.length >= 90);
  assert.ok(glossary.length >= 40);

  const groups: Array<[string, Array<{ id: string }>]> = [
    ["artifacts", allArtifacts],
    ["bodies", celestialBodies],
    ["deep-sky", deepSkyObjects],
    ["missions", missions],
    ["lessons", lessons],
    ["journeys", journeys],
    ["articles", articles],
    ["agencies", agencies],
    ["sources", sources],
  ];
  for (const [label, records] of groups) {
    assert.equal(new Set(records.map((record) => record.id)).size, records.length, label);
  }
});

test("every artifact citation resolves to a registered source", () => {
  for (const artifact of allArtifacts) {
    assert.ok(artifact.sourceIds.length > 0, `${artifact.id} has no sources`);
    for (const id of artifact.sourceIds) {
      assert.ok(sourceIds.has(id), `${artifact.id} cites missing source ${id}`);
    }
  }
});

test("every body and deep-sky citation resolves", () => {
  for (const body of [...celestialBodies, ...deepSkyObjects]) {
    assert.ok(body.sourceIds.length > 0, `${body.id} has no sources`);
    for (const id of body.sourceIds) {
      assert.ok(sourceIds.has(id), `${body.id} cites missing source ${id}`);
    }
    for (const fact of body.facts) {
      if (fact.claim === "confirmed" || fact.claim === "estimated") {
        assert.ok(
          fact.sourceIds && fact.sourceIds.length > 0,
          `${body.id} fact "${fact.label}" is ${fact.claim} without a source`
        );
        for (const id of fact.sourceIds ?? []) {
          assert.ok(sourceIds.has(id), `${body.id} fact cites missing source ${id}`);
        }
      }
    }
  }
});

test("mission records stay derived from artifact records", () => {
  for (const mission of missions) {
    assert.ok(mission.artifactIds.length > 0, `${mission.id} has no artifacts`);
    for (const id of mission.artifactIds) {
      assert.ok(getArtifactById(id), `${mission.id} references missing artifact ${id}`);
    }
    assert.ok(sourceIds.has(mission.sourceIds[0]), `${mission.id} has no valid source`);
    for (const id of mission.sourceIds) {
      assert.ok(sourceIds.has(id), `${mission.id} cites missing source ${id}`);
    }
  }
});

test("the relation graph is symmetric and points at real records", () => {
  const relations = listRelations();
  const inverse: Record<string, string> = {
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
  const index = new Map<string, Set<string>>();
  for (const relation of relations) {
    const set = index.get(relation.from) ?? new Set<string>();
    set.add(`${relation.type}:${relation.to.id}`);
    index.set(relation.from, set);
  }
  for (const relation of relations) {
    assert.ok(
      index
        .get(relation.to.id)
        ?.has(`${inverse[relation.type]}:${relation.from}`),
      `${relation.from} -> ${relation.to.id} (${relation.type}) has no inverse`
    );
  }
  assert.ok(relations.length >= 500);
});

test("claim validation rejects unsupported confirmed values", () => {
  assert.equal(
    isValidClaim({ claim: "confirmed", sourceIds: ["SRC-NASA-AGENCY"] }, sourceIds),
    true
  );
  assert.equal(
    isValidClaim({ claim: "confirmed", sourceIds: [] }, sourceIds),
    false
  );
  assert.equal(
    isValidClaim({ claim: "confirmed", sourceIds: ["SRC-DOES-NOT-EXIST"] }, sourceIds),
    false
  );
  assert.equal(
    isValidClaim({ claim: "simulated", sourceIds: [] }, sourceIds),
    false
  );
  assert.equal(
    isValidClaim(
      { claim: "simulated", sourceIds: [], note: "Computed from published orbit" },
      sourceIds
    ),
    true
  );
  assert.equal(isValidClaim({ claim: "unknown", sourceIds: [] }, sourceIds), true);
});

test("the experience resolver maps preserved and new routes", () => {
  assert.equal(experienceForPath("/academy"), "academy");
  assert.equal(experienceForPath("/academy/lessons/our-neighbor-the-moon"), "academy");
  assert.equal(experienceForPath("/museum/perseverance"), "museum");
  assert.equal(experienceForPath("/explorer/solar-system"), "explorer");
  assert.equal(experienceForPath("/sources"), "home");
});

test("unified search finds records across kinds", () => {
  const apollo = searchAll("apollo");
  assert.ok(apollo.length > 0);
  assert.ok(apollo.some((result) => result.doc.kind === "artifact"));
  assert.ok(apollo.some((result) => result.doc.kind === "mission"));

  const europa = searchAll("europa");
  assert.ok(europa.some((result) => result.doc.kind === "body"));

  const quiz = searchAll("quiz");
  assert.ok(quiz.length > 0);

  assert.deepEqual(searchAll("zzzzzzzz-not-a-real-record"), []);
});

test("playground games link back to verified lessons and records", () => {
  assert.equal(playGames.length, 3);
  const badges = [
    ...journeys.map((journey) => journey.badge.id),
    ...playGames.map((game) => game.badge.id),
  ];
  assert.equal(new Set(badges).size, badges.length, "badge ids must be unique");

  for (const game of playGames) {
    assert.ok(game.sourceIds.length > 0, `${game.id} has no sources`);
    for (const id of game.sourceIds) {
      assert.ok(sourceIds.has(id), `${game.id} cites missing source ${id}`);
    }
    const lesson = lessons.find((entry) => entry.id === game.lessonId);
    assert.ok(lesson, `${game.id} links to a missing lesson ${game.lessonId}`);
    for (const id of game.artifactIds) {
      assert.ok(getArtifactById(id), `${game.id} links to missing artifact ${id}`);
      assert.ok(
        lesson?.artifactIds.includes(id),
        `${game.id} artifact ${id} is not in lesson ${game.lessonId}`
      );
    }
    for (const id of game.bodyIds) {
      assert.ok(
        celestialBodies.some((body) => body.id === id),
        `${game.id} links to missing body ${id}`
      );
      assert.ok(
        lesson?.bodyIds.includes(id),
        `${game.id} body ${id} is not in lesson ${game.lessonId}`
      );
    }
    assert.ok(game.toyNote.length > 20, `${game.id} is missing its toy disclaimer`);
  }
});

test("the rover game map is solvable and the star thresholds are ordered", () => {
  const key = (point: { x: number; z: number }) => `${point.x},${point.z}`;
  assert.equal(isRock(ROVER_BASE), false, "the rover must not start on a rock");

  const blocked = new Set(ROVER_ROCKS.map(key));
  const seen = new Set([key(ROVER_BASE)]);
  const queue = [ROVER_BASE];
  while (queue.length > 0) {
    const point = queue.shift()!;
    for (const [dx, dz] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const next = { x: point.x + dx, z: point.z + dz };
      if (
        next.x < 0 ||
        next.x >= ROVER_GRID ||
        next.z < 0 ||
        next.z >= ROVER_GRID ||
        blocked.has(key(next)) ||
        seen.has(key(next))
      ) {
        continue;
      }
      seen.add(key(next));
      queue.push(next);
    }
  }

  for (const sample of ROVER_SAMPLES) {
    assert.equal(isRock(sample), false, `sample ${sample.id} is inside a rock`);
    assert.ok(seen.has(key(sample)), `sample ${sample.id} is unreachable`);
  }

  assert.equal(starsForMoves(24), 3);
  assert.equal(starsForMoves(25), 2);
  assert.equal(starsForMoves(32), 2);
  assert.equal(starsForMoves(33), 1);
});

test("progress validation accepts game stars and still reads older files", () => {
  const base = {
    version: 1,
    lessons: {},
    journeys: {},
    badges: [],
    updatedAt: "2026-11-10T00:00:00.000Z",
  };

  const legacy = validateProgress(base);
  assert.ok(legacy, "a file without games must still import");
  assert.deepEqual(legacy.games, {});

  const withGames = validateProgress({
    ...base,
    games: {
      rocket: { completedAt: "2026-11-10T00:00:00.000Z", stars: 2 },
      moon: { completedAt: "2026-11-10T00:00:00.000Z", stars: 3 },
    },
  });
  assert.equal(withGames?.games.rocket.stars, 2);
  assert.equal(withGames?.games.moon.stars, 3);

  assert.equal(
    validateProgress({
      ...base,
      games: { rocket: { completedAt: "2026-11-10T00:00:00.000Z", stars: 4 } },
    }),
    null
  );
  assert.equal(
    validateProgress({
      ...base,
      games: { rocket: { completedAt: "not-a-date", stars: 2 } },
    }),
    null
  );
});

test("progress import validation rejects malformed data", () => {
  assert.equal(validateProgress(null), null);
  assert.equal(validateProgress({ version: 2, lessons: {}, journeys: [] }), null);
  assert.equal(
    validateProgress({
      version: 1,
      lessons: { "bad": { completedAt: "not-a-date", score: 1, total: 2 } },
      journeys: {},
      badges: [],
    }),
    null
  );
  assert.equal(
    validateProgress({
      version: 1,
      lessons: { "ok": { completedAt: "2026-11-10T00:00:00.000Z", score: 2, total: 2 } },
      journeys: {
        "first-flight": {
          startedAt: "2026-11-10T00:00:00.000Z",
          completedSteps: ["step-1"],
        },
      },
      badges: ["first-lesson"],
      updatedAt: "2026-11-10T00:00:00.000Z",
    })?.lessons.ok.score,
    2
  );
});

test("new editorial datasets cite only registered sources and artifacts", () => {
  const artifactIds = new Set(allArtifacts.map((artifact) => artifact.id));

  assert.equal(engineeringTopics.length, 7);
  assert.equal(storyCollections.length, 8);
  assert.equal(simulations.length, 8);
  assert.equal(methodSections.length, 7);

  for (const topic of engineeringTopics) {
    assert.ok(topic.sourceIds.length > 0, `${topic.id} has no sources`);
    for (const id of topic.sourceIds) {
      assert.ok(sourceIds.has(id), `${topic.id} cites missing source ${id}`);
    }
    for (const id of topic.artifactIds) {
      assert.ok(artifactIds.has(id), `${topic.id} cites missing artifact ${id}`);
    }
  }

  for (const story of storyCollections) {
    assert.ok(story.sourceIds.length > 0, `${story.id} has no sources`);
    for (const id of story.sourceIds) {
      assert.ok(sourceIds.has(id), `${story.id} cites missing source ${id}`);
    }
    for (const id of story.artifactIds) {
      assert.ok(artifactIds.has(id), `${story.id} cites missing artifact ${id}`);
    }
    for (const section of story.sections) {
      for (const id of section.artifactIds) {
        assert.ok(artifactIds.has(id), `${story.id} section cites missing artifact ${id}`);
      }
    }
  }

  for (const simulation of simulations) {
    assert.ok(simulation.sourceIds.length > 0, `${simulation.id} has no sources`);
    for (const id of simulation.sourceIds) {
      assert.ok(sourceIds.has(id), `${simulation.id} cites missing source ${id}`);
    }
    for (const id of simulation.artifactIds) {
      assert.ok(artifactIds.has(id), `${simulation.id} cites missing artifact ${id}`);
    }
    assert.equal(simulation.href, `/simulations/${simulation.id}`);
    assert.ok(
      simulation.approximation.length > 30,
      `${simulation.id} needs an honest approximation note`
    );
  }
});

test("communication status is derived conservatively and labelled as derived", () => {
  const valid = new Set([
    "communicating",
    "lost-contact",
    "intermittent",
    "not-applicable",
    "unknown",
  ]);

  for (const artifact of allArtifacts) {
    const status = deriveCommunicationStatus(artifact);
    assert.ok(valid.has(status), `${artifact.id} produced ${status}`);
  }

  assert.equal(
    deriveCommunicationStatus(getArtifactById("apollo-11-lrrr")!),
    "not-applicable",
    "passive retroreflectors must not be described as transmitting"
  );
  assert.equal(
    deriveCommunicationStatus(getArtifactById("perseverance")!),
    "communicating"
  );
  assert.equal(
    deriveCommunicationStatus(getArtifactById("apollo-11-lm-descent-stage")!),
    "not-applicable"
  );
});

test("personal state is local, bounded and validates imports", () => {
  let state = emptyPersonal();
  state = toggleFavorite(state, "perseverance");
  assert.deepEqual(state.favorites, ["perseverance"]);
  state = toggleFavorite(state, "perseverance");
  assert.deepEqual(state.favorites, []);

  state = addRecent(state, "a");
  state = addRecent(state, "b");
  state = addRecent(state, "a");
  assert.deepEqual(
    state.recent.map((entry) => entry.id),
    ["a", "b"],
    "recently viewed must be deduplicated and newest first"
  );

  for (let index = 0; index < MAX_RECENT + 4; index += 1) {
    state = addRecent(state, `artifact-${index}`);
  }
  assert.equal(state.recent.length, MAX_RECENT);

  state = createCollection(state, "Moon hardware", ["apollo-11-lrrr"]);
  const collectionId = state.collections[0]!.id;
  assert.equal(state.collections[0]!.name, "Moon hardware");
  state = toggleCollectionItem(state, collectionId, "perseverance");
  assert.deepEqual(state.collections[0]!.artifactIds, [
    "apollo-11-lrrr",
    "perseverance",
  ]);
  state = deleteCollection(state, collectionId);
  assert.equal(state.collections.length, 0);

  state = recordSimulation(state, "landing", 88);
  assert.equal(state.simulations.landing?.score, 88);

  assert.ok(importPersonal(exportPersonal(state)));
  assert.equal(importPersonal("{not json"), null);
  assert.equal(validatePersonal({ version: 2 }), null);
});

test("achievements are derived from progress and personal activity", () => {
  const emptyProgress: ProgressState = {
    version: 1,
    lessons: {},
    journeys: {},
    games: {},
    badges: [],
    updatedAt: "2026-11-11T00:00:00.000Z",
  };

  const empty = achievementSummary({
    progress: emptyProgress,
    personal: emptyPersonal(),
  });
  assert.equal(empty.unlocked, 0);
  assert.equal(empty.statuses.length, 15);

  let personal = emptyPersonal();
  personal = toggleFavorite(personal, "perseverance");
  personal = recordSimulation(personal, "landing");
  personal = recordSimulation(personal, "rover-builder", 72);

  const progress: ProgressState = {
    ...emptyProgress,
    lessons: {
      "what-is-an-artifact": {
        completedAt: "2026-11-11T00:00:00.000Z",
        score: 2,
        total: 2,
      },
    },
  };

  const summary = achievementSummary({ progress, personal });
  const unlocked = new Set(
    summary.statuses.filter((status) => status.unlocked).map((status) => status.id)
  );
  assert.ok(unlocked.has("first-lesson"));
  assert.ok(unlocked.has("first-favorite"));
  assert.ok(unlocked.has("first-simulation"));
  assert.ok(unlocked.has("rover-builder"));
  assert.ok(!unlocked.has("five-lessons"));
});

test("the rover builder reports a bounded, transparent teaching model", () => {
  const result = evaluateRoverBuild(defaultRoverBuild);
  assert.ok(result.score >= 0 && result.score <= 100);
  assert.ok(result.massKg > 0);
  assert.ok(Number.isFinite(result.powerW));
  assert.ok(Array.isArray(result.notes));
  assert.equal(typeof result.valid, "boolean");
  assert.ok(ROVER_MASS_LIMIT_KG > 0);
  assert.ok(ROVER_POWER_LIMIT_W > 0);

  const incomplete = evaluateRoverBuild({
    ...defaultRoverBuild,
    instruments: [],
    communication: "relay-unknown",
  });
  assert.equal(incomplete.valid, false);
  assert.ok(incomplete.notes.length >= 2);
  assert.ok(incomplete.notes.some((note) => note.includes("data")));
});

test("unified search covers engineering, stories, simulations and research", () => {
  assert.ok(
    searchAll("solar panels").some((result) => result.doc.kind === "engineering"),
    "engineering topics must be searchable"
  );
  assert.ok(
    searchAll("first machines").some((result) => result.doc.kind === "story"),
    "story collections must be searchable"
  );
  assert.ok(
    searchAll("landing sequence").some((result) => result.doc.kind === "simulation"),
    "simulations must be searchable"
  );
  assert.ok(
    searchAll("source hierarchy").some((result) => result.doc.kind === "research"),
    "research method sections must be searchable"
  );
});

/* ------------------------------------------------------------------ locale */

interface LocaleDictionaries {
  en: Record<string, string>;
  ar: Record<string, string>;
}

/**
 * Reads the two dictionaries straight out of the i18n module source so the
 * test can compare them without exporting the internals for production use.
 */
function readDictionaries(): LocaleDictionaries {
  const source = readFileSync(
    new URL("../src/lib/i18n.ts", import.meta.url),
    "utf8"
  );
  function keysOf(name: string): Record<string, string> {
    const start = source.indexOf(`const ${name}: Dictionary = {`);
    assert.notEqual(start, -1, `the ${name} dictionary must exist`);
    const end = source.indexOf("\n};", start);
    const body = source.slice(start, end);
    const entries = [...body.matchAll(/"([^"]+)":\s*"((?:[^"\\]|\\.)*)"/g)];
    return Object.fromEntries(
      entries.map((match) => [match[1], match[2].replace(/\\"/g, '"')])
    );
  }
  return { en: keysOf("en"), ar: keysOf("ar") };
}

function collectSourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return collectSourceFiles(path);
    return /\.tsx?$/.test(entry.name) ? [path] : [];
  });
}

test("the interface dictionaries are complete and in step", () => {
  const { en, ar } = readDictionaries();
  const enKeys = Object.keys(en).sort();
  const arKeys = Object.keys(ar).sort();

  assert.deepEqual(
    enKeys,
    arKeys,
    "every English key needs an Arabic key and vice versa"
  );
  assert.ok(enKeys.length > 0, "the interface dictionary must not be empty");

  for (const key of enKeys) {
    assert.ok(en[key].trim().length > 0, `${key} must not be empty in English`);
    assert.ok(ar[key].trim().length > 0, `${key} must not be empty in Arabic`);
  }
});

test("every translation key used in the interface is defined", () => {
  const { en } = readDictionaries();
  const root = fileURLToPath(new URL("../src", import.meta.url));
  const used = new Set<string>();

  for (const file of collectSourceFiles(root)) {
    if (file.endsWith(join("lib", "i18n.ts"))) continue;
    const source = readFileSync(file, "utf8");
    // t(locale, "key") and translate(locale)("key")
    for (const match of source.matchAll(/\bt\(\s*[A-Za-z_$][\w$.]*\s*,\s*"([^"]+)"/g)) {
      used.add(match[1]);
    }
    for (const match of source.matchAll(/\btranslate\(\s*[A-Za-z_$][\w$.]*\s*\)\s*\(\s*"([^"]+)"/g)) {
      used.add(match[1]);
    }
    // Keys referenced as plain strings, such as the navigation config.
    for (const match of source.matchAll(/"([a-z][A-Za-z]*\.[A-Za-z.]+)"/g)) {
      used.add(match[1]);
    }
  }

  const missing = [...used].filter((key) => !(key in en)).sort();
  assert.deepEqual(missing, [], `undefined translation keys: ${missing.join(", ")}`);
  assert.ok(used.size > 0, "the interface must actually use translated strings");
});

test("the locale cookie drives the document direction", () => {
  assert.equal(localeMeta.en.dir, "ltr");
  assert.equal(localeMeta.en.htmlLang, "en");
  assert.equal(localeMeta.ar.dir, "rtl");
  assert.equal(localeMeta.ar.htmlLang, "ar");
  assert.equal(isRtl("en"), false);
  assert.equal(isRtl("ar"), true);
  assert.equal(LOCALE_COOKIE, "graverse-locale");
});
