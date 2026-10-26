// Shared specimens and formation; experimental arrangements stay on the study page.
import {writeFileSync} from 'node:fs';
import {demos,specimen} from '../content/loop-study-specimens.mjs';
import {polishSceneAfter} from '../content/scene-after-specimens.mjs';
const render=(demo,state,prefix)=>specimen(demo,state).replaceAll(`chart-fill-${state}`,`chart-${prefix}-${state}`);
const tabs=['Dashboard','Forms','Planning','Communication'];
const initial=demos[0];
const icons=[
 '<path d="M4 19V11m5 8V5m6 14V9m5 10V3"/>',
 '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
 '<rect x="3" y="4" width="5" height="16" rx="1"/><rect x="10" y="4" width="5" height="11" rx="1"/><rect x="17" y="4" width="4" height="14" rx="1"/>',
 '<path d="M20 11a7 7 0 0 1-7 7H7l-4 3V10a7 7 0 0 1 7-7h3a7 7 0 0 1 7 8Z"/><path d="M7 9h9M7 13h6"/>'
];
const studyHtml=`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>One screen. A better system. · DS Loop study</title><meta name="robots" content="noindex">
<link rel="icon" href="assets/branding/ds-loop-mark.svg" type="image/svg+xml"><link rel="stylesheet" href="demo/product-specimens.css"><link rel="stylesheet" href="loop-study-specimens.css"><link rel="stylesheet" href="loop-study.css"><link rel="stylesheet" href="loop-scene.css"><link rel="stylesheet" href="loop-study-dark.css"><script src="loop-study.js" defer></script><link rel="stylesheet" href="branding.css">
</head>
<body data-layout="spine"><a class="skip-study" href="#study">Skip to the study</a>
<header class="study-header"><a href="index.html"><picture class="brand-art"><source media="(max-width: 760px)" srcset="assets/branding/ds-loop-logo-fullname-2line-dark.svg"><img class="brand-lockup" src="assets/branding/ds-loop-logo-fullname-line-dark.svg" width="234" height="42" alt="Design System Loop"></picture></a><nav class="layout-picker" aria-label="Compare study layouts"><a href="?layout=spine" data-layout="spine">01 · Between</a><a href="?layout=crown" data-layout="crown">02 · Above</a><a href="?layout=bridge" data-layout="bridge">03 · In the seam</a><a href="?layout=scene" data-layout="scene">04 · One canvas</a></nav></header>
<main id="study"><div class="study-intro"><h1>Every screen improves.<br><em>The system moves forward.</em></h1></div>
<div class="category-tabs" hidden role="tablist" aria-label="Screen category">${demos.map((d,i)=>`<button role="tab" id="tab-${d.id}" aria-selected="${i===0}" aria-controls="loop-panel" tabindex="${i===0?'0':'-1'}" data-category="${d.id}"><span class="tab-symbol" aria-hidden="true">${`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${icons[i]}</svg>`}</span>${tabs[i]}</button>`).join('')}</div>
<section class="loop-panel" id="loop-panel" role="tabpanel" aria-labelledby="tab-dashboard" tabindex="0">
<div class="comparison-grid">
<article class="screen-side before-side"><div class="side-heading">Before</div><div class="screen-frame"><div id="before-screen">${render(initial,'before','initial')}</div><div class="inspection-line" aria-hidden="true"></div></div></article>
<div class="system-column"><div class="system-brand"><strong>DS Loop</strong><span>Your agent + shared foundations</span></div>
<button type="button" class="infinity-art" aria-label="Pause automatic screen sequence" aria-pressed="false"><span class="visually-hidden">Pause or resume the automatic sequence</span><svg viewBox="0 0 280 140"><defs><linearGradient id="loop-spectrum" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e4d2ff"/><stop offset=".42" stop-color="#a480ec"/><stop offset="1" stop-color="#ff8b53"/></linearGradient><filter id="loop-soft"><feGaussianBlur stdDeviation="5"/></filter></defs><path class="infinity-glow" d="M140 70C95 5 15 5 15 70C15 135 95 135 140 70C185 5 265 5 265 70C265 135 185 135 140 70"/><path class="infinity-base" d="M140 70C95 5 15 5 15 70C15 135 95 135 140 70C185 5 265 5 265 70C265 135 185 135 140 70"/><path class="infinity-highlight" d="M140 70C95 5 15 5 15 70C15 135 95 135 140 70C185 5 265 5 265 70C265 135 185 135 140 70"/><path class="infinity-signal" pathLength="100" d="M140 70C95 5 15 5 15 70C15 135 95 135 140 70C185 5 265 5 265 70C265 135 185 135 140 70"/></svg></button>
<div class="foundation-system"><div class="foundation-caption">Shared design system<span>Applied as the screen builds</span></div><div class="foundation-parts" role="group" aria-label="Shared design system applied to this screen"><span data-foundation="shell"><i aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 9v12"/></svg></i><span class="foundation-copy"><strong>Layout</strong><small>Grid & spacing</small></span></span><span data-foundation="type"><i aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m4 19 6-14 6 14M6 14h8"/><circle cx="19" cy="7" r="3"/></svg></i><span class="foundation-copy"><strong>Foundations</strong><small>Color & type</small></span></span><span data-foundation="controls"><i aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="6" rx="2"/><rect x="3" y="14" width="11" height="6" rx="3"/><path d="M18 15v4m-2-2h4"/></svg></i><span class="foundation-copy"><strong>Components</strong><small>Inputs & actions</small></span></span><span data-foundation="patterns"><i aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/><path d="M14 6h3a1 1 0 0 1 1 1v3M10 18H7a1 1 0 0 1-1-1v-3"/></svg></i><span class="foundation-copy"><strong>Patterns</strong><small>Flows & states</small></span></span></div></div><span class="loop-note">Learn. Build. Repeat.</span></div>
<article class="screen-side after-side"><div class="side-heading">After <span aria-hidden="true">↗</span></div><div class="screen-frame"><div id="after-screen">${render(initial,'after','initial')}</div></div></article>
<div class="feedback-route" aria-hidden="true"><svg viewBox="0 0 1000 50" preserveAspectRatio="none"><path class="return-base" d="M850 0V10Q850 35 825 35H525Q500 35 500 10V0"/><path class="return-signal" pathLength="100" d="M850 0V10Q850 35 825 35H525Q500 35 500 10V0"/></svg></div>
</div><p class="visually-hidden" id="story-status" role="status" aria-live="off"></p>
</section>
${demos.map(d=>`<template id="before-${d.id}">${render(d,'before',d.id)}</template><template id="after-${d.id}">${render(d,'after',d.id)}</template>`).join('')}
</main></body></html>`;
const sceneTemplates=demos.map(d=>`<template id="scene-after-${d.id}">${polishSceneAfter(render(d,'after',`scene-${d.id}`))}</template>`).join('');
const sceneStudyHtml=studyHtml.replace('</head>','<link rel="stylesheet" href="loop-scene-after.css"></head>').replace('</main>',`${sceneTemplates}</main>`);
writeFileSync(new URL('../site/loop-study.html',import.meta.url),sceneStudyHtml);
// Production and exploration share the exact same specimens and formation implementation.
const embedHtml=sceneStudyHtml
 .replace(/<title>.*?<\/title>/,'<title>DS Loop · From wireframe to shared components</title>')
 .replace('<body data-layout="spine">','<body class="loop-embed" data-layout="scene">')
 .replace(render(initial,'after','initial'),polishSceneAfter(render(initial,'after','initial')))
 .replace(/<a class="skip-study".*?<\/a>/,'')
 .replace(/<header class="study-header">[\s\S]*?<\/header>/,'')
 .replace(/<div class="study-intro">[\s\S]*?<\/div>/,'')
 .replace('</head>','<link rel="stylesheet" href="loop-embed.css"></head>');
writeFileSync(new URL('../site/loop-embed.html',import.meta.url),embedHtml);
console.log('Built shared loop study and homepage embed.');
