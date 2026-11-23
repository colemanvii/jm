// Render Study E and Study F homepages under identical conditions for a side-by-side comparison.
// Usage: node tools/compare.mjs   → screenshots/compare/{e,f}-{desktop,phone}-{first,full}.png
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
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
const base = `http://localhost:${server.address().port}`;
const out = join(root, 'screenshots', 'compare'); await mkdir(out, { recursive: true });
const browser = await chromium.launch();
for (const [k, path] of [['e', '/studies/e-house/'], ['f', '/studies/f-working-house/']]) {
  for (const [size, opts] of [['desktop', { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }], ['phone', devices['iPhone 13']]]) {
    const ctx = await browser.newContext({ ...opts, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto(base + path, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } scrollTo(0, 0); });
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: join(out, `${k}-${size}-first.png`) });
    await page.screenshot({ path: join(out, `${k}-${size}-full.png`), fullPage: true });
    await ctx.close();
  }
}
await browser.close(); server.close(); console.log('compare renders written to screenshots/compare/');
