import type { ClaimType } from "@/types/provenance";
import type { EntityKind, RelationType } from "@/data/relations";

export type { ClaimType };

/** Provenance contract shared by every experience. */
export const claimTypeLabels: Record<ClaimType, string> = {
  confirmed: "Confirmed",
  estimated: "Estimated",
  simulated: "Simulated",
  unknown: "Unknown",
};

export const claimTypeDescriptions: Record<ClaimType, string> = {
  confirmed: "Directly stated by a primary source.",
  estimated: "A range, approximation or model-derived value from a source.",
  simulated: "Computed by GRAVERSE from published parameters. Not an observation.",
  unknown: "No primary source in the record establishes this value.",
};

export interface ProvenanceNote {
  claim: ClaimType;
  sourceIds: string[];
  note?: string;
}

export interface RelationContract {
  fromKind: EntityKind;
  toKind: EntityKind;
  type: RelationType;
  bidirectional: true;
}

export const relationContract: RelationContract[] = [
  { fromKind: "artifact", toKind: "mission", type: "mission-of", bidirectional: true },
  { fromKind: "artifact", toKind: "body", type: "located-on", bidirectional: true },
  { fromKind: "mission", toKind: "agency", type: "operated-by", bidirectional: true },
  { fromKind: "body", toKind: "body", type: "parent-body", bidirectional: true },
  { fromKind: "journey", toKind: "lesson", type: "includes", bidirectional: true },
  { fromKind: "artifact", toKind: "artifact", type: "related", bidirectional: true },
];

export function isValidClaim(
  claim: ProvenanceNote,
  existingSourceIds: Set<string>
): boolean {
  if (claim.claim === "unknown") return true;
  if (claim.claim === "simulated") {
    return claim.note !== undefined && claim.note.length > 0;
  }
  return (
    claim.sourceIds.length > 0 &&
    claim.sourceIds.every((sourceId) => existingSourceIds.has(sourceId))
  );
}
