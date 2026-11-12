# المقابلة التقنية والعرض الحي

## Walkthrough من خمس دقائق

1. افتح `/` وقل الأطروحة لا قائمة الميزات.
2. افتح Museum artifact، أظهر mission status وhardware status وsource.
3. افتح Explorer لنفس السجل، استخدم filter/event.
4. افتح Academy lesson/quiz، وضح أن progress محلي.
5. افتح `/sources` أو `/api/export` عند سؤال المصداقية.

## Walkthrough الكود

ابدأ `src/types/artifact.ts` ثم `src/data/artifacts/index.ts`، ثم `src/lib/explore.ts`، ثم route `museum/[id]` وcomponents/artifacts. بعدها `lib/provenance.ts` وschemas. هذا يثبت contract → data → derived logic → UI.

## أسئلة تنفيذية

اشرح لماذا Server Components افتراضية، ولماذا client فقط عند state/browser/WebGL. أظهر أن query parameters لا تُقبل بلا validation. أشر إلى `generateStaticParams` و`notFound`. لا تقرأ ملفات عشوائية أثناء العرض.

## خطة فشل

إذا فشل WebGL: انتقل إلى Museum. إذا كان مصدر خارجي بطيئًا: استخدم `/sources` وقل إن الروابط provenance وليست dependency وقت التشغيل. إذا فشل storage: اشرح local fallback. إذا كان سؤالًا خارج البيانات: unknown.

## قائمة قبل العرض

ثبّت build، افتح المسارات الثلاثة، جرّب redirect، جرّب filter، قل status distinction، اعرف حدود dataset، ولا تعرض أسرار `.env`.
