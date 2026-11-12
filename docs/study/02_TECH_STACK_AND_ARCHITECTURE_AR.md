# التقنية والبنية

## المكدس

Next.js `14.2.35` مع App Router، React `18.3.1`، TypeScript strict، Tailwind `3.4.19`، Three.js وReact Three Fiber/Drei، Zod، Lucide، و`next/font/local` مع Inter. الإصدارات في `package.json`.

## دورة الطلب

ملف route في `src/app` يقرأ البيانات المحلية ويعرض Server Component افتراضيًا. الصفحات التفاعلية تستورد مكونات `use client`. روابط `[id]` تتحقق من السجل وتعرض `notFound()` عند الغياب. `generateStaticParams` مستخدم في صفحات البيانات المناسبة. `layout.tsx` يثبت الخط والـ header/footer والثيم واللغة.

## البيانات والواجهة

`src/data` مصدر الحقيقة؛ `src/types` العقود؛ `src/lib` عمليات البحث والترشيح والتقدم والمصادقية؛ `src/components` عرض قابل لإعادة الاستخدام. هذا الفصل يمنع أن تصبح الصفحة مخزنًا ثانيًا للحقائق.

## التصميم

CSS variables في `globals.css` تقود ألوان Tailwind. `ExperienceTheme` يغير ثيم Academy دون كسر الهوية. `MotionToggle` و`use-reduced-motion` يحترمان تفضيل الحركة. `next/image` وAVIF/WebP مفعّلان في `next.config.mjs`.

## 3D

`SpaceCanvas`, `SpaceScene`, `Orrery3D/OrreryScene`, وواجهات Academy تستخدم R3F/Three. `use-webgl` يتيح fallback مناسبًا. المشاهد تعليمية/استكشافية وليست مصدرًا علميًا بديلًا.

## الجودة

CI يشغّل `validate`, `test:data`, lint, build, typecheck، smoke/axe، journeys وlink-check. `scripts/verify.mjs` يجمع بوابات التحقق محليًا. لا تُذكر نتائج تشغيل غير موثقة؛ اشرح الأوامر كآلية الجودة.

## التوجيهات والبدائل

الـ redirects تحفظ `/explore`, `/kids`, `/museum/timeline`. إزالة Next.js تكسر routing/build؛ إزالة TypeScript تضعف عقود البيانات؛ إزالة Zod تزيل بوابة runtime؛ إزالة React Three Fiber تزيل المشاهد لا المحتوى.
