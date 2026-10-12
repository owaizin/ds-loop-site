for (const specimenFrame of document.querySelectorAll('[data-specimen-frame]')) {
  let observer;
  const fit = () => {
    observer?.disconnect();
    const content = specimenFrame.contentDocument?.querySelector('main');
    if (!content) return;
    const resize = () => {
      specimenFrame.style.height = `${Math.ceil(content.getBoundingClientRect().height) + 2}px`;
    };
    resize();
    if ('ResizeObserver' in window) {
      observer = new ResizeObserver(resize);
      observer.observe(content);
    }
  };
  specimenFrame.addEventListener('load', fit);
  fit();
}

const loopSteps = {
  measure: {
    owner: 'Your agent + local checks',
    title: 'Find the system work that matters.',
    copy: 'Your agent reads the product code and existing decisions, then uses supported checks to establish facts. The assessment explains the problem, its evidence, and what still needs inspection.',
    link: 'See the evidence',
    href: '#delivery-report',
  },
  decide: {
    owner: 'Your team + agent',
    title: 'Agree on a useful, bounded change.',
    copy: 'Your agent recommends what to reuse, what to improve, and what to preserve. Agree on the affected workflows and how you will know the result works before implementation begins.',
    link: 'Read the example decision',
    href: 'worked-example.html#picture-title',
  },
  verify: {
    owner: 'Your coding agent',
    title: 'Put the decision into product code.',
    copy: 'Build missing foundations or adopt the components you already have. Your agent carries the authorized changes into the agreed workflows and updates the guidance alongside the code.',
    link: 'Inspect the applied change',
    href: 'worked-example.html#source',
  },
  retain: {
    owner: 'Your agent + team review',
    title: 'Check the result. Leave a usable handoff.',
    copy: 'Rerun relevant checks and inspect the affected states, themes, and behavior. Retain the decision, usage guidance, and remaining limits where the next contributor can find them.',
    link: 'Inspect the checks and handoff',
    href: 'worked-example.html#checks',
  },
};
const loopButtons = [...document.querySelectorAll('[data-loop-step]')];
const loopRecords = [
  {
    stage: '01 / INVESTIGATE',
    title: 'Find the theme mismatch.',
    labelA: 'Finding',
    valueA: 'Action uses a literal',
    labelB: 'Source',
    valueB: 'before.css:7',
  },
  {
    stage: '02 / DECIDE',
    title: 'Preserve the theme choices.',
    labelA: 'Convention',
    valueA: 'Action follows palette',
    labelB: 'Keep',
    valueB: 'Light + dark colors',
  },
  {
    stage: '03 / IMPLEMENT',
    title: 'Connect the action role.',
    labelA: 'Change',
    valueA: 'Two declarations',
    labelB: 'Adopt',
    valueB: 'Existing theme palette',
  },
  {
    stage: '04 / VERIFY & RETAIN',
    title: 'Check it. Keep the decision.',
    labelA: 'Review',
    valueA: 'Themes + keyboard',
    labelB: 'Handoff',
    valueB: 'Decision + check limits',
  },
];

if (loopButtons.length) {
  const stageDuration = 6000;
  const instrument = document.querySelector('.loop-instrument, .restored-loop-instrument');
  const progress = instrument.querySelector('.track-progress, .restored-track-progress');
  const explanation = document.getElementById('loop-explanation');
  const recordContent = document.querySelector('.record-content, .restored-record-content');
  const playback = document.getElementById('loop-playback');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let userPaused = reducedMotion.matches;
  let inView = false;
  let activeIndex = 0;
  let timer;
  let fade;

  // One animation clock drives both the traveling highlight and the panel stages.
  const makeClock = () =>
    progress.animate(
      [{ strokeDashoffset: '0' }, { strokeDashoffset: reducedMotion.matches ? '0' : '-100' }],
      {
        duration: stageDuration * loopButtons.length,
        iterations: Number.POSITIVE_INFINITY,
        easing: 'linear',
      },
    );
  let clock = makeClock();
  clock.pause();
  const traces = loopButtons.map((button) => {
    const outline = button.querySelector('.stop-trace rect');
    if (!outline) return null;
    const animation = outline.animate([{ strokeDashoffset: '100' }, { strokeDashoffset: '0' }], {
      duration: stageDuration,
      fill: 'both',
      easing: 'linear',
    });
    animation.pause();
    return animation;
  });
  const syncTraces = () => {
    const time = Number(clock.currentTime) || 0;
    const index = Math.floor(time / stageDuration) % loopButtons.length;
    for (const [candidate, trace] of traces.entries()) {
      if (!trace) continue;
      trace.pause();
      trace.currentTime = reducedMotion.matches
        ? stageDuration
        : candidate === index
          ? time % stageDuration
          : 0;
      if (candidate === index && clock.playState === 'running' && !reducedMotion.matches) trace.play();
    }
  };

  const showStep = (index, manual = false, animate = true) => {
    activeIndex = index;
    const step = loopSteps[loopButtons[index].dataset.loopStep];
    const record = loopRecords[index];
    explanation.setAttribute('aria-live', manual ? 'polite' : 'off');
    for (const [candidateIndex, candidate] of loopButtons.entries()) {
      candidate.setAttribute('aria-pressed', String(candidateIndex === index));
    }
    document.getElementById('loop-owner').textContent = step.owner;
    document.getElementById('loop-detail-title').textContent = step.title;
    document.getElementById('loop-detail-copy').textContent = step.copy;
    const link = document.getElementById('loop-detail-link');
    link.firstChild.textContent = `${step.link} `;
    link.href = step.href;
    for (const [id, value] of Object.entries({
      'record-stage': record.stage,
      'record-title': record.title,
      'record-label-a': record.labelA,
      'record-value-a': record.valueA,
      'record-label-b': record.labelB,
      'record-value-b': record.valueB,
    }))
      document.getElementById(id).textContent = value;
    fade?.cancel();
    if (animate && !reducedMotion.matches) {
      fade = recordContent.animate([{ opacity: 0.35 }, { opacity: 1 }], {
        duration: 180,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      });
    }
  };
  const schedule = () => {
    clearTimeout(timer);
    if (clock.playState !== 'running') return;
    const time = Number(clock.currentTime) || 0;
    const index = Math.floor(time / stageDuration) % loopButtons.length;
    if (index !== activeIndex) showStep(index);
    syncTraces();
    timer = setTimeout(schedule, stageDuration - (time % stageDuration) + 24);
  };
  const syncPlayback = () => {
    const running = !userPaused && inView && !document.hidden;
    if (running) clock.play();
    else clock.pause();
    syncTraces();
    playback.classList.toggle('is-paused', userPaused);
    playback.title = userPaused ? 'Play loop animation' : 'Pause loop animation';
    playback.setAttribute('aria-label', userPaused ? 'Play loop animation' : 'Pause loop animation');
    schedule();
  };

  for (const [index, button] of loopButtons.entries()) {
    button.disabled = false;
    button.addEventListener('click', (event) => {
      clock.currentTime = index * stageDuration;
      showStep(index, true, event.detail !== 0);
      syncTraces();
      schedule();
    });
  }
  playback.addEventListener('click', () => {
    userPaused = !userPaused;
    syncPlayback();
  });
  document.addEventListener('visibilitychange', syncPlayback);
  reducedMotion.addEventListener('change', () => {
    const time = clock.currentTime;
    clock.cancel();
    clock = makeClock();
    clock.currentTime = time;
    userPaused = reducedMotion.matches;
    syncPlayback();
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.15 },
    ).observe(instrument);
  } else {
    inView = true;
    syncPlayback();
  }
  showStep(0, false, false);
}

// Embedded specimens resize during load. Restore deep links once those sizes settle,
// unless the visitor has already started interacting with the page.
let interactedDuringLoad = false;
for (const event of ['pointerdown', 'wheel', 'keydown', 'touchstart']) {
  window.addEventListener(
    event,
    () => {
      interactedDuringLoad = true;
    },
    { once: true, passive: true },
  );
}
window.addEventListener(
  'load',
  () => {
    if (interactedDuringLoad || !window.location.hash) return;
    let id;
    try {
      id = decodeURIComponent(window.location.hash.slice(1));
    } catch {
      return;
    }
    const target = document.getElementById(id);
    if (target) requestAnimationFrame(() => target.scrollIntoView({ block: 'start', behavior: 'instant' }));
  },
  { once: true },
);

// Keep the upright loop separate from the wide, foreshortened background plane.
const loopSurface = document.querySelector('.loop-instrument');
if (loopSurface) {
  const narrow = matchMedia('(max-width: 760px)');
  const track = loopSurface.querySelector('.loop-track');
  const field = loopSurface.querySelector('.orbital-field');
  const paths = [
    ...track.querySelectorAll('.track-extrusion,.track-aura,.track-body,.track-center,.track-progress'),
  ];
  const desktopPath = paths[0].getAttribute('d');
  const mobilePath =
    'M128 150H272C330 150 364 190 364 250V550C364 610 330 650 272 650H128C70 650 36 610 36 550V250C36 190 70 150 128 150Z';
  const fitGeometry = () => {
    const mobile = narrow.matches;
    const viewBox = mobile ? '0 0 400 800' : '0 0 1000 660';
    track.setAttribute('viewBox', viewBox);
    field.setAttribute('viewBox', mobile ? '0 0 400 800' : '0 0 1200 660');
    field
      .querySelector('#plane-spectrum')
      .setAttribute('gradientTransform', mobile ? 'translate(0 0)' : 'translate(100 0)');
    const spectrum = track.querySelector('#spectrum');
    for (const [name, value] of Object.entries(
      mobile ? { x1: '36', y1: '650', x2: '364', y2: '150' } : { x1: '130', y1: '430', x2: '870', y2: '90' },
    ))
      spectrum.setAttribute(name, value);
    for (const path of paths) path.setAttribute('d', mobile ? mobilePath : desktopPath);
    for (const arc of field.querySelectorAll('[data-orbit-front]')) {
      arc.setAttribute('d', mobile ? 'M12 560a188 71 0 0 0 376 0' : 'M20 330a580 218 0 0 0 1160 0');
    }
    for (const ellipse of field.querySelectorAll('[data-orbit-scale]')) {
      const scale = Number(ellipse.dataset.orbitScale);
      ellipse.setAttribute('cx', mobile ? '200' : '600');
      ellipse.setAttribute('cy', mobile ? '560' : '330');
      ellipse.setAttribute('rx', String((mobile ? 188 : 580) * scale));
      ellipse.setAttribute('ry', String((mobile ? 71 : 218) * scale));
    }
  };
  narrow.addEventListener('change', fitGeometry);
  fitGeometry();
}
