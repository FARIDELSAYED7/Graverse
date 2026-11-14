"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { pick } from "@/lib/echo/localized";
import type { Localized } from "@/types/echo";
import { useEcho } from "@/lib/echo/provider";
import { EchoCanvas } from "./echo/EchoCanvas";
import { EchoSpeechBubble } from "./EchoSpeechBubble";

/**
 * Meet ECHO — the storytelling companion.
 *
 * One compact panel: the robot in 3D, one line about what it does, and a
 * "say hello" action so the visitor hears its voice before entering a story.
 * Everything it says comes from the verified record, which the disclaimer
 * states in a single line.
 */
export function MeetEcho({
  locale,
  intro,
}: {
  locale: Locale;
  intro: { en: string; ar: string };
}) {
  const { say, state, message } = useEcho();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section
      id="echo-companion"
      className="container-content scroll-mt-24"
      aria-labelledby="echo-companion-heading"
    >
      <div className="echo-ink-panel grid overflow-hidden rounded-3xl lg:grid-cols-[1fr_360px]">
        <div className="p-6 sm:p-10">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#c9bfff]">
            <MessageCircle aria-hidden="true" className="h-3.5 w-3.5" />
            ECHO · {t(locale, "echo.subtitle")}
          </p>
          <h2
            id="echo-companion-heading"
            className="mt-2 text-balance text-2xl font-semibold sm:text-3xl"
          >
            {t(locale, "echo.meetEcho")}
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/80">
            {t(locale, "echo.companionBody")}
          </p>

          <div className="mt-6 max-w-xl">
            <EchoSpeechBubble
              message={message}
              locale={locale}
              fallback={pick(locale, intro)}
            />
          </div>

          <button
            type="button"
            onClick={() => say(intro, "intro", "greeting", 9000)}
            className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#1a1338] transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle aria-hidden="true" className="h-4 w-4" />
            {t(locale, "echo.sayHello")}
          </button>
        </div>

        <div className="relative min-h-[280px] border-t border-white/10 lg:border-s lg:border-t-0">
          <div
            aria-hidden="true"
            className="absolute inset-8 rounded-full bg-[#6d4aff]/25 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="absolute inset-12 rounded-full border border-white/12"
          />
          {mounted ? (
            <EchoCanvas state={state} className="absolute inset-0" />
          ) : (
            <div className="absolute inset-0 rounded-full bg-white/5" />
          )}
          <p className="absolute inset-x-0 bottom-3 text-center text-xs text-white/60">
            {t(locale, "echo.meetEcho")} · ECHO
          </p>
        </div>
      </div>
    </section>
  );
}
