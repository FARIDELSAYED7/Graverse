import type { EchoStory } from "@/types/echo";
import { echoImage } from "./media";

/**
 * LUNAR ROVING VEHICLE — the car that stayed on the Moon.
 *
 * Sources: the NSSDCA Lunar Roving Vehicle record and Apollo 15 rover page,
 * the Apollo Lunar Surface Journal, and the Apollo 15 mission record.
 */
export const lunarRovingVehicleStory: EchoStory = {
  id: "lunar-roving-vehicle",
  slug: "lunar-roving-vehicle",
  title: {
    en: "Lunar Roving Vehicle",
    ar: "العربة الجوّالة القمرية",
  },
  storyTitle: {
    en: "The Moon's Only Car",
    ar: "السيارة الوحيدة على القمر",
  },
  dek: {
    en: "Three electric cars were folded into Apollo landers, unfolded on the Moon, and driven beyond walking range. All three are still parked there.",
    ar: "طُويت ثلاث سيارات كهربائية داخل مركبات أبولو، ثم فُتحت على القمر وسِير بها إلى ما هو أبعد من مدى المشي. والثلاث ما زالت متوقفة هناك.",
  },
  summary: {
    en: "Between 1971 and 1972 the last three Apollo crews carried a Lunar Roving Vehicle to the Moon. Each rover was a folding electric car with four wheels, its own battery and a seat for two astronauts in pressure suits. The rovers turned short walking trips into geological expeditions across kilometres of terrain. When each crew left, its rover stayed behind, parked where the astronauts stopped it.",
    ar: "بين عامي 1971 و1972 حملت آخر ثلاث بعثات أبولو عربة جوّالة قمرية إلى القمر. كانت كل عربة سيارة كهربائية قابلة للطي بأربع عجلات وبطارية خاصة ومقعد لرائدي فضاء ببدلتيهما المضغوطتين. وقد حوّلت العربات رحلات المشي القصيرة إلى بعثات جيولوجية تمتد كيلومترات. وحين غادر كل طاقم، بقيت عربته خلفه متوقفة حيث أوقفها روّاد الفضاء.",
  },
  location: {
    en: "Hadley-Apennine, Descartes Highlands and Taurus-Littrow, the Moon",
    ar: "هادلي–أبينين ومرتفعات ديكارت وتوروس–ليترو، القمر",
  },
  locationNote: {
    en: "Apollo 15's rover is at Hadley-Apennine, Apollo 16's at Descartes, and Apollo 17's at Taurus-Littrow. Each one sits where its crew parked it.",
    ar: "عربة أبولو 15 في هادلي–أبينين، وعربة أبولو 16 في ديكارت، وعربة أبولو 17 في توروس–ليترو. وكل واحدة منها في المكان الذي أوقفها فيه طاقمها.",
  },
  equipmentType: {
    en: "Crewed lunar surface vehicle",
    ar: "مركبة سطحية قمرية مأهولة",
  },
  missionPeriod: {
    en: "Apollo 15: 26 July – 7 August 1971 · Apollo 16: 16–27 April 1972 · Apollo 17: 7–19 December 1972",
    ar: "أبولو 15: 26 يوليو – 7 أغسطس 1971 · أبولو 16: 16–27 أبريل 1972 · أبولو 17: 7–19 ديسمبر 1972",
  },
  missionStatus: {
    en: "Mission complete — all three rovers were left on the Moon when their crews departed.",
    ar: "اكتملت المهمة — تُركت العربات الثلاث على القمر حين غادرت أطقمها.",
  },
  hardwareStatus: {
    en: "Inactive — three rovers remain parked on the lunar surface.",
    ar: "غير نشطة — ثلاث عربات ما زالت متوقفة على سطح القمر.",
  },
  statusKind: "left-behind",
  accent: "#E8B64C",
  accentSoft: "#FBEDCB",
  badge: {
    en: "Moon Driver",
    ar: "سائق القمر",
  },
  badgeKey: "moon-driver",
  hero: echoImage("as17-146-22367", {
    alt: {
      en: "The Apollo 17 Lunar Roving Vehicle parked in its final position at Taurus-Littrow, with the lunar module in the distance.",
      ar: "العربة الجوّالة القمرية لأبولو 17 متوقفة في مكانها الأخير عند توروس–ليترو، ومركبة الهبوط القمرية في البعيد.",
    },
    caption: {
      en: "The Apollo 17 rover in its final parking space at Taurus-Littrow in December 1972. It has not moved since the crew left.",
      ar: "عربة أبولو 17 في مكان وقوفها الأخير عند توروس–ليترو في ديسمبر 1972. ولم تتحرك منذ مغادرة الطاقم.",
    },
  }),
  gallery: [
    echoImage("as15-86-11603", {
      alt: {
        en: "Astronaut James Irwin working beside the Apollo 15 Lunar Roving Vehicle during a lunar surface EVA.",
        ar: "رائد الفضاء جيمس إيروين يعمل بجانب العربة الجوّالة القمرية لأبولو 15 خلال سير في الفضاء على سطح القمر.",
      },
      caption: {
        en: "James Irwin beside the Apollo 15 rover at Hadley-Apennine. The rover carried the astronauts, their tools and the samples they collected.",
        ar: "جيمس إيروين بجانب عربة أبولو 15 في هادلي–أبينين. كانت العربة تحمل رائدي الفضاء وأدواتهما والعينات التي جمعاها.",
      },
    }),
    echoImage("as17-145-22162", {
      alt: {
        en: "A panoramic view of the Apollo 17 landing site at Taurus-Littrow with the lunar rover and lunar module.",
        ar: "منظر بانورامي لموقع هبوط أبولو 17 عند توروس–ليترو مع العربة الجوّالة ومركبة الهبوط القمرية.",
      },
      caption: {
        en: "The Apollo 17 landing site. The rover allowed the crew to reach a wider range of rock types than walking alone would have permitted.",
        ar: "موقع هبوط أبولو 17. أتاحت العربة للطاقم الوصول إلى أنواع صخور أوسع مما كان المشي وحده سيسمح به.",
      },
    }),
    echoImage("S71-30542", {
      alt: {
        en: "Engineers test the Apollo 15 Lunar Roving Vehicle and lunar module training model during ground simulations.",
        ar: "مهندسون يختبرون العربة الجوّالة القمرية لأبولو 15 ونموذجاً تدريبياً لمركبة الهبوط خلال محاكاة أرضية.",
      },
      caption: {
        en: "Ground training before Apollo 15. The folded rover had to fit inside the lunar module and unfold with the crew's help on the surface.",
        ar: "تدريب أرضي قبل أبولو 15. كان على العربة المطوية أن تتسع داخل مركبة الهبوط القمرية وأن تُفرد بمساعدة الطاقم على السطح.",
      },
    }),
  ],
  facts: [
    {
      label: { en: "Unloaded mass", ar: "الكتلة الفارغة" },
      value: { en: "About 210 kg", ar: "نحو 210 كغ" },
    },
    {
      label: { en: "Payload on the Moon", ar: "الحمولة على القمر" },
      value: { en: "About 490 kg", ar: "نحو 490 كغ" },
    },
    {
      label: { en: "Top speed", ar: "أقصى سرعة" },
      value: { en: "About 18 km/h", ar: "نحو 18 كم/س" },
    },
    {
      label: { en: "Drive", ar: "الدفع" },
      value: {
        en: "Four wheels, each with its own electric motor.",
        ar: "أربع عجلات، لكل واحدة محرك كهربائي خاص بها.",
      },
    },
    {
      label: { en: "Power", ar: "الطاقة" },
      value: {
        en: "Two silver-zinc batteries, not solar panels.",
        ar: "بطاريتان من الفضة والزنك، لا ألواح شمسية.",
      },
    },
    {
      label: { en: "Apollo 15 distance", ar: "مسافة أبولو 15" },
      value: { en: "About 27.8 km", ar: "نحو 27.8 كم" },
    },
    {
      label: { en: "Apollo 16 distance", ar: "مسافة أبولو 16" },
      value: { en: "About 26.7 km", ar: "نحو 26.7 كم" },
    },
    {
      label: { en: "Apollo 17 distance", ar: "مسافة أبولو 17" },
      value: { en: "About 35.9 km", ar: "نحو 35.9 كم" },
    },
  ],
  chapters: [
    {
      id: "meet",
      kind: "meet",
      eyebrow: { en: "Chapter one", ar: "الفصل الأول" },
      title: { en: "Meet the Moon Car", ar: "تعرّف على سيارة القمر" },
      summary: {
        en: "A vehicle that had to be a car, a cargo carrier and a piece of luggage at the same time.",
        ar: "مركبة كان عليها أن تكون سيارة وحاملة حمولة وقطعة أمتعة في الوقت نفسه.",
      },
      narrative: {
        en: [
          "The Lunar Roving Vehicle was built for a very specific problem. An Apollo astronaut in a pressure suit could walk only a short distance from the lunar module before the suit, the oxygen supply and the heat became limiting. Scientists wanted samples from hills, craters and valleys that were kilometres away. A car was the answer.",
          "The engineering was unusual because the rover had to travel folded. It was stored in a bay on the side of the lunar module and had to fit inside a space about the size of a small wardrobe. Once on the surface, the astronauts pulled a handle and the chassis, seats and wheels unfolded into place. The whole deployment took only a few minutes.",
          "Every wheel had its own electric motor, so the rover could keep driving if one wheel lost traction. The tyres were not rubber. They were woven from piano wire, because rubber would become brittle and fail in the vacuum and temperature extremes of the Moon.",
        ],
        ar: [
          "صُنعت العربة الجوّالة القمرية لمشكلة محددة جداً. فرائد الفضاء في أبولو، ببدلته المضغوطة، لم يكن يستطيع المشي بعيداً عن مركبة الهبوط قبل أن تصبح البدلة وإمداد الأكسجين والحرارة عوائق. وكان العلماء يريدون عينات من تلال وفوهات ووديان تبعد كيلومترات. فكانت السيارة هي الجواب.",
          "كانت الهندسة غير مألوفة لأن العربة كان عليها أن تُسافر مطوية. فقد كانت تُخزَّن في حجرة على جانب مركبة الهبوط القمرية، وكان عليها أن تتسع في حيز بحجم خزانة صغيرة. وبعد الوصول إلى السطح، سحب روّاد الفضاء مقبضاً فانفرد الهيكل والمقاعد والعجلات في مكانها. ولم يستغرق النشر كله سوى دقائق قليلة.",
          "كان لكل عجلة محرك كهربائي خاص بها، فكانت العربة قادرة على مواصلة السير إذا فقدت عجلة واحدة تماسكها. ولم تكن الإطارات مطاطية، بل كانت منسوجة من سلك البيانو، لأن المطاط يصبح هشاً ويتلف في فراغ القمر وتطرف حرارته.",
        ],
      },
      echo: {
        en: "This is not a robot. It is a car with a driver, a passenger, and no road.",
        ar: "هذه ليست روبوتاً. إنها سيارة لها سائق وراكب، وبلا طريق.",
      },
      facts: [
        {
          label: { en: "Seats", ar: "المقاعد" },
          value: { en: "Two astronauts in pressure suits", ar: "رائدا فضاء ببدلتين مضغوطتين" },
        },
        {
          label: { en: "Folded for launch", ar: "مطوية عند الإطلاق" },
          value: {
            en: "Stored in a bay on the lunar module.",
            ar: "مخزّنة في حجرة على مركبة الهبوط القمرية.",
          },
        },
        {
          label: { en: "Tyres", ar: "الإطارات" },
          value: {
            en: "Woven piano wire, not rubber.",
            ar: "سلك بيانو منسوج، لا مطاط.",
          },
        },
      ],
      diagram: {
        kind: "rover-components",
        title: { en: "What the rover is made of", ar: "مكوّنات العربة" },
        intro: {
          en: "Select a marker to see what that part of the rover does. The shapes here are a teaching diagram of the real vehicle.",
          ar: "اختر أي علامة لترى وظيفة ذلك الجزء من العربة. الأشكال هنا رسم تعليمي للمركبة الحقيقية.",
        },
        points: [
          {
            id: "seats",
            x: 50,
            y: 43,
            label: { en: "Seats and controls", ar: "المقاعد والتحكم" },
            detail: {
              en: "Two seats for astronauts in pressure suits, with a hand controller between them instead of a steering wheel.",
              ar: "مقعدان لرائدي الفضاء ببدلتيهما المضغوطتين، وبينهما مقبض تحكّم بدل المقود.",
            },
          },
          {
            id: "wheels",
            x: 50,
            y: 66,
            label: { en: "Wire-mesh wheels", ar: "العجلات الشبكية السلكية" },
            detail: {
              en: "Four wheels, each with its own electric motor, on tyres woven from wire instead of rubber.",
              ar: "أربع عجلات، لكل واحدة محرك كهربائي خاص، على إطارات من سلك منسوج بدل المطاط.",
            },
          },
          {
            id: "antenna",
            x: 49,
            y: 21,
            label: { en: "Dish antenna", ar: "هوائي الطبق" },
            detail: {
              en: "A steerable dish antenna pointed at Earth and relayed live television through the lunar module.",
              ar: "هوائي طبق موجَّه كان يشير إلى الأرض ويبدّل التلفزيون المباشر عبر مركبة الهبوط القمرية.",
            },
          },
          {
            id: "tools",
            x: 78,
            y: 66,
            label: { en: "Tool pallets", ar: "منصات الأدوات" },
            detail: {
              en: "Pallets behind the seats carried cameras, tools and the sample bags the crews filled.",
              ar: "منصات خلف المقاعد حملت كاميرات وأدوات وأكياس العينات التي ملأها الطاقم.",
            },
          },
        ],
      },
      quiz: [
        {
          id: "lrv-q1",
          prompt: {
            en: "Why were the rover's tyres made of wire instead of rubber?",
            ar: "لماذا صُنعت إطارات العربة من السلك بدل المطاط؟",
          },
          options: [
            {
              id: "a",
              label: {
                en: "Rubber would become brittle in the lunar vacuum and temperature extremes.",
                ar: "لأن المطاط يصبح هشاً في فراغ القمر وتطرف حرارته.",
              },
            },
            {
              id: "b",
              label: {
                en: "Wire tyres were lighter than rubber ones.",
                ar: "لأن الإطارات السلكية أخف من المطاطية.",
              },
            },
            {
              id: "c",
              label: {
                en: "Rubber would attract too much lunar dust.",
                ar: "لأن المطاط يجذب غبار القمر بكثرة.",
              },
            },
          ],
          correctOptionId: "a",
          explanation: {
            en: "Rubber behaves badly in vacuum and at lunar temperature extremes. The wire mesh tyres were flexible, light and able to grip the loose surface.",
            ar: "يتصرف المطاط بشكل سيئ في الفراغ وفي درجات الحرارة القمرية المتطرفة. أما الإطارات الشبكية السلكية فكانت مرنة وخفيفة وقادرة على الثبات على السطح المفكك.",
          },
        },
      ],
    },
    {
      id: "mission",
      kind: "mission",
      eyebrow: { en: "Chapter two", ar: "الفصل الثاني" },
      title: { en: "Three Missions, Three Cars", ar: "ثلاث مهمات وثلاث سيارات" },
      summary: {
        en: "Apollo 15 proved the idea. Apollo 16 and 17 turned it into routine field work.",
        ar: "أثبتت أبولو 15 الفكرة. وحوّلتها أبولو 16 و17 إلى عمل ميداني معتاد.",
      },
      narrative: {
        en: [
          "Apollo 15 carried the first rover in July 1971. David Scott and James Irwin drove it across the Hadley-Apennine region, along the edge of Hadley Rille and up the slope of Hadley Delta. The rover let them visit sites that would have taken hours to reach on foot, and it carried the tools and sample bags that made those visits productive.",
          "Apollo 16 followed in April 1972, driving across the Descartes Highlands. Apollo 17 arrived in December 1972 and used its rover for the longest traverses of the programme, including the valley at Taurus-Littrow and the crater named Shorty.",
          "The rover was not a spacecraft. It had no heat shield, no rocket and no way home. It was cargo that became a vehicle, and it depended completely on the lunar module for power charging, communication and the journey back to orbit — a journey the rover itself would not make.",
        ],
        ar: [
          "حملت أبولو 15 أول عربة في يوليو 1971. وقادها ديفيد سكوت وجيمس إيروين عبر منطقة هادلي–أبينين، على حافة أخدود هادلي وصعوداً على منحدر دلتا هادلي. أتاحت لهما العربة زيارة مواقع كان الوصول إليها سيراً على الأقدام سيستغرق ساعات، وحملت الأدوات وأكياس العينات التي جعلت تلك الزيارات مثمرة.",
          "ثم جاءت أبولو 16 في أبريل 1972، فسارت عبر مرتفعات ديكارت. ووصلت أبولو 17 في ديسمبر 1972 واستخدمت عربتها في أطول جولات البرنامج، بما فيها وادي توروس–ليترو والفوهة المسماة شورتي.",
          "لم تكن العربة مركبة فضائية. فلم يكن لها درع حراري ولا صاروخ ولا طريق للعودة. كانت حمولة صارت مركبة، واعتمدت كلياً على مركبة الهبوط القمرية في الشحن والاتصال ورحلة العودة إلى المدار — وهي رحلة لم تقم بها العربة نفسها.",
        ],
      },
      echo: {
        en: "The rover never came home. It did not have to. Its job was to make the crew's time on the surface count.",
        ar: "لم تعد العربة إلى الوطن. ولم يكن عليها ذلك. كان عملها أن تجعل وقت الطاقم على السطح ذا قيمة.",
      },
      facts: [
        {
          label: { en: "Total distance", ar: "المسافة الإجمالية" },
          value: {
            en: "About 90 km across the three missions.",
            ar: "نحو 90 كم في المهمات الثلاث.",
          },
        },
        {
          label: { en: "Longest single drive", ar: "أطول سير منفرد" },
          value: {
            en: "Apollo 17 covered about 35.9 km in total.",
            ar: "قطعت أبولو 17 نحو 35.9 كم إجمالاً.",
          },
        },
        {
          label: { en: "Communication", ar: "الاتصال" },
          value: {
            en: "Through the lunar module and its radio link to Earth.",
            ar: "عبر مركبة الهبوط القمرية ورابطها اللاسلكي بالأرض.",
          },
        },
      ],
      glossary: [
        {
          id: "traverse",
          term: { en: "Traverse", ar: "الجولة الميدانية" },
          simple: {
            en: "A planned drive across the surface with several stops, so one trip can visit many places.",
            ar: "قيادة مخطّطة عبر السطح تتضمّن محطات متعددة، كي تزور رحلة واحدة أماكن كثيرة.",
          },
        },
        {
          id: "vacuum",
          term: { en: "Vacuum", ar: "الفراغ" },
          simple: {
            en: "Space with almost no air in it. Nothing breathes or burns, and materials like rubber behave badly.",
            ar: "فضاء شبه خالٍ من الهواء. لا شيء فيه يتنفس أو يحترق، وتتصرف مواد مثل المطاط بشكل سيئ.",
          },
        },
        {
          id: "spacewalk",
          term: { en: "Spacewalk (EVA)", ar: "الخروج إلى الفضاء (EVA)" },
          simple: {
            en: "Any work an astronaut does outside the spacecraft, in a pressure suit. Every drive on the Moon was one long spacewalk.",
            ar: "أي عمل يقوم به رائد الفضاء خارج المركبة ببدلة مضغوطة. وكل قيادة على القمر كانت خروجاً طويلاً من هذا النوع.",
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
        en: "Three flights, three cars unfolded in minutes, and three parking spaces that are still occupied.",
        ar: "ثلاث رحلات وثلاث سيارات انفردت في دقائق وثلاثة أماكن وقوف ما زالت مشغولة.",
      },
      narrative: {
        en: [
          "Apollo 15 lifted off on 26 July 1971 with the first Lunar Roving Vehicle folded into one of the four quadrants of the lunar module's descent stage. For most of the flight the rover was simply cargo: a chassis, two seats, four wheels and a battery, packed into a bay about the size of a wardrobe.",
          "The lunar module landed at Hadley-Apennine on 30 July. During the first surface walk the astronauts pulled cables, and the rover unfolded: the seats rose, the wheels swung out and locked, and a folded package became a working car in minutes. On 31 July, Scott and Irwin drove it for the first time along the edge of Hadley Rille.",
          "Apollo 16 followed in April 1972 at the Descartes Highlands, and Apollo 17 arrived in December 1972 at Taurus-Littrow. Each rover turned a short stay into a geological expedition: Apollo 15 covered about 27.8 kilometres, Apollo 16 about 26.7, and Apollo 17 drove the furthest of all, about 35.9 kilometres — still the longest distance driven on the Moon.",
          "None of the three came home. Before lifting off, each crew parked its rover some distance from the lunar module and turned it so its television camera could watch the ascent stage leave. The cars are still there, in three different valleys, exactly where the astronauts stopped them.",
        ],
        ar: [
          "انطلقت أبولو 15 في 26 يوليو 1971 حاملة أول عربة جوّالة قمرية مطوية في أحد أركان مركبة الهبوط القمرية الأربعة. وفي معظم الرحلة كانت العربة مجرد حمولة: هيكل ومقعدان وأربع عجلات وبطارية، معبأة في حجرة بحجم خزانة تقريباً.",
          "هبطت مركبة الهبوط القمرية في هادلي–أبينين في 30 يوليو. وخلال أول جولة على السطح سحب روّاد الفضاء الكابلات فانفردت العربة: ارتفعت المقاعد، وتدحرجت العجلات إلى مكانها وثبتت، وفي دقائق صار من مطوي سيارة عاملة. وفي 31 يوليو قادها سكوت وإيروين لأول مرة على حافة أخدود هادلي.",
          "ثم جاءت أبولو 16 في أبريل 1972 إلى مرتفعات ديكارت، ووصلت أبولو 17 في ديسمبر 1972 إلى توروس–ليترو. حوّلت كل عربة إقامة قصيرة إلى بعثة جيولوجية: قطعت أبولو 15 نحو 27.8 كيلومتراً، وأبولو 16 نحو 26.7، وسارت أبولو 17 أبعد من الجميع، نحو 35.9 كيلومتراً — وهي ما زالت أطول مسافة قُطعت بالسيارة على القمر.",
          "ولم تعد واحدة من الثلاث إلى الوطن. قبل الإقلاع أوقف كل طاقم عربته على بُعد من مركبة الهبوط القمرية ووجّهها بحيث ترى كاميرتها التلفزيونية مركبة الصعود وهي تغادر. والسيارات ما زالت هناك، في ثلاثة أودية مختلفة، تماماً حيث أوقفها روّاد الفضاء.",
        ],
      },
      echo: {
        en: "From folded cargo to a working car in minutes. Then kilometres of valley — and a drive home that was never part of the plan.",
        ar: "من حمولة مطوية إلى سيارة عاملة في دقائق. ثم كيلومترات من الوادي — وقيادة عودة لم تكن ضمن الخطة أبداً.",
      },
      timeline: [
        {
          id: "lrv-a15-launch",
          date: "1971-07-26",
          dateLabel: { en: "26 July 1971", ar: "26 يوليو 1971" },
          label: { en: "Apollo 15 launches", ar: "انطلاق أبولو 15" },
          description: {
            en: "Apollo 15 lifted off with the first Lunar Roving Vehicle folded in the lunar module.",
            ar: "انطلقت أبولو 15 حاملة أول عربة جوّالة قمرية مطوية داخل مركبة الهبوط.",
          },
          type: "launch",
          sourceIds: ["SRC-NASA-APOLLO-15", "SRC-NSSDCA-LRV"],
        },
        {
          id: "lrv-a15-landing",
          date: "1971-07-30",
          dateLabel: { en: "30 July 1971", ar: "30 يوليو 1971" },
          label: { en: "Landing at Hadley-Apennine", ar: "الهبوط في هادلي–أبينين" },
          description: {
            en: "The lunar module landed near Hadley Rille, and the crew deployed the rover on the surface.",
            ar: "هبطت مركبة الهبوط قرب أخدود هادلي، ونشر الطاقم العربة على السطح.",
          },
          type: "landing",
          sourceIds: ["SRC-NASA-APOLLO-15", "SRC-ALSJ-A15-LRV"],
        },
        {
          id: "lrv-a15-first-drive",
          date: "1971-07-31",
          dateLabel: { en: "31 July 1971", ar: "31 يوليو 1971" },
          label: { en: "First lunar drive", ar: "أول سير على القمر" },
          description: {
            en: "Scott and Irwin drove the rover during the first Apollo 15 surface EVA.",
            ar: "قاد سكوت وإيروين العربة خلال أول سير على سطح القمر في أبولو 15.",
          },
          type: "deployment",
          sourceIds: ["SRC-ALSJ-A15-LRV", "SRC-LRV"],
        },
        {
          id: "lrv-a16",
          date: "1972-04-21",
          dateLabel: { en: "21 April 1972", ar: "21 أبريل 1972" },
          label: { en: "Apollo 16 drives Descartes", ar: "أبولو 16 تسير في ديكارت" },
          description: {
            en: "John Young and Charles Duke used the second rover across the Descartes Highlands.",
            ar: "استخدم جون يونغ وتشارلز ديوك العربة الثانية عبر مرتفعات ديكارت.",
          },
          type: "milestone",
          sourceIds: ["SRC-LRV"],
        },
        {
          id: "lrv-a17",
          date: "1972-12-11",
          dateLabel: { en: "11 December 1972", ar: "11 ديسمبر 1972" },
          label: { en: "Apollo 17 begins its traverses", ar: "أبولو 17 تبدأ جولاتها" },
          description: {
            en: "Eugene Cernan and Harrison Schmitt drove the third rover at Taurus-Littrow.",
            ar: "قاد يوجين سيرنان وهاريسون شميت العربة الثالثة عند توروس–ليترو.",
          },
          type: "milestone",
          sourceIds: ["SRC-LRV"],
        },
      ],
      diagram: {
        kind: "journey-map",
        title: { en: "From Earth to the lunar valleys", ar: "من الأرض إلى الأودية القمرية" },
        intro: {
          en: "The road out, and where each car ended its last drive.",
          ar: "الطريق إلى هناك، ومكان نهاية كل سيارة لآخر قيادة لها.",
        },
        route: [
          {
            label: { en: "Launch", ar: "الإطلاق" },
            description: {
              en: "Apollo 15 lifts off, 26 July 1971",
              ar: "انطلاق أبولو 15، 26 يوليو 1971",
            },
          },
          {
            label: { en: "Landing", ar: "الهبوط" },
            description: {
              en: "Hadley-Apennine, 30 July 1971",
              ar: "هادلي–أبينين، 30 يوليو 1971",
            },
          },
          {
            label: { en: "First drive", ar: "أول قيادة" },
            description: {
              en: "The rover unfolds and drives, 31 July 1971",
              ar: "انفراد العربة وانطلاقها، 31 يوليو 1971",
            },
          },
          {
            label: { en: "Descartes", ar: "ديكارت" },
            description: {
              en: "Apollo 16, April 1972",
              ar: "أبولو 16، أبريل 1972",
            },
          },
          {
            label: { en: "Taurus-Littrow", ar: "توروس–ليترو" },
            description: {
              en: "Apollo 17, December 1972 — the longest drives",
              ar: "أبولو 17، ديسمبر 1972 — أطول الجولات",
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
              en: "Apollo 15 launched on a Saturn V rocket on 26 July 1971.",
              ar: "أُطلقت أبولو 15 على صاروخ ساتورن 5 في 26 يوليو 1971.",
            },
          },
          {
            id: "coast",
            x: 36,
            y: 35,
            label: { en: "Coast", ar: "الانتقال" },
            detail: {
              en: "About three days from Earth to lunar orbit.",
              ar: "نحو ثلاثة أيام من الأرض إلى مدار القمر.",
            },
          },
          {
            id: "orbit",
            x: 60,
            y: 26,
            label: { en: "Lunar orbit", ar: "مدار القمر" },
            detail: {
              en: "The command module waited in orbit while the lunar module went down.",
              ar: "انتظرت مركبة القيادة في المدار بينما نزلت مركبة الهبوط القمرية.",
            },
          },
          {
            id: "valleys",
            x: 84,
            y: 32,
            label: { en: "The lunar valleys", ar: "الأودية القمرية" },
            detail: {
              en: "Hadley-Apennine, Descartes and Taurus-Littrow — where the three cars are parked.",
              ar: "هادلي–أبينين وديكارت وتوروس–ليترو — حيث تتوقف السيارات الثلاث.",
            },
          },
        ],
      },
    },
    {
      id: "discoveries",
      kind: "discoveries",
      eyebrow: { en: "Chapter four", ar: "الفصل الرابع" },
      title: { en: "What the Car Found", ar: "ما الذي وجدته السيارة" },
      summary: {
        en: "The rover was a tool for geology, and the rocks it reached changed what scientists knew about the Moon.",
        ar: "كانت العربة أداة للجيولوجيا، والصخور التي وصلت إليها غيّرت ما يعرفه العلماء عن القمر.",
      },
      narrative: {
        en: [
          "A rover is only useful if it takes scientists somewhere new. The lunar rovers did exactly that, carrying astronauts to outcrops, crater rims and volcanic deposits that were far beyond walking range.",
          "The samples the crews brought back are still being studied. They are the only directly collected pieces of the Moon from those sites, and they carry a record of the Moon's early history that orbital images cannot provide.",
        ],
        ar: [
          "لا تكون العربة مفيدة إلا إذا أخذت العلماء إلى مكان جديد. وهذا بالضبط ما فعلته العربات القمرية، إذ حملت روّاد الفضاء إلى نتوءات صخرية وحواف فوهات ورواسب بركانية بعيدة جداً عن مدى المشي.",
          "العينات التي أعادتها الأطقم ما زالت تُدرس. وهي القطع الوحيدة المجموعة مباشرة من القمر في تلك المواقع، وتحمل سجلاً لتاريخ القمر المبكر لا تستطيع الصور المدارية تقديمه.",
        ],
      },
      echo: {
        en: "Speed is not the point. Reach is the point. The rover turned a few hours into a field season.",
        ar: "السرعة ليست المقصود. المقصود هو المدى. لقد حوّلت العربة ساعات قليلة إلى موسم عمل ميداني.",
      },
      discoveries: [
        {
          id: "lrv-d1",
          title: { en: "The Genesis Rock", ar: "صخرة التكوين" },
          question: {
            en: "What is the Moon's original crust made of?",
            ar: "ممّ تتكون قشرة القمر الأصلية؟",
          },
          instrument: {
            en: "Geological field work and sample collection by the Apollo 15 crew",
            ar: "عمل جيولوجي ميداني وجمع عينات من طاقم أبولو 15",
          },
          method: {
            en: "Scott and Irwin drove to Spur Crater on the slope of Hadley Delta, where the rover could reach an outcrop that was too far to walk to in the available time.",
            ar: "سار سكوت وإيروين إلى فوهة سبير على منحدر دلتا هادلي، حيث أتاحت العربة الوصول إلى نتوء صخري كان بعيداً عن مدى المشي في الوقت المتاح.",
          },
          data: {
            en: "They collected a light-coloured anorthosite sample, later numbered 15415, that turned out to be one of the oldest rocks returned from the Moon.",
            ar: "جمعا عينة أنورثوسايت فاتحة اللون، سُميت لاحقاً 15415، وتبيّن أنها من أقدم الصخور التي أُعيدت من القمر.",
          },
          finding: {
            en: "The sample supported the idea that the Moon once had a widespread crust of light silicate rock, now called the lunar highlands crust.",
            ar: "دعمت العينة فكرة أن القمر كانت له قشرة واسعة من صخور السيليكات الفاتحة، تُعرف الآن بقشرة المرتفعات القمرية.",
          },
          significance: {
            en: "It gave scientists a direct piece of the Moon's first solid crust, and it showed why mobility mattered: the rock was not at the landing site.",
            ar: "منحت العلماء قطعة مباشرة من أول قشرة صلبة للقمر، وأظهرت لماذا كانت القدرة على التنقل مهمة: فالصخرة لم تكن في موقع الهبوط.",
          },
          sourceIds: ["SRC-LRV", "SRC-ALSJ-A15-LRV", "SRC-NASA-APOLLO-15"],
        },
        {
          id: "lrv-d2",
          title: { en: "Orange soil at Shorty", ar: "التربة البرتقالية عند شورتي" },
          question: {
            en: "Was there ever explosive volcanic activity on the Moon?",
            ar: "هل حدث نشاط بركاني انفجاري على القمر يوماً؟",
          },
          instrument: {
            en: "Field observation and samples collected during Apollo 17",
            ar: "مراقبة ميدانية وعينات جُمعت خلال أبولو 17",
          },
          method: {
            en: "Cernan and Schmitt drove the rover to Shorty Crater, where they noticed a patch of orange soil beside the grey lunar dust.",
            ar: "قاد سيرنان وشميت العربة إلى فوهة شورتي، حيث لاحظا بقعة من تربة برتقالية بجانب غبار القمر الرمادي.",
          },
          data: {
            en: "The orange material turned out to be tiny glass beads formed from molten rock thrown out by volcanic eruptions.",
            ar: "تبيّن أن المادة البرتقالية حبيبات زجاجية دقيقة تشكلت من صخور منصهرة قذفتها انفجارات بركانية.",
          },
          finding: {
            en: "The beads showed that the Moon had explosive volcanic eruptions in its past, not only slow lava flows.",
            ar: "أظهرت الحبيبات أن القمر شهد انفجارات بركانية في ماضيه، لا تدفقات حمم بطيئة فقط.",
          },
          significance: {
            en: "The discovery depended on reaching a specific crater rim, which is exactly the kind of site the rover was built to make accessible.",
            ar: "اعتمد الاكتشاف على الوصول إلى حافة فوهة محددة، وهو بالضبط نوع المواقع الذي صُنعت العربة لتجعله في متناول اليد.",
          },
          sourceIds: ["SRC-LRV", "SRC-NASA-APOLLO-15"],
        },
      ],
    },
    {
      id: "ending",
      kind: "ending",
      eyebrow: { en: "Chapter five", ar: "الفصل الخامس" },
      title: { en: "Still Parked", ar: "ما زالت متوقفة" },
      summary: {
        en: "No tow truck, no garage, no return trip. The three rovers stayed where the crews stopped them.",
        ar: "لا شاحنة سحب ولا مرآب ولا رحلة عودة. بقيت العربات الثلاث حيث أوقفها الطاقم.",
      },
      narrative: {
        en: [
          "When an Apollo crew left the Moon, the lunar module's ascent stage lifted off and the descent stage stayed behind. The rover stayed with it. There was no way to bring the car home, and no reason to try.",
          "The Apollo 15 rover is at Hadley-Apennine, the Apollo 16 rover is at Descartes, and the Apollo 17 rover is at Taurus-Littrow. They are not wrecks. They are parked vehicles, still carrying some of the equipment and dust of their missions.",
          "They are also a different kind of lunar artifact from a lander or a flag. A rover is a machine built to move, and its final position records the last decision its driver made: stop here, turn the wheels, walk away.",
        ],
        ar: [
          "حين غادر طاقم أبولو القمر، انطلقت مركبة الصعود من مركبة الهبوط القمرية وبقيت مركبة الهبوط خلفها. وبقيت العربة معها. لم يكن هناك سبيل لإعادة السيارة إلى الوطن، ولم يكن هناك سبب لمحاولة ذلك.",
          "عربة أبولو 15 في هادلي–أبينين، وعربة أبولو 16 في ديكارت، وعربة أبولو 17 في توروس–ليترو. وهي ليست حطاماً. إنها مركبات متوقفة، ما زالت تحمل بعض عتاد مهماتها وغبارها.",
          "وهي أيضاً نوع مختلف من آثار القمر عن مركبة الهبوط أو العلم. فالعربة آلة صُنعت لتتحرك، وموقعها الأخير يسجل آخر قرار اتخذه سائقها: توقف هنا، أدر العجلات، وامشِ بعيداً.",
        ],
      },
      echo: {
        en: "A car is a promise that you can go somewhere. These three kept that promise, then stopped.",
        ar: "السيارة وعد بأنك تستطيع الذهاب إلى مكان ما. وقد أوفت الثلاث بذلك الوعد، ثم توقفت.",
      },
      facts: [
        {
          label: { en: "Apollo 15 rover", ar: "عربة أبولو 15" },
          value: { en: "Hadley-Apennine", ar: "هادلي–أبينين" },
        },
        {
          label: { en: "Apollo 16 rover", ar: "عربة أبولو 16" },
          value: { en: "Descartes Highlands", ar: "مرتفعات ديكارت" },
        },
        {
          label: { en: "Apollo 17 rover", ar: "عربة أبولو 17" },
          value: { en: "Taurus-Littrow", ar: "توروس–ليترو" },
        },
        {
          label: { en: "Returned to Earth", ar: "عادت إلى الأرض" },
          value: { en: "None of the three", ar: "لا واحدة من الثلاث" },
        },
      ],
    },
    {
      id: "legacy",
      kind: "legacy",
      eyebrow: { en: "Chapter six", ar: "الفصل السادس" },
      title: { en: "What Remains", ar: "ما الذي يبقى" },
      summary: {
        en: "About 90 kilometres of driving, three parked cars, and the reach that a set of wheels gave to science.",
        ar: "نحو 90 كيلومتراً من القيادة، وثلاث سيارات متوقفة، والمدى الذي منح العلمَ عجلات.",
      },
      narrative: {
        en: [
          "The rovers changed what a lunar landing could accomplish. Before them, an astronaut could visit only what they could walk to; after them, a crew could survey kilometres of terrain in a day and choose their samples deliberately, from real geological variety.",
          "Driving on the Moon was harder than it looked. Dust coated everything and ground into the moving parts, small pieces came loose and had to be fixed with what the crew carried, and every kilometre spent battery that nothing could recharge. The cars did their jobs anyway.",
          "Three rovers remain on the Moon, parked at Hadley-Apennine, Descartes and Taurus-Littrow. They are the only vehicles ever driven on another world that were built for people to sit in — and no one has driven a car anywhere beyond Earth since December 1972.",
          "A car is a promise that you can go somewhere. These three were built knowing they would be left behind — and they kept the promise anyway, for as long as their crews needed them.",
        ],
        ar: [
          "غيّرت العربات ما يمكن أن ينجزه الهبوط على القمر. فقبلها لم يكن رائد الفضاء يستطيع زيارة إلا ما يبلغه مشيه؛ وبعدها صار الطاقم يستطيع مسح كيلومترات من التضاريس في يوم واحد، ويختار عيناته بعناية من تنوع جيولوجي حقيقي.",
          "كانت القيادة على القمر أصعب مما يبدو. فالغبار يكسو كل شيء ويتداخل مع الأجزاء المتحركة، وتنفكّ قطع صغيرة لا بدّ من إصلاحها بما يحمله الطاقم، وكل كيلومتر ينفد من البطارية ما لا يستطيع شيء إعادة شحنه. ومع ذلك أدت السيارات مهمتها.",
          "وثلاث عربات ما زالت على القمر، متوقفة في هادلي–أبينين وديكارت وتوروس–ليترو. وهي المركبات الوحيدة التي سِير بها على عالم آخر وصُممت ليجلس فيها الناس — ولم تقُد سيارة في أي مكان خارج الأرض منذ ديسمبر 1972.",
          "السيارة وعد بأنك تستطيع الذهاب إلى مكان ما. وقد صُنعت هذه الثلاث عالمة بأنها ستُترك خلفاً — وأوفت بالوعد رغم ذلك، طالما احتاجها طاقمها.",
        ],
      },
      echo: {
        en: "Some machines are built to come home. These were built knowing they would not — and nothing about that stopped them working.",
        ar: "بعض الآلات تُبنى لتعود إلى الوطن. أما هذه فقد صُنعت عالمة بأنها لن تعود — ولم يمنعها ذلك من العمل.",
      },
      facts: [
        {
          label: { en: "Total driven", ar: "إجمالي المسافة" },
          value: {
            en: "About 90 km across three missions.",
            ar: "نحو 90 كم في ثلاث مهمات.",
          },
        },
        {
          label: { en: "Last drive", ar: "آخر قيادة" },
          value: {
            en: "Apollo 17, December 1972 — no rover has been driven on the Moon since.",
            ar: "أبولو 17، ديسمبر 1972 — ولم تقُد عربة على القمر منذ ذلك الحين.",
          },
        },
        {
          label: { en: "Still parked", ar: "ما زالت متوقفة" },
          value: {
            en: "All three rovers, where their crews left them.",
            ar: "العربات الثلاث، حيث تركها أطقمها.",
          },
        },
      ],
    },
  ],
  legacyStatement: {
    en: "The Moon has no roads, but it has three parked cars.",
    ar: "لا طرق على القمر، لكن فيه ثلاث سيارات متوقفة.",
  },
  tags: ["moon", "rover", "remnant"],
  artifactId: "apollo-15-lunar-rover",
  sourceIds: [
    "SRC-NSSDCA-LRV",
    "SRC-LRV",
    "SRC-ALSJ-A15-LRV",
    "SRC-NASA-APOLLO-15",
  ],
  relatedStorySlugs: ["apollo-11-lm-descent-stage", "apollo-lunar-surface-experiments"],
  echoIntro: {
    en: "Come and look at the only cars ever driven on another world. They are still there, with the keys gone.",
    ar: "تعال وانظر إلى السيارات الوحيدة التي سِير بها على عالم آخر. ما زالت هناك، وقد ذهبت مفاتيحها.",
  },
  echoSignoff: {
    en: "Three cars, three parking spaces, one very quiet garage.",
    ar: "ثلاث سيارات، وثلاثة أماكن وقوف، ومرآب هادئ جداً.",
  },
  lastVerified: "2026-11-14",
};
