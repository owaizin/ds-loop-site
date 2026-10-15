# New positioning in the established design — 12 October 2026

## Acceptance direction

The current objective is new positioning and content presented through the user's existing graphics and visual language. Restoring the old headline or old copy is not an acceptance criterion. This pass follows POSITIONING-REFRESH.md and applies the Obviously Awesome framework to the message; April Dunford did not personally audit or endorse the website.

## What changed

- Hero: “Build and improve your design system with your coding agent.” The supporting text names product teams using coding agents with limited design-system capacity and explains the plan, working components, and contributor guidance. A compact toolkit descriptor explains local checks plus the companion skill. The secondary action opens the completed change.
- Spectral loop: Investigate → Decide → Implement → Verify & retain. Labels, accessible names, records, explanations, links, and static/no-JS copy agree. Illustrative delivery records follow the theme example; implementation is an explicit stage. The internal historical keys remain for compatibility with the artwork and timing.
- Proof: the existing report walkthrough now immediately follows the problem introduction. Its heading and introduction identify a small completed theme fix. The report, source change, checks, and retained handoff remain inspectable.
- Situations: the ruled columns now cover starting a foundation, adopting an existing system, and repairing drift. Each gives a concrete request and observable finish line.
- Illustrations, comparison, and screen assembly: captions connect foundations to product adoption, purposeful exceptions, and contributor guidance. Synthetic and authored-animation disclosures remain clear.
- Closing, footer, and metadata use the new offer. The existing 0.4.0 command and agent connection steps remain.

## Visual continuity

All six existing homepage stylesheets are byte-for-byte identical to Git HEAD. The violet/lilac palette, centered moderate Manrope, spectral sculptures and orbit, glass stages, comparison slider, illustrated panels, and screen-building demo remain on the homepage. `home.js` changes update content data, not the motion engine.

`positioning.css` contains only scoped content-fit changes: headline width, lead width, a plain descriptor, and narrow-screen stage spacing. Below 380px, the stage sculpture sits above its text so Investigate/Implement remain legible. Mobile orbit height is 650px to keep the larger labels clear of the central record and playback control. No art assets or global style tokens were replaced.

The earlier report walkthrough remains scoped to `report-stage.css` and `report-stage.js`. Its scenes expand naturally; the result iframe fits its actual same-origin content without clipping or nested scrolling. Original report/evidence files and previous iteration artifacts remain available.

## Validation performed

- `npm run build`: passed; generated guide still matches the locked 0.2.1 dependency.
- `npm run check`: 454 local links and anchors passed.
- `npm test`: all 3 existing tests passed.
- `node scripts/verify-theme-delivery.mjs`: exact two-declaration change, identical workflow markup, and before/after 0.4.0 token findings passed.
- JavaScript syntax and diff whitespace checks passed.
- Compared static initial record/explanation with the new `home.js` data; the no-JS explanation includes implementation and verification/handoff.
- Desktop and 390px new hero visually inspected; 320px headline has no horizontal overflow.
- All four loop states verified for labels, record text, explanations, and evidence destinations. At 320px, all stage buttons have equal client/scroll widths and heights, as do all four central records. The original loop playback control remains functional.
- Report arrow/End keyboard selection and manual pause verified after moving the module. The new hero CTA reaches the completed-change section.
- Preserved comparison range reaches its end value. Screen builder switches to Members and responds to keyboard Replay/Pause with the Resume state. Browser pointer automation could not target Replay at 320px after frame scrolling; keyboard interaction succeeded. This was a tool targeting issue, not a demonstrated page failure.
- The collaborating positioning chat reviewed current copy and desktop/390px screenshots, confirmed the new message and retained design satisfy the direction, and requested no further design changes.

Prior verified behavior remains: report automatic progression, offscreen pause, result form local save, and clean responsive report scenes at 320/390/952/1440px. Reduced-motion behavior is implemented and source-reviewed; no OS-level motion-preference emulation or assistive-technology test was performed.

## Current screenshots

- `artifacts/positioning-home-desktop.jpg`
- `artifacts/positioning-home-mobile.jpg`
- `artifacts/positioning-loop-mobile.jpg`
- `artifacts/positioning-loop-320.jpg`
- `artifacts/positioning-report-desktop.jpg`

Earlier screenshots named `restored-*` document the previous iteration, not the current headline.

## Limits and publication

The theme delivery is a small synthetic fixture, not evidence of a complete system establishment or customer ROI. Its form saves only in page memory. No full accessibility, cross-browser, backend persistence, customer comprehension, or competitive differentiation study was performed. Audience and alternative hypotheses still need customer validation.

No package release, commit, push, or deployment was performed. Generated guide files were not hand-edited. The separate package/guide synchronization prerequisite remains outside this local content/design pass.

## AlignUI-inspired spacing and ruler frame

The user's follow-up asks to use https://www.alignui.com/ as the spacing, layout, grid/gutter, and ruler reference. Inspected the live reference at regular and 1600px widths: its 1152px content area is framed by outer rails, numbered scales visible on wide screens, and fine square junctions.

Implemented `site/layout-frame.css` as a scoped final stylesheet and added non-interactive, `aria-hidden` ruler/junction markup to the existing homepage sections. DS Loop's new positioning, violet colors, Manrope type, spectral art, and functional demos remain. No reference copy, imagery, or branding was copied.

The frame is 1216px wide with 32px inner gutters (1150px usable after borders), consistent section insets, 96px desktop section spacing, and 40px between paired introductions and their demos. Tablet uses 24px insets/72px section spacing; mobile uses 16px insets/48px section spacing. Decorative scales are hidden below 1200px. Paired square junctions replace the older one-sided crosshairs. Header, body, and footer now share the frame edges. The decorative orbit can extend beyond the frame, but `overflow-x: clip` at the main viewport boundary prevents it from widening the page.

### Layout review

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| Medium | `site/layout-frame.css`: shared frame and section rules | Report heading/frame sat on the outer rail while neighboring sections had different insets. | Problem, report, comparison, entry, scope, and assembly headings share the exact same content edge at every tested width. | Shared alignment makes the reading order and section hierarchy easier to follow. |
| High, resolved | `site/layout-frame.css`: main overflow containment | At 1024px, the decorative orbital SVG extended to 1023px inside a 1009px content viewport, creating horizontal page overflow. | The art is clipped at the viewport edge; no text or controls require clipping. | Decorative bleed must not widen the page or shift the grid. |

Verification: 320/390/768/1024/1440/1600px viewport checks now return identical document client/scroll widths (305/375/753/1009/1425/1585px respectively). The six inspected section heading edges match exactly at each width. Desktop hero/proof and mobile hero/loop visually inspected. The report keyboard tab selection and result panel sizing work within the new frame. No new script or motion behavior was introduced. Build, all 3 tests, 455 local links/anchors, and diff whitespace checks pass.

Not verified: native 200% browser zoom, RTL mirror, pseudo-localization, and assistive technology. This review covers the current English homepage and the tested viewport sizes. Approve the inspected layout scope; no known high-severity issue remains within that scope.

Current layout screenshots: `artifacts/layout-frame-desktop.jpg`, `artifacts/layout-frame-mobile.jpg`, and `artifacts/layout-frame-report.jpg`.

## Guide masthead restoration and saved playground (2026-10-12)

Restored the original guide blueprint SVG from the engine repository's `site/docs.html` immediately before website extraction (`f5095d8^`). The website generator now wraps the locked package's guide title and introduction in the existing responsive masthead, with the grid illustration and hatched edge. The artwork source lives in `content/guide-blueprint.html`; generated documentation is rebuilt rather than hand-edited. Technical text and the locked package version are unchanged.

The loop playground now starts from shared `selectedLoopSettings`, resets to the current homepage look, and retains the original two-ring preset. Verified the ellipse slider changes the rendered ring count and reset restores it.

Validation: build, all 3 tests, 574 local links/anchors, and diff whitespace checks pass. Guide reviewed at the default desktop width and 390px mobile (375px client/scroll widths, no horizontal page overflow). Screenshots: `artifacts/restored-guide-header-desktop.jpg` and `artifacts/restored-guide-header-mobile.jpg`. This save includes the earlier visual exploration/restoration snapshots as historical artifacts; they are not the current homepage design.

## Interactive problem section (2026-10-15)

Replaced the text-only problem band with three authored product fragments (Projects, Requests, Billing). The Separate/Shared controls let visitors compare independent styling with shared inputs and buttons. Native buttons expose pressed state, the caption announces the result, and transitions respect reduced motion. There is no autoplay, and the separate-state illustration remains available without JavaScript. The previously selected edited copy remains the baseline; this pass trims the repeated second paragraph in the problem section only.

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| Medium | `site/system-drift.css`: loop explanation | A 205px minimum height and unused space from scaling the graphic separated the explanation and link. | Caption follows the graphic with content-sized rows and a 16px row gap. | Group related content so the explanation reads as part of the graphic. |
| Medium | `site/index.html`: customer problem | Consecutive two-column text bands repeated the same reading pattern without a concrete example. | Copy sits beside a working visual comparison, with a stacked layout when space becomes narrow. | Order and group content so the visitor can see the problem and explore the shared result. |

Verification: 320, 390, 768, 1024, 1440px and the default 1560px desktop reviewed for document overflow. Client and scroll widths match; rotated art extends within the section gutter on larger screens. At 320px, the demo becomes three compact rows and native controls remain accessible. Mouse and Enter-key activation work in both directions; all shared sample controls resolve to the same color and radius. Build, 576 local links/anchors, all three tests, JavaScript syntax, and whitespace checks passed. Not verified: native 200% zoom, RTL mirror, pseudo-localization, assistive technology, or cross-browser behavior. Approve the inspected English layout scope; these untested contexts are outside that approval.

Screenshots: `artifacts/system-drift-desktop.jpg`, `artifacts/system-drift-shared-desktop.jpg`, `artifacts/system-drift-mobile.jpg`.

## Varied product examples and automatic comparison (2026-10-15)

Replaced repeated table/sidebar compositions with four different tasks: an analytics dashboard, a project-creation form, a launch-planning board, and a creative-review canvas with discussion. The same authored content/data renders on both comparison sides. The shared version uses Manrope's variable weights, a consistent plum action palette, clearer numeric and text hierarchy, grouped fields, and task-specific composition. These are illustrative screens, not functional forms, real analytics, or recorded automated repairs.

The same specimens now drive the later assembly demo, with Dashboard/Form/Board/Review controls. It retains one-shot assembly, replay, pause, offscreen/hidden-document suspension, and reduced-motion handling. Standalone before/after pages and the dedicated example page use the updated specimens. `npm run build` generates the HTML from `content/product-demos.mjs` through `scripts/build-product-demos.mjs` so the examples stay consistent.

The comparison starts when its short introduction enters view, holds the independent screens for one second, then reveals the shared screens over 2.8 seconds and stays on the result. It does not move the page or capture scrolling. Replay and pause/resume are explicit; pointer or keyboard manipulation cancels automatic playback and hands control to the visitor. Reduced-motion preferences show the after state immediately. Without JavaScript, after examples and a before link remain available.

Validation: desktop visual review of all four comparisons; automatic completion to 100% on desktop and 320px mobile; pause held at 0% across separate observations, then resumed; keyboard Home/End retained for the range. Assembly switches across all four layouts, and pause/resume works. At 320/390/768px, document and comparison-frame widths match their scroll widths, and iframe heights match content heights. All four assembly screens at 320px fit the frame width (253px) with natural heights from 913 to 1193px. The mobile board rearranges its columns into stacked lanes for readable cards. Build, 581 link/anchor checks, all three tests, script syntax and whitespace checks passed. Reduced-motion code was reviewed but the native preference was not toggled; cross-browser and assistive-technology checks were not run.

Screenshots: `artifacts/varied-comparison-desktop.jpg`, `artifacts/varied-comparison-mobile.jpg`, and `artifacts/varied-assembly-form-desktop.jpg`.

## Website style guide (2026-10-15)

Added `site/style-guide.html` as a browsable website reference, reachable from the homepage footer (Go deeper → Website style guide) and README. Sections cover role-based colors and supporting states, the three type voices, responsive frame and spacing, corners, native shared components, composed patterns, brand/process assets, motion, and usage vocabulary. The site’s current CSS cascade supplies tokens and component visuals; `style-guide.css` is scoped to reference-page composition. `style-guide.js` reads resolved token labels and indicates the visible section; existing `app.js` supplies copy behavior. No new dependency or documentation framework. Technical package-generated guide files are unchanged.

DS Loop route: documentation/scaffold, grounded in its docs role. Read AGENTS.md, DESIGN.md, README, active stylesheet/markup sources, asset provenance and existing demo behavior. The baseline `context` and unfiltered audit used `/Users/owais/.codex/skills/ds-loop/bin/ds-loop` at source revision `42e2943` plus the existing dirty working tree. This is documentation, not a site-wide token migration. Corrected stale DESIGN.md descriptions for the frame, glass-backed loop controls, edited stage names, specimen palette/layouts, and comparison playback.

The pre/post unfiltered audits both report 11 grouped findings, including existing high-severity groups; they are not passing audits. Group counts do not establish unchanged occurrences or improvement. CSS declarations, selected rule-body properties, and selected JavaScript string utilities are covered; the scanner does not resolve the cascade or inline styles. Unsupported HTML increased from 42 to 43 files with this page, and documentation coverage is not checked for these plain HTML patterns. No workspace was detected, so workspace consumers were not run. Source inspection and rendered checks supplement the scanner; its result is not design or accessibility certification. Audit output is retained in `/tmp/ds-site-style-before.json` and `/tmp/ds-site-style-after.json` for this session.

Rendered checks: desktop preview; document client/scroll widths match at 320 (305px), 390 (375px), 768 (753px), and default desktop (1545px). Expanded supporting-color and code disclosures fit at 320px. Copy announces “Token reference copied”; Enter expands the native FAQ, retains focus, and exposes a visible keyboard outline. The primary action matches the homepage’s 8px radius and 600 15px / 24.75px system font. All four process images load. Anchors, source references, and homepage discovery link are included in the local checker. Final validation: build, 636 local links/anchors, all three tests, JavaScript syntax and whitespace checks passed. Reduced-motion and no-JavaScript behavior were source-reviewed; native preference toggling, full assistive-technology and cross-browser tests were not run.

Style guide screenshots: `artifacts/style-guide-desktop.jpg` and `artifacts/style-guide-mobile.jpg`.

## Ember glass variant and report alignment (2026-10-15)

Added a Devloopy-inspired orange/purple/aubergine study with glass surfaces and a gradient CTA. The style guide compares it with the existing Violet orbit action; the homepage variant is selected only by `?theme=ember`. Both generated report paths (audit/consulting and assessment), the two public report samples, the homepage report workbench, and the worked-example page share the foundations from engine `src/core/ember-theme.ts`. `scripts/sync-report-theme.mjs` copies the foundations and patches only a marked style block in each historical report sample. Removing that block reproduces each prior report byte-for-byte. Report evidence, severity meanings, fixture behavior, and payloads are preserved. No new dependency or copied reference artwork.

Reviewed dark and light standalone reports, the desktop CTA study, homepage variant, and worked-example glass panel. At 320px, the style guide, homepage variant, and report document widths match their scroll widths. The report check exposed an existing wide summary table and fixed-minimum limits grid; screen-only responsive overrides contain the table and stack the limits. CTA text contrast has a minimum of 5.15:1 across 202 sampled sRGB gradient positions. This is a CTA contrast check, not a whole-site accessibility certification. Print presentation remains under existing print rules; print rendering and cross-browser testing were not performed.

Engine build, 18 report tests plus 3 assessment tests, and targeted Biome checks pass. Website build, local link checks, and all 3 tests pass. Source and generated-theme ownership are documented in README and DESIGN. Changes are local; no npm release or deployment was performed. Screenshot: `artifacts/ember-style-guide-desktop.png`.

## Restore component formation across varied screens (2026-10-15)

Restored the earlier formation choreography from the committed `saas-build` implementation: library-to-component signal paths, dashed wireframe scaffolds, traced SVG outlines, and staggered component entrances. The varied Dashboard/Form/Board/Review specimens remain intact. Formation takes 5.7 seconds, followed by a 4.2-second reading hold before automatic rotation to the next screen. Clicking or focusing a screen tab ends automatic rotation; replay rebuilds that selection. Pause/resume, hidden-document and offscreen suspension remain available. Reduced motion shows the completed screen without automatic rotation. Mobile retains tracing and formation but omits long connector paths.

The stage reserves the tallest specimen height at its current width to avoid shifting the surrounding page during rotation. Presentation layers are added by the demo script, leaving the shared specimen source and generated comparisons unchanged. Build, local link checks, and three website tests pass.

Rendered verification: automatic rotation advanced from Form to Board while retaining a 488px stage at the standalone desktop width. Pause held the draft state, resume completed Board, and manual selection stayed on Board. The embedded homepage demo has matching 323px client/scroll widths at a 390px viewport. Desktop formation retains all four wireframe overlays and signal paths. Screenshot: `artifacts/restored-formation-desktop.png`.
