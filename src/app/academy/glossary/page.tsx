import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookMarked } from "lucide-react";
import { glossary } from "@/data/glossary";

export const metadata: Metadata = {
  title: "Word lab — space glossary",
  description:
    "Forty plain-language definitions of space hardware, mission and data terms used across GRAVERSE.",
};

const categoryLabel: Record<(typeof glossary)[number]["category"], string> = {
  hardware: "Hardware",
  mission: "Missions",
  science: "Science",
  data: "Data and evidence",
};

const order = ["hardware", "mission", "science", "data"] as const;

function slug(term: string) {
  return term.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function GlossaryPage() {
  return (
    <div className="container-content pb-16 pt-10">
      <Link
        href="/academy"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14213B] underline-offset-4 hover:underline"
      >
        <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
        Space Academy
      </Link>
      <div className="mt-4 max-w-2xl">
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9C4321]">
          <BookMarked aria-hidden="true" className="h-3.5 w-3.5" />
          Word lab
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#14213B] sm:text-4xl">
          The words NASA uses
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-[#46536B] sm:text-base">
          {glossary.length} space words in plain language.
        </p>
      </div>

      <nav aria-label="Glossary categories" className="mt-6 flex flex-wrap gap-2">
        {order.map((category) => (
          <a
            key={category}
            href={`#${category}`}
            className="inline-flex h-9 items-center rounded-full border border-[#14213B]/15 bg-white/60 px-4 text-xs font-semibold text-[#14213B] hover:bg-white"
          >
            {categoryLabel[category]}
          </a>
        ))}
      </nav>

      <div className="mt-8 space-y-10">
        {order.map((category) => {
          const entries = glossary.filter((entry) => entry.category === category);
          return (
            <section key={category} id={category} className="scroll-mt-24" aria-labelledby={`${category}-heading`}>
              <h2 id={`${category}-heading`} className="text-lg font-semibold text-[#14213B]">
                {categoryLabel[category]}
              </h2>
              <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                {entries.map((entry) => (
                  <div
                    key={entry.term}
                    id={slug(entry.term)}
                    className="academy-card scroll-mt-24 rounded-xl p-4"
                  >
                    <dt className="text-sm font-semibold text-[#14213B]">{entry.term}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-[#46536B]">
                      {entry.definition}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          );
        })}
      </div>
    </div>
  );
}
