"use client";

import { useState } from "react";
import { BookOpen, ChevronDown } from "lucide-react";
import type { EchoGlossaryTerm } from "@/types/echo";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { pick } from "@/lib/echo/localized";

/**
 * The word lab.
 *
 * A short bilingual glossary. Each term opens to a plain-language
 * explanation first, with the technical definition available underneath for
 * anyone who wants it.
 */
export function ScienceGlossary({
  terms,
  locale,
}: {
  terms: EchoGlossaryTerm[];
  locale: Locale;
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  if (terms.length === 0) return null;

  return (
    <section
      aria-label={t(locale, "echo.glossary")}
      className="echo-card rounded-2xl p-5 sm:p-6"
    >
      <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-[#5b3fe0]">
        <BookOpen aria-hidden="true" className="h-4 w-4" />
        {t(locale, "echo.glossary")}
      </h3>

      <ul className="mt-4 divide-y divide-[#1a1338]/10">
        {terms.map((term) => {
          const open = openId === term.id;
          return (
            <li key={term.id}>
              <button
                type="button"
                onClick={() => setOpenId(open ? null : term.id)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-3 py-3 text-start"
              >
                <span className="text-base font-semibold text-[#1a1338]">
                  {pick(locale, term.term)}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={`h-4 w-4 shrink-0 text-[#6b6484] transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open ? (
                <div className="pb-3">
                  <p className="text-sm leading-relaxed text-[#4a4266]">
                    {pick(locale, term.simple)}
                  </p>
                  {term.technical ? (
                    <p className="mt-2 rounded-xl bg-[#f6f1e6] p-3 text-xs leading-relaxed text-[#6b6484]">
                      <span className="font-semibold uppercase tracking-[0.12em]">
                        {locale === "ar" ? "التعريف التقني" : "Technical term"}
                      </span>
                      <span className="mt-1 block text-[#4a4266]">
                        {pick(locale, term.technical)}
                      </span>
                    </p>
                  ) : null}
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
