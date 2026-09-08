# Scheme 2 — Media Health

| Field | Recorded value |
|---|---|
| Code Candidate | `220901809ad485ad64db9139692d1994a076e918` |
| Evidence date | `2026-09-01` |
| Deployed video files | 0 |
| Deployed third-party embeds | 0 |
| Deployed project preview files | 0 |
| Public project posters | 4 SVG files |
| Hero delivery | Poster-only AVIF/WebP with SVG source retained locally |
| Local media-integrity result | `PASS` |

## BLUF

The Candidate uses a poster-only media path. No video, iframe, YouTube/Vimeo identifier, client footage, third-party thumbnail, or external Project CTA is deployed under `public/`. Every visible Project has a local original abstract poster and text fallback.

The former 34-second, 9.86MB Hero MP4 and all legacy pages containing invalid YouTube IDs are outside the deployed `public/` tree. They remain recoverable under `docs/archive/legacy-public/`.

## Public media inventory

### Hero posters

| Asset | Dimensions | Bytes | Format | Result |
|---|---:|---:|---|---|
| `hero-poster-desktop.avif` | 1600×900 | 695 | AVIF | `PASS` |
| `hero-poster-desktop.webp` | 1600×900 | 5,770 | WebP | `PASS` |
| `hero-poster-mobile.avif` | 900×1200 | 1,116 | AVIF | `PASS` |
| `hero-poster-mobile.webp` | 900×1200 | 4,800 | WebP | `PASS` |

The desktop and mobile SVG files are retained as editable source artwork. The deployed `<picture>` selects mobile variants below 768px and AVIF/WebP variants by browser support.

### Project posters

| Project | Local asset | Bytes |
|---|---|---:|
| 真體字 — 歐陽昌 | `assets/projects/zhen-ti-zi-ouyang-chang/poster.svg` | 954 |
| 有貨 — 擔心篇 | `assets/projects/you-huo-dan-xin-pian/poster.svg` | 881 |
| Downtown | `assets/projects/downtown/poster.svg` | 1,425 |
| OGIS | `assets/projects/ogis/poster.svg` | 1,015 |

## Project media state

All four records have:

- `media.type: "image"`;
- a valid local `poster` path;
- project-specific alt text;
- `previewSrc: null`;
- `embedSrc: null`;
- `links.caseStudy: null`;
- `links.external: null`.

Consequently, the renderer has no basis to create a video, iframe, Play state, case-study CTA, or external project CTA.

## Legacy media isolation

| Check | Result | Evidence |
|---|---|---|
| Four invalid YouTube IDs absent from `public/` | `PASS` | Forbidden-ID scan returned no match. |
| Legacy YouTube thumbnail URLs absent from deployed HTML/data | `PASS` | New records reference only local SVG posters. |
| Old Hero MP4 absent from `public/` | `PASS` | File moved to `docs/archive/legacy-public/hero-reel-loop.mp4`. |
| Legacy media remains recoverable | `PASS` | Git-aware move preserves the archived source rather than deleting it. |

Archived MP4 facts:

| Field | Observed value |
|---|---|
| Size | 9,856,906 bytes |
| Duration | 34.000 seconds |
| Video stream | H.264, 1920×1080 |
| Audio stream | AAC present |

This archived file fails the planned Hero media budget but is not part of the public Candidate.

## Request behavior

| Criterion | Result | Basis |
|---|---|---|
| No video request on initial load | `PASS` — static Candidate contract | No video file or `<video>` element is deployed. |
| No third-party request on initial load | `PASS` — static Candidate contract | Initial HTML and active records contain no third-party URL or iframe. |
| Poster-first Hero | `PASS` | Hero consists of a `<picture>` with explicit dimensions. |
| Project fallback | `PASS` | Every record has a local poster and summary. |
| Close Stage stops active media | `N/A` for current records | No current record can instantiate video or iframe media. Future media must retest this path. |
| Stale media callback guard | `PASS` — static | A per-session token prevents a rejected old video/embed callback from replacing a newer Project Stage. |
| Media error fallback | `PASS` — static contract | A current-session error restores the poster, removes the Play state, and announces unavailability. Iframe policy failures still require external smoke testing. |
| External media health | `N/A` | No external candidate is present. |
| Runtime network trace | `BLOCKED` | No executable browser payload is available. |

## Future media re-entry gate

Any future video, preview, or embed must be treated as a new media candidate and must pass URL health, rights, captions/transcript, user-initiated loading, stop/reset, error fallback, and runtime network checks before publication.
