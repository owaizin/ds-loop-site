const frames = {
  current: document.getElementById('current-frame'),
  edited: document.getElementById('edited-frame'),
};
const inputs = [...document.querySelectorAll('[name="copy"]')];
const openLink = document.querySelector('.open-version');
const status = document.getElementById('comparison-status');
const highlight = document.getElementById('highlight-changes');
const copySelector = '[data-copy-key]';
const normalize = value => value.replace(/\s+/g, ' ').trim();
function markChanges() {
  const docs = [frames.current.contentDocument, frames.edited.contentDocument];
  if (docs.some(doc => !doc?.querySelector('#hero-title'))) return;
  const originals = [...docs[0].querySelectorAll(copySelector)];
  const edits = [...docs[1].querySelectorAll(copySelector)];
  const editMap = new Map(edits.map(el => [el.dataset.copyKey, el]));
  const originalMap = new Map(originals.map(el => [el.dataset.copyKey, el]));
  for (const [nodes, other, label] of [[originals, editMap, 'Claude version'], [edits, originalMap, 'Current site']]) {
    nodes.forEach(node => {
      const counterpart = other.get(node.dataset.copyKey);
      const changed = !counterpart || normalize(node.textContent) !== normalize(counterpart.textContent);
      node.classList.toggle('copy-change', changed);
      if (changed) node.title = counterpart ? `${label}: ${normalize(counterpart.textContent)}` : `Only in this version.`;
      else node.removeAttribute('title');
    });
  }
  docs.forEach(doc => {
    if (!doc.getElementById('copy-highlight-style')) {
      const style = doc.createElement('style');
      style.id = 'copy-highlight-style';
      style.textContent = '.copy-highlights .copy-change{outline:1px dashed #dfb86699;outline-offset:5px;background-color:#dfb8660a}';
      doc.head.append(style);
    }
    doc.documentElement.classList.toggle('copy-highlights', highlight.checked);
  });
}
highlight.addEventListener('change', markChanges);
Object.values(frames).forEach(frame => frame.addEventListener('load', markChanges));
let active = 'current';
let revision = 0;
const sections = frame => [...frame.contentDocument.querySelectorAll('header.site-header, [data-preview-block], footer')].filter(el => el.getClientRects().length);
function capture(frame) {
  const blocks = sections(frame);
  const scroll = frame.contentWindow.scrollY;
  let index = blocks.findLastIndex(block => block.getBoundingClientRect().top <= 1);
  if (index < 0) index = 0;
  const block = blocks[index];
  return {
    index,
    key: block?.dataset.previewBlock,
    tag: block?.tagName,
    offset: block ? (scroll - (block.getBoundingClientRect().top + scroll)) / block.getBoundingClientRect().height : 0,
    loop: frame.contentDocument.querySelector('[data-loop-step][aria-pressed="true"]')?.dataset.loopStep,
    report: frame.contentDocument.querySelector('.report-navigation [aria-selected="true"]')?.id,
    details: [...frame.contentDocument.querySelectorAll('.home-faq details')].map(el => el.open),
  };
}
async function select(value, updateUrl = true) {
  const turn = ++revision;
  const previous = frames[active];
  const next = frames[value];
  let position;
  try { position = capture(previous); } catch { /* A preview may be navigating to a linked page. */ }
  active = value;
  inputs.forEach(input => { input.checked = input.value === value; });
  previous.hidden = previous !== next;
  next.hidden = false;
  openLink.href = value === 'edited' ? 'copy-claude.html' : 'copy-claude-current.html';
  status.textContent = value === 'edited' ? 'Showing Claude’s suggested copy and flow.' : 'Showing the current homepage snapshot.';
  if (updateUrl) {
    const url = new URL(location.href);
    url.searchParams.set('copy', value);
    history.replaceState(null, '', url);
  }
  if (next.contentDocument?.readyState !== 'complete') {
    await new Promise(resolve => next.addEventListener('load', resolve, { once: true }));
  }
  await next.contentDocument?.fonts?.ready;
  markChanges();
  if (turn !== revision || !position) return;
  const doc = next.contentDocument;
  if (position.loop) doc.querySelector(`[data-loop-step="${position.loop}"]`)?.click();
  if (position.report) doc.getElementById(position.report)?.click();
  doc.querySelectorAll('.home-faq details').forEach((el, i) => { el.open = position.details[i] || false; });
  requestAnimationFrame(() => requestAnimationFrame(() => {
    if (turn !== revision) return;
    let block = position.key ? next.contentDocument.querySelector(`[data-preview-block="${position.key}"]`) : next.contentDocument.querySelector(position.tag === 'FOOTER' ? 'footer' : 'header.site-header');
    if (!block || !block.getClientRects().length) block = next.contentDocument.getElementById('start');
    if (!block) return;
    const rect = block.getBoundingClientRect();
    next.contentWindow.scrollTo({ top: rect.top + next.contentWindow.scrollY + rect.height * position.offset, behavior: 'instant' });
  }));
}
inputs.forEach(input => input.addEventListener('change', () => select(input.value)));
if (new URL(location.href).searchParams.get('copy') === 'edited') select('edited', false);
