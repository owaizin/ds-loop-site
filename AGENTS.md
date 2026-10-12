# Website ownership

This is the standalone DS Loop website. Keep the approved homepage and loop visuals intact unless the user requests design changes.

Technical documentation comes from the exact `ds-loop` dependency's `docs/guide` files. Do not hand-edit `site/guide` or copy source-preview behavior into released docs. Change technical content in the engine repository and publish a release, then run `npm run sync` here. Editorial homepage content stays here.

Before shipping, run `npm run build`, `npm run check`, and `npm test`. Commit regenerated guide files together with the dependency lockfile. Vercel's project root must be the repository root, not `site/`.

Follow the user's shared Git identity policy. This personal repository uses `owaizin`; run `git identity` before commits/pushes/PR operations and use `git company-gh` for GitHub operations.
