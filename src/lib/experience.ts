export type ExperienceId = "academy" | "museum" | "explorer" | "stories";

export interface ExperienceDefinition {
  id: ExperienceId;
  name: string;
  href: string;
  eyebrow: string;
  tagline: string;
  description: string;
  accent: string;
  surface: string;
  ink: string;
  /** A darker-surface-safe tint of the accent, for small link text. */
  linkColor?: string;
}

export const experiences: ExperienceDefinition[] = [
  {
    id: "academy",
    name: "Academy",
    href: "/academy",
    eyebrow: "Learn",
    tagline: "Space school for curious minds",
    description:
      "Guided journeys, short lessons and quizzes for ages 5–12, linked to the real hardware in the museum.",
    accent: "#F08A6A",
    surface: "#FFF8EC",
    ink: "#14213B",
  },
  {
    id: "museum",
    name: "Museum",
    href: "/museum",
    eyebrow: "Discover",
    tagline: "Cinematic stories of real hardware",
    description:
      "Thirty source-linked artifact records with mission, fate, engineering and provenance for each object.",
    accent: "#F2B33D",
    surface: "#111A2E",
    ink: "#F7F2E7",
  },
  {
    id: "explorer",
    name: "Explorer",
    href: "/explorer",
    eyebrow: "Investigate",
    tagline: "The timeline and the solar system",
    description:
      "Filter the archive by time, destination and hardware, or move through a spatial map of the solar system.",
    accent: "#5EEAD4",
    surface: "#0B1222",
    ink: "#F7F2E7",
  },
  {
    id: "stories",
    name: "Stories",
    href: "/stories",
    eyebrow: "Experience",
    tagline: "ECHOES — Stories Beyond Earth",
    description:
      "An interactive storytelling experience with a 3D companion, real NASA imagery and bilingual narration.",
    accent: "#6D4AFF",
    linkColor: "#c9bfff",
    surface: "#FBF6EC",
    ink: "#1A1338",
  },
];

export const experienceMap = new Map(
  experiences.map((experience) => [experience.id, experience])
);

export function experienceForPath(pathname: string): ExperienceId | "home" {
  if (pathname === "/academy" || pathname.startsWith("/academy/")) return "academy";
  if (pathname === "/museum" || pathname.startsWith("/museum/")) return "museum";
  if (pathname === "/explorer" || pathname.startsWith("/explorer/")) return "explorer";
  if (pathname === "/stories" || pathname.startsWith("/stories/")) return "stories";
  return "home";
}

export function isExperiencePath(pathname: string, id: ExperienceId): boolean {
  return experienceForPath(pathname) === id;
}
