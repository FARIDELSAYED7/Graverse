import type { EchoStory } from "@/types/echo";
import { echoImage } from "./media";

/**
 * PIONEER 10 — the first spacecraft to cross the asteroid belt and fly past
 * Jupiter, and one of the first human objects to head out of the solar system.
 *
 * Sources: the NASA Pioneer mission pages and the NSSDCA Pioneer 10 record.
 */
export const pioneer10Story: EchoStory = {
  id: "pioneer-10",
  slug: "pioneer-10",
  title: {
    en: "Pioneer 10",
    ar: "بايونير 10",
  },
  storyTitle: {
    en: "The First Way Out",
    ar: "الطريق الأول إلى الخارج",
  },
  dek: {
    en: "Pioneer 10 crossed the asteroid belt, flew past Jupiter and kept going. It is still travelling outward, carrying a message from Earth.",
    ar: "عبرت بايونير 10 حزام الكويكبات وحلّقت قرب المشتري وواصلت المسير. وما زالت تسير إلى الخارج حاملة رسالة من الأرض.",
  },
  summary: {
    en: "Pioneer 10 launched in 1972 and became the first spacecraft to cross the asteroid belt. In December 1973 it flew past Jupiter and returned the first close-up images of the giant planet. It then continued outward, measuring the solar wind and the outer heliosphere. NASA lost contact in January 2003, but the spacecraft is still moving away from the Sun.",
    ar: "انطلقت بايونير 10 في 1972 وصارت أول مركبة تعبر حزام الكويكبات. وفي ديسمبر 1973 حلّقت قرب المشتري وأعادت أول صور قريبة للكوكب العملاق. ثم واصلت المسير إلى الخارج، فقاست الريح الشمسية والغلاف الشمسي الخارجي. وفقدت ناسا الاتصال في يناير 2003، لكن المركبة ما زالت تبتعد عن الشمس.",
  },
  location: {
    en: "Deep space, beyond the planets",
    ar: "الفضاء السحيق، وراء الكواكب",
  },
  locationNote: {
    en: "Pioneer 10 is on an escape trajectory away from the Sun, in the direction of the constellation Taurus. Its exact position is not being tracked.",
    ar: "تسير بايونير 10 في مسار هروب بعيداً عن الشمس، باتجاه كوكبة الثور. ولا يجري تتبع موقعها الدقيق.",
  },
  equipmentType: {
    en: "Outer-planet flyby probe",
    ar: "مسبار تحليق قرب الكواكب الخارجية",
  },
  missionPeriod: {
    en: "Launch 2 March 1972 · Jupiter flyby 3 December 1973 · Last contact 23 January 2003",
    ar: "الإطلاق 2 مارس 1972 · التحليق قرب المشتري 3 ديسمبر 1973 · آخر اتصال 23 يناير 2003",
  },
  missionStatus: {
    en: "Mission complete — contact was lost in 2003, but the spacecraft continues outward.",
    ar: "اكتملت المهمة — فُقد الاتصال في 2003، لكن المركبة تواصل المسير إلى الخارج.",
  },
  hardwareStatus: {
    en: "No longer communicating — the last signal arrived in January 2003. It coasts outward on a passive trajectory toward the star Aldebaran.",
    ar: "لم تعد تتواصل — وصلت آخر إشارة في يناير 2003. وهي تنجرف إلى الخارج في مسار سلبي نحو نجم الدبران.",
  },
  statusKind: "traveling",
  accent: "#D9A441",
  accentSoft: "#F7E9C8",
  badge: {
    en: "Outward Bound",
    ar: "إلى الخارج",
  },
  badgeKey: "outward-bound",
  hero: echoImage("ARC-1973-AC73-4247", {
    alt: {
      en: "An artist's painting of Pioneer 10 passing Jupiter.",
      ar: "لوحة فنية لبايونير 10 وهي تمر قرب المشتري.",
    },
    caption: {
      en: "Pioneer 10 passing Jupiter, painted by Rick Guidice. The spacecraft returned the first close-up images of the planet in December 1973.",
      ar: "بايونير 10 تمر قرب المشتري، بريشة ريك غيدايس. أعادت المركبة أول صور قريبة للكوكب في ديسمبر 1973.",
    },
  }),
  gallery: [
    echoImage("ARC-1972-AC72-2135", {
      alt: {
        en: "The Pioneer 10 spacecraft being prepared at Cape Kennedy, with the Pioneer plaque visible.",
        ar: "مركبة بايونير 10 أثناء تجهيزها في كيب كنيدي، ولوحة بايونير ظاهرة.",
      },
      caption: {
        en: "Pioneer 10 being prepared for launch. The plaque on its side carries a diagram of humans and the position of Earth.",
        ar: "بايونير 10 أثناء تجهيزها للإطلاق. واللوحة على جانبها تحمل رسماً لبشر وموقع الأرض.",
      },
    }),
    echoImage("ARC-1974-AC73-9344", {
      alt: {
        en: "An artist's painting of Pioneer 10 crossing the asteroid belt.",
        ar: "لوحة فنية لبايونير 10 وهي تعبر حزام الكويكبات.",
      },
      caption: {
        en: "Pioneer 10 crossing the asteroid belt. No spacecraft had done it before, and engineers were not sure how dangerous the dust and rocks would be.",
        ar: "بايونير 10 تعبر حزام الكويكبات. لم تكن أي مركبة قد فعلت ذلك من قبل، ولم يكن المهندسون متأكدين من مدى خطورة الغبار والصخور.",
      },
    }),
  ],
  facts: [
    {
      label: { en: "Mass", ar: "الكتلة" },
      value: { en: "About 258 kg", ar: "نحو 258 كغ" },
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
      value: { en: "3 December 1973", ar: "3 ديسمبر 1973" },
    },
    {
      label: { en: "Closest approach", ar: "أقرب مسافة" },
      value: { en: "About 132,000 km from Jupiter", ar: "نحو 132,000 كم من المشتري" },
    },
    {
      label: { en: "Last contact", ar: "آخر اتصال" },
      value: { en: "23 January 2003", ar: "23 يناير 2003" },
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
      title: { en: "Meet the Pathfinder", ar: "تعرّف على الرائد" },
      summary: {
        en: "A small probe sent to answer a big question: can anything survive the trip to Jupiter?",
        ar: "مسبار صغير أُرسل للإجابة عن سؤال كبير: هل يستطيع أي شيء النجاة في الرحلة إلى المشتري؟",
      },
      narrative: {
        en: [
          "In the early 1970s, no spacecraft had ever crossed the asteroid belt. Engineers did not know whether the region was full of dangerous debris or mostly empty space. Pioneer 10 was sent to find out, and to become the first spacecraft to visit Jupiter.",
          "The probe was small compared with later planetary missions. It carried cameras, a magnetometer, particle detectors and radio equipment. It had no solar panels, because sunlight is too weak out there. Instead, it used radioisotope thermoelectric generators, which turn heat from decaying plutonium into electricity.",
          "Pioneer 10 also carried a gold-anodised aluminium plaque. It shows a man and a woman, a diagram of the solar system and a map of where the spacecraft came from. It is a message for anyone — or anything — that might find it long after we are gone.",
        ],
        ar: [
          "في أوائل السبعينيات، لم تكن أي مركبة فضائية قد عبرت حزام الكويكبات. ولم يكن المهندسون يعرفون هل المنطقة مليئة بالحطام الخطير أم أن معظمها فراغ. فأُرسلت بايونير 10 لتعرف، ولتصبح أول مركبة تزور المشتري.",
          "كان المسبار صغيراً مقارنة بمهمات الكواكب اللاحقة. وحمل كاميرات ومقياساً مغناطيسياً وكواشف جسيمات ومعدات راديوية. ولم تكن فيه ألواح شمسية لأن ضوء الشمس ضعيف جداً هناك، بل استخدم مولدات كهربائية حرارية نظائرية تحوّل حرارة البلوتونيوم المتحلل إلى كهرباء.",
          "وحملت بايونير 10 أيضاً لوحة من الألومنيوم المطلي بالذهب. تُظهر رجلاً وامرأة ورسماً للنظام الشمسي وخريطة لمصدر المركبة. إنها رسالة إلى أي شخص — أو أي شيء — قد يجدها بعد زمن طويل من رحيلنا.",
        ],
      },
      echo: {
        en: "Before you can go to the stars, you have to survive the neighbourhood.",
        ar: "قبل أن تذهب إلى النجوم، عليك أن تنجو من الجوار.",
      },
      facts: [
        {
          label: { en: "First", ar: "الأولى" },
          value: {
            en: "The first spacecraft to cross the asteroid belt.",
            ar: "أول مركبة تعبر حزام الكويكبات.",
          },
        },
        {
          label: { en: "Power", ar: "الطاقة" },
          value: {
            en: "Radioisotope generators, not solar panels.",
            ar: "مولدات نظائرية لا ألواح شمسية.",
          },
        },
        {
          label: { en: "Message", ar: "الرسالة" },
          value: {
            en: "A plaque showing humans and the location of Earth.",
            ar: "لوحة تُظهر بشراً وموقع الأرض.",
          },
        },
      ],
      diagram: {
        kind: "instrument-components",
        title: { en: "What Pioneer 10 carried", ar: "ما حملته بايونير 10" },
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
              en: "Four generators on a boom, turning the heat of decaying plutonium into electricity. No sunlight reaches a spacecraft out here, so this was the only way to keep it alive.",
              ar: "أربعة مولدات على ذراع بعيدة، تحوّل حرارة البلوتونيوم المتحلل إلى كهرباء. فضوء الشمس لا يصل إلى مركبة هناك، فكانت هذه الطريقة الوحيدة لإبقائها حيّة.",
            },
          },
          {
            id: "dish",
            x: 50,
            y: 30,
            label: { en: "Dish antenna", ar: "هوائي الطبق" },
            detail: {
              en: "A 2.7-metre dish that held a narrow radio link to Earth across billions of kilometres — a whisper that took hours to arrive.",
              ar: "طبق بقطر 2.7 متر يحافظ على وصلة راديوية ضيقة مع الأرض عبر مليارات الكيلومترات — همسة تستغرق ساعات لتصل.",
            },
          },
          {
            id: "instruments",
            x: 78,
            y: 58,
            label: { en: "Science instruments", ar: "الأجهزة العلمية" },
            detail: {
              en: "A magnetometer, particle detectors, a dust detector and an imaging photopolarimeter measured the belt, Jupiter's radiation and the solar wind.",
              ar: "مقياس مغناطيسية، وكواشف جسيمات، وكاشف غبار، وجهاز لتصوير الضوء وقياس استقطابه، قيست بها أحزمة الكويكبات وإشعاع المشتري والريح الشمسية.",
            },
          },
          {
            id: "plaque",
            x: 34,
            y: 22,
            label: { en: "The Pioneer plaque", ar: "لوحة بايونير" },
            detail: {
              en: "A gold-anodised plate showing two people, the solar system and a map pointing back to Earth — the first message designed for possible finders.",
              ar: "صفيحة مطلية بالذهب تُظهر شخصين، والنظام الشمسي، وخريطة تشير عودة إلى الأرض — أول رسالة صُممت لمن قد يجدها.",
            },
          },
        ],
      },
      quiz: [
        {
          id: "p10-q1",
          prompt: {
            en: "Why did Pioneer 10 use radioisotope generators instead of solar panels?",
            ar: "لماذا استخدمت بايونير 10 مولدات نظائرية بدل الألواح الشمسية؟",
          },
          options: [
            {
              id: "a",
              label: {
                en: "Sunlight is too weak far from the Sun.",
                ar: "لأن ضوء الشمس ضعيف جداً بعيداً عن الشمس.",
              },
            },
            {
              id: "b",
              label: {
                en: "Solar panels were too heavy.",
                ar: "لأن الألواح الشمسية كانت ثقيلة جداً.",
              },
            },
            {
              id: "c",
              label: {
                en: "Jupiter's gravity would break solar panels.",
                ar: "لأن جاذبية المشتري ستكسر الألواح الشمسية.",
              },
            },
          ],
          correctOptionId: "a",
          explanation: {
            en: "Solar power falls off quickly with distance. Beyond Mars, a spacecraft needs another source, and Pioneer 10 used the heat of decaying plutonium.",
            ar: "تضعف الطاقة الشمسية بسرعة مع المسافة. فوراء المريخ تحتاج المركبة مصدراً آخر، وقد استخدمت بايونير 10 حرارة البلوتونيوم المتحلل.",
          },
        },
      ],
    },
    {
      id: "mission",
      kind: "mission",
      eyebrow: { en: "Chapter two", ar: "الفصل الثاني" },
      title: { en: "Through the Belt to Jupiter", ar: "عبر الحزام إلى المشتري" },
      summary: {
        en: "A safe crossing, a historic flyby, and a journey that never stopped.",
        ar: "عبور آمن وتحليق تاريخي ورحلة لم تتوقف.",
      },
      narrative: {
        en: [
          "Pioneer 10 launched on 2 March 1972. It crossed the asteroid belt without being damaged, which was itself a major result: the belt was not the obstacle that some had feared.",
          "In December 1973 the spacecraft passed Jupiter at a distance of about 132,000 kilometres. It photographed the planet's clouds, measured its magnetic field and discovered that Jupiter's radiation belts were far more intense than expected.",
          "After Jupiter, Pioneer 10 kept going. It crossed the orbit of Saturn, then Uranus, then Neptune, measuring the solar wind and the boundary where the Sun's influence begins to fade. It became one of the first human-made objects to head out of the solar system.",
        ],
        ar: [
          "انطلقت بايونير 10 في 2 مارس 1972. وعبرت حزام الكويكبات دون أن تتضرر، وكان ذلك نفسه نتيجة كبرى: فالحزام لم يكن العائق الذي خشيه بعضهم.",
          "وفي ديسمبر 1973 مرّت المركبة بالمشتري على مسافة نحو 132,000 كيلومتر. وصوّرت سحب الكوكب وقاست مجاله المغناطيسي واكتشفت أن أحزمة إشعاعه أشد بكثير مما كان متوقعاً.",
          "وبعد المشتري، واصلت بايونير 10 المسير. فعبرت مدار زحل ثم أورانوس ثم نبتون، وقاست الريح الشمسية والحد الذي يبدأ عنده تأثير الشمس بالخبو. وصارت من أول الأجسام التي صنعها الإنسان وتتجه إلى خارج النظام الشمسي.",
        ],
      },
      echo: {
        en: "Jupiter was the destination. The journey out was the discovery.",
        ar: "كان المشتري الوجهة، أما الرحلة إلى الخارج فكانت الاكتشاف.",
      },
      glossary: [
        {
          id: "escape-trajectory",
          term: { en: "Escape trajectory", ar: "مسار الهروب" },
          simple: {
            en: "A path fast enough that the spacecraft will never fall back. Once Pioneer 10 passed Jupiter, nothing could pull it home.",
            ar: "مسار بسرعة تكفي حتى لا تعود المركبة أبداً. فبمجرد أن مرّت بايونير 10 بالمشتري، لم يعد شيء قادر على سحبها إلى الوطن.",
          },
          technical: {
            en: "The spacecraft travels faster than the escape velocity of the Sun at its distance, so its orbit is open and never closes.",
            ar: "تتحرك المركبة بسرعة تفوق سرعة الهروب من الشمس عند بعدها، فيكون مدارها مفتوحاً ولا يُغلق أبداً.",
          },
        },
        {
          id: "radioisotope-generator",
          term: { en: "Radioisotope generator", ar: "مولّد نظائري" },
          simple: {
            en: "A power source with no moving parts. It turns the heat released by decaying plutonium into electricity, year after year.",
            ar: "مصدر طاقة بلا أجزاء متحوّلة. يحوّل الحرارة المنبعثة من البلوتونيوم المتحلل إلى كهرباء، عاماً بعد عام.",
          },
          technical: {
            en: "Called an RTG, it works on the temperature difference between the hot plutonium and the cold of deep space.",
            ar: "يُعرف بـ RTG، ويعمل على فرق الحرارة بين البلوتونيوم الساخن وبرودة الفضاء السحيق.",
          },
        },
        {
          id: "solar-wind",
          term: { en: "Solar wind", ar: "الريح الشمسية" },
          simple: {
            en: "The stream of charged particles the Sun blows outward in every direction. Pioneer 10 measured it from the inner planets all the way out.",
            ar: "تدفّق من الجسيمات المشحونة تنفثه الشمس في كل اتجاه. قاستها بايونير 10 من الكواكب الداخلية حتى الأعماق.",
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
        en: "From a launch pad in Florida, through the asteroid belt, past Jupiter, and out toward the stars.",
        ar: "من منصة إطلاق في فلوريدا، عبر حزام الكويكبات، فالمشتري، ثم إلى الخارج نحو النجوم.",
      },
      narrative: {
        en: [
          "Pioneer 10 left Earth on 2 March 1972 on an Atlas-Centaur rocket, given enough speed to escape the Sun's grip entirely. No spacecraft had ever been aimed so fast at the outer solar system. For the first months the controllers simply checked the instruments and watched the solar wind thin out as the distance grew.",
          "Then came the crossing nobody had tried. Through 1972 and into 1973 the spacecraft passed through the asteroid belt, and its particle detectors counted the dust along the way. Nothing damaged it. The belt turned out to be mostly empty space — a fear dissolved by measurement.",
          "In December 1973 Jupiter filled the view. Pioneer 10 passed the giant planet at about 132,000 kilometres and returned the first close-up images of its cloud bands. Its instruments also read a radiation environment thousands of times fiercer than anything near Earth, a warning that every later Jupiter mission carried with it.",
          "Beyond Jupiter there was nothing left to visit. Pioneer 10 crossed the orbits of Saturn, Uranus and Neptune, still measuring the solar wind as the Sun's influence faded around it. Its radioisotope generators weakened year by year, and the last faint signal reached Earth in January 2003. The spacecraft is still moving outward, roughly toward the star Aldebaran.",
        ],
        ar: [
          "غادرت بايونير 10 الأرض في 2 مارس 1972 على صاروخ أطلس–سنتور، بسرعة تكفي للإفلات من قبضة الشمس تماماً. لم تُمنح أي مركبة من قبل تلك السرعة نحو النظام الشمسي الخارجي. وفي الأشهر الأولى اكتفى المراقبون بفحص الأجهزة ومراقبة الريح الشمسية وهي تخف كلما اتسع البُعد.",
          "ثم جاء العبور الذي لم يجرّبه أحد. ففي عام 1972 وما بعده من عام 1973 عبرت المركبة حزام الكويكبات، وكوّافت كواشف جسيماتها الغبار على طول الطريق. ولم يصبها أذى. تبيّن أن الحزام فراغ في معظمه — خوفٌ ذاب أمام القياس.",
          "وفي ديسمبر 1973 ملأ المشتري مجال الرؤية. ومرّت بايونير 10 بالكوكب العملاق على مسافة نحو 132,000 كيلومتر، وأعادت أول صور قريبة لأشرطة سحبه. وقرأت أجهزتها أيضاً بيئة إشعاعية أشد آلاف المرات مما هو معروف قرب الأرض، فكانت تحذيراً حملته كل مهمة لاحقة إلى المشتري.",
          "وراء المشتري لم يبقَ ما يُزار. عبرت بايونير 10 مدارات زحل وأورانوس ونبتون، وما زالت تقيس الريح الشمسية بينما يخفت تأثير الشمس حولها. وضاعت مولّداتها النظائرية عاماً بعد عام، حتى وصلت آخر إشارة خافتة إلى الأرض في يناير 2003. وما زالت المركبة تتحرك إلى الخارج، نحو نجم الدبران تقريباً.",
        ],
      },
      echo: {
        en: "Every milestone on this route was the first time anyone had ever done it. That is what being a pathfinder means.",
        ar: "كل محطة على هذا الطريق كانت أول مرة يفعلها أحد. هذا هو معنى أن تكون رائداً.",
      },
      timeline: [
        {
          id: "p10-launch",
          date: "1972-03-02",
          dateLabel: { en: "2 March 1972", ar: "2 مارس 1972" },
          label: { en: "Launch", ar: "الإطلاق" },
          description: {
            en: "Pioneer 10 launched on an Atlas-Centaur rocket from Cape Canaveral.",
            ar: "انطلقت بايونير 10 على صاروخ أطلس–سنتور من كيب كانافيرال.",
          },
          type: "launch",
          sourceIds: ["SRC-PIONEER-10", "SRC-NSSDCA-PIONEER-10"],
        },
        {
          id: "p10-jupiter",
          date: "1973-12-03",
          dateLabel: { en: "3 December 1973", ar: "3 ديسمبر 1973" },
          label: { en: "Jupiter flyby", ar: "التحليق قرب المشتري" },
          description: {
            en: "Pioneer 10 passed Jupiter and returned the first close-up images of the planet.",
            ar: "مرّت بايونير 10 بالمشتري وأعادت أول صور قريبة للكوكب.",
          },
          type: "flyby",
          sourceIds: ["SRC-PIONEER-10", "SRC-NSSDCA-PIONEER-10"],
        },
        {
          id: "p10-saturn",
          date: "1976-02-01",
          dateLabel: { en: "1976", ar: "1976" },
          label: { en: "Crossing Saturn's orbit", ar: "عبور مدار زحل" },
          description: {
            en: "The spacecraft continued outward and crossed the orbit of Saturn.",
            ar: "واصلت المركبة المسير إلى الخارج وعبرت مدار زحل.",
          },
          type: "milestone",
          sourceIds: ["SRC-PIONEER-10"],
        },
        {
          id: "p10-last",
          date: "2003-01-23",
          dateLabel: { en: "23 January 2003", ar: "23 يناير 2003" },
          label: { en: "Last contact", ar: "آخر اتصال" },
          description: {
            en: "The signal became too weak to detect, and NASA ended attempts to contact the spacecraft.",
            ar: "ضعفت الإشارة عن حدود الكشف، فأنهت ناسا محاولات التواصل مع المركبة.",
          },
          type: "last-contact",
          sourceIds: ["SRC-PIONEER-10", "SRC-NSSDCA-PIONEER-10"],
        },
      ],
      diagram: {
        kind: "journey-map",
        title: { en: "The road out of the solar system", ar: "الطريق إلى خارج النظام الشمسي" },
        intro: {
          en: "From a launch pad in Florida to the boundary where the Sun's influence fades.",
          ar: "من منصة إطلاق في فلوريدا إلى الحد الذي يخفت فيه تأثير الشمس.",
        },
        route: [
          {
            label: { en: "Launch", ar: "الإطلاق" },
            description: { en: "Cape Canaveral, 2 March 1972", ar: "كيب كانافيرال، 2 مارس 1972" },
          },
          {
            label: { en: "Asteroid belt", ar: "حزام الكويكبات" },
            description: {
              en: "The first crossing, 1972–1973",
              ar: "أول عبور، 1972–1973",
            },
          },
          {
            label: { en: "Jupiter flyby", ar: "التحليق قرب المشتري" },
            description: {
              en: "First close-up images, December 1973",
              ar: "أول صور قريبة، ديسمبر 1973",
            },
          },
          {
            label: { en: "Beyond the planets", ar: "وراء الكواكب" },
            description: {
              en: "Measuring the solar wind as it fades",
              ar: "قياس الريح الشمسية وهي تخفت",
            },
          },
          {
            label: { en: "Last signal", ar: "آخر إشارة" },
            description: {
              en: "January 2003, still moving outward",
              ar: "يناير 2003، وما زالت تتحرك إلى الخارج",
            },
          },
        ],
        points: [
          {
            id: "earth",
            x: 10,
            y: 60,
            label: { en: "Earth", ar: "الأرض" },
            detail: { en: "Launch on 2 March 1972.", ar: "الإطلاق في 2 مارس 1972." },
          },
          {
            id: "belt",
            x: 36,
            y: 76,
            label: { en: "Asteroid belt", ar: "حزام الكويكبات" },
            detail: {
              en: "Crossed unharmed in 1972–1973, the first spacecraft through.",
              ar: "عُبر دون أذى في 1972–1973، وهي أول مركبة تعبره.",
            },
          },
          {
            id: "jupiter",
            x: 64,
            y: 40,
            label: { en: "Jupiter", ar: "المشتري" },
            detail: {
              en: "Flyby in December 1973, about 132,000 kilometres from the cloud tops.",
              ar: "تحليق في ديسمبر 1973، على نحو 132,000 كيلومتر من قمم السحب.",
            },
          },
          {
            id: "outer",
            x: 90,
            y: 20,
            label: { en: "Deep space", ar: "الفضاء السحيق" },
            detail: {
              en: "On an escape trajectory, outward toward the star Aldebaran.",
              ar: "في مسار هروب، إلى الخارج نحو نجم الدبران.",
            },
          },
        ],
      },
    },
    {
      id: "discoveries",
      kind: "discoveries",
      eyebrow: { en: "Chapter four", ar: "الفصل الرابع" },
      title: { en: "What Pioneer 10 Found", ar: "ما الذي وجدته بايونير 10" },
      summary: {
        en: "A passable belt, a fierce radiation environment and a first look at the edge of the Sun's influence.",
        ar: "حزام قابل للعبور وبيئة إشعاعية عنيفة وأول نظرة إلى حدود تأثير الشمس.",
      },
      narrative: {
        en: [
          "Pioneer 10's Jupiter data changed the picture of the giant planet. Its radiation belts were far more intense than anyone had predicted, which affected the design of later missions such as Voyager.",
          "The spacecraft also measured the solar wind and cosmic rays along its path. Its instruments showed how the Sun's influence weakens with distance and gave scientists the first direct measurements of the outer heliosphere.",
          "The mission did not answer every question about Jupiter. It was a pathfinder, and its job was to show that the journey was possible and to identify the hazards for the spacecraft that would follow.",
        ],
        ar: [
          "غيّرت بيانات بايونير 10 عن المشتري صورة الكوكب العملاق. فقد كانت أحزمة إشعاعه أشد بكثير مما توقع أحد، وقد أثّر ذلك في تصميم مهمات لاحقة مثل فوياجر.",
          "وقاست المركبة أيضاً الريح الشمسية والأشعة الكونية على طول مسارها. وأظهرت أجهزتها كيف يضعف تأثير الشمس مع المسافة، ومنحت العلماء أول قياسات مباشرة للغلاف الشمسي الخارجي.",
          "ولم تجب المهمة عن كل سؤال حول المشتري. فقد كانت رائدة، وكان عملها إثبات أن الرحلة ممكنة وتحديد المخاطر للمركبات التي ستأتي.",
        ],
      },
      echo: {
        en: "The first spacecraft through a door does not describe the whole room. It makes sure the next one can enter.",
        ar: "أول مركبة تعبر باباً لا تصف الغرفة كلها، بل تضمن أن تستطيع التالية الدخول.",
      },
      discoveries: [
        {
          id: "p10-d1",
          title: { en: "The asteroid belt is passable", ar: "حزام الكويكبات قابل للعبور" },
          question: {
            en: "Could a spacecraft survive the asteroid belt?",
            ar: "هل تستطيع مركبة فضائية النجاة في حزام الكويكبات؟",
          },
          instrument: {
            en: "Pioneer 10's particle detectors and spacecraft housekeeping data",
            ar: "كواشف الجسيمات وبيانات أنظمة المركبة",
          },
          method: {
            en: "The spacecraft crossed the belt and its instruments monitored impacts, dust and the condition of its systems.",
            ar: "عبرت المركبة الحزام وراقبت أجهزتها الاصطدامات والغبار وحالة أنظمتها.",
          },
          data: {
            en: "No damaging impacts were recorded, and the spacecraft continued to operate normally.",
            ar: "لم تُسجل اصطدامات ضارة، وواصلت المركبة العمل بشكل طبيعي.",
          },
          finding: {
            en: "The asteroid belt is mostly empty space, and a spacecraft can cross it safely.",
            ar: "حزام الكويكبات فراغ في معظمه، وتستطيع المركبة عبوره بأمان.",
          },
          significance: {
            en: "It opened the outer solar system to exploration and made the Voyager missions possible.",
            ar: "فتح ذلك النظام الشمسي الخارجي للاستكشاف وجعل مهمات فوياجر ممكنة.",
          },
          sourceIds: ["SRC-PIONEER-10", "SRC-NSSDCA-PIONEER-10"],
        },
        {
          id: "p10-d2",
          title: { en: "Jupiter's fierce radiation", ar: "إشعاع المشتري العنيف" },
          question: {
            en: "How dangerous is the environment around Jupiter?",
            ar: "ما مدى خطورة البيئة حول المشتري؟",
          },
          instrument: {
            en: "Geiger tube telescope and other particle detectors",
            ar: "تلسكوب أنبوب جايغر وكواشف جسيمات أخرى",
          },
          method: {
            en: "The spacecraft measured charged particles as it approached and passed the planet.",
            ar: "قاست المركبة الجسيمات المشحونة عند اقترابها من الكوكب ومرورها به.",
          },
          data: {
            en: "The radiation belts were thousands of times more intense than the environment near Earth.",
            ar: "كانت أحزمة الإشعاع أشد آلاف المرات من البيئة قرب الأرض.",
          },
          finding: {
            en: "Jupiter has an enormous and powerful radiation environment that any spacecraft must be designed to survive.",
            ar: "للمشتري بيئة إشعاعية هائلة وقوية يجب أن تُصمم أي مركبة للنجاة منها.",
          },
          significance: {
            en: "It shaped the radiation-hardened designs of later Jupiter missions and showed where a spacecraft could safely fly.",
            ar: "شكّل ذلك تصاميم المهمات اللاحقة إلى المشتري المقاومة للإشعاع، وأظهر أين تستطيع المركبة التحليق بأمان.",
          },
          sourceIds: ["SRC-PIONEER-10", "SRC-NSSDCA-PIONEER-10"],
        },
      ],
    },
    {
      id: "ending",
      kind: "ending",
      eyebrow: { en: "Chapter five", ar: "الفصل الخامس" },
      title: { en: "Still Going", ar: "ما زالت تسير" },
      summary: {
        en: "The signal is gone. The spacecraft is not.",
        ar: "ذهبت الإشارة. أما المركبة فلم تذهب.",
      },
      narrative: {
        en: [
          "Pioneer 10's radioisotope generators produced less power every year. By 2003 the signal was too weak to detect, and NASA ended attempts to contact it. The last transmission was received on 23 January 2003.",
          "The spacecraft is still moving outward. It is not being tracked, and its exact position is uncertain, but its trajectory is known well enough to say roughly where it is going. In about two million years it will pass near the star Aldebaran, though it will not arrive in any meaningful sense.",
          "Pioneer 10 is a different kind of artifact from a rover on Mars or a lander on the Moon. It is not a place you can visit. It is a machine in motion, carrying a message and a record of the first time humans sent something out of the solar system.",
        ],
        ar: [
          "كانت مولدات بايونير 10 النظائرية تنتج طاقة أقل كل عام. وبحلول 2003 كانت الإشارة أضعف من أن تُكشف، فأنهت ناسا محاولات التواصل. واستُقبلت آخر إرسال في 23 يناير 2003.",
          "وما زالت المركبة تتحرك إلى الخارج. ولا يجري تتبعها، وموقعها الدقيق غير مؤكد، لكن مسارها معروف بما يكفي لتقدير وجهتها تقريباً. وبعد نحو مليوني سنة ستمر قرب النجم الدبران، وإن كانت لن تصل إليه بمعنى مفهوم.",
          "بايونير 10 أثر من نوع مختلف عن عربة على المريخ أو مركبة هبوط على القمر. فهي ليست مكاناً يمكن زيارته، بل آلة في حركة، تحمل رسالة وسجلاً لأول مرة يرسل فيها البشر شيئاً إلى خارج النظام الشمسي.",
        ],
      },
      echo: {
        en: "It left the solar system with a drawing of two people and a map home.",
        ar: "غادرت النظام الشمسي برسم لشخصين وخريطة للعودة إلى الوطن.",
      },
      facts: [
        {
          label: { en: "Last contact", ar: "آخر اتصال" },
          value: { en: "23 January 2003", ar: "23 يناير 2003" },
        },
        {
          label: { en: "Current state", ar: "الحالة الحالية" },
          value: { en: "Travelling outward", ar: "تسير إلى الخارج" },
        },
        {
          label: { en: "Destination", ar: "الوجهة" },
          value: {
            en: "Toward the constellation Taurus",
            ar: "باتجاه كوكبة الثور",
          },
        },
        {
          label: { en: "Carried", ar: "حملت" },
          value: { en: "A plaque with a message from Earth", ar: "لوحة تحمل رسالة من الأرض" },
        },
      ],
    },
    {
      id: "legacy",
      kind: "legacy",
      eyebrow: { en: "Chapter six", ar: "الفصل السادس" },
      title: { en: "What Remains", ar: "ما الذي يبقى" },
      summary: {
        en: "A road proved to exist, and the first message ever designed for a stranger.",
        ar: "طريق أُثبت وجوده، وأول رسالة صُممت على الإطلاق لغريب.",
      },
      narrative: {
        en: [
          "Pioneer 10's route was the first of its kind: the first crossing of the asteroid belt, the first close look at Jupiter, the first human object on a path out of the solar system. Every outer-planet mission that followed — Pioneer 11, the Voyagers, Galileo, Cassini — flew over a road that Pioneer 10 proved existed.",
          "It also carried the Pioneer plaque: a drawing on a gold-anodised plate showing two people, the solar system, and a map pointing back toward the Sun. It was the first message human beings designed for whoever might find it. It cost almost nothing, and it said something no machine had ever said before: we were here, and this is where we came from.",
          "The spacecraft is silent now and its power is long spent, but it is still moving — outward, roughly toward the star Aldebaran, with the plaque still fixed to its side. Nothing humans have built has ever travelled further from home on purpose.",
        ],
        ar: [
          "كان طريق بايونير 10 الأول من نوعه: أول عبور لحزام الكويكبات، وأول نظرة قريبة إلى المشتري، وأول جسم بشري يسلك مساراً إلى خارج النظام الشمسي. وكل مهمة إلى الكواكب الخارجية جاءت بعدها — بايونير 11، وفوياجر، وغاليليو، وكاسيني — عبرت طريقاً أثبتت بايونير 10 وجوده.",
          "كما حملت لوحة بايونير: رسمة على صفيحة مطلية بالذهب تُظهر شخصين، والنظام الشمسي، وخريطة تشير عودة نحو الشمس. إنها أول رسالة صمّمها البشر لمن قد يجدها. وكلفتها زهيداً تقريباً، لكنها قالت شيئاً لم تقله آلة من قبل: كنا هنا، وهذا من أين جئنا.",
          "المركبة صامتة الآن وطاقتها نفدت منذ زمن، لكنها ما زالت تتحرك — إلى الخارج، نحو نجم الدبران تقريباً، واللوحة لا تزال مثبتة على جانبها. لم يقطع أي شيء صنعه البشر عن قصد مسافة أبعد عن الوطن.",
        ],
      },
      echo: {
        en: "A machine that left home carrying a drawing of us. Wherever it goes now, that drawing goes with it.",
        ar: "آلة غادرت الوطن حاملة رسمة لنا. وأينما ذهبت الآن، تذهب تلك الرسمة معها.",
      },
      facts: [
        {
          label: { en: "The message", ar: "الرسالة" },
          value: {
            en: "The Pioneer plaque — designed for possible finders.",
            ar: "لوحة بايونير — صُممت لمن قد يجدها.",
          },
        },
        {
          label: { en: "Where it is now", ar: "أين هي الآن" },
          value: {
            en: "Beyond the planets, on an escape trajectory.",
            ar: "وراء الكواكب، في مسار هروب.",
          },
        },
        {
          label: { en: "Last signal", ar: "آخر إشارة" },
          value: { en: "January 2003", ar: "يناير 2003" },
        },
      ],
    },
  ],
  legacyStatement: {
    en: "Pioneer 10 was the first machine to leave the solar system, and it is still leaving.",
    ar: "كانت بايونير 10 أول آلة تغادر النظام الشمسي، وما زالت تغادره.",
  },
  tags: ["deep-space", "instrument"],
  artifactId: "pioneer-10",
  sourceIds: ["SRC-PIONEER-10", "SRC-NSSDCA-PIONEER-10"],
  relatedStorySlugs: ["pioneer-11", "near-shoemaker"],
  echoIntro: {
    en: "This spacecraft crossed the asteroid belt, flew past Jupiter and never came back. Come and follow it out.",
    ar: "عبرت هذه المركبة حزام الكويكبات وحلّقت قرب المشتري ولم تعد. تعال لتتبعها إلى الخارج.",
  },
  echoSignoff: {
    en: "Pioneer 10 is still out there, moving away from the Sun with a message on its side.",
    ar: "ما زالت بايونير 10 هناك، تبتعد عن الشمس ورسالة على جانبها.",
  },
  lastVerified: "2026-11-14",
};
