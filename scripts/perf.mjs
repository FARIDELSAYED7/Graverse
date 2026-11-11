/**
 * Local performance probe.
 *
 * Runs against an already-running production build. It records field-style
 * browser metrics (LCP, CLS, transfer size, DOM size) for a small set of
 * representative routes. These are local, unthrottled headless-Chrome numbers
 * — they are not a Lighthouse score and not a field-data claim.
 *
 * Usage: BASE_URL=http://localhost:3100 node scripts/perf.mjs
 */
import { existsSync } from "node:fs";
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
    throw new Error("No Chrome/Chromium found. Set CHROME_PATH.");
  }
  return found;
}

const routes = [
  "/",
  "/academy",
  "/academy/lessons/our-neighbor-the-moon",
  "/museum",
  "/museum/apollo-11-lm-descent-stage",
  "/explorer",
  "/explorer/solar-system",
  "/search?q=apollo",
  "/sources",
];

const browser = await puppeteer.launch({
  executablePath: chromePath(),
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const results = [];

try {
  for (const route of routes) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 900 });
    await page.evaluateOnNewDocument(() => {
      window.__perf = { lcp: 0, cls: 0 };
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          window.__perf.lcp = Math.max(window.__perf.lcp, entry.startTime);
        }
      }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) window.__perf.cls += entry.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
    });
    const response = await page.goto(`${BASE_URL}${route}`, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });
    // Give late layout a moment to settle before reading CLS.
    await new Promise((resolve) => setTimeout(resolve, 500));
    const data = await page.evaluate(() => {
      const nav = performance.getEntriesByType("navigation")[0];
      const resources = performance.getEntriesByType("resource");
      const transfer = resources.reduce(
        (total, entry) => total + (entry.transferSize || 0),
        0
      );
      return {
        lcp: Math.round(window.__perf?.lcp ?? 0),
        cls: Number((window.__perf?.cls ?? 0).toFixed(4)),
        domContentLoaded: Math.round(nav?.domContentLoadedEventEnd ?? 0),
        load: Math.round(nav?.loadEventEnd ?? 0),
        resourceCount: resources.length,
        transferKb: Math.round(transfer / 1024),
        domNodes: document.getElementsByTagName("*").length,
      };
    });
    results.push({ route, status: response?.status() ?? 0, ...data });
    await page.close();
  }
} finally {
  await browser.close();
}

console.log(
  JSON.stringify(
    {
      baseUrl: BASE_URL,
      note: "Local unthrottled headless Chrome against `next start`. Not a Lighthouse score.",
      results,
    },
    null,
    2
  )
);
