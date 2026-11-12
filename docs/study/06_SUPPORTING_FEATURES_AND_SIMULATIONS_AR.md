# GRAVERSE — الأسطح المساندة والمحاكيات (Supporting Features & Simulations)

> **الملف (06)**.

---

## 1. Supporting surfaces

| Surface | Route | Implementation | Value |
|---|---|---|---|
| Mission Control | `/mission-control` | `StatusBoard` + `missionControlSummary`/`statusBoard` (`lib/mission-control.ts`) | لوحة status: mission/hardware/communication/freshness counts, destinations; filter + open record |
| Engineering | `/engineering`, `[id]` | `data/engineering.ts` (7 explainers) linked to artifacts/sources | شرح "لماذا صُمم العتاد" |
| Stories | `/stories`, `[id]` | `data/stories.ts` (8 collections) — curated reading paths, no new claims | سرد |
| Research Archive | `/research` | `data/research.ts` (7 sections): method, coverage, changelog, API notes, honest limitations | شفافية + method |
| Simulations | `/simulations`, `[id]` | `data/simulations.ts` + `lib/simulations.ts` + `components/simulations/Simulators.tsx` | 8 نماذج |
| Compare | `/compare` | `CompareClient` | side-by-side documented values |
| My Universe | `/my-universe` | `MyUniverseClient` + `personal.ts` | favourites, collections, recent, simulations (local) |
| Global Search | `/search` | `SearchExperience` + `search-index.ts` | بحث across artifacts/missions/bodies/deep-sky/lessons/journeys/articles/agencies/glossary/engineering/stories/simulations/research |
| Export | `/api/export` | route.ts | JSON export of one dataset or whole collection |
| Sources | `/sources` | registry (96) grouped by type, access dates, outbound links | provenance |
| About | `/about` | origin/limits | transparency |

---

## 2. Simulators (8) — individual docs

All in `src/data/simulations.ts` (metadata + approximation note) and `src/lib/simulations.ts` (models) and `src/components/simulations/Simulators.tsx` (UI). Each page: `src/app/simulations/[id]/page.tsx`. Completion tracked in `personal.ts` (`recordSimulation`).

### S01 — Mars landing sequence (`landing`)
- **Concept:** EDL (entry, descent, landing): heat shield, parachute, powered descent, touchdown.
- **Inputs:** entry speed (3000-7500 m/s), entry angle (5-30°), heatShield (bool), parachute diameter (0-30 m), deploy altitude (2000-20000 m), retro propellant (0-1200 kg), throttle (0-1), skyCrane (bool), mass (300-3000 kg).
- **Model:** 1D descent, exponential atmosphere (`MARS_SURFACE_DENSITY=0.02`, `MARS_SCALE_HEIGHT=11100`), constant gravity (`MARS_GRAVITY=3.711`), disk parachute (Cd=1.5), retro-rocket (Isp=300s, maxThrust=12000N). dt=0.25s, max 20000 steps. Touchdown survivable if speed ≤6 m/s.
- **Outputs:** altitude profile (SVG), touchdown speed, survived bool, fuel used/remaining, phases, outcome, notes.
- **Simplified:** 1D, simplified atmosphere, constant gravity; not NASA trajectory.
- **⚠️ Known bug (competition brief):** S01 fails in all 2160 param combos (sign error in altitude integration). Must be disclosed if asked; do not present as verified flight model.
- **Learn:** EDL staging, why parachute alone insufficient for heavy rover, retro vs sky-crane.

### S02 — Spacecraft power budget (`power`)
- **Concept:** energy bookkeeping (Wh per sol).
- **Inputs:** source (solar/rtg), arrayArea, arrayEfficiency, sunHours, dustFactor, batteryWh, instrumentLoadW, heaterLoadW, mobilityLoadW, driveHours, rtgWatts.
- **Model:** generation = area × 590 W/m² (MARS_SOLAR_IRRADIANCE) × efficiency × sunHours × dustFactor (solar) or rtgWatts×24 (RTG). consumption = (instrument+heater)×24 + mobility×driveHours. net = gen - cons. margin = net/cons×100. status: healthy/tight/deficit (tight if margin<15). nightNeed = (instrument+heater)×(24-sunHours).
- **Outputs:** generation/consumption/net Wh, margin %, night need, status, notes.
- **Simplified:** representative values; real systems include thermal control, degradation, battery limits.
- **Learn:** daily energy budget, dust/latitude reduce solar, solar vs RTG.

### S03 — Signal across solar system (`communication`)
- **Concept:** light time, distance, signal spreading.
- **Inputs:** destination (Moon/Mars/Jupiter/Saturn/Pluto/Voyager1) with representative distances.
- **Model:** one-way light time = distance / 299792.458 km/s; round trip = 2×; relative signal strength = (384400/distance)² (qualitative, not link budget).
- **Outputs:** one-way/round-trip duration (formatted), relative strength, notes.
- **Simplified:** representative distances; qualitative comparison.
- **Learn:** calculate light time, why rover may use orbiter relay, distance weakens signal.

### S04 — Orbital mechanics lab (`orbit`)
- **Concept:** Hohmann transfer, delta-v.
- **Inputs:** r1, r2 (AU from orbitDestinations: Mercury..Neptune).
- **Model:** vis-viva: v_circ = √(μ/r); transfer velocities = √(μ(2/r - 1/a)), a=(r1+r2)/2; Δv1=|v_transfer1 - v1|; Δv2=|v2 - v_transfer2|; total = sum; transfer time = half period of transfer orbit (years). direction outward/inward.
- **Outputs:** circular velocities, transfer velocities, Δv1/Δv2/total, transfer years, direction.
- **Simplified:** idealised two-impulse Hohmann around point-mass Sun; ignores inclination, gravity assists, drag, finite burn.
- **Real example:** Earth→Mars ΔV ≈ 5.596 km/s (competition brief). This is the one "real" model.
- **Learn:** Hohmann transfer, cost of raising orbit vs plane change, transfer windows.

### S05 — Rover traverse planner (`rover`)
- **Concept:** traverse planning (sols, energy, terrain).
- **Inputs:** route cells (adjacent, unique) on 6×6 invented terrain grid; budget 45 Wh.
- **Model:** energy per step = distance × (4 + slope×0.9) Wh; sum; science = sum of cell science (0-3). Valid if starts at (0,0), ends at (5,5), adjacent, unique, energy ≤ 45 Wh.
- **Outputs:** path, distance (steps), energy Wh, science score, valid bool, message.
- **Simplified:** invented terrain (not Mars map), illustrative energy.
- **⚠️ Known bug (brief):** minimum energy 82.9 Wh > 45 Wh budget → **no route can ever be valid**. Disclose.
- **Learn:** rover drivers plan in sols, balance energy/terrain/science, shorter ≠ safer.

### S06 — Mission planning desk (`planning`)
- **Concept:** mass & power budget allocation.
- **Inputs:** selected parts (8 parts with mass/power/science), power source (solar/rtg), rtgWatts, solarWatts, massLimitKg, powerLimitW.
- **Model:** mass = sum selected mass; payloadPower = sum selected power; sourcePower = rtgWatts or solarWatts; science = sum; margins; valid if massMargin≥0 && powerMargin≥0 && science>0.
- **Outputs:** mass, power, science, margins, valid, verdict, notes.
- **Simplified:** budget values simplified, not actual mission specs.
- **⚠️ Known bug (brief):** `powerLimitW` is a dead knob (not used in calculation; uses sourcePower vs payloadPower). Disclose.
- **Learn:** allocate finite mass/power, trade-offs payload/mobility/lifetime.

### S07 — What if? lab (`what-if`)
- **Concept:** counterfactual reasoning.
- **Inputs:** choose real mission event + change condition (dust, comm delay).
- **Model:** hypothetical outcomes labelled clearly; real record shown beside, never altered.
- **Outputs:** hypothetical outcome text + real record.
- **Simplified:** hypothetical, not historical.
- **Learn:** separate documented event from hypothetical variation; counterfactual needs evidence.

### S08 — Failure investigation (`failure`)
- **Concept:** evidence vs interpretation.
- **Inputs:** documented mission endings (opportunity, insight, ingenuity, cassini, mars-2020-descent-stage).
- **Model:** evidence panels quote recorded status wording; hypothesis testing exercise; does not reproduce official accident investigation.
- **Outputs:** evidence, hypothesis comparison.
- **Learn:** distinguish observation from interpretation; lost contact ≠ destroyed; preserve uncertainty.

---

## 3. Simulations: what to disclose

From `docs/GRAVERSE_COMPETITION_BRIEF_AR.md` §9 and `docs/DEMO_GUIDE.md` §"Do not claim":
- Describe as "educational models" / "interactive models", not "engineering simulators" (except S04 vis-viva is a real calculation).
- Every simulator page displays its `approximation` note.
- Outputs are "Simulated" claim type, not observations.
- Three known bugs (S01, S05, S06 dead knob) — disclose honestly; competition brief says fix before 14 Nov. If asked, acknowledge and explain fix path.

---

## 4. Cross-references

04 (data), 05 (Explorer/Museum use), 10 (demo script uses S04).