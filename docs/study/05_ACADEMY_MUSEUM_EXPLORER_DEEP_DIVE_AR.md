# GRAVERSE — غوص عميق: Academy, Museum, Explorer

> **الملف (05)**.

---

## 1. ACADEMY — LEARN (`/academy`)

### 1.1 Purpose & visitor goal
- **الزائر:** طالب 5–12 (أو معلّم).
- **الهدف:** تعلّم منظّم (sequenced) مع feedback، لا gallery.
- **الwhy:** التحدّي يطلب إدخال school-age enthusiasts إلى العتاد والعلم. Academy = طبقة تعليمية مُصمَّمة بالعمر.

### 1.2 Features
- **Age bands:** 5-7, 8-9, 10-12 (`lessonSchema.ageBand`).
- **Lessons (12):** objectives, sections, keyTerms, tryIt, quiz (prompt/options/correctIndex/explanation), artifactIds, bodyIds, sourceIds, reading minutes, accent.
- **Journeys (4):** First Flight, Moon Detectives, Mission Engineer, Rock to Rover — steps of kinds: lesson/artifact/body/article/challenge, with badge on completion.
- **Articles (8):** long-form reading with sections, related artifacts/bodies.
- **Flashcards:** retrieval practice (client state).
- **Glossary (40 terms):** plain-language definitions.
- **Progress:** `graverse:progress:v1` (lessons completed+score+total, journeys started/completed+steps, games+stars, badges, lastVisited, updatedAt).
- **Achievements:** milestones derived from activity (`lib/achievements.ts`).
- **Certificate:** local, motivational output (`CertificateView`).
- **Build a Rover:** `RoverBuilder` (engineering decisions).
- **Playground (3 games):** Rocket Workshop, Moon Phases, Rover Quest (3D scenes as toys + HTML controls).
- **Robot Lab:** beginner-friendly interactive (`RobotLab`, `RobotAvatar`, `robot-chat`).

### 1.3 Implementation
- Routes: `src/app/academy/*` (see 03).
- `src/app/academy/layout.tsx` renders `AcademyNav` once.
- Pages are Server Components; progress widgets/quizzes/games/builder are client islands.
- Progress hook: `useProgress` → `loadProgress`/`saveProgress`/`validateProgress` (`lib/progress.ts`).
- Import validation: `importedProgressSchema` (Zod) in `schemas.ts`.
- Export: downloads `graverse-progress.json`; reset: inline confirmation.
- Degrades to in-memory store if localStorage unavailable.

### 1.4 Academy Play (3D playground)
Pattern (from `docs/ARCHITECTURE.md` §5):
1. Scene (`RocketScene`/`MoonScene`/`RoverScene`) = separate `next/dynamic` island, `ssr:false`, mounted only after `useWebgl`.
2. All game state/controls/feedback/rewards in ordinary HTML outside canvas → fully playable without WebGL/keyboard.
3. Canvas `aria-hidden`; status changes via `role="status"`.
4. Reduced motion: skips launch animation, stops rover bob, Moon scene no decorative rotation.
5. Models are primitive toys; pages carry "toy — not to scale"; rocket/rover state not reconstructions; rover terrain invented.
6. `GamePageLayout` links back to verified lesson/artifacts/bodies/sources.
7. Source links in play via `AcademySourceLinks`.

Badges: `badge-play-rocket`, `badge-play-moon`, `badge-play-rover` share badge list with journeys; validator asserts unique.

### 1.5 Why Academy is necessary (not just articles)
- **Sequencing:** journeys provide cognitive path (constructivism).
- **Feedback:** quizzes with explanations.
- **Age-appropriateness:** 3 bands.
- **Active:** games + builder.
- **Source-linked:** lessons cite same sources as museum.
- **Local progress:** no account barrier for children.

### 1.6 Limitations
- Content pre-authored, not LMS (no teacher dashboard, no adaptive learning).
- No measured learning outcomes (design intent only).
- Age bands are design classification, not validated pedagogy.
- Playground models are toys, not official reconstructions.

---

## 2. MUSEUM — UNDERSTAND (`/museum`)

### 2.1 Purpose & visitor goal
- **الزائر:** قارئ عام.
- **الهدف:** فهم قطعة كسجل إرث (identity, purpose, timeline, status, fate, location, contributions, sources).
- **الwhy:** التحدّي يطلب "what they are, why sent, missions, discoveries, historical/scientific importance".

### 2.2 Features
- **Museum hub (`/museum`):** destinations + artifacts cards.
- **Artifact detail (`/museum/[id]`):** identity, purpose, timeline (events with precision + sources), mission status + hardware status (separate), fate, location, scientific/engineering contributions, technical details, media, related artifacts, sources, uncertainty notes.
- **Gallery (`GalleryCanvas`/`GalleryStage`/`MuseumGallerySection`):** 3D hall with real NASA images.
- **Missions (`/museum/missions`, `[id]`):** derived mission pages (name, launch date, destination, status, objectives, achievements, artifacts, agency, sources).
- **Agencies (`/museum/agencies`, `[id]`):** 8 agencies with missions/artifacts.
- **Anatomy panel (`ArtifactAnatomy`):** "recorded anatomy" — groups specs already in record; reading aid, not physical layout; labelled schematic non-reconstruction.

### 2.3 How Museum transforms records into exhibition
- **Identity first:** name, type, destination, mission.
- **Narrative sequence:** purpose → journey (events) → science → fate.
- **Status separation:** "Two different questions" section (mission vs hardware) side by side.
- **Provenance:** mission, agency, source count, uncertainty note, original NASA wording.
- **Related records:** via `getRelations()` (Connected records) instead of bespoke link lists.
- **Missing media:** deliberate "no image" state.

### 2.4 Complete real example
Pick `apollo-11-lm-descent-stage` (demo guide). Trace:
- URL `/museum/apollo-11-lm-descent-stage` → route `src/app/museum/[id]/page.tsx`.
- Data lookup in `allArtifacts` (from `src/data/artifacts/index.ts`).
- Fields rendered: id, name, missionName, programName, destination, hardwareType, descriptions, statuses (mission completed / hardware inactive), dates, events with sourceIds, contributions, fate, location, technicalDetails, media, relatedIds, sourceIds, lastVerified, dataNotes.
- Sources resolved from `src/data/sources.ts`.
- Related via `relations.ts`.
Trace every displayed piece back to `Artifact` interface + source records.

### 2.5 Limitations
- Images only where source+credit named; missing media shown as no-image.
- No photoreal 3D spacecraft models.
- Claims not per-field on artifacts (dataNotes carry uncertainty).

---

## 3. EXPLORER — DISCOVER (`/explorer`)

### 3.1 Purpose & visitor goal
- **الزائر:** باحث/فضولي.
- **الهدف:** استعلام زمني/مكاني (query-based discovery), not passive reading.
- **الwhy:** التحدّي يطلب "transform complex info into engaging storytelling" + "connecting engineering to science".

### 3.2 Features
- **Three modes:** Timeline, By destination, By artifact (`ExploreExperience`).
- **Filters (6):** destination, hardwareType, missionStatus, hardwareStatus, decade, eventType (`ArtifactFilters` in `lib/explore.ts`).
- **Scope:** primary (one event per artifact) or all (every timeline event).
- **Sort:** oldest/newest/name (`SortOption`).
- **Search:** in-page scoring (`searchScore`) + global `/search`.
- **Preview panel:** selected artifact preview.
- **Deep links:** query params in URL (`/explorer?...`), shareable, back/forward works.
- **List view:** accessible alternative to visual timeline.
- **3D orrery:** `/explorer/solar-system` (decorative, aria-hidden, "Schematic — not to scale") + accessible SVG `OrbitMap` with real links + plain destination list.
- **Deep sky:** `/explorer/deep-sky` + `[id]` (8 objects).
- **Bodies:** `/explorer/bodies` + `[id]` (20 bodies) with confirmed/estimated/unknown badges.
- **Mobile:** responsive; mobile menu keyboard-operable.

### 3.3 Implementation
- Route: `src/app/explorer/page.tsx` parses `searchParams`; mirrors filter state back to URL via `ExploreExperience`.
- Logic: `src/lib/explore.ts`:
  - `searchScore`: weighted (name exact 120 / starts 80 / includes 55; mission 35; aliases 30; destination/type 20; haystack 10; term must match or 0).
  - `searchArtifacts`: filter score>0, sort by score desc then date.
  - `matchesFilters`/`filterArtifacts`: AND of all filters.
  - `sortArtifacts`: oldest/newest/name.
  - `timelineEntries`: primary or all events, filter by eventType on individual events, sort by date then name.
  - `countByDestination`, `countByHardwareType`, `getDecadeOptions`, `getFilterOptions`, `activeFilterCount`, `hasActiveFilters`.
- Decade derived via `decadeOf` from `lib/format.ts`.

### 3.4 Why Explorer is not just a visual timeline
- **Query-driven:** filters + sort + scope + search, all in URL.
- **Cross-entity:** bodies + deep sky + artifacts.
- **Claim labels:** confirmed/estimated/unknown on facts.
- **Progressive enhancement:** 3D decorative, 2D accessible.
- **Connects to Museum:** same records, deep links to `/museum/[id]`.

### 3.5 Complete visitor journey (example)
1. Open `/explorer`.
2. Switch to Timeline mode.
3. Filter destination=mars, decade=2010s.
4. URL becomes `/explorer?destination=mars&decade=2010s...`.
5. Preview panel shows selected artifact.
6. Click → `/museum/curiosity`.
7. Open source list → `/sources`.
8. Back to Explorer → switch to By destination → Mars → list view (accessible).
9. Open `/explorer/solar-system` → drag orrery (decorative) → use 2D map links.

---

## 4. Cross-experience coherence

- **Shared data model:** all three read `src/data` (single source of truth).
- **Shared components:** `ArtifactCard`, `StatusBadge`, `ClaimBadge`, `SourceList`.
- **Shared styling tokens:** same Tailwind tokens, experience theming via CSS vars.
- **Shared progress/personal:** Academy progress + My Universe.
- **Navigation:** `ExperienceSwitcher` in header.

---

## 5. Cross-references

04 (data), 06 (supporting), 10 (demo script).