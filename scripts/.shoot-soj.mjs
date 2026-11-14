import { existsSync, mkdirSync } from "node:fs";
import puppeteer from "puppeteer-core";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3111";
const OUT = process.env.OUT ?? "/private/var/folders/87/gqwvjgnn24sd2x4vhpxrkffh0000gn/T/opencode";
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
const prefix = process.argv[3] ?? "soj";

const browser = await puppeteer.launch({
  executablePath: chromePath(),
  headless: "new",
  args: ["--no-sandbox", "--enable-webgl", "--use-gl=angle", "--use-angle=swiftshader"],
});

async function shoot(width, height, tag, full = true) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(BASE_URL + path, { waitUntil: "networkidle2", timeout: 90000 });
  await new Promise((r) => setTimeout(r, 3500));
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise((r) => setTimeout(r, 2500));
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({
    path: `${OUT}/${prefix}-${tag}.png`,
    fullPage: full,
    captureBeyondViewport: true,
  });
  await page.close();
}

await shoot(1440, 900, "desktop");
await shoot(390, 844, "mobile");
await browser.close();
console.log("done", OUT);
