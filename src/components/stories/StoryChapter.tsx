import Link from "next/link";
import { Bot, FlaskConical, Quote } from "lucide-react";
import type { EchoChapter, EchoDiscovery, EchoStory } from "@/types/echo";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { pick, pickList } from "@/lib/echo/localized";
import { AudioNarration } from "./AudioNarration";
import { DiscoveryChallenge } from "./DiscoveryChallenge";
import { Interactive3DArtifact } from "./Interactive3DArtifact";
import { MediaAttribution } from "./MediaAttribution";
import { MissionFactPanel } from "./MissionFactPanel";
import { MissionLog } from "./MissionLog";
import { MissionTimeline } from "./MissionTimeline";
import { ScientificDiagram } from "./ScientificDiagram";
import { ScienceGlossary } from "./ScienceGlossary";
import { StoryMediaGallery } from "./StoryMediaGallery";
import { StoryQuiz } from "./StoryQuiz";
import { StoryVideoPlayer } from "./StoryVideoPlayer";

/**
 * One chapter of a story.
 *
 * The chapter engine is data-driven: the same component reads a chapter of
 * any shape — a rover, a lander, an instrument package or a deep-space
 * probe — and lays out the modules the chapter actually contains.
 */
export function StoryChapter({
  chapter,
  story,
  locale,
}: {
  chapter: EchoChapter;
  story: EchoStory;
  locale: Locale;
}) {
  const narrative = pickList(locale, chapter.narrative);
  const narrationText =
    chapter.narration
      ? pickList(locale, chapter.narration).join("\n")
      : narrative.join("\n");
  const video = chapter.media?.find((entry) => entry.kind === "video");
  const photos = chapter.media?.filter((entry) => entry.kind !== "video") ?? [];
  const galleryMedia = story.gallery;

  return (
    <section
      id={`chapter-${chapter.id}`}
      aria-labelledby={`chapter-${chapter.id}-title`}
      className="echo-scroll-shell scroll-mt-28 border-t border-[#1a1338]/10 pt-10"
    >
      <header>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#5b3fe0]">
          {pick(locale, chapter.eyebrow)}
        </p>
        <h2
          id={`chapter-${chapter.id}-title`}
          className="mt-2 text-balance text-2xl font-semibold leading-tight tracking-tight text-[#1a1338] sm:text-3xl"
        >
          {pick(locale, chapter.title)}
        </h2>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-[#4a4266]">
          {pick(locale, chapter.summary)}
        </p>
      </header>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-8">
          <div className="space-y-4">
            {narrative.map((paragraph, index) => (
              <p
                key={index}
                className="text-[17px] leading-[1.85] text-[#2a2247]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <blockquote className="relative rounded-3xl border-s-4 bg-white p-5 shadow-[0_16px_40px_-32px_rgba(26,19,56,0.5)] sm:p-6">
            <span
              aria-hidden="true"
              className="absolute end-5 top-5 text-[#6d4aff]/15"
            >
              <Quote className="h-8 w-8" />
            </span>
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#5b3fe0]">
              <Bot aria-hidden="true" className="h-3.5 w-3.5" />
              ECHO
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-[#1a1338]">
              {pick(locale, chapter.echo)}
            </p>
          </blockquote>

          {chapter.discoveries?.length ? (
            <div className="space-y-6">
              {chapter.discoveries.map((discovery, index) => (
                <DiscoveryPanel
                  key={discovery.id}
                  discovery={discovery}
                  index={index}
                  locale={locale}
                  accent={story.accent}
                />
              ))}
            </div>
          ) : null}

          {chapter.timeline?.length ? (
            <div className="grid gap-5 lg:grid-cols-2">
              <MissionTimeline
                events={chapter.timeline}
                locale={locale}
                accent={story.accent}
              />
              <MissionLog events={chapter.timeline} locale={locale} />
            </div>
          ) : null}

          {chapter.diagram ? (
            <ScientificDiagram
              diagram={chapter.diagram}
              locale={locale}
              accent={story.accent}
            />
          ) : null}

          {chapter.kind === "meet" && story.model ? (
            <Interactive3DArtifact
              model={story.model}
              locale={locale}
              accent={story.accent}
            />
          ) : null}

          {chapter.challenge ? (
            <DiscoveryChallenge challenge={chapter.challenge} locale={locale} />
          ) : null}

          {chapter.quiz?.length ? (
            <StoryQuiz questions={chapter.quiz} locale={locale} />
          ) : null}

          {chapter.glossary?.length ? (
            <ScienceGlossary terms={chapter.glossary} locale={locale} />
          ) : null}

          {video ? <StoryVideoPlayer media={video} locale={locale} /> : null}

          {photos.length ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {photos.map((entry) => (
                <figure
                  key={entry.id}
                  className="echo-card overflow-hidden rounded-3xl"
                >
                  <img
                    src={entry.src}
                    alt={pick(locale, entry.alt)}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <figcaption className="p-4">
                    <p className="text-sm leading-relaxed text-[#4a4266]">
                      {pick(locale, entry.caption)}
                    </p>
                    <div className="mt-3">
                      <MediaAttribution media={entry} locale={locale} compact />
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : null}

          {chapter.kind === "meet" && galleryMedia.length ? (
            <StoryMediaGallery media={galleryMedia} locale={locale} />
          ) : null}

          <AudioNarration text={narrationText} locale={locale} />
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          {chapter.facts?.length ? (
            <MissionFactPanel
              facts={chapter.facts}
              locale={locale}
              accent={story.accent}
              note={t(locale, "echo.missionFactsNote")}
            />
          ) : null}

          {story.artifactId ? (
            <div className="echo-card rounded-3xl p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#5b3fe0]">
                {t(locale, "echo.collection")}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#4a4266]">
                {t(locale, "echo.sourceNote")}
              </p>
              <Link
                href={`/museum/${story.artifactId}`}
                className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#5b3fe0] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#4a30c4]"
              >
                {t(locale, "echo.museumLink")}
              </Link>
            </div>
          ) : null}
        </aside>
      </div>
    </section>
  );
}

/**
 * A discovery, written as the investigation it was.
 */
function DiscoveryPanel({
  discovery,
  index,
  locale,
  accent,
}: {
  discovery: EchoDiscovery;
  index: number;
  locale: Locale;
  accent: string;
}) {
  const steps = [
    { label: discovery.question, body: discovery.instrument },
    { label: discovery.method, body: discovery.data },
    { label: discovery.finding, body: discovery.significance },
  ];

  return (
    <article className="echo-card overflow-hidden rounded-3xl">
      <header
        className="px-5 py-4 sm:px-6"
        style={{ backgroundColor: `${accent}14` }}
      >
        <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#5b3fe0]">
          <FlaskConical aria-hidden="true" className="h-3.5 w-3.5" />
          {t(locale, "echo.discoveries")} {index + 1}
        </p>
        <h3 className="mt-1 text-xl font-semibold leading-snug text-[#1a1338]">
          {pick(locale, discovery.title)}
        </h3>
      </header>

      <div className="space-y-4 p-5 sm:p-6">
        {steps.map((step, stepIndex) => (
          <div key={stepIndex} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
              style={{ backgroundColor: accent }}
            >
              {stepIndex + 1}
            </span>
            <div>
              <p className="text-[15px] font-semibold leading-relaxed text-[#1a1338]">
                {pick(locale, step.label)}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[#4a4266]">
                {pick(locale, step.body)}
              </p>
            </div>
          </div>
        ))}

        {discovery.media?.length ? (
          <figure className="overflow-hidden rounded-2xl border border-[#1a1338]/10">
            <img
              src={discovery.media[0].src}
              alt={pick(locale, discovery.media[0].alt)}
              loading="lazy"
              decoding="async"
              className="aspect-[16/9] w-full object-cover"
            />
            <figcaption className="bg-white p-3">
              <p className="text-xs leading-relaxed text-[#4a4266]">
                {pick(locale, discovery.media[0].caption)}
              </p>
              <p className="mt-1.5 text-[11px] text-[#6b6484]">
                {discovery.media[0].credit}
              </p>
            </figcaption>
          </figure>
        ) : null}
      </div>
    </article>
  );
}
