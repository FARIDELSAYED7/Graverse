/**
 * Arabic names for the records GRAVERSE holds.
 *
 * The archive's editorial prose is English, but the interface is Arabic and
 * visitors ask in Arabic. These are *names only* — a translation of the
 * record's own title — so an Arabic question can resolve to the same record an
 * English one does.
 *
 * Nothing here adds a fact: no date, no measurement, no status.
 */
export const ARABIC_ENTITY_ALIASES: Record<string, string[]> = {
  // Destinations.
  sun: ["الشمس"],
  mercury: ["عطارد"],
  venus: ["الزهرة"],
  earth: ["الأرض", "كوكب الأرض"],
  mars: ["المريخ", "كوكب المريخ"],
  jupiter: ["المشتري"],
  saturn: ["زحل"],
  uranus: ["أورانوس"],
  neptune: ["نبتون"],
  pluto: ["بلوتو"],
  moon: ["القمر", "قمر الأرض"],
  phobos: ["فوبوس"],
  deimos: ["ديميوس"],
  io: ["إيو"],
  europa: ["يوروبا"],
  ganymede: ["غانيميد"],
  callisto: ["كاليستو"],
  titan: ["تيتان"],
  enceladus: ["إنكلادوس"],
  triton: ["تريتون"],

  // Deep sky.
  "orion-nebula": ["سديم الجبار"],
  "crab-nebula": ["سديم السرطان"],
  "andromeda-galaxy": ["مجرة أندروميدا", "أندروميدا"],
  "sagittarius-a": ["ساجيتياريوس", "ساجيتاريوس"],
  "eagle-nebula": ["سديم النسر", "أعمدة الخلق"],
  "whirlpool-galaxy": ["مجرة الدوامة"],
  "sombrero-galaxy": ["مجرة القبعة"],
  "milky-way": ["درب التبانة", "مجرة درب التبانة"],

  // Agencies.
  nasa: ["ناسا", "إدارة ناسا", "الوكالة الوطنية للطيران والفضاء"],
  esa: ["وكالة الفضاء الأوروبية", "الوكالة الأوروبية للفضاء"],
  jaxa: ["جاكسا", "الوكالة اليابانية للفضاء"],
  isro: ["إيسرو", "الوكالة الهندية للفضاء"],
  cnsa: ["وكالة الفضاء الصينية"],
  roscosmos: ["روسك", "روسك كوسموس"],
  csa: ["الوكالة الكندية للفضاء"],
  uksa: ["وكالة المملكة المتحدة للفضاء"],

  // Hardware.
  "ranger-7": ["رانجر 7"],
  "ranger-8": ["رانجر 8"],
  "ranger-9": ["رانجر 9"],
  "surveyor-1": ["سيرفاور 1"],
  "surveyor-3": ["سيرفاور 3"],
  "apollo-11-lm-descent-stage": ["وحدة إنزال أبولو 11"],
  "apollo-11-lrrr": ["مرايا أبولو 11 الليزرية", "المرايا الليزرية لأبولو 11"],
  "apollo-12-alsep": ["حزمة أبولو 12 التجريبية"],
  "apollo-14-lm-descent-stage": ["وحدة إنزال أبولو 14"],
  "apollo-15-lunar-rover": ["عربة أبولو 15", "عربة أبولو 15 القمريّة"],
  "apollo-15-lrrr": ["مرايا أبولو 15 الليزرية"],
  "apollo-17-lm-descent-stage": ["وحدة إنزال أبولو 17"],
  "pioneer-10": ["بايونير 10"],
  "pioneer-11": ["بايونير 11"],
  "viking-1-lander": ["مهبط فينغر 1", "فينغر 1"],
  "viking-2-lander": ["مهبط فينغر 2", "فينغر 2"],
  "voyager-1": ["فوياجر 1"],
  "voyager-2": ["فوياجر 2"],
  "mars-pathfinder-lander": ["مهبط Pathfinder", "مسار فايندر"],
  cassini: ["كاسيني"],
  "lunar-prospector": ["لونار بروسبكتور", "المستكشف القمري"],
  spirit: ["سبيريت"],
  opportunity: ["أوبورتيونيتي"],
  "new-horizons": ["نيو هورايزنز"],
  phoenix: ["فينكس"],
  lcross: ["إل كروس"],
  curiosity: ["كوريوسيتي"],
  insight: ["إنسايت"],
  perseverance: ["بيرسيفرانس"],
  ingenuity: ["إنجينيويتي"],
  "mars-2020-descent-stage": ["مركبة إنزال مارس 2020"],
  sojourner: ["سبوتونر"],
};
