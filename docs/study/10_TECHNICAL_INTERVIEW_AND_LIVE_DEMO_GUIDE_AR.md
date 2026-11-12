# GRAVERSE — دليل المقابلة التقنية والعرض الحي (Technical Interview & Live Demo)

> **الملف (10)**.

---

## 1. Code walkthrough (contract → data → logic → UI)

**Start here:** `src/types/artifact.ts` → `src/data/artifacts/index.ts` → `src/lib/explore.ts` → `src/app/museum/[id]/page.tsx` → `src/components/artifacts/*` → `src/lib/provenance.ts` → `src/lib/schemas.ts`.

This proves: contract → data → derived logic → UI, with validation.

### Step-by-step (live)
1. Open `src/types/artifact.ts`: show `MissionStatus` and `HardwareStatus` disjoint unions; `missionStatusOriginal`/`hardwareStatusOriginal` required.
2. Open `src/data/artifacts/index.ts`: show aggregation of 6 files, Map by id, sorting.
3. Open `src/lib/explore.ts`: show `searchScore`, `matchesFilters`, `timelineEntries`.
4. Open `src/app/museum/[id]/page.tsx`: show data lookup + notFound + relations + sources.
5. Open `src/components/artifacts/ArtifactAnatomy.tsx` / `StatusBadge`: show separation.
6. Open `src/lib/provenance.ts`: show `isValidClaim`.
7. Open `src/lib/schemas.ts`: show Zod enforcement.
8. Open `src/lib/mission-control.ts`: show `deriveCommunicationStatus`, `freshnessFor`.

---

## 2. Live demonstration questions

### "Walk me through your architecture."
- Start: Next.js App Router, server components default, client islands.
- Data: `src/data` single source of truth → types → lib → components → app.
- SSG: 47 route patterns, 172 concrete routes.
- Theming: CSS variables + experience attribute.
- 3D: progressive enhancement.
- Verification: `npm run verify`.
- Evidence: `docs/ARCHITECTURE.md`, `src/app/*`.

### "Show me how an artifact is loaded."
- Route `/museum/[id]` → `src/app/museum/[id]/page.tsx`.
- Lookup in `allArtifacts` (Map) from `src/data/artifacts/index.ts`.
- Related via `getRelations()` (`relations.ts`).
- Sources resolved from `src/data/sources.ts`.
- Rendered by `src/components/artifacts/*` + `SourceList`/`StatusBadge`.
- Evidence: file paths above.

### "Explain how a new artifact is added."
1. Find primary source; add/reuse entry in `sources.ts` (url + access date).
2. Edit record in `src/data/artifacts/*.ts`; use source's wording for status; keep GRAVERSE band separate.
3. Add claim labels where applicable; if unsourced → `unknown` or omit.
4. Add relations in `relations.ts` with inverses.
5. Run `npm run validate && npm run test:data`.
6. Run `npm run verify` before shipping.
- Evidence: `docs/DATA_AND_PROVENANCE.md` "Updating a record".

### "Explain the relationship between missions and hardware."
- Mission status: did objectives complete? Hardware status: what is object doing now?
- Disjoint unions in `types/artifact.ts`; `StatusBadge` kind; original wording required.
- Mission records derived from artifacts (`missions.ts`); communication derived (`mission-control.ts`).
- Evidence: `types/artifact.ts`, `lib/mission-control.ts`, ADR 0002.

### "Show me how Explorer filters work."
- `lib/explore.ts`: `ArtifactFilters`, `defaultFilters`, `matchesFilters`, `filterArtifacts`, `sortArtifacts`, `timelineEntries`.
- Route parses searchParams; `ExploreExperience` mirrors to URL.
- Evidence: `lib/explore.ts`, `src/app/explorer/page.tsx`.

### "Explain a React state update."
- Example: `ExploreExperience` filter change → `setFilters` → re-render → `filterArtifacts` → preview update → URL sync via `router.replace`/`searchParams`.
- Evidence: `components/explore/ExploreExperience.tsx`.

### "Walk me through a data validation process."
- `npm run validate` → `scripts/validate-data.ts`: 8 checks.
- `npm run test:data` → 21 assertions.
- CI runs both.
- Evidence: `scripts/validate-data.ts`, `tests/data.test.ts`.

### "Explain how local progress is persisted."
- Key `graverse:progress:v1`; `loadProgress`/`saveProgress`/`validateProgress`; import validation; reset with confirmation; export JSON; degrades to in-memory.
- Evidence: `lib/progress.ts`, ADR 0003.

### "Show how your static pages are generated."
- `generateStaticParams` in `[id]` routes; 137 generated pages; `/search` only dynamic.
- Evidence: `docs/ARCHITECTURE.md` §1; `src/app/*/page.tsx`.

### "Explain how you prevent broken relationships."
- `relations.ts` edges + inverses; validator checks targets + inverses; data test asserts symmetry + resolution.
- Evidence: `data/relations.ts`, `scripts/validate-data.ts`, `tests/data.test.ts`.

### "Explain how accessibility works in 3D experiences."
- Orrery: decorative, aria-hidden, "not to scale"; SVG OrbitMap with real links + list; reduced motion stops auto-rotation.
- Playground: scene lazy ssr:false after useWebgl; all state/controls in HTML; canvas aria-hidden; status via role=status; reduced motion; 2D fallbacks.
- Evidence: `docs/ARCHITECTURE.md` §5; `docs/ACCESSIBILITY.md`.

### "Explain what happens when JavaScript or WebGL is unavailable."
- WebGL: 2D fallbacks (OrbitMap, flat grid); content/actions available; journeys test verifies.
- JS: content pages are static HTML (readable); interactive islands won't run; not fully audited—disclose.
- Evidence: `docs/ACCESSIBILITY.md` Alternatives; `scripts/journeys.mjs`.

---

## 3. Debugging/code-reading exercises

1. **Find where communication status is derived:** `lib/mission-control.ts` → `deriveCommunicationStatus`. Check `PASSIVE_IDS`/`DESCENT_STAGE_IDS`.
2. **Find where freshness thresholds live:** `freshnessFor` (30/180 days).
3. **Find where search scoring weights are:** `lib/explore.ts` `searchScore`.
4. **Find where progress validation rejects bad data:** `lib/progress.ts` `validateProgress`.
5. **Find where claim validation happens:** `lib/provenance.ts` `isValidClaim`.
6. **Find where theming attribute is set:** `ExperienceTheme.tsx` + pre-paint script in `layout.tsx`.
7. **Find where relation symmetry is tested:** `tests/data.test.ts`.
8. **Find where simulation formulas are:** `lib/simulations.ts`.

---

## 4. Live demo script (from DEMO_GUIDE, ~9 min)

0. **Front door (45s):** open `/`; read problem/what-added panels; three doors; sentence; counts.
1. **Academy (3min):** age bands; First Flight journey; lesson + quiz; Play → Rocket Workshop (change parts, launch, badge); Rover Quest (arrow keys, flat map without WebGL); `/academy/progress` (local-only, export, reset).
2. **Museum (2min):** mission vs hardware status separate; Apollo 11 LM (`/museum/apollo-11-lm-descent-stage`): purpose→journey→science→fate; provenance; original wording; missions→agency chain.
3. **Explorer (2min):** modes; filters + URL; list view; `/explorer/solar-system` (orrery decorative + 2D map); body page claim badges.
4. **Provenance & search (1min):** `/sources` (claim legend, 96 registry, access dates, known limits); `/search?q=apollo`; empty state.
5. **Accessibility & engineering (30s):** Tab skip link; mobile menu keyboard; axe 0 violations; verification gates.
6. **Arabic & extras (45s, optional):** language toggle (RTL, dates intact); honest line (interface translated, prose English); Mission Control; Compare; My Universe.

---

## 5. Failure plan (demo)

- WebGL fails → switch to Museum; say it's a feature.
- External source slow → use `/sources`; links are provenance not runtime dependency.
- Storage fails → explain in-memory fallback.
- Unsupported question → say "unknown/not established" + point to source.
- Build not running → show recorded results.

---

## 6. Pre-demo checklist

- `nvm use && npm ci && npm run build && npm run start` (port 3000).
- Open `/sources` once to warm cache.
- Fresh browser profile or reset progress.
- Test redirect (`/explore`), filter, status distinction.
- Know dataset limits; don't show `.env` secrets.
- Practice 60-second artifact explanation.

---

## 7. Cross-references

00 (start), 05 (experiences), 09 (Q&A), 11 (pitch).