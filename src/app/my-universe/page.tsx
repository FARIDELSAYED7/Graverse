import type { Metadata } from "next";
import { Heart } from "lucide-react";
import { MyUniverseClient } from "@/components/personal/MyUniverseClient";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "My Universe — favourites, collections and recent records",
  description:
    "Your local GRAVERSE favourites, named collections, recently viewed artifacts and completed simulations. Stored only in this browser.",
};

export default function MyUniversePage() {
  const locale = getLocale();
  return (
    <div className="pb-16">
      <section className="border-b border-white/10">
        <div className="container-content py-12 sm:py-14">
          <p className="eyebrow flex items-center gap-2">
            <Heart aria-hidden="true" className="h-3.5 w-3.5" />
            {t(locale, "sections.myUniverse.eyebrow")}
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
            {t(locale, "sections.myUniverse.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
            {t(locale, "sections.myUniverse.description")}
          </p>
        </div>
      </section>
      <MyUniverseClient />
    </div>
  );
}
