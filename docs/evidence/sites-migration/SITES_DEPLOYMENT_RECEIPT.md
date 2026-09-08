# Sites Deployment Receipt

- Migration mode: B1 exact static migration
- Source baseline: Code Candidate `220901809ad485ad64db9139692d1994a076e918`
- Sites source commit: `15f9513c6c1dce1ebf4a3467b68019274affa501`
- Saved version: `1`
- Local package SHA-256: `28253795272ac990653c057bf1c7e238ffe35a35aec52f9a31aa3e5f187bb166`
- Sites archive content hash: `sha256:aa5b78295a0c70fbd51fcd46a1357c1846f52c7fd36203fabdb841112b63535e`
- Deployment status: `succeeded`
- Access: owner-only private
- Public release gate: `NO_GO`
- Custom domain: not configured

## GitHub backup

- Branch: `backup/scheme-2-sites-snapshot`
- Snapshot commit at migration start: `2521ffdc081a678bea466c06e62c90e555d98739`
- Snapshot tree: `1d88bb0f0ea7dfbfddf1993874a083479bc39f4c`
- Verification: the snapshot tree exactly matched the local committed evidence tree.
- Limitation: GitHub CLI credentials were unavailable, so the backup uses GitHub App-created content snapshots; remote commit IDs do not mirror the local commit chain.

## QA status

- Static structure, JavaScript syntax, project data contract, local asset references,
  HTTP routes, and MIME types passed before packaging.
- WP-09 Viewport / Keyboard / Focus / History browser testing remains `BLOCKED`
  because the selected B1 plain-static Sites adapter has no compatible internal
  browser preview.
- Owner-only deployment was explicitly authorized as an exception. This receipt
  does not authorize public release.
