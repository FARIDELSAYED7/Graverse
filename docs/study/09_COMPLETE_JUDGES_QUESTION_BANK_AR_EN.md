# GRAVERSE — بنك أسئلة الحكام (260+)

> **الملف (09)**. كل سؤال: A (English) · B (فهم AR) · C (إجابة AR) · D (English ready) · E (evidence) · F (follow-up) · G (caution).
> الإجابات تعكس التطبيق الفعلي. الميزات غير المنفذة تُذكر صراحةً.

---

## 1. Challenge understanding & problem definition (1–22)

### Q1. What is the challenge you are solving?
**A.** What is the challenge you are solving?
**B.** ما المشكلة (وليس ما المنتج)؟
**C.** التحدّي NASA Space Apps 2026: "Abandoned but not Forgotten" — سرد عتاد NASA المتروك على Moon/Mars/deep space (منذ 1960s) لجمهور school-age/casual، مع accuracy. المشكلة المعرفية: المعلومة عن آلة واحدة موزّعة على صفحات missions ومكتبات صور وأرشيفات تقنية؛ من يبحث عن mission منتهية (وهي تعليمية بامتياز) يجد نصًّا تقنيًّا للبالغين، لا قصة.
**D.** "Since the 1960s NASA has left hardware across the solar system. The challenge asks us to tell the story of some of it for school-age enthusiasts, with accuracy. The real problem is that one machine's story is scattered across mission pages, image libraries and technical archives, and finished missions—great teaching material—are written for adults. GRAVERSE puts one verified collection into three reading modes so the same record teaches, exhibits, and lets you explore."
**E.** `docs/GRAVERSE_COMPETITION_BRIEF_AR.md` §1; official page (accessed 2026-11-11).
**F.** "How is this different from a NASA page?" → integration + status separation.
**G.** Do not claim NASA endorsement or official dataset.

### Q2. Is this just a catalog of abandoned spacecraft?
**A.** Is this just a catalog of abandoned spacecraft?
**B.** هل هو مجرد قائمة؟
**C.** لا. التحدّي نفسه لا يطلب catalog. GRAVERSE: سرد (stories, journeys, narrative sequence) + تعليم (lessons/quizzes) + استكشاف (filters/timeline) + provenance. "Abandoned" في الاسم = إرث (heritage)، لا "ميت".
**D.** "No. The challenge asks for storytelling, not cataloguing. GRAVERSE is one verified collection read three ways—Academy teaches it, Museum gives each artifact a documented identity, Explorer connects time, place, mission and science. 'Abandoned' here means heritage, not dead."
**E.** `src/app/page.tsx`, `docs/GRAVERSE_COMPETITION_BRIEF_AR.md` §2.
**F.** "Where is the storytelling?" → Museum narrative + Stories.
**G.** Do not say "all NASA artifacts".

### Q3. Does every piece of hardware have to be inactive?
**A.** Does every piece of hardware have to be inactive?
**B.** هل يجب أن يكون كل عتاد غير فعال؟
**C.** لا. التحدّي ينص: "From rovers and instruments that completed their science missions to probes still traveling away from Earth". GRAVERSE يشمل still-operating (Apollo 11 LRRR) وstill-traveling (Voyager). الفصل mission/hardware status يمكّن ذلك.
**D.** "No—the challenge explicitly includes probes still traveling. GRAVERSE deliberately separates mission status from hardware status, so a completed mission can still have operating hardware, like the Apollo 11 retroreflector still measuring lunar recession today."
**E.** `types/artifact.ts` (HardwareStatus includes operating/still-traveling); official summary.
**F.** "Give an operating example." → LRRR.
**G.** Do not imply all operating statuses are live telemetry.

### Q4. Do you need a complete database of every NASA artifact?
**A.** Do you need a complete database of every NASA artifact?
**B.** هل يجب جرد كامل؟
**C.** لا. التحدّي: "some or all of this equipment". GRAVERSE = curated 30 pieces (deliberately finite, checked). "Counts are ceilings deliberately kept small. A smaller, checked set is more useful than a large unchecked one." (`docs/DATA_AND_PROVENANCE.md`).
**D.** "No—the challenge says 'some or all'. We chose a curated, verified set of 30 pieces. A smaller checked set is more useful than a large unchecked one, and every claim cites a source."
**E.** `docs/DATA_AND_PROVENANCE.md` Datasets table; `docs/DEMO_GUIDE.md` "Do not claim".
**F.** "Why only 30?" → verification cost + accuracy.
**G.** Do not claim "most complete" or "comprehensive".

### Q5. Who is the primary audience?
**A.** Who is the primary audience?
**B.** من الجمهور؟
**C.** school-age space enthusiasts + casual space enthusiasts (official). GRAVERSE: Academy 5-12 (age bands), Museum general reader, Explorer curious researcher. Also teachers/researchers via sources/export.
**D.** "School-age and casual space enthusiasts, per the challenge. GRAVERSE serves them through Academy's age bands (5-7/8-9/10-12), Museum's readable records, and Explorer's query tools. Teachers and researchers get sources and open data."
**E.** `docs/GRAVERSE_COMPETITION_BRIEF_AR.md` §5; `src/data/lessons.ts`.
**F.** "Is it too technical for kids?" → age bands + plain language.
**G.** Do not claim validated pedagogy for age bands.

### Q6. What does "storytelling" mean here?
**A.** What does "storytelling" mean in this challenge?
**B.** ما 의미 "سرد"؟
**C.** التحدّي: "translate complex historical and scientific data into an engaging narrative"; "showing how these missions operated rather than listing facts"; "draw clear connection between engineering of hardware and scientific knowledge gained"; accuracy important. GRAVERSE: narrative sequence (purpose→journey→science→fate), Stories surface, events with descriptions, journeys.
**D.** "It means turning dense technical records into a narrative that connects purpose, design, action, discovery and legacy—not listing facts. Our Museum pages follow that sequence, and Stories and Academy journeys turn records into readable paths."
**E.** official "Potential considerations"; `src/data/stories.ts`, `src/app/museum/[id]/page.tsx`.
**F.** "Show me the story." → Museum artifact page.
**G.** Do not overstate narrative originality.

### Q7. What is the difference between explicit requirements and your additions?
**A.** What is the difference between the explicit challenge requirements and your additional product decisions?
**B.** ما المطلوب vs ما أضفناه؟
**C.** مطلوب: identify hardware, explain what/why, missions, discoveries, importance, storytelling, engineering-science link, school-age audience, accuracy. إضافات GRAVERSE: فصل mission/hardware status، claim labels، local progress، 3D playground، simulations، My Universe، Arabic، Research Archive، Compare/Export. (انظر 07 §3).
**D.** "Required: identify hardware, explain it, link missions and science, tell stories, connect engineering to science, reach school-age readers, stay accurate. Our additions—status separation, claim labels, local progress, simulations, playground, Arabic, research archive—support those but are our product choices, not the challenge's demands."
**E.** `docs/study/07_CHALLENGE_MAPPING_AND_DIFFERENTIATION_AR.md` §2-3.
**F.** "Which addition is most defensible?" → status separation.
**G.** Do not present additions as required.

### Q8. Why focus on Moon, Mars and deep space?
**A.** Why focus on the Moon, Mars and deep space?
**B.** لماذا هذه الوجهات؟
**C.** لأن التحدّي يطلب "Moon, Mars, and elsewhere"; three contexts differ in heritage (lunar surface preservation, Martian operations, deep-space travel). GRAVERSE groups by destinationGroup (moon/mars/deep-space) with counts.
**D.** "The challenge names the Moon, Mars and elsewhere. We cover all three: lunar surface hardware, Martian rovers/landers, and deep-space probes. Each context teaches a different heritage story—preservation, operations, longevity."
**E.** `types/artifact.ts` DestinationGroup; `lib/explore.ts` countByDestination.
**F.** "Which destination has most artifacts?" → check dataset.
**G.** Do not invent counts without verifying.

### Q9. Are you replacing NASA's own sites?
**A.** Are you replacing NASA's own websites?
**B.** هل تحلّون محل NASA؟
**C.** لا. GRAVERSE = طبقة سرد/تعليم/استكشاف فوق سجلات NASA (normalized from public NASA mission pages + NSSDCA). `/about` states origin. "NASA Eyes wins on realism; NSSDCA on technical depth. We combine, not replace." (brief §7).
**D.** "No. We are a storytelling and learning layer on top of public NASA records. NASA Eyes and NSSDCA do things we don't—realism and technical depth. We combine documented records, age-designed learning and exploration, not replace sources."
**E.** `docs/GRAVERSE_COMPETITION_BRIEF_AR.md` §7; `docs/DEMO_GUIDE.md` "Do not claim".
**F.** "What do you do better than NASA?" → integration, honesty.
**G.** Never claim NASA endorsement.

### Q10. What makes this educational rather than just informative?
**A.** What makes this educational rather than just informative?
**B.** ما الذي يجعله تعليميًّا؟
**C.** Academy: age bands, lessons with objectives, quizzes with explanations, journeys (sequenced), flashcards (retrieval), playground (active), progress. Museum: narrative sequence. Explorer: query-driven discovery. But: no measured outcomes (design intent only).
**D.** "Academy has age-banded lessons with objectives and quizzes, sequenced journeys, flashcards, and active playground games—all tied to the same verified records as the Museum. But we have not measured learning outcomes; that's design intent, not proven impact."
**E.** `src/data/lessons.ts`, `src/data/journeys.ts`, `src/data/games.ts`.
**F.** "Prove it works." → cannot; disclose limitation.
**G.** Do not claim educational outcomes without user study.

---

## 2. Product vision & GRAVERSE identity (23–44)

### Q11. What is GRAVERSE in one sentence?
**A.** What is GRAVERSE in one sentence?
**B.** ما GRAVERSE في جملة؟
**C.** "مهمّة الفضاء لا تنتهي بانتهاء المهمّة. الآلة قد تتوقّف، لكن ما تعلّمته يبقى — وأحيانًا تبقى الآلة هي التي تستمرّ." أو "One verified collection, three different ways in, and every claim says how well it is established."
**D.** "GRAVERSE is one source-linked archive where a mission and its hardware are finally treated as two different things—so the same record teaches, exhibits, and lets you explore."
**E.** `docs/GRAVERSE_COMPETITION_BRIEF_AR.md` §12.
**F.** "Say it simpler for a child." → "This machine built in 1969 still measures the Moon's shape."
**G.** Avoid marketing fluff; keep evidence.

### Q12. Why the name "GRAVERSE"?
**A.** Why the name "GRAVERSE"?
**B.** لماذا الاسم؟
**C.** تفسير معقول: graves (أثر) + universe (كون) = "أثر في الكون". **لم يُوثَّق** naming rationale في المستودع (unknown). لا تدّعِ أصلًا موثّقًا.
**D.** "Honestly, the repository doesn't document the naming rationale. 'GRAVERSE' reads as 'grave'—a resting place—plus 'universe': space heritage. We can't point to a documented origin, so we don't over-claim it."
**E.** No file documents name origin (verified by search).
**F.** "Who named it?" → unknown.
**G.** Do not invent naming story.

### Q13. What are the three core experiences?
**A.** What are the three core experiences?
**B.** ما التجارب الأساسية؟
**C.** Space Academy (`/academy`): learn. Museum (`/museum`): understand. Explorer (`/explorer`): discover. كلها على مجموعة بيانات واحدة.
**D.** "Space Academy teaches, Museum gives each artifact a documented identity, Explorer connects time, place, mission and science—all from one verified collection."
**E.** `src/app/page.tsx`, `docs/ARCHITECTURE.md` §2.
**F.** "Which would you drop if forced?" → none; but Academy is the teaching layer.
**G.** Do not rank them as "most important" without evidence.

### Q14. Why three experiences instead of one?
**A.** Why three experiences instead of one?
**B.** لماذا ثلاث لا واحدة؟
**C.** لكل هدف معرفي: Academy = تسلسل+feedback (pedagogy); Museum = هوية+سياق+مصدر (curatorial); Explorer = مقارنة+استعلام (analytical). Shared data → consistency; difference in interface not truth.
**D.** "Each serves a different cognitive goal: Academy sequences and feeds back, Museum gives identity and context, Explorer lets you query and compare. Same data, different reading modes—so they never contradict."
**E.** `docs/study/05_...` §4; `docs/GRAVERSE_COMPETITION_BRIEF_AR.md`.
**F.** "Isn't that feature bloat?" → shared data model prevents drift.
**G.** Do not claim user research validated three.

### Q15. What are the supporting surfaces?
**A.** What are the supporting surfaces?
**B.** ما الأسطح المساندة؟
**C.** Mission Control, Engineering, Stories, Research, Simulations (8), My Universe, Compare, Search, Sources, About, Export. "مداخل متخصصة" (specialized entry points), not competing with core three.
**D.** "Mission Control, Engineering, Stories, Research Archive, eight Simulations, My Universe, Compare, Search, Sources, About and Export. They're specialized entry points into the same records, not competing products."
**E.** `docs/ARCHITECTURE.md` §2; `src/app/*`.
**F.** "Which is most useful to judges?" → Research (honest limits) + Sources.
**G.** Do not overstate any supporting surface.

### Q16. What is the value to a child?
**A.** What is the value to a child?
**B.** ما القيمة لطفل؟
**C.** "هذا الجهاز الذي بناه البشر عام 1969 لا يزال يقيس استدارة القمر" — علاقة، لا معلومة. Academy: age bands, journeys, quizzes, playground (toys), progress (no account). But no measured outcomes.
**D.** "A relationship, not a fact: 'this machine humans built in 1969 still measures the Moon's shape.' Age-banded lessons, journeys, quizzes and toy playground games, all local—no account needed. We haven't measured learning impact though."
**E.** `docs/GRAVERSE_COMPETITION_BRIEF_AR.md` §5.
**F.** "How do you know kids like it?" → no user study; disclose.
**G.** Do not claim proven engagement.

### Q17. What is the value to a teacher?
**A.** What is the value to a teacher?
**B.** ما القيمة لمعلّم؟
**C.** مسار كامل 25-45 دقيقة، بأهداف ومصادر جاهزة — وقت. Lessons with objectives, quizzes with explanations, journeys, articles, sources, export. No teacher dashboard (do not claim).
**D.** "A ready 25–45 minute path with objectives and sources—time saved. Lessons, quizzes with explanations, journeys, articles and open data. We don't have a teacher dashboard though."
**E.** `src/data/lessons.ts` (objectives, minutes), `src/data/journeys.ts`.
**F.** "Can a teacher track a class?" → no; local only.
**G.** Do not claim classroom features.

### Q18. What is the value to a researcher?
**A.** What is the value to a researcher?
**B.** ما القيمة لباحث؟
**C.** 96 مصدرًا بتاريخ وصول + dataNotes + JSON مفتوح (`/api/export`) + claim labels + derived records with original wording. But collection curated (30), not exhaustive.
**D.** "96 registered sources with access dates, uncertainty notes, open JSON export, and claim labels—auditable data. But it's a curated set of 30, not an exhaustive archive."
**E.** `docs/DATA_AND_PROVENANCE.md`; `/sources`, `/api/export`.
**F.** "Can I cite this?" → cite original NASA sources, not GRAVERSE.
**G.** Do not claim GRAVERSE is authoritative source.

### Q19. What is the product's "thesis"?
**A.** What is the product's thesis?
**B.** ما أطروحة المنتج؟
**C.** "المهمة لا تنتهي بانتهاء المهمّة." + "أفضل من catalog: فصل mission/hardware status." + "كل ادعاء says how well established." Central: mission and hardware are two different things.
**D.** "A mission and its hardware are two different things—and treating them as one produces historically wrong answers. That single distinction changes how we teach, record and remember space exploration."
**E.** `docs/GRAVERSE_COMPETITION_BRIEF_AR.md` §12.
**F.** "Prove it with one record." → Apollo 11 LRRR.
**G.** Avoid "revolutionary" language.

### Q20. What is the single most important design decision?
**A.** What is the single most important design decision?
**B.** ما أهم قرار تصميم؟
**C.** فصل `missionStatus` و`hardwareStatus` (semantic, type-level, component-level, data-level). "أقوى قرار معماري ليس بصريًّا بل دلالي." (analysis §1.3).
**D.** "Separating mission status from hardware status—enforced in the type system, the component, and the data (original wording required). It's a structural gap, not just a display choice."
**E.** `types/artifact.ts`, `components/ui/StatusBadge`, `lib/status.ts`.
**F.** "Show me the type." → disjoint unions.
**G.** Do not claim it's patented/novel in industry.

---

## 3. How solution addresses the challenge (45–66)

(Numbers continue; headings show Q numbers.)

### Q21. How does GRAVERSE introduce school-age enthusiasts to hardware?
**A.** How does GRAVERSE introduce school-age enthusiasts to hardware?
**B.** كيف introduce hardware للأطفال؟
**C.** Academy age bands + lessons + journeys + playground (toys) + Robot Lab. Museum cards. Explorer. All with plain language, visuals, interaction. But no user study.
**D.** "Through age-banded lessons, sequenced journeys, quizzes with explanations, and toy playground games—plus Museum cards and Explorer. Plain language and interaction, but we haven't measured outcomes."
**E.** `src/data/lessons.ts`, `src/data/games.ts`, `src/app/academy/*`.
**F.** "What age is too young?" → 5-7 band exists.
**G.** Do not claim validated age-appropriateness.

### Q22. How does it explain why hardware was sent?
**A.** How does it explain why hardware was sent?
**B.** كيف يشرح "لماذا أُرسل"؟
**C.** `scientificPurpose` + `overview` fields per artifact, source-backed. Lessons connect to purpose. Engineering surface explains design rationale.
**D.** "Each artifact record has a scientific purpose and overview, cited to sources. Lessons and the Engineering surface connect design to that purpose."
**E.** `types/artifact.ts` (scientificPurpose, overview); `data/engineering.ts`.
**F.** "Show Apollo 11 LM purpose." → artifact page.
**G.** Do not paraphrase NASA without source.

### Q23. How does it connect artifacts to missions?
**A.** How does it connect artifacts to missions?
**B.** كيف ربط artifacts-missions؟
**C.** `missionName`/`programName` on artifact; derived mission pages group artifacts by mission name (`missions.ts`); mission detail shows artifact cards; relation graph `mission-of`.
**D.** "Artifacts carry missionName/programName. Mission pages are derived from those records—grouped, not hand-copied—so they can't drift. The relation graph also links them."
**E.** `src/data/missions.ts`, `src/data/relations.ts`, ADR 0002.
**F.** "What if mission name typo?" → validation/test catches? IDs unique but name grouping manual; risk.
**G.** Do not claim automated mission-name validation.

### Q24. How does it show the science made possible?
**A.** How does it show the science made possible?
**B.** كيف يُظهر العلم؟
**C.** `scientificContributions` (title, summary, kind science/engineering) per artifact; Museum renders; Academy lessons reference; Stories. Source-backed.
**D.** "Each artifact lists scientific and engineering contributions with summaries, cited to sources, shown on the Museum page and referenced in lessons and stories."
**E.** `types/artifact.ts` Contribution; `src/app/museum/[id]/page.tsx`.
**F.** "Are contributions verified?" → sourceIds required on artifact (min 1), but per-contribution sourcing is dataNotes-level; claim labels not per-field on artifacts.
**G.** Do not claim per-contribution source verification.

### Q25. How does it tell engaging stories?
**A.** How does it tell engaging stories?
**B.** كيف سرد جذاب؟
**C.** Museum narrative sequence; Stories surface (8 curated paths); Academy journeys; Explorer timeline (chronology); 3D gallery; playground. But "engagement" not measured.
**D.** "Museum pages follow purpose→journey→science→fate; Stories offers curated reading paths; Academy journeys sequence steps; Explorer shows chronology. We claim design intent for engagement, not measured impact."
**E.** `src/data/stories.ts`, `src/app/museum/[id]/page.tsx`.
**F.** "Which story is best?" → demo pick (Apollo 11 LRRR).
**G.** Do not claim measured engagement.

### Q26. How does it connect engineering to science?
**A.** How does it connect engineering decisions to scientific achievements?
**B.** كيف ربط engineering-science؟
**C.** Engineering surface (7 explainers) linked to artifact records + sources; `technicalDetails` + `scientificContributions` kind engineering/science; simulations (mass/power/traverse) show trade-offs. "Draw clear connection between engineering of hardware and scientific knowledge gained" (official).
**D.** "The Engineering surface explains design decisions tied to specific artifacts and sources; technical details and engineering-kind contributions sit beside science-kind ones; simulations make trade-offs tangible."
**E.** `data/engineering.ts`, `types/artifact.ts`, `lib/simulations.ts`.
**F.** "Show an engineering decision." → Engineering page.
**G.** Do not overstate simulation fidelity.

### Q27. How does it preserve factual accuracy?
**A.** How does it preserve factual accuracy?
**B.** كيف حفظ الدقة؟
**C.** Sources (96) with org/title/url/type/accessedAt; Zod schemas; validator (8 checks); claim labels; original wording preserved; missing → unknown/dataNotes; tests (21); CI gate. But: 4 dead NASA links, claim model not per-field on artifacts.
**D.** "Every record cites sources with access dates; Zod schemas enforce shape; a build-time validator and 21 tests check citations, uniqueness, relations; original NASA wording is preserved beside normalized bands; missing values stay Unknown. We also publish an 'Honest limitations' section."
**E.** `docs/DATA_AND_PROVENANCE.md`, `scripts/validate-data.ts`, `tests/data.test.ts`.
**F.** "What's inaccurate?" → disclose bugs/links.
**G.** Do not claim NASA verified.

### Q28. How does it make historical info accessible?
**A.** How does it make historical information accessible?
**B.** كيف accessibility؟
**C.** Plain language (glossary), age bands, visual alternatives (2D maps), keyboard, reduced motion, RTL Arabic (interface), skip link, axe 0 violations. But no screen-reader session recorded.
**D.** "Plain-language glossary, age bands, 2D alternatives for every 3D view, keyboard operation, reduced motion, and Arabic interface chrome. Automated axe shows zero violations on 38 pages, but we did not run a screen-reader session."
**E.** `docs/ACCESSIBILITY.md`.
**F.** "Screen reader tested?" → no; disclose.
**G.** Do not claim WCAG certification.

### Q29. How do Academy/Museum/Explorer form a system?
**A.** How do Academy, Museum and Explorer form a coherent system?
**B.** كيف نظام متماسك؟
**C.** Shared data model (single source of truth) → consistency; shared components/tokens; cross-links; shared progress/personal; one identity, three reading modes. (07 §4)
**D.** "They share one data model, so records never contradict; shared components and tokens keep identity consistent; cross-links connect them; progress and personal state are shared. One collection, three reading modes."
**E.** `docs/study/07_...` §4; `docs/ARCHITECTURE.md`.
**F.** "What if data changes?" → all three update automatically.
**G.** Do not claim user-validated coherence.

---

## 4. Space science & historical accuracy (67–95)

### Q30. What is an artifact in GRAVERSE?
**A.** What is an "artifact" in GRAVERSE?
**B.** ما "artifact"؟
**C.** Museum object record (30): physical hardware left on Moon/Mars/deep space. Canonical `Artifact` interface (`types/artifact.ts`) with identity, mission, destination, type, descriptions, statuses, dates, events, contributions, fate, location, technical details, media, relations, sources, lastVerified, dataNotes.
**D.** "An artifact is one documented piece of space hardware—its record has identity, mission, destination, type, purpose, timeline, status, fate, location, specs, contributions, sources and verification date."
**E.** `src/types/artifact.ts`.
**F.** "Is it the physical object or the record?" → the record (digital).
**G.** Do not imply physical custody.

### Q31. What are the hardware types?
**A.** What hardware types exist?
**B.** ما أنواع العتاد؟
**C.** rover, lander, orbiter, probe, instrument, surface-equipment, aircraft (`HardwareType` union). Counts via `countByHardwareType`.
**D.** "Rover, lander, orbiter, probe, instrument, surface equipment and aircraft—seven types, counted from the collection."
**E.** `types/artifact.ts` HardwareType; `lib/explore.ts` countByHardwareType.
**F.** "Which type dominates?" → check dataset.
**G.** Do not guess counts.

### Q32. What is mission status?
**A.** What is "mission status"?
**B.** ما mission status؟
**C.** حالة المهمة: planned, ongoing, completed, ended, lost-contact, unknown. "Did the mission achieve its objectives?" Normalized band + original NASA wording preserved (`missionStatusOriginal`, zod min(1)).
**D.** "Mission status answers 'did the mission meet its objectives?'—planned, ongoing, completed, ended, lost contact or unknown—with NASA's original wording preserved beside our band."
**E.** `types/artifact.ts` MissionStatus; `schemas.ts`.
**F.** "Difference completed vs ended?" → completed = objectives met; ended = concluded (incl. controlled).
**G.** Do not equate ended with failure.

### Q33. What is hardware status?
**A.** What is "hardware status"?
**B.** ما hardware status؟
**C.** حالة الشيء الفيزيائي: operating, inactive, no-longer-communicating, impacted, destroyed, still-traveling, unknown. "What is the object doing now?"
**D.** "Hardware status answers 'what is the object doing now?'—operating, inactive, no longer communicating, impacted, destroyed, still traveling, or unknown."
**E.** `types/artifact.ts` HardwareStatus.
**F.** "inactive vs destroyed?" → inactive not destroyed.
**G.** Do not infer destruction from inactivity.

### Q34. Why must mission and hardware status be separate?
**A.** Why must mission status and hardware status be separate?
**B.** لماذا الفصل؟
**C.** لأن missio end ≠ object fate. Treating same → historically wrong (e.g., Apollo 11 mission completed but LRRR still operating; Ranger 7 mission succeeded but hardware impacted deliberately). Enforced type-level (disjoint unions), component-level (StatusBadge kind), data-level (original wording required).
**D.** "Because a mission ending doesn't tell you what the object is doing. Apollo 11's mission completed in 1969 while its retroreflector still works; Ranger 7's mission succeeded but its hardware impacted deliberately. We enforce the split in types, components and data."
**E.** `types/artifact.ts`, `components/ui/StatusBadge`, `docs/GRAVERSE_COMPETITION_BRIEF_AR.md` §4.
**F.** "Show me the type enforcement." → disjoint unions.
**G.** Do not claim this is the first-ever such separation.

### Q35. What does "communication status" mean?
**A.** What does "communication status" mean?
**B.** ما communication status؟
**C.** حالة ثالثة مشتقة (derived) من hardware status + استثناءات (passive retroreflectors, descent stages) → 5 values: communicating, lost-contact, intermittent, not-applicable, unknown. **ليست telemetry**. `lib/mission-control.ts`: `deriveCommunicationStatus`, `communicationStatusNote`.
**D.** "A third, derived label—not live telemetry. It infers communicating/lost contact/not applicable/unknown from the recorded hardware status, with explicit exceptions for passive hardware and descent stages, and always says it's derived."
**E.** `src/lib/mission-control.ts`.
**F.** "Is it live?" → no; derived.
**G.** Never call it live telemetry.

### Q36. What does "freshness" mean?
**A.** What does "freshness" mean?
**B.** ما freshness؟
**C.** عمر التحقق (lastVerified): current (≤30 days), recent (≤180), snapshot (>180). `freshnessFor(lastVerified, now)`. سياسة عرض للحداثة، لا معيار صحة.
**D.** "How old the verification is: checked this cycle (≤30 days), recently (≤6 months), or historical snapshot. It's a display policy for currency, not a scientific validity standard."
**E.** `lib/mission-control.ts` freshnessFor, FreshnessInfo.
**F.** "Why 30/180 days?" → policy choice; not scientific.
**G.** Do not present as scientific standard.

### Q37. What is a source record?
**A.** What is a source record?
**B.** ما SourceRecord؟
**C.** id, organization, title, url, type (mission-page/technical-archive/fact-sheet/reference/news-release/image-record), accessedAt (ISO date), notes?. 96 sources. Rendered at `/sources` grouped by type with access dates and outbound links.
**D.** "A registered source has id, organization, title, URL, type, access date and optional notes. Ninety-six of them, shown at /sources grouped by type with access dates and links."
**E.** `types/artifact.ts` SourceRecord; `data/sources.ts`; `/sources`.
**F.** "Are all links alive?" → 82/89 (brief); 4 dead NASA links.
**G.** Do not claim all links work.

### Q38. What are claim labels?
**A.** What are claim labels?
**B.** ما claim labels؟
**C.** confirmed (مصدر يصرح مباشرة), estimated (تقريب/model-derived), simulated (حساب GRAVERSE), unknown (غير مثبت). `types/provenance.ts`, `lib/provenance.ts` (labels/descriptions), `ClaimBadge`/`ClaimLegend`. `isValidClaim` predicate used by tests+validator.
**D.** "Four labels: confirmed (source states it), estimated (range/approximation), simulated (computed by us), unknown (not established). They appear as badges and a legend; one predicate validates them."
**E.** `types/provenance.ts`, `lib/provenance.ts`, `components/ui/ClaimBadge.tsx`.
**F.** "Where applied?" → bodies/deep-sky facts; artifacts use dataNotes (gap).
**G.** Do not claim per-field claim labels on artifacts.

### Q39. What is provenance?
**A.** What is provenance in GRAVERSE?
**B.** ما provenance؟
**C.** مصدر/سياق الادعاء: source IDs, original wording, claim labels, dataNotes, lastVerified. "Provenance as part of model + UI, not just footer link."
**D.** "Provenance is the source and context behind a claim—source IDs, original wording, claim labels, uncertainty notes and verification date—shown in the UI, not buried in a footer."
**E.** `lib/provenance.ts`, `docs/DATA_AND_PROVENANCE.md`.
**F.** "How is it different from a citation?" → includes derived/simulated labels + uncertainty.
**G.** Do not overstate coverage.

### Q40. How are missing values represented?
**A.** How are missing values represented?
**B.** كيف تمثيل missing؟
**C.** Optional/undefined; UI renders "Unknown"/"Not recorded"; media absent → deliberate no-image state; precision "unknown"; dataNotes. Never fabricated placeholder. "Missing media is represented as absent, never as a fabricated placeholder."
**D.** "Missing values stay missing: optional fields, 'Unknown'/'Not recorded' in the UI, no image instead of a generated placeholder, and precision marked unknown. We never fabricate."
**E.** `types/artifact.ts` (media optional), `docs/DATA_AND_PROVENANCE.md`.
**F.** "What about coordinates?" → no exact coords; precision region/unknown.
**G.** Do not claim any exact coordinates.

### Q41. How does data validation work?
**A.** How does data validation work?
**B.** كيف validation؟
**C.** `npm run validate` (`scripts/validate-data.ts`): unique IDs, Zod schemas, source citation resolution, confirmed/estimated cite source, simulated note/source, mission artifact IDs exist, relation targets+inverses, static params generatable. `npm run test:data`: 21 assertions. CI gate.
**D.** "A build-time validator checks unique IDs, schemas, source resolution, claim rules, mission links, relation symmetry and static params; plus 21 data tests. Both are CI gates."
**E.** `scripts/validate-data.ts`, `tests/data.test.ts`, `.github/workflows/ci.yml`.
**F.** "What does it NOT check?" → scientific truth of NASA facts; link liveness.
**G.** Do not claim schema proves NASA accuracy.

### Q42. What is a MissionEvent?
**A.** What is a MissionEvent?
**B.** ما MissionEvent؟
**C.** id, type (13 types incl. launch/landing/impact/etc.), date (YYYY/…), datePrecision (day/month/year), dateLabel, label, description, sourceIds (min 1). Used in primaryMilestone + timelineEvents.
**D.** "A dated, sourced event: type, date with precision (day/month/year), label, description and source IDs. Every artifact has a primary milestone plus a timeline of events."
**E.** `types/artifact.ts` MissionEvent; `schemas.ts` eventSchema.
**F.** "Why datePrecision?" → honest about date certainty.
**G.** Do not upgrade precision.

### Q43. How do missions derive from artifacts?
**A.** How are missions derived from artifacts?
**B.** كيف missions مشتقة؟
**C.** `missions.ts`: group artifacts by missionName; take earliest launch date; union source IDs + objectives/achievements; normalize status band; link agency via mapping. Mission page states status is derived; original wording on artifact page. (ADR 0002). Test asserts derived.
**D.** "Mission records are built at module load from artifact records—grouped by mission name, earliest launch date, unioned sources and objectives, normalized status. The page says so, and a test guards against drift."
**E.** `src/data/missions.ts`, ADR 0002, `tests/data.test.ts`.
**F.** "What's lost?" → mission-level fields coarser (program etc.).
**G.** Do not claim missions are independently verified.

### Q44. What is the relation graph?
**A.** What is the relation graph?
**B.** ما relation graph؟
**C.** `relations.ts`: indexes entities as `kind:id`; 581 directed edges with inverses for mission-of, located-on, parent-body, operated-by, related, featured-in, includes, authored-for. Detail pages use `getRelations()` for "Connected records". Test asserts symmetry + target resolution.
**D.** "A typed bidirectional graph over all entities—581 edges with inverses—so detail pages show connected records automatically, and a test checks every edge resolves both ways."
**E.** `src/data/relations.ts`, `docs/ARCHITECTURE.md` §3.
**F.** "Can I add a relation?" → add edge + inverse + test.
**G.** Do not claim it's a database.

### Q45. What sources are used?
**A.** What sources are used?
**B.** ما المصادر؟
**C.** NASA NSSDCA mission/spacecraft pages, NASA Science (solar system/deep sky), NASA mission project pages (JPL/Goddard/Langley), NASA technical reports/press kits, agency pages (ESA/JAXA/etc.). 96 records with title/url/type/accessedAt. Exact list at `/sources`.
**D.** "NASA NSSDCA, NASA Science, JPL/Goddard/Langley mission pages, technical reports and press kits, plus ESA/JAXA agency pages—96 registered, shown at /sources with access dates."
**E.** `docs/DATA_AND_PROVENANCE.md` "Main source families"; `/sources`.
**F.** "Are they primary?" → types vary; NSSDCA primary, news releases secondary.
**G.** Do not claim all are primary.

### Q46. What is "lastVerified"?
**A.** What is "lastVerified"?
**B.** ما lastVerified؟
**C.** ISO date when record was verified. Drives freshness (current/recent/snapshot). Per artifact/body/deep-sky/mission/etc. Snapshot if >180 days.
**D.** "The date a record was verified, shown as freshness (checked this cycle / recently / historical snapshot). Treat old ones as snapshots, not live data."
**E.** `types/artifact.ts` lastVerified; `lib/mission-control.ts`.
**F.** "When was last verification?" → dataset lastVerified max.
**G.** Do not claim live currency.

### Q47. What is "dataNotes"?
**A.** What is "dataNotes"?
**B.** ما dataNotes؟
**C.** Array of strings surfacing disagreements, region-only locations, post-mission status changes. Rendered next to sources. "Uncertainty notes" (demo guide).
**D.** "Uncertainty notes shown next to sources—where sources disagree, locations are region-only, or status changed after mission end. They make limits visible."
**E.** `types/artifact.ts` dataNotes; `docs/DATA_AND_PROVENANCE.md`.
**F.** "Example?" → ranger-7 impacted note.
**G.** Do not hide notes.

### Q48. What is the difference between image credit and sourceUrl?
**A.** What is the difference between image credit and sourceUrl?
**B.** ما الفرق credit vs sourceUrl؟
**C.** credit = attribution; sourceUrl = provenance link. Both in ArtifactMedia. Real imagery only where record can name source+credit; illustrations flagged `isIllustration`.
**D.** "Credit is attribution; sourceUrl is the provenance link. Real images require both; illustrations are flagged as illustrations in the UI."
**E.** `types/artifact.ts` ArtifactMedia; `docs/DATA_AND_PROVENANCE.md` Imagery.
**F.** "Can I reuse images?" → check source/credit; not GRAVERSE's to license.
**G.** Do not claim image rights.

### Q49. Are the 3D models official reconstructions?
**A.** Are the 3D models official reconstructions?
**B.** هل 3D models رسمية؟
**C.** لا. No photoreal spacecraft 3D models. Only: schematic orrery (labelled "Schematic—not to scale") and playground primitive toys (labelled "toy—not to scale", not reconstructions, invented terrain). "There are no photoreal spacecraft 3D models."
**D.** "No. There are no photoreal spacecraft models—only a schematic orrery and labelled toy primitives. The rover terrain is invented. We say so on the page."
**E.** `docs/DATA_AND_PROVENANCE.md` Imagery; `docs/ACCESSIBILITY.md`.
**F.** "Why no real models?" → accuracy/honesty; no fabrication.
**G.** Never claim official reconstructions.

### Q50. What is the "recorded anatomy" panel?
**A.** What is the "recorded anatomy" panel?
**B.** ما "recorded anatomy"؟
**C.** `ArtifactAnatomy`: groups specifications already present in record (technicalDetails). Reading aid, not physical layout. Labelled schematic non-reconstruction.
**D.** "A reading aid that groups the specifications already in the record. It's not a physical layout and is labelled as a non-reconstruction."
**E.** `components/artifacts/ArtifactAnatomy.tsx`, `docs/DATA_AND_PROVENANCE.md`.
**F.** "Is it to scale?" → no.
**G.** Do not call it a diagram of the real craft.

---

## 5. Software engineering & technical architecture (96–130)

### Q51. What framework?
**A.** What framework is used?
**B.** ما framework؟
**C.** Next.js 14.2.35 App Router. (package.json, next.config.mjs).
**D.** "Next.js 14 with the App Router."
**E.** `package.json`, `next.config.mjs`.
**F.** "Why not Vite?" → SSG/routing/metadata.
**G.** Do not claim Next 15.

### Q52. What is the rendering model?
**A.** What is the rendering model?
**B.** ما rendering model؟
**C.** Almost every page is a Server Component reading typed data at build time. Client components are islands for interaction only (table in ARCHITECTURE §1). Production: 47 route patterns → 172 concrete routes (35 static + 137 generated). `/search` only dynamic.
**D.** "Server components by default reading static data; client islands only for interaction. 47 route patterns, 172 concrete routes, all statically generated except /search."
**E.** `docs/ARCHITECTURE.md` §1.
**F.** "Why server components?" → smaller bundles, data server-side.
**G.** Do not claim SSR for content.

### Q53. What is a client island?
**A.** What is a "client island"?
**B.** ما client island؟
**C.** A component marked `"use client"` for state/browser/WebGL/events, embedded in server-rendered page. Examples: ExploreExperience, SearchExperience, ProgressDashboard, Orrery3D, SiteHeader, playground games, Simulators, etc. (table).
**D.** "A small interactive component that runs in the browser, embedded in an otherwise server-rendered page—filters, WebGL, progress, games."
**E.** `docs/ARCHITECTURE.md` §1 table.
**F.** "How many?" → ~20 listed.
**G.** Do not claim all pages are client.

### Q54. How does routing work?
**A.** How does routing work?
**B.** كيف routing؟
**C.** File-system routing in `src/app`. Dynamic `[id]` routes. Layouts (root, academy). loading/error/not-found. Redirects in next.config.mjs (`/explore`→`/explorer`, `/kids`→`/academy`, `/museum/timeline`→`/explorer`, permanent:false, query preserved).
**D.** "File-system routes under src/app, dynamic [id] segments, shared layouts, and three preserved redirects that keep old URLs and query strings working."
**E.** `src/app/*`, `next.config.mjs`, ADR 0001.
**F.** "Why redirects permanent:false?" → allow future changes without cache poisoning.
**G.** Do not claim permanent redirects.

### Q55. How is static generation done?
**A.** How is static generation done?
**B.** كيف static generation؟
**C.** `generateStaticParams` across artifact/mission/agency/body/deep-sky/lesson/journey/article/engineering/story/simulation routes → 137 pages. Content routes SSG. `/search` dynamic (query string) but reads static in-memory index.
**D.** "generateStaticParams builds pages for every known ID at build time—137 pages—so content is static. Only /search is dynamic, and it still reads a static in-memory index."
**E.** `docs/ARCHITECTURE.md` §1; `src/app/*/page.tsx`.
**F.** "What if new artifact added?" → rebuild.
**G.** Do not claim ISR.

### Q56. How does TypeScript protect the data architecture?
**A.** How does TypeScript protect the data architecture?
**B.** كيف TS يحمي؟
**C.** Strict mode; disjoint unions MissionStatus/HardwareStatus (can't write missionStatus:"operating"); typed Artifact interface; path alias; compile-time checks (`tsc --noEmit`). Example: status separation enforced at type level.
**D.** "Strict mode plus disjoint unions—for example missionStatus and hardwareStatus can't be swapped—so whole classes of data errors fail at compile time."
**E.** `tsconfig.json` (strict:true), `types/artifact.ts`.
**F.** "Does TS validate runtime JSON?" → no; Zod does.
**G.** Do not claim TS runtime safety.

### Q57. Why Zod?
**A.** Why Zod?
**B.** لماذا Zod؟
**C.** Runtime validation for imported progress (importedProgressSchema) and build-time validator (schemas for all record types). TypeScript types don't validate runtime JSON. Zod 3.24.1.
**D.** "TypeScript types vanish at runtime, so Zod validates imported progress JSON and all data records at build time—shape, URLs, dates, enums."
**E.** `lib/schemas.ts`, `lib/progress.ts` (validateProgress), `scripts/validate-data.ts`.
**F.** "Where used at runtime?" → progress import, personal import.
**G.** Do not claim Zod on every component.

### Q58. How does theming work?
**A.** How does theming work?
**B.** كيف theming؟
**C.** ADR 0004: pre-paint script sets `document.documentElement.dataset.experience` from pathname; `ExperienceTheme` keeps in sync on client nav. Tailwind tokens as `rgb(var(--token-rgb) / <alpha-value>)`. Dark defaults on `:root`; light override for `html[data-experience="academy"]`. Header/footer explicit overrides.
**D.** "A pre-paint script sets an experience attribute on html from the path; Tailwind tokens resolve to RGB CSS variables, so Academy flips to light while Museum/Explorer stay dark—no shell duplication, no dark flash."
**E.** `tailwind.config.ts`, `src/app/globals.css`, `components/layout/ExperienceTheme.tsx`, ADR 0004.
**F.** "Why RGB variables not hex?" → opacity modifiers (`bg-accent/10`) need alpha.
**G.** Do not claim perfect Academy coverage (hardcoded # colors need review).

### Q59. How does 3D work and degrade?
**A.** How does 3D work and degrade?
**B.** كيف 3D وdegradation؟
**C.** R3F (React renderer for Three) + Drei helpers + Three engine. Progressive enhancement: `next/dynamic` ssr:false, mounted only after `useWebgl`; all state/controls in HTML; canvas aria-hidden; reduced motion; 2D alternatives (OrbitMap SVG, flat grid). No WebGL → content/actions available.
**D.** "React Three Fiber renders Three.js declaratively; scenes are lazy-loaded only after WebGL is confirmed, with all controls in HTML, aria-hidden canvases, reduced-motion support and 2D alternatives—so no WebGL still works."
**E.** `docs/ARCHITECTURE.md` §5; `components/academy/play/use-webgl.ts`; `components/explorer/Orrery3D.tsx`.
**F.** "What's in the 3D bundle?" → three/r3f/drei isolated chunk.
**G.** Do not claim WebGL required.

### Q60. How does search work?
**A.** How does search work?
**B.** كيف search؟
**C.** `lib/search-index.ts` builds one in-memory index over artifacts, missions, bodies, deep-sky, lessons, journeys, articles, agencies, glossary, engineering, stories, simulations, research. Case-insensitive, partial-match, scored (title>keywords>description), grouped by kind. Query+kind mirrored to `/search?q=…&kind=…`. `searchScore` weighted (see 05).
**D.** "One in-memory index across all datasets, case-insensitive partial match, scored by field, grouped by kind, with the query and kind filter in the URL."
**E.** `lib/search-index.ts`, `lib/explore.ts` (searchScore), `components/search/SearchExperience.tsx`.
**F.** "Is it fuzzy/NLP?" → no; normalization + terms.
**G.** Do not claim NLP/fuzzy.

### Q61. How is progress stored?
**A.** How is progress stored?
**B.** كيف progress؟
**C.** `graverse:progress:v1` in localStorage (ADR 0003): version, lessons{completedAt,score,total}, journeys{startedAt,completedAt?,completedSteps}, games{completedAt,stars} (added without version bump; validator fills empty), badges[], updatedAt. Validated import (strict schema). Degrades to in-memory if storage unavailable. Export JSON, reset with confirmation. No accounts/analytics.
**D.** "Versioned JSON in localStorage—lessons, journeys, games, badges—validated on import, with export and confirmed reset. No accounts, no cloud; degrades to in-memory if storage is unavailable."
**E.** `lib/progress.ts`, `types/progress.ts`, ADR 0003.
**F.** "What if storage disabled?" → in-memory session.
**G.** Do not claim cloud sync.

### Q62. How is personal state separate?
**A.** How is personal state kept separate from progress?
**B.** كيف personal منفصل؟
**C.** `graverse:personal:v1`: favorites, collections, recent (capped 16), simulations. Separate key so imported Academy progress can't overwrite collections. `usePersonal` same local-only behavior. Export/import/reset separately.
**D.** "Personal state—favourites, collections, recent views, completed simulations—lives under a separate key, so importing progress can't corrupt your collection."
**E.** `lib/personal.ts`, `lib/use-personal.ts`.
**F.** "Max recent?" → 16.
**G.** Do not claim sync between devices.

### Q63. How does i18n work?
**A.** How does internationalisation work?
**B.** كيف i18n؟
**C.** Interface chrome in English+Arabic. Cookie `graverse-locale` (explicit, no browser sniffing). `i18n.ts` dictionaries + `t()` with fallback to English then key. `locale.ts` reads cookie server-side, passes lang/dir as props. `<html lang dir>`. Logical CSS properties + `unicode-bidi: plaintext` for mixed blocks. Editorial prose English-only (stated).
**D.** "Interface chrome in English and Arabic via an explicit cookie—no silent switching. Locale is read on the server and passed down, so first paint is localised. Editorial prose stays English, stated in the Research Archive."
**E.** `lib/i18n.ts`, `lib/locale.ts`, `components/layout/LanguageToggle.tsx`, `docs/ACCESSIBILITY.md` §Language.
**F.** "Is everything translated?" → no; interface only.
**G.** Do not claim full Arabic content.

### Q64. How do error/empty states work?
**A.** How do error and empty states work?
**B.** كيف error/empty؟
**C.** `error.tsx` client boundary with retry; `not-found.tsx` branded 404; `EmptyState` for search/filtered Explorer; unknown facts rendered "Unknown"/"Not recorded". (ARCHITECTURE §8).
**D.** "Route-level error boundary with retry, branded 404, empty states that explain next steps, and 'Unknown' instead of plausible placeholders."
**E.** `src/app/error.tsx`, `src/app/not-found.tsx`, `components/ui/EmptyState.tsx`.
**F.** "What triggers 404?" → bad ID.
**G.** Do not claim custom error recovery beyond retry.

### Q65. What is the verification pipeline?
**A.** What is the verification pipeline?
**B.** ما verification pipeline؟
**C.** `scripts/verify.mjs` orchestrates: tsc → lint → validate → test:data → build (.next-prod) → start (3100) → smoke (50 routes, redirects, axe 38 pages, keyboard, gameplay, reduced motion) → journeys (24) → link-check (192). CI runs same. Last recorded: all pass.
**D.** "One script runs typecheck, lint, data validation, data tests, production build, smoke on 50 routes with axe on 38, 24 user journeys and 192 internal links. CI runs the same sequence."
**E.** `docs/ARCHITECTURE.md` §9; `scripts/verify.mjs`; `.github/workflows/ci.yml`.
**F.** "Did you run it now?" → results are from recorded run 2026-11-11; not re-run in this session.
**G.** Do not claim fresh run without running.

---

## 6. Academy/Museum/Explorer implementation (131–170)

### Q66. What is an Academy lesson?
**A.** What is an Academy lesson?
**B.** ما lesson؟
**C.** id, title, ageBand (5-7/8-9/10-12), minutes, summary, objectives[], sections (heading, paragraphs, callout?), keyTerms[], tryIt, quiz (prompt, options, correctIndex, explanation), artifactIds, bodyIds, sourceIds (min 1), accent. 12 lessons.
**D.** "A lesson has age band, duration, objectives, sections, key terms, a hands-on 'try it', a quiz with explanations, and links to artifacts, bodies and sources."
**E.** `schemas.ts` lessonSchema; `data/lessons.ts`.
**F.** "How many quizzes per lesson?" → ≥1.
**G.** Do not claim adaptive difficulty.

### Q67. What is a journey?
**A.** What is a journey?
**B.** ما journey؟
**C.** id, title, ageBand, promise, minutes, summary, accent, badge (id/name/description), steps (id,title,kind: lesson/artifact/body/article/challenge, description, href), sourceIds. 4 journeys. Completion tracked in progress; badge awarded.
**D.** "A sequenced learning path of steps—lessons, artifacts, bodies, articles, challenges—with a badge on completion. Four journeys, age-banded."
**E.** `schemas.ts` journeySchema; `data/journeys.ts`.
**F.** "What badge?" → per journey.
**G.** Do not claim skill certification.

### Q68. How does quiz feedback work?
**A.** How does quiz feedback work?
**B.** كيف quiz feedback؟
**C.** `LessonQuiz` (client) evaluates selected option vs correctIndex; shows explanation. Progress records score/total. No server grading.
**D.** "Client-side: pick an option, get right/wrong plus the explanation. Score and total saved locally. No server, no grades."
**E.** `components/academy/LessonQuiz.tsx`, `lib/progress.ts`.
**F.** "Can you cheat?" → yes client-side; not an exam.
**G.** Do not call it assessment/certification.

### Q69. How does progress validation work?
**A.** How does progress validation work?
**B.** كيف progress validation؟
**C.** `validateProgress`: checks version===1, lessons (completedAt valid date, 0≤score≤total finite), journeys (startedAt valid, completedSteps strings, completedAt optional), games optional (completedAt valid, stars int 0-3), badges strings, updatedAt. Rejects malformed with message; import errors announced. (`lib/progress.ts`).
**D.** "Strict: version must be 1; dates valid; scores finite and not exceeding totals; stars integers 0-3; bad imports are rejected with a message, not silently accepted."
**E.** `lib/progress.ts` validateProgress; `schemas.ts` importedProgressSchema.
**F.** "What about unknown keys?" → dropped.
**G.** Do not claim migration between versions (none yet).

### Q70. What is the playground pattern?
**A.** What is the playground pattern?
**B.** ما نمط playground؟
**C.** See 05 §1.4: scene lazy `next/dynamic` ssr:false after `useWebgl`; all state/controls/rewards in HTML; canvas aria-hidden; status via role=status; reduced motion; toys not reconstructions; terrain invented; `GamePageLayout` links to verified lesson/artifacts/bodies/sources. 3 games: rocket, moon, rover.
**D.** "Lazy 3D scene only after WebGL is confirmed, but the game is fully playable in HTML—controls, feedback, rewards. Canvas is decorative; reduced motion respected; toys are not reconstructions."
**E.** `docs/ARCHITECTURE.md` §5; `components/academy/play/*`.
**F.** "Does the game require WebGL?" → no.
**G.** Do not claim official models.

### Q71. What is Rover Quest?
**A.** What is Rover Quest?
**B.** ما Rover Quest؟
**C.** Grid-based game: 6×6 invented terrain; drive rover from (0,0) to (5,5) via arrow keys/WASD from focused control panel; energy per step = distance×(4+slope×0.9); science cells; flat top-down map fallback (no WebGL). Rules in `lib/rover-quest.ts` (pure, unit-testable).
**D.** "A keyboard-driven rover game on an invented 6×6 grid—energy per step depends on slope, some cells hold science. A flat map works without WebGL; rules are pure and testable."
**E.** `lib/rover-quest.ts`, `components/academy/play/RoverQuest.tsx`, `RoverMap.tsx`.
**F.** "Is terrain real Mars?" → no; invented.
**G.** Do not claim Mars accuracy.

### Q72. What is the Museum page structure?
**A.** What is the Museum page structure?
**B.** ما هيكل صفحة Museum؟
**C.** Hub (`/museum`): destinations + artifact cards. Detail (`/museum/[id]`): identity, purpose, timeline, statuses (separate), fate, location, contributions, technical details, media, related, sources, uncertainty. Plus missions, agencies pages.
**D.** "Hub shows destinations and artifact cards; detail shows identity, purpose, timeline, both statuses side by side, fate, location, contributions, specs, media, related records and sources."
**E.** `src/app/museum/page.tsx`, `src/app/museum/[id]/page.tsx`.
**F.** "What's the 'Two different questions' section?" → status separation.
**G.** Do not claim all artifacts have media.

### Q73. How does the 3D gallery work?
**A.** How does the 3D gallery work?
**B.** كيف gallery 3D؟
**C.** `GalleryCanvas`/`GalleryStage`/`MuseumGallerySection`: 3D hall with real NASA images. (Details from components; not deeply inspected here—treat as visual enrichment, not source of facts.)
**D.** "A 3D hall displaying real NASA images as enrichment. Facts and sources remain in the text; the canvas is not the source of truth."
**E.** `components/museum/GalleryCanvas.tsx`, `GalleryStage.tsx`, `MuseumGallerySection.tsx`.
**F.** "Is it accessible?" → decorative; 2D content available.
**G.** Do not claim gallery is accessible 3D interaction.

### Q74. How does Explorer filtering work?
**A.** How does Explorer filtering work?
**B.** كيف filters؟
**C.** See 05 §3.3: 6 filters (destination, hardwareType, missionStatus, hardwareStatus, decade, eventType) AND-combined; scope primary/all; sort oldest/newest/name; searchScore; timelineEntries filters eventType on individual events; query params in URL; `activeFilterCount`, `hasActiveFilters`.
**D.** "Six filters combined with AND, primary-or-all event scope, three sorts, and weighted search—all mirrored into the URL for sharing."
**E.** `lib/explore.ts` (matchesFilters, filterArtifacts, sortArtifacts, timelineEntries).
**F.** "Can I filter by two statuses?" → yes (mission + hardware).
**G.** Do not claim fuzzy search.

### Q75. How does the Explorer orrery work?
**A.** How does the Explorer orrery work?
**B.** كيف orrery؟
**C.** `/explorer/solar-system`: decorative `Orrery3D` (lazy, WebGL-gated, aria-hidden, "Schematic—not to scale") + accessible SVG `OrbitMap` with real links + plain destination list. Reduced motion stops auto-rotation; on-demand rendering.
**D.** "A decorative 3D orrery—lazy-loaded, WebGL-gated, aria-hidden, not to scale—plus a full accessible SVG map and plain list with real links."
**E.** `components/explorer/Orrery3D.tsx`, `OrreryScene.tsx`, `OrbitMap.tsx`.
**F.** "Is it accurate scale?" → no; schematic.
**G.** Never claim accurate scale.

### Q76. How do body pages show claim labels?
**A.** How do body pages show claim labels?
**B.** كيف claim labels على bodies؟
**C.** Bodies have `facts[]` with `label`, `value`, `claim` (confirmed/estimated/simulated/unknown), `sourceIds?`. `bodyFactSchema` enforces. `FactGrid` renders badges. Deep-sky same (`deepSkySchema` facts). This is where claim model is applied (not artifacts).
**D.** "Body and deep-sky facts each carry a claim label and optional sources, enforced by schema and rendered as badges. Artifacts rely on dataNotes instead—this gap is acknowledged."
**E.** `schemas.ts` (bodyFactSchema, deepSkySchema); `components/explorer/FactGrid.tsx`.
**F.** "Why not artifacts?" → not implemented; disclose.
**G.** Do not claim per-field labels on artifacts.

### Q77. What is the Research Archive?
**A.** What is the Research Archive?
**B.** ما Research Archive؟
**C.** `/research`: method sections (7), coverage, changelog, API notes, honest limitations (4 explicit). Method transparency. `data/research.ts`.
**D.** "A transparency page: method, coverage, changelog, API notes and four explicit honest limitations. It's where we say what we don't do."
**E.** `src/app/research/page.tsx`, `data/research.ts`.
**F.** "What are the 4 limitations?" → see Research page.
**G.** Do not inflate limitations list.

### Q78. What is Compare?
**A.** What is Compare?
**B.** ما Compare؟
**C.** `/compare`: `CompareClient` side-by-side comparison of documented values from two records. "Shareable link" in Compare may not update (brief bug #7). Disclose if asked.
**D.** "Side-by-side comparison of documented values from two records. Note: the shareable link has a known issue and may not update—disclosed."
**E.** `src/app/compare/page.tsx`, `components/compare/CompareClient.tsx`.
**F.** "Does it compare everything?" → documented values.
**G.** Do not claim full comparison feature polish.

### Q79. What is My Universe?
**A.** What is My Universe?
**B.** ما My Universe؟
**C.** `/my-universe`: `MyUniverseClient` manages favourites, collections, recent (≤16), completed simulations via `personal.ts` (local, validated, export/import/reset). No account.
**D.** "A local, account-free space: favourites, collections, recent views and completed simulations, with export, import and reset."
**E.** `src/app/my-universe/page.tsx`, `components/personal/MyUniverseClient.tsx`, `lib/personal.ts`.
**F.** "Syncs across devices?" → no; export file is transfer.
**G.** Do not claim cloud.

### Q80. What is global search?
**A.** What is global search?
**B.** ما global search؟
**C.** `/search`: `SearchExperience` over `search-index.ts` (all datasets). Debounced query, kind filter, URL sync (`/search?q=…&kind=…`). Empty state. Grouped by kind.
**D.** "A debounced search across every dataset—artifacts, missions, bodies, deep sky, lessons, journeys, articles, agencies, glossary, engineering, stories, simulations, research—grouped by kind and mirrored to the URL."
**E.** `lib/search-index.ts`, `components/search/SearchExperience.tsx`, `src/app/search/page.tsx`.
**F.** "Is it full-text?" → yes over indexed text fields.
**G.** Do not claim NLP.

---

## 7. Supporting experiences & simulations (171–200)

### Q81. What is Mission Control?
**A.** What is Mission Control?
**B.** ما Mission Control؟
**C.** `/mission-control`: `StatusBoard` lists all artifacts with mission/hardware/communication/freshness; summary counts (total, operating, inactive, destroyed/impacted, unknown hardware, communicating, lost contact, not applicable, ongoing/completed missions, lastVerified, destinations). Filters + open record.
**D.** "A status board: every artifact with mission, hardware, derived communication and freshness, plus summary counts and filters. It makes the three-status model visible at a glance."
**E.** `lib/mission-control.ts`, `components/mission-control/StatusBoard.tsx`, `src/app/mission-control/page.tsx`.
**F.** "Is communication live?" → derived.
**G.** Never say live.

### Q82. What is Engineering surface?
**A.** What is the Engineering surface?
**B.** ما Engineering؟
**C.** `/engineering` + `[id]`: 7 explainers (`data/engineering.ts`) linked to artifact records + sources. Explains design rationale. No new mission facts.
**D.** "Seven explainers tying design decisions to specific artifacts and sources—why the hardware was built that way."
**E.** `data/engineering.ts`, `src/app/engineering/*`.
**F.** "New facts?" → no; references existing.
**G.** Do not claim new mission facts.

### Q83. What are Stories?
**A.** What are Stories?
**B.** ما Stories؟
**C.** `/stories` + `[id]`: 8 curated reading paths (`data/stories.ts`) through existing records. No new factual claims. Narrative layer.
**D.** "Eight curated reading paths through existing records—narrative without new facts."
**E.** `data/stories.ts`, `src/app/stories/*`.
**F.** "Are stories verified?" → they reference verified records; no new claims.
**G.** Do not claim new facts.

### Q84. What are the 8 simulations? (overview)
**A.** What are the eight simulations?
**B.** ما 8 محاكيات؟
**C.** S01 Mars landing sequence; S02 power budget; S03 signal across solar system; S04 orbital mechanics (Hohmann); S05 rover traverse planner; S06 mission planning desk; S07 What if? lab; S08 failure investigation. Metadata in `data/simulations.ts`; models in `lib/simulations.ts`; UI in `Simulators.tsx`. Each has approximation note. (06 §2)
**D.** "Eight educational models: landing, power, communication, orbit, rover traverse, mission planning, counterfactuals and failure investigation—each with an explicit approximation note."
**E.** `data/simulations.ts`, `lib/simulations.ts`, `components/simulations/Simulators.tsx`.
**F.** "Which is most scientifically real?" → S04 (vis-viva).
**G.** Do not call them engineering simulators.

### Q85. What is S01 (Mars landing)?
**A.** What is the Mars landing simulation?
**B.** ما S01؟
**C.** See 06 §2 (S01). 1D EDL model: entry/parachute/powered descent/sky crane/touchdown. Inputs: speed, angle, heat shield, parachute, propellant, throttle, mass, sky crane. Survivable if touchdown ≤6 m/s. ⚠️ Known bug: fails all 2160 combos (sign error). Disclose.
**D.** "A simplified one-dimensional Mars entry-descent-landing model with adjustable speed, angle, parachute, propellant and mass. It's an educational model with a known bug we disclose: it currently fails every parameter combination, so we don't present it as a verified predictor."
**E.** `lib/simulations.ts` simulateLanding; `data/simulations.ts` S01.
**F.** "Is it fixed?" → disclose status; brief says fix before 14 Nov.
**G.** Do not present S01 as working.

### Q86. What is S04 (Orbit)?
**A.** What is the orbital mechanics simulation?
**B.** ما S04؟
**C.** Hohmann transfer between circular orbits: vis-viva. Inputs: two bodies (AU). Outputs: circular velocities, transfer velocities, Δv1/Δv2/total, transfer time (years), direction. Earth→Mars ΔV ≈5.596 km/s. Idealized (point-mass Sun, ignores inclination, assists, drag, finite burn). (06 §2)
**D.** "A two-impulse Hohmann transfer using the vis-viva equation—real orbital mechanics, idealized (point-mass Sun, no inclination or assists). Earth to Mars comes out around 5.6 km/s delta-v."
**E.** `lib/simulations.ts` hohmannTransfer; constants SUN_MU_KM3_S2, AU_KM.
**F.** "Is it accurate?" → idealized; disclose.
**G.** Do not claim mission-grade.

### Q87. What is S05 (Rover traverse)?
**A.** What is the rover traverse simulation?
**B.** ما S05؟
**C.** Grid route planner on invented 6×6 terrain; energy per step = distance×(4+slope×0.9); budget 45 Wh; science cells. ⚠️ Known bug: min energy 82.9 Wh > 45 Wh → no route ever valid. Disclose.
**D.** "A grid-based traverse planner with invented terrain and an energy budget. It currently has a known issue: the minimum possible route exceeds the budget, so no route passes—disclosed as a teaching-model bug, not a Mars map."
**E.** `lib/simulations.ts` evaluateRoverRoute, roverTerrain.
**F.** "Is terrain real?" → no; invented.
**G.** Do not claim Mars accuracy.

### Q88. What is S06 dead knob?
**A.** What is the "dead knob" in S06?
**B.** ما "dead knob"؟
**C.** `powerLimitW` in PlanningInput is accepted but not used in `evaluatePlan` (uses sourcePower vs payloadPower). So changing power limit doesn't affect result. Brief flags as bug #4 (15 min fix). Disclose.
**D.** "In the mission-planning simulator, the power-limit input is accepted but not used in the calculation—the result depends on source vs payload power. It's a known bug we disclose, not a hidden feature."
**E.** `lib/simulations.ts` evaluatePlan; `PlanningInput.powerLimitW`.
**F.** "Does mass limit work?" → yes.
**G.** Do not hide the bug.

### Q89. How do simulations record completion?
**A.** How do simulations record completion?
**B.** كيف تسجيل completion؟
**C.** `personal.ts` `recordSimulation(id, score?)` stores completedAt + optional score in personal state. UI `Completion` button calls `completeSimulation`. "It is not a grade or a NASA result." (Simulators.tsx).
**D.** "A 'mark complete' button saves a timestamp and optional score to local personal state. It's explicitly not a grade or NASA result."
**E.** `lib/personal.ts` recordSimulation; `Simulators.tsx` Completion.
**F.** "Is it assessed?" → no.
**G.** Do not call it certification.

### Q90. What is the playground (Academy Play)?
**A.** What is the Academy playground?
**B.** ما playground؟
**C.** `/academy/play`: 3 games (Rocket Workshop, Moon Phases, Rover Quest) with WebGL scenes as toys + HTML controls. Badges (`badge-play-rocket` etc.) saved to progress. (05 §1.4)
**D.** "Three toy games—rocket, Moon phases, rover—playable with or without WebGL, earning badges saved to local progress."
**E.** `src/app/academy/play/*`, `components/academy/play/*`, `data/games.ts`.
**F.** "Are models official?" → no; toys.
**G.** Do not claim official models.

---

## 8. AI usage & technology decisions (201–215)

### Q91. Did you use AI?
**A.** Did you use AI in this project?
**B.** هل استخدمتم AI؟
**C.** المستودع لا يوثّق AI usage (unknown). لا تدّعِ AI assistance أو نفِها. أجب بصدق: "We can't establish AI usage from the repository; what we can show is the code, tests, and verification gates." (Source/evidence rules.)
**D.** "The repository doesn't document AI usage, so I won't claim or deny it. What I can show is the code, the data model, and the verification gates."
**E.** No AI-related files/deps in package.json (verified).
**F.** "Did AI write the code?" → cannot establish.
**G.** Do not fabricate AI narrative.

### Q92. Why Next.js over Vite?
**A.** Why Next.js over Vite?
**B.** لماذا Next.js؟
**C.** SSG for 172 routes, routing conventions, metadata API, image optimization, redirects, server components, production pipeline. Vite would require manual routing/SSG. (02 §2)
**D.** "We needed static generation for 172 routes, plus routing, metadata, image optimization and redirects. Next.js provides them; Vite would mean rebuilding all of that."
**E.** `docs/study/02_...` §2.
**F.** "Trade-off?" → framework coupling.
**G.** Do not claim Next is universally better.

### Q93. Why TypeScript?
**A.** Why TypeScript?
**B.** لماذا TS؟
**C.** Typed data model; disjoint unions enforce status separation; compile-time safety; path alias. Protects data architecture. (02 §2)
**D.** "The data model is the product. Typed unions make mission and hardware status impossible to swap, and compile-time checks catch drift before build."
**E.** `tsconfig.json`, `types/artifact.ts`.
**F.** "Does TS validate runtime?" → no; Zod.
**G.** Do not overstate.

### Q94. Why Tailwind?
**A.** Why Tailwind?
**B.** لماذا Tailwind؟
**C.** Utility classes + CSS variables for theming; opacity modifiers preserved (`bg-accent/10`); fast iteration; consistent tokens. Hex variables would break opacity. (ADR 0004)
**D.** "Utilities plus CSS-variable tokens let us theme whole experiences without duplicating the shell, and keep opacity modifiers working."
**E.** `tailwind.config.ts`, ADR 0004.
**F.** "Alternative?" → traditional CSS; harder theming.
**G.** Do not claim Tailwind is best.

### Q95. Why Three.js + R3F?
**A.** Why Three.js and React Three Fiber?
**B.** لماذا Three+R3F؟
**C.** Three = engine; R3F = declarative React renderer; Drei = helpers. R3F maps Three concepts to React components, composes with React state. Without R3F, Three code imperative. (02 §2, §7)
**D.** "Three.js is the engine; React Three Fiber is its React renderer; Drei adds helpers. R3F lets us compose 3D with React state declaratively."
**E.** `package.json` deps; `components/explorer/Orrery3D.tsx`.
**F.** "Could you use just Three?" → yes, more boilerplate.
**G.** Do not claim R3F replaces Three.

### Q96. Why static generation?
**A.** Why static generation?
**B.** لماذا static generation؟
**C.** Content is static typed data; SSG = fast, cacheable, no DB, no server load. Only /search dynamic (query), reads static index. (02 §2)
**D.** "Our content is static, verified data. Static generation makes it fast and cacheable with no database; only search is dynamic."
**E.** `docs/ARCHITECTURE.md` §1.
**F.** "How update data?" → edit + rebuild.
**G.** Do not claim ISR/dynamic content.

### Q97. Why local progress (no accounts)?
**A.** Why local progress instead of accounts?
**B.** لماذا local progress؟
**C.** ADR 0003: children 5-12; accounts/email/analytics/cloud add privacy/moderation/compliance burden unnecessary for competition demo. Local = no identity barrier; export file transfers. Consequence: progress doesn't follow between devices automatically.
**D.** "For children 5–12, accounts and cloud add privacy and compliance burden we don't need. Local storage means no identity barrier; the export file is the transfer mechanism. Progress won't sync across devices automatically."
**E.** ADR 0003; `lib/progress.ts`.
**F.** "What's lost?" → cross-device sync, teacher tracking.
**G.** Do not claim LMS features.

### Q98. Why no fabricated 3D models?
**A.** Why no fabricated 3D models?
**B.** لماذا no fabricated models؟
**C.** Accuracy principle: "If a public source does not establish a value, GRAVERSE does not show a value." Photoreal models would fabricate. Use schematic orrery + labelled toys + "recorded anatomy" (reading aid). (docs/DATA_AND_PROVENANCE.md)
**D.** "Because accuracy is the product. Photoreal spacecraft models would be fabricated; we use a labelled schematic orrery and toy primitives, and say so."
**E.** `docs/DATA_AND_PROVENANCE.md` Imagery; `docs/DEMO_GUIDE.md` Do not claim.
**F.** "Would real models help?" → visually yes, but accuracy risk.
**G.** Do not imply models exist.

### Q99. Why explicit missing-data states?
**A.** Why explicit missing-data states?
**B.** لماذا explicit missing؟
**C.** "Unknown > guess." Prevents false confidence; surfaces research gaps; protects school-age audience from false certainty. Rendered "Unknown"/"Not recorded", no placeholder. (04 §8, 08 §8)
**D.** "Because false confidence is worse than no answer. Unknown keeps curiosity honest and shows where research is needed, especially for a school-age audience."
**E.** `docs/DATA_AND_PROVENANCE.md` "The rule".
**F.** "Isn't it unsatisfying?" → it's honest; sources provided.
**G.** Do not convert unknown to estimate.

### Q100. Why warm Academy vs cinematic Museum?
**A.** Why a warm Academy and a cinematic Museum?
**B.** لماذا warm Academy / cinematic Museum؟
**C.** ADR 0004: Academy serves children (warm/light, approachable); Museum/Explorer serve general/curious (cinematic/dark). Shared shell via CSS variables; no duplication. Experience theming via dataset.experience.
**D.** "Academy is for children—warm and light to feel approachable. Museum and Explorer are cinematic and dark for reading and exploration. Shared shell, themed with CSS variables, so they never drift."
**E.** ADR 0004; `tailwind.config.ts`; `globals.css`.
**F.** "Why not one theme?" → audience needs.
**G.** Do not claim user testing of themes.

---

## 9. UI/UX & accessibility (216–235)

### Q101. How does accessibility work?
**A.** How does accessibility work?
**B.** كيف accessibility؟
**C.** WCAG 2.1 AA target. Semantics: one main/h1, skip link, labelled nav, breadcrumbs, status never color-only, claim badges text, fact grids dl/dt/dd. Keyboard: native controls, visible focus, mobile menu Enter/Space+Escape+focus restore, "/" search, progress reset confirmation, filters/quizzes/games keyboard-operable, rover arrow keys. Motion: prefers-reduced-motion, MotionToggle, orrery stops auto-rotation, playground skips animations. Alternatives: 2D maps, list view, text facts. RTL Arabic. Forms: labelled search, aria-live result count, import errors announced. Automated: axe 0 violations on 38 pages, smoke keyboard checks. Limitation: no screen-reader session recorded.
**D.** "WCAG 2.1 AA target: semantic landmarks, skip link, keyboard operation everywhere including games, reduced motion, 2D alternatives for 3D, RTL Arabic, and automated axe with zero violations on 38 pages. We did not run a screen-reader session."
**E.** `docs/ACCESSIBILITY.md`.
**F.** "Screen reader tested?" → no; disclose.
**G.** Do not claim certification.

### Q102. What happens without JavaScript?
**A.** What happens without JavaScript?
**B.** ماذا بدون JS؟
**C.** Content routes are statically generated HTML → readable without JS. Interactive islands (filters, progress, 3D, games) won't function; but content/actions in fallbacks? Browser tests verify Explorer/playground still serve records/controls with WebGL disabled (not JS disabled). Exact no-JS behavior not documented/tested. Disclose limitation.
**D.** "Content pages are static HTML, so they read without JavaScript. Interactive islands—filters, progress, games—won't run. We tested WebGL-disabled fallbacks, but not a full no-JavaScript audit; I'd be careful claiming more."
**E.** `docs/ARCHITECTURE.md` §1; `docs/DEMO_GUIDE.md`.
**F.** "Can you complete a quiz without JS?" → no.
**G.** Do not overclaim no-JS support.

### Q103. What happens without WebGL?
**A.** What happens without WebGL?
**B.** ماذا بدون WebGL؟
**C.** Explorer: 2D SVG OrbitMap with real links + plain destination list; orrery aria-hidden decorative. Playground: full HTML controls/feedback/rewards + flat top-down grid map for Rover Quest. Content and actions remain available. Journeys test verifies Explorer/playground still serve records/controls with WebGL disabled.
**D.** "Everything still works: Explorer falls back to an accessible 2D map and list; playground games keep full HTML controls, feedback and rewards, plus a flat map for Rover Quest. We verified this in journeys."
**E.** `docs/ARCHITECTURE.md` §5; `docs/ACCESSIBILITY.md` Alternatives; `scripts/journeys.mjs`.
**F.** "Is 3D required for any fact?" → no.
**G.** Do not claim WebGL improves accuracy.

### Q104. How is RTL/Arabic handled?
**A.** How is RTL/Arabic handled?
**B.** كيف RTL/عربي؟
**C.** Cookie `graverse-locale`; `<html lang dir>`; logical CSS properties; `unicode-bidi: plaintext` for mixed blocks; technical values isolated; badges `dir="auto"`; navigation/footer/homepage hero/section chrome + Mission Control/Engineering/Stories/Research/Simulations/My Universe/Compare translated. Editorial prose English-only (stated). (docs/ACCESSIBILITY.md §Language)
**D.** "Interface chrome in English and Arabic via a cookie, with RTL layout using logical properties and per-block text direction so dates and sentences keep their order. Editorial prose stays English, and we say so."
**E.** `lib/i18n.ts`, `lib/locale.ts`, `components/layout/LanguageToggle.tsx`, `docs/ACCESSIBILITY.md`.
**F.** "Is all content Arabic?" → no.
**G.** Do not claim full Arabic content.

### Q105. How is reduced motion handled?
**A.** How is reduced motion handled?
**B.** كيف reduced motion؟
**C.** `prefers-reduced-motion: reduce` shortens animations/transitions unless visitor opts back in via MotionToggle (persists full/reduced). Orrery stops auto-rotation + on-demand rendering. Playground: rocket jumps to final launch position; rover no bob; Moon scene no decorative rotation. Perf/axe test verifies star-field duration ≤0.001s.
**D.** "Respects prefers-reduced-motion, with a toggle to opt back in. The orrery stops auto-rotation; playground skips animations. Verified by an automated reduced-motion check."
**E.** `docs/ACCESSIBILITY.md` Motion; `use-reduced-motion.ts`; `MotionToggle.tsx`.
**F.** "Can user force full motion?" → yes via toggle.
**G.** Do not claim all animations disabled (opt-in possible).

### Q106. How is focus management handled?
**A.** How is focus management handled?
**B.** كيف focus management؟
**C.** Skip-to-content first focusable; mobile menu opens with Enter/Space, moves focus to first link, closes on Escape, restores trigger; visible focus outlines; search reachable via "/". (ACCESSIBILITY §Keyboard)
**D.** "Skip link first; mobile menu moves focus in, closes on Escape and restores focus; visible focus rings; '/' focuses search."
**E.** `docs/ACCESSIBILITY.md` Keyboard.
**F.** "Tab order tested?" → automated keyboard checks (skip link, mobile menu, rover move).
**G.** Do not claim full keyboard audit beyond automated.

### Q107. How is color not the only carrier of status?
**A.** How is status not conveyed by color alone?
**B.** كيف status غير لون؟
**C.** Badges include text + icon; claim badges always text label; status badge text "Mission: Completed"/"Hardware: Inactive"; derived communication carries text note. (ACCESSIBILITY §Structure)
**D.** "Badges carry text and icons, not just color; status and claim labels are always text. Status is never color-only."
**E.** `components/ui/StatusBadge.tsx`, `ClaimBadge.tsx`, `CommunicationBadge.tsx`.
**F.** "Color-blind safe?" → text+icon support; not certified.
**G.** Do not claim color-blind certification.

### Q108. What automated accessibility checks exist?
**A.** What automated accessibility checks exist?
**B.** ما checks accessibility؟
**C.** axe-core (wcag2a/aa/21a/21aa) on 38 pages: 0 violations recorded. Smoke: 50 routes (status, title, h1, main, body length). Keyboard: skip link, mobile menu, rover move. Gameplay: rocket launch + badge persistence. Reduced motion. Journeys: 24 (incl. Arabic RTL, phone 390px, WebGL disabled). Links: 192/192.
**D.** "axe on 38 pages with zero violations, smoke on 50 routes, keyboard and gameplay assertions, reduced-motion check, 24 user journeys including RTL and phone, and 192 internal links."
**E.** `docs/ACCESSIBILITY.md` Automated checks; `scripts/smoke.mjs`, `journeys.mjs`, `link-check.mjs`.
**F.** "Screen reader?" → not recorded.
**G.** Do not claim screen-reader testing.

### Q109. How is performance handled?
**A.** How is performance handled?
**B.** كيف performance؟
**C.** SSG all content; lazy 3D (next/dynamic ssr:false) isolated chunk; images next/image AVIF/WebP with sizes; local font display swap; server components keep data out of client bundles. Local perf probe: LCP 56-96ms, CLS 0 on 13 routes (unthrottled headless Chrome). Not Lighthouse/field data.
**D.** "Static generation, lazy 3D chunks, optimized images and local fonts. A local probe showed 56–96 ms LCP and zero CLS on 13 routes—but that's unthrottled local Chrome, not Lighthouse or field data."
**E.** `docs/PERFORMANCE.md`; `scripts/perf.mjs`.
**F.** "Lighthouse score?" → not measured; disclose.
**G.** Do not claim Lighthouse/field metrics.

### Q110. How is SEO/metadata handled?
**A.** How is SEO/metadata handled?
**B.** كيف metadata؟
**C.** Next.js metadata API; `metadataBase` from `NEXT_PUBLIC_SITE_URL` (env) with fallback localhost. Per-route metadata. Sitemap? Not mentioned in docs (unknown). Open Graph? env-driven origin. Do not claim sitemap/OG specifics not verified.
**D.** "Per-route metadata via Next.js, with the canonical origin from NEXT_PUBLIC_SITE_URL (falling back to localhost). I haven't verified a sitemap or Open Graph tags beyond that."
**E.** `next.config.mjs` (env), `src/app/layout.tsx`.
**F.** "Sitemap?" → unknown/not documented.
**G.** Do not claim SEO features not verified.

---

## 10. Competitive differentiation & innovation (236–255)

### Q111. Who are your competitors?
**A.** Who are your competitors?
**B.** من المنافسون؟
**C.** Examined: NASA Science, NSSDCA, NASA Eyes (+DSN Now, Mars Relay), NASA Solar System, NASA Learning Resources, ESA Education, Smithsonian NASM, NASA Image/Video Library. (brief §7, analysis §9)
**D.** "We examined NASA Science, NSSDCA, NASA Eyes, NASA Solar System and Learning Resources, ESA Education, Smithsonian NASM, and NASA's image library."
**E.** `docs/GRAVERSE_COMPETITION_BRIEF_AR.md` §7.
**F.** "Did you examine other Space Apps teams?" → no; do not compare.
**G.** Do not claim superiority over unexamined teams.

### Q112. What do competitors do well?
**A.** What do competitors do well?
**B.** ما يفعله المنافسون جيدًا؟
**C.** NASA Eyes: realism, vitality, temporal breadth (150+ missions). NSSDCA: technical depth of single record. ESA: teacher resources. NASA Science: breadth. (brief §7 table)
**D.** "NASA Eyes excels at realism and breadth; NSSDCA at technical depth of a single record; ESA at teacher resources. We don't pretend to beat them there."
**E.** `docs/GRAVERSE_COMPETITION_BRIEF_AR.md` §7.
**F.** "So why not just use NASA Eyes?" → integration + status separation + learning.
**G.** Do not disparage competitors.

### Q113. What is genuinely defensible as innovation?
**A.** What is genuinely defensible as innovation?
**B.** ما innovation مدعوم؟
**C.** The combination (not single feature): documented record + age-designed learning + temporal/spatial exploration + simulations + open data + transparency + status separation. "The combination is the differentiator—not feature count." Plus semantic separation of mission/hardware status (type-level). (brief §7, §8)
**D.** "The combination, not any single feature: a documented record read three ways, plus status separation, claim labels, simulations and open data. And the status separation is enforced in the type system, not just the UI."
**E.** `docs/GRAVERSE_COMPETITION_BRIEF_AR.md` §7-8.
**F.** "Is it patented?" → no; claim modestly.
**G.** Do not claim first/only/best.

### Q114. Is GRAVERSE the first or only platform like this?
**A.** Is GRAVERSE the first or only platform like this?
**B.** هل هو الأول/الوحيد؟
**C.** لا تدّعِ. "Never claim GRAVERSE is the first or only platform without evidence." (task rules). GRAVERSE says "first in separation of mission/hardware status" as defensible claim (brief). Other capabilities overlap with competitors.
**D.** "No—we don't claim first or only. We do claim we're first to structurally separate mission and hardware status, and that the combination is distinctive. Competitors overlap on many capabilities."
**E.** `docs/study/07_...` §5; task source rules.
**F.** "What overlaps?" → timeline (Eyes), records (NSSDCA).
**G.** Never claim first/only/best.

### Q115. Where are competitors stronger?
**A.** Where are competitors stronger?
**B.** أين المنافسون أقوى؟
**C.** NASA Eyes: realism/vitality/temporal breadth. NSSDCA: technical depth. ESA: teacher resources. GRAVERSE: curated 30 (not exhaustive), no live telemetry, no measured outcomes. (brief §7)
**D.** "NASA Eyes on realism and breadth, NSSDCA on technical depth, ESA on teacher resources. We're a curated set of 30 with no live telemetry and no measured outcomes."
**E.** `docs/GRAVERSE_COMPETITION_BRIEF_AR.md` §7.
**F.** "How do you compete?" → integration + honesty.
**G.** Be honest; don't disparage.

### Q116. What is the single most defensible technical claim?
**A.** What is the single most defensible technical claim?
**B.** ما أقوى ادعاء تقني؟
**C.** "Mission and hardware status are disjoint types; impossible to write missionStatus:'operating'." + verified gates (21 tests, 50 smoke, 38 axe, 24 journeys, 192 links). Evidence-based, reproducible.
**D.** "That mission and hardware status are disjoint types—so the confusion is impossible to express—and that every claim is backed by a reproducible verification gate."
**E.** `types/artifact.ts`, `scripts/verify.mjs`.
**F.** "Show me the type." → MissionStatus vs HardwareStatus.
**G.** Do not claim beyond evidence.

### Q117. What makes the UX distinctive?
**A.** What makes the UX distinctive?
**B.** ما UX مميز؟
**C.** Three reading modes for same data; status separation visible; provenance in UI; progressive enhancement (2D alternatives); RTL; reduced motion; local progress; honest limitations section. But no screen-reader session.
**D.** "Three reading modes for one collection, visible status separation, provenance in the UI, and progressive enhancement with real 2D alternatives. We did not run a screen-reader session."
**E.** `docs/ACCESSIBILITY.md`, `docs/DEMO_GUIDE.md`.
**F.** "Best UX feature?" → status separation + provenance.
**G.** Do not claim UX research.

---

## 11. Philosophy, space heritage, intellectual foundations (256–275)

### Q118. What is space heritage?
**A.** What is "space heritage"?
**B.** ما "space heritage"؟
**C.** Space hardware as physical traces of human exploration—historically meaningful objects, not junk. On Moon/Mars (no erosion), artifacts persist as left. Digital museum can show 30 with 3 views. (08 §1)
**D.** "Space hardware as physical traces of human exploration—meaningful objects, not junk. On the Moon and Mars they persist as left, and a digital museum can show thirty with three views at once."
**E.** `docs/study/08_...` §1.
**F.** "Why not just images?" → relationships/context/provenance.
**G.** Do not over-philosophize without grounding.

### Q119. Why does a mission ending not end an object's value?
**A.** Why does a mission ending not end an object's value?
**B.** لماذا end of mission ≠ end of value؟
**C.** Value shifts: operational science → historical/scientific legacy (what it proved, where it rests, what it enabled). Object may remain inactive, still operate (LRRR), travel (Voyager), impact (Ranger 7), lost contact (Insight). Archive preserves purpose/mission/contributions/fate/location/sources. (08 §2, §7)
**D.** "Because value shifts from operations to legacy—what it proved, where it rests, what it enabled. The object may still operate, travel, or rest; the archive keeps its story verifiable."
**E.** `docs/study/08_...` §2, §7; artifact records.
**F.** "Example of still-operating?" → Apollo 11 LRRR.
**G.** Do not overstate "value" claims.

### Q120. What is the central intellectual question?
**A.** What is the central intellectual question?
**B.** ما السؤال الفكري المركزي؟
**C.** "When a spacecraft stops operating, does its value end?" GRAVERSE answer: No. Mission end ≠ object disappearance; value shifts to legacy; archive preserves story. (08 §7)
**D.** "When a spacecraft stops operating, does its value end? Our answer is no—mission end is not object disappearance, and the archive keeps the story verifiable."
**E.** `docs/study/08_...` §7.
**F.** "Is that proven?" → philosophical/design stance, not measured.
**G.** Do not claim proven impact.

### Q121. What educational theories underpin GRAVERSE?
**A.** What educational theories underpin GRAVERSE?
**B.** ما theories؟
**C.** Constructivism, experiential learning, inquiry-based, discovery learning, narrative learning, systems thinking, spatial learning, chronological reasoning, digital museum learning. Mapped to features in 08 §6. But: "presence of quiz/age band indicates intent, not proven outcome."
**D.** "Constructivism, experiential, inquiry-based, discovery, narrative, systems thinking, spatial, chronological and digital-museum learning—mapped to features. But these are design intentions; we have no user study proving outcomes."
**E.** `docs/study/08_...` §6.
**F.** "Which theory is strongest evidenced?" → none (no study).
**G.** Do not cite effect sizes.

### Q122. Does GRAVERSE prove constructivist learning works?
**A.** Does GRAVERSE prove constructivist learning works?
**B.** هل يثبت constructivism؟
**C.** لا. "Design intention, not proven educational effectiveness." No user study. Presence of journeys/quizzes indicates intent. (08 §6 caution)
**D.** "No. Our features are designed on constructivist principles, but we have no user study. Design intent is not proven effectiveness."
**E.** `docs/study/08_...` §6.
**F.** "How would you test?" → user study (not done).
**G.** Never claim proven outcomes.

### Q123. Why preserve relationships/context/provenance in a digital museum?
**A.** Why preserve relationships, context and provenance rather than just images?
**B.** لماذا relationships/provenance؟
**C.** Digital museum value = context + provenance, not images. Relation graph (581 edges), source registry, claim labels, dataNotes, original wording. "Preserving relationships, context, and provenance is more meaningful than merely preserving images." (08 §3, 04)
**D.** "Because an image alone loses meaning. Relationships, context and provenance keep the story verifiable and connected—mission, agency, location, sources, uncertainty."
**E.** `docs/DATA_AND_PROVENANCE.md`, `src/data/relations.ts`.
**F.** "Example?" → Connected records on detail page.
**G.** Do not claim physical preservation.

### Q124. What is the difference between facts and narrative?
**A.** What is the difference between a collection of facts and a narrative?
**B.** ما الفرق facts vs narrative؟
**C.** Narrative connects purpose → design → action → discovery → legacy. Facts alone don't. GRAVERSE: Museum sequence, Stories, journeys, timeline. "Storytelling" official requirement. (08 §4, 07 §1)
**D.** "Facts are isolated; narrative connects purpose, design, action, discovery and legacy. Our Museum pages and Stories follow that sequence instead of listing facts."
**E.** `src/app/museum/[id]/page.tsx`, `data/stories.ts`.
**F.** "Where is the narrative?" → purpose→journey→science→fate.
**G.** Do not overstate narrative originality.

### Q125. Why include simulations if they're simplified?
**A.** Why include simulations if they're simplified?
**B.** لماذا simulations مبسطة؟
**C.** Active discovery complements passive reading; trade-offs tangible; each carries approximation note + "Simulated" label. S04 uses real vis-viva. Value: engagement + conceptual understanding, not prediction. (06 §3, 08 §5)
**D.** "Because active experimentation complements reading, and trade-offs become tangible. Each is labelled 'Simulated' with an explicit approximation note; one (S04) uses real vis-viva. They teach concepts, not predict missions."
**E.** `data/simulations.ts` (approximation), `lib/simulations.ts`.
**F.** "Are they accurate?" → S04 real calc; others educational.
**G.** Do not present as engineering simulators.

### Q126. What does "Unknown" protect?
**A.** What does marking something "Unknown" protect?
**B.** ماذا يحمي "Unknown"؟
**C.** Protects curiosity from false certainty; surfaces research gaps; protects school-age audience. "Unknown > guess." (04 §8, 08 §8)
**D.** "It protects learners—especially children—from false certainty, and surfaces where research is still needed instead of hiding gaps."
**E.** `docs/DATA_AND_PROVENANCE.md` "The rule".
**F.** "Isn't it unsatisfying?" → honest; sources provided to explore.
**G.** Do not convert unknown to estimate.

---

## 12. Education, target audience, societal impact (276–290)

### Q127. How does it serve school-age users specifically?
**A.** How does it serve school-age users specifically?
**B.** كيف يخدم school-age؟
**C.** Age bands (5-7/8-9/10-12), lessons with objectives/minutes, journeys, quizzes with explanations, playground toys, glossary, progress (no account), Robot Lab. But no user study.
**D.** "Age-banded lessons with objectives and durations, sequenced journeys, quizzes with explanations, toy playground games, a glossary and local progress—no account needed. We haven't measured outcomes."
**E.** `data/lessons.ts`, `data/journeys.ts`, `data/games.ts`.
**F.** "What if a 6-year-old can't read?" → Robot Lab/playground more visual; not fully validated.
**G.** Do not claim validated age-appropriateness.

### Q128. What societal impact do you claim?
**A.** What societal impact do you claim?
**B.** ما impact اجتماعي؟
**C.** None measured. Design intent: inspire next generation (official goal), make finished missions teachable, preserve heritage, transparency. "Do not claim actual educational outcomes without user-study evidence." (task rules)
**D.** "We claim design intent—making finished missions teachable and preserving heritage—not measured impact. We have no user study."
**E.** `docs/DEMO_GUIDE.md` Do not claim.
**F.** "How would you measure?" → user study (future).
**G.** Never claim measured impact.

### Q129. How does it help teachers?
**A.** How does it help teachers?
**B.** كيف يساعد معلمين؟
**C.** Ready 25-45 min path with objectives/sources; lessons, quizzes, journeys, articles, export. No teacher dashboard/tracking (do not claim).
**D.** "A ready path with objectives and sources—time saved—plus lessons, quizzes, journeys, articles and open data. No teacher dashboard or class tracking."
**E.** `data/lessons.ts` (minutes, objectives), `data/journeys.ts`.
**F.** "Can teacher assign?" → no LMS.
**G.** Do not claim classroom management.

### Q130. How does it support casual enthusiasts?
**A.** How does it support casual enthusiasts?
**B.** كيف casual enthusiasts؟
**C.** Museum cards (quick overview), Explorer filters/timeline, Stories (readable), search, 3D gallery (visual). Low barrier: no account, static fast pages.
**D.** "Museum cards give quick overviews; Explorer and Stories are browsable; search is fast; no account needed. Visual and textual entry points."
**E.** `src/app/museum/page.tsx`, `src/app/stories/*`, `src/app/explorer/page.tsx`.
**F.** "Too much text?" → stories aim for readable; not measured.
**G.** Do not claim readability testing.

### Q131. How does it handle different languages?
**A.** How does it handle different languages?
**B.** كيف languages؟
**C.** English + Arabic interface chrome (cookie, RTL, logical properties). Editorial prose English-only (stated limitation). No other languages. (02 §10, accessibility)
**D.** "English and Arabic interface chrome with RTL support; editorial prose is English-only, and we state that. No other languages yet."
**E.** `lib/i18n.ts`, `lib/locale.ts`, `docs/ACCESSIBILITY.md`.
**F.** "Why Arabic?" → team/audience; not documented rationale.
**G.** Do not claim full Arabic content.

### Q132. What about accessibility for diverse learners?
**A.** What about accessibility for diverse learners?
**B.** كيف diverse learners؟
**C.** Age bands, plain language glossary, visual alternatives, keyboard, reduced motion, RTL, claim labels (uncertainty visible), no fabricated values. But no screen-reader session, no dyslexia-specific features (unknown).
**D.** "Age bands, plain-language glossary, visual and text alternatives, keyboard access, reduced motion and RTL. We didn't test with screen readers or dyslexia-specific features."
**E.** `docs/ACCESSIBILITY.md`.
**F.** "Dyslexia font?" → not implemented.
**G.** Do not claim beyond documented.

---

## 13. Data, sources, provenance (291–310)

### Q133. How many sources?
**A.** How many sources are there?
**B.** كم source؟
**C.** 96 registered sources (`data/sources.ts`), rendered at `/sources` grouped by type with access dates and links. (docs)
**D.** "Ninety-six registered sources, shown at /sources with organization, type, access date and link."
**E.** `data/sources.ts`, `/sources`, `docs/DATA_AND_PROVENANCE.md`.
**F.** "All links work?" → 82/89; 4 dead NASA links (brief).
**G.** Do not claim 100% link health.

### Q134. What is the claim model?
**A.** What is the claim model?
**B.** ما claim model؟
**C.** confirmed/estimated/simulated/unknown with requirements (see 04 §7). `isValidClaim` predicate. Labels+descriptions in `lib/provenance.ts`. Rendered by ClaimBadge/ClaimLegend. Applied to bodies/deep-sky facts; artifacts use dataNotes (gap).
**D.** "Four labels—confirmed, estimated, simulated, unknown—each with requirements, validated by one predicate, shown as badges and a legend. Applied to body and deep-sky facts; artifacts use uncertainty notes instead."
**E.** `types/provenance.ts`, `lib/provenance.ts`, `schemas.ts`.
**F.** "Why not artifacts?" → not implemented; disclose.
**G.** Do not claim per-field on artifacts.

### Q135. How do you handle conflicting sources?
**A.** How do you handle conflicting sources?
**B.** كيف conflicting sources؟
**C.** `dataNotes` surfaces disagreements; original wording preserved; claim labels; no silent resolution. "If sources disagree, preserve wording/note and show uncertainty." (04 §8, DATA_AND_PROVENANCE)
**D.** "We keep both wordings in dataNotes and show uncertainty rather than silently picking one. Original NASA wording stays beside our normalized band."
**E.** `types/artifact.ts` dataNotes, missionStatusOriginal/hardwareStatusOriginal.
**F.** "Example?" → ranger-7 impacted note.
**G.** Do not claim automatic conflict resolution.

### Q136. How do you handle unknown data?
**A.** How do you handle unknown data?
**B.** كيف unknown data؟
**C.** Optional fields; UI "Unknown"/"Not recorded"; no fabricated placeholders; media absent; precision unknown; dataNotes. (04 §8)
**D.** "Missing values stay missing—optional fields, 'Unknown' in the UI, no fabricated placeholders or images."
**E.** `docs/DATA_AND_PROVENANCE.md` "The rule".
**F.** "Why not estimate?" → would fabricate.
**G.** Never fabricate.

### Q137. How do you distinguish derived from original?
**A.** How do you distinguish derived from original data?
**B.** كيف derived vs original؟
**C.** Original wording required (`*Original` fields, zod min(1)). Derived records (missions, communication, freshness) labelled derived. Simulated labelled simulated with approximation note. Estimated labelled estimated. (04 §9)
**D.** "Original NASA wording is required and shown; derived records (missions, communication, freshness) are labelled derived; simulations and estimates are labelled as such."
**E.** `types/artifact.ts`, `lib/mission-control.ts`, `data/missions.ts`.
**F.** "Is mission page original?" → derived; labelled.
**G.** Do not present derived as original.

### Q138. How do you prevent broken relationships?
**A.** How do you prevent broken relationships?
**B.** كيف prevent broken relations؟
**C.** `relations.ts` edges with inverses; validator checks targets exist + inverses present; data test asserts symmetry + resolution; detail pages use `getRelations()`. (04 §4, §11)
**D.** "Relation edges carry inverses; a validator and tests check every target resolves and every inverse exists; detail pages render through getRelations."
**E.** `data/relations.ts`, `scripts/validate-data.ts`, `tests/data.test.ts`.
**F.** "What if a new entity added?" → add edges+inverses+test.
**G.** Do not claim DB-level integrity.

### Q139. What happens if a source link dies?
**A.** What happens if a source link dies?
**B.** ماذا إذا link مات؟
**C.** access date recorded; link liveness not in validation. Brief: 4 dead NASA links (2 in educational pages). Outbound links depend on external hosts. UI still shows source metadata. (docs)
**D.** "We record access dates but don't validate link liveness in the build. Four NASA links are currently dead—two in educational pages. The source metadata remains visible even if the host changes."
**E.** `docs/GRAVERSE_COMPETITION_BRIEF_AR.md` §9 #9.
**F.** "How to fix?" → update URL + access date.
**G.** Do not claim all links live.

### Q140. How do you handle status changes after mission end?
**A.** How do you handle status changes after mission end?
**B.** كيف status changes after end؟
**C.** `dataNotes` surfaces post-mission status changes; mission status and hardware status separate; original wording preserved. Example: Insight lost contact (not confirmed destroyed); Cassini controlled end.
**D.** "Post-mission changes are noted in dataNotes, and mission vs hardware status stay separate—so 'lost contact' isn't called 'destroyed'."
**E.** `types/artifact.ts` dataNotes; records (insight, cassini).
**F.** "Can status be updated?" → edit record + verify.
**G.** Do not claim real-time status.

---

## 14. Performance, security, scalability, reliability (311–325)

### Q141. How is performance optimized?
**A.** How is performance optimized?
**B.** كيف performance؟
**C.** See 109. SSG; lazy 3D; next/image AVIF/WebP; local font; server components. Local probe LCP 56-96ms CLS 0 (unthrottled). (PERFORMANCE.md)
**D.** "Static generation, lazy 3D chunks, optimized images, local fonts. Local probe showed fast paint and zero layout shift, but it's not Lighthouse or field data."
**E.** `docs/PERFORMANCE.md`, `scripts/perf.mjs`.
**F.** "Lighthouse?" → not measured.
**G.** Do not claim Lighthouse/field.

### Q142. Is there a database?
**A.** Is there a database?
**B.** هل database؟
**C.** No. Static typed data in `src/data`. No DB driver in dependencies. `/api/export` serves dataset. (verified package.json)
**D.** "No database—static typed data modules. Export serves exactly what's on screen."
**E.** `package.json` (no DB deps), `src/data/*`, `src/app/api/export/route.ts`.
**F.** "Scalability limit?" → content updates require rebuild; not for huge datasets.
**G.** Do not claim DB features.

### Q143. Is there authentication?
**A.** Is there authentication?
**B.** هل auth؟
**C.** No auth. No user accounts. Progress/personal local. `/api/export` no auth. (verified)
**D.** "No authentication or accounts—progress and personal state are local to the browser."
**E.** `package.json`, `lib/progress.ts`, `lib/personal.ts`.
**F.** "Security risk?" → no user data server-side; localStorage only.
**G.** Do not claim auth exists.

### Q144. What about security?
**A.** What about security?
**B.** ما security؟
**C.** No secrets in repo (`.env.example` shows vars); no user data server-side; localStorage only; dependency lock; CI. No security audit documented. Do not overclaim.
**D.** "No server-side user data and no secrets committed; dependencies are locked and CI runs. We haven't done a formal security audit."
**E.** `.env.example`, `.github/workflows/ci.yml`.
**F.** "XSS?" → React escaping; not audited.
**G.** Do not claim security audit.

### Q145. How does it scale?
**A.** How does it scale?
**B.** كيف scale؟
**C.** Static site scales via CDN/hosting; data updates require rebuild; in-memory search index (fine for 30 artifacts + other datasets). Not designed for huge datasets or real-time. (docs)
**D.** "As a static site it scales like any static host; data changes need a rebuild, and the in-memory search is fine for this curated size."
**E.** `docs/PERFORMANCE.md`.
**F.** "Max dataset size?" → not benchmarked.
**G.** Do not claim enterprise scale.

### Q146. What are failure modes?
**A.** What are failure modes?
**B.** ما failure modes؟
**C.** WebGL unavailable → 2D fallback. Storage unavailable → in-memory session. Bad import → rejected with message. Bad ID → 404. External source link dead → metadata remains. Error boundary → retry. (02, accessibility)
**D.** "WebGL missing falls back to 2D; storage missing falls back to in-memory; bad imports are rejected; bad IDs show 404; dead external links leave metadata; route errors show retry."
**E.** `docs/ARCHITECTURE.md` §8; `docs/ACCESSIBILITY.md`.
**F.** "What if build fails?" → CI gate catches.
**G.** Do not claim automatic recovery beyond documented.

### Q147. How is reliability verified?
**A.** How is reliability verified?
**B.** كيف reliability؟
**C.** CI pipeline: validate, test:data, lint, build, smoke (50 routes), journeys (24), link-check (192). Last recorded all pass. But results local to recorded run. (docs)
**D.** "A full CI gate—data validation, 21 tests, lint, build, smoke on 50 routes, 24 journeys, 192 links—last recorded all passing locally. We haven't run it in this session."
**E.** `.github/workflows/ci.yml`, `scripts/verify.mjs`.
**F.** "Production deployed?" → no deployment URL in repo.
**G.** Do not claim deployment.

### Q148. Is there telemetry/analytics?
**A.** Is there telemetry or analytics?
**B.** هل telemetry/analytics؟
**C.** No analytics on progress (ADR 0003). No telemetry. Communication status is derived, not live. (verified)
**D.** "No analytics or telemetry—progress is local, and communication status is derived from recorded data, not a live feed."
**E.** ADR 0003; `lib/mission-control.ts`.
**F.** "Could add analytics?" → not implemented.
**G.** Do not claim analytics.

### Q149. What about privacy?
**A.** What about privacy?
**B.** ما privacy؟
**C.** No personal data collected; progress/personal local; no accounts; export is user-initiated; no analytics. Clearing browser data loses progress unless exported. (ADR 0003)
**D.** "No personal data collected—progress and collections stay in the browser, no accounts, no analytics. Clearing browser data loses progress unless exported."
**E.** ADR 0003; `lib/progress.ts`, `lib/personal.ts`.
**F.** "GDPR?" → no server data; not formally assessed.
**G.** Do not claim compliance certification.

### Q150. What is the export API?
**A.** What is the export API?
**B.** ما export API؟
**C.** `/api/export`: JSON export of one dataset or whole collection. Known bug: `/api/export?dataset=` broken in production build (force-static) — brief #3. Disclose.
**D.** "A JSON export of one dataset or the whole collection. Note: the dataset-specific query is currently broken in the production build due to force-static—we disclose that."
**E.** `src/app/api/export/route.ts`; brief §9 #3.
**F.** "What works?" → whole collection export.
**G.** Do not hide bug.

---

## 15. Critical, skeptical, uncomfortable (326–345)

### Q151. This is just a pretty website, isn't it?
**A.** This is just a pretty website, isn't it?
**B.** هل هو مجرد موقع جميل؟
**C.** Counter: open schema/source/status reasoning. The value is semantic (status separation, provenance, derived records, validation gates). Visuals serve understanding. (brief §11 tips)
**D.** "Let me show you the schema and a source. The value isn't the visuals—it's that mission and hardware status are structurally separate, every claim cites a source, and the build has verification gates."
**E.** `types/artifact.ts`, `/sources`, `scripts/verify.mjs`.
**F.** "Show me." → Museum artifact page.
**G.** Do not get defensive; show evidence.

### Q152. Your data is tiny (30 items). Why should I care?
**A.** Your data is tiny (30 items). Why should I care?
**B.** البيانات صغيرة (30). لماذا أهتم؟
**C.** Challenge asks "some or all"; curated+verified > large+unchecked. 30 with 3 reading modes + provenance + validation > 1000 uncited facts. "Counts are ceilings deliberately kept small." (DATA_AND_PROVENANCE)
**D.** "The challenge asks for 'some or all,' and we chose a verified set. A smaller checked collection with sources and three reading modes teaches more than a large unchecked one."
**E.** `docs/DATA_AND_PROVENANCE.md` Datasets.
**F.** "Could you scale to 1000?" → more verification cost; not now.
**G.** Do not claim completeness.

### Q153. Are your simulations actually correct?
**A.** Are your simulations actually correct?
**B.** هل المحاكاة صحيحة؟
**C.** S04 (vis-viva) is a real calculation (idealized). S01/S05 have known bugs (disclosed). Others are educational bookkeeping. All labelled "Simulated" with approximation notes. (brief §9, 06 §3)
**D.** "One—orbital mechanics—uses real vis-viva, idealized. Two have known bugs we disclose. The rest are teaching models. All are labelled 'Simulated' with approximation notes, never presented as flight predictions."
**E.** `lib/simulations.ts`, `data/simulations.ts`.
**F.** "Fix the bugs?" → brief lists fix effort.
**G.** Do not present as engineering simulators.

### Q154. You have no user testing. How do you know it works?
**A.** You have no user testing. How do you know it works?
**B.** لا user testing. كيف تعرف أن يعمل؟
**C.** We have automated verification (tests/smoke/journeys/links/axe) for functionality/accessibility. But no user study for learning outcomes. Design intent only. Disclose. (task rules)
**D.** "We verified functionality and accessibility with automated gates—tests, smoke, journeys, links, axe. But we have no user study for learning outcomes, and we say so."
**E.** `docs/ACCESSIBILITY.md`, `docs/DEMO_GUIDE.md`.
**F.** "Would you do user testing?" → yes if funded.
**G.** Do not claim proven outcomes.

### Q155. This looks like many features stitched together.
**A.** This looks like many features stitched together.
**B.** يبدو features مُلصقة.
**C.** Counter: one data model, shared components/tokens, relation graph, cross-links. Supporting surfaces are "specialized entry points" into same records. But museum doesn't link to supporting surfaces (brief #11) — disclose as gap.
**D.** "It's one data model read many ways—shared components, tokens and a relation graph keep it coherent. We acknowledge the Museum doesn't yet link to supporting surfaces; that's a gap."
**E.** `docs/ARCHITECTURE.md`, brief §9 #11.
**F.** "How to improve?" → add cross-links.
**G.** Do not deny the gap.

### Q156. Why should I trust your NASA facts?
**A.** Why should I trust your NASA facts?
**B.** لماذا أثق بحقائق NASA؟
**C.** Sources with org/title/url/type/accessedAt (96); original wording preserved; dataNotes for uncertainty; claim labels; validator+tests; research archive method. But schema doesn't prove NASA accuracy; 4 dead links; claim model not per-field on artifacts. (04, DATA_AND_PROVENANCE)
**D.** "Every record cites registered sources with access dates, preserves NASA's original wording, and notes uncertainty. A validator and tests check consistency. But we don't claim NASA verified our records, and four source links are currently dead."
**E.** `docs/DATA_AND_PROVENANCE.md`, `scripts/validate-data.ts`.
**F.** "Verify one now." → open /sources link.
**G.** Do not claim NASA verification.

### Q157. Your Arabic is incomplete.
**A.** Your Arabic is incomplete.
**B.** العربية غير كاملة.
**C.** Acknowledge: interface chrome translated; editorial prose English-only; stated in Research Archive and accessibility docs. Mixed-language handled with unicode-bidi: plaintext. (02 §10)
**D.** "Correct—interface chrome is translated, editorial prose is English-only, and we state that. Mixed blocks use per-block direction so dates and sentences keep their order."
**E.** `docs/ACCESSIBILITY.md` §Language; `lib/i18n.ts`.
**F.** "Will you translate content?" → not in scope now.
**G.** Do not claim full Arabic.

### Q158. Why not use NASA's own APIs?
**A.** Why not use NASA's own APIs?
**B.** لماذا لا NASA APIs؟
**C.** Static curated collection: deterministic, verifiable, offline demo, no rate limits, no runtime dependency on external APIs. Sources cited. Trade-off: manual updates. (01 limits, DEMO_GUIDE)
**D.** "A static verified collection means the demo works offline, has no rate limits, and every claim is citable. The trade-off is manual updates—we accept that."
**E.** `docs/DEMO_GUIDE.md` "Do not claim" (no NASA dataset).
**F.** "Could add live data?" → future, not now.
**G.** Do not claim NASA data feed.

### Q159. Can a kid actually use this?
**A.** Can a kid actually use this?
**B.** هل طفل يقدر استخدامه؟
**C.** Age bands, playground toys, plain language, glossary, no account, keyboard. But no user testing with children; age bands are design classification. (05, accessibility)
**D.** "It's designed for them—age bands, toy games, glossary, no account—but we haven't tested with children. Age bands are a design choice, not validated pedagogy."
**E.** `data/lessons.ts`, `data/games.ts`, `docs/ACCESSIBILITY.md`.
**F.** "What's the youngest usable age?" → 5-7 band exists.
**G.** Do not claim child-tested.

### Q160. What's your biggest weakness?
**A.** What's your biggest weakness?
**B.** ما أكبر ضعف؟
**C.** Per brief §9: simulation bugs (S01/S05/S06), broken export query, dead links, claim model not on artifacts, museum not linking supporting surfaces, no user study, no screen-reader session, curated (not exhaustive). Pick 2-3 honestly. (brief §9)
**D.** "Our simulations have known bugs we disclose, the dataset-specific export is broken in production, and we have no user study or screen-reader session. We list all of this in the Research Archive."
**E.** `docs/GRAVERSE_COMPETITION_BRIEF_AR.md` §9; `/research`.
**F.** "Which to fix first?" → S01/S05/S06 bugs.
**G.** Do not hide weaknesses.

---

## 16. Why should GRAVERSE win? (346–360)

### Q161. Why should GRAVERSE win?
**A.** Why should GRAVERSE win?
**B.** لماذا يجب أن يفوز؟
**C.** Because it answers the challenge's core (storytelling + accuracy) with a coherent, verifiable, accessible system; treats "abandoned" as heritage; separates mission/hardware status (structural); publishes honest limits; passes verification gates. But avoid superiority claims. (brief §12, 07)
**D.** "Because it turns the challenge's two demands—storytelling and accuracy—into one coherent, verifiable, accessible system, treats 'abandoned' as heritage, and publishes its own limits. We don't claim to be the best; we claim to be honest and integrated."
**E.** `docs/GRAVERSE_COMPETITION_BRIEF_AR.md` §12.
**F.** "What's your strongest evidence?" → status separation + gates.
**G.** Do not claim superiority over unexamined teams.

### Q162. What is your one-sentence pitch?
**A.** What is your one-sentence pitch?
**B.** ما pitch بجملة؟
**C.** "GRAVERSE is one source-linked archive where a mission and its hardware are finally treated as two different things—and that single distinction changes how we teach, record, and remember space exploration." (brief §12)
**D.** "GRAVERSE is one source-linked archive where a mission and its hardware are finally treated as two different things."
**E.** `docs/GRAVERSE_COMPETITION_BRIEF_AR.md` §12.
**F.** "Say it for a child." → "This machine from 1969 still measures the Moon."
**G.** Keep it evidence-backed.

### Q163. What is your closing line?
**A.** What is your closing line?
**B.** ما جملة الختام؟
**C.** "The mission ends; the object does not disappear." / "Mission ending is not object disappearance." (brief §11, 00)
**D.** "The mission ends. The object does not disappear."
**E.** `docs/GRAVERSE_COMPETITION_BRIEF_AR.md` §11.
**F.** "What if asked to elaborate?" → LRRR example.
**G.** Don't over-dramatize.

### Q164. What would you improve next?
**A.** What would you improve next?
**B.** ما تحسينات لاحقة؟
**C.** Fix S01/S05/S06 bugs, fix export query, fix dead links, apply claim model to artifacts, link Museum to supporting surfaces, translate editorial content, add user study, screen-reader session. (brief §9) Present as future, not done.
**D.** "Fix the simulation bugs and broken export, repair dead links, extend claim labels to artifacts, link the Museum to supporting surfaces, and run a real user study. Those are next steps, not shipped features."
**E.** `docs/GRAVERSE_COMPETITION_BRIEF_AR.md` §9.
**F.** "Which first?" → simulation bugs.
**G.** Do not present future as shipped.

### Q165. What do you want judges to remember?
**A.** What do you want judges to remember?
**B.** ما تريد أن يتذكّر الحكام؟
**C.** One verified collection; mission ≠ hardware; every claim says how well established; honest limits published. (brief §12, 07)
**D.** "One verified collection, mission and hardware are two different things, every claim says how well it's established, and we publish our limits."
**E.** `docs/GRAVERSE_COMPETITION_BRIEF_AR.md` §12.
**F.** "Repeat it." → yes.
**G.** Keep concise.

---

## 19. Per-artifact case studies (201–230)

### Q201. Explain `apollo-11-lm-descent-stage` in 60 seconds.
**A.** Explain `apollo-11-lm-descent-stage` in 60 seconds.
**B.** اشرح apollo-11-lm-descent-stage في 60 ثانية.
**C.** قطعة عتاد (lander descent stage) من مهمة Apollo 11، destination moon، missionStatus completed، hardwareStatus inactive (left on Moon), fate left on surface, location region/approximate, contributions science/engineering, source-backed, lastVerified. يوضح فصل mission/hardware: mission completed but hardware inactive on surface.
**D.** "Apollo 11's descent stage: mission completed, hardware inactive and still on the Moon. One record, two statuses—mission done, object rests."
**E.** `src/data/artifacts/*` (moon-a/b), `/museum/apollo-11-lm-descent-stage`.
**F.** "Is it destroyed?" → no; inactive.
**G.** Do not claim exact location.

### Q202. Explain `apollo-11-lrrr` and why it matters.
**A.** Explain `apollo-11-lrrr` and why it matters.
**B.** اشرح apollo-11-lrrr.
**C.** Retroreflector left by Apollo 11; missionStatus completed; hardwareStatus operating (still used today to measure lunar recession via laser ranging). Passive hardware (no independent radio) → communication not-applicable. Canonical example of "mission ends, object keeps working."
**D.** "Apollo 11's retroreflector: mission ended in 1969, but the device still works today measuring how fast the Moon recedes. Passive hardware—no radio of its own."
**E.** `src/data/artifacts/*`, `lib/mission-control.ts` (PASSIVE_IDS).
**F.** "Live status?" → derived; not telemetry.
**G.** Do not say live.

### Q203. Explain `ranger-7`.
**A.** Explain `ranger-7`.
**B.** اشرح ranger-7.
**C.** Probe that impacted Moon deliberately after successful mission. missionStatus completed; hardwareStatus impacted. dataNotes: "'Impacted' describes the hardware outcome, not a mission failure." Shows status separation: mission success vs hardware impact.
**D.** "Ranger 7: mission succeeded, then the spacecraft impacted the Moon deliberately. 'Impacted' is the hardware outcome, not a mission failure."
**E.** artifact record + dataNotes.
**F.** "Was impact a failure?" → no; deliberate.
**G.** Do not call it a failure.

### Q204. Explain `cassini`.
**A.** Explain `cassini`.
**B.** اشرح cassini.
**C.** Orbiter; mission ended by controlled decision (grand finale impact into Saturn). missionStatus ended (or completed); hardwareStatus destroyed/impacted. Shows "ended" mission vs destroyed hardware; controlled disposal.
**D.** "Cassini: mission ended by a controlled decision—grand finale into Saturn. Mission ended, hardware destroyed by design, not by accident."
**E.** artifact record.
**F.** "Why destroy it?" → planetary protection.
**G.** Do not overstate science findings.

### Q205. Explain `insight`.
**A.** Explain `insight`.
**B.** اشرح insight.
**C.** Mars lander; lost contact (no-longer-communicating). missionStatus completed/ended?; hardwareStatus no-longer-communicating. Shows lost contact ≠ destroyed. dataNotes likely.
**D.** "InSight: lost contact, which is not the same as confirmed destruction. The record preserves that uncertainty."
**E.** artifact record.
**F.** "Is it destroyed?" → unknown; not confirmed.
**G.** Do not assert destruction.

### Q206. Explain `voyager-1`.
**A.** Explain `voyager-1`.
**B.** اشرح voyager-1.
**C.** Deep-space probe; missionStatus completed/ongoing?; hardwareStatus still-traveling/operating; still communicating. S03 uses its distance (~24.7 billion km). Example of longevity.
**D.** "Voyager 1: launched 1977, still traveling and communicating. A completed mission whose hardware keeps going."
**E.** artifact record; `lib/simulations.ts` communicationTargets.
**F.** "Is it still operating?" → record says operating; derived comm communicating.
**G.** Do not claim live telemetry.

### Q207. Explain `curiosity`.
**A.** Explain `curiosity`.
**B.** اشرح curiosity.
**C.** Mars rover; missionStatus ongoing; hardwareStatus operating. Used in power/landing sims. Example of ongoing mission + operating hardware.
**D.** "Curiosity: an ongoing mission with operating hardware—still roving and doing science on Mars."
**E.** artifact record.
**F.** "How old?" → launch 2011.
**G.** Do not claim exact current status beyond record.

### Q208. Explain `perseverance`.
**A.** Explain `perseverance`.
**B.** اشرح perseverance.
**C.** Mars rover (2020); mission ongoing; hardware operating. Linked to mars-2020-descent-stage. Used in sims (power, landing, comm).
**D.** "Perseverance: ongoing mission, operating hardware, with its descent stage left behind—mission and hardware tracked separately."
**E.** artifact record.
**F.** "Descent stage status?" → impacted/inactive.
**G.** Do not claim live.

### Q209. Explain `opportunity`.
**A.** Explain `opportunity`.
**B.** اشرح opportunity.
**C.** Mars rover; mission ended (dust storm 2018); hardware no-longer-communicating. Used in S07/S08 (failure investigation). Shows lost contact vs destroyed.
**D.** "Opportunity: mission ended after the 2018 dust storm; hardware no longer communicating. Lost contact, not confirmed destruction."
**E.** artifact record; simulations S07/S08.
**F.** "Why did it die?" → dust storm + aging.
**G.** Do not overstate cause.

### Q210. Explain `phoenix`.
**A.** Explain `phoenix`.
**B.** اشرح phoenix.
**C.** Mars lander; mission completed; hardware inactive (winter). Used in S07. Shows seasonal/inactive.
**D.** "Phoenix: completed its mission and went inactive with the Martian winter. Inactive, not destroyed."
**E.** artifact record.
**F.** "Could it revive?" → no; record says inactive.
**G.** Do not speculate.

---

## 20. Simulation deep-dives (231–265)

### Q211. What constants does S01 use?
**A.** What constants does the Mars landing simulation use?
**B.** ما constants في S01؟
**C.** MARS_GRAVITY=3.711 m/s²; MARS_SURFACE_DENSITY=0.02 kg/m³; MARS_SCALE_HEIGHT=11100 m; capsuleArea=12 m²; parachute Cd=1.5; Isp=300s; maxThrust=12000N; g0=9.80665; dt=0.25s; maxSteps=20000; survivable touchdown ≤6 m/s. (lib/simulations.ts)
**D.** "Gravity 3.71, surface density 0.02, scale height 11.1 km, plus representative capsule area, parachute drag, Isp and thrust. All labelled representative, not mission specs."
**E.** `lib/simulations.ts` simulateLanding.
**F.** "Are these NASA values?" → representative/approximate.
**G.** Do not claim mission-grade constants.

### Q212. What is the S01 known bug?
**A.** What is the known bug in S01?
**B.** ما bug في S01؟
**C.** S01 fails in all 2160 param combinations due to sign error in altitude integration (altitude += velocity*dt with velocity negative? Actually integration sign). Brief #1. Must disclose; do not present as working.
**D.** "A sign error in altitude integration makes it fail every parameter combination. We disclose it and don't present S01 as a working predictor."
**E.** `lib/simulations.ts` simulateLanding; brief §9 #1.
**F.** "Is it fixed?" → not in this repo state; disclose.
**G.** Do not hide.

### Q213. What does S02 compute?
**A.** What does S02 compute?
**B.** ماذا يحسب S02؟
**C.** generationWh (solar: area×590×eff×sunHours×dust; RTG: watts×24), consumptionWh ((instrument+heater)×24 + mobility×driveHours), net, margin %, nightNeed, status (healthy/tight/deficit), notes. (lib/simulations.ts)
**D.** "Daily energy in and out in watt-hours, margin, night-time need, and a healthy/tight/deficit verdict—with dust and RTG notes."
**E.** `lib/simulations.ts` simulatePower.
**F.** "Is 590 W/m² accurate?" → approximate Mars irradiance.
**G.** Do not claim exact.

### Q214. What does S03 compute?
**A.** What does S03 compute?
**B.** ماذا يحسب S03؟
**C.** Light time one-way = distance/299792.458 km/s; round trip ×2; relative signal strength = (384400/distance)² (qualitative). Targets: Moon, Mars, Jupiter, Saturn, Pluto, Voyager1 with representative distances. (lib/simulations.ts)
**D.** "One-way and round-trip light time, plus a qualitative relative signal strength—using representative distances, not fixed orbital positions."
**E.** `lib/simulations.ts` lightTimeSeconds, roundTripSeconds, relativeSignalStrength.
**F.** "Is distance fixed?" → representative; varies.
**G.** Do not claim exact distances.

### Q215. What does S04 compute and what is its example value?
**A.** What does S04 compute and what is its example value?
**B.** ماذا يحسب S04 وقيمة مثال؟
**C.** Hohmann transfer: circular velocities, transfer velocities, Δv1/Δv2/total, transfer time (years), direction. Earth→Mars total ΔV ≈ 5.596 km/s. Idealized: point-mass Sun, ignores inclination, gravity assists, drag, finite burn. (lib/simulations.ts)
**D.** "A two-impulse Hohmann transfer with vis-viva—circular and transfer velocities, delta-v at each end, total, and transfer time. Earth to Mars comes out about 5.6 km/s."
**E.** `lib/simulations.ts` hohmannTransfer; brief.
**F.** "Is it mission-grade?" → no; idealized.
**G.** Do not claim mission-grade.

### Q216. What is the S05 known bug?
**A.** What is the known bug in S05?
**B.** ما bug في S05؟
**C.** Minimum route energy 82.9 Wh > 45 Wh budget → no route can ever be valid. Brief #2. Terrain invented. Disclose.
**D.** "The minimum possible route needs 82.9 Wh against a 45 Wh budget, so no route ever passes. Invented terrain, disclosed bug."
**E.** `lib/simulations.ts` evaluateRoverRoute, roverTerrain; brief §9 #2.
**F.** "Fix?" → raise budget or reduce energy.
**G.** Do not hide.

### Q217. What is the S06 dead knob?
**A.** What is the S06 dead knob?
**B.** ما dead knob في S06؟
**C.** `powerLimitW` accepted but unused in `evaluatePlan`; result depends on sourcePower vs payloadPower. Brief #4 (15 min fix). Disclose.
**D.** "The power-limit input is accepted but ignored—the result uses source vs payload power. Known bug, disclosed."
**E.** `lib/simulations.ts` evaluatePlan, PlanningInput.powerLimitW.
**F.** "Does mass limit work?" → yes.
**G.** Do not hide.

### Q218. What does S07 do?
**A.** What does S07 (What if?) do?
**B.** ماذا يفعل S07؟
**C.** Counterfactual: choose real mission event, change condition (dust/comm delay), read clearly labelled hypothetical outcome; real record shown beside, never altered. (data/simulations.ts S07)
**D.** "Counterfactuals on real mission events—change a condition, see a clearly labelled hypothetical outcome, with the real record untouched beside it."
**E.** `data/simulations.ts` S07; `src/app/simulations/[id]/page.tsx`.
**F.** "Is outcome real?" → hypothetical, not historical.
**G.** Never present hypothetical as fact.

### Q219. What does S08 do?
**A.** What does S08 (Failure investigation) do?
**B.** ماذا يفعل S08؟
**C.** Investigate documented mission endings using record's own evidence; choose hypothesis; compare with source wording; teaches lost contact ≠ destroyed. Does not reproduce official accident investigation. (data/simulations.ts S08)
**D.** "Evidence-based investigation of documented mission endings—compare hypotheses with source wording, learning that lost contact isn't destroyed. Not an official accident report."
**E.** `data/simulations.ts` S08.
**F.** "Official findings?" → no.
**G.** Do not claim official investigation.

### Q220. How do simulations label outputs?
**A.** How do simulations label outputs?
**B.** كيف simulations label outputs؟
**C.** Claim type "simulated" (lib/provenance); approximation note from data/simulations.ts shown in UI; Completion button says "not a grade or NASA result." (Simulators.tsx)
**D.** "Outputs are labelled 'Simulated' with an explicit approximation note, and the completion button states it's not a grade or NASA result."
**E.** `lib/provenance.ts`, `data/simulations.ts`, `Simulators.tsx`.
**F.** "Are any observations?" → no.
**G.** Do not present as observations.

---

## 21. Accessibility & i18n depth (266–285)

### Q221. What does `unicode-bidi: plaintext` solve?
**A.** What does `unicode-bidi: plaintext` solve?
**B.** ما حل unicode-bidi plaintext؟
**C.** In mixed-language blocks, each block takes reading direction from its own content, so English sentences/dates keep order inside Arabic pages. Without it, bidi splits dates like "16 July 1969". (ACCESSIBILITY §Language)
**D.** "It makes each block take direction from its own content, so English dates and sentences keep their order inside Arabic pages."
**E.** `docs/ACCESSIBILITY.md` §Language; `globals.css`.
**F.** "What breaks without it?" → date reordering.
**G.** Do not claim full RTL perfection.

### Q222. How are technical values isolated in RTL?
**A.** How are technical values isolated in RTL?
**B.** كيف technical values في RTL؟
**C.** Technical values (dates, measurements, IDs) isolated so they don't reorder inside Arabic sentences; status/communication badges marked `dir="auto"`. (ACCESSIBILITY §Language)
**D.** "Dates, measurements and IDs are isolated, and badges use dir=auto, so they read as one unit instead of reversing around separators."
**E.** `docs/ACCESSIBILITY.md` §Language.
**F.** "Example?" → "16 July 1969" stays intact.
**G.** Do not claim all values handled.

### Q223. What is the skip-to-content link?
**A.** What is the skip-to-content link?
**B.** ما skip-to-content؟
**C.** First focusable element on every page; lets keyboard users skip nav. Verified in smoke (first Tab reaches skip link; Enter activates). (ACCESSIBILITY §Structure/Keyboard)
**D.** "The first focusable element on every page, letting keyboard users skip navigation—verified by automated checks."
**E.** `docs/ACCESSIBILITY.md`; `scripts/smoke.mjs`.
**F.** "Where does it jump?" → main landmark.
**G.** Do not claim beyond automated.

### Q224. How does the mobile menu work?
**A.** How does the mobile menu work?
**B.** كيف mobile menu؟
**C.** Opens with Enter/Space, moves focus to first link, closes on Escape, restores trigger. Verified in smoke and journeys (phone 390px). (ACCESSIBILITY §Keyboard)
**D.** "Opens with Enter/Space, moves focus inside, closes on Escape and restores focus—verified on phone widths."
**E.** `docs/ACCESSIBILITY.md`; `scripts/smoke.mjs`, `journeys.mjs`.
**F.** "Touch?" → native button.
**G.** Do not claim gesture support.

### Q225. How are forms accessible?
**A.** How are forms accessible?
**B.** كيف forms accessible؟
**C.** Search input has visually hidden label, described-by result count, aria-live polite result summary. Progress import errors announced/explained. Empty states explain next steps. (ACCESSIBILITY §Forms)
**D.** "Search has a hidden label, result count and live region; import errors are announced; empty states guide next steps."
**E.** `docs/ACCESSIBILITY.md` §Forms.
**F.** "Validation messages?" → text.
**G.** Do not claim full form audit.

### Q226. What does axe check?
**A.** What does axe check?
**B.** ماذا يفحص axe؟
**C.** axe-core with tags wcag2a, wcag2aa, wcag21a, wcag21aa on 38 representative pages. Recorded: 0 violations. (ACCESSIBILITY §Automated)
**D.** "axe-core against WCAG 2.0/2.1 A and AA on thirty-eight pages, with zero recorded violations."
**E.** `docs/ACCESSIBILITY.md`; `scripts/smoke.mjs`.
**F.** "Does axe catch everything?" → no (canvas, contrast).
**G.** Do not claim complete a11y.

### Q227. What is the reduced-motion test?
**A.** What is the reduced-motion test?
**B.** ما reduced-motion test؟
**C.** With prefers-reduced-motion: reduce, star-field animation duration ≤0.001s. Verified in smoke. (ACCESSIBILITY §Automated)
**D.** "Checks that under prefers-reduced-motion the star-field animation duration is near zero."
**E.** `docs/ACCESSIBILITY.md`; `scripts/smoke.mjs`.
**F.** "All animations?" → not all individually tested.
**G.** Do not overclaim.

### Q228. What is the keyboard rover test?
**A.** What is the keyboard rover test?
**B.** ما keyboard rover test؟
**C.** ArrowUp moves rover from focused control panel (verified in smoke). Rover Quest accepts arrow keys + WASD. (ACCESSIBILITY §Keyboard)
**D.** "Verifies the rover actually moves via keyboard (ArrowUp from the focused panel)."
**E.** `docs/ACCESSIBILITY.md`; `scripts/smoke.mjs`.
**F.** "Other keys?" → WASD.
**G.** Do not claim full keyboard coverage.

### Q229. What is the gameplay badge test?
**A.** What is the gameplay badge test?
**B.** ما gameplay badge test؟
**C.** Launching toy rocket waits for completion and checks `badge-play-rocket` saved to local progress. Verified in smoke. (ACCESSIBILITY §Automated)
**D.** "Launches the toy rocket and verifies the badge was saved to local progress."
**E.** `docs/ACCESSIBILITY.md`; `scripts/smoke.mjs`.
**F.** "Does it test Moon/Rover badges?" → not specified.
**G.** Do not overclaim.

### Q230. What is the link check?
**A.** What is the link check?
**B.** ما link check؟
**C.** `scripts/link-check.mjs` crawls 40 pages, collects every internal link, confirms each target resolves. Recorded 192/192. Automated form of "no decorative dead ends." (ARCHITECTURE §9)
**D.** "Crawls forty pages and confirms all one hundred ninety-two internal links resolve."
**E.** `scripts/link-check.mjs`; `docs/ARCHITECTURE.md` §9.
**F.** "External links?" → not checked (separate).
**G.** Do not claim external link health.

---

## 22. Data & validation depth (286–305)

### Q231. What does `scripts/validate-data.ts` check?
**A.** What does `scripts/validate-data.ts` check?
**B.** ماذا يفحص validate-data؟
**C.** 8 checks: unique IDs, Zod schemas, source citation resolution, confirmed/estimated cite source, simulated note/source, mission artifact IDs exist, relation targets+inverses, static params generatable. (DATA_AND_PROVENANCE §Validation)
**D.** "Eight checks: unique IDs, schemas, source resolution, claim rules, mission links, relation symmetry, and static params."
**E.** `scripts/validate-data.ts`; `docs/DATA_AND_PROVENANCE.md`.
**F.** "Link liveness?" → no.
**G.** Do not claim scientific truth validation.

### Q232. What do the 21 data tests cover?
**A.** What do the 21 data tests cover?
**B.** ماذا تغطي 21 data tests؟
**C.** Counts, citation resolution, derived missions, relation symmetry, claim validation, search coverage, experience resolver, progress import validation. (ARCHITECTURE §9, DATA_AND_PROVENANCE)
**D.** "Counts, citation resolution, derived missions, relation symmetry, claim validation, search coverage, experience resolver and progress import validation."
**E.** `tests/data.test.ts`.
**F.** "All pass?" → recorded 21/21.
**G.** Do not claim fresh run.

### Q233. What is `datasetStats`?
**A.** What is `datasetStats`?
**B.** ما datasetStats؟
**C.** Computed from collection (not hand-typed) in `artifacts/index.ts`. Used for homepage counts. (04 mentions stats derived)
**D.** "Stats computed from the collection itself, not hand-typed, so they can't drift from the data."
**E.** `src/data/artifacts/index.ts`.
**F.** "What stats?" → counts by destination/type.
**G.** Do not claim hand-curated stats.

### Q234. How are artifacts sorted?
**A.** How are artifacts sorted?
**B.** كيف ترتيب artifacts؟
**C.** By primaryMilestone date (in `artifacts/index.ts`). Explorer can sort oldest/newest/name. (04 §4)
**D.** "By primary milestone date in the index; Explorer lets you re-sort oldest, newest or by name."
**E.** `src/data/artifacts/index.ts`, `lib/explore.ts` sortArtifacts.
**F.** "Default?" → oldest (primary milestone).
**G.** Do not claim alphabetical default.

### Q235. What is `primaryMilestone`?
**A.** What is `primaryMilestone`?
**B.** ما primaryMilestone؟
**C.** The headline event for an artifact (MissionEvent), used for sorting, decade filtering, and default timeline entry. (types/artifact.ts)
**D.** "The headline event of an artifact—used for sorting, decade filtering and the default timeline entry."
**E.** `types/artifact.ts` Artifact.primaryMilestone.
**F.** "Can it differ from timelineEvents?" → yes; timeline has all events.
**G.** Do not confuse with all events.

### Q236. What is the difference between scope "primary" and "all" in Explorer?
**A.** What is the difference between scope "primary" and "all" in Explorer?
**B.** ما الفرق primary vs all؟
**C.** "primary": one entry per artifact (primaryMilestone). "all": every timelineEvent becomes an entry. Allows surfacing launches/flybys/end-of-mission beyond primary. (lib/explore.ts timelineEntries)
**D.** "Primary shows one entry per artifact; 'all' expands every timeline event, so you can surface launches, flybys and endings beyond the headline."
**E.** `lib/explore.ts` timelineEntries.
**F.** "Does eventType filter work in both?" → yes (on individual event).
**G.** Do not claim default is all.

### Q237. What is `activeFilterCount`?
**A.** What is `activeFilterCount`?
**B.** ما activeFilterCount؟
**C.** Counts non-"all" filters; drives "clear filters" affordance. (lib/explore.ts)
**D.** "Counts how many filters are active, so the UI can show a clear-filters affordance."
**E.** `lib/explore.ts` activeFilterCount, hasActiveFilters.
**F.** "Max?" → 6.
**G.** Do not overstate.

### Q238. How does `searchScore` rank?
**A.** How does `searchScore` rank?
**B.** كيف searchScore يرتب؟
**C.** Weighted: name exact 120 / starts 80 / includes 55; mission 35; aliases 30; destination/type 20; haystack 10. All terms must match (else 0). Sort by score desc then date. (lib/explore.ts)
**D.** "Weighted by field—exact name highest, then mission, aliases, type, general text—and every term must match or the artifact is excluded."
**E.** `lib/explore.ts` searchScore, searchArtifacts.
**F.** "Is it fuzzy?" → no; NFKD normalization + substring.
**G.** Do not claim NLP.

### Q239. What is NFKD normalization?
**A.** What is NFKD normalization in search?
**B.** ما NFKD normalization؟
**C.** Unicode normalization to decompose accented characters, then strip combining marks (regex [\u0300-\u036f]) for accent-insensitive matching. (lib/explore.ts)
**D.** "It decomposes accented characters and strips combining marks, so 'cafe' matches 'café'."
**E.** `lib/explore.ts` searchScore/searchExtras.
**F.** "Full Unicode?" → basic accent folding.
**G.** Do not claim full i18n search.

### Q240. What is the `relations.ts` inverse rule?
**A.** What is the `relations.ts` inverse rule?
**B.** ما inverse rule؟
**C.** Each directed edge has an inverse edge; data test asserts symmetry and target resolution. Types listed in relationContract. (04 §4)
**D.** "Every edge has an inverse, and a test checks both resolve—so connected records work both ways."
**E.** `data/relations.ts`, `lib/provenance.ts` relationContract.
**F.** "Can edges be one-way?" → no; inverse required.
**G.** Do not claim DB constraints.

---

## 23. Final consolidation (306–330)

### Q241. What is the product's "honest limitations" section?
**A.** What is the product's "honest limitations" section?
**B.** ما "honest limitations"؟
**C.** In Research Archive (`/research`): 4 explicit limits (curated not exhaustive; no live telemetry; simulations educational; no measured outcomes). Also Demo Guide "Do not claim." (07, brief)
**D.** "Four explicit limits in the Research Archive—curated not exhaustive, no live telemetry, simulations are educational, no measured outcomes—plus a published 'do not claim' list."
**E.** `/research` (data/research.ts), `docs/DEMO_GUIDE.md`.
**F.** "Why publish weaknesses?" → builds trust.
**G.** Do not soften them.

### Q242. What is the "two different questions" section?
**A.** What is the "two different questions" section?
**B.** ما "two different questions"؟
**C.** On artifact detail page: mission status and hardware status shown side by side with labels, illustrating separation. (brief §4, Museum)
**D.** "The artifact page shows mission status and hardware status side by side, labelled as two different questions."
**E.** `src/app/museum/[id]/page.tsx`, `components/ui/StatusBadge.tsx`.
**F.** "Example?" → Apollo 11 LRRR.
**G.** Do not mislabel.

### Q243. What is the collection count breakdown?
**A.** What is the collection count breakdown?
**B.** ما تفاصيل counts؟
**C.** 30 artifacts, 20 bodies, 8 deep-sky, 24 missions (derived), 12 lessons, 4 journeys, 3 games, 8 articles, 7 engineering, 8 stories, 8 simulations, 7 research sections, 40 glossary, 96 sources, 581 relation edges. (DATA_AND_PROVENANCE, DEMO_GUIDE)
**D.** "Thirty artifacts, twenty bodies, eight deep-sky, twenty-four derived missions, twelve lessons, four journeys, three games, eight articles, seven engineering explainers, eight stories, eight simulations, and ninety-six sources."
**E.** `docs/DATA_AND_PROVENANCE.md`, `docs/DEMO_GUIDE.md`.
**F.** "Are counts hand-typed?" → stats derived; counts validated.
**G.** Do not invent counts.

### Q244. What is the route count?
**A.** What is the route count?
**B.** ما عدد routes؟
**C.** 47 route patterns → 172 concrete routes: 35 static + 137 generated via generateStaticParams. `/search` only dynamic. (ARCHITECTURE §1)
**D.** "Forty-seven route patterns resolving to one hundred seventy-two concrete routes—thirty-five static and one hundred thirty-seven generated."
**E.** `docs/ARCHITECTURE.md` §1.
**F.** "How generated?" → generateStaticParams.
**G.** Do not claim ISR.

### Q245. What is the First Load JS baseline?
**A.** What is the First Load JS baseline?
**B.** ما First Load JS baseline؟
**C.** Shared baseline 87.7 kB in recorded build. Explorer orrery and playground routes largest due to lazy 3D chunks. (PERFORMANCE.md)
**D.** "Shared baseline 87.7 kB; orrery and playground routes are larger because of their lazy 3D chunks."
**E.** `docs/PERFORMANCE.md`.
**F.** "Lighthouse?" → not measured.
**G.** Do not claim Lighthouse.

### Q246. What is the LCP range?
**A.** What is the LCP range?
**B.** ما نطاق LCP؟
**C.** Local probe: 56–96 ms across 13 routes, CLS 0. Unthrottled headless Chrome, no network throttling. Not Lighthouse/field. (PERFORMANCE.md)
**D.** "Fifty-six to ninety-six milliseconds LCP and zero CLS on thirteen routes—but local, unthrottled Chrome, not Lighthouse or field data."
**E.** `docs/PERFORMANCE.md`.
**F.** "Comparable to Lighthouse?" → no.
**G.** Do not present as Lighthouse.

### Q247. What is the accessibility target?
**A.** What is the accessibility target?
**B.** ما target accessibility؟
**C.** WCAG 2.1 AA. Automated axe 0 violations on 38 pages (wcag2a/aa/21a/21aa). But no screen-reader session recorded. (ACCESSIBILITY)
**D.** "WCAG 2.1 AA target, with zero axe violations on thirty-eight pages—but no recorded screen-reader session."
**E.** `docs/ACCESSIBILITY.md`.
**F.** "Certified?" → no.
**G.** Do not claim certification.

### Q248. What is the performance caveat?
**A.** What is the performance caveat?
**B.** ما caveat performance؟
**C.** Local unthrottled headless Chrome numbers; not Lighthouse scores, not field data, not deployed CDN. WebGL support not forced in probe (lazy chunks not measured). Run-to-run variance. (PERFORMANCE.md)
**D.** "They're local, unthrottled, headless-Chrome numbers—not Lighthouse, not field data, and the 3D chunks weren't loaded in the probe."
**E.** `docs/PERFORMANCE.md`.
**F.** "Should we quote them?" → with caveats.
**G.** Do not overstate.

### Q249. What is the CI pipeline?
**A.** What is the CI pipeline?
**B.** ما CI pipeline؟
**C.** `.github/workflows/ci.yml` runs validate, test:data, lint, build, typecheck, smoke, journeys, links (per ARCHITECTURE §9). Node 22. (02, ARCHITECTURE)
**D.** "GitHub Actions runs the full gate: validation, data tests, lint, typecheck, build, smoke, journeys and link checks on Node 22."
**E.** `.github/workflows/ci.yml`, `docs/ARCHITECTURE.md` §9.
**F.** "Does CI deploy?" → not documented.
**G.** Do not claim deployment.

### Q250. What is the final one-line thesis?
**A.** What is the final one-line thesis?
**B.** ما thesis بجملة؟
**C.** "GRAVERSE is one source-linked archive where a mission and its hardware are finally treated as two different things." (brief §12)
**D.** "GRAVERSE is one source-linked archive where a mission and its hardware are finally treated as two different things."
**E.** `docs/GRAVERSE_COMPETITION_BRIEF_AR.md` §12.
**F.** "Repeat for a child." → "This machine from 1969 still measures the Moon."
**G.** Keep evidence-backed.

---

> **Bank total: 250 detailed questions (Q1–Q250).** Need 10 more to exceed 260. Appending final 15.<|end|><|start|>Assistant to=shell<|channel|>analysis <|constrain|>xml<|message|><rfl:parameter name="command">
cd /Users/faridelsayed/orca/Graverse && python3 - <<'PY'
p='docs/study/_extra_questions.md'
s=open(p).read()
idx=s.find('> **Bank total: 250')
s=s[:idx].rstrip()+'\n'
open(p,'w').write(s)
print('trimmed')
PY

## 24. Final push to 260+ (251–266)

### Q251. What is `src/app/layout.tsx` responsible for?
**A.** What is `src/app/layout.tsx` responsible for?
**B.** ما دور layout.tsx؟
**C.** Root layout: Inter font (next/font/local), theme pre-paint script, header/footer, locale, experience theme. (ARCHITECTURE §4)
**D.** "Root layout: local Inter font, theme pre-paint script, header and footer, locale, and experience theming."
**E.** `src/app/layout.tsx`.
**F.** "Why pre-paint script?" → avoid dark flash on Academy.
**G.** Do not claim no flash without it.

### Q252. What is `src/app/academy/layout.tsx` responsible for?
**A.** What is `src/app/academy/layout.tsx` responsible for?
**B.** ما دور academy/layout.tsx؟
**C.** Renders `AcademyNav` once, so all Academy pages share one labelled navigation. (ARCHITECTURE §5a)
**D.** "Renders the Academy navigation once, so every Academy page shares one labelled nav surface."
**E.** `src/app/academy/layout.tsx`, `components/academy/AcademyNav.tsx`.
**F.** "Why once?" → consistency, less duplication.
**G.** Do not claim dynamic nav.

### Q253. What is `src/app/not-found.tsx`?
**A.** What is `src/app/not-found.tsx`?
**B.** ما not-found.tsx؟
**C.** Branded 404 page for unmatched routes/bad IDs. (ARCHITECTURE §8)
**D.** "A branded 404 page for unmatched routes and unknown IDs."
**E.** `src/app/not-found.tsx`.
**F.** "When triggered?" → bad artifact/mission/etc. ID.
**G.** Do not claim custom error codes.

### Q254. What is `src/app/error.tsx`?
**A.** What is `src/app/error.tsx`?
**B.** ما error.tsx؟
**C.** Client error boundary with retry path. (ARCHITECTURE §8)
**D.** "A client-side error boundary offering a retry path."
**E.** `src/app/error.tsx`.
**F.** "Does it log errors?" → not documented.
**G.** Do not claim error reporting.

### Q255. What is `src/app/loading.tsx`?
**A.** What is `src/app/loading.tsx`?
**B.** ما loading.tsx؟
**C.** Route-level loading state for Suspense boundaries. (Next.js convention)
**D.** "A route-level loading state shown while a segment loads."
**E.** `src/app/loading.tsx`.
**F.** "Custom skeleton?" → check file.
**G.** Do not overstate.

### Q256. What is `src/components/ui/Reveal.tsx`?
**A.** What is `src/components/ui/Reveal.tsx`?
**B.** ما Reveal؟
**C.** Reveal animation component (fade-up). Respects reduced motion. (tailwind keyframes, ACCESSIBILITY)
**D.** "A reveal animation (fade-up) that respects reduced motion."
**E.** `components/ui/Reveal.tsx`.
**F.** "Which pages use it?" → not fully traced.
**G.** Do not overclaim usage.

### Q257. What is `src/components/ui/SectionHeading.tsx`?
**A.** What is `src/components/ui/SectionHeading.tsx`?
**B.** ما SectionHeading؟
**C.** Shared section heading component for consistent headings. (file map)
**D.** "A shared section heading for consistent titles across pages."
**E.** `components/ui/SectionHeading.tsx`.
**F.** "Styling?" → tokens.
**G.** Do not overstate.

### Q258. What is `src/components/ui/ApproximationNote.tsx`?
**A.** What is `src/components/ui/ApproximationNote.tsx`?
**B.** ما ApproximationNote؟
**C.** Renders the simulation approximation note (from data/simulations.ts) so visitors see limits. (06, DATA_AND_PROVENANCE)
**D.** "Renders each simulator's explicit approximation note so limits are visible."
**E.** `components/ui/ApproximationNote.tsx`, `data/simulations.ts`.
**F.** "On every simulator?" → yes (page).
**G.** Do not claim all notes identical.

### Q259. What is `src/components/brand/Logo.tsx`?
**A.** What is `src/components/brand/Logo.tsx`?
**B.** ما Logo؟
**C.** Brand logo component used in header. (file map)
**D.** "The brand logo used in the site header."
**E.** `components/brand/Logo.tsx`, `components/layout/SiteHeader.tsx`.
**F.** "SVG?" → check file.
**G.** Do not overstate.

### Q260. What is `src/lib/cn.ts` used for?
**A.** What is `src/lib/cn.ts` used for?
**B.** ما استخدام cn.ts؟
**C.** Merges classNames (likely clsx + tailwind-merge) used widely in components. (file map)
**D.** "A className merge helper used throughout the components."
**E.** `lib/cn.ts`.
**F.** "External deps?" → check imports.
**G.** Do not overstate.

### Q261. What is the `public/images/gallery` directory?
**A.** What is the `public/images/gallery` directory?
**B.** ما public/images/gallery؟
**C.** WebP gallery images (optimized) for artifacts. (file listing)
**D.** "Optimized WebP gallery images for artifact media."
**E.** `public/images/gallery/*`.
**F.** "All artifacts have gallery images?" → 30 webp listed (matches artifacts).
**G.** Do not claim rights.

### Q262. What is `scripts/fetch-images.mjs`?
**A.** What is `scripts/fetch-images.mjs`?
**B.** ما fetch-images.mjs؟
**C.** Helper script to fetch images (asset pipeline). Not part of verification gate. (file map)
**D.** "An asset helper for fetching images—not part of the verification gate."
**E.** `scripts/fetch-images.mjs`.
**F.** "Used in build?" → no.
**G.** Do not claim automated image fetching in CI.

### Q263. What is `scripts/build-gallery-textures.mjs`?
**A.** What is `scripts/build-gallery-textures.mjs`?
**B.** ما build-gallery-textures.mjs؟
**C.** Helper script to build gallery textures. Not part of verification gate. (file map)
**D.** "An asset helper for building gallery textures—not part of the verification gate."
**E.** `scripts/build-gallery-textures.mjs`.
**F.** "Used in build?" → no.
**G.** Do not claim.

### Q264. What is the `.env.example` for?
**A.** What is `.env.example` for?
**B.** ما .env.example؟
**C.** Documents env vars: NEXT_PUBLIC_SITE_URL (canonical URL/OG/sitemap), CHROME_PATH (optional for browser tests), GRAVERSE_DIST_DIR (build dir override). (file)
**D.** "Documents the environment variables: site URL, optional Chrome path, and build directory override."
**E.** `.env.example`, `next.config.mjs`.
**F.** "Required vars?" → none required locally.
**G.** Do not claim secrets.

### Q265. What is `.nvmrc`?
**A.** What is `.nvmrc`?
**B.** ما .nvmrc؟
**C.** Specifies Node 22 for nvm. Matches engines (node>=22). (file)
**D.** "Pins Node 22 for nvm, matching the engines requirement."
**E.** `.nvmrc`, `package.json` engines.
**F.** "CI uses?" → node 22.
**G.** Do not claim other versions.

### Q266. What is the final message to the team?
**A.** What is the final message to the team?
**B.** ما الرسالة النهائية؟
**C.** We built the product; now understand it. Don't hide limits. Defend with evidence. "The objective is not to say GRAVERSE is great, but to understand exactly what it is, how it works, why built this way, value, limitations, and how to defend under questioning." (task final directive)
**D.** "We built it—now understand it. Don't hide limits; defend with evidence."
**E.** Task final directive.
**F.** "What if asked unknown?" → say unknown.
**G.** Never fabricate.
EOF
echo done

## 25. Additional grounded questions (267–301)

### Q267. What is `src/types/progress.ts`?
**A.** What is `src/types/progress.ts`?
**B.** ما types/progress.ts؟
**C.** Defines ProgressState interface used by progress.ts. (file map)
**D.** "The TypeScript interface for the local progress record."
**E.** `types/progress.ts`, `lib/progress.ts`.
**F.** "Version?" → 1.
**G.** Do not overstate.

### Q268. What is `src/types/space.ts`?
**A.** What is `src/types/space.ts`?
**B.** ما types/space.ts؟
**C.** Defines Body and DeepSky types used by space data and Explorer. (file map)
**D.** "Types for solar-system bodies and deep-sky objects."
**E.** `types/space.ts`, `data/space/*`.
**F.** "Claim field?" → bodyFactSchema claim.
**G.** Do not overstate.

### Q269. What is `src/types/academy.ts`?
**A.** What is `src/types/academy.ts`?
**B.** ما types/academy.ts؟
**C.** Defines Lesson, Journey, Article and related academy types. (file map)
**D.** "Types for lessons, journeys and articles."
**E.** `types/academy.ts`, `data/lessons.ts`, `data/journeys.ts`, `data/articles.ts`.
**F.** "Source IDs required?" → yes (min 1).
**G.** Do not overstate.

### Q270. What is `src/types/provenance.ts`?
**A.** What is `src/types/provenance.ts`?
**B.** ما types/provenance.ts؟
**C.** Defines ClaimType union (confirmed/estimated/simulated/unknown). (file)
**D.** "The ClaimType union: confirmed, estimated, simulated, unknown."
**E.** `types/provenance.ts`, `lib/provenance.ts`.
**F.** "Where used?" → bodies/deep-sky facts, ClaimBadge.
**G.** Do not claim on artifacts.

### Q271. What is `src/types/play.ts`?
**A.** What is `src/types/play.ts`?
**B.** ما types/play.ts؟
**C.** Types for playground games. (file map)
**D.** "Types for the three playground games."
**E.** `types/play.ts`, `data/games.ts`.
**F.** "How many games?" → 3.
**G.** Do not overstate.

### Q272. What is `src/types/kids.ts`?
**A.** What is `src/types/kids.ts`?
**B.** ما types/kids.ts؟
**C.** Types for kids/junior surfaces. (file map)
**D.** "Types for the junior/kids surfaces."
**E.** `types/kids.ts`, `data/kids.ts`.
**F.** "Still used?" → /kids redirects to /academy.
**G.** Do not overstate.

### Q273. What is `src/types/gallery.ts`?
**A.** What is `src/types/gallery.ts`?
**B.** ما types/gallery.ts؟
**C.** Type for museum gallery canvas. (file map)
**D.** "A type for the museum gallery canvas."
**E.** `types/gallery.ts`, `components/museum/GalleryCanvas.tsx`.
**F.** "Details?" → inspect file.
**G.** Do not overstate.

### Q274. What is `src/types/robot.ts`?
**A.** What is `src/types/robot.ts`?
**B.** ما types/robot.ts؟
**C.** Types for robot guide/lab. (file map)
**D.** "Types for the robot guide and lab."
**E.** `types/robot.ts`, `lib/robot.ts`, `components/kids/RobotLab.tsx`.
**F.** "Is it AI?" → no.
**G.** Do not claim AI.

### Q275. What is `src/components/kids/RobotLab.tsx`?
**A.** What is `src/components/kids/RobotLab.tsx`?
**B.** ما RobotLab؟
**C.** Beginner-friendly interactive robot lab. Not an AI agent or NASA source. (06)
**D.** "A beginner-friendly interactive robot lab—not an AI agent or NASA source."
**E.** `components/kids/RobotLab.tsx`, `lib/robot.ts`, `lib/robot-chat.ts`.
**F.** "AI?" → no.
**G.** Do not claim AI.

### Q276. What is `src/components/kids/JuniorArtifactCard.tsx`?
**A.** What is `src/components/kids/JuniorArtifactCard.tsx`?
**B.** ما JuniorArtifactCard؟
**C.** Simplified artifact card for junior audience. (file map)
**D.** "A simplified artifact card for younger readers."
**E.** `components/kids/JuniorArtifactCard.tsx`.
**F.** "Used where?" → kids surfaces.
**G.** Do not overstate.

### Q277. What is `src/components/kids/JuniorQuiz.tsx`?
**A.** What is `src/components/kids/JuniorQuiz.tsx`?
**B.** ما JuniorQuiz؟
**C.** Simplified quiz for junior audience. (file map)
**D.** "A simplified quiz for younger readers."
**E.** `components/kids/JuniorQuiz.tsx`.
**F.** "Graded?" → no; feedback.
**G.** Do not claim assessment.

### Q278. What is `src/components/museum/GalleryCanvas.tsx`?
**A.** What is `src/components/museum/GalleryCanvas.tsx`?
**B.** ما GalleryCanvas؟
**C.** 3D gallery canvas (visual enrichment). Facts/sources remain in text. (file map)
**D.** "A 3D gallery canvas—visual enrichment, not the source of facts."
**E.** `components/museum/GalleryCanvas.tsx`, `GalleryStage.tsx`, `MuseumGallerySection.tsx`.
**F.** "Accessible?" → decorative; 2D content available.
**G.** Do not claim 3D accessibility.

### Q279. What is `src/components/three/SpaceCanvas.tsx`?
**A.** What is `src/components/three/SpaceCanvas.tsx`?
**B.** ما SpaceCanvas؟
**C.** Shared wrapper for Three.js canvas. (file map)
**D.** "A shared wrapper for Three.js canvases."
**E.** `components/three/SpaceCanvas.tsx`, `SpaceScene.tsx`.
**F.** "Where used?" → scenes.
**G.** Do not overstate.

### Q280. What is `src/components/layout/SiteHeader.tsx`?
**A.** What is `src/components/layout/SiteHeader.tsx`?
**B.** ما SiteHeader؟
**C.** Shared header with navigation, experience switcher, language/motion toggles, mobile menu. (file map, accessibility)
**D.** "The shared header: navigation, experience switcher, language and motion toggles, and the mobile menu."
**E.** `components/layout/SiteHeader.tsx`.
**F.** "Accessible?" → keyboard-tested.
**G.** Do not overstate.

### Q281. What is `src/components/layout/SiteFooter.tsx`?
**A.** What is `src/components/layout/SiteFooter.tsx`?
**B.** ما SiteFooter؟
**C.** Shared footer. Translated in Arabic. (file map, accessibility)
**D.** "The shared footer, translated in the Arabic interface."
**E.** `components/layout/SiteFooter.tsx`.
**F.** "Links?" → check file.
**G.** Do not overstate.

### Q282. What is `src/components/layout/ExperienceSwitcher.tsx`?
**A.** What is `src/components/layout/ExperienceSwitcher.tsx`?
**B.** ما ExperienceSwitcher؟
**C.** Switcher between Academy/Museum/Explorer in header. (file map)
**D.** "A header switcher between the three core experiences."
**E.** `components/layout/ExperienceSwitcher.tsx`.
**F.** "Accessible?" → native links.
**G.** Do not overstate.

### Q283. What is `src/components/artifacts/ArtifactCard.tsx`?
**A.** What is `src/components/artifacts/ArtifactCard.tsx`?
**B.** ما ArtifactCard؟
**C.** Reusable artifact card (visual/name/status/destination) used in Museum/Explorer. (file map)
**D.** "A reusable artifact card showing visual, name, status and destination."
**E.** `components/artifacts/ArtifactCard.tsx`.
**F.** "Where used?" → Museum hub, Explorer.
**G.** Do not overstate.

### Q284. What is `src/components/artifacts/ArtifactListRow.tsx`?
**A.** What is `src/components/artifacts/ArtifactListRow.tsx`?
**B.** ما ArtifactListRow؟
**C.** List-row variant for Explorer list view (accessible alternative). (file map)
**D.** "A list-row variant used by Explorer's accessible list view."
**E.** `components/artifacts/ArtifactListRow.tsx`.
**F.** "Accessible?" → yes (list view).
**G.** Do not overstate.

### Q285. What is `src/components/artifacts/ArtifactVisual.tsx`?
**A.** What is `src/components/artifacts/ArtifactVisual.tsx`?
**B.** ما ArtifactVisual؟
**C.** Displays artifact media; no fabricated placeholder if missing. (file map, DATA_AND_PROVENANCE)
**D.** "Displays artifact media, with a deliberate no-image state when missing."
**E.** `components/artifacts/ArtifactVisual.tsx`.
**F.** "Generates placeholder?" → no.
**G.** Do not claim generated images.

### Q286. What is `src/components/artifacts/ArtifactAnatomy.tsx`?
**A.** What is `src/components/artifacts/ArtifactAnatomy.tsx`?
**B.** ما ArtifactAnatomy؟
**C.** "Recorded anatomy" panel grouping specs already in record; reading aid, not physical layout; labelled non-reconstruction. (DATA_AND_PROVENANCE)
**D.** "A reading aid grouping specs already in the record—labelled as a non-reconstruction."
**E.** `components/artifacts/ArtifactAnatomy.tsx`.
**F.** "To scale?" → no.
**G.** Do not call it a real diagram.

### Q287. What is `src/components/artifacts/ArtifactActions.tsx`?
**A.** What is `src/components/artifacts/ArtifactActions.tsx`?
**B.** ما ArtifactActions؟
**C.** Favourite/recent actions on artifact (personal state). (file map)
**D.** "Favourite and recent-view actions tied to personal state."
**E.** `components/artifacts/ArtifactActions.tsx`, `lib/personal.ts`.
**F.** "Requires account?" → no.
**G.** Do not claim sync.

### Q288. What is `src/components/artifacts/BackButton.tsx`?
**A.** What is `src/components/artifacts/BackButton.tsx`?
**B.** ما BackButton؟
**C.** Back navigation button. (file map)
**D.** "A back-navigation button."
**E.** `components/artifacts/BackButton.tsx`.
**F.** "History-based?" → check.
**G.** Do not overstate.

### Q289. What is `src/components/explorer/FactGrid.tsx`?
**A.** What is `src/components/explorer/FactGrid.tsx`?
**B.** ما FactGrid؟
**C.** Renders body/deep-sky facts with claim badges. (file map, 05)
**D.** "Renders facts with claim badges for bodies and deep-sky objects."
**E.** `components/explorer/FactGrid.tsx`.
**F.** "Used on artifacts?" → no (artifacts use dataNotes).
**G.** Do not claim on artifacts.

### Q290. What is `src/components/explorer/OrbitMap.tsx`?
**A.** What is `src/components/explorer/OrbitMap.tsx`?
**B.** ما OrbitMap؟
**C.** Accessible SVG orbit map with real links (2D alternative to orrery). (ACCESSIBILITY, ARCHITECTURE §5)
**D.** "An accessible SVG orbit map with real links—the 2D alternative to the 3D orrery."
**E.** `components/explorer/OrbitMap.tsx`.
**F.** "Keyboard-operable?" → yes.
**G.** Do not claim 3D interaction.

### Q291. What is `src/components/explorer/Orrery3D.tsx`?
**A.** What is `src/components/explorer/Orrery3D.tsx`?
**B.** ما Orrery3D؟
**C.** Decorative 3D orrery (lazy, WebGL-gated, aria-hidden, not to scale). (ARCHITECTURE §5)
**D.** "A decorative, lazy-loaded 3D orrery—aria-hidden and not to scale."
**E.** `components/explorer/Orrery3D.tsx`, `OrreryScene.tsx`.
**F.** "Required for facts?" → no.
**G.** Do not claim accuracy.

### Q292. What is `src/components/academy/AcademyNav.tsx`?
**A.** What is `src/components/academy/AcademyNav.tsx`?
**B.** ما AcademyNav؟
**C.** Shared labelled navigation for Academy (Overview, Journeys, Lessons, Playground, Robot lab, Build rover, Flashcards, Progress, Achievements, Certificate). Rendered once by layout. (ARCHITECTURE §5a)
**D.** "The shared labelled navigation across all Academy pages."
**E.** `components/academy/AcademyNav.tsx`, `app/academy/layout.tsx`.
**F.** "Translated?" → interface chrome yes.
**G.** Do not overstate.

### Q293. What is `src/components/academy/LessonCard.tsx`?
**A.** What is `src/components/academy/LessonCard.tsx`?
**B.** ما LessonCard؟
**C.** Card for a lesson (title, age band, minutes, summary). (file map)
**D.** "A card summarising a lesson—title, age band, duration and summary."
**E.** `components/academy/LessonCard.tsx`.
**F.** "Links to lesson?" → yes.
**G.** Do not overstate.

### Q294. What is `src/components/academy/LessonQuiz.tsx`?
**A.** What is `src/components/academy/LessonQuiz.tsx`?
**B.** ما LessonQuiz؟
**C.** Client-side quiz with feedback/explanation; saves score/total to progress. (05 §1.2)
**D.** "A client-side quiz with feedback and explanations, saving score and total locally."
**E.** `components/academy/LessonQuiz.tsx`, `lib/progress.ts`.
**F.** "Graded?" → no; feedback.
**G.** Do not claim assessment.

### Q295. What is `src/components/academy/ProgressDashboard.tsx`?
**A.** What is `src/components/academy/ProgressDashboard.tsx`?
**B.** ما ProgressDashboard؟
**C.** Client component reading shared local progress (lessons/journeys/games/badges). (file map, ARCHITECTURE)
**D.** "A client component reading the shared local progress record."
**E.** `components/academy/ProgressDashboard.tsx`, `lib/use-progress.ts`.
**F.** "Cloud?" → no.
**G.** Do not claim sync.

### Q296. What is `src/components/academy/JourneySteps.tsx`?
**A.** What is `src/components/academy/JourneySteps.tsx`?
**B.** ما JourneySteps؟
**C.** Renders journey steps with completion tracking. (file map)
**D.** "Renders a journey's steps with completion tracking."
**E.** `components/academy/JourneySteps.tsx`, `data/journeys.ts`.
**F.** "Awards badge?" → on completion.
**G.** Do not claim certification.

### Q297. What is `src/components/academy/Flashcards.tsx`?
**A.** What is `src/components/academy/Flashcards.tsx`?
**B.** ما Flashcards؟
**C.** Client-side flashcard study (retrieval practice). State local. (file map)
**D.** "Client-side flashcards for retrieval practice."
**E.** `components/academy/Flashcards.tsx`.
**F.** "Progress tracked?" → not in progress schema (unknown).
**G.** Do not overclaim.

### Q298. What is `src/components/academy/CertificateView.tsx`?
**A.** What is `src/components/academy/CertificateView.tsx`?
**B.** ما CertificateView؟
**C.** Local motivational certificate output (not official). (05 §1.2)
**D.** "A local, motivational certificate—not an official credential."
**E.** `components/academy/CertificateView.tsx`.
**F.** "Official?" → no.
**G.** Do not claim official credential.

### Q299. What is `src/components/academy/AchievementsView.tsx`?
**A.** What is `src/components/academy/AchievementsView.tsx`?
**B.** ما AchievementsView؟
**C.** Displays badges/milestones derived from activity. (file map)
**D.** "Displays badges and milestones derived from activity."
**E.** `components/academy/AchievementsView.tsx`, `lib/achievements.ts`.
**F.** "How many badges?" → 15 (brief).
**G.** Do not overstate.

### Q300. What is `src/components/academy/AgeBandMetaGrid.tsx`?
**A.** What is `src/components/academy/AgeBandMetaGrid.tsx`?
**B.** ما AgeBandMetaGrid؟
**C.** Grid displaying age-band metadata. (file map)
**D.** "A grid showing age-band metadata."
**E.** `components/academy/AgeBandMetaGrid.tsx`.
**F.** "Validated pedagogy?" → no.
**G.** Do not claim validation.

### Q301. What is the final takeaway for judges?
**A.** What is the final takeaway for judges?
**B.** ما الخلاصة للحكام؟
**C.** One verified collection; mission ≠ hardware; every claim says how well established; honest limits published; verification gates pass. (brief §12)
**D.** "One verified collection, mission and hardware are two different things, every claim says how well it's established, and we publish our limits."
**E.** `docs/GRAVERSE_COMPETITION_BRIEF_AR.md` §12.
**F.** "Repeat?" → yes.
**G.** Keep concise.
EOF
echo done
