import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Layers } from "lucide-react";
import { storyCollections } from "@/data/stories";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Space Stories — read the collection as a narrative",
  description:
    "Curated reading paths through the source-linked artifact collection: first machines on the Moon, Mars rover evolution, interstellar probes, quiet endings and more.",
};

export default function StoriesPage() {
  const locale = getLocale();

  return (
    <div className="pb-16">
      <section className="border-b border-white/10">
        <div className="container-content py-12 sm:py-16">
          <p className="eyebrow flex items-center gap-2">
            <BookOpen aria-hidden="true" className="h-3.5 w-3.5" />
            {t(locale, "sections.stories.eyebrow")}
          </p>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
            {t(locale, "sections.stories.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
            {t(locale, "sections.stories.description")}
          </p>
        </div>
      </section>

      <div className="container-content pt-10">
        <ul className="grid gap-5 lg:grid-cols-2">
          {storyCollections.map((story) => (
            <li key={story.id}>
              <Link
                href={`/stories/${story.id}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-transform hover:-translate-y-0.5 hover:border-white/20"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5"
                  style={{ backgroundColor: story.accent }}
                />
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="text-[10px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: story.accent }}
                  >
                    {story.eyebrow}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-text-muted">
                    <Layers aria-hidden="true" className="h-3 w-3" />
                    {story.sections.length} sections · {story.artifactIds.length} records
                  </span>
                </div>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-text-primary">
                  {story.title}
                </h2>
                <p className="mt-2 text-sm font-medium text-text-secondary">
                  {story.dek}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">
                  {story.summary}
                </p>
                <span
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium"
                  style={{ color: story.accent }}
                >
                  Read the collection
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
