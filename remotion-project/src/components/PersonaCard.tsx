import React from 'react';
import { ZAFER_COLORS, TYPOGRAPHY } from '../styles/colors';

interface PersonaCardProps {
  name: string;
  age: number;
  profession: string;
  opacity: number;
  translateY: number;
}

export const PersonaCard: React.FC<PersonaCardProps> = ({
  name,
  age,
  profession,
  opacity,
  translateY,
}) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div
      style={{
        width: 160,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        padding: 16,
        boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: ZAFER_COLORS.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          fontSize: 18,
          fontWeight: 700,
          fontFamily: TYPOGRAPHY.headingM.family,
        }}
      >
        {initials}
      </div>
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: ZAFER_COLORS.text.primary,
            fontFamily: TYPOGRAPHY.headingM.family,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: 12,
            color: ZAFER_COLORS.text.tertiary,
            fontFamily: TYPOGRAPHY.bodyM.family,
            marginTop: 2,
          }}
        >
          {age} ans
        </div>
        <div
          style={{
            fontSize: 12,
            color: ZAFER_COLORS.text.secondary,
            fontFamily: TYPOGRAPHY.bodyM.family,
            marginTop: 2,
          }}
        >
          {profession}
        </div>
      </div>
    </div>
  );
};
