// A deliberate before/after interaction; no autoplay or background motion.
const driftDemo = document.getElementById('drift-demo');
if (driftDemo) {
  const controls = driftDemo.querySelector('.drift-switch');
  const buttons = [...controls.querySelectorAll('button')];
  const annotations = [...driftDemo.querySelectorAll('.drift-annotation')];
  const originalAnnotations = annotations.map(node => node.textContent);
  const caption = driftDemo.querySelector('figcaption');
  const originalCaption = [caption.querySelector('strong').textContent, caption.querySelector('span').textContent];
  const agentCode = driftDemo.querySelector('#drift-agent-code');
  const originalCode = agentCode?.textContent;
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
        ? (caption.dataset.sharedTitle || 'Different screens. One shared foundation.') : originalCaption[0];
      caption.querySelector('span').textContent = connected
        ? (caption.dataset.sharedDetail || 'Keep each screen’s purpose. Reuse the controls underneath.')
        : originalCaption[1];
      if (agentCode) {
        driftDemo.querySelector('.drift-code-label').textContent = connected ? 'Billing.tsx · uses the shared Button' : 'Billing.tsx · another local button';
        agentCode.textContent = connected
          ? "<Button variant=\"primary\">Pay</Button>"
          : originalCode;
      }
    });
  }
}
