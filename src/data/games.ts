import { getLesson } from "@/data/lessons";
import type { PlayGame } from "@/types/play";

const rocketLesson = getLesson("how-rockets-leave-earth");
const moonLesson = getLesson("our-neighbor-the-moon");
const roverLesson = getLesson("rovers-are-robot-explorers");

if (!rocketLesson || !moonLesson || !roverLesson) {
  throw new Error("Academy playground is missing a linked lesson.");
}

/**
 * Three playground games. Every game cites the lesson it belongs to and the
 * verified records it links back to. The 3D visuals are deliberately simple
 * toys, labelled as such in the interface.
 */
export const playGames: PlayGame[] = [
  {
    id: "rocket",
    title: "Rocket Workshop",
    tagline: "Build it, paint it, launch it.",
    description:
      "Choose a nose, body, fins and engine, then send your rocket skyward. Change one part at a time and watch the model change.",
    ages: ["5-7", "8-9"],
    minutes: 4,
    accent: "#B4432A",
    softAccent: "#FFE4DE",
    badge: {
      id: "badge-play-rocket",
      name: "Rocket Builder",
      description: "Built and launched a rocket in the Rocket Workshop.",
    },
    skills: ["Building", "Cause and effect", "Naming parts"],
    controls: "Tap the part buttons, drag the model to spin it, then press Launch.",
    toyNote:
      "The rocket is a toy made from simple shapes. It is not a model of a real launch vehicle.",
    lessonId: rocketLesson.id,
    artifactIds: ["apollo-11-lm-descent-stage", "perseverance", "voyager-1"],
    bodyIds: ["earth"],
    sourceIds: rocketLesson.sourceIds,
  },
  {
    id: "moon",
    title: "Moon Phase Mission",
    tagline: "Move the Moon. Match the phase.",
    description:
      "Slide the Moon around Earth, watch what you would see from your window, and match each target phase.",
    ages: ["5-7", "8-9", "10-12"],
    minutes: 5,
    accent: "#6A4BD8",
    softAccent: "#EAE4FF",
    badge: {
      id: "badge-play-moon",
      name: "Moon Watcher",
      description: "Completed three rounds of the Moon Phase Mission.",
    },
    skills: ["Patterns", "Observation", "Earth–Moon–Sun"],
    controls: "Move the slider or use the arrow keys, then press Check the Moon.",
    toyNote:
      "Earth, Moon and Sun are toy spheres. Sizes, distances and orbit speed are not to scale.",
    lessonId: moonLesson.id,
    artifactIds: ["apollo-11-lm-descent-stage", "ranger-7", "surveyor-1"],
    bodyIds: ["moon", "earth"],
    sourceIds: moonLesson.sourceIds,
  },
  {
    id: "rover",
    title: "Rover Quest",
    tagline: "Collect three samples. Get home.",
    description:
      "Drive a toy rover across a rocky patch of Mars, pick up three samples and return to the landing pad.",
    ages: ["8-9", "10-12"],
    minutes: 6,
    accent: "#0F766E",
    softAccent: "#D8F5EF",
    badge: {
      id: "badge-play-rover",
      name: "Rover Driver",
      description: "Collected three samples and returned to the pad in Rover Quest.",
    },
    skills: ["Planning", "Directions", "Persistence"],
    controls:
      "Use the big arrow buttons or the arrow keys while the game is focused. Rocks block the way.",
    toyNote:
      "The rover is a toy made from simple shapes. It is not a model of Perseverance or Curiosity, and the terrain is invented for the game.",
    lessonId: roverLesson.id,
    artifactIds: ["perseverance", "sojourner", "curiosity"],
    bodyIds: ["mars"],
    sourceIds: roverLesson.sourceIds,
  },
];

export const playGameMap = new Map(playGames.map((game) => [game.id, game]));

export function getPlayGame(id: PlayGame["id"]): PlayGame {
  const game = playGameMap.get(id);
  if (!game) throw new Error(`Unknown playground game: ${id}`);
  return game;
}
