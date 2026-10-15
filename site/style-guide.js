// Show the actual loaded token values, rather than maintaining a second palette.
const pageStyles = getComputedStyle(document.body);
for (const label of document.querySelectorAll('[data-token-value]')) {
  const value = pageStyles.getPropertyValue(label.dataset.tokenValue).trim();
  if (value) label.textContent = value;
}
// Native anchors remain usable without JavaScript; this only indicates position.
const sectionLinks = [...document.querySelectorAll('.sg-index a')];
if ('IntersectionObserver' in window) {
  const visible = new Set();
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) visible.add(entry.target.id);
      else visible.delete(entry.target.id);
    }
    const current = sectionLinks.find(link => visible.has(link.hash.slice(1)));
    for (const link of sectionLinks) {
      if (link === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }, { rootMargin: '-15% 0px -35% 0px' });
  for (const link of sectionLinks) {
    const section = document.getElementById(link.hash.slice(1));
    if (section) observer.observe(section);
  }
}
