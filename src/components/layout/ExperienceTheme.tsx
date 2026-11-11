"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { experienceForPath } from "@/lib/experience";

/**
 * Sets the active experience on <html> so scoped tokens can restyle the
 * shared header, footer and page surface without duplicating layouts.
 */
export function ExperienceTheme() {
  const pathname = usePathname();

  useEffect(() => {
    const experience = experienceForPath(pathname);
    document.documentElement.dataset.experience = experience;
    if (experience === "academy") {
      document.documentElement.dataset.motion =
        document.documentElement.dataset.motion ?? "full";
    }
  }, [pathname]);

  return null;
}
