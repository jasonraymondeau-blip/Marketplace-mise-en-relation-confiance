import React from 'react';
import { ZAFER_COLORS, TYPOGRAPHY } from '../styles/colors';

interface FeatureColumnProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  opacity: number;
  translateX?: number;
  translateY?: number;
}

export const FeatureColumn: React.FC<FeatureColumnProps> = ({
  icon,
  title,
  description,
  opacity,
  translateX = 0,
  translateY = 0,
}) => {
  return (
    <div
      style={{
        flex: 1,
        borderRadius: 12,
        backgroundColor: ZAFER_COLORS.background.veryLight,
        borderLeft: `4px solid ${ZAFER_COLORS.primary}`,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        opacity,
        transform: `translateX(${translateX}px) translateY(${translateY}px)`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        minHeight: 180,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          color: ZAFER_COLORS.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: ZAFER_COLORS.text.primary,
          fontFamily: TYPOGRAPHY.headingM.family,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 13,
          color: ZAFER_COLORS.text.tertiary,
          fontFamily: TYPOGRAPHY.bodyM.family,
          lineHeight: 1.5,
        }}
      >
        {description}
      </div>
    </div>
  );
};
