# ADR 0001 — Preserve public URLs, add explicit experience prefixes

- Status: accepted
- Date: 2026-11-10

## Context

The existing product exposed `/explore`, `/kids`, `/museum/timeline` and
`/museum/[id]`. The expansion introduces three named experiences. Moving every
route would break bookmarks, shared query strings and any competition material
already published.

## Decision

- Keep `/museum/[id]` unchanged. Artifact deep links are the most valuable URLs
  in the product.
- Introduce `/academy`, `/museum` and `/explorer` as the three experience roots.
- Move the timeline to `/explorer`; it is an Explorer mode, not a museum page.
- Add temporary redirects for `/explore` → `/explorer`, `/kids` → `/academy` and
  `/museum/timeline` → `/explorer`.
- Parse and preserve query parameters in the Explorer page, and mirror filter
  state back into the URL.

## Consequences

- Old links keep working and carry their query strings.
- The three experiences have a clean, predictable URL space.
- Redirects are permanent enough for the competition but marked `permanent:
  false`, so they can be changed later without poisoning caches.
- Any future route change must add a redirect and a smoke assertion in the same
  commit.
