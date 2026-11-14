import type { EchoStory } from "@/types/echo";
import { echoImage } from "./media";

/**
 * INSIGHT — the lander that listened to Mars instead of looking at it.
 *
 * Sources: the NASA InSight mission page and the NSSDCA InSight record.
 */
export const insightStory: EchoStory = {
  id: "insight",
  slug: "insight",
  title: {
    en: "InSight",
    ar: "إنسايت",
  },
  storyTitle: {
    en: "Listening to Mars",
    ar: "الاستماع إلى المريخ",
  },
  dek: {
    en: "A lander that barely moved, and yet travelled deeper than any rover: it used marsquakes to map the inside of a planet.",
    ar: "مركبة بالكاد تحركت، ومع ذلك توغلت أعمق من أي عربة: فقد استخدمت زلازل المريخ لرسم داخل كوكب.",
  },
  summary: {
    en: "InSight landed at Elysium Planitia on 26 November 2018. Instead of studying the surface, it listened for vibrations travelling through the planet. Its seismometer detected more than 1,300 marsquakes, and those signals revealed the thickness of the crust, the structure of the mantle and the size of the core. Dust slowly covered its solar panels, and the lander fell silent on 15 December 2022.",
    ar: "هبطت إنسايت في إليسيوم بلانيتيا في 26 نوفمبر 2018. وبدل دراسة السطح، استمعت إلى اهتزازات تنتقل عبر الكوكب. وقد كشف مقياس الزلازل فيها أكثر من 1,300 زلزال مريخي، وأظهرت تلك الإشارات سماكة القشرة وبنية الوشاح وحجم اللب. ثم غطى الغبار ألواحها الشمسية ببطء، فصمتت المركبة في 15 ديسمبر 2022.",
  },
  location: {
    en: "Elysium Planitia, Mars",
    ar: "إليسيوم بلانيتيا، المريخ",
  },
  locationNote: {
    en: "Elysium Planitia is a broad, flat plain near the Martian equator. Its quiet geology made it a good place to listen for distant quakes.",
    ar: "إليسيوم بلانيتيا سهل واسع ومستوٍ قرب خط استواء المريخ. وقد جعلته جيولوجيته الهادئة مكاناً جيداً للاستماع إلى زلازل بعيدة.",
  },
  equipmentType: {
    en: "Geophysics lander",
    ar: "مركبة هبوط جيوفيزيائية",
  },
  missionPeriod: {
    en: "Launch 5 May 2018 · Landing 26 November 2018 · Last contact 15 December 2022",
    ar: "الإطلاق 5 مايو 2018 · الهبوط 26 نوفمبر 2018 · آخر اتصال 15 ديسمبر 2022",
  },
  missionStatus: {
    en: "Mission complete — NASA ended the mission in December 2022 after dust cut the lander's power.",
    ar: "اكتملت المهمة — أنهت ناسا المهمة في ديسمبر 2022 بعد أن قلّ الغبار من طاقة المركبة.",
  },
  hardwareStatus: {
    en: "Inactive — InSight remains at Elysium Planitia.",
    ar: "غير نشطة — ما زالت إنسايت في إليسيوم بلانيتيا.",
  },
  statusKind: "silent",
  accent: "#D98C5F",
  accentSoft: "#F6DFD1",
  badge: {
    en: "Planet Listener",
    ar: "مستمع الكوكب",
  },
  badgeKey: "planet-listener",
  hero: echoImage("PIA22228", {
    alt: {
      en: "An artist's rendering of the InSight lander operating on the surface of Mars with its instruments deployed.",
      ar: "تصور فني لمركبة إنسايت تعمل على سطح المريخ وأجهزتها منشورة.",
    },
    caption: {
      en: "An artist's concept of InSight on Mars. The real lander placed a seismometer on the ground and listened for vibrations from inside the planet.",
      ar: "تصور فني لإنسايت على المريخ. وضعت المركبة الحقيقية مقياس زلازل على الأرض واستمعت إلى اهتزازات من داخل الكوكب.",
    },
  }),
  gallery: [
    echoImage("PIA24761", {
      alt: {
        en: "A seismogram recorded by InSight showing the signal of a marsquake.",
        ar: "مخطط زلزالي سجلته إنسايت يظهر إشارة زلزال مريخي.",
      },
      caption: {
        en: "A marsquake recorded by InSight in July 2019. Each wiggle carries information about the material the vibration passed through.",
        ar: "زلزال مريخي سجلته إنسايت في يوليو 2019. كل تذبذب يحمل معلومات عن المادة التي مر بها الاهتزاز.",
      },
    }),
    echoImage("PIA22571", {
      alt: {
        en: "An illustration of the InSight lander with its solar arrays deployed.",
        ar: "رسم توضيحي لمركبة إنسايت وألواحها الشمسية مفتوحة.",
      },
      caption: {
        en: "InSight's solar arrays gave the lander power, but dust slowly reduced their output over four years.",
        ar: "منحت الألواح الشمسية إنسايت طاقتها، لكن الغبار قلل إنتاجها ببطء على مدى أربع سنوات.",
      },
    }),
    echoImage("PIA25680", {
      alt: {
        en: "One of the last images from InSight, showing its seismometer on the Martian surface.",
        ar: "إحدى آخر صور إنسايت، وتظهر مقياس الزلازل على سطح المريخ.",
      },
      caption: {
        en: "One of InSight's final images, taken in December 2022. The seismometer is still on the surface, waiting for a signal that will not come.",
        ar: "إحدى صور إنسايت الأخيرة، التُقطت في ديسمبر 2022. ما زال مقياس الزلازل على السطح ينتظر إشارة لن تأتي.",
      },
    }),
  ],
  facts: [
    {
      label: { en: "Mass", ar: "الكتلة" },
      value: { en: "About 358 kg", ar: "نحو 358 كغ" },
    },
    {
      label: { en: "Width with arrays", ar: "العرض عند فتح الألواح" },
      value: { en: "About 6 m", ar: "نحو 6 م" },
    },
    {
      label: { en: "Power", ar: "الطاقة" },
      value: { en: "Solar arrays", ar: "ألواح شمسية" },
    },
    {
      label: { en: "Key instruments", ar: "الأجهزة الرئيسية" },
      value: {
        en: "SEIS seismometer, HP3 heat-flow probe and RISE radio science",
        ar: "مقياس زلازل ومجس تدفق حراري وتجربة علوم راديوية",
      },
    },
    {
      label: { en: "Marsquakes detected", ar: "الزلازل المريخية المكتشفة" },
      value: { en: "More than 1,300", ar: "أكثر من 1,300" },
    },
    {
      label: { en: "Last contact", ar: "آخر اتصال" },
      value: { en: "15 December 2022", ar: "15 ديسمبر 2022" },
    },
  ],
  chapters: [
    {
      id: "meet",
      kind: "meet",
      eyebrow: { en: "Chapter one", ar: "الفصل الأول" },
      title: { en: "Meet the Stethoscope", ar: "تعرّف على السماعة الطبية" },
      summary: {
        en: "A lander with a seismometer, built to feel the heartbeat of a planet.",
        ar: "مركبة هبوط بمقياس زلازل، صُنعت لتشعر بنبض كوكب.",
      },
      narrative: {
        en: [
          "Every planet has an interior, and almost everything we know about the inside of Mars comes from a small number of instruments. InSight was built to add a new kind of data: the vibration of the ground.",
          "Its main instrument was a seismometer called SEIS, a sensitive package that had to be placed directly on the Martian surface. A robot arm lifted it off the lander's deck and set it down, then covered it with a wind shield to reduce noise.",
          "InSight also carried a heat-flow probe designed to hammer itself into the ground, and a radio experiment that could measure tiny changes in the planet's rotation. Together they were meant to give Mars its first thorough check-up since it formed.",
        ],
        ar: [
          "لكل كوكب داخل، وكل ما نعرفه تقريباً عن داخل المريخ يأتي من عدد قليل من الأجهزة. وقد صُنعت إنسايت لتضيف نوعاً جديداً من البيانات: اهتزاز الأرض.",
          "كان جهازها الرئيسي مقياس زلازل يُسمى «سايس»، وهو حزمة حساسة كان لا بد من وضعها مباشرة على سطح المريخ. رفعته ذراع آلية عن سطح المركبة وأنزلته، ثم غطته بدرع رياح لتقليل الضجيج.",
          "وحملت إنسايت أيضاً مجس تدفق حراري صُمم ليدق نفسه في الأرض، وتجربة راديوية تستطيع قياس تغيرات دقيقة في دوران الكوكب. وكان المقصود من ذلك كله أن يحصل المريخ على أول فحص شامل له منذ تشكله.",
        ],
      },
      echo: {
        en: "A rover looks around. InSight put its ear to the ground.",
        ar: "العربة تنظر حولها. أما إنسايت فقد وضعت أذنها على الأرض.",
      },
      facts: [
        {
          label: { en: "Main instrument", ar: "الجهاز الرئيسي" },
          value: { en: "SEIS seismometer", ar: "مقياس الزلازل سايس" },
        },
        {
          label: { en: "Deployment", ar: "النشر" },
          value: {
            en: "Placed on the ground by a robotic arm.",
            ar: "وُضع على الأرض بذراع آلية.",
          },
        },
        {
          label: { en: "Goal", ar: "الهدف" },
          value: {
            en: "Map the crust, mantle and core.",
            ar: "رسم القشرة والوشاح واللب.",
          },
        },
      ],
      diagram: {
        kind: "lander-components",
        title: { en: "The InSight lander", ar: "مركبة هبوط إنسايت" },
        intro: {
          en: "Select a marker to see what that part of the lander did.",
          ar: "اختر أي علامة لترى وظيفة ذلك الجزء من مركبة الهبوط.",
        },
        points: [
          {
            id: "seismometer",
            x: 36,
            y: 30,
            label: { en: "Seismometer", ar: "مقياس الزلازل" },
            detail: {
              en: "A sensitive package placed directly on the ground to feel vibrations from marsquakes and meteorite impacts.",
              ar: "حزمة حساسة وُضعت مباشرة على الأرض لتشعر بالاهتزازات الناتجة عن الزلازل المريخية واصطدامات النيازك.",
            },
          },
          {
            id: "heat-probe",
            x: 64,
            y: 22,
            label: { en: "Heat-flow probe", ar: "مجس التدفق الحراري" },
            detail: {
              en: "Designed to hammer itself into the soil and measure how much heat flows out of the planet from below.",
              ar: "صُمم ليدق نفسه في التربة ويقيس مقدار الحرارة المتدفقة من باطن الكوكب.",
            },
          },
          {
            id: "solar",
            x: 22,
            y: 60,
            label: { en: "Solar arrays", ar: "الألواح الشمسية" },
            detail: {
              en: "Two wide wings that powered the lander for four years, until dust slowly covered them.",
              ar: "جناحان واسعان مدا المركبة بالطاقة أربع سنوات، حتى غطاهما الغبار ببطء.",
            },
          },
          {
            id: "arm",
            x: 72,
            y: 62,
            label: { en: "Robotic arm", ar: "الذراع الآلية" },
            detail: {
              en: "Lifted the seismometer off the deck and set it on the surface with a watchmaker's care.",
              ar: "رفعت مقياس الزلازل عن سطح المركبة ووضعته على الأرض بعناية صانع الساعات.",
            },
          },
        ],
      },
      quiz: [
        {
          id: "ins-q1",
          prompt: {
            en: "What did InSight mainly measure?",
            ar: "ما الذي قاسته إنسايت أساساً؟",
          },
          options: [
            {
              id: "a",
              label: {
                en: "Vibrations travelling through the planet.",
                ar: "اهتزازات تنتقل عبر الكوكب.",
              },
            },
            {
              id: "b",
              label: {
                en: "The colour of the Martian sky.",
                ar: "لون سماء المريخ.",
              },
            },
            {
              id: "c",
              label: {
                en: "The distance to the Sun.",
                ar: "المسافة إلى الشمس.",
              },
            },
          ],
          correctOptionId: "a",
          explanation: {
            en: "InSight was a geophysics mission. Its seismometer recorded vibrations from marsquakes and impacts, which revealed the planet's internal structure.",
            ar: "كانت إنسايت مهمة جيوفيزيائية. سجل مقياس زلازلها اهتزازات من زلازل المريخ والاصطدامات، فكشفت بنية الكوكب الداخلية.",
          },
        },
      ],
    },
    {
      id: "mission",
      kind: "mission",
      eyebrow: { en: "Chapter two", ar: "الفصل الثاني" },
      title: { en: "Four Years of Listening", ar: "أربع سنوات من الاستماع" },
      summary: {
        en: "Landing, deploying a delicate instrument, and waiting for the ground to move.",
        ar: "الهبوط ونشر جهاز حساس وانتظار اهتزاز الأرض.",
      },
      narrative: {
        en: [
          "InSight launched on 5 May 2018 and landed on 26 November. The landing was difficult: the spacecraft had to slow down in a thin atmosphere and touch down on a plain without hitting a rock. It succeeded, and the first images showed a flat, dusty site.",
          "Deploying the seismometer took weeks. The arm had to lift it, place it precisely and then retreat so that the instrument was not disturbed. The team then added a cover to protect it from wind and temperature changes.",
          "The heat-flow probe ran into trouble. It was designed to hammer itself several metres into the soil, but the ground behaved differently than expected and the probe could not get deep enough. The team tried several fixes, and the attempt itself produced useful information about the soil.",
        ],
        ar: [
          "انطلقت إنسايت في 5 مايو 2018 وهبطت في 26 نوفمبر. وكان الهبوط صعباً: إذ كان على المركبة أن تتباطأ في غلاف جوي رقيق وأن تلمس السطح في سهل دون أن تصطدم بصخرة. وقد نجحت، وأظهرت الصور الأولى موقعاً مستوياً مغبراً.",
          "استغرق نشر مقياس الزلازل أسابيع. كان على الذراع رفعه ووضعه بدقة ثم التراجع كي لا يُزعج الجهاز. ثم أضاف الفريق غطاءً لحمايته من الرياح وتغيرات الحرارة.",
          "وواجه مجس التدفق الحراري مشكلة. فقد صُمم ليدق نفسه عدة أمتار في التربة، لكن الأرض تصرفت بشكل مختلف عن المتوقع ولم يستطع المجس التوغل بما يكفي. وجرّب الفريق عدة حلول، وأنتجت المحاولة نفسها معلومات مفيدة عن التربة.",
        ],
      },
      echo: {
        en: "The most important data arrived when nothing was happening — and then, suddenly, something did.",
        ar: "وصلت أهم البيانات حين لم يكن يحدث شيء — ثم حدث شيء فجأة.",
      },
      glossary: [
        {
          id: "seismometer",
          term: { en: "Seismometer", ar: "مقياس الزلازل" },
          simple: {
            en: "An instrument that measures how the ground moves, even when the movement is too small for a person to feel.",
            ar: "جهاز يقيس حركة الأرض، حتى حين يكون الاهتزاز أصغر من أن تشعر به إنسان.",
          },
          technical: {
            en: "SEIS measures ground acceleration and displacement across a wide range of frequencies.",
            ar: "يقيس جهاز SEIS تسارع الأرض وإزاحتها عبر مدى واسع من الترددات.",
          },
        },
        {
          id: "marsquake",
          term: { en: "Marsquake", ar: "الزلزال المريخي" },
          simple: {
            en: "A tremor on Mars, like an earthquake but usually far weaker.",
            ar: "اهتزاز على المريخ، كالزلزال لكنه أضعف عادةً بكثير.",
          },
        },
        {
          id: "seismic-wave",
          term: { en: "Seismic wave", ar: "الموجة الزلزالية" },
          simple: {
            en: "A ripple of energy moving through the ground. It changes speed and direction with the material it meets, which is how it carries news of the planet's interior.",
            ar: "موجة من الطاقة تنتقل في الأرض. تغيّر سرعتها واتجاهها حسب المادة التي تصادفها، وهي بذلك تحمل أخباراً عن باطن الكوكب.",
          },
        },
      ],
    },
    {
      id: "journey",
      kind: "journey",
      eyebrow: { en: "Chapter three", ar: "الفصل الثالث" },
      title: { en: "The Journey to Elysium", ar: "الرحلة إلى إليسيوم" },
      summary: {
        en: "A west-coast launch, seven months of coasting, and a landing on a plain chosen for its silence.",
        ar: "إطلاق من الساحل الغربي، وسبعة أشهر من الانتقال، وهبوط في سهل اختير لصمته.",
      },
      narrative: {
        en: [
          "InSight launched on 5 May 2018 from Vandenberg in California, the first interplanetary mission to leave from the American west coast. Two small companion spacecraft flew with it to relay the news of its arrival, and then the lander settled into about seven months of quiet coasting.",
          "On 26 November 2018 the spacecraft entered the Martian atmosphere on its own, behind a heat shield, then under a parachute, then firing its own retro-rockets. For several minutes it made every decision faster than any command from Earth could arrive.",
          "It touched down on Elysium Planitia, a broad flat plain near the equator chosen precisely because it is dull: no big rocks, no steep slopes, nothing to disturb a listening post. The first images showed flat ground and a plain horizon — exactly what the team had hoped for.",
          "Then the slow work began. The arm had to set the seismometer down with the care of a watchmaker, and every instrument was checked one at a time. From the outside nothing moved on Mars. From the inside, the ground never stopped moving.",
        ],
        ar: [
          "انطلقت إنسايت في 5 مايو 2018 من فاندنبرغ في كاليفورنيا، أول مهمة بين كواكب تنطلق من الساحل الغربي الأمريكي. وحلّقت معها مركبتان صغيرتان لتبلّغ عن وصولها، ثم استقرت مركبة الهبوط في نحو سبعة أشهر من الانتقال الهادئ.",
          "وفي 26 نوفمبر 2018 دخلت المركبة الغلاف الجوي المريخي وحدها، خلف درع حراري، ثم تحت مظلة، ثم بصواريخ كبح تشتعل بأمر منها هي. ولدقائق عدة اتخذت كل قرار أسرع من أن تصل تعليمات من الأرض.",
          "وهبطت على إليسيوم بلانيتيا، سهل واسع مستوٍ قرب خط الاستواء اختير بضبط لأنه ممل: لا صخور كبيرة، ولا منحدرات حادة، ولا شيء يزعج محطة استماع. وأظهرت الصور الأولى أرضاً مسطحة وأفقاً مستوياً — وهو بالضبط ما كان الفريق يأمله.",
          "ثم بدأ العمل البطيء. كان على الذراع أن تضع مقياس الزلازل بعناية صانع الساعات، وأن يُفحص كل جهاز على حدة. ومن الخارج لم يتحرك شيء على المريخ. أما من الداخل فلم تهدأ الأرض.",
        ],
      },
      echo: {
        en: "Seven months of falling toward a planet, a landing that lasted minutes, and then years of listening.",
        ar: "سبعة أشهر من السقوط نحو كوكب، وهبوط استغرق دقائق، ثم سنوات من الاستماع.",
      },
      timeline: [
        {
          id: "ins-launch",
          date: "2018-05-05",
          dateLabel: { en: "5 May 2018", ar: "5 مايو 2018" },
          label: { en: "Launch", ar: "الإطلاق" },
          description: {
            en: "InSight launched from Vandenberg Air Force Base in California.",
            ar: "انطلقت إنسايت من قاعدة فاندنبرغ الجوية في كاليفورنيا.",
          },
          type: "launch",
          sourceIds: ["SRC-INSIGHT", "SRC-NSSDCA-INSIGHT"],
        },
        {
          id: "ins-landing",
          date: "2018-11-26",
          dateLabel: { en: "26 November 2018", ar: "26 نوفمبر 2018" },
          label: { en: "Landing at Elysium Planitia", ar: "الهبوط في إليسيوم بلانيتيا" },
          description: {
            en: "InSight touched down on a flat plain near the Martian equator.",
            ar: "لمست إنسايت السطح في سهل مستوٍ قرب خط استواء المريخ.",
          },
          type: "landing",
          sourceIds: ["SRC-INSIGHT", "SRC-NSSDCA-INSIGHT"],
        },
        {
          id: "ins-seis",
          date: "2018-12-19",
          dateLabel: { en: "December 2018", ar: "ديسمبر 2018" },
          label: { en: "Seismometer deployed", ar: "نشر مقياس الزلازل" },
          description: {
            en: "The robotic arm placed the seismometer on the surface and covered it with a wind shield.",
            ar: "وضعت الذراع الآلية مقياس الزلازل على السطح وغطته بدرع رياح.",
          },
          type: "deployment",
          sourceIds: ["SRC-INSIGHT"],
        },
        {
          id: "ins-quake",
          date: "2019-04-06",
          dateLabel: { en: "April 2019", ar: "أبريل 2019" },
          label: { en: "First clear marsquake", ar: "أول زلزال مريخي واضح" },
          description: {
            en: "InSight recorded a clear seismic signal from inside Mars.",
            ar: "سجلت إنسايت إشارة زلزالية واضحة من داخل المريخ.",
          },
          type: "milestone",
          sourceIds: ["SRC-INSIGHT"],
        },
        {
          id: "ins-last",
          date: "2022-12-15",
          dateLabel: { en: "15 December 2022", ar: "15 ديسمبر 2022" },
          label: { en: "Last contact", ar: "آخر اتصال" },
          description: {
            en: "Dust on the solar arrays cut the lander's power, and InSight stopped communicating.",
            ar: "قلل الغبار على الألواح الشمسية طاقة المركبة، فتوقفت إنسايت عن التواصل.",
          },
          type: "last-contact",
          sourceIds: ["SRC-INSIGHT", "SRC-NSSDCA-INSIGHT"],
        },
      ],
      diagram: {
        kind: "journey-map",
        title: { en: "The route to Elysium Planitia", ar: "الطريق إلى إليسيوم بلانيتيا" },
        intro: {
          en: "From a west-coast launch pad to a plain chosen for its quiet.",
          ar: "من منصة إطلاق على الساحل الغربي إلى سهل اختير لهدوئه.",
        },
        route: [
          {
            label: { en: "Launch", ar: "الإطلاق" },
            description: {
              en: "Vandenberg, California, 5 May 2018",
              ar: "فاندنبرغ، كاليفورنيا، 5 مايو 2018",
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
            label: { en: "Entry and descent", ar: "الدخول والنزول" },
            description: {
              en: "Heat shield, parachute and retro-rockets",
              ar: "درع حراري ومظلة وصواريخ كبح",
            },
          },
          {
            label: { en: "Landing", ar: "الهبوط" },
            description: {
              en: "Elysium Planitia, 26 November 2018",
              ar: "إليسيوم بلانيتيا، 26 نوفمبر 2018",
            },
          },
          {
            label: { en: "Deployment", ar: "نشر الأجهزة" },
            description: {
              en: "The seismometer set down on the ground",
              ar: "مقياس الزلازل يُوضع على الأرض",
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
              en: "Launch from Vandenberg on 5 May 2018.",
              ar: "الإطلاق من فاندنبرغ في 5 مايو 2018.",
            },
          },
          {
            id: "mars",
            x: 82,
            y: 30,
            label: { en: "Mars", ar: "المريخ" },
            detail: {
              en: "Arrival and landing on 26 November 2018.",
              ar: "الوصول والهبوط في 26 نوفمبر 2018.",
            },
          },
          {
            id: "elysium",
            x: 64,
            y: 68,
            label: { en: "Elysium Planitia", ar: "إليسيوم بلانيتيا" },
            detail: {
              en: "A flat, quiet plain near the equator — the dullest place the team could find.",
              ar: "سهل مستوٍ هادئ قرب خط الاستواء — أملح مكان عثر عليه الفريق.",
            },
          },
          {
            id: "listening-post",
            x: 88,
            y: 82,
            label: { en: "The listening post", ar: "محطة الاستماع" },
            detail: {
              en: "Where the seismometer sat and felt the ground move for four years.",
              ar: "حيث جلس مقياس الزلازل يشعر بحركة الأرض أربع سنوات.",
            },
          },
        ],
      },
    },
    {
      id: "discoveries",
      kind: "discoveries",
      eyebrow: { en: "Chapter four", ar: "الفصل الرابع" },
      title: { en: "The Inside of a Planet", ar: "داخل كوكب" },
      summary: {
        en: "A crust, a mantle and a surprisingly large core — read from the way the ground shook.",
        ar: "قشرة ووشاح ولب كبير بشكل مفاجئ — قُرئت من طريقة اهتزاز الأرض.",
      },
      narrative: {
        en: [
          "Seismic waves behave differently depending on the material they travel through. Some move faster in hard rock, some slow down in molten material, and some reflect off boundaries between layers. By measuring the arrival times and shapes of many signals, scientists can build a picture of the inside of a planet.",
          "InSight's data showed that Mars has a crust that is thinner than some earlier estimates, a mantle with a different structure from Earth's, and a core that is larger than expected. The core appears to be liquid and rich in lighter elements such as sulphur.",
          "The mission also recorded the vibrations of meteorite impacts and used them as extra sources of seismic energy. Each impact gave scientists another known point on the map.",
        ],
        ar: [
          "تتصرف الموجات الزلزالية بشكل مختلف حسب المادة التي تمر بها. فبعضها يسرع في الصخور الصلبة، وبعضها يتباطأ في المواد المنصهرة، وبعضها ينعكس عند الحدود بين الطبقات. وبقياس أوقات وصول الإشارات وأشكالها، يستطيع العلماء بناء صورة لداخل الكوكب.",
          "أظهرت بيانات إنسايت أن للمريخ قشرة أرق من بعض التقديرات السابقة، ووشاحاً ببنية مختلفة عن وشاح الأرض، ولباً أكبر من المتوقع. ويبدو أن اللب سائل وغني بعناصر أخف مثل الكبريت.",
          "وسجلت المهمة أيضاً اهتزازات اصطدامات النيازك واستخدمتها مصادر إضافية للطاقة الزلزالية. وقد منح كل اصطدام العلماء نقطة معروفة أخرى على الخريطة.",
        ],
      },
      echo: {
        en: "You do not need to drill to the core. You need to listen carefully at the surface.",
        ar: "لا تحتاج إلى الحفر حتى اللب. تحتاج إلى الاستماع بعناية عند السطح.",
      },
      discoveries: [
        {
          id: "ins-d1",
          title: { en: "A planet that is still shaking", ar: "كوكب ما زال يهتز" },
          question: {
            en: "Is Mars seismically active today?",
            ar: "هل المريخ نشط زلزالياً اليوم؟",
          },
          instrument: {
            en: "SEIS seismometer",
            ar: "مقياس الزلازل سايس",
          },
          method: {
            en: "The seismometer recorded ground motion continuously for years and the team separated quake signals from wind and temperature noise.",
            ar: "سجل مقياس الزلازل حركة الأرض باستمرار لسنوات، وفصل الفريق إشارات الزلازل عن ضجيج الرياح والحرارة.",
          },
          data: {
            en: "More than 1,300 marsquakes were detected, with a wide range of sizes and locations.",
            ar: "كُشف أكثر من 1,300 زلزال مريخي بأحجام ومواقع متنوعة.",
          },
          finding: {
            en: "Mars is seismically active, although far less active than Earth.",
            ar: "المريخ نشط زلزالياً، وإن كان أقل نشاطاً بكثير من الأرض.",
          },
          significance: {
            en: "The quakes provided the signals needed to probe the interior, turning a planet into a laboratory.",
            ar: "وفرت الزلازل الإشارات اللازمة لسبر الداخل، فحوّلت الكوكب إلى مختبر.",
          },
          sourceIds: ["SRC-INSIGHT", "SRC-NSSDCA-INSIGHT"],
        },
        {
          id: "ins-d2",
          title: { en: "A layered interior", ar: "داخل متعدد الطبقات" },
          question: {
            en: "How thick are the crust, mantle and core of Mars?",
            ar: "ما سماكة قشرة المريخ ووشاحه ولبه؟",
          },
          instrument: {
            en: "SEIS, plus RISE radio tracking of the lander",
            ar: "مقياس الزلازل، إضافة إلى التتبع الراديوي لموقع المركبة",
          },
          method: {
            en: "Arrival times of seismic waves from many events were combined with precise measurements of the planet's rotation.",
            ar: "جُمعت أوقات وصول الموجات الزلزالية من أحداث كثيرة مع قياسات دقيقة لدوران الكوكب.",
          },
          data: {
            en: "The data pointed to a crust tens of kilometres thick, a mantle with a distinct lower layer, and a core larger than many pre-mission models predicted.",
            ar: "أشارت البيانات إلى قشرة بسماكة عشرات الكيلومترات، ووشاح بطبقة سفلية مميزة، ولب أكبر مما توقعته نماذج كثيرة قبل المهمة.",
          },
          finding: {
            en: "Mars has a layered interior with a large, light-element-rich liquid core.",
            ar: "للمريخ داخل متعدد الطبقات ولب سائل كبير غني بالعناصر الخفيفة.",
          },
          significance: {
            en: "It gave scientists a direct measurement of a planetary interior that had only been modelled before.",
            ar: "منح العلماء قياساً مباشراً لداخل كوكب لم يكن يُعرف إلا بالنماذج.",
          },
          sourceIds: ["SRC-INSIGHT", "SRC-NSSDCA-INSIGHT"],
        },
      ],
    },
    {
      id: "ending",
      kind: "ending",
      eyebrow: { en: "Chapter five", ar: "الفصل الخامس" },
      title: { en: "Dust Always Wins", ar: "الغبار يفوز دائماً" },
      summary: {
        en: "The seismometer kept listening until the dust took the last of the power.",
        ar: "واصل مقياس الزلازل الاستماع حتى أخذ الغبار آخر الطاقة.",
      },
      narrative: {
        en: [
          "InSight did not have a way to clean its solar panels. Dust accumulated slowly, and each year the lander produced a little less power. The team turned off instruments to keep the seismometer running as long as possible.",
          "The last image arrived in December 2022, showing the seismometer on the surface. The final communication came on 15 December. NASA declared the mission over after two attempts to contact the lander failed.",
          "InSight is still at Elysium Planitia. Its seismometer is still there too, a sensitive instrument in a dusty plain, holding the record of a planet's inner life.",
        ],
        ar: [
          "لم يكن لدى إنسايت طريقة لتنظيف ألواحها الشمسية. فتراكم الغبار ببطء، وأنتجت المركبة طاقة أقل قليلاً كل عام. وأوقف الفريق أجهزة لإبقاء مقياس الزلازل عاملاً أطول وقت ممكن.",
          "وصلت آخر صورة في ديسمبر 2022، وأظهرت مقياس الزلازل على السطح. وجاء آخر اتصال في 15 ديسمبر. وأعلنت ناسا انتهاء المهمة بعد فشل محاولتين للتواصل مع المركبة.",
          "وما زالت إنسايت في إليسيوم بلانيتيا. ومقياس زلازلها ما زال هناك أيضاً، جهاز حساس في سهل مغبر، يحفظ سجل الحياة الداخلية لكوكب.",
        ],
      },
      echo: {
        en: "It never left its landing site, and it still went deeper than anything before it.",
        ar: "لم تغادر موقع هبوطها قط، ومع ذلك توغلت أعمق من أي شيء قبلها.",
      },
      facts: [
        {
          label: { en: "Final location", ar: "الموقع الأخير" },
          value: { en: "Elysium Planitia, Mars", ar: "إليسيوم بلانيتيا، المريخ" },
        },
        {
          label: { en: "Last contact", ar: "آخر اتصال" },
          value: { en: "15 December 2022", ar: "15 ديسمبر 2022" },
        },
        {
          label: { en: "Marsquakes", ar: "الزلازل المريخية" },
          value: { en: "More than 1,300", ar: "أكثر من 1,300" },
        },
        {
          label: { en: "Cause of ending", ar: "سبب النهاية" },
          value: { en: "Dust on the solar arrays", ar: "الغبار على الألواح الشمسية" },
        },
      ],
    },
    {
      id: "legacy",
      kind: "legacy",
      eyebrow: { en: "Chapter six", ar: "الفصل السادس" },
      title: { en: "The Map That Remains", ar: "الخريطة التي تبقى" },
      summary: {
        en: "A planet's interior, measured instead of modelled.",
        ar: "باطن كوكب، صار مقسوساً لا مُنمَّجاً فحسب.",
      },
      narrative: {
        en: [
          "Before InSight, the inside of Mars was a set of guesses held together by models. After it, the planet has measurements: a crust, a mantle and a large liquid core, each sized from the way seismic waves arrived at a single instrument standing on a plain.",
          "The more than 1,300 marsquakes were the point all along. In April 2019 the seismometer recorded the first quake ever detected on another planet — a small signal that ended the idea that Mars is a geologically finished world.",
          "Not everything worked. The heat probe could not dig in, and the ground it struggled against taught its own lesson about how Martian soil behaves. That is how exploration goes: the failures are measurements too.",
          "InSight is silent now, and dust covers the panels that gave it power. But the record it returned is still being read, and every new model of the inside of Mars has to agree with it.",
        ],
        ar: [
          "قبل إنسايت كان باطن المريخ مجموعة تخمينات تشدّها النماذج. وبعدها صار للكوكب قياسات: قشرة ووشاح ولب سائل كبير، قِيس كل منها من طريقة وصول الموجات الزلزالية إلى جهاز واحد واقف في سهل.",
          "وكانت الزلازل المريخية، التي تجاوز عددها 1,300، هي المقصود منذ البداية. ففي أبريل 2019 سجل مقياس الزلازل أول زلزال يُكتشف على كوكب آخر — إشارة صغيرة أنهت فكرة أن المريخ عالم انتهت جيولوجيته.",
          "ولم ينجح كل شيء. فمجس التدفق الحراري لم يستطع الحفر، والأرض التي كافح معها علّمته درساً خاصاً عن سلوك تربة المريخ. وهكذا يجري الاستكشاف: فالإخفاقات قياسات هي الأخرى.",
          "إنسايت صامتة الآن، والغبار يغطي الألواح التي منحتها الطاقة. لكن السجل الذي أعادته ما زال يُقرأ، وكل نموذج جديد لباطن المريخ عليه أن يتوافق معه.",
        ],
      },
      echo: {
        en: "It listened for four years and left us a planet's medical chart. That is a good trade.",
        ar: "استمعت أربع سنوات وتركت لنا فحصاً شاملاً للكوكب. هذه صفقة جيدة.",
      },
      facts: [
        {
          label: { en: "Marsquakes detected", ar: "الزلازل المريخية المكتشفة" },
          value: {
            en: "More than 1,300, including the first quake detected on another planet",
            ar: "أكثر من 1,300، بينها أول زلزال يُكتشف على كوكب آخر",
          },
        },
        {
          label: { en: "Interior measured", ar: "الباطن المقسوس" },
          value: {
            en: "Crust, mantle and a large liquid core",
            ar: "القشرة والوشاح ولب سائل كبير",
          },
        },
        {
          label: { en: "Where it rests", ar: "أين تستقر" },
          value: {
            en: "Elysium Planitia, silent since December 2022",
            ar: "إليسيوم بلانيتيا، صامتة منذ ديسمبر 2022",
          },
        },
      ],
    },
  ],
  legacyStatement: {
    en: "InSight proved that a planet can be explored by listening as well as by looking.",
    ar: "أثبتت إنسايت أن الكوكب يمكن استكشافه بالاستماع كما بالاكتشاف بالبصر.",
  },
  tags: ["mars", "lander", "instrument", "remnant"],
  artifactId: "insight",
  sourceIds: ["SRC-INSIGHT", "SRC-NSSDCA-INSIGHT"],
  relatedStorySlugs: ["phoenix", "spirit"],
  echoIntro: {
    en: "Put your ear to the ground. InSight did, and heard a planet shifting beneath its feet.",
    ar: "ضع أذنك على الأرض. فعلت إنسايت ذلك، فسمعت كوكباً يتحرك تحت قدميها.",
  },
  echoSignoff: {
    en: "InSight is quiet now, but its seismometer's record will keep teaching for decades.",
    ar: "إنسايت صامتة الآن، لكن سجل مقياس زلازلها سيواصل التعليم عقوداً.",
  },
  lastVerified: "2026-11-14",
};
