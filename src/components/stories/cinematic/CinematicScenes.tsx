import Link from "next/link";
import { ArrowLeft, ArrowRight, Landmark, MapPin, Radio } from "lucide-react";
import type { EchoMedia, EchoStory, Localized } from "@/types/echo";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { pick } from "@/lib/echo/localized";
import type { CinematicScene } from "@/lib/echo/cinematic";
import { storyMediaIndex } from "@/lib/echo/cinematic";
import { DiscoveryBadges } from "@/components/stories/DiscoveryBadges";
import { DiscoveryChallenge } from "@/components/stories/DiscoveryChallenge";
import { Interactive3DArtifact } from "@/components/stories/Interactive3DArtifact";
import { MissionTimeline } from "@/components/stories/MissionTimeline";
import { RelatedStories } from "@/components/stories/RelatedStories";
import { ScienceGlossary } from "@/components/stories/ScienceGlossary";
import { ScientificDiagram } from "@/components/stories/ScientificDiagram";
import { SourcesAndCredits } from "@/components/stories/SourcesAndCredits";
import { StoryQuiz } from "@/components/stories/StoryQuiz";
import { StoryVideoPlayer } from "@/components/stories/StoryVideoPlayer";
import { Plate } from "./Plate";
import { Frame } from "./SceneFrame";

/**
 * Scene composition.
 *
 * Each layout is a different way of presenting the same authored material:
 * a full-bleed photographic slide, an editorial spread, a technical
 * illustration page, a measurement sheet, a contact sheet. Nothing here
 * writes or reorders a single line of the story.
 */

function findMedia(story: EchoStory, id?: string): EchoMedia | undefined {
  if (!id) return undefined;
  return storyMediaIndex(story).get(id);
}

function Kicker({
  label,
  index,
  tone,
  eyebrow,
  locale,
}: {
  label: string;
  index: number;
  tone: "dark" | "light";
  eyebrow?: Localized;
  locale: Locale;
}) {
  const text = eyebrow ? `${label} · ${pick(locale, eyebrow)}` : label;

  return (
    <p className={`kicker kicker--${tone}`}>
      <span className="kicker__num">{String(index + 1).padStart(2, "0")}</span>
      <span className="kicker__rule" aria-hidden="true" />
      <span className="kicker__label">{text}</span>
    </p>
  );
}

function FactStrip({
  facts,
  locale,
  tone = "light",
  variant = "band",
}: {
  facts: { label: Localized; value: Localized }[];
  locale: Locale;
  tone?: "dark" | "light";
  variant?: "band" | "panel";
}) {
  if (facts.length === 0) return null;
  return (
    <dl
      className={`factstrip factstrip--${tone} factstrip--${variant}`}
      /* The strip is ruled by its own cells: one column per fact, so a
         two-fact band never leaves an empty third cell behind. */
      style={{ ["--fact-columns" as string]: facts.length }}
    >
      {facts.map((fact) => (
        <div className="factstrip__item" key={pick(locale, fact.label)}>
          <dt>{pick(locale, fact.label)}</dt>
          <dd>{pick(locale, fact.value)}</dd>
        </div>
      ))}
    </dl>
  );
}

function Prose({
  paragraphs,
  locale,
  label,
}: {
  paragraphs: Localized[];
  locale: Locale;
  label: string;
}) {
  if (paragraphs.length === 0) return null;
  const [first, ...rest] = paragraphs;
  return (
    <div className="prose">
      <p className="prose__lead">{pick(locale, first)}</p>
      {rest.length > 0 ? (
        <div className="prose__record">
          <p className="prose__record-label">{label}</p>
          {rest.map((paragraph) => (
            <p key={pick(locale, paragraph)}>{pick(locale, paragraph)}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/** The small, scene-level evidence: the sourced facts and the measurement sheet. */
function SceneEvidence({
  scene,
  story,
  locale,
}: {
  scene: CinematicScene;
  story: EchoStory;
  locale: Locale;
}) {
  const chapter = story.chapters.find((entry) => entry.id === scene.chapterId);
  const discovery = chapter?.discoveries?.find((entry) => entry.id === scene.discoveryId);
  // The headline figures already sit on the opening slide, so a chapter
  // never repeats them here.
  const headline = new Set(story.facts.map((fact) => pick(locale, fact.label)));
  const facts = (chapter?.facts ?? []).filter(
    (fact) => !headline.has(pick(locale, fact.label))
  );

  return (
    <>
      {discovery ? (
        <div className="sheet">
          <p className="sheet__label">
            {locale === "ar" ? "الجهاز" : "Instrument"}
          </p>
          <p className="sheet__value">{pick(locale, discovery.instrument)}</p>
          <div className="sheet__rows">
            <div>
              <p className="sheet__label">
                {locale === "ar" ? "كيف قِيس" : "How it was measured"}
              </p>
              <p className="sheet__text">{pick(locale, discovery.method)}</p>
            </div>
            <div>
              <p className="sheet__label">
                {locale === "ar" ? "البيانات" : "The data"}
              </p>
              <p className="sheet__text">{pick(locale, discovery.data)}</p>
            </div>
            <div>
              <p className="sheet__label">
                {locale === "ar" ? "لماذا يهم" : "Why it mattered"}
              </p>
              <p className="sheet__text">{pick(locale, discovery.significance)}</p>
            </div>
          </div>
        </div>
      ) : null}
      {scene.showFacts && facts.length > 0 ? (
        <FactStrip facts={facts.slice(0, 4)} locale={locale} tone={scene.tone} />
      ) : null}
    </>
  );
}

/** The heavy, interactive modules: the model, the diagram, the timeline, the quiz. */
function SceneModules({
  scene,
  story,
  locale,
}: {
  scene: CinematicScene;
  story: EchoStory;
  locale: Locale;
}) {
  const chapter = story.chapters.find((entry) => entry.id === scene.chapterId);
  const video = chapter?.media?.find((entry) => entry.kind === "video");
  const glossary = story.chapters.flatMap((entry) => entry.glossary ?? []);

  return (
    <>
      {scene.showModel && story.model ? (
        <div className="module" data-cine-lock="true">
          <Interactive3DArtifact
            model={story.model}
            locale={locale}
            accent={story.accent}
            fallbackDiagram={chapter?.diagram}
          />
        </div>
      ) : null}

      {scene.showDiagram && chapter?.diagram && !scene.showModel ? (
        <div className="module" data-cine-lock="true">
          <ScientificDiagram diagram={chapter.diagram} locale={locale} accent={story.accent} />
        </div>
      ) : null}

      {scene.showTimeline && chapter?.timeline ? (
        <div className="module" data-cine-lock="true">
          <MissionTimeline events={chapter.timeline} locale={locale} accent={story.accent} />
        </div>
      ) : null}

      {scene.showVideo && video ? (
        <div className="module" data-cine-lock="true">
          <StoryVideoPlayer media={video} locale={locale} />
        </div>
      ) : null}

      {scene.showChallenge && chapter?.challenge ? (
        <div className="module" data-cine-lock="true">
          <DiscoveryChallenge challenge={chapter.challenge} locale={locale} />
        </div>
      ) : null}

      {scene.showQuiz && chapter?.quiz ? (
        <div className="module" data-cine-lock="true">
          <StoryQuiz questions={chapter.quiz} locale={locale} />
        </div>
      ) : null}

      {scene.layout === "finale" && glossary.length > 0 ? (
        <div className="module">
          <ScienceGlossary terms={glossary} locale={locale} />
        </div>
      ) : null}
    </>
  );
}

export function CinematicSceneView({
  scene,
  story,
  locale,
  index,
  related = [],
  continueId,
  continuing = false,
}: {
  scene: CinematicScene;
  story: EchoStory;
  locale: Locale;
  index: number;
  related?: EchoStory[];
  continueId?: string;
  continuing?: boolean;
}) {
  const media = findMedia(story, scene.mediaId);
  const recordLabel = locale === "ar" ? "السجل الكامل" : "The full record";
  const number = String(index + 1).padStart(2, "0");

  /* ------------------------------------------------------------- Opening */
  if (scene.layout === "opening") {
    return (
      <header
        id={`cine-${scene.id}`}
        data-scene={scene.id}
        data-index={index}
        data-tone="dark"
        className="opening"
      >
        {media ? (
          <Frame media={media} fill priority className="opening__media" />
        ) : null}
        <div aria-hidden="true" className="opening__scrim" />
        <div className="opening__grain" aria-hidden="true" />

        <div className="container-content opening__inner">
          <div className="opening__head">
            <Link href="/stories" className="opening__back">
              <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
              {t(locale, "echo.backToStories")}
            </Link>
            <p className="kicker kicker--dark">
              <span className="kicker__num">{number}</span>
              <span className="kicker__rule" aria-hidden="true" />
              <span className="kicker__label">
                {pick(locale, story.title)} · {pick(locale, story.equipmentType)}
              </span>
            </p>
            <h1 className="opening__title">{pick(locale, scene.title)}</h1>
            <p className="opening__dek">{pick(locale, scene.lede)}</p>
            <ul className="opening__meta">
              <li>
                <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                {pick(locale, story.location)}
              </li>
              <li>
                <Radio aria-hidden="true" className="h-3.5 w-3.5" />
                {pick(locale, story.missionPeriod)}
              </li>
            </ul>
          </div>
          <div className="opening__spec">
            <FactStrip
              facts={story.facts.slice(0, 3)}
              locale={locale}
              tone="dark"
              variant="panel"
            />
          </div>
          <div className="opening__act">
            <a href={`#cine-${continueId ?? scene.id}`} className="calltoaction">
              {continuing
                ? t(locale, "echo.continueJourney")
                : locale === "ar"
                  ? "ابدأ التجربة"
                  : "Start the experience"}
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
    );
  }

  /* ------------------------------------------- Full-bleed cinematic slides */
  if (scene.layout === "statement" || scene.layout === "signal") {
    const isSignal = scene.layout === "signal";
    return (
      <section
        id={`cine-${scene.id}`}
        data-scene={scene.id}
        data-index={index}
        data-tone="dark"
        aria-labelledby={`cine-title-${scene.id}`}
        className={`scene scene--full ${isSignal ? "scene--signal" : ""}`}
      >
        {media ? (
          <Frame media={media} fill priority={index < 3} className="scene__media" />
        ) : null}
        <div aria-hidden="true" className="scene__scrim" />
        <div className="container-content scene__inner scene__inner--center">
          <div className="scene__stack">
            <Kicker
              index={index}
              tone="dark"
              label={pick(locale, scene.kicker)}
              eyebrow={scene.eyebrow}
              locale={locale}
            />
            <h2 id={`cine-title-${scene.id}`} className="scene__title">
              {pick(locale, scene.title)}
            </h2>
            <p className="scene__lede">{pick(locale, scene.lede)}</p>
            <Prose paragraphs={scene.paragraphs} locale={locale} label={recordLabel} />
            <SceneEvidence scene={scene} story={story} locale={locale} />
            <SceneModules scene={scene} story={story} locale={locale} />
          </div>
        </div>
      </section>
    );
  }

  /* --------------------------------------------------------- Closing slide */
  if (scene.layout === "finale") {
    const support = (scene.supportIds ?? [])
      .map((id) => findMedia(story, id))
      .filter((entry): entry is EchoMedia => Boolean(entry));
    const archive = support.length > 0 ? support : story.gallery;

    return (
      <section
        id={`cine-${scene.id}`}
        data-scene={scene.id}
        data-index={index}
        data-tone="light"
        aria-labelledby={`cine-title-${scene.id}`}
        className="scene scene--finale"
      >
        <div className="container-content scene__inner scene__inner--single">
          <div className="scene__copy">
            <Kicker
              index={index}
              tone="light"
              label={pick(locale, scene.kicker)}
              locale={locale}
            />
            <h2 id={`cine-title-${scene.id}`} className="scene__title">
              {pick(locale, scene.title)}
            </h2>
            <p className="scene__lede">{pick(locale, scene.lede)}</p>
            <Prose paragraphs={scene.paragraphs} locale={locale} label={recordLabel} />
          </div>
        </div>

        {media ? (
          <div className="container-content scene__banner">
            <Plate media={media} locale={locale} size="wide" />
          </div>
        ) : null}

        <div className="container-content scene__inner scene__inner--single">
          <FinaleClose
            story={story}
            locale={locale}
            related={related}
            archive={archive}
          />
          <SceneModules scene={scene} story={story} locale={locale} />
        </div>
      </section>
    );
  }

  /* ------------------------------------------------- Editorial two-column */
  const flip = Boolean(scene.flip);
  const hasPlate = Boolean(media);

  return (
    <section
      id={`cine-${scene.id}`}
      data-scene={scene.id}
      data-index={index}
      data-tone={scene.tone}
      aria-labelledby={`cine-title-${scene.id}`}
      className={`scene scene--${scene.layout} ${flip ? "scene--flip" : ""} ${
        hasPlate ? "" : "scene--noplate"
      }`}
    >
      <div className="container-content scene__inner">
        <div className="scene__copy">
          <Kicker
            index={index}
            tone={scene.tone}
            label={pick(locale, scene.kicker)}
            locale={locale}
          />
          <h2 id={`cine-title-${scene.id}`} className="scene__title">
            {pick(locale, scene.title)}
          </h2>
          <p className="scene__lede">{pick(locale, scene.lede)}</p>
          <Prose paragraphs={scene.paragraphs} locale={locale} label={recordLabel} />
          <SceneEvidence scene={scene} story={story} locale={locale} />
        </div>

        {hasPlate ? (
          <div className="scene__visual">
            <Plate media={media!} locale={locale} priority={index < 3} />
          </div>
        ) : null}
      </div>

      {scene.hasModule ? (
        <div className="container-content scene__modules">
          <SceneModules scene={scene} story={story} locale={locale} />
        </div>
      ) : null}
    </section>
  );
}

function FinaleClose({
  story,
  locale,
  related,
  archive,
}: {
  story: EchoStory;
  locale: Locale;
  related: EchoStory[];
  archive: EchoMedia[];
}) {
  return (
    <div className="finale">
      <p className="finale__statement">{pick(locale, story.legacyStatement)}</p>
      <div className="finale__status">
        <p>
          <Radio aria-hidden="true" className="h-4 w-4" />
          <span>{pick(locale, story.missionStatus)}</span>
        </p>
        <p>
          <Radio aria-hidden="true" className="h-4 w-4" />
          <span>{pick(locale, story.hardwareStatus)}</span>
        </p>
      </div>
      <FactStrip facts={story.facts.slice(0, 3)} locale={locale} tone="light" />
      <div className="module">
        <DiscoveryBadges
          badge={story.badge}
          badgeKey={story.badgeKey}
          locale={locale}
          chapterCount={story.chapters.length}
          accent={story.accent}
        />
      </div>
      {story.artifactId ? (
        <Link href={`/museum/${story.artifactId}`} className="calltoaction calltoaction--ghost">
          <Landmark aria-hidden="true" className="h-4 w-4" />
          {t(locale, "echo.museumLink")}
        </Link>
      ) : null}
      {archive.length > 0 ? <ContactSheet media={archive} locale={locale} /> : null}
      <div className="module">
        <RelatedStories stories={related} locale={locale} />
      </div>
      <div className="module">
        <SourcesAndCredits sourceIds={story.sourceIds} media={archive} locale={locale} />
      </div>
      <a href={`#cine-${story.slug}-opening`} className="revisit">
        {locale === "ar" ? "أعد مشاهدة القصة" : "Revisit this story"}
      </a>
    </div>
  );
}

function ContactSheet({ media, locale }: { media: EchoMedia[]; locale: Locale }) {
  if (media.length === 0) return null;
  return (
    <div className="contactsheet">
      <p className="contactsheet__label">
        {locale === "ar" ? "من الأرشيف" : "From the archive"}
      </p>
      <ul className="contactsheet__strip">
        {media.map((entry) => (
          <li key={entry.id}>
            <Frame media={entry} ratio="1 / 1" />
            <span className="contactsheet__credit">{entry.credit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
