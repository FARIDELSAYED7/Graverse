"use client";

import { useRef, useState } from "react";
import { Captions, Play, Square } from "lucide-react";
import type { EchoMedia } from "@/types/echo";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { pick } from "@/lib/echo/localized";
import { MediaAttribution } from "./MediaAttribution";

/**
 * The mission video player.
 *
 * Video never autoplays with sound: the visitor presses play, and the
 * controls are the browser's own. A written transcript is always available
 * beside the player, in the page language, because a silent video is not
 * accessible content.
 */
export function StoryVideoPlayer({
  media,
  locale,
}: {
  media: EchoMedia;
  locale: Locale;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const transcript = media.transcript;

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  return (
    <figure className="echo-card overflow-hidden rounded-2xl">
      <div className="relative aspect-video bg-[#120e2c]">
        <video
          ref={videoRef}
          src={media.src}
          poster={media.poster}
          preload="none"
          playsInline
          controls
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          className="h-full w-full"
        >
          {media.captionsUrl ? (
            <track
              kind="captions"
              srcLang={locale}
              label={locale === "ar" ? "العربية" : "English"}
              src={media.captionsUrl}
            />
          ) : null}
        </video>

        {!playing ? (
          <button
            type="button"
            onClick={toggle}
            className="absolute inset-0 flex items-center justify-center bg-[#0d0a24]/25 transition-colors hover:bg-[#0d0a24]/10"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-[#1a1338] shadow-lg">
              <Play aria-hidden="true" className="h-6 w-6 translate-x-0.5" />
            </span>
            <span className="sr-only">{t(locale, "echo.play")}</span>
          </button>
        ) : null}
      </div>

      <figcaption className="space-y-3 p-5">
        <p className="text-sm leading-relaxed text-[#4a4266]">
          {pick(locale, media.caption)}
        </p>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={toggle}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#5b3fe0] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#4a30c4]"
          >
            {playing ? (
              <Square aria-hidden="true" className="h-3.5 w-3.5" />
            ) : (
              <Play aria-hidden="true" className="h-3.5 w-3.5" />
            )}
            {playing ? t(locale, "echo.pause") : t(locale, "echo.play")}
          </button>

          {transcript ? (
            <button
              type="button"
              onClick={() => setShowTranscript((value) => !value)}
              aria-expanded={showTranscript}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#1a1338]/15 bg-white px-4 py-2 text-sm font-semibold text-[#4a4266] transition-colors hover:border-[#6d4aff]/50 hover:text-[#1a1338]"
            >
              <Captions aria-hidden="true" className="h-4 w-4" />
              {t(locale, "echo.transcript")}
            </button>
          ) : null}
        </div>

        {showTranscript && transcript ? (
          <div className="rounded-2xl border border-[#1a1338]/10 bg-[#f6f1e6] p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#5b3fe0]">
              {t(locale, "echo.videoTranscript")}
            </p>
            <ul className="mt-2 space-y-2">
              {pickList(transcript, locale).map((line, index) => (
                <li key={index} className="text-sm leading-relaxed text-[#1a1338]">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <MediaAttribution media={media} locale={locale} />
      </figcaption>
    </figure>
  );
}

function pickList(
  value: { en: string[]; ar: string[] },
  locale: Locale
): string[] {
  return locale === "ar" ? value.ar : value.en;
}
