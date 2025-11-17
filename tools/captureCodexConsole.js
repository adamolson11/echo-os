const puppeteer = require('puppeteer');
const fs = require('fs');
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const logs = [];
  page.on('console', msg => {
    const text = msg.text();
    const type = msg.type();
    const out = `[PAGE ${type}] ${text}`;
    console.log(out);
    logs.push(out);
  });
  page.on('pageerror', err => {
    console.error('[PAGE ERROR]', err.toString());
    logs.push('[PAGE ERROR] ' + err.toString());
  });

  try {
    await page.goto('http://localhost:3000/codex', { waitUntil: 'networkidle2', timeout: 30000 });
    // wait a bit for engine stop and zoomToFit
    await page.waitForTimeout(2000);
    // capture screenshot
    const outPath = 'tmp/codex-screenshot.png';
    fs.mkdirSync('tmp', { recursive: true });
    await page.screenshot({ path: outPath, fullPage: false });
    console.log('[CAPTURE] screenshot saved to', outPath);
  } catch (e) {
    console.error('[NAV ERROR]', e.toString());
    logs.push('[NAV ERROR] ' + e.toString());
  } finally {
    await browser.close();
    fs.writeFileSync('tmp/codex-console.log', logs.join('\n'), 'utf8');
    console.log('[CAPTURE] console log saved to tmp/codex-console.log');
  }
})();
