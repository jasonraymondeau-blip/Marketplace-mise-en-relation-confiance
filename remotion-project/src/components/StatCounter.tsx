import React from 'react';
import { ZAFER_COLORS, TYPOGRAPHY } from '../styles/colors';
import { useCounterAnimation } from '../hooks/useCounterAnimation';

interface StatCounterProps {
  startFrame: number;
  target: number;
  suffix?: string;
  label: string;
  durationFrames?: number;
  opacity: number;
}

export const StatCounter: React.FC<StatCounterProps> = ({
  startFrame,
  target,
  suffix = '',
  label,
  durationFrames = 60,
  opacity,
}) => {
  const value = useCounterAnimation(startFrame, target, durationFrames);

  const formatted = target >= 1000
    ? (value >= 1000 ? `${(value / 1000).toFixed(1).replace('.0', '')}k` : String(value))
    : String(value);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        opacity,
        flex: 1,
      }}
    >
      <div
        style={{
          fontSize: 52,
          fontWeight: 700,
          color: ZAFER_COLORS.primary,
          fontFamily: TYPOGRAPHY.headingL.family,
          lineHeight: 1,
        }}
      >
        {target >= 1000 ? `${formatted}+` : `${value}${suffix}`}
      </div>
      <div
        style={{
          fontSize: 13,
          color: ZAFER_COLORS.text.tertiary,
          fontFamily: TYPOGRAPHY.bodyM.family,
          textAlign: 'center',
          maxWidth: 160,
          lineHeight: 1.4,
        }}
      >
        {label}
      </div>
    </div>
  );
};
