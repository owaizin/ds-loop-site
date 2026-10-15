# Design System Loop website

Public website: https://design-system-loop.vercel.app

Design System Loop helps teams build and improve their design system with a coding agent: use evidence, preserve legitimate choices, implement agreed work, and leave a verified handoff. The homepage is written for product teams without dedicated design-system capacity.

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

## Website style guide

Open [the website style guide](site/style-guide.html) locally at http://127.0.0.1:4187/style-guide.html, or use **Go deeper → Website style guide** in the homepage footer. It covers foundations, typography, layout, shared HTML/CSS components, illustration, motion, and usage vocabulary.

The page loads the production homepage stylesheet cascade; color swatches consume existing custom properties and show their resolved values. `site/style-guide.css` owns only reference-page composition. `site/style-guide.js` updates displayed token values and the section indicator; `site/app.js` supplies the existing copy behavior. Component examples use production classes, not a parallel library. Example code assumes the `.visual-home` context and the same stylesheet order.

When changing shared styles, update the corresponding usage notes in `site/style-guide.html` and `DESIGN.md`, then inspect the reference and the affected live page. Do not move illustration or sample-product colors into the website palette. The guide is handwritten website content and is not generated into `site/guide/`.

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
- `content/product-demos.mjs` and `scripts/build-product-demos.mjs`: shared specimen content and generated comparison/assembly HTML. `npm run build` regenerates the demo pages; presentation and behavior live in `site/demo/product-specimens.css`, `saas-compact.*`, and `saas-build.*`.
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

## Worked delivery evidence

The homepage keeps the approved spectral artwork and product demonstrations. Its report walkthrough links to `site/worked-example.html` and the public synthetic fixture in `site/samples/theme-delivery/`. Reproduce its source and token-only audit checks with `node scripts/verify-theme-delivery.mjs /path/to/ds-loop` using the 0.4.0 source checkout. Browser observations and limits are recorded separately in the fixture handoff.

## Ember glass color study

Preview `style-guide.html#ember-study` for the CTA comparison and `index.html?theme=ember` for the homepage variant. The homepage variant is URL-scoped; it does not persist a global preference. The report walkthrough, worked example, and standalone report samples use the shared Ember foundations.

The source is `ds-loop/src/core/ember-theme.ts`. It is inlined by both report renderers so generated reports remain standalone. After changing that source, refresh the website from this repository:

```sh
node --experimental-strip-types scripts/sync-report-theme.mjs /path/to/ds-loop
```

This writes `site/ember-tokens.css` and replaces only the marked theme style in the two public report samples. Their historical evidence stays intact. `site/ember.css` owns website composition and `site/theme-variant.js` selects the URL variant. Normal builds use checked-in assets and do not require the sibling checkout. These local engine changes need a package release before npm users receive them.
