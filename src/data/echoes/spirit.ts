import type { EchoStory } from "@/types/echo";
import { echoImage } from "./media";

/**
 * SPIRIT — the twin that outlasted its plan and then got stuck.
 *
 * Sources: the NASA Science Spirit mission page, the NSSDCA Spirit record
 * and the combined Mars Exploration Rovers mission page.
 */
export const spiritStory: EchoStory = {
  id: "spirit",
  slug: "spirit",
  title: {
    en: "Spirit",
    ar: "سبيريت",
  },
  storyTitle: {
    en: "The Rover That Would Not Quit",
    ar: "العربة التي رفضت الاستسلام",
  },
  dek: {
    en: "A 90-day rover that kept working for more than six years, climbed a mountain, found evidence of water, and then sank into soft soil.",
    ar: "عربة صُممت لتسعين يوماً، فعملت أكثر من ست سنوات، وصعدت جبلاً، ووجدت دليلاً على الماء، ثم غرقت في تربة لينة.",
  },
  summary: {
    en: "Spirit landed at Gusev Crater in January 2004, three weeks before its twin Opportunity reached the other side of Mars. It was built for a 90-sol mission but operated for more than six years. Spirit studied volcanic rocks, climbed Husband Hill and found minerals that formed with the help of water. In 2009 it became trapped in soft soil, and in 2010 it stopped communicating.",
    ar: "هبطت سبيريت في فوهة غوسيف في يناير 2004، قبل ثلاثة أسابيع من وصول توأمتها أوبورتينيتي إلى الجانب الآخر من المريخ. صُممت لمهمة من تسعين يوماً مريخياً، لكنها عملت أكثر من ست سنوات. درست سبيريت صخوراً بركانية، وصعدت تلة هازبند، ووجدت معادن تشكلت بمساعدة الماء. وفي 2009 علقت في تربة لينة، وفي 2010 توقفت عن التواصل.",
  },
  location: {
    en: "Gusev Crater, Mars",
    ar: "فوهة غوسيف، المريخ",
  },
  locationNote: {
    en: "Spirit landed inside a large crater that may once have held a lake. It spent its final years near a plateau called Home Plate, where it became embedded in loose soil.",
    ar: "هبطت سبيريت داخل فوهة كبيرة ربما احتوت بحيرة قديماً. وأمضت سنواتها الأخيرة قرب هضبة تُسمى هوم بليت، حيث غرست في تربة مفككة.",
  },
  equipmentType: {
    en: "Solar-powered Mars rover",
    ar: "عربة مريخية تعمل بالطاقة الشمسية",
  },
  missionPeriod: {
    en: "Launch 10 June 2003 · Landing 4 January 2004 · Last contact 22 March 2010",
    ar: "الإطلاق 10 يونيو 2003 · الهبوط 4 يناير 2004 · آخر اتصال 22 مارس 2010",
  },
  missionStatus: {
    en: "Mission complete — NASA ended the mission in 2011 after repeated attempts to contact the rover failed.",
    ar: "اكتملت المهمة — أنهت ناسا المهمة في 2011 بعد فشل محاولات متكررة للتواصل مع العربة.",
  },
  hardwareStatus: {
    en: "Inactive — Spirit remains at Gusev Crater, embedded in soft soil.",
    ar: "غير نشطة — ما زالت سبيريت في فوهة غوسيف، مغروسة في تربة لينة.",
  },
  statusKind: "silent",
  accent: "#D97745",
  accentSoft: "#F7DFD0",
  badge: {
    en: "Six-Year Spirit",
    ar: "روح الست سنوات",
  },
  badgeKey: "six-year-spirit",
  hero: echoImage("PIA05040", {
    alt: {
      en: "The Spirit rover stretching out its robotic arm on the Martian surface.",
      ar: "العربة سبيريت تمدّ ذراعها الآلية على سطح المريخ.",
    },
    caption: {
      en: "Spirit shortly after landing in Gusev Crater in January 2004. The rover was designed for 90 sols and worked for more than six years.",
      ar: "سبيريت بعد وقت قصير من هبوطها في فوهة غوسيف في يناير 2004. صُممت العربة لتسعين يوماً مريخياً وعملت أكثر من ست سنوات.",
    },
  }),
  gallery: [
    echoImage("PIA03253", {
      alt: {
        en: "A view of the Spirit rover on Husband Hill in the Columbia Hills of Mars.",
        ar: "منظر للعربة سبيريت على تلة هازبند في تلال كولومبيا على المريخ.",
      },
      caption: {
        en: "Spirit on Husband Hill. Reaching the summit took years of careful driving and gave the mission a wide view of the surrounding terrain.",
        ar: "سبيريت على تلة هازبند. استغرق الوصول إلى القمة سنوات من السير الحذر ومنح المهمة رؤية واسعة للتضاريس المحيطة.",
      },
    }),
    echoImage("PIA05120", {
      alt: {
        en: "An orbital view of the Spirit landing site at Gusev Crater.",
        ar: "منظر مداري لموقع هبوط سبيريت في فوهة غوسيف.",
      },
      caption: {
        en: "Gusev Crater from orbit. The landing site was chosen because the crater may once have held a lake.",
        ar: "فوهة غوسيف من المدار. اختير موقع الهبوط لأن الفوهة ربما احتوت بحيرة قديماً.",
      },
    }),
    echoImage("PIA12007", {
      alt: {
        en: "Spirit's wheels digging into soft Martian ground, with the rover unable to free itself.",
        ar: "عجلات سبيريت تحفر في أرض مريخية لينة، والعربة غير قادرة على تحرير نفسها.",
      },
      caption: {
        en: "Spirit's wheels in soft soil in 2009. The rover became embedded and could not drive out.",
        ar: "عجلات سبيريت في تربة لينة عام 2009. غرست العربة ولم تستطع الخروج.",
      },
    }),
  ],
  facts: [
    {
      label: { en: "Mass", ar: "الكتلة" },
      value: { en: "About 185 kg", ar: "نحو 185 كغ" },
    },
    {
      label: { en: "Power", ar: "الطاقة" },
      value: {
        en: "Solar arrays and batteries.",
        ar: "ألواح شمسية وبطاريات.",
      },
    },
    {
      label: { en: "Distance driven", ar: "المسافة المقطوعة" },
      value: { en: "About 7.73 km", ar: "نحو 7.73 كم" },
    },
    {
      label: { en: "Landing site", ar: "موقع الهبوط" },
      value: { en: "Gusev Crater", ar: "فوهة غوسيف" },
    },
    {
      label: { en: "Last contact", ar: "آخر اتصال" },
      value: { en: "22 March 2010", ar: "22 مارس 2010" },
    },
    {
      label: { en: "Planned mission", ar: "المهمة المخططة" },
      value: { en: "90 sols", ar: "90 يوماً مريخياً" },
    },
  ],
  chapters: [
    {
      id: "meet",
      kind: "meet",
      eyebrow: { en: "Chapter one", ar: "الفصل الأول" },
      title: { en: "Meet the Twin", ar: "تعرّف على التوأم" },
      summary: {
        en: "One of two identical rovers, built to do in 90 days what no robot had done before.",
        ar: "واحدة من عربتين متطابقتين، صُنعت لتفعل في تسعين يوماً ما لم يفعله أي روبوت من قبل.",
      },
      narrative: {
        en: [
          "Spirit and Opportunity were twins, built from the same design and launched a few weeks apart in 2003. Each was about the size of a golf cart and carried a suite of cameras and spectrometers on a robotic arm.",
          "Spirit's landing site was Gusev Crater, a large impact basin that may once have contained a lake. The mission was supposed to last 90 sols — about 92 Earth days — and its planners expected the dust to settle on the solar panels and slowly kill the rover.",
          "Instead, Spirit kept going. Dust devils occasionally cleaned the panels, and the rover's systems survived far longer than anyone had promised. It became the first Mars rover to climb a hill and the first to spend a Martian winter on a slope tilted toward the Sun.",
        ],
        ar: [
          "كانت سبيريت وأوبورتينيتي توأمتين، صُنعتا من التصميم نفسه وأُطلقتا بفارق أسابيع قليلة في 2003. وكانت كل واحدة بحجم عربة غولف تقريباً، وتحمل مجموعة كاميرات ومقاييس طيف على ذراع آلية.",
          "كان موقع هبوط سبيريت هو فوهة غوسيف، حوض اصطدام كبير ربما احتوى بحيرة قديماً. وكان يُفترض أن تستمر المهمة 90 يوماً مريخياً — نحو 92 يوماً أرضياً — وتوقع مخططوها أن يستقر الغبار على الألواح الشمسية فيقتل العربة ببطء.",
          "لكن سبيريت واصلت العمل. فكانت الشياطين الغبارية تنظف الألواح أحياناً، ونجت أنظمة العربة أطول بكثير مما وعد به أحد. وصارت أول عربة مريخية تصعد تلة، وأول عربة تمضي شتاءً مريخياً على منحدر مائل نحو الشمس.",
        ],
      },
      echo: {
        en: "The plan said 90 days. The machine had a different idea.",
        ar: "قالت الخطة تسعين يوماً. وكان للآلة رأي آخر.",
      },
      facts: [
        {
          label: { en: "Twin", ar: "التوأم" },
          value: { en: "Opportunity", ar: "أوبورتينيتي" },
        },
        {
          label: { en: "Design life", ar: "العمر التصميمي" },
          value: { en: "90 sols", ar: "90 يوماً مريخياً" },
        },
        {
          label: { en: "Actual operation", ar: "العمل الفعلي" },
          value: { en: "More than six years", ar: "أكثر من ست سنوات" },
        },
      ],
      diagram: {
        kind: "rover-components",
        title: {
          en: "What Spirit is made of",
          ar: "مكوّنات سبيريت",
        },
        intro: {
          en: "Select a marker to see what that part of the rover does. The shapes here are a teaching diagram of the real vehicle.",
          ar: "اختر أي علامة لترى وظيفة ذلك الجزء من العربة. الأشكال هنا رسم تعليمي للمركبة الحقيقية.",
        },
        points: [
          {
            id: "panels",
            x: 26,
            y: 46,
            label: { en: "Solar array wings", ar: "جناحا الألواح الشمسية" },
            detail: {
              en: "They unfolded after landing and charged the batteries. Dust settled on them over the years and slowly took the rover's power away.",
              ar: "تُفرِّدا بعد الهبوط ويشحّنان البطاريات. وكان الغبار يستقرّ عليهما مع السنين فيسلب العربة طاقتها ببطء.",
            },
          },
          {
            id: "mast",
            x: 49,
            y: 21,
            label: { en: "Camera mast", ar: "عمود الكاميرات" },
            detail: {
              en: "A stereo camera pair and a panoramic camera sat at eye height, so the rover could see where to drive and what to study.",
              ar: "كان على ارتفاع العين زوج كاميرات مجسّمة وكاميرا بانورامية، لترى العربة أين تقود وماذا تدرس.",
            },
          },
          {
            id: "wheels",
            x: 50,
            y: 66,
            label: { en: "Rocker-bogie wheels", ar: "عجلات روكَر–بوغي" },
            detail: {
              en: "Six wheels on a suspension that kept the body level while single wheels climbed over rocks.",
              ar: "ست عجلات على تعليق يُبقي الهيكل مستوياً بينما تتسلق عجلات منفردة الصخور.",
            },
          },
          {
            id: "arm",
            x: 78,
            y: 66,
            label: { en: "Instrument arm", ar: "ذراع الأجهزة" },
            detail: {
              en: "The arm carried the spectrometers to a rock and ground into it, so the instruments could read fresh material instead of dusty surfaces.",
              ar: "كانت الذراع تحمل المقاييس الطيفية إلى الصخرة وتصل فيها، لتقرأ الأجهزة مادة طازجة بدل الأسطح المغبرة.",
            },
          },
        ],
      },
      quiz: [
        {
          id: "spi-q1",
          prompt: {
            en: "How long was Spirit designed to operate on Mars?",
            ar: "كم كان المفترض أن تعمل سبيريت على المريخ؟",
          },
          options: [
            {
              id: "a",
              label: { en: "90 sols", ar: "90 يوماً مريخياً" },
            },
            {
              id: "b",
              label: { en: "Two years", ar: "سنتان" },
            },
            {
              id: "c",
              label: { en: "Ten years", ar: "عشر سنوات" },
            },
          ],
          correctOptionId: "a",
          explanation: {
            en: "Spirit was designed for 90 sols. It operated for more than six years, far beyond its warranty.",
            ar: "صُممت سبيريت لتسعين يوماً مريخياً، لكنها عملت أكثر من ست سنوات، أي أبعد بكثير من عمرها التصميمي.",
          },
        },
      ],
    },
    {
      id: "mission",
      kind: "mission",
      eyebrow: { en: "Chapter two", ar: "الفصل الثاني" },
      title: { en: "The Long Mission", ar: "المهمة الطويلة" },
      summary: {
        en: "Landing, driving, climbing, and the slow accident that ended the journey.",
        ar: "الهبوط والسير والصعود والحادث البطيء الذي أنهى الرحلة.",
      },
      narrative: {
        en: [
          "Spirit landed on 4 January 2004 using the same airbag system that had carried Sojourner to Mars seven years earlier. It rolled off its lander and began examining the rocks and soil of Gusev Crater.",
          "The rover spent years driving toward and then up the Columbia Hills. It reached Husband Hill in 2005 and continued to study a plateau called Home Plate. Along the way it used its cameras, its microscopic imager and its spectrometers to read the chemistry of the rocks.",
          "In May 2009 Spirit's wheels broke through a crust of soil and sank into a hidden patch of soft sand. The team spent months testing ways to free it, but the rover could not get out. It continued to do stationary science until the Martian winter reduced its power, and the last communication came on 22 March 2010.",
        ],
        ar: [
          "هبطت سبيريت في 4 يناير 2004 مستخدمة نظام الأكياس الهوائية نفسه الذي حمل سوجورنر إلى المريخ قبل سبع سنوات. ونزلت عن مركبة هبوطها وبدأت فحص صخور فوهة غوسيف وتربتها.",
          "أمضت العربة سنوات في السير نحو تلال كولومبيا ثم صعودها. ووصلت تلة هازبند في 2005 وواصلت دراسة هضبة تُسمى هوم بليت. وفي الطريق استخدمت كاميراتها ومصوّرها المجهري ومقاييس الطيف لقراءة كيميائية الصخور.",
          "وفي مايو 2009 اخترقت عجلات سبيريت قشرة من التربة وغرست في بقعة خفية من الرمل اللين. أمضى الفريق شهوراً في اختبار طرق لتحريرها، لكن العربة لم تستطع الخروج. وواصلت علماً ثابتاً حتى قلّل شتاء المريخ طاقتها، وكان آخر اتصال في 22 مارس 2010.",
        ],
      },
      echo: {
        en: "It did not get stuck because it was badly built. It got stuck because it kept going somewhere new.",
        ar: "لم تعلق لأنها بُنيت بشكل سيئ، بل علقت لأنها استمرت في الذهاب إلى مكان جديد.",
      },
      glossary: [
        {
          id: "sol",
          term: { en: "Sol", ar: "سول" },
          simple: {
            en: "One Martian day, a little longer than a day on Earth. Mission plans were written in sols, not days.",
            ar: "يوم مريخي واحد، أطول قليلاً من يوم الأرض. كُتبت خطط المهمات بالسولات لا بالأيام.",
          },
          technical: {
            en: "A sol is Mars rotating once relative to the Sun: about 24 hours and 37 minutes.",
            ar: "السول هو دوران المريخ مرة واحدة بالنسبة إلى شمسه: نحو 24 ساعة و37 دقيقة.",
          },
        },
        {
          id: "dust-devil",
          term: { en: "Dust devil", ar: "شيطان غباري" },
          simple: {
            en: "A spinning column of wind that lifts dust into the air. On Mars some of them swept dust off Spirit's solar panels and gave it more power.",
            ar: "عمود دوّار من الريح يرفع الغبار إلى الهواء. وعلى المريخ كانت بعضها تنفض الغبار عن ألواح سبيريت الشمسية فتزيد طاقتها.",
          },
        },
        {
          id: "spectrometer",
          term: { en: "Spectrometer", ar: "مقياس الطيف" },
          simple: {
            en: "A tool that works out what a material is made of from the light or particles it gives off.",
            ar: "أداة تحدّد مكوّنات المادة من الضوء أو الجزيئات التي تُصدرها.",
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
        en: "Seven months from Cape Canaveral to Gusev Crater, then six years of slow driving toward the Columbia Hills.",
        ar: "سبعة أشهر من كيب كانافيرال إلى فوهة غوسيف، ثم ست سنوات من السير البطيء نحو تلال كولومبيا.",
      },
      narrative: {
        en: [
          "Spirit launched on 10 June 2003 from Cape Canaveral on a Delta II rocket, packed inside its landing stack with the solar panels already open to catch the Sun. For about seven months it coasted toward Mars, firing small thrusters now and then to keep its course true.",
          "On 4 January 2004 the spacecraft hit the top of the Martian atmosphere at kilometres per second. A heat shield took the heat, a parachute took the speed, then rockets and a cocoon of airbags took over. The lander bounced across the plain of Gusev Crater, rolled to a stop, and opened its petals onto a new world.",
          "Then the long drive began. Spirit crossed the crater floor toward the Columbia Hills, a journey of more than a year, and in 2005 it climbed Husband Hill and looked out over the landing site it had left behind. It studied a plateau called Home Plate and drove on. Six years of short, careful drives added up to 7.73 kilometres.",
          "In May 2009 the rover broke through a crust of soil at a site the team called Troy and sank into soft sand. Months of careful manoeuvring could not free it. The team turned it into a stationary science platform, tilted its panels toward the winter Sun, and kept working until the power faded and the last signal left the rover on 22 March 2010.",
        ],
        ar: [
          "انطلقت سبيريت في 10 يونيو 2003 من كيب كانافيرال على صاروخ دلتا 2، معبأة داخل وحدة الهبوط وألواحها الشمسية مفتوحة مسبقاً لتلتقط الشمس. ومضت نحو سبعة أشهر نحو المريخ، تشعل محرّكاتها الصغيرة من حين لآخر لتُبقي مسارها صحيحاً.",
          "في 4 يناير 2004 ارتطمت المركبة بأعلى الغلاف الجوي المريخي بسرعة الكيلومترات في الثانية. تحمّل الدرع الحراري الحرارة، وتولّت المظلة تخفيف السرعة، ثم تولّت الصواريخ وعشّ من الأكياس الهوائية. ارتدت مركبة الهبوط على سهل فوهة غوسيف حتى استقرت، ثم فتحت بتلاتها على عالم جديد.",
          "ثم بدأ السير الطويل. عبرت سبيريت قاع الفوهة نحو تلال كولومبيا في رحلة استغرقت أكثر من عام، وفي 2005 صعدت تلة هازبند ونظرت إلى موقع الهبوط الذي تركته خلفها. ودرست هضبة تُسمى هوم بليت وواصلت السير. وبلغ مجموع قياداتها القصيرة الحذرة على مدى ست سنوات 7.73 كيلومترات.",
          "في مايو 2009 اخترقت العربة قشرة من التربة في موضع دعاه الفريق «تروي»، وغرست في رمل لين. ولم تُحرّرها شهور من المناورات الحذرة. فحوّلها الفريق إلى منصة علم ثابتة، ومالت ألواحها نحو شمس الشتاء، وواصلت العمل حتى خبت الطاقة وغادرت آخر إشارة العربة في 22 مارس 2010.",
        ],
      },
      echo: {
        en: "Seven months to arrive. Six years to cross 7.73 kilometres. Exploration is not fast — it is just stubborn.",
        ar: "سبعة أشهر للوصول. وست سنوات لقطع 7.73 كيلومترات. الاستكشاف ليس سريعاً — إنه فقط عنيد.",
      },
      timeline: [
        {
          id: "spi-launch",
          date: "2003-06-10",
          dateLabel: { en: "10 June 2003", ar: "10 يونيو 2003" },
          label: { en: "Launch", ar: "الإطلاق" },
          description: {
            en: "Spirit launched from Cape Canaveral on a Delta II rocket.",
            ar: "انطلقت سبيريت من كيب كانافيرال على صاروخ دلتا 2.",
          },
          type: "launch",
          sourceIds: ["SRC-SPIRIT", "SRC-NSSDCA-SPIRIT"],
        },
        {
          id: "spi-landing",
          date: "2004-01-04",
          dateLabel: { en: "4 January 2004", ar: "4 يناير 2004" },
          label: { en: "Landing at Gusev Crater", ar: "الهبوط في فوهة غوسيف" },
          description: {
            en: "Spirit bounced to a stop inside Gusev Crater and began its surface mission.",
            ar: "ارتدت سبيريت حتى استقرت داخل فوهة غوسيف وبدأت مهمتها السطحية.",
          },
          type: "landing",
          sourceIds: ["SRC-SPIRIT", "SRC-NSSDCA-SPIRIT"],
        },
        {
          id: "spi-husband",
          date: "2005-08-21",
          dateLabel: { en: "August 2005", ar: "أغسطس 2005" },
          label: { en: "Husband Hill summit", ar: "قمة تلة هازبند" },
          description: {
            en: "Spirit reached the summit of Husband Hill after a long climb through the Columbia Hills.",
            ar: "وصلت سبيريت إلى قمة تلة هازبند بعد صعود طويل عبر تلال كولومبيا.",
          },
          type: "milestone",
          sourceIds: ["SRC-SPIRIT"],
        },
        {
          id: "spi-stuck",
          date: "2009-05-06",
          dateLabel: { en: "May 2009", ar: "مايو 2009" },
          label: { en: "Trapped in soft soil", ar: "العلق في تربة لينة" },
          description: {
            en: "Spirit's wheels broke through a crust and became embedded in loose sand near Home Plate.",
            ar: "اخترقت عجلات سبيريت قشرة من التربة وغرست في رمل مفكك قرب هوم بليت.",
          },
          type: "milestone",
          sourceIds: ["SRC-SPIRIT"],
        },
        {
          id: "spi-last",
          date: "2010-03-22",
          dateLabel: { en: "22 March 2010", ar: "22 مارس 2010" },
          label: { en: "Last contact", ar: "آخر اتصال" },
          description: {
            en: "The final signal from Spirit reached Earth after the rover lost power for the Martian winter.",
            ar: "وصلت آخر إشارة من سبيريت إلى الأرض بعد أن فقدت العربة طاقتها لشتاء المريخ.",
          },
          type: "last-contact",
          sourceIds: ["SRC-SPIRIT", "SRC-NSSDCA-SPIRIT"],
        },
      ],
      diagram: {
        kind: "journey-map",
        title: { en: "The route to Gusev Crater", ar: "الطريق إلى فوهة غوسيف" },
        intro: {
          en: "Launch, cruise, landing — and then six years of driving.",
          ar: "الإطلاق، ثم العبور، ثم الهبوط — ثم ست سنوات من القيادة.",
        },
        route: [
          {
            label: { en: "Launch", ar: "الإطلاق" },
            description: {
              en: "Cape Canaveral, 10 June 2003",
              ar: "كيب كانافيرال، 10 يونيو 2003",
            },
          },
          {
            label: { en: "Cruise", ar: "الرحلة البينية" },
            description: {
              en: "About seven months to Mars",
              ar: "نحو سبعة أشهر إلى المريخ",
            },
          },
          {
            label: { en: "Landing", ar: "الهبوط" },
            description: {
              en: "Gusev Crater, 4 January 2004",
              ar: "فوهة غوسيف، 4 يناير 2004",
            },
          },
          {
            label: { en: "The climb", ar: "الصعود" },
            description: {
              en: "Across the crater floor and up Husband Hill",
              ar: "عبر قاع الفوهة وصعوداً إلى تلة هازبند",
            },
          },
          {
            label: { en: "Troy", ar: "تروي" },
            description: {
              en: "Stuck in soft sand in 2009; last contact 22 March 2010",
              ar: "غرست في رمل لين عام 2009؛ آخر اتصال 22 مارس 2010",
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
              en: "Launch from Cape Canaveral on 10 June 2003.",
              ar: "الإطلاق من كيب كانافيرال في 10 يونيو 2003.",
            },
          },
          {
            id: "cruise",
            x: 36,
            y: 35,
            label: { en: "Cruise", ar: "الرحلة البينية" },
            detail: {
              en: "About seven months of coasting to Mars.",
              ar: "نحو سبعة أشهر من الانتقال إلى المريخ.",
            },
          },
          {
            id: "landing",
            x: 60,
            y: 26,
            label: { en: "Landing", ar: "الهبوط" },
            detail: {
              en: "Airbags bounced the lander to a stop in Gusev Crater on 4 January 2004.",
              ar: "جعلت الأكياس الهوائية مركبة الهبوط ترتد حتى تستقر في فوهة غوسيف في 4 يناير 2004.",
            },
          },
          {
            id: "gusev",
            x: 84,
            y: 32,
            label: { en: "Gusev Crater", ar: "فوهة غوسيف" },
            detail: {
              en: "The surface mission: 7.73 kilometres toward the Columbia Hills, ending near Home Plate.",
              ar: "المهمة السطحية: 7.73 كيلومترات نحو تلال كولومبيا، تنتهي قرب هوم بليت.",
            },
          },
        ],
      },
    },
    {
      id: "discoveries",
      kind: "discoveries",
      eyebrow: { en: "Chapter four", ar: "الفصل الرابع" },
      title: { en: "What Spirit Found", ar: "ما الذي وجدته سبيريت" },
      summary: {
        en: "Water-altered rock, volcanic history and a mountain made of layers.",
        ar: "صخور غيّرها الماء وتاريخ بركاني وجبل من طبقات.",
      },
      narrative: {
        en: [
          "Spirit's most important discoveries came from looking closely at rocks that had been changed by water and heat. The rover could grind into a rock, photograph the fresh surface and measure its chemistry.",
          "That combination turned Gusev Crater from a promising landing site into a place with a readable history — one that included water, volcanic activity and long periods of dry, dusty conditions.",
        ],
        ar: [
          "جاءت أهم اكتشافات سبيريت من النظر عن قرب إلى صخور غيّرها الماء والحرارة. فقد كانت العربة تستطيع حفر الصخرة وتصوير سطحها الطازج وقياس كيميائيتها.",
          "وقد حوّل ذلك المزيج فوهة غوسيف من موقع هبوط واعد إلى مكان له تاريخ يمكن قراءته — تاريخ شمل الماء والنشاط البركاني وفترات طويلة من الظروف الجافة والمغبرة.",
        ],
      },
      echo: {
        en: "A rock is a diary. Spirit learned how to read the wet pages.",
        ar: "الصخرة مذكرة يوميات. وقد تعلمت سبيريت كيف تقرأ صفحاتها المبللة.",
      },
      discoveries: [
        {
          id: "spi-d1",
          title: { en: "Water left its mark", ar: "الماء ترك أثره" },
          question: {
            en: "Was Gusev Crater ever wet enough to alter rock?",
            ar: "هل كانت فوهة غوسيف رطبة بما يكفي لتغيير الصخور؟",
          },
          instrument: {
            en: "Spirit's panoramic cameras, microscopic imager and Mössbauer spectrometer",
            ar: "كاميرات سبيريت البانورامية ومصوّرها المجهري ومطيافها",
          },
          method: {
            en: "The rover ground into selected rocks, photographed the fresh material and measured the iron-bearing minerals with its spectrometers.",
            ar: "حفرت العربة في صخور مختارة وصوّرت المادة الطازجة وقاست المعادن الحاملة للحديد بمقاييس الطيف.",
          },
          data: {
            en: "Some rocks contained silica-rich and sulfate-bearing materials that form when water interacts with volcanic rock.",
            ar: "احتوت بعض الصخور على مواد غنية بالسيليكا وكبريتات تتشكل عندما يتفاعل الماء مع الصخور البركانية.",
          },
          finding: {
            en: "Water had once moved through the rocks at Gusev Crater, even if the crater was not a long-lived lake.",
            ar: "كان الماء قد تحرك عبر صخور فوهة غوسيف يوماً، حتى إن لم تكن الفوهة بحيرة دائمة.",
          },
          significance: {
            en: "It showed that water altered the Martian crust in more than one kind of environment, not only at the dramatic sedimentary sites.",
            ar: "أظهر أن الماء غيّر قشرة المريخ في أكثر من نوع من البيئات، لا في المواقع الرسوبية الشهيرة فقط.",
          },
          sourceIds: ["SRC-SPIRIT", "SRC-NASA-MER"],
        },
        {
          id: "spi-d2",
          title: { en: "A volcanic hill with a view", ar: "تلة بركانية ذات منظر" },
          question: {
            en: "What built the Columbia Hills?",
            ar: "ما الذي بنى تلال كولومبيا؟",
          },
          instrument: {
            en: "Panoramic camera and rock abrasion tool",
            ar: "الكاميرا البانورامية وأداة حفر الصخور",
          },
          method: {
            en: "Spirit climbed through the hills, examining layered outcrops and the chemistry of rocks along the route.",
            ar: "صعدت سبيريت عبر التلال وفحصت نتوءات طبقية وكيميائية الصخور على طول الطريق.",
          },
          data: {
            en: "The rocks showed a mix of volcanic materials and later alteration, with layers that recorded different episodes of activity.",
            ar: "أظهرت الصخور مزيجاً من مواد بركانية وتغيّر لاحق، مع طبقات سجلت نوبات مختلفة من النشاط.",
          },
          finding: {
            en: "The Columbia Hills were built by volcanic and impact processes, then altered by water and weathering.",
            ar: "بُنيت تلال كولومبيا بعمليات بركانية واصطدامية، ثم غيّرها الماء والتجوية.",
          },
          significance: {
            en: "The climb gave the mission a vertical record of Martian history that a flat landing site could not provide.",
            ar: "منح الصعود المهمة سجلاً رأسياً لتاريخ المريخ لم يكن موقع هبوط مستوٍ قادراً على تقديمه.",
          },
          sourceIds: ["SRC-SPIRIT", "SRC-NASA-MER"],
        },
      ],
    },
    {
      id: "ending",
      kind: "ending",
      eyebrow: { en: "Chapter five", ar: "الفصل الخامس" },
      title: { en: "A Stationary Winter", ar: "شتاء ثابت" },
      summary: {
        en: "Stuck, dusty and cold, Spirit kept doing science until its power ran out.",
        ar: "عالقة ومغبرة وباردة، واصلت سبيريت العلم حتى نفدت طاقتها.",
      },
      narrative: {
        en: [
          "Once Spirit could not move, the team changed the mission. The rover became a stationary science platform, measuring the soil and atmosphere around it and watching the seasons change.",
          "The Martian winter reduced the sunlight reaching its panels. The rover's heaters and electronics needed power that the dust-dimmed arrays could not supply. The last communication arrived on 22 March 2010, and NASA ended the mission in 2011 after listening for a signal that never came.",
          "Spirit is still at Gusev Crater, embedded near Home Plate. It is not a wreck that fell from the sky. It is a working rover that went one hill too far and then made a new mission out of standing still.",
        ],
        ar: [
          "حين لم تعد سبيريت قادرة على الحركة، غيّر الفريق المهمة. فصارت العربة منصة علم ثابتة، تقيس التربة والغلاف الجوي حولها وتراقب تغير الفصول.",
          "قلل شتاء المريخ ضوء الشمس الواصل إلى ألواحها. وكانت سخانات العربة وإلكترونياتها تحتاج طاقة لم تستطع الألواح المغبرة توفيرها. ووصل آخر اتصال في 22 مارس 2010، وأنهت ناسا المهمة في 2011 بعد الاستماع إلى إشارة لم تأتِ.",
          "وما زالت سبيريت في فوهة غوسيف، مغروسة قرب هوم بليت. وهي ليست حطاماً سقط من السماء، بل عربة عاملة ذهبت إلى تلة أبعد من اللازم، ثم صنعت من الثبات مهمة جديدة.",
        ],
      },
      echo: {
        en: "Even standing still, Spirit kept looking. That is what a good explorer does.",
        ar: "حتى وهي ثابتة، واصلت سبيريت النظر. وهذا ما يفعله المستكشف الجيد.",
      },
      facts: [
        {
          label: { en: "Final location", ar: "الموقع الأخير" },
          value: {
            en: "Near Home Plate, Gusev Crater.",
            ar: "قرب هوم بليت، فوهة غوسيف.",
          },
        },
        {
          label: { en: "Last contact", ar: "آخر اتصال" },
          value: { en: "22 March 2010", ar: "22 مارس 2010" },
        },
        {
          label: { en: "Mission ended", ar: "انتهاء المهمة" },
          value: { en: "2011", ar: "2011" },
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
        en: "Water in the rocks, lessons in the sand, and a rover still sitting where it stopped.",
        ar: "ماء في الصخور، ودروس في الرمل، وعربة ما زالت جالسة حيث توقفت.",
      },
      narrative: {
        en: [
          "Spirit changed what a landing site could mean. Gusev Crater looked, from orbit, like an old lake bed; on the ground the rover found volcanic rocks instead — and then found that water had changed those rocks anyway. Mars, it turned out, had been wet in more ways and in more places than the pictures suggested.",
          "Its engineering lessons were just as concrete. The months spent trying to drag a stuck rover out of soft sand taught engineers exactly how treacherous loose soil could be, and later rovers were tested against the same traps before they ever flew.",
          "The end of the mission made a different point. Spirit survived by tilting toward the Sun and scraping power through the winter; when that stopped being enough, the rover went quiet. Later rovers carry nuclear generators in part because a solar rover in Gusev Crater showed where the limit was.",
          "Spirit is still in Gusev Crater, embedded in the sand near Home Plate, with 7.73 kilometres of track behind it and no way to move. It is not a wreck. It is an explorer at rest, in the middle of the work it was sent to do.",
        ],
        ar: [
          "غيّرت سبيريت ما يمكن أن يعنيه موقع الهبوط. بدت فوهة غوسيف من المدار كقاع بحيرة قديم؛ وعلى الأرض وجدت العربة صخوراً بركانية بدل ذلك — ثم وجدت أن الماء كان قد غيّر تلك الصخور على أي حال. تبيّن أن المريخ كان رطباً بطرق وأماكن أكثر مما توحي به الصور.",
          "لم تكن دروسها الهندسية أقل وضوحاً. علّمت الشهور التي أُنفقت في محاولة انتشال عربة عالقة من الرمل اللين المهندسين كم يمكن أن تكون التربة المفككة خادعة، واختُبرت العُربات اللاحقة ضدّ المصائد نفسها قبل أن تطير يوماً.",
          "وقد أسهمت نهاية المهمة بفائدة مختلفة. نجت سبيريت بأن مالت نحو الشمس واجتهدت في توفير الطاقة عبر الشتاء؛ وحين لم يعد ذلك كافياً صمتت العربة. تحمل العُربات اللاحقة مولّدات نووية جزئياً لأن عربة شمسية في فوهة غوسيف أظهرت أين ينتهي الحد.",
          "ما زالت سبيريت في فوهة غوسيف، مغروسة في الرمل قرب هوم بليت، وخلفها 7.73 كيلومترات من الآثار، وبلا سبيل للحركة. وهي ليست حطاماً، بل مستكشفة استرحت في منتصف العمل الذي أُرسلت لإنجازه.",
        ],
      },
      echo: {
        en: "Spirit was built for 90 days and gave six years. Even after it stopped moving it kept teaching — including how to build the next rover.",
        ar: "صُنعت سبيريت لتسعين يوماً فمنحت ست سنوات. وحتى بعد أن توقفت عن الحركة ظلّت تعلّم — حتى كيف تُبنى العربة التالية.",
      },
      facts: [
        {
          label: { en: "Distance driven", ar: "المسافة المقطوعة" },
          value: { en: "7.73 km across six years", ar: "7.73 كيلومترات في ست سنوات" },
        },
        {
          label: { en: "Where it is now", ar: "أين هي الآن" },
          value: {
            en: "Embedded in soft soil near Home Plate, Gusev Crater.",
            ar: "مغروسة في تربة لينة قرب هوم بليت، فوهة غوسيف.",
          },
        },
        {
          label: { en: "Still in the record", ar: "ما زالت في السجل" },
          value: {
            en: "One of the longest missions ever driven on another world.",
            ar: "من أطول المهمات التي سِير بها على عالم آخر.",
          },
        },
      ],
    },
  ],
  legacyStatement: {
    en: "Spirit was built for 90 days and gave Mars six years of careful looking.",
    ar: "صُنعت سبيريت لتسعين يوماً، فمنحت المريخ ست سنوات من النظر المتأني.",
  },
  tags: ["mars", "rover", "remnant"],
  artifactId: "spirit",
  sourceIds: ["SRC-SPIRIT", "SRC-NSSDCA-SPIRIT", "SRC-NASA-MER"],
  relatedStorySlugs: ["opportunity", "viking-2-lander"],
  echoIntro: {
    en: "This rover was supposed to last three months. It stayed for six years. Come and see what kept it going.",
    ar: "كان يُفترض أن تعمل هذه العربة ثلاثة أشهر، فبقيت ست سنوات. تعال لترى ما الذي أبقاها عاملة.",
  },
  echoSignoff: {
    en: "Spirit is still in Gusev Crater, a rover at rest after one of the longest missions ever driven on Mars.",
    ar: "ما زالت سبيريت في فوهة غوسيف، عربة تستريح بعد واحدة من أطول المهمات التي سِير بها على المريخ.",
  },
  lastVerified: "2026-11-14",
};
