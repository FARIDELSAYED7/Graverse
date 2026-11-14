#!/usr/bin/env node
/**
 * Supplementary ECHOES imagery.
 *
 * `scripts/echo-media-plan.json` gives every story a hero and a few gallery
 * frames. A cinematic presentation needs more frames than that, so this
 * script downloads a second, purely supplementary set of NASA Image and
 * Video Library assets listed in `scripts/echo-media-extra-plan.json`.
 *
 * The result is written to `public/images/echoes/extra/` with a companion
 * manifest at `src/data/echoes/extra-media-manifest.json`. The story files
 * themselves are untouched: the cinematic director pulls these frames in as
 * supporting imagery only.
 *
 * Usage: node scripts/fetch-echo-extra-media.mjs
 */

import { writeFile, mkdir, readFile, rename } from "node:fs/promises";
import { createWriteStream as createWriteStreamSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const PLAN_PATH = join(HERE, "echo-media-extra-plan.json");
const IMAGE_DIR = join(ROOT, "public", "images", "echoes", "extra");
const MANIFEST_PATH = join(ROOT, "src", "data", "echoes", "extra-media-manifest.json");

const API = "https://images-api.nasa.gov";
const LIBRARY = "https://images.nasa.gov";
const ACCESSED = new Date().toISOString().slice(0, 10);

async function getJson(url) {
  const response = await fetch(url, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`GET ${url} -> ${response.status}`);
  return response.json();
}

function pickAsset(hrefs, patterns) {
  for (const pattern of patterns) {
    const match = hrefs.find((href) => pattern.test(href));
    if (match) return match;
  }
  return undefined;
}

async function imageAssets(id) {
  const data = await getJson(`${API}/asset/${encodeURIId(id)}`);
  const hrefs = (data.collection?.items ?? []).map((item) => item.href);
  const large = pickAsset(hrefs, [/~large\.jpg$/, /~orig\.jpg$/, /~medium\.jpg$/]);
  const thumb = pickAsset(hrefs, [/~thumb\.jpg$/, /~medium\.jpg$/, /~large\.jpg$/]);
  return { large, thumb };
}

function encodeURIId(id) {
  return encodeURIComponent(id);
}

async function download(url, target) {
  if (existsSync(target)) return { skipped: true, bytes: 0 };
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok || !response.body) throw new Error(`GET ${url} -> ${response.status}`);
  const temp = `${target}.part`;
  await pipeline(Readable.fromWeb(response.body), createWriteStreamSync(temp));
  await rename(temp, target);
  return { skipped: false, bytes: 0 };
}

async function optimise(target, width, quality) {
  const { default: sharp } = await import("sharp");
  const tmp = `${target}.tmp`;
  const meta = await sharp(target).metadata();
  if (!meta.width || !meta.width > width) {
    await sharp(target).jpeg({ quality, mozjpeg: true, progressive: true }).toFile(tmp);
  } else {
    await sharp(target)
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality, mozjpeg: true, progressive: true })
      .toFile(tmp);
  }
  await rename(tmp, target);
}

async function searchMeta(id) {
  try {
    const data = await getJson(`${API}/search?q=${encodeURIComponent(id)}`);
    const items = data.collection?.items ?? [];
    const exact = items.find((item) => item.data?.[0]?.nasa_id === id);
    const meta = (exact ?? items[0])?.data?.[0];
    if (!meta) return null;
    return {
      title: meta.title ?? id,
      description: meta.description ?? "",
      center: meta.center ?? "NASA",
      secondaryCreator: meta.secondary_creator ?? "",
      photographer: meta.photographer ?? "",
      dateCreated: meta.date_created ?? "",
      keywords: (meta.keywords ?? []).slice(0, 12),
    };
  } catch {
    return null;
  }
}

async function main() {
  const plan = JSON.parse(await readFile(PLAN_PATH, "utf8"));
  await mkdir(IMAGE_DIR, { recursive: true });
  await mkdir(dirname(MANIFEST_PATH), { recursive: true });

  const manifest = {
    generatedAt: new Date().toISOString(),
    accessedAt: ACCESSED,
    libraryUrl: LIBRARY,
    apiUrl: API,
    usageNote:
      "NASA media published on images.nasa.gov is generally not subject to copyright and may not be used to imply endorsement. Third-party credited assets keep their original credit line.",
    images: {},
  };

  for (const entry of plan.images) {
    const id = entry.id;
    if (manifest.images[id]) continue;
    try {
      const { large, thumb } = await imageAssets(id);
      if (!large) {
        console.warn(`! no asset for ${id}`);
        continue;
      }
      const imagePath = join(IMAGE_DIR, `${id}.jpg`);
      const thumbPath = join(IMAGE_DIR, `${id}-thumb.jpg`);
      await download(large, imagePath);
      if (thumb && thumb !== large) await download(thumb, thumbPath);
      await optimise(imagePath, 1800, 80);
      await optimise(thumbPath, 520, 72);
      const meta = await searchMeta(id);
      manifest.images[id] = {
        nasaId: id,
        story: entry.story,
        role: "support",
        title: meta?.title ?? id,
        description: meta?.description ?? "",
        center: meta?.center ?? "NASA",
        secondaryCreator: meta?.secondaryCreator ?? "",
        photographer: meta?.photographer ?? "",
        dateCreated: meta?.dateCreated ?? "",
        keywords: meta?.keywords ?? [],
        local: `/images/echoes/extra/${id}.jpg`,
        thumb: `/images/echoes/extra/${id}-thumb.jpg`,
        sourceUrl: `${LIBRARY}/details/${id}`,
        assetUrl: large.replace(/^http:/, "https:"),
        accessedAt: ACCESSED,
      };
      console.log(`extra  ${id} -> ${entry.story}`);
    } catch (error) {
      console.warn(`! ${id}: ${error.message}`);
    }
  }

  await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  console.log(`\nmanifest written to ${MANIFEST_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
