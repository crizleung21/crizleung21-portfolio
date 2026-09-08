# Sites Migration — Deployment Allowlist

## Included

```text
public/index.html
public/style.css
public/script.js
public/projects.js
public/CV_ChrisLeung.pdf
public/assets/**
```

The Sites checkout maps each included `public/<relative-path>` to `dist/<relative-path>` without changing its bytes.

## Excluded

```text
public/DESIGN.md
root legacy prototype
docs/**
README.md
wrangler.jsonc
.github/**
.git/**
```

The CV is retained for owner-only migration parity. It is not linked from the current homepage. Public release requires a separate privacy, metadata, and visible-link decision.

