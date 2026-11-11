/**
 * Scientific transparency model.
 *
 * Every important fact in GRAVERSE is one of four things. The UI never
 * presents an estimate or a simulation as a confirmed measurement.
 */
export type ClaimType = "confirmed" | "estimated" | "simulated" | "unknown";

export interface ProvenanceNote {
  claim: ClaimType;
  sourceIds: string[];
  note?: string;
}

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
