import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, resolve, extname } from 'node:path';
const root = resolve('site');
function pages(dir) { return readdirSync(dir, {withFileTypes:true}).flatMap(e => e.name.startsWith('.') ? [] : e.isDirectory() ? pages(resolve(dir,e.name)) : e.name.endsWith('.html') ? [resolve(dir,e.name)] : []); }
let count=0;
for (const file of pages(root)) {
 const html=readFileSync(file,'utf8');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(ids.length,new Set(ids).size,`Duplicate IDs in ${file}`);
 for(const [, raw] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  if (/^[a-z]+:|^\/\//i.test(raw)) continue;
  const [url,fragment]=raw.split('#'); const relative=url.split('?')[0];
  const target=relative ? resolve(relative.startsWith('/') ? root : dirname(file),relative.replace(/^\//,'')) : file;
  assert.ok(existsSync(target),`${file}: missing ${raw}`);
  if(fragment && extname(target)==='.html') assert.ok(readFileSync(target,'utf8').includes(`id="${decodeURIComponent(fragment)}"`),`${file}: missing anchor ${raw}`);
  count++;
 }
 for(const [,id] of html.matchAll(/<button\b[^>]*\bdata-copy="([^"]+)"/g)) assert.ok(ids.includes(id) && ids.includes(`${id}-status`),`Missing copy target/feedback ${id}`);
}
const pkg=JSON.parse(readFileSync('package.json'));
const release=JSON.parse(readFileSync('site/guide/release.json'));
assert.equal(release.version,pkg.dependencies['ds-loop']);
assert.equal(release.integrity,JSON.parse(readFileSync('package-lock.json')).packages['node_modules/ds-loop'].integrity);
console.log(`${count} local links and anchors verified; documentation matches the locked release.`);
