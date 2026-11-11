import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ArticleCard } from "@/components/academy/ArticleCard";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Explainers",
  description:
    "Short, source-linked explainers that connect GRAVERSE artifacts, missions and scientific ideas.",
};

export default function ArticlesPage() {
  return (
    <div className="container-content pb-16 pt-10">
      <Link
        href="/academy"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#152238] underline-offset-4 hover:underline"
      >
        <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
        Space Academy
      </Link>
      <div className="mt-4 max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B4532A]">
          Explainers
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#152238] sm:text-4xl">
          The story behind the record
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#4B5563] sm:text-base">
          Eight short reads on hardware fates, mission design, evidence and the
          limits of what a source can tell us.
        </p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
