import { existsSync, mkdirSync } from "node:fs";
import puppeteer from "puppeteer-core";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = process.env.OUT ?? "/tmp/graverse-shots";

function chromePath() {
  const candidates = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome",
  ].filter(Boolean);
  const found = candidates.find((c) => existsSync(c));
  if (!found) throw new Error("No Chrome found");
  return found;
}

// usage: node scripts/shoot.mjs <path> <prefix> [width] [height] [maxShots]
const [, , route = "/stories", prefix = "shot", w = "1440", h = "900", max = "40"] =
  process.argv;

mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: chromePath(),
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const page = await browser.newPage();
await page.setViewport({ width: Number(w), height: Number(h), deviceScaleFactor: 1 });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e.message)));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle2", timeout: 60000 });
await new Promise((r) => setTimeout(r, 1500));

const total = await page.evaluate(() => document.body.scrollHeight);
const vh = Number(h);
const shots = [];
let i = 0;
for (let y = 0; y < total && i < Number(max); y += Math.round(vh * 0.92)) {
  await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: "instant" }), y);
  await new Promise((r) => setTimeout(r, 700));
  const name = `${prefix}-${String(i).padStart(2, "0")}`;
  await page.screenshot({ path: `${OUT}/${name}.png` });
  const label = await page.evaluate(() => {
    const el = document.querySelector(".console__count");
    const active = document.querySelector(".cine-scene, .cine-open");
    return {
      counter: el?.textContent?.trim() ?? null,
      sceneId: active?.id ?? null,
      scrollY: Math.round(window.scrollY),
    };
  });
  shots.push({ name, ...label });
  i += 1;
}
console.log(JSON.stringify({ total, shots, errors: errors.slice(0, 10) }, null, 2));
await browser.close();
