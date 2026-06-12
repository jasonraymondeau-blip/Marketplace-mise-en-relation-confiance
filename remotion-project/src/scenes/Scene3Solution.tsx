import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { ZAFER_COLORS, TYPOGRAPHY } from '../styles/colors';
import {
  fadeIn, slideUp, slideInFrom, motionBlur, scaleIn, sceneTransitionOut,
} from '../styles/animations';
import { ZaferLogo } from '../components/ZaferLogo';
import { FeatureColumn } from '../components/FeatureColumn';
import { ListingCard } from '../components/AppMockup';
import { PillBadge } from '../components/PillBadge';
import { SCENES } from '../consts';

const LockIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <rect x="7" y="14" width="18" height="14" rx="3" />
    <path d="M11 14v-4a5 5 0 0110 0v4" />
    <circle cx="16" cy="21" r="2" fill="currentColor" stroke="none" />
    <line x1="16" y1="23" x2="16" y2="26" />
  </svg>
);

const MapIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <path d="M16 3C11.6 3 8 6.6 8 11c0 7 8 18 8 18s8-11 8-18c0-4.4-3.6-8-8-8z" />
    <circle cx="16" cy="11" r="3" />
  </svg>
);

const ChatIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h24a2 2 0 012 2v14a2 2 0 01-2 2H10l-6 4V8a2 2 0 012-2z" />
    <line x1="10" y1="12" x2="22" y2="12" />
    <line x1="10" y1="17" x2="18" y2="17" />
  </svg>
);

export const Scene3Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo spring entrance
  const logoOpacity = fadeIn(frame, SCENES.s3.start + 6, 18);

  // "ZAFER" kinetic
  const nameOpacity = fadeIn(frame, SCENES.s3.start + 24, 16);
  const nameY = slideUp(frame, SCENES.s3.start + 24, 30, 22);
  const nameBlur = motionBlur(frame, SCENES.s3.start + 24, 14);
  const nameScale = scaleIn(frame, SCENES.s3.start + 24, 0.82, 20);

  // Tagline
  const tagOpacity = fadeIn(frame, SCENES.s3.start + 52, 16);
  const tagY = slideUp(frame, SCENES.s3.start + 52, 16, 20);

  // Pill "La solution"
  const pillOpacity = fadeIn(frame, SCENES.s3.start + 70, 14);

  // Cards mockup empilées style référence (3 cards flottantes)
  const card1Opacity = fadeIn(frame, SCENES.s3.start + 90, 18);
  const card1Scale = interpolate(frame, [SCENES.s3.start + 90, SCENES.s3.start + 115], [0.88, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
  });
  const card2Opacity = fadeIn(frame, SCENES.s3.start + 105, 18);
  const card3Opacity = fadeIn(frame, SCENES.s3.start + 120, 18);

  // Feature columns
  const f1Opacity = fadeIn(frame, SCENES.s3.start + 168, 18);
  const f1X = slideInFrom(frame, SCENES.s3.start + 168, 'left', 40, 24);
  const f2Opacity = fadeIn(frame, SCENES.s3.start + 183, 18);
  const f2Y = slideInFrom(frame, SCENES.s3.start + 183, 'bottom', 30, 24);
  const f3Opacity = fadeIn(frame, SCENES.s3.start + 198, 18);
  const f3X = slideInFrom(frame, SCENES.s3.start + 198, 'right', 40, 24);

  const outOpacity = sceneTransitionOut(frame, SCENES.s3.end - 12, 12);
  const containerOpacity = frame >= SCENES.s3.end - 12 ? outOpacity : 1;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: ZAFER_COLORS.background.white,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 80,
        padding: '64px 36px 36px',
        gap: 0,
        opacity: containerOpacity,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Logo + nom */}
      <div style={{ opacity: logoOpacity, marginBottom: 16 }}>
        <ZaferLogo size={80} animated startFrame={SCENES.s3.start + 6} showText={false} />
      </div>

      <div
        style={{
          fontSize: 56,
          fontWeight: 700,
          color: ZAFER_COLORS.primary,
          textAlign: 'center',
          opacity: nameOpacity,
          transform: `translateY(${nameY}px) scale(${nameScale})`,
          filter: `blur(${nameBlur}px)`,
          letterSpacing: 3,
          marginBottom: 8,
        }}
      >
        ZAFER
      </div>

      <div
        style={{
          fontSize: 16,
          color: ZAFER_COLORS.text.secondary,
          textAlign: 'center',
          opacity: tagOpacity,
          transform: `translateY(${tagY}px)`,
          marginBottom: 16,
        }}
      >
        La plateforme locale de petites annonces
      </div>

      <div style={{ opacity: pillOpacity, marginBottom: 28 }}>
        <PillBadge
          text="Faite pour Maurice, par Maurice"
          variant="check"
          opacity={1}
        />
      </div>

      {/* Cards mockup empilées — style référence */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: -20,
          justifyContent: 'center',
          marginBottom: 28,
          position: 'relative',
          height: 170,
        }}
      >
        <div
          style={{
            opacity: card3Opacity,
            transform: `rotate(-6deg) translateY(10px) translateX(20px)`,
            position: 'absolute',
            left: 30,
            zIndex: 1,
          }}
        >
          <ListingCard
            title="Toyota Yaris 2019"
            price="280 000 RS"
            location="Curepipe"
            category="Véhicule"
          />
        </div>
        <div
          style={{
            opacity: card2Opacity,
            transform: `rotate(4deg) translateY(5px) translateX(-10px)`,
            position: 'absolute',
            right: 40,
            zIndex: 2,
          }}
        >
          <ListingCard
            title="Appart 2ch — Quatre Bornes"
            price="12 500 RS/mois"
            location="Quatre Bornes"
            category="Immobilier"
          />
        </div>
        <div
          style={{
            opacity: card1Opacity,
            transform: `scale(${card1Scale})`,
            position: 'absolute',
            zIndex: 3,
          }}
        >
          <ListingCard
            title="Canapé angle tissu gris"
            price="8 500 RS"
            location="Port Louis"
            category="Maison"
          />
        </div>
      </div>

      {/* Feature columns */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 12,
          width: '100%',
        }}
      >
        <FeatureColumn
          icon={<LockIcon />}
          title="Indice de Confiance"
          description="Score vendeur transparent"
          opacity={f1Opacity}
          translateX={f1X}
        />
        <FeatureColumn
          icon={<MapIcon />}
          title="100% Mauricien"
          description="Fait pour Maurice, par Maurice"
          opacity={f2Opacity}
          translateY={f2Y}
        />
        <FeatureColumn
          icon={<ChatIcon />}
          title="Via WhatsApp"
          description="Contact direct, zéro intermédiaire"
          opacity={f3Opacity}
          translateX={-f3X}
        />
      </div>
    </div>
  );
};
