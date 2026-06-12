import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { ZAFER_COLORS, TYPOGRAPHY } from '../styles/colors';
import { fadeIn, slideUp, slideInFrom, scaleSpring, sceneTransitionOut } from '../styles/animations';
import { ZaferLogo } from '../components/ZaferLogo';
import { FeatureColumn } from '../components/FeatureColumn';
import { SCENES } from '../consts';

const LockIcon = () => (
  <svg width="36" height="36" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="7" y="14" width="18" height="14" rx="3"/>
    <path d="M11 14v-4a5 5 0 0110 0v4"/>
    <circle cx="16" cy="21" r="2" fill="currentColor" stroke="none"/>
    <line x1="16" y1="23" x2="16" y2="26"/>
  </svg>
);

const MapIcon = () => (
  <svg width="36" height="36" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M16 3C11.6 3 8 6.6 8 11c0 7 8 18 8 18s8-11 8-18c0-4.4-3.6-8-8-8z"/>
    <circle cx="16" cy="11" r="3"/>
  </svg>
);

const ChatIcon = () => (
  <svg width="36" height="36" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h24a2 2 0 012 2v14a2 2 0 01-2 2H10l-6 4V8a2 2 0 012-2z"/>
    <line x1="10" y1="12" x2="22" y2="12"/>
    <line x1="10" y1="17" x2="18" y2="17"/>
  </svg>
);

export const Scene3Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoOpacity = fadeIn(frame, SCENES.s3.start + 6, 18);
  const nameOpacity = fadeIn(frame, SCENES.s3.start + 33, 18);
  const nameY = slideUp(frame, SCENES.s3.start + 33, 10, 24);
  const taglineOpacity = fadeIn(frame, SCENES.s3.start + 60, 18);

  const f1Opacity = fadeIn(frame, SCENES.s3.start + 105, 18);
  const f1X = slideInFrom(frame, SCENES.s3.start + 105, 'left', 30, 24);
  const f2Opacity = fadeIn(frame, SCENES.s3.start + 127, 18);
  const f2Y = slideInFrom(frame, SCENES.s3.start + 127, 'bottom', 30, 24);
  const f3Opacity = fadeIn(frame, SCENES.s3.start + 147, 18);
  const f3X = slideInFrom(frame, SCENES.s3.start + 147, 'right', 30, 24);

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
        justifyContent: 'center',
        padding: '48px 36px',
        gap: 24,
        opacity: containerOpacity,
      }}
    >
      <div style={{ opacity: logoOpacity }}>
        <ZaferLogo size={120} animated startFrame={SCENES.s3.start + 6} />
      </div>

      <div
        style={{
          fontSize: 38,
          fontWeight: 700,
          color: ZAFER_COLORS.primary,
          fontFamily: TYPOGRAPHY.headingM.family,
          opacity: nameOpacity,
          transform: `translateY(${nameY}px)`,
          letterSpacing: 2,
        }}
      >
        ZAFER
      </div>

      <div
        style={{
          fontSize: 16,
          color: ZAFER_COLORS.text.secondary,
          textAlign: 'center',
          opacity: taglineOpacity,
          maxWidth: 480,
        }}
      >
        La plateforme locale de petites annonces
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 14,
          width: '100%',
          marginTop: 12,
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
          description="Contact direct, sans intermédiaire"
          opacity={f3Opacity}
          translateX={-f3X}
        />
      </div>
    </div>
  );
};
