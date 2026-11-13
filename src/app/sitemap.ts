import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { artifacts } from "@/data/artifacts";
import { engineeringTopics } from "@/data/engineering";
import { journeys } from "@/data/journeys";
import { lessons } from "@/data/lessons";
import { missions } from "@/data/missions";
import { simulations } from "@/data/simulations";
import { storyCollections } from "@/data/stories";
import { agencies } from "@/data/space/agencies";
import { celestialBodies } from "@/data/space/bodies";
import { deepSkyObjects } from "@/data/space/deep-sky";

/**
 * The public route index.
 *
 * Every entry here is a route that is statically generated from the verified
 * datasets, so the sitemap can never point at a record that does not exist.
 * The three visitor tools (`/search`, `/compare`, `/my-universe`) are included
 * because they are reachable, but they are ranked below the collection because
 * they are interfaces rather than content.
 */
const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const staticRoutes: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/museum", priority: 0.9, changeFrequency: "weekly" },
  { path: "/explorer", priority: 0.9, changeFrequency: "weekly" },
  { path: "/academy", priority: 0.9, changeFrequency: "weekly" },
  { path: "/mission-control", priority: 0.7, changeFrequency: "weekly" },
  { path: "/engineering", priority: 0.7, changeFrequency: "monthly" },
  { path: "/stories", priority: 0.7, changeFrequency: "monthly" },
  { path: "/simulations", priority: 0.7, changeFrequency: "monthly" },
  { path: "/explorer/solar-system", priority: 0.7, changeFrequency: "monthly" },
  { path: "/explorer/bodies", priority: 0.7, changeFrequency: "monthly" },
  { path: "/explorer/deep-sky", priority: 0.7, changeFrequency: "monthly" },
  { path: "/museum/missions", priority: 0.6, changeFrequency: "monthly" },
  { path: "/museum/agencies", priority: 0.5, changeFrequency: "monthly" },
  { path: "/academy/journeys", priority: 0.7, changeFrequency: "monthly" },
  { path: "/academy/lessons", priority: 0.7, changeFrequency: "monthly" },
  { path: "/academy/articles", priority: 0.7, changeFrequency: "monthly" },
  { path: "/academy/play", priority: 0.6, changeFrequency: "monthly" },
  { path: "/academy/glossary", priority: 0.6, changeFrequency: "monthly" },
  { path: "/academy/flashcards", priority: 0.5, changeFrequency: "monthly" },
  { path: "/academy/build-rover", priority: 0.5, changeFrequency: "monthly" },
  { path: "/academy/robot-lab", priority: 0.5, changeFrequency: "monthly" },
  { path: "/sources", priority: 0.6, changeFrequency: "monthly" },
  { path: "/research", priority: 0.5, changeFrequency: "monthly" },
  { path: "/about", priority: 0.5, changeFrequency: "yearly" },
  { path: "/compare", priority: 0.5, changeFrequency: "monthly" },
  { path: "/search", priority: 0.4, changeFrequency: "monthly" },
  { path: "/my-universe", priority: 0.3, changeFrequency: "monthly" },
];

const recordRoutes = (
  prefix: string,
  ids: readonly string[],
  priority: number
): MetadataRoute.Sitemap =>
  ids.map((id) => ({
    url: `${base}${prefix}/${id}`,
    changeFrequency: "monthly" as const,
    priority,
  }));

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route.path}`,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...recordRoutes(
      "/museum",
      artifacts.map((artifact) => artifact.id),
      0.8
    ),
    ...recordRoutes(
      "/museum/missions",
      missions.map((mission) => mission.id),
      0.6
    ),
    ...recordRoutes(
      "/museum/agencies",
      agencies.map((agency) => agency.id),
      0.5
    ),
    ...recordRoutes(
      "/explorer/bodies",
      celestialBodies.map((body) => body.id),
      0.6
    ),
    ...recordRoutes(
      "/explorer/deep-sky",
      deepSkyObjects.map((object) => object.id),
      0.6
    ),
    ...recordRoutes(
      "/academy/lessons",
      lessons.map((lesson) => lesson.id),
      0.7
    ),
    ...recordRoutes(
      "/academy/journeys",
      journeys.map((journey) => journey.id),
      0.7
    ),
    ...recordRoutes(
      "/academy/articles",
      articles.map((article) => article.id),
      0.7
    ),
    ...recordRoutes(
      "/engineering",
      engineeringTopics.map((topic) => topic.id),
      0.7
    ),
    ...recordRoutes(
      "/stories",
      storyCollections.map((story) => story.id),
      0.7
    ),
    ...recordRoutes(
      "/simulations",
      simulations.map((simulation) => simulation.id),
      0.7
    ),
  ];
}
