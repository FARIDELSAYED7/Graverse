# GRAVERSE

**An interactive space heritage timeline and source-linked digital museum.**

GRAVERSE is one product with three deliberately different experiences built on
one verified collection:

| Experience | Route | Audience | Character |
| --- | --- | --- | --- |
| **Space Academy** | `/academy` | Ages 5–12, split into 5–7, 8–9 and 10–12 | Warm, light, playful, guided |
| **Museum** | `/museum` | General readers | Cinematic, dark, story-first |
| **Explorer** | `/explorer` | Curious investigators | Data-first, immersive, filterable |

Every record answers the same questions — what was it, what happened, what did we
learn, what is known about it now — and every important claim carries an
evidence label and a link to the public source it came from.

There is no fabricated imagery, model, date, location, status or finding in the
collection. Where a value is not established, the interface says **Unknown**.

---

## Stack

| Layer | Version |
| --- | --- |
| Next.js (App Router) | 14.2.35 |
| React / React DOM | 18.3.1 |
| TypeScript (strict) | 5.7.2 |
| Tailwind CSS | 3.4.19 |
| three.js | 0.169.0 |
| @react-three/fiber | 8.18.0 |
| @react-three/drei | 9.122.0 |
| zod | 3.24.1 |
| Node.js | ≥ 20.9 (`.nvmrc` pins 20) |
| Browser checks | puppeteer-core 23.11.1 + @axe-core/puppeteer 4.10.2 |

No Vite migration, no alternate framework, no component library.

---

## Quick start

```bash
nvm use            # Node 20
npm ci
npm run dev        # http://localhost:3000
```

Production:

```bash
npm run build
npm run start      # http://localhost:3000
```

Environment variables are optional — copy `.env.example` only if you need a
canonical site URL or a custom Chrome path.

---

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Next.js development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (`next lint`) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run validate` | zod + referential integrity + provenance validation of the whole dataset |
| `npm run test:data` | Data, relation, search, provenance and progress tests (Node test runner) |
| `npm run test:e2e` | Browser smoke, redirect and axe checks against a running server |
| `npm run verify` | Full gate: typecheck → lint → validate → data tests → build → production server → smoke/axe |
| `npm run perf` | Local LCP/CLS/transfer probe against a running production server |

`verify` builds into `.next-prod` and serves on port `3100`, so it never
overwrites a running `next dev` cache.

---

## Routes

### Public experiences

```
/                              three-door onboarding
/academy                       Space Academy home
/academy/journeys              guided journeys
/academy/journeys/[id]
/academy/lessons
/academy/lessons/[id]
/academy/articles
/academy/articles/[id]
/academy/glossary
/academy/progress              local progress: export / import / reset
/academy/robot-lab             scripted robot guide
/museum                        the collection
/museum/[id]                   artifact detail template
/museum/missions               mission index
/museum/missions/[id]
/museum/agencies               agency index
/museum/agencies/[id]
/explorer                      timeline / destination / artifact modes
/explorer/solar-system         3D orrery + accessible 2D map
/explorer/bodies               destination index
/explorer/bodies/[id]
/explorer/deep-sky             deep-sky index
/explorer/deep-sky/[id]
/search                        one search across every entity kind
/sources                       complete source registry + methodology
/about                         project, method and limits
```

### Preserved URLs

Old public links redirect (query strings carried through):

| Old | New |
| --- | --- |
| `/explore` | `/explorer` |
| `/kids` | `/academy` |
| `/museum/timeline` | `/explorer` |

Artifact deep links such as `/museum/apollo-11-lm-descent-stage` are unchanged.
Explorer query parameters (`mode`, `view`, `scope`, `sort`, `destination`,
`hardwareType`, `missionStatus`, `hardwareStatus`, `decade`, `eventType`,
`event`, `artifact`) are parsed and synchronised in the URL.

---

## What is in the collection

| Dataset | Records |
| --- | --- |
| Artifacts (museum objects) | 30 |
| Solar-system bodies | 20 |
| Deep-sky objects | 8 |
| Missions (derived from artifacts) | 24 |
| Agencies | 8 |
| Academy lessons | 12 |
| Academy journeys | 4 |
| Academy articles | 8 |
| Glossary terms | 40 |
| Registered sources | 96 |
| Directed relation edges | 581 |

The collection is intentionally finite and curated. It is not a complete
inventory of space history, and it does not pretend to be.

### Evidence model

- **Confirmed** — directly stated by a primary source.
- **Estimated** — a range, approximation or model-derived value from a source.
- **Simulated** — computed by GRAVERSE from published parameters; never an observation.
- **Unknown** — no primary source in the record establishes the value.

Confirmed and estimated facts must cite at least one registered source. Simulated
facts must state their parameters or a source note. See
[`docs/DATA_AND_PROVENANCE.md`](docs/DATA_AND_PROVENANCE.md) and the live
registry at `/sources`.

---

## Architecture at a glance

```
src/
  app/              App Router routes, server components, metadata
  components/       UI, museum, explorer, academy, search, layout
  data/             typed, source-linked datasets
  lib/              provenance, relations, search, progress, experience, schemas
  types/            shared TypeScript contracts
scripts/            validation, browser smoke/axe, performance, verify
tests/              data, provenance, relation, search and progress tests
docs/               architecture, data, accessibility, demo guide, ADRs
```

Key decisions:

- Server components by default; client islands only for interaction (Explorer,
  search, progress, quizzes, 3D).
- Missions are **derived** from verified artifact records, so mission dates and
  status cannot drift from the underlying hardware records.
- One typed relation graph gives bidirectional links between artifacts, missions,
  bodies, deep-sky objects, agencies, lessons, journeys and articles.
- A typed provenance layer drives claim badges, validation and the source registry.
- The Academy swaps theme tokens on `<html data-experience="academy">`, so the
  shared header and footer restyle without a duplicate layout.

More detail: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

---

## Accessibility

Target: WCAG 2.1 AA. Semantic landmarks, one `h1` per page, keyboard paths,
visible focus, labelled controls, non-color status cues, reduced-motion support,
`aria-live` result counts, and 2D alternatives for every 3D/decorative view.

Browser checks run axe (`wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`) on 20
representative pages. See [`docs/ACCESSIBILITY.md`](docs/ACCESSIBILITY.md) for
the approach, automated results and the manual checks that were performed.

---

## Verification

Run `npm run verify` to reproduce every gate. The last recorded run is
summarised below. Results are from the local machine, not a claim about a
deployed environment.

- Data validation: **passed** — 30 artifacts, 20 bodies, 8 deep-sky objects,
  24 missions, 12 lessons, 4 journeys, 8 articles, 96 sources, 581 directed
  relation edges.
- Data tests: **9/9 passed**.
- Lint: **no warnings or errors**.
- Typecheck: **passed**.
- Production build: **passed** — 136 static pages generated.
- Browser smoke: **32 routes checked, 0 failures**.
- Axe: **0 serious or critical violations** on 20 pages.

A local headless-Chrome probe of nine representative routes recorded **CLS 0**
everywhere and LCP between **52 ms and 372 ms** on an unthrottled machine. Those
are local numbers, not Lighthouse or field data; the table and environment are in
[`docs/PERFORMANCE.md`](docs/PERFORMANCE.md).

Exact numbers and the build output summary are repeated in
[`docs/DEMO_GUIDE.md`](docs/DEMO_GUIDE.md).

---

## Limitations

- The collection is deliberately finite (30 artifacts, 24 missions). It is a
  curated exhibition, not a complete catalogue.
- There is no live NASA API integration. Records are a snapshot checked on
  **2026-11-10**; the access date on each source marks the boundary of what was
  verified.
- Some records deliberately omit an image or model instead of substituting a
  generated asset. Illustrations and schematic gradients are labelled.
- The 3D orrery is schematic — orbits and sizes are compressed, not to scale.
  No spacecraft 3D models are included.
- Academy progress is local to one browser. There are no accounts, no cloud
  sync and no analytics on progress. Export a JSON file to move it.
- Automated coverage is data/logic tests plus browser smoke and axe. There is no
  full visual-regression or cross-browser matrix.
- The browser gate needs Chrome/Chromium. Set `CHROME_PATH` when the default
  probe does not find one.

---

## Documentation

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — routes, rendering, data flow
- [`docs/DATA_AND_PROVENANCE.md`](docs/DATA_AND_PROVENANCE.md) — datasets, sources, claim rules, update procedure
- [`docs/ACCESSIBILITY.md`](docs/ACCESSIBILITY.md) — standards, checks, manual test log
- [`docs/PERFORMANCE.md`](docs/PERFORMANCE.md) — build characteristics and local probe method
- [`docs/DEMO_GUIDE.md`](docs/DEMO_GUIDE.md) — judge-facing walkthrough and recorded results
- [`docs/adr/`](docs/adr) — architecture decision records
