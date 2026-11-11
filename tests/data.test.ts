import assert from "node:assert/strict";
import test from "node:test";

import { allArtifacts, getArtifactById } from "@/data/artifacts";
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
import { experienceForPath } from "@/lib/experience";
import { isValidClaim } from "@/lib/provenance";
import { searchAll } from "@/lib/search-index";
import { validateProgress } from "@/lib/progress";
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
