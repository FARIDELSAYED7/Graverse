/**
 * Builds a contact sheet of the supplementary ECHOES imagery so the frames
 * can be reviewed before they are wired into the presentation.
 *
 * Usage: node scripts/contact-sheet.mjs [dir] [out] [cols] [thumbWidth]
 */
import { readdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const dir = process.argv[2] ?? "public/images/echoes/extra";
const out = process.argv[3] ?? "/tmp/graverse-shots/contact.jpg";
const cols = Number(process.argv[4] ?? 6);
const tw = Number(process.argv[5] ?? 300);

const files = readdirSync(dir)
  .filter((f) => /\.(jpg|jpeg|png)$/i.test(f) && !f.includes("-thumb"))
  .sort();

const tiles = [];
for (const file of files) {
  const buf = await sharp(join(dir, file))
    .resize({ width: tw })
    .jpeg({ quality: 70 })
    .toBuffer();
  const meta = await sharp(buf).metadata();
  tiles.push({ file, buf, height: meta.height, width: meta.width });
}

const rows = [];
for (let i = 0; i < tiles.length; i += cols) rows.push(tiles.slice(i, i + cols));

const composites = [];
let y = 0;
for (const row of rows) {
  const rowHeight = Math.max(...row.map((t) => t.height));
  let x = 0;
  for (const tile of row) {
    composites.push({
      input: tile.buf,
      left: x,
      top: y + Math.round((rowHeight - tile.height) / 2),
    });
    x += tile.width + 8;
  }
  y += rowHeight + 8;
}

const sheetWidth = cols * (tw + 8);
const sheetHeight = Math.max(1, y);
await sharp({
  create: {
    width: sheetWidth,
    height: sheetHeight,
    channels: 3,
    background: "#1b1b1b",
  },
})
  .composite(composites)
  .jpeg({ quality: 72 })
  .toFile(out);

console.log(`${files.length} tiles -> ${out}`);
