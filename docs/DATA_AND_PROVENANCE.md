# Data and provenance

## The rule

If a public source does not establish a value, GRAVERSE does not show a value.
It shows **Unknown**. Dates, locations, statuses, distances, findings and source
references are never invented, rounded up into false precision, or inferred from
a plausible-looking pattern.

## Claim model

| Label | Meaning | Requirement |
| --- | --- | --- |
| **Confirmed** | Directly stated by a primary source. | At least one registered source ID. |
| **Estimated** | A range, approximation or model-derived value from a source. | At least one registered source ID. |
| **Simulated** | Computed by GRAVERSE from published parameters. Not an observation. | A parameters/source note. |
| **Unknown** | No primary source in the record establishes this value. | No fabricated value. |

The labels and descriptions live in `src/lib/provenance.ts` and are rendered by
`ClaimBadge` / `ClaimLegend`, so the same wording appears on artifact, body,
deep-sky, mission, agency and source pages.

`isValidClaim()` in `src/lib/provenance.ts` is the single predicate used by both
the test suite and the build-time validator.

## Source registry

`src/data/sources.ts` holds 96 records. Each record has:

```ts
{
  id: "SRC-…",
  title: string,
  organization: string,
  url: string,
  type: "nasa-mission" | "nasa-science" | "nasa-data" | …,
  accessedAt: "2026-11-10",
  notes?: string
}
```

The live registry is rendered at `/sources`, grouped by source type, with access
dates and outbound links. Source IDs are referenced from artifacts, missions,
bodies, deep-sky objects, agencies, lessons, journeys and articles.

### Main source families

- NASA NSSDCA mission and spacecraft pages.
- NASA Science solar-system and deep-sky pages.
- NASA mission project pages (JPL, Goddard, Langley, etc.).
- NASA technical reports and mission press kits where a hardware detail needs
  one.
- Agency pages for ESA, JAXA and other operators represented in the collection.

The exact title, URL and access date for every one is in `/sources`; this
document does not duplicate the list because duplication is how registries drift.

## Datasets

| Dataset | File(s) | Count | Notes |
| --- | --- | --- | --- |
| Artifacts | `src/data/artifacts/*` | 30 | Museum objects with mission and hardware status kept separate |
| Bodies | `src/data/space/bodies.ts` | 20 | Sun, planets, dwarf planets, featured moons |
| Deep sky | `src/data/space/deep-sky.ts` | 8 | Curated nebulae, galaxies and remnants |
| Missions | `src/data/missions.ts` | 24 | Derived from artifact records |
| Agencies | `src/data/space/agencies.ts` | 8 | Linked via mission-derived `agencyId` |
| Lessons | `src/data/lessons.ts` | 12 | Three age bands |
| Journeys | `src/data/journeys.ts` | 4 | First Flight, Moon Detectives, Mission Engineer, Rock to Rover |
| Articles | `src/data/articles.ts` | 8 | Long-form Academy reading |
| Glossary | `src/data/glossary.ts` | 40 | Plain-language definitions |
| Sources | `src/data/sources.ts` | 96 | Registry |
| Relations | `src/data/relations.ts` | 581 directed edges | Symmetric inverses |

Counts are ceilings that were deliberately kept small. A smaller, checked set is
more useful than a large unchecked one.

## Validation

`npm run validate` runs `scripts/validate-data.ts`:

1. unique IDs per dataset;
2. zod schema checks for every record type;
3. every source citation resolves;
4. confirmed/estimated facts cite at least one source;
5. simulated facts carry a note or source;
6. mission artifact IDs exist;
7. relation targets exist and inverses are present;
8. route data (static params) can be generated.

`npm run test:data` adds assertions for counts, citation resolution, derived
missions, relation symmetry, claim validation, search coverage, the experience
resolver and progress import validation.

The validator fails the build gate on any error. Warnings are printed but do not
hide missing data.

## Updating a record

1. Find the primary source first. Add or reuse an entry in `sources.ts` with the
   URL and access date.
2. Edit the record. Use the source's own wording for status where possible; keep
   the GRAVERSE status band separate.
3. Add a claim label to every new factual field. If you cannot source it, label
   it `unknown` or omit the field.
4. Run `npm run validate && npm run test:data`.
5. Run `npm run verify` before shipping.

## Uncertainty notes

Artifact records carry `dataNotes` for fields where sources disagree, where a
location is only known to a region, or where a status changed after the mission
ended. These notes are rendered next to the sources, not buried in metadata.

## Imagery and models

- Real imagery is used only where the record can name its source and credit.
- Illustrations are flagged with `isIllustration` and labelled in the UI.
- Bodies and deep-sky objects use schematic gradients, explicitly labelled
  "Schematic, not a photo" / "no telescope image is included".
- There are no spacecraft 3D models. The only 3D view is the schematic orrery.
- Missing media is shown as a deliberate "no image" state, not replaced with a
  generated asset.
