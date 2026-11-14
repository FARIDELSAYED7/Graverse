import type { EchoChapter, EchoMedia, EchoStory, Localized } from "@/types/echo";
import { echoExtraImagesFor } from "@/data/echoes/extra-media";

/**
 * The cinematic director.
 *
 * One presentation engine, different journeys. The director reads the story
 * that already exists — chapters, photographs, timelines, discoveries, the
 * 3D model — and composes a scene sequence for that mission. It does not
 * invent dates, hardware or discoveries, and it does not force every story
 * through the same six plates.
 *
 * Layouts are chosen for the kind of mission (a rover, a lander, a telescope,
 * a voyage) and then adjusted when a story is missing a model, a timeline or
 * a journey chapter. Scene count follows the content.
 *
 * The director also decides the *tone* of every scene — a deep-space dark
 * composition or a warm paper composition — so that a long story reads as a
 * sequence of distinct slides instead of one continuous dark page. Tones are
 * derived from the layout and the scene's own media, never from the prose.
 */

export type SceneLayout =
  | "opening"
  | "statement"
  | "editorial"
  | "annotated"
  | "artifact"
  | "diagram"
  | "stages"
  | "science"
  | "signal"
  | "finale";

/**
 * The visual register of a scene.
 *
 * `dark`  — a cinematic composition: full-bleed photography or a typographic
 *           card on deep space navy.
 * `light` — an editorial composition: warm paper, archival neutrals, the
 *           same typography a printed museum catalogue would use.
 */
export type SceneTone = "dark" | "light";

export type StoryFamily =
  | "rover"
  | "flight"
  | "crew-rover"
  | "lander"
  | "voyager"
  | "telescope"
  | "instrument";

export interface CinematicScene {
  id: string;
  /** Chapter this scene belongs to, for the existing progress record. */
  chapterId?: string;
  layout: SceneLayout;
  /** Visual register of this slide. */
  tone: SceneTone;
  kicker: Localized;
  /** The chapter's own eyebrow, kept with the scene it belongs to. */
  eyebrow?: Localized;
  title: Localized;
  lede: Localized;
  paragraphs: Localized[];
  /** The frame that leads the slide. */
  mediaId?: string;
  /** Additional frames shown beside or beneath the lead frame. */
  supportIds?: string[];
  discoveryId?: string;
  showModel?: boolean;
  showDiagram?: boolean;
  showTimeline?: boolean;
  showFacts?: boolean;
  showQuiz?: boolean;
  showChallenge?: boolean;
  showVideo?: boolean;
  flip?: boolean;
  /** True when the scene carries a heavy interactive module. */
  hasModule?: boolean;
}

type Step =
  | "opening"
  | "portrait"
  | "statement"
  | "machine"
  | "artifact"
  | "diagram"
  | "mission"
  | "passage"
  | "stages"
  | "science"
  | "signal"
  | "finale";

const copy = {
  opening: { en: "A cinematic record", ar: "سجل سينمائي" },
  explorer: { en: "The explorer", ar: "المستكشِف" },
  machine: { en: "The machine", ar: "الآلة" },
  mission: { en: "The mission", ar: "المهمة" },
  passage: { en: "The passage", ar: "العبور" },
  descent: { en: "The descent", ar: "الهبوط" },
  route: { en: "The route", ar: "المسار" },
  flights: { en: "The flights", ar: "الرحلات" },
  surface: { en: "On the surface", ar: "على السطح" },
  science: { en: "What it found", ar: "ما وجدته" },
  signal: { en: "The last signal", ar: "الإشارة الأخيرة" },
  remains: { en: "What remains", ar: "ما الذي يبقى" },
  crew: { en: "With the crew", ar: "مع الطاقم" },
  hunt: { en: "The hunt", ar: "المطاردة" },
  still: { en: "Still traveling", ar: "ما يزال في الطريق" },
  archive: { en: "The archive", ar: "الأرشيف" },
} as const;

/** Narrative identity. Shared engine, different journeys. */
export function storyFamily(story: EchoStory): StoryFamily {
  if (story.slug === "ingenuity") return "flight";
  if (story.slug === "kepler") return "telescope";
  if (story.slug === "lunar-roving-vehicle") return "crew-rover";
  if (story.tags.includes("rover")) return "rover";
  if (story.tags.includes("lander")) return "lander";
  if (story.slug === "dawn" || story.slug === "near-shoemaker" || story.tags.includes("deep-space")) {
    return "voyager";
  }
  return "instrument";
}

const recipes: Record<string, Step[]> = {
  // The reference journey: a small machine, the mission that carried it,
  // the passage, the landing sequence, the science, the silence, the legacy.
  sojourner: ["opening", "portrait", "artifact", "mission", "passage", "stages", "science", "signal", "finale"],
  // A long field career: the road comes before the machine is taken apart.
  opportunity: ["opening", "portrait", "mission", "stages", "artifact", "science", "signal", "finale"],
  spirit: ["opening", "statement", "mission", "stages", "science", "signal", "finale"],
  ingenuity: ["opening", "portrait", "mission", "stages", "science", "signal", "finale"],
  "lunar-roving-vehicle": ["opening", "machine", "mission", "science", "signal", "finale"],
  // Landers lead with the machine and the descent, not a rover portrait.
  "viking-1-lander": ["opening", "machine", "artifact", "stages", "mission", "science", "signal", "finale"],
  "viking-2-lander": ["opening", "machine", "mission", "science", "stages", "signal", "finale"],
  "apollo-11-lm-descent-stage": ["opening", "portrait", "stages", "artifact", "science", "signal", "finale"],
  "surveyor-landers": ["opening", "portrait", "stages", "mission", "science", "signal", "finale"],
  phoenix: ["opening", "portrait", "stages", "science", "mission", "signal", "finale"],
  insight: ["opening", "machine", "mission", "stages", "science", "signal", "finale"],
  // Voyages and observatories: the route or the hunt is the spine.
  kepler: ["opening", "portrait", "diagram", "science", "stages", "signal", "finale"],
  dawn: ["opening", "portrait", "stages", "diagram", "science", "signal", "finale"],
  "near-shoemaker": ["opening", "portrait", "mission", "stages", "science", "signal", "finale"],
  "pioneer-10": ["opening", "portrait", "stages", "science", "mission", "signal", "finale"],
  "pioneer-11": ["opening", "statement", "stages", "science", "signal", "finale"],
  "apollo-lunar-surface-experiments": ["opening", "portrait", "diagram", "mission", "science", "signal", "finale"],
};

const familyRecipe: Record<StoryFamily, Step[]> = {
  rover: ["opening", "portrait", "artifact", "mission", "stages", "science", "signal", "finale"],
  flight: ["opening", "portrait", "mission", "stages", "science", "signal", "finale"],
  "crew-rover": ["opening", "machine", "mission", "science", "signal", "finale"],
  lander: ["opening", "machine", "stages", "mission", "science", "signal", "finale"],
  voyager: ["opening", "statement", "stages", "science", "mission", "signal", "finale"],
  telescope: ["opening", "portrait", "diagram", "science", "stages", "signal", "finale"],
  instrument: ["opening", "portrait", "diagram", "mission", "science", "signal", "finale"],
};

function byKind(story: EchoStory, kind: EchoChapter["kind"]): EchoChapter | undefined {
  return story.chapters.find((chapter) => chapter.kind === kind);
}

function paragraphs(chapter: EchoChapter): Localized[] {
  const narrative = chapter.narrative.en.map((en, index) => ({
    en,
    ar: chapter.narrative.ar[index] || en,
  }));
  // A chapter's authored beats ("the visual edit") lead the reading — the
  // short lines that carry the scene — while the sourced narrative follows as
  // the full record. A beat that merely restates a narrative paragraph is
  // dropped so the same line never appears twice on a slide. Comparison is
  // normalised so near-identical restatements cannot slip through as a repeat.
  const norm = (value: string) => value.replace(/\s+/g, " ").trim().toLowerCase();
  const narrEn = new Set(chapter.narrative.en.map(norm));
  const narrAr = new Set(chapter.narrative.ar.map(norm));
  const beats = (chapter.scenes ?? [])
    .map((scene) => scene.narration)
    .filter((beat) => !narrEn.has(norm(beat.en)) && !narrAr.has(norm(beat.ar)));
  return [...beats, ...narrative];
}

function withTimeline(story: EchoStory): EchoChapter | undefined {
  return (
    story.chapters.find((chapter) => chapter.kind === "journey" && (chapter.timeline?.length ?? 0) > 0) ??
    story.chapters.find((chapter) => (chapter.timeline?.length ?? 0) > 0)
  );
}

function withDiagram(story: EchoStory): EchoChapter | undefined {
  return story.chapters.find((chapter) => chapter.diagram);
}

function stagesKicker(family: StoryFamily): Localized {
  if (family === "lander") return copy.descent;
  if (family === "flight") return copy.flights;
  if (family === "voyager" || family === "telescope") return family === "telescope" ? copy.hunt : copy.route;
  if (family === "crew-rover") return copy.surface;
  return copy.passage;
}

function missionLayout(family: StoryFamily): SceneLayout {
  if (family === "voyager" || family === "flight" || family === "telescope") return "statement";
  return "editorial";
}

function pushChapter(
  scenes: CinematicScene[],
  chapter: EchoChapter,
  scene: Omit<CinematicScene, "id" | "chapterId" | "paragraphs" | "lede" | "tone"> & {
    lede?: Localized;
    paragraphs?: Localized[];
  }
) {
  const prose = paragraphs(chapter);
  scenes.push({
    ...scene,
    eyebrow: scene.eyebrow ?? chapter.eyebrow,
    id: `${chapter.id}-${scene.layout}-${scenes.length}`,
    chapterId: chapter.id,
    lede: scene.lede ?? chapter.summary,
    paragraphs: scene.paragraphs ?? prose,
    tone: "light",
  });
}

function expand(story: EchoStory, family: StoryFamily, step: Step, scenes: CinematicScene[]) {
  const meet = byKind(story, "meet");
  const mission = byKind(story, "mission");
  const journey = byKind(story, "journey");
  const discoveries = byKind(story, "discoveries");
  const ending = byKind(story, "ending");
  const legacy = byKind(story, "legacy");
  const flip = scenes.length % 2 === 1;

  if (step === "opening") {
    scenes.push({
      id: `${story.slug}-opening`,
      layout: "opening",
      tone: "dark",
      kicker: copy.opening,
      title: story.storyTitle,
      lede: story.dek,
      paragraphs: [story.summary],
      mediaId: story.hero.id,
    });
    return;
  }

  if ((step === "portrait" || step === "statement" || step === "machine") && meet) {
    const layout: SceneLayout =
      step === "machine" ? "annotated" : step === "statement" ? "statement" : "editorial";
    pushChapter(scenes, meet, {
      layout,
      kicker: family === "crew-rover" ? copy.crew : family === "lander" ? copy.machine : copy.explorer,
      title: meet.title,
      showFacts: layout !== "editorial",
      flip,
    });
    return;
  }

  if (step === "artifact" && story.model && meet) {
    pushChapter(scenes, meet, {
      layout: "artifact",
      kicker: copy.explorer,
      title: story.model.title,
      lede: story.model.description,
      showModel: true,
      showFacts: true,
      showDiagram: Boolean(meet.diagram),
    });
    return;
  }

  if (step === "diagram") {
    const chapter = withDiagram(story) ?? meet;
    if (chapter?.diagram) {
      pushChapter(scenes, chapter, {
        layout: "diagram",
        kicker: family === "instrument" ? copy.machine : copy.explorer,
        title: chapter.diagram.title,
        lede: chapter.diagram.intro,
        showDiagram: true,
        showFacts: !story.model,
      });
    }
    return;
  }

  if (step === "mission" && mission) {
    pushChapter(scenes, mission, {
      layout: missionLayout(family),
      kicker: copy.mission,
      title: mission.title,
      showChallenge: Boolean(mission.challenge),
      flip: !flip,
    });
    return;
  }

  if (step === "passage" && (journey || mission)) {
    const chapter = journey ?? mission;
    if (!chapter) return;
    pushChapter(scenes, chapter, {
      layout: "statement",
      kicker: stagesKicker(family),
      title: chapter.title,
    });
    return;
  }

  if (step === "stages") {
    const chapter = withTimeline(story) ?? journey ?? mission;
    if (!chapter || (chapter.timeline?.length ?? 0) === 0) return;
    pushChapter(scenes, chapter, {
      layout: "stages",
      kicker: stagesKicker(family),
      title: chapter.title,
      showTimeline: true,
      showDiagram: chapter.diagram?.kind === "journey-map",
    });
    return;
  }

  if (step === "science" && discoveries) {
    const found = discoveries.discoveries ?? [];
    if (found.length > 0) {
      // Preserve the sourced chapter narration as the visual threshold into
      // the individual investigations, rather than silently dropping it when
      // a chapter expands into one scene per discovery.
      pushChapter(scenes, discoveries, {
        layout: "editorial",
        kicker: copy.science,
        title: discoveries.title,
        flip,
      });
    }
    if (found.length === 0) {
      pushChapter(scenes, discoveries, {
        layout: "editorial",
        kicker: copy.science,
        title: discoveries.title,
        flip,
      });
      return;
    }
    found.forEach((discovery, index) => {
      scenes.push({
        id: `${discoveries.id}-${discovery.id}`,
        chapterId: discoveries.id,
        layout: "science",
        tone: "light",
        kicker: copy.science,
        title: discovery.title,
        lede: discovery.finding,
        paragraphs: [discovery.question, discovery.significance],
        discoveryId: discovery.id,
        flip: index % 2 === 1,
      });
    });
    return;
  }

  if (step === "signal" && ending && legacy) {
    pushChapter(scenes, ending, {
      layout: "signal",
      kicker: family === "voyager" ? copy.still : copy.signal,
      title: ending.title,
    });
    return;
  }

  if (step === "finale") {
    const chapter = legacy ?? ending;
    if (!chapter) return;
    pushChapter(scenes, chapter, {
      layout: "finale",
      kicker: copy.remains,
      title: chapter.title,
      paragraphs: paragraphs(chapter),
    });
  }
}

function coverMissing(story: EchoStory, scenes: CinematicScene[]) {
  const finale = scenes.findIndex((scene) => scene.layout === "finale");
  const insertAt = finale === -1 ? scenes.length : finale;
  const missing = story.chapters.filter(
    (chapter) => !scenes.some((scene) => scene.chapterId === chapter.id)
  );
  missing.forEach((chapter, index) => {
    const prose = paragraphs(chapter);
    scenes.splice(insertAt + index, 0, {
      id: `${chapter.id}-cover`,
      chapterId: chapter.id,
      layout: chapter.kind === "ending" ? "signal" : "editorial",
      tone: "light",
      kicker: chapter.eyebrow,
      title: chapter.title,
      lede: chapter.summary,
      paragraphs: prose,
      flip: index % 2 === 1,
      showTimeline: (chapter.timeline?.length ?? 0) > 0,
      showDiagram: Boolean(chapter.diagram),
      showChallenge: Boolean(chapter.challenge),
    });
  });
}

/**
 * Collects every frame the story owns — the curated photographs plus the
 * supplementary NASA archive — into one ordered pool.
 */
function mediaPool(story: EchoStory) {
  const curated = [
    story.hero,
    ...story.gallery,
    ...story.chapters.flatMap((chapter) => chapter.media ?? []),
    ...story.chapters.flatMap((chapter) =>
      (chapter.discoveries ?? []).flatMap((discovery) => discovery.media ?? [])
    ),
  ];
  const extra = echoExtraImagesFor(story.slug);
  const seen = new Set<string>();
  const pool: { id: string; kind: string; nasaId: string }[] = [];
  for (const entry of [...curated, ...extra]) {
    const key = entry.nasaId ?? entry.id;
    if (seen.has(key)) continue;
    seen.add(key);
    pool.push({ id: entry.id, kind: entry.kind, nasaId: key });
  }
  return { pool, extra };
}

function assignMedia(story: EchoStory, scenes: CinematicScene[]) {
  const { pool } = mediaPool(story);
  const used = new Set<string>([story.hero.id]);

  const chapterPool = (chapterId?: string) =>
    pool.filter((entry) => {
      if (used.has(entry.id)) return false;
      if (entry.kind === "video") return false;
      if (!chapterId) return false;
      const chapter = story.chapters.find((entry2) => entry2.id === chapterId);
      if (!chapter) return false;
      const own = [
        ...(chapter.media ?? []).map((media) => media.id),
        ...(chapter.discoveries ?? []).flatMap((d) => (d.media ?? []).map((m) => m.id)),
      ];
      return own.includes(entry.id);
    });

  for (const scene of scenes) {
    if (scene.layout === "opening") {
      scene.mediaId = story.hero.id;
      continue;
    }
    const chapter = story.chapters.find((entry) => entry.id === scene.chapterId);
    if (scene.discoveryId && chapter) {
      const discovery = chapter.discoveries?.find((entry) => entry.id === scene.discoveryId);
      const own = discovery?.media?.find(
        (entry) => entry.kind !== "video" && !used.has(entry.id)
      );
      if (own) {
        used.add(own.id);
        scene.mediaId = own.id;
        continue;
      }
    }
    const inChapter = chapterPool(scene.chapterId)[0];
    if (inChapter) {
      used.add(inChapter.id);
      scene.mediaId = inChapter.id;
      continue;
    }
    const next = pool.find(
      (entry) => !used.has(entry.id) && entry.kind !== "video"
    );
    if (next) {
      used.add(next.id);
      scene.mediaId = next.id;
    }
  }

  // The closing slide carries the contact sheet of everything that was left
  // over, so the archive is seen as a whole instead of frame by frame.
  const leftover = pool
    .filter((entry) => !used.has(entry.id) && entry.kind !== "video")
    .map((entry) => entry.id);
  const finale = scenes.find((scene) => scene.layout === "finale");
  if (finale) finale.supportIds = leftover.slice(0, 12);
}

function attachModules(story: EchoStory, scenes: CinematicScene[]) {
  for (const chapter of story.chapters) {
    const chapterScenes = scenes.filter(
      (scene) => scene.chapterId === chapter.id && scene.layout !== "opening"
    );
    const host = chapterScenes[0];
    const last = chapterScenes.at(-1);

    if ((chapter.quiz?.length ?? 0) > 0 && last) last.showQuiz = true;
    if (chapter.challenge && host) host.showChallenge = true;
    if ((chapter.facts?.length ?? 0) > 0 && host && !host.showFacts) {
      host.showFacts = true;
    }

    // A chapter's timeline and diagram are content, not decoration. A recipe
    // may not have a "stages" scene for every family, so attach them to that
    // chapter's first scene when nothing else already carries them.
    if ((chapter.timeline?.length ?? 0) > 0 && host) {
      const carried = chapterScenes.some((scene) => scene.showTimeline);
      if (!carried) host.showTimeline = true;
    }
    if (chapter.diagram && host) {
      const carried = chapterScenes.some((scene) => scene.showDiagram);
      if (!carried) host.showDiagram = true;
    }

    const video = chapter.media?.find((entry) => entry.kind === "video");
    if (video) {
      const videoHost =
        chapterScenes.find(
          (scene) => scene.layout === "stages" || scene.layout === "statement"
        ) ?? host;
      if (videoHost) videoHost.showVideo = true;
    }
  }
}

/**
 * Chooses the visual register of each slide.
 *
 * Full-bleed photographic compositions and slides without a frame of their
 * own are dark; the reading and interactive compositions sit on warm paper.
 * The result alternates instead of running as one long dark page.
 */
function assignTones(scenes: CinematicScene[]) {
  scenes.forEach((scene) => {
    if (scene.layout === "opening" || scene.layout === "statement" || scene.layout === "signal") {
      scene.tone = "dark";
      return;
    }
    if (scene.layout === "finale") {
      scene.tone = "light";
      return;
    }
    if (!scene.mediaId) {
      // A typographic card: the deep register gives it presence and stops
      // the story from reading as a wall of text.
      scene.tone = "dark";
      return;
    }
    scene.tone = "light";
  });
}

/**
 * Compose the scene sequence for one story.
 * Pure and deterministic: the server and the client agree on every id.
 */
export function directStory(story: EchoStory): CinematicScene[] {
  const family = storyFamily(story);
  let steps = recipes[story.slug] ?? familyRecipe[family];
  const hasLegacy = story.chapters.some((chapter) => chapter.kind === "legacy");
  if (!hasLegacy) steps = steps.filter((step) => step !== "signal");

  const scenes: CinematicScene[] = [];
  for (const step of steps) expand(story, family, step, scenes);
  coverMissing(story, scenes);
  assignMedia(story, scenes);
  attachModules(story, scenes);
  assignTones(scenes);

  for (const scene of scenes) {
    scene.hasModule = Boolean(
      scene.showModel ||
        scene.showDiagram ||
        scene.showTimeline ||
        scene.showQuiz ||
        scene.showChallenge ||
        scene.showVideo
    );
  }

  const seen = new Set<string>();
  return scenes.filter((scene) => {
    if (seen.has(scene.id)) return false;
    seen.add(scene.id);
    return true;
  });
}

/**
 * The frames a story can show, in the order they should be used.
 * Exposed so the presentation layer can resolve any frame id to a record.
 */
export function storyFrames(story: EchoStory) {
  const { pool, extra } = mediaPool(story);
  return { pool, extra };
}

/**
 * Every frame a story can show, indexed by id.
 *
 * The curated photographs in the story file and the supplementary NASA
 * archive live side by side here so the presentation layer can resolve any
 * frame id to a single record.
 */
const mediaIndexCache = new WeakMap<EchoStory, Map<string, EchoMedia>>();

export function storyMediaIndex(story: EchoStory): Map<string, EchoMedia> {
  const cached = mediaIndexCache.get(story);
  if (cached) return cached;
  const index = new Map<string, EchoMedia>();
  const add = (media: EchoMedia) => {
    if (!index.has(media.id)) index.set(media.id, media);
  };
  add(story.hero);
  story.gallery.forEach(add);
  for (const chapter of story.chapters) {
    (chapter.media ?? []).forEach(add);
    for (const discovery of chapter.discoveries ?? []) {
      (discovery.media ?? []).forEach(add);
    }
  }
  echoExtraImagesFor(story.slug).forEach(add);
  mediaIndexCache.set(story, index);
  return index;
}

export function sceneSignature(story: EchoStory): string {
  return directStory(story)
    .map((scene) => `${scene.layout}:${scene.tone}`)
    .join(">");
}
