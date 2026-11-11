export interface RoverPoint {
  x: number;
  z: number;
}

export const ROVER_GRID = 7;

export const ROVER_BASE: RoverPoint = { x: 3, z: 6 };

export const ROVER_SAMPLES: Array<RoverPoint & { id: string }> = [
  { id: "A", x: 1, z: 1 },
  { id: "B", x: 5, z: 2 },
  { id: "C", x: 2, z: 4 },
];

/**
 * Rocks are part of the invented game terrain, not a map of Mars. They block
 * a move so the game has something to plan around.
 */
export const ROVER_ROCKS: RoverPoint[] = [
  { x: 2, z: 1 },
  { x: 4, z: 4 },
  { x: 1, z: 5 },
  { x: 5, z: 5 },
  { x: 4, z: 1 },
];

export function samePoint(a: RoverPoint, b: RoverPoint): boolean {
  return a.x === b.x && a.z === b.z;
}

export function isRock(point: RoverPoint): boolean {
  return ROVER_ROCKS.some((rock) => samePoint(rock, point));
}

export function starsForMoves(moves: number): number {
  if (moves <= 24) return 3;
  if (moves <= 32) return 2;
  return 1;
}
