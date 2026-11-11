import { existsSync } from "node:fs";
import { AxePuppeteer } from "@axe-core/puppeteer";
import puppeteer from "puppeteer-core";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3100";

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

const pages = [
  "/",
  "/academy",
  "/academy/journeys",
  "/academy/journeys/first-flight",
  "/academy/lessons",
  "/academy/lessons/our-neighbor-the-moon",
  "/academy/articles",
  "/academy/articles/the-grand-tour",
  "/academy/glossary",
  "/academy/progress",
  "/academy/robot-lab",
  "/museum",
  "/museum/apollo-11-lm-descent-stage",
  "/museum/missions",
  "/museum/missions/apollo-11",
  "/museum/agencies",
  "/museum/agencies/nasa",
  "/explorer",
  "/explorer?mode=destinations",
  "/explorer?mode=artifacts&view=list",
  "/explorer/solar-system",
  "/explorer/bodies",
  "/explorer/bodies/mars",
  "/explorer/deep-sky",
  "/explorer/deep-sky/orion-nebula",
  "/search?q=apollo",
  "/sources",
  "/about",
  "/this-route-does-not-exist",
];

const axePages = [
  "/",
  "/academy",
  "/academy/journeys/first-flight",
  "/academy/lessons/our-neighbor-the-moon",
  "/academy/articles/the-grand-tour",
  "/academy/glossary",
  "/academy/progress",
  "/academy/robot-lab",
  "/museum",
  "/museum/apollo-11-lm-descent-stage",
  "/museum/missions/apollo-11",
  "/museum/agencies/nasa",
  "/explorer",
  "/explorer?mode=destinations&view=list",
  "/explorer/solar-system",
  "/explorer/bodies/mars",
  "/explorer/deep-sky/orion-nebula",
  "/sources",
  "/search?q=apollo",
  "/about",
];

const redirects = [
  ["/explore?mode=destinations", "/explorer?mode=destinations"],
  ["/kids", "/academy"],
  ["/museum/timeline", "/explorer"],
];

async function main() {
  const browser = await puppeteer.launch({
    executablePath: chromePath(),
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  const failures = [];
  const consoleErrors = [];

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });
    let expectNotFound = false;
    page.on("console", (message) => {
      if (message.type() === "error" && !expectNotFound) {
        const text = message.text();
        if (!/favicon|Download the React DevTools/i.test(text)) {
          consoleErrors.push(text);
        }
      }
    });
    page.on("pageerror", (error) => {
      consoleErrors.push(`pageerror: ${error.message}`);
    });

    let checked = 0;
    for (const path of pages) {
      expectNotFound = path === "/this-route-does-not-exist";
      const response = await page.goto(`${BASE_URL}${path}`, {
        waitUntil: "networkidle2",
        timeout: 30000,
      });
      checked += 1;
      const status = response?.status() ?? 0;
      if (path === "/this-route-does-not-exist") {
        if (status !== 404) failures.push(`${path}: expected 404, got ${status}`);
        continue;
      }
      if (status >= 400) {
        failures.push(`${path}: HTTP ${status}`);
        continue;
      }
      const data = await page.evaluate(() => ({
        title: document.title,
        h1: document.querySelector("h1")?.textContent ?? "",
        h1Count: document.querySelectorAll("h1").length,
        main: Boolean(document.querySelector("main")),
        bodyLength: document.body.innerText.length,
      }));
      if (!data.title.trim()) failures.push(`${path}: empty title`);
      if (!data.h1.trim()) failures.push(`${path}: missing h1`);
      if (data.h1Count !== 1) {
        failures.push(`${path}: expected exactly one h1, found ${data.h1Count}`);
      }
      if (!data.main) failures.push(`${path}: missing main landmark`);
      if (data.bodyLength < 120) failures.push(`${path}: suspiciously empty page`);
    }

    // Keyboard: the first Tab reaches the skip link, and Enter activates it.
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle2" });
    await page.keyboard.press("Tab");
    const firstFocus = await page.evaluate(() =>
      (document.activeElement?.textContent ?? "").trim()
    );
    if (!/skip to main content/i.test(firstFocus)) {
      failures.push(
        `keyboard: first Tab focused "${firstFocus}" instead of the skip link`
      );
    } else {
      await page.keyboard.press("Enter");
      await page.waitForFunction(() => location.hash === "#main-content", {
        timeout: 5000,
      });
    }

    // Keyboard: the mobile menu opens, moves focus inside, and closes on Escape.
    await page.setViewport({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/academy`, { waitUntil: "networkidle2" });
    await page.evaluate(() => {
      const button = Array.from(document.querySelectorAll("button")).find(
        (candidate) =>
          candidate.getAttribute("aria-label") === "Open navigation menu"
      );
      button?.focus();
    });
    await page.keyboard.press("Enter");
    const menuOpen = await page.evaluate(() => {
      const button = Array.from(document.querySelectorAll("button")).find(
        (candidate) =>
          candidate.getAttribute("aria-expanded") !== null &&
          /navigation menu/i.test(candidate.getAttribute("aria-label") ?? "")
      );
      return {
        expanded: button?.getAttribute("aria-expanded") === "true",
        focusIsLink: document.activeElement?.tagName === "A",
      };
    });
    if (!menuOpen.expanded) {
      failures.push("keyboard: mobile menu did not open with Enter");
    } else if (!menuOpen.focusIsLink) {
      failures.push("keyboard: focus did not move into the open mobile menu");
    }
    await page.keyboard.press("Escape");
    const menuClosed = await page.evaluate(() => {
      const button = Array.from(document.querySelectorAll("button")).find(
        (candidate) =>
          candidate.getAttribute("aria-expanded") !== null &&
          /navigation menu/i.test(candidate.getAttribute("aria-label") ?? "")
      );
      return button?.getAttribute("aria-expanded") === "false";
    });
    if (!menuClosed) failures.push("keyboard: Escape did not close the mobile menu");

    // Reduced motion: CSS animations are reduced to near-zero duration.
    await page.emulateMediaFeatures([
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);
    await page.goto(`${BASE_URL}/explorer/solar-system`, {
      waitUntil: "networkidle2",
    });
    const reducedAnimation = await page.evaluate(() => {
      const element = document.querySelector(".space-backdrop__stars");
      if (!element) return null;
      return getComputedStyle(element).animationDuration;
    });
    if (
      reducedAnimation &&
      parseFloat(reducedAnimation) > 0.001
    ) {
      failures.push(
        `reduced-motion: animationDuration is ${reducedAnimation}, expected <= 0.001s`
      );
    }
    await page.emulateMediaFeatures([]);
    await page.setViewport({ width: 1280, height: 900 });

    for (const [from, expected] of redirects) {
      const response = await page.goto(`${BASE_URL}${from}`, {
        waitUntil: "networkidle2",
        timeout: 30000,
      });
      checked += 1;
      const url = new URL(page.url());
      const expectedUrl = new URL(`${BASE_URL}${expected}`);
      if (
        url.pathname !== expectedUrl.pathname ||
        url.search !== expectedUrl.search
      ) {
        failures.push(
          `${from}: expected ${expectedUrl.pathname}${expectedUrl.search}, got ${url.pathname}${url.search}`
        );
      }
      if ((response?.status() ?? 0) >= 400) {
        failures.push(`${from}: HTTP ${response?.status()}`);
      }
    }

    const axeResults = [];
    let serious = 0;

    for (const path of axePages) {
      await page.goto(`${BASE_URL}${path}`, {
        waitUntil: "networkidle2",
        timeout: 30000,
      });
      const result = await new AxePuppeteer(page)
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      const violations = result.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact ?? undefined,
        nodes: violation.nodes.length,
      }));
      axeResults.push({ path, violations });
      for (const violation of violations) {
        if (violation.impact === "serious" || violation.impact === "critical") {
          serious += 1;
        }
      }
    }

    if (consoleErrors.length) {
      failures.push(`console/page errors: ${consoleErrors.slice(0, 5).join(" | ")}`);
    }

    const report = {
      baseUrl: BASE_URL,
      pagesChecked: checked,
      failures,
      consoleErrors,
      axe: axeResults,
      seriousOrCritical: serious,
    };
    console.log(JSON.stringify(report, null, 2));

    if (failures.length || serious > 0) {
      process.exitCode = 1;
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
