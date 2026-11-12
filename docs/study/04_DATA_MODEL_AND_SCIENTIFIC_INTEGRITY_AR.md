# نموذج البيانات والنزاهة العلمية

## السجل canonical

`Artifact` في `src/types/artifact.ts` يجمع الهوية، المهمة/البرنامج، الوجهة، النوع، الوصف والغرض، حالتي المهمة والعتاد، التواريخ، الحدث الأساسي والأحداث، المساهمات العلمية/الهندسية، المصير والموقع، التفاصيل التقنية، الوسائط، العلاقات، المصادر، تاريخ التحقق، وملاحظات البيانات.

## الحالة

`MissionStatus`: planned/ongoing/completed/ended/lost-contact/unknown. `HardwareStatus`: operating/inactive/no-longer-communicating/impacted/destroyed/still-traveling/unknown. النص الأصلي محفوظ في `*Original`؛ التطبيع لا يمحو لغة المصدر.

## المصدر والادعاء

كل event يحمل `sourceIds`. `SourceRecord` يحمل المؤسسة والعنوان والرابط والنوع وتاريخ الوصول. `ClaimType` يميز confirmed وestimated وsimulated وunknown، وتصف `claimTypeDescriptions` معنى كل نوع. المفقود `undefined` لا يُملأ بصورة وهمية.

## التحقق

`artifactSchema` وschemas للأجسام والدروس تفرض IDs وURLs وتواريخ وأنواعًا وقيمًا غير فارغة. `scripts/validate-data.ts` يربط السجلات والمصادر والعلاقات. اختبارات البيانات تمنع duplicate IDs والروابط المكسورة وعدم اتساق الإحصاءات.

## العلاقات

`relatedIds`, missions, sources, bodies وjourneys تربط الكيانات دون نسخ القصة في كل صفحة. `data/artifacts/index.ts` يجمع ستة ملفات ويصنع Map للوصول بالـ ID، ثم يرتب زمنيًا.

## الاتصال والحداثة

`mission-control.ts` يشتق communication من hardware status مع استثناءات للعتاد السلبي ومراحل الهبوط. الملاحظة تقول صراحة إنه استنتاج لا telemetry. `freshnessFor` يصنف current/recent/snapshot حسب `lastVerified`.

## جواب السلامة

«موثّق» يعني أن السجل يشير إلى مصدر، لا أن كل تاريخ علمي أعيد تدقيقه في التطبيق. أمام سؤال خارج المجموعة: نقول unknown أو limitation بدل اختراع رقم.
