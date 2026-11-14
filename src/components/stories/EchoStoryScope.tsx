"use client";

import { useEffect } from "react";
import { useEcho } from "@/lib/echo/provider";

/**
 * Points the shared companion at the story the reader is in.
 *
 * Keeping this in a tiny client component means the story page itself stays
 * a server component and the full story data never has to be serialised
 * into the browser bundle.
 */
export function EchoStoryScope({ slug }: { slug: string }) {
  const { setStorySlug } = useEcho();

  useEffect(() => {
    setStorySlug(slug);
    return () => setStorySlug(null);
  }, [slug, setStorySlug]);

  return null;
}
