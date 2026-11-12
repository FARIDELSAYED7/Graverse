# GRAVERSE — التقنية والبنية (Tech Stack & Architecture)

> **الملف (02)**. اقرأ مع 03 (file map).

---

## 1. المكدس (Verified from package.json)

| تقنية | إصدار (package.json) | دور |
|---|---|---|
| Next.js | 14.2.35 | App Router, SSR/SSG, routing, metadata, redirects, image optimization |
| React | 18.3.1 | UI components, hooks, client islands |
| React DOM | 18.3.1 | Rendering |
| TypeScript | 5.7.2 (dev) | Strict typing (`"strict": true` in tsconfig.json) |
| Tailwind CSS | 3.4.19 | Utility-first styling with CSS-variable tokens |
| Three.js | 0.169.0 | 3D scenes (orrery, playground) |
| @react-three/fiber | 8.18.0 | React renderer for Three.js |
| @react-three/drei | 9.122.0 | Helpers (OrbitControls, etc.) |
| Zod | 3.24.1 | Runtime schema validation |
| Lucide React | 0.468.0 | Icons |
| Node.js | >=22 (engines) / .nvmrc=22 | Runtime |
| tsx | 4.19.2 | Run TS scripts (validate, tests) |
| ESLint | 8.57.1 + eslint-config-next 14.2.35 | Lint |
| PostCSS | 8.4.49 + autoprefixer 10.4.20 | CSS pipeline |
| Sharp | 0.33.5 | Image optimization (dev) |
| Puppeteer-core | 23.11.1 | Browser tests (smoke/journeys/perf) |
| @axe-core/puppeteer | 4.10.2 | Accessibility checks |
| @types/* | various | Type definitions |

**لا يوجد** (verified): Redux, Zustand, Prisma, database driver, auth library, i18n library (custom), testing framework like Jest/Vitest (uses `tsx --test` / node scripts).

---

## 2. Why these technologies (trade-offs)

من `docs/ARCHITECTURE.md` و`docs/adr/*`:

### Next.js 14 App Router vs Vite
- **Why Next:** static generation (`generateStaticParams`), routing conventions, metadata API, image optimization, redirects, server components by default, production build pipeline. The product is content-heavy (172 routes) and benefits from SSG.
- **Trade-off:** heavier toolchain; framework coupling. Vite would require manual routing/SSG.
- **Consequence if removed:** routing/build break; must reimplement SSG, metadata, image opt.

### React 18 vs vanilla JS
- **Why:** component composition, hooks, client islands, ecosystem (R3F). Declarative UI for interactive islands.
- **Consequence if removed:** rewrite all components; lose R3F.

### TypeScript strict vs plain JS
- **Why:** typed data model (`Artifact`, `MissionStatus`/`HardwareStatus` disjoint unions), compile-time safety, path alias `@/*`. Protects data architecture (e.g., impossible to write `missionStatus: "operating"`).
- **Consequence if removed:** lose contract enforcement; data drift risk.

### Tailwind 3.4 vs traditional CSS
- **Why:** utility classes + CSS variables for theming (`rgb(var(--bg-rgb) / <alpha-value>)`), opacity modifiers preserved. Fast iteration; consistent tokens.
- **Consequence if removed:** rewrite all styling; theming harder.

### Three.js vs R3F
- **Relationship:** R3F is a React renderer for Three.js (not a replacement). Three.js = engine; R3F = declarative React layer. Drei = helpers.
- **Why both:** R3F maps Three concepts to React components; Drei provides OrbitControls etc. Without R3F, Three code would be imperative and harder to compose with React state.

### Server Components vs Client Components
- **Default:** Server Component (data read at build time, no client JS).
- **Client (`"use client"`):** only when state/browser/WebGL/events needed (see table §3).
- **Why:** smaller bundles, data stays server-side, faster first paint. Client islands only where interaction.

### Static generation vs SSR
- **Choice:** SSG for all content routes; only `/search` dynamic (query string user-controlled, but reads static in-memory index).
- **Why:** content is static typed data; SSG = fast, cacheable, no DB. SSR would add server load without benefit.

### Zod vs manual validation
- **Why:** runtime validation for import/export and build-time validator (`scripts/validate-data.ts`). TypeScript types alone don't validate runtime JSON.
- **Consequence if removed:** lose import validation gate.

---

## 3. Client islands (from docs/ARCHITECTURE.md §1)

| Client island | Why client-side |
|---|---|
| `ExploreExperience` | Filters, sort, mode switching, URL sync |
| `SearchExperience` | Debounced query, kind filters, URL sync |
| `ProgressDashboard`, lesson quizzes, journey steps | localStorage state |
| `Orrery3D` / `OrreryScene` | WebGL canvas, `next/dynamic` |
| `SiteHeader`, `MotionToggle` | Menus, focus, motion pref |
| Academy robot guide | Step state/playback |
| Playground games (RocketWorkshop, MoonPhases, RoverQuest) | Game state, rewards, localStorage; 3D scene separate dynamic island |
| `PlayBadgeShelf`, `ProgressSnapshot`, `AchievementsView`, `CertificateView` | Read shared local progress/personal |
| `StatusBoard`, `CompareClient`, `ArtifactActions` | Filters, side-by-side, favourites/recent |
| `Simulators` | 8 interactive models with local state |
| `MyUniverseClient`, `RoverBuilder`, `Flashcards` | Local collections, build state, study cards |

---

## 4. Next.js App Router — concepts in GRAVERSE

- **`src/app`** directory: file-system routing.
- **`layout.tsx`** (root): font (Inter local), theme pre-paint script, header/footer, locale, experience theme.
- **`academy/layout.tsx`**: renders `AcademyNav` once (shared nav across Academy pages).
- **Pages:** `page.tsx` per route; dynamic `[id]` routes.
- **`loading.tsx`**, **`error.tsx`**, **`not-found.tsx`**: route-level UX.
- **`generateStaticParams`**: used across artifact, mission, agency, body, deep-sky, lesson, journey, article, engineering, story, simulation routes → 137 generated pages.
- **`notFound()`**: when ID missing (`/museum/[id]`).
- **Metadata:** `metadata` / `metadataBase` (site URL from env).
- **Redirects:** `next.config.mjs` async redirects: `/explore`→`/explorer`, `/kids`→`/academy`, `/museum/timeline`→`/explorer` (permanent: false, query preserved).
- **`distDir`**: env override (`GRAVERSE_DIST_DIR`) for isolated build.
- **Images:** `formats: ["image/avif", "image/webp"]`.

---

## 5. Request & rendering lifecycle (3 examples)

### Example 1: Visitor opens Museum artifact URL
`/museum/apollo-11-lm-descent-stage`
1. Next.js route `src/app/museum/[id]/page.tsx`.
2. Server component calls data lookup (artifact by id from `allArtifacts` Map in `src/data/artifacts/index.ts`).
3. Related records via `getRelations()` from `src/data/relations.ts`.
4. Source references resolved from `src/data/sources.ts`.
5. Rendered page (SSG at build time).

### Example 2: Visitor selects artifact in Explorer
1. User interaction in `ExploreExperience` (client island).
2. Event handler → state update (filters/sort/selection).
3. Selected record → preview update.
4. URL sync (`searchParams` mirrored) → shareable link.
5. Navigation to `/museum/[id]` if opened.

### Example 3: Visitor completes a lesson
1. Lesson interface (`/academy/lessons/[id]`) → quiz evaluation.
2. Progress update via `useProgress` hook → `saveProgress` → `localStorage` (`graverse:progress:v1`).
3. Later retrieval via `loadProgress` / `validateProgress`.

---

## 6. Styling & design system

- **Tailwind config:** `tailwind.config.ts` — tokens as RGB CSS variables (`bg`, `surface`, `text-primary`, `accent`, etc.) + brand colors (ink/cream/orange/teal/cyan/violet/magenta/amber/emerald) + success/warning/danger.
- **CSS variables:** `src/app/globals.css` — dark defaults on `:root`, light override for `html[data-experience="academy"]`.
- **Experience theming (ADR 0004):** pre-paint script sets `document.documentElement.dataset.experience` from pathname; `ExperienceTheme` keeps in sync on client nav. Academy = light, Museum/Explorer = dark. Shared shell not duplicated.
- **Typography:** `next/font/local` Inter (`src/fonts/InterVariable.woff2`), `display: swap`.
- **Responsive:** Tailwind breakpoints; mobile menu in SiteHeader.
- **RTL:** logical properties (`ms-`/`me-`, `start-`/`end-`), `unicode-bidi: plaintext` for mixed blocks, `dir="auto"` on badges. Language cookie `graverse-locale`. See `docs/ACCESSIBILITY.md` §Language.
- **Accessibility styling:** focus-visible outlines, reduced-motion (`use-reduced-motion` + MotionToggle), skip-to-content link.
- **Animations:** keyframes (fade-up, fade-in, pulse-ring, drift, shimmer) with reduced-motion override.

---

## 7. Three.js & R3F in GRAVERSE

**Where used:**
- `/explorer/solar-system`: `Orrery3D`/`OrreryScene` (decorative, `aria-hidden`, "Schematic — not to scale").
- Academy playground: `RocketScene`, `MoonScene`, `RoverScene` (primitive toys, separate `next/dynamic` islands with `ssr: false`).
- `SpaceCanvas`/`SpaceScene` (shared wrapper).

**Progressive enhancement pattern:**
1. Scene is `next/dynamic` with `ssr: false`, mounted only after `useWebgl` confirms usable context.
2. All game state/controls/feedback/rewards live in ordinary HTML outside canvas → fully playable without WebGL/keyboard.
3. Canvas is `aria-hidden`; status changes announced via `role="status"`.
4. Reduced motion: stops auto-rotation, skips launch animation, no rover bob, Moon scene no decorative rotation.
5. 2D alternatives: SVG `OrbitMap` with real links + plain destination list; flat top-down grid map for Rover Quest.

**What happens without WebGL:** content and actions remain available (2D fallback). See `components/academy/play/use-webgl.ts`.

**No photoreal models:** primitive toys only; labelled "toy — not to scale"; rover terrain invented.

---

## 8. Data flow summary

```
src/data/* (typed, static) 
  → src/types/* (contracts)
  → src/lib/schemas.ts (Zod validation at build/import)
  → src/lib/* (derived logic: explore, mission-control, progress, personal, provenance, simulations)
  → src/components/* (UI)
  → src/app/* (routes, SSG)
```

Single source of truth: `src/data`. Pages read data directly (server components). Client islands import small helpers.

---

## 9. Verification pipeline

From `docs/ARCHITECTURE.md` §9:

```
tsc --noEmit → next lint → tsx scripts/validate-data.ts → tsx --test tests/data.test.ts
→ next build (GRAVERSE_DIST_DIR=.next-prod) → next start -p 3100
→ puppeteer smoke + redirects + axe → puppeteer user journeys → internal link crawl
```

`scripts/verify.mjs` orchestrates. CI: `.github/workflows/ci.yml`.

---

## 10. Localisation (i18n)

- Interface chrome in English + Arabic. Choice explicit, stored in cookie `graverse-locale` (no browser-language sniffing).
- `src/lib/i18n.ts`: locale metadata, dictionaries, `t()`.
- `src/lib/locale.ts`: reads cookie on server; exposes `lang`/`dir`.
- `src/components/layout/LanguageToggle.tsx`: sets cookie + refreshes route.
- Locale read on server, passed down as prop → client islands free of locale lookups; first paint already localised.
- `t(locale, key)` falls back to English then key itself.
- Both dictionaries kept in sync by check in `tests/data.test.ts`.
- `<html>` carries `lang` and `dir`.
- Editorial prose (artifact/lesson/story) remains English-only; Research Archive states limitation.
- Mixed-language: logical CSS properties + `unicode-bidi: plaintext` + isolated technical values.

---

## 11. Cross-references

- 03 (file map), 04 (data model), 05 (experiences), 10 (demo).