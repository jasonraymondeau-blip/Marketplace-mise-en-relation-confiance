/**
 * Animation "cartes défilantes" style vidéo de référence Kolize
 * Texte fond : "Vous cherchez"
 * Cartes : Immobilier (maison), Voiture (voiture), Maison (frigo)
 * Format : 1920x1080 landscape
 */

import { createRequire } from 'module';
import { mkdir, rm } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const require = createRequire(import.meta.url);
const { chromium } = require('/opt/node22/lib/node_modules/playwright');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FRAMES_DIR = path.join(__dirname, 'output', 'cards-frames');
const OUT_GIF   = path.join(__dirname, 'output', 'zafer-cards-preview.gif');
const OUT_MP4   = path.join(__dirname, 'output', 'zafer-cards-preview.mp4');

// ─── Easing ───────────────────────────────────────────────────────────────────
const easeOut  = t => 1 - Math.pow(1 - t, 3);
const easeIn   = t => t * t * t;
const easeInOut= t => t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
const clamp    = (v,a,b) => Math.max(a, Math.min(b, v));
const lerp     = (a,b,t) => a + (b-a)*t;

// ─── Icons SVG ────────────────────────────────────────────────────────────────
const ICON_HOUSE = `<svg width="52" height="52" viewBox="0 0 32 32" fill="none" stroke="#1A1A1A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 16L16 4l12 12"/>
  <path d="M7 13v13h18V13"/>
  <rect x="11" y="19" width="10" height="7" rx="1"/>
</svg>`;

const ICON_CAR = `<svg width="52" height="52" viewBox="0 0 32 32" fill="none" stroke="#1A1A1A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5 18l3.5-8h15l3.5 8"/>
  <rect x="2" y="18" width="28" height="8" rx="2"/>
  <circle cx="9" cy="26" r="3"/>
  <circle cx="23" cy="26" r="3"/>
  <path d="M8 14h16"/>
  <path d="M2 22h2M28 22h2"/>
</svg>`;

const ICON_FRIDGE = `<svg width="52" height="52" viewBox="0 0 32 32" fill="none" stroke="#1A1A1A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <rect x="8" y="2" width="16" height="28" rx="3"/>
  <line x1="8" y1="12" x2="24" y2="12"/>
  <line x1="13" y1="7" x2="13" y2="10"/>
  <line x1="13" y1="17" x2="13" y2="24"/>
</svg>`;

// ─── Timing (frames @ 30fps) ───────────────────────────────────────────────────
const FPS   = 30;
const TOTAL = 8 * FPS; // 8 secondes

// Chaque carte : enterStart, enterEnd, holdEnd, exitEnd
const CARDS = [
  { icon: ICON_HOUSE, label: 'Immobilier', enterStart: 12, enterEnd: 30, holdEnd: 65,  exitEnd: 82  },
  { icon: ICON_CAR,   label: 'Voiture',    enterStart: 70, enterEnd: 88, holdEnd: 125, exitEnd: 142 },
  { icon: ICON_FRIDGE,label: 'Maison',     enterStart: 130,enterEnd:148, holdEnd: 195, exitEnd: 212 },
];

const FINAL_TEXT_START = 200;

// ─── Calcul transform d'une carte par frame ────────────────────────────────────
function cardState(frame, { enterStart, enterEnd, holdEnd, exitEnd }) {
  if (frame < enterStart) {
    return { x: 820, rotY: -70, scale: 0.85, blur: 0, opacity: 0 };
  }
  if (frame <= enterEnd) {
    const t = easeOut(clamp((frame - enterStart) / (enterEnd - enterStart), 0, 1));
    // Motion blur fort au début de l'entrée
    const blurT = 1 - clamp((frame - enterStart) / ((enterEnd - enterStart) * 0.6), 0, 1);
    return {
      x:     lerp(820, 0, t),
      rotY:  lerp(-70, 0, t),
      scale: lerp(0.85, 1, t),
      blur:  blurT * 14,
      opacity: lerp(0, 1, Math.min(t * 3, 1)),
    };
  }
  if (frame <= holdEnd) {
    return { x: 0, rotY: 0, scale: 1, blur: 0, opacity: 1 };
  }
  if (frame <= exitEnd) {
    const t = easeIn(clamp((frame - holdEnd) / (exitEnd - holdEnd), 0, 1));
    const blurT = clamp((frame - holdEnd) / ((exitEnd - holdEnd) * 0.5), 0, 1);
    return {
      x:     lerp(0, -820, t),
      rotY:  lerp(0, 70, t),
      scale: lerp(1, 0.85, t),
      blur:  blurT * 14,
      opacity: lerp(1, 0, Math.max(0, t - 0.7) / 0.3),
    };
  }
  return { x: -820, rotY: 70, scale: 0.85, blur: 0, opacity: 0 };
}

// ─── Texte fond (opacité varie légèrement selon les transitions) ───────────────
function bgTextOpacity(frame) {
  const baseOp = 0.12;
  // Réduit légèrement pendant les transitions rapides
  const isTransition = CARDS.some(c => {
    const inEnter = frame >= c.enterStart && frame <= c.enterEnd;
    const inExit  = frame >= c.holdEnd && frame <= c.exitEnd;
    return inEnter || inExit;
  });
  return isTransition ? baseOp * 0.7 : baseOp;
}

// ─── Opacité texte final ───────────────────────────────────────────────────────
function finalTextState(frame) {
  const t = clamp((frame - FINAL_TEXT_START) / 20, 0, 1);
  return { opacity: easeOut(t), scale: lerp(0.95, 1, easeOut(t)) };
}

// ─── Rendu d'une carte ────────────────────────────────────────────────────────
function renderCard({ icon, label }, { x, rotY, scale, blur, opacity }) {
  if (opacity < 0.01) return '';
  const transform = `translateX(${x}px) rotateY(${rotY}deg) scale(${scale})`;
  const filter    = blur > 0.5 ? `blur(${blur.toFixed(1)}px)` : 'none';
  return `
    <div style="
      position:absolute;
      left:50%; top:50%;
      transform:translate(-50%,-50%) perspective(900px) ${transform};
      filter:${filter};
      opacity:${opacity.toFixed(3)};
      will-change:transform;
    ">
      <!-- Ombre décalée (effet pile) -->
      <div style="
        position:absolute; inset:0;
        background:#F5F2EC;
        border:2px solid #1A1A1A;
        border-radius:18px;
        transform:translate(7px,7px);
        opacity:0.5;
      "></div>
      <!-- Carte principale -->
      <div style="
        position:relative;
        width:210px; height:240px;
        background:#F5F2EC;
        border:2.5px solid #1A1A1A;
        border-radius:18px;
        display:flex; flex-direction:column;
        align-items:center; justify-content:center;
        gap:14px;
        padding:24px 16px 20px;
      ">
        <div style="display:flex;align-items:center;justify-content:center;flex:1">
          ${icon}
        </div>
        <div style="
          font-family:'DM Sans',sans-serif;
          font-size:15px;
          font-weight:700;
          color:#1A1A1A;
          text-align:center;
          letter-spacing:0.2px;
        ">${label}</div>
      </div>
    </div>`;
}

// ─── HTML d'une frame ─────────────────────────────────────────────────────────
function frameHTML(frame) {
  const bgOp    = bgTextOpacity(frame);
  const ftState = finalTextState(frame);
  const cardsHTML = CARDS.map(card => renderCard(card, cardState(frame, card))).join('');

  // Opacité du bg text diminue pour laisser place au texte final
  const bgTextFadeOut = 1 - clamp((frame - FINAL_TEXT_START + 5) / 15, 0, 1);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&display=swap');
    * { box-sizing:border-box; margin:0; padding:0; }
    body {
      width:1920px; height:1080px;
      background:#FFFFFF;
      overflow:hidden;
      font-family:'DM Sans', sans-serif;
    }
    .scene {
      width:1920px; height:1080px;
      position:relative;
      overflow:hidden;
      display:flex; align-items:center; justify-content:center;
    }
  </style>
</head>
<body>
  <div class="scene">

    <!-- Texte fond fantôme — très grand, très transparent -->
    <div style="
      position:absolute; left:50%; top:50%;
      transform:translate(-50%,-50%);
      font-size:220px;
      font-weight:900;
      color:rgba(0,0,0,${(bgOp * bgTextFadeOut).toFixed(3)});
      white-space:nowrap;
      pointer-events:none;
      user-select:none;
      letter-spacing:-4px;
      line-height:1;
    ">Vous cherchez</div>

    <!-- Zone cartes (perspective globale) -->
    <div style="position:absolute;inset:0;">
      ${cardsHTML}
    </div>

    <!-- Texte final -->
    ${ftState.opacity > 0.01 ? `
    <div style="
      position:absolute; left:50%; top:50%;
      transform:translate(-50%,-50%) scale(${ftState.scale.toFixed(3)});
      opacity:${ftState.opacity.toFixed(3)};
      text-align:center;
      white-space:nowrap;
    ">
      <span style="font-size:42px;font-weight:700;color:#1A1A1A;font-family:'DM Sans',sans-serif;">
        Trouvez sur
      </span>
      <span style="
        font-size:42px;font-weight:700;
        color:#BE5C3C;
        font-family:'DM Sans',sans-serif;
        position:relative;
        display:inline-block;
        margin-left:10px;
      ">
        Zafer
        <svg style="position:absolute;bottom:-8px;left:-6px;width:calc(100% + 12px);height:14px;" viewBox="0 0 130 14" fill="none">
          <ellipse cx="65" cy="7" rx="63" ry="5.5" stroke="#BE5C3C" stroke-width="2.5" fill="none"/>
        </svg>
      </span>
    </div>` : ''}

  </div>
</body>
</html>`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('=== Zafer Cards Animation ===\n');

  if (existsSync(FRAMES_DIR)) await rm(FRAMES_DIR, { recursive: true });
  await mkdir(FRAMES_DIR, { recursive: true });

  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  // Préchargement font
  await page.setContent(frameHTML(0), { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  console.log('Font loaded ✓');

  // Capture : 1 frame sur 2 → 15fps pour le GIF
  const STEP = 2;
  const framesToCapture = [];
  for (let f = 0; f < TOTAL; f += STEP) framesToCapture.push(f);

  console.log(`Capturing ${framesToCapture.length} frames (${TOTAL/FPS}s @ 15fps)...`);

  for (let i = 0; i < framesToCapture.length; i++) {
    const f = framesToCapture[i];
    await page.setContent(frameHTML(f), { waitUntil: 'domcontentloaded' });
    const outPath = path.join(FRAMES_DIR, `frame_${String(i).padStart(4,'0')}.png`);
    await page.screenshot({ path: outPath });

    if (i % 20 === 0) {
      const pct = ((i / framesToCapture.length) * 100).toFixed(0);
      process.stdout.write(`\r  ${pct}% (f${f}/${TOTAL})`);
    }
  }

  console.log('\nFrames done ✓');
  await browser.close();

  // ── GIF (palette optimisée, 270px de large pour partage) ─────────────────
  console.log('Building GIF...');
  execSync(`ffmpeg -y -framerate 15 -i "${FRAMES_DIR}/frame_%04d.png" \
    -vf "scale=960:-1:flags=lanczos,fps=15,split[s0][s1];[s0]palettegen=max_colors=192[p];[s1][p]paletteuse=dither=bayer:bayer_scale=3" \
    "${OUT_GIF}" 2>/dev/null`, { stdio: 'pipe' });
  console.log(`GIF ✓`);

  // ── MP4 (haute qualité, 1920x1080) ────────────────────────────────────────
  console.log('Building MP4...');
  execSync(`ffmpeg -y -framerate 15 -i "${FRAMES_DIR}/frame_%04d.png" \
    -vf "scale=1920:1080" \
    -c:v libx264 -pix_fmt yuv420p -crf 18 -preset fast \
    "${OUT_MP4}" 2>/dev/null`, { stdio: 'pipe' });
  console.log(`MP4 ✓`);

  const { statSync } = await import('fs');
  const gifSize = (statSync(OUT_GIF).size / 1024).toFixed(0);
  const mp4Size = (statSync(OUT_MP4).size / 1024).toFixed(0);
  console.log(`\nGIF : ${gifSize} KB — ${OUT_GIF}`);
  console.log(`MP4 : ${mp4Size} KB — ${OUT_MP4}`);
}

main().catch(console.error);
