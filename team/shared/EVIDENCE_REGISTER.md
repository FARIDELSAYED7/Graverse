# Evidence Register

Use this as the team’s claim ledger. Add a row before adding a claim to a pitch or report. Verification labels: **Verified implementation**, **Official scientific fact**, **External research**, **Interpretation**, **Unverified**, **Known limitation**.

| Claim | Evidence | Repository path | External source | Status | Owner |
|---|---|---|---|---|---|
| GRAVERSE has three core experiences | README table and route families | `README.md`, `src/app/academy`, `src/app/museum`, `src/app/explorer` | — | Verified implementation | Founder |
| Artifact records use separate mission/hardware statuses | Type unions and UI | `src/types/artifact.ts`, `src/app/mission-control/page.tsx` | NASA mission records in source registry | Verified implementation | Founder + Member 1 |
| Mission records are derived from artifacts | Mission module and ADR | `src/data/missions.ts`, `docs/adr/0002-derived-missions.md` | — | Verified implementation | Founder |
| Sources must resolve | Validator and data test | `scripts/validate-data.ts`, `tests/data.test.ts` | — | Verified implementation | Founder + Member 1 |
| Academy has 12 lessons and 4 journeys | Data files and tests | `src/data/lessons.ts`, `src/data/journeys.ts` | — | Verified implementation | Member 2 |
| Arabic interface is partial | i18n comments/docs | `src/lib/i18n.ts`, `docs/ACCESSIBILITY.md` | — | Known limitation | Member 3 |
| 3D has accessible alternatives | Docs and components | `docs/ACCESSIBILITY.md`, `src/components/explorer/OrbitMap.tsx` | — | Verified implementation | Founder + Member 3 |
| Simulators are approximations | UI copy and definitions | `src/app/simulations/page.tsx`, `src/data/simulations.ts` | — | Verified implementation | Member 2 + Founder |
| Challenge asks for storytelling about discarded equipment | Official statement | — | NASA Space Apps challenge URL | Official challenge fact | Member 4 |
| NASA endorsement | No evidence; do not claim | — | — | Known limitation / prohibited claim | All |
| Educational effectiveness | No controlled study in repo | — | Add peer-reviewed source only if making theory claim | Unverified | Member 2 |
| Competitor lacks a feature | Must be checked per official source | — | Official competitor URL and access date | Unverified until checked | Member 4 |
| 30 artifacts exist | Dataset index and test | `src/data/artifacts/index.ts`, `tests/data.test.ts` | — | Verified implementation | Founder |
| Local progress is not cloud sync | Personal/progress helpers and UI copy | `src/lib/progress.ts`, `src/lib/personal.ts` | — | Verified implementation | Founder |

## Evidence rules

- Repository paths prove implementation, not scientific truth.
- An external source URL proves what that source says, not necessarily the team’s interpretation.
- A recorded test result must include run date and environment.
- A planned user study is not a completed study.
- If a row cannot be verified, move it to `OPEN_QUESTIONS.md` and remove it from the pitch.

