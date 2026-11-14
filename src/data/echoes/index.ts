import { echoStories } from "./stories";
import { echoMediaManifest } from "./media";
import type { EchoStory } from "@/types/echo";

/**
 * The ECHOES story registry.
 *
 * Stories are ordered with the flagship story first, then by the order they
 * appear in the landing page. `getEchoStory` resolves either the slug or the
 * id so links from other parts of GRAVERSE keep working.
 */

export { echoStories } from "./stories";
export { echoMediaManifest } from "./media";
export { echoStoriesSchema, echoStorySchema } from "./schema";

const storyMap = new Map<string, EchoStory>();
for (const story of echoStories) {
  storyMap.set(story.slug, story);
  storyMap.set(story.id, story);
}

export function getEchoStory(slug: string): EchoStory | undefined {
  return storyMap.get(slug);
}

export function getEchoStories(): EchoStory[] {
  return echoStories;
}

export function getRelatedEchoStories(
  story: EchoStory
): EchoStory[] {
  return story.relatedStorySlugs
    .map((slug) => storyMap.get(slug))
    .filter((entry): entry is EchoStory => Boolean(entry));
}

/** The story the landing page leads with. */
export function getFeaturedEchoStory(): EchoStory {
  return echoStories[0];
}

/**
 * The ECHOES story that tells the story of a museum artifact, if there is one.
 *
 * The Museum uses this to offer a "Discover its story" link on the artifact
 * page, so a visitor can move between the record and the story in either
 * direction.
 */
export function getEchoStoryForArtifact(
  artifactId: string
): EchoStory | undefined {
  return echoStories.find((story) => story.artifactId === artifactId);
}

export const echoTagLabels: Record<
  EchoStory["tags"][number],
  { en: string; ar: string }
> = {
  moon: { en: "The Moon", ar: "القمر" },
  mars: { en: "Mars", ar: "المريخ" },
  "deep-space": { en: "Deep Space", ar: "الفضاء العميق" },
  lander: { en: "Landers", ar: "مركبات الهبوط" },
  rover: { en: "Rovers", ar: "العُربات" },
  instrument: { en: "Scientific Instruments", ar: "أجهزة علمية" },
  remnant: { en: "Mission Remnants", ar: "بقايا المهمات" },
};

export const echoTagOrder: EchoStory["tags"][number][] = [
  "moon",
  "mars",
  "deep-space",
  "lander",
  "rover",
  "instrument",
  "remnant",
];
