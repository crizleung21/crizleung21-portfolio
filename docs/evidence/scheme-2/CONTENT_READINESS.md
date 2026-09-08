# Scheme 2 — Content Readiness

| Field | Recorded value |
|---|---|
| Code Candidate | `220901809ad485ad64db9139692d1994a076e918` |
| Evidence date | `2026-09-01` |
| Rendered records | 4 |
| Demo records | 4 |
| Published records | 0 |
| Archived records | 0 |
| Production content gate | `FAIL` |

## BLUF

All four records pass the deliberately limited local Demo Gate. They reuse only title, category, and role metadata already tracked in the repository, use `Undated` rather than inventing a year, and pair that metadata with new abstract title-card posters. They contain no client label, outcome, external link, case-study link, embed, video preview, or playable-media claim.

They do not pass the Production content gate. There is no `published` record, no approved playable media or destination URL, and no complete Challenge/Decision/Deliverable/Outcome/Credits evidence package.

## Record inventory

| Slug | Title | Category | Confirmed role metadata | Date label | Poster | Status |
|---|---|---|---|---|---|---|
| `zhen-ti-zi-ouyang-chang` | 真體字 — 歐陽昌 | Video / Interview Film | Video Editing; Color Grading | `Undated` | Original abstract SVG | `demo` |
| `you-huo-dan-xin-pian` | 有貨 — 擔心篇 | Video / Micro Film | Video Editing; Color Grading | `Undated` | Original abstract SVG | `demo` |
| `downtown` | Downtown | Video / Promotional Film | Video Editing; Color Grading | `Undated` | Original abstract SVG | `demo` |
| `ogis` | OGIS | Video / Motion Graphics | Motion Graphics | `Undated` | Original abstract SVG | `demo` |

## Demo Gate

| Requirement | Result | Evidence |
|---|---|---|
| Title | `PASS` | Reused from tracked repository content. |
| Category | `PASS` | Reused from tracked repository content and normalized to the supported `video` category. |
| Role | `PASS` | Reused from tracked repository role tags. |
| Honest date label | `PASS` | Every record uses `Undated`; no year was inferred. |
| Summary | `PASS` | Minimal factual summaries are limited to the tracked category and role metadata. |
| Local poster | `PASS` | Each record points to an original abstract SVG title card under `public/assets/projects/`. |
| Meaningful alt text | `PASS` | Each title card has project-specific alt text. |
| Rights record | `PASS` — limited scope | Clearance is restricted to existing repository metadata and the new original title-card artwork. |
| Conditional CTA | `PASS` | `caseStudy` and `external` are null; no Project Stage CTA is rendered. |
| Media integrity | `PASS` | `previewSrc` and `embedSrc` are null; no Play control or playable-media claim is rendered. |
| Release evaluator | `PASS` — contract | Requires at least 3 renderable records, 2 Video records, and 1 fully gated Published record. Current result is correctly `ready: false`. |
| Input hardening | `PASS` — regression | Dense plain records, allowlisted local poster paths, verified link objects, media-specific clearance, and spoken-content declarations are enforced. |

## Rights boundary

The four records use this exact rights scope:

> Portfolio display of existing repository project metadata and original title-card artwork only; excludes client footage, logos, audio, and all third-party media.

`rights.cleared: true` must be interpreted only within that narrow scope. It is not clearance for client footage, logos, audio, external thumbnails, YouTube/Vimeo media, outcome claims, client claims, or full case-study publication.

## Deliberately omitted claims

- Client labels from the legacy page are not carried into the new records.
- No fixed production year is claimed.
- No Challenge, Outcome, Credit, or performance result is claimed.
- No external destination or case-study destination is claimed.
- No embed, preview video, client footage, logo, audio, or third-party asset is deployed.
- No record is represented as a complete case study.

## Production content gate

| Requirement | Result | Blocking condition |
|---|---|---|
| At least three genuine viewable projects | `PASS` for limited Demo Stage | Four genuine tracked project records can be viewed as poster-and-summary demos. |
| At least two Video/Post-production projects | `PASS` | All four records are Video/Post-production records. |
| Required title, role, summary, poster, alt, and bounded rights | `PASS` | Present for all four Demo records. |
| At least one `published` record | `FAIL` | Published count is zero. |
| Approved playable media or project destination | `FAIL` | No approved URL, embed, or preview exists. |
| Complete published evidence fields | `FAIL` | Challenge, decisions, deliverables, outcome, and credits are intentionally absent. |
| Broader client-media rights | `BLOCKED` | Owner/client clearance was not supplied for client footage, logos, audio, or third-party media. |

## Required future inputs

Before a record changes from `demo` to `published`, obtain and verify:

1. Approved playable media or a valid case-study/project URL, recorded with an explicit verified state.
2. Confirmed project year, Challenge, at least two Creative Decisions, Deliverable, Outcome, and Credits.
3. Explicit portfolio clearance for every client or third-party visual, logo, audio track, thumbnail, and video asset used.
4. Caption or transcript state for any meaningful spoken media.
5. Successful destination and embed health checks.

Until those inputs exist, the Demo records may support local design review only and must not be described as complete published case studies.
