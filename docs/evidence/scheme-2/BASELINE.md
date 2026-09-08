# Scheme 2 Implementation Baseline

| Field | Recorded value |
|---|---|
| Repository | `crizleung21/crizleung21-portfolio` |
| Remote | `origin` → `https://github.com/crizleung21/crizleung21-portfolio.git` |
| Baseline branch | `main` |
| Baseline commit | `719c4f1d53bc86496cdee61fd849178aaac6c388` |
| Baseline commit message | `Add video archive filter and modal interactions` |
| Baseline commit date | `2026-06-02T17:28:19+08:00` |
| Upstream state | `main` matched `origin/main` (`+0 / -0`) |
| Implementation branch | `codex/scheme-2-kinetic-signal-archive` |
| Baseline worktree | Clean before implementation |
| Existing user changes | None detected |
| Repository snapshot | Shallow/grafted clone at the exact baseline commit |
| Evidence date | `2026-09-01` |

## Baseline commands

The following read-only commands established the implementation baseline:

```bash
git status --short --branch
git branch --show-current
git rev-parse HEAD
git status --porcelain=v2 --branch
git remote -v
```

Observed before implementation:

```text
Branch: main
HEAD: 719c4f1d53bc86496cdee61fd849178aaac6c388
Upstream: origin/main
Ahead/behind: +0/-0
Tracked changes: none
Staged changes: none
Untracked files: none
```

Local implementation proceeds on `codex/scheme-2-kinetic-signal-archive`. The branch begins at the exact recorded baseline SHA.

## Scope and safety record

- WP-00 and WP-01 establish the execution baseline and make `public/` the documented production source of truth.
- Root-level `index.html` and `style.css` remain intact as non-production legacy files.
- Known placeholder routes are moved out of `public/` with Git history preserved; they are not deleted.
- No pre-existing user changes required preservation or reconciliation.
- No remote branch, Pull Request, preview, Production deployment, tag, release, history rewrite, or destructive cleanup is authorized by this local implementation.
- No remote mutation occurred while establishing this baseline.

## External action stop

Implementation and local validation must stop before any push, Pull Request action, preview publication, or Production deployment. Each external action requires separate explicit authorization tied to the reviewed candidate SHA.
