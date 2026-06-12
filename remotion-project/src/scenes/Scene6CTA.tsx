import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { ZAFER_COLORS, TYPOGRAPHY } from '../styles/colors';
import { fadeIn, slideUp, motionBlur, scaleIn } from '../styles/animations';
import { ZaferLogo } from '../components/ZaferLogo';
import { CTAButton } from '../components/CTAButton';
import { PillBadge } from '../components/PillBadge';
import { SCENES } from '../consts';

export const Scene6CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoOpacity = fadeIn(frame, SCENES.s6.start + 6, 20);

  // "Votre savoir-faire mérite d'être vu" style Kolize finale
  const h1Opacity = fadeIn(frame, SCENES.s6.start + 28, 16);
  const h1Y = slideUp(frame, SCENES.s6.start + 28, 40, 22);
  const h1Blur = motionBlur(frame, SCENES.s6.start + 28, 14);
  const h1Scale = scaleIn(frame, SCENES.s6.start + 28, 0.82, 20);

  const h2Opacity = fadeIn(frame, SCENES.s6.start + 44, 16);
  const h2Y = slideUp(frame, SCENES.s6.start + 44, 30, 20);
  const h2Blur = motionBlur(frame, SCENES.s6.start + 44, 12);

  // Pill badges
  const pill1Opacity = fadeIn(frame, SCENES.s6.start + 72, 14);
  const pill2Opacity = fadeIn(frame, SCENES.s6.start + 86, 14);
  const pill3Opacity = fadeIn(frame, SCENES.s6.start + 100, 14);

  // CTA button
  const ctaOpacity = fadeIn(frame, SCENES.s6.start + 120, 20);
  const ctaY = slideUp(frame, SCENES.s6.start + 120, 24, 24);

  // Platforms
  const platformsOpacity = fadeIn(frame, SCENES.s6.start + 148, 16);

  // Footer
  const footerOpacity = fadeIn(frame, SCENES.s6.start + 162, 16);
  const lineOpacity = fadeIn(frame, SCENES.s6.start + 162, 12);
  const lineWidth = interpolate(frame, [SCENES.s6.start + 162, SCENES.s6.start + 200], [0, 70], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.ease),
  });

  // Fade to black
  const fadeToBlack = interpolate(frame, [1335, 1350], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.ease),
  });
  const outroOpacity = fadeIn(frame, 1340, 10);

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
        position: 'relative',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Contenu principal */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
          width: '100%',
          opacity: 1 - fadeToBlack,
        }}
      >
        {/* Logo */}
        <div style={{ opacity: logoOpacity, marginBottom: 24 }}>
          <ZaferLogo size={80} animated startFrame={SCENES.s6.start + 6} showText />
        </div>

        {/* Titre kinetic — style Kolize finale "Votre savoir-faire mérite d'être vu" */}
        <div
          style={{
            fontSize: 50,
            fontWeight: 700,
            color: ZAFER_COLORS.text.primary,
            textAlign: 'center',
            opacity: h1Opacity,
            transform: `translateY(${h1Y}px) scale(${h1Scale})`,
            filter: `blur(${h1Blur}px)`,
            lineHeight: 1.1,
            marginBottom: 4,
          }}
        >
          Rejoignez
        </div>
        <div
          style={{
            fontSize: 50,
            fontWeight: 700,
            color: ZAFER_COLORS.primary,
            textAlign: 'center',
            opacity: h2Opacity,
            transform: `translateY(${h2Y}px)`,
            filter: `blur(${h2Blur}px)`,
            lineHeight: 1.1,
            marginBottom: 28,
          }}
        >
          la communauté
        </div>

        {/* Pill badges */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', marginBottom: 32 }}>
          <PillBadge text="Simple" variant="check" opacity={pill1Opacity} />
          <PillBadge text="Pro" variant="check" opacity={pill2Opacity} />
          <PillBadge text="Fait pour vous" variant="check" opacity={pill3Opacity} />
        </div>

        {/* CTA Button */}
        <div style={{ opacity: ctaOpacity, transform: `translateY(${ctaY}px)`, marginBottom: 14 }}>
          <CTAButton label="Télécharger ZAFER" opacity={1} />
        </div>

        <div
          style={{
            fontSize: 13,
            color: ZAFER_COLORS.text.tertiary,
            opacity: platformsOpacity,
            marginBottom: 28,
          }}
        >
          iOS · Android · Gratuit
        </div>

        {/* Séparation + footer */}
        <div
          style={{
            height: 1,
            width: `${lineWidth}%`,
            backgroundColor: ZAFER_COLORS.border.light,
            opacity: lineOpacity,
            marginBottom: 12,
          }}
        />
        <div
          style={{
            fontSize: 11,
            color: ZAFER_COLORS.text.light,
            opacity: footerOpacity,
          }}
        >
          zafer.mu · Juin 2026
        </div>
      </div>

      {/* Fade to black + écran final */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#000000',
          opacity: fadeToBlack,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
        }}
      >
        <div style={{ opacity: outroOpacity }}>
          <ZaferLogo size={90} variant="white-on-dark" />
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: '#FFFFFF',
            fontFamily: "'DM Sans', sans-serif",
            opacity: outroOpacity,
            textAlign: 'center',
          }}
        >
          Zafer
        </div>
        <div
          style={{
            fontSize: 14,
            color: 'rgba(255,255,255,0.7)',
            fontFamily: "'DM Sans', sans-serif",
            opacity: outroOpacity,
          }}
        >
          À bientôt à Maurice
        </div>
      </div>
    </div>
  );
};
