# GRAVERSE — Flashcards, Glossary & Study Plan

> **الملف (12)**.

---

## 1. Flashcards (EN term → AR explanation)

| Front | Back |
|---|---|
| Mission status | حالة المهمة (planned/ongoing/completed/ended/lost-contact/unknown) |
| Hardware status | حالة الشيء (operating/inactive/no-longer-communicating/impacted/destroyed/still-traveling/unknown) |
| Communication status | label مشتق (communicating/lost-contact/intermittent/not-applicable/unknown) |
| Provenance | مصدر/سياق الادعاء |
| Confirmed | يصرح به المصدر مباشرة |
| Estimated | تقريب/نطاق/model-derived |
| Simulated | حساب GRAVERSE (ليس observation) |
| Unknown | غير مثبت (لا قيمة مختلقة) |
| Server Component | default route rendering (data at build time) |
| Client Component | state/browser/interaction/WebGL |
| Canonical data | Artifact في types/data |
| Static snapshot | بيانات محلية بتاريخ تحقق |
| Academy | Learn (age-banded) |
| Museum | Understand (identity/context/source) |
| Explorer | Discover (query/compare/spatial) |
| relatedIds | روابط بين القطع |
| sourceIds | مراجع السجل |
| lastVerified | تاريخ التحقق |
| generateStaticParams | بناء صفحات IDs |
| notFound | ID غير موجود |
| Zod | runtime validation |
| R3F | React renderer for Three.js |
| Drei | helpers for R3F |
| SSG | static site generation |
| RTL | right-to-left (Arabic) |
| axe | automated a11y checks |
| LCP | Largest Contentful Paint |
| CLS | Cumulative Layout Shift |

---

## 2. Glossary (selected terms)

- **Artifact:** documented piece of space hardware (30 in collection).
- **Mission status:** did objectives complete?
- **Hardware status:** what is object doing now?
- **Derived:** computed from existing records, labelled.
- **Claim label:** confirmed/estimated/simulated/unknown.
- **Source record:** id/org/title/url/type/accessedAt/notes.
- **Relation graph:** typed bidirectional edges (581).
- **SSG:** static generation at build time.
- **Client island:** browser-interactive component in server page.
- **Progressive enhancement:** works without WebGL/JS (fallbacks).
- **Reduced motion:** respects prefers-reduced-motion.
- **Freshness:** current/recent/snapshot by lastVerified age.

---

## 3. Study plan (6 levels)

### Level 1 — Big Picture
- **Objectives:** understand product, challenge, thesis, limits.
- **Docs:** 00, 01, 07.
- **Concepts:** three experiences, mission≠hardware, curated scope.
- **Self-test (no looking):** What is GRAVERSE? What challenge? What is the thesis? What must you not claim?
- **Practice:** open `/`, read panels; explain in 60s.
- **Code exercise:** read `src/app/page.tsx`.
- **Mastery checklist:** can pitch 30s; can list 5 limits.

### Level 2 — Three Experiences
- **Objectives:** master Academy/Museum/Explorer.
- **Docs:** 05, 06.
- **Concepts:** age bands, lessons, journeys, museum detail, explorer filters, 3D fallbacks.
- **Self-test:** What does each experience do? Why three? How does a visitor journey look?
- **Practice:** complete First Flight journey; open Apollo 11 LRRR; filter Explorer.
- **Code exercise:** read `lib/explore.ts` (searchScore, timelineEntries).
- **Mastery checklist:** can demo each in 2 min.

### Level 3 — Architecture
- **Objectives:** stack, routing, components, data flow, folders.
- **Docs:** 02, 03.
- **Concepts:** Next.js, RSC, client islands, SSG, theming, 3D progressive enhancement, i18n.
- **Self-test:** What is a client island? How is SSG done? How does theming work?
- **Practice:** run `npm run build`; inspect routes.
- **Code exercise:** read `src/app/museum/[id]/page.tsx`, `lib/progress.ts`.
- **Mastery checklist:** can walk contract→data→logic→UI.

### Level 4 — Data & Science
- **Objectives:** records, statuses, sources, provenance, validation.
- **Docs:** 04, 06.
- **Concepts:** Artifact schema, mission vs hardware, claim labels, derived records, validation, missing data.
- **Self-test:** What is an Artifact? Why separate statuses? What are claim labels? How is unknown represented?
- **Practice:** open `/sources`; explain one source.
- **Code exercise:** read `types/artifact.ts`, `lib/mission-control.ts`, `lib/provenance.ts`.
- **Mastery checklist:** can add an artifact (steps).

### Level 5 — Innovation & Philosophy
- **Objectives:** differentiation, theory, central question.
- **Docs:** 07, 08.
- **Concepts:** competitors, differentiators, educational theories, space heritage, mission vs legacy.
- **Self-test:** What is genuinely defensible? What do competitors do better? Central question?
- **Practice:** compare with NASA Eyes/NSSDCA.
- **Code exercise:** none (conceptual).
- **Mastery checklist:** can answer "why should you win?" honestly.

### Level 6 — Defend
- **Objectives:** judge Q&A, demo, pitch.
- **Docs:** 09, 10, 11.
- **Concepts:** 266 questions, demo script, failure plan, pitches.
- **Self-test:** answer 20 random questions without looking; deliver 90s pitch.
- **Practice:** mock judge session (scientific + technical + 8-year-old).
- **Code exercise:** live walkthrough of architecture.
- **Mastery checklist:** handles hostile questions; discloses limits.

---

## 4. Daily exercise (from original)

Pick a random artifact; explain in 60s: identity, purpose, event, mission status, hardware status, fate, source, limitation. Then answer 5 random questions from 09 without opening files. Any answer without evidence = gap, not guess.

## 5. Team test

One member plays scientific judge, one technical, one 8-year-old. Each asks a different question about the same artifact. Success = same fact, different language—not marketing copy.

---

## 6. Cross-references

All files in `docs/study/`. Index: `INDEX.md`.