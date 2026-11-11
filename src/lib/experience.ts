export type ExperienceId = "academy" | "museum" | "explorer";

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
    accent: "#FF6B5A",
    surface: "#FFF7EA",
    ink: "#152238",
  },
  {
    id: "museum",
    name: "Museum",
    href: "/museum",
    eyebrow: "Discover",
    tagline: "Cinematic stories of real hardware",
    description:
      "Thirty source-linked artifact records with mission, fate, engineering and provenance for each object.",
    accent: "#A78BFA",
    surface: "#0A1426",
    ink: "#F4F7FC",
  },
  {
    id: "explorer",
    name: "Explorer",
    href: "/explorer",
    eyebrow: "Investigate",
    tagline: "The timeline and the solar system",
    description:
      "Filter the archive by time, destination and hardware, or move through a spatial map of the solar system.",
    accent: "#43B9FF",
    surface: "#050B18",
    ink: "#F4F7FC",
  },
];

export const experienceMap = new Map(
  experiences.map((experience) => [experience.id, experience])
);

export function experienceForPath(pathname: string): ExperienceId | "home" {
  if (pathname === "/academy" || pathname.startsWith("/academy/")) return "academy";
  if (pathname === "/museum" || pathname.startsWith("/museum/")) return "museum";
  if (pathname === "/explorer" || pathname.startsWith("/explorer/")) return "explorer";
  return "home";
}

export function isExperiencePath(pathname: string, id: ExperienceId): boolean {
  return experienceForPath(pathname) === id;
}
