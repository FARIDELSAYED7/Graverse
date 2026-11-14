import type { EchoStory } from "@/types/echo";
import { echoImage, echoVideo } from "./media";

/**
 * OPPORTUNITY — the flagship ECHOES story.
 *
 * Facts are drawn from the NASA mission page for the Mars Exploration Rover
 * Opportunity, NASA/JPL mission documentation and the GRAVERSE museum record
 * for the rover. The source ids point at the shared source registry so the
 * Sources & Credits panel links to the same records the Museum uses.
 *
 * The ending is stated as NASA states it: the rover stopped communicating
 * during a global dust storm, and NASA ended the mission in February 2019
 * after months of attempts to reach it. No cause of failure is invented.
 */
export const opportunityStory: EchoStory = {
  id: "opportunity",
  slug: "opportunity",
  title: {
    en: "Opportunity",
    ar: "أوبورتينيتي",
  },
  storyTitle: {
    en: "15 Years on a World That Was Never Home",
    ar: "15 عاماً على عالم لم يكن موطناً له",
  },
  dek: {
    en: "A rover that was supposed to last 90 days and ended up exploring Mars for almost fifteen years.",
    ar: "عربة كان مخطط لها أن تعمل 90 يوماً فقط، لكنها استكشفت المريخ نحو خمسة عشر عاماً.",
  },
  summary: {
    en: "Opportunity landed on Mars in January 2004 looking for evidence of ancient water. It found it — and then it kept going, driving 45.16 kilometres across the Meridiani Planum until a planet-wide dust storm cut off its power in June 2018.",
    ar: "هبطت أوبورتينيتي على المريخ في يناير 2004 بحثاً عن دليل على مياه قديمة. وقد وجدت ذلك — ثم واصلت السير، فقطعت 45.16 كيلومتراً في ميدانيوم بلانيوم، حتى عاصفة غبار عمّت الكوكب وقطعت طاقتها في يونيو 2018.",
  },
  location: {
    en: "Meridiani Planum, Mars",
    ar: "ميدانيوم بلانيوم، المريخ",
  },
  locationNote: {
    en: "The rover landed inside Eagle Crater and later reached the rim of Endeavour Crater. Its exact resting position is not plotted in the GRAVERSE record.",
    ar: "هبطت العربة داخل فوهة النسر، ثم وصلت لاحقاً إلى حافة فوهة إنديفور. ولا يعرض سجل GRAVERSE موضعها النهائي بدقة.",
  },
  equipmentType: {
    en: "Solar-powered rover",
    ar: "عربة تعمل بالطاقة الشمسية",
  },
  missionPeriod: {
    en: "Launch 8 July 2003 · Landing 25 January 2004 · Mission ended 13 February 2019",
    ar: "الإطلاق 8 يوليو 2003 · الهبوط 25 يناير 2004 · انتهاء المهمة 13 فبراير 2019",
  },
  missionStatus: {
    en: "Mission complete — NASA ended the Opportunity mission on 13 February 2019.",
    ar: "اكتملت المهمة — أنهت ناسا مهمة أوبورتينيتي في 13 فبراير 2019.",
  },
  hardwareStatus: {
    en: "No longer communicating — the rover last reported on 10 June 2018.",
    ar: "لم تعد تبثّ — آخر تقرير وصلت من العربة في 10 يونيو 2018.",
  },
  statusKind: "silent",
  accent: "#F08A6A",
  accentSoft: "#FBD9C7",
  badge: {
    en: "Rover Expert",
    ar: "خبير العُربات",
  },
  badgeKey: "rover-expert",
  hero: echoImage("PIA05513", {
    alt: {
      en: "A self-portrait of the Opportunity rover on Mars, showing its solar panels, camera mast and the rocky ground of Meridiani Planum.",
      ar: "صورة ذاتية للعربة أوبورتينيتي على المريخ، تُظهر ألواحها الشمسية وعمود الكاميرا والأرض الصخرية في ميدانيوم بلانيوم.",
    },
    caption: {
      en: "Opportunity photographed itself with its own camera arm in January 2014, about three weeks before it marked ten years on Mars. The image is a mosaic stitched from dozens of frames — and it was assembled on Earth.",
      ar: "صوّرت أوبورتينيتي نفسها بذراع كاميرتها في يناير 2014، قبل نحو ثلاثة أسابيع من إتمامها عشر سنوات على المريخ. الصورة فسيفساء مركّبة من عشرات الإطارات — وقد تم تجميعها على الأرض.",
    },
  }),
  gallery: [
    echoImage("PIA07108", {
      alt: {
        en: "Frost on the Opportunity rover's solar panel on Mars, with a Martian landscape behind it.",
        ar: "صقيع على اللوح الشمسي لعربة أوبورتينيتي على المريخ، وخلفه مشهد من سطح المريخ.",
      },
      caption: {
        en: "Water ice on the rover's solar panel. Water ice also forms on the surfaces of the panel, a known Martian behaviour that has grounded later rovers.",
        ar: "جليد مائي على اللوح الشمسي للعربة. يتكوّن الجليد المائي أيضاً على أسطح اللوح، وهو سلوك مريخي معروف أدّى إلى تعطّل عُربات لاحقة.",
      },
    }),
    echoImage("PIA20285", {
      alt: {
        en: "The Opportunity rover working its robotic arm against a rock on the Martian surface.",
        ar: "العربة أوبورتينيتي تعمل بذراعها الآلية على صخرة على سطح المريخ.",
      },
      caption: {
        en: "Opportunity placing its instruments against a target rock named Potts, reading its chemistry one element at a time.",
        ar: "أوبورتينيتي تضع أجهزتها على صخرة اسمها بوتس، وتقرأ تركيبتها الكيميائية عنصراً بعد عنصر.",
      },
    }),
    echoImage("PIA21708", {
      alt: {
        en: "A wide view across the rim of Orion Crater as seen by the Opportunity rover.",
        ar: "منظر واسع عبر حافة فوهة أوريون كما رآتها عربة أوبورتينيتي.",
      },
      caption: {
        en: "The rover's view into a crater it reached by driving. Every crater edge is a cross-section of layers laid down over time.",
        ar: "منظر العربة إلى فوهة وصلتها بالقيادة. كل حافة فوهة هي مقطع عرضي في طبقات تراكمت مع الزمن.",
      },
    }),
    echoImage("PIA22071", {
      alt: {
        en: "Long shadows cast across the Martian surface in a view from the Opportunity rover.",
        ar: "ظلال طويلة تمتد على سطح المريخ في منظر من عربة أوبورتينيتي.",
      },
      caption: {
        en: "Low sunlight throws long shadows across the plain, the same slow lighting change that mission teams watch to work out terrain slopes.",
        ar: "ضوء الشمس المنخفض يمدّ ظلالاً طويلة عبر السهل، وهو التغيّر البطيء في الإضاءة الذي تراقب فرق المهمات لقياس انحدارات التضاريس.",
      },
    }),
  ],
  facts: [
    {
      label: { en: "Built by", ar: "صُنعت بواسطة" },
      value: {
        en: "NASA Jet Propulsion Laboratory, with Cornell University leading the science payload.",
        ar: "مختبر الدفع النفسي في ناسا، مع قيادة جامعة كورنيل للحمولة العلمية.",
      },
    },
    {
      label: { en: "Launch vehicle", ar: "مركبة الإطلاق" },
      value: { en: "Delta II from Cape Canaveral", ar: "دلتا 2 من كيب كانافيرال" },
    },
    {
      label: { en: "Designed lifetime", ar: "العمر المصمَّم" },
      value: {
        en: "90 sols (Martian days) and about 600 metres of driving.",
        ar: "90 سولاً (يوماً مريخياً) ونحو 600 متر من السير.",
      },
    },
    {
      label: { en: "What it actually did", ar: "ما فعلته فعلياً" },
      value: {
        en: "Roughly 15 years of surface work and 45.16 km driven.",
        ar: "نحو 15 عاماً من العمل السطحي و45.16 كيلومتراً من السير.",
      },
    },
    {
      label: { en: "Power", ar: "الطاقة" },
      value: {
        en: "Solar arrays with rechargeable batteries.",
        ar: "ألواح شمسية مع بطاريات قابلة لإعادة الشحن.",
      },
    },
    {
      label: { en: "Instruments", ar: "الأجهزة" },
      value: {
        en: "Panoramic Camera, Mini-TES, Mössbauer Spectrometer, Alpha Particle X-ray Spectrometer, Magnetic Spectrometer and the Microscopic Imager.",
        ar: "الكاميرا البانورامية، ومقياس ميني-تي إي الحراري المصغّر، ومقياس موسباور الطيفي، ومقياس أشعة إكس الدقيق ألف، ومقياس المغناطيسية، وجهاز التصوير المجهري.",
      },
    },
    {
      label: { en: "Landing site", ar: "موقع الهبوط" },
      value: {
        en: "Eagle Crater, Meridiani Planum.",
        ar: "فوهة النسر، في ميدانيوم بلانيوم.",
      },
    },
    {
      label: { en: "Last contact", ar: "آخر اتصال" },
      value: { en: "10 June 2018", ar: "10 يونيو 2018" },
    },
    {
      label: { en: "Mission ended", ar: "انتهت المهمة" },
      value: { en: "13 February 2019", ar: "13 فبراير 2019" },
    },
  ],
  model: {
    src: "/models/echoes/opportunity-mer-b.glb",
    title: {
      en: "Mars Exploration Rover — Opportunity (MER-B)",
      ar: "مستكشف المريخ — أوبورتينيتي (MER-B)",
    },
    description: {
      en: "Rotate the rover and select a numbered part to find out what it does. This is NASA's 3D model of the flight rover, not a photograph.",
      ar: "أدر العربة واختر جزءاً مرقّماً لمعرفة وظيفته. هذا نموذج ناسا ثلاثي الأبعاد للعربة الفعلية، وليس صورة فوتوغرافية.",
    },
    credit: "NASA 3D Resources",
    organization: "NASA",
    sourceUrl:
      "https://science.nasa.gov/3d-resources/",
    provenance: {
      en: "NASA 3D Resources model of the Mars Exploration Rover. Free to download and use under the NASA media usage guidelines.",
      ar: "نموذج «مستكشف المريخ» من مصادر ناسا ثلاثية الأبعاد. متاح مجاناً للتنزيل والاستخدام وفق إرشادات استخدام وسائط ناسا.",
    },
    hotspots: [
      {
        id: "solar-panels",
        position: [-0.3, -0.03, -0.45],
        label: { en: "Solar panels", ar: "الألواح الشمسية" },
        detail: {
          en: "Two wings of solar cells convert sunlight into the electricity that runs the rover. When dust covers them, the rover loses power — which is exactly what happened in 2018.",
          ar: "جناحان من الخلايا الشمسية يحوّلان ضوء الشمس إلى الكهرباء التي تعمل بها العربة. وعندما يغطّيها الغبار تفقد العربة طاقتها — وهو ما حدث تماماً عام 2018.",
        },
      },
      {
        id: "camera-mast",
        position: [0.03, 0.52, -0.26],
        label: { en: "Camera mast", ar: "عمود الكاميرات" },
        detail: {
          en: "The Panoramic Camera sits at the top of the mast. It has taken colour panoramas and stereo images so teams can judge how safe the ground is before driving.",
          ar: "تقع الكاميرا البانورامية في قمة العمود. التقطت ألواناً بانورامية وصوراً مجسّمة لتقدّم للفرق حكمها على سلامة الأرض قبل السير.",
        },
      },
      {
        id: "robotic-arm",
        position: [0.02, -0.12, 0.5],
        label: { en: "Robotic arm", ar: "الذراع الآلية" },
        detail: {
          en: "The arm carries the spectrometers to a target rock and places the microscopic imager directly against the surface.",
          ar: "تحمل الذراع مقاييس الطيف إلى الصخرة المستهدفة، وتضع جهاز التصوير المجهري ملاصقاً لسطحها.",
        },
      },
      {
        id: "wheels",
        position: [0.55, -0.56, 0.06],
        label: { en: "Wheels", ar: "العجلات" },
        detail: {
          en: "Six wheels on a rocker-bogie suspension keep the body steady over rocks. The rover used them for every one of its 45.16 kilometres.",
          ar: "ست عجلات على تعليق من نوع روكَر–بوغي تُبقي الهيكل مستقراً فوق الصخور. استعملتها العربة في كل كيلومتر من الـ45.16.",
        },
      },
      {
        id: "antenna",
        position: [0.45, -0.03, -0.6],
        label: { en: "Radio antenna", ar: "الهوائي اللاسلكي" },
        detail: {
          en: "The low-gain antenna radioed directly to Earth; the high-gain antenna pointed at a specific target to send far more data home.",
          ar: "بثّ الهوائي منخفض المكسب إلى الأرض مباشرةً، بينما وجّه الهوائي عالي المكسب نحو هدف محدّد ليُرسل ضعف البيانات.",
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
        en: "What Opportunity is, who built it, and why a 185-kilogram rover was worth sending to Mars.",
        ar: "ما هي أوبورتينيتي، ومن صنعها، ولماذا كان إرسال عربة وزنها 185 كيلوجراماً إلى المريخ مجدياً.",
      },
      narrative: {
        en: [
          "Opportunity is a robot geologist. It has six wheels, a robotic arm, a camera on a mast and a set of instruments that measure what the rocks are made of. On Earth it is a laboratory on wheels; on Mars it is a laboratory that has to drive to its own samples.",
          "The Mars Exploration Rover project built two identical vehicles. Spirit, the first, landed three weeks before Opportunity and pointed towards the ground in Gusev Crater. Opportunity landed on the opposite side of the planet, in a flat plain called Meridiani Planum, where ancient sedimentary rock lay exposed.",
          "Choosing that plain was the single most important decision of the mission. If liquid water had ever pooled on the surface of Mars, the layered sediments of Meridiani Planum were the most likely place to have caught it — and the layers would be readable, one rock at a time.",
          "The team who built the rover was led by NASA's Jet Propulsion Laboratory in Pasadena. Cornell University led the science payload. The rover was solar-powered, about 185 kilograms, and designed to last 90 sols — roughly 92 Earth days.",
        ],
        ar: [
          "أوبورتينيتي عربة جيولوجية. لها ست عجلات، وذراع آلية، وكاميرا على عمود، ومجموعة أجهزة تقيس مكوّنات الصخور. على الأرض هي مختبر على عجلات، وعلى المريخ هي مختبر لا بدّ له من القيادة إلى عيّناته بنفسه.",
          "صنع مشروع «مستكشف المريخ» مركبتين متطابقتين. فقد هبطت «سبيريت» — الأولى — قبل أوبورتينيتي بثلاثة أسابيع، واتّجهت إلى الأرض في فوهة غوسيف. أما أوبورتينيتي فهبطت في الجهة المقابلة من الكوكب، في سهل مسطّح اسمه ميدانيوم بلانيوم، حيث كان الصخر الرسوبي القديم مكشوفاً.",
          "كان اختيار ذلك السهل أهم قرار في المهمة كلها. فإذا كان الماء السائل قد تجمّع يوماً على سطح المريخ، فإن الطبقات الرسوبية في ميدانيوم بلانيوم كانت أشدّ الأماكن ترجيحاً لأن يحتفظ به — وكانت تلك الطبقات قابلة للقراءة، صخرةً بعد صخرة.",
          "قاد الفريق الذي بنى العربة مختبر الدفع النفسي في ناسا في باسادينا، وقيادة جامعة كورنيل للحمولة العلمية. وكانت العربة تعمل بالطاقة الشمسية، بوزن يقارب 185 كيلوجراماً، ومصمَّمة لتعمل 90 سولاً — أي نحو 92 يوماً من أيام الأرض.",

        ],
      },
      echo: {
        en: "Hi, explorer! I am ECHO. Today we are visiting a rover that was supposed to work for three months and ended up working for fifteen years. Come — let us look at the parts that made that possible.",
        ar: "مرحباً أيها المستكشف! أنا إيكو. اليوم نزور عربة كان مخطط لها أن تعمل ثلاثة أشهر فعملت خمسة عشر عاماً. تعال — لننظر إلى الأجزاء التي جعلت ذلك ممكناً.",
      },
      facts: [
        {
          label: { en: "Mass", ar: "الكتلة" },
          value: { en: "About 185 kg", ar: "نحو 185 كغ" },
        },
        {
          label: { en: "Design life", ar: "العمر التصميمي" },
          value: { en: "90 sols", ar: "90 سولاً" },
        },
        {
          label: { en: "Mission type", ar: "نوع المهمة" },
          value: {
            en: "Solar-powered surface rover",
            ar: "عربة سطحية تعمل بالطاقة الشمسية",
          },
        },
      ],
      diagram: {
        kind: "rover-components",
        title: {
          en: "What the rover is made of",
          ar: "مكوّنات العربة",
        },
        intro: {
          en: "Select a marker to see what that part does. The shapes here are a teaching diagram of the real vehicle.",
          ar: "اختر أي علامة لترى وظيفة ذلك الجزء. الأشكال هنا رسم تعليمي للمركبة الحقيقية.",
        },
        points: [
          {
            id: "solar",
            x: 26,
            y: 46,
            label: { en: "Solar array wings", ar: "جناحا الألواح الشمسية" },
            detail: {
              en: "They unfold after landing and feed the batteries. They are also the rover's most fragile system: dust settles on them and never blows off.",
              ar: "تُفردّ بعد الهبوط وتغذّي البطاريات. وهي أيضاً أكثر أنظمة العربة هشاشة: فالغبار يستقرّ عليها ولا ينزاح عنها.",
            },
          },
          {
            id: "mast",
            x: 49,
            y: 21,
            label: { en: "Camera mast", ar: "عمود الكاميرات" },
            detail: {
              en: "Holds the stereo cameras and the panoramic camera. Teams use the stereo pair to build 3D maps of the ground before every drive.",
              ar: "يحمل الكاميرتين المجسّمتين والكاميرا البانورامية. وتستخدم الفرق الزوج المجسّم لبناء خرائط ثلاثية الأبعاد للأرض قبل كل قيادة.",
            },
          },
          {
            id: "body",
            x: 50,
            y: 43,
            label: { en: "Warm electronics box", ar: "صندوق الإلكترونيات المحمي" },
            detail: {
              en: "Computers, radio and most electronics live inside a warm, insulated box so the rover's brain stays in working range through the Martian night.",
              ar: "توجد الحاسبات والراديو ومعظم الإلكترونيات داخل صندوق دافئ ومعزول ليبقى «دماغ» العربة في مدى العمل طوال الليل المريخي.",
            },
          },
          {
            id: "arm",
            x: 78,
            y: 66,
            label: { en: "Instrument arm", ar: "ذراع الأجهزة" },
            detail: {
              en: "A 1.5 metre arm that carries the spectrometers out to a rock and can grind into it with the rover's own drill.",
              ar: "ذراع طوله 1.5 متر تحمل مقاييس الطيف إلى الصخرة، ويمكنها أن تحفر فيها بمثقاب العربة نفسه.",
            },
          },
          {
            id: "wheels",
            x: 50,
            y: 66,
            label: { en: "Rocker-bogie wheels", ar: "عجلات روكَر–بوغي" },
            detail: {
              en: "Six wheels hang from a suspension that keeps the body level while individual wheels climb over rocks up to about 30 centimetres high.",
              ar: "ست عجلات معلّقة بتعليق يُبقي الهيكل مستوياً بينما تتسلّق عجلات منفردة صخوراً يصل ارتفاعها إلى نحو 30 سنتيمتراً.",
            },
          },
        ],
      },
      quiz: [
        {
          id: "opp-q1",
          prompt: {
            en: "How long was Opportunity designed to keep working?",
            ar: "إلى متى صُمّمت أوبورتينيتي لتعمل؟",
          },
          options: [
            { id: "a", label: { en: "90 sols", ar: "90 سولاً" } },
            { id: "b", label: { en: "3 years", ar: "3 سنوات" } },
            { id: "c", label: { en: "15 years", ar: "15 عاماً" } },
          ],
          correctOptionId: "a",
          explanation: {
            en: "The rover was designed for 90 sols — about 92 Earth days. It actually worked for almost fifteen years.",
            ar: "صُمّمت العربة لتعمل 90 سولاً — نحو 92 يوماً من أيام الأرض. لكنها عملت فعلياً نحو خمسة عشر عاماً.",
          },
        },
        {
          id: "opp-q2",
          prompt: {
            en: "Why did NASA choose to land Opportunity in Meridiani Planum?",
            ar: "لماذا اختارت ناسا هبوط أوبورتينيتي في ميدانيوم بلانيوم؟",
          },
          options: [
            {
              id: "a",
              label: {
                en: "It was the flattest place on Mars",
                ar: "كان أشسط مكان على المريخ",
              },
            },
            {
              id: "b",
              label: {
                en: "Layered sedimentary rock there could hold a record of ancient water",
                ar: "الصخر الرسوي الطبقي هناك قد يحفظ سجلاً لمياه قديمة",
              },
            },
            {
              id: "c",
              label: {
                en: "It was close to the landing site of Spirit",
                ar: "كان قريباً من موقع هبوط سبيريت",
              },
            },
          ],
          correctOptionId: "b",
          explanation: {
            en: "Meridiani Planum exposes layered sedimentary rock — exactly the kind of rock that records standing water. Spirit landed on the far side of the planet.",
            ar: "يكشف ميدانيوم بلانيوم صخراً رسوبياً طبقياً — وهو نوع الصخر الذي يسجّل المياه الراكدة. أما سبيريت فهبطت في الجهة المقابلة من الكوكب.",
          },
        },
        {
          id: "opp-q3",
          prompt: {
            en: "What does the rover use for electricity?",
            ar: "ماذا تستخدم العربة في الكهرباء؟",
          },
          options: [
            {
              id: "a",
              label: { en: "A radioisotope generator", ar: "مولّد نظائر مشعّ" },
            },
            {
              id: "b",
              label: { en: "Solar panels and batteries", ar: "ألواح شمسية وبطاريات" },
            },
            {
              id: "c",
              label: { en: "Fuel cells carried on board", ar: "خلايا وقود محمولة" },
            },
          ],
          correctOptionId: "b",
          explanation: {
            en: "Opportunity carried solar arrays and rechargeable lithium-ion batteries. Later rovers used radioisotope generators so they could work through the winter.",
            ar: "حملت أوبورتينيتي ألواحاً شمسية وبطاريات ليثيوم أيون قابلة لإعادة الشحن. أما العُربات اللاحقة فاستخدمت مولّدات نظائر مشعّة لتعمل خلال الشتاء.",
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
        en: "The scientific questions, the people behind the rover, and the instruments that answered them.",
        ar: "الأسئلة العلمية، والفريق الذي يقف خلف العربة، والأجهزة التي أجابت عنها.",
      },
      narrative: {
        en: [
          "NASA wrote the scientific goal of the Mars Exploration Rover mission in plain words: look for evidence of past water on Mars, characterise the rocks and soils, and look for evidence of past life. Four questions, one rover, one flat plain.",
          "The instruments were chosen so that they could disagree with each other. The Mössbauer Spectrometer measured iron-bearing minerals at the scale of individual atoms. The Miniature Thermal Emission Spectrometer read the heat given off by minerals in the infrared. The Alpha Particle X-ray Spectrometer measured the elements themselves. A magnetometer measured how much of the rock was magnetic, and a microscopic imager photographed grains a tenth of a millimetre across.",
          "That redundancy was the point. A single instrument can be fooled by a strange rock. Several independent instruments pointing the same way is much harder to argue with — and in 2004, that is exactly what happened.",
          "The mission was run from the Jet Propulsion Laboratory in California, with a science team distributed across more than a dozen institutions. Operations were planned the night before, as sequences of instructions uploaded to the rover each morning.",
        ],
        ar: [
          "كتبت ناسا الهدف العلمي لمهمة «مستكشف المريخ» بعبارات واضحة: ابحث عن دليل على مياه قديمة على المريخ، وصِف الصخور والتربة، وابحث عن دليل على حياة قديمة. أربعة أسئلة، وعربة واحدة، وسهل مسطّح واحد.",
          "اختيرت الأجهزة بحيث تكون قادرة على أن تختلف فيما بينها. فقاس مقياس موسباور الطيفي المعادن الحاوية للحديد على مقياس ذرّة واحدة. وقرأ مقياس ميني-تي إي الحراري المصغّر الحرارة المنبعثة من المعادن بالأشعة تحت الحمراء. وقاس مقياس أشعة إكس الدقيق ألف العناصر نفسها. وقاس مقياس المغناطيسية مقدار المغناطيسية في الصخر، وصوّر جهاز التصوير المجهري حبيبات عرضها جزء من عشرة من الألف من الملّيمتر.",
          "كان هذا التكرار هو المقصود. فجهاز واحد قد ينخدع بصخرة غريبة. أما عدّة أجهزة مستقلة تتّفق على نتيجة واحدة فصعب الجدال فيها — وفي عام 2004 حدث هذا بالضبط.",
          "أُديرت المهمة من مختبر الدفع النفسي في كاليفورنيا، مع فريق علمي موزّع على أكثر من اثنتي عشرة مؤسسة. وكانت العمليات تُخطَّط في الليلة السابقة على شكل سلاسل تعليمات تُرفع إلى العربة كل صباح.",
        ],
      },
      echo: {
        en: "Notice how many instruments there are. NASA built the rover so that if one measurement went wrong, the others would catch it. That is called cross-checking, and it is how we know what Opportunity found.",
        ar: "لاحظ كم عدد الأجهزة. صمّمت ناسا العربة بحيث لو التبس قياس واحد، تلتقطه بقيّة الأجهزة. هذا ما يُسمّى التحقّق المتقاطع، وهو كيف نعرف ما وجدتُه أوبورتينيتي.",
      },
      media: [
        echoVideo("ksc_050604_complete", {
          alt: {
            en: "NASA video segment about the Spirit and Opportunity rovers completing their primary mission requirements and entering extended mission.",
            ar: "مقطع فيديو من ناسا يتحدث عن عربتَي سبيريت وأوبورتينيتي وإتمامهما متطلبات المهمة الأساسية وبدء المهمة الممتدة.",
          },
          caption: {
            en: "A NASA video segment from 2004. The twins were designed for 90 sols; by this point both had completed their primary mission and were continuing on extended mission.",
            ar: "مقطع فيديو من ناسا عام 2004. صُمِّمت التوأمتان لتعملا 90 سولاً؛ وبهذه المرحلة كانت كلتاهما قد أتمّت المهمة الأساسية وتواصلتا في مهمة ممتدة.",
          },
          transcript: {
            en: [
              "NASA video segment: the Spirit and Opportunity rovers complete their primary mission requirements and move into extended mission.",
              "The segment describes the rovers' progress, the science they are doing in the field, and the extra distance they are covering on Mars.",
            ],
            ar: [
              "مقطع فيديو من ناسا: عربتا سبيريت وأوبورتينيتي تُتمّان متطلبات المهمة الأساسية وتنتقلان إلى المهمة الممتدة.",
              "يصف المقطع تقدّم العربتين، والعلم الذي تجريانه في الميدان، والمسافة الإضافية التي تقطعانها على المريخ.",
            ],
          },
        }),
      ],
      facts: [
        {
          label: { en: "Goal 1", ar: "الهدف الأول" },
          value: {
            en: "Look for evidence of past water.",
            ar: "البحث عن دليل على مياه قديمة.",
          },
        },
        {
          label: { en: "Goal 2", ar: "الهدف الثاني" },
          value: {
            en: "Characterise the rocks and soils.",
            ar: "وصف الصخور والتربة.",
          },
        },
        {
          label: { en: "Goal 3", ar: "الهدف الثالث" },
          value: {
            en: "Look for evidence of past life.",
            ar: "البحث عن دليل على حياة قديمة.",
          },
        },
        {
          label: { en: "Goal 4", ar: "الهدف الرابع" },
          value: {
            en: "Characterise the Martian atmosphere and climate.",
            ar: "وصف الغلاف الجوي ومناخ المريخ.",
          },
        },
      ],
      glossary: [
        {
          id: "sol",
          term: { en: "Sol", ar: "سول" },
          simple: {
            en: "One Martian day. A sol is a little longer than an Earth day, because Mars takes longer to turn.",
            ar: "يوم مريخي واحد. السول أطول قليلاً من يوم الأرض، لأن المريخ يستغرق وقتاً أطول ليدور.",
          },
          technical: {
            en: "Technically a sol is the rotation of Mars relative to its Sun, not to the Earth.",
            ar: "تقنياً السول هو دوران المريخ بالنسبة إلى شمسه، لا بالنسبة إلى الأرض.",
          },
        },
        {
          id: "spectrometer",
          term: { en: "Spectrometer", ar: "مقياس الطيف" },
          simple: {
            en: "A tool that works out what a material is made of by looking at the light it gives off or absorbs.",
            ar: "أداة تحدّد مكوّنات المادة بالنظر إلى الضوء الذي تُصدره أو تمتصّه.",
          },
        },
        {
          id: "sedimentary",
          term: { en: "Sedimentary rock", ar: "صخر رسوبي" },
          simple: {
            en: "Rock that settled in layers, usually at the bottom of water. Layered rock is a diary of what happened.",
            ar: "صخر ترسّب في طبقات، عادةً في قاع الماء. والصخر الطبقي يشبه اليوميات التي تروي ما جرى.",
          },
        },
        {
          id: "cross-check",
          term: { en: "Cross-checking", ar: "التحقّق المتقاطع" },
          simple: {
            en: "When two or more different instruments measure the same thing and agree, scientists trust the answer more.",
            ar: "حين تقيس جهازات مختلفة الشيء نفسه وتتفق، يثق العلماء بالنتيجة أكثر.",
          },
        },
      ],
      quiz: [
        {
          id: "opp-q4",
          prompt: {
            en: "Why did the rover carry so many different instruments?",
            ar: "لماذا حملت العربة أجهزة مختلفة كثيرة؟",
          },
          options: [
            {
              id: "a",
              label: {
                en: "So the rover would look impressive in photographs",
                ar: "لتبدو العربة مبهرة في الصور",
              },
            },
            {
              id: "b",
              label: {
                en: "So independent measurements could confirm each other",
                ar: "لتتأكّد القياسات المستقلة بعضها من بعض",
              },
            },
            {
              id: "c",
              label: {
                en: "Because some instruments run out of power first",
                ar: "لأن بعض الأجهزة ينفد طاقتها أولاً",
              },
            },
          ],
          correctOptionId: "b",
          explanation: {
            en: "Cross-checking is what makes a finding solid. Several instruments measuring the same rock in different ways is much stronger evidence than one instrument alone.",
            ar: "التحقّق المتقاطع هو ما يجعل النتيجة راسخة. فقياس عدّة أجهزة لنفس الصخرة بطرق مختلفة أقوى دليلاً بكثير من جهاز واحد.",
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
        en: "From a Delta II launch pad to a bounce across Meridiani Planum, and then fifteen years of driving.",
        ar: "من منصة إطلاق دلتا 2 إلى ارتدادٍ فوق ميدانيوم بلانيوم، ثم خمسة عشر عاماً من السير.",
      },
      narrative: {
        en: [
          "Opportunity launched on 8 July 2003 from Cape Canaveral on a Delta II rocket. It was the last launch of that rocket from that pad. For about seven months it coasted through space, slowly spinning so that one side would not cook in the sun while the other froze.",
          "Arriving at Mars in January 2004, the rover still had to survive the most dangerous minute of the mission. It entered the atmosphere at 5 kilometres per second, protected by a heatshield, then a parachute, then rockets, then airbags that bounced it across the plain like a beach ball.",
          "The airbags did their job. The rover tipped over, rolled onto its deck, and the solar panels unfolded. The first images it sent back showed a flat plain of dark sand and scattered rocks. Then the rover drove off the lander platform, and the mission began.",
          "What followed was not a tour but a series of questions answered one rock at a time. The rover drove no more than a few tens of metres a day, stopping often to look, measure and think. Over fifteen years that slow process covered 45.16 kilometres — further than any other vehicle has driven on another world.",
        ],
        ar: [
          "أُطلقت أوبورتينيتي في 8 يوليو 2003 من كيب كانافيرال على صاروخ دلتا 2. وكانت تلك آخر عملية إطلاق لذلك الصاروخ من تلك المنصة. مضت نحو سبعة أشهر في الفضاء، وهي تدور ببطء كي لا يحترق جانبها في الشمس بينما يتجمّد الآخر.",
          "عند وصولها إلى المريخ في يناير 2004، كان على العربة أن تنجو من أخطر دقيقة في المهمة. دخلت الغلاف الجوي بسرعة 5 كيلومترات في الثانية محميةً بدرع حراري، ثم مظلة، ثم صواريخ، ثم أكياس هوائية جعلتها ترتدّ على السهل ككرة شاطئ.",
          "أدت الأكياس الهوائية مهمتها. انقلبت العربة، ودارت حتى استقرت على سطحها، ثم فُردّت الألواح الشمسية. وأظهرت أول الصور التي أرسلتها سهلاً مسطّحاً من رمل داكن وصخور متفرقة. ثم نزلت العربة من منصة الهبوط، فبدأت المهمة.",
          "وما تلا ذلك لم يكن جولة، بل سلسلة أسئلة يُجاب عنها صخرةً بعد صخرة. لم تكن العربة تتجاوز بضعة عشرات من الأمتار في اليوم، بل كانت تتوقف غالباً لتنظر وتقيس وتفكّر. وعلى مدى خمسة عشر عاماً غطّت هذه العملية البطيئة 45.16 كيلومتراً — أبعد من أي مركبة أخرى سارت على عالم آخر.",
        ],
      },
      echo: {
        en: "The landing was the scary part. Twenty-one parachutes opened, then the airbags hit the ground at about 40 kilometres per hour. The rover survived, and immediately started working.",
        ar: "كان الهبوط هو الجزء المثير للخوف. فُتحت إحدى وعشرين مظلة، ثم اصطدمت الأكياس الهوائية بالأرض بسرعة نحو 40 كيلومتراً في الساعة. ونجت العربة، وبدأت العمل فوراً.",
      },
      timeline: [
        {
          id: "opp-launch",
          date: "2003-07-08",
          dateLabel: { en: "8 July 2003", ar: "8 يوليو 2003" },
          label: { en: "Launch", ar: "الإطلاق" },
          description: {
            en: "A Delta II rocket launched Opportunity from Cape Canaveral, Florida.",
            ar: "أطلقت صاروخ دلتا 2 العربة من كيب كانافيرال في فلوريدا.",
          },
          type: "launch",
          sourceIds: ["SRC-OPPORTUNITY"],
        },
        {
          id: "opp-cruise",
          date: "2003-07-08",
          dateLabel: { en: "July 2003 – January 2004", ar: "يوليو 2003 – يناير 2004" },
          label: { en: "Cruise", ar: "الرحلة البينية" },
          description: {
            en: "About seven months of coasting to Mars, with the spacecraft rotating slowly to spread out the heating.",
            ar: "نحو سبعة أشهر من الانتقال إلى المريخ، مع دوران المركبة ببطء لتوزيع الحرارة.",
          },
          type: "milestone",
          sourceIds: ["SRC-OPPORTUNITY"],
        },
        {
          id: "opp-landing",
          date: "2004-01-25",
          dateLabel: { en: "25 January 2004", ar: "25 يناير 2004" },
          label: { en: "Bouncing landing", ar: "هبوط بالارتداد" },
          description: {
            en: "Airbags carried the rover down and it rolled to a stop in Eagle Crater, in Meridiani Planum.",
            ar: "حملت الأكياس الهوائية العربة إلى الأسفل فاستقرت في فوهة النسر بميدانيوم بلانيوم.",
          },
          type: "landing",
          sourceIds: ["SRC-OPPORTUNITY", "SRC-NSSDCA-OPPORTUNITY"],
        },
        {
          id: "opp-firstdrive",
          date: "2004-02-20",
          dateLabel: { en: "February 2004", ar: "فبراير 2004" },
          label: { en: "First drive", ar: "أول قيادة" },
          description: {
            en: "The rover rolled off the lander platform and began to move across the plain.",
            ar: "نزلت العربة من منصة الهبوط وبدأت تتحرك عبر السهل.",
          },
          type: "deployment",
          sourceIds: ["SRC-OPPORTUNITY"],
        },
        {
          id: "opp-water",
          date: "2004-03-02",
          dateLabel: { en: "2 March 2004", ar: "2 مارس 2004" },
          label: { en: "Evidence of ancient water", ar: "دليل على مياه قديمة" },
          description: {
            en: "NASA announced that Opportunity had found evidence that liquid water once existed at its landing site.",
            ar: "أعلنت ناسا أن أوبورتينيتي وجدت دليلاً على وجود ماء سائل في الماضي بموقع هبوطها.",
          },
          type: "milestone",
          sourceIds: ["SRC-OPPORTUNITY"],
        },
        {
          id: "opp-endeavour",
          date: "2010-03-24",
          dateLabel: { en: "March 2010", ar: "مارس 2010" },
          label: { en: "Reaches Endeavour Crater", ar: "الوصول إلى فوهة إنديفور" },
          description: {
            en: "After more than six years of driving, the rover reached the rim of Endeavour Crater, a 22-kilometre impact crater that exposed much older rock.",
            ar: "بعد أكثر من ست سنوات من القيادة، وصلت العربة إلى حافة فوهة إنديفور، وهي فوهة ارتطام بقطر 22 كيلومتراً تكشف صخوراً أقدم بكثير.",
          },
          type: "milestone",
          sourceIds: ["SRC-OPPORTUNITY"],
        },
        {
          id: "opp-endurance",
          date: "2015-03-24",
          dateLabel: { en: "March 2015", ar: "مارس 2015" },
          label: { en: "Into Endurance Crater", ar: "دخول فوهة إندورانس" },
          description: {
            en: "Opportunity drove down the slope into Endurance Crater, a low spot where salty groundwater may have once collected.",
            ar: "انطلقت أوبورتينيتي في منحدر فوهة إندورانس، وهي منخفضة قد تجمع فيها المياه الجوفية المالحة في الماضي.",
          },
          type: "milestone",
          sourceIds: ["SRC-OPPORTUNITY"],
        },
        {
          id: "opp-storm",
          date: "2018-05-10",
          dateLabel: { en: "May 2018", ar: "مايو 2018" },
          label: { en: "Global dust storm", ar: "عاصفة غبار عالمية" },
          description: {
            en: "A planet-encircling dust storm blocked the sunlight the rover needed to make power.",
            ar: "عاصفة غبار عمّت الكوكب وحجبت ضوء الشمس الذي تحتاجه العربة لتوليد الطاقة.",
          },
          type: "milestone",
          sourceIds: ["SRC-OPPORTUNITY"],
        },
        {
          id: "opp-last",
          date: "2018-06-10",
          dateLabel: { en: "10 June 2018", ar: "10 يونيو 2018" },
          label: { en: "Last contact", ar: "آخر اتصال" },
          description: {
            en: "The rover sent its final data and stopped reporting. It was in low power, waiting for the storm to clear.",
            ar: "أرسلت العربة بياناتها الأخيرة ثم توقفت عن الإبلاغ. كانت في طاقة منخفضة، تنتظر انقضاء العاصفة.",
          },
          type: "last-contact",
          sourceIds: ["SRC-OPPORTUNITY", "SRC-NSSDCA-OPPORTUNITY"],
        },
        {
          id: "opp-end",
          date: "2019-02-13",
          dateLabel: { en: "13 February 2019", ar: "13 فبراير 2019" },
          label: { en: "Mission ended", ar: "انتهاء المهمة" },
          description: {
            en: "NASA ended the Opportunity mission after months of attempts to reach the rover.",
            ar: "أنهت ناسا مهمة أوبورتينيتي بعد أشهر من المحاولات للوصول إلى العربة.",
          },
          type: "end-of-mission",
          sourceIds: ["SRC-OPPORTUNITY"],
        },
      ],
      diagram: {
        kind: "journey-map",
        title: { en: "The route to Meridiani Planum", ar: "الطريق إلى ميدانيوم بلانيوم" },
        intro: {
          en: "Every step of the way, from launch to the end of the mission.",
          ar: "كل خطوة في الطريق، من الإطلاق حتى نهاية المهمة.",
        },
        route: [
          {
            label: { en: "Launch", ar: "الإطلاق" },
            description: {
              en: "Cape Canaveral, Earth",
              ar: "كيب كانافيرال، الأرض",
            },
          },
          {
            label: { en: "Cruise", ar: "الرحلة البينية" },
            description: {
              en: "Seven months coasting to Mars",
              ar: "سبعة أشهر من الانتقال إلى المريخ",
            },
          },
          {
            label: { en: "Landing", ar: "الهبوط" },
            description: {
              en: "Eagle Crater, Meridiani Planum",
              ar: "فوهة النسر، ميدانيوم بلانيوم",
            },
          },
          {
            label: { en: "Exploration", ar: "الاستكشاف" },
            description: {
              en: "15 years and 45.16 km of driving",
              ar: "15 عاماً و45.16 كيلومتراً من السير",
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
              en: "Launch from Cape Canaveral on 8 July 2003.",
              ar: "الإطلاق من كيب كانافيرال في 8 يوليو 2003.",
            },
          },
          {
            id: "mars",
            x: 84,
            y: 32,
            label: { en: "Mars", ar: "المريخ" },
            detail: {
              en: "Arrival on 25 January 2004, then a bouncing landing in Eagle Crater.",
              ar: "الوصول في 25 يناير 2004، ثم هبوط بالارتداد في فوهة النسر.",
            },
          },
        ],
      },
      challenge: {
        id: "opp-challenge",
        prompt: {
          en: "A planet-wide dust storm is dimming the Sun. What should the rover do first?",
          ar: "عاصفة غبار عمّت الكوكب تُعتِم الشمس. ما الإجراء الأول الذي ينبغي أن تتخذه العربة؟",
        },
        options: [
          {
            id: "a",
            label: {
              en: "Drive as far as possible before the power runs out",
              ar: "القيادة لأبعد مسافة ممكنة قبل نفاد الطاقة",
            },
          },
          {
            id: "b",
            label: {
              en: "Stop all activity and wait for the storm to pass",
              ar: "إيقاف كل النشاط وانتظار انقضاء العاصفة",
            },
          },
          {
            id: "c",
            label: {
              en: "Keep working at full power while the batteries last",
              ar: "الاستمرار في العمل بأقصى طاقة ما دامت البطاريات",
            },
          },
        ],
        correctOptionId: "b",
        reality: {
          en: "Opportunity had no dust covers and no way to protect itself. In a storm like this, driving takes more power than it saves, and staying still lets the rover wait out the storm on its remaining charge. That was the right decision — and it still ran out of power before the sky cleared.",
          ar: "لم يكن لدى أوبورتينيتي أغطية غبار ولا أي وسيلة لحماية نفسها. وفي عاصفة كهذه، تستهلك القيادة طاقة أكثر مما توفر، والبقاء ساكناً يتيح للعربة انتظار انقضاء العاصفة بشحنها المتبقي. وهذا كان القرار الصحيح — ومع ذلك نفدت طاقتها قبل أن تصفو السماء.",
        },
      },
    },
    {
      id: "discoveries",
      kind: "discoveries",
      eyebrow: { en: "Chapter four", ar: "الفصل الرابع" },
      title: { en: "The Discoveries", ar: "الاكتشافات" },
      summary: {
        en: "Four investigations, each one a question, an instrument, a measurement and a conclusion.",
        ar: "أربع تحقيقات، كل منها سؤال وجهاز وقياس وخلاصة.",
      },
      narrative: {
        en: [
          "Scientific results are easy to lose in a headline. These are the findings that mattered, written out as the investigations they actually were.",
        ],
        ar: [
          "من السهل أن تضيع النتائج العلمية في عنوان عابر. إليك الاكتشافات المهمة، مكتوبة على هيئة التحقيقات التي كانت عليه فعلاً.",
        ],
      },
      echo: {
        en: "Here is the part I like best. Each discovery starts with a question a scientist actually asked. Watch how the instrument answers it.",
        ar: "هذا هو الجزء الذي أحبّه أكثر. يبدأ كل اكتشاف بسؤال طرحه عالم فعلاً. لاحظ كيف يجيب الجهاز عن السؤال.",
      },
      discoveries: [
        {
          id: "opp-d1",
          title: {
            en: "Iron minerals that only water can make",
            ar: "معادن حديدية لا صنعها إلا الماء",
          },
          question: {
            en: "Did liquid water ever exist here?",
            ar: "هل وُجد ماء سائل هنا يوماً؟",
          },
          instrument: {
            en: "Mössbauer Spectrometer and Miniature Thermal Emission Spectrometer",
            ar: "مقياس موسباور الطيفي ومقياس ميني-تي إي الحراري المصغّر",
          },
          method: {
            en: "The Mössbauer spectrometer measured how many iron atoms in a rock were in a particular chemical form. The Mini-TES measured the infrared heat given off by the same rocks from orbit-high altitude. Both instruments looked at the same target from different angles.",
            ar: "قاس مقياس موسباور عدد ذرّات الحديد في الصخرة الموجودة في صورة كيميائية بعينها. وقاس ميني-تي إي الحرارة تحت الحمراء التي تنبعث من الصخور نفسها. وقد نظر الجهازان إلى الهدف نفسه من زاويتين مختلفتين.",
          },
          data: {
            en: "Both instruments reported hematite — a form of iron oxide — in the outcrops near the landing site. Earth hematite usually forms in water or in hot volcanic air. On Mars, there is no hot volcanic air, so the mineral pointed to water.",
            ar: "أبلغ الجهازان كلاهما عن وجود الهيماتيت — أحد أشكال أكسيد الحديد — في الصخور المكشوفة قرب موقع الهبوط. والهيماتيت على الأرض يتكوّن عادةً في الماء أو في هواء بركاني ساخن. وبما أنه لا يوجد هواء بركاني ساخن على المريخ، فإن المعدن يشير إلى الماء.",
          },
          finding: {
            en: "Opportunity found hematite at Meridiani Planum, and later found the mineral jarosite — an iron sulphate that forms in acidic, watery conditions.",
            ar: "عثرت أوبورتينيتي على الهيماتيت في ميدانيوم بلانيوم، ثم وجدت لاحقاً معدن الجاروسيت — كبريتات حديدية تتكوّن في ظروف مائية حمضية.",
          },
          significance: {
            en: "This was the first strong, on-the-ground evidence that liquid water once existed on the Martian surface — not a theory from orbit, but minerals measured by a robot standing in the rock.",
            ar: "كان هذا أول دليل قوي، مأخوذ من على الأرض، على وجود ماء سائل على سطح المريخ — لا نظرية من المدار، بل معادن قاستها روبوت واقف داخل الصخر.",
          },
          media: [echoImage("PIA20285", {
            alt: {
              en: "Opportunity placing its instruments against a rock on Mars.",
              ar: "أوبورتينيتي تضع أجهزتها على صخرة على المريخ.",
            },
            caption: {
              en: "The rover reading a rock with its instrument arm. Reading one target with several instruments at once is how a single strange rock is checked.",
              ar: "العربة تقرأ صخرة بذراع أجهزتها. وقراءة هدف واحد بعدّة أجهزة في وقت واحد هي طريقة التحقّق من صخرة غريبة.",
            },
          })],
          sourceIds: ["SRC-OPPORTUNITY"],
        },
        {
          id: "opp-d2",
          title: {
            en: "The ground was made in layers",
            ar: "الأرض تشكّلت في طبقات",
          },
          question: {
            en: "Was the water deep and still, or shallow and moving?",
            ar: "هل كان الماء عميقاً وساكناً، أم ضحلاً ومتحرّكاً؟",
          },
          instrument: {
            en: "Panoramic Camera, Microscopic Imager and the orbital cameras of Mars Global Surveyor",
            ar: "الكاميرا البانورامية وجهاز التصوير المجهري وكاميرات مركبة مستكشف المريخ المدارية",
          },
          method: {
            en: "The rover photographed stacked layers of rock at the walls of craters it entered. In 2005 the Mars Global Surveyor spacecraft, still in orbit, photographed the same layers from above at a resolution that matched the rover's close-up view.",
            ar: "صوّرت العربة طبقات صخرية متراكمة على جدران الفوهات التي دخلتها. وفي عام 2005 صوّرت مركبة «مستكشف المريخ» وهي لا تزال في المدار — الطبقات نفسها من الأعلى بدقة طابقت لقطة العربة القريبة.",
          },
          data: {
            en: "The layers were thin, even and cross-bedded — exactly the pattern left when sediment settles in shallow, moving water and the current keeps rippling the sand.",
            ar: "كانت الطبقات رقيقة ومستوية ومتشابكة — وهو بالضبط النمط الذي يتركه ترسّب الطمي في ماء ضحل متحرّك حين تحافظ التيارات على تموّج الرمل.",
          },
          finding: {
            en: "Opportunity showed that Meridiani Planum was once covered by shallow, salty water that came and went — an ancient shoreline environment, not a permanent ocean.",
            ar: "أظهرت أوبورتينيتي أن ميدانيوم بلانيوم كان مغطّى قديماً بماء ضحل مالح يأتي ويذهب — بيئة شاطئ قديمة، لا محيطاً دائماً.",
          },
          significance: {
            en: "This changed what scientists thought water on early Mars looked like. It was not a global ocean: it was temporary, shallow seas and lakes, like a tide that came in and went out.",
            ar: "غيّر هذا ما ظنّه العلماء عن الماء في المريخ المبكر. لم يكن محيطاً عالمياً، بل بحيرات ومياه ضحلة مؤقتة، مثل مدّ يأتي ويذهب.",
          },
          sourceIds: ["SRC-OPPORTUNITY"],
        },
        {
          id: "opp-d3",
          title: {
            en: "Little spheres, like blueberries",
            ar: "كرات صغيرة، كالتوت الأزرق",
          },
          question: {
            en: "Can a rock form underground, inside a wet soil?",
            ar: "هل يمكن أن يتكوّن صخر في باطن الأرض، داخل تربة رطبة؟",
          },
          instrument: {
            en: "Microscopic Imager and Mössbauer Spectrometer",
            ar: "جهاز التصوير المجهري ومقياس موسباور الطيفي",
          },
          method: {
            en: "The rover found round pebbles a few millimetres across scattered on the ground and pressed the microscopic imager against them. It also took the elemental readings of one of them with the spectrometers.",
            ar: "عثرت العربة على حصى مستدير بحجم بضعة مليمترات مبثوثة على الأرض، وضغطت جهاز التصوير المجهري عليها. وأخذت أيضاً مقاييس الطيف لعناصر إحدى هذه الحصوات.",
          },
          data: {
            en: "The spheres were rich in hematite, and they had grown inside the ground rather than being carried down from somewhere else. Growing concretions like these takes time and groundwater moving through soil.",
            ar: " كانت الكرات غنية بالهيماتيت، وقد نمت داخل الأرض بدل أن تكون محمولة من مكان آخر. وتكوّن مثل هذه التكثّفات يحتاج وقتاً ومياه جوفية تمرّ عبر التربة.",
          },
          finding: {
            en: "The rover confirmed that liquid water moved through the soil at Meridiani Planum and left mineral deposits behind as it went.",
            ar: "أكّدت العربة أن الماء السائل مرّ في تربة ميدانيوم بلانيوم وترك وراه ترسّبات معدنية في طريقه.",
          },
          significance: {
            en: "A small round rock can be stronger evidence than a big dramatic one, because it proves a chemical process, not just a landscape.",
            ar: "قد تكون الصخرة الصغيرة المستديرة دليلاً أقوى من الصخرة الكبيرة المهيبة، لأنها تثبت عملية كيميائية لا مجرد منظر.",
          },
          sourceIds: ["SRC-OPPORTUNITY"],
        },
        {
          id: "opp-d4",
          title: {
            en: "A stadium-sized crater, and the rock inside it",
            ar: "فوهة بحجم ملعب، والصخر داخلها",
          },
          question: {
            en: "How old are the layers, and what came before them?",
            ar: "كم عمر الطبقات، وما الذي جاء قبلها؟",
          },
          instrument: {
            en: "Panoramic Camera, Mini-TES and the spectrometers on the arm",
            ar: "الكاميرا البانورامية وميني-تي إي ومقاييس الطيف على الذراع",
          },
          method: {
            en: "After more than six years of driving, Opportunity reached Endeavour Crater, a 22-kilometre impact crater. Driving into it brought older rock within reach of the arm and the spectrometers.",
            ar: "بعد أكثر من ست سنوات من القيادة، وصلت أوبورتينيتي إلى فوهة إنديفور، وهي فوهة ارتطام بقطر 22 كيلومتراً. والقيادة داخلها أتاحت للذراع ومقاييس الطيف الوصول إلى صخور أقدم.",
          },
          data: {
            en: "Inside the crater the rover found breccias — rocks made of fragments of other rocks — and veins of a mineral that forms as groundwater moves through rock and deposits material along the cracks.",
            ar: "داخل الفوهة وجدت العربة بَرَكاً — صخوراً مكوّنة من شظايا صخور أخرى — وعُروقاً لمعدن يتكوّن حين تسري المياه الجوفية في الصخر وتترسب مادتها على الشقوق.",
          },
          finding: {
            en: "Endeavour Crater and the smaller Endurance Crater gave Opportunity access to rock from earlier in Martian history than anything it had studied before.",
            ar: "منحت فوهة إنديفور وفوهة إندورانس الأصغر أوبورتينيتي وصولاً إلى صخور من تاريخ مريخي أقدم من كل ما درسته من قبل.",
          },
          significance: {
            en: "By the end, Opportunity was doing geology on rock far older than anything it had found at the start — a rover that kept deepening its own question for fifteen years.",
            ar: "بحلول النهاية، كانت أوبورتينيتي تمارس علم الجيولوجيا على صخور أقدم بكثير مما وجدت في البداية — عربة عمّقت سؤالها الخاص خمسة عشر عاماً.",
          },
          media: [echoImage("PIA21708", {
            alt: {
              en: "A wide view across the rim of Orion Crater from the Opportunity rover.",
              ar: "منظر واسع عبر حافة فوهة أوريون من عربة أوبورتينيتي.",
            },
            caption: {
              en: "Standing on a crater rim, the rover can look down into layers that were buried long before it arrived.",
              ar: "وهي تقف على حافة فوهة، تستطيع العربة النظر إلى طبقات دُفنت قبل وصولها بزمن طويل.",
            },
          })],
          sourceIds: ["SRC-OPPORTUNITY"],
        },
      ],
      media: [
        echoVideo("ksc_042104_meteor", {
          alt: {
            en: "NASA video segment on Opportunity's analysis of a volcanic rock at Meridiani Planum using the Mini-TES and Mössbauer spectrometers.",
            ar: "مقطع فيديو من ناسا عن تحليل أوبورتينيتي لصخرة بركانية في ميدانيوم بلانيوم باستخدام ميني-تي إي وموسباور.",
          },
          caption: {
            en: "A NASA video segment from 2004 describing Opportunity's work on the rock Bounce, and how the rover's spectrometers identified the minerals inside it.",
            ar: "مقطع فيديو من ناسا عام 2004 يشرح عمل أوبورتينيتي على الصخرة «بونس»، وكيفحدّدت مقاييس الطيف في العربة المعادن بداخلها.",
          },
          transcript: {
            en: [
              "NASA video segment: at Meridiani Planum, Opportunity has found a volcanic rock called Bounce.",
              "The segment explains that the rover's Mini-TES and Mössbauer spectrometers found the element pyroxene, a volcanic mineral, in the football-sized rock.",
              "It notes that the composition of this rock is unlike other volcanic rocks found on Mars, and explains why that is scientifically useful.",
            ],
            ar: [
              "مقطع فيديو من ناسا: في ميدانيوم بلانيوم، عثرت أوبورتينيتي على صخرة بركانية اسمها «بونس».",
              "يشرح المقطع أن مقياس ميني-تي إي وموسباور في العربة وجدا عنصر البيروكسين، وهو معدن بركاني، في الصخرة بحجم كرة القدم.",
              "ويشير إلى أن تركيبة هذه الصخرة تختلف عن الصخور البركانية الأخرى الموجودة على المريخ، ويشرح لماذا هذا ذو قيمة علمية.",
            ],
          },
        }),
      ],
      quiz: [
        {
          id: "opp-q5",
          prompt: {
            en: "Why did hematite matter so much on Mars?",
            ar: "لماذا كان الهيماتيت مهماً إلى هذا الحد على المريخ؟",
          },
          options: [
            {
              id: "a",
              label: {
                en: "It is the most common mineral in Mars's soil",
                ar: "إنه أكثر المعادن شيوعاً في تربة المريخ",
              },
            },
            {
              id: "b",
              label: {
                en: "On Earth it usually forms in water, and Mars has no hot volcanic air to make it instead",
                ar: "على الأرض يتكوّن عادةً في الماء، ولا يوجد في المريخ هواء بركاني ساخن يصنعه بدلاً من ذلك",
              },
            },
            {
              id: "c",
              label: {
                en: "It is radioactive and dates the surrounding rock",
                ar: "إنه مشعّ ويؤرّخ الصخر المحيط",
              },
            },
          ],
          correctOptionId: "b",
          explanation: {
            en: "On Earth hematite forms either in water or in hot volcanic gas. Mars has no active volcanism now, so hematite there is best explained by water.",
            ar: "على الأرض يتكوّن الهيماتيت إما في الماء أو في غاز بركاني ساخن. والمريخ لا بركانية نشطة فيه اليوم، لذا فأفضل تفسير للهيماتيت هناك هو الماء.",
          },
        },
        {
          id: "opp-q6",
          prompt: {
            en: "What did Opportunity's layered rocks tell scientists about early Mars?",
            ar: "ماذا أخبرت صخور أوبورتينيتي الطبقية العلماء عن المريخ المبكر؟",
          },
          options: [
            {
              id: "a",
              label: {
                en: "Mars was covered by a deep global ocean",
                ar: "أن المريخ كان مغطّى بمحيط عالمي عميق",
              },
            },
            {
              id: "b",
              label: {
                en: "Shallow, salty water came and went over the plains",
                ar: "أن ماءً ضحلاً مالحاً يأتي ويذهب فوق السهول",
              },
            },
            {
              id: "c",
              label: {
                en: "The plains were made of volcanic ash",
                ar: "أن السهول كانت مصنوعة من رماد بركاني",
              },
            },
          ],
          correctOptionId: "b",
          explanation: {
            en: "The cross-bedded layers are the signature of shallow, moving water. Opportunity's evidence pointed to temporary seas and lakes, not a permanent ocean.",
            ar: "الطبقات المتشابكة هي البصمة المميزة لماء ضحل متحرّك. وقد أرخت أدلة أوبورتينيتي إلى بحيرات ومياه مؤقتة، لا إلى محيط دائم.",
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
        en: "What really happened in June 2018 — and what NASA could and could not confirm.",
        ar: "ما حدث فعلاً في يونيو 2018 — وما الذي استطاعت ناسا تأكيده وما لم تستطع.",
      },
      narrative: {
        en: [
          "In May 2018 a dust storm began on Mars and grew until it wrapped around the entire planet. It darkened the sky so completely that the midday sun could not be seen. For Opportunity, which had been living on solar power for fourteen years, that was a crisis measured in watts.",
          "The rover's last transmission came on 10 June 2018. Its power was low, and it was waiting for the storm to clear so it could recharge. The storm lasted about 45 days. Opportunity never came back.",
          "NASA did not guess. The team used the Mars Atmosphere and Volatile Evolution spacecraft, still in orbit around Mars, to send radio commands to the rover and listen for any reply. For more than eight months there was none. In February 2019 NASA announced that the Opportunity mission was complete.",
          "What the rover was doing in those final months is not known. The most likely explanation, and the one NASA has stated publicly, is that the rover's batteries ran down while it was covered in dust. Beyond that, the record stays silent — and this story will not invent an answer.",
        ],
        ar: [
          "في مايو 2018 بدأت عاصفة غبار على المريخ ونمت حتى أحاطت بالكوكب كله، وحجبت السماء تماماً بحيث لم يعد شمس الظهيرة مرئية. ولأوبورتينيتي، التي عاشت على الطاقة الشمسية أربعة عشر عاماً، كانت تلك أزمة تُقاس بالواط.",
          "جاء آخر إرسال من العربة في 10 يونيو 2018. كانت طاقتها منخفضة، وكانت تنتظر انقضاء العاصفة لتعيد الشحن. واستمرت العاصفة نحو 45 يوماً. ولم تعد أوبورتينيتي أبداً.",
          "لم تُخمّن ناسا. فقد استخدم الفريق مركبة «تطوّر الغلاف الجوي والمتطايرات للمريخ»، التي كانت لا تزال في مدار المريخ، لإرسال أوامر راديوية إلى العربة والاستماع إلى أي رد. ولم يكن هناك رد لأكثر من ثمانية أشهر. وفي فبراير 2019 أعلنت ناسا أن مهمة أوبورتينيتي قد اكتملت.",
          "ما الذي كانت تفعله العربة في تلك الأشهر الأخيرة غير معروف. والتفسير الأرجح — وهو ما أعلنته ناسا علناً — أن بطاريات العربة نفدت وهي مغطاة بالغبار. وما أبعد من ذلك يبقى السجل صامتاً — ولن تخترع هذه القصة إجابة.",
        ],
      },
      echo: {
        en: "I want to be careful here. We know the last date and we know the storm. We do not know what the rover was doing in the end. NASA says it stopped responding, and that is what I will say.",
        ar: "أودّ أن أكون دقيقاً هنا. نعرف التاريخ الأخير ونعرف العاصفة. ولا نعرف ما كانت تفعله العربة في النهاية. قالت ناسا إنها توقفت عن الاستجابة، وهذا ما سأقوله.",
      },
      facts: [
        {
          label: { en: "Last data received", ar: "آخر بيانات وصلت" },
          value: { en: "10 June 2018", ar: "10 يونيو 2018" },
        },
        {
          label: { en: "Storm duration", ar: "مدة العاصفة" },
          value: {
            en: "About 45 days of planet-wide dust",
            ar: "نحو 45 يوماً من غبار شمل الكوكب",
          },
        },
        {
          label: { en: "Attempts to contact", ar: "محاولات الاتصال" },
          value: {
            en: "Radio commands relayed by a spacecraft in Martian orbit",
            ar: "أوامر راديوية بدّلت مركبة في مدار المريخ",
          },
        },
        {
          label: { en: "Mission declared over", ar: "إعلان انتهاء المهمة" },
          value: { en: "13 February 2019", ar: "13 فبراير 2019" },
        },
      ],
      glossary: [
        {
          id: "dust-storm",
          term: { en: "Dust storm", ar: "عاصفة غبار" },
          simple: {
            en: "A storm of airborne dust. On Mars the dust can stay in the air for months and spread around the whole planet.",
            ar: "عاصفة من الغبار المحمول في الهواء. وعلى المريخ قد يبقى الغبار في الهواء لأشهر وينتشر حول الكوكب كله.",
          },
        },
        {
          id: "attitude",
          term: { en: "Safe mode", ar: "الوضع الآمن" },
          simple: {
            en: "When a rover runs low on power it stops everything except the most basic tasks, to save what is left.",
            ar: "حين تنخفض طاقة العربة تتوقف عن كل شيء إلا المهام الأساسية تماماً، مما يُوفّر ما تبقى.",
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
        en: "The knowledge that survived the rover, and the machines it made possible.",
        ar: "المعرفة التي نجت من العربة، والآلات التي مهّد لها الطريق.",
      },
      narrative: {
        en: [
          "Opportunity's hardware is a silent object on a Martian plain, still roughly where it stopped. Its data is not. Every conclusion about ancient water on Mars that we now take for granted was measured by that rover, and its calibration target is still used to check newer instruments.",
          "Its engineering legacy is just as concrete. The design team learned how to make a rover survive Martian winter after a 14-year-old design was given a new life; how to drive further in one sol than the plan allowed; how to protect a machine from dust — a lesson that later rovers took to heart with brush mechanisms and nuclear power.",
          "The rover's biggest argument was that a mission's worth is not decided by its planned length. Spirit, its twin, stopped moving in 2006 and its mission was ended in 2011. Opportunity kept going. Both answered their science questions; only one of them was still answering them fifteen years later.",
          "The machine is quiet. The knowledge is not.",
        ],
        ar: [
          "عتاد أوبورتينيتي صار جسماً صامتاً في سهل مريخي، قريباً في الغالب من حيث توقفت. أما بياناتها فليست كذلك. فكل خلاصة نعدّها اليوم بديهية عن المياه القديمة على المريخ قاستها تلك العربة، ولا يزال هدفها المعياري مستخدماً للتحقّق من الأجهزة الأحدث.",
          "ولا يقل إرثها الهندسي وضوحاً. فقد تعلّم فريق التصميم كيف يجعل العربة تصمد شتاءً مريخياً بعد أن مُنحت حياة جديدة لتصميم عمره 14 عاماً؛ وكيف تقود مسافة أطول في السول الواحد مما يسمح به خطّ الخطة؛ وكيف تحمي آلة من الغبار — وهو درس أخذته العُربات اللاحقة إلى صدور، بآليات فرشاة وأنظمة طاقة نووية.",
          "وأقوى حجّة قدّمتها العربة هي أن قيمة المهمة لا يقررها طولها المخطَّط. فقد توقفت أختها سبيريت عن الحركة عام 2006، وانتهت مهمتها عام 2011. أما أوبورتينيتي فواصلت. وقد أجابت الاثنتان عن أسئلتهما العلمية؛ لكن واحدة فقط كانت لا تزال تجيب بعد خمسة عشر عاماً.",
          "الآلة صامتة. أما المعرفة فلا.",
        ],
      },
      echo: {
        en: "Some missions end. Their discoveries live forever. Opportunity's data is still in the textbooks, in the rover designs, and in the dust on Mars.",
        ar: "بعض المهام تنتهي. أما اكتشافاتها فتعيش للأبد. بيانات أوبورتينيتي لا تزال في الكتب المدرسية، وفي تصميمات العُربات، وفي الغبار على المريخ.",
      },
      facts: [
        {
          label: { en: "Distance driven", ar: "المسافة المقطوعة" },
          value: { en: "45.16 km", ar: "45.16 كم" },
        },
        {
          label: { en: "Time on the surface", ar: "المدة على السطح" },
          value: {
            en: "More than 14 years and 8 months of surface operations",
            ar: "أكثر من 14 عاماً و8 أشهر من العمل السطحي",
          },
        },
        {
          label: { en: "Where it is now", ar: "أين هي الآن" },
          value: {
            en: "At Meridiani Planum, in a low-power state, not communicating",
            ar: "في ميدانيوم بلانيوم، في حالة طاقة منخفضة، دون اتصال",
          },
        },
        {
          label: { en: "Records it still holds", ar: "سجلات ما زالت حاملة" },
          value: {
            en: "The longest distance driven by a vehicle on another world, until Perseverance passed it.",
            ar: "أطول مسافة قطعتها مركبة على عالم آخر، حتى تجاوزتها بيرسيفرانس.",
          },
        },
      ],
    },
  ],
  legacyStatement: {
    en: "The mission ended. The knowledge did not.",
    ar: "انتهت المهمة. أما المعرفة فلا.",
  },
  tags: ["mars", "rover", "remnant"],
  artifactId: "opportunity",
  sourceIds: [
    "SRC-OPPORTUNITY",
    "SRC-NSSDCA-OPPORTUNITY",
    "SRC-MARS-PATHFINDER",
  ],
  relatedStorySlugs: ["sojourner", "viking-1-lander", "apollo-lunar-surface-experiments"],
  echoIntro: {
    en: "Hi, explorer! Today we're travelling to Mars to meet a little rover that changed what we know about the Red Planet.",
    ar: "مرحباً أيها المستكشف! اليوم سنسافر إلى المريخ لنتعرف على عربة صغيرة غيّرت فهمنا للكوكب الأحمر.",
  },
  echoSignoff: {
    en: "Opportunity is quiet now, but everything it measured is still in our records. Want to read another one?",
    ar: "أوبورتينيتي صامتة الآن، لكن كل ما قاسته ما زال في سجلاتنا. هل تقرأ قصة أخرى؟",
  },
  lastVerified: "2026-11-13",
};

/* The flagship's visual edit.  These short beats intentionally carry the
   reading experience; the full sourced chapter record remains available via
   “Explore the science” inside each scene. */
const opportunityScenePlan: Record<string, Array<{
  kind: "cinematic" | "comic" | "split" | "discovery" | "evidence" | "artifact";
  en: string; ar: string; mediaId?: string;
}>> = {
  meet: [
    { kind: "cinematic", en: "Before it explored another world, Opportunity was a solar-powered field laboratory built for a single question: did water once shape Mars?", ar: "قبل أن تستكشف عالماً آخر، كانت أوبورتينيتي مختبراً ميدانياً يعمل بالطاقة الشمسية بُني لسؤال واحد: هل شكّل الماء المريخ يوماً؟", mediaId: "PIA05513" },
    { kind: "comic", en: "Six wheels. A mast for seeing. An arm for touching rocks. The parts become a field scientist when they work together.", ar: "ست عجلات، وعمود للرؤية، وذراع للمس الصخور. تتحول الأجزاء إلى عالِم ميداني حين تعمل معاً.", mediaId: "PIA20285" },
    { kind: "artifact", en: "Turn the rover, select a real component, and discover its job.", ar: "أدر العربة، واختر جزءاً حقيقياً، واكتشف مهمته." },
  ],
  mission: [
    { kind: "split", en: "Scientists were not looking for a pretty landscape. They were testing rocks and soil for a past environment where water could have lasted.", ar: "لم يكن العلماء يبحثون عن منظر جميل؛ بل كانوا يختبرون الصخور والتربة بحثاً عن بيئة ماضية يمكن أن يستمر فيها الماء." },
    { kind: "comic", en: "A camera finds a target. Instruments read its minerals and elements. Several measurements cross-check one conclusion.", ar: "تجد الكاميرا هدفاً، وتقرأ الأجهزة معادنه وعناصره، وتتحقق قياسات متعددة من خلاصة واحدة.", mediaId: "PIA20285" },
    { kind: "discovery", en: "Evidence becomes stronger when independent instruments agree about the same rock.", ar: "يصير الدليل أقوى حين تتفق أجهزة مستقلة حول الصخرة نفسها." },
  ],
  journey: [
    { kind: "cinematic", en: "A Delta II carried Opportunity away from Earth on 8 July 2003. Seven months later, Mars filled its view.", ar: "حمل صاروخ دلتا 2 أوبورتينيتي بعيداً عن الأرض في 8 يوليو 2003. وبعد سبعة أشهر ملأ المريخ مجال رؤيتها." },
    { kind: "comic", en: "Heat shield. Parachute. Rockets. Airbags. Each beat had to work before the rover could take its first drive.", ar: "درع حراري، ومظلة، وصواريخ، وأكياس هوائية. كان على كل مرحلة أن تنجح قبل أن تبدأ العربة أول قيادة لها." },
    { kind: "evidence", en: "The view from Mars changed from a landing site into a route of questions, one careful drive at a time.", ar: "تحول مشهد المريخ من موقع هبوط إلى طريق من الأسئلة، بقيادة حذرة بعد أخرى.", mediaId: "PIA21708" },
  ],
  discoveries: [
    { kind: "cinematic", en: "The big discovery was not a single rock. It was a pattern, assembled from careful observations.", ar: "لم يكن الاكتشاف الكبير صخرة واحدة، بل نمطاً جُمع من ملاحظات دقيقة.", mediaId: "PIA21708" },
    { kind: "discovery", en: "Follow the investigation: question, instrument, measurement, conclusion.", ar: "اتبع التحقيق: سؤال، جهاز، قياس، خلاصة." },
    { kind: "evidence", en: "This is the boundary between illustrated reconstruction and mission evidence: archival imagery and the measurements it supports.", ar: "هنا الحد الفاصل بين إعادة الرسم التوضيحية ودليل المهمة: صور الأرشيف والقياسات التي تدعمها.", mediaId: "PIA20285" },
  ],
  ending: [
    { kind: "cinematic", en: "In 2018, a dust storm grew until it wrapped Mars. For a solar rover, the darkened sky was an emergency.", ar: "في عام 2018 نمت عاصفة غبار حتى أحاطت بالمريخ. وبالنسبة إلى عربة شمسية، كانت السماء المظلمة حالة طوارئ.", mediaId: "PIA22071" },
    { kind: "split", en: "The final transmission arrived on 10 June 2018. NASA listened for more than eight months; no reply came back.", ar: "وصل الإرسال الأخير في 10 يونيو 2018. استمعت ناسا لأكثر من ثمانية أشهر، ولم يصل رد." },
    { kind: "evidence", en: "The record confirms loss of communication and the mission's end. It does not invent a final moment.", ar: "يؤكد السجل انقطاع الاتصال ونهاية المهمة، ولا يخترع لحظة أخيرة.", mediaId: "PIA22071" },
  ],
  legacy: [
    { kind: "cinematic", en: "The rover is quiet on Mars. Its observations still shape the questions later explorers ask.", ar: "العربة صامتة على المريخ، لكن ملاحظاتها لا تزال تشكل الأسئلة التي يطرحها المستكشفون اللاحقون.", mediaId: "PIA05513" },
    { kind: "comic", en: "A planned 90-sols mission became a long experiment in careful driving, power management and scientific patience.", ar: "تحولت مهمة مخطط لها 90 سولاً إلى تجربة طويلة في القيادة الحذرة وإدارة الطاقة والصبر العلمي." },
    { kind: "evidence", en: "Historical images are kept as evidence. The illustrated story around them is always labelled as reconstruction.", ar: "تُحفظ الصور التاريخية كدليل. أما القصة المرسومة حولها فتوضع عليها دائماً علامة إعادة بناء.", mediaId: "PIA05513" },
  ],
};

for (const chapter of opportunityStory.chapters) {
  chapter.scenes = (opportunityScenePlan[chapter.id] || []).map((scene, index) => ({
    id: `${chapter.id}-scene-${index + 1}`,
    kind: scene.kind,
    title: chapter.title,
    narration: { en: scene.en, ar: scene.ar },
    mediaId: scene.mediaId,
  }));
}
