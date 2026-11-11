/**
 * Internal link integrity check.
 *
 * Crawls the rendered site, collects every internal link, and confirms that
 * each target resolves. A broken internal link is a dead end for a visitor,
 * which the blueprint forbids.
 *
 * Usage: node scripts/link-check.mjs   (BASE_URL defaults to http://localhost:3100)
 */
import { existsSync } from "node:fs";
import puppeteer from "puppeteer-core";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3100";
const START = process.env.LINK_START
  ? [process.env.LINK_START]
  : [
      "/",
      "/explorer",
      "/explorer?mode=destinations",
      "/explorer?mode=artifacts&view=list",
      "/explorer/solar-system",
      "/explorer/bodies",
      "/explorer/bodies/mars",
      "/explorer/deep-sky",
      "/museum",
      "/museum/apollo-11-lm-descent-stage",
      "/museum/missions",
      "/museum/agencies",
      "/academy",
      "/academy/lessons",
      "/academy/lessons/what-is-an-artifact",
      "/academy/journeys",
      "/academy/journeys/first-flight",
      "/academy/articles",
      "/academy/articles/the-grand-tour",
      "/academy/glossary",
      "/academy/progress",
      "/academy/achievements",
      "/academy/flashcards",
      "/academy/certificate",
      "/academy/build-rover",
      "/academy/robot-lab",
      "/academy/play",
      "/academy/play/rocket",
      "/academy/play/moon",
      "/academy/play/rover",
      "/mission-control",
      "/engineering",
      "/stories",
      "/simulations",
      "/research",
      "/compare",
      "/my-universe",
      "/sources",
      "/about",
      "/search?q=apollo",
    ];

function chromePath() {
  const candidates = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
  ].filter(Boolean);
  const found = candidates.find((candidate) => existsSync(candidate));
  if (!found) {
    throw new Error(
      "No Chrome/Chromium found. Set CHROME_PATH to a browser executable."
    );
  }
  return found;
}

const browser = await puppeteer.launch({
  executablePath: chromePath(),
  headless: "new",
  args: ["--no-sandbox"],
});

const page = await browser.newPage();
const internal = new Set();
const external = new Set();

for (const path of START) {
  await page.goto(`${BASE_URL}${path}`, { waitUntil: "networkidle0", timeout: 60000 });
  const links = await page.$$eval("a[href]", (nodes) =>
    nodes.map((node) => node.getAttribute("href") ?? "")
  );
  for (const href of links) {
    if (!href || href.startsWith("#")) continue;
    if (href.startsWith("http")) {
      const url = new URL(href, BASE_URL);
      if (url.origin === new URL(BASE_URL).origin) {
        internal.add(`${url.pathname}${url.search}`);
      } else {
        external.add(url.origin);
      }
      continue;
    }
    if (href.startsWith("mailto:") || href.startsWith("tel:")) continue;
    internal.add(href);
  }
}

await browser.close();

const targets = [...internal].sort();
const broken = [];
for (const target of targets) {
  const response = await fetch(`${BASE_URL}${target}`, {
    redirect: "manual",
  });
  if (response.status >= 400) {
    broken.push(`${target} → ${response.status}`);
  }
}

console.log(`Crawled ${START.length} pages`);
console.log(`Found ${targets.length} unique internal links`);
console.log(`External origins referenced: ${[...external].sort().join(", ")}`);
if (broken.length > 0) {
  console.log("");
  console.log(`Broken internal links (${broken.length}):`);
  for (const item of broken) console.log(`  ${item}`);
  process.exit(1);
}
console.log("All internal links resolve.");
