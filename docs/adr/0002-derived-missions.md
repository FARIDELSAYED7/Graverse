# ADR 0002 — Derive missions from artifact records

- Status: accepted
- Date: 2026-11-10

## Context

A mission page needs a name, launch date, destination, status, objectives,
achievements, artifacts, agency and sources. Artifact records already contain
most of these fields, verified against NASA sources. Copying them into a second
dataset would create two versions of the same fact and guarantee eventual drift.

## Decision

Build mission records at module load in `src/data/missions.ts`:

- group artifacts by mission name;
- take the earliest launch date, the union of source IDs and the union of
  objectives/achievements;
- normalise status into the shared mission-status bands;
- link to an agency through a mission-level mapping;
- keep the original NASA wording on the artifact page and state that the mission
  status is derived.

Mission pages render from this derived record and show their artifact cards
directly.

## Consequences

- Mission dates and status cannot disagree with the artifact records.
- Adding an artifact to a known mission automatically updates the mission page.
- Some mission-level fields (e.g. program) are coarser than a dedicated mission
  database would be. The UI says "Not recorded" when the artifact data does not
  support a value.
- The derivation is covered by a data test so a missing artifact or source fails
  the build.
