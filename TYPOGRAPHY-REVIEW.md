# Homepage typography review — 15 October 2026

Applied the better-typography skill. Kept the existing Manrope display/system body pairing and loaded variable Manrope weight range (200–800). Added homepage-only semantic type roles in `site/homepage-type.css`; product specimen iframes retain their separate type systems for the animation work handed to Claude.

## Hierarchy and scale

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| MEDIUM | `site/homepage-type.css:14`, `:22`, `:30` | Hero 64px; sections 38px; closing 46px; report child 39px | Hero 56px; sections 36px; subsections/report child 28px, fluid below desktop | A subordinate heading no longer exceeds its parent; closing section follows the same scale. Hero uses two natural sentence lines on desktop. |
| MEDIUM | `site/homepage-type.css:26`, `:34`, `:79` | Card titles 19–20px, body 14–16px with varying leading; reuse description 12px | Card titles 20px/1.4; editorial body 16px/1.6; hero lead 18px/1.6 | Consistent roles and readable descriptions, including bento cards and adoption steps. |

## Wrapping and detail

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| LOW | `site/homepage-type.css:48`, `:67` | 12px support copy, nav labels broke across lines at 320px after scaling | 13px support copy, unbroken compact mobile nav, pretty paragraphs, balanced headings, wrapping phrase spans on mobile | Improve reading and maintain useful label shapes without horizontal overflow. |

## Layout request

`site/index.html` now groups the closing heading and complete install/CTA block in `.start-heading` before the ordered steps. Two columns on desktop, heading then install actions then steps on mobile. `site/homepage-type.css:56` defines the layout. Copy-command IDs and links are preserved.

## Verification

- Browser computed heading sizes reviewed across the homepage; body sizes checked in entry cards, bento cards, steps, FAQ and report title area.
- Desktop visual review: hero, report, entry/bento sections, closing section. Mobile visual review: closing block at 390px and 320px, hero/nav at 320px.
- At 320px viewport: document client/scroll width both 305px; no overflowing or vertically clipped main headings, paragraphs or FAQ summaries in DOM measurement, excluding intentionally screen-reader-only text.
- Variable font declaration supports the selected 400/500/600 weights. Existing fonts retained.
- `npm run build`, `npm run check` (805 links), `npm test` (3 tests), and `git diff --check` pass. Final CSS refinements rechecked in the browser and link/whitespace checks.
- Not verified: 200% browser zoom, OS text enlargement, fallback-font rendering with downloads blocked, all animated illustration text and embedded specimen typography. This is approval of the inspected homepage editorial typography, not those separate surfaces.

Approve — no HIGH findings remain in the inspected scope.
