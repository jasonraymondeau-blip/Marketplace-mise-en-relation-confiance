import React from 'react';
import { ZAFER_COLORS, TYPOGRAPHY } from '../styles/colors';

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  items: string;
  opacity: number;
  translateX?: number;
  translateY?: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  icon,
  title,
  items,
  opacity,
  translateX = 0,
  translateY = 0,
}) => {
  return (
    <div
      style={{
        flex: 1,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        border: `2px solid ${ZAFER_COLORS.primary}`,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 10,
        opacity,
        transform: `translateX(${translateX}px) translateY(${translateY}px)`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        minHeight: 140,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          color: ZAFER_COLORS.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </div>
      <div>
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
            marginTop: 4,
            lineHeight: 1.4,
          }}
        >
          {items}
        </div>
      </div>
    </div>
  );
};
