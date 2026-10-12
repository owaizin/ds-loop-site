# Homepage copy comparison

Open http://127.0.0.1:4187/copy-preview.html . The top control switches between Current copy and Edited copy. Both versions use the same design, graphics, and demos. Highlight changes outlines changed text in either version; hovering reveals the other wording. Disable highlights for a clean page review. The comparison keeps the corresponding section in view, carries over the selected loop/report step and expanded FAQ answers, and supports native radio-button keyboard controls. The selected version is stored in the URL. Open this version opens the selected standalone page on desktop.

The original homepage is unchanged. copy-current.html is a snapshot of it with a noindex directive. copy-edited.html is the proposed edit, with separate copies of the dynamic loop and report text scripts. These files are review artifacts; changes to the main page do not automatically regenerate the snapshots. None is linked from the production homepage.

## What changed

- The user selected the original hero heading, “Build and improve your design system with your coding agent,” with the rest of the fuller edited copy. Both versions now share that heading. The edited supporting copy names DS Loop, coding agents, the concrete work, and teams short on time or people.
- copy-edited.css balances the edited section headings and fits the hero on narrow phones, preserving the explicit desktop line breaks and keeping “coding agent” together.
- Rewrote the main section headings around the reader’s problem, the dark-mode fix, shared components, and choosing a first task. Kept specific evidence and familiar problem examples.
- Replaced internal delivery language with descriptions of screens, shared components, code changes, tests, and project notes.
- Shortened repeated process explanations. The section near the end now helps the reader choose a first task.
- Simplified example disclosures while preserving the distinctions between authored illustrations, a performed demo change, and customer evidence.
- Kept the documented engine/agent responsibilities, costs and data boundaries, manual activation, alpha status, and 0.4.0 command.

Editing used no-ai-slop and its eval.md checks. The approach draws on 37signals' published guidance, not an endorsement or a claim that they wrote this copy:

- https://basecamp.com/gettingreal/09.7-copywriting-is-interface-design
- https://37signals.com/podcast/sound-like-you/

## Checks

Build, 573 local links, all three existing tests, JavaScript syntax, and diff whitespace checks passed. Confirmed that Current matches index.html apart from noindex and both versions load the same design stylesheets. Browser checks covered mouse/keyboard switching, switching at the report section, edited loop interaction, reload with the selected version, and widths of 320 and 390 pixels without horizontal overflow. No deployment was performed.
