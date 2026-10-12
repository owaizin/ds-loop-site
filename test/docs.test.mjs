import test from 'node:test';
import assert from 'node:assert/strict';
import { renderMarkdown } from '../scripts/docs-lib.mjs';
import { runExamples } from '../scripts/examples.mjs';
import { resolve } from 'node:path';
test('rewrites package guide links and gives headings stable, unique anchors',()=>{
 const html=renderMarkdown('# Install\n\n## Coverage\n\n## Coverage\n\n[Home](README.md) [Coverage](reference.md#coverage)','install.md',['README.md','reference.md'],'0.2.1');
 assert.match(html,/href="index.html"/); assert.match(html,/href="reference.html#coverage"/); assert.match(html,/id="coverage-1"/);
});
test('does not publish executable HTML from package documentation',()=>{
 const html=renderMarkdown('<script>alert(1)</script><img src="x" onerror="alert(1)">\n\n[bad](javascript:alert%281%29)','README.md',['README.md'],'0.2.1');
 assert.doesNotMatch(html,/<script|onerror|javascript:/);
});
test('example snapshots are reproducible across temporary directories and timestamps',()=>{
 assert.deepEqual(runExamples(resolve('node_modules/ds-loop')),runExamples(resolve('node_modules/ds-loop')));
});
