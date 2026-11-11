# Accessibility

Target: **WCAG 2.1 AA**.

## What is implemented

### Structure and semantics

- One `main` landmark, one `h1` per page, ordered headings.
- Skip-to-content link is the first focusable element on every page.
- Header and footer navigation are labelled (`Primary`, `Mobile primary`, etc.).
- Breadcrumbs are `<nav aria-label="Breadcrumb">`.
- Status is never conveyed by colour alone: badges include text and an icon.
- Claim badges always show a text label, not just a coloured pill.
- Fact grids use `dl`/`dt`/`dd`; lists use `ul`/`li`. The claim legend is a list,
  not a malformed definition list.
- Decorative gradients, star fields and every 3D canvas are `aria-hidden`. Game
  state, controls and results live in ordinary HTML outside the canvas.

### Keyboard

- All controls are native buttons, links, inputs or selects.
- Focus is visible (`:focus-visible` outlines and contrast-safe rings).
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

### Alternatives

- `/explorer/solar-system` has a full SVG orbit map with real links and a plain
  destination list. The 3D scene is optional and decorative.
- Every playground game has a complete no-WebGL path: the same part buttons,
  phase slider and text feedback for the rocket and Moon games, and a flat
  top-down grid map for Rover Quest.
- Every body and deep-sky record is readable as text; no fact exists only in a
  graphic.
- Explorer has a list view alternative to the visual timeline.
- Images use meaningful alt text where they carry information; decorative
  imagery is hidden.

### Forms and feedback

- Search input has a label (visually hidden), a described-by result count and an
  `aria-live="polite"` result summary.
- Progress import errors are announced and explained in text.
- Empty states explain what to do next.

## Automated checks

`npm run test:e2e` (also part of `npm run verify`) runs:

1. **axe-core** with tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa` on 24
   representative pages:
   `/`, `/academy`, a journey, a lesson, an article, the glossary, the progress
   dashboard, the robot lab, the playground hub, all three playground games,
   `/museum`, an artifact, a mission, an agency, `/explorer`, a filtered Explorer
   list view, `/explorer/solar-system`, a body page, a deep-sky page, `/sources`,
   `/search?q=apollo`, and `/about`.
2. **Smoke assertions** for HTTP status, title, exactly one `h1`, `main`
   landmark and non-empty content on 36 routes.
3. **Keyboard assertions**: first Tab reaches the skip link; Enter activates it;
   the mobile menu opens, moves focus inside and closes on Escape; ArrowUp moves
   the rover from its focused control panel.
4. **Gameplay assertion**: launching the toy rocket waits for completion and
   checks that the badge was saved to local progress.
5. **Reduced-motion assertion**: with `prefers-reduced-motion: reduce`, the
   star-field animation duration is ≤ 0.001s.

### Last recorded result

- Axe: **0 violations** (0 serious, 0 critical) across the 24 pages.
- Keyboard checks: **passed**, including the rover move.
- Gameplay/badge persistence check: **passed**.
- Reduced-motion check: **passed**.

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

## Known limitations

- No screen-reader session (VoiceOver/NVDA) was recorded for this submission.
- Axe cannot detect every contrast or focus problem, especially inside canvas.
- The 3D canvases have no keyboard interaction of their own by design; they are
  decorative. The orrery's 2D map and the playground's HTML controls are the
  accessible equivalents.
- Very long source lists rely on browser find; there is no in-page source
  filter yet.

If you find a barrier, the fastest fix path is the relevant template under
`src/app` plus the shared `SourceList` / `ClaimBadge` / `StatusBadge` components.
