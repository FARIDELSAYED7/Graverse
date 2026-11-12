"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { useAskGraverse, type AskContextPayload } from "./AskGraverseProvider";

/**
 * Registers the record a page is about.
 *
 * A server component renders this around the page content and passes the
 * entity id and title it already knows. The browser never sends facts — the
 * server re-resolves the id against the real datasets.
 *
 * The scope owns a token. When a page unmounts late during a navigation it
 * only clears the context if it still owns it, so a page that has already
 * registered a new record is never left without one.
 */
export function AskGraverseScope({
  context,
  children,
}: {
  context: AskContextPayload;
  children: ReactNode;
}) {
  const { setContext } = useAskGraverse();
  const token = useId();
  const latest = useRef(context);
  latest.current = context;

  useEffect(() => {
    setContext(token, latest.current);
    return () => setContext(token, null);
  }, [setContext, token]);

  return <>{children}</>;
}
