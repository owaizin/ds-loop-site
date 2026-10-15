// Dev-only palette controls. Shown only with ?tune in the URL; the live page never loads the panel.
(() => {
  if (!new URLSearchParams(location.search).has('tune')) return;
  const root = document.body, sheet = document.getElementById('homepage-palette');
  const stops = [['Lilac', '#cdbbff', 5], ['Violet', '#a98cff', 31], ['Coral', '#e97a97', 66], ['Orange', '#f2682c', 86]];
  let angle = 138, glow = 59;
  const panel = document.createElement('aside');
  panel.className = 'palette-tuner';
  panel.innerHTML = `
    <style>
      .palette-tuner{position:fixed;right:16px;bottom:16px;z-index:9999;width:280px;max-width:calc(100vw - 32px);padding:16px;border:1px solid #3a334a;border-radius:12px;background:#110e19f2;color:#ece7fb;font:12px/1.5 system-ui;box-shadow:0 20px 50px #000a;backdrop-filter:blur(12px)}
      .palette-tuner h2{font:600 13px system-ui;margin:0 0 12px;display:flex;justify-content:space-between}
      .palette-tuner label{display:grid;grid-template-columns:56px 28px 1fr 34px;gap:8px;align-items:center;margin-block:6px}
      .palette-tuner input[type=color]{width:28px;height:22px;padding:0;border:1px solid #3a334a;border-radius:4px;background:none}
      .palette-tuner input[type=range]{width:100%;accent-color:#c9bcf5}
      .palette-tuner output{text-align:right;color:#a9a0bd;font-variant-numeric:tabular-nums}
      .palette-tuner .pt-row{display:flex;gap:8px;margin-top:12px}
      .palette-tuner button{flex:1;font:inherit;padding:7px;border:1px solid #3a334a;border-radius:6px;background:#181422;color:inherit;cursor:pointer}
      .palette-tuner button[aria-pressed=true]{background:#2a2440;border-color:#6b5fa0}
      .palette-tuner .pt-swatch{height:28px;border-radius:6px;margin:10px 0 4px}
    </style>
    <h2>Palette <span>?tune</span></h2>
    <div class="pt-row" style="margin-top:0"><button type="button" data-mode="new" aria-pressed="true">New palette</button><button type="button" data-mode="old" aria-pressed="false">Original</button></div>
    <div class="pt-swatch"></div>
    ${stops.map(([n, c, p], i) => `<label>${n}<input type="color" value="${c}" data-color="${i}"><input type="range" min="0" max="100" value="${p}" data-pos="${i}"><output>${p}%</output></label>`).join('')}
    <label>Angle<span></span><input type="range" min="0" max="180" value="${angle}" data-angle><output>${angle}°</output></label>
    <label>Glow<span></span><input type="range" min="0" max="100" value="${glow}" data-glow><output>${glow}%</output></label>
    <div class="pt-row"><button type="button" data-copy>Copy CSS</button><button type="button" data-reset>Reset</button></div>`;
  document.body.append(panel);
  const swatch = panel.querySelector('.pt-swatch');
  const css = () => `linear-gradient(${angle}deg,${stops.map(([, c, p]) => `${c} ${p}%`).join(',')})`;
  const glowHex = () => Math.round(glow * 2.55).toString(16).padStart(2, '0');
  const apply = () => {
    root.style.setProperty('--hp-cta', css());
    root.style.setProperty('--hp-cta-glow', `#f2682c${glowHex()}`);
    swatch.style.background = css();
  };
  panel.addEventListener('input', ({ target: t }) => {
    const out = t.parentElement.querySelector('output');
    if (t.dataset.color) stops[t.dataset.color][1] = t.value;
    if (t.dataset.pos) { stops[t.dataset.pos][2] = +t.value; out.value = `${t.value}%`; }
    if ('angle' in t.dataset) { angle = +t.value; out.value = `${angle}°`; }
    if ('glow' in t.dataset) { glow = +t.value; out.value = `${glow}%`; }
    apply();
  });
  panel.addEventListener('click', ({ target: t }) => {
    if (t.dataset.mode) {
      sheet.disabled = t.dataset.mode === 'old';
      panel.querySelectorAll('[data-mode]').forEach((b) => b.setAttribute('aria-pressed', b === t));
    }
    if ('copy' in t.dataset) navigator.clipboard?.writeText(`--hp-cta:${css()};\n--hp-cta-glow:#f2682c${glowHex()};`).then(() => { t.textContent = 'Copied'; setTimeout(() => (t.textContent = 'Copy CSS'), 1200); });
    if ('reset' in t.dataset) location.reload();
  });
  apply();
})();
