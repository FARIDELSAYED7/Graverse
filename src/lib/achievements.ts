import type { ProgressState } from "@/types/progress";
import type { PersonalState } from "@/lib/personal";
import { lessons } from "@/data/lessons";
import { journeys } from "@/data/journeys";
import { playGames } from "@/data/games";
import { simulations } from "@/data/simulations";

export type AchievementCategory =
  | "learning"
  | "exploration"
  | "collection"
  | "engineering"
  | "simulation";

export type AchievementIcon =
  | "book"
  | "route"
  | "game"
  | "star"
  | "heart"
  | "folder"
  | "eye"
  | "flask"
  | "wrench"
  | "trophy";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  icon: AchievementIcon;
  target: number;
  /** Human-readable unit for the progress meter. */
  unit: string;
}

export interface AchievementStatus extends Achievement {
  value: number;
  unlocked: boolean;
  percent: number;
}

export interface AchievementContext {
  progress: ProgressState;
  personal: PersonalState;
}

const ROVER_BUILDER_ID = "rover-builder";

export const achievements: Achievement[] = [
  {
    id: "first-lesson",
    title: "First lesson",
    description: "Complete one Academy lesson and answer its quiz.",
    category: "learning",
    icon: "book",
    target: 1,
    unit: "lesson",
  },
  {
    id: "five-lessons",
    title: "Curious mind",
    description: "Complete five Academy lessons.",
    category: "learning",
    icon: "book",
    target: 5,
    unit: "lessons",
  },
  {
    id: "all-lessons",
    title: "Academy graduate",
    description: "Complete every lesson in the collection.",
    category: "learning",
    icon: "trophy",
    target: lessons.length,
    unit: "lessons",
  },
  {
    id: "first-journey",
    title: "Journey started",
    description: "Complete one guided journey from start to finish.",
    category: "learning",
    icon: "route",
    target: 1,
    unit: "journey",
  },
  {
    id: "all-journeys",
    title: "Pathfinder",
    description: "Complete every guided journey.",
    category: "learning",
    icon: "route",
    target: journeys.length,
    unit: "journeys",
  },
  {
    id: "first-game",
    title: "Playground pilot",
    description: "Finish one Space Playground game.",
    category: "exploration",
    icon: "game",
    target: 1,
    unit: "game",
  },
  {
    id: "all-games",
    title: "Playground champion",
    description: "Finish all three Space Playground games.",
    category: "exploration",
    icon: "star",
    target: playGames.length,
    unit: "games",
  },
  {
    id: "first-favorite",
    title: "Saved for later",
    description: "Add an artifact to your favourites.",
    category: "collection",
    icon: "heart",
    target: 1,
    unit: "favourite",
  },
  {
    id: "five-favorites",
    title: "Personal collection",
    description: "Save five artifacts to your favourites.",
    category: "collection",
    icon: "heart",
    target: 5,
    unit: "favourites",
  },
  {
    id: "first-collection",
    title: "Curator",
    description: "Create your own named collection.",
    category: "collection",
    icon: "folder",
    target: 1,
    unit: "collection",
  },
  {
    id: "ten-viewed",
    title: "Museum walker",
    description: "Open ten different artifact records.",
    category: "exploration",
    icon: "eye",
    target: 10,
    unit: "artifacts",
  },
  {
    id: "first-simulation",
    title: "First experiment",
    description: "Complete one Mission Experience Lab simulation.",
    category: "simulation",
    icon: "flask",
    target: 1,
    unit: "simulation",
  },
  {
    id: "four-simulations",
    title: "Systems thinker",
    description: "Complete four different simulations.",
    category: "simulation",
    icon: "flask",
    target: 4,
    unit: "simulations",
  },
  {
    id: "rover-builder",
    title: "Rover engineer",
    description: "Finish a rover build in the Engineering Lab.",
    category: "engineering",
    icon: "wrench",
    target: 1,
    unit: "build",
  },
  {
    id: "all-simulations",
    title: "Mission designer",
    description: "Complete every Mission Experience Lab simulation.",
    category: "simulation",
    icon: "trophy",
    target: simulations.length,
    unit: "simulations",
  },
];

function completedJourneys(progress: ProgressState): number {
  return Object.values(progress.journeys).filter((journey) => journey.completedAt)
    .length;
}

export function achievementValue(
  achievement: Achievement,
  context: AchievementContext
): number {
  const { progress, personal } = context;
  switch (achievement.id) {
    case "first-lesson":
    case "five-lessons":
    case "all-lessons":
      return Object.keys(progress.lessons).length;
    case "first-journey":
    case "all-journeys":
      return completedJourneys(progress);
    case "first-game":
    case "all-games":
      return Object.keys(progress.games).length;
    case "first-favorite":
    case "five-favorites":
      return personal.favorites.length;
    case "first-collection":
      return personal.collections.length;
    case "ten-viewed":
      return personal.recent.length;
    case "first-simulation":
    case "four-simulations":
    case "all-simulations":
      return Object.keys(personal.simulations).filter(
        (id) => id !== ROVER_BUILDER_ID
      ).length;
    case "rover-builder":
      return personal.simulations[ROVER_BUILDER_ID] ? 1 : 0;
    default:
      return 0;
  }
}

export function achievementStatuses(
  context: AchievementContext
): AchievementStatus[] {
  return achievements.map((achievement) => {
    const value = Math.min(
      achievement.target,
      achievementValue(achievement, context)
    );
    return {
      ...achievement,
      value,
      unlocked: value >= achievement.target,
      percent: Math.round((value / achievement.target) * 100),
    };
  });
}

export function achievementSummary(context: AchievementContext) {
  const statuses = achievementStatuses(context);
  const unlocked = statuses.filter((status) => status.unlocked).length;
  return {
    unlocked,
    total: statuses.length,
    percent: Math.round((unlocked / statuses.length) * 100),
    statuses,
  };
}

export { ROVER_BUILDER_ID };
