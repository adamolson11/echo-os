const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const PORT = process.env.PORT || 3000;
const BASE = `http://localhost:${PORT}`;
const ROUTES = ['/', '/gateway', '/hub', '/story', '/archive', '/lab', '/codex', '/map', '/about', '/blog'];
const REPORT_DIR = path.resolve(__dirname, '../../lab_sys/v1/reports');
const SCREEN_DIR = path.join(REPORT_DIR, 'screenshots');

function waitForServer(timeout = 30000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    (function check() {
      const req = http.request({ method: 'GET', host: 'localhost', port: PORT, path: '/' }, (res) => {
        res.resume();
        resolve();
      });
      req.on('error', () => {
        if (Date.now() - start > timeout) return reject(new Error('Timeout waiting for server'));
        setTimeout(check, 500);
      });
      req.end();
    })();
  });
}

(async () => {
  if (!fs.existsSync(REPORT_DIR)) fs.mkdirSync(REPORT_DIR, { recursive: true });
  if (!fs.existsSync(SCREEN_DIR)) fs.mkdirSync(SCREEN_DIR, { recursive: true });

  // Spawn Next.js directly via the installed binary to avoid relying on a shell `npm` executable.
  // Explicitly bind the chosen PORT so this script can run alongside `next dev`.
  const nextBin = path.join(__dirname, '..', '..', 'node_modules', 'next', 'dist', 'bin', 'next');
  const server = spawn(
    process.execPath,
    [nextBin, 'start', '-p', String(PORT)],
    {
      stdio: ['ignore', 'pipe', 'pipe'],
      cwd: path.resolve(__dirname, '../..'),
      env: { ...process.env, PORT: String(PORT) },
    }
  );
  server.stdout.on('data', (d) => process.stdout.write(`[next] ${d}`));
  server.stderr.on('data', (d) => process.stderr.write(`[next-err] ${d}`));

  try {
    process.stdout.write('Waiting for Next.js server to be ready...\n');
    await waitForServer(40000);
    process.stdout.write('Server ready — launching Puppeteer\n');

    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const report = [];
    const consoleLogs = [];

    for (const route of ROUTES) {
      const page = await browser.newPage();
      const desktopViewport = { width: 1280, height: 800 };
      const mobileViewport = { width: 390, height: 844, isMobile: true };

      const errors = [];
      page.on('console', (msg) => {
        const text = `[${msg.type()}] ${msg.text()}`;
        consoleLogs.push({ route, viewport: 'desktop', text });
        if (msg.type() === 'error') errors.push(text);
      });
      page.on('pageerror', (err) => {
        const text = `[pageerror] ${err.message}`;
        consoleLogs.push({ route, viewport: 'desktop', text });
        errors.push(text);
      });

      // track main response
      let status = null;
      page.on('response', (res) => {
        if (res.url().startsWith(BASE + route)) {
          status = res.status();
        }
      });

      // Desktop
      await page.setViewport(desktopViewport);
      const desktopUrl = BASE + route;
      await page.goto(desktopUrl, { waitUntil: 'networkidle2', timeout: 30000 }).catch(e => errors.push('goto-error: '+e.message));
      const desktopScreenshot = path.join(SCREEN_DIR, `${route.replace(/\//g,'') || 'root'}-desktop.png`);
      await page.screenshot({ path: desktopScreenshot, fullPage: true }).catch(e => errors.push('screenshot-error: '+e.message));

      // Mobile
      await page.setViewport(mobileViewport);
      await page.goto(desktopUrl, { waitUntil: 'networkidle2', timeout: 30000 }).catch(e => errors.push('goto-error-mobile: '+e.message));
      const mobileScreenshot = path.join(SCREEN_DIR, `${route.replace(/\//g,'') || 'root'}-mobile.png`);
      await page.screenshot({ path: mobileScreenshot, fullPage: true }).catch(e => errors.push('screenshot-error-mobile: '+e.message));

      report.push({ route, status: status || 'unknown', errors });
      await page.close();
    }

    await browser.close();

    const reportMd = [];
    reportMd.push('# Yellow Automated Smoke QA — Routes + Console Errors');
    reportMd.push(`Timestamp: ${new Date().toISOString()}`);
    reportMd.push('');
    reportMd.push('## Summary');
    for (const r of report) {
      reportMd.push(`- **Route**: ${r.route} — **Status**: ${r.status} — **Errors**: ${r.errors.length}`);
    }
    reportMd.push('');
    reportMd.push('## Details');
    for (const r of report) {
      reportMd.push(`### ${r.route}`);
      reportMd.push(`- Status: ${r.status}`);
      if (r.errors.length) {
        reportMd.push('- Errors:');
        for (const e of r.errors) reportMd.push(`  - ${e}`);
      } else {
        reportMd.push('- Errors: none');
      }
      reportMd.push(`- Screenshots: ./screenshots/${r.route.replace(/\//g,'') || 'root'}-desktop.png, ./screenshots/${r.route.replace(/\//g,'') || 'root'}-mobile.png`);
      reportMd.push('');
    }

    fs.writeFileSync(path.join(REPORT_DIR, 'yellow-smoke-report.md'), reportMd.join('\n'));
    fs.writeFileSync(path.join(REPORT_DIR, 'console-logs.json'), JSON.stringify(consoleLogs, null, 2));

    process.stdout.write('Smoke QA completed — report and screenshots written to lab_sys/v1/reports/\n');

    // kill server
    server.kill('SIGTERM');
    process.exit(0);
  } catch (err) {
    process.stderr.write('Error during smoke QA: ' + err.message + '\n');
    server.kill('SIGTERM');
    process.exit(1);
  }
})();
