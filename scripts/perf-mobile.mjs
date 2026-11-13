/**
 * Mobile performance probe.
 *
 * `scripts/perf.mjs` records desktop metrics. This script answers the other
 * question the redesign raised: does the layered deep-space backdrop stay
 * smooth on a phone? It opens the background-heavy routes in a 390x844
 * viewport, throttles the CPU four times (a mid-range handset, not a
 * workstation), scrolls the whole page for six seconds and counts how many
 * frames were late.
 *
 * It also records LCP, CLS, transfer size and DOM size at that viewport.
 * These are local, unthrottled-network headless-Chrome numbers on one
 * machine. They are not a Lighthouse score and not field data.
 *
 * Usage: BASE_URL=http://localhost:3100 node scripts/perf-mobile.mjs
 */
import { existsSync } from "node:fs";
import puppeteer from "puppeteer-core";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3100";
const CPU_THROTTLE_RATE = 4;

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

/** The routes that carry the full background system. */
const routes = [
  "/",
  "/museum",
  "/explorer",
  "/museum/apollo-11-lm-descent-stage",
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
    await page.setViewport({
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });

    const client = await page.createCDPSession();
    await client.send("Emulation.setCPUThrottlingRate", {
      rate: CPU_THROTTLE_RATE,
    });

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

    await page.goto(`${BASE_URL}${route}`, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    const transferKb = await page.evaluate(() => {
      const resources = performance.getEntriesByType("resource");
      return Math.round(
        resources.reduce((total, entry) => total + (entry.transferSize || 0), 0) /
          1024
      );
    });

    // Scroll the page for six seconds and time every animation frame. A frame
    // over 34 ms is later than a 30 fps budget; over 100 ms is a visible stall.
    const frames = await page.evaluate(async () => {
      const deltas = [];
      let last = performance.now();
      let running = true;
      const tick = () => {
        const now = performance.now();
        deltas.push(now - last);
        last = now;
        if (running) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);

      const height = document.documentElement.scrollHeight;
      const started = performance.now();
      while (performance.now() - started < 6000) {
        const progress = (performance.now() - started) / 6000;
        window.scrollTo(0, Math.min(height, progress * height));
        await new Promise((resolve) => setTimeout(resolve, 32));
      }
      running = false;
      return deltas;
    });

    const metrics = await page.evaluate(() => ({
      lcp: Math.round(window.__perf?.lcp ?? 0),
      cls: Number((window.__perf?.cls ?? 0).toFixed(4)),
      domNodes: document.getElementsByTagName("*").length,
    }));

    const average = frames.reduce((total, frame) => total + frame, 0) / frames.length;

    results.push({
      route,
      lcp: metrics.lcp,
      cls: metrics.cls,
      transferKb,
      domNodes: metrics.domNodes,
      frames: frames.length,
      avgFrameMs: Number(average.toFixed(1)),
      framesOver34ms: frames.filter((frame) => frame > 34).length,
      framesOver100ms: frames.filter((frame) => frame > 100).length,
    });

    await page.close();
  }
} finally {
  await browser.close();
}

console.log(
  JSON.stringify(
    {
      baseUrl: BASE_URL,
      note: "Local headless Chrome at 390x844 with a 4x CPU throttle. Not a Lighthouse score.",
      results,
    },
    null,
    2
  )
);
