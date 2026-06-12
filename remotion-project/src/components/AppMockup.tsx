import React from 'react';
import { ZAFER_COLORS, TYPOGRAPHY } from '../styles/colors';

// Maquette simplifiée d'une annonce Zafer style app mobile
interface ListingCardProps {
  title: string;
  price: string;
  location: string;
  category: string;
  opacity?: number;
  scale?: number;
  rotate?: number;
  translateX?: number;
  translateY?: number;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  title,
  price,
  location,
  category,
  opacity = 1,
  scale = 1,
  rotate = 0,
  translateX = 0,
  translateY = 0,
}) => {
  return (
    <div
      style={{
        width: 200,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
        overflow: 'hidden',
        opacity,
        transform: `scale(${scale}) rotate(${rotate}deg) translate(${translateX}px, ${translateY}px)`,
        flexShrink: 0,
      }}
    >
      {/* Image placeholder */}
      <div
        style={{
          height: 110,
          backgroundColor: ZAFER_COLORS.background.lightBeige,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            backgroundColor: ZAFER_COLORS.border.light,
          }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: '10px 12px 12px' }}>
        <div
          style={{
            fontSize: 12,
            color: ZAFER_COLORS.primary,
            fontWeight: 700,
            fontFamily: TYPOGRAPHY.labelS.family,
            marginBottom: 3,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}
        >
          {category}
        </div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: ZAFER_COLORS.text.primary,
            fontFamily: TYPOGRAPHY.bodyM.family,
            marginBottom: 4,
            lineHeight: 1.3,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 6,
          }}
        >
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: ZAFER_COLORS.primary,
              fontFamily: TYPOGRAPHY.headingM.family,
            }}
          >
            {price}
          </span>
          <span
            style={{
              fontSize: 11,
              color: ZAFER_COLORS.text.tertiary,
              fontFamily: TYPOGRAPHY.labelS.family,
            }}
          >
            📍 {location}
          </span>
        </div>

        {/* Indicateur confiance */}
        <div style={{ marginTop: 8 }}>
          <div
            style={{
              height: 3,
              backgroundColor: ZAFER_COLORS.background.lightGray,
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: '78%',
                background: `linear-gradient(90deg, ${ZAFER_COLORS.primary} 0%, ${ZAFER_COLORS.primaryDark} 100%)`,
                borderRadius: 2,
              }}
            />
          </div>
          <div
            style={{
              fontSize: 10,
              color: ZAFER_COLORS.text.tertiary,
              fontFamily: TYPOGRAPHY.labelS.family,
              marginTop: 3,
            }}
          >
            Indice confiance 78%
          </div>
        </div>
      </div>
    </div>
  );
};
