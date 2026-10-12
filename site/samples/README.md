# Public assessment sample

Source: ds-loop/docs/assets/consulting-delivery/report.html and its README.
Independently constructed Example DS fixture. No client source or measurements.
The assessment is agent-authored; the delivery and acceptance checks are proposed, not completed.

Reproduce in the engine repository:

```sh
node --experimental-strip-types src/cli.ts report fixtures/example-workspace --consult skill/templates/consult.example.json --out docs/assets/consulting-delivery/report.html
```

Website adaptation: a return link and public GitHub fixture links replace machine-local file URLs. The report content is otherwise unchanged. This editorial sample is separate from generated package documentation.

## Dashboard

Generated with the 0.4.0 source CLI against `fixtures/css-audit-example`, from a temporary directory with no scorecard history:

```sh
node --experimental-strip-types /path/to/ds-loop/src/cli.ts dashboard /path/to/ds-loop/fixtures/css-audit-example --out dashboard.html
```

The sample contains current measurements and explicitly has no trend history. Machine-local paths are replaced with fixture-relative labels or public source URLs. ID lookups use escaped ID selectors to avoid the site's static validator mistaking script strings for duplicate HTML IDs.

## Theme delivery report preview

`theme-delivery/report.html` is generated from the 0.4.0 engine source against `theme-delivery/before.css`, using `theme-delivery/consult.json`. The homepage uses a faithful fitted preview rather than embedding the entire document. Its art is extracted from the generated cover; its diagnosis, source excerpt and two finding groups match that report. Open the full report for scope and limits.

From the website root:

```sh
node --experimental-strip-types /path/to/ds-loop/src/cli.ts report site/samples/theme-delivery/before.css --consult site/samples/theme-delivery/consult.json --out site/samples/theme-delivery/report.html
```

For portable website presentation, replace machine-local source URLs with adjacent fixture paths and add a return link. An optional compact preview media mode is presentation-only; it does not change evidence. The report records the initial proposal; the linked worked delivery and handoff record the performed change.
