// Vision 001 renders: desktop 1440×900 and iPhone 13, first screen and full page, for every page.
// Fails on console errors, failed requests (other than the optional MCDC drawings) or horizontal overflow.
// Usage: node tools/vision/render.mjs [outDir]   (serves the repo root itself)
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const req = createRequire(import.meta.url);
let pw; try { pw = req('playwright'); } catch { pw = req(execSync('npm root -g').toString().trim() + '/playwright'); }
const { chromium, devices } = pw;
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const out = path.resolve(process.argv[2] || path.join(root, 'screenshots/vision-001'));
fs.mkdirSync(out, { recursive: true });
const types = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.json':'application/json', '.webp':'image/webp', '.png':'image/png', '.woff2':'font/woff2', '.svg':'image/svg+xml' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  const f = path.join(root, p);
  if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(0);
const base = `http://localhost:${server.address().port}`;

const pages = [
  ['1-home', '/index.html'],
  ['2a-hats', '/hats/index.html'],
  ['2b-hat-oris', '/hats/hat.html?h=oris'],
  ['3-hatmaker', '/hatmaker/index.html'],
  ['4-mcdc', '/music-city-driving-club/index.html'],
  ['5-commission', '/commission/index.html'],
  ['6-notes', '/notes/index.html'],
];
const viewports = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  phone: { ...devices['iPhone 13'] },
};
const browser = await chromium.launch();
let failed = 0;
for (const [vname, opts] of Object.entries(viewports)) {
  const ctx = await browser.newContext({ ...opts, reducedMotion: 'reduce' });
  for (const [name, url] of pages) {
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', m => { if (m.type() === 'error' && !/winged-wheel|crossed-flags|go-line|drawings-2024/.test(m.text())) errors.push(m.text()); });
    page.on('pageerror', e => errors.push(String(e)));
    page.on('requestfailed', r => { if (r.url().startsWith(base)) errors.push('failed ' + r.url()); });
    page.on('response', r => { if (r.url().startsWith(base) && r.status() >= 400 && !/winged-wheel|crossed-flags|go-line|drawings-2024/.test(r.url())) errors.push(r.status() + ' ' + r.url()); });
    await page.goto(base + url, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (overflow > 0) errors.push(`horizontal overflow ${overflow}px`);
    await page.screenshot({ path: `${out}/${name}-${vname}-first.png` });
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } scrollTo(0, 0); });
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: `${out}/${name}-${vname}-full.jpg`, fullPage: true, type: "jpeg", quality: 82 });
    console.log(`${errors.length ? 'FAIL' : 'ok  '} ${vname.padEnd(7)} ${name}${errors.length ? '  ' + errors.join(' | ') : ''}`);
    if (errors.length) failed++;
    await page.close();
  }
  await ctx.close();
}
await browser.close();
server.close();
process.exit(failed ? 1 : 0);
