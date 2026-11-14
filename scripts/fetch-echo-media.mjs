#!/usr/bin/env node
/**
 * ECHOES media retrieval.
 *
 * Downloads the curated NASA Image and Video Library assets listed in
 * `scripts/echo-media-plan.json` into `public/` and writes a local media
 * manifest to `src/data/echoes/media-manifest.json`.
 *
 * Why a manifest instead of calling the NASA API at render time:
 *   - the experience must not depend on an external request per image;
 *   - every asset keeps its NASA id, original source URL, credit line and
 *     the date the record was verified, which the UI shows next to the media.
 *
 * Usage:
 *   node scripts/fetch-echo-media.mjs           # download + write manifest
 *   node scripts/fetch-echo-media.mjs --manifest # only refresh the manifest
 *
 * The script is idempotent: existing files are skipped unless --force is
 * passed. NASA media published on images.nasa.gov is generally not subject
 * to copyright and may not be used to imply endorsement of any commercial
 * product or service. Third-party credited assets keep their original credit
 * line in the manifest so the UI can show it.
 */

import { createWriteStream } from "node:fs";
import { mkdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const PLAN_PATH = join(HERE, "echo-media-plan.json");
const IMAGE_DIR = join(ROOT, "public", "images", "echoes");
const VIDEO_DIR = join(ROOT, "public", "media", "echoes");
const MANIFEST_PATH = join(ROOT, "src", "data", "echoes", "media-manifest.json");

const API = "https://images-api.nasa.gov";
const LIBRARY = "https://images.nasa.gov";
const ACCESSED = process.env.ECHO_MEDIA_ACCESSED ?? "2026-11-13";

const FORCE = process.argv.includes("--force");
const MANIFEST_ONLY = process.argv.includes("--manifest");

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

/**
 * NASA serves very large originals. Everything is re-encoded to a sensible
 * web size with mozjpeg so the story pages stay fast on a school laptop.
 */
async function optimiseImage(path, { width, quality }) {
  const info = await stat(path);
  if (info.size < 260 * 1024) return info.size;
  const { default: sharp } = await import("sharp");
  const tmp = `${path}.opt`;
  await sharp(path)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true, progressive: true })
    .toFile(tmp);
  await rename(tmp, path);
  const after = await stat(path);
  return after.size;
}

async function getJson(url) {
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`GET ${url} -> ${response.status}`);
  }
  return response.json();
}

async function download(url, target) {
  if (!FORCE && (await exists(target))) return { skipped: true, bytes: 0 };
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok || !response.body) {
    throw new Error(`GET ${url} -> ${response.status}`);
  }
  const temp = `${target}.part`;
  await pipeline(Readable.fromWeb(response.body), createWriteStream(temp));
  await rename(temp, target);
  const info = await stat(target);
  return { skipped: false, bytes: info.size };
}

function pickAsset(hrefs, patterns) {
  for (const pattern of patterns) {
    const match = hrefs.find((href) => pattern.test(href));
    if (match) return match;
  }
  return undefined;
}

async function imageAssets(id) {
  const data = await getJson(`${API}/asset/${encodeURIComponent(id)}`);
  const hrefs = (data.collection?.items ?? []).map((item) => item.href);
  const large =
    pickAsset(hrefs, [/~large\.jpg$/, /~orig\.jpg$/, /~medium\.jpg$/, /~small\.jpg$/, /\.jpg$/]) ?? "";
  const thumb = pickAsset(hrefs, [/~thumb\.jpg$/, /~small\.jpg$/, /~medium\.jpg$/, /\.jpg$/]) ?? "";
  const meta = hrefs.find((href) => /metadata\.json$/.test(href)) ?? "";
  return { large, thumb, meta };
}

async function videoAssets(id) {
  const data = await getJson(`${API}/asset/${encodeURIComponent(id)}`);
  const hrefs = (data.collection?.items ?? []).map((item) => item.href);
  const mp4 =
    pickAsset(hrefs, [/~mobile\.mp4$/, /~preview\.mp4$/, /~small\.mp4$/, /~medium\.mp4$/, /~orig\.mp4$/]) ?? "";
  const original = pickAsset(hrefs, [/~orig\.mp4$/, /~medium\.mp4$/]) ?? "";
  const poster =
    pickAsset(hrefs, [/~medium\.jpg$/, /~large\.jpg$/, /~thumb\.jpg$/, /~small\.jpg$/]) ?? "";
  const captions = pickAsset(hrefs, [/\.vtt$/, /\.srt$/]) ?? "";
  return { mp4, original, poster, captions };
}

async function searchMeta(id) {
  try {
    const data = await getJson(`${API}/search?q=${encodeURIComponent(id)}`);
    const items = data.collection?.items ?? [];
    const match =
      items.find((item) => item.data?.[0]?.nasa_id === id) ?? items[0];
    const meta = match?.data?.[0];
    if (!meta) return null;
    return {
      title: meta.title ?? "",
      description: meta.description ?? "",
      center: meta.center ?? "NASA",
      secondaryCreator: meta.secondary_creator ?? "",
      photographer: meta.photographer ?? "",
      dateCreated: meta.date_created ?? "",
      mediaType: meta.media_type ?? "image",
      keywords: (meta.keywords ?? []).slice(0, 12),
      album: meta.album ?? [],
    };
  } catch {
    return null;
  }
}

async function main() {
  const plan = JSON.parse(await readFile(PLAN_PATH, "utf8"));
  await mkdir(IMAGE_DIR, { recursive: true });
  await mkdir(VIDEO_DIR, { recursive: true });
  await mkdir(dirname(MANIFEST_PATH), { recursive: true });

  const manifest = {
    generatedAt: new Date().toISOString(),
    accessedAt: ACCESSED,
    libraryUrl: LIBRARY,
    apiUrl: API,
    usageNote:
      "NASA media published on images.nasa.gov is generally not subject to copyright and may not be used to imply endorsement. Third-party credited assets keep their original credit line.",
    images: {},
    videos: {},
  };

  for (const entry of plan.images) {
    const { large, thumb } = await imageAssets(entry.id);
    if (!large) {
      console.warn(`! no image asset for ${entry.id}`);
      continue;
    }
    const imagePath = join(IMAGE_DIR, `${entry.id}.jpg`);
    const thumbPath = join(IMAGE_DIR, `${entry.id}-thumb.jpg`);
    if (!MANIFEST_ONLY) {
      await download(large, imagePath);
      if (thumb && thumb !== large) await download(thumb, thumbPath);
      await optimiseImage(imagePath, { width: 1600, quality: 78 });
      await optimiseImage(thumbPath, { width: 480, quality: 70 });
    }
    const meta = await searchMeta(entry.id);
    manifest.images[entry.id] = {
      nasaId: entry.id,
      story: entry.story,
      role: entry.role,
      title: meta?.title ?? entry.id,
      description: meta?.description ?? "",
      center: meta?.center ?? "NASA",
      secondaryCreator: meta?.secondaryCreator ?? "",
      photographer: meta?.photographer ?? "",
      dateCreated: meta?.dateCreated ?? "",
      keywords: meta?.keywords ?? [],
      local: `/images/echoes/${entry.id}.jpg`,
      thumb: `/images/echoes/${entry.id}-thumb.jpg`,
      sourceUrl: `${LIBRARY}/details/${entry.id}`,
      assetUrl: large.replace(/^http:/, "https:"),
      accessedAt: ACCESSED,
    };
    console.log(`image  ${entry.id} -> ${entry.story}/${entry.role}`);
  }

  for (const entry of plan.videos) {
    const { mp4, original, poster, captions } = await videoAssets(entry.id);
    if (!mp4) {
      console.warn(`! no video asset for ${entry.id}`);
      continue;
    }
    const videoPath = join(VIDEO_DIR, `${entry.id}.mp4`);
    const posterPath = join(IMAGE_DIR, `${entry.id}-poster.jpg`);
    if (!MANIFEST_ONLY) {
      await download(mp4, videoPath);
      if (poster) await download(poster, posterPath);
      await optimiseImage(posterPath, { width: 1280, quality: 76 });
    }
    const meta = await searchMeta(entry.id);
    manifest.videos[entry.id] = {
      nasaId: entry.id,
      story: entry.story,
      role: entry.role,
      title: meta?.title ?? entry.id,
      description: meta?.description ?? "",
      center: meta?.center ?? "NASA",
      secondaryCreator: meta?.secondaryCreator ?? "",
      dateCreated: meta?.dateCreated ?? "",
      keywords: meta?.keywords ?? [],
      local: `/media/echoes/${entry.id}.mp4`,
      poster: `/images/echoes/${entry.id}-poster.jpg`,
      originalUrl: original.replace(/^http:/, "https:"),
      captionsUrl: captions.replace(/^http:/, "https:"),
      sourceUrl: `${LIBRARY}/details/${entry.id}`,
      assetUrl: mp4.replace(/^http:/, "https:"),
      accessedAt: ACCESSED,
    };
    console.log(`video  ${entry.id} -> ${entry.story}/${entry.role}`);
  }

  await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  console.log(`\nmanifest written to ${MANIFEST_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
