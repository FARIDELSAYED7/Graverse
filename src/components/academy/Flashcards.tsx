"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Eye, RotateCcw } from "lucide-react";
import { lessons } from "@/data/lessons";
import { glossary } from "@/data/glossary";
import { cn } from "@/lib/cn";

interface Flashcard {
  id: string;
  term: string;
  definition: string;
  source: string;
}

const lessonCards: Flashcard[] = lessons.flatMap((lesson) =>
  lesson.keyTerms.map((term) => ({
    id: `${lesson.id}:${term.term}`,
    term: term.term,
    definition: term.definition,
    source: lesson.title,
  }))
);

const glossaryCards: Flashcard[] = glossary.map((entry) => ({
  id: `glossary:${entry.term}`,
  term: entry.term,
  definition: entry.definition,
  source: "Glossary",
}));

const decks = [
  { id: "lesson", label: "Lesson terms", cards: lessonCards },
  { id: "glossary", label: "Glossary", cards: glossaryCards },
  { id: "all", label: "Everything", cards: [...lessonCards, ...glossaryCards] },
] as const;

export function Flashcards() {
  const [deckId, setDeckId] = useState<(typeof decks)[number]["id"]>("lesson");
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());

  const deck = useMemo(
    () => decks.find((entry) => entry.id === deckId) ?? decks[0],
    [deckId]
  );
  const card = deck.cards[index] ?? deck.cards[0];

  function chooseDeck(id: (typeof decks)[number]["id"]) {
    setDeckId(id);
    setIndex(0);
    setRevealed(false);
  }

  function next() {
    setRevealed(false);
    setIndex((current) => (current + 1) % deck.cards.length);
  }

  function previous() {
    setRevealed(false);
    setIndex((current) => (current - 1 + deck.cards.length) % deck.cards.length);
  }

  function markKnown() {
    setKnown((current) => new Set(current).add(card.id));
    next();
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {decks.map((entry) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => chooseDeck(entry.id)}
            aria-pressed={deckId === entry.id}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium",
              deckId === entry.id
                ? "border-[#14213B] bg-[#14213B] text-[#FFF8EC]"
                : "border-[#14213B]/15 bg-white text-[#46536B] hover:border-[#14213B]/40"
            )}
          >
            {entry.label} · {entry.cards.length}
          </button>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 text-xs text-[#5F6B83]">
        <span>
          Card {index + 1} of {deck.cards.length}
        </span>
        <span>{known.size} marked known</span>
      </div>

      <div className="academy-card mt-3 rounded-2xl p-6 sm:p-8">
        <p className="text-[10px] uppercase tracking-[0.16em] text-[#9C4321]">{card.source}</p>
        <p className="mt-3 text-2xl font-semibold text-[#14213B] sm:text-3xl">{card.term}</p>
        <div className="mt-4 min-h-[5rem] border-t border-[#14213B]/10 pt-4">
          {revealed ? (
            <p className="text-sm leading-relaxed text-[#46536B] sm:text-base">{card.definition}</p>
          ) : (
            <p className="text-sm text-[#5F6B83]">
              Try to explain the term in your own words before revealing the definition.
            </p>
          )}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setRevealed((value) => !value)}
            className="inline-flex items-center gap-2 rounded-full bg-[#14213B] px-4 py-2 text-sm font-semibold text-[#FFF8EC]"
          >
            <Eye aria-hidden="true" className="h-4 w-4" />
            {revealed ? "Hide definition" : "Reveal definition"}
          </button>
          <button
            type="button"
            onClick={markKnown}
            className="inline-flex items-center gap-2 rounded-full border border-[#14213B]/20 px-4 py-2 text-sm font-medium text-[#14213B]"
          >
            I know this
          </button>
          <button
            type="button"
            onClick={() => {
              setKnown(new Set());
              setIndex(0);
              setRevealed(false);
            }}
            className="inline-flex items-center gap-2 rounded-full border border-[#14213B]/20 px-4 py-2 text-sm font-medium text-[#14213B]"
          >
            <RotateCcw aria-hidden="true" className="h-4 w-4" />
            Reset
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={previous}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#14213B]/20 px-4 py-2 text-sm font-medium text-[#14213B]"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Previous
        </button>
        <button
          type="button"
          onClick={next}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#14213B]/20 px-4 py-2 text-sm font-medium text-[#14213B]"
        >
          Next
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-[#5F6B83]">
        Definitions are the same ones used in the lessons and glossary. This is a
        study aid, not a graded test.
      </p>
    </div>
  );
}
