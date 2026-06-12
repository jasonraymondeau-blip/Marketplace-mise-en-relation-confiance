import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { ZAFER_COLORS, TYPOGRAPHY } from '../styles/colors';
import { fadeIn, slideUp, motionBlur, scaleIn, slideInFrom, sceneTransitionOut } from '../styles/animations';
import { CategoryCard } from '../components/CategoryCard';
import { PillBadge } from '../components/PillBadge';
import { SCENES } from '../consts';

const VehicleIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 18l3-8h16l3 8" />
    <rect x="3" y="18" width="26" height="7" rx="2" />
    <circle cx="9" cy="25" r="3" />
    <circle cx="23" cy="25" r="3" />
  </svg>
);

const HouseIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 16L16 4l12 12" />
    <path d="M7 13v13h18V13" />
    <rect x="12" y="20" width="8" height="6" rx="1" />
  </svg>
);

const SofaIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="16" width="26" height="10" rx="3" />
    <path d="M6 16v-2a2 2 0 012-2h16a2 2 0 012 2v2" />
    <line x1="3" y1="26" x2="29" y2="26" />
  </svg>
);

export const Scene4Categories: React.FC = () => {
  const frame = useCurrentFrame();

  // Titre kinetic
  const titleOpacity = fadeIn(frame, SCENES.s4.start + 6, 16);
  const titleY = slideUp(frame, SCENES.s4.start + 6, 40, 22);
  const titleBlur = motionBlur(frame, SCENES.s4.start + 6, 14);
  const titleScale = scaleIn(frame, SCENES.s4.start + 6, 0.82, 20);

  // Sous-titre
  const subOpacity = fadeIn(frame, SCENES.s4.start + 30, 16);
  const subY = slideUp(frame, SCENES.s4.start + 30, 18, 20);

  // Cards categorie staggered
  const c1Opacity = fadeIn(frame, SCENES.s4.start + 55, 20);
  const c1X = slideInFrom(frame, SCENES.s4.start + 55, 'left', 50, 28);
  const c2Opacity = fadeIn(frame, SCENES.s4.start + 80, 20);
  const c2Y = slideInFrom(frame, SCENES.s4.start + 80, 'bottom', 40, 28);
  const c3Opacity = fadeIn(frame, SCENES.s4.start + 105, 20);
  const c3X = slideInFrom(frame, SCENES.s4.start + 105, 'right', 50, 28);

  // Pill badges "bientôt" staggered
  const pill1Opacity = fadeIn(frame, SCENES.s4.start + 160, 14);
  const pill2Opacity = fadeIn(frame, SCENES.s4.start + 175, 14);
  const pill3Opacity = fadeIn(frame, SCENES.s4.start + 190, 14);

  const outOpacity = sceneTransitionOut(frame, SCENES.s4.end - 12, 12);
  const containerOpacity = frame >= SCENES.s4.end - 12 ? outOpacity : 1;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: ZAFER_COLORS.background.white,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 36px',
        gap: 0,
        opacity: containerOpacity,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Titre kinetic */}
      <div
        style={{
          fontSize: 44,
          fontWeight: 700,
          color: ZAFER_COLORS.text.primary,
          textAlign: 'center',
          opacity: titleOpacity,
          transform: `translateY(${titleY}px) scale(${titleScale})`,
          filter: `blur(${titleBlur}px)`,
          lineHeight: 1.1,
          marginBottom: 8,
        }}
      >
        3 catégories
      </div>

      <div
        style={{
          fontSize: 16,
          color: ZAFER_COLORS.text.secondary,
          textAlign: 'center',
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
          marginBottom: 28,
        }}
      >
        Toutes les annonces locales au même endroit
      </div>

      {/* Category cards */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          width: '100%',
          marginBottom: 28,
        }}
      >
        <CategoryCard
          icon={<VehicleIcon />}
          title="Véhicule"
          items="Voiture · Moto · Bateau"
          opacity={c1Opacity}
          translateX={c1X}
        />
        <CategoryCard
          icon={<HouseIcon />}
          title="Immobilier"
          items="Location · Vente · Commerce"
          opacity={c2Opacity}
          translateY={c2Y}
        />
        <CategoryCard
          icon={<SofaIcon />}
          title="Maison & Équipement"
          items="Ameublement · Électroménager · Électronique"
          opacity={c3Opacity}
          translateX={-c3X}
        />
      </div>

      {/* Pill badges confirmant les features */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
        <PillBadge text="Prix en Roupies Mauriciennes" variant="check" opacity={pill1Opacity} />
        <PillBadge text="Contact direct via WhatsApp" variant="check" opacity={pill2Opacity} />
        <PillBadge text="Vendeurs vérifiés & notés" variant="check" opacity={pill3Opacity} />
      </div>
    </div>
  );
};
