# Accessibility

Target: **WCAG 2.1 AA**.

## What is implemented

### Structure and semantics

- One `main` landmark, one `h1` per page, ordered headings.
- Skip-to-content link is the first focusable element on every page.
- Header and footer navigation are labelled (`Primary`, `Mobile primary`, etc.).
- Breadcrumbs are `<nav aria-label="Breadcrumb">`.
- Status is never conveyed by colour alone: badges include text and an icon.
- Derived communication status carries a text note explaining that it is not live
  telemetry, and passive hardware is explicitly labelled not applicable.
- Claim badges always show a text label, not just a coloured pill.
- Fact grids use `dl`/`dt`/`dd`; lists use `ul`/`li`. The claim legend is a list,
  not a malformed definition list.
- Decorative gradients, star fields and every 3D canvas are `aria-hidden`. Game
  state, controls and results live in ordinary HTML outside the canvas.

### Keyboard

- All controls are native buttons, links, inputs or selects.
- Focus is visible (`:focus-visible` outlines and contrast-safe rings).
- The museum's exhibition hall is fully keyboard-operable from inside the
  section: `←`/`→` move between exhibits, `Home`/`End` jump to the first and
  last, `Space` starts or pauses the guided tour, `R` resets the view, `+`/`−`
  zoom and `?` opens the shortcut list. The floor plan and the chronology
  axis are ordinary buttons, and the record panel's scroll area is focusable.
- The mobile navigation opens with Enter/Space, moves focus to the first link,
  closes on Escape and restores the trigger.
- The search field can be reached with `/` from anywhere except a text field.
- Progress reset uses an inline confirmation with explicit "Yes, reset" and
  "Cancel" buttons; destructive action is not a single unconfirmed click.
- Explorer filters, search kind filters, Academy quizzes and every playground
  game are operable without a pointer. Rover Quest accepts arrow keys and WASD
  from its focused control panel; the rocket and Moon games are button-driven.

### Motion

- `prefers-reduced-motion: reduce` shortens all animation and transition
  durations to near-zero unless the visitor explicitly opts back in.
- The header motion toggle persists a `full`/`reduced` choice.
- The 3D orrery stops auto-rotation and switches to on-demand rendering when
  reduced motion is requested. Playground scenes also stop decorative motion;
  the rocket jumps to its final launch position instead of animating, and the
  rover moves without bobbing.
- The museum's exhibition hall stops its decorative motion under reduced
  motion: the exhibits no longer bob, the dust stops drifting and the camera
  moves straight to the selected bay instead of gliding. Moving between
  exhibits still works, because that is navigation rather than decoration.

### Alternatives

- `/explorer/solar-system` has a full SVG orbit map with real links and a plain
  destination list. The 3D scene is optional and decorative.
- The museum's 3D exhibition hall has a complete non-canvas equivalent: a
  searchable room list, a numbered exhibit rail, a floor plan whose every bay
  is a real button, a chronology axis that places each exhibit by launch date,
  and a written record panel with the facts, contributions and actions of the
  selected exhibit. Nothing is only available inside the canvas.
- Every playground game has a complete no-WebGL path: the same part buttons,
  phase slider and text feedback for the rocket and Moon games, and a flat
  top-down grid map for Rover Quest.
- Every body and deep-sky record is readable as text; no fact exists only in a
  graphic.
- Explorer has a list view alternative to the visual timeline.
- Images use meaningful alt text where they carry information; decorative
  imagery is hidden.

### Language and direction

- A language toggle switches the interface between English and Arabic using a
  cookie, so the choice survives navigation without an account.
- The root `<html>` element receives `lang` and `dir` from the same locale, and
  the layout uses logical properties so the Arabic interface lays out RTL.
- Navigation, footer, homepage hero, section chrome and the new Mission Control,
  Engineering, Stories, Research, Simulations, My Universe and comparison
  surfaces are translated. Editorial artifact, lesson and story prose remains
  English-only, and the Research Archive states that limitation.
- Because the interface and the editorial records are written in different
  languages, mixed blocks are laid out with `unicode-bidi: plaintext`. A block
  takes its reading direction from its own content, so an English paragraph
  keeps its own order and an Arabic paragraph reads right to left. Without
  this, the bidi algorithm splits a date such as "16 July 1969" into two runs
  and moves a sentence-ending full stop to the front of the line.
- Technical values (dates, measurements, identifiers) are isolated so they
  never reorder inside an Arabic sentence. Status and communication badges are
  marked `dir="auto"`, so the English label and its value read as one unit
  instead of reversing around the separator.
- Corner labels, badges, search icons, quote borders and table alignment use
  logical inset, padding, border and text-align utilities, so they mirror with
  the text direction instead of staying pinned to the left.

### Forms and feedback

- Search input has a label (visually hidden), a described-by result count and an
  `aria-live="polite"` result summary.
- Progress import errors are announced and explained in text.
- Empty states explain what to do next.

### Ask GRAVERSE

- The assistant is a `role="dialog"` panel with an accessible name, opened by a
  real button that carries `aria-expanded` and `aria-controls`.
- The conversation is a `role="log"` with `aria-live="polite"`, so a new answer
  is announced without stealing focus. The log is focusable because it
  scrolls, so a keyboard user can reach the history.
- Escape closes the panel and returns focus to the launcher. Opening the panel
  moves focus to the question box. Enter sends, Shift+Enter adds a line break.
- The question box has a visually hidden label and a hard `maxlength`, and the
  remaining character budget is shown as text rather than as a colour change.
- Errors are announced with `role="alert"` and always say what the visitor can
  still do — the Museum, Academy and Explorer stay available.
- Verified sources are real links that open in a new tab with
  `rel="noopener noreferrer"`, and each one is followed by its source id as
  text, so the evidence is legible without colour.
- Answers are rendered by a hand-written Markdown renderer that never uses
  `dangerouslySetInnerHTML`. Model output cannot become markup, and a
  citation only becomes a link when the server actually returned that source.
- Answer headings start at `h3`, because the console title is already an `h2`,
  so the document outline stays in order.
- The 3D identity is decorative and `aria-hidden`. It is never the only
  carrier of information: the launcher keeps its accessible name, the console
  carries the title as text, and a device without WebGL gets an equivalent
  CSS mark in the same palette.
- The render loop stops while the assistant is idle, when the tab is hidden
  and when the visitor asks for reduced motion. The CSS fallback mark obeys
  the same reduced-motion rules as the rest of the site.
- The panel uses logical properties throughout, so it mirrors into the
  right-to-left Arabic layout, and answer blocks use `dir="auto"` so an Arabic
  answer reads right to left and an English one left to right.

## Automated checks

`npm run test:e2e` (also part of `npm run verify`) runs:

1. **axe-core** with tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa` on 38
   representative pages, including the new Mission Control, Engineering, Stories,
   Research, Simulations, My Universe, comparison and Academy build/flashcard/
   achievement/certificate surfaces.
2. **Smoke assertions** for HTTP status, title, exactly one `h1`, `main`
   landmark and non-empty content on 50 routes (one of which is the deliberate
   404 check).
3. **Keyboard assertions**: first Tab reaches the skip link; Enter activates it;
   the mobile menu opens, moves focus inside and closes on Escape; ArrowUp moves
   the rover from its focused control panel.
4. **Gameplay assertion**: launching the toy rocket waits for completion and
   checks that the badge was saved to local progress.
5. **Reduced-motion assertion**: with `prefers-reduced-motion: reduce`, the
   star-field animation duration is ≤ 0.001s.

### Last recorded result

- Axe: **0 violations** (0 serious, 0 critical) across the 38 pages.
- Keyboard checks: **passed**, including the rover move.
- Gameplay/badge persistence check: **passed**.
- Reduced-motion check: **passed**.
- User journeys: **24/24 passed** (`npm run test:journeys`), including the
  Arabic right-to-left pass, the 390px phone layout with its working menu, and
  the Explorer and playground still serving records and controls with WebGL
  disabled.
- Internal links: **192/192 resolved** (`npm run test:links`).

These results are local to the recorded run. They do not guarantee conformance
in every browser or assistive technology.

## Manual review performed

- Read through every page template for heading order, landmark structure and
  label text.
- Checked that colour is not the only carrier of status or claim information.
- Checked that unknown data is written as "Unknown"/"Not recorded" rather than
  represented by an empty coloured chip.
- Checked that decorative canvas/gradients are hidden from assistive technology.
- Checked focus order and Escape behaviour with the automated keyboard pass
  above.
- Rendered the home, Explorer, Museum detail, Search and playground pages in
  Arabic at 1440px and compared them against the English layout, checking
  reading order of dates, sentences, badges and labels.

## Known limitations

- No screen-reader session (VoiceOver/NVDA) was recorded for this submission.
- Arabic localisation is partial by design: interface chrome is translated, but
  editorial prose is still English-only. A screen reader will therefore switch
  languages within some pages.
- Axe cannot detect every contrast or focus problem, especially inside canvas.
- The 3D canvases have no keyboard interaction of their own by design; they are
  decorative. The orrery's 2D map and the playground's HTML controls are the
  accessible equivalents.
- Very long source lists rely on browser find; there is no in-page source
  filter yet.

If you find a barrier, the fastest fix path is the relevant template under
`src/app` plus the shared `SourceList` / `ClaimBadge` / `StatusBadge` components.
