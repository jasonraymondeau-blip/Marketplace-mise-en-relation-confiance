import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';
import { ZAFER_COLORS, TYPOGRAPHY } from '../styles/colors';
import { fadeIn, slideUp, motionBlur, scaleIn, sceneTransitionOut } from '../styles/animations';
import { PersonaCard } from '../components/PersonaCard';
import { SCENES } from '../consts';

const PERSONAS = [
  { name: 'Priya', age: 32, profession: 'Enseignante' },
  { name: 'Kevin', age: 24, profession: 'Graphiste freelance' },
  { name: 'Ahmed', age: 45, profession: 'Marchand auto' },
];

export const Scene2MoBann: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lf = frame - SCENES.s2.start;

  // "Mo bann" — grosse citation kinetic
  const q1Opacity = fadeIn(frame, SCENES.s2.start + 8, 16);
  const q1Y = slideUp(frame, SCENES.s2.start + 8, 50, 22);
  const q1Blur = motionBlur(frame, SCENES.s2.start + 8, 16);
  const q1Scale = scaleIn(frame, SCENES.s2.start + 8, 0.8, 20);

  // "c'est nous"
  const q2Opacity = fadeIn(frame, SCENES.s2.start + 22, 16);
  const q2Y = slideUp(frame, SCENES.s2.start + 22, 40, 20);
  const q2Blur = motionBlur(frame, SCENES.s2.start + 22, 14);

  // Sous-texte
  const subOpacity = fadeIn(frame, SCENES.s2.start + 60, 16);
  const subY = slideUp(frame, SCENES.s2.start + 60, 15, 20);

  // Persona cards staggered
  const p0Opacity = fadeIn(frame, SCENES.s2.start + 90, 18);
  const p0Y = slideUp(frame, SCENES.s2.start + 90, 35, 24);
  const p1Opacity = fadeIn(frame, SCENES.s2.start + 105, 18);
  const p1Y = slideUp(frame, SCENES.s2.start + 105, 35, 24);
  const p2Opacity = fadeIn(frame, SCENES.s2.start + 120, 18);
  const p2Y = slideUp(frame, SCENES.s2.start + 120, 35, 24);

  // Phrase finale
  const footerOpacity = fadeIn(frame, SCENES.s2.start + 148, 16);

  const outOpacity = sceneTransitionOut(frame, SCENES.s2.end - 12, 12);
  const containerOpacity = frame >= SCENES.s2.end - 12 ? outOpacity : 1;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(160deg, ${ZAFER_COLORS.background.white} 40%, ${ZAFER_COLORS.background.lightBeige} 100%)`,
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
      {/* Citation grosse — ligne 1 */}
      <div
        style={{
          fontSize: 64,
          fontWeight: 700,
          color: ZAFER_COLORS.primary,
          textAlign: 'center',
          opacity: q1Opacity,
          transform: `translateY(${q1Y}px) scale(${q1Scale})`,
          filter: `blur(${q1Blur}px)`,
          lineHeight: 1.05,
          marginBottom: 4,
        }}
      >
        "Mo bann"
      </div>

      {/* Citation — ligne 2 */}
      <div
        style={{
          fontSize: 42,
          fontWeight: 700,
          color: ZAFER_COLORS.text.primary,
          textAlign: 'center',
          opacity: q2Opacity,
          transform: `translateY(${q2Y}px)`,
          filter: `blur(${q2Blur}px)`,
          lineHeight: 1.1,
          marginBottom: 32,
        }}
      >
        c'est nous
      </div>

      {/* Sous-texte */}
      <div
        style={{
          fontSize: 16,
          color: ZAFER_COLORS.text.secondary,
          textAlign: 'center',
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
          maxWidth: 500,
          lineHeight: 1.5,
          marginBottom: 36,
        }}
      >
        Les Mauriciens font affaire avec qui ils connaissent
      </div>

      {/* Persona cards */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 14,
          justifyContent: 'center',
          marginBottom: 32,
        }}
      >
        <PersonaCard
          name="Priya"
          age={32}
          profession="Enseignante"
          opacity={p0Opacity}
          translateY={p0Y}
        />
        <PersonaCard
          name="Kevin"
          age={24}
          profession="Graphiste freelance"
          opacity={p1Opacity}
          translateY={p1Y}
        />
        <PersonaCard
          name="Ahmed"
          age={45}
          profession="Marchand auto"
          opacity={p2Opacity}
          translateY={p2Y}
        />
      </div>

      {/* Phrase finale */}
      <div
        style={{
          fontSize: 13,
          color: ZAFER_COLORS.text.tertiary,
          fontStyle: 'italic',
          textAlign: 'center',
          opacity: footerOpacity,
          maxWidth: 360,
        }}
      >
        Quand la confiance arrive, tout se propage
      </div>
    </div>
  );
};
