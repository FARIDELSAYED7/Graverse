import { existsSync, mkdirSync } from "node:fs";
import puppeteer from "puppeteer-core";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:5173";
const OUT = process.env.OUT ?? "/tmp/graverse-shots/scenes";
const W = Number(process.env.W ?? 1280);
const H = Number(process.env.H ?? 800);
const slug = process.argv[2] ?? "sojourner";

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
await page.goto(`${BASE_URL}/stories/${slug}`, { waitUntil: "networkidle2", timeout: 60000 });
await new Promise((r) => setTimeout(r, 1500));

const count = await page.evaluate(() => document.querySelectorAll("[data-scene]").length);

for (let i = 0; i < count; i += 1) {
  await page.evaluate((index) => {
    const node = document.querySelectorAll("[data-scene]")[index];
    const header = document.querySelector("body > header");
    const offset = header ? header.getBoundingClientRect().height + 8 : 72;
    window.scrollTo({ top: node.getBoundingClientRect().top + window.scrollY - offset, behavior: "instant" });
  }, i);
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: `${OUT}/${slug}-${String(i).padStart(2, "0")}.png` });
}

console.log(`${count} scenes captured for ${slug}`);
await browser.close();
