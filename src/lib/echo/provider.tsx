"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Localized } from "@/types/echo";

/**
 * ECHOES companion state.
 *
 * One provider drives the whole experience: the robot's animation state, the
 * line it is saying, the chapter the visitor is reading, and the learning
 * progress (chapters visited, quizzes answered, badges earned).
 *
 * Progress is stored in this browser only — no account, no server.
 */

export type EchoAnimationState =
  | "idle"
  | "greeting"
  | "talking"
  | "pointing"
  | "thinking"
  | "celebrating"
  | "listening";

export type EchoMessageSource =
  | "intro"
  | "chapter"
  | "hint"
  | "correct"
  | "incorrect"
  | "signoff"
  | "manual";

export interface EchoMessage {
  id: number;
  text: Localized;
  source: EchoMessageSource;
}

export interface EchoQuizResult {
  questionId: string;
  correct: boolean;
  answeredAt: string;
}

export interface EchoProgress {
  version: 1;
  /** Story slug -> chapter ids the visitor has opened. */
  chapters: Record<string, string[]>;
  /** Story slug -> chapter ids the visitor has finished. */
  completed: Record<string, string[]>;
  /** Story slug -> chapter id currently being read. */
  active: Record<string, string>;
  /** Story slug -> badge key earned. */
  badges: Record<string, string>;
  /** questionId -> result. */
  quiz: Record<string, EchoQuizResult>;
  updatedAt: string;
}

export const ECHO_PROGRESS_KEY = "graverse:echoes:v1";

export function emptyEchoProgress(): EchoProgress {
  return {
    version: 1,
    chapters: {},
    completed: {},
    active: {},
    badges: {},
    quiz: {},
    updatedAt: new Date().toISOString(),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Reads stored progress, dropping anything that does not match the shape. */
export function validateEchoProgress(value: unknown): EchoProgress | null {
  if (!isRecord(value)) return null;
  if (value.version !== 1) return null;

  const progress = emptyEchoProgress();
  for (const key of ["chapters", "completed", "active", "badges"] as const) {
    const source = value[key];
    if (!isRecord(source)) continue;
    for (const [story, entry] of Object.entries(source)) {
      if (typeof entry === "string") {
        (progress[key] as Record<string, string>)[story] = entry;
      } else if (Array.isArray(entry)) {
        (progress[key] as Record<string, string[]>)[story] = entry.filter(
          (item): item is string => typeof item === "string"
        );
      }
    }
  }
  if (isRecord(value.quiz)) {
    for (const [questionId, entry] of Object.entries(value.quiz)) {
      if (!isRecord(entry)) continue;
      if (typeof entry.correct !== "boolean") continue;
      if (typeof entry.answeredAt !== "string") continue;
      progress.quiz[questionId] = {
        questionId,
        correct: entry.correct,
        answeredAt: entry.answeredAt,
      };
    }
  }
  return progress;
}

interface EchoContextValue {
  state: EchoAnimationState;
  message: EchoMessage | null;
  /** Speak a line and set the robot's animation. */
  say: (
    text: Localized,
    source: EchoMessageSource,
    state?: EchoAnimationState,
    holdMs?: number
  ) => void;
  setAnimation: (state: EchoAnimationState) => void;
  reset: () => void;

  storySlug: string | null;
  setStorySlug: (slug: string | null) => void;
  activeChapter: string | null;
  setActiveChapter: (chapterId: string) => void;
  visitedChapters: string[];
  completedChapters: string[];
  completeChapter: (chapterId: string) => void;
  badge: string | null;
  awardBadge: (badgeKey: string) => void;
  quizResults: Record<string, EchoQuizResult>;
  recordQuiz: (questionId: string, correct: boolean) => void;
  progress: EchoProgress;
}

const EchoContext = createContext<EchoContextValue | null>(null);

const MESSAGE_TTL = 14000;

export function EchoProvider({
  children,
  initialStorySlug = null,
}: {
  children: React.ReactNode;
  initialStorySlug?: string | null;
}) {
  const [state, setState] = useState<EchoAnimationState>("idle");
  const [message, setMessage] = useState<EchoMessage | null>(null);
  const [progress, setProgress] = useState<EchoProgress>(emptyEchoProgress);
  const [storySlug, setStorySlugState] = useState<string | null>(initialStorySlug);
  const [active, setActive] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);
  const counterRef = useRef(0);
  // Progress is only persisted once the stored progress has had its chance
  // to load — otherwise the first render would overwrite the visitor's
  // saved chapters with an empty record before it was ever read.
  const hydratedRef = useRef(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(ECHO_PROGRESS_KEY);
      if (stored) {
        const parsed = validateEchoProgress(JSON.parse(stored));
        if (parsed) setProgress(parsed);
      }
    } catch {
      // A corrupt or blocked store must never break the story.
    }
    hydratedRef.current = true;
  }, []);

  useEffect(() => {
    if (!hydratedRef.current) return;
    // The write is deferred a beat so the state that loads on mount is
    // never overwritten by the state that exists before it arrived.
    const timer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(ECHO_PROGRESS_KEY, JSON.stringify(progress));
      } catch {
        // Storage may be unavailable in private mode; progress is then in memory only.
      }
    }, 250);
    return () => window.clearTimeout(timer);
  }, [progress]);

  useEffect(() => {
    if (!storySlug) return;
    const stored = progress.active[storySlug];
    if (stored) setActive(stored);
  }, [storySlug, progress.active]);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    []
  );

  const setStorySlug = useCallback((slug: string | null) => {
    setStorySlugState(slug);
    setActive(null);
  }, []);

  const say = useCallback(
    (
      text: Localized,
      source: EchoMessageSource,
      nextState: EchoAnimationState = "talking",
      holdMs = MESSAGE_TTL
    ) => {
      counterRef.current += 1;
      setMessage({ id: counterRef.current, text, source });
      setState(nextState);
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        setState("idle");
      }, holdMs);
    },
    []
  );

  const setActiveChapter = useCallback(
    (chapterId: string) => {
      setActive(chapterId);
      if (!storySlug) return;
      setProgress((current) => {
        const visited = current.chapters[storySlug] ?? [];
        if (visited.includes(chapterId)) return current;
        return {
          ...current,
          chapters: { ...current.chapters, [storySlug]: [...visited, chapterId] },
          active: { ...current.active, [storySlug]: chapterId },
          updatedAt: new Date().toISOString(),
        };
      });
    },
    [storySlug]
  );

  const completeChapter = useCallback(
    (chapterId: string) => {
      if (!storySlug) return;
      setProgress((current) => {
        const done = current.completed[storySlug] ?? [];
        if (done.includes(chapterId)) return current;
        return {
          ...current,
          completed: { ...current.completed, [storySlug]: [...done, chapterId] },
          updatedAt: new Date().toISOString(),
        };
      });
    },
    [storySlug]
  );

  const awardBadge = useCallback(
    (badgeKey: string) => {
      if (!storySlug) return;
      setProgress((current) => ({
        ...current,
        badges: { ...current.badges, [storySlug]: badgeKey },
        updatedAt: new Date().toISOString(),
      }));
    },
    [storySlug]
  );

  const recordQuiz = useCallback((questionId: string, correct: boolean) => {
    setProgress((current) => ({
      ...current,
      quiz: {
        ...current.quiz,
        [questionId]: {
          questionId,
          correct,
          answeredAt: new Date().toISOString(),
        },
      },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const reset = useCallback(() => {
    setProgress(emptyEchoProgress());
    setActive(null);
  }, []);

  const badge = storySlug ? progress.badges[storySlug] ?? null : null;

  const value = useMemo<EchoContextValue>(
    () => ({
      state,
      message,
      say,
      setAnimation: setState,
      reset,
      storySlug,
      setStorySlug,
      activeChapter: active,
      setActiveChapter,
      visitedChapters: storySlug ? progress.chapters[storySlug] ?? [] : [],
      completedChapters: storySlug ? progress.completed[storySlug] ?? [] : [],
      completeChapter,
      badge,
      awardBadge,
      quizResults: progress.quiz,
      recordQuiz,
      progress,
    }),
    [
      state,
      message,
      say,
      reset,
      storySlug,
      setStorySlug,
      active,
      setActiveChapter,
      progress,
      completeChapter,
      badge,
      awardBadge,
      recordQuiz,
    ]
  );

  return <EchoContext.Provider value={value}>{children}</EchoContext.Provider>;
}

export function useEcho(): EchoContextValue {
  const context = useContext(EchoContext);
  if (!context) {
    throw new Error("useEcho must be used inside an EchoProvider");
  }
  return context;
}
