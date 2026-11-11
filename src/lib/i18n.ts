/**
 * Interface localisation.
 *
 * Scope is deliberately honest: navigation, footer, homepage hero, section
 * chrome and the new Mission Control / Engineering / Stories / Research /
 * Simulations surfaces are translated. Editorial artifact prose is still
 * English-only, and the Research Archive documents that limitation.
 */

export type Locale = "en" | "ar";

export const LOCALE_COOKIE = "graverse-locale";

export const locales: Locale[] = ["en", "ar"];

export const localeMeta: Record<
  Locale,
  { label: string; nativeLabel: string; dir: "ltr" | "rtl"; htmlLang: string }
> = {
  en: { label: "English", nativeLabel: "English", dir: "ltr", htmlLang: "en" },
  ar: { label: "Arabic", nativeLabel: "العربية", dir: "rtl", htmlLang: "ar" },
};

export function isRtl(locale: Locale): boolean {
  return localeMeta[locale].dir === "rtl";
}

type Dictionary = Record<string, string>;

const en: Dictionary = {
  "nav.home": "Home",
  "nav.academy": "Academy",
  "nav.museum": "Museum",
  "nav.explorer": "Explorer",
  "nav.missionControl": "Mission Control",
  "nav.engineering": "Engineering",
  "nav.stories": "Stories",
  "nav.research": "Research",
  "nav.simulations": "Simulations",
  "nav.myUniverse": "My Universe",
  "nav.compare": "Compare",
  "nav.about": "About",
  "nav.more": "More",
  "nav.primary": "Primary",
  "nav.mobilePrimary": "Mobile primary",
  "nav.openMenu": "Open navigation menu",
  "nav.closeMenu": "Close navigation menu",
  "nav.openSearch": "Open search",
  "nav.closeSearch": "Close search",

  "common.search": "Search",
  "common.searchEverything": "Search everything",
  "common.searchHint": "Search artifacts, missions, lessons and destinations",
  "common.skip": "Skip to main content",
  "common.language": "Language",
  "common.english": "English",
  "common.arabic": "Arabic",
  "common.sources": "Sources",
  "common.approximation": "Educational approximation",
  "common.derived": "Derived label",
  "common.derivedNote":
    "Derived from the recorded hardware status. Not a live telemetry feed.",
  "common.back": "Back to results",
  "common.motion": "Motion and animation",
  "common.localOnly": "Saved only on this device",
  "common.none": "Not recorded",

  "home.eyebrow": "A NASA Space Apps Challenge experience",
  "home.titleLead": "Discover the machines that",
  "home.titleAccent": "shaped our understanding",
  "home.titleTail": "of space.",
  "home.subtitle":
    "Explore the hardware, missions and discoveries left across the Moon, Mars and beyond — then find out what is actually known about what happened to each machine.",
  "home.searchPlaceholder": "Search an artifact, mission or destination",
  "home.searchButton": "Search the archive",
  "home.try": "Try",
  "home.exploreTimeline": "Explore the timeline",
  "home.browseMuseum": "Browse the museum",
  "home.artifacts": "Artifacts",
  "home.destinations": "Destinations",
  "home.decades": "Decades",
  "home.moreEyebrow": "More ways in",
  "home.moreTitle": "Beyond the three core experiences",
  "home.moreDescription":
    "Check the status of hardware, read an engineering explainer, follow a story, inspect the method, run an educational model or open your own saved records.",
  "home.openSurface": "Open",

  "footer.description":
    "An interactive space heritage timeline and digital museum. Explore the hardware, missions and discoveries left across the Moon, Mars and beyond.",
  "footer.explorer": "Explorer",
  "footer.collection": "Collection",
  "footer.aboutData": "About the data",
  "footer.byDestination": "By destination",
  "footer.orrery": "Solar system orrery",
  "footer.missions": "Missions",
  "footer.dataNote":
    "Facts are normalized from public NASA mission pages, NASA/NSSDCA technical records and NASA image records. Every artifact page lists its sources and access dates.",
  "footer.notNasa":
    "GRAVERSE — a NASA Space Apps Challenge project. Not an official NASA website.",
  "footer.imagery":
    "Imagery: NASA. Data verified against public NASA records on 10 November 2026.",

  "sections.missionControl.eyebrow": "Status board",
  "sections.missionControl.title": "Mission Control",
  "sections.missionControl.description":
    "Three separate questions: what the mission was, what the hardware is, and whether a link exists. Communication status is derived from recorded hardware status and is never presented as live telemetry.",
  "sections.engineering.eyebrow": "Engineering Lab",
  "sections.engineering.title": "How the machines work",
  "sections.engineering.description":
    "Source-linked engineering explainers: power, mobility, landing, communication, instruments and materials.",
  "sections.stories.eyebrow": "Space Stories",
  "sections.stories.title": "Read the collection as a story",
  "sections.stories.description":
    "Curated reading paths through records that already exist in the museum. Every section points back to its sources.",
  "sections.research.eyebrow": "Research Archive",
  "sections.research.title": "Method, sources and limits",
  "sections.research.description":
    "How records are selected, how claims are labelled, how status is kept separate and what the collection does not cover.",
  "sections.simulations.eyebrow": "Mission Experience Lab",
  "sections.simulations.title": "Learn by changing the conditions",
  "sections.simulations.description":
    "Eight educational models. Each one is clearly labelled as an approximation, not a NASA prediction.",
  "sections.myUniverse.eyebrow": "My Universe",
  "sections.myUniverse.title": "Your saved records",
  "sections.myUniverse.description":
    "Favourites, collections, recently viewed artifacts and completed simulations. Stored only in this browser.",
  "sections.compare.eyebrow": "Comparison",
  "sections.compare.title": "Put records side by side",
  "sections.compare.description":
    "Compare only what the sources document. Unknown values stay unknown.",

  "sim.result": "Model output",
  "sim.reset": "Reset",
  "sim.complete": "Mark as explored",
  "sim.completed": "Explored",
  "sim.budget": "Budget",
  "sim.status": "Status",
  "sim.valid": "Fits the limits",
  "sim.invalid": "Does not fit the limits",
  "sim.score": "Score",
  "sim.power.healthy": "Energy budget is healthy",
  "sim.power.tight": "Energy budget is tight",
  "sim.power.deficit": "Energy deficit",
};

const ar: Dictionary = {
  "nav.home": "الرئيسية",
  "nav.academy": "الأكاديمية",
  "nav.museum": "المتحف",
  "nav.explorer": "المستكشف",
  "nav.missionControl": "مركز التحكم",
  "nav.engineering": "الهندسة",
  "nav.stories": "القصص",
  "nav.research": "البحث",
  "nav.simulations": "المحاكاة",
  "nav.myUniverse": "عالمي",
  "nav.compare": "المقارنة",
  "nav.about": "حول",
  "nav.more": "المزيد",
  "nav.primary": "التنقل الرئيسي",
  "nav.mobilePrimary": "التنقل للجوال",
  "nav.openMenu": "فتح قائمة التنقل",
  "nav.closeMenu": "إغلاق قائمة التنقل",
  "nav.openSearch": "فتح البحث",
  "nav.closeSearch": "إغلاق البحث",

  "common.search": "بحث",
  "common.searchEverything": "ابحث في كل شيء",
  "common.searchHint": "ابحث في القطع والمهام والدروس والوجهات",
  "common.skip": "تخطَّ إلى المحتوى الرئيسي",
  "common.language": "اللغة",
  "common.english": "الإنجليزية",
  "common.arabic": "العربية",
  "common.sources": "المصادر",
  "common.approximation": "تقدير تعليمي",
  "common.derived": "تسمية مشتقة",
  "common.derivedNote":
    "مشتقة من حالة العتاد المسجلة. وليست تغذية بيانات حية.",
  "common.back": "العودة إلى النتائج",
  "common.motion": "الحركة والرسوم المتحركة",
  "common.localOnly": "محفوظ على هذا الجهاز فقط",
  "common.none": "غير مسجل",

  "home.eyebrow": "تجربة من تحدي ناسا لتطبيقات الفضاء",
  "home.titleLead": "اكتشف الآلات التي",
  "home.titleAccent": "شكّلت فهمنا",
  "home.titleTail": "للفضاء.",
  "home.subtitle":
    "استكشف العتاد والمهام والاكتشافات المتروكة على القمر والمريخ وما وراءهما، ثم اعرف ما هو معروف فعلاً عن مصير كل آلة.",
  "home.searchPlaceholder": "ابحث عن قطعة أو مهمة أو وجهة",
  "home.searchButton": "ابحث في الأرشيف",
  "home.try": "جرّب",
  "home.exploreTimeline": "استكشف الخط الزمني",
  "home.browseMuseum": "تصفّح المتحف",
  "home.artifacts": "القطع",
  "home.destinations": "الوجهات",
  "home.decades": "العقود",
  "home.moreEyebrow": "طرق أخرى للدخول",
  "home.moreTitle": "ما وراء التجارب الثلاث الأساسية",
  "home.moreDescription":
    "تحقق من حالة العتاد، واقرأ شرحاً هندسياً، وتابع قصة، وافحص المنهج، وشغّل نموذجاً تعليمياً، أو افتح سجلاتك المحفوظة.",
  "home.openSurface": "افتح",

  "footer.description":
    "خط زمني تفاعلي للتراث الفضائي ومتحف رقمي. استكشف العتاد والمهام والاكتشافات على القمر والمريخ وما وراءهما.",
  "footer.explorer": "المستكشف",
  "footer.collection": "المجموعة",
  "footer.aboutData": "حول البيانات",
  "footer.byDestination": "حسب الوجهة",
  "footer.orrery": "نموذج النظام الشمسي",
  "footer.missions": "المهام",
  "footer.dataNote":
    "تُستمد الحقائق من صفحات مهام ناسا العامة وسجلات ناسا/NSSDCA التقنية وسجلات صور ناسا. كل صفحة قطعة تسرد مصادرها وتواريخ الوصول إليها.",
  "footer.notNasa":
    "GRAVERSE — مشروع في تحدي ناسا لتطبيقات الفضاء. ليس موقعاً رسمياً لناسا.",
  "footer.imagery":
    "الصور: ناسا. تم التحقق من البيانات مقابل سجلات ناسا العامة في 10 نوفمبر 2026.",

  "sections.missionControl.eyebrow": "لوحة الحالة",
  "sections.missionControl.title": "مركز التحكم",
  "sections.missionControl.description":
    "ثلاثة أسئلة منفصلة: ما كانت المهمة، وما حالة العتاد، وهل يوجد اتصال. حالة الاتصال مشتقة من حالة العتاد المسجلة ولا تُعرض أبداً كقياس حي.",
  "sections.engineering.eyebrow": "مختبر الهندسة",
  "sections.engineering.title": "كيف تعمل الآلات",
  "sections.engineering.description":
    "شروح هندسية مرتبطة بالمصادر: الطاقة والحركة والهبوط والاتصال والأجهزة والمواد.",
  "sections.stories.eyebrow": "قصص الفضاء",
  "sections.stories.title": "اقرأ المجموعة كقصة",
  "sections.stories.description":
    "مسارات قراءة منسقة عبر سجلات موجودة في المتحف. كل قسم يعود إلى مصادره.",
  "sections.research.eyebrow": "أرشيف البحث",
  "sections.research.title": "المنهج والمصادر والحدود",
  "sections.research.description":
    "كيف تُختار السجلات، وكيف تُصنّف الادعاءات، وكيف تُفصل الحالات، وما لا تغطيه المجموعة.",
  "sections.simulations.eyebrow": "مختبر تجربة المهمة",
  "sections.simulations.title": "تعلّم بتغيير الظروف",
  "sections.simulations.description":
    "ثمانية نماذج تعليمية. كل نموذج موسوم بوضوح كتقدير، وليس تنبؤاً من ناسا.",
  "sections.myUniverse.eyebrow": "عالمي",
  "sections.myUniverse.title": "سجلاتك المحفوظة",
  "sections.myUniverse.description":
    "المفضلة والمجموعات والقطع التي شاهدتها مؤخراً والمحاكاة المكتملة. محفوظة في هذا المتصفح فقط.",
  "sections.compare.eyebrow": "المقارنة",
  "sections.compare.title": "ضع السجلات جنباً إلى جنب",
  "sections.compare.description":
    "قارن فقط ما توثقه المصادر. القيم غير المعروفة تبقى غير معروفة.",

  "sim.result": "مخرجات النموذج",
  "sim.reset": "إعادة ضبط",
  "sim.complete": "وسم كمستكشف",
  "sim.completed": "تم الاستكشاف",
  "sim.budget": "الميزانية",
  "sim.status": "الحالة",
  "sim.valid": "ضمن الحدود",
  "sim.invalid": "خارج الحدود",
  "sim.score": "النتيجة",
  "sim.power.healthy": "ميزانية الطاقة بصحة جيدة",
  "sim.power.tight": "ميزانية الطاقة ضيقة",
  "sim.power.deficit": "عجز في الطاقة",
};

const dictionaries: Record<Locale, Dictionary> = { en, ar };

/**
 * The keys a locale defines. Used by the test suite to keep the two
 * dictionaries in step and to catch unused entries.
 */
export function translationKeys(locale: Locale): string[] {
  return Object.keys(dictionaries[locale]);
}

export function t(locale: Locale, key: string): string {
  return dictionaries[locale][key] ?? dictionaries.en[key] ?? key;
}
