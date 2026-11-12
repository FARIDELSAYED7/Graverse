import { getSources, sources } from "@/data/sources";
import { resolveAskContext } from "../retrieval";
import { isAskContextKind, type AskContextKind, type AskContextSummary } from "../types";
import type { AskLocale, AskSourceRef } from "../types";
import { LOCAL_FAQ } from "./faq";
import { pickVariant } from "./intents";
import {
  isAmbiguous,
  LOCAL_CONFIDENCE,
  matchAspect,
  matchComparisonPair,
  matchEntities,
  matchFaq,
  matchIntent,
  type EntityMatch,
} from "./matcher";
import { buildRecordAnswer, type LocalAspect } from "./records";
import {
  buildComparisonAnswer,
  buildMissionsAtDestination,
  buildRelatedAnswer,
} from "./relationships";
import { normalizeText, tokenize } from "./normalize";

/**
 * The local answer engine.
 *
 * This is the router:
 *
 *   question → FAQ → intent → record fields → relationships → confidence
 *            → local answer, or "not handled" so the provider can answer.
 *
 * It runs entirely on the server, entirely offline, and never contacts a
 * remote service. The provider is only reached when this module says the
 * evidence is not good enough.
 */

export type LocalRoute =
  | "intent"
  | "faq"
  | "record"
  | "comparison"
  | "relationship";

export interface LocalAnswer {
  answer: string;
  sourceIds: string[];
  sources: AskSourceRef[];
  context: AskContextSummary | null;
  route: LocalRoute;
  /** Internal only. Never sent to the browser. */
  confidence: number;
}

export interface LocalEngineInput {
  question: string;
  locale: AskLocale;
  context?: { kind: string; id: string } | null;
}

export interface LocalEngineResult {
  handled: boolean;
  answer?: LocalAnswer;
  /** Why the local engine passed the question on. Internal only. */
  reason?: string;
}

/** The registered source ids, as a set. */
function sourceRegistry(): Map<string, string> {
  return new Map(sources.map((source) => [source.id, source.url]));
}

function resolveSources(sourceIds: string[]): AskSourceRef[] | null {
  if (sourceIds.length === 0) return [];
  const registry = sourceRegistry();
  const records = getSources(sourceIds);
  if (records.length !== sourceIds.length) return null;
  return records.map((source) => {
    if (registry.get(source.id) !== source.url) {
      throw new Error("source provenance changed");
    }
    return {
      id: source.id,
      organization: source.organization,
      title: source.title,
      url: source.url,
      type: source.type,
      accessedAt: source.accessedAt,
      notes: source.notes,
    };
  });
}

/* ------------------------------------------------------------- FAQ layer */

function faqLayer(input: LocalEngineInput): LocalAnswer | null {
  const match = matchFaq(input.question, input.locale);
  if (!match) return null;
  if (match.score < LOCAL_CONFIDENCE.supported) return null;

  const entry = match.entry;
  const answer =
    input.locale === "ar" && entry.answerAr ? entry.answerAr : entry.answer;
  if (!answer) return null;

  // Every cited source must still be registered, or the entry is not
  // answerable and the question goes to the provider.
  let sources: AskSourceRef[] | null;
  try {
    sources = resolveSources(entry.sourceIds);
  } catch {
    return null;
  }
  if (!sources) return null;

  return {
    answer,
    sourceIds: entry.sourceIds,
    sources,
    context: null,
    route: "faq",
    confidence: Math.min(1, match.score),
  };
}

/* ----------------------------------------------------------- intent layer */

function intentLayer(input: LocalEngineInput): LocalAnswer | null {
  const match = matchIntent(input.question, input.locale);
  if (!match) return null;

  const intent = match.intent;
  const contextual = Boolean(input.context);
  const pool = contextual
    ? intent.contextualAnswers ?? intent.answers
    : intent.answers;
  const answer = pickVariant(pool, normalizeText(input.question));
  if (!answer) return null;

  return {
    answer,
    sourceIds: [],
    sources: [],
    context: null,
    route: "intent",
    confidence: 1,
  };
}

/* ----------------------------------------------------------- record layer */

function recordLayer(
  input: LocalEngineInput,
  context: AskContextSummary | null
): LocalAnswer | null {
  const contextEntity =
    context && isAskContextKind(context.kind)
      ? ({ kind: context.kind, id: context.id } as const)
      : null;

  const matches = matchEntities(input.question, contextEntity);
  if (matches.length === 0) return null;

  // A record the visitor named explicitly wins over the record they happen to
  // be looking at: on the Ranger page, "Explain Perseverance Rover" is still
  // a question about Perseverance.
  const named = matches.find(
    (match) => !match.contextual && match.score >= 0.78
  );
  const contextual = matches.find((match) => match.contextual);
  const top = named ?? contextual;
  if (!top) return null;
  if (!top.contextual && isAmbiguous(matches)) return null;

  const entityTokens = top.entity.tokens;
  const aspectMatch = matchAspect(input.question, top.entity.kind, entityTokens);
  if (!aspectMatch) return null;

  // The contextual record only answers a question that is actually about it.
  // "Explain quantum chromodynamics" on the Perseverance page is not a
  // question about Perseverance, and must not be answered as one.
  if (top.contextual && aspectMatch.coverage < 0.5) return null;

  const draft = buildRecordAnswer(
    top.entity.kind,
    top.entity.id,
    aspectMatch.aspect,
    input.locale
  );
  if (!draft) return null;

  let sources: AskSourceRef[] | null;
  try {
    sources = resolveSources(draft.sourceIds);
  } catch {
    return null;
  }
  if (!sources) return null;

  const confidence =
    0.45 * top.score + 0.55 * Math.min(1, aspectMatch.score);
  if (confidence < LOCAL_CONFIDENCE.supported) return null;

  return {
    answer: draft.answer,
    sourceIds: draft.sourceIds,
    sources,
    context: context ?? contextualSummary(top),
    route: "record",
    confidence,
  };
}

function contextualSummary(match: EntityMatch): AskContextSummary {
  return {
    kind: match.entity.kind,
    id: match.entity.id,
    title: match.entity.name,
    href: match.entity.href,
  };
}

/* ----------------------------------------------------- relationship layer */

const COMPARISON_TRIGGERS = [
  ["compare"],
  ["comparison"],
  ["versus"],
  ["vs"],
  ["difference", "between"],
  ["which", "launched", "first"],
  ["which", "came", "first"],
  ["older"],
  ["newer"],
  ["مقارنة"],
  ["قارن"],
  ["الفرق", "بين"],
  ["أيهم", "أقدم"],
  ["أقدم"],
];

const RELATED_TRIGGERS = [
  ["related"],
  ["connected"],
  ["connection"],
  ["associated"],
  ["what", "else"],
  ["ذو", "علاقة"],
  ["مرتبطة"],
  ["المتعلقة"],
];

const MISSIONS_AT_TRIGGERS = [
  ["which", "missions"],
  ["missions", "explored"],
  ["missions", "to"],
  ["what", "missions"],
  ["أيه", "المهام"],
  ["المهام", "التي"],
  ["أي", "مهام"],
];

function hasTrigger(tokens: string[], triggers: string[][]): boolean {
  for (const trigger of triggers) {
    const sequence = trigger.join(" ").split(" ");
    if (containsTokens(tokens, sequence)) return true;
  }
  return false;
}

function containsTokens(tokens: string[], sequence: string[]): boolean {
  if (sequence.length === 0 || sequence.length > tokens.length) return false;
  for (let start = 0; start + sequence.length <= tokens.length; start += 1) {
    let matched = true;
    for (let offset = 0; offset < sequence.length; offset += 1) {
      if (tokens[start + offset] !== sequence[offset]) {
        matched = false;
        break;
      }
    }
    if (matched) return true;
  }
  return false;
}

function relationshipLayer(
  input: LocalEngineInput,
  context: AskContextSummary | null
): LocalAnswer | null {
  const tokens = tokenize(input.question);
  const contextEntity =
    context && isAskContextKind(context.kind)
      ? ({ kind: context.kind, id: context.id } as const)
      : null;

  // Comparison: two records of the same kind, named in the question.
  if (hasTrigger(tokens, COMPARISON_TRIGGERS)) {
    const pair = matchComparisonPair(input.question, contextEntity);
    if (pair) {
      const [first, second] = pair;
      const draft = buildComparisonAnswer(
        { kind: first.entity.kind, id: first.entity.id },
        { kind: second.entity.kind, id: second.entity.id },
        input.locale
      );
      if (draft) {
        const sources = resolveSources(draft.sourceIds);
        if (sources) {
          return {
            answer: draft.answer,
            sourceIds: draft.sourceIds,
            sources,
            context: null,
            route: "comparison",
            confidence: Math.min(
              1,
              0.5 * Math.min(first.score, second.score) + 0.5
            ),
          };
        }
      }
    }
  }

  // Relationship: what is this record connected to?
  if (hasTrigger(tokens, RELATED_TRIGGERS)) {
    const matches = matchEntities(input.question, contextEntity);
    const top = matches[0];
    if (top && !isAmbiguous(matches)) {
      const draft = buildRelatedAnswer(
        top.entity.kind,
        top.entity.id,
        input.locale
      );
      if (draft) {
        const sources = resolveSources(draft.sourceIds);
        if (sources) {
          return {
            answer: draft.answer,
            sourceIds: draft.sourceIds,
            sources,
            context: contextualSummary(top),
            route: "relationship",
            confidence: Math.min(1, 0.5 * top.score + 0.5),
          };
        }
      }
    }
  }

  // Which missions worked at a destination?
  if (hasTrigger(tokens, MISSIONS_AT_TRIGGERS)) {
    const matches = matchEntities(input.question, null);
    const destination = matches.find(
      (match) => match.entity.kind === "body"
    );
    if (destination) {
      const draft = buildMissionsAtDestination(
        destination.entity.id,
        input.locale
      );
      if (draft) {
        const sources = resolveSources(draft.sourceIds);
        if (sources) {
          return {
            answer: draft.answer,
            sourceIds: draft.sourceIds,
            sources,
            context: contextualSummary(destination),
            route: "relationship",
            confidence: Math.min(1, 0.5 * destination.score + 0.5),
          };
        }
      }
    }
  }

  return null;
}

/* ----------------------------------------------------------------- router */

/**
 * Tries to answer a question locally.
 *
 * Returns `handled: false` when the evidence is not good enough, and the
 * caller then falls through to the provider.
 */
export function resolveLocalAnswer(input: LocalEngineInput): LocalEngineResult {
  const question = input.question.trim();
  if (!question) return { handled: false, reason: "empty" };

  const context =
    input.context && isAskContextKind(input.context.kind)
      ? (resolveAskContext(input.context.kind, input.context.id)?.summary ??
        null)
      : null;

  // 1. Curated knowledge and conversational intents. Both are precise, so
  //    the stronger match wins rather than a fixed order.
  const faq = faqLayer(input);
  const intent = intentLayer(input);
  if (intent && (!faq || intent.confidence >= faq.confidence)) {
    return { handled: true, answer: intent };
  }
  if (faq) return { handled: true, answer: faq };

  // 2. The record the visitor is on, or a record they named.
  const record = recordLayer(input, context);
  if (record) return { handled: true, answer: record };

  // 3. Comparisons and relationships.
  const relationship = relationshipLayer(input, context);
  if (relationship) return { handled: true, answer: relationship };

  return { handled: false, reason: "no local evidence" };
}

/** The number of curated knowledge entries. Used by the test suite. */
export const LOCAL_FAQ_COUNT = LOCAL_FAQ.length;

/** Exposed for the tests: the aspects a record kind can answer. */
export type { LocalAspect };
