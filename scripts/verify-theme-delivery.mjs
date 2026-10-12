import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdtempSync, cpSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';

// Run from the website root. The optional argument is a 0.4.0 engine source checkout.
const engine = resolve(process.argv[2] || '../ds-loop');
assert.equal(JSON.parse(readFileSync(join(engine, 'package.json'))).version, '0.4.0');
const sample = resolve('site/samples/theme-delivery');
const before = readFileSync(join(sample, 'before.css'), 'utf8');
const after = readFileSync(join(sample, 'after.css'), 'utf8');
assert.equal(after, before.replaceAll('--color-action-background: #245bdb;', '--color-action-background: var(--palette-blue-500, #245bdb);'));
assert.equal(readFileSync(join(sample, 'before.html'), 'utf8').replaceAll('before', 'after'), readFileSync(join(sample, 'after.html'), 'utf8'));
const audits = {};
for (const state of ['before', 'after']) {
  const temp = mkdtempSync(join(tmpdir(), 'ds-loop-theme-proof-'));
  try {
    // Token-only audit: workflow CSS and HTML behavior are verified separately in-browser.
    cpSync(join(sample, `${state}.css`), join(temp, 'tokens.css'));
    let output;
    try { output = execFileSync(process.execPath, ['--experimental-strip-types', join(engine, 'src/cli.ts'), 'audit', '.', '--json'], { cwd: temp, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }); }
    catch (error) { if (error.status !== 1 || !error.stdout) throw error; output = error.stdout; }
    const data = JSON.parse(output.replaceAll(temp, '<fixture>'));
    data.manifest.fixtureLabel = 'public-theme-delivery';
    const stable = JSON.parse(JSON.stringify(data, (key, value) => /^(timestamp|durationMs|elapsedMs|generatedAt|timestampMs|ranAt)$/.test(key) ? undefined : value));
    audits[state] = stable;
    writeFileSync(join(sample, `audit-${state}.json`), JSON.stringify(stable, null, 2) + '\n');
  } finally { rmSync(temp, { recursive: true, force: true }); }
}
for (const rule of ['color/semantic-holds-literal', 'color/literal-duplicate-tokens']) {
  assert.ok(audits.before.findings.some(finding => finding.ruleId === rule), `Missing before finding: ${rule}`);
  assert.ok(!audits.after.findings.some(finding => finding.ruleId === rule), `Finding remains after: ${rule}`);
}
assert.equal(audits.after.findings.length, 0);
const hashes = Object.fromEntries(['before.css','after.css','workflow.css','workflow.js','before.html','after.html'].map(file => [file, createHash('sha256').update(readFileSync(join(sample,file))).digest('hex')]));
writeFileSync(join(sample, 'source-manifest.json'), JSON.stringify({ engineVersion:'0.4.0', auditScope:'tokens.css only; no claim of full workflow audit', sha256:hashes }, null, 2)+'\n');
console.log('Theme delivery: exact two-declaration change, identical workflow markup, and before/after 0.4.0 token findings verified. The audit covers the isolated token declarations only.');
