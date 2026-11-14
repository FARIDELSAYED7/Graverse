import { CinematicExperience } from "@/components/stories/cinematic/CinematicExperience";
import { getEchoStories, getRelatedEchoStories } from "@/data/echoes";
import { getLocale } from "@/lib/locale";
import type { EchoStory } from "@/types/echo";

/**
 * An ECHOES story, presented as a cinematic sequence.
 *
 * The director composes the scenes. This page only resolves neighbours and
 * keeps the public route exactly where it was.
 */
export default function EchoStoryPage({ story }: { story: EchoStory }) {
  const locale = getLocale();
  const stories = getEchoStories();
  const index = stories.findIndex((entry) => entry.slug === story.slug);
  const previous = index > 0 ? stories[index - 1] : undefined;
  const next =
    index >= 0 && index < stories.length - 1 ? stories[index + 1] : undefined;
  const related = getRelatedEchoStories(story).filter(
    (entry) => entry.slug !== previous?.slug && entry.slug !== next?.slug
  );

  return (
    <CinematicExperience
      story={story}
      locale={locale}
      related={related}
      previous={previous}
      next={next}
    />
  );
}
