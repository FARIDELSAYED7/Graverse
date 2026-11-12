# ابدأ من هنا — GRAVERSE Study System

> **الملف (00)** — نقطة الدخول. اقرأ هذا الملف أولاً (10 دقائق)، ثم اتبع مسار التعلم في القسم 6.

---

## 1. ما هو GRAVERSE في جملة واحدة

GRAVERSE هو **متحف رقمي موثّق المصدر** (source-linked digital museum) لـ **30 قطعة** من عتاد NASA الفضائي المتروك على القمر والمريخ وفي الفضاء العميق، مع **ثلاث تجارب أساسية** (Academy / Museum / Explorer) مبنية على **مجموعة بيانات واحدة**، و**ستّ أسطح مساندة** (Mission Control, Engineering, Stories, Research, Simulations, My Universe)، بالإضافة إلى `/compare` و`/api/export`.

الجملة التي تلخّص المنتج (من `docs/ARCHITECTURE.md` و`docs/DEMO_GUIDE.md`):

> "One verified collection, three different ways in — and every claim says how well it is established."

---

## 2. المشكلة الأصلية (NASA Space Apps 2026)

التحدّي: **Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars**.

- desde 1960s، تركت NASA عتادًا عبر النظام الشمسي (Moon, Mars, deep space).
- المطلوب: **سرد** (storytelling) introduces school-age enthusiasts to the hardware **and the science it made possible**.
- التأكيد: **Accuracy is important throughout!**
- صيغة مفتوحة (web, game, book, video, 3D timeline…).

GRAVERSE يختار: **web app** + **أرشيف موثّق** + **ثلاث طرق قراءة** + **فصل mission status / hardware status** (قرار بنيوي، وليس مطلوبًا من التحدّي).

المصدر: `docs/GRAVERSE_COMPETITION_BRIEF_AR.md` §1–2، `docs/GRAVERSE_COMPLETE_PROJECT_ANALYSIS_AR.md` §2.

---

## 3. خمس أفكار يجب حفظها (اختبر نفسك)

1. **المهمة قد تنتهي بينما يبقى العتاد أو يستمر في السفر.** (`types/artifact.ts`: `MissionStatus` vs `HardwareStatus`).
2. **`missionStatus` و`hardwareStatus` حقلاّن مختلفان عمدًا** — union types متقاطعان لا رابط بينهما. (`types/artifact.ts`, `components/ui/StatusBadge`).
3. **حالة الاتصال (communication) هي حالة ثالثة مشتقة** بحذر من `hardwareStatus`، **وليست telemetry**. (`lib/mission-control.ts`: `deriveCommunicationStatus`).
4. **`confirmed / estimated / simulated / unknown`** تجعل حدود المعرفة مرئية. (`types/provenance.ts`, `lib/provenance.ts`: `isValidClaim`).
5. **التقنية تخدم الفهم**: المرئيات لا تحل محل المصدر. (`docs/ACCESSIBILITY.md`, `docs/DATA_AND_PROVENANCE.md`).

---

## 4. الأرقام المُتحقَّق منها (بوّابة التحقق)

من `docs/DEMO_GUIDE.md` (آخر تشغيل `npm run verify`):

| البوابة | النتيجة |
|---|---|
| Data validation | 30 artifacts, 20 bodies, 8 deep-sky, 24 missions, 12 lessons, 4 journeys, 3 play games, 8 articles, 96 sources, 581 edges |
| Data tests | 21/21 passed |
| ESLint | No errors/warnings |
| Typecheck | Passed |
| Production build | 47 route patterns, 172 concrete routes |
| Smoke | 50 routes, 0 failures (incl. gameplay + badge persistence) |
| Axe | 0 violations on 38 pages |
| User journeys | 24/24 passed |
| Internal links | 192/192 resolved |

**لا تذكر أرقامًا غير موثّقة.** إن شُغِّل verify في بيئة أخرى، قد تختلف قليلاً (run-to-run variance).

---

## 5. حدود يجب قولها (Do not claim)

من `docs/DEMO_GUIDE.md` §"Do not claim" و`docs/GRAVERSE_COMPETITION_BRIEF_AR.md` §10:

- ❌ "كل آثار NASA" → ✅ "معرض مُنسَّق من 30 قطعة، لا جرد كامل".
- ❌ "حالة حيّة/live telemetry" → ✅ "حالة الاتصال مشتقة من الحالة المسجّلة".
- ❌ "أثر تربوي مُقاس" → ✅ "صمّم على مبادئ التعلّم النشط، ولم يُقَس أثره بعد".
- ❌ "محاكاة هندسية" (عدا S04) → ✅ "نماذج تعليمية، كلٌّ منها يحمل ملاحظة تقريب صريحة".
- ❌ "الوحيد/الأول" → ✅ "الأول في الفصل بين الحالتين" (ادّعاء واحد مدعوم).
- ❌ "NASA endorsement/partnership/review".
- ❌ "Lighthouse scores أو field performance data".
- ❌ "Screen-reader certification" (فقط automated axe + keyboard).
- ❌ "3D models رسمية أو to scale" (primitive toys).

---

## 6. مسار التعلّم (Study Levels)

| Level | الملفات | الهدف |
|---|---|---|
| 1 Big Picture | 01, 07 | فهم المنتج والتحدّي |
| 2 Three Experiences | 05, 06 | Academy/Museum/Explorer |
| 3 Architecture | 02, 03 | Stack, routing, components, data flow |
| 4 Data & Science | 04, 06 | Records, statuses, sources, provenance |
| 5 Innovation & Philosophy | 07, 08 | Differentiation, theory |
| 6 Defend | 09, 10, 11 | Judge Q&A, demo, pitch |

**خطة 7 أيام** (من الوثيقة الأصلية): Day1: 01+07. Day2: 02+03. Day3: 04+05. Day4: 06+08. Day5: 09 بصوت عالٍ. Day6: 10+11 مع توقيت. Day7: 12 + اختبار عشوائي.

---

## 7. فهرس الملفات (docs/study/)

| # | الملف | المحتوى |
|---|---|---|
| 00 | `00_START_HERE_AR.md` | هذا الملف |
| 01 | `01_GRAVERSE_PRODUCT_MASTER_GUIDE_AR.md` | المنتج، المستخدمون، journeys، حدود |
| 02 | `02_TECH_STACK_AND_ARCHITECTURE_AR.md` | التقنية، البنية، lifecycles، 3D |
| 03 | `03_COMPLETE_REPOSITORY_FILE_MAP_AR.md` | خريطة الملفات والمجلدات |
| 04 | `04_DATA_MODEL_AND_SCIENTIFIC_INTEGRITY_AR.md` | نموذج البيانات، provenance |
| 05 | `05_ACADEMY_MUSEUM_EXPLORER_DEEP_DIVE_AR.md` | التجارب الثلاث |
| 06 | `06_SUPPORTING_FEATURES_AND_SIMULATIONS_AR.md` | الأسطح المساندة + 8 simulators |
| 07 | `07_CHALLENGE_MAPPING_AND_DIFFERENTIATION_AR.md` | ربط التحدّي + منافسون |
| 08 | `08_THEORETICAL_EDUCATIONAL_AND_PHILOSOPHICAL_FOUNDATION_AR.md` | نظرية/فلسفة |
| 09 | `09_COMPLETE_JUDGES_QUESTION_BANK_AR_EN.md` | 260+ سؤال judge |
| 10 | `10_TECHNICAL_INTERVIEW_AND_LIVE_DEMO_GUIDE_AR.md` | Code walkthrough + demo |
| 11 | `11_COMPETITION_PITCH_AND_PRESENTATION_AR_EN.md` | pitches |
| 12 | `12_FLASHCARDS_GLOSSARY_AND_STUDY_PLAN_AR_EN.md` | flashcards + خطة |
| — | `INDEX.md` | فهرس مركزي |

**المصادر (لا تكرّرها، ارجع إليها):** `docs/ARCHITECTURE.md`, `docs/DATA_AND_PROVENANCE.md`, `docs/ACCESSIBILITY.md`, `docs/PERFORMANCE.md`, `docs/DEMO_GUIDE.md`, `docs/GRAVERSE_COMPETITION_BRIEF_AR.md`, `docs/GRAVERSE_COMPLETE_PROJECT_ANALYSIS_AR.md`, `docs/adr/*`.

---

## 8. قاعدة الأدلة (Evidence rule)

كل ادعاء تنفيذي يجب أن يكون قابلاً للتتبع إلى `src/`, `package.json`, `scripts/`, `tests/`, أو `docs/`. لا تصف فكرة مستقبلية كميزة منشورة. إن لم تستطع إثباتها → قل "unknown/limitation".

---

## 9. تمرين أول (5 دقائق)

1. افتح `/museum/apollo-11-lrrr` — أظهر `missionStatus: completed` و`hardwareStatus: operating` (أو ما تنصّ عليه السجل).
2. افتح `/sources` — افتح رابطًا واحدًا.
3. افتح `/academy/progress` — أظهر local-only + export.
4. اشرح في 60 ثانية: "المهمة لا تنتهي بانتهاء المهمة."

إذا استطعت → Level 1 مكتمل.