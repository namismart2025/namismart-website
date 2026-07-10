import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../public/images/og');
await mkdir(outDir, { recursive: true });

const pages = [
  { file: 'og-home',               headline: 'Security Cameras &\nNetworking',           sub: 'GREATER LOS ANGELES' },
  { file: 'og-security-cameras',   headline: 'Security Camera\nInstallation',             sub: 'GREATER LOS ANGELES' },
  { file: 'og-networking-wifi',    headline: 'Enterprise Wi-Fi &\nNetworking',            sub: 'GREATER LOS ANGELES' },
  { file: 'og-structured-cabling', headline: 'Structured Cabling\n& Cat6 Installation',   sub: 'GREATER LOS ANGELES' },
  { file: 'og-maintenance',        headline: 'Maintenance &\nSystem Support',             sub: 'GREATER LOS ANGELES' },
  { file: 'og-blog',               headline: 'Security &\nNetworking Insights',           sub: 'NAMISMART BLOG' },
  { file: 'og-san-fernando-valley',headline: 'Security Cameras &\nNetworking',            sub: 'SAN FERNANDO VALLEY' },
  { file: 'og-ventura-county',     headline: 'Security Cameras &\nNetworking',            sub: 'VENTURA COUNTY' },
  { file: 'og-santa-clarita',      headline: 'Security Cameras &\nNetworking',            sub: 'SANTA CLARITA' },
  { file: 'og-lancaster-palmdale', headline: 'Security Cameras &\nNetworking',            sub: 'LANCASTER & PALMDALE' },
  { file: 'og-orange-county',      headline: 'Security Cameras &\nNetworking',            sub: 'ORANGE COUNTY' },
];

function buildHtml(headline, sub) {
  const lines = headline.split('\n');
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    background: #080B12;
    font-family: system-ui, -apple-system, sans-serif;
    position: relative;
  }

  /* Grid background */
  .grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(77,166,255,0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(77,166,255,0.045) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  /* Blue glow */
  .glow {
    position: absolute;
    top: -120px; left: -80px;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(77,166,255,0.12), transparent 65%);
    filter: blur(40px);
  }
  .glow2 {
    position: absolute;
    bottom: -150px; right: -60px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(77,166,255,0.07), transparent 65%);
    filter: blur(50px);
  }

  /* Content */
  .content {
    position: relative; z-index: 2;
    padding: 58px 72px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  /* Top: logo */
  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .logo-mark {
    width: 36px; height: 36px;
    border: 1.5px solid #4DA6FF;
    border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
  }
  .logo-triangle {
    width: 0; height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 9px solid #4DA6FF;
  }
  .logo-name {
    font-size: 22px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.01em;
  }

  /* Middle: headline */
  .headline-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px 0 10px;
  }
  .eyebrow {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.22em;
    color: #4DA6FF;
    margin-bottom: 22px;
  }
  .headline {
    font-size: 78px;
    font-weight: 900;
    line-height: 0.93;
    letter-spacing: -0.03em;
    color: #ffffff;
  }
  .headline .blue { color: #4DA6FF; }

  /* Bottom bar */
  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid rgba(255,255,255,0.1);
    padding-top: 22px;
  }
  .location {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.2em;
    color: #5E6C86;
  }
  .cta {
    background: #4DA6FF;
    color: #04101F;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0.06em;
    padding: 10px 22px;
    border-radius: 8px;
  }
</style>
</head>
<body>
  <div class="grid"></div>
  <div class="glow"></div>
  <div class="glow2"></div>
  <div class="content">
    <div class="logo">
      <div class="logo-mark"><div class="logo-triangle"></div></div>
      <span class="logo-name">NaMiSmart</span>
    </div>
    <div class="headline-wrap">
      <div class="eyebrow">// PROFESSIONAL INSTALLATION</div>
      <div class="headline">
        ${lines[0]}<br><span class="blue">${lines[1] || ''}</span>
      </div>
    </div>
    <div class="bottom">
      <span class="location">// ${sub}</span>
      <span class="cta">FREE ESTIMATE →</span>
    </div>
  </div>
</body>
</html>`;
}

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1200, height: 630 });

for (const { file, headline, sub } of pages) {
  const html = buildHtml(headline, sub);
  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(100);
  const outPath = path.join(outDir, `${file}.png`);
  await page.screenshot({ path: outPath, type: 'png' });
  console.log(`✓ ${file}.png`);
}

await browser.close();
console.log('\nAll OG images generated.');
