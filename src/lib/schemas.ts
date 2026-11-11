import { z } from "zod";

const dateString = z
  .string()
  .regex(/^\d{4}(-\d{2})?(-\d{2})?$/, "Expected YYYY, YYYY-MM or YYYY-MM-DD");

const isoDate = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), "Invalid ISO date");

const claim = z.enum(["confirmed", "estimated", "simulated", "unknown"]);

export const sourceSchema = z.object({
  id: z.string().min(1),
  organization: z.string().min(1),
  title: z.string().min(1),
  url: z.string().url(),
  type: z.enum([
    "mission-page",
    "technical-archive",
    "fact-sheet",
    "reference",
    "news-release",
    "image-record",
  ]),
  accessedAt: isoDate,
  notes: z.string().optional(),
});

export const mediaSchema = z.object({
  type: z.literal("image"),
  src: z.string().min(1),
  thumb: z.string().min(1),
  alt: z.string().min(1),
  caption: z.string().min(1),
  credit: z.string().min(1),
  nasaId: z.string(),
  sourceUrl: z.string(),
  isIllustration: z.boolean(),
  width: z.number().positive(),
  height: z.number().positive(),
});

export const eventSchema = z.object({
  id: z.string().min(1),
  type: z.enum([
    "launch",
    "landing",
    "orbit-insertion",
    "flyby",
    "deployment",
    "first-operation",
    "first-flight",
    "milestone",
    "last-contact",
    "end-of-mission",
    "shutdown",
    "impact",
    "other",
  ]),
  date: dateString,
  datePrecision: z.enum(["day", "month", "year"]),
  dateLabel: z.string().min(1),
  label: z.string().min(1),
  description: z.string().min(1),
  sourceIds: z.array(z.string()).min(1),
});

export const artifactSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  alternateNames: z.array(z.string()).optional(),
  missionName: z.string().min(1),
  programName: z.string().min(1),
  destination: z.string().min(1),
  destinationGroup: z.enum(["moon", "mars", "deep-space"]),
  hardwareType: z.enum([
    "rover",
    "lander",
    "orbiter",
    "probe",
    "instrument",
    "surface-equipment",
    "aircraft",
  ]),
  shortDescription: z.string().min(1),
  overview: z.string().min(1),
  scientificPurpose: z.string().min(1),
  missionStatus: z.enum([
    "planned",
    "ongoing",
    "completed",
    "ended",
    "lost-contact",
    "unknown",
  ]),
  missionStatusOriginal: z.string().min(1),
  hardwareStatus: z.enum([
    "operating",
    "inactive",
    "no-longer-communicating",
    "impacted",
    "destroyed",
    "still-traveling",
    "unknown",
  ]),
  hardwareStatusOriginal: z.string().min(1),
  launchDate: dateString.optional(),
  arrivalDate: dateString.optional(),
  missionEndDate: dateString.optional(),
  lastContactDate: dateString.optional(),
  primaryMilestone: eventSchema,
  timelineEvents: z.array(eventSchema).min(1),
  scientificContributions: z
    .array(
      z.object({
        title: z.string().min(1),
        summary: z.string().min(1),
        kind: z.enum(["science", "engineering"]),
      })
    )
    .min(1),
  fate: z.string().min(1),
  location: z.object({
    body: z.string().min(1),
    locationName: z.string().min(1),
    precision: z.enum(["exact", "approximate", "region", "unknown"]),
    note: z.string().optional(),
  }),
  technicalDetails: z.array(
    z.object({ label: z.string().min(1), value: z.string().min(1) })
  ),
  media: mediaSchema.optional(),
  relatedIds: z.array(z.string()),
  sourceIds: z.array(z.string()).min(1),
  lastVerified: isoDate,
  dataNotes: z.array(z.string()),
});

export const bodyFactSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  claim,
  sourceIds: z.array(z.string()).optional(),
});

export const bodySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  kind: z.enum(["star", "planet", "dwarf-planet", "moon"]),
  parentId: z.string().optional(),
  tagline: z.string().min(1),
  summary: z.string().min(1),
  overview: z.array(z.string().min(1)).min(1),
  facts: z.array(bodyFactSchema).min(1),
  distanceLabel: z.string().min(1),
  orbitalPeriod: z.string().min(1),
  dayLength: z.string().min(1),
  radius: z.string().min(1),
  moonCount: z.string().min(1),
  temperature: z.string().min(1),
  discovery: z.string().min(1),
  exploration: z.string().min(1),
  highlights: z.array(z.string().min(1)),
  accent: z.string().min(1),
  orbit: z
    .object({
      au: z.number().positive(),
      periodYears: z.number().positive(),
      visualRadius: z.number().positive(),
      color: z.string().min(1),
      visualSize: z.number().positive(),
    })
    .optional(),
  relatedArtifactIds: z.array(z.string()),
  sourceIds: z.array(z.string()).min(1),
  lastVerified: isoDate,
});

export const deepSkySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  catalogName: z.string().min(1),
  kind: z.enum([
    "emission-nebula",
    "supernova-remnant",
    "planetary-nebula",
    "spiral-galaxy",
    "galaxy",
    "black-hole",
    "star-forming-region",
  ]),
  kindLabel: z.string().min(1),
  constellation: z.string().min(1),
  distance: z.string().min(1),
  summary: z.string().min(1),
  overview: z.array(z.string().min(1)).min(1),
  facts: z.array(bodyFactSchema).min(1),
  discovery: z.string().min(1),
  observation: z.string().min(1),
  accent: z.string().min(1),
  gradient: z.string().min(1),
  sourceIds: z.array(z.string()).min(1),
  lastVerified: isoDate,
});

export const lessonSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  ageBand: z.enum(["5-7", "8-9", "10-12"]),
  minutes: z.number().positive(),
  summary: z.string().min(1),
  objectives: z.array(z.string().min(1)).min(1),
  sections: z
    .array(
      z.object({
        heading: z.string().min(1),
        paragraphs: z.array(z.string().min(1)).min(1),
        callout: z.string().optional(),
      })
    )
    .min(1),
  keyTerms: z.array(
    z.object({ term: z.string().min(1), definition: z.string().min(1) })
  ),
  tryIt: z.string().min(1),
  quiz: z
    .array(
      z.object({
        prompt: z.string().min(1),
        options: z.array(z.string().min(1)).min(2),
        correctIndex: z.number().int().min(0),
        explanation: z.string().min(1),
      })
    )
    .min(1),
  artifactIds: z.array(z.string()),
  bodyIds: z.array(z.string()),
  sourceIds: z.array(z.string()).min(1),
  accent: z.string().min(1),
});

export const journeySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  ageBand: z.enum(["5-7", "8-9", "10-12"]),
  promise: z.string().min(1),
  minutes: z.number().positive(),
  summary: z.string().min(1),
  accent: z.string().min(1),
  badge: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    description: z.string().min(1),
  }),
  steps: z
    .array(
      z.object({
        id: z.string().min(1),
        title: z.string().min(1),
        kind: z.enum(["lesson", "artifact", "body", "article", "challenge"]),
        description: z.string().min(1),
        href: z.string().startsWith("/"),
      })
    )
    .min(1),
  sourceIds: z.array(z.string()).min(1),
});

export const missionSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  agencyId: z.string().min(1),
  program: z.string(),
  destinationBodyId: z.string().optional(),
  destinationLabel: z.string().min(1),
  launchDate: dateString,
  endDate: dateString.optional(),
  status: z.enum(["planned", "ongoing", "completed", "ended", "lost-contact", "unknown"]),
  statusNote: z.string().min(1),
  summary: z.string().min(1),
  objectives: z.array(z.string()),
  achievements: z.array(z.string()),
  artifactIds: z.array(z.string()).min(1),
  sourceIds: z.array(z.string()).min(1),
  lastVerified: isoDate,
});

export const articleSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  dek: z.string().min(1),
  readingMinutes: z.number().positive(),
  topics: z.array(z.string()),
  sections: z
    .array(
      z.object({
        heading: z.string().min(1),
        paragraphs: z.array(z.string().min(1)).min(1),
      })
    )
    .min(1),
  relatedArtifactIds: z.array(z.string()),
  relatedBodyIds: z.array(z.string()),
  sourceIds: z.array(z.string()).min(1),
  lastVerified: isoDate,
});

export const agencySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  shortName: z.string().min(1),
  country: z.string().min(1),
  founded: z.string().min(1),
  summary: z.string().min(1),
  focus: z.array(z.string()),
  notablePrograms: z.array(z.string()),
  website: z.string().url(),
  accent: z.string().min(1),
  sourceIds: z.array(z.string()).min(1),
});

export const playGameSchema = z.object({
  id: z.enum(["rocket", "moon", "rover"]),
  title: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  ages: z.array(z.enum(["5-7", "8-9", "10-12"])).min(1),
  minutes: z.number().positive(),
  accent: z.string().min(1),
  softAccent: z.string().min(1),
  badge: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    description: z.string().min(1),
  }),
  skills: z.array(z.string().min(1)).min(1),
  controls: z.string().min(1),
  toyNote: z.string().min(1),
  lessonId: z.string().min(1),
  artifactIds: z.array(z.string()),
  bodyIds: z.array(z.string()),
  sourceIds: z.array(z.string()).min(1),
});

export const importedProgressSchema = z.object({
  version: z.literal(1),
  lessons: z.record(
    z.object({
      completedAt: z.string(),
      score: z.number().min(0),
      total: z.number().min(0),
    })
  ),
  journeys: z.record(
    z.object({
      startedAt: z.string(),
      completedSteps: z.array(z.string()),
      completedAt: z.string().optional(),
    })
  ),
  games: z
    .record(
      z.object({
        completedAt: z.string(),
        stars: z.number().int().min(0).max(3),
      })
    )
    .optional(),
  badges: z.array(z.string()),
  lastVisited: z.string().optional(),
  updatedAt: z.string(),
});
