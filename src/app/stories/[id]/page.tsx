import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { ArtifactCard } from "@/components/artifacts/ArtifactCard";
import { SourceList } from "@/components/ui/SourceList";
import { getStoryCollection, storyCollections } from "@/data/stories";
import { getArtifacts } from "@/data/artifacts";

type PageProps = { params: { id: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return storyCollections.map((story) => ({ id: story.id }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const story = getStoryCollection(params.id);
  if (!story) return { title: "Story not found" };
  return { title: story.title, description: story.summary };
}

export default function StoryPage({ params }: PageProps) {
  const story = getStoryCollection(params.id);
  if (!story) notFound();

  const index = storyCollections.findIndex((entry) => entry.id === story.id);
  const previous = index > 0 ? storyCollections[index - 1] : undefined;
  const next =
    index >= 0 && index < storyCollections.length - 1
      ? storyCollections[index + 1]
      : undefined;

  return (
    <article className="pb-16">
      <div
        aria-hidden="true"
        className="h-1 w-full"
        style={{ backgroundColor: story.accent }}
      />
      <div className="container-content pt-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-text-muted">
            <li>
              <Link href="/stories" className="-my-1.5 inline-flex items-center py-1.5 hover:text-white">
                Space Stories
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-text-secondary">{story.title}</li>
          </ol>
        </nav>

        <div className="mt-6 max-w-3xl">
          <p
            className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: story.accent }}
          >
            <BookOpen aria-hidden="true" className="h-3.5 w-3.5" />
            {story.eyebrow}
          </p>
          <h1 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-text-primary sm:text-5xl">
            {story.title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-text-secondary">
            {story.dek}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            {story.summary}
          </p>
        </div>
      </div>

      <div className="container-content mt-10 max-w-3xl space-y-10">
        {story.sections.map((section, sectionIndex) => {
          const artifacts = getArtifacts(section.artifactIds);
          return (
            <section key={section.heading} aria-labelledby={`section-${sectionIndex}`}>
              <div className="flex items-baseline gap-3">
                <span
                  className="font-mono text-xs tabular-nums"
                  style={{ color: story.accent }}
                >
                  {String(sectionIndex + 1).padStart(2, "0")}
                </span>
                <h2
                  id={`section-${sectionIndex}`}
                  className="text-xl font-semibold tracking-tight text-text-primary sm:text-2xl"
                >
                  {section.heading}
                </h2>
              </div>
              <div className="mt-3 space-y-3 border-s border-white/10 ps-6">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-[15px] leading-7 text-text-secondary">
                    {paragraph}
                  </p>
                ))}
                {artifacts.length > 0 ? (
                  <ul className="flex flex-wrap gap-2 pt-1">
                    {artifacts.map((artifact) => (
                      <li key={artifact.id}>
                        <Link
                          href={`/museum/${artifact.id}`}
                          className="inline-flex items-center gap-1 rounded-full border border-white/12 bg-white/[0.03] px-3 py-1 text-xs text-text-secondary transition-colors hover:border-accent/40 hover:text-white"
                        >
                          {artifact.name}
                          <ArrowRight aria-hidden="true" className="h-3 w-3" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>
          );
        })}
      </div>

      <div className="container-content mt-12">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-text-secondary">
          Records in this story
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {getArtifacts(story.artifactIds).map((artifact) => (
            <ArtifactCard key={artifact.id} artifact={artifact} />
          ))}
        </div>
      </div>

      <div className="container-content mt-10 max-w-3xl">
        <SourceList ids={story.sourceIds} title="Sources for this story" compact />
      </div>

      <div className="container-content mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6">
        {previous ? (
          <Link
            href={`/stories/${previous.id}`}
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-white"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/stories/${next.id}`}
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-white"
          >
            {next.title}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
