import type { RobotIntent } from "@/types/robot";

/**
 * Client-safe question matcher.
 *
 * This is keyword and phrase matching only — no model, no network call. Keep
 * this file free of artifact data so the client bundle does not receive the
 * whole dataset. The answers themselves are precomputed on the server.
 */
export function normalizeQuestion(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[^a-z0-9'\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const rules: Array<{ intent: RobotIntent; pattern: RegExp }> = [
  {
    intent: "hello",
    pattern:
      /^(hi|hello|hey|yo|howdy|good morning|good afternoon|good evening)\b/,
  },
  { intent: "thanks", pattern: /\b(thanks|thank you|thx|cheers)\b/ },
  {
    intent: "goodbye",
    pattern: /\b(bye|goodbye|see you|good night|goodnight)\b/,
  },
  {
    intent: "not-ai",
    pattern:
      /\b(ai|agi|artificial intelligence|chatgpt|robot|real|human|pretend|fake|scripted|computer program)\b/,
  },
  {
    intent: "help",
    pattern:
      /\b(help|what can i ask|what can you answer|how do i use|how does this work|what should i ask)\b/,
  },
  {
    intent: "source",
    pattern:
      /\b(source|sources|proof|prove|evidence|nasa|verified|true|trust|how do you know|where did you get)\b/,
  },
  {
    intent: "look",
    pattern:
      /\b(look like|looks like|photo|picture|image|selfie|camera|see you|appearance|what do you look)\b/,
  },
  {
    intent: "size",
    pattern:
      /\b(size|big|large|heavy|weight|mass|dimensions|tall|wide|weigh)\b/,
  },
  { intent: "speed", pattern: /\b(fast|speed|quick|slow)\b/ },
  {
    intent: "power",
    pattern:
      /\b(power|powers|powered|powering|battery|solar|energy|electricity|fuel|plug)\b/,
  },
  {
    intent: "status",
    pattern:
      /\b(still working|still operate|operating|active|alive|status|dead|broken|communicat|mission over|mission end|mission finished|shut down|switched off)\b/,
  },
  {
    intent: "arrival",
    pattern:
      /\b(when did you (arrive|land|get there|reach)|arrival date|landing date|when.*(land|arrive|reach))\b/,
  },
  {
    intent: "launch",
    pattern:
      /\b(when did you (launch|start|begin)|launch date|how old|when were you (built|made|born)|what year)\b/,
  },
  {
    intent: "origin",
    pattern:
      /\b(where are you from|where do you come from|who (built|made) you|what program|which program|who owns you)\b/,
  },
  {
    intent: "location",
    pattern:
      /\b(where are you|where is it|where is your|where did you land|where.*now|right now|currently|today|located|location|where.*end up|still there)\b/,
  },
  {
    intent: "destination",
    pattern:
      /\b(where did you go|where did you (travel|fly|explore|visit)|destination|which planet|which place|what place|where.*(go|went|travel|explore|visit))\b/,
  },
  {
    intent: "move",
    pattern:
      /\b(can you (move|drive|fly|walk|roll|travel)|do you (move|drive|fly|walk|roll)|how do you (move|drive|fly|travel))\b/,
  },
  {
    intent: "science",
    pattern:
      /\b(learn|learned|discover|discovered|find|found|science|scientific|result|contribution|contribute|measure|measur)\b/,
  },
  {
    intent: "milestone",
    pattern:
      /\b(what did you do|what did you accomplish|achievement|accomplish|milestone|biggest|best moment|famous|known for|first thing|what happened first)\b/,
  },
  {
    intent: "fate",
    pattern:
      /\b(what happened|happened to you|fate|what.*left|end up|destroyed|crash|crash land|impact)\b/,
  },
  {
    intent: "job",
    pattern:
      /\b(job|purpose|why|work|designed|built for|mission|do you do|good at)\b/,
  },
  {
    intent: "who",
    pattern:
      /\b(who are you|what are you|your name|introduce|about you|tell me about yourself)\b/,
  },
  {
    intent: "joke",
    pattern: /\b(joke|funny|laugh|sing|song|game|play|bored)\b/,
  },
  {
    intent: "record",
    pattern:
      /\b(record|page|link|open|show me|more info|more information|details|source code)\b/,
  },
];

/**
 * Returns the best fixed intent for a question, or null when the record does
 * not cover it. The caller then shows the honest fallback.
 */
export function matchRobotIntent(raw: string): RobotIntent | null {
  const question = normalizeQuestion(raw);
  if (!question) return null;

  for (const rule of rules) {
    if (rule.pattern.test(question)) return rule.intent;
  }
  return null;
}
