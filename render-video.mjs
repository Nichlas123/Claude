/**
 * render-video.mjs
 * Renders project/video-render.html frame-by-frame via a local HTTP server + Playwright,
 * then encodes to ProRes 4444 .mov (with alpha channel) via ffmpeg.
 *
 * Requirements: ffmpeg, Playwright chromium
 * Usage:  npm run render   (or: PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node render-video.mjs)
 * Output: sirvoy-hero.mov  (1080×1080 transparent, content 668px wide)
 */

import { chromium } from 'playwright';
import { spawnSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'fs';
import { resolve, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';

const __dirname = dirname(fileURLToPath(import.meta.url));

const PROJECT_DIR  = resolve(__dirname, 'project');
const FRAMES_DIR   = '/tmp/sirvoy-frames';
const OUTPUT_MOV   = resolve(__dirname, 'sirvoy-hero.mov');
const SERVER_PORT  = 8789;

const STAGE_W      = 1080;
const STAGE_H      = 1080;
const DURATION     = 22.8;
const FPS          = 30;
const TOTAL_FRAMES = Math.round(DURATION * FPS); // 684

const MIME = {
  '.html': 'text/html', '.js': 'application/javascript',
  '.jsx': 'application/javascript', '.css': 'text/css',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.gif': 'image/gif', '.webp': 'image/webp',
};

function startServer() {
  return new Promise((res) => {
    const server = createServer((req, response) => {
      const safePath = req.url.split('?')[0].replace(/\.\./g, '');
      const filePath = resolve(PROJECT_DIR, '.' + safePath);
      try {
        const data = readFileSync(filePath);
        response.writeHead(200, {
          'Content-Type': MIME[extname(filePath)] || 'application/octet-stream',
          'Access-Control-Allow-Origin': '*',
        });
        response.end(data);
      } catch {
        response.writeHead(404); response.end('Not found');
      }
    });
    server.listen(SERVER_PORT, '127.0.0.1', () => res(server));
  });
}

async function main() {
  console.log(`\n🎬  Sirvoy hero video renderer`);
  console.log(`   ${TOTAL_FRAMES} frames · ${FPS} fps · ${DURATION}s · ${STAGE_W}×${STAGE_H} transparent`);
  console.log(`   Output → ${OUTPUT_MOV}\n`);

  if (existsSync(FRAMES_DIR)) rmSync(FRAMES_DIR, { recursive: true });
  mkdirSync(FRAMES_DIR, { recursive: true });

  console.log(`🌐  Starting local asset server on :${SERVER_PORT}…`);
  const server = await startServer();

  console.log('🚀  Launching browser…');
  const browser = await chromium.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: STAGE_W + 200, height: STAGE_H + 200 });

  console.log('📄  Loading video-render.html…');
  await page.goto(`http://127.0.0.1:${SERVER_PORT}/video-render.html`,
                  { waitUntil: 'networkidle', timeout: 60_000 });

  await page.waitForFunction(() => {
    return document.querySelector('[data-stage-canvas="true"]') !== null &&
           typeof window.htmlToImage?.toCanvas === 'function';
  }, { timeout: 30_000 });

  await page.waitForTimeout(3_000);

  console.log('🔥  Pre-warming renderer…');
  await page.evaluate(async () => {
    window.dispatchEvent(new CustomEvent('animstage:set', { detail: { time: 0, playing: false } }));
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    const stageEl = document.querySelector('[data-stage-canvas="true"]');
    await window.htmlToImage.toCanvas(stageEl, {
      width: 1080, height: 1080, pixelRatio: 1, cacheBust: false,
      backgroundColor: null, style: { transform: 'none' },
    });
  });
  console.log('   Ready.\n');

  console.log(`⏳  Rendering ${TOTAL_FRAMES} frames…`);
  const t0    = Date.now();
  let lastLog = 0;

  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const frameTime = i / FPS;

    const pngB64 = await page.evaluate(async (ft) => {
      window.dispatchEvent(new CustomEvent('animstage:set', { detail: { time: ft, playing: false } }));
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
      const stageEl = document.querySelector('[data-stage-canvas="true"]');
      const canvas  = await window.htmlToImage.toCanvas(stageEl, {
        width: 1080, height: 1080, pixelRatio: 1, cacheBust: false,
        backgroundColor: null, style: { transform: 'none' },
      });
      return canvas.toDataURL('image/png').replace(/^data:image\/png;base64,/, '');
    }, frameTime);

    writeFileSync(`${FRAMES_DIR}/frame_${String(i).padStart(4, '0')}.png`,
                  Buffer.from(pngB64, 'base64'));

    const elapsed = Date.now() - t0;
    if (elapsed - lastLog > 5_000 || i === TOTAL_FRAMES - 1) {
      const pct = ((i + 1) / TOTAL_FRAMES * 100).toFixed(1);
      const eta = i > 0 ? ((elapsed / (i + 1)) * (TOTAL_FRAMES - i - 1) / 1000).toFixed(0) : '?';
      process.stdout.write(`\r   Frame ${i + 1}/${TOTAL_FRAMES} (${pct}%) · ETA ${eta}s   `);
      lastLog = elapsed;
    }
  }

  console.log(`\n✅  Frames rendered in ${((Date.now() - t0) / 1000).toFixed(0)}s\n`);
  await browser.close();
  server.close();

  console.log('🎞   Encoding ProRes 4444 .mov with alpha…');
  const result = spawnSync('ffmpeg', [
    '-y', '-framerate', String(FPS),
    '-i', `${FRAMES_DIR}/frame_%04d.png`,
    '-c:v', 'prores_ks', '-profile:v', '4444',
    '-pix_fmt', 'yuva444p10le', '-vendor', 'apl0',
    '-movflags', '+faststart', OUTPUT_MOV,
  ], { stdio: 'inherit' });

  if (result.status !== 0) { console.error('❌  ffmpeg failed'); process.exit(1); }

  const sizeMB = (readFileSync(OUTPUT_MOV).length / 1_048_576).toFixed(1);
  console.log(`\n✅  Done! → ${OUTPUT_MOV} (${sizeMB} MB)\n`);
  rmSync(FRAMES_DIR, { recursive: true });
}

main().catch(err => { console.error('\n❌ ', err); process.exit(1); });
