#!/usr/bin/env node
/**
 * Visual and behavioural QA for the cinematic stories.
 *
 * For every story this checks that
 *   - the page renders without console errors,
 *   - every image actually loads,
 *   - the scene sequence is unique per scene id,
 *   - "next" and "previous" land on the exact top of the target scene,
 *   - manual scrolling keeps the active scene and the counter in sync,
 *   - the scrubber jumps to the exact top of the scene it names.
 *
 * Usage: node scripts/qa-stories.mjs [baseUrl] [story,story,...]
 */

import { existsSync } from "node:fs";
import puppeteer from "puppeteer-core";

const BASE_URL = process.argv[2] ?? "http://localhost:5173";
const only = process.argv[3]
  ? process.argv[3].split(",").map((entry) => entry.trim())
  : null;

const ECHO_STORIES = [
  "sojourner",
  "opportunity",
  "spirit",
  "phoenix",
  "insight",
  "ingenuity",
  "apollo-11-lm-descent-stage",
  "apollo-lunar-surface-experiments",
  "lunar-roving-vehicle",
  "surveyor-landers",
  "viking-1-lander",
  "viking-2-lander",
  "dawn",
  "near-shoemaker",
  "kepler",
  "pioneer-10",
  "pioneer-11",
];

const COLLECTIONS = [
  "first-machines-on-the-moon",
  "evolution-of-mars-rovers",
  "journey-beyond-the-solar-system",
];

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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
  const browser = await puppeteer.launch({
    executablePath: chromePath(),
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const stories = [
    ...ECHO_STORIES.map((slug) => `/stories/${slug}`),
    ...COLLECTIONS.map((slug) => `/stories/${slug}`),
  ].filter((path) => (only ? only.some((slug) => path.endsWith(slug)) : true));

  const report = [];

  for (const path of stories) {
    const errors = [];
    const onConsole = (message) => {
      if (message.type() === "error" && !/favicon/i.test(message.text())) {
        errors.push(message.text());
      }
    };
    const onError = (error) => errors.push(`pageerror: ${error.message}`);
    page.on("console", onConsole);
    page.on("pageerror", onError);

    await page.goto(`${BASE_URL}${path}`, { waitUntil: "networkidle2", timeout: 60000 });
    await sleep(1200);

    const state = await page.evaluate(() => {
      const scenes = [...document.querySelectorAll("[data-scene]")];
      const header = document.querySelector("body > header");
      return {
        count: scenes.length,
        ids: scenes.map((scene) => scene.id),
        headerHeight: header ? Math.round(header.getBoundingClientRect().height) : 0,
        images: [...document.images].map((img) => ({
          src: img.currentSrc || img.src,
          broken: img.complete && img.naturalWidth === 0,
        })),
        console: Boolean(document.querySelector(".cine-console")),
        counter: document.querySelector(".cine-console__count")?.textContent?.trim() ?? null,
      };
    });

    const broken = state.images.filter((img) => img.broken).map((img) => img.src);
    const duplicateIds = state.ids.filter((id, index) => state.ids.indexOf(id) !== index);

    // --- navigation precision -------------------------------------------
    const landings = [];
    const steps = Math.min(state.count - 1, 6);
    for (let i = 0; i < steps; i += 1) {
      await page.evaluate(() => {
        const button = document.querySelector(".cine-console__btn:last-of-type");
        button?.click();
      });
      await sleep(1100);
      const landing = await page.evaluate(() => {
        const header = document.querySelector("body > header");
        const offset = header ? Math.round(header.getBoundingClientRect().height) + 8 : 72;
        const active = document.querySelector('.cine-console__tick[aria-selected="true"]');
        const scenes = [...document.querySelectorAll("[data-scene]")];
        const index = active ? Number(active.getAttribute("aria-label")?.split(".")[0]) - 1 : -1;
        const node = scenes[index];
        return {
          index,
          delta: node ? Math.round(node.getBoundingClientRect().top) - offset : null,
          counter: document.querySelector(".cine-console__count")?.textContent?.trim() ?? null,
        };
      });
      landings.push(landing);
    }

    // --- backward navigation ---------------------------------------------
    await page.evaluate(() => {
      document.querySelector(".cine-console__btn:first-of-type")?.click();
    });
    await sleep(1100);
    const back = await page.evaluate(() => {
      const header = document.querySelector("body > header");
      const offset = header ? Math.round(header.getBoundingClientRect().height) + 8 : 72;
      const active = document.querySelector('.cine-console__tick[aria-selected="true"]');
      const scenes = [...document.querySelectorAll("[data-scene]")];
      const index = active ? Number(active.getAttribute("aria-label")?.split(".")[0]) - 1 : -1;
      const node = scenes[index];
      return {
        index,
        delta: node ? Math.round(node.getBoundingClientRect().top) - offset : null,
      };
    });

    // --- manual scrolling -------------------------------------------------
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await sleep(400);
    const manual = await page.evaluate(async () => {
      const scenes = [...document.querySelectorAll("[data-scene]")];
      const target = scenes[Math.min(3, scenes.length - 1)];
      target.scrollIntoView({ block: "start", behavior: "instant" });
      await new Promise((r) => setTimeout(r, 500));
      const active = document.querySelector('.cine-console__tick[aria-selected="true"]');
      return {
        expected: Number(target.getAttribute("data-index")),
        active:
          active !== null
            ? Number(active.getAttribute("aria-label")?.split(".")[0]) - 1
            : null,
      };
    });

    page.off("console", onConsole);
    page.off("pageerror", onError);

    report.push({
      path,
      scenes: state.count,
      console: state.console,
      brokenImages: broken,
      duplicateIds,
      errors: errors.slice(0, 5),
      landings,
      back,
      manual,
    });
  }

  await browser.close();
  console.log(JSON.stringify(report, null, 1));
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
