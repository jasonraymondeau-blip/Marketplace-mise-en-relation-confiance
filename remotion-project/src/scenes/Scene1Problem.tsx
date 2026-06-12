import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { ZAFER_COLORS, TYPOGRAPHY } from '../styles/colors';
import { fadeIn, slideUp, sceneTransitionOut } from '../styles/animations';

export const Scene1Problem: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = fadeIn(frame, 6, 18);
  const titleY = slideUp(frame, 6, 20, 24);

  const lineWidth = interpolate(frame, [30, 60], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });
  const lineOpacity = fadeIn(frame, 30, 12);

  const subOpacity = fadeIn(frame, 60, 18);
  const subY = slideUp(frame, 60, 10, 24);

  const badgeOpacity = fadeIn(frame, 100, 12);

  const outOpacity = sceneTransitionOut(frame, 108, 12);

  const containerOpacity = frame < 108 ? 1 : outOpacity;

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
        padding: 48,
        fontFamily: TYPOGRAPHY.headingM.family,
        opacity: containerOpacity,
        gap: 20,
      }}
    >
      <div
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: ZAFER_COLORS.text.primary,
          textAlign: 'center',
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          lineHeight: 1.3,
        }}
      >
        Acheter, vendre à Maurice...
      </div>

      <div
        style={{
          height: 2,
          width: `${lineWidth}%`,
          backgroundColor: ZAFER_COLORS.border.light,
          opacity: lineOpacity,
          borderRadius: 2,
        }}
      />

      <div
        style={{
          fontSize: 15,
          color: ZAFER_COLORS.text.secondary,
          textAlign: 'center',
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
          maxWidth: 480,
          lineHeight: 1.5,
        }}
      >
        Facebook Marketplace n'est pas fait pour nous
      </div>

      <div
        style={{
          marginTop: 8,
          padding: '6px 14px',
          opacity: badgeOpacity,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: ZAFER_COLORS.accent,
            fontFamily: TYPOGRAPHY.headingM.family,
          }}
        >
          Le problème ❌
        </span>
      </div>
    </div>
  );
};
