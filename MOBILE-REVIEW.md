# Mobile homepage review

Reviewed 18 October 2026 against the repository's starting commit. Scope: homepage
and its embedded product comparison, at page widths of 760px and below.

## What was overwhelming

- At 390px the page was approximately 13,513px tall. Installation steps began
  more than 10,800px into the main content.
- The opening orbital workflow and the later circuit diagram explained the same
  process twice, with small labels and automatic state changes.
- Four starting situations became a long stack of headings, quotations, and
  explanatory paragraphs. Readers had to pass all four before continuing.
- Four deliverable illustrations became full-width panels before another product
  demo. The demo reserved the tallest category's height even for shorter screens,
  leaving substantial blank space.
- The header occupied two rows; centered introductory text and large gaps made
  the opening harder to scan on a phone.

## Mobile treatment

- Use a single-row header, a shorter introduction, a prominent installation
  action, readable left-aligned text, and consistent section spacing.
- Present the workflow as four selectable stages and one readable result. Keep
  it still until the reader selects a stage. Retain its existing spectral icons.
- Let readers expand the starting situations, circuit workflow, and product
  comparison. Use native details/summary controls with keyboard operation.
- Present deliverables as a concise list. Keep the report artwork as the main
  visual proof and retain the full examples behind their existing links.
- Show both before and after in the phone comparison. Category changes are
  manual and each category uses its actual content height.
- Keep scroll text visible, without blurred entrances or heading light effects.

## Desktop boundary

All homepage layout changes are restricted to 760px and below. New disclosure
wrappers use display: contents and stay open above that breakpoint. The embedded
comparison follows the parent page's breakpoint, so a narrow iframe inside a
wider page keeps its existing desktop behavior. The original desktop copy and
artwork remain in place. No dependencies or generated guide content changed.

Without JavaScript, disclosure content starts open and remains available through
native controls. With JavaScript, phone disclosures start closed; resizing back
to desktop reopens them.

## Verification

- Chromium at 320, 375, 390, 430, 600, and 760px: no page overflow or runtime
  errors; workflow selection stays put; native disclosures work with Enter;
  circuit scenarios and stages remain operable; comparison categories stay on
  the reader's selection.
- All four comparison categories checked for overflow at 320, 390, and 760px.
- At 390px the default page is approximately 7,538px tall (44% shorter), with
  installation content reached about halfway through the previous scroll length.
- Desktop section geometry matches the starting commit at 768, 1024, and 1440px.
  Viewport screenshots match pixel for pixel across nine page regions at 1024
  and 1440px. Full-page screenshots initially differed because offscreen iframe
  content had not painted; scrolling each region into view resolved that artifact.
- Crossing the 760px breakpoint restores the appropriate disclosure defaults.
  Native disclosures remain usable with JavaScript disabled.
- Install guide, workflow guide, worked example, and product example checked for
  horizontal overflow at 390px; none observed.
- Required build, local-link/release checks, and all three repository tests pass.
- Safari/WebKit could not be run because its browser runtime is not installed.
