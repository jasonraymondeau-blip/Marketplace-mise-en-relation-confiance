/**
 * Génère un GIF animé de la vidéo Zafer en capturant des frames clés
 * via Playwright, puis en assemblant avec ffmpeg.
 */

import { createRequire } from 'module';
import { mkdir, writeFile, rm } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const require = createRequire(import.meta.url);
const { chromium } = require('/opt/node22/lib/node_modules/playwright');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FRAMES_DIR = path.join(__dirname, 'output', 'gif-frames');
const OUTPUT_GIF = path.join(__dirname, 'output', 'zafer-preview.gif');
const OUTPUT_MP4 = path.join(__dirname, 'output', 'zafer-preview-light.mp4');

const ZAFER = {
  primary: '#BE5C3C',
  primaryDark: '#A84A2F',
  accent: '#C1440E',
  textP: '#1A1A1A',
  textS: '#666666',
  textT: '#888888',
  textL: '#999999',
  bgLight: '#F8F6F4',
  bgVeryLight: '#F9F9F9',
  borderLight: '#DDDDDD',
};

const FONT = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');`;

// --- Helpers d'animation ---
function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
function easeIn(t) { return t * t; }
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

function lerp(frame, start, end, from, to, easingFn = easeOut) {
  const t = clamp((frame - start) / (end - start), 0, 1);
  return from + (to - from) * easingFn(t);
}

function fade(frame, start, dur = 18) { return lerp(frame, start, start + dur, 0, 1); }
function slideY(frame, start, dist = 30, dur = 24) { return lerp(frame, start, start + dur, dist, 0); }
function blur(frame, start, dur = 14) { return lerp(frame, start, start + dur, 10, 0); }
function scaleFrom(frame, start, from = 0.82, dur = 20) { return lerp(frame, start, start + dur, from, 1); }

// --- Logo SVG ---
const logoSVG = (size, color = ZAFER.primary, smile = '#fff') =>
  `<svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none">
    <path d="M50 14 C53 14 82 37 84 40 L84 78 C84 84 79 88 73 88 L27 88 C21 88 16 84 16 78 L16 40 C18 37 47 14 50 14 Z" fill="${color}"/>
    <path d="M35 62 Q50 76 65 62" stroke="${smile}" stroke-width="5.5" stroke-linecap="round" fill="none"/>
  </svg>`;

const pill = (text, ok = true, opacity = 1) => {
  const ic = ok ? '✓' : '✗';
  const icColor = ok ? '#4CAF50' : ZAFER.accent;
  const bg = ok ? '#F0FAF0' : '#FFF3F0';
  const border = ok ? '#C8EAC8' : '#FFD4C8';
  return `<div style="display:inline-flex;align-items:center;gap:8px;background:${bg};border:1.5px solid ${border};border-radius:32px;padding:7px 15px;opacity:${opacity}">
    <span style="font-size:14px;font-weight:700;color:${icColor}">${ic}</span>
    <span style="font-size:13px;font-weight:500;color:${ZAFER.textP}">${text}</span>
  </div>`;
};

const listingCard = (title, price, cat, rotate = 0, zIndex = 1) => `
  <div style="width:170px;background:#fff;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.12);overflow:hidden;transform:rotate(${rotate}deg);position:absolute;z-index:${zIndex}">
    <div style="height:80px;background:${ZAFER.bgLight};display:flex;align-items:center;justify-content:center">
      <div style="width:32px;height:32px;border-radius:7px;background:${ZAFER.borderLight}"></div>
    </div>
    <div style="padding:8px 10px 10px">
      <div style="font-size:9px;color:${ZAFER.primary};font-weight:700;text-transform:uppercase;letter-spacing:.5px">${cat}</div>
      <div style="font-size:11px;font-weight:700;color:${ZAFER.textP};margin:3px 0 5px;line-height:1.3">${title}</div>
      <div style="font-size:12px;font-weight:700;color:${ZAFER.primary}">${price}</div>
      <div style="margin-top:6px;height:3px;background:#eee;border-radius:2px;overflow:hidden">
        <div style="height:100%;width:78%;background:linear-gradient(90deg,${ZAFER.primary},${ZAFER.primaryDark});border-radius:2px"></div>
      </div>
    </div>
  </div>`;

// --- Générateurs de scènes (HTML dynamique par frame) ---
function sceneHTML(frame) {
  const FPS = 30;

  // Timing scènes (en frames)
  const S1 = { start: 0, end: 120 };
  const S2 = { start: 108, end: 300 };
  const S3 = { start: 288, end: 600 };
  const S4 = { start: 588, end: 900 };
  const S5 = { start: 888, end: 1140 };
  const S6 = { start: 1128, end: 1350 };

  // Opacités de scène (avec cross-fade)
  const s1o = clamp(1 - lerp(frame, 108, 120, 0, 1), 0, 1);
  const s2o = clamp(lerp(frame, 108, 120, 0, 1) * (1 - lerp(frame, 288, 300, 0, 1)), 0, 1);
  const s3o = clamp(lerp(frame, 288, 300, 0, 1) * (1 - lerp(frame, 588, 600, 0, 1)), 0, 1);
  const s4o = clamp(lerp(frame, 588, 600, 0, 1) * (1 - lerp(frame, 888, 900, 0, 1)), 0, 1);
  const s5o = clamp(lerp(frame, 888, 900, 0, 1) * (1 - lerp(frame, 1128, 1140, 0, 1)), 0, 1);
  const s6o = clamp(lerp(frame, 1128, 1140, 0, 1), 0, 1);

  // SCÈNE 1
  const s1 = () => {
    const t1o = fade(frame, 4);
    const t1y = slideY(frame, 4, 40);
    const t1b = blur(frame, 4);
    const t1s = scaleFrom(frame, 4);
    const t2o = fade(frame, 18);
    const t2y = slideY(frame, 18, 35);
    const t2b = blur(frame, 18);
    const p1o = fade(frame, 52);
    const p1y = slideY(frame, 52, 20);
    const p2o = fade(frame, 66);
    const p2y = slideY(frame, 66, 20);
    const p3o = fade(frame, 80);
    const p3y = slideY(frame, 80, 20);

    return `<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:48px 44px;gap:0;opacity:${s1o};background:#fff">
      <div style="font-size:54px;font-weight:700;color:${ZAFER.textP};text-align:center;line-height:1.1;margin-bottom:4px;opacity:${t1o};transform:translateY(${t1y}px) scale(${t1s});filter:blur(${t1b}px)">Vous êtes</div>
      <div style="font-size:54px;font-weight:700;color:${ZAFER.primary};text-align:center;line-height:1.1;margin-bottom:32px;opacity:${t2o};transform:translateY(${t2y}px);filter:blur(${t2b}px)">Mauriciens</div>
      <div style="display:flex;flex-direction:column;gap:11px;align-items:center">
        <div style="opacity:${p1o};transform:translateY(${p1y}px)">${pill("Facebook Marketplace n'est pas fait pour nous", false)}</div>
        <div style="opacity:${p2o};transform:translateY(${p2y}px)">${pill("Trop d'arnaqueurs, pas assez de confiance", false)}</div>
        <div style="opacity:${p3o};transform:translateY(${p3y}px)">${pill("Aucune plateforme locale dédiée", false)}</div>
      </div>
    </div>`;
  };

  // SCÈNE 2
  const s2 = () => {
    const lf = frame - S2.start;
    const q1o = fade(frame, S2.start + 8);
    const q1y = slideY(frame, S2.start + 8, 50);
    const q1b = blur(frame, S2.start + 8);
    const q2o = fade(frame, S2.start + 22);
    const q2y = slideY(frame, S2.start + 22, 35);
    const subo = fade(frame, S2.start + 60);
    const suby = slideY(frame, S2.start + 60, 15);
    const p0o = fade(frame, S2.start + 90); const p0y = slideY(frame, S2.start + 90, 35);
    const p1o = fade(frame, S2.start + 105); const p1y = slideY(frame, S2.start + 105, 35);
    const p2o = fade(frame, S2.start + 120); const p2y = slideY(frame, S2.start + 120, 35);
    const fto = fade(frame, S2.start + 148);

    const personas = [['Priya', 32, 'Enseignante', p0o, p0y], ['Kevin', 24, 'Graphiste', p1o, p1y], ['Ahmed', 45, 'Marchand auto', p2o, p2y]];

    return `<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:48px 44px;gap:0;opacity:${s2o};background:linear-gradient(160deg,#fff 40%,${ZAFER.bgLight} 100%)">
      <div style="font-size:60px;font-weight:700;color:${ZAFER.primary};text-align:center;line-height:1.05;margin-bottom:4px;opacity:${q1o};transform:translateY(${q1y}px);filter:blur(${q1b}px)">"Mo bann"</div>
      <div style="font-size:40px;font-weight:700;color:${ZAFER.textP};text-align:center;line-height:1.1;margin-bottom:26px;opacity:${q2o};transform:translateY(${q2y}px)">c'est nous</div>
      <div style="font-size:15px;color:${ZAFER.textS};text-align:center;max-width:500px;line-height:1.5;margin-bottom:28px;opacity:${subo};transform:translateY(${suby}px)">Les Mauriciens font affaire avec qui ils connaissent</div>
      <div style="display:flex;flex-direction:row;gap:12px;margin-bottom:24px">
        ${personas.map(([n, a, p, o, y]) => `
          <div style="width:145px;border-radius:12px;background:#fff;padding:14px;box-shadow:0 2px 12px rgba(0,0,0,.10);display:flex;flex-direction:column;align-items:center;gap:7px;opacity:${o};transform:translateY(${y}px)">
            <div style="width:40px;height:40px;border-radius:20px;background:${ZAFER.primary};display:flex;align-items:center;justify-content:center;color:#fff;font-size:15px;font-weight:700">${n[0]}</div>
            <div style="text-align:center">
              <div style="font-size:13px;font-weight:700;color:${ZAFER.textP}">${n}</div>
              <div style="font-size:11px;color:${ZAFER.textT}">${a} ans</div>
              <div style="font-size:11px;color:${ZAFER.textS};margin-top:2px">${p}</div>
            </div>
          </div>`).join('')}
      </div>
      <div style="font-size:12px;color:${ZAFER.textT};font-style:italic;text-align:center;opacity:${fto}">Quand la confiance arrive, tout se propage</div>
    </div>`;
  };

  // SCÈNE 3
  const s3 = () => {
    const lgo = fade(frame, S3.start + 6);
    const lgscale = lerp(frame, S3.start + 6, S3.start + 28, 0, 1, t => 1 - Math.pow(1-t, 2.5));
    const no = fade(frame, S3.start + 24);
    const ny = slideY(frame, S3.start + 24, 30);
    const nb = blur(frame, S3.start + 24);
    const tago = fade(frame, S3.start + 52);
    const tagy = slideY(frame, S3.start + 52, 15);
    const pillo = fade(frame, S3.start + 70);
    const c1o = fade(frame, S3.start + 90);
    const c2o = fade(frame, S3.start + 105);
    const c3o = fade(frame, S3.start + 120);
    const f1o = fade(frame, S3.start + 168); const f1x = lerp(frame, S3.start + 168, S3.start + 192, -40, 0);
    const f2o = fade(frame, S3.start + 183); const f2y2 = lerp(frame, S3.start + 183, S3.start + 207, 30, 0);
    const f3o = fade(frame, S3.start + 198); const f3x = lerp(frame, S3.start + 198, S3.start + 222, 40, 0);

    const features = [
      ['🔒', 'Confiance', 'Score vendeur transparent', f1o, f1x, 0],
      ['📍', '100% Mauricien', 'Fait pour Maurice', f2o, 0, f2y2],
      ['💬', 'Via WhatsApp', 'Contact direct', f3o, -f3x, 0],
    ];

    return `<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:56px 36px 36px;gap:0;opacity:${s3o};background:#fff;overflow:hidden">
      <div style="opacity:${lgo};transform:scale(${lgscale});margin-bottom:14px">${logoSVG(68)}</div>
      <div style="font-size:50px;font-weight:700;color:${ZAFER.primary};letter-spacing:3px;margin-bottom:7px;opacity:${no};transform:translateY(${ny}px);filter:blur(${nb}px)">ZAFER</div>
      <div style="font-size:14px;color:${ZAFER.textS};text-align:center;margin-bottom:12px;opacity:${tago};transform:translateY(${tagy}px)">La plateforme locale de petites annonces</div>
      <div style="margin-bottom:20px;opacity:${pillo}">${pill('Faite pour Maurice, par Maurice', true)}</div>
      <div style="position:relative;height:150px;width:100%;margin-bottom:20px">
        <div style="position:absolute;left:20px;top:12px;opacity:${c3o}">${listingCard('Toyota Yaris 2019','280 000 RS','Véhicule',-6,1)}</div>
        <div style="position:absolute;right:20px;top:6px;opacity:${c2o}">${listingCard('Appart Q.Bornes','12 500 RS/m','Immobilier',4,2)}</div>
        <div style="position:absolute;left:50%;transform:translateX(-50%);opacity:${c1o}">${listingCard('Canapé tissu gris','8 500 RS','Maison',0,3)}</div>
      </div>
      <div style="display:flex;flex-direction:row;gap:10px;width:100%">
        ${features.map(([ic, t, d, o, x, y]) => `
          <div style="flex:1;border-radius:12px;background:${ZAFER.bgVeryLight};border-left:4px solid ${ZAFER.primary};padding:14px;display:flex;flex-direction:column;gap:7px;opacity:${o};transform:translateX(${x}px) translateY(${y}px)">
            <div style="font-size:20px">${ic}</div>
            <div style="font-size:13px;font-weight:700;color:${ZAFER.textP}">${t}</div>
            <div style="font-size:11px;color:${ZAFER.textT}">${d}</div>
          </div>`).join('')}
      </div>
    </div>`;
  };

  // SCÈNE 4
  const s4 = () => {
    const to = fade(frame, S4.start + 6);
    const ty = slideY(frame, S4.start + 6, 40);
    const tb = blur(frame, S4.start + 6);
    const subo = fade(frame, S4.start + 30); const suby = slideY(frame, S4.start + 30, 15);
    const c1o = fade(frame, S4.start + 55); const c1x = lerp(frame, S4.start + 55, S4.start + 83, -50, 0);
    const c2o = fade(frame, S4.start + 80); const c2y = lerp(frame, S4.start + 80, S4.start + 108, 40, 0);
    const c3o = fade(frame, S4.start + 105); const c3x = lerp(frame, S4.start + 105, S4.start + 133, 50, 0);
    const pl1 = fade(frame, S4.start + 160);
    const pl2 = fade(frame, S4.start + 175);
    const pl3 = fade(frame, S4.start + 190);

    const cats = [
      ['🚗', 'Véhicule', 'Voiture · Moto · Bateau', c1o, c1x, 0],
      ['🏠', 'Immobilier', 'Location · Vente · Commerce', c2o, 0, c2y],
      ['🛋️', 'Maison & Équipement', 'Ameublement · Électroménager', c3o, -c3x, 0],
    ];

    return `<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:48px 36px;gap:0;opacity:${s4o};background:#fff">
      <div style="font-size:46px;font-weight:700;color:${ZAFER.textP};text-align:center;line-height:1.1;margin-bottom:7px;opacity:${to};transform:translateY(${ty}px);filter:blur(${tb}px)">3 catégories</div>
      <div style="font-size:15px;color:${ZAFER.textS};text-align:center;margin-bottom:24px;opacity:${subo};transform:translateY(${suby}px)">Toutes les annonces locales au même endroit</div>
      <div style="display:flex;flex-direction:column;gap:12px;width:100%;margin-bottom:24px">
        ${cats.map(([ic, t, d, o, x, y]) => `
          <div style="border-radius:12px;background:#fff;border:2px solid ${ZAFER.primary};padding:16px 18px;display:flex;align-items:center;gap:14px;box-shadow:0 2px 8px rgba(0,0,0,.06);opacity:${o};transform:translateX(${x}px) translateY(${y}px)">
            <div style="font-size:26px">${ic}</div>
            <div>
              <div style="font-size:15px;font-weight:700;color:${ZAFER.textP}">${t}</div>
              <div style="font-size:12px;color:${ZAFER.textT};margin-top:3px">${d}</div>
            </div>
          </div>`).join('')}
      </div>
      <div style="display:flex;flex-direction:column;gap:9px;align-items:center">
        <div style="opacity:${pl1}">${pill('Prix en Roupies Mauriciennes', true)}</div>
        <div style="opacity:${pl2}">${pill('Contact direct via WhatsApp', true)}</div>
        <div style="opacity:${pl3}">${pill('Vendeurs vérifiés & notés', true)}</div>
      </div>
    </div>`;
  };

  // SCÈNE 5
  const s5 = () => {
    const to = fade(frame, S5.start + 8);
    const ty = slideY(frame, S5.start + 8, 40);
    const tb = blur(frame, S5.start + 8);
    const subo = fade(frame, S5.start + 25);
    const phono = fade(frame, S5.start + 30);
    const phscale = lerp(frame, S5.start + 30, S5.start + 55, 0.88, 1);
    const m1o = fade(frame, S5.start + 50);
    const m2o = fade(frame, S5.start + 84);
    const m3o = fade(frame, S5.start + 118);
    const fto = fade(frame, S5.start + 175);

    // Compteurs
    const cnt = (frame, start, max, dur = 60) => {
      const t = clamp((frame - start) / dur, 0, 1);
      return Math.round(easeOut(t) * max);
    };
    const v1 = cnt(frame, S5.start + 50, 500);
    const v2 = cnt(frame, S5.start + 84, 5000);
    const v3 = cnt(frame, S5.start + 118, 85, 45);
    const disp1 = v1 >= 500 ? '500+' : String(v1);
    const disp2 = v2 >= 1000 ? `${(v2/1000).toFixed(1).replace('.0','')}k+` : String(v2);
    const disp3 = `${v3}%+`;

    return `<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:48px 44px;gap:0;opacity:${s5o};background:${ZAFER.primary}">
      <!-- Dots déco -->
      <div style="position:absolute;top:100px;left:50px;width:26px;height:26px;border-radius:50%;background:${ZAFER.primaryDark};opacity:.35"></div>
      <div style="position:absolute;top:180px;right:60px;width:32px;height:32px;border-radius:50%;background:${ZAFER.primaryDark};opacity:.35"></div>
      <div style="position:absolute;bottom:200px;left:80px;width:20px;height:20px;border-radius:50%;background:${ZAFER.primaryDark};opacity:.35"></div>
      <div style="position:absolute;bottom:120px;right:40px;width:38px;height:38px;border-radius:50%;background:${ZAFER.primaryDark};opacity:.35"></div>

      <div style="font-size:48px;font-weight:700;color:#fff;text-align:center;line-height:1.15;margin-bottom:5px;opacity:${to};transform:translateY(${ty}px);filter:blur(${tb}px)">Juin 2026</div>
      <div style="font-size:20px;color:rgba(255,255,255,.85);text-align:center;margin-bottom:28px;opacity:${subo}">Le lancement est prévu</div>

      <!-- Phone mockup -->
      <div style="opacity:${phono};transform:scale(${phscale});margin-bottom:28px">
        <div style="width:185px;background:#fff;border-radius:22px;border:5px solid #1A1A1A;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,.30)">
          <div style="height:18px;background:#1A1A1A;display:flex;align-items:center;justify-content:center">
            <div style="width:46px;height:7px;background:#333;border-radius:4px"></div>
          </div>
          <div style="padding:7px 9px 4px;border-bottom:1px solid #eee;display:flex;align-items:center;gap:5px">
            ${logoSVG(16, ZAFER.primary, '#fff')}
            <span style="font-size:9px;font-weight:700;color:${ZAFER.textP}">Zafer</span>
          </div>
          <div style="padding:5px 7px;display:flex;flex-direction:column;gap:5px">
            ${[['Toyota Yaris 2019','280k RS','Véhicule'],['Appart Q.Bornes','12.5k/m','Immobilier'],['Canapé gris','8.5k RS','Maison']].map(([t,p,c])=>`
              <div style="background:${ZAFER.bgVeryLight};border-radius:6px;padding:5px 7px;display:flex;justify-content:space-between;align-items:center">
                <div>
                  <div style="font-size:7px;color:${ZAFER.primary};font-weight:700">${c}</div>
                  <div style="font-size:8px;font-weight:600;color:${ZAFER.textP}">${t}</div>
                </div>
                <div style="font-size:8px;font-weight:700;color:${ZAFER.primary}">${p}</div>
              </div>`).join('')}
          </div>
        </div>
      </div>

      <!-- Métriques -->
      <div style="display:flex;flex-direction:row;justify-content:space-around;width:100%;gap:12px;margin-bottom:20px">
        <div style="flex:1;text-align:center;opacity:${m1o}">
          <div style="font-size:46px;font-weight:700;color:#fff;line-height:1">${disp1}</div>
          <div style="font-size:11px;color:rgba(255,255,255,.75);margin-top:4px;line-height:1.4">Annonces jour 1</div>
        </div>
        <div style="width:1px;background:rgba(255,255,255,.25);align-self:stretch"></div>
        <div style="flex:1;text-align:center;opacity:${m2o}">
          <div style="font-size:46px;font-weight:700;color:#fff;line-height:1">${disp2}</div>
          <div style="font-size:11px;color:rgba(255,255,255,.75);margin-top:4px;line-height:1.4">Utilisateurs 3 mois</div>
        </div>
        <div style="width:1px;background:rgba(255,255,255,.25);align-self:stretch"></div>
        <div style="flex:1;text-align:center;opacity:${m3o}">
          <div style="font-size:46px;font-weight:700;color:#fff;line-height:1">${disp3}</div>
          <div style="font-size:11px;color:rgba(255,255,255,.75);margin-top:4px;line-height:1.4">Confiance</div>
        </div>
      </div>

      <div style="font-size:13px;color:rgba(255,255,255,.8);font-style:italic;text-align:center;opacity:${fto}">WhatsApp + Communauté = Croissance virale</div>
    </div>`;
  };

  // SCÈNE 6
  const s6 = () => {
    const lgo = fade(frame, S6.start + 6);
    const lgscale = lerp(frame, S6.start + 6, S6.start + 28, 0, 1, t => 1 - Math.pow(1-t,2.5));
    const h1o = fade(frame, S6.start + 28);
    const h1y = slideY(frame, S6.start + 28, 40);
    const h1b = blur(frame, S6.start + 28);
    const h2o = fade(frame, S6.start + 44);
    const h2y = slideY(frame, S6.start + 44, 30);
    const pl1 = fade(frame, S6.start + 72);
    const pl2 = fade(frame, S6.start + 86);
    const pl3 = fade(frame, S6.start + 100);
    const ctao = fade(frame, S6.start + 120, 20);
    const ctay = slideY(frame, S6.start + 120, 24);
    const plato = fade(frame, S6.start + 148);
    const fto = fade(frame, S6.start + 162);
    const fadeBlack = clamp(lerp(frame, 1335, 1350, 0, 1, easeIn), 0, 1);
    const outroO = fade(frame, 1340, 10);

    return `<div style="position:absolute;inset:0;opacity:${s6o};background:#fff">
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;padding:48px 44px;gap:0;opacity:${1-fadeBlack}">
        <div style="display:flex;flex-direction:row;align-items:center;gap:12px;margin-bottom:24px;opacity:${lgo};transform:scale(${lgscale})">
          ${logoSVG(64)}
          <span style="font-size:38px;font-weight:700;color:${ZAFER.textP}">Zafer</span>
        </div>
        <div style="font-size:50px;font-weight:700;color:${ZAFER.textP};text-align:center;line-height:1.1;margin-bottom:3px;opacity:${h1o};transform:translateY(${h1y}px);filter:blur(${h1b}px)">Rejoignez</div>
        <div style="font-size:50px;font-weight:700;color:${ZAFER.primary};text-align:center;line-height:1.1;margin-bottom:24px;opacity:${h2o};transform:translateY(${h2y}px)">la communauté</div>
        <div style="display:flex;flex-direction:column;gap:9px;align-items:center;margin-bottom:28px">
          <div style="opacity:${pl1}">${pill('Simple', true)}</div>
          <div style="opacity:${pl2}">${pill('Pro', true)}</div>
          <div style="opacity:${pl3}">${pill('Fait pour vous', true)}</div>
        </div>
        <div style="width:260px;height:52px;border-radius:12px;background:${ZAFER.primary};display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(190,92,60,.35);margin-bottom:12px;opacity:${ctao};transform:translateY(${ctay}px)">
          <span style="font-size:16px;font-weight:700;color:#fff">Télécharger ZAFER</span>
        </div>
        <div style="font-size:12px;color:${ZAFER.textT};margin-bottom:24px;opacity:${plato}">iOS · Android · Gratuit</div>
        <div style="height:1px;width:60%;background:${ZAFER.borderLight};margin-bottom:10px;opacity:${fto}"></div>
        <div style="font-size:10px;color:${ZAFER.textL};opacity:${fto}">zafer.mu · Juin 2026</div>
      </div>
      <!-- Overlay noir final -->
      <div style="position:absolute;inset:0;background:#000;opacity:${fadeBlack};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px">
        <div style="opacity:${outroO}">${logoSVG(80, '#fff', '#000')}</div>
        <div style="font-size:20px;font-weight:700;color:#fff;opacity:${outroO}">Zafer</div>
        <div style="font-size:13px;color:rgba(255,255,255,.7);opacity:${outroO}">À bientôt à Maurice</div>
      </div>
    </div>`;
  };

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    ${FONT}
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { width: 540px; height: 960px; font-family: 'DM Sans', sans-serif; overflow: hidden; background: #fff; }
    .canvas { position: relative; width: 540px; height: 960px; overflow: hidden; }
  </style>
</head>
<body>
  <div class="canvas">
    ${s1()}
    ${s2()}
    ${s3()}
    ${s4()}
    ${s5()}
    ${s6()}
  </div>
</body>
</html>`;
}

// --- Capture des frames ---
async function captureFrames() {
  if (existsSync(FRAMES_DIR)) {
    await rm(FRAMES_DIR, { recursive: true });
  }
  await mkdir(FRAMES_DIR, { recursive: true });
  await mkdir(path.dirname(OUTPUT_GIF), { recursive: true });

  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 540, height: 960 });

  const TOTAL_FRAMES = 1350;
  // Capture une frame toutes les 3 frames (10fps pour le GIF)
  const STEP = 3;
  const frames = [];
  for (let f = 0; f < TOTAL_FRAMES; f += STEP) {
    frames.push(f);
  }

  console.log(`Capturing ${frames.length} frames...`);

  // Load font une fois
  await page.setContent(sceneHTML(0), { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  console.log('Font loaded ✓');

  for (let i = 0; i < frames.length; i++) {
    const f = frames[i];
    await page.setContent(sceneHTML(f), { waitUntil: 'domcontentloaded' });
    const outPath = path.join(FRAMES_DIR, `frame_${String(i).padStart(4, '0')}.png`);
    await page.screenshot({ path: outPath });

    if (i % 30 === 0) {
      const pct = ((i / frames.length) * 100).toFixed(0);
      process.stdout.write(`\r  Progress: ${pct}% (frame ${f}/${TOTAL_FRAMES})`);
    }
  }

  console.log('\nAll frames captured ✓');
  await browser.close();
}

async function buildGIF() {
  console.log('Building GIF with ffmpeg...');
  // Palette optimisée pour meilleure qualité GIF
  execSync(`ffmpeg -y -framerate 10 -i "${FRAMES_DIR}/frame_%04d.png" \
    -vf "fps=10,scale=270:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer" \
    "${OUTPUT_GIF}" 2>/dev/null`, { stdio: 'pipe' });
  console.log(`GIF créé : ${OUTPUT_GIF}`);
}

async function buildMP4() {
  console.log('Building MP4 preview...');
  execSync(`ffmpeg -y -framerate 10 -i "${FRAMES_DIR}/frame_%04d.png" \
    -vf "scale=270:-1" \
    -c:v libx264 -pix_fmt yuv420p -crf 28 \
    "${OUTPUT_MP4}" 2>/dev/null`, { stdio: 'pipe' });
  console.log(`MP4 créé : ${OUTPUT_MP4}`);
}

async function main() {
  console.log('=== Zafer Preview Generator ===\n');
  await captureFrames();
  await buildGIF();
  await buildMP4();
  console.log('\nDone! Files:');
  console.log(`  GIF : ${OUTPUT_GIF}`);
  console.log(`  MP4 : ${OUTPUT_MP4}`);
}

main().catch(console.error);
