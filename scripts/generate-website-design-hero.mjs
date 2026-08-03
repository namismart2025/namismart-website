import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../src/assets/images');
await mkdir(outDir, { recursive: true });

// Abstract browser-window mockup in the site's own brand colors — represents
// "website design" generically without impersonating any real client site.
const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1400px; height: 1000px;
    background: radial-gradient(circle at 30% 20%, #121A2B 0%, #0A0D14 60%);
    font-family: 'Archivo', system-ui, sans-serif;
    display: flex; align-items: center; justify-content: center;
  }
  .grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(77,166,255,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(77,166,255,0.05) 1px, transparent 1px);
    background-size: 56px 56px;
  }
  .browser {
    position: relative; z-index: 2;
    width: 1180px; border-radius: 18px; overflow: hidden;
    background: #0E131D;
    border: 1px solid rgba(255,255,255,0.12);
    box-shadow: 0 60px 120px rgba(0,0,0,0.55), 0 0 0 1px rgba(77,166,255,0.08);
  }
  .chrome {
    display: flex; align-items: center; gap: 22px;
    padding: 18px 24px;
    background: #0C1019;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .dots { display: flex; gap: 9px; }
  .dot { width: 12px; height: 12px; border-radius: 50%; }
  .dot.r { background: #FF5F57; }
  .dot.y { background: #FEBC2E; }
  .dot.g { background: #28C840; }
  .addr {
    flex: 1;
    background: #161B27;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
    padding: 8px 16px;
    font-family: 'Space Mono', monospace;
    font-size: 13px;
    color: #6C7890;
  }
  .page { padding: 46px 56px 56px; }
  .pnav { display: flex; align-items: center; justify-content: space-between; margin-bottom: 54px; }
  .plogo { display: flex; align-items: center; gap: 12px; }
  .plogo-mark { width: 26px; height: 26px; border: 1.5px solid #4DA6FF; border-radius: 6px; }
  .plogo-bar { width: 92px; height: 12px; border-radius: 4px; background: #EAF0F8; opacity: 0.9; }
  .plinks { display: flex; gap: 26px; }
  .plink { width: 58px; height: 9px; border-radius: 4px; background: #3A4459; }
  .pcta { width: 118px; height: 34px; border-radius: 8px; background: #4DA6FF; }
  .hero { display: flex; gap: 64px; align-items: center; margin-bottom: 58px; }
  .hero-copy { flex: 1.1; }
  .htag { width: 150px; height: 11px; border-radius: 4px; background: rgba(77,166,255,0.5); margin-bottom: 22px; }
  .hline { height: 30px; border-radius: 6px; background: #EAF0F8; margin-bottom: 14px; }
  .hline.w1 { width: 92%; }
  .hline.w2 { width: 78%; opacity: 0.55; background: #98A4BA; height: 16px; margin-top: 6px; }
  .hbtns { display: flex; gap: 14px; margin-top: 28px; }
  .hbtn { width: 150px; height: 40px; border-radius: 9px; background: #4DA6FF; }
  .hbtn.o { background: transparent; border: 1px solid rgba(255,255,255,0.2); }
  .hero-art {
    flex: 0.9; height: 220px; border-radius: 14px;
    background: linear-gradient(155deg, #182338, #0D1220);
    border: 1px solid rgba(77,166,255,0.25);
    position: relative; overflow: hidden;
  }
  .hero-art::after {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(circle at 70% 30%, rgba(77,166,255,0.35), transparent 60%);
  }
  .cards { display: flex; gap: 22px; }
  .card { flex: 1; padding: 26px; border-radius: 14px; background: #131826; border: 1px solid rgba(255,255,255,0.08); }
  .cicon { width: 34px; height: 34px; border-radius: 9px; background: rgba(77,166,255,0.18); border: 1px solid rgba(77,166,255,0.4); margin-bottom: 18px; }
  .cline { height: 12px; border-radius: 4px; background: #3A4459; margin-bottom: 10px; }
  .cline.w1 { width: 70%; background: #C4CEDE; }
  .cline.w2 { width: 90%; }
  .cline.w3 { width: 55%; }
</style>
</head>
<body>
  <div class="grid"></div>
  <div class="browser">
    <div class="chrome">
      <div class="dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></div>
      <div class="addr">https://yourbusiness.com</div>
    </div>
    <div class="page">
      <div class="pnav">
        <div class="plogo"><div class="plogo-mark"></div><div class="plogo-bar"></div></div>
        <div class="plinks"><div class="plink"></div><div class="plink"></div><div class="plink"></div></div>
        <div class="pcta"></div>
      </div>
      <div class="hero">
        <div class="hero-copy">
          <div class="htag"></div>
          <div class="hline w1"></div>
          <div class="hline w1" style="width:70%"></div>
          <div class="hline w2"></div>
          <div class="hbtns"><div class="hbtn"></div><div class="hbtn o"></div></div>
        </div>
        <div class="hero-art"></div>
      </div>
      <div class="cards">
        <div class="card"><div class="cicon"></div><div class="cline w1"></div><div class="cline w2"></div><div class="cline w3"></div></div>
        <div class="card"><div class="cicon"></div><div class="cline w1"></div><div class="cline w2"></div><div class="cline w3"></div></div>
        <div class="card"><div class="cicon"></div><div class="cline w1"></div><div class="cline w2"></div><div class="cline w3"></div></div>
      </div>
    </div>
  </div>
</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1400, height: 1000 });
await page.setContent(html, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(100);
const outPath = path.join(outDir, 'website-design-hero-mockup.png');
await page.screenshot({ path: outPath, type: 'png' });
await browser.close();
console.log(`✓ website-design-hero-mockup.png -> ${outPath}`);
