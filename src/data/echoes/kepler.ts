import type { EchoStory } from "@/types/echo";
import { echoImage } from "./media";

/**
 * KEPLER SPACE TELESCOPE — NASA's planet hunter that showed planets
 * are more numerous than stars in our galaxy.
 *
 * Sources: NASA Science Kepler mission pages and the NSSDCA Kepler record.
 */
export const keplerStory: EchoStory = {
  id: "kepler",
  slug: "kepler",
  title: {
    en: "Kepler Space Telescope",
    ar: "تلسكوب كيبلر الفضائي",
  },
  storyTitle: {
    en: "Looking Across the Stars",
    ar: "النظر عبر النجوم",
  },
  dek: {
    en: "NASA's premier planet hunter discovered thousands of exoplanets before drifting into a quiet Earth-trailing orbit.",
    ar: "اكتشف صائد الكواكب الرائد التابع لناسا آلاف الكواكب خارج المجموعة الشمسية قبل أن ينجرف في مدار هادئ متأخر عن الأرض.",
  },
  summary: {
    en: "Kepler launched in 2009 to search for Earth-sized worlds orbiting other stars. Staring continuously at more than 150,000 stars in Cygnus and Lyra, it measured tiny dips in brightness caused by transiting planets. When two reaction wheels failed in 2013, engineers used sunlight pressure to stabilize the spacecraft, creating the K2 mission. When its fuel ran out in October 2018, Kepler was retired into an Earth-trailing heliocentric orbit, leaving behind more than 2,600 confirmed planets.",
    ar: "انطلق كيبلر في عام 2009 للبحث عن عوالم بحجم الأرض تدور حول نجوم أخرى. ومن خلال التحديق المستمر في أكثر من 150,000 نجم، قاس انخفاضات دقيقة في السطوع ناتجة عن عبور الكواكب. وعندما تعطلت عجلتا توجيه في 2013، استخدم المهندسون ضغط ضوء الشمس لتثبيت المركبة، مطلقين مهمة K2 المستعادة، وعندما نفد وقودها في أكتوبر 2018، تقاعد كيبلر في مدار شمسي متأخر عن الأرض، تاركاً وراءه أكثر من 2,600 كوكب مؤكد.",
  },
  location: {
    en: "Earth-trailing heliocentric orbit",
    ar: "مدار شمسي متأخر عن الأرض",
  },
  locationNote: {
    en: "Kepler does not orbit Earth or rest on any planetary surface. It circles the Sun behind Earth at an orbital period of about 372.5 days.",
    ar: "لا يدور كيبلر حول الأرض ولا يستقر على سطح أي كوكب. بل يدور حول الشمس خلف الأرض بفترة مدارية تبلغ نحو 372.5 يوماً.",
  },
  equipmentType: {
    en: "Exoplanet transit observatory",
    ar: "مرصد فضائي لعبور الكواكب",
  },
  missionPeriod: {
    en: "Launch 6 March 2009 · Prime mission 2009–2013 · K2 mission 2014–2018 · Retired 30 October 2018",
    ar: "الإطلاق 6 مارس 2009 · المهمة الرئيسية 2009–2013 · مهمة K2 2014–2018 · التقاعد 30 أكتوبر 2018",
  },
  missionStatus: {
    en: "Mission complete — retired on 30 October 2018 after nine years of observations.",
    ar: "اكتملت المهمة — تقاعد في 30 أكتوبر 2018 بعد تسع سنوات من الرصد.",
  },
  hardwareStatus: {
    en: "Inactive — drifting silently in an Earth-trailing heliocentric orbit with exhausted fuel.",
    ar: "غير نشط — ينجرف بصمت في مدار شمسي متأخر عن الأرض بعد نفاد وقوده.",
  },
  statusKind: "complete",
  accent: "#4C72B0",
  accentSoft: "#D8E2F0",
  badge: {
    en: "Planet Hunter",
    ar: "صائد الكواكب",
  },
  badgeKey: "planet-hunter",
  hero: echoImage("PIA11825", {
    alt: {
      en: "Artist concept of the Kepler spacecraft searching for planets in deep space.",
      ar: "تصور فني لمركبة كيبلر الفضائية وهي تبحث عن كواكب في الفضاء العميق.",
    },
    caption: {
      en: "An artist's concept of Kepler in its heliocentric orbit. Kepler observed the same patch of sky for four years during its prime mission.",
      ar: "تصور فني لكيبلر في مداره حول الشمس. راقب كيبلر الرقعة نفسها من السماء طوال أربع سنوات خلال مهمته الرئيسية.",
    },
  }),
  gallery: [
    echoImage("PIA11733", {
      alt: {
        en: "The Kepler spacecraft being prepared in a clean room before launch.",
        ar: "تجهيز مركبة كيبلر الفضائية داخل غرفة معقمة قبل الإطلاق.",
      },
      caption: {
        en: "Kepler at Ball Aerospace before launch. The telescope featured a 1.4-meter primary mirror and a 95-megapixel camera array.",
        ar: "كيبلر في شركة بول إيروسبيس قبل الإطلاق. تميز التلسكوب بمرآة رئيسية بقطر 1.4 متر ومصفوفة كاميرات بدقة 95 ميغابكسل.",
      },
    }),
    echoImage("PIA22193", {
      alt: {
        en: "Illustration comparing the eight planets of the Kepler-90 system with our solar system.",
        ar: "رسم يقارن الكواكب الثمانية لنظام كيبلر-90 بنظامنا الشمسي.",
      },
      caption: {
        en: "The Kepler-90 system compared to our solar system. The discovery of Kepler-90i made it the first known star other than the Sun with eight planets.",
        ar: "مقارنة نظام كيبلر-90 بنظامنا الشمسي. جعل اكتشاف كيبلر-90i هذا النظام أول نجم معروف غير الشمس يمتلك ثمانية كواكب.",
      },
    }),
    echoImage("PIA23689", {
      alt: {
        en: "Artist illustration of exoplanet Kepler-1649c orbiting in its star's habitable zone.",
        ar: "رسم فني للكوكب الخارجي كيبلر-1649c وهو يدور في المنطقة الصالحة للحياة لنجمه.",
      },
      caption: {
        en: "Kepler-1649c, an Earth-sized world orbiting in its red dwarf star's habitable zone, identified in archived Kepler data.",
        ar: "كيبلر-1649c، عالم بحجم الأرض يدور في المنطقة الصالحة للحياة لنجمه القزم الأحمر، حُدد من بيانات كيبلر المؤرشفة.",
      },
    }),
  ],
  facts: [
    {
      label: { en: "Telescope aperture", ar: "فتحة التلسكوب" },
      value: { en: "1.4-meter primary mirror", ar: "مرآة رئيسية بقطر 1.4 متر" },
    },
    {
      label: { en: "Photometer array", ar: "مصفوفة القياس الضوئي" },
      value: { en: "42 CCD sensors (95 megapixels)", ar: "42 حساساً ضوئياً (95 ميغابكسل)" },
    },
    {
      label: { en: "Monitored stars", ar: "النجوم المراقبة" },
      value: { en: "More than 150,000 simultaneously", ar: "أكثر من 150,000 في وقت واحد" },
    },
    {
      label: { en: "Confirmed exoplanets", ar: "الكواكب المؤكدة" },
      value: { en: "More than 2,600 planets", ar: "أكثر من 2,600 كوكب" },
    },
    {
      label: { en: "Orbital period", ar: "الفترة المدارية" },
      value: { en: "372.5 days around the Sun", ar: "372.5 يوماً حول الشمس" },
    },
    {
      label: { en: "Retirement date", ar: "تاريخ التقاعد" },
      value: { en: "30 October 2018", ar: "30 أكتوبر 2018" },
    },
  ],
  chapters: [
    {
      id: "meet",
      kind: "meet",
      eyebrow: { en: "Chapter one", ar: "الفصل الأول" },
      title: { en: "The Unblinking Eye", ar: "العين الساهرة" },
      summary: {
        en: "A space telescope designed to measure microscopic changes in the brightness of thousands of distant stars.",
        ar: "تلسكوب فضائي صُمم لقياس تغيرات متناهية الصغر في سطوع آلاف النجوم البعيدة.",
      },
      narrative: {
        en: [
          "Before Kepler, astronomers knew that planets circled other stars, but almost all known exoplanets were massive gas giants close to their suns. No instrument had the stability to detect Earth-sized worlds. Kepler was designed for that single question: how common are planets like Earth in our galaxy?",
          "To find them, Kepler used the transit method. When a planet crosses between its host star and the observer, it blocks a tiny fraction of the starlight. For an Earth-sized world crossing a Sun-like star, that dimming is only about one part in 10,000 — equivalent to spotting a flea crossing a car headlight from miles away.",
          "Earth's atmosphere blurs starlight far too much for ground telescopes to reach that precision. By launching into space, Kepler avoided atmospheric turbulence and watched over 150,000 stars in Cygnus and Lyra without pause.",
        ],
        ar: [
          "قبل كيبلر، عرف الفلكيون أن الكواكب تدور حول نجوم أخرى، لكن معظم الكواكب المكتشفة كانت عمالقة غازية ضخمة وقريبة من شموسها. ولم يكن لدى أي مرصد الاستقرار الكافي لرصد عوالم بحجم الأرض. صُمم كيبلر للإجابة عن هذا السؤال الفردي: ما مدى شيوع الكواكب المشابهة للأرض في مجرتنا؟",
          "وللعثور عليها، اعتمد كيبلر طريقة العبور الفلكي. فحين يمر كوكب بين نجمه والمراقب، يحجب جزءاً ضئيلاً جداً من ضوء النجم. وبالنسبة لكوكب بحجم الأرض يعبر أمام نجم شبيه بالشمس، فإن هذا الخفوت لا يتجاوز جزءاً واحداً من عشرة آلاف — وهو ما يعادل رصد برغوث يعبر أمام مصباح سيارة من مسافة أميال.",
          "يشوش الغلاف الجوي للأرض ضوء النجوم بدرجة تمنع التلسكوبات الأرضية من الوصول إلى تلك الدقة. ومن خلال إطلاقه إلى الفضاء، تجنب كيبلر الاضطرابات الجوية وراقب أكثر من 150,000 نجم دون انقطاع.",
        ],
      },
      echo: {
        en: "If you want to find tiny worlds around giant stars, you must learn to watch without blinking.",
        ar: "إذا أردت العثور على عوالم دقيقة حول نجوم عملاقة، فعليك أن تتعلم كيف تراقب دون أن تطرف لك عين.",
      },
      facts: [
        {
          label: { en: "Transit signal", ar: "إشارة العبور" },
          value: { en: "About 0.01% brightness dip", ar: "انخفاض بنحو 0.01% في السطوع" },
        },
        {
          label: { en: "Target field", ar: "حقل الرصد" },
          value: { en: "Constellations Cygnus and Lyra", ar: "كوكبتي الدجاجة والقيثارة" },
        },
        {
          label: { en: "Detector array", ar: "مصفوفة الكواشف" },
          value: { en: "42 CCD sensors covering 115 square degrees", ar: "42 حساساً تغطي 115 درجة مربعة" },
        },
      ],
      diagram: {
        kind: "instrument-components",
        title: { en: "What Kepler is made of", ar: "مكوّنات كيبلر" },
        intro: {
          en: "Select a marker to see what that part of the observatory did. The shapes here are a teaching diagram of the real spacecraft.",
          ar: "اختر أي علامة لتعرف وظيفة ذلك الجزء من المرصد. الأشكال هنا رسم تعليمي للمركبة الحقيقية.",
        },
        points: [
          {
            id: "aperture",
            x: 26,
            y: 30,
            label: { en: "Telescope aperture", ar: "فتحة التلسكوب" },
            detail: {
              en: "A wide Schmidt design with a 0.95-metre aperture and a 1.4-metre primary mirror, built to gather the light of thousands of stars at once instead of one at a time.",
              ar: "تصميم واسع من نوع شميت بفتحة 0.95 متر ومرآة رئيسية بقطر 1.4 متر، مصمَّم لجمع ضوء آلاف النجوم دفعة واحدة بدل نجم واحد في كل مرة.",
            },
          },
          {
            id: "focal-plane",
            x: 54,
            y: 52,
            label: { en: "CCD focal plane", ar: "السطح البؤري" },
            detail: {
              en: "42 light sensors with 95 megapixels, covering 115 square degrees of sky in one fixed view. Each star sits on the same pixel for years.",
              ar: "42 حساساً ضوئياً بدقة 95 ميغابكسل، تغطي 115 درجة مربعة من السماء في منظر ثابت واحد. ويظل كل نجم على الحساس نفسه لسنوات.",
            },
          },
          {
            id: "reaction-wheels",
            x: 22,
            y: 68,
            label: { en: "Reaction wheels", ar: "عجلات التوجيه" },
            detail: {
              en: "Four spinning wheels held the telescope steady enough to see a star dim by one part in ten thousand. When two of them failed, the mission found another way to balance.",
              ar: "أربع عجلات دوّارة أبقت التلسكوب ثابتاً بما يكفي لرؤية نجم يخفت جزءاً واحداً من عشرة آلاف. وحين تعطلت اثنتان منها، وجدت المهمة طريقة أخرى للموازنة.",
            },
          },
          {
            id: "solar-panels",
            x: 80,
            y: 40,
            label: { en: "Solar panels", ar: "الألواح الشمسية" },
            detail: {
              en: "They made the spacecraft's electricity — and in the mission's second life, sunlight pressing on them became the steadying force that kept Kepler pointed.",
              ar: "كانت تنتج كهرباء المركبة — وفي الحياة الثانية للمهمة، صار ضوء الشمس الذي يضغط عليها القوة المثبِّتة التي أبقت كيبلر موجهاً.",
            },
          },
        ],
      },
      quiz: [
        {
          id: "kepler-q1",
          prompt: {
            en: "How did Kepler detect planets orbiting distant stars?",
            ar: "كيف اكتشف كيبلر الكواكب التي تدور حول نجوم بعيدة؟",
          },
          options: [
            {
              id: "a",
              label: {
                en: "By measuring the tiny decrease in a star's brightness when a planet passes in front of it.",
                ar: "بقياس الانخفاض الضئيل في سطوع النجم حين يمر كوكب أمامه.",
              },
            },
            {
              id: "b",
              label: {
                en: "By taking direct photographs of planetary surfaces.",
                ar: "بالتقاط صور مباشرة لسطوح الكواكب.",
              },
            },
            {
              id: "c",
              label: {
                en: "By measuring radio transmissions from extraterrestrial worlds.",
                ar: "بقياس إشارات راديوية من عوالم أخرى.",
              },
            },
          ],
          correctOptionId: "a",
          explanation: {
            en: "Kepler used transit photometry: recording the minuscule drop in stellar brightness as an orbiting planet blocks part of the star's light.",
            ar: "استخدم كيبلر القياس الضوئي للعبور: تسجيل الانخفاض المتناهي في الصغر لسطوع النجم عند حجب الكوكب لجزء من ضوئه.",
          },
        },
      ],
    },
    {
      id: "mission",
      kind: "mission",
      eyebrow: { en: "Chapter two", ar: "الفصل الثاني" },
      title: { en: "Surviving on Solar Pressure", ar: "النجاة بضغط ضوء الشمس" },
      summary: {
        en: "When critical reaction wheels failed, engineers converted sunlight into a control system to give Kepler a second life.",
        ar: "عندما تعطلت عجلات التوجيه الحيوية، حوّل المهندسون ضوء الشمس إلى نظام تحكم ليمنحوا كيبلر حياة ثانية.",
      },
      narrative: {
        en: [
          "Kepler needed ultra-precise pointing to hold its targets on specific pixels for years. It relied on four gyroscope-like reaction wheels. In July 2012, wheel two failed. In May 2013, wheel four failed. With only two working wheels, the telescope could no longer hold a stable three-axis point in space.",
          "Most considered the mission over. But NASA engineers devised an ingenious rescue plan called K2. By orienting the spacecraft along the plane of Earth's orbit (the ecliptic), solar photon pressure was balanced symmetrically across the solar panels, acting as a virtual third wheel.",
          "The reborn K2 mission operated for another five years, shifting its gaze across different regions of the sky and discovering hundreds more planets, supernovas, and solar system objects.",
        ],
        ar: [
          "احتاج كيبلر إلى توجيه فائق الدقة لإبقاء أهدافه على الحساسات الضوئية ذاتها لسنوات. واعتمد في ذلك على أربع عجلات توجيه جيروسكوبية. وفي يوليو 2012 تعطلت العجلة الثانية، ثم تعطلت العجلة الرابعة في مايو 2013. ومع بقاء عجلتين فقط، لم يعد التلسكوب قادراً على الحفاظ على توجيه ثابت في المحاور الثلاثة.",
          "اعتقد كثيرون أن المهمة انتهت. لكن مهندسي ناسا ابتكروا خطة إنقاذ بارعة أطلقوا عليها اسم مهمة K2، فمن خلال توجيه المركبة في مستوى مسار الأرض حول الشمس، توازن ضغط فوتونات ضوء الشمس عبر الألواح الشمسية ليعمل كعجلة توجيه افتراضية ثالثة.",
          "استمرت مهمة K2 المستعادة لخمس سنوات إضافية، محولة رصدها عبر مناطق مختلفة من السماء، لتكتشف مئات الكواكب الإضافية والمستعرات العظمى وأجرام النظام الشمسي.",
        ],
      },
      echo: {
        en: "When machinery breaks in deep space, engineers use the physics of the universe to rebuild it.",
        ar: "عندما تتعطل الآلات في الفضاء العميق، يلجأ المهندسون إلى قوانين الكون الفيزيائية لإعادة بنائها.",
      },
      facts: [
        {
          label: { en: "Initial wheel failure", ar: "أول عطل في العجلات" },
          value: { en: "July 2012 (wheel two)", ar: "يوليو 2012 (العجلة الثانية)" },
        },
        {
          label: { en: "Second wheel failure", ar: "العطل الثاني في العجلات" },
          value: { en: "May 2013 (wheel four)", ar: "مايو 2013 (العجلة الرابعة)" },
        },
        {
          label: { en: "K2 stabilization method", ar: "طريقة تثبيت مهمة K2" },
          value: { en: "Solar radiation pressure balance", ar: "موازنة ضغط الإشعاع الشمسي" },
        },
      ],
      glossary: [
        {
          id: "transit-method",
          term: { en: "Transit method", ar: "طريقة العبور" },
          simple: {
            en: "Watching a star for the tiny dip in brightness caused when a planet crosses in front of it — like a moth passing before a lamp.",
            ar: "مراقبة نجم بحثاً عن الانخفاض الضئيل في سطوعه الناجم عن مرور كوكب أمامه — كعثة تمر أمام مصباح.",
          },
          technical: {
            en: "A transit repeats once per orbit, so several repeats confirm a planet and reveal its size and the length of its year.",
            ar: "يتكرر العبور مرة في كل مدار، فتؤكّد التكرارات وجود الكوكب وتكشف حجمه وطول سنته.",
          },
        },
        {
          id: "reaction-wheel",
          term: { en: "Reaction wheel", ar: "عجلة التوجيه" },
          simple: {
            en: "A spinning wheel inside the spacecraft. Speeding it up or slowing it down turns the spacecraft the other way, without using any fuel.",
            ar: "عجلة دوّارة داخل المركبة. تسريعها أو إبطاؤها يُدير المركبة في الاتجاه المعاكس، دون استخدام أي وقود.",
          },
          technical: {
            en: "Reaction wheels work on the conservation of angular momentum; three or four are needed to point freely in three dimensions.",
            ar: "تعمل عجلات التوجيه على انحفاظ الزخم الزاوي؛ ويلزم ثلاث أو أربع منها للتوجيه الحر في ثلاثة أبعاد.",
          },
        },
        {
          id: "habitable-zone",
          term: { en: "Habitable zone", ar: "المنطقة الصالحة للحياة" },
          simple: {
            en: "The band of distance around a star where a planet could hold liquid water on its surface — not too hot, and not too cold.",
            ar: "نطاق المسافة حول النجم حيث يمكن للكوكب أن يحتفظ بماء سائل على سطحه — لا حاراً جداً ولا بارداً جداً.",
          },
        },
      ],
      quiz: [
        {
          id: "kepler-q2",
          prompt: {
            en: "How did engineers keep Kepler pointed during the K2 mission?",
            ar: "كيف حافظ المهندسون على توجيه كيبلر خلال مهمة K2؟",
          },
          options: [
            {
              id: "a",
              label: {
                en: "They balanced the pressure of sunlight against the spacecraft's remaining two wheels.",
                ar: "وازنوا ضغط ضوء الشمس مع عجلتي التوجيه المتبقيتين.",
              },
            },
            {
              id: "b",
              label: {
                en: "They sent astronauts on a servicing mission to replace the broken gyroscopes.",
                ar: "أرسلوا رواد فضاء في مهمة صيانة لاستبدال الجيروسكوبات المعطلة.",
              },
            },
            {
              id: "c",
              label: {
                en: "They used gravitational pull from the Moon to steer the telescope.",
                ar: "استخدموا الجاذبية الناتجة عن القمر لتوجيه التلسكوب.",
              },
            },
          ],
          correctOptionId: "a",
          explanation: {
            en: "Engineers used solar radiation pressure along the ecliptic as a stabilizing third axis, allowing Kepler to continue observing for five more years.",
            ar: "استخدم المهندسون ضغط الإشعاع الشمسي على طول مسار البروج كمحور تثبيت ثالث، مما مكن كيبلر من مواصلة الرصد لخمس سنوات أخرى.",
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
        en: "Not a journey between worlds, but a journey to a seat — and then nine years of holding still.",
        ar: "ليست رحلة بين العوالم، بل رحلة إلى مقعد — ثم تسع سنوات من الثبات.",
      },
      narrative: {
        en: [
          "Kepler left Earth on a Delta II rocket in March 2009 and was placed not in orbit around Earth but in an orbit of its own around the Sun, trailing behind the planet at a distance that grows slowly with every year. It was a quiet, stable seat: far from Earth's glow and heat, with the Sun always at the same angle on the solar panels.",
          "First light came on 20 April 2009. A few weeks later Kepler turned to its single field of view — a patch of sky in the constellations Cygnus and Lyra — and began to stare. Its 0.95-metre photometer measured the brightness of about 150,000 stars over and over, building a light curve for each one, searching for the small dip that means a planet has passed.",
          "For four years it barely moved. The same stars, the same pixels, the same careful measurement — because the transit of an Earth-sized world lasts hours and repeats once a year, and missing one would mean waiting twelve months for it to happen again. Thousands of those dips accumulated into thousands of planet candidates.",
          "In 2013 the pointing failed: two of the four reaction wheels had broken, and the telescope could no longer hold its stare. Engineers rebuilt the mission anyway, balancing the spacecraft against the pressure of sunlight and turning it into the K2 mission, which surveyed new fields along the ecliptic for five more years before the fuel finally ran out.",
        ],
        ar: [
          "انطلق كيبلر على صاروخ دلتا 2 في مارس 2009، ووُضع ليس في مدار حول الأرض بل في مدار خاص به حول الشمس، يتأخر خلف كوكبنا بمسافة تزداد ببطء كل عام. وكان ذلك مقعداً هادئاً مستقراً: بعيداً عن وهج الأرض وحرارتها، والشمس في زاوية ثابتة على الألواح الشمسية.",
          "وجاء أول ضوء في 20 أبريل 2009. وبعد أسابيع قليلة التفت كيبلر نحو حقل رصده الوحيد — رقعة من السماء في كوكبتي الدجاجة والقيثارة — وبدأ يحدّق. وسجّل مقياسه الضوئي بفتحة 0.95 متر سطوع نحو 150,000 نجم مرة بعد مرة، يبني منحنى ضوء لكل منها، بحثاً عن الانخفاض الصغير الذي يعني مرور كوكب.",
          "ولأربع سنوات بالكاد تحرك. النجوم نفسها، والحساسات نفسها، والقياس الحذر نفسه — لأن عبور كوكب بحجم الأرض يستغرق ساعات يتكرر مرة في السنة، وضياع واحد يعني اثني عشر شهراً من الانتظار حتى يتكرر. وتراكمت آلاف تلك الانخفاضات إلى آلاف الكواكب المرشحة.",
          "وفي عام 2013 فشل التوجيه: فقد تعطلت عجلتان من العجلات الأربع، ولم يعد التلسكوب قادراً على الثبات في التحديق. وأعاد المهندسون بناء المهمة على أي حال، موازنين المركبة ضد ضغط ضوء الشمس ومحولينها إلى مهمة K2، التي مسحت حقولاً جديدة على طول مسار البروج خمس سنوات أخرى قبل أن ينفد الوقود أخيراً.",
        ],
      },
      echo: {
        en: "Kepler never went anywhere. It just watched — and watching, it found thousands of worlds.",
        ar: "لم يذهب كيبلر إلى أي مكان. فقط راقب — وبرصده وجد آلاف العوالم.",
      },
      timeline: [
        {
          id: "kepler-launch",
          date: "2009-03-06",
          dateLabel: { en: "6 March 2009", ar: "6 مارس 2009" },
          label: { en: "Launch", ar: "الإطلاق" },
          description: {
            en: "Kepler launched from Cape Canaveral on a Delta II rocket and began its journey to an orbit around the Sun trailing behind Earth.",
            ar: "انطلق كيبلر من كيب كانافيرال على صاروخ دلتا 2 وبدأ رحلته إلى مدار حول الشمس يتأخر خلف الأرض.",
          },
          type: "launch",
          sourceIds: ["SRC-NASA-KEPLER"],
        },
        {
          id: "kepler-first-light",
          date: "2009-04-20",
          dateLabel: { en: "20 April 2009", ar: "20 أبريل 2009" },
          label: { en: "First light", ar: "أول ضوء" },
          description: {
            en: "Kepler's photometer returned its first images, and the telescope began measuring the brightness of its target stars.",
            ar: "أعاد مقياس كيبلر الضوئي أول صوره، وبدأ التلسكوب قياس سطوع نجومه المستهدفة.",
          },
          type: "first-operation",
          sourceIds: ["SRC-NASA-KEPLER"],
        },
        {
          id: "kepler-prime-end",
          date: "2013-07",
          dateLabel: { en: "July 2013", ar: "يوليو 2013" },
          label: { en: "Prime mission ends", ar: "نهاية المهمة الرئيسية" },
          description: {
            en: "With two reaction wheels broken — the second having failed in July 2013 — the telescope could no longer hold its original stare, and the prime mission ended.",
            ar: "مع تعطل عجلتي توجيه — إحداهما في يوليو 2013 — لم يعد التلسكوب قادراً على مواصلة تحديقه الأصلي، فانتهت المهمة الرئيسية.",
          },
          type: "milestone",
          sourceIds: ["SRC-NSSDCA-KEPLER"],
        },
        {
          id: "kepler-k2",
          date: "2014-05",
          dateLabel: { en: "May 2014", ar: "مايو 2014" },
          label: { en: "K2 mission begins", ar: "بداية مهمة K2" },
          description: {
            en: "Balanced against the pressure of sunlight, the rebuilt telescope began the K2 mission, surveying new fields along the ecliptic until 2018.",
            ar: "بعد موازنته بضغط ضوء الشمس، بدأ التلسكوب المُعاد بناؤه مهمة K2، فيمسح حقولاً جديدة على طول مسار البروج حتى 2018.",
          },
          type: "milestone",
          sourceIds: ["SRC-NASA-KEPLER"],
        },
        {
          id: "kepler-retire",
          date: "2018-11-15",
          dateLabel: { en: "15 November 2018", ar: "15 نوفمبر 2018" },
          label: { en: "Mission retired", ar: "تقاعد المهمة" },
          description: {
            en: "After fuel exhaustion was announced on 30 October 2018, NASA retired Kepler, leaving more than 2,600 confirmed planets in its catalogue.",
            ar: "بعد إعلان نفاد الوقود في 30 أكتوبر 2018، أحلت ناسا كيبلر إلى التقاعد، تاركةً في فهرسه أكثر من 2,600 كوكب مؤكد.",
          },
          type: "end-of-mission",
          sourceIds: ["SRC-NASA-KEPLER"],
        },
      ],
      diagram: {
        kind: "journey-map",
        title: { en: "From launch pad to a staring orbit", ar: "من منصة الإطلاق إلى مدار التحديق" },
        intro: {
          en: "Kepler did not travel between worlds. It travelled to a seat — and then sat still for nine years.",
          ar: "لم يسافر كيبلر بين العوالم. بل سافر إلى مقعد — ثم جلس ساكناً تسع سنوات.",
        },
        route: [
          {
            label: { en: "Launch", ar: "الإطلاق" },
            description: { en: "A Delta II rocket, March 2009", ar: "صاروخ دلتا 2، مارس 2009" },
          },
          {
            label: { en: "Orbit", ar: "المدار" },
            description: {
              en: "An orbit around the Sun trailing behind Earth",
              ar: "مدار حول الشمس يتأخر خلف الأرض",
            },
          },
          {
            label: { en: "First light", ar: "أول ضوء" },
            description: {
              en: "The first images, 20 April 2009",
              ar: "أول الصور، 20 أبريل 2009",
            },
          },
          {
            label: { en: "The stare", ar: "التحديق" },
            description: {
              en: "About 150,000 stars in Cygnus and Lyra, 2009–2013",
              ar: "نحو 150,000 نجم في الدجاجة والقيثارة، 2009–2013",
            },
          },
          {
            label: { en: "K2 and retirement", ar: "K2 والتقاعد" },
            description: {
              en: "New fields along the ecliptic, 2014–2018",
              ar: "حقول جديدة على طول مسار البروج، 2014–2018",
            },
          },
        ],
        points: [
          {
            id: "earth",
            x: 12,
            y: 62,
            label: { en: "Earth", ar: "الأرض" },
            detail: { en: "Launch in March 2009.", ar: "الإطلاق في مارس 2009." },
          },
          {
            id: "orbit",
            x: 38,
            y: 40,
            label: { en: "Earth-trailing orbit", ar: "مدار متأخر عن الأرض" },
            detail: {
              en: "A quiet seat around the Sun, far from Earth's glow.",
              ar: "مقعد هادئ حول الشمس، بعيداً عن وهج الأرض.",
            },
          },
          {
            id: "cygnus",
            x: 62,
            y: 74,
            label: { en: "Cygnus and Lyra", ar: "الدجاجة والقيثارة" },
            detail: {
              en: "One field of view, watched without pause for four years.",
              ar: "حقل رصد واحد، يُراقب دون انقطاع أربع سنوات.",
            },
          },
          {
            id: "k2",
            x: 88,
            y: 32,
            label: { en: "K2 fields", ar: "حقول K2" },
            detail: {
              en: "New fields along the ecliptic until the fuel ran out in 2018.",
              ar: "حقول جديدة على طول مسار البروج حتى نفاد الوقود في 2018.",
            },
          },
        ],
      },
    },
    {
      id: "discoveries",
      kind: "discoveries",
      eyebrow: { en: "Chapter four", ar: "الفصل الرابع" },
      title: { en: "A Census of Worlds", ar: "إحصاء العوالم" },
      summary: {
        en: "More than 2,600 confirmed planets, showing that our galaxy holds more planets than stars.",
        ar: "أكثر من 2,600 كوكب مؤكد، مما أثبت أن مجرتنا تحتوي على كواكب أكثر من النجوم.",
      },
      narrative: {
        en: [
          "Kepler fundamentally changed our understanding of the cosmos. Before its launch, we did not know if planetary systems like ours were common or extraordinarily rare. Kepler showed that planets are everywhere: on average, every star in the Milky Way hosts at least one planet.",
          "The mission discovered worlds unlike anything in our solar system: super-Earths (rocky worlds larger than Earth but smaller than Neptune), hot Jupiters, planets orbiting binary star systems with two suns, and compact multi-planet systems.",
          "Among its most celebrated findings was Kepler-90, a solar system with eight planets, matching our own solar system in planet count. Kepler also identified small, rocky worlds orbiting within the habitable zone where liquid water could exist on a surface.",
        ],
        ar: [
          "غير كيبلر نظرتنا للكون جذرياً. فقبل إطلاقه، لم نكن نعلم ما إذا كانت الأنظمة الكوكبية المشابهة لنظامنا شائعة أم نادرة للغاية. وأثبت كيبلر أن الكواكب موجودة في كل مكان: في المتوسط، يحمل كل نجم في مجرة درب التبانة كوكباً واحداً على الأقل.",
          "واكتشفت المهمة عوالم لا مثيل لها في نظامنا الشمسي: أراضي فائقة (عوالم صخرية أكبر من الأرض لكنها أصغر من نبتون)، ومشتروات حارة، وكواكب تدور حول أنظمة نجوم ثنائية بشمسين، وأنظمة كوكبية متعددة ومتقاربة.",
          "ومن بين أبرز اكتشافاته نظام كيبلر-90، وهو نظام يضم ثمانية كواكب، متساوياً مع نظامنا الشمسي في عدد الكواكب. كما حدد كيبلر عوالم صخرية صغيرة تدور في المنطقة الصالحة للحياة حيث يمكن للماء السائل أن يوجد على السطح.",
        ],
      },
      echo: {
        en: "Our solar system is not an anomaly. The sky is full of worlds waiting to be explored.",
        ar: "نظامنا الشمسي ليس استثناءً وحيداً. فالسماء مليئة بعوالم تنتظر من يستكشفها.",
      },
      facts: [
        {
          label: { en: "Confirmed planets", ar: "الكواكب المؤكدة" },
          value: { en: "2,662 planets cataloged", ar: "2,662 كوكباً مفهرساً" },
        },
        {
          label: { en: "Candidate worlds", ar: "الكواكب المرشحة" },
          value: { en: "Thousands still being analyzed", ar: "آلاف لا تزال قيد التحليل" },
        },
        {
          label: { en: "Average frequency", ar: "المعدل الوسطي" },
          value: { en: "At least one planet per star in the galaxy", ar: "كوكب واحد على الأقل لكل نجم في المجرة" },
        },
      ],
      discoveries: [
        {
          id: "kepler-d1",
          title: { en: "Planets outnumber stars", ar: "الكواكب تفوق النجوم عدداً" },
          question: {
            en: "How common are planets in the Milky Way galaxy?",
            ar: "ما مدى انتشار الكواكب في مجرة درب التبانة؟",
          },
          instrument: {
            en: "Kepler photometer and automated transit pipeline",
            ar: "مقياس كيبلر الضوئي ومنظومة تحليل العبور الآلية",
          },
          method: {
            en: "Statistical analysis of thousands of transit signals across 150,000 monitored stars.",
            ar: "التحليل الإحصائي لآلاف إشارات العبور عبر 150,000 نجم مراقب.",
          },
          data: {
            en: "More than 2,600 confirmed planets, establishing that planetary formation is a standard outcome of stellar evolution.",
            ar: "أكثر من 2,600 كوكب مؤكد، مما أثبت أن تشكل الكواكب نتيجة طبيعية لتطور النجوم.",
          },
          finding: {
            en: "Planets are common throughout the galaxy, with small rocky planets being especially numerous.",
            ar: "الكواكب شائعة في أرجاء المجرة، وتعتبر الكواكب الصخرية الصغيرة وفيرة للغاية.",
          },
          significance: {
            en: "Shifted exoplanet science from asking whether planets exist to characterizing their atmospheres and habitability.",
            ar: "نقل علم الكواكب الخارجية من التساؤل عن وجودها إلى دراسة أغلفتها الجوية وقابليتها للحياة.",
          },
          sourceIds: ["SRC-NASA-KEPLER", "SRC-NSSDCA-KEPLER"],
        },
        {
          id: "kepler-d2",
          title: { en: "Eight-planet system Kepler-90", ar: "نظام كيبلر-90 ذو الكواكب الثمانية" },
          question: {
            en: "Can other stars host as many planets as our Sun?",
            ar: "هل يمكن لنجوم أخرى أن تستضيف عدداً من الكواكب مثل شمسنا؟",
          },
          instrument: {
            en: "Kepler archival light curves analyzed with machine learning",
            ar: "منحنيات ضوء كيبلر المؤرشفة المحللة بالتعلم الآلي",
          },
          method: {
            en: "Neural networks searched archived light curves for weak transit signals missed in initial scans.",
            ar: "بحثت الشبكات العصبية في منحنيات الضوء المؤرشفة عن إشارات عبور ضعيفة أغفلتها الفحوصات الأولى.",
          },
          data: {
            en: "Detection of Kepler-90i, confirming an eighth planet in the Kepler-90 system.",
            ar: "اكتشاف الكوكب كيبلر-90i، مؤكداً وجود كوكب ثامن في نظام كيبلر-90.",
          },
          finding: {
            en: "The first known star besides our Sun to host at least eight planets.",
            ar: "أول نجم معروف غير شمسنا يستضيف ثمانية كواكب على الأقل.",
          },
          significance: {
            en: "Demonstrated that rich, multi-planet architectures exist around distant stars.",
            ar: "أثبت وجود أنظمة كوكبية غنية ومتعددة الكواكب حول نجوم بعيدة.",
          },
          sourceIds: ["SRC-NASA-KEPLER", "SRC-NSSDCA-KEPLER"],
        },
      ],
    },
    {
      id: "ending",
      kind: "ending",
      eyebrow: { en: "Chapter five", ar: "الفصل الخامس" },
      title: { en: "A Permanent Celestial Orbit", ar: "مدار سماوي دائم" },
      summary: {
        en: "Having spent every drop of fuel, Kepler was decommissioned into an Earth-trailing orbit around the Sun.",
        ar: "بعد استنفاد آخر قطرة وقود، أُحيل كيبلر إلى التقاعد في مدار يتبع الأرض حول الشمس.",
      },
      narrative: {
        en: [
          "In October 2018, Kepler's fuel tank ran dry. Without hydrazine, the spacecraft could no longer fire its thrusters to maintain pointing or orient its antenna toward Earth. NASA sent final commands to disable its transmitters and sleep its systems on 30 October 2018.",
          "Kepler was not crashed into a planet or burned in Earth's atmosphere. It remains in an Earth-trailing heliocentric orbit, traveling around the Sun approximately 94 million miles from Earth. Its orbit is stable for centuries.",
          "The spacecraft stands as a monument to human curiosity — an inactive machine coasting quietly through interplanetary space, having answered one of humanity's oldest questions.",
        ],
        ar: [
          "في أكتوبر 2018، فرغ خزان وقود كيبلر بالكامل. وبدون الهيدرازين، لم يعد بإمكان المركبة تشغيل دافعاتها للحفاظ على التوجيه أو توجيه هوائياتها نحو الأرض. وأرسلت ناسا أوامر أخيرة لإيقاف أجهزة الإرسال وتهدئة أنظمتها في 30 أكتوبر 2018.",
          "لم يصطدم كيبلر بأي كوكب ولم يحترق في الغلاف الجوي للأرض. بل بقي في مدار شمسي متأخر عن الأرض، مسافراً حول الشمس على بعد نحو 94 مليون ميل من كوكبنا، في مدار مستقر لقرون قادمة.",
          "تقف هذه المركبة كنصب تذكاري لفضول الإنسان — آلة غير نشطة تنجرف بهدوء في الفضاء بين الكواكب، بعد أن أجابت عن واحد من أقدم أسئلة البشرية.",
        ],
      },
      echo: {
        en: "Kepler's fuel is gone, but the maps it drew of other worlds will guide observers for generations.",
        ar: "نفد وقود كيبلر، لكن الخرائط التي رسمها لعوالم أخرى سترشد المستكشفين لأجيال قادمة.",
      },
      facts: [
        {
          label: { en: "Decommissioning date", ar: "تاريخ التقاعد الرسمي" },
          value: { en: "30 October 2018", ar: "30 أكتوبر 2018" },
        },
        {
          label: { en: "Final disposition", ar: "الوضع النهائي" },
          value: { en: "Earth-trailing heliocentric orbit", ar: "مدار شمسي متأخر عن الأرض" },
        },
        {
          label: { en: "Cause of mission end", ar: "سبب نهاية المهمة" },
          value: { en: "Hydrazine fuel exhaustion", ar: "نفاد وقود الهيدرازين" },
        },
        {
          label: { en: "Distance from Earth", ar: "المسافة عن الأرض" },
          value: { en: "Slowly drifting millions of kilometers behind", ar: "تنجرف ببطء ملايين الكيلومترات في الخلف" },
        },
      ],
    },
    {
      id: "legacy",
      kind: "legacy",
      eyebrow: { en: "Chapter six", ar: "الفصل السادس" },
      title: { en: "What Remains", ar: "ما الذي يبقى" },
      summary: {
        en: "A catalogue that is still working, and a question that changed shape because of it.",
        ar: "فهرس لا يزال يعمل، وسؤال تغيّر شكله بسببه.",
      },
      narrative: {
        en: [
          "Before Kepler we knew of a few hundred planets beyond the solar system. After Kepler we know that planets outnumber stars. That change came from one measurement repeated carefully for nine years: the brightness of a star, recorded again and again until the small dips in it could be read like a page.",
          "The catalogue is still working. Kepler's archive keeps yielding planets found in old data — small rocky worlds in habitable zones, systems as rich as the eight-planet Kepler-90 — and every transit search since has used methods Kepler made routine. The question moved with it: not whether planets exist, but what their skies are made of.",
          "The telescope itself drifts behind Earth in a stable orbit around the Sun, silent and out of fuel. It will never be serviced and it will never return. But the map it drew of other worlds is permanent, and every planet hunter that follows navigates by it.",
        ],
        ar: [
          "قبل كيبلر كنا نعرف بضعة مئات من الكواكب خارج النظام الشمسي. وبعد كيبلر عرفنا أن الكواكب تفوق النجوم عدداً. جاء هذا التغيير من قياس واحد كُرر بحذر تسع سنوات: سطوع نجم، يُسجَّل مرة بعد مرة حتى صارت الانخفاضات الصغيرة فيه تُقرأ كصفحة.",
          "والفهرس لا يزال يعمل. فأرشيف كيبلر يستمر في إخراج كواكب وُجدت في بيانات قديمة — عوالم صخرية صغيرة في مناطق صالحة للحياة، وأنظمة غنية كنظام كيبلر-90 ذي الكواكب الثمانية — وكل بحث عن العبور منذ ذلك الحين استخدم طرقاً جعلها كيبلر روتينية. وانتقل السؤال معها: ليس هل توجد الكواكب، بل ممّ يتكوّن سماؤها.",
          "أما التلسكوب نفسه فينجرف خلف الأرض في مدار مستقر حول الشمس، صامتاً وقد نفد وقوده. ولن يُصان ولن يعود أبداً. لكن الخريطة التي رسمها لعوالم أخرى دائمة، وكل صائد كواكب يأتي بعده يهتدي بها.",
        ],
      },
      echo: {
        en: "Kepler proved that the sky is full of worlds. The searching has only just begun.",
        ar: "أثبت كيبلر أن السماء مليئة بالعوالم. والبحث بدأ للتو.",
      },
      facts: [
        {
          label: { en: "Confirmed planets", ar: "الكواكب المؤكدة" },
          value: {
            en: "More than 2,600 worlds found in Kepler's data.",
            ar: "أكثر من 2,600 عالم وُجد في بيانات كيبلر.",
          },
        },
        {
          label: { en: "What it proved", ar: "ما أثبته" },
          value: {
            en: "Planets are more common than stars in the Milky Way.",
            ar: "الكواكب أكثر شيوعاً من النجوم في مجرة درب التبانة.",
          },
        },
        {
          label: { en: "Still working", ar: "لا يزال يعمل" },
          value: {
            en: "Its archive keeps revealing new planets, years after the mission ended.",
            ar: "أرشيفه يستمر في كشف كواكب جديدة، بعد سنوات من انتهاء المهمة.",
          },
        },
      ],
    },
  ],
  legacyStatement: {
    en: "Kepler proved that planets outnumber stars in our galaxy, transforming humanity's search for life among the stars.",
    ar: "أثبت كيبلر أن الكواكب تفوق النجوم عدداً في مجرتنا، مغيراً بحث البشرية عن الحياة بين النجوم.",
  },
  tags: ["deep-space", "instrument", "remnant"],
  artifactId: "kepler",
  sourceIds: ["SRC-NASA-KEPLER", "SRC-NSSDCA-KEPLER"],
  relatedStorySlugs: ["dawn", "near-shoemaker", "pioneer-10"],
  echoIntro: {
    en: "This space telescope stared at thousands of distant stars without blinking. Come discover the planets it revealed.",
    ar: "حدق هذا التلسكوب الفضائي في آلاف النجوم البعيدة دون أن يرمش. تعال واكتشف الكواكب التي كشف عنها.",
  },
  echoSignoff: {
    en: "Kepler continues to drift silently around the Sun, leaving behind a map of worlds we are only beginning to understand.",
    ar: "يواصل كيبلر الانجراف بصمت حول الشمس، تاركاً وراءه خريطة لعوالم بدأنا للتو في فهمها.",
  },
  lastVerified: "2026-11-14",
};
