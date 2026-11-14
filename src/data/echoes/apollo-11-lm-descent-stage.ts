import type { EchoStory } from "@/types/echo";
import { echoImage, echoVideo } from "./media";

/**
 * APOLLO 11 LUNAR MODULE DESCENT STAGE.
 *
 * Sources: the NASA Science Apollo 11 mission page, the Apollo Lunar Surface
 * Journal, NASA/NSSDCA technical records and the GRAVERSE museum record for
 * the descent stage.
 *
 * The ascent stage's final condition is documented as unknown; this story
 * says so rather than claiming it survived.
 */
export const apollo11LmStory: EchoStory = {
  id: "apollo-11-lm-descent-stage",
  slug: "apollo-11-lm-descent-stage",
  title: {
    en: "Apollo 11 Lunar Module Descent Stage",
    ar: "مرحلة الهبوط للوحدة القمرية في أبولو 11",
  },
  storyTitle: {
    en: "The Launch Pad That Stayed on the Moon",
    ar: "منصة الإطلاق التي بقيت على القمر",
  },
  dek: {
    en: "Half of the first spacecraft to land people on the Moon is still standing where it touched down.",
    ar: "نصف أول مركبة هبط بها البشر على القمر ما يزال واقفاً في موضع هبوطه.",
  },
  summary: {
    en: "The lower half of Eagle was a landing stage, a workbench and a launch pad. It was never designed to leave the Moon, and it never did. Sixty years on, it is still in Mare Tranquillitatis — and so are the instruments that were set up beside it.",
    ar: "النصف السفلي من «إيغل» كان مرحبة هبوط، ومنضدة عمل، ومنصة إطلاق. لم يُصمَّم أبداً لمغادرة القمر، ولم يغادره قط. وبعد ستين عاماً ما زال في بحر الهدوء — وكذلك الأدوات التي أُقيمت بجانبه.",
  },
  location: {
    en: "Tranquility Base, Mare Tranquillitatis, Moon",
    ar: "قاعدة الهدوء، بحر الهدوء، القمر",
  },
  locationNote: {
    en: "The landing site is at approximately 0.67° north, 23.47° east. The GRAVERSE record marks it as an approximate position rather than a plotted coordinate.",
    ar: "يقع موقع الهبوط عند نحو 0.67° شمالاً و23.47° شرقاً. ويضعه سجل GRAVERSE موضعاً تقريبياً لا إحداثيات مرسومة.",
  },
  equipmentType: {
    en: "Lander stage of a crewed lunar module",
    ar: "مرحلة هبوط لوحدة قمرية مأهولة",
  },
  missionPeriod: {
    en: "Launch 16 July 1969 · Landing 20 July 1969 · Ascent 21 July 1969 · Mission ended 24 July 1969",
    ar: "الإطلاق 16 يوليو 1969 · الهبوط 20 يوليو 1969 · الصعود 21 يوليو 1969 · انتهاء المهمة 24 يوليو 1969",
  },
  missionStatus: {
    en: "Mission complete — Apollo 11 splashdown was 24 July 1969.",
    ar: "اكتملت المهمة — هبوط أبولو 11 في المحيط كان في 24 يوليو 1969.",
  },
  hardwareStatus: {
    en: "Deliberately left on the Moon — the descent stage remains at Tranquility Base.",
    ar: "تُركت عمداً على القمر — ما تزال مرحلة الهبوط في قاعدة الهدوء.",
  },
  statusKind: "left-behind",
  accent: "#8FC7FF",
  accentSoft: "#D5E7FF",
  badge: {
    en: "Moon Historian",
    ar: "مؤرّخ القمر",
  },
  badgeKey: "moon-historian",
  hero: echoImage("as11-40-5927", {
    alt: {
      en: "The Apollo 11 lunar module Eagle standing on the Moon, with its landing gear and footpads resting on the surface.",
      ar: "وحدة أبولو 11 القمرية «إيغل» واقفة على القمر، وأرجل الهبوط وأقراصها تستقرّ على السطح.",
    },
    caption: {
      en: "Eagle on the Moon, photographed on the first lunar surface EVA of 20 July 1969. The descent stage is the half with the landing legs — and the half that is still there.",
      ar: "«إيغل» على القمر، مصوَّرة خلال أول خرجة على سطح القمر في 20 يوليو 1969. مرحلة الهبوط هي النصف الذي يحمل أرجل الهبوط — وهو النصف الذي ما يزال هناك.",
    },
  }),
  gallery: [
    echoImage("as11-40-5917", {
      alt: {
        en: "A close view of an Apollo 11 lunar module footpad resting on the dusty lunar surface.",
        ar: "لقطة قريبة لقرص قدم من وحدة أبولو 11 القمرية مستقرّ على سطح القمر الترابي.",
      },
      caption: {
        en: "A footpad on the surface. The gold-coloured foil on the descent stage was thermal insulation, and it is still there.",
        ar: "قرص قدم على السطح. واللفافة الذهبية على مرحلة الهبوط كانت عزلاً حرارياً، وهو ما يزال هناك.",
      },
    }),
    echoImage("624073main_1969-04-04_full", {
      alt: {
        en: "The Apollo 11 lunar module photographed in space during launch preparation in 1969.",
        ar: "وحدة أبولو 11 القمرية مصوَّرة في الفضاء أثناء تحضير الإطلاق عام 1969.",
      },
      caption: {
        en: "The lunar module before it flew, photographed during launch preparation in early 1969.",
        ar: "الوحدة القمرية قبل طيرانها، مصوَّرة أثناء تحضير الإطلاق في مطلع 1969.",
      },
    }),
    echoImage("as11-37-5445", {
      alt: {
        en: "The Apollo 11 command and service module Columbia photographed from the lunar module in lunar orbit.",
        ar: "وحدة القيادة والخدمة «كولومبيا» لأبولو 11 مصوَّرة من الوحدة القمرية في مدار القمر.",
      },
      caption: {
        en: "Columbia in lunar orbit, photographed from Eagle's window. The two spacecraft met, and the crew transferred back into Columbia.",
        ar: "«كولومبيا» في مدار القمر، مصوَّرة من نافذة «إيغل». التقت المركبتان وانتقل الطاقم إلى «كولومبيا».",
      },
    }),
    echoImage("as11-44-6626", {
      alt: {
        en: "The Apollo 11 lunar module ascent stage photographed from the command module after rendezvous.",
        ar: "مرحلة الصعود لوحدة أبولو 11 مصوَّرة من وحدة القيادة بعد اللقاء.",
      },
      caption: {
        en: "Eagle's ascent stage after the rendezvous. It was jettisoned in lunar orbit; its final condition is not documented.",
        ar: "مرحلة الصعود في «إيغل» بعد اللقاء. أُفلتت في مدار القمر، وحالتها النهائية غير موثّقة.",
      },
    }),
  ],
  facts: [
    {
      label: { en: "Mission", ar: "المهمة" },
      value: { en: "Apollo 11", ar: "أبولو 11" },
    },
    {
      label: { en: "Launch vehicle", ar: "مركبة الإطلاق" },
      value: { en: "Saturn V", ar: "ساتورن 5" },
    },
    {
      label: { en: "Crew", ar: "الطاقم" },
      value: {
        en: "Neil Armstrong and Buzz Aldrin on the surface; Michael Collins in lunar orbit.",
        ar: "نيل آرمسترونغ وباز ألدرين على السطح؛ ومايكل كولينز في مدار القمر.",
      },
    },
    {
      label: { en: "Descent stage mass", ar: "كتلة مرحلة الهبوط" },
      value: {
        en: "About 10,300 kg fuelled.",
        ar: "نحو 10,300 كغ وهي محمّلة بالوقود.",
      },
    },
    {
      label: { en: "Propellant", ar: "الوقود" },
      value: {
        en: "Aerozine 50 and nitrogen tetroxide.",
        ar: "أيروزين 50 ورباعي أكسيد النيتروجين.",
      },
    },
    {
      label: { en: "Landing site", ar: "موقع الهبوط" },
      value: {
        en: "Mare Tranquillitatis, approximately 0.67° N, 23.47° E.",
        ar: "بحر الهدوء، نحو 0.67° شمالاً و23.47° شرقاً.",
      },
    },
    {
      label: { en: "Disposition", ar: "المصير" },
      value: {
        en: "The descent stage remains on the Moon.",
        ar: "ما تزال مرحلة الهبوط على القمر.",
      },
    },
  ],
  model: {
    src: "/models/echoes/apollo-lunar-module.glb",
    title: {
      en: "Apollo Lunar Module",
      ar: "الوحدة القمرية لأبولو",
    },
    description: {
      en: "NASA's 3D model of the lunar module. The descent stage is the lower half — the half that is still on the Moon.",
      ar: "نموذج ناسا ثلاثي الأبعاد للوحدة القمرية. مرحلة الهبوط هي النصف السفلي — وهو النصف الذي ما يزال على القمر.",
    },
    credit: "NASA 3D Resources",
    organization: "NASA",
    sourceUrl: "https://science.nasa.gov/3d-resources/",
    provenance: {
      en: "NASA 3D Resources model of the Apollo Lunar Module. Free to download and use under the NASA media usage guidelines.",
      ar: "نموذج «الوحدة القمرية لأبولو» من مصادر ناسا ثلاثية الأبعاد. متاح مجاناً للتنزيل والاستخدام وفق إرشادات استخدام وسائط ناسا.",
    },
    hotspots: [
      {
        id: "descent-stage",
        position: [-0.32, -0.42, 0.5],
        label: { en: "Descent stage", ar: "مرحلة الهبوط" },
        detail: {
          en: "The octagonal lower half with the landing legs. It carried the descent engine, the propellant, the footpads and the equipment bay — and it never left the Moon.",
          ar: "النصف السفلي المثمّن ذو أرجل الهبوط. حمل محرك الهبوط والوقود وأقراص القدم وغرفة المعدات — ولم يغادر القمر قط.",
        },
      },
      {
        id: "engine",
        position: [0.02, -0.66, 0.12],
        label: { en: "Descent engine", ar: "محرك الهبوط" },
        detail: {
          en: "A throttleable engine: it could reduce thrust for the final metres, which is how the Eagle landed softly instead of tipping over.",
          ar: "محرك قابل للخفض: كان يستطيع تقليل اندفاعه في الأمتار الأخيرة، وهكذا هبط «إيغل» بهدوء بدل أن ينقلب.",
        },
      },
      {
        id: "legs",
        position: [0.95, -0.8, 0.05],
        label: { en: "Landing gear", ar: "أرجل الهبوط" },
        detail: {
          en: "Four legs with footpads, each one carrying a contact probe that fired a small engine when it touched the surface.",
          ar: "أربعة أرجل بأقراص قدم، يحمل كل منها مسبار تلامس يشغّل محركاً صغيراً عند ملامسة السطح.",
        },
      },
      {
        id: "ascent-stage",
        position: [0, 0.52, 0.5],
        label: { en: "Ascent stage", ar: "مرحلة الصعود" },
        detail: {
          en: "The crew cabin, on top. It lifted off from the descent stage, and was jettisoned in lunar orbit after the crew returned to Columbia.",
          ar: "مقصورة الطاقم في الأعلى. أقلعت من مرحلة الهبوط، وأُفلتت في مدار القمر بعد عودة الطاقم إلى «كولومبيا».",
        },
      },
      {
        id: "antenna",
        position: [-0.14, 0.8, 0],
        label: { en: "Antennas", ar: "الهوائيات" },
        detail: {
          en: "The rendezvous radar antenna on the front and the steerable antenna on top. They guided the ascent stage back to Columbia in lunar orbit.",
          ar: "هوائي رادار اللقاء في الأمام وهوائي موجّه في الأعلى. وقد وجّها مرحلة الصعود إلى «كولومبيا» في مدار القمر.",
        },
      },
    ],
  },
  chapters: [
    {
      id: "meet",
      kind: "meet",
      eyebrow: { en: "Chapter one", ar: "الفصل الأول" },
      title: { en: "Meet the Explorer", ar: "تعرّف على المستكشِف" },
      summary: {
        en: "Why a spacecraft was built in two halves, and what the lower half was actually for.",
        ar: "لماذا بُنيت مركبة من نصفين، وما الوظيفة الحقيقية للنصف السفلي.",
      },
      narrative: {
        en: [
          "Every part of the Apollo lunar module existed because of one fact: there is no way to refuel on the Moon and no way to send a vehicle to pick you up. Whatever you need for the mission, you carry — and whatever you do not need, you leave behind.",
          "The lunar module was therefore built in two halves. The lower descent stage was the landing system: a throttleable descent engine, propellant tanks, four landing legs with contact probes, and a bay of equipment. The upper ascent stage held the crew cabin and its own engine. Only one of the two had a heat shield, because only one of the two entered the atmosphere.",
          "The descent stage was about 10,300 kilograms fuelled. It was built from aluminium honeycomb panels wrapped in thin sheets of Kapton and covered in gold-coloured Mylar, which reflected sunlight and heat rather than absorbing them. That foil is why the hardware in the photographs still looks shiny.",
          "It was designed to be used once and abandoned in place. The lunar module was the only part of the Apollo spacecraft that never came home.",
        ],
        ar: [
          "كل جزء في الوحدة القمرية لأبولو وُجد بسبب حقيقة واحدة: لا يوجد وس لإعادة الوقود على القمر، ولا وس لإرسال مركبة لتحملك. فكل ما تحتاجه في المهمة تحمله معك — وكل ما لا تحتاجه تتركه خلفك.",
          "ولذلك بُنيت الوحدة القمرية نصفين. فمرحلة الهبوط السفلية كانت نظام الهبوط: محرك هبوط قابل للخفض، وخزانات وقود، وأربعة أرجل هبوط بمسبارات تلامس، وغرفة معدات. أما مرحلة الصعود العليا فضمّت مقصورة الطاقم ومحركها الخاص. ولم يحمل سوى أحد النصفين درعاً حرارياً، لأن أحدهما وحده دخل الغلاف الجوي.",
          "كانت مرحلة الهبوط نحو 10,300 كيلوجرام وهي محمّلة بالوقود. وبُنيت من ألواح عسل ألمنيوم ملفوفة بأغشية رقيقة من الكابتون ومغطّاة بميلار ذهبي اللون يعكس الشمس والحرارة بدل أن يبتلعهما. وهذا الملف المعدني هو سبب بقاء العتاد في الصور لامعاً.",
          "وقد صُمِّمت لتُستخدم مرة واحدة وتُترك في مكانها. فالوحدة القمرية كانت الجزء الوحيد من مركبة أبولو الذي لم يعد إلى الأرض.",
        ],
      },
      echo: {
        en: "This machine is strange if you think about it. Half of it is a disposable launch pad. Nothing else NASA built in 1969 works that way.",
        ar: "هذه الآلة غريبة إن فكّرت فيها. نصفها منصّة إطلاق تُستهلك. لا شيء آخر بناته ناسا عام 1969 يعمل بهذه الطريقة.",
      },
      facts: [
        {
          label: { en: "Built by", ar: "صُنعت بواسطة" },
          value: {
            en: "Grumman Aircraft Company, with Honeywell providing the descent guidance system.",
            ar: "شركة غروممان للطائرات، مع هونيويل لتوفير نظام التوجيه أثناء الهبوط.",
          },
        },
        {
          label: { en: "Descent stage mass", ar: "كتلة مرحلة الهبوط" },
          value: { en: "About 10,300 kg fuelled", ar: "نحو 10,300 كغ محمّلة" },
        },
        {
          label: { en: "Heat shield", ar: "الدرع الحراري" },
          value: {
            en: "On the descent stage only — the ascent stage never entered the atmosphere.",
            ar: "على مرحلة الهبوط وحدها — فمرحلة الصعود لم تدخل الغلاف الجوي قط.",
          },
        },
      ],
      diagram: {
        kind: "lander-components",
        title: { en: "Two halves, one spacecraft", ar: "نصفان، مركبة واحدة" },
        intro: {
          en: "Select a marker to see what that part of the lunar module did.",
          ar: "اختر أي علامة لترى وظيفة ذلك الجزء من الوحدة القمرية.",
        },
        points: [
          {
            id: "ascent",
            x: 50,
            y: 16,
            label: { en: "Ascent stage", ar: "مرحلة الصعود" },
            detail: {
              en: "The crew cabin with its own engine. It lifted off from the descent stage and carried the astronauts back to lunar orbit.",
              ar: "مقصودة الطاقم ومحركها الخاص. أقلعت من مرحلة الهبوط وحملت رواد الفضاء إلى مدار القمر.",
            },
          },
          {
            id: "descent",
            x: 50,
            y: 52,
            label: { en: "Descent stage", ar: "مرحلة الهبوط" },
            detail: {
              en: "The landing system: engine, propellant, legs, footpads, and the equipment bay that held the science package.",
              ar: "نظام الهبوط: المحرك والوقود والأرجل وأقراص القدم، وغرفة المعدات التي حملت الحزمة العلمية.",
            },
          },
          {
            id: "legs",
            x: 22,
            y: 74,
            label: { en: "Landing gear", ar: "أرجل الهبوط" },
            detail: {
              en: "Four legs with contact probes that fired small engines to compress the landing struts when they touched the surface.",
              ar: "أربعة أرجل بمسبارات تلامس تشغّل محركات صغيرة لضغط قوائم الهبوط عند ملامسة السطح.",
            },
          },
          {
            id: "bay",
            x: 78,
            y: 70,
            label: { en: "Equipment bay", ar: "غرفة المعدات" },
            detail: {
              en: "A hinged bay on the side of the descent stage. The crew pulled the experiments out and set them up on the surface.",
              ar: "غرفة ذات مفصلات في جانب مرحلة الهبوط. سحب الطاقم التجارب منها وأقامها على السطح.",
            },
          },
          {
            id: "tv",
            x: 16,
            y: 46,
            label: { en: "TV camera bay", ar: "غرفة كاميرا التلفزيون" },
            detail: {
              en: "The MESA bay held the television camera that sent the first pictures of a person walking on the Moon to the whole world.",
              ar: "احتوت غرفة MESA كاميرا التلفزيون التي أرسلت أول صور لشخص يمشي على القمر إلى العالم كله.",
            },
          },
        ],
      },
      quiz: [
        {
          id: "a11-q1",
          prompt: {
            en: "Why was the lunar module built in two halves?",
            ar: "لماذا بُنيت الوحدة القمرية نصفين؟",
          },
          options: [
            {
              id: "a",
              label: {
                en: "So that only the half that returned needed a heat shield",
                ar: "كي لا يحتاج الدرع الحراري إلا النصف الذي عاد",
              },
            },
            {
              id: "b",
              label: {
                en: "Because it was too heavy to launch in one piece",
                ar: "لأنه كان ثقيلاً على الإطلاق في قطعة واحدة",
              },
            },
            {
              id: "c",
              label: {
                en: "Because the crew needed two cabins",
                ar: "لأن الطاقم احتاج مقصورتين",
              },
            },
          ],
          correctOptionId: "a",
          explanation: {
            en: "Only the descent stage entered Mars-style atmospheric flight, so only it needed a heat shield. The ascent stage was discarded on the Moon, which is why the lower half is still there.",
            ar: "دخلت مرحلة الهبوط وحدها في الغلاف الجوي، فكانت وحدها تحتاج درعاً حرارياً. أما مرحلة الصعود فتُركت على القمر — ولهذا ما زال النصف السفلي هناك.",
          },
        },
        {
          id: "a11-q2",
          prompt: {
            en: "Why was the descent stage covered in gold-coloured foil?",
            ar: "لماذا غُطّيت مرحلة الهبوط بلفافة ذهبية اللون؟",
          },
          options: [
            {
              id: "a",
              label: {
                en: "To reflect sunlight and heat away",
                ar: "لreflect لعكس الشمس والحرارة بعيداً",
              },
            },
            {
              id: "b",
              label: { en: "To look impressive", ar: "لتبدو مبهرة" },
            },
            {
              id: "c",
              label: {
                en: "To make it easier to spot from orbit",
                ar: "لتسهيل spotting عليها من المدار",
              },
            },
          ],
          correctOptionId: "a",
          explanation: {
            en: "The gold-coloured Kapton and Mylar covering was thermal insulation. It reflected sunlight and heat instead of absorbing them, and it is still in place.",
            ar: "كان الغلاف من الكابتون والميلار الذهبي عزلاً حرارياً. كان يعكس الشمس والحرارة بدل امتصاصهما، وهو لا يزال في مكانه.",
          },
        },
      ],
    },
    {
      id: "mission",
      kind: "mission",
      eyebrow: { en: "Chapter two", ar: "الفصل الثاني" },
      title: { en: "The Mission", ar: "المهمة" },
      summary: {
        en: "What Apollo 11 was actually trying to do, and the engineering that made it possible.",
        ar: "ما الذي كانت مهمة أبولو 11 تحاول فعله فعلاً، والهندسة التي جعلته ممكناً.",
      },
      narrative: {
        en: [
          "Apollo 11 had two jobs and only two. It was a demonstration that a crewed lunar landing could be done, and it was the first step of a programme intended to keep going. The scientific work was real but secondary — a small package of passive experiments that did not need power, because the lander had very little to spare.",
          "The engineering problem was brutal in a specific way: the Moon has no atmosphere to slow a spacecraft down and nothing to brake against. The lunar module had to arrive at the surface with almost no speed left, using an engine that could be throttled smoothly all the way to touchdown, and it had to do so on a fuel budget that left almost nothing spare.",
          "Armstrong took over manual control near the end of the descent because the automatic target was a boulder field. He flew past it and set down with the descent engine nearly out of fuel. The lunar module was designed for a 33-second hover margin in that situation. It used most of it.",
          "That last fact is worth sitting with. The first people to land on another world did so with the engine almost dry, by hand, on the first attempt.",
        ],
        ar: [
          "كانت لأبولو 11 مهمّتان فحسب. فهي إثبات لهبوط قَمري مأهول، وهي الخطوة الأولى في برنامج كان مقصوداً أن يستمر. أما العمل العلمي فكان حقيقياً لكنه ثانوي — حزمة صغيرة من تجارب خاملة لا تحتاج طاقة، لأن الهبوط لم يكن يملك ما يسرّه.",
          "كانت المشكلة الهندسية قاسية على نحو محدد: فالقمر لا غلاف جوّي يُبطئ المركبة ولا شيء يمكن أن يوقفها. وكان على الوحدة القمرية أن تصل إلى السطح بسرعة شبه معدومة، بمحر�� قابل للخفض بسلاسة حتى اللمس، وأن تفعل ذلك بميزانية وقود لا تترك شيئاً فائضاً.",
          "تسلّم آرمسترونغ التحكم اليدوي قرب نهاية الهبوط لأن الهدف الآلي كان حقلاً من الصخور. وقد  تجاوزه وهبط والمحرك شبه خالٍ من الوقود. وقد صُمّمت الوحدة القمرية لتترك هامش تحليق قدره 33 ثانية في هذه الحالة. واستُهلك معظمه.",
          "وتستحق هذه الحقيقة الأخيرة أن نغوص فيها. فأول إنسانين هبطا على عالم آخر فعلا ذلك بمحرك شبه جاف، وباليد، وفي المحاولة الأولى.",
        ],
      },
      echo: {
        en: "This is my favourite bit of the whole Apollo story. The engine ran out almost exactly when it needed to. That was not luck — it was the design margin.",
        ar: "هذا أحبّ جزء في قصة أبولو كلها. فقد المحرك وقوده تقريباً في اللحظة التي احتاجه فيها. ولم يكن ذلك حظاً — بل كان هامش التصميم.",
      },
      facts: [
        {
          label: { en: "Primary objective", ar: "الهدف الأساسي" },
          value: {
            en: "Land two people on the Moon and return them safely.",
            ar: "هبوط شخصين على القمر وإعادتهما سالمين.",
          },
        },
        {
          label: { en: "Science payload", ar: "الحمولة العلمية" },
          value: {
            en: "Early Apollo Scientific Experiments Package — passive, low-power instruments.",
            ar: "حزمة التجارب العلمية المبكرة لأبولو — أجهزة خاملة منخفضة الاستهلاك.",
          },
        },
        {
          label: { en: "Hover margin", ar: "هامش التحليق" },
          value: {
            en: "About 33 seconds of powered flight held in reserve.",
            ar: "نحو 33 ثانية من الطيرانPowered محفوظة احتياطياً.",
          },
        },
      ],
      glossary: [
        {
          id: "throttle",
          term: { en: "Throttleable engine", ar: "محرك قابل للخفض" },
          simple: {
            en: "An engine whose thrust can be reduced smoothly, the way a car eases off the accelerator.",
            ar: "محرك يمكن تخفيض اندفاعه تدريجياً، كما تخفّض السيارة قدمها عن البنزين.",
          },
        },
        {
          id: "hover",
          term: { en: "Hover", ar: "التحليق" },
          simple: {
            en: "Flying straight up, not moving forwards, while the engine holds the spacecraft still.",
            ar: "الطيران إلى أعلى دون تقدّم، بينما يثبّت المحرك المركبة في مكانها.",
          },
        },
        {
          id: "easep",
          term: { en: "EASEP", ar: "EASEP" },
          simple: {
            en: "Early Apollo Scientific Experiments Package — the small set of instruments Apollo 11 set up on the surface.",
            ar: "حزمة التجارب العلمية المبكرة لأبولو — المجموعة الصغيرة من الأجهزة التي أقامها أبولو 11 على السطح.",
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
        en: "Three days to the Moon, and the last four minutes that mattered most.",
        ar: "ثلاثة أيام إلى القمر، وأربع أخير دقائق كانت الأهم.",
      },
      narrative: {
        en: [
          "Apollo 11 launched on 16 July 1969 on Saturn V SA-506 from Kennedy Space Center. Three days later the lunar module separated, turned around, and docked with the command module. Then it undocked again, and Eagle fell towards the Moon on its own.",
          "The landing sequence had four parts. The module entered the lunar atmosphere at about 2,700 metres per second, shedding its heat shield. A drogue parachute opened, then the main parachute. Then the engine fired for the last five minutes, with the crew flying a path past a boulder field that the computer had not recognised.",
          "At 20:17 UTC on 20 July 1969 the descent stage touched down in Mare Tranquillitatis. Two hours later Armstrong and Aldrin were on the surface.",
          "Forty-one hours after that, the ascent stage lifted off from the descent stage — using it as a launch pad — and the two halves of the lunar module were never together again.",
        ],
        ar: [
          "أُطلقت أبولو 11 في 16 يوليو 1969 على ساتورن 5 (SA-506) من مركز كينيدي للفضاء. وبعد ثلاثة أيام انفصلت الوحدة القمرية، واستدارت، ورست بوحدة القيادة. ثم انفصلت مرة أخرى، وسقطت «إيغل» نحو القمر وحدها.",
          " كان تسلسل الهبوط أربعة أجزاء. دخلت الوحدة الغلاف الجوي القمري بسرعة نحو 2,700 متر في الثانية، ففقدت درعها الحراري. فُتحت مظلة التوجيه، ثم المظلة الرئيسية. ثم اشتعل المحرك في الخمس دقائق الأخيرة، وكان الطاقم يقود مساراً يتجاوز حقل صخور لم يتعرّف عليه الحاسوب.",
          "في الساعة 20:17 بتوقيت غرينتش من 20 يوليو 1969 هبطت مرحلة الهبوط في بحر الهدوء. وبعد ساعتين كان آرمسترونغ وألدرين على السطح.",
          "وأربعاً وأربعين ساعة بعد ذلك أقلعت مرحلة الصعود من مرحلة الهبوط — مستخدمةً إياها منصة إطلاق — ولم يجتمع نصفا الوحدة القمرية معاً أبداً بعدها.",
        ],
      },
      echo: {
        en: "Do you know the best part? The astronauts left their spaceship like you would leave a bus. Everything they needed was in the part that stayed.",
        ar: "هل تعرف أفضل جزء؟ ترك رواد الفضاء مركبتهم كما تترك حافلة. كل ما يحتاجونه كان في الجزء الذي بقي.",
      },
      timeline: [
        {
          id: "a11-launch",
          date: "1969-07-16",
          dateLabel: { en: "16 July 1969", ar: "16 يوليو 1969" },
          label: { en: "Launch", ar: "الإطلاق" },
          description: {
            en: "Saturn V SA-506 launched from Kennedy Space Center, Florida.",
            ar: "أُطلق ساتورن 5 (SA-506) من مركز كينيدي للفضاء في فلوريدا.",
          },
          type: "launch",
          sourceIds: ["SRC-APOLLO-11"],
        },
        {
          id: "a11-orbit",
          date: "1969-07-19",
          dateLabel: { en: "19 July 1969", ar: "19 يوليو 1969" },
          label: { en: "Entered lunar orbit", ar: "الالتحاق بمدار القمر" },
          description: {
            en: "The lunar module Eagle separated from the command module Columbia and docked with it in lunar orbit.",
            ar: "انفصلت الوحدة القمرية «إيغل» عن وحدة القيادة «كولومبيا» ورست بها في مدار القمر.",
          },
          type: "orbit-insertion",
          sourceIds: ["SRC-APOLLO-11"],
        },
        {
          id: "a11-landing",
          date: "1969-07-20",
          dateLabel: { en: "20 July 1969", ar: "20 يوليو 1969" },
          label: { en: "Landing", ar: "الهبوط" },
          description: {
            en: "Eagle landed in Mare Tranquillitatis with about 25 seconds of powered flight left.",
            ar: "هبطت «إيغل» في بحر الهدوء ومعها نحو 25 ثانية من الطيران Powered متبقية.",
          },
          type: "landing",
          sourceIds: ["SRC-APOLLO-11", "SRC-NSSDCA-APOLLO-11-LM"],
        },
        {
          id: "a11-eva",
          date: "1969-07-21",
          dateLabel: { en: "21 July 1969", ar: "21 يوليو 1969" },
          label: { en: "First moonwalk", ar: "أول مشية على القمر" },
          description: {
            en: "Armstrong and Aldrin became the first people to walk on the Moon and deployed the experiments beside the lander.",
            ar: "أصبح آرمسترونغ وألدرين أول إنسانيين يمشيان على القمر، ونشرا التجارب بجانب مركبة الهبوط.",
          },
          type: "first-operation",
          sourceIds: ["SRC-APOLLO-11", "SRC-ALSJ-A11-EASEP"],
        },
        {
          id: "a11-ascent",
          date: "1969-07-21",
          dateLabel: { en: "21 July 1969", ar: "21 يوليو 1969" },
          label: { en: "Ascent stage lifts off", ar: "إقلاع مرحلة الصعود" },
          description: {
            en: "Eagle's ascent stage lifted off from the descent stage, which stayed behind on the surface.",
            ar: "أقلعت مرحلة الصعود من مرحلة الهبوط، وبقيت الأخيرة على السطح.",
          },
          type: "milestone",
          sourceIds: ["SRC-APOLLO-11", "SRC-NSSDCA-APOLLO-11-LM"],
        },
        {
          id: "a11-splashdown",
          date: "1969-07-24",
          dateLabel: { en: "24 July 1969", ar: "24 يوليو 1969" },
          label: { en: "Splashdown", ar: "الهبوط في المحيط" },
          description: {
            en: "The crew splashed down in the Pacific Ocean and the mission ended.",
            ar: "هبط الطاقم في المحيط الهادئ وانتهت المهمة.",
          },
          type: "end-of-mission",
          sourceIds: ["SRC-APOLLO-11"],
        },
      ],
      diagram: {
        kind: "journey-map",
        title: { en: "Three days to Tranquility Base", ar: "ثلاثة أيام حتى قاعدة الهدوء" },
        intro: {
          en: "Earth to lunar orbit to the surface and back.",
          ar: "من الأرض إلى مدار القمر إلى السطح ثم العودة.",
        },
        route: [
          {
            label: { en: "Launch", ar: "الإطلاق" },
            description: { en: "Kennedy Space Center, Earth", ar: "مركز كينيدي للفضاء، الأرض" },
          },
          {
            label: { en: "Cruise", ar: "الرحلة البينية" },
            description: { en: "Three days to the Moon", ar: "ثلاثة أيام إلى القمر" },
          },
          {
            label: { en: "Landing", ar: "الهبوط" },
            description: {
              en: "Mare Tranquillitatis",
              ar: "بحر الهدوء",
            },
          },
          {
            label: { en: "Return", ar: "العودة" },
            description: {
              en: "Splashdown in the Pacific",
              ar: "هبوط في المحيط الهادئ",
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
              en: "Launch on 16 July 1969.",
              ar: "الإطلاق في 16 يوليو 1969.",
            },
          },
          {
            id: "moon",
            x: 84,
            y: 34,
            label: { en: "Moon", ar: "القمر" },
            detail: {
              en: "Landing in Mare Tranquillitatis on 20 July 1969.",
              ar: "الهبوط في بحر الهدوء في 20 يوليو 1969.",
            },
          },
        ],
      },
    },
    {
      id: "discoveries",
      kind: "discoveries",
      eyebrow: { en: "Chapter four", ar: "الفصل الرابع" },
      title: { en: "The Discoveries", ar: "الاكتشافات" },
      summary: {
        en: "What a two-day surface stay with almost no power still managed to measure.",
        ar: "ما أمكن لزيارة سطح مدتها يومان، بalmost لا طاقة تقريباً، من قياسه.",
      },
      narrative: {
        en: [
          "Apollo 11 was not a science mission, and it did not pretend to be one. But the experiments the crew left behind are still producing data, and two of them are still in use today.",
        ],
        ar: [
          "لم تكن أبولو 11 مهمة علمية، ولم تدّعِ أنها كذلك. لكن التجارب التي تركها الطاقم لا تزال تنتج بيانات، ولا تزال اثنتان منها مستخدَمَتين حتى اليوم.",
        ],
      },
      echo: {
        en: "Two of the instruments the astronauts set up are still working today. One of them has no power supply at all.",
        ar: "جهازان من الأجهزة التي أقامها رواد الفضاء ما يزالان يعملان حتى اليوم. وواحد منهما بلا مصدر طاقة إطلاقاً.",
      },
      discoveries: [
        {
          id: "a11-d1",
          title: {
            en: "The Moon rings like a bell",
            ar: "القمر يرنّ كالجرس",
          },
          question: {
            en: "Is the Moon a dead rock, or does it still move?",
            ar: "هل القمر صخرة ميتة، أم ما زال يتحرك؟",
          },
          instrument: {
            en: "Passive Seismic Experiment in the Early Apollo Scientific Experiments Package",
            ar: "تجربة الزلازل الخاملة في حزمة التجارب العلمية المبكرة لأبولو",
          },
          method: {
            en: "A solar-powered seismometer was deployed on the surface with a solar wind collector that also acted as a thermal shield. It recorded ground motion for about three weeks of Apollo 11 surface operations, and later seismometers from later missions ran for years.",
            ar: "نُشر مقياس الزلازل شمسي على السطح مع جامع رياح شمسية عمل أيضاً كدرع حراري. سجّل حركة الأرض نحو ثلاثة أسابيع من عمليات أبولو 11 على السطح، ثم استمرت أجهزة الزلازل في المهمات اللاحقة بالعمل سنوات.",
          },
          data: {
            en: "The seismometers recorded moonquakes: small events from thermal expansion of the surface, deeper events from the Moon cooling and contracting, and occasional impacts.",
            ar: "سجّلت الزلزالات زلازل قمرية: أحداث صغيرة من تمدد السطح الحراري، وأحداث أعمق من برودة القمر وانكماشه، وأحياناً ارتطامات.",
          },
          finding: {
            en: "The Moon is not geologically dead. It is still active, on a human timescale of millions of years rather than days.",
            ar: "القمر ليس ميّتاً جيولوجياً. فما زال نشطاً، على مقياس بشري من الملايين من السنين لا الأيام.",
          },
          significance: {
            en: "The Apollo seismometers gave the first direct measurements of how the Moon's interior moves, and the data is still used to model it.",
            ar: "منحت زلزالات أبولو أول قياسات مباشرة لحركة باطن القمر، ولا تزال البيانات مستخدمة في نمذجته.",
          },
          sourceIds: ["SRC-ALSJ-A11-EASEP", "SRC-APOLLO-11"],
        },
        {
          id: "a11-d2",
          title: {
            en: "A mirror that sends the laser straight back",
            ar: "مرآة تعيد الليزر مباشرةً",
          },
          question: {
            en: "How far is the Moon, exactly?",
            ar: "كم تبعد المسافة إلى القمر بالضبط؟",
          },
          instrument: {
            en: "Laser Ranging Retroreflector (LR-3), part of the Early Apollo Scientific Experiments Package",
            ar: "مُعيد العاكس بالليزر (LR-3)، ضمن حزمة التجارب العلمية المبكرة لأبولو",
          },
          method: {
            en: "Ground observatories fire a short laser pulse at the array and time how long the return takes. A corner-cube mirror sends the light back along almost exactly the path it arrived on.",
            ar: "ترسل المراصد الأرضية نبضة ليزر قصيرة نحو المصفوفة وتقيس زمن العودة. فالمرآة ذات الزوايا الثلاثية تعيد الضوء في المسار نفسه تقريباً الذي جاء منه.",
          },
          data: {
            en: "Because the reflector has no power supply and no moving parts, it has kept working for more than five decades, and the timing data is precise to a few centimetres of the Earth–Moon distance.",
            ar: "ولأن العاكس بلا مصدر طاقة وبلا أجزاء متحركة، فقد ظل يعمل أكثر من خمسة عقود، وبيانات التوقيت دقيقة إلى بضعة سنتيمترات في مسافة الأرض–القمر.",
          },
          finding: {
            en: "The retroreflector lets scientists measure the Earth–Moon distance, track the Moon's orbit and wobble, and test theories of gravity.",
            ar: "يتيح العاكس للعلماء قياس مسافة الأرض–القمر، وتتبّع مدار القمر وتمايله، واختبار نظريات الجاذبية.",
          },
          significance: {
            en: "Apollo 15, 16 and 17 left retroreflectors too. Later lunar missions have used them to test general relativity and to measure the Moon's slow recession from Earth.",
            ar: "تركت أبولو 15 و16 و17 عاكسات أيضاً. وقد استخدمتها المهمات القمرية اللاحقة لاختبار النسبية العامة ولقياس ابتعاد القمر البطيء عن الأرض.",
          },
          sourceIds: ["SRC-NSSDCA-APOLLO-11-LRRR", "SRC-ALSJ-A11-EASEP"],
        },
        {
          id: "a11-d3",
          title: {
            en: "Catching the solar wind with a sheet of foil",
            ar: "التقاط الرياح الشمسية بورقة من المعدن",
          },
          question: {
            en: "What is arriving from the Sun, and does it reach the lunar surface?",
            ar: "ما الذي يصل من الشمس، وهل يصل إلى سطح القمر؟",
          },
          instrument: {
            en: "Solar Wind Composition experiment",
            ar: "تجربة تركيب الرياح الشمسية",
          },
          method: {
            en: "The crew deployed a sheet of aluminium foil on a pole, facing the Sun. The Sun's wind is made of charged particles, and the foil caught them.",
            ar: "نشر الطاقم ورقة من رقاقة الألمنيوم على عمود facing الشمس. الرياح الشمسية مكوّنة من جسيمات مشحونة، وقد التقطتها الورقة.",
          },
          data: {
            en: "The foil captured solar wind particles on the lunar surface. Years later, Apollo 15 astronauts visited and retrieved the sheet so it could be analysed in laboratories on Earth.",
            ar: "التقطت الورقة جسيمات الرياح الشمسية على سطح القمر. وبعد سنوات، زار رواد أبولو 15 الموقع واستعادوا الورقة لتحليلها في مختبرات على الأرض.",
          },
          finding: {
            en: "The solar wind reaches the lunar surface — which matters because it is the same wind that has been slowly stripping away the Martian atmosphere.",
            ar: "تصل الرياح الشمسية إلى سطح القمر — وهذا مهم لأنها الرياح نفسها التي تُنزع ببطء الغلاف الجوي المريخي.",
          },
          significance: {
            en: "It is a rare example of a simple experiment on the Moon that was revisited years later — and it produced a laboratory result rather than a lost measurement.",
            ar: "وهو مثال نادر على تجربة بسيطة على القمر أُعيد إليها الزيارة بعد سنوات، وقد أنتجت نتيجة مخبرية لا قياساً ضائعاً.",
          },
          sourceIds: ["SRC-ALSJ-A11-EASEP", "SRC-APOLLO-11"],
        },
      ],
      media: [
        echoVideo("Apollo_11_moonwalk_montage_720p", {
          alt: {
            en: "NASA montage of highlights from the Apollo 11 moonwalk, showing astronauts working on the lunar surface beside the module.",
            ar: "مقطع من ناسا يجمع أبرز لحظات المشية على القمر في أبولو 11، ويظهر رواد الفضاء يعملون على سطح القمر بجانب الوحدة.",
          },
          caption: {
            en: "A two-minute NASA montage of the Apollo 11 moonwalk. The descent stage you can see behind the astronauts is the object this story is about.",
            ar: "مقطع من ناسا مدته دقيقتان يجمع أبرز مشية أبولو 11. ومرحلة الهبوط التي تراها خلف رواد الفضاء هي موضوع هذه القصة.",
          },
          transcript: {
            en: [
              "NASA montage of the Apollo 11 moonwalk: highlights of the first crewed lunar surface EVA.",
              "The footage shows the astronauts walking on the lunar surface, working beside the lunar module and setting up the experiments.",
              "NASA published this montage from the Apollo 11 surface television footage and photography.",
            ],
            ar: [
              "مقطع من ناسا لمشية أبولو 11 على القمر: أبرز مشية على سطح القمر مأهولة.",
              "تظهر اللقطات رواد الفضاء يمشون على سطح القمر، ويعملون بجانب الوحدة القمرية، ويقامون التجارب.",
              "نشرت ناسا هذا المقطع من بث أبولو 11 التلفزيوني السطحي ومن الصور الفوتوغرافية.",
            ],
          },
        }),
      ],
      quiz: [
        {
          id: "a11-q3",
          prompt: {
            en: "How does the laser retroreflector still work, more than fifty years later?",
            ar: "كيف ما زال العاكس بالليزر يعمل بعد أكثر من خمسين عاماً؟",
          },
          options: [
            {
              id: "a",
              label: {
                en: "A small nuclear battery powers it",
                ar: "بطارية نووية صغيرة تشغّله",
              },
            },
            {
              id: "b",
              label: {
                en: "It needs no power at all — it simply reflects the beam",
                ar: "لا يحتاج طاقة إطلاقاً — إنه يعكس الشعاع ببساطة",
              },
            },
            {
              id: "c",
              label: {
                en: "A lander periodically recharges it",
                ar: "مركبة هبوط تعيد شحنه دورياً",
              },
            },
          ],
          correctOptionId: "b",
          explanation: {
            en: "The retroreflector is passive: it has no power supply and no moving parts. It returns the laser pulse because that is what its corner-cube mirrors do.",
            ar: "العاكس خامل: بلا مصدر طاقة وبلا أجزاء متحركة. فهو يعيد نبضة الليزر لأن هذا ما تفعله مرايته ذات الزوايا الثلاثية.",
          },
        },
      ],
    },
    {
      id: "ending",
      kind: "ending",
      eyebrow: { en: "Chapter five", ar: "الفصل الخامس" },
      title: { en: "The Last Signal", ar: "آخر إشارة" },
      summary: {
        en: "Not a failure — a decision. What happened to each half of Eagle.",
        ar: "ليس فشلاً — بل قرار.ماذا حدث لكل نصف من «إيغل».",
      },
      narrative: {
        en: [
          "The descent stage did not fail and it was not abandoned in a panic. It did exactly what it was built to do. After the ascent stage lifted away on 21 July 1969, the descent stage simply stayed where it was, on its legs, with its engine empty and its equipment bay still holding the folded television camera and the bulk of the science package.",
          "The ascent stage had a different ending. It rendezvoused with Columbia in lunar orbit, the crew transferred back through the hatch, and the ascent stage was jettisoned. It drifted for a while, and debris from it is spread across the lunar surface. Its final resting place is not documented, and GRAVERSE does not claim that it survived intact.",
          "What is documented is this: the descent stage is still on the Moon, in Tranquility Base, essentially as the crew left it. It is the only part of the spacecraft that humans have landed and left behind on purpose, and it is still there.",
        ],
        ar: [
          "لم تفشل مرحلة الهبوط ولم تُترك في عجلة. فقد فعلت تماماً ما صُمِّمت لأجله. بعد أن أقلعت مرحلة الصعود في 21 يوليو 1969، بقيت مرحلة الهبوط ببساطة حيث كانت، على أرجلها، ومحركها فارغ، وغرفة معداتها ما زالت تحمل كاميرا التلفزيون المطوية ومعظم الحزمة العلمية.",
          " أما مرحلة الصعود كان لها نهاية مختلفة. فقد التقابلت مع «كولومبيا» في مدار القمر، وعاد الطاقم عبر الفتحة، وأُفلتت مرحلة الصعود. وقد انجرفت قليلاً، وينتشر حطامها على سطح القمر. أما مكانها النهائي فغير موثّق، ولا يدّعي GRAVERSE أنها نجت سليمة.",
          "وما هو موثّق هو هذا: ما تزال مرحلة الهبوط على القمر، في قاعدة الهدوء، تقريباً كما تركها الطاقم. وهي الجزء الوحيد من المركبة الذي هبط عليه البشر وتركوه عمداً، ولا يزال هناك.",
        ],
      },
      echo: {
        en: "This is the difference that matters. Some hardware stops working and is left behind. This hardware finished its job perfectly and was left behind on purpose.",
        ar: "هذا هو الفرق المهم. بعض العتاد يتعطّل فيُترك. وهذا العتاد أنهى عمله بإتقان ثم تُرك عن قصد.",
      },
      facts: [
        {
          label: { en: "Descent stage", ar: "مرحلة الهبوط" },
          value: {
            en: "Still at Tranquility Base.",
            ar: "ما تزال في قاعدة الهدوء.",
          },
        },
        {
          label: { en: "Ascent stage", ar: "مرحلة الصعود" },
          value: {
            en: "Jettisoned in lunar orbit; final condition not documented.",
            ar: "أُفلتت في مدار القمر؛ حالتها النهائية غير موثّقة.",
          },
        },
        {
          label: { en: "Crew", ar: "الطاقم" },
          value: {
            en: "Returned safely on 24 July 1969.",
            ar: "عادوا سالمين في 24 يوليو 1969.",
          },
        },
      ],
    },
    {
      id: "legacy",
      kind: "legacy",
      eyebrow: { en: "Chapter six", ar: "الفصل السادس" },
      title: { en: "What Remains", ar: "ما الذي يبقى" },
      summary: {
        en: "The oldest spacecraft landing site, and the instruments that still answer questions.",
        ar: "أقدم موقع هبوط لمركبة، والأجهزة التي ما تزال تجيب عن الأسئلة.",
      },
      narrative: {
        en: [
          "Tranquility Base is the most visited piece of lunar real estate in history, and the earliest: every crewed mission since Apollo 11 has landed within a few hundred kilometres of it. Around it lie thousands of items — tool covers, footpads, a discarded seismometer, the solar wind foil, the plaque, and the experiments themselves.",
          "Orbiters have photographed the site repeatedly, including NASA's Lunar Reconnaissance Orbiter in 2011 and India's Chandrayaan-2 in 2019. Those images are how we know the hardware has not moved.",
          "The instruments are the real legacy. The seismometer network, the retroreflectors and the magnetometers from the Apollo surface experiments still feed today's lunar science, and every one of them was designed to run on a machine that had no intention of coming back.",
          "Some missions end quietly. This one did not end at all — it just stopped being a mission and became a laboratory.",
        ],
        ar: [
          "قاعدة الهدوء هي أكثر قطعة من عقار القمر زيارة في التاريخ، وأقدمها: فكل مهمة مأهولة بعد أبولو 11 هبطت على بُعد بضع مئات من الكيلومترات منها. وحولها آلاف القطع — أغطية أدوات، وأقراص أقدام، ومقياس الزلازل متروك، وورقة الرياح الشمسية، واللوحة التذكارية، والتجارب نفسها.",
          "ولقد صوّرت المدارات هذا الموقع مراراً، ومنها مستكشف القمر المداري من ناسا عام 2011، وتشاندرايان-2 الهندية عام 2019. تلك الصور هي سبب معرفتنا أن العتاد لم يتحرك.",
          "أما الأجهزة فهي الإرث الحقيقي. فشبكة الزلازل والعاكسات ومقاييس المغناطيسية من تجارب أبولو السطحية ما تزال تغذّي علم القمر اليوم، وقد صُمّم كل منها ليعمل على آلة لم تكن تنوي العودة إطلاقاً.",
          "بعض المهام تنتهي بهدوء. أما هذه فقد لم تنتهِ — بل توقفت عن كونها مهمة وصارت مختبراً.",
        ],
      },
      echo: {
        en: "Apollo 11 did not end. It just stopped being a mission and became a laboratory that has been running ever since.",
        ar: "لم تنتهِ أبولو 11. بل توقفت عن كونها مهمة وصارت مختبراً يعمل منذ ذلك الحين.",
      },
      facts: [
        {
          label: { en: "Site age", ar: "عمر الموقع" },
          value: {
            en: "More than 57 years of human artefacts in one place.",
            ar: "أكثر من 57 عاماً من آثار البشر في مكان واحد.",
          },
        },
        {
          label: { en: "Still working", ar: "لا يزال يعمل" },
          value: {
            en: "The laser retroreflector and the seismometers.",
            ar: "العاكس بالليزر والزلزالات.",
          },
        },
        {
          label: { en: "Imaged from orbit", ar: "مصور من المدار" },
          value: {
            en: "By NASA Lunar Reconnaissance Orbiter (2011) and Chandrayaan-2 (2019).",
            ar: "بمستكشف القمر المداري من ناسا (2011) وبتشاندرايان-2 (2019).",
          },
        },
      ],
    },
  ],
  legacyStatement: {
    en: "The hardware was left behind on purpose. The science was never left behind at all.",
    ar: "تُرك العتاد عمداً. أما العلم فلم يُترك أبداً.",
  },
  tags: ["moon", "lander", "remnant"],
  artifactId: "apollo-11-lm-descent-stage",
  sourceIds: [
    "SRC-APOLLO-11",
    "SRC-NSSDCA-APOLLO-11-LM",
    "SRC-ALSJ-A11-EASEP",
  ],
  relatedStorySlugs: ["apollo-lunar-surface-experiments", "opportunity"],
  echoIntro: {
    en: "Hi, explorer! Today we are going to the very first place where people landed on another world. And something is still standing there.",
    ar: "مرحباً أيها المستكشف! اليوم نذهب إلى أول مكان هبط فيه البشر على عالم آخر. وهناك لا يزال شيء واقف.",
  },
  echoSignoff: {
    en: "Some things are left behind because they failed. This was left behind because it worked.",
    ar: "بعض الأشياء تُركت لأنها فشلت. أما هذا فترك لأنه نجح.",
  },
  lastVerified: "2026-11-13",
};
