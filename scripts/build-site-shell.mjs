import { readFileSync, writeFileSync } from 'node:fs';
import { siteHeader, siteFooter } from './site-shell.mjs';

for (const [file, section] of [['system-example.html','examples'], ['worked-example.html','examples'], ['style-guide.html','style-guide']]) {
 const path = new URL(`../site/${file}`, import.meta.url);
 let html = readFileSync(path, 'utf8');
 html = html.replace(/<header class="site-header\b[\s\S]*?<\/header>/, siteHeader({section}));
 html = html.replace(/<footer class="site-footer\b[\s\S]*?<\/footer>/, siteFooter());
 if (!html.includes('href="inner-pages.css"')) html = html.replace('</head>', '<link rel="stylesheet" href="inner-pages.css">\n<script src="inner-pages.js" defer></script>\n</head>');
 html = html.replace(/<body class="(?![^\"]*\binner-page\b)([^\"]*)"/, '<body class="$1 inner-page"');
 writeFileSync(path, html);
}
console.log('Updated navigation on the product examples, worked example, and style guide.');
