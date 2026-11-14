import type { EchoStory } from "@/types/echo";
import { echoImage } from "./media";

/**
 * VIKING 2 — the second lander, the second site, the same unanswered question.
 *
 * Sources: the NASA Viking mission pages, the NSSDCA Viking 2 record and the
 * GRAVERSE museum record for Viking 2.
 */
export const viking2Story: EchoStory = {
  id: "viking-2-lander",
  slug: "viking-2-lander",
  title: {
    en: "Viking 2 Lander",
    ar: "مركبة الهبوط فايكنغ 2",
  },
  storyTitle: {
    en: "The Second Landing",
    ar: "الهبوط الثاني",
  },
  dek: {
    en: "Viking 1 landed first. Viking 2 landed somewhere colder, stranger and dusted with frost — and stayed for more than three years.",
    ar: "هبطت فايكنغ 1 أولاً. وهبطت فايكنغ 2 في مكان أبرد وأغرب تكسوه الصقيع، وبقيت أكثر من ثلاث سنوات.",
  },
  summary: {
    en: "Viking 2 arrived at Mars in 1976, a few weeks after its twin. Its lander touched down at Utopia Planitia on 3 September and became the second spacecraft to work on the Martian surface. It sent back pictures of a frost-covered plain, measured the weather and ran the same biology experiments as Viking 1. It kept returning data until April 1980, outlasting its designed mission by years.",
    ar: "وصلت فايكنغ 2 إلى المريخ في 1976، بعد توأمتها بأسابيع قليلة. وهبطت مركبتها في يوتوبيا بلانيتيا في 3 سبتمبر، فصارت ثاني مركبة فضائية تعمل على سطح المريخ. أعادت صوراً لسهل يكسوه الصقيع، وقاست الطقس، وأجرت تجارب الحياة نفسها التي أجرتها فايكنغ 1. وواصلت إرسال البيانات حتى أبريل 1980، فتجاوت مهمتها المخططة بسنوات.",
  },
  location: {
    en: "Utopia Planitia, Mars",
    ar: "يوتوبيا بلانيتيا، المريخ",
  },
  locationNote: {
    en: "Utopia Planitia is a broad northern plain. Viking 2 landed at a higher latitude than Viking 1, which is why its cameras saw frost.",
    ar: "يوتوبيا بلانيتيا سهل شمالي واسع. هبطت فايكنغ 2 عند خط عرض أعلى من فايكنغ 1، ولهذا رأت كاميراتها الصقيع.",
  },
  equipmentType: {
    en: "Stationary Mars lander",
    ar: "مركبة هبوط مريخية ثابتة",
  },
  missionPeriod: {
    en: "Launch 9 September 1975 · Landing 3 September 1976 · Last contact 11 April 1980",
    ar: "الإطلاق 9 سبتمبر 1975 · الهبوط 3 سبتمبر 1976 · آخر اتصال 11 أبريل 1980",
  },
  missionStatus: {
    en: "Mission complete — Viking 2 operated until April 1980, when a battery failure ended contact.",
    ar: "اكتملت المهمة — عملت فايكنغ 2 حتى أبريل 1980، حين أنهى عطل في البطارية التواصل.",
  },
  hardwareStatus: {
    en: "Inactive — the lander remains at Utopia Planitia.",
    ar: "غير نشطة — ما زالت المركبة في يوتوبيا بلانيتيا.",
  },
  statusKind: "silent",
  accent: "#C97B63",
  accentSoft: "#F4DDD6",
  badge: {
    en: "Second World",
    ar: "العالم الثاني",
  },
  badgeKey: "second-world",
  hero: echoImage("PIA00396", {
    alt: {
      en: "The first picture from Viking Lander 2 on the surface of Mars, showing rocks and a dusty plain.",
      ar: "أول صورة من مركبة الهبوط فايكنغ 2 على سطح المريخ، وتظهر صخوراً وسهلاً مغبراً.",
    },
    caption: {
      en: "Viking Lander 2's first image from Utopia Planitia, September 1976. The surface was rockier and colder than the Viking 1 site.",
      ar: "أول صورة لمركبة الهبوط فايكنغ 2 من يوتوبيا بلانيتيا في سبتمبر 1976. كان السطح أكثر صخرية وأبرد من موقع فايكنغ 1.",
    },
  }),
  gallery: [
    echoImage("PIA00568", {
      alt: {
        en: "The first colour image of the Viking Lander 2 site, showing reddish soil and scattered rocks.",
        ar: "أول صورة ملونة لموقع مركبة الهبوط فايكنغ 2، وتظهر تربة حمراء وصخوراً متفرقة.",
      },
      caption: {
        en: "The first colour view from Viking 2. The reddish soil and dark rocks were similar in colour to the Viking 1 site, but the terrain was different.",
        ar: "أول منظر ملون من فايكنغ 2. كانت التربة الحمراء والصخور الداكنة مشابهة في اللون لموقع فايكنغ 1، لكن التضاريس كانت مختلفة.",
      },
    }),
    echoImage("PIA00573", {
      alt: {
        en: "Frost coating the surface at the Viking Lander 2 site.",
        ar: "صقيع يكسو السطح في موقع مركبة الهبوط فايكنغ 2.",
      },
      caption: {
        en: "Water frost at Utopia Planitia. Viking 2's cameras recorded seasonal frost, a sign that water vapour was moving between the atmosphere and the surface.",
        ar: "صقيع مائي في يوتوبيا بلانيتيا. سجلت كاميرات فايكنغ 2 صقيعاً موسمياً، وهي علامة على انتقال بخار الماء بين الغلاف الجوي والسطح.",
      },
    }),
    echoImage("PIA01882", {
      alt: {
        en: "An orbital view of the Viking Lander 2 site at Utopia Planitia.",
        ar: "منظر مداري لموقع مركبة الهبوط فايكنغ 2 في يوتوبيا بلانيتيا.",
      },
      caption: {
        en: "The Viking 2 landing site seen from orbit. The lander's exact position was later located in high-resolution images.",
        ar: "موقع هبوط فايكنغ 2 من المدار. وقد حُدد موقع المركبة بدقة لاحقاً في صور عالية الدقة.",
      },
    }),
  ],
  facts: [
    {
      label: { en: "Launch mass", ar: "كتلة الإطلاق" },
      value: { en: "About 3,530 kg for orbiter and lander", ar: "نحو 3,530 كغ للمدار والمركبة" },
    },
    {
      label: { en: "Lander mass", ar: "كتلة المركبة" },
      value: { en: "About 576 kg", ar: "نحو 576 كغ" },
    },
    {
      label: { en: "Landing site", ar: "موقع الهبوط" },
      value: { en: "Utopia Planitia", ar: "يوتوبيا بلانيتيا" },
    },
    {
      label: { en: "Landing date", ar: "تاريخ الهبوط" },
      value: { en: "3 September 1976", ar: "3 سبتمبر 1976" },
    },
    {
      label: { en: "Last contact", ar: "آخر اتصال" },
      value: { en: "11 April 1980", ar: "11 أبريل 1980" },
    },
    {
      label: { en: "Power", ar: "الطاقة" },
      value: {
        en: "Radioisotope thermoelectric generators on the lander.",
        ar: "مولدات كهربائية حرارية نظائرية على المركبة.",
      },
    },
  ],
  chapters: [
    {
      id: "meet",
      kind: "meet",
      eyebrow: { en: "Chapter one", ar: "الفصل الأول" },
      title: { en: "Meet the Twin", ar: "تعرّف على التوأم" },
      summary: {
        en: "Viking 1 was the first. Viking 2 was the control experiment — a second look at a different place.",
        ar: "كانت فايكنغ 1 الأولى. وكانت فايكنغ 2 تجربة الضبط — نظرة ثانية إلى مكان مختلف.",
      },
      narrative: {
        en: [
          "The Viking programme sent two complete spacecraft to Mars: an orbiter to map and relay, and a lander to touch down. Viking 1 landed first, on 20 July 1976, in Chryse Planitia. Viking 2 was the second half of the experiment, and it was deliberately sent somewhere else.",
          "Its lander came down at Utopia Planitia on 3 September 1976, farther north than Viking 1. The site was chosen partly from orbital images and partly from the need to test a second kind of terrain. If the same instruments found the same things in two different places, the results would mean far more.",
          "The lander carried cameras, a weather station, a robotic arm and a set of biology experiments. It also carried a gas chromatograph and mass spectrometer to look for organic molecules in the soil. It was less a single robot than a small laboratory dropped onto another planet.",
        ],
        ar: [
          "أرسل برنامج فايكنغ مركبتين فضائيتين كاملتين إلى المريخ: مركبة مدارية للرسم والاتصال، ومركبة هبوط للمس السطح. هبطت فايكنغ 1 أولاً في 20 يوليو 1976 في خريسي بلانيتيا. وكانت فايكنغ 2 النصف الثاني من التجربة، وقد أُرسلت عن قصد إلى مكان آخر.",
          "نزلت مركبتها في يوتوبيا بلانيتيا في 3 سبتمبر 1976، إلى الشمال من موقع فايكنغ 1. واختير الموقع جزئياً من الصور المدارية، وجزئياً من الحاجة إلى اختبار نوع ثانٍ من التضاريس. فإذا وجدت الأجهزة نفسها الأشياء نفسها في مكانين مختلفين، لكانت النتائج أعمق معنى بكثير.",
          "حملت المركبة كاميرات ومحطة طقس وذراعاً آلية ومجموعة تجارب للحياة. وحملت أيضاً جهاز كروماتوغرافيا غازية ومطياف كتلة للبحث عن جزيئات عضوية في التربة. لم تكن روبوتاً واحداً بقدر ما كانت مختبراً صغيراً أُسقط على كوكب آخر.",
        ],
      },
      echo: {
        en: "One landing is a story. Two landings in two places is evidence.",
        ar: "هبوط واحد حكاية. أما هبوطان في مكانين مختلفين فهو دليل.",
      },
      facts: [
        {
          label: { en: "Twin", ar: "التوأم" },
          value: { en: "Viking 1", ar: "فايكنغ 1" },
        },
        {
          label: { en: "Why a second site", ar: "لماذا موقع ثانٍ" },
          value: {
            en: "To separate local conditions from planet-wide ones.",
            ar: "للفصل بين الظروف المحلية وظروف الكوكب كله.",
          },
        },
        {
          label: { en: "Instruments", ar: "الأجهزة" },
          value: {
            en: "Cameras, weather sensors, a robotic arm and biology experiments.",
            ar: "كاميرات وحساسات طقس وذراع آلية وتجارب للحياة.",
          },
        },
      ],
      diagram: {
        kind: "lander-components",
        title: { en: "The Viking 2 lander", ar: "مركبة هبوط فايكنغ 2" },
        intro: {
          en: "Select a marker to see what that part of the lander did.",
          ar: "اختر أي علامة لترى وظيفة ذلك الجزء من مركبة الهبوط.",
        },
        points: [
          {
            id: "cameras",
            x: 30,
            y: 26,
            label: { en: "Cameras", ar: "الكاميرات" },
            detail: {
              en: "Two cameras scanned the scene line by line and sent back the first pictures of Utopia Planitia.",
              ar: "التقطت كاميرتان المشهد سطراً بسطر وأرسلتا أول صور يوتوبيا بلانيتيا.",
            },
          },
          {
            id: "biology",
            x: 68,
            y: 34,
            label: { en: "Biology experiments", ar: "تجارب الحياة" },
            detail: {
              en: "Three experiments fed soil samples and looked for signs of living chemistry — the same package as Viking 1, so the two sites could be compared.",
              ar: "ثلاث تجارب غذّت عينات التربة وبحثت عن علامات كيمياء حيّة — الحزمة نفسها كفايكنغ 1، ليكون الموقعان قابلين للمقارنة.",
            },
          },
          {
            id: "sampler",
            x: 50,
            y: 60,
            label: { en: "Soil sampler", ar: "قاطع التربة" },
            detail: {
              en: "A robotic arm with a scoop dug into the ground and delivered samples to the instruments inside the lander.",
              ar: "ذراع آلية بمجارف حفرت في الأرض وسلّمت عينات إلى الأجهزة داخل المركبة.",
            },
          },
          {
            id: "legs",
            x: 24,
            y: 80,
            label: { en: "Landing legs", ar: "أرجل الهبوط" },
            detail: {
              en: "Three legs with footpads that settled on the rocky plain and took the shock of touchdown.",
              ar: "ثلاثة أرجل بأقراص أقدام استقرت على السهل الصخري وتحمّلت صدمة الهبوط.",
            },
          },
        ],
      },
      quiz: [
        {
          id: "vk2-q1",
          prompt: {
            en: "Why did NASA send Viking 2 to a different site from Viking 1?",
            ar: "لماذا أرسلت ناسا فايكنغ 2 إلى موقع مختلف عن موقع فايكنغ 1؟",
          },
          options: [
            {
              id: "a",
              label: {
                en: "To compare two different places on the same planet.",
                ar: "لمقارنة مكانين مختلفين على الكوكب نفسه.",
              },
            },
            {
              id: "b",
              label: {
                en: "Because the first landing site was destroyed.",
                ar: "لأن موقع الهبوط الأول دُمّر.",
              },
            },
            {
              id: "c",
              label: {
                en: "Because Viking 2 could not reach the first site.",
                ar: "لأن فايكنغ 2 لم تستطع الوصول إلى الموقع الأول.",
              },
            },
          ],
          correctOptionId: "a",
          explanation: {
            en: "Two landers at two sites let scientists compare local conditions with planet-wide ones. That is why the mission was designed as a pair.",
            ar: "أتاحت مركبتان في موقعين للعلماء مقارنة الظروف المحلية بظروف الكوكب كله. ولهذا صُممت المهمة كزوج.",
          },
        },
      ],
    },
    {
      id: "mission",
      kind: "mission",
      eyebrow: { en: "Chapter two", ar: "الفصل الثاني" },
      title: { en: "Frost and Dust", ar: "الصقيع والغبار" },
      summary: {
        en: "Viking 2 landed in a colder place, watched the seasons turn, and kept working until 1980.",
        ar: "هبطت فايكنغ 2 في مكان أبرد، وراقبت تعاقب الفصول، وواصلت العمل حتى 1980.",
      },
      narrative: {
        en: [
          "Viking 2 launched on 9 September 1975 and entered orbit around Mars in August 1976. The lander separated, descended through the thin atmosphere and touched down at Utopia Planitia on 3 September. It began sending images within minutes.",
          "The site looked different from Chryse Planitia. There were rocks, dunes and a surface that changed with the seasons. In winter the cameras saw frost on the ground — not a thick snow, but a thin coating that came and went with the Martian weather.",
          "The lander's weather station recorded pressure, temperature and wind for years. Its cameras watched dust storms and the changing colour of the sky. Its arm dug into the soil and delivered samples to the instruments inside the lander.",
        ],
        ar: [
          "انطلقت فايكنغ 2 في 9 سبتمبر 1975 ودخلت مدار المريخ في أغسطس 1976. وانفصلت المركبة ونزلت عبر الغلاف الجوي الرقيق ولمست السطح في يوتوبيا بلانيتيا في 3 سبتمبر. وبدأت إرسال الصور في دقائق.",
          "بدا الموقع مختلفاً عن خريسي بلانيتيا. كانت فيه صخور وكثبان وسطح يتغير مع الفصول. وفي الشتاء رأت الكاميرات صقيعاً على الأرض — لا ثلجاً سميكاً، بل طبقة رقيقة تجيء وتذهب مع طقس المريخ.",
          "سجلت محطة الطقس في المركبة الضغط ودرجة الحرارة والرياح لسنوات. وراقبت كاميراتها العواصف الغبارية وتغير لون السماء. وحفرت ذراعها في التربة وسلّمت عينات إلى الأجهزة داخل المركبة.",
        ],
      },
      echo: {
        en: "Frost on Mars is not a decoration. It is water moving from the air to the ground and back.",
        ar: "الصقيع على المريخ ليس زينة. إنه ماء ينتقل من الهواء إلى الأرض ثم يعود.",
      },
      glossary: [
        {
          id: "frost",
          term: { en: "Frost", ar: "الصقيع" },
          simple: {
            en: "A thin coating of ice that forms when water vapour in the air freezes onto the ground.",
            ar: "طبقة رقيقة من الجليد تتكوّن حين يتجمّد بخار الماء من الهواء على الأرض.",
          },
        },
        {
          id: "dust-storm",
          term: { en: "Dust storm", ar: "عاصفة غبار" },
          simple: {
            en: "A storm of fine dust lifted by the wind. On Mars one can cover the whole planet and last for months.",
            ar: "عاصفة من غبار دقيق يرفعه الريح. وعلى المريخ قد تغطي الكوكب كله وتستمر شهوراً.",
          },
        },
        {
          id: "seismometer",
          term: { en: "Seismometer", ar: "الجهاز الزلزالي" },
          simple: {
            en: "An instrument that measures shaking in the ground. Viking 2 carried the first one ever to work on the surface of another planet.",
            ar: "جهاز يقيس الاهتزاز في الأرض. حملت فايكنغ 2 أول جهاز من نوعه يعمل على سطح كوكب آخر.",
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
        en: "A year of coasting to Mars, and a landing on a plain colder and rockier than the first.",
        ar: "عام من السير نحو المريخ، وهبوط في سهل أبرد وأكثر صخرية من الموقع الأول.",
      },
      narrative: {
        en: [
          "Viking 2 launched on 9 September 1975 on a Titan IIIE-Centaur, a few weeks after its twin. The spacecraft carried an orbiter and a lander sealed inside an aeroshell, and it coasted toward Mars for about eleven months.",
          "It reached Mars in August 1976. The orbiter went into orbit first and photographed the candidate landing sites from above. On 3 September the lander separated, fell through the thin atmosphere behind a parachute, fired its braking rockets and touched down at Utopia Planitia. Its first picture reached Earth within minutes.",
          "Utopia Planitia was a colder place than Viking 1's plain: farther north, rockier, and subject to a winter that laid a thin frost on the ground. The lander settled in for a long watch. Its weather station tracked pressure, temperature and wind through the seasons, its arm dug into the soil, and its seismometer — the first ever to work on the surface of another planet — felt the ground for tremors.",
          "The mission was designed to last about 90 sols. Viking 2 kept working for 1,281 sols — more than three years of continuous watching — until a failure in its battery ended the conversation on 11 April 1980.",
        ],
        ar: [
          "انطلقت فايكنغ 2 في 9 سبتمبر 1975 على تايتان 3E–سنتور، بعد توأمتها بأسابيع قليلة. حملت المركبة مدارية ومركبة هبوط مغلّفة داخل درع هوائي، وسارت نحو المريخ نحو أحد عشر شهراً.",
          "وصلت إلى المريخ في أغسطس 1976. التحق المداري بالمدار أولاً وصوّر مواقع الهبوط المرشحة من الأعلى. وفي 3 سبتمبر انفصلت مركبة الهبوط، وسقطت عبر الغلاف الجوي الرقيق خلف مظلة، وأشعلت صواريخ التباطؤ ولمست السطح في يوتوبيا بلانيتيا. ووصلت أول صورتها إلى الأرض في دقائق.",
          "كانت يوتوبيا بلانيتيا أبرد من سهل فايكنغ 1: أبعد شمالاً، وأكثر صخرية، وتتعرض لشتاء يضع طبقة رقيقة من الصقيع على الأرض. واستقرت المركبة للمراقبة الطويلة. تتبعت محطة الطقس الضغط والحرارة والرياح عبر الفصول، وحفرت ذراعها في التربة، وحسّ جهازها الزلزالي — الأول من نوعه الذي يعمل على سطح كوكب آخر — الأرض بحثاً عن اهتزازات.",
          "صُممت المهمة لتدوم نحو 90 يوماً مريخياً. لكن فايكنغ 2 واصلت العمل 1,281 يوماً مريخياً — أكثر من ثلاث سنوات من المراقبة المتصلة — حتى أنهى عطل في بطاريتها الحوار في 11 أبريل 1980.",
        ],
      },
      echo: {
        en: "A year of coasting, then a few minutes of falling. That is what it costs to start watching the weather on another planet.",
        ar: "عام من السير بين الكواكب، ثم دقائق من السقوط. هذا هو ثمن بدء مراقبة الطقس على كوكب آخر.",
      },
      timeline: [
        {
          id: "vk2-launch",
          date: "1975-09-09",
          dateLabel: { en: "9 September 1975", ar: "9 سبتمبر 1975" },
          label: { en: "Launch", ar: "الإطلاق" },
          description: {
            en: "Viking 2 lifted off on a Titan IIIE-Centaur rocket, carrying an orbiter and a lander.",
            ar: "انطلقت فايكنغ 2 على صاروخ تايتان 3E–سنتور، حاملة مركبة مدارية ومركبة هبوط.",
          },
          type: "launch",
          sourceIds: ["SRC-NSSDCA-VIKING-2"],
        },
        {
          id: "vk2-arrival",
          date: "1976-08-07",
          dateLabel: { en: "August 1976", ar: "أغسطس 1976" },
          label: { en: "Arrival at Mars", ar: "الوصول إلى المريخ" },
          description: {
            en: "The Viking 2 orbiter entered orbit and began surveying the planet and the candidate landing sites.",
            ar: "دخلت مركبة فايكنغ 2 المدارية مداراً حول المريخ وبدأت مسح الكوكب ومواقع الهبوط المرشحة.",
          },
          type: "milestone",
          sourceIds: ["SRC-NSSDCA-VIKING-2"],
        },
        {
          id: "vk2-landing",
          date: "1976-09-03",
          dateLabel: { en: "3 September 1976", ar: "3 سبتمبر 1976" },
          label: { en: "Landing at Utopia Planitia", ar: "الهبوط في يوتوبيا بلانيتيا" },
          description: {
            en: "Viking 2 touched down and returned its first image of the surface.",
            ar: "لمست فايكنغ 2 السطح وأعادت أول صورة له.",
          },
          type: "landing",
          sourceIds: ["SRC-NSSDCA-VIKING-2", "SRC-NASA-VIKING"],
        },
        {
          id: "vk2-frost",
          date: "1976-11-01",
          dateLabel: { en: "First Martian winter", ar: "أول شتاء مريخي" },
          label: { en: "Frost appears", ar: "ظهور الصقيع" },
          description: {
            en: "The lander's cameras recorded frost on the surface as winter arrived at the northern site.",
            ar: "سجلت كاميرات المركبة صقيعاً على السطح مع حلول الشتاء في الموقع الشمالي.",
          },
          type: "milestone",
          sourceIds: ["SRC-NSSDCA-VIKING-2"],
        },
        {
          id: "vk2-last",
          date: "1980-04-11",
          dateLabel: { en: "11 April 1980", ar: "11 أبريل 1980" },
          label: { en: "Last contact", ar: "آخر اتصال" },
          description: {
            en: "A failure in the lander's battery ended communications after more than three years of operation.",
            ar: "أنهى عطل في بطارية المركبة التواصل بعد أكثر من ثلاث سنوات من العمل.",
          },
          type: "last-contact",
          sourceIds: ["SRC-NSSDCA-VIKING-2"],
        },
      ],
      diagram: {
        kind: "journey-map",
        title: { en: "The route to Utopia Planitia", ar: "الطريق إلى يوتوبيا بلانيتيا" },
        intro: {
          en: "From a launch pad in Florida to a plain of rocks and frost in the north of Mars.",
          ar: "من منصة إطلاق في فلوريدا إلى سهل من الصخور والصقيع في شمال المريخ.",
        },
        route: [
          {
            label: { en: "Launch", ar: "الإطلاق" },
            description: {
              en: "Cape Canaveral, 9 September 1975",
              ar: "كيب كانافيرال، 9 سبتمبر 1975",
            },
          },
          {
            label: { en: "Cruise", ar: "الرحلة البينية" },
            description: {
              en: "About eleven months to Mars",
              ar: "نحو أحد عشر شهراً إلى المريخ",
            },
          },
          {
            label: { en: "Mars orbit", ar: "مدار المريخ" },
            description: {
              en: "Surveying the candidate landing sites",
              ar: "مسح مواقع الهبوط المرشحة",
            },
          },
          {
            label: { en: "Landing", ar: "الهبوط" },
            description: {
              en: "Utopia Planitia, 3 September 1976",
              ar: "يوتوبيا بلانيتيا، 3 سبتمبر 1976",
            },
          },
          {
            label: { en: "Surface watch", ar: "المراقبة السطحية" },
            description: {
              en: "1,281 sols, until 11 April 1980",
              ar: "1,281 يوماً مريخياً، حتى 11 أبريل 1980",
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
              en: "Launch on a Titan IIIE-Centaur, 9 September 1975.",
              ar: "الإطلاق على تايتان 3E–سنتور، 9 سبتمبر 1975.",
            },
          },
          {
            id: "cruise",
            x: 36,
            y: 35,
            label: { en: "Cruise", ar: "الرحلة البينية" },
            detail: {
              en: "About eleven months of coasting to Mars.",
              ar: "نحو أحد عشر شهراً من الانتقال إلى المريخ.",
            },
          },
          {
            id: "orbit",
            x: 60,
            y: 26,
            label: { en: "Mars orbit", ar: "مدار المريخ" },
            detail: {
              en: "The orbiter surveyed the planet and the candidate landing sites.",
              ar: "مسح المداري الكوكب ومواقع الهبوط المرشحة.",
            },
          },
          {
            id: "utopia",
            x: 84,
            y: 32,
            label: { en: "Utopia Planitia", ar: "يوتوبيا بلانيتيا" },
            detail: {
              en: "The landing on 3 September 1976, and 1,281 sols of surface work.",
              ar: "الهبوط في 3 سبتمبر 1976، و1,281 يوماً مريخياً من العمل السطحي.",
            },
          },
        ],
      },
    },
    {
      id: "discoveries",
      kind: "discoveries",
      eyebrow: { en: "Chapter four", ar: "الفصل الرابع" },
      title: { en: "What Viking 2 Found", ar: "ما الذي وجدته فايكنغ 2" },
      summary: {
        en: "Seasonal frost, a harsh soil chemistry, and no clear sign of life.",
        ar: "صقيع موسمي وكيمياء تربة قاسية ولا علامة واضحة على الحياة.",
      },
      narrative: {
        en: [
          "Viking 2's biology experiments were the same as Viking 1's. Each one fed a soil sample and looked for a change that a living system might produce. Some of the experiments produced puzzling results, but the gas chromatograph found no organic molecules in the soil at either site.",
          "The mission also showed how hostile the surface chemistry was. The soil contained oxidising compounds that could destroy organic material, which made the search for life much harder than the mission planners had hoped.",
          "The most lasting result was the weather record. Viking 2 watched the same planet change through several Martian years, and that record is still used to understand the modern Martian climate.",
        ],
        ar: [
          "كانت تجارب الحياة في فايكنغ 2 هي نفسها في فايكنغ 1. كانت كل تجربة تُغذّي عينة تربة وتبحث عن تغيّر قد ينتجه نظام حي. أنتجت بعض التجارب نتائج محيرة، لكن جهاز الكروماتوغرافيا الغازية لم يجد جزيئات عضوية في التربة في أي من الموقعين.",
          "أظهرت المهمة أيضاً كم كانت كيمياء السطح قاسية. فقد احتوت التربة مركبات مؤكسدة قد تدمّر المواد العضوية، مما جعل البحث عن الحياة أصعب بكثير مما كان يأمله مخططو المهمة.",
          "وكان أكثر النتائج بقاءً هو سجل الطقس. فقد راقبت فايكنغ 2 الكوكب نفسه يتغير عبر عدة سنوات مريخية، وما زال ذلك السجل يُستخدم لفهم مناخ المريخ الحديث.",
        ],
      },
      echo: {
        en: "The answer was not 'yes'. It was 'not yet, and here is why it is hard'.",
        ar: "لم تكن الإجابة «نعم»، بل «ليس بعد، وهذا سبب صعوبة الأمر».",
      },
      discoveries: [
        {
          id: "vk2-d1",
          title: { en: "Frost is a water cycle", ar: "الصقيع دورة ماء" },
          question: {
            en: "Where does the water in the Martian air go?",
            ar: "إلى أين يذهب الماء في هواء المريخ؟",
          },
          instrument: {
            en: "Viking 2 cameras and weather station",
            ar: "كاميرات فايكنغ 2 ومحطة الطقس",
          },
          method: {
            en: "The lander photographed the surface through the seasons and measured temperature, pressure and wind at the same time.",
            ar: "صوّرت المركبة السطح عبر الفصول وقاست الحرارة والضغط والرياح في الوقت نفسه.",
          },
          data: {
            en: "Thin water frost appeared on the ground in winter and disappeared as the season changed.",
            ar: "ظهر صقيع مائي رقيق على الأرض في الشتاء واختفى مع تغير الفصل.",
          },
          finding: {
            en: "Water vapour in the atmosphere was condensing onto the surface and returning to the air, part of an active seasonal cycle.",
            ar: "كان بخار الماء في الغلاف الجوي يتكاثف على السطح ويعود إلى الهواء، في دورة موسمية نشطة.",
          },
          significance: {
            en: "It showed that water on Mars is not only locked in ice or lost to space. Some of it moves through the modern climate.",
            ar: "أظهر أن الماء على المريخ ليس محتجزاً في الجليد فقط ولا مفقوداً في الفضاء، بل بعضه يتحرك في المناخ الحديث.",
          },
          sourceIds: ["SRC-NSSDCA-VIKING-2", "SRC-NASA-VIKING"],
        },
        {
          id: "vk2-d2",
          title: { en: "The soil resists life", ar: "التربة تقاوم الحياة" },
          question: {
            en: "Could the Martian soil support organic chemistry?",
            ar: "هل تستطيع تربة المريخ دعم الكيمياء العضوية؟",
          },
          instrument: {
            en: "Gas chromatograph and mass spectrometer, plus the biology experiments",
            ar: "كروماتوغرافيا غازية ومطياف كتلة، إضافة إلى تجارب الحياة",
          },
          method: {
            en: "The robotic arm delivered soil to instruments that heated samples and measured the gases released.",
            ar: "سلّمت الذراع الآلية تربة إلى أجهزة سخّنت العينات وقاست الغازات المنبعثة.",
          },
          data: {
            en: "No organic molecules were detected at the level the instruments could see, and the soil chemistry appeared strongly oxidising.",
            ar: "لم تُكتشف جزيئات عضوية عند المستوى الذي تستطيع الأجهزة رؤيته، وبدت كيمياء التربة مؤكسدة بقوة.",
          },
          finding: {
            en: "The surface was chemically hostile to the kind of organic material that life would need.",
            ar: "كان السطح كيميائياً معادياً لنوع المواد العضوية التي تحتاجها الحياة.",
          },
          significance: {
            en: "It redirected the search for life toward protected environments below the surface and made later missions more careful about contamination.",
            ar: "وجّه البحث عن الحياة نحو بيئات محمية تحت السطح، وجعل المهمات اللاحقة أكثر حذراً بشأن التلوث.",
          },
          sourceIds: ["SRC-NSSDCA-VIKING-2", "SRC-NASA-VIKING"],
        },
      ],
    },
    {
      id: "ending",
      kind: "ending",
      eyebrow: { en: "Chapter five", ar: "الفصل الخامس" },
      title: { en: "Still at Utopia", ar: "ما زالت في يوتوبيا" },
      summary: {
        en: "Viking 2 stopped talking in 1980. Nothing has moved it since.",
        ar: "توقفت فايكنغ 2 عن الكلام في 1980. ولم يحرّكها شيء منذ ذلك الحين.",
      },
      narrative: {
        en: [
          "Viking 2's mission was planned to last about 90 days after landing. It worked for more than three years. The end came from a battery failure, not from the Martian environment defeating the spacecraft.",
          "The lander is still at Utopia Planitia. Its cameras are dark, its arm is still, and its experiments have been silent for decades. It is one of only two Viking landers on Mars, and the pair together wrote the first long chapter of Martian surface science.",
          "Viking 2 is a useful reminder that a mission does not have to find life to be important. It can map the weather, measure the soil and leave a record that later missions build on.",
        ],
        ar: [
          "كان مخططاً لمهمة فايكنغ 2 أن تستمر نحو 90 يوماً بعد الهبوط، لكنها عملت أكثر من ثلاث سنوات. وجاءت النهاية من عطل في البطارية، لا من انتصار بيئة المريخ على المركبة.",
          "وما زالت المركبة في يوتوبيا بلانيتيا. كاميراتها مظلمة وذراعها ساكنة وتجاربها صامتة منذ عقود. وهي واحدة من مركبتَي هبوط فايكنغ فقط على المريخ، وقد كتب الاثنتان معاً أول فصل طويل في علم سطح المريخ.",
          "وفايكنغ 2 تذكير مفيد بأن المهمة لا يلزم أن تجد حياة لتكون مهمة. فبوسعها أن ترسم الطقس وتقيس التربة وتترك سجلاً تبني عليه المهمات اللاحقة.",
        ],
      },
      echo: {
        en: "Two landers, two sites, one planet that turned out to be more complicated than either could answer alone.",
        ar: "مركبتان وموقعان وكوكب واحد تبيّن أنه أعقد مما تستطيع أي منهما الإجابة عنه وحدها.",
      },
      facts: [
        {
          label: { en: "Final location", ar: "الموقع الأخير" },
          value: { en: "Utopia Planitia, Mars", ar: "يوتوبيا بلانيتيا، المريخ" },
        },
        {
          label: { en: "Last contact", ar: "آخر اتصال" },
          value: { en: "11 April 1980", ar: "11 أبريل 1980" },
        },
        {
          label: { en: "Operating lifetime", ar: "مدة العمل" },
          value: { en: "More than three years", ar: "أكثر من ثلاث سنوات" },
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
      title: { en: "What Remains", ar: "ما الذي يبقى" },
      summary: {
        en: "Two sites, one comparison, and a question that is still open.",
        ar: "موقعان ومقارنة واحدة وسؤال ما زال مفتوحاً.",
      },
      narrative: {
        en: [
          "Viking 2's real contribution was the comparison. Two landers, two sites, the same instruments: what matched was the planet, and what differed was the place. The biology experiments gave the same ambiguous answer they had given at Chryse Planitia, and NASA recorded them the same way — inconclusive.",
          "The lander also carried the first seismometer to work on the surface of another planet. It felt the ground for tremors and recorded the first signals that scientists read as shaking from inside Mars — a question later missions would return to with better instruments.",
          "Both Viking landers are still on Mars. Viking 1 stands in Chryse Planitia, Viking 2 in Utopia Planitia, and their legs have not moved since the 1970s. Together they wrote the first long chapter of Martian surface science — the weather record, the soil chemistry, and the hardest unanswered question in planetary exploration.",
          "A landing site is a small thing: a patch of rocks and dust on a cold plain. But two of them, watched carefully for years, turned a planet from a disc in a telescope into a place with frost, storms, seasons and a history.",
        ],
        ar: [
          "كان إسهام فايكنغ 2 الحقيقي هو المقارنة. مركبتان وموقعان وأجهزة واحدة: وما اتفق عليه فهو الكوكب، وما اختلف فهو المكان. وأعطت تجارب الحياة الإجابة المربكة نفسها التي أعطتها في خريسي بلانيتيا، وسجّلتها ناسا بالطريقة نفسها — غير حاسمة.",
          "وحملت المركبة أيضاً أول جهاز زلزالي يعمل على سطح كوكب آخر. فحص الأرض بحثاً عن اهتزازات وسجّل أول إشارات قرأها العلماء على أنها اهتزازات من باطن المريخ — وهو سؤال عادت إليه المهمات اللاحقة بأجهزة أفضل.",
          "ومركبتا الهبوط فيكنغ لا تزالان على المريخ. تقف فايكنغ 1 في خريسي بلانيتيا، وفايكنغ 2 في يوتوبيا بلانيتيا، ولم تتحرك أرجلهما منذ سبعينيات القرن الماضي. وقد كتبتا معاً أول فصل طويل في علم سطح المريخ — سجل الطقس، وكيمياء التربة، وأصعب سؤال بلا إجابة في استكشاف الكواكب.",
          "موقع الهبوط شيء صغير: بقعة من الصخور والغبار على سهل بارد. لكن موقعين رُقبا بعناية لسنوات حوّلا الكوكب من قرص في تلسكوب إلى مكان فيه صقيع وعواصف وفصول وتاريخ.",
        ],
      },
      echo: {
        en: "Viking 2 proved the first landing was not luck. That is what a second look is for.",
        ar: "أثبتت فايكنغ 2 أن الهبوط الأول لم يكن حظاً. لهذا وُجدت النظرة الثانية.",
      },
      facts: [
        {
          label: { en: "Surface operations", ar: "مدة العمل السطحي" },
          value: {
            en: "1,281 sols — more than three years.",
            ar: "1,281 يوماً مريخياً — أكثر من ثلاث سنوات.",
          },
        },
        {
          label: { en: "First seismometer", ar: "أول جهاز زلزالي" },
          value: {
            en: "The first seismometer to work on the surface of another planet.",
            ar: "أول جهاز زلزالي يعمل على سطح كوكب آخر.",
          },
        },
        {
          label: { en: "Still on Mars", ar: "ما زالت على المريخ" },
          value: {
            en: "The lander remains where it landed at Utopia Planitia.",
            ar: "ما زالت المركبة حيث هبطت في يوتوبيا بلانيتيا.",
          },
        },
      ],
    },
  ],
  legacyStatement: {
    en: "Viking 2 turned a single landing into a comparison, and a comparison into a climate record.",
    ar: "حوّلت فايكنغ 2 هبوطاً واحداً إلى مقارنة، والمقارنة إلى سجل مناخي.",
  },
  tags: ["mars", "lander", "remnant"],
  artifactId: "viking-2-lander",
  sourceIds: ["SRC-NSSDCA-VIKING-2", "SRC-NASA-VIKING"],
  relatedStorySlugs: ["viking-1-lander", "spirit"],
  echoIntro: {
    en: "The second Viking landed in a colder place and watched the seasons change. Come and see what frost on Mars really means.",
    ar: "هبطت فايكنغ الثانية في مكان أبرد وراقبت تغير الفصول. تعال لترى ما يعنيه الصقيع على المريخ فعلاً.",
  },
  echoSignoff: {
    en: "Viking 2 is still at Utopia Planitia, quiet after three years of watching the Martian sky.",
    ar: "ما زالت فايكنغ 2 في يوتوبيا بلانيتيا، صامتة بعد ثلاث سنوات من مراقبة سماء المريخ.",
  },
  lastVerified: "2026-11-14",
};
