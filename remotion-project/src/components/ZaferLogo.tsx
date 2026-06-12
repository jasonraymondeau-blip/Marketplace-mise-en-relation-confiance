import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { ZAFER_COLORS } from '../styles/colors';
import { SPRING_PRESETS } from '../styles/animations';

interface ZaferLogoProps {
  size?: number;
  animated?: boolean;
  startFrame?: number;
  variant?: 'color' | 'white-on-dark' | 'icon-only';
  showText?: boolean;
}

// Vrai logo Zafer : maison arrondie terracotta avec sourire blanc
const HouseSmileIcon: React.FC<{ size: number; houseColor: string; smileColor: string }> = ({
  size,
  houseColor,
  smileColor,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Forme maison arrondie */}
    <path
      d="M50 14 C53 14 82 37 84 40 L84 78 C84 84 79 88 73 88 L27 88 C21 88 16 84 16 78 L16 40 C18 37 47 14 50 14 Z"
      fill={houseColor}
    />
    {/* Sourire intérieur */}
    <path
      d="M35 62 Q50 76 65 62"
      stroke={smileColor}
      strokeWidth="5.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export const ZaferLogo: React.FC<ZaferLogoProps> = ({
  size = 100,
  animated = false,
  startFrame = 0,
  variant = 'color',
  showText = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = animated
    ? spring({ frame: frame - startFrame, fps, config: SPRING_PRESETS.logo, from: 0, to: 1 })
    : 1;

  if (variant === 'white-on-dark') {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          transform: `scale(${scale})`,
        }}
      >
        <HouseSmileIcon size={size} houseColor="#FFFFFF" smileColor="#000000" />
        {showText && (
          <span
            style={{
              fontSize: size * 0.4,
              fontWeight: 700,
              color: '#FFFFFF',
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: 2,
            }}
          >
            Zafer
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: showText ? 'row' : 'column',
        alignItems: 'center',
        gap: showText ? 14 : 12,
        transform: `scale(${scale})`,
      }}
    >
      <HouseSmileIcon size={size} houseColor={ZAFER_COLORS.primary} smileColor="#FFFFFF" />
      {showText && (
        <span
          style={{
            fontSize: size * 0.55,
            fontWeight: 700,
            color: ZAFER_COLORS.text.primary,
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: 0.5,
          }}
        >
          Zafer
        </span>
      )}
    </div>
  );
};
