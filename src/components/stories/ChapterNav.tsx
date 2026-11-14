"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { Check } from "lucide-react";
import type { EchoChapter } from "@/types/echo";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { pick } from "@/lib/echo/localized";
import { useEcho } from "@/lib/echo/provider";

/**
 * The chapter navigation — a slim reading rail.
 *
 * Every entry is one line: a status dot (read, current, unread) and the
 * chapter title. The rail tracks the chapter on screen, carries a compact
 * progress count, and turns into a horizontally scrollable strip of chips
 * on phones. The titles here are the only chapter headings repeated in the
 * interface — the chapter titles themselves are shown once, by the chapter.
 */
export function ChapterNav({
  chapters,
  locale,
  accent = "#6d4aff",
}: {
  chapters: EchoChapter[];
  locale: Locale;
  accent?: string;
}) {
  const { visitedChapters, completedChapters, setActiveChapter } = useEcho();
  const [activeId, setActiveId] = useState<string | null>(chapters[0]?.id ?? null);

  useEffect(() => {
    const elements = chapters
      .map((chapter) => document.getElementById(`chapter-${chapter.id}`))
      .filter((element): element is HTMLElement => Boolean(element));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const first = visible[0];
        if (!first) return;
        const id = first.target.id.replace("chapter-", "");
        setActiveId(id);
        setActiveChapter(id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0.01 }
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, [chapters, setActiveChapter]);

  const done = chapters.filter((chapter) =>
    completedChapters.includes(chapter.id)
  ).length;

  const rows = (
    <>
      {chapters.map((chapter, index) => {
        const visited = visitedChapters.includes(chapter.id);
        const isDone = completedChapters.includes(chapter.id);
        const active = activeId === chapter.id;
        return (
          <li key={chapter.id} className="gn-rail-item shrink-0 lg:shrink">
            <a
              href={`#chapter-${chapter.id}`}
              onClick={() => {
                setActiveId(chapter.id);
                setActiveChapter(chapter.id);
              }}
              aria-current={active ? "true" : undefined}
              title={pick(locale, chapter.title)}
              className={`gn-rail-link ${
                active
                  ? "gn-rail-link--active"
                  : isDone
                    ? "gn-rail-link--done"
                    : visited
                      ? "gn-rail-link--visited"
                      : ""
              }`}
            >
              <span
                aria-hidden="true"
                className="gn-rail-dot"
                style={
                  isDone || active ? { backgroundColor: accent } : undefined
                }
              >
                {isDone ? <Check className="h-2.5 w-2.5" /> : index + 1}
              </span>
              <span className="gn-rail-title">
                {pick(locale, chapter.title)}
              </span>
            </a>
          </li>
        );
      })}
    </>
  );

  return (
    <nav aria-label={t(locale, "echo.onThisPage")} className="gn-rail">
      <p className="gn-rail-progress">
        <span
          aria-hidden="true"
          className="gn-rail-bar"
          style={
            {
              "--fill": `${Math.round(
                (done / Math.max(chapters.length, 1)) * 100
              )}%`,
              "--accent": accent,
            } as CSSProperties
          }
        />
        <span className="gn-rail-count">
          {done} / {chapters.length}
        </span>
      </p>
      <ol className="gn-rail-list">{rows}</ol>
    </nav>
  );
}
