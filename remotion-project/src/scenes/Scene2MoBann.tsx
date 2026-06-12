import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { ZAFER_COLORS, TYPOGRAPHY } from '../styles/colors';
import { fadeIn, slideUp, sceneTransitionOut } from '../styles/animations';
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

  // localFrame relative to scene start
  const localFrame = frame - SCENES.s2.start;

  const quoteScale = spring({
    frame: localFrame - 6,
    fps,
    config: { mass: 1, damping: 22, stiffness: 90 },
    from: 0.88,
    to: 1,
  });
  const quoteOpacity = fadeIn(frame, SCENES.s2.start + 6, 18);

  const subOpacity = fadeIn(frame, SCENES.s2.start + 46, 18);
  const subY = slideUp(frame, SCENES.s2.start + 46, 15, 24);

  const personaOpacities = PERSONAS.map((_, i) =>
    fadeIn(frame, SCENES.s2.start + 75 + i * 9, 18)
  );
  const personaYs = PERSONAS.map((_, i) =>
    slideUp(frame, SCENES.s2.start + 75 + i * 9, 30, 24)
  );

  const footerOpacity = fadeIn(frame, SCENES.s2.start + 120, 18);

  const outOpacity = sceneTransitionOut(frame, SCENES.s2.end - 12, 12);
  const containerOpacity = frame >= SCENES.s2.end - 12 ? outOpacity : 1;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(180deg, ${ZAFER_COLORS.background.white} 0%, ${ZAFER_COLORS.background.lightBeige} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        gap: 28,
        opacity: containerOpacity,
      }}
    >
      <div
        style={{
          fontSize: 44,
          fontWeight: 700,
          color: ZAFER_COLORS.primary,
          fontFamily: TYPOGRAPHY.headingL.family,
          textAlign: 'center',
          opacity: quoteOpacity,
          transform: `scale(${quoteScale})`,
          lineHeight: 1.2,
        }}
      >
        "Mo bann" — c'est nous
      </div>

      <div
        style={{
          fontSize: 16,
          color: ZAFER_COLORS.text.secondary,
          textAlign: 'center',
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
          maxWidth: 500,
          lineHeight: 1.5,
        }}
      >
        Les Mauriciens font affaire avec qui ils connaissent
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 16,
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {PERSONAS.map((p, i) => (
          <PersonaCard
            key={p.name}
            name={p.name}
            age={p.age}
            profession={p.profession}
            opacity={personaOpacities[i]}
            translateY={personaYs[i]}
          />
        ))}
      </div>

      <div
        style={{
          fontSize: 13,
          color: ZAFER_COLORS.text.tertiary,
          fontStyle: 'italic',
          textAlign: 'center',
          opacity: footerOpacity,
          maxWidth: 400,
        }}
      >
        Quand la confiance arrive, tout se propage
      </div>
    </div>
  );
};
