import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Layers } from "lucide-react";
import { Flashcards } from "@/components/academy/Flashcards";

export const metadata: Metadata = {
  title: "Flashcards — Space Academy",
  description:
    "Study the space terms used across GRAVERSE lessons and the glossary. A local study aid, not a graded test.",
};

export default function FlashcardsPage() {
  return (
    <div className="container-content max-w-3xl pb-16 pt-10">
      <Link
        href="/academy"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14213B] underline-offset-4 hover:underline"
      >
        <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
        Space Academy
      </Link>
      <div className="mt-4 max-w-2xl">
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9C4321]">
          <Layers aria-hidden="true" className="h-3.5 w-3.5" />
          Study aid
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#14213B] sm:text-4xl">
          Flashcards
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-[#46536B] sm:text-base">
          Read the term, explain it in your own words, then reveal the definition used
          in the lessons.
        </p>
      </div>
      <div className="mt-6">
        <Flashcards />
      </div>
    </div>
  );
}
