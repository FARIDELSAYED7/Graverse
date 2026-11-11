import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LessonCard } from "@/components/academy/LessonCard";
import { lessons } from "@/data/lessons";
import { ageBandMeta, type AgeBand } from "@/types/academy";

export const metadata: Metadata = {
  title: "Lesson library",
  description:
    "Twelve source-linked space lessons for ages 5–12, grouped by reading level and linked to museum artifacts.",
};

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default function LessonsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const requested = first(searchParams.age);
  const active: AgeBand | "all" =
    requested === "5-7" || requested === "8-9" || requested === "10-12"
      ? requested
      : "all";
  const list = active === "all" ? lessons : lessons.filter((lesson) => lesson.ageBand === active);

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
          Lesson library
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#152238] sm:text-4xl">
          Twelve short lessons, three reading levels
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#4B5563] sm:text-base">
          Each lesson has clear objectives, a short explanation, key words, something
          to try and a two-question check. The quiz saves your score locally.
        </p>
      </div>

      <nav aria-label="Filter lessons by age" className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/academy/lessons"
          aria-current={active === "all" ? "page" : undefined}
          className={`inline-flex h-9 items-center rounded-full border px-4 text-xs font-semibold ${
            active === "all"
              ? "border-[#152238] bg-[#152238] text-[#FFF7EA]"
              : "border-[#152238]/15 bg-white/60 text-[#152238] hover:bg-white"
          }`}
        >
          All ages
        </Link>
        {(Object.keys(ageBandMeta) as AgeBand[]).map((band) => (
          <Link
            key={band}
            href={`/academy/lessons?age=${band}`}
            aria-current={active === band ? "page" : undefined}
            className={`inline-flex h-9 items-center rounded-full border px-4 text-xs font-semibold ${
              active === band
                ? "border-[#152238] bg-[#152238] text-[#FFF7EA]"
                : "border-[#152238]/15 bg-white/60 text-[#152238] hover:bg-white"
            }`}
          >
            {ageBandMeta[band].label}
          </Link>
        ))}
      </nav>

      <p role="status" className="mt-4 text-xs text-[#6B7280]">
        Showing {list.length} lesson{list.length === 1 ? "" : "s"}
        {active === "all" ? "" : ` for ${ageBandMeta[active].label}`}.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
}
