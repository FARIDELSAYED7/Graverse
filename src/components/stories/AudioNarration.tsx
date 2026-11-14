"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Gauge, Pause, Play, Square, Volume2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

/**
 * Optional read-aloud narration.
 *
 * The narration uses the browser's own speech engine, so there is no paid
 * service and no audio file to download. When the browser has no voice for
 * the chosen language, the component says so and leaves the transcript
 * visible instead of pretending to work.
 *
 * Audio never starts by itself.
 */

interface SpeechControls {
  supported: boolean;
  voiceAvailable: boolean;
  speak: (text: string, settings?: { rate?: number; volume?: number }) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  progress: number;
  speaking: boolean;
  current: SpeechSynthesisUtterance | null;
}

function useSpeech(locale: Locale): SpeechControls {
  const [supported, setSupported] = useState(false);
  const [voiceAvailable, setVoiceAvailable] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const lengthRef = useRef(0);

  useEffect(() => {
    const engine = window.speechSynthesis;
    if (!engine) return;
    setSupported(true);

    const tag = locale === "ar" ? "ar" : "en";
    const check = () => {
      const voices = engine.getVoices();
      const match = voices.some((voice) => voice.lang.toLowerCase().startsWith(tag));
      setVoiceAvailable(match);
    };
    check();
    engine.addEventListener("voiceschanged", check);
    return () => engine.removeEventListener("voiceschanged", check);
  }, [locale]);

  const stop = useCallback(() => {
    const engine = window.speechSynthesis;
    if (engine) engine.cancel();
    utteranceRef.current = null;
    setSpeaking(false);
    setProgress(0);
  }, []);

  const speak = useCallback(
    (text: string, settings?: { rate?: number; volume?: number }) => {
      const engine = window.speechSynthesis;
      if (!engine) return;
      engine.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (settings?.rate) utterance.rate = settings.rate;
      if (settings?.volume !== undefined) utterance.volume = settings.volume;
      const tag = locale === "ar" ? "ar" : "en";
      const voice = engine
        .getVoices()
        .find((entry) => entry.lang.toLowerCase().startsWith(tag));
      if (voice) utterance.voice = voice;
      utterance.lang = locale === "ar" ? "ar-SA" : "en-US";
      lengthRef.current = text.length;
      utterance.onboundary = (event) => {
        if (event.name === "word" || event.name === "sentence") {
          setProgress(
            Math.min(1, (event.charIndex + (event.charLength ?? 0)) / Math.max(lengthRef.current, 1))
          );
        }
      };
      utterance.onend = () => {
        setSpeaking(false);
        setProgress(0);
      };
      utterance.onerror = () => {
        setSpeaking(false);
        setProgress(0);
      };
      utteranceRef.current = utterance;
      setSpeaking(true);
      engine.speak(utterance);
    },
    [locale]
  );

  const pause = useCallback(() => {
    window.speechSynthesis?.pause();
  }, []);

  const resume = useCallback(() => {
    window.speechSynthesis?.resume();
  }, []);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  return {
    supported,
    voiceAvailable,
    speak,
    pause,
    resume,
    stop,
    progress,
    speaking,
    current: utteranceRef.current,
  };
}

export function AudioNarration({
  text,
  locale,
  title,
}: {
  text: string;
  locale: Locale;
  title?: string;
}) {
  const speech = useSpeech(locale);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [showTranscript, setShowTranscript] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const lines = useMemo(
    () => text.split(/\n{2,}|\n/).map((line) => line.trim()).filter(Boolean),
    [text]
  );

  /**
   * The utterance object is the one the browser is speaking, so changing the
   * rate or volume updates the narration in place.
   */
  useEffect(() => {
    const current = speech.current;
    if (current) {
      current.rate = rate;
      current.volume = volume;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rate, volume, speech.current]);

  function start() {
    speech.speak(text, { rate, volume });
  }

  return (
    <section
      aria-label={t(locale, "echo.audio")}
      className="echo-card rounded-3xl p-5 sm:p-6"
    >
      <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-[#5b3fe0]">
        <Volume2 aria-hidden="true" className="h-4 w-4" />
        {title ?? t(locale, "echo.audio")}
      </h3>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {!speech.supported ? (
          <p className="text-sm text-[#6b6484]">{t(locale, "echo.audioUnavailable")}</p>
        ) : (
          <>
            <button
              type="button"
              onClick={() => (speech.speaking ? speech.stop() : start())}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#5b3fe0] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#4a30c4]"
            >
              {speech.speaking ? (
                <Square aria-hidden="true" className="h-3.5 w-3.5" />
              ) : (
                <Play aria-hidden="true" className="h-3.5 w-3.5" />
              )}
              {speech.speaking ? t(locale, "echo.audioStop") : t(locale, "echo.audio")}
            </button>

            {speech.speaking ? (
              <>
                <button
                  type="button"
                  onClick={speech.pause}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#1a1338]/15 text-[#4a4266]"
                >
                  <Pause aria-hidden="true" className="h-4 w-4" />
                  <span className="sr-only">{t(locale, "echo.pause")}</span>
                </button>
                <button
                  type="button"
                  onClick={speech.resume}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#1a1338]/15 text-[#4a4266]"
                >
                  <Play aria-hidden="true" className="h-4 w-4" />
                  <span className="sr-only">{t(locale, "echo.play")}</span>
                </button>
              </>
            ) : null}

            <label className="flex items-center gap-1.5 text-xs font-semibold text-[#4a4266]">
              <Gauge aria-hidden="true" className="h-3.5 w-3.5" />
              {t(locale, "echo.speed")}
              <select
                value={rate}
                onChange={(event) => setRate(Number(event.target.value))}
                className="h-8 rounded-full border border-[#1a1338]/15 bg-white px-2 text-xs"
              >
                <option value={0.75}>0.75×</option>
                <option value={1}>1×</option>
                <option value={1.25}>1.25×</option>
                <option value={1.5}>1.5×</option>
              </select>
            </label>

            <label className="flex items-center gap-1.5 text-xs font-semibold text-[#4a4266]">
              {t(locale, "echo.volume")}
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={volume}
                onChange={(event) => setVolume(Number(event.target.value))}
                className="w-24 accent-[#5b3fe0]"
              />
            </label>
          </>
        )}
      </div>

      {speech.supported ? (
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#1a1338]/10">
          <div
            className="h-full rounded-full bg-[#5b3fe0] transition-[width] duration-200"
            style={{ width: `${Math.round(speech.progress * 100)}%` }}
          />
        </div>
      ) : null}

      {!speech.voiceAvailable && speech.supported ? (
        <p className="mt-2 text-xs text-[#6b6484]">
          {t(locale, "echo.audioUnavailable")}
        </p>
      ) : null}

      <button
        type="button"
        onClick={() => setShowTranscript((value) => !value)}
        aria-expanded={showTranscript}
        className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#1a1338]/15 bg-white px-3 py-1.5 text-xs font-semibold text-[#4a4266]"
      >
        {t(locale, "echo.transcript")}
      </button>

      {showTranscript ? (
        <ol className="mt-3 space-y-2 rounded-2xl bg-[#f6f1e6] p-4">
          {lines.map((line, index) => (
            <li key={index} className="text-sm leading-relaxed text-[#1a1338]">
              {line}
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}
