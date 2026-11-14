import assert from "node:assert/strict";
import { test } from "node:test";

import { echoStories } from "@/data/echoes/stories";
import { directStory, sceneSignature, storyFamily } from "@/lib/echo/cinematic";

test("every story opens cinematically and closes with a finale", () => {
  for (const story of echoStories) {
    const scenes = directStory(story);
    assert.ok(scenes.length >= 5, `${story.slug} is too short to be a journey`);
    assert.equal(scenes[0]?.layout, "opening", `${story.slug} must open`);
    assert.equal(scenes.at(-1)?.layout, "finale", `${story.slug} must close`);
    const ids = new Set(scenes.map((scene) => scene.id));
    assert.equal(ids.size, scenes.length, `${story.slug} has duplicate scene ids`);
  }
});

test("every chapter is represented so saved progress can still complete", () => {
  for (const story of echoStories) {
    const scenes = directStory(story);
    for (const chapter of story.chapters) {
      assert.ok(
        scenes.some((scene) => scene.chapterId === chapter.id),
        `${story.slug} drops chapter ${chapter.id}`
      );
    }
  }
});

test("scene sequences are not one template", () => {
  const signatures = new Set(echoStories.map((story) => sceneSignature(story)));
  assert.ok(signatures.size >= 8, `only ${signatures.size} distinct sequences`);
  const families = new Set(echoStories.map((story) => storyFamily(story)));
  assert.ok(families.has("rover"));
  assert.ok(families.has("lander"));
  assert.ok(families.has("voyager"));
  assert.ok(families.has("telescope"));
});

test("Sojourner is the reference journey, not a generic article", () => {
  const story = echoStories.find((entry) => entry.slug === "sojourner");
  assert.ok(story);
  const scenes = directStory(story);
  const layouts = scenes.map((scene) => scene.layout);
  assert.ok(layouts.includes("artifact"), "the rover model must be a scene");
  assert.ok(layouts.includes("stages"), "the passage must be a sequence");
  assert.ok(layouts.includes("science"), "discoveries must be their own scenes");
  assert.ok(layouts.includes("signal"), "the last signal must be its own scene");
  assert.ok(scenes.filter((scene) => scene.layout === "science").length >= 2);
  assert.equal(scenes[0]?.title.en, "The Little Rover That Opened the Door");
});

test("a model is never mounted twice in one story", () => {
  for (const story of echoStories) {
    const modeled = directStory(story).filter((scene) => scene.showModel);
    assert.ok(modeled.length <= 1, `${story.slug} mounts more than one model`);
  }
});

test("no sourced chapter narration disappears when discoveries expand", () => {
  for (const story of echoStories) {
    const scenes = directStory(story);
    for (const chapter of story.chapters) {
      const chapterScenes = scenes.filter((scene) => scene.chapterId === chapter.id);
      const presented = chapterScenes.flatMap((scene) =>
        scene.paragraphs.map((paragraph) => paragraph.en)
      );
      for (const paragraph of chapter.narrative.en) {
        assert.ok(
          presented.includes(paragraph),
          `${story.slug}/${chapter.id} loses sourced narration`
        );
      }
    }
  }
});

test("every chapter keeps its knowledge check and archival video", () => {
  for (const story of echoStories) {
    const scenes = directStory(story);
    for (const chapter of story.chapters) {
      const chapterScenes = scenes.filter((scene) => scene.chapterId === chapter.id);
      assert.equal(
        chapterScenes.filter((scene) => scene.showQuiz).length,
        (chapter.quiz?.length ?? 0) > 0 ? 1 : 0,
        `${story.slug}/${chapter.id} quiz visibility changed`
      );
      assert.equal(
        chapterScenes.filter((scene) => scene.showVideo).length,
        (chapter.media ?? []).some((media) => media.kind === "video") ? 1 : 0,
        `${story.slug}/${chapter.id} video visibility changed`
      );
    }
  }
});

test("each timeline and challenge remains attached to its own chapter", () => {
  for (const story of echoStories) {
    const scenes = directStory(story);
    for (const chapter of story.chapters) {
      const chapterScenes = scenes.filter((scene) => scene.chapterId === chapter.id);
      assert.equal(
        chapterScenes.filter((scene) => scene.showTimeline).length,
        (chapter.timeline?.length ?? 0) > 0 ? 1 : 0,
        `${story.slug}/${chapter.id} timeline visibility changed`
      );
      assert.equal(
        chapterScenes.filter((scene) => scene.showChallenge).length,
        chapter.challenge ? 1 : 0,
        `${story.slug}/${chapter.id} challenge visibility changed`
      );
    }
  }
});
