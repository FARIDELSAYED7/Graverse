# Performance notes

GRAVERSE avoids performance claims it has not measured. This document separates
what the build reports from what a local browser probe observed.

## Build characteristics

- Every content route is statically generated. `/search` is dynamic because its
  query string is user-controlled; it still reads a static in-memory index.
- The 3D orrery is loaded with `next/dynamic` and `ssr: false`; it is not part of
  the initial route bundle and is delayed until WebGL support is confirmed.
- `three`, `@react-three/fiber` and `@react-three/drei` are isolated in the
  orrery chunk.
- The three playground scenes are separate `next/dynamic` islands. Their game
  controls, text, rewards and no-WebGL fallbacks are server-rendered HTML, so the
  3D payload is only fetched when a scene actually mounts.
- Images use `next/image` with local files, AVIF/WebP formats and explicit
  `sizes`; below-the-fold introduction images are lazy by default.
- Fonts are local (`next/font/local`) with `display: swap`.
- Server components keep data modules out of client bundles except where a
  client island explicitly imports a small helper.

The production build prints per-route First Load JS. The shared baseline in the
recorded build was **87.7 kB**. The Explorer orrery and the playground game
routes are the largest because of their lazy 3D chunks; the initial HTML and
controls do not wait for those chunks.

## Local browser probe

`scripts/perf.mjs` runs against an already-running `next start` build and records
Largest Contentful Paint, Cumulative Layout Shift, DOM size, request count and
transfer size for representative routes.

```bash
npm run build
npm run start
npm run perf
```

These are **local, unthrottled headless-Chrome** numbers. They are not Lighthouse
scores, not field data, and not a claim about a deployed CDN.

### Recorded result

Local run on 11 November 2026: macOS 26.6.2, Node 26.7.0, headless Chrome,
1366×900, no network throttling, production `next start` on port 3100, 13 routes.

| Route | LCP (ms) | CLS | Transfer (kB) | Requests | DOM nodes |
| --- | ---: | ---: | ---: | ---: | ---: |
| `/` | 108 | 0 | 646 | 37 | 752 |
| `/academy` | 64 | 0 | 132 | 36 | 782 |
| `/academy/lessons/our-neighbor-the-moon` | 72 | 0 | 380 | 42 | 494 |
| `/academy/play` | 56 | 0 | 135 | 38 | 479 |
| `/academy/play/rocket` | 56 | 0 | 143 | 41 | 504 |
| `/academy/play/moon` | 56 | 0 | 106 | 42 | 504 |
| `/academy/play/rover` | 60 | 0 | 154 | 41 | 595 |
| `/museum` | 92 | 0 | 754 | 58 | 1703 |
| `/museum/apollo-11-lm-descent-stage` | 68 | 0 | 203 | 29 | 768 |
| `/explorer` | 72 | 0 | 131 | 32 | 550 |
| `/explorer/solar-system` | 60 | 0 | 120 | 38 | 461 |
| `/search?q=apollo` | 52 | 0 | 161 | 35 | 461 |
| `/sources` | 60 | 0 | 61 | 23 | 1641 |

`CLS` was 0 on every route in this run. LCP ranged from **52 ms to 108 ms**.

The `/explorer/solar-system` and `/academy/play/*` figures describe the initial
page. WebGL support was not forced in the probe, so the lazy `three` chunks were
not part of these measurements; the numbers do not represent the cost of
downloading and initialising a 3D scene. Run-to-run variance on the same machine
is expected — an earlier run measured `/` at 116 ms and `/museum/apollo-11-lm-descent-stage`
at 56 ms.

These values are not comparable to a Lighthouse score or to field data from a
deployed site. They show that the local production build paints quickly and does
not shift layout, on this machine, in this browser, with no throttling.
