# GRAVERSE

**An interactive space heritage timeline and source-linked digital museum.**

GRAVERSE is a NASA Space Apps Challenge project about the hardware humanity left
behind on the Moon, on Mars, and in deep space — and about the difference
between *a mission ending* and *an object being gone*.

It is one product with three deliberately different core experiences built on a
single verified collection, plus six supporting source-linked surfaces, a
scriptable educational layer, and an open dataset.

---

## Table of contents

1. [Project overview](#1-project-overview)
2. [The challenge](#2-the-challenge)
3. [Our vision](#3-our-vision)
4. [Core experiences](#4-core-experiences)
5. [Key features](#5-key-features)
6. [Technology stack](#6-technology-stack)
7. [Architecture](#7-architecture)
8. [Getting started](#8-getting-started)
9. [Environment variables](#9-environment-variables)
10. [Development commands](#10-development-commands)
11. [Testing and quality checks](#11-testing-and-quality-checks)
12. [Project structure](#12-project-structure)
13. [Data sources and attribution](#13-data-sources-and-attribution)
14. [Competition information](#14-competition-information)
15. [Contributing](#15-contributing)
16. [License](#16-license)

---

## 1. Project overview

### The problem

For over half a century, humanity has sent machines to the Moon, Mars, and
other celestial bodies. When their missions end, probes, rovers, landers,
descent stages, and scientific instruments are left behind, standing — or
flying — silently as monuments to human exploration.

The information about any one of those objects is scattered across mission
pages, image libraries, technical archives, and historical documents. A
visitor or a school-age learner struggles to answer even the basic questions:

- What is this object?
- Which mission sent it?
- Why was it sent?
- What did it discover?
- What is its status today — operating, inactive, lost, destroyed, or simply
  no longer tracked?
- What evidence supports any of that?

### The response

GRAVERSE compiles **33 source-linked hardware records** into one collection and
gives them three different ways in:

| Experience | Route | Audience | Character |
| --- | --- | --- | --- |
| **Space Academy** | `/academy` | Ages 5–12, split into 5–7, 8–9, 10–12 | Warm, light, playful, guided |
| **Museum** | `/museum` | General readers | Cinematic, dark, story-first |
| **Explorer** | `/explorer` | Curious investigators | Data-first, immersive, filterable |

Around those three doors sit six additional source-linked surfaces:

| Surface | Route | What it adds |
| --- | --- | --- |
| **Mission Control** | `/mission-control` | A status board that keeps mission, hardware, and derived communication status separate |
| **Engineering Lab** | `/engineering` | Seven explainers on power, mobility, landing, communication, instruments, materials, and engineering evolution |
| **Space Stories** | `/stories` | Seventeen cinematic reading paths — one per mission — composed scene by scene from the records that already exist |
| **Research Archive** | `/research` | Method, source hierarchy, claim labels, coverage, an honest changelog, and declared limits |
| **Mission Experience Lab** | `/simulations` | Eight interactive educational models, each labelled as an approximation |
| **My Universe** | `/my-universe` | Local favourites, collections, recently viewed records, and completed simulations |

The Academy additionally has a **Space Playground** at `/academy/play` with three
small 3D games — a toy rocket builder, a Moon-phase mission, and a rover sample
run. They are built from simple shapes, labelled as toys rather than official
models, and each links back to a verified lesson and museum record.

Every record answers the same questions — what was it, what happened, what did we
learn, what is known about it now — and every important claim carries an
evidence label and a link to the public source it came from.

**There is no fabricated imagery, model, date, location, status, or finding in
the collection. Where a value is not established, the interface says
`Unknown`.**

---

## 2. The challenge

GRAVERSE is a response to the official 2026 NASA Space Apps Challenge:

> **Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment
> on the Moon and Mars**
> — <https://www.spaceappschallenge.org/2026/challenges/nasas-discarded-equipment-storytelling/>
> (Categories: Intermediate, Beginner/Youth · Skills: Astrophysics, Planets &
> Moons, Space Exploration)

The challenge asks participants to tell the story of some or all of the
equipment NASA has left across the Solar System, in a way that introduces
**school-age space enthusiasts** to the hardware and the science it made
possible — noting explicitly that those young audiences "often hear only about
active, ongoing missions", and that "accuracy is important throughout".

### How GRAVERSE responds

| Challenge requirement | Response in GRAVERSE |
| --- | --- |
| Show what types of equipment reside on the Moon, Mars and elsewhere | 33 records across 7 hardware types and 3 destination groups, browsable in Explorer and Museum |
| Connect equipment to the missions that enabled it | `missionName` and `programName` on every record, plus 27 mission pages derived from those records |
| Show how each object's status varies | A separate hardware-status field with 7 defined bands, plus per-record "fate" prose |
| Translate complex historical and scientific data into an engaging narrative | Three experiences, seventeen cinematic stories, eight engineering explainers, and a 3D exhibition hall |
| Teach school-age and casual space enthusiasts | The Academy: 4 learning journeys, 12 lessons across 3 age bands, 8 long-form articles, 24 quiz questions, 3 3D games |
| Explain what the hardware was, why it was sent, and what it discovered | Sections A, B and D of the single museum record template |
| Connect engineering to scientific knowledge | The Engineering Lab, plus per-record contributions tagged `science` or `engineering` |
| Be accurate | 96 registered sources with access dates, a four-value claim model, `Unknown` instead of guesses, and a build-gating validator |

### One thing the challenge did not ask for

GRAVERSE also separates two things the challenge never mentions:
**the status of a mission** and **the status of the physical hardware**.

A mission can be complete while its hardware is still on the Moon, still
intact, or still in use. Ranger 7 succeeded and then impacted on purpose.
Cassini was deliberately destroyed. The Apollo 11 laser retroreflectors are
still used today. Collapsing those into a single status word would lose most
of the story the challenge is asking us to tell.

---

## 3. Our vision

**Space is not an empty container of planets. It is a heritage landscape that
contains the physical traces of human scientific and technological activity.**

On the Moon there is no wind and no weather. On Mars there is almost none. What
humanity left there has not been erased — it is a material record, and the
question of what to do with it is a question of memory, not housekeeping.

That gives us three commitments:

1. **Separation, not simplification.** A mission's lifecycle and an object's
   lifecycle are different dimensions. We model them as separate, typed fields
   and keep NASA's original wording next to every normalized label.
2. **Honesty over completeness.** The collection is deliberately finite and
   curated. Where a value is unknown it stays unknown, where sources disagree
   the disagreement is preserved in `dataNotes`, and missing records are
   described as gaps rather than as evidence of absence.
3. **Depth through a single dataset.** Thirty records read three ways beats
   thirty pages. Every lesson, story, explainer, simulator, and search result
   points back to the same artifact record and the same registered source.

---

## 4. Core experiences

### 4.1 Space Academy — `/academy`

The knowledge experience, designed for ages 5–12 in three bands.

- **4 learning journeys** — *First Flight* (5–7), *Moon Detectives* (8–9),
  *Mission Engineer* (10–12), *Rock to Rover* (8–9). A journey is a sequenced
  path that mixes lessons, museum records, destination pages, articles, and
  challenges, and awards a badge on completion.
- **12 lessons** — each with three learning objectives, three narrative
  sections, key terms, a "try it" prompt, and a knowledge check. Every lesson
  question shows an explanation for the right answer, not just a score.
- **8 long-form articles** and a **40-term glossary** written in plain language.
- **3 3D playground games** — Rocket Workshop, Moon Phase Mission, Rover Quest.
  Every model is assembled from primitives and labelled "toy — not to scale"; the
  rocket and rover are explicitly *not* reconstructions of real spacecraft.
- **Rover engineering exercise** at `/academy/build-rover` — a trade-off
  builder with 15 parts across mobility, power, instruments, communication, and
  thermal control.
- **Scripted robot guide** at `/academy/robot-lab` — a 33-artifact guide that
  answers from the record and says so when the record does not cover a question.
  It is explicitly *not* an AI chat.
- **Progress, achievements, and a printable learning record** — stored locally
  in the browser, with no account, no cloud sync, and no analytics.

### 4.2 Museum — `/museum`

The heritage experience: 33 artifact records on one reusable template.

Each record is organised as **A.** what it is · **B.** why it was sent ·
**C.** the journey · **D.** what we learned · **E.** what happened to the
hardware · **F.** technical details and a recorded anatomy panel ·
**G.** media and model · **H.** related Academy lessons · **I.** related
records · **J.** sources, uncertainty notes, and verification.

Two panels carry the project's core idea:

- **"Two different questions"** — mission status and hardware status side by
  side, each with NASA's original wording beneath the normalized label.
- **The exhibition hall** — a 3D rotunda that displays real NASA photographs on
  gallery frames. The visitor stands inside the room and walks around it as
  the selection changes; each bay has a lit alcove, a numbered plinth and a
  shaft of light, and the floor carries a compass inlay that points at every
  bay. Around the room sits a full interface: a guided tour, a drag-to-look
  view, zoom and full screen, a floor plan, a chronology axis, a numbered
  exhibit rail, search and sort, and a live selected-exhibit panel with the
  record's facts, contributions and actions. The scene is decorative; all
  meaning lives in the accessible panel, the rails and the collection below.

### 4.3 Explorer — `/explorer`

The discovery experience.

- **Three modes** — a chronological **timeline** of 136 mission events, a
  **by destination** view, and a **by artifact** view.
- **Six filters plus scope and sort** — destination, hardware type, mission
  status, hardware status, decade, milestone type, primary/all event scope, and
  oldest/newest/name sorting. Active filters appear as removable chips and are
  mirrored into the URL so a filtered view can be shared.
- **Timeline preview** — selecting an event opens a panel with the event, the
  artifact, both statuses, and a link into the museum record.
- **List view** — the same records as a scannable, screen-reader-friendly list.
- **Destination and deep-sky records** — 20 Solar System bodies and 8 deep-sky
  objects with claim-labelled facts, connected-record links, and source lists.
- **3D orrery at `/explorer/solar-system`** — a schematic WebGL scene plus a
  fully accessible SVG orbit map carrying the same links and labels, and a plain
  destination list.

### 4.4 What the three share

One dataset, one relation graph, one source registry. A lesson's artifact link
opens the same museum record an explorer click opens, and that record cites the
same sources an engineering explainer cites.

---

## 5. Key features

### Separation of mission status and hardware status

The project's defining decision, enforced in the type system rather than the
interface:

```ts
export type MissionStatus =
  | "planned" | "ongoing" | "completed" | "ended" | "lost-contact" | "unknown";

export type HardwareStatus =
  | "operating" | "inactive" | "no-longer-communicating"
  | "impacted" | "destroyed" | "still-traveling" | "unknown";
```

The two unions share no members, `StatusBadge` takes a discriminated union so
the kinds cannot be mixed at a call site, and every record stores NASA's
verbatim wording in `missionStatusOriginal` and `hardwareStatusOriginal`
alongside the normalized band.

### Derived missions

Mission records are **derived** from verified artifact records rather than
hand-copied, so a mission page cannot claim a date its artifacts do not
support. The build-gating validator asserts this.

### A four-value evidence model

`confirmed` · `estimated` · `simulated` · `unknown`, with the rule that
confirmed and estimated facts must cite a registered source, simulated facts
must state their parameters, and unknown facts must not pretend to have a
value.

### A typed, bidirectional relation graph

605 directed edges across 12 relation types, with symmetric inverses asserted
by the test suite, linking artifacts, missions, bodies, deep-sky objects,
agencies, lessons, journeys, and articles.

### A cinematic story director

**Space Stories is not one template repeated seventeen times.** A presentation
engine (`src/lib/echo/cinematic.ts`) reads each story's own chapters,
photographs, timelines, discoveries, 3D model and archival video, then composes
a scene sequence for that mission — one engine, different journeys. Each of the
17 stories (Sojourner, Opportunity, Spirit, Viking 1 & 2, Apollo 11 LM, the
lunar rover, ALSEP, Surveyor, Phoenix, InSight, Ingenuity, NEAR Shoemaker, Dawn,
Pioneer 10 & 11, Kepler) follows its own recipe across ten layouts — opening,
statement, editorial, annotated, artifact, diagram, stages, science, signal,
finale — in one of seven families (rover, flight, crew-rover, lander, voyager,
telescope, instrument). Scenes alternate between a dark cinematic register and a
warm paper register so a long story reads as distinct slides, never one long
dark page. Sourced chapter narration is never dropped when a discoveries
chapter expands into one scene per investigation, and every chapter keeps its
quiz, timeline, challenge, diagram and video attached to its own scenes —
asserted by `tests/cinematic.test.ts`.

### An open dataset

`GET /api/export` serves the public dataset as JSON — artifacts, missions,
sources, bodies, deep-sky objects, lessons, journeys, articles, agencies,
glossary, engineering topics, stories, and simulations.

### A grounded AI space heritage guide

**Ask GRAVERSE** answers questions from the same records the rest of the
product reads. The browser sends an entity id; the server resolves it against
the real datasets, attaches the registered sources, and asks OpenRouter for an
answer — using free models only. The system prompt separates mission status
from hardware status, forbids invented NASA facts and fabricated citations,
and requires the assistant to say *"The available GRAVERSE records do not
establish this information."* when the records do not answer. It works in
English and Arabic, in global and contextual modes, and the rest of the
application is unaffected when the AI service is unavailable.

### Local-first: most questions never reach the API

**Ask GRAVERSE is local-first.** Before anything is sent to a provider, five
local layers try to answer from the archive itself:

1. **Conversational intents** — greetings, thanks, goodbyes, "what can you do?"
2. **A curated knowledge base** — 26 entries on the archive and the science it
   covers, each citing registered sources
3. **Dynamic record answers** — nineteen aspects (overview, purpose, status,
   fate, location, dates, science, technical, mission, agency, related…) built
   from the fields a record actually has, across ten record kinds
4. **Deterministic matching** — Unicode- and Arabic-aware normalisation,
   aliases, keyword and phrase matching and a bounded edit distance
5. **Comparisons and relationships** — two records compared field by field, or
   what the relation graph links

A local answer needs **no API key, no provider request and no quota**, and it
is never rate limited. OpenRouter is the fallback for genuine synthesis: an
argument across records, a calculation, or anything the archive does not hold.
Every answer is labelled with its origin — *GRAVERSE Knowledge*, *Saved
answer* or *AI-assisted*.

### A 3D assistant identity

The assistant has a real 3D presence: **the GRAVERSE Astrolabe**, a warm
faceted core inside a translucent shell, crossed by two orbital rings and
surrounded by a slow bloom. It is drawn with the project's own Three.js stack
and appears in three places — the launcher, the console header and the empty
conversation state — as **one WebGL context**, projected into the page with
drei's `<View>`.

It is also cheap: the scene is a lazy chunk, it never opens more than one
context, its render loop only runs while the assistant is in use (0 draw calls
while idle), it pauses on a hidden tab and under reduced motion, and a device
without WebGL keeps an honest CSS mark in the same palette.

### Progressive enhancement as a rule

Every 3D view has an equivalent 2D or textual path: the orrery has an SVG map,
the exhibition hall has a floor plan, a chronology axis, a numbered exhibit
rail, a searchable room and a written record panel, and every playground game
keeps its state, controls, and rewards in ordinary HTML outside the canvas.
Reduced-motion preferences are honoured throughout.

### Local-first personalisation

Academy progress and personal data live in two separate, versioned, validated
`localStorage` records. Both can be exported to JSON and imported; neither
requires an account.

### Honest research documentation

`/research` publishes the method, the source hierarchy, the claim definitions,
the coverage gaps, a changelog, and four explicitly declared limitations.

---

## 6. Technology stack

| Layer | Choice | Version |
| --- | --- | --- |
| Framework | Next.js (App Router) | 14.2.35 |
| UI runtime | React / React DOM | 18.3.1 |
| Language | TypeScript (`strict`) | 5.7.2 |
| Styling | Tailwind CSS | 3.4.19 |
| 3D | three.js | 0.169.0 |
| 3D React | @react-three/fiber | 8.18.0 |
| 3D helpers | @react-three/drei | 9.122.0 |
| Icons | lucide-react | 0.468.0 |
| Validation | zod | 3.24.1 |
| Image processing | sharp | 0.33.5 |
| Browser checks | puppeteer-core | 23.11.1 |
| Accessibility checks | @axe-core/puppeteer | 4.10.2 |
| Runtime | Node.js | ≥ 22 (`.nvmrc` pins `22`) |

No Vite migration, no alternate framework, and no component library. The
project is deliberately dependency-light: the 3D stack is used in exactly three
places, and each has a non-3D equivalent.

---

## 7. Architecture

### Rendering model

Almost every page is a **server component** that reads typed data at build
time. Client components are islands for interaction only: `ExploreExperience`,
`SearchExperience`, `ProgressDashboard`, `LessonQuiz`, `JourneySteps`,
`StatusBoard`, `CompareClient`, `ArtifactActions`, `Simulators`,
`MyUniverseClient`, `RoverBuilder`, `Flashcards`, and the playground games.
WebGL scenes are additionally isolated with `next/dynamic({ ssr: false })` and
mounted only after a WebGL capability probe succeeds.

### Data flow

```
src/data   →  typed datasets (the single source of truth)
src/types  →  shared TypeScript contracts
src/lib    →  provenance, relations, search, progress, status, simulations
src/app    →  routes and server rendering
src/components → UI
```

Nothing in `src/data` is duplicated into components, and nothing in a
component invents a fact.

### Important architectural decisions

- **Derived, not duplicated, mission records** — removes an entire class of
  date and status drift.
- **A typed provenance layer** — the same labels, validator, and source registry
  drive every surface.
- **Experience theming via CSS variables** — the Academy, Museum, and Explorer
  share one shell and one design system; the Academy swaps tokens on
  `<html data-experience="academy">` with a pre-paint script so there is no
  dark flash.
- **Two separate local stores** — Academy progress and personal data use
  different keys and different validators, so importing one cannot corrupt the
  other.
- **A build-gating validator** — `npm run validate` fails the build on any
  schema, referential-integrity, or provenance error.

These decisions are recorded in `docs/adr/`.

### Public routes

```
/                              three-door onboarding
/academy                       Academy home
/academy/journeys              guided journeys
/academy/journeys/[id]
/academy/lessons               lessons
/academy/lessons/[id]
/academy/articles              long-form reading
/academy/articles/[id]
/academy/glossary              40 terms
/academy/play                  3D Space Playground hub
/academy/play/rocket           Rocket Workshop
/academy/play/moon             Moon Phase Mission
/academy/play/rover            Rover Quest
/academy/build-rover           rover engineering trade-off exercise
/academy/flashcards            study cards
/academy/achievements          badges derived from local activity
/academy/certificate           printable self-issued learning record
/academy/progress              local progress: export / import / reset
/academy/robot-lab             scripted robot guide
/museum                        the collection
/museum/[id]                   artifact detail template
/museum/missions               mission index
/museum/missions/[id]
/museum/agencies               agency index
/museum/agencies/[id]
/mission-control               mission / hardware / communication status board
/engineering                   engineering explainer index
/engineering/[id]
/stories                       curated reading paths
/stories/[id]
/research                      method, sources, coverage, changelog, limits
/simulations                   Mission Experience Lab index
/simulations/[id]
/my-universe                   local favourites, collections, recent records
/compare                       side-by-side artifact comparison
/api/export                    JSON export of the public dataset
/api/ask                       Ask GRAVERSE — grounded answers from free OpenRouter models
/explorer                      timeline / destination / artifact modes
/explorer/solar-system         3D orrery + accessible 2D map
/explorer/bodies               destination index
/explorer/bodies/[id]
/explorer/deep-sky             deep-sky index
/explorer/deep-sky/[id]
/search                        one search across every entity kind
/sources                       complete source registry + methodology
/about                         project, method, and limits
```

Earlier public URLs are preserved and redirected, with query strings carried
through: `/explore → /explorer`, `/kids → /academy`, `/museum/timeline →
/explorer`.

---

## 8. Getting started

### Prerequisites

- **Node.js 22** (the repository pins it in `.nvmrc`; `package.json` requires
  `>= 22`)
- **npm 10+** (ships with Node 22)
- **Google Chrome or Chromium** — only needed for the browser-level checks
  (`test:e2e`, `test:journeys`, `test:links`, `perf`)

### Install and run

```bash
# 1. Use the pinned Node version (if you have nvm)
nvm use

# 2. Install exactly the locked dependencies
npm ci

# 3. Start the development server
npm run dev
```

Open <http://localhost:3000>.

### Production build

```bash
npm run build
npm run start          # http://localhost:3000
```

The production build defines 47 route patterns, which resolve to 172 concrete
routes (35 static routes plus 137 pages generated from `generateStaticParams`).
`/search` is the only route rendered on demand, because its query string is
user-controlled.

### Full verification run

```bash
npm run verify
```

This is the complete gate — typecheck → lint → data validation → data tests →
production build → production server → browser smoke and axe checks → user
journeys → internal link crawl. It builds into `.next-prod` and serves on port
`3100`, so it never overwrites a running `next dev` cache.

> The browser stages need Chrome/Chromium. Set `CHROME_PATH` if it is not found
> automatically.

---

## 9. Environment variables

All environment variables are **optional**. The application runs with none of
them set. Copy [`.env.example`](.env.example) to `.env.local` if you want to
override any of them.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical origin used for Open Graph metadata and absolute URLs. Defaults to `http://localhost:3000`. |
| `CHROME_PATH` | No | Path to a Chrome/Chromium executable used by `test:e2e`, `test:journeys`, `test:links`, and `perf`. The scripts probe common macOS and Linux locations when unset. |
| `GRAVERSE_DIST_DIR` | No | Overrides the Next.js build directory. `npm run verify` sets it to `.next-prod` internally so browser checks never touch a running dev cache. |
| `GRAVERSE_VERIFY_PORT` | No | The port `npm run verify` serves the production build on. Defaults to `3100`; change it when that port is already taken. |
| `OPENROUTER_API_KEY` | No | Server-side key for **Ask GRAVERSE**, the OpenRouter-backed assistant. Read only inside the route handler; never sent to the browser. Without it the assistant reports that it is not configured and the rest of the site is unaffected. |
| `OPENROUTER_MODEL` | No | The model Ask GRAVERSE calls for the questions its local engine cannot answer. Defaults to `openrouter/free`, OpenRouter's free-model router. A pinned model must end in `:free`; anything else is rejected before a request is made. |

`.env.example` is tracked deliberately. Real `.env*` files are ignored, with an
explicit negation so the template can never be swept up by the ignore rules.

### Ask GRAVERSE — the AI space heritage guide

**Ask GRAVERSE** is an in-product assistant that answers questions about the
collection from GRAVERSE's own source-linked records, using OpenRouter's free
models only. It works in English and Arabic, in two modes — a global guide and
a contextual guide for the artifact, mission, lesson, engineering explainer,
simulation, story, destination or agency record the visitor is viewing — and
it always attaches the registered sources behind the record it used.

- **Endpoint** — `POST /api/ask`, a Node route handler over
  `POST https://openrouter.ai/api/v1/chat/completions`.
- **Free models only** — `openrouter/free` by default; a pinned id must end in
  `:free`. There is no paid fallback, no card requirement and no credit
  purchase anywhere in the project.
- **Server-side key** — `OPENROUTER_API_KEY` is never exposed to the browser,
  never logged and never returned in a response.
- **Grounded** — the browser sends an entity id; the server resolves it against
  the real datasets and builds the context. Only registered source links can
  reach the visitor.
- **Two modes** — a contextual guide for the record being viewed and a global
  guide for the collection, switchable from inside the panel.
- **Quota-aware** — server-side throttling, a client cooldown, bounded prompt,
  history and output, a request timeout and no retry loop, all set below
  OpenRouter's published free limits of 20 requests per minute and 50 per day.

Full details — model selection, retrieval, the scientific rules, error
handling, privacy, deployment and known limitations — are in
[`docs/ASK_GRAVERSE.md`](docs/ASK_GRAVERSE.md).


---

## 10. Development commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint via `next lint` (`next/core-web-vitals`) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run validate` | zod schema checks, referential integrity, and provenance validation of the whole dataset |
| `npm run validate:echoes` | Story schema, Arabic/CJK corruption checks, media-manifest and source-registry resolution, and chapter coverage for all 17 stories |
| `npm run test:data` | Data, relation, search, provenance, progress, and localisation tests (Node test runner) |
| `npm run test:echoes` | Story integrity plus cinematic-director tests (one engine, distinct journeys, no dropped narration) |
| `npm run test:ask` | Ask GRAVERSE tests: the free-model rule, retrieval, grounding, throttling and every provider failure mode. The OpenRouter provider is mocked, so no real quota is consumed |
| `npm run test:e2e` | Browser smoke, redirect, and axe checks against a running server |
| `npm run test:journeys` | Drives the real interface in a browser: search, Explorer modes and filters, timeline preview, lesson quiz, progress export/reset, compare, favourites, simulations, Arabic RTL, mobile layout, the no-WebGL fallback, and the Ask GRAVERSE assistant in English, in Arabic and without WebGL |
| `npm run test:links` | Crawls the site and confirms every internal link resolves |
| `npm run verify` | The full gate described above |
| `npm run perf` | Local LCP/CLS/transfer probe against a running production server |

Two standalone asset utilities live in `scripts/` and are run directly with
`node`:

| Script | Purpose |
| --- | --- |
| `node scripts/fetch-images.mjs` | Downloads NASA image assets and writes resized `.webp` derivatives |
| `node scripts/build-gallery-textures.mjs` | Regenerates `public/images/gallery/*.webp` from the record photographs used by the 3D exhibition hall |

---

## 11. Testing and quality checks

The project treats verification as part of the product rather than an
afterthought. The same gate runs locally and in CI.

| Check | Command | What it covers |
| --- | --- | --- |
| Type checking | `npm run typecheck` | TypeScript strict mode across the whole project |
| Linting | `npm run lint` | `next/core-web-vitals` |
| Data validation | `npm run validate` | Unique IDs, zod schemas, citation resolution, claim rules, mission ↔ artifact integrity, relation symmetry, media existence, route generation |
| Echoes validation | `npm run validate:echoes` | Story schema, Arabic quality and CJK-corruption checks over story and ask-local sources, media-manifest resolution, source-registry resolution, chapter coverage (17 stories, 102 chapters, 40 discoveries) |
| Data tests | `npm run test:data` | 21 tests over counts, provenance, derived missions, relation symmetry, search coverage, progress import validation, achievements, and localisation dictionaries |
| Echoes + cinematic tests | `npm run test:echoes` | Story integrity plus cinematic-director tests: opening/finale framing, full chapter coverage, distinct per-story sequences, single model mount, no dropped narration, quiz/video/timeline/challenge attachment |
| Ask GRAVERSE tests | `npm run test:ask` | 81 tests over the free-model rule, the local intelligence engine, grounded retrieval, the scientific rules in the prompt, throttling, every provider failure mode, and the Markdown renderer. The provider is mocked |
| Build | `npm run build` | Production compilation and static generation |
| Smoke + axe | `npm run test:e2e` | 50 routes checked for HTTP status, title, a single `h1`, the `main` landmark, and body length; keyboard assertions; a gameplay and badge-persistence assertion; axe across 38 pages |
| User journeys | `npm run test:journeys` | 30 end-to-end journeys driven in a real browser |
| Link integrity | `npm run test:links` | Every internal link on 40 crawled pages |

### Last recorded local run

Results from `npm run verify` on the commit this README was written for
(2026-11-11). These are **local machine results**, not a claim about a deployed
environment or about field performance.

| Gate | Result |
| --- | --- |
| Data validation | Passed — 33 artifacts, 20 bodies, 8 deep-sky objects, 27 missions, 12 lessons, 4 journeys, 3 playground games, 8 articles, 111 sources, 605 relation edges |
| Data tests | 21 / 21 passed |
| Ask GRAVERSE tests | 81 / 81 passed — the OpenRouter provider is mocked, so no free-tier quota is spent |
| ESLint | No errors and no warnings |
| Typecheck | Passed |
| Production build | Passed |
| Smoke | 50 routes checked, 0 failures |
| axe (WCAG 2.1 A/AA tags) | 0 violations on 38 pages and on the open assistant console; 0 serious or critical |
| User journeys | 30 / 30 passed |
| Internal links | 192 / 192 resolved |

> Echoes stories change faster than the full gate, so they carry their own
> line: `npm run validate:echoes` passed on 2026-11-14 —
> **17 stories, 102 chapters, 40 discoveries**, with every story opening on a
> cinematic plate and closing on a finale.

### Accessibility

Target is **WCAG 2.1 AA**. The implementation provides semantic landmarks, one
`h1` per page, a skip link, visible focus, labelled controls, status cues that
never rely on colour alone, `aria-live` result announcements, reduced-motion
support, a 2D or textual alternative for every 3D and decorative view, and a
right-to-left Arabic interface.

**Known accessibility limitations** are recorded in
[`docs/ACCESSIBILITY.md`](docs/ACCESSIBILITY.md): no screen-reader session was
recorded for this submission, Arabic localisation covers interface chrome rather
than editorial prose, and axe cannot detect every contrast or focus problem
inside a canvas.

---

## 12. Project structure

```
graverse/
├─ app/                        Next.js App Router routes (src/app)
│  ├─ academy/                 Academy: journeys, lessons, articles, playground, progress
│  ├─ museum/                  Museum: artifacts, missions, agencies
│  ├─ explorer/                Explorer: timeline, destinations, deep sky, orrery
│  ├─ stories/                 Space Stories: 17 cinematic mission stories
│  ├─ engineering/ simulations/ mission-control/ research/ my-universe/
│  ├─ compare/ search/ sources/ about/
│  └─ api/export/              JSON dataset endpoint
├─ components/
│  ├─ academy/                 Academy UI, lessons, journeys, quizzes, playground games
│  ├─ artifacts/               Artifact cards, visual, anatomy, actions
│  ├─ ask/                     Ask GRAVERSE: launcher, panel, provider, contextual scope
│  ├─ museum/                  Exhibition hall (3D) and gallery sections
│  ├─ stories/                 Cinematic engine (`cinematic/`), story pages, companion, quizzes, diagrams
│  ├─ explore/ explorer/       Explorer experience and timeline stage
│  ├─ explorer/                Orrery, orbit map, fact grid
│  ├─ three/                   Shared WebGL canvas and scene
│  ├─ ui/                      Badges, source lists, section headings, empty states
│  ├─ layout/                  Header, footer, theme, language and motion toggles
│  ├─ compare/ mission-control/ personal/ search/ simulations/ kids/
├─ data/                       Typed, source-linked datasets (the source of truth)
│  ├─ artifacts/               33 artifact records across seven files
│  ├─ echoes/                  17 cinematic mission stories, media manifests, extra archive frames
│  ├─ space/                   Bodies, deep-sky objects, agencies
│  └─ lessons, journeys, articles, games, engineering, stories, simulations,
│     glossary, sources, relations
├─ lib/                        provenance, status, relations helpers, search index,
│                              progress, personal state, simulations, i18n, ask (AI),
│                              echo cinematic director
├─ types/                      Shared TypeScript contracts
├─ fonts/                      Self-hosted Inter variable font
├─ scripts/                    Validation (incl. echoes), browser checks, perf probe, verify,
│                              story QA (`qa-stories.mjs`), media fetchers, manual OpenRouter check
├─ tests/                      Data, echoes/cinematic, and Ask GRAVERSE test suites
├─ public/images/              NASA imagery, record photographs, gallery textures
└─ docs/                       Architecture, data and provenance, accessibility,
                               performance, demo guide, ADRs, and project analysis
```

---

## 13. Data sources and attribution

All factual content is **normalized from public NASA sources**. The collection
carries 96 registered source records, each with an organization, title, URL,
type, and access date. The live registry is published at `/sources`.

| Source type | Records | Typical use |
| --- | --- | --- |
| `mission-page` | 35 | NASA Science mission overviews |
| `technical-archive` | 31 | NASA NSSDCA spacecraft records |
| `reference` | 29 | Reference pages and agency background |
| `fact-sheet` | 1 | NASA planetary fact sheet |

| Organization | Records |
| --- | --- |
| NASA Science | 51 |
| NASA NSSDCA | 27 |
| NASA | 7 |
| NASA Apollo Lunar Surface Journal | 3 |
| NASA/JPL-Caltech | 1 |
| European Space Agency, JAXA, ISRO, CNSA, Roscosmos, Canadian Space Agency, UK Space Agency | 1 each |

**Imagery.** All photographs are NASA imagery. Each record stores the credit
line, caption, description, and the NASA image-library identifier, and the
interface labels the four artist's concepts as illustrations rather than
photographs. The 3D scenes use labelled schematic geometry built from
primitives; there is no photoreal spacecraft model in the project.

**What is not claimed.** This project is **not** an official NASA website, is
not endorsed or reviewed by NASA, and does not ship an official NASA dataset.
The records were compiled from public NASA pages and archives; the open dataset
endpoint says so in its own metadata. The site footer states the same thing to
every visitor.

---

## 14. Competition information

- **Programme** — NASA International Space Apps Challenge, 2026 edition.
- **Challenge** — *Abandoned but not Forgotten: Storytelling about NASA's
  Discarded Equipment on the Moon and Mars*
  (<https://www.spaceappschallenge.org/2026/challenges/nasas-discarded-equipment-storytelling/>).
- **Categories** — Intermediate and Beginner/Youth.
- **Skills** — Astrophysics, Planets & Moons, Space Exploration.
- **Format** — an interactive web application built with Next.js, React,
  TypeScript, Tailwind CSS, and three.js.

GRAVERSE is a **competition submission**. Where this README describes
limitations — the size of the collection, the snapshot nature of the status
data, the educational nature of the simulators, the partial Arabic
localisation — those limits are part of the submission's honesty, not
oversights.

### Project documentation

| Document | Contents |
| --- | --- |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Rendering model, route model, data layer, theming, 3D strategy, progress storage, verification pipeline |
| [`docs/ASK_GRAVERSE.md`](docs/ASK_GRAVERSE.md) | The OpenRouter assistant: endpoint, free-model selection, retrieval, scientific grounding, quota limits, privacy, deployment |
| [`docs/DATA_AND_PROVENANCE.md`](docs/DATA_AND_PROVENANCE.md) | Claim model, source registry, dataset inventory, validation rules, update procedure |
| [`docs/ACCESSIBILITY.md`](docs/ACCESSIBILITY.md) | Standards, automated checks, manual review, known limitations |
| [`docs/PERFORMANCE.md`](docs/PERFORMANCE.md) | Build characteristics and the local measurement method |
| [`docs/DEMO_GUIDE.md`](docs/DEMO_GUIDE.md) | A judge-facing walkthrough with recorded results and an explicit "do not claim" list |
| [`docs/adr/`](docs/adr) | Architecture decision records |
| [`docs/GRAVERSE_COMPLETE_PROJECT_ANALYSIS_AR.md`](docs/GRAVERSE_COMPLETE_PROJECT_ANALYSIS_AR.md) | Full project analysis, competitive benchmark, and judge-evaluation brief (Arabic) |
| [`docs/GRAVERSE_COMPETITION_BRIEF_AR.md`](docs/GRAVERSE_COMPETITION_BRIEF_AR.md) | Presentation-ready competition briefing (Arabic) |

---

## 15. Contributing

This is a competition project with a curated, source-linked dataset, so
changes are reviewed against the same rules the project holds itself to.

1. **Open an issue first** for anything that changes data, routes, or the
   evidence model. Small fixes can go straight to a pull request.
2. **Keep the evidence model intact.** A new factual field needs a claim label
   and, for confirmed or estimated values, at least one registered source.
   Never invent a date, location, status, dimension, or citation. If a value
   cannot be sourced, label it `unknown` or omit it.
3. **Never merge mission and hardware status.** They are separate fields with
   separate vocabularies, and a change to one is not a change to the other.
4. **Add or update a source record** in `src/data/sources.ts` with the real URL
   and the access date before citing it.
5. **Update the data notes** when sources disagree, and keep the disagreement
   visible instead of silently choosing one value.
6. **Run the full gate** before opening a pull request:

   ```bash
   npm run verify
   ```

7. **Describe changes in plain language** and say which experience or dataset
   the change affects.

### Adding a record

1. Find the primary source and add or reuse an entry in `src/data/sources.ts`.
2. Add the artifact to the appropriate file under `src/data/artifacts/`, using
   the `defineArtifact` and `image` helpers so the schema stays consistent.
3. Give the record both status bands, the original NASA wording for each, and
   at least one `dataNote` if anything is uncertain.
4. Add the record's sources to `sourceIds`, and its sibling records to
   `relatedIds` — the relation graph in `src/data/relations.ts` derives the
   artifact-to-artifact edges from those fields, so no separate link step is
   needed.
5. Run `npm run validate && npm run test:data`, then `npm run verify`.

### Adding an Academy lesson or journey

Lessons and journeys are editorial content in `src/data/lessons.ts` and
`src/data/journeys.ts`. They must cite only registered sources and existing
artifact IDs — the data tests assert both. Keep the age band, the learning
objectives, the quiz questions, and the `tryIt` prompt consistent with the
rest of the band.

---

## 16. License

**No `LICENSE` file has been added to this repository.** The project states
its position in two places, and this README records it rather than inventing a
license:

- **Factual data** is attributed to the registered sources listed in
  `src/data/sources.ts` and published at `/sources`. The dataset endpoint
  states: *"Factual data is attributed to the registered sources."*
- **Editorial text** (the lesson, article, story, and explainer prose written
  for this project) is provided for the NASA Space Apps Challenge project.
- **NASA imagery** is credited per record, with the credit line and the NASA
  image-library identifier stored alongside each asset.

The site footer states the position to every visitor: *"GRAVERSE — a NASA Space
Apps Challenge project. Not an official NASA website."*

Anyone reusing the data or the images should follow the terms of the original
sources. A formal `LICENSE` file is an open item and should be added — with a
deliberate decision about the editorial text — rather than assumed.
