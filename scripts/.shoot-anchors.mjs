import { existsSync, mkdirSync } from "node:fs";
import puppeteer from "puppeteer-core";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3111";
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
const prefix = process.argv[3] ?? "soj";
// anchor selectors to shoot, in order; "top" and "bottom" are special.
const anchors = (process.argv[4] ??
  "top,#chapter-meet,#chapter-mission,#chapter-journey,#chapter-discoveries,#chapter-ending,#chapter-legacy,bottom"
).split(",");

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

async function shoot(width, height, tag) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(BASE_URL + path, { waitUntil: "networkidle2", timeout: 90000 });
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
  });
  await new Promise((r) => setTimeout(r, 2500));
  // warm lazy images + webgl
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 700) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
  });
  await new Promise((r) => setTimeout(r, 2500));

  for (const anchor of anchors) {
    const safe = anchor.replace(/[^a-zA-Z0-9_-]/g, "");
    if (anchor === "top") {
      await page.evaluate(() => window.scrollTo(0, 0));
    } else if (anchor === "bottom") {
      await page.evaluate(() =>
        window.scrollTo(0, document.body.scrollHeight)
      );
    } else {
      await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 80);
      }, anchor);
    }
    await new Promise((r) => setTimeout(r, 1600));
    const name = anchor === "top" ? "00-top" : anchor === "bottom" ? "99-bottom" : safe;
    await page.screenshot({ path: `${OUT}/${prefix}-${tag}-${name}.png` });
  }
  await page.close();
}

await shoot(1440, 900, "d");
await shoot(390, 844, "m");
await browser.close();
console.log("done", OUT);
