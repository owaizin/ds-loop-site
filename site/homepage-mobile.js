// Keep the full desktop composition; let phone readers choose when to explore.
const mobileHome = matchMedia('(max-width: 760px)');
const mobileDisclosures = document.querySelectorAll('.mobile-disclosure');
const syncMobileDisclosures = () => {
  for (const disclosure of mobileDisclosures) disclosure.open = !mobileHome.matches;
};
mobileHome.addEventListener('change', syncMobileDisclosures);
syncMobileDisclosures();

// A board opened after load needs to fit its newly visible viewport.
for (const disclosure of mobileDisclosures) {
  disclosure.addEventListener('toggle', () => {
    if (mobileHome.matches && disclosure.open) window.dispatchEvent(new Event('resize'));
  });
}
