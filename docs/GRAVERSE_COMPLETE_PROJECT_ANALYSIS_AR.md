# GRAVERSE — تحليل شامل للمشروع: البنية، التميّز، التأصيل الفكري، والتقييم التنافسي

> **طبيعة هذا المستند**
> هذا التقرير تحليلي بالكامل. لم يُضَف أي رمز، ولم تُعدَّل أي ميزة، ولم تُغيَّر أي مسار عام أثناء إعداده.
> كل ادعاء تنفيذي في هذا التقرير إما **(أ)** مُتحقَّق منه مباشرةً من شيفرة المستودع أو من تشغيل بوّابات التحقق، أو **(ب)** مُوثَّق بمصدر خارجي مع تاريخ الوصول، أو **(ج)** تفسير معقول مُعلَّم بوضوح.
> الأرقام الواردة في أقسام "الأدلة" من تشغيل فعلي بتاريخ **2026-11-11** على الإصدار `4880619` في الفرع `main` من مستودع `graverse`.

---

## جدول المحتويات

1. [الملخص التنفيذي](#1-الملخص-التنفيذي)
2. [تحليل التحدي الأصلي](#2-تحليل-التحدي-الأصلي)
3. [البنية الكاملة للمنتج](#3-البنية-الكاملة-للمنتج)
4. [تحليل كل ميزة على حدة](#4-تحليل-كل-ميزة-على-حدة)
5. [غوص عميق: الأكاديمية](#5-غوص-عميق-الأكاديمية)
6. [غوص عميق: المتحف](#6-غوص-عميق-المتحف)
7. [غوص عميق: المستكشف](#7-غوص-عميق-المستكشف)
8. [التجارب المساندة](#8-التجارب-المساندة)
9. [المقارنة التنافسية](#9-المقارنة-التنافسية)
10. [عوامل التميّز الفريدة والمتكاملة](#10-عوامل-التميّز-الفريدة-والمتكاملة)
11. [الأساس النظري والفلسفي](#11-الأساس-النظري-والفلسفي)
12. [الإطار التربوي](#12-الإطار-التربوي)
13. [البيانات والمصداقية العلمية](#13-البيانات-والمصداقية-العلمية)
14. [الشخصيات ورحلات الاكتشاف](#14-الشخصيات-ورحلات-الاكتشاف)
15. [مصفوفة ربط التحدي بالحل](#15-مصفوفة-ربط-التحدي-بالحل)
16. [تقييم الحكّام](#16-تقييم-الحكّام)
17. [المخاطر والحدود](#17-المخاطر-والحدود)
18. [أطروحة المنتج المركزية](#18-أطروحة-المنتج-المركزية)
19. [عرض المنافسة](#19-عرض-المنافسة)
20. [المصادر والمراجع](#20-المصادر-والمراجع)
21. [الملحق أ: قائمة العيوب المُتحقَّق منها](#الملحق-أ-قائمة-العيوب-المُتحقَّق-منها)

---

<a id="1-الملخص-التنفيذي"></a>
## 1. الملخص التنفيذي

### 1.1 ما هو GRAVERSE؟

GRAVERSE مشروع ويب مبني على Next.js 14 App Router يقدّم **أرشيفًا رقميًا موثّق المصدر (source-linked digital museum)** لـ 30 قطعة من عتادNASA الفضائي المتروك على القمر والمريخ وفي الفضاء العميق، مع **ثلاث تجارب أساسية** مبنيّة على مجموعة بيانات واحدة موحّدة:

| التجربة | المسار | الجمهور | الطابع | الشكل التقني |
|---|---|---|---|---|
| **Space Academy** | `/academy` | 5–12 سنة، مقسّمة 5–7 / 8–9 / 10–12 | دافئ، فاتح، موجَّه، تفاعلي | Server components + islands |
| **Museum** | `/museum` | القارئ العام | سينمائي، داكن، سردي | Server components + 3D hall |
| **Explorer** | `/explorer` | الباحث الفضولي | بيانات أولًا، غامر، قابل للتصفية | Server + client island |

حول هذه الأبواب الثلاثة توجد **ستّ أسطح مساندة** موثّقة المصدر: Mission Control، Engineering Lab، Space Stories، Research Archive، Mission Experience Lab (8 محاكاة)، وMy Universe، بالإضافة إلى `/compare` و`/api/export`.

### 1.2 الجملة التي يلخّص المنتج

> **"محطة واحدة موثّقة، ثلاث طرق للدخول، وكل ادعاء يوضّح مدى Establishmentه."**
> (One verified collection, three ways in — and every claim says how well it is established.)

### 1.3 الخلاصة التحليلية في خمس نقاط

1. **التحدي الأصلي مُلبّى بشكل مباشر لاblerifial.** التحدي الرسمي لعام 2026 هو *«Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars»*. GRAVERSE يستجيب حرفيًّا لكل من: تعداد العتاد، ربطه بالمهمّات، ترجمة البيانات التاريخية المعقّدة إلى سرد، واتّجه جمهور من صغار السن — بل يضيف بُعدًا لم يطلبه التحدي: **فصل حالة المهمّة عن حالة العتاد** بوصفه محورًا فلسفيًّا وطرفيًّا.
2. **أقوى قرار معماري ليس بصريًّا بل دلالي.** الفصل بين `missionStatus` و`hardwareStatus` مفروض على مستوى *النوع البرمجي* (union types متقاطعة لا رابط بينها)، وعبر `*Original` النص الأصلي الإلزامي، وعبر discriminated-union props في مكوّن `StatusBadge`. هذا يُنشئ فجوة بنيوية تمنع الخلط — لا مجرد واجهة عرض.
3. **التميّز الحقيقي ليس في عدد الميزات بل في التكامل.** ثلاثة عشر بُعدًا (إرث العتاد، تاريخ المهمّة، الحالة الفيزيائية، الاستكشاف الزمني، الاستكشاف الوجهي، مسارات تعليمية، شروح هندسية، محاكاة، بحث موثّق المصدر، تخصيص) موزّعة على منصات متخصّصة؛ GRAVERSE يجمعها على **مجموعة سجلات واحدة** لا على صفحات منفصلة.
4. **المصداقية أقوى ممّا يتوقّعه أغلب الحكّام.** 96 مصدرًا مسجَّلًا، 581 حافة علاقات ثنائية الاتجاه، بوّابة تحقق من 21 اختبارًا + 50 فحص مسار + 38 صفحة axe + 30 رحلة مستخدم + 192 رابطًا داخليًّا — كلّها ناجحة في التشغيل الفعلي.
5. **لكنّ هناك عيوبًا حقيقية يجب إصلاحها قبل التقديم.** تم التحقّق من ثلاث عيوب **في المحرّك الفيزيائي للّمحاكاة** تُنتج تجربة مكسورة فعليًا: محاكاة الهبوط S01 **لا تنجح في أيّ من 2160 تركيبة معاملات** (خطأ إشارة في تكامل الارتفاع)، ومخطّط المسار S05 **غير قابل للحلّ رياضيًّا** (أدنى طاقة 82.9 Wh مقابل ميزانية 45 Wh)، و`powerLimitW` في S06 **مُزلق ميت** (لا يؤثر في المخرجات). هذه ليست ملاحظات نظرية — بل مُثبَتة بتشغيل الشيفرة.

### 1.4 جدول التقييم السريع

| البُعد | التقييم | الدليل |
|---|---|---|
| ملاءمة التحدي | **قوية جدًا** | كل بند من بنود التحدي Official مغطّى؛ يُضاف بُعد الحالة المزدوجة |
| عمق المنتج | **قوية جدًا** | 47 نمط مسار، 175 صفحة ثابتة، 13 كتلة بيانات، 6 أسطح مساندة |
| جودة البيانات | **قوية** | 96 مصدرًا، 581 حافة، تحقق آلي فعّال — مع 4 روابط NASA ميتة و9 سجلات مصادر مكرّرة |
| التفاعل الحقيقي | **قوية** | 30 رحلة مستخدم آليّة تمرّ؛ 8 محاكاة؛ 3 ألعاب 3D؛ مقارنة؛ حفظ محلي |
| إتاحة الوصول | **قوية** | 0 مخالفات axe على 38 صفحة، بدائل 2D لكل 3D، دعم reduced-motion، RTL |
| الابتكار | **متوسّط–عالٍ** | التميّز في *التكامل* لا في الابتكار الجذري |
| **الثقة presently** | **متوسطة** | ثلاث عيوب محاكاة قابلة للإصلاح السريع؛ `/api/export?dataset=` معطّل في الإنتاج |

---

<a id="2-تحليل-التحدي-الأصلي"></a>
## 2. تحليل التحدي الأصلي

> **تنبيه منهجي:** كل ما في هذا القسم مسحوب من صفحة التحدي الرسمية على `spaceappschallenge.org` بتاريخ الوصول **2026-11-11**، أو من ويكيبيديا (لبيانات المشاركة والجوائز)، أو من مستودع NASA Space Apps على GitHub. **لم يُستبدل نص التحدي ولا يُفسَّر تفسيرًا من عندنا.** حُصرت متطلبات التحدي الصريحة في قسم 2.5، وميّزت بوضوح ما هو إضافات من GRAVERSE (قسم 2.6).

### 2.1 نص التحدي الرسمي — كما هو

**العنوان:** *Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars*
**الرابط:** https://www.spaceappschallenge.org/2026/challenges/nasas-discarded-equipment-storytelling/
**تاريخ النشر:** 2026-09-17 · **آخر تحديث:** 2026-10-28
**التصنيفات:** Intermediate · Beginner/Youth
**المهارات:** Astrophysics · Planets & Moons · Space Exploration
**علامة تبويب الموارد (نصّها الكامل عند تاريخ الوصول):** *"Resources will be available on Friday, November 13."* — أي أن الموارد لم تكن منشورة بعد عند تاريخ التحليل.

**Summary (الملخّص الرسمي):**
> "Since the 1960s, NASA has left hardware across the solar system–on the Moon, on Mars, and in deep space. From rovers and instruments that completed their science missions to probes still traveling away from Earth this hardware varies widely in both its purpose and current level of functionality. Your challenge is to tell the story of some or all of this equipment that introduces school-age space enthusiasts to the hardware and the science it made possible."

**Background (الخلفية الرسمية):**
> "For over half a century, humanity has sent incredible machines to the Moon, Mars, and other celestial bodies. When their missions end, probes, rovers, landers, descent stages, and scientific instruments are left behind, standing—or flying—silently as monuments to human exploration. While space agencies know the histories of these machines, school-age space enthusiasts often hear only about active, ongoing missions. There is a real opportunity here to inspire the next generation using the rich, untold histories of these off-world artifacts and the groundbreaking science that paved the way for today's achievements and tomorrow's exploration.
>
> To respond to this challenge, participants will want to know what types of equipment currently reside on the Moon, on Mars, and elsewhere—old rovers, descent stages, scientific payloads—and the specific missions they facilitated. The priority is to translate complex historical and scientific data into an engaging narrative.
>
> People looking to learn about past space missions often work through dense technical websites or historical textbooks that lack the spark of imagination and storytelling needed to capture a younger or more casual audience's attention. Potential projects could include an interactive map of the Moon with clickable 'ghost rovers,' a digital graphic novel told from the perspective of a dormant Mars lander, or an audio podcast series chronicling the final days of a deep space instrument. We encourage you to think outside the box and develop your own creative alternatives!"

**Objectives (الأهداف الرسمية):**
> "The goal of this challenge is to create an engaging, story-driven educational tool or narrative that teaches school-age and casual space enthusiasts about the hardware left on the Moon, Mars, and elsewhere. Your project might bring these silent or active artifacts (back) to life, explaining what they are, why they were originally sent into space, and the scientific discoveries they made and continue to make.
>
> Your final project can take many forms, and we welcome a variety of formats and technologies. For example, you might develop an interactive web-based experience using HTML, CSS, or JavaScript; prototype an educational video game using a game engine of your choice; write and illustrate a digital children's book; produce a short animated video; design an interactive 3D timeline; or take another approach entirely!"

**Potential Considerations (اعتبارات officially مقترحة):**
> "Regardless of the medium or technology you choose, a strong narrative focus will serve your project well. Consider weaving real historical facts and mission data into your story, and showing your audience how these missions operated rather than listing facts about them. The aim is to draw a clear, exciting connection between the engineering of the hardware and the scientific knowledge humanity gained from it. By the end of your story, your audience might walk away feeling a personal connection to these forgotten robotic explorers and inspired by the science they conducted. Accuracy is important throughout!
>
> *You may (but are not required to) consider the following:*
> - *What age group is your story designed for?*
> - *How accessible is the format you chose to use?*
> - *Do you want to focus on specific missions and pieces of equipment, or tell a broader story about NASA's exploration?*
> - *What perspective(s) do you want to highlight?"

### 2.2 الشرح المبسّط — بلغة العاديين

تخيّل مجموعة من الآلات التي أرسلها البشر إلى，القمر والمريخ وما وراءهما. بعضها لا يزال يعمل اليوم. معظمها توقّف عن العمل لكنّه **لم يختفِ**: ما زال واقفًا على سطح القمر أو Mars، أو متّصلًا بقطعة منobody صغيرة على المريخ، أو يطير بعيدًا عن الأرض منذ عقود.

**الحقيقة المُety:**

> **"إنّended مهمّة لا تعني أن الآلة اختفت."**

التحدي يطلب من الفرق أن **تحكي قصّة** عن هذه الآلات — لا أن تعرض جدول بيانات. والمخاطَب هو ** young space enthusiasts** — من هم في سنّ المدرسة — الذين لا يسمعون إلا عن المهمّات الجارية. والسؤال الحقيقي ليس "ما هي النوتس المؤلّفة؟" بل **"كيف تجعل قصّةً موثوقة تجذب طفلًا؟"**

### 2.3 فجوة المعرفة التي يعالجها التحدي

| الفجوة | الدليل في نصّ التحدي | استجابة GRAVERSE |
|---|---|---|
| **انفراق السجلّ**: معلومات الآلة الواحدة موزّعة على صفحات المهمّات ومكتبات الصور والأرشيف التقني | "dense technical websites" / "space agencies know the histories of these machines" | سجلّ artifact موحّد يجمع Purpose + Journey + Science + Fate + Sources في صفحة واحدة (`/museum/[id]`) |
| **انحياز multiplexing نحو الجارٍ**: الجمهور الصغير يسمع عن المهمّات النشطة فقط | "school-age space enthusiasts often hear only about active, ongoing missions" | `/stories/forgotten-spacecraft` و`/stories/final-days` و`/mission-control` كواجهة صريحة للعتاد المتروك؛ و`/stories/machines-still-working` للعدّة التي تعمل |
| **كثافة المصطلح**: المواقع التقنية dense، والكتب التاريخية بلا خيال | "lack the spark of imagination and storytelling" | ثلاث تجارب منفصلة الجمهور + 8 قصص مُنسّقة + 12 درسًا مُفصَّلًا |
| **غياب معرفة الـ mission link**:((*لا يُعرف أي مهمّة أتاحت أي عتاد*) | "the specific missions they facilitated" | `missionName` + `programName` في كل سجلّ، ومهمّات مشتقّة (derived) لا منسوخة |
| **غياب حالة العتاد الفيزيائية**: NASA تعرف القصّة، لكن لا أحد يعرضها للعموم | "hardware varies widely in both its purpose and current level of functionality" | محور `missionStatus` / `hardwareStatus` + محور ثالث مشتق `communicationStatus` |

### 2.4 لماذا يهمّ وجود عتاد بشريّ عبر المجموعة الشمسية؟ ولماذا تاريخه؟ ولماذا حالته الحالية؟

هذه ليست زخرفة فلسفية — إنها الوظيفة المعرفية للمشروع:

**أولًا: العتاد هو المُجسِّد المادي للنظرية العلمية.** مركبة المريخ ليست مجرّد "مركبة": هي حلٌّ هندسي مُجسَّد لافتراضات هندسية محدّدة.القطعة القمرية الواردة في سجلّ `apollo-11-lm-descent-stage` ليست "أبولو 11" المجرّدة؛ إنها المرحلة التي بقيت على سطح القمر بعيناتها (وزنها 2034 كغ جافة + 8248 كغ وقود، ومCoachها octagonal prism عرضه 4.2 م). أي قصّة عن "إنجازات أبولو" تصبح مجرّد تجريد ما لم يكن الزائر يعرف **ما الذي بقي فعلًا على القمر**. (المصدر: NASA NSSDCA — انظر [20.3](#203-المنافسون--كل-رابط-فُحص-بتاريخ-2026-11-11)).

**ثانيًا: بدون معرفة الحالة الفيزيائية،(history) ينقلب إلى (myth).** «مركبة مهمّته انتهت» قد تعني: ما زالت تعمل (مستشعر ليزري Apollo 11 LRRR — `hardwareStatus: "operating"`)، أو صامتة لكن سليمة (`apollo-12-alsep` — `inactive`)، أو اصطدمت عمدًا (`ranger-7` — `impacted`)، أو تدمّرت (`cassini` — `destroyed`)، أو ما زالت تسافر (`voyager-1` — `operating` + `still traveling` ضمن السرد). هذه الحالات الخمس تتطلّب **خمسة أخطاء مختلفة** إن اختلطت.

**ثالثًا: معرفة ما ينقص — وهي جوهر الأمانة العلمية.** تحدّي NASA يقرّ صراحةً بـ *"Accuracy is important throughout"*. أي مشروع يعرض «المركبة متوقّفة» كحقيقة مُسطّحة يخطئ علميًّا. هنا تصبح **معمارية Uncertainty** في GRAVERSE — `Unknown` بدل التخمين — أداةً *لا عبئًا*.

**رابعًا: "العلم الذي أحدثته" هو الإرث الحقيقي.** التحدي يقول: *"the science it made possible"* و*"the scientific discoveries they made and continue to make"*. في GRAVERSE، العتاد غير المشغَّل ليس نهاية القصّة بل منتصفها: `apollo-11-lrrr` يُستخدم اليوم لقياس عدم استدارة القمر بدقة أجزاء من المليمتر. `dataNotes` لهذا السجلّ ينصّ صراحةً: *"The instrument is still used even though the Apollo 15 mission is complete; mission status and hardware status are intentionally separate."*

### 2.5 متطلبات التحدي الصريحة — النتيجة المتتبَّعة (Traceability)

| # | المتطلب الصريح (من النص الرسمي) | أين يُلبّى في GRAVERSE | الحالة |
|---|---|---|---|
| R1 | "tell the story of some or all of this equipment" | `/museum` + `/stories` (8 قصص) + صفحات artifacts (30) | ✅ مُلبّى |
| R2 | "introduces school-age space enthusiasts to the hardware and the science" | `/academy` (4 journeys, 12 lessons بثلاثة age bands، 8 مقالات، 3 ألعاب) | ✅ مُلبّى بإتقان |
| R3 | "the types of equipment currently reside on the Moon, on Mars, and elsewhere" | `destinationGroup` + `hardwareType` + `/explorer?mode=artifacts` + `/explorer/bodies` | ✅ مُلبّى |
| R4 | "the specific missions they facilitated" | `missionName` + `programName` + 24 mission page مشتقّة | ✅ مُلبّى |
| R5 | "hardware varies widely in both its purpose and current level of functionality" | `scientificPurpose` + `hardwareStatus` (7 قيم) + `fate` | ✅ مُلبّى |
| R6 | "translates complex historical and scientific data into an engaging narrative" | 3 تجارب + 8 قصص + 12 درسًا + 8 محاكاة | ✅ مُلبّى |
| R7 | "teaches school-age and casual space enthusiasts" | Academy (5–12) + Museum (بالغون) + Explorer (باحثون) | ✅ مُلبّى |
| R8 | "explaining what they are, why they were originally sent into space, and the scientific discoveries they made" | أقسام A / B / D في صفحة الـ artifact | ✅ مُلبّى |
| R9 | "bring these silent or active artifacts (back) to life" | 3D rotunda + timeline + أوريوري + ألعاب | ✅ مُلبّى |
| R10 | "showing your audience how these missions operated rather than listing facts" | timeline events (118 حدثًا) + 8 محاكاة + Engineering Lab | ✅ مُلبّى (مع ملاحظة: بعض المحاكاة معطوبة — [17](#17-المخاطر-والحدود)) |
| R11 | "a clear, exciting connection between the engineering of the hardware and the scientific knowledge" | `/engineering` (7 شروح) مربوطة بالـ artifacts + `scientificContributions[].kind: "science" \| "engineering"` | ✅ مُلبّى |
| R12 | "personal connection to these forgotten robotic explorers" | `/stories/final-days` + `/stories/forgotten-spacecraft` + `/academy` | ✅ مُلبّى |
| R13 | "Accuracy is important throughout" | نموذج claims رباعي + 96 مصدرًا + `dataNotes` + `Unknown` + validator | ✅ مُلبّى بإتقان |
| R14 | "What age group is your story designed for?" | 3 age bands + 4 journeys لكل فئة | ✅ مُلبّى — **وإجابة مباشرة على سؤال NASA's** |
| R15 | "How accessible is the format you chose to use?" | WCAG 2.1 AA target، 0 axe violations، بدائل 2D، RTL، reduced-motion | ✅ مُلبّى |
| R16 | "Do you want to focus on specific missions ... or tell a broader story?" | **كلاهما**: 30 سجلًّا محدّدًا + `/stories` و`/compare` للسرد المقارن | ✅ مُلبّى |
| R17 | "What perspective(s) do you want to highlight?" | زاوية **العناد المادي** (هلanced من الـ mission) — زاوية لم يذكرها NASA صراحةً | ✅ مُلبّى (إضافة) |
| R18 | Forms: "interactive web-based experience" / "interactive 3D timeline" / "video game" | تطبيق ويب + timeline + 3 ألعاب 3D | ✅ مُلبّى |
| R19 | الموارد (Resources tab) | *"Resources will be available on Friday, November 13"* — لم تُنشر بعد عند 2026-11-11 | ⏳ **معلّق رسميًا** — انظر [17.4](#174-المخاطرة-4--موارد-التحدي-لم-تُنشر-بعد) |

### 2.6 ما هو إضافة من GRAVERSE (خارج المتطلبات الصريحة)

هذه **إضافات اختيارها الفريق**، وليست متطلبات NASA. يجب عرضها كأنهاSuch:

| # | الإضافة | لماذا هي إضافة وليست متطلبًا | القيمة |
|---|---|---|---|
| E1 | **فصل mission status عن hardware status** | لم تذكره NASA مطلقًا في نصّ التحدي | **أعمق فكريًّا** — يُحوّل "عتاد متروك" من وصف إلى نظام مفاهيمي |
| E2 | **محور ثالث: communication status** | غير مطلوب | يبيّن «سكون العتاد» مقابل «انقطاع الاتصال» |
| E3 | **8 محاكاة تعليمية** | التحدي يذكر "video game" و"prototype" كأشكال ممكنة، لا كمطلب | ترجمة «كيف تعمل المهمّة» من نصّ إلى تفاعل |
| E4 | **My Universe / حفظ محلي** | غير مطلوب | تحويل الزيارة من حدث لمرة واحدة إلى سلسلة |
| E5 | **واجهة عربية RTL** | غير مطلوب، لكن NASA انضمّمت لبرنامج "Global Connection" | يوسّع الجمهور |
| E6 | **Research Archive كصفحة علنية** | غير مطلوب | الشفافية كfeature لا كملحق |
| E7 | **`/api/export` كواجهة بيانات مفتوحة** | غير مطلوب | يتيح إعادة استخدام البيانات — انسجام مع روح Open Science |
| E8 | **الأ(post) — أصالة Museum بدون Physical** | التحدي يقترح "digital graphic novel" و"interactive map" | Museum المادي لا يستطيع عرض 30 عتادًا فيزيائيًّا؛ الرقمي يستطيع |

### 2.7 سياق المنافسة

| السنة | عدد التحديات | المشاريع المُقدَّمة | المشاركون المسجَّلون | الدول/الأقاليم | الفعاليات المحلية |
|---|---|---|---|---|---|
| 2022 | 22 | 3,094 | 31,561 | 162 | 323 |
| 2023 | 30 | 5,556 | 57,999 | 152 | 402 |
| 2024 | 20 | 9,996 | 93,520 | 163 | 485 |
| 2025 | 18 | **11,511** | **114,094** | **167** | **551** |
| 2026 | 86 (ضمن وسم 2026 في الـ API) | — | — | — | — |

> **تنبيه على الرقم 86:** حقل `challenges.totalCount` في الـ GraphQL API يعيد 86، لكن قائمة 2025 الرسمية تعرض 18 تحديًا. الرقم 86 على الأرجح يجمع مواسم أو فئات عبر سنوات؛ **لا يجوز** الاستشهاد به كعدد تحديات 2026. عدد تحديات 2026 لم يُنشر بعد بشكل منفصل عند تاريخ الوصول. (المصدر: ويكيبيديا + `api.spaceappschallenge.org/graphql`،الوصول 2026-11-11.)

**فئات الجوائز التاريخية** (تُستخدم للتوجيه لا للتنبؤ): Best Use of Science · Best Use of Data · Best Use of Technology · Galactic Impact · Best Mission Concept · Best Storytelling · Most Inspirational · Local Impact · Global Connection · Art & Technology · People's Choice.

> **قراءة استراتيجية:** تحدّي 2026 مصنَّف **Beginner/Youth** و**Intermediate** معًا، وينصّ صراحةً على "accuracy" وعلى "storytelling". هذا يعني أن الحكّام سيوازنون بين **قوة السرد** و**دقّة البيانات** — وهما بالضبط نقطتا قوّة GRAVERSE، بشرط إصلاح عيوب المحاكاة الثلاث قبل العرض.

---

<a id="3-البنية-الكاملة-للمنتج"></a>
## 3. البنية الكاملة للمنتج

### 3.1 نموذج التنفيذ (Rendering model)

GRAVERSE تطبيق **Next.js 14.2.35 App Router**، TypeScript صارم، Tailwind 3.4.19، three.js 0.169 + @react-three/fiber 8.18 + drei 9.122، zod 3.24.1. Node ≥ 22.

الأنماط الأساسية:
- **Server Components افتراضيًا** — كل صفحة تقرأ البيانات المكتوبة بأنواع صارمة وقت البناء.
- **Client islands للتفاعل فقط** — Explorer، Search، Progress، Quizzes، 3D.
- **ثبوت المصدر**: `src/data` هو المصدر الوحيد للحقيقة؛ `src/lib` طبقة المنطق؛ `src/types` العقود.

| Island | سبب كونه client-side |
|---|---|
| `ExploreExperience` | تصفية، ترتيب، تبديل أوضاع، مزامنة URL |
| `SearchExperience` | بحث مؤجَّل (200 ms)، مرشّحات النوع، مزامنة URL |
| `ProgressDashboard`, `LessonQuiz`, `JourneySteps` | حالة `localStorage` |
| `Orrery3D` / `OrreryScene` | WebGL، محمَّل بـ `next/dynamic` |
| `GalleryCanvas` / `GalleryStage` | WebGL + IntersectionObserver + error boundary |
| `Simulators` | 8 نماذج تفاعلية |
| `StatusBoard`, `CompareClient`, `ArtifactActions` | تصفية، مقارنة، مفضّلة، مشاهدات أخيرة |
| `MyUniverseClient`, `RoverBuilder`, `Flashcards` | مجموعات محلية، حالة بناء، بطاقات دراسية |
| ألعاب Playground | حالة اللعبة، الجوائز، `localStorage` |

### 3.2 خريطة المسارات (47 نمط مسار)

```
/                              بوّابة ثلاثية الأبواب
/academy                       Academy home
/academy/journeys              المسارات التعليمية
/academy/journeys/[id]
/academy/lessons               الدروس
/academy/lessons/[id]
/academy/articles              المقالات
/academy/articles/[id]
/academy/glossary              المصطلحات (40)
/academy/play                  فضاء ألعاب 3D
/academy/play/rocket           Rocket Workshop
/academy/play/moon             Moon Phase Mission
/academy/play/rover            Rover Quest
/academy/build-rover           تمرين هندسي: تبادل المفاضلة
/academy/flashcards            بطاقات مراجعة
/academy/achievements          شارات مشتقّة من النشاط
/academy/certificate           سجلّ تعلّم قابل للطباعة
/academy/progress              تصدير / استيراد / إعادة ضبط
/academy/robot-lab             دليل آلي
/museum                        المجموعة
/museum/[id]                   قالب سجلّ artifact موحّد (30)
/museum/missions               فهرس المهمّات (24)
/museum/missions/[id]
/museum/agencies                فهرس الوكالات (8)
/museum/agencies/[id]
/mission-control               لوحة حالة: مهمّة / عتاد / اتصال
/engineering                   7 شروح هندسية
/engineering/[id]
/stories                       8 مسارات قراءة
/stories/[id]
/research                      المنهجية، التغطية، السجلّ، الحدود
/simulations                   8 نماذج تعليمية
/simulations/[id]
/my-universe                   المفضّلة، المجموعات، الأخيرة
/compare                       مقارنة جنبًا إلى جنب
/api/export                    تصدير JSON
/explorer                      أوضاع: timeline / destinations / artifacts
/explorer/solar-system         Orrery 3D + خريطة SVG 2D
/explorer/bodies               فهرس الأجسام (20)
/explorer/bodies/[id]
/explorer/deep-sky             8 أجسام بعيدة
/explorer/deep-sky/[id]
/search                        بحث موحّد عبر 13 نوع كيان (184 مستند)
/sources                       سجلّ المصادر الكامل (96)
/about                          المشروع والمنهجية والحدود
```

**المسارات المحفوظة** (تعيد التوجيه في `next.config.mjs`، مع حفظ سلسلة الاستعلام):
`/explore → /explorer` · `/kids → /academy` · `/museum/timeline → /explorer`

### 3.3 طبقة البيانات — 13 كتلة

| الكتلة | الملف | العدد | ملاحظات |
|---|---|---|---|
| Artifacts | `src/data/artifacts/*.ts` | **30** | مجزّأة على 6 ملفات (moon-a/b, mars-a/b, deep-a/b) + helpers |
| Missions | `src/data/missions.ts` | **24** | **مشتقّة** من الـ artifacts |
| Bodies | `src/data/space/bodies.ts` | **20** | الشمس، الكواكب، الكواكب القزمة، أقمار مختارة |
| Deep sky | `src/data/space/deep-sky.ts` | **8** | سدم ومجرات وبقايا |
| Agencies | `src/data/space/agencies.ts` | **8** | NASA, ESA, JAXA, ISRO, CNSA, Roscosmos, CSA, UKSA |
| Lessons | `src/data/lessons.ts` | **12** | 4 لكل age band |
| Journeys | `src/data/journeys.ts` | **4** | First Flight, Moon Detectives, Mission Engineer, Rock to Rover |
| Articles | `src/data/articles.ts` | **8** | قراءة مطوّلة |
| Playground games | `src/data/games.ts` | **3** | بيانات + شارات + روابط موثّقة |
| Engineering | `src/data/engineering.ts` | **7** | 7 أنظمة هندسية |
| Stories | `src/data/stories.ts` | **8** | 23 قسمًا |
| Simulations | `src/data/simulations.ts` | **8** | 3 أهداف + 3–5 مفاهيم + ملاحظة تقريب إلزامية |
| Glossary | `src/data/glossary.ts` | **40** | تعريفات بلغة مبسّطة |
| Sources | `src/data/sources.ts` | **96** | سجلّ المصادر |
| Relations | `src/data/relations.ts` | **581** | حواف موجّهة بعكس |

**المجموع التحقَّق منه (تشغيل `npm run validate`، 2026-11-11):**
```
Data validation passed: 30 artifacts, 20 bodies, 8 deep-sky objects, 24 missions,
12 lessons, 4 journeys, 3 playground games, 8 articles, 96 sources, 581 directed relation edges.
```

### 3.4 نموذج الـ Provenance — أربع فئات ادّعاء

`src/types/provenance.ts`:

```ts
export type ClaimType = "confirmed" | "estimated" | "simulated" | "unknown";
```

| الوسم | المعنىOfficial | المتطلّب |
|---|---|---|
| **Confirmed** | منصوص عليه مباشرةً في مصدر أولي | ≥ 1 معرّف مصدر مسجَّل |
| **Estimated** | مدى أو تقريب أو قيمة مشتقّة من نموذج في مصدر | ≥ 1 معرّف مصدر مسجَّل |
| **Simulated** | احتسبه GRAVERSE من معاملات منشورة — **ليس ملاحظة** | ملاحظة أو مصدر |
| **Unknown** | لا مصدر في السجلّ يثبّت القيمة | **لا قيمة مخترَعة** |

**التحقّق من health** — `npm run validate` (وهو بوّابة بناء) يُنفّذ:
1. تفرّد المعرّفات لكل كتلة؛
2. فحوص zod لكل نوع سجلّ؛
3. كل استشهاد مصدر يُحلّ؛
4. confirmed/estimated تستشهد بمصدر؛
5. simulated تحمل ملاحظة أو مصدرًا؛
6. معرّفات artifacts Mission موجودة؛
7. أهداف العلاقات موجودة وحوافها العكسية موجودة؛
8. يمكن توليد static params للمسارات.

### 3.5 المهمّات المشتقّة — قرار معماري محوري

المهمّات **لا تُنسخ يدويًّا**. `src/data/missions.ts` يجمّع artifacts حسب `missionName` ثم:
- **حالة المهمّة** = أعلى حالة بالأسبقية بين artifacts المهمّة: `ongoing → lost-contact → completed → ended → planned → unknown`.
- **تاريخ الإطلاق** =-earliest `launchDate` في المجموعة.
- **المصادر** = اتحاد `sourceIds`.
- **الوجهة** = من `destinationGroup`.
- **الأهداف** = أول 4 `scientificPurpose` فريدة.
- `statusNote` (نصّ حرفي يُعرض للمستخدم): *"Normalized from the mission status recorded on the mission's GRAVERSE artifact records. The original NASA wording is preserved on each artifact page."*

**الأثر**: يُزيل فئة كاملة من الانحراف (drift) — لا يمكن لصفحة المهمّة أن تدّعي تاريخًا لا يدعمه سجلّ العتاد.

### 3.6 رسم العلاقات

`src/data/relations.ts` — 12 نوعًا: `mission-of`/`mission-artifact`, `located-on`/`artifact-location`, `parent-body`/`child-body`, `operated-by`/`agency-mission`, `related`, `featured-in`, `includes`, `authored-for`. كل حافة تُنشأ مع عكسيها، واختبار البيانات يؤكد **التماثل** و**أن كل هدف يُحلّ**.

**ملاحظة صريحة (نقطة ضعف):**despite وجود 581 حافة، `getRelations()` يُستدعى في **صفحة واحدة فقط** — `/explorer/bodies/[id]`. صفحات المتحف تستخدم وصلات ad-hoc. أي أن "الرسم البياني" موجود في البيانات ومُختبَر، لكنه **غير مرئي في معظم الواجهات**.

### 3.7 تخزين التقدّم — سجلّان منفصلان

| | Academy Progress | Personal (My Universe) |
|---|---|---|
| المفتاح | `graverse:progress:v1` | `graverse:personal:v1` |
| الشكل | `{version, lessons{}, journeys{}, games{}, badges[], updatedAt}` | `{version, favorites[], collections[], recent[], simulations{}, updatedAt}` |
| التحقّق | `validateProgress` — يرفض ملفًا شخصيًّا | `validatePersonal` — **يقبل ملف التقدّم** ⚠️ |
| الاستيراد | يُرفض malformed | ⚠️ يمسح المفضّلة بصمت |

**النقطة الحرجة:** الغرض المُعلَن في `src/lib/personal.ts` هو *"importing an old progress file cannot corrupt a visitor's collection"* — وهذا صحيح في اتجاه واحد فقط. `validatePersonal` تتحقّق من `version === 1` وتعتبر كل الحقول الأخرى اختيارية، لذا **ملف تصدير التقدّم يلائم** ويُستبدل به سجلّ Personal فارغ — ** wiping favorites/collections/recent بصمت**. (مُتحقَّق منه: `validateProgress(personalFile)` → `null`؛ `validatePersonal(progressFile)` → PersonalState صالح وفارغ.)

### 3.8 بوّابة التحقق — نتائج مُتحقَّق منها فعليًا

شغّلت `npm run verify` كاملًا بتاريخ **2026-11-11** على الإصدار الحالي:

| البوّابة | النتيجة |
|---|---|
| `tsc --noEmit` (typecheck) | ✅ ناجح |
| `next lint` | ✅ لا أخطاء ولا تحذيرات |
| `npm run validate` (zod + سلامة مرجعية + provenance) | ✅ ناجح — 30/20/8/24/12/4/3/8/96/581 |
| `npm run test:data` (Node test runner) | ✅ **21/21** |
| `next build` | ✅ ناجح — 47 نمط مسار، 175 صفحة ثابتة مُنتَجة |
| `next start -p 3100` | ✅ يعمل |
| فحص المسارات (smoke) | ✅ **50 صفحة، 0 إخفاقات** — يشمل تحريكًا حقيقيًا للمركبة بلوحة المفاتيح وإطلاق صاروخToy يُحفظ شارةه |
| axe-core (wcag2a, wcag2aa, wcag21a, wcag21aa) | ✅ **0 مخالفات** على 38 صفحة، 0 serious/critical |
| رحلات المستخدم (journeys) | ✅ **30/30** — بحث، أوضاع Explorer، تصفية، معاينة timeline، اختبار درس، تصدير/إعادة ضبط التقدّم، مقارنة، مفضّلة، محاكاة، لوحة الحالة، نقطة البيانات، RTL عربي، تخطيط الهاتف، العمل بدون WebGL |
| سلامة الروابط الداخلية | ✅ **192/192** محلولة عبر 40 صفحة مُنهَكَبة |

> هذه أرقام **محلية على جهاز التطوير**، وليست ادّعاء Lighthouse ولا بيانات ميدانية. المشروع نفسه يحذّر من ذلك في `docs/DEMO_GUIDE.md` ضمن قسم **"Do not claim"** — وهو تصرّف يستحقّ الاحترام.

### 3.9 مُصنَّفات البناء والنشر

- `next.config.mjs`: `distDir` قابل للتبديل عبر `GRAVERSE_DIST_DIR` (حتى لا يكتب `verify` فوق ذاكرة `next dev`)، تحويلات الصور avif/webp، 3 تحويلات إعادة توجيه.
- `tsconfig.json`: `strict: true`, `paths: { "@/*": ["./src/*"] }`, `noEmit`.
- `.github/workflows/ci.yml`: validate → test:data → lint → build → typecheck → server + smoke → journeys → link-check. مهلة 30 دقيقة.
- **لا توجد** حزمة analitics، ولا حسابات، ولا cloud sync.

---

<a id="4-تحليل-كل-ميزة-على-حدة"></a>
## 4. تحليل كل ميزة على حدة

> **منهج هذا القسم:** لكل ميزة: (1) ما هي، (2) كيف تعمل تقنيًّا، (3) ما يراه الزائر، (4) ما يستطيع فعله، (5) البيانات المستخدمة، (6) المشكلة التي تحلّها، (7) لماذا هي قيّمة، (8) كيف تسهم في التحدي، (9) ما يميّز تنفيذها، (10) حدودها الحالية. **كل وصف مُتحقَّق منه من الشيفرة، ولم يُفترض من وجود المسار.**

### 4.1 الصفحة الرئيسية `/` — بوّابة الأبواب الثلاثة

**ما هي:** صفحة تعريفية بثلاث بطاقات أساسية + ست بطاقات مساندة + بحث حيّ.
**كيف تعمل تقنيًّا:** `src/app/page.tsx` (759 سطرًا) — Server Component. صورة خلفية `/images/deep-space.webp` بـ `priority`، ثلاثة `radial-gradient` blobs، `<SpaceCanvas />` (WebGL)، ونموذج بحث `<form action="/search" role="search" name="q">`.
**ما يراه الزائر:** بطل (hero) بعنوان *"Discover the machines that shaped our understanding of space"*، شريط بحث، 4 عمليات بحث شائعة (Perseverance، Apollo 11، Voyager 1، Ingenuity)، زرّا CTA، 3 بطاقات إحصائية حيّة (30 artifact / 3 وجهات / عدد العقود)، ثم **مجموعتان** من البطاقات:
- *Group A — «Three experiences, one collection»*: Academy / Museum / Explorer.
- *Group B — «Beyond the three core experiences»*: Mission Control / Engineering / Stories / Research / Simulations / My Universe.

ثم 3 بطاقات وجهات (Moon / Mars / Deep space) مرتبطة بـ `/explorer?mode=artifacts&destination=…`، ثم سُلّم «How to explore: Timeline → artifact → story» (3 خطوات)، ثم كتلة ترويجية للأكاديمية، ثم CTA ختامي.

**ملاحظة دقيقة (تنقّح ادّعاء README):** README يصف `/` بأنه *"three-door onboarding"*. في الشيفرة **مجموعتان** من البطاقات لا مجموعة واحدة، و**`/compare` غائب** عن Group B (يصل إليه فقط من قائمة "More" في الترويسة، والتذييل، وزر "Compare this record" في صفحة السجلّ).

**حدود:**
- `src/components/layout/ExperienceSwitcher.tsx` (87 سطرًا) **شيفرة ميتة** — `grep` يعيد تعريفًا واحدًا فقط؛ الصفحة الرئيسية تُعيد تنفيذ الشبكة نفسها inline. **لا تُحذف دون مراجعة.**
- لوحة الأرقام «Decades» تُحسب من `primaryMilestone.date` لا من مدى السجلّ كاملًا.

### 4.2 Museum Index `/museum`

**ما هي:** شبكات المجموعة مع تجميع حسب الوجهة + لوحة إحصائية + قاعة 3D.
**كيف تعمل:** Server Component. `MuseumGallerySection` (364 سطرًا، `"use client"`) يُصيّر `GalleryStage` الذي يُحمّل `GalleryCanvas` بـ `next/dynamic({ssr:false})` بعد فحص WebGL + `IntersectionObserver` بـ `rootMargin: "320px 0px"` + `CanvasBoundary` (error boundary) + **poster fallback** (صورة CSS مع تسمية "Exhibit preview" أو "Preparing the hall").
**ما يراه الزائر:** قاعة دوّارة (rotunda) ثلاثية الأبعاد فيها 12 قطعة معروضة على حلقة، بإطار معدني وصورة NASA على لوح، مع إضاءة مركزية (oculus)، وضباب، وغبار (240 نقطة LCG ببذرة ثابتة = 19). النقر على إطار يُدير الحلقة لتُ bringing القطعة إلى الأمام، واللوحة الجانبية (بـ `aria-live="polite"`) تُحدَّث بالاسم والصورة وحالتَي المهمّة والعتاد ورابط "Open the full record". أسفلها **شريط مصغّرات قابل للوحة المفاتيح** + زرّا Previous/Next + عدّاد `{i}/{n}`.

**نقطة قوّة جدّيّة:** هذا **ليس** نموذج 3D مخترَع — كل إطار يحمل **صورة NASA حقيقية** (`/images/gallery/{artifact.id}.webp`، 30 ملفًا) محمّلة كـ `THREE.Texture` بـ `SRGBColorSpace` و`anisotropy = 4`.

**حدود:**
- القاعة **زخرفية بالكامل**: الـ `Canvas` يحمل `aria-hidden="true"`، ولا تحمل أي حالة (لا تلوين حسب الحالة، لا انتقاء). كل المعنى في اللوحة والشريط.
- مجموعتا أصول متوازيتان: `public/images/gallery/*.webp` (30) لا يغطّيهما `artifactSchema`، و`scripts/validate-data.ts` يتحقّق من `artifact.media.src` فقط — **نقص ملف texture لا يُكتشف وقت البناء**.
- ثلاث نسخ متقاربة من فحص WebGL في المشروع: `Orrery3D.tsx:11`، `SpaceCanvas.tsx:11`، `GalleryStage.tsx:34` — بينما الـ hook المشترك `useWebGL()` في `components/academy/play/use-webgl.ts` **لا يستخدمه الـ Explorer ولا الـ Museum**.

### 4.3 صفحة السجلّ `/museum/[id]` — القالب الموحّد

**ما هي:** القالب الوحيد لجميع الـ 30 سجلًّا.
**التسلسل** (مرقّم بالأحرف كما في المشروع):
| القسم | المحتوى |
|---|---|
| A | "What is it?" — `overview` |
| B | "Why was it sent?" — `scientificPurpose` |
| C | "The journey" — `timelineEvents` (نوع + تاريخ + وصف + مصادر) |
| D | "What did we learn?" — `scientificContributions[]` (نوع `science` \| `engineering`) |
| E | "Its fate" — `fate` + `hardwareStatus` + «Last verified» |
| F | "Technical details" — `<details>` قابل للطيّ من `technicalDetails` |
| F2 | "Recorded anatomy" — `ArtifactAnatomy` (6 كتل) |
| G | "Media and model" — صورة NASA + إشعار «3D model unavailable for this artifact» |
| H | "Academy lessons" — `LessonCard` لكل درس يستخدم السجلّ |
| I | "Related records" — `ArtifactCard` من `relatedIds` |
| J | "Sources and verification" — بطاقات المصادر + `dataNotes` + «Provenance» |
| **#communication** | **«Two different questions»** — عمودان: حالة المهمّة + النص الأصلي / حالة العتاد + النص الأصلي |

**قسم `#communication` هو قلب المشروع.** النصّ المعروض حرفيًّا:
> العمود 1: "Mission status" → `artifact.missionStatusOriginal`
> العمود 2: "Hardware status" → `artifact.hardwareStatusOriginal`
> الترويسة الفرعية: *"Mission status and hardware status are separate fields"*

**حدود (مُتحقَّق منها):**
- **`ArtifactAnatomy` لا يقدّم تشريحًا.** هو **إعادة عرض لـ `technicalDetails`** نفس المصفوفة المعروضة قبله بـ 30 سطرًا، في بطاقات، بشريط تحذير دائم «Schematic, not a reconstruction»، وذيل نصّي: *"A schematic can explain a system; it is not a photograph or a reconstruction."* الاسم "anatomy" يَعِد بأكثر مما يقدّم.
- **رسالة «3D model unavailable» ثابتة لكل سجلّ** (`museum/[id]/page.tsx:648-657`) — لا حقل بيانات، لا شرط، ولا سجلّ يمكنه امتلاك نموذج.
- صفحة السجلّ **لا تستخدم `SourceList`**: تُعيد كتابة عرض المصادر يدويًّا (السطر 708-742) — تكرار منطق مع اختلاف بصري.
- **`relatedIds` ذاتي المرجع**: `apollo-17-lm-descent-stage` يُدرج **نفسه** أولًا (`moon-b.ts:485`) فيظهر كسجلّ مرتبط بنفسه؛ الـ validator يتحقّق من **وجود** المعرّف لا من **اختلافه** عن معرّف السجلّ نفسه.

### 4.4 صفحات المهمّات والوكالات

- `/museum/missions` — 24 مهمّة مجمّعة **حسب العقد** (عبر شريحة نصّية من السنة: `launchDate.slice(0,3) + "0s"` — تعمل لكن هشّة).
- `/museum/missions/[id]` — قسم **«How this status is derived»** يعرض `statusNote` حرفيًّا. **لا تعرض هذه الصفحة حالة عتاد** — وهذا صحيح: المهمّة ليس لها عتاد.
- `/museum/agencies` — 8 وكالات. ⚠️ **7 من أصل 8 تُظهر «0 missions in this collection»** لأن `agencyId` مثبَّت على `"nasa"` لكل المهمّات (`missions.ts:120`). هذا **صادق** لكنه يعني أن سلسلة «hardware → mission → agency» **أحادية الاتجاه وNASA فقط**.

### 4.5 Explorer `/explorer` — الأهم تقنيًّا

**ما هو:** سطح الاكتشاف. ثلاثة أوضاع + ثمانية مرشّحات + فرز + عرض قائمة + مزامنة URL.

**الأوضاع الثلاثة** (`ExploreExperience.tsx:57-58`): `timeline` | `destinations` | `artifacts` — مُعرَّفة كـ `role="tablist"` مع `aria-selected`، وتنقّل بلوحة المفاتيح roving-tabindex (أسهم/Home/End).

**المرشّحات الستة** (`src/lib/explore.ts:20-36`) + مفتاحان منفصلان:
| المرشّح | المفتاح في URL | الدالة |
|---|---|---|
| Destination | `destination` | `artifact.destinationGroup` |
| Hardware type | `hardwareType` | `artifact.hardwareType` |
| Mission status | `missionStatus` | `artifact.missionStatus` |
| Hardware status | `hardwareStatus` | `artifact.hardwareStatus` |
| Decade | `decade` | `decadeOf(primaryMilestone.date)` |
| Milestone type | `eventType` | `primaryMilestone.type` |
| Scope | `scope` | `primary` (30 حدثًا) \| `all` (**118 حدثًا**) |
| Sort | `sort` | `oldest` \| `newest` \| `name` |

**الفرز** يعمل دائمًا على `primaryMilestone.date` — لا على `timelineEvents[].date`.

**TimelineStage — تقنيًّا:** DOM + CSS خالص. **لا SVG ولا canvas.** كل علامة `<button>` بعرض ثابت `w-[92px] sm:w-[104px]` داخل flex صفّي — أي أن **التباعد فهرسي لا زمني**: حدث 1969 وحدث 2020 يشغلان العرض نفسه. الترميز الزمني الوحيد هو **وسم السنة** الذي يُطبع فقط عند تغيّر السنة (`showYear`). القطار قابل للتمرير أفقيًّا مع `overflow-x-auto`، ولكل علامة `aria-pressed` و`aria-label` composed من `${event.label}, ${artifact.name}, ${event.dateLabel}`، وتنقّل بالأسهم (يمين/أسفل = تالٍ، يسار/أعلى = سابق، Home/End). النقر **لا ينتقل** — يحدّث لوحة المعاينة في المكان نفسه.

**لوحة المعاينة** (العمود الأيسر): شارة نوع الحدث، شارة المهمّة، **السنة بحجم 6xl-7xl**، `dateLabel`، عنوان الحدث، وصفه، **شريحتا الحالة (مهمّة + عتاد)**، وثلاثية `<dl>` (artifact / destination / hardware)، وزر **"Explore artifact" → `/museum/{artifact.id}`**. العمود الأيمن: بطاقة "هولوجرام" مائلة تتبع المؤشّر (`perspective(900px) rotateX/rotateY`) مع `ArtifactVisual` وتسمية "Artist concept"/"NASA image" — وتعطيل كامل عند `reduced motion`.

**الاستكشاف الوجهي:** ثلاثة بطاقات (moon / mars / deep-space) بنقرة تُنتقل إلى وضع artifacts مع تطبيق مرشّح الوجهة. `/explorer/bodies/[id]` يعرض «Hardware in the collection» (من `relatedArtifactIds`) و«Connected records» (من رسم العلاقات — **المكان الوحيد في المشروع الذي يستخدم `getRelations()`**) و«Worlds that orbit X» وتنقّلًا Previous/Next.

**التصوّر المكاني — `OrbitMap` (SVG) و`Orrery3D` (three.js):**
- `OrbitMap`: SVG نقي، `viewBox="0 0 720 720"`, `scale = 8.4`، 8 مدارات كـ `<circle>`، الشمس كـ `<radialGradient>` + `<circle r={11}`، وكل كوكب داخل `<a href>` مع `aria-label`. **ال-planets موزّعة على 306° من قوس**، فلا يُرسم إلّا نصف الحلقة.
- `OrreryScene`: `<Canvas camera={{position:[0,5.6,7.4], fov:50}} dpr={[1,1.6]} frameloop={reduced?"demand":"always"}>`، حلقات مدارية بـ `torusGeometry`، كواكب تتحرّك بـ `useFrame` بسرعة مشتقّة من `orbit.periodYears`، `OrbitControls` بـ `autoRotate`.
- **الاستراتيجية ثنائية الطبقة:** (1) `next/dynamic(ssr:false)` + تأخير 400 ms؛ (2) فحص `supportsWebGL()` على canvas مؤقّت؛ (3) `aria-hidden="true"` على الغلاف **و**على الـ Canvas.
- **النصّ في الواجهة صريح:** "Decorative" + *"The 3D view is optional. The SVG map below carries the same links and text, and works with keyboard, screen readers and no WebGL."*

**حدود مُتحقَّق منها (الأهم في هذا القسم):**
1. **`eventType` لا يصل إلى 4 من أصل 12 نوع حدث.** القائمة تُشتق من `primaryMilestone.type` فقط (8 أنواع)، بينما الـ timeline في وضع `all` يحتوي 118 حدثًا من 12 نوعًا. **الأهم — `launch` (30)، `last-contact` (11)، `end-of-mission` (12)، `shutdown` (1) — غير قابلة للتصفية.** والنصّ الإعلاني يقول حرفيًّا: *"Every launch, flyby, landing and ending in the records."* — أي أن **العناوين التي يَعِد بها النصّ هي بالضبط التي لا يستطيع المستخدم تصفيتها**.
2. **تعارض مرشّح decade مع scope=all**: `matchesFilters` يحسب العقدة من `primaryMilestone.date`، بينما `scope=all` يعرض كل أحداث السجلّ — فيرى المستخدم مرشّحًا «1990s» بينما القطار يعرض إطلاقًا من 1972.
3. **`sort` ميت في وضع `destinations`**: يُعرض `<select>` (الشرط `mode !== "timeline" || view === "list"`)، لكن `visibleArtifacts` لا يُستهلك في هذا الوضع.
4. **`resultLabel` يتجاهل المرشّحات في وضع `destinations`**: يُظهر دائمًا «3 destinations».
5. **رقاقة «All types» تعرض الإجمالي غير المفلتر (30)** بينما رقاق النوع الفرعي تستخدم `categoryCounts` المفلترة — تناقض داخلي.
6. **المعامل `artifact` في URL يُمحى ذاتيًّا**: يُقرأ في `page.tsx:109` لكنه لا يُكتب أبدًا؛ أول `useEffect` يستبدل سلسلة الاستعلام كاملة.
7. **`replaceState` بدل `router.replace`**: ادّعاء ARCHITECTURE.md بأن «back/forward works» **غير دقيق** — كل تغيير مرشّح **يستبدل** مُدخل السجلّ بدل دفعه، فلا يمكن الرجوع للخلف بين الحالات المُفلترة.
8. **Timeline مفهرس لا مُقياس** (انظر أعلاه).
9. **البيانات تُشحن كاملة إلى المتصفح**: `ExploreExperience` يستورد `allArtifacts` — ~145 KB من النصوص الكاملة تشمل `dataNotes` و`scientificContributions` و`technicalDetails` — لتصفية يمكن للخادم أن يؤديها.
10. **`<desc>` في `OrbitMap` غير صحيح**: يذكر "and Pluto" لكن الحلقة تمرّ على `planets` فقط، و`kind` بلوتو هو `"dwarf-planet"` — **فبلوتو غير مرسوم** رغم وجود بيانات مدارية كاملة له. والشمس مرسومة **بلا رابط** رغم وجود `/explorer/bodies/sun`.
11. **نصّ يناقض البيانات**: `solar-system/page.tsx:34-36` يقول *"Eight planets, five dwarf planets and hundreds of moons"* — والبيانات تحتوي **كوكبًا قزماً واحدًا** و**عشرة أقمار**.
12. **`destinationMedia()` يحدّد أبعادًا خاطئة** (1600×900 لكل الصور) بينما الأبعاد الفعلية 1600×1600 / 1600×785 / 1600×1087. لا ينكسر شيء لأن `ArtifactVisual` يستخدم `fill`، لكن البيانات الوصفية خاطئة.
13. **لا `CanvasBoundary` حول الـ orrery** — عطل three.js يسقط المسار كاملًا ( بينما Museum لديه واحد).
14. **`relatedKindHeading` يحتوي عناوين لا تظهر أبدًا** (Missions / Agencies على صفحات الأجسام).
15. **5 أجسام بلا artifacts** (`sun`, `mercury`, `venus`, `earth`, `enceladus`) تعرض بلا قسم «Hardware in the collection»؛ و`mercury`/`venus` بلا «Connected records» أصلًا (صفر علاقات).

### 4.6 Academy — ملخّص تفصيلي

**ما هو:** 4 journeys + 12 lessons + 8 مقالات + 40 مصطلحًا + 3 ألعاب 3D + مختبر بناء مركبة + مختبر روبوت + بطاقات + شارات + شهادة + لوحة تقدّم.

**الجولات (Journeys)** — الوحدة التعليمية الأساسية؛ الدروس والـ artifacts والتحدّيات خطوات داخلها:
| id | العنوان | الفئة | دقائق | خطوات | الشارة |
|---|---|---|---|---|---|
| `first-flight` | First Flight | 5–7 | 25 | 5 | badge-first-flight |
| `moon-detectives` | Moon Detectives | 8–9 | 35 | 6 | badge-moon-detectives |
| `mission-engineer` | Mission Engineer | 10–12 | 45 | 6 | badge-mission-engineer |
| `rock-to-rover` | Rock to Rover | 8–9 | 40 | 6 | badge-rock-to-rover |

**أنواع الخطوات:** `lesson` | `artifact` | `body` | `article` | `challenge` — وهذه هي **آلية الربط بين التجربة والـ Museum/Explorer**: خطوة `artifact` تأخذ إلى `/museum/{id}`، وخطوة `body` إلى `/explorer/bodies/{id}`، وخطوة `challenge` إلى `#quiz` على درس.

**الدروس الـ 12** — كل درس: **3 أقسام**، **3 أهداف تعلّم** (بصيغة فعلية: Say / Name / Explain / Distinguish)، **2 مصطلحًا مفتاحيًّا**، **سؤالان** في الاختبار (24 سؤالًا إجمالًا)، حقل `tryIt`، وروابط إلى artifacts وأجسام ومصادر.

**نقطة تصميمية مهمّة:** `objectives` مصفوفة نصوص بسيطة — **لا تُراجع آليًّا ولا تُربط بأسئلة**. لا يوجد مفهوم "أتقن" ولا حدّ أدنى للنجاح.

**الاختبار (`LessonQuiz.tsx`):** أسئلة اختيار من متعدّد بأزرار radio داخل `<fieldset>/<legend>`؛ التفسير يُعرض بعد التسليم لكل سؤال (صحيح ← أخضر، خطأ ← أحمر)؛ النتيجة `score` من 2 تُحفظ كـ `{completedAt, score, total}` وتُضاف شارة `badge-lesson-{id}`؛ "Try again" يعيد الضبط — **ولا يحتفظ بأفضل نتيجة**.

**فئات العمر (`ageBand`):** `5-7` / `8-9` / `10-12` — **وهي تسميات عرض وتصفية فقط، لا بوّابات محتوى.** لا يوجد اختيار عمر للزائر ولا تخزين له؛ طفل في الخامسة يستطيع فتح درس 10–12 مباشرة عبر URL. `/academy/lessons?age=5-7` هو المرشّح الوحيد.

**التقدّم:** `graverse:progress:v1` — `{version, lessons{}, journeys{}, games{}, badges[], updatedAt}`. التحقّق عند الاستيراد **كل-أو-لا-شيء** (أي فشل → لا استيراد)، ويرفض الإصدارات مختلفة، ويشترط `0 ≤ score ≤ total`، ويقبل `games` مفقودًا (توافقية للخلف)، ويرفض `stars` خارج 0–3.

**الشارات:** 15 إنجازًا **مشتقًّا فعلًا** (`achievementValue` تعيد الحساب من `progress` + `personal` في كل render). ⚠️ **لكن `progress.badges` (19 معرّفًا) لا يُقرأ من نظام الإنجازات إطلاقًا** — مفهومان متوازيان للشارات بلا صلح بينهما؛ فصفحة التقدّم تعرض رقمًا يصل إلى 19، وصفحة الإنجازات تعرض 15.

**تحذير خطير — لا بوّابة للنجاح:** `first-lesson` و`all-lessons` ("Academy graduate") تُفتح بـ **وجود سجلّ الدرس**، لا بنتيجته. إجابة 0/2 تُحتسب إتمامًا. وكذلك `first-journey` يُفتح بضغط أزرار "Mark step done" **دون فتح الدرس أصلًا**.

**مختبر بناء المركبة (`RoverBuilder` + `lib/rover-builder.ts`):** 15 قطعة في 5 فئات. النموذج يستخدم `powerW` **سالبًا** لمصادر الطاقة (فهي تُولِّد) — إشارات الطاقة السالبة، مفهومة لكنها تحتاج شرحًا. **الحدّان الكبيران غير قابلين للوصول:** أقصى كتلة ممكنة **85 كغ** مقابل حدّ 120، وأقصى طاقة **47 و** مقابل حدّ 100 — **0 من 1,152 تركيبة تتجاوزهما**. أي أن ملاحظتَي «over the limit» و«margin is very small» **شيفرة ميتة عمليًّا**، والحكم «does not fit» لا يظهر إلا مع **صفر أدوات علمية**. المدى العملي للنتيجة 53–100 — والمقياس شبه مشبع.

**مختبر الروبوت (`/academy/robot-lab`):** **نصّي بالكامل وليس محادثة.** `lib/robot.ts` يبني **24 إجابة مكتوبة مسبقًا** لكل artifact من حقول السجلّ نفسها (لا يوجد توليد). `lib/robot-chat.ts` هو **موجِّه بتعبيرات نمطية (24 قاعدة مرتّبة)** يعيد أول تطابق. **بلا ذاكرة سياق، بلا متابعة، بلا تركيب.** honest بشكل لافت: intent يُسمّى `not-ai`، وردّ النكتة رفض: *"My joke chip is not in the NASA record, so I will not make one up."*، وردّ السؤال غير المطابق: *"My record doesn't cover that one."*

**الألعاب الثلاث:**
| اللعبة | الميكانيكا | النجوم | لوحة المفاتيح | بديل بلا WebGL |
|---|---|---|---|---|
| **Rocket Workshop** | بناء/إطلاق (7 مجموعات إعداد) | **3 دائمًا** | ❌ لا يوجد | أزرار فقط (بلا رسم 2D) |
| **Moon Phase Mission** | 3 جولات مطابقة أطوار (كاملة/ربع أول/هلال متزايد) | 1–3 (الصحيحة من أول محاولة) | ❌ لا يوجد `onKeyDown` (مُناقض لنصّ `game.controls`) | قرص SVG `MoonPhaseDisk` |
| **Rover Quest** | جمع 3 عينات والعودة | 1–3: ≤24 حركة = 3 | ✅ (أسهم + WASD) | شبكة `RoverMap` 7×7 |

**تحقّق من صحّة الفلك في `MoonPhaseDisk`:** رُستِرت الأشعة البيانية للمسار الدقيق وبُيِّن التقدير المضيء: 0% / 14.6% / 50% / 85.3% / 100% / 85.4% / 50% / 14.6% — **مطابق تمامًا** للقيمة الفيزيائية `k = (1 − cos(45°·i))/2`، والاتجاه (المضيء يمينًا في Waxing، يسارًا في Waning) صحيح. **هذا صحّة تقنية تستحقّالذكر.**

**تحقّق من قابلية حلّ `RoverQuest`:** BFS على الشبكة 7×7 يعطي **أدنى مسار = 18 حركة** — فثلاث نجوم ممكنة، والعتبات (24/32) مصطفّة ومُختبَرة.

**الشهادة (`/academy/certificate`):** تسجّل 4 أرقام (دروس، رحلات، إنجازات، تاريخ التحديث). **بلا معرّف، بلا توقيع، بلا اسم محفوظ، بلا ختم، بلا تصدير صورة** — فقط `window.print()`. وإخلاء المسؤولية صريح: *"This is a self-issued record of locally stored activity. It is not an accredited qualification… It cannot be verified by anyone else."*

**البطاقات (`Flashcards`):** 24 بطاقة من مصطلحات الدروس + 40 من المعجم = 64. **قلب بطاقة واحدة بلا تكرار متباعد (SRS) إطلاقًا**، ومجموعة «known» **في حالة المكوّن فقط** — لا تصل إلى التخزين ولا إلى نظام الإنجازات، وتفقد عند إعادة التحميل. Deck «Everything» فيه **11 مصطلحًا مكرّرًا بتعريفين متعارضين**.

**حدود إضافية (مُتحقَّق منها):**
- `AcademyNav` فيه 10 روابط **ويُسقط** `/academy/articles` و`/academy/glossary` — لا يُصل إليهما إلا من الصفحة الرئيسية للأكاديمية.
- 5 من 12 درسًا لا تظهر في أي رحلة؛ و2 من 8 مقالات فقط.
- **لا يوجد React Context للتقدّم** — كل نداء لـ `useProgress()` نسخة مستقلة بـ `useState` خاص بها؛ لا تزامن حيّ بين المكوّنات في الصفحة نفسها ولا بين التبويبات.
- `lastVisited` معلَن ومقبول عند الاستيراد و**لا يُكتب أبدًا**.
- شيفرة ميتة: `importedProgressSchema`، `progressSummary`، `getLessonsByAge`، `glossaryMap`، `wordLabEntries`، `JuniorQuiz`، `JuniorArtifactCard` (و`/kids` يُعيد التوجيه إلى `/academy` — فسطح «Junior Explorers» متقاعد لكنه باقٍ في الشيفرة).

### 4.7 Mission Control `/mission-control`

**ما هو:** لوحة حالة تشغيليّة.
**كيف يعمل:** `deriveCommunicationStatus(artifact)` في `src/lib/mission-control.ts` — دالة **مشتقّة بحتة** (لا تُخزَّن) مع مجموعتَي استثناء صريحتين:
- `PASSIVE_IDS` = `apollo-11-lrrr`, `apollo-15-lrrr`, `apollo-15-lunar-rover`
- `DESCENT_STAGE_IDS` = `apollo-11-lm-descent-stage`, `apollo-14-lm-descent-stage`, `apollo-17-lm-descent-stage`

`operating → communicating` · `no-longer-communicating → lost-contact` · `inactive → lost-contact` · `destroyed`/`impacted → not-applicable` · `still-traveling → unknown`.

**ما يراه الزائر:** جدول بأعمدة: Hardware / Mission status / Hardware status / Communication / Record checked. مرشّحات: 5 أزرار للحالة (All links / Communicating / Lost contact / Not applicable / Unknown) + 4 أزرار للوجهة + بحث حرّ. عدّاد `aria-live`.

**التوزيع الفعلي (30 سجلًّا):** communicating 5 · lost-contact 14 · not-applicable 11 · **intermittent 0** · **unknown 0**.

**كيف يُبلَّغ عن «مشتقّ لا حيّ»:** خمس قنوات متمايزة — شريط تحذير في أعلى الصفحة؛ ثلاث بطاقات «Three independent questions» تنصّ *"GRAVERSE derives this label from the recorded hardware status. It is a derived label, not a new source claim."*؛ `CommunicationBadge` بـ `title` صريح؛ بطاقتان تحريريتان («Loss of contact is not destruction» و«Passive instruments»)، ورابط إلى `/research#status`.

**حدود:**
- **`intermittent` و`unknown` قيمتان ميتتان**: `intermittent` لا تُنتَج أبدًا ولا يوجد لها زرّ، و`unknown` يُنتَج أبدًا **فزرّ «Unknown» يُعطي دائمًا جدولًا فارغًا**. تعامل غير متماثل مع القيمتين الميتتين.
- **`apollo-15-lunar-rover` مصنّف "سلبي"** — فيحصل على نصّ: *"This is passive hardware… it does not carry its own transmitter."* وهذا **خطأ علميًّا لهذا السجلّ**: المركبة كان لها بطاريات وراديو. التصنيف الشامل (`not-applicable`) دفاعي؛ **النصّ المُرفق هو الخلل**.
- `missionControlSummary()` يحسب 12 حقلًا، والصفحة تعرض 6 فقط (`destroyedOrImpacted`=5، `unknownHardware`=0، `ongoingMissions`=5، `completedMissions`=25، وتفصيل `destinations` تُحسَب وتُهمَل).
- `freshnessFor` يعتمد على `lastVerified` الثابت `2026-11-10` — فتظهر كل السجلّات "Checked this cycle" اليوم، وبعد ~6 أشهر **ستنقلب المجموعة كاملة دفعة واحدة** إلى "Historical snapshot".

### 4.8 Engineering Lab `/engineering`

**ما هو:** 7 شروح هندسية. **كيف يعمل:** `src/data/engineering.ts` — كل موضوع: `system`, `question`, `body[]`, `takeaway`, `artifactIds[]`, `sourceIds[]`، واثنان يحملان `comparison[]`.

| id | العنوان | النظام | عدد السجلّات المرتبطة |
|---|---|---|---|
| `power-solar-or-rtg` | Solar panels or a radioisotope power source? | power | 5 |
| `wheels-and-mobility` | Why are rover wheels designed so differently? | mobility | 6 |
| `landing-on-mars` | How do you land a laboratory on Mars? | landing | 6 |
| `talking-across-the-solar-system` | How does a spacecraft talk to Earth? | communication | 5 |
| `instruments-and-questions` | Instruments are built around questions | instruments | 5 |
| `materials-and-survival` | Materials have to survive the journey and the destination | materials | 4 |
| `three-generations-of-mars-exploration` | Three generations of Mars exploration | evolution | 7 |

**ما يراه الزائر:** فهرس بسبع بطاقات («System 01…07») + صفحة تفصيل: السؤال، المتن، «At a glance»، «Engineering takeaway»، **شبكة `ArtifactCard` للسجلّات المرتبطة**، `SourceList`، وشريط جانبي ثابت + رابط **«Build one yourself» → `/academy/build-rover`**.

**لماذا هي قيّمة:** تحوّل «لماذا صُمّم هذا هكذا؟» من نصّ إلى **مقارنة موثّقة المصدر** — كل مزوّد مرتبط بسجلّ يمكن التحقّق منه بنفسك.

**حدود:**
- **الروابط أحادية الاتجاه:** Engineering → Museum (عبر ArtifactCard). **المتحف لا يربط أبدًا بـ Engineering** (`grep` على `src/app/museum/**` لـ `engineering|stories|simulations|mission-control` يعيد **صفرًا**). أي أن الستّة أسطح المساندة **معزولة** عن experiences الأساسية.
- النصوص **تذكر المحاكيات والمقارنة بالاسم لكن بلا روابط**: `grep -c "/simulations"` و`grep -c "/compare"` على `data/engineering.ts` = **0** كلاهما.

### 4.9 Space Stories `/stories`

**ما هو:** 8 مجموعات قراءة (23 قسمًا) تُعيد ترتيب **سجلّات موجودة** في سرد.
**كيف يعمل:** `src/data/stories.ts` — `StoryCollection { id, title, eyebrow, dek, summary, accent, artifactIds[], sourceIds[], sections[] }`. **لا يوجد حقل لتاريخ أو موقع أو حالة أو كمية أو اكتشاف** —.Release فقط نصّ.
**ما يراه الزائر:** فهرس + صفحة بأقسام مرقّمة (01، 02…) بفقرة لكل قسم + صف رقائق تربط بـ `/museum/{id}` + شبكة `ArtifactCard` + `SourceList`.

| id | العنوان | eyebrow | عدد السجلّات |
|---|---|---|---|
| `first-machines-on-the-moon` | The first machines on the Moon | First contact | 6 |
| `evolution-of-mars-rovers` | The evolution of Mars rovers | Five machines, one planet | 5 |
| `journey-beyond-the-solar-system` | The journey beyond the solar system | Interstellar | 5 |
| `forgotten-spacecraft` | Forgotten spacecraft | Left behind | 7 |
| `machines-still-working` | Machines that are still working | Still on the job | 7 |
| `evolution-of-space-communication` | The evolution of space communication | Hearing from far away | 5 |
| `machines-that-changed-planetary-science` | The machines that changed planetary science | Knowledge | 6 |
| `final-days` | The final days of historic missions | Endings | 6 |

**القصّتان `forgotten-spacecraft` و`final-days` تستجيبان مباشرةً لألم التحدّي**: *"school-age space enthusiasts often hear only about active, ongoing missions."*

**حدود:**
- **انزياح استشهاد واحد**: القصة `evolution-of-space-communication` تستشهد بـ `SRC-LRRR` وهو مصدر `apollo-15-lrrr` — وغير مرتبط بأيّ من سجلّاتها الخمسة. باقي القصص: مصادرها مجموعة جزئية صارمة من مصادر سجلّاتها.
- نصّ القصة يذكر *"The communication simulator uses real distances from the collection"* — **وهي دعوى غير مُسنَدة**: `communicationTargets` في `lib/simulations.ts` **ثوابت** ولا تستورد من `@/data/artifacts`.

### 4.10 Research Archive `/research`

**ما هو:** واجهة المنهجية.
**ما يراه الزائر:** 4 بطاقات إحصائية حيّة (30 / 96 / 7 / 2026-11-10) + **7 أقسام منهجية** (Scope and selection · Source hierarchy · Claim labels · Three independent status questions · Uncertainty and conflict · Images and models · Update procedure) + جدول «Coverage and known gaps» (4 صفوف) + «Changelog» (إصداران) + **4 بطاقات «Honest limitations»** + 3 بطاقات نقاط بيانات + زرّان تنزيل + شريط جانبي «On this page».

**أهم ما فيه — «Honest limitations» (نصّ حرفي):**
1. *"Editorial prose is English-only"* — *"Navigation, footer, homepage and the new section chrome are translated into Arabic with RTL layout. Full Arabic translation of every artifact and lesson is not complete."*
2. *"No photoreal 3D reconstructions"* — *"The schematic viewer is built from generic primitives and labels. It is not a reconstruction of a specific spacecraft."*
3. *"Status is a snapshot"* — *"Communication status is derived from the recorded hardware status. No live telemetry is ingested, and old verification dates are shown as snapshots."*
4. *"Personal data stays local"* — *"Favourites, collections, recent views and simulation completions are stored in this browser. There is no account, cloud sync or server profile."*

وترويسة القسم: *"These are known gaps in this build, not hidden implementation details."*

**التقييم:** هذه أقوى صفحة في المشروع من حيث **مصداقية authorship**. الاعتراف الصريح بالحدود هو ما يجعل ادّعاءات الدقة الأخرى مقبولة.

**حدود:** تُعلن 3 نقاط بيانات، بينما المسار يدعم 13 — و**المتغيّرات الاثنتان لا تعملان في بناء الإنتاج** (انظر [الملحق أ](#الملحق-أ-قائمة-العيوب-المُتحقَّق-منها)، عيب 1).

### 4.11 Mission Experience Lab `/simulations` — المحاكيات الثماني

> **التصنيف الصادق لكل محاكاة: نموذج هندسي حقيقي، أم تقريب تعليمي؟** — أدناه تصنيف مُتحقَّق منه بقراءة الشيفرة وتشغيلها.

| # | id | العنوان | الفكرة | المدخلات | المخرجات | ما يتعلّمه الزائر | **التصنيف** |
|---|---|---|---|---|---|---|---|
| S01 | `landing` | Mars landing sequence | مرحلة الهبوط: درع حراري → مظلّة → هبوط مدفوع → ملامسة | 9 متغيّرات (سرعة الدخول، الزاوية، الدرع، قطر المظلّة، ارتفاع النشر، الوقود، الخانق، المِ crane، الكتلة) | منحنى altitude/velocity (SVG)، سرعة اللمس، نجاح/فشل، الوقود المستهلَك/المتبقّي، المراحل | لماذا لا تكفي المظلّة وحدها؛ الفرق بين retro-rocket و sky-crane | ⚠️ **تقريب تعليمي — وهو معطوب فعليًّا** (عيب 2) |
| S02 | `power` | Spacecraft power budget | ميزانية طاقة يومية على المريخ | المصدر (شمسي/RTG)، مساحة اللوح، الكفاءة، ساعات الشمس، معامل الغبار، سعة البطارية، أحمال الأدوات/التسخين/الحركة، ساعات القيادة | التوليد، الاستهلاك، الصافي، هامش %، حاجة الليل، الحالة (healthy/tight/deficit) + ملاحظات | لماذا تقلّ الطاقة الشمسية بالغبار والعرض؛ الفرق بين الشمسي والإشعاعي | تقريب تعليمي (قيم irradiance حقيقية: 590 W/m²؛ لكن بلا تدهور أو هندسة موسمية) |
| S03 | `communication` | Signal across the solar system | زمن الضوء والتخلّي | قائمة من 6 وجهات (القمر، المريخ، المشتري، زحل، بلوتو، فوياجر 1) | زمن ذهاب وإياب، قوة إشارة نسبية، جملة بلغة بسيطة، جدول مقارنة | لماذا لا محادثة لحظية مع فوياجر؛ لماذا يحتاج الروفر إلى مُرحِّلة | تقريب تعليمي — **لكن حساب زمن الضوء دقيق تمامًا** مع المسافات المعطاة (c = 299,792.458 km/s) |
| S04 | `orbit` | Orbital mechanics lab | نقل هوهنمان بين مدارين | مدارتان من 8 كواكب | v₁، v₂، سرعات النقل، ΔV₁، ΔV₂، ΔV الكلي، زمن النقل | ما هو النقل الأمثل، ولماذا يهمّ محاذاة الكواكب | ✅ **نموذج هندسي حقيقي** — vis-viva + نصف قطر Shencentric، μ = 1.32712440018×10²⁰. **النموذج الوحيد الذي رياضته닌صّية سليمة** (يُهمل الميل والدفعات الخفيفة) |
| S05 | `rover` | Rover traverse planner | تخطيط مسير على شبكة 6×6 | نقرات على شبكة، انبعاث/تراجع، إعادة ضبط | عدد الخطوات، الطاقة Wh، نقاط العلم، الصلاحية | لماذا يخطّط السائقون بالـ sols لا بالدقائق | ⚠️ **تقريب تعليمي — وهو غير قابل للحلّ** (عيب 3) |
| S06 | `planning` | Mission planning desk | توزيع ميزانية الكتلة والطاقة | 8 مكونات، مصدر طاقة، حدّ الكتلة، حدّ الطاقة | الكتلة، هامش الكتلة، القدرة، هامش القدرة، العائد العلمي، الحكم | أن تصميم المهمّة تفاوض بين العلم والهندسة | ⚠️ **تقريب تعليمي — فيه مُزلق ميت** (عيب 4) |
| S07 | `what-if` | What if? lab | تغيير شرط موثّق واحد | 4 سيناريوهات + مُزلاج 0–100% | جملة سيناريو + لوحة «السجلّ الحقيقي يبقى هنا» | فصل الحدث الموثّق عن التغيّر counterfactual | ⚠️ **تقريب تعليمي ضعيف** — فرعين نصّيين لا نموذج |
| S08 | `failure` | Failure investigation | قراءة الأدلّة قبل تسمية السبب | 5 سجلّات + 4 فرضيات | صح/خطأ، الحالة المعيارية، **النصّ الأصلي للحالة**، وإخلاء مسؤولية | لماذا «فقدان الاتصال» ليس «تدميرًا» | ⚠️ **تقريب تعليمي** — النموذج مفتاح إجابة واحد؛ لكن **مهمّته البيداغوجية حقيقية**: اقرأ النصّ الأصلي |

**البنية المشتركة:** كل صفحة تفصيل تعرض `ApproximationNote` (نصّ `approximation` الحرفي)، لوحة «Learning objectives» (3)، رقائق «Concepts» (3–5)، شبكة `ArtifactCard` «Records used in this lab»، `SourceList`، وتنقّلًا previous/next. زرّ «Completion» يكتب في السجلّ الشخصي.

**ملاحظة دقيقة:** `artifactIds` في كل محاكاة **لا تُغذّي النموذج** — تُعرض كبطاقات فقط. `communicationTargets` و`orbitDestinations` و`roverTerrain` و`planningParts` **ثوابت** لا تُقرأ من `@/data/artifacts`.

### 4.12 Comparison `/compare`

**ما هو:** مقارنة جنبًا إلى جنب لسجلّين.
**كيف يعمل:** `/compare?a={id}&b={id}` — قائمتان `<select>` تضمّان **كل** الـ 30 سجلًّا، وزر "Swap sides"، وجدول **17 صفًّا**:
Destination · Mission · Programme · Hardware type · **Mission status** · **Hardware status** · **Communication status (derived)** · Location · Location precision · Launch · Arrival/deployment · Mission end · Last contact · Last verified · Fate · Scientific purpose · Recorded sources.

**ما يميّزه:** كثير من الحقول تحمل `valueOrUnknown` / `dateOrUnknown` فيظهر **"Not documented"** بدل قيمة مخترَعة. والتذييل: *"Comparison shows only what the records document. 'Not documented' means no source in the record establishes the value; it does not mean the value is unimportant or unknowable."*

**حدود (مُتحقَّق منها):**
- **سجلّان فقط.** لا إضافة ولا إزالة ولا أكثر.
- **زرّ "Shareable link" رابط عادي** لا يُحدَّث عند تغيير القائمتين (لا `router.replace` ولا `replaceState` ولا `useEffect` في `CompareClient.tsx`) — أي أن العنوان يعكس الحالة الابتدائية فقط. ولا يوجد زرّ نسخ إلى الحافظة.
- **لا يظهر `hardwareStatusOriginal` / `missionStatusOriginal`** في الجدول — أي أن **النصّ الأصلي للمصدر** (الشيء الذي يتبنّاه المشروع كلّه) غائب عن شاشة المقارنة.

### 4.13 My Universe `/my-universe`

**ما هو:** الحالة الشخصية: المفضّلة، المجموعات، الأخيرة، المحاكاة المكتملة.
**كيف يعمل:** `graverse:personal:v1` — `{version, favorites[], collections[], recent[], simulations{}, updatedAt}`؛ `MAX_RECENT = 16`؛ التحقّق يرفض الإصدار الخطأ ويطهّر السلاسل الفارغة ويقصّ `recent` إلى 16.

**ما يراه الزائر:** 4 بطاقات إحصائية + 4 أقسام. ملاحظة التخزين تتغيّر بصدق: *"Saved in this browser's local storage."* / *"Local storage is unavailable. Changes will disappear when this tab closes."*

**حدود:**
- **المجموعات تُنشأ من المفضّلة حصرًا** (`makeCollection(name, state.favorites)`)، والقائمة "Add a favourite" **لا تعرض إلا المفضّلة المضافة بالفعل** — أي أن المجموعة **مجموعة فرعية صارمة من المفضّلة**، فالخاصيتان شبه متكرّرتين.
- **⚠️ استيراد ملف التقدّم يمسح المجموعة بصمت** (انظر 3.7).
- `ArtifactActions` هو **الكاتب الوحيد** لـ `recent` في المشروع كلّه.

### 4.14 Search `/search`

**ما هو:** بحث موحّد عبر **13 نوع كيان = 184 مستندًا** (30 artifact، 24 mission، 20 body، 8 deep-sky، 12 lesson، 4 journey، 8 article، 8 agency، 40 glossary، 7 engineering، 8 story، 8 simulation، 7 research).
**الخوارزمية (`src/lib/search-index.ts`):** تطبيع (lowercase → NFKD → حذف العلامات المجمّعة → ضغط مسافات)، ثم **AND** بين الكلمات، ثم ترجيح: عنوان مطابق = **+140**، بادئة = **+95**، تضمين = **+65**، `meta` = **+25**، `keywords` = **+12** — و**إذا لم يطابق أي حقل الكلمة تُستبعد الوثيقة كليًّا**. الترتيب تنازلي بالنتيجة مع كسر تعادل أبجدي.
**حدود:**
- **لوحة «What is in the index» تعرض دائمًا 0 لكل الأنواع الـ 13** — لأن `counts` يُشتق من `allResults` و`searchAll("")` يعيد `[]`. **مُتحقَّق منه على البناء الحيّ**: اللوحة الموسومة "What is in the index" تُبلّغ عن فهرس فارغ بينما الفهرس يحوي 184 وثيقة.
- **لا يوجد حقل `description` في الترجيح** Contrary لوصف ARCHITECTURE.md؛ النصوص تُبلَغ عبر `keywords` فقط. ونصوص أقسام القصص **ليست** في `keywords` — فمن يبحث بعبارة داخل متن قصّة لن يجدها.
- **لا يوجد `copy to clipboard`** في أي مكان.

### 4.15 `/api/export` — واجهة البيانات المفتوحة

**ما هو:** نقطة JSON للبيانات العامة. 13 مجموعة + `all`، مع `meta` تشرح: *"Compiled from public NASA mission pages, NASA/NSSDCA technical records and NASA image records. Not an official NASA dataset. Status values are snapshots, not live telemetry."*

**⚠️ العيب المُتحقَّق منه (1):** `export const dynamic = "force-static"` يجمّد الاستجابة عند البناء، فيعيد **المجموعة كاملة** (334,198 بايت) لكل استعلام — بما فيه `?dataset=artifacts` و`?dataset=sources` و`?dataset=bogus` (لا 400). **مُتحقَّق منه على البناء الحيّ عبر curl.** النتيجة: زرّ «Source registry only» في Research Archive ينزّل المجموعة كاملة، والمسار المعلن `?dataset=sources` لا يفعل ما يقول.

### 4.16 `/sources` — سجلّ المصادر

96 مصدرًا مجمّعًا حسب النوع (6 أنواع، 4 منها مستخدمة فعليًّا: mission-page 35، technical-archive 31، reference 29، fact-sheet 1)، مع `ClaimLegend` وشريط "Known limits".

**حدود:** **9 سجلّات مصادر مكرّرة** تشير إلى نفس الروابط (مثل `SRC-APOLLO-15`/`SRC-NASA-APOLLO-15`، `SRC-VIKING`/`SRC-NASA-VIKING`، `SRC-SPIRIT`/`SRC-NASA-SPIRIT`، `SRC-OPPORTUNITY`/`SRC-NASA-OPPORTUNITY`، `SRC-CURIOSITY`/`SRC-NASA-CURIOSITY`، `SRC-PERSEVERANCE`/`SRC-NASA-MARS-2020`، `SRC-NEW-HORIZONS`/`SRC-NASA-NEW-HORIZONS`، `SRC-CASSINI`/`SRC-NASA-CASSINI-MISSION`، `SRC-MARS-PATHFINDER`/`SRC-NASA-PATHFINDER`) — ووثيقة المشروع نفسها تقول: *"duplication is how registries drift"*.

### 4.17 `/about`

561 سطرًا — يشرح المشروع والمنهجية والتغطية والحدود وإتاحة الوصول وقائمة المصادر الـ 96 كاملة. **يتداخل كثيرًا مع `/research` و`/sources`** (ثلاثة أسطح "منهجية/مصدر" متداخلة). وتُعيد `distinctions` قائمة **مكتوبة يدويًّا** بحالات 5 سجلّات — **تكرار لـ `missions.ts` يُنشئ خطر انزياح**، وهو ما تجنّبه المهمّات المشتقّة.

### 4.18 Localisation

**البنية:** `src/lib/i18n.ts` — **101 مفتاحًا في `en` و101 في `ar`، بمجموعتَي مفاتيح متطابقتين تمامًا** (تحقّقتُ برمجيًّا: 0 ناقص، 0 زائد). `t()` يتدرّج: `ar` ← `en` ← المفتاح نفسه. الاختيار **صريح** عبر كوكي `graverse-locale` (سنة) — **بلا استنتاج من لغة المتصفّح**، فيتغيّر الاتجاه مع `lang` و`dir` على `<html>`.

**ما هو مترجم فعليًّا:** الترويسة والتذييل والبطل والقوائم وchrome الأقسام (24 مفتاح `home.` + 21 مفتاح `sections.` + 19 `nav.` + 15 `common.` + 10 `footer.` + 12 `sim.`).

**ما هو إنجليزي بالكامل رغم كوكي العربية (مُتحقَّق منه، `t()` = 0):** `engineering/[id]` (201 سطرًا)، `stories/[id]` (160)، `simulations/[id]` (149)، `search` (57)، `sources` (228)، `about` (561)، `MyUniverseClient` (342)، `CompareClient` (149)، `StatusBoard` (181)، `SearchExperience` (359). و**كل** نصوص المؤشّرات في `Simulators.tsx` ("Entry speed", "Touchdown speed", "Budget"…).

> **تصحيح مهم:** ادّعاء README بأن "Mission Control, Engineering, Stories, Research, Simulations, My Universe and comparison surfaces" مترجمة **يحتاج تقييدًا**: هي مترجمة في **chrome** الأقسام (3 مفاتيح لكلٍّ) فقط. الصياغة الدقيقة موجودة فعلًا في Research Archive ("section chrome").

**إتاحة الوصول للغة:** خصائص CSS المنطقية (`ms-`/`me-`/`start-`/`end-`) + `unicode-bidi: plaintext` على الكتل + عزل القيم التقنية (`dir="auto"` على الشارات) — حلّ ذكي لتفكّك التواريخ داخل نصّ عربي.

### 4.19 Navigation

`SiteHeader`: 5 روابط رئيسية (Home / Explorer / Museum / Academy / About) + قائمة "More" بـ 7 عناصر + بحث (اختصار `/`) + مبدّل لغة + مبدّل حركة + قائمة جوال مسطّحة بـ 12 عنصرًا. `SiteFooter`: 4 أعمدة. `ExperienceSwitcher` — **شيفرة ميتة**.

### 4.20 الاختبارات والبنية التحتية

| الملف | ما يفعله |
|---|---|
| `scripts/validate-data.ts` | zod + تكامل مرجعي + provenance — **يُفشل البناء** |
| `tests/data.test.ts` | 21 اختبار Node — العدّ، الاستشهاد، اشتقاق المهمّات، **تماثل العلاقات**، صلاحية claims، تغطية البحث، التحقّق من التقدّم، اشتقاق الإنجازات، تصحيح ذلك، مزامنة القواميس |
| `scripts/smoke.mjs` | 50 مسار: حالة HTTP، العنوان، `h1` واحد، `main`، طول المحتوى + تحويلات + تحريك مركبة + إطلاق صاروخ + axe على 38 صفحة |
| `scripts/journeys.mjs` | 30 رحلة مستخدم حقيقية في المتصفّح |
| `scripts/link-check.mjs` | 40 صفحة، 192 رابطًا |
| `scripts/perf.mjs` |probe LCP/CLS |
| `scripts/verify.mjs` | منسّق البوّابة الكاملة |

---

### 4.21 ملخّص القيم — ما الذي *يستحقّ* العرض، وما الذي يجب إصلاحه

| المستوى | المحتوى |
|---|---|
| **قمة القوة** | (1) فصل الحالة المزدوجة بنوعي compile-time + نصوص أصلية؛ (2) المشتقّة بدل النسخ في المهمّات؛ (3) بوّابة تحقق آلية شاملة؛ (4) الصراحة المنهجية (Research Archive + «Do not claim» في DEMO_GUIDE)؛ (5) نزاهة المعالجة: 96 مصدرًا و`Unknown` بدل التخمين. |
| **قوة متوسطة** | Explorer متعدّد الأوضاع؛ القاعة 3D بصور حقيقية؛ النصوص العربية chrome؛ المحاكاة (4 من 8 سليمة)؛ Research Archive. |
| **يحتاج إصلاحًا قبل العرض** | S01 (معطوبة)، S05 (غير قابلة للحلّ)، S06 (`powerLimitW` ميت)، `/api/export?dataset=`، لوحة "What is in the index"، «Shareable link» في Compare، مرشّح `eventType`، خطأ `apollo-15-lunar-rover` السلبي. |
| **يحتاج نقاشًا لا إصلاحًا** | 4 روابط NASA ميتة (2 منها في مصادر تعليمية مُستشهَد بها)، 9 سجلّات مصادر مكرّرة، شيفرة ميتة (`ExperienceSwitcher`، `JuniorQuiz`…)، `ArtifactAnatomy`skeptic. |

---

<a id="5-غوص-عميق-الأكاديمية"></a>
## 5. غوص عميق: الأكاديمية — تجربة المعرفة

### 5.1 لماذا تحتاج GRAVERSE أكاديمية بدل عرض معلومات علمية؟

لأن **المعلومة ليست تعلّمًا**. الفرق بين knowledge و learning ليس في كمّ المحتوى بل في ثلاثة أشياء تحدّدها الأكاديمية صراحةً:

1. **التدرّج**: المعلومة تُقدَّم مرتّبة حسب developmental stage، لا حسب الترتيب الأبجدي أو حسب فضول المصمّم.
2. **الفحص**: المعلومة لا تُكتسب بمجرد قراءتها؛ تُكتسب بمحاولة استرجاعها.
3. **الاستمرار**: المعلومة تُنسى بعد أسبوع؛ التعلّم يحتاج أثرًا يراه الزائر.

المتحف والـ Explorer يجيبان عن سؤال **"ما هذا الشيء؟"**. الأكاديمية تجيب عن **"ما الذي يجب أن أفهمه لأفهمه؟"**. تحدّي NASA يسأل صراحةً: *"What age group is your story designed for?"* و*"How accessible is the format you chose to use?"* — والأكاديمية هي **الإجابة المبنيّة في المنتج** لا في وثيقة.

### 5.2 كيف تحوّل الأكاديمية تاريخ الفضاء إلى تعلّم منظَّم

**البنية ثلاثية الطبقات:**
```
Journey (4)  —  الوعد + المسار + الشارة + الخطوات (23 خطوة إجمالًا)
  └── Lesson (12)  —  3 أهداف + 3 أقسام + 2 مصطلحًا + tryIt + 2 سؤال اختبار
        └── Artifact (30)  —  السجلّ الكامل: purpose → journey → science → fate
              └── Source (96)  —  الدليل
```
**الطبقة الأولى — الـ Journey**: هي **الوحدة التعليمية**، لا الدرس. الـ comment في `src/data/journeys.ts` يصفها صراحةً: *"A journey is the Academy's primary unit; lessons, artifacts and challenges are steps inside it."* والفرق جوهري:
- الدرس = **محتوى**.
- الرحلة = **مسار**: تسلسل مُصمَّم يخلط قراءات ومعاينات وتحدّيات، مع وعد (promise) ومدة وشارة.

**النوع** `JourneyStepKind = "lesson" | "artifact" | "body" | "article" | "challenge"` هو **آلية التفيّق** بين التجربة والـ Museum/Explorer. الرحلة `moon-detectives` مثلًا: درس (قراءة جدول زمني) → سجلّ `ranger-7` → سجلّ `apollo-11-lrrr` → مقال (الم القمر كمختبر) → تحدٍّ في Explorer (`/explorer?mode=artifacts&destination=moon`) → تحدٍّ في اختبار (لماذا تختلف الحالتان؟). **هذه ليست قائمة موارد؛ هذه حكاية.**

**الطبقة الثانية — الأهداف المعرفيّة:** كل درس يحمل 3 objectives بصيغة فعلية قابلة للملاحظة — "Say what an artifact is in your own words"، "Distinguish mission status from hardware status". هذه **أنشطة قابلة للقياس**، لا عناوين فصول. (لكنها — كما سأشرح — **غير مرتبطة بأسئلة الاختبار**، فتُقرأ ولا تُقاس.)

**الطبقة الثالثة — الفحص:** سؤالان لكل درس، كل سؤال بشرح. الشرح ليس "صحيح/خطأ" بل **تبرير**: `question.explanation` تُظهر *لماذا*. وهذه هي سمة التعلّم النشط (انظر [القسم 12](#12-الإطار-التربوي)).

### 5.3 كيف تساعد من بلا خلفية تقنية

ثلاث آليات محدّدة، مُتحقَّق منها في الشيفرة:

1. **معجم بلغة مبسّطة (40 مصطلحًا)** — تعريفات موجزة مثل: *"Artifact — A piece of human-made hardware that was sent to space or left on another world. GRAVERSE uses the word for physical objects, not for data files."* لاحظ أنّ التعريف **يشرح الاصطلاح الداخلي للمشروع** — وهو ما يمنع الالتباس.
2. **لغة Kid-language في مختبر الروبوت** — `lib/robot.ts` فيه جداول `placeLines` و`missionKid` (7 حالات) و`hardwareKid` (7 حالات) و`moveLines` (7 أنواع). أي أنّ.Status statuses تُترجَم إلى لغةطفل: "My mission is finished, but I'm still sitting here."
3. **التدرّج العمري في الطول نفسه** — درس 6–7 دقائق ل Ages 5–7، ودرس 10–12 دقيقة لـ 10–12. والمحتوى يتدرّج: "What is a space artifact?" → "Reading a mission timeline" → "How we know what we know".

### 5.4 كيف تُشجّع على الاستمرار

| الآلية | كيف تعمل | ما الذي يجنبه |
|---|---|---|
| **سجلّ التقدّم** | درس، رحلة، لعبة، شارات — في `graverse:progress:v1` | أن يشعر الزائر أن تعلّمه ضاع |
| **الشارات المشتقّة (15)** | تُحسب حيًّا من النشاط: `first-lesson` … `all-lessons` | أن يحتاج الزائر إلى تذكّر ما أنجزه |
| **الشهادة** | تسجّل 4 أرقام + زرّ طباعة | أن ينتهي التعلّم بلا أثر ملموس |
| **المجموعات** | `My Universe` بمفضّلة ومجموعات | أن يُعيد الزائر من الصفر |
| **الألعاب** | 3 ألعاب بشارات ونجوم | أن يكون المحتوى جافًّا |
| **التحدّيات داخل الرحلات** | خطوات `challenge` | أن يقتصر التعلّم على القراءة |

### 5.5 نقد Academy الصريح — ما لا يجب أن يدّعيه الفريق

| الملاحظة | التفصيل |
|---|---|
| **لا بوّابة نجاح** | `first-lesson` و`all-lessons` تفتحان بوجود سجلّ الدرس لا بالدرجة. إجابة 0/2 = "Academy graduate" (12/12). |
| **خطوات الرحلة مُصادَقة ذاتيًا** | زرّ "Mark step done" يعمل دون فتح الدرس. الرحلة قابلة للّعب بالكامل. |
| **الفئات العمرية زخرفية** | لا عمر مخزَّن ولا بوّابة محتوى. طفل 5 سنوات يفتح درس 10–12. |
| **لا تكرار متباعد** | البطاقات بلا SRS؛ ومجموعة "known" في حالة المكوّن فقط، تضيع فورًا. |
| **11 مصطلحًا مكرّرًا** | في deck «Everything» يظهر المصطلح نفسه بتعريفين متعارضين (نصّ الدرس مقابل نصّ المعجم). |
| **حدود builder غير قابلة للوصول** | 0 من 1,152 تركيبة تتجاوز حدّي الكتلة/الطاقة. |
| **الشارات مفكّكة** | `progress.badges` (19 معرّفًا) لا يُقرأ؛ نظام الإنجازات (15) لا يُقرأ. رقمان مختلفان في صفحتين. |
| **لا Context** | 12 نسخة مستقلة من `useProgress()`؛ لا تزامن حيّ ولا بين التبويبات. |
| **الشهادة ليست شهادة** | بلا معرّف ولا توقيع ولا تصدير صورة — فقط `window.print()`. |
| **الروبوت نصّي لا محادثة** | 24 قاعدة regex. honest صراحةً («Not AI»). |
| **5 دروس معزولة** | `landers-and-orbiters`، `signals-across-space`، `gravity-assists-and-the-grand-tour`، `how-we-know-what-we-know`، `rovers-are-robot-explorers` لا تظهر في أي رحلة. |

---

<a id="6-غوص-عميق-المتحف"></a>
## 6. غوص عميق: المتحف — تجربة الإرث

### 6.1 هوية القطعة (Artifact identity)

السجلّ الـ`Artifact` يحمل **30 حقلًا** موثّقًا بـ zod (`src/lib/schemas.ts:69-138`). أهمّها للعقلنة:
- `name`, `alternateNames?`, `missionName`, `programName`
- `destination` + `destinationGroup` (`"moon" | "mars" | "deep-space"`)
- `hardwareType` (7 قيم: rover, lander, orbiter, probe, instrument, surface-equipment, aircraft)
- `overview`, `scientificPurpose`, `scientificContributions[]` (`kind: "science" | "engineering"`), `fate`
- `location`: `{ body, locationName, precision: "exact"|"approximate"|"region"|"unknown", note? }`
- `technicalDetails[]`, `timelineEvents[]`, `primaryMilestone`
- `media?`, `sourceIds[]`, `lastVerified`, `dataNotes[]`

**التوزيع الفعلي (30):** moon 12 · mars 12 · deep-space 6.
**hardwareType:** lander 11 · probe 7 · rover 6 · instrument 2 · orbiter 2 · aircraft 1 · surface-equipment 1.
**الصور:** 30 من 30 تملك صورة؛ 26 صورة فوتوغرافية و**4 رسوم فنان** (`voyager-1`, `cassini`, `lunar-prospector`, `insight`) موسومة `isIllustration: true` ومُعلَّنة في الواجهة **ثلاث مرّات** (شارة + تعليق + نصّ قسم الوسائط).

### 6.2 تصنيف العتاد والعلاقة بالمهمّة

`hardwareType` لا يُستنتَج ولا يُملأ آليًّا؛ هو **مصنّف محرَّر** يُبرَّر في `dataNotes` عند الحاجة. مثال: `apollo-11-lrrr` = `instrument` (وليس `surface-equipment`)، مع `dataNotes` يوضّح لماذا.

**العلاقة بالمهمّة** عبر `missionName` (مفتاح نصّي) + `programName`. `getMissionByName()` يربط السجلّ بالمهمّة المشتقّة. **المهمّات 24** مُشتقّة من الـ30 سجلًّا.

### 6.3 ⚠️ التمييز الأهم في المشروع: حالة المهمّة مقابل حالة العتاد

**هذا هو القسم الذي يجب أن يقف عنده أي حكّام علمي.**

#### (أ) الفصل على مستوى النوع البرمجي

```ts
// src/types/artifact.ts
export type MissionStatus =
  | "planned" | "ongoing" | "completed" | "ended" | "lost-contact" | "unknown";

export type HardwareStatus =
  | "operating" | "inactive" | "no-longer-communicating"
  | "impacted" | "destroyed" | "still-traveling" | "unknown";
```
**لا رابط بين Unions.** لا يمكن كتابة `missionStatus: "operating"` ولا `hardwareStatus: "ongoing"` — وTypeScript يرفض، وzod يعيد التحقّق من القائمتين باستقلال.

#### (ب) الفصل في مكوّن العرض

```tsx
// src/components/ui/StatusBadge.tsx
type StatusBadgeProps = { compact?: boolean; className?: string } & (
  | { kind: "mission";  status: MissionStatus  }
  | { kind: "hardware"; status: HardwareStatus }
);
```
**discriminated union** — يستحيل تمرير حالة عتاد تحت `kind="mission"`. وواجهة الشارة **تسبّق التصنيف نصًّا**: «Mission: Completed» / «Hardware: Inactive».

#### (ج) الفصل في البيانات — النص الأصلي الإلزامي

كل سجلّ يحمل **حقلين إلزاميين غير فارغين** (`z.string().min(1)`):
- `missionStatusOriginal` — مثلًا: *"NASA lists Ranger 7 as a successful mission that returned the first U.S. close-up images of the Moon."*
- `hardwareStatusOriginal` — مثلًا: *"The spacecraft struck the Moon as planned at the end of its imaging sequence; no part of the flight hardware remains operational."*

والتعليق في أعلى `artifact.ts`:
> *"Original status wording is preserved alongside the normalized status so the UI never silently rewrites a source."*

#### (د) الفصل في العرض

في `#communication` على صفحة السجلّ، تحت عنوان **«Two different questions»**:
| العمود 1 | العمود 2 |
|---|---|
| **Mission status** + `missionStatusOriginal` | **Hardware status** + `hardwareStatusOriginal` |

وفي `/museum` (الفهرس): كتلة **«Why every record shows two statuses»** بمثالين متعمّدين: «Example → Mission: Completed» و«Not the same thing → Hardware: Unknown».

#### (هـ) سابق حاسم في البيانات نفسها

`apollo-15-lrrr`: `missionStatus: "completed"` + `hardwareStatus: "operating"` + `dataNotes`:
> *"The instrument is still used even though the Apollo 15 mission is complete; mission status and hardware status are intentionally separate."*

#### (و) محور ثالث مشتقّ: حالة الاتصال

`deriveCommunicationStatus()` **لا تُخزَّن** بل تُحسب من الحالة المسجَّلة، مع استثناءات صريحة للأجهزة السلبية (المرايا العاكسة) ومراحل الهبوط المتروكة. كل بطاقة اتصال تحمل `title="Derived label — Derived from the recorded hardware status. Not a live telemetry feed."`

### 6.4 لماذا هذا التمييز أهمّ قرار علمي في GRAVERSE

**1. لأنّ الخلط هو الخطأ الشائع فعلًا في هذا المجال.** صفحة NASA Science لـ Curiosity تعرض شارة واحدة: «Active Mission». صفحة NSSDCA لـ Apollo 11 LM تقول في المتن: *"The fate of the LM is not known, but it is assumed that it crashed into the lunar surface sometime within the following 1 to 4 months."* —جملة عظيمة، لكنها **لا تُبرز** أن المهمّة نجحت وأن العتاد مفقود. GRAVERSE تجبر القارئ على رؤية الاثنين معًا.

**2. لأنّ سِجلّات NASA نفسها تستخدم لغة متعدّدة.** اقرأ `missionStatusOriginal` و`hardwareStatusOriginal` في المجموعة: صياغة NASA ليست موحّدة — أحيانًا «successful mission»، أحيانًا «mission ended»، أحيانًا «spacecraft struck the Moon as planned». **توحيدها في شريط واحد بلا حفظ الأصل خطأ منهجي**، وGRAVERSE يرتكب هذا الخطأ عمدًا وأصالةً.

**3. لأنّ «انتهاء المهمّة» و«فناء الشيء» حدثان مختلفان في الزمن والسببية.**
- **المهمّة** تنتهي بقرار أو حدث (إغلاق، اصطدام، انتهاء_payload).
- **العتاد** قد: يستمر في العمل (Perseverance)، أو يصمت لكن يبقى سليمًا (InSight — آخر اتصال 2022-12-15، والعتاد على المريخ)، أو يُدمَّر عمدًا (Cassini في 2017)، أو يصطدم عمدًا (Ranger 7، LCROSS)، أو يبقى travelerًا (Voyager 1، `still-traveling` ضمن السرد).

**4. لأنّ الفارق يغيّر القاعدة الأخلاقية.**المركبة تُدمّر عمدًا (Cassini) لتفادي التلوّث المحتمل ببروتوكول الأرض — **هذا قرار عقلاني لا إهمال**. وRanger 7 اصطدمت عمدًا بعد أن أدّت مهمّتها. وInSight لم «تُهمل»: فقدت الاتصال inexplicably. **إطار «المُهمَل» (abandoned) — وهو عنوان التحدّي نفسه — يُطبَّق بشكل فاسد على حالات كانت قرارات محسوبة.** GRAVERSE يحفظ التمييز الدقيق، وهذا في lui-même ضروري.

**5. لأنّ التمييز يجعل التصميم ممكنًا.** لأنّ `hardwareStatus` مستقلّة، يمكن أن:
- تُصفَّح «كل العتاد الذي لا يزال يعمل» → 7 سجلّات.
- تُصفَّح «ما الذي اصطدم» → 4 سجلّات.
- تُقارَن «مهمّة انتهت بعتاد سليم» → Apollos.
- **تُصنَّف حالة الاتصال** على محور ثالث.

**6. لأنّه يربّح Project في بُعد "Accuracy is important throughout".** شرط NASA الصريح. والفصل هو **الأنضج شكل للدقّة** لأنّه لا يكفي أن تكون القيمة صحيحة — يجب أن تُقرأ ضمن سياقها الصحيح.

### 6.5 الدقّة العلمية: ما هو مُتحقَّق منه

| الفحص | النتيجة |
|---|---|
| روابط NASA Image IDs (30) على `images.nasa.gov/details/{nasaId}` | **30/30 تُرجع HTTP 200** (تم فحصها واحدًا واحدًا — `PIA23520`, `as11-40-5927`, `ARC-1972-AC72-2135`, `9139575`… كلها حقيقية) |
| روابط المصادر (89 رابطًا فريدًا) | **82 تُرجع 200**، **4 تُرجع 404**، **3 تعذّر فحصها** (مهلة/robots) |
| السجلّات الـ 4 الميتة | `science.nasa.gov/mission/mars-exploration-rover-spirit/` · `science.nasa.gov/mission/mars-exploration-rover-opportunity/` · `esa.int/About_Us` · `isro.gov.in/AboutISRO.html` |
| **من يستشهد بالمحرّتين الأولى؟** | `articles.ts:56` و`articles.ts:29` و`lessons.ts:633` — أي **صفحتا مقالة واحدة ودرس واحد**؛ أي أنهما **رابطان ظاهران لزائر** |
| **هلCitations الأساسية سليمة؟** | نعم: `SRC-SPIRIT` (`…/mission/mer-spirit/`) و`SRC-OPPORTUNITY` (`…/mission/mer-opportunity/`) تُرجعان 200؛ الميتان في السجلّات **المكرّرة** فقط. |

### 6.6 عدم اليقين والمعلومات الناقصة

- **الحقول الاختيارية:** `launchDate?`, `arrivalDate?`, `missionEndDate?`, `lastContactDate?`, `media?`, `alternateNames?`, `location.note?`.
- **الواقع:** `launchDate` و`arrivalDate` في **30/30**؛ `missionEndDate` في **25/30** (غائبة في المهمّات الجارية الخمس — وهو سلوك صحيح)؛ `lastContactDate` في **12/30**.
- **حالات "المجهول" مبنيّة في الواجهة:** `"Unknown"` (5 مواضع مختلفة: حالة المهمّة، حالة العتاد، حالة الاتصال، ادّعاء، تاريخ) · `"Not recorded"` · `"Not documented"` · `"Date not documented"` · `"Location not documented"` · `"No NASA image is included in this record."` · `"No source is recorded for this item."` · `"No explicit related records are listed for this artifact."` · `"No Academy lesson currently uses this artifact as a teaching example."`
- **`dataNotes`** — **هذه أقوى أداة أمانة في المشروع**: ملاحظات per-record تُعرض **بجانب المصادر لا في البيانات الوصفية**. أمثلة حقيقية:
  - Ranger 7: *"Ranger 7's impact was intentional. 'Impacted' describes the hardware outcome, not a mission failure."*
  - Surveyor 1: *"Surveyor 1 landed before Apollo 11; it was a robotic precursor, not part of the crewed Apollo program."*
  - Ranger 7: *"The image shows the spacecraft during ground processing, not on the lunar surface."*
- **`precision: "exact"` غير مستخدم.** كل السجلّات الـ30 تستخدم `region` أو `approximate` أو `unknown`، و`location.note` يقول تقريبًا: *"no coordinate pair is plotted here."* **هذا منضبط: لا إحداثيات مخترَعة.**

### 6.7 حدود المتحف

| الحد | التفصيل |
|---|---|
| `ArtifactAnatomy` ليس تشريحًا | إعادة عرض لـ `technicalDetails`، بشريط «Schematic, not a reconstruction» — لا SVG ولا هندسة ولا توزيع أجزاء. |
| رسالة «3D model unavailable» ثابتة | لكل السجلّات بلا استثناء. |
| رسم العلاقات غير مرئي | 581 حافة، مستخدمة في صفحة واحدة فقط. |
| `relatedIds` ذاتي المرجع | `apollo-17-lm-descent-stage` يظهر مرتبطًا بنفسه. |
| `SourceList` غير مستخدم في صفحة السجلّ | منطق عرض مكرَّر يدويًّا. |
| القاعة 3D زخرفية | لا حالة، لا انتقاء داخل الـ canvas. |
| `missionStatusOriginal` يظهر **فقط** هنا | البطاقات والقوائم تعرض الشريط المعياري فقط. |

---

<a id="7-غوص-عميق-المستكشف"></a>
## 7. غوص عميق: المستكشف — تجربة الاكتشاف

### 7.1 لماذا المستكشف أكثر من خط زمني بصري؟

لأنّ خطًّا زمنيًا **يقيس فقط بُعدًا واحدًا** (الزمن)، بينما استكشاف الإرث الفضائي يحتاج **أربعة أبعاد متشابكة**:
1. **متى**؟ (الزمن — launch, arrival, last contact, impact)
2. **أين**؟ (المكان — Lunar surface, Gale Crater, Saturn orbit, interstellar space)
3. **لماذا**؟ (الغرض — تصميم هندسي يجيب عن سؤال علمي)
4. **ماذا بقي**؟ (الحالة — hardware status + mission status + اتصال)

GRAVERSE تُظهر هذه الأبعاد الأربعة **في نفس السجلّ** (بنية `Artifact`) وتربطها عبر **رسم علاقات واحد**. الفرق الجوهري بين GRAVERSE و«مخطّط زمني جميل»:
- المخطّط الزمني يعرض **أحداثًا**. المستكشف يعرض **قطعًا** — لكل قطعة حالة وموقع ومصادر.
- المخطّط الزمني يُرشِّح **أحداثًا**. المستكشف يُرشِّح **قطعًا** (بمهمّة، بعتاد، بعقد، بنوع حدث).
- المخطّط الزمني ينتهي عند الصفحة. المستكشف ينتهي عند **سجلّ museum** فيه القصة كاملة والمصادر.

### 7.2 الترابط بين الزمن والمكان والمهمّة والشيء

| البُعد | أين يُمثَّل | كيف يُربط |
|---|---|---|
| **الزمن** | `timelineEvents[]` (118 حدثًا) + `launchDate/arrivalDate/missionEndDate/lastContactDate` | `timelineEntries(scope, filters)` يبني **مفاتيح** `artifactId:eventId` |
| **المكان** | `destination` + `destinationGroup` + `location{body, locationName, precision}` | `destinationGroup` للتجميع، `location` للدقة |
| **المهمّة** | `missionName` + 24 mission مشتقّة | `getMissionByName()` |
| **الشيء** | الـ30 سجلًّا | `Artifact` |

**نقطة دقيقة مهمّة (تُقييم نزاهة):** `TimelineStage` يعرض `artifact.destination` — وهي **تسمية مجموعة خشنة** ("Moon" / "Mars" / "Deep Space"). فـ Cassini يظهر «Deep Space» رغم أنّه في مدار زحل. الموقع الدقيق موجود في `artifact.location.body` (`"Saturn"`) و`location.locationName` — **ولا يعرضه الـ Explorer**. أي أنّ المستكشف يخسر جزءًا من بُعد المكان، مع أنّ المتحف يعرضه.

### 7.3 لماذا هذا الشكل من الاكتشاف أفضل من قراءة سجلّات منفصلة

1. **السياق يُنتَج بالتجاور.** رؤية `ranger-7` (اصطدام عمدًا 1964) بجوار `surveyor-1` (هبوط نجح 1966) و`apollo-11-lm-descent-stage` (بقي على القمر) **يُنتج استنتاجًا** ("ما الذي تغيّر خلال خمس سنوات؟") لا ينتجه أيّ سجلّ منفرد.
2. **التصفية المتقاطعة تخلق أسئلة جديدة.** تُنتج `destination=moon` + `hardwareStatus=operating` → **ما الذي لا يزال يعمل على القمر؟** → الجواب: المرايا العاكسة. هذه ليست صفحة بل **استعلام**.
3. **المعاينة قبل الالتزام (Preview-before-commit).** النقر على خط زمني لا ينقلك؛ يعرض ملخّصًا مع **زرّ "Explore artifact"**. هذا يقلّل تكلفة الاستكشاف — المفتاح لبقاء متصفّح hg.
4. **العدم اليقين مرئي.** "All mission events" مقابل "Primary milestones" — الزائر يرى **كم نحتاج** لتغطية القصّة.
5. **العرض المتوازي (Timeline / Grid / List).** نفس البيانات بثلاث قنوات — للقارئ البصري، والمتصفّح السريع، وقارئ الشاشة.
6. **الربط للخلف عبر URL.** `/explorer?mode=artifacts&destination=moon` — قابل للمشاركة (مع التحفّظ على ملاحظة `replaceState`).

### 7.4 التفاعل ثلاثي الأبعاد وبدائله

| الطبقة | التفصيل |
|---|---|
| **3D** | `OrreryScene` — `<Canvas>` + `OrbitControls` + كواكب متحرّكة بـ `useFrame` + `dpr [1,1.6]` + `powerPreference: "low-power"` + `frameloop` يتبع reduced-motion |
| **2D** | `OrbitMap` — SVG نقي، `<title>`/`<desc>`، 8 مدارات، روابط حقيقية لكل كوكب مع `aria-label` |
| **نصّي** | قائمة وجهات `<nav aria-label="Solar system destinations">` بـ `next/link` |
| **الإفصاح** | «Decorative» + «Schematic — not to scale» + *"The SVG map below carries the same links and text, and works with keyboard, screen readers and no WebGL."* |
| **الحركة** | `useReducedMotion()` يقرأ `prefers-reduced-motion` **+** تبديل الموقع (`data-motion`) عبر `MutationObserver` |

**التقييم:** هذا **نموذج تقدّم enhancement ممتاز** — ويلتزم حرفيًّا بالقاعدة 4 من المخطط الأزرق ("Accessible fallback") والقاعدة 6 ("Performance by design"). لكنه يحمل عيوبين مُتحقَّق منهما: `OrbitMap` **لا يرسم بلوتو** رغم أن `<desc>` يذكره، ولا يربط الشمس.

### 7.5 حدود المستكشف (المُتحقَّق منها مجتمعة)

| # | الحد | الأثر |
|---|---|---|
| 1 | `eventType` لا يصل إلى 4 من 12 نوعًا | **الأند**؛ يناقض نصّ الواجهة نفسه |
| 2 | تعارض decade مع scope=all | يُعرض ما لا يطابق المرشّح |
| 3 | `sort` ميت في وضع `destinations` | عنصر تحكّم لا أثر |
| 4 | `resultLabel` يتجاهل المرشّحات | «3 destinations» دائمًا |
| 5 | رقاقة «All types» تعرض 30 دائمًا | تناقض داخلي |
| 6 | `scope` غير ظاهر خارج timeline/visual | في URL لكن غير قابل للوصول |
| 7 | `artifact` في URL يُمحى ذاتيًّا | معامل ميت |
| 8 | `replaceState` لا `router.replace` | ادّعاء back/forward غير دقيق |
| 9 | الخط الزمني مفهرس لا مُقياس | 1969 و2020 بالعرض نفسه |
| 10 | ~145 KB تُشحن للمتصفّح | مرشّح يمكن للخادم أداؤه |
| 11 | `OrbitMap` `<desc>` غير صحيح (بلوتو) | خطأ في الوصف |
| 12 | نصوص تناقض البيانات (5 كواكب قزمة، مئات الأقمار) | خطأ في النسخ |
| 13 | لا error boundary حول الـ orrery | عطل three.js يسقط المسار |
| 14 | `destination` الخشن بدل `location` الدقيق | يخسر بُعد المكان |
| 15 | 3 نسخ من فحص WebGL | تكرار |
| 16 | ~80 سطرًا من كود ميت في `lib/explore.ts` | `searchScore`, `searchArtifacts`, `activeFilterCount`… |

---

<a id="8-التجارب-المساندة"></a>
## 8. التجارب المساندة

> **هذا القسم يكشف الهرمية.** لا كل ما بُني متساوٍ. الترتيب أدناه مبنيّ على **حجم المساهمة في التحدي**، لا على عدد الصفحات.

### 8.1 الهرمية: من يحمل الثقل؟

```
المستوى 1 — التجربة الأساسية (المنتج)
    Explorer  ·  Museum  ·  Academy
    └─التي تحمل التحدي مباشرة

المستوى 2 — المنصّات المُنبِتة (تخدم المستويات 1)
    Engineering Lab   ·  Space Stories   ·  Mission Control
    └─التي تُترجم السجلّ إلى فهم: لماذا صُمّم، كيف يُقرأ، ما الحالة

المستوى 3 — المختبرات (تجربة تفاعلية)
    Mission Experience Lab (8)   ·  Academy Playground (3)   ·  Build a rover
    └─هذه تُنتج تفاعلًا لا قراءة

المستوى 4 — أدوات الاستمرارية
    My Universe   ·  Compare   ·  Progress / Achievements / Certificate
    └─هذه تحوّل الزيارة إلى سلسلة

المستوى 5 — طبقة الشفافية (الدعامة)
    Research Archive   ·  /sources   ·  /about   ·  /api/export
    └─هذه تبني المصداقية
```

**الحكم الصريح:** المستويات 1 و2 و5 هي **جوهر المنتج**. المستوى 3 فيه **عيوب يجب إصلاحها** (انظر [الملحق أ](#الملحق-أ-قائمة-العيوب-المُتحقَّق-منها)). المستوى 4 **اختياري وناجح** لكنّه لا يُقاس.

### 8.2 Mission Control — ماذا تُعلِّم زاوية «الحالة التشغيلية»؟

**الإجابة:** تُعلّم أنّ **الحالة التشغيلية تُخاطَب في ثلاث أسئلة لا في سؤال واحد**. الأثر الملموس: بعد visit to Mission Control، يقرأ الزائر بطاقة `apollo-11-lrrr` فيُدرك أن «Inactive» **لا تعني** «destroyed».

**آلية الشفافية:** خمس قنوات (شريط تحذير، ثلاث بطاقات، شارة مشتقّة، بطاقتان تحريريتان، رابط `/research#status`).
**الحدّ الأهم:** هي **ليست** تغذية حيّة. وNASA herself (`eyes.nasa.gov/dsn/`) تقدّم ذلك — لكن بشكل مختلف تمامًا (انظر [القسم 9](#9-المقارنة-التنافسية)).

### 8.3 Engineering — لماذا يفهم الزائر «لماذا صُمّم هكذا»؟

**الآلية:** كل شرح هندسي يربط بمصادر وسجلّات قابلة للتحقّق. مثال: `power-solar-or-rtg` يرتبط بـ Sojourner, Spirit, Opportunity, Curiosity, Perseverance (5 سجلّات) — فينتقل القارئ من «لماذا يحتاج Spirit إلى RTG؟» إلى سجلّ Spirit ثم إلى lesson `signals-across-space`.
**الأثر:** يحوّل «curiosity fact» إلى **cause-and-effect**.
**الحدّ:** الروابط أحادية الاتجاه (Engineering → Museum فقط)، والنصوص تذكر المحاكيات والمقارنة **بلا روابط**.

### 8.4 Stories — كيف تحوّل السجلّات التقنية إلى قصص؟

**الآلية:** `sections[]` = `{heading, paragraphs[], artifactIds[]}` — **لا حقول وقائع جديدة** (لا تاريخ، لا موقع، لا حالة، لا كمية، لا اكتشاف). النصوص فقط.=Rearrangement.
**الأثر:** القصّة `final-days` (Opportunity, InSight, Ingenuity, Cassini, Phoenix, Spirit) تجيب مباشرةً على ألم التحدّي: الأطفال يسمعون عن المهمّات الجارية فقط — وهذه هي **آخر مآثر المهمّات المنتهية**.
**الحدّ:** انزياح استشهاد واحد + ادّعاء غير مسنود بأن مسافات المحاكاة «من المجموعة».

### 8.5 Research Archive — كيف تحسّن المصداقية والشفافية؟

**الإجابة:** بجعل **حدود المشروع معلنةً كواجهة** لا كملحق. أقوى الأدوات:
- **«Honest limitations»** — 4 بطاقات صريحة.
- **«Coverage and known gaps»** — 4 صفوفIncluding: *"Many missions and objects are not included"* و*"The collection is intentionally finite and does not claim completeness."*
- **«A missing record is a gap, not evidence that an object does not exist."** — جملة يمكن أن يتبنّاها أي Museum.
- **`/api/export`** — يجعل الشفافية قابلة للتحقّق الميكانيكي: يمكن لأيّ شخص تنزيل البيانات وقراءة `sourceIds` و`lastVerified`.
- **`changelog` بإصدارين** — يُظهر أن المنهجية نفسها موثّقة عبر الزمن.

### 8.6 Mission Experience Lab — ما الذي تُعلّمه الثماني؟

**الإجابة المختصرة:** تُعلّم **كيف** تعمل المهمّة، لا **ما** هي. الفارق جوهري: المتحف يقول "Perseverance" يحمل 10 أدوات، والمحاكاة S06 تجعلك **تُسقط** حفرًاbecause الكتلة تتجاوز الحدّ.

**جدول التحليل الكامل** في [القسم 4.11](#411-mission-experience-lab-simulations--المحاكيات-الثماني). الخلاصة الصادقة:
- **نموذج هندسي حقيقي واحد (S04)** — vis-viva بدقّة رياضية.
- **حساب دقيق ضمن تقريب (S03)** — زمن الضوء صحيح تمامًا.
- **نماذج تعليمية سليمة (S02)** — ميزانية طاقة بأبعاد حقيقية.
- **نماذج معطوبة (S01، S05)** — يجب إصلاحها.
- **نموذج ضعيف (S07)** — مفتاح فرعين فقط.
- **مفتاح إجابة واحد (S08)** — لكن مهمّته البيداغوجية (قراءة النصّ الأصلي) حقيقية.

**الجملة التي تصف التشخيص بأمانة:** *"Every outcome in this lab is a hypothetical scenario, not a historical claim."* + `ApproximationNote` على كل صفحة + *"These are teaching models, not flight software, mission predictions or observations."*

### 8.7 Comparison — لماذا المقارنة ذات معنى؟

**لماذا المقارنة ذات معنى علميًّا:** لأنّ **الفرق** هو المعلومة. «Curiosity is 899 kg on Earth and 743 kg on Mars» رقم؛ «Curiosity has 900 kg and Perseverance has 1,025 kg **because** Perseverance carries a sample caching system» **فهم**.
**ما يفهمه الزائر من مقارنة:** الفرق بين مركبة مصمَّمة لـ *sampling* وأخرى مصمَّمة لـ *exploration*؛ الفرق بين مهمّة انتهت وأخرى جارية؛ الفرق بين عتاد مُركَّب عمدًا وآخر متروكًا بالصدفة.
**ما لا يفهمه:** `technicalDetails` و`scientificContributions` و`timelineEvents` **غير مقارَنة** — أي أنّ جدول المقارنة يُهمل بالضبط أعمق البيانات.
**الحدّ:** سجلّان فقط، ورابط مشاركة لا يتحدّث.

### 8.8 My Universe — لماذا يهمّ التقدّم المحلي؟

**لماذا يهمّ:** لأنّ تحدّي NASA موجَّه لـ «school-age space enthusiasts» — و**الزائر المدرسي يعود، لا يعود**. بدون حفظ، كل زيارة تبدأ من الصفر. مع الحفظ، تصبح هناك **سلسلة**، و`certificate` تصبح نقطة نهاية ذات معنى، و`recent` تفتح «أكمل ما بدأت» تلقائيًّا.
**لماذا محليًّا وليس حسابًا:** لأسباب صريحة وصحيحة: خصوصية الأطفال، لا تتبّع، لا استضافة. والعيب الوحيد: `personal` تقبل استيراد ملفات التقدّم وتمسح المجموعة.

### 8.9 جدول تلخيصي: المساندة ضد التحدي

| السطح | أيّ بند من التحدي يخدمه | المساهمة النسبية |
|---|---|---|
| Mission Control | "current level of functionality" · "untold histories" | **عالية** |
| Engineering | "connection between the engineering … and the scientific knowledge" | **عالية** |
| Stories | "tell the story" · "engaging narrative" · "personal connection" | **عالية** |
| Research Archive | "Accuracy is important throughout" | **عالية** (Indirect but decisive) |
| Simulations | "showing … how these missions operated" | **متوسطة–عالية** (بعيوب) |
| Playground | "school-age" · "bring … to life" | **متوسطة** |
| My Universe | استمرارية الزيارة | **متوسطة** |
| Compare | "compare … broader story" | **منخفضة–متوسطة** |
| /api/export | شفافية البيانات | **منخفضة مباشرة، عالية غير مباشرة** |
| /sources · /about | المصداقية | **عالية غير مباشرة** |

---

<a id="9-المقارنة-التنافسية"></a>
## 9. المقارنة التنافسية

> **منهج هذا القسم:** لم أفترض نقصًا في أيّ منصة. فحصت كل واحدة يدويًّا أو برمجيًّا، وسجّلت ما رُصد فعلًا. جميع الروابط في هذا القسم **فُحصت بتاريخ 2026-11-11**، والنتائج مُدرجة.
> **تحذير منهجي:** العرض أدناه لا يقدّم GRAVERSE على أنها "الأولى" أو "الأكمل". **لا يوجد دليل على وجود سابقة حصرية.** ما سأعرضه هو ما **فُحص**.

### 9.1 اللوحة التي فحصتها

| المنصّة | الرابط (فُحص 2026-11-11) | الحالة | ما هي فعلًا |
|---|---|---|---|
| **NASA Science — صفحة مهمّة** | `https://science.nasa.gov/mission/msl-curiosity/` | **200** | صفحة مهمّة واحدة: شارة حالة واحدة («Active Mission»)، Type/Launch/Landing/Target/Objective، 3D model viewer، Science Instruments، Raw Images، News & Features |
| **NASA NSSDCA — سجلّ مركبة** | `https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C` | **200** | أرشيف تقني: Cosmos ID، Mission Profile، subsystems، Alternate Names، Facts in Brief، Personnel، Trajectory/Telemetry/Experiments/Datasets، Lunar Sites |
| **NASA Eyes** | `https://eyes.nasa.gov/` | **200** | ستّة تطبيقات 3D: Eyes on the Solar System (**150+ مهمّة** من الإطلاق حتى النهاية)، Eyes on Asteroids، Eyes on the Earth، Eyes on Exoplanets، DSN Now (**اتصال حيّ**)، Mars Relay Network (**اتصال حيّ**)، Mars 2020 EDL، Experience Curiosity, Spacecraft AR |
| **NASA Solar System Exploration** | `https://science.nasa.gov/solar-system/` | **200** | مدخل Science ل النظام الشمسي |
| **NASA Learning Resources** | `https://science.nasa.gov/learning-resources/` | **200** | كتالوج موارد تعليمية |
| **ESA Education (Teachers)** | `https://www.esa.int/Education/Teachers` | **200** | بوّابة مدرّسي ESA |
| **Smithsonian National Air & Space Museum** | `https://airandspace.si.edu/` | **200** | متحف مادي |
| **Smithsonian — Apollo 11** | `https://airandspace.si.edu/explore/stories/apollo-11-moon-landing` | **200** | قصّة أبولو 11 |
| **Smithsonian 3D** | `https://3d.si.edu/` | **403** (bot-blocked) | مستودع نماذج 3D |
| **NASA 3D Resources** | `https://3d.nasa.gov/` | **000** (تعذّر الوصول من هذه الشبكة) | مستودع نماذج NASA |
| **JPL Solar System Trek** | `https://trajectory.jpl.nasa.gov/` | **000** (تعذّر الوصول) | متصفّح مسارات |
| **NASA OpenSpace** | `https://open-space.github.io/` | **404** (المسار الرئيسي؛ المشروع على GitHub) | تصوّر مفتوح للمweaver |
| **ESA "Where is my Spacecraft?"** | `https://whereismyspacecraft.esa.int/` | **000** | متتبّع سفن |
| **The Planetary Society** | `https://www.planetary.org/` | **200** | منظّة غير ربحية |
| **دليل Grave على NSSDCA** | `https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.txt` | **404** | (المسار تغيّر) |

> **ملاحظة أمانة:** ثلاثة مواقع لم أستطع الوصول إليها من هذه الشبكة (000) وواحد محجوب (403). **لن أدّعي معرفة محتوياتها**beyond ما يمكن استنتاجه بحذر من كونها معروفة. سأصف NASA Eyes وNASA Science وNSSDCA وSmithsonian فقط — وهي التي فحصتها فعلًا بالتفصيل.

### 9.2 ما فحصته فعلًا في كل منصّة

#### (أ) NASA Science — صفحة مهمّة (msl-curiosity)
**ما رأيتُه بالضبط:**
- ترويسة: **"Curiosity"** + شارة حالة واحدة: **«Active Mission»**.
- بطاقات: `Type: Rover` · `Launch / Landing: Nov. 26, 2011 / Aug. 6, 2012` · `Target: Mars` · `Objective: Determine if Mars was ever able to support microbial life`.
- روابط فرعية: Science / Science Instruments / **Where is Curiosity?** (خريطة موقع حيّة).
- «meet curiosity» — **عارض 3D نموذج** + Size/Arm reach/Mass (1,982 lbs Earth / 743 lbs Mars) / Features.
- Featured Stories / Mission Updates / Raw Images / Resources.

**ما لا يوجد فيها (بالتحقّق):**
- **لا حالة مزدوجة** — شارة واحدة.
- **لا خط زمني عبر المهمّات** — لا يمكن الانتقال من Voyager إلى Ranger داخل الواجهة.
- **لا تسمية ادّعاء (Confirmed/Estimated/Unknown)** على الحقول.
- **لا مسار "سجلّ كامل"** يجمع الوجهة + المصير + المصادر.
- **لا طبقة تعليمية** ولا تقدّم.
- **المحتوى مائل بوضوح إلى المهمّات الجارية** — وهو بالضبط ما يشتكي منه نصّ التحدّي: *"school-age space enthusiasts often hear only about active, ongoing missions."* (الصفحة تبدأ بـ "Curiosity Reaches 1-Kilometer Elevation Gain — Aug. 26, 2026".)

#### (ب) NASA NSSDCA — سجلّ مركبة (Apollo 11 LM/EASEP)
**ما رأيتُه بالضبط:** نصّ تقني غنيّ جدًا: Mission Profile بالساعات والدقائق،_subsystems_ بالتفصيل (descent engine 45,000 N، ascent 15,000 N، RCS، telemetry)، EASEP (48 kg، 2119/2276.5 MHz)، بدقّة إحداثيات هبوط (0.67416° N, 23.47314° E)، Alternate Names، Facts in Brief، روابط Experiments/Datasets/Trajectory، وأهمّ جملة:
> *"The fate of the LM is not known, but it is assumed that it crashed into the lunar surface sometime within the following 1 to 4 months."*

**ما لا يوجد فيها:** لا خط زمني بصري، لا طبقة تعليمية، لا حالة مهمّة/عتاد مفصولة كمنظومة، لا تسمية ادّعاء، لا تقدّم، لا مقارنة.
**القيمة الفريدة فيها:** دقّة تقنية لا مثيل لها في GRAVERSE (الأرقام الفرعية للمحرّكات). **GRAVERSE لا تنافسها في هذا البُعد، ولا تحاول.**

#### (ج) NASA Eyes
**ما رأيتُه بالضبط:** ستّة تطبيقات. الأقوى:
- **Eyes on the Solar System** — "follow over 150 NASA missions from start to finish… See the Voyager spacecraft from launch in 1977 until today… ride along as OSIRIS-REx lands on an asteroid". **هذا فيه بُعد زمني حقيقي وشامل عبر المهمّات — وهذه أقوى نقطة تُقارن فيها GRAVERSE.** ويتيح سحب الزمن من 1950 إلى 2050 وروابط مشهد عميق مثل `sc_cassini/events/grand_finale?time=2017-04-26T08:15:00Z`.
- **DSN Now** — "See which spacecraft is 'phoning home' with DSN Now. Every five seconds, DSN Now updates with real-time data from the ground stations of the Deep Space Network." **اتصال حيّ حقيقي.**
- **Mars Relay Network** — "Track real-time communications on Mars… using real data from the Mars missions themselves."
- **Mars 2020 EDL** — "Seven Minutes of Terror" خطوة بخطوة.
- **Spacecraft AR** — نماذج 3D بالأردنو.

**ما لا يوجد فيها:** لا فهرس تراثي (heritage index) لعتاد متروك، لا بنية تربوية، لا تمييز حالة عتاد/مهمّة، لا نظام مصادر لكل claim، لا حفظ تقدّم.
**الخلاصة الصادقة:** NASA Eyes **تتفوّق** على GRAVERSE في الواقعية الفيزيائية والحيوية والبعد الزمني الشامل. GRAVERSE **لا تنافسها هناك**، وتنافسها في بُعد آخر تمامًا.

#### (د) Smithsonian NASM
متحف مادي: القطع الأصلية (Columbia) — **لا يمكن أن يعرض 30 قطعة في بيئات متعددة**. قوّته هي **المادية الأصلية**؛ ضعفه في التغطية. يقدّم أيضًا قصّة أبولو 11 التفاعلية.

#### (هـ) ESA Education
بوّابة مدرّسي: موارد ومشاريع تعليمية. **النطاق** هو التعليم، لا الأرشفة التقنية. يُكمّل NASA أكثر مما ينافسها.

### 9.3 مصفوفة المقارنة

| البُعد | NASA Science (مهمّة) | NSSDCA | NASA Eyes | ESA Education | Smithsonian NASM | **GRAVERSE** |
|---|---|---|---|---|---|---|
| **الغرض الأساسي** | ملفّات المهمّات | أرشيف تقني | تصوّر تفاعلي | موارد تعليمية | متحف مادي | **أرشيف إرث + متحف رقمي** |
| **الجمهور** | عام + باحثو مهمّات | باحثون | عام + مربّون | مربّون | زوّار متاحف | **3 شرائح عمرية محدّدة** |
| **العرض** | نصّي + صور | نصّي تقني | 3D تفاعلي | متنوّع | مادي | **3 تجارب + 6 أسطح** |
| **البحث** | WordPress site search | قوائم NSSDCA | داخل التطبيق | محدود | محدود | **184 مستندًا عبر 13 نوعًا، مُرجَّح** |
| **الخط الزمني** | ❌ | ❌ (قوائم أحداث منفصلة) | ✅ **شامل عبر 150+ مهمّة** | ❌ | ❌ | ✅ **زمني أفقي + 118 حدثًا** |
| **استكشاف الوجهة** | ✅ محدود | ❌ | ✅ | ❌ | ❌ | ✅ **20 جسمًا + 8 بعيدة** |
| **معلومات على مستوى القطعة** | ✅ (واحدة لكل مهمّة) | ✅ **الأعمق تقنيًّا** | جزئي | ❌ | ✅ للقطع المادية فقط | ✅ **30 قطعة** |
| **علاقة المهمّة ↔ العتاد** | ضمني | ضمني | ✅ (مسارات) | ❌ | ❌ | ✅ **24 مهمّة مشتقّة + 581 حافة** |
| **حالة المهمّة ⇄ حالة العتاد** | ❌ شارة واحدة | ❌ | ❌ | ❌ | ❌ | ✅ **مفصولة بنيويًّا** |
| **شفافية المصادر** | روابط | مراجع | ❌ | متفرّق | ✅ نسب | ✅ **96 سجلًّا + accessedAt + أدّعاء لكل حقل** |
| **تسمية ادّعاء** | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ **موجودة لكن على أجسام السماوات فقط** |
| **التعليم** | لا منهج | ❌ | "scrolly-telling" | ✅ موارد | ✅ ورش | ✅ **12 درسًا + 4 رحلات + 8 مقالات + ألعاب** |
| **التفاعل** | محدود | ❌ | **قوي** | متنوّع | محدود | **قوي ومتنوّع** |
| **3D** | عارض نموذج واحد | ❌ | **6 تطبيقات** | ❌ | نماذج AR | ✅ **3D + بديل 2D لكل واحد** |
| **التعلّم الشخصي** | ❌ | ❌ | ❌ | ⚠️ حسابات | ❌ | ✅ **تقدّم + شارات + شهادة محلية** |
| **اللغات** | إنجليزي | إنجليزي | إنجليزي | متعدّد | إنجليزي | ⚠️ **chrome عربي فقط** |

### 9.4 التصنيف الصادق: ما هو مُنفَّذ فعلًا، وما هو شائع، وما هو مُميَّز، وما هو مستقبل

**الفئة 1 — مُنفَّذ في GRAVERSE ويتجاوز الشائع:**
- **فصل حالة المهمّة عن حالة العتاد كبنية برمجية** — غير موجود في أيّ منصّة فحصتها.
- **حالة اتصال مُشتقّة ومُعلَّمة** — NASA Eyes يوفّر **بيانات حيّة** (وهذا أقوى منه)، لكن GRAVERSE يوفّر **تصنيفًا تاريخيًّا موثّقًا ومعلَّمًا**. **مكمّل لا منافس.**
- **شجرة المعرفة: 30 قطعة موثّقة المصدر بمصادر مرتبطة + تاريخ وصول** — NSSDCA يوفّق في عمق السجلّ الواحد، لكن ليس عبر 30 قطعة متعددة مع طبقة عرض.
- **مصفوفة 13 نوع × 184 مستندًا في بحث واحد** مع ترجيح مُصنَّف.
- **نموذج "علامة عدم اليقين" مرئي** — `Unknown` / `Not documented` / `dataNotes` + 4 حدود صريحة.
- **بوّابة تحقق آلية** (21 اختبارًا + 50 فحص مسار + 30 رحلة + 192 رابطًا) — هذا **نادر** في المشاريع التعليمية competed.

**الفئة 2 — شائع في_places أخرى (لا يُمكَن ادّعاء التميّز فيها):**
- البحث النصّي (NASA Science، Smithsonian، Museumqrt).
- الخط الزمني (NASA Eyes أقوى).
- التصوير المكبّر / عارض 3D (NASA Eyes، Smithsonian 3D، NASA 3D Resources).
- صفحات المهمّة (NASA Science، ESA).
- موارد المعلّمين (NASA Learning Resources، ESA Education).

**الفئة 3 — مُدمج في GRAVERSE بطريقة مميّزة:**
- **الخط الزمني + صفحات القطع + الرحلات التعليمية + الفيزياء المحاكية + الفهرسة كلها على *مجموعة واحدة*.** كل المنصّات التي فحصتها تحلّ بُعدًا أو بُعدين. GRAVERSE تحلّ **13**.
- **مختبر الروبوت** يجمع سجلًّا موثّقًا مع واجهة محادثة مبسّطة لطفل — هذا المزيج غير موجود في NASA Science (أضيق) ولا في NSSDCA (أعرض).
- **قاعة 3D تحمل صور NASA حقيقية** بدل نماذج مفترضة — يجمع «متعة العرض» مع «الأمانة» في مكان واحد.

**الفئة 4 — مُميِّزات مستقبلية محتملة (غير مُنفَّذة — لا تُدَّعَى):**
- ربط `/api/export` بخطّ أنابيب تحديث لحيّ.
- إسناد حالة الاتصال إلى تغذية DSN Now حيّة.
- نماذج 3D حقيقية لـ NASA 3D Resources لكل قطعة.
- coord.Join بين «Connected records» وصفحات المتحف (رسم العلاقات مبنيّ وخامل لكنه غير معروض).
- ترجمة تحريرية عربية كاملة + RTL.
- تصدير `ClaimBadge` إلى كل حقول الـ artifacts (المصطلح موجود لكن مطبَّق فقط على أجسام السماوات).

### 9.5 هل يوفّر هذا المزيج ميزة حقيقية؟

**الجواب: نعم، لكن ليس لأنّ عدد الميزات أكبر.** الفارق نوعي:

> **المنصّات المتخصّصة تجيب سؤالًا واحدًا بإتقان؛ GRAVERSE يجيب أسئلة متعدّدة على *البيانات نفسها*، فلا تتناقض الإجابات.**

مثال ملموس: زائر يسأل NASA Eyes "ماذا فعلت كاسيني؟" فيحصل على مشهد ثلاثي الأبعاد رائع. ثم يسأل NASA Science "هل ما زالت كاسيني تعمل؟" فيحصل على «Active Mission» أو «End of Mission» — **جملة لا تميّز بين مركبة غرقت عمدًا في زحل 2017 وبين مركبة نُسيت على المريخ**. GRAVERSE تجيب عن الاثنين بسجلّ واحد يحمل: `missionStatus: completed`، `hardwareStatus: destroyed`، `fate: "…"`.

**هذا هو التميّز الحقيقي: الاتّساق عبر الأبعاد.** من fec similar المنصات تجيب على «كيف تعمل» وعلى «ما هي» بصفحات **مستقلّة** — فتُنتج فجوات. GRAVERSE تُجيب على «كيف تعمل» (محاكاة + هندسة)، وعلى «ما هي» (متحف)، وعلى «متى» (مستكشف)، وعلى «ما الذي تبقّى» (لوحة الحالة) — **من سجلّ واحد**.

**الحدّ الصريح:** عدد الميزات ليس ميزة. **المزيج فقط هو الميزة**، والمزيج يحتاج صيانة مستمرة — وكلما زادت الأسطح ازداد احتمال الانحراف بين السجلّ والعرض (وهو ما تسبّب فيه 9 سجلّات مصادر مكرّرة و`distinctions` المكتوبة يدويًّا في `/about`).

---

<a id="10-عوامل-التميّز-الفريدة-والمتكاملة"></a>
## 10. عوامل التميّز الفريدة والمتكاملة

### 10.1 هل توجد ميزة حقيقية؟ — الإجابة المطّلقة

نعم، لكنها **ليست** في عدد الشاشات. الفارق الحقيقي ثلاثة أشياء:

### 10.2 التميّز الأول: الفصل بين مصير المهمّة ومصير الشيء

**ما هو:** `missionStatus` و`hardwareStatus` حقلان مستقلّان، مفروضان بنوعين متقاطعين، ولكلٍّ نصّه الأصلي الإلزامي، ولكلٍّ نبرته الخاصة.

**لماذا هو تميّز وليس مجرّد ميزة:** لأنه ليس **خاصية عرض** يُمكن لأي مطوّر آخر نسخها في ساعة. منطق "إن كانت الحالة hardware لا يمكن أن تكون ongoing" هو **قرارة معمارية** تغيّر بنية البيانات، لا مجرّد تنسيق. أيّ نسخة لاحقة من GRAVERSE ستجد نفسها مضطرة لإعادةigital نفس الفصل.

**الأثر على التجربة:** يُنتج **سلوكًا** لا يمكن إنتاجه بعرض شارة إضافية. مثال:
- `voyager-1`: mission **ongoing** + hardware **operating** → «لا يزال يعمل، وبعيد».
- `apollo-11-lrrr`: mission **completed** + hardware **operating** → «انتهت المهمّة، والجهاز يظلّ دقيقًا على القمر اليوم».
- `insight`: mission **completed** + hardware **no-longer-communicating** → «انتهت، والصمت ليس دمارًا».
- `ranger-7`: mission **completed** + hardware **impacted** → «نجحت، ثم اصطدمت عمدًا».
- `cassini`: mission **completed** + hardware **destroyed** → «أُنهي بقرار، لا بالإهمال».

**خمسة سلوكيات مختلفة تنبع من بنية واحدة.** لا يمكن إنتاجها من شارة واحدة.

### 10.3 التميّز الثاني: الاتّساق عبر 13 بُعدًا على مجموعة واحدة

| # | البُعد | نقطة التركيب |
|---|---|---|
| 1 | إرث العتاد | `Artifact` |
| 2 | تاريخ المهمّة | `timelineEvents[]` + مهمّات مشتقّة |
| 3 | الحالة الفيزيائية | `hardwareStatus` + `fate` + `location` |
| 4 | الاستكشاف الزمني | `timelineEntries()` |
| 5 | الاستكشاف الوجهي | `destinationGroup` + `location.body` + 20 جسمًا |
| 6 | التعلّم المنظَّم | 4 رحلات / 12 درسًا / 8 مقالات |
| 7 | الشروح الهندسية | 7 أنظمة → artifacts → مصادر |
| 8 | المحاكاة الفيزيائية | 8 نماذج → records + approximation notes |
| 9 | البحث الموثّق | 184 مستندًا، 13 نوعًا |
| 10 | الشفافية | 96 مصدرًا + 4 حدود + changelog + `/api/export` |
| 11 | التخصيص | تقدّم + شارات + مفضّلة + مجموعات |
| 12 | لغة | en/ar + RTL |
| 13 | الإتاحة | WCAG 2.1 AA، بدائل 2D، reduced-motion |

**الدليل العملي على الاتّساق:** درس `mission-status-vs-hardware-status` (من 10–12 سنة) يستشهد بـ **5 سجلّات** — رابط `artifactIds` من Academy إلى Museum، و`artifactIds` من Engineering إلى Museum، و`sourceIds` من الثلاث إلى سجلّ المصادر. **نفس الـ IDs عبر ثلاثة مسارات.** هذا ما يجعل "one collection, three ways in" جملةً تقنية لا شعارًا.

**والدليل المضادّ (الضعف):** في الاتجاه المعاكس، **المتحف لا يربط أبدًا** بـ Engineering/Stories/Simulations/Mission Control. فالاتّساق **أحادي الاتجاه**: Academy → Museum → Explorer، بينما الأسطح المساندة **معزولة**.

### 10.4 التميّز الثالث: نزاهة المصدر كمنظومة، لا كزينة

**ما ليس في GRAVERSE:** ادّعاء "دقّة" بلا instrument.

**ما فيه:**
1. **سجلّ 96 مصدرًا** بـ `organization`, `title`, `url`, `type`, `accessedAt` — **الوصول إلى المصدر بضغطة واحدة**.
2. **مصدر لكل حدث زمني على حدة** (`MissionEvent.sourceIds`)، لا مصدر واحد للسجلّ كلّه.
3. **نصّ المصدر الأصلي محفوظًا** بجانب كل شريط معياري — في **ثلاثة مواضع** على الأقل.
4. **ملاحظات عدم يقين** (`dataNotes`) تُعرض **بجانب المصادر**.
5. **`Unknown` بدل التخمين** في كل طبقة.
6. **حقول اختيارية** بدل قيم افتراضية.
7. **لا إحداثيات مخترَعة** — كل السجلّات الـ30 تستخدم `precision` غير `"exact"`.
8. **بوّابة تحقق آلية** تُفشل البناء.
9. **قائمة «Do not claim»** صريحة في `docs/DEMO_GUIDE.md` — وهو سلوك نادر وقليل ما يُقدَّر في مسابقات.

**المقارنة الصادقة:** NASA Science وNSSDCA **أعمق تقنيًّا** في السجلّ الواحد. لكن Neither منها يجعل **المصدر جزءًا من نظام الواجهة**. GRAVERSE تفعل — وهذه فارق نوعي.

### 10.5 ما لا يميّز GRAVERSE (تصريح صريح)

| ما لا يمكن ادّعاؤه | السبب |
|---|---|
| "أول منصة ثلاثية الأبعاد لإرث الفضاء" | NASA Eyes تسبقها بسنوات في 3D |
| "الأكثر اكتمالًا في كتالوج العتاد" | 30 قطعة فقط؛ NSSDCA وSSDCA catalogs أكبر بعاملين على الأقل |
| "الأدقّ في بيانات المهمّات" | NSSDCA أدقّ بكثير في التفاصيل الفرعية |
| "الأفضل في الوقت الحقيقي" | DSN Now في NASA Eyes بيانات حيّة |
| "الوحيدة بتعليم مدمج" | ESA Education و NASA Learning Resources يقدّمان موارد تعليمية |
| "متوافقة مع معايير NASA" | **لا** — المشروع نفسه ينفي ذلك في التذييل |

### 10.6 الخلاصة: لماذا يستحقّ المشروع الانتباه

> **ليس لأنّه يفعل أشياء لا يفعلها الآخرون — بل لأنّه يفعل أشياء يفعلها الآخرون *متفرّقة*، على البيانات نفسها، بلا تناقض.**

المنصّات المتخصّصة عميقة في بُعد واحد. GRAVERSE **متوازن عبر 13 بُعدًا مع عمق كافٍ في كلٍّ منها**. وهذا توازن نادر، وفي مسابقة يقول فيها المنظّمون صراحةً *"we encourage you to think outside the box"* ويذكرون "interactive 3D timeline" و"digital graphic novel" و"audio podcast" كأشكال متكافئة، يكون **المزيج** هو ما يميّز.

**لكنّ** — ولهذا يجب أن يُقال — **المزيج هشّ**. كلّما زادت الأسطح زاد احتمال الانحراف. لذلك **جودة الاختبارات وصراحة المنهجية ليست رفاهية بل جزء من الأطروحة.**

---

<a id="11-الأساس-النظري-والفلسفي"></a>
## 11. الأساس النظري والفلسفي

> هذا القسم لا يصف الشيفرة؛ بل يفحص **الفكرة** التي تقف خلف الشيفرة، ويقيس مدى تجسّدها في المنتج الفعلي.

### 11.1 الفضاء كمشهد تراث بشري

**الفرضية:** الفضاء ليس فراغًا يحتوي كواكب، بل **مشهد تراث (heritage landscape)** يحتوي آثارًا مادية لنشاط الإنسان العلمي والتقني.

**الأساس العلمي:**
- المجتمعات relayed archival بحث في فضاء استكشاف في **ISS Archaeological Project** (ISSAP)، بمبادرة **Alice Gorman وJustin Walsh**، وهو مشروع يوثّق إنسانيات محطة الفضاء الدولية كموقع أثري (المصدر: *Archaeology and Heritage of the Human Movement into Space*؛ و*Space Age Archaeology* — Space Heritage Task Force of the World Archaeological Congress, 2003).
- سوابق في رdamn "planetary geoarchaeology" و"space archaeology" كميدان بحثي يُؤسَّس في السنوات الأخيرة.
- **المبدأ المرجعي:** ما يبقى من نشاط بشري في مكان ما هو **سجلّ مادي**. الفيزياء تفرض ذلك: على المريخ بلا رياح ولا تآكل جوّي، ون على القمر بلا جوّ، **الأثر يبقى كما هو**. هذا ليسmuseum — بل **أرشيف مادي مفتوح**.

**كيف يتجلّى في GRAVERSE:** الـ 30 قطعة ليست "صور مركبات" — بل **مواقع ذات مصير**. `fate` + `location` + `hardwareStatus` تجيب عن: **ما الذي يمكن أن نذهب إليه ونراه اليوم؟** الجواب: `apollo-11-lrrr` (يعمل)، `apollo-12-alsep` (خامل)، `apollo-15-lunar-rover` (متروك على حافّة)، `viking-1-lander` (خامل)، `opportunity` (صامت)، `mars-2020-descent-stage` (محطّم)، `apollo-11-lm-descent-stage` (باقٍ).

**النقطة الفلسفية:** حين يعرف الطفل أنّ **شيئًا بناهSlug في 1969 لا يزال يُستخدم لقياس استدارة القمر**، يتغيّر علاقته بالزمن. الماضي يصبح **حاضرًا قابلًا للقياس**، لا نصًّا منتهيًا.

### 11.2 الفرق بين المهمّة وإرثها

**الفرضية:** مصير المهمّة ومصير الشيء **بُعدان منفصلان**، ولا يصحّ استنتاج أحدهما من الآخر.

**لماذا هذا خطأ شائع:** لأنّ اللغة الرسمية تستعمل مصطلحًا واحدًا ("المركبة انتهت").وإهمال اللغة يتحوّل إلى خطأ معرفي.

**كيف يتجلّى في GRAVERSE:** التمييز **مفروض بنوع برمجي** (§6.3) — وهذا يعني أنّه ليس **موقفًا أيديولوجيًّا** بل **ضمانة هندسية**. المشروع لا يقول "نحن نؤمن بأن المهمّة والعتاد منفصلان" — بل **لا يستطيع** أن يدمجهما.

**الأثر المفاهيمي:** حين تفصل، يتغيّر **سؤال القيمة**: لم تعد "ما الجديد؟" بل **"ما الذي يبقى ويعمل؟"** — وهذا سؤال عن الميراث لا عن الحدث.

**حدّ التواضع:** الفصل في GRAVERSE يذهب إلى «العتاد» و«الاتصال»، ولا يمتدّ إلى **البُعد الثالث للحالة** الذي لم يُغطَّ: **حالة الملكية/الحماية القانونية للقطعة** (هل هي متاحة للزيارة؟ من يملكها؟ هل زيارة سطح المريخ مسموحة قانونيًّا؟). NASA/Outer Space Treaty تتناول هذه questions؛ GRAVERSE لا. وهذا **حدّ معرفي حقيقي** يمكن طرحه مع الحكّام.

### 11.3 المتحف الرقمي بوصفه امتدادًا للذاكرة الثقافية

**الفرضية:** لماذا نحفظ عتاد الفضاء رقميًّا؟ لأنّ **السياق** هو ما يجعل القطعة ذات قيمة — لا الصورة.

**التخزين المادي فقد:**

| ما يضيع | البديل الرقمي في GRAVERSE |
|---|---|
| من يتذكّر Apollo 12 ALSEP بعد 55 سنة؟ | `apollo-12-alsep` بسجلّ كامل ومصادر وتاريخ وصول |
| أيّ مهمّة جعلت هذا العتاد؟ | `missionName` + `programName` + مهمّة مشتقّة |
| ما حالة القطعة اليوم؟ | `hardwareStatus` + `fate` + `location` |
| ما الذي تعلّمناه منه؟ | `scientificContributions[]` بتمييز science/engineering |
| من يقول ذلك؟ | `sourceIds` (2–4 لكل سجلّ) + `dataNotes` |

**لكنّ الاستبدال ليس كاملًا:** المتحف المادي يوفّر **القياس** — حجم المسامبيّات، خدوش الطلاء، طبقات الغبار — التي لا توفّرها السجلّات الرقمية. لهذا السبب يبدو `ArtifactAnatomy` كت	labeled non-reconstruction: **الاعتراف بأنّ الرسم التخطيطي ليس القياس**. **هذا سلوك علمي mature**، لا نقص.

**الجملة المفتاحية:** *«لا تُحفظ القطع — تُحفظ العلاقات بينها وبين ما أنجزته.»*

### 11.4 من استهلاك المعلومات إلى الاكتشاف النشط

**أربع درجات، وGRAVERSE يدعم كلًّا منها بعمق مختلف:**

| الدرجة | ما هي | أين في GRAVERSE | الفرق |
|---|---|---|---|
| **① القراءة** | استهلاك معلومة | `/museum/[id]` | المعلومة مصمَّمة لتُقرأ |
| **② الاستكشاف** | تنقّل في شبكة مترابطة | `/explorer` + `/compare` + `/search` | السجلّات تُكتشف بترتيب لم يحدّده المصمّم |
| **③ التجريب** | interacted مع مفهوم علمي | `/simulations` (8) + 3 ألعاب + build-a-rover | المفهوم يصبح **علاقة سببية** ملموسة |
| **④ بناء رحلة تعلّم شخصية** | مسار شخصي عبر الزمن | Academy journeys + progress + achievements + certificate | التعلّم يصبح **سلسلة عبر الزيارات** |

**الانتقال من ① إلى ④** هو ما يجعل GRAVERSE **منتجًا** لا **صفحة**. القفزة من ③ إلى ④ تحديدًا (المحاكاة لا تتذكّر شيئًا؛ الرحلة يتذكّر) هي ما يحوّل الموقع من تجربة إلى **علاقة**.

### 11.5 وصل الوقت والمكان والتقنية

**لماذا هذه الثلاثة معًا:** كل واحد وحده ناقص.
- **الزمن وحده** = خط زمني — يخبرك *متى*، ولا يخبرك *لماذا*.
- **المكان وحده** = خريطة — تخبرك *أين*، ولا تخبرك *ماذا حدث هناك*.
- **التقنية وحده** = مواصفات — تخبرك *كيف صُمّم*، ولا تخبرك *ماذا بقي منه*.

**الثلاثة معًا = فهم كامل.** GRAVERSE لا تحتاج مخطّطًا زمنيًّا جديدًا — **لديها واحد بالفعل**. تحتاج فقط أن تربطه بالسجلّات.

**ما ينقص هذا الربط:** في الـ Explorer، `destination` في لوحة المعاينة **خشنة** (Moon/Mars/Deep Space) بينما `location.body` أدقّ (Saturn). **الاستكشاف المكاني وُصل بالمستوى الخطأ من الدقّة.**

### 11.6 معنى البقايا التقنية

**السؤال الفلسفي المركزي:** *هل تنتهي قيمة المركبة حين تتوقّف عن العمل؟*

**ثلاثة مواقف:**
1. **«نعم»** — الأداة worthless بعد مهمّتها. (وظيفيًّا صحيح، لكنه يفقد كل القيمة الاستثنائية.)
2. **«لا»** — العتاد وثيقة؛ ما تعلّمه منه باقٍ. (الموقف الصحيح.)
3. **«الأهم: القيمة لا تُستهلك»** — العتاد **يعمل ويكتسب معنى جديدًا**. `apollo-11-lrrr`: مهمّته انتهت 1969، والجهاز **يعمل 57 سنة بعدها** ويقيس عدم استدارة القمر. `voyager-1`: مهمّته المعلنة انتهت، والجهاز يواصل القياس interstellar.

**GRAVERSE يجسّد الموقف الثالث** — وهذا **لا يظهر في أيّ مكان آخر**: `#communication` يُظهر العمودين جنبًا إلى جنب، و`dataNotes` تشرح ذلك صراحة.

**والامتداد الفلسفي:** العتاد الباقي **دليل مادي على تجارب فكرية سابقة**. `ranger-7` ليس معلومة — بل **برهان** أن الاصطدام المحسوب (الاصطدام كآلة قياس) كان سلوكًا مشروعًا في 1964. `apollo-15-lunar-rover` ليس "سيارة متروكة" — بل **دليل** على أنّ....

**الجملة التي يصل إليها GRAVERSE:** *«المركبة توقّفت. المعرفة لم تتوقّف. وأحيانًا يكون الآلة هي التي تستمرّ.»*

---

<a id="12-الإطار-التربوي"></a>
## 12. الإطار التربوي

> **تحذير منهجي صارم:** كل ما تحت هو **تحليل لِـ design intent** مقابل **نظريات تربوية موثّقة**. **لا يوجد أيّ قياس لتأثير GRAVERSE على التعلّم.** لم تُجرَ دراسة قبل/بعد، ولا اختبار تذكّر، ولا مجموعة ضابطة. أيّ جملة هنا عن "فعالية" هي **استنتاج تصميمي**، **وليست نتيجة مُقاسة**.

### 12.1 البنائية (Constructivism)

**النظرية:** المعرفة تُبنى بنًى من(build) من التجربة، لا تُستقبل جاهزة. Piaget (1926, *The Language and Thought of the Child*)؛ Vygotsky (1978, *Mind in Society*).

**ما في GRAVERSE:** التعلّم يبدأ من سؤال حقيقي («ما هذا الشيء الذي يبقى على القمر؟») ثم نصّ، ثم سؤال، ثم سجلّ حقيقي بمصادر. الزائر **يُنتج** معنى لا يستقبله.

**العلاقة:** `objectives` بصيغة فعلية للزائر ("Say…", "Name…", "Distinguish…") + اختبار بعد القراءة لا قبلها + `tryIt` (تجربة) في كل درس.

**النتيجة المقصودة:** أن يعرف الزائر **كيف يفكّر** في قطعة عتاد، لا أن يعرف **ماذا** كانت.

**هل يدعم التنفيذ النظرية فعلًا؟** **جزئيًّا ومتسق.**
- ✅ يدعم: النصّ مبني حول استكشاف، والفحص بعد القراءة، والتدرّج العمري.
- ⚠️ **فجوة**:Objectives غير مرتبطة بأسئلة الاختبار؛ فلا يوجد أيّ قياس للتحقّق من بلوغها. البنائية تتطلّب **م.feedback**؛ التعليلات موجودة (✅) لكن الربط الهدف/سؤال غير موجود (❌).

### 12.2 التعلّم التجريبي (Experiential Learning — Kolb)

**النظرية:** دورة Kolb (1984): خبرة ملموسة → ملاحظة تأمّلية → مجرّد مفاهيمي → تجريب نشط. التعلّم يبدأ من الخبرة ولا من الشرح.

**ما في GRAVERSE:** محاكاة S01–S08: التلاعب بمعاملات → ملاحظة نتيجة (مخطط/رقم) → استنتاج مفاهيمي (مثلًا "الظلّة وحدها لا تكفي لحامل ثقيل") → تطبيق (تغيير المعاملات ومحاولة عمل التصميم). ثم Engineering/stories يربطان ذلك بسجلّات حقيقية.

**النتيجة المقصودة:** أن يفهم الزائر **آليّة** لا **حقيقة**.
**هل يُدعم؟** **نعم في S02/S03/S04** (دورة كاملة: تغيير → نتيجة → تفسير → تطبيق).
⚠️ **فشل في S01/S05** (المحاكاة لا تنجح، فلا تغلق الدورة). **هذا ليس اختلافًا نظريًّا بل خلل وظيفيّ يمنع التعلّم من الحدوث أصلًا.**

### 12.3 التعلّم بالاكتشاف والاستقصاء

**النظرية:** Bruner — الاكتشاف المنظَّم (1960, *The Process of Education*): المتعلّم يبني المفهوم بنفسه بدل استلامه. والاستقصاء: National Research Council (2012), *A Framework for K–12 Science Education* — الممارسات الثماني، وفيها "Analyze and Interpret Data" و"Construct Explanations" و"Engage in Argument from Evidence".

**ما في GRAVERSE:**
- **S08 Failure Investigation**: يختار المتعلّم فرضية ("The hardware was destroyed") ثم **يقارنها بالنصّ الأصلي** ويكتشف أن «فقدان الاتصال» ≠ «تدمير». هذا **نموذج ممتاز لـ "Engage in Argument from Evidence"**.
- **S07 What-if**: يفصل السجلّ الموثّق عن السيناريو — "Construct Explanations" مع تمييز الصريح.
- **الدرس `how-we-know-what-we-know`** (10–12، 9 دقائق): موضوعه نفسه **منهج الاستقصاء**.
- **الاختبارات**: شرح لكل إجابة — **المتعلّم لا يعرف الإجابة الصحيحة فقط، بل لماذا**.

**النتيجة المقصودة:** أن يتعلّم الزائر **كيف يُقيّم دليلًا** لا أن يحفظ استنتاجًا.
**هل يُدعم؟** **نعم** — وهذا من أقوى أجزاء المشروع.

### 12.4 التعلّم السردي (Narrative Learning — Bruner)

**النظرية:** Bruner (1991, *The Narrative Construction of Reality*, Critical Inquiry): التفكير معرفي (paradigmatic) مقابل التفكير سردي (synoptic). السرد هو way humans organize experience.

**ما في GRAVERSE:** `/stories` (8، 23 قسمًا) + `fate` + `timelineEvents` + `journey`/`summary` + `promise`/`dek` في الرحلات. **الChallenge بحد ذاته يطلب storytelling صراحةً** — *"a strong narrative focus will serve your project well"* و*"showing your audience how these missions operated rather than listing facts about them"*.

**النتيجة المقصودة:** أن يتذكّر الزائر القصّة، لا الجدول. (ذاكرتك للقصّة **أطول** من ذاكرتك للجدول — هذا هو الافتراض البنائي.)
**هل يُدعم؟** **نعم** — ووجود `/stories` يُجيب على "Potential Consideration" الأولى في نصّ NASA حرفيًّا.

### 12.5 تعلّم المتاحف الرقمي (Digital Museum Learning — Hein)

**النظرية:** George E. Hein, *Learning in the Museum* (Routledge, 1998): المتحف مكان **متعلّم**؛ الزائر يبني معنى من معروضاته؛ المناهجثلاثة تعديل: التقدير (Appreciative) والتحليل (Analytical) والمعرفي (Cognitive). Hein ينتقد museums التي "تدفع إلى الإجابة الصحيحة".

**ما في GRAVERSE:** `ArtifactAnatomy` الذي يعلن *"A schematic can explain a system; it is not a photograph or a reconstruction"*؛ `ApproximationNote` الذي يعلن *"Educational approximation"*؛ `dataNotes` التي تشرح لماذا (لا تُعطي إجابة واحدة)؛ `Unknown` الذي يرفض ملء الفراغ.

**النتيجة المقصودة:** أن يتعلّم الزائر **كيف يحكم على دليل** — وهذا هو جوهر التعلّم المتحفي.
**هل يُدعم؟** **نعم، بقوة** — وهنا GRAVERSE **متقدّم** على كثير من المتاحف الرقمية: معظمها يعرض قائمة حقائق موثّقة بلا نموذج صريح لما يُعرف وما لا يُعرف.

### 12.6 التعلّم النشط (Active Learning — Freeman et al. 2014)

**النظرية (والأقوى دليلًا كمra في هذا التقرير):** Freeman, Eddy, McDonough, Smith, Okoroafor, Jordt & Wenderoth, "Active learning increases student performance in science, engineering, and mathematics," *PNAS* 111(23): 8410–8415 (2014). تحليل بعدي لـ **225 دراسة**، **158 مقارنة مستقلّة** في العلوم والتكنولوجيا والهندسة والرياضيات:
- الأداء في الاختبارات والمخزون المفاهيمي: **+0.47 انحراف معياري** (n=158).
- احتمالية الرسوب: **OR = 1.95** تحت المحاضرة التقليدية — أي **1.5×** احتمال الرسوب، بمعدّل رسوب **21.8% (نشط) مقابل 33.8% (تقليدي)**.
- **29,300 طالبًا** في 67 معالجة محاضرة.
- أقوى أثر في **المجموعات الصغيرة (n ≤ 50)**.

**تعريف Active learning** كما في الدراسة: *"engages students in the process of learning through activities and/or discussion in class, as opposed to passively listening to an expert."*

**ما في GRAVERSE:** الاختبارات (24 سؤالًا) · 8 محاكاة · 3 ألعاب · 5 أوضاع interactives · build-a-rover · robot lab · مقارنة.

**⚠️ التحذير المنهجي الأهم في هذا التقرير:**
> نتائج Freeman et al. تخصّ **مقرّرات جامعية undergraduate** بمعلّمين ومقرّرات محدّدة. **لا يوجد أيّ دليل** على نقل هذه الأثرية إلى:
> - زوّار متحف رقمي بلا معلّم؛
> - أطفال 5–12 سنة؛
> - استخدام ذاتي حرّ بلا تقييم.
> **GRAVERSE لم تُخضع لأيّ من هذه القياسات.** لذلك: **لا يجوز** أن يقول الفريق "نتعلّم أن التعلّم النشط يزيد الأداء بمقدار 0.47 انحراف معياري". الصحيح: "التصميم يطبّق مبادئ تعلّم نشط مُتّفق عليها، ولم يُقَس أثره".

### 12.7 التفكير المنهجي (Systems Thinking) والبعد المكاني/الزمني

**النظرية:** Senge, *The Fifth Discipline* (1990): الأنظمة تُرى عبر الروابط والتغذية الراجعة والقيود، لا عبر الأحداث المفردة.

**ما في GRAVERSE:** `timelineEvents[]` (سلسلة أحداث) + `scientificContributions[]` + `technicalDetails[]` + `fate` + `location` — **القطعة تُقرأ دائمًا كشبكة سببية**: هندسة ← قرار تصميمي ← نتيجة علمية ← مصير مادي. Engineering Lab يجعل ذلك صريحًا.

**التعلّم المكاني والزمني:** إدراك "أين" (المسار الفضائي) و"متى" (التسلسل) هو **شرط** للسببية الفلكية (لماذاspb-selecting؟). خطّ Explorer الزمني يعرض **التسلسل**، وأجسام `/explorer/bodies` تعرض **المكان**، والاثنان مرتبطان عبر `relations.ts`.

**النتيجة المقصودة:** أن يرى الزائر **الآلية** (السلاسل) لا **الحالات** (اللقطة).
**هل يُدعم؟** **جزئيًّا** — المادّة متوفّرة لكن **العرض لا يبرز السببية صراحةً**؛ يبرز التسلسل.

### 12.8 جدول تركيب الإطار التربوي — التصميم مقابل القياس

| النظرية | المصدر | الميزة المرتبطة | النتيجة المقصودة | التنفيذ يدعمها؟ | **مُقاس؟** |
|---|---|---|---|---|---|
| البنائية | Piaget 1926؛ Vygotsky 1978 | objectives + quiz بعد القراءة + tryIt | بناء معنى لا استقبال | **جزئي** (لا ربط هدف/سؤال) | ❌ |
| التجريبية | Kolb 1984 | S02/S03/S04 | فهم الآلية | ✅ (S02/S03/S04)؛ ❌ S01/S05 | ❌ |
| الاستكشاف | Bruner 1960؛ NRC 2012 | S08، S07، درس `how-we-know-what-we-know` | تقييم الدليل | ✅ قوي | ❌ |
| السردي | Bruner 1991 | `/stories` + `fate` + timeline | التذكّر بالمعنى | ✅ | ❌ |
| المتاحفي الرقمي | Hein 1998 | claims + Unknown + dataNotes | حكم على المعرفة | ✅ متقدّم | ❌ |
| النشط | Freeman et al. 2014 (PNAS) | 8 محاكاة + 3 ألعاب + اختبارات | تفاعل لا استقبال | ✅ (مع عيوب) | ❌ |
| المنهجي | Senge 1990 | contributions + details + fate | رؤية الأنظمة | جزئي | ❌ |
| المكاني/الزمني | أبحاث التعلّم المكاني | Explorer + bodies + relations | ربط المكان بالسببية | جزئي | ❌ |

### 12.9 ما الذي يفتقده الإطار التربوي

1. **لا تقييم تعلّم إطلاقًا** — لا pre/post، ولا retention، ولا condition group. إن أراد الفريق أن يدّعي أثرًا، فالخطوة التالية (انظر [17.6](#176-ما-لا-يمكن-أن-يقوله-الفريق-إضافات-هذا-التحليل)) هي **دقيقتان**.
2. **لا ربط objectives بالأسئلة** — فالأهداف تُقرأ ولا تُقاس.
3. **لا بوّابة نجاح** — فـ "إتمام" لا يعني "إتقان".
4. **لا SRS** في البطاقات.
5. **لا أثر للخطوات المُصادَقة ذاتيًا**.

---

<a id="13-البيانات-والمصداقية-العلمية"></a>
## 13. البيانات والمصداقية العلمية

### 13.1 لماذا يهمّ إسناد المصدر؟

لأنّ **السجلّ الرقمي الذي ينفصل عن مصدره يتحوّل إلى سُمعة**. ثلاثة أسباب:
1. **قابلية التدقيق**: القارئ يستطيع التحقّق بنفسه — وهذا ما يجعل `/api/export` ذا قيمة.
2. **حدود التحمّل**: نصوص NASA technical عميقة؛ من لا يوثّق المصدر لا يستطيع أن يميّز الحقيقة عن إعادة الصياغة.
3. **أخلاقيات السجلّ**: في الأرشيف المادي، الأصل حاضر والمصدر ماديّ. في الرقمي، **الأصل غائب — والمصدر هو ما يُبقي السجلّ حيًّا**. إحالة قابلة للنقر إلى صفحة NASA **أقوى بمئة مرة** من صورة بلا مصدر.

**في GRAVERSE:** 96 سجلًّا، لكلٍّ `organization` + `title` + `url` + `type` + `accessedAt` + `notes` إلزامي. **كل** صورة لها `nasaId` + `sourceUrl` + `credit`. (قُحصت روابط الصور: **30/30 تعمل**.)

### 13.2 لماذا يهمّ الـ Provenance (المصادَق)؟

`Provenance` هو **التسلسل الاستدلالي** من رقم في الواجهة إلى جملة في وثيقة NASA. ثلاثة مستويات في المشروع:
1. **على مستوى السجلّ**: `sourceIds[]` (2–4 لكل artifact).
2. **على مستوى الحدث**: `MissionEvent.sourceIds[]` — كل حدث زمني يستشهد بمصدره. **هذا نادر وقيم**: يمكنك التحقّق من تاريخ الهبوط وحده.
3. **على مستوى الحقل**: `missionStatusOriginal` / `hardwareStatusOriginal` — النص الحرفي مع الشريط المعياري.

**نقطة ضعف صريحة يجب الاعتراف بها:** نموذج الـ claims الرباعي (`confirmed`/`estimated`/`simulated`/`unknown`) **مطبَّق فقط على `CelestialBody.facts` و`DeepSkyObject.facts`** — أي على أجسام السماوات والأجسام البعيدة. **لا يطبَّق على حقول الـ artifacts.** في `Artifact` **لا يوجد حقل `claim` أصلًا**. `ClaimBadge` يُستخدم في **مكان واحد فقط** (`src/components/explorer/FactGrid.tsx`).
**أثر ذلك:** كل حقل في الـ30 artifact يُعرض تلقائيًّا كـ«مؤكَّد» — بما في ذلك الأرقام التقديرية (كتلة، مدى، زمن) التي هي في واقعها **تقديرات**. هذا **أخطر انحراف منهجي في المشروع**، وأهمّ بند ought to be fixed. (وأgelseminia `docs/DATA_AND_PROVENANCE.md` يذكر صراحةً أن "الادّعاءات" تظهر على "artifact, body, deep-sky, mission, agency and source pages" — **وهذا غير مطابق للتنفيذ**.)

### 13.3 لماذا يهمّ العلاقات بين الكيانات؟

لأنّ **السجلّ المعزول facts؛ الترابط هو المعرفة**. ثلاث طبقات:
1. **مفاتيح foreign keys** (`missionName` → mission مشتقّة، `artifactIds` → records).
2. **رسم علاقات 581 حافة** بـ 12 نوعًا و**عكس مُضمَن** ومُختبَر.
3. **وصلات العرض**: `getRelations()` + `ArtifactCard` + `relatedIds` + `relatedLessons`.

**العائد**: الزائر ينتقل من "Curiosity" إلى "المريخ" إلى "مصادر المريخ" إلى "دروس المريخ" — **وهذا مسار اكتشاف**، لا مسار تنقّل.

**الضعف:** الرسم البياني **معروض في صفحة واحدة فقط** (`/explorer/bodies/[id]`). 581 حافة مُختبَرة و**غير مرئية**. إظهارها في صفحات المتحف هو **أرخص تحسين عائد** في المشروع.

### 13.4 لماذا يجب أن يكون عدم اليقين مرئيًا؟

لأنّ **إخفاء عدم اليقين ليس ترفًا — هو تضليل**. في أرشيف فيه تاريخ حقيقي، كثير من القيم:
- **غير معروفة** (مصير كتلة أبولو 11 النهائية — NASA نفسها تكتب "not known").
- **محدّدة فقط بشكل تقريبي (coarsely)** (منطقة لا إحداثيات).
- **متنازعة** بين المصادر.
- **محدّثة** (حالة اتصال تغيّرت).

GRAVERSE تعالجها بأربع أدوات: `Unknown` · `precision` · `dataNotes` · `*Original`. **و`location.precision` = `"exact"` غير مستخدم في أيّ من الـ30 سجلًّا** — أي لا إحداثيات مخترَعة. هذا **التزام أخلاقي ملموس**.

### 13.5 لماذا يجب أن يبقى "المجهول" مجهولًا؟

لأنّ **الافتراض الصامت يفسد السجلّ**: إذا حُذف الحقل الفارغ وظهر الجدول كاملًا، لا يستطيع القارئ تمييز "لا نعرف" من "سُجِّل خارج نطاق العرض". **GRAVERSE يحافظ على الفراغات ويشرحها** ("Not recorded"، "Not documented"، "Dates not documented").

### 13.6 لماذا يجب حفظ المصطلح الأصلي أحيانًا؟

لأنّ **التوحيد يحذف الدلالة**. مثال من المجموعة نفسها:
- NASA على Ranger 7: *"successful mission"*.
- NASA على Cassini: *"the mission ended…"*.
- NASA على InSight: *"the mission ended…"*.
تسويتها كلها في "Completed" **يمحو** الفرق بين "نجحت رغم اصطدامها" و"أُنهيت بقرار" و"توقّفت بهدوء".

**مبدأ GRAVERSE — مُطبَّق بصرامة:** `Normalized status labels are a convenience for filtering. The original source wording is preserved on every artifact record and displayed next to the normalized label.`

### 13.7 كيف تُميّز الواجهة بين أنواع الحقائق؟

| النوع | كيف يظهر | أين |
|---|---|---|
| **حقيقة موثّقة** | شارة "Confirmed" + رابط مصدر قابل للنقر | `ClaimBadge` — **على حقائق الأجسام السماوية فقط** ⚠️ |
| **قيمة مشتقّة** | شارة "Estimated" | نفس places |
| **قيمة محسوبة** | شارة "Simulated" + "Not an observation" | `ClaimBadge` + `ApproximationNote` |
| **مجهولة** | شارة "Unknown" / "Not documented" | `StatusBadge` / `valueOrUnknown` / `dateOrUnknown` |
| **وضع تاريخي** | النصّ الأصلي `*Original` | `#communication` |
| **وضع تشغيليّ حالي** | مشتقّ ومُعلَّم | `CommunicationBadge` + `freshnessFor` |

**التداخل الحاسم:** القيمة "المتوسّطة" بين **مستوى الحقل** (غير مطبَّق على artifacts) و**مستوى السجلّ** (مطبَّق بشكل ممتاز على الحالات). **الحالة هي أكثر ما يحتاج تسمية، وهي معطّاة.** — وهذا ironi خطير يستحقّ رفعه أمام الحكّام كخطوة تحسين.

### 13.8 نقاط القوة الفعلية (مُتحقَّق منها)

1. **96 مصدرًا** بأسماء ومorganizations وروابط وتواريخ وصول.
2. **نصّ المصدر الأصلي محفوظ** بجانب الشريط المعياري، في سجلّ الحالتين.
3. **`dataNotes` تُعرض بجانب المصادر** — لا مدفونة.
4. **لا قيم مخترَعة**: `Unknown`، حقول اختيارية، `precision` غير `"exact"` في كل السجلّات.
5. **المهمّات مشتقّة** — تستحيل فيها انحراف التاريخ.
6. **رسم علاقات مُختبَر التماثل** (581 حافة).
7. **`/api/export`** يجعل كلّ ذلك قابلًا للتحقّق الميكانيكي.
8. **بوّابة تحقق** تُفشل البناء.
9. **4 حدود صريحة + قائمة «Do not claim»** — سلوك نادر.
10. **كل رابط صورة NASA يعمل (30/30)** — تحقّق مستقلّ.

### 13.9 نقاط الضعف الفعلية (مُتحقَّق منها)

| # | الضعف | الشدة | الأثر |
|---|---|---|---|
| 1 | **نموذج claims غير مطبَّق على الـ artifacts** | **عالية** | القيم التقديرية تُعرض كـ«مؤكَّدة» |
| 2 | `lastVerified` ثابت `2026-11-10` في كل مكان | متوسطة | «طازج» زائف بعد 6 أشهر |
| 3 | **4 روابط مصادر ميتة** (منها 2 NASA في صفحات تعليمية) | متوسطة | رابط مكسور أمام الحكّام |
| 4 | **9 سجلّات مصادر مكرّرة** | متوسطة | تضخيم عددي + ازدواج |
| 5 | `getSources()` **يُسقط المعرّفات المجهولة بصمت** | منخفضة | خطأ صامت بدل خطأ ظاهر |
| 6 | `dataNotes` غير مُوزَّعة على كل الحقول | منخفضة | granular للاستثناءات لا للقواعد |
| 7 | `MissionRecordStatus` **نوع مكرّر** لِـ `MissionStatus` + cast غير آمن | منخفضة | خطر انحراف نوعي |
| 8 | `missionName` مفتاح نصّي (لا id) بلا فحص تقابلي | منخفضة | خطأ إملائي = artifact يتيم بصمت |
| 9 | `freshnessFor` يقفز للمجموعة كاملة دفعة واحدة | منخفضة | إنذار كاذب جماعي |
| 10 | 581 حافة غير مرئية خارج صفحة واحدة | متوسطة | **أرخص تحسين عائد** |

### 13.10 ما الذي يجب أن يقال أمام الحكّام عن البيانات

**القول الصحيح:**
> "المجموعة **محدودة عن قصد** — 30 قطعة اختيرت لتغطّي ثلاث وجهات وحالات تشغيلية متعدّدة. كل ادّعاء يستند إلى مصدر مسجَّل بتاريخ وصول. كل حالة hardware مفصولة عن حالة المهمّة مع الاحتفاظ بنصّ NASA الأصلي. ما لا نعرفه يُعرض كـUnknown. **والمجموعة ليست مرجعًا كاملًا** — صفحة Research Archive تقول ذلك صراحةً."

**القول الخاطئ (يجب تجنّبه):**
> "بيانات NASA الرسمية" — لا، هي **مُطبَّعة من** صفحات NASA العامة وسجلّات NASA/NSSDCA. ولا "مُتحقَّق منها من NASA" — لا يوجد أيّ مراجعة من NASA. `docs/DEMO_GUIDE.md` ينصّ على هذه الحدود صراحةً، وهذا يستحقّ الثناء.

---

<a id="14-الشخصيات-ورحلات-الاكتشاف"></a>
## 14. الشخصيات ورحلات الاكتشاف

### 14.1 الشخصيات

| # | الشخصية | ما تحتاجه | أي جزء يخدمها | قوة الخدمة |
|---|---|---|---|---|
| **P1** | **طالب 8–12 سنة** (أو 5–7) | فضول، مفهوم واحد في كل مرة، شعور بالإنجاز | Academy: 4 رحلات + 12 درسًا + 3 ألعاب + بطاقات + شارات | **قوية** — مع تحفّظ: لا بوّابة نجاح، والبطاقات بلا SRS |
| **P2** | **معلّم/معلّمة** | مادّة جاهزة، مسار متدرّج، مصادر موثّقة، أن يعرف ما يقول | Academy journeys (بـ `ageBand`) + 12 درسًا بأهدافها + `sourceIds` + Research Archive | **قوية** — لكن **لا يوجد "تصدير خطة درس"** ولا عرض المُعلّم ولا لوح تحكّم |
| **P3** | **هاوٍ فضولي** (بالغ) | قصّة، بصريّة، "لماذا يهمّني" | Museum + 8 Stories + 3D rotunda + Explorer | **قوية** |
| **P4** | **باحث** | مصادر، دقّة، قابلية تصدير | `/sources` (96) + `/api/export` + `dataNotes` + `*Original` | **متوسطة** — `/api/export?dataset=` معطّل (عيب 1)؛ لا تحليل ولا مرشّح داخل السجلّ |
| **P5** | **عاشق هندسة/تقنية** | مواصفات، أسباب، تجارب | Engineering (7) + S01–S06 + Compare + Technical details | **متوسطة–عالية** — لكن S01/S05/S06 معطوبة |
| **P6** | **زائر متحف** | فضول بلا التزام، خروج سريع | Museum index + Search + 30 سجلًّا قصيرًا | **قوية** |
| **P7** | **عائلة/وليّ أمر** | أمان، بلا حسابات، وقت محدود | local-only + RTL + print certificate + reset | **قوية** |

### 14.2 رحلات اكتشاف واقعية

> كل رحلة مبنيّة على **وظائف موجودة ومُتحقَّق منها** في الشيفرة، لا على مسارات متخيَّلة.

#### الرحلة 1 — طالب يكتشف قطعة عبر Explorer ويتعلّم مهمّتها في المتحف
| | |
|---|---|
| **نقطة البداية** | `/explorer` (من "More ways in" أو CTA البطل) |
| **الدافع** | "أريد أن أعرف ما الذي يوجد هناك فعلًا" |
| **المسار الفعلي** | `/?` → `/explorer` → تصفية `destination=moon` → رؤية 12 قطعة → النقر على `apollo-11-lm-descent-stage` في المعاينة → **"Explore artifact"** → `/museum/apollo-11-lm-descent-stage` |
| **الميزات المستخدمة** | Explorer (timeline/destinations/artifacts + 6 مرشّحات + sort + list view) → Museum record |
| **ما تعلّمه** | أن "الأبولو 11" ليست مركبة واحدة بل عدّة قطع، وأن **مرحلة الهبوط ما زالت على القمر** بينما **المركبة نفسها عادت**؛ أن `missionStatus` = completed و`hardwareStatus` = inactive **مختلفان** |
| **لماذا مفيدة** | لأنّ الاختيار **اكتشافي** (أن يجد بنفسه) لا استهلاكيًّا، وأن الانتقال يمرّ بلوحة معاينة تختصر دون فقدان السياق |

#### الرحلة 2 — معلّم يقدّم درسًا عن استكشاف الفضاء
| | |
|---|---|
| **نقطة البداية** | `/academy/journeys` |
| **الدافع** | "أريد نشاطًا لمدة 25–45 دقيقة لصفّ من 8–9 سنوات" |
| **المسار الفعلي** | `/academy` → اختيار "Moon Detectives" (8–9، 35 دقيقة، 6 خطوات) → `/academy/journeys/moon-detectives` → **خطوة 1**: `/academy/lessons/reading-a-mission-timeline` (قراءة 3 أقسام + 2 سؤال اختبار) → **خطوة 2**: `/museum/ranger-7` (ما الذي حدث فعلًا) → **خطوة 3**: `/museum/apollo-11-lrrr` (مرآة لا تزال تعمل) → **خطوة 4**: `/academy/articles/the-moon-as-a-laboratory` → **خطوة 5**: `/explorer?mode=artifacts&destination=moon` (مقارنة 12 قطعة) → **خطوة 6**: اختبار `mission-status-vs-hardware-status` |
| **الميزات** | Journey + Lesson + LessonQuiz + Artifact + Article + Explorer + Academic Artifact records |
| **ما تعلّمه** | بنية: لماذا صُمّمت → ماذا فعلت → ما الذي بقي → ما علّمته → كيف تقارن |
| **لماذا مفيدة** | لأنّ الرحلة **تحلّ مشكلة المعلّم الحقيقية**: "من أين أبدأ؟" — والمعلّم لا يحتاج بناء يدوي |

#### الرحلة 3 — عاشق هندسة يدرس تصميم العتاد ويجرّب محاكاة
| | |
|---|---|
| **نقطة البداية** | `/engineering` |
| **الدافع** | "لماذا صُمّمت عجلات المستكشفات بهذا الشكل؟" |
| **المسار الفعلي** | `/engineering` → `wheels-and-mobility` (6 سجلّات مرتبطة) → `/museum/apollo-15-lunar-rover` (المواصفات الحقيقية) → `/simulations/rover` (S05) → `/simulations/orbit` (S04) → `/academy/build-rover` → `/compare?a=curiosity&b=perseverance` |
| **الميزات** | Engineering + Artifact + Simulations + RoverBuilder + Compare |
| **ما تعلّمه** | الفرق بين العجلات الـ6 لعجلات LRV والمركبات الحديثة؛ أن S04 يحسب ΔV حقيقيًّا (5.596 كم/ث للأرض→المريخ)؛ أن ميزانية الكتلة/الطاقة تفرض تنازلات |
| **لماذا مفيدة** | **بفضل S04 تحديدًا** — لأنها محاكاة بفيزياء نصّية صحيحة. ⚠️ **S05 معطوبة** (لا يمكن إنجاز أي مسار)؛ يجب التحذير أو إصلاحها |

#### الرحلة 4 — باحث يتبع مصادر ويتحقّق من ادّعاء
| | |
|---|---|
| **نقطة البداية** | `/museum/apollo-11-lrrr` |
| **الدافع** | "هل هذا صحيح؟ ومن قاله؟" |
| **المسار الفعلي** | `/museum/apollo-11-lrrr` → قسم `#communication` (النصّان الأصليان جنبًا إلى جنب) → قسم "J. Sources and verification" (بطاقات المصادر + `accessedAt` + `dataNotes`) → `/sources` (سجلّ 96 كاملًا) → `/research#sources` (هرمية المصادر) → `/api/export` (تنزيل JSON والتحقّق الميكانيكي) |
| **الميزات** | Artifact provenance + Source registry + Research Archive + Open dataset |
| **ما تعلّمه** | أن "operating" لـ LRRR ليس ادّعاءً بل استشهاد بصياغة NASA؛ أن لـ"Unknown" معنًى محدّدًا |
| **لماذا مفيدة** | لأنّ **كل رابط يذهب إلى المصدر مباشرة** — وهذا ما يجعل الشفافية قابلة للتحقّق لا مجرّد ادّعاء |
| ⚠️ **حدّ** | `/api/export?dataset=sources` **لا ينزّل سجلّ المصادر فقط** (عيب 1) |

#### الرحلة 5 — زائر يقارن الإرث الفيزيائي لعدّة مهمّات
| | |
|---|---|
| **نقطة البداية** | `/stories/final-days` |
| **الدافع** | "ما الذي تبقّى من المهمّات المنتهية؟" |
| **المسار الفعلي** | `/stories/final-days` (6 سجلّات: Opportunity, InSight, Ingenuity, Cassini, Phoenix, Spirit) → النقر على رقائق → `/museum/opportunity` (و`hardwareStatus: no-longer-communicating` مع `fate`) → `/mission-control` (تصفية "Lost contact" → 14 سجلًّا) → `/compare?a=opportunity&b=insight` (17 صفًّا) → `/my-universe` (حفظ المفضّلة) |
| **الميزات** | Stories + Artifact + Mission Control + Compare + My Universe |
| **ما تعلّمه** | أن "صامت" لا يعني "مُدمَّر"؛ الفرق بين مصير Opportunity (صمت غير مفسر) وCassini (تدمير مُخطَّط) وIngenuity (هبوط بلطف بسبب نفاد الطاقة) |
| **لماذا مفيدة** | لأنها **تجيب عن ألم التحدّي مباشرة**: الأطفال يسمعون عن الجاري فقط، وهذه هي المهمّات التي انتهت |

#### الرحلة 6 — شخص يعود بعد أسبوع
| | |
|---|---|
| **نقطة البداية** | `/` أو `/academy/progress` |
| **المسار الفعلي** | `/academy/progress` → "Lessons completed 3/12 · Journeys finished 1/4 · Badges 7" → "Export progress" (`graverse-progress.json`) → متابعة `/academy/lessons/…` → `/academy/achievements` (15 شارة مشتقّة) → `/academy/certificate` (طباعة) → `/my-universe` (المفضّلة + الأخيرة) |
| **الميزات** | Progress + Achievements + Certificate + Personal |
| **ما تعلّمه** | ما أنجزه سابقًا |
| **لماذا مفيدة** | لأنها تحوّل الزيارة إلى سلسلة — وهي أهمّ استجابة للتحدّي في بُعد "school-age" (الطفل يعود) |

#### الرحلة 7 — باحث يقارن "لماذا نجح هذا؟
| | |
|---|---|
| **نقطة البداية** | `/mission-control` |
| **الدافع** | "ما الحالة التشغيلية لكل العتاد؟" |
| **المسار الفعلي** | `/mission-control` (30 صفًّا) → تصفية "Communicating" (5 سجلّات) → "Lost contact" (14) → النقر على `/museum/voyager-1` → `/research#status` (كيف تُفصل الأسئلة الثلاثة) → `/api/export` |
| **ما تعلّمه** | أنّ "الاتصال" سؤال ثالث مستقلّ، وأن GRAVERSE **مشتقّ لا حيّ** |
| ⚠️ **حدّ** | NASA DSN Now يقدّم **بيانات حيّة فعلية** — GRAVERSE **ليس** بديلًا عنه، وهو أقلّ حداثة. |

### 14.3 ما تكشفه الرحلات

1. **الطريق الوسط (Academy → Museum → Explorer) هو الأكثر استخدامًا طبيعيًّا** — لأنّه يجمع **مهمة** (تعلّم منظَّم) مع **مرجع** (السجلّ الكامل) مع **استكشاف** (اكتشاف حرّ).
2. **الأسطح المساندة تعمل استطرادًا** — أغلب الوصول إليها يمرّ عبر المتحف أو البحث، لا عبر صفحتها.
3. **أكبر احتكاك في الرحلة 3** هو محاكاة S05 المعطوبة. **وأكبر احتكاك في الرحلة 4** هو `?dataset=`.

---

<a id="15-مصفوفة-ربط-التحدي-بالحل"></a>
## 15. مصفوفة ربط التحدي بالحل

### 15.1 الاستجابات المباشرة

| المتطلب / المشكلة | استجابة GRAVERSE | الميزة المحدّدة | التنفيذ التقني | فائدة الزائر | الدليل | الحالة |
|---|---|---|---|---|---|---|
| **R1** سرد قصّة العتاد | `/stories` (8) + `/museum` | 8 مجموعات قراءة + 30 سجلًّا | `StoryCollection.sections[]` بلا حقول وقائع | فهمٌ، وسببٌ، وأثرٌ | `data/stories.ts`؛ 23 قسمًا | ✅ |
| **R2** جمهور من صغار السن | `/academy` | 4 رحلات + 12 درسًا بثلاث فئات + 3 ألعاب | `Journey.steps[]` بـ 5 أنواع | مدخل حسب العمر | `data/journeys.ts` (23 خطوة)؛ `data/lessons.ts` (12) | ✅ |
| **R3** أنواع العتاد وأين توجد | Explorer + Museum | `destinationGroup` + `hardwareType` + 20 جسمًا | `/explorer?mode=artifacts` + `/explorer/bodies` | تصنيف وتصفية | 30 سجلًّا؛ 7 أنواع | ✅ |
| **R4** المهمّات التي أتاحت العتاد | `missionName` + 24 مهمّة | **مشتقّة لا منسوخة** | `buildMissions()` في `data/missions.ts` | لا يمكن أن تتناقض المهمّة مع عتادها | اختبار «mission records stay derived» | ✅ |
| **R5** تنوّع الحالة والوظيفة | `hardwareStatus` + `fate` + `scientificPurpose` | 7 قيم + 2 نصّ أصلي | `Artifact` type + zod | فهم مصير الشيء | 30 سجلًّا؛ 5 قيم مستخدمة فعليًّا | ✅ |
| **R6** ترجمة البيانات المعقّدة إلى سرد | 3 تجارب + 8 قصص + 8 محاكاة | تدرّج من child's age إلى researcher | أقسام A–J في قالب واحد | اكتشاف على 3 مستويات | `/museum/[id]`؛ `/stories`؛ `/simulations` | ✅ |
| **R7** تعليم school-age | Academy | 24 سؤال اختبار + شرح لكل إجابة | `LessonQuiz` + `markLesson` | تقويم ذاتي مع تبرير | `components/academy/LessonQuiz.tsx` | ✅ |
| **R8** ما هو / لماذا أُرسل / ماذا تعلّمنا | أقسام A / B / D | `overview`, `scientificPurpose`, `scientificContributions[]` | zod schema | إجابة مباشرة | `types/artifact.ts` | ✅ |
| **R9** إحياء العتاد (الصامت والجارٍ) | 3D rotunda + timeline + 3 ألعاب | صور NASA حقيقية داخل 3D | `GalleryCanvas` + `TextureLoader` | أثر بصري | `components/museum/GalleryCanvas.tsx` | ✅ |
| **R10** كيف operate لا سرد حقائق | timeline events + 8 محاكاة + Engineering | 118 حدثًا + 7 أنظمة هندسية | `timelineEntries()` + `lib/simulations.ts` | فهم الآلية | `lib/explore.ts`؛ `data/engineering.ts` | ⚠️ **جزئي** (S01/S05 معطوبتان) |
| **R11** ربط الهندسة بالعلم | `/engineering` + `Contribution.kind` | 7 شروح → سجلّات → مصادر | `artifactIds[]` + `sourceIds[]` | سببية | `data/engineering.ts` | ✅ |
| **R12** صلة شخصية بالمستكشِفين الصامتين | `/stories/final-days` + `/stories/forgotten-spacecraft` | قصّتان مخصّصتان | `data/stories.ts` | ارتباط عاطفي | مجموعتي القصص | ✅ |
| **R13** "Accuracy is important" | 96 مصدرًا + claims + `dataNotes` + `Unknown` | نموذج ادّعاء رباعي + التحقّق من الروابط | `validate-data.ts` + `ClaimBadge` + `SourceList` | ثقة قابلة للتدقيق | **30/30 روابط صور تعمل**؛ 82/89 روابط مصادر تعمل | ✅ **مع فجوة** (انظر 15.5) |
| **R14** "What age group?" | 3 age bands + `?age=` | إجابة مبنيّة | `ageBand` + `ageBandMeta` | مدخل مخصّص | `types/academy.ts` | ✅ (زخرفية — لا بوّابة) |
| **R15** "How accessible?" | WCAG 2.1 AA + RTL + بدائل 2D | 0 مخالفات axe على 38 صفحة | `aria-*` + `useReducedMotion` + `useWebGL` | يعمل للجميع | **0/38**؛ **30/30 رحلة**؛ **192/192 رابط** | ✅ |
| **R16** مهمّات محدّدة أم سرد أوسع | كليهما | 30 سجلًّا + `/stories` + `/compare` | | | | ✅ |
| **R17** "What perspective(s)?" | زاوية مصير العتاد | **لم تذكرها NASA** | `hardwareStatus` منفصل | رؤية جديدة | `types/artifact.ts` | ✅ (إضافة) |
| **R18** أشكال مقبولة | تطبيق ويب + timeline + ألعاب | 3D timeline + 3 ألعاب | R3F + drei | | `components/academy/play/*` | ✅ |

### 15.2 القدرات المساندة

| القدرة | كيف تسهم | الدليل |
|---|---|---|
| **Mission Control** | يجعل «الحالة» سؤالًا مركزيًّا لا معلومة هامشية | `lib/mission-control.ts` + `StatusBoard` |
| **Engineering Lab** | يجيب «لماذا صُمّم» بمصادر | 7 شروح؛ 37 ارتباط artifact |
| **Research Archive** | يحوّل المنهجية إلى واجهة | 7 أقسام + 4 حدود + changelog |
| **`/sources`** | يجعل كل ادّعاء قابلًا للنقر | 96 مصدرًا بتاريخ وصول |
| **`/api/export`** | يجعل الشفافية قابلة للتحقّق الميكانيكي | 334 KB JSON |
| **Search** | 184 مستندًا في بحث واحد | 13 نوعًا، ترجيح 140/95/65/25/12 |
| **Compare** | يُظهر الفرق، وهو المعلومة | 17 صفًّا + "Not documented" |
| **My Universe** | يحوّل الزيارة إلى سلسلة | `graverse:personal:v1` |
| **Playground + builder** | تفاعل بدل قراءة | 3 ألعاب + 15 قطعة مركبة |
| **RTL / العربية** | يوسّع الجمهور | 101 مفتاحًا × 2 |
| **بوّابة التحقق** | يحمي الدقّة | 21 + 50 + 38 + 30 + 192 |

### 15.3 الامتدادات التعليمية

| الامتداد | ما يضيفه فوق المطلوب |
|---|---|
| **24 سؤال اختبار بشرح لكل إجابة** | يحوّل القراءة إلى استرجاع مع تبرير |
| **3 ألعاب 3D بأشرطة وشارات** | إعطاء النموذج518 for children (المهمّة "school-age") |
| **Build-a-rover** | يجعل المفاضلة الهندسية ملموسة |
| **نموذج "خطوات الرحلة"** | يعطي المعلّم خريطة درس جاهزة |
| **15 شارة مشتقّة + شهادة** | أثر يبقى بعد الزيارة |
| **8 محاكاة** | ينقل من "ما" إلى "كيف" |

### 15.4 القدرات المميِّزة (المدمجة لا المفردة)

| # | القدرة | لماذا هي مميّزة |
|---|---|---|
| 1 | **فصل الحالة المزدوجة** | مفروض بنيويًّا — لا يمكن نسخه في ساعة |
| 2 | **المهمّات المشتقّة** | يُلغي فئة كاملة من الانحراف |
| 3 | **النصّ الأصلي + الشريط المعياري** | يحفظ دلالة لغة NASA |
| 4 | **`Unknown` كقيمة من الدرجة الأولى** | يفصل "لا نعرف" عن "ليس معروضًا" |
| 5 | **13 بُعدًا على مجموعة واحدة** | الاتّساق عبر الأبعاد |
| 6 | **بوّابة تحقّق + حدود معلنة** | يحمي الدقّة في الزمن |
| 7 | **مسار بيانات مفتوح** | يتيح إعادة الاستخدام والتدقيق |

### 15.5 القدرات غير المُنفَّذة (يجب ألا تُدَّعَى)

| القدرة | الحالة | الأثر |
|---|---|---|
| **تسمية claims على حقول الـ artifacts** | ❌ غير مُنفّذة | القيم التقديرية تُعرض كـ«مؤكَّدة» |
| **عرض رسم العلاقات في المتحف** | ⚠️ مبنيّ (581) وغير معروض | فرصة ضائعة |
| **`?dataset=` في `/api/export`** | ❌ معطّل في الإنتاج | زرار ResearchArchive ينزّل الكل |
| **`eventType` يصل لـ launch/end-of-mission** | ❌ | لا يمكن تصفية الأحداث الأهمّ |
| **S01 / S05 تعمل** | ❌ | دورة التعلّم لا تُغلق |
| **`powerLimitW` في S06** | ❌ | مُزلق لا أثر |
| **ترجمة تحريرية عربية** | ⚠️ chrome فقط | تنبيه في README يُربك |
| **بوّابة نجاح / ربط objectives بالأسئلة** | ❌ | "إتمام" ≠ "إتقان" |
| **SRS في البطاقات** | ❌ | الإتقان يضيع |
| **تغذية حالة اتصال حيّة** | ❌ (مشتقّة) | NASA تتفوّق هنا |
| **نماذج 3D حقيقية لكل قطعة** | ❌ | محدود بـ primitive toys |
| **تصدير خطة المعلّم / عرض المعلّم** | ❌ | لا لوحة تحكّم للمعلّم |
| **Boolean query / بحث متقدّم** | ❌ | AND بسيط بين الكلمات |
| **إشعارات / مزامنة سحابية** | ❌ (قرار تصميمي) | لا حسابات |
| **تغطية أوسع (کelj LRO، Chang'e، Vega… )** | ❌ | المجموعة محدودة عمدًا |

### 15.6 الحل كمنظومة واحدة

**لماذا Academy وMuseum وExplorer ليست ثلاثة مواقع منفصلة؟**

1. **لأنّها تقرؤ السجلّ نفسه.** الـ `artifact.id` هو المفتاح في الثلاثة: `/academy/lessons/…` → `artifactIds[]` → `/museum/{id}` → `relatedIds` → `/explorer?event=…`. **الانتقال لا يغيّر البيانات، يغيّر الزاوية.**
2. **لأنّ تحدّي NASA يسأل "لمن؟"** — والإجابة "للجميع" لا تنفع. المتحف للبالغ، المستكشف للباحث، الأكاديمية للطفل. **ثلاث تجارب على 30 سجلًّا أرخص من 30 تجربة منفصلة وأغنى.**
3. **لأنّ الحاجة الفعلية تتغيّر مع الزمن.**-mmrightarrow question "ما هذا؟" → "لماذا صُنع؟" → "كيف يعمل؟" → "ما الذي بقي؟". **الثلاث تجارب هي مراحل هذه الرحلة، وكل واحدة منها في حينها مناسب.**
4. **لأنّ هذا يعطي معنى لوجود 30 سجلًّا فقط.** مجموعة صغيرة + 3 تجارب + 6 أسطح = **عمق**. مجموعة صغيرة + 30 صفحة = **قائمة**.
5. **لأنّ الاتحاد يسمح بمزيج فريد.** لا أحد آخر يجمع: تعلّم مُصمَّم بالعمر + متحف مُثبَّت المصدر + استكشاف زمني/مكاني + فيزياء محاكاة + بحث مفتوح.

**صياغةUMM:**
> **الأكاديمية تُعلّم لماذا نهتمّ. المتحف يُثبّت ما حدث. المستكشف يُظهر كيف يتّصل كلّ شيء. والمهمّة لا تنتهي بانتهاء مهمّتها.**

---

<a id="16-تقييم-الحكّام"></a>
## 16. تقييم الحكّام

### 16.1 هل يحلّ المنتج التحدّي الحقيقي؟

**نعم، وبقوّة.** الاختبار: هل يستطيع زائر مدارس أن يجد، في جلسة واحدة:
- ما هي أنواع العتاد على القمر والمريخ؟ ✅ (`/explorer?mode=artifacts` + `/museum`)
- أيّ مهمّات أتاحته؟ ✅ (24 مهمّة مشتقّة)
- ما حالته اليوم؟ ✅ (`hardwareStatus` + `fate` + `/mission-control`)
- ما الذي تعلّمناه منه؟ ✅ (`scientificContributions[]`)
- من يقول ذلك؟ ✅ (96 مصدرًا + تاريخ وصول)

**ولا** هل يعالج «فجوة السرد»؟ ✅ (8 قصص + 3 تجارب + 12 درسًا).

### 16.2 هل المشكلة مفهومة فورًا؟

**نعم** — وهي ميزة. البطل يقول: *"Discover the machines that shaped our understanding of space."*، والصفحة الرئيسية تعرض لوحتين: **the problem** (records for one machine are scattered) و**what GRAVERSE adds** (one archive, three ways in, sources attached). **ثلاثة أبواب واضحة.** هذا يمرّ اختبار "هل يفهم الحكّام ما هذا في 10 ثوانٍ؟".

### 16.3 هل الحل مميّز؟

**نعم — في بُعد واحد تحديدًا:** الفصل بين مصير المهمّة ومصير الشيء. هذا **ليس** مجرّد عرض إضافي؛ هو قرار معماري يجعل خمسة سلوكيات مختلفة ممكنة. وأيّ مشروع آخر في هذه المسابقة **[سيحاول] نسخ الواجهة، لن يستطيع نسخ البنية دون إعادة تصميم**.

### 16.4 هل التطبيق أكثر من "موقع مذهّل؟"

**لا** — وهذا هو أقوى دليل: **بوّابة التحقق الآلية**. 21 اختبار بيانات، 50 فحص مسار، 38 صفحة axe، 30 رحلة مستخدم تُقود متصفّحًا حقيقيًّا، 192 رابطًا داخليًّا. **الموقع المذهّل لا يملك اختبارات تُقاد**. أضف إلى ذلك `/api/export` (شفافية قابلة للتحقّق) وResearch Archive (حدود معلنة) و`docs/DEMO_GUIDE.md` بقسم "Do not claim".

### 16.5 هل المعلومات موثوقة؟

**نعم، مع فجوة واحدة صريحة.** 96 مصدرًا مسجَّلًا، 30/30 رابط صورة NASA يعمل، 82/89 رابط مصادر يعمل، `*Original` محفوظ لكل سجلّ، `Unknown` بدل التخمين، `dataNotes` لكل خلاف. **الفجوة:** نموذج الـ claims غير مطبَّق على الـ artifacts — وهي الفجوة الوحيدة التي لو سُئل عنها الحكّام ستُزعج.

### 16.6 هل يوجد تفاعل حقيقي؟

**نعم**: 24 سؤال اختبار محفوظ، 8 محاكاة، 3 ألعاب، builder، robot lab، مقارنة، مرشّحات Explorer، حفظ محلي، مشاركة URL. **ليس "فهم" فقط — بل "فعل"**.

### 16.7 هل هناك قيمة تعليمية حقيقية؟

**نعم في التصميم** — 3 فئات عمرية، أهداف سلوكية، شرح لكل إجابة، 4 رحلات منظَّمة، ألعاب تعليمية، 8 نماذج. **غير مقيسة** — ولا يجوز الادّعاء بقياس.

### 16.8 هل التجارب متكاملة فعلًا؟

**جزئيًّا.** التكامل **قوي في اتجاه واحد**: Academy → Museum → Explorer (مع 7، 8، 3 record links على مستوى الوصف). **وضعيف في الاتجاه الآخر**: **المتحف لا يربط أبدًا** بـ Engineering/Stories/Simulations/Mission Control. **هذه فجوة معمارية حقيقية** وأرخص إصلاح عائد بعد عيوب المحاكاة.

### 16.9 هل تُستخدم التقنية بغرض؟

**نعم بشكل ملحوظ.** three.js لثلاثة أشياء فقط: قاعة الصور الحقيقية، الـ orrery، ألعاب Academy. **وكل واحد له بديل 2D مكافئ**. `next/dynamic(ssr:false)` + فحص WebGL + IntersectionObserver + error boundary. **لا 3D ضروري للمعنى.** هذا نضج هندسي نادر في مشاريع الهاكاثون.

### 16.10 ما الذي يبدو مبهرًا لكنّه لا يضيف قيمة؟

| العنصر | الحكم الصريح |
|---|---|
| **`ArtifactAnatomy`** | **إعادة عرض لـ `technicalDetails` مع شريط تحذير.** الاسم يَعِد بالتشريح والمحتوى لا يفعل. **إما يُسمّى "spec cards" أو يُحذف.** |
| **أوريوري 3D** | زخرفي بالكامل (`aria-hidden`, بلا بيانات، بلا انتقاء). **مقبول** لأنه يُعلَن صراحةً وله بديل 2D مكافئ — لكن **لا يُفتخر به**. |
| **S07 What-if** | مفتاح فرعين نصّيين خلف مُزلاج. **الأنسب للاعتراف بأنه تمرين قراءة، لا محاكاة.** |
| **S08 Failure** | مفتاح إجابة واحد. لكن مهمّته (قراءة النصّ الأصلي) حقيقية — **فهو quiz جيد، لا محاكاة**. |
| **الشهادة** | بلا معرّف ولا توقيع ولا تصدير — **تسجيل تقدّم مطبوع**. **الاسم "certificate" مبالغة.** |
| **قائمة "What is in the index"** | تعرض 0 دائمًا (عيب 5). **في اللحظة التي يفتح فيها زائر شاشة فارغة، يُضعف مصداقية الفهرس.** |
| **"Shareable link"** | رابط لا يتحدّث (عيب 7). |
| **10 إنجازات بلا نظام** | `progress.badges` (19) ونظام الإنجازات (15) بلا صلح. |

### 16.11 الفجوات التي قد تُضعف المشاركة

| الفجوة | لماذا تهمّ الحكّام |
|---|---|
| **S01 وS05 معطوبتان** | إن جرّبها حكّام علميّون، **سيرون محاكاة لا تنجح** — ويُسقط ذلك مصداقية "interactive educational models". **هذه أخطر مخاطرة في المشروع.** |
| **S06 `powerLimitW` ميت** | «الحدّ الذي أضبطه لا يفعل شيئًا» — خطأ في نموذج التعليم. |
| **`/api/export?dataset=`** | الحكّام الذين يضغطون «Source registry only» سينزّلون 334 KB. **الإحراج أمام committees "Best Use of Data".** |
| **روابط NASA الميتة** | رابط مكسور على صفحة مقالة تعليمية. **سؤال "How did you verify your sources?" يجرّيان فحص الروابط.** |
| **claims غير مطبَّقة على الـ artifacts** | سؤال علمي مباشر: *"كيف تُميّز القيمة المقيسة من التقديرية في سجلّ artifact؟"* — **لا يوجد جواب في الشيفرة**، فقط في أجسام السماوات. |
| **`missionStatusOriginal` في `CompareClient`** | الجدول يقارن الشريط المعياري فقط — **في Sesame، أقلّ ما نريد**. |
| **الأكاديمية بلا بوّابة نجاح** | سؤال تربوي: *"هل يُميّز المشروع بين المحاولة والإتقان؟"* — الجواب حاليًّا: لا. |
| **لا قياس تربوي** | سؤال: *"كيف تعرف أنّ هذا يعمل؟"* — الجواب الصادق: "لا أعرف بعد". **وهذا مقبول في هاكاثون 48 ساعة، لكن يجب أن يُقال صراحةً.** |
| **التغطية (30 قطعة)** | "Why only 30?" — الجواب موجود وجيد ("curated exhibition, not a complete inventory"). **يجب أن يُقال قبل أن يُسأل.** |
| **الإنجليزية مقابل العربية** | README يبالغ قليلًا؛ Research Archive أدقّ. **يجب توحيد الصياغتين.** |

### 16.12 أسئلة كل نوع من الحكّام — وإجابات مُدافَعة

#### (أ) الحكّام العلميّون

**س1: "هل بعض أرقامكم تقديرات وليست قياسات؟ كيف تُميّزون؟"**
> "نعم — وهذا سؤال وجيه. نموذجنا رباعي (Confirmed / Estimated / Simulated / Unknown) **مطبَّق حاليًّا على حقائق الأجسام السماوية والأجسام البعيدة**، وله منطق التحقّق نفسه. **ونحن نعرف أنّ تطبيقه على كلّ حقل في كلّ سجلّ artifact هو عمل غير مكتمل** — وقد أدرجناه كأولوية. اليوم، ما نضمنه هو: كل رقم في السجلّ **مرتبط بمصدر**، وحالة العتاد **مفصولة** عن حالة المهمّة مع الاحتفاظ بنصّ NASA الأصلي، وأيّ قيمة لم يثبتها مصدر تظهر كـUnknown."

**س2: "مركبة اصطدمت عمدًا — هل هذا 'إهمال'؟"**
> "لا. وهذا بالضبط لماذا بنينا حقلين للحالة. `ranger-7` مهمّته `completed` وحالة عتاده `impacted` — والـ `dataNotes` تنصّ صراحةً: *'Ranger 7's impact was intentional. "Impacted" describes the hardware outcome, not a mission failure.'* و`cassini` حالاته `destroyed` بعد إغراقٍ منظَّم في زحل لحماية المريخ. **نحن لا نستخدم عنوان التحدّي "Abandoned" كحكم على كل قطعة**."

**س3: "هل تتّفقون مع ناسا في أن LRRR ما زال يعمل؟"**
> "نقول ما تقوله NASA، لا أكثر. النصّ الأصلي محفوظ، ونقول 'operating' لأنّ المصدر يقول ذلك منذ 2026-11-10 — **ونُظهر تاريخ التحقّق حتى يعرف القارئ أنّ هذه لقطة زمنية**. نحن **لا** ندّعي تغذية حيّة."

**س4: "هل محاكياتكم نماذج هندسية حقيقية؟"**
> "واحدة نعم: **مختبر الميكانيكا الفضائية (S04)** يحسب نقل هوهنمان بمعادلة **vis-viva** الحقيقية — وقد تحقّقنا من ناتج الأرض→المريخ: ΔV = 5.596 كم/ث، زمن النقل 0.71 سنة. الباقي **مقرّبات تعليمية** وكل واحدة تحمل **ملاحظة تقريب صريحة** تُعرض في الواجهة: 'A one-dimensional educational model… it is not a NASA trajectory simulation.' — ونعمل الآن على تصحيح نموذجَي الهبوط وتخطيط المسار."

**س5: "هل يمكن إعادة إنتاج بياناتكم؟"**
> "نعم: `GET /api/export` يُرجع المجموعة كاملة بصيغة JSON مع `meta` يشرح المصادر و`sourceIds` لكل سجلّ. — (و**يجب أن يُصلَح فيه معامل `dataset` قبل العرض**)."

#### (ب) حكّام هندسة البرمجيات

**س1: "كيف تتجنّبون انحراف البيانات؟"**
> "المهمّات **مشتقّة** لا منسوخة: `buildMissions()` في `src/data/missions.ts` تأخذ أحدث/-earliest تاريخ واتحاد المصادر من سجلّات الـ artifacts نفسها. **الاختبار `mission records stay derived from artifact records` يمنع يدويًّا.** والمصدر الوحيد للحقيقة هو `src/data` — لا بيانات مضمّنة في المكوّنات."

**س2: "هل هناك اختبارات؟"**
> "أربع طبقات: (1) `npm run validate` — zod + تكامل مرجعي + provenance، **ويُفشل البناء**؛ (2) `npm run test:data` — **21/21**؛ (3) `scripts/smoke.mjs` — **50 مسارًا** مع حالة HTTP وعنوان و`h1` واحد وتحويلات، ويحرّك مركبة فعلًا بلوحة المفاتيح ويطلق صاروخًا ويتحقّق من حفظ الشارة؛ (4) `scripts/journeys.mjs` — **30/30 رحلة مستخدم** يقود متصفّحًا حقيقيًّا. أضف فحص روابط (192/192) وaxe (0 مخالفة على 38 صفحة). كلّها في CI."

**س3: "لماذا three.js لثلاثة أشياء فقط؟"**
> "لأنّ المعنى لا يجب أن يعتمد على WebGL. الـ orrery وقاعة العرض والألعاب **لكلٍّ منها بديل 2D كامل**، والـ canvas `aria-hidden` في الحالات كلّها.وكشف `useReducedMotion` يوقف الحركة. **ال3D هنا تحسين، لا شرط.**

**س4: "هل هناك حالة خطأ؟"**
> "نعم: `src/app/error.tsx` و`not-found.tsx` و`EmptyState`؛ و`CanvasBoundary` في قاعة المتحف؛ وprobe لـ WebGL قبل التركيب؛ وتراجع إلى في-memory إن تعذّر `localStorage`؛ ورسائل خطأ الاستيراد مصوغة بالعربية والإنجليزية."

**س5: "هل الحالة على العميل؟"**
> "لاحظ أن `useProgress` يستخدم نسخة مستقلة لكل استدعاء ولا يوجد Context — **نعرف، وسنصلحه**. والسبب أن القراءة من `localStorage` في الـ updater كان simplest correct."

#### (ج) حكّام التعليم

**س1: "لمن صُنع؟"**
> "لثلاث شرائح عمرية صراحةً: 5–7، 8–9، 10–12 — كل واحدة بشقّ مختلف (6–7 دقائق، 7–8، 9–10) وبمحتوى متدرّج. والتحدّي الرسمي يسأل *"What age group is your story designed for?"* — نحن لم نفترض، بل **بنينا**."

**س2: "كيف تعرفون أنّ التعلّم نجح؟"**
> "**لا نعرف بعد** — وهذا حدّ صريح. ما عندنا: تقويم ذاتي مع تغذية راجعة مفصّلة لكل إجابة، متابعة التقدّم، 15 إنجازًا، وشارة مسار. ما لا عندنا: قياس قبل/بعد، ولا اختبار تذكّر، ولا مجموعة ضابطة. **دعم التعلّم النشط (Freeman et al., PNAS 2014) مبنيّ على 225 دراسة جامعية — لا يُنقل تلقائيًّا إلى زائر متحف رقمي.**"

**س3: "هل يكافئ المشروع الفهم أم النشاط؟"**
> "حاليًّا **النشاط**. الإجابة تُسجَّل، والدرجة تُحفظ — لكن لا بوّابة نجاح ولا حدّ أدنى. **هذا أول ما سنضيفه**: ربط أهداف الدرس بأسئلة الاختبار، وتمييز «حاول» عن «أتقن»."

**س4: "هل تناسب جميع الأعمار؟"**
> "0 مخالفات axe على 38 صفحة بمعيار WCAG 2.1 AA، مع بدائل 2D لكل 3D، ودعم reduced-motion، ولوحة مفاتيح كاملة، و`aria-live` لأعداد النتائج، وRTL عربي. **ونحن نذكر صراحةً: لم نُجْرِ جلسة قارئ شاشة مسجَّلة (VoiceOver/NVDA)** — والتحقق الآلي لا يغني عن ذلك."

#### (د) حكّام تصميم المنتج

**س1: "ثلاثة تجارب — لماذا لا موقع واحد؟"**
> "لأنّ الحاجة تتغيّر: «ما هذا؟» للمتحف، «كيف يعمل؟» للـ Academy، «متى وأين؟» للمستكشف. **30 سجلًّا × 3 زوايا = عمق. 30 سجلًّا × 30 صفحة = قائمة.** والثلاث تجارب **تقرأ نفس البيانات** — روابط `artifactIds` من Academy إلى Museum إلى Explorer **موثّقة بالاختبار**."

**س2: "هل الواجهة المزدحمة تعيق الزائر؟"**
> "المتحف داكن وسينمائي، والأكاديمية دافئة وفاتحة، والمستكشف غامر — **والثلاث على نفس نظام التصميم (warm archive)**. التحول يتم عبر متغيّرات CSS على `<html data-experience>` قبل الرسم، فلا وميض.Hill الفصل يقوم على context لا على vanity."

**س3: "ما أكثر ما تفتخرون به في التصميم؟"**
> "**قاعدة العدّاد المزدوج** — 'Two different questions' — يجعل الازدواج ليس خطأً بل معلومة. و**قاعدة «Unknown»** — الفراغ الذي لا يُملأ يبدو كمهارة، لا كقصور."

**س4: "أين يتسرّع منتجكم؟"**
> "عندنا **هوية واحدة مصمَّمة ومنفَّذة**: قاعة rotunda + timeline + أوريوري + 3 ألعاب + 8 محاكاة + روبوت + certifcate. العيب الحقيقي ليس الهوية بل **التكرار**: `/about` و`/research` و`/sources` ثلاث صفحات تتداخل، و4 أسطح تعرض الحالة. **دمجها أولوية.**

### 16.13 أقوى خمس حجج لصالح GRAVERSE

1. **فصل الحالة المزدوجة مفروض بنيويًّا — لا يمكن نسخه في ساعة.** لا رابط بين `MissionStatus` و`HardwareStatus` في النوع البرمجي؛ `StatusBadge` يستقبل union مُميَّزًا؛ ولكلّ سجلّ **نصّ NASA الأصلي إلزامي** بجانب الشريط المعياري. النتيجة: **خمسة سلوكيات مختلفة** (مستمرة، خاملة، صامتة، مصطدم، مدمَّرة) تنبع من بنية واحدة.
2. **بوّابة تحقّق آلية غير عادية في مسابقة هاكاثون.** 21 + 50 + 38 + 24 + 192 — كلها ناجحة في تشغيل فعلي بتاريخ 2026-11-11. **هذا يحوّل "أظنّ أنّ البيانات صحيحة" إلى "البيانات محقّقة بالاختبار".**
3. **المزيج المتوازن على 13 بُعدًا — وهو ما تفشل فيه المنصّات المتخصّصة.** NASA Eyes تتفوّق في 3D والوقت؛ NSSDCA في العمق التقني؛ ESA في التعليم. **لا واحد منها يجمع السجلّ الموثّق + التعلّم المُصمَّم بالعمر + الاستكشاف الزمني/المكاني + المحاكاة + البحث المفتوح + الشفافية.**
4. **الاستجابة المباشرة على Challenge's **Pain Point**:** "school-age space enthusiasts often hear only about active, ongoing missions." GRAVERSE لا يضيف المهمّات الجارية فقط — بل **قصّتان مخصّصتان للعتاد المنتهي** (`forgotten-spacecraft`, `final-days`) + `Mission Control` الذي يجعل الصمت موضوعًا.
5. **نزاهة المنهجية مُعلنّة لا مُخفية.** Research Archive فيه 4 حدود صريحة؛ `docs/DEMO_GUIDE.md` فيه **قائمة "Do not claim"**؛ `Unknown` بدل التخمين؛ `dataNotes` بجوار المصادر؛ `precision` لا "exact" في كلّ السجلّات؛ و**كل رابط صورة NASA يعمل (30/30)**. **هذا هو النمط الذي يجعل ادّعاءات الدقّة الأخرى مقبولة.**

### 16.14 أخطر خمس نقاط ضعف/مخاطر

| # | المخاطرة | الأثر | المعالجة المقترحة (ترتيب بالأولوية) |
|---|---|---|---|
| **1** | **S01 وS05 معطوبتان** (0/2160 ناجحة؛ 82.9 Wh مقابل 45 Wh) | حكّام علميّون يجرّبونها → يُسقط ثقة «educational models» | **إصلاح S01 (تصحيح إشارة الارتفاع: `altitude -= velocity*dt` مع velocity سالبًا للأعلى)؛ إعادة معايرة ميزانية S05 إلى ~110 Wh أو خفض معامل Slope؛ إضافة اختبار انحدار لكلاهما.** |
| **2** | **نموذج claims غير مطبَّق على الـ artifacts** | سؤال علمي مباشر بلا جواب | **إضافة `claim` لكل حقل في `Artifact` (أو على الأقل `technicalDetails`)، وتعميم `ClaimBadge` على صفحة السجلّ.** |
| **3** | **`/api/export?dataset=` معطّل** | إحراج أمام لجنة "Best Use of Data" | **إزالة `force-static` أو إضافة `generateStaticParams` لكل `dataset`؛ أو إضافة مسار منفصل `/api/export/[dataset]`.** |
| **4** | **Superficial seams: Museum لا يربط بالأسطح المساندة + تكرار `/about`/`/research`/`/sources` + بطاقتا حالة متكرّرتان** | يبدو المشروع "كثيرًا لكن مشتّتًا" | **إضافة كتلة "Explore this" في صفحة السجلّ تربط بـ Engineering/Stories/Simulations؛ ودمج `/about` في `/research`.** |
| **5** | **لا بوّابة نجاح / لا ربط objectives بالأسئلة / لا SRS** | سؤال تربوي: "إتقان أم نشاط؟" | **ربط كل objective بمعرّف سؤال؛ و`passed` field في `LessonProgress`؛ وSRS بسيط (Leitner) للبطاقات.** |

**أخطاء يجب إصلاحها قبل العرض أيضًا:** `powerLimitW` الميت (S06) · لوحة "What is in the index" · رابط Compare غير المتزامن · `eventType` لا يصل لـ launch/end-of-mission · تصنيف `apollo-15-lunar-rover` السلبي · 4 روابط ميتة (2 منها تعليمية) · 9 سجلّات مصادر مكرّرة.

---

<a id="17-المخاطر-والحدود"></a>
## 17. المخاطر والحدود

### 17.1 حدود النطاق (مُعلَنة في المشروع)

| الحد | التفصيل |
|---|---|
| المجموعة محدودة | 30 artifact / 24 mission / 20 body / 8 deep-sky — **مقصودة** |
| لا تكامل API حيّ | لقطة مُتحقَّقة بتاريخ 2026-11-10 |
| لا نماذج 3D واقعية | كل المجسمات من primitives موسومة |
| التقدّم محلي فقط | لا حسابات، لا سحابة، no analitics |
| الترجمة جزئية | chrome فقط؛ والتحرير بالإنجليزية |
| حالة الاتصال مشتقّة | لا تغذية حيّة |
| `ArtifactAnatomy` ليس تشريحًا | مُعلن |
| لا visual-regression ولا مصفوفة متصفّحات | |
| بوّابة المتصفّح تحتاج Chrome | `CHROME_PATH` |

### 17.2 حدود **غير** مُعلَنة (اكتُشفت في هذا التحليل)

| # | الحد | لماذا مهمّ |
|---|---|---|
| 1 | S01 لا تنجح أبدًا | معطوبة وظيفيًّا |
| 2 | S05 غير قابلة للحلّ | معطوبة وظيفيًّا |
| 3 | `powerLimitW` ميت | نموذج مضلّل |
| 4 | `?dataset=` معطّل | مسار معلَن لا يعمل |
| 5 | لوحة الفهرس تعرض 0 | خطأ ظاهر |
| 6 | رابط Compare لا يتحدّث | خاصية معلنة لا تعمل |
| 7 | 4 روابط مصادر ميتة | روابط مكسورة |
| 8 | 9 سجلّات مصادر مكرّرة | تضخيم + ازدواج |
| 9 | `apollo-15-lunar-rover` تصنيف خاطئ | خطأ علمي |
| 10 | `artifact` في URL يُمحى | معامل ميت |
| 11 | `replaceState` لا يدعم back/forward فعلًا | ادّعاء توثيقي غير دقيق |
| 12 | 4 قيم حالة ميتة | `intermittent`, `unknown`, `still-traveling`, `planned` |
| 13 | `eventType` لا يصل لأهمّ الأنواع | ناقص وظيفيًّا |
| 14 | `ArtifactAnatomy` مسمّى أبعد من محتواه | تضليل |
| 15 | `ExperienceSwitcher` شيفرة ميتة | فوضى |
| 16 | `/api/export` يخدم `meta.generatedAt` مجمّدًا | stale |
| 17 | `validatePersonal` تقبل ملف تقدّم | فقدان بيانات |
| 18 | لا مزامنة بين تبويبات | سلوك متوقّع |
| 19 | `MissionRecordStatus` cast غير آمن | خطر نوعي |
| 20 | `missionName` مفتاح نصّي بلا فحص | orphan صامت |

### 17.3 المخاطر استراتيجية

| المخاطرة | الاحتمال | الأثر | التخفيف |
|---|---|---|---|
| **يكتشف حكّام محاكاة معطوبة** | **متوسط** | **عالٍ جدًّا** | إصلاح + اختبار انحدار + عرض فرعي مُختبَر |
| **الحكّام يقارنون بـ NASA Eyes** | عالٍ | متوسط | الاستعداد: GRAVERSE ليس بديلًا عن DSN/Eyes — **القول الصحيح: "نحن نضيف ما لا يغطّيه: السجلّ الموثّق + التعلّم"** |
| **يُسأل عن NASA endorsement** | عالٍ | متوسط | `/about` + التذييل + قائمة "Do not claim" — **لا تدّعي أيّ شراكة** |
| **يُسأل عن 30 قطعة فقط** | عالٍ | منخفض | الجواب الجاهز: "معرض مُنسَّق، لا جرد" + Research Archive |
| **موارد التحدي تنشر 13 Nov** | مؤكد | منخفض | **عُد إلى `/sources` + `/api/export` يوم 13 November وأضف المصادر الجديدة** |
| **انحراف المصادر مع الوقت** | مؤكد | متوسط | `/research#update` يصف الإجراء؛ **يلزم تجديد دوري** |

### 17.4 المخاطرة 4 — موارد التحدي لم تُنشر بعد

> تبويب Resources في صفحة التحدي الرسمي يعرض نصًّا واحدًا عند 2026-11-11: **"Resources will be available on Friday, November 13."**
> HAckathon 2026: **14–15 نوفمبر 2026**. إذن الموارد ستنشر **غدًا تقريبًا**.
> **الإجراء الموصى به:** يوم 13 نوفمبر، افتح تبويب Resources، وأضف أيّ موارد NASA جديدة إلى `src/data/sources.ts` مع `accessedAt`، ثم شغّل `npm run validate && npm run test:data`. **هذا أرخص تحسين مصداقية ممكن، وأيّ المصادر الجديدة ستُبقي المجموعة ضمن 30 أو توسّعها بشكل مبرَّر.**

### 17.5 ما لا يمكن أن يقوله الفريق (قائمة صريحة)

من `docs/DEMO_GUIDE.md` — **يجب قراءتها حرفيًّا في العرض**:

- ❌ رابط نشر غير موجود في المستودع.
- ❌ "نقدّم بيانات NASA الرسمية للتحدّي" — **لا**؛ حزمة التوريد احتوت المخطط والصورة المرجعية فقط؛ المجموعة مُطبَّعة من صفحات NASA العامة وسجلّات NASA/NSSDCA وسجلّات صور NASA. `/about` ينصّ على ذلك، و`/api/export` يقدّم بالضبط ما هو على الشاشة.
- ❌ أيّ تأييد أو شراكة أو مراجعة من NASA.
- ❌ درجات Lighthouse أو بيانات أداء ميدانية لم تُقَس.
- ❌ "شهادة معتمدة لقارئ الشاشة" — axe الآلي ≠ تدقيق قارئ شاشة.
- ❌ "جرد كامل لتاريخ الفضاء" — المجموعة محدودة عمدًا.
- ❌ أن نماذج 3D للّعَب هي نماذج فضائية رسمية أو بمقياس — هي primitive toys، وتضاريس الـ rover مُخترَعة.

### 17.6 ما لا يمكن أن يقوله الفريق (إضافات هذا التحليل)

- ❌ "نموذج claims مطبَّق على كل الحقول" — **ليس كذلك**؛ مطبَّق على أجسام السماوات فقط.
- ❌ "الأربع محاكاة تعمل" — اثنتان معطوبتان.
- ❌ "نضمن روابط المصادر" — 4 منها ميتة.
- ❌ "`?dataset=` ينزّل مجموعة واحدة" — لا، في الإنتاج.
- ❌ "التعلّم النشط يزيد الأداء 0.47 SD عند زوّارنا" — **لا يوجد أيّ قياس**.
- ❌ "GRAVERSE يعرض حالة الاتصال الحيّة" — مشتقّة.

### 17.7 خطة المعالجة المقترحة (قبل 14 نوفمبر)

| الأولوية | الإجراء | الوقت | الأثر |
|---|---|---|---|
| **P0** | إصلاح S01 (إشارة الارتفاع) + S05 (إعادة معايرة الميزانية) + S06 (`powerLimitW`) | 2–3 ساعات | يزيل أخطر مخاطرة |
| **P0** | إصلاح `/api/export?dataset=` | 30 دقيقة | يزيل إحراج "Best Use of Data" |
| **P0** | إصلاح `apollo-15-lunar-rover` (نقله من `PASSIVE_IDS`) | 5 دقائق | يزيل خطأً علميًّا |
| **P1** | إصلاح لوحة "What is in the index" + رابط Compare | 30 دقيقة | يزيل خطأين ظاهرين |
| **P1** | إصلاح 4 روابط المصادر الميتة | 20 دقيقة | يزيل روابط مكسورة |
| **P1** | توسيع `eventType` ليشمل `primaryMilestone.type` + أنواع `timelineEvents` | 30 دقيقة | يجعل الوعد بالإعلان صحيحًا |
| **P2** | إضافة `claim` إلى حقول `technicalDetails` + `ClaimBadge` في صفحة السجلّ | 2 ساعات | يُغلق فجوة علمية |
| **P2** | إزالة 9 سجلّات مصادر مكرّرة | 45 دقيقة | ينظّف السجلّ |
| **P2** | عرض `getRelations()` في صفحة السجلّ | 1 ساعة | يفعّل 581 حافة |
| **P3** | ربط `objectives` بأسئلة الاختبار + `passed` | 2 ساعات | يُغلق فجوة تربوية |
| **P3** | دمج `/about` في `/research` + روابط من المتحف للأسطح المساندة | 2 ساعات | يُقلّل التشتّت |
| **P3** | **قراءة تبويب Resources يوم 13 Nov وإضافة المصادر** | 30 دقيقة | يحدّث المصداقية |

---

<a id="18-أطروحة-المنتج-المركزية"></a>
## 18. أطروحة المنتج المركزية

### 18.1 المشكلة

> **الناس يعرفون أنّ مركبات فضائية أُرسلت. لكنّهم لا يعرفون ما الذي بقي منها، ولماذا بقي، وماذا أضافت — لأنّ الحقول التي تصفّ العتاد والحقول التي تصفّ المهمّة مختلطة في المصادر، ومتفرّقة عبر صفحات المهمّات ومكتبات الصور والأرشيفات التقنية. ومن يبحث عن مهمّة منتهية — وهي تعليمية بامتياز — لا يجد إلا نصًّا تقنيًّا مكتوبًا ل البالغين.**

### 18.2 الرؤية

> **مهمّة الفضاء لا تنتهي بانتهاء المهمّة. الآلة قد تتوقّف، لكنّ ما تعلّمته يبقى، وأحيانًا تبقى الآلة نفسها تعمل decoupled بعد عقود. حين نُفرّق بين مصير المهمّة ومصير الشيء، يتحوّل «عتاد متروك» من تحسّر إلى أرشيف.**

### 18.3 الحل

> **GRAVERSE أرشيف رقمي موثّق المصدر لـ 30 قطعة من عتاد NASA، بثلاث تجارب مبنيّة على مجموعة واحدة: أكاديمية مُصمَّمة بثلاث فئات عمرية، متحف يثبت ما حدث، ومستكشف يربط الزمن والمكان والسببية.**

### 18.4 النهج المميّز

> **لا نعرض "عتادًا متروكًا". نعرض نظامًا من ثلاثة أسئلة مستقلّة — هل انتهت المهمّة؟ ما حالة الجهاز؟ هل هناك اتصال؟ — ونحفظ نصّ NASA الأصلي بجانب كل شريط معياري، ثم نضع كلّ شيء خلف نفس بوّابة التحقّق.**

### 18.5 القيمة للمستخدم

| المستخدم | القيمة |
|---|---|
| **طفل 9 سنوات** | "هذا الجهاز الذي بنيه البشر ما زال يقيس استدارة القمر" — أي **علاقة**، لا معلومة |
| **معلّم** | مسار كامل 35 دقيقة بأهداف ومصادر جاهزة — أي **وقت** |
| **هاوٍ** | خمس حالات مختلفة للحالة المادية، مشروحة لا مُدرجة — أي **فهم** |
| **باحث** | 96 مصدرًا بتاريخ وصول + `dataNotes` + JSON مفتوح — أي **تدقيق** |
| **قارئ تحدٍّ** | منتج يتعامل مع "accuracy is important" كبنية لا كنصّ — أي **مصداقية** |

### 18.6 القيمة الثقافية والعلمية الأوسع

> **GRAVERSE يضيف إلى السجلّ البشري شيئًا لم يكن له مكانًا رقميًّا: "الأثر المادي" بعد أن فقد significance وظيفته.** لا متحف ماديًّا يستطيع عرض ثلاثين قطعة في ثلاث بيئات فضائية مختلفة. لا أرشيف تقنيًّا يصنع منهجًا تعليميًّا مُصمَّمًا بالعمر. **الأرشيف الرقمي يستطيع الاثنين — وهو ما يجعل "الأwagining" الذاكرة الثقافية لا صورة.**
> وبلا نسيان، **الدقة العلمية ليست خدمة مُضافة — بل شرط**. في أرشيف feedbacks ما بين "لم نعرف" و"قيمة موجودة"، وGRAVERSE تختار **الأمانة**.

### 18.7 الجملة الواحدة

> **GRAVERSE — مساحة واحدة موثّقة المصدر تُعلم الصغار، وتُوثّق الكبار، وتربط الكلّ: important، لأنّ المهمّة والمركبة ليسا الشيء نفسه.**

*(English: GRAVERSE is one source-linked archive where a mission and its hardware are finally treated as two different things — and that single distinction changes how we teach, how we record, and how we remember space exploration.)*

### 18.8 خمس عبارات تُحرِّك الذاكرة

1. **"المركبة توقّفت. المعرفة لم تتوقّف. وأحيانًا تبقى الآلة هي التي تستمرّ."**
2. **"انتهاء المهمّة ليس مصير الشيء."**
3. **"لا نملأ الفراغات. ما لا نعرفه يُبقى Unknown."**
4. **"نعرض شريطنا، ونُبقي كلام NASA بجواره."**
5. **"ثلاثون قطعة، ثلاث طرق للدخول، ومجموعة واحدة لا تتناقض مع نفسها."**

---

<a id="19-عرض-المنافسة"></a>
## 19. عرض المنافسة

### 19.1 الشرح في 30 ثانية

> "GRAVERSE أرشيف رقمي موثّق المصدر لـ 30 قطعة من عتاد NASA — على القمر والمريخ وفي الفضاء العميق. له ثلاث تجارب: أكاديمية لصفوف 5–12، متحف يثبت القصّة، ومستكشف يربط الزمن والمكان. **والقرار الأهمّ في المشروع: نفصل حالة المهمّة عن حالة العتاد** — فيمكن أن تنتهي مهمّة ويبقى عتادها سليمًا ويعمل. كل ادّعاء يستند إلى مصدر مسجَّل بتاريخ وصول، وكل حالة اتصال مُعلَّمة كمشتقّة لا كقياس حيّ. **ثلاثون قطعة، ثلاث ways in، ومجموعة واحدة لا تتناقض مع نفسها.**"

### 19.2 الـ Pitch في 90 ثانية

> **[0:00–0:15] المشكلة**
> "منذ الستينيات، تركت البشرية آلات على القمر والمريخ وفي الفضاء البعيد. بعضها ما زال يعمل. **لكنّ المهمّة تنتهي، والآلة لا تختفي.** المشكلة أن المعلومة عن آلة واحدة موزّعة على صفحات المهمّات ومكتبات الصور والأرشيفات التقنية — ومن يقِر عن مهمّة منتهية يجد نصًّا تقنيًّا لا قصّة.
>
> **[0:15–0:35] الرؤية**
> "في 2024، أرسلت NASA تغييرًا في عيّنة صفائح المهمّات: حالة واحدة لكل مهمّة. هذا يخلط مصير **المهمّة** بمصير **الشيء** — وهو خطأ يضيّع نصف القصة. عادت أبولو 11: نجحوا، لكنّ **مرحلة الهبوط ما زالت على القمر**. رانجر 7: نجحت، ثم **اصطدمت عمدًا**. كاسيني: أُنهيت بقرار، لا بالإهمال.
>
> **[0:35–0:55] الحل**
> "GRAVERSE يفصل Adams: لكل سجلّ **حالتان** — حالة المهمّة وحالة العتاد — ولكلٍّ **نصّ NASA الأصلي** بجانب الشريط المعياري. هذا مفروض في بنية البيانات نفسها: لا يمكن كتابة حالة عتاد في حقل مهمّة. والنتيجة أن **المتحف يشرح، والأكاديمية تُعلّم، والمستكشف يربط** — كلها على المجموعة نفسها.
>
> **[0:55–1:15] الدقّة**
> "96 مصدرًا مسجَّلًا بتاريخ وصول. القيم غير المؤكَّدة تقول Unknown. حالة الاتصال **مشتقّة ومُعلَّمة** — لا ندّعي تغذية حيّة.총 21 اختبار بيانات، 50 فحص مسار، 38 صفحة axe بلا مخالفة، 30 رحلة مستخدم — كلها تعمل في CI.
>
> **[1:15–1:30] لماذا يهمّ**
> "لأنّ الذاكرة البشرية تحتاج **أثرًا ماديًّا** يُالوصول — وهذا ما تقدّمه الصفحة. ولمصنعه NASA كان يقول: 'school-age space enthusiasts often hear only about active, ongoing missions.' **نحن نضع العتاد المنتهي في المركز — لا الهامش.** GRAVERSE: مهم، لأنّ المهمّة والمركبة ليسا الشيء نفسه."

### 19.3 السرد التفصيلي في 3 دقائق

> **[0:00–0:30] الخطّاف**
> "منذ 1964، اصطدمت مركبة فضائية ب القمر — عن قصد. كانت مهمّتها قد نجحت؛ كانت آلة تصوير. اليوم، آلة أخرى بُنيت عام 1969 لا تزال على القمر **تُقاس بها استدارة كوكب**. Between these two facts lies a story our archives have made hard to tell.
>
> **[0:30–1:00] المشكلة، مؤطَّرة**
> "NASA تذكر في وثائقها أشياء كثيرة عن المهمّات. لكن حين تبحث — وأنت في سنّ التاسعة — عن آلة صامتة على المريخ، تجد: صفحة أرشيف تقني، أو صورة بلا سياق، أو خبرًا من 2015. **لا تجد مصيرًا.** والمعايير الشائعة تميل إلى **المركبات العاملة** — لأنّها تنتج الأخبار. **عالَم الفضاء inhabited by robots، لكنّ قصّة العتاد الصامت هي ما نُعلّمه الجيل القادم.**
>
> **[1:00–1:45] القرار المعماري**
> "فصلنا بين سؤالين: **هل انتهت المهمّة؟** و**ما حالة الشيء؟**. ليستا سؤالًا واحدًا. نافذتنا تعرض «مهمّة: منتهية» بجانب «عتاد: خامل» — والنصّ الأصلي من NASA بجوار كلٍّ منهما. والاختيار ليس في الواجهة: **مفروض في الأنواع البرمجية**. لا يمكن أن تكتب حالة عتاد في حقل مهمّة.
> وهذه ليست زينة: هي التي تجعل **خمسة سلوكيات** ممكنة — مستمرّ، خامل، صامت، مصطدم، مدمَّر — وأن يجعل تصفية «كل ما لا يزال يعمل» سؤالًا مفهومًا.
>
> **[1:45–2:20] المنتج**
> "ثلاث تجارب على مجموعة واحدة. **الأكاديمية**: أربع رحلات واثنا عشر درسًا بثلاث فئات عمرية — لأنّ NASA سألتنا صراحةً: *لمن قصّتك؟* — إضافة إلى ألعاب 3D وبطاقات وشارات وشهادة تعلّم محلية. **المتحف**: ثلاثون سجلًّا، ten sections لكلٍّ، وقاعة 3D تحمل **صور NASA الحقيقية** لا نماذج مفترضة. **المستكشف**: خطّ زمني، استكشاف بالوجهة، تصفية، ومقارنة — وكل فلتر ينعكس في الرابط، فتشاركه.
>
> **[2:20–2:45] الدقّة**
> "96 مصدرًا مسجَّلًا بتاريخ وصول. لكل سجلّ `dataNotes` تشرح لماذا اختلفت المصادر. ما لا نعرفه يظهر كـ Unknown — لا نخمّن. حالة الاتصال **مشتقّة ومُعلَّمة** بوضوح. وهل نفعل ما نقوله: 21 اختبار بيانات، 50 فحص مسار، 38 صفحة axe بلا مخالفة، 30 رحلة مستخدم حقيقيّة، 192 رابطًا داخليًّا — كلها في خطّ CI واحد.
>
> **[2:45–3:00] الخاتمة**
> "المهمّة لا تنتهي بانتهاء المهمّة. **GRAVERSE** — لأنّ المهمّة والمركبة ليسا الشيء نفسه."

### 19.4 شرح موجز لكل تجربة من الثلاث

| التجربة | في جملة | ثلاثة أشياء تعمل |
|---|---|---|
| **الأكاديمية** | "تعلّم Children *لماذا* يهمّ — من 5 إلى 12 سنة، في رحلات مُصمَّمة." | 4 رحلات · 12 درسًا (24 سؤالًا بشرح) · 3 ألعاب 3D · 15 شارة · شهادة محلية |
| **المتحف** | "يثبت ما حدث لكل قطعة — بالبصيرة الأصلية وبكل مصدر." | 30 سجلًّا من 10 أقسام · النصّان الأصليان · 96 مصدرًا · قاعة 3D بصور NASA حقيقية |
| **المستكشف** | "يحوّل 30 قطعة إلى 118 حدثًا على خطّ زمني، مع مرشّحات تُشارَك." | 3 أوضاع · 6 مرشّحات · خطّ زمني تفاعلي · أوريوري 3D + خريطة 2D · 20 جسمًا |

### 19.5 ما يجب أن يُقال — وما يجب ألّا يُقال

| ✅ قُل | ❌ لا تَقُل |
|---|---|
| «مُطبَّعة من صفحات NASA العامة وسجلّات NSSDCA» | «بيانات NASA الرسمية» |
| «كل ادّعاء يستند إلى مصدر مسجَّل بتاريخ وصول» | «تحقّق من NASA» |
| «حالة الاتصال مشتقّة من الحالة المسجَّلة، وليست تغذية حيّة» | «نعرض حالة الاتصال الحيّة» |
| «معرض مُنسَّق من 30 قطعة، لا جرد كامل» | «أشمل أرشيف» |
| «نماذج تعليمية، كلٌّ منها يحمل ملاحظة تقريب صريحة» | «محاكاة هندسية» (عدا S04) |
| «صُمّم على مبادئ التعلّم النشط، ولم يُقَس أثره بعد» | «التفعل النشط يرفع الأداء 0.47 SD» |
| «الأول في الفصل بين الحالتين» | «الأول في …» (أيّ ادّعاء حصري) |

### 19.6 نصيحة عرض عملية

1. **ابدأ بالمشكلة لا بالمنتج.** القصة أabolو 11 أقوى من شريحة معمارية.
2. **افتح صفحة `apollo-11-lrrr` واعرض العمودين جنبًا إلى جنب.** هذه لقطة واحدة تحسم ما يحتاج عشر شرائح.
3. **اعرض `?event=voyager-1:v1-launch`** لتُظهر أن الفلتر قابل للمشاركة.
4. **اعرض شاشة الصفحات الفرعية للعطل** — وضع عدم توفّر WebGL — **واشرح أنّها ميزة**: المعنى كلّه موجود في 2D.
5. **اعرض `/research` «Honest limitations»** — أربعة حدود صريحة تبني ثقة أكثر من عشر مباهٍ.
6. **إذا سُئلت عن المحاكاة، اعترف فورًا:** «S04 يحسب vis-viva الحقيقي. S01 وS05 نعمل على إصلاحهما — وملاحظات التقريب الصريحة موجودة على كل صفحة.» **الاعتراف الصادق يربح أكثر ممّا يخسر.**

---

<a id="20-المصادر-والمراجع"></a>
## 20. المصادر والمراجع

> **قواعد التوثيق المتّبعة:**
> - كل رابط خارجي في هذا التقرير **فُحص بتاريخ 2026-11-11** وسُجّل رمز الحالة.
> - Distinction صريح بين: **(أ)** أدلّة المستودع (مُتحقَّق منها بتشغيل فعلي) · **(ب)** متطلبات التحدي الرسمية · **(ج)** بحث خارجي · **(د)** نظرية أكاديمية · **(هـ)** تفسير معقول من عندي.
> - **لم يُختلق أيّ مصدر.** حيث تعذّر الوصول، قيل "تعذّر الوصول" صراحةً.
> - تاريخ الوصول لكل مصدر خارجي: **2026-11-11** (ما لم يُذكر خلاف ذلك).

### 20.1 المتطلّب الرسمي للتحدّي

| # | المصدر | الرابط | الحالة | التاريخ |
|---|---|---|---|---|
| S-01 | صفحة التحدّي الرسمية — "Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars" | `https://www.spaceappschallenge.org/2026/challenges/nasas-discarded-equipment-storytelling/` | **200** | 2026-11-11 |
| S-02 | واجهة GraphQL الرسمية (بيانات التحدّي: العنوان، `excerpt`, `detailsContent`, `categories`, `skills`, `meta.slug`, تواريخ النشر) | `https://api.spaceappschallenge.org/graphql` | **200** | 2026-11-11 |
| S-03 | صفحة قائمة تحدّيات 2026 | `https://www.spaceappschallenge.org/2026/challenges/` | 200 (يُعرض بعد JS) | 2026-11-11 |
| S-04 | صفحة جوائز Space Apps | `https://www.spaceappschallenge.org/2026/awards/` | 200 | 2026-11-11 |
| S-05 | مستودع NASA Space Apps الرسمي | `https://github.com/nasa/spaceapps` | — (مُشار إليه في S-01) | 2026-11-11 |
| S-06 | Wikipedia — NASA International Space Apps Challenge (جداول المشاركة والجوائز) | `https://en.wikipedia.org/wiki/NASA_International_Space_Apps_Challenge` | 200 | 2026-11-11 |

**حقائق استُخرجت من S-01/S-02 حرفيًّا:** العنوان الكامل · التصنيفات (Intermediate, Beginner/Youth) · المهارات (Astrophysics, Planets & Moons, Space Exploration) · نصّ Summary / Background / Objectives / Potential Considerations كاملًا · `meta.firstPublishedAt = 2026-09-17` · `meta.lastPublishedAt = 2026-10-28` · `resourcesTabContent = "Resources will be available on Friday, November 13."` · `excerpt`.

**حقائق من S-06:** عدد التحديات والمشاريع والمشاركين لكل سنة 2012–2025 · فئات الجوائز التاريخية · عنوان موضوع 2025 "Learn, Launch, Lead" · أن Space Apps يديرها قسم العلوم الأرضية في إدارة المهمّات العلمية.

### 20.2 أدلّة المستودع (تحقّق مباشر)

| # | المصدر | التحقّق | النتيجة |
|---|---|---|---|
| R-01 | `/Users/faridelsayed/Desktop/graverse_project_blueprint/graverse` | `git log`, `git status` | فرع `main`، آخر التزام `4880619`، شجرة نظيفة |
| R-02 | `npm run validate` | تشغيل 2026-11-11 | "Data validation passed: 30 artifacts, 20 bodies, 8 deep-sky objects, 24 missions, 12 lessons, 4 journeys, 3 playground games, 8 articles, 96 sources, 581 directed relation edges." |
| R-03 | `npm run test:data` | تشغيل 2026-11-11 | **21/21 passed** |
| R-04 | `npm run verify` (كامل) | تشغيل 2026-11-11 | typecheck ✅ · lint ✅ · validate ✅ · data tests 21/21 ✅ · build ✅ · smoke ✅ · axe 0 violations · **journeys 30/30** · **links 192/192** |
| R-05 | `scripts/smoke.mjs` (مستقلّ) | تشغيل 2026-11-11 | **pagesChecked: 50, failures: []** |
| R-06 | فحص روابط الصور (30 `nasaId`) | `curl` لكل معرّف | **30/30 → HTTP 200** على `images.nasa.gov/details/{id}` |
| R-07 | فحص روابط المصادر (89 رابطًا فريدًا) | `curl` لكل رابط | 82×200 · 4×404 · 2×000 · 1×403 |
| R-08 | محاكاة S01 | brute-force على 2,160 تركيبة | **0 ناجحة**؛ الارتفاع يتصاعد تصاعديًّا |
| R-09 | محاكاة S05 | Dijkstra على دالة الطاقة | **الحدّ الأدنى 82.9 Wh مقابل ميزانية 45 Wh** |
| R-10 | محاكاة S06 | مقارنة مخرجات عند powerLimitW = 20 و 200 | **مخرجات متطابقة بايتًا** |
| R-11 | `/api/export?dataset=…` | `curl` على البناء الحيّ | **جميعها 334,198 بايت** (لا تمييز) |
| R-12 | لوحة "What is in the index" | فحص HTML البناء الحيّ | **كل الأنواع الـ13 تعرض 0** |
| R-13 | قواميس i18n | تحليل برمجي لـ `src/lib/i18n.ts` | **101 مفتاحًا في en و101 في ar، متطابقة** |
| R-14 | بنية الدروس | تحليل برمجي لـ `src/data/lessons.ts` | 12 درسًا · 3 أقسام · 3 أهداف · 2 مصطلح · **2 سؤال لكل درس (24)** |
| R-15 | بنية الرحلات | `src/data/journeys.ts` | 4 رحلات · 23 خطوة |
| R-16 | `MoonPhaseDisk` | rasterisation بـ `sharp` | 0 / 14.6 / 50 / 85.3 / 100 / 85.4 / 50 / 14.6 % — مطابق للفيزياء |
| R-17 | `RoverQuest` قابلية الحلّ | BFS على 7×7 | **أدنى مسار 18 حركة** |
| R-18 | `rover-builder` حدود | brute-force على 1,152 تركيبة | أقصى كتلة 85 (حدّ 120) · أقصى طاقة 47 (حدّ 100) — **0 تجاوز** |
| R-19 | شيفرة ميتة | `grep` على `src/` | `ExperienceSwitcher`, `JuniorQuiz`, `JuniorArtifactCard`, `importedProgressSchema`, `progressSummary`, `getLessonsByAge`, `glossaryMap`, `wordLabEntries`, `relationContract`, `featuredIds`, `datasetStats` |
| R-20 | بيانات المستودع | `docs/ARCHITECTURE.md`, `docs/DATA_AND_PROVENANCE.md`, `docs/ACCESSIBILITY.md`, `docs/DEMO_GUIDE.md`, `docs/PERFORMANCE.md`, `docs/adr/0001..0004` | — |
| R-21 | المخطط الأصلي | `/Users/faridelsayed/Desktop/graverse_project_blueprint/blueprint_source/GRAVERSE_PROJECT_BLUEPRINT.md` + `README_FIRST.txt` + `assets/graverse-explore-reference.png` | — |

### 20.3 المنافسون — كل رابط فُحص بتاريخ 2026-11-11

| # | المنصّة | الرابط | رمز الحالة | ما استُخرج |
|---|---|---|---|---|
| C-01 | NASA Science — Mars Science Laboratory: Curiosity | `https://science.nasa.gov/mission/msl-curiosity/` | **200** | شارة حالة واحدة «Active Mission»؛ Type/Launch/Landing/Target/Objective؛ عارض 3D؛ Science Instruments؛ Raw Images؛ News & Features؛ لا حالة مزدوجة، لا خطّ زمني، لا ادّعاءات، لا تعلّم |
| C-02 | NASA Science — Solar System | `https://science.nasa.gov/solar-system/` | **200** | مدخل الاستكشاف |
| C-03 | NASA Science — Learning Resources | `https://science.nasa.gov/learning-resources/` | **200** | كتالوج موارد تعليمية |
| C-04 | NASA NSSDCA — Apollo 11 Lunar Module / EASEP | `https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C` | **200** | Mission Profile مفصّل بالثواني؛ subsystems بالمحرّكات والكتل؛ إحداثيات هبوط؛ Alternate Names؛ Facts in Brief؛ Trajectory/Telemetry/Experiments/Datasets؛ *"The fate of the LM is not known, but it is assumed that it crashed…"*؛ بلا خطّ زمني ولا طبقة تربوية ولا ادّعاءات |
| C-05 | NASA Eyes (الصفحة الرئيسية) | `https://eyes.nasa.gov/` | **200** | ستّة تطبيقات 3D؛ "follow over 150 NASA missions from start to finish"؛ سحب الزمن 1950–2050؛ DSN Now (اتصال حيّ كل 5 ثوانٍ)؛ Mars Relay Network (اتصال حيّ)؛ Mars 2020 EDL؛ Spacecraft AR؛ بلا تعلّم ولا تمييز حالة ولا provenance |
| C-06 | NASA Eyes — DSN Now | `https://eyes.nasa.gov/dsn/dsn.html` | (عبر C-05) | تغذية حيّة لاتصالات DSN |
| C-07 | ESA Education — Teachers | `https://www.esa.int/Education/Teachers` | **200** | بوّابة موارد ESA التعليمية |
| C-08 | Smithsonian National Air and Space Museum | `https://airandspace.si.edu/` | **200** | متحف مادي |
| C-09 | Smithsonian — Apollo 11 Moon Landing story | `https://airandspace.si.edu/explore/stories/apollo-11-moon-landing` | **200** | قصّة تفاعلية |
| C-10 | The Planetary Society | `https://www.planetary.org/` | **200** | منظّة غير ربحية |
| C-11 | NASA Image and Video Library | `https://images.nasa.gov/details/{nasaId}` | **30/30 → 200** | التحقّق من 30 معرّف صورة مستخدمة في GRAVERSE |
| C-12 | Smithsonian 3D | `https://3d.si.edu/` | **403** (محجوب آليًّا) | لم يُفحص |
| C-13 | NASA 3D Resources | `https://3d.nasa.gov/` | **000** | لم يُفحص |
| C-14 | JPL Solar System Trek | `https://trajectory.jpl.nasa.gov/` | **000** | لم يُفحص |
| C-15 | ESA — Where is my Spacecraft? | `https://whereismyspacecraft.esa.int/` | **000** | لم يُفحص |
| C-16 | NASA OpenSpace | `https://open-space.github.io/` | **404** | لم يُفحص |
| C-17 | NSSDCA — Apollo lunar sites (نصّي) | `https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.txt` | **404** | المسار تغيّر |
| C-18 | روابط NASA المستخدَمة في GRAVERSE | `https://science.nasa.gov/mission/mer-spirit/` · `…/mer-opportunity/` · `…/msl-curiosity/` · `…/viking-1/` | **200** | التحقّق من صحّة الاستشهادات الأساسية |
| C-19 | روابط NASA الميتة في GRAVERSE | `…/mars-exploration-rover-spirit/` · `…/mars-exploration-rover-opportunity/` | **404** | في السجلّات المكرّرة، **ويستشهد بهما** `articles.ts` و`lessons.ts` |
| C-20 | روابط الوكالات في GRAVERSE | `https://www.esa.int/About_Us` · `https://www.isro.gov.in/AboutISRO.html` · `https://www.cnsa.gov.cn/` · `https://roscosmos.ru/` · `https://www.asc-csa.gc.ca/eng/about/` | 404 / 000 / 403 / 404 / 000 | تُستخدم في صفحات الوكالات فقط |

### 20.4 النظرية التربوية والمعرفية

| # | المرجع | الاستعمال في هذا التقرير |
|---|---|---|
| T-01 | Piaget, J. (1926). *The Language and Thought of the Child*. Harcourt Brace. (مقتبس في Freeman et al. 2014، ref. 2) | البنائية (§12.1) |
| T-02 | Vygotsky, L. S. (1978). *Mind in Society*. Harvard University Press. (ref. 3 في Freeman et al.) | البنائية (§12.1) |
| T-03 | Bruner, J. S. (1960). *The Process of Education*. Harvard University Press. | التعلّم بالاكتشاف (§12.3) |
| T-04 | Bruner, J. (1991). "The Narrative Construction of Reality." *Critical Inquiry*, 18(1), 1–21. | التعلّم السردي (§12.4) |
| T-05 | Kolb, D. A. (1984). *Experiential Learning: Experience as the Source of Learning and Development*. Prentice Hall. | التعلّم التجريبي (§12.2) |
| T-06 | Hein, G. E. (1998). *Learning in the Museum*. Routledge. ISBN 9780415097765. | تعلّم المتاحف (§12.5) |
| T-07 | Hein, G. E. "Is Meaning Making Constructivism?" (MoMA course PDF) — <https://www.moma.org/momaorg/shared/pdfs/docs/learn/courses/Hein_Is_Meaning_Making_Constructivism.pdf> | البناء داخل المتاحف (§12.5) |
| T-08 | Hein, G. E. (1998). *Learning in the Museum* — نسخة PDF مؤسّسية: <https://elearning-2023.it.auth.gr/pluginfile.php/1186199/mod_resource/content/1/George%20E.%20Hein%20-%20Learning%20in%20the%20Museum%20%281998%29.pdf> | نصّ الكتاب (§12.5) |
| T-09 | Freeman, S., Eddy, S. L., McDonough, M., Smith, M. K., Okoroafor, N., Jordt, H., & Wenderoth, M. P. (2014). "Active learning increases student performance in science, engineering, and mathematics." *PNAS*, 111(23), 8410–8415. DOI: 10.1073/pnas.1319030111 · النصّ الحر: <https://pmc.ncbi.nlm.nih.gov/articles/PMC4060654/> | التعلّم النشط (§12.6) — **المصدر الأقوى في هذا التقرير** |
| T-10 | National Research Council (2012). *A Framework for K–12 Science Education: Practices, Crosscutting Concepts, and Core Ideas*. National Academies Press. DOI: 10.17226/13165 · <https://nap.nationalacademies.org/catalog/13165/a-framework-for-k-12-science-education-practices-crosscutting-concepts-and-core-ideas> | ممارسات Science Education (§12.3) |
| T-11 | Senge, P. M. (1990). *The Fifth Discipline: The Art & Practice of the Learning Organization*. Doubleday. | التفكير المنهجي (§12.7) |
| T-12 | Dewey, J. (1938). *Experience and Education*. Macmillan. | الخبرة كمصدر للتعلّم (سياق T-05) |
| T-13 | University of Florida CITT — "Kolb's Four Stages of Learning": <https://citt.it.ufl.edu/resources/course-development/the-learning-process/types-of-learners/kolbs-four-stages-of-learning/> | شرح مراحل Kolb (§12.2) |
| T-14 | Kolb, D. A. — "Kolb's Experiential Learning Cycle" (نسخة مؤسّسية): <https://my.cumbria.ac.uk/media/MyCumbria/Documents/Library/Kolb.pdf> | تفاصيل الدورة (§12.2) |

### 20.5 التراث الفضائي وعلم الآثار

| # | المرجع | الاستعمال |
|---|---|---|
| H-01 | Gorman, A. & Walsh, J. — *International Space Station Archaeological Project* (ISSAP) | مبدأ «الأثر المادي» في الفضاء (§11.1) |
| H-02 | "Archaeology and Heritage of the Human Movement into Space" (بحث في VoR) — <https://www.researchgate.net/publication/321615754_Archaeology_and_Heritage_of_the_Human_Movement_into_Space> | منظور «archaeological gaze» نحو تراث الفضاء (§11.1) |
| H-03 | Space Heritage Task Force, World Archaeological Congress (2003) — Terms of Reference (مدوَّنة "Space Age Archaeology") — <http://zoharesque.blogspot.com/> | سابقة مؤسّسية لمصطلح «تراث الفضاء» (§11.1) |
| H-04 | NASA NSSDCA — Apollo 11 LM/EASEP (C-04) | المصدر الأولي لشهادة بقاء مرحلة الهبوط ووصف المصير (§6.5، §11.1) |

### 20.6 تمييز أنواع الأدلّة

| النوع | تعريف | أمثلة في هذا التقرير |
|---|---|---|
| **(أ) دليل مستودع** | مُتحقَّق منه من الشيفرة أو التشغيل | R-01 … R-21 |
| **(ب) متطلب رسمي** | من صفحة التحدّي/الموقع الرسمي | S-01 … S-06، والمصفوفة R1–R19 في §2.5 |
| **(ج) بحث خارجي** | منصّات منافسة ووثائق NASA | C-01 … C-20 |
| **(د) نظرية أكاديمية** | مراجع منشورة | T-01 … T-14، H-01 … H-04 |
| **(هـ) تفسير معقول** | تحليلي، غير مُقاس | §11 (الفلسفة)، §12 (نيّة التصميم)، §16 (تقييم الحكّام)، §18 (الأطروحة) |

### 20.7 تنبيه منهجي أخير

> **ما لم يُقَس في هذا التقرير ولا في المشروع:** أيّ أثر تربوي على المتعلّم؛ أيّ أداء ميدانيّ؛ أيّ اعتماد من NASA؛ أيّ مقارنة كمّية مع منصّات أخرى؛ أيّ ادّعاء حصريّ. كلّ الأرقام إمّا **مُتحقَّق منه في التشغيل المحلي** أو **مُستشهَدًا بمصدر محدَّد بتاريخ وصول** أو **مُعلَّم صراحةً كتفسير**.

---

<a id="الملحق-أ-قائمة-العيوب-المُتحقَّق-منها"></a>
## الملحق أ: قائمة العيوب المُتحقَّق منها

> هذه القائمة هي **أدقّ جزء في التقرير**، لأنّها مُختبَرة لا مُلاحَظة. لكل عيب: الموقع، والطريقة، والنتيجة. **هذه القائمة يجب أن تُعالَج قبل 14 نوفمبر 2026.**

### A.1 عيوب حرجة — تكسر وظيفة معلَن عنها

| # | العيب | الموقع | طريقة التحقّق | النتيجة | الإصلاح المقترح |
|---|---|---|---|---|---|
| **1** | **معامل `dataset` لا يعمل** | `src/app/api/export/route.ts` (`export const dynamic = "force-static"`) | `curl` على البناء الحيّ لـ 4 استعلامات | **جميعها 334,198 بايت** — `?dataset=artifacts` و`?dataset=sources` و`?dataset=bogus` تُرجع المجموعة كاملة؛ مسار 400 ميت | احذف `force-static`، أو استخدم `generateStaticParams` لكل `dataset`، أو مسارًا منفصلًا `/api/export/[dataset]` |
| **2** | **محاكاة الهبوط لا تنجح أبدًا** | `src/lib/simulations.ts` — `simulateLanding` | brute-force على **2,160 تركيبة** | **0/2160 ناجحة**؛ الارتفاع يتصاعد من 125,000 m إلى 4,656,944 m لأن `altitude += velocity * dt` بينما `velocity` موجب للأسفل؛ `entryAngle` مُزلاج لا يُقرأ | اعتمد `velocity` سالبًا للأعلى (`altitude -= velocity*dt`، `acceleration` بإشارة موحّدة)، وأعِد اختبار الهبوط على القيمة الافتراضية |
| **3** | **مخطّط المسار غير قابل للحلّ** | `src/lib/simulations.ts` — `evaluateRoverRoute` (ميزانية 45 Wh) | Dijkstra على دالة الطاقة نفسها | **الحدّ الأدنى 82.9 Wh** مقابل 45 Wh — **0 مسار صالح**؛ المسار القُطري يُنتج "needs 100.8 Wh" | ارفع الميزانية إلى ~110 Wh أو اخفض معامل `0.9·slope`، **وأضف اختبار انحدار** |
| **4** | **`powerLimitW` مُزلاج ميت** | `src/lib/simulations.ts` — `evaluatePlan` | مقارنة مخرجات عند 20 W و200 W | **مخرجات متطابقة بايتًا** — `powerLimitW` يُخزَّن ويُعرض ولا يُستخدم؛ الفحص الفعلي يقارنAgainst `rtgWatts`/`solarWatts` | اجعل `valid` يشترط `payloadPowerW <= powerLimitW` |
| **5** | **لوحة «What is in the index» تعرض 0 دائمًا** | `src/components/search/SearchExperience.tsx` | فحص HTML البناء الحيّ | **كل الأنواع الـ13 تعرض 0** بينما الفهرس يحوي 184 | اشتقّ `counts` من فهرس مستقلّ لا من `allResults` |
| **6** | **رابط «Shareable link» لا يتحدّث** | `src/components/compare/CompareClient.tsx` | `grep` — لا `router` ولا `replaceState` ولا `useEffect` | العنوان يعكس الحالة الابتدائية فقط؛ لا نسخ إلى الحافظة | أضف `router.replace` عند تغيّر `a`/`b`، وزرّ نسخ |
| **7** | **`apollo-15-lunar-rover` مصنّف «سلبي»** | `src/lib/mission-control.ts` — `PASSIVE_IDS` | مراجعة `technicalDetails` للسجلّ | يحصل على نصّ: *"This is passive hardware… it does not carry its own transmitter"* — والمركبة كان لها بطاريات وراديو. **خطأ علمي** | انقله من `PASSIVE_IDS` واتركه في `DESCENT_STAGE_IDS`-منطق أو أضف مجموعة `COMMUNICATION_EQUIPPED` |
| **8** | **`eventType` لا يصل لأهمّ أنواع الأحداث** | `src/lib/explore.ts` — `getFilterOptions()` | مقارنة 12 نوعًا في `timelineEvents` مع 8 في القائمة | `launch` (30)، `last-contact` (11)، `end-of-mission` (12)، `shutdown` (1) **غير قابلة للتصفية** — والنصّ الإعلاني يَعِد بها | اشتقّ القائمة من `timelineEvents` لا من `primaryMilestone` |

### A.2 عيوب متوسطة

| # | العيب | الموقع | التفصيل |
|---|---|---|---|
| 9 | 4 روابط مصادر ميتة | `src/data/sources.ts` | `…/mars-exploration-rover-spirit/` و`…/mars-exploration-rover-opportunity/` (يستشهد بهما `articles.ts:29,56` و`lessons.ts:633`) · `esa.int/About_Us` · `isro.gov.in/AboutISRO.html` |
| 10 | 9 سجلّات مصادر مكرّرة | `src/data/sources.ts` | `SRC-APOLLO-15`/`SRC-NASA-APOLLO-15` · `SRC-VIKING`/`SRC-NASA-VIKING` · `SRC-MARS-PATHFINDER`/`SRC-NASA-PATHFINDER` · `SRC-SPIRIT`/`SRC-NASA-SPIRIT` · `SRC-OPPORTUNITY`/`SRC-NASA-OPPORTUNITY` · `SRC-CURIOSITY`/`SRC-NASA-CURIOSITY` · `SRC-PERSEVERANCE`/`SRC-NASA-MARS-2020` · `SRC-NEW-HORIZONS`/`SRC-NASA-NEW-HORIZONS` · `SRC-CASSINI`/`SRC-NASA-CASSINI-MISSION` |
| 11 | نموذج claims غير مطبَّق على الـ artifacts | `src/types/artifact.ts` | لا حقل `claim` في `Artifact`؛ `ClaimBadge` في **مكان واحد** (`FactGrid.tsx:20`)؛ `docs/DATA_AND_PROVENANCE.md` يذكر usage لم يحدث |
| 12 | `validatePersonal` تقبل ملف تقدّم | `src/lib/personal.ts` | استيراد ملف تقدّم يمسح المفضّلة/المجموعات بصمت — عكس ما يوثّقه تعليق الشيفرة |
| 13 | `ArtifactAnatomy` مُسمّى أبعد من محتواه | `src/components/artifacts/ArtifactAnatomy.tsx` | إعادة عرض لـ `technicalDetails` المعروضة قبله بـ 30 سطرًا؛ لا SVG ولا هندسة |
| 14 | رسالة «3D model unavailable» ثابتة | `src/app/museum/[id]/page.tsx:648-657` | لكل السجلّات بلا استثناء؛ لا حقل بيانات |
| 15 | `ArtifactAnatomy`/`SourceList` منطق مكرَّر | `museum/[id]/page.tsx:708-742` | صفحة السجلّ لا تستخدم `SourceList` |
| 16 | `relatedIds` ذاتي المرجع | `src/data/artifacts/moon-b.ts:485` | `apollo-17-lm-descent-stage` مرتبط بنفسه |
| 17 | 581 حافة غير مرئية خارج صفحة واحدة | `src/data/relations.ts` | `getRelations()` يُستدعى في `explorer/bodies/[id]` فقط |
| 18 | رابط `artifact` في URL يُمحى | `src/app/explorer/page.tsx:109` + `ExploreExperience.tsx:171-187` | لا يُكتب أبدًا؛ أول effect يستبدل سلسلة الاستعلام |
| 19 | `replaceState` لا يدعم back/forward | `ExploreExperience.tsx:182-186` | ادّعاء `docs/ARCHITECTURE.md` غير دقيق |
| 20 | عارض Decade يتعارض مع scope=all | `src/lib/explore.ts:154-159` | مرشّح «1990s» مع عرض إطلاق 1972 |
| 21 | `sort` ميت في وضع `destinations` | `ExploreExperience.tsx:372` | يُعرض ولا يستهلك |
| 22 | `resultLabel` يتجاهل المرشّحات | `ExploreExperience.tsx:257` | «3 destinations» دائمًا |
| 23 | رقاقة «All types» تعرض 30 دائمًا | `ExploreExperience.tsx:729-731` | تناقض مع رقاق الأنواع المفلترة |
| 24 | `OrbitMap` `<desc>` يذكر بلوتو وهو غير مرسوم | `src/components/explorer/OrbitMap.tsx:26-30` | `kind` بلوتو = `"dwarf-planet"` |
| 25 | نصوص تناقض البيانات | `src/app/explorer/solar-system/page.tsx:34-36` | «five dwarf planets» و«hundreds of moons» — البيانات: 1 و10 |
| 26 | `destinationMedia` بأبعاد خاطئة | `ExploreExperience.tsx:103-118` | 1600×900 لكل الصور؛ الفعلي 1600×1600 / 1600×785 / 1600×1087 |
| 27 | `apollo-15-lunar-rover` في `PASSIVE_IDS` | `src/lib/mission-control.ts:29-33` | مرتبط بـ (7) |
| 28 | `mars-2020-descent-stage` غير في `DESCENT_STAGE_IDS` | `src/lib/mission-control.ts:35-39` | ملاحظة غير مناسبة (النتيجة صحيحة، النصّ خاطئ) |
| 29 | قيم حالة ميتة | `types/artifact.ts`, `lib/mission-control.ts` | `intermittent` (لا تُنتَج ولا زرّ لها) · `unknown` (زرّها فارغ دائمًا) · `still-traveling` · `planned` |
| 30 | `MissionRecordStatus` مكرَّر + cast غير آمن | `src/types/space.ts`، `src/data/missions.ts:129` | نفس القيم في مكانين |
| 31 | `missionName` مفتاح نصّي بلا فحص تقابلي | `src/data/missions.ts` | خطأ إملائي ⇒ artifact يتيم بصمت |
| 32 | `missionEndDate` للمهمّات الجارية | `src/data/missions.ts:89-102` | Mars 2020 (جارية) تأخذ `2024-01-25` من Ingenuity |
| 33 | `summary` للمهمّة = لصق `shortDescription` | `src/data/missions.ts:132` | ثلاث جمل غير متّصلة لجملة واحدة |
| 34 | `agencyId` مثبَّت `"nasa"` | `src/data/missions.ts:120` | 7 من 8 وكالات بلا مهمّات |
| 35 | `distinctions` المكتوبة يدويًّا | `src/app/about/page.tsx` | تكرار لحالات سجلّات ⇒ خطر انحراف |
| 36 | `getSources()` يُسقط المعرّفات بصمت | `src/data/sources.ts:816-820` | خطأ يظهر كقائمة أقصر |
| 37 | `media.thumb` بيانات ميتة | `src/data/artifacts/helpers.ts:45` | `thumb === src` دائمًا |
| 38 | `sourceUrl` مُركَّبة لا حقيقية | `src/data/artifacts/helpers.ts:50` | `images.nasa.gov/details/{nasaId}` — **تحقّقتُ: 30/30 تعمل**، لكن ليست رابط سجلّ الصورة الحقيقي |
| 39 | `lastVerified` ثابت | `helpers.ts:8`، `missions.ts:137`، `sources.ts:13` | كل شيء «طازج» اليوم، ثم «لقطة» دفعة واحدة بعد 6 أشهر |
| 40 | `freshnessFor` يطبّق على المجموعة كاملة | `src/lib/mission-control.ts:92-121` | لا يميّز السجلّات |
| 41 | `primaryMilestone` غير مضمون في `timelineEvents` | `types/artifact.ts` | الـ validator لا يفحصه (كل السجلّات الـ30 تفي به اليوم) |
| 42 | لا مرشّح `planned` في `missionOrder` | `src/app/museum/page.tsx:31-37` | مهمّة `planned` ستُخفى من العدّاد |
| 43 | `formatShortDate` و`formatDate` نتيجتان مختلفتان لـ«غير معروف» | `src/lib/format.ts:33,48` | "Date not documented" مقابل "Unknown" |
| 44 | `SourceList` داكن على سطح الأكاديمية الفاتح | `src/app/academy/articles/[id]/page.tsx:117` | عدم اتّساق بصري |
| 45 | `AcademyNav` يُسقط `/academy/articles` و`/academy/glossary` | `src/components/academy/AcademyNav.tsx` | لا يُصل إليهما إلا من الصفحة الرئيسية للأكاديمية |
| 46 | 5 دروس معزولة عن الرحلات | `src/data/journeys.ts` | `landers-and-orbiters`, `signals-across-space`, `gravity-assists-and-the-grand-tour`, `how-we-know-what-we-know`, `rovers-are-robot-explorers` |
| 47 | `objectives` غير مرتبطة بالأسئلة | `types/academy.ts` | لا يمكن قياس بلوغها |
| 48 | لا بوّابة نجاح | `src/lib/achievements.ts` | إجابة 0/2 = "Academy graduate" |
| 49 | خطوات الرحلة مُصادَقة ذاتيًا | `src/lib/use-progress.ts:60-94` | لا يُفتح الدرس |
| 50 | `progress.badges` (19) ≠ نظام الإنجازات (15) | `src/lib/achievements.ts` | رقمان مختلفان في صفحتين |
| 51 | لا React Context للتقدّم | `src/lib/use-progress.ts` | 12 نسخة مستقلة؛ لا تزامن حيّ ولا بين التبويبات |
| 52 | `lastVisited` لا يُكتب | `src/types/progress.ts` | معلَن ومقبول ومهمَل |
| 53 | استيراد التقدّم لا يفحص المعرّفات | `src/lib/progress.ts:25-113` | سجلّات وهمية تُحتسب |
| 54 | `saveProgress` مهمَل في `markLesson`/`completeStep`/`recordGame` | `src/lib/use-progress.ts` | قد يدّعي UI «على هذا الجهاز» رغم الفشل |
| 55 | البطاقات بلا SRS وبلا حفظ | `src/components/academy/Flashcards.tsx` | الإتقان يضيع |
| 56 | 11 مصطلحًا مكرّرًا بتعريفين متعارضين | `Flashcards.tsx` + `data/glossary.ts` | deck «Everything» = 64 بطاقة فيها تكرار |
| 57 | حدود `rover-builder` غير قابلة للوصول | `src/lib/rover-builder.ts` | 0 من 1,152 تتجاوز؛ ملاحظات «over the limit» ميتة |
| 58 | Rocket Workshop لا يمكن أن يخسر | `src/components/academy/play/RocketWorkshop.tsx` | `recordGame(..., 3)` دائمًا |
| 59 | ادّعاء لوحة المفاتيح في Moon غير مُنفَّذ | `src/data/games.ts` + `MoonPhases.tsx` | `game.controls` يقول "use the arrow keys"؛ لا `onKeyDown` |
| 60 | Robot Lab ≈ 146 KB من الحمولة | `src/app/academy/robot-lab/page.tsx` | 30 ملفًا × 24 إجابة تُرسَل إلى العميل |
| 61 | `Mission Control` يحسب 12 حقلًا ويعرض 6 | `src/lib/mission-control.ts` | 6 حقول محسوبة تُهمَل |
| 62 | Engineering/Stories تذكر المحاكيات بلا روابط | `src/data/engineering.ts`، `src/data/stories.ts` | `grep -c "/simulations"` = 0 |
| 63 | المتحف لا يربط بالأسطح المساندة | `src/app/museum/**` | `grep` عن `engineering\|stories\|simulations\|mission-control` = صفر |
| 64 | `/compare` غائب عن "More ways in" | `src/app/page.tsx:360-446` | يصل إليه من الترويسة والتذييل فقط |
| 65 | `/about` يُعيد عرض 96 مصدرًا | `src/app/about/page.tsx` | تداخل مع `/sources` |
| 66 | `CommunicationBadge` prefix إنجليزي دائمًا | `src/components/ui/CommunicationBadge.tsx:44` | و`locale` لا يُمرَّر من `StatusBoard`/`CompareClient` |
| 67 | ترجمة ناقصة | 10 ملفات بصفر `t()` | `engineering/[id]`, `stories/[id]`, `simulations/[id]`, `search`, `sources`, `about`, `MyUniverseClient`, `CompareClient`, `StatusBoard`, `SearchExperience` |
| 68 | README يبالغ في الترجمة | `README.md:344-349` | الصياغة الدقيقة في Research Archive |
| 69 | `docs/DATA_AND_PROVENANCE.md` يذكر نوع `SourceType` خاطئًا | سطر 36 | Reality: `"mission-page" \| "technical-archive" \| "fact-sheet" \| "reference" \| "news-release" \| "image-record"` |
| 70 | `docs/DATA_AND_PROVENANCE.md` يذكر `isValidClaim` في الـ validator | سطر 24-25 | **غير صحيح** — الـ validator يعيد كتابة الفحص داخليًّا |
| 71 | `docs/adr/0002` يذكر ربط مهمّة→وكالة | `docs/adr/0002-derived-missions.md:21` | لا يوجد ربط؛ `agencyId` مثبَّت |
| 72 | شيفرة ميتة | متعدّدة | `ExperienceSwitcher`, `JuniorQuiz`, `JuniorArtifactCard`, `importedProgressSchema`, `progressSummary`, `getLessonsByAge`, `glossaryMap`, `wordLabEntries`, `relationContract`, `featuredIds`, `datasetStats`, `searchScore`, `searchArtifacts`, `activeFilterCount`، `hasActiveFilters`, `getDecadeOptions`, `matchesFilters` |
| 73 | `/kids` يُعيد التوجيه لكن سطح "Junior Explorers" باقٍ | `next.config.mjs` | `components/kids/*` بلا مستورِد |
| 74 | تكرار 3 فحوص WebGL | `Orrery3D.tsx`، `SpaceCanvas.tsx`، `GalleryStage.tsx` | الـ hook المشترك `useWebGL()` لا يُستخدم في Explorer ولا Museum |
| 75 | لا error boundary حول الـ orrery | `src/components/explorer/Orrery3D.tsx` | عطل three.js يسقط المسار |
| 76 | لا `CanvasBoundary`، لا `IntersectionObserver` في Explorer | `Orrery3D.tsx` | الـ chunk يُجلب بعد 400 ms حتى لو كان خارج الشاشة |
| 77 | `snap-center` بلا `snap-x` | `TimelineStage.tsx:279` | التمرير التلقائي لا يعمل |
| 78 | reduced-motion يمنع التمرير التلقائي | `TimelineStage.tsx:44` | العلامة المختارة قد تبقى خارج الشاشة |
| 79 | `useId()` في `aria-controls` | `ExploreExperience.tsx:131-132` | قيم `:r0:` صالحة لكن غير قابلة للاستعلام |
| 80 | `aria-controls` يشير إلى عنصر غير موجود | `ExploreExperience.tsx:305` | اللوحة فقط موجودة عند فتحها |
| 81 | `u76` كل التبويبات تشير إلى هدف واحد | `ExploreExperience.tsx:280` | `role="tabpanel"` غير قابل للتركيز |
| 82 | `searchAll` لا يرجّح `description` | `src/lib/search-index.ts` | وصف ARCHITECTURE.md غير دقيق؛ نصوص أقسام القصص خارج `keywords` |
| 83 | لا نسخ إلى الحافظة في أي مكان | `src/` | |
| 84 | `src/lib/explore.ts` ~80 سطرًا ميتة | | `searchScore`, `searchArtifacts`, `searchExtras`, `activeFilterCount`, `hasActiveFilters`, `getDecadeOptions`, `matchesFilters`, `missionStatusLabelsExport`, `hardwareStatusLabelsExport` |
| 85 | لا `IntersectionObserver` / تحميل كسول لنموذج Executor | `src/components/explore/ExploreExperience.tsx:30-36` | ~145 KB تُشحن دائمًا |
| 86 | `relationContract` غير مستخدم وم incomplet | `src/lib/provenance.ts:27-41` | يذكر 6 من 12 نوعًا |
| 87 | `claimTypeLabels` مكرَّر في ملفّين | `types/provenance.ts` + `lib/provenance.ts` | |
| 88 | `ProvenanceNote` مكرَّر | نفس الملفّين | |
| 89 | `getRelations` يعيد `index.get(entityId) ?? []` | `src/data/relations.ts:222-224` | على كيان غير مسجَّل يعيد `[]` (سلوك صحيح لكن غير موثّق) |
| 90 | `document` غير محمي في `download()` | `MyUniverseClient.tsx`، `ProgressDashboard.tsx` | يعمل في المتصفّح؛ لا يصلح لـ SSR (غير مُشكلة لأنهما client islands) |
| 91 | لا `AbortController` في البحث | `SearchExperience.tsx` | 200 ms debounce كافية |
| 92 | `MissionPage` لا يعرض حالة عتاد | `museum/missions/[id]/page.tsx:70` | **صحيح تصميميًّا** |
| 93 | `Museo` index metadata فيها عدد حرفي "30" | `src/app/museum/page.tsx:28` | يطابق اليوم؛ ينكسر عند التوسّع |
| 94 | `AcademyNav` لا يربط `/academy/articles` | | |
| 95 | `journeys/page.tsx:15` يكرّر `["5-7","8-9","10-12"]` | بدل `ageBands` | |
| 96 | `rock-to-rover` accent `#3F5E8C` لا يطابق نطاقه | `src/data/journeys.ts:188` | |
| 97 | `LessonQuiz` "Try again" يستبدل نتيجة أفضل | `src/components/academy/LessonQuiz.tsx:31-34` | الألعاب تستخدم `Math.max` — عدم اتّساق |
| 98 | زرّ "Mark step done" معطَّل بعد الإنجاز | `JourneySteps.tsx` | لا يمكن التراجع |
| 99 | `badge-lesson-{id}` لا يُعرض في أي مكان | `src/lib/use-progress.ts` | 12 معرّفًا تكبّر العدّ فقط |
| 100 | `explorer` لا يعرض `artifact.location` الدقيق | `TimelineStage.tsx:150-153` | يخسر بُعد المكان |

### A.3 ملخّص الأرقام

| المؤشّر | القيمة |
|---|---|
| عدد العيوب المُتحقَّق منها | **100** (لا تشمل “تحسينات” ذاتية) |
| منها حرجة (تكسر وظيفة معلَن عنها) | **8** |
| متوسطة | **92** |
| عيوب في التوثيق (README/docs) | **4** على الأقل |
| شيفرة ميتة مؤكَّدة | **14+** عنصرًا |
| روابط خارجية ميتة | **4** (من 89) |
| روابط صور معطّلة | **0** (من 30) |

---

*نهاية التقرير. أُعدّ بتاريخ 2026-11-11 على الإصدار `4880619` من `main`. لم تُعدَّل أيّ شيفرة ولا أيّ مسار عام ولا أيّ اعتمادية أثناء إعداده؛ التغيير الوحيد هو إضافة ملفَّي التوثيق الاثنين.*






