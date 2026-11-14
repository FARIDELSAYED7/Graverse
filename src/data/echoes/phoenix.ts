import type { EchoStory } from "@/types/echo";
import { echoImage } from "./media";

/**
 * PHOENIX — the lander that dug into the Martian arctic and touched water ice.
 *
 * Sources: the NASA Phoenix mission page and the NSSDCA Phoenix record.
 */
export const phoenixStory: EchoStory = {
  id: "phoenix",
  slug: "phoenix",
  title: {
    en: "Phoenix",
    ar: "فينكس",
  },
  storyTitle: {
    en: "Digging for Ice",
    ar: "الحفر بحثاً عن الجليد",
  },
  dek: {
    en: "A lander built from spare parts, sent to the Martian arctic, that scraped away the soil and found water ice underneath.",
    ar: "مركبة هبوط بُنيت من قطع غيار، أُرسلت إلى القطب الشمالي للمريخ، فكشطت التربة ووجدت جليد ماء تحتها.",
  },
  summary: {
    en: "Phoenix landed in the northern arctic plain of Mars on 25 May 2008. It used a robotic arm to dig trenches in the soil and exposed a layer of water ice. Its instruments analysed the soil, monitored the weather and watched the approach of winter. The lander was powered by solar arrays, and as the Sun sank and dust covered the panels, it fell silent on 2 November 2008.",
    ar: "هبطت فينكس في السهل القطبي الشمالي للمريخ في 25 مايو 2008. واستخدمت ذراعاً آلية لحفر خنادق في التربة فكشفت طبقة من جليد الماء. وحللت أجهزتها التربة وراقبت الطقس ورصدت اقتراب الشتاء. وكانت المركبة تعمل بألواح شمسية، ومع انخفاض الشمس وتغطية الغبار للألواح، صمتت في 2 نوفمبر 2008.",
  },
  location: {
    en: "Vastitas Borealis, the Martian arctic",
    ar: "فاستيتاس بورياليس، القطب الشمالي للمريخ",
  },
  locationNote: {
    en: "Phoenix landed at a high northern latitude, where water ice is stable just below the surface. The site is sometimes called Green Valley.",
    ar: "هبطت فينكس عند خط عرض شمالي مرتفع، حيث يكون جليد الماء مستقراً تحت السطح مباشرة. ويُسمى الموقع أحياناً الوادي الأخضر.",
  },
  equipmentType: {
    en: "Stationary polar lander",
    ar: "مركبة هبوط قطبية ثابتة",
  },
  missionPeriod: {
    en: "Launch 4 August 2007 · Landing 25 May 2008 · Last contact 2 November 2008",
    ar: "الإطلاق 4 أغسطس 2007 · الهبوط 25 مايو 2008 · آخر اتصال 2 نوفمبر 2008",
  },
  missionStatus: {
    en: "Mission complete — NASA ended the mission in November 2008 after the lander lost power for the Martian winter.",
    ar: "اكتملت المهمة — أنهت ناسا المهمة في نوفمبر 2008 بعد أن فقدت المركبة طاقتها لشتاء المريخ.",
  },
  hardwareStatus: {
    en: "Inactive — Phoenix remains in the Martian arctic. Its condition after winter was never confirmed.",
    ar: "غير نشطة — ما زالت فينكس في القطب الشمالي للمريخ. ولم يُتحقق من حالتها بعد الشتاء.",
  },
  statusKind: "silent",
  accent: "#7FB6D9",
  accentSoft: "#DCEEF8",
  badge: {
    en: "Ice Digger",
    ar: "حافر الجليد",
  },
  badgeKey: "ice-digger",
  hero: echoImage("PIA10701", {
    alt: {
      en: "An orbital view of the Phoenix lander on the Martian surface with its solar panels deployed.",
      ar: "منظر مداري لمركبة فينكس على سطح المريخ وألواحها الشمسية مفتوحة.",
    },
    caption: {
      en: "Phoenix on the Martian arctic plain, photographed from orbit in May 2008. The dark patches are the lander and the disturbed soil around it.",
      ar: "فينكس على السهل القطبي للمريخ، مصوّرة من المدار في مايو 2008. البقع الداكنة هي المركبة والتربة التي حركتها حولها.",
    },
  }),
  gallery: [
    echoImage("PIA09344", {
      alt: {
        en: "An artist's concept of the Phoenix lander on Mars with its robotic arm reaching toward the soil.",
        ar: "تصور فني لمركبة فينكس على المريخ وذراعها الآلية تمتد نحو التربة.",
      },
      caption: {
        en: "An artist's concept of Phoenix at work. The real lander used its arm to dig trenches and deliver samples to instruments on the deck.",
        ar: "تصور فني لفينكس أثناء عملها. استخدمت المركبة الحقيقية ذراعها لحفر الخنادق وتقديم العينات إلى أجهزة على سطحها.",
      },
    }),
    echoImage("PIA10752", {
      alt: {
        en: "A scoop of Martian soil held by the Phoenix lander's robotic arm after release.",
        ar: "مغرفة من تربة المريخ تحملها ذراع فينكس الآلية بعد إطلاقها.",
      },
      caption: {
        en: "Soil from a Phoenix trench. The arm delivered samples to the lander's thermal and chemical analysers.",
        ar: "تربة من خندق فينكس. سلّمت الذراع عينات إلى محللات المركبة الحرارية والكيميائية.",
      },
    }),
    echoImage("PIA12107", {
      alt: {
        en: "A composite view of trenches dug by the Phoenix lander in the Martian soil.",
        ar: "منظر مركب لخنادق حفرتها فينكس في تربة المريخ.",
      },
      caption: {
        en: "Phoenix's trenches. The shallow pits exposed a bright layer that turned out to be water ice.",
        ar: "خنادق فينكس. كشفت الحفر الضحلة طبقة ساطعة تبيّن أنها جليد ماء.",
      },
    }),
  ],
  facts: [
    {
      label: { en: "Mass", ar: "الكتلة" },
      value: { en: "About 350 kg", ar: "نحو 350 كغ" },
    },
    {
      label: { en: "Power", ar: "الطاقة" },
      value: { en: "Solar arrays and batteries", ar: "ألواح شمسية وبطاريات" },
    },
    {
      label: { en: "Landing site", ar: "موقع الهبوط" },
      value: { en: "Vastitas Borealis", ar: "فاستيتاس بورياليس" },
    },
    {
      label: { en: "Key instruments", ar: "الأجهزة الرئيسية" },
      value: {
        en: "Robotic arm, TEGA, MECA and a weather station",
        ar: "ذراع آلية وجهاز تحليل حراري وجهاز كيمياء رطبة ومحطة طقس",
      },
    },
    {
      label: { en: "Last contact", ar: "آخر اتصال" },
      value: { en: "2 November 2008", ar: "2 نوفمبر 2008" },
    },
    {
      label: { en: "Designed from", ar: "مبنية من" },
      value: {
        en: "Heritage hardware from the Mars Polar Lander and Mars Surveyor 2001 programme.",
        ar: "عتاد موروث من برنامج مركبة الهبوط القطبية والماسح المريخي 2001.",
      },
    },
  ],
  chapters: [
    {
      id: "meet",
      kind: "meet",
      eyebrow: { en: "Chapter one", ar: "الفصل الأول" },
      title: { en: "Meet the Ice Lander", ar: "تعرّف على مركبة الجليد" },
      summary: {
        en: "A stationary robot with a long arm, sent to a place where the ground itself might hold the answer.",
        ar: "روبوت ثابت بذراع طويلة، أُرسل إلى مكان قد يحمل فيه السطح نفسه الجواب.",
      },
      narrative: {
        en: [
          "Phoenix was not a rover. It could not drive anywhere. It was built to land in one place, dig into the soil and study what it found. The target was the Martian arctic, where orbital data suggested that water ice lay close to the surface.",
          "The spacecraft reused hardware and designs from earlier Mars missions, which made it cheaper and faster to build. It carried a robotic arm, a thermal and evolved gas analyser, a wet-chemistry laboratory and a weather station. Its solar arrays would give it power during the long polar summer.",
          "The mission had a hard deadline built into it: the Martian winter. When the Sun set for months, the solar panels would stop producing power. Phoenix had one summer to do its work.",
        ],
        ar: [
          "لم تكن فينكس عربة جوّالة ولم تستطع السير إلى أي مكان. بل صُنعت لتهبط في مكان واحد وتحفر في التربة وتدرس ما تجده. وكان الهدف هو القطب الشمالي للمريخ، حيث أشارت البيانات المدارية إلى أن جليد الماء قريب من السطح.",
          "أعادت المركبة استخدام عتاد وتصاميم من مهمات مريخية سابقة، مما جعل بنائها أرخص وأسرع. وحملت ذراعاً آلية ومحللاً حرارياً للغازات ومختبر كيمياء رطبة ومحطة طقس. وكانت ألواحها الشمسية ستوفر لها الطاقة خلال الصيف القطبي الطويل.",
          "وكان للمهمة موعد نهائي صارم: شتاء المريخ. فحين تغيب الشمس أشهراً، تتوقف الألواح الشمسية عن إنتاج الطاقة. وكان أمام فينكس صيف واحد لتنجز عملها.",
        ],
      },
      echo: {
        en: "Some robots drive. This one knelt down and dug.",
        ar: "بعض الروبوتات تسير. وهذه جثت على ركبتها وحفرت.",
      },
      facts: [
        {
          label: { en: "Mobility", ar: "الحركة" },
          value: { en: "None — a stationary lander", ar: "لا حركة — مركبة ثابتة" },
        },
        {
          label: { en: "Main tool", ar: "الأداة الرئيسية" },
          value: { en: "A robotic arm with a scoop", ar: "ذراع آلية بمغرفة" },
        },
        {
          label: { en: "Season", ar: "الفصل" },
          value: { en: "One polar summer", ar: "صيف قطبي واحد" },
        },
      ],
      diagram: {
        kind: "lander-components",
        title: { en: "The Phoenix lander", ar: "مركبة هبوط فينكس" },
        intro: {
          en: "Select a marker to see what that part of the lander did.",
          ar: "اختر أي علامة لترى وظيفة ذلك الجزء من مركبة الهبوط.",
        },
        points: [
          {
            id: "arm",
            x: 32,
            y: 28,
            label: { en: "Robotic arm", ar: "الذراع الآلية" },
            detail: {
              en: "A long arm with a scoop that dug trenches and carried soil up to the instruments on the deck.",
              ar: "ذراع طويلة بمغرفة حفرت الخنادق وحملت التربة إلى الأجهزة على سطح المركبة.",
            },
          },
          {
            id: "solar",
            x: 58,
            y: 20,
            label: { en: "Solar arrays", ar: "الألواح الشمسية" },
            detail: {
              en: "Two wings that turned sunlight into power through the polar summer. The sinking Sun and settling dust slowly ended their output.",
              ar: "جناحان حوّلا ضوء الشمس إلى طاقة خلال الصيف القطبي. وقد أنهى الغبار المستقر والشمس الغائبة إنتاجهما ببطء.",
            },
          },
          {
            id: "laboratory",
            x: 68,
            y: 58,
            label: { en: "Analysis laboratory", ar: "مختبر التحليل" },
            detail: {
              en: "Instruments including TEGA and MECA heated and dissolved soil samples to read their chemistry and the gases they release.",
              ar: "أجهزة من بينها TEGA وMECA سخّنت عينات التربة وذابتها لتقرأ كيمياءها والغازات التي تطلقها.",
            },
          },
          {
            id: "legs",
            x: 28,
            y: 72,
            label: { en: "Landing legs", ar: "أرجل الهبوط" },
            detail: {
              en: "Three legs and footpads that settled the lander upright on the arctic plain.",
              ar: "ثلاثة أرجل وأقراص أقدام استقرت بها المركبة قائمة على السهل القطبي.",
            },
          },
        ],
      },
      quiz: [
        {
          id: "phx-q1",
          prompt: {
            en: "Why did Phoenix have to finish its work before winter?",
            ar: "لماذا كان على فينكس إنهاء عملها قبل الشتاء؟",
          },
          options: [
            {
              id: "a",
              label: {
                en: "Its solar panels would stop producing power when the Sun set for months.",
                ar: "لأن ألواحها الشمسية ستتوقف عن إنتاج الطاقة حين تغيب الشمس أشهراً.",
              },
            },
            {
              id: "b",
              label: {
                en: "The Martian winter would cover the lander in lava.",
                ar: "لأن شتاء المريخ سيغطي المركبة بالحمم.",
              },
            },
            {
              id: "c",
              label: {
                en: "Its robotic arm could not move in cold weather.",
                ar: "لأن ذراعها الآلية لا تستطيع الحركة في الطقس البارد.",
              },
            },
          ],
          correctOptionId: "a",
          explanation: {
            en: "Phoenix depended on solar power. The polar winter brought months of darkness and dust, so the mission was designed around a single summer.",
            ar: "اعتمدت فينكس على الطاقة الشمسية. وقد جلب الشتاء القطبي أشهراً من الظلام والغبار، فصُممت المهمة حول صيف واحد.",
          },
        },
      ],
    },
    {
      id: "mission",
      kind: "mission",
      eyebrow: { en: "Chapter two", ar: "الفصل الثاني" },
      title: { en: "One Arctic Summer", ar: "صيف قطبي واحد" },
      summary: {
        en: "Land, dig, analyse, watch the weather, and finish before the light goes.",
        ar: "الهبوط والحفر والتحليل ومراقبة الطقس والانتهاء قبل ذهاب الضوء.",
      },
      narrative: {
        en: [
          "Phoenix launched on 4 August 2007 and landed on 25 May 2008. It used a heat shield, a parachute and retro-rockets to slow down, then settled on three legs in the northern plain. It began sending images within hours.",
          "The first digging attempts were difficult. The soil was stickier than expected and the scoop sometimes failed to release its sample. The team learned how to shake the arm and how to dig in a way that worked, and eventually Phoenix dug a series of trenches.",
          "Inside the trenches, the arm exposed a bright, hard layer a few centimetres below the surface. It was water ice. The lander's instruments then analysed soil from above the ice and measured the chemistry of the site.",
        ],
        ar: [
          "انطلقت فينكس في 4 أغسطس 2007 وهبطت في 25 مايو 2008. واستخدمت درعاً حرارياً ومظلة وصواريخ كبح للتباطؤ، ثم استقرت على ثلاث أرجل في السهل الشمالي. وبدأت إرسال الصور في ساعات.",
          "كانت محاولات الحفر الأولى صعبة. فكانت التربة أكثر لزوجة مما كان متوقعاً، وكانت المغرفة أحياناً تفشل في إطلاق عينتها. وتعلّم الفريق كيف يهزّ الذراع وكيف يحفر بطريقة تنجح، حتى حفرت فينكس سلسلة خنادق.",
          "داخل الخنادق، كشفت الذراع طبقة ساطعة صلبة على عمق سنتيمترات قليلة تحت السطح. كان ذلك جليد ماء. ثم حللت أجهزة المركبة تربة من فوق الجليد وقاست كيمياء الموقع.",
        ],
      },
      echo: {
        en: "The ice was not at the bottom of a crater. It was under the first few centimetres of soil.",
        ar: "لم يكن الجليد في قاع فوهة، بل تحت السنتيمترات الأولى من التربة.",
      },
      glossary: [
        {
          id: "water-ice",
          term: { en: "Water ice", ar: "جليد الماء" },
          simple: {
            en: "Frozen water — the same ice as on Earth, kept frozen by the cold, thin Martian air.",
            ar: "ماء متجمد — الجليد نفسه كجليد الأرض، يحفظه الجو المريخي البارد الرقيق متجمّداً.",
          },
          technical: {
            en: "At high Martian latitudes water ice is stable just below the surface all year round.",
            ar: "عند خطوط العرض المريخية المرتفعة يكون جليد الماء مستقراً تحت السطح مباشرة طوال العام.",
          },
        },
        {
          id: "sublimation",
          term: { en: "Sublimation", ar: "التصعيد" },
          simple: {
            en: "When ice turns straight into gas without melting into liquid first.",
            ar: "حين يتحول الجليد إلى غاز مباشرة دون أن يذوب أولاً إلى سائل.",
          },
        },
        {
          id: "perchlorate",
          term: { en: "Perchlorate salt", ar: "ملح البيركلورات" },
          simple: {
            en: "A kind of salt found in the Martian soil. Some microbes on Earth can use it, but it is harsh chemistry for living cells.",
            ar: "نوع من الأملاح وُجد في تربة المريخ. تستطيع بعض الكائنات الدقيقة على الأرض استخدامه، لكنه كيمياء قاسية على الخلايا الحية.",
          },
        },
      ],
    },
    {
      id: "journey",
      kind: "journey",
      eyebrow: { en: "Chapter three", ar: "الفصل الثالث" },
      title: { en: "The Journey North", ar: "الرحلة إلى الشمال" },
      summary: {
        en: "More than nine months of coasting, minutes of falling, and a landing in the Martian arctic.",
        ar: "أكثر من تسعة أشهر من الانتقال، ودقائق من السقوط، وهبوط في القطب المريخي.",
      },
      narrative: {
        en: [
          "Phoenix launched on 4 August 2007 from Cape Canaveral on a Delta II rocket, folded inside a protective shell. It then coasted for more than nine months across hundreds of millions of kilometres, keeping itself warm and correctly pointed with nobody out there to help it.",
          "The landing on 25 May 2008 followed the sequence a lander must survive alone: a heat shield, then a parachute, then retro-rockets firing on their own decisions. There was no joystick and no time for instructions from Earth; the spacecraft judged its own altitude and speed, and settled on three legs in a shallow depression the team called Green Valley.",
          "It was the first landing in the Martian polar region. Within hours Phoenix was sending pictures of the ground it was standing on. The arm was tested, the first trenches were cut, and a lander built from hardware designed for an earlier programme proved that spare parts can still make history.",
          "From the first day the Sun was already sinking. Phoenix had one arctic summer — about five months of usable light — to dig, analyse and watch the weather before the winter it was never built to survive.",
        ],
        ar: [
          "أُطلقت فينكس في 4 أغسطس 2007 من كيب كانافيرال على صاروخ دلتا 2، مطوية داخل غلاف واقٍ. ثم انتقلت أكثر من تسعة أشهر عبر مئات الملايين من الكيلومترات، تُبقي نفسها دافئة وموجّهة على الاتجاه الصحيح من دون أن يساعدها أحد هناك.",
          "تبع الهبوط في 25 مايو 2008 التسلسل الذي يجب أن تنجو منه مركبة الهبوط وحدها: درع حراري، ثم مظلة، ثم صواريخ كبح تشتعل وفق قراراتها هي. لم تكن هناك عصا قياد، ولا وقت للتعليمات من الأرض؛ بل حكمت المركبة على ارتفاعها وسرعتها بنفسها، واستقرت على ثلاث أرجل في منخفض ضحل أطلق الفريق عليه اسم «الوادي الأخضر».",
          "كانت تلك أول هبوط في المنطقة القطبية للمريخ. وخلال ساعات كانت فينكس ترسل صوراً للأرض التي تقف عليها. وجرى اختبار الذراع، وحُفرت أولى الخنادق، وأثبتت مركبة هبوط بُنيت من عتاد صُمم لبرنامج سابق أن قطع الغيار قد تصنع تاريخاً.",
          "ومنذ اليوم الأول كانت الشمس تنخفض أصلاً. كان أمام فينكس صيف قطبي واحد — نحو خمسة أشهر من الضوء الصالح — لتحكم وتُحلل وترصد الطقس، قبل شتاء لم تُصنع لتجتازه.",
        ],
      },
      echo: {
        en: "More than nine months of coasting, then a landing that nobody watched in real time. Mars is patient that way.",
        ar: "أكثر من تسعة أشهر من الانتقال، ثم هبوط لم يره أحد في لحظته. المريخ صبور على هذا النحو.",
      },
      timeline: [
        {
          id: "phx-launch",
          date: "2007-08-04",
          dateLabel: { en: "4 August 2007", ar: "4 أغسطس 2007" },
          label: { en: "Launch", ar: "الإطلاق" },
          description: {
            en: "Phoenix launched on a Delta II rocket from Cape Canaveral.",
            ar: "انطلقت فينكس على صاروخ دلتا 2 من كيب كانافيرال.",
          },
          type: "launch",
          sourceIds: ["SRC-PHOENIX", "SRC-NSSDCA-PHOENIX"],
        },
        {
          id: "phx-landing",
          date: "2008-05-25",
          dateLabel: { en: "25 May 2008", ar: "25 مايو 2008" },
          label: { en: "Landing in the arctic", ar: "الهبوط في القطب الشمالي" },
          description: {
            en: "Phoenix touched down at Vastitas Borealis and began its surface mission.",
            ar: "لمست فينكس السطح في فاستيتاس بورياليس وبدأت مهمتها السطحية.",
          },
          type: "landing",
          sourceIds: ["SRC-PHOENIX", "SRC-NSSDCA-PHOENIX"],
        },
        {
          id: "phx-ice",
          date: "2008-06-19",
          dateLabel: { en: "June 2008", ar: "يونيو 2008" },
          label: { en: "Water ice exposed", ar: "كشف جليد الماء" },
          description: {
            en: "Digging exposed a bright layer that was confirmed as water ice.",
            ar: "كشف الحفر عن طبقة ساطعة تأكد أنها جليد ماء.",
          },
          type: "milestone",
          sourceIds: ["SRC-PHOENIX"],
        },
        {
          id: "phx-snow",
          date: "2008-09-29",
          dateLabel: { en: "September 2008", ar: "سبتمبر 2008" },
          label: { en: "Snow above the lander", ar: "ثلج فوق المركبة" },
          description: {
            en: "A laser instrument detected snow falling from clouds high above the landing site.",
            ar: "كشف جهاز ليزر سقوط ثلج من سحب عالية فوق موقع الهبوط.",
          },
          type: "milestone",
          sourceIds: ["SRC-PHOENIX"],
        },
        {
          id: "phx-last",
          date: "2008-11-02",
          dateLabel: { en: "2 November 2008", ar: "2 نوفمبر 2008" },
          label: { en: "Last contact", ar: "آخر اتصال" },
          description: {
            en: "With the Sun low and dust on the panels, Phoenix lost power and stopped communicating.",
            ar: "مع انخفاض الشمس والغبار على الألواح، فقدت فينكس طاقتها وتوقفت عن التواصل.",
          },
          type: "last-contact",
          sourceIds: ["SRC-PHOENIX", "SRC-NSSDCA-PHOENIX"],
        },
      ],
      diagram: {
        kind: "journey-map",
        title: { en: "The route to the Martian arctic", ar: "الطريق إلى القطب المريخي" },
        intro: {
          en: "From a launch pad in Florida to a trench in the arctic soil.",
          ar: "من منصة إطلاق في فلوريدا إلى خندق في التربة القطبية.",
        },
        route: [
          {
            label: { en: "Launch", ar: "الإطلاق" },
            description: { en: "Cape Canaveral, 4 August 2007", ar: "كيب كانافيرال، 4 أغسطس 2007" },
          },
          {
            label: { en: "Cruise", ar: "الرحلة البينية" },
            description: {
              en: "More than nine months across interplanetary space",
              ar: "أكثر من تسعة أشهر عبر الفضاء بين الكواكب",
            },
          },
          {
            label: { en: "Entry", ar: "الدخول" },
            description: {
              en: "Heat shield, parachute and retro-rockets",
              ar: "درع حراري ومظلة وصواريخ كبح",
            },
          },
          {
            label: { en: "Landing", ar: "الهبوط" },
            description: {
              en: "Vastitas Borealis, 25 May 2008",
              ar: "فاستيتاس بورياليس، 25 مايو 2008",
            },
          },
          {
            label: { en: "The digging", ar: "الحفر في التربة" },
            description: {
              en: "Trenches in the soil during one arctic summer",
              ar: "خنادق في التربة خلال صيف قطبي واحد",
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
              en: "Launch on a Delta II on 4 August 2007.",
              ar: "الإطلاق على صاروخ دلتا 2 في 4 أغسطس 2007.",
            },
          },
          {
            id: "mars",
            x: 82,
            y: 28,
            label: { en: "Mars", ar: "المريخ" },
            detail: {
              en: "Arrival and landing on 25 May 2008.",
              ar: "الوصول والهبوط في 25 مايو 2008.",
            },
          },
          {
            id: "green-valley",
            x: 66,
            y: 66,
            label: { en: "Green Valley", ar: "الوادي الأخضر" },
            detail: {
              en: "The landing site in Vastitas Borealis — the first ever in the Martian polar region.",
              ar: "موقع الهبوط في فاستيتاس بورياليس — أول موقع في المنطقة القطبية للمريخ على الإطلاق.",
            },
          },
          {
            id: "trenches",
            x: 88,
            y: 82,
            label: { en: "The trenches", ar: "الخنادق" },
            detail: {
              en: "Where the arm exposed water ice a few centimetres below the surface.",
              ar: "حيث كشفت الذراع جليد الماء على عمق سنتيمترات قليلة تحت السطح.",
            },
          },
        ],
      },
    },
    {
      id: "discoveries",
      kind: "discoveries",
      eyebrow: { en: "Chapter four", ar: "الفصل الرابع" },
      title: { en: "What the Ice Revealed", ar: "ما الذي كشفه الجليد" },
      summary: {
        en: "Water ice under the soil, a strange salt chemistry, and snow in the Martian sky.",
        ar: "جليد ماء تحت التربة وكيمياء أملاح غريبة وثلج في سماء المريخ.",
      },
      narrative: {
        en: [
          "Phoenix's greatest result was simple and direct: it touched water ice on Mars. The bright layer in the trench was not a mineral or a trick of the light. It was frozen water, and it was only a few centimetres down.",
          "The soil analysis added a surprise. Phoenix found perchlorate salts in the Martian soil. These salts can lower the freezing point of water and can be used by some micro-organisms on Earth, but they are also harsh chemicals. Their presence changed how scientists thought about the habitability of the surface.",
          "The weather instruments also detected snow falling from high clouds. It did not reach the ground before evaporating, but it showed that the Martian water cycle is active today.",
        ],
        ar: [
          "كانت أعظم نتيجة لفينكس بسيطة ومباشرة: لقد لمست جليد ماء على المريخ. فالطبقة الساطعة في الخندق لم تكن معدناً ولا خدعة ضوء، بل ماءً متجمداً على عمق سنتيمترات قليلة فقط.",
          "وأضاف تحليل التربة مفاجأة. فقد وجدت فينكس أملاح بيركلورات في تربة المريخ. وهذه الأملاح قد تخفض درجة تجمد الماء وقد تستخدمها بعض الكائنات الدقيقة على الأرض، لكنها أيضاً مواد كيميائية قاسية. وقد غيّر وجودها طريقة تفكير العلماء في قابلية سطح المريخ للحياة.",
          "ورصدت أجهزة الطقس أيضاً سقوط ثلج من سحب عالية. ولم يصل إلى الأرض قبل أن يتبخر، لكنه أظهر أن دورة الماء على المريخ نشطة اليوم.",
        ],
      },
      echo: {
        en: "The ice was a resource and a puzzle at the same time.",
        ar: "كان الجليد مورداً ولغزاً في الوقت نفسه.",
      },
      discoveries: [
        {
          id: "phx-d1",
          title: { en: "Water ice is close to the surface", ar: "جليد الماء قريب من السطح" },
          question: {
            en: "Is there water ice within reach of a lander in the Martian arctic?",
            ar: "هل يوجد جليد ماء في متناول مركبة هبوط في القطب الشمالي للمريخ؟",
          },
          instrument: {
            en: "Phoenix robotic arm, cameras and thermal analyser",
            ar: "ذراع فينكس الآلية وكاميراتها والمحلل الحراري",
          },
          method: {
            en: "The arm dug trenches and the cameras watched the exposed material for several days to see whether it changed.",
            ar: "حفرت الذراع خنادق وراقبت الكاميرات المادة المكشوفة عدة أيام لترى هل تتغير.",
          },
          data: {
            en: "A bright layer appeared a few centimetres below the surface. Some of it sublimated over time, which is what ice does in the Martian atmosphere.",
            ar: "ظهرت طبقة ساطعة على عمق سنتيمترات قليلة تحت السطح، وتصعّد بعضها مع الوقت، وهو ما يفعله الجليد في غلاف المريخ الجوي.",
          },
          finding: {
            en: "The bright material was water ice, and it lay just below the surface across the landing site.",
            ar: "كانت المادة الساطعة جليد ماء، وكانت تقع تحت السطح مباشرة في أنحاء موقع الهبوط.",
          },
          significance: {
            en: "It confirmed orbital predictions and showed that a future mission could reach water ice with a shovel, not a deep drill.",
            ar: "أكّد ذلك تنبؤات المدار وأظهر أن مهمة مستقبلية تستطيع الوصول إلى جليد الماء بمجرفة، لا بمثقاب عميق.",
          },
          sourceIds: ["SRC-PHOENIX", "SRC-NSSDCA-PHOENIX"],
        },
        {
          id: "phx-d2",
          title: { en: "A salty, oxidising soil", ar: "تربة مالحة ومؤكسدة" },
          question: {
            en: "What is in the Martian soil that could affect life?",
            ar: "ماذا في تربة المريخ مما قد يؤثر في الحياة؟",
          },
          instrument: {
            en: "Wet-chemistry laboratory and thermal analyser",
            ar: "مختبر الكيمياء الرطبة والمحلل الحراري",
          },
          method: {
            en: "Soil samples were dissolved in water and heated, and the resulting solutions and gases were measured.",
            ar: "أُذيبت عينات التربة في الماء وسُخّنت، وقِيست المحاليل والغازات الناتجة.",
          },
          data: {
            en: "The soil contained perchlorate salts and was chemically reactive, with a pH close to neutral.",
            ar: "احتوت التربة أملاح بيركلورات وكانت نشطة كيميائياً، مع حموضة قريبة من التعادل.",
          },
          finding: {
            en: "Perchlorates can keep water liquid at lower temperatures but are also strong oxidisers that can damage organic molecules.",
            ar: "تستطيع البيركلورات إبقاء الماء سائلاً في درجات حرارة أقل، لكنها أيضاً مؤكسدات قوية قد تتلف الجزيئات العضوية.",
          },
          significance: {
            en: "The result made the surface look less habitable but made the subsurface, where the ice is, more interesting.",
            ar: "جعلت النتيجة السطح أقل قابلية للحياة، لكنها زادت أهمية ما تحت السطح حيث يوجد الجليد.",
          },
          sourceIds: ["SRC-PHOENIX", "SRC-NSSDCA-PHOENIX"],
        },
      ],
    },
    {
      id: "ending",
      kind: "ending",
      eyebrow: { en: "Chapter five", ar: "الفصل الخامس" },
      title: { en: "The Winter It Could Not Survive", ar: "الشتاء الذي لم تستطع نجاتَه" },
      summary: {
        en: "Phoenix was designed for one summer. The winter arrived, and the lander went quiet.",
        ar: "صُممت فينكس لصيف واحد. فجاء الشتاء وصمتت المركبة.",
      },
      narrative: {
        en: [
          "As the Martian summer ended, the Sun moved lower in the sky and the dust on Phoenix's panels thickened. The lander produced less power each day. The team shut down instruments one by one to keep the essential systems alive.",
          "The last communication came on 2 November 2008. NASA tried to listen again in the following Martian spring, but no signal came. The lander may have been buried or damaged by the cold and the ice, but its exact condition was never confirmed.",
          "Phoenix's site is still in the arctic plain. It is a small, silent machine in a place where the ground is full of frozen water. Its mission lasted only five months, but it answered a question that had been open for decades.",
        ],
        ar: [
          "مع انتهاء صيف المريخ، انخفضت الشمس في السماء وازداد الغبار على ألواح فينكس. وكانت المركبة تنتج طاقة أقل كل يوم. فأوقف الفريق الأجهزة واحداً بعد الآخر لإبقاء الأنظمة الضرورية حية.",
          "وصل آخر اتصال في 2 نوفمبر 2008. وحاولت ناسا الاستماع مرة أخرى في الربيع المريخي التالي، لكن لم تصل أي إشارة. وربما دُفنت المركبة أو تضررت من البرد والجليد، لكن حالتها الدقيقة لم تتأكد قط.",
          "وما زال موقع فينكس في السهل القطبي. إنها آلة صغيرة صامتة في مكان تمتلئ أرضه بماء متجمد. وقد استمرت مهمتها خمسة أشهر فقط، لكنها أجابت عن سؤال بقي مفتوحاً عقوداً.",
        ],
      },
      echo: {
        en: "Five months was enough. The ice had been waiting for a very long time.",
        ar: "كانت خمسة أشهر كافية. فالجليد كان ينتظر وقتاً طويلاً جداً.",
      },
      facts: [
        {
          label: { en: "Final location", ar: "الموقع الأخير" },
          value: { en: "Vastitas Borealis, Mars", ar: "فاستيتاس بورياليس، المريخ" },
        },
        {
          label: { en: "Last contact", ar: "آخر اتصال" },
          value: { en: "2 November 2008", ar: "2 نوفمبر 2008" },
        },
        {
          label: { en: "Mission length", ar: "مدة المهمة" },
          value: { en: "About five months on the surface", ar: "نحو خمسة أشهر على السطح" },
        },
        {
          label: { en: "Confirmed", ar: "أكّدت" },
          value: { en: "Water ice beneath the soil", ar: "جليد ماء تحت التربة" },
        },
      ],
    },
    {
      id: "legacy",
      kind: "legacy",
      eyebrow: { en: "Chapter six", ar: "الفصل السادس" },
      title: { en: "Water Within Reach", ar: "الماء في المتناول" },
      summary: {
        en: "A question closed with a scoop, and the plan for every mission that followed.",
        ar: "سؤال أُغلق بمغرفة، وخطّة كل مهمة جاءت بعدها.",
      },
      narrative: {
        en: [
          "Phoenix did something simple that changed the planning of every later Mars mission: it put a scoop into the Martian arctic and showed that water ice is not a theory read from orbit but a layer a shovel can hit.",
          "The perchlorate result mattered just as much. The same salts that can keep water from freezing are harsh oxidisers, so the surface became less friendly to life even as the ice beneath it became more interesting.",
          "The lander itself never moved again. Phoenix sits in Vastitas Borealis where it landed, its panels thick with dust, its arm still over the last trench it dug. In the polar winter it rests in months of darkness and cold, likely under frost, close to the very material it came to study.",
          "That is the quiet shape of this story. It went north to find frozen water, and in the end it joined it.",
        ],
        ar: [
          "فعلت فينكس شيئاً بسيطاً غيّر تخطيط كل مهمة مريخية لاحقة: وضعت مغرفة في القطب المريخي، وأظهرت أن جليد الماء ليس نظرية تُقرأ من المدار، بل طبقة تصيبها المجرفة.",
          "وكانت نتيجة البيركلورات لا تقل أهمية. فالأملاح نفسها التي تمنع الماء من التجمد مؤكسدات قاسية، فصار السطح أقل ملاءمة للحياة، حتى وهي تزداد أهمية ما تحته من جليد.",
          "أما المركبة نفسها فلم تعد تتحرك. تستقر فينكس في فاستيتاس بورياليس حيث هبطت، ألواحها مثقلة بالغبار، وذراعها ما تزال فوق آخر خندق حفرته. وفي الشتاء القطبي ترقد في أشهر من الظلام والبرد، وتحتها على الأرجح صقيع، قرب المادة نفسها التي جاءت لدراستها.",
          "هذا هو الشكل الهادئ لهذه الحكاية. ذهبت شمالاً لتبحث عن ماء متجمد، فانضمت إليه في النهاية.",
        ],
      },
      echo: {
        en: "Phoenix was the first machine to touch Martian water ice and know what it was touching. Every mission that lands near ice today is following its trench.",
        ar: "كانت فينكس أول آلة تلمس جليد الماء على المريخ وتعرف ما تلمسه. وكل مهمة تهبط قرب الجليد اليوم تتبع خندقها.",
      },
      facts: [
        {
          label: { en: "Confirmed", ar: "ما أكّدته" },
          value: {
            en: "Water ice a few centimetres below the arctic soil",
            ar: "جليد ماء على عمق سنتيمترات قليلة تحت التربة القطبية",
          },
        },
        {
          label: { en: "First polar landing", ar: "أول هبوط قطبي" },
          value: { en: "25 May 2008, Vastitas Borealis", ar: "25 مايو 2008، فاستيتاس بورياليس" },
        },
        {
          label: { en: "Where it rests", ar: "أين تستقر" },
          value: {
            en: "In the Martian arctic, silent since 2 November 2008",
            ar: "في القطب الشمالي للمريخ، صامتة منذ 2 نوفمبر 2008",
          },
        },
      ],
    },
  ],
  legacyStatement: {
    en: "Phoenix proved that the water future explorers will need is lying just under the Martian topsoil.",
    ar: "أثبتت فينكس أن الماء الذي سيحتاجه المستكشفون مستقبلاً يكمن تحت طبقة سطح المريخ مباشرة.",
  },
  tags: ["mars", "lander", "remnant"],
  artifactId: "phoenix",
  sourceIds: ["SRC-PHOENIX", "SRC-NSSDCA-PHOENIX"],
  relatedStorySlugs: ["insight", "viking-2-lander"],
  echoIntro: {
    en: "This lander did not travel far, but it dug into the ground and found the thing everyone was looking for.",
    ar: "لم تسافر هذه المركبة بعيداً، لكنها حفرت في الأرض ووجدت الشيء الذي كان الجميع يبحث عنه.",
  },
  echoSignoff: {
    en: "Phoenix is still in the arctic, under a sky that has been dark for months.",
    ar: "ما زالت فينكس في القطب، تحت سماء أظلمت شهوراً.",
  },
  lastVerified: "2026-11-14",
};
