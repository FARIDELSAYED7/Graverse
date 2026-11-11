import type { Metadata } from "next";
import { GamePageLayout } from "@/components/academy/play/GamePageLayout";
import { MoonPhases } from "@/components/academy/play/MoonPhases";
import { getPlayGame } from "@/data/games";

const game = getPlayGame("moon");

export const metadata: Metadata = {
  title: `${game.title} — 3D space game`,
  description: game.description,
};

export default function MoonPhaseMissionPage() {
  return (
    <GamePageLayout game={game}>
      <MoonPhases game={game} />
    </GamePageLayout>
  );
}
