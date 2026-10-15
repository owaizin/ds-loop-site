const reportStage = document.querySelector('.report-workbench');
if (reportStage) {
  const tabs = [...reportStage.querySelectorAll('[role="tab"]')];
  const panels = [...reportStage.querySelectorAll('[role="tabpanel"]')];
  const motion = document.getElementById('report-motion');
  const caption = document.getElementById('report-scene-caption');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const narrow = matchMedia('(max-width: 760px)');
  const resultFrame = reportStage.querySelector('.result-scene iframe');
  let resultObserver;
  const fitResult = () => {
    const content = resultFrame.contentDocument?.querySelector('main');
    if (content && content.getBoundingClientRect().height) {
      resultFrame.style.height = `${Math.ceil(content.getBoundingClientRect().height) + 2}px`;
    }
  };
  resultFrame.addEventListener('load', () => {
    resultObserver?.disconnect();
    const content = resultFrame.contentDocument?.querySelector('main');
    if (!content) return;
    resultObserver = new ResizeObserver(fitResult);
    resultObserver.observe(content);
    fitResult();
  });
  const scenes = [
    { name:'System report', copy:'Local checks found two token issues. The agent-written recommendation connects the action color to the existing palette.' },
    { name:'Applied change', copy:'Two declarations now use the existing theme colors. The palette and button size stay the same.' },
    { name:'Verified result', copy:'The dark-mode color follows its palette. Browser checks cover both themes, button geometry, and keyboard submission; the handoff records the decision.' },
  ];
  let current = 0;
  let userPaused = reduced.matches;
  let visible = false;
  let clock;
  let entrance;
  motion.hidden = false;
  const sync = () => {
    const running = visible && !document.hidden && !userPaused && !reduced.matches;
    if (running) clock?.play(); else clock?.pause();
    motion.classList.toggle('is-paused', userPaused || reduced.matches);
    motion.setAttribute('aria-label', reduced.matches ? 'Next delivery step' : userPaused ? 'Play delivery walkthrough' : 'Pause delivery walkthrough');
    motion.querySelector('span').textContent = reduced.matches ? 'Next' : userPaused ? 'Play' : 'Pause';
  };
  const select = (index, manual = false) => {
    current = index;
    if (manual) userPaused = true;
    clock?.cancel();
    entrance?.cancel();
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    if (index === 2) fitResult();
    const scene = scenes[index];
    document.getElementById('report-window-name').textContent = scene.name;
    caption.setAttribute('aria-live', manual ? 'polite' : 'off');
    caption.textContent = scene.copy;

    if (!reduced.matches) {
      entrance = panels[index].animate([{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}], {duration:500,easing:'cubic-bezier(.22,1,.36,1)'});
    }
    const progress = tabs[index].querySelector('.report-progress span');
    clock = progress.animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}], {duration:10000,fill:'both',easing:'linear'});
    clock.pause();
    clock.onfinish = () => select((current + 1) % tabs.length);
    sync();
  };
  tabs.forEach((tab, i) => {
    tab.disabled = false;
    tab.addEventListener('click', () => select(i, true));
    tab.addEventListener('keydown', (event) => {
      const next = {ArrowRight:(i+1)%3,ArrowDown:(i+1)%3,ArrowLeft:(i+2)%3,ArrowUp:(i+2)%3,Home:0,End:2}[event.key];
      if (next === undefined) return;
      event.preventDefault();
      select(next, true);
      tabs[next].focus();
    });
  });
  motion.addEventListener('click', () => {
    // Reduced motion retains manual selection without starting an automatic sequence.
    if (reduced.matches) { select((current + 1) % tabs.length, true); return; }
    userPaused = !userPaused;
    sync();
  });
  reportStage.querySelector('.report-viewport').addEventListener('focusin', () => { userPaused = true; sync(); });
  window.addEventListener('blur', () => {
    if (reportStage.contains(document.activeElement)) { userPaused = true; sync(); }
  });
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', () => { userPaused = reduced.matches; entrance?.cancel(); sync(); });
  const setOrientation = () => reportStage.querySelector('[role="tablist"]').setAttribute('aria-orientation', narrow.matches ? 'horizontal' : 'vertical');
  narrow.addEventListener('change', setOrientation);
  setOrientation();
  select(0);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, {threshold:0.2}).observe(reportStage);
  }
}
