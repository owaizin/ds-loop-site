import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import path from 'node:path';
export const escape = (s) => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
export const slug = (s) => s.toLowerCase().replace(/<[^>]*>/g, '').replace(/[^\p{L}\p{N}\s_-]/gu, '').trim().replace(/\s+/g, '-');
export const pageName = (name) => name === 'README.md' ? 'index.html' : name.replace(/\.md$/, '.html');
export function renderMarkdown(source, file, files, version) {
  const ids = new Map();
  const renderer = new marked.Renderer();
  renderer.heading = function ({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    const base = slug(text); const n = ids.get(base) || 0; ids.set(base, n + 1);
    return `<h${depth} id="${base}${n ? `-${n}` : ''}">${text}</h${depth}>\n`;
  };
  renderer.link = function ({ href, title, tokens }) {
    if (!/^[a-z]+:|^#|^\/\//i.test(href)) {
      const [name, fragment] = href.split('#');
      const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(file), name));
      href = files.includes(resolved) ? `${pageName(resolved)}${fragment ? `#${fragment}` : ''}`
        : `https://www.npmjs.com/package/ds-loop/v/${version}?activeTab=code`;
    }
    return `<a href="${escape(href)}"${title ? ` title="${escape(title)}"` : ''}>${this.parser.parseInline(tokens)}</a>`;
  };
  return sanitizeHtml(marked.parse(source, { renderer }), { allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img'], allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, '*': ['id'], code: ['class'], img: ['src', 'alt'] } });
}
