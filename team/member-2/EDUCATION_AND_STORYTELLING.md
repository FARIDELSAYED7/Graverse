# Educational Experience & Storytelling — Complete Member Guide

## Your mission

You own the question: **Can a new learner make meaning from the evidence?** You are responsible for analysing the Academy, Museum, Explorer, and story surfaces; designing evidence-backed narratives; and explaining what GRAVERSE is designed to help people learn without claiming educational impact that has not been measured.

## 1. Why storytelling matters

**What?** Storytelling is the deliberate sequencing of facts, choices, events, discoveries, and consequences so a learner can follow a question over time.

**Why?** A database answers “what fields exist?” A story helps a learner understand why a machine was built, what problem it met, what it made possible, and why its physical remains still matter.

**How?** GRAVERSE uses three modes: Academy guides, Museum narrates an artifact record, and Explorer lets the learner choose a path by time, destination, or hardware type. `src/data/stories.ts` adds curated paths, while the relation graph connects artifacts, missions, destinations, lessons, and sources.

**Evidence?** `README.md`; `src/data/lessons.ts`; `src/data/journeys.ts`; `src/data/stories.ts`; `src/app/academy/`; `src/app/museum/[id]/page.tsx`; `src/app/explorer/page.tsx`.

**Limitation?** The implementation shows an educational design intention. It does not by itself prove that learners remember more, become more interested, or learn faster. Those claims require user research or educational evaluation.

## 2. Academy deep dive

### Learning journeys

**What?** A journey is a sequenced path that can mix lessons, Museum records, destinations, articles, and challenges and award a badge.

**Why?** A learner benefits from a visible route instead of a blank content catalogue.

**How?** `src/data/journeys.ts` defines four journeys: `first-flight`, `moon-detectives`, `mission-engineer`, and `rock-to-rover`. Each has an age band, minutes, steps, badge, source IDs, and linked records. `src/app/academy/journeys/[id]/page.tsx` resolves steps into artifacts and bodies; `src/components/academy/JourneySteps.tsx` renders the path.

**Evidence?** Open `/academy/journeys` and `/academy/journeys/first-flight`; inspect `src/data/journeys.ts` and `src/app/academy/journeys/[id]/page.tsx`.

**Limitation?** A completed route indicates stored progress; it does not prove mastery.

### Lessons

**What?** A lesson is a structured learning unit with a title, summary, age band, objectives, sections, key terms, “try it” prompt, and knowledge check.

**Why?** It breaks a complex theme into a manageable learning sequence.

**How?** `src/data/lessons.ts` contains 12 lesson records such as `what-is-an-artifact`, `reading-a-mission-timeline`, `mission-status-vs-hardware-status`, and `how-we-know-what-we-know`. `src/app/academy/lessons/[id]/page.tsx` renders the content. `src/components/academy/LessonQuiz.tsx` gives an explanation for a correct answer.

**Evidence?** Open `/academy/lessons/our-neighbor-the-moon`; inspect the lesson object and `LessonQuiz.tsx`.

**Limitation?** Quiz feedback is a knowledge check, not a validated assessment instrument.

### Learning objectives

Read each objective as a promise about intended learning, not a proven outcome. For example, if a lesson says a learner will distinguish mission status from hardware status, inspect whether the explanation, examples, and quiz actually support that distinction.

### Progress persistence

**What?** Local progress stores lesson, journey, game, and achievement state in the browser.

**Why?** It gives the learner continuity without requiring an account.

**How?** `src/lib/progress.ts`, `src/lib/personal.ts`, `src/lib/use-progress.ts`, `src/components/academy/ProgressDashboard.tsx`, `ProgressSnapshot.tsx`, `AchievementsView.tsx`, `CertificateView.tsx`, and `/academy/progress` work together. Import/export is available through `src/app/api/export/route.ts` and the personal state helpers.

**Evidence?** Complete a quiz, reload, open `/academy/progress`, export the JSON, and inspect the browser’s local state during QA with the Founder.

**Limitation?** No account, cloud sync, analytics, or cross-device identity. Local progress can be cleared by the user or browser.

### Related artifacts and missions

Lesson and journey links point to the same artifact and mission records used by Museum and Explorer. This is important educationally: a learner can move from concept to example without entering a second, disconnected content system.

## 3. Museum as an educational story

The Museum record is a narrative template, not just a card. The actual page `src/app/museum/[id]/page.tsx` organizes the route through:

1. Overview — what the object is.
2. Mission purpose — why it was sent.
3. Journey — launch, arrival, milestones, and events.
4. Science — what was learned.
5. Fate — what happened to the hardware.
6. Provenance — mission, agency, source count, freshness, uncertainty.
7. Communication status — clearly derived, not live telemetry.
8. Technical details and recorded anatomy.
9. Media and model.
10. Lessons, related records, and sources.

The record shape in `src/types/artifact.ts` supports this sequence through `overview`, `scientificPurpose`, `timelineEvents`, `scientificContributions`, `fate`, `technicalDetails`, `relatedIds`, `sourceIds`, and `dataNotes`.

### Story analysis template

For every story, answer:

| Part | Learner question | GRAVERSE evidence |
|---|---|---|
| Beginning | What problem or curiosity started the mission? | `scientificPurpose`, source list |
| Purpose | What was the machine supposed to do? | Museum purpose section |
| Design | How did engineering serve that purpose? | Engineering links and technical details |
| Journey | What happened in time order? | `timelineEvents`, Explorer timeline |
| Discovery | What did the mission make possible? | `scientificContributions` |
| Legacy | Why does the result matter after the mission? | related records, articles, story collections |
| Hardware now | What remains and what is its status? | separate status fields and `fate` |
| Evidence | How can the learner check it? | `/sources`, `SourceList`, source IDs |
| Limits | What should the learner not infer? | `dataNotes`, Unknown labels |

## 4. Explorer as discovery learning

**What?** Explorer offers a chronological timeline, by-destination view, by-artifact view, filters, sorting, URL-synchronised state, timeline preview, list view, destination records, deep-sky records, and an orrery.

**Why?** Some learners want a guided story; others learn by asking their own question. Explorer supports curiosity, comparison, and investigation.

**How?** `src/app/explorer/page.tsx` parses initial search parameters. `src/components/explore/ExploreExperience.tsx` manages mode, filters, sort, and URL synchronisation. `src/lib/explore.ts` defines options and filtering. `TimelineStage.tsx` renders the visual timeline; the list view offers a text-oriented alternative.

**Evidence?** Open `/explorer`, switch modes, apply destination and decade filters, copy the URL, and reload. Inspect the named files.

**Limitation?** Choice can increase cognitive load. The product offers multiple entry points, but the team has not measured which path produces the best learning outcome.

## 5. Educational theories, applied carefully

The theories below are lenses for analysing design choices, not proof of effectiveness.

| Theory | Simple meaning | GRAVERSE application | What we can and cannot claim |
|---|---|---|---|
| Constructivist learning | Learners build understanding by connecting new ideas to prior knowledge | A visitor connects a new artifact to a mission, destination, and earlier record | We can say the links support connection-making; not that learning was measured |
| Experiential learning | Understanding develops through doing, observing results, and reflecting | Simulations, quizzes, rover builder, and playground games | We can describe activities; not claim improved retention without study |
| Inquiry-based learning | Learners investigate a question using evidence | Explorer filters, source links, comparison, and Research Archive | We can show opportunities for inquiry; not claim independent inquiry occurred |
| Discovery learning | Learners find patterns or relationships through exploration | Timeline, destination browsing, related records, and search | We can show discoverable relationships; not claim all users discover them |
| Narrative learning | Stories help organize events and meaning | Museum sequence: purpose → journey → discovery → legacy | We can explain narrative structure; not claim a universal emotional response |
| Systems thinking | Learners see relationships among parts, processes, and outcomes | Mission/hardware status separation, relation graph, engineering explainers | We can identify systems-oriented design; not claim systems-thinking skill gain |

Research starting points:

- National Academies, *How People Learn II*: <https://nap.nationalacademies.org/catalog/24783/how-people-learn-ii-learners-contexts-and-cultures>
- National Research Council, *Inquiry and the National Science Education Standards*: <https://nap.nationalacademies.org/catalog/9596/inquiry-and-the-national-science-education-standards-a-guide-for-teaching-and-learning>
- Kolb, *Experiential Learning*: use a library or publisher copy; do not rely on an unsourced summary.
- Mayer, multimedia learning research: use peer-reviewed or publisher sources and record the exact edition used.

## 6. Storytelling assignment

Create three evidence-based stories from existing records. Recommended set:

1. **Ranger 7 — The last seventeen minutes:** purpose, close-up images, planned impact, and the transition from engineering test to later landing preparation.
2. **Surveyor 3 — A machine visited by its successors:** soft landing, surface study, remaining hardware, and Apollo 12’s later visit.
3. **Apollo 11 LRRR — A quiet experiment still answering questions:** passive instrument design, scientific purpose, and why “not transmitting” is not the same as “not useful.”

For each story include the beginning, purpose, design, journey, discovery, legacy, hardware status, source IDs, and one “do not assume” note. Verify the record before writing; these are recommended story candidates, not permission to invent missing details.

## 7. Personas and learning journeys

Create five realistic personas. Do not reduce them to demographics only:

- A 7-year-old who wants to know what a rover does.
- A 10-year-old who wants to design a mission.
- A casual adult who remembers Apollo but not spacecraft hardware.
- A teacher or facilitator looking for a short evidence-based activity.
- A space enthusiast who wants dates, sources, and status distinctions.

For each, write: entry question, likely route, expected confusion, desired outcome, evidence touchpoint, and limitation.

Example learning journey: “I heard that old machines were left on the Moon” → home problem panel → Museum artifact → status distinction → source list → Explorer timeline → related Academy lesson → quiz → local progress. State which links are real and which are your recommended path.

## 8. Deliverables and mastery

### Deliverables

- Academy report.
- Museum educational analysis.
- Explorer learning analysis.
- Three complete stories.
- Five personas.
- Five learning journeys.
- Ten education judge questions and answer keys.

### Beginner questions

1. What is the difference between a lesson and a journey?
2. Where is a lesson’s quiz implemented?
3. What does local progress prove?
4. Why does the Museum show sources?
5. How can Explorer support a learner who does not want a guided route?

### Intermediate questions

1. Trace `first-flight` from data to route to rendered steps.
2. Show how a lesson connects to an artifact.
3. Explain the difference between a narrative sequence and a source claim.
4. Demonstrate a quiz and explain the feedback behavior.
5. Identify one educational theory that fits a feature and one that would be overclaiming.

### Expert / judge questions

- **“Why is GRAVERSE more than an article website?”** Because it combines an evidence-linked collection with multiple interaction modes: guided learning, record-based storytelling, filterable discovery, relation links, source inspection, local progress, simulations, and accessible alternatives. Demonstrate these; do not merely list them.
- **“Did you measure educational effectiveness?”** Not in the current repository. The team can describe design intent and propose user studies, but must not claim measured impact.
- **“Why do three experiences matter?”** They meet different visitor questions: “teach me,” “tell me this machine’s story,” and “let me investigate.” All reuse the same records.
- **“What happens when an answer is unknown?”** The product keeps Unknown/Not recorded and explains limits rather than filling a gap with a guess.
- **“Why use games and simulations?”** They provide controlled opportunities to change conditions, receive feedback, or explore a concept; they are labelled toys or approximations and are not official spacecraft models or flight predictions.

## 9. Working checklist

- [ ] I can explain Academy, Museum, and Explorer in one sentence each.
- [ ] I can trace one lesson, one journey, and one artifact through the code/data.
- [ ] I distinguish designed educational support from measured impact.
- [ ] I can explain at least three theories and a concrete product example for each.
- [ ] I wrote three stories with evidence and limits.
- [ ] I observed at least one unfamiliar person or clearly labelled the work as a planned study.
- [ ] I added unanswered educational questions to `team/shared/OPEN_QUESTIONS.md`.

