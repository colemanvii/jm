// Exercise Study F: felt switcher (keyboard), hat template for every hat, archive filters and detail dialog.
// Usage: node tools/interact-f.mjs   (writes a few state screenshots to screenshots/)
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('..', import.meta.url));
const req = createRequire(import.meta.url);
let pw; try { pw = req('playwright'); } catch { pw = req(join(execSync('npm root -g').toString().trim(), 'playwright')); }
const { chromium, devices } = pw;
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2', '.png': 'image/png', '.webp': 'image/webp' };
const server = createServer(async (rq, res) => {
  let p = normalize(decodeURIComponent(rq.url.split('?')[0])).replace(/^(\.\.[/\\])+/, '');
  if (p.endsWith('/')) p += 'index.html';
  try { const b = await readFile(join(root, p)); res.writeHead(200, { 'content-type': types[extname(p)] || 'application/octet-stream' }); res.end(b); }
  catch { res.writeHead(404); res.end(); }
}).listen(0);
const base = `http://localhost:${server.address().port}/studies/f-working-house/`;
const shots = join(root, 'screenshots');
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const page = await ctx.newPage();
const errors = []; page.on('pageerror', e => errors.push(e.message)); page.on('console', m => m.type() === 'error' && errors.push(m.text()));

// 1. Felt switcher
await page.goto(base, { waitUntil: 'networkidle' });
await page.locator('.felts [data-k="artemis"]').click();
ok(await page.locator('#stage-name').textContent() === 'Artemis', 'felt switcher: Granite shows Artemis');
ok((await page.locator('#hats').getAttribute('style')).includes('#66665F'), 'felt switcher: section takes the granite felt');
await page.keyboard.press('ArrowRight');
ok(await page.locator('#stage-name').textContent() === 'Oris', 'felt switcher: arrow key moves to Whiskey/Oris');
await page.locator('.felts [data-k="ahab"]').click();
ok(await page.locator('#hats').getAttribute('data-tone') === 'light', 'felt switcher: Natural switches to dark text');
await page.locator('#hats').screenshot({ path: join(shots, 'f-home-desktop-natural.png') });

// 2. Hat template renders every hat
for (const h of ['ahab', 'artemis', 'oris', 'cerelia']) {
  await page.goto(base + 'hat.html?h=' + h, { waitUntil: 'networkidle' });
  const name = await page.locator('#h1').textContent();
  ok(name.toLowerCase() === h, `hat page: ${h} renders`);
  ok(await page.locator('#f-draw svg').count() === 1, `hat page: ${h} drawing present`);
}
await page.goto(base + 'hat.html?h=cerelia', { waitUntil: 'networkidle' });
await page.screenshot({ path: join(shots, 'f-hat-desktop-cerelia.png') });

// 3. Archive filters and detail
await page.goto(base + 'archive.html', { waitUntil: 'networkidle' });
const total = await page.locator('#grid li').count();
await page.locator('#filters [data-c="drawings"]').click();
await page.waitForTimeout(400);
ok(await page.locator('#grid li:not([hidden])').count() === 4, `archive: Drawings filter shows 4 of ${total}`);
await page.locator('#grid li:not([hidden]) .entry').first().click();
await page.locator('#dbody img').evaluate(i => i.complete || new Promise(r => i.onload = r));
await page.waitForTimeout(500);
ok(await page.locator('#detail').evaluate(d => d.open), 'archive: detail dialog opens');
await page.screenshot({ path: join(shots, 'f-archive-desktop-detail.png') });
await page.keyboard.press('Escape');
ok(!(await page.locator('#detail').evaluate(d => d.open)), 'archive: Escape closes the dialog');

// 4. Phone menu
const m = await browser.newContext({ ...devices['iPhone 13'], reducedMotion: 'reduce' });
const p2 = await m.newPage();
await p2.goto(base, { waitUntil: 'networkidle' });
await p2.locator('#menu-open').click();
ok(await p2.locator('#menu').evaluate(d => d.open), 'phone: menu opens');
await p2.screenshot({ path: join(shots, 'f-home-phone-menu.png') });

for (const e of errors) ok(false, 'console: ' + e);
await browser.close(); server.close();
console.log(fails ? `${fails} failure(s)` : 'all checks passed');
process.exit(fails ? 1 : 0);
