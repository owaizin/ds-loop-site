// A deliberate before/after interaction; no autoplay or background motion.
const driftDemo = document.getElementById('drift-demo');
if (driftDemo) {
  const controls = driftDemo.querySelector('.drift-switch');
  const buttons = [...controls.querySelectorAll('button')];
  const annotations = [...driftDemo.querySelectorAll('.drift-annotation')];
  const originalAnnotations = annotations.map(node => node.textContent);
  const caption = driftDemo.querySelector('figcaption');
  controls.hidden = false;
  for (const button of buttons) {
    button.addEventListener('click', () => {
      const connected = button.dataset.driftState === 'true';
      driftDemo.dataset.connected = String(connected);
      for (const choice of buttons) choice.setAttribute('aria-pressed', String(choice === button));
      annotations.forEach((node, index) => {
        node.textContent = connected ? 'Shared input + button' : originalAnnotations[index];
      });
      driftDemo.querySelector('.drift-foundation-label').textContent = connected
        ? 'One shared foundation' : 'Three places to maintain';
      caption.querySelector('strong').textContent = connected
        ? 'Different screens. One shared foundation.' : 'The same job. Three implementations.';
      caption.querySelector('span').textContent = connected
        ? 'Keep each screen’s purpose. Reuse the controls underneath.'
        : 'Different controls, spacing, and styles to look after.';
    });
  }
}
