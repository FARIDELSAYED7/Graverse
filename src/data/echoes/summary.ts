import type { EchoStory, EchoStorySummary } from "@/types/echo";

/** The launch year, used for the "oldest first" and "newest first" ordering. */
function launchYearOf(story: EchoStory): number {
  const match = story.missionPeriod.en.match(/\b(19|20)\d{2}\b/);
  return match ? Number(match[0]) : 0;
}

/** A rough reading time, derived from the amount of written content. */
export function readingMinutesOf(story: EchoStory): number {
  const words = story.chapters.reduce((total, chapter) => {
    const chapterWords = chapter.narrative.en
      .join(" ")
      .split(/\s+/)
      .filter(Boolean).length;
    const discoveryWords = chapter.discoveries
      ? chapter.discoveries
          .map(
            (discovery) =>
              `${discovery.method.en} ${discovery.data.en} ${discovery.finding.en} ${discovery.significance.en}`
          )
          .join(" ")
          .split(/\s+/)
          .filter(Boolean).length
      : 0;
    return total + chapterWords + discoveryWords;
  }, 0);
  return Math.max(4, Math.round(words / 220));
}

/**
 * The slim record the landing page hands to the client-side filter.
 *
 * The full story stays on the server; only what a card needs crosses the
 * boundary, so the filter does not ship every chapter of every story.
 */
export function toStorySummary(story: EchoStory): EchoStorySummary {
  return {
    slug: story.slug,
    title: story.title,
    storyTitle: story.storyTitle,
    dek: story.dek,
    location: story.location,
    equipmentType: story.equipmentType,
    hero: story.hero,
    accent: story.accent,
    chapterCount: story.chapters.length,
    discoveryCount: story.chapters.reduce(
      (total, chapter) => total + (chapter.discoveries?.length ?? 0),
      0
    ),
    minutes: readingMinutesOf(story),
    tags: story.tags,
    launchYear: launchYearOf(story),
  };
}
