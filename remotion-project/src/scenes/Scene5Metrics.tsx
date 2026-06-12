import React from 'react';
import { useCurrentFrame } from 'remotion';
import { ZAFER_COLORS, TYPOGRAPHY } from '../styles/colors';
import { fadeIn, slideUp, sceneTransitionOut } from '../styles/animations';
import { StatCounter } from '../components/StatCounter';
import { SCENES } from '../consts';

export const Scene5Metrics: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = fadeIn(frame, SCENES.s5.start + 6, 18);
  const titleY = slideUp(frame, SCENES.s5.start + 6, 15, 24);

  const m1Opacity = fadeIn(frame, SCENES.s5.start + 45, 18);
  const m2Opacity = fadeIn(frame, SCENES.s5.start + 84, 18);
  const m3Opacity = fadeIn(frame, SCENES.s5.start + 123, 18);

  const footerOpacity = fadeIn(frame, SCENES.s5.start + 180, 18);

  const outOpacity = sceneTransitionOut(frame, SCENES.s5.end - 12, 12);
  const containerOpacity = frame >= SCENES.s5.end - 12 ? outOpacity : 1;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(180deg, ${ZAFER_COLORS.background.white} 0%, #FFF8F5 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 36px',
        gap: 40,
        opacity: containerOpacity,
      }}
    >
      <div
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: ZAFER_COLORS.primary,
          fontFamily: TYPOGRAPHY.headingM.family,
          textAlign: 'center',
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          lineHeight: 1.3,
        }}
      >
        Prêt pour le lancement ?{'\n'}Juin 2026
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
          gap: 16,
        }}
      >
        <StatCounter
          startFrame={SCENES.s5.start + 45}
          target={500}
          suffix="+"
          label="Annonces dès le jour 1"
          durationFrames={60}
          opacity={m1Opacity}
        />
        <div style={{ width: 1, backgroundColor: ZAFER_COLORS.border.light, alignSelf: 'stretch' }} />
        <StatCounter
          startFrame={SCENES.s5.start + 84}
          target={5000}
          label="Utilisateurs actifs (3 mois)"
          durationFrames={60}
          opacity={m2Opacity}
        />
        <div style={{ width: 1, backgroundColor: ZAFER_COLORS.border.light, alignSelf: 'stretch' }} />
        <StatCounter
          startFrame={SCENES.s5.start + 123}
          target={85}
          suffix="%+"
          label="Confiance utilisateurs"
          durationFrames={45}
          opacity={m3Opacity}
        />
      </div>

      <div
        style={{
          fontSize: 14,
          color: ZAFER_COLORS.text.secondary,
          fontStyle: 'italic',
          textAlign: 'center',
          opacity: footerOpacity,
          maxWidth: 480,
        }}
      >
        WhatsApp + Communauté = Croissance virale
      </div>
    </div>
  );
};
