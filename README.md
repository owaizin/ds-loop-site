# Design System Loop website

Public website: https://design-system-loop.vercel.app

This repository owns the website, visuals, demos and deployment. The [DS Loop repository](https://github.com/owaizin/ds-loop) owns the engine, companion skill and technical documentation.

## Work locally

Use Node 22.6 or newer.

```sh
npm ci --ignore-scripts
npm run build
npm run check
npm test
npm run dev
```

Open http://127.0.0.1:4187/index.html. To use a different port, set `DS_LOOP_SITE_PORT`.

## Automatic documentation updates

1. Update `docs/guide/*.md` alongside behavior changes in **ds-loop**.
2. Publish DS Loop to npm. Those docs must be included in the package.
3. The **Sync published DS Loop release** GitHub Action checks npm's `latest` tag hourly (at minute 17; GitHub may delay schedules). Run it manually from Actions to check immediately.
4. A newer stable release updates the exact dependency and lockfile, builds `/guide/` from the packaged Markdown, runs example fixtures with the packaged CLI, and checks links and tests.
5. The action opens or updates one `automation/ds-loop-release` PR. Failed checks fail the workflow and leave production unchanged. An unchanged release creates no PR.
6. Review the diff, including whether any homepage claims need editorial updates, and merge. Vercel builds and checks main, then deploys the same public domain.

`GITHUB_TOKEN` needs contents and pull-request write permissions, and this repository must allow GitHub Actions to create pull requests. No npm publish token or cross-repository PAT is required. GitHub may disable scheduled workflows in inactive public repositories after 60 days; re-enable the workflow if that happens. Failed Actions runs are visible in Actions and use your GitHub notification preferences.

This is automatic **synchronization and validation**, with a human merge before publication. Homepage positioning and illustrations are intentionally not rewritten by the bot. Unpublished source changes do not alter released documentation. A documentation-only correction requires a package patch release to reach the published guide.

## Content ownership

- `site/index.html`, CSS, JS, assets and demos: edit here.
- `site/guide/`: generated; never edit directly. Version, npm integrity and source hashes are recorded in `release.json`.
- `scripts/build-docs.mjs`, `content/guide.css`: documentation renderer and presentation.
- `scripts/examples.mjs`: executable examples; a changed output contract fails for review.
- `archive/source-preview-0.4.0/`: preserved handwritten source-preview pages from the migration, excluded from Vercel. Not current documentation.
- Legacy guide URLs forward to the package-generated guide. Preview variants remain local.

## Deploy

Vercel project: `owaizins-projects/design-system-loop`. Root directory is this repository root; output is `site/`. Root `vercel.json` runs the build and checks. Production branch is `main`. Never deploy from inside `site/`, which would skip release validation.

Keep the package version exact. To prepare a release update locally:

```sh
npm run sync
```

For rollback, revert the website update commit (package, lockfile and generated guide together), then merge. The sync deliberately refuses an npm `latest` downgrade; investigate that manually.
