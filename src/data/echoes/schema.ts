import { z } from "zod";

/**
 * Runtime schema for the ECHOES story content.
 *
 * The story engine is driven by data, so the data is validated at build time.
 * Every bilingual string must have both languages, every media reference must
 * point at an asset in the local manifest, and every source reference must
 * resolve to a record in the shared source registry.
 */

const localized = z
  .object({ en: z.string().min(1), ar: z.string().min(1) })
  .strict();

const localizedList = z
  .object({
    en: z.array(z.string().min(1)).min(1),
    ar: z.array(z.string().min(1)).min(1),
  })
  .strict();

const isoDate = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), "Invalid ISO date");

const media = z
  .object({
    id: z.string().min(1),
    kind: z.enum([
      "photograph",
      "visualization",
      "illustration",
      "reconstruction",
      "video",
      "model",
    ]),
    src: z.string().min(1),
    thumb: z.string().optional(),
    poster: z.string().optional(),
    alt: localized,
    caption: localized,
    credit: z.string().min(1),
    organization: z.string().min(1),
    sourceUrl: z.string().url(),
    nasaId: z.string().optional(),
    usage: localized,
    accessedAt: isoDate,
    width: z.number().int().positive().optional(),
    height: z.number().int().positive().optional(),
    transcript: localizedList.optional(),
    captionsUrl: z.string().url().optional(),
  })
  .strict();

const fact = z.object({ label: localized, value: localized }).strict();

const glossaryTerm = z
  .object({
    id: z.string().min(1),
    term: localized,
    simple: localized,
    technical: localized.optional(),
  })
  .strict();

const quizQuestion = z
  .object({
    id: z.string().min(1),
    prompt: localized,
    options: z.array(z.object({ id: z.string().min(1), label: localized }).strict()).min(2),
    correctOptionId: z.string().min(1),
    explanation: localized,
  })
  .strict();

const challenge = z
  .object({
    id: z.string().min(1),
    prompt: localized,
    options: z.array(z.object({ id: z.string().min(1), label: localized }).strict()).min(2),
    correctOptionId: z.string().min(1),
    reality: localized,
  })
  .strict();

const discovery = z
  .object({
    id: z.string().min(1),
    title: localized,
    question: localized,
    instrument: localized,
    method: localized,
    data: localized,
    finding: localized,
    significance: localized,
    media: z.array(media).optional(),
    sourceIds: z.array(z.string().min(1)).min(1),
  })
  .strict();

const timelineEvent = z
  .object({
    id: z.string().min(1),
    date: z.string().min(4),
    dateLabel: localized,
    label: localized,
    description: localized,
    type: z.string().min(1),
    sourceIds: z.array(z.string().min(1)).min(1),
  })
  .strict();

const diagram = z
  .object({
    kind: z.enum([
      "rover-components",
      "small-rover-components",
      "lander-components",
      "instrument-components",
      "journey-map",
    ]),
    title: localized,
    intro: localized,
    points: z
      .array(
        z
          .object({
            id: z.string().min(1),
            x: z.number().min(0).max(100),
            y: z.number().min(0).max(100),
            label: localized,
            detail: localized,
          })
          .strict()
      )
      .min(1),
    route: z
      .array(z.object({ label: localized, description: localized }).strict())
      .optional(),
  })
  .strict();

const hotspot = z
  .object({
    id: z.string().min(1),
    position: z.tuple([z.number(), z.number(), z.number()]),
    label: localized,
    detail: localized,
  })
  .strict();

const model = z
  .object({
    src: z.string().min(1).optional(),
    procedural: z.enum(["sojourner"]).optional(),
    title: localized,
    description: localized,
    credit: z.string().min(1),
    organization: z.string().min(1),
    sourceUrl: z.string().url(),
    provenance: localized,
    hotspots: z.array(hotspot).min(1),
  })
  .strict();

const echoScene = z
  .object({
    id: z.string().min(1),
    kind: z.enum([
      "cinematic",
      "comic",
      "split",
      "discovery",
      "evidence",
      "artifact",
    ]),
    kicker: localized.optional(),
    title: localized,
    narration: localized,
    mediaId: z.string().optional(),
  })
  .strict();

const chapter = z
  .object({
    id: z.string().min(1),
    kind: z.enum(["meet", "mission", "journey", "discoveries", "ending", "legacy"]),
    eyebrow: localized,
    title: localized,
    summary: localized,
    narrative: localizedList,
    echo: localized,
    media: z.array(media).optional(),
    facts: z.array(fact).optional(),
    diagram: diagram.optional(),
    discoveries: z.array(discovery).optional(),
    timeline: z.array(timelineEvent).optional(),
    quiz: z.array(quizQuestion).optional(),
    challenge: challenge.optional(),
    glossary: z.array(glossaryTerm).optional(),
    narration: localizedList.optional(),
    sourceIds: z.array(z.string().min(1)).optional(),
    scenes: z.array(echoScene).optional(),
  })
  .strict();

export const echoStorySchema = z
  .object({
    id: z.string().min(1),
    slug: z
      .string()
      .min(1)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Expected a lowercase slug"),
    title: localized,
    storyTitle: localized,
    dek: localized,
    summary: localized,
    location: localized,
    locationNote: localized.optional(),
    equipmentType: localized,
    missionPeriod: localized,
    missionStatus: localized,
    hardwareStatus: localized,
    statusKind: z.enum([
      "active",
      "complete",
      "silent",
      "left-behind",
      "destroyed",
      "traveling",
    ]),
    accent: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    accentSoft: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    badge: localized,
    badgeKey: z.string().min(1),
    hero: media,
    gallery: z.array(media).min(1),
    facts: z.array(fact).min(1),
    model: model.optional(),
    chapters: z.array(chapter).min(3),
    tags: z.array(
      z.enum([
        "moon",
        "mars",
        "deep-space",
        "lander",
        "rover",
        "instrument",
        "remnant",
      ])
    ).min(1),
    artifactId: z.string().optional(),
    sourceIds: z.array(z.string().min(1)).min(1),
    relatedStorySlugs: z.array(z.string().min(1)),
    echoIntro: localized,
    echoSignoff: localized,
    lastVerified: isoDate,
    legacyStatement: localized,
  })
  .strict();

export const echoStoriesSchema = z.array(echoStorySchema).min(1);
