// Authored formation demo: library signals, traced wireframes, then real components.
const bench = document.querySelector('.workbench');
const stage = document.querySelector('.bench-stage');
const screen = document.getElementById('assembly-screen');
const status = document.querySelector('.assembly-status');
const pause = document.querySelector('.pause');
const tabs = [...document.querySelectorAll('[data-screen]')];
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const ns = 'http://www.w3.org/2000/svg';
const ease = 'cubic-bezier(.16,1,.3,1)'; // Retained from the original formation.
const phases = [
  {key:'shell', start:350, label:'Reusing space and surfaces'},
  {key:'type', start:1600, label:'Applying the shared type hierarchy'},
  {key:'controls', start:2750, label:'Connecting shared controls'},
  {key:'patterns', start:4050, label:'Composing patterns for this task'},
];
const duration = 5700;
const hold = 4200;
let animations = [], parts = [], clock, frame, current = '', visible = false;
let started = false, userPaused = false, complete = true, automatic = true;
let selected = 1;
const routes = document.createElementNS(ns, 'svg');
routes.classList.add('formation-routes');
routes.setAttribute('aria-hidden', 'true');
stage.prepend(routes);
const signals = new Map();
for (const phase of phases) {
  const route = document.createElementNS(ns, 'path');
  route.classList.add('formation-route');
  const signal = document.createElementNS(ns, 'path');
  signal.classList.add('formation-signal');
  signal.setAttribute('pathLength', '100');
  routes.append(route, signal);
  signals.set(phase.key, {route, signal});
}
function prepare() {
  parts = [...screen.querySelectorAll('[data-part]')];
  for (const part of parts) {
    const wire = document.createElement('div');
    wire.className = 'formation-wire';
    wire.setAttribute('aria-hidden', 'true');
    for (let i=0;i<3;i++) wire.append(document.createElement('i'));
    const outline = document.createElementNS(ns,'svg');
    outline.classList.add('formation-outline');
    outline.setAttribute('aria-hidden','true');
    const rect = document.createElementNS(ns,'rect');
    for (const [key,value] of Object.entries({x:1,y:1,rx:6,pathLength:100})) rect.setAttribute(key,value);
    outline.append(rect);
    part.append(wire,outline);
  }
}
function measure() {
  const root = stage.getBoundingClientRect();
  routes.setAttribute('viewBox',`0 0 ${root.width} ${root.height}`);
  for (const phase of phases) {
    const from = document.querySelector(`[data-source="${phase.key}"]`).getBoundingClientRect();
    const to = screen.querySelector(`[data-part="${phase.key}"]`).getBoundingClientRect();
    const x1=from.right-root.left, y1=from.top-root.top+from.height/2;
    const x2=to.left-root.left, y2=to.top-root.top+Math.min(to.height/2,42);
    const mid=(x1+x2)/2;
    const path=`M${x1} ${y1}C${mid} ${y1},${mid} ${y2},${x2} ${y2}`;
    const {route,signal}=signals.get(phase.key);
    route.setAttribute('d',path); signal.setAttribute('d',path);
  }
}
// Reserve the tallest composition so automatic rotation never moves the surrounding page.
function reserveHeight() {
  let height=0;
  for (const tab of tabs) {
    const clone=document.getElementById(`screen-${tab.dataset.screen}`).content.firstElementChild.cloneNode(true);
    clone.classList.add('formation-measure');
    clone.setAttribute('aria-hidden','true');
    screen.append(clone); height=Math.max(height,clone.getBoundingClientRect().height); clone.remove();
  }
  screen.style.minHeight=`${Math.ceil(height)}px`;
  measure();
}
function clear() {
  cancelAnimationFrame(frame);
  animations.forEach(a=>a.cancel()); animations=[];
}
function settle() {
  complete=true; bench.dataset.building='false';
  for(const part of parts) part.dataset.state='done';
  for(const source of document.querySelectorAll('[data-source]')) {
    source.dataset.active='false'; source.dataset.complete='true';
  }
  status.textContent=`${tabs[selected].textContent} built from shared foundations`;
  document.querySelector('.screen-count').textContent='4 / 4';
}
function tick() {
  const time=Number(clock.currentTime)||0;
  if(!complete) {
    const phase=[...phases].reverse().find(p=>time>=p.start);
    if(phase && phase.key!==current) {
      current=phase.key; status.textContent=phase.label;
      for(const source of document.querySelectorAll('[data-source]')) source.dataset.active=String(source.dataset.source===current);
    }
    for(const part of parts) if(time>=phases.find(p=>p.key===part.dataset.part).start+400) part.dataset.state='built';
    for(const p of phases) document.querySelector(`[data-source="${p.key}"]`).dataset.complete=String(time>=p.start+900);
    document.querySelector('.screen-count').textContent=`${phases.filter(p=>time>=p.start+900).length} / 4`;
    if(time>=duration) settle();
  }
  if(time>=duration+hold) {
    if(automatic) { select((selected+1)%tabs.length); return; }
    clear(); pause.disabled=true; return;
  }
  frame=requestAnimationFrame(tick);
}
function sync() {
  cancelAnimationFrame(frame);
  const running=visible&&!document.hidden&&!userPaused&&!reduced.matches;
  bench.dataset.playback=running?'playing':'paused';
  bench.dataset.inView=String(visible);
  pause.textContent=userPaused?'Resume':'Pause';
  pause.setAttribute('aria-pressed',String(userPaused));
  for(const animation of animations) running?animation.play():animation.pause();
  if(running && clock && animations.length) frame=requestAnimationFrame(tick);
}
function build() {
  clear(); started=true; current=''; complete=false;
  if(reduced.matches) { settle();pause.disabled=true;return; }
  pause.disabled=false; bench.dataset.building='true';
  status.textContent='Starting with the shared foundations';
  document.querySelector('.screen-count').textContent='0 / 4';
  for(const source of document.querySelectorAll('[data-source]')) {source.dataset.active='false';source.dataset.complete='false';}
  measure();
  for(const part of parts) {
    part.dataset.state='draft';
    const phase=phases.find(p=>p.key===part.dataset.part);
    const children=[...part.children].filter(e=>!e.classList.contains('formation-wire')&&!e.classList.contains('formation-outline'));
    children.forEach((child,i)=>animations.push(child.animate([
      {opacity:0,transform:'translateY(14px) scale(.97)'},
      {opacity:1,transform:'translateY(0) scale(1)'},
    ],{duration:650,delay:phase.start+350+i*60,easing:ease,fill:'both'})));
    animations.push(part.querySelector('.formation-wire').animate([{opacity:.85},{opacity:0}],{duration:400,delay:phase.start+250,easing:ease,fill:'both'}));
    animations.push(part.querySelector('rect').animate([
      {strokeDashoffset:100,opacity:0},{strokeDashoffset:100,opacity:1,offset:.05},
      {strokeDashoffset:0,opacity:1,offset:.7},{strokeDashoffset:0,opacity:0},
    ],{duration:1000,delay:phase.start,easing:ease,fill:'both'}));
  }
  for(const phase of phases) animations.push(signals.get(phase.key).signal.animate([
    {strokeDashoffset:100,opacity:0},{strokeDashoffset:80,opacity:1,offset:.12},
    {strokeDashoffset:-18,opacity:1,offset:.85},{strokeDashoffset:-25,opacity:0},
  ],{duration:1000,delay:phase.start-150,easing:'linear',fill:'both'}));
  clock=bench.animate([{opacity:1},{opacity:1}],{duration:duration+hold,fill:'both'});
  animations.push(clock); sync();
}
function select(index) {
  clear(); selected=index;
  tabs.forEach((tab,i)=>tab.setAttribute('aria-pressed',String(i===index)));
  screen.replaceChildren(document.getElementById(`screen-${tabs[index].dataset.screen}`).content.cloneNode(true));
  prepare();build();
}
tabs.forEach((tab,i)=>tab.addEventListener('click',()=>{automatic=false;userPaused=false;select(i);}));
document.querySelector('.replay').addEventListener('click',()=>{userPaused=false;build();});
pause.addEventListener('click',()=>{userPaused=!userPaused;sync();});
// A keyboard reader owns their chosen screen; never rotate it out from under focus.
document.querySelector('.screen-tabs').addEventListener('focusin',()=>{automatic=false;});
document.addEventListener('visibilitychange',sync);
reduced.addEventListener('change',()=>{if(reduced.matches){clear();settle();pause.disabled=true;}else build();});
const observeVisibility=([entry])=>{
  visible=entry.isIntersecting;
  if(visible&&!started) build();else sync();
};
// Observe the actual embed in its host viewport; nested iframe clipping can leave
// an internal observer stale after the host resizes an auto-height frame.
try {
  if(window.frameElement) new parent.IntersectionObserver(observeVisibility,{threshold:0}).observe(window.frameElement);
  else new IntersectionObserver(observeVisibility,{threshold:0}).observe(stage);
} catch {
  new IntersectionObserver(observeVisibility,{threshold:0}).observe(stage);
}
prepare();
let measuredWidth=0;
new ResizeObserver(()=>{const width=screen.clientWidth;if(width!==measuredWidth){measuredWidth=width;reserveHeight();}else measure();}).observe(stage);
document.fonts.ready.then(reserveHeight);
document.querySelector('.bench-controls').hidden=false;
document.querySelector('.screen-tabs').hidden=false;
reserveHeight();
