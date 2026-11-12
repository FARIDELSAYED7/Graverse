"use client";

import type { ReactNode } from "react";
import type { AskSourceRef } from "@/lib/ask/types";

/**
 * A small, safe Markdown renderer for Ask GRAVERSE answers.
 *
 * It is written by hand rather than pulled in as a dependency because the
 * surface is narrow: headings, paragraphs, ordered and unordered lists, code
 * spans, code blocks, block quotes, links and GRAVERSE source citations.
 *
 * It never uses `dangerouslySetInnerHTML`. Every node is a React element, so a
 * model can never inject markup into the page. Links are restricted to
 * `http`, `https` and site-relative paths, and a citation only becomes a link
 * when that source id was actually returned by the server.
 */

type Inline =
  | { kind: "text"; text: string }
  | { kind: "code"; text: string }
  | { kind: "strong"; text: string }
  | { kind: "em"; text: string }
  | { kind: "link"; text: string; href: string }
  | { kind: "citation"; text: string; source?: AskSourceRef };

type Block =
  | { kind: "heading"; level: number; children: Inline[] }
  | { kind: "paragraph"; children: Inline[] }
  | { kind: "list"; ordered: boolean; items: Inline[][] }
  | { kind: "code"; language?: string; code: string }
  | { kind: "quote"; children: Inline[] };

const INLINE_PATTERN =
  /(`[^`\n]+`)|(\*\*[^*\n]+\*\*)|(__[^_\n]+__)|(\*[^*\n]+\*)|(_[^_\n]+_)|(\[[^\]\n]+\]\([^)\s]+\))|(\[SRC-[A-Z0-9-]+\])|(https?:\/\/[^\s<>()]+)/g;

/** Only these URL shapes become links. */
function safeHref(raw: string): string | null {
  const value = raw.trim();
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  if (/^https?:\/\/[^\s]+$/i.test(value)) return value;
  return null;
}

function parseInline(text: string, sources: Map<string, AskSourceRef>): Inline[] {
  const nodes: Inline[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  INLINE_PATTERN.lastIndex = 0;
  while ((match = INLINE_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push({ kind: "text", text: text.slice(lastIndex, match.index) });
    }
    const [full, code, strong, strongAlt, em, emAlt, link, citation, url] =
      match;

    if (code) {
      nodes.push({ kind: "code", text: code.slice(1, -1) });
    } else if (strong || strongAlt) {
      nodes.push({
        kind: "strong",
        text: (strong ?? strongAlt ?? "").replace(/^(\*\*|__)|(\*\*|__)$/g, ""),
      });
    } else if (em || emAlt) {
      nodes.push({
        kind: "em",
        text: (em ?? emAlt ?? "").replace(/^(\*|_)|(\*|_)$/g, ""),
      });
    } else if (link) {
      const linkMatch = link.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
      const href = linkMatch ? safeHref(linkMatch[2]) : null;
      if (linkMatch && href) {
        nodes.push({ kind: "link", text: linkMatch[1], href });
      } else {
        nodes.push({ kind: "text", text: link });
      }
    } else if (citation) {
      const id = citation.slice(1, -1);
      nodes.push({ kind: "citation", text: id, source: sources.get(id) });
    } else if (url) {
      const href = safeHref(url);
      nodes.push(
        href
          ? { kind: "link", text: url, href }
          : { kind: "text", text: url }
      );
    } else {
      nodes.push({ kind: "text", text: full });
    }

    lastIndex = match.index + full.length;
  }

  if (lastIndex < text.length) {
    nodes.push({ kind: "text", text: text.slice(lastIndex) });
  }
  return nodes;
}

function parseBlocks(text: string, sources: Map<string, AskSourceRef>): Block[] {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let index = 0;

  const isBlockStart = (line: string) =>
    /^\s*(```|>|#{1,6}\s|[-*+]\s|\d+[.)]\s)/.test(line);

  while (index < lines.length) {
    const line = lines[index];

    const fence = line.match(/^\s*```(\w*)\s*$/);
    if (fence) {
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !/^\s*```\s*$/.test(lines[index])) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push({
        kind: "code",
        language: fence[1] || undefined,
        code: code.join("\n"),
      });
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      blocks.push({
        kind: "heading",
        level: heading[1].length,
        children: parseInline(heading[2], sources),
      });
      index += 1;
      continue;
    }

    if (/^\s*>\s?/.test(line)) {
      const quote: string[] = [];
      while (index < lines.length && /^\s*>\s?/.test(lines[index])) {
        quote.push(lines[index].replace(/^\s*>\s?/, ""));
        index += 1;
      }
      blocks.push({
        kind: "quote",
        children: parseInline(quote.join(" ").trim(), sources),
      });
      continue;
    }

    const bullet = line.match(/^\s*[-*+]\s+(.*)$/);
    const ordered = line.match(/^\s*\d+[.)]\s+(.*)$/);
    if (bullet || ordered) {
      const isOrdered = Boolean(ordered);
      const items: string[] = [];
      while (index < lines.length) {
        const item = isOrdered
          ? lines[index].match(/^\s*\d+[.)]\s+(.*)$/)
          : lines[index].match(/^\s*[-*+]\s+(.*)$/);
        if (!item) break;
        items.push(item[1]);
        index += 1;
      }
      blocks.push({
        kind: "list",
        ordered: isOrdered,
        items: items.map((item) => parseInline(item, sources)),
      });
      continue;
    }

    if (line.trim() === "") {
      index += 1;
      continue;
    }

    const paragraph: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() !== "" &&
      !isBlockStart(lines[index])
    ) {
      paragraph.push(lines[index]);
      index += 1;
    }
    if (paragraph.length === 0) {
      paragraph.push(lines[index] ?? "");
      index += 1;
    }
    blocks.push({
      kind: "paragraph",
      children: parseInline(paragraph.join("\n"), sources),
    });
  }

  return blocks;
}

/* --------------------------------------------------------------- rendering */

function renderInline(nodes: Inline[], keyPrefix: string): ReactNode[] {
  return nodes.map((node, index) => {
    const key = `${keyPrefix}-${index}`;
    switch (node.kind) {
      case "code":
        return (
          <code
            key={key}
            className="rounded bg-white/[0.08] px-1.5 py-0.5 font-mono text-[0.82em] text-[#b8f0e4]"
          >
            {node.text}
          </code>
        );
      case "strong":
        return (
          <strong key={key} className="font-semibold text-white">
            {node.text}
          </strong>
        );
      case "em":
        return (
          <em key={key} className="italic">
            {node.text}
          </em>
        );
      case "link":
        return (
          <a
            key={key}
            href={node.href}
            {...(node.href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="text-[#7df3dd] underline decoration-[#7df3dd]/40 underline-offset-2 hover:decoration-[#7df3dd]"
          >
            {node.text}
          </a>
        );
      case "citation":
        return node.source ? (
          <a
            key={key}
            href={node.source.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`${node.source.organization} — ${node.source.title}`}
            className="mx-0.5 inline-flex items-baseline rounded border border-accent/35 bg-accent/10 px-1.5 py-px font-mono text-[0.72em] text-[#9ff5e2] no-underline hover:bg-accent/20"
          >
            {node.text}
          </a>
        ) : (
          <span
            key={key}
            className="mx-0.5 inline rounded border border-white/15 px-1.5 py-px font-mono text-[0.72em] text-white/60"
          >
            {node.text}
          </span>
        );
      default:
        return <span key={key}>{node.text}</span>;
    }
  });
}

function renderBlock(block: Block, index: number): ReactNode {
  const key = `block-${index}`;
  switch (block.kind) {
    case "heading": {
      // The console's own title is an h2, so answer headings start at h3 and
      // the document outline stays in order.
      const Tag = block.level <= 2 ? "h3" : block.level === 3 ? "h4" : "h5";
      const size =
        block.level <= 2
          ? "text-[15px]"
          : block.level === 3
            ? "text-[14px]"
            : "text-[13px]";
      return (
        <Tag
          key={key}
          className={`mt-3 mb-1.5 font-semibold tracking-tight text-white first:mt-0 ${size}`}
        >
          {renderInline(block.children, key)}
        </Tag>
      );
    }
    case "list":
      return block.ordered ? (
        <ol
          key={key}
          className="my-1.5 ms-4 list-decimal space-y-1 marker:text-[#7df3dd]/70"
        >
          {block.items.map((item, itemIndex) => (
            <li key={`${key}-${itemIndex}`}>{renderInline(item, `${key}-${itemIndex}`)}</li>
          ))}
        </ol>
      ) : (
        <ul
          key={key}
          className="my-1.5 ms-4 list-disc space-y-1 marker:text-[#7df3dd]/70"
        >
          {block.items.map((item, itemIndex) => (
            <li key={`${key}-${itemIndex}`}>{renderInline(item, `${key}-${itemIndex}`)}</li>
          ))}
        </ul>
      );
    case "code":
      return (
        <pre
          key={key}
          className="my-2 overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-3 font-mono text-[12px] leading-relaxed text-[#cdeee6]"
        >
          <code>{block.code}</code>
        </pre>
      );
    case "quote":
      return (
        <blockquote
          key={key}
          className="my-2 border-s-2 border-accent/45 ps-3 text-white/75 italic"
        >
          {renderInline(block.children, key)}
        </blockquote>
      );
    default:
      return (
        <p key={key} className="my-1.5 leading-relaxed first:mt-0 last:mb-0">
          {renderInline(block.children, key)}
        </p>
      );
  }
}

/**
 * Renders an assistant answer.
 *
 * `sources` is the list the server returned. A citation only becomes a link
 * when its id is in that list, so a fabricated citation can never be turned
 * into a source link.
 */
export function AskMarkdown({
  text,
  sources = [],
}: {
  text: string;
  sources?: AskSourceRef[];
}) {
  const map = new Map(sources.map((source) => [source.id, source]));
  const blocks = parseBlocks(text, map);

  if (blocks.length === 0) {
    return (
      <p className="text-[13px] leading-relaxed text-white/70">{text}</p>
    );
  }

  return <>{blocks.map((block, index) => renderBlock(block, index))}</>;
}
