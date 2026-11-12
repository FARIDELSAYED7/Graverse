# Scientific Research & Data Integrity — Complete Member Guide

## Your mission

You are the scientific and historical conscience of GRAVERSE. Your job is to make sure that the team can answer: “How do you know?” without confusing a polished sentence with evidence.

You do not need to be an astronomer. You need a repeatable research method, careful reading, source discipline, and the courage to write **Unknown** when the evidence does not establish a fact.

## 1. Space hardware heritage

Space hardware is the physical equipment sent beyond Earth to perform a mission. In GRAVERSE it includes:

| Type | Simple meaning | GRAVERSE examples |
|---|---|---|
| Rover | A mobile vehicle that travels across a surface | `sojourner`, `perseverance`, `apollo-15-lunar-rover` |
| Lander | A vehicle designed to descend and remain on a surface | `viking-1-lander`, `surveyors`, `insight` |
| Orbiter | A spacecraft that travels around a body | Dataset type available in `src/types/artifact.ts`; inspect records before using this example in a story |
| Probe | A spacecraft sent to measure or observe, often including an impactor | `ranger-7`, `lunar-prospector`, `lcross` |
| Instrument | A scientific device or package that measures something | `apollo-11-lrrr`, `apollo-12-alsep`, `apollo-15-lrrr` |
| Surface equipment | Hardware deliberately left on a body | Apollo descent stages and surface packages |
| Aircraft | A vehicle designed to fly in an atmosphere | `ingenuity` |

The record type is defined by `HardwareType` in `src/types/artifact.ts`. Do not infer a type from a photograph alone.

### Mission history versus physical condition

These are separate axes:

- **Mission history:** launch, arrival, operations, milestone, end of mission, and contact history.
- **Physical condition:** operating, inactive, no longer communicating, impacted, destroyed, still traveling, or unknown.

Ranger 7 is a good teaching case: the mission succeeded and the spacecraft then intentionally impacted the Moon. Surveyor 3 completed its original work but remained on the lunar surface and was later visited by Apollo 12. A retroreflector can be scientifically useful without transmitting a radio signal. Use the actual wording in the selected record and source, not a simplified “alive/dead” frame.

## 2. The research method

### Step 1 — Define a narrow question

Bad question: “Tell me everything about Mars.”

Good questions:

- What did `surveyor-3` do, and what is known about its later condition?
- What did `apollo-11-lrrr` contribute, and is it an active transmitter?
- Is `voyager-1` still traveling, still communicating, both, or neither?
- Was `ranger-7` destroyed by accident or impacted as part of the mission plan?

### Step 2 — Start with primary sources

Use sources in this order when possible:

1. NASA mission page or mission operations page.
2. NASA/JPL technical or image archive.
3. NSSDCA mission record or spacecraft catalog.
4. Other government or space-agency archive.
5. Peer-reviewed paper or reputable institutional reference.
6. Secondary explanation only to find leads, never as the sole evidence for a contested fact.

Useful official resources:

| Resource | What it is useful for | URL |
|---|---|---|
| NASA Solar System Exploration | Mission summaries and destination context | <https://solarsystem.nasa.gov/> |
| NASA Science missions | Mission status, science goals, discoveries | <https://science.nasa.gov/mission/> |
| NASA/JPL | Robotic mission history, engineering, images, rover records | <https://www.jpl.nasa.gov/> |
| NASA Photojournal | Image identity, captions, credits, image IDs | <https://photojournal.jpl.nasa.gov/> |
| NSSDCA | Mission and spacecraft technical records | <https://nssdc.gsfc.nasa.gov/> |
| NASA NSSDC Master Catalog | Historical spacecraft and mission metadata | <https://nssdc.gsfc.nasa.gov/nmc/> |
| NASA History Office | Program history and primary historical context | <https://history.nasa.gov/> |
| NASA Mars Exploration | Mars rover and lander context | <https://mars.nasa.gov/> |
| NASA Lunar Reconnaissance Orbiter | Lunar hardware and landing-site imagery context | <https://lunar.gsfc.nasa.gov/> |
| ESA Science | Independent agency context and comparison | <https://www.esa.int/Science_Exploration/Space_Science> |

### Step 3 — Record exact evidence

Use this research-note template:

```text
Artifact:
Question:
Source title:
Organization:
URL:
Source type:
Access date:
Exact fact supported:
What the source does not establish:
GRAVERSE field(s):
Confidence: confirmed / estimated / unknown / disputed
Follow-up source or question:
```

You may quote a short phrase in your notes, but in the handbook and presentation prefer a faithful paraphrase with a link. Never copy a whole article.

### Step 4 — Compare sources

When sources disagree:

1. Check whether they mean different things: mission end versus last contact; impact point versus landing region; launch mass versus landed mass.
2. Check dates and source type.
3. Preserve the conflict in your notes.
4. Ask the Founder whether the existing record already captures it in `dataNotes`.
5. Do not silently choose the most convenient number.

### Step 5 — Map the result to the dataset

The artifact contract includes `missionName`, `programName`, `destination`, `hardwareType`, `missionStatus`, `missionStatusOriginal`, `hardwareStatus`, `hardwareStatusOriginal`, dates, `primaryMilestone`, `timelineEvents`, `scientificContributions`, `fate`, `location`, `technicalDetails`, `sourceIds`, `lastVerified`, and `dataNotes` (`src/types/artifact.ts`). Your job is to verify the claim, not to change these fields during this mission.

## 3. Actual GRAVERSE assignment

Choose at least 8 and no more than 10 artifacts, balanced across the three destination groups and different hardware types. The following is the recommended sample because it exposes different status and storytelling cases:

| Artifact ID | Why it is useful to audit | Key questions |
|---|---|---|
| `ranger-7` | Planned impact, imaging before destruction | Was impact intentional? What did the images enable? |
| `surveyor-3` | Surface lander later visited by humans | What was its mission? What happened in 1969? |
| `apollo-11-lm-descent-stage` | Human landing hardware left on Moon | What part remains? What is documented versus assumed? |
| `apollo-11-lrrr` | Passive instrument and continuing science | Does “not transmitting” mean “not useful”? |
| `apollo-12-alsep` | Surface science package | Which experiments are represented and what is the status? |
| `viking-1-lander` | Long-lived Mars surface mission | What is known about operation and end of contact? |
| `perseverance` | Modern Mars rover with current/recorded status | Separate mission activity from present record freshness. |
| `ingenuity` | Aircraft on Mars | What does a completed flight mission mean for hardware? |
| `voyager-1` | Deep-space probe still traveling | Separate still traveling, communication, and mission status. |
| `cassini` | Deliberate end at Saturn | Why is destroyed not the same as failed? |

Inspect the exact fields and source IDs in `src/data/artifacts/moon-a.ts`, `moon-b.ts`, `mars-a.ts`, `mars-b.ts`, `deep-a.ts`, and `deep-b.ts`. Confirm the current record before writing.

### Verification table

Create a working copy of this table in your research report:

| Artifact | Field/claim | Existing value | Primary source | Second source | Status of verification | Notes |
|---|---|---|---|---|---|---|
| `ranger-7` | Hardware outcome | `impacted` | NASA mission page | NSSDCA record | To verify | Intentional impact must be explicit |
|  | Scientific contribution | First U.S. close-up lunar images | NASA/JPL or NSSDCA | NASA history | To verify | Distinguish U.S. wording from global first |
|  | Location | Mare Cognitum region | Mission source | NSSDCA | To verify | Do not invent a precise coordinate |

### Three complete artifact stories

Write three stories using this structure:

1. **Beginning:** what problem or question motivated the mission?
2. **Purpose:** what was the hardware designed to do?
3. **Design:** which hardware choices mattered, and what evidence supports that?
4. **Journey:** launch, arrival, key operation, and end-of-mission event.
5. **Discovery:** what did scientists or engineers learn?
6. **Legacy:** how did the result affect later exploration or understanding?
7. **Hardware now:** what is known about the physical object, with status separated.
8. **Uncertainty:** what is not known or only approximate?
9. **Sources:** list the exact GRAVERSE source IDs and external URLs.

Recommended story set: `ranger-7` for deliberate impact; `surveyor-3` for hardware heritage and later human visitation; and `apollo-11-lrrr` for the distinction between passive hardware and radio communication. If the source review shows a better balanced set, record the reason.

## 4. Understanding provenance in the code

**What?** A provenance system labels how strongly a claim is established.

**Why?** It prevents the interface from making every sentence look equally certain.

**How?** `src/types/provenance.ts` defines the contract; `src/lib/provenance.ts` defines labels and descriptions; `src/components/ui/ClaimBadge.tsx` and `SourceList.tsx` render them; `scripts/validate-data.ts` checks source references.

**Evidence?** `src/lib/provenance.ts`, `src/types/provenance.ts`, `src/data/sources.ts`, `/sources`, and `tests/data.test.ts` tests that citations resolve.

**Limitation?** A citation proves that a source is registered and attached. It does not automatically prove that every sentence is perfectly interpreted. Human review is still required.

When you see `confirmed`, `estimated`, `simulated`, or `unknown`, ask what the label means in this record. “Simulated” is not a historical fact; it must have an explanation. “Unknown” is a deliberate result, not missing professionalism.

## 5. What to deliver

- **Scientific research report:** 8–10 artifact audits, method, source hierarchy, and conclusions.
- **Artifact verification table:** field-by-field evidence, not a list of URLs.
- **Source register:** source title, organization, URL, type, access date, and what it supports.
- **Three stories:** written with beginning/purpose/design/journey/discovery/legacy/status/uncertainty.
- **Uncertain or disputed facts:** a short list with the competing interpretations and next action.
- **Ten scientific judge questions:** each with a concise answer and evidence path.

## 6. Oral mastery test

### Beginner

1. What is an artifact in GRAVERSE?
2. What is the difference between a mission and hardware?
3. Name three source types.
4. What should you write when a value is not established?
5. Why is a photo not automatically proof of location or condition?

### Intermediate

1. Show the source IDs for `surveyor-3` and open their registered source records.
2. Explain why `ranger-7` is represented as impacted rather than simply failed.
3. Explain one `dataNotes` entry and why it matters.
4. Compare `missionStatusOriginal` and `hardwareStatusOriginal` for one artifact.
5. Trace one scientific contribution to its source.

### Expert

1. What is the evidence for the selected hardware destination, and is the location exact, approximate, region, or unknown?
2. Which claim could a judge reasonably challenge, and how would you answer without overstating it?
3. How does the validator prevent an unsupported confirmed claim?
4. What is the difference between a source being authoritative and a source being sufficient for a specific claim?
5. How would you preserve a conflict between a mission page and a technical archive?

### Critical judge simulation: answer key principles

- **“Is this a complete list?”** No. It is a deliberately finite, curated collection; the limitation is disclosed.
- **“Does stopped communication mean destroyed?”** No. The record distinguishes no longer communicating, inactive, impacted, destroyed, still traveling, and unknown.
- **“Why trust your dates?”** Each important claim is attached to registered sources; the team can open the source and explain precision.
- **“Did NASA approve this?”** No endorsement or partnership is claimed.
- **“What if the source changes?”** The record includes access dates and verification dates; future updates should be logged and revalidated.

## 7. Research quality checklist

- [ ] I used a primary or institutional source for each central claim.
- [ ] I recorded access dates and source type.
- [ ] I separated mission status from hardware status.
- [ ] I did not convert no-contact into destruction.
- [ ] I did not invent coordinates, dates, or current activity.
- [ ] I kept original wording and normalized wording distinct.
- [ ] I recorded disagreement and uncertainty.
- [ ] I can show the exact app route where the claim appears.
- [ ] I can explain what the evidence does not establish.
- [ ] I added unresolved items to `team/shared/OPEN_QUESTIONS.md`.

