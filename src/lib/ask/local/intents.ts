/**
 * Layer A — instant static responses.
 *
 * These are the questions that never need a language model: greetings,
 * thanks, goodbyes, what the assistant is, and how to use GRAVERSE. They are
 * answered from this table in constant time, in English and Arabic, and they
 * never reach OpenRouter.
 *
 * The wording is deliberately natural and varied. Where a greeting can be
 * phrased in more than one way, the variant is chosen from a stable hash of
 * the question, so the same question always gets the same answer — which
 * keeps the response cache honest — while different greetings do not read as
 * a machine repeating one sentence.
 */

export interface LocalIntent {
  id: string;
  /** Phrases that trigger the intent, as word sequences. */
  triggers: string[][];
  /** The same triggers, in Arabic. */
  triggersAr: string[][];
  /** Answers used when no record is in focus. */
  answers: string[];
  /** Answers used when the visitor is on a record. */
  contextualAnswers?: string[];
}

export const LOCAL_INTENTS: LocalIntent[] = [
  {
    id: "greeting",
    triggers: [
      ["hello"],
      ["hi"],
      ["hey"],
      ["hi", "there"],
      ["hello", "there"],
      ["good", "morning"],
      ["good", "afternoon"],
      ["good", "evening"],
      ["greetings"],
    ],
    triggersAr: [
      ["مرحبا"],
      ["مرحبا", "بك"],
      ["السلام", "عليكم"],
      ["اهلا"],
      ["صباح", "الخير"],
      ["مساء", "الخير"],
      ["هاي"],
    ],
    answers: [
      "Hello. I am Ask GRAVERSE, the guide to GRAVERSE's collection of NASA hardware — thirty source-linked records of the machines left on the Moon, on Mars and in deep space.\n\nAsk me about any record by name, or start with \"What happened to the hardware?\" and I will work from GRAVERSE's own verified sources.",
      "Hello, and welcome to GRAVERSE. I am the archive's own guide: I answer from the collection's registered NASA records — every answer carries the sources it came from.\n\nTell me an artifact, a mission or a destination, or ask me to compare two of them.",
      "Hello there. I am Ask GRAVERSE, your guide through the museum.\n\nI know the thirty hardware records, the twenty-four missions and the twenty destinations in GRAVERSE, and I can explain what each machine did, what it found and what became of it.",
    ],
    contextualAnswers: [
      "Hello. I am Ask GRAVERSE, and I am reading the record you have open.\n\nAsk me anything about this machine — what it was for, what it found, where it is now — and I will answer from GRAVERSE's own sources.",
      "Hello. I can see the record in front of you, so we can go straight into it.\n\nAsk me what it did, why it was sent, or what happened to the hardware afterwards.",
    ],
  },
  {
    id: "thanks",
    triggers: [
      ["thanks"],
      ["thank", "you"],
      ["thanks", "a", "lot"],
      ["appreciate", "it"],
      ["cheers"],
    ],
    triggersAr: [
      ["شكرا"],
      ["شكرا", "لك"],
      ["متشكر"],
      ["جزاك", "الله", "خيرا"],
      ["ممتن"],
    ],
    answers: [
      "You are welcome. Every answer I give points back to the public NASA record it came from, so you can check it yourself.\n\nAsk me about another artifact whenever you like.",
      "Glad to help. The sources behind each answer are listed underneath it — that is the whole point of the archive.\n\nThere is always another machine to look at.",
    ],
    contextualAnswers: [
      "You are welcome. The sources for this record are listed with the answer, and the full source list is on the record page itself.\n\nAsk me a follow-up about it whenever you like.",
    ],
  },
  {
    id: "goodbye",
    triggers: [
      ["bye"],
      ["goodbye"],
      ["see", "you"],
      ["see", "you", "later"],
      ["talk", "later"],
    ],
    triggersAr: [
      ["مع", "السلامة"],
      ["الى", "اللقاء"],
      ["السلام"],
      ["باي"],
      ["في", "امان"],
    ],
    answers: [
      "Goodbye. The museum, the Academy and the Explorer are still open — and I am here whenever you come back with another question.",
      "Goodbye, and thanks for exploring the archive. Every record in GRAVERSE is one click away when you return.",
    ],
    contextualAnswers: [
      "Goodbye. This record stays open in the museum, with all of its sources attached.",
    ],
  },
  {
    id: "identity",
    triggers: [
      ["who", "are", "you"],
      ["what", "are", "you"],
      ["your", "name"],
      ["what", "is", "ask", "graverse"],
      ["introduce", "yourself"],
    ],
    triggersAr: [
      ["من", "انت"],
      ["ما", "هي", "graverse"],
      ["من", "are", "you"],
      ["عرفني", "بنفسك"],
    ],
    answers: [
      "I am Ask GRAVERSE, the AI space heritage guide inside GRAVERSE — an interactive space heritage timeline and source-linked digital museum built for the NASA Space Apps Challenge \"Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars\".\n\nI answer from GRAVERSE's own records: thirty hardware artifacts, twenty-four missions, twenty Solar System bodies and eight deep-sky objects, each tied to registered public NASA sources.",
    ],
    contextualAnswers: [
      "I am Ask GRAVERSE, the archive's space heritage guide, and I am currently reading the record you have open.\n\nEverything I tell you comes from GRAVERSE's registered NASA sources, and I will say so plainly when a record does not establish something.",
    ],
  },
  {
    id: "capabilities",
    triggers: [
      ["what", "can", "you", "do"],
      ["how", "can", "you", "help"],
      ["what", "do", "you", "know"],
      ["help", "me"],
      ["what", "can", "i", "ask"],
      ["what", "should", "i", "ask"],
    ],
    triggersAr: [
      ["ماذا", "تستطيع"],
      ["كيف", "تساعدني"],
      ["ماذا", "تعرف"],
      ["ساعدني"],
      ["ماذا", "اسأل"],
      ["بماذا", "يمكنني", "السؤال"],
    ],
    answers: [
      "Here is what I can do:\n\n- **Explain a machine.** Tell me an artifact — \"Explain Perseverance Rover\" — and I will describe what it was, why it was sent, what it found and what became of it.\n- **Answer from the archive.** Ask about a mission, a destination, an agency, a lesson or an engineering explainer.\n- **Compare records.** Ask me to compare two artifacts, or which of two missions launched first.\n- **Explain the collection.** Ask what GRAVERSE covers, or how the Museum, the Academy and the Explorer fit together.\n\nEvery answer lists the registered NASA sources behind it.",
    ],
    contextualAnswers: [
      "Here is what I can do with this record:\n\n- Explain what the machine was and why it was sent.\n- List the scientific results GRAVERSE holds for it.\n- Say what happened to the hardware afterwards, and where the record says it is now.\n- Point at the missions, destinations and lessons it is connected to.\n\nEvery answer lists the registered NASA sources behind it.",
    ],
  },
  {
    id: "how_to_use",
    triggers: [
      ["how", "do", "i", "use", "this"],
      ["how", "can", "i", "use", "this"],
      ["how", "does", "this", "work"],
      ["how", "do", "i", "use", "graverse"],
      ["how", "can", "i", "use", "graverse"],
      ["how", "do", "i", "start"],
      ["how", "can", "i", "start"],
      ["how", "do", "i", "ask"],
      ["how", "can", "i", "ask"],
    ],
    triggersAr: [
      ["كيف", "استخدم", "هذا"],
      ["كيف", "يعمل", "هذا"],
      ["كيف", "استخدم", "graverse"],
      ["كيف", "ابدأ"],
      ["كيف", "اسأل"],
    ],
    answers: [
      "Three steps:\n\n1. **Ask.** Type a question and press Enter. Shift+Enter adds a line break.\n2. **Look at the scope strip.** Above the conversation you can see whether I am answering about a specific record or about the whole collection, and switch between the two.\n3. **Follow the sources.** Each answer lists the public NASA records it was built from — open any of them to check the original wording.\n\nIf I do not know something, I will say that the GRAVERSE records do not establish it, rather than guessing.",
    ],
    contextualAnswers: [
      "You are already on a record, so just ask. I will use the record in front of you as the starting point.\n\nThe scope strip above the conversation lets you switch to the whole collection, and every answer I give lists the registered NASA sources behind it.",
    ],
  },
  {
    id: "museum_help",
    triggers: [
      ["help", "me", "explore", "the", "museum"],
      ["how", "do", "i", "visit", "the", "museum"],
      ["how", "can", "i", "visit", "the", "museum"],
      ["guide", "me", "through", "the", "museum"],
      ["museum", "help"],
    ],
    triggersAr: [
      ["ساعدني", "استكشف", "المتحف"],
      ["كيف", "زور", "المتحف"],
      ["دلني", "على", "المتحف"],
    ],
    answers: [
      "The Museum is where the hardware lives.\n\n- Start in the **exhibition hall** — a 3D rotunda of NASA photography you can walk through, with a floor plan, a chronology axis and an exhibit rail for the non-3D path.\n- Open any artifact to read its full record: what it was, why it was sent, what it found, what happened to the hardware, and the sources behind all of it.\n- Use the **timeline** in Explorer to see the machines in launch order.\n\nEvery record ends with its source list, so you can always check the original NASA wording.",
    ],
    contextualAnswers: [
      "You are already inside the Museum, on a record. The fastest route from here:\n\n- Scroll down to **what happened to the hardware** for the fate of the machine.\n- The **sources** section at the bottom lists every public record the page was built from.\n- Use **related records** to move to the machines that went with it.",
    ],
  },
  {
    id: "explorer_help",
    triggers: [
      ["how", "do", "i", "explore", "astronomical", "objects"],
      ["how", "can", "i", "explore", "astronomical", "objects"],
      ["help", "me", "explore", "astronomical", "objects"],
      ["how", "do", "i", "use", "the", "explorer"],
      ["how", "can", "i", "use", "the", "explorer"],
      ["explorer", "help"],
      ["how", "do", "i", "find", "a", "destination"],
    ],
    triggersAr: [
      ["كيف", "استكشف", "الأجرام"],
      ["كيف", "استخدم", "المستكشف"],
      ["ساعدني", "أجد", "جهة"],
    ],
    answers: [
      "Explorer is the data side of GRAVERSE.\n\n- **Timeline mode** puts 136 mission events in launch order, and selecting one opens the matching museum record.\n- **Destination mode** opens the twenty Solar System bodies — eight planets, Pluto, the Sun and ten moons — each with claim-labelled facts and a source list.\n- **Filters** narrow the collection by destination, hardware type, status, decade and milestone type, and the filtered view can be shared as a link.\n\nThe orrery at `/explorer/solar-system` is decorative; an accessible orbit map carries the same information.",
    ],
    contextualAnswers: [
      "Explorer is the data side of GRAVERSE, and this record is one of the entries in it.\n\n- Switch Explorer to **destination** mode to see this object's destination and its neighbours.\n- Use the filters to narrow the collection by destination, hardware type, status or decade.\n\nThe record you are on lists every related machine at the bottom of the page.",
    ],
  },
  {
    id: "academy_help",
    triggers: [
      ["how", "can", "i", "use", "the", "academy"],
      ["academy", "help"],
      ["how", "do", "i", "learn", "here"],
      ["is", "there", "a", "quiz"],
    ],
    triggersAr: [
      ["كيف", "استخدم", "الاكاديمية"],
      ["ساعدني", "في", "الاكاديمية"],
      ["هل", "يوجد", "اختبار"],
    ],
    answers: [
      "The Academy teaches the same records in three age bands: 5–7, 8–9 and 10–12.\n\n- **12 lessons** with learning objectives, key terms and a knowledge check that explains every answer.\n- **4 learning journeys** that sequence lessons, museum records and destinations, and award a badge.\n- **8 long-form articles**, a 40-term glossary and **flashcards** for revision.\n- Three small 3D games — a rocket workshop, a Moon-phase mission and a rover sample run — all labelled as toys rather than NASA models.\n\nProgress is stored in your browser only: no account, no cloud, no tracking.",
    ],
    contextualAnswers: [
      "The Academy teaches this same record in age-appropriate ways.\n\n- Open the **Academy lessons** section on this page to see which lessons use it.\n- Each lesson has a knowledge check that explains every answer.\n\nProgress is stored in your browser only — no account, no tracking.",
    ],
  },
  {
    id: "experiences",
    triggers: [
      ["explain", "the", "three", "experiences"],
      ["what", "are", "the", "three", "experiences"],
      ["three", "experiences"],
      ["museum", "academy", "explorer"],
    ],
    triggersAr: [
      ["اشرح", "التجارب", "الثلاث"],
      ["ما", "هي", "التجارب", "الثلاث"],
      ["ثلاث", "تجارب"],
    ],
    answers: [
      "GRAVERSE is one collection read three ways:\n\n- **Space Academy** (`/academy`) — the learning experience, for ages 5–12, in three age bands. Warm, light and guided.\n- **Museum** (`/museum`) — the heritage experience. Thirty artifact records, each telling the story of one machine with its sources attached. Cinematic and story-first.\n- **Explorer** (`/explorer`) — the discovery experience. A timeline of mission events, filters, and the twenty destinations of the Solar System. Data-first and filterable.\n\nSame records, same sources, three very different ways in.",
    ],
    contextualAnswers: [
      "GRAVERSE is one collection read three ways:\n\n- **Space Academy** (`/academy`) — the learning experience, for ages 5–12.\n- **Museum** (`/museum`) — the heritage experience; you are in it now.\n- **Explorer** (`/explorer`) — the discovery experience, with the timeline and the destinations.\n\nSame records, same sources, three different ways in.",
    ],
  },
  {
    id: "collection_overview",
    triggers: [
      ["what", "is", "graverse"],
      ["what", "does", "graverse", "cover"],
      ["what", "is", "in", "the", "collection"],
      ["how", "many", "artifacts"],
      ["what", "artifacts", "do", "you", "have"],
      ["what", "is", "the", "collection"],
    ],
    triggersAr: [
      ["ما", "هو", "graverse"],
      ["ماذا", "يغطي", "graverse"],
      ["كم", "قطعة"],
      ["ما", "الذي", "لديك"],
    ],
    answers: [
      "GRAVERSE is an archive of the hardware humanity left behind.\n\n- **30 artifact records** — rovers, landers, orbiters, probes, instruments, descent stages and experiment packages, on the Moon, on Mars and in deep space.\n- **24 missions**, each derived from the artifacts that belong to it, so a mission page can never claim a date its hardware does not support.\n- **20 Solar System bodies** and **8 deep-sky objects**, every fact labelled with its claim type.\n- **12 lessons, 4 journeys, 8 articles, 7 engineering explainers, 8 simulations and 8 stories** built on the same records.\n- **96 registered sources**, each with an organization, a title, a URL and an access date.\n\nTwo things are kept apart on purpose: **mission status** and **hardware status**. A mission can be complete while its machine is still sitting on the Moon, still working, or long since silent.",
    ],
    contextualAnswers: [
      "GRAVERSE is an archive of the hardware humanity left behind: 30 artifact records, 24 missions, 20 Solar System bodies and 8 deep-sky objects, all tied to 96 registered public NASA sources.\n\nYou are looking at one of those records. Two things are kept apart on purpose: **mission status** and **hardware status** — a mission can be complete while its machine is still sitting there.",
    ],
  },
];

/** A stable hash, so a variant can be chosen deterministically. */
export function stableHash(value: string): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash);
}

/** Picks a variant deterministically from a list. */
export function pickVariant(
  variants: string[],
  seed: string
): string | undefined {
  if (variants.length === 0) return undefined;
  return variants[stableHash(seed) % variants.length];
}
