import { escape } from './docs-lib.mjs';

// Shared navigation for public inner pages. The homepage keeps its own composition.
export function siteHeader({ prefix = '', section = '' } = {}) {
 const link = (href, label, key, cls = '') => `<a href="${prefix}${href}"${cls ? ` class="${cls}"` : ''}${section === key ? ' aria-current="page"' : ''}>${label}</a>`;
 return `<header class="site-header wrap inner-header"><a class="brand" href="${prefix}index.html" aria-label="DS Loop home" title="Design System Loop"><picture class="brand-art"><source media="(max-width: 760px)" srcset="${prefix}assets/branding/ds-loop-logo-fullname-2line-dark.svg"><img class="brand-lockup" src="${prefix}assets/branding/ds-loop-logo-fullname-line-dark.svg" width="234" height="42" alt="Design System Loop"></picture></a><button class="site-menu-toggle" type="button" aria-expanded="false" aria-controls="site-navigation" hidden>Menu<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 6h14M3 14h14"/></svg></button><nav id="site-navigation" class="nav" aria-label="Main">${link('guide/index.html','Guide','guide')}${link('system-example.html','See it in use','examples')}<a href="https://github.com/owaizin/ds-loop">GitHub</a>${link('guide/install.html','Get started','', 'nav-start')}</nav></header>`;
}
export function creatorFooter() {
 return `<div class="footer-creator"><p>Built by <a href="https://owaiz.in/" target="_blank" rel="noopener">Mohammad Owaiz Shaik</a> <span>— a design leader working across products, design systems, and code.</span></p><nav class="creator-links" aria-label="About the creator"><a href="https://owaiz.in/" target="_blank" rel="noopener">owaiz.in <span aria-hidden="true">↗</span></a><a href="https://www.linkedin.com/in/owaizin/" target="_blank" rel="noopener">LinkedIn <span aria-hidden="true">↗</span></a><a href="https://github.com/owaizin" target="_blank" rel="noopener">GitHub <span aria-hidden="true">↗</span></a></nav></div>`;
}

export function siteFooter({ prefix = '' } = {}) {
 return `<footer class="site-footer wrap inner-footer"><div><a class="brand" href="${prefix}index.html"><img class="brand-lockup brand-lockup-stacked" src="${prefix}assets/branding/ds-loop-logo-fullname-2line-dark.svg" width="217" height="56" alt="Design System Loop"></a><p>Build a system your team and agents can keep using.</p></div><nav aria-label="Footer"><a href="${prefix}guide/index.html">Guide</a><a href="${prefix}worked-example.html">Worked example</a><a href="${prefix}guide/reference.html">Reference</a><a href="${prefix}style-guide.html">Style guide</a><a href="https://github.com/owaizin/ds-loop/blob/main/LICENSE" target="_blank" rel="noopener">MIT license</a></nav>${creatorFooter()}</footer>`;
}
export function breadcrumbs(items, prefix = '') {
 return `<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="${prefix}index.html">Home</a>${items.map(({label, href}) => `<span aria-hidden="true">/</span>${href ? `<a href="${href}">${escape(label)}</a>` : `<span aria-current="page">${escape(label)}</span>`}`).join('')}</nav>`;
}
