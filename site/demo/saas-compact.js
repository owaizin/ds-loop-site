const main = document.querySelector('main');
const canvas = document.querySelector('.comparison-canvas');
const range = document.getElementById('compact-reveal');
const output = document.querySelector('output');
const status = document.querySelector('.comparison-status');
const pause = document.getElementById('reveal-pause');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const pairs = [...document.querySelectorAll('.pair')];
let frame, previous = null, elapsed = 0, visible = false, playing = false, started = false;
function reveal() {
  const bounds = canvas.getBoundingClientRect();
  const value = Number(range.value);
  const split = (1 - value / 100) * bounds.width;
  main.style.setProperty('--split', `${100-value}%`);
  main.dataset.between = String(value > 0 && value < 100);
  output.value = `${value}%`;
  range.setAttribute('aria-valuetext', `${value}% of the shared design system revealed`);
  for (const pair of pairs) {
    const rect = pair.getBoundingClientRect();
    const clip = Math.max(0,Math.min(rect.width,split-(rect.left-bounds.left)));
    pair.querySelector('.after').style.clipPath=`inset(0 0 0 ${clip}px)`;
    pair.querySelector('.before').setAttribute('aria-hidden',String(clip===0));
    pair.querySelector('.after').setAttribute('aria-hidden',String(clip===rect.width));
  }
}
function stop(manual = true) {
  playing=false; main.dataset.playback='paused'; cancelAnimationFrame(frame); previous=null;
  pause.textContent='Resume'; pause.disabled=manual || Number(range.value)===100;
  if(manual) { started=true; status.textContent='Your comparison · drag to explore'; }
}
function finish() {
  range.value='100'; reveal(); stop(false); pause.disabled=true;
  pause.textContent='Pause'; main.dataset.playback='complete';
  status.textContent='Shared foundations. Four different ways to use them.';
}
function tick(time) {
  if(previous!==null) elapsed+=time-previous;
  previous=time;
  const t=Math.max(0,Math.min(1,(elapsed-1000)/2800));
  range.value=String(Math.round((t*t*(3-2*t))*100)); reveal();
  if(t===1) { finish(); return; }
  frame=requestAnimationFrame(tick);
}
function sync() {
  cancelAnimationFrame(frame); previous=null;
  main.dataset.playback = playing && visible && !document.hidden ? 'playing' : 'paused';
  if(playing && visible && !document.hidden) frame=requestAnimationFrame(tick);
}
function play() {
  started=true; elapsed=0;
  if(reduced.matches) { finish(); return; }
  range.value='0'; reveal(); playing=true; pause.disabled=false; pause.textContent='Pause';
  status.textContent='Watch the independent screens become a shared system'; sync();
}
range.addEventListener('input',()=>{stop();reveal();});
range.addEventListener('keydown',()=>stop());
range.addEventListener('pointerdown',()=>stop());
let pointer = null, grabOffset=0;
function move(event) {
  if(pointer!==event.pointerId) return;
  const bounds=canvas.getBoundingClientRect();
  range.value=String(Math.round(100-Math.max(0,Math.min(1,(event.clientX-grabOffset-bounds.left)/bounds.width))*100));
  reveal();
}
canvas.addEventListener('pointerdown',event=>{
  if(event.button!==0) return;
  stop(); pointer=event.pointerId;
  const bounds=canvas.getBoundingClientRect();
  grabOffset=event.target.closest('.canvas-divider')?event.clientX-(bounds.left+(1-Number(range.value)/100)*bounds.width):0;
  canvas.setPointerCapture(pointer); move(event);
});
canvas.addEventListener('pointermove',move);
for(const type of ['pointerup','pointercancel']) canvas.addEventListener(type,event=>{
  if(pointer===event.pointerId) { if(canvas.hasPointerCapture(pointer)) canvas.releasePointerCapture(pointer); pointer=null; }
});
pause.addEventListener('click',()=>{if(playing) stop(false); else {playing=true;pause.textContent='Pause';sync();}});
document.getElementById('reveal-replay').addEventListener('click',play);
document.addEventListener('visibilitychange',sync);
reduced.addEventListener('change',()=>{if(reduced.matches) finish();});
main.classList.add('js-ready');
document.querySelector('.comparison-actions').hidden=false;
document.querySelector('.comparison-control').hidden=false;
range.value=reduced.matches?'100':'0'; reveal();
new ResizeObserver(reveal).observe(canvas);
new IntersectionObserver(([entry])=>{
  visible=entry.isIntersecting;
  main.dataset.inView=String(visible);
  sync();
},{threshold:0}).observe(canvas);
// Trigger from the short introduction, not a tall mobile gallery's visibility ratio.
new IntersectionObserver(([entry],observer)=>{
  if(entry.isIntersecting && entry.intersectionRatio>=.5 && !started) { play(); observer.disconnect(); }
},{threshold:.5}).observe(document.querySelector('.comparison-head'));
