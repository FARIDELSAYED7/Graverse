# GRAVERSE — ربط التحدّي والتميّز (Challenge Mapping & Differentiation)

> **الملف (07)**.

---

## 1. تحليل التحدّي (from official page)

**Title:** *Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars* — NASA Space Apps 2026.

**Summary (official):** "Since the 1960s, NASA has left hardware across the solar system–on the Moon, on Mars, and in deep space. From rovers and instruments that completed their science missions to probes still traveling away from Earth this hardware varies widely in both its purpose and current level of functionality. Your challenge is to tell the story of some or all of this equipment that introduces school-age space enthusiasts to the hardware and the science it made possible."

**Background (official):** school-age enthusiasts often hear only about active missions; opportunity to inspire using rich untold histories; need to know what equipment resides on Moon/Mars/elsewhere and specific missions facilitated; priority = translate complex historical/scientific data into engaging narrative; accuracy important.

**Objectives (official):** create engaging story-driven educational tool/narrative teaching school-age & casual enthusiasts about hardware left on Moon/Mars/elsewhere; what they are, why sent, scientific discoveries made/continue to make. Many formats welcome.

**Potential considerations (official):** age group, accessibility, focus (specific vs broader), perspective.

**Resources tab:** "Resources will be available on Friday, November 13." (not published at analysis date 2026-11-11).

**Categories:** Intermediate, Beginner/Youth. Skills: Astrophysics, Planets & Moons, Space Exploration.

---

## 2. Requirements Traceability Matrix

| Official challenge objective | GRAVERSE response | Experience | Real implementation | Visitor benefit | Evidence | Status |
|---|---|---|---|---|---|---|
| Identify relevant hardware | 30 curated artifacts (rover/lander/orbiter/probe/instrument/surface-equipment/aircraft) | Museum/Explorer | `src/data/artifacts/*`, `types/artifact.ts` HardwareType | Browse by type/destination | validate count 30 | ✅ |
| Explain what equipment is | Identity, type, overview, technical details | Museum | Artifact fields + `ArtifactAnatomy` | Understand object | `types/artifact.ts` | ✅ |
| Explain why sent | `scientificPurpose`, `overview` | Museum/Academy | Artifact fields | Connect to question | source-backed | ✅ |
| Which missions facilitated | `missionName`, `programName`, events, derived mission pages | Museum | `missions.ts` derived | Mission context | ADR 0002, test | ✅ |
| Discoveries made/contributed | `scientificContributions` (science/engineering) | Museum/Academy | Artifact fields | Science value | sourceIds | ✅ |
| Historical/scientific importance | fate, location, events with precision, dataNotes | Museum | Artifact fields | Legacy | sources | ✅ |
| Transform complex info into engaging storytelling | Academy (lessons/journeys), Stories, Explorer timeline, 3D | Academy/Museum/Explorer/Stories | routes + components | Engagement | demo guide | ✅ |
| Connect engineering to science | Engineering surface, technicalDetails, contributions kind | Engineering/Museum | `data/engineering.ts` | Engineering literacy | artifacts | ✅ |
| School-age audience | Age bands 5-7/8-9/10-12, journeys, quizzes, playground | Academy | `data/lessons.ts`, `data/journeys.ts`, `data/games.ts` | Age-appropriate | schema ageBand | ✅ |
| Casual enthusiasts | Museum cards, Explorer filters, stories | Museum/Explorer | routes | Low barrier | demo | ✅ |
| Accuracy | Sources, schemas, claim labels, original wording preserved | All | `provenance.ts`, `schemas.ts`, `validate-data.ts` | Trust | 96 sources | ✅ |
| Creative format | Web app + 3D + simulations + playground | All | Next.js app | Interactive | build | ✅ |

---

## 3. Direct requirements vs GRAVERSE additions

**Direct (from official):** identify hardware; explain what/why; missions; discoveries; historical/scientific importance; engaging storytelling; connect engineering to science; school-age + casual audience; accuracy.

**GRAVERSE additions (not required, but support):**
- Fصل mission status / hardware status (semantic, not required).
- Derived communication status (third axis).
- Claim labels (confirmed/estimated/simulated/unknown) — applied to bodies/deep-sky; partial on artifacts.
- Local progress (no accounts).
- 3D playground (toys, not required).
- Simulations (8 educational models).
- My Universe (personal collection).
- Arabic interface (i18n).
- Research Archive (method/limits).
- Compare, Export.

**Missing/unverified:**
- Not a complete inventory (curated 30).
- No live telemetry.
- No measured educational outcomes.
- No screen-reader session (only automated axe).
- Claim model not per-field on artifacts.
- 4 dead NASA links (2 in educational pages) — brief.
- 3 simulation bugs (S01, S05, S06 dead knob) — brief.
- `/api/export?dataset=` broken in production build (force-static) — brief.

---

## 4. How Academy/Museum/Explorer form a coherent system

- **Shared data model:** all read `src/data` (single source of truth) → consistency.
- **Shared components:** ArtifactCard, StatusBadge, ClaimBadge, SourceList.
- **Shared tokens:** same Tailwind identity; experience theming via CSS vars.
- **Cross-links:** Museum ↔ Explorer (deep links), Academy lessons cite same sources, Explorer bodies link to artifacts.
- **Shared progress/personal:** Academy progress + My Universe.
- **One identity, three reading modes:** Learn (sequence+feedback), Understand (identity+context+source), Discover (query+compare+spatial).

---

## 5. Competitive differentiation (honest)

**Examined (2026-11-11):** NASA Science, NASA NSSDCA, NASA Eyes (+DSN Now, Mars Relay), NASA Solar System, NASA Learning Resources, ESA Education, Smithsonian NASM, NASA Image and Video Library.

| Dimension | NASA Science | NSSDCA | NASA Eyes | GRAVERSE |
|---|---|---|---|---|
| Mission status ⇄ Hardware status | ❌ single badge | ❌ | ❌ | ✅ structurally separated |
| Cross-mission timeline | ❌ | ❌ | ✅ 150+ missions | ✅ 118 events / 30 artifacts |
| Per-field claim labeling | ❌ | ❌ | ❌ | ⚠️ bodies/deep-sky only |
| Source registry with access dates | partial | ✅ | ❌ | ✅ 96 sources |
| Age-designed learning layer | ❌ | ❌ | "scrolly" | ✅ 4 journeys + 12 lessons |
| Interactivity | limited | ❌ | strong | strong + varied |
| Open data | ❌ | JSON | ❌ | ✅ `/api/export` |
| 3D | viewer | ❌ | 6 apps | ✅ + 2D alternative each |

**Honest conclusion:** NASA Eyes wins on realism/vitality/temporal breadth. NSSDCA wins on technical depth of single record. ESA wins on teacher resources. **None combines documented record + age-designed learning + temporal/spatial exploration + simulations + open data + transparency.** The combination is the differentiator — not feature count.

**Do not claim:** first, most complete, most accurate, best real-time, NASA-endorsed. Collection deliberately finite; challenge asks for storytelling + accuracy — both GRAVERSE strengths.

---

## 6. Differentiators (5 strongest, defensible)

1. **Semantic separation of mission vs hardware status** (type-level, component-level, data-level) — not just UI.
2. **Same record across three reading modes** (Learn/Understand/Discover) — consistency.
3. **Provenance as part of model + UI** (sources, original wording, claim labels, dataNotes) — not just footer link.
4. **Derived communication status labelled as derived** (not telemetry) + freshness snapshot.
5. **Explicit missing-data states** ("Unknown"/"Not recorded", no fabricated placeholders) + honest limitations section.

---

## 7. Cross-references

01 (product), 04 (data), 08 (theory), 09 (Q&A on differentiation).