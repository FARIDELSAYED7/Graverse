"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Landmark } from "lucide-react";
import type { StoryCollection } from "@/data/stories";
import { getArtifacts } from "@/data/artifacts";
import { SourceList } from "@/components/ui/SourceList";
import { AskGraverseButton } from "@/components/ask/AskGraverseButton";
import { AskGraverseScope } from "@/components/ask/AskGraverseScope";
import type { Locale } from "@/lib/i18n";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useSceneNavigation } from "./useSceneNavigation";
import { SceneConsole } from "./SceneConsole";
import type { CinematicScene } from "@/lib/echo/cinematic";

/**
 * Editorial collections are not ECHOES chapters, but they are not an
 * article either. Each section is a slide in the same presentation system,
 * with the same navigation console, the same grid and the same type scale.
 */

interface CollectionFrame {
  src: string;
  alt: string;
  caption: string;
  credit: string;
  nasaId: string;
}

function frameFor(artifactId: string): CollectionFrame | undefined {
  const artifact = getArtifacts([artifactId])[0];
  const media = artifact?.media;
  if (!media) return undefined;
  return {
    src: media.src,
    alt: media.alt,
    caption: media.caption,
    credit: media.credit,
    nasaId: media.nasaId,
  };
}

export function CollectionExperience({
  story,
  locale,
  artifacts,
  previous,
  next,
}: {
  story: StoryCollection;
  locale: Locale;
  artifacts: { id: string; name: string }[];
  previous?: { id: string; title: string };
  next?: { id: string; title: string };
}) {
  const reduced = useReducedMotion();

  const frames = useMemo(() => {
    const map = new Map<string, CollectionFrame>();
    for (const id of story.artifactIds) {
      const frame = frameFor(id);
      if (frame) map.set(id, frame);
    }
    return map;
  }, [story.artifactIds]);

  const scenes = useMemo<CinematicScene[]>(() => {
    const list: CinematicScene[] = [
      {
        id: "opening",
        layout: "opening",
        tone: "dark",
        kicker: { en: story.eyebrow, ar: story.eyebrow },
        title: { en: story.title, ar: story.title },
        lede: { en: story.dek, ar: story.dek },
        paragraphs: [{ en: story.summary, ar: story.summary }],
        mediaId: story.artifactIds[0],
      },
      ...story.sections.map((section, index) => ({
        id: `section-${index}`,
        layout: "editorial" as const,
        tone: "light" as const,
        kicker: { en: String(index + 1).padStart(2, "0"), ar: String(index + 1).padStart(2, "0") },
        title: { en: section.heading, ar: section.heading },
        lede: { en: section.paragraphs[0] ?? "", ar: section.paragraphs[0] ?? "" },
        paragraphs: section.paragraphs.slice(1).map((paragraph) => ({
          en: paragraph,
          ar: paragraph,
        })),
        mediaId: section.artifactIds[0],
        flip: index % 2 === 1,
      })),
      {
        id: "records",
        layout: "finale",
        tone: "light",
        kicker: { en: "Records", ar: "السجلات" },
        title: { en: "Records", ar: "السجلات" },
        lede: { en: "", ar: "" },
        paragraphs: [],
      },
    ];
    return list;
  }, [story]);

  const { active, go, next: goNext, previous: goPrevious, rootRef } = useSceneNavigation(
    scenes,
    { reduced }
  );

  useEffect(() => {
    document.documentElement.dataset.cine = "1";
    return () => {
      delete document.documentElement.dataset.cine;
    };
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.altKey || event.metaKey || event.ctrlKey) return;
      const target = event.target;
      if (target instanceof HTMLElement) {
        const tag = target.tagName;
        if (
          tag === "INPUT" ||
          tag === "TEXTAREA" ||
          tag === "SELECT" ||
          target.isContentEditable ||
          target.closest("a, button, summary, video, [role='button'], [role='link']")
        ) {
          return;
        }
      }
      const rtl = document.documentElement.dir === "rtl";
      const forward = rtl ? "ArrowLeft" : "ArrowRight";
      const back = rtl ? "ArrowRight" : "ArrowLeft";
      if (event.key === forward) {
        event.preventDefault();
        goNext();
      } else if (event.key === back) {
        event.preventDefault();
        goPrevious();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrevious]);

  const tone = scenes[active]?.tone ?? "dark";
  const progress = scenes.length > 1 ? (active / (scenes.length - 1)) * 100 : 0;

  return (
    <article
      ref={rootRef as React.RefObject<HTMLElement>}
      className="cine"
      data-tone={tone}
      style={{ ["--cine-accent" as string]: story.accent }}
    >
      <div className="cine__rail" aria-hidden="true">
        <span className="cine__rail-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* ---------------------------------------------------------- Opening */}
      <header
        id="cine-opening"
        data-scene="opening"
        data-index={0}
        data-tone="dark"
        className="opening"
      >
        {frames.get(story.artifactIds[0]) ? (
          <img
            src={frames.get(story.artifactIds[0])!.src}
            alt={frames.get(story.artifactIds[0])!.alt}
            className="opening__media"
            width={1600}
            height={900}
            loading="eager"
            decoding="async"
          />
        ) : null}
        <div aria-hidden="true" className="opening__scrim" />
        <div className="opening__grain" aria-hidden="true" />
        <div className="container-content opening__inner">
          <div className="opening__content">
            <Link href="/stories" className="opening__back">
              <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
              ECHOES
            </Link>
            <p className="kicker kicker--dark">
              <span className="kicker__num">01</span>
              <span className="kicker__rule" aria-hidden="true" />
              <span className="kicker__label">{story.eyebrow}</span>
            </p>
            <h1 className="opening__title">{story.title}</h1>
            <p className="opening__dek">{story.dek}</p>
            <p className="opening__dek" style={{ fontSize: "1rem", marginTop: "0.6rem" }}>
              {story.summary}
            </p>
            <AskGraverseScope
              context={{
                kind: "story",
                id: story.id,
                title: story.title,
                subtitle: story.eyebrow,
                href: `/stories/${story.id}`,
              }}
            >
              <div className="mt-6">
                <AskGraverseButton locale={locale} />
              </div>
            </AskGraverseScope>
            <a href="#cine-section-0" className="calltoaction">
              {locale === "ar" ? "ابدأ التجربة" : "Start the experience"}
              <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
            </a>
          </div>
        </div>
        <div className="container-content opening__foot">
          <p className="opening__scroll" aria-hidden="true">
            <span className="opening__scroll-line" />
            {locale === "ar" ? "مرّر" : "Scroll"}
          </p>
        </div>
      </header>

      {/* --------------------------------------------------------- Sections */}
      {story.sections.map((section, index) => {
        const frame = section.artifactIds.length
          ? frames.get(section.artifactIds[0])
          : undefined;
        return (
          <section
            key={section.heading}
            id={`cine-section-${index}`}
            data-scene={`section-${index}`}
            data-index={index + 1}
            data-tone="light"
            aria-labelledby={`cine-title-section-${index}`}
            className={`scene scene--editorial ${index % 2 === 1 ? "scene--flip" : ""}`}
          >
            <div className="container-content scene__inner">
              <div className="scene__copy">
                <p className="kicker kicker--light">
                  <span className="kicker__num">{String(index + 1).padStart(2, "0")}</span>
                  <span className="kicker__rule" aria-hidden="true" />
                  <span className="kicker__label">{story.eyebrow}</span>
                </p>
                <h2 id={`cine-title-section-${index}`} className="scene__title">
                  {section.heading}
                </h2>
                <div className="prose">
                  {section.paragraphs.map((paragraph) => (
                    <p className="prose__lead" key={paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.artifactIds.length > 0 ? (
                  <ul className="links">
                    {section.artifactIds.map((id) => (
                      <li key={id}>
                        <Link href={`/museum/${id}`}>
                          <Landmark aria-hidden="true" className="h-3.5 w-3.5" />
                          {artifacts.find((entry) => entry.id === id)?.name ?? id}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              {frame ? (
                <div className="scene__visual">
                  <figure className="plate">
                    <img
                      src={frame.src}
                      alt={frame.alt}
                      width={1600}
                      height={1000}
                      loading="lazy"
                      decoding="async"
                      style={{ width: "100%", height: "auto", borderRadius: "2px" }}
                    />
                    <figcaption className="plate__caption">
                      <span className="plate__kind">Photograph</span>
                      <span className="plate__id">{frame.nasaId}</span>
                      <span className="plate__text">{frame.caption}</span>
                      <a
                        className="plate__credit"
                        href={`https://images.nasa.gov/details/${frame.nasaId}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {frame.credit}
                      </a>
                    </figcaption>
                  </figure>
                </div>
              ) : null}
            </div>
          </section>
        );
      })}

      {/* ---------------------------------------------------------- Records */}
      <section
        id="cine-records"
        data-scene="records"
        data-index={scenes.length - 1}
        data-tone="light"
        aria-labelledby="cine-title-records"
        className="scene scene--finale"
      >
        <div className="container-content scene__inner scene__inner--single">
          <div className="scene__copy">
            <p className="kicker kicker--light">
              <span className="kicker__num">{String(story.sections.length + 1).padStart(2, "0")}</span>
              <span className="kicker__rule" aria-hidden="true" />
              <span className="kicker__label">
                {locale === "ar" ? "السجلات" : "Records"}
              </span>
            </p>
            <h2 id="cine-title-records" className="scene__title">
              {locale === "ar" ? "السجلات" : "Records"}
            </h2>
            <p className="scene__lede">
              {locale === "ar"
                ? "كل قطعة من العتاد المرتبطة بهذه القصة، موثّقة في المتحف."
                : "Every piece of hardware tied to this story, catalogued in the museum."}
            </p>
          </div>
        </div>

        <div className="container-content scene__modules">
          <ul className="recordgrid">
            {artifacts.map((artifact) => {
              const frame = frames.get(artifact.id);
              return (
                <li key={artifact.id}>
                  <Link href={`/museum/${artifact.id}`} className="recordgrid__card">
                    {frame ? (
                      <img
                        src={frame.src}
                        alt={frame.alt}
                        loading="lazy"
                        decoding="async"
                        width={800}
                        height={600}
                      />
                    ) : null}
                    <span className="recordgrid__name">{artifact.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="module mt-8">
            <SourceList ids={story.sourceIds} title="Sources for this story" compact />
          </div>
        </div>
      </section>

      <SceneConsole
        scenes={scenes.map((scene) => ({
          id: scene.id,
          title: scene.title,
          tone: scene.tone,
        }))}
        active={active}
        index={active}
        locale={locale}
        title={story.title}
        onJump={go}
        onPrev={goPrevious}
        onNext={goNext}
      />

      <div className="container-content cine__pager">
        <div className="cine__pager-side">
          {previous ? (
            <Link href={`/stories/${previous.id}`} className="cine__pager-link">
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              <span className="cine__pager-label">
                {locale === "ar" ? "القصة السابقة" : "Previous story"}
              </span>
              <span className="cine__pager-title">{previous.title}</span>
            </Link>
          ) : null}
        </div>
        <Link href="/stories" className="cine__pager-link cine__pager-link--center">
          ECHOES
        </Link>
        <div className="cine__pager-side cine__pager-side--end">
          {next ? (
            <Link href={`/stories/${next.id}`} className="cine__pager-link">
              <span className="cine__pager-label">
                {locale === "ar" ? "القصة التالية" : "Next story"}
              </span>
              <span className="cine__pager-title">{next.title}</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
