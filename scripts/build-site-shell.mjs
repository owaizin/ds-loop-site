import { readFileSync, writeFileSync } from 'node:fs';
import { siteHeader, siteFooter, creatorFooter } from './site-shell.mjs';

for (const [file, section] of [['system-example.html','examples'], ['worked-example.html','examples'], ['style-guide.html','style-guide']]) {
 const path = new URL(`../site/${file}`, import.meta.url);
 let html = readFileSync(path, 'utf8');
 html = html.replace(/<header class="site-header\b[\s\S]*?<\/header>/, siteHeader({section}));
 html = html.replace(/<footer class="site-footer\b[\s\S]*?<\/footer>/, siteFooter());
 if (!html.includes('href="footer-creator.css"')) html = html.replace('</head>', '<link rel="stylesheet" href="footer-creator.css">\n</head>');
 if (!html.includes('href="inner-pages.css"')) html = html.replace('</head>', '<link rel="stylesheet" href="inner-pages.css">\n<script src="inner-pages.js" defer></script>\n</head>');
 html = html.replace(/<body class="(?![^\"]*\binner-page\b)([^\"]*)"/, '<body class="$1 inner-page"');
 writeFileSync(path, html);
}
console.log('Updated navigation on the product examples, worked example, and style guide.');

// Keep the maker credit on the homepage.
for (const file of ['index.html']) {
 const path = new URL(`../site/${file}`, import.meta.url);
 let html = readFileSync(path, 'utf8');
 html = html.replace(/<!-- creator-credit -->[\s\S]*?<!-- \/creator-credit -->/, '');
 html = html.replace('<div class="footer-signature"', `<!-- creator-credit -->${creatorFooter()}<!-- /creator-credit --><div class="footer-signature"`);
 if (!html.includes('href="footer-creator.css"')) html = html.replace('</head>', '<link rel="stylesheet" href="footer-creator.css">\n</head>');
 writeFileSync(path, html);
}
