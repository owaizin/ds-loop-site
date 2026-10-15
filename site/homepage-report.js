// One quiet entrance for the publication mockup; the report itself opens as a document.
(() => {
  const mockup = document.querySelector('.publication-mockup');
  if (!mockup || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const observer = new IntersectionObserver((entries) => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    mockup.animate(
      [{ opacity:0, transform:'translateY(24px)' }, { opacity:1, transform:'translateY(0)' }],
      { duration:650, easing:'cubic-bezier(.22,1,.36,1)' },
    );
    observer.disconnect();
  }, { threshold:.2 });
  observer.observe(mockup);
})();
