"use client";

import { useCallback, useEffect, useState } from "react";
import { Lightbulb, MessageCircle, Pointer, X } from "lucide-react";
import type { Localized } from "@/types/echo";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { pick } from "@/lib/echo/localized";
import { useEcho } from "@/lib/echo/provider";
import { EchoCanvas } from "./echo/EchoCanvas";
import { EchoSpeechBubble } from "./EchoSpeechBubble";

/**
 * ECHO, the story companion.
 *
 * A small dockable panel that follows the visitor through a story. It shows
 * the robot in 3D, says the chapter introductions, and offers three actions:
 * a hint, a "show me" pointing gesture and a repeat of the introduction.
 * When every chapter has been read, ECHO says its sign-off.
 *
 * The panel is a landmark with a labelled region and every control is a
 * real button, so it works with a keyboard and a screen reader. The dock
 * sits above the Ask GRAVERSE launcher in the corner — the two never
 * overlap, and neither covers story content.
 */
export function EchoCompanion({
  locale,
  intro,
  fallback,
  signoff,
  chapterIds,
}: {
  locale: Locale;
  intro: Localized;
  fallback: string;
  signoff?: Localized;
  chapterIds?: string[];
}) {
  const { state, message, say, setAnimation, completedChapters } = useEcho();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const greet = useCallback(() => {
    say(intro, "intro", "greeting", 9000);
    setOpen(true);
  }, [intro, say]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      say(intro, "intro", "greeting", 9000);
    }, 700);
    return () => window.clearTimeout(timer);
    // Greet once when the companion mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The sign-off speaks once, when every chapter has been read.
  const [signedOff, setSignedOff] = useState(false);
  useEffect(() => {
    if (!signoff || !chapterIds || chapterIds.length === 0 || signedOff) return;
    const done = chapterIds.every((id) => completedChapters.includes(id));
    if (done) {
      setSignedOff(true);
      say(signoff, "signoff", "celebrating", 12000);
    }
  }, [signoff, chapterIds, completedChapters, say, signedOff]);

  if (!mounted) return null;

  return (
    <div className="echo-dock">
      <div className="pointer-events-auto w-full max-w-[min(24rem,calc(100vw-2rem))]">
        {open ? (
          <div className="echo-card overflow-hidden rounded-2xl shadow-[0_28px_70px_-40px_rgba(26,19,56,0.75)]">
            <div className="echo-ink-panel relative h-36 sm:h-44">
              <EchoCanvas state={state} className="absolute inset-0" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t(locale, "common.back")}
                className="absolute end-2.5 top-2.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4">
              <EchoSpeechBubble message={message} locale={locale} fallback={fallback} />
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() =>
                    say(
                      {
                        en: "Look at the highlighted part of the story — that is where the answer lives.",
                        ar: "انظر إلى الجزء المميّز في القصة — هناك يكمن الجواب.",
                      },
                      "hint",
                      "pointing",
                      8000
                    )
                  }
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#1a1338]/15 bg-white px-3 py-1.5 text-xs font-semibold text-[#4a4266] transition-colors hover:border-[#6d4aff]/50 hover:text-[#1a1338]"
                >
                  <Pointer aria-hidden="true" className="h-3.5 w-3.5" />
                  {t(locale, "echo.hint")}
                </button>
                <button
                  type="button"
                  onClick={() => setAnimation("pointing")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#1a1338]/15 bg-white px-3 py-1.5 text-xs font-semibold text-[#4a4266] transition-colors hover:border-[#6d4aff]/50 hover:text-[#1a1338]"
                >
                  <Lightbulb aria-hidden="true" className="h-3.5 w-3.5" />
                  {t(locale, "echo.point")}
                </button>
                <button
                  type="button"
                  onClick={greet}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#1a1338]/15 bg-white px-3 py-1.5 text-xs font-semibold text-[#4a4266] transition-colors hover:border-[#6d4aff]/50 hover:text-[#1a1338]"
                >
                  <MessageCircle aria-hidden="true" className="h-3.5 w-3.5" />
                  {t(locale, "echo.replayIntro")}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            className="echo-dock__toggle echo-card flex h-12 w-12 items-center justify-center overflow-hidden rounded-full shadow-[0_16px_36px_-22px_rgba(26,19,56,0.8)] transition-transform hover:scale-105"
          >
            <span className="sr-only">{t(locale, "echo.meetEcho")}</span>
            <span aria-hidden="true" className="h-full w-full">
              <EchoCanvas state={state} className="h-full w-full" />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
