# خريطة المستودع

## الجذر

`package.json` scripts/dependencies؛ `package-lock.json` reproducibility؛ `next.config.mjs` redirects/images/dist؛ `tsconfig.json` strict/path alias؛ `tailwind.config.ts` tokens؛ `postcss.config.mjs` CSS؛ `.env.example` المتغيرات؛ `.github/workflows/ci.yml` CI.

## التطبيق

`src/app`: routes وlayouts وerror/loading/not-found وAPI. المجموعات: `academy`, `museum`, `explorer`; الأسطح: `about`, `compare`, `engineering`, `mission-control`, `my-universe`, `research`, `search`, `simulations`, `sources`, `stories`.

## المكونات

`layout` header/footer/theme/language/motion؛ `artifacts` بطاقات وتفاصيل؛ `academy` دروس وتقدم وألعاب؛ `museum` gallery؛ `explorer` filters/orbits؛ `three` scenes؛ `simulations`؛ `kids` legacy/robot surfaces؛ `ui` badges/source/empty/reveal.

## البيانات

`data/artifacts/{moon-a,moon-b,mars-a,mars-b,deep-a,deep-b}.ts` السجلات؛ `index.ts` التجميع والفهارس والإحصاءات؛ `sources.ts` المصادر؛ `missions.ts`, `relations.ts`, `stories.ts`, `engineering.ts`, `simulations.ts`, `lessons.ts`, `journeys.ts`, `articles.ts`, `research.ts`, `glossary.ts`, `games.ts`, `kids.ts`; `space/*` أجسام ومؤسسات وdeep sky.

## المنطق والأنواع

`lib/schemas.ts` Zod؛ `provenance.ts` claim labels؛ `explore.ts` search/filter/timeline؛ `mission-control.ts` communication/freshness؛ `progress.ts` و`personal.ts` local state؛ `robot*`, `rover-*`, `simulations.ts` تعليم/محاكاة؛ `i18n.ts` و`locale.ts` اللغة؛ `achievements.ts` badges.

## التحقق والأصول

`tests/data.test.ts` اختبار البيانات. `scripts/validate-data.ts` و`smoke.mjs`, `journeys.mjs`, `link-check.mjs`, `perf.mjs`, `verify.mjs`; `public/images` الصور المحلية؛ `src/fonts` الخط.
