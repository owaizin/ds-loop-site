// System board study: traces, background parts and the loop clock (six steps, or four with data-stages="4").
(() => {
  const board = document.getElementById('sb-board');
  if (!board) return;
  const NS = 'http://www.w3.org/2000/svg';
  const traces = document.getElementById('sb-traces');
  const debris = document.getElementById('sb-debris');
  const viewport = board.parentElement;
  const steps = [...document.querySelectorAll('.sb-step')];
  const caption = document.getElementById('sb-caption');
  const toggle = document.getElementById('sb-toggle');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Centre lines of each connection, drawn from sender to receiver. [points, chamfer, lanes]
  const CONNS = {
    ask: [[[345, 93], [345, 225]], 0, 3],
    run: [[[420, 312], [442, 312], [442, 290], [465, 290]], 8, 3],
    read: [[[490, 480], [490, 452], [516, 452], [516, 415]], 10, 3],
    report: [[[735, 290], [758, 290], [758, 306], [785, 306]], 8, 3],
    decide: [[[935, 286], [1010, 286], [1010, 566], [945, 566]], 34, 3],
    consult: [[[945, 612], [1050, 612], [1050, 714], [150, 714], [150, 262], [270, 262]], 40, 5],
    edit: [[[270, 318], [196, 318], [196, 560], [225, 560]], 30, 3],
    watch: [[[535, 560], [575, 560]], 0, 3],
    check: [[[700, 485], [700, 415]], 0, 3],
  };
  const BLANK = { asking: '', agent: '', report: '', code: '', decision: '', guard: '', loop: '' };
  // Four stages fold the same traces into Investigate, Consult, Build and Keep healthy.
  const FOUR = board.dataset.stages === '4';
  const STEPS = FOUR ? [
    { on: ['agent', 'engine', 'code'], start: {}, lead: 1900, conns: [['ask', { agent: 'run' }], ['run'], ['read']] },
    { on: ['engine', 'report', 'decisions'], start: {}, conns: [['report', { report: 'found', code: 'warm' }], ['decide', { decision: 'new' }]] },
    { on: ['decisions', 'agent', 'code'], start: { report: 'found', code: 'warm', decision: 'new' },
      conns: [['consult', { agent: 'edit' }], ['edit', { code: 'fixed' }]] },
    { on: ['code', 'guard', 'engine', 'report'], start: { report: 'found', code: 'fixed', decision: 'new' },
      conns: [['watch', { guard: 'on' }], ['check'], ['report', { report: 'clean', code: 'checked', loop: 'closed' }]] },
  ] : [
    { on: ['agent', 'engine'], start: {}, lead: 1900, conns: [['ask', { agent: 'run' }], ['run']] },
    { on: ['code', 'engine'], start: {}, conns: [['read']] },
    { on: ['engine', 'report'], start: {}, conns: [['report', { report: 'found', code: 'warm' }]] },
    { on: ['report', 'decisions'], start: { report: 'found', code: 'warm' }, conns: [['decide', { decision: 'new' }]] },
    { on: ['decisions', 'agent', 'code'], start: { report: 'found', code: 'warm', decision: 'new' },
      conns: [['consult', { agent: 'edit' }], ['edit', { code: 'fixed' }]] },
    { on: ['code', 'guard', 'engine', 'report'], start: { report: 'found', code: 'fixed', decision: 'new' },
      conns: [['watch', { guard: 'on' }], ['check'], ['report', { report: 'clean', code: 'checked', loop: 'closed' }]] },
  ];
  // Sample requests. Slash commands and engine commands are the real ds-loop surface.
  // code: [line, ...] with one [before, after] pair for the flagged line.
  const SCENARIOS = [
    { ask: 'Use our shared Button in billing. Keep the delete action distinct.', skill: '/ds-loop:transform',
      run: ['ds-loop consumers .', '--scope @acme/ui'], edit: ['reuse Button', 'Billing.tsx'],
      file: 'Billing.tsx', ref: 'Billing.tsx:12', decision: 'keep danger variant',
      code: ["import { Button } from '@acme/ui';", 'function DeleteAction() {', ['  return <LocalDelete />;', '  return <Button variant="danger" />;'], '}'],
      text4: ['Your agent reads the project and runs shared-component usage analysis. The engine traces imports and counts shared and local elements.',
        'The report shows billing uses a local control. Your team approves the shared Button and keeps the delete action distinct.',
        'Your agent updates the component and its handlers within the agreed scope.',
        'Your agent reruns usage analysis and tests the interaction. Hooks and CI can repeat the check after later edits.'],
      text: ['Your agent reads the project instructions and runs shared-component usage analysis.',
        'The engine traces supported imports and counts shared and local JSX elements. Unresolved references stay visible.',
        'Your agent uses that evidence to investigate why billing uses a local control.',
        'Your team approves using the shared Button while keeping the distinct delete action.',
        'The agent updates the component and its handlers within the agreed scope. This snippet shows the component choice.',
        'Your agent reruns usage analysis, tests the interaction, and records the results and anything still unchecked.'] },
    { ask: 'Add usage examples for our shared Button.', skill: '/ds-loop:document',
      run: ['ds-loop context .', 'project conventions'], edit: ['add example', 'Button.stories.tsx'],
      file: 'Button.stories.tsx', ref: 'Button.tsx', decision: 'document danger',
      code: ["import { Button } from './Button';", 'export const Delete = () => (', ['  <Button>Delete</Button>', '  <Button variant="danger">Delete</Button>'], ');'],
      text4: ['Your agent reads the component, its props and states, and the project’s documentation conventions.',
        'The report flags the missing delete-action example. Your team confirms when the danger variant applies.',
        'Your agent adds the example in your existing documentation setup.',
        'Your agent runs the build and interaction checks, and records how to use the variant.'],
      text: ['Your agent reads the component and the project’s documentation conventions.',
        'The engine supplies repository context. The agent inspects the actual props, states, and existing examples.',
        'The agent identifies the missing delete-action example and links to the component source.',
        'Your team confirms when the danger variant should be used.',
        'The agent adds the example in the existing documentation setup.',
        'Your agent runs the relevant build and interaction checks and records how to use the variant.'] },
    { ask: 'Connect this hardcoded action color to our existing palette.', skill: '/ds-loop:transform',
      run: ['ds-loop audit .', '--target color'], edit: ['apply decision', 'button.css'],
      file: 'button.css', ref: 'button.css:3', decision: 'use --accent',
      code: ['.button {', '  padding: var(--space-3);', ['  color: #6a3fd1;', '  color: var(--accent);'], '  border-radius: var(--radius-2);', '}'],
      text4: ['Your agent runs a token and styling audit. The engine checks your source locally, without model calls.',
        'The report points to the hardcoded color and its source line. Your team confirms the token and the themes to keep.',
        'Your agent replaces the hardcoded value within the agreed scope.',
        'Your agent reruns the audit and checks both themes. An optional hook flags it if the value comes back.'],
      text: ['Your agent loads the skill and runs a token and styling audit.',
        'The engine checks supported source syntax locally, without model calls.',
        'Findings include source references and coverage limits. Your agent checks the intended color role.',
        'Your team confirms the token to use and the theme choices to preserve.',
        'The agent replaces the hardcoded value within the agreed scope.',
        'Your agent reruns the audit and checks the affected themes. An optional hook can provide feedback after edits.'] },
    { ask: 'Find where our card styles bypass the type scale.', skill: '/ds-loop:diagnose',
      run: ['ds-loop audit .', 'supported styling'], edit: ['apply scale', 'card.css'],
      file: 'card.css', ref: 'card.css:3', decision: 'use --text-md',
      code: ['.card-title {', '  line-height: 1.3;', ['  font-size: 15px;', '  font-size: var(--text-md);'], '  font-weight: 600;', '}'],
      text4: ['Your agent reads your type conventions. The engine finds hardcoded values in supported styles.',
        'The report compares them with your type scale. Your team picks the token and records any size that stays different.',
        'Your agent updates the agreed styles and leaves intentional exceptions in place.',
        'Your agent reruns the audit, checks text wrapping, and leaves notes. CI can keep the scale from drifting back.'],
      text: ['Your agent reads the type conventions and runs an audit.',
        'The engine extracts supported declarations and reports hardcoded styling values.',
        'Source references let your agent compare the findings with the intended type scale.',
        'Your team chooses the token and records any size that needs to stay different.',
        'The agent updates the agreed styles and leaves intentional exceptions in place.',
        'Your agent reruns the audit, checks text wrapping in the affected screens, and leaves review notes.'] },
  ];
  const $ = (id) => document.getElementById(id);
  const tabs = [...document.querySelectorAll('.sb-scenario')];
  const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const tint = (t) => esc(t).replace(/(var\([^)]+\)|#[0-9a-f]{3,8}\b|\d+px|\b\d+\b|"[^"]*")/gi, '<em>$1</em>');
  function useScenario(s) {
    $('sb-ask-cmd').textContent = s.skill;
    $('sb-ask-text').innerHTML = s.ask.split(' ').map((w, i) => `<span class="sb-w" style="--i:${i}">${esc(w)}</span>`).join(' ');
    $('sb-run').textContent = s.run[0];
    $('sb-edit').textContent = s.edit[0];
    $('sb-file').textContent = s.file;
    $('sb-ref').textContent = s.ref;
    $('sb-decision').textContent = s.decision;
    $('sb-code').innerHTML = s.code.map((line) => Array.isArray(line)
      ? `<span class="sb-ln sb-ln--flag"><span class="sb-old">${tint(line[0])}</span><span class="sb-new">${tint(line[1])}</span><span class="sb-ok"></span></span>`
      : `<span class="sb-ln">${tint(line)}</span>`).join('');
  }

  const el = (name, attrs, parent) => {
    const node = document.createElementNS(NS, name);
    for (const k in attrs) node.setAttribute(k, attrs[k]);
    parent?.appendChild(node);
    return node;
  };

  // Cut each corner at 45 degrees, then offset the whole line so parallel lanes stay parallel.
  function chamfer(pts, r) {
    if (!r) return pts;
    const out = [pts[0]];
    for (let i = 1; i < pts.length - 1; i++) {
      const [a, p, b] = [pts[i - 1], pts[i], pts[i + 1]];
      const lin = Math.hypot(p[0] - a[0], p[1] - a[1]);
      const lout = Math.hypot(b[0] - p[0], b[1] - p[1]);
      const k = Math.min(r, lin / 2.5, lout / 2.5);
      out.push([p[0] - (p[0] - a[0]) / lin * k, p[1] - (p[1] - a[1]) / lin * k]);
      out.push([p[0] + (b[0] - p[0]) / lout * k, p[1] + (b[1] - p[1]) / lout * k]);
    }
    out.push(pts.at(-1));
    return out;
  }
  function offset(pts, d) {
    const normals = pts.slice(1).map((b, i) => {
      const a = pts[i], len = Math.hypot(b[0] - a[0], b[1] - a[1]);
      return [-(b[1] - a[1]) / len, (b[0] - a[0]) / len];
    });
    return pts.map((p, i) => {
      const n0 = normals[Math.max(0, i - 1)], n1 = normals[Math.min(normals.length - 1, i)];
      const m = d / (1 + n0[0] * n1[0] + n0[1] * n1[1]);
      return [p[0] + (n0[0] + n1[0]) * m, p[1] + (n0[1] + n1[1]) * m];
    });
  }
  const toPath = (pts) => 'M' + pts.map((p) => p.map((v) => +v.toFixed(2)).join(' ')).join('L');

  const TAIL = 110, HEAD = 16, AMBIENT = 9000;
  const segments = [];
  const lanesGroup = el('g', {}, traces);
  // Pulses carry the DS spectrum, warming to Ember orange, laid across the board so colour shifts as they travel.
  const grad = el('linearGradient', { id: 'sb-trace-spectrum', x1: 150, y1: 0, x2: 1050, y2: 0, gradientUnits: 'userSpaceOnUse' }, el('defs', {}, traces));
  [['0', '#9fe9ed'], ['.3', '#a6b9ff'], ['.6', '#b9a0ff'], ['.82', '#d0b4f6'], ['1', '#ff743d']].forEach(([o, c]) => el('stop', { offset: o, 'stop-color': c }, grad));
  const pulseGroup = el('g', { class: 'sb-pulses' }, traces);
  const conns = {};
  for (const [id, [pts, r, lanes]] of Object.entries(CONNS)) {
    const g = el('g', { class: 'sb-conn' }, lanesGroup);
    const centre = chamfer(pts, r);
    const pulses = [];
    for (let i = 0; i < lanes; i++) {
      const k = i - (lanes - 1) / 2;
      const lane = offset(centre, k * 6);
      el('path', { d: toPath(lane), class: Math.abs(k) > 1 ? 'sb-lane sb-lane--far' : 'sb-lane' }, g);
      for (const p of [lane[0], lane.at(-1)]) el('rect', { x: p[0] - 2, y: p[1] - 2, width: 4, height: 4, class: 'sb-pad' }, g);
      lane.slice(1).forEach((b, j) => segments.push([lane[j], b]));
      if (Math.abs(k) <= 1) pulses.push(lane);
    }
    // One comet per inner lane, centre first, outer lanes trailing slightly.
    const comets = pulses.map((lane, j) => {
      const d = toPath(lane);
      const tail = el('path', { d, class: 'sb-pulse sb-pulse--tail' }, pulseGroup);
      const head = el('path', { d, class: 'sb-pulse sb-pulse--head' }, pulseGroup);
      const len = tail.getTotalLength();
      tail.style.strokeDasharray = `${TAIL} ${len + 400}`;
      head.style.strokeDasharray = `${HEAD} ${len + 400}`;
      return { tail, head, len, lag: Math.abs(j - (pulses.length - 1) / 2) * 90 };
    });
    const len = comets[0].len;
    conns[id] = { g, comets, len, dur: Math.max(1000, len / 0.55), phase: Object.keys(conns).length * 1730 };
  }
  // Draw comets at progress p (0 → 1 crosses the whole path, then drains).
  function comet(conn, ms, alpha) {
    for (const c of conn.comets) {
      const p = (ms - c.lag) / conn.dur;
      if (p < 0 || p > 1) continue;
      // Request pulses ease in and out like something being sent; ambient traffic stays linear.
      const e = alpha < 1 ? p : p < .5 ? 4 * p ** 3 : 1 - (2 - 2 * p) ** 3 / 2;
      const s = e * (c.len + TAIL);
      c.tail.style.opacity = c.head.style.opacity = alpha;
      c.tail.style.strokeDashoffset = TAIL - s;
      c.head.style.strokeDashoffset = HEAD - s;
    }
  }

  // Background parts: seeded so the board is identical on every load.
  (function scatter() {
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
    const keepOut = [...board.querySelectorAll('.sb-chip, .sb-tag')].map((n) => {
      const x = parseFloat(n.style.left), y = parseFloat(n.style.top);
      const w = n.offsetWidth || 150, h = n.offsetHeight || 26;
      return n.classList.contains('sb-tag') ? [x - w / 2 - 12, y - 10, w + 24, h + 20] : [x - 18, y - 18, w + 36, h + 36];
    });
    keepOut.push([210, 14, 780, 98]);
    const hit = (b, list) => list.some(([x, y, w, h]) => b[0] < x + w && b[0] + b[2] > x && b[1] < y + h && b[1] + b[3] > y);
    const nearTrace = ([x, y, w, h]) => {
      const cx = x + w / 2, cy = y + h / 2, reach = Math.max(w, h) / 2 + 8;
      return segments.some(([a, b]) => {
        const dx = b[0] - a[0], dy = b[1] - a[1];
        const t = Math.max(0, Math.min(1, ((cx - a[0]) * dx + (cy - a[1]) * dy) / (dx * dx + dy * dy || 1)));
        return Math.hypot(cx - a[0] - t * dx, cy - a[1] - t * dy) < reach;
      });
    };
    // Design-spec marks instead of electronic parts: redlines, swatches, specimens, rulers, selections.
    const SPECTRUM = ['#9fe9ed', '#a6b9ff', '#d0b4f6', '#f2c6cf'];
    const text = (t, attrs, g) => { const n = el('text', attrs, g); n.textContent = t; return n; };
    const motifs = [
      // Spacing redline with its value.
      (g) => { const v = [4, 8, 12, 16, 24, 32][rand() * 6 | 0], w = v * 2 + 14;
        g.setAttribute('color', '#f2c6cf');
        el('rect', { x: 0, y: 3, width: 1, height: 7 }, g); el('rect', { x: w - 1, y: 3, width: 1, height: 7 }, g); el('rect', { x: 0, y: 6, width: w, height: 1 }, g);
        text(String(v), { x: w / 2, y: 20, 'text-anchor': 'middle', class: 'sb-spec-num' }, g); return [w, 22, false]; },
      // Token swatches.
      (g) => { const n = 3 + (rand() * 2 | 0); for (let i = 0; i < n; i++) el('rect', { x: i * 13, y: 0, width: 10, height: 10, rx: 2.5, fill: SPECTRUM[i % 4] }, g); return [n * 13, 10, false]; },
      // Type specimen.
      (g) => { text('Aa', { x: 0, y: 14, class: 'sb-spec-type' }, g); text(['14/20', '16/24', '20/28', '12/16'][rand() * 4 | 0], { x: 26, y: 13, class: 'sb-spec-num' }, g); return [56, 16, false]; },
      // Ruler segment.
      (g) => { const n = 10 + (rand() * 14 | 0); for (let i = 0; i <= n; i++) el('rect', { x: i * 4, y: 0, width: 1, height: i % 5 ? 3 : 7 }, g); return [n * 4 + 1, 7, true]; },
      // Selection frame with handles.
      (g) => { const w = 22 + (rand() * 18 | 0), h = 14 + (rand() * 12 | 0);
        el('rect', { x: .5, y: .5, width: w, height: h, fill: 'none', stroke: 'currentColor', 'stroke-dasharray': '2 2' }, g);
        for (const [x, y] of [[0, 0], [w, 0], [0, h], [w, h]]) el('rect', { x: x - 1.5, y: y - 1.5, width: 4, height: 4 }, g); return [w + 3, h + 3, false]; },
      // Registration mark.
      (g) => { el('circle', { cx: 7, cy: 7, r: 4.5, fill: 'none', stroke: 'currentColor' }, g); el('rect', { x: 0, y: 6.5, width: 14, height: 1 }, g); el('rect', { x: 6.5, y: 0, width: 1, height: 14 }, g); return [14, 14, false]; },
      // Grid dots.
      (g) => { for (let i = 0; i < 9; i++) el('rect', { x: (i % 3) * 6, y: (i / 3 | 0) * 6, width: 1.5, height: 1.5 }, g); return [14, 14, false]; },
    ];
    const placed = [];
    for (let tries = 0; tries < 900 && placed.length < 64; tries++) {
      const x = 40 + rand() * 1120, y = 30 + rand() * 700;
      const g = el('g', {}, debris);
      const [w, h, turn] = motifs[rand() * motifs.length | 0](g);
      const box = [x - 6, y - 6, w + 12, h + 12];
      const dn = Math.hypot((x - 600) / 590, (y - 420) / 380);
      if (dn > 1 || hit(box, keepOut) || hit(box, placed) || nearTrace(box)) { g.remove(); continue; }
      placed.push(box);
      const fade = 1 - Math.min(1, Math.max(0, (dn - .45) / .55));
      g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})${turn && rand() < .4 ? ` rotate(90 ${w / 2} ${h / 2})` : ''}`);
      g.setAttribute('fill', 'currentColor');
      g.setAttribute('opacity', ((.12 + rand() * .2) * fade + .04).toFixed(2));
    }
  })();

  // Timeline: one clock; every frame derives the board from it, so pause and seek are trivial.
  // Each request plays the whole loop once, then the next request takes over.
  // PRE: quiet beat before the words arrive. WORDS: their staggered fade. OUT: soft exit before the next request.
  const HOLD = 1000, GAP = 100, PRE = 300, WORDS = 1200, OUT = 500;
  for (const s of STEPS) {
    let t = s.lead || 160;
    s.timed = s.conns.map(([id, state]) => { const c = { id, state, at: t, dur: conns[id].dur }; t += c.dur + GAP; return c; });
    s.dur = t + HOLD;
  }
  const starts = STEPS.reduce((a, s, i) => (a.push(i ? a[i - 1] + STEPS[i - 1].dur : 0), a), []);
  const total = starts.at(-1) + STEPS.at(-1).dur;
  const span = total * SCENARIOS.length;

  let time = 0, playing = !reduce, inView = true, current = -1, scene = -1, last = performance.now(), stateKey = '';
  function render() {
    const all = ((time % span) + span) % span;
    const n = Math.floor(all / total), t = all - n * total, sc = SCENARIOS[n];
    if (n !== scene) {
      scene = n;
      stateKey = '';
      current = -1;
      useScenario(sc);
      tabs.forEach((b, j) => b.setAttribute('aria-pressed', String(j === n)));
    }
    let i = STEPS.length - 1;
    while (starts[i] > t) i--;
    const step = STEPS[i], local = t - starts[i];
    if (i !== current) {
      current = i;
      steps.forEach((b, j) => b.setAttribute('aria-pressed', String(j === i)));
      caption.textContent = (FOUR ? sc.text4 : sc.text)[i];
      if (playing) caption.animate([{ opacity: 0, filter: 'blur(4px)' }, { opacity: 1, filter: 'blur(0)' }], { duration: 500, easing: 'cubic-bezier(.23,1,.32,1)' });
      for (const node of board.querySelectorAll('.sb-chip, .sb-tag')) node.classList.toggle('is-on', step.on.includes(node.dataset.chip || node.dataset.tag));
    }
    steps[i].style.setProperty('--p', Math.min(1, local / step.dur).toFixed(4));
    const state = { ...BLANK, ...step.start };
    // The request fades in word by word, its skill appears, then it is sent to the agent.
    state.asking = i ? 'sent' : local < PRE ? '' : local < PRE + WORDS ? 'shown' : local < step.timed[0].at ? 'typed' : 'sent';
    const lit = new Set();
    for (const c of Object.values(conns)) for (const m of c.comets) m.head.style.opacity = m.tail.style.opacity = 0;
    // Quiet background traffic on traces the current step is not using.
    const busy = new Set(step.timed.map((c) => c.id));
    // Hold the circuit still while the request arrives up top, then let traffic fade back in.
    const sent = i ? Infinity : local - step.timed[0].at;
    const calm = Math.max(0, Math.min(1, sent / 1200, (total - OUT - t) / OUT)) * .28;
    if (calm) for (const [id, c] of Object.entries(conns)) if (!busy.has(id)) comet(c, ((t + c.phase) % AMBIENT) * .7, calm);
    for (const c of step.timed) {
      const conn = conns[c.id], p = (local - c.at) / c.dur;
      comet(conn, local - c.at, 1);
      if (p >= .85) { Object.assign(state, c.state); }
      if (p >= .15) lit.add(c.id);
    }
    if (i) lit.add('ask');
    // Last beat: the whole board settles back so the next request starts clean.
    if (t > total - OUT) { Object.assign(state, BLANK, { asking: 'out' }); lit.clear(); }
    for (const [id, c] of Object.entries(conns)) c.g.classList.toggle('is-lit', lit.has(id));
    const key = JSON.stringify(state);
    if (key !== stateKey) {
      stateKey = key;
      for (const k in state) board.dataset[k] = state[k];
      if (state.agent) $('sb-arg').textContent = state.agent === 'edit' ? sc.edit[1] : sc.run[1];
    }
  }
  function frame(now) {
    const dt = Math.min(50, now - last);
    last = now;
    if (playing && inView && !document.hidden) { time += dt; render(); }
    requestAnimationFrame(frame);
  }

  // Paused or reduced motion: show a step's finished state rather than a frozen pulse.
  const seek = (n, i) => {
    caption.setAttribute('aria-live', 'polite');
    time = n * total + (playing ? starts[i] : starts[i] + STEPS[i].dur - HOLD / 2);
    render();
  };
  steps.forEach((b, i) => b.addEventListener('click', () => seek(scene, i)));
  tabs.forEach((b, n) => b.addEventListener('click', () => seek(n, playing ? 0 : STEPS.length - 1)));
  toggle.addEventListener('click', () => {
    playing = !playing;
    toggle.textContent = playing ? 'Pause' : 'Play';
    toggle.setAttribute('aria-pressed', String(!playing));
  });
  if (!playing) { toggle.textContent = 'Play'; toggle.setAttribute('aria-pressed', 'true'); time = STEPS[0].dur - HOLD / 2; }

  new IntersectionObserver(([e]) => { inView = e.isIntersecting; }).observe(viewport);
  // Fit by width and by height, so tabs, board, steps and caption all fit in one screen.
  const fit = () => viewport.style.setProperty('--s', Math.max(.3, Math.min(1, viewport.clientWidth / 1080, (innerHeight - 230) / 760)).toFixed(4));
  new ResizeObserver(fit).observe(viewport);
  addEventListener('resize', fit);
  render();
  requestAnimationFrame(frame);
})();
