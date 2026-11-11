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
- Images use `next/image` with local files, AVIF/WebP formats and explicit
  `sizes`; below-the-fold introduction images are lazy by default.
- Fonts are local (`next/font/local`) with `display: swap`.
- Server components keep data modules out of client bundles except where a
  client island explicitly imports a small helper.

The production build prints per-route First Load JS. The shared baseline in the
recorded build was **87.5 kB**. The orrery route is the largest because of the
lazy 3D chunk.

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
1366×900, no network throttling, production `next start` on port 3100.

| Route | LCP (ms) | CLS | Transfer (kB) | Requests | DOM nodes |
| --- | ---: | ---: | ---: | ---: | ---: |
| `/` | 128 | 0 | 638 | 35 | 753 |
| `/academy` | 52 | 0 | 109 | 30 | 608 |
| `/academy/lessons/our-neighbor-the-moon` | 68 | 0 | 337 | 31 | 462 |
| `/museum` | 76 | 0 | 751 | 53 | 1705 |
| `/museum/apollo-11-lm-descent-stage` | 372 | 0 | 201 | 27 | 768 |
| `/explorer` | 88 | 0 | 129 | 29 | 550 |
| `/explorer/solar-system` | 56 | 0 | 123 | 36 | 465 |
| `/search?q=apollo` | 72 | 0 | 169 | 32 | 461 |
| `/sources` | 64 | 0 | 59 | 21 | 1641 |

`CLS` was 0 on every route in this run. The `/explorer/solar-system` figure
describes the initial page; the lazily loaded 3D chunk is excluded from these
numbers because WebGL support was not forced in the probe.

These values are not comparable to a Lighthouse score or to field data from a
deployed site. They show that the local production build paints quickly and does
not shift layout, on this machine, in this browser, with no throttling.
