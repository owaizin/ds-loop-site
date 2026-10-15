// This exploration owns its visual refinements; production specimens stay untouched.
import {demos as source, specimen} from './product-demos.mjs';
export {specimen};
export const demos=source.map(d=>{
 let body=d.body;
 if(d.id==='dashboard') body=body.replace('A good week to build.','Your workspace, in focus.')+`<div class="traffic-list"><div><strong>Top sources</strong><span>Visitors</span></div><div><span><i class="source-dot"></i>Direct</span><b>24,310</b></div><div><span><i class="source-dot"></i>Organic search</span><b>16,482</b></div><div><span><i class="source-dot"></i>Referrals</span><b>7,828</b></div></div>`;
 if(d.id==='form') body=body.replace('Start something together','Workspace / Projects').replace('Give your next idea a home.','Create a project.').replace('<div class="project-fields"', '<p class="project-description">A shared space for your team’s next chapter.</p><div class="project-fields"').replace('<div class="form-foot">','<div class="form-foot">').replace('Only invited people will be notified.','You can change access later.').replace('Create project <span>↗</span>','Create project <span>→</span>');
 if(d.id==='board') body=body.replace('A little structure. Room to move.','Projects / Autumn 2026').replace('Make space for the next release.','Autumn launch.').replace('<small>Website</small>','<div class="task-cover cover-web"><span>meridian®</span><b>Make room<br>for more.</b></div><small>Website</small>').replace('<small>Design</small>','<div class="task-cover cover-icons"><span>✳</span><span>◒</span><span>↗</span></div><small>Design</small>');
 if(d.id==='review') body=body.replace('Version 03 · Ready for feedback','Brand refresh / Direction 03').replace('A new perspective.','Room for what’s next.');
 return {...d,body};
});
