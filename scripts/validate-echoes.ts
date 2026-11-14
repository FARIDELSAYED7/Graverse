#!/usr/bin/env tsx
/**
 * ECHOES content validation.
 *
 * Checks the story data against the runtime schema and then runs the extra
 * checks the schema cannot express:
 *
 *   - every `ar` string is free of stray Latin words (an editor slip);
 *   - no content string contains CJK text (machine-translation corruption);
 *   - every `en`/`ar` pair carries comparable content;
 *   - every media id resolves to an asset in the local manifest;
 *   - every source id resolves to a record in the shared source registry;
 *   - every related story slug resolves;
 *   - every museum artifact id resolves.
 *
 * Run with `npm run validate:echoes`.
 */

import { echoStories } from "@/data/echoes/stories";
import { echoStoriesSchema } from "@/data/echoes/schema";
import { echoMediaManifest } from "@/data/echoes/media";
import { getSources } from "@/data/sources";
import { getArtifactById } from "@/data/artifacts";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import type {
  EchoChapter,
  EchoMedia,
  EchoStory,
  Localized,
  LocalizedList,
} from "@/types/echo";

const problems: string[] = [];

function fail(message: string): void {
  problems.push(message);
}

/** Latin words that are allowed to appear inside Arabic text. */
const ALLOWED_LATIN = new Set([
  "NASA",
  "GRAVERSE",
  "Three.js",
  "MER-B",
  "MESA",
  "GCMS",
  "APXS",
]);

/**
 * Upper-case designations — rocket names, instrument codes, mission numbers —
 * are legitimate inside Arabic text: "3E", "SA-506", "ALSEP".
 */
function isDesignation(word: string): boolean {
  return /^[0-9]*[A-Z][A-Z0-9]*(-[A-Z0-9]+)*$/.test(word) && /[A-Z]/.test(word);
}

/**
 * Chinese, Japanese, and full-width characters have no business in story
 * content. They mark machine-translation corruption, which previously spliced
 * CJK fragments into Arabic strings and passed every other check silently.
 */
const CJK_PATTERN =
  /[\u2E80-\u303F\u3040-\u30FF\u31C0-\u33FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF]/;

function collectAllStrings(value: unknown, path: string, out: string[]): void {
  if (typeof value === "string") {
    out.push(`${path}: ${value}`);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((entry, index) => collectAllStrings(entry, `${path}[${index}]`, out));
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, entry] of Object.entries(value)) {
      collectAllStrings(entry, `${path}.${key}`, out);
    }
  }
}

function checkCjk(story: EchoStory): void {
  const lines: string[] = [];
  collectAllStrings(story, story.slug, lines);
  for (const line of lines) {
    const match = line.match(CJK_PATTERN);
    if (match) {
      fail(`${story.slug}: CJK text "${match[0]}" in content — ${line.slice(0, 120)}`);
    }
  }
}

function collectStrings(value: unknown, path: string, out: string[]): void {
  if (typeof value === "string") {
    out.push(`${path}: ${value}`);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((entry, index) => collectStrings(entry, `${path}[${index}]`, out));
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, entry] of Object.entries(value)) {
      // Only the Arabic side is checked for stray Latin words.
      if (key !== "ar") continue;
      collectStrings(entry, `${path}.${key}`, out);
    }
  }
}

function checkArabic(
  story: EchoStory,
  label: string,
  value: Localized | LocalizedList
): void {
  const lines: string[] = [];
  collectStrings(value, `${story.slug}.${label}`, lines);
  for (const line of lines) {
    const text = line.slice(line.indexOf(": ") + 2);
    for (const word of text.match(/[A-Za-z][A-Za-z0-9.\-]*/g) ?? []) {
      if (!ALLOWED_LATIN.has(word) && !isDesignation(word)) {
        fail(`${story.slug}: Latin text "${word}" in Arabic — ${line.slice(0, 120)}`);
      }
    }
  }
}

function checkBalance(story: EchoStory, label: string, value: Localized | LocalizedList): void {
  if ("en" in value && typeof value.en === "string") {
    const ratio = value.ar.length / Math.max(value.en.length, 1);
    if (ratio < 0.55) {
      fail(`${story.slug}: ${label} Arabic is much shorter than English (ratio ${ratio.toFixed(2)})`);
    }
    return;
  }
  const list = value as LocalizedList;
  if (list.en.length !== list.ar.length) {
    fail(`${story.slug}: ${label} has ${list.en.length} English paragraphs but ${list.ar.length} Arabic`);
  }
}

function checkMedia(story: EchoStory, label: string, media: EchoMedia): void {
  const isLocal = media.src.startsWith("/");
  if (!isLocal) {
    fail(`${story.slug}: ${label} media "${media.id}" is not served locally (${media.src})`);
  }
  if (media.nasaId) {
    const known =
      echoMediaManifest.images[media.nasaId] ??
      echoMediaManifest.videos[media.nasaId];
    if (!known) {
      fail(`${story.slug}: ${label} media "${media.id}" is not in the local media manifest`);
    }
  }
}

function checkChapter(story: EchoStory, chapter: EchoChapter): void {
  checkArabic(story, `chapter.${chapter.id}`, chapter.narrative);
  checkBalance(story, `chapter.${chapter.id}.narrative`, chapter.narrative);
  checkArabic(story, `chapter.${chapter.id}.echo`, chapter.echo);

  for (const media of chapter.media ?? []) checkMedia(story, `chapter.${chapter.id}`, media);
  for (const media of chapter.discoveries ?? []) {
    for (const entry of media.media ?? []) {
      checkMedia(story, `chapter.${chapter.id}.discovery`, entry);
    }
  }

  for (const question of chapter.quiz ?? []) {
    const ids = question.options.map((option) => option.id);
    if (!ids.includes(question.correctOptionId)) {
      fail(`${story.slug}: quiz "${question.id}" has no option "${question.correctOptionId}"`);
    }
    if (new Set(ids).size !== ids.length) {
      fail(`${story.slug}: quiz "${question.id}" has duplicate option ids`);
    }
    checkArabic(story, `chapter.${chapter.id}.quiz.${question.id}`, question.explanation);
  }

  if (chapter.challenge) {
    const ids = chapter.challenge.options.map((option) => option.id);
    if (!ids.includes(chapter.challenge.correctOptionId)) {
      fail(`${story.slug}: challenge "${chapter.challenge.id}" has no matching option`);
    }
    checkArabic(story, `chapter.${chapter.id}.challenge`, chapter.challenge.reality);
  }

  for (const sourceId of chapter.timeline ?? []) {
    void sourceId;
  }
  for (const event of chapter.timeline ?? []) {
    if (event.sourceIds.length === 0) {
      fail(`${story.slug}: timeline event "${event.id}" has no source`);
    }
    for (const sourceId of event.sourceIds) {
      if (getSources([sourceId]).length === 0) {
        fail(`${story.slug}: timeline event "${event.id}" cites unknown source ${sourceId}`);
      }
    }
  }

  for (const discovery of chapter.discoveries ?? []) {
    for (const sourceId of discovery.sourceIds) {
      if (getSources([sourceId]).length === 0) {
        fail(`${story.slug}: discovery "${discovery.id}" cites unknown source ${sourceId}`);
      }
    }
  }
}

const parsed = echoStoriesSchema.safeParse(echoStories);
if (!parsed.success) {
  for (const issue of parsed.error.issues) {
    fail(`schema: ${issue.path.join(".")} — ${issue.message}`);
  }
}

/**
 * Scan the content source files directly so corruption outside the parsed
 * story objects (media lookups, ask records) is caught too.
 */
for (const dir of ["src/data/echoes", "src/lib/ask/local"]) {
  for (const file of readdirSync(dir)) {
    if (!file.endsWith(".ts")) continue;
    readFileSync(join(dir, file), "utf8")
      .split("\n")
      .forEach((line, index) => {
        const match = line.match(CJK_PATTERN);
        if (match) {
          fail(`${dir}/${file}:${index + 1}: CJK text "${match[0]}" — ${line.trim().slice(0, 120)}`);
        }
      });
  }
}

const slugs = new Set(echoStories.map((story) => story.slug));
for (const story of echoStories) {
  checkCjk(story);
  checkArabic(story, "title", story.title);
  checkArabic(story, "storyTitle", story.storyTitle);
  checkArabic(story, "summary", story.summary);
  checkArabic(story, "dek", story.dek);
  checkArabic(story, "echoIntro", story.echoIntro);
  checkArabic(story, "echoSignoff", story.echoSignoff);
  checkArabic(story, "legacyStatement", story.legacyStatement);
  checkBalance(story, "summary", story.summary);
  checkBalance(story, "dek", story.dek);

  checkMedia(story, "hero", story.hero);
  for (const media of story.gallery) checkMedia(story, "gallery", media);

  for (const sourceId of story.sourceIds) {
    if (getSources([sourceId]).length === 0) {
      fail(`${story.slug}: unknown source ${sourceId}`);
    }
  }

  for (const slug of story.relatedStorySlugs) {
    if (!slugs.has(slug)) {
      fail(`${story.slug}: related story "${slug}" does not exist`);
    }
  }

  if (story.artifactId && !getArtifactById(story.artifactId)) {
    fail(`${story.slug}: museum artifact "${story.artifactId}" does not exist`);
  }

  if (story.model && !story.model.src && !story.model.procedural) {
    fail(`${story.slug}: model has neither a glb source nor a procedural renderer`);
  }

  const kinds = new Set(story.chapters.map((chapter) => chapter.kind));
  for (const required of ["meet", "discoveries", "ending"] as const) {
    if (!kinds.has(required)) {
      fail(`${story.slug}: story is missing a "${required}" chapter`);
    }
  }

  for (const chapter of story.chapters) checkChapter(story, chapter);
}

if (problems.length > 0) {
  console.error(`ECHOES validation failed with ${problems.length} problem(s):\n`);
  for (const problem of problems) console.error(`  ✗ ${problem}`);
  process.exit(1);
}

const chapters = echoStories.reduce((total, story) => total + story.chapters.length, 0);
const discoveries = echoStories.reduce(
  (total, story) =>
    total +
    story.chapters.reduce((sum, chapter) => sum + (chapter.discoveries?.length ?? 0), 0),
  0
);
console.log(
  `ECHOES validation passed: ${echoStories.length} stories, ${chapters} chapters, ${discoveries} discoveries.`
);
