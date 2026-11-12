# Founder Technical Mastery Guide

## Purpose

You built GRAVERSE, but a judge may ask you to explain any important technical decision from first principles. This guide is tied to the current repository and separates code evidence from interpretation and from open questions.

## 1. Technical story in one minute

GRAVERSE is a Next.js 14 App Router application using React 18.3 and TypeScript. Its static, typed data modules under `src/data/` are the source of truth for artifacts, missions, lessons, destinations, stories, simulations, and sources. Most routes are server components that read that data at build time. Client components are islands for browser interaction: filters, search, WebGL, quizzes, games, local progress, favourites, and menus. Zod schemas plus `scripts/validate-data.ts` gate data integrity. Browser scripts and data tests verify routes, links, accessibility rules, and stateful journeys. The product protects the central educational promise by keeping mission status, hardware status, and derived communication status separate.

## 2. Technology cards

### Next.js 14 App Router

**What?** A React framework with file-system routing, server components, static generation, layouts, metadata, and server/client boundaries.

**Why?** GRAVERSE has many content routes and mostly static source-linked content. App Router lets pages read typed data at build time while reserving browser JavaScript for interactions.

**How?** Routes are under `src/app/`; dynamic pages use `[id]`; pages such as `src/app/museum/[id]/page.tsx` provide `generateStaticParams`; the root layout is `src/app/layout.tsx`; redirects are in `next.config.mjs`.

**Evidence?** `docs/ARCHITECTURE.md`, route files, and `generateStaticParams` functions. The recorded project baseline describes 47 route patterns and 172 concrete routes.

**Alternatives/trade-offs.** Vite plus React Router could serve a client-only app, but would require a different rendering and deployment strategy. Server components reduce client code but make the boundary important to understand.

**If removed?** Routing, static generation, metadata, and the current rendering model would need replacement.

**Judge answer.** We use App Router because most GRAVERSE content is static and source-linked; pages render from typed data while client islands handle only browser actions.

### React 18.3

React provides the component model. Reusable components live under `src/components/`; examples include `ExploreExperience`, `SearchExperience`, `StatusBoard`, `LessonQuiz`, and `MyUniverseClient`. React makes composition clear, but behavior can be distributed across files, so use the lifecycle traces below.

### TypeScript

TypeScript provides static checks for props, values, unions, and relationships. The key semantic protection is `MissionStatus` versus `HardwareStatus` in `src/types/artifact.ts`. Other contracts live in `src/types/`, while `npm run typecheck` runs `tsc --noEmit`.

Types prevent classes of mistakes; they cannot prove that a source was interpreted correctly or that a visitor understands a label.

### Tailwind CSS

Tailwind provides utility-first responsive styling. `tailwind.config.ts`, `src/app/globals.css`, and component class names implement the visual system. Experience colors use CSS variables; `ExperienceTheme` keeps the Academy, Museum, and Explorer themes coherent. The trade-off is long class strings and the need for design discipline.

### Three.js, React Three Fiber, and Drei

Three.js is the WebGL engine; React Three Fiber maps React components to Three.js scenes; Drei provides helpers. GRAVERSE uses them for the orrery, Museum exhibition hall, and Academy play scenes. Inspect `src/components/explorer/Orrery3D.tsx`, `OrreryScene.tsx`, `src/components/museum/GalleryCanvas.tsx`, and Academy play components.

Dynamic loading with `next/dynamic`, `ssr: false`, and `use-webgl` keeps 3D client-only. The accessible meaning is in SVG, HTML controls, labels, and fallback content. If Three.js is removed, the visual layer goes away but the semantic content should remain. Do not call the scenes official spacecraft models or to scale.

## 3. Rendering and route model

Most page files are server components because they do not begin with a client directive and can read static data directly. Client islands appear when the browser is the source of changing state.

```text
/                    shared home
/academy/*            guided learning and games
/museum/*             artifact, mission, agency records
/explorer/*           timeline, destinations, deep sky, orrery
/mission-control      recorded status board
/engineering/*        explainers
/stories/*            curated paths
/research             method and limits
/simulations/*        approximations
/compare              side-by-side records
/my-universe          local personal state
/search               query-driven search
/sources              source registry
/api/export           JSON export
```

Dynamic routes use `generateStaticParams` for known IDs. `/search` is dynamic because query strings are user-controlled, but the index is still a static in-memory module. `next.config.mjs` preserves `/explore` → `/explorer`, `/kids` → `/academy`, and `/museum/timeline` → `/explorer`.

## 4. Data architecture

`src/data/` contains:

- `artifacts/`: six files assembled into 30 records by `src/data/artifacts/index.ts`.
- `space/bodies.ts`: 20 celestial bodies; `space/deep-sky.ts`: 8 deep-sky objects.
- `space/agencies.ts`: 8 agencies.
- `missions.ts`: 24 missions derived from artifacts.
- `lessons.ts`: 12 lessons; `journeys.ts`: 4 journeys; `articles.ts`: 8 articles.
- `games.ts`: 3 playground records; `engineering.ts`: 7 explainers.
- `stories.ts`: 8 story collections; `simulations.ts`: 8 definitions.
- `research.ts`: method/limits; `glossary.ts`: at least 40 terms.
- `sources.ts`: 96 registered sources in the recorded baseline.
- `relations.ts`: typed bidirectional relation graph.

The canonical artifact contract is `src/types/artifact.ts`. Important fields include identity, mission/program, destination/group, hardware type, two status unions, original wording, dates, milestone events, contributions, fate, location precision, technical details, media, related IDs, source IDs, verification date, and data notes.

### Derived missions

`src/data/missions.ts` groups artifacts by mission name, takes the earliest launch date, unions source IDs, and normalizes mission status. This avoids a hand-copied mission page drifting from artifact records. See `docs/adr/0002-derived-missions.md`; data tests assert mission artifact IDs resolve.

### Relation graph

`src/data/relations.ts` indexes entities as kind/id and emits directed edges for mission/artifact, location, parent/child body, agency/mission, related, featured-in, includes, and authored-for. Every edge has an inverse. `tests/data.test.ts` asserts symmetry and target resolution.

### Provenance

`src/types/provenance.ts`, `src/lib/provenance.ts`, `ClaimBadge.tsx`, `SourceList.tsx`, `src/data/sources.ts`, and `scripts/validate-data.ts` form the provenance layer. Confirmed/estimated claims need sources; simulated claims need a note/source; unknown values remain unknown; all source IDs must resolve. A resolved citation is not proof that every interpretation is perfect, so human review remains required.

## 5. State management

There is no Redux or server database. State is divided by purpose:

- URL state: Explorer filters and search query/kind.
- Component state: filters, sort, quizzes, simulations, menus, and games.
- Local progress: lessons, journeys, badges, stars, and achievements.
- Local personal records: favourites, collections, recent views, simulation completion.
- Cookie/locale: `graverse-locale` and locale helpers.

Inspect `src/lib/progress.ts`, `personal.ts`, `use-progress.ts`, `use-personal.ts`, `i18n.ts`, and `locale.ts`. Import/export validates JSON instead of blindly trusting it.

**Judge answer.** Browser-local state avoids accounts and lowers friction, but it is not cloud sync, cross-device identity, or a backend.

## 6. Testing and CI

```bash
npm run typecheck
npm run lint
npm run validate
npm run test:data
npm run build
npm run test:e2e
npm run test:journeys
npm run test:links
npm run verify
```

`tests/data.test.ts` checks collection sizes, unique IDs, source resolution, body/deep-sky citations, derived missions, relation symmetry, claim validation, route mapping, unified search, and playground links. `scripts/smoke.mjs`, `journeys.mjs`, and `link-check.mjs` cover browser behavior. `.github/workflows/ci.yml` runs validation, data tests, lint, build, typecheck, smoke/axe, journeys, and links.

Always separate recorded results from a fresh run. Record date, environment, command, and result. Do not copy old results forward after data or code changes.

## 7. Accessibility and performance

`docs/ACCESSIBILITY.md` documents landmarks, skip links, labels, visible focus, keyboard menus, reduced motion, 2D/list/no-WebGL alternatives, and partial Arabic direction support. Known limitations include no recorded screen-reader session, partial localization, axe’s incomplete coverage, and no in-canvas keyboard interaction by design.

`docs/PERFORMANCE.md` documents static routes, dynamic 3D chunks, local images, explicit sizes, local fonts, and server components keeping data out of client bundles. Recorded local probe numbers are unthrottled headless Chrome measurements, not Lighthouse or field data.

## 8. File map

### Application routes

| Path | Purpose | Main dependencies |
|---|---|---|
| `src/app/layout.tsx` | Global shell, locale/theme, header/footer | layout components and locale helpers |
| `src/app/page.tsx` | Home, three doors, counts, provenance promise | artifact stats and search |
| `src/app/academy/` | Academy route family | lessons, journeys, games, progress |
| `src/app/museum/` | Artifact, mission, agency routes | artifacts, missions, agencies, sources |
| `src/app/explorer/` | Timeline, bodies, deep sky, orrery | ExploreExperience and space data |
| `src/app/mission-control/` | Status board | mission-control and StatusBoard |
| `src/app/engineering/` | Engineering explainers | engineering data |
| `src/app/stories/` | Curated story paths | stories data |
| `src/app/research/page.tsx` | Method and limits | research data |
| `src/app/simulations/` | Approximation list/detail | simulations data and Simulators |
| `src/app/compare/page.tsx` | Side-by-side compare | CompareClient |
| `src/app/my-universe/page.tsx` | Local personal state | MyUniverseClient and personal helpers |
| `src/app/search/page.tsx` | Query entry | SearchExperience and search index |
| `src/app/sources/page.tsx` | Source registry | sources and provenance |
| `src/app/api/export/route.ts` | JSON export | dataset/personal state |

### Libraries worth knowing

`src/lib/explore.ts` owns Explorer filters and sorting. `src/lib/search-index.ts` builds normalized cross-kind search. `src/lib/provenance.ts` owns claim validation helpers. `src/lib/schemas.ts` owns Zod schemas. `src/lib/progress.ts` and `personal.ts` own local state. `src/lib/mission-control.ts` derives communication status. `src/lib/simulations.ts`, `rover-builder.ts`, and `rover-quest.ts` hold pure rules. `src/lib/i18n.ts` and `locale.ts` own language/direction. `src/lib/experience.ts` maps routes to themes.

## 9. Lifecycle traces

### Opening a Museum artifact

1. `/museum/{id}` resolves `src/app/museum/[id]/page.tsx`.
2. `getArtifact(params.id)` reads the map from `src/data/artifacts/index.ts`.
3. The page reads sources, related records, mission, agency, related lessons, derived communication, and freshness.
4. Server-rendered sections show overview, purpose, journey, science, fate, provenance, technical detail, anatomy, lessons, relations, and sources.
5. `ArtifactActions` handles browser-local favourites/recent views.

Evidence: `src/app/museum/[id]/page.tsx`, `src/data/artifacts/index.ts`, `src/data/sources.ts`, `src/lib/mission-control.ts`, `src/components/artifacts/ArtifactActions.tsx`.

### Selecting an artifact in Explorer

`src/app/explorer/page.tsx` builds initial state from query params; `ExploreExperience` owns mode/view/filter/sort and URL synchronization; `src/lib/explore.ts` filters `allArtifacts` and derives events; timeline/list preview links to `/museum/{id}`. It is not a remote archive query.

### Completing a lesson

The lesson route resolves `src/data/lessons.ts`; the page renders objectives, sections, terms, and the linked record; `LessonQuiz` manages answer feedback; progress helpers validate and write browser state; dashboards and achievements read the same state. Completion means stored in this browser, not mastery.

### Updating local progress

A client component calls the progress hook/helper; the shape is validated; browser storage is updated; other client readers consume the record; export/import serializes and revalidates it. Evidence: `src/lib/progress.ts`, `use-progress.ts`, Academy progress components, and `src/app/api/export/route.ts`.

### Running a simulation

`/simulations` reads `src/data/simulations.ts`; detail route resolves a definition; `Simulators.tsx` owns controls/results; the UI labels each output as an approximation and supports reset/complete. It is not flight software, a prediction, or an observation.

### Searching

`/search` parses `q` and `kind`; `src/lib/search-index.ts` creates docs across artifacts, missions, bodies, deep sky, lessons, journeys, articles, agencies, glossary, engineering, stories, simulations, and research; `searchAll` scores normalized terms; `SearchExperience` renders links. It is a static in-memory index.

### Switching Arabic/English

`LanguageToggle` changes the `graverse-locale` cookie; `getLocale()` reads it; root layout sets `lang` and `dir`; `t()` supplies translated interface strings; logical CSS and `unicode-bidi: plaintext` protect mixed text. Editorial artifact, lesson, and story prose remains English-only.

## 10. Judge defense cards

- **Why static data?** The collection is curated and source-linked; static generation makes it predictable, fast, and testable.
- **Why no database?** The current product needs no multi-user mutation or remote query; a database would add operations complexity without solving the storytelling problem.
- **How is data protected?** Type contracts, Zod schemas, registered source IDs, validator, tests, and human review.
- **What if WebGL fails?** Meaning survives through 2D/HTML alternatives; dynamic imports and detection keep 3D from blocking content.
- **What is derived?** Missions are derived from artifacts; communication is derived from recorded hardware status. Both are labelled.
- **What is local?** Progress, favourites, collections, recent views, and simulation completion.
- **Biggest risk?** A polished interface can overstate evidence if source review and limitations are neglected.

## 11. Final checklist

- [ ] I can explain every route family and dynamic route strategy.
- [ ] I can trace artifact, mission, relation, source, lesson, progress, search, locale, and simulation lifecycles.
- [ ] I can state why each dependency exists and one trade-off.
- [ ] I can distinguish server component, client island, URL state, and local storage.
- [ ] I can explain accessibility and performance without claiming certification or field metrics.
- [ ] I can reproduce or clearly label recorded verification results.
- [ ] I can name actual paths for every technical claim in the demo.
- [ ] I have left application source untouched during this task.

