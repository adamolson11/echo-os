const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const out = { consoleErrors: [], consoleWarnings: [], consoleLogs: [], canvasCount: 0, canvasSizes: [], screenshot: null };
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(30000);

  page.on('console', (msg) => {
    try {
      const text = msg.text();
      if (msg.type() === 'error') out.consoleErrors.push(text);
      else if (msg.type() === 'warning') out.consoleWarnings.push(text);
      else out.consoleLogs.push(text);
    } catch (e) {
      // ignore
    }
  });

  try {
    const url = 'http://localhost:3000/codex';
    await page.goto(url, { waitUntil: 'networkidle2' });

    // wait a little for simulation to run
    await new Promise((res) => setTimeout(res, 12000));

    const canvasInfo = await page.evaluate(() => {
      const canvases = Array.from(document.querySelectorAll('canvas'));
      return canvases.map(c => {
        const r = c.getBoundingClientRect();
        return { width: r.width, height: r.height }; 
      });
    });

    out.canvasCount = canvasInfo.length;
    out.canvasSizes = canvasInfo;

    const screenshotPath = 'tmp/codex.png';
    // ensure tmp dir
    try { fs.mkdirSync('tmp', { recursive: true }); } catch (e) {}
    await page.screenshot({ path: screenshotPath, fullPage: true });
    out.screenshot = screenshotPath;

    console.log(JSON.stringify(out, null, 2));
  } catch (err) {
    console.error('SMOKE-ERROR', err && err.stack ? err.stack : err);
    process.exitCode = 2;
  } finally {
    await browser.close();
  }
})();
