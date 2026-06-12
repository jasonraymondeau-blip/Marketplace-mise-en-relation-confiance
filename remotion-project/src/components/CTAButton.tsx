import React from 'react';
import { ZAFER_COLORS, TYPOGRAPHY } from '../styles/colors';

interface CTAButtonProps {
  label: string;
  opacity: number;
  translateY?: number;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  label,
  opacity,
  translateY = 0,
}) => {
  return (
    <div
      style={{
        width: 280,
        height: 56,
        borderRadius: 12,
        backgroundColor: ZAFER_COLORS.primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        transform: `translateY(${translateY}px)`,
        boxShadow: '0 4px 16px rgba(190, 92, 60, 0.35)',
        cursor: 'pointer',
      }}
    >
      <span
        style={{
          fontSize: 17,
          fontWeight: 700,
          color: '#FFFFFF',
          fontFamily: TYPOGRAPHY.headingM.family,
          letterSpacing: 0.3,
        }}
      >
        {label}
      </span>
    </div>
  );
};
