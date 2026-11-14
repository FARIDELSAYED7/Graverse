#!/usr/bin/env node
/**
 * Records the intrinsic pixel size of every image shipped in `public/`.
 *
 * The cinematic surfaces size their frames from these numbers, so a plate
 * reserves its space before the file arrives and the page never shifts
 * under the reader mid-scroll.
 *
 * Usage: node scripts/gen-media-dimensions.mjs
 */

import { readdir, writeFile } from "node:fs/promises";
import { join, relative, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const PUBLIC_DIR = join(ROOT, "public");
const OUT = join(ROOT, "src", "data", "echoes", "media-dimensions.json");

const EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (EXTS.has(entry.name.slice(entry.name.lastIndexOf(".")).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

const files = await walk(PUBLIC_DIR);
const dimensions = {};
for (const file of files) {
  try {
    const meta = await sharp(file).metadata();
    if (!meta.width || !meta.height) continue;
    const key = `/${relative(PUBLIC_DIR, file).split("\\").join("/")}`;
    dimensions[key] = { w: meta.width, h: meta.height };
  } catch {
    // A file sharp cannot read is simply left out of the map.
  }
}

await writeFile(OUT, `${JSON.stringify(dimensions, null, 0)}\n`, "utf8");
console.log(`${Object.keys(dimensions).length} dimensions -> ${OUT}`);
