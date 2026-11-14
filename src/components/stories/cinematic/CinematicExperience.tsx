"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { EchoStory } from "@/types/echo";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { pick } from "@/lib/echo/localized";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useEcho } from "@/lib/echo/provider";
import { directStory } from "@/lib/echo/cinematic";
import { EchoStoryScope } from "@/components/stories/EchoStoryScope";
import { EchoCompanion } from "@/components/stories/EchoCompanion";
import { CinematicSceneView } from "./CinematicScenes";
import { SceneConsole } from "./SceneConsole";
import { useSceneNavigation } from "./useSceneNavigation";

function isLockedTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (target.isContentEditable) return true;
  if (target.closest("[data-cine-lock='true']")) return true;
  return Boolean(
    target.closest("a, button, summary, video, [role='button'], [role='link']")
  );
}

export function CinematicExperience({
  story,
  locale,
  related,
  previous,
  next,
}: {
  story: EchoStory;
  locale: Locale;
  related: EchoStory[];
  previous?: EchoStory;
  next?: EchoStory;
}) {
  const scenes = useMemo(() => directStory(story), [story]);
  const reduced = useReducedMotion();
  const {
    activeChapter,
    setActiveChapter,
    completeChapter,
    completedChapters,
    badge,
    awardBadge,
  } = useEcho();
  const seen = useRef(new Set<string>());

  const note = useCallback(
    (index: number) => {
      const scene = scenes[index];
      if (!scene) return;
      seen.current.add(scene.id);
      if (!scene.chapterId) return;
      setActiveChapter(scene.chapterId);
      const group = scenes.filter((entry) => entry.chapterId === scene.chapterId);
      if (group.every((entry) => seen.current.has(entry.id))) {
        completeChapter(scene.chapterId);
      }
    },
    [scenes, setActiveChapter, completeChapter]
  );

  const { active, go, next: goNext, previous: goPrevious, rootRef } = useSceneNavigation(
    scenes,
    { onEnter: note, reduced }
  );

  /* ------------------------------------------------------------- keyboard */
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.altKey || event.metaKey || event.ctrlKey) return;
      if (isLockedTarget(event.target)) return;
      const rtl = document.documentElement.dir === "rtl";
      const forward = rtl ? "ArrowLeft" : "ArrowRight";
      const back = rtl ? "ArrowRight" : "ArrowLeft";
      if (event.key === forward) {
        event.preventDefault();
        goNext();
      } else if (event.key === back) {
        event.preventDefault();
        goPrevious();
      } else if (event.key === "Home") {
        event.preventDefault();
        go(0);
      } else if (event.key === "End") {
        event.preventDefault();
        go(scenes.length - 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, goNext, goPrevious, scenes.length]);

  const tone = scenes[active]?.tone ?? "light";
  const resumeIndex = scenes.findIndex((entry) => entry.chapterId === activeChapter);
  const continueScene = resumeIndex >= 0 ? scenes[resumeIndex] : scenes[1];
  const continuing = resumeIndex >= 0;
  const progress = scenes.length > 1 ? (active / (scenes.length - 1)) * 100 : 0;

  useEffect(() => {
    document.documentElement.dataset.cine = "1";
    document.documentElement.dataset.cineTone = tone;
    return () => {
      delete document.documentElement.dataset.cine;
      delete document.documentElement.dataset.cineTone;
    };
  }, [tone]);

  useEffect(() => {
    if (badge) return;
    if (completedChapters.length < story.chapters.length) return;
    awardBadge(story.badgeKey);
  }, [awardBadge, badge, completedChapters.length, story.badgeKey, story.chapters.length]);

  return (
    <article
      ref={rootRef as React.RefObject<HTMLElement>}
      className="cine"
      data-tone={tone}
      style={{ ["--cine-accent" as string]: story.accent }}
    >
      <EchoStoryScope slug={story.slug} />

      <div className="cine__rail" aria-hidden="true">
        <span className="cine__rail-fill" style={{ width: `${progress}%` }} />
      </div>

      {scenes.map((scene, index) => (
        <CinematicSceneView
          key={scene.id}
          scene={scene}
          story={story}
          locale={locale}
          index={index}
          related={related}
          continueId={continueScene?.id}
          continuing={continuing}
        />
      ))}

      <SceneConsole
        scenes={scenes.map((scene) => ({
          id: scene.id,
          title: scene.title,
          tone: scene.tone,
        }))}
        active={active}
        index={active}
        locale={locale}
        title={pick(locale, story.storyTitle)}
        onJump={go}
        onPrev={goPrevious}
        onNext={goNext}
      />

      <div className="container-content cine__pager">
        <div className="cine__pager-side">
          {previous ? (
            <Link href={`/stories/${previous.slug}`} className="cine__pager-link">
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              <span className="cine__pager-label">
                {locale === "ar" ? "القصة السابقة" : "Previous story"}
              </span>
              <span className="cine__pager-title">{pick(locale, previous.storyTitle)}</span>
            </Link>
          ) : null}
        </div>
        <Link href="/stories" className="cine__pager-link cine__pager-link--center">
          {t(locale, "echo.backToStories")}
        </Link>
        <div className="cine__pager-side cine__pager-side--end">
          {next ? (
            <Link href={`/stories/${next.slug}`} className="cine__pager-link">
              <span className="cine__pager-label">
                {locale === "ar" ? "القصة التالية" : "Next story"}
              </span>
              <span className="cine__pager-title">{pick(locale, next.storyTitle)}</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      </div>

      <EchoCompanion
        locale={locale}
        intro={story.echoIntro}
        fallback={pick(locale, story.echoIntro)}
        signoff={story.echoSignoff}
        chapterIds={story.chapters.map((chapter) => chapter.id)}
      />
    </article>
  );
}
