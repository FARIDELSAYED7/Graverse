import assert from "node:assert/strict";
import test from "node:test";
import * as React from "react";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { AskMarkdown } from "@/components/ask/markdown";
import { sources } from "@/data/sources";
import type { AskSourceRef } from "@/lib/ask/types";

/**
 * Ask GRAVERSE Markdown rendering.
 *
 * The renderer is the one place where a model's text becomes page markup, so
 * these tests pin down the two guarantees that matter: nothing is ever
 * injected as HTML, and a citation can only become a link when the server
 * actually returned that source.
 */

// The test runner compiles JSX with the classic runtime, so `React` has to be
// reachable when a component renders. Next.js itself uses the automatic
// runtime and never needs this.
(globalThis as unknown as { React: typeof React }).React = React;

function render(text: string, list: AskSourceRef[] = []): string {
  return renderToStaticMarkup(
    createElement(AskMarkdown, { text, sources: list })
  );
}

const known = sources.find((source) => source.id === "SRC-APOLLO-11");
assert.ok(known, "the registry must contain the source used in the tests");

test("headings, paragraphs and emphasis are rendered", () => {
  const html = render("## A heading\n\nA paragraph with **bold** and *italic*.");
  assert.match(html, /<h3[^>]*>[\s\S]*A heading/);
  assert.match(html, /<strong[^>]*>bold<\/strong>/);
  assert.match(html, /<em[^>]*>italic<\/em>/);
});

test("unordered and ordered lists are rendered", () => {
  const unordered = render("- first\n- second");
  assert.match(unordered, /<ul/);
  assert.match(unordered, /first/);

  const ordered = render("1. alpha\n2. beta");
  assert.match(ordered, /<ol/);
  assert.match(ordered, /beta/);
});

test("inline code and code blocks are rendered as code", () => {
  const inline = render("Use `max_tokens` to bound the answer.");
  assert.match(inline, /<code[^>]*>max_tokens<\/code>/);

  const block = render("```\nconst x = 1;\n```");
  assert.match(block, /<pre/);
  assert.match(block, /const x = 1;/);
});

test("a link is rendered for an http address", () => {
  const html = render("See [the mission page](https://science.nasa.gov/mission/apollo-11/).");
  assert.match(html, /href="https:\/\/science\.nasa\.gov\/mission\/apollo-11\/"/);
  assert.match(html, /rel="noopener noreferrer"/);
});

test("a dangerous URL is never turned into a link", () => {
  const html = render("[click](javascript:alert(1))");
  assert.equal(/href="[^"]*javascript:/i.test(html), false);
  assert.equal(html.includes("<a "), false);
  assert.match(html, /click/);
});

test("markup in an answer is escaped rather than executed", () => {
  const html = render('<img src=x onerror="alert(1)"> and <script>alert(2)</script>');
  assert.equal(html.includes("<img"), false);
  assert.equal(html.includes("<script"), false);
  assert.match(html, /&lt;/);
});

test("a citation becomes a link only when the server returned that source", () => {
  const withSource = render("Ranger 7 impacted the Moon [SRC-RANGER-7].", [
    {
      id: "SRC-RANGER-7",
      organization: "NASA Science",
      title: "Ranger 7",
      url: "https://science.nasa.gov/mission/ranger-7/",
      type: "mission-page",
      accessedAt: "2026-11-10",
    },
  ]);
  assert.match(withSource, /href="https:\/\/science\.nasa\.gov\/mission\/ranger-7\/"/);
  assert.match(withSource, /SRC-RANGER-7/);

  const withoutSource = render("Ranger 7 impacted the Moon [SRC-RANGER-7].", []);
  assert.equal(withoutSource.includes("href="), false);
  assert.match(withoutSource, /SRC-RANGER-7/);
});

test("every source link points at a registered GRAVERSE source", () => {
  const registry = new Map(sources.map((source) => [source.id, source.url]));
  const html = render(
    "Apollo 11 left hardware on the Moon [SRC-APOLLO-11] and [SRC-NSSDCA-APOLLO-11].",
    [
      {
        id: "SRC-APOLLO-11",
        organization: "NASA",
        title: "Apollo 11",
        url: registry.get("SRC-APOLLO-11") ?? "",
        type: "mission-page",
        accessedAt: "2026-11-10",
      },
    ]
  );
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
  for (const href of hrefs) {
    assert.ok(
      [...registry.values()].includes(href),
      `${href} is not a registered source URL`
    );
  }
  assert.equal(hrefs.length, 1, "only the returned source may become a link");
});

test("a block quote is rendered as a quote", () => {
  const html = render("> The available GRAVERSE records do not establish this information.");
  assert.match(html, /<blockquote/);
});

test("plain text without markup is still rendered", () => {
  const html = render("Just a sentence.");
  assert.match(html, /Just a sentence\./);
  assert.equal(html.includes("<p"), true);
});
