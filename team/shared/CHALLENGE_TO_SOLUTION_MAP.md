# Challenge-to-Solution Map

## Authority

Challenge authority: [NASA Space Apps 2026 challenge page](https://www.spaceappschallenge.org/2026/challenges/nasas-discarded-equipment-storytelling/) and its resolved [2026 challenge page](https://www.spaceappschallenge.org/2026/challenges/abandoned-but-not-forgotten-storytelling-about-nasas-discarded-equipment-on-the-moon-and-mars/).

Implementation authority: the current repository, especially `README.md`, `docs/ARCHITECTURE.md`, `src/data/`, `src/app/`, `src/components/`, `src/lib/`, `tests/`, and `scripts/`.

## Core map

| Official challenge need | GRAVERSE implementation evidence | Value to visitor | Boundary |
|---|---|---|---|
| Tell the story of NASA equipment left across the Solar System | 30 `Artifact` records in `src/data/artifacts/`; Museum route family | A visitor can understand one machine from purpose to fate | Curated finite collection, not complete inventory |
| Introduce school-age space enthusiasts | 3 Academy age bands, 4 journeys, 12 lessons, 24 quiz questions, 3 games | Guided entry points and age-aware language | Design intent is not measured learning impact |
| Explain hardware | `HardwareType`, technical details, recorded anatomy, media, engineering links | The visitor sees that equipment has a purpose and design | Anatomy is a schematic reading aid, not a reconstruction |
| Explain science made possible | `scientificContributions`, Museum science, Engineering Lab, linked lessons | Hardware is connected to discoveries and engineering learning | Each claim still needs source review |
| Make history discoverable | Explorer timeline, destination, artifact modes; 118 recorded mission events in docs | Visitors can follow time, place, or object | Timeline covers the dataset, not all space history |
| Preserve accuracy | `src/data/sources.ts`, provenance types/helpers, validator, `/sources` | Evidence and uncertainty are visible | Source linkage does not eliminate interpretation risk |
| Show varied equipment condition | Mission/hardware status unions, Mission Control, original wording | “Mission ended” is not equated with “object gone” | Communication label is derived, not live telemetry |
| Make the experience engaging | Academy games, Museum hall, Explorer orrery, stories, simulations | Multiple modes support curiosity | 3D is optional and decorative/approximate where labelled |

## Product additions, not challenge requirements

Arabic interface chrome and RTL; local progress and export/import; My Universe; Compare; Search across 14 record kinds; eight simulations; relation graph; 3D exhibition hall; CI/browser checks. Present these as GRAVERSE choices that support the challenge, not as requirements from NASA.

## Five-question examples

### Mission versus hardware status

**What?** Two status fields and a derived communication label.

**Why?** A mission can end while physical hardware remains, and no contact does not prove destruction.

**How?** `MissionStatus` and `HardwareStatus` in `src/types/artifact.ts`; `deriveCommunicationStatus` in `src/lib/mission-control.ts`; Mission Control UI.

**Evidence?** `/mission-control`, `src/app/mission-control/page.tsx`, artifact detail page, `tests/data.test.ts`.

**Limitation?** It is a recorded snapshot, not telemetry.

### One dataset, three doors

**What?** Academy, Museum, Explorer use the same artifact records.

**Why?** Different audiences need guided learning, narrative, or investigation.

**How?** Shared `src/data/artifacts` and linked IDs; routes/components under `src/app` and `src/components`.

**Evidence?** Open a lesson, follow its artifact link to Museum, then use Explorer.

**Limitation?** Reuse does not prove all paths are equally effective for every learner.

