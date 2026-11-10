import type {
  DestinationGroup,
  HardwareStatus,
  HardwareType,
  MissionStatus,
} from "@/types/artifact";

/** The serializable subset the 3D hall needs for each exhibit. */
export interface GalleryItem {
  id: string;
  name: string;
  missionName: string;
  destination: string;
  destinationGroup: DestinationGroup;
  hardwareType: HardwareType;
  dateLabel: string;
  year: string;
  missionStatus: MissionStatus;
  hardwareStatus: HardwareStatus;
  description: string;
  image: string;
  /** Optimized exhibit texture used by the WebGL hall. */
  texture: string;
  alt: string;
  isIllustration: boolean;
}

export type GalleryFilter = "featured" | DestinationGroup;
