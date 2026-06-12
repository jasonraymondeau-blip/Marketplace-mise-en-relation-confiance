import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { ZAFER_COLORS, TYPOGRAPHY } from '../styles/colors';
import { fadeIn, slideUp } from '../styles/animations';
import { ZaferLogo } from '../components/ZaferLogo';
import { CTAButton } from '../components/CTAButton';
import { SCENES } from '../consts';

export const Scene6CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoOpacity = fadeIn(frame, SCENES.s6.start + 6, 18);

  const ctaOpacity = fadeIn(frame, SCENES.s6.start + 33, 24);
  const ctaY = slideUp(frame, SCENES.s6.start + 33, 20, 24);

  const platformsOpacity = fadeIn(frame, SCENES.s6.start + 66, 18);

  const badgeOpacity = fadeIn(frame, SCENES.s6.start + 105, 18);
  const badgeY = slideUp(frame, SCENES.s6.start + 105, 10, 24);

  const lineOpacity = fadeIn(frame, SCENES.s6.start + 150, 12);
  const lineWidth = interpolate(frame, [SCENES.s6.start + 150, SCENES.s6.start + 195], [0, 70], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  const footerOpacity = fadeIn(frame, SCENES.s6.start + 165, 18);

  // Fade to black at 44.5s → frame 1335
  const fadeToBlack = interpolate(frame, [1335, 1350], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.ease),
  });

  // Outro screen elements at frame 1350 (black screen)
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
        padding: '48px 36px',
        gap: 24,
        position: 'relative',
      }}
    >
      {/* Main content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          width: '100%',
          opacity: 1 - fadeToBlack,
        }}
      >
        <div style={{ opacity: logoOpacity }}>
          <ZaferLogo size={100} animated startFrame={SCENES.s6.start + 6} />
        </div>

        <div style={{ opacity: ctaOpacity, transform: `translateY(${ctaY}px)` }}>
          <CTAButton label="Télécharger ZAFER" opacity={1} />
        </div>

        <div
          style={{
            fontSize: 13,
            color: ZAFER_COLORS.text.tertiary,
            opacity: platformsOpacity,
            fontFamily: TYPOGRAPHY.bodyM.family,
          }}
        >
          iOS · Android · Gratuit
        </div>

        <div
          style={{
            fontSize: 13,
            color: ZAFER_COLORS.text.secondary,
            opacity: badgeOpacity,
            transform: `translateY(${badgeY}px)`,
            fontFamily: TYPOGRAPHY.bodyM.family,
            textAlign: 'center',
          }}
        >
          Pour la communauté mauricienne
        </div>

        <div
          style={{
            height: 1,
            width: `${lineWidth}%`,
            backgroundColor: ZAFER_COLORS.border.light,
            opacity: lineOpacity,
          }}
        />

        <div
          style={{
            fontSize: 11,
            color: ZAFER_COLORS.text.light,
            opacity: footerOpacity,
            fontFamily: TYPOGRAPHY.labelS.family,
          }}
        >
          zafer.mu · Juin 2026
        </div>
      </div>

      {/* Fade to black overlay + outro */}
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
          gap: 16,
        }}
      >
        <div style={{ opacity: outroOpacity }}>
          <ZaferLogo size={80} variant="white-on-black" />
        </div>
        <div
          style={{
            fontSize: 14,
            color: '#FFFFFF',
            fontFamily: TYPOGRAPHY.bodyL.family,
            opacity: outroOpacity,
          }}
        >
          À bientôt à Maurice
        </div>
      </div>
    </div>
  );
};
