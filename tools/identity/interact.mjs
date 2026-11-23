// Exercise the identity studies and Study F.1.
// Usage: node tools/identity/interact.mjs
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../..', import.meta.url));
const req = createRequire(import.meta.url);
let pw; try { pw = req('playwright'); } catch { pw = req(join(execSync('npm root -g').toString().trim(), 'playwright')); }
const { chromium, devices } = pw;
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
const server = createServer(async (rq, res) => {
  let p = normalize(decodeURIComponent(rq.url.split('?')[0])).replace(/^(\.\.[/\\])+/, '');
  if (p.endsWith('/')) p += 'index.html';
  try { const b = await readFile(join(root, p)); res.writeHead(200, { 'content-type': types[extname(p)] || 'application/octet-stream' }); res.end(b); }
  catch { res.writeHead(404); res.end(); }
}).listen(0);
const base = `http://localhost:${server.address().port}/studies/`;
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const page = await ctx.newPage();
const errors = []; page.on('pageerror', e => errors.push(e.message)); page.on('console', m => m.type() === 'error' && errors.push(m.text()));

// identity site: each direction shows only its own opening
for (const d of ['thread', 'charm', 'george']) {
  await page.goto(base + 'identity/site.html?d=' + d, { waitUntil: 'networkidle' });
  const visible = await page.$$eval('main > section', s => s.filter(x => getComputedStyle(x).display !== 'none').map(x => x.className));
  ok(visible.length === 1 && visible[0].includes('o-' + d), `identity site: only the ${d} opening is visible`);
}
await page.goto(base + 'identity/site.html?d=charm', { waitUntil: 'networkidle' });
await page.locator('.pick [data-c="moon"]').click();
ok((await page.locator('#big-charm').innerHTML()).includes('moon charm'), 'identity site: picking the moon changes the hanging charm');

// the board draws all nine applications
await page.goto(base + 'identity/', { waitUntil: 'networkidle' });
ok(await page.locator('[data-obj] svg').count() === 9, 'board: nine application drawings (3 directions x hat, label, card)');
ok(await page.locator('.mark svg').count() >= 6, 'board: primary and small marks present');

// F.1 home: the charm switcher drives the felt, the band plate and the hero charm
await page.goto(base + 'f1-charm/', { waitUntil: 'networkidle' });
await page.locator('.charms [data-k="artemis"]').click();
ok(await page.locator('#st-name').textContent() === 'Artemis', 'F.1: choosing the moon shows Artemis');
ok((await page.locator('#big-charm').innerHTML()).includes('moon charm'), 'F.1: the hero charm becomes the moon');
ok(await page.locator('#st-band .legend2 li').count() === 3, 'F.1: Artemis band plate has a three-item legend');
await page.keyboard.press('ArrowRight');
ok(await page.locator('#st-name').textContent() === 'Oris', 'F.1: arrow key moves to Oris');
await page.locator('#hats').screenshot({ path: join(root, 'screenshots', 'identity', 'f1-home-hats-oris.png') });

// F.1 hat pages
for (const h of ['ahab', 'artemis', 'oris', 'cerelia']) {
  await page.goto(base + 'f1-charm/hat.html?h=' + h, { waitUntil: 'networkidle' });
  ok((await page.locator('#h1').textContent()).toLowerCase() === h, `F.1 hat: ${h} renders`);
  ok(await page.locator('#f-band svg.plate2').count() === 1 && await page.locator('#f-ol svg.hat2 .unv').count() === 4, `F.1 hat: ${h} has a band plate and the dashed unverified outline`);
  await page.screenshot({ path: join(root, 'screenshots', 'identity', `f1-hat-${h}-desktop-first.png`) });
}
// F.1 archive is seven pieces
await page.goto(base + 'f1-charm/archive.html', { waitUntil: 'networkidle' });
ok(await page.locator('section.piece').count() === 7, 'F.1 archive: seven pieces');
// Study F is untouched and still loads
await page.goto(base + 'f-working-house/', { waitUntil: 'networkidle' });
ok(await page.locator('#stage-name').textContent() === 'Oris', 'Study F still loads unchanged');

const m = await browser.newContext({ ...devices['iPhone 13'], reducedMotion: 'reduce' });
const p2 = await m.newPage(); p2.on('pageerror', e => errors.push(e.message));
await p2.goto(base + 'f1-charm/', { waitUntil: 'networkidle' });
await p2.locator('#menu-open').click();
ok(await p2.locator('#menu').evaluate(d => d.open), 'F.1 phone: menu opens');
for (const e of errors) ok(false, 'console: ' + e);
await browser.close(); server.close();
console.log(fails ? `${fails} failure(s)` : 'all checks passed');
process.exit(fails ? 1 : 0);
