import type { Metadata } from "next";
import { Suspense } from "react";
import { GitCompareArrows } from "lucide-react";
import { CompareClient } from "@/components/compare/CompareClient";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Compare artifacts — documented values side by side",
  description:
    "Compare two GRAVERSE artifact records: mission status, hardware status, derived communication status, dates, location and fate. Unknown values stay unknown.",
};

export default function ComparePage() {
  const locale = getLocale();
  return (
    <div className="pb-16">
      <section className="border-b border-white/10">
        <div className="container-content py-12 sm:py-14">
          <p className="eyebrow flex items-center gap-2">
            <GitCompareArrows aria-hidden="true" className="h-3.5 w-3.5" />
            {t(locale, "sections.compare.eyebrow")}
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
            {t(locale, "sections.compare.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
            {t(locale, "sections.compare.description")}
          </p>
        </div>
      </section>
      <Suspense
        fallback={
          <div className="container-content py-10">
            <p className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-text-secondary">
              Loading the comparison table…
            </p>
          </div>
        }
      >
        <CompareClient />
      </Suspense>
    </div>
  );
}
