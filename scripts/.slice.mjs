import sharp from "sharp";
import { mkdirSync } from "node:fs";

const file = process.argv[2];
const out = process.argv[3];
const chunk = Number(process.argv[4] ?? 2200);
mkdirSync(out, { recursive: true });
const meta = await sharp(file).metadata();
const h = meta.height;
const w = meta.width;
let i = 0;
for (let y = 0; y < h; y += chunk) {
  const height = Math.min(chunk, h - y);
  await sharp(file)
    .extract({ left: 0, top: y, width: w, height })
    .toFile(`${out}/part-${String(i).padStart(2, "0")}.png`);
  i += 1;
}
console.log("sliced", i, "parts of", w, "x", h);
