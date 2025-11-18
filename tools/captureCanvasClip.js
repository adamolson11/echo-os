const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(30000);

  try {
    const url = 'http://localhost:3000/codex';
    await page.goto(url, { waitUntil: 'networkidle2' });
    await new Promise(res => setTimeout(res, 5000));

    // full page screenshot
    try { fs.mkdirSync('tmp', { recursive: true }); } catch (e) {}
    await page.screenshot({ path: 'tmp/codex_full.png', fullPage: true });

    // find first canvas and screenshot clipped to its bounding rect
    const rect = await page.evaluate(() => {
      const c = document.querySelector('canvas');
      if (!c) return null;
      const r = c.getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height }; 
    });

    if (!rect) {
      console.error('No canvas found');
      process.exitCode = 2;
      await browser.close();
      return;
    }

    // adjust for device pixel ratio
    const dpr = await page.evaluate(() => window.devicePixelRatio || 1);
    const clip = { x: rect.x * dpr, y: rect.y * dpr, width: rect.width * dpr, height: rect.height * dpr };

    await page.screenshot({ path: 'tmp/codex_canvas.png', clip });

    console.log('saved', 'tmp/codex_full.png', 'tmp/codex_canvas.png');
  } catch (err) {
    console.error(err && err.stack ? err.stack : err);
    process.exitCode = 2;
  } finally {
    await browser.close();
  }
})();
