import { existsSync, mkdirSync } from "node:fs";
import puppeteer from "puppeteer-core";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = process.env.OUT ?? "/tmp/graverse-shots/factstrip";
const W = Number(process.env.W ?? 1280);
const H = Number(process.env.H ?? 900);

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

mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: chromePath(),
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const page = await browser.newPage();
await page.setViewport({ width: W, height: H });
await page.goto(`${BASE_URL}/stories/${process.argv[2] ?? "sojourner"}`, { waitUntil: "networkidle2", timeout: 60000 });
await new Promise((r) => setTimeout(r, 1500));

const strips = await page.$$("dl.factstrip");
console.log("factstrips:", strips.length);
for (let i = 0; i < strips.length; i += 1) {
  const info = await strips[i].evaluate((el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      cls: el.className,
      rect: { x: r.x, y: r.y, w: r.width, h: r.height },
      bg: cs.backgroundColor,
      cols: cs.gridTemplateColumns,
      gap: cs.gap,
      itemBgs: [...el.children].map((c) => getComputedStyle(c).backgroundColor),
      items: el.children.length,
      factColumns: el.style.getPropertyValue("--fact-columns"),
    };
  });
  console.log(i, JSON.stringify(info));
  await strips[i].scrollIntoView();
  await new Promise((r) => setTimeout(r, 300));
  await strips[i].screenshot({ path: `${OUT}/strip-${i}.png` });
}

const scene = await page.$(".scene__copy");
if (scene) {
  await scene.scrollIntoView();
  await new Promise((r) => setTimeout(r, 300));
  await scene.screenshot({ path: `${OUT}/scene-copy.png` });
}

await browser.close();
