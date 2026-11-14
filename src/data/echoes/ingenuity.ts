import type { EchoStory } from "@/types/echo";
import { echoImage } from "./media";

/**
 * INGENUITY — the first aircraft to fly on another planet.
 *
 * Sources: the NASA Ingenuity mission page and the NSSDCA Mars 2020 record.
 */
export const ingenuityStory: EchoStory = {
  id: "ingenuity",
  slug: "ingenuity",
  title: {
    en: "Ingenuity",
    ar: "إنجينويتي",
  },
  storyTitle: {
    en: "The First Flight on Another World",
    ar: "أول تحليق على عالم آخر",
  },
  dek: {
    en: "A helicopter the size of a tissue box was packed under a rover and sent to Mars to answer one question: can anything fly there?",
    ar: "مروحية بحجم علبة مناديل وُضعت تحت عربة وأُرسلت إلى المريخ للإجابة عن سؤال واحد: هل يستطيع أي شيء التحليق هناك؟",
  },
  summary: {
    en: "Ingenuity travelled to Mars attached to the belly of the Perseverance rover. In April 2021 it made the first powered, controlled flight on another planet. What began as a short technology demonstration became 72 flights, including aerial scouting for the rover. In January 2024, damage to its rotor blades ended flight operations.",
    ar: "سافرت إنجينويتي إلى المريخ مثبتة تحت بطن عربة بيرسيفيرانس. وفي أبريل 2021 حققت أول تحليق مُدار بالطاقة على عالم آخر. وما بدأ عرضاً تقنياً قصيراً صار 72 تحليقاً، شملت استطلاعاً جوياً للعربة. وفي يناير 2024 أنهى تلف في شفرات دوّارها عمليات التحليق.",
  },
  location: {
    en: "Jezero Crater, Mars",
    ar: "فوهة جيزيرو، المريخ",
  },
  locationNote: {
    en: "Ingenuity operated in Jezero Crater, the same region explored by Perseverance. It flew from a series of small airfields and later scouted routes toward the crater's ancient river delta.",
    ar: "عملت إنجينويتي في فوهة جيزيرو، وهي المنطقة نفسها التي استكشفتها بيرسيفيرانس. وحلّقت من سلسلة مهابط صغيرة، ثم استطلعت مسارات نحو دلتا النهر القديمة في الفوهة.",
  },
  equipmentType: {
    en: "Solar-powered Mars helicopter",
    ar: "مروحية مريخية تعمل بالطاقة الشمسية",
  },
  missionPeriod: {
    en: "Launch 30 July 2020 · Landing 18 February 2021 · First flight 19 April 2021 · Final flight 18 January 2024",
    ar: "الإطلاق 30 يوليو 2020 · الهبوط 18 فبراير 2021 · أول تحليق 19 أبريل 2021 · آخر تحليق 18 يناير 2024",
  },
  missionStatus: {
    en: "Mission complete — NASA ended flight operations in January 2024 after rotor damage.",
    ar: "اكتملت المهمة — أنهت ناسا عمليات التحليق في يناير 2024 بعد تلف الدوّار.",
  },
  hardwareStatus: {
    en: "Inactive — Ingenuity remains in Jezero Crater and is not expected to fly again.",
    ar: "غير نشطة — ما زالت إنجينويتي في فوهة جيزيرو ولا يُتوقع أن تحلّق مجدداً.",
  },
  statusKind: "silent",
  accent: "#E07A5F",
  accentSoft: "#F8DDD5",
  badge: {
    en: "First Flight",
    ar: "أول تحليق",
  },
  badgeKey: "first-flight",
  hero: echoImage("PIA24550", {
    alt: {
      en: "An image of NASA's Ingenuity helicopter on Mars after its first flight, captured by the Perseverance rover.",
      ar: "صورة لمروحية ناسا إنجينويتي على المريخ بعد أول تحليق لها، التقطتها عربة بيرسيفيرانس.",
    },
    caption: {
      en: "Ingenuity after its first flight on 19 April 2021, photographed by Perseverance. It was the first powered, controlled flight on another planet.",
      ar: "إنجينويتي بعد أول تحليق لها في 19 أبريل 2021، كما صوّرتها بيرسيفيرانس. كان ذلك أول تحليق مُدار بالطاقة على عالم آخر.",
    },
  }),
  gallery: [
    echoImage("PIA23882", {
      alt: {
        en: "The flight model of NASA's Ingenuity Mars Helicopter.",
        ar: "نموذج الطيران لمروحية ناسا إنجينويتي المريخية.",
      },
      caption: {
        en: "The Ingenuity flight model. Its two counter-rotating rotors had to spin much faster than a helicopter's on Earth.",
        ar: "نموذج طيران إنجينويتي. كان على دوّاريها المتعاكسين أن يدورا أسرع بكثير من دوّار مروحية على الأرض.",
      },
    }),
    echoImage("PIA24594", {
      alt: {
        en: "A navigation camera image of Ingenuity taking off during its second flight.",
        ar: "صورة من كاميرا الملاحة تُظهر إنجينويتي أثناء إقلاعها في تحليقها الثاني.",
      },
      caption: {
        en: "Ingenuity lifting off on its second flight. The helicopter kicked up little dust, which helped the team understand how it interacted with the surface.",
        ar: "إنجينويتي تقلع في تحليقها الثاني. أثارت المروحية غباراً قليلاً، مما ساعد الفريق على فهم تفاعلها مع السطح.",
      },
    }),
    echoImage("PIA25080", {
      alt: {
        en: "An overhead map showing the routes Ingenuity could take toward the delta in Jezero Crater.",
        ar: "خريطة علوية تُظهر المسارات التي يمكن أن تسلكها إنجينويتي نحو الدلتا في فوهة جيزيرو.",
      },
      caption: {
        en: "Planned flight routes toward Jezero Crater's delta. What began as a five-flight demonstration became an operational scout.",
        ar: "مسارات تحليق مخططة نحو دلتا فوهة جيزيرو. وما بدأ عرضاً من خمس رحلات صار استطلاعاً عملياتياً.",
      },
    }),
  ],
  facts: [
    {
      label: { en: "Mass", ar: "الكتلة" },
      value: { en: "About 1.8 kg", ar: "نحو 1.8 كغ" },
    },
    {
      label: { en: "Rotor diameter", ar: "قطر الدوّار" },
      value: { en: "About 1.2 m", ar: "نحو 1.2 م" },
    },
    {
      label: { en: "Power", ar: "الطاقة" },
      value: { en: "Solar array and rechargeable batteries", ar: "لوح شمسي وبطاريات قابلة للشحن" },
    },
    {
      label: { en: "Flights completed", ar: "التحليقات المنجزة" },
      value: { en: "72", ar: "72" },
    },
    {
      label: { en: "First flight", ar: "أول تحليق" },
      value: { en: "19 April 2021", ar: "19 أبريل 2021" },
    },
    {
      label: { en: "Final flight", ar: "آخر تحليق" },
      value: { en: "18 January 2024", ar: "18 يناير 2024" },
    },
  ],
  chapters: [
    {
      id: "meet",
      kind: "meet",
      eyebrow: { en: "Chapter one", ar: "الفصل الأول" },
      title: { en: "Meet the Stowaway", ar: "تعرّف على المسافرة الخفية" },
      summary: {
        en: "A tiny helicopter that rode to Mars under a rover and had to teach itself to fly in a thin atmosphere.",
        ar: "مروحية صغيرة سافرت إلى المريخ تحت عربة، وكان عليها أن تتعلم الطيران في غلاف جوي رقيق.",
      },
      narrative: {
        en: [
          "Flying on Mars is hard. The planet's gravity is about one third of Earth's, which helps, but its atmosphere is only about one percent as dense. A helicopter has very little air to push against, so its rotors must spin much faster than they would on Earth.",
          "Ingenuity was built to test whether controlled flight was possible at all. It was small and light, with two counter-rotating rotors, a solar array and a set of cameras. It travelled to Mars folded under the belly of the Perseverance rover.",
          "The plan was modest: up to five flights in about a month. The helicopter was a technology demonstration, not a science mission. If it worked, it would change what engineers thought was possible.",
        ],
        ar: [
          "الطيران على المريخ صعب. فجاذبية الكوكب نحو ثلث جاذبية الأرض، وهذا يساعد، لكن غلافه الجوي لا تتجاوز كثافته واحداً بالمئة من كثافة غلاف الأرض. ولذلك يجد الدوّار هواءً قليلاً جداً يدفع ضده، فعليه أن يدور أسرع بكثير مما يدور على الأرض.",
          "صُنعت إنجينويتي لاختبار إمكان الطيران المُدار أصلاً. وكانت صغيرة وخفيفة، بدوّارين متعاكسين ولوح شمسي ومجموعة كاميرات. وسافرت إلى المريخ مطوية تحت بطن عربة بيرسيفيرانس.",
          "كانت الخطة متواضعة: حتى خمسة تحليقات في نحو شهر. فكانت المروحية عرضاً تقنياً لا مهمة علمية. وإن نجحت، فستغير ما كان المهندسون يظنونه ممكناً.",
        ],
      },
      echo: {
        en: "There is almost no air to fly in. That is exactly why the attempt mattered.",
        ar: "لا يوجد هواء تقريباً للطيران فيه. ولهذا بالضبط كان لل محاولة أهمية.",
      },
      facts: [
        {
          label: { en: "Atmosphere", ar: "الغلاف الجوي" },
          value: {
            en: "About one percent as dense as Earth's",
            ar: "نحو واحد بالمئة من كثافة غلاف الأرض",
          },
        },
        {
          label: { en: "Rotors", ar: "الدوّارات" },
          value: {
            en: "Two counter-rotating rotors",
            ar: "دوّاران متعاكسان",
          },
        },
        {
          label: { en: "Original plan", ar: "الخطة الأصلية" },
          value: { en: "Up to five flights", ar: "حتى خمسة تحليقات" },
        },
      ],
      diagram: {
        kind: "small-rover-components",
        title: { en: "What the little helicopter is made of", ar: "مكوّنات المروحية الصغيرة" },
        intro: {
          en: "Select a marker to see what that part does. The shapes here are a teaching diagram of the real helicopter.",
          ar: "اختر أي علامة لترى وظيفة ذلك الجزء. الأشكال هنا رسم تعليمي للمروحية الحقيقية.",
        },
        points: [
          {
            id: "rotors",
            x: 50,
            y: 18,
            label: { en: "Counter-rotating rotors", ar: "الدوّاران المتعاكسان" },
            detail: {
              en: "Two stacked blades 1.2 metres across, spinning in opposite directions and much faster than they ever would on Earth.",
              ar: "شفرتان متراصّتان يمتدّان 1.2 متر، تدوران في اتجاهين متعاكسين وأسرع بكثير مما تدوران على الأرض.",
            },
          },
          {
            id: "solar",
            x: 50,
            y: 42,
            label: { en: "Solar panel", ar: "اللوح الشمسي" },
            detail: {
              en: "It sits above the rotors and charges the batteries that pay for every flight.",
              ar: "يقع فوق الدوّارين ويشحن البطاريات التي تدفع ثمن كل تحليق.",
            },
          },
          {
            id: "cameras",
            x: 28,
            y: 62,
            label: { en: "Cameras", ar: "الكاميرات" },
            detail: {
              en: "A navigation camera for the flight itself and colour cameras for the terrain it scouts below.",
              ar: "كاميرا ملاحة للطيران نفسه، وكاميرات ألوان للتضاريس التي تستطلعها في الأسفل.",
            },
          },
          {
            id: "battery",
            x: 74,
            y: 68,
            label: { en: "Battery", ar: "البطارية" },
            detail: {
              en: "Rechargeable batteries carry the helicopter through the cold Martian night and back into the air.",
              ar: "بطاريات قابلة لإعادة الشحن تعبر بالمروحية الليل المريخي البارد وتعيدها إلى الجو.",
            },
          },
        ],
      },
      quiz: [
        {
          id: "ing-q1",
          prompt: {
            en: "Why do Ingenuity's rotors have to spin so fast?",
            ar: "لماذا يجب أن تدور دوّارات إنجينويتي بهذه السرعة؟",
          },
          options: [
            {
              id: "a",
              label: {
                en: "The Martian atmosphere is very thin, so there is little air to push against.",
                ar: "لأن غلاف المريخ الجوي رقيق جداً، فلا يوجد هواء كثير تدفع ضده.",
              },
            },
            {
              id: "b",
              label: {
                en: "Mars has stronger gravity than Earth.",
                ar: "لأن جاذبية المريخ أقوى من جاذبية الأرض.",
              },
            },
            {
              id: "c",
              label: {
                en: "The helicopter is much heavier than it looks.",
                ar: "لأن المروحية أثقل بكثير مما تبدو.",
              },
            },
          ],
          correctOptionId: "a",
          explanation: {
            en: "Mars' atmosphere is about one percent as dense as Earth's. Fast rotors move enough air to generate lift in those conditions.",
            ar: "كثافة غلاف المريخ نحو واحد بالمئة من كثافة غلاف الأرض. والدوّارات السريعة تحرك هواءً كافياً لتوليد قوة رفع في تلك الظروف.",
          },
        },
      ],
    },
    {
      id: "mission",
      kind: "mission",
      eyebrow: { en: "Chapter two", ar: "الفصل الثاني" },
      title: { en: "Seventy-Two Flights", ar: "اثنان وسبعون تحليقاً" },
      summary: {
        en: "What was meant to be a month of tests became nearly three years of flying.",
        ar: "ما كان مقرراً أن يكون شهراً من الاختبارات صار نحو ثلاث سنوات من الطيران.",
      },
      narrative: {
        en: [
          "Ingenuity landed with Perseverance in February 2021 and was lowered to the surface in early April. Its first flight took place on 19 April 2021. The helicopter rose about three metres, hovered, turned and landed. It was the first powered, controlled flight on another planet.",
          "The team planned a few more flights, then handed the helicopter an operational role. It flew ahead of Perseverance, photographed the terrain and helped planners choose routes. It survived dust, cold and the limits of its solar-charged battery.",
          "The 72nd and final flight took place on 18 January 2024. During that flight the helicopter's rotor blades were damaged, probably by hitting the ground on landing. The team could still communicate with it, but it could no longer fly.",
        ],
        ar: [
          "هبطت إنجينويتي مع بيرسيفيرانس في فبراير 2021 وأُنزلت إلى السطح في أوائل أبريل. وجرى أول تحليق لها في 19 أبريل 2021. فارتفعت المروحية نحو ثلاثة أمتار وحلّقت في مكانها واستدارت وهبطت. وكان ذلك أول تحليق مُدار بالطاقة على عالم آخر.",
          "خطط الفريق لعدد قليل من التحليقات الإضافية، ثم أعطى المروحية دوراً عملياتياً. فكانت تحلّق أمام بيرسيفيرانس وتصوّر التضاريس وتساعد المخططين على اختيار المسارات. ونجت من الغبار والبرد وحدود بطاريتها المشحونة شمسياً.",
          "وجرى التحليق الثاني والسبعون والأخير في 18 يناير 2024. وخلاله تلفت شفرات دوّار المروحية، ربما بسبب اصطدامها بالأرض عند الهبوط. واستطاع الفريق التواصل معها، لكنها لم تعد قادرة على الطيران.",
        ],
      },
      echo: {
        en: "The demonstration did not stay a demonstration. It went to work.",
        ar: "لم يبقَ العرض التقني عرضاً، بل ذهب إلى العمل.",
      },
      glossary: [
        {
          id: "rotor",
          term: { en: "Rotor", ar: "الدوّار" },
          simple: {
            en: "The spinning blades that push air down so the aircraft rises.",
            ar: "الشفرات الدوّارة التي تدفع الهواء إلى الأسفل فترتفع الطائرة.",
          },
        },
        {
          id: "lift",
          term: { en: "Lift", ar: "قوة الرفع" },
          simple: {
            en: "The upward force that holds an aircraft in the air. On Mars the air is thin, so making lift takes very fast blades.",
            ar: "القوة الصاعدة التي تُبقي الطائرة في الهواء. وعلى المريخ الهواء رقيق، فلا بدّ من شفرات سريعة جداً لتوليد الرفع.",
          },
        },
        {
          id: "counter-rotors",
          term: { en: "Counter-rotating rotors", ar: "دوّارات متعاكسا الدوران" },
          simple: {
            en: "Two rotors stacked one above the other, turning in opposite directions, so their twisting effects cancel and the helicopter stays steady.",
            ar: "دوّاران فوق بعضهما يدوران في اتجاهين متعاكسين، فيتعادل أثر التواءهما وتبقى المروحية مستقرة.",
          },
        },
      ],
    },
    {
      id: "journey",
      kind: "journey",
      eyebrow: { en: "Chapter three", ar: "الفصل الثالث" },
      title: { en: "The Journey to Flight", ar: "الرحلة إلى الطيران" },
      summary: {
        en: "From a launch pad on Earth to a hover three metres above the surface of Mars.",
        ar: "من منصة إطلاق على الأرض إلى تحويم على ارتفاع ثلاثة أمتار فوق سطح المريخ.",
      },
      narrative: {
        en: [
          "Ingenuity left Earth on 30 July 2020, bolted beneath the belly of the Perseverance rover on an Atlas V rocket. For about seven months it did nothing at all but travel, folded up, through the cold between two planets.",
          "The landing on 18 February 2021 was the rover's problem, not the helicopter's. Perseverance survived the descent and set down in Jezero Crater with Ingenuity still folded underneath. In early April the rover dropped the debris shield, unfolded the helicopter, stood it upright and lowered it the last few centimetres to the ground.",
          "On 19 April 2021 Ingenuity spun its counter-rotating blades, rose about three metres, hovered for 39.1 seconds, turned and landed. It was the first powered, controlled flight on another planet, and NASA named the spot Wright Brothers Field.",
          "Then it did it again. Seventy-two times the helicopter lifted off, covering about 17 kilometres in all, scouting routes and photographing terrain for the rover below. The first flight lasted under a minute; the last came nearly three years later.",
        ],
        ar: [
          "غادرت إنجينويتي الأرض في 30 يوليو 2020، مثبّتة تحت بطن عربة بيرسيفيرانس على صاروخ أطلس 5. ولم تفعل طوال نحو سبعة أشهر شيئاً سوى السفر، مطوية، في البرد بين كوكبين.",
          "كان الهبوط في 18 فبراير 2021 شأن العربة لا شأن المروحية. نجت بيرسيفيرانس من النزول وهبطت في فوهة جيزيرو وإنجينويتي ما تزال مطوية تحتها. وفي أوائل أبريل أسقطت العربة درع الحطام، وفُرِّدت المروحية، وأُقيمت قائمة، وأنزلتها العربة آخر بضعة سنتيمترات إلى الأرض.",
          "وفي 19 أبريل 2021 أدارت إنجينويتي شفرتَي دوّارها المتعاكسين، وارتفعت نحو ثلاثة أمتار، وتحوّمت 39.1 ثانية، واستدارت وهبطت. وكان ذلك أول تحليق مُدار بالطاقة على عالم آخر، وأطلقت ناسا على المكان اسم «ميدان الأخوين رايت».",
          "ثم فعلتها مجدداً. اثنتان وسبعون مرة أقلعت فيها المروحية، قاطعة نحو 17 كيلومتراً في المجموع، تستطلع المسارات وتصوّر التضاريس للعربة في الأسفل. استغرق التحليق الأول أقل من دقيقة، وجاء الأخير بعد قرابة ثلاث سنوات.",
        ],
      },
      echo: {
        en: "The Wright brothers flew for twelve seconds the first time. Ingenuity flew for thirty-nine. Both flights were just proving it could be done.",
        ar: "حلّق الأخوان رايت اثنتي عشرة ثانية في أول مرة. أما إنجينويتي فحلّقت تسعًا وثلاثين ثانية. وكلا التحليقين كان يُثبت أن الأمر ممكن فحسب.",
      },
      timeline: [
        {
          id: "ing-launch",
          date: "2020-07-30",
          dateLabel: { en: "30 July 2020", ar: "30 يوليو 2020" },
          label: { en: "Launch", ar: "الإطلاق" },
          description: {
            en: "Ingenuity launched with Perseverance on an Atlas V rocket.",
            ar: "انطلقت إنجينويتي مع بيرسيفيرانس على صاروخ أطلس 5.",
          },
          type: "launch",
          sourceIds: ["SRC-INGENUITY", "SRC-NSSDCA-MARS-2020"],
        },
        {
          id: "ing-landing",
          date: "2021-02-18",
          dateLabel: { en: "18 February 2021", ar: "18 فبراير 2021" },
          label: { en: "Landing in Jezero Crater", ar: "الهبوط في فوهة جيزيرو" },
          description: {
            en: "Perseverance and Ingenuity landed in Jezero Crater.",
            ar: "هبطت بيرسيفيرانس وإنجينويتي في فوهة جيزيرو.",
          },
          type: "landing",
          sourceIds: ["SRC-INGENUITY", "SRC-NSSDCA-MARS-2020"],
        },
        {
          id: "ing-first-flight",
          date: "2021-04-19",
          dateLabel: { en: "19 April 2021", ar: "19 أبريل 2021" },
          label: { en: "First flight", ar: "أول تحليق" },
          description: {
            en: "Ingenuity made the first powered, controlled flight on another planet.",
            ar: "حققت إنجينويتي أول تحليق مُدار بالطاقة على عالم آخر.",
          },
          type: "milestone",
          sourceIds: ["SRC-INGENUITY"],
        },
        {
          id: "ing-final-flight",
          date: "2024-01-18",
          dateLabel: { en: "18 January 2024", ar: "18 يناير 2024" },
          label: { en: "Final flight", ar: "آخر تحليق" },
          description: {
            en: "During its 72nd flight, Ingenuity's rotor blades were damaged.",
            ar: "خلال تحليقها الثاني والسبعين، تلفت شفرات دوّار إنجينويتي.",
          },
          type: "last-contact",
          sourceIds: ["SRC-INGENUITY"],
        },
      ],
      diagram: {
        kind: "journey-map",
        title: { en: "The route to the first flight", ar: "الطريق إلى أول تحليق" },
        intro: {
          en: "From a launch pad on Earth to a hover three metres above Mars.",
          ar: "من منصة إطلاق على الأرض إلى تحويم على ارتفاع ثلاثة أمتار فوق المريخ.",
        },
        route: [
          {
            label: { en: "Launch", ar: "الإطلاق" },
            description: {
              en: "Cape Canaveral, 30 July 2020, on an Atlas V",
              ar: "كيب كانافيرال، 30 يوليو 2020، على صاروخ أطلس 5",
            },
          },
          {
            label: { en: "Cruise", ar: "الرحلة البينية" },
            description: {
              en: "About seven months folded under the rover",
              ar: "نحو سبعة أشهر مطوية تحت بطن العربة",
            },
          },
          {
            label: { en: "Landing", ar: "الهبوط" },
            description: {
              en: "Jezero Crater, 18 February 2021",
              ar: "فوهة جيزيرو، 18 فبراير 2021",
            },
          },
          {
            label: { en: "Deployment", ar: "نشر المروحية" },
            description: {
              en: "Unfolded and lowered to the ground in early April 2021",
              ar: "فُرِّدت وأنزلت إلى الأرض في أوائل أبريل 2021",
            },
          },
          {
            label: { en: "First flight", ar: "أول تحليق" },
            description: {
              en: "Wright Brothers Field, 19 April 2021",
              ar: "ميدان الأخوين رايت، 19 أبريل 2021",
            },
          },
        ],
        points: [
          {
            id: "earth",
            x: 12,
            y: 56,
            label: { en: "Earth", ar: "الأرض" },
            detail: {
              en: "Launch on an Atlas V on 30 July 2020.",
              ar: "الإطلاق على صاروخ أطلس 5 في 30 يوليو 2020.",
            },
          },
          {
            id: "mars",
            x: 80,
            y: 26,
            label: { en: "Mars", ar: "المريخ" },
            detail: {
              en: "Landing in Jezero Crater on 18 February 2021.",
              ar: "الهبوط في فوهة جيزيرو في 18 فبراير 2021.",
            },
          },
          {
            id: "deployment",
            x: 62,
            y: 62,
            label: { en: "The deployment", ar: "نشر المروحية" },
            detail: {
              en: "Unfolded, stood upright and lowered to the ground in early April 2021.",
              ar: "فُرِّدت وأُقيمت قائمة وأنزلت إلى الأرض في أوائل أبريل 2021.",
            },
          },
          {
            id: "first-flight",
            x: 86,
            y: 78,
            label: { en: "Wright Brothers Field", ar: "ميدان الأخوين رايت" },
            detail: {
              en: "The first flight rose about three metres and hovered for 39.1 seconds.",
              ar: "ارتفع أول تحليق نحو ثلاثة أمتار وتحوّم 39.1 ثانية.",
            },
          },
        ],
      },
    },
    {
      id: "discoveries",
      kind: "discoveries",
      eyebrow: { en: "Chapter four", ar: "الفصل الرابع" },
      title: { en: "What the Helicopter Proved", ar: "ما الذي أثبتته المروحية" },
      summary: {
        en: "Flight is possible on Mars, and an aircraft can be a useful partner for a rover.",
        ar: "الطيران ممكن على المريخ، والطائرة يمكن أن تكون شريكاً مفيداً للعربة.",
      },
      narrative: {
        en: [
          "Ingenuity's first achievement was simply to fly. That sounds small, but it required solving a long list of problems: generating lift in a thin atmosphere, keeping the helicopter stable without a human pilot, and surviving the cold nights.",
          "The second achievement was operational. Ingenuity's images helped the Perseverance team see terrain ahead and plan routes. A flying scout can cover ground faster than a rover and can look over hills that a rover cannot see past.",
          "The mission also showed the limits. The helicopter depended on solar power and a battery, and Martian dust gradually reduced its energy. Its final damage was a reminder that flying on Mars remains difficult, even after 72 successes.",
        ],
        ar: [
          "كان إنجاز إنجينويتي الأول هو الطيران ببساطة. يبدو ذلك صغيراً، لكنه تطلب حل قائمة طويلة من المشكلات: توليد قوة رفع في غلاف رقيق، والحفاظ على استقرار المروحية دون طيّار بشري، والنجاة من الليالي الباردة.",
          "وكان الإنجاز الثاني عملياتياً. فقد ساعدت صور إنجينويتي فريق بيرسيفيرانس على رؤية التضاريس المقبلة وتخطيط المسارات. فالمستطلع الطائر يستطيع قطع مسافة أسرع من العربة والنظر وراء تلال لا تستطيع العربة رؤيتها.",
          "وأظهرت المهمة الحدود أيضاً. فالمروحية اعتمدت على الطاقة الشمسية وبطارية، وقد قلل غبار المريخ طاقتها تدريجياً. وكان تلفها الأخير تذكيراً بأن الطيران على المريخ يبقى صعباً حتى بعد 72 نجاحاً.",
        ],
      },
      echo: {
        en: "The first flight was the headline. The seventy-two flights were the proof.",
        ar: "كان التحليق الأول العنوان، أما التحليقات الاثنان والسبعون فكانت الدليل.",
      },
      discoveries: [
        {
          id: "ing-d1",
          title: { en: "Powered flight works on Mars", ar: "الطيران المُدار يعمل على المريخ" },
          question: {
            en: "Can a helicopter fly in the Martian atmosphere?",
            ar: "هل تستطيع مروحية الطيران في غلاف المريخ الجوي؟",
          },
          instrument: {
            en: "Ingenuity's rotors, cameras, inertial sensors and flight computer",
            ar: "دوّارات إنجينويتي وكاميراتها وحساساتها وحاسوب طيرانها",
          },
          method: {
            en: "The helicopter performed a series of increasingly ambitious flights, from a short hover to longer reconnaissance routes.",
            ar: "نفذت المروحية سلسلة تحليقات متزايدة الطموح، من تحويم قصير إلى مسارات استطلاع أطول.",
          },
          data: {
            en: "All planned flights in the demonstration phase succeeded, and the helicopter went on to complete 72 flights in total.",
            ar: "نجحت كل التحليقات المخططة في مرحلة العرض، ثم أكملت المروحية 72 تحليقاً إجمالاً.",
          },
          finding: {
            en: "Powered, controlled flight is possible in Mars' thin atmosphere.",
            ar: "الطيران المُدار بالطاقة ممكن في غلاف المريخ الرقيق.",
          },
          significance: {
            en: "It opened a new way to explore planets: from the air.",
            ar: "فتح ذلك طريقاً جديداً لاستكشاف الكواكب: من الجو.",
          },
          sourceIds: ["SRC-INGENUITY", "SRC-NSSDCA-MARS-2020"],
        },
        {
          id: "ing-d2",
          title: { en: "An aerial scout", ar: "مستطلع جوّي" },
          question: {
            en: "Can a flying vehicle help a rover mission?",
            ar: "هل تستطيع مركبة طائرة مساعدة مهمة عربة؟",
          },
          instrument: {
            en: "Ingenuity's navigation and colour cameras",
            ar: "كاميرات الملاحة والألوان في إنجينويتي",
          },
          method: {
            en: "The helicopter flew ahead of Perseverance and photographed terrain that the rover team wanted to inspect.",
            ar: "حلّقت المروحية أمام بيرسيفيرانس وصوّرت تضاريس أراد فريق العربة فحصها.",
          },
          data: {
            en: "The images gave planners a wider view of the route and helped identify hazards and targets.",
            ar: "منحت الصور المخططين رؤية أوسع للمسار وساعدت في تحديد المخاطر والأهداف.",
          },
          finding: {
            en: "A small helicopter can act as a scout for a surface mission.",
            ar: "تستطيع مروحية صغيرة أن تعمل مستطلعاً لمهمة سطحية.",
          },
          significance: {
            en: "It showed how future missions could combine rovers and aircraft to explore more ground.",
            ar: "أظهر كيف يمكن للمهمات المستقبلية أن تجمع العربات والطائرات لاستكشاف مساحات أوسع.",
          },
          sourceIds: ["SRC-INGENUITY"],
        },
      ],
    },
    {
      id: "ending",
      kind: "ending",
      eyebrow: { en: "Chapter five", ar: "الفصل الخامس" },
      title: { en: "A Helicopter at Rest", ar: "مروحية في راحة" },
      summary: {
        en: "The rotors are damaged, the flights are over, and the little helicopter is still on Mars.",
        ar: "الدوّارات تالفة والتحليقات انتهت، والمروحية الصغيرة ما زالت على المريخ.",
      },
      narrative: {
        en: [
          "Ingenuity's final flight ended with damaged rotor blades. The team concluded that the helicopter could no longer fly, and NASA ended flight operations in January 2024.",
          "The helicopter remains in Jezero Crater, near the places it photographed from the air. It is a small object in a large landscape, but it changed the way engineers think about exploring other worlds.",
          "Its story is not one of a machine that failed. It is the story of a machine that was sent to try something once, and then did it 72 times.",
        ],
        ar: [
          "انتهى تحليق إنجينويتي الأخير بتلف شفرات الدوّار. وخلص الفريق إلى أن المروحية لم تعد قادرة على الطيران، فأنهت ناسا عمليات التحليق في يناير 2024.",
          "وما زالت المروحية في فوهة جيزيرو، قرب الأماكن التي صوّرتها من الجو. إنها جسم صغير في مشهد واسع، لكنها غيّرت طريقة تفكير المهندسين في استكشاف العوالم الأخرى.",
          "وحكايتها ليست حكاية آلة فشلت، بل حكاية آلة أُرسلت لتجرب شيئاً مرة واحدة، ثم فعلته 72 مرة.",
        ],
      },
      echo: {
        en: "It was built to make one flight. It made seventy-two.",
        ar: "صُنعت لتحلّق مرة واحدة، فحلّقت اثنتين وسبعين.",
      },
      facts: [
        {
          label: { en: "Final location", ar: "الموقع الأخير" },
          value: { en: "Jezero Crater, Mars", ar: "فوهة جيزيرو، المريخ" },
        },
        {
          label: { en: "Flights", ar: "التحليقات" },
          value: { en: "72", ar: "72" },
        },
        {
          label: { en: "Final flight", ar: "آخر تحليق" },
          value: { en: "18 January 2024", ar: "18 يناير 2024" },
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
      title: { en: "What Seventy-Two Flights Left", ar: "ما تركه اثنان وسبعون تحليقاً" },
      summary: {
        en: "A demonstration that became a working aircraft, and the air above Mars that it opened.",
        ar: "عرض تقني صار طائرة عاملة، والجو فوق المريخ الذي فتحته.",
      },
      narrative: {
        en: [
          "Ingenuity was meant to fly five times. It flew 72, covered about 17 kilometres, and outlived its own mission plan by nearly three years. By the end it was not an experiment but an operational scout, flying ahead of a rover to show the way.",
          "The record is simple to state and hard to beat: the first powered, controlled flight on another planet, made by a 1.8-kilogram machine with blades 1.2 metres across, flying in air about one percent as dense as Earth's.",
          "The helicopter ended where it landed for the last time, in the channel of Neretva Vallis in Jezero Crater, its rotor blades broken on 18 January 2024. Tucked under its solar panel is a small piece of fabric from the Wright brothers' first aircraft — carried from one first flight to another.",
          "Aircraft are now part of the planetary exploration toolkit, and larger ones are being designed for worlds farther out. Every one of them flies in the path of the little helicopter that went first.",
        ],
        ar: [
          "صُنعت إنجينويتي لتعمل خمسة تحليقات. فحلّقت 72 تحليقاً، وقطعت نحو 17 كيلومتراً، وتجاوزت عمر خطتها بقرابة ثلاث سنوات. وفي النهاية لم تعد تجربة، بل مستطلعاً عملياتياً يحلّق أمام عربة ليدلّها على الطريق.",
          "والسجل بسيط في قوله، صعب في بلوغه: أول تحليق مُدار بالطاقة على عالم آخر، قامت به آلة كتلتها 1.8 كيلوجرام وشفراتها تمتدّ 1.2 متر، في جوٍّ كثافته نحو واحد بالمئة من كثافة غلاف الأرض.",
          "واستقرت المروحية حيث هبطت آخر مرة، في مجرى نيريتا فاليس في فوهة جيزيرو، وقد تلفت شفرات دوّارها في 18 يناير 2024. وتحت لوحها الشمسي قطعة قماش صغيرة من أول طائرة للأخوين رايت — حُملت من أول تحليق إلى أول تحليق.",
          "صارت الطائرات الآن جزءاً من أدوات استكشاف الكواكب، وتُصمَّم طائرات أكبر لعوالم أبعد. وكلها تحلّق في مسار المروحية الصغيرة التي سبقتها.",
        ],
      },
      echo: {
        en: "It carried a scrap of the Wright Flyer to Mars and then flew seventy-two times in its shadow. Some souvenirs are earned.",
        ar: "حملت قطعة من طائرة الأخوين رايت إلى المريخ، ثم حلّقت اثنتين وسبعين مرة في ظلّها. بعض التذكارات تُكتسب.",
      },
      facts: [
        {
          label: { en: "Flights", ar: "التحليقات" },
          value: { en: "72, against a plan of five", ar: "72 تحليقاً، مقابل خطة من خمسة" },
        },
        {
          label: { en: "Distance flown", ar: "المسافة المقطوعة" },
          value: {
            en: "About 17 km over Jezero Crater",
            ar: "نحو 17 كيلومتراً فوق فوهة جيزيرو",
          },
        },
        {
          label: { en: "Where it rests", ar: "أين تستقر" },
          value: {
            en: "Jezero Crater, silent since January 2024",
            ar: "فوهة جيزيرو، صامتة منذ يناير 2024",
          },
        },
      ],
    },
  ],
  legacyStatement: {
    en: "Ingenuity made the first flight on another world, then kept flying until the world finally stopped it.",
    ar: "حققت إنجينويتي أول تحليق على عالم آخر، ثم واصلت التحليق حتى أوقفها ذلك العالم أخيراً.",
  },
  tags: ["mars", "rover", "instrument", "remnant"],
  artifactId: "ingenuity",
  sourceIds: ["SRC-INGENUITY", "SRC-NSSDCA-MARS-2020"],
  relatedStorySlugs: ["spirit", "opportunity"],
  echoIntro: {
    en: "A helicopter under a rover's belly became the first aircraft to fly on another planet. Come and see how.",
    ar: "مروحية تحت بطن عربة صارت أول طائرة تحلّق على عالم آخر. تعال لترى كيف.",
  },
  echoSignoff: {
    en: "Ingenuity is still in Jezero Crater, its rotors still, its record unbroken.",
    ar: "ما زالت إنجينويتي في فوهة جيزيرو، دوّاراتها ساكنة وسجلها كامل.",
  },
  lastVerified: "2026-11-14",
};
