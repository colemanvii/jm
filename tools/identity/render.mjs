// Render the identity studies: the three website openings (desktop + phone), the board, and Study F.1.
// Usage: node tools/identity/render.mjs [only...]   → screenshots/identity/*.png
// Fails on horizontal overflow or console errors.
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
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
const base = `http://localhost:${server.address().port}`;
const pages = {
  'site-thread': '/studies/identity/site.html?d=thread',
  'site-charm': '/studies/identity/site.html?d=charm',
  'site-george': '/studies/identity/site.html?d=george',
  'board': '/studies/identity/',
  'f1-home': '/studies/f1-charm/',
  'f1-hats': '/studies/f1-charm/hats.html',
  'f1-hat': '/studies/f1-charm/hat.html?h=oris',
  'f1-archive': '/studies/f1-charm/archive.html',
};
const only = process.argv.slice(2);
const out = join(root, 'screenshots', 'identity'); await mkdir(out, { recursive: true });
const browser = await chromium.launch();
let problems = 0;
for (const [k, path] of Object.entries(pages)) {
  if (only.length && !only.some(o => k.startsWith(o))) continue;
  for (const [size, opts] of [['desktop', { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }], ['phone', devices['iPhone 13']]]) {
    const ctx = await browser.newContext({ ...opts, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message)); page.on('console', m => m.type() === 'error' && errors.push(m.text()));
    const r = await page.goto(base + path, { waitUntil: 'networkidle' });
    if (!r || r.status() !== 200) { console.log(`MISSING ${k}`); problems++; await ctx.close(); continue; }
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } scrollTo(0, 0); });
    await page.waitForLoadState('networkidle'); await page.waitForTimeout(200);
    const o = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
    if (o[0] > o[1]) { problems++; console.log(`OVERFLOW ${k}-${size}: ${o[0]} > ${o[1]}`); }
    for (const e of errors) { problems++; console.log(`ERROR ${k}-${size}: ${e}`); }
    await page.screenshot({ path: join(out, `${k}-${size}-first.png`) });
    await page.screenshot({ path: join(out, `${k}-${size}-full.png`), fullPage: true });
    await ctx.close();
  }
  console.log('rendered', k);
}
await browser.close(); server.close();
console.log(problems ? `${problems} problem(s)` : 'no overflow, no console errors');
process.exit(problems ? 1 : 0);
