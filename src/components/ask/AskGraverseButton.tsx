"use client";

import { Sparkles } from "lucide-react";
import { t, type Locale } from "@/lib/i18n";
import { useAskGraverse } from "./AskGraverseProvider";

/**
 * An explicit entry point into the contextual assistant.
 *
 * A page that knows which record the visitor is on renders this button inside
 * an `AskGraverseScope`. It opens the same assistant with the contextual mode
 * already selected, so the visitor never has to explain what they are looking
 * at. The record itself is registered by the scope; the button only reads it.
 */
export function AskGraverseButton({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const { context, open } = useAskGraverse();

  return (
    <button
      type="button"
      onClick={() => {
        if (context) open(context);
      }}
      className={
        className ??
        // The label uses the theme's primary text colour so it stays readable
        // on both the dark Museum surface and the light Academy surface; the
        // accent carries the brand colour through the border and the icon.
        "inline-flex items-center gap-2 rounded-full border border-accent/45 bg-accent/10 px-3.5 py-2 text-xs font-semibold text-text-primary transition-colors hover:border-accent/80 hover:bg-accent/20"
      }
    >
      <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-accent" />
      {t(locale, "ask.askAbout")}
    </button>
  );
}
