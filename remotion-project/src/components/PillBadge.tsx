import React from 'react';
import { ZAFER_COLORS, TYPOGRAPHY } from '../styles/colors';

interface PillBadgeProps {
  text: string;
  icon?: string;
  variant?: 'check' | 'cross' | 'neutral';
  opacity: number;
  translateX?: number;
  translateY?: number;
  fontSize?: number;
}

export const PillBadge: React.FC<PillBadgeProps> = ({
  text,
  icon,
  variant = 'check',
  opacity,
  translateX = 0,
  translateY = 0,
  fontSize = 14,
}) => {
  const iconChar = icon ?? (variant === 'check' ? '✓' : variant === 'cross' ? '✗' : '•');
  const iconColor =
    variant === 'check' ? '#4CAF50' : variant === 'cross' ? ZAFER_COLORS.accent : ZAFER_COLORS.text.secondary;
  const bgColor =
    variant === 'check' ? '#F0FAF0' : variant === 'cross' ? '#FFF3F0' : ZAFER_COLORS.background.veryLight;
  const borderColor =
    variant === 'check' ? '#C8EAC8' : variant === 'cross' ? '#FFD4C8' : ZAFER_COLORS.border.light;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        backgroundColor: bgColor,
        border: `1.5px solid ${borderColor}`,
        borderRadius: 32,
        padding: `8px 16px`,
        opacity,
        transform: `translateX(${translateX}px) translateY(${translateY}px)`,
      }}
    >
      <span
        style={{
          fontSize: fontSize + 1,
          fontWeight: 700,
          color: iconColor,
          fontFamily: TYPOGRAPHY.bodyM.family,
          lineHeight: 1,
        }}
      >
        {iconChar}
      </span>
      <span
        style={{
          fontSize,
          fontWeight: 500,
          color: ZAFER_COLORS.text.primary,
          fontFamily: TYPOGRAPHY.bodyM.family,
        }}
      >
        {text}
      </span>
    </div>
  );
};
