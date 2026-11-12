/**
 * Shared vocabulary for the 3D exhibition hall.
 *
 * The hall is a client-side surface, so this module deliberately holds only
 * small constants: it must not pull the whole artifact dataset into the
 * browser bundle.
 */

import type { DestinationGroup, HardwareType } from "@/types/artifact";

/**
 * One accent per destination group. The same colour is used by the 3D bay
 * lighting, the HTML panel and the floor markers, so a visitor can read the
 * hall's colour code without reading a word.
 */
export const galleryAccents: Record<DestinationGroup, string> = {
  moon: "#8fc7ff",
  mars: "#ff9d7a",
  "deep-space": "#c3a6ff",
};

export const galleryAccentFallback = "#83d7ff";

export function accentFor(group: DestinationGroup): string {
  return galleryAccents[group] ?? galleryAccentFallback;
}

/** Short destination names used by the compact hall chrome. */
export const galleryDestinationLabels: Record<DestinationGroup, string> = {
  moon: "The Moon",
  mars: "Mars",
  "deep-space": "Deep Space",
};

/** Singular hardware labels, used for the "type" fact in the exhibit panel. */
export const galleryHardwareLabels: Record<HardwareType, string> = {
  rover: "Rover",
  lander: "Lander",
  orbiter: "Orbiter",
  probe: "Probe",
  instrument: "Instrument",
  "surface-equipment": "Surface equipment",
  aircraft: "Aircraft",
};

/**
 * Hall geometry, shared by the WebGL scene and the SVG floor plan so the
 * plan and the room can never drift apart.
 */
export const HALL_GEOMETRY = {
  /** Radius of the circle the exhibit bays sit on. */
  exhibitRadius: 7.6,
  /** Extra distance between the exhibit ring and the wall behind it. */
  wallGap: 1.55,
  /** Preferred arc length between two exhibit frames. */
  arcSpacing: 2.55,
  /** Smallest hall radius, so a six-bay room still feels like a rotunda. */
  minRadius: 4.2,
  /** How far the visitor stands from the centre of the room. */
  visitorRadius: 2.35,
  /** Eye height of the visitor. */
  eyeHeight: 1.62,
} as const;

/** The hall radius needed to seat a given number of bays comfortably. */
export function hallRadius(count: number): number {
  const needed =
    (Math.max(count, 1) * HALL_GEOMETRY.arcSpacing) / (Math.PI * 2);
  return Math.max(HALL_GEOMETRY.minRadius, needed);
}

/** The frame width that still leaves a gap between two neighbouring bays. */
export function frameWidth(count: number, radius: number): number {
  const spacing = (Math.PI * 2 * radius) / Math.max(count, 1);
  return Math.min(1.92, spacing * 0.74);
}

/** Frames keep a fixed portrait ratio so the artwork is never distorted. */
export const FRAME_ASPECT = 1.26;

export function frameHeight(width: number): number {
  return width * FRAME_ASPECT;
}

/** The angle of a bay, measured so that bay 0 sits at the front of the room. */
export function bayAngle(index: number, count: number): number {
  return (index / Math.max(count, 1)) * Math.PI * 2;
}
