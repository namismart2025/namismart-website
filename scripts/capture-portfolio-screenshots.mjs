import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../src/assets/images/portfolio');
await mkdir(outDir, { recursive: true });

const DESKTOP_VIEWPORT = { width: 1440, height: 900 };
const MOBILE_VIEWPORT = { width: 390, height: 844 };

const browser = await chromium.launch();

async function shot(page, key) {
  await page.waitForTimeout(900);
  await page.screenshot({ path: path.join(outDir, `${key}.png`) });
  console.log(`✓ ${key}.png`);
}

// ---- NaMiVisa: marketing home + public demo app pages ----
// "Open Demo Account" is a public, no-login button that seeds an anonymous
// demo session cookie — confirmed no credentials are entered anywhere.
// The demo app is client-rendered and only works via real in-app link
// clicks (a hard page reload/goto into an authenticated route shows an
// empty loading skeleton), so we navigate by clicking, not by URL.
{
  const page = await browser.newPage({ viewport: DESKTOP_VIEWPORT });
  await page.goto('https://www.namivisa.com/', { waitUntil: 'load', timeout: 30000 });
  await shot(page, 'namivisa-desktop');

  const demoBtn = page.getByRole('button', { name: /demo account/i });
  await demoBtn.scrollIntoViewIfNeeded();
  await demoBtn.click();
  await page.waitForLoadState('load');

  // Dismiss the "App tutorial" onboarding overlay if it appears — it
  // intercepts clicks on the sidebar nav links otherwise.
  try {
    const skipBtn = page.getByRole('button', { name: /^skip$/i });
    await skipBtn.waitFor({ state: 'visible', timeout: 5000 });
    await skipBtn.click();
  } catch {
    // no tutorial shown, nothing to dismiss
  }

  await shot(page, 'namivisa-dashboard-desktop');

  for (const [route, key] of [
    ['/progress', 'namivisa-progress-desktop'],
    ['/metrics', 'namivisa-metrics-desktop'],
    ['/ai', 'namivisa-ai-desktop'],
  ]) {
    await page.click(`a[href="${route}"]`);
    await page.waitForLoadState('load');
    await shot(page, key);
  }
  await page.close();

  // Mobile: marketing home only (matches the mobile-inset pattern used elsewhere)
  const mPage = await browser.newPage({ viewport: MOBILE_VIEWPORT, deviceScaleFactor: 2 });
  await mPage.goto('https://www.namivisa.com/', { waitUntil: 'load', timeout: 30000 });
  await shot(mPage, 'namivisa-mobile');
  await mPage.close();
}

// ---- Casa Privée: plain public multi-page site, simple goto per page ----
{
  const pages = [
    ['https://casaprivee.vercel.app/', 'casaprivee-desktop'],
    ['https://casaprivee.vercel.app/properties', 'casaprivee-properties-desktop'],
    ['https://casaprivee.vercel.app/properties/five-oceans-malibu', 'casaprivee-detail-desktop'],
    ['https://casaprivee.vercel.app/event-types', 'casaprivee-eventtypes-desktop'],
    ['https://casaprivee.vercel.app/how-it-works', 'casaprivee-howitworks-desktop'],
  ];
  for (const [url, key] of pages) {
    const page = await browser.newPage({ viewport: DESKTOP_VIEWPORT });
    await page.goto(url, { waitUntil: 'load', timeout: 30000 });
    await shot(page, key);
    await page.close();
  }

  const mPage = await browser.newPage({ viewport: MOBILE_VIEWPORT, deviceScaleFactor: 2 });
  await mPage.goto('https://casaprivee.vercel.app/', { waitUntil: 'load', timeout: 30000 });
  await shot(mPage, 'casaprivee-mobile');
  await mPage.close();
}

// ---- NaMiSmart: our own live pages ----
{
  const pages = [
    ['https://www.namismart.com/', 'namismart-desktop'],
    ['https://www.namismart.com/security-cameras', 'namismart-security-desktop'],
    ['https://www.namismart.com/projects', 'namismart-projects-desktop'],
    ['https://www.namismart.com/contact', 'namismart-contact-desktop'],
  ];
  for (const [url, key] of pages) {
    const page = await browser.newPage({ viewport: DESKTOP_VIEWPORT });
    await page.goto(url, { waitUntil: 'load', timeout: 30000 });
    await shot(page, key);
    await page.close();
  }

  const mPage = await browser.newPage({ viewport: MOBILE_VIEWPORT, deviceScaleFactor: 2 });
  await mPage.goto('https://www.namismart.com/', { waitUntil: 'load', timeout: 30000 });
  await shot(mPage, 'namismart-mobile');
  await mPage.close();
}

await browser.close();
console.log('\nAll portfolio screenshots captured.');
