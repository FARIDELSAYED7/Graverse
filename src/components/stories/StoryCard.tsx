import Link from "next/link";
import { ArrowRight, BookOpen, Clock3, MapPin } from "lucide-react";
import type { EchoStorySummary } from "@/types/echo";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { pick } from "@/lib/echo/localized";

/**
 * An editorial story card.
 *
 * The card is a single link, so it is keyboard reachable as one control, and
 * the image carries the story's own NASA caption as its alt text rather than
 * a generic label.
 */
export function StoryCard({
  story,
  locale,
  featured = false,
}: {
  story: EchoStorySummary;
  locale: Locale;
  featured?: boolean;
}) {
  return (
    <li className={featured ? "md:col-span-2" : undefined}>
      <Link
        href={`/stories/${story.slug}`}
        className="echo-card group flex h-full flex-col overflow-hidden rounded-3xl transition-transform duration-300 hover:-translate-y-1 focus-visible:-translate-y-1"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={story.hero.src}
            alt={pick(locale, story.hero.alt)}
            loading="lazy"
            decoding="async"
            width={story.hero.width ?? 1200}
            height={story.hero.height ?? 750}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#150f36]/85 via-[#150f36]/10 to-transparent"
          />
          <div className="absolute end-3 top-3 flex items-center gap-1.5 rounded-full bg-[#150f36]/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-lg backdrop-blur-sm">
            <span
              aria-hidden="true"
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: story.accent }}
            />
            {pick(locale, story.equipmentType)}
          </div>
          <div className="absolute inset-x-0 bottom-0 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/85">
              {pick(locale, story.location)}
            </p>
            <h3
              className={`mt-1 font-semibold leading-tight text-white ${
                featured ? "text-2xl sm:text-3xl" : "text-lg"
              }`}
            >
              {pick(locale, story.storyTitle)}
            </h3>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5b3fe0]">
            <BookOpen aria-hidden="true" className="h-3.5 w-3.5" />
            {pick(locale, story.title)}
          </div>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-[#4a4266]">
            {pick(locale, story.dek)}
          </p>

          <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#6b6484]">
            <li className="flex items-center gap-1.5">
              <Clock3 aria-hidden="true" className="h-3.5 w-3.5" />
              {t(locale, "echo.readingTime").replace(
                "{minutes}",
                String(story.minutes)
              )}
            </li>
            <li className="flex items-center gap-1.5">
              <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
              {story.chapterCount} {t(locale, "echo.chapters")}
            </li>
            {story.discoveryCount > 0 ? (
              <li className="flex items-center gap-1.5">
                {story.discoveryCount} {t(locale, "echo.discoveries")}
              </li>
            ) : null}
          </ul>

          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#5b3fe0]">
            {t(locale, "echo.readStory")}
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
            />
          </span>
        </div>
      </Link>
    </li>
  );
}
