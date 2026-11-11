# ADR 0004 — Theme experiences with RGB CSS variables on `<html>`

- Status: accepted
- Date: 2026-11-10

## Context

The Academy must feel warm and light; the Museum and Explorer stay cinematic and
dark. The shared header, footer and page shell should not be duplicated. Tailwind
opacity modifiers (`bg-accent/10`, `border-white/10`) are used throughout, so
plain hex CSS variables would break those utilities.

## Decision

- Set `document.documentElement.dataset.experience` from a tiny pre-paint script
  in the root layout, and keep it in sync with `ExperienceTheme` on navigation.
- Define token colours in `tailwind.config.ts` as
  `rgb(var(--token-rgb) / <alpha-value>)`.
- Provide dark defaults on `:root` and a light override block for
  `html[data-experience="academy"]`.
- Add explicit header/footer overrides for the light surface, including the
  mobile menu panel.

## Consequences

- Shared utilities follow the theme while opacity modifiers keep working.
- No dark flash on Academy routes because the data attribute is set before
  paint.
- Adding a fourth experience means adding one variable block, not forking the
  shell.
- Hard-coded `#...` colours in Academy-specific components still need manual
  review; the token system covers shared classes, not every local value.
