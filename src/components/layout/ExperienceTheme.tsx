"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { experienceForPath } from "@/lib/experience";

type Atmosphere = "deep-space" | "moon" | "mars";

const destinationAtmospheres = new Set(["moon", "mars", "deep-space"]);

/**
 * Sets the active experience on <html> so scoped tokens can restyle the
 * shared header, footer and page surface without duplicating layouts.
 *
 * It also sets the route atmosphere (<html data-atmosphere>) so the global
 * deep-space backdrop responds to the destination the visitor is looking at:
 * the Moon turns the sky silver-blue, Mars turns it rust-red, and everything
 * else keeps the cyan-indigo deep-space wash. Artifact detail pages advertise
 * their destination with a data-artifact-atmosphere marker rendered on the
 * server, so this component can mirror it after both SSR and client navigations.
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

    let atmosphere: Atmosphere = "deep-space";
    if (experience === "explorer") {
      const destination = new URLSearchParams(window.location.search).get(
        "destination"
      );
      if (destination === "moon" || destination === "mars") {
        atmosphere = destination;
      }
    } else if (pathname !== "/museum" && pathname.startsWith("/museum/")) {
      const marker = document.querySelector(
        "main [data-artifact-atmosphere]"
      )?.getAttribute("data-artifact-atmosphere");
      if (marker && destinationAtmospheres.has(marker)) {
        atmosphere = marker as Atmosphere;
      }
    }
    document.documentElement.dataset.atmosphere = atmosphere;
  }, [pathname]);

  return null;
}
