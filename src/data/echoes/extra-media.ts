import extraManifestJson from "./extra-media-manifest.json";
import type { EchoMedia, Localized, MediaKind } from "@/types/echo";

/**
 * Supplementary ECHOES imagery.
 *
 * The curated story files carry a hero frame and a handful of gallery frames
 * each. A cinematic presentation needs more frames than that, so a second,
 * purely supporting set of NASA Image and Video Library assets is registered
 * here. Nothing in this file adds a claim to a story: every record describes
 * only the picture it points at.
 *
 * The story data files are untouched. The cinematic director pulls these
 * frames in as supporting imagery for the scenes that would otherwise be
 * empty, and the credits panel lists them with their NASA attribution.
 */

interface ExtraManifestImage {
  nasaId: string;
  story: string;
  role: string;
  title: string;
  description: string;
  center: string;
  secondaryCreator: string;
  photographer: string;
  dateCreated: string;
  keywords: string[];
  local: string;
  thumb: string;
  sourceUrl: string;
  assetUrl: string;
  accessedAt: string;
}

interface ExtraManifest {
  generatedAt: string;
  accessedAt: string;
  libraryUrl: string;
  apiUrl: string;
  usageNote: string;
  images: Record<string, ExtraManifestImage>;
}

export const echoExtraManifest = extraManifestJson as unknown as ExtraManifest;

export const ECHO_MEDIA_USAGE: Localized = {
  en: "NASA media. Generally not subject to copyright, and may not be used to imply endorsement of a commercial product or service. Third-party credited assets keep their original credit line.",
  ar: "وسائط من ناسا. غير مشمولة عادةً بحقوق النشر، ولا يجوز استخدامها بما يوحي بتأييد ناسا لمنتج أو خدمة تجارية. أما الأصول المنسوبة إلى أطراف ثالثة فتحتفظ بإسنادها الأصلي.",
};

export const ECHO_MEDIA_USAGE_RECONSTRUCTION: Localized = {
  en: "Educational illustration drawn by GRAVERSE. It is a labelled reconstruction for teaching, not a NASA photograph.",
  ar: "رسم تعليمي من إعداد GRAVERSE. إنه إعادة رسم مُعنونة للتعليم، وليس صورة فوتوغرافية من ناسا.",
};

interface ExtraRecord {
  alt: Localized;
  caption: Localized;
  kind?: MediaKind;
}

/**
 * Bilingual descriptions for every supplementary frame. The English text
 * describes only what the picture shows; the Arabic text is written side by
 * side rather than translated at render time.
 */
const RECORDS: Record<string, ExtraRecord> = {
  /* ---------------------------------------------------------- Sojourner */
  PIA04318: {
    alt: {
      en: "The Sojourner rover parked on rocky ground near a rock the mission called the Wedge.",
      ar: "العربة سوجورنر متوقفة على أرض صخرية قرب صخرة سمّتها المهمة «الوتد».",
    },
    caption: {
      en: "The rover approaches the rock named Wedge, photographed by the Imager for Mars Pathfinder.",
      ar: "العربة تقترب من الصخرة المسماة «الوتد»، في صورة التقطها مصوّر مسار المريخ.",
    },
  },
  PIA00621: {
    alt: {
      en: "A colour mosaic of the Sojourner rover and the unfolded Pathfinder ramps on the Martian surface.",
      ar: "فسيفساء ملوّنة للعربة سوجورنر والمنحدرات المفتوحة لمركبة مسار المريخ على سطح المريخ.",
    },
    caption: {
      en: "The rover and the undeployed ramps of the Pathfinder lander, seen together in one colour mosaic.",
      ar: "العربة ومنحدرات مركبة مسار المريخ غير المفتوحة، في فسيفساء ملوّنة واحدة.",
    },
  },
  PIA00921: {
    alt: {
      en: "The Sojourner rover beside a flat rock named Shark, with its spectrometer arm extended.",
      ar: "العربة سوجورنر بجانب صخرة مسطحة اسمها «القرش»، وذراع مطيافها ممدودة.",
    },
    caption: {
      en: "The rover works at the rock called Shark with the alpha proton X-ray spectrometer on its arm.",
      ar: "العربة تعمل عند الصخرة المسماة «القرش» بمطياف أشعة إكس على ذراعها.",
    },
  },
  PIA00623: {
    alt: {
      en: "The Sojourner rover after its airbag bounce onto the Martian surface.",
      ar: "العربة سوجورنر بعد ارتدادها على وسائد الهواء إلى سطح المريخ.",
    },
    caption: {
      en: "The rover at the moment it reached the surface, photographed by the Pathfinder lander.",
      ar: "العربة لحظة وصولها إلى السطح، في صورة التقطتها مركبة الهبوط.",
    },
  },
  PIA00627: {
    alt: {
      en: "The rear rover ramp of the Mars Pathfinder lander unfurled on the Martian ground.",
      ar: "المنحدر الخلفي للعربة في مركبة مسار المريخ مفتوحاً على أرض المريخ.",
    },
    caption: {
      en: "The ramp that carried the rover down from the lander, photographed after it was unrolled.",
      ar: "المنحدر الذي حمل العربة إلى الأسفل، في صورة بعد فتحه.",
    },
  },
  PIA00632: {
    alt: {
      en: "The Sojourner rover still folded on a lander petal, photographed on the Martian surface.",
      ar: "العربة سوجورنر ما زالت مطوية فوق إحدى بتات الهبوط، في صورة على سطح المريخ.",
    },
    caption: {
      en: "The rover waits on the lander, its ramps not yet unfolded.",
      ar: "العربة تنتظر على مركبة الهبوط، ومنحدراتها لم تُفتح بعد.",
    },
  },
  PIA11431: {
    alt: {
      en: "Full-scale models of three generations of Mars rover standing side by side, from smallest to largest.",
      ar: "نماذج بالحجم الكامل لثلاثة أجيال من عربات المريخ مصفوفة جنباً إلى جنب، من الأصغر إلى الأكبر.",
    },
    caption: {
      en: "The size increase from Sojourner to Spirit and Opportunity to Curiosity.",
      ar: "تزايد الحجم من سوجورنر إلى سبيرت وأوبورتيونيتي إلى كوريوسيتي.",
    },
    kind: "illustration",
  },

  /* ------------------------------------------------------- Opportunity */
  PIA19109: {
    alt: {
      en: "A wide panorama from the top of Cape Tribulation, showing the Martian plain below the rover.",
      ar: "بانوراما واسعة من قمة «كيب تريبيوليشن» تُظهر سهل المريخ تحت العربة.",
    },
    caption: {
      en: "The view Opportunity gained after climbing to the rim of Endeavour Crater.",
      ar: "المشهد الذي حصلته العربة بعد صعودها إلى حافة فوهة إنديفور.",
    },
  },
  PIA16559: {
    alt: {
      en: "A full-circle stereo panorama of the rocky ground around the Opportunity rover.",
      ar: "بانوراما ستيريو دائرية كاملة للأرض الصخرية حول عربة أوبورتيونيتي.",
    },
    caption: {
      en: "The terrain around Opportunity on sol 3105 of the mission.",
      ar: "التضاريس حول العربة في اليوم 3105 من المهمة.",
    },
  },
  PIA13372: {
    alt: {
      en: "An eroded rock outcrop rising from the floor of a Martian crater.",
      ar: "تكوينات صخرية متآكلة ترتفع من قاع فوهة على المريخ.",
    },
    caption: {
      en: "The outcrop the team informally called Cambridge Bay, examined by the rover.",
      ar: "الصف الصخري الذي سمّاه الفريق «خليج كامبريدج»، وقد فحصته العربة.",
    },
  },
  PIA20750: {
    alt: {
      en: "A panoramic view across the floor of Endeavour Crater toward the wall of Marathon Valley.",
      ar: "منظر بانورامي عبر قاع فوهة إنديفور باتجاه جدار وادي ماراثون.",
    },
    caption: {
      en: "The enhanced-colour view along the valley the rover drove through.",
      ar: "المشهد بالألوان المحسّنة على طول الوادي الذي سارت فيه العربة.",
    },
  },
  PIA18595: {
    alt: {
      en: "A panoramic view of the ground and distant hills seen by the Opportunity rover.",
      ar: "منظر بانورامي للأرض والتلال البعيدة التي رأتها عربة أوبورتيونيتي.",
    },
    caption: {
      en: "The rover's surroundings in July 2014, after more than forty kilometres of driving.",
      ar: "محيط العربة في يوليو 2014، بعد أكثر من أربعين كيلومتراً من القيادة.",
    },
  },
  PIA21493: {
    alt: {
      en: "A long ridge of layered rock crossing the floor of Endeavour Crater.",
      ar: "حافة طويلة من الصخر المتطابق تمتد عبر قاع فوهة إنديفور.",
    },
    caption: {
      en: "The layered ridge on the crater rim that the team named Rocheport.",
      ar: "الحافة المتطابقة على حافة الفوهة التي سمّاها الفريق «روش بورت».",
    },
  },

  /* ------------------------------------------------------------- Spirit */
  PIA03250: {
    alt: {
      en: "A sweeping stereo view of the Columbia Hills rising above the floor of Gusev Crater.",
      ar: "منظر ستيريو متّسع لتلال كولومبيا ترتفع فوق قاع فوهة غوسيف.",
    },
    caption: {
      en: "The hills the rover drove toward through the dust of Gusev Crater.",
      ar: "التلال التي سارت نحوها العربة بين غبار فوهة غوسيف.",
    },
  },
  PIA16440: {
    alt: {
      en: "A full-circle panorama of the Martian plain taken from the summit of Husband Hill.",
      ar: "بانوراما دائرية كاملة لسهل المريخ التُقطت من قمة «تل هَزبنَد هيل».",
    },
    caption: {
      en: "The McMurdo panorama, recorded after the rover climbed Husband Hill.",
      ar: "بانوراما «مكموردو»، التي سُجّلت بعد صعود العربة تل هَزبنَد.",
    },
  },
  PIA07262: {
    alt: {
      en: "A stereo panorama of the ground and low hills around the Spirit rover on West Spur.",
      ar: "بانوراما ستيريو للأرض والتلال المنخفضة حول عربة سبيرت في «ويست سبور».",
    },
    caption: {
      en: "The rover's surroundings on sol 305, on the flank of the Columbia Hills.",
      ar: "محيط العربة في اليوم 305، على سفح تلال كولومبيا.",
    },
  },
  PIA07257: {
    alt: {
      en: "Curving wheel tracks crossing the dusty ground of a Martian hillside.",
      ar: "آثار عجلات متعرجة عبر الأرض الترابية على منحدر مريخي.",
    },
    caption: {
      en: "The rover's own tracks, recorded in stereo on the Columbia Hills.",
      ar: "آثار عجلات العربة نفسها، مسجّلة بالستيريو في تلال كولومبيا.",
    },
  },
  PIA17760: {
    alt: {
      en: "The Martian landscape seen looking south from the top of Husband Hill.",
      ar: "منظر لسطح المريخ نحو الجنوب من قمة تل هَزبنَد هيل.",
    },
    caption: {
      en: "The view southward from the ridge the rover climbed in 2005.",
      ar: "المنظر نحو الجنوب من الحافة التي صعدتها العربة في عام 2005.",
    },
  },
  PIA03274: {
    alt: {
      en: "Dark rippled sand ripples on the floor of Gusev Crater.",
      ar: " تموّجات رملية متموجة على قاع فوهة غوسيف.",
    },
    caption: {
      en: "Wind-worked sand ripples recorded by Spirit around the turn of the year.",
      ar: "تموّجات رملية شكّلتها الرياح سجّلتها سبيرت حول رأس السنة.",
    },
  },

  /* ------------------------------------------------------------ Phoenix */
  PIA10732: {
    alt: {
      en: "The Phoenix lander looking down over the Martian ground its scoop can reach.",
      ar: "مركبة الهبوط فينكس تنظر إلى الأرض المريضية التي يستطيع المجرف بلوغها.",
    },
    caption: {
      en: "The area the robotic arm could dig, seen from above the lander deck.",
      ar: "المنطقة التي يمكن للذراع الروبوتية حفرها، من فوق منصة المركبة.",
    },
  },
  PIA09207: {
    alt: {
      en: "A technician inspecting the folded robotic arm of the Phoenix lander during assembly.",
      ar: "فنيّ يفحص الذراع الروبوتية المطوية لمركبة فينكس أثناء التجميع.",
    },
    caption: {
      en: "The robotic arm in the clean room, before the lander was shipped to Mars.",
      ar: "الذراع الروبوتية في الغرفة النظيفة، قبل شحن المركبة إلى المريخ.",
    },
  },
  PIA10793: {
    alt: {
      en: "A wide view of a Phoenix solar panel with the robotic arm reaching over it.",
      ar: "منظر واسع للوحة شمسية في فينكس والذراع الروبوتية تمتد فوقها.",
    },
    caption: {
      en: "One solar wing with the arm and its sample scoop laid across the panel.",
      ar: "إحدى اللوحات الشمسية مع الذراع ومجرفة العينة ممدودة فوقها.",
    },
  },
  PIA10760: {
    alt: {
      en: "The underside of the Phoenix lander, seen as the arm reaches beneath it.",
      ar: "الجهة السفلية من مركبة فينكس، والذراع تمتد إلى ما تحتها.",
    },
    caption: {
      en: "The lander photographed under itself with the robotic arm camera.",
      ar: "المركبة مصوَّرة من أسفلها بكاميرا الذراع الروبوتية.",
    },
  },
  PIA10902: {
    alt: {
      en: "A trench dug into the Martian soil with a bright white layer exposed at the bottom.",
      ar: "خندق محفور في تربة المريخ تظهر في قاعه طبقة بيضاء ساطعة.",
    },
    caption: {
      en: "The first Dodo trench, where the arm exposed the bright layer beneath the surface.",
      ar: "خندق «دودو» الأول، حيث كشفت الذراع الطبقة الساطعة تحت السطح.",
    },
  },
  PIA11000: {
    alt: {
      en: "A bright halo of water ice over the Martian ground, seen by the robotic arm camera.",
      ar: "هالة ساطعة من الجليد المائي فوق أرض المريخ، من كاميرا الذراع الروبوتية.",
    },
    caption: {
      en: "A patch of ice nicknamed Snow Queen, imaged by the robotic arm camera.",
      ar: "بقعة جليد سُمّيت «ملكة الثلج»، التقطتها كاميرا الذراع الروبوتية.",
    },
  },

  /* ------------------------------------------------------------ InSight */
  PIA19664: {
    alt: {
      en: "The InSight lander in a clean room with its solar arrays deployed on the floor.",
      ar: "مركبة إنسايت الهبوط في غرفة نظيفة وألواحها الشمسية منشورة على الأرض.",
    },
    caption: {
      en: "The lander configured for the surface, photographed before launch.",
      ar: "المركبة معدّة للهبوط السطحي، في صورة قبل الإطلاق.",
    },
  },
  PIA21847: {
    alt: {
      en: "Looking up at the InSight lander suspended upside down in a clean room.",
      ar: "نظرة إلى الأعلى إلى مركبة إنسايت معلّقة مقلوبة في غرفة نظيفة.",
    },
    caption: {
      en: "The top deck of the lander, showing the instruments it carries to Mars.",
      ar: "منصة علوية المركبة، وفيها الأدوات التي تحملها إلى المريخ.",
    },
  },
  PIA22647: {
    alt: {
      en: "A dark Martian night sky above the InSight lander, with the lander's deck in shadow.",
      ar: "سماء مريخية ليلية داكنة فوق مركبة إنسايت، ومنصتها في الظل.",
    },
    caption: {
      en: "A long exposure of the Martian sky taken by the lander's context camera.",
      ar: "تعريض طويل لسماء المريخ التقطته كاميرا المشهد على المركبة.",
    },
  },
  PIA22226: {
    alt: {
      en: "An illustration of the InSight lander on the Martian surface with the planet cut away beneath it.",
      ar: "رسم توضيحي لمركبة إنسايت على سطح المريخ مع قطع في الكوكب لكشف باطنه.",
    },
    caption: {
      en: "An artist's impression of a lander listening to marsquakes from the crust inward.",
      ar: "تصوّر فنّي لمركبة تسمع زلازل المريخ من القشرة نحو الداخل.",
    },
    kind: "illustration",
  },
  PIA19811: {
    alt: {
      en: "An illustration of the InSight lander fully deployed on the Martian surface.",
      ar: "رسم توضيحي لمركبة إنسايت الهبوط منشورة بالكامل على سطح المريخ.",
    },
    caption: {
      en: "The deployed lander as it was drawn for the mission in 2015.",
      ar: "المركبة المنشورة كما رُسمت للمهمة عام 2015.",
    },
    kind: "illustration",
  },
  PIA22810: {
    alt: {
      en: "An illustration of the InSight lander firing retrorockets as it descends toward Mars.",
      ar: "رسم توضيحي لمركبة إنسايت تشتغل محركاتها العكسية وهي تهبط نحو المريخ.",
    },
    caption: {
      en: "The descent stage slowing itself with its retrorockets.",
      ar: "مرحلة الهبوط تبطئ نفسها بمحركاتها العكسية.",
    },
    kind: "illustration",
  },

  /* ----------------------------------------------------------- Ingenuity */
  PIA24810: {
    alt: {
      en: "The Martian surface seen from a hovering helicopter, with a low mound on the horizon.",
      ar: "سطح المريخ من مروحية تحلّق فوقه، مع نتوء منخفض على الأفق.",
    },
    caption: {
      en: "A frame taken by the helicopter's own camera during a flight over Faillefeu.",
      ar: "إطار التقطته كاميرا المروحية بنفسها أثناء رحلة فوق «فاييفو».",
    },
  },
  PIA23882: {
    alt: {
      en: "The flight model of the Ingenuity helicopter, photographed before it was shipped to Mars.",
      ar: "النموذج الطائر لمروحية إنجينيتي، مصوَّر قبل شحنه إلى المريخ.",
    },
    caption: {
      en: "The helicopter that flew on Mars, seen in the clean room.",
      ar: "المروحية التي طارت على المريخ، في صورة داخل الغرفة النظيفة.",
    },
  },
  PIA24466: {
    alt: {
      en: "An illustration of a small helicopter flying above the Martian surface.",
      ar: "رسم توضيحي لمروحية صغيرة تحلّق فوق سطح المريخ.",
    },
    caption: {
      en: "An artist's concept of the technology demonstration helicopter on Mars.",
      ar: "تصوّر فنّي لمروحية العرض التوضيحي على المريخ.",
    },
    kind: "illustration",
  },
  PIA23720: {
    alt: {
      en: "An illustration of the helicopter standing on the Martian surface beside a rover.",
      ar: "رسم توضيحي للمروحية واقفة على سطح المريخ إلى جانب عربة.",
    },
    caption: {
      en: "The helicopter shown on the surface with the rover that carries it.",
      ar: "المروحية على السطح مع العربة التي تحملها.",
    },
    kind: "illustration",
  },
  PIA24043: {
    alt: {
      en: "The helicopter on the ground during a deployment test, with the rover nearby.",
      ar: "المروحية على الأرض أثناء اختبار نشر، وعربة قريبة منها.",
    },
    caption: {
      en: "The helicopter being deployed in October 2019, before the flight campaign.",
      ar: "المروحية أثناء نشرها في أكتوبر 2019، قبل حملة الطيران.",
    },
  },
  PIA24440: {
    alt: {
      en: "An open pilot's logbook with ruled pages and handwritten entries.",
      ar: "دفتر طيّار مفتوح بصفحات مسطرة وإدخال بخط اليد.",
    },
    caption: {
      en: "The logbook the flight team kept for each of the helicopter's flights.",
      ar: "الدفتر الذي أداره فريق الطيران لكل رحلة من رحلات المروحية.",
    },
  },

  /* ------------------------------------------------------- Apollo 11 LM */
  "as11-40-5902": {
    alt: {
      en: "Astronaut Edwin Aldrin walking across the lunar surface beside a landing leg of the lunar module.",
      ar: "رائد الفضاء إدوين ألدرين يمشي على سطح القمر إلى جانب إحدى أرجل مركبة الهبوط.",
    },
    caption: {
      en: "Aldrin on the surface, with the lunar module's landing gear behind him.",
      ar: "ألدرين على السطح، وخلفه معدات الهبوط لمركبة الهبوط القمرية.",
    },
  },
  "S69-44464": {
    alt: {
      en: "A sequence of panoramic frames showing the Apollo 11 lunar landing site.",
      ar: "سلسلة من اللقطات البانورامية تُظهر موقع هبوط أبولو 11 على القمر.",
    },
    caption: {
      en: "The panoramas Armstrong recorded of the landing site during the first lunar EVA.",
      ar: "البانورامات التي التقطها أرمسترونغ لموقع الهبوط خلال أول خروج على القمر.",
    },
  },
  "as11-44-6550": {
    alt: {
      en: "The blue Earth rising above the grey limb of the Moon.",
      ar: "الأرض الزرقاء تشرق فوق الحدّ الرمادي للقمر.",
    },
    caption: {
      en: "The Earth above the lunar horizon, seen from the Apollo 11 spacecraft.",
      ar: "الأرض فوق الأفق القمري، من مركبة أبولو 11.",
    },
  },
  "as11-40-5880": {
    alt: {
      en: "A close-up of a boot and its print pressed into the loose lunar soil.",
      ar: "لقطة قريبة لحذاء وأثره منضغط في التربة القمرية المفككة.",
    },
    caption: {
      en: "A bootprint in the lunar regolith, photographed during the Apollo 11 EVA.",
      ar: "أثر حذاء في رُРеاق القمري، في صورة أثناء خروج أبولو 11.",
    },
  },
  "as11-36-5355": {
    alt: {
      en: "Africa, Europe and western Asia seen from orbit around the Moon.",
      ar: "أفريقيا وأوروبا وغرب آسيا من المدار حول القمر.",
    },
    caption: {
      en: "The view of Earth from lunar orbit on the way to the Moon.",
      ar: "منظر الأرض من المدار القمري في الطريق إلى القمر.",
    },
  },
  jsc2007e045375: {
    alt: {
      en: "Panoramic views of several Apollo landing sites across the Moon.",
      ar: "مشاهد بانورامية لمواقع هبوط أبولو المتعددة على القمر.",
    },
    caption: {
      en: "Surface panoramas of the Apollo landing sites used to study the terrain.",
      ar: "بانورامات سطحية لمواقع هبوط أبولو استُخدمت لدراسة التضاريس.",
    },
  },

  /* ---------------------------------------------------------- Apollo ALSEP */
  "as12-47-6918": {
    alt: {
      en: "Three deployed experiment packages standing on the lunar surface.",
      ar: "ثلاث حزم تجارب منشورة على سطح القمر.",
    },
    caption: {
      en: "Part of the Apollo 12 lunar surface experiments package, photographed by Alan Bean.",
      ar: "جزء من حزمة تجارب سطح القمر في أبولو 12، في صورة التقطها ألان بين.",
    },
  },
  "as14-67-09361": {
    alt: {
      en: "Two instruments of the Apollo 14 experiment station standing on the Moon.",
      ar: "جهازان من محطة تجارب أبولو 14 واقفان على القمر.",
    },
    caption: {
      en: "Two components of the Apollo 14 lunar surface experiments package.",
      ar: "مكوّنان من حزمة تجارب سطح القمر في أبولو 14.",
    },
  },
  "as14-67-09364": {
    alt: {
      en: "A small charged particle experiment box standing on the lunar soil.",
      ar: "صندوق صغير لتجربة الجسيمات المشحونة واقف على التربة القمرية.",
    },
    caption: {
      en: "The charged particle lunar environment experiment, deployed at Hadley.",
      ar: "تجربة بيئة الجسيمات المشحونة للقمر، المنشورة في هادلي.",
    },
  },
  "as14-67-09362": {
    alt: {
      en: "A small passive seismic experiment, with a wire running away across the lunar soil.",
      ar: "تجربة زلزالية سلبية صغيرة، وسلك يمتد منها عبر التربة القمرية.",
    },
    caption: {
      en: "The passive seismic experiment of the Apollo 14 station.",
      ar: "التجربة الزلزالية السلبية في محطة أبولو 14.",
    },
  },
  "as16-114-18388": {
    alt: {
      en: "Astronaut John Young standing at the site where the Apollo 16 experiments were deployed.",
      ar: "رائد الفضاء جون يونغ واقف عند موقع نشر تجارب أبولو 16.",
    },
    caption: {
      en: "Young at the deployment site during the first Apollo 16 EVA.",
      ar: "يونغ في موقع النشر أثناء أول خروج لأبولو 16.",
    },
  },
  "as12-46-6807": {
    alt: {
      en: "Astronaut Alan Bean carrying the two sub-packages of the experiment package.",
      ar: "رائد الفضاء ألان بين يحمل الحزمتين الفرعيتين من حزمة التجارب.",
    },
    caption: {
      en: "Bean transporting the two sub-packages during the Apollo 12 EVA.",
      ar: "بين ينقل الحزمتين الفرعيتين أثناء خروج أبولو 12.",
    },
  },
  "S70-50764": {
    alt: {
      en: "A lunar map marked with the traverse route planned for the Apollo 14 landing.",
      ar: "خريطة قمرية عليها مسار الرحلة المخطط له لهبوط أبولو 14.",
    },
    caption: {
      en: "The traverse plan for the Apollo 14 mission, drawn before the landing.",
      ar: "خطة الرحلة لمهمة أبولو 14، مرسومة قبل الهبوط.",
    },
    kind: "illustration",
  },

  /* ---------------------------------------------------- Lunar Roving Vehicle */
  "as15-88-11901": {
    alt: {
      en: "The Lunar Roving Vehicle standing alone on the lunar surface, away from the astronauts.",
      ar: "المركبة الجوّالة القمرية واقفة وحدها على سطح القمر، بعيداً عن الرواد.",
    },
    caption: {
      en: "The rover photographed by itself against the lunar background.",
      ar: "المركبة مصوَّرة وحدها أمام خلفية قمرية.",
    },
  },
  "S71-16722": {
    alt: {
      en: "Two Apollo 15 crew members standing beside the Lunar Roving Vehicle in a training hall.",
      ar: "عضوان من طاقم أبولو 15 يقفان إلى جانب المركبة الجوّالة في قاعة تدريب.",
    },
    caption: {
      en: "The Apollo 15 crew with the rover during training on the ground.",
      ar: "طاقم أبولو 15 مع المركبة أثناء التدريب على الأرض.",
    },
  },
  "as15-86-11602": {
    alt: {
      en: "Astronaut James Irwin kneeling beside the Lunar Roving Vehicle on the Moon.",
      ar: "رائد الفضاء جيمس إيروين راكعاً إلى جانب المركبة الجوّالة على القمر.",
    },
    caption: {
      en: "Irwin working on the rover during the Apollo 15 EVA.",
      ar: "إيروين يعمل على المركبة أثناء خروج أبولو 15.",
    },
  },
  "S71-43943": {
    alt: {
      en: "A full-circle mosaic of the Apollo 15 landing site at Hadley.",
      ar: "فسيفساء دائرية كاملة لموقع هبوط أبولو 15 في هادلي.",
    },
    caption: {
      en: "The 360-degree EVA panorama of the Hadley landing site.",
      ar: "بانوراما الخروج كاملةً 360 درجة لموقع هبوط هادلي.",
    },
  },
  "as15-85-11437": {
    alt: {
      en: "Astronaut David Scott holding a sampling tool on the slope of a lunar valley.",
      ar: "رائد الفضاء ديفيد سكوت يحمل أداة عينات على منحدر وادٍ قمري.",
    },
    caption: {
      en: "Scott at work on the slope of Hadley Delta during the Apollo 15 EVA.",
      ar: "سكوت يعمل على منحدر دلتا هادلي أثناء خروج أبولو 15.",
    },
  },
  "S71-33433": {
    alt: {
      en: "An illustration of the Apollo 15 landing site with planned rover traverses marked.",
      ar: "رسم توضيحي لموقع هبوط أبولو 15 مع مسارات المركبة المخططة.",
    },
    caption: {
      en: "An artist's concept of the traverse plans drawn for the Apollo 15 mission.",
      ar: "تصوّر فنّي لخطط المسارات التي رُسمت لمهمة أبولو 15.",
    },
    kind: "illustration",
  },
  "S71-39867": {
    alt: {
      en: "Astronauts David Scott and James Irwin seated in the Lunar Roving Vehicle during training.",
      ar: "رائدا الفضاء ديفيد سكوت وجيمس إيروين داخل المركبة الجوّالة أثناء التدريب.",
    },
    caption: {
      en: "The crew seated in the rover at the Kennedy Space Center.",
      ar: "الطاقم جالسان في المركبة في مركز كينيدي للفضاء.",
    },
  },

  /* ------------------------------------------------------- Surveyor / Ranger */
  "LRC-1967-B701_P-04028": {
    alt: {
      en: "The lunar surface photographed from orbit, with a small bright patch marking a lander inside a crater.",
      ar: "سطح القمر مصوَّر من المدار، وبقعة ساطعة صغيرة تصف هابطاً داخل فوهة.",
    },
    caption: {
      en: "Surveyor 1 inside its crater, photographed by Lunar Orbiter III.",
      ar: "سيرفايور 1 داخل فوّهته، في صورة التقطها المدار القمري الثالث.",
    },
  },
  "as12-48-7110": {
    alt: {
      en: "A close-up of a Surveyor 3 footpad and its surface sampler standing on the Moon.",
      ar: "لقطة قريبة لقاعدة قدم وممساح سطح من سيرفايور 3 على القمر.",
    },
    caption: {
      en: "A footpad and the surface sampler of the Surveyor 3 spacecraft.",
      ar: "قاعدة قدم وممساح السطح في مركبة سيرفايور 3.",
    },
  },
  PIA23553: {
    alt: {
      en: "Astronaut Charles Conrad standing beside the Surveyor 3 spacecraft on the Moon.",
      ar: "رائد الفضاء تشارلز كونراد واقف إلى جانب مركبة سيرفايور 3 على القمر.",
    },
    caption: {
      en: "Conrad beside the Surveyor 3 lander during the Apollo 12 EVA.",
      ar: "كونراد إلى جانب هابط سيرفايور 3 أثناء خروج أبولو 12.",
    },
  },
  "S69-55553": {
    alt: {
      en: "An illustration of the Surveyor 3 lander standing in the Ocean of Storms.",
      ar: "رسم توضيحي لمركبة سيرفايور 3 واقفة في «محيط العواصم».",
    },
    caption: {
      en: "An artist's concept of Surveyor 3 on the lunar surface.",
      ar: "تصوّر فنّي لسيرفايور 3 على سطح القمر.",
    },
    kind: "illustration",
  },
  PIA12903: {
    alt: {
      en: "Boulders on the summit of a lunar crater, with the Apollo 12 landing site below.",
      ar: "صخور على قمة فوهة قمرية، وموقع هبوط أبولو 12 تحتها.",
    },
    caption: {
      en: "The Apollo 12 and Surveyor 3 site, seen from Lunar Orbiter.",
      ar: "موقع أبولو 12 وسيرفايور 3، من المدار القمري.",
    },
  },
  "AS12-47-6949": {
    alt: {
      en: "The Apollo 12 landing site with the lunar module and its shadow on the surface.",
      ar: "موقع هبوط أبولو 12 مع مركبة الهبوط وظلّها على السطح.",
    },
    caption: {
      en: "The lunar surface around the Apollo 12 module during the EVA.",
      ar: "السطح القمري حول مركبة أبولو 12 أثناء الخروج.",
    },
  },
  PIA23520: {
    alt: {
      en: "Engineers standing beside the Ranger 7 spacecraft in a high bay at JPL.",
      ar: "مهندسون يقفون إلى جانب مركبة رانجر 7 في قاعة عالية بمختبر الدفع النفاث.",
    },
    caption: {
      en: "Ranger 7 in High Bay 1 at the Jet Propulsion Laboratory in December 1963.",
      ar: "رانجر 7 في القاعة 1 بمختبر الدفع النفاث في ديسمبر 1963.",
    },
  },
  PIA02975: {
    alt: {
      en: "A grainy black and white frame of the Moon's surface, the first picture returned by a US spacecraft.",
      ar: "إطار أبيض وأسود خشن لسطح القمر، أول صورة أعادتها مركبة أمريكية.",
    },
    caption: {
      en: "The first image of the Moon returned by a United States spacecraft, taken by Ranger 7.",
      ar: "أول صورة للقمر أعادتها مركبة أمريكية، التقطها رانجر 7.",
    },
  },

  /* ----------------------------------------------------------- Viking 1 */
  PIA00383: {
    alt: {
      en: "A panoramic strip of the Martian horizon with a blurred spacecraft component at the edge.",
      ar: "شريط بانورامي من أفق المريخ مع مكوّن مركبة غير واضح في الحافة.",
    },
    caption: {
      en: "The first panoramic view returned from the surface of Mars by Viking 1.",
      ar: "أول منظر بانورامي من سطح المريخ عادت به مركبة فينغ 1.",
    },
  },
  PIA00386: {
    alt: {
      en: "A sunlit Martian rock surface with a small marking cut into the rock at the edge.",
      ar: "سطح صخري مريخي تحت الشمس، وعليه علامة صغيرة محفورة في الحافة.",
    },
    caption: {
      en: "A marking on the rock beside the Viking 1 lander, photographed for the weathering record.",
      ar: "علامة على الصخرة بجوار هابط فينغ 1، في صورة ضمن سجل التعرية.",
    },
  },
  PIA01443: {
    alt: {
      en: "A high-resolution orbital view of the Viking 1 landing site and the surrounding plain.",
      ar: "منظر مداري عالي الدقة لموقع هبوط فينغ 1 والسهل المحيط به.",
    },
    caption: {
      en: "The Viking 1 landing site from the Mars Global Surveyor orbiter camera.",
      ar: "موقع هبوط فينغ 1 من كاميرا المدار في مسح المريخ العالمي.",
    },
  },
  "101-KSC-75P-110": {
    alt: {
      en: "Technicians inspecting a Viking lander inside a clean room at the Kennedy Space Center.",
      ar: "فنيّون يفحصون هابط فينغ داخل غرفة نظيفة في مركز كينيدي للفضاء.",
    },
    caption: {
      en: "A Viking lander in the clean room before launch.",
      ar: "هابط فينغ في الغرفة النظيفة قبل الإطلاق.",
    },
  },
  PIA03902: {
    alt: {
      en: "An orbital view of the Viking 1 landing site marked with a cross.",
      ar: "منظر مداري لموقع هبوط فينغ 1 عليه علامة صليب.",
    },
    caption: {
      en: "The Viking 1 landing site marked on an orbital image for the anniversary record.",
      ar: "موقع هبوط فينغ 1 موسوم على صورة مدارية ضمن سجل الذكرى السنوية.",
    },
  },

  /* ----------------------------------------------------------- Viking 2 */
  PIA04023: {
    alt: {
      en: "An orbital view of the Viking 2 landing site marked with a cross.",
      ar: "منظر مداري لموقع هبوط فينغ 2 عليه علامة صليب.",
    },
    caption: {
      en: "The second Viking landing site, shown on a NASA Mars Odyssey image.",
      ar: "موقع هبوط فينغ الثاني، على صورة من مركبة أوديسي المريخية.",
    },
  },
  PIA04029: {
    alt: {
      en: "A large impact crater on a flat Martian plain.",
      ar: "فوهة ارتطام كبيرة على سهل مريخي مستوٍ.",
    },
    caption: {
      en: "Rampart Crater in Utopia Planitia, west of the Viking 2 landing site.",
      ar: "فوهة «رامبارت» في أوتوبيا بلانيا، غرب موقع هبوط فينغ 2.",
    },
  },
  PIA04930: {
    alt: {
      en: "Thin clouds lying over the rim of a Martian crater.",
      ar: "سُحُب رقيقة ممدودة فوق حافة فوهة مريخية.",
    },
    caption: {
      en: "Clouds near Mie Crater in Utopia Planitia.",
      ar: "سُحُب قرب فوهة «مي» في أوتوبيا بلانيا.",
    },
  },
  "101-ksc-76pc-303": {
    alt: {
      en: "An illustration of the sequence of events around a Viking landing.",
      ar: "رسم توضيحي لتسلسل الأحداث حول هبوط مركبة فينغ.",
    },
    caption: {
      en: "An artist's conception of the landing sequence drawn for the Viking mission.",
      ar: "تصوّر فنّي لتسلسل الهبوط رُسم لمهمة فينغ.",
    },
    kind: "illustration",
  },

  /* --------------------------------------------------------------- Dawn */
  PIA12033: {
    alt: {
      en: "An illustration of the Dawn spacecraft with the asteroid Vesta and the dwarf planet Ceres behind it.",
      ar: "رسم توضيحي لمركبة داون مع الكويكب فيستا والكوكب القزم سيريس خلفها.",
    },
    caption: {
      en: "The spacecraft drawn against the two bodies it visited.",
      ar: "المركبة مرسومة أمام الجسمين اللذين زارتهما.",
    },
    kind: "illustration",
  },
  PIA19167: {
    alt: {
      en: "The dwarf planet Ceres as a bright grey sphere against black space.",
      ar: "الكوكب القزم سيريس كرة رمادية ساطعة في فضاء أسود.",
    },
    caption: {
      en: "Ceres from Dawn, taken in January 2015 and processed for release.",
      ar: "سيريس من داون، في صورة من يناير 2015 عولجت للنشر.",
    },
  },
  PIA20349: {
    alt: {
      en: "A tall solitary mountain rising from the surface of Ceres.",
      ar: "جبل منفرد شاهق يرتفع من سطح سيريس.",
    },
    caption: {
      en: "The side view of Ahuna Mons, the bright solitary mountain on Ceres.",
      ar: "الجانب من جبل «آهونا», الجبل الوحيد الساطع على سيريس.",
    },
  },
  PIA20187: {
    alt: {
      en: "Cratered grey terrain on the southern surface of Ceres.",
      ar: " تضاريس رمادية كثيرة الفوّهات في سطح سيريس الجنوبي.",
    },
    caption: {
      en: "The south of Ceres from Dawn's lowest orbit, in December.",
      ar: "جنوب سيريس من أدنى مدار لداون، في ديسمبر.",
    },
  },
  PIA14125: {
    alt: {
      en: "An illustration of the Dawn spacecraft approaching the asteroid Vesta.",
      ar: "رسم توضيحي لمركبة داون تقترب من الكويكب فيستا.",
    },
    caption: {
      en: "An artist's concept of the spacecraft on its way to its first destination.",
      ar: "تصوّر فنّي للمركبة في طريقها إلى وجهتها الأولى.",
    },
    kind: "illustration",
  },
  PIA20919: {
    alt: {
      en: "An illustration of the Dawn spacecraft firing its ion engine above the surface of Ceres.",
      ar: "رسم توضيحي لمركبة داون تشتغل محركها الأيوني فوق سطح سيريس.",
    },
    caption: {
      en: "The ion propulsion system at work above Ceres.",
      ar: "نظام الدفع الأيوني أثناء عمله فوق سيريس.",
    },
    kind: "illustration",
  },

  /* ------------------------------------------------------ Deep Impact */
  PIA13855: {
    alt: {
      en: "Two frames of a dark comet nucleus, one before an impact and one after it.",
      ar: "إطاران لنواة مذنّب داكنة، أحدهما قبل الاصطدام والآخر بعده.",
    },
    caption: {
      en: "The before-and-after comparison of the impact site on comet Tempel 1.",
      ar: "مقارنة ما قبل الاصطدام وما بعده لموقع الاصطدام في المذنّب تيمبل 1.",
    },
  },
  PIA13858: {
    alt: {
      en: "A close view of the comet surface before and after the impactor struck it.",
      ar: "لقطة قريبة من سطح المذنّب قبل أن يضربه المصادم وبعدها.",
    },
    caption: {
      en: "The area of comet Tempel 1 that the impactor reached.",
      ar: "المنطقة من المذنّب تيمبل 1 التي بلغها المصادم.",
    },
  },
  PIA02122: {
    alt: {
      en: "Two small fuzzy images of a comet against black space.",
      ar: "صورتان صغيرتان لمذنّب أمام فضاء أسود.",
    },
    caption: {
      en: "Hubble watched the comet before and after the impact.",
      ar: "رصد تلسكوب هابل المذنّب قبل الاصطدام وبعده.",
    },
  },
  PIA02119: {
    alt: {
      en: "The irregular nucleus of a comet, brightly lit against darkness.",
      ar: "نواة مذنّب غير منتظمة، مضاءة بوضوح أمام العتمة.",
    },
    caption: {
      en: "The nucleus of Tempel 1 from the flyby imager on the spacecraft.",
      ar: "نواة تيمبل 1 من كاميرا المروضة على المركبة.",
    },
  },
  PIA02132: {
    alt: {
      en: "The sunlit side of comet Tempel 1 in infrared light.",
      ar: "الجانب المشمس من المذنّب تيمبل 1 في ضوء تحت الأحمر.",
    },
    caption: {
      en: "An infrared composite that shows the warm, sunlit face of the comet.",
      ar: "فسيفساء تحت حمراء تُظهر الوجه المشرق والدافئ من المذنّب.",
    },
  },
  PIA02114: {
    alt: {
      en: "A faint comet with a soft halo of dust around its nucleus.",
      ar: "مذنّب خافت تحيط بنواه هالة غبار ناعمة.",
    },
    caption: {
      en: "Tempel 1 photographed on the approach to the encounter.",
      ar: "تيمبل 1 في صورة أثناء الاقتراب من اللقاء.",
    },
  },

  /* -------------------------------------------------------------- Kepler */
  PIA17445: {
    alt: {
      en: "An illustration of a cloudy planet beside a larger banded planet.",
      ar: "رسم توضيحي لكوكب سحابي إلى جانب كوكب أكبر مخطط.",
    },
    caption: {
      en: "An artist's concept of Kepler-7b, the first exoplanet with mapped clouds.",
      ar: "تصوّر فنّي لكوكب كيبلر-7ب، أول كوكب خارج المجموعة خُطّطت سُحبه.",
    },
    kind: "illustration",
  },
  PIA18463: {
    alt: {
      en: "An illustration of two planets passing in front of their star.",
      ar: "رسم توضيحي لكوكبين يعبران أمام نجمهما.",
    },
    caption: {
      en: "An artist's concept of how a transit measures the size of a distant world.",
      ar: "تصوّر فنّي لكيفية قياس العبور لقطر عالم بعيد.",
    },
    kind: "illustration",
  },
  PIA23002: {
    alt: {
      en: "An illustration of six planets orbiting a small red star.",
      ar: "رسم توضيحي لستة كواكب تدور حول نجم أحمر صغير.",
    },
    caption: {
      en: "An artist's illustration of the tightly packed K2-138 system.",
      ar: "رسم فنّي لنظام كي2-138 المكتظّ بالكواكب.",
    },
    kind: "illustration",
  },
  PIA23003: {
    alt: {
      en: "A diagram of six planets drawn at different distances from their star.",
      ar: "مخطط لستة كواكب مرسومة على مسافات مختلفة من نجمها.",
    },
    caption: {
      en: "The relative sizes and orbital distances of the six K2-138 planets.",
      ar: "الأحجام النسبية والمدارات الستة لكواكب كي2-138.",
    },
    kind: "illustration",
  },
  PIA14446: {
    alt: {
      en: "A rocket climbing away from a coastal launch pad into a dark sky.",
      ar: "صاروخ ينطلق من منصة ساحلية إلى سماء معتمة.",
    },
    caption: {
      en: "The Kepler launch in March 2009, five years into the mission.",
      ar: "إطلاق كيبلر في مارس 2009، بعد خمس سنوات من المهمة.",
    },
  },
  PIA15423: {
    alt: {
      en: "An illustration of three space telescopes in a row against a star field.",
      ar: "رسم توضيحي لثلاثة تلسكوبات فضائية متجاورة أمام حقل نجوم.",
    },
    caption: {
      en: "An artist's concept of the Spitzer, Planck and Kepler observatories.",
      ar: "تصوّر فنّي لمراصد سبيتزر وبلانك وكيبلر.",
    },
    kind: "illustration",
  },

  /* ------------------------------------------------------------ Pioneer */
  "ARC-1973-AC73-9019": {
    alt: {
      en: "The Pioneer 10 spacecraft during final assembly in a clean room.",
      ar: "مركبة بايونير 10 أثناء التجميع النهائي في غرفة نظيفة.",
    },
    caption: {
      en: "Final assembly of Pioneer 10 at TRW in Redondo Beach.",
      ar: "التجميع النهائي لبايونير 10 في شركة TRW بريدوندو بيتش.",
    },
  },
  "ARC-1972-AC72-2134": {
    alt: {
      en: "The Pioneer 10 spacecraft being delivered to the launch site on a vehicle.",
      ar: "مركبة بايونير 10 تُنقل إلى موقع الإطلاق على مركبة نقل.",
    },
    caption: {
      en: "Pioneer 10 arriving at Cape Kennedy from the factory.",
      ar: "وصول بايونير 10 إلى كيب كنيدي من المصنع.",
    },
  },
  "ARC-1972-A72-2137": {
    alt: {
      en: "The engraved plaque carried by Pioneer 10, lying flat before mounting.",
      ar: "لوح بايونير 10 المنقوش، ممدوداً أفقياً قبل تثبيته.",
    },
    caption: {
      en: "The plaque that carries the message the probe left with the solar system.",
      ar: "اللوح الذي يحمل الرسالة التي تركها المسبار مع المجموعة الشمسية.",
    },
  },
  "ARC-1973-AC73-9341": {
    alt: {
      en: "A historic control room with engineers watching a screen image of Jupiter.",
      ar: "غرفة تحكّم تاريخية فيها مهندسون يشاهدون صورة للمشتري على شاشة.",
    },
    caption: {
      en: "The Pioneer 10 Jupiter encounter, monitored at the mission control room.",
      ar: "لقاء بايونير 10 مع المشتري، من غرفة التحكّم في المهمة.",
    },
  },
  "ARC-1972-AC72-1354": {
    alt: {
      en: "An illustration of the Pioneer spacecraft above the clouded surface of Jupiter.",
      ar: "رسم توضيحي لمركبة بايونير فوق سطح المشتري السحابي.",
    },
    caption: {
      en: "Artwork of the encounter drawn for NASA's Pioneer mission publications.",
      ar: "رسم للقاء صُوّر لمنشورات مهمة بايونير في ناسا.",
    },
    kind: "illustration",
  },
  "ARC-1972-AC72-2140": {
    alt: {
      en: "The Pioneer 10 spacecraft sealed inside its launch fairing on the pad.",
      ar: "مركبة بايونير 10 مغلّفة داخل غطاء الإطلاق على المنصة.",
    },
    caption: {
      en: "Pioneer 10 encapsulated and mated with its launch vehicle.",
      ar: "بايونير 10 مغلّفة ومركّبة على مركبة الإطلاق.",
    },
  },
  "ARC-1982-AC82-0178": {
    alt: {
      en: "An illustration showing several Pioneer spacecraft in a family portrait.",
      ar: "رسم توضيحي يجمع عدة مركبات بايونير في لوحة واحدة.",
    },
    caption: {
      en: "The Pioneer family, drawn for NASA's space science publications.",
      ar: "«عائلة بايونير»، مرسومة لمنشورات ناسا في علوم الفضاء.",
    },
    kind: "illustration",
  },
  "ARC-1974-AC74-9032-234": {
    alt: {
      en: "A group of scientists in shirtsleeves standing together at a briefing table.",
      ar: "مجموعة من العلماء بأكمامهم القصيرة تقف حول طاولة إحاطة.",
    },
    caption: {
      en: "The Pioneer 11 encounter briefing at NASA Ames Research Center.",
      ar: "إحاطة لقاء بايونير 11 في مركز أميس لأبحاث ناسا.",
    },
  },
  "ARC-1978-A78-0077-12": {
    alt: {
      en: "A row of black and white photographs laid out on a table.",
      ar: "صف من الصور بالأبيض والأسود موضوعة على طاولة.",
    },
    caption: {
      en: "Photographs from the Pioneer 10 and 11 mission record.",
      ar: "صور من سجل مهمتي بايونير 10 و11.",
    },
  },
  "ARC-1974-AC74-9036-28": {
    alt: {
      en: "Two men speaking at a press table during a mission press conference.",
      ar: "رجلان يتحدثان أمام طاولة الصحافة خلال مؤتمر صحفي للمهمة.",
    },
    caption: {
      en: "The press conference for the Pioneer 11 Jupiter encounter.",
      ar: "المؤتمر الصحفي لقاء بايونير 11 مع المشتري.",
    },
  },
  "ARC-1983-AC83-0351": {
    alt: {
      en: "An illustration of the Pioneer probe receding from the Sun with the planets behind it.",
      ar: "رسم توضيحي لمسبار بايونير يبتعد عن الشمس والكواكب خلفه.",
    },
    caption: {
      en: "Artwork of Pioneer 10 looking back at the Sun from far beyond the planets.",
      ar: "رسم لبايونير 10 ينظر إلى الشمس من خلف المدار البعيد للكواكب.",
    },
    kind: "illustration",
  },
};

function creditFor(entry: ExtraManifestImage): string {
  const parts: string[] = [];
  if (entry.photographer && entry.photographer !== "NASA or National Aeronautics and Space Administration") {
    parts.push(entry.photographer);
  }
  if (entry.secondaryCreator) parts.push(entry.secondaryCreator);
  parts.push(entry.center || "NASA");
  return [...new Set(parts)].join(", ");
}

function organisationFor(entry: ExtraManifestImage): string {
  if (entry.center && entry.center !== "NASA") return `NASA/${entry.center}`;
  return "NASA";
}

/**
 * Builds the media record for one supplementary frame.
 * Frames without an authored description are skipped rather than shown
 * with an empty caption.
 */
export function echoExtraImage(nasaId: string): EchoMedia | undefined {
  const entry = echoExtraManifest.images[nasaId];
  if (!entry) return undefined;
  const record = RECORDS[nasaId];
  if (!record) return undefined;
  return {
    id: `extra-${nasaId}`,
    kind: record.kind ?? "photograph",
    src: entry.local,
    thumb: entry.thumb,
    alt: record.alt,
    caption: record.caption,
    credit: creditFor(entry),
    organization: organisationFor(entry),
    sourceUrl: entry.sourceUrl,
    nasaId: entry.nasaId,
    usage: record.kind === "illustration" ? ECHO_MEDIA_USAGE : ECHO_MEDIA_USAGE,
    accessedAt: entry.accessedAt,
  };
}

/** Every supplementary frame for one mission, in a stable order. */
export function echoExtraImagesFor(storySlug: string): EchoMedia[] {
  const list: EchoMedia[] = [];
  for (const entry of Object.values(echoExtraManifest.images)) {
    if (entry.story !== storySlug) continue;
    const media = echoExtraImage(entry.nasaId);
    if (media) list.push(media);
  }
  return list;
}

/** Supplementary frames that are not already part of the curated story file. */
export function echoExtraImagesNotIn(known: string[], storySlug: string): EchoMedia[] {
  const seen = new Set(known);
  return echoExtraImagesFor(storySlug).filter((media) => {
    const nasaId = media.nasaId ?? "";
    if (seen.has(nasaId)) return false;
    seen.add(nasaId);
    return true;
  });
}
