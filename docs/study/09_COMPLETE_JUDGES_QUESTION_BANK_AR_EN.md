# بنك أسئلة الحكام — 260 سؤالًا وإجابة

الإجابة المختصرة أدناه قابلة للتوسيع في العرض. الدليل بين قوسين هو موضع التحقق. لا تستخدم إجابة أطول من الدليل.

## المشكلة والمنتج (1–40)

1. **ما المشكلة؟** A: المعلومات موزعة؛ GRAVERSE يصل العتاد بالمهمة والعلم. (challenge brief; `src/app/page.tsx`)
2. **ما GRAVERSE؟** A: متحف رقمي تفاعلي بثلاث تجارب. (`src/app/page.tsx`)
3. **لماذا «متروك»؟** A: الترك يفتح قصة الإرث، لا يعني أن كل شيء ميت. (`types/artifact.ts`)
4. **هل هو catalog؟** A: مجموعة منتقاة ذات سرد، لا جرد كامل.
5. **من الجمهور؟** A: طلاب، زوار، باحثون ومعلمون.
6. **ما الوعد؟** A: الانتقال من الشيء إلى المهمة إلى الاكتشاف إلى المصدر.
7. **ما التجارب الأساسية؟** A: Academy، Museum، Explorer.
8. **لماذا ثلاث؟** A: لكل واحدة هدف معرفي مختلف.
9. **ما الدليل على أنها منفصلة؟** A: routes/components وبيانات مشتركة.
10. **ما أول صفحة؟** A: `/`.
11. **ما القيمة التعليمية؟** A: lessons وquizzes وjourneys وage bands.
12. **ما القيمة البحثية؟** A: sources وclaims وexport.
13. **هل المنتج لعبة؟** A: ليس فقط؛ الألعاب طبقة Academy.
14. **هل هو محاكاة؟** A: توجد محاكيات تعليمية، وليست المنتج كله.
15. **لماذا لا تستخدم NASA API؟** A: التطبيق يعتمد collection محلية متحققة وثابتة.
16. **هل يغطي كل NASA؟** A: لا، وهذا حد معلن.
17. **لماذا Moon/Mars/deep space؟** A: ثلاثة سياقات مختلفة للإرث.
18. **ما المخرج الأساسي؟** A: فهم قصة العتاد، لا حفظ قائمة.
19. **كيف تبدأ القصة؟** A: Artifact record مع purpose وevents.
20. **كيف تنتهي؟** A: fate/status/source.
21. **ما الميزة الأهم؟** A: فصل mission/hardware status.
22. **هل التميز بصري؟** A: لا؛ البنية الدلالية أهم.
23. **ما الذي لا تدعيه؟** A: live telemetry أو complete census.
24. **هل هناك مصادر؟** A: كل record يحمل source IDs.
25. **ما دور Stories؟** A: سرد السجل بلغة أقرب للقارئ.
26. **ما دور Research؟** A: سياق بحثي ومصادر.
27. **ما دور Compare؟** A: رؤية الفروق بين سجلات.
28. **ما دور My Universe؟** A: تخصيص محلي بلا حساب.
29. **ما دور Mission Control؟** A: لوحة حالة مشتقة.
30. **ما دور Engineering؟** A: شرح لماذا صُمم العتاد.
31. **هل الجمهور متخصص؟** A: لا؛ الواجهات تبدأ من المفاهيم.
32. **كيف تخدم الأطفال؟** A: Academy age bands وPlay.
33. **هل العربية موجودة؟** A: i18n وlocale وLanguageToggle يدعمانها.
34. **هل كل المحتوى مترجم؟** A: لا تفترض اكتمالًا دون فحص النص.
35. **هل البيانات حية؟** A: لا؛ هي snapshot بتاريخ تحقق.
36. **ما المعيار الأخلاقي؟** A: عدم تحويل المجهول إلى حقيقة.
37. **كيف تشرح النجاح؟** A: قصة قابلة للاستكشاف ومسنودة.
38. **ما أصعب قرار؟** A: فصل الحالات وحفظ النص الأصلي.
39. **ما أكبر خطر؟** A: الإفراط في الوعود أو اتساع البيانات.
40. **ما العرض الأفضل؟** A: سجل واحد عبر Museum ثم Explorer ثم source.

## البيانات والدقة (41–90)

41. **ما Artifact؟** A: العقد canonical في `src/types/artifact.ts`.
42. **ما الوجهة؟** A: `moon|mars|deep-space`.
43. **ما أنواع العتاد؟** A: rover, lander, orbiter, probe, instrument, surface-equipment, aircraft.
44. **ما MissionStatus؟** A: حالة المهمة المطبّعة.
45. **ما HardwareStatus؟** A: حالة الشيء نفسه.
46. **لماذا Original؟** A: لحفظ لفظ المصدر.
47. **ما event؟** A: حدث مؤرخ مع precision ووصف ومصادر.
48. **ما precision؟** A: day/month/year.
49. **كيف تحفظ المساهمة؟** A: science أو engineering contribution.
50. **كيف تحفظ الموقع؟** A: body/name/precision/note.
51. **كيف تتعامل مع صورة مفقودة؟** A: media optional، لا placeholder ملفق.
52. **كيف ترتبط القطع؟** A: `relatedIds`.
53. **كيف ترتبط المصادر؟** A: `sourceIds`.
54. **ما lastVerified؟** A: تاريخ لقطة التحقق.
55. **ما dataNotes؟** A: حدود وملاحظات السجل.
56. **ما SourceRecord؟** A: organization/title/url/type/accessedAt.
57. **ما ClaimType؟** A: confirmed/estimated/simulated/unknown.
58. **ماذا يعني confirmed؟** A: مصدر يصرح به مباشرة.
59. **estimated؟** A: تقريب/نطاق أو model-derived.
60. **simulated؟** A: حساب التطبيق لا observation.
61. **unknown؟** A: لا يثبت السجل القيمة.
62. **أين توصف هذه؟** A: `src/types/provenance.ts`.
63. **كيف تمنع schema فسادًا؟** A: Zod يفرض types وrequired fields.
64. **هل schema يثبت صحة NASA؟** A: لا؛ يثبت شكل/اتساق السجل.
65. **كيف تمنع ID مكررًا؟** A: validate/tests.
66. **كيف يجمع artifacts؟** A: index يستورد ستة ملفات.
67. **كيف يتم lookup؟** A: Map keyed by id.
68. **كيف يرتب؟** A: launch أو primary milestone date.
69. **كيف تحسب stats؟** A: `datasetStats` من المجموعة نفسها.
70. **هل الرقم ثابت يدويًا؟** A: stats مشتقة، مع lastVerified.
71. **ما مصدر الحقائق؟** A: NASA mission pages وNSSDCA records كما يوضح النوع.
72. **هل كل claim له مصدر منفرد؟** A: events/sources IDs؛ راجع السجل.
73. **هل الرابط يضمن بقاء المصدر؟** A: لا؛ الوصول يُسجل.
74. **كيف تقول إن المعلومة حديثة؟** A: freshness snapshot، لا live.
75. **ما current؟** A: تحقق خلال 30 يومًا.
76. **recent؟** A: خلال ستة أشهر.
77. **snapshot؟** A: أقدم من ذلك.
78. **هل هذه السياسة علمية؟** A: سياسة عرض للحداثة، لا معيار صحة.
79. **ما unknown المفيد؟** A: يمنع ثقة زائفة ويكشف فجوة بحث.
80. **لماذا لا تملأ كل الحقول؟** A: المفقود أفضل من fabricated.
81. **ما الفرق بين image credit/sourceUrl؟** A: credit attribution وsourceUrl provenance.
82. **هل الصورة قياس؟** A: لا، media سياق بصري.
83. **هل location exact دائمًا؟** A: لا، precision يصرح approximate/region/unknown.
84. **ما علاقة dataNotes؟** A: تشرح القيود بدل إخفائها.
85. **هل export يغيّر المصدر؟** A: يصدّر dataset محددًا.
86. **هل توجد قاعدة بيانات؟** A: لا؛ static typed data.
87. **هل Zod server-only؟** A: schema library مستخدمة للتحقق build/script.
88. **ماذا تفعل عند خلاف مصدرين؟** A: تحفظ صياغة/ملاحظة وتعرض uncertainty.
89. **هل status normalized؟** A: نعم، مع original.
90. **ما الإجابة عند سؤال غير مدعوم؟** A: unknown/limitation مع مصدر أقرب.

## المعمارية (91–140)

91. **ما إطار التطبيق؟** A: Next.js App Router.
92. **ما React؟** A: 18.3.1.
93. **هل TypeScript strict؟** A: نعم في tsconfig.
94. **ما alias؟** A: `@/*` إلى `./src/*`.
95. **ما default في route؟** A: Server Component.
96. **متى use client؟** A: state/browser/WebGL/events.
97. **ما layout؟** A: font، theme، locale، header/footer.
98. **ما error/loading؟** A: route-level UX للحالات.
99. **ما not-found؟** A: مسار ID غير موجود.
100. **ما generateStaticParams؟** A: بناء صفحات IDs المعروفة.
101. **كيف تتعامل searchParams؟** A: explorer/search/lessons تقرأ وتتحقق.
102. **ما distDir؟** A: قابل للعزل عبر env في next config.
103. **ما redirects؟** A: توافق explore/kids/museum timeline.
104. **ما image optimization؟** A: next/image وAVIF/WebP.
105. **ما Tailwind؟** A: utilities مرتبطة CSS variables.
106. **لماذا CSS variables؟** A: تبديل ثيم دون إعادة تعريف utilities.
107. **ما Inter؟** A: local font.
108. **ما PostCSS؟** A: pipeline CSS.
109. **ما Three؟** A: مشاهد ثلاثية الأبعاد.
110. **ما R3F؟** A: React binding لـ Three.
111. **ما Drei؟** A: helpers لمشهد R3F.
112. **ما fallback WebGL؟** A: `use-webgl`/واجهات بديلة.
113. **هل 3D ضروري للحقائق؟** A: لا؛ هو طبقة استكشاف.
114. **ما Lucide؟** A: icons.
115. **ما Zod؟** A: runtime validation.
116. **أين المنطق القابل للاختبار؟** A: lib scripts/tests.
117. **أين UI؟** A: components.
118. **أين pages؟** A: app.
119. **لماذا لا تضع data داخل components؟** A: فصل المصدر عن العرض.
120. **هل يوجد backend؟** A: route export فقط؛ لا خدمة domain.
121. **هل يوجد auth؟** A: لا.
122. **هل يوجد database؟** A: لا.
123. **هل يوجد user account؟** A: لا.
124. **كيف يحفظ progress؟** A: localStorage.
125. **هل localStorage آمن؟** A: ليس حسابًا؛ state شخصي غير حساس.
126. **ماذا لو تعطل storage؟** A: hooks لها fallback/تعمل في الذاكرة حيث موثق.
127. **ما motion toggle؟** A: local preference + reduced motion.
128. **كيف تمنع hydration مشاكل؟** A: client boundaries وقراءة browser داخل hooks/effects.
129. **ما metadata؟** A: route metadata/metadataBase.
130. **كيف تعمل static pages؟** A: data محلية وgenerate params.
131. **كيف تختبر build؟** A: `npm run build`.
132. **كيف تختبر types؟** A: `npm run typecheck`.
133. **كيف تختبر lint؟** A: `npm run lint`.
134. **كيف تختبر data؟** A: validate وtest:data.
135. **كيف تختبر browser؟** A: smoke/axe.
136. **كيف تختبر journeys؟** A: journeys script.
137. **كيف تختبر links؟** A: link-check.
138. **كيف تعمل CI؟** A: workflow يشغل السلسلة كاملة.
139. **ما node المطلوب؟** A: `>=22` و`.nvmrc` في CI.
140. **لماذا lockfile؟** A: reproducible npm ci.

## Academy (141–170)

141. **ما Academy؟** A: تعلم منظم لا gallery.
142. **ما age bands؟** A: 5-7، 8-9، 10-12.
143. **ما lesson؟** A: objectives/sections/quiz ومدة.
144. **ما journey؟** A: خطوات معرفة متسلسلة.
145. **ما quiz؟** A: feedback/knowledge check.
146. **ما flashcards؟** A: retrieval practice.
147. **ما glossary؟** A: إزالة حاجز المصطلح.
148. **ما articles؟** A: قراءة أطول مرتبطة بالموضوع.
149. **ما progress؟** A: سجل lessons/journeys/games/badges.
150. **ما version؟** A: `graverse:progress:v1`.
151. **هل progress cloud؟** A: لا، محلي.
152. **ما achievements؟** A: milestones مشتقة من النشاط.
153. **ما certificate؟** A: مخرج تحفيزي محلي.
154. **ما Play؟** A: تجارب moon/rocket/rover.
155. **ما Rover Builder؟** A: تركيب/قرار هندسي تعليمي.
156. **ما Robot Lab؟** A: مدخل مبسط/تفاعلي.
157. **هل الألعاب علمية دقيقة؟** A: تعليمية ومبسطة.
158. **هل age band قياس؟** A: تصنيف تصميم، لا validation تربوي.
159. **كيف تخدم المعلم؟** A: lessons/journeys/articles.
160. **كيف تخدم الطفل؟** A: language + interaction + reward.
161. **ما source links في Play؟** A: تربط النشاط بالمصدر.
162. **هل Academy منفصلة عن Museum؟** A: route مختلفة وبيانات مشتركة.
163. **ما خطر gamification؟** A: أن تطغى على الفكرة؛ لذلك المصادر باقية.
164. **كيف تجيب عن accessibility؟** A: controls وmotion/fallback ضمن المكونات.
165. **ما evidence على completion؟** A: local state، لا شهادة خارجية.
166. **هل يوجد teacher dashboard؟** A: لا تدّعِ ذلك.
167. **هل يوجد adaptive learning؟** A: لا؛ progress محلي.
168. **كيف تقيس النجاح؟** A: لا يوجد study؛ قل design intent.
169. **ما أفضل demo؟** A: lesson → quiz → source/artifact.
170. **ما limitation؟** A: المحتوى المسبق وليس LMS كاملًا.

## Museum وExplorer (171–205)

171. **ما Museum؟** A: قراءة القطعة كسجل إرث.
172. **ما بطاقة القطعة؟** A: visual/name/status/destination.
173. **ما صفحة detail؟** A: كل حقول Artifact المهمة.
174. **ما gallery؟** A: مساحة بصرية مرتبطة بالسجلات.
175. **ما agencies؟** A: سياق المؤسسات.
176. **ما missions؟** A: سياق المهمة لا القطعة فقط.
177. **ما Explorer؟** A: استعلام زمني/مكاني.
178. **ما filters؟** A: destination/type/status/decade/event.
179. **ما scope؟** A: primary أو all timeline events.
180. **ما sort؟** A: oldest/newest/name.
181. **كيف search score؟** A: name/mission/alias/type/content بأوزان.
182. **هل search fuzzy؟** A: normalization/terms، لا تدّعِ NLP.
183. **ما timeline entry؟** A: artifact + event.
184. **لماذا all events؟** A: العثور على launch/flyby/end وليس primary فقط.
185. **ما OrbitMap؟** A: تمثيل مكاني/مداري استكشافي.
186. **ما Orrery؟** A: عرض أجسام/مدارات.
187. **هل المدارات مقياس دقيق؟** A: visualization؛ راجع claim labels.
188. **ما deep sky؟** A: surface توسع السياق الكوني.
189. **ما body pages؟** A: facts ومصادر وartifacts مرتبطة.
190. **هل Explorer يبدل البيانات؟** A: لا، يرشح المجموعة.
191. **ما shared source؟** A: data/artifacts/index.
192. **ما تجربة الزائر؟** A: query → result → detail.
193. **كيف تعرض status؟** A: badges مع original/notes حيث يلزم.
194. **ما علاقة location؟** A: الجسم واسم الموضع ودقته.
195. **ما الأثر التعليمي للخط الزمني؟** A: يربط chronology بالنتيجة.
196. **هل timeline كامل تاريخيًا؟** A: ضمن events المسجلة فقط.
197. **هل كل artifact له media؟** A: لا، optional.
198. **ما fallback؟** A: لا fabricated placeholder.
199. **ما query canonical؟** A: searchParams validated.
200. **كيف تتعامل ID خاطئ؟** A: not found.
201. **ما خطر 3D؟** A: الانبهار بلا فهم؛ demo يشرح claim.
202. **هل الصور دليل علمي؟** A: media سياق وcredit.
203. **كيف تقارن قطعتين؟** A: `/compare`.
204. **ما أفضل record للعرض؟** A: واحد يوضح mission/hardware distinction.
205. **متى تستخدم Sources؟** A: عند سؤال «من أين؟».

## التشغيل والخصوصية والوصول (206–230)

206. **هل يوجد telemetry؟** A: لا.
207. **هل الاتصال live؟** A: مشتق من record.
208. **ما passive hardware؟** A: استثناءات لا تحمل transmitter مستقلًا.
209. **ما inactive؟** A: لا يساوي destroyed.
210. **ما still traveling؟** A: hardware status مستقل عن mission end.
211. **ما freshness؟** A: age of verification.
212. **هل freshness حقيقة علمية؟** A: metadata للعرض.
213. **ما الخصوصية؟** A: progress/personal محليان.
214. **ما الذي يرسله export؟** A: dataset requested، لا profile.
215. **هل API يحتاج auth؟** A: لا تدّعي وجود auth.
216. **ما accessibility؟** A: keyboard/labels/focus/motion وفق المكونات والوثائق.
217. **ما reduced motion؟** A: preference + media fallback.
218. **ما image alt؟** A: media schema requires alt.
219. **ما color-only risk؟** A: badges تحمل labels لا لونًا فقط.
220. **هل WebGL إلزامي؟** A: لا، fallback.
221. **كيف تتعامل مع error؟** A: error/not-found/loading surfaces.
222. **ما CI security؟** A: dependency lock وworkflow، لا تبالغ.
223. **هل هناك secrets؟** A: `.env.example` يوضح env؛ لا تكشف قيمًا.
224. **ما performance؟** A: image optimization وstatic data؛ توجد perf script.
225. **هل performance measured؟** A: script موجود؛ قدم نتيجة فقط إن شغلتها.
226. **ما deployment؟** A: Next production build/start.
227. **ما سبب عدم استخدام database؟** A: collection ثابتة ومراجعة.
228. **ما تكلفة ذلك؟** A: تحديث يدوي وإعادة build.
229. **هل scaling backend مهم؟** A: ليس هدف النسخة.
230. **ما failure mode؟** A: fallback/unknown/error بدل success وهمي.

## التميّز والتحدي (231–245)

231. **كيف يجيب المشروع التحدي؟** A: hardware→mission→science→story/source.
232. **أين school audience؟** A: Academy age bands.
233. **أين storytelling؟** A: Stories/timeline/journeys.
234. **أين التاريخ؟** A: events/date precision.
235. **أين العلم؟** A: purpose/contributions.
236. **أين الهندسة؟** A: type/technicalDetails/Engineering.
237. **ما الفرق عن صفحة NASA؟** A: تكامل طرق القراءة، لا استبدال المصدر.
238. **ما الفرق عن database؟** A: provenance وسرد وتجارب.
239. **ما الفرق عن لعبة؟** A: اللعبة جزء من evidence-backed museum.
240. **ما الفرق عن 3D demo؟** A: 3D يخدم سؤالًا ضمن data model.
241. **هل التميز feature واحد؟** A: لا، composition.
242. **هل هناك novelty مثبتة؟** A: claim تنافسي صادق، لا براءة اختراع.
243. **ما أكبر دليل؟** A: same record across three experiences.
244. **كيف تدافع عن scope؟** A: curated scope صريح.
245. **ماذا لو قال القاضي «موقع جميل»؟** A: افتح schema/source/status reasoning.

## العرض والنقد (246–260)

246. **ما أقوى نقطة؟** A: semantic separation.
247. **ما أضعف نقطة؟** A: static curated dataset يحتاج تحديثًا.
248. **ما خطر علمي؟** A: سوء فهم status/approximation.
249. **كيف عالجتموه؟** A: Original fields وclaim labels وnotes.
250. **ما خطر تربوي؟** A: التفاعل لا يثبت learning outcomes.
251. **كيف تصرحون به؟** A: نقول design intent لا measured impact.
252. **ما خطر تقني؟** A: WebGL/device variability.
253. **كيف عالجتموه؟** A: fallback/reduced motion وnon-3D paths.
254. **ما خطط المستقبل؟** A: لا تقدمها كمنفذة؛ اذكرها فقط كحد/اتجاه.
255. **ما أول demo action؟** A: اختيار artifact من Museum.
256. **ما ثاني action؟** A: إظهار فرق statuses.
257. **ما ثالث action؟** A: فتح source أو Explorer relation.
258. **ما جملة النهاية؟** A: mission ending is not object disappearance.
259. **ماذا تفعل عند سؤال لا تعرفه؟** A: أقول لا يثبته السجل وأحدد مكان التحقق.
260. **لماذا يستحق الانتباه؟** A: يحول البقايا إلى فهم موثق قابل للتعلم والاستكشاف.
