# الغوص في التجارب الثلاث

## Academy — Learn

`src/app/academy` و`components/academy` تقدمان lessons بعمر `5-7`, `8-9`, `10-12`، objectives، quizzes، journeys، flashcards، glossary، articles، progress، achievements، certificate، build-rover وPlay. التقدم محلي عبر `use-progress`/`progress.ts`؛ هو تكييف تعليمي لا حساب رسمي.

## Museum — Understand

`/museum` يبرز الوجهات والقطع، و`/museum/[id]` قالب السجل: الهوية، الغرض، timeline، status، fate، location، contributions، technical details، sources والقطع المرتبطة. صفحات missions وagencies توسع السياق.

## Explorer — Discover

`/explorer` يقرأ `searchParams` للعرض والنطاق والترتيب والوجهة والنوع وحالات المهمة/العتاد والعقد والزمن والحدث. `lib/explore.ts` ينفذ normalize/search score/filter/sort/timeline entries. `Orrery3D` و`OrbitMap` يضيفان المكان والعمق البصري؛ deep-sky وsolar-system/bodies يوسعان الكون.

## لماذا ثلاث طرق؟

التعليم يحتاج تسلسلًا وتغذية راجعة؛ المتحف يحتاج هوية وسياقًا ومصدرًا؛ المستكشف يحتاج مقارنة واستعلامًا. إعادة استخدام نفس السجلات يحافظ على الاتساق، مع اختلاف الواجهة لا الحقيقة.

## مسار العرض

ابدأ Homepage → Explorer أو Museum → artifact detail → mission/source → Academy lesson أو simulation. في العرض الحي، لا تفتح عشرات الصفحات؛ أثبت انتقالًا واحدًا واضحًا من سؤال إلى دليل.
