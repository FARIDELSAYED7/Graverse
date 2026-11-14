import { NextResponse } from "next/server";
import { allArtifacts } from "@/data/artifacts";
import { articles } from "@/data/articles";
import { glossary } from "@/data/glossary";
import { journeys } from "@/data/journeys";
import { lessons } from "@/data/lessons";
import { missions } from "@/data/missions";
import { sources } from "@/data/sources";
import { agencies } from "@/data/space/agencies";
import { celestialBodies } from "@/data/space/bodies";
import { deepSkyObjects } from "@/data/space/deep-sky";
import { engineeringTopics } from "@/data/engineering";
import { storyCollections } from "@/data/stories";
import { echoStories } from "@/data/echoes";
import { simulations } from "@/data/simulations";

/**
 * The route is evaluated per request.
 *
 * It used to be `force-static`, which froze the response at build time and
 * made `?dataset=…` meaningless: every query returned the whole collection
 * and the documented 400 for an unknown dataset could never fire. The
 * underlying data is static, but the *selection* is a request parameter, so
 * the handler has to run at request time. Caching is kept at the edge via the
 * `Cache-Control` header below.
 */
export const dynamic = "force-dynamic";

const datasets = {
  artifacts: allArtifacts,
  missions,
  sources,
  bodies: celestialBodies,
  "deep-sky": deepSkyObjects,
  lessons,
  journeys,
  articles,
  agencies,
  glossary,
  engineering: engineeringTopics,
  stories: storyCollections,
  echoes: echoStories,
  simulations,
} as const;

type DatasetKey = keyof typeof datasets;

function isDatasetKey(value: string): value is DatasetKey {
  return Object.prototype.hasOwnProperty.call(datasets, value);
}

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requested = searchParams.get("dataset") ?? "all";

  const meta = {
    name: "GRAVERSE public dataset",
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    note:
      "Compiled from public NASA mission pages, NASA/NSSDCA technical records and NASA image records. Not an official NASA dataset. Status values are snapshots, not live telemetry.",
    license:
      "Factual data is attributed to the registered sources. GRAVERSE editorial text is provided for the NASA Space Apps Challenge project.",
  };

  if (requested !== "all" && !isDatasetKey(requested)) {
    return NextResponse.json(
      {
        error: `Unknown dataset "${requested}".`,
        available: ["all", ...Object.keys(datasets)],
      },
      { status: 400 }
    );
  }

  const payload =
    requested === "all"
      ? { meta, ...datasets }
      : { meta, dataset: requested, records: datasets[requested as DatasetKey] };

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Content-Disposition": `attachment; filename="graverse-${
        requested === "all" ? "dataset" : requested
      }.json"`,
    },
  });
}
