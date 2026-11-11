import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { AcademyArtifactCard } from "@/components/academy/AcademyArtifactCard";
import { SourceList } from "@/components/ui/SourceList";
import { articles, articleMap } from "@/data/articles";
import { getArtifactsByIds } from "@/data/artifacts";
import { getBody } from "@/data/space/bodies";

type PageProps = { params: { id: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ id: article.id }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const article = articleMap.get(params.id);
  if (!article) return { title: "Article not found" };
  return { title: `${article.title} — Academy explainer`, description: article.dek };
}

export default function ArticlePage({ params }: PageProps) {
  const article = articleMap.get(params.id);
  if (!article) notFound();
  const artifacts = getArtifactsByIds(article.relatedArtifactIds);
  const bodies = article.relatedBodyIds.map(getBody).filter((body) => Boolean(body));

  return (
    <div className="pb-16">
      <div className="container-content pt-8">
        <Link
          href="/academy/articles"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14213B] underline-offset-4 hover:underline"
        >
          <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
          All explainers
        </Link>
      </div>
      <article className="container-content mt-5 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div className="max-w-2xl">
          <p className="flex flex-wrap items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9C4321]">
            {article.topics.join(" · ")}
            <span className="inline-flex items-center gap-1 text-[#5F6B83]">
              <Clock aria-hidden="true" className="h-3 w-3" />
              {article.readingMinutes} min read
            </span>
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-[#14213B] sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-3 border-s-4 border-[#9C4321]/50 ps-4 text-lg leading-relaxed text-[#4B5563]">
            {article.dek}
          </p>

          <div className="mt-8 space-y-8">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-semibold text-[#14213B] sm:text-2xl">
                  {section.heading}
                </h2>
                <div className="mt-2 space-y-3">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-relaxed text-[#374151]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <p className="mt-8 rounded-xl border border-[#14213B]/10 bg-white/70 p-4 text-xs leading-relaxed text-[#5A6472]">
            Last verified {article.lastVerified}. This explainer reuses facts from the
            linked artifact and destination records. It does not introduce new
            measurements.
          </p>
        </div>

        <aside className="space-y-6">
          {bodies.length > 0 ? (
            <div className="academy-card rounded-2xl p-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9C4321]">
                Destinations
              </h2>
              <ul className="mt-2 space-y-1.5 text-sm">
                {bodies.map((body) => (
                  <li key={body!.id}>
                    <Link
                      href={`/explorer/bodies/${body!.id}`}
                      className="font-medium text-[#14213B] underline-offset-4 hover:underline"
                    >
                      {body!.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {artifacts.length > 0 ? (
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9C4321]">
                Referenced hardware
              </h2>
              <div className="mt-3 grid gap-3">
                {artifacts.map((artifact) => (
                  <AcademyArtifactCard key={artifact.id} artifact={artifact} />
                ))}
              </div>
            </div>
          ) : null}

          <div className="academy-card rounded-2xl p-5">
            <SourceList ids={article.sourceIds} compact />
          </div>
        </aside>
      </article>
    </div>
  );
}
