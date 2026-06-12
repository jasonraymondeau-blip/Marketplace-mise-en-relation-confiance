import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { ZAFER_COLORS } from '../styles/colors';
import { SPRING_PRESETS } from '../styles/animations';

interface ZaferLogoProps {
  size?: number;
  animated?: boolean;
  startFrame?: number;
  variant?: 'color' | 'white-on-black';
}

export const ZaferLogo: React.FC<ZaferLogoProps> = ({
  size = 100,
  animated = false,
  startFrame = 0,
  variant = 'color',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = animated
    ? spring({ frame: frame - startFrame, fps, config: SPRING_PRESETS.logo, from: 0, to: 1 })
    : 1;

  if (variant === 'white-on-black') {
    return (
      <div
        style={{
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${scale})`,
          flexShrink: 0,
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 28h56l-38 44h38"
            stroke="#FFFFFF"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.22,
        backgroundColor: ZAFER_COLORS.primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${scale})`,
        flexShrink: 0,
        boxShadow: '0 4px 16px rgba(190,92,60,0.25)',
      }}
    >
      <svg
        width={size * 0.6}
        height={size * 0.6}
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 14h40l-27 32h27"
          stroke="#FFFFFF"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
