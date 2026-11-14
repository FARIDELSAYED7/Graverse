import { existsSync } from "node:fs";
import { readdirSync } from "node:fs";
import puppeteer from "puppeteer-core";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

function chromePath() {
  const candidates = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
  ].filter(Boolean);
  const found = candidates.find((c) => existsSync(c));
  if (!found) throw new Error("No Chrome found");
  return found;
}

const slugs = readdirSync("src/data/echoes")
  .filter((f) => f.endsWith(".ts") && f !== "schema.ts" && f !== "extra-media.ts")
  .map((f) => f.replace(/\.ts$/, ""));

const browser = await puppeteer.launch({
  executablePath: chromePath(),
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

for (const width of [1280, 390]) {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 900 });
  for (const slug of slugs) {
    try {
      await page.goto(`${BASE_URL}/stories/${slug}`, { waitUntil: "networkidle2", timeout: 45000 });
      await new Promise((r) => setTimeout(r, 400));
      const info = await page.evaluate(() =>
        [...document.querySelectorAll("dl.factstrip")].map((el) => {
          const cs = getComputedStyle(el);
          return {
            cls: el.className.replace("factstrip ", ""),
            items: el.children.length,
            tracks: cs.gridTemplateColumns.split(" ").length,
            rows: cs.gridTemplateRows.split(" ").length,
            cols: cs.gridTemplateColumns,
            panel: el.classList.contains("factstrip--panel"),
          };
        }),
      );
      for (const f of info) {
        const bad = !f.panel && f.tracks !== f.items;
        if (bad) console.log(`[${width}] ${slug} MISMATCH`, JSON.stringify(f));
      }
      const counts = info.map((f) => `${f.items}/${f.tracks}${f.panel ? "(panel)" : ""}`);
      console.log(`[${width}] ${slug}: ${counts.join(" ")}`);
    } catch (err) {
      console.log(`[${width}] ${slug}: ERROR ${err.message.slice(0, 80)}`);
    }
  }
  await page.close();
}

await browser.close();
