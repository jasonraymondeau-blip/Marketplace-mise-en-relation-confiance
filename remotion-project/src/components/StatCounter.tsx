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
  colorScheme?: 'light' | 'dark';
}

export const StatCounter: React.FC<StatCounterProps> = ({
  startFrame,
  target,
  suffix = '',
  label,
  durationFrames = 60,
  opacity,
  colorScheme = 'light',
}) => {
  const value = useCounterAnimation(startFrame, target, durationFrames);

  const valueColor = colorScheme === 'dark' ? '#FFFFFF' : ZAFER_COLORS.primary;
  const labelColor = colorScheme === 'dark' ? 'rgba(255,255,255,0.75)' : ZAFER_COLORS.text.tertiary;

  let displayValue: string;
  if (target >= 1000) {
    const k = value / 1000;
    const formatted = k >= 1 ? `${k.toFixed(1).replace('.0', '')}k` : String(value);
    displayValue = `${formatted}+`;
  } else {
    displayValue = `${value}${suffix}`;
  }

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
          color: valueColor,
          fontFamily: TYPOGRAPHY.headingL.family,
          lineHeight: 1,
        }}
      >
        {displayValue}
      </div>
      <div
        style={{
          fontSize: 13,
          color: labelColor,
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
