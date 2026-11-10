import type {
  Artifact,
  ArtifactMedia,
  EventType,
  MissionEvent,
} from "@/types/artifact";

export const ACCESSED = "2026-11-10";

export function event(
  id: string,
  type: EventType,
  date: string,
  dateLabel: string,
  label: string,
  description: string,
  sourceIds: string[],
  datePrecision: MissionEvent["datePrecision"] = "day"
): MissionEvent {
  return {
    id,
    type,
    date,
    datePrecision,
    dateLabel,
    label,
    description,
    sourceIds,
  };
}

export function image(
  src: string,
  alt: string,
  caption: string,
  credit: string,
  nasaId: string,
  width: number,
  height: number,
  isIllustration = false
): ArtifactMedia {
  return {
    type: "image",
    src,
    thumb: src,
    alt,
    caption,
    credit,
    nasaId,
    sourceUrl: `https://images.nasa.gov/details/${nasaId}`,
    isIllustration,
    width,
    height,
  };
}

export type ArtifactInput = Omit<Artifact, "lastVerified"> & {
  lastVerified?: string;
};

export function defineArtifact(artifact: ArtifactInput): Artifact {
  return { ...artifact, lastVerified: artifact.lastVerified ?? ACCESSED };
}
