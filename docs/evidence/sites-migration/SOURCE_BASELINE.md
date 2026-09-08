# Sites Migration — Source Baseline

| Field | Value |
|---|---|
| Evidence date | 2026-09-08 |
| Code Candidate | `220901809ad485ad64db9139692d1994a076e918` |
| Evidence HEAD before migration evidence | `98e4ddc3c887a26fc107c99c3a3cf2aabcff8691` |
| Candidate `public/` tree OID | `31cbac147101a422f67d34209215d5fc91a3240d` |
| Candidate inventory | 16 files / 303,929 bytes |
| Deployment inventory | 15 files / 289,576 bytes |
| Deployment manifest aggregate | `a5489a09a3ca4e84f7e2f6238c842bef6a3acac5e818ba9c32d5a94438eb78dc` |
| Migration type | Static pass-through to Sites `dist/` |
| Public deployment | Not authorized; remains `NO_GO` |

## Integrity statement

The deployment payload was copied from the verified working-tree `public/` only after confirming that its Git tree is identical to Candidate `2209018`. Every deployed file is byte-identical to the corresponding Candidate file.

`public/DESIGN.md` is the sole packaging exclusion because it is an internal design document rather than a visitor-facing asset. The exclusion is explicit and does not alter the Code Candidate.

An unrelated pre-existing modification to `docs/archive/legacy-public/hero-reel-loop.mp4` was present before this evidence work. It is outside `public/`, was not inspected as migration content, was not staged, and must remain untouched.

## Authority model

- Local repository: canonical product and evidence source.
- GitHub: continuous backup and audit history; not a Sites runtime dependency.
- Sites repository: one-way deployment derivative only.
- Sites URL: owner-only first; public access remains separately gated.

