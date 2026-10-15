// Below-the-fold content rises into view and its panels light up, in the order each batch enters.
// Nothing is hidden unless this script runs and the visitor allows motion.
(() => {
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const groups = {
    text: '.drift-copy > *, .entry-heading > *, .report-story-heading > *, .scope-intro > *, .copy-reuse-heading > *, .home-close > h2, .home-close > p, .home-close > .actions, .adoption-sequence > *, .home-faq > *',
    panel: '.drift-demo, .report-workbench, .report-caption, .connected-showcase',
    card: '.entry-grid > *, .scope-panel',
  };
  const targets = [];
  for (const [kind, selector] of Object.entries(groups)) {
    for (const el of document.querySelectorAll(`main ${selector}`)) {
      // Skip decorative frame rulers, and never hide what is already on screen.
      if (el.matches('.layout-ruler') || el.getBoundingClientRect().top < innerHeight) continue;
      el.dataset.reveal = kind;
      targets.push(el);
    }
  }
  document.documentElement.classList.add('reveal-on');
  const observer = new IntersectionObserver(
    (entries) => {
      const entering = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
      entering.forEach(({ target }, i) => {
        target.style.setProperty('--reveal-delay', `${Math.min(i, 6) * 90}ms`);
        target.dataset.lit = '';
        observer.unobserve(target);
      });
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  for (const el of targets) observer.observe(el);
})();
