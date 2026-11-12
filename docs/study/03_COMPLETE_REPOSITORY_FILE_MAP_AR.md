# GRAVERSE — خريطة الملفات والمجلدات (Complete Repository File Map)

> **الملف (03)**. مرجع للعثور على تنفيذ أي ميزة.

---

## 1. جذر المستودع (Root)

| Path | Responsibility |
|---|---|
| `package.json` | scripts, dependencies, engines (node>=22) |
| `package-lock.json` | Reproducible installs (npm ci) |
| `next.config.mjs` | distDir env override, image formats, redirects |
| `tsconfig.json` | strict, path alias `@/*`→`./src/*`, Next plugin |
| `tailwind.config.ts` | Design tokens (CSS vars, brand colors, shadows, keyframes) |
| `postcss.config.mjs` | Tailwind + autoprefixer |
| `.eslintrc.json` | next/core-web-vitals; no-img-element off |
| `.env.example` | NEXT_PUBLIC_SITE_URL, CHROME_PATH, GRAVERSE_DIST_DIR |
| `.nvmrc` | 22 |
| `.gitignore` | ignore node_modules, .next, etc. |
| `.github/workflows/ci.yml` | CI pipeline |
| `README.md` | Project documentation (rewritten) |

---

## 2. src/app (Routes)

### Root & shared
- `src/app/layout.tsx` — root layout: Inter font, theme pre-paint script, header/footer, locale, experience theme.
- `src/app/page.tsx` — homepage: three doors + counts + featured record.
- `src/app/globals.css` — CSS variables (dark default, academy light override), base styles, RTL helpers.
- `src/app/loading.tsx`, `error.tsx`, `not-found.tsx` — route-level UX.
- `src/app/icon.svg` — favicon.

### Academy (`src/app/academy/`)
- `page.tsx` — Academy hub (age bands, journeys).
- `layout.tsx` — renders `AcademyNav` once.
- `achievements/page.tsx` — achievements view.
- `articles/page.tsx`, `articles/[id]/page.tsx` — long-form reading.
- `build-rover/page.tsx` — rover builder.
- `certificate/page.tsx` — certificate view.
- `flashcards/page.tsx` — flashcards.
- `glossary/page.tsx` — glossary.
- `journeys/page.tsx`, `journeys/[id]/page.tsx` — journeys.
- `lessons/page.tsx`, `lessons/[id]/page.tsx` — lessons.
- `play/page.tsx` — playground hub.
- `play/moon/page.tsx`, `play/rocket/page.tsx`, `play/rover/page.tsx` — games.
- `progress/page.tsx` — progress dashboard.
- `robot-lab/page.tsx` — robot lab.

### Museum (`src/app/museum/`)
- `page.tsx` — museum hub.
- `[id]/page.tsx` — artifact detail.
- `agencies/page.tsx`, `agencies/[id]/page.tsx` — agencies.
- `missions/page.tsx`, `missions/[id]/page.tsx` — missions (derived).

### Explorer (`src/app/explorer/`)
- `page.tsx` — explorer (Timeline/Destination/Artifact modes, filters).
- `bodies/page.tsx`, `bodies/[id]/page.tsx` — solar system bodies.
- `deep-sky/page.tsx`, `deep-sky/[id]/page.tsx` — deep sky.
- `solar-system/page.tsx` — orrery + 2D map.

### Supporting
- `src/app/mission-control/page.tsx`
- `src/app/engineering/page.tsx`, `engineering/[id]/page.tsx`
- `src/app/stories/page.tsx`, `stories/[id]/page.tsx`
- `src/app/research/page.tsx`
- `src/app/simulations/page.tsx`, `simulations/[id]/page.tsx`
- `src/app/compare/page.tsx`
- `src/app/my-universe/page.tsx`
- `src/app/search/page.tsx`
- `src/app/sources/page.tsx`
- `src/app/about/page.tsx`

### API
- `src/app/api/export/route.ts` — JSON export.

---

## 3. src/components

### layout/
- `ExperienceSwitcher.tsx` — switcher between experiences.
- `ExperienceTheme.tsx` — keeps `dataset.experience` in sync on client nav.
- `LanguageToggle.tsx` — sets locale cookie + refresh.
- `MotionToggle.tsx` — full/reduced motion preference.
- `SiteFooter.tsx`, `SiteHeader.tsx` — shared shell.

### artifacts/
- `ArtifactActions.tsx` — favourite/recent actions.
- `ArtifactAnatomy.tsx` — recorded anatomy panel (schematic non-reconstruction).
- `ArtifactCard.tsx`, `ArtifactListRow.tsx` — cards/rows.
- `ArtifactVisual.tsx` — media display (no fabricated placeholder).
- `BackButton.tsx`.

### academy/
- `AcademyArtifactCard.tsx`, `AcademyNav.tsx`, `AcademySourceLinks.tsx`.
- `AchievementsView.tsx`, `AgeBandMetaGrid.tsx`, `ArticleCard.tsx`.
- `CertificateView.tsx`, `Flashcards.tsx`.
- `JourneyCard.tsx`, `JourneySteps.tsx`.
- `LessonCard.tsx`, `LessonQuiz.tsx`.
- `ProgressDashboard.tsx`, `ProgressSnapshot.tsx`.
- `RoverBuilder.tsx`.

### academy/play/
- `GamePageLayout.tsx`, `GameReward.tsx`, `MoonPhaseDisk.tsx`, `MoonPhases.tsx`.
- `MoonScene.tsx`, `RocketScene.tsx`, `RoverMap.tsx`, `RoverQuest.tsx`, `RoverScene.tsx`.
- `PlayBadgeShelf.tsx`, `PlayGameGrid.tsx`, `StageFrame.tsx`, `use-webgl.ts`.

### museum/
- `GalleryCanvas.tsx`, `GalleryStage.tsx`, `MuseumGallerySection.tsx`.

### explorer/
- `FactGrid.tsx`, `OrbitMap.tsx`, `Orrery3D.tsx`, `OrreryScene.tsx`.

### kids/
- `JuniorArtifactCard.tsx`, `JuniorQuiz.tsx`, `RobotAvatar.tsx`, `RobotLab.tsx`.

### mission-control/
- `StatusBoard.tsx`.

### compare/
- `CompareClient.tsx`.

### personal/
- `MyUniverseClient.tsx`.

### search/
- `SearchExperience.tsx`.

### simulations/
- `Simulators.tsx` — 8 simulator implementations.

### three/
- `SpaceCanvas.tsx`, `SpaceScene.tsx`.

### ui/
- `ApproximationNote.tsx`, `ClaimBadge.tsx`, `CommunicationBadge.tsx`.
- `EmptyState.tsx`, `Reveal.tsx`, `SectionHeading.tsx`.
- `SourceList.tsx`, `StatusBadge.tsx`.

### brand/
- `Logo.tsx`.

---

## 4. src/data

- `src/data/artifacts/` — 6 source files (`moon-a`, `moon-b`, `mars-a`, `mars-b`, `deep-a`, `deep-b`) + `helpers.ts` + `index.ts` (aggregation, Map, sorting, stats).
- `src/data/space/` — `agencies.ts`, `bodies.ts`, `deep-sky.ts`.
- `src/data/missions.ts` — derived missions (groups artifacts).
- `src/data/relations.ts` — bidirectional relation graph (581 edges).
- `src/data/sources.ts` — 96 sources.
- `src/data/lessons.ts` — 12 lessons.
- `src/data/journeys.ts` — 4 journeys.
- `src/data/articles.ts` — 8 articles.
- `src/data/engineering.ts` — 7 explainers.
- `src/data/stories.ts` — 8 story collections.
- `src/data/simulations.ts` — 8 simulation definitions.
- `src/data/research.ts` — method/coverage/changelog/API notes.
- `src/data/glossary.ts` — 40 terms.
- `src/data/games.ts` — 3 playground games metadata.
- `src/data/kids.ts` — kids content.

---

## 5. src/lib

- `src/lib/schemas.ts` — Zod schemas (source, media, event, artifact, body, deepSky, lesson, journey, mission, article, agency, playGame, importedProgress).
- `src/lib/provenance.ts` — claim labels/descriptions, `isValidClaim`.
- `src/lib/status.ts` — status labels.
- `src/lib/explore.ts` — search/filter/sort/timeline (see 05).
- `src/lib/mission-control.ts` — communication derivation, freshness, status board, summary.
- `src/lib/progress.ts` — progress load/save/validate/export/reset.
- `src/lib/personal.ts` — personal state (favorites, collections, recent, simulations).
- `src/lib/use-progress.ts`, `src/lib/use-personal.ts` — React hooks.
- `src/lib/search-index.ts` — in-memory index over all datasets.
- `src/lib/simulations.ts` — simulation models + formulas.
- `src/lib/achievements.ts` — badge logic.
- `src/lib/robot.ts`, `src/lib/robot-chat.ts` — robot guide.
- `src/lib/rover-builder.ts`, `src/lib/rover-quest.ts` — rover game rules (pure, testable).
- `src/lib/kids.ts` — kids helpers.
- `src/lib/experience.ts` — experience resolver.
- `src/lib/format.ts` — formatting helpers (decadeOf, etc.).
- `src/lib/cn.ts` — className merge.
- `src/lib/i18n.ts` — locale dictionaries, `t()`.
- `src/lib/locale.ts` — cookie read, lang/dir.
- `src/lib/use-reduced-motion.ts` — reduced motion hook.

---

## 6. src/types

- `src/types/artifact.ts` — Artifact, MissionStatus, HardwareStatus, EventType, SourceRecord, etc.
- `src/types/space.ts` — Body, DeepSky types.
- `src/types/academy.ts` — Lesson, Journey, Article, etc.
- `src/types/progress.ts` — ProgressState.
- `src/types/provenance.ts` — ClaimType.
- `src/types/play.ts` — PlayGame, etc.
- `src/types/kids.ts`, `src/types/gallery.ts`, `src/types/robot.ts`.

---

## 7. tests & scripts

### tests/
- `tests/data.test.ts` — 21 data tests (counts, citation resolution, derived missions, relation symmetry, claim validation, search coverage, experience resolver, progress import).

### scripts/
- `scripts/validate-data.ts` — build-time validator.
- `scripts/smoke.mjs` — 50 routes smoke + redirects + axe + keyboard + gameplay.
- `scripts/journeys.mjs` — 24 user journeys.
- `scripts/link-check.mjs` — internal link crawl.
- `scripts/perf.mjs` — local perf probe.
- `scripts/verify.mjs` — orchestrates all gates.
- `scripts/fetch-images.mjs`, `scripts/build-gallery-textures.mjs` — asset helpers.

---

## 8. public & other

- `public/images/` — local images (jpg + gallery webp).
- `src/fonts/InterVariable.woff2` — local font.
- `docs/` — documentation (architecture, data, accessibility, performance, demo, competition brief, complete analysis, ADRs, study/).
- `.github/workflows/ci.yml` — CI.

---

## 9. How to locate a feature (quick index)

| Feature | Key files |
|---|---|
| Artifact detail | `src/app/museum/[id]/page.tsx`, `src/components/artifacts/*` |
| Explorer filters | `src/lib/explore.ts`, `src/components/explore/ExploreExperience.tsx`, `src/app/explorer/page.tsx` |
| Status/communication | `src/lib/mission-control.ts`, `src/components/mission-control/StatusBoard.tsx` |
| Progress | `src/lib/progress.ts`, `src/lib/use-progress.ts`, `src/components/academy/ProgressDashboard.tsx` |
| Personal (My Universe) | `src/lib/personal.ts`, `src/lib/use-personal.ts`, `src/components/personal/MyUniverseClient.tsx` |
| Search | `src/lib/search-index.ts`, `src/components/search/SearchExperience.tsx` |
| Simulations | `src/data/simulations.ts`, `src/lib/simulations.ts`, `src/components/simulations/Simulators.tsx`, `src/app/simulations/*` |
| 3D orrery | `src/components/explorer/Orrery3D.tsx`, `OrreryScene.tsx` |
| Playground games | `src/components/academy/play/*`, `src/app/academy/play/*` |
| Theming | `tailwind.config.ts`, `src/app/globals.css`, `src/components/layout/ExperienceTheme.tsx` |
| i18n | `src/lib/i18n.ts`, `src/lib/locale.ts`, `src/components/layout/LanguageToggle.tsx` |
| Relations | `src/data/relations.ts` |
| Missions (derived) | `src/data/missions.ts` |

---

## 10. Cross-references

02 (architecture), 04 (data model), 05 (experiences).