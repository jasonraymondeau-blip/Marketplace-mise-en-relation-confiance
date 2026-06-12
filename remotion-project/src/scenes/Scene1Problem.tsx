import React from 'react';
import { useCurrentFrame } from 'remotion';
import { ZAFER_COLORS, TYPOGRAPHY } from '../styles/colors';
import { fadeIn, slideUp, motionBlur, sceneTransitionOut, scaleIn } from '../styles/animations';
import { PillBadge } from '../components/PillBadge';

export const Scene1Problem: React.FC = () => {
  const frame = useCurrentFrame();

  // "Vous êtes" style — gros texte en motion blur
  const h1Opacity = fadeIn(frame, 4, 14);
  const h1Y = slideUp(frame, 4, 40, 20);
  const h1Blur = motionBlur(frame, 4, 14);
  const h1Scale = scaleIn(frame, 4, 0.82, 18);

  // "Mauriciens" mis en avant
  const h2Opacity = fadeIn(frame, 18, 14);
  const h2Y = slideUp(frame, 18, 30, 18);
  const h2Blur = motionBlur(frame, 18, 12);
  const h2Scale = scaleIn(frame, 18, 0.85, 16);

  // Pill badge problème
  const badgeOpacity = fadeIn(frame, 52, 14);
  const badgeX = slideUp(frame, 52, 0, 18); // slideUp utilisé comme distance X pour pill

  // Sous-texte
  const subOpacity = fadeIn(frame, 68, 16);
  const subY = slideUp(frame, 68, 18, 20);

  const outOpacity = sceneTransitionOut(frame, 108, 12);
  const containerOpacity = frame >= 108 ? outOpacity : 1;

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
        padding: '48px 44px',
        gap: 0,
        opacity: containerOpacity,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Gros texte kinetic — ligne 1 */}
      <div
        style={{
          fontSize: 56,
          fontWeight: 700,
          color: ZAFER_COLORS.text.primary,
          textAlign: 'center',
          opacity: h1Opacity,
          transform: `translateY(${h1Y}px) scale(${h1Scale})`,
          filter: `blur(${h1Blur}px)`,
          lineHeight: 1.1,
          marginBottom: 6,
        }}
      >
        Vous êtes
      </div>

      {/* Gros texte kinetic — ligne 2 */}
      <div
        style={{
          fontSize: 56,
          fontWeight: 700,
          color: ZAFER_COLORS.primary,
          textAlign: 'center',
          opacity: h2Opacity,
          transform: `translateY(${h2Y}px) scale(${h2Scale})`,
          filter: `blur(${h2Blur}px)`,
          lineHeight: 1.1,
          marginBottom: 36,
        }}
      >
        Mauriciens
      </div>

      {/* Pills problème */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          alignItems: 'center',
          marginBottom: 36,
        }}
      >
        <PillBadge
          text="Facebook Marketplace n'est pas fait pour nous"
          variant="cross"
          opacity={fadeIn(frame, 52, 14)}
          translateY={slideUp(frame, 52, 20, 18)}
        />
        <PillBadge
          text="Trop d'arnaqueurs, pas assez de confiance"
          variant="cross"
          opacity={fadeIn(frame, 66, 14)}
          translateY={slideUp(frame, 66, 20, 18)}
        />
        <PillBadge
          text="Aucune plateforme locale dédiée"
          variant="cross"
          opacity={fadeIn(frame, 80, 14)}
          translateY={slideUp(frame, 80, 20, 18)}
        />
      </div>

      {/* Sous-texte */}
      <div
        style={{
          fontSize: 15,
          color: ZAFER_COLORS.text.secondary,
          textAlign: 'center',
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
          maxWidth: 420,
          lineHeight: 1.5,
        }}
      >
        Il manquait une solution faite pour Maurice
      </div>
    </div>
  );
};
