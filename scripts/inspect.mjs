import { existsSync } from "node:fs";
import puppeteer from "puppeteer-core";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:5173";

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

const route = process.argv[2] ?? "/stories/sojourner";
const width = Number(process.argv[3] ?? 1440);
const height = Number(process.argv[4] ?? 900);

const browser = await puppeteer.launch({
  executablePath: chromePath(),
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const page = await browser.newPage();
await page.setViewport({ width, height });
await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle2", timeout: 60000 });
await new Promise((r) => setTimeout(r, 1500));

const info = await page.evaluate(() => {
  const scenes = [...document.querySelectorAll("[data-scene]")].map((el) => ({
    id: el.id,
    tone: el.getAttribute("data-tone"),
    layout: el.className.replace("scene ", "").split(" ")[0],
    top: Math.round(el.getBoundingClientRect().top + window.scrollY),
    height: Math.round(el.getBoundingClientRect().height),
    imgs: el.querySelectorAll("img").length,
    brokenImgs: [...el.querySelectorAll("img")].filter(
      (img) => img.complete && img.naturalWidth === 0
    ).length,
  }));
  const header = document.querySelector("body > header");
  return {
    scenes,
    headerHeight: header ? Math.round(header.getBoundingClientRect().height) : null,
    docHeight: document.documentElement.scrollHeight,
    viewport: window.innerHeight,
  };
});
console.log(JSON.stringify(info, null, 1));
await browser.close();
