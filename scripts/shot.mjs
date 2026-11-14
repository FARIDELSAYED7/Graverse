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

// usage: node scripts/shot.mjs <path> <name> [width] [height] [scrollY]
const [, , route = "/stories", name = "shot", w = "1440", h = "900", scrollY = "0"] =
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
await new Promise((r) => setTimeout(r, 1200));
if (Number(scrollY)) {
  await page.evaluate((y) => window.scrollTo(0, y), Number(scrollY));
  await new Promise((r) => setTimeout(r, 900));
}
await page.screenshot({ path: `${OUT}/${name}.png` });
console.log(JSON.stringify({ out: `${OUT}/${name}.png`, errors: errors.slice(0, 10) }, null, 2));
await browser.close();
