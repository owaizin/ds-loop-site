import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { escape, pageName, renderMarkdown } from './docs-lib.mjs';
import { runExamples } from './examples.mjs';
import { siteHeader, siteFooter, breadcrumbs } from './site-shell.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
const pkgRoot = join(root, 'node_modules/ds-loop');
const pkg = JSON.parse(readFileSync(join(pkgRoot, 'package.json')));
const own = JSON.parse(readFileSync(join(root, 'package.json')));
if (own.dependencies['ds-loop'] !== pkg.version) throw new Error('Install the exact locked DS Loop version first.');
const lock = JSON.parse(readFileSync(join(root, 'package-lock.json'))).packages['node_modules/ds-loop'];
const docsRoot = join(pkgRoot, 'docs/guide');
const files = readdirSync(docsRoot).filter(f => f.endsWith('.md')).sort();
for (const required of ['README.md', 'install.md', 'reference.md', 'workflow.md']) if (!files.includes(required)) throw new Error(`Release is missing ${required}`);
const source = Object.fromEntries(files.map(f => [f, readFileSync(join(docsRoot, f), 'utf8')]));
const output = join(root, 'site/guide');
rmSync(output, { recursive: true, force: true }); mkdirSync(output, { recursive: true });
const titles = Object.fromEntries(files.map(f => [f, source[f].match(/^# (.+)$/m)?.[1] || f]));
const guideBlueprint = readFileSync(join(root, 'content/guide-blueprint.html'), 'utf8').trim();
const readingOrder = ['README.md', 'install.md', 'workflow.md', 'output.md', 'example.md', 'benchmark.md', 'reference.md'].filter(f => files.includes(f));
const labels = { 'README.md':'Overview', 'install.md':'Installation', 'workflow.md':'Workflows', 'output.md':'Reports & findings', 'example.md':'Theme repair', 'benchmark.md':'Public comparisons', 'reference.md':'Commands & coverage', 'examples.html':'Verified examples' };
const releaseFiles = files.filter(f => f.startsWith('release-')).reverse();
const currentRelease = `release-${pkg.version}.md`;
const label = f => labels[f] || titles[f] || f;
function docLink(file, current) {
 return `<a href="${pageName(file)}"${file === current ? ' aria-current="page"' : ''}>${escape(label(file))}</a>`;
}
function guideNavigation(current) {
 const basics = ['README.md','install.md','workflow.md'].filter(f => files.includes(f));
 const deeper = files.filter(f => !basics.includes(f) && !releaseFiles.includes(f));
 deeper.sort((a,b) => readingOrder.indexOf(a) - readingOrder.indexOf(b));
 return `<aside class="docs-nav"><details class="guide-contents" open><summary>Guide contents <span aria-hidden="true">⌄</span></summary><nav aria-label="Documentation"><div class="guide-version"><a href="https://www.npmjs.com/package/ds-loop/v/${pkg.version}">DS Loop <span>v${pkg.version}</span></a></div><div class="nav-group"><p>Get started</p>${basics.map(f => docLink(f,current)).join('')}</div><div class="nav-group"><p>Go deeper</p>${deeper.map(f => docLink(f,current)).join('')}${docLink('examples.html',current)}</div><div class="nav-group"><p>Releases</p>${files.includes(currentRelease) ? docLink(currentRelease,current) : ''}<details class="release-history"${releaseFiles.includes(current) && current !== currentRelease ? ' open' : ''}><summary>Earlier releases</summary>${releaseFiles.filter(f => f !== currentRelease).map(f => docLink(f,current)).join('')}</details></div></nav></details></aside>`;
}
function page(title, body, file) {
 const overview = file === 'README.md';
 let intro = '';
 body = body.replace(/^(<h1\b[^>]*>[\s\S]*?<\/h1>\s*(?:<p>[\s\S]*?<\/p>)?)/, match => { intro = match; return ''; });
 if (!intro) throw new Error(`Missing guide title: ${file}`);
 const description = intro.match(/<p>([\s\S]*?)<\/p>/)?.[1].replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim() || title;
 const headings = [...body.matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g)];
 const toc = headings.length ? `<aside class="doc-toc"><details class="page-contents" open><summary>On this page</summary><nav aria-label="On this page">${headings.map(([,id,text]) => `<a href="#${id}">${text}</a>`).join('')}</nav></details></aside>` : '';
 let codeIndex = 0;
 body = body.replace(/<pre><code([^>]*)>([\s\S]*?)<\/code><\/pre>/g, (_, attrs, text) => {
  const id = `guide-code-${++codeIndex}`;
  return `<div class="doc-code"><pre><code${attrs} id="${id}">${text}</code></pre><button type="button" data-copy="${id}" data-copy-kind="Example" aria-label="Copy code example ${codeIndex}" aria-describedby="${id}-status" hidden>Copy</button><p class="sr-only" id="${id}-status" role="status"></p></div>`;
 });
 const index = readingOrder.indexOf(file);
 const adjacent = index >= 0 ? [readingOrder[index-1], readingOrder[index+1]] : [];
 const pager = adjacent.some(Boolean) ? `<nav class="guide-pager" aria-label="Guide pages">${adjacent.map((f,i) => f ? `<a class="${i ? 'next' : 'previous'}" href="${pageName(f)}"><span>${i ? 'Next →' : '← Previous'}</span><strong>${escape(label(f))}</strong></a>` : '<span></span>').join('')}</nav>` : '';
 const crumb = breadcrumbs(overview ? [{label:'Guide'}] : [{label:'Guide',href:'index.html'},{label:label(file)}], '../');
 return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(title)} | DS Loop</title><meta name="description" content="${escape(description)}"><meta name="theme-color" content="#0b0913"><link rel="icon" href="../assets/branding/ds-loop-mark.svg"><link rel="preload" href="../assets/manrope.ttf" as="font" type="font/ttf" crossorigin><link rel="stylesheet" href="../styles.css"><link rel="stylesheet" href="../theme.css"><link rel="stylesheet" href="../inner-pages.css"><link rel="stylesheet" href="guide.css"><script src="../app.js" defer></script><script src="../inner-pages.js" defer></script><link rel="stylesheet" href="../branding.css"><link rel="stylesheet" href="../footer-creator.css">
</head>
<body class="guide-page inner-page"><a class="skip" href="#main">Skip to content</a>${siteHeader({prefix:'../',section:'guide'})}<main id="main" class="wrap docs-layout">${guideNavigation(file)}<article class="release-doc">${crumb}<div class="doc-title${overview ? ' guide-overview' : ''}"><div class="guide-title-copy">${intro}</div>${overview ? guideBlueprint : ''}</div><div class="doc-body-layout"><div class="doc-reading">${body}${pager}</div>${toc}</div></article></main>${siteFooter({prefix:'../'})}</body></html>\n`;
}
for (const f of files) writeFileSync(join(output, pageName(f)), page(titles[f], renderMarkdown(source[f], f, files, pkg.version), f));
const examples = runExamples(pkgRoot);
writeFileSync(join(output, 'examples.json'), JSON.stringify(examples, null, 2) + '\n');
writeFileSync(join(output, 'examples.html'), page('Verified examples', `<h1 id="verified-examples">Verified examples</h1><p>These fixtures run against the installed ${pkg.version} package whenever the website builds. An audit may exit with findings; a crash or missing expected rule blocks publication.</p>` + examples.map(e => `<section><h2 id="${e.id}">${escape(e.title)}</h2><p><code>ds-loop audit . --json</code></p><h3>Input</h3>${Object.entries(e.files).map(([name, text]) => `<p>${escape(name)}</p><pre><code>${escape(text)}</code></pre>`).join('')}<h3>Result</h3><pre><code>${escape(JSON.stringify(e.result, null, 2))}</code></pre></section>`).join(''), 'examples.html'));
writeFileSync(join(output, 'guide.css'), readFileSync(join(root, 'content/guide.css')));
writeFileSync(join(output, 'release.json'), JSON.stringify({ version: pkg.version, integrity: lock.integrity, documentation: Object.fromEntries(files.map(f => [f, createHash('sha256').update(source[f]).digest('hex')])) }, null, 2) + '\n');
console.log(`Built ${files.length} documentation pages and ${examples.length} verified examples from ds-loop ${pkg.version}.`);
