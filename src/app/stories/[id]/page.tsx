import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EchoStoryPage from "@/components/stories/EchoStoryPage";
import { CollectionExperience } from "@/components/stories/cinematic/CollectionExperience";
import {
  getEchoStories,
  getEchoStory,
} from "@/data/echoes";
import { getStoryCollection, storyCollections } from "@/data/stories";
import { getArtifacts } from "@/data/artifacts";
import { getLocale } from "@/lib/locale";

type PageProps = { params: { id: string } };

/**
 * The story route.
 *
 * Two kinds of record live under `/stories`:
 *
 *   1. ECHOES stories — the immersive, chapter by chapter experience.
 *   2. The original curated reading collections, whose public URLs are
 *      preserved exactly as they were.
 *
 * The dispatcher keeps both working without breaking a single existing link.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...getEchoStories().map((story) => ({ id: story.slug })),
    ...storyCollections.map((story) => ({ id: story.id })),
  ];
}

export function generateMetadata({ params }: PageProps): Metadata {
  const echo = getEchoStory(params.id);
  if (echo) {
    return {
      title: `${echo.title.en} — ${echo.storyTitle.en}`,
      description: echo.summary.en,
      openGraph: {
        title: `${echo.title.en} — ECHOES: Stories Beyond Earth`,
        description: echo.summary.en,
        images: [echo.hero.src],
      },
    };
  }
  const story = getStoryCollection(params.id);
  if (!story) return { title: "Story not found" };
  return { title: story.title, description: story.summary };
}

export default function StoryRoute({ params }: PageProps) {
  const echo = getEchoStory(params.id);
  if (echo) return <EchoStoryPage story={echo} />;

  const story = getStoryCollection(params.id);
  if (!story) notFound();

  const locale = getLocale();
  const index = storyCollections.findIndex((entry) => entry.id === story.id);
  const previous = index > 0 ? storyCollections[index - 1] : undefined;
  const next =
    index >= 0 && index < storyCollections.length - 1
      ? storyCollections[index + 1]
      : undefined;

  return (
    <CollectionExperience
      story={story}
      locale={locale}
      artifacts={getArtifacts(story.artifactIds).map((artifact) => ({
        id: artifact.id,
        name: artifact.name,
      }))}
      previous={previous ? { id: previous.id, title: previous.title } : undefined}
      next={next ? { id: next.id, title: next.title } : undefined}
    />
  );
}
