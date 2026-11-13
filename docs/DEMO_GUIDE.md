# Demo guide

A judge-facing walkthrough. Total time: about 9 minutes. Nothing depends on a
network connection except the outbound source links.

## Recording the demo video

The route to record: **Home → Museum → Artifact → Explorer → Academy.**

1. **Home** (0–10 s): the hero explains the project on its own — headline,
   featured-record telemetry panel, collection counts. Scroll once to show the
   progress rail.
2. **Museum** (`/museum`): the collection-at-a-glance panel, then hover an
   artifact card to reveal its evidence strip.
3. **Artifact** (`/museum/apollo-11-lm-descent-stage`): Moon atmosphere, the
   two separate status fields, provenance.
4. **Explorer** (`/explorer?destination=mars&mode=artifacts`): the rust-red
   atmosphere following the Mars filter; switch to the timeline.
5. **Academy** (`/academy`): the warm light surface, one quiz answer, one
   3D playground game.

Full-screen 1440×900 at 30 fps is enough; every surface also holds at 390×844.

## Before you start

```bash
nvm use
npm ci
npm run build
npm run start          # http://localhost:3000
```

Optional: open `/sources` once so the registry is warm in the browser cache.
Academy progress is local to the browser profile you demo in; use a fresh
profile or "Reset progress" if you want a clean slate.

## 0. The front door (45 s)

Open `/`.

- The first screen explains the project in about ten seconds: the headline, the
  one-line subtitle, the featured-record telemetry panel on the right (mission
  status, hardware status, date and destination), and the collection counts.
- Point out the entrance choreography: the headline, the two actions, the query
  line and the telemetry tiles arrive in a staggered sequence; the featured
  panel is framed with corner brackets, an orbit ring and a slow scan line.
- Say the sentence that frames the whole product: *"One verified collection,
  three different ways in — and every claim says how well it is established."*
- The three doors (**Space Academy**, **Museum**, **Explorer**) sit directly
  under the hero, numbered 01–03.
- The thin gradient rail under the header is scroll progress; it fills as the
  story scrolls.
- Show the collection counts and the source-linked featured record.

## 1. Space Academy and Playground (3 min)

Open `/academy`.

1. Show the three age bands — 5–7, 8–9, 10–12 — and the four journeys.
2. Open **First Flight** (`/academy/journeys/first-flight`).
   - Note the warm, light theme: it is the same shell as the museum, restyled.
   - Step through one journey step.
3. Open a lesson (`/academy/lessons/our-neighbor-the-moon`).
   - Take one quiz question.
   - Point out that the lesson cites the same source records as the museum.
4. Open **Play in 3D** (`/academy/play`).
   - Open **Rocket Workshop** (`/academy/play/rocket`).
   - Change the nose, body or fin count, then press **Launch my rocket**.
   - Wait for the reward panel: it says the **Rocket Builder** badge was earned.
   - Say the honesty line: these are toys built from simple shapes, not official
     spacecraft models, and sizes are not to scale.
   - Optional: open **Rover Quest** (`/academy/play/rover`), focus the arrow
     panel and drive with the arrow keys. The flat map works even without WebGL.
5. Open `/academy/progress`.
   - Show the local-only statement and the **Games played** count / playground
     stars.
   - Click **Export progress** (downloads `graverse-progress.json`), then
     **Reset progress** and show the inline confirmation.
   - Optional: re-import the file to show validation.

Talking point: no accounts, no analytics, no cloud; lessons, journey steps,
playground badges and best star scores share one versioned, validated local
record.

## 2. Museum (2 min)

Open `/museum`.

1. Show that mission status and hardware status are displayed **separately**.
2. Hover an artifact card: an evidence strip slides in from the bottom of the
   image with the record's legacy line — what the machine left behind.
3. Open **Apollo 11 Lunar Module Eagle**
   (`/museum/apollo-11-lm-descent-stage`).
   - The page backdrop turns to the Moon atmosphere (silver-blue).
   - Scroll the narrative: purpose → journey → science → fate.
   - Land on **Provenance**: mission, agency, source count, uncertainty note.
   - Show the original NASA status wording next to the normalized band.
4. Open `/museum/missions` → **Apollo 11**.
   - Explain that the mission page is *derived* from its artifact records, not
     hand-copied, so dates and status cannot drift.
5. Open `/museum/agencies/nasa` from the mission page.
   - Show the mission → agency → artifact chain.

## 3. Explorer (2 min)

Open `/explorer`.

1. Switch between **Timeline**, **By destination** and **By artifact**.
2. Apply a destination filter and a decade filter.
   - Point at the URL: the filters are in the query string and can be shared.
   - Filter by the Moon or Mars and point out that the whole backdrop
     atmosphere follows the destination: silver-blue for the Moon, rust-red for
     Mars, cyan-indigo for deep space. The same happens on artifact records.
3. Switch to **List view**.
   - This is the accessible alternative to the visual timeline.
4. Open `/explorer/solar-system`.
   - Drag the 3D orrery; note it is labelled decorative and "not to scale".
   - Scroll to the **accessible 2D map**: real links, keyboard-operable, complete
     without WebGL.
5. Open a destination (`/explorer/bodies/mars`).
   - Show `Confirmed` / `Estimated` / `Unknown` badges on facts.
   - Show that a fact without a source says so.

## 4. Provenance and search (1 min)

1. Open `/sources`.
   - Show the claim legend, the 96-record registry, access dates and the
     "Known limits" panel.
2. Open `/search?q=apollo`.
   - Show results grouped across artifacts, missions, lessons, journeys,
     articles and more.
   - Switch the kind filter.
3. Open `/search?q=zzzz-not-real` to show the empty state.

## 5. Accessibility and engineering (30 s)

- Press `Tab` once: the skip link appears.
- On mobile width, open the menu with the keyboard and close it with `Escape`.
- Mention: axe on 38 pages, 0 serious/critical violations; semantic landmarks;
  reduced-motion support; 2D alternatives.
- Mention the build gate: data validation, 21 data tests, lint, typecheck,
  production build, 47-route smoke and redirect checks, including a real rover
  key move and a rocket launch that saves its badge.

## 6. Arabic and the extra surfaces (45 s, optional)

1. Click the language toggle in the header.
   - The document switches to `dir="rtl"` and `lang="ar"`; the layout mirrors
     and dates stay intact. Say the honest line: interface chrome is translated,
     editorial prose is still English.
2. Switch back to English.
3. If there is time, open `/mission-control` to show mission, hardware and the
   clearly-labelled derived communication status side by side, then `/compare`
   with two records, and `/my-universe` to show the local, account-free record.

These are supporting surfaces. The three core experiences are the product; the
others prove the same records serve different questions.

## Recorded results

Last local run of `npm run verify`:

| Gate | Result |
| --- | --- |
| Data validation | Passed — 30 artifacts, 20 bodies, 8 deep-sky, 24 missions, 12 lessons, 4 journeys, 3 playground games, 8 articles, 96 sources, 581 edges |
| Data tests | 21/21 passed |
| ESLint | No errors and no warnings |
| Typecheck | Passed |
| Production build | Passed — 47 route patterns, 172 concrete routes |
| Smoke | 50 routes, 0 failures, including gameplay and badge persistence |
| Axe | 0 violations on 38 pages |
| User journeys | 30/30 passed |
| Internal links | 192/192 resolved |

Reproduce with:

```bash
npm run verify
```

## If something goes wrong

- **Port in use:** stop the other process, or use `npx next start -p 3200` and
  `BASE_URL=http://localhost:3200 npm run test:e2e`.
- **3D does not render:** expected on machines without WebGL. The Explorer falls
  back to the 2D orbit map and the playground games fall back to their full HTML
  controls and diagrams. All content and actions remain available. Say so — it
  is a feature.
- **No Chrome for browser tests:** set `CHROME_PATH`, or demo without the
  automated gate and show the recorded results above.
- **Academy progress looks stale:** open `/academy/progress` and reset it.

## Do not claim

- A deployment URL that is not in this repository.
- That GRAVERSE ships the official NASA challenge dataset. The supplied folder
  contained the blueprint and the visual reference, so the collection was
  normalized from public NASA mission pages, NASA/NSSDCA technical records and
  NASA image records. `/about` states this and `/api/export` serves exactly the
  data that is on screen.
- NASA endorsement, partnership or review.
- Lighthouse scores or field performance data that were not measured.
- Screen-reader certification. Automated axe and keyboard checks are not the
  same as a screen-reader audit.
- A complete inventory of space history. The collection is deliberately finite.
- That the playground 3D models are official spacecraft reconstructions or to
  scale. They are primitive toys, and the rover terrain is invented for play.
