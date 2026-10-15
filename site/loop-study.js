const panel=document.querySelector('.loop-panel');
const before=document.getElementById('before-screen');
const after=document.getElementById('after-screen');
const tabs=[...document.querySelectorAll('[role=tab]')];
const layouts=[...document.querySelectorAll('[data-layout]')].filter(e=>e.tagName==='A');
const status=document.getElementById('story-status');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const ns='http://www.w3.org/2000/svg';
const ease='cubic-bezier(.23,1,.32,1)',inOut='cubic-bezier(.77,0,.175,1)';
// Ported from 42e2943: wireframe → route signal → traced surface → real components.
// Preserve the four distinct phases, with a tighter cadence than the original 5.7s build.
const foundations={shell:320,type:850,controls:1500,patterns:2200};
const phaseLabels={shell:'Reusing the workspace layout',type:'Applying the shared type hierarchy',controls:'Reusing controls and surfaces',patterns:'Applying shared patterns and states'};
const cycleDuration=5100,exit=240;
const stage=document.querySelector('.comparison-grid');
const isScene=()=>document.body.dataset.layout==='scene';
const afterTemplate=key=>document.getElementById(`${isScene()?'scene-after':'after'}-${key}`);
const sceneLead=980; // 800 ms to see the old UI, then a 180 ms handoff to its wireframe.
const beforeSide=before.closest('.screen-side');
const afterSide=after.closest('.screen-side');
function sceneState(state){
 panel.dataset.sceneStage=state;
 beforeSide.setAttribute('aria-hidden',String(isScene()&&!reduced.matches&&state!=='before'));
 afterSide.setAttribute('aria-hidden',String(isScene()&&!reduced.matches&&state==='before'));
}
const routes=document.createElementNS(ns,'svg');
routes.classList.add('study-routes');routes.setAttribute('aria-hidden','true');stage.prepend(routes);
let connections=[],clock,frame;

const loopButton=document.querySelector('.infinity-art');
let animations=[],parts=[],visible=false,started=false,selected=0,paused=false,loopMotion,generation=0;
function cancel(){generation++;cancelAnimationFrame(frame);animations.forEach(a=>a.cancel());animations=[];clock=null;}
function updatePlayback(){
 loopButton.disabled=reduced.matches;
 loopButton.setAttribute('aria-pressed',String(paused));
 loopButton.setAttribute('aria-label',paused?'Resume automatic screen sequence':'Pause automatic screen sequence');
 panel.dataset.playback=reduced.matches?'reduced':paused?'paused':visible&&!document.hidden?'playing':'suspended';
}
function ensureLoop(){
 if(loopMotion||reduced.matches)return;
 loopMotion=document.querySelector('.infinity-signal').animate([{strokeDashoffset:0,opacity:1},{strokeDashoffset:-100,opacity:1}],{duration:1200,iterations:Infinity,easing:'linear'});
 loopMotion.pause();
}
function animate(element,keyframes,options){
 const animation=element.animate(keyframes,{fill:'both',...options});
 animation.pause();animations.push(animation);return animation;
}
function prepare(){
 // Include all content in the assembly, including the description and dashboard rows.
 after.querySelector('.project-description')?.setAttribute('data-part','type');
 after.querySelector('.traffic-list')?.setAttribute('data-part','patterns');
 parts=[...after.querySelectorAll('[data-part]')];
 routes.replaceChildren();connections=[];
 for(const part of parts){
  const wire=document.createElement('div');wire.className='study-wire';wire.setAttribute('aria-hidden','true');
  for(let i=0;i<3;i++)wire.append(document.createElement('i'));
  const svg=document.createElementNS(ns,'svg');svg.classList.add('study-outline');svg.setAttribute('aria-hidden','true');
  const rect=document.createElementNS(ns,'rect');
  for(const [k,v]of Object.entries({x:1,y:1,rx:6,pathLength:100}))rect.setAttribute(k,v);
  svg.append(rect);part.append(wire,svg);
  const route=document.createElementNS(ns,'path');route.classList.add('study-route');
  const signal=document.createElementNS(ns,'path');signal.classList.add('study-route-signal');signal.setAttribute('pathLength','100');
  routes.append(route,signal);connections.push({part,route,signal});
 }
 after.querySelector('.chart-line')?.setAttribute('pathLength','100');
}
function measureRoutes(){
 const root=stage.getBoundingClientRect();
 routes.setAttribute('viewBox',`0 0 ${root.width} ${root.height}`);
 const routedFoundations=new Set();
 for(const {part,route,signal} of connections){
  // One short handoff per foundation, as in the original four-source build.
  const duplicate=isScene()&&routedFoundations.has(part.dataset.part);
  routedFoundations.add(part.dataset.part);
  route.style.display=signal.style.display=duplicate?'none':'';
  const source=document.querySelector(`[data-foundation=${part.dataset.part}]`).getBoundingClientRect();
  const target=part.getBoundingClientRect();
  const x2=target.left-root.left+2,y2=target.top-root.top+target.height/2;
  let path;
  if(isScene()){
   const x1=source.left-root.left+source.width/2,y1=document.querySelector('.system-column').getBoundingClientRect().bottom-root.top;
   const landing=after.closest('.screen-frame').getBoundingClientRect().top-root.top;
   path=`M${x1} ${y1}V${landing}`;
  }else if(document.body.dataset.layout==='crown'){
   const x1=source.left-root.left+source.width/2,y1=source.bottom-root.top;
   path=`M${x1} ${y1}C${x1} ${y1+30},${x2-20} ${y2},${x2} ${y2}`;
  }else{
   const x1=source.right-root.left,y1=source.top-root.top+source.height/2;
   const mid=x1+(x2-x1)*.5,sign=y2>y1?1:-1;
   const radius=Math.min(10,Math.abs(y2-y1)/2,Math.abs(x2-x1)/4);
   path=`M${x1} ${y1}H${mid-radius}Q${mid} ${y1} ${mid} ${y1+sign*radius}V${y2-sign*radius}Q${mid} ${y2} ${mid+radius} ${y2}H${x2}`;
  }
  route.setAttribute('d',path);signal.setAttribute('d',path);
 }
}
function tick(){
 if(!clock)return;
 const elapsed=Number(clock.currentTime)||0;
 const time=elapsed-(isScene()?sceneLead:0);
 if(isScene()&&panel.dataset.phase==='forming'){
  const state=elapsed<sceneLead?'before':'building';
  if(panel.dataset.sceneStage!==state)sceneState(state);
 }
 const phase=Object.entries(foundations).reverse().find(([,start])=>time>=start);
 if(panel.dataset.phase==='forming'){
  panel.dataset.foundation=phase?.[0]||'wireframe';
  status.textContent=time<0?'Before: an inconsistent screen':phase?phaseLabels[phase[0]]:'Starting with the wireframe';
  for(const part of parts)if(part.dataset.state==='draft'&&time>=foundations[part.dataset.part]+200)part.dataset.state='built';
  for(const [key,start] of Object.entries(foundations)){
   const source=document.querySelector(`[data-foundation=${key}]`);
   source.dataset.active=String(phase?.[0]===key);
   source.dataset.complete=String(time>=start+900);
  }
 }
 frame=requestAnimationFrame(tick);
}
function reserveScenes(){
 let tallest=480;
 for(const tab of tabs)for(const [host,state]of [[before,'before'],[after,'after']]){
  const template=state==='after'?afterTemplate(tab.dataset.category):document.getElementById(`before-${tab.dataset.category}`);
  const clone=template.content.firstElementChild.cloneNode(true);
  clone.classList.add('study-measure');clone.setAttribute('aria-hidden','true');host.append(clone);
  tallest=Math.max(tallest,clone.getBoundingClientRect().height);clone.remove();
 }
 panel.style.setProperty('--scene-height',`${Math.ceil(tallest)}px`);
 measureRoutes();
}
function sync(){
 cancelAnimationFrame(frame);
 const running=visible&&!document.hidden&&!paused&&!reduced.matches;
 for(const a of [...animations,...(loopMotion?[loopMotion]:[])])running?a.play():a.pause();
 updatePlayback();
 if(running&&clock)frame=requestAnimationFrame(tick);
}
function build(){
 cancel();started=true;
 // Form, hold, then advance. One clock pauses together with every visual animation.
 const currentGeneration=generation;
 const lead=isScene()?sceneLead:0;
 sceneState(isScene()?'before':'comparison');
 updatePlayback();
 if(reduced.matches){settle();return;}
 ensureLoop();
 panel.dataset.phase='forming';
 status.textContent='Starting with the wireframe';
 measureRoutes();
 if(isScene()){
  // The old screen materializes, then dissolves into its wireframe (blur masks the crossfade).
  const blur='blur(6px)',scale=.985;
  animate(beforeSide,[
   {opacity:0,filter:blur,scale,easing:ease},{opacity:1,filter:'blur(0)',scale:1,offset:260/980,easing:'linear'},
   {opacity:1,filter:'blur(0)',scale:1,offset:800/980,easing:ease},{opacity:0,filter:blur,scale},
  ],{duration:980,easing:'linear'});
 }
 const scan=document.querySelector('.inspection-line');
 const height=before.getBoundingClientRect().height-8;
 animate(scan,[{opacity:0,transform:'translateY(0)'},{opacity:1,transform:'translateY(0)',offset:.05},{opacity:1,transform:`translateY(${height}px)`,offset:.9},{opacity:0,transform:`translateY(${height}px)`}],{duration:220,delay:isScene()?580:0,easing:'linear'});

 for(const source of document.querySelectorAll('[data-foundation]')){
  source.dataset.active='false';source.dataset.complete='false';
 }
 const counts={};
 for(const part of parts){
  const key=part.dataset.part;
  const order=counts[key]||0;counts[key]=order+1;
  const start=lead+foundations[key]+order*70;
  const reveal=start+300;
  part.dataset.state='draft';
  const content=[...part.childNodes].filter(e=>e.nodeType===Node.TEXT_NODE&&e.textContent.trim());
  // The short project description has a text node rather than a content wrapper.
  for(const node of content){const span=document.createElement('span');node.replaceWith(span);span.append(node);}
  const partAnimations=[];
  const draw=(element,keyframes,options)=>{const a=animate(element,keyframes,options);partAnimations.push(a);};
  [...part.children].filter(e=>!e.classList.contains('study-outline')&&!e.classList.contains('study-wire')).forEach((child,i)=>draw(child,[
   {opacity:0,translate:'0 8px',scale:'.97',filter:'blur(3px)'},
   {opacity:1,translate:'0 0',scale:'1',filter:'blur(0)'},
  ],{duration:420,delay:reveal+i*55,easing:ease}));
  draw(part.querySelector('.study-wire'),[{opacity:.85},{opacity:0}],{duration:300,delay:reveal-80,easing:ease});
  draw(part.querySelector('.study-outline rect'),[
   {strokeDashoffset:100,opacity:0},{strokeDashoffset:100,opacity:1,offset:.05},
   {strokeDashoffset:0,opacity:1,offset:.7},{strokeDashoffset:0,opacity:0},
  ],{duration:700,delay:start,easing:ease});
  // Nested cards and discussion rows accumulate after the enclosing pattern arrives.
  [...part.querySelectorAll('.task-card,.review-note,.product-row')].forEach((child,i)=>draw(child,[
   {opacity:0,translate:'0 6px'},{opacity:1,translate:'0 0'},
  ],{duration:350,delay:reveal+100+i*90,easing:ease}));
  const chart=part.querySelector('.chart-line');
  if(chart){
   // The area follows the stroke instead of appearing ahead of it.
   const line={duration:700,delay:reveal+100,easing:inOut};
   draw(chart,[{strokeDasharray:100,strokeDashoffset:100},{strokeDasharray:100,strokeDashoffset:0}],line);
   draw(chart.parentNode.querySelector('path[fill^=url]'),[{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0 0 0)'}],line);
  }
  Promise.all(partAnimations.map(a=>a.finished)).then(()=>{
   if(currentGeneration!==generation)return;
   part.dataset.state='done';partAnimations.forEach(a=>a.cancel());
   animations=animations.filter(a=>!partAnimations.includes(a));
  }).catch(()=>{});
 }
 for(const {part,signal}of connections)animate(signal,[
  {strokeDashoffset:100,opacity:0},{strokeDashoffset:80,opacity:1,offset:.12},
  {strokeDashoffset:-18,opacity:1,offset:.85},{strokeDashoffset:-25,opacity:0},
 ],{duration:isScene()?380:700,delay:lead+foundations[part.dataset.part]-(isScene()?320:150),easing:inOut});
 animate(document.querySelector('.return-signal'),[{strokeDashoffset:100,opacity:0},{strokeDashoffset:85,opacity:1,offset:.1},{strokeDashoffset:-15,opacity:1,offset:.9},{strokeDashoffset:-25,opacity:0}],{duration:400,delay:lead+3400,easing:'linear'});
 const current=[...animations];
 const returnAnimation=animations[animations.length-1];
 returnAnimation.finished.then(()=>{
  if(currentGeneration!==generation)return;
  current.forEach(a=>a.cancel());
  animations=animations.filter(a=>!current.includes(a));
  settle();
 }).catch(()=>{});
 // Hand over to the next screen with the same blur path the old screen left on.
 if(isScene())animate(afterSide,[
  {opacity:0,filter:'blur(0)',scale:1,easing:ease},{opacity:1,filter:'blur(0)',scale:1,offset:180/(cycleDuration+lead-800),easing:'linear'},
  {opacity:1,filter:'blur(0)',scale:1,offset:1-exit/(cycleDuration+lead-800),easing:inOut},{opacity:0,filter:'blur(6px)',scale:.985},
 ],{delay:800,duration:cycleDuration+lead-800,easing:'linear'});
 clock=animate(panel,[{outlineOffset:'8px'},{outlineOffset:'8px'}],{duration:cycleDuration+lead});
 clock.finished.then(()=>{
  if(currentGeneration===generation)select((selected+1)%tabs.length);
 }).catch(()=>{});
 sync();
}
function settle(){
 sceneState(isScene()?'after':'comparison');
 panel.dataset.phase='holding';panel.dataset.foundation='complete';
 for(const part of parts)part.dataset.state='done';
 for(const source of document.querySelectorAll('[data-foundation]')){source.dataset.active='false';source.dataset.complete='true';}
 status.textContent='Screen ready. Shared decisions carry forward.';
}
function select(index){
 cancel();selected=index;const key=tabs[index].dataset.category;
 tabs.forEach((t,i)=>{t.setAttribute('aria-selected',String(i===index));t.tabIndex=i===index?0:-1;});
 panel.setAttribute('aria-labelledby',tabs[index].id);
 before.replaceChildren(document.getElementById(`before-${key}`).content.cloneNode(true));
 after.replaceChildren(afterTemplate(key).content.cloneNode(true));
 status.textContent=`${tabs[index].textContent.trim()}: the same screen before and after DS Loop, using the fictional Meridian design system.`;
 prepare();build();
}
function layout(name){
 const valid=document.body.classList.contains('loop-embed')?'scene':['spine','crown','bridge','scene'].includes(name)?name:'spine';
 document.body.dataset.layout=valid;
 sceneState(valid==='scene'?'before':'comparison');
 layouts.forEach(link=>link.setAttribute('aria-current',String(link.dataset.layout===valid)));
 after.replaceChildren(afterTemplate(tabs[selected].dataset.category).content.cloneNode(true));
 prepare();reserveScenes();
}
layouts.forEach(link=>link.addEventListener('click',event=>{
 if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
 event.preventDefault();history.pushState(null,'',link.href);layout(link.dataset.layout);build();
}));
window.addEventListener('popstate',()=>{layout(new URLSearchParams(location.search).get('layout'));build();});
tabs.forEach((tab,index)=>{
 tab.addEventListener('click',()=>select(index));
 tab.addEventListener('keydown',event=>{
  const next=event.key==='ArrowRight'?(index+1)%tabs.length:event.key==='ArrowLeft'?(index+tabs.length-1)%tabs.length:event.key==='Home'?0:event.key==='End'?tabs.length-1:null;
  if(next!==null){event.preventDefault();select(next);tabs[next].focus();}
 });
});
loopButton.addEventListener('click',()=>{paused=!paused;sync();});
document.addEventListener('visibilitychange',sync);
reduced.addEventListener('change',()=>{
 if(reduced.matches){cancel();loopMotion?.cancel();loopMotion=null;settle();sync();}
 else build();
});
const observeVisibility=([entry])=>{visible=entry.isIntersecting;if(visible&&!started)build();else sync();};
// Use the host viewport for the auto-height homepage embed (same origin).
// This avoids playing the full sequence before the visitor reaches the section.
try {
 if(window.frameElement)new parent.IntersectionObserver(observeVisibility,{root:parent.document,threshold:0}).observe(window.frameElement);
 else new IntersectionObserver(observeVisibility,{threshold:0}).observe(panel);
} catch { new IntersectionObserver(observeVisibility,{threshold:0}).observe(panel); }
layout(new URLSearchParams(location.search).get('layout'));updatePlayback();
let measuredWidth=0;
new ResizeObserver(()=>{const width=before.clientWidth;if(width!==measuredWidth){measuredWidth=width;reserveScenes();}else measureRoutes();}).observe(panel);
document.fonts.ready.then(reserveScenes);
document.querySelector('.category-tabs').hidden=false;
