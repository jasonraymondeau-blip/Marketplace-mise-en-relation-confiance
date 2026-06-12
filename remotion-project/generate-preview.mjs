/**
 * Génère des aperçus PNG des 6 scènes Zafer en utilisant Playwright.
 * Crée une page HTML pour chaque scène et prend un screenshot.
 */

import { createRequire } from 'module';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const { chromium } = require('/opt/node22/lib/node_modules/playwright');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PREVIEW_DIR = path.join(__dirname, 'output', 'preview');

const ZAFER_COLORS = {
  primary: '#BE5C3C',
  primaryDark: '#A84A2F',
  accent: '#C1440E',
  text: { primary: '#1A1A1A', secondary: '#666666', tertiary: '#888888', light: '#999999' },
  border: { light: '#DDDDDD' },
  bg: { veryLight: '#F9F9F9', lightBeige: '#F8F6F4' },
};

const DM_SANS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');`;

// Logo Zafer maison + sourire
const ZAFER_LOGO_SVG = (size = 80, houseColor = ZAFER_COLORS.primary, smileColor = '#FFFFFF') => `
  <svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none">
    <path d="M50 14 C53 14 82 37 84 40 L84 78 C84 84 79 88 73 88 L27 88 C21 88 16 84 16 78 L16 40 C18 37 47 14 50 14 Z" fill="${houseColor}"/>
    <path d="M35 62 Q50 76 65 62" stroke="${smileColor}" stroke-width="5.5" stroke-linecap="round" fill="none"/>
  </svg>
`;

const PILL = (text, variant = 'check', opacity = 1) => {
  const icon = variant === 'check' ? '✓' : variant === 'cross' ? '✗' : '•';
  const iconColor = variant === 'check' ? '#4CAF50' : variant === 'cross' ? ZAFER_COLORS.accent : ZAFER_COLORS.text.secondary;
  const bg = variant === 'check' ? '#F0FAF0' : variant === 'cross' ? '#FFF3F0' : ZAFER_COLORS.bg.veryLight;
  const border = variant === 'check' ? '#C8EAC8' : variant === 'cross' ? '#FFD4C8' : ZAFER_COLORS.border.light;
  return `<div style="display:inline-flex;align-items:center;gap:8px;background:${bg};border:1.5px solid ${border};border-radius:32px;padding:8px 16px;opacity:${opacity}">
    <span style="font-size:15px;font-weight:700;color:${iconColor}">${icon}</span>
    <span style="font-size:14px;font-weight:500;color:${ZAFER_COLORS.text.primary};font-family:'DM Sans',sans-serif">${text}</span>
  </div>`;
};

const LISTING_CARD = (title, price, location, category, rotate = 0, zIndex = 1) => `
  <div style="width:180px;background:#fff;border-radius:14px;box-shadow:0 4px 20px rgba(0,0,0,0.12);overflow:hidden;transform:rotate(${rotate}deg);position:relative;z-index:${zIndex};flex-shrink:0">
    <div style="height:90px;background:${ZAFER_COLORS.bg.lightBeige};display:flex;align-items:center;justify-content:center">
      <div style="width:36px;height:36px;border-radius:8px;background:${ZAFER_COLORS.border.light}"></div>
    </div>
    <div style="padding:10px 12px 12px">
      <div style="font-size:10px;color:${ZAFER_COLORS.primary};font-weight:700;letter-spacing:.5px;text-transform:uppercase;margin-bottom:3px">${category}</div>
      <div style="font-size:12px;font-weight:700;color:${ZAFER_COLORS.text.primary};line-height:1.3;margin-bottom:6px">${title}</div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="font-size:13px;font-weight:700;color:${ZAFER_COLORS.primary}">${price}</span>
        <span style="font-size:10px;color:${ZAFER_COLORS.text.tertiary}">📍 ${location}</span>
      </div>
      <div style="margin-top:8px;height:3px;background:#eee;border-radius:2px;overflow:hidden">
        <div style="height:100%;width:78%;background:linear-gradient(90deg,${ZAFER_COLORS.primary},${ZAFER_COLORS.primaryDark});border-radius:2px"></div>
      </div>
    </div>
  </div>
`;

const SCENES = [
  {
    name: 'scene1-problem',
    bg: '#FFFFFF',
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;padding:48px 44px;gap:0">
        <div style="font-size:56px;font-weight:700;color:${ZAFER_COLORS.text.primary};text-align:center;line-height:1.1;margin-bottom:6px">Vous êtes</div>
        <div style="font-size:56px;font-weight:700;color:${ZAFER_COLORS.primary};text-align:center;line-height:1.1;margin-bottom:36px">Mauriciens</div>
        <div style="display:flex;flex-direction:column;gap:12px;align-items:center;margin-bottom:36px">
          ${PILL("Facebook Marketplace n'est pas fait pour nous", 'cross')}
          ${PILL("Trop d'arnaqueurs, pas assez de confiance", 'cross')}
          ${PILL("Aucune plateforme locale dédiée", 'cross')}
        </div>
        <div style="font-size:15px;color:${ZAFER_COLORS.text.secondary};text-align:center;max-width:420px;line-height:1.5">
          Il manquait une solution faite pour Maurice
        </div>
      </div>
    `,
  },
  {
    name: 'scene2-mobann',
    bg: `linear-gradient(160deg, #FFFFFF 40%, ${ZAFER_COLORS.bg.lightBeige} 100%)`,
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;padding:48px 44px;gap:0">
        <div style="font-size:64px;font-weight:700;color:${ZAFER_COLORS.primary};text-align:center;line-height:1.05;margin-bottom:4px">"Mo bann"</div>
        <div style="font-size:42px;font-weight:700;color:${ZAFER_COLORS.text.primary};text-align:center;line-height:1.1;margin-bottom:28px">c'est nous</div>
        <div style="font-size:16px;color:${ZAFER_COLORS.text.secondary};text-align:center;max-width:500px;line-height:1.5;margin-bottom:32px">Les Mauriciens font affaire avec qui ils connaissent</div>
        <div style="display:flex;flex-direction:row;gap:14px;justify-content:center;margin-bottom:28px">
          ${[['Priya', 32, 'Enseignante'], ['Kevin', 24, 'Graphiste freelance'], ['Ahmed', 45, 'Marchand auto']].map(([n, a, p]) => `
            <div style="width:150px;border-radius:12px;background:#fff;padding:16px;box-shadow:0 2px 12px rgba(0,0,0,0.10);display:flex;flex-direction:column;align-items:center;gap:8px">
              <div style="width:44px;height:44px;border-radius:22px;background:${ZAFER_COLORS.primary};display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;font-weight:700">${n[0]}</div>
              <div style="text-align:center">
                <div style="font-size:14px;font-weight:700;color:${ZAFER_COLORS.text.primary}">${n}</div>
                <div style="font-size:12px;color:${ZAFER_COLORS.text.tertiary}">${a} ans</div>
                <div style="font-size:12px;color:${ZAFER_COLORS.text.secondary};margin-top:2px">${p}</div>
              </div>
            </div>
          `).join('')}
        </div>
        <div style="font-size:13px;color:${ZAFER_COLORS.text.tertiary};font-style:italic;text-align:center">Quand la confiance arrive, tout se propage</div>
      </div>
    `,
  },
  {
    name: 'scene3-solution',
    bg: '#FFFFFF',
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-start;height:100%;padding:48px 36px 36px;gap:0;overflow:hidden">
        <div style="margin-bottom:14px">${ZAFER_LOGO_SVG(72)}</div>
        <div style="font-size:52px;font-weight:700;color:${ZAFER_COLORS.primary};text-align:center;letter-spacing:3px;margin-bottom:8px">ZAFER</div>
        <div style="font-size:15px;color:${ZAFER_COLORS.text.secondary};text-align:center;margin-bottom:14px">La plateforme locale de petites annonces</div>
        <div style="margin-bottom:24px">${PILL('Faite pour Maurice, par Maurice', 'check')}</div>
        <div style="display:flex;flex-direction:row;gap:12px;justify-content:center;margin-bottom:24px;position:relative;height:160px;width:100%">
          <div style="position:absolute;left:30px;top:15px;transform:rotate(-6deg)">${LISTING_CARD('Toyota Yaris 2019', '280 000 RS', 'Curepipe', 'Véhicule', 0, 1)}</div>
          <div style="position:absolute;right:20px;top:8px;transform:rotate(4deg)">${LISTING_CARD('Appart 2ch Quatre Bornes', '12 500 RS/m', 'Q. Bornes', 'Immobilier', 0, 2)}</div>
          <div style="position:absolute;left:50%;transform:translateX(-50%);z-index:3">${LISTING_CARD('Canapé tissu gris', '8 500 RS', 'Port Louis', 'Maison', 0, 3)}</div>
        </div>
        <div style="display:flex;flex-direction:row;gap:10px;width:100%">
          ${[['🔒', 'Indice de Confiance', 'Score vendeur transparent'], ['📍', '100% Mauricien', 'Fait pour Maurice, par Maurice'], ['💬', 'Via WhatsApp', 'Contact direct, zéro intermédiaire']].map(([ic, t, d]) => `
            <div style="flex:1;border-radius:12px;background:${ZAFER_COLORS.bg.veryLight};border-left:4px solid ${ZAFER_COLORS.primary};padding:16px;display:flex;flex-direction:column;gap:8px">
              <div style="font-size:22px">${ic}</div>
              <div style="font-size:14px;font-weight:700;color:${ZAFER_COLORS.text.primary}">${t}</div>
              <div style="font-size:12px;color:${ZAFER_COLORS.text.tertiary}">${d}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `,
  },
  {
    name: 'scene4-categories',
    bg: '#FFFFFF',
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;padding:48px 36px;gap:0">
        <div style="font-size:48px;font-weight:700;color:${ZAFER_COLORS.text.primary};text-align:center;line-height:1.1;margin-bottom:8px">3 catégories</div>
        <div style="font-size:16px;color:${ZAFER_COLORS.text.secondary};text-align:center;margin-bottom:28px">Toutes les annonces locales au même endroit</div>
        <div style="display:flex;flex-direction:column;gap:14px;width:100%;margin-bottom:28px">
          ${[['🚗', 'Véhicule', 'Voiture · Moto · Bateau'], ['🏠', 'Immobilier', 'Location · Vente · Commerce'], ['🛋️', 'Maison & Équipement', 'Ameublement · Électroménager · Électronique']].map(([ic, t, d]) => `
            <div style="border-radius:12px;background:#fff;border:2px solid ${ZAFER_COLORS.primary};padding:18px 20px;display:flex;align-items:center;gap:16px;box-shadow:0 2px 8px rgba(0,0,0,0.06)">
              <div style="font-size:28px">${ic}</div>
              <div>
                <div style="font-size:16px;font-weight:700;color:${ZAFER_COLORS.text.primary}">${t}</div>
                <div style="font-size:13px;color:${ZAFER_COLORS.text.tertiary};margin-top:3px">${d}</div>
              </div>
            </div>
          `).join('')}
        </div>
        <div style="display:flex;flex-direction:column;gap:10px;align-items:center">
          ${PILL('Prix en Roupies Mauriciennes', 'check')}
          ${PILL('Contact direct via WhatsApp', 'check')}
          ${PILL('Vendeurs vérifiés & notés', 'check')}
        </div>
      </div>
    `,
  },
  {
    name: 'scene5-metrics',
    bg: ZAFER_COLORS.primary,
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;padding:48px 44px;gap:0;position:relative">
        <div style="font-size:52px;font-weight:700;color:#fff;text-align:center;line-height:1.15;margin-bottom:6px">Juin 2026</div>
        <div style="font-size:22px;font-weight:400;color:rgba(255,255,255,0.85);text-align:center;margin-bottom:32px">Le lancement est prévu</div>
        <!-- Phone mockup -->
        <div style="width:200px;background:#fff;border-radius:24px;border:5px solid #1A1A1A;overflow:hidden;margin-bottom:32px;box-shadow:0 20px 60px rgba(0,0,0,0.30)">
          <div style="height:20px;background:#1A1A1A;display:flex;align-items:center;justify-content:center">
            <div style="width:50px;height:8px;background:#333;border-radius:4px"></div>
          </div>
          <div style="padding:8px 10px 4px;border-bottom:1px solid #eee;display:flex;align-items:center;gap:6px">
            ${ZAFER_LOGO_SVG(18, ZAFER_COLORS.primary, '#fff')}
            <span style="font-size:10px;font-weight:700;color:${ZAFER_COLORS.text.primary}">Zafer</span>
          </div>
          <div style="padding:6px 8px;display:flex;flex-direction:column;gap:6px">
            ${[['Toyota Yaris 2019', '280k RS', 'Véhicule'], ['Appart Q.Bornes', '12.5k/m', 'Immobilier'], ['Canapé gris', '8.5k RS', 'Maison']].map(([t, p, c]) => `
              <div style="background:${ZAFER_COLORS.bg.veryLight};border-radius:7px;padding:6px 7px;display:flex;justify-content:space-between;align-items:center">
                <div>
                  <div style="font-size:8px;color:${ZAFER_COLORS.primary};font-weight:700">${c}</div>
                  <div style="font-size:9px;font-weight:600;color:${ZAFER_COLORS.text.primary}">${t}</div>
                </div>
                <div style="font-size:9px;font-weight:700;color:${ZAFER_COLORS.primary}">${p}</div>
              </div>
            `).join('')}
          </div>
        </div>
        <!-- Métriques -->
        <div style="display:flex;flex-direction:row;justify-content:space-around;width:100%;gap:12px;margin-bottom:24px">
          ${[['500+', 'Annonces jour 1'], ['5k+', 'Utilisateurs 3 mois'], ['85%+', 'Confiance']].map(([v, l]) => `
            <div style="flex:1;text-align:center">
              <div style="font-size:48px;font-weight:700;color:#fff;line-height:1">${v}</div>
              <div style="font-size:12px;color:rgba(255,255,255,0.75);margin-top:4px;line-height:1.4">${l}</div>
            </div>
          `).join('')}
        </div>
        <div style="font-size:14px;color:rgba(255,255,255,0.8);font-style:italic;text-align:center">WhatsApp + Communauté = Croissance virale</div>
      </div>
    `,
  },
  {
    name: 'scene6-cta',
    bg: '#FFFFFF',
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;padding:48px 44px;gap:0">
        <div style="display:flex;flex-direction:row;align-items:center;gap:14px;margin-bottom:28px">
          ${ZAFER_LOGO_SVG(72)}
          <span style="font-size:40px;font-weight:700;color:${ZAFER_COLORS.text.primary};font-family:'DM Sans',sans-serif">Zafer</span>
        </div>
        <div style="font-size:52px;font-weight:700;color:${ZAFER_COLORS.text.primary};text-align:center;line-height:1.1;margin-bottom:4px">Rejoignez</div>
        <div style="font-size:52px;font-weight:700;color:${ZAFER_COLORS.primary};text-align:center;line-height:1.1;margin-bottom:28px">la communauté</div>
        <div style="display:flex;flex-direction:column;gap:10px;align-items:center;margin-bottom:32px">
          ${PILL('Simple', 'check')}
          ${PILL('Pro', 'check')}
          ${PILL('Fait pour vous', 'check')}
        </div>
        <!-- CTA Button -->
        <div style="width:280px;height:56px;border-radius:12px;background:${ZAFER_COLORS.primary};display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(190,92,60,0.35);margin-bottom:14px">
          <span style="font-size:17px;font-weight:700;color:#fff;font-family:'DM Sans',sans-serif;letter-spacing:.3px">Télécharger ZAFER</span>
        </div>
        <div style="font-size:13px;color:${ZAFER_COLORS.text.tertiary};margin-bottom:28px">iOS · Android · Gratuit</div>
        <div style="height:1px;width:70%;background:${ZAFER_COLORS.border.light};margin-bottom:12px"></div>
        <div style="font-size:11px;color:${ZAFER_COLORS.text.light}">zafer.mu · Juin 2026</div>
      </div>
    `,
  },
];

async function generatePreviews() {
  await mkdir(PREVIEW_DIR, { recursive: true });

  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  console.log('Browser launched ✓');

  for (const scene of SCENES) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1080, height: 1920 });

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    ${DM_SANS}
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1080px;
      height: 1920px;
      font-family: 'DM Sans', sans-serif;
      background: ${scene.bg};
      overflow: hidden;
    }
    .scene {
      width: 1080px;
      height: 1920px;
      background: ${scene.bg};
    }
  </style>
</head>
<body>
  <div class="scene">${scene.html}</div>
</body>
</html>`;

    await page.setContent(html, { waitUntil: 'networkidle' });

    // Attendre le chargement de la font
    await page.waitForTimeout(1500);

    const outputPath = path.join(PREVIEW_DIR, `${scene.name}.png`);
    await page.screenshot({ path: outputPath, fullPage: false });
    console.log(`✓ ${scene.name}.png`);

    await page.close();
  }

  await browser.close();
  console.log('\nTous les aperçus générés dans output/preview/');
}

generatePreviews().catch(console.error);
