import type { AskLocale } from "../types";

/**
 * Layer B — the curated local knowledge base.
 *
 * These are the questions visitors ask most often, with answers written from
 * GRAVERSE's own verified records. Every scientific statement cites a source
 * that is already registered in `src/data/sources.ts`; the source ids are
 * checked at request time, so an entry whose sources have been removed stops
 * being answerable and the question falls through to the provider.
 *
 * The knowledge base deliberately does **not** repeat per-record field values.
 * Those are produced dynamically from the records themselves by Layer C. What
 * lives here is the orientation and cross-cutting material: what the
 * collection is, and the cpts a visitor needs before the records make
 * sense.
 */

export interface LocalFaqEntry {
  id: string;
  /** The canonical question. */
  question: string;
  /** Other ways the same question is asked. */
  aliases: string[];
  /** Extra words that should also point at this entry. */
  keywords: string[];
  /** The Arabic question and its alternatives. */
  questionAr?: string;
  aliasesAr?: string[];
  keywordsAr?: string[];
  /** The answer, in English. */
  answer: string;
  /** The answer, in Arabic. */
  answerAr?: string;
  /** The registered sources behind the answer. */
  sourceIds: string[];
  /** GRAVERSE records the visitor may want to open next. */
  relatedRecordIds?: string[];
  /** The languages this entry can answer. */
  locales: AskLocale[];
}

export const LOCAL_FAQ: LocalFaqEntry[] = [
  /* ------------------------------------------------------- about the archive */
  {
    id: "faq-graverse-purpose",
    question: "What is GRAVERSE?",
    aliases: [
      "What is this website?",
      "What is this site about?",
      "What does GRAVERSE do?",
      "Tell me about GRAVERSE",
    ],
    keywords: ["graverse", "project", "site", "website", "archive", "museum"],
    questionAr: "ما هو مشروع GRAVERSE؟",
    aliasesAr: ["ما هذا الموقع؟", "عن ماذا يتحدث مشروع GRAVERSE؟"],
    keywordsAr: ["graverse", "مشروع", "موقع", "أرشيف", "متحف"],
    answer:
      "GRAVERSE is an interactive space heritage timeline and source-linked digital museum about the hardware humanity left behind on the Moon, on Mars and in deep space.\n\nIt was built for the NASA Space Apps Challenge \"Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars\". Thirty hardware records are read three ways — as a learning experience in the Academy, as stories in the Museum, and as data in the Explorer — and every record keeps its mission status and its hardware status apart, with the public NASA sources it came from.",
    answerAr:
      "GRAVERSE هو خط زمني تفاعلي لتراث الفضاء ومتحف رقمي مرتبط بالمصادر، يروي قصة العتاد الذي تركه الإنسان خلفه على القمر والمريخ وفي الفضاء العميق.\n\nبُني لتحدي ناسا لتطبيقات الفضاء \"مهجور لكن ليس منسياً: سرد عن معدات ناسا المتروكة على القمر والمريخ\". تُقرأ ثلاثون سجلاً بثلاث طرق: كتجربة تعليمية في الأكاديمية، وكقصص في المتحف، وكبيانات في المستكشف. وكل سجل يحتفظ بحالة المهمة وحالة العتاد منفصلتين، مع مصادر ناسا العامة التي جاء منها.",
    sourceIds: [],
    locales: ["en", "ar"],
  },
  {
    id: "faq-graverse-three-experiences",
    question: "What are the three experiences in GRAVERSE?",
    aliases: [
      "Explain the three experiences",
      "What is the difference between the Academy, the Museum and the Explorer?",
      "How is GRAVERSE organised?",
    ],
    keywords: ["academy", "museum", "explorer", "experiences", "structure"],
    questionAr: "ما هي التجارب الثلاث في GRAVERSE؟",
    aliasesAr: ["اشرح التجارب الثلاث", "كيف ينظم مشروع GRAVERSE؟"],
    keywordsAr: ["اكاديمية", "متحف", "مستكشف", "تجارب", "تنظيم"],
    answer:
      "One collection, three ways in:\n\n- **Space Academy** (`/academy`) — the learning experience for ages 5–12, in three age bands, with lessons, journeys, articles, flashcards and small 3D games.\n- **Museum** (`/museum`) — the heritage experience: thirty artifact records, each telling the story of one machine with its sources attached, plus a 3D exhibition hall.\n- **Explorer** (`/explorer`) — the discovery experience: a chronological timeline of mission events, filters for the whole collection, and the twenty Solar System bodies.\n\nBecause they read the same records, a lesson about a rover and a museum entry about that rover can never disagree about a date or a status.",
    answerAr:
      "مجموعة واحدة، ثلاث طرق للدخول:\n\n- **الأكاديمية** (`/academy`) — تجربة التعلم للأعمار 5–12 في ثلاث فئات عمرية، مع دروس ومسارات ومقالات وبطاقات وألعاب ثلاثية الأبعاد صغيرة.\n- **المتحف** (`/museum`) — تجربة التراث: ثلاثون سجلاً، يروي كل منها قصة آلة واحدة مع مصادرها، إضافة إلى قاعة عرض ثلاثية الأبعاد.\n- **المستكشف** (`/explorer`) — تجربة الاستكشاف: خط زمني لأحداث المهام، ومرشّحات للمجموعة كاملة، والوجهات العشرون في المجموعة الشمسية.\n\nلأن الثلاثة تقرأ السجلات نفسها، لا يمكن لدرس عن عربة أن يخالف سجل المتحف عن العربة نفسها في تاريخ أو حالة.",
    sourceIds: [],
    locales: ["en", "ar"],
  },
  {
    id: "faq-graverse-sources",
    question: "Where do the facts in GRAVERSE come from?",
    aliases: [
      "How do you know this is true?",
      "What sources do you use?",
      "Is this verified?",
      "How are the records verified?",
    ],
    keywords: ["source", "sources", "verified", "provenance", "nasa", "citation"],
    questionAr: "من أين تأتي الحقائق في مشروع GRAVERSE؟",
    aliasesAr: ["كيف تعرف أن هذا صحيح؟", "ما المصادر التي تستخدمها؟"],
    keywordsAr: ["مصدر", "مصادر", "موثق", "ناسا", "اقتباس", "تحقق"],
    answer:
      "Every factual field in GRAVERSE is normalised from public NASA records and carries the source it came from. The registry holds 96 source records — NASA Science mission pages, NASA NSSDCA technical archives, NASA fact sheets and image records — each with an organization, a title, a URL, a type and the date it was accessed.\n\nThe evidence model has four values: `confirmed`, `estimated`, `simulated` and `unknown`. A confirmed or estimated fact must cite a registered source; a simulated one must state its parameters; an unknown one says nothing rather than guessing. When a source and a record disagree, the disagreement is kept visible instead of being resolved silently.",
    answerAr:
      "كل حقل واقعي في مشروع GRAVERSE مُطبَّع من سجلات ناسا العامة ويحمل مصدره. تضم السجلات 96 مصدراً — صفحات مهام ناسا العلمية، وأرشيفات NSSDCA التقنية، وأوراق حقائق ناسا، وسجلات الصور — لكل منها المؤسسة والعنوان والرابط والنوع وتاريخ الاطلاع.\n\nنموذج الأدلة يحتمل أربع قيم: `مؤكد` و`مقدَّر` و`محاكى` و`غير معروف`. الحقيقة المؤكدة أو المقدَّرة يجب أن يستند إلى مصدر مسجّل، والمحاكى يجب أن يذكر معاملاته، وغير المعروف يقول لا شيء بدل التخمين.\n\nوعند اختلاف المصدر والسجل، يُبقى الاختلاف ظاهراً بدل تسويته في صمت.",
    sourceIds: [],
    locales: ["en", "ar"],
  },
  {
    id: "faq-status-vs-hardware",
    question: "What is the difference between mission status and hardware status?",
    aliases: [
      "Why are there two statuses?",
      "Mission status versus hardware status",
      "Does a completed mission mean the machine is gone?",
    ],
    keywords: ["status", "mission", "hardware", "difference", "completed"],
    questionAr: "ما الفرق بين حالة المهمة وحالة العتاد؟",
    aliasesAr: ["لماذا حالتان؟", "هل انتهاء المهمة يعني أن الآلة اختفت؟"],
    keywordsAr: ["حالة", "مهمة", "عتاد", "فرق", "انتهت"],
    answer:
      "They are two different questions, and GRAVERSE keeps them apart on purpose.\n\n**Mission status** describes the job: is the mission still in progress, complete, ended, or was contact lost? **Hardware status** describes the machine: is it operating, inactive, no longer communicating, impacted, destroyed, or still travelling?\n\nA mission can be complete while its hardware is still in use — the Apollo 11 laser retroreflectors are still used for lunar ranging decades after the mission ended. A mission can also succeed precisely because its hardware كان destroyed on purpose: Ranger 7 impacted the Moon after returning thousands of images. Collapsing the two into one status word would lose most of the story.",
    answerAr:
      "هما سؤالان مختلفان، وGRAVERSE يبقيهما منفصلين عن قصد.\n\n**حالة المهمة** تصف العمل: هل المهمة ما زالت جارية، أم اكتملت، أم انتهت، أم انقطع الاتصال؟ أما **حالة العتاد** فتصف الآلة: هل تعمل، أم خاملة، أم لم تعد تبث، أم اصطدمت، أم دُمّرت، أم ما زالت في طريقها؟\n\nيمكن أن تكتمل المهمة ويظل عتادها مستخدماً — فمرايا Apollo 11 الليزرية ما زالت تُستخدم في قياس المسافة على القمر بعد عقود من انتهاء المهمة. ويمكن أيضاً أن تنجح المهمة لأن عتادها دُمّر عمداً: فقد اصطدم رانجر 7 بالقمر بعد أن أعاد آلاف الصور.\n\nدمج الحالتين في كلمة واحدة يفقد معظم القصة.",
    sourceIds: ["SRC-APOLLO-11", "SRC-NSSDCA-RANGER-7"],
    relatedRecordIds: ["apollo-11-lrrr", "ranger-7"],
    locales: ["en", "ar"],
  },
  {
    id: "faq-space-heritage",
    question: "Why does abandoned space hardware matter?",
    aliases: [
      "Why should we care about discarded equipment?",
      "Why preserve old spacecraft?",
      "What is space heritage?",
    ],
    keywords: ["heritage", "abandoned", "discarded", "preserve", "why", "matter"],
    questionAr: "لماذا يهم العتاد الفضائي المتروك؟",
    aliasesAr: ["لماذا نهتم بالمعدات المتروكة؟", "ما تراث الفضاء؟"],
    keywordsAr: ["تراث", "متروك", "مهجور", "حفظ", "اهمية"],
    answer:
      "On the Moon there is no wind and no weather, and on Mars there is almost none. What humanity left there has not been erased — it is a material record of how we explored, and it is still doing science.\n\nThe Apollo 11 laser retroreflectors are a working instrument today, not a memorial. The Apollo landing sites are ground truth for lunar science, and the Viking landers' landing sites are still studied for their traces of past water. Equipment left behind is therefore not litter: it is infrastructure, evidence and a material heritage, and telling its story honestly means saying what is known, what is recorded and what is still unknown.",
    answerAr:
      "لا رياح ولا طقس على القمر، ولا يكاد يكون هناك شيء منهما على المريخ. فما تركه الإنسان هناك لم يُمحَ، بل هو سجل مادي لكيفية استكشافنا، ولا يزال يخدم العلم اليوم.\n\nفمرايا Apollo 11 الليزرية أداة عاملة حتى الآن، لا نصب تذكاري. ومواقع هبوط أبولو هي مرجع علمي قمري، وما زالت مواقع هبوط فينغر مدروسة بحثاً عن آثار الماء القديم. لذلك فإن العتاد المتروك ليس قمامة: بل بنية تحتية، ودليل، وتراث مادي. وروايته بصدق تتطلب أن نقول ما هو معروف وما هو مسجّل وما لا يزال مجهولاً.",
    sourceIds: ["SRC-APOLLO-11", "SRC-NASA-MOON", "SRC-NASA-MARS"],
    locales: ["en", "ar"],
  },

  /* --------------------------------------------------------- the Solar System */
  {
    id: "faq-solar-system",
    question: "What is the Solar System?",
    aliases: [
      "Tell me about the Solar System",
      "What is in our Solar System?",
      "How big is the Solar System?",
    ],
    keywords: ["solar", "system", "planets", "sun", "orbits"],
    questionAr: "ما هي المجموعة الشمسية؟",
    aliasesAr: ["حدثني عن المجموعة الشمسية", "ماذا تضم المجموعة الشمسية؟"],
    keywordsAr: ["المجموعة", "الشمسية", "الكواكب", "الشمس", "مدار"],
    answer:
      "The Solar System is the Sun and everything that orbits it: eight planets, the dwarf planet Pluto, more than twenty known moons in GRAVERSE's records, and the small bodies — comets and asteroids — that are not catalogued here.\n\nGRAVERSE's Explorer holds 20 destination records, from the Sun itself through the eight planets to Pluto, Earth's Moon and the major moons of Mars, Jupiter, Saturn and Neptune. Each one carries its distance from the Sun, its orbital period, its day length, its radius, its mean temperature, and the claim label of every fact, with the NASA sources attached.",
    answerAr:
      "المجموعة الشمسية هي الشمس وكل ما يدور حولها: ثمانية كواكب، والكوكب القزم بلوتو، وأكثر من عشرين قمراً معروفاً في سجلات GRAVERSE، والأجسام الصغيرة — المذنبات والنيازك — التي لا تُفهرس هنا.\n\nيحتوي المستكشف في GRAVERSE على عشرين سجل وجهة، من الشمس نفسها إلى الكواكب الثمانية، فبلوتو وقمر الأرض والأقمار الرئيسية للمريخ، والمشتري، وزحل، ونبتون. يحمل كل سجل بُعده عن الشمس، ودورته المدارية، وطول يومه، ونصف قطره، وحرارته المتوسطة، ووسم ادعاء لكل حقيقة، مع مصادر ناسا.",
    sourceIds: ["SRC-NASA-SOLAR-SYSTEM", "SRC-NASA-PLANETARY-FACTS", "SRC-NASA-SUN"],
    locales: ["en", "ar"],
  },
  {
    id: "faq-planets",
    question: "What are the planets of the Solar System?",
    aliases: [
      "List the planets",
      "How many planets are there?",
      "What is a planet?",
    ],
    keywords: ["planets", "list", "how", "many", "eight"],
    questionAr: "ما هي كواكب المجموعة الشمسية؟",
    aliasesAr: ["عدّد الكواكب", "كم عدد الكواكب؟"],
    keywordsAr: ["الكواكب", "قائمة", "كم", "ثمانية"],
    answer:
      "Eight, in order from the Sun: **Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune**. Pluto is classified as a dwarf planet, and GRAVERSE records it separately.\n\nThey fall into two groups. The four inner planets — Mercury, Venus, Earth and Mars — are small and rocky. The four outer planets — Jupiter, Saturn, Uranus and Neptune — are much larger, and the last two are ice giants rather than gas giants. The reference values GRAVERSE publishes for each of them — radius, distance, orbital period, rotation and temperature — come from the NASA Planetary Fact Sheet.",
    answerAr:
      "ثمانية، بالترتيب من الشمس: **عطارد، الزهرة، الأرض، المريخ، المشتري، زحل، أورانوس، نبتون**. أما بلوتو فيُصنَّف كوكب قزم، ويسجّله GRAVERSE على حدة.\n\nوتنقسم إلى مجموعتين: الكواكب الداخلية الأربعة — عطارد والزهرة والأرض والمريخ — صغيرة وصخرية. أما الكواكب الخارجية الأربعة — المشتري وزحل وأورانوس ونبتون — أكبر بكثير، وآخر اثنين منها عملاقان جليديان لا غازيان. وقيم المرجع التي ينشرها GRAVERSE عن كل منها — نصف القطر والمسافة والدورة المدارية والدوران والحرارة — مصدرها ورقة حقائق الكواكب من ناسا.",
    sourceIds: ["SRC-NASA-PLANETARY-FACTS", "SRC-NASA-SOLAR-SYSTEM"],
    locales: ["en", "ar"],
  },
  {
    id: "faq-mars",
    question: "Why is Mars so interesting?",
    aliases: [
      "Tell me about Mars",
      "Why do we explore Mars?",
      "What did we find on Mars?",
    ],
    keywords: ["mars", "red", "planet", "exploration", "rover"],
    questionAr: "لماذا المريخ مثير للاهتمام؟",
    aliasesAr: ["حدثني عن المريخ", "لماذا نستكشف المريخ؟"],
    keywordsAr: ["المريخ", "الكوكب", "استكشاف", "عربات"],
    answer:
      "Mars is a cold desert world with ancient river valleys, polar ice and a thin carbon-dioxide atmosphere — and it is the most explored world after Earth.\n\nGRAVERSE's Explorer lists eleven NASA machines that worked there, from the Viking landers and Sojourner to Spirit, Opportunity, Curiosity and Perseverance, plus Ingenuity and two descent stages. The science that came out of them is recorded on each page: the sample-caching system that seals rock cores for a possible future return, MOXIE's oxygen production, and the evidence that Jezero Crater  held a lake and a river.",
    answerAr:
      "المريخ عالم صحراوي بارد، فيه أودية نهرية قديمة وجليد قطبي وغلاف رقيق من ثاني أكسيد الكربون — وهو أكثر عالم استكشفناه بعد الأرض.\n\nيسجّل المستكشف في GRAVERSE إحدى عشرة آلة من ناسا عملت هناك، من مهبطَي فينغر وسبوتونر إلى سبيريت وأوبورتيونيتي وكوريوسيتي وبيرسيفرانس، إضافة إلى إنجينيويتي ومركبتَي إنزال. والعلم الناتج منها مسجّل في كل صفحة: نظام تخزين العينات الذي يعقّم الصخور في أنابيب لِإعادة محتملة في المستقبل، وأكسجين MOXIE، والأدلة على أن حفرة جيزورو كانت بحيرة ونهراً.",
    sourceIds: ["SRC-NASA-MARS", "SRC-NASA-PLANETARY-FACTS"],
    relatedRecordIds: ["viking-1-lander", "sojourner", "curiosity", "perseverance"],
    locales: ["en", "ar"],
  },
  {
    id: "faq-moon",
    question: "Tell me about Earth's Moon",
    aliases: [
      "What is the Moon?",
      "How did we explore the Moon?",
      "What is on the Moon?",
    ],
    keywords: ["moon", "lunar", "earth", "satellite"],
    questionAr: "حدثني عن قمر الأرض",
    aliasesAr: ["ما هو القمر؟", "كيف استكشفنا القمر؟"],
    keywordsAr: ["القمر", "قمر", "الأرض", "قمر صناعي"],
    answer:
      "The Moon is Earth's only natural satellite, and GRAVERSE records it as a destination in its own right.\n\nIts exploration history runs from the Ranger impact probes through Surveyor, which proved a controlled soft landing was possible, to the Apollo missions. What كان left behind is the point of the collection: the Apollo descent stages, the rovers, the ALSEP experiment packages and the laser retroreflectors, several of which are still working instruments today.",
    answerAr:
      "القمر هو قمر الأرض الطبيعي الوحيد، ويسجّله GRAVERSE وجهة بذاتها.\n\nيمتد تاريخ استكشافه من مجسات الارتطام رانجر، إلى سيرفاور الذي أثبت أن الهبوط المنعمد ممكن، وصولاً إلى مهمات أبولو. وما تُرك خلفه هو محور المجموعة: وحدات إنزال أبولو، والعربات، وحزم تجارب ALSEP، والمرايا الليزرية، بعضها ما زال يعمل اليوم.",
    sourceIds: ["SRC-NASA-MOON", "SRC-NASA-PLANETARY-FACTS"],
    relatedRecordIds: ["surveyor-1", "apollo-11-lm-descent-stage", "apollo-11-lrrr"],
    locales: ["en", "ar"],
  },
  {
    id: "faq-moons",
    question: "What are the moons of the Solar System?",
    aliases: [
      "Tell me about moons",
      "Which moons does GRAVERSE record?",
      "What is a natural satellite?",
    ],
    keywords: ["moons", "satellites", "natural", "phobos", "titan", "europa"],
    questionAr: "ما هي أقمار المجموعة الشمسية؟",
    aliasesAr: ["حدثني عن الأقمار", "أي الأقمار يسجّلها GRAVERSE؟"],
    keywordsAr: ["أقمار", "أقمار صناعية", "فوبوس", "تيتان", "يوروبا"],
    answer:
      "Every planet beyond Mars in GRAVERSE's records has moons, and so do Mars and Pluto.\n\nGRAVERSE holds ten: the Moon; Mars's Phobos and Deimos; Jupiter's Io, Europa, Ganymede and Callisto; Saturn's Titan and Enceladus; and Neptune's Triton. They are not all alike — Io is the most volcanically active body known, Titan has a dense atmosphere and lakes of liquid methane, Europa is thought to hide a salty ocean beneath its ice, and Enceladus vents water from its south pole. Their orbit, size and composition come from the NASA moons reference GRAVERSE cites.",
    answerAr:
      "كل كوكب بعد المريخ في سجلات GRAVERSE له أقمار، وكذلك المريخ وبلوتو.\n\nيحفظ GRAVERSE عشرة أقمار: القمر؛ وفوبوس وديميوس للمريخ؛ وإيو ويوروبا وغانيميد وكاليستو للمشتري؛ وتيتان وإنكيلادوس لزحل؛ وتريتون لنبتون. وليست متشابهة: فإيو أنشط بركانياً معروف، ولتيتان غلاف كثيف وبحيرات من الميثان السائل، ويُعتقد أن يوروبا تخفي محيطاً مالحاً تحت جليدها، وأن إنكيلادوس يقذف الماء من قطبه الجنوبي. وتأتي مداراتها وأحجامها وتركيبها من مرجع أقمار ناسا الذي يستشهد به GRAVERSE.",
    sourceIds: ["SRC-NASA-MOONS", "SRC-NASA-MARS", "SRC-NASA-JUPITER", "SRC-NASA-SATURN"],
    locales: ["en", "ar"],
  },
  {
    id: "faq-sun",
    question: "What is the Sun?",
    aliases: ["Tell me about the Sun", "How hot is the Sun?"],
    keywords: ["sun", "star", "solar", "hot"],
    questionAr: "ما هي الشمس؟",
    aliasesAr: ["حدثني عن الشمس", "كم حرارة الشمس؟"],
    keywordsAr: ["الشمس", "نجم", "شمسية", "حار"],
    answer:
      "The Sun is a star, and the gravitational centre of the Solar System — the reason the planets stay in their orbits at all.\n\nGRAVERSE's Explorer records it with its structure, surface temperature and age, taken from NASA's solar-system and Sun reference pages. Almost every energy system on the hardware in this collection exists because of the Sun: solar panels convert its light into electricity, and radioisotope thermoelectric generators turn the heat from its decay into power.",
    answerAr:
      "الشمس نجم، وهي مركز الجاذبية في المجموعة الشمسية — وهي السبب في بقاء الكواكب في مداراتها.\n\nيسجّل المستكشف في GRAVERSE بنيتها وحرارتها السطحية وعمرها، من صفحات ناسا عن المجموعة الشمسية والشمس. وكل نظام طاقة تقريباً في عتاد هذه المجموعة موجود بسبب الشمس: فالألواح الشمسية تحوّل ضوءها إلى كهرباء، والمولدات الحرارية ذات النظارة المشعّة تحوّل حرارة اضمحلالها إلى طاقة.",
    sourceIds: ["SRC-NASA-SUN", "SRC-NASA-SOLAR-SYSTEM"],
    locales: ["en", "ar"],
  },

  /* ------------------------------------------------------------- deep sky */
  {
    id: "faq-galaxies",
    question: "What is a galaxy?",
    aliases: [
      "What is the Milky Way?",
      "How many galaxies are there?",
      "Tell me about galaxies",
    ],
    keywords: ["galaxy", "galaxies", "milky", "way", "spiral"],
    questionAr: "ما هي المجرة؟",
    aliasesAr: ["ما هي مجرة درب التبانة؟", "حدثني عن المجرات"],
    keywordsAr: ["مجرة", "مجرات", "درب", "التبانة", "حلزونية"],
    answer:
      "A galaxy is a gravitationally bound collection of stars, gas and dust. The Milky Way is a barred spiral galaxy about 100,000 light-years across, containing hundreds of billions of stars, and the Sun sits about 27,000 light-years from its centre.\n\nGRAVERSE records eight deep-sky objects, from the nearest large spiral galaxy — Andromeda, about 2.5 million light-years away — to the Whirlpool and Sombrero galaxies, the Crab and Orion nebulae, the Eagle Nebula of the Pillars of Creation, and Sagittarius A*, the supermassive black hole at the centre of our own galaxy.",
    answerAr:
      "المجرة مجموعة نجوم وغاز وغبار مرتبطة بالجاذبية. ودرب التبانة مجرة حلزونية شريطية عرضها نحو 100,000 سنة ضوئية، تضم مئات الملايين من النجوم، وتقع الشمس على بعد نحو 27,000 سنة ضوئية من مركزها.\n\nيسجّل GRAVERSE ثمانية أجسام خارج مجرتنا، من أقرب مجرة حلزونية كبيرة — أندروميدا، على بعد نحو 2.5 مليون سنة ضوئية — إلى مجرتي الدوامة والقبعة، وسدّي السرطان والأ Orion، وسد النسر وأعمدة الخلق، وساجيتياريوس A*، الثقب الأسود فائق الكتلة في مركز مجرتنا.",
    sourceIds: ["SRC-NASA-MILKY-WAY", "SRC-NASA-ANDROMEDA"],
    locales: ["en", "ar"],
  },
  {
    id: "faq-black-holes",
    question: "What is a black hole?",
    aliases: [
      "How does a black hole work?",
      "What is Sagittarius A*?",
      "Tell me about black holes",
    ],
    keywords: ["black", "hole", "event", "horizon", "sgr", "supermassive"],
    questionAr: "ما هو الثقب الأسود؟",
    aliasesAr: ["كيف يعمل الثقب الأسود؟", "حدثني عن الثقوب السوداء"],
    keywordsAr: ["ثقب", "سوداء", "الأفق", "الحدث", "فائق", "الكتلة"],
    answer:
      "A black hole is an object whose gravity is strong enough that nothing, not even light, can escape from inside its event horizon.\n\nGRAVERSE records Sagittarius A*, the supermassive black hole at the centre of the Milky Way: about four million times the mass of the Sun, about 27,000 light-years away. It was inferred from the orbits of stars near the galactic centre and later imaged in radio wavelengths by the Event Horizon Telescope, which combines radio dishes across Earth to resolve the shadow of the black hole.",
    answerAr:
      "الثقب الأسود جسم جاذبيته قوية بما يكفي بحيث لا يستطيع أي شيء — ولا حتى الضوء — أن يفلت من داخل أفق الحدث.\n\nيسجّل GRAVERSE ساجيتياريوس A*، الثقب الأسود فائق الكتلة في مركز درب التبانة: نحو أربعة ملايين ضعف كتلة الشمس، على بعد نحو 27,000 سنة ضوئية. استُنتج من مدارات النجوم القريبة من مركز المجرة، ثم صُوِّر بالموجات اللاسلكية عبر تلسكوب أفق الحدث، الذي يجمع هوائيات لاسلكية عبر الأرض ليصوّر ظلّ الثقب الأسود.",
    sourceIds: ["SRC-NASA-SGR-A", "SRC-NASA-MILKY-WAY"],
    relatedRecordIds: ["sagittarius-a"],
    locales: ["en", "ar"],
  },
  {
    id: "faq-exoplanets",
    question: "What is an exoplanet?",
    aliases: [
      "Are there planets outside our Solar System?",
      "How do we find exoplanets?",
    ],
    keywords: ["exoplanet", "exoplanets", "outside", "solar", "system"],
    questionAr: "ما هو الكوكب exoplanet؟",
    aliasesAr: ["هل توجد كواكب خارج مجموعتنا الشمسية؟", "كيف نكتشف exoplanets؟"],
    keywordsAr: ["exoplanet", "خارج", "المجموعة", "الشمسية"],
    answer:
      "An exoplanet is a planet orbiting a star other than the Sun.\n\nGRAVERSE's collection is deliberately about the Solar System and the hardware we sent there, so it holds no exoplanet records. The NASA black-hole and galaxy references it cites explain the observing techniques that make exoplanet hunting possible — measuring the small wobble a planet induces in its star, and the dimming when it passes in front — but any specific exoplanet would need a source this archive does not hold, and GRAVERSE will not invent one.",
    answerAr:
      "الكوكب خارج المجموعة الشمسية هو كوكب يدور حول نجم غير الشمس.\n\nمجموعة GRAVERSE تخص المجموعة الشمسية والعتاد الذي أرسلناه إليها، ولذلك لا تحتوي على أي سجلات exoplanets. أما مراجع ناسا للثقوب السوداء والمجرات التي يستشهد بها GRAVERSE فتشرح تقنيات الرصد التي تجعل البحث عن exoplanets ممكنة — قياس التمايل الصغير الذي يُحدثه الكوكب في نجمه، والإضاءة الخافتة عندما يعبر أمامه — لكن أي كوكب محدد بعينه يحتاج مصدراً لا تملكه هذه الأرشيف، وGRAVERSE لن يخترع واحداً.",
    sourceIds: ["SRC-NASA-SGR-A", "SRC-NASA-MILKY-WAY"],
    locales: ["en", "ar"],
  },
  {
    id: "faq-nebulae",
    question: "What is a nebula?",
    aliases: [
      "Tell me about the Orion Nebula",
      "What is a supernova remnant?",
      "What is the Crab Nebula?",
    ],
    keywords: ["nebula", "supernova", "star", "formation", "orion", "crab"],
    questionAr: "ما هو السديم؟",
    aliasesAr: ["حدثني عن سديم الجبار", "ما هو بقايا انفجار نجمي؟"],
    keywordsAr: ["سديم", "انفجار", "نجم", "تشكل", "الجبار", "السرطان"],
    answer:
      "A nebula is a vast cloud of gas and dust in space. Some are stellar nurseries where new stars are forming; others are the expanding wreckage of stars that have exploded.\n\nThe Orion Nebula, about 1,344 light-years away in Orion, is the nearest large star-forming region and is visible to the unaided eye. The Crab Nebula, about 6,500 light-years away in Taurus, is the remnant of a star that exploded in 1054 CE, recorded by astronomers in China and Japan, with a spinning neutron star at its centre.",
    answerAr:
      "السديم سحابة هائلة من الغاز والغبار في الفضاء. بعضها حاضنات نجوم تتشكل فيها نجوم جديدة، وبعضها حطام منفجر لنجوم متفجرة.\n\nسديم الجبار (M42)، على بعد نحو 1,344 سنة ضوئية في برج Orion (الجبار)، هو أقرب منطقة كبرى لتشكل النجوم ويُرى بالعين المجردة. أما سديم السرطان، على بعد نحو 6,500 سنة ضوئية في الثور، فهو بقايا نجم انفجر عام 1054 ميلادية، وقد سجّله فلكيون في الصين واليابان، وفي مركزه نجم نابض دوّار.",
    sourceIds: ["SRC-NASA-ORION", "SRC-NASA-CRAB"],
    relatedRecordIds: ["orion-nebula", "crab-nebula"],
    locales: ["en", "ar"],
  },

  /* ------------------------------------------------------------- hardware */
  {
    id: "faq-rover",
    question: "What is a rover?",
    aliases: [
      "What does a rover do?",
      "How do rovers work?",
      "What is a Mars rover?",
    ],
    keywords: ["rover", "rovers", "wheel", "drive", "mars"],
    questionAr: "ما هي العربة (Rover)؟",
    aliasesAr: ["ماذا تفعل العربة؟", "كيف تعمل العربات؟"],
    keywordsAr: ["عربة", "عربات", "عجلات", "المريخ"],
    answer:
      "A rover is a robotic vehicle designed to travel across a surface and explore it, usually under remote control from Earth rather than by a person aboard.\n\nGRAVERSE records six NASA rover missions: Sojourner, which proved roving was possible at all; Spirit and Opportunity, which worked on opposite sides of Mars; Curiosity; and Perseverance, which caches sealed rock samples for a possible future return mission. Each record lists the machine's mass, power source, instruments and, importantly, what became of it.",
    answerAr:
      "العربة مركبة روبوتية مصممة للتنقل على سطح واستكشافه، وغالباً تحت تحكم من الأرض لا بطاقم داخلها.\n\nيسجّل GRAVERSE ست مهمات لعربات ناسا: سبوتونر، التي أثبتت أن التنقل ممكن أصلاً؛ وسبيريت وأوبورتيونيتي، عملتا على جانبي المريخ؛ وكوريوسيتي؛ وبيرسيفرانس، التي تعقّم عينات صخرية لِإعادة محتملة في المستقبل. ويذكر كل سجل كتلة الآلة ومصدر طاقتها وأجهزتها، والأهم: ما حدث لها.",
    sourceIds: ["SRC-NASA-MARS"],
    relatedRecordIds: ["sojourner", "spirit", "opportunity", "curiosity", "perseverance"],
    locales: ["en", "ar"],
  },
  {
    id: "faq-spacecraft-types",
    question: "What kinds of spacecraft are in GRAVERSE?",
    aliases: [
      "What is an orbiter?",
      "What is a lander?",
      "What is a probe?",
      "What is an instrument?",
    ],
    keywords: ["orbiter", "lander", "probe", "instrument", "spacecraft", "types"],
    questionAr: "ما أنواع المركبات الفضائية في GRAVERSE؟",
    aliasesAr: ["ما هي المنصة المدارية؟", "ما هي مركبة الهبوط؟", "ما هو المسبار؟"],
    keywordsAr: ["مدار", "هبوط", "مسبار", "جهاز", "مركبة", "أنواع"],
    answer:
      "Seven hardware types, all of them real NASA machines:\n\n- **Rovers** — wheeled vehicles that drove across a surface: Sojourner, Spirit, Opportunity, Curiosity, Perseverance.\n- **Landers** — machines that descended and stayed in one place: the Surveyors, the Viking landers, Mars Pathfinder, Phoenix, InSight.\n- **Orbiters** — spacecraft that stayed in orbit while they worked: Mariner 9, the Voyagers, Cassini, New Horizons.\n- **Probes** — machines sent to fly past or impact a target: the Rangers, Pioneer 10 and 11.\n- **Instruments** — deployable experiment packages left on a surface: the Apollo ALSEP packages and the lunar laser retroreflectors.\n- **Surface equipment** and **aircraft** — the Mars 2020 descent stage and Ingenuity, the first aircraft to fly on another planet.",
    answerAr:
      "سبعة أنواع من العتاد، كلها آلات حقيقية من ناسا:\n\n- **عربات** — مركبات بعجلات سارت على سطح: سبوتونر، وسبيريت، وأوبورتيونيتي، وكوريوسيتي، وبيرسيفرانس.\n- **مركبات هبوط** — نزلت واستقرت في مكان واحد: سيرفاور، ومركبتا فينغر، ومركبة Pathfinder، وفينكس، وإنسايت.\n- **منصات مدارية** — بقيت في مدارها أثناء عملها: مارينر 9، وفوياجر، وكاسيني، ونيو هورايزنز.\n- **مجسات** — أُرسلت لتمرّ بجانب هدف أو ترتطم به: رانجر، وبايونير 10 و11.\n- **أجهزة** — حزم تجارب تُترك على السطح: حزم ALSEP من أبولو والمرايا الليزرية القمري��.\n- **عتاد سطحي** و**طائرات** — مركبة إنزال Mars 2020 وإنجينيويتي، أول طائرة تحلق على كوكب آخر.",
    sourceIds: ["SRC-NASA-MARS", "SRC-NASA-PLANETARY-FACTS"],
    locales: ["en", "ar"],
  },
  {
    id: "faq-mission-vs-spacecraft",
    question: "What is the difference between a mission and a spacecraft?",
    aliases: [
      "Is a mission the same as a spacecraft?",
      "What does GRAVERSE call a mission?",
    ],
    keywords: ["mission", "spacecraft", "difference", "program"],
    questionAr: "ما الفرق بين المهمة والمركبة الفضائية؟",
    aliasesAr: ["هل المهمة هي المركبة نفسها؟"],
    keywordsAr: ["مهمة", "مركبة", "فضائية", "فرق"],
    answer:
      "A mission is the whole job: the spacecraft, the launch, the trajectory, the operations and the people. A spacecraft is the machine that does the job.\n\nGRAVERSE keeps them apart because one mission can carry several machines. Mars 2020, for example, sent Perseverance, the Ingenuity helicopter and a descent stage. The mission record is *derived* from the artifact records that belong to it, so a mission page can never claim a date that its hardware does not support.",
    answerAr:
      "المهمة هي العمل كاملاً: المركبة، والإطلاق، والمسار، والعمليات، والفريق. أما المركبة الفضائية فهي الآلة التي تنفّذ العمل.\n\nيفصل GRAVERSE بينهما لأن مهمة واحدة قد تحمل عدة آلات. فقد أطلقت مهمة Mars 2020 عربة بيرسيفرانس ومروحية إنجينيويتي ومركبة إنزال. وسجل المهمة مُشتق من سجلات العتاد التابعة لها، فلا يمكن لصفحة مهمة أن تدّعي تاريخاً لا تدعمه آلاتها.",
    sourceIds: ["SRC-NASA-MARS"],
    relatedRecordIds: ["perseverance", "ingenuity", "mars-2020-descent-stage"],
    locales: ["en", "ar"],
  },
  {
    id: "faq-what-was-left",
    question: "What has NASA left on the Moon and Mars?",
    aliases: [
      "What equipment was left behind?",
      "How much hardware is still there?",
      "What is still sitting on the Moon?",
    ],
    keywords: ["left", "behind", "abandoned", "discarded", "moon", "mars"],
    questionAr: "ماذا تركت ناسا على القمر والمريخ؟",
    aliasesAr: ["ما المعدات المتروكة خلفاً؟", "ما الذي ما زال موجوداً على القمر؟"],
    keywordsAr: ["ترك", "متروك", "مهجور", "قمر", "مريخ"],
    answer:
      "Twelve of GRAVERSE's thirty records are Moon hardware and eleven are Mars hardware.\n\nOn the Moon that means impact probes, soft landers, Apollo descent stages, rovers, ALSEP experiment packages and the laser retroreflectors. On Mars it means the Viking landers, the Pathfinder lander, Sojourner, Spirit, Opportunity, Curiosity, Perseverance, Ingenuity, Phoenix, InSight and two descent stages.\n\nGRAVERSE records what became of each one: still operating, inactive, no longer communicating, impacted, destroyed, or still travelling — and, where the record does not establish a location precisely, it says so rather than plotting a guess.",
    answerAr:
      "اثنا عشر سجلاً من الثلاثين في GRAVERSE عتاد قمري، وأحد عشر عتاد مريخي.\n\nعلى القمر: مجسات ارتطام، ومركبات هبوط ناعم، ووحدات إنزال أبولو، وعربات، وحزم تجارب ALSEP، والمرايا الليزرية. وعلى المريخ: مهبطا فينغر، ومركبة Pathfinder، وسبوتونر، وسبيريت، وأوبورتيونيتي، وكوريوسيتي، وبيرسيفرانس، وإنجينيويتي، وفينكس، وإنسايت، ومركبتا إنزال.\n\nيسجّل GRAVERSE ما صار لكل منها: ما زالت تعمل، أو خاملة، أو لم تعد تبث، أو اصطدمت، أو دُمّرت، أو ما زالت في طريقها — وحيث لا يثبت السجل موقعاً بدقة، يقول ذلك صراحة بدل أن يرسم تخميناً.",
    sourceIds: ["SRC-NASA-MOON", "SRC-NASA-MARS"],
    locales: ["en", "ar"],
  },
  {
    id: "faq-how-to-explore",
    question: "How do I explore GRAVERSE?",
    aliases: [
      "Where do I start?",
      "What should I look at first?",
      "How do I find something?",
    ],
    keywords: ["start", "begin", "explore", "find", "first", "browse"],
    questionAr: "كيف أستكشف مشروع GRAVERSE؟",
    aliasesAr: ["من أين أبدأ؟", "ماذا أرى أولاً؟", "كيف أجد شيئاً؟"],
    keywordsAr: ["ابدأ", "استكشف", "اجمع", "أولاً", "تصفح"],
    answer:
      "Three routes, depending on what you want:\n\n- **Follow the hardware.** Open the Museum, step into the exhibition hall, and read the records in launch order. Every artifact page answers the same questions: what it was, why it was sent, what it found, and what happened to it.\n- **Follow a question.** The Academy teaches the same records in age bands, and the Engineering Lab explains how power, mobility, landing, communication and instruments actually work.\n- **Follow the data.** Explorer puts 118 mission events on a timeline, filters the whole collection, and opens the twenty destinations.\n\nEverything is linked, so any route ends up in the same source-linked records.",
    answerAr:
      "ثلاث طرق، بحسب ما تريد:\n\n- **اتبع العتاد.** افتح المتحف، ودخل قاعة العرض، واقرأ السجلات بترتيب الإطلاق. تجيب كل صفحة قطعة عن الأسئلة نفسها: ما هي، ولماذا أُرسلت، وماذا اكتشفت، وماذا حدث لها.\n- **اتبع سؤالاً.** تعلّم الأكاديمية السجلات نفسها بحسب الفئة العمرية، ويشرح مختبر الهندسة كيف تعمل الطاقة والحركة والهبوط والاتصال والأجهزة فعلياً.\n- **اتبع البيانات.** يضع المستكشف 118 حدثاً للمهام على خط زمني، ويتيح تصفية المجموعة كاملة، ويفتح الوجهات العشرين.\n\nكل شيء مترابط، فكل طريق ينتهي عند السجلات نفسها المرتبطة بالمصادر.",
    sourceIds: [],
    locales: ["en", "ar"],
  },
  {
    id: "faq-agency",
    question: "What is NASA?",
    aliases: [
      "Who operates these spacecraft?",
      "What agencies are in GRAVERSE?",
      "Tell me about the space agencies",
    ],
    keywords: ["nasa", "agency", "agencies", "operates", "esa", "jaxa"],
    questionAr: "ما هي ناسا؟",
    aliasesAr: ["من يشغّل هذه المركبات؟", "حدثني عن وكالات الفضاء"],
    keywordsAr: ["ناسا", "وكالة", "وكالات", "يشغل"],
    answer:
      "NASA — the National Aeronautics and Space Administration — is the United States' civil space agency. Its mandate, history and current programmes are recorded in GRAVERSE's agency list, alongside seven other agencies: the European Space Agency, JAXA, ISRO, CNSA, Roscosmos, the Canadian Space Agency and the UK Space Agency.\n\nThe Explorer status board uses the same agency list, and each mission page links the agency that operated it.",
    answerAr:
      "ناسا — الإدارة الوطنية للطيران والفضاء — هي وكالة فضاء مدنية الأمريكية. ويُسجّل GRAVERSE في قائمة وكالاته اختصاصها وتاريخها وبرامجها الحالية، إلى جانب سبع وكالات أخرى: الوكالة الأوروبية للفضاء، وجاكسا، وإيسرو، والصين، وروسك، والوكالة الكندية للفضاء، ووكالة المملكة المتحدة للفضاء.\n\nوتستخدم لوحة الحالة في المستكشف قائمة الوكالات نفسها، وترتبط كل صفحة مهمة بالوكالة التي شغّلتها.",
    sourceIds: ["SRC-NASA-AGENCY", "SRC-ESA-AGENCY"],
    relatedRecordIds: ["nasa"],
    locales: ["en", "ar"],
  },
  {
    id: "faq-open-data",
    question: "Can I download the GRAVERSE dataset?",
    aliases: [
      "Is there an API?",
      "Can I use this data?",
      "Where is the open dataset?",
    ],
    keywords: ["dataset", "download", "api", "export", "data", "json"],
    questionAr: "هل يمكنني تحميل بيانات مشروع GRAVERSE؟",
    aliasesAr: ["هل هناك واجهة برمجية؟", "أين البيانات المفتوحة؟"],
    keywordsAr: ["بيانات", "تحميل", "واجهة", "تصدير", "json"],
    answer:
      "Yes. `GET /api/export` serves the whole public dataset as JSON: artifacts, missions, sources, destinations, deep-sky objects, lessons, journeys, articles, agencies, glossary, engineering topics, stories and simulations — with a metadata block that states the schema version and the provenance of the facts.\n\nThe endpoint is public and the response is cached for an hour at the edge and a day in the browser. The factual data is attributed to the registered sources; GRAVERSE's editorial prose is written for this NASA Space Apps Challenge project.",
    answerAr:
      "نعم. تخدم `GET /api/export` مجموعة البيانات العامة كاملة بصيغة JSON: القطع والمهام والمصادر والوجهات والأجسام خارج المجموعة الشمسية والدروس والمسارات والمقالات والوكالات والمسرد والمواضيع الهندسية والقصص والمحاكيات — مع كتلة بيانات وصفية تذكر إصدار المخطط ومصدر الحقائق.\n\nالواجهة عامة، والاستجابة مخزّنة مؤقتاً لمدة ساعة عند الحافة ويوماً في المتصفح. والبيانات الواقعية منسوبة إلى المصادر المسجّلة، أما النصوص التحريرية في GRAVERSE فمكتوبة لمشروع تحدي ناسا لتطبيقات الفضاء.",
    sourceIds: [],
    locales: ["en", "ar"],
  },
  {
    id: "faq-ai-disclosure",
    question: "Is this answer written by an AI?",
    aliases: [
      "Are you a robot?",
      "Is this AI generated?",
      "Can I trust this answer?",
    ],
    keywords: ["ai", "robot", "generated", "trust", "accurate", "human"],
    questionAr: "هل هذه الإجابة مكتوبة بالذكاء الاصطناعي؟",
    aliasesAr: ["هل أنت روبوت؟", "هل يمكنني الوثوق بهذه الإجابة؟"],
    keywordsAr: ["ذكاء", "اصطناعي", "روبوت", "موثوق", "دقيق"],
    answer:
      "Some answers are, and the interface tells you which. A **GRAVERSE Knowledge** answer was assembled locally from the archive's own records — no external service was involved. A **Saved answer** was reused from the cache. An **AI-assisted** answer كان written by a free OpenRouter model using the same GRAVERSE records as its only source material.\n\nWhatever the source, the sources are listed underneath the answer, and the records themselves are the authority: check any claim against the original NASA page before relying on it.",
    answerAr:
      "بعض الإجابات كذلك، والواجهة تخبرك أيها. الإجابة الموسومة بـ **معرفة GRAVERSE** بُنيت محلياً من سجلات الأرشيف نفسها، دون أي خدمة خارجية. والإجابة الموسومة بـ **إجابة محفوظة** أُعيد استخدامها من الذاكرة المؤقتة. أما الإجابة الموسومة بـ **بمساعدة الذكاء الاصطناعي** فكتبها نموذج مجاني من OpenRouter باستخدام سجلات GRAVERSE بوصفها مادّتها الوحيدة.\n\nوأياً كان المصدر، تُدرج المصادر أسفل الإجابة، والسجلات نفسها هي المرجع: تحقّق من أي ادعاء مقابل صفحة ناسا الأصلية قبل الاعتماد عليه.",
    sourceIds: [],
    locales: ["en", "ar"],
  },
  {
    id: "faq-stars",
    question: "What are stars?",
    aliases: [
      "How are stars born?",
      "What is a nebula made of?",
      "How do stars form?",
    ],
    keywords: ["stars", "star", "born", "form", "sun", "stellar"],
    questionAr: "ما هي النجوم؟",
    aliasesAr: ["كيف تولد النجوم؟", "ما النجوم من؟"],
    keywordsAr: ["نجوم", "نجم", "ولادة", "تكون", "شمس"],
    answer:
      "A star is a huge ball of gas held together by its own gravity, held alight by fusion in its core. The Sun is one — a middle-aged star about 4.6 billion years old, and the reason every machine in this collection carries either solar panels or a radioisotope generator.\n\nStars are born inside nebulae, the great clouds of gas and dust GRAVERSE records. The Orion Nebula is the nearest large star-forming region to Earth, and the Eagle Nebula holds the Pillars of Creation, a column of gas being hollowed out by the light of newborn stars.",
    answerAr:
      "النجم كرة غازية هائلة يحفظها جاذبيته الخاصة، ويبقيها متوهجة بالدمج في قلبه. الشمس نجم في منتصف عمره، نحو 4.6 مليار سنة، وهي السبب في أن كل آلة في هذه المجموعة تحمل إما ألواحاً شمسية أو مولداً حرارياً مشعّاً.\n\nوتولد النجوم داخل السديم، وهي سحب الغبار والغاز الكبيرة التي يسجّلها GRAVERSE. فسديم الجبار أقرب منطقة كبرى لتشكل النجوم إلى الأرض، وفي سديم النسر أعمدة الخلق: عمود غازٍ تحفره ضوء النجوم الوليدة.",
    sourceIds: ["SRC-NASA-SUN", "SRC-NASA-ORION", "SRC-NASA-PILLARS"],
    relatedRecordIds: ["sun", "orion-nebula", "eagle-nebula"],
    locales: ["en", "ar"],
  },
  {
    id: "faq-space-mission",
    question: "What is a space mission?",
    aliases: [
      "How does a NASA mission work?",
      "What are the stages of a mission?",
      "What is a launch window?",
    ],
    keywords: ["mission", "launch", "stages", "orbit", "operations"],
    questionAr: "ما هي المهمة الفضائية؟",
    aliasesAr: ["كيف تعمل مهمة ناسا؟", "ما مراحل المهمة؟"],
    keywordsAr: ["مهمة", "إطلاق", "مراحل", "مدار", "عمليات"],
    answer:
      "A space mission is the whole undertaking: designing and building the spacecraft, choosing and flying to the target, the operations that keep it working, and the analysis of what it sends back. GRAVERSE records the milestones of each mission in order — launch, arrival or orbit insertion, deployment, first operation, last contact, end of mission.\n\nThe mission page is derived from the artifact records that belong to it. That means a mission can never claim a date that its own hardware does not support, and it is why GRAVERSE can tell you exactly when contact was lost.",
    answerAr:
      "المهمة الفضائية هي المشروع كله: تصميم المركبة وبناؤها، واختيار الهدف والوصول إليه، والعمليات التي تُبقيها تعمل، وتحليل ما تعيده. ويسجّل GRAVERSE محطات كل مهمة بالترتيب: الإطلاق، والوصول أو المدار، والنشر، وأول عملية، وآخر اتصال، ونهاية المهمة.\n\nو صفحة المهمة مُشتقة من سجلات العتاد التابعة لها. وهذا يعني أن المهمة لا يمكن أن تدّعي تاريخاً لا تدعمه آلاتها، وهو أيضاً سبب قدرة GRAVERSE على تحديد اللحظة التي انقطع فيها الاتصال بدقة.",
    sourceIds: ["SRC-NASA-AGENCY", "SRC-NASA-MOON", "SRC-NASA-MARS"],
    locales: ["en", "ar"],
  },
  {
    id: "faq-compare",
    question: "How do I compare two artifacts?",
    aliases: [
      "Can I compare two records?",
      "How do I see two machines side by side?",
      "Where is the comparison tool?",
    ],
    keywords: ["compare", "comparison", "side", "versus", "difference", "two"],
    questionAr: "كيف أقارن بين قطعتين؟",
    aliasesAr: ["هل يمكنني مقارنة سجلين؟", "أين أداة المقارنة؟"],
    keywordsAr: ["مقارنة", "مقارنه", "اثنان", "فرق"],
    answer:
      "GRAVERSE has a comparison view at `/compare`: pick two artifacts and it lines up their destination, launch date, mission status, hardware status and technical details side by side.\n\nYou can also just ask me. Ask \"Compare Perseverance Rover and Curiosity Rover\" and I will build the comparison from the two records, using only the fields both of them actually have. Where a field exists for one machine and not the other, I will say so rather than filling the gap.",
    answerAr:
      "يوجد في GRAVERSE عرض للمقارنة على `/compare`: اختر قطعتين فيُعرض وجههما وجهة الإقلاع وتاريخ الإطلاق وحالة المهمة وحالة العتاد والتفاصيل التقنية جنباً إلى جنب.\n\nو يمكنك أيضاً أن تسألني مباشرة. اسأل \"قارن بيرسيفرانس وكوريوسيتي\" وسأبني المقارنة من السجلين، مستخدماً الحقول التي تتوفر لديهما فقط. وحيث يوجد حقل في آلة دون أخرى، سأقول ذلك بدل أن أسدّ الفجوة.",
    sourceIds: [],
    locales: ["en", "ar"],
  },
];

export const LOCAL_FAQ_BY_ID = new Map(LOCAL_FAQ.map((entry) => [entry.id, entry]));
