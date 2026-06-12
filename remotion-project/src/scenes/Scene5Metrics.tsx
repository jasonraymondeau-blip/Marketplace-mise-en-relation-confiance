import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { ZAFER_COLORS, TYPOGRAPHY } from '../styles/colors';
import { fadeIn, slideUp, motionBlur, scaleIn, sceneTransitionOut } from '../styles/animations';
import { StatCounter } from '../components/StatCounter';
import { ZaferLogo } from '../components/ZaferLogo';
import { SCENES } from '../consts';

// Mockup téléphone avec stats Zafer — inspiré du frame 40 (téléphone + prix en gros)
const PhoneMockup: React.FC<{ opacity: number; scale: number }> = ({ opacity, scale }) => (
  <div
    style={{
      width: 220,
      height: 340,
      backgroundColor: '#FFFFFF',
      borderRadius: 28,
      border: '6px solid #1A1A1A',
      overflow: 'hidden',
      opacity,
      transform: `scale(${scale})`,
      boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
      flexShrink: 0,
    }}
  >
    {/* Status bar */}
    <div
      style={{
        height: 24,
        backgroundColor: '#1A1A1A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 60,
          height: 10,
          backgroundColor: '#333',
          borderRadius: 5,
        }}
      />
    </div>

    {/* App header */}
    <div
      style={{
        padding: '10px 12px 6px',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        borderBottom: `1px solid ${ZAFER_COLORS.border.light}`,
      }}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: 6,
          backgroundColor: ZAFER_COLORS.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Mini house */}
        <svg width="14" height="14" viewBox="0 0 100 100" fill="none">
          <path d="M50 14 C53 14 82 37 84 40 L84 78 C84 84 79 88 73 88 L27 88 C21 88 16 84 16 78 L16 40 C18 37 47 14 50 14 Z" fill="#FFF"/>
          <path d="M35 62 Q50 76 65 62" stroke={ZAFER_COLORS.primary} strokeWidth="8" strokeLinecap="round" fill="none"/>
        </svg>
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color: ZAFER_COLORS.text.primary, fontFamily: "'DM Sans', sans-serif" }}>
        Zafer
      </span>
    </div>

    {/* Listing card dans le phone */}
    <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {[
        { title: 'Toyota Yaris 2019', price: '280 000 RS', cat: 'Véhicule' },
        { title: 'Appart 2ch Quatre Bornes', price: '12 500 RS/mois', cat: 'Immobilier' },
        { title: 'Canapé tissu gris', price: '8 500 RS', cat: 'Maison' },
      ].map((item, i) => (
        <div
          key={i}
          style={{
            backgroundColor: ZAFER_COLORS.background.veryLight,
            borderRadius: 8,
            padding: '7px 8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ fontSize: 9, color: ZAFER_COLORS.primary, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>
              {item.cat}
            </div>
            <div style={{ fontSize: 10, fontWeight: 600, color: ZAFER_COLORS.text.primary, fontFamily: "'DM Sans', sans-serif" }}>
              {item.title}
            </div>
          </div>
          <div style={{ fontSize: 10, fontWeight: 700, color: ZAFER_COLORS.primary, fontFamily: "'DM Sans', sans-serif" }}>
            {item.price}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const Scene5Metrics: React.FC = () => {
  const frame = useCurrentFrame();

  // Background terracotta burst — inspiré frame 40 (Kolize pricing screen jaune)
  const bgOpacity = fadeIn(frame, SCENES.s5.start + 0, 20);

  // Titre kinetic
  const titleOpacity = fadeIn(frame, SCENES.s5.start + 8, 16);
  const titleY = slideUp(frame, SCENES.s5.start + 8, 40, 22);
  const titleBlur = motionBlur(frame, SCENES.s5.start + 8, 14);
  const titleScale = scaleIn(frame, SCENES.s5.start + 8, 0.8, 20);

  // Phone mockup spring
  const phoneOpacity = fadeIn(frame, SCENES.s5.start + 30, 20);
  const phoneScale = interpolate(frame, [SCENES.s5.start + 30, SCENES.s5.start + 55], [0.85, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.2)),
  });

  // Métriques
  const m1Opacity = fadeIn(frame, SCENES.s5.start + 50, 18);
  const m2Opacity = fadeIn(frame, SCENES.s5.start + 84, 18);
  const m3Opacity = fadeIn(frame, SCENES.s5.start + 118, 18);

  const footerOpacity = fadeIn(frame, SCENES.s5.start + 175, 16);

  const outOpacity = sceneTransitionOut(frame, SCENES.s5.end - 12, 12);
  const containerOpacity = frame >= SCENES.s5.end - 12 ? outOpacity : 1;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        opacity: containerOpacity,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Background terracotta — comme le fond jaune de Kolize pricing */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: ZAFER_COLORS.primary,
          opacity: bgOpacity,
        }}
      />

      {/* Confetti dots décoratifs */}
      {[
        { x: 60, y: 120, r: 14 }, { x: 980, y: 200, r: 18 },
        { x: 100, y: 800, r: 10 }, { x: 950, y: 600, r: 22 },
        { x: 500, y: 80, r: 12 }, { x: 200, y: 1700, r: 16 },
        { x: 850, y: 1600, r: 20 },
      ].map((dot, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: dot.x,
            top: dot.y,
            width: dot.r * 2,
            height: dot.r * 2,
            borderRadius: '50%',
            backgroundColor: ZAFER_COLORS.primaryDark,
            opacity: 0.4,
          }}
        />
      ))}

      {/* Contenu */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 44px',
          gap: 0,
        }}
      >
        {/* Titre blanc kinetic */}
        <div
          style={{
            fontSize: 46,
            fontWeight: 700,
            color: '#FFFFFF',
            textAlign: 'center',
            opacity: titleOpacity,
            transform: `translateY(${titleY}px) scale(${titleScale})`,
            filter: `blur(${titleBlur}px)`,
            lineHeight: 1.15,
            marginBottom: 6,
          }}
        >
          Juin 2026
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.85)',
            textAlign: 'center',
            opacity: titleOpacity,
            marginBottom: 32,
          }}
        >
          Le lancement est prévu
        </div>

        {/* Phone mockup centré */}
        <div style={{ marginBottom: 36 }}>
          <PhoneMockup opacity={phoneOpacity} scale={phoneScale} />
        </div>

        {/* Métriques blanches */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            gap: 12,
            marginBottom: 28,
          }}
        >
          <div style={{ opacity: m1Opacity, flex: 1, textAlign: 'center' }}>
            <StatCounter startFrame={SCENES.s5.start + 50} target={500} suffix="+" label="Annonces jour 1" durationFrames={60} opacity={1} colorScheme="dark" />
          </div>
          <div style={{ width: 1, backgroundColor: 'rgba(255,255,255,0.3)', alignSelf: 'stretch' }} />
          <div style={{ opacity: m2Opacity, flex: 1, textAlign: 'center' }}>
            <StatCounter startFrame={SCENES.s5.start + 84} target={5000} label="Utilisateurs 3 mois" durationFrames={60} opacity={1} colorScheme="dark" />
          </div>
          <div style={{ width: 1, backgroundColor: 'rgba(255,255,255,0.3)', alignSelf: 'stretch' }} />
          <div style={{ opacity: m3Opacity, flex: 1, textAlign: 'center' }}>
            <StatCounter startFrame={SCENES.s5.start + 118} target={85} suffix="%+" label="Confiance" durationFrames={45} opacity={1} colorScheme="dark" />
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            fontSize: 14,
            color: 'rgba(255,255,255,0.8)',
            fontStyle: 'italic',
            textAlign: 'center',
            opacity: footerOpacity,
          }}
        >
          WhatsApp + Communauté = Croissance virale
        </div>
      </div>
    </div>
  );
};
