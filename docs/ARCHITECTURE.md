# Architecture

## 1. Rendering model

GRAVERSE is a Next.js 14 App Router application. Almost every page is a **server
component** that reads typed data directly at build time. Client components are
islands for interaction only:

| Client island | Why it is client-side |
| --- | --- |
| `ExploreExperience` | Filters, sort, mode switching, URL synchronisation |
| `SearchExperience` | Debounced query, kind filters, URL synchronisation |
| `ProgressDashboard`, lesson quizzes, journey steps | `localStorage` state |
| `Orrery3D` / `OrreryScene` | WebGL canvas, loaded with `next/dynamic` |
| `SiteHeader`, `MotionToggle` | Menus, focus management, motion preference |
| Academy robot guide | Step state and playback |
| Playground games (`RocketWorkshop`, `MoonPhases`, `RoverQuest`) | Game state, rewards, `localStorage`; the 3D scene itself is a separate `next/dynamic` island |
| `PlayBadgeShelf`, `ProgressSnapshot` | Read the shared local progress record |

The production build generates **140 static pages**. `/search` is the only
dynamic route because its query string is user-controlled; it still renders from
the same static data module.

## 2. Route model

Three experience prefixes map to three audiences:

```
/academy/*       warm, light, age-banded learning
/academy/play/*  three small 3D playground games
/museum/*        cinematic artifact, mission and agency records
/explorer/*      timeline, destinations, deep sky, 3D orrery
```

Shared surfaces (`/`, `/search`, `/sources`, `/about`) remain neutral. The
playground hub is `/academy/play`; the games are `/academy/play/rocket`,
`/academy/play/moon` and `/academy/play/rover`. They are normal static routes,
so deep links work without client-side navigation.

Preserved public URLs redirect in `next.config.mjs`:

```
/explore          → /explorer         (query string preserved)
/kids             → /academy
/museum/timeline  → /explorer
```

`/museum/[id]` artifact deep links are untouched. Explorer query parameters are
parsed in `src/app/explorer/page.tsx` and mirrored back to the URL by
`ExploreExperience`, so filtered views are shareable and back/forward works.

## 3. Data layer

`src/data` is the single source of truth:

```
artifacts/       30 artifact records split across six source files
space/bodies     20 solar-system records
space/deep-sky   8 deep-sky records
space/agencies   8 agencies
missions.ts      missions derived from artifact records
lessons.ts       12 lessons
journeys.ts      4 journeys
articles.ts      8 long-form articles
games.ts         3 playground games (metadata, badges, verified links)
glossary.ts      40 terms
sources.ts       96 registered sources
relations.ts     typed bidirectional relation graph
```

`src/types` holds the contracts (`artifact`, `space`, `academy`, `provenance`,
`progress`, `play`). `src/lib/schemas.ts` holds the zod schemas used by the
validator, including `playGameSchema`. `src/lib/rover-quest.ts` holds the pure
grid/star rules for Rover Quest so they can be unit-tested without a browser.

### Derived missions

Mission records are **not hand-copied**. `missions.ts` groups artifact records by
mission name, takes the earliest launch date, unions the source IDs, and
normalises the mission status band. Each mission page states that its status is
derived and that the original NASA wording is preserved on the artifact page.
This removes a whole class of drift: a mission cannot claim a date the artifact
does not support.

### Relation graph

`src/data/relations.ts` indexes every entity as `kind:id` and emits directed
edges for:

`mission-of` / `mission-artifact`, `located-on` / `artifact-location`,
`parent-body` / `child-body`, `operated-by` / `agency-mission`, `related`,
`featured-in`, `includes`, `authored-for`.

Each edge has an inverse. The data test asserts this symmetry and that every
target resolves. Detail pages use `getRelations()` to render "Connected records"
instead of bespoke link lists.

### Provenance

`src/types/provenance.ts` defines the claim contract. `src/lib/provenance.ts`
holds the shared labels and descriptions. `scripts/validate-data.ts` enforces:

- confirmed/estimated facts must cite at least one registered source;
- simulated facts must include a note or a source;
- unknown facts must not pretend to have a value;
- every `sourceId` anywhere in the dataset resolves to a source record;
- IDs are unique and required fields are present (zod).

## 4. Experience theming

The Academy is light; Museum and Explorer are dark. Rather than duplicate the
shell, the root layout runs a tiny pre-paint script that sets
`document.documentElement.dataset.experience` from the pathname.
`ExperienceTheme` keeps it in sync on client navigation.

Tailwind token colours resolve to RGB CSS variables:

```ts
bg: "rgb(var(--bg-rgb) / <alpha-value>)"
```

The Academy block in `globals.css` overrides those variables, so shared utility
classes (`bg-surface`, `text-text-secondary`, `border-white/10`, …) restyle
automatically while opacity modifiers still work. The shared header and footer
get explicit light-surface overrides. The pre-paint script prevents a dark flash
on Academy routes.

## 5. 3D and progressive enhancement

`/explorer/solar-system` contains:

1. a decorative `Orrery3D` loaded with `next/dynamic` and `ssr: false`, delayed
   until WebGL support is confirmed;
2. an accessible SVG `OrbitMap` with real links, plus a plain destination list.

The 3D scene is `aria-hidden`; all meaning and navigation lives in the 2D map.
Animation pauses when reduced motion is requested. The scene is explicitly
labelled "Schematic — not to scale".

Each playground game follows the same pattern, but the game is **not** optional:

1. the scene (`RocketScene`, `MoonScene`, `RoverScene`) is a separate
   `next/dynamic` island with `ssr: false`, mounted only after `useWebgl` finds a
   usable context;
2. all game state, controls, feedback and rewards live in ordinary HTML outside
   the canvas, so the game remains fully playable without WebGL or with a
   keyboard;
3. the canvas is `aria-hidden`; status changes are announced through a
   `role="status"` region;
4. reduced motion skips the launch animation, stops the rover bob and renders
   the Moon scene without decorative rotation.

The models are primitive toys. Each page carries a "toy — not to scale" label;
the rocket and rover also state that they are not reconstructions of real
spacecraft, and the rover terrain is invented for the game. Factual material is
never inside a canvas: `GamePageLayout` links back to the verified lesson,
artifacts, bodies and sources.

## 5a. Academy navigation

`AcademyNav` is rendered once by `src/app/academy/layout.tsx`, so Overview,
Journeys, Lessons, Playground, Robot lab and Progress share one labelled
navigation surface. Academy pages remain server components; only the progress
widgets and games are client islands.

## 6. Search

`src/lib/search-index.ts` builds one in-memory index over artifacts, missions,
bodies, deep-sky objects, lessons, journeys, articles, agencies and glossary
terms. Search is case-insensitive, partial-match, scored by field (title >
keywords > description), and grouped by kind in the UI. The query and kind filter
are mirrored into `/search?q=…&kind=…`.

## 7. Progress storage

`src/lib/progress.ts` owns a versioned record under
`graverse:progress:v1`:

```ts
{
  version: 1,
  lessons: { [id]: { completedAt, score, total } },
  journeys: { [id]: { startedAt, completedAt?, completedSteps } },
  games: { [id]: { completedAt, stars } },   // optional for older files
  badges: string[],
  updatedAt: string
}
```

`games` was added without bumping `version`: files written before the playground
still import, and `validateProgress` fills in an empty `games` record. Playground
badge IDs (`badge-play-rocket`, `badge-play-moon`, `badge-play-rover`) share the
same badge list as journeys, and the validator asserts that all badge IDs are
unique. Star scores are integers from 1 to 3.

Imports are validated before writing. Malformed versions, bad dates and
out-of-range scores or stars are rejected with a message. If `localStorage` is
unavailable the hook degrades to an in-memory store for the session. Export
produces a downloadable JSON file; reset clears the record after confirmation.

## 8. Error and empty states

- `src/app/error.tsx` — client error boundary with a retry path.
- `src/app/not-found.tsx` — branded 404.
- `EmptyState` — used by search and filtered Explorer views.
- Unknown/missing facts are rendered as "Unknown" or "Not recorded", never as a
  plausible placeholder.

## 9. Verification pipeline

```
tsc --noEmit
  → next lint
    → tsx scripts/validate-data.ts
      → tsx --test tests/data.test.ts
        → next build (GRAVERSE_DIST_DIR=.next-prod)
          → next start -p 3100
            → puppeteer smoke + redirects + axe
```

`scripts/verify.mjs` orchestrates the sequence and tears the server down. The
browser script checks HTTP status, title, `h1`, `main` landmark and body length
for 36 routes, asserts the three redirects preserve query strings, drives a real
rover move from its focused arrow panel, launches the toy rocket and checks that
`badge-play-rocket` was saved, and runs axe on 24 representative pages.
