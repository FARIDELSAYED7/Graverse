# Competition Strategy, Product Positioning & Presentation — Complete Member Guide

## Your mission

You own the bridge between the official challenge and the judge’s understanding of GRAVERSE. Your work must make the project memorable without making claims the product or sources cannot support.

## 1. Why technically complete projects do not automatically win

Judges have limited time. They need to see a clear chain:

```text
Challenge need → audience problem → GRAVERSE response → demonstrated value → honest limits
```

A feature list is not a strategy. “We have a timeline, search, 3D, and quizzes” is weaker than “A visitor who only knows active missions can follow one machine from purpose to discovery to physical legacy, then inspect the evidence.”

## 2. Official challenge analysis

The official 2026 challenge is **“Abandoned but not Forgotten: Storytelling about NASA’s Discarded Equipment on the Moon and Mars.”** The challenge asks participants to tell the story of some or all of NASA’s equipment left across the Solar System and introduce school-age space enthusiasts to the hardware and the science it made possible. Accuracy is central.

Use the official page as the authority:

- <https://www.spaceappschallenge.org/2026/challenges/nasas-discarded-equipment-storytelling/>
- Resolved 2026 page: <https://www.spaceappschallenge.org/2026/challenges/abandoned-but-not-forgotten-storytelling-about-nasas-discarded-equipment-on-the-moon-and-mars/>

### Requirement-to-evidence map

| Challenge need | GRAVERSE response | Demonstration evidence | Do not overclaim |
|---|---|---|---|
| Tell stories about discarded hardware | Museum records, 8 stories, exhibition hall | `/museum`, `/stories`, `/museum/apollo-11-lm-descent-stage` | Not every object is covered |
| Introduce school-age enthusiasts | Academy age bands, journeys, lessons, quizzes, playground | `/academy`, `/academy/journeys/first-flight` | No measured learning impact yet |
| Explain science made possible | `scientificContributions`, Engineering Lab, lesson links | Museum science section, `/engineering` | Contributions still require source review |
| Be accurate | 96 sources, claim labels, original wording, Unknown, validator | `/sources`, `src/lib/provenance.ts`, `scripts/validate-data.ts` | Citation resolution is not perfect scientific proof |
| Make hardware understandable | Hardware type, purpose, technical details, anatomy panel | Museum record | Anatomy is a reading aid, not a reconstruction |
| Show varied current condition | Separate mission and hardware status | `/mission-control`, Museum status panels | Communication is derived, not live telemetry |

The challenge does **not** require local favourites, Arabic RTL, a relation graph, 3D scenes, eight simulations, 172 static routes, or 30 records. These are product additions. Explain how they support the challenge, but never attribute them to NASA.

## 3. Competitor research method

Research actual official documentation, not impressions from a search snippet. For every platform record:

- Product name and official URL.
- Primary audience and purpose.
- Content types.
- Interaction model.
- Evidence/source visibility.
- Educational path.
- Hardware-heritage or historical framing.
- What a visitor can do in one session.
- Date accessed.

Starting points:

| Platform | Official source | Compare carefully |
|---|---|---|
| NASA Science | <https://science.nasa.gov/> | Science content, missions, audience pathways |
| NASA Eyes | <https://eyes.nasa.gov/> | 3D/interactive exploration and scope |
| NASA Solar System Exploration | <https://solarsystem.nasa.gov/> | Destination and mission education |
| NSSDCA | <https://nssdc.gsfc.nasa.gov/> | Archival/technical records and catalog use |
| ESA Education | <https://www.esa.int/Education> | Educational activities and audience framing |
| ESA Space in Images | <https://www.esa.int/ESA_Multimedia/Images> | Image/archive presentation |

Do not write “competitor is confusing” unless a documented user test supports it. Prefer “The official page emphasizes X; GRAVERSE emphasizes Y.” A comparison is not an attack.

### Matrix template

| Capability | NASA Science | NASA Eyes | Solar System Exploration | NSSDCA | ESA Education | GRAVERSE |
|---|---|---|---|---|---|---|
| Individual hardware heritage story | Verify | Verify | Verify | Verify | Verify | Museum record |
| Source attached to claim | Verify | Verify | Verify | Verify | Verify | `SourceList`, `/sources` |
| Guided age-banded learning | Verify | Verify | Verify | Verify | Verify | Academy journeys/lessons |
| Timeline + destination + artifact routes | Verify | Verify | Verify | Verify | Verify | Explorer |
| Mission versus hardware status | Verify | Verify | Verify | Verify | Verify | Typed fields and Mission Control |
| Local personal collection | Verify | Verify | Verify | Verify | Verify | My Universe |
| Educational simulations | Verify | Verify | Verify | Verify | Verify | Eight approximations |

Fill “Verify” from the official page before making a conclusion. “Not found during this review” is safer than “does not exist.”

## 4. Defensible differentiation

The following are defensible if demonstrated and phrased carefully:

1. **One evidence base, three visitor modes.** Academy, Museum, and Explorer reuse the same artifact collection.
2. **Hardware as heritage, not only mission status.** The Museum asks what remains and what that object contributed after the mission’s operational phase.
3. **Mission status and hardware status are modelled separately.** This prevents a mission ending from being narrated as an object disappearing.
4. **Evidence is visible.** Source IDs, access dates, claim labels, original wording, uncertainty notes, and Research Archive are part of the visitor experience.
5. **Educational and investigative routes connect.** A learner can move from a lesson to an artifact, destination, timeline, related record, and source.

These are not automatically unique in the entire world. Say “GRAVERSE’s defensible emphasis” rather than “the first/only platform.”

## 5. Intellectual foundation

GRAVERSE treats space hardware as human heritage: a physical trace of scientific choices, engineering constraints, labour, risk, and discovery. This makes “discarded” more complex than “useless.” A descent stage may be inactive but historically meaningful; a passive instrument may still participate in science; an intentional impact may be a mission success; a probe may still travel after its active mission changes.

Use this argument carefully:

- **Heritage:** physical objects preserve a record of exploration.
- **Legacy:** scientific value can continue through data, methods, and later missions.
- **Digital preservation:** a digital story can connect scattered records without pretending to replace the physical site or archive.
- **Scientific communication:** a story should reveal evidence and uncertainty, not hide them.
- **Systems thinking:** mission, hardware, communication, engineering, destination, and learner are connected but not identical.

This is interpretation, not an official NASA statement. Mark it as the team’s product philosophy.

## 6. Presentation scripts

### 15 seconds

“GRAVERSE turns the machines humanity left across the Moon, Mars, and deep space into source-linked stories. One collection becomes a guided Academy, a heritage Museum, and an investigative Explorer — so visitors can see not only what a mission did, but what happened to the hardware afterward.”

### 30 seconds

“The challenge asks us to tell school-age space enthusiasts about discarded equipment and the science it made possible. GRAVERSE answers with one verified collection of artifact records and three ways in: Academy for guided learning, Museum for story-first hardware histories, and Explorer for timeline and destination discovery. Mission status and physical hardware status stay separate, and every important record exposes sources and uncertainty.”

### 90 seconds

“Space history is often told through active missions. But the Moon, Mars, and deep space are also full of the hardware those missions left behind. GRAVERSE makes that heritage discoverable. Start in the Academy to learn what an artifact is, follow a journey into a lesson, or play a clearly-labelled educational toy. Enter the Museum to read one machine’s purpose, journey, discoveries, fate, and sources. Or use Explorer to investigate by time, destination, type, and status. The key idea is accuracy: the mission can be complete while hardware remains; no contact is not automatically destruction; and a passive instrument may still be useful. The platform connects these stories to registered sources, original wording, and uncertainty notes. It is a curated educational experience, not a complete inventory, live telemetry feed, or NASA-endorsed product.”

### Three-minute story

1. Start with the challenge and the forgotten-hardware problem.
2. Show the three doors on Home.
3. Open one Academy lesson/journey.
4. Follow a linked artifact into Museum.
5. Show two statuses side by side.
6. Show one discovery and one source.
7. Switch to Explorer and filter by destination/time.
8. State the limitation and why the evidence model matters.

### Five-minute technical presentation outline

1. Challenge and audience — 35 seconds.
2. Product model — one dataset, three experiences — 45 seconds.
3. Data/provenance — typed artifacts, derived missions, sources, uncertainty — 70 seconds.
4. Accessibility and progressive enhancement — keyboard, reduced motion, list/SVG/no-WebGL alternatives — 45 seconds.
5. Education and interaction — journeys, quizzes, simulations, local progress — 45 seconds.
6. Verification and limits — tests, source registry, no NASA endorsement, finite collection — 40 seconds.
7. Closing value — 20 seconds.

## 7. Live demo script

Use `shared/DEMO_SCRIPT.md` for the coordinated version. Your job during the live demo is timing, handoff, and recovery.

Before starting:

- Use a clean browser profile or reset local progress.
- Build and run the recorded preparation commands.
- Open likely routes in tabs: `/`, `/academy`, `/museum/apollo-11-lm-descent-stage`, `/explorer`, `/sources`, `/mission-control`.
- Have screenshots or a screen recording only as a backup, not as evidence of a live feature.
- Know the no-WebGL and no-network explanation.

Recovery lines:

- **Slow page:** “The important point is the accessible record and source panel; the 3D layer is decorative and can be skipped.”
- **WebGL absent:** “This is expected on some devices. The same meaning is available through the 2D map/list and HTML controls.”
- **Local progress state:** “Progress is intentionally browser-local. We can reset or import a prepared file.”
- **Unknown fact:** “The product keeps that uncertainty visible rather than manufacturing a value.”

## 8. Difficult judge questions

| Question | Strong answer structure |
|---|---|
| What is innovative? | Name the integration: heritage framing + three modes + evidence model + status separation; demonstrate it. |
| Why not a database? | The database is the evidence base; the product adds guided learning, narrative sequence, discovery, and interaction. |
| Why trust the sources? | Registered public NASA/NSSDCA/image records, source IDs, access dates, original wording, validator; still finite and not infallible. |
| Did NASA endorse you? | No. GRAVERSE is a challenge project and says it is not an official NASA website. |
| Did you measure learning? | Not yet. We can show design intent, quizzes, and planned user research; we do not claim measured impact. |
| What is the biggest limitation? | Curated finite scope, partial Arabic localization, local-only state, no live telemetry, and no complete screen-reader audit. |
| Why 3D? | It creates optional spatial engagement; meaning remains in accessible 2D/HTML alternatives. |
| What happens if a source changes? | Access and verification dates expose freshness; future updates require re-review and validation. |
| Who is the first user? | School-age learners, casual space enthusiasts, and facilitators/teachers; personas must be backed by planned or completed observations. |
| Why should this win? | It answers the stated challenge with a coherent, demonstrable, evidence-aware experience and understands what it cannot claim. |

## 9. Deliverables and mastery

- Challenge analysis.
- Competitor matrix with official URLs and access dates.
- Differentiation report.
- Philosophical/intellectual foundation.
- 15-second, 30-second, 90-second, 3-minute, and 5-minute scripts.
- Live demo guide and backup plan.
- Judge Q&A.

### Mastery test

**Beginner:** state the challenge, audience, three experiences, and one limitation.

**Intermediate:** map three challenge needs to actual routes and source files.

**Expert:** defend a differentiation claim with a demonstration, an official competitor source, and a limitation.

**Critical simulation:** a judge says, “This is just a nicer NASA website.” Answer: acknowledge the shared public-source ecosystem, then demonstrate the specific integrated experience — one artifact across Academy/Museum/Explorer, status distinction, evidence visibility, and accessible alternatives — without claiming exclusivity.

## 10. Checklist

- [ ] I can state the challenge without inventing requirements.
- [ ] I can explain the audience and the product in under 30 seconds.
- [ ] Every differentiation claim has repository evidence.
- [ ] Every competitor statement has an official source or careful wording.
- [ ] I do not use first/only/best/NASA-approved without proof.
- [ ] I can run the demo in time and recover from WebGL/local-state problems.
- [ ] I can state educational, scientific, technical, and localization limitations.
- [ ] I added unresolved strategy questions to `team/shared/OPEN_QUESTIONS.md`.

