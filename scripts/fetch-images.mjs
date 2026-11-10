import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const outDir = path.resolve("public/images");
await mkdir(outDir, { recursive: true });

const images = [
  { slug: "apollo-11-eagle", id: "as11-44-6642" },
  { slug: "apollo-17-lrv", id: "as17-147-22527" },
  { slug: "apollo-15-lrrr", id: "PIA13037" },
  { slug: "perseverance", id: "PIA26344" },
  { slug: "curiosity", id: "PIA24173" },
  { slug: "ingenuity", id: "PIA25881" },
  { slug: "insight", id: "PIA22228" },
  { slug: "opportunity", id: "PIA22222" },
  { slug: "mro", id: "PIA04758" },
  { slug: "moxie", id: "PIA23154" },
  { slug: "voyager-1", id: "PIA17462" },
  { slug: "voyager-2", id: "PIA21839" },
  { slug: "new-horizons", id: "PIA19948" },
  { slug: "cassini", id: "PIA04233" },
];

async function pickAsset(id) {
  const res = await fetch(`https://images-api.nasa.gov/asset/${id}`);
  if (!res.ok) throw new Error(`asset failed ${id} ${res.status}`);
  const json = await res.json();
  const hrefs = json.collection.items.map((i) => i.href);
  return (
    hrefs.find((h) => h.includes("~large.jpg")) ||
    hrefs.find((h) => h.includes("~medium.jpg")) ||
    hrefs.find((h) => h.includes("~orig.jpg")) ||
    hrefs.find((h) => h.endsWith(".jpg"))
  );
}

async function download(slug, id) {
  const url = await pickAsset(id);
  if (!url) throw new Error(`no jpg asset for ${id}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download failed ${id} ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const meta = await sharp(buf).metadata();
  const base = sharp(buf).rotate();
  await base
    .clone()
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(outDir, `${slug}.webp`));
  await base
    .clone()
    .resize({ width: 640, height: 640, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(path.join(outDir, `${slug}-thumb.webp`));
  console.log(`${slug}: ${meta.width}x${meta.height} <- ${url.split("/").pop()}`);
}

async function downloadDirect(slug, url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download failed ${slug} ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const base = sharp(buf).rotate();
  await base
    .clone()
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(outDir, `${slug}.webp`));
  await base
    .clone()
    .resize({ width: 640, height: 640, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(path.join(outDir, `${slug}-thumb.webp`));
  console.log(`${slug}: direct <- ${url.split("/").pop()}`);
}

for (const { slug, id } of images) {
  try {
    await download(slug, id);
  } catch (err) {
    console.error(err.message);
  }
}

// Pioneer 10 artist concept from NASA Science
try {
  await downloadDirect(
    "pioneer-10",
    "https://science.nasa.gov/wp-content/uploads/2023/04/jupiter_pioneer_10_art-jpg.webp"
  );
} catch (err) {
  console.error(err.message);
}

// Destination supporting imagery
const extra = [
  { slug: "moon", id: "as11-44-6550" },
  { slug: "mars", id: "PIA04304" },
  { slug: "deep-space", id: "PIA21839" },
];
for (const { slug, id } of extra) {
  try {
    await download(slug, id);
  } catch (err) {
    console.error(err.message);
  }
}
