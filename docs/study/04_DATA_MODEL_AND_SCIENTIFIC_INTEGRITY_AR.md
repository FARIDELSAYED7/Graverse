# GRAVERSE — نموذج البيانات والنزاهة العلمية (Data Model & Scientific Integrity)

> **الملف (04)**. الأهمّ (challenge requires accuracy).

---

## 1. الكيانات (Entities)

من `src/types/*` و`docs/DATA_AND_PROVENANCE.md`:

| الكيان | الملف | العدد | الوصف |
|---|---|---|---|
| Artifact | `types/artifact.ts` | 30 | قطعة عتاد (museum object) |
| Mission (derived) | `data/missions.ts` | 24 | مشتقة من artifacts |
| Body (solar system) | `types/space.ts` / `data/space/bodies.ts` | 20 | Sun, planets, dwarf planets, featured moons |
| Deep sky | `data/space/deep-sky.ts` | 8 | nebulae, galaxies, remnants |
| Agency | `data/space/agencies.ts` | 8 | NASA, ESA, JAXA, etc. |
| Lesson | `types/academy.ts` / `data/lessons.ts` | 12 | 3 age bands |
| Journey | `data/journeys.ts` | 4 | First Flight, Moon Detectives, Mission Engineer, Rock to Rover |
| Article | `data/articles.ts` | 8 | long-form |
| Engineering | `data/engineering.ts` | 7 | explainers |
| Story | `data/stories.ts` | 8 | curated reading paths (no new claims) |
| Simulation | `data/simulations.ts` | 8 | definitions + approximation notes |
| Research | `data/research.ts` | 7 sections | method, coverage, changelog, API |
| Glossary | `data/glossary.ts` | 40 | terms |
| Source | `data/sources.ts` | 96 | registry |
| Game (playground) | `data/games.ts` | 3 | rocket, moon, rover |
| Relations | `data/relations.ts` | 581 directed edges | bidirectional graph |

---

## 2. Artifact — الحقل canonical (src/types/artifact.ts)

الأقسام (من interface):

1. **Identity:** `id`, `name`, `alternateNames?`.
2. **Mission/program:** `missionName`, `programName`.
3. **Destination:** `destination` (string), `destinationGroup` (`moon`/`mars`/`deep-space`).
4. **Type:** `hardwareType` (`rover`/`lander`/`orbiter`/`probe`/`instrument`/`surface-equipment`/`aircraft`).
5. **Description:** `shortDescription`, `overview`, `scientificPurpose`.
6. **Status:** `missionStatus` (MissionStatus), `missionStatusOriginal` (string, required), `hardwareStatus` (HardwareStatus), `hardwareStatusOriginal` (string, required).
7. **Dates:** `launchDate?`, `arrivalDate?`, `missionEndDate?`, `lastContactDate?` (YYYY/YYYY-MM/YYYY-MM-DD).
8. **Events:** `primaryMilestone` (MissionEvent), `timelineEvents` (MissionEvent[] min 1).
9. **Contributions:** `scientificContributions` (title, summary, kind: science/engineering) min 1.
10. **Fate/location:** `fate`, `location` (body, locationName, precision: exact/approximate/region/unknown, note?).
11. **Technical:** `technicalDetails` (label/value pairs).
12. **Media:** `media?` (ArtifactMedia) — optional; missing media = absent, never fabricated.
13. **Relations:** `relatedIds` (string[]).
14. **Sources:** `sourceIds` (string[] min 1).
15. **Meta:** `lastVerified` (ISO date), `dataNotes` (string[]).

### MissionEvent (src/types/artifact.ts)
`id`, `type` (EventType), `date`, `datePrecision` (day/month/year), `dateLabel`, `label`, `description`, `sourceIds` (min 1).

---

## 3. Identifiers

- Artifact id: kebab-case slug (e.g. `apollo-11-lm-descent-stage`, `apollo-11-lrrr`).
- Source id: `SRC-…` (e.g. `SRC-CURIOSITY`).
- Mission id: derived slug from mission name.
- Body id: slug (e.g. `mars`).
- Lesson/journey/article ids: slug.
- All IDs unique within dataset (validated by `scripts/validate-data.ts` + `tests/data.test.ts`).

---

## 4. Relationships

- **Within artifact:** `relatedIds` (artifact↔artifact), `sourceIds` (artifact→source).
- **Derived missions:** `missions.ts` groups artifacts by `missionName`, takes earliest launch date, unions source IDs + objectives/achievements, normalises status band, links agency via mission-level mapping.
- **Relation graph (`relations.ts`):** indexes every entity as `kind:id`, emits directed edges with inverses for: `mission-of`/`mission-artifact`, `located-on`/`artifact-location`, `parent-body`/`child-body`, `operated-by`/`agency-mission`, `related`, `featured-in`, `includes`, `authored-for`. Data test asserts symmetry + target resolution. Detail pages use `getRelations()`.

---

## 5. Mission Status vs Hardware Status (CRITICAL)

**Two different questions** (from `types/artifact.ts` and `docs/GRAVERSE_COMPETITION_BRIEF_AR.md` §4):

| | Mission status | Hardware status |
|---|---|---|
| Question | "Did the mission achieve its objectives?" | "What is the physical object doing now?" |
| Values | planned, ongoing, completed, ended, lost-contact, unknown | operating, inactive, no-longer-communicating, impacted, destroyed, still-traveling, unknown |
| Example (apollo-11-lrrr) | completed (mission ended 1969) | operating (still working today) |

**Why separate?** Treating them as the same produces historically incorrect info. E.g.:
- `ranger-7`: mission succeeded, then **impacted deliberately** (hardware outcome, not mission failure). `dataNotes`: "'Impacted' describes the hardware outcome, not a mission failure".
- `cassini`: mission ended by controlled decision.
- `insight`: lost contact (not confirmed destruction).
- `apollo-15-lunar-rover`: was battery+radio (not passive) — note: brief lists as bug to fix (misclassified passive). Actually `mission-control.ts` PASSIVE_IDS includes `apollo-15-lunar-rover` — flagged in competition brief §9 #6 as scientific error.

**Enforcement (3 levels):**
1. **Type level:** `MissionStatus` and `HardwareStatus` are disjoint unions → impossible to write `missionStatus: "operating"`.
2. **Component level:** `StatusBadge` takes discriminated union `kind: "mission" | "hardware"` → renders "Mission: Completed" / "Hardware: Inactive".
3. **Data level:** `missionStatusOriginal` and `hardwareStatusOriginal` are required (`zod.min(1)`) → NASA's original wording preserved beside normalized band.

**Third axis (derived):** Communication status (`lib/mission-control.ts`: `deriveCommunicationStatus`) — 5 values: communicating, lost-contact, intermittent, not-applicable, unknown. Derived from hardware status + explicit exceptions (passive retroreflectors, descent stages). Always labelled as derived, not telemetry.

---

## 6. Status meanings (only where model supports)

From `types/artifact.ts` unions + `lib/status.ts` + `docs`:
- **Mission:** planned (not yet), ongoing (active), completed (objectives met), ended (concluded, incl. controlled), lost-contact (no signal), unknown (not established).
- **Hardware:** operating (functioning), inactive (not operating, not destroyed), no-longer-communicating (signal lost), impacted (hit surface deliberately/accidentally), destroyed (confirmed destruction), still-traveling (in transit), unknown.
- **Communication (derived):** communicating / lost-contact / intermittent / not-applicable (passive/no radio) / unknown.

**Caution:** `inactive` ≠ `destroyed`; `lost contact` ≠ `destroyed`; `still-traveling` ≠ mission ongoing.

---

## 7. Sources & Provenance

### SourceRecord (`types/artifact.ts`)
`id`, `organization`, `title`, `url`, `type` (mission-page/technical-archive/fact-sheet/reference/news-release/image-record), `accessedAt` (ISO date), `notes?`.

### Claim model (`types/provenance.ts`, `lib/provenance.ts`)
| Label | Meaning | Requirement |
|---|---|---|
| confirmed | Directly stated by primary source | ≥1 registered source ID |
| estimated | Range/approximation/model-derived from source | ≥1 source ID |
| simulated | Computed by GRAVERSE from published parameters | note or source |
| unknown | No primary source establishes value | no fabricated value |

`isValidClaim(claim, existingSourceIds)` is single predicate used by tests + validator.

### Application scope of claim labels
- **Bodies and deep-sky:** facts carry `claim` + `sourceIds` (per `bodyFactSchema`).
- **Artifacts:** claim labels are NOT per-field in artifact schema (flagged in competition brief §9 #10 as gap: "model of claims not applied to artifact fields"). `dataNotes` carry uncertainty instead.

### Validation (`scripts/validate-data.ts`)
1. Unique IDs per dataset.
2. Zod schema checks every record type.
3. Every source citation resolves.
4. Confirmed/estimated facts cite ≥1 source.
5. Simulated facts carry note or source.
6. Mission artifact IDs exist.
7. Relation targets exist + inverses present.
8. Static params can be generated.

`npm run test:data` adds assertions: counts, citation resolution, derived missions, relation symmetry, claim validation, search coverage, experience resolver, progress import validation.

---

## 8. Missing information representation

- Missing fields are `undefined`/optional, never fabricated.
- Media optional → deliberate "no image" state (not generated placeholder).
- Precision field (`exact`/`approximate`/`region`/`unknown`) — note: no artifact uses "exact" (no invented coordinates).
- `dataNotes` array: surfaces disagreements, region-only locations, post-mission status changes. Rendered next to sources.
- UI renders "Unknown"/"Not recorded", never empty coloured chip or plausible placeholder.

---

## 9. Derived vs original source data

- **Original wording preserved:** `missionStatusOriginal`, `hardwareStatusOriginal` (zod min(1)) — NASA's literal text beside normalized band.
- **Derived (labelled):** mission records derived from artifacts (ADR 0002); communication status derived (`mission-control.ts`); freshness derived from `lastVerified`.
- **Simulated:** simulation outputs computed, labelled "Simulated", approximation note shown.
- **Estimated:** ranges/approximations from sources, labelled "Estimated".

Rule: derived/simulated/estimated are always labelled; never presented as observation.

---

## 10. Data flow: dataset → UI

```
src/data/artifacts/*.ts (6 files)
  → src/data/artifacts/index.ts (aggregation: allArtifacts array, Map by id, sorting by primaryMilestone.date, datasetStats)
    → src/types/artifact.ts (contract)
    → src/lib/schemas.ts (Zod validation at build/import)
    → routes: src/app/museum/[id]/page.tsx (server component, data lookup)
      → src/data/relations.ts (getRelations for "Connected records")
      → src/data/sources.ts (resolve sourceIds)
      → src/components/artifacts/* (render)
      → src/components/ui/SourceList, ClaimBadge, StatusBadge
```

For bodies/deep-sky: `src/data/space/*` → `src/app/explorer/bodies/[id]/page.tsx` / `deep-sky/[id]/page.tsx` → FactGrid with ClaimBadge.

---

## 11. Invalid/inconsistent detection

- Build-time: `npm run validate` (scripts/validate-data.ts) fails build on error.
- Tests: `npm run test:data` (21 assertions).
- CI: `.github/workflows/ci.yml` runs validate + test:data + lint + build + smoke + journeys + links.
- Warnings printed but don't hide missing data.

---

## 12. Cross-references

02 (architecture), 03 (file map), 05 (Museum/Explorer use of data), 06 (simulations).