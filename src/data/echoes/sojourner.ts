import type { EchoStory } from "@/types/echo";
import { echoImage, echoVideo } from "./media";

/**
 * SOJOURNER — the rover that proved the idea.
 *
 * Sources: the NASA Science mission page for Mars Pathfinder, NASA/JPL
 * documentation and the GRAVERSE museum record for Sojourner.
 */
export const sojournerStory: EchoStory = {
  id: "sojourner",
  slug: "sojourner",
  title: {
    en: "Sojourner",
    ar: "سوجورنر",
  },
  storyTitle: {
    en: "The Little Rover That Opened the Door",
    ar: "العربة الصغيرة التي فتحت الباب",
  },
  dek: {
    en: "Ten kilograms, one microwave oven's worth of machine, and the first wheels to turn on Mars.",
    ar: "عشرة كيلوغرامات، آلة بحجم فرن الميكروويف، وأول عجلات تدور على المريخ.",
  },
  summary: {
    en: "Sojourner was a technology demonstration carried to Mars by the Mars Pathfinder lander. It was supposed to work for a few weeks. It proved that a small rover could drive on another planet — and that is exactly what every rover since has done.",
    ar: "كانت سوجورنر تجربة تقنية حملتها مركبة الهبوط «باثفايندر» إلى المريخ. كان مخطط لها أن تعمل بضعة أسابيع. وقد أثبتت أن عربة صغيرة يمكنها السير على كوكب آخر — وهذا بالضبط ما تفعله كل عربة منذ ذلك الحين.",
  },
  location: {
    en: "Ares Vallis, Mars",
    ar: "وادي آريس، المريخ",
  },
  locationNote: {
    en: "The rover landed in a rocky flood plain in the northern hemisphere of Mars. It stayed within a few hundred metres of the Pathfinder lander.",
    ar: "هبطت العربة في سهل فيضي صخري في نصف المريخ الشمالي. ولم تبتعد عن مركبة الهبوط «باثفايندر» أكثر من بضع مئات من الأمتار.",
  },
  equipmentType: {
    en: "Miniature solar-powered rover",
    ar: "عربة مصغّرة تعمل بالطاقة الشمسية",
  },
  missionPeriod: {
    en: "Launch 4 December 1996 · Landing 4 July 1997 · Last communication 27 September 1997",
    ar: "الإطلاق 4 ديسمبر 1996 · الهبوط 4 يوليو 1997 · آخر اتصال 27 سبتمبر 1997",
  },
  missionStatus: {
    en: "Mission complete — the Mars Pathfinder surface mission was closed in 1997.",
    ar: "اكتملت المهمة — أُغلقت المهمة السطحية لباثفايندر عام 1997.",
  },
  hardwareStatus: {
    en: "Inactive — the rover is still at Ares Vallis and no longer communicates.",
    ar: "غير نشطة — ما تزال العربة في وادي آريس ولا تتواصل.",
  },
  statusKind: "silent",
  accent: "#F2B33D",
  accentSoft: "#FBE7BF",
  badge: {
    en: "First Wheels",
    ar: "أول العجلات",
  },
  badgeKey: "first-wheels",
  hero: echoImage("PIA01551", {
    alt: {
      en: "The Sojourner rover freshly deployed on the dusty surface of Mars, seen from the Pathfinder lander's camera.",
      ar: "العربة سوجورنر بعد نشرها حديثاً على سطح المريخ الترابي، كما رآتها كاميرا مركبة الهبوط «باثفايندر».",
    },
    caption: {
      en: "Sojourner on the surface of Mars shortly after leaving the lander, on the first days of the mission in July 1997.",
      ar: "سوجورنر على سطح المريخ بعد أن نزلت من مركبة الهبوط مباشرة، في الأيام الأولى من المهمة في يوليو 1997.",
    },
  }),
  gallery: [
    echoImage("PIA01121", {
      alt: {
        en: "Sojourner looking back at the Pathfinder lander it drove away from.",
        ar: "سوجورنر تنظر إلى مركبة الهبوط «باثفايندر» التي ابتعدت عنها.",
      },
      caption: {
        en: "The rover's view back towards the lander that carried it to Mars. For the whole mission, the lander was the base, the radio and the safety net.",
        ar: "منظر العربة إلى مركبة الهبوط التي حملتها إلى المريخ. طوال المهمة، كانت مركبة الهبوط هي القاعدة والراديو وشبكة الأمان.",
      },
    }),
    echoImage("PIA01137", {
      alt: {
        en: "Wheel tracks left by the Sojourner rover in soft Martian soil.",
        ar: "آثار عجلات تركتها عربة سوجورنر في تربة مريخية لينة.",
      },
      caption: {
        en: "Sojourner's tracks. The rover's six wheels had no motor strong enough to dig in — it had to push, which is why the tracks are so faint.",
        ar: "آثار سوجورنر. لم تكن لعجلاتها الست قوة كافية للحفر — إذ كان عليها أن تدفع، ولهذا آثارها خفيفة جداً.",
      },
    }),
    echoImage("PIA04422", {
      alt: {
        en: "A NASA illustration comparing the Mars rovers Sojourner, Spirit and Opportunity.",
        ar: "رسم من ناسا يقارن بين عربات المريخ سوجورنر وسبيريت وأوبورتينيتي.",
      },
      caption: {
        en: "A NASA illustration comparing the sizes of the three rovers that opened the Mars rover programme.",
        ar: "رسم من ناسا يقارن أحجام العُربات الثلاث التي فتحت برنامج عُربات المريخ.",
      },
    }),
  ],
  facts: [
    {
      label: { en: "Mass", ar: "الكتلة" },
      value: { en: "10.6 kg", ar: "10.6 كغ" },
    },
    {
      label: { en: "Size", ar: "الأبعاد" },
      value: {
        en: "About 63 cm long, 48 cm wide and 28 cm tall.",
        ar: "نحو 63 سم طولاً و48 سم عرضاً و28 سم ارتفاعاً.",
      },
    },
    {
      label: { en: "Top speed", ar: "أقصى سرعة" },
      value: { en: "About 1 cm per second", ar: "نحو 1 سم في الثانية" },
    },
    {
      label: { en: "Distance driven", ar: "المسافة المقطوعة" },
      value: { en: "About 100 metres", ar: "نحو 100 متر" },
    },
    {
      label: { en: "Instruments", ar: "الأجهزة" },
      value: {
        en: "Three rover cameras (two black-and-white, one colour) and the Alpha Proton X-ray Spectrometer.",
        ar: "ثلاث كاميرات على العربة (اثنتان بالأبيض والأسود وواحدة ملوّنة) ومقياس أشعة إكس ألف البروتوني.",
      },
    },
    {
      label: { en: "Carried by", ar: "حملتها" },
      value: {
        en: "The Mars Pathfinder lander, which relayed all communications to Earth.",
        ar: "مركبة الهبوط «باثفايندر»، التي كانت تنقل كل الاتصالات إلى الأرض.",
      },
    },
    {
      label: { en: "Landing site", ar: "موقع الهبوط" },
      value: { en: "Ares Vallis", ar: "وادي آريس" },
    },
    {
      label: { en: "Last communication", ar: "آخر اتصال" },
      value: { en: "27 September 1997", ar: "27 سبتمبر 1997" },
    },
  ],
  model: {
    procedural: "sojourner",
    title: {
      en: "Sojourner — reconstruction",
      ar: "سوجورنر — إعادة بناء",
    },
    description: {
      en: "A GRAVERSE reconstruction built from Three.js primitives, using the published dimensions of the real rover. Rotate it and select a part.",
      ar: "إعادة بناء من GRAVERSE مصنوعة من أشكال Three.js الأساسية، اعتماداً على الأبعاد المنشورة للعربة الحقيقية. أدرها واختر أي جزء.",
    },
    credit: "GRAVERSE",
    organization: "GRAVERSE",
    sourceUrl: "https://science.nasa.gov/mission/mars-pathfinder/",
    provenance: {
      en: "Educational reconstruction drawn by GRAVERSE from published dimensions. It is not a NASA model or a photograph.",
      ar: "إعادة بناء تعليمية رسمها GRAVERSE انطلاقاً من الأبعاد المنشورة. وهي ليست نموذج ناسا ولا صورة فوتوغرافية.",
    },
    hotspots: [
      {
        id: "panel",
        position: [0, 0.4, 0],
        label: { en: "Solar panel", ar: "اللوح الشمسي" },
        detail: {
          en: "A single solar panel across the top of the rover. It charged the batteries that kept the electronics alive.",
          ar: "لوح شمسي واحد يعلو العربة. وهو يشحن البطاريات التي أبقت الإلكترونيات حيّة.",
        },
      },
      {
        id: "cameras",
        position: [1.08, 0.2, 0],
        label: { en: "Cameras", ar: "الكاميرات" },
        detail: {
          en: "Two black-and-white cameras at the front and a colour camera at the rear. They gave the team views for driving and for imaging rocks.",
          ar: "كاميرتان بالأبيض والأسود في المقدمة وكاميرا ملوّنة في الخلف. وفّرتا للفريق مناظر للقيادة ولتصوير الصخور.",
        },
      },
      {
        id: "apxs",
        position: [1.3, 0.08, 0],
        label: { en: "Spectrometer", ar: "مقياس الطيف" },
        detail: {
          en: "The Alpha Proton X-ray Spectrometer measured which chemical elements were present in a rock, using alpha particles — an approach also used in some smoke detectors.",
          ar: "قاس مقياس أشعة إكس ألف البروتوني وجود العناصر الكيميائية في الصخرة باستخدام جسيمات ألف — وهو نهج يُستخدم أيضاً في بعض كواشف الدخان.",
        },
      },
      {
        id: "wheels",
        position: [0, -0.22, 0.62],
        label: { en: "Six wheels", ar: "ست عجلات" },
        detail: {
          en: "Six wheels on a rocker-bogie suspension. The rover was light enough that the wheels could not dig in — it pushed its way forward instead.",
          ar: "ست عجلات على تعليق روكَر–بوغي. كانت العربة خفيفة بحيث لا تستطيع العجلات الحفر — فكانت تدفع طريقها إلى الأمام.",
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
        en: "A rover the size of a kitchen appliance, and the team who bet that small was enough.",
        ar: "عربة بحجم جهاز مطبخي، وفريق راهن بأن الصغر يكفي.",
      },
      narrative: {
        en: [
          "Sojourner was never meant to be a science machine in the way Opportunity became one. It was a demonstration: a way of showing that a small, cheap, sun-powered robot could survive on Mars and send useful data home. The engineering budget for the rover was about $25 million — a fraction of the cost of the lander that carried it.",
          "The shape follows from the physics. A small rover is light, so it needs small wheels, small motors and a small power system. But a small rover also has a problem: with almost no weight, its wheels cannot push against loose soil. Sojourner solved this with a clever front wheel arrangement and by never trying to climb anything steep.",
          "The rover carried a three-camera imaging system — two black-and-white cameras and one colour camera — plus the Alpha Proton X-ray Spectrometer. The separate Imager for Mars Pathfinder, mounted on the lander, supplied stereo colour panoramas of the site. The spectrometer measured which chemical elements a rock contained, by bombarding it with alpha particles and reading the X-rays that came back — a technique related to the one used in some smoke detectors.",
          "NASA selected the name in July 1995, after a worldwide student essay contest. The winning entry honoured Sojourner Truth, the American abolitionist and women's rights activist, and the word \"sojourner\" also means traveller — a fitting name for a rover.",
        ],
        ar: [
          "لم تُصمَّم سوجورنر لتكون آلة علمية كما صارت أوبورتينيتي. كانت تجربة عملية: طريقة لإثبات أن روبوتاً صغيراً ورخيصاً يعمل بالطاقة الشمسية يمكنه النجاة على المريخ وإرسال بيانات مفيدة إلى الأرض. وكانت ميزانية هندسة العربة نحو 25 مليون دولار — جزء يسير من تكلفة مركبة الهبوط التي حملتها.",
          "شكلها نابع من الفيزياء. فالعربة الصغيرة خفيفة، فتحتاج عجلات صغيرة ومحركات صغيرة ونظام طاقة صغيراً. لكنها تحمل مشكلة: بلا وزن يُذكر لا تستطيع عجلاتها الدفع في التربة المفككة. وقد حلّت سوجورنر ذلك بترتيب ذكي للعجلة الأمامية وبأنها لم تحاول صعود أي شيء شديد الانحدار.",
          "حملت العربة نظام تصوير بثلاث كاميرات — اثنتان بالأبيض والأسود وواحدة ملوّنة — إضافة إلى مقياس أشعة إكس ألف البروتوني. أما جهاز تصوير مستكشف المريخ المنفصل، المثبّت على مركبة الهبوط، فقد وفّر صوراً بانورامية ملوّنة مجسّمة للموقع. وقد قاس المقياس العناصر الكيميائية في الصخرة عبر قذفها بجسيمات ألف وقراءة أشعة إكس المرتدّة — وهي تقنية قريبة من المستخدمة في بعض كواشف الدخان.",
          "اختارت ناسا الاسم في يوليو 1995 بعد مسابقة عالمية لكتابة المقالات شارك فيها طلاب. وكرّمت المقالة الفائزة سوجورنر تروث، المناضلة الأمريكية في إلغاء العبودية وحقوق المرأة، كما أن كلمة «سوجورنر» تعني المسافر — وهو اسم مناسب لعربة تجوب سطح كوكب.",
        ],
      },
      echo: {
        en: "Look how small this one is. Ten kilograms — lighter than most of the things in your kitchen. And it is still up there, exactly where it stopped.",
        ar: "انظر كم هي صغيرة هذه. عشرة كيلوغرامات — أخفّ من معظم ما في مطبخك. وهي لا تزال هناك هناك، في المكان الذي توقفت فيه تماماً.",
      },
      scenes: [
        {
          id: "meet-cinematic",
          kind: "cinematic",
          kicker: {
            en: "Three generations, one idea",
            ar: "ثلاثة أجيال، فكرة واحدة",
          },
          title: {
            en: "A machine the size of a microwave",
            ar: "آلة بحجم فرن الميكروويف",
          },
          narration: {
            en: "Sojourner was never meant to be a science machine in the way Opportunity became one. It was a demonstration: a way of showing that a small, cheap, sun-powered robot could survive on Mars and send useful data home. The engineering budget for the rover was about $25 million — a fraction of the cost of the lander that carried it.",
            ar: "لم تُصمَّم سوجورنر لتكون آلة علمية كما صارت أوبورتينيتي. كانت تجربة عملية: طريقة لإثبات أن روبوتاً صغيراً ورخيصاً يعمل بالطاقة الشمسية يمكنه النجاة على المريخ وإرسال بيانات مفيدة إلى الأرض. وكانت ميزانية هندسة العربة نحو 25 مليون دولار — جزء يسير من تكلفة مركبة الهبوط التي حملتها.",
          },
          mediaId: "PIA04422",
        },
        {
          id: "meet-physics",
          kind: "split",
          kicker: {
            en: "Engineering",
            ar: "هندسة",
          },
          title: {
            en: "The shape follows the physics",
            ar: "الشكل نابع من الفيزياء",
          },
          narration: {
            en: "The shape follows from the physics. A small rover is light, so it needs small wheels, small motors and a small power system. But a small rover also has a problem: with almost no weight, its wheels cannot push against loose soil. Sojourner solved this with a clever front wheel arrangement and by never trying to climb anything steep.",
            ar: "شكلها نابع من الفيزياء. فالعربة الصغيرة خفيفة، فتحتاج عجلات صغيرة ومحركات صغيرة ونظام طاقة صغيراً. لكنها تحمل مشكلة: بلا وزن يُذكر لا تستطيع عجلاتها الدفع في التربة المفككة. وقد حلّت سوجورنر ذلك بترتيب ذكي للعجلة الأمامية وبأنها لم تحاول صعود أي شيء شديد الانحدار.",
          },
        },
        {
          id: "meet-artifact",
          kind: "artifact",
          title: {
            en: "Two instruments did the science",
            ar: "جهازان حملا العلم",
          },
          narration: {
            en: "Two instruments did the science. The Imager for Mars Pathfinder was a pair of colour cameras that also worked in stereo, giving the team three-dimensional pictures of the rocks. The Alpha Proton X-ray Spectrometer measured which chemical elements a rock contained, by bombarding it with alpha particles and reading the X-rays that bounced back — a technique used on Earth in smoke detectors.",
            ar: "جهازان حملا العلم: كاميرا التصوير، ومقياس أشعة إكس ألف البروتوني الذي يقرأ ما في الصخرة عنصراً عنصراً. كانت كاميرا مستكشف المريخ زوجاً من الكاميرات الملونة تعمل أيضاً بالتصوير المجسّم، ومقياس ألف البروتوني يقاس العناصر في الصخرة بقذفها بجسيمات ألفا وقراءة أشعة إكس المرتدة — وهي التقنية المستخدمة في كواشف الدخان على الأرض.",
          },
        },
        {
          id: "meet-name",
          kind: "evidence",
          kicker: {
            en: "The name",
            ar: "الاسم",
          },
          title: {
            en: "Named for Sojourner Truth",
            ar: "سُمّيت باسم سوجورنر تروث",
          },
          narration: {
            en: "NASA selected the name in July 1995, after a worldwide student essay contest. The winning entry honoured Sojourner Truth, the American abolitionist and women's rights activist, and the word \"sojourner\" also means traveller — a fitting name for a rover.",
            ar: "اختارت ناسا الاسم في يوليو 1995 بعد مسابقة عالمية لكتابة المقالات شارك فيها طلاب. وكرّمت المقالة الفائزة سوجورنر تروث، المناضلة الأمريكية في إلغاء العبودية وحقوق المرأة، كما أن كلمة «سوجورنر» تعني المسافر — وهو اسم مناسب لعربة تجوب سطح كوكب.",
          },
        },
      ],
      facts: [
        {
          label: { en: "Mass", ar: "الكتلة" },
          value: { en: "10.6 kg", ar: "10.6 كغ" },
        },
        {
          label: { en: "Top speed", ar: "أقصى سرعة" },
          value: { en: "About 1 cm/s", ar: "نحو 1 سم/ث" },
        },
      ],
      diagram: {
        kind: "small-rover-components",
        title: { en: "What the little rover is made of", ar: "مكوّنات العربة الصغيرة" },
        intro: {
          en: "Select a marker to see what that part does.",
          ar: "اختر أي علامة لترى وظيفة ذلك الجزء.",
        },
        points: [
          {
            id: "panel",
            x: 50,
            y: 44,
            label: { en: "Solar panel", ar: "اللوح الشمسي" },
            detail: {
              en: "The top of the rover was one solar panel. In the thin Martian atmosphere it produced enough power to charge the batteries each day.",
              ar: "كان أعلى العربة لوحاً شمسياً واحداً. وفي الغلاف الجوي المريخي الرقيق كان ينتج طاقة كافية لشحن البطاريات كل يوم.",
            },
          },
          {
            id: "camera",
            x: 34,
            y: 51,
            label: { en: "Imager cameras", ar: "كاميرات التصوير" },
            detail: {
              en: "Two cameras took colour images and stereo pairs, letting the team build 3D maps of the rocks around the lander.",
              ar: "التقطت كاميرتان صوراً ملونة وأزواجاً مجسّمة، فتمكّن الفريق من بناء خرائط ثلاثية الأبعاد للصخور حول مركبة الهبوط.",
            },
          },
          {
            id: "apxs",
            x: 64,
            y: 52,
            label: { en: "Spectrometer", ar: "مقياس الطيف" },
            detail: {
              en: "The spectrometer measured the elements in a rock using the same alpha-particle trick as a household smoke detector.",
              ar: "قاس المقياس العناصر الموجودة في الصخرة باستعمال الحيلة نفسها القائمة على جسيمات ألف المستخدمة في كاشف الدخان المنزلي.",
            },
          },
          {
            id: "wheels",
            x: 50,
            y: 66,
            label: { en: "Rocker-bogie wheels", ar: "عجلات روكَر–بوغي" },
            detail: {
              en: "Six wheels kept the small body steady. The rover steered by turning its wheels rather than by turning itself.",
              ar: "ست عجلات أبقت الهيكل الصغير مستقراً. وكان التوجيه يتم بتوجيه العجلات نفسها لا بتدوير العربة.",
            },
          },
        ],
      },
      quiz: [
        {
          id: "soj-q1",
          prompt: {
            en: "How much did the Sojourner rover weigh?",
            ar: "كم كانت وزن عربة سوجورنر؟",
          },
          options: [
            { id: "a", label: { en: "About 10.6 kg", ar: "نحو 10.6 كغ" } },
            { id: "b", label: { en: "About 100 kg", ar: "نحو 100 كغ" } },
            { id: "c", label: { en: "About 185 kg", ar: "نحو 185 كغ" } },
          ],
          correctOptionId: "a",
          explanation: {
            en: "Sojourner weighed 10.6 kilograms — about the size and mass of a small microwave oven.",
            ar: "وزنت سوجورنر 10.6 كيلوجراماً — أي بحجم وكتلة فرن ميكروويف صغير.",
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
        en: "A lander with a job to do, and a rover as its passenger.",
        ar: "مركبة هبوط لها عمل كبير، وعربة صغيرة راكبة معها.",
      },
      narrative: {
        en: [
          "The mission was called Mars Pathfinder. It was NASA 'faster, better, cheaper', and it had a bold shape: one lander, one rover, and a radio link that ran through the lander.",
          "Pathfinder's own job was substantial. It carried a mast-mounted stereo colour camera and ran a weather station that measured wind, pressure and surface temperature.",
          "All of Sojourner's data had to travel through the lander. The rover had no radio of its own for talking to Earth; it talked to Pathfinder over a local radio link, and Pathfinder passed everything along through the Deep Space Network. That dependency is why losing the lander also ended the rover.",
        ],
        ar: [
          "كانت المهمة اسمها «باثفايندر». كانت من مشروع ناسا «أسرع وأفضل وأرخص»، وكان لها شكل جريء: مركبة هبوط واحدة، وعربة واحدة، ورابط لاسلكي يمر عبر مركبة الهبوط.",
          "وكان عمل مركبة الهبوط نفسه كبيراً. حملت كاميرا ملوّنة مجسّمة على سارية، وشغّلت محطة طقس تقيس الرياح والضغط وحرارة السطح.",
          "وكان على كل بيانات سوجورنر أن تمرّ عبر مركبة الهبوط. فلم يكن للعربة راديو خاص بها للتحدث إلى الأرض؛ بل كانت تتحدث إلى باثفايندر عبر رابط لاسلكي محلي، وباثفايندر كانت تمرّر كل شيء عبر شبكة الفضاء العميق. وهذا الاعتماد هو سبب أن فقدان مركبة الهبوط أنهى المهمة.",
        ],
      },
      echo: {
        en: "Sojourner had no radio of its own to talk to Earth. Every single byte went through the lander. Keep that in mind for the last chapter.",
        ar: "لم يكن لسوجورنر راديو خاص بها للتحدث إلى الأرض. كل بايت مرّ عبر مركبة الهبوط. احتفظ بهذا في ذهنك للفصل الأخير.",
      },
      scenes: [
        {
          id: "mission-shape",
          kind: "split",
          kicker: {
            en: "Faster, better, cheaper",
            ar: "أسرع، أفضل، أرخص",
          },
          title: {
            en: "One lander, one rover, one radio link",
            ar: "مركبة هبوط واحدة، عربة واحدة، رابط راديوي واحد",
          },
          narration: {
            en: "The mission was called Mars Pathfinder. It was NASA 'faster, better, cheaper', and it had a bold shape: one lander, one rover, and a radio link that ran through the lander.",
            ar: "كانت المهمة اسمها «باثفايندر». كانت من مشروع ناسا «أسرع وأفضل وأرخص»، وكان لها شكل جريء: مركبة هبوط واحدة، وعربة واحدة، ورابط لاسلكي يمر عبر مركبة الهبوط.",
          },
        },
        {
          id: "mission-lander",
          kind: "evidence",
          kicker: {
            en: "The base, the radio and the safety net",
            ar: "القاعدة والراديو وشبكة الأمان",
          },
          title: {
            en: "The lander had a job to do",
            ar: "كان لمركبة الهبوط عمل كبير",
          },
          narration: {
            en: "Pathfinder's own job was substantial. It carried a mast-mounted stereo colour camera and ran a weather station that measured wind, pressure and surface temperature. All of Sojourner's data had to travel through it: the rover had no radio of its own for talking to Earth, and Pathfinder passed everything along through the Deep Space Network. That dependency is why losing the lander also ended the rover.",
            ar: "وكان عمل مركبة الهبوط نفسه كبيراً. حملت كاميرا ملوّنة مجسّمة على سارية، وشغّلت محطة طقس تقيس الرياح والضغط وحرارة السطح. وكان على كل بيانات سوجورنر أن تمرّ عبرها، فلم يكن للعربة راديو خاص بها للتحدث إلى الأرض، بل كانت باثفايندر تمرّر كل شيء عبر شبكة الفضاء العميق. وهذا الاعتماد هو سبب أن فقدان مركبة الهبوط أنهى العربة أيضاً.",
          },
          mediaId: "PIA01121",
        },
      ],
      facts: [
        {
          label: { en: "Mission name", ar: "اسم المهمة" },
          value: { en: "Mars Pathfinder", ar: "باثفايندر المريخ" },
        },
        {
          label: { en: "Rover share of the budget", ar: "حصة العربة من الميزانية" },
          value: {
            en: "About $25 million of a $265 million mission.",
            ar: "نحو 25 مليون دولار من مهمة قيمتها 265 مليون دولار.",
          },
        },
        {
          label: { en: "Link to Earth", ar: "الصلة بالأرض" },
          value: {
            en: "Through the lander and the Deep Space Network.",
            ar: "عبر مركبة الهبوط وشبكة الفضاء العميق.",
          },
        },
      ],
      glossary: [
        {
          id: "stereo",
          term: { en: "Stereo imaging", ar: "التصوير المجسّم" },
          simple: {
            en: "Taking two photos from slightly different angles, so the brain — or a computer — can work out how far away something is.",
            ar: "التقاط صورتين من زاويتين مختلفتين قليلاً، فيستطيع العقل — أو الحاسوب — حساب بُعد الشيء.",
          },
        },
        {
          id: "alpha",
          term: { en: "Alpha particles", ar: "جسيمات ألفا" },
          simple: {
            en: "Tiny helium nuclei. Bounce them off a rock and the way they scatter tells you what the rock is made of.",
            ar: "أنوية هيليوم مجهرية. ترتدّ عن صخرة فيخبرك طريقتشتّتها بما تتكوّن منه الصخرة.",
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
        en: "Seven months to Mars, and the first airbag landing ever attempted on another planet.",
        ar: "سبعة أشهر إلى المريخ، وأول هبوط بالأكياس الهوائية يُجرَّب على كوكب آخر.",
      },
      narrative: {
        en: [
          "Pathfinder launched on 4 December 1996 and arrived at Mars seven months later, on 4 July 1997 — the American Independence Day, a coincidence NASA could not resist marking.",
          "The landing was the risky part, and it was a completely new method. Instead of a rocket landing on legs, the spacecraft used airbags. A parachute slowed it, retrorockets fired, and then a dozen giant airbags absorbed the impact, bouncing the whole spacecraft across the Martian surface like a beach ball until friction finally stopped it.",
          "After the bounce, Pathfinder's triangular solar panels unfolded like flower petals, and the lander sent its first photographs. The rover was still folded against the lander, waiting.",
          "Over the following days, the rover was released and drove down a ramp, and for the first time in history a wheeled vehicle moved on Mars. It was so slow that scientists called each new metre a highlight.",
        ],
        ar: [
          "أُطلقت باثفايندر في 4 ديسمبر 1996 ووصلت إلى المريخ بعد سبعة أشهر، في 4 يوليو 1997 — يوم استقلال الولايات المتحدة، وهو تزامن لم يستطع ناسا إلا أن تحتفل به.",
          "كان الهبوط هو الجزء المحفوف بالمخاطر، وكان بطريقة جديدة تماماً. فبدلاً من أن تهبط المركبة على أرجل، استُخدمت أكياس هوائية. أدّت المظلة إلى التباطؤ، ثم انطلقت الصواريخ الخلفية، ثم التقطت اثنتا عشرة كيساً هوائياً ضخم الصدمة فارتدّت المركبة كلها على سطح المريخ ككرة شاطئ حتى أوقفها الاحتكاك.",
          "بعد الارتداد، فُردّت الألواح الشمسية المثلثة لباثفايندر كأنها بتلات زهرة، وأرسلت المركبة أول صورها. وكانت العربة لا تزال مطوية على متن مركبة الهبوط في انتظار دورها.",
          "وفي الأيام التالية أُطلق سراح العربة ونزلت عبر منحدر، ولأول مرة في التاريخ تحرّكت مركبة بعجلات على المريخ. كانت بطيئة لدرجة أن العلماء عدّوا كل متر جديد حدثاً بارزاً.",
        ],
      },
      echo: {
        en: "The airbags were a first. Two Mars Exploration Rovers later used the same airbag approach; larger rovers such as Curiosity and Perseverance arrived by powered descent and sky crane.",
        ar: "كانت الأكياس الهوائية فكرة رائدة. واستخدمت مركبتا استكشاف المريخ اللاحقتان النهج نفسه؛ أما العربات الأكبر مثل كيوريوسيتي وبيرسيفرانس فهبطت بالدفع الصاروخي والرافعة السماوية.",
      },
      scenes: [
        {
          id: "journey-cruise",
          kind: "split",
          kicker: {
            en: "Seven months",
            ar: "سبعة أشهر",
          },
          title: {
            en: "Independence Day, on another planet",
            ar: "يوم الاستقلال، على كوكب آخر",
          },
          narration: {
            en: "Pathfinder launched on 4 December 1996 and arrived at Mars seven months later, on 4 July 1997 — the American Independence Day, a coincidence NASA could not resist marking.",
            ar: "أُطلقت باثفايندر في 4 ديسمبر 1996 ووصلت إلى المريخ بعد سبعة أشهر، في 4 يوليو 1997 — يوم استقلال الولايات المتحدة، وهو تزامن لم يستطع ناسا إلا أن تحتفل به.",
          },
        },
        {
          id: "journey-airbags",
          kind: "cinematic",
          kicker: {
            en: "The risky part",
            ar: "الجزء المحفوف بالمخاطر",
          },
          title: {
            en: "Bounced like a beach ball",
            ar: "ارتداد ككرة الشاطئ",
          },
          narration: {
            en: "The landing was the risky part, and it was a completely new method. Instead of a rocket landing on legs, the spacecraft used airbags. A parachute slowed it, retrorockets fired, and then a dozen giant airbags absorbed the impact, bouncing the whole spacecraft across the Martian surface like a beach ball until friction finally stopped it.",
            ar: "كان الهبوط هو الجزء المحفوف بالمخاطر، وكان بطريقة جديدة تماماً. فبدلاً من أن تهبط المركبة على أرجل، استُخدمت أكياس هوائية. أدّت المظلة إلى التباطؤ، ثم انطلقت الصواريخ الخلفية، ثم التقطت اثنتا عشرة كيساً هوائياً ضخم الصدمة فارتدّت المركبة كلها على سطح المريخ ككرة شاطئ حتى أوقفها الاحتكاك.",
          },
        },
        {
          id: "journey-first-drive",
          kind: "evidence",
          kicker: {
            en: "First tracks",
            ar: "أول الآثار",
          },
          title: {
            en: "The first wheels to turn on Mars",
            ar: "أول عجلات تدور على المريخ",
          },
          narration: {
            en: "After the bounce, Pathfinder's triangular solar panels unfolded like flower petals, and the lander sent its first photographs. The rover was still folded against the lander, waiting. Over the following days, the rover was released and drove down a ramp, and for the first time in history a wheeled vehicle moved on Mars. It was so slow that scientists called each new metre a highlight.",
            ar: "بعد الارتداد، فُردّت الألواح الشمسية المثلثة لباثفايندر كأنها بتلات زهرة، وأرسلت المركبة أول صورها. وكانت العربة لا تزال مطوية على متن مركبة الهبوط في انتظار دورها. وفي الأيام التالية أُطلق سراح العربة ونزلت عبر منحدر، ولأول مرة في التاريخ تحرّكت مركبة بعجلات على المريخ. كانت بطيئة لدرجة أن العلماء عدّوا كل متر جديد حدثاً بارزاً.",
          },
          mediaId: "PIA01137",
        },
      ],
      timeline: [
        {
          id: "soj-launch",
          date: "1996-12-04",
          dateLabel: { en: "4 December 1996", ar: "4 ديسمبر 1996" },
          label: { en: "Launch", ar: "الإطلاق" },
          description: {
            en: "Mars Pathfinder launched from Cape Canaveral on a Delta II rocket.",
            ar: "أُطلقت باثفايندر من كيب كانافيرال على صاروخ دلتا 2.",
          },
          type: "launch",
          sourceIds: ["SRC-MARS-PATHFINDER"],
        },
        {
          id: "soj-landing",
          date: "1997-07-04",
          dateLabel: { en: "4 July 1997", ar: "4 يوليو 1997" },
          label: { en: "Airbag landing", ar: "هبوط بالأكياس الهوائية" },
          description: {
            en: "The spacecraft bounced to a stop in Ares Vallis and the lander's solar panels unfolded.",
            ar: "ارتدّت المركبة حتى استقرت في وادي آريس، ثم فُردّت الألواح الشمسية لمركبة الهبوط.",
          },
          type: "landing",
          sourceIds: ["SRC-MARS-PATHFINDER"],
        },
        {
          id: "soj-deploy",
          date: "1997-07-06",
          dateLabel: { en: "6 July 1997", ar: "6 يوليو 1997" },
          label: { en: "Rover deployed", ar: "نشر العربة" },
          description: {
            en: "Sojourner rolled off the lander's ramp and became the first rover to drive on Mars.",
            ar: "نزلت سوجورنر عن منحدر مركبة الهبوط لتصبح أول عربة تسير على المريخ.",
          },
          type: "deployment",
          sourceIds: ["SRC-MARS-PATHFINDER"],
        },
        {
          id: "soj-last",
          date: "1997-09-27",
          dateLabel: { en: "27 September 1997", ar: "27 سبتمبر 1997" },
          label: { en: "Last communication", ar: "آخر اتصال" },
          description: {
            en: "The last data reached Earth from the Pathfinder lander and Sojourner.",
            ar: "وصلت آخر بيانات من مركبة الهبوط باثفايندر ومن سوجورنر إلى الأرض.",
          },
          type: "last-contact",
          sourceIds: ["SRC-MARS-PATHFINDER"],
        },
      ],
      diagram: {
        kind: "journey-map",
        title: { en: "The route to Ares Vallis", ar: "الطريق إلى وادي آريس" },
        intro: {
          en: "Launch, cruise, bounce, and the first tracks.",
          ar: "الإطلاق، والرحلة، والارتداد، وأول الآثار.",
        },
        route: [
          {
            label: { en: "Launch", ar: "الإطلاق" },
            description: { en: "Cape Canaveral, Earth", ar: "كيب كانافيرال، الأرض" },
          },
          {
            label: { en: "Cruise", ar: "الرحلة البينية" },
            description: {
              en: "Seven months to Mars",
              ar: "سبعة أشهر إلى المريخ",
            },
          },
          {
            label: { en: "Landing", ar: "الهبوط" },
            description: {
              en: "Ares Vallis, by airbags",
              ar: "وادي آريس، بالأكياس الهوائية",
            },
          },
          {
            label: { en: "Exploration", ar: "الاستكشاف" },
            description: {
              en: "About 100 metres of driving",
              ar: "نحو 100 متر من السير",
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
              en: "Launch on 4 December 1996.",
              ar: "الإطلاق في 4 ديسمبر 1996.",
            },
          },
          {
            id: "mars",
            x: 84,
            y: 32,
            label: { en: "Mars", ar: "المريخ" },
            detail: {
              en: "Landing in Ares Vallis on 4 July 1997.",
              ar: "الهبوط في وادي آريس في 4 يوليو 1997.",
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
        en: "What a ten-kilogram rover could actually learn in a few weeks.",
        ar: "ما الذي تستطيع عربة وزنها عشرة كيلوغرامات أن تتعلّمه فعلاً في بضعة أسابيع.",
      },
      narrative: {
        en: [
          "Sojourner was a demonstration mission, and the demonstrations were of a specific kind: that a rover could work. But it also produced real planetary science.",
        ],
        ar: [
          "كانت سوجورنر مهمة استعراضية، وكانت الاستعراضات من نوع محدد: أن العربة تستطيع العمل. لكنها أنتجت علماً كوكبياً حقيقياً أيضاً.",
        ],
      },
      echo: {
        en: "Here is the surprising part. The smallest rover ever sent to Mars answered questions about the large, ancient Mars.",
        ar: "وهنا الجزء المفاجئ. أصغر عربة أُرسلت إلى المريخ أجابت عن أسئلة عن المريخ الكبير والقديم.",
      },
      scenes: [
        {
          id: "discoveries-lead",
          kind: "split",
          kicker: {
            en: "More than a demonstration",
            ar: "أكثر من مجرد تجربة",
          },
          title: {
            en: "A demonstration that did real science",
            ar: "تجربة صنعت علماً حقيقياً",
          },
          narration: {
            en: "Sojourner was a demonstration mission, and the demonstrations were of a specific kind: that a rover could work. But it also produced real planetary science.",
            ar: "كانت سوجورنر مهمة استعراضية، وكانت الاستعراضات من نوع محدد: أن العربة تستطيع العمل. لكنها أنتجت علماً كوكبياً حقيقياً أيضاً.",
          },
        },
      ],
      discoveries: [
        {
          id: "soj-d1",
          title: {
            en: "A river valley, not a flood",
            ar: "وادٍ نهري، لا فيضان",
          },
          question: {
            en: "Why was Pathfinder sent to this particular valley?",
            ar: "لماذا أُرسلت باثفايندر إلى هذا الوادي بعينه؟",
          },
          instrument: {
            en: "Imager for Mars Pathfinder cameras and the lander imaging camera",
            ar: "كاميرات جهاز تصوير مستكشف المريخ وكاميرا مركبة الهبوط",
          },
          method: {
            en: "Before the landing, the team studied orbital images and picked a spot where two channels of an ancient river appeared to meet — a place where the rocks should be a mix of rounded river gravels and angular broken fragments.",
            ar: "قبل الهبوط، درس الفريق صوراً مدارية واختار موضعاً يلتقي فيه مسارا نهر قديم — مكان يجب أن تكون فيه الصخور مزيجاً من حصى النهر المستدير وشظايا الزوايا الحادة.",
          },
          data: {
            en: "The landing site turned out to be full of rounded, water-worn pebbles and conglomerates — rocks that had been carried and tumbled by flowing water, then cemented together.",
            ar: "اتضح أن موقع الهبوط مليء بحصى مستدير متآكل بالماء وموصلات — صخور حملها الماء الجاري وصقلها ثم اسمنتَت.",
          },
          finding: {
            en: "Sojourner confirmed that Ares Vallis was carved by running water, and that the rocks there were the deposited remains of that water.",
            ar: "أكّدت سوجورنر أن وادي آريس قد نُحت بماء جارٍ، وأن صخوره هناك هي بقايا رواسب ذلك الماء.",
          },
          significance: {
            en: "It turned a hypothesis about a distant valley into a measured fact, and it did so in the first weeks of the mission.",
            ar: "حوّلت فرضية عن وادٍ بعيد إلى واقعة مقيسة، وذلك في أسابيع المهمة الأولى.",
          },
          sourceIds: ["SRC-MARS-PATHFINDER"],
        },
        {
          id: "soj-d2",
          title: {
            en: "Different rocks, one wet story",
            ar: "صخور مختلفة، وحكاية رطوبة واحدة",
          },
          question: {
            en: "Is the chemistry of one rock the chemistry of the whole area?",
            ar: "هل كيميائية صخرة واحدة هي كيميائية المنطقة كلها؟",
          },
          instrument: {
            en: "Alpha Proton X-ray Spectrometer",
            ar: "مقياس أشعة إكس ألف البروتوني",
          },
          method: {
            en: "The rover drove to a dozen or more separate rocks and took an elemental reading of each one, comparing the results.",
            ar: "قادت العربة إلى أكثر من عشرة صخور منفصلة وأخذت قراءة عنصرية لكل واحدة، ثم قارنت النتائج.",
          },
          data: {
            en: "The rocks were not the same, and the differences were informative: some were made of different minerals, and some were coated with a layer of dust from the air.",
            ar: "لم تكن الصخور متشابهة، وكانت الفروق ذات معنى: فبعضها مكوّن من معادن مختلفة، وبعضها مغطّى بطبقة من غبار الهواء.",
          },
          finding: {
            en: "The spectrometer distinguished rock from rock by chemistry rather than by appearance — something a camera could never do on its own.",
            ar: "ميّز المقياس الصخور بعضها عن بعض كيميائياً لا بالمظهر — وهو ما لا تستطيع الكاميرا أن تفعله وحدها.",
          },
          significance: {
            en: "It was the first time a rover carried an instrument that read the chemistry of Martian rocks.",
            ar: "كانت هذه أول مرة تحمل عربة جهازاً يقرأ كيمياء صخور المريخ.",
          },
          sourceIds: ["SRC-MARS-PATHFINDER"],
        },
        {
          id: "soj-d3",
          title: {
            en: "A weather report from Mars",
            ar: "نشرة طقس من المريخ",
          },
          question: {
            en: "What is the weather like on another planet?",
            ar: "كيف يكون الطقس على كوكب آخر؟",
          },
          instrument: {
            en: "Atmospheric Structure Instrument/Meteorology package on the Pathfinder lander",
            ar: "حزمة جهاز البنية الجوية والأرصاد الجوية على مركبة الهبوط باثفايندر",
          },
          method: {
            en: "The lander carried a small instrument that measured wind speed, air pressure and surface temperature continuously, through the Martian day and night.",
            ar: "حملت مركبة الهبوط جهازاً صغيراً يقيس سرعة الرياح وضغط الهواء وحرارة السطح باستمرار، طوال الليل والنهار المريخي.",
          },
          data: {
            en: "The readings showed the thin atmosphere, the large day-night temperature swing, and the way wind lifted dust into the air and then dropped it again.",
            ar: "أظهرت القياسات رقابة الغلاف الجوي الرقيق، والفارق الكبير بين حرارة النهار والليل، وكيف ترفع الرياح الغبار في الهواء ثم تُسقطه من جديد.",
          },
          finding: {
            en: "Mars had a working surface weather station, adding to a record begun by the Viking landers.",
            ar: "أصبح للمريخ محطة طقس سطحية عاملة، تُضاف إلى سجل بدأته مركبتا فايكنغ.",
          },
          significance: {
            en: "The weather data joined a growing record from earlier Viking landers and later missions.",
            ar: "انضمت بيانات الطقس إلى سجل متنامٍ من مركبتي فايكنغ السابقتين والمهمات اللاحقة.",
          },
          sourceIds: ["SRC-MARS-PATHFINDER"],
        },
      ],
      quiz: [
        {
          id: "soj-q2",
          prompt: {
            en: "Why did Sojourner steer by turning its wheels instead of turning its body?",
            ar: "لماذا كانت سوجورنر تتوجيه بعجلاتها بدل تدوير جسمها؟",
          },
          options: [
            {
              id: "a",
              label: {
                en: "Because it was too light to turn over",
                ar: "لأنها كانت خفيفة جداً لا تستطيع قلب نفسها",
              },
            },
            {
              id: "b",
              label: {
                en: "Because the body could not fit in narrow spaces",
                ar: "لأن الهيكل لا يتّسع في الأماكن الضيقة",
              },
            },
            {
              id: "c",
              label: {
                en: "Because wheels can dig into the soil",
                ar: "لأن العجلات تستطيع الحفر في التربة",
              },
            },
          ],
          correctOptionId: "a",
          explanation: {
            en: "At 10.6 kilograms the rover was too light to tip over, so it steered by turning its wheels in place. Its weakness was the opposite one: too little weight to dig into loose soil.",
            ar: "عند 10.6 كيلوجرام كانت العربة أخفّ من أن تنقلب، فوجّهتها بتدوير عجلاتها في مكانها. أما ضعفها فكان معاكساً: وزن قليل جداً لا يكفي للحفر في التربة المفككة.",
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
        en: "How a rover that outlived its plan still lost its radio link.",
        ar: "كيف فقدت عربةٌ تجاوزت خطّتها رابطها اللاسلكي.",
      },
      narrative: {
        en: [
          "Sojourner's planned surface mission was short — a few weeks that were extended several times as long as the hardware kept working. It kept working. By September 1997 the rover had driven about 100 metres, visited a dozen or more rocks and outlived every schedule NASA had written for it.",
          "Then the link failed. Sojourner could reach Earth only through the Pathfinder lander, and the lander's solar panels were slowly collecting dust. The exact cause was never confirmed, but its batteries may have drained as the available sunlight fell. The last data reached Earth on 27 September 1997. A final attempt to contact Pathfinder was made on 10 March 1998, and there was no answer.",
          "Both machines are still in Ares Vallis. Sojourner sits on the plain within a few hundred metres of the lander that carried it, exactly where it was left, and it has not moved since September 1997.",
        ],
        ar: [
          "كانت المهمة السطحية المخططة لسوجورنر قصيرة — بضعة أسابيع مدّدتها ناسا عدة مرات ما دامت العتاد يعمل. وقد عمل. وبحلول سبتمبر 1997 كانت العربة قد قطعت نحو 100 متر، وزارت أكثر من عشرة صخور، وتجاوزت كل جدول زمني كتبته ناسا لها.",
          "ثم انقطع الرابط. لم تكن سوجورنر تصل إلى الأرض إلا عبر مركبة الهبوط باثفايندر، وكانت ألواحها الشمسية تلتقط الغبار ببطء. لم يُؤكَّد السبب الدقيق قط، لكن بطارياتها ربما نضبت مع تراجع ضوء الشمس المتاح. ووصلت آخر بيانات إلى الأرض في 27 سبتمبر 1997، وجُرت محاولة أخيرة للتواصل مع باثفايندر في 10 مارس 1998، ولم يكن هناك رد.",
          " والآلتان لا تزالان في وادي آريس. وتقع سوجورنر على السهل على بُعد بضع مئات من الأمتار من مركبة الهبوط التي حملتها، تماماً حيث تُركت، ولم تتحرك منذ سبتمبر 1997.",
        ],
      },
      echo: {
        en: "Sojourner did not fail. It ran out of a shared resource — sunlight, and a lander to pass it on. That is a very different ending from a crash.",
        ar: "لم تفشل سوجورنر. لقد نفد منها مورد مشترك — ضوء الشمس، ومركبة هبوط تنقله. وهذا فرق كبير بينه وبين الارتطام.",
      },
      scenes: [
        {
          id: "ending-outlived",
          kind: "split",
          kicker: {
            en: "Weeks, then more weeks",
            ar: "أسابيع، ثم المزيد",
          },
          title: {
            en: "It outlived every schedule",
            ar: "تجاوزت كل جدول زمني",
          },
          narration: {
            en: "Sojourner's planned surface mission was short — a few weeks that were extended several times as long as the hardware kept working. It kept working. By September 1997 the rover had driven about 100 metres, visited a dozen or more rocks and outlived every schedule NASA had written for it.",
            ar: "كانت المهمة السطحية المخططة لسوجورنر قصيرة — بضعة أسابيع مدّدتها ناسا عدة مرات ما دامت العتاد يعمل. وقد عمل. وبحلول سبتمبر 1997 كانت العربة قد قطعت نحو 100 متر، وزارت أكثر من عشرة صخور، وتجاوزت كل جدول زمني كتبته ناسا لها.",
          },
        },
        {
          id: "ending-silence",
          kind: "cinematic",
          kicker: {
            en: "27 September 1997",
            ar: "27 سبتمبر 1997",
          },
          title: {
            en: "The link failed",
            ar: "انقطع الرابط",
          },
          narration: {
            en: "Then the link failed. Sojourner could reach Earth only through the Pathfinder lander, and the lander's solar panels were slowly collecting dust. The exact cause was never confirmed, but its batteries may have drained as the available sunlight fell. The last data reached Earth on 27 September 1997. A final attempt to contact Pathfinder was made on 10 March 1998, and there was no answer.",
            ar: "ثم انقطع الرابط. لم تكن سوجورنر تصل إلى الأرض إلا عبر مركبة الهبوط باثفايندر، وكانت ألواحها الشمسية تلتقط الغبار ببطء. لم يُؤكَّد السبب الدقيق قط، لكن بطارياتها ربما نضبت مع تراجع ضوء الشمس المتاح. ووصلت آخر بيانات إلى الأرض في 27 سبتمبر 1997، وجُرت محاولة أخيرة للتواصل مع باثفايندر في 10 مارس 1998، ولم يكن هناك رد.",
          },
        },
        {
          id: "ending-still-there",
          kind: "evidence",
          kicker: {
            en: "Where it rests",
            ar: "حيّا ترقد",
          },
          title: {
            en: "Still in Ares Vallis",
            ar: "ما تزال في وادي آريس",
          },
          narration: {
            en: "Both machines are still in Ares Vallis. Sojourner sits on the plain within a few hundred metres of the lander that carried it, exactly where it was left, and it has not moved since September 1997.",
            ar: "والآلتان لا تزالان في وادي آريس. وتقع سوجورنر على السهل على بُعد بضع مئات من الأمتار من مركبة الهبوط التي حملتها، تماماً حيث تُركت، ولم تتحرك منذ سبتمبر 1997.",
          },
          mediaId: "PIA01551",
        },
      ],
      facts: [
        {
          label: { en: "Last data", ar: "آخر بيانات" },
          value: { en: "27 September 1997", ar: "27 سبتمبر 1997" },
        },
        {
          label: { en: "Final contact attempt", ar: "محاولة الاتصال الأخيرة" },
          value: { en: "10 March 1998", ar: "10 مارس 1998" },
        },
        {
          label: { en: "Where it is", ar: "أين هي الآن" },
          value: {
            en: "Ares Vallis, on the plain near the lander.",
            ar: "وادي آريس، على السهل قرب مركبة الهبوط.",
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
        en: "The machines, the images and the engineering that came after.",
        ar: "الآلات والصور والهندسة التي جاءت بعده.",
      },
      narrative: {
        en: [
          "Every Mars rover that has flown since Sojourner inherited something from it. The rocker-bogie suspension is still used. The airbag landing is still used. The pattern of a small rover driving around a larger lander, with its data going home through the lander, was used again by the Mars Exploration Rovers — which were built by the same organisation, for the same programme, a few years later.",
          "Sojourner also changed how missions are imagined. Before Pathfinder, the idea of sending a vehicle that could move on another planet was a demonstration. After it, it was a plan.",
          "The rover's final images — a small, bright machine alone on a wide plain of scattered rocks — remain the most human-sized picture NASA has of Mars. And the machine itself, still sitting where it stopped, is the smallest thing humans have ever left on another world.",
        ],
        ar: [
          "ورثت كل عربة مريخية أُطلقت منذ سوجورنر شيئاً منها. فتعليق روكَر–بوغي ما زال مستخدماً. والهبوط بالأكياس الهوائية ما زال مستخدماً. ونمط «عربة صغيرة تدور حول مركبة هبوط أكبر، وتذهب بياناتها إلى الأرض عبر المركبة» استُخدم من جديد في «مستكشفي المريخ» — وقد صُنعا من الجهة نفسها، في البرنامج نفسه، بعد بضع سنوات.",
          "غيّرت سوجورنر أيضاً طريقة تصوّر المهمات. فقبل باثفايندر كان إرسال مركبة تتحرك على كوكب آخر فكرة استعراضية. وبعدها صارت خطة.",
          "وتبقى الصور الأخيرة للعربة — آلة صغيرة ساطعة وحيدة على سهل واسع من الصخور المتفرقة — أكثر صورة بحجم إنساني نملكها للمريخ. أما الآلة نفسها، ولا تزال في مكانها حيث توقفت، فهي أصغر شيء تركه الإنسان على عالم آخر.",
        ],
      },
      echo: {
        en: "Small machines open big doors. That is the lesson Sojourner left, and every rover since has walked through it.",
        ar: "الآلات الصغيرة تفتح الأبواب الكبيرة. هذا هو الدرس الذي تركته سوجورنر، وكل عربة منذ ذلك الحين مرّت منه.",
      },
      scenes: [
        {
          id: "legacy-strip",
          kind: "comic",
          kicker: {
            en: "The legacy",
            ar: "الإرث",
          },
          title: {
            en: "What every rover since inherited",
            ar: "ما الذي ورثته كل عربة بعدها",
          },
          narration: {
            en: "Three things outlived the radio link.",
            ar: "ثلاثة أشياء عاشت بعد انقطاع الرابط.",
          },
        },
      ],
      facts: [
        {
          label: { en: "Distance driven", ar: "المسافة المقطوعة" },
          value: { en: "About 100 metres", ar: "نحو 100 متر" },
        },
        {
          label: { en: "Still there", ar: "ما تزال هناك" },
          value: {
            en: "Yes — at Ares Vallis, unmoved since 1997.",
            ar: "نعم — في وادي آريس، لم تتحرك منذ 1997.",
          },
        },
        {
          label: { en: "Legacy", ar: "الإرث" },
          value: {
            en: "Rocker-bogie suspension, airbag landing, and the rover-inside-a-lander architecture used by every Mars mission since.",
            ar: "تعليق روكَر–بوغي، والهبوط بالأكياس الهوائية، ومعمارية العربة داخل مركبة الهبوط التي استخدمتها كل مهمات المريخ منذ ذلك الحين.",
          },
        },
      ],
    },
  ],
  legacyStatement: {
    en: "Ten kilograms proved a hundred-tonne future could work.",
    ar: "عشرة كيلوغرامات أثبتت أن مستقبلاً بمئة طن يمكن أن ينجح.",
  },
  tags: ["mars", "rover", "remnant"],
  artifactId: "sojourner",
  sourceIds: ["SRC-MARS-PATHFINDER"],
  relatedStorySlugs: ["opportunity", "viking-1-lander"],
  echoIntro: {
    en: "This one is small enough to fit in your arms. Come and meet the rover that made every rover after it possible.",
    ar: "هذه صغيرة بما يكفي لتُحمل بذراعيك. تعال وتعرّف على العربة التي جعلت كل عربة بعدها ممكنة.",
  },
  echoSignoff: {
    en: "Sojourner is still sitting on Mars, waiting for a radio that no longer answers. Its pictures are still with us.",
    ar: "ما تزال سوجورنر جالسة على المريخ، تنتظر راديواً لم يعد يجيب. أما صورها فما تزال معنا.",
  },
  lastVerified: "2026-11-13",
};
