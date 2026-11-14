"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  BookOpen,
  Compass,
  Database,
  Globe2,
  Sparkles,
  ArrowRight,
  Orbit,
  Navigation,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";

export type ChallengeCategoryFilter =
  | "all"
  | "nasa-data"
  | "moon"
  | "mars-deep-space";

export interface PrimaryChallengeItem {
  number: number;
  id: string;
  category: "nasa-data" | "moon" | "mars-deep-space";
  title: { en: string; ar: string };
  organization: string;
  nasaUrl: string;
  destination: { en: string; ar: string };
  disposition: {
    en: string;
    ar: string;
    type: "surface" | "orbit" | "deep-space" | "archive";
  };
  summary: { en: string; ar: string };
  stories: { slug: string; title: { en: string; ar: string } }[];
}

export const PRIMARY_CHALLENGE_RESOURCES: PrimaryChallengeItem[] = [
  {
    number: 1,
    id: "nssdca",
    category: "nasa-data",
    title: {
      en: "NASA Space Science Data Coordinated Archive (NSSDCA)",
      ar: "أرشيف بيانات علوم الفضاء المنسق التابع لناسا (NSSDCA)",
    },
    organization: "NASA Goddard Space Flight Center",
    nasaUrl: "https://nssdc.gsfc.nasa.gov/",
    destination: {
      en: "Permanent Earth Repository (Master Catalog)",
      ar: "المستودع الدائم على الأرض (الفهرس الرئيسي)",
    },
    disposition: {
      en: "Active Master Science Archive",
      ar: "الأرشيف العلمي الرئيسي النشط",
      type: "archive",
    },
    summary: {
      en: "NASA's permanent archive for space science data and the master catalog for all spacecraft, landers, and scientific instruments. It provides the international NSSDC/COSPAR designators and mission parameters that verify every piece of hardware across GRAVERSE.",
      ar: "أرشيف ناسا الدائم لبيانات علوم الفضاء والفهرس الرئيسي لجميع المركبات الفضائية ومركبات الهبوط والأجهزة العلمية. يوفر معرفات NSSDC/COSPAR الدولية ومعايير المهمات التي تؤكد هوية كل قطعة عتاد في جرافيرس.",
    },
    stories: [
      {
        slug: "apollo-lunar-surface-experiments",
        title: {
          en: "Archived in NSSDCA (ALSEP & Lunar Data)",
          ar: "مؤرشف في NSSDCA (حزم أجهزة القمر)",
        },
      },
    ],
  },
  {
    number: 2,
    id: "apollo-lunar-modules",
    category: "moon",
    title: {
      en: "Apollo Lunar Modules",
      ar: "مركبات أبولو القمرية",
    },
    organization: "NASA NSSDCA",
    nasaUrl: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C",
    destination: {
      en: "The Moon — Mare Tranquillitatis & Lunar Sites",
      ar: "القمر — بحر الهدوء ومواقع الهبوط",
    },
    disposition: {
      en: "Lunar Surface (Descent Stage Abandoned)",
      ar: "سطح القمر (مرحلة الهبوط المتروكة)",
      type: "surface",
    },
    summary: {
      en: "Six Apollo Lunar Module descent stages remain on the lunar surface, serving as the permanent launch pads from which astronauts returned to orbit. They represent the first human-crewed equipment left on another celestial body.",
      ar: "تبقى ست مراحل هبوط لمركبات أبولو القمرية على سطح القمر كمنصات إطلاق دائمة عاد منها الرواد إلى المدار. وتمثل أول معدات مأهولة بالبشر تترك على جرم سماوي آخر.",
    },
    stories: [
      {
        slug: "apollo-11-lm-descent-stage",
        title: {
          en: "The Launch Pad That Stayed on the Moon",
          ar: "منصة الإطلاق التي بقيت على القمر",
        },
      },
    ],
  },
  {
    number: 3,
    id: "lunar-roving-vehicles",
    category: "moon",
    title: {
      en: "Lunar Roving Vehicles (LRVs)",
      ar: "عربات التجوال القمرية (LRVs)",
    },
    organization: "NASA NSSDCA",
    nasaUrl: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C",
    destination: {
      en: "The Moon — Hadley-Apennine, Descartes & Taurus-Littrow",
      ar: "القمر — هادلي-أبينين، ديكارت، وتوروس-ليترو",
    },
    disposition: {
      en: "Lunar Surface (Parked Electric Vehicles)",
      ar: "سطح القمر (مركبات كهربائية مركونة)",
      type: "surface",
    },
    summary: {
      en: "Three electric rovers driven during Apollo 15, 16, and 17 remain parked on the Moon. They expanded astronaut traverse distances from hundreds of meters to tens of kilometers across mountainous lunar terrain.",
      ar: "ثلاث عربات كهربائية استُخدمت في مهمات أبولو 15 و16 و17 لا تزال مركونة على القمر. وسعت مسافات تجوال الرواد من مئات الأمتار إلى عشرات الكيلومترات عبر التضاريس القمرية الجبلية.",
    },
    stories: [
      {
        slug: "lunar-roving-vehicle",
        title: {
          en: "The Moon Buggy",
          ar: "عربة القمر الكهربائية",
        },
      },
    ],
  },
  {
    number: 4,
    id: "alsep-packages",
    category: "moon",
    title: {
      en: "ALSEP Scientific Packages",
      ar: "حزم التجارب العلمية على سطح القمر (ALSEP)",
    },
    organization: "NASA NSSDCA",
    nasaUrl: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C",
    destination: {
      en: "The Moon — Multiple Apollo Sites",
      ar: "القمر — مواقع أبولو المتعددة",
    },
    disposition: {
      en: "Lunar Surface (Autonomous Science Stations)",
      ar: "سطح القمر (محطات علمية ذاتية)",
      type: "surface",
    },
    summary: {
      en: "Nuclear-powered scientific stations deployed by Apollo astronauts that transmitted seismic, heat flow, magnetic, and solar wind measurements directly to Earth for up to eight years after the crews departed.",
      ar: "محطات علمية تعمل بالطاقة النووية نشرها رواد أبولو وبثت قياسات الزلازل وتدفق الحرارة والمجال المغناطيسي والرياح الشمسية إلى الأرض لما يصل إلى ثماني سنوات بعد مغادرة الرواد.",
    },
    stories: [
      {
        slug: "apollo-lunar-surface-experiments",
        title: {
          en: "The Instruments We Left in the Dust",
          ar: "الأجهزة التي تركناها في الغبار",
        },
      },
    ],
  },
  {
    number: 5,
    id: "surveyor-landers",
    category: "moon",
    title: {
      en: "Surveyor Landers",
      ar: "مركبات هبوط سيرفيور",
    },
    organization: "NASA Science",
    nasaUrl: "https://science.nasa.gov/mission/surveyor-3/",
    destination: {
      en: "The Moon — Ocean of Storms & Lunar Basins",
      ar: "القمر — محيط العواصف والأحواض القمرية",
    },
    disposition: {
      en: "Lunar Surface (First US Soft Landings)",
      ar: "سطح القمر (أول هبوط أمريكي لطيف)",
      type: "surface",
    },
    summary: {
      en: "Seven robotic probes launched from 1966 to 1968 to test controlled descent and evaluate lunar soil bearing strength before Apollo. In 1969, Apollo 12 astronauts visited Surveyor 3 and retrieved its camera for analysis on Earth.",
      ar: "سبعة مسابير روبوتية أُطلقت بين 1966 و1968 لاختبار الهبوط المتحكم وتقييم قدرة تحمل التربة القمرية قبل أبولو. وفي 1969 زار رواد أبولو 12 سيرفيور 3 واستعادوا كاميرتها لتحليلها على الأرض.",
    },
    stories: [
      {
        slug: "surveyor-landers",
        title: {
          en: "The First Soft Landing",
          ar: "أول هبوط لطيف",
        },
      },
    ],
  },
  {
    number: 6,
    id: "sojourner-rover",
    category: "mars-deep-space",
    title: {
      en: "Sojourner Rover",
      ar: "عربة سوجورنر",
    },
    organization: "NASA Science",
    nasaUrl: "https://science.nasa.gov/mission/mars-pathfinder/",
    destination: {
      en: "Mars — Ares Vallis",
      ar: "المريخ — وادي آريس",
    },
    disposition: {
      en: "Martian Surface (First Planetary Microrover)",
      ar: "سطح المريخ (أول عربة كوكبية مجهرية)",
      type: "surface",
    },
    summary: {
      en: "Delivered to Mars by Mars Pathfinder on 4 July 1997, this microwave-oven-sized microrover operated for 83 sols, proving that mobile exploration of the Martian surface with rocker-bogie mobility was viable.",
      ar: "وصلت إلى المريخ بواسطة باثفايندر في 4 يوليو 1997، وعملت هذه العربة الصغيرة بحجم فرن الميكروويف لمدة 83 سولا، مبرهنة على جدوى الاستكشاف المتنقل لسطح المريخ بنظام العجلات المزدوجة.",
    },
    stories: [
      {
        slug: "sojourner",
        title: {
          en: "The Little Rover That Opened the Door",
          ar: "العربة الصغيرة التي فتحت الباب",
        },
      },
    ],
  },
  {
    number: 7,
    id: "spirit-opportunity",
    category: "mars-deep-space",
    title: {
      en: "Spirit & Opportunity",
      ar: "سبيريت وأوبورتيونيتي",
    },
    organization: "NASA Science",
    nasaUrl: "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/",
    destination: {
      en: "Mars — Gusev Crater & Meridiani Planum",
      ar: "المريخ — فوهة غوسيف وميريدياني بلانوم",
    },
    disposition: {
      en: "Martian Surface (Twin Exploration Rovers)",
      ar: "سطح المريخ (عربتا الاستكشاف التوأمتان)",
      type: "surface",
    },
    summary: {
      en: "Twin robotic geologists designed for 90-sol missions. Spirit explored Gusev Crater until 2010; Opportunity traversed over 45 km across Meridiani Planum for nearly 15 years, confirming past liquid water on Mars.",
      ar: "جيولوجيان روبوتيان صُمما لمهمة مدتها 90 سولا. استكشفت سبيريت فوهة غوسيف حتى 2010، بينما قطعت أوبورتيونيتي أكثر من 45 كم عبر ميريدياني بلانوم على مدى 15 عاما تقريبا، مؤكدة وجود مياه سائلة في ماضي المريخ.",
    },
    stories: [
      {
        slug: "opportunity",
        title: {
          en: "Opportunity: 15 Years on a World That Was Never Home",
          ar: "أوبورتيونيتي: 15 عاماً على عالم لم يكن يوماً وطناً",
        },
      },
      {
        slug: "spirit",
        title: {
          en: "Spirit: The Rover That Would Not Quit",
          ar: "سبيريت: العربة التي لم تستسلم",
        },
      },
    ],
  },
  {
    number: 8,
    id: "viking-landers",
    category: "mars-deep-space",
    title: {
      en: "Viking 1 & 2 Landers",
      ar: "مركبتا هبوط فايكنغ 1 و2",
    },
    organization: "NASA Science",
    nasaUrl: "https://science.nasa.gov/mission/viking-1/",
    destination: {
      en: "Mars — Chryse Planitia & Utopia Planitia",
      ar: "المريخ — كرايس بلانيشيا ويوتوبيا بلانيشيا",
    },
    disposition: {
      en: "Martian Surface (First Long-Duration Mars Stations)",
      ar: "سطح المريخ (أولى محطات المريخ طويلة الأمد)",
      type: "surface",
    },
    summary: {
      en: "The first successful long-duration surface missions on Mars in 1976. They returned the first clear color panoramic photographs of Martian soil and conducted early biological soil tests.",
      ar: "أولى المهمات السطحية الناجحة طويلة الأمد على المريخ في عام 1976. التقطت أول صور بانورامية ملونة واضحة لتربة المريخ وأجرت اختبارات حيوية أولى للتربة.",
    },
    stories: [
      {
        slug: "viking-1-lander",
        title: {
          en: "Viking 1: The First Photograph From Another World",
          ar: "فايكنغ 1: أول صورة من عالم آخر",
        },
      },
      {
        slug: "viking-2-lander",
        title: {
          en: "Viking 2: The Second Landing",
          ar: "فايكنغ 2: الهبوط الثاني",
        },
      },
    ],
  },
  {
    number: 9,
    id: "phoenix-insight",
    category: "mars-deep-space",
    title: {
      en: "Phoenix & InSight Landers",
      ar: "مركبتا هبوط فينيكس وإنسايت",
    },
    organization: "NASA Science",
    nasaUrl: "https://science.nasa.gov/mission/insight/",
    destination: {
      en: "Mars — Vastitas Borealis & Elysium Planitia",
      ar: "المريخ — فاستيتاس بورياليس وإليسيوم بلانيشيا",
    },
    disposition: {
      en: "Martian Surface (Polar Ice & Geophysical Stations)",
      ar: "سطح المريخ (محطات الجليد القطبي والجيوفيزياء)",
      type: "surface",
    },
    summary: {
      en: "Stationary Mars science landers: Phoenix touched and vaporized Martian water ice in the northern arctic plains (2008); InSight placed the first ultra-sensitive seismometer to detect marsquakes and map the planet's core (2018–2022).",
      ar: "محطتا أبحاث مريخيتان ثابتتان: لمست فينيكس جليد الماء المريخي وبخرته في السهول القطبية الشمالية (2008)، بينما وضعت إنسايت أول مقياس زلازل فائق الحساسية لرصد الهزات المريخية ورسم خريطة لنواة الكوكب (2018–2022).",
    },
    stories: [
      {
        slug: "phoenix",
        title: {
          en: "Phoenix: Digging for Ice",
          ar: "فينيكس: الحفر بحثاً عن الجليد",
        },
      },
      {
        slug: "insight",
        title: {
          en: "InSight: Listening to Mars",
          ar: "إنسايت: الاستماع إلى نبض المريخ",
        },
      },
    ],
  },
  {
    number: 10,
    id: "dawn",
    category: "mars-deep-space",
    title: {
      en: "Dawn Spacecraft",
      ar: "مركبة داون الفضائية",
    },
    organization: "NASA Science",
    nasaUrl: "https://science.nasa.gov/mission/dawn/",
    destination: {
      en: "Asteroid Belt — Vesta & Ceres",
      ar: "حزام الكويكبات — فيستا وسيريس",
    },
    disposition: {
      en: "Stable Ceres Orbit (Orbital Satellite — NOT on Surface)",
      ar: "مدار مستقر حول سيريس (قمر مداري — ليس على السطح)",
      type: "orbit",
    },
    summary: {
      en: "Using ion propulsion, Dawn became the first spacecraft to orbit two separate extraterrestrial bodies in the asteroid belt: protoplanet Vesta and dwarf planet Ceres. It retired in 2018 and remains in an unpowered, permanent orbit around Ceres.",
      ar: "باستخدام الدفع الأيوني، أصبحت داون أول مركبة تطوف حول جرمين مختلفين في حزام الكويكبات: الكوكب الأولي فيستا والكوكب القزم سيريس. تقاعدت عام 2018 وتبقى في مدار دائم غير مشغل حول سيريس.",
    },
    stories: [
      {
        slug: "dawn",
        title: {
          en: "Dawn: One Spacecraft, Two Worlds",
          ar: "داون: مركبة واحدة وعالمان",
        },
      },
    ],
  },
  {
    number: 11,
    id: "near-shoemaker",
    category: "mars-deep-space",
    title: {
      en: "NEAR Shoemaker",
      ar: "نير شوميكر",
    },
    organization: "NASA Science",
    nasaUrl: "https://science.nasa.gov/mission/near-shoemaker/",
    destination: {
      en: "Asteroid 433 Eros",
      ar: "الكويكبات — الكويكِب 433 إيروس",
    },
    disposition: {
      en: "Asteroid Surface Touchdown (First Asteroid Landing)",
      ar: "هبوط على سطح كويكِب (أول هبوط على كويكِب)",
      type: "surface",
    },
    summary: {
      en: "The first spacecraft to orbit an asteroid and the first to touch down on one. Designed as an orbiter, NEAR Shoemaker executed a gentle touchdown on Eros in February 2001 and continued transmitting chemical spectra for two weeks.",
      ar: "أول مركبة تطوف حول كويكِب وأول من يهبط على سطحه. صُممت كمركبة مدارية، ونفذت هبوطاً لطيفاً على إيروس في فبراير 2001 وواصلت بث الأطياف الكيميائية لأسبوعين.",
    },
    stories: [
      {
        slug: "near-shoemaker",
        title: {
          en: "NEAR Shoemaker: The First Landing on an Asteroid",
          ar: "نير شوميكر: أول هبوط على كويكِب",
        },
      },
    ],
  },
  {
    number: 12,
    id: "pioneer-10-11",
    category: "mars-deep-space",
    title: {
      en: "Pioneer 10 & 11",
      ar: "بايونير 10 و11",
    },
    organization: "NASA Science",
    nasaUrl: "https://science.nasa.gov/mission/pioneer-10/",
    destination: {
      en: "Interstellar Deep Space (Escaping Solar System)",
      ar: "الفضاء النجمي العميق (مغادرة النظام الشمسي)",
    },
    disposition: {
      en: "Deep Space Trajectory (Traveling — NOT on Moon or Mars)",
      ar: "مسار الفضاء العميق (مسافرة — ليست على القمر أو المريخ)",
      type: "deep-space",
    },
    summary: {
      en: "Humanity's first probes to explore Jupiter and Saturn, and the first to cross the asteroid belt. Both are now silent, carrying golden plaques as they coast on hyperbolic trajectories out of our solar system toward the stars.",
      ar: "أول مسبارين للبشرية يستكشفان المشتري وزحل، وأول من عبر حزام الكويكبات. كلاهما صامت الآن، ويحملان لوحات ذهبية تذكارية بينما يندفعان في مسارات مفتوحة نحو الفضاء النجمي.",
    },
    stories: [
      {
        slug: "pioneer-10",
        title: {
          en: "Pioneer 10: The First Way Out",
          ar: "بايونير 10: أول طريق للخروج",
        },
      },
      {
        slug: "pioneer-11",
        title: {
          en: "Pioneer 11: The Gravity Assist",
          ar: "بايونير 11: مساعدة الجاذبية",
        },
      },
    ],
  },
  {
    number: 13,
    id: "ingenuity",
    category: "mars-deep-space",
    title: {
      en: "Ingenuity Mars Helicopter",
      ar: "مروحية إنجينويتي المريخية",
    },
    organization: "NASA Science",
    nasaUrl: "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/",
    destination: {
      en: "Mars — Jezero Crater (Airfield 'Valinor Hills')",
      ar: "المريخ — فوهة جيزيرو (مهبط فالينور هيلز)",
    },
    disposition: {
      en: "Martian Surface (First Powered Extraterrestrial Flight)",
      ar: "سطح المريخ (أول طيران آلي خارج كوكب الأرض)",
      type: "surface",
    },
    summary: {
      en: "A technology demonstration designed for 5 flights that achieved 72 flights over nearly three years, flying over 17 km through the thin Martian atmosphere. Retired in January 2024 after rotor damage, it serves as a permanent surface monument and weather station.",
      ar: "عرض تقني كان مخططاً له 5 رحلات فقط وحقق 72 رحلة على مدى ثلاث سنوات تقريباً، محلقاً لأكثر من 17 كم عبر غلاف المريخ الرقيق. تقاعد في يناير 2024 بعد تضرر شفرة الدوار، ليبقى معلماً سطحياً ومحطة رصد دائمة.",
    },
    stories: [
      {
        slug: "ingenuity",
        title: {
          en: "Ingenuity: The First Flight on Another World",
          ar: "إنجينويتي: أول طيران على عالم آخر",
        },
      },
    ],
  },
  {
    number: 14,
    id: "kepler",
    category: "mars-deep-space",
    title: {
      en: "Kepler Space Telescope",
      ar: "تلسكوب كيبلر الفضائي",
    },
    organization: "NASA Science",
    nasaUrl: "https://science.nasa.gov/mission/kepler/",
    destination: {
      en: "Earth-Trailing Heliocentric Orbit",
      ar: "مدار شمسي متأخر عن الأرض",
    },
    disposition: {
      en: "Heliocentric Orbit (In Space — NOT on Planetary Surface)",
      ar: "مدار شمسي (في الفضاء — ليس على سطح كوكبي)",
      type: "orbit",
    },
    summary: {
      en: "NASA's revolutionary planet hunter that proved planets outnumber stars in the Milky Way. Retired in October 2018 after exhausting its fuel, Kepler remains in an Earth-trailing orbit around the Sun, with more than 2,600 confirmed exoplanet discoveries.",
      ar: "صائد الكواكب الثوري التابع لناسا الذي أثبت أن الكواكب تفوق النجوم عدداً في مجرة درب التبانة. تقاعد في أكتوبر 2018 بعد نفاد وقوده، ويبقى في مدار شمسي متأخر عن الأرض، مع أكثر من 2,600 كوكب مؤكد.",
    },
    stories: [
      {
        slug: "kepler",
        title: {
          en: "Kepler: Looking Across the Stars",
          ar: "كيبلر: النظر عبر النجوم",
        },
      },
    ],
  },
];

export const SUPPORTING_RESEARCH_RESOURCES = [
  {
    id: "nssdca-planetary-catalog",
    title: {
      en: "NSSDCA — Planetary Mission Catalog",
      ar: "كتالوج مهمات الكواكب — NSSDCA",
    },
    organization: "NASA NSSDCA",
    url: "https://nssdc.gsfc.nasa.gov/planetary/projects.html",
    summary: {
      en: "Primary search database for all NASA planetary spacecraft, instruments, and archival datasets.",
      ar: "قاعدة بيانات البحث الرئيسية لجميع مركبات وأجهزة ومجموعات بيانات ناسا الكوكبية المؤرشفة.",
    },
  },
  {
    id: "nasa-science-missions",
    title: {
      en: "NASA Science — Missions Directory",
      ar: "دليل مهمات علوم ناسا",
    },
    organization: "NASA Science",
    url: "https://science.nasa.gov/mission/",
    summary: {
      en: "Official mission profiles, scientific objectives, engineering parameters, and status updates.",
      ar: "ملفات المهمات الرسمية والأهداف العلمية والمعايير الهندسية وتحديثات الحالة.",
    },
  },
  {
    id: "nasa-missions-a-z",
    title: {
      en: "NASA Missions A–Z",
      ar: "مهمات ناسا من الألف إلى الياء",
    },
    organization: "NASA",
    url: "https://www.nasa.gov/a-to-z-of-nasa-missions/",
    summary: {
      en: "Comprehensive historical index of active and completed NASA spaceflight endeavors.",
      ar: "فهرس تاريخي شامل للمهمات الفضائية النشطة والمكتملة التابعة لناسا.",
    },
  },
  {
    id: "lpi-apollo-documents",
    title: {
      en: "Lunar and Planetary Institute — Apollo Documents",
      ar: "معهد القمر والكواكب — وثائق أبولو",
    },
    organization: "Lunar and Planetary Institute (LPI)",
    url: "https://www.lpi.usra.edu/lunar/documents/",
    summary: {
      en: "Primary technical documentation, flight plans, and ALSEP deployment telemetry reports.",
      ar: "الوثائق التقنية الأولية وخطط الطيران وتقارير قياسات نشر حزم أبولو العلمية.",
    },
  },
  {
    id: "nasa-rps-missions",
    title: {
      en: "NASA — Radioisotope Power Systems (RPS)",
      ar: "أنظمة الطاقة بالنظائر المشعة — ناسا",
    },
    organization: "NASA Science",
    url: "https://science.nasa.gov/planetary-science/programs/radioisotope-power-systems/missions/",
    summary: {
      en: "Detailed engineering of the nuclear power units (RTGs) powering ALSEP, Viking, and deep-space probes.",
      ar: "الهندسة التفصيلية لوحدات الطاقة النووية (RTG) التي زودت ALSEP وفايكنغ ومسابير الفضاء العميق بالطاقة.",
    },
  },
];

export function ChallengeResourcesNavigator({ locale }: { locale: Locale }) {
  const [filter, setFilter] = useState<ChallengeCategoryFilter>("all");
  const isArabic = locale === "ar";

  const filteredResources = useMemo(() => {
    if (filter === "all") return PRIMARY_CHALLENGE_RESOURCES;
    return PRIMARY_CHALLENGE_RESOURCES.filter(
      (item) => item.category === filter
    );
  }, [filter]);

  return (
    <section
      className="container-content pt-16"
      aria-labelledby="challenge-resources-heading"
    >
      <div className="echo-card rounded-3xl p-6 sm:p-10">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#1a1338]/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#5b3fe0]">
              <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
              <span>
                {isArabic
                  ? "تحدي ناسا لتطبيقات الفضاء · المصادر الرسمية"
                  : "NASA Space Apps Challenge · Primary Resources"}
              </span>
            </div>
            <h2
              id="challenge-resources-heading"
              className="mt-2 text-balance text-2xl font-bold tracking-tight text-[#1a1338] sm:text-3xl"
            >
              {isArabic
                ? "المصادر الـ 14 الرسمية: مهجورة لكن غير منسية"
                : "The 14 Primary Challenge Resources"}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#4a4266]">
              {isArabic
                ? "قائمة المصادر الـ 14 المعتمدة لتحدي 'متروكة لكن غير منسية: السرد القصصي لمعدات ناسا المهجورة على القمر والمريخ'. يربط جرافيرس كل مصدر رسمي بسجلاته وقصصه التفاعلية، مع التمييز الدقيق بين المعدات على السطح، وتلك الباقية في المدار، والمسابير المسافرة في الفضاء العميق."
                : "All 14 primary resources designated by NASA for the 'Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars' challenge. GRAVERSE connects each resource to its verified records and interactive stories, strictly distinguishing surface artifacts from orbital spacecraft and interstellar probes."}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            {(
              [
                {
                  key: "all",
                  label: isArabic ? "الكل (14)" : "All 14 Resources",
                },
                {
                  key: "nasa-data",
                  label: isArabic ? "أرشيف ناسا (1)" : "NASA Archive (1)",
                },
                {
                  key: "moon",
                  label: isArabic ? "القمر (4)" : "The Moon (4)",
                },
                {
                  key: "mars-deep-space",
                  label: isArabic
                    ? "المريخ والفضاء العميق (9)"
                    : "Mars & Deep Space (9)",
                },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setFilter(tab.key)}
                className={`rounded-full px-3.5 py-1.5 font-medium transition-colors ${
                  filter === tab.key
                    ? "bg-[#5b3fe0] text-white"
                    : "bg-[#150f36]/5 text-[#4a4266] hover:bg-[#150f36]/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 14 Primary resources list */}
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {filteredResources.map((item) => {
            const isArchive = item.disposition.type === "archive";
            const isOrbit = item.disposition.type === "orbit";
            const isDeepSpace = item.disposition.type === "deep-space";

            return (
              <article
                key={item.id}
                className="group flex flex-col justify-between rounded-2xl border border-[#1a1338]/10 bg-white/70 p-5 shadow-sm transition-all hover:border-[#5b3fe0]/40 hover:bg-white hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#5b3fe0]">
                      <span className="rounded bg-[#5b3fe0]/10 px-2 py-0.5">
                        #{String(item.number).padStart(2, "0")}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-[#6b6484]">
                        {item.organization}
                      </span>
                    </span>

                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        isArchive
                          ? "bg-amber-500/15 text-amber-900"
                          : isOrbit
                            ? "bg-purple-500/15 text-purple-900"
                            : isDeepSpace
                              ? "bg-cyan-500/15 text-cyan-900"
                              : "bg-emerald-500/15 text-emerald-900"
                      }`}
                    >
                      {item.disposition[locale]}
                    </span>
                  </div>

                  <h3 className="mt-2.5 text-base font-semibold leading-snug text-[#1a1338]">
                    {item.title[locale]}
                  </h3>

                  <div className="mt-1 flex items-center gap-1.5 text-xs text-[#5b3fe0]">
                    {isArchive ? (
                      <Database aria-hidden="true" className="h-3.5 w-3.5" />
                    ) : isOrbit ? (
                      <Orbit aria-hidden="true" className="h-3.5 w-3.5" />
                    ) : isDeepSpace ? (
                      <Navigation aria-hidden="true" className="h-3.5 w-3.5" />
                    ) : (
                      <Globe2 aria-hidden="true" className="h-3.5 w-3.5" />
                    )}
                    <span className="font-medium text-[#4a4266]">
                      {item.destination[locale]}
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-[#4a4266]">
                    {item.summary[locale]}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#1a1338]/5 pt-3">
                  <a
                    href={item.nasaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-[#5b3fe0] transition-colors hover:text-[#4a30c4]"
                  >
                    <span>{isArabic ? "مصدر ناسا الرسمي" : "Official NASA Resource"}</span>
                    <ExternalLink aria-hidden="true" className="h-3 w-3" />
                  </a>

                  {item.stories.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-2">
                      {item.stories.map((st) => (
                        <Link
                          key={st.slug}
                          href={`/stories/${st.slug}`}
                          className="inline-flex items-center gap-1 rounded-full bg-[#5b3fe0]/10 px-3 py-1 text-[11px] font-semibold text-[#5b3fe0] transition-colors hover:bg-[#5b3fe0] hover:text-white"
                        >
                          <BookOpen aria-hidden="true" className="h-3 w-3" />
                          <span>{st.title[locale]}</span>
                          <ArrowRight aria-hidden="true" className="h-3 w-3 rtl:rotate-180" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[11px] font-medium text-[#6b6484]">
                      {isArabic ? "فهرس ناسا المرجعي" : "Master Reference Index"}
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Supporting resources */}
        <div className="mt-10 rounded-2xl bg-[#150f36]/5 p-5 sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#5b3fe0]">
            {isArabic ? "مراجع ناسا البحثية المساندة" : "Supporting NASA Research Resources"}
          </p>
          <p className="mt-1 text-xs text-[#4a4266]">
            {isArabic
              ? "مراجع إضافية موثقة من ناسا ومعهد القمر والكواكب لدعم التحقق من السجلات والبيانات الهندسية:"
              : "Additional authoritative reference archives from NASA and the Lunar and Planetary Institute providing supporting telemetry, documents, and historical contexts:"}
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SUPPORTING_RESEARCH_RESOURCES.map((supp) => (
              <li
                key={supp.id}
                className="rounded-xl border border-[#1a1338]/10 bg-white/80 p-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6b6484]">
                    {supp.organization}
                  </span>
                  <a
                    href={supp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#5b3fe0] hover:text-[#4a30c4]"
                    aria-label={`${supp.title[locale]} (external link)`}
                  >
                    <ExternalLink aria-hidden="true" className="h-3 w-3" />
                  </a>
                </div>
                <a
                  href={supp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-xs font-semibold text-[#1a1338] hover:text-[#5b3fe0]"
                >
                  {supp.title[locale]}
                </a>
                <p className="mt-1 text-[11px] leading-relaxed text-[#4a4266]">
                  {supp.summary[locale]}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
