// Render every study at desktop, tablet and phone sizes and check for horizontal overflow.
// Usage: node tools/render.mjs [study ...]   (serves the repo itself; no dependencies beyond Playwright)
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
// Use a local Playwright if installed, otherwise the globally installed one.
const req = createRequire(import.meta.url);
let pw; try { pw = req('playwright'); } catch { pw = req(join(execSync('npm root -g').toString().trim(), 'playwright')); }
const { chromium, devices } = pw;
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp' };
const server = createServer(async (req, res) => {
  let p = normalize(decodeURIComponent(req.url.split('?')[0])).replace(/^(\.\.[/\\])+/, '');
  if (p.endsWith('/')) p += 'index.html';
  try { const body = await readFile(join(root, p)); res.writeHead(200, { 'content-type': types[extname(p)] || 'application/octet-stream' }); res.end(body); }
  catch { res.writeHead(404); res.end('not found'); }
}).listen(0);
const base = `http://localhost:${server.address().port}`;

// Study 001 is excluded by default: it loads remote Unsplash images (pass '001' to include it).
const all = ['index', 'a-portrait', 'b-object', 'c-archive', 'd-world', 'e-house', 'mcdc', 'wordmark'];
// Study F is five pages: f-home, f-hats, f-hat (Oris), f-maker, f-archive. Run them with: node tools/render.mjs f
const fPages = { 'f-home': '', 'f-hats': 'hats.html', 'f-hat': 'hat.html?h=oris', 'f-maker': 'maker.html', 'f-archive': 'archive.html' };
let studies = process.argv.slice(2).length ? process.argv.slice(2) : all;
studies = studies.flatMap(s => s === 'f' ? Object.keys(fPages) : [s]);
const sizes = [
  { name: 'desktop', opts: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 } },
  { name: 'tablet', opts: { viewport: { width: 834, height: 1112 }, deviceScaleFactor: 1, hasTouch: true } },
  { name: 'phone', opts: devices['iPhone 13'] },
];
await mkdir(join(root, 'screenshots'), { recursive: true });
const browser = await chromium.launch();
let problems = 0;
for (const s of studies) {
  const url = s === 'index' ? `${base}/` : s === 'mcdc' ? `${base}/music-city-driving-club/` : s in fPages ? `${base}/studies/f-working-house/${fPages[s]}` : `${base}/studies/${s}/`;
  for (const size of sizes) {
    const ctx = await browser.newContext({ ...size.opts, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => m.type() === 'error' && errors.push(m.text()));
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    // Scroll through once so lazy-loaded images are fetched before the full-page screenshot.
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } scrollTo(0, 0); });
    await page.waitForLoadState('networkidle');
    const o = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
    const tag = `${s}-${size.name}`;
    if (o.sw > o.cw) { problems++; console.log(`OVERFLOW ${tag}: ${o.sw} > ${o.cw}`); }
    for (const e of errors) { problems++; console.log(`ERROR ${tag}: ${e}`); }
    await page.screenshot({ path: join(root, 'screenshots', `${tag}-first.png`) });
    if (size.name !== 'tablet') await page.screenshot({ path: join(root, 'screenshots', `${tag}-full.png`), fullPage: true });
    await ctx.close();
  }
  console.log(`rendered ${s}`);
}
await browser.close();
server.close();
console.log(problems ? `${problems} problem(s)` : 'no overflow, no console errors');
process.exit(problems ? 1 : 0);
