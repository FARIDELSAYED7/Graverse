"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AskContextKind } from "@/lib/ask/types";
import { AskGraverse } from "./AskGraverse";
import type { Locale } from "@/lib/i18n";

/**
 * The Ask GRAVERSE provider.
 *
 * It owns the open/closed state of the assistant and the *contextual* record
 * the visitor is currently looking at. The context is registered by a server
 * component on the page, so the browser only ever carries an entity id — the
 * server resolves it against the real datasets before anything reaches the
 * model.
 */

export interface AskContextPayload {
  kind: AskContextKind;
  id: string;
  title: string;
  subtitle?: string;
  href?: string;
}

interface AskGraverseValue {
  context: AskContextPayload | null;
  /**
   * Registers a contextual record. `token` identifies the registrant, so a
   * page that unmounts late cannot clear a context that another page has
   * already registered.
   */
  setContext: (token: string, context: AskContextPayload | null) => void;
  /**
   * Which mode the assistant is in: the record the visitor is looking at, or
   * the collection as a whole.
   */
  mode: AskMode;
  setMode: (mode: AskMode) => void;
  isOpen: boolean;
  open: (context?: AskContextPayload | null) => void;
  close: () => void;
  toggle: () => void;
}

/** The two operating modes of the assistant. */
export type AskMode = "context" | "global";

const AskGraverseContext = createContext<AskGraverseValue | null>(null);

export function useAskGraverse(): AskGraverseValue {
  const value = useContext(AskGraverseContext);
  if (!value) {
    throw new Error(
      "useAskGraverse must be used inside an AskGraverseProvider."
    );
  }
  return value;
}

interface RegisteredContext {
  token: string;
  context: AskContextPayload;
}

export function AskGraverseProvider({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
}) {
  const [registered, setRegistered] = useState<RegisteredContext | null>(null);
  const [mode, setMode] = useState<AskMode>("global");
  const [isOpen, setIsOpen] = useState(false);

  const setContext = useCallback(
    (token: string, next: AskContextPayload | null) => {
      if (next !== null) {
        // A page that knows which record it is showing puts the assistant in
        // contextual mode by default.
        setMode("context");
      }
      setRegistered((current) => {
        if (next === null) {
          // Only the registrant that owns the context may clear it.
          if (!current || current.token !== token) return current;
          return null;
        }
        if (
          current &&
          current.token === token &&
          current.context.kind === next.kind &&
          current.context.id === next.id
        ) {
          return current;
        }
        return { token, context: next };
      });
    },
    []
  );

  const open = useCallback((next?: AskContextPayload | null) => {
    if (next !== undefined && next !== null) {
      setRegistered((current) => ({ token: current?.token ?? "manual", context: next }));
      setMode("context");
    }
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((value) => !value), []);

  const value = useMemo<AskGraverseValue>(
    () => ({
      context: registered?.context ?? null,
      setContext,
      mode,
      setMode,
      isOpen,
      open,
      close,
      toggle,
    }),
    [registered, setContext, mode, isOpen, open, close, toggle]
  );

  return (
    <AskGraverseContext.Provider value={value}>
      {children}
      <AskGraverse locale={locale} />
    </AskGraverseContext.Provider>
  );
}
