/**
 * Text normalisation for the local answer engine.
 *
 * Everything here is deterministic and runs entirely offline. The rules are
 * deliberately conservative with Arabic: letter variants are unified and
 * diacritics are removed, but no letter is *replaced* by a different one, so
 * the meaning of a word never changes. Latin text loses its accents, which
 * only makes matching more forgiving.
 *
 * No embedding, no remote service, no learned model.
 */

/** Arabic diacritics (tashkeel), the superscript alef and the tatweel. */
const ARABIC_DIACRITICS = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g;

/**
 * Arabic letter variants that carry the same meaning and are unified so a
 * visitor can type any of them.
 *
 * `أ` `إ` `آ` `ٱ` become `ا`, and `ى` becomes `ي`. `ة` is left alone: it is a
 * different letter and swapping it would alter words such as `الناس`.
 */
const ARABIC_LETTER_VARIANTS: Array<[RegExp, string]> = [
  [/[أإآٱ]/g, "ا"],
  [/ى/g, "ي"],
  [/[ؤ]/g, "و"],
  [/[ئ]/g, "ي"],
];

/** Arabic-Indic and Eastern Arabic-Indic digits become ASCII digits. */
const ARABIC_DIGITS = /[\u0660-\u0669\u06F0-\u06F9]/g;

/** Latin combining marks, so "Persévérance" matches "Perseverance". */
const COMBINING_MARKS = /[\u0300-\u036f]/g;

const ENGLISH_STOP_WORDS = new Set([
  "a", "about", "an", "and", "any", "are", "as", "at", "be", "been", "but", "by",
  "can", "could", "did", "do", "does", "for", "from", "had", "has", "have", "how",
  "i", "in", "into", "is", "it", "its", "me", "more", "my", "of", "on", "or",
  "our", "please", "so", "some", "tell", "that", "the", "their", "them", "then",
  "there", "these", "they", "this", "to", "us", "was", "we", "were", "what",
  "when", "where", "which", "who", "why", "will", "with", "would", "you", "your",
  "explain", "give", "want", "need", "know", "there", "here",
  "also", "just", "like", "much", "many", "really", "thing", "things", "about",
  // Domain-generic nouns. They carry no subject, so they must not make a
  // question look like it is about something the archive does not hold.
  "machine", "machines", "record", "records", "detail", "details",
  "information", "info", "page", "pages", "site", "kind", "type", "number",
  "numbers", "part", "parts", "case", "cases", "example", "examples",
  "question", "questions", "answer", "answers", "way", "ways", "name", "names",
  "piece", "pieces", "item", "items", "one", "ones", "same", "different",
  "mission", "missions", "explorer", "museum", "academy", "story", "stories",
  "lesson", "lessons", "simulation", "simulations", "model", "models",
  "destination", "destinations", "agency", "agencies", "artifact", "artifacts",
  "program", "programs", "object", "objects",
]);

const ARABIC_STOP_WORDS = new Set([
  "من", "في", "على", "الى", "عن", "ما", "هل", "كم", "هذا", "هذه", "ذلك",
  "التي", "الذي", "كان", "كانت", "قد", "كل", "بين", "او", "ثم", "لكن", "حتى",
  "اذا", "كما", "بعد", "قبل", "عند", "هو", "هي", "هم", "نحن", "انا", "انت",
  "له", "لها", "لهم", "به", "بها", "لنا", "please", "كيف", "ماذا", "لماذا",
  "اشرح", "اخبرني", "قل", "اريد", "أريد", "اعطني", "اعطيني", "يمكن", "لو",
  "يا", "اذا", "الحين", "الان", "هناك", "شيء", "اشياء", "ام",
]);

/**
 * Normalises a question or a label for comparison.
 *
 * The result is lowercase, accent-free, Arabic-normalised and whitespace
 * collapsed.
 */
export function normalizeText(value: string): string {
  if (!value) return "";
  // NFKD first, so a precomposed "é" decomposes and its accent can be
  // removed; NFKC puts the remaining text back into its normal form.
  let text = value.normalize("NFKD").toLowerCase();
  text = text.replace(COMBINING_MARKS, "");
  text = text.replace(ARABIC_DIACRITICS, "");
  text = text.normalize("NFKC");
  text = text.replace(ARABIC_DIGITS, (digit) => {
    const code = digit.charCodeAt(0);
    const base = code >= 0x06f0 ? 0x06f0 : 0x0660;
    return String(code - base);
  });
  for (const [pattern, replacement] of ARABIC_LETTER_VARIANTS) {
    text = text.replace(pattern, replacement);
  }
  return text.replace(/[^\p{L}\p{N}\s]+/gu, " ").replace(/\s+/g, " ").trim();
}

/**
 * Arabic light stemming for matching.
 *
 * Only the two grammatical prefixes that change the shape of a word are
 * removed — the conjunction `و` and the definite article `ال`. Nothing is
 * replaced by a different letter, so the meaning of the word is untouched.
 * This lets "المريخ" in a question find the record named "Mars" through its
 * Arabic alias, and "والأرض" find "الأرض".
 */
export function arabicStem(token: string): string {
  let value = token;
  if (value.length >= 5 && value.startsWith("و")) value = value.slice(1);
  if (value.length >= 4 && value.startsWith("ال")) value = value.slice(2);
  return value;
}

/**
 * Splits normalised text into comparable tokens.
 *
 * Tokens shorter than two characters are dropped unless they are digits, so
 * "Io" and "Io" (Jupiter's moon) survive while stray single letters do not.
 * Arabic tokens are light-stemmed so the same word matches in every form.
 */
export function tokenize(value: string): string[] {
  const normalized = normalizeText(value);
  if (!normalized) return [];
  return normalized
    .split(" ")
    .filter((token) => token.length >= 2 || /^\d+$/.test(token))
    .map((token) => arabicStem(token));
}

/**
 * Splits normalised text without dropping single characters.
 *
 * Phrase matching needs this: "how can I use the Academy" keeps its "I", so
 * a trigger written with "i" still matches.
 */
export function tokenizeAll(value: string): string[] {
  const normalized = normalizeText(value);
  if (!normalized) return [];
  return normalized.split(" ").map((token) => arabicStem(token));
}

/** The tokens of a phrase with the stop words removed. */
export function contentTokens(value: string): string[] {
  const tokens = tokenize(value);
  return tokens.filter((token) => !isStopWord(token));
}

/** True for a stop word in either language. */
export function isStopWord(token: string): boolean {
  return ENGLISH_STOP_WORDS.has(token) || ARABIC_STOP_WORDS.has(token);
}

/**
 * How much of `query` is covered by `candidate`, as a number between 0 and 1.
 *
 * The score is the share of the query's content words that appear in the
 * candidate, so a long candidate cannot inflate the result.
 */
export function tokenCoverage(query: string[], candidate: Set<string>): number {
  if (query.length === 0) return 0;
  let hits = 0;
  for (const token of query) {
    if (candidate.has(token)) hits += 1;
  }
  return hits / query.length;
}

/**
 * A bounded edit distance.
 *
 * Returns `max + 1` as soon as the distance is known to exceed `max`, so it
 * stays cheap on long strings.
 */
export function editDistance(a: string, b: string, max = 3): number {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > max) return max + 1;

  let previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i += 1) {
    const current = [i];
    let rowMinimum = i;
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const value = Math.min(
        previous[j] + 1,
        current[j - 1] + 1,
        previous[j - 1] + cost
      );
      current.push(value);
      if (value < rowMinimum) rowMinimum = value;
    }
    if (rowMinimum > max) return max + 1;
    previous = current;
  }
  return previous[b.length];
}

/**
 * The best fuzzy score between a query token and a set of candidate tokens.
 *
 * A candidate only counts when it is long enough for an edit distance to mean
 * something, so "Io" is never matched to "Europa" by accident.
 */
export function fuzzyTokenScore(
  token: string,
  candidates: Iterable<string>
): number {
  if (token.length < 5) return 0;
  const tolerance = token.length >= 9 ? 2 : 1;
  let best = 0;
  for (const candidate of candidates) {
    if (candidate.length < 5) continue;
    if (Math.abs(candidate.length - token.length) > tolerance) continue;
    const distance = editDistance(token, candidate, tolerance);
    if (distance <= tolerance) {
      const score = 1 - distance / (token.length + 1);
      if (score > best) best = score;
    }
  }
  return best;
}
