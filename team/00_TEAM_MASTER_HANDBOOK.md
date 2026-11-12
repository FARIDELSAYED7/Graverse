# GRAVERSE Team Master Handbook

## One Product. Five Owners. One Competition Submission.

GRAVERSE is an interactive space-heritage timeline and source-linked digital museum. It helps a visitor understand machines humanity sent to the Moon, Mars, and deep space: what each object was, why it was sent, what it helped scientists learn, what happened to the mission, and what is known about the physical hardware now.

The team is not building five separate projects. It is preparing one product for one challenge through five different kinds of expertise:

```text
Scientific evidence ─┐
Educational meaning ─┼─> One verified product ─> Demonstrated value
Visitor experience ──┤                         └> Judge-ready story
Competition strategy ─┘
Technical architecture connects and protects all four.
```

## 1. Shared foundation

### What is GRAVERSE?

**What?** A web application with one typed collection of 30 source-linked artifact records and several ways to explore them.

**Why?** Information about a spacecraft or surface instrument is usually spread across mission pages, technical archives, image records, and educational pages. GRAVERSE gives a visitor a coherent route through that evidence.

**How?** `src/data/artifacts/` is assembled by `src/data/artifacts/index.ts`; the pages under `src/app/academy`, `src/app/museum`, and `src/app/explorer` read those records. Supporting surfaces reuse the same records instead of creating disconnected copies.

**Evidence?** `README.md`; `docs/ARCHITECTURE.md`; `src/data/artifacts/index.ts`; `src/app/museum/[id]/page.tsx`; `src/app/explorer/page.tsx`.

**Limitation?** This is a curated finite collection, not a complete inventory of all human-made objects in space. It is not an official NASA website, NASA partnership, NASA endorsement, or live telemetry system.

### What does the challenge ask?

The official 2026 NASA Space Apps Challenge is **“Abandoned but not Forgotten: Storytelling about NASA’s Discarded Equipment on the Moon and Mars.”** Its core request is to tell the story of some or all of the equipment NASA has left across the Solar System in a way that introduces school-age space enthusiasts to the hardware and the science it made possible. The challenge context emphasizes that young audiences often hear about active missions while earlier equipment is forgotten, and that accuracy matters.

Official page URLs:

- Requested challenge URL: <https://www.spaceappschallenge.org/2026/challenges/nasas-discarded-equipment-storytelling/>
- Resolved 2026 challenge page: <https://www.spaceappschallenge.org/2026/challenges/abandoned-but-not-forgotten-storytelling-about-nasas-discarded-equipment-on-the-moon-and-mars/>

**Challenge requirement versus GRAVERSE addition:** the challenge requires an engaging, accurate story about discarded equipment and the science it enabled. It does not require a 30-record archive, a three-mode timeline, Arabic UI, local favourites, 3D scenes, simulations, or a search index. Those are product choices made by GRAVERSE and must be presented as additions, not as NASA requirements.

### The three core experiences

| Experience | Route | Beginner explanation | Actual implementation evidence |
|---|---|---|---|
| Academy | `/academy` | Guided learning for school-age audiences | `src/app/academy/page.tsx`, `src/data/lessons.ts`, `src/data/journeys.ts`, `src/components/academy/` |
| Museum | `/museum` | Story-first records about individual artifacts | `src/app/museum/page.tsx`, `src/app/museum/[id]/page.tsx`, `src/components/artifacts/` |
| Explorer | `/explorer` | Investigate by time, destination, type, and status | `src/app/explorer/page.tsx`, `src/components/explore/ExploreExperience.tsx`, `src/lib/explore.ts` |

The same artifact can appear in all three. That is the central product idea: one evidence base, different learning doors.

### Supporting experiences

| Surface | What it does | Evidence |
|---|---|---|
| Mission Control | Separates mission, hardware, and derived communication status | `src/app/mission-control/page.tsx`, `src/lib/mission-control.ts`, `src/components/mission-control/StatusBoard.tsx` |
| Engineering | Explains power, mobility, landing, communication, instruments, materials, and Mars-rover evolution | `src/data/engineering.ts`, `src/app/engineering/` |
| Stories | Curated paths through existing records | `src/data/stories.ts`, `src/app/stories/` |
| Research Archive | Explains method, sources, claims, status, uncertainty, media, and limits | `src/data/research.ts`, `src/app/research/page.tsx` |
| Simulations | Eight labelled educational approximations | `src/data/simulations.ts`, `src/components/simulations/Simulators.tsx`, `src/app/simulations/` |
| Compare | Side-by-side documented values | `src/components/compare/CompareClient.tsx`, `src/app/compare/page.tsx` |
| My Universe | Local favourites, collections, recent records, completed simulations | `src/lib/personal.ts`, `src/components/personal/MyUniverseClient.tsx` |
| Search | Searches across artifacts, missions, bodies, lessons, stories, and more | `src/lib/search-index.ts`, `src/components/search/SearchExperience.tsx`, `src/app/search/page.tsx` |

### The status distinction everyone must know

Mission status and hardware status are different questions.

```text
Mission status      What happened to the mission as an operation?
Hardware status     What is known about the physical object?
Communication      A derived interpretation of whether a link is expected.
```

For example, a mission can be completed while a lander remains on the Moon. A probe can stop communicating without evidence that it was destroyed. A passive instrument can remain scientifically useful without transmitting. The types in `src/types/artifact.ts` keep these categories separate, and `StatusBadge`/`deriveCommunicationStatus` preserve that distinction in the UI.

## 2. Ownership model

Owning a responsibility means being accountable for its quality, evidence, and final explanation. Helping means contributing observations or review while the owner makes the decision and signs off. Everyone may ask questions; only the owner is responsible for an incomplete or unsupported deliverable.

### Role 1 — Founder / Technical Lead / Product Architect

**Overview.** The Founder owns the product’s technical truth and final integration. This role explains how the system works, protects the existing application, and connects the four specialist workstreams.

**Beginner explanation.** The technical lead is the person who can open the repository, trace a user action through pages, components, data, and browser state, and explain why the product behaves as it does. This is not “the person who does every task.” It is the person who keeps the whole system coherent.

**Why it exists.** Judges may ask whether a feature is real, whether the data is connected, whether the implementation is maintainable, and what the limitations are. Someone must answer from code rather than from a page impression.

**GRAVERSE connection.** The Founder owns the relationship between `src/app`, `src/components`, `src/data`, `src/lib`, `src/types`, tests, scripts, build, and CI. The Founder also approves wording that could accidentally overclaim technical behavior.

**Challenge connection.** Technical choices must serve storytelling and accuracy. A beautiful interface that cannot show evidence or a simulation that looks like flight software would weaken the challenge response.

**Exact responsibilities.**

- Maintain the architecture map and file map.
- Explain server versus client components, static generation, local state, routing, data validation, and accessibility mechanisms.
- Verify that every team report points to current code and not only to old documentation.
- Review changes to any claim, source, route, data record, or competition statement.
- Run or supervise `npm run validate`, `npm run test:data`, `npm run typecheck`, `npm run lint`, `npm run build`, and the browser checks as appropriate.
- Lead the technical judge defense and give final approval on production changes.

**Working order.** First inventory the code and confirm the baseline. Then teach the shared model. Then review each specialist’s evidence. Finally rehearse the technical explanation and live fallback paths.

**Deliverables.** `FOUNDER_TECHNICAL_MASTERY_GUIDE.md`, verified file map, lifecycle traces, technical answers, final integration checklist, and technical sections of the demo.

**Acceptance criteria.** The Founder can trace five core lifecycles; name the source file for every important product claim; state which features are static, client-side, local-only, derived, or approximate; and explain at least one limitation for every major technology.

**Common mistakes.** Saying “the page exists, so the feature works”; treating local data as a database; calling a derived status live; claiming server-side behavior for a client island; or hiding uncertainty behind polished visuals.

**Judge questions.** Why Next.js App Router? Why separate mission and hardware status? What is actually persisted? What happens without WebGL? How do you know citations resolve? What is not implemented?

**Required demonstration.** Open an artifact, locate its record, trace the page to `getArtifact`, show its source IDs, open a related lesson, and explain what is rendered on the server versus what changes in the browser.

### Role 2 — Member 1: Scientific Research & Data Integrity Lead

**Overview.** Own the truth of historical, scientific, mission, destination, status, and source claims.

**Beginner explanation.** Scientific research is not collecting interesting facts. It is asking a precise question, finding the strongest available evidence, recording what the source actually says, and clearly labelling what remains uncertain.

**Why it exists.** The challenge explicitly values accuracy. The project’s most important promise is not that every record is complete; it is that the interface does not pretend to know more than its evidence supports.

**GRAVERSE connection.** Work from `src/data/artifacts/*.ts`, `src/data/sources.ts`, `src/types/artifact.ts`, `src/types/provenance.ts`, `src/lib/provenance.ts`, `scripts/validate-data.ts`, and `/sources`.

**Challenge connection.** The member connects hardware to mission purpose and scientific contribution, so the team can tell a story that is accurate rather than merely dramatic.

**Exact responsibilities.** Research primary sources; verify dates and destinations; distinguish mission outcome from hardware fate; record source URLs and access dates; identify conflicts; audit 8–10 representative artifacts; write three evidence-backed artifact stories; maintain the source register and uncertainty list.

**Working order.** Learn the data model. Read the Research Archive. Choose a balanced sample. Build a source table before writing prose. Verify claims one field at a time. Ask the Founder to review only after the evidence is organized.

**Deliverables.** Research report, verification table, source register updates, three stories, disputed/unknown facts list, and ten scientific judge questions.

**Acceptance criteria.** Every selected claim has a source or is explicitly unknown; original wording is preserved; conflicting sources are not silently merged; and the member can explain why “lost contact” is not the same as “destroyed.”

**Common mistakes.** Using a search snippet as evidence; copying a secondary page without checking NASA/JPL/NSSDCA; treating an approximate location as a coordinate; converting “not communicating” into “gone”; or presenting GRAVERSE’s normalized label as NASA’s exact wording.

**Judge questions.** How did you choose sources? What do you do when sources disagree? Why is Ranger 7 “impacted” rather than “failed”? How do you know an artifact remains on a body? What does “unknown” mean in this product?

**Required demonstration.** Pick one artifact such as `ranger-7`, `surveyor-3`, `apollo-11-lrrr`, `perseverance`, or `voyager-1`; open its Museum record; show its two status fields, original wording, timeline, contributions, source list, and uncertainty note; then explain one thing the record deliberately does not claim.

### Role 3 — Member 2: Educational Experience & Storytelling Lead

**Overview.** Own how a visitor learns, not simply how much content exists.

**Beginner explanation.** Educational design asks what a learner should understand, what action helps them reach that understanding, and how the product gives them a meaningful next step. Storytelling gives facts a human-scale sequence: purpose, journey, discovery, consequence, and legacy.

**Why it exists.** The challenge asks for introduction and engagement, not an archive dump. A visitor should be able to move from curiosity to a usable mental model.

**GRAVERSE connection.** Study `src/data/lessons.ts`, `src/data/journeys.ts`, `src/data/articles.ts`, `src/data/stories.ts`, `src/components/academy/`, `src/app/academy/`, and the Museum record template.

**Challenge connection.** This role translates hardware and science for school-age and casual audiences while keeping the evidence path visible.

**Exact responsibilities.** Analyse journeys, objectives, sections, key terms, quizzes, progress, badges, related artifacts, and destinations. Create three educational stories. Develop five audience personas and five learning journeys. Explain the educational theories as interpretations, not measured outcomes.

**Working order.** Start with one lesson as a learner. Then inspect its data. Compare one journey with one Museum record. Map the same artifact through Academy, Museum, and Explorer. Only then write theory and narrative analysis.

**Deliverables.** Academy report, Museum educational analysis, Explorer learning analysis, three stories, personas, learning journeys, and ten education judge questions.

**Acceptance criteria.** The member can name a learning objective, show the feature that supports it, point to its actual source code/data, distinguish “designed to support learning” from “proven to improve learning,” and explain why a story is more than decorative prose.

**Common mistakes.** Calling a quiz an assessment of real learning; assuming progress proves comprehension; writing for an imaginary “everyone”; describing theory without linking to a feature; or simplifying science until the important uncertainty disappears.

**Judge questions.** Why three age bands? How does a learner move from story to evidence? What makes this more than articles? What did you measure? What happens when a child does not understand a quiz answer?

**Required demonstration.** Open `/academy/journeys/first-flight`, complete one lesson step and a quiz, follow an artifact link into `/museum/apollo-11-lm-descent-stage`, and explain how purpose, journey, science, fate, and sources form one learning arc.

### Role 4 — Member 3: Product Experience, UX Research & QA Lead

**Overview.** Own whether an unfamiliar visitor can understand and use the product across devices, languages, and interaction modes.

**Beginner explanation.** A feature can be technically correct and still be confusing. UX research observes what a new person does, where they hesitate, what they expect, and whether they reach the intended outcome. QA checks repeatable behavior against an expected result.

**Why it exists.** The team knows the product too well. A newcomer is the proper test of navigation, labels, discoverability, reading order, and feedback.

**GRAVERSE connection.** Test routes under `src/app`, reusable components under `src/components`, English/Arabic behavior in `src/lib/i18n.ts` and `src/lib/locale.ts`, accessibility guidance in `docs/ACCESSIBILITY.md`, and browser scripts under `scripts/`.

**Challenge connection.** If school-age or casual visitors cannot find, understand, or enjoy the story, the solution is not delivering its intended value.

**Exact responsibilities.** Learn the visitor journeys; test navigation, search, filters, progress, compare, simulation, favourites, responsive layouts, Arabic RTL, keyboard access, reduced motion, and no-WebGL fallback; run small supervised user tests; record severity-ranked issues; report without modifying production code.

**Working order.** Learn expected behavior from the pages and docs. Test the happy path. Test one failure or empty state. Test keyboard. Test widths. Test Arabic. Test with an unfamiliar person. Separate reproducible defects from preferences.

**Deliverables.** UX report, test log, screenshots, user feedback, severity list, and ten usability judge questions.

**Acceptance criteria.** Each result contains environment, route, action, expected behavior, observed behavior, evidence, severity, and reproducibility. Claims say whether they come from automation, manual observation, or user feedback.

**Common mistakes.** Calling an aesthetic preference a defect; claiming screen-reader testing without doing it; testing only the desktop happy path; changing code to make a test pass; or reporting “broken” without a reproduction path.

**Judge questions.** How did you test beginners? What accessibility checks are automated versus manual? What happens when WebGL is unavailable? Does Arabic translate the editorial prose? How did you prioritize issues?

**Required demonstration.** At 390px, use the keyboard to open the menu, navigate to Explorer, filter to a destination, open an artifact, save it, and show the expected feedback. Record what was observed, not what was intended.

### Role 5 — Member 4: Competition Strategy & Presentation Lead

**Overview.** Own the connection between the official challenge, the product’s distinctive response, and what judges can understand in limited time.

**Beginner explanation.** Competition strategy is not hype. It is the disciplined work of proving that the project solves the stated challenge, that the solution is distinctive and useful, and that the team understands its limits.

**Why it exists.** A technically complete project can lose if its story is unclear, its demo is unfocused, or its “innovation” is only a list of features.

**GRAVERSE connection.** Use `README.md`, `docs/DEMO_GUIDE.md`, `docs/GRAVERSE_COMPETITION_BRIEF_AR.md`, `shared/CHALLENGE_TO_SOLUTION_MAP.md`, the actual routes, and the competitor source register.

**Challenge connection.** Every pitch sentence must return to discarded hardware, the science it enabled, school-age/casual audiences, storytelling, and accuracy.

**Exact responsibilities.** Read the official challenge; separate explicit requirements from additions; research official competitor documentation; build a feature matrix without unsupported weakness claims; define defensible differentiation; write pitches and demo scripts; prepare skeptical questions; manage timing and handoffs.

**Working order.** Start with the challenge statement. Watch a visitor use GRAVERSE. Build an evidence-backed problem statement. Compare alternatives. Choose three defensible differentiators. Draft the pitch. Rehearse with a timer. Remove claims that cannot be demonstrated.

**Deliverables.** Challenge analysis, competitor matrix, differentiation report, intellectual foundation, 15-second/30-second/90-second/3-minute pitches, 5-minute technical outline, live demo guide, and judge Q&A.

**Acceptance criteria.** Every differentiator has a product evidence path; every competitor claim has an official source or is written as an observation; the pitch can be delivered without inventing NASA endorsement; and the demo has a recovery path for slow network, missing WebGL, or local progress state.

**Common mistakes.** Calling GRAVERSE “the first” or “the only” without proof; treating NASA websites as competitors to defeat; listing features without explaining value; promising real-time telemetry; or spending the demo on setup rather than the challenge story.

**Judge questions.** Why this product? Why is this not a database? What is innovative? Who benefits? What did you not build? Why should judges believe the sources? Why should this project win?

**Required demonstration.** Deliver the 90-second pitch, then run the first three minutes of `shared/DEMO_SCRIPT.md` with a clean handoff to the science and technical explanations.

## 3. Shared five-question method

Every major concept, claim, feature, and presentation point must answer:

| Question | Required answer |
|---|---|
| **WHAT?** | What is the feature, concept, or claim? |
| **WHY?** | What problem or learning need does it address? |
| **HOW?** | How does actual GRAVERSE implement or represent it? |
| **EVIDENCE?** | Where can someone verify it in the app, repository, test, or source? |
| **LIMITATION?** | What does it not do, and what must we not claim? |

Example: **local progress** is browser-stored lesson/game progress (`WHAT`). It avoids accounts and makes a short demo personal (`WHY`). `src/lib/progress.ts`, `src/lib/personal.ts`, Academy client components, and export/import routes implement it (`HOW`). A teammate can show `/academy/progress` and the relevant functions (`EVIDENCE`). It is not cloud sync, cross-device identity, or measured learning evidence (`LIMITATION`).

## 4. Parallel execution program

Effort estimates are approximate working time, not promises. The Founder coordinates; specialists work in parallel.

| Phase | Founder | Member 1 | Member 2 | Member 3 | Member 4 |
|---|---|---|---|---|---|
| 1. Orientation, 2–3 h | Explain repo and evidence rules | Read data model and one artifact | Complete one Academy lesson | Complete a visitor walkthrough | Read challenge and watch demo |
| 2. Baseline, 3–5 h | Confirm status/build baseline | Build 8–10 artifact shortlist | Map Academy/Museum/Explorer | Establish test matrix | Build challenge-to-feature table |
| 3. Deep work, 6–10 h | Trace lifecycles | Verify sources and write notes | Write stories/personas | Run journeys and responsive tests | Research competitors and claims |
| 4. Deliverables, 4–8 h | Review evidence and consistency | Submit report/table/stories | Submit education pack | Submit UX/QA pack | Submit strategy/presentation pack |
| 5. Oral defense, 3–5 h | Technical mock defense | Scientific mock defense | Education mock defense | Usability mock defense | Competition mock defense |
| 6. Final rehearsal, 2–4 h | Integrate and time | Supply source answers | Supply learning handoffs | Supply failure/recovery notes | Run full presentation |

### Tool orientation for beginners

- **Repository:** a folder containing the application and its history. Read files; do not delete or edit production files for this mission.
- **Terminal:** a text interface for running safe inspection and verification commands. Use `pwd`, `git status`, `rg`, `sed`, and the project’s `npm run` scripts.
- **Git status:** a list of changed files. Existing changes belong to the user; do not reset, checkout, clean, or commit.
- **Browser developer tools:** inspect viewport size, console errors, network requests, accessibility tree, and responsive layout. Use it for observation, not for changing the application.
- **Markdown:** plain-text documents with headings, tables, links, and checkboxes. Keep evidence links close to claims.
- **Research log:** a table with question, source, exact relevant wording, interpretation, date accessed, confidence, and follow-up.

If stuck: first write down the exact question and the evidence already checked; then ask the role owner. If the issue crosses roles, the Founder decides the owner and records it in `shared/OPEN_QUESTIONS.md`.

## 5. Shared assessment levels

### Level 1 — Beginner

Explain your responsibility, describe GRAVERSE in one minute, name Academy/Museum/Explorer, and explain one limitation.

### Level 2 — Intermediate

Demonstrate one real workflow and connect it to the challenge with repository or source evidence.

### Level 3 — Expert

Answer follow-up questions, name exact paths or source URLs, distinguish normalized labels from original wording, and admit uncertainty without losing clarity.

### Level 4 — Critical judge simulation

Defend a decision against a skeptical judge: “You say this is accurate; show me,” “Why is this innovative?,” “What happens for a child on a phone?,” or “What did you measure?”

Score each answer from 0–4 on accuracy, understanding, clarity, evidence, confidence, and follow-up ability. A score of 3 means independently ready; 4 means can coach another teammate. No member is presentation-ready if they score below 3 on evidence or limitations.

## 6. Team-wide non-negotiables

- Do not invent a feature, source, test result, partnership, endorsement, user impact, or competitive claim.
- Do not call GRAVERSE a complete inventory.
- Do not call simulations predictions or flight software.
- Do not call local persistence a backend or account system.
- Do not claim manual screen-reader testing unless it is actually performed and logged.
- Do not modify application source code as part of this onboarding mission.
- Keep “recorded result,” “manual observation,” “scientific fact,” “interpretation,” and “open question” visibly separate.

