/**
 * GRAVERSE user-journey checks.
 *
 * `scripts/smoke.mjs` proves that routes render and that the pages are
 * accessible. This script proves that the product actually works: it drives
 * the real interface the way a visitor does — searching, switching Explorer
 * modes, applying filters, opening a record, answering a lesson question,
 * exporting and resetting progress, comparing two artifacts, saving a
 * favourite, running a model, switching to Arabic, and using the site on a
 * phone-sized viewport with WebGL disabled.
 *
 * Usage: node scripts/journeys.mjs   (BASE_URL defaults to http://localhost:3100)
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
    throw new Error(
      "No Chrome/Chromium found. Set CHROME_PATH to a browser executable."
    );
  }
  return found;
}

const checks = [];
function check(id, title, run) {
  checks.push({ id, title, run });
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function textOf(page, selector) {
  return page.$eval(selector, (element) => element.textContent ?? "").catch(() => "");
}

async function bodyText(page) {
  return page.evaluate(() => document.body.innerText);
}

async function clickByText(page, selector, text) {
  const handle = await page.evaluateHandle(
    (sel, needle) => {
      const nodes = Array.from(document.querySelectorAll(sel));
      return (
        nodes.find((node) =>
          (node.textContent ?? "").replace(/\s+/g, " ").includes(needle)
        ) ?? null
      );
    },
    selector,
    text
  );
  const element = handle.asElement();
  if (!element) throw new Error(`No <${selector}> containing "${text}"`);
  await element.click();
  return element;
}

async function linkHrefs(page, selector) {
  return page.$$eval(selector, (nodes) =>
    nodes.map((node) => node.getAttribute("href") ?? "")
  );
}

async function newPage(browser, options = {}) {
  const page = await browser.newPage();
  await page.setViewport(
    options.viewport ?? { width: 1440, height: 1000 }
  );
  if (options.localeCookie) {
    await browser.setCookie({
      ...options.localeCookie,
      url: BASE_URL,
    });
  }
  if (options.blockWebgl) {
    await page.evaluateOnNewDocument(() => {
      const original = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (type, ...rest) {
        if (typeof type === "string" && type.includes("webgl")) return null;
        return original.call(this, type, ...rest);
      };
    });
  }
  const errors = [];
  page.on("pageerror", (error) => errors.push(String(error)));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.errors = errors;
  return page;
}

async function goto(page, path) {
  await page.goto(`${BASE_URL}${path}`, {
    waitUntil: "networkidle0",
    timeout: 60000,
  });
}

/* ------------------------------------------------------------------ checks */

check("home-cta", "Home explains the product and links into Explore", async (page) => {
  await goto(page, "/");
  const heading = await textOf(page, "h1");
  assert(
    /machines|understanding of space/i.test(heading),
    `Home heading did not explain the product: "${heading}"`
  );
  const search = await page.$('input[name="q"]');
  assert(search, "Home has no search field");
  await clickByText(page, "a", "Explore the timeline");
  await page.waitForFunction(
    () => window.location.pathname === "/explorer",
    { timeout: 15000 }
  );
});

check("search-by-name", "Search finds a named artifact without the timeline", async (page) => {
  await goto(page, "/");
  await page.type('input[name="q"]', "Perseverance");
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle0", timeout: 30000 }),
    page.keyboard.press("Enter"),
  ]);
  assert(page.url().includes("/search?q="), `Search did not submit: ${page.url()}`);
  const hrefs = await linkHrefs(page, 'a[href^="/museum/"]');
  assert(
    hrefs.some((href) => href.includes("perseverance")),
    `Search results did not include Perseverance: ${hrefs.join(", ")}`
  );
});

check("search-empty-state", "Search explains an empty result and offers a way out", async (page) => {
  await goto(page, "/search?q=zzzqqqxyzzy");
  const text = await bodyText(page);
  assert(
    /no matching records|no results|nothing matched/i.test(text),
    "Empty search state did not explain that nothing matched"
  );
  assert(
    /clear|reset/i.test(text),
    "Empty search state offered no way to clear the query or filters"
  );
});

check("explore-modes", "Explorer switches between timeline, destination and artifact modes", async (page) => {
  await goto(page, "/explorer");
  await clickByText(page, 'button[role="tab"]', "By destination");
  await page.waitForFunction(
    () => window.location.search.includes("mode=destinations"),
    { timeout: 10000 }
  );
  await clickByText(page, 'button[role="tab"]', "By artifact");
  await page.waitForFunction(
    () => window.location.search.includes("mode=artifacts"),
    { timeout: 10000 }
  );
  await clickByText(page, 'button[role="tab"]', "Timeline");
  await page.waitForFunction(
    () => !window.location.search.includes("mode="),
    { timeout: 10000 }
  );
});

check("explore-filters", "Explorer filters narrow the collection and can be cleared", async (page) => {
  await goto(page, "/explorer");
  await clickByText(page, "button", "Filters");
  await page.waitForSelector("#filter-destination");
  const before = await bodyText(page);
  await page.select("#filter-destination", "mars");
  await page.waitForFunction(
    () => window.location.search.includes("destination=mars"),
    { timeout: 10000 }
  );
  const filtered = await bodyText(page);
  assert(
    filtered !== before,
    "Filter did not change the rendered results"
  );
  assert(
    /with the current filters/i.test(filtered),
    "Active filters were not shown to the visitor"
  );
  await clickByText(page, "button", "Clear all");
  await page.waitForFunction(
    () => !window.location.search.includes("destination=mars"),
    { timeout: 10000 }
  );
});

check("explore-empty-state", "An impossible filter combination explains itself", async (page) => {
  await goto(page, "/explorer?mode=artifacts&destination=moon&hardwareType=aircraft");
  const text = await bodyText(page);
  assert(
    /no artifacts match/i.test(text),
    "Empty filter combination did not show an explanation"
  );
  assert(
    /clear all filters/i.test(text),
    "Empty filter combination offered no reset action"
  );
});

check("explore-list-view", "List view is a working alternative to the timeline", async (page) => {
  await goto(page, "/explorer?view=list");
  const rows = await linkHrefs(page, 'a[href^="/museum/"]');
  assert(rows.length > 0, "List view rendered no artifact rows");
  const text = await bodyText(page);
  assert(
    /perseverance|apollo|voyager/i.test(text),
    "List view did not render known records"
  );
});

check("explore-sort", "Sorting reorders the list", async (page) => {
  await goto(page, "/explorer?mode=artifacts&view=list");
  await page.waitForSelector("#explore-sort");
  const before = await page.$$eval("article h3", (nodes) =>
    nodes.map((node) => (node.textContent ?? "").trim())
  );
  await page.select("#explore-sort", "name");
  await page.waitForFunction(
    () => window.location.search.includes("sort=name"),
    { timeout: 10000 }
  );
  await new Promise((resolve) => setTimeout(resolve, 400));
  const after = await page.$$eval("article h3", (nodes) =>
    nodes.map((node) => (node.textContent ?? "").trim())
  );
  assert(
    JSON.stringify(before) !== JSON.stringify(after),
    "Sorting did not change the order of the results"
  );
});

check("explore-preview", "Timeline selection opens the matching museum record", async (page) => {
  await goto(page, "/explorer");
  await page.waitForSelector('button[aria-label*=","]');
  const events = await page.$$('button[aria-label*=","]');
  assert(events.length > 1, "Timeline exposed fewer than two events");
  await events[events.length - 1].click();
  await new Promise((resolve) => setTimeout(resolve, 300));
  const previewLinks = await linkHrefs(page, 'a[href^="/museum/"]');
  assert(
    previewLinks.length > 0,
    "Timeline selection produced no preview link"
  );
  const href = previewLinks[0];
  await goto(page, href);
  assert(
    await page.$("h1"),
    `Opening the preview link ${href} did not render a record heading`
  );
});

check("museum-record", "A museum record separates mission and hardware status and cites sources", async (page) => {
  await goto(page, "/museum/perseverance");
  const text = await bodyText(page);
  for (const section of [
    "What is it?",
    "Why was it sent?",
    "What happened?",
    "What did we learn?",
    "What happened to the hardware?",
  ]) {
    assert(text.includes(section), `Museum record is missing "${section}"`);
  }
  assert(
    /mission\s*:/i.test(text) && /hardware\s*:/i.test(text),
    "Museum record does not show both mission and hardware status"
  );
  const sources = await linkHrefs(page, 'a[href^="http"]');
  assert(sources.length > 0, "Museum record cites no external source");
  const details = await page.$$("details");
  assert(details.length > 0, "Museum record has no expandable section");
});

check("academy-quiz-progress", "A lesson quiz is recorded and survives a reload", async (page) => {
  await goto(page, "/academy/lessons/what-is-an-artifact");
  await page.waitForSelector('input[type="radio"]');
  const fieldsets = await page.$$("fieldset");
  assert(fieldsets.length > 0, "Lesson quiz rendered no questions");
  for (const fieldset of fieldsets) {
    const options = await fieldset.$$('input[type="radio"]');
    assert(options.length >= 2, "A lesson question offered no answer options");
    await options[0].click();
  }
  await clickByText(page, "button", "Check my answers");
  await page.waitForFunction(
    () => Boolean(document.querySelector('[role="status"]')),
    { timeout: 10000 }
  );
  await goto(page, "/academy/progress");
  const text = await bodyText(page);
  assert(
    /Lessons completed/i.test(text),
    "Progress page does not report lesson progress"
  );
  const stored = await page.evaluate(() =>
    Object.keys(window.localStorage).filter((key) => key.includes("graverse"))
  );
  assert(stored.length > 0, "Lesson progress was not written to local storage");
});

check("academy-export-reset", "Progress can be exported and reset", async (page) => {
  await goto(page, "/academy/progress");
  const client = await page.createCDPSession();
  await client.send("Browser.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: "/tmp",
  });
  await clickByText(page, "button", "Export progress");
  await page.waitForFunction(
    () => Boolean(document.querySelector('[role="status"]')),
    { timeout: 10000 }
  );
  const text = await bodyText(page);
  assert(/exported/i.test(text), "Export did not confirm the download");
  await clickByText(page, "button", "Reset progress");
  await clickByText(page, "button", "Yes, reset");
  await new Promise((resolve) => setTimeout(resolve, 300));
  const after = await bodyText(page);
  assert(
    /Nothing saved yet|Progress reset/i.test(after),
    "Reset did not clear the saved progress"
  );
});

check("compare-records", "Two records can be compared, swapped and shared by link", async (page) => {
  await goto(page, "/compare?a=apollo-11-lm-descent-stage&b=perseverance");
  const selects = await page.$$("select");
  assert(selects.length === 2, "Compare page did not offer two record pickers");
  const headerLinks = () =>
    page.$$eval("table thead a", (nodes) =>
      nodes.map((node) => node.getAttribute("href") ?? "")
    );
  assert(
    (await headerLinks()).length === 2,
    "Compare table did not show both record headings"
  );
  await selects[1].select("voyager-1");
  await new Promise((resolve) => setTimeout(resolve, 400));
  let headers = await headerLinks();
  assert(
    headers[1] === "/museum/voyager-1",
    `Compare table did not update to Voyager 1 (${headers.join(", ")})`
  );
  await clickByText(page, "button", "Swap sides");
  await new Promise((resolve) => setTimeout(resolve, 400));
  headers = await headerLinks();
  assert(
    headers[0] === "/museum/voyager-1",
    `Swapping the compare sides did not reorder the records (${headers.join(", ")})`
  );
  assert(
    (await linkHrefs(page, 'a[href^="/compare?"]')).length > 0,
    "Compare page offered no shareable link"
  );
});

check("my-universe", "A saved record shows up in My Universe", async (page) => {
  await goto(page, "/museum/perseverance");
  await clickByText(page, "button", "Save to favourites");
  await new Promise((resolve) => setTimeout(resolve, 300));
  await goto(page, "/my-universe");
  const text = await bodyText(page);
  assert(
    /Perseverance/i.test(text),
    "My Universe did not list the record saved on the museum page"
  );
});

check("simulation-model", "A simulation reacts to its controls", async (page) => {
  await goto(page, "/simulations/power");
  const sliders = await page.$$('input[type="range"]');
  assert(sliders.length > 0, "Simulation exposed no slider controls");
  const before = await page.evaluate(() => document.body.innerText);
  await sliders[0].evaluate((element) => {
    const input = element;
    const max = Number(input.max ?? 100);
    const setter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    )?.set;
    if (setter) setter.call(input, String(max));
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });
  await new Promise((resolve) => setTimeout(resolve, 400));
  const after = await page.evaluate(() => document.body.innerText);
  assert(before !== after, "Simulation output did not change when a control moved");
  assert(
    /approximation/i.test(after),
    "Simulation did not label itself as an approximation"
  );
});

check("mission-control", "Mission Control keeps mission, hardware and derived status apart", async (page) => {
  await goto(page, "/mission-control");
  const text = await bodyText(page);
  assert(/mission/i.test(text), "Mission Control does not describe mission status");
  assert(/hardware/i.test(text), "Mission Control does not describe hardware status");
  assert(
    /derived/i.test(text),
    "Mission Control does not label the communication status as derived"
  );
});

check("engineering-explainer", "An engineering explainer links back to the records it explains", async (page) => {
  await goto(page, "/engineering");
  const links = await linkHrefs(page, 'a[href^="/engineering/"]');
  assert(links.length > 0, "Engineering index listed no explainers");
  await goto(page, links[0]);
  const museumLinks = await linkHrefs(page, 'a[href^="/museum/"]');
  assert(
    museumLinks.length > 0,
    "Engineering explainer did not link to any museum record"
  );
});

check("story-path", "A curated story points back to the records it uses", async (page) => {
  await goto(page, "/stories");
  const links = await linkHrefs(page, 'a[href^="/stories/"]');
  assert(links.length > 0, "Stories index listed no reading paths");
  await goto(page, links[0]);
  const museumLinks = await linkHrefs(page, 'a[href^="/museum/"]');
  assert(
    museumLinks.length > 0,
    "Story did not link to the museum records it cites"
  );
});

check("simulation-explored", "A finished model is recorded locally", async (page) => {
  await goto(page, "/simulations/power");
  await clickByText(page, "button", "Mark as explored");
  await page.waitForFunction(
    () => document.body.innerText.includes("Explored"),
    { timeout: 10000 }
  );
  await goto(page, "/my-universe");
  const text = await bodyText(page);
  assert(
    /power/i.test(text),
    "My Universe did not list the completed simulation"
  );
});

check("mission-control-filters", "The status board filters and opens a record", async (page) => {
  await goto(page, "/mission-control");
  const before = await page.$$eval('a[href^="/museum/"]', (nodes) => nodes.length);
  assert(before > 0, "Status board listed no records");
  const filter = await page.$('[aria-label="Filter by destination"] button');
  assert(filter, "Status board offered no destination filter");
  await filter.click();
  await new Promise((resolve) => setTimeout(resolve, 400));
  const after = await page.$$eval('a[href^="/museum/"]', (nodes) => nodes.length);
  assert(after > 0, "Destination filter removed every record from the board");
  const href = await page.$eval('a[href^="/museum/"]', (node) =>
    (node.getAttribute("href") ?? "")
  );
  await goto(page, href);
  assert(await page.$("h1"), `Status board link ${href} did not open a record`);
});

check("dataset-export", "The open dataset endpoint returns the verified records", async (page) => {
  await goto(page, "/about");
  const response = await page.evaluate(async () => {
    const res = await fetch("/api/export");
    return { status: res.status, body: await res.text() };
  });
  assert(response.status === 200, `Dataset export returned ${response.status}`);
  const parsed = JSON.parse(response.body);
  assert(
    Array.isArray(parsed.artifacts) && parsed.artifacts.length === 33,
    `Dataset export returned ${parsed.artifacts?.length ?? "no"} artifacts`
  );
  assert(
    Array.isArray(parsed.sources) && parsed.sources.length > 0,
    "Dataset export carried no source records"
  );
});

check("arabic-rtl", "Arabic switches the interface to right-to-left", async (page) => {
  await page.setCookie({ name: "graverse-locale", value: "ar", url: BASE_URL });
  try {
    await goto(page, "/");
    const dir = await page.evaluate(() => document.documentElement.dir);
    const lang = await page.evaluate(() => document.documentElement.lang);
    assert(dir === "rtl", `Expected a right-to-left document, got dir="${dir}"`);
    assert(lang === "ar", `Expected lang="ar", got lang="${lang}"`);
    const text = await bodyText(page);
    assert(/[؀-ۿ]/.test(text), "Arabic interface did not render Arabic copy");
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    assert(overflow <= 2, `Arabic layout overflows horizontally by ${overflow}px`);
  } finally {
    await page.deleteCookie({
      name: "graverse-locale",
      url: BASE_URL,
    });
  }
});

check("mobile-layout", "The phone layout stays usable and the menu opens", async (page) => {
  await page.setViewport({ width: 390, height: 844 });
  await goto(page, "/explorer");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  assert(overflow <= 2, `Mobile Explorer overflows horizontally by ${overflow}px`);
  const menu = await page.$('button[aria-label*="menu" i], button[aria-label*="navigation" i]');
  assert(menu, "Mobile header exposed no navigation button");
  await menu.click();
  await new Promise((resolve) => setTimeout(resolve, 400));
  const mobileNav = await page.evaluate(() => {
    const navs = Array.from(document.querySelectorAll("header nav"));
    const open = navs.find(
      (nav) => nav.getBoundingClientRect().height > 0
    );
    if (!open) return null;
    return {
      links: Array.from(open.querySelectorAll("a")).map((a) =>
        (a.getAttribute("href") ?? "")
      ),
    };
  });
  assert(mobileNav, "Mobile navigation did not open");
  for (const href of ["/museum", "/explorer", "/academy"]) {
    assert(
      mobileNav.links.includes(href),
      `Mobile navigation is missing the ${href} link`
    );
  }
});

check("no-webgl-fallback", "The product still works when WebGL is unavailable", async (page) => {
  await goto(page, "/explorer?view=list");
  const rows = await linkHrefs(page, 'a[href^="/museum/"]');
  assert(
    rows.length > 0,
    "Explorer list view was empty without WebGL — no 2D alternative"
  );
  await goto(page, "/academy/play/rocket");
  const text = await bodyText(page);
  assert(
    /3d|webgl|unavailable|fallback/i.test(text),
    "Playground gave no message about the missing 3D support"
  );
  const controls = await page.$$("button");
  assert(
    controls.length > 0,
    "Playground offered no controls without WebGL"
  );
});

check("ask-graverse", "The assistant opens, stays contextual, and never blocks the museum", async (page) => {
  await goto(page, "/museum/perseverance");

  const launcher = await page.$('button[aria-label="Open Ask GRAVERSE"]');
  assert(launcher, "The Ask GRAVERSE launcher was not rendered");
  await launcher.click();
  await new Promise((resolve) => setTimeout(resolve, 400));

  const panel = await page.$('[role="dialog"]');
  assert(panel, "The assistant panel did not open");

  const panelText = await page.evaluate(() => {
    const node = document.querySelector('[role="dialog"]');
    return node ? (node.textContent ?? "") : "";
  });
  assert(/Ask GRAVERSE/i.test(panelText), "The assistant panel lost its title");
  assert(
    /Perseverance/i.test(panelText),
    "The contextual record was not carried into the assistant"
  );
  assert(
    /[?？]/i.test(panelText) || panelText.length > 0,
    "The assistant panel is empty"
  );

  const composer = await page.$('[role="dialog"] textarea');
  assert(composer, "The assistant has no question box");

  // The two operating modes are offered on a contextual page.
  const modes = await page.$$eval('[role="dialog"] button[aria-pressed]', (nodes) =>
    nodes.map((node) => ({
      pressed: node.getAttribute("aria-pressed"),
      label: (node.textContent ?? "").trim(),
    }))
  );
  assert(
    modes.length === 2,
    "The assistant did not offer both a contextual and a global mode"
  );
  assert(
    modes.some((mode) => mode.pressed === "true"),
    "No assistant mode was selected"
  );

  // The assistant must never open more than one WebGL surface, and the 3D
  // identity must be present in the launcher and in the console.
  const surfaces = await page.evaluate(() => ({
    canvases: document.querySelectorAll("canvas").length,
    slots: document.querySelectorAll('[role="dialog"] span.block').length,
  }));
  assert(
    surfaces.canvases <= 1,
    `The assistant opened ${surfaces.canvases} WebGL surfaces`
  );
  assert(surfaces.slots >= 1, "The assistant identity was not rendered");

  // The museum record behind the panel is still complete.
  const body = await bodyText(page);
  assert(
    /Perseverance/i.test(body),
    "The museum record disappeared when the assistant opened"
  );
  assert(
    /Sources|Accessed/i.test(body),
    "The artifact sources disappeared when the assistant opened"
  );

  // Escape closes the panel and the page keeps working.
  await page.keyboard.press("Escape");
  await new Promise((resolve) => setTimeout(resolve, 300));
  const closed = await page.evaluate(() => {
    const node = document.querySelector('[role="dialog"]');
    if (!node) return true;
    const style = getComputedStyle(node);
    return style.display === "none" || style.visibility === "hidden";
  });
  assert(closed, "Escape did not close the assistant");
});

check("ask-graverse-scroll", "The 3D identity never escapes the console", async (page) => {
  await goto(page, "/museum/perseverance");
  await new Promise((resolve) => setTimeout(resolve, 1400));
  const launcher = await page.$('button[aria-label="Open Ask GRAVERSE"]');
  assert(launcher, "The assistant launcher was not rendered");
  await launcher.click();
  await new Promise((resolve) => setTimeout(resolve, 900));

  // Scroll the conversation so the empty state leaves the console.
  await page.evaluate(() => {
    const log = document.querySelector('[role="log"]');
    log.scrollTop = log.scrollHeight;
    log.dispatchEvent(new Event("scroll", { bubbles: true }));
  });
  await new Promise((resolve) => setTimeout(resolve, 700));

  const state = await page.evaluate(() => {
    const log = document.querySelector('[role="log"]');
    const slot = log.querySelector("div.relative.h-24");
    if (!slot) return { gone: true };
    const fallback = slot.firstElementChild;
    const s = slot.getBoundingClientRect();
    const l = log.getBoundingClientRect();
    return {
      gone: false,
      outside: s.top < l.top - 1 || s.bottom > l.bottom + 1,
      fallbackOpacity: fallback ? getComputedStyle(fallback).opacity : null,
    };
  });

  if (state.gone) {
    // The empty state was replaced by a conversation: nothing can escape.
  } else {
    assert(
      state.outside,
      "The empty state did not scroll out of the console, so the check is void"
    );
    assert(
      state.fallbackOpacity === "1",
      "The 3D core is still painted outside the console — the CSS mark must take over"
    );
  }

  // Scrolling back brings the 3D core with it.
  await page.evaluate(() => {
    const log = document.querySelector('[role="log"]');
    log.scrollTop = 0;
    log.dispatchEvent(new Event("scroll", { bubbles: true }));
  });
  await new Promise((resolve) => setTimeout(resolve, 700));
  const back = await page.evaluate(() => {
    const log = document.querySelector('[role="log"]');
    const slot = log.querySelector("div.relative.h-24");
    if (!slot) return { gone: true };
    const fallback = slot.firstElementChild;
    return {
      gone: false,
      fallbackOpacity: fallback ? getComputedStyle(fallback).opacity : null,
    };
  });
  assert(
    back.gone || back.fallbackOpacity === "0",
    "The 3D core did not come back when the console was scrolled to the top"
  );
});

check("ask-graverse-local", "A local answer is labelled and reaches the visitor", async (page) => {
  await goto(page, "/museum/perseverance");
  const launcher = await page.$('button[aria-label="Open Ask GRAVERSE"]');
  assert(launcher, "The assistant launcher was not rendered");
  await launcher.click();
  await new Promise((resolve) => setTimeout(resolve, 500));

  // A question GRAVERSE can answer from its own records. The answer is
  // assembled locally, so this costs no provider request and no free quota.
  await page.type('[role="dialog"] textarea', "What is the Solar System?");
  await page.keyboard.press("Enter");
  await new Promise((resolve) => setTimeout(resolve, 2500));

  const log = await page.evaluate(
    () => document.querySelector('[role="log"]')?.textContent ?? ""
  );
  assert(/Solar System/i.test(log), "the local answer did not arrive");
  assert(
    /GRAVERSE Knowledge|mعرفة GRAVERSE/.test(log),
    "the answer did not say that it came from GRAVERSE's own knowledge"
  );
  assert(
    /SRC-NASA/.test(log),
    "the local answer did not carry its registered sources"
  );
});

check("ask-graverse-service", "The assistant reports its state without spending quota", async (page) => {
  await goto(page, "/");
  const response = await page.evaluate(async () => {
    const result = await fetch("/api/ask");
    return { status: result.status, body: await result.json() };
  });
  assert(response.status === 200, "The service report did not answer");
  assert(
    typeof response.body.configured === "boolean",
    "The service report did not say whether the assistant is configured"
  );
  assert(
    response.body.freeOnly === true,
    "The service report did not confirm the free-only model policy"
  );
  assert(
    !JSON.stringify(response.body).includes("OPENROUTER_API_KEY"),
    "The service report leaked configuration detail"
  );

  // The composer state must match the report. This check never asks a
  // question: the free tier is a shared, small quota and the automated gate
  // must not spend it.
  const launcher = await page.$('button[aria-label="Open Ask GRAVERSE"]');
  assert(launcher, "The assistant launcher was not rendered");
  await launcher.click();
  await new Promise((resolve) => setTimeout(resolve, 400));

  const composer = await page.$('[role="dialog"] textarea');
  assert(composer, "The assistant has no question box");
  const disabled = await page.evaluate(
    () => (document.querySelector('[role="dialog"] textarea')?.disabled) ?? false
  );
  assert(
    disabled === (response.body.configured === false),
    "The composer state does not match the service report"
  );

  if (response.body.configured === false) {
    const panelText = await page.evaluate(() => {
      const node = document.querySelector('[role="dialog"]');
      return node ? (node.textContent ?? "") : "";
    });
    assert(
      /not configured/i.test(panelText),
      "The assistant did not say that it is not configured"
    );
    assert(
      /Museum, Academy and Explorer|remain fully available/i.test(panelText),
      "The assistant did not tell the visitor that the museum still works"
    );
  }
});

check("ask-graverse-webgl", "The assistant still works without WebGL", async (page) => {
  await page.evaluateOnNewDocument(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...rest) {
      if (typeof type === "string" && type.includes("webgl")) return null;
      return original.call(this, type, ...rest);
    };
  });
  await goto(page, "/museum/perseverance");
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const canvases = await page.evaluate(
    () => document.querySelectorAll("canvas").length
  );
  assert(canvases === 0, "A WebGL canvas was created on a device without WebGL");

  const launcher = await page.$('button[aria-label="Open Ask GRAVERSE"]');
  assert(launcher, "The assistant launcher was not rendered without WebGL");
  await launcher.click();
  await new Promise((resolve) => setTimeout(resolve, 400));

  const panel = await page.$('[role="dialog"]');
  assert(panel, "The assistant panel did not open without WebGL");
  const composer = await page.$('[role="dialog"] textarea');
  assert(composer, "The assistant has no question box without WebGL");
});

check("ask-graverse-rtl", "The assistant works in the Arabic right-to-left interface", async (page) => {
  await page.setCookie({ name: "graverse-locale", value: "ar", url: BASE_URL });
  try {
    await goto(page, "/museum/perseverance");
    const launcher = await page.$('button[aria-label*="Ask GRAVERSE"]');
    assert(launcher, "The assistant launcher was not rendered in Arabic");
    await launcher.click();
    await new Promise((resolve) => setTimeout(resolve, 400));

    const panel = await page.$('[role="dialog"]');
    assert(panel, "The assistant panel did not open in Arabic");

    const text = await page.evaluate(() => {
      const node = document.querySelector('[role="dialog"]');
      return node ? (node.textContent ?? "") : "";
    });
    assert(/[؀-ۿ]/.test(text), "The Arabic assistant rendered no Arabic copy");

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    assert(overflow <= 2, `The Arabic assistant overflows by ${overflow}px`);
  } finally {
    await page.deleteCookie({
      name: "graverse-locale",
      url: BASE_URL,
    });
  }
});

/* ------------------------------------------------------------------- runner */

const browser = await puppeteer.launch({
  executablePath: chromePath(),
  headless: "new",
  args: ["--no-sandbox"],
});

const results = [];
for (const item of checks) {
  const page = await newPage(browser);
  const started = Date.now();
  let status = "passed";
  let detail = "";
  try {
    await item.run(page);
    if (page.errors.length > 0) {
      throw new Error(`Browser error: ${page.errors[0]}`);
    }
  } catch (error) {
    status = "failed";
    detail = error instanceof Error ? error.message : String(error);
  }
  results.push({
    id: item.id,
    title: item.title,
    status,
    detail,
    ms: Date.now() - started,
  });
  const mark = status === "passed" ? "PASS" : "FAIL";
  console.log(`${mark}  ${item.id} — ${item.title}`);
  if (detail) console.log(`      ${detail}`);
  await page.close();
}

await browser.close();

const failed = results.filter((result) => result.status === "failed");
console.log("");
console.log(
  `Journey checks: ${results.length - failed.length}/${results.length} passed`
);
if (failed.length > 0) {
  console.log("");
  for (const result of failed) {
    console.log(`FAILED ${result.id}: ${result.detail}`);
  }
  process.exit(1);
}
