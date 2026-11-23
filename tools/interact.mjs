// Exercise each study's interactive parts and screenshot the states.
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('..', import.meta.url));
const req = createRequire(import.meta.url);
let pw; try { pw = req('playwright'); } catch { pw = req(join(execSync('npm root -g').toString().trim(), 'playwright')); }
const { chromium, devices } = pw;
const url = s => 'file://' + join(root, 'studies', s, 'index.html');
const shot = n => join(root, 'screenshots', n + '.png');
const b = await chromium.launch();
const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) process.exitCode = 1; };
for (const [label, opts] of [['desktop', { viewport: { width: 1440, height: 900 } }], ['phone', devices['iPhone 13']]]) {
  const ctx = await b.newContext({ ...opts, reducedMotion: 'reduce' }); const p = await ctx.newPage();
  // A: contents dialog via keyboard
  await p.goto(url('a-portrait'));
  await p.click('#open-toc'); ok(await p.isVisible('#toc ol'), `A ${label}: contents opens`);
  await p.screenshot({ path: shot(`a-portrait-${label}-contents`) });
  await p.keyboard.press('Escape'); ok(!(await p.isVisible('#toc ol')), `A ${label}: Escape closes contents`);
  // B: felt switcher
  await p.goto(url('b-object'));
  await p.click('label.felt:has(input[value=granite])'); await p.waitForTimeout(50);
  ok((await p.textContent('#hat-name')) === 'Artemis', `B ${label}: granite selects Artemis`);
  ok((await p.getAttribute('[data-k=href]', 'href')).endsWith('/artemis'), `B ${label}: order link follows felt`);
  await p.screenshot({ path: shot(`b-object-${label}-granite`) });
  await p.keyboard.press('ArrowRight'); await p.waitForTimeout(50);
  ok((await p.textContent('#hat-name')) === 'Oris', `B ${label}: arrow key moves to next felt`);
  // C: filter + detail dialog
  await p.goto(url('c-archive'));
  await p.click('button[data-f=materials]');
  const vis = await p.$$eval('.item', els => els.filter(e => !e.hidden).map(e => e.dataset.cat));
  ok(vis.length > 0 && vis.every(c => c === 'materials'), `C ${label}: materials filter (${vis.length} shown)`);
  await p.click('button[data-f=all]');
  await p.click('.item[data-title="Artemis"] > button');
  ok(await p.isVisible('#dlg'), `C ${label}: detail opens`);
  ok((await p.textContent('#dlg-title')) === 'Artemis', `C ${label}: detail shows entry`);
  await p.screenshot({ path: shot(`c-archive-${label}-detail`) });
  await p.click('#dlg-next'); ok((await p.textContent('#dlg-title')) !== 'Artemis', `C ${label}: next entry`);
  await p.keyboard.press('Escape'); ok(!(await p.isVisible('#dlg')), `C ${label}: Escape closes detail`);
  await ctx.close();
}
await b.close();
