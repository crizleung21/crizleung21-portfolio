# Criz Leung — Creative Portfolio

Personal portfolio for video post-production, multimedia design, AI visual work, and creative systems.

## Production source of truth

`public/` is the repository's only production source. Cloudflare Wrangler serves this directory through the `assets.directory` setting in `wrangler.jsonc`.

The root-level `index.html` and `style.css` are retained only as historical prototypes. They are not production files, must not be used as a deployment output directory, and should not be edited when changing the live portfolio.

```text
Production homepage: public/index.html
Production styles:   public/style.css
Production scripts:  public/script.js
Cloudflare assets:   ./public
```

## Local preview

No build step or framework is required. From the repository root, run:

```bash
python3 -m http.server 4173 -d public
```

Then open `http://localhost:4173/`. Previewing the repository root is not supported because it would serve the non-production legacy homepage.

## Cloudflare configuration

The checked-in Wrangler configuration must continue to point to `./public`:

```json
{
  "assets": {
    "directory": "./public"
  }
}
```

Changing the production directory, publishing a preview, or deploying Production requires a separate review and explicit authorization. Local implementation does not authorize a push, Pull Request, preview publication, or Production deployment.

## Legacy public routes

Known placeholder and obsolete public routes have been preserved under `docs/archive/legacy-public/`. This archive is reference material only and is intentionally outside the deployed `public/` tree.

Do not restore an archived route to `public/` unless its content, media, navigation, responsive behavior, and accessibility have passed the current release criteria.

## Validation boundaries

Before treating a local candidate as release-ready:

1. Confirm `wrangler.jsonc` still serves `./public`.
2. Confirm production navigation contains no links to archived routes.
3. Confirm `public/` contains no placeholder copy, fake calls to action, dead media controls, or the retired YouTube IDs.
4. Run the local checks and record evidence under `docs/evidence/scheme-2/`.
5. Treat every unverified external destination, project claim, CV link, and media right as blocked rather than complete.

The implementation plan's P0/P1 acceptance criteria determine whether a candidate is `PREVIEW_READY`, `PRODUCTION_READY`, or `NO_GO`. P2 roadmap work is not part of the initial implementation.
