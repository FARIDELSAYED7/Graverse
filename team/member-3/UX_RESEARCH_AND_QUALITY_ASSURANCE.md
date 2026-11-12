# Product Experience, UX Research & Quality Assurance — Complete Member Guide

## Your mission

You own the visitor’s experience of GRAVERSE. You do not need to code. You need to observe carefully, reproduce problems, distinguish defects from preferences, and report evidence so the Founder can make informed decisions.

## 1. Functional versus usable

**Functional** means the software can perform an operation under expected conditions. **Usable** means a person who does not know the implementation can understand what to do, do it, and interpret the result.

Example: search may return results correctly, yet a new visitor may not know that it searches lessons and missions as well as artifacts. QA checks the result; UX research checks the person’s understanding.

Use this five-question format for every test:

- **What?** What behavior or experience is being tested?
- **Why?** Why does it matter to the visitor or challenge?
- **How?** What exact actions will be performed?
- **Evidence?** What screenshot, recording, console message, URL, or observation supports the result?
- **Limitation?** What was not tested, and what should not be claimed?

## 2. Product familiarization

Explore each page once before testing it. Record first impression, purpose, entry point, next action, and evidence route.

| Surface | What to learn | Actual route |
|---|---|---|
| Home | Problem, three doors, counts, search, provenance promise | `/` |
| Explorer | Timeline, destination, artifact modes, filters, list alternative | `/explorer` |
| Museum | Collection, story-first records, statuses, sources | `/museum` and `/museum/[id]` |
| Academy | Age bands, journeys, lessons, quizzes, progress | `/academy` |
| Mission Control | Mission/hardware/derived communication distinction | `/mission-control` |
| Engineering | Seven explainers connected to hardware questions | `/engineering` |
| Stories | Curated paths through existing records | `/stories` |
| Research Archive | Method, source hierarchy, uncertainty, limits | `/research` |
| Simulations | Eight educational approximations | `/simulations` |
| Compare | Side-by-side records and documented values | `/compare` |
| My Universe | Local favourites, collections, recent records | `/my-universe` |
| Search | Cross-collection query and kind filters | `/search` |

Read `docs/ACCESSIBILITY.md`, `docs/DEMO_GUIDE.md`, and `docs/PERFORMANCE.md` before declaring a result.

## 3. Test log template

```text
Test ID:
Date/time:
Tester:
Browser and version:
OS:
Viewport:
Locale and direction:
Route:
Precondition:
Task:
Expected result:
Observed result:
Evidence path:
Severity: blocker / critical / major / minor / observation
Reproducible: always / often / once / not reproduced
Accessibility impact:
Suggested next action:
```

Do not write “broken” without the action and expected behavior. Do not edit production code to make a test pass.

## 4. User journey tests

### Journey A — Discover an artifact

1. Start at `/`.
2. Choose **Explore the timeline** or search for “Apollo”.
3. In Explorer, switch to a destination or artifact view.
4. Apply one destination filter and one decade filter.
5. Select an event or artifact.
6. Open the Museum record.

Expected: the visitor reaches a record with name, mission, destination, purpose, timeline, status distinction, and source path. The URL should preserve Explorer filters where applicable. Possible failures: unclear first action, filter labels not understood, event preview not obviously clickable, or a link that loses context.

### Journey B — Understand a mission

1. Open `/museum`.
2. Choose `apollo-11-lm-descent-stage` or another known record.
3. Read overview, purpose, journey, science, fate, and provenance.
4. Open the linked mission page.
5. Open the agency page if present.

Expected: the visitor can explain what the hardware was, why it was sent, what happened, and how the mission/hardware statuses differ. Possible failures: original wording hidden too far down, derived communication label mistaken for live telemetry, or related link meaning unclear.

### Journey C — Complete a learning experience

1. Open `/academy`.
2. Choose an age band and `/academy/journeys/first-flight`.
3. Open one linked lesson.
4. Read objectives and sections.
5. Answer a quiz question.
6. Reload or open `/academy/progress`.

Expected: the next step is clear, a quiz gives feedback, and local progress persists. Limitation: this does not prove learning. Possible failures: age band unclear, quiz feedback not noticed, progress persistence confusing, or local-only nature misunderstood.

### Journey D — Compare artifacts

1. Open `/compare`.
2. Select two records with different destinations or status.
3. Compare mission status, hardware status, dates, type, and documented values.
4. Follow one record to Museum.

Expected: only documented values are shown; Unknown remains visible; the comparison does not imply that unlike fields are directly equivalent. Record any table overflow at phone widths.

### Journey E — Run a simulation

1. Open `/simulations`.
2. Choose a model, such as landing, power, communication, orbit, rover, planning, what-if, or failure.
3. Change one control at a time.
4. Read the result and approximation note.
5. Reset and try a second condition.

Expected: the user sees that this is a teaching model, receives a visible result, and can reset. Do not call the output a NASA prediction or flight result.

### Journey F — Save a favourite

1. Open an artifact.
2. Use the favourite action.
3. Open `/my-universe`.
4. Create or inspect a collection.
5. Reload.

Expected: the local item remains in the same browser profile and the UI says it is local-only. Limitation: no account or cloud sync.

### Journey G — Search a historical record

1. Open `/search?q=apollo`.
2. Observe result count and kinds.
3. Filter to artifact or mission.
4. Open a result.
5. Search for a nonsense query such as `zzzz-not-real`.

Expected: cross-collection results, understandable kind labels, a useful empty state, and direct links. Actual search logic is in `src/lib/search-index.ts`; the kinds include artifacts, missions, bodies, deep sky, lessons, journeys, articles, agencies, glossary, engineering, stories, simulations, and research.

## 5. Responsive testing

Test at exact CSS viewport widths: **360, 390, 768, 1024, 1440, and 1920 px**. Use browser device emulation or a real window and record the viewport, not just the screen size.

At each width check:

- Header, menu, and skip link.
- First heading and primary action.
- Cards and grids.
- Timeline labels and filter controls.
- Artifact status and source lists.
- Tables and comparison panels.
- Long English and Arabic text.
- 3D fallback and visible 2D alternative.
- No horizontal scroll unless intentionally documented.
- Focus ring visibility and order.

An overflow that does not block comprehension may be a minor issue; an off-screen primary action or unreachable control is more serious. Capture a screenshot with the viewport dimensions visible when possible.

## 6. Arabic and English testing

`src/lib/i18n.ts` defines English and Arabic locale metadata, and `src/lib/locale.ts` reads the locale. The root HTML receives `lang` and `dir`; shared layout uses logical properties. The project is intentionally partially localized: interface chrome is translated, while editorial artifact, lesson, and story prose remains English-only.

Test:

- Toggle English → Arabic → English.
- Confirm `lang="ar"` and `dir="rtl"` in the DOM.
- Check the header, footer, buttons, labels, badges, and filters.
- Check mixed English editorial text, dates, IDs, measurements, and punctuation.
- Check that controls remain in a logical order and icons do not obscure text.
- Check search and empty states.
- Test at 390px and 1440px.

Do not report English editorial prose as a defect if the documented scope says it is intentionally English-only; do record confusion if the interface fails to make that scope understandable.

## 7. Accessibility testing

### What is implemented according to the repository

`docs/ACCESSIBILITY.md` documents semantic landmarks, skip link, labelled navigation, visible focus, keyboard menu behavior, reduced motion, accessible 2D alternatives, no-WebGL paths, source labels, and automated axe/keyboard checks. Use it as an implementation reference, not as a substitute for observation.

### Practical keyboard checklist

- [ ] First Tab reaches the skip link.
- [ ] Enter activates “Skip to main content.”
- [ ] Header menu opens with Enter/Space.
- [ ] Focus moves into the open menu.
- [ ] Escape closes it and restores focus to the trigger.
- [ ] All filters, selects, links, buttons, quizzes, simulations, and favourite actions are reachable.
- [ ] Explorer list view is usable without the visual timeline.
- [ ] Orrery meaning is available in the SVG map and plain destination list.
- [ ] Playground controls and feedback are outside the canvas.
- [ ] Rover Quest accepts arrow keys/WASD through its focused control panel.
- [ ] Reduced motion changes animation behavior.
- [ ] Focus is visible against both Academy and dark surfaces.

### What not to claim

Do not claim a screen-reader audit unless you perform and record one with VoiceOver, NVDA, or another screen reader. Axe results do not prove complete accessibility. Canvas-specific issues may not be detected by axe.

## 8. Small user study

Use 3–5 people unfamiliar with GRAVERSE, with appropriate supervision and consent. Do not collect names, unnecessary personal data, or sensitive information. For children, use a responsible adult and follow the event’s rules.

### Procedure

1. Explain that you are testing the product, not the person.
2. Give one task at a time without teaching the route.
3. Ask the participant to think aloud only if comfortable.
4. Do not rescue immediately; note where they pause.
5. Ask what they expected to happen.
6. Ask what they learned or still wonder about.
7. Thank them; remove identifying notes.

### Observation form

| Task | Started at | First action | Hesitation | Success? | Evidence understood? | Quote/paraphrase | Severity |
|---|---|---|---|---|---|---|---|
| Find an artifact | Home |  |  |  |  |  |  |
| Explain status | Museum |  |  |  |  |  |  |
| Complete lesson | Academy |  |  |  |  |  |  |

### Feedback questions

- What did you think GRAVERSE was for?
- What did you expect to find first?
- Which words were unfamiliar?
- Where did you feel confident?
- Where did you hesitate?
- What made you trust or question a fact?
- Did “Unknown” make sense?
- Did the 3D content help, distract, or make no difference?
- What would you show another person?

## 9. Deliverables

- UX report with method and limitations.
- Test results for the seven journeys.
- Screenshots and reproduction steps.
- User feedback and observation notes.
- Severity-ranked problem list.
- Ten usability judge questions with answer keys.

Suggested severity rubric:

- **Blocker:** cannot complete a core journey.
- **Critical:** misleading or inaccessible core information.
- **Major:** common route is substantially confusing or broken.
- **Minor:** inconvenience or isolated visual defect.
- **Observation:** preference, question, or improvement idea without clear defect.

## 10. Mastery test

### Beginner

1. What is the difference between UX research and QA?
2. Why test with someone unfamiliar?
3. What does a reproducible bug report contain?
4. What is the 390px test for?
5. Why can’t axe results prove complete accessibility?

### Intermediate

1. Demonstrate the Explorer filter journey and record the URL.
2. Test the no-WebGL path and state what remains usable.
3. Use keyboard-only navigation to open and close the mobile menu.
4. Compare English and Arabic at 390px.
5. Report one issue with severity and evidence.

### Critical judge questions

- **“Did you test real users?”** State the number, audience, tasks, method, and limitations. If not yet done, say it is a planned study; do not invent results.
- **“Is it accessible?”** Describe documented semantics, keyboard checks, axe automation, and known limitations; do not claim certification.
- **“What if WebGL fails?”** Explorer has an accessible SVG/list alternative; playground controls and feedback have a no-WebGL path.
- **“Does Arabic translate everything?”** No. Interface chrome is translated; editorial prose is intentionally still English-only.
- **“How did you prioritize problems?”** By impact on core journey, misleadingness, accessibility, frequency, and reproducibility.

## 11. Checklist

- [ ] I can use all major routes without asking the Founder where to click.
- [ ] I tested all seven journeys.
- [ ] I tested six viewport widths.
- [ ] I tested English/Arabic and RTL/LTR.
- [ ] I completed the keyboard checklist.
- [ ] I separated automated evidence, manual observation, and user feedback.
- [ ] I did not change production code.
- [ ] I added unresolved questions to `team/shared/OPEN_QUESTIONS.md`.

