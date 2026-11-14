import type { EchoStory } from "@/types/echo";
import { echoImage } from "./media";

/**
 * VIKING 1 LANDER.
 *
 * Sources: the NASA Science Viking mission pages, NASA/JPL Viking
 * documentation and the GRAVERSE museum record for Viking 1.
 *
 * The biology experiments returned conflicting results and NASA recorded them
 * as inconclusive. This story states that plainly rather than inventing an
 * answer.
 */
export const viking1Story: EchoStory = {
  id: "viking-1-lander",
  slug: "viking-1-lander",
  title: {
    en: "Viking 1 Lander",
    ar: "مركبة هبوط فيكنغ 1",
  },
  storyTitle: {
    en: "The First Photograph From Another World",
    ar: "أول صورة فوتوغرافية من عالم آخر",
  },
  dek: {
    en: "Two spacecraft, six weeks apart, and the first time a machine photographed the ground it was standing on.",
    ar: "مركبتان، بفارق ستة أسابيع، وأوّل مرة صوّرت آلة الأرض التي تقف عليها.",
  },
  summary: {
    en: "Viking 1 landed in July 1976 and took the first colour photograph ever taken from the surface of another planet. It also ran the first biology experiments on Mars, and returned results so ambiguous that NASA has never claimed a detection of life there.",
    ar: "هبطت فيكنغ 1 في يوليو 1976 والتقطت أول صورة ملونة التُقطت من سطح كوكب آخر. كما أجريت أول تجارب بيولوجية على المريخ، وأعادت نتائج مربكة إلى حدّ أن ناسا لم تَعِد قط بإثبات حياة هناك.",
  },
  location: {
    en: "Chryse Planitia, Mars",
    ar: "كريس بلانيا، المريخ",
  },
  locationNote: {
    en: "The lander is at approximately 22.5° north, 50.0° west, in a plain chosen from orbiter images as a possible former wet area.",
    ar: "تقع المركبة عند نحو 22.5° شمالاً و50.0° غرباً، في سهل اختير من صور المدار لأنه منطقة رطبة محتملة سابقاً.",
  },
  equipmentType: {
    en: "Orbiter and lander spacecraft",
    ar: "مركبة مدارية ومركبة هبوط",
  },
  missionPeriod: {
    en: "Launch 20 August 1975 · Landing 20 July 1976 · Lander operated until November 1982",
    ar: "الإطلاق 20 أغسطس 1975 · الهبوط 20 يوليو 1976 · عملت مركبة الهبوط حتى نوفمبر 1982",
  },
  missionStatus: {
    en: "Mission complete — the Viking programme ended in 1982.",
    ar: "اكتملت المهمة — وانتهى برنامج فيكنغ عام 1982.",
  },
  hardwareStatus: {
    en: "Deliberately left on Mars — both Viking landers remain at their landing sites.",
    ar: "تُركت عمداً على المريخ — ما تزال مركبتا الهبوط في مواقعهما.",
  },
  statusKind: "left-behind",
  accent: "#F08A6A",
  accentSoft: "#FBD9C7",
  badge: {
    en: "First Light",
    ar: "أول ضوء",
  },
  badgeKey: "first-light",
  hero: echoImage("PIA00381", {
    alt: {
      en: "The first photograph taken on the surface of Mars, showing the Viking 1 lander's footpad and the rocky plain of Chryse Planitia.",
      ar: "أول صورة فوتوغرافية التُقطت على سطح المريخ، وتُظهر قرص قدم مركبة فيكنغ 1 والسهل الصخري في كريس بلانيا.",
    },
    caption: {
      en: "The first photograph from the surface of Mars, taken on 20 July 1976 by the Viking 1 lander. The frame is mostly sky and ground because the camera was still on the lander's deck.",
      ar: "أول صورة من سطح المريخ، التُقطت في 20 يوليو 1976 بمركبة هبوط فيكنغ 1. وكثير من الإطار سماء وأرض لأن الكاميرا كانت ما تزال على سطح مركبة الهبوط.",
    },
  }),
  gallery: [
    echoImage("PIA00382", {
      alt: {
        en: "A panoramic view of the Martian surface taken by the Viking 1 lander.",
        ar: "منظر بانورامي لسطح المريخ التقطته مركبة هبوط فيكنغ 1.",
      },
      caption: {
        en: "The Viking 1 panoramic view of Chryse Planitia. The horizon is close, the soil is dark, and the rocks are scattered the way wind-sorted debris lies.",
          ar: "المنظر البانورامي لفيكنغ 1 في كريس بلانيا. الأفق قريب، والتربة داكنة، والصخور متفرقة كما تجتمع حين يرتّب الريح الحطام.",
      },
    }),
    echoImage("PIA00565", {
      alt: {
        en: "A small United States flag on a model mounted on the Viking 1 lander, photographed on Mars.",
        ar: "علم أمريكي صغير على نموذج مركّب على مركبة فيكنغ 1، مصوَّر على المريخ.",
      },
      caption: {
        en: "A flag fixed to the Viking lander, part of the hardware that reached the surface. The landers carried flags partly so that photographs could show the scale of the scene.",
          ar: "علم مثبّت على مركبة فيكنغ، وهو جزء من العتاد الذي وصل السطح. وقد حملت المركبتان أعلاماً كي تُظهر الصور مقياس المشهد.",
      },
    }),
    echoImage("PIA10738", {
      alt: {
        en: "The Martian surface near one of the Viking 1 lander footpads.",
        ar: "سطح المريخ قرب أحد أقراص قدم مركبة هبوط فيكنغ 1.",
      },
      caption: {
        en: "The soil around a footpad. Viking did not carry a drill, so its surface science was carried out with scoops and a robotic arm rather than by digging.",
          ar: "التربة حول قرص قدم. لم تحمل فيكنغ مثقاباً، لذا جرى علمها السطحي بمجارف وذراع آلية بدل الحفر.",
      },
    }),
  ],
  facts: [
    {
      label: { en: "Launch vehicle", ar: "مركبة الإطلاق" },
      value: {
        en: "Titan IIIE-Centaur with a Viking lander enclosed in a aeroshell.",
        ar: "تايتان 3E–سنطور مع مركبة الهبوط داخل درع هوائي.",
      },
    },
    {
      label: { en: "Launch", ar: "الإطلاق" },
      value: { en: "20 August 1975", ar: "20 أغسطس 1975" },
    },
    {
      label: { en: "Landing", ar: "الهبوط" },
      value: { en: "20 July 1976", ar: "20 يوليو 1976" },
    },
    {
      label: { en: "Landing site", ar: "موقع الهبوط" },
      value: { en: "Chryse Planitia", ar: "كريس بلانيا" },
    },
    {
      label: { en: "Design lifetime", ar: "العمر التصميمي" },
      value: {
        en: "90 days of surface operation.",
        ar: "90 يوماً من العمل السطحي.",
      },
    },
    {
      label: { en: "Actual lifetime", ar: "العمر الفعلي" },
      value: {
        en: "Over six years of surface operation on the lander.",
        ar: "أكثر من ست سنوات من العمل السطحي على مركبة الهبوط.",
      },
    },
    {
      label: { en: "Imaging", ar: "التصوير" },
      value: {
        en: "Two facsimile cameras with light and colour filters.",
        ar: "كاميرتان فاكsimile بمرشّحات ضوء ولون.",
      },
    },
    {
      label: { en: "Chemistry", ar: "الكيمياء" },
      value: {
        en: "Gas chromatograph–mass spectrometer and an X-ray fluorescence spectrometer.",
        ar: "مقياس كروماتوغرافي غازي–طيفي ومقياس أشعة فلورسنتcence بالأشعة إكس.",
      },
    },
  ],
  model: {
    src: "/models/echoes/viking-lander.glb",
    title: {
      en: "Viking Lander",
      ar: "مركبة هبوط فيكنغ",
    },
    description: {
      en: "NASA's 3D model of the Viking lander. Rotate it and select a part to find out what it was for.",
      ar: "نموذج ناسا ثلاثي الأبعاد لمركبة هبوط فيكنغ. أدرها واختر أي جزء لتعرف وظيفته.",
    },
    credit: "NASA 3D Resources",
    organization: "NASA",
    sourceUrl: "https://science.nasa.gov/3d-resources/",
    provenance: {
      en: "NASA 3D Resources model of the Viking Lander. Free to download and use under the NASA media usage guidelines.",
      ar: "نموذج «مركبة هبوط فيكنغ» من مصادر ناسا ثلاثية الأبعاد. متاح مجاناً للتنزيل والاستخدام وفق إرشادات استخدام وسائط ناسا.",
    },
    hotspots: [
      {
        id: "cameras",
        position: [-0.14, 0.0, 0.74],
        label: { en: "Facsimile cameras", ar: "كاميرات فاكsimile" },
        detail: {
          en: "Two cameras took the first colour photographs from the surface of another planet. They scanned the image line by line, the way a fax machine works.",
          ar: "التقطت كاميرتان أول صور ملونة من سطح كوكب آخر. وقد سحبتا الصورة سطراً بسطر، كما تعمل آلة الفاكس.",
        },
      },
      {
        id: "biology",
        position: [-0.3, 0.12, 0.32],
        label: { en: "Biology package", ar: "الحزمة البيولوجية" },
        detail: {
          en: "Three experiments designed to detect metabolism in soil samples. Their results disagreed with each other, which is why the question is still open.",
          ar: "ثلاث تجارب مصمَّمة لكشف الأيض في عينات التربة. وقد تعارضت نتائجها بعضها مع بعض، ولهذا يبقى السؤال مفتوحاً.",
        },
      },
      {
        id: "antenna",
        position: [-0.76, 0.57, 0.09],
        label: { en: "High-gain antenna", ar: "الهوائي عالي المكسب" },
        detail: {
          en: "The dish that pointed back at Earth. It had to hold a very narrow radio link over a distance of hundreds of millions of kilometres.",
          ar: "الطبق الذي كان يشير إلى الأرض. وكان عليه أن يحافظ على وصلة راديوية ضيقة جداً عبر مئات الملايين من الكيلومترات.",
        },
      },
      {
        id: "sampler",
        position: [-0.2, -0.55, -0.8],
        label: { en: "Soil sampler", ar: "قاطع التربة" },
        detail: {
          en: "A long boom with scoops at the end that picked up soil and delivered it to the chemistry instruments.",
          ar: "ذراع طويلة تنتهي بمجارف، تلتقط التربة وتوصلها إلى أجهزة الكيمياء.",
        },
      },
      {
        id: "legs",
        position: [0.45, -0.6, 0.6],
        label: { en: "Landing legs", ar: "أرجل الهبوط" },
        detail: {
          en: "Three legs with a footpad arrangement that let the lander tip and settle onto the ground under its centre of mass.",
          ar: "ثلاثة أرجل بترتيب أقراص أقدام سمح للمركبة أن تميل وتستقرّ على الأرض تحت مركز ثقلها.",
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
        en: "A laboratory the size of a car, sent to a planet nobody was sure was habitable.",
        ar: "مختبر بحجم سيارة، أُرسل إلى كوكب لم يكن أحد متأكداً من صلاحيته للحياة.",
      },
      narrative: {
        en: [
          "Viking was built on a bet. Before it, only one spacecraft had reached the surface of Mars and transmitted for less than a minute. Everything the mission learned about the planet's surface chemistry, weather and possible biology came from a single lander that operated for just twenty seconds.",
          "Viking was designed to change that. Each spacecraft carried an orbiter and a lander. The orbiter mapped the planet from a polar orbit. The lander carried the science: cameras, a chemistry laboratory, a meteorology station and three experiments that looked for life in the soil.",
          "The lander was a hexagonal platform on three legs, with a dish antenna pointing back up at Earth. Because the lander had to talk to Earth while it sat on the surface, it needed a high-gain antenna and a stable, level seat. Everything about the shape follows from that.",
          "The choice of landing site was made from orbiter images, and it was deliberately cautious. The orbiters had shown dark streaks running downhill in several places on Mars. Some scientists thought these were water channels. Chryse Planitia was picked partly because those streaks seemed to reach it — a place where water might once have spread out and settled.",
        ],
        ar: [
          "بُني فيكنغ على رهان. فقد سبقه مركبة واحدة فقط وصلت إلى سطح المريخ، وبثّت لأقل من دقيقة واحدة. وكل ما عرفته المهمة عن كيمياء سطح الكوكب والطقس وعلم الأحياء المحتمل جاء من مركبة هبوط واحدة عملت عشرين ثانية فقط.",
          "وُضع فيكنغ ليغيّر ذلك. حملت كل مركبة وحدة مدارية ومركبة هبوط. رسم المداري الكوكب من مدار قطبي. وحملت مركبة الهبوط العلم: كاميرات، ومختبر كيمياء، ومحطة طقس، وثلاث تجارب بحثت عن حياة في التربة.",
          "كانت مركبة الهبوط منصة سداسية على ثلاث أرجل، وهوائي طرفي يشير إلى الأرض. ولأن مركبة الهبوط كان عليها أن تتحدث إلى الأرض وهي جالسة على السطح، فقد احتاجت هوائياً عالي المكسب ومقعداً مستقراً ومستوياً. وكل شيء في الشكل ينبع من ذلك.",
          "واختير موقع الهبوط من صور المداري وكان بحذر مقصود. فقد أظهرت المدارات خطوطاً داكنة تنحدر في مواضععديدة على المريخ. ورأى بعض العلماء أنها قنوات مائية. واختيرت كريس بلانيا جزئياً لأن تلك الخطوط بدت وكأنها تصل إليها — مكان قد تكون المياه قد انتشرت فيه واستقرت.",
        ],
      },
      echo: {
        en: "Viking was the first real laboratory on another planet. It was also the first time anybody seriously asked whether Mars was once alive.",
        ar: "كان فيكنغ أول مختبر حقيقي على كوكب آخر. وكان أيضاً أول مرة يسأل أحدهم بجدية: هل كان المريخ حيّاً مرة؟",
      },
      facts: [
        {
          label: { en: "Spacecraft", ar: "المركبة" },
          value: {
            en: "Two orbiters with landers — Viking 1 and Viking 2.",
            ar: "مركبتان مداريتان مع مركبتي هبوط — فيكنغ 1 وفيكنغ 2.",
          },
        },
        {
          label: { en: "Design life", ar: "العمر التصميمي" },
          value: { en: "90 days", ar: "90 يوماً" },
        },
        {
          label: { en: "Surface operations", ar: "العمليات السطحية" },
          value: {
            en: "More than six years on the lander.",
            ar: "أكثر من ست سنوات على مركبة الهبوط.",
          },
        },
      ],
      diagram: {
        kind: "lander-components",
        title: { en: "The Viking lander", ar: "مركبة هبوط فيكنغ" },
        intro: {
          en: "Select a marker to see what that part of the lander did.",
          ar: "اختر أي علامة لترى وظيفة ذلك الجزء من مركبة الهبوط.",
        },
        points: [
          {
            id: "cameras",
            x: 30,
            y: 26,
            label: { en: "Facsimile cameras", ar: "كاميرات فاكsimile" },
            detail: {
              en: "Two cameras with colour filters, scanning line by line. They took the first colour photographs ever taken on another planet.",
              ar: "كاميرتان بمرشّحات لونية، تمسحان الصورة سطراً بسطر. وقد التقطتا أول صور ملونة التُقطت على كوكب آخر.",
            },
          },
          {
            id: "biology",
            x: 68,
            y: 34,
            label: { en: "Biology package", ar: "الحزمة البيولوجية" },
            detail: {
              en: "Three experiments that heated soil and looked for gases released by anything alive in it.",
              ar: "ثلاث تجارب تسخّن التربة وتبحث عن غازات يطلقها كائن حي فيها.",
            },
          },
          {
            id: "sampler",
            x: 50,
            y: 60,
            label: { en: "Soil sampler", ar: "قاطع التربة" },
            detail: {
              en: "A robotic arm with scoops delivered soil to the chemistry instruments without anyone on the ground to help.",
              ar: "ذراع آلية بمجارف أوصالت التربة إلى أجهزة الكيمياء دون أن يساعدها أحد على الأرض.",
            },
          },
          {
            id: "legs",
            x: 24,
            y: 80,
            label: { en: "Landing legs", ar: "أرجل الهبوط" },
            detail: {
              en: "Three legs and footpads that let the lander settle level on uneven ground.",
              ar: "ثلاثة أرجل وأقراص أقدام سمحت للمركبة أن تستقرّ مستوية على أرض غير مستوية.",
            },
          },
        ],
      },
      quiz: [
        {
          id: "viking-q1",
          prompt: {
            en: "What was unusual about the way the Viking mission was built?",
            ar: "ما الذي كان مميزاً في طريقة بناء مهمة فيكنغ؟",
          },
          options: [
            {
              id: "a",
              label: {
                en: "Each spacecraft carried both an orbiter and a lander",
                ar: "أن كل مركبة حملت مدارية ومركبة هبوط معاً",
              },
            },
            {
              id: "b",
              label: {
                en: "It was the first mission to use a rocket to land",
                ar: "أنها كانت أول مهمة تهبط بصاروخ",
              },
            },
            {
              id: "c",
              label: {
                en: "It carried no cameras",
                ar: "أنها لم تحمل كاميرات",
              },
            },
          ],
          correctOptionId: "a",
          explanation: {
            en: "Every Viking spacecraft was a combined orbiter and lander: the orbiter mapped the planet and chose where the lander should go.",
            ar: "كل مركبة من مركبتي فيكنغ كانت مدارية ومركبة هبوط في آن: ترسم المداري الكوكب وتختار موقع الهبوط.",
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
        en: "Chemistry, weather, and the three experiments that asked the hardest question.",
        ar: "الكيمياء والطقس، والتجارب الثلاث التي طرحت أصعب سؤال.",
      },
      narrative: {
        en: [
          "The science on Viking fell into three groups. The first was geology and chemistry: what is the rock made of, what is the soil made of, and how does the atmosphere compare with ours.",
          "The second was weather. The landers carried an instrument that measured pressure, temperature and wind, and they stayed on the surface long enough to watch the seasons change — the first direct measurement of Martian weather over a full cycle.",
          "The third was biology, and it was the part that made the mission famous. Three independent experiments were designed to detect metabolism: the labelled release experiment, the pyrolytic release experiment and the gas exchange experiment. Each heated a sample of Martian soil in a different way and looked for gases that only living chemistry should produce.",
          "The results did not agree. One experiment gave a signal consistent with biology, another gave a negative result, and the third gave a positive result that could also be produced by non-biological chemistry. NASA recorded the results as inconclusive. Decades of later research has found no reason to overturn that reading, and no reason to claim a detection either.",
        ],
        ar: [
          "انقسم علم فيكنغ إلى ثلاث مجموعات. الأولى هي الجيولوجيا والكيمياء: ممّ يتكوّن الصخر، وممّ تتكوّن التربة، وكيف يقارن الغلاف الجوي المريخي غلافنا.",
          "الثانية هي الطقس. حملت مركبتا الهبوط جهازاً يقيس الضغط والحرارة والرياح، وبقيتا على السطح مدة كافية لرؤية تغيّر الفصول — وهو أول قياس مباشر لطقس المريخ عبر دورة كاملة.",
          "أما الثالثة فبيولوجيا، وهي الجزء الذي جعل المهمة شهيرة. صُمِّمت ثلاث تجارب مستقلة لكشف الأيض: تجربة الإطلاق المُعلَّم، وتجربة الانبعاث الحراري، وتجربة تبادل الغازات. سخّنت كل واحدة عينة من تربة المريخ بطريقة مختلفة وبحثت عن غازات لا ينبغي أن تنتجها إلا كيمياء حيّة.",
          " ولم تتطابق النتائج. أعطت تجربة إشارة تتفق مع الأحياء، وأعطت أخرى نتيجة سلبية، وأعطت الثالثة نتيجة إيجابية يمكن أن تنتجها كيمياء لا حيّة. وسجّلت ناسا النتائج على أنها غير حاسمة. ولم تجد الأبحاث اللاحقة سبباً لقلب هذا الحكم، ولا سبباً للمطالبة بإثبات حياة.",
        ],
      },
      echo: {
        en: "This is the part I find most honest in all of space exploration. The team built the experiment, ran it, got a confusing answer, and wrote down 'inconclusive'. They did not pick the exciting option.",
        ar: "هذا أصدق ما في استكشاف الفضاء كله. بنى الفريق التجربة، وأجراها، وحصل على إجابة مربكة، وكتب «غير حاسمة». لم يختاروا الخيار المثير.",
      },
      facts: [
        {
          label: { en: "Biology experiment 1", ar: "التجربة البيولوجية الأولى" },
          value: {
            en: "Labeled release — looked for carbon dioxide released from soil after adding a nutrient.",
            ar: "الإطلاق المُعلَّم — البحث عن ثاني أكسيد الكربون المنطلق من التربة بعد إضافة مادة غذائية.",
          },
        },
        {
          label: { en: "Biology experiment 2", ar: "التجربة البيولوجية الثانية" },
          value: {
            en: "Pyrolytic release — heated soil and looked for gases released by the breakdown of organic molecules.",
            ar: "الانبعاث الحراري — تسخين التربة والبحث عن غازاتreleased من تحلل الجزيئات العضوية.",
          },
        },
        {
          label: { en: "Biology experiment 3", ar: "التجربة البيولوجية الثالثة" },
          value: {
            en: "Gas exchange — measured changes in the soil's atmosphere when the sample was wetted and warmed.",
            ar: "تبادل الغازات — قياس التغيّرات في جو التربة عند ترطيب العينة وتسخينها.",
          },
        },
      ],
      glossary: [
        {
          id: "metabolism",
          term: { en: "Metabolism", ar: "الأيض" },
          simple: {
            en: "The chemical work a living thing does: taking in energy and matter, and giving out waste.",
            ar: "العمل الكيميائي الذي يقوم به الكائن الحي: يأخذ الطاقة والمادة ويطرح النفايات.",
          },
        },
        {
          id: "inconclusive",
          term: { en: "Inconclusive", ar: "غير حاسم" },
          simple: {
            en: "When an experiment does not clearly show yes or no. Saying a result is inconclusive is honest science, not failure.",
            ar: "حين لا تُظهر التجربة نعم أو لا بوضوح. فوصف النتيجة بأنها غير حاسمة هو علم أمانة لا فشل.",
          },
        },
        {
          id: "facsimile",
          term: { en: "Facsimile camera", ar: "كاميرا فاكsimile" },
          simple: {
            en: "An early digital camera that scanned the image line by line instead of taking it all at once — the same idea as a fax machine.",
            ar: "كاميرا رقمية مبكرة تمسح الصورة سطراً بسطر بدل التقاطها دفعة واحدة — الفكرة نفسها كآلة الفاكس.",
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
        en: "A year to Mars, and a landing that almost went wrong.",
        ar: "عام إلى المريخ، وهبوط كاد ينفشل.",
      },
      narrative: {
        en: [
          "Viking 1 launched on 20 August 1975 on a Titan IIIE-Centaur, with the lander sealed inside a protective aeroshell. It was the beginning of a long cruise: about ten months of coasting to reach Mars at the right moment, with the orbiters doing the survey work on arrival.",
          "The landing itself was tense. After atmospheric entry and a parachute, the lander was on the surface for roughly forty seconds before its first touchdown — and it came down on a boulder-strewn slope. The footpad crushed into the rock and the lander tilted, which could have toppled it. It settled, unevenly, and stayed upright.",
          "Then it started working. The first images arrived on Earth the following morning. The chemistry instruments started returning data within days. And the lander kept going, well past its 90-day design life, until its batteries were exhausted in November 1982.",
          "Viking 2 followed six weeks later, landing in Utopia Planitia. Between them the two landers studied two very different parts of the planet and gave the first real long-term picture of Martian surface conditions.",
        ],
        ar: [
          "أُطلقت فيكنغ 1 في 20 أغسطس 1975 على تايتان 3E–سنطور، مع مركبة الهبوط مغلّفة داخل درع هوائي واقٍ. وكان ذلك بداية رحلة طويلة: نحو عشرة أشهر من الانتقال للوصول إلى المريخ في اللحظة المناسبة، معмер يقوم بأعمال المسح عند الوصول.",
          "كان الهبوط نفسه مثيراً للتوتر. بعد الدخول إلى الغلاف الجوي والمظلة، وجدت مركبة الهبوط نفسها على السطح نحو أربعين ثانية قبل أول ملامسة — وقد هبطت على منحدر مرصوق بالصخور. فانهار القرص داخل الصخرة ومالت المركبة، وهو ما كان قادراً على إسقاطها. لكنها استقرت، بشكل غير مستوٍ، وبقيت قائمة.",
          "ثم بدأت العمل. وصلت أول الصور إلى الأرض في صباح اليوم التالي. وبدأت أجهزة الكيمياء تعيد البيانات خلال أيام. واستمرت المركبة، متجاوزة بكثير عمرها التصميمي البالغ 90 يوماً، حتى نفدت بطارياتها في نوفمبر 1982.",
          "تلتها فيكنغ 2 بعد ستة أسابيع، فهبطت في أوتوبيتي بلانيا. وبينهما درست المركبتان جزءين مختلفين تماماً من الكوكب، وقدّمتا أول صورة حقيقية طويلة المدى لظروف سطح المريخ.",
        ],
      },
      echo: {
        en: "The landing was rough. A footpad sank into a rock and the lander tilted — and then it just kept working, for six years.",
        ar: "كان الهبوط عنيفاً. انغرس قرص قدم في صخرة ومالت المركبة — ثم واصلت العمل ببساطة، ست سنوات.",
      },
      timeline: [
        {
          id: "viking-launch",
          date: "1975-08-20",
          dateLabel: { en: "20 August 1975", ar: "20 أغسطس 1975" },
          label: { en: "Launch", ar: "الإطلاق" },
          description: {
            en: "Viking 1 launched from Cape Canaveral on a Titan IIIE-Centaur.",
            ar: "أُطلقت فيكنغ 1 من كيب كانافيرال على تايتان 3E–سنطور.",
          },
          type: "launch",
          sourceIds: ["SRC-VIKING"],
        },
        {
          id: "viking-orbit",
          date: "1976-06-19",
          dateLabel: { en: "19 June 1976", ar: "19 يونيو 1976" },
          label: { en: "Entered orbit", ar: "الالتحاق بالمدار" },
          description: {
            en: "The orbiter captured the lander and used its cameras to survey candidate landing sites.",
            ar: "التقط المداري مركبة الهبوط واستخدم كاميراته لمسح مواقع هبوط مرشّحة.",
          },
          type: "orbit-insertion",
          sourceIds: ["SRC-VIKING"],
        },
        {
          id: "viking-landing",
          date: "1976-07-20",
          dateLabel: { en: "20 July 1976", ar: "20 يوليو 1976" },
          label: { en: "Landing", ar: "الهبوط" },
          description: {
            en: "Viking 1 touched down in Chryse Planitia and settled at an angle after a footpad sank into rock.",
            ar: "هبطت فيكنغ 1 في كريس بلانيا واستقرت بزاوية بعد انغراس قرص قدم في الصخر.",
          },
          type: "landing",
          sourceIds: ["SRC-VIKING"],
        },
        {
          id: "viking-first-image",
          date: "1976-07-21",
          dateLabel: { en: "21 July 1976", ar: "21 يوليو 1976" },
          label: { en: "First image from Mars", ar: "أول صورة من المريخ" },
          description: {
            en: "The lander's cameras returned the first photographs ever taken from the surface of another planet.",
            ar: "أعادت كاميرات مركبة الهبوط أول صور التُقطت من سطح كوكب آخر.",
          },
          type: "first-operation",
          sourceIds: ["SRC-VIKING"],
        },
        {
          id: "viking-2",
          date: "1976-09-03",
          dateLabel: { en: "3 September 1976", ar: "3 سبتمبر 1976" },
          label: { en: "Viking 2 lands", ar: "هبوط فيكنغ 2" },
          description: {
            en: "The second lander touched down in Utopia Planitia, about 1,400 kilometres from the first.",
            ar: "هبطت مركبة الهبوط الثانية في أوتوبيتي بلانيا، على بُعد نحو 1400 كيلومتر من الأولى.",
          },
          type: "landing",
          sourceIds: ["SRC-NSSDCA-VIKING-2"],
        },
        {
          id: "viking-end",
          date: "1982-11-11",
          dateLabel: { en: "November 1982", ar: "نوفمبر 1982" },
          label: { en: "Last transmission", ar: "آخر إرسال" },
          description: {
            en: "Viking 1's batteries were exhausted. The programme was closed the following year.",
            ar: "نفدت بطاريات فيكنغ 1. وأُغلق البرنامج في العام التالي.",
          },
          type: "last-contact",
          sourceIds: ["SRC-VIKING"],
        },
      ],
      diagram: {
        kind: "journey-map",
        title: { en: "The route to Chryse Planitia", ar: "الطريق إلى كريس بلانيا" },
        intro: {
          en: "Ten months, an orbit, then a landing picked from maps made in space.",
          ar: "عشرة أشهر، ثم مدار، ثم هبوط اختير من خرائط رُسمت في الفضاء.",
        },
        route: [
          {
            label: { en: "Launch", ar: "الإطلاق" },
            description: { en: "Cape Canaveral, Earth", ar: "كيب كانافيرال، الأرض" },
          },
          {
            label: { en: "Cruise", ar: "الرحلة البينية" },
            description: {
              en: "About ten months to Mars",
              ar: "نحو عشرة أشهر إلى المريخ",
            },
          },
          {
            label: { en: "Survey", ar: "المسح" },
            description: {
              en: "The orbiter maps the landing site",
              ar: "المداري يرسم موقع الهبوط",
            },
          },
          {
            label: { en: "Landing", ar: "الهبوط" },
            description: {
              en: "Chryse Planitia, 20 July 1976",
              ar: "كريس بلانيا، 20 يوليو 1976",
            },
          },
        ],
        points: [
          {
            id: "earth",
            x: 12,
            y: 58,
            label: { en: "Earth", ar: "الأرض" },
            detail: {
              en: "Launch on 20 August 1975.",
              ar: "الإطلاق في 20 أغسطس 1975.",
            },
          },
          {
            id: "mars",
            x: 84,
            y: 32,
            label: { en: "Mars", ar: "المريخ" },
            detail: {
              en: "Landing in Chryse Planitia on 20 July 1976.",
              ar: "الهبوط في كريس بلانيا في 20 يوليو 1976.",
            },
          },
        ],
      },
      challenge: {
        id: "viking-challenge",
        prompt: {
          en: "Your lander's first image shows a sky that is butterscotch coloured. What does that tell you?",
          ar: "تظهر أول صورة لك في سماء بلونOpenscaramel. ماذا يخبرك ذلك؟",
        },
        options: [
          {
            id: "a",
            label: {
              en: "The sky is full of dust, and the light is scattered on its way down",
              ar: "السماء مليئة بالغبار، والضوء يتشتّت في طريقه إلى الأسفل",
            },
          },
          {
            id: "b",
            label: {
              en: "The Sun on Mars is orange rather than white",
              ar: "شمس المريخ برتقالية لا بيضاء",
            },
          },
          {
            id: "c",
            label: {
              en: "The cameras have a colour fault",
              ar: "في الكاميرات خلل في الألوان",
            },
          },
        ],
        correctOptionId: "a",
        reality: {
          en: "The sky is not orange because the Sun is orange. Martian dust scatters blue light, so the light that reaches the ground is redder, and the sky away from the Sun looks butterscotch. Earth's sky is blue for the same reason in reverse.",
          ar: "السماء ليست برتقالية لأن الشمس برتقالية. فغبار المريخ يشتّت الضوء الأزرق، فيصل الضوء إلى الأرض أَحمرَ، وتبدو السماء بعيداً عن الشمس بلون الكراميل. وسماء الأرض زرقاء للسبب نفسه بالمقلوب.",
        },
      },
    },
    {
      id: "discoveries",
      kind: "discoveries",
      eyebrow: { en: "Chapter four", ar: "الفصل الرابع" },
      title: { en: "The Discoveries", ar: "الاكتشافات" },
      summary: {
        en: "What two landers found in six years of looking at one planet from the ground.",
        ar: "ما وجدته مركبتا هبوط في ست سنوات من النظر إلى كوكب واحد من على الأرض.",
      },
      narrative: {
        en: [
          "Viking did not answer the question people most wanted answered. It answered a set of other questions that turned out to matter more.",
        ],
        ar: [
          "لم يجب فيكنغ عن السؤال الذي أراده الناس أكثر من غيره. بل أجاب عن مجموعة أسئلة أخرى ثبتت أهميتها أكثر.",
        ],
      },
      echo: {
        en: "The biology result was the famous one. But look at what else came out of the same spacecraft — that is the real discovery.",
        ar: "كانت نتيجة الأحياء هي الشهيرة. لكن انظر إلى ما خرج من المركبة نفسها — هذا هو الاكتشاف الحقيقي.",
      },
      discoveries: [
        {
          id: "viking-d1",
          title: {
            en: "Martian air is mostly carbon dioxide",
            ar: "الجو المريخي مكوّن في معظمه من ثاني أكسيد الكربون",
          },
          question: {
            en: "What is the Martian atmosphere actually made of?",
            ar: "مما يتكوّن الغلاف الجوي المريخي فعلاً؟",
          },
          instrument: {
            en: "Gas chromatograph–mass spectrometer",
            ar: "المقياس الكروماتوغرافي الغازي–الطيفي",
          },
          method: {
            en: "The GCMS heated a sample of the Martian atmosphere to separate its gases by boiling point, then weighed each one with a mass spectrometer to identify it.",
            ar: "سخّن المقياس عينة من الغلاف الجوي المريخي لفصل غازاته حسب درجة الغليان، ثم وزن كل غاز بمقياس طيفي لتحديد هويته.",
          },
          data: {
            en: "The atmosphere came back as about 95 percent carbon dioxide, with a few percent nitrogen and only trace amounts of oxygen and water vapour.",
            ar: "جاء الغلاف الجوي نحو 95 في المئة ثاني أكسيد الكربون، مع بضعة في المئة نيتروجين، وكميات ضئيلة جداً من الأكسجين وبخار الماء.",
          },
          finding: {
            en: "Mars has a carbon dioxide atmosphere, and it is far too thin for liquid water to exist stably on the surface today.",
            ar: "لدى المريخ غلاف من ثاني أكسيد الكربون، وهو رقيق جداً لا يسمح بوجود ماء سائل مستقرّ على السطح اليوم.",
          },
          significance: {
            en: "This single measurement explains why Mars lost its atmosphere, why its surface is cold, and why the search for ancient water has to look at the past rather than the present.",
            ar: "هذا القياس الواحد يفسّر لماذا فقد المريخ غلافه، ولماذا يكون سطحه بارداً، ولماذا يجب أن يبحث عن المياه القديمة في الماضي لا في الحاضر.",
          },
          sourceIds: ["SRC-VIKING"],
        },
        {
          id: "viking-d2",
          title: {
            en: "The weather station that watched a whole Martian year",
            ar: "محطة الطقس التي راقبت سنة مريخية كاملة",
          },
          question: {
            en: "How does the weather on Mars change through a year?",
            ar: "كيف يتغيّر طقس المريخ خلال سنة؟",
          },
          instrument: {
            en: "Atmospheric structure instrument on the Viking lander",
            ar: "جهاز بنية الغلاف الجوي على مركبة هبوط فيكنغ",
          },
          method: {
            en: "The lander carried sensors for pressure, temperature and wind, and transmitted continuously. Over more than six years it recorded several complete Martian seasons.",
            ar: "حملت مركبة الهبوط حسّاسات للضغط والحرارة والرياح، وبثّت باستمرار. وعلى مدى أكثر من ست سنوات سجّلت عدة فصول مريخية كاملة.",
          },
          data: {
            en: "The records showed a pressure cycle that follows the seasonal flow of carbon dioxide between the poles and the atmosphere, and daily dust storms that could blanket the whole planet for weeks.",
            ar: "أظهرت السجلات دورة ضغط تتبع التدفّق الموسمي لثاني أكسيد الكربون بين القطبين والغلاف الجوي، وعواصف غبار يومية كانت تستطيع أن تغطي الكوكب كله لأسابيع.",
          },
          finding: {
            en: "Mars has seasons, and they are driven largely by carbon dioxide freezing out of the atmosphere in winter and sublimating back in summer.",
            ar: "للمريخ فصول، وهي تقودها إلى حدّ بعيد عملية تجمّد ثاني أكسيد الكربون من الغلاف الجوي شتاءً وتتسامى صيفاً.",
          },
          significance: {
            en: "It gave scientists the first long-term record of conditions at the surface of another planet, and it is the baseline every later Mars mission is compared against.",
            ar: "منحت العلماء أول سجل طويل الأمد لظروف سطح كوكب آخر، وهي خطّ الأساس الذي تُقارن به كل مهمات المريخ اللاحقة.",
          },
          sourceIds: ["SRC-VIKING"],
        },
        {
          id: "viking-d3",
          title: {
            en: "A result that stayed open",
            ar: "نتيجة بقيت مفتوحة",
          },
          question: {
            en: "Is there life in the Martian soil?",
            ar: "هل توجد حياة في تربة المريخ؟",
          },
          instrument: {
            en: "The Viking biology package: labelled release, pyrolytic release and gas exchange experiments",
            ar: "حزمة فيكنغ البيولوجية: تجارب الإطلاق المُعلَّم والانبعاث الحراري وتبادل الغازات",
          },
          method: {
            en: "Each experiment treated a soil sample differently and looked for gases that indicate living chemistry. The labelled release experiment added a radiolabelled nutrient and watched for carbon dioxide; the pyrolytic release experiment heated soil and looked for released organics; the gas exchange experiment measured changes in the soil's gas envelope.",
            ar: "عالجت كل تجربة عينة تربة بطريقة مختلفة وبحثت عن غازات تدلّ على كيمياء حيّة. فأضافت تجربة الإطلاق المُعلَّم مادة غذائية مُعلَّمة إشعاعياً وراقبت ثاني أكسيد الكربون، وسخّنت تجربة الانبعاث الحراري التربة وبحثت عن مواد عضوية منبعثة، وقيست تجربة تبادل الغازات التغيّرات في الغلاف الغازي للتربة.",
          },
          data: {
            en: "The labelled release experiment produced a positive result. The pyrolytic release experiment produced a negative result. The gas exchange experiment produced a positive result that non-biological reactions could also explain.",
            ar: "أعطت تجربة الإطلاق المُعلَّم نتيجة إيجابية. وأعطت تجربة الانبعث الحراري نتيجة سلبية. وأعطت تجربة تبادل الغازات نتيجة إيجابية يمكن تفسيرها بتفاعلات لا حيّة أيضاً.",
          },
          finding: {
            en: "NASA recorded the results as inconclusive. There has been no verified detection of life on Mars, and no verified reason to rule it out either.",
            ar: "سجّلت ناسا النتائج على أنها غير حاسمة. ولم يحدث كشف موثّق لحياة على المريخ، ولم يحدث أيضاً سبب موثّق لاستبعادها.",
          },
          significance: {
            en: "This is the foundation every later Mars mission built on — Perseverance's sample caching, Curiosity's organics detection and the search for ancient biosignatures all answer a question Viking asked first.",
            ar: "هذا هو الأساس الذي بُنيت عليه كل مهمات المريخ اللاحقة — فتخزين عينات بيرسيفرانس، وكشف الجزيئات العضوية في كوريوسيتي، والبحث عن البصمات الحيوية القديمة كلها تجيب عن سؤال طرحه فيكنغ أولاً.",
          },
          sourceIds: ["SRC-VIKING"],
        },
      ],
      quiz: [
        {
          id: "viking-q2",
          prompt: {
            en: "Why was the Viking biology result described as inconclusive?",
            ar: "لماذا وُصفت نتيجة فيكنغ البيولوجية بأنها غير حاسمة؟",
          },
          options: [
            {
              id: "a",
              label: {
                en: "The experiments were damaged and produced no data",
                ar: "لأن التجارب تلفت ولم تنتج بيانات",
              },
            },
            {
              id: "b",
              label: {
                en: "The three experiments disagreed, and non-biological chemistry could also explain the positive results",
                ar: "لأن التجارب الثلاث تعارضت، وأن كيمياء لا حيّة تستطيع أيضاً تفسير النتائج الإيجابية",
              },
            },
            {
              id: "c",
              label: {
                en: "The instruments were too sensitive to read correctly",
                ar: "لأن الأجهزة كانت حسّاسة أكثر من اللازم لقراءة صحيحة",
              },
            },
          ],
          correctOptionId: "b",
          explanation: {
            en: "One experiment said no, two said something — and the something could also come from reactions that do not need life. NASA reported exactly that, without picking the exciting answer.",
            ar: "قالت تجربة «لا»، وقالت اثنتان «شيء ما» — وكان ذلك الشيء ممكناً أيضاً من تفاعلات لا تحتاج حياة. وقد أبلغت ناسا عن ذلك حرفياً، دون اختيار الإجابة المثير.",
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
        en: "Batteries, not disasters. How both Viking landers ended.",
        ar: "بطاريات، لا كوارث. كيف انتهت مركبتا هبوط فيكنغ.",
      },
      narrative: {
        en: [
          "Viking 1's transmitter fell silent in November 1982, when the lander's batteries ran out. Six years and four months after landing, and six years after the 90-day design life. NASA formally closed the Viking programme the following year, having tried for months to raise the lander.",
          "Viking 2 had already ended quietly. Its lander stopped responding in 1978, and the last images it returned showed a surface buried under a mantle of dust.",
          "Nothing was destroyed. Both landers are still on Mars, sitting where they landed, with their legs partly buried and their cameras facing a sky the colour of butterscotch. Their radioisotope-powered heaters kept them from freezing in the Martian winter for a time, but the power ran out eventually.",
          "It is worth noticing what a Viking lander is doing right now: still standing, still level, still pointed at Earth, waiting for a signal that stopped coming forty years ago.",
        ],
        ar: [
          "سكت مرسل فيكنغ 1 في نوفمبر 1982 حين نفدت بطاريات مركبة الهبوط. ستة أعوام وأربعة أشهر بعد الهبوط، وستة أعوام بعد العمر التصميمي البالغ 90 يوماً. وأغلقت ناسا برنامج فيكنغ رسمياً في العام التالي، بعد أشهر من محاولة إيقاظ المركبة.",
          "وقد انتهت فيكنغ 2 بهدوء قبل ذلك. فقد توقفت مركبة الهبوط عن الاستجابة عام 1978، وأظهرت آخر صورها سطحاً مدفوناً بطبقة من الغبار.",
          "ولم يُدمَّر شيء. فمركبتا الهبوط لا تزالان على المريخ، جالستين حيث هبطتا، وأرجلهما مدفونة جزئياً، وكاميراتهما تواجه سماء بلون الكراميل. وقد أبقتهما سخّاناتهما المعتمدة على نظائر مشعّة من التجمّد في الشتاء المريخي، لكن الطاقة نفدت في النهاية.",
          "تجدر الانتباه لما تفعله مركبة هبوط فيكنغ الآن: لا تزال واقفة، ولا تزال مستوية، ولا تزال موجّهة نحو الأرض، في انتظار إشارة توقفت قبل أربعين عاماً.",
        ],
      },
      echo: {
        en: "No crash, no explosion. Just batteries. Sometimes that is how a machine's story ends — quietly, in the cold.",
        ar: "لا ارتطام ولا انفجار. بطاريات فقط. وأحياناً هكذا تنتهي قصة آلة — بهدوء، في البرد.",
      },
      facts: [
        {
          label: { en: "Viking 1 last transmission", ar: "آخر إرسال من فيكنغ 1" },
          value: { en: "November 1982", ar: "نوفمبر 1982" },
        },
        {
          label: { en: "Surface operations", ar: "مدة العمل السطحي" },
          value: {
            en: "More than six years — about 22 times the design life.",
            ar: "أكثر من ست سنوات — نحو 22 ضعف العمر التصميمي.",
          },
        },
        {
          label: { en: "Viking 2 lander", ar: "مركبة هبوط فيكنغ 2" },
          value: {
            en: "Stopped responding in 1978.",
            ar: "توقفت عن الاستجابة عام 1978.",
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
        en: "The question Viking asked, still being asked on Mars today.",
        ar: "السؤال الذي طرحه فيكنغ، ولا يزال يُطرح على المريخ اليوم.",
      },
      narrative: {
        en: [
          "Every Mars mission since Viking has been, in one sense, a second attempt at Viking. The landers came with a new question: not 'is there life now?' but 'was there life, and for how long?' Curiosity and Perseverance look for ancient organic molecules and for textures left by microbes, because Viking showed how hard it is to answer the first question and how expensive it is to guess.",
          "The engineering of Viking survived too. The ideas of a lander carrying its own chemistry laboratory, of an orbiter choosing the landing site from its own images, and of a spacecraft designed to survive far longer than its design life all became standard practice.",
          "And the two landers are still there. Their radioisotope heaters ran out decades ago, so they are cold now, and their batteries are dead. But the structures they built — the legs, the deck, the dish antenna — are exactly where the pictures from orbit show them to be.",
          "Every other planet has hardware of its own, but very little of it was ever designed to be photographed and studied for fifty years. Viking was.",
        ],
        ar: [
          "كل مهمة مريخية بعد فيكنغ كانت، بمعنى واحد، محاولة ثانية لفيكنغ. فقد جاءت مركبات الهبوط بسؤال جديد: ليس «هل توجد حياة الآن؟» بل «هل كانت هناك حياة، وكم استمرت؟». تبحث كوريوسيتي وبيرسيفرانس عن جزيئات عضوية قديمة وعن بنى خلّتها الأحياء، لأن فيكنغ أظهر كم يصعب الإجابة عن السؤال الأول وكم يكلف التخمين.",
          "وهندسة فيكنغ نجت أيضاً. فقد أصبحت الأفكار الأساسية — مركبة هبوط تحمل مختبر كيميائها الخاص، ومداري يختار موقع الهبوط من صوره، ومركبة مصمَّمة لتبقى أطول بكثير من عمرها التصميمي — ممارسات معتمدة.",
          "ومركبتا الهبوط لا تزالان هناك. فقد نفدت سخّاناتهما المعتمدة على النظائر المشعّة قبل عقود، فصارتا باردتين وبطارياتهما ميتة. لكن البنى التي شيّدتها — الأرجل، والسطح، وهوائي الطبق — هي تماماً حيث تُظهر صور المدار أنها الآن.",
          "ولكل كوكب آخر عتاده الخاص، لكن قليلاً منه صُمّم ليُصوَّر ويُدرس لخمسين عاماً. فيكنغ صُمّم لذلك.",
        ],
      },
      echo: {
        en: "Viking asked the biggest question in Mars exploration and got an honest answer: we do not know yet. That is still where we are.",
        ar: "طرح فيكنغ أكبر سؤال في استكشاف المريخ وحصل على إجابة أمينة: لا نعرف بعد. ما زلنا هناك.",
      },
      facts: [
        {
          label: { en: "First colour images from another planet", ar: "أول صور ملونة من كوكب آخر" },
          value: { en: "20 July 1976", ar: "20 يوليو 1976" },
        },
        {
          label: { en: "Still on Mars", ar: "لا تزالان على المريخ" },
          value: {
            en: "Both landers, at Chryse Planitia and Utopia Planitia.",
            ar: "مركبتا الهبوط، في كريس بلانيا وأوتوبيتي بلانيا.",
          },
        },
        {
          label: { en: "Science still running", ar: "علم لا يزال يعمل" },
          value: {
            en: "Atmospheric composition, seasonal weather, and the Mars soil question.",
            ar: "تركيب الغلاف الجوي، والطقس الموسمي، وسؤال تربة المريخ.",
          },
        },
      ],
    },
  ],
  legacyStatement: {
    en: "The mission ended. The knowledge did not.",
    ar: "انتهت المهمة. أما المعرفة فلا.",
  },
  tags: ["mars", "lander", "remnant", "instrument"],
  artifactId: "viking-1-lander",
  sourceIds: ["SRC-VIKING", "SRC-NSSDCA-VIKING-2"],
  relatedStorySlugs: ["sojourner", "opportunity"],
  echoIntro: {
    en: "In 1976 a machine took the first photograph of the ground it was standing on, on another planet. Let us go and meet it.",
    ar: "عام 1976 التقطت آلة أول صورة للأرض التي تقف عليها، على كوكب آخر. فلنذهب ونتعرّف عليها.",
  },
  echoSignoff: {
    en: "Two landers, still standing, still waiting. The question they asked is still the one we are working on.",
    ar: "مركبتا هبوط، لا تزالان واقفتين، لا تزالان تنتظران. والسؤال الذي طرحاه هو نفسه السؤال الذي نعمل عليه.",
  },
  lastVerified: "2026-11-13",
};
