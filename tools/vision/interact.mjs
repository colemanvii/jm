// Vision 001 interaction checks: phone menu, felt switcher, jacket/patches, inquiry journey, internal links.
// Usage: node tools/vision/interact.mjs
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const req = createRequire(import.meta.url);
let pw;
try { pw = req('playwright'); } catch { pw = req(execSync('npm root -g').toString().trim() + '/playwright'); }
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.woff2': 'font/woff2' };
const server = http.createServer((q, r) => {
  let p = decodeURIComponent(new URL(q.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  const f = path.join(root, p);
  if (!f.startsWith(root) || !fs.existsSync(f)) { r.writeHead(404); r.end(); return; }
  r.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(r);
}).listen(0);
const base = `http://localhost:${server.address().port}`;
const browser = await pw.chromium.launch();
let fails = 0;
const ok = (cond, msg) => { console.log((cond ? 'ok   ' : 'FAIL ') + msg); if (!cond) fails++; };

// 1. Phone menu
{
  const ctx = await browser.newContext({ ...pw.devices['iPhone 13'] });
  const p = await ctx.newPage();
  await p.goto(base + '/index.html');
  ok(!(await p.isVisible('#nav a[href="hats/index.html"]')), 'phone: menu closed by default');
  await p.click('.menu-btn');
  ok(await p.isVisible('#nav a[href="hats/index.html"]'), 'phone: menu opens');
  await p.click('#nav a[href="hats/index.html"]');
  ok(p.url().endsWith('/hats/index.html'), 'phone: menu navigates');
  await ctx.close();
}

const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const p = await ctx.newPage();

// 2. Felt switcher
await p.goto(base + '/hats/hat.html?h=oris');
ok(await p.textContent('#hat-name') === 'Oris', 'product: Oris by default');
await p.click('label.felt:has(input[value=cerelia])');
ok(await p.textContent('#hat-name') === 'Cerelia' && p.url().includes('h=cerelia'), 'product: switch to Cerelia updates name and URL');
ok((await p.getAttribute('[data-k=href]', 'href')).endsWith('/products/primavera'), 'product: order link follows the hat');
ok((await p.$$('[data-k=rows] > div')).length >= 8, 'product: specification rendered');
await p.goto(base + '/hats/hat.html?h=nope');
ok(await p.textContent('#hat-name') === 'Oris', 'product: unknown hat falls back to Oris');

// 3. Jacket
await p.goto(base + '/music-city-driving-club/index.html');
await p.click('#pgrid button[data-p=rocker]');
ok(await p.getAttribute('#flat', 'data-side') === 'back' && await p.textContent('#t-name') === 'Club Rocker', 'mcdc: back patch flips jacket');
await p.click('.seg button[data-side=front]');
await p.click('.spot[data-p=jm]');
ok(await p.textContent('#t-name') === 'Joseph Martin', 'mcdc: jacket spot selects patch');
ok(!(await p.content()).includes('Freeman'), 'mcdc: no unconfirmed partner patch');

// 4. Inquiry: custom felt
await p.goto(base + '/commission/index.html');
await p.click('#next');
ok((await p.textContent('#err')).length > 0, 'inquiry: requires a choice');
await p.click('label.opt:has(input[value=felt])'); await p.click('#next');
await p.click('label.opt:has(input[value="Western"])'); await p.click('#next');
await p.click('label.opt:has(input[value="Whiskey"])'); await p.click('#next');
await p.click('label.opt:has(input[value="I know my size"])'); await p.click('#next');
ok((await p.textContent('#err')).includes('size'), 'inquiry: size required when known');
await p.selectOption('#size', '7 ½'); await p.click('#next');
await p.fill('#nm', 'Test Person'); await p.fill('#em', 'bad'); await p.click('#next');
ok((await p.textContent('#err')).includes('email'), 'inquiry: email validated');
await p.fill('#em', 'test@example.com'); await p.click('#next');
const sum = await p.textContent('#summary');
ok(sum.includes('Western') && sum.includes('Whiskey') && sum.includes('7 ½'), 'inquiry: review summarises answers');
await p.click('#next');
ok(await p.isVisible('#done') && (await p.textContent('#done')).includes('nothing was sent'), 'inquiry: confirmation states nothing was sent');

// 5. Inquiry: club shortcut
await p.goto(base + '/commission/index.html?about=club#inquiry');
await p.click('#next');
ok(await p.isVisible('#nm'), 'inquiry: club path skips hat questions');

// 6. Internal links resolve
const pages = ['/index.html', '/hats/index.html', '/hats/hat.html', '/hatmaker/index.html', '/music-city-driving-club/index.html', '/commission/index.html', '/notes/index.html'];
const seen = new Set();
const bad = [];
for (const u of pages) {
  await p.goto(base + u);
  for (const h of await p.$$eval('a[href]', as => as.map(a => a.href))) {
    if (!h.startsWith(base)) continue;
    const clean = h.split('#')[0].split('?')[0];
    if (seen.has(clean)) continue;
    seen.add(clean);
    const res = await fetch(clean);
    if (res.status !== 200) bad.push(clean);
  }
}
ok(bad.length === 0, `links: ${seen.size} internal links resolve ${bad.join(' ')}`);

await browser.close();
server.close();
process.exit(fails ? 1 : 0);
