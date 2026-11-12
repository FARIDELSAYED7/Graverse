# GRAVERSE — دليل المنتج الرئيسي

> **الملف (01)** — شرح المنتج وال concept. اقرأ مع 07 (ربط التحدّي).

---

## 1. الهوية والاسم

- **الاسم:** GRAVERSE (graves + universe / "أثر" + "كون").
- **الأطروحة:** *"The mission ends; the object does not disappear. Sometimes the object keeps working."*
- **الرسالة:** ما يبدو «مهجورًا» (abandoned) ليس بلا قصة — هو **أرشيف** (archive) of human exploration.
- **الملف (src/app/page.tsx):** الصفحة الرئيسية تضع الأبواب الثلاثة (Academy / Museum / Explorer) في المقدمة، مع وصول إلى الأسطح المساندة.

**ملاحظة تفسيرية (ليست موثّقة):** الاسم يعبّر عن "أثر" (grave) + "كون" (universe). لا يوجد توثيق صريح لـ naming rationale في المستودع (unknown).

---

## 2. المستخدمون (Personas)

من `docs/GRAVERSE_COMPETITION_BRIEF_AR.md` §5 و`docs/DEMO_GUIDE.md`:

| Persona | نقطة الدخول | ما يحصل |
|---|---|---|
| **طفل 8–12** | `/academy` | "هذا الجهاز الذي بناه البشر عام 1969 لا يزال يقيس استدارة القمر" — **علاقة**، لا معلومة |
| **معلّم** | `/academy` + `/sources` | مسار كامل 25–45 دقيقة، بأهداف ومصادر جاهزة — **وقت** |
| **هاوٍ** | `/museum` / `/explorer` | خمس حالات مادية مختلفة، مشروحة لا مُدرجة — **فهم** |
| **باحث** | `/sources`, `/research`, `/api/export` | 96 مصدرًا بتاريخ وصول + `dataNotes` + JSON مفتوح — **تدقيق** |
| **قارئ تحدٍّ (judge)** | `/research` → Honest limitations | منتج يعامل "accuracy" كبنية لا كنصّ — **مصداقية** |

---

## 3. نموذج القيمة (Value proposition)

كل قطعة تربط (من `types/artifact.ts`):

> **ما هي؟** (identity/type) → **لماذا أُرسلت؟** (scientificPurpose) → **ماذا فعلت؟** (scientificContributions) → **ماذا بقي منها؟** (fate, hardwareStatus) → **ما الذي نعرفه ومن أين؟** (sources, claim labels, dataNotes).

هذه **ليست واجهة واحدة**؛ إنها **طرق قراءة مختلفة** لمجموعة بيانات واحدة (shared data model).

---

## 4. التجارب الثلاث (Core experiences)

| التجربة | المسار | الجمهور | الطابع | شكل تقني |
|---|---|---|---|---|
| **Space Academy** | `/academy` (+ `/academy/play/*`) | 5–12 سنة (5-7/8-9/10-12) | دافئ، فاتح، موجَّه، تفاعلي | Server components + client islands |
| **Museum** | `/museum` (+ `/museum/missions`, `/museum/agencies`) | القارئ العام | سينمائي، داكن، سردي | Server components + 3D hall (GalleryCanvas) |
| **Explorer** | `/explorer` (+ `/explorer/bodies`, `/explorer/deep-sky`, `/explorer/solar-system`) | الباحث الفضولي | بيانات أولًا، غامر، قابل للتصفية | Server + client island (ExploreExperience) |

**لماذا ثلاث؟** (من 07 وADR 0001):
- Academy: **تسلسل + feedback** (pedagogy).
- Museum: **هوية + سياق + مصدر** (curatorial).
- Explorer: **مقارنة + استعلام** (analytical).
- إعادة استخدام نفس السجلات → **اتساق** (consistency); الاختلاف في الواجهة لا الحقيقة.

---

## 5. الأسطح المساندة (Supporting surfaces)

من `docs/ARCHITECTURE.md` §2:

| السطح | المسار | الغرض |
|---|---|---|
| Mission Control | `/mission-control` | لوحة status (mission/hardware/communication/freshness) |
| Engineering | `/engineering` (+ `[id]`) | 7 شروح هندسية مربوطة بسجلات |
| Stories | `/stories` (+ `[id]`) | 8 مسارات قراءة مُنسَّقة (no new claims) |
| Research Archive | `/research` | method, coverage, changelog, honest limitations |
| Simulations | `/simulations` (+ `[id]`) | 8 نماذج تعليمية |
| My Universe | `/my-universe` | favourites, collections, recent, simulations (local) |
| Compare | `/compare` | side-by-side comparison |
| Global Search | `/search` | بحث عبر كل datasets |
| Export | `/api/export` | JSON export |
| Sources | `/sources` | registry of 96 sources |
| About | `/about` | origin/limits |

**ملاحظة:** هذه "مداخل متخصصة" (specialized entry points)، لا تنافس التجارب الثلاث.

---

## 6. حدود المنتج (Product limits)

من `docs/DEMO_GUIDE.md` و`docs/DATA_AND_PROVENANCE.md`:

- **بيانات محلية ثابتة** في `src/data` (لا database، لا backend domain service).
- **بحث محلي** in-memory (`lib/search-index.ts`).
- **تقدم محلي** في `localStorage` (`graverse:progress:v1`, `graverse:personal:v1`).
- **`/api/export`** يصدّر dataset (أو الكل).
- **صور محلية** مع credit/sourceUrl في السجلات.
- **لا يوجد:** حساب مستخدم، database، telemetry، analytics، cloud sync، auth.
- **لا screen-reader session** recorded (only automated axe + keyboard).

---

## 7. "أخطاء عرض" (Presentation pitfalls)

من 00 §5. بالإضافة:

- لا تقل "كل المعدات المهجورة" → "مجموعة منتقاة من عتاد NASA".
- لا تنسب قرارًا تصميميًا إلى "المستخدمين" أو "القياسات" ما لم يوجد دليل في المستودع.
- لا تقول "AI knows the answer" (لا AI feature).
- لا تقدم خطط مستقبلية كمنفذة.

---

## 8. معيار النجاح (Success criterion)

من `01` (النسخة المختصرة):

> إذا استطاع الزائر الانتقال من قطعة → المهمة → المساهمة العلمية → المصدر، ثم اختيار مستوى تعلّم أو مقارنة، فقد تحققت الفكرة المركزية.

---

## 9. مراجع

- `docs/GRAVERSE_COMPETITION_BRIEF_AR.md` §3 (الحل).
- `docs/ARCHITECTURE.md` §2 (route model).
- `docs/DEMO_GUIDE.md` §0-6 (walkthrough).
- `docs/adr/0001-route-model.md`.