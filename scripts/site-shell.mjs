import { escape } from './docs-lib.mjs';

// Shared navigation for public inner pages. The homepage keeps its own composition.
export function siteHeader({ prefix = '', section = '' } = {}) {
 const link = (href, label, key, cls = '') => `<a href="${prefix}${href}"${cls ? ` class="${cls}"` : ''}${section === key ? ' aria-current="page"' : ''}>${label}</a>`;
 return `<header class="site-header wrap inner-header"><a class="brand" href="${prefix}index.html" aria-label="DS Loop home" title="Design System Loop"><img class="brand-emblem" src="${prefix}assets/ds-circuit.svg" width="36" height="36" alt="">DS Loop</a><button class="site-menu-toggle" type="button" aria-expanded="false" aria-controls="site-navigation" hidden>Menu<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 6h14M3 14h14"/></svg></button><nav id="site-navigation" class="nav" aria-label="Main">${link('guide/index.html','Guide','guide')}${link('system-example.html','See it in use','examples')}<a href="https://github.com/owaizin/ds-loop">GitHub</a>${link('guide/install.html','Get started','', 'nav-start')}</nav></header>`;
}
export function siteFooter({ prefix = '' } = {}) {
 return `<footer class="site-footer wrap inner-footer"><div><a class="brand" href="${prefix}index.html">DS Loop</a><p>Build a system your team and agents can keep using.</p></div><nav aria-label="Footer"><a href="${prefix}guide/index.html">Guide</a><a href="${prefix}worked-example.html">Worked example</a><a href="${prefix}guide/reference.html">Reference</a><a href="${prefix}style-guide.html">Style guide</a><a href="https://github.com/owaizin/ds-loop/blob/main/LICENSE">MIT license</a></nav></footer>`;
}
export function breadcrumbs(items, prefix = '') {
 return `<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="${prefix}index.html">Home</a>${items.map(({label, href}) => `<span aria-hidden="true">/</span>${href ? `<a href="${href}">${escape(label)}</a>` : `<span aria-current="page">${escape(label)}</span>`}`).join('')}</nav>`;
}
