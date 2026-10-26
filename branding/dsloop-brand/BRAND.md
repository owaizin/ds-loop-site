# DS Loop brand rules

Read this before building any UI, page or graphic that shows the DS Loop logo or uses its patterns. Use the files in this folder as they are. Do not redraw the logo, retype the wordmark in a live font, or invent colours.

## Files

| Need | File |
|---|---|
| Logo on dark (default) | `logo/ds-loop-logo-dark.svg` |
| Logo on light | `logo/ds-loop-logo-light.svg` |
| One colour | `logo/ds-loop-logo-mono-white.svg`, `logo/ds-loop-logo-mono-ink.svg` |
| Stacked | `logo/ds-loop-logo-stacked-dark.svg`, `logo/ds-loop-logo-stacked-light.svg` |
| Full name, one line | `logo/ds-loop-logo-fullname-line-{dark,light,mono-white,mono-ink}.svg` |
| Full name, two lines | `logo/ds-loop-logo-fullname-2line-{dark,light,mono-white,mono-ink}.svg` |
| Mark only (favicon, avatar, app icon) | `logo/ds-loop-mark.svg` |
| Construction reference | `logo/ds-loop-construction.svg` |
| Background patterns | `patterns/*.svg` |
| Colour and type tokens | `tokens/brand.css` |

The wordmark is outlined (Outfit Medium converted to paths), so no font is needed to render the logo.

## Which logo to use

- **"DS Loop" lockup** is the primary logo: site header, app chrome, footers, social avatars.
- **Full name ("Design System Loop")** is for introductions: homepage hero, deck covers, docs landing pages. Use the two-line version in narrow spaces.
- **Mark only** for favicons, app icons and avatars, or where the name already appears nearby.
- The style guide defines a dark theme only. Use the dark versions by default; light versions are for print and light third-party surfaces.

## Geometry

The mark is drawn on a 9 × 9 grid. One unit (u) = the stroke width = every gap.

- The mark is a single continuous stroke that draws both the S and the D.
- In the lockup, the wordmark's cap height equals the height of the S (5u), aligned to its top and bottom arms.
- Gap between mark and wordmark: 3u.
- **Clear space:** 3u on every side (one third of the mark's height).
- **Minimum size:** mark 16px; lockup 24px tall on screen. At 16px the mark is dense; prefer 20px or larger for favicons where possible.

## Colour

- Logo gradient on dark: lilac `#D1BCFF` → purple `#9A74ED` → orange `#FF743D`, top-left to bottom-right.
- Logo gradient on light: action violet `#7B46DC` → purple `#9A74ED` → orange `#FF743D`.
- Wordmark: `#F3F0FF` on dark, `#080512` on light.
- The CTA gradient (lilac `#B9A0FF` → purple → orange, lettering `#1E0E26`) is reserved for the main action on a screen. Don't use it for decoration.
- Interface colours come from the style guide: https://design-system-loop.vercel.app/style-guide.html

## Patterns

All patterns are built from the mark's unit: 1u stroke, 1u gap.

- **Loop field:** open paths with one closed loop highlighted in the logo gradient. Only ever one highlighted loop.
- **Puzzle:** two-tone interlocking shapes. Lilac/purple for energy, or paper/surface as a quiet texture. Never put body text on it.
- **Echo:** concentric D outlines around the mark. Rings stay in the pattern line tone; only the mark is in colour.

To regenerate a pattern at another size or with a different arrangement, use `scripts/patterns.py` (functions `truchet`, `truchet_lines`, `two_tone`, `echo`). Each layout comes from a fixed seed, so results are repeatable.

## Don't

- Recolour, stretch, rotate, outline or add effects (shadow, glow, bevel) to the logo.
- Rebuild the wordmark in a live font.
- Put the logo on a busy pattern without a solid panel behind it.
- Use the old blue/cyan gradient anywhere.
