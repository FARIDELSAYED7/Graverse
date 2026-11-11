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
      className="academy-card relative overflow-hidden rounded-3xl p-3 sm:p-5"
    >
      <div className="relative">
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <div>
            <label
              htmlFor={selectId}
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5F6B83]"
            >
              Choose a robot guide · all {profiles.length} artifacts
            </label>
            <select
              id={selectId}
              data-robot-select
              value={robot.id}
              onChange={(event) => setSelectedId(event.target.value)}
              className="mt-1.5 h-11 w-full rounded-full border border-[#14213B]/15 bg-white px-4 text-sm font-medium text-[#14213B] transition-colors hover:border-[#0F766E]/45 focus:border-[#0F766E] focus:outline-none"
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
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#9C4321]/30 bg-[#9C4321]/5 px-4 text-sm font-semibold text-[#9C4321] transition-colors hover:bg-[#9C4321]/10"
          >
            <Shuffle aria-hidden="true" className="h-4 w-4" />
            Surprise me
          </button>
        </div>

        <div className="no-scrollbar mt-3 flex items-center gap-2 overflow-x-auto pb-1">
          <span className="shrink-0 text-[11px] font-medium text-[#5F6B83]">
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
                  ? "border-[#0F766E] bg-[#0F766E]/10 text-[#14213B]"
                  : "border-[#14213B]/12 bg-white text-[#46536B] hover:border-[#14213B]/30 hover:text-[#14213B]"
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
          <aside className="flex min-w-0 flex-col rounded-2xl border border-[#14213B]/10 bg-[#FFF8EC] p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <RobotAvatar
                destinationGroup={robot.destinationGroup}
                hardwareType={robot.hardwareType}
                size="lg"
              />
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
                  Robot guide
                </p>
                <h3 className="mt-1 text-lg font-semibold leading-tight text-[#14213B]">
                  {robot.name}
                </h3>
                <p className="mt-1 text-xs text-[#46536B]">
                  {robot.hardwareTypeLabel} · {robot.destinationLabel}
                </p>
              </div>
            </div>

            <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-xl border border-[#14213B]/10 bg-white">
              <ArtifactVisual
                media={robot.media}
                sizes="(min-width: 1024px) 28vw, 92vw"
              />
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              <StatusBadge kind="mission" status={robot.missionStatus} compact />
              <StatusBadge kind="hardware" status={robot.hardwareStatus} compact />
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
              <div>
                <dt className="text-[#5F6B83]">Mission</dt>
                <dd className="mt-0.5 font-medium text-[#14213B]">
                  {robot.missionName}
                </dd>
              </div>
              <div>
                <dt className="text-[#5F6B83]">Program</dt>
                <dd className="mt-0.5 font-medium text-[#14213B]">
                  {robot.programName}
                </dd>
              </div>
              <div>
                <dt className="text-[#5F6B83]">Launched</dt>
                <dd className="mt-0.5 font-medium text-[#14213B]">
                  {robot.launchLabel}
                </dd>
              </div>
              <div>
                <dt className="text-[#5F6B83]">Milestone year</dt>
                <dd className="mt-0.5 font-mono font-medium tabular-nums text-[#14213B]">
                  {robot.year}
                </dd>
              </div>
            </dl>

            <Link
              href={robot.href}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#9C4321] transition-colors hover:text-[#14213B]"
            >
              Open the full record
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </aside>

          <div className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#14213B]/12 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#14213B]/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0F766E] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0F766E]" />
                </span>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0F766E]">
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
                        ? "border-[#8A5A00]/40 bg-[#8A5A00]/10 text-[#8A5A00]"
                        : "border-[#14213B]/12 bg-white text-[#46536B] hover:border-[#14213B]/30 hover:text-[#14213B]"
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
                    className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[#9C4321]/35 bg-[#9C4321]/8 px-2.5 text-[11px] font-medium text-[#9C4321] transition-colors hover:bg-[#9C4321]/12"
                  >
                    <Square aria-hidden="true" className="h-3 w-3" />
                    Stop
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={resetConversation}
                  aria-label="Start this conversation again"
                  className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[#14213B]/12 bg-white px-2.5 text-[11px] font-medium text-[#46536B] transition-colors hover:border-[#14213B]/30 hover:text-[#14213B]"
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
                        <div className="rounded-2xl rounded-tr-md border border-[#9C4321]/25 bg-[#9C4321]/8 px-3.5 py-2.5 text-sm leading-relaxed text-[#14213B]">
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
                      <div className="rounded-2xl rounded-tl-md border border-[#14213B]/10 bg-[#FFF8EC] px-3.5 py-2.5 text-sm leading-relaxed text-[#46536B]">
                        <p className="whitespace-pre-line">{message.text}</p>
                        {message.intent === "record" ||
                        message.intent === "source" ? (
                          <Link
                            href={robot.href}
                            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#9C4321] hover:text-[#14213B]"
                          >
                            Open {robot.name}&apos;s full record
                            <ArrowRight aria-hidden="true" className="h-3 w-3" />
                          </Link>
                        ) : null}
                      </div>
                      {speechSupported ? (
                        <button
                          type="button"
                          onClick={() => speak(message.text, true)}
                          aria-label="Hear this answer again"
                          className="mt-1 inline-flex items-center gap-1 text-[10px] text-[#5F6B83] transition-colors hover:text-[#14213B]"
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
                  <div className="rounded-2xl rounded-tl-md border border-[#14213B]/10 bg-[#FFF8EC] px-3.5 py-3">
                    <span className="sr-only">
                      {robot.name} is checking its record.
                    </span>
                    <span aria-hidden="true" className="flex items-center gap-1">
                      {[0, 1, 2].map((dot) => (
                        <span
                          key={dot}
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#0F766E]"
                          style={{ animationDelay: `${dot * 120}ms` }}
                        />
                      ))}
                    </span>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="border-t border-[#14213B]/10 px-3 py-3">
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
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#14213B]/12 bg-white px-3 py-1.5 text-xs font-medium text-[#46536B] transition-colors hover:border-[#0F766E]/50 hover:bg-[#0F766E]/5 hover:text-[#14213B] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Sparkles aria-hidden="true" className="h-3 w-3 text-[#9C4321]" />
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
                  className="h-11 min-w-0 flex-1 rounded-full border border-[#14213B]/15 bg-white px-4 text-sm text-[#14213B] placeholder:text-[#5F6B83] transition-colors focus:border-[#0F766E] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  aria-label={`Send your question to ${robot.name}`}
                  className="btn-primary inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-full px-4 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send aria-hidden="true" className="h-4 w-4" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>

              <p
                data-robot-disclaimer
                className="mt-2 flex items-start gap-1.5 text-[11px] leading-relaxed text-[#5F6B83]"
              >
                <Info aria-hidden="true" className="mt-0.5 h-3 w-3 shrink-0" />
                Scripted from the artifact record. Not AI. If the record does not
                cover a question, the robot says so.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
