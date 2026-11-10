import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

/**
 * Generates uniform, lightweight textures for the 3D exhibition hall.
 * The source JPGs are the same NASA images used by the museum records.
 * Destination backdrops are excluded because they are full-bleed backgrounds,
 * not exhibit portraits.
 */
const sourceDir = path.resolve("public/images");
const outDir = path.join(sourceDir, "gallery");
await mkdir(outDir, { recursive: true });

const files = (await readdir(sourceDir)).filter(
  (file) => file.endsWith(".jpg") && !file.startsWith("destination-")
);

for (const file of files) {
  const slug = file.replace(/\.jpg$/, "");
  await sharp(path.join(sourceDir, file))
    .rotate()
    .resize(640, 800, { fit: "cover", position: "centre" })
    .webp({ quality: 80 })
    .toFile(path.join(outDir, `${slug}.webp`));
}

console.log(`Generated ${files.length} gallery textures in public/images/gallery`);
