"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ArrowDown,
  BookOpen,
  Building2,
  Cog,
  ExternalLink,
  FileText,
  FlaskConical,
  Layers,
  Orbit,
  RefreshCw,
  Rocket,
  Satellite,
  ScrollText,
  Send,
  Sparkles,
  TriangleAlert,
  X,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { t, type Locale } from "@/lib/i18n";
import { ASK_CLIENT_LIMITS } from "@/lib/ask/client-limits";
import type { AskAnswerProvider, AskSourceRef } from "@/lib/ask/types";
import { useAskGraverse } from "./AskGraverseProvider";
import { askSuggestionKeys } from "./suggestions";
import { AskCoreStage } from "./AskCore";
import { AskCoreFallback } from "./AskCoreFallback";
import { AskMarkdown } from "./markdown";
import {
  askClientCacheKey,
  readClientAnswer,
  writeClientAnswer,
} from "./ask-cache";

/**
 * Ask GRAVERSE — the assistant console.
 *
 * A floating launcher and an expandable console that sits over the museum.
 * The console is one self-contained surface: an identity header, a scope
 * strip, the conversation, the composer and the provenance footer.
 *
 * The console never holds a secret and never talks to a provider. It posts a
 * question and a short history to `POST /api/ask` and renders what comes back.
 */

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: AskSourceRef[];
  /** Which part of the system produced the answer. */
  provider?: AskAnswerProvider;
}

interface AskErrorState {
  code: string;
  message: string;
}

const KIND_ICONS: Record<string, typeof Satellite> = {
  artifact: Satellite,
  mission: Rocket,
  lesson: BookOpen,
  engineering: Cog,
  simulation: FlaskConical,
  story: ScrollText,
  body: Orbit,
  agency: Building2,
  "deep-sky": Sparkles,
  article: FileText,
};

const KIND_LABEL_KEYS: Record<string, string> = {
  artifact: "ask.kind.artifact",
  mission: "ask.kind.mission",
  lesson: "ask.kind.lesson",
  engineering: "ask.kind.engineering",
  simulation: "ask.kind.simulation",
  story: "ask.kind.story",
  body: "ask.kind.body",
  agency: "ask.kind.agency",
  "deep-sky": "ask.kind.deep-sky",
  article: "ask.kind.article",
};

export function AskGraverse({ locale }: { locale: Locale }) {
  const { context, mode, setMode, isOpen, close, toggle } = useAskGraverse();
  const panelId = useId();
  const composerId = useId();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<AskErrorState | null>(null);
  const [model, setModel] = useState<string | null>(null);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [coreReady, setCoreReady] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const [atBottom, setAtBottom] = useState(true);

  const launcherRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const focusLauncher = useCallback(() => {
    const element = launcherRef.current;
    // On a phone the launcher is hidden while the console is open, so it
    // cannot take the focus back.
    if (element && element.getBoundingClientRect().width > 0) {
      element.focus();
    }
  }, []);


  // The three places the 3D core is projected into.
  const launcherSlot = useRef<HTMLSpanElement | null>(null);
  const headerSlot = useRef<HTMLSpanElement | null>(null);
  const emptySlot = useRef<HTMLDivElement | null>(null);

  /**
   * Whether the empty-state core is still inside the conversation area.
   *
   * The WebGL canvas is a fixed overlay above the page, so a slot that has
   * scrolled out of the log would be painted over the page instead of inside
   * the console. The slot is switched off as soon as it leaves the log.
   */
  const [emptyVisible, setEmptyVisible] = useState(true);

  const slots = useMemo(
    () => ({
      launcher: { ref: launcherSlot, visible: true },
      header: { ref: headerSlot, visible: true },
      empty: { ref: emptySlot, visible: emptyVisible },
    }),
    [emptyVisible]
  );

  const suggestionKeys = useMemo(
    () => askSuggestionKeys(mode === "global" ? null : (context?.kind ?? null)),
    [context?.kind, mode]
  );

  /** The contextual record, when the assistant is in contextual mode. */
  const activeContext = mode === "global" ? null : context;
  const ScopeIcon = activeContext
    ? (KIND_ICONS[activeContext.kind] ?? Layers)
    : Layers;

  /* -------------------------------------------------- service availability */

  useEffect(() => {
    let cancelled = false;
    fetch("/api/ask", { headers: { Accept: "application/json" } })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (cancelled) return;
        if (data && typeof data.configured === "boolean") {
          setConfigured(data.configured);
        }
      })
      .catch(() => {
        // A failed probe never blocks the assistant; the POST reports the
        // real state.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  /* --------------------------------------------------------------- focus */

  useEffect(() => {
    if (isOpen) {
      textareaRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation();
        close();
        focusLauncher();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close, focusLauncher]);

  /* ------------------------------------------------------------ scrolling */

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    const log = logRef.current;
    if (!log) return;
    log.scrollTo({ top: log.scrollHeight, behavior });
    setAtBottom(true);
  }, []);

  /**
   * Reports whether the empty-state core is still fully inside the
   * conversation area. A partly scrolled-out slot would be drawn over the
   * page, so it is switched off as soon as it leaves the log.
   */
  const syncEmptyVisibility = useCallback(() => {
    const slot = emptySlot.current;
    const log = logRef.current;
    if (!slot || !log) {
      setEmptyVisible(false);
      return;
    }
    const slotRect = slot.getBoundingClientRect();
    const logRect = log.getBoundingClientRect();
    const inside =
      slotRect.height > 0 &&
      slotRect.top >= logRect.top - 1 &&
      slotRect.bottom <= logRect.bottom + 1;
    setEmptyVisible(inside);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    syncEmptyVisibility();
    window.addEventListener("resize", syncEmptyVisibility);
    return () => window.removeEventListener("resize", syncEmptyVisibility);
  }, [isOpen, messages.length, pending, syncEmptyVisibility]);

  useEffect(() => {
    const log = logRef.current;
    if (!log) return;
    // Only follow the conversation. On an empty console the visitor should
    // see the whole of the empty state, not the bottom of it.
    if (messages.length === 0 && !pending) {
      log.scrollTop = 0;
      return;
    }
    const distance = log.scrollHeight - log.scrollTop - log.clientHeight;
    setAtBottom(distance < 48);
  }, [messages, pending]);

  /* --------------------------------------------------- context and mode */

  const contextKey = context ? `${context.kind}:${context.id}` : "";
  const lastContextKey = useRef(contextKey);

  useEffect(() => {
    if (lastContextKey.current === contextKey) return;
    // The visitor moved to another record. The old conversation belongs to the
    // old record, so it is cleared rather than carried across.
    lastContextKey.current = contextKey;
    setMessages([]);
    setError(null);
    setModel(null);
  }, [contextKey]);

  const lastMode = useRef(mode);

  useEffect(() => {
    if (lastMode.current === mode) return;
    // The grounding changed, so the old answers no longer apply.
    lastMode.current = mode;
    setMessages([]);
    setError(null);
    setModel(null);
  }, [mode]);

  /* ------------------------------------------------------------ cooldown */

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setTimeout(
      () => setCooldown((value) => value - 1),
      1000
    );
    return () => window.clearTimeout(timer);
  }, [cooldown]);

  /* ------------------------------------------------------- composer growth */

  useEffect(() => {
    const element = textareaRef.current;
    if (!element) return;
    element.style.height = "0px";
    element.style.height = `${Math.min(element.scrollHeight, 132)}px`;
  }, [draft]);

  /* ------------------------------------------------------------- sending */

  const send = useCallback(
    async (question: string, options?: { retry?: boolean }) => {
      const trimmed = question.trim();
      if (!trimmed || pending) return;
      const retry = options?.retry === true;

      // The server appends the question itself, so the history never contains
      // it. On a retry the question is already the last turn.
      const historySource = retry ? messages.slice(0, -1) : messages;
      const history = historySource
        .slice(-ASK_CLIENT_LIMITS.maxHistoryMessages)
        .map((message) => ({ role: message.role, content: message.content }));

      if (!retry) {
        setMessages((current) => [
          ...current,
          {
            id: `u-${Date.now()}-${current.length}`,
            role: "user",
            content: trimmed,
          },
        ]);
        setDraft("");
      }
      setError(null);
      setPending(true);

      // The browser cache answers a repeated question without a round trip.
      const cacheKey = askClientCacheKey({
        question: trimmed,
        locale,
        contextKind: activeContext?.kind ?? "",
        contextId: activeContext?.id ?? "",
      });
      const cached = readClientAnswer(cacheKey);
      if (cached) {
        setMessages((current) => [
          ...current,
          {
            id: `a-${Date.now()}-${current.length}`,
            role: "assistant",
            content: cached.answer,
            sources: cached.sources,
            provider: cached.provider,
          },
        ]);
        setModel(cached.model ?? null);
        setPending(false);
        return;
      }

      try {
        const response = await fetch("/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: trimmed,
            locale,
            context: activeContext
              ? { kind: activeContext.kind, id: activeContext.id }
              : null,
            history,
          }),
        });

        const data = await response.json().catch(() => null);

        if (!response.ok || !data || data.ok !== true) {
          const code = data?.error?.code ?? "provider_error";
          setError({
            code,
            message: messageForCode(locale, code, data?.error?.message),
          });
          return;
        }

        setModel(typeof data.model === "string" ? data.model : null);
        const provider: AskAnswerProvider =
          data.provider === "local" || data.provider === "cache"
            ? data.provider
            : "openrouter";
        const sources: AskSourceRef[] = Array.isArray(data.sources)
          ? data.sources
          : [];
        setMessages((current) => [
          ...current,
          {
            id: `a-${Date.now()}-${current.length}`,
            role: "assistant",
            content: String(data.answer ?? ""),
            sources,
            provider,
          },
        ]);
        writeClientAnswer(cacheKey, {
          answer: String(data.answer ?? ""),
          sources,
          provider,
          model: typeof data.model === "string" ? data.model : undefined,
        });
        setCooldown(Math.ceil(ASK_CLIENT_LIMITS.cooldownMs / 1000));
      } catch {
        setError({
          code: "provider_error",
          message: messageForCode(locale, "provider_error"),
        });
      } finally {
        setPending(false);
      }
    },
    [activeContext, locale, messages, pending]
  );

  const reset = useCallback(() => {
    setMessages([]);
    setError(null);
    setModel(null);
    setDraft("");
    textareaRef.current?.focus();
  }, []);

  const retryLast = useCallback(() => {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser) return;
    void send(lastUser.content, { retry: true });
  }, [messages, send]);

  /** The composer placeholder names the record when one is in focus. */
  const placeholder = activeContext
    ? t(locale, "ask.placeholderAbout").replace("{title}", activeContext.title)
    : t(locale, "ask.placeholder");

  /** A suggested question, with the record's name folded in. */
  const suggestionText = (key: string) => {
    const text = t(locale, key);
    return activeContext
      ? text.replace("{title}", activeContext.title)
      : text;
  };

  const disabled = pending || cooldown > 0 || configured === false;

  return (
    <>
      <AskCoreStage
        slots={slots}
        thinking={pending}
        active={isOpen || engaged}
        onReady={setCoreReady}
      />

      {/* ------------------------------------------------------------ launcher */}
      <button
        ref={launcherRef}
        type="button"
        onClick={toggle}
        onMouseEnter={() => setEngaged(true)}
        onMouseLeave={() => setEngaged(false)}
        onFocus={() => setEngaged(true)}
        onBlur={() => setEngaged(false)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={isOpen ? t(locale, "ask.close") : t(locale, "ask.open")}
        className={cn(
          "group fixed bottom-5 end-5 z-50 inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-[#06101d]/95 py-1.5 ps-1.5 pe-4 text-sm font-semibold text-[#d7f7ef] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.95)] backdrop-blur-xl transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-accent/70 hover:shadow-[0_24px_60px_-20px_rgba(94,234,212,0.35)]",
          isOpen && "hidden sm:inline-flex"
        )}
      >
        <span
          ref={launcherSlot}
          className="relative block h-9 w-9 shrink-0 rounded-full"
        >
          <AskCoreFallback
            className={coreReady ? "opacity-0" : "opacity-100"}
            thinking={pending}
          />
        </span>
        <span className="hidden sm:inline">{t(locale, "ask.title")}</span>
        <span className="sr-only sm:hidden">{t(locale, "ask.title")}</span>
      </button>

      {/* ------------------------------------------------------------- console */}
      <section
        id={panelId}
        role="dialog"
        aria-label={t(locale, "ask.title")}
        aria-modal="false"
        style={isOpen ? undefined : { display: "none" }}
        className="ask-console fixed inset-x-3 bottom-3 top-16 z-[60] flex flex-col overflow-hidden rounded-3xl border border-white/15 bg-[#060d19] shadow-[0_50px_140px_-40px_rgba(0,0,0,0.98)] backdrop-blur-2xl sm:inset-x-auto sm:top-auto sm:end-5 sm:bottom-24 sm:h-[min(40rem,74vh)] sm:w-[27rem]"
      >
        {/* A <div>, not a <header>: the Academy theme restyles every
            <header> element, which would repaint this console in cream. */}
        <div className="flex items-center gap-3 border-b border-white/[0.07] bg-gradient-to-b from-white/[0.06] to-transparent px-4 py-3">
          <span
            ref={headerSlot}
            className="relative block h-11 w-11 shrink-0 rounded-full"
          >
            <AskCoreFallback
              className={coreReady ? "opacity-0" : "opacity-100"}
              thinking={pending}
            />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-[15px] font-semibold leading-tight tracking-tight text-white">
              {t(locale, "ask.title")}
            </h2>
            <p className="mt-0.5 truncate text-[11px] leading-snug text-white/55">
              {t(locale, "ask.tagline")}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={reset}
              aria-label={t(locale, "ask.reset")}
              title={t(locale, "ask.reset")}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-accent/50 hover:text-white"
            >
              <RefreshCw aria-hidden="true" className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                close();
                focusLauncher();
              }}
              aria-label={t(locale, "ask.close")}
              title={t(locale, "ask.close")}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-accent/50 hover:text-white"
            >
              <X aria-hidden="true" className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------- scope strip */}
        <div className="flex items-center gap-2 border-b border-white/[0.07] px-3 py-2">
          <span
            className={
              activeContext
                ? "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent"
                : "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/60"
            }
          >
            <ScopeIcon aria-hidden="true" className="h-3.5 w-3.5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-medium leading-tight text-white/90">
              {activeContext ? activeContext.title : t(locale, "ask.globalBadge")}
            </p>
            <p className="truncate text-[10px] leading-tight text-white/45">
              {activeContext
                ? t(locale, KIND_LABEL_KEYS[activeContext.kind] ?? "ask.kind.artifact")
                : t(locale, "ask.scopeCollectionHint")}
            </p>
          </div>
          {context ? (
            <div
              role="group"
              aria-label={t(locale, "ask.modeLabel")}
              className="inline-flex shrink-0 rounded-full border border-white/15 bg-white/[0.04] p-0.5"
            >
              <ModeButton
                active={mode === "context"}
                onClick={() => setMode("context")}
                label={t(locale, "ask.modeContext")}
              />
              <ModeButton
                active={mode === "global"}
                onClick={() => setMode("global")}
                label={t(locale, "ask.modeGlobal")}
              />
            </div>
          ) : null}
        </div>

        {/* ------------------------------------------------------------- log */}
        <div
          ref={logRef}
          id={`${panelId}-log`}
          role="log"
          aria-live="polite"
          aria-relevant="additions text"
          aria-label={t(locale, "ask.title")}
          onScroll={(event) => {
            const element = event.currentTarget;
            const distance =
              element.scrollHeight - element.scrollTop - element.clientHeight;
            setAtBottom(distance < 48);
            syncEmptyVisibility();
          }}
          // The log scrolls, so it has to be reachable with the keyboard.
          tabIndex={0}
          className="thin-scrollbar relative flex-1 space-y-4 overflow-y-auto px-4 py-4 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center text-center">
              <div ref={emptySlot} className="relative h-24 w-24 shrink-0">
                <AskCoreFallback
                  className={
                    coreReady && emptyVisible ? "opacity-0" : "opacity-100"
                  }
                  thinking={pending}
                />
              </div>
              <p className="mt-3 text-[15px] font-semibold tracking-tight text-white">
                {t(locale, "ask.emptyTitle")}
              </p>
              <p className="mt-1 max-w-[21rem] text-[12.5px] leading-relaxed text-white/60">
                {t(locale, "ask.emptyBody")}
              </p>
              <p className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/70">
                <Sparkles aria-hidden="true" className="h-3 w-3 text-accent" />
                {activeContext
                  ? `${t(locale, "ask.contextBadge")}: ${activeContext.title}`
                  : t(locale, "ask.globalBadge")}
              </p>
            </div>
          ) : null}

          {messages.length === 0 ? (
            <div className="mt-5">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                {t(locale, "ask.followUps")}
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {suggestionKeys.map((key) => (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => void send(suggestionText(key))}
                      disabled={disabled}
                      className="rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-1.5 text-start text-[11.5px] leading-snug text-white/75 transition-colors hover:border-accent/50 hover:text-white disabled:opacity-50"
                    >
                      {suggestionText(key)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {messages.map((message) =>
            message.role === "user" ? (
              <div
                key={message.id}
                className="ask-message ms-auto max-w-[88%] rounded-2xl rounded-ee-md bg-accent/15 px-3.5 py-2.5 text-[13.5px] leading-relaxed text-[#eafff9]"
                dir="auto"
              >
                {message.content}
              </div>
            ) : (
              <div key={message.id} className="ask-message space-y-2.5">
                <div className="rounded-2xl rounded-es-md border border-white/[0.07] bg-white/[0.035] px-3.5 py-3 text-[13.5px] leading-relaxed text-white/90">
                  <AskMarkdown
                    text={message.content}
                    sources={message.sources ?? []}
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {message.provider ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] font-medium tracking-wide text-white/55">
                      <OriginDot provider={message.provider} />
                      {t(
                        locale,
                        message.provider === "local"
                          ? "ask.provider.local"
                          : message.provider === "cache"
                            ? "ask.provider.cache"
                            : "ask.provider.openrouter"
                      )}
                    </span>
                  ) : null}
                  {message.sources && message.sources.length > 0 ? (
                    <SourceBlock locale={locale} sources={message.sources} />
                  ) : null}
                </div>
              </div>
            )
          )}

          {pending ? (
            <div className="ask-message flex items-center gap-2.5 rounded-2xl rounded-es-md border border-white/[0.07] bg-white/[0.03] px-3.5 py-3">
              <span aria-hidden="true" className="flex items-center gap-1">
                <span className="ask-mote h-1.5 w-1.5 rounded-full bg-accent" />
                <span
                  className="ask-mote h-1.5 w-1.5 rounded-full bg-accent"
                  style={{ animationDelay: "0.15s" }}
                />
                <span
                  className="ask-mote h-1.5 w-1.5 rounded-full bg-accent"
                  style={{ animationDelay: "0.3s" }}
                />
              </span>
              <span className="text-[12.5px] text-white/65">
                {t(locale, "ask.loading")}
              </span>
            </div>
          ) : null}

          {error ? (
            <ErrorCard
              locale={locale}
              error={error}
              canRetry={messages.some((message) => message.role === "user")}
              onRetry={retryLast}
            />
          ) : null}

          {model && !pending ? (
            <p className="px-1 text-[10.5px] leading-relaxed text-white/40">
              {t(locale, "ask.modelNote").replace("{model}", model)}
            </p>
          ) : null}
        </div>

        {!atBottom && messages.length > 0 ? (
          <button
            type="button"
            onClick={() => scrollToBottom()}
            aria-label={t(locale, "ask.scrollLatest")}
            className="absolute bottom-[13.5rem] start-1/2 z-10 inline-flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0b1526]/95 text-white/70 shadow-lg transition-colors hover:border-accent/50 hover:text-white"
          >
            <ArrowDown aria-hidden="true" className="h-3.5 w-3.5" />
          </button>
        ) : null}

        {/* -------------------------------------------------------- composer */}
        <div className="border-t border-white/[0.07] bg-white/[0.02] px-3 py-3">
          {configured === false ? (
            <p className="mb-2.5 flex items-start gap-2 rounded-xl border border-warning/25 bg-warning/[0.08] px-3 py-2 text-[11.5px] leading-relaxed text-[#ffd79a]">
              <TriangleAlert
                aria-hidden="true"
                className="mt-0.5 h-3.5 w-3.5 shrink-0"
              />
              {t(locale, "ask.notConfigured")}
            </p>
          ) : null}

          <form
            onSubmit={(event) => {
              event.preventDefault();
              void send(draft);
            }}
            className="flex items-end gap-2"
          >
            <label htmlFor={composerId} className="sr-only">
              {placeholder}
            </label>
            <textarea
              id={composerId}
              ref={textareaRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void send(draft);
                }
              }}
              rows={1}
              maxLength={ASK_CLIENT_LIMITS.maxQuestionLength}
              dir="auto"
              disabled={configured === false}
              placeholder={placeholder}
              className="max-h-32 min-h-[2.75rem] flex-1 resize-none rounded-2xl border border-white/15 bg-white/[0.05] px-3.5 py-2.5 text-[13.5px] leading-relaxed text-white placeholder:text-white/40 focus:border-accent/50 focus:bg-white/[0.07] focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={disabled || draft.trim().length === 0}
              aria-label={t(locale, "ask.send")}
              title={t(locale, "ask.send")}
              className="btn-primary inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-transform disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:scale-[1.04]"
            >
              {pending ? (
                <RefreshCw
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin"
                />
              ) : (
                <Send aria-hidden="true" className="h-4 w-4" />
              )}
            </button>
          </form>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[10.5px] leading-relaxed text-white/45">
            <span>
              {t(locale, "ask.characterCount")
                .replace("{count}", String(draft.length))
                .replace(
                  "{max}",
                  String(ASK_CLIENT_LIMITS.maxQuestionLength)
                )}
            </span>
            {cooldown > 0 ? (
              <span className="text-[#ffd79a]">
                {t(locale, "ask.cooldown").replace(
                  "{seconds}",
                  String(cooldown)
                )}
              </span>
            ) : null}
          </div>

          <p className="mt-1.5 text-[10.5px] leading-relaxed text-white/40">
            {t(locale, "ask.disclaimer")} {t(locale, "ask.privacy")}
          </p>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ pieces */

function ModeButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        active
          ? "rounded-full bg-accent/25 px-2.5 py-1 text-[11px] font-semibold text-[#d7f7ef]"
          : "rounded-full px-2.5 py-1 text-[11px] text-white/55 transition-colors hover:text-white"
      }
    >
      {label}
    </button>
  );
}

function ErrorCard({
  locale,
  error,
  canRetry,
  onRetry,
}: {
  locale: Locale;
  error: AskErrorState;
  canRetry: boolean;
  onRetry: () => void;
}) {
  const quota = error.code === "quota_exceeded" || error.code === "provider_insufficient_credits";
  const unavailable =
    error.code === "not_configured" ||
    error.code === "model_misconfigured" ||
    error.code === "provider_unauthorized";

  return (
    <div
      role="alert"
      className={
        quota || unavailable
          ? "ask-message rounded-2xl border border-warning/25 bg-warning/[0.08] px-3.5 py-3"
          : "ask-message rounded-2xl border border-danger/30 bg-danger/[0.08] px-3.5 py-3"
      }
    >
      <p className="flex items-start gap-2 text-[12.5px] leading-relaxed text-[#ffd79a]">
        <TriangleAlert aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        <span>{error.message}</span>
      </p>
      {canRetry && !quota && !unavailable ? (
        <div className="mt-2 flex items-center gap-2 ps-5">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-white/80 transition-colors hover:border-accent/60 hover:text-white"
          >
            <RefreshCw aria-hidden="true" className="h-3 w-3" />
            {t(locale, "ask.retry")}
          </button>
          <span className="text-[10.5px] text-white/45">
            {t(locale, "ask.retryHint")}
          </span>
        </div>
      ) : null}
    </div>
  );
}

function OriginDot({ provider }: { provider: AskAnswerProvider }) {
  return (
    <span
      aria-hidden="true"
      className={
        provider === "local"
          ? "h-1.5 w-1.5 rounded-full bg-accent"
          : provider === "cache"
            ? "h-1.5 w-1.5 rounded-full bg-brand-violet"
            : "h-1.5 w-1.5 rounded-full bg-brand-cyan"
      }
    />
  );
}

function SourceBlock({
  locale,
  sources,
}: {
  locale: Locale;
  sources: AskSourceRef[];
}) {
  return (
    <details className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] px-3 py-2">
      <summary className="flex cursor-pointer items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
        <span className="text-accent">{t(locale, "ask.sources")}</span>
        <span className="rounded-full bg-white/[0.06] px-1.5 py-px text-[10px] tracking-normal text-white/70">
          {sources.length}
        </span>
        <span className="ms-auto text-[10px] font-normal normal-case tracking-normal text-white/35 group-open:hidden">
          {t(locale, "ask.sourcesExpand")}
        </span>
      </summary>
      <p className="mt-1.5 text-[10.5px] text-white/45">
        {t(locale, "ask.sourcesNote")}
      </p>
      <ul className="mt-2 space-y-1.5">
        {sources.map((source) => (
          <li key={source.id} className="text-[11.5px] leading-relaxed">
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start gap-1 text-[#7df3dd] hover:text-white"
            >
              <span className="break-all">
                {source.organization} — {source.title}
              </span>
              <ExternalLink aria-hidden="true" className="mt-0.5 h-3 w-3 shrink-0" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <span className="ms-1 font-mono text-[10px] text-white/40">
              {source.id}
            </span>
          </li>
        ))}
      </ul>
    </details>
  );
}

/* ----------------------------------------------------------------- errors */

const ERROR_KEYS: Record<string, string> = {
  invalid_request: "ask.error",
  not_configured: "ask.notConfigured",
  model_misconfigured: "ask.notConfigured",
  quota_exceeded: "ask.quota",
  provider_unauthorized: "ask.notConfigured",
  provider_insufficient_credits: "ask.quota",
  provider_error: "ask.error",
  provider_timeout: "ask.timeout",
  provider_malformed: "ask.error",
};

function messageForCode(
  locale: Locale,
  code: string,
  fallback?: string
): string {
  const key = ERROR_KEYS[code];
  if (key) return t(locale, key);
  if (fallback) return fallback;
  return t(locale, "ask.error");
}
