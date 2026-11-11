import type { Metadata } from "next";
import { GamePageLayout } from "@/components/academy/play/GamePageLayout";
import { RoverQuest } from "@/components/academy/play/RoverQuest";
import { getPlayGame } from "@/data/games";

const game = getPlayGame("rover");

export const metadata: Metadata = {
  title: `${game.title} — 3D space game`,
  description: game.description,
};

export default function RoverQuestPage() {
  return (
    <GamePageLayout game={game}>
      <RoverQuest game={game} />
    </GamePageLayout>
  );
}
