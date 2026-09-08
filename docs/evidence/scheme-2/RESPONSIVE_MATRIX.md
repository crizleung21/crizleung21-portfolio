# Scheme 2 — Responsive Matrix

| Field | Recorded value |
|---|---|
| Code Candidate | `220901809ad485ad64db9139692d1994a076e918` |
| Evidence date | `2026-09-01` |
| Static responsive-contract inspection | `PASS` |
| Actual viewport rendering | `BLOCKED` |
| Publication impact | Release-blocking |

## BLUF

The Candidate contains explicit mobile, tablet, desktop, constrained-landscape, hover-capability, Reduced Motion, and forced-colour rules. Actual rendering at the required viewport matrix could not be executed.

No local browser payload is installed. The controlled cloud browser refused both localhost and data URLs under its URL security policy, so it could not access the local Candidate. Every actual render result below is therefore `BLOCKED`, not inferred from CSS.

## Required viewport matrix

| Viewport | Target composition | Actual render | Horizontal overflow | Header/control collision | Stage close/scroll | Result |
|---:|---|---|---|---|---|---|
| 320×568 | Small mobile, single-column | Not executed | Not observed | Not observed | Not observed | `BLOCKED` |
| 375×667 | Mobile | Not executed | Not observed | Not observed | Not observed | `BLOCKED` |
| 390×844 | Mobile reference | Not executed | Not observed | Not observed | Not observed | `BLOCKED` |
| 844×390 | Constrained mobile landscape | Not executed | Not observed | Not observed | Not observed | `BLOCKED` |
| 768×1024 | Tablet portrait | Not executed | Not observed | Not observed | Not observed | `BLOCKED` |
| 940×900 | Collision-risk intermediate width | Not executed | Not observed | Not observed | Not observed | `BLOCKED` |
| 1024×768 | Tablet landscape | Not executed | Not observed | Not observed | Not observed | `BLOCKED` |
| 1280×720 | Small desktop | Not executed | Not observed | Not observed | Not observed | `BLOCKED` |
| 1366×768 | Desktop reference | Not executed | Not observed | Not observed | Not observed | `BLOCKED` |
| 1440×900 | Primary visual reference | Not executed | Not observed | Not observed | Not observed | `BLOCKED` |
| 1920×1080 | Large desktop | Not executed | Not observed | Not observed | Not observed | `BLOCKED` |

## Static responsive-contract evidence

| Contract | Result | Source evidence |
|---|---|---|
| Default narrow layout | `PASS` — static | Archive rail defaults to `display: none`; content uses bounded gutters and `min-width: 0`. |
| 560px composition | `PASS` — static | Header remains a compact 64px-or-less composition; static-project grid, timeline, and footer receive dedicated layout rules. |
| 720px composition | `PASS` — static | Section headings, capability route, capability grid, process route, and About columns recompose. |
| 768–1199px composition | `PASS` — static | Vertical rail is replaced by a horizontal sticky index; Site Header offset and scroll margins are explicit. |
| 900px composition | `PASS` — static | Hero remains stacked through 1199px; Archive, capability, experience, and Stage gain bounded multi-column layouts without the five-column Project metadata row. |
| 1200px+ composition | `PASS` — static | Full vertical Archive Rail, two-column Hero, and two-column Active Preview are enabled only at large desktop width. |
| 1440px+ composition | `PASS` — static | The full five-column Project index metadata row appears only where sufficient width exists. |
| Small-mobile actions | `PASS` — static | Hero/About actions become full-width; Stage footer becomes two columns. |
| Constrained landscape | `PASS` — static | Stage uses a 4px inset, compact headers, contained media, and independently scrollable content. |
| Stage safe-area hardening | `PASS` — static | Header/Footer padding includes `env(safe-area-inset-*)` fallbacks while preserving 44px controls. |
| Touch target declarations | `PASS` — static | Major controls declare at least 44×44 CSS px. |
| Hover isolation | `PASS` — static | Hover enhancement is scoped to `(hover: hover) and (pointer: fine)`. |
| Stage media containment | `PASS` — static | Constrained landscape uses `object-fit: contain`. |

Static CSS presence does not prove that the resulting browser layout has no overflow, collision, clipping, or inaccessible control.

## Required browser follow-up

At each viewport, capture and record:

1. Initial page render and full-page horizontal overflow measurement.
2. Header, filter, rail, Project Trigger, and Project Stage control positions.
3. Long title, role, tag, and 200% text-zoom behavior.
4. Project Stage open state, internal scroll, Close visibility, Previous/Next boundaries, and orientation change.
5. Touch emulation with no hover dependency.
6. Console and page-error output.
7. A 1440×900 visual comparison against the approved Scheme 2 baseline.

Until every required viewport has an observed result, AC-07 and the responsive portion of AC-11 remain `BLOCKED`.
