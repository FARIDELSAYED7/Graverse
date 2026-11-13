# GRAVERSE — Pitch & Presentation (Competition)

> **الملف (11)**.

---

## 1. Elevator pitches

### 15 seconds (English)
"GRAVERSE is one source-linked archive where a mission and its hardware are finally treated as two different things—so the same record teaches, exhibits, and lets you explore."

### 30 seconds (Arabic)
«المهمة قد تنتهي، لكن الشيء الذي تركته وراءها يظل يحمل قصة. GRAVERSE متحف رقمي تفاعلي يجعل هذه القصة قابلة للتعلم والفهم والاكتشاف. نبدأ من سجل موثق لعتاد على القمر والمريخ والفضاء العميق، ثم نعرضه في Academy وMuseum وExplorer، مع فصل واضح بين حالة المهمة وحالة العتاد ومصادر كل ادعاء.»

### 90 seconds (English)
"A mission can end without an object disappearing. GRAVERSE is an interactive digital museum for NASA hardware left on the Moon, Mars, and in deep space. We turn one verified collection into three complementary experiences: Academy teaches it, Museum gives each artifact a documented identity, and Explorer connects time, place, mission, and science. The important distinction is between mission status and hardware status; the record may say a mission ended while hardware remains, travels, or is simply unknown. We also expose provenance and label estimates, simulations, and unknowns rather than presenting them as facts. GRAVERSE is not a complete NASA census or live telemetry system. It is a transparent storytelling and learning layer that helps people understand what the hardware made possible."

---

## 2. Three-minute project narrative

- **Problem (30s):** Since 1960s NASA left hardware across solar system. School-age enthusiasts hear only active missions. One machine's story scattered across mission pages, image libraries, archives. Finished missions—great teaching material—written for adults.
- **Record (45s):** One artifact example: Apollo 11 LRRR. Mission completed 1969; hardware still operating today, measuring lunar recession. Two statuses, one record.
- **Three experiences (60s):** Academy (age-banded lessons, journeys, quizzes, playground) teaches; Museum (identity, narrative, sources) exhibits; Explorer (timeline, filters, 3D+2D) discovers. Same data, different reading modes.
- **Proof (30s):** Sources with access dates; original NASA wording preserved; claim labels; verification gates (21 tests, 50 smoke, 38 axe, 30 journeys, 192 links).
- **Limits + distinction (15s):** Curated 30, not exhaustive; no live telemetry; no measured outcomes. Mission ending is not object disappearance.

---

## 3. Five-minute technical presentation

Structure: Problem → Insight → Solution → Demo → Scientific value → Educational value → Innovation → Evidence.

1. **Problem (45s):** challenge + scattered info + adult-oriented.
2. **Insight (30s):** mission ≠ hardware; "abandoned" = heritage, not dead.
3. **Solution (45s):** one verified collection, three reading modes, provenance in model+UI.
4. **Demo (90s):** Museum artifact (two statuses) → Explorer filter/URL → Academy lesson/quiz → source link.
5. **Scientific value (30s):** sources, original wording, claim labels, uncertainty notes, validation.
6. **Educational value (30s):** age bands, journeys, quizzes, playground; design intent (no measured outcomes).
7. **Innovation (30s):** semantic status separation (type-level); integration; honest limits.
8. **Evidence (30s):** verification gates + recorded results.

**Why this order works:** starts with human problem (curiosity), reveals insight, shows solution, proves with demo, then scientific/educational/innovation, ends with evidence. Judges remember story + proof.

---

## 4. Experience explanations (for Q&A)

- **Academy:** "Teaches the collection with age-banded lessons, journeys, quizzes, and toy playground games. No accounts; progress is local and validated."
- **Museum:** "Gives each artifact a documented identity: purpose, timeline, both statuses side by side, fate, location, contributions, sources, uncertainty."
- **Explorer:** "Lets you query the collection by time, place, type, status; timeline (primary or all events); 3D orrery with accessible 2D map; bodies and deep sky with claim labels."

---

## 5. Five strongest differentiators

1. Semantic separation of mission vs hardware status (type/component/data levels).
2. Same record across three reading modes (consistency).
3. Provenance as part of model + UI (sources, original wording, claim labels, dataNotes).
4. Derived communication status labelled as derived (not telemetry) + freshness snapshot.
5. Explicit missing-data states + published honest limitations.

---

## 6. Five most important limitations (how to discuss)

1. **Curated 30, not exhaustive** → "The challenge asks 'some or all'; we chose a verified set."
2. **No live telemetry** → "Communication status is derived and labelled as such."
3. **Simulations are educational** (S01/S05 bugs, S06 dead knob) → "Labelled 'Simulated' with approximation notes; one (S04) uses real vis-viva."
4. **No measured educational outcomes** → "Design intent, not proven impact."
5. **No screen-reader session** → "Automated axe + keyboard; we didn't run screen readers."

**How to discuss:** state plainly, then pivot to what IS verified.

---

## 7. Ten most difficult judge questions

1. "This is just a pretty website." → show schema + source.
2. "Your data is tiny." → curated+verified > large+unchecked.
3. "Are simulations correct?" → disclose bugs; S04 real.
4. "No user testing." → disclose; automated gates.
5. "Features stitched together." → one data model; acknowledge museum↔supporting gap.
6. "Why trust NASA facts?" → sources + original wording + notes; 4 dead links.
7. "Arabic incomplete." → interface only; stated.
8. "Why not NASA APIs?" → static/verifiable/offline; trade-off.
9. "Can a kid use this?" → designed for; not tested.
10. "Biggest weakness?" → simulations bugs + export query + no user study.

(See 09 for full answers.)

---

## 8. Live demo script

See 10 §4. Key: start with story (Ranger 7), then two statuses, then 3D gallery, then Explorer link, then Academy + badge, then S04, then Research honest limits, then /sources link open, then verification gates, then closing line.

---

## 9. Speaking responsibilities (without inventing identities)

Suggest roles (assign to actual team members):
- **Narrator/thesis:** problem + insight + closing.
- **Technical:** architecture + data model + validation.
- **Demo driver:** live navigation.
- **Science/accuracy:** sources + provenance + status separation.
- **Education:** Academy + playground.
- **Q&A coordinator:** triage + honest limits.

---

## 10. Cross-references

00, 07, 09, 10.