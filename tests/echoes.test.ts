import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

import { echoStories } from "@/data/echoes/stories";
import { echoStoriesSchema } from "@/data/echoes/schema";
import { echoMediaManifest } from "@/data/echoes/media";
import { getEchoStory, getRelatedEchoStories } from "@/data/echoes";
import { getSources } from "@/data/sources";
import { getArtifactById } from "@/data/artifacts";
import {
  ECHO_PROGRESS_KEY,
  emptyEchoProgress,
  validateEchoProgress,
} from "@/lib/echo/provider";
import type { EchoStory } from "@/types/echo";

/**
 * The ECHOES content is data-driven, so the guarantees the interface depends
 * on are checked here rather than in the browser.
 */

function collectStrings(value: unknown, path: string, out: string[]): void {
  if (typeof value === "string") {
    out.push(`${path}: ${value}`);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((entry, index) =>
      collectStrings(entry, `${path}[${index}]`, out)
    );
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, entry] of Object.entries(value)) {
      if (key !== "ar") continue;
      collectStrings(entry, `${path}.${key}`, out);
    }
  }
}

test("every ECHOES story passes the runtime schema", () => {
  const result = echoStoriesSchema.safeParse(echoStories);
  assert.ok(
    result.success,
    result.success
      ? ""
      : result.error.issues
          .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
          .join(" | ")
  );
});

test("the story registry resolves by slug and by id", () => {
  for (const story of echoStories) {
    assert.equal(getEchoStory(story.slug)?.slug, story.slug);
    assert.equal(getEchoStory(story.id)?.slug, story.slug);
  }
  assert.equal(getEchoStory("not-a-story"), undefined);
});

test("the flagship story is complete and has a chapter for every narrative beat", () => {
  const flagship = echoStories[0];
  assert.equal(flagship.slug, "opportunity");
  const kinds = flagship.chapters.map((chapter) => chapter.kind);
  for (const kind of [
    "meet",
    "mission",
    "journey",
    "discoveries",
    "ending",
    "legacy",
  ]) {
    assert.ok(kinds.includes(kind as never), `missing the ${kind} chapter`);
  }
  assert.ok(
    flagship.chapters.some((chapter) => (chapter.discoveries?.length ?? 0) >= 3),
    "the flagship story must explain its discoveries"
  );
  assert.ok(flagship.chapters.some((chapter) => (chapter.quiz?.length ?? 0) > 0));
  assert.ok(flagship.chapters.some((chapter) => Boolean(chapter.challenge)));
  assert.ok(flagship.chapters.some((chapter) => (chapter.timeline?.length ?? 0) > 0));
});

test("every story cites sources that exist in the registry", () => {
  for (const story of echoStories) {
    for (const sourceId of story.sourceIds) {
      assert.ok(
        getSources([sourceId]).length > 0,
        `${story.slug} cites unknown source ${sourceId}`
      );
    }
    for (const chapter of story.chapters) {
      for (const event of chapter.timeline ?? []) {
        for (const sourceId of event.sourceIds) {
          assert.ok(
            getSources([sourceId]).length > 0,
            `${story.slug} timeline event ${event.id} cites unknown source ${sourceId}`
          );
        }
      }
      for (const discovery of chapter.discoveries ?? []) {
        for (const sourceId of discovery.sourceIds) {
          assert.ok(
            getSources([sourceId]).length > 0,
            `${story.slug} discovery ${discovery.id} cites unknown source ${sourceId}`
          );
        }
      }
    }
  }
});

test("every story points at a museum artifact that exists", () => {
  for (const story of echoStories) {
    assert.ok(story.artifactId, `${story.slug} must link to a museum record`);
    assert.ok(
      getArtifactById(story.artifactId ?? ""),
      `${story.slug} links to unknown artifact ${story.artifactId}`
    );
  }
});

test("every related story resolves", () => {
  for (const story of echoStories) {
    const related = getRelatedEchoStories(story);
    assert.equal(
      related.length,
      story.relatedStorySlugs.length,
      `${story.slug} has a related story that does not exist`
    );
    for (const entry of related) {
      assert.ok(entry.slug !== story.slug);
    }
  }
});

test("every media asset is served locally and recorded in the manifest", () => {
  for (const story of echoStories) {
    const media = [story.hero, ...story.gallery];
    for (const chapter of story.chapters) {
      media.push(...(chapter.media ?? []));
      for (const discovery of chapter.discoveries ?? []) {
        media.push(...(discovery.media ?? []));
      }
    }
    for (const entry of media) {
      assert.ok(
        entry.src.startsWith("/"),
        `${story.slug} media ${entry.id} is not served locally`
      );
      if (entry.nasaId) {
        const known =
          echoMediaManifest.images[entry.nasaId] ??
          echoMediaManifest.videos[entry.nasaId];
        assert.ok(
          known,
          `${story.slug} media ${entry.id} is not in the local manifest`
        );
        assert.ok(known.sourceUrl.startsWith("https://"));
        assert.match(known.accessedAt, /^\d{4}-\d{2}-\d{2}$/);
      }
    }
  }
});

test("every video asset carries a transcript in both languages", () => {
  for (const story of echoStories) {
    for (const chapter of story.chapters) {
      for (const entry of chapter.media ?? []) {
        if (entry.kind !== "video") continue;
        assert.ok(entry.transcript, `${entry.id} has no transcript`);
        assert.ok(entry.transcript!.en.length > 0, `${entry.id} has no English transcript`);
        assert.ok(entry.transcript!.ar.length > 0, `${entry.id} has no Arabic transcript`);
        assert.equal(
          entry.transcript!.en.length,
          entry.transcript!.ar.length,
          `${entry.id} transcripts do not match`
        );
      }
    }
  }
});

test("every quiz and challenge has a reachable correct answer", () => {
  for (const story of echoStories) {
    for (const chapter of story.chapters) {
      for (const question of chapter.quiz ?? []) {
        const ids = question.options.map((option) => option.id);
        assert.ok(
          ids.includes(question.correctOptionId),
          `${story.slug} quiz ${question.id} has no matching option`
        );
        assert.equal(new Set(ids).size, ids.length);
        assert.ok(question.options.length >= 2);
      }
      if (chapter.challenge) {
        const ids = chapter.challenge.options.map((option) => option.id);
        assert.ok(
          ids.includes(chapter.challenge.correctOptionId),
          `${story.slug} challenge has no matching option`
        );
      }
    }
  }
});

test("every 3D model records a source and a provenance note", () => {
  for (const story of echoStories) {
    if (!story.model) continue;
    assert.ok(story.model.sourceUrl.startsWith("https://"));
    assert.ok(story.model.credit.length > 0);
    assert.ok(story.model.provenance.en.length > 0);
    assert.ok(story.model.provenance.ar.length > 0);
    assert.ok(
      story.model.src || story.model.procedural,
      `${story.slug} model has no geometry`
    );
    const ids = story.model.hotspots.map((hotspot) => hotspot.id);
    assert.equal(new Set(ids).size, ids.length);
    for (const hotspot of story.model.hotspots) {
      assert.equal(hotspot.position.length, 3);
      assert.ok(hotspot.detail.en.length > 0);
      assert.ok(hotspot.detail.ar.length > 0);
    }
  }
});

test("Arabic content contains no stray Latin words", () => {
  const allowed = new Set(["NASA", "GRAVERSE", "Three.js", "MER-B"]);
  for (const story of echoStories) {
    const lines: string[] = [];
    collectStrings(story, story.slug, lines);
    for (const line of lines) {
      for (const word of line.match(/[A-Za-z][A-Za-z0-9.\-]*/g) ?? []) {
        assert.ok(
          allowed.has(word) || /^[0-9]*[A-Z][A-Z0-9]*(-[A-Z0-9]+)*$/.test(word),
          `${story.slug}: Latin "${word}" inside Arabic text — ${line.slice(0, 120)}`
        );
      }
    }
  }
});

/**
 * Machine-translation corruption has spliced CJK text into Arabic strings
 * before (e.g. "كان顶部 العربة"). Nothing else in the toolchain notices, so
 * the content files are scanned directly: no story string should ever contain
 * Chinese, Japanese, or full-width characters.
 */
const CJK_PATTERN =
  /[\u2E80-\u303F\u3040-\u30FF\u31C0-\u33FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF]/;

test("no story content contains CJK contamination", () => {
  const roots = [
    join(process.cwd(), "src", "data", "echoes"),
    join(process.cwd(), "src", "lib", "ask", "local"),
  ];
  for (const root of roots) {
    for (const file of readdirSync(root)) {
      if (!file.endsWith(".ts")) continue;
      const source = readFileSync(join(root, file), "utf8");
      source.split("\n").forEach((line, index) => {
        const match = line.match(CJK_PATTERN);
        assert.equal(
          match,
          null,
          `${file}:${index + 1} contains CJK text "${match?.[0]}" — ${line.trim().slice(0, 120)}`
        );
      });
    }
  }
});

test("the media manifest records NASA identifiers and access dates", () => {
  const images = Object.values(echoMediaManifest.images);
  const videos = Object.values(echoMediaManifest.videos);
  assert.ok(images.length >= 20, "the manifest should hold the curated image set");
  assert.ok(videos.length >= 3, "the manifest should hold the curated video set");
  for (const entry of [...images, ...videos]) {
    assert.ok(entry.nasaId.length > 0);
    assert.match(entry.accessedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(entry.sourceUrl.startsWith("https://images.nasa.gov/details/"));
    assert.ok(entry.local.startsWith("/"));
  }
});

test("the companion progress store validates and rejects broken data", () => {
  const empty = emptyEchoProgress();
  assert.equal(empty.version, 1);
  assert.deepEqual(empty.chapters, {});

  const stored = {
    version: 1,
    chapters: { opportunity: ["meet"] },
    completed: { opportunity: ["meet"] },
    active: { opportunity: "meet" },
    badges: { opportunity: "rover-expert" },
    quiz: {
      "opp-q1": {
        questionId: "opp-q1",
        correct: true,
        answeredAt: "2026-11-13T10:00:00.000Z",
      },
    },
    updatedAt: "2026-11-13T10:00:00.000Z",
  };
  const parsed = validateEchoProgress(stored);
  assert.ok(parsed);
  assert.deepEqual(parsed?.chapters.opportunity, ["meet"]);
  assert.equal(parsed?.badges.opportunity, "rover-expert");
  assert.equal(parsed?.quiz["opp-q1"].correct, true);

  assert.equal(validateEchoProgress(null), null);
  assert.equal(validateEchoProgress({ version: 2 }), null);
  assert.equal(
    validateEchoProgress({ ...stored, quiz: { bad: { correct: "yes" } } })?.quiz
      .bad,
    undefined
  );
  assert.ok(ECHO_PROGRESS_KEY.startsWith("graverse:"));
});

test("the story files keep their bilingual sections side by side", () => {
  for (const story of echoStories) {
    assert.ok(story.title.en && story.title.ar, story.slug);
    assert.ok(story.storyTitle.en && story.storyTitle.ar, story.slug);
    assert.ok(story.summary.en && story.summary.ar, story.slug);
    assert.ok(story.dek.en && story.dek.ar, story.slug);
    assert.ok(story.echoIntro.en && story.echoIntro.ar, story.slug);
    assert.ok(story.legacyStatement.en && story.legacyStatement.ar, story.slug);
    for (const chapter of story.chapters) {
      assert.ok(chapter.echo.en && chapter.echo.ar, `${story.slug}/${chapter.id}`);
      assert.equal(
        chapter.narrative.en.length,
        chapter.narrative.ar.length,
        `${story.slug}/${chapter.id} has unmatched paragraphs`
      );
    }
  }
});

test("the story data file keeps the media manifest in sync with the plan", () => {
  const source = readFileSync(
    join(process.cwd(), "src", "data", "echoes", "media-manifest.json"),
    "utf8"
  );
  const manifest = JSON.parse(source) as { images: Record<string, unknown> };
  const slugs = new Set(
    echoStories.map((story: EchoStory) => story.slug)
  );
  for (const entry of Object.values(manifest.images)) {
    const record = entry as { story: string; local: string };
    assert.ok(
      slugs.has(record.story),
      `the manifest holds media for unknown story ${record.story}`
    );
    assert.ok(record.local.startsWith("/images/echoes/"));
  }
});
