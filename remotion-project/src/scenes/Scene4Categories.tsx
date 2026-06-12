import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { ZAFER_COLORS, TYPOGRAPHY } from '../styles/colors';
import { fadeIn, slideInFrom, sceneTransitionOut } from '../styles/animations';
import { CategoryCard } from '../components/CategoryCard';
import { SCENES } from '../consts';

const VehicleIcon = () => (
  <svg width="36" height="36" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 18l3-8h16l3 8"/>
    <rect x="3" y="18" width="26" height="7" rx="2"/>
    <circle cx="9" cy="25" r="3"/>
    <circle cx="23" cy="25" r="3"/>
  </svg>
);

const HouseIcon = () => (
  <svg width="36" height="36" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 16L16 4l12 12"/>
    <path d="M7 13v13h18V13"/>
    <rect x="12" y="20" width="8" height="6" rx="1"/>
  </svg>
);

const SofaIcon = () => (
  <svg width="36" height="36" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="16" width="26" height="10" rx="3"/>
    <path d="M6 16v-2a2 2 0 012-2h16a2 2 0 012 2v2"/>
    <line x1="3" y1="26" x2="29" y2="26"/>
    <line x1="7" y1="26" x2="7" y2="29"/>
    <line x1="25" y1="26" x2="25" y2="29"/>
  </svg>
);

export const Scene4Categories: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = fadeIn(frame, SCENES.s4.start + 6, 18);

  const c1Opacity = fadeIn(frame, SCENES.s4.start + 33, 18);
  const c1X = slideInFrom(frame, SCENES.s4.start + 33, 'left', 40, 27);

  const c2Opacity = fadeIn(frame, SCENES.s4.start + 57, 18);
  const c2Y = slideInFrom(frame, SCENES.s4.start + 57, 'top', 30, 27);

  const c3Opacity = fadeIn(frame, SCENES.s4.start + 81, 18);
  const c3X = slideInFrom(frame, SCENES.s4.start + 81, 'right', 40, 27);

  const lineWidth = interpolate(frame, [SCENES.s4.start + 120, SCENES.s4.start + 165], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });
  const lineOpacity = fadeIn(frame, SCENES.s4.start + 120, 12);

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
        gap: 28,
        opacity: containerOpacity,
      }}
    >
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: ZAFER_COLORS.text.primary,
          fontFamily: TYPOGRAPHY.headingM.family,
          textAlign: 'center',
          opacity: titleOpacity,
        }}
      >
        Annonces locales dans 3 catégories
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          width: '100%',
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
          items="Location · Vente · Saisonnier"
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

      <div
        style={{
          height: 1,
          width: `${lineWidth}%`,
          backgroundColor: ZAFER_COLORS.border.light,
          opacity: lineOpacity,
        }}
      />
    </div>
  );
};
