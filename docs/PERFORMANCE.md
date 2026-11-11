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
| `/` | 96 | 0 | 530 | 32 | 849 |
| `/academy` | 72 | 0 | 42 | 36 | 768 |
| `/academy/lessons/our-neighbor-the-moon` | 80 | 0 | 283 | 40 | 510 |
| `/academy/play` | 60 | 0 | 41 | 34 | 488 |
| `/academy/play/rocket` | 60 | 0 | 90 | 40 | 511 |
| `/academy/play/moon` | 76 | 0 | 48 | 41 | 514 |
| `/academy/play/rover` | 56 | 0 | 97 | 40 | 601 |
| `/museum` | 80 | 0 | 713 | 55 | 1691 |
| `/museum/apollo-11-lm-descent-stage` | 72 | 0 | 168 | 29 | 873 |
| `/explorer` | 76 | 0 | 64 | 27 | 537 |
| `/explorer/solar-system` | 60 | 0 | 39 | 35 | 451 |
| `/search?q=apollo` | 60 | 0 | 68 | 33 | 502 |
| `/sources` | 72 | 0 | 21 | 22 | 1633 |

`CLS` was 0 on every route in this run. LCP ranged from **56 ms to 96 ms**.

The `/explorer/solar-system` and `/academy/play/*` figures describe the initial
page. WebGL support was not forced in the probe, so the lazy `three` chunks were
not part of these measurements; the numbers do not represent the cost of
downloading and initialising a 3D scene. Run-to-run variance on the same machine
is expected — an earlier run on the same day measured `/` at 108 ms and
`/museum/apollo-11-lm-descent-stage` at 56 ms.

These values are not comparable to a Lighthouse score or to field data from a
deployed site. They show that the local production build paints quickly and does
not shift layout, on this machine, in this browser, with no throttling.
