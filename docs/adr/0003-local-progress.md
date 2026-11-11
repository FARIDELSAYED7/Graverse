# ADR 0003 — Local-only, versioned, validated Academy progress

- Status: accepted
- Date: 2026-11-10

## Context

The Academy serves children aged 5–12. Accounts, email collection, analytics and
cloud sync add privacy, moderation and compliance burden that the product does
not need for a competition demo.

## Decision

- Store progress under `graverse:progress:v1` in `localStorage`.
- Version the record and validate imported JSON with a strict schema.
- Degrade to an in-memory session store when storage is unavailable, and say so
  in the UI.
- Provide explicit export (download JSON), import (validated) and reset (inline
  confirmation).
- Collect no personal data and no analytics on progress.

## Consequences

- Children can use the Academy without an identity.
- Progress does not follow a learner between devices automatically; the export
  file is the transfer mechanism.
- Clearing browser data loses progress unless it was exported.
- Any future schema change must bump `PROGRESS_VERSION` and add a migration,
  rather than silently accepting old shapes.
