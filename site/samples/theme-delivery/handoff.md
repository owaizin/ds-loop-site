# Theme delivery: decision and handoff

Status: implemented and checked in this public synthetic settings fixture on 12 October 2026. This is not a customer engagement, production migration, or complete design-system setup.

## Problem and supplied convention

Primary actions should use each theme's existing blue palette. The original action token repeated `#245bdb` in both theme scopes, so the dark button ignored the existing `#9ab8ff` palette. Preserve the light appearance, text colors, geometry, and form behavior.

## Decision and implementation

In both `:root` and `.theme-dark`, replace:

```css
--color-action-background: #245bdb;
```

with:

```css
--color-action-background: var(--palette-blue-500, #245bdb);
```

Keep the alias in each theme scope so its value resolves against that theme's palette. Leave the component rule `background: var(--color-action-background)` unchanged.

The token files are copied from the site's existing `demo/before.css` and `demo/after.css`. The new settings harness uses identical markup (apart from before/after stylesheet and page links), shared component styles, and the same form script in both versions. Form submission updates the workspace label in page memory; reloading resets it. No server or account is contacted.

## What was checked

See [browser measurements](browser-checks.json), [before audit](audit-before.json), [after audit](audit-after.json), and [source hashes](source-manifest.json).

- Light button: `rgb(36, 91, 219)` before and after.
- Dark button: `rgb(36, 91, 219)` before; `rgb(154, 184, 255)` after.
- All four button measurements: 129.1953125 × 43.59375 CSS pixels in the checked browser environment.
- In before/after × light/dark: Tab from the input reaches Save changes with a 3px solid outline; Enter updates the workspace label and status message.
- An empty name is rejected by native required-field validation in the after/dark preview; the previously saved name remains and focus returns to the input.
- The 0.4.0 isolated token audit reports `color/semantic-holds-literal` and `color/literal-duplicate-tokens` before; neither is a finding after. There are zero finding groups after in this exact token-only scan.

The older `demo/decision.md` records an earlier audit and a nonfunctional button specimen. Its tier-coverage observations and dimensions are historical, not the measurements for this new harness. This handoff records the rechecked 0.4.0 behavior without rewriting that history.

## Reproduce

From the website repository, with the 0.4.0 engine source checkout available:

```sh
node scripts/verify-theme-delivery.mjs /path/to/ds-loop
npm run dev
```

The script verifies the exact two-declaration change and identical workflow markup, audits temporary token-only fixtures, and regenerates the JSON evidence and source hashes. It does not perform browser checks.

Open `/samples/theme-delivery/before.html?theme=light` and `after.html?theme=light`, then repeat with `theme=dark`. Inspect the Save changes button's computed background, text, width, and height. Tab from Workspace name to the button and press Enter after changing the name. Clear the required input and submit to check rejection. Open the two pages at narrow and desktop widths. The recorded browser JSON is an observation log; rerun these steps after changing the harness.

## Use the decision on the next change

For a new primary action, reuse the action role and check both themes. For a destructive action, introduce an appropriately named semantic role instead of changing every primary button. If the product intentionally changes what primary actions mean, revisit this decision with the affected screens and theme checks.

A follow-up agent prompt:

> Read this handoff and the after token file. Add a destructive-action role for a separate purpose without changing the existing primary action. Explain the role choice, verify both themes and affected interactions, and update this decision with what was checked.

That is usable guidance, not a claim that a separate agent successfully retrieved and followed it.

## Limits

The audit covers the copied token declarations only. It does not prove CSS cascade correctness, all component states, layout quality, full accessibility, assistive-technology behavior, backend persistence, or production adoption. The rendered checks cover the explicit interactions above in the Codex in-app browser. Other browsers and devices were not tested. No separate-session agent retrieval or customer evaluation was conducted.

## Discover the evidence

[Complete delivery page](../../worked-example.html) → source and checks → this handoff. The homepage also links here directly. The older generated-guide redirect is not required to discover this delivery.
