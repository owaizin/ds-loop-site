// Explicit cross-repository sync. Normal website builds use these checked-in assets.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const engine = process.argv[2];
if (!engine) throw new Error('Usage: node --experimental-strip-types scripts/sync-report-theme.mjs /path/to/ds-loop');
const { EMBER_FOUNDATIONS_CSS, EMBER_REPORT_CSS } = await import(pathToFileURL(resolve(engine, 'src/core/ember-theme.ts')));
writeFileSync(new URL('../site/ember-tokens.css', import.meta.url), `/* Generated from ds-loop/src/core/ember-theme.ts by scripts/sync-report-theme.mjs. */\n${EMBER_FOUNDATIONS_CSS}`);
for (const name of ['report.html', 'theme-delivery/report.html']) {
  const file = new URL(`../site/samples/${name}`, import.meta.url);
  let html = readFileSync(file, 'utf8');
  html = html.replace(/<style id="ember-report-theme">[\s\S]*?<\/style>/, '');
  html = html.replace('</head>', `<style id="ember-report-theme">${EMBER_REPORT_CSS}</style></head>`);
  writeFileSync(file, html);
}
console.log('Synced shared Ember foundations and restyled both public report samples; evidence payloads preserved.');
