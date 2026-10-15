# Connected loop — study and homepage

The scene's after specimens now have their own presentation layer: `content/scene-after-specimens.mjs` supplies consistent SVG icons, and `site/loop-scene-after.css` defines raised cards, inset fields, selected controls, structural dividers, and concentric radii. The homepage embed now shares these templates and styles with the approved single-canvas study. The original before examples, source content, and formation timing remain intact. Desktop screenshots cover all four completed screens (`artifacts/loop-polished-*.png`); mobile Planning at 390px and Forms at 320px fit without horizontal overflow. Build, 800 links, and three tests pass. Reduced-motion and forced-color styles were source-reviewed; OS emulation and 10% DevTools animation replay were not verified.

Preview `http://127.0.0.1:4187/loop-study.html`. The homepage uses the same formation in `loop-embed.html`, with the study header, introduction, and layout picker removed. It replaces the separate comparison and next-screen demos; the hero graphic remains unchanged.

Four arrangements share the same four examples:

- `?layout=spine`: a small, unboxed DS Loop animation stacked vertically between the screens (default).
- `?layout=crown`: DS Loop above two wider screens, with a connected row of foundation callouts below it.
- `?layout=bridge`: a small loop in the seam between two wide screens.
- `?layout=scene`: DS Loop and the foundations form a row above one wide canvas. Each category opens with the old UI for 800 ms, hands over to a wireframe over 180 ms, then runs the original component formation. The completed screen holds before the next category enters, on a 6.08-second cycle. This is also the approved homepage arrangement.

The one-canvas arrangement shares the existing paused clock, category navigation, and formation implementation. Reduced motion shows a static before/after pair. It reserves space for the tallest specimen, avoiding page jumps during rotation. Desktop and 390px/320px layouts, keyboard category navigation, pause/resume, formation completion, and automatic category advancement were checked.

The study now uses dark specimens throughout, including the deliberately inconsistent before screens. `loop-study-dark.css` is shared by the study and homepage embed. The dark palette restores the original `42e2943` build's quiet surfaces and readable wireframes. In the one-canvas layout, four straight source-to-screen connections replace the diagonal per-component curves. Each signal ends at the screen border and runs once for its foundation; the component outlines and staggered formation remain intact. All eight dark specimens, four completed builds, and 390px layout were checked. Build, 793 links, and three tests pass. Current screenshots: `artifacts/loop-dark-dashboard.png`, `artifacts/loop-dark-forms.png`, `artifacts/loop-dark-planning.png`, and `artifacts/loop-dark-communication.png`.

Dashboard, Forms, Planning, and Communication use the same authored content on both sides. Study-specific refinements live in `content/loop-study-specimens.mjs` and `site/loop-study-specimens.css`; the production specimen source remains separate. The study uses dark surfaces, refined hierarchy, plum accents, and distinct layouts. The homepage embed uses the same dark specimens and polished after presentation. The before examples deliberately show mismatched type, field shapes, spacing, colors, and hierarchy. The center is branded DS Loop; Meridian is explicitly identified as a fictional example design system.

The center card, phase labels, explanatory captions, playback controls, progress bar, and footer have been removed. Layout, Type, Controls, and Patterns callouts are restored beneath the loop, and highlight during formation. The top layout selector is for comparing the isolated explorations. Category tabs retain arrow-key/Home/End support.

The formation mechanics are ported from commit `42e2943`, `site/demo/saas-build.js` and `.css`, and were visually compared with that version served locally. The sequence begins with visible wireframes over a grid. Signals travel from the matching foundation to each destination; outlines trace before surfaces and components fill in. Completed parts remain while later parts are still wireframes. Fields, cards, discussion rows, and chart strokes have their own staggered assembly. Descriptions and dashboard rows participate too, so content is not left floating ahead of its phase.

The animation starts with Dashboard on entering view, then automatically cycles Forms → Planning → Communication → Dashboard. Phase starts are 180 / 850 / 1500 / 2200 ms (Layout / Type / Controls / Patterns). Component formation completes around 3.2 seconds; the return signal completes at 3.8 seconds; the cycle advances at 5.1 seconds. This preserves distinct construction stages rather than compressing all the work into one reveal. The 220 ms inspection scan remains quick and the infinity signal moves continuously across category changes.

Selecting a tab restarts the sequence from that category and keeps automatic rotation enabled. The infinity graphic itself is a keyboard-accessible pause/resume button, without adding a playback bar. The cycle clock and visual animations pause together offscreen, while the document is hidden, or when manually paused. Reduced-motion users get a static screen with manual category navigation. Completed finite animation objects are released after formation; the loop and cycle clock continue. Automated updates do not generate live-region announcements.

Regenerate both HTML pages with `node scripts/build-loop-study.mjs`, also included in `npm run build`. Presentation and behavior live in `site/loop-study.css` and `site/loop-study.js`; `site/loop-embed.css` handles embedding. The embedded animation observes its iframe in the parent viewport so it starts on entry and pauses offscreen. Without JavaScript the default Dashboard comparison remains visible.

The Wideset product section informed the category navigation and broad showcase. The loop represents repeated team-and-agent investigation, agreed changes, verification, and retained guidance; the examples do not claim automatic repair or learning.

Homepage single-canvas integration: the approved scene replaces the earlier wide comparison inside the existing page grid. DS Loop and its foundations sit above one canvas; the dark before screen hands off to the original staged formation and automatic category rotation. Desktop and 390px page/iframe widths were checked without horizontal overflow; completed formation and automatic advancement were verified in the homepage. Build, 800 local links, and all three tests pass. Screenshot: `artifacts/homepage-one-canvas.png`.

Earlier homepage integration: primary CTAs now use the style guide's shared Ember gradient. Supporting panels and the closing section use restrained aubergine, with lilac emphasis. Desktop formation and automatic advancement were verified inside the embed, along with offscreen suspension. The page and iframe fit at 390px and 320px without horizontal overflow. Build, 788 local links, three tests, and syntax/whitespace checks pass. Screenshot: `artifacts/homepage-integrated-loop.png`.

## Verification — October 15 refinement

Reviewed all three desktop compositions and all four categories. Arrow-key navigation updates selection, focus, and the labelled panel. Verified animation completion in the browser and clean console output. At 390px, Forms and Planning do not overflow; at 320px, Communication does not overflow (document client and scroll widths match). Reduced-motion handling is source-reviewed, not OS-tested.

`npm run build`, `npm run check` (784 links), and all three website tests pass. Script syntax and whitespace checks pass.

Latest screenshots: `artifacts/loop-foundations-between.png`, `artifacts/loop-foundations-above.png`. Both layouts verified at 320px without horizontal overflow; all four before/after categories visually reviewed.


Continuous playback verified through Forms → Planning → Communication → Dashboard without manual tab changes. Each transition enters the formation phase. Also verified manual category selection followed by automatic advancement, pause/resume, and no browser console errors. Latest screenshot: `artifacts/loop-continuous-sequence.png`.


Restoration verification: observed the original Git animation in a temporary local preview; inspected early wireframes and intermediate assembly states; confirmed all parts reach `done` in all four categories before automatic wraparound. Pause/resume and console checks passed. Build, 784 links, three tests, and syntax/whitespace checks pass. Restoration screenshots: `artifacts/loop-restored-wireframe.png`, `artifacts/loop-restored-assembly.png`.
