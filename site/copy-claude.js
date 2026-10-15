const reuseTabs = [...document.querySelectorAll('.copy-reuse-tabs [role="tab"]')];
if (reuseTabs.length) {
  const selectReuse = index => {
    reuseTabs.forEach((tab, i) => {
      const selected = i === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden = !selected;
    });
  };
  document.querySelector('.copy-reuse-tabs').hidden = false;
  reuseTabs.forEach((tab, i) => {
    tab.addEventListener('click', () => selectReuse(i));
    tab.addEventListener('keydown', event => {
      const next = {ArrowRight:(i+1)%2,ArrowLeft:(i+1)%2,Home:0,End:1}[event.key];
      if (next === undefined) return;
      event.preventDefault();
      selectReuse(next);
      reuseTabs[next].focus();
    });
  });
  const selectHash = () => {
    if (location.hash === '#new-screens') selectReuse(1);
    else if (location.hash === '#system-example') selectReuse(0);
  };
  selectReuse(location.hash === '#new-screens' ? 1 : 0);
  addEventListener('hashchange', selectHash);
}
