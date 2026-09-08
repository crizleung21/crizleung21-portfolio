# Scheme 2 — QA Summary

| Field | Recorded value |
|---|---|
| Code Candidate | `220901809ad485ad64db9139692d1994a076e918` on `codex/scheme-2-kinetic-signal-archive` |
| Baseline | `719c4f1d53bc86496cdee61fd849178aaac6c388` |
| Evidence date | `2026-09-01` |
| Scope | WP-09 local verification only |
| External action | None; no push, PR, preview, or Production deployment |
| Overall publication decision | `NO_GO` |

## BLUF

The Scheme 2 local implementation is complete enough for source review. All executable static, project-contract, parser, CSS-structure, no-JavaScript fallback, forbidden-content, local-reference, and local HTTP/MIME checks passed.

Publication remains `NO_GO`. This environment cannot execute a real browser, and the controlled cloud browser rejected both localhost and data URLs under its URL security policy. Actual responsive, keyboard, focus, touch, browser-history, Reduced Motion, Save-Data, zoom, console, and visual-baseline checks are therefore `BLOCKED`, not `PASS`. The Production content gate is also not met because all four records remain `demo` records and no approved playable media, external URL, or complete published case-study evidence is present.

## Status vocabulary

- `PASS`: the stated check was executed and met its bounded criterion.
- `FAIL`: the check executed and demonstrated that a criterion is not met.
- `BLOCKED`: the environment or required input prevented execution.
- `N/A`: the criterion does not apply to this poster-only candidate.

`BLOCKED` and `N/A` are never silently reclassified as `PASS`.

## Executed checks

| Check | Result | Observed evidence |
|---|---|---|
| Git patch integrity | `PASS` | `git diff --check` returned no diagnostics. |
| JavaScript syntax | `PASS` | `node --check public/script.js` and `node --check public/projects.js` exited successfully. |
| Project data contract | `PASS` | `validateProjects(PROJECTS)` returned `valid: true`; 4 records and 4 renderable records. |
| Project state policy | `PASS` | All 4 records are `demo`; no `published` or `archived` record is rendered. |
| HTML parser smoke | `PASS` | `public/index.html` parsed with zero lxml error/fatal entries. |
| HTML structural smoke | `PASS` | One H1, one Main, one Dialog, no duplicate IDs, and no image missing an `alt` attribute. |
| CSS structural smoke | `PASS` | Comment/string-aware delimiter balance passed for the 41,923-byte stylesheet. This is not formal CSS validation. |
| No-JavaScript static fallback | `PASS` | The HTML contains four static-first project snapshots with title, role, date label, summary, poster, and alt text; JS hides them only after successful initialization. |
| Static snapshot parity | `PASS` | All four static snapshot slugs, titles, roles, date labels, summaries, poster paths, and alt text match `projects.js`. |
| Adversarial data-gate regression | `PASS` | Unsafe schemes, traversal/query-only posters, unverified links/media, missing media clearance/accessibility declarations, inherited fields, sparse arrays, and incomplete Published records are rejected. |
| Production release evaluator | `PASS` | Enforces at least 3 renderable records, 2 Video records, and 1 fully gated Published record; the current Demo-only collection correctly returns `ready: false`. |
| No-JavaScript browser rendering | `BLOCKED` | No executable browser payload is available. |
| Placeholder/false-link scan | `PASS` | No Production match for placeholder phrases, `example.com`, or `href="#"`. |
| Legacy media-ID scan | `PASS` | None of the four invalid YouTube IDs occurs under `public/`. |
| Local asset-reference check | `PASS` | Every local `href`, `src`, and `srcset` referenced by `public/index.html` resolves inside `public/`. |
| Local HTTP response | `PASS` | Root page and representative CSS, JS, PDF, AVIF, WebP, and SVG assets returned HTTP 200. |
| Local MIME handling | `PASS` | Representative assets returned the expected MIME types. |
| Formal HTML5 validation | `BLOCKED` | No HTML5/W3C validator is installed; adding one belongs to the deferred P2 tooling work. |
| Formal CSS validation | `BLOCKED` | No formal CSS validator is installed; adding one belongs to the deferred P2 tooling work. |
| Wrangler dry-run | `BLOCKED` | Wrangler is not installed; P2 package/toolchain work was not introduced. |
| Browser interaction and rendering | `BLOCKED` | Local browser payloads are absent; the controlled cloud browser refused localhost and data URLs. |
| P2 scope guard | `PASS` | No framework, package manifest, lockfile, CI, validator installation, SEO program, security-header program, or deployment work was added. |

## Local HTTP observations

| Request | Status | MIME | Bytes |
|---|---:|---|---:|
| `/` | 200 | `text/html` | 22,084 |
| `/style.css` | 200 | `text/css` | 41,923 |
| `/script.js` | 200 | `text/javascript` | 31,861 |
| `/projects.js` | 200 | `text/javascript` | 13,856 |
| `/CV_ChrisLeung.pdf` | 200 | `application/pdf` | 158,320 |
| `/assets/hero/hero-poster-desktop.avif` | 200 | `image/avif` | 695 |
| `/assets/hero/hero-poster-desktop.webp` | 200 | `image/webp` | 5,770 |
| `/assets/projects/downtown/poster.svg` | 200 | `image/svg+xml` | 1,425 |

## Browser paths not executed

The following remain `BLOCKED` and are detailed in `RESPONSIVE_MATRIX.md` and `ACCESSIBILITY_CHECKLIST.md`:

1. All required viewport and orientation renders.
2. Mouse, touch, Enter, Space, Escape, backdrop, and Browser Back paths.
3. Dialog focus entry, containment, and restoration.
4. Deep link, invalid query, Previous/Next boundaries, and rapid repeated input.
5. Reduced Motion, Save-Data, disabled JavaScript, and 200% text zoom in a real browser.
6. Console and unhandled runtime-error inspection.
7. Candidate-to-Scheme-2 visual-baseline comparison.

## Candidate identity

The verified public source is fixed at Code Candidate `220901809ad485ad64db9139692d1994a076e918`. Evidence documents are committed separately so documentation-only changes do not alter that public-source identity.

## Reproduction commands

```bash
git diff --check
node --check public/script.js
node --check public/projects.js
rg -n "Coming Soon|coming soon|This page will hold|Replace this|Lorem Ipsum|example\.com|href=\"#\"" public
rg -n "n6Z3xuvFGAw|_TOEgnrCV_o|v8hw1F5kDCs|BMbxm5ZeVdk" public
python3 -m http.server 4173 -d public
```

The two `rg` commands pass by returning no match; their normal no-match exit status is `1`.
