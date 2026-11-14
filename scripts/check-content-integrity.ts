#!/usr/bin/env node
/**
 * Content integrity check.
 *
 * The redesign is presentation only. This script reads the story data and
 * proves that every authored string — titles, ledes, paragraphs, facts,
 * discovery fields, quiz questions, answers and explanations, glossary
 * terms, status lines — is still present on the rendered page.
 *
 * Usage: npx tsx scripts/check-content-integrity.mts [baseUrl]
 */

import { existsSync } from "node:fs";
import puppeteer from "puppeteer-core";
import { echoStories } from "../src/data/echoes/stories";
import { storyCollections } from "../src/data/stories";

const BASE_URL = process.argv[2] ?? "http://localhost:5173";

function chromePath() {
  const candidates = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome",
  ].filter((c): c is string => typeof c === "string");
  const found = candidates.find((c) => existsSync(c));
  if (!found) throw new Error("No Chrome found");
  return found;
}

const norm = (value: string) => value.replace(/\s+/g, " ").trim();

interface Expected {
  where: string;
  text: string;
}

function collectEcho(story: (typeof echoStories)[number]): Expected[] {
  const out: Expected[] = [];
  const push = (where: string, value: string) => {
    const text = norm(value);
    if (text) out.push({ where, text });
  };

  push("title", story.title.en);
  push("storyTitle", story.storyTitle.en);
  push("dek", story.dek.en);
  push("summary", story.summary.en);
  push("location", story.location.en);
  push("equipmentType", story.equipmentType.en);
  push("missionPeriod", story.missionPeriod.en);
  push("missionStatus", story.missionStatus.en);
  push("hardwareStatus", story.hardwareStatus.en);
  push("badge", story.badge.en);
  push("echoIntro", story.echoIntro.en);
  push("echoSignoff", story.echoSignoff.en);
  push("legacyStatement", story.legacyStatement.en);
  push("hero.caption", story.hero.caption.en);
  push("hero.alt", story.hero.alt.en);
  story.gallery.forEach((media, index) => {
    push(`gallery[${index}].caption`, media.caption.en);
    push(`gallery[${index}].alt`, media.alt.en);
  });
  story.facts.forEach((fact, index) => {
    push(`facts[${index}].label`, fact.label.en);
    push(`facts[${index}].value`, fact.value.en);
  });
  story.chapters.forEach((chapter) => {
    push(`${chapter.id}.eyebrow`, chapter.eyebrow.en);
    push(`${chapter.id}.title`, chapter.title.en);
    push(`${chapter.id}.summary`, chapter.summary.en);
    chapter.narrative.en.forEach((paragraph, index) =>
      push(`${chapter.id}.narrative[${index}]`, paragraph)
    );
    (chapter.media ?? []).forEach((media, index) => {
      push(`${chapter.id}.media[${index}].caption`, media.caption.en);
      push(`${chapter.id}.media[${index}].alt`, media.alt.en);
    });
    (chapter.facts ?? []).forEach((fact, index) => {
      push(`${chapter.id}.facts[${index}].label`, fact.label.en);
      push(`${chapter.id}.facts[${index}].value`, fact.value.en);
    });
    (chapter.timeline ?? []).forEach((event, index) => {
      push(`${chapter.id}.timeline[${index}].dateLabel`, event.dateLabel.en);
      push(`${chapter.id}.timeline[${index}].label`, event.label.en);
      push(`${chapter.id}.timeline[${index}].description`, event.description.en);
    });
    if (chapter.diagram) {
      push(`${chapter.id}.diagram.title`, chapter.diagram.title.en);
      push(`${chapter.id}.diagram.intro`, chapter.diagram.intro.en);
      chapter.diagram.points.forEach((point, index) => {
        push(`${chapter.id}.diagram.points[${index}].label`, point.label.en);
        push(`${chapter.id}.diagram.points[${index}].detail`, point.detail.en);
      });
      (chapter.diagram.route ?? []).forEach((stop, index) => {
        push(`${chapter.id}.diagram.route[${index}].label`, stop.label.en);
        push(`${chapter.id}.diagram.route[${index}].description`, stop.description.en);
      });
    }
    (chapter.discoveries ?? []).forEach((discovery) => {
      push(`${discovery.id}.title`, discovery.title.en);
      push(`${discovery.id}.question`, discovery.question.en);
      push(`${discovery.id}.instrument`, discovery.instrument.en);
      push(`${discovery.id}.method`, discovery.method.en);
      push(`${discovery.id}.data`, discovery.data.en);
      push(`${discovery.id}.finding`, discovery.finding.en);
      push(`${discovery.id}.significance`, discovery.significance.en);
      (discovery.media ?? []).forEach((media, index) => {
        push(`${discovery.id}.media[${index}].caption`, media.caption.en);
        push(`${discovery.id}.media[${index}].alt`, media.alt.en);
      });
    });
    (chapter.quiz ?? []).forEach((question) => {
      push(`${question.id}.prompt`, question.prompt.en);
      push(`${question.id}.explanation`, question.explanation.en);
      question.options.forEach((option) =>
        push(`${question.id}.option.${option.id}`, option.label.en)
      );
    });
    const challenge = chapter.challenge;
    if (challenge) {
      push(`${challenge.id}.prompt`, challenge.prompt.en);
      push(`${challenge.id}.reality`, challenge.reality.en);
      challenge.options.forEach((option) =>
        push(`${challenge.id}.option.${option.id}`, option.label.en)
      );
    }
    (chapter.glossary ?? []).forEach((term) => {
      push(`${term.id}.term`, term.term.en);
      push(`${term.id}.simple`, term.simple.en);
      if (term.technical) push(`${term.id}.technical`, term.technical.en);
    });
  });
  return out;
}

function collectCollection(story: (typeof storyCollections)[number]): Expected[] {
  const out: Expected[] = [];
  const push = (where: string, value: string) => {
    const text = norm(value);
    if (text) out.push({ where, text });
  };
  push("title", story.title);
  push("eyebrow", story.eyebrow);
  push("dek", story.dek);
  push("summary", story.summary);
  story.sections.forEach((section, index) => {
    push(`section[${index}].heading`, section.heading);
    section.paragraphs.forEach((paragraph, pIndex) =>
      push(`section[${index}].paragraphs[${pIndex}]`, paragraph)
    );
  });
  return out;
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: chromePath(),
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const failures: string[] = [];
  let checked = 0;

  for (const story of echoStories) {
    await page.goto(`${BASE_URL}/stories/${story.slug}`, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });
    await new Promise((r) => setTimeout(r, 800));

    const expected = collectEcho(story);
    const body = norm(
      await page.evaluate(() => {
        const alts = [...document.querySelectorAll("img[alt]")]
          .filter((img) => img.getBoundingClientRect().width > 0)
          .map((img) => img.getAttribute("alt") ?? "")
          .join(" \n ");
        return `${document.body.innerText} \n ${alts}`;
      })
    ).toLowerCase();

    for (const item of expected) {
      checked += 1;
      if (!body.includes(item.text.toLowerCase())) {
        failures.push(`${story.slug} :: ${item.where} :: ${item.text.slice(0, 90)}`);
      }
    }
    console.log(
      `${failures.length === 0 ? "ok  " : "..."} ${story.slug} (${expected.length} strings)`
    );
  }

  for (const story of storyCollections) {
    await page.goto(`${BASE_URL}/stories/${story.id}`, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });
    await new Promise((r) => setTimeout(r, 600));
    const expected = collectCollection(story);
    const body = norm(
      await page.evaluate(() => {
        const alts = [...document.querySelectorAll("img[alt]")]
          .filter((img) => img.getBoundingClientRect().width > 0)
          .map((img) => img.getAttribute("alt") ?? "")
          .join(" \n ");
        return `${document.body.innerText} \n ${alts}`;
      })
    ).toLowerCase();
    const before = failures.length;
    for (const item of expected) {
      checked += 1;
      if (!body.includes(item.text.toLowerCase())) {
        failures.push(`${story.id} :: ${item.where} :: ${item.text.slice(0, 90)}`);
      }
    }
    console.log(
      `${failures.length === before ? "ok  " : "... "} ${story.id} (${expected.length} strings)`
    );
  }

  await browser.close();

  console.log(`\nchecked ${checked} authored strings`);
  if (failures.length) {
    console.log(`MISSING ${failures.length}:`);
    for (const failure of failures) console.log("  -", failure);
    process.exitCode = 1;
  } else {
    console.log("every authored string is present in the rendered story");
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
