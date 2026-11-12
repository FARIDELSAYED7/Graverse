import type {
  DestinationGroup,
  HardwareStatus,
  HardwareType,
  MissionStatus,
} from "@/types/artifact";

/** A single labelled fact shown in the exhibit panel. */
export interface GalleryFact {
  label: string;
  value: string;
}

/** A contribution recorded for an artifact. */
export interface GalleryContribution {
  title: string;
  summary: string;
}

/** The serializable subset the 3D hall needs for each exhibit. */
export interface GalleryItem {
  id: string;
  name: string;
  missionName: string;
  programName: string;
  destination: string;
  destinationGroup: DestinationGroup;
  hardwareType: HardwareType;
  dateLabel: string;
  year: string;
  /** ISO date used to order the room chronologically. */
  sortDate: string;
  missionStatus: MissionStatus;
  hardwareStatus: HardwareStatus;
  description: string;
  overview: string;
  /** What is documented about where the hardware is today. */
  fate: string;
  contributions: GalleryContribution[];
  facts: GalleryFact[];
  image: string;
  /** Optimized exhibit texture used by the WebGL hall. */
  texture: string;
  alt: string;
  isIllustration: boolean;
}

export type GalleryFilter = "featured" | DestinationGroup;

/** How the room orders its bays. */
export type GallerySort = "curated" | "chronological";

/**
 * Mutable view state shared between the HTML chrome and the WebGL scene.
 * It is a ref so that dragging the room never re-renders the React tree.
 */
export interface HallControls {
  /** Horizontal look offset in radians. */
  yaw: number;
  /** Vertical look offset in radians. */
  pitch: number;
  /** Zoom factor applied to the camera field of view. */
  zoom: number;
}
