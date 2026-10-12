import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, basename } from 'node:path';
export function runExamples(pkgRoot) {
 const cases = [
  { id: 'raw-values', title: 'Hardcoded component styles', rule: 'token/raw-value-in-markup', files: { 'tokens.css': ':root { --palette-blue-500: #1da1f2; --brand: var(--palette-blue-500, #1da1f2); }\n', 'Card.tsx': 'export const Card = () => <div className="bg-[#1da1f2] p-[13px]">Account</div>;\n' } },
  { id: 'token-model', title: 'A token decision to review', rule: 'token/tier-model-undetectable', files: { 'tokens.css': ':root { --ocean: #1da1f2; --link: var(--ocean, #1da1f2); }\n' } },
  { id: 'stock-palette', title: 'A stock palette utility', rule: 'token/stock-palette-utility', files: { 'theme.css': ':root { --palette-blue-500: #2456ab; }\n', 'Card.tsx': 'export const Card = () => <div className="bg-white">Account</div>;\n', 'ds-loop.config.json': '{"tokenContexts":[{"files":["Card.tsx"],"tokens":["theme.css"]}]}\n' } }
 ];
 return cases.map(({ rule, ...example }) => {
  const cwd = mkdtempSync(join(tmpdir(), 'ds-loop-site-'));
  try {
   for (const [name, content] of Object.entries(example.files)) writeFileSync(join(cwd, name), content);
   let output;
   try { output = execFileSync(process.execPath, [join(pkgRoot, 'bin/ds-loop.mjs'), 'audit', '.', '--json'], { cwd, encoding: 'utf8', timeout: 30000, stdio: ['ignore', 'pipe', 'pipe'] }); }
   catch (e) { if (e.status !== 1 || !e.stdout) throw e; output = e.stdout; }
   assert.ok(output.includes(rule), `Release no longer reports expected rule ${rule}; review this example before publishing.`);
   const result = JSON.parse(output.replaceAll(cwd, '<project>').replaceAll(basename(cwd), example.id));
   // Audit timings vary by machine and do not belong in a reproducible specimen.
   const stable = JSON.parse(JSON.stringify(result, (key, value) => /^(timestamp|durationMs|elapsedMs|generatedAt|timestampMs|ranAt)$/.test(key) ? undefined : value));
   return { ...example, result: stable };
  } finally { rmSync(cwd, { recursive: true, force: true }); }
 });
}
