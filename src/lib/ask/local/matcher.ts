import {
  localEntities,
  localEntitiesByAnyToken,
  localEntitiesByNameToken,
  localEntitiesByToken,
  type LocalEntity,
  type LocalEntityKind,
} from "./entities";
import { LOCAL_INTENTS, type LocalIntent } from "./intents";
import { LOCAL_FAQ, type LocalFaqEntry } from "./faq";
import { LOCAL_ASPECTS, type LocalAspect } from "./records";
import {
  contentTokens,
  fuzzyTokenScore,
  normalizeText,
  tokenize,
  tokenizeAll,
} from "./normalize";
import type { AskLocale } from "../types";

/**
 * Layer D — deterministic local matching.
 *
 * No remote service, no embedding, no learned model. The matcher works on
 * normalised text, keyword and phrase matching, synonym aliases, token
 * coverage and a bounded edit distance, and it reports a confidence for every
 * candidate so the router can decide whether the evidence is good enough.
 */

/** The confidence bands the router uses. */
export const LOCAL_CONFIDENCE = {
  /** A match this strong may be answered locally on its own. */
  strong: 0.9,
  /** A match this strong may be answered locally only when every required
   *  field and every cited source is available. */
  supported: 0.8,
} as const;

export interface EntityMatch {
  entity: LocalEntity;
  score: number;
  /** The alias that matched, for debugging. */
  matched: string;
  /** True when the entity came from the page the visitor is on. */
  contextual: boolean;
  /** Where the mention was found in the question, for ordering. */
  position: number;
}

export interface AspectMatch {
  aspect: LocalAspect;
  score: number;
  /** The share of the question's content words the trigger accounts for. */
  coverage: number;
}

export interface FaqMatch {
  entry: LocalFaqEntry;
  score: number;
}

export interface IntentMatch {
  intent: LocalIntent;
  score: number;
}

/* -------------------------------------------------------------- utilities */

/** True when the token sequence appears, contiguously, in the question. */
function containsSequence(tokens: string[], sequence: string[]): number {
  if (sequence.length === 0 || sequence.length > tokens.length) return -1;
  for (let start = 0; start + sequence.length <= tokens.length; start += 1) {
    let matched = true;
    for (let offset = 0; offset < sequence.length; offset += 1) {
      if (tokens[start + offset] !== sequence[offset]) {
        matched = false;
        break;
      }
    }
    if (matched) return start;
  }
  return -1;
}

/** True when every token of the sequence appears somewhere in the question. */
function coversAll(tokens: string[], sequence: string[]): boolean {
  if (sequence.length === 0) return false;
  const set = new Set(tokens);
  return sequence.every((token) => set.has(token));
}

/* ----------------------------------------------------------- entity match */

/**
 * Finds the GRAVERSE records a question is about.
 *
 * A contextual record — the page the visitor is on — is always a candidate
 * and always scores highest, because the visitor is demonstrably looking at
 * it.
 */
export function matchEntities(
  question: string,
  context?: { kind: LocalEntityKind; id: string } | null
): EntityMatch[] {
  const tokens = tokenize(question);
  if (tokens.length === 0) return [];

  const matches = new Map<string, EntityMatch>();
  const tokenSet = new Set(tokens);

  // 1. Multi-token aliases: a full name in the question.
  for (const entity of localEntities()) {
    for (const aliasTokens of entity.aliasTokens) {
      if (aliasTokens.length < 2) continue;
      const position = containsSequence(tokens, aliasTokens);
      if (position < 0) continue;
      const score = Math.min(0.99, 0.72 + aliasTokens.length * 0.08);
      const current = matches.get(entity.key);
      if (!current || current.score < score) {
        matches.set(entity.key, {
          entity,
          score,
          matched: aliasTokens.join(" "),
          contextual: false,
          position,
        });
      }
    }
  }

  // 2. Single-token aliases: "mars", "moon", "nasa", "voyager".
  for (const token of tokenSet) {
    for (const entity of localEntitiesByToken(token)) {
      const current = matches.get(entity.key);
      if (current && current.score >= 0.8) continue;
      matches.set(entity.key, {
        entity,
        score: 0.8,
        matched: token,
        contextual: false,
        position: tokens.indexOf(token),
      });
    }
  }

  // 2b. A distinctive single word that belongs to exactly one record, such as
  // "perseverance". It identifies the record, but less firmly than a name.
  for (const token of tokenSet) {
    if (!isDistinctiveToken(token)) continue;
    for (const entity of localEntitiesByNameToken(token)) {
      const current = matches.get(entity.key);
      if (current && current.score >= 0.78) continue;
      matches.set(entity.key, {
        entity,
        score: 0.78,
        matched: token,
        contextual: false,
        position: tokens.indexOf(token),
      });
    }
  }

  // 3. Fuzzy: a close spelling of a longer name.
  //
  // Only a *distinctive* token may identify an entity this way, and only the
  // record whose own name carries that token is considered. A word like
  // "rover" appears in a dozen names, so matching it would point at the
  // wrong machine; a word like "perseverance" belongs to one.
  const questionTokens = contentTokens(question);
  if (questionTokens.length > 0) {
    for (const token of questionTokens) {
      if (!isDistinctiveToken(token)) continue;
      for (const entity of localEntitiesByNameToken(token)) {
        if (matches.has(entity.key)) continue;
        const score = fuzzyTokenScore(token, entity.tokens);
        if (score < 0.7) continue;
        matches.set(entity.key, {
          entity,
          score: score * 0.85,
          matched: "(spelling)",
          contextual: false,
          position: tokens.indexOf(token),
        });
      }
    }
  }

  // 4. The contextual record wins outright.
  if (context) {
    const key = `${context.kind}:${context.id}`;
    const entity = matches.get(key)?.entity ?? findEntity(context);
    if (entity) {
      matches.set(key, {
        entity,
        score: 1,
        matched: "context",
        contextual: true,
        position: 0,
      });
    }
  }

  return [...matches.values()].sort(
    (a, b) => b.score - a.score || a.entity.name.localeCompare(b.entity.name)
  );
}

function findEntity(context: {
  kind: LocalEntityKind;
  id: string;
}): LocalEntity | undefined {
  const key = `${context.kind}:${context.id}`;
  return localEntities().find((entity) => entity.key === key);
}

/**
 * Tokens that identify only one record.
 *
 * Words like "rover", "lander", "orbiter" or "galaxy" appear in many names,
 * so a fuzzy match on one of them would point at the wrong record. The
 * count is computed once from the index.
 */
let distinctiveTokens: Set<string> | null = null;

function isDistinctiveToken(token: string): boolean {
  if (!distinctiveTokens) {
    const counts = new Map<string, number>();
    for (const entity of localEntities()) {
      for (const nameToken of entity.nameTokens) {
        counts.set(nameToken, (counts.get(nameToken) ?? 0) + 1);
      }
    }
    distinctiveTokens = new Set(
      [...counts.entries()]
        .filter(([, count]) => count === 1)
        .map(([nameToken]) => nameToken)
    );
  }
  return distinctiveTokens.has(token);
}

/**
 * True when two candidates are too close to choose between.
 *
 * An ambiguous question must not receive a confident local answer.
 */
export function isAmbiguous(matches: EntityMatch[]): boolean {
  if (matches.length < 2) return false;
  const [first, second] = matches;
  if (!first || !second) return false;
  if (first.contextual !== second.contextual) return false;
  return first.score - second.score < 0.06 && first.entity.kind === second.entity.kind;
}

/* ------------------------------------------------------------ aspect match */

/**
 * Finds which aspect of a record a question is about.
 *
 * The question is first stripped of the entity mention, so "how many moons
 * does Mars have" is read as a question about moons rather than about Mars.
 */
export function matchAspect(
  question: string,
  kind: LocalEntityKind,
  entityTokens: Iterable<string> = []
): AspectMatch | null {
  const raw = tokenizeAll(question);
  const excluded = new Set(entityTokens);
  const stripped = raw.filter((token) => !excluded.has(token));
  const content = contentTokens(stripped.join(" "));
  const contentSet = new Set(content);

  let best: AspectMatch | null = null;

  for (const definition of LOCAL_ASPECTS) {
    if (!definition.kinds.includes(kind)) continue;
    const triggers = [
      ...definition.triggers.map((trigger) => trigger.join(" ")),
      ...definition.triggersAr.map((trigger) => trigger.join(" ")),
    ];

    let length = 0;
    let coverage = 0;
    let position = -1;
    let strength = 0;
    let hit = false;

    for (const rawTrigger of triggers) {
      const sequence = tokenizeAll(rawTrigger);
      const triggerContent = sequence.filter((token) => !isStopToken(token));
      const at = containsSequence(stripped, sequence);

      // A trigger either appears as a phrase, or all of its meaningful words
      // appear somewhere in the question. The second, weaker form catches
      // "why was this machine sent into space", where the words of the
      // trigger are separated.
      const scattered =
        at < 0 &&
        triggerContent.length > 0 &&
        coversAll(stripped, triggerContent);
      if (at < 0 && !scattered) continue;
      hit = true;

      const share =
        content.length === 0
          ? 1
          : triggerContent.filter((token) => contentSet.has(token)).length /
            content.length;

      if (
        share > coverage ||
        (share === coverage && sequence.length > length) ||
        (share === coverage && sequence.length === length && at > position)
      ) {
        coverage = share;
        length = sequence.length;
        position = at;
        strength = at >= 0 ? 1 : 0.8;
      }
    }

    if (!hit) continue;

    const score =
      strength * (0.6 + 0.25 * coverage + 0.15 * Math.min(1, length / 4));

    if (!best || score > best.score) {
      best = { aspect: definition.aspect, score, coverage };
    }
  }

  return best;
}

function isStopToken(token: string): boolean {
  return (
    token.length <= 2 ||
    [
      "what", "is", "the", "a", "an", "of", "to", "in", "on", "for", "and",
      "or", "are", "was", "were", "do", "does", "did", "can", "could",
      "me", "my", "it", "its", "this", "that", "with", "by", "from", "at",
      "as", "be", "been", "how", "why", "when", "where", "which", "who",
    ].includes(token)
  );
}

/* -------------------------------------------------------------- faq match */

/**
 * Scores a question against the curated knowledge base.
 *
 * The best single question or alias is used, not the union of the entry's
 * keywords, so an entry is not "matched" by one incidental word.
 */
export function matchFaq(
  question: string,
  locale: AskLocale
): FaqMatch | null {
  const query = contentTokens(question);
  if (query.length === 0) return null;
  const querySet = new Set(query);

  let best: FaqMatch | null = null;

  for (const entry of LOCAL_FAQ) {
    if (!entry.locales.includes(locale)) continue;

    const phrases: string[][] = [[entry.question], entry.aliases];
    if (locale === "ar" && entry.questionAr) {
      phrases.push([entry.questionAr], entry.aliasesAr ?? []);
    }

    for (const group of phrases) {
      for (const phrase of group) {
        const phraseTokens = contentTokens(phrase);
        if (phraseTokens.length === 0) continue;
        const phraseSet = new Set(phraseTokens);

        let hits = 0;
        for (const token of querySet) {
          if (phraseSet.has(token)) hits += 1;
        }
        const forward = hits / querySet.size;

        let phraseHits = 0;
        for (const token of phraseSet) {
          if (querySet.has(token)) phraseHits += 1;
        }
        const reverse = phraseHits / phraseSet.size;

        const score = 0.72 * forward + 0.28 * reverse;
        if (!best || score > best.score) {
          best = { entry, score };
        }
      }
    }
  }

  return best;
}

/* ------------------------------------------------------------ intent match */

/**
 * Finds a conversational intent: a greeting, a thank-you, a goodbye or a
 * question about how GRAVERSE works.
 */
export function matchIntent(
  question: string,
  locale: AskLocale
): IntentMatch | null {
  const tokens = tokenizeAll(question);
  if (tokens.length === 0) return null;

  for (const intent of LOCAL_INTENTS) {
    const triggers =
      locale === "ar"
        ? [...intent.triggersAr, ...intent.triggers]
        : [...intent.triggers, ...intent.triggersAr];
    for (const trigger of triggers) {
      const sequence = tokenizeAll(trigger.join(" "));
      if (containsSequence(tokens, sequence) >= 0) {
        return { intent, score: 1 };
      }
    }
  }
  return null;
}

/* ------------------------------------------------------------- comparison */

/**
 * Finds two entities in a comparison question.
 *
 * Returns `null` unless two distinct entities are named.
 */
export function matchComparisonPair(
  question: string,
  context?: { kind: LocalEntityKind; id: string } | null
): [EntityMatch, EntityMatch] | null {
  const matches = matchEntities(question, context);
  if (matches.length < 2) return null;

  const [first, second] = matches;
  if (!first || !second) return null;
  if (first.entity.key === second.entity.key) return null;
  if (first.entity.kind !== second.entity.kind) return null;
  if (second.score < 0.6) return null;

  // Keep the order the visitor used: "compare Mars and Earth" reads as
  // Mars first.
  return first.position <= second.position ? [first, second] : [second, first];
}

/** The normalised question, used as the cache key. */
export function localQuestionKey(question: string): string {
  return normalizeText(question);
}
