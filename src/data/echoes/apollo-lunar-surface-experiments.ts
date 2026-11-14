import type { EchoStory } from "@/types/echo";
import { echoImage } from "./media";

/**
 * APOLLO LUNAR SURFACE EXPERIMENTS PACKAGE.
 *
 * Sources: the NASA Science Apollo 11 mission page, the Apollo Lunar Surface
 * Journal, NASA/NSSDCA records for the Apollo 11 retroreflector, and the
 * GRAVERSE museum records for the EASEP and ALSEP hardware.
 */
export const apolloExperimentsStory: EchoStory = {
  id: "apollo-lunar-surface-experiments",
  slug: "apollo-lunar-surface-experiments",
  title: {
    en: "Apollo Lunar Surface Experiments",
    ar: "تجارب أبولو السطحية على القمر",
  },
  storyTitle: {
    en: "The Instruments We Left in the Dust",
    ar: "الأجهزة التي تركناها في الغبار",
  },
  dek: {
    en: "Small boxes, a sheet of foil and a panel of mirrors — still answering questions sixty years later.",
    ar: "صناديق صغيرة وورقة من رقائق الألمنيوم ولوح من المرايا — ما تزال تجيب عن الأسئلة بعد ستين عاماً.",
  },
  summary: {
    en: "Five crewed landings left a laboratory on the Moon. The seismometers heard the Moon ring, the retroreflectors still measure the Earth–Moon distance, and the experiments are still cited in research published this year.",
    ar: "خمسة هبوطات مأهولة تركت مختبراً على القمر. سمعت الزلزالات القمر وهي ترنّ، ولا تزال العاكسات تقيس مسافة الأرض–القمر، ولا تزال التجارب مذكورة في أبحاث تُنشر هذا العام.",
  },
  location: {
    en: "Five landing sites across the near side of the Moon",
    ar: "خمسة مواقع هبوط في الجانب القريب من القمر",
  },
  locationNote: {
    en: "Apollo 11, 12, 14, 15, 16 and 17 deployed surface experiments. This story focuses on the packages themselves and on the sites where they sit.",
    ar: "نشرت أبولو 11 و12 و14 و15 و16 و17 تجارب سطحية. وتتركّز هذه القصة على الحزم نفسها وعلى المواقع التي تحتلّها.",
  },
  equipmentType: {
    en: "Passive scientific instruments left on the surface",
    ar: "أجهزة علمية خاملة تُركت على السطح",
  },
  missionPeriod: {
    en: "1969 – 1977 · deployed across six crewed lunar missions, last switched off in 1977",
    ar: "1969 – 1977 · نُشرت عبر ست مهمات قمرية مأهولة، وأُطفئ آخرها عام 1977",
  },
  missionStatus: {
    en: "Mission complete — the last Apollo surface experiment was switched off in 1977.",
    ar: "اكتملت المهمات — أُطفئ آخر تجربة أبولو سطحية عام 1977.",
  },
  hardwareStatus: {
    en: "Mixed — most instruments are inactive; the retroreflectors are still used for lunar laser ranging.",
    ar: "مختلطة — معظم الأجهزة خاملة، أما العاكسات فلا تزال مستخدمة في قياس المسافة بالليزر.",
  },
  statusKind: "left-behind",
  accent: "#C3A6FF",
  accentSoft: "#E7DCFF",
  badge: {
    en: "Instrument Reader",
    ar: "قارئ الأجهزة",
  },
  badgeKey: "instrument-reader",
  hero: echoImage("as11-37-5551", {
    alt: {
      en: "Two Apollo 11 surface experiments set up on the Moon: the laser ranging retroreflector and the passive seismic experiment.",
      ar: "تجربتان سطحيتان من أبولو 11 مقامتان على القمر: مُعيد العاكس بالليزر وتجربة الزلازل الخاملة.",
    },
    caption: {
      en: "The Apollo 11 Early Apollo Scientific Experiments Package. The retroreflector is in the foreground; the passive seismometer is behind it. Both are still on the surface.",
      ar: "حزمة التجارب العلمية المبكرة لأبولو 11. العاكس في المقدمة، وزلزالmeter الخامل خلفه. والاثنان لا يزالان على السطح.",
    },
  }),
  gallery: [
    echoImage("as11-40-5931", {
      alt: {
        en: "Astronaut Buzz Aldrin preparing to deploy the Apollo 11 experiments on the lunar surface.",
        ar: "رائد الفضاء باز ألدرين يستعد لنشر تجارب أبولو 11 على سطح القمر.",
      },
      caption: {
        en: "Aldrin at the experiments during the first moonwalk on 20 July 1969. Setting up took minutes; the instruments have been running ever since.",
        ar: "ألدرين عند التجارب خلال أول مشية على القمر في 20 يوليو 1969. استغرق النشر دقائق؛ أما الأجهزة فأ(It has been running) ما تزال تعمل منذ ذلك الحين.",
      },
    }),
    echoImage("as12-46-6813", {
      alt: {
        en: "Astronaut Alan Bean deploying the Apollo 12 lunar surface magnetometer on the Moon.",
        ar: "رائد الفضاء ألان بين ينشر مقياس المغناطيسية السطحي لأبولو 12 على القمر.",
      },
      caption: {
        en: "Apollo 12 crew member Alan Bean deploying the lunar surface magnetometer. The magnetometers measured the Moon's magnetic field at the surface for years.",
        ar: "عضو طاقم أبولو 12 ألان بين ينشر مقياس المغناطيسية السطحي. وقد قست مقاييس المغناطيسية المجال المغناطيسي للقمر عند السطح سنوات.",
      },
    }),
    echoImage("as16-113-18347", {
      alt: {
        en: "Part of the deployed Apollo 16 lunar surface experiments package on the Moon.",
        ar: "جزء من حزمة تجارب أبولو 16 السطحية الموزّعة على القمر.",
      },
      caption: {
        en: "The Apollo 16 experiments. Each mission carried a slightly different package, and the set together covered seismology, magnetism, solar wind and the solar system at large.",
        ar: "تجارب أبولو 16. حملت كل مهمة حزمة مختلفة قليلاً، ومجموعها غطّى الزلازل والمغناطيسية والرياح الشمسية والنظام الشمسي بأسره.",
      },
    }),
    echoImage("as11-40-5942", {
      alt: {
        en: "Astronaut Buzz Aldrin kneeling beside the Apollo 11 experiments on the lunar surface.",
        ar: "رائد الفضاء باز ألدرين راكعاً بجانب تجارب أبولو 11 على سطح القمر.",
      },
      caption: {
        en: "The experiments were placed only a few metres from the lunar module, so that the descent stage's heat shield would protect them from the Sun during the two-week lunar night.",
        ar: "وُضعت التجارب على بُعد بضعة أمتار فقط من الوحدة القمرية، كي يحميها الدرع الحراري لمرحلة الهبوط من الشمس خلال ليل القمر الممتد لأسبوعين.",
      },
    }),
  ],
  facts: [
    {
      label: { en: "Packages", ar: "الحزم" },
      value: {
        en: "EASEP on Apollo 11; ALSEP on Apollo 12, 14, 15, 16 and 17.",
        ar: "EASEP في أبولو 11، وALSEP في أبولو 12 و14 و15 و16 و17.",
      },
    },
    {
      label: { en: "EASEP contents", ar: "محتويات EASEP" },
      value: {
        en: "Passive seismometer, laser ranging retroreflector and a solar wind experiment.",
        ar: "مقياس الزلازل خامل، ومُعيد عاكس بالليزر، وتجربة رياح شمسية.",
      },
    },
    {
      label: { en: "Power", ar: "الطاقة" },
      value: {
        en: "Solar panels with rechargeable batteries — enough for the two-week lunar night.",
        ar: "ألواح شمسية مع بطاريات قابلة لإعادة الشحن — تكفي لليل القمر الممتد لأسبوعين.",
      },
    },
    {
      label: { en: "Last switched off", ar: "أُطفئ آخرها" },
      value: { en: "1977", ar: "1977" },
    },
    {
      label: { en: "Still in use", ar: "لا تزال مستخدمة" },
      value: {
        en: "The laser retroreflectors, on every Apollo landing site from 11 onwards.",
        ar: "العاكسات بالليزر، في كل موقع هبوط لأبولو من 11 فصاعداً.",
      },
    },
  ],
  chapters: [
    {
      id: "meet",
      kind: "meet",
      eyebrow: { en: "Chapter one", ar: "الفصل الأول" },
      title: { en: "Meet the Explorer", ar: "تعرّف على المستكشِف" },
      summary: {
        en: "What was actually in the boxes, and why NASA built them to need so little.",
        ar: "ما كان داخل الصناديق فعلاً، ولماذا بنتها ناسا بحيث تحتاج القليل جداً.",
      },
      narrative: {
        en: [
          "The Apollo surface experiments were designed around a hard constraint: the Moon has no atmosphere, so every instrument had to survive the full temperature swing from lunar noon to lunar night — about fourteen Earth days of darkness — and there was no way to service any of them.",
          "The solution was to make almost everything passive. A seismometer with a solar panel and a rechargeable battery could simply sleep through the two-week night and wake up when the Sun came back. A retroreflector needed no power at all: it is a panel of corner-cube mirrors that returns any laser aimed at it. A sheet of aluminium foil facing the Sun catches solar wind particles and needs nothing else.",
          "Two versions were flown. The Early Apollo Scientific Experiments Package on Apollo 11 was small: a passive seismometer, the retroreflector and a solar wind collector. From Apollo 12 onwards, the larger Apollo Lunar Surface Experiments Package added an active seismic experiment that used the lunar module's own ascent engine as a sound source, a magnetometer, a charged particle detector and more.",
          "Several instruments were later carried back to Earth by visiting crews — a seismometer, the solar wind foil, a neutron spectrometer — so that laboratory analysis could replace the limited measurements made in the field.",
        ],
        ar: [
          "صُمِّمت تجارب أبولو السطحية حول قيد صلب: فالقمر بلا غلاف جوّي، فلا بدّ أن تصمد كل أداة أمام كامل الفارق الحراري من ظهيرة القمر إلى ليله — نحو أربعة عشر يوماً من الظلام على الأرض — ولا سبيل إلى صيانة أيٍّ منها.",
          "كانت الحل أن يكون كل شيء تقريباً خاملاً. فالمقياس الزلازل بلوح شمسي وبطارية قابلة لإعادة الشحن يمكنه أن «ينام» خلال الليل الأسبوعي ثم يستيقظ حين تعود الشمس. أما العاكس بالليزر فلا يحتاج طاقة إطلاقاً: إنه لوح من مرايا الزوايا الثلاثية يعيد أي شعاع ليزر يصوّبه. أما ورقة الألمنيوم المواجهة للشمس فتلتقط جسيمات الرياح الشمسية ولا تحتاج شيئاً غير ذلك.",
          "طُيّرت نسختان. كانت حزمة التجارب العلمية المبكرة في أبولو 11 صغيرة: مقياس الزلازل خامل، ومُعيد عاكس بالليزر، وجامع رياح شمسية. ومن أبولو 12 فصاعداً، أضافت حزمة تجارب أبولو السطحية الأكبر تجربة زلازل نشطة استخدمت محرك الصعود للوحدة القمرية نفسه مصدراً للصوت، ومقياس مغناطيسية، وكاشف جسيمات مشحونة، والمزيد.",
          "وقامت فرق لاحقة بإعادة عدة أجهزة إلى الأرض — مقياس الزلازل، وورقة الرياح الشمسية، ومقياس نيوترونات — لتحليل مخبري يحلّ محل القياسات المحدودة التي أُجريت في الميدان.",
        ],
      },
      echo: {
        en: "Here is the lovely engineering idea: if you cannot be repaired, then design something that does not need repairing. A mirror does not wear out.",
        ar: "ها هي فكرة الهندسة الجميلة: إن كنت لا تستطيع الإصلاح، فصمّم شيئاً لا يحتاج إلى إصلاح. والمرآة لا تتآكل.",
      },
      facts: [
        {
          label: { en: "Apollo 11 package", ar: "حزمة أبولو 11" },
          value: {
            en: "EASEP — seismometer, retroreflector, solar wind experiment.",
            ar: "EASEP — مقياس الزلازل، ومُعيد عاكس، وتجربة رياح شمسية.",
          },
        },
        {
          label: { en: "Later packages", ar: "الحزم اللاحقة" },
          value: {
            en: "ALSEP — added an active seismic experiment, magnetometer and particle detectors.",
            ar: "ALSEP — أُضيفت تجربة زلازل نشطة ومقياس مغناطيسية وكواشف جسيمات.",
          },
        },
        {
          label: { en: "Night survival", ar: "النجاة في الليل" },
          value: {
            en: "Rechargeable batteries carried through fourteen Earth days of darkness.",
            ar: "بطاريات قابلة لإعادة الشحن تصمد خلال أربعة عشر يوماً من الظلام.",
          },
        },
      ],
      diagram: {
        kind: "instrument-components",
        title: { en: "The Apollo 11 experiment package", ar: "حزمة تجارب أبولو 11" },
        intro: {
          en: "Select a marker to see what each instrument measured.",
          ar: "اختر أي علامة لترى ما قاسته كل أداة.",
        },
        points: [
          {
            id: "retroreflector",
            x: 30,
            y: 40,
            label: { en: "Laser retroreflector", ar: "مُعيد العاكس بالليزر" },
            detail: {
              en: "A panel of corner-cube mirrors. Fire a laser pulse at it from Earth and it returns the pulse almost exactly along the incoming path.",
              ar: "لوح من مرايا الزوايا الثلاثية. أرسل نبضة ليزر إليه من الأرض فيعيدها تقريباً على المسار نفسه الذي جاءت منه.",
            },
          },
          {
            id: "seismometer",
            x: 70,
            y: 34,
            label: { en: "Passive seismometer", ar: "مقياس الزلازل الخامل" },
            detail: {
              en: "It listened for vibrations in the Moon itself: thermal moonquakes, deep events, and meteor impacts.",
              ar: "كان يستمع إلى اهتزازات داخل القمر نفسه: زلازل حرارية، وأحداث عميقة، واحتطارات نيازك.",
            },
          },
          {
            id: "solarwind",
            x: 50,
            y: 70,
            label: { en: "Solar wind sheet", ar: "ورقة الرياح الشمسية" },
            detail: {
              en: "Aluminium foil on a pole, facing the Sun. It caught solar wind particles, and Apollo 15 later retrieved it for analysis on Earth.",
              ar: "رقاقة ألمنيوم على عمود يواجه الشمس. التقطت جسيمات الرياح الشمسية، واستعادها أبولو 15 لاحقاً لتحليلها على الأرض.",
            },
          },
        ],
      },
      quiz: [
        {
          id: "alsep-q1",
          prompt: {
            en: "Why did the Apollo instruments have to be designed for a fourteen-day night?",
            ar: "لماذا صُمِّمت أجهزة أبولو لتدوم ليلاً مدته أربعة عشر يوماً؟",
          },
          options: [
            {
              id: "a",
              label: {
                en: "Because the Moon has no atmosphere and no service crews",
                ar: "لأن القمر بلا غلاف جوّي وبلا أفق صيانة",
              },
            },
            {
              id: "b",
              label: {
                en: "Because the Moon's rotation is slow",
                ar: "لأن دوران القمر بطيء",
              },
            },
            {
              id: "c",
              label: {
                en: "Because the astronauts stayed for two weeks",
                ar: "لأن رواد الفضاء بقوا أسبوعين",
              },
            },
          ],
          correctOptionId: "a",
          explanation: {
            en: "There is no atmosphere to scatter light and no way to send someone to fix a broken instrument, so the equipment had to survive the long night on its own battery.",
            ar: "لا غلاف جوّي يبعثر الضوء، ولا وس لإرسال من يصلح جهازاً معطّلاً، لذا كان على المعدات أن تصمد في الليل الطويل بطاريتها وحدها.",
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
        en: "Six landings, six slightly different science packages, one very long night.",
        ar: "ستة هبوطات، وست حزم علمية مختلفة قليلاً، وليلة واحدة طويلة جداً.",
      },
      narrative: {
        en: [
          "Each Apollo mission that landed on the Moon carried its own surface science package, and the packages changed with the science questions of the day. Apollo 11's was minimal. Apollo 12 carried an active seismic experiment. Apollo 15 added a magnetometer that flew in a subsatellite as well as on the surface. Apollo 17 added a lunar seismic profiling experiment and a cold cathode ion gauge.",
          "One idea ran through all of them: measure something on the Moon that could only be measured there. The Earth's own geophysics laboratories could do almost anything a rover could do on Mars. What they could not do was sit on the Moon for decades and listen.",
          "The experiments were deployed by hand, within a few metres of the lunar module, using a simple rule: the solar panels had to face the Sun when the astronauts left, and the batteries had to survive from there.",
        ],
        ar: [
          "حملت كل مهمة أبولو هبطت على القمر حزمة علمية سطحية خاصة بها، وتغيّرت الحزم مع الأسئلة العلمية في تلك الحقبة — فحزمة أبولو 11 كانت مصغّرة، وحملت أبولو 12 تجربة زلازل نشطة،  وأضافت أبولو 15 مقياس مغناطيسية حلّق أيضاً في قمر فرعي، وأضافت أبولو 17 تجربة تصوير زلزالي للقمر وكاشف أيونات الكاثود البارد.",
          "وخلف جميعها فكرة واحدة: أن تقيس على القمر ما لا يمكن قياسه إلا هناك. فقد كانت مختبرات الجيوفيزياء على الأرض قادرة على كل ما تقريباً تفعله عربة على المريخ. أما ما لم تكن قادرة عليه فهي الجلوس على القمر عقوداً والإصغاء.",
          "نُشرت الأجهزة باليد، على بُعد بضعة أمتار من الوحدة القمرية، وفق قاعدة بسيطة: أن تواجه الألواح الشمسية الشمس عند مغادرة الطاقم، وأن تصمد البطاريات من هناك فصاعداً.",
        ],
      },
      echo: {
        en: "The Apollo science packages were built around one idea: make a measurement that only the Moon can give you.",
        ar: "بُنيت الحزم العلمية لأبولو حول فكرة واحدة: أن تصنع قياساً لا يستطيع إلا القمر أن يعطيك إياه.",
      },
      facts: [
        {
          label: { en: "Missions with surface experiments", ar: "المهمات ذات التجارب السطحية" },
          value: {
            en: "Apollo 11, 12, 14, 15, 16 and 17.",
            ar: "أبولو 11 و12 و14 و15 و16 و17.",
          },
        },
        {
          label: { en: "Deployed by", ar: "نشرها" },
          value: {
            en: "The astronauts, by hand, during the first EVA.",
            ar: "رواد الفضاء، باليد، خلال أول خرجة.",
          },
        },
        {
          label: { en: "Active seismic experiments", ar: "تجارب الزلازل النشطة" },
          value: {
            en: "Apollo 12 and 14 only.",
            ar: "أبولو 12 و14 فقط.",
          },
        },
      ],
      glossary: [
        {
          id: "corner-cube",
          term: { en: "Corner-cube mirror", ar: "مرآة الزاوية الثلاثية" },
          simple: {
            en: "Three mirrors set at right angles. Whatever angle the light arrives at, it leaves in almost exactly the same direction.",
            ar: "ثلاث مرايا متعامدة. مهما كانت زاوية وصول الضوء، يخرج في الاتجاه نفسه تقريباً.",
          },
        },
        {
          id: "subsatellite",
          term: { en: "Subsatellite", ar: "قمر فرعي" },
          simple: {
            en: "A small satellite released from the lunar module into lunar orbit to measure one thing away from the surface.",
            ar: "قمر صغير يُطلق من الوحدة القمرية إلى مدار القمر ليقيس شيئاً واحداً بعيداً عن السطح.",
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
        en: "Carried to the Moon by six crews, and left there in the dust for six decades.",
        ar: "حملتها ستة طواقم إلى القمر، وتركتها هناك في الغبار ستّة عقود.",
      },
      narrative: {
        en: [
          "The experiments reached the Moon the same way the astronauts did: on the lower half of the lunar module. They were carried in the descent stage's equipment bay, folded flat, and unpacked on the surface.",
          "Deploying them was quick. Unpack, place, orient the solar panel towards the Sun, connect the cable, walk away. The whole job took a fraction of the time the crew spent collecting samples.",
          "Then the instruments had to wait. For the first two weeks they were busy, transmitting data while the crew was on the surface. When the crew left, they were switched off one by one, and the surface of the Moon went quiet — except for the passive seismometers, which kept listening, and the retroreflectors, which never needed to be switched on at all.",
          "Several of them were later visited by other crews. Apollo 12 went to Surveyor 3. Apollo 15 retrieved the Apollo 11 solar wind foil. Apollo 16 collected the first rocks from the far side of the Moon.",
        ],
        ar: [
          "وصلت التجارب إلى القمر بالطريقة نفسها التي وصل بها رواد الفضاء: في النصف السفلي من الوحدة القمرية. وحُملت مطوية في غرفة معدات مرحلة الهبوط، ثم فُكّت على السطح.",
          "وكان نشرها سريعاً. فكّ العبوة، ضع، وجّه اللوح الشمسي نحو الشمس، وصِل الكابل، ثم امشِ. استغرق العمل كله جزءاً يسيراً من الوقت الذي قضاه الطاقم في جمع العينات.",
          "ثم كان على الأجهزة أن تنتظر. في الأسبوعين الأولين كانت نشطة، تبثّ البيانات بينما كان الطاقم على السطح. وحين غادر الطاقم أُطفئت واحدة تلو الأخرى، فسكت سطح القمر — باستثناء الزلزالات الخاملة التي ظلّت تستمع، والعاكسات التي لم تكن بحاجة إلى تشغيل أصلاً.",
          "وزار عدة منها فرق لاحقة. فقد ذهبت أبولو 12 إلى سورفيور 3. واستعادت أبولو 15 ورقة الرياح الشمسية من أبولو 11. وجمعت أبولو 16 أول صخور من الجانب البعيد من القمر.",
        ],
      },
      echo: {
        en: "This is my favourite kind of mission: cheap, small, and still producing data half a century later.",
        ar: "هذا نوع المهمات المفضّل لدي: رخيصة وصغيرة، وما تزال تنتج بيانات بعد نصف قرن.",
      },
      timeline: [
        {
          id: "alsep-11",
          date: "1969-07-21",
          dateLabel: { en: "21 July 1969", ar: "21 يوليو 1969" },
          label: { en: "Apollo 11 EASEP deployed", ar: "نشر EASEP في أبولو 11" },
          description: {
            en: "Armstrong and Aldrin set up the seismometer, the retroreflector and the solar wind experiment.",
            ar: "أقام آرمسترونغ وألدرين مقياس الزلازل والمُعيد العاكس وتجربة الرياح الشمسية.",
          },
          type: "deployment",
          sourceIds: ["SRC-ALSJ-A11-EASEP", "SRC-APOLLO-11"],
        },
        {
          id: "alsep-12",
          date: "1969-11-20",
          dateLabel: { en: "20 November 1969", ar: "20 نوفمبر 1969" },
          label: { en: "Apollo 12 ALSEP deployed", ar: "نشر ALSEP في أبولو 12" },
          description: {
            en: "The larger ALSEP package, including the active seismic experiment fired by the lunar module engine.",
            ar: "حزمة ALSEP الأكبر، ومنها تجربة الزلازل النشطة التي يشعلها محرك الوحدة القمرية.",
          },
          type: "deployment",
          sourceIds: ["SRC-APOLLO-12"],
        },
        {
          id: "alsep-retrieve",
          date: "1971-08-01",
          dateLabel: { en: "August 1971", ar: "أغسطس 1971" },
          label: { en: "Solar wind foil retrieved", ar: "استعادة ورقة الرياح الشمسية" },
          description: {
            en: "The Apollo 15 crew retrieved the Apollo 11 solar wind experiment sheet and brought it back to Earth.",
            ar: "استعاد طاقم أبولو 15 ورقة تجربة الرياح الشمسية من أبولو 11 وأعادها إلى الأرض.",
          },
          type: "first-operation",
          sourceIds: ["SRC-ALSJ-A11-EASEP"],
        },
        {
          id: "alsep-17",
          date: "1972-12-14",
          dateLabel: { en: "14 December 1972", ar: "14 ديسمبر 1972" },
          label: { en: "Apollo 17 ALSEP deployed", ar: "نشر ALSEP في أبولو 17" },
          description: {
            en: "The last surface experiments of the programme, including a cold cathode ion gauge.",
            ar: "آخر التجارب السطحية في البرنامج، ومنها كاشف أيونات الكاثود البارد.",
          },
          type: "deployment",
          sourceIds: ["SRC-APOLLO-17"],
        },
        {
          id: "alsep-off",
          date: "1977-09-30",
          dateLabel: { en: "1977", ar: "1977" },
          label: { en: "Last experiments switched off", ar: "إطفاء آخر التجارب" },
          description: {
            en: "The remaining active Apollo surface experiments were shut down in 1977, ending the Apollo surface science programme.",
            ar: "أُطفقت التجارب السطحية النشطة المتبقية من أبولو عام 1977، منهياً برنامج أبولو للعلوم السطحية.",
          },
          type: "shutdown",
          sourceIds: ["SRC-APOLLO-17"],
        },
      ],
      diagram: {
        kind: "journey-map",
        title: { en: "Six landing sites across the Moon", ar: "ستة مواقع هبوط حول القمر" },
        intro: {
          en: "Each mission left a laboratory at a different place.",
          ar: "كل مهمة تركت مختبراً في مكان مختلف.",
        },
        route: [
          {
            label: { en: "Apollo 11", ar: "أبولو 11" },
            description: { en: "Mare Tranquillitatis", ar: "بحر الهدوء" },
          },
          {
            label: { en: "Apollo 12", ar: "أبولو 12" },
            description: { en: "Oceanus Procellarum", ar: "محيط العواصف" },
          },
          {
            label: { en: "Apollo 14", ar: "أبولو 14" },
            description: { en: "Fra Mauro", ar: "فرا مورو" },
          },
          {
            label: { en: "Apollo 15–17", ar: "أبولو 15–17" },
            description: {
              en: "Hadley–Apennine, Descartes, Taurus–Littrow",
              ar: "هادلي–أبينين، ديسكارت، ثوروس–ليترو",
            },
          },
        ],
        points: [
          {
            id: "near-side",
            x: 78,
            y: 30,
            label: { en: "Near side", ar: "الجانب القريب" },
            detail: {
              en: "All six Apollo landing sites are on the side of the Moon that faces Earth.",
              ar: "جميع مواقع هبوط أبولو الستة في الجانب المواجه للأرض.",
            },
          },
          {
            id: "far-side",
            x: 22,
            y: 66,
            label: { en: "Far side", ar: "الجانب البعيد" },
            detail: {
              en: "The far side has never been visited by people. Its radio silence is why a relay satellite was needed.",
              ar: "لم يزُر الجانب البعيد إنسان قط. وصمته الراديوي هو سبب الحاجة إلى قمر relay.",
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
        en: "What a seismometer, a mirror and a sheet of foil each managed to find out.",
        ar: "ماmanaged أن يعرفه مقياس الزلازل ومرآة وورقة foil.",
      },
      narrative: {
        en: [
          "The three most important instruments left on the Moon each answered a different kind of question — about the Moon's interior, about the Earth–Moon system, and about the Sun's influence on planets.",
        ],
        ar: [
          "أهم ثلاثة أجهزة تُركت على القمر أجابت كل منها عن نوع مختلف من الأسئلة — عن باطن القمر، وعن نظام الأرض–القمر، وعن أثر الشمس في الكواكب.",
        ],
      },
      echo: {
        en: "Three instruments, three very different questions. Pick one and I'll walk you through it.",
        ar: "ثلاثة أجهزة، وثلاثة أسئلة مختلفة تماماً. اختر واحداً وسأشرحه لك.",
      },
      discoveries: [
        {
          id: "alsep-d1",
          title: {
            en: "How far away is the Moon, to the centimetre?",
            ar: "كم تبعد مسافة القمر إلى سنتيمتر واحد؟",
          },
          question: {
            en: "How precisely can we measure the Earth–Moon distance?",
            ar: "إلى أي دقّة يمكننا قياس مسافة الأرض–القمر؟",
          },
          instrument: {
            en: "Laser Ranging Retroreflector",
            ar: "مُعيد العاكس بالليزر",
          },
          method: {
            en: "Observatories fire a laser pulse at the retroreflector and measure the round-trip time to a few picoseconds. Because the corner-cube mirrors send the light back along the same path, the measurement is a straightforward distance.",
            ar: "ترسل المراصد نبضة ليزر إلى العاكس وتقيس زمن الذهاب والإياب بدقة picoseconds القليلة. ولأن مرايا الزاوية الثلاثية تعيد الضوء على المسار نفسه، تكون النتيجة قياساً مباشراً للمسافة.",
          },
          data: {
            en: "The returned pulse is extremely weak — a fraction of a photon per square metre — but the timing is extraordinarily precise.",
            ar: "النبضة العائدة ضعيفة للغاية — جزء من الفوتون لكل متر مربع — لكن التوقيت دقيق إلى حدّ بعيد.",
          },
          finding: {
            en: "The Earth–Moon distance is known to a few centimetres, which is precise enough to notice that the Moon is slowly moving away from Earth, about 3.8 centimetres a year.",
            ar: "تُعرف مسافة الأرض–القمر إلى بضعة سنتيمترات، بدقة تكفي لملاحظة أن القمر يبتعد عن الأرض ببطء، نحو 3.8 سنتيمتراً في السنة.",
          },
          significance: {
            en: "The same measurements constrain the Moon's rotation, test general relativity, and let scientists weigh the Moon as it responds to Earth's tides.",
            ar: "القياسات نفسها تقيّد دوران القمر، وتختبر النسبية العامة، وتتيح للعلماء وزن القمر وهو يستجيب لمدّ الأرض.",
          },
          sourceIds: ["SRC-NSSDCA-APOLLO-11-LRRR", "SRC-LRRR"],
        },
        {
          id: "alsep-d2",
          title: {
            en: "The Moon's interior is alive",
            ar: "باطن القمر حيّ",
          },
          question: {
            en: "Is the Moon geologically dead inside?",
            ar: "هل باطن القمر ميّت جيولوجياً؟",
          },
          instrument: {
            en: "Passive Seismic Experiment",
            ar: "تجربة الزلازل الخاملة",
          },
          method: {
            en: "The seismometers left at each landing site listened continuously. The active seismic experiment on Apollo 12 and 14 went further: the crew fired the lunar module's ascent engine, and the seismometers timed the vibrations as they travelled down through the crust.",
            ar: "استمعت الزلزالات الموزّعة في كل موقع هبوط باستمرار. وذهبت تجربة الزلازل النشطة في أبولو 12 و14 أبعد من ذلك: فقد أشعل الطاقم محرك صعود الوحدة القمرية، وقيست الزلزالات زمن وصول الاهتزازات وهي تنزل عبر القشرة.",
          },
          data: {
            en: "The active experiment showed the crust is about 25 to 38 kilometres thick in the regions sampled, and revealed layers within it. The passive seismometers recorded ongoing moonquakes for years.",
            ar: "أظهرت التجربة النشطة أن القشرة سُمكها نحو 25 إلى 38 كيلومتراً في المناطق التي دُرست، وكشفت طبقات داخلها. وسجّلت الزلزالات الخاملة زلازل قمرية مستمرة لسنوات.",
          },
          finding: {
            en: "The Moon is still active: it expands and contracts as it cools, it rings after an impact, and deep moonquakes occur on a monthly cycle.",
            ar: "القمر ما زال نشطاً: يتمدد وينكمش وهو يبرد، ويرنّ بعد الارتطام، وتحدث زلازل قمرية عميقة بدورة شهرية.",
          },
          significance: {
            en: "This is the only place in the solar system where we can place seismometers on the surface and listen for decades without any of it being simulated.",
            ar: "هذا هو المكان الوحيد في المجموعة الشمسية где يمكننا وضع زلزالات على السطح والإصغاء لعقود دون أن يكون أيٌّ منها محاكاة.",
          },
          sourceIds: ["SRC-ALSJ-A11-EASEP", "SRC-APOLLO-11"],
        },
        {
          id: "alsep-d3",
          title: {
            en: "The solar wind, caught and brought home",
            ar: "الرياح الشمسية، تُلتقط وتُحمل إلى الأرض",
          },
          question: {
            en: "What does the Sun blow at the Moon, and does it matter for other planets?",
            ar: "ماذا تهبّ الشمس على القمر، وهل يهمّ ذلك الكواكب الأخرى؟",
          },
          instrument: {
            en: "Solar Wind Composition experiment and the ALSEP charged particle detectors",
            ar: "تجربة تركيب الرياح الشمسية وكواشف الجسيمات المشحونة في ALSEP",
          },
          method: {
            en: "The solar wind experiment deployed an aluminium foil sheet facing the Sun. Charged particles from the Sun embedded themselves in the metal, which was later brought back to Earth and analysed in a laboratory.",
            ar: "نشرت تجربة الرياح الشمسية ورقة من رققة الألمنيوم مواجهة للشمس. وانغرست الجسيمات المشحونة القادمة من الشمس في المعدن، الذي أُعيد لاحقاً إلى الأرض وحلِّل في المختبر.",
          },
          data: {
            en: "The foil recorded the composition of the solar wind at the lunar surface, and the magnetometers measured how the solar wind interacts with the Moon's magnetic field.",
            ar: "سجّلت الورقة تركيب الرياح الشمسية عند السطح القمري، وقاست مقاييس المغناطيسيةhow تتفاعل الرياح الشمسية مع المجال المغناطيسي للقمر.",
          },
          finding: {
            en: "The solar wind reaches the lunar surface and is slowed and deflected by the Moon's magnetic field.",
            ar: "تصل الرياح الشمسية إلى سطح القمر، فتُبطَأ وتحرف بالمجال المغناطيسي للقمر.",
          },
          significance: {
            en: "The same process has been stripping Mars's atmosphere for billions of years. Understanding it on the Moon is part of understanding what happened to Mars.",
            ar: "والعملية نفسها تنزع الغلاف الجوي للمريخ منذ مليارات السنين. وفهمها على القمر جزءٌ من فهم ما حدث للمريخ.",
          },
          sourceIds: ["SRC-ALSJ-A11-EASEP"],
        },
      ],
      quiz: [
        {
          id: "alsep-q2",
          prompt: {
            en: "Which Apollo instrument needed no power supply at all?",
            ar: "أي جهاز من أجهزة أبولو لم يحتاج إلى مصدر طاقة إطلاقاً؟",
          },
          options: [
            {
              id: "a",
              label: { en: "The laser retroreflector", ar: "المُعيد العاكس بالليزر" },
            },
            { id: "b", label: { en: "The seismometer", ar: "مقياس الزلازل" } },
            { id: "c", label: { en: "The magnetometer", ar: "مقياس المغناطيسية" } },
          ],
          correctOptionId: "a",
          explanation: {
            en: "The retroreflector is a set of mirrors. It has no electronics, so it has nothing to run out of power. Every other instrument needed solar panels and batteries.",
            ar: "العاكس مجموعة مرايا. فلا إلكترونيات فيه، فلا شيء ينفد منه التيار. أما بقية الأجهزة فاحتاجت ألواحاً شمسية وبطاريات.",
          },
        },
        {
          id: "alsep-q3",
          prompt: {
            en: "What did the active seismic experiment use as its sound source?",
            ar: "ماذا استخدمت تجربة الزلازل النشطة مصدراً للصوت؟",
          },
          options: [
            {
              id: "a",
              label: {
                en: "An explosive charge on the surface",
                ar: "شحنة متفجرة على السطح",
              },
            },
            {
              id: "b",
              label: {
                en: "The lunar module's ascent engine",
                ar: "محرك صعود الوحدة القمرية",
              },
            },
            {
              id: "c",
              label: {
                en: "A loudspeaker left by the astronauts",
                ar: "سماعة تركها رواد الفضاء",
              },
            },
          ],
          correctOptionId: "b",
          explanation: {
            en: "On Apollo 12 and 14 the crew fired the lunar module's ascent engine as a deliberate, known sound source, which let the seismometers work out the structure of the lunar crust.",
            ar: "في أبولو 12 و14 أشعل الطاقم محرك صعود الوحدة القمرية مصدراً صوتياً معروفاً ومتعمّداً، مما مكّن الزلزالات من تحديد بنية القشرة القمرية.",
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
        en: "Which instruments stopped, which never started, and which one still answers.",
        ar: "أي الأجهزة توقفت، وأيها لم يبدأ أصلاً، وأيها ما زال يجيب.",
      },
      narrative: {
        en: [
          "There was no single dramatic last signal, because the experiments did not all end the same way.",
          "The seismometers that had solar panels and batteries ran until their batteries were exhausted or the hardware failed. The Apollo 12 and 14 active experiments stopped when their crews left. The magnetometers on the surface and in orbit ran until the programme was formally closed in 1977, when the last of the Apollo surface experiments was switched off.",
          "The retroreflectors never transmitted anything at all. They are still exactly as they were, and they are still working every time a ground station fires a laser at them.",
          "And then there are the objects that were taken back: the seismometer retrieved by Apollo 15, the solar wind foil, the neutron spectrometer from Apollo 17. Those are the only pieces of the Apollo surface programme that are no longer on the Moon — because they came home.",
        ],
        ar: [
          "لم تكن هناك إشارة أخيرة درامية واحدة، لأن التجارب لم تنتهِ كلها بالطريقة نفسها.",
          " أما الزلزالات التي كانت لها ألواح شمسية وبطاريات فعملت حتى نفدت بطارياتها أو تعطّل عتادها. وتوقفت تجارب الزلازل النشطة في أبولو 12 و14 حين غادر طاقمهما. أما مقاييس المغناطيسية على السطح وفي المدار فعملت حتى أُغلق البرنامج رسمياً عام 1977، حين أُطفئ آخر التجارب السطحية.",
          "أما العاكسات بالليزر فلا تبثّ شيئاً إطلاقاً. فهي تماماً كما تركت، ولا تزال تعمل في كل مرة تُطلق فيها محطة أرضية شعاع ليزر نحوها.",
          "وهناك بعد ذلك الأشياء التي أُعيدت إلى الأرض: مقياس الزلازل الذي استعادته أبولو 15، وورقة الرياح الشمسية، ومقياس النيوترونات من أبولو 17. وهي القطع الوحيدة من برنامج أبولو السطحي التي لم تعد على القمر — لأنها عادت إلى الأرض.",
        ],
      },
      echo: {
        en: "This is the honest ending: no single last signal. Some instruments stopped, some never started, and one is still answering every time we ask.",
        ar: "هذه هي النهاية الصادقة: لا إشارة أخيرة واحدة. بعضها توقف، وبعضها لم يبدأ أصلاً، وواحد لا يزال يجيب كلما سألناه.",
      },
      facts: [
        {
          label: { en: "Active experiments", ar: "التجارب النشطة" },
          value: {
            en: "Switched off in 1977.",
            ar: "أُطفئت عام 1977.",
          },
        },
        {
          label: { en: "Retroreflectors", ar: "العاكسات" },
          value: {
            en: "Never needed power; still in daily use.",
            ar: "لم تحتج طاقة قط؛ ولا تزال مستخدمة يومياً.",
          },
        },
        {
          label: { en: "Brought home", ar: "أُعيدت إلى الأرض" },
          value: {
            en: "A seismometer, the solar wind foil, and a neutron spectrometer.",
            ar: "مقياس الزلازل، وورقة الرياح الشمسية، ومقياس نيوترونات.",
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
        en: "The most valuable instruments ever left on another world.",
        ar: "أثمن ما تُرك على عالم آخر من أجهزة.",
      },
      narrative: {
        en: [
          "Lunar laser ranging has been running continuously since the Apollo 11 retroreflector was first used in 1969. It is one of the longest unbroken scientific measurements in history, and it costs almost nothing to keep going.",
          "The Apollo seismometer network made the Moon the only planetary body other than Earth where we have ever listened to the interior directly. Every future lunar lander that carries a seismometer will be extending a network started six decades ago.",
          "The magnetometers quietly produced one of the first measured pictures of how a planet's magnetic field interacts with the solar wind, work that is directly relevant to Mars today, where the solar wind has been removing the atmosphere.",
          "And then there is the thing that is easy to miss: the reason these instruments still work is that they were built with no expectation of being visited. They were designed to be left, and in the long run, being left is what made them valuable.",
        ],
        ar: [
          "إن قياس المسافة بالليزر على القمر لم يتوقف منذ أول استخدام للمُعيد العاكس في أبولو 11 عام 1969. وهو أحد أطول القياسات العلمية المتصلة في التاريخ، وكلفته للاستمرار تكاد تكون صفرية.",
          "وقد جعلت شبكة زلزالات أبولو القمر الجسم الكوكبي الوحيد — غير الأرض — الذي استطعنا الإصغاء إلى باطنه مباشرةً. وكل مركبة هبوط قمرية قادمة تحمل مقياس الزلازل ستمتدّ شبكة بدأت قبل ستة عقود.",
          "وأنتجت مقاييس المغناطيسية بهدوء إحدى أولى الصور المقيسة لتفاعل المجال المغناطيسي للكوكب مع الرياح الشمسية، وهو عمل ذو صلة مباشرة بالمريخ اليوم حيث تنزع الرياح الشمسية الغلاف الجوي.",
          "ثم هناك ما يسهل إغفاله: سبب استمرار عمل هذه الأجهزة أنها بُنيت دون أي توقّع لزيارتها. صُمِّمت لتُترك، وعلى المدى الطويل، فالترك هو ما جعلها ذات قيمة.",
        ],
      },
      echo: {
        en: "They were left behind, and that is exactly why they are still valuable. Nothing about them was designed for a visit.",
        ar: "تُركت خلفها، وهذا بالضبط سبب بقاء قيمتها. لم يُصمَّم فيها شيء من أجل الزيارة.",
      },
      facts: [
        {
          label: { en: "Longest running measurement", ar: "أطول قياس مستمر" },
          value: {
            en: "Lunar laser ranging, continuous since 1969.",
            ar: "القياس بالليزر على القمر، مستمر منذ 1969.",
          },
        },
        {
          label: { en: "Precision", ar: "الدقّة" },
          value: {
            en: "The Earth–Moon distance is known to a few centimetres.",
            ar: "تُعرف مسافة الأرض–القمر إلى بضعة سنتيمترات.",
          },
        },
        {
          label: { en: "Still waiting", ar: "لا تزال بانتظار" },
          value: {
            en: "Future landers will add seismometers to the network.",
            ar: "ستضيف مركبات الهبوط القادمة زلزالات إلى الشبكة.",
          },
        },
      ],
    },
  ],
  legacyStatement: {
    en: "Some missions end. Their discoveries live forever.",
    ar: "بعض المهام تنتهي. أما اكتشافاتها فتعيش للأبد.",
  },
  tags: ["moon", "instrument", "remnant"],
  artifactId: "apollo-11-lrrr",
  sourceIds: [
    "SRC-ALSJ-A11-EASEP",
    "SRC-NSSDCA-APOLLO-11-LRRR",
    "SRC-APOLLO-11",
    "SRC-APOLLO-12",
  ],
  relatedStorySlugs: ["apollo-11-lm-descent-stage", "opportunity"],
  echoIntro: {
    en: "Today we visit the quietest laboratory ever built. Its instruments are small, its power is tiny, and it is still working.",
    ar: "اليوم نزور أهدأ مختبر بُني على الإطلاق. أجهزته صغيرة، وطاقته زهيدة، وهو لا يزال يعمل.",
  },
  echoSignoff: {
    en: "Six landings, six laboratories, all still sitting in the dust with their solar panels facing the Sun.",
    ar: "ستة هبوطات، وستة مختبرات، ما تزال كلها جالسة في الغبار وألواحها الشمسية تواجه الشمس.",
  },
  lastVerified: "2026-11-13",
};
