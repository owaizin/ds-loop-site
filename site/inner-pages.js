(() => {
  const header = document.querySelector('.inner-header');
  const toggle = header?.querySelector('.site-menu-toggle');
  const menu = header?.querySelector('#site-navigation');
  if (toggle && menu) {
    const mobile = matchMedia('(max-width: 700px)');
    header.classList.add('menu-ready');
    toggle.hidden = false;
    const close = () => toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', () => toggle.setAttribute('aria-expanded', String(toggle.getAttribute('aria-expanded') !== 'true')));
    header.addEventListener('keydown', event => {
      if (event.key === 'Escape' && mobile.matches && toggle.getAttribute('aria-expanded') === 'true') {
        close(); toggle.focus();
      }
    });
    menu.addEventListener('click', event => { if (event.target.closest('a')) close(); });
    mobile.addEventListener('change', close);
  }
  const contents = document.querySelectorAll('.guide-contents, .page-contents');
  const compact = matchMedia('(max-width: 900px)');
  if (contents.length) {
    const update = () => { contents.forEach(item => { item.open = !compact.matches; }); };
    update(); compact.addEventListener('change', update);
  }
})();
