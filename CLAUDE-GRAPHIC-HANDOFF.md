# Claude handoff — homepage formation graphic

## Latest refinement

The enclosure now extends across the entire system row. DS Loop sits in the center with its name beneath the infinity symbol; two foundation items sit on either side (two rows around the center on mobile). The separate panel caption/tagline is hidden, and the “Meridian · fictional design system” annotation above the screen was removed at the user’s request. The example app still uses the Meridian brand. Straight signals now originate at the enclosure’s bottom edge. Desktop surrounding spacing is about 50px shorter while retaining stable screen height across categories. This supersedes the side-by-side loop/panel arrangement described below.

The user requested clearer system callouts after this handoff was written. The scene now groups Layout (Grid & spacing), Foundations (Color & type), Components (Inputs & actions), and Patterns (Flows & states) inside one aubergine “Shared design system” panel. Individual underlines and Unicode glyphs were replaced with a shared enclosure and consistent SVG icons. The existing shell/type/controls/patterns data keys, timings, and straight routes are unchanged. Markup lives in `scripts/build-loop-study.mjs`, styling at the end of `site/loop-scene.css`; both generated pages were rebuilt. Preserve this newer direction.

## Task and scope

Improve the visual quality and animation of the homepage's **“Use the same foundations across your screens”** graphic. The user is handing this work to Claude because the formation animation is the core of the experience and needs more craft. Work on this graphic, not a homepage redesign or copy rewrite. This brief records the approved direction; it does not prescribe a new visual solution.

**Actual website repo:** `/Users/owais/Documents/GitHub/ds-loop-site` (not the sibling `ds-loop` engine repo).

- Homepage integration: http://127.0.0.1:4187/index.html#system-example
- Isolated version: http://127.0.0.1:4187/loop-study.html?layout=scene
- Actual homepage iframe: http://127.0.0.1:4187/loop-embed.html
- Brand reference: http://127.0.0.1:4187/style-guide.html

The server was running on port 4187 at handoff. `npm run dev` starts the site's server if needed. Read local AGENTS.md. There are many existing modified/untracked files from approved work and another copy-editing chat: preserve them, do not reset or bulk overwrite. No new commit or deployment is requested by this handoff.

## User decisions to preserve

- One wide canvas, with the **DS Loop + infinity symbol + Layout / Type / Controls / Patterns** row above it. Before shows first, then the after screen builds in that same space. This scene is now integrated into the homepage.
- **Dark mode throughout.** Light specimens felt disconnected from the website. Orange, purple, aubergine and restrained glass effects belong to the brand; use the style guide.
- Before must look visibly inconsistent and awkward; after must look sophisticated. Keep the same underlying job/content so the improvement is meaningful.
- Four genuinely different screens: Dashboard, Forms, Planning, Communication. Do not turn them all into the same generic SaaS sidebar/list layout.
- **The after screen must visibly assemble from a wireframe, piece by piece.** Traced outlines, then surfaces and real components, accumulating in a clear sequence. A fade-in, blanket wipe, or subtle shimmer is not a replacement. The user repeatedly emphasized that the original formation is the “core and soul.”
- Automatically loop all four tabs, building each screen. Users should not have to drag a comparison slider or manually advance to understand it. Snappy pacing; no long scan or wait.
- Four restrained straight foundation-to-screen signals. No random diagonal circuits or “raining” pulses.
- Keep the useful foundation callouts. Avoid extra badges, captions, bottom control bars, and an enclosing rectangle around DS Loop. The infinity graphic itself provides pause/resume.
- **DS Loop is the product. Meridian is only a fictional example design system.** Do not label the central engine Meridian.
- Latest homepage change: ruler ticks/numbers are hidden; grid lines remain. Ruler code is retained for reuse. Do not reintroduce homepage rulers.

## Read these files first

| File | Responsibility |
| --- | --- |
| `site/loop-study.js` | Shared animation controller for study and homepage: timeline, wireframes, routes, tab cycling, pause/visibility, measuring |
| `site/loop-scene.css` | Approved single-canvas layout, before/after overlay, DS Loop row, mobile layout, reduced-motion pair |
| `site/loop-scene-after.css` | Latest polished dark after surfaces, controls, radii, borders, icons, formation-state styling |
| `site/loop-study.css` | Shared foundation/loop visuals, animation layers and draft/built/done states |
| `site/loop-study-dark.css` | Dark treatment for both intentionally poor before and improved after |
| `content/loop-study-specimens.mjs` | Authored screen markup for the four examples |
| `content/scene-after-specimens.mjs` | Scene-specific after polish, including consistent SVG icons |
| `scripts/build-loop-study.mjs` | Generates BOTH study HTML and homepage iframe HTML, including all templates |

Supporting files when needed:

- `site/loop-study-specimens.css` and `site/demo/product-specimens.css`: lower-level specimen layout/base styles.
- `site/loop-embed.css`: iframe-only sizing and padding.
- `site/homepage-polish.css`: host graphic width (1040px max), surrounding spacing, and homepage-only ruler hiding.
- `site/homepage-loop.js`: parent iframe auto-height via ResizeObserver. This is the active homepage script; several older similarly named files exist.
- `site/index.html`: `#system-example` contains iframe `#connected-loop`, `src="loop-embed.html"`, `data-specimen-frame`.
- `site/ember-tokens.css`, `site/style-guide.html`: brand tokens/reference.

**Generated files:** `site/loop-study.html` and `site/loop-embed.html`. Edit the generator/content/styles, then run `node scripts/build-loop-study.mjs`. Hand edits to generated HTML will be lost.

Styles load in this order: product-specimens → loop-study-specimens → loop-study → loop-scene → loop-study-dark → loop-scene-after → loop-embed (embed only). Check the cascade before adding another override. The embed forces `data-layout="scene"`; standalone defaults to an older layout unless you use `?layout=scene`. The active scene uses templates `scene-after-{category}` rather than the older `after-{category}` templates. Category keys are `dashboard`, `form`, `board`, `review`.

## Original animation reference — inspect this, don't guess

Git commit **`42e2943`** (“Restore guide blueprint header and save website design work”) contains the original formation that the user loved:

```sh
git show 42e2943:site/demo/saas-build.js
git show 42e2943:site/demo/saas-build.css
git show 42e2943:site/demo/saas-build.html
```

Current formation was ported from those files. The current working-tree `site/demo/saas-build.*` has also changed, so use `git show` for the actual historical reference. Inspect/copy into a temporary preview if useful; do not check out old files over the current work. No verified deployed URL is needed for this reference.

## Current mechanics and timing

All motion uses Web Animations API plus a requestAnimationFrame status/state loop, with one shared paused clock.

1. Old screen visible for 800ms; inspection scan runs 580–800ms.
2. 180ms before/after handoff; scene build lead = 980ms.
3. Relative to that lead, phases start: Layout 180ms, Type 850ms, Controls 1500ms, Patterns 2200ms.
4. Each `[data-part]` gets `.study-wire` and `.study-outline`; same-phase parts stagger 70ms. Outlines trace for 700ms, child content reveals for 450ms with 65ms stagger. Nested cards/rows and chart strokes have their own assembly.
5. Scene route signals run 400ms. `measureRoutes()` deduplicates by foundation and uses straight `M x y V landing` paths ending at the screen frame.
6. `settle()` runs at lead + 3800ms. Complete screen holds until total cycle 6080ms, then selects the next tab.
7. Infinity signal runs continuously at 1200ms per lap. Manual tab selection restarts the build and continues auto rotation.

Key functions: `prepare`, `measureRoutes`, `reserveScenes`, `build`, `tick`, `settle`, `select`, `sync`. Guard generation counters when cancelling animations; stale finished promises must not settle the next screen.

Offscreen/document-hidden/manual-pause all suspend playback. The iframe observes itself in the **parent viewport**, so it should begin only when the user reaches the graphic. Reduced motion renders a static before/after pair with manual tabs. Tabs support arrow keys/Home/End. Automatic statuses are not live announcements.

## Areas worth examining (not all confirmed bugs)

- Fixed stage height reserves the tallest of all specimens to avoid page jumps. This can leave excess blank area on shorter screens, especially mobile. Improve composition without causing layout shifts every six seconds.
- Judge the build in motion, not only the final screenshot: make wireframe, outline, surface, and content stages legible and connected to the foundation row.
- `tick()` assigns draft/built on every frame while finished promises assign done; inspect their interaction if styles snap or completed parts regress.
- The final hold is about 1.3 seconds. Balance clear comprehension with the user's strong request for speed.
- The hidden return animation still determines when `settle()` fires; scene CSS hides `.feedback-route`. Understand that dependency before changing/removing it.
- Do not accidentally polish the before to look as good as after. Keep dark-mode legibility while making inconsistency obvious.

## Verification and finish

Work in the isolated scene first, then verify the actual homepage iframe; they share the renderer, but have different sizing and visibility behavior. Check all four builds, auto wraparound, manual tab selection, pause/resume, scroll-out suspension, and return-to-view playback. Check desktop plus 390px/320px widths, clipping, stable height, reduced motion, and console errors.

```sh
npm run build
npm run check
npm test
git diff --check
```

At handoff: build passed, **802 local links** verified, all **3 tests** passed. Desktop and 390px integration fit without horizontal overflow; formation completion and automatic advancement were observed. OS-level reduced-motion/forced-colors and slow DevTools animation replay have NOT been verified. Existing tests cover site/document generation, not animation quality; real browser review is essential.

Useful screenshots in `artifacts/`: `homepage-one-canvas.png`, `homepage-without-rulers.png`, `loop-restored-wireframe.png`, `loop-restored-assembly.png`, and `loop-polished-{dashboard,forms,planning,communication}.png`. Screenshots are reference states, not motion proof. `LOOP-STUDY.md` has additional history if needed; start with this brief instead.

Deliver the improvement, a clear account of what changed, and a screenshot/preview. Preserve unrelated homepage content, hero animation, and guide pages. If later asked to commit, run `git identity` first and follow the shared identity policy.
