# Scheme 2 — Accessibility Checklist

| Field | Recorded value |
|---|---|
| Code Candidate | `220901809ad485ad64db9139692d1994a076e918` |
| Evidence date | `2026-09-01` |
| Static semantics and preference branches | `PASS` |
| Actual keyboard/focus/touch/browser testing | `BLOCKED` |
| Publication impact | Release-blocking |

## BLUF

The source contains the intended semantic, focus-style, Dialog, No-JavaScript, Reduced Motion, Save-Data, and touch-target contracts. Actual assistive interaction cannot be certified without a real browser. The controlled cloud browser rejected localhost and data URLs, and no local Playwright browser payload is installed.

## Static source checks

| Requirement | Result | Evidence |
|---|---|---|
| Skip link | `PASS` — static | First interactive element links to `#main-content`; the Main target has `tabindex="-1"` for reliable programmatic focus. |
| Landmark structure | `PASS` — static | Header, navigation, Main, sections, and Footer are present. |
| Heading structure | `PASS` — static | One H1; section headings are encoded in the HTML. |
| Image alternatives | `PASS` — static | No image lacks `alt`; decorative Hero image uses empty alt and has a captioned Figure. |
| Traditional Chinese language-of-parts | `PASS` — static | Chinese static project titles use `lang="zh-Hant"`; the renderer also applies it to dynamic titles. |
| Project filters | `PASS` — static | Filters are Buttons with `aria-pressed`. |
| Result announcement | `PASS` — static | Project status uses polite, atomic live-region semantics. |
| Dialog semantics | `PASS` — static | Native `<dialog>` has labelled title and summary references. |
| Project trigger semantics | `PASS` — static | Buttons declare Dialog intent and target with `aria-haspopup`/`aria-controls`. |
| Focus-visible style | `PASS` — static | Explicit `:focus-visible` styling is present. |
| Declared palette contrast | `PASS` — static calculation | Muted light text on paper is 6.20:1; muted dark text on panel is 9.46:1; standard signal on white is 5.41:1; bright signal on raised dark panel is 5.01:1. |
| Major touch-target size | `PASS` — static | Major controls declare at least 44×44 CSS px. |
| Hover dependency guard | `PASS` — static | Hover-only enhancement is limited to fine-pointer devices. |
| Reduced Motion CSS | `PASS` — static | Media query and `.is-reduced-motion` fallback suppress animation, transition, and smooth scrolling. |
| Reduced Motion JS branch | `PASS` — static | Script observes `prefers-reduced-motion` and updates preference state. |
| Save-Data branch | `PASS` — static | Script reads `navigator.connection?.saveData`; current poster-only Candidate makes no video request. |
| No-JavaScript core content | `PASS` — static | Identity, work snapshots, capabilities, process, About, Contact, and Footer exist in source HTML. Enhancement UI appears only after successful module initialization. |
| No disabled/fake Project CTA | `PASS` — static | All Project links are null and the Stage actions container is hidden when no valid link exists. |
| Forced-colour support | `PASS` — static | A `forced-colors: active` branch preserves selected/action state boundaries. |

## Actual interaction checklist

| Journey or behavior | Result | Reason |
|---|---|---|
| Skip → Work → Stage → Previous/Next → Close → Contact | `BLOCKED` | No executable browser. |
| Enter and Space open Project Stage | `BLOCKED` | No executable browser. |
| Escape closes Stage | `BLOCKED` | No executable browser. |
| Backdrop closes Stage | `BLOCKED` | No executable browser. |
| Browser Back closes/deep-links Stage correctly | `BLOCKED` | No executable browser. |
| Focus enters the Stage | `BLOCKED` | Static code exists; runtime focus was not observed. |
| Focus remains out of background content | `BLOCKED` | Static code exists; runtime containment was not observed. |
| Focus restores to exact trigger | `BLOCKED` | Static code exists; runtime restoration was not observed. |
| Rapid repeated input does not duplicate Dialog/scroll lock | `BLOCKED` | No executable browser. |
| Touch-only access | `BLOCKED` | No touch-emulation browser. |
| Reduced Motion behavior | `BLOCKED` | Static branches exist; computed/runtime behavior was not observed. |
| Save-Data behavior | `BLOCKED` | Poster-only source is safe; actual browser preference path was not observed. |
| Disabled-JavaScript browser rendering | `BLOCKED` | Static fallback exists; browser rendering was not observed. |
| 200% text zoom | `BLOCKED` | No executable browser. |
| 320 CSS px reflow | `BLOCKED` | No executable browser. |
| Computed colour contrast | `BLOCKED` | No rendered/computed-style inspection was available. |
| Browser console/page errors | `BLOCKED` | No executable browser. |
| Screen-reader announcement quality | `BLOCKED` | No assistive-technology test was executed. |

## Media accessibility state

- Current Project records use still images only; they have no spoken content.
- Current Project records therefore have no active Caption or Transcript requirement.
- Any future spoken video must provide and verify Caption/Transcript state before publication.
- No Project Play control is rendered in the current Candidate.

## Gate decision

Static evidence supports implementation review but does not satisfy the runtime portions of AC-06, AC-07, AC-08, AC-09, or AC-11. Publication remains `NO_GO` until the blocked paths are executed and pass in a browser-capable environment.
