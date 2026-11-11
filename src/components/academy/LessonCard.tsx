import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { ageBandMeta, type Lesson } from "@/types/academy";

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const band = ageBandMeta[lesson.ageBand];
  return (
    <article className="academy-card group flex h-full flex-col rounded-2xl p-4">
      <div className="flex items-center justify-between gap-2">
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
          style={{ background: `${band.accent}1f`, color: band.accent }}
        >
          {band.label}
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] text-[#5F6B83]">
          <Clock aria-hidden="true" className="h-3 w-3" />
          {lesson.minutes} min
        </span>
      </div>
      <h3 className="mt-2 text-base font-semibold leading-snug text-[#14213B]">
        {lesson.title}
      </h3>
      <p className="mt-1 line-clamp-2 flex-1 text-xs leading-relaxed text-[#46536B]">
        {lesson.summary}
      </p>
      <Link
        href={`/academy/lessons/${lesson.id}`}
        className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#14213B] underline-offset-4 hover:underline"
      >
        Open lesson
        <ArrowRight
          aria-hidden="true"
          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
        />
      </Link>
    </article>
  );
}
