# DS Loop: positioning audit and implementation direction

12 October 2026. Product baseline: **0.4.0**.

## User mandate

Use the new positioning and content inside the established visual language. Keep the beloved graphics on the homepage. The user explicitly rejected restoring old content as the solution. This supersedes prior instructions to preserve the old headline, exact section order, or unchanged home.js.

Apply April Dunford's Obviously Awesome framework. This is our application of her method, not a personal audit or endorsement by April. Primary source: https://www.aprildunford.com/post/a-quickstart-guide-to-positioning . A particular headline, section count, or visual design is our implementation choice, not a rule from April.

## Audit in framework order

1. **Alternatives:** likely status quo: a team directing a general coding agent through one-off UI work, manually reviewing consistency, and postponing shared-system work. This is a hypothesis from product context, not interview evidence. Do not invent competitive rankings or claim other agents cannot do this. Component libraries can be a foundation DS Loop uses.
2. **Capabilities:** supported repository checks connect to a guided agent workflow: investigate, recommend a scope, preserve useful decisions, implement authorized work, verify affected behavior, and retain a usable handoff. Product sources support these capabilities. Competitive uniqueness remains unestablished; avoid “only” or “best” claims.
3. **Value:** three outcomes: know which system work matters; get shared foundations into the product; leave guidance the next contributor can use. The current generic reuse promise underexplains delivery.
4. **Best fit:** product teams already using coding agents, with repeated UI patterns and too little design-system capacity. This working hypothesis comes from VISION.md. Make this situation visible near the hero. Existing DS teams are secondary.
5. **Category:** proposed plain descriptor: “an open-source design-system toolkit for coding agents.” Explain the engine and companion skill. Test this frame with customers; do not present it as validated. The report is an artifact of the work, not the entire offer.

## Implement the new content

### Hero

Headline: **Build and improve your design system with your coding agent.**

Supporting copy: **For product teams using coding agents without enough design-system capacity. Turn repository findings into a clear plan, working components, and guidance your next contributor can use.**

Compact descriptor: **Open-source toolkit · Local checks + an agent skill**. Use existing type and spacing, no decorative eyebrow/badge system.

Primary CTA: **Get started** to #start. Secondary: **See a completed change** to #delivery-report. Preserve the centered proportions and moderate Manrope type; fit the new headline through deliberate line breaks and width rather than giant type or tiny text.

### Existing visuals carry the new story

- **Spectral loop:** retain artwork, orbit, glass stages, controls, and motion. Update visible stage labels, records, accessible names, explanations, and home.js data together to **Investigate → Decide → Implement → Verify & retain**. Internal keys may stay. Illustrate the full delivery journey and label records illustrative. Static/no-JS content must agree.
- **Problem:** explain the cost of isolated UI changes while shared patterns and decisions remain unfinished. Explain the guided delivery workflow in customer language without unsupported competitor comparisons.
- **SaaS comparison:** keep on home. Explain shared-pattern value; keep authored/synthetic disclosure. It illustrates an outcome, not an automated migration.
- **Entry situations:** preserve ruled columns. Cover starting a foundation, adopting an existing system in product code, and repairing drift. Each needs a concise concrete request and observable finish line.
- **Illustrated scope panels and screen assembly:** retain on home; align captions with foundations adopted in workflows, deliberate exceptions, and contributor guidance. Authored animation is not captured execution.
- **Report walkthrough:** retain the refined three-scene mockup and controls. Move the existing module immediately after the problem introduction for early proof before broad illustrative demos. No new report design required. It proves a small completed theme fix, not full system establishment.
- **Closing/footer:** reinforce this offer and next action. Keep npx ds-loop@0.4.0 and agent connection steps. Align metadata and navigation with visible content.

## Design constraints

Preserve violet-black/lilac colors, centered moderate-weight Manrope, spectral graphics, glass loop stages, compact rectangular controls, ruled sections, illustrated panels, comparison slider, and screen-building animation. Keep distinctive visuals on home. Rendering at commit 27a783b is the visual reference, not a source of old copy to restore. Limited responsive adjustments for new content are appropriate. No wholesale CSS/layout replacement.

## Sources, proof, and scope

Ground the story in ds-loop README.md, VISION.md, CLAUDE.md, skill/SKILL.md, and the consulting report's “The big picture” graphic. Preserve diagnosis → proposed outcome → delivery → verification without presenting proposals as completed work.

The public theme fixture supplies source, 0.4.0 token-only audits, an implementation, browser observations, and a handoff. Preserve worked-example.html and samples/theme-delivery links. Do not infer customer ROI, broad accessibility compliance, backend persistence, autonomous operation, or automatic memory. Authored graphics remain illustrations. The local engine and external coding agent have distinct execution/data boundaries.

Do not edit generated site/guide. No package publication, commit, deployment, or additional example page requested.

## Acceptance

Message clarity and visual identity must pass together. A visitor should explain what this is, who benefits, what their agent delivers, how the approach works, what the example proves, and how to start. No subjective score. Customer comprehension and alternatives remain unvalidated until tested with target users.

Inspect desktop and narrow mobile after copy changes. Check four loop states, no-JS text, report controls, original demos, and anchors. Run npm run build, npm run check, npm test, and existing theme evidence verifier. Record actual scope and limitations in IMPLEMENTATION-REVIEW.md; remove old-copy restoration as an acceptance condition.
