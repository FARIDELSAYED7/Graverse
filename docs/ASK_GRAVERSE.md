# Ask GRAVERSE — OpenRouter integration

**Ask GRAVERSE** is the AI space heritage guide inside GRAVERSE. It answers
questions about NASA artifacts, missions, hardware, mission history, scientific
discoveries and space engineering, and it does so from GRAVERSE's own
source-linked records.

This document covers the integration in full: the endpoint, the free-model
policy, the environment variables, the grounded retrieval, the scientific
rules, the quota protections, the error handling, the privacy position and
the deployment steps.

> **The application uses free models only.** There is no paid fallback, no
> automatic credit purchase, no card requirement and no paid dependency. If no
> free model is reachable, the assistant says so and the rest of GRAVERSE
> carries on working.

---

## 1. What it is

| Question | Answer |
| --- | --- |
| Default provider | **GRAVERSE's own local intelligence** — the archive answers most questions without any external call |
| Fallback provider | OpenRouter, exclusively. `https://openrouter.ai/api/v1` |
| Endpoint | `POST https://openrouter.ai/api/v1/chat/completions` |
| Application endpoint | `POST /api/ask` (Next.js route handler) |
| Model | `openrouter/free` by default, configurable with `OPENROUTER_MODEL` |
| Paid models | Impossible — a non-free model id is rejected before the request |
| SDK | None. Native server-side `fetch` |
| Key location | Server-side only, `OPENROUTER_API_KEY` |

Ask GRAVERSE exists to reinforce the NASA Space Apps Challenge statement:
*"Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on
the Moon and Mars."* It is not a generic chat widget bolted onto a museum —
every answer is grounded in a GRAVERSE record and every source link is a
registered record from `src/data/sources.ts`.

---

## 2. The interface

### 2.1 The console

Ask GRAVERSE is a floating launcher and an expandable console that sits over
the museum. The console is one self-contained surface:

| Part | What it does |
| --- | --- |
| Identity header | The 3D core, the name, the tagline, a new-conversation control and a close control |
| Scope strip | The record the visitor is on, its kind, and the switch between "This record" and "The collection" |
| Conversation | User and assistant turns, the thinking indicator, error cards and the answer-origin label |
| Composer | A growing question box, a send control, the character budget, the cooldown notice and the privacy notice |
| Provenance | The verified sources for each answer, one link per registered source record |

The launcher and the console are the same component, so the identity never
jumps: the 3D core is continuous between the two.

**The answer origin.** Every answer carries a quiet label:

| Label | Meaning |
| --- | --- |
| **GRAVERSE Knowledge** | Assembled locally from GRAVERSE's own records. No external service was involved. |
| **Saved answer** | A previously validated answer, reused from the cache. |
| **AI-assisted** | Written by a free OpenRouter model, using the same GRAVERSE records as its only source material. |

The labels are deliberately equal in weight: a local answer is not presented as
a lesser answer. No confidence percentage is ever shown.

### 2.2 The 3D identity — the GRAVERSE Astrolabe

The assistant has a real 3D identity rather than an icon.

**The concept.** One object at three scales: a warm faceted core, a
translucent teal shell, two thin orbital rings on different axes, a soft bloom
and a sparse halo of drifting motes. It reads as a small astronomical
instrument — the assistant as the instrument you consult, not a mascot.

**One context, three placements.** `src/components/ask/AskCoreScene.tsx` owns a
single `<Canvas>` and uses drei's `<View>` to project the same scene into three
tracked elements: the launcher, the console header and the empty state. The
whole assistant therefore costs **one WebGL context**, one bundle chunk and
one animation loop, no matter how many places the identity appears.

| Property | Value |
| --- | --- |
| Meshes | 4 (core, shell, two rings) plus one bloom sprite |
| Points | 120 |
| Geometry | icosahedron (2 subdivisions), two spheres, two tori |
| Textures | one 128×128 canvas radial gradient, disposed on unmount |
| Draw calls | ~6 per frame |
| Contexts | 1 |

**The identity can never leave the console.** The canvas is a fixed overlay
above the page, so a slot that scrolls out of the conversation area would
otherwise be painted over the page. The console therefore reports, for the
scrollable slot, whether it is still fully inside the log, and switches the
view off the moment it is not — the CSS mark takes over, exactly as it does on
a device without WebGL. A browser journey asserts this in both directions:
scrolled out, the 3D is off; scrolled back, it is on.

**Performance rules.**

- The scene is a `next/dynamic` chunk with `ssr: false`, so Three.js is not
  in the initial bundle.
- The stage mounts ~900 ms after the first paint, and only after a WebGL
  capability probe succeeds. The probe creates no context of its own.
- **The render loop only runs while the assistant is in use** — the console is
  open, or the launcher is hovered or focused. Idle, the scene renders one
  static frame and the loop stops. Measured: **0 WebGL draw calls in 2 s
  while idle**, ~2 160 while engaged.
- The loop is suspended when the tab is hidden and when the visitor asks for
  reduced motion (`frameloop="demand"`).
- The canvas is `position: fixed`, transparent and `pointer-events: none`, so it
  never intercepts a click or adds layout.
- The canvas texture is disposed with the component.

**Fallback.** A device without WebGL keeps `AskCoreFallback`: a flat, honest
CSS mark — a lit sphere inside an orbital ring with a slow sweep — drawn in
the same palette. It is also what the visitor sees for the moment before the
3D core draws its first frame, so the identity never flashes.

### 2.3 Answer rendering

Answers are rendered by `src/components/ask/markdown.tsx`, a small hand-written
Markdown renderer. It supports headings, paragraphs, ordered and unordered
lists, inline code, fenced code blocks, block quotes, emphasis, links and
GRAVERSE source citations.

It never uses `dangerouslySetInnerHTML`: every node is a React element, so a
model can never inject markup into the page. Two rules are enforced by the
test suite:

- A link is only created for `http`, `https` or a site-relative path.
  `javascript:` and every other shape stays plain text.
- A citation becomes a link **only** when its id is in the source list the
  server returned. A fabricated citation stays inert text.

Answer headings start at `h3`, because the console title is already an `h2`, so
the document outline stays in order.

### 2.4 Interaction states

| State | What the visitor sees |
| --- | --- |
| Empty | The 3D core at full size, the promise, the current scope and the suggested questions |
| Sending | The send control becomes a spinner; the composer is locked so a question cannot be sent twice |
| Thinking | Three drifting motes in an assistant bubble, and the core pulses and spins faster |
| Answered | The answer in Markdown, then the verified sources for that answer |
| Failed | A typed error card — quota, unavailable or generic — with a **Try again** control that re-sends the question without losing it |
| Rate limited | The exact free-usage-limit message, and the rest of the museum stays usable |
| Unavailable | The service is not configured; the composer is disabled and the reason is stated |

Duplicate submissions are prevented by a `pending` guard, and the cooldown
between answers is enforced on both sides.

---

## 3. The local intelligence engine

**The local engine is the default answer provider.** OpenRouter is the
fallback, used only when GRAVERSE's own knowledge cannot answer a question
confidently. Most questions a visitor asks never generate an external
request.

The engine runs entirely on the server, entirely offline, with no embedding
model, no remote service and no new dependency.

```
Question
  → normalise (Unicode, Arabic-aware)
  → FAQ  ──────────────► curated answer
  → intents ───────────► conversational answer
  → record fields ─────► answer built from the record
  → relationships ─────► comparison or link answer
  → confidence check
  → local answer, or "not handled" → cache → OpenRouter
```

### 3.1 Layer A — instant static responses

`src/lib/ask/local/intents.ts` holds eleven conversational intents: greeting,
thanks, goodbye, identity, capabilities, how to use, museum help, explorer
help, academy help, the three experiences, and the collection overview.

Each has several natural phrasings, in English and Arabic, and a contextual
variant used when the visitor is on a record. Where a greeting has more than
one natural phrasing, the variant is chosen from a stable hash of the
question: the same question always gets the same answer — which keeps the
cache honest — while different greetings do not read as a machine repeating
one sentence.

### 3.2 Layer B — the curated knowledge base

`src/lib/ask/local/faq.ts` holds **26 curated entries** about the archive and
the science it covers: the Solar System, the planets, Mars, the Moon, the
moons, the Sun, galaxies, black holes, nebulae, exoplanets, rovers, the kinds
of spacecraft, missions against spacecraft, space heritage, the two statuses,
the three experiences, where the facts come from, the open dataset, how to
explore, the agencies, and what the assistant is.

Every entry carries a stable id, a canonical question, alternative phrasings,
keywords, the languages it supports, an answer, the registered source ids and
any related records. **An entry whose sources are no longer registered stops
being answerable** and the question falls through to the provider rather than
being answered without evidence.

The knowledge base deliberately does not repeat per-record field values; those
are produced dynamically by Layer C.

### 3.3 Layer C — dynamic record answers

`src/lib/ask/local/records.ts` builds an answer from the fields a record
actually has. Nineteen aspects are supported — overview, purpose, status,
fate, location, dates, science, technical, mission, agency, related, facts,
metrics, exploration, discovery, highlights, objectives, achievements and
hardware — across ten record kinds: artifact, mission, body, deep-sky,
agency, lesson, story, engineering, simulation and article.

A builder returns `null` when the record does not establish the requested
aspect, and the question then falls through. **No date, measurement,
discovery or status is ever invented**: if the field is not in the record, the
answer says so.

### 3.4 Layer D — deterministic matching

`src/lib/ask/local/matcher.ts` resolves a question to a record and an aspect
without any remote service:

- Unicode normalisation, lowercasing and accent removal.
- Arabic normalisation: letter variants unified, diacritics removed, and a
  light stem that removes only the `و` conjunction and the `ال` definite
  article — so "المريخ" and "والأرض" match the records they name, without any
  letter ever being replaced by a different one.
- Keyword and phrase matching, including a weaker "all the meaningful words
  appear somewhere" form that catches "why was this machine sent into space".
- Synonym and alias matching, including a table of Arabic names for the
  records (`src/lib/ask/local/arabic-aliases.ts`).
- Record aliases, including the alternate names in the artifact records.
- Intent classification and token-overlap scoring.
- A bounded edit distance for a misspelling, used **only** for a word that
  belongs to exactly one record — so "perseverence" finds the rover, while
  "rover", which belongs to a dozen, never points at the wrong machine.

### 3.5 Layer E — comparisons and relationships

`src/lib/ask/local/relationships.ts` answers "compare Mars and Earth", "what
is related to Ranger 7?" and "which missions explored Mars?" from the relation
graph GRAVERSE already maintains.

A comparison shows **only the fields both records have**, keeps the order the
visitor used, calls out the fields that differ, and dates which of two
missions launched first.

### 3.6 Confidence and routing

| Match | Confidence | Action |
| --- | --- | --- |
| Conversational intent | 1.00 | Local answer |
| Exact knowledge-base entry | 0.86 – 1.00 | Local answer |
| Named record + supported aspect | 0.86 – 0.99 | Local answer |
| Contextual record + supported aspect | 0.84 – 1.00 | Local answer |
| Comparison or relationship | 0.90 – 0.95 | Local answer |
| Ambiguous subject | — | Provider fallback |
| Subject the archive does not hold | — | Provider fallback |
| Question needing synthesis | — | Provider fallback |

The bands are `0.90` (a strong match may answer on its own) and `0.80` (a
weaker match may answer only when every required field and every cited source
is available). **A high keyword score never overrides missing evidence**, and
an ambiguous question never receives a guessed answer.

The contextual record is used only when the question is actually about it: a
question that names a different subject, or whose content words the archive
does not hold, falls through to the provider.

### 3.7 The cache

`src/lib/ask/local/cache.ts` keeps a validated provider answer in process for
seven days, keyed by the question, the language, the scope and the contextual
record, and stamped with the version of the dataset it was built from. A
cached answer is only reused while every source it cites is still registered
with the same URL, so a change of provenance invalidates it.

`src/components/ask/ask-cache.ts` keeps the same answers in the browser for
seven days, so a repeated question does not even make a round trip. Only the
question, the language and the record are stored — never the conversation.

### 3.8 What is still answered by the provider

Honest assessment of the split:

| Question | Answered by |
| --- | --- |
| "Hello", "thanks", "who are you?" | Local |
| "What is GRAVERSE / the Academy / the Museum?" | Local |
| "What is the Solar System / a black hole / a galaxy / a rover?" | Local |
| "Explain Perseverance Rover" | Local |
| "What happened to its hardware?" (on a record page) | Local |
| "When was it launched / where is it / what did it discover?" | Local |
| "Compare Mars and Earth" | Local |
| "What is related to Ranger 7?" | Local |
| "Which missions explored Mars?" | Local |
| The same, in Arabic | Local |
| "Explain quantum chromodynamics in detail" | **Provider** |
| "What is the meaning of life?" | **Provider** |
| "Compare the power systems of the Apollo descent stage and the Viking lander" | **Provider** — synthesis across records |
| Anything needing an inference GRAVERSE does not hold | **Provider** |

The provider is still needed for genuine synthesis: questions that ask for an
argument, a calculation, a causal explanation across several records, or
anything the archive does not contain.

---

## 4. Free model selection

### 4.1 The default

`OPENROUTER_MODEL` defaults to `openrouter/free`, OpenRouter's official
free-model router. The router chooses an available free model for the request
and cannot resolve to a paid one.

### 4.2 Pinning a model

A specific model may be pinned as long as the identifier ends in `:free`:

```env
OPENROUTER_MODEL=openrouter/free                        # the router (default)
OPENROUTER_MODEL=google/gemma-4-31b-it:free              # a pinned free variant
```

`isFreeOpenRouterModel()` in `src/lib/ask/config.ts` accepts exactly two
shapes:

- `openrouter/free`, and
- `vendor/model:free` (`/^[a-z0-9][a-z0-9._-]*\/[a-z0-9][a-z0-9._:-]*:free$/i`).

Everything else is rejected with `model_misconfigured` **before** a request is
made. That covers `openrouter/auto`, `openai/gpt-4o`,
`google/gemma-4-31b-it:free:paid` and anything else. There is no code path
that retries with a different provider, and no code path that silently falls
back to a paid model.

### 4.3 The free models that are actually published

Free model availability changes. The list below was read from
`GET https://openrouter.ai/api/v1/models` on **10 November 2026** and is
recorded here for transparency, not as a promise:

| Model id | Context window |
| --- | --- |
| `openrouter/free` (router) | 200 000 |
| `baidu/ernie-5.5-flash-preview:free` | 1 024 000 |
| `thinkingmachines/inkling-2-small:free` | 1 048 576 |
| `liquid/lfm-3-1.7b:free` | 262 144 |
| `liquid/lfm-2.5-2.6b:free` | 65 536 |
| `recursive/flint-v1.0:free` | 262 144 |
| `nvidia/nemotron-3.5-super-vl:free` | 1 000 000 |
| `nvidia/nemotron-3.5-lightning:free` | 1 000 000 |
| `nvidia/nemotron-3-ultra-550b-a55b:free` | 1 000 000 |
| `nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free` | 256 000 |
| `dots-studio/dots-3-note-preview:free` | 512 000 |
| `cohere/north-mini-code:free` | 256 000 |
| `google/gemma-4-26b-a4b-it:free` | 262 144 |
| `google/gemma-4-31b-it:free` | 262 144 |

Two rules governed how this list was read:

1. **A zero price is not proof of a free model.** The `:free` suffix and the
   `openrouter/free` router are the only accepted forms, because those are the
   identifiers OpenRouter uses for its free tier.
2. **The list is re-read at request time by the manual check.**
   `node scripts/ask-openrouter.mjs` prints the live list before it makes a
   request, so the documentation can be refreshed without guessing.

### 4.4 Choosing a pinned model: Arabic and English quality

Pinning is optional. If you do pin, the evaluation procedure is:

1. Run `node scripts/ask-openrouter.mjs` with the candidate id. It refuses any
   id that is not free, so a paid model cannot be tested by accident.
2. Ask the same question in English and in Arabic and compare the answers
   against the GRAVERSE record for the same entity.
3. Check that the answer cites a source id that exists in
   `src/data/sources.ts` and that it does not merge mission status with
   hardware status.
4. Prefer the general-purpose models over the code-specialised one
   (`cohere/north-mini-code:free`) and over the omni/vision models
   (`nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free`): the assistant
   sends text only.
5. Prefer the larger multilingual general models for Arabic, where the answer
   has to be idiomatic rather than a transliteration.

**Status of this evaluation.** The procedure above was defined up front, but
**no authenticated provider request was performed during development**, because
no OpenRouter API key was available in the build environment. The routing
decision is therefore: *keep `openrouter/free` as the default* — the router
already restricts the request to free models and picks whichever free model is
healthy — and treat pinning as an operator decision that must be made with a
real key and the manual script, not as something to guess.

---

## 5. Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `OPENROUTER_API_KEY` | No | The OpenRouter key. Read on the server only. |
| `OPENROUTER_MODEL` | No | The model to call. Defaults to `openrouter/free`. Must be a free model. |

Both are optional. With neither set, GRAVERSE runs exactly as it did before:
the Museum, Academy, Explorer and every supporting surface are unaffected, and
the assistant reports that it is not configured.

```env
OPENROUTER_API_KEY=
OPENROUTER_MODEL=openrouter/free
```

`.env.example` carries these two entries. Real `.env*` files are ignored by
`.gitignore` with an explicit negation that keeps the template tracked.

### Never

- `NEXT_PUBLIC_OPENROUTER_API_KEY` — a `NEXT_PUBLIC_` variable is inlined into
  the client bundle. The test suite fails the build if one appears.
- A committed key of any kind.
- A billing variable, a credit-purchase setting, or an automatic top-up.

---

## 6. API key security

| Control | Where |
| --- | --- |
| The key is read inside the route handler | `src/lib/ask/config.ts` → `resolveOpenRouterKey()` |
| The key is only ever used in an `Authorization` header | `src/lib/ask/openrouter.ts` |
| The key never enters a response | every error path returns a fixed message |
| The key never enters a log | the provider's error body is discarded, not logged |
| The key never enters the client bundle | the client imports only `client-limits.ts` and `types.ts` |
| A build-failing test guards the boundary | `tests/ask.test.ts` → "the API key never reaches a client-side file" |

The provider request uses:

```
Authorization: Bearer <OPENROUTER_API_KEY>
Content-Type: application/json
HTTP-Referer: <the deployment origin>
X-OpenRouter-Title: GRAVERSE
```

`HTTP-Referer` is resolved from `NEXT_PUBLIC_SITE_URL`, then `VERCEL_URL`,
then `http://localhost:3000`.

### Request validation

`POST /api/ask` accepts:

```jsonc
{
  "question": "What happened to the hardware?",   // required, 1–600 characters
  "locale": "en",                                  // "en" | "ar"
  "context": { "kind": "artifact", "id": "perseverance" }, // optional hint
  "history": [                                     // optional, ≤ 8 turns
    { "role": "user", "content": "…" },
    { "role": "assistant", "content": "…" }
  ]
}
```

The body is validated with zod. Anything else is rejected with
`400 invalid_request`:

- a missing or blank question,
- a question longer than 600 characters,
- a history entry whose role is not `user` or `assistant`,
- more than 8 history turns,
- a history turn longer than 1 200 characters,
- a context id longer than 120 characters or containing characters outside
  `[A-Za-z0-9._-]`.

### Never trusting the browser

The browser sends a **hint**: a kind and an id. The server resolves that id
against the real datasets in `src/data` and builds the context itself. A
well-formed id that does not resolve is dropped and the question is answered
in global mode; it is never echoed back into the prompt as if it were a
record. The browser cannot supply a title, a date, a status, a discovery or a
source URL, because none of those are read from the request.

### Output and time budgets

| Budget | Value | Where |
| --- | --- | --- |
| Maximum question length | 600 characters | `ASK_LIMITS` |
| Maximum history turns | 8 | `ASK_LIMITS` |
| Maximum output tokens | 700 | `ASK_LIMITS` |
| Provider timeout | 45 seconds | `ASK_LIMITS` |
| Provider retries | none | — there is no retry loop |

---

## 7. Grounded retrieval

The retrieval lives in `src/lib/ask/retrieval.ts` and reuses the existing
search index (`src/lib/search-index.ts`) and the existing typed datasets. It
creates no second dataset and no invented record.

### 7.1 The flow

The local engine runs first. Only when it cannot answer does the retrieval
below build the context for the provider.

```
Visitor question
  → the server resolves the context hint against src/data
  → the search index selects candidate records (OR semantics, not AND)
  → each record is rendered as labelled text lines
  → the registered sources behind those records are attached
  → the records + sources become the grounded context block
  → the context block and the question are sent to OpenRouter
  → the answer is returned with its authentic sources
```

### 7.2 Contextual retrieval

`retrieveForAsk()` resolves these entity kinds:

| Kind | Resolved against | Context |
| --- | --- | --- |
| `artifact` | `getArtifactById()` | The full artifact record |
| `mission` | `getMission()` | The derived mission record and its hardware |
| `lesson` | `getLesson()` | The Academy lesson |
| `engineering` | `getEngineeringTopic()` | The engineering explainer |
| `simulation` | `getSimulation()` | The educational model and its approximation note |
| `story` | `getStoryCollection()` | The curated story |
| `body` | `getBody()` | The destination record |
| `agency` | `getAgency()` | The agency record |

The contextual pages are:

| Page | Route | Context kind |
| --- | --- | --- |
| Artifact record | `/museum/[id]` | `artifact` |
| Mission record | `/museum/missions/[id]` | `mission` |
| Academy lesson | `/academy/lessons/[id]` | `lesson` |
| Engineering explainer | `/engineering/[id]` | `engineering` |
| Mission Experience Lab | `/simulations/[id]` | `simulation` |
| Space story | `/stories/[id]` | `story` |
| Destination | `/explorer/bodies/[id]` | `body` |
| Agency | `/museum/agencies/[id]` | `agency` |

Every one of those pages also carries an explicit **"Ask GRAVERSE about this
record"** button that opens the assistant with the contextual mode already
selected.

### 7.3 Global retrieval

A question with no context is answered from the search index. `searchAll()`
requires every term to match, which is right for the site's search box and
wrong for a natural-language question, so the index is reused as the candidate
pool and the terms are scored with OR semantics instead. A small
query-expansion dictionary maps common Arabic vocabulary onto the English
record vocabulary — vocabulary only, never a fact.

A global question also receives a **compact collection index**: every
artifact's name, mission, destination, hardware type and its two separate
status bands. It carries no prose and no additional facts, and it lets the
assistant point at a real record rather than guess.

A question about the two status bands themselves is answered from three
contrasting records — a mission that ended on purpose with its hardware
destroyed, a mission that ended while its hardware is still in use, and a
mission that ended while its hardware was simply left behind. The three are
picked out of the dataset at request time, not written down by hand.

### 7.4 The two operating modes

The assistant runs in one of two modes, and the visitor can switch between
them from the panel:

| Mode | What is sent | When |
| --- | --- | --- |
| **Contextual** | The resolved record, its related records and their sources | On a record page, or after pressing "Ask GRAVERSE about this record" |
| **Global** | The search-selected records plus the compact collection index | Everywhere else, or when the visitor switches to "The collection" |

Switching modes clears the conversation, because the previous answers were
grounded in a different set of records.

### 7.5 What a record contributes to the prompt

For an artifact that means: name and alternate names, hardware type, mission,
program, destination, summary, overview, scientific purpose, **both** status
bands with NASA's original wording, launch / arrival / mission-end / last-contact
dates, the recorded timeline, the scientific and engineering contributions, the
fate, the recorded location with its precision, the technical details, the
related records and the uncertainty notes.

### 7.6 Sources

The source list that reaches the prompt is built from the `sourceIds` of the
retrieved records and resolved through `getSources()` in
`src/data/sources.ts`. Every source carries its organization, title, type,
access date and URL.

The links shown to the visitor are filtered one more time: only source ids
that the model actually cited **and** that exist in the retrieved set are
shown. A hallucinated citation cannot become a link. When the model cites
nothing, the retrieved records' own sources are listed instead, capped at
eight.

---

## 8. Scientific grounding

The system prompt in `src/lib/ask/prompt.ts` carries the rules. It states,
among others:

- ground every factual statement in the provided records — they are the only
  facts the assistant may use;
- never invent NASA facts, mission dates, destinations, discoveries, hardware
  conditions or source URLs;
- never cite a source that is not in the sources block;
- **mission status and hardware status are different questions**, and neither
  may be used to imply the other;
- hardware condition is a recorded snapshot, **not live telemetry**;
- a simulation is an educational approximation, never a NASA prediction;
- use uncertainty-aware language.

When the retrieved records do not answer the question, the assistant must use
this sentence exactly:

> The available GRAVERSE records do not establish this information.

and its Arabic equivalent:

> السجلات المتاحة في GRAVERSE لا تُثبت هذه المعلومة.

The assistant is also told to point the visitor at a related GRAVERSE record
instead of guessing, and to end with two or three follow-up questions.

### Answer shape

1. A direct answer in the first sentence.
2. A simple explanation, as if to an intelligent 12-year-old.
3. The relevant historical or scientific context, including the engineering
   decisions behind the hardware.
4. The connection to GRAVERSE — which record, mission or destination it is,
   and what else to look at.
5. The verified sources, by id.

Answers are kept short: roughly 120–220 words unless the visitor asks for
depth. Depth is changed, never the facts.

### Language

The prompt is written in the visitor's language, and the records are supplied
in English. The assistant is instructed to answer in the visitor's language
while keeping the identifiers, the source ids and the technical terms
unchanged.

---

## 9. Free-quota protection

The published limits for OpenRouter's free models are **20 requests per
minute** and **50 requests per day** for accounts below the purchased-credit
threshold. This project never purchases credits to extend them, so every
local limit sits deliberately *below* those numbers.

| Limit | Value | Scope |
| --- | --- | --- |
| Per client, per minute | 5 | one visitor |
| Per client, per day | 20 | one visitor |
| Per instance, per minute | 15 | the whole deployment |
| Per instance, per day | 40 | the whole deployment |
| Client cooldown | 5 seconds | after each answer, in the browser |
| Question length | 600 characters | request body |
| History turns | 8 | request body |
| Output tokens | 700 | provider request |
| Provider timeout | 45 seconds | provider request |
| Retries | none | — |
| Local answers | not throttled | a local answer costs no quota, so it is never rate limited |

A throttled request returns `429` with the message:

> Ask GRAVERSE has temporarily reached its free AI usage limit. You can
> continue exploring the Museum, Academy, and Explorer while the service is
> unavailable.

### Limitation of the in-memory limiter

`src/lib/ask/rate-limit.ts` keeps its counters in the Node process. On a
serverless or multi-instance deployment each instance keeps its own counters,
so the effective ceiling is the per-instance limit multiplied by the instance
count, and the counters reset when an instance is recycled. A shared store
(for example Upstash Redis) would enforce one global ceiling, but that is a
paid dependency and this project does not introduce one. The in-process limits
are a first line of defence; the upstream free-tier limit remains the real
backstop.

A rejected request is **not** counted as a delivered answer, and there is no
infinite retry anywhere in the code.

---

## 10. Error handling

| Situation | HTTP | `error.code` | What the visitor sees |
| --- | --- | --- | --- |
| Bad body | 400 | `invalid_request` | "That request could not be understood." |
| No API key | 503 | `not_configured` | The assistant is unavailable; the museum still works |
| Model is not free | 500 | `model_misconfigured` | The assistant is paused |
| Local throttle hit | 429 | `quota_exceeded` | The free-usage-limit message |
| Provider 401 | 502 | `provider_unauthorized` | The assistant is unavailable |
| Provider 402 | 503 | `provider_insufficient_credits` | The free-usage-limit message |
| Provider 429 | 429 | `quota_exceeded` | The free-usage-limit message |
| Provider 5xx | 502 | `provider_error` | "The AI service did not answer." |
| Provider timeout | 504 | `provider_timeout` | "The AI service took too long to answer." |
| Unreadable provider body | 502 | `provider_malformed` | "The AI service returned an unreadable answer." |
| No records matched | 200 | — | The assistant says the records do not establish it |

No error path returns a stack trace, a provider body, a request body or the
API key. `GET /api/ask` reports only whether the service is configured, which
model is configured, and the public limits.

---

## 11. Privacy

The interface tells the visitor, in the panel itself, that:

- the prompt is processed by OpenRouter and by the free model provider it
  selects;
- answers are AI-generated and may contain errors, and the linked original
  sources should be checked before a scientific claim is relied on;
- there is no account, no tracking, and the conversation is not stored after
  the answer is delivered.

In practice:

- no conversation is written to disk, to a database or to a log;
- no account, cookie or identifier is created for the assistant;
- only public GRAVERSE records are sent as context;
- the visitor's free-text question is sent to the provider, because that is
  what a question is.

---

## 12. Testing

### Automated — `npm run test:ask`

`tests/ask.test.ts`, `tests/ask-local.test.ts` and `tests/ask-markdown.test.ts`
run 81 tests with a mocked provider. **No test consumes real quota and no
test needs a key.**

The provider call is mocked in `tests/ask.test.ts`: `handleAskRequest()`
accepts a `fetchImpl`, so every provider outcome — success, 401, 402, 429,
500, timeout, malformed body, empty answer — is produced locally.

Covered: the free-model rule, the default model, the service report, the rate
limiter and its ceilings, retrieval against the real datasets, mission status
and hardware status staying apart, an unknown contextual id being dropped
rather than trusted, the Arabic query expansion, the contrasting records
retrieved for a question about the two status bands, the grounded context
block, the system prompt's scientific rules, the message order, citation
filtering, defensive provider parsing, a missing key, a successful response,
an invalid model, an empty question, an over-long question, invalid history,
an invalid artifact identifier, provider 401 / 402 / 429 / 500, a timeout,
malformed and empty provider output, English and Arabic requests, a
contextual artifact question, authentic source links, prompt injection
through the history, the key never reaching a client file, and the key never
appearing in an answer.

The local engine is covered in `tests/ask-local.test.ts`: normalisation and
Arabic stemming, the conversational intents, the knowledge base, the record
answers, the contextual record, the comparisons, the relationships, the
ambiguity rule, the cache, and the guarantee that a local answer never reaches
the provider, is never throttled and needs no key.

The Markdown renderer is covered separately: headings, lists, code, links,
block quotes, escaped markup, a `javascript:` URL that never becomes a link,
and the rule that a citation only becomes a link when the server returned that
source.

The browser journeys (`scripts/journeys.mjs`) add five more: the console
opens and stays contextual, it never opens more than one WebGL surface, the
3D identity never escapes the console, the service report agrees with the
composer state, and the assistant still works on a device without WebGL.

One journey asks a question the archive can answer on its own — "What is the
Solar System?" — and checks that the answer arrives, that it is labelled as
GRAVERSE Knowledge and that it carries its registered sources. **That answer
is assembled locally, so the journey spends no provider quota.** No journey
asks a question the local engine cannot answer.

### Manual — `node scripts/ask-openrouter.mjs`

A separate script that makes a **real, authenticated** request:

```bash
OPENROUTER_API_KEY=sk-or-v1-… node scripts/ask-openrouter.mjs
```

It lists the live free models, refuses to run against a non-free model, makes
one chat completion, prints the model OpenRouter actually used and the token
counts, and optionally exercises `POST /api/ask` on a running server:

```bash
OPENROUTER_API_KEY=sk-or-v1-… BASE_URL=http://localhost:3100 \
  node scripts/ask-openrouter.mjs
```

It is not part of `npm run verify`, precisely because it spends quota.

---

## 13. Deployment

1. Create an OpenRouter account and generate an API key.
2. Set the environment variables on the host:

   ```
   OPENROUTER_API_KEY=<the key>
   OPENROUTER_MODEL=openrouter/free
   NEXT_PUBLIC_SITE_URL=https://<the deployment origin>
   ```

3. Build and run. The route is a Node runtime route:

   ```
   npm run build && npm run start
   ```

Nothing else is required. There is no database, no queue, no cache and no
paid service.

### Verifying a deployment

```bash
curl -s https://<the deployment>/api/ask
# {"ok":true,"configured":true,"model":"openrouter/free","freeOnly":true,…}

curl -s -X POST https://<the deployment>/api/ask \
  -H 'Content-Type: application/json' \
  -d '{"question":"What happened to the hardware?","context":{"kind":"artifact","id":"perseverance"}}'
```

If `configured` is `false`, the key did not reach the deployment. If the
response is `model_misconfigured`, `OPENROUTER_MODEL` is not a free model.

---

## 14. Known limitations

- **Free-model quality varies.** The router may select a different free model
  at different times, and a small free model can still produce a weaker answer
  than a large one. The grounding rules limit the damage but do not remove it.
- **The quota is small and shared.** 50 requests a day is the published daily
  ceiling for the account. Ask GRAVERSE is a supplementary experience, never a
  dependency: the Museum, Academy and Explorer are fully functional without it.
- **The in-memory throttle is per instance.** See §8.
- **The records are English.** The interface is localised into Arabic and the
  assistant answers in Arabic, but the underlying editorial prose is English.
  An Arabic question that names no recognisable entity falls back to the
  collection index, and the assistant will say that the records do not
  establish the answer.
- **Retrieval is lexical.** It reuses the site's search index with OR
  semantics. It has no embeddings and no semantic re-ranking.
- **Only the eight entity kinds listed in §6.2 have contextual records.**
  Every other question is answered in global mode.
- **Answers are AI-generated.** Every scientific claim should still be checked
  against the linked original source, which is what the interface says.

---

## 15. File map

| File | Purpose |
| --- | --- |
| `src/app/api/ask/route.ts` | The route handler — a thin adapter |
| `src/lib/ask/types.ts` | The transport contract |
| `src/lib/ask/config.ts` | Endpoints, limits, the free-model rule |
| `src/lib/ask/client-limits.ts` | The limits that are safe to ship to the browser |
| `src/lib/ask/handler.ts` | Validation → key → model → throttle → retrieve → provider |
| `src/lib/ask/retrieval.ts` | Grounded retrieval and the context block |
| `src/lib/ask/prompt.ts` | The system prompt and citation filtering |
| `src/lib/ask/openrouter.ts` | The provider client and error mapping |
| `src/lib/ask/rate-limit.ts` | The in-memory throttle |
| `src/components/ask/AskGraverseProvider.tsx` | The provider: open state, context, mode |
| `src/components/ask/AskGraverseScope.tsx` | Registers the record a page is about |
| `src/components/ask/AskGraverse.tsx` | The launcher and the console |
| `src/components/ask/AskGraverseButton.tsx` | The "Ask GRAVERSE about this record" entry point |
| `src/components/ask/AskCore.tsx` | The 3D stage: probe, lazy mount, pause, visibility |
| `src/components/ask/AskCoreScene.tsx` | The astrolabe and its single `<View>` canvas |
| `src/components/ask/AskCoreFallback.tsx` | The CSS core for devices without WebGL |
| `src/components/ask/markdown.tsx` | The safe Markdown renderer |
| `src/components/ask/suggestions.ts` | The suggested questions, per mode and per record kind |
| `src/components/ask/ask-cache.ts` | The browser-side answer cache |
| `src/lib/ask/local/normalize.ts` | Unicode and Arabic-aware normalisation, stemming and tokenising |
| `src/lib/ask/local/entities.ts` | The entity index and the alias map |
| `src/lib/ask/local/arabic-aliases.ts` | Arabic names for the records |
| `src/lib/ask/local/intents.ts` | Layer A — conversational intents |
| `src/lib/ask/local/faq.ts` | Layer B — the curated knowledge base |
| `src/lib/ask/local/records.ts` | Layer C — dynamic record answers |
| `src/lib/ask/local/matcher.ts` | Layer D — deterministic matching |
| `src/lib/ask/local/relationships.ts` | Layer E — comparisons and relationships |
| `src/lib/ask/local/cache.ts` | The in-process answer cache |
| `src/lib/ask/local/engine.ts` | The router and the confidence evaluation |
| `tests/ask.test.ts` | The provider, retrieval, prompt and security tests |
| `tests/ask-local.test.ts` | The local intelligence engine tests |
| `tests/ask-markdown.test.ts` | The Markdown and citation tests |
| `scripts/ask-openrouter.mjs` | The manual provider integration check |
