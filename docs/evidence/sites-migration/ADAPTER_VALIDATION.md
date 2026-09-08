# Sites Migration — Static Adapter Validation

| Check | Result | Evidence |
|---|---|---|
| Static output directory | `PASS` | `.openai/hosting.json` selects `dist`. |
| Inventory | `PASS` | 15 files / 289,576 bytes. |
| Byte parity | `PASS` | Source and `dist` SHA-256 manifests are identical. |
| Internal document exclusion | `PASS` | `DESIGN.md` is absent from `dist`. |
| JavaScript syntax | `PASS` | `script.js` and `projects.js` pass `node --check`. |
| Project contract | `PASS` | Four records and four renderable records validate. |
| Release evaluator | `PASS` | Correctly returns `ready: false` for four Demo-only records. |
| HTML structure | `PASS` | One H1, one Main, one Dialog, unique IDs, all images have `alt`. |
| Static snapshots | `PASS` | Four Project snapshots remain in source HTML. |
| Local references | `PASS` | No missing local `href`, `src`, or `srcset` target. |
| Placeholder scan | `PASS` | No production placeholder phrase, `example.com`, or `href="#"`. |
| Secrets scan | `PASS` | No credential or private-key pattern detected in deploy source. |
| Root and query request | `PASS` | `/` and `/?project=downtown` return HTML 200. |
| Static assets and MIME | `PASS` | CSS, JS, PDF, AVIF, WebP and SVG return expected MIME types. |
| Unknown route | `PASS` | `/missing-route` returns HTTP 404. |
| Runtime/browser QA | `BLOCKED` | B1 plain static Sites has no compatible supervised agent preview. |

## Browser boundary

The user selected static fidelity after being informed that this route does not unlock WP-09 browser execution. Unexecuted viewport, keyboard, focus, touch, history, preference, console and visual checks remain `BLOCKED`, never `PASS`.

This exception applies only to the separately authorized Owner-only deployment. Public release remains `NO_GO`.

