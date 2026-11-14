import { existsSync, mkdirSync } from "node:fs";
import puppeteer from "puppeteer-core";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:5173";
const OUT = process.env.OUT ?? "/tmp/graverse-shots/heroes";
const W = Number(process.env.W ?? 1280);
const H = Number(process.env.H ?? 800);

const STORIES = [
  "sojourner", "opportunity", "spirit", "phoenix", "insight", "ingenuity",
  "apollo-11-lm-descent-stage", "apollo-lunar-surface-experiments",
  "lunar-roving-vehicle", "surveyor-landers", "viking-1-lander",
  "viking-2-lander", "dawn", "near-shoemaker", "kepler", "pioneer-10",
  "pioneer-11", "first-machines-on-the-moon", "evolution-of-mars-rovers",
  "journey-beyond-the-solar-system",
];

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

mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: chromePath(),
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const page = await browser.newPage();
await page.setViewport({ width: W, height: H });

const scrollTo = Number(process.env.SCROLL ?? 0);

for (const slug of STORIES) {
  await page.goto(`${BASE_URL}/stories/${slug}`, { waitUntil: "networkidle2", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1200));
  if (scrollTo) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), scrollTo);
    await new Promise((r) => setTimeout(r, 900));
  }
  await page.screenshot({ path: `${OUT}/${slug}.png` });
  console.log("shot", slug);
}

await browser.close();
