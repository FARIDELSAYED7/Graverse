import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { EchoStory } from "@/types/echo";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { pick } from "@/lib/echo/localized";

/**
 * Related stories.
 *
 * Each card links to the Museum record of the same machine, so a reader who
 * finishes a story can go and check the hardware, and a reader who starts in
 * the Museum can find the story.
 */
export function RelatedStories({
  stories,
  locale,
}: {
  stories: EchoStory[];
  locale: Locale;
}) {
  if (stories.length === 0) return null;

  return (
    <section aria-labelledby="echo-related-heading">
      <h2
        id="echo-related-heading"
        className="text-sm font-bold uppercase tracking-[0.16em] text-[#5b3fe0]"
      >
        {t(locale, "echo.related")}
      </h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((story) => (
          <li key={story.slug}>
            <Link
              href={`/stories/${story.slug}`}
              className="echo-card group flex h-full flex-col overflow-hidden rounded-2xl transition-transform hover:-translate-y-0.5"
            >
              <img
                src={story.hero.src}
                alt={pick(locale, story.hero.alt)}
                loading="lazy"
                decoding="async"
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#5b3fe0]">
                  {pick(locale, story.title)}
                </p>
                <p className="mt-1 flex-1 text-sm font-semibold leading-snug text-[#1a1338]">
                  {pick(locale, story.storyTitle)}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#5b3fe0]">
                  {t(locale, "echo.readStory")}
                  <ArrowRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                  />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
