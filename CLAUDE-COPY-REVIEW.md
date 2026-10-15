# Claude copy and flow comparison

October 15, 2026. The user selected this version. Its copy and six-section flow are now applied to the main homepage. The earlier comparisons remain available as historical snapshots.

Open http://127.0.0.1:4187/copy-claude-preview.html?copy=edited and switch between **Current site** and **Claude version**. The optional **Highlight changes** control compares stable text keys, so moved sections are compared with their original text instead of unrelated paragraphs. The current side is a snapshot of index.html when this variant was made, including the current graphics and demos. Snapshot copy/scripts do not automatically follow subsequent homepage edits; both versions still share visual styles and demo assets.

## What changed

- Pain-led hero: “Your design system needs work. Your team is stretched.” The original approved headline remains in the baseline and main homepage.
- Hero trust facts distinguish local checks from the coding agent. No API key is required for local checks; agent costs and data handling depend on its provider/settings.
- Kept the spectral loop and its interactive example record; removed the separate explanatory paragraph and its repeated links. Stage labels use Investigate, Decide, Implement, Verify.
- Six top-level sections: hero → drift problem → three starting situations → completed example → what you keep and reuse → start and FAQ.
- Moved the three starting situations directly after the problem. Kept their concrete quoted requests.
- Reframed the proof around the trace from findings through decision, source changes, browser checks, and handoff. Removed the version number from the report caption and consolidated evidence links into “See the complete example.”
- Standardized concise Illustration / Demo project labels. The interactive form still explains that reloading resets it.
- “Keep what your agent builds” leads the lasting-output section. Preserved the foundation/usage illustrations and both product demos. Existing-screen comparison and next-screen assembly now share one introduction and keyboard-accessible tabs.
- Combined the three prompt steps, install command, and FAQ in the final section. FAQ answers are unchanged. “Supervised alpha” appears once near installation; the existing FAQ still explains alpha behavior.
- Used DS Loop consistently in visible branding, with Design System Loop retained as the brand title and footer signature.

## Evidence decisions

Claude’s proposed larger proof remains a content gap. No new multi-screen delivery was performed for this copy preview. The three-form graphic is an illustration; it is not presented as a completed migration. “14 issues across 6 screens” was a suggested example, not measured evidence, so it is not used. The performed theme fix remains accurately scoped to two CSS declarations.

The draft does not claim a full design-system team replacement or unconditional ownership of every generated dependency. It emphasizes editable code and notes the team can maintain. This follows the established Obviously Awesome positioning and no-ai-slop editing principles without presenting either framework author as an endorser.

## Files

- `site/copy-claude-preview.html` / `.js`: comparison shell; reuses existing `copy-preview.css`.
- `site/copy-claude-current.html`, `copy-claude-current-home.js`, `copy-claude-current-report.js`: current baseline snapshot.
- `site/copy-claude.html`, `.css`, `.js`, `copy-claude-home.js`, `copy-claude-report.js`: proposed version and isolated copy/interaction changes.

Preview HTML files use noindex; the main homepage does not. The main homepage now uses `homepage-flow.css`, `homepage-loop.js`, `homepage-report.js`, and `homepage-reuse.js`. The review stylesheet imports the shared layout so the approved preview receives the same alignment fixes. Existing theme experiment assets and visual modules are preserved. No commit or deployment requested or performed.

## Verification

- Build, all three existing tests, and 775 local link/anchor checks passed.
- Confirmed six top-level content sections, a single proof evidence link, preserved FAQ content, and distinct copy on each comparison side.
- Browser checks covered switching versions, highlighting changes, both reuse tabs, report selection and keyboard navigation, and mobile widths of 390 and 320 pixels. At 320 pixels the rendered page had no horizontal overflow.
- The repository still builds technical documentation from its existing locked dependency. This preview uses the agreed 0.4.0 product baseline and does not change that separate dependency/release work.

## Selection and alignment correction

The merged start section inherited centered heading, paragraph, command, and note styles from the former standalone CTA. Explicitly aligned these to the section’s left edge, aligned the FAQ heading with the first question, and retained the single-column mobile layout. The installation command wraps safely on narrow screens. Kept the old `adoption-title` anchor on the prompt steps so existing links still work.

After promotion, build, 769 local link/anchor checks, and all three tests passed. Browser checks covered the main homepage’s desktop start section, mobile start/FAQ layout without horizontal overflow, and expanded FAQ answers. Screenshots: `artifacts/approved-start-desktop.png` and `artifacts/approved-faq-mobile.png`.
