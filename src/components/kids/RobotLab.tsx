"use client";

import Link from "next/link";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  ArrowRight,
  Info,
  RotateCcw,
  Send,
  Shuffle,
  Sparkles,
  Square,
  Volume2,
  VolumeX,
} from "lucide-react";
import { ArtifactVisual } from "@/components/artifacts/ArtifactVisual";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { RobotAvatar } from "./RobotAvatar";
import { matchRobotIntent } from "@/lib/robot-chat";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/cn";
import type { DestinationGroup } from "@/types/artifact";
import type { RobotIntent, RobotProfile } from "@/types/robot";

type RobotLabProps = {
  profiles: RobotProfile[];
  initialRobotId?: string;
};

type ChatMessage = {
  id: number;
  role: "robot" | "kid";
  text: string;
  intent?: RobotIntent;
};

const destinationOrder: DestinationGroup[] = ["moon", "mars", "deep-space"];

export function RobotLab({
  profiles,
  initialRobotId = "perseverance",
}: RobotLabProps) {
  const initial =
    profiles.find((profile) => profile.id === initialRobotId) ?? profiles[0]!;

  const [selectedId, setSelectedId] = useState(initial.id);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, role: "robot", text: initial.intro },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  const reduced = useReducedMotion();
  const messageId = useRef(1);
  const lastRobotId = useRef(initial.id);
  const timerRef = useRef<number | null>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const selectId = useId();
  const inputId = useId();

  const robot =
    profiles.find((profile) => profile.id === selectedId) ?? initial;

  const groups = useMemo(
    () =>
      destinationOrder
        .map((group) => ({
          id: group,
          label:
            profiles.find((profile) => profile.destinationGroup === group)
              ?.destinationLabel ?? group,
          profiles: profiles.filter(
            (profile) => profile.destinationGroup === group
          ),
        }))
        .filter((group) => group.profiles.length > 0),
    [profiles]
  );

  const featured = useMemo(
    () => profiles.filter((profile) => profile.featured),
    [profiles]
  );

  useEffect(() => {
    setSpeechSupported(
      typeof window !== "undefined" && "speechSynthesis" in window
    );
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    if (lastRobotId.current === robot.id) return;
    lastRobotId.current = robot.id;
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeaking(false);
    setTyping(false);
    setInput("");
    const introId = ++messageId.current;
    setMessages([{ id: introId, role: "robot", text: robot.intro }]);
  }, [robot.id, robot.intro]);

  useEffect(() => {
    const log = logRef.current;
    if (!log) return;
    log.scrollTo({
      top: log.scrollHeight,
      behavior: reduced ? "auto" : "smooth",
    });
  }, [messages, typing, reduced]);

  function stopSpeech() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
  }

  function speak(text: string, force = false) {
    if (!force && !voiceOn) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    const voices = window.speechSynthesis.getVoices();
    const preferred =
      voices.find(
        (voice) =>
          voice.lang.startsWith("en") &&
          /Samantha|Google US English|Aria|Zira|Daniel|Karen/i.test(voice.name)
      ) ?? voices.find((voice) => voice.lang.startsWith("en"));
    if (preferred) utterance.voice = preferred;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }

  function toggleVoice() {
    if (voiceOn) {
      stopSpeech();
      setVoiceOn(false);
      return;
    }
    setVoiceOn(true);
    speak("Robot voice on.", true);
  }

  function ask(raw: string, forcedIntent?: RobotIntent) {
    const question = raw.trim();
    if (!question || typing) return;

    const questionId = ++messageId.current;
    setMessages((current) => [
      ...current,
      { id: questionId, role: "kid", text: question },
    ]);
    setInput("");
    setTyping(true);

    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(
      () => {
        const intent = forcedIntent ?? matchRobotIntent(question);
        const answer = intent ? robot.answers[intent] : null;
        const reply = answer ?? robot.fallback;
        const replyId = ++messageId.current;
        setMessages((current) => [
          ...current,
          {
            id: replyId,
            role: "robot",
            text: reply,
            intent: intent ?? undefined,
          },
        ]);
        setTyping(false);
        if (voiceOn) speak(reply, true);
        timerRef.current = null;
      },
      reduced ? 0 : 520
    );
  }

  function resetConversation() {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setTyping(false);
    setInput("");
    const introId = ++messageId.current;
    setMessages([{ id: introId, role: "robot", text: robot.intro }]);
    stopSpeech();
  }

  function pickRandom() {
    if (profiles.length < 2) return;
    const others = profiles.filter((profile) => profile.id !== robot.id);
    const next = others[Math.floor(Math.random() * others.length)];
    if (next) setSelectedId(next.id);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(input);
  }

  return (
    <div
      data-robot-lab
      data-robot-id={robot.id}
      className="relative overflow-hidden rounded-[1.6rem] border border-brand-cyan/20 bg-[linear-gradient(135deg,rgba(94,234,212,0.06),rgba(12,26,48,0.9)_38%,rgba(167,139,250,0.1)_72%,rgba(244,114,208,0.07))] p-3 shadow-[0_40px_120px_-50px_rgba(0,0,0,0.95)] backdrop-blur sm:p-5"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(94,234,212,0.16),transparent_68%)]"
      />

      <div className="relative">
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <div>
            <label
              htmlFor={selectId}
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted"
            >
              Choose a robot guide · all {profiles.length} artifacts
            </label>
            <select
              id={selectId}
              data-robot-select
              value={robot.id}
              onChange={(event) => setSelectedId(event.target.value)}
              className="mt-1.5 h-11 w-full rounded-full border border-white/15 bg-bg-elevated px-4 text-sm font-medium text-text-primary transition-colors hover:border-brand-cyan/40 focus:border-brand-cyan/60 focus:outline-none"
            >
              {groups.map((group) => (
                <optgroup key={group.id} label={group.label}>
                  {group.profiles.map((profile) => (
                    <option key={profile.id} value={profile.id}>
                      {profile.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={pickRandom}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-brand-violet/35 bg-brand-violet/10 px-4 text-sm font-semibold text-brand-violet transition-colors hover:border-brand-violet/60 hover:bg-brand-violet/15 hover:text-white"
          >
            <Shuffle aria-hidden="true" className="h-4 w-4" />
            Surprise me
          </button>
        </div>

        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="shrink-0 text-[11px] font-medium text-text-muted">
            Quick picks
          </span>
          {featured.map((profile) => (
            <button
              key={profile.id}
              type="button"
              aria-pressed={profile.id === robot.id}
              onClick={() => setSelectedId(profile.id)}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors",
                profile.id === robot.id
                  ? "border-brand-cyan/50 bg-brand-cyan/15 text-white"
                  : "border-white/12 bg-white/[0.03] text-text-secondary hover:border-white/30 hover:text-white"
              )}
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: profile.accent }}
              />
              {profile.name}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
          <aside className="flex min-w-0 flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <RobotAvatar
                destinationGroup={robot.destinationGroup}
                hardwareType={robot.hardwareType}
                size="lg"
              />
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-teal">
                  Robot guide
                </p>
                <h3 className="mt-1 text-lg font-semibold leading-tight text-white">
                  {robot.name}
                </h3>
                <p className="mt-1 text-xs text-text-secondary">
                  {robot.hardwareTypeLabel} · {robot.destinationLabel}
                </p>
              </div>
            </div>

            <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-xl border border-white/10 bg-bg-elevated">
              <ArtifactVisual
                media={robot.media}
                sizes="(min-width: 1024px) 28vw, 92vw"
              />
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              <StatusBadge
                kind="mission"
                status={robot.missionStatus}
                compact
              />
              <StatusBadge
                kind="hardware"
                status={robot.hardwareStatus}
                compact
              />
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
              <div>
                <dt className="text-text-muted">Mission</dt>
                <dd className="mt-0.5 font-medium text-text-secondary">
                  {robot.missionName}
                </dd>
              </div>
              <div>
                <dt className="text-text-muted">Program</dt>
                <dd className="mt-0.5 font-medium text-text-secondary">
                  {robot.programName}
                </dd>
              </div>
              <div>
                <dt className="text-text-muted">Launched</dt>
                <dd className="mt-0.5 font-medium text-text-secondary">
                  {robot.launchLabel}
                </dd>
              </div>
              <div>
                <dt className="text-text-muted">Milestone year</dt>
                <dd className="mt-0.5 font-mono font-medium tabular-nums text-text-secondary">
                  {robot.year}
                </dd>
              </div>
            </dl>

            <Link
              href={robot.href}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-bright transition-colors hover:text-white"
            >
              Open the full record
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </aside>

          <div className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-brand-cyan/25 bg-[#040c19]/85">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-teal opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-teal" />
                </span>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-teal">
                  Online · record linked
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                {speechSupported ? (
                  <button
                    type="button"
                    data-robot-voice
                    aria-pressed={voiceOn}
                    onClick={toggleVoice}
                    className={cn(
                      "inline-flex h-8 items-center gap-1.5 rounded-full border px-2.5 text-[11px] font-medium transition-colors",
                      voiceOn
                        ? "border-brand-amber/45 bg-brand-amber/10 text-brand-amber"
                        : "border-white/12 bg-white/[0.03] text-text-secondary hover:border-white/30 hover:text-white"
                    )}
                  >
                    {voiceOn ? (
                      <Volume2 aria-hidden="true" className="h-3.5 w-3.5" />
                    ) : (
                      <VolumeX aria-hidden="true" className="h-3.5 w-3.5" />
                    )}
                    Voice {voiceOn ? "on" : "off"}
                  </button>
                ) : null}
                {speaking ? (
                  <button
                    type="button"
                    onClick={stopSpeech}
                    className="inline-flex h-8 items-center gap-1.5 rounded-full border border-danger/35 bg-danger/10 px-2.5 text-[11px] font-medium text-[#FFB3B8] transition-colors hover:bg-danger/15"
                  >
                    <Square aria-hidden="true" className="h-3 w-3" />
                    Stop
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={resetConversation}
                  aria-label="Start this conversation again"
                  className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.03] px-2.5 text-[11px] font-medium text-text-secondary transition-colors hover:border-white/30 hover:text-white"
                >
                  <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
                  Reset
                </button>
              </div>
            </div>

            <div
              ref={logRef}
              data-robot-log
              role="log"
              aria-live="polite"
              aria-label={`Conversation with ${robot.name}`}
              className="thin-scrollbar flex h-[360px] flex-col gap-3 overflow-y-auto px-4 py-4 sm:h-[400px]"
            >
              {messages.map((message) => {
                if (message.role === "kid") {
                  return (
                    <div
                      key={message.id}
                      data-robot-message
                      data-role="kid"
                      className="flex justify-end"
                    >
                      <div className="max-w-[85%]">
                        <span className="sr-only">You said: </span>
                        <div className="rounded-2xl rounded-tr-md border border-brand-cyan/30 bg-brand-cyan/10 px-3.5 py-2.5 text-sm leading-relaxed text-white">
                          {message.text}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={message.id}
                    data-robot-message
                    data-role="robot"
                    className="flex items-start gap-2"
                  >
                    <RobotAvatar
                      destinationGroup={robot.destinationGroup}
                      hardwareType={robot.hardwareType}
                      size="xs"
                      className="mt-1"
                    />
                    <div className="max-w-[85%]">
                      <span className="sr-only">{robot.name} said: </span>
                      <div className="rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.05] px-3.5 py-2.5 text-sm leading-relaxed text-text-secondary">
                        <p className="whitespace-pre-line">{message.text}</p>
                        {message.intent === "record" ||
                        message.intent === "source" ? (
                          <Link
                            href={robot.href}
                            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-accent-bright hover:text-white"
                          >
                            Open {robot.name}&apos;s full record
                            <ArrowRight
                              aria-hidden="true"
                              className="h-3 w-3"
                            />
                          </Link>
                        ) : null}
                      </div>
                      {speechSupported ? (
                        <button
                          type="button"
                          onClick={() => speak(message.text, true)}
                          aria-label="Hear this answer again"
                          className="mt-1 inline-flex items-center gap-1 text-[10px] text-text-muted transition-colors hover:text-white"
                        >
                          <Volume2 aria-hidden="true" className="h-3 w-3" />
                          Hear it
                        </button>
                      ) : null}
                    </div>
                  </div>
                );
              })}

              {typing ? (
                <div className="flex items-start gap-2" data-robot-typing>
                  <RobotAvatar
                    destinationGroup={robot.destinationGroup}
                    hardwareType={robot.hardwareType}
                    size="xs"
                    className="mt-1"
                  />
                  <div className="rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.04] px-3.5 py-3">
                    <span className="sr-only">
                      {robot.name} is checking its record.
                    </span>
                    <span
                      aria-hidden="true"
                      className="flex items-center gap-1"
                    >
                      {[0, 1, 2].map((dot) => (
                        <span
                          key={dot}
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-cyan"
                          style={{ animationDelay: `${dot * 120}ms` }}
                        />
                      ))}
                    </span>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="border-t border-white/10 px-3 py-3">
              <div
                role="group"
                aria-label="Suggested questions"
                className="flex flex-wrap gap-2"
              >
                {robot.chips.map((chip) => (
                  <button
                    key={chip.intent}
                    type="button"
                    data-robot-chip={chip.intent}
                    disabled={typing}
                    onClick={() => ask(chip.label, chip.intent)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-brand-cyan/50 hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Sparkles
                      aria-hidden="true"
                      className="h-3 w-3 text-brand-amber"
                    />
                    {chip.label}
                  </button>
                ))}
              </div>

              <form onSubmit={onSubmit} className="mt-3 flex items-center gap-2">
                <label htmlFor={inputId} className="sr-only">
                  Ask {robot.name} a question
                </label>
                <input
                  id={inputId}
                  data-robot-input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  maxLength={180}
                  autoComplete="off"
                  placeholder={`Ask ${robot.name} a question…`}
                  className="h-11 min-w-0 flex-1 rounded-full border border-white/12 bg-white/[0.04] px-4 text-sm text-white placeholder:text-text-muted transition-colors focus:border-brand-cyan/60 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  aria-label={`Send your question to ${robot.name}`}
                  className="btn-gradient inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-full px-4 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send aria-hidden="true" className="h-4 w-4" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>

              <p
                data-robot-disclaimer
                className="mt-2 flex items-start gap-1.5 text-[11px] leading-relaxed text-text-muted"
              >
                <Info
                  aria-hidden="true"
                  className="mt-0.5 h-3 w-3 shrink-0"
                />
                Scripted from the artifact record. Not AI. If the record does
                not cover a question, the robot says so.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
