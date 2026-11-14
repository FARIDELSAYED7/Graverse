import type { EchoStory } from "@/types/echo";
import { echoImage } from "./media";

/**
 * PIONEER 11 — the first spacecraft to fly past Saturn, using Jupiter's
 * gravity to change course.
 *
 * Sources: the NASA Pioneer mission pages and the NSSDCA Pioneer 11 record.
 */
export const pioneer11Story: EchoStory = {
  id: "pioneer-11",
  slug: "pioneer-11",
  title: {
    en: "Pioneer 11",
    ar: "بايونير 11",
  },
  storyTitle: {
    en: "The Gravity Assist",
    ar: "مساعدة الجاذبية",
  },
  dek: {
    en: "Pioneer 11 used Jupiter's gravity to bend its path toward Saturn and became the first spacecraft to fly past the ringed planet.",
    ar: "استخدمت بايونير 11 جاذبية المشتري لتحني مسارها نحو زحل، فصارت أول مركبة تحلّق قرب الكوكب ذي الحلقات.",
  },
  summary: {
    en: "Pioneer 11 followed Pioneer 10 to Jupiter, then used the giant planet's gravity to swing toward Saturn. It passed Jupiter in December 1974, crossed the asteroid belt again and reached Saturn in September 1979. It returned the first close-up images of the planet and its rings, then continued outward until contact was lost in 1995.",
    ar: "تبعت بايونير 11 بايونير 10 إلى المشتري، ثم استخدمت جاذبية الكوكب العملاق لتتأرجح نحو زحل. مرّت بالمشتري في ديسمبر 1974، وعبرت حزام الكويكبات مرة أخرى، ووصلت إلى زحل في سبتمبر 1979. وأعادت أول صور قريبة للكوكب وحلقاته، ثم واصلت المسير إلى الخارج حتى فُقد الاتصال في 1995.",
  },
  location: {
    en: "Deep space, beyond the planets",
    ar: "الفضاء السحيق، وراء الكواكب",
  },
  locationNote: {
    en: "Pioneer 11 is on an escape trajectory away from the Sun, heading roughly toward the constellation Sagittarius. Its current position is not tracked.",
    ar: "تسير بايونير 11 في مسار هروب بعيداً عن الشمس، باتجاه كوكبة القوس تقريباً. ولا يجري تتبع موقعها الحالي.",
  },
  equipmentType: {
    en: "Outer-planet flyby probe",
    ar: "مسبار تحليق قرب الكواكب الخارجية",
  },
  missionPeriod: {
    en: "Launch 5 April 1973 · Jupiter flyby 2 December 1974 · Saturn flyby 1 September 1979 · Last contact 30 September 1995",
    ar: "الإطلاق 5 أبريل 1973 · التحليق قرب المشتري 2 ديسمبر 1974 · التحليق قرب زحل 1 سبتمبر 1979 · آخر اتصال 30 سبتمبر 1995",
  },
  missionStatus: {
    en: "Mission complete — contact was lost in 1995, but the spacecraft continues outward.",
    ar: "اكتملت المهمة — فُقد الاتصال في 1995، لكن المركبة تواصل المسير إلى الخارج.",
  },
  hardwareStatus: {
    en: "No longer communicating — the last contact was in September 1995. It coasts outward on a passive trajectory toward the constellation Aquila.",
    ar: "لم تعد تتواصل — كان آخر اتصال في سبتمبر 1995. وهي تنجرف إلى الخارج في مسار سلبي نحو كوكبة العقاب.",
  },
  statusKind: "traveling",
  accent: "#C7A46B",
  accentSoft: "#F3E8D2",
  badge: {
    en: "Ring Watcher",
    ar: "مراقب الحلقات",
  },
  badgeKey: "ring-watcher",
  hero: echoImage("ARC-2000-80-HC-251", {
    alt: {
      en: "A painting of Pioneer 11 approaching Saturn before its encounter with the ringed planet.",
      ar: "لوحة لبايونير 11 تقترب من زحل قبل لقائها بالكوكب ذي الحلقات.",
    },
    caption: {
      en: "Pioneer 11 before its encounter with Saturn, painted by Wilson Hurley. The spacecraft became the first to fly past Saturn in September 1979.",
      ar: "بايونير 11 قبل لقائها بزحل، بريشة ويلسون هيرلي. صارت المركبة أول من حلّق قرب زحل في سبتمبر 1979.",
    },
  }),
  gallery: [
    echoImage("9139575", {
      alt: {
        en: "The launch of the Atlas-Centaur rocket carrying the Pioneer 11 spacecraft in April 1973.",
        ar: "انطلاق صاروخ أطلس–سنتور حاملاً مركبة بايونير 11 في أبريل 1973.",
      },
      caption: {
        en: "Pioneer 11 lifts off on 5 April 1973. Its mission was to follow Pioneer 10 to Jupiter and then attempt something new: a gravity assist toward Saturn.",
        ar: "انطلقت بايونير 11 في 5 أبريل 1973. وكانت مهمتها تتبع بايونير 10 إلى المشتري ثم تجربة شيء جديد: مساعدة جاذبية نحو زحل.",
      },
    }),
    echoImage("ARC-1978-A78-0077-4", {
      alt: {
        en: "A photograph from the Ames Research Center during the Pioneer Jupiter encounter periods.",
        ar: "صورة من مركز أيمز للأبحاث خلال فترات لقاء بايونير بالمشتري.",
      },
      caption: {
        en: "Mission activity at NASA's Ames Research Center during the Pioneer 10 and 11 Jupiter encounters, December 1973 and December 1974.",
        ar: "نشاط المهمة في مركز أيمز للأبحاث التابع لناسا خلال لقاءي بايونير 10 و11 بالمشتري في ديسمبر 1973 وديسمبر 1974.",
      },
    }),
  ],
  facts: [
    {
      label: { en: "Mass", ar: "الكتلة" },
      value: { en: "About 259 kg", ar: "نحو 259 كغ" },
    },
    {
      label: { en: "Power", ar: "الطاقة" },
      value: {
        en: "Radioisotope thermoelectric generators",
        ar: "مولدات كهربائية حرارية نظائرية",
      },
    },
    {
      label: { en: "Jupiter flyby", ar: "التحليق قرب المشتري" },
      value: { en: "2 December 1974", ar: "2 ديسمبر 1974" },
    },
    {
      label: { en: "Saturn flyby", ar: "التحليق قرب زحل" },
      value: { en: "1 September 1979", ar: "1 سبتمبر 1979" },
    },
    {
      label: { en: "Last contact", ar: "آخر اتصال" },
      value: { en: "30 September 1995", ar: "30 سبتمبر 1995" },
    },
    {
      label: { en: "Status", ar: "الحالة" },
      value: { en: "Travelling outward", ar: "تسير إلى الخارج" },
    },
  ],
  chapters: [
    {
      id: "meet",
      kind: "meet",
      eyebrow: { en: "Chapter one", ar: "الفصل الأول" },
      title: { en: "Meet the Follow-Up", ar: "تعرّف على المهمة التالية" },
      summary: {
        en: "The second Pioneer was not a copy. It was a new attempt to use a planet as a steering wheel.",
        ar: "لم تكن بايونير الثانية نسخة. بل كانت محاولة جديدة لاستخدام كوكب كعجلة قيادة.",
      },
      narrative: {
        en: [
          "Pioneer 11 was built as a twin of Pioneer 10, but its mission was different. Instead of simply flying past Jupiter and continuing outward, it would use Jupiter's gravity to bend its path toward Saturn.",
          "This was a new idea in planetary exploration. A spacecraft that passes close to a planet can steal a little of the planet's orbital energy. From the spacecraft's point of view, it leaves the encounter on a different course and at a different speed, without using any fuel.",
          "The plan was risky. The spacecraft had to pass through Jupiter's intense radiation belts and then survive a long cruise to Saturn. If it worked, it would become the first spacecraft to visit the ringed planet.",
        ],
        ar: [
          "بُنيت بايونير 11 توأماً لبايونير 10، لكن مهمتها كانت مختلفة. فبدل أن تمرّ بالمشتري ببساطة وتواصل إلى الخارج، ستستخدم جاذبية المشتري لتحني مسارها نحو زحل.",
          "كانت هذه فكرة جديدة في استكشاف الكواكب. فالمركبة التي تمر قرب كوكب يمكنها أن تسرق قليلاً من طاقته المدارية. ومن وجهة نظر المركبة، تغادر اللقاء في مسار مختلف وبسرعة مختلفة دون استخدام أي وقود.",
          "كانت الخطة محفوفة بالمخاطر. فعلى المركبة أن تمر عبر أحزمة إشعاع المشتري الشديدة ثم تنجو في رحلة طويلة إلى زحل. وإن نجحت، فستصبح أول مركبة تزور الكوكب ذي الحلقات.",
        ],
      },
      echo: {
        en: "A planet can be a destination or a steering wheel. Pioneer 11 used Jupiter as both.",
        ar: "يمكن أن يكون الكوكب وجهة أو عجلة قيادة. وقد استخدمت بايونير 11 المشتري كليهما.",
      },
      facts: [
        {
          label: { en: "Technique", ar: "التقنية" },
          value: { en: "Gravity assist", ar: "مساعدة الجاذبية" },
        },
        {
          label: { en: "First target", ar: "الهدف الأول" },
          value: { en: "Jupiter", ar: "المشتري" },
        },
        {
          label: { en: "Second target", ar: "الهدف الثاني" },
          value: { en: "Saturn", ar: "زحل" },
        },
      ],
      diagram: {
        kind: "instrument-components",
        title: { en: "What Pioneer 11 carried", ar: "ما حملته بايونير 11" },
        intro: {
          en: "Select a marker to see what that part of the spacecraft was for. The shapes here are a teaching diagram of the real probe.",
          ar: "اختر أي علامة لتعرف وظيفة ذلك الجزء من المركبة. الأشكال هنا رسم تعليمي للمسبار الحقيقي.",
        },
        points: [
          {
            id: "rtg",
            x: 22,
            y: 64,
            label: { en: "Radioisotope generators", ar: "المولدات النظائرية" },
            detail: {
              en: "Generators on a boom turned the heat of decaying plutonium into electricity. Far from the Sun this was the only way to power a spacecraft at all.",
              ar: "مولدات على ذراع بعيدة تحوّل حرارة البلوتونيوم المتحلل إلى كهرباء. فبعيداً عن الشمس كانت هذه الطريقة الوحيدة لتزويد المركبة بالطاقة أصلاً.",
            },
          },
          {
            id: "dish",
            x: 50,
            y: 30,
            label: { en: "Dish antenna", ar: "هوائي الطبق" },
            detail: {
              en: "The dish that held a narrow radio link to Earth while the spacecraft was millions of kilometres away, sending back the first close-up images of Saturn.",
              ar: "الطبق الذي حافظ على وصلة راديوية ضيقة مع الأرض بينما كانت المركبة على ملايين الكيلومترات، يُرسل أول صور قريبة لزحل.",
            },
          },
          {
            id: "camera",
            x: 78,
            y: 58,
            label: { en: "Imaging photopolarimeter", ar: "جهاز التصوير وقياس الاستقطاب" },
            detail: {
              en: "The camera that built images of Jupiter's poles and of Saturn's clouds and rings one scan line at a time.",
              ar: "الكاميرا التي بنت صور قطبي المشتري وسحب زحل وحلقاته، سطراً بعد سطر.",
            },
          },
          {
            id: "particles",
            x: 36,
            y: 24,
            label: { en: "Particle and field sensors", ar: "حسّاسات الجسيمات والمجالات" },
            detail: {
              en: "A magnetometer and particle detectors measured Jupiter's radiation belts and discovered the narrow F ring at Saturn.",
              ar: "مقياس مغناطيسية وكواشف جسيمات قاست أحزمة إشعاع المشتري واكتشفت حلقة إف الضيقة عند زحل.",
            },
          },
        ],
      },
      quiz: [
        {
          id: "p11-q1",
          prompt: {
            en: "What did Pioneer 11 use Jupiter for?",
            ar: "في أي شيء استخدمت بايونير 11 المشتري؟",
          },
          options: [
            {
              id: "a",
              label: {
                en: "A gravity assist to change course toward Saturn.",
                ar: "مساعدة جاذبية لتغيير مسارها نحو زحل.",
              },
            },
            {
              id: "b",
              label: {
                en: "A place to land and refuel.",
                ar: "مكاناً للهبوط والتزود بالوقود.",
              },
            },
            {
              id: "c",
              label: {
                en: "A target to orbit for several years.",
                ar: "هدفاً للطواف حوله عدة سنوات.",
              },
            },
          ],
          correctOptionId: "a",
          explanation: {
            en: "Pioneer 11 flew past Jupiter and used its gravity to redirect the spacecraft toward Saturn, a technique later used by Voyager and many other missions.",
            ar: "مرّت بايونير 11 بالمشتري واستخدمت جاذبيته لإعادة توجيه المركبة نحو زحل، وهي تقنية استخدمتها فوياجر ومهمات كثيرة لاحقة.",
          },
        },
      ],
    },
    {
      id: "mission",
      kind: "mission",
      eyebrow: { en: "Chapter two", ar: "الفصل الثاني" },
      title: { en: "Jupiter, Then Saturn", ar: "المشتري ثم زحل" },
      summary: {
        en: "A close pass through dangerous radiation, then a long cruise to the first close-up view of Saturn.",
        ar: "مرور قريب عبر إشعاع خطير، ثم رحلة طويلة إلى أول منظر قريب لزحل.",
      },
      narrative: {
        en: [
          "Pioneer 11 launched on 5 April 1973. It crossed the asteroid belt and reached Jupiter in December 1974, passing closer to the planet than Pioneer 10 had. The close pass gave it a stronger gravity assist, but it also exposed the spacecraft to more radiation.",
          "The encounter worked. Pioneer 11 measured Jupiter's magnetic field and radiation, imaged the planet's poles and then headed outward on a new path toward Saturn.",
          "It reached Saturn on 1 September 1979, passing within about 21,000 kilometres of the cloud tops. It crossed the plane of the rings and returned the first close-up images of Saturn, its rings and its moon Titan.",
        ],
        ar: [
          "انطلقت بايونير 11 في 5 أبريل 1973. وعبرت حزام الكويكبات ووصلت إلى المشتري في ديسمبر 1974، مارّة بالكوكب أقرب مما مرّت بايونير 10. ومنحها المرور القريب مساعدة جاذبية أقوى، لكنه عرضها أيضاً لإشعاع أكثر.",
          "ونجح اللقاء. فقاست بايونير 11 مجال المشتري المغناطيسي وإشعاعه، وصوّرت قطبي الكوكب، ثم انطلقت إلى الخارج في مسار جديد نحو زحل.",
          "ووصلت إلى زحل في 1 سبتمبر 1979، مارّة على مسافة نحو 21,000 كيلومتر من قمم السحب. وعبرت مستوى الحلقات وأعادت أول صور قريبة لزحل وحلقاته وقمره تيتان.",
        ],
      },
      echo: {
        en: "The closer you pass, the stronger the push — and the greater the danger.",
        ar: "كلما اقتربت من المرور، قويت الدفعة — وعظم الخطر.",
      },
      glossary: [
        {
          id: "gravity-assist",
          term: { en: "Gravity assist", ar: "مساعدة الجاذبية" },
          simple: {
            en: "Flying close to a planet to borrow a little of its speed. The spacecraft leaves on a new course and at a new speed, without burning any fuel.",
            ar: "المرور قرب كوكب لاستعارة قليل من سرعته. فتغادر المركبة في مسار جديد وبسرعة جديدة، دون حرق أي وقود.",
          },
          technical: {
            en: "The planet slows down in its orbit by a vanishingly small amount while the light spacecraft gains a large change in velocity.",
            ar: "يبطئ الكوكب في مداره مقداراً ضئيلاً لا يكاد يُذكر، بينما تكسب المركبة الخفيفة تغيّراً كبيراً في السرعة.",
          },
        },
        {
          id: "escape-trajectory",
          term: { en: "Escape trajectory", ar: "مسار الهروب" },
          simple: {
            en: "A path fast enough that the spacecraft will never fall back toward the Sun. Both Pioneers are on one now.",
            ar: "مسار بسرعة تكفي حتى لا تسقط المركبة أبداً نحو الشمس. والمركبتان في مسار كهذا الآن.",
          },
        },
        {
          id: "ring-plane",
          term: { en: "Ring plane", ar: "مستوى الحلقات" },
          simple: {
            en: "The thin flat disc where a planet's rings lie. Crossing it is one of the most dangerous moments of a Saturn mission, because of the particles in the way.",
            ar: "القرص الرقيق المسطّح الذي تقع فيه حلقات الكوكب. وعبوره من أخطر لحظات مهمة زحل، بسبب الجسيمات التي تعترض الطريق.",
          },
        },
      ],
    },
    {
      id: "journey",
      kind: "journey",
      eyebrow: { en: "Chapter three", ar: "الفصل الثالث" },
      title: { en: "The Journey", ar: "الرحلة" },
      summary: {
        en: "A launch behind its twin, a close steer past Jupiter, and five years of coasting to a first at Saturn.",
        ar: "إطلاق خلف توأمها، وانعطاف قرب المشتري، وخمس سنوات من الانجراف إلى أول لقاء بزحل.",
      },
      narrative: {
        en: [
          "Pioneer 11 left Earth in April 1973 on an Atlas-Centaur rocket, about a year behind its twin. It carried the same instruments and the same plaque, but a different plan: instead of simply flying past Jupiter and onward, it would use the giant planet as a steering wheel.",
          "The road out was familiar by then. Pioneer 10 had already crossed the asteroid belt and found it passable, so Pioneer 11 followed the same corridor through the dust, its detectors counting the grains. The confidence was earned, not assumed.",
          "At Jupiter in December 1974 the plan was tested at close range. Pioneer 11 passed closer to the planet than its twin had, threading the radiation belts to gain a stronger gravity assist. The encounter bent its path out of the plane of the planets and flung it toward Saturn.",
          "What followed was almost five years of coasting between two worlds. On 1 September 1979 Pioneer 11 swept within about 21,000 kilometres of Saturn's cloud tops, crossed the plane of the rings, and became the first spacecraft ever to visit the ringed planet. Then, with nothing left ahead of it, it kept going.",
        ],
        ar: [
          "غادرت بايونير 11 الأرض في أبريل 1973 على صاروخ أطلس–سنتور، متأخرة نحو عام عن توأمها. وحملت الأجهزة نفسها واللوحة نفسها، لكن بخطة مختلفة: فبدل أن تمرّ بالمشتري وتواصل إلى الخارج، ستستخدم الكوكب العملاق عجلة قيادة.",
          "وكان الطريق إلى الخارج مألوفاً حينها. فقد عبرت بايونير 10 حزام الكويكبات قبلها ووجدته قابلاً للعبور، فتبعتها بايونير 11 في الممر نفسه عبر الغبار، وعدّت كواشفها الحبيبات. كان الثقة مكتسبة لا مفترضة.",
          "عند المشتري في ديسمبر 1974 اختُبرت الخطة عن قرب. ومرّت بايونير 11 بالكوكب أقرب مما مرّت توأمها، تتنقل بين أحزمة الإشعاع لتكسب مساعدة جاذبية أقوى. وحني اللقاء مسارها خارج مستوى الكواكب وقذفها نحو زحل.",
          "وما تلا ذلك قرابة خمس سنوات من الانجراف بين عالمين. وفي 1 سبتمبر 1979 اجتاحت بايونير 11 على نحو 21,000 كيلومتر من قمم سحب زحل، وعبرت مستوى الحلقات، وصارت أول مركبة تزور الكوكب ذي الحلقات على الإطلاق. ثم، ولم يبقَ شيء أمامها، واصلت المسير.",
        ],
      },
      echo: {
        en: "One planet, borrowed once — and the spacecraft reached a world it could never have reached on its own fuel.",
        ar: "كوكب واحد، يُستعار مرة واحدة — فوصلت المركبة إلى عالم لم تكن لتصل إليه بوقودها وحدها.",
      },
      timeline: [
        {
          id: "p11-launch",
          date: "1973-04-05",
          dateLabel: { en: "5 April 1973", ar: "5 أبريل 1973" },
          label: { en: "Launch", ar: "الإطلاق" },
          description: {
            en: "Pioneer 11 launched on an Atlas-Centaur rocket from Cape Canaveral.",
            ar: "انطلقت بايونير 11 على صاروخ أطلس–سنتور من كيب كانافيرال.",
          },
          type: "launch",
          sourceIds: ["SRC-PIONEER-11", "SRC-NSSDCA-PIONEER-11"],
        },
        {
          id: "p11-jupiter",
          date: "1974-12-02",
          dateLabel: { en: "2 December 1974", ar: "2 ديسمبر 1974" },
          label: { en: "Jupiter flyby", ar: "التحليق قرب المشتري" },
          description: {
            en: "Pioneer 11 passed close to Jupiter and used its gravity to turn toward Saturn.",
            ar: "مرّت بايونير 11 قرب المشتري واستخدمت جاذبيته للانعطاف نحو زحل.",
          },
          type: "flyby",
          sourceIds: ["SRC-PIONEER-11", "SRC-NSSDCA-PIONEER-11"],
        },
        {
          id: "p11-saturn",
          date: "1979-09-01",
          dateLabel: { en: "1 September 1979", ar: "1 سبتمبر 1979" },
          label: { en: "Saturn flyby", ar: "التحليق قرب زحل" },
          description: {
            en: "Pioneer 11 became the first spacecraft to fly past Saturn and returned the first close-up images of the planet and its rings.",
            ar: "صارت بايونير 11 أول مركبة تحلّق قرب زحل وأعادت أول صور قريبة للكوكب وحلقاته.",
          },
          type: "flyby",
          sourceIds: ["SRC-PIONEER-11", "SRC-NSSDCA-PIONEER-11"],
        },
        {
          id: "p11-last",
          date: "1995-09-30",
          dateLabel: { en: "30 September 1995", ar: "30 سبتمبر 1995" },
          label: { en: "Last contact", ar: "آخر اتصال" },
          description: {
            en: "The spacecraft's power had faded too far, and NASA lost contact.",
            ar: "خبت طاقة المركبة كثيراً، ففقدت ناسا الاتصال بها.",
          },
          type: "last-contact",
          sourceIds: ["SRC-PIONEER-11", "SRC-NSSDCA-PIONEER-11"],
        },
      ],
      diagram: {
        kind: "journey-map",
        title: { en: "From Earth to Saturn", ar: "من الأرض إلى زحل" },
        intro: {
          en: "A launch, a steer past Jupiter, five years of coasting, and a first at Saturn.",
          ar: "إطلاق، وانعطاف قرب المشتري، وخمس سنوات من الانجراف، وأول لقاء بزحل.",
        },
        route: [
          {
            label: { en: "Launch", ar: "الإطلاق" },
            description: { en: "Cape Canaveral, April 1973", ar: "كيب كانافيرال، أبريل 1973" },
          },
          {
            label: { en: "Jupiter flyby", ar: "التحليق قرب المشتري" },
            description: {
              en: "Gravity assist, December 1974",
              ar: "مساعدة جاذبية، ديسمبر 1974",
            },
          },
          {
            label: { en: "Cruise", ar: "الرحلة البينية" },
            description: {
              en: "Almost five years toward Saturn",
              ar: "قرابة خمس سنوات نحو زحل",
            },
          },
          {
            label: { en: "Saturn flyby", ar: "التحليق قرب زحل" },
            description: {
              en: "First visit, 1 September 1979",
              ar: "أول زيارة، 1 سبتمبر 1979",
            },
          },
          {
            label: { en: "Outward", ar: "إلى الخارج" },
            description: {
              en: "Beyond the planets, last contact 1995",
              ar: "وراء الكواكب، آخر اتصال 1995",
            },
          },
        ],
        points: [
          {
            id: "earth",
            x: 10,
            y: 58,
            label: { en: "Earth", ar: "الأرض" },
            detail: { en: "Launch in April 1973.", ar: "الإطلاق في أبريل 1973." },
          },
          {
            id: "jupiter",
            x: 38,
            y: 76,
            label: { en: "Jupiter", ar: "المشتري" },
            detail: {
              en: "Close flyby in December 1974, and a gravity assist toward Saturn.",
              ar: "تحليق قريب في ديسمبر 1974، ومساعدة جاذبية نحو زحل.",
            },
          },
          {
            id: "saturn",
            x: 68,
            y: 38,
            label: { en: "Saturn", ar: "زحل" },
            detail: {
              en: "First spacecraft at Saturn, 1 September 1979.",
              ar: "أول مركبة عند زحل، 1 سبتمبر 1979.",
            },
          },
          {
            id: "outer",
            x: 92,
            y: 18,
            label: { en: "Deep space", ar: "الفضاء السحيق" },
            detail: {
              en: "Silent since 1995, coasting outward beyond the planets.",
              ar: "صامتة منذ 1995، تنجرف إلى الخارج وراء الكواكب.",
            },
          },
        ],
      },
    },
    {
      id: "discoveries",
      kind: "discoveries",
      eyebrow: { en: "Chapter four", ar: "الفصل الرابع" },
      title: { en: "What Pioneer 11 Found", ar: "ما الذي وجدته بايونير 11" },
      summary: {
        en: "A new ring, a powerful magnetic field and a first look at the poles of Jupiter.",
        ar: "حلقة جديدة ومجال مغناطيسي قوي وأول نظرة إلى قطبي المشتري.",
      },
      narrative: {
        en: [
          "Pioneer 11's close pass at Jupiter gave a different view from Pioneer 10. It imaged the polar regions and measured the planet's magnetic field from a new angle, which helped scientists understand how the field is generated.",
          "At Saturn, the spacecraft discovered a narrow ring — later called the F ring — and measured the planet's magnetic field and radiation environment. It also found that Saturn's moon Titan had a thick atmosphere, which made it an important target for later missions.",
          "The mission showed that a spacecraft could use one planet to reach another. That idea became the backbone of the Grand Tour, and of many missions since.",
        ],
        ar: [
          "منح المرور القريب لبايونير 11 عند المشتري منظراً مختلفاً عن بايونير 10. فقد صوّرت المناطق القطبية وقاست المجال المغناطيسي للكوكب من زاوية جديدة، مما ساعد العلماء على فهم كيفية توليد هذا المجال.",
          "وعند زحل، اكتشفت المركبة حلقة ضيقة سُميت لاحقاً حلقة إف، وقاست مجال الكوكب المغناطيسي وبيئته الإشعاعية. ووجدت أيضاً أن قمر زحل تيتان له غلاف جوي سميك، مما جعله هدفاً مهماً للمهمات اللاحقة.",
          "وأظهرت المهمة أن مركبة فضائية تستطيع استخدام كوكب للوصول إلى آخر. وقد صارت هذه الفكرة العمود الفقري للجولة الكبرى ولمهمات كثيرة بعدها.",
        ],
      },
      echo: {
        en: "The rings were not the only surprise. The route itself was the discovery.",
        ar: "لم تكن الحلقات المفاجأة الوحيدة. فالطريق نفسه كان الاكتشاف.",
      },
      discoveries: [
        {
          id: "p11-d1",
          title: { en: "A new ring at Saturn", ar: "حلقة جديدة عند زحل" },
          question: {
            en: "How many rings does Saturn have?",
            ar: "كم حلقة لزحل؟",
          },
          instrument: {
            en: "Pioneer 11 imaging and particle instruments",
            ar: "أجهزة تصوير وجسيمات في بايونير 11",
          },
          method: {
            en: "The spacecraft crossed the ring plane and measured the particles and light around Saturn during its flyby.",
            ar: "عبرت المركبة مستوى الحلقات وقاست الجسيمات والضوء حول زحل خلال تحليقها.",
          },
          data: {
            en: "A narrow, faint ring was detected outside the known bright rings, later named the F ring.",
            ar: "كُشفت حلقة ضيقة وخافتة خارج الحلقات الساطعة المعروفة، سُميت لاحقاً حلقة إف.",
          },
          finding: {
            en: "Saturn's ring system is more extended and more complex than it appeared from Earth.",
            ar: "نظام حلقات زحل أوسع وأعقد مما بدا من الأرض.",
          },
          significance: {
            en: "It set the stage for the detailed ring studies of Voyager and Cassini.",
            ar: "مهّد ذلك لدراسات الحلقات المفصلة في فوياجر وكاسيني.",
          },
          sourceIds: ["SRC-PIONEER-11", "SRC-NSSDCA-PIONEER-11"],
        },
        {
          id: "p11-d2",
          title: { en: "Titan has a thick atmosphere", ar: "لتيتان غلاف جوي سميك" },
          question: {
            en: "Does Saturn's largest moon have an atmosphere?",
            ar: "هل لقمر زحل الأكبر غلاف جوي؟",
          },
          instrument: {
            en: "Pioneer 11 radio and remote-sensing instruments",
            ar: "أجهزة راديوية واستشعار عن بعد في بايونير 11",
          },
          method: {
            en: "The spacecraft observed Titan during the Saturn encounter and measured how its atmosphere affected radio and light.",
            ar: "راقبت المركبة تيتان خلال لقاء زحل وقاست كيف أثّر غلافه الجوي في الموجات الراديوية والضوء.",
          },
          data: {
            en: "Titan was found to have a substantial atmosphere, hiding its surface from view.",
            ar: "تبيّن أن لتيتان غلافاً جوياً كبيراً يحجب سطحه عن النظر.",
          },
          finding: {
            en: "Titan is not a bare rock like many moons. It has a thick atmosphere and a complex chemistry.",
            ar: "تيتان ليس صخرة عارية كأقمار كثيرة، بل له غلاف جوي سميك وكيمياء معقدة.",
          },
          significance: {
            en: "It made Titan a priority target, eventually leading to the Huygens landing and the Cassini mission.",
            ar: "جعل ذلك تيتان هدفاً ذا أولوية، فأدى في النهاية إلى هبوط هويغنز ومهمة كاسيني.",
          },
          sourceIds: ["SRC-PIONEER-11"],
        },
      ],
    },
    {
      id: "ending",
      kind: "ending",
      eyebrow: { en: "Chapter five", ar: "الفصل الخامس" },
      title: { en: "The Long Silence", ar: "الصمت الطويل" },
      summary: {
        en: "Pioneer 11 kept working for sixteen years after Saturn, then faded beyond reach.",
        ar: "واصلت بايونير 11 العمل ست عشرة سنة بعد زحل، ثم خبت خارج المدى.",
      },
      narrative: {
        en: [
          "After Saturn, Pioneer 11 continued outward. Its radioisotope generators produced less power each year, and instruments were switched off one by one to keep the transmitter alive.",
          "The last contact came on 30 September 1995. The spacecraft is now on a passive trajectory, heading roughly toward the constellation Sagittarius. Its exact position is not tracked, but its path is known.",
          "Pioneer 11 is a different kind of legacy from a lander. It left no footprints and no parked hardware on a surface. It left a route: a demonstration that a spacecraft can use one world to reach another.",
        ],
        ar: [
          "بعد زحل، واصلت بايونير 11 المسير إلى الخارج. وكانت مولداتها النظائرية تنتج طاقة أقل كل عام، فأُوقفت الأجهزة واحداً بعد الآخر لإبقاء المرسل حياً.",
          "وجاء آخر اتصال في 30 سبتمبر 1995. والمركبة الآن في مسار سلبي، تتجه تقريباً نحو كوكبة القوس. ولا يجري تتبع موقعها الدقيق، لكن مسارها معروف.",
          "ولبايونير 11 إرث من نوع مختلف عن مركبة الهبوط. فلم تترك آثار أقدام ولا عتاداً متوقفاً على سطح، بل تركت طريقاً: برهاناً على أن مركبة فضائية تستطيع استخدام عالم للوصول إلى آخر.",
        ],
      },
      echo: {
        en: "It never landed anywhere. It changed how everyone after it travelled.",
        ar: "لم تهبط في أي مكان، لكنها غيّرت طريقة سفر كل من جاء بعدها.",
      },
      facts: [
        {
          label: { en: "Last contact", ar: "آخر اتصال" },
          value: { en: "30 September 1995", ar: "30 سبتمبر 1995" },
        },
        {
          label: { en: "Current state", ar: "الحالة الحالية" },
          value: { en: "Travelling outward", ar: "تسير إلى الخارج" },
        },
        {
          label: { en: "First at", ar: "الأولى عند" },
          value: { en: "Saturn", ar: "زحل" },
        },
        {
          label: { en: "Key technique", ar: "التقنية الأساسية" },
          value: { en: "Gravity assist", ar: "مساعدة الجاذبية" },
        },
      ],
    },
    {
      id: "legacy",
      kind: "legacy",
      eyebrow: { en: "Chapter six", ar: "الفصل السادس" },
      title: { en: "What Remains", ar: "ما الذي يبقى" },
      summary: {
        en: "A technique that became the standard way to travel, and two discoveries that pointed the missions that followed.",
        ar: "تقنية صارت الطريقة المعتمدة للسفر، واكتشافان وجّها المهمات التي تلت.",
      },
      narrative: {
        en: [
          "Pioneer 11's deepest legacy is a technique. It showed that a spacecraft could use one planet's gravity to reach another — and that idea became the backbone of the Grand Tour and of almost every outer-planet mission since. When a modern probe bends its path around a world and arrives years later at its target, it is travelling on a road Pioneer 11 opened.",
          "At Saturn it found two things that shaped everything after it. The narrow F ring told scientists the ring system was more complex than it looked from Earth. And Titan's thick atmosphere turned a distant moon into a destination — a target Voyager would measure, and the Huygens probe would land on in 2005.",
          "Pioneer 11 has been silent since September 1995 and it is still travelling outward, beyond the planets. It carries a copy of the Pioneer plaque too, so somewhere ahead of it goes the same message as its twin: a drawing of two people and a map pointing home.",
        ],
        ar: [
          "أعمق إرث لبايونير 11 هو تقنية. فقد أظهرت أن مركبة فضائية تستطيع استخدام جاذبية كوكب للوصول إلى كوكب آخر — وصارت هذه الفكرة العمود الفقري للجولة الكبرى ولكل مهمة تقريباً إلى الكواكب الخارجية بعدها. فحين تُنحي مركبة حديثة مسارها حول عالم وتصل بعد سنوات إلى هدفها، فهي تسير على طريق فتحته بايونير 11.",
          "وعند زحل وجدت شيئين شكّلا كل ما جاء بعدهما. فقد أخبرت الحلقة الضيقة حلقة إف العلماء بأن نظام الحلقات أعقد مما بدا من الأرض. وحوّل الغلاف الجوي السميك لتيتان قمراً بعيداً إلى وجهة — هدف قاسته فوياجر، وهبطت عليه مركبة هويغنز عام 2005.",
          "وبايونير 11 صامتة منذ سبتمبر 1995، وما زالت تسير إلى الخارج، وراء الكواكب. وتحمل نسخة من لوحة بايونير هي الأخرى، ففي مكان ما أمامها تسير الرسالة نفسها التي يحملها توأمها: رسمة لشخصين وخريطة تشير إلى الوطن.",
        ],
      },
      echo: {
        en: "It never landed anywhere. It changed how everyone after it travelled — and it is still travelling.",
        ar: "لم تهبط في أي مكان، لكنها غيّرت طريقة سفر كل من جاء بعدها — وما زالت تسير.",
      },
      facts: [
        {
          label: { en: "The technique", ar: "التقنية" },
          value: {
            en: "Gravity assist, now standard on outer-planet missions.",
            ar: "مساعدة الجاذبية، وهي اليوم معتمدة في مهمات الكواكب الخارجية.",
          },
        },
        {
          label: { en: "The discoveries", ar: "الاكتشافان" },
          value: {
            en: "Saturn's narrow F ring and the thick atmosphere of Titan.",
            ar: "حلقة إف الضيقة عند زحل والغلاف الجوي السميك لتيتان.",
          },
        },
        {
          label: { en: "Where it is now", ar: "أين هي الآن" },
          value: {
            en: "Travelling outward beyond the planets, silent since 1995.",
            ar: "تسير إلى الخارج وراء الكواكب، صامتة منذ 1995.",
          },
        },
      ],
    },
  ],
  legacyStatement: {
    en: "Pioneer 11 turned Jupiter into a slingshot and Saturn into a first close-up.",
    ar: "حوّلت بايونير 11 المشتري إلى مقلاع وزحل إلى أول منظر قريب.",
  },
  tags: ["deep-space", "instrument"],
  artifactId: "pioneer-11",
  sourceIds: ["SRC-PIONEER-11", "SRC-NSSDCA-PIONEER-11"],
  relatedStorySlugs: ["pioneer-10", "kepler"],
  echoIntro: {
    en: "This spacecraft used one planet to reach another. Come and see how gravity became a steering wheel.",
    ar: "استخدمت هذه المركبة كوكباً للوصول إلى آخر. تعال لترى كيف صارت الجاذبية عجلة قيادة.",
  },
  echoSignoff: {
    en: "Pioneer 11 is still out there, beyond Saturn, beyond the planets, still moving.",
    ar: "ما زالت بايونير 11 هناك، وراء زحل ووراء الكواكب، وما زالت تتحرك.",
  },
  lastVerified: "2026-11-14",
};
