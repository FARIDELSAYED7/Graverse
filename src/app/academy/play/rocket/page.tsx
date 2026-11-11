import type { Metadata } from "next";
import { GamePageLayout } from "@/components/academy/play/GamePageLayout";
import { RocketWorkshop } from "@/components/academy/play/RocketWorkshop";
import { getPlayGame } from "@/data/games";

const game = getPlayGame("rocket");

export const metadata: Metadata = {
  title: `${game.title} — 3D space game`,
  description: game.description,
};

export default function RocketWorkshopPage() {
  return (
    <GamePageLayout game={game}>
      <RocketWorkshop game={game} />
    </GamePageLayout>
  );
}
