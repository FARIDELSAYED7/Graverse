import type { EchoStory } from "@/types/echo";
import { echoImage } from "./media";

/**
 * NEAR SHOEMAKER — the first spacecraft to orbit an asteroid, and the first
 * to touch down on one.
 *
 * Sources: the NASA NEAR Shoemaker mission page and the NSSDCA record.
 */
export const nearShoemakerStory: EchoStory = {
  id: "near-shoemaker",
  slug: "near-shoemaker",
  title: {
    en: "NEAR Shoemaker",
    ar: "نير شوميكر",
  },
  storyTitle: {
    en: "The First Landing on an Asteroid",
    ar: "أول هبوط على كويكب",
  },
  dek: {
    en: "A spacecraft designed to orbit an asteroid was guided to touch down on it instead — and it survived.",
    ar: "مركبة صُممت للطواف حول كويكب، جُعلت تهبط عليه بدلاً من ذلك — وقد نجت.",
  },
  summary: {
    en: "NEAR Shoemaker launched in 1996 and became the first spacecraft to orbit an asteroid when it arrived at 433 Eros in 2000. The mission mapped the asteroid, measured its composition and found no magnetic field. Although it was not designed to land, controllers guided it to a gentle touchdown in February 2001. It kept returning data for about two weeks before the cold ended the mission.",
    ar: "انطلقت نير شوميكر في 1996 وصارت أول مركبة تطوف حول كويكب حين وصلت إلى الكويكب 433 إيروس في 2000. رسمت المهمة خريطة الكويكب وقاست تركيبته ولم تجد مجالاً مغناطيسياً. ومع أنها لم تُصمم للهبوط، وجّهها المراقبون إلى هبوط لطيف في فبراير 2001. وواصلت إرسال البيانات نحو أسبوعين قبل أن ينهي البرد المهمة.",
  },
  location: {
    en: "Asteroid 433 Eros",
    ar: "الكويكب 433 إيروس",
  },
  locationNote: {
    en: "Eros is a near-Earth asteroid about 34 km long. NEAR Shoemaker came to rest on its surface south of a feature called the Himeros saddle.",
    ar: "إيروس كويكب قريب من الأرض يبلغ طوله نحو 34 كم. واستقرت نير شوميكر على سطحه جنوب سَرْج تُسمى هيميروس.",
  },
  equipmentType: {
    en: "Asteroid orbiter and lander",
    ar: "مركبة مدارية وهبوط للكويكبات",
  },
  missionPeriod: {
    en: "Launch 17 February 1996 · Orbit insertion 14 February 2000 · Touchdown 12 February 2001 · Last contact 28 February 2001",
    ar: "الإطلاق 17 فبراير 1996 · دخول المدار 14 فبراير 2000 · الهبوط 12 فبراير 2001 · آخر اتصال 28 فبراير 2001",
  },
  missionStatus: {
    en: "Mission complete — the spacecraft survived its unplanned landing and operated until 28 February 2001.",
    ar: "اكتملت المهمة — نجت المركبة من هبوطها غير المخطط وعملت حتى 28 فبراير 2001.",
  },
  hardwareStatus: {
    en: "Inactive — NEAR Shoemaker rests on the surface of Eros.",
    ar: "غير نشطة — تستقر نير شوميكر على سطح إيروس.",
  },
  statusKind: "complete",
  accent: "#B08A6A",
  accentSoft: "#F0E4D9",
  badge: {
    en: "Asteroid Touchdown",
    ar: "هبوط على كويكب",
  },
  badgeKey: "asteroid-touchdown",
  hero: echoImage("PIA18177", {
    alt: {
      en: "An artist's rendering of the NEAR Shoemaker spacecraft arriving at asteroid Eros.",
      ar: "تصور فني لمركبة نير شوميكر وهي تصل إلى الكويكب إيروس.",
    },
    caption: {
      en: "An artist's concept of NEAR Shoemaker at Eros. The spacecraft became the first to orbit an asteroid and the first to land on one.",
      ar: "تصور فني لنير شوميكر عند إيروس. صارت المركبة أول من طاف حول كويكب وأول من هبط على واحد.",
    },
  }),
  gallery: [
    echoImage("PIA02473", {
      alt: {
        en: "A processed image showing the asteroid Eros from slightly different perspectives.",
        ar: "صورة معالجة تظهر الكويكب إيروس من زوايا مختلفة قليلاً.",
      },
      caption: {
        en: "Eros from orbit. NEAR Shoemaker mapped more than 70 percent of the asteroid and returned about 160,000 images.",
        ar: "إيروس من المدار. رسمت نير شوميكر أكثر من 70 بالمئة من الكويكب وأعادت نحو 160,000 صورة.",
      },
    }),
    echoImage("PIA03142", {
      alt: {
        en: "A diagram of the path followed by NEAR Shoemaker as it approached and landed on Eros.",
        ar: "رسم يوضح المسار الذي اتبعته نير شوميكر عند اقترابها من إيروس وهبوطها عليه.",
      },
      caption: {
        en: "The final approach path. The landing was added late in the mission, after the spacecraft had already completed its science goals.",
        ar: "مسار الاقتراب الأخير. أُضيف الهبوط في مرحلة متأخرة من المهمة، بعد أن كانت المركبة قد أنجزت أهدافها العلمية.",
      },
    }),
    echoImage("PIA03144", {
      alt: {
        en: "An annotated view of landmarks around the NEAR Shoemaker touchdown site on Eros.",
        ar: "منظر موضح بعلامات حول موقع هبوط نير شوميكر على إيروس.",
      },
      caption: {
        en: "Landmarks around the touchdown site. The spacecraft came to rest in a region that had been carefully mapped from orbit.",
        ar: "علامات حول موقع الهبوط. استقرت المركبة في منطقة كانت قد رُسمت بعناية من المدار.",
      },
    }),
  ],
  facts: [
    {
      label: { en: "Launch mass", ar: "كتلة الإطلاق" },
      value: { en: "About 805 kg", ar: "نحو 805 كغ" },
    },
    {
      label: { en: "Dry mass", ar: "الكتلة الجافة" },
      value: { en: "About 487 kg", ar: "نحو 487 كغ" },
    },
    {
      label: { en: "Orbit insertion", ar: "دخول المدار" },
      value: { en: "14 February 2000", ar: "14 فبراير 2000" },
    },
    {
      label: { en: "Touchdown", ar: "الهبوط" },
      value: { en: "12 February 2001", ar: "12 فبراير 2001" },
    },
    {
      label: { en: "Last contact", ar: "آخر اتصال" },
      value: { en: "28 February 2001", ar: "28 فبراير 2001" },
    },
    {
      label: { en: "Images returned", ar: "الصور المعادة" },
      value: { en: "About 160,000", ar: "نحو 160,000" },
    },
  ],
  chapters: [
    {
      id: "meet",
      kind: "meet",
      eyebrow: { en: "Chapter one", ar: "الفصل الأول" },
      title: { en: "Meet the Asteroid Chaser", ar: "تعرّف على مطارد الكويكبات" },
      summary: {
        en: "A spacecraft sent to answer a simple question: what is an asteroid actually made of?",
        ar: "مركبة أُرسلت للإجابة عن سؤال بسيط: ممّ يتكون الكويكب فعلاً؟",
      },
      narrative: {
        en: [
          "Asteroids are the leftover building blocks of the solar system. Most of them orbit the Sun in a belt between Mars and Jupiter, but some come much closer to Earth. Eros is one of those near-Earth asteroids, and it was the target of the NEAR mission.",
          "NEAR Shoemaker was built to rendezvous with Eros, orbit it for a year and study it with cameras, a laser rangefinder, a magnetometer and spectrometers. It was not designed to land. The plan was to measure the asteroid from a safe distance.",
          "The spacecraft was originally planned to carry a small lander, but that part of the mission was cancelled. Instead, the whole spacecraft eventually made the landing itself.",
        ],
        ar: [
          "الكويكبات بقايا لبنات بناء النظام الشمسي. ومعظمها يدور حول الشمس في حزام بين المريخ والمشتري، لكن بعضها يقترب من الأرض كثيراً. وإيروس أحد تلك الكويكبات القريبة، وكان هدف مهمة نير.",
          "صُنعت نير شوميكر لتلتقي بإيروس وتطوف حوله سنة وتدرسه بكاميرات ومقياس ليزر للاستشعار ومقياس مغناطيسي ومقاييس طيف. ولم تُصمم للهبوط، بل كانت الخطة قياس الكويكب من مسافة آمنة.",
          "وحملت المركبة مسبار هبوط صغيراً كان مقرراً إنزاله على السطح، لكن ذلك الجزء من المهمة أُلغي. وبدلاً من ذلك، قامت المركبة كلها في النهاية بالهبوط بنفسها.",
        ],
      },
      echo: {
        en: "The plan was to look. The mission became a visit.",
        ar: "كانت الخطة أن تنظر. فصارت المهمة زيارة.",
      },
      facts: [
        {
          label: { en: "Target", ar: "الهدف" },
          value: { en: "Asteroid 433 Eros", ar: "الكويكب 433 إيروس" },
        },
        {
          label: { en: "Planned role", ar: "الدور المخطط" },
          value: { en: "Orbiter, not lander", ar: "مركبة مدارية لا هبوط" },
        },
        {
          label: { en: "Main tools", ar: "الأدوات الرئيسية" },
          value: {
            en: "Cameras, laser rangefinder, magnetometer and spectrometers",
            ar: "كاميرات ومقياس ليزر ومقياس مغناطيسي ومقاييس طيف",
          },
        },
      ],
      diagram: {
        kind: "instrument-components",
        title: { en: "What NEAR Shoemaker carried", ar: "ما حملته نير شوميكر" },
        intro: {
          en: "Select a marker to see what that instrument did.",
          ar: "اختر أي علامة لترى وظيفة ذلك الجهاز.",
        },
        points: [
          {
            id: "cameras",
            x: 30,
            y: 26,
            label: { en: "Imaging cameras", ar: "كاميرات التصوير" },
            detail: {
              en: "A multispectral camera that returned about 160,000 images of Eros over the mission.",
              ar: "كاميرا متعددة الطيف أعادت نحو 160,000 صورة من إيروس على مدى المهمة.",
            },
          },
          {
            id: "laser-rangefinder",
            x: 62,
            y: 20,
            label: { en: "Laser rangefinder", ar: "مقياس الليزر للمدى" },
            detail: {
              en: "It bounced laser pulses off the surface to measure the asteroid's shape and the spacecraft's own altitude.",
              ar: "أطلقت نبضات ليزر على السطح لقياس شكل الكويكب وارتفاع المركبة نفسها.",
            },
          },
          {
            id: "magnetometer",
            x: 68,
            y: 62,
            label: { en: "Magnetometer", ar: "المقياس المغناطيسي" },
            detail: {
              en: "It looked for a magnetic field around Eros and found none at all.",
              ar: "بحث عن مجال مغناطيسي حول إيروس فلم يجد شيئاً على الإطلاق.",
            },
          },
          {
            id: "spectrometers",
            x: 30,
            y: 72,
            label: { en: "Spectrometers", ar: "مقاييس الطيف" },
            detail: {
              en: "An infrared spectrometer and a gamma-ray spectrometer read what the surface of the asteroid is made of.",
              ar: "مقياس طيفي تحت الحمراء ومقياس أشعة غاما يقرأان ما يتكون منه سطح الكويكب.",
            },
          },
        ],
      },
      quiz: [
        {
          id: "near-q1",
          prompt: {
            en: "What was NEAR Shoemaker originally designed to do?",
            ar: "ما الذي صُممت نير شوميكر لفعله أصلاً؟",
          },
          options: [
            {
              id: "a",
              label: {
                en: "Orbit and study an asteroid.",
                ar: "الطواف حول كويكب ودراسته.",
              },
            },
            {
              id: "b",
              label: {
                en: "Land on an asteroid and bring samples back.",
                ar: "الهبوط على كويكب وإعادة عينات.",
              },
            },
            {
              id: "c",
              label: {
                en: "Fly past the asteroid without stopping.",
                ar: "المرور بالكويكب دون توقف.",
              },
            },
          ],
          correctOptionId: "a",
          explanation: {
            en: "NEAR was an orbiter. The landing was an unplanned extra that succeeded because the spacecraft was moving slowly enough when it touched down.",
            ar: "كانت نير مركبة مدارية. أما الهبوط فكان إضافة غير مخطط لها ونجحت لأن المركبة كانت تتحرك ببطء كافٍ عند ملامسة السطح.",
          },
        },
      ],
    },
    {
      id: "mission",
      kind: "mission",
      eyebrow: { en: "Chapter two", ar: "الفصل الثاني" },
      title: { en: "Arrival and the Long Look", ar: "الوصول والنظرة الطويلة" },
      summary: {
        en: "A year and a half of orbiting, mapping and measuring — and then one last, gentle descent.",
        ar: "عام ونصف من الطواف والرسم والقياس — ثم نزول أخير لطيف.",
      },
      narrative: {
        en: [
          "NEAR launched on 17 February 1996. It flew past asteroid Mathilde in 1997 and passed Earth for a gravity assist, then reached Eros in early 2000. On 14 February 2000 it became the first spacecraft to orbit an asteroid.",
          "For the next year the spacecraft circled Eros at steadily lower altitudes. It mapped the surface, measured the asteroid's gravity and composition, and watched for changes as the asteroid rotated.",
          "In February 2001 the team decided to attempt a landing. Eros has very weak gravity, so a spacecraft can approach it slowly enough to touch down with a speed similar to a person's walking pace. NEAR Shoemaker did exactly that on 12 February, and it survived.",
        ],
        ar: [
          "انطلقت نير في 17 فبراير 1996. ومرّت بالكويكب ماثيلد في 1997 وبالأرض للاستفادة من مساعدة الجاذبية، ثم وصلت إلى إيروس في أوائل 2000. وفي 14 فبراير 2000 صارت أول مركبة تطوف حول كويكب.",
          "وعلى مدى السنة التالية دارت المركبة حول إيروس في مدارات منخفضة تدريجياً. فرسمت السطح وقاست جاذبية الكويكب وتركيبته، وراقبت التغيرات مع دوران الكويكب.",
          "وفي فبراير 2001 قرر الفريق محاولة الهبوط. فجاذبية إيروس ضعيفة جداً، وتستطيع المركبة الاقتراب ببطء يكفي للمس السطح بسرعة قريبة من سرعة مشي الإنسان. وفعلت نير شوميكر ذلك بالضبط في 12 فبراير، ونجت.",
        ],
      },
      echo: {
        en: "Landing on an asteroid is not a crash. It is a carefully slow approach.",
        ar: "الهبوط على كويكب ليس تحطماً، بل اقتراب بطيء ومحسوب.",
      },
      glossary: [
        {
          id: "asteroid",
          term: { en: "Asteroid", ar: "الكويكب" },
          simple: {
            en: "A rocky body orbiting the Sun, too small to be called a planet.",
            ar: "جسم صخري يدور حول الشمس، أصغر من أن يُدعى كوكباً.",
          },
        },
        {
          id: "gravity-assist",
          term: { en: "Gravity assist", ar: "مساعدة الجاذبية" },
          simple: {
            en: "Flying close past a planet so its gravity pulls the spacecraft along and reshapes its path, without spending fuel.",
            ar: "المرور قرب كوكب بحيث تسحب جاذبيته المركبة وتُعيد تشكيل مسارها، من دون إنفاق وقود.",
          },
        },
        {
          id: "chondrite",
          term: { en: "Chondrite", ar: "الكوندريت" },
          simple: {
            en: "A stony meteorite holding tiny round grains that formed before the planets did.",
            ar: "نيزك صخري يحوي حبيبات مستديرة صغيرة تكوّنت قبل الكواكب.",
          },
          technical: {
            en: "Ordinary chondrites are the most common meteorites found on Earth, and the composition of Eros matches them.",
            ar: "الكوندريتات العادية أكثر النيازك شيوعاً على الأرض، وتركيب إيروس يطابقها.",
          },
        },
      ],
    },
    {
      id: "journey",
      kind: "journey",
      eyebrow: { en: "Chapter three", ar: "الفصل الثالث" },
      title: { en: "The Long Road to Eros", ar: "الطريق الطويل إلى إيروس" },
      summary: {
        en: "Four years and one missed orbit before the first visit to an asteroid, then one more year before the landing.",
        ar: "أربع سنوات ومدار ضائع واحد قبل أول زيارة إلى كويكب، ثم سنة أخرى قبل الهبوط.",
      },
      narrative: {
        en: [
          "NEAR Shoemaker launched on 17 February 1996 on a Delta II, bound for an asteroid 34 kilometres long. The road there was not straight: the spacecraft flew past the asteroid Mathilde in 1997, swung past Earth for a gravity assist, and only then had the speed and the direction to reach Eros.",
          "The first attempt to enter orbit failed. When the spacecraft fired its engine to slow down at Eros in December 1998, the engine shut itself down, and NEAR sailed past the asteroid instead of circling it. The team let it fall back toward Earth, borrowed our planet's gravity to turn it around, and sent it back.",
          "On 14 February 2000 the second attempt worked, and NEAR Shoemaker became the first spacecraft ever to orbit an asteroid. For a year it circled Eros at steadily lower altitudes, mapping a body shaped like a potato and covered in craters.",
          "The landing was never in the plan. On 12 February 2001 the team flew the whole spacecraft down to the surface at about the speed of a walking person. It touched down, survived, and kept transmitting for about sixteen days — the first landing on an asteroid.",
        ],
        ar: [
          "أُطلقت نير شوميكر في 17 فبراير 1996 على صاروخ دلتا 2، متجهة إلى كويكب طوله 34 كيلومتراً. ولم يكن الطريق إلى هناك مستقيماً: فقد مرّت المركبة بالكويكب ماثيلد عام 1997، ثم مرّت بالأرض لتقتبس من جاذبيتها دفعةً في المسار، وعندها فقط اكتسبت السرعة والاتجاه اللازمين للوصول إلى إيروس.",
          "فشلت أول محاولة لدخول المدار. فحين أشعلت المركبة محركها لتتباطأ عند إيروس في ديسمبر 1998، أطفأ المحرك نفسه، فمرّت نير بالكويكب بدل أن تدور حوله. وتركها الفريق تعود نحو الأرض، واستعار جاذبية كوكبنا ليعيد توجيهها، ثم أرسلها مرة أخرى.",
          "وفي 14 فبراير 2000 نجحت المحاولة الثانية، وصارت نير شوميكر أول مركبة تطوف حول كويكب على الإطلاق. وعلى مدى سنة دارت حول إيروس في مدارات منخفضة تدريجياً، ترسم جسماً على شكل حبة بطاطا تغطيه الفوهات.",
          "ولم يكن الهبوط في الخطة أبداً. ففي 12 فبراير 2001 أنزل الفريق المركبة كلها إلى السطح بسرعة تقارب سرعة مشي الإنسان. لمست السطح، ونجت، وواصلت البث نحو ستة عشر يوماً — أول هبوط على كويكب.",
        ],
      },
      echo: {
        en: "The plan said orbit. The ending said landing — and the spacecraft turned out to be ready for both.",
        ar: "قالت الخطة: مدار. وقالت النهاية: هبوط — وقد تبيّن أن المركبة مستعدة للأمرين.",
      },
      timeline: [
        {
          id: "near-launch",
          date: "1996-02-17",
          dateLabel: { en: "17 February 1996", ar: "17 فبراير 1996" },
          label: { en: "Launch", ar: "الإطلاق" },
          description: {
            en: "NEAR Shoemaker launched on a Delta II rocket.",
            ar: "انطلقت نير شوميكر على صاروخ دلتا 2.",
          },
          type: "launch",
          sourceIds: ["SRC-NASA-NEAR-SHOEMAKER", "SRC-NSSDCA-NEAR-SHOEMAKER"],
        },
        {
          id: "near-orbit",
          date: "2000-02-14",
          dateLabel: { en: "14 February 2000", ar: "14 فبراير 2000" },
          label: { en: "Orbit around Eros", ar: "الطواف حول إيروس" },
          description: {
            en: "NEAR became the first spacecraft to orbit an asteroid.",
            ar: "صارت نير أول مركبة تطوف حول كويكب.",
          },
          type: "arrival",
          sourceIds: ["SRC-NASA-NEAR-SHOEMAKER", "SRC-NSSDCA-NEAR-SHOEMAKER"],
        },
        {
          id: "near-touchdown",
          date: "2001-02-12",
          dateLabel: { en: "12 February 2001", ar: "12 فبراير 2001" },
          label: { en: "Touchdown on Eros", ar: "الهبوط على إيروس" },
          description: {
            en: "Controllers guided the spacecraft to a gentle landing on the asteroid's surface.",
            ar: "وجّه المراقبون المركبة إلى هبوط لطيف على سطح الكويكب.",
          },
          type: "landing",
          sourceIds: ["SRC-NASA-NEAR-SHOEMAKER", "SRC-NSSDCA-NEAR-SHOEMAKER"],
        },
        {
          id: "near-last",
          date: "2001-02-28",
          dateLabel: { en: "28 February 2001", ar: "28 فبراير 2001" },
          label: { en: "Last contact", ar: "آخر اتصال" },
          description: {
            en: "The cold on Eros drained the spacecraft's power, and it stopped communicating.",
            ar: "استنزف برد إيروس طاقة المركبة، فتوقفت عن التواصل.",
          },
          type: "last-contact",
          sourceIds: ["SRC-NSSDCA-NEAR-SHOEMAKER"],
        },
      ],
      diagram: {
        kind: "journey-map",
        title: { en: "The long road to Eros", ar: "الطريق الطويل إلى إيروس" },
        intro: {
          en: "Four years from launch to orbit, and one more year down to the surface.",
          ar: "أربع سنوات من الإطلاق إلى المدار، وسنة أخرى حتى السطح.",
        },
        route: [
          {
            label: { en: "Launch", ar: "الإطلاق" },
            description: { en: "A Delta II, 17 February 1996", ar: "صاروخ دلتا 2، 17 فبراير 1996" },
          },
          {
            label: { en: "Mathilde flyby", ar: "المرور بماثيلد" },
            description: {
              en: "Past asteroid Mathilde in 1997",
              ar: "المرور بالكويكب ماثيلد عام 1997",
            },
          },
          {
            label: { en: "Gravity assist", ar: "مساعدة الجاذبية" },
            description: {
              en: "A close pass by Earth to gain speed",
              ar: "اقتراب من الأرض لكسب السرعة",
            },
          },
          {
            label: { en: "Orbit around Eros", ar: "الطواف حول إيروس" },
            description: {
              en: "14 February 2000, a first for any spacecraft",
              ar: "14 فبراير 2000، أول مرة لأي مركبة",
            },
          },
          {
            label: { en: "Touchdown", ar: "الهبوط" },
            description: {
              en: "12 February 2001, at about walking pace",
              ar: "12 فبراير 2001، بسرعة تقارب سرعة المشي",
            },
          },
        ],
        points: [
          {
            id: "earth",
            x: 12,
            y: 32,
            label: { en: "Earth", ar: "الأرض" },
            detail: {
              en: "Launch on a Delta II on 17 February 1996, and a gravity assist from Earth on the way back.",
              ar: "الإطلاق على صاروخ دلتا 2 في 17 فبراير 1996، ومساعدة جاذبية الأرض في الطريق العائد.",
            },
          },
          {
            id: "mathilde",
            x: 38,
            y: 66,
            label: { en: "Mathilde", ar: "ماثيلد" },
            detail: {
              en: "The first asteroid NEAR Shoemaker flew past, in 1997.",
              ar: "أول كويكب مرّت به نير شوميكر، عام 1997.",
            },
          },
          {
            id: "eros-orbit",
            x: 70,
            y: 34,
            label: { en: "Eros in orbit", ar: "إيروس من المدار" },
            detail: {
              en: "Orbit achieved on 14 February 2000 — the first orbit of an asteroid.",
              ar: "تمّ الدخول إلى المدار في 14 فبراير 2000 — أول مدار حول كويكب.",
            },
          },
          {
            id: "touchdown",
            x: 86,
            y: 74,
            label: { en: "The touchdown", ar: "الهبوط على السطح" },
            detail: {
              en: "On 12 February 2001 the whole spacecraft settled on the surface at about walking pace.",
              ar: "في 12 فبراير 2001 استقرت المركبة كلها على السطح بسرعة تقارب سرعة المشي.",
            },
          },
        ],
      },
    },
    {
      id: "discoveries",
      kind: "discoveries",
      eyebrow: { en: "Chapter four", ar: "الفصل الرابع" },
      title: { en: "A Portrait of Eros", ar: "صورة إيروس" },
      summary: {
        en: "A battered, elongated world with no magnetic field and a link to meteorites on Earth.",
        ar: "عالم ممتد ومليء بالفوهات بلا مجال مغناطيسي، وله صلة بنيازك على الأرض.",
      },
      narrative: {
        en: [
          "NEAR's images showed Eros as an elongated, irregular body covered in craters, ridges and smooth patches. Some regions looked like they had been resurfaced by material sliding downhill, while others were saturated with impact craters.",
          "The mission measured Eros' mass, density and gravity field. It found that the asteroid is a fractured pile of rock rather than a solid slab, with a surprisingly uniform interior.",
          "The magnetometer detected no magnetic field. Spectrometers showed that Eros is an S-type asteroid, and its composition matched the most common meteorites found on Earth — ordinary chondrites.",
        ],
        ar: [
          "أظهرت صور نير إيروس جسماً ممتداً غير منتظم تغطيه الفوهات والحواف والرقاع الملساء. وبدت بعض المناطق وكأنها جُددت بمادة انزلقت إلى الأسفل، بينما كانت مناطق أخرى مشبعة بفوهات الاصطدام.",
          "وقاست المهمة كتلة إيروس وكثافته ومجال جاذبيته. ووجدت أن الكويكب كومة صخور متشققة لا كتلة صلبة واحدة، وله داخل متماثل بشكل مفاجئ.",
          "ولم يكشف المقياس المغناطيسي أي مجال مغناطيسي. وأظهرت مقاييس الطيف أن إيروس كويكب من النوع الصخري، وأن تركيبته تطابق أكثر النيازك شيوعاً على الأرض.",
        ],
      },
      echo: {
        en: "An asteroid is not a boring rock. It is a record of the solar system's first construction site.",
        ar: "الكويكب ليس صخرة مملة، بل سجل لورشة البناء الأولى للنظام الشمسي.",
      },
      discoveries: [
        {
          id: "near-d1",
          title: { en: "A rubble-pile world", ar: "عالم من كومة حطام" },
          question: {
            en: "Is an asteroid a solid body or a collection of fragments?",
            ar: "هل الكويكب جسم صلب أم مجموعة شظايا؟",
          },
          instrument: {
            en: "NEAR's laser rangefinder, camera and radio tracking",
            ar: "مقياس الليزر والكاميرا والتتبع الراديوي في نير",
          },
          method: {
            en: "The spacecraft measured the asteroid's shape, gravity field and rotation over a year of close orbits.",
            ar: "قاست المركبة شكل الكويكب ومجال جاذبيته ودورانه خلال سنة من المدارات القريبة.",
          },
          data: {
            en: "The density and gravity field suggested a loosely bound body with internal fractures, not a single solid mass.",
            ar: "أشارت الكثافة ومجال الجاذبية إلى جسم متماسك بشكل ضعيف وفيه تشققات داخلية، لا كتلة صلبة واحدة.",
          },
          finding: {
            en: "Eros is a fractured rubble pile, a collection of rocky fragments held together by weak gravity.",
            ar: "إيروس كومة حطام متشققة، مجموعة من الشظايا الصخرية يمسكها ضعف الجاذبية.",
          },
          significance: {
            en: "It changed how scientists think about asteroid structure and how a spacecraft might interact with one.",
            ar: "غيّر ذلك طريقة تفكير العلماء في بنية الكويكبات وكيف قد تتفاعل معها مركبة فضائية.",
          },
          sourceIds: ["SRC-NASA-NEAR-SHOEMAKER", "SRC-NSSDCA-NEAR-SHOEMAKER"],
        },
        {
          id: "near-d2",
          title: { en: "A link to Earth's meteorites", ar: "صلة بنيازك الأرض" },
          question: {
            en: "Where do ordinary meteorites come from?",
            ar: "من أين تأتي النيازك العادية؟",
          },
          instrument: {
            en: "Near-infrared spectrometer and X-ray/gamma-ray spectrometer",
            ar: "مطياف الأشعة تحت الحمراء القريبة ومطياف الأشعة السينية وغاما",
          },
          method: {
            en: "The spectrometers measured the composition of Eros' surface from orbit and compared it with laboratory measurements of meteorites.",
            ar: "قاست مقاييس الطيف تركيب سطح إيروس من المدار وقارنته بقياسات مختبرية للنيازك.",
          },
          data: {
            en: "Eros' surface composition matched ordinary chondrite meteorites, the most common type found on Earth.",
            ar: "طابق تركيب سطح إيروس نيازك الكوندريت العادية، وهي أكثر الأنواع شيوعاً على الأرض.",
          },
          finding: {
            en: "At least some near-Earth asteroids like Eros are the source of the most common meteorites that reach Earth.",
            ar: "بعض الكويكبات القريبة من الأرض مثل إيروس هي مصدر أكثر النيازك شيوعاً التي تصل إلى الأرض، على الأقل.",
          },
          significance: {
            en: "It connected a rock in a museum collection to a world that had just been explored by a spacecraft.",
            ar: "ربط حجراً في مجموعة متحف بعالم كانت مركبة فضائية قد استكشفته للتو.",
          },
          sourceIds: ["SRC-NASA-NEAR-SHOEMAKER", "SRC-NSSDCA-NEAR-SHOEMAKER"],
        },
      ],
    },
    {
      id: "ending",
      kind: "ending",
      eyebrow: { en: "Chapter five", ar: "الفصل الخامس" },
      title: { en: "Resting on Eros", ar: "الاستقرار على إيروس" },
      summary: {
        en: "The first spacecraft to touch an asteroid is still there, on a world only 34 kilometres long.",
        ar: "أول مركبة تلمس كويكب ما زالت هناك، على عالم لا يتجاوز طوله 34 كيلومتراً.",
      },
      narrative: {
        en: [
          "After touchdown, NEAR Shoemaker continued to return data from the surface for about two weeks. Its gamma-ray spectrometer measured the composition of the material beneath it, and its camera took close-up images of the ground.",
          "The end came when the spacecraft's solar panels could no longer generate enough power in the cold and the dark. It stopped communicating on 28 February 2001.",
          "Eros continues to orbit the Sun, carrying a small machine that was sent to look at it and ended up staying. It is a different kind of landmark from a rover or a lander: not a mission site, but a resting place on a wandering world.",
        ],
        ar: [
          "بعد الهبوط، واصلت نير شوميكر إرسال البيانات من السطح نحو أسبوعين. وقاس مطياف أشعة غاما تركيب المادة تحتها، والتقطت كاميرتها صوراً قريبة للأرض.",
          "وجاءت النهاية حين لم تعد الألواح الشمسية للمركبة قادرة على توليد طاقة كافية في البرد والظلام. فتوقفت عن التواصل في 28 فبراير 2001.",
          "وما زال إيروس يدور حول الشمس حاملاً آلة صغيرة أُرسلت لتنظر إليه فبقيت معه. وهو معلم من نوع مختلف عن عربة أو مركبة هبوط: ليس موقع مهمة، بل مكان راحة على عالم جوّال.",
        ],
      },
      echo: {
        en: "It went to study a wandering rock and became part of its journey.",
        ar: "ذهبت لدراسة صخرة جوّالة فصارت جزءاً من رحلتها.",
      },
      facts: [
        {
          label: { en: "Final location", ar: "الموقع الأخير" },
          value: { en: "Surface of 433 Eros", ar: "سطح الكويكب 433 إيروس" },
        },
        {
          label: { en: "Last contact", ar: "آخر اتصال" },
          value: { en: "28 February 2001", ar: "28 فبراير 2001" },
        },
        {
          label: { en: "Asteroid length", ar: "طول الكويكب" },
          value: { en: "About 34 km", ar: "نحو 34 كم" },
        },
        {
          label: { en: "Still there", ar: "ما زالت هناك" },
          value: { en: "Yes", ar: "نعم" },
        },
      ],
    },
    {
      id: "legacy",
      kind: "legacy",
      eyebrow: { en: "Chapter six", ar: "الفصل السادس" },
      title: { en: "The Visitor That Stayed", ar: "الزائرة التي بقيت" },
      summary: {
        en: "Two firsts in one mission, and a spacecraft that became part of what it studied.",
        ar: "أوليتان في مهمة واحدة، ومركبة صارت جزءاً مما درسته.",
      },
      narrative: {
        en: [
          "NEAR Shoemaker did two things nobody had done. It was the first spacecraft to orbit an asteroid, and then — in an ending nobody planned — the first to land on one and keep working.",
          "The landing mattered because it was gentle. The spacecraft came down at roughly walking pace and found that an asteroid's surface could hold it. Later sample-return probes touched asteroids the same way: softly, and only for a moment.",
          "The name on the spacecraft is part of its legacy too. NEAR carried the name of Eugene Shoemaker, the geologist who taught planetary scientists how to read impact craters — and whose ashes were later carried to the Moon.",
          "Eros keeps orbiting the Sun, and it carries its visitor with it. The machine that was sent to look is now part of what it studied.",
        ],
        ar: [
          "فعلت نير شوميكر شيئين لم تفعلهما من قبل. كانت أول مركبة تطوف حول كويكب، ثم — في نهاية لم يخطط لها أحد — أول مركبة تهبط على واحد وتواصل العمل.",
          "كان الهبوط مهماً لأنه كان لطيفاً. هبطت المركبة بسرعة تقارب سرعة المشي، ووجدت أن سطح الكويكب يستطيع احتمالها. ولمست مسبارات إعادة العينات الكويكبات لاحقاً بالطريقة نفسها: برفق، ولحظة واحدة فقط.",
          "والاسم المكتوب على المركبة جزء من إرثها أيضاً. حملت نير اسم يوجين شوميكر، الجيولوجي الذي علّم علماء الكواكب كيف يقرؤون فوهات الاصطدام — ونُقلت رماده بعد ذلك إلى القمر.",
          "وما زال إيروس يدور حول الشمس حاملاً زائرته معه. فالآلة التي أُرسلت لتنظر صارت جزءاً مما درسته.",
        ],
      },
      echo: {
        en: "It was named for a man who taught us how to read the scars on other worlds — and then it went and left a mark of its own.",
        ar: "سُمّيت باسم رجل علّمنا كيف نقرأ الندوب على العوالم الأخرى — ثم ذهبت وتركت أثراً خاصاً بها.",
      },
      facts: [
        {
          label: { en: "First to orbit an asteroid", ar: "أول مركبة تطوف حول كويكب" },
          value: { en: "433 Eros, 14 February 2000", ar: "الكويكب 433 إيروس، 14 فبراير 2000" },
        },
        {
          label: { en: "First landing on an asteroid", ar: "أول هبوط على كويكب" },
          value: {
            en: "12 February 2001, at about walking pace",
            ar: "12 فبراير 2001، بسرعة تقارب سرعة المشي",
          },
        },
        {
          label: { en: "Images returned", ar: "الصور المعادة" },
          value: { en: "About 160,000", ar: "نحو 160,000" },
        },
      ],
    },
  ],
  legacyStatement: {
    en: "NEAR Shoemaker proved that a spacecraft can orbit an asteroid, touch it and keep working — and that asteroids are worlds, not just rocks.",
    ar: "أثبتت نير شوميكر أن مركبة فضائية تستطيع الطواف حول كويكب ولمسه ومواصلة العمل — وأن الكويكبات عوالم لا مجرد صخور.",
  },
  tags: ["deep-space", "instrument"],
  artifactId: "near-shoemaker",
  sourceIds: ["SRC-NASA-NEAR-SHOEMAKER", "SRC-NSSDCA-NEAR-SHOEMAKER"],
  relatedStorySlugs: ["dawn", "pioneer-10"],
  echoIntro: {
    en: "This spacecraft was sent to look at an asteroid and ended up landing on it. Come and see how.",
    ar: "أُرسلت هذه المركبة لتنظر إلى كويكب فانتهى بها الأمر بالهبوط عليه. تعال لترى كيف.",
  },
  echoSignoff: {
    en: "NEAR Shoemaker is still on Eros, circling the Sun on a rock that is only 34 kilometres long.",
    ar: "ما زالت نير شوميكر على إيروس، تدور حول الشمس على صخرة لا يزيد طولها على 34 كيلومتراً.",
  },
  lastVerified: "2026-11-14",
};
