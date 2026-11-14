import type { EchoStory } from "@/types/echo";
import { echoImage } from "./media";

/**
 * SURVEYOR — the robots that proved the Moon could be landed on.
 *
 * Sources: the NASA Science Surveyor 1 and Surveyor 3 mission pages and the
 * NSSDCA spacecraft records for both landers.
 */
export const surveyorStory: EchoStory = {
  id: "surveyor-landers",
  slug: "surveyor-landers",
  title: {
    en: "Surveyor Landers",
    ar: "مركبات الهبوط سيرفيور",
  },
  storyTitle: {
    en: "The First Soft Landing",
    ar: "أول هبوط ناعم",
  },
  dek: {
    en: "Before Apollo, seven robotic spacecraft tried to land gently on the Moon. Five made it. Two of them are still there, and one was visited by astronauts.",
    ar: "قبل أبولو، حاولت سبع مركبات روبوتية الهبوط بلطف على القمر. ونجحت خمس. وما زالت اثنتان منها هناك، وزار روّاد الفضاء إحداهما.",
  },
  summary: {
    en: "Surveyor was NASA's robotic rehearsal for Apollo. Between 1966 and 1968 the programme tested soft landings, photographed the surface and measured how lunar soil would behave under a spacecraft's weight. Surveyor 1 made the first successful American soft landing on the Moon in June 1966. Surveyor 3 landed in April 1967 and was later visited by the Apollo 12 crew, who photographed it and brought selected parts back to Earth.",
    ar: "كان سيرفيور تدريباً روبوتياً من ناسا لأبولو. بين عامي 1966 و1968 اختبر البرنامج الهبوط اللطيف، وصوّر السطح، وقاس كيف ستتصرف تربة القمر تحت وزن مركبة فضائية. وقد حققت سيرفيور 1 أول هبوط أمريكي ناعم ناجح على القمر في يونيو 1966. وهبطت سيرفيور 3 في أبريل 1967، وزارها لاحقاً طاقم أبولو 12 فصوّروها وأعادوا أجزاء مختارة منها إلى الأرض.",
  },
  location: {
    en: "Oceanus Procellarum, the Moon",
    ar: "محيط العواصف، القمر",
  },
  locationNote: {
    en: "Surveyor 1 and Surveyor 3 both landed in Oceanus Procellarum. Surveyor 3's site is close to where Apollo 12 touched down in November 1969.",
    ar: "هبطت سيرفيور 1 وسيرفيور 3 معاً في محيط العواصف. وموقع سيرفيور 3 قريب من المكان الذي هبط فيه أبولو 12 في نوفمبر 1969.",
  },
  equipmentType: {
    en: "Robotic lunar lander",
    ar: "مركبة هبوط قمرية روبوتية",
  },
  missionPeriod: {
    en: "Surveyor 1: launched 30 May 1966 · landed 2 June 1966 · Surveyor 3: launched 17 April 1967 · landed 20 April 1967",
    ar: "سيرفيور 1: أُطلقت في 30 مايو 1966 · هبطت في 2 يونيو 1966 · سيرفيور 3: أُطلقت في 17 أبريل 1967 · هبطت في 20 أبريل 1967",
  },
  missionStatus: {
    en: "Mission complete — the Surveyor programme ended in 1968 after five successful landings.",
    ar: "اكتملت المهمة — انتهى برنامج سيرفيور عام 1968 بعد خمسة هبوطات ناجحة.",
  },
  hardwareStatus: {
    en: "Inactive — Surveyor 1 and Surveyor 3 remain on the lunar surface.",
    ar: "غير نشطة — ما زالت سيرفيور 1 وسيرفيور 3 على سطح القمر.",
  },
  statusKind: "left-behind",
  accent: "#B9C6D8",
  accentSoft: "#EDF1F7",
  badge: {
    en: "Soft Landing",
    ar: "هبوط ناعم",
  },
  badgeKey: "soft-landing",
  hero: echoImage("as12-48-7121", {
    alt: {
      en: "The Surveyor 3 spacecraft sitting on the slope of a small crater, photographed by the Apollo 12 crew.",
      ar: "مركبة سيرفيور 3 جالسة على منحدر فوهة صغيرة، كما صوّرها طاقم أبولو 12.",
    },
    caption: {
      en: "Surveyor 3 in its crater in Oceanus Procellarum, photographed during the Apollo 12 mission in November 1969.",
      ar: "سيرفيور 3 في فوهتها بمحيط العواصف، كما صُوّرت خلال مهمة أبولو 12 في نوفمبر 1969.",
    },
  }),
  gallery: [
    echoImage("PIA02976", {
      alt: {
        en: "The long shadow of Surveyor 1 cast across the lunar surface.",
        ar: "ظل سيرفيور 1 الطويل ممدوداً على سطح القمر.",
      },
      caption: {
        en: "Surveyor 1's shadow. The lander returned thousands of images and showed engineers what the surface was really like.",
        ar: "ظل سيرفيور 1. أعادت المركبة آلاف الصور وأرت المهندسين كيف يكون السطح فعلاً.",
      },
    }),
    echoImage("AS12-48-7133", {
      alt: {
        en: "Two American spacecraft on the Moon: the Apollo 12 lunar module and Surveyor 3 in the distance.",
        ar: "مركبتان أمريكيتان على القمر: مركبة الهبوط القمرية لأبولو 12 وسيرفيور 3 في البعيد.",
      },
      caption: {
        en: "The Apollo 12 lunar module and Surveyor 3 in the same frame. The crew landed nearby on purpose to visit the older robot.",
        ar: "مركبة الهبوط القمرية لأبولو 12 وسيرفيور 3 في الإطار نفسه. هبط الطاقم قريباً عن قصد لزيارة الروبوت الأقدم.",
      },
    }),
    echoImage("PIA12910", {
      alt: {
        en: "A NASA image celebrating Surveyor 1, America's first soft landing on the Moon.",
        ar: "صورة من ناسا تحتفي بسيرفيور 1، أول هبوط أمريكي ناعم على القمر.",
      },
      caption: {
        en: "Surveyor 1 proved that a spacecraft could reach the Moon and stay intact. Apollo depended on that proof.",
        ar: "أثبتت سيرفيور 1 أن مركبة فضائية تستطيع الوصول إلى القمر والبقاء سليمة. وقد اعتمد أبولو على هذا الإثبات.",
      },
    }),
  ],
  facts: [
    {
      label: { en: "Surveyor 1 launch mass", ar: "كتلة إطلاق سيرفيور 1" },
      value: { en: "About 995 kg", ar: "نحو 995 كغ" },
    },
    {
      label: { en: "Surveyor 3 launch mass", ar: "كتلة إطلاق سيرفيور 3" },
      value: { en: "About 1,026 kg", ar: "نحو 1,026 كغ" },
    },
    {
      label: { en: "First soft landing", ar: "أول هبوط ناعم" },
      value: { en: "Surveyor 1, 2 June 1966", ar: "سيرفيور 1، 2 يونيو 1966" },
    },
    {
      label: { en: "Surveyor 3 landing", ar: "هبوط سيرفيور 3" },
      value: { en: "20 April 1967", ar: "20 أبريل 1967" },
    },
    {
      label: { en: "Later visitor", ar: "الزائر اللاحق" },
      value: { en: "Apollo 12, November 1969", ar: "أبولو 12، نوفمبر 1969" },
    },
    {
      label: { en: "Programme result", ar: "نتيجة البرنامج" },
      value: {
        en: "Seven launched, five landed successfully.",
        ar: "سبع مركبات أُطلقت، وخمس نجحت في الهبوط.",
      },
    },
  ],
  chapters: [
    {
      id: "meet",
      kind: "meet",
      eyebrow: { en: "Chapter one", ar: "الفصل الأول" },
      title: { en: "Meet the Pathfinder", ar: "تعرّف على الرائد" },
      summary: {
        en: "A three-legged robot with a television camera and a very important question: will the ground hold?",
        ar: "روبوت بثلاث أرجل وكاميرا تلفزيونية وسؤال مهم جداً: هل ستثبت الأرض؟",
      },
      narrative: {
        en: [
          "Surveyor was not designed to explore. It was designed to answer an engineering question that had to be settled before astronauts could go: could a spacecraft descend to the Moon under control, touch down gently and keep working?",
          "The lander had three legs, a central body and a set of engines for the final descent. Its television camera could be pointed at the surface, and its instruments could measure the strength and texture of the soil. It was a robot doing the dangerous homework for the crewed missions that would follow.",
          "Seven Surveyors were launched between 1966 and 1968. Five landed successfully. The failures were part of the programme too: they showed how unforgiving a landing on an airless world could be.",
        ],
        ar: [
          "لم تُصمَّم سيرفيور للاستكشاف، بل للإجابة عن سؤال هندسي كان لا بد من حسمه قبل أن يذهب روّاد الفضاء: هل تستطيع مركبة فضائية أن تهبط على القمر تحت السيطرة، وتلمس السطح بلطف، وتواصل العمل؟",
          "كان للمركبة ثلاث أرجل وجسم مركزي ومجموعة محركات للهبوط الأخير. وكانت كاميرتها التلفزيونية تستطيع التوجه إلى السطح، وأجهزتها تقيس قوة التربة ونسيجها. كان روبوتاً يؤدّي الواجب المدرسي الخطير عن المهمات المأهولة التي ستأتي.",
          "أُطلقت سبع مركبات سيرفيور بين عامي 1966 و1968، وهبطت خمس بنجاح. وكانت الإخفاقات جزءاً من البرنامج أيضاً: فقد أظهرت كم يكون الهبوط على عالم بلا هواء قاسياً.",
        ],
      },
      echo: {
        en: "Before anyone could walk on the Moon, a robot had to prove the ground would hold.",
        ar: "قبل أن يستطيع أحد المشي على القمر، كان على روبوت أن يثبت أن الأرض ستثبت.",
      },
      facts: [
        {
          label: { en: "Legs", ar: "الأرجل" },
          value: { en: "Three", ar: "ثلاث" },
        },
        {
          label: { en: "Primary job", ar: "المهمة الأساسية" },
          value: {
            en: "Demonstrate a controlled soft landing.",
            ar: "إثبات هبوط ناعم تحت السيطرة.",
          },
        },
        {
          label: { en: "Main instrument", ar: "الجهاز الرئيسي" },
          value: {
            en: "A steerable television camera.",
            ar: "كاميرا تلفزيونية قابلة للتوجيه.",
          },
        },
      ],
      diagram: {
        kind: "lander-components",
        title: { en: "The Surveyor lander", ar: "مركبة هبوط سيرفيور" },
        intro: {
          en: "Select a marker to see what that part of the lander did.",
          ar: "اختر أي علامة لترى وظيفة ذلك الجزء من مركبة الهبوط.",
        },
        points: [
          {
            id: "camera",
            x: 30,
            y: 26,
            label: { en: "Television camera", ar: "الكاميرا التلفزيونية" },
            detail: {
              en: "A steerable television camera sent thousands of pictures of the surface back to Earth.",
              ar: "أرسلت كاميرا تلفزيونية قابلة للتوجيه آلاف صور السطح إلى الأرض.",
            },
          },
          {
            id: "power",
            x: 68,
            y: 34,
            label: { en: "Solar panel and battery", ar: "اللوح الشمسي والبطارية" },
            detail: {
              en: "A solar panel charged a battery, and the electronics had to survive the burning lunar day and the deep cold of night.",
              ar: "لوح شمسي يشحن بطارية، وكان على الإلكترونيات أن تصمد أمام حرارة نهار القمر وبرد ليله القارس.",
            },
          },
          {
            id: "engines",
            x: 50,
            y: 60,
            label: { en: "Descent engines", ar: "محركات الهبوط" },
            detail: {
              en: "A solid retro-rocket did most of the braking, then three liquid engines took over for the final, radar-guided descent.",
              ar: "صاروخ تباطؤ صلب تولّى معظم التباطؤ، ثم تولّت ثلاثة محركات سائلة النزول الأخير بإرشاد الرادار.",
            },
          },
          {
            id: "legs",
            x: 24,
            y: 80,
            label: { en: "Landing legs", ar: "أرجل الهبوط" },
            detail: {
              en: "Three legs with footpads absorbed the landing and told engineers how firm the lunar soil was.",
              ar: "ثلاثة أرجل بأقراص أقدام استوعبت الهبوط وأخبرت المهندسين بمدى تماسك تربة القمر.",
            },
          },
        ],
      },
      quiz: [
        {
          id: "sur-q1",
          prompt: {
            en: "What was Surveyor's most important job?",
            ar: "ما أهم عمل لسيرفيور؟",
          },
          options: [
            {
              id: "a",
              label: {
                en: "To prove that a soft landing on the Moon was possible.",
                ar: "إثبات أن الهبوط الناعم على القمر ممكن.",
              },
            },
            {
              id: "b",
              label: {
                en: "To search for life on the Moon.",
                ar: "البحث عن حياة على القمر.",
              },
            },
            {
              id: "c",
              label: {
                en: "To bring samples back to Earth.",
                ar: "إعادة عينات إلى الأرض.",
              },
            },
          ],
          correctOptionId: "a",
          explanation: {
            en: "Surveyor was an engineering precursor to Apollo. Its landings tested the descent, the surface and the soil before astronauts risked a crewed landing.",
            ar: "كانت سيرفيور مقدمة هندسية لأبولو. فقد اختبرت هبوطاتها النزول والسطح والتربة قبل أن يخاطر روّاد الفضاء بهبوط مأهول.",
          },
        },
      ],
    },
    {
      id: "mission",
      kind: "mission",
      eyebrow: { en: "Chapter two", ar: "الفصل الثاني" },
      title: { en: "The Landing Campaign", ar: "حملة الهبوط" },
      summary: {
        en: "Seven launches, five landings, and a programme that learned from every failure.",
        ar: "سبعة إطلاقات وخمسة هبوطات وبرنامج تعلّم من كل إخفاق.",
      },
      narrative: {
        en: [
          "Surveyor 1 launched on 30 May 1966 and landed in Oceanus Procellarum on 2 June. It was the first American spacecraft to make a soft landing on the Moon, and it immediately began returning images of the surface around it.",
          "Later missions carried more instruments and landed in different terrain. Surveyor 3 touched down on 20 April 1967 on the slope of a small crater. It operated for a few weeks, then fell silent in May.",
          "The programme ended in 1968. By then it had given Apollo engineers the data they needed: the surface could support a lander, the soil behaved in a predictable way, and the Moon was not covered in deep dust that would swallow a spacecraft.",
        ],
        ar: [
          "أُطلقت سيرفيور 1 في 30 مايو 1966 وهبطت في محيط العواصف في 2 يونيو. وكانت أول مركبة أمريكية تهبط بلطف على القمر، وبدأت فوراً بإعادة صور للسطح حولها.",
          "حملت المهمات اللاحقة أجهزة أكثر وهبطت في تضاريس مختلفة. ولمست سيرفيور 3 السطح في 20 أبريل 1967 على منحدر فوهة صغيرة. وعملت بضعة أسابيع ثم صمتت في مايو.",
          "انتهى البرنامج عام 1968. وكان قد منح مهندسي أبولو البيانات التي يحتاجونها: السطح يستطيع حمل مركبة هبوط، والتربة تتصرف بطريقة يمكن التنبؤ بها، والقمر ليس مغطى بغبار عميق يبتلع مركبة فضائية.",
        ],
      },
      echo: {
        en: "Every safe Apollo landing rested on a robot that had already tried it first.",
        ar: "كل هبوط آمن لأبولو استند إلى روبوت كان قد جرّب الأمر أولاً.",
      },
      glossary: [
        {
          id: "soft-landing",
          term: { en: "Soft landing", ar: "هبوط ناعم" },
          simple: {
            en: "A landing slow enough that the spacecraft arrives whole and keeps working — the opposite of a crash.",
            ar: "هبوط بطيء بما يكفي لتصل المركبة سليمة وتواصل العمل — عكس التحطم.",
          },
        },
        {
          id: "retro-rocket",
          term: { en: "Retro-rocket", ar: "صاروخ التباطؤ" },
          simple: {
            en: "A rocket that fires against the direction of travel to slow a spacecraft down before it lands.",
            ar: "صاروخ يُشعل عكس اتجاه الحركة ليبطئ المركبة قبل هبوطها.",
          },
        },
        {
          id: "soil-mechanics",
          term: { en: "Soil mechanics", ar: "ميكانيكا التربة" },
          simple: {
            en: "How soil behaves when something heavy presses on it: will it hold, sink or slide?",
            ar: "كيف تتصرف التربة حين يضغط عليها شيء ثقيل: هل تثبت أم تغوص أم تنزلق؟",
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
        en: "Two and a half days to the Moon, and a descent that had to work the first time.",
        ar: "يومان ونصف إلى القمر، ونزول كان عليه أن ينجح من المحاولة الأولى.",
      },
      narrative: {
        en: [
          "Surveyor 1 launched on 30 May 1966 on an Atlas-Centaur rocket. There was no orbit to wait in and no second chance to aim: the rocket sent the lander straight onto a path that reached the Moon in about two and a half days.",
          "The descent was the reason the mission existed. High above the surface a solid retro-rocket fired and wiped off most of the speed. Then three smaller liquid engines took over, guided by radar, and shut down a few metres above the ground. The lander dropped the last short distance and landed upright and still working.",
          "Surveyor 1 touched down in Oceanus Procellarum on 2 June 1966 and started sending television pictures the same day. Later missions carried more instruments and aimed at different terrain. Not all of them arrived: Surveyor 2 went out of control and crashed, and contact with Surveyor 4 was lost moments before it should have touched down.",
          "Five of the seven landed. The last of them arrived in January 1968, and the campaign closed with five successful landings on the Moon — and with the answer Apollo needed about where and how to land.",
        ],
        ar: [
          "أُطلقت سيرفيور 1 في 30 مايو 1966 على صاروخ أطلس–سنتور. لم يكن هناك مدار يُنتظر فيه ولا فرصة ثانية للتصويب: أرسل الصاروخ المركبة مباشرة على مسار يصل إلى القمر في نحو يومين ونصف.",
          "كان النزول هو سبب وجود المهمة. على ارتفاع كبير فوق السطح أشعل صاروخ تباطؤ صلب فأسقط معظم السرعة. ثم تولّت ثلاثة محركات سائلة أصغر، يقودها الرادار، وأُوقفت على بُعد أمتار قليلة من الأرض. وسقطت المركبة المسافة القصيرة الأخيرة وهبطت قائمة وما زالت تعمل.",
          "لمست سيرفيور 1 السطح في محيط العواصف في 2 يونيو 1966 وبدأت إرسال الصور التلفزيونية في اليوم نفسه. حملت المهمات اللاحقة أجهزة أكثر واستهدفت تضاريس مختلفة. ولم تصل كلها: فقدت سيرفيور 2 السيطرة وتحطمت، وانقطع الاتصال بسيرفيور 4 قبل لحظات من ملامستها المرتقبة للسطح.",
          "هبطت خمس من المركبات السبع. ووصلت الأخيرة في يناير 1968، وانتهت الحملة بخمسة هبوطات ناجحة على القمر — وبالإجابة التي يحتاجها أبولو عن أين وكيف يُهبط.",
        ],
      },
      echo: {
        en: "Seven attempts, five soft landings. The two that failed were part of the price of learning where Apollo should and should not put its feet.",
        ar: "سبع محاولات وخمسة هبوطات ناعمة. أما الإخفاقان فكانا جزءاً من ثمن التعلّم أين يضع أبولو أقدامه وأين لا يضعها.",
      },
      timeline: [
        {
          id: "sur-1-launch",
          date: "1966-05-30",
          dateLabel: { en: "30 May 1966", ar: "30 مايو 1966" },
          label: { en: "Surveyor 1 launches", ar: "انطلاق سيرفيور 1" },
          description: {
            en: "An Atlas-Centaur rocket sent Surveyor 1 toward the Moon.",
            ar: "أرسل صاروخ أطلس–سنتور سيرفيور 1 نحو القمر.",
          },
          type: "launch",
          sourceIds: ["SRC-SURVEYOR-1", "SRC-NSSDCA-SURVEYOR-1"],
        },
        {
          id: "sur-1-landing",
          date: "1966-06-02",
          dateLabel: { en: "2 June 1966", ar: "2 يونيو 1966" },
          label: { en: "First American soft landing", ar: "أول هبوط أمريكي ناعم" },
          description: {
            en: "Surveyor 1 touched down in Oceanus Procellarum and began returning images.",
            ar: "هبطت سيرفيور 1 في محيط العواصف وبدأت إعادة الصور.",
          },
          type: "landing",
          sourceIds: ["SRC-SURVEYOR-1", "SRC-NSSDCA-SURVEYOR-1"],
        },
        {
          id: "sur-3-landing",
          date: "1967-04-20",
          dateLabel: { en: "20 April 1967", ar: "20 أبريل 1967" },
          label: { en: "Surveyor 3 lands", ar: "هبوط سيرفيور 3" },
          description: {
            en: "Surveyor 3 came down on the slope of a small crater in Oceanus Procellarum.",
            ar: "نزلت سيرفيور 3 على منحدر فوهة صغيرة في محيط العواصف.",
          },
          type: "landing",
          sourceIds: ["SRC-SURVEYOR-3", "SRC-NSSDCA-SURVEYOR-3"],
        },
        {
          id: "sur-3-silent",
          date: "1967-05-04",
          dateLabel: { en: "4 May 1967", ar: "4 مايو 1967" },
          label: { en: "Surveyor 3 falls silent", ar: "صمت سيرفيور 3" },
          description: {
            en: "The lander stopped communicating after several weeks of surface operations.",
            ar: "توقفت المركبة عن التواصل بعد عدة أسابيع من العمل على السطح.",
          },
          type: "last-contact",
          sourceIds: ["SRC-NSSDCA-SURVEYOR-3"],
        },
        {
          id: "sur-apollo-12",
          date: "1969-11-19",
          dateLabel: { en: "19 November 1969", ar: "19 نوفمبر 1969" },
          label: { en: "Apollo 12 visits Surveyor 3", ar: "أبولو 12 تزور سيرفيور 3" },
          description: {
            en: "The Apollo 12 crew landed nearby, walked to Surveyor 3 and returned selected parts to Earth.",
            ar: "هبط طاقم أبولو 12 قريباً، وسار إلى سيرفيور 3، وأعاد أجزاء مختارة إلى الأرض.",
          },
          type: "milestone",
          sourceIds: ["SRC-SURVEYOR-3", "SRC-APOLLO-12"],
        },
      ],
      diagram: {
        kind: "journey-map",
        title: { en: "The road to Oceanus Procellarum", ar: "الطريق إلى محيط العواصف" },
        intro: {
          en: "A straight flight, a staged braking, and a soft touchdown in about two and a half days.",
          ar: "رحلة مباشرة، وتباطؤ على مراحل، وهبوط ناعم في نحو يومين ونصف.",
        },
        route: [
          {
            label: { en: "Launch", ar: "الإطلاق" },
            description: {
              en: "30 May 1966, Cape Canaveral",
              ar: "30 مايو 1966، كيب كانافيرال",
            },
          },
          {
            label: { en: "Crossing", ar: "العبور" },
            description: {
              en: "About two and a half days to the Moon",
              ar: "نحو يومين ونصف إلى القمر",
            },
          },
          {
            label: { en: "Braking", ar: "التباطؤ" },
            description: {
              en: "Retro-rocket, then radar-guided engines",
              ar: "صاروخ تباطؤ، ثم محركات يقودها الرادار",
            },
          },
          {
            label: { en: "Landing", ar: "الهبوط" },
            description: {
              en: "Oceanus Procellarum, 2 June 1966",
              ar: "محيط العواصف، 2 يونيو 1966",
            },
          },
          {
            label: { en: "Surface work", ar: "العمل السطحي" },
            description: {
              en: "Television pictures and soil tests for Apollo",
              ar: "صور تلفزيونية واختبارات تربة لأبولو",
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
              en: "Atlas-Centaur launch from Cape Canaveral, 30 May 1966.",
              ar: "الإطلاق على أطلس–سنتور من كيب كانافيرال، 30 مايو 1966.",
            },
          },
          {
            id: "crossing",
            x: 36,
            y: 35,
            label: { en: "The crossing", ar: "العبور" },
            detail: {
              en: "A straight path to the Moon, about two and a half days.",
              ar: "مسار مباشر إلى القمر، نحو يومين ونصف.",
            },
          },
          {
            id: "braking",
            x: 60,
            y: 26,
            label: { en: "The braking", ar: "التباطؤ" },
            detail: {
              en: "A solid retro-rocket, then three vernier engines guided by radar.",
              ar: "صاروخ تباطؤ صلب، ثم ثلاثة محركات دقيقة يقودها الرادار.",
            },
          },
          {
            id: "procellarum",
            x: 84,
            y: 32,
            label: { en: "Oceanus Procellarum", ar: "محيط العواصف" },
            detail: {
              en: "Touchdown on 2 June 1966 — the first American soft landing on the Moon.",
              ar: "الهبوط في 2 يونيو 1966 — أول هبوط أمريكي ناعم على القمر.",
            },
          },
        ],
      },
    },
    {
      id: "discoveries",
      kind: "discoveries",
      eyebrow: { en: "Chapter four", ar: "الفصل الرابع" },
      title: { en: "What the Robots Measured", ar: "ما قاسته الروبوتات" },
      summary: {
        en: "The Moon was not a sea of dust. It was a surface that could be measured, sampled and understood.",
        ar: "لم يكن القمر بحراً من الغبار، بل سطحاً يمكن قياسه وأخذ عينات منه وفهمه.",
      },
      narrative: {
        en: [
          "Surveyor's instruments were simple by later standards, but they answered questions that no telescope could. How strong is the surface? What is the soil made of? How does it behave when something heavy touches it?",
          "The answers shaped Apollo. Engineers used Surveyor data to design landing legs, choose sites and understand what astronauts would see when they stepped out.",
        ],
        ar: [
          "كانت أجهزة سيرفيور بسيطة بمقاييس ما جاء بعدها، لكنها أجابت عن أسئلة لم يستطع أي تلسكوب الإجابة عنها. ما قوة السطح؟ وممّ تتكون التربة؟ وكيف تتصرف حين يلمسها شيء ثقيل؟",
          "وقد شكّلت الإجابات أبولو. استخدم المهندسون بيانات سيرفيور لتصميم أرجل الهبوط واختيار المواقع وفهم ما سيراه روّاد الفضاء حين يخرجون.",
        ],
      },
      echo: {
        en: "The robot's job was to be wrong safely, so the crew could be right.",
        ar: "كان عمل الروبوت أن يخطئ بأمان، كي يكون الطاقم على صواب.",
      },
      discoveries: [
        {
          id: "sur-d1",
          title: { en: "The ground could hold a spacecraft", ar: "الأرض تستطيع حمل مركبة فضائية" },
          question: {
            en: "Would a lander sink into the lunar surface?",
            ar: "هل تغوص مركبة الهبوط في سطح القمر؟",
          },
          instrument: {
            en: "Landing legs and soil-mechanics sensors on Surveyor 1 and Surveyor 3",
            ar: "أرجل الهبوط وأجهزة ميكانيكا التربة على سيرفيور 1 وسيرفيور 3",
          },
          method: {
            en: "The landers touched down and measured how far their legs penetrated the soil, while cameras photographed the surface around them.",
            ar: "لمست المركبات السطح وقاست مدى توغل أرجلها في التربة، بينما صوّرت الكاميرات السطح حولها.",
          },
          data: {
            en: "The legs penetrated only a small distance. The surface was firm enough to support the lander, with a thin layer of loose material on top.",
            ar: "توغلت الأرجل مسافة صغيرة فقط. وكان السطح متماسكاً بما يكفي لحمل المركبة، مع طبقة رقيقة من المواد المفككة في أعلاه.",
          },
          finding: {
            en: "The Moon's surface was not a deep dust ocean. It was a firm, granular material that could support a spacecraft.",
            ar: "لم يكن سطح القمر محيطاً عميقاً من الغبار، بل مادة حبيبية متماسكة تستطيع حمل مركبة فضائية.",
          },
          significance: {
            en: "Apollo's landing legs and astronaut boots were designed around this result. Without it, the first crewed landing would have been far riskier.",
            ar: "صُممت أرجل هبوط أبولو وأحذية روّاد الفضاء على أساس هذه النتيجة. وبدونها لكان أول هبوط مأهول أكثر خطراً بكثير.",
          },
          sourceIds: ["SRC-SURVEYOR-1", "SRC-NSSDCA-SURVEYOR-1", "SRC-SURVEYOR-3"],
        },
        {
          id: "sur-d2",
          title: { en: "A second look at an old robot", ar: "نظرة ثانية إلى روبوت قديم" },
          question: {
            en: "How does hardware survive years on the Moon?",
            ar: "كيف يبقى العتاد سنوات على القمر؟",
          },
          instrument: {
            en: "The Apollo 12 crew, cameras and returned Surveyor 3 components",
            ar: "طاقم أبولو 12 والكاميرات والأجزاء المعادة من سيرفيور 3",
          },
          method: {
            en: "The Apollo 12 crew landed near Surveyor 3, photographed it and removed selected parts, including its television camera, for examination on Earth.",
            ar: "هبط طاقم أبولو 12 قرب سيرفيور 3 وصوّره وأزال أجزاء مختارة، منها كاميرته التلفزيونية، لفحصها على الأرض.",
          },
          data: {
            en: "The returned parts showed how surfaces, seals and materials had aged after more than two years exposed to vacuum, dust and temperature swings.",
            ar: "أظهرت الأجزاء المعادة كيف تقادمت الأسطح والأحكام والمواد بعد أكثر من عامين من التعرض للفراغ والغبار وتقلبات الحرارة.",
          },
          finding: {
            en: "Surveyor 3 became a long-duration materials experiment that no laboratory could reproduce.",
            ar: "صارت سيرفيور 3 تجربة مواد طويلة الأمد لا يستطيع أي مختبر إعادة إنتاجها.",
          },
          significance: {
            en: "It connected a robotic precursor and a crewed mission in a single story: one machine landing, another visiting it, and both teaching engineers about the Moon.",
            ar: "ربطت مهمة روبوتية سابقة ومهمة مأهولة في حكاية واحدة: آلة تهبط، وأخرى تزورها، وكلتاهما تعلّمان المهندسين عن القمر.",
          },
          sourceIds: ["SRC-SURVEYOR-3", "SRC-NSSDCA-SURVEYOR-3", "SRC-APOLLO-12"],
        },
      ],
    },
    {
      id: "ending",
      kind: "ending",
      eyebrow: { en: "Chapter five", ar: "الفصل الخامس" },
      title: { en: "Two Still Sitting There", ar: "اثنتان ما زالتا هناك" },
      summary: {
        en: "Surveyor 1 and Surveyor 3 are still on the Moon, silent and unchanged.",
        ar: "ما زالت سيرفيور 1 وسيرفيور 3 على القمر، صامتتين ولم تتغيرا.",
      },
      narrative: {
        en: [
          "Surveyor 1 stopped communicating on 7 January 1967. Surveyor 3 fell silent on 4 May 1967. Both were left where they landed, because there was no way and no need to bring them home.",
          "Surveyor 3 is the more famous of the two because Apollo 12 visited it. The photographs of the small, three-legged robot beside the lunar module are among the clearest images of one mission meeting another on another world.",
          "The landers are not abandoned in the sense of being forgotten. They are the first American spacecraft to rest on the Moon, and their data is still part of the engineering record that made Apollo possible.",
        ],
        ar: [
          "توقفت سيرفيور 1 عن التواصل في 7 يناير 1967، وصمتت سيرفيور 3 في 4 مايو 1967. وبقيت كلتاهما حيث هبطتا، لأنه لم يكن هناك سبيل ولا حاجة لإعادتهما إلى الوطن.",
          "وسيرفيور 3 هي الأشهر بينهما لأن أبولو 12 زارتها. فصور الروبوت الصغير ذي الأرجل الثلاث بجانب مركبة الهبوط القمرية من أوضح الصور التي تُظهر مهمة تلتقي بأخرى على عالم آخر.",
          "والمركبتان ليستا متروكتين بمعنى المنسيتين. إنهما أول مركبتين أمريكيتين تستقران على القمر، وبياناتهما ما زالت جزءاً من السجل الهندسي الذي جعل أبولو ممكناً.",
        ],
      },
      echo: {
        en: "Surveyor did not just land on the Moon. It made the Moon landable.",
        ar: "لم تهبط سيرفيور على القمر فحسب، بل جعلت الهبوط على القمر ممكناً.",
      },
      facts: [
        {
          label: { en: "Surveyor 1 last contact", ar: "آخر اتصال لسيرفيور 1" },
          value: { en: "7 January 1967", ar: "7 يناير 1967" },
        },
        {
          label: { en: "Surveyor 3 last contact", ar: "آخر اتصال لسيرفيور 3" },
          value: { en: "4 May 1967", ar: "4 مايو 1967" },
        },
        {
          label: { en: "Where they are", ar: "أين هما" },
          value: {
            en: "Oceanus Procellarum, the Moon.",
            ar: "محيط العواصف، القمر.",
          },
        },
        {
          label: { en: "Surveyor 3 visitor", ar: "زائر سيرفيور 3" },
          value: {
            en: "Apollo 12, November 1969.",
            ar: "أبولو 12، نوفمبر 1969.",
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
        en: "What a robot proved before people went, and what it left behind on the Moon.",
        ar: "ما أثبته روبوت قبل ذهاب الناس، وما تركه على القمر.",
      },
      narrative: {
        en: [
          "Surveyor's legacy is measured in what Apollo did not have to guess. The lunar module's legs and footpads were designed around Surveyor's soil measurements, and Apollo's landing sites were chosen with Surveyor photographs in hand.",
          "Surveyor 3 closed the loop in a way no engineer could have scripted: Apollo 12 landed beside it in November 1969, and the crew carried parts of the old robot back to Earth to study how hardware ages in vacuum and dust.",
          "The landers that touched down stayed where they landed. They were already sitting on the Moon when the first people arrived, and they are there still — the first American machines to settle on another world and never come back.",
          "The Moon keeps everything it is given. Somewhere in Oceanus Procellarum a three-legged robot holds a pose it has held since the 1960s, having finished the most useful rehearsal in the history of exploration.",
        ],
        ar: [
          "يُقاس إرث سيرفيور بما لم يضطر أبولو إلى تخمينه. صُممت أرجل مركبة الهبوط القمرية وأقراص أقدامها على أساس قياسات سيرفيور للتربة، واختيرت مواقع هبوط أبولو والصور من سيرفيور في متناول اليد.",
          "أغلقت سيرفيور 3 الدائرة بطريقة لم يكن ليصوغها مهندس: هبطت أبولو 12 بجوارها في نوفمبر 1969، وحمل الطاقم أجزاء من الروبوت القديم إلى الأرض لدراسة كيف يعتاد العتاد في الفراغ والغبار.",
          "والمَن هبطت بقيت حيث هبطت. كانت تجلس على القمر حين وصل أول الناس، وما زالت هناك — أول آلات أمريكية تستقر على عالم آخر ولا تعود أبداً.",
          "يحتفظ القمر بكل ما يُمنح له. في مكان ما من محيط العواصف يثبت روبوت بثلاث أرجل وضعاً يثبت عليه منذ ستينيات القرن الماضي، بعد أن أتمّ أفيد تمرين في تاريخ الاستكشاف.",
        ],
      },
      echo: {
        en: "A good rehearsal is one where the mistakes happen to the machine. Surveyor made its mistakes early, so Apollo could make fewer.",
        ar: "التمرين الجيد هو الذي تحدث فيه الأخطاء للآلة. أخطأت سيرفيور مبكراً، كي يخطئ أبولو أقل.",
      },
      facts: [
        {
          label: { en: "Prepared the way", ar: "مهدّت الطريق" },
          value: {
            en: "Apollo's landing gear and landing sites were designed around Surveyor's data.",
            ar: "صُمم عتاد هبوط أبولو ومواقعه على أساس بيانات سيرفيور.",
          },
        },
        {
          label: { en: "Still on the Moon", ar: "ما زالت على القمر" },
          value: {
            en: "The Surveyor landers that touched down never left.",
            ar: "مركبات سيرفيور التي هبطت لم تغادر قط.",
          },
        },
      ],
    },
  ],
  legacyStatement: {
    en: "The first soft landing was a robot's achievement, and every crewed landing stood on it.",
    ar: "كان أول هبوط ناعم إنجازاً لروبوت، وكل هبوط مأهول بعده قام عليه.",
  },
  tags: ["moon", "lander", "remnant"],
  artifactId: "surveyor-3",
  sourceIds: [
    "SRC-SURVEYOR-1",
    "SRC-NSSDCA-SURVEYOR-1",
    "SRC-SURVEYOR-3",
    "SRC-NSSDCA-SURVEYOR-3",
    "SRC-APOLLO-12",
  ],
  relatedStorySlugs: ["apollo-11-lm-descent-stage", "lunar-roving-vehicle"],
  echoIntro: {
    en: "Before the astronauts, there was a small robot with three legs and a camera. Come and see what it proved.",
    ar: "قبل روّاد الفضاء، كان هناك روبوت صغير بثلاث أرجل وكاميرا. تعال لترى ما الذي أثبته.",
  },
  echoSignoff: {
    en: "Surveyor 1 and Surveyor 3 are still there, the first American machines to stay on the Moon.",
    ar: "ما زالت سيرفيور 1 وسيرفيور 3 هناك، أول آلتين أمريكيتين تبقى على القمر.",
  },
  lastVerified: "2026-11-14",
};
