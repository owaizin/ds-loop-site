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
