# Scheme 2 — Performance Budget

| Field | Recorded value |
|---|---|
| Code Candidate | `220901809ad485ad64db9139692d1994a076e918` |
| Evidence date | `2026-09-01` |
| Public directory | 368K by `du -sh`; 303,929 file bytes |
| Hero mode | Poster-only fallback |
| Deployed video bytes | 0 |
| Static media-budget result | `PASS` |
| Runtime performance result | `BLOCKED` |

## BLUF

The Candidate replaces the former 34-second, 9.86MB audiovisual Hero with extremely small desktop and mobile AVIF/WebP posters. No video or third-party player is deployed, so video duration, audio-stream, Range Request, Pause control, and autoplay criteria are not applicable to this poster-only Candidate.

Static size and dimension budgets pass. Runtime network waterfalls, layout-shift measurements, and rendered loading behavior remain `BLOCKED` because no browser can load the local Candidate.

## Public payload snapshot

| Asset group | Observed bytes |
|---|---:|
| Entire `public/` file tree | 303,929 |
| CV PDF | 158,320 |
| CSS | 41,923 |
| Main JavaScript | 31,861 |
| HTML | 22,084 |
| Project data JavaScript | 13,856 |
| Desktop Hero AVIF/WebP | 695 / 5,770 |
| Mobile Hero AVIF/WebP | 1,116 / 4,800 |
| Four Project SVG posters combined | 4,275 |

Filesystem allocation reported by `du -sh public` is `368K`.

## Hero budget

| Candidate asset | Planned budget | Observed | Result |
|---|---:|---:|---|
| Desktop Hero AVIF | ≤200KB poster target | 695 bytes; 1600×900 | `PASS` |
| Desktop Hero WebP | ≤200KB poster target | 5,770 bytes; 1600×900 | `PASS` |
| Mobile Hero AVIF | ≤120KB poster target | 1,116 bytes; 900×1200 | `PASS` |
| Mobile Hero WebP | ≤120KB poster target | 4,800 bytes; 900×1200 | `PASS` |
| Desktop Hero video | Poster-only fallback selected | Not deployed | `N/A` |
| Mobile Hero video | Poster-only fallback selected | Not deployed | `N/A` |

## Delivery behavior

| Criterion | Result | Evidence or limitation |
|---|---|---|
| Poster visible without video | `PASS` — static | Hero is a semantic `<picture>` with an image fallback. |
| Explicit media dimensions | `PASS` — static | Desktop and mobile `<source>` variants declare their actual 1600×900 and 900×1200 dimensions. |
| No autoplay | `PASS` — static | No deployed video element or source exists. |
| No audio stream | `PASS` — static | No deployed media container exists. |
| No video preload | `PASS` — static | No deployed video exists. |
| No third-party player on first load | `PASS` — static | Initial HTML/data contains no external player URL or iframe. |
| Byte Range support | `N/A` | No deployed video; Python local server is not used as evidence of Production Range behavior. |
| Pause/Play control | `N/A` | Poster-only Hero has no motion to pause. |
| Reduced Motion/Save-Data avoids video | `PASS` — static | Candidate has no video in any preference mode. |
| Runtime request waterfall | `BLOCKED` | No executable browser. |
| Cumulative Layout Shift | `BLOCKED` | Explicit dimensions reduce risk, but no rendered CLS measurement was executed. |
| Stage close stops media | `N/A` for current records | All four records are still-image demos. |

## Archived source comparison

The removed Production Hero candidate remains at `docs/archive/legacy-public/hero-reel-loop.mp4`:

| Field | Archived value |
|---|---|
| Size | 9,856,906 bytes |
| Duration | 34.000 seconds |
| Dimensions | 1920×1080 |
| Streams | H.264 video + AAC audio |

It is not requested by the new Homepage and is not part of `public/`.

## Future motion-media gate

Adding Hero or Project video later requires a new AC-10 check covering duration, exact bytes, video-only streams, poster-first loading, user-visible Pause, Reduced Motion, Save-Data, Range/bounded delivery, runtime request behavior, and stop/reset behavior.
