import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Article } from "@/types/space";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="academy-card group flex h-full flex-col rounded-2xl p-5">
      <p className="flex flex-wrap items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9C4321]">
        {article.topics.slice(0, 2).join(" · ")}
        <span className="inline-flex items-center gap-1 text-[#5F6B83]">
          <Clock aria-hidden="true" className="h-3 w-3" />
          {article.readingMinutes} min
        </span>
      </p>
      <h3 className="mt-2 text-lg font-semibold leading-snug text-[#14213B]">
        {article.title}
      </h3>
      <p className="mt-1 line-clamp-2 flex-1 text-sm leading-relaxed text-[#46536B]">
        {article.dek}
      </p>
      <Link
        href={`/academy/articles/${article.id}`}
        className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#14213B] underline-offset-4 hover:underline"
      >
        Read the explainer
        <ArrowRight
          aria-hidden="true"
          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
        />
      </Link>
    </article>
  );
}
