import type { EchoStory } from "@/types/echo";
import { echoImage } from "./media";

/**
 * DAWN — the first spacecraft to orbit two different worlds.
 *
 * Sources: the NASA Dawn mission page and the NSSDCA Dawn record.
 */
export const dawnStory: EchoStory = {
  id: "dawn",
  slug: "dawn",
  title: {
    en: "Dawn",
    ar: "دون",
  },
  storyTitle: {
    en: "One Spacecraft, Two Worlds",
    ar: "مركبة واحدة وعالَمان",
  },
  dek: {
    en: "Dawn used a gentle ion engine to orbit asteroid Vesta, leave it, and then orbit dwarf planet Ceres — a first in planetary exploration.",
    ar: "استخدمت دون محركاً أيونياً هادئاً لتطوف حول الكويكب فيستا، ثم تغادره وتطوف حول الكوكب القزم سيريس — وهو الأول من نوعه في استكشاف الكواكب.",
  },
  summary: {
    en: "Dawn launched in 2007 and travelled to the asteroid belt using ion propulsion. It orbited Vesta from 2011 to 2012, then left orbit and flew to Ceres, arriving in 2015. The mission revealed a dry, differentiated protoplanet and an ice-rich dwarf planet with bright salt deposits. When its hydrazine ran out in 2018, Dawn stopped communicating and remains in a stable orbit around Ceres.",
    ar: "انطلقت دون في 2007 وسافرت إلى حزام الكويكبات باستخدام الدفع الأيوني. وطافت حول فيستا بين 2011 و2012، ثم غادرت مدارها وحلّقت إلى سيريس فوصلت في 2015. كشفت المهمة عن كوكب أولي جاف ومتمايز، وعن كوكب قزم غني بالجليد ورواسب ملحية ساطعة. وحين نفد وقودها في 2018، توقفت دون عن التواصل وبقيت في مدار مستقر حول سيريس.",
  },
  location: {
    en: "Asteroid belt — Vesta and Ceres",
    ar: "حزام الكويكبات — فيستا وسيريس",
  },
  locationNote: {
    en: "Vesta and Ceres are the two largest bodies in the asteroid belt, but they are very different: Vesta is dry and rocky, while Ceres contains a large amount of water ice.",
    ar: "فيستا وسيريس أكبر جسمين في حزام الكويكبات، لكنهما مختلفان جداً: ففيستا جافة وصخرية، بينما يحتوي سيريس كمية كبيرة من جليد الماء.",
  },
  equipmentType: {
    en: "Ion-propelled orbiter",
    ar: "مركبة مدارية بدفع أيوني",
  },
  missionPeriod: {
    en: "Launch 27 September 2007 · Vesta arrival 16 July 2011 · Ceres arrival 6 March 2015 · Last contact 31 October 2018",
    ar: "الإطلاق 27 سبتمبر 2007 · الوصول إلى فيستا 16 يوليو 2011 · الوصول إلى سيريس 6 مارس 2015 · آخر اتصال 31 أكتوبر 2018",
  },
  missionStatus: {
    en: "Mission complete — Dawn ran out of hydrazine in 2018 and NASA ended the mission.",
    ar: "اكتملت المهمة — نفد وقود الهيدرازين من دون في 2018 فأنهت ناسا المهمة.",
  },
  hardwareStatus: {
    en: "Inactive — Dawn remains in a stable orbit around Ceres.",
    ar: "غير نشطة — ما زالت دون في مدار مستقر حول سيريس.",
  },
  statusKind: "complete",
  accent: "#8E7CC3",
  accentSoft: "#E7E1F5",
  badge: {
    en: "Two-World Orbiter",
    ar: "طائف العالَمين",
  },
  badgeKey: "two-world-orbiter",
  hero: echoImage("PIA12031", {
    alt: {
      en: "An artist's concept of the Dawn spacecraft orbiting the dwarf planet Ceres.",
      ar: "تصور فني لمركبة دون تطوف حول الكوكب القزم سيريس.",
    },
    caption: {
      en: "An artist's concept of Dawn at Ceres. The spacecraft used ion propulsion to reach and orbit two different bodies in the asteroid belt.",
      ar: "تصور فني لدون عند سيريس. استخدمت المركبة الدفع الأيوني للوصول إلى جسمين مختلفين في حزام الكويكبات والطواف حولهما.",
    },
  }),
  gallery: [
    echoImage("PIA19376", {
      alt: {
        en: "An artist's rendering of the Dawn spacecraft with its solar arrays extended.",
        ar: "رسم فني لمركبة دون وألواحها الشمسية ممدودة.",
      },
      caption: {
        en: "Dawn's long solar arrays powered its ion engines. The spacecraft was one of the most efficient planetary explorers ever flown.",
        ar: "ألواح دون الشمسية الطويلة كانت تشغل محركاتها الأيونية. وكانت المركبة من أكفأ مستكشفي الكواكب الذين أُطلقوا.",
      },
    }),
    echoImage("PIA15141", {
      alt: {
        en: "A colour-coded image of asteroid Vesta's southern hemisphere, centred on the Rheasilvia basin.",
        ar: "صورة ملونة لنصف الكرة الجنوبي للكويكب فيستا، متمركزة على حوض رياسيلفيا.",
      },
      caption: {
        en: "Vesta's southern hemisphere, coloured to show surface composition. The huge Rheasilvia impact basin dominates the region.",
        ar: "نصف الكرة الجنوبي لفيستا، ملوّن لإظهار تركيب السطح. ويهيمن على المنطقة حوض رياسيلفيا الاصطدامي الهائل.",
      },
    }),
    echoImage("PIA21906", {
      alt: {
        en: "A high-resolution view of the dwarf planet Ceres, centred on Occator Crater.",
        ar: "منظر عالي الدقة للكوكب القزم سيريس، متمركز على فوهة أوكاتور.",
      },
      caption: {
        en: "Ceres from low orbit, centred on Occator Crater. The bright material inside the crater is salt left behind by water.",
        ar: "سيريس من مدار منخفض، متمركزاً على فوهة أوكاتور. المواد الساطعة داخل الفوهة ملح خلّفه الماء.",
      },
    }),
  ],
  facts: [
    {
      label: { en: "Launch mass", ar: "كتلة الإطلاق" },
      value: { en: "About 1,218 kg", ar: "نحو 1,218 كغ" },
    },
    {
      label: { en: "Dry mass", ar: "الكتلة الجافة" },
      value: { en: "About 747 kg", ar: "نحو 747 كغ" },
    },
    {
      label: { en: "Propulsion", ar: "الدفع" },
      value: {
        en: "Xenon ion engines, with hydrazine thrusters for attitude control.",
        ar: "محركات أيونية بالزينون، مع دافعات هيدرازين للتحكم في الاتجاه.",
      },
    },
    {
      label: { en: "Vesta arrival", ar: "الوصول إلى فيستا" },
      value: { en: "16 July 2011", ar: "16 يوليو 2011" },
    },
    {
      label: { en: "Ceres arrival", ar: "الوصول إلى سيريس" },
      value: { en: "6 March 2015", ar: "6 مارس 2015" },
    },
    {
      label: { en: "Last contact", ar: "آخر اتصال" },
      value: { en: "31 October 2018", ar: "31 أكتوبر 2018" },
    },
  ],
  chapters: [
    {
      id: "meet",
      kind: "meet",
      eyebrow: { en: "Chapter one", ar: "الفصل الأول" },
      title: { en: "Meet the Ion Traveler", ar: "تعرّف على المسافر الأيوني" },
      summary: {
        en: "A spacecraft that pushed gently for years instead of burning hard for minutes.",
        ar: "مركبة دفعت بلطف لسنوات بدل أن تحترق بقوة لدقائق.",
      },
      narrative: {
        en: [
          "Most spacecraft use chemical rockets: a short, powerful burn that changes their path in minutes. Dawn used something different. Its ion engines stripped electrons from xenon atoms and accelerated the ions out of the back of the spacecraft. The thrust was tiny — about the weight of a piece of paper on your hand — but it could run for months.",
          "That made a mission like Dawn possible. The spacecraft could spiral outward, adjust its orbit around a body, leave it and travel to another one without carrying a huge amount of chemical fuel.",
          "Dawn's target list was unusual: Vesta and Ceres, the two most massive objects in the asteroid belt. They formed in different parts of the early solar system and have followed very different histories, so visiting both with one spacecraft was a way to compare two records of planetary formation.",
        ],
        ar: [
          "تستخدم معظم المركبات الفضائية صواريخ كيميائية: احتراق قصير وقوي يغير مسارها في دقائق. أما دون فاستخدمت شيئاً آخر. فقد كانت محركاتها الأيونية تنزع الإلكترونات من ذرات الزينون وتسرّع الأيونات إلى خارج مؤخرة المركبة. وكان الدفع ضئيلاً — نحو وزن ورقة على يدك — لكنه يستطيع الاستمرار أشهراً.",
          "وهذا ما جعل مهمة مثل دون ممكنة. فكانت المركبة تستطيع التحرك في مسار حلزوني، وتعديل مدارها حول جسم، ثم مغادرته والسفر إلى جسم آخر دون حمل كمية هائلة من الوقود الكيميائي.",
          "وكانت قائمة أهداف دون غير عادية: فيستا وسيريس، أكبر جسمين في حزام الكويكبات. فقد تشكّلا في مناطق مختلفة من النظام الشمسي المبكر واتبعا تاريخين مختلفين جداً، فكانت زيارتهما بمركبة واحدة وسيلة لمقارنة سجلين من سجلات تكوّن الكواكب.",
        ],
      },
      echo: {
        en: "A gentle push, repeated for years, can take you further than one big explosion.",
        ar: "دفعة لطيفة تتكرر سنوات قد تأخذك أبعد من انفجار واحد كبير.",
      },
      facts: [
        {
          label: { en: "Engine type", ar: "نوع المحرك" },
          value: { en: "Xenon ion propulsion", ar: "دفع أيوني بالزينون" },
        },
        {
          label: { en: "Thrust", ar: "الدفع" },
          value: {
            en: "Very low, but continuous for long periods.",
            ar: "منخفض جداً، لكنه مستمر لفترات طويلة.",
          },
        },
        {
          label: { en: "Targets", ar: "الأهداف" },
          value: { en: "Vesta and Ceres", ar: "فيستا وسيريس" },
        },
      ],
      diagram: {
        kind: "instrument-components",
        title: { en: "What Dawn is made of", ar: "مكوّنات دون" },
        intro: {
          en: "Select a marker to see what that part of the spacecraft did. The shapes here are a teaching diagram of the real vehicle.",
          ar: "اختر أي علامة لترى وظيفة ذلك الجزء من المركبة. الأشكال هنا رسم تعليمي للمركبة الحقيقية.",
        },
        points: [
          {
            id: "ion-engines",
            x: 24,
            y: 62,
            label: { en: "Ion engines", ar: "المحركات الأيونية" },
            detail: {
              en: "Three NSTAR thrusters stripped electrons from xenon atoms and pushed the spacecraft with a force about as heavy as a sheet of paper — but for months at a time.",
              ar: "ثلاثة محركات من نوع NSTAR كانت تنزع الإلكترونات من ذرات الزينون وتدفع المركبة بقوة تقارب وزن ورقة واحدة — لكنها تستمر شهراً بعد شهر.",
            },
          },
          {
            id: "solar-arrays",
            x: 16,
            y: 28,
            label: { en: "Solar arrays", ar: "الألواح الشمسية" },
            detail: {
              en: "Two long wings of solar cells turned sunlight into the electricity that ran the ion engines. Farther from the Sun, they had to be larger than any arrays flown before.",
              ar: "جناحان طويلان من الخلايا الشمسية يحوّلان ضوء الشمس إلى الكهرباء التي تشغل المحركات الأيونية. وكلما ابتعدت المركبة عن الشمس احتاجت إلى ألواح أكبر من أي ألواح أُرسلت من قبل.",
            },
          },
          {
            id: "xenon-tanks",
            x: 52,
            y: 46,
            label: { en: "Xenon tanks", ar: "خزانات الزينون" },
            detail: {
              en: "Dawn carried hundreds of kilograms of xenon as propellant. Because ion engines are so efficient, that was enough to change orbit around two different worlds.",
              ar: "حملت دون مئات الكيلوجرامات من الزينون كوقود. ولأن المحركات الأيونية شديدة الكفاءة، كان ذلك كافياً لتغيير المدار حول عالمين مختلفين.",
            },
          },
          {
            id: "science-sensors",
            x: 80,
            y: 30,
            label: { en: "Science sensors", ar: "أجهزة الرصد العلمية" },
            detail: {
              en: "A framing camera, a visible and infrared mapping spectrometer, and a gamma ray and neutron spectrometer together read what Vesta and Ceres are made of.",
              ar: "ثلاثة أجهزة قرأت تركيب فيستا وسيريس معاً: كاميرا تصوير، ومطياف لرسم الخرائط بالضوء المرئي والأشعة تحت الحمراء، ومطياف لأشعة غاما والنيوترونات.",
            },
          },
        ],
      },
      quiz: [
        {
          id: "dawn-q1",
          prompt: {
            en: "Why was ion propulsion useful for Dawn?",
            ar: "لماذا كان الدفع الأيوني مفيداً لدون؟",
          },
          options: [
            {
              id: "a",
              label: {
                en: "It provided a small but long-lasting push, allowing the spacecraft to orbit two bodies.",
                ar: "لأنه وفّر دفعاً صغيراً لكنه طويل الأمد، فأتاح للمركبة الطواف حول جسمين.",
              },
            },
            {
              id: "b",
              label: {
                en: "It was much more powerful than a chemical rocket.",
                ar: "لأنه كان أقوى بكثير من الصاروخ الكيميائي.",
              },
            },
            {
              id: "c",
              label: {
                en: "It allowed the spacecraft to land on an asteroid.",
                ar: "لأنه أتاح للمركبة الهبوط على كويكب.",
              },
            },
          ],
          correctOptionId: "a",
          explanation: {
            en: "Ion engines produce very little thrust, but they can run for years. That efficiency let Dawn change orbits and travel between two different worlds.",
            ar: "تنتج المحركات الأيونية دفعاً ضئيلاً، لكنها تعمل سنوات. وقد أتاحت هذه الكفاءة لدون تغيير مداراتها والسفر بين عالمين مختلفين.",
          },
        },
      ],
    },
    {
      id: "mission",
      kind: "mission",
      eyebrow: { en: "Chapter two", ar: "الفصل الثاني" },
      title: { en: "Vesta, Then Ceres", ar: "فيستا ثم سيريس" },
      summary: {
        en: "Fourteen months at a rocky protoplanet, then a three-year spiral to an icy dwarf planet.",
        ar: "أربعة عشر شهراً عند كوكب أولي صخري، ثم مسار حلزوني استمر ثلاث سنوات إلى كوكب قزم جليدي.",
      },
      narrative: {
        en: [
          "Dawn launched on 27 September 2007. It passed Mars in 2009 for a gravity assist, then continued to the asteroid belt. In July 2011 it became the first spacecraft to orbit a body in the asteroid belt.",
          "At Vesta, Dawn mapped the surface, measured its gravity field and studied its composition. The spacecraft found a world with a giant impact basin at its south pole, a surface marked by deep grooves and a history of melting and separation of materials.",
          "In September 2012 Dawn left Vesta and began a long cruise to Ceres. It arrived in March 2015 and became the first spacecraft to orbit two extraterrestrial bodies. At Ceres it found a darker, icier world with bright spots and a surface shaped by water and impacts.",
        ],
        ar: [
          "انطلقت دون في 27 سبتمبر 2007. ومرّت بالمريخ في 2009 للاستفادة من مساعدة الجاذبية، ثم واصلت إلى حزام الكويكبات. وفي يوليو 2011 صارت أول مركبة تطوف حول جسم في حزام الكويكبات.",
          "عند فيستا، رسمت دون خريطة السطح وقاست مجال جاذبيته ودرست تركيبته. ووجدت عالماً فيه حوض اصطدامي عملاق عند قطبه الجنوبي، وسطح تحفره أخاديد عميقة، وتاريخ من الانصهار وانفصال المواد.",
          "وفي سبتمبر 2012 غادرت دون فيستا وبدأت رحلة طويلة إلى سيريس. ووصلت في مارس 2015 فصارت أول مركبة تطوف حول جسمين خارج الأرض. وعند سيريس وجدت عالماً أغمق وأكثر جليدية، فيه بقع ساطعة وسطح شكّله الماء والاصطدامات.",
        ],
      },
      echo: {
        en: "Leaving orbit is the hard part. Dawn did it on purpose, to keep a promise to a second world.",
        ar: "مغادرة المدار هي الجزء الصعب. وقد فعلتها دون عن قصد، لتحفظ وعداً لعالم ثانٍ.",
      },
      glossary: [
        {
          id: "ion-propulsion",
          term: { en: "Ion propulsion", ar: "الدفع الأيوني" },
          simple: {
            en: "A very gentle rocket that pushes for months instead of seconds. It builds up speed slowly, but it uses a fraction of the fuel a normal rocket needs.",
            ar: "صاروخ لطيف جداً يدفع لأشهر بدل أن يدفع لثوانٍ. يبني سرعته ببطء، لكنه يستهلك جزءاً يسيراً من الوقود الذي يحتاجه صاروخ عادي.",
          },
          technical: {
            en: "An ion engine ionises xenon and accelerates the ions electrostatically, giving a very high exhaust velocity at very low thrust.",
            ar: "يؤين المحرك الأيوني الزينون ويسرّع الأيونات كهربائياً، فينتج سرعة خروج عالية جداً عند دفع منخفض جداً.",
          },
        },
        {
          id: "gravity-assist",
          term: { en: "Gravity assist", ar: "مساعدة الجاذبية" },
          simple: {
            en: "Flying close to a planet to borrow a little of its speed. The spacecraft leaves the encounter faster, and the planet slows by an amount too small to notice.",
            ar: "المرور قرب كوكب لاستعارة قليل من سرعته. فتغادر المركبة اللقاء أسرع، بينما يبطئ الكوكب مقداراً لا يكاد يُلاحظ.",
          },
        },
        {
          id: "protoplanet",
          term: { en: "Protoplanet", ar: "كوكب أولي" },
          simple: {
            en: "A world that began to grow like a planet and then stopped. Vesta is one: it melted and separated into layers, and then never got any bigger.",
            ar: "عالم بدأ ينمو ككوكب ثم توقف. فيستا واحد منها: انصهر وانفصل إلى طبقات، ثم لم يزد حجماً بعد ذلك.",
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
        en: "Eleven years of gentle thrust: from Earth to Mars, from Mars to Vesta, and from Vesta to Ceres.",
        ar: "إحدى عشرة عاماً من الدفع اللطيف: من الأرض إلى المريخ، ومن المريخ إلى فيستا، ومن فيستا إلى سيريس.",
      },
      narrative: {
        en: [
          "Dawn left Earth on 27 September 2007 on a Delta II rocket. Within days the chemical stage had done its work and the ion engines took over. From then on there was no dramatic burn, only the steady push of ionised xenon, and the spacecraft began to spiral slowly outward away from the Sun.",
          "In February 2009 Dawn passed Mars and borrowed a little of the planet's speed to bend its path further out. The manoeuvre saved a large amount of propellant. It is the same trick later missions use to reach the outer planets, but Dawn used it simply to climb toward the asteroid belt.",
          "In July 2011, after four years of continuous thrusting, Vesta's gravity captured the spacecraft, and Dawn became the first mission ever to orbit a body in the asteroid belt. It stayed for fourteen months, descending through a series of mapping orbits, each one lower and slower than the last, until the surface of the protoplanet filled its camera frame.",
          "In September 2012 Dawn did something no spacecraft had done before: it left one world on purpose and flew to another. The cruise to Ceres took almost three years of continuous ion thrusting. In March 2015 the dwarf planet captured it in turn, and the second half of the journey — and of the science — began.",
        ],
        ar: [
          "غادرت دون الأرض في 27 سبتمبر 2007 على صاروخ دلتا 2. وفي غضون أيام أكملت المرحلة الكيميائية مهمتها وتولت المحركات الأيونية الأمر. ومنذ تلك اللحظة لم يكن هناك احتراق مهيب، بل دفع ثابت من الزينون المتأين، وبدأت المركبة تنطلق ببطء في مسار حلزوني بعيداً عن الشمس.",
          "وفي فبراير 2009 مرّت دون بالمريخ واستعارة قليلاً من سرعة الكوكب لتنحني مسارها إلى الخارج. وقد وفّرت هذه المناورة كمية كبيرة من الوقود. إنها الحيلة نفسها التي تستخدمها المهمات اللاحقة للوصول إلى الكواكب الخارجية، لكن دون استخدمتها ببساطة للتسلق نحو حزام الكويكبات.",
          "وفي يوليو 2011، بعد أربع سنوات من الدفع المتواصل، أمسكت جاذبية فيستا بالمركبة، فصارت دون أول مهمة تطوف على الإطلاق حول جسم في حزام الكويكبات. وبقيت هناك أربعة عشر شهراً، تنحدر عبر سلسلة من مدارات الرسم، كل مدار أبطأ وأقرب من سابقه، حتى امتلأت عدسة كاميرتها بسطح الكوكب الأولي.",
          "وفي سبتمبر 2012 فعلت دون شيئاً لم تفعله أي مركبة من قبل: غادرت عالماً عن قصد وحلّقت نحو عالم آخر. استغرقت الرحلة إلى سيريس نحو ثلاث سنوات من الدفع الأيوني المتواصل. وفي مارس 2015 التقط الكوكب القزم المركبة بدوره، فبدأ النصف الثاني من الرحلة — ومن العلم.",
        ],
      },
      echo: {
        en: "Four years of pushing to reach one world, then the courage to leave it and fly to another. That is the part of Dawn's journey I find hardest to believe.",
        ar: "أربع سنوات من الدفع للوصول إلى عالم واحد، ثم الشجاعة لتركه والتحليق نحو عالم آخر. هذا هو الجزء الأصعب تصديقه في رحلة دون.",
      },
      timeline: [
        {
          id: "dawn-launch",
          date: "2007-09-27",
          dateLabel: { en: "27 September 2007", ar: "27 سبتمبر 2007" },
          label: { en: "Launch", ar: "الإطلاق" },
          description: {
            en: "Dawn launched on a Delta II rocket and began its ion-powered journey to the asteroid belt.",
            ar: "انطلقت دون على صاروخ دلتا 2 وبدأت رحلتها الأيونية إلى حزام الكويكبات.",
          },
          type: "launch",
          sourceIds: ["SRC-NASA-DAWN", "SRC-NSSDCA-DAWN"],
        },
        {
          id: "dawn-vesta",
          date: "2011-07-16",
          dateLabel: { en: "16 July 2011", ar: "16 يوليو 2011" },
          label: { en: "Orbit at Vesta", ar: "الطواف حول فيستا" },
          description: {
            en: "Dawn became the first spacecraft to orbit a body in the asteroid belt.",
            ar: "صارت دون أول مركبة تطوف حول جسم في حزام الكويكبات.",
          },
          type: "arrival",
          sourceIds: ["SRC-NASA-DAWN", "SRC-NSSDCA-DAWN"],
        },
        {
          id: "dawn-depart",
          date: "2012-09-05",
          dateLabel: { en: "September 2012", ar: "سبتمبر 2012" },
          label: { en: "Departure from Vesta", ar: "المغادرة من فيستا" },
          description: {
            en: "Dawn left Vesta and began its cruise to Ceres.",
            ar: "غادرت دون فيستا وبدأت رحلتها إلى سيريس.",
          },
          type: "milestone",
          sourceIds: ["SRC-NASA-DAWN"],
        },
        {
          id: "dawn-ceres",
          date: "2015-03-06",
          dateLabel: { en: "6 March 2015", ar: "6 مارس 2015" },
          label: { en: "Orbit at Ceres", ar: "الطواف حول سيريس" },
          description: {
            en: "Dawn became the first spacecraft to orbit two extraterrestrial bodies.",
            ar: "صارت دون أول مركبة تطوف حول جسمين خارج الأرض.",
          },
          type: "arrival",
          sourceIds: ["SRC-NASA-DAWN", "SRC-NSSDCA-DAWN"],
        },
        {
          id: "dawn-last",
          date: "2018-10-31",
          dateLabel: { en: "31 October 2018", ar: "31 أكتوبر 2018" },
          label: { en: "Last contact", ar: "آخر اتصال" },
          description: {
            en: "Dawn exhausted its hydrazine and stopped communicating in a stable orbit around Ceres.",
            ar: "نفد هيدرازين دون وتوقفت عن التواصل في مدار مستقر حول سيريس.",
          },
          type: "last-contact",
          sourceIds: ["SRC-NASA-DAWN", "SRC-NSSDCA-DAWN"],
        },
      ],
      diagram: {
        kind: "journey-map",
        title: { en: "The route to Vesta and Ceres", ar: "الطريق إلى فيستا وسيريس" },
        intro: {
          en: "Eleven years, two worlds, and one gentle engine that never stopped pushing.",
          ar: "إحدى عشرة عاماً وعالَمان ومحرك لطيف لم يتوقف عن الدفع.",
        },
        route: [
          {
            label: { en: "Launch", ar: "الإطلاق" },
            description: { en: "Earth, 27 September 2007", ar: "الأرض، 27 سبتمبر 2007" },
          },
          {
            label: { en: "Mars flyby", ar: "التحليق قرب المريخ" },
            description: {
              en: "Gravity assist in February 2009",
              ar: "مساعدة جاذبية في فبراير 2009",
            },
          },
          {
            label: { en: "Orbit at Vesta", ar: "الطواف حول فيستا" },
            description: {
              en: "Fourteen months of mapping, 2011–2012",
              ar: "أربعة عشر شهراً من الرسم، 2011–2012",
            },
          },
          {
            label: { en: "Cruise", ar: "الرحلة البينية" },
            description: {
              en: "Almost three years of ion thrusting",
              ar: "نحو ثلاث سنوات من الدفع الأيوني",
            },
          },
          {
            label: { en: "Orbit at Ceres", ar: "الطواف حول سيريس" },
            description: { en: "Arrival 6 March 2015", ar: "الوصول 6 مارس 2015" },
          },
        ],
        points: [
          {
            id: "earth",
            x: 10,
            y: 62,
            label: { en: "Earth", ar: "الأرض" },
            detail: { en: "Launch on 27 September 2007.", ar: "الإطلاق في 27 سبتمبر 2007." },
          },
          {
            id: "mars",
            x: 34,
            y: 78,
            label: { en: "Mars", ar: "المريخ" },
            detail: {
              en: "Gravity assist in February 2009.",
              ar: "مساعدة جاذبية في فبراير 2009.",
            },
          },
          {
            id: "vesta",
            x: 60,
            y: 40,
            label: { en: "Vesta", ar: "فيستا" },
            detail: {
              en: "Orbit from July 2011 to September 2012.",
              ar: "الطواف من يوليو 2011 إلى سبتمبر 2012.",
            },
          },
          {
            id: "ceres",
            x: 88,
            y: 22,
            label: { en: "Ceres", ar: "سيريس" },
            detail: {
              en: "Orbit from March 2015, and a permanent companion.",
              ar: "الطواف من مارس 2015، ورفيق دائم.",
            },
          },
        ],
      },
    },
    {
      id: "discoveries",
      kind: "discoveries",
      eyebrow: { en: "Chapter four", ar: "الفصل الرابع" },
      title: { en: "Two Records of the Early Solar System", ar: "سجلان للنظام الشمسي المبكر" },
      summary: {
        en: "A dry protoplanet and an icy dwarf planet, each holding a different memory of how worlds begin.",
        ar: "كوكب أولي جاف وكوكب قزم جليدي، كل منهما يحفظ ذاكرة مختلفة عن كيف تبدأ العوالم.",
      },
      narrative: {
        en: [
          "Vesta and Ceres are neighbours in the asteroid belt, but they could hardly be more different. Vesta is rocky and dry, with a surface that records intense heating and impacts. Ceres is rich in water ice and has a shape close to round, which is why it is classified as a dwarf planet.",
          "At Ceres, Dawn found bright deposits inside craters. The material was not ice but salts left behind when briny water reached the surface and evaporated. The discovery suggested that Ceres once had, and may still have, liquid water below its crust.",
          "At Vesta, Dawn found evidence that the asteroid had melted and separated into layers early in its history, like a small planet. It also identified the source of a family of meteorites found on Earth, linking a distant world to rocks in our collections.",
        ],
        ar: [
          "فيستا وسيريس جارتان في حزام الكويكبات، لكنهما لا يكادان يتشابهان. ففيستا صخرية وجافة، وسطحها يسجل تسخيناً واصطدامات شديدة. أما سيريس فغني بجليد الماء وشكله قريب من الكروي، ولهذا صُنف كوكباً قزماً.",
          "وعند سيريس وجدت دون رواسب ساطعة داخل فوهات. ولم تكن المادة جليداً بل أملاحاً خلّفها ماء مالح وصل إلى السطح ثم تبخر. وأشار الاكتشاف إلى أن سيريس امتلك يوماً ماءً سائلاً تحت قشرته، وربما ما زال يمتلكه.",
          "وعند فيستا وجدت دون أدلة على أن الكويكب انصهر وانفصل إلى طبقات في تاريخه المبكر، مثل كوكب صغير. وحددت أيضاً مصدر عائلة من النيازك الموجودة على الأرض، فربطت عالماً بعيداً بصخور في مجموعاتنا.",
        ],
      },
      echo: {
        en: "Two small worlds, two different memories. Dawn read both.",
        ar: "عالَمان صغيران وذاكرتان مختلفتان. وقد قرأت دون الاثنتين.",
      },
      discoveries: [
        {
          id: "dawn-d1",
          title: { en: "Vesta was a small planet", ar: "كان فيستا كوكباً صغيراً" },
          question: {
            en: "Did Vesta melt and form layers like a planet?",
            ar: "هل انصهر فيستا وشكّل طبقات مثل كوكب؟",
          },
          instrument: {
            en: "Dawn's framing camera, mapping spectrometer and gravity science",
            ar: "كاميرا دون ومطياف رسم الخرائط وعلم الجاذبية",
          },
          method: {
            en: "Dawn mapped the surface, measured the gravity field and compared the composition of different regions.",
            ar: "رسمت دون خريطة السطح وقاست مجال الجاذبية وقارنت تركيب مناطق مختلفة.",
          },
          data: {
            en: "The data showed a crust, a mantle and a metallic core, plus a giant impact basin at the south pole.",
            ar: "أظهرت البيانات قشرة ووشاحاً ولباً معدنيًا، إضافة إلى حوض اصطدامي عملاق عند القطب الجنوبي.",
          },
          finding: {
            en: "Vesta is a differentiated protoplanet, a survivor from the first generation of planetary building blocks.",
            ar: "فيستا كوكب أولي متمايز، نجا من الجيل الأول من لبنات بناء الكواكب.",
          },
          significance: {
            en: "It gave scientists a direct look at a body that formed early and then stopped growing.",
            ar: "منح العلماء نظرة مباشرة إلى جسم تشكّل مبكراً ثم توقف عن النمو.",
          },
          sourceIds: ["SRC-NASA-DAWN", "SRC-NSSDCA-DAWN"],
        },
        {
          id: "dawn-d2",
          title: { en: "Bright salt on Ceres", ar: "ملح ساطع على سيريس" },
          question: {
            en: "What are the bright spots on Ceres?",
            ar: "ما البقع الساطعة على سيريس؟",
          },
          instrument: {
            en: "Dawn's camera and visible and infrared mapping spectrometer",
            ar: "كاميرا دون ومطياف رسم الخرائط المرئي والأشعة تحت الحمراء",
          },
          method: {
            en: "Dawn photographed the bright deposits at high resolution and measured the wavelengths of light they reflected.",
            ar: "صوّرت دون الرواسب الساطعة بدقة عالية وقاست أطوال موجات الضوء التي تعكسها.",
          },
          data: {
            en: "The bright material was dominated by carbonate salts, consistent with briny water reaching the surface and evaporating.",
            ar: "كانت المادة الساطعة غنية بأملاح الكربونات، بما يتفق مع وصول ماء مالح إلى السطح وتبخره.",
          },
          finding: {
            en: "Ceres has a water-rich interior, and liquid brine has reached the surface in the geologically recent past.",
            ar: "لسيريس داخل غني بالماء، وقد وصل محلول ملحي سائل إلى السطح في الماضي الجيولوجي القريب.",
          },
          significance: {
            en: "It made Ceres a key destination for understanding water in the asteroid belt and the habitability of small worlds.",
            ar: "جعل ذلك سيريس هدفاً رئيسياً لفهم الماء في حزام الكويكبات وقابلية العوالم الصغيرة للحياة.",
          },
          sourceIds: ["SRC-NASA-DAWN", "SRC-NSSDCA-DAWN"],
        },
      ],
    },
    {
      id: "ending",
      kind: "ending",
      eyebrow: { en: "Chapter five", ar: "الفصل الخامس" },
      title: { en: "A Quiet Orbit", ar: "مدار هادئ" },
      summary: {
        en: "Out of fuel, Dawn stays in orbit around Ceres, a silent satellite of a silent world.",
        ar: "بعد نفاد الوقود، تبقى دون في مدار حول سيريس، تابعاً صامتاً لعالم صامت.",
      },
      narrative: {
        en: [
          "Dawn's mission ended for a very ordinary reason: it ran out of hydrazine, the fuel used for pointing the spacecraft. Without it, the spacecraft could no longer keep its antennas and instruments pointed at the right targets.",
          "NASA left Dawn in a stable orbit around Ceres. The orbit is expected to remain stable for a very long time, so the spacecraft will circle the dwarf planet as a quiet companion.",
          "Ceres is the only dwarf planet in the inner solar system, and Dawn is the only spacecraft to have orbited it. That makes the pair a permanent record: a small world and the machine that read it.",
        ],
        ar: [
          "انتهت مهمة دون لسبب عادي جداً: نفد الهيدرازين، وهو الوقود المستخدم في توجيه المركبة. وبدونه، لم تعد المركبة قادرة على إبقاء هوائياتها وأجهزتها موجهة إلى الأهداف الصحيحة.",
          "وتركت ناسا دون في مدار مستقر حول سيريس. ويُتوقع أن يبقى المدار مستقراً وقتاً طويلاً جداً، فستظل المركبة تدور حول الكوكب القزم كرفيق صامت.",
          "سيريس هو الكوكب القزم الوحيد في النظام الشمسي الداخلي، ودون هي المركبة الوحيدة التي طافت حوله. وهذا يجعل الاثنين سجلاً دائماً: عالَم صغير والآلة التي قرأته.",
        ],
      },
      echo: {
        en: "Dawn did not come home. It stayed with the worlds it had come to know.",
        ar: "لم تعد دون إلى الوطن. بل بقيت مع العوالم التي جاءت لتعرفها.",
      },
      facts: [
        {
          label: { en: "Final location", ar: "الموقع الأخير" },
          value: { en: "Stable orbit around Ceres", ar: "مدار مستقر حول سيريس" },
        },
        {
          label: { en: "Last contact", ar: "آخر اتصال" },
          value: { en: "31 October 2018", ar: "31 أكتوبر 2018" },
        },
        {
          label: { en: "Cause of ending", ar: "سبب النهاية" },
          value: { en: "Hydrazine exhausted", ar: "نفاد الهيدرازين" },
        },
        {
          label: { en: "Worlds orbited", ar: "العوالم التي طافت حولها" },
          value: { en: "Vesta and Ceres", ar: "فيستا وسيريس" },
        },
      ],
    },
    {
      id: "legacy",
      kind: "legacy",
      eyebrow: { en: "Chapter six", ar: "الفصل السادس" },
      title: { en: "What Remains", ar: "ما الذي يبقى" },
      summary: {
        en: "Two worlds read in full, and a gentle engine that changed how spacecraft travel.",
        ar: "عالَمان قُرئا كاملين، ومحرك لطيف غيّر طريقة سفر المركبات.",
      },
      narrative: {
        en: [
          "Dawn remains the only spacecraft ever to have orbited two extraterrestrial bodies, and no mission before or since has left the orbit of one world to take up orbit around another. The records it left behind are now the standard references: Vesta's layered interior and its giant southern basin, and the bright salt deposits that show briny water reached the surface of Ceres.",
          "Dawn also proved that ion propulsion is not a laboratory curiosity. Four years of continuous thrusting carried it to Vesta; three more carried it to Ceres; and the same gentle push held its instruments steady for eleven years. The efficiency it demonstrated now sits in the plans of mission designers thinking about long journeys with small amounts of fuel.",
          "The spacecraft itself is still up there, in a stable orbit around Ceres that is expected to hold for a very long time. It is the only human-made satellite of a dwarf planet — a small machine keeping station over the bright salt it discovered, silent and finished, and not going anywhere.",
        ],
        ar: [
          "تبقى دون المركبة الوحيدة على الإطلاق التي طافت حول جسمين خارج الأرض، ولم تكن أي مهمة قبلها أو بعدها قد غادرت مدار عالم لتلتحق بمدار عالم آخر. والسجلات التي خلّفتها هي اليوم المراجع المعتمدة: الداخل المتمايز لفيستا وحوضها الجنوبي العملاق، والرواسب الملحية الساطعة التي تُظهر أن ماءً مالحاً وصل إلى سطح سيريس.",
          "وأثبتت دون أيضاً أن الدفع الأيوني ليس مادة فضول مختبرية. فقد حملها أربع سنوات من الدفع المتواصل إلى فيستا، وثلاث سنوات أخرى إلى سيريس، والدفع اللطيف نفسه أبقى أجهزتها ثابتة إحدى عشرة عاماً. والكفاءة التي أظهرتها تقبع الآن في خطط مصممي المهمات وهم يفكرون في رحلات طويلة بكميات صغيرة من الوقود.",
          "أما المركبة نفسها فما زالت هناك، في مدار مستقر حول سيريس يُتوقع أن يصمد زمناً طويلاً جداً. إنها التابع الصناعي الوحيد لكوكب قزم — آلة صغيرة تحرس الملح الساطع الذي اكتشفته، صامتة وقد أُنجزت مهمتها، ولن تذهب إلى أي مكان.",
        ],
      },
      echo: {
        en: "Two worlds, one gentle engine, and no way home. Dawn is still circling Ceres, and I think that is exactly where it belongs.",
        ar: "عالَمان ومحرك لطيف واحد ولا عودة إلى الوطن. ما زالت دون تدور حول سيريس، وأظن أن هذا هو مكانها تماماً.",
      },
      facts: [
        {
          label: { en: "First", ar: "الأولى" },
          value: {
            en: "The first spacecraft to orbit two extraterrestrial bodies.",
            ar: "أول مركبة تطوف حول جسمين خارج الأرض.",
          },
        },
        {
          label: { en: "Where it is now", ar: "أين هي الآن" },
          value: { en: "In a stable orbit around Ceres", ar: "في مدار مستقر حول سيريس" },
        },
        {
          label: { en: "What it left", ar: "ما تركته" },
          value: {
            en: "Maps of Vesta and Ceres, and bright salt deposits in Occator Crater.",
            ar: "خرائط لفيستا وسيريس، ورواسب ملحية ساطعة في فوهة أوكاتور.",
          },
        },
      ],
    },
  ],
  legacyStatement: {
    en: "Dawn showed that one spacecraft can visit two worlds and come away with two different stories of the solar system.",
    ar: "أظهرت دون أن مركبة واحدة تستطيع زيارة عالمين والعودة بقصتين مختلفتين عن النظام الشمسي.",
  },
  tags: ["deep-space", "instrument"],
  artifactId: "dawn",
  sourceIds: ["SRC-NASA-DAWN", "SRC-NSSDCA-DAWN"],
  relatedStorySlugs: ["near-shoemaker", "kepler"],
  echoIntro: {
    en: "This spacecraft orbited one world, left it, and orbited another. Come and see what it found at each.",
    ar: "طافت هذه المركبة حول عالم، ثم غادرته وطافت حول آخر. تعال لترى ما وجدته عند كل منهما.",
  },
  echoSignoff: {
    en: "Dawn is still circling Ceres, a small machine around a small world.",
    ar: "ما زالت دون تدور حول سيريس، آلة صغيرة حول عالم صغير.",
  },
  lastVerified: "2026-11-14",
};
