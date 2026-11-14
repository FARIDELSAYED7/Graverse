import { existsSync, mkdirSync } from "node:fs";
import puppeteer from "puppeteer-core";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const OUT =
  process.env.OUT ??
  "/private/var/folders/87/gqwvjgnn24sd2x4vhpxrkffh0000gn/T/opencode";
mkdirSync(OUT, { recursive: true });

function chromePath() {
  const candidates = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ].filter(Boolean);
  const found = candidates.find((c) => existsSync(c));
  if (!found) throw new Error("No Chrome found");
  return found;
}

const path = process.argv[2] ?? "/stories/sojourner";
const prefix = process.argv[3] ?? "el";
const targets = (process.argv[4] ??
  ".gn-plate--artifact,.gn-plate--comic,.gn-plate--evidence,.gn-plate--discovery,.gn-viewer").split(",");

const browser = await puppeteer.launch({
  executablePath: chromePath(),
  headless: "new",
  args: [
    "--no-sandbox",
    "--enable-webgl",
    "--use-gl=angle",
    "--use-angle=swiftshader",
  ],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(BASE_URL + path, { waitUntil: "networkidle2", timeout: 90000 });
await page.evaluate(() => {
  document.documentElement.style.scrollBehavior = "auto";
});
// warm lazy images
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 700) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 50));
  }
});
await new Promise((r) => setTimeout(r, 3000));

for (const selector of targets) {
  const handle = await page.$(selector);
  if (!handle) {
    console.log("missing", selector);
    continue;
  }
  const safe = selector.replace(/[^a-zA-Z0-9_-]/g, "");
  await handle.screenshot({ path: `${OUT}/${prefix}-${safe}.png` });
  console.log("shot", selector);
}
await browser.close();
