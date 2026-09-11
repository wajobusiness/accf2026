import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '2px 0',
        textDecoration: 'none',
        maxHeight: '36px',
      }}
    >
      <img
        src="/images/accbcf-logo.svg"
        alt="ACCBCF Seal"
        style={{
          height: '28px',
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
          flexShrink: 0,
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 800,
              fontSize: '16px',
              letterSpacing: '0.05em',
              background: 'linear-gradient(135deg, #F0D078 0%, #D4AF37 60%, #AA8022 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.1,
            }}
          >
            ACCBCF
          </span>
          <span
            style={{
              fontSize: '8px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: '#10B981',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '999px',
              padding: '1px 5px',
              textTransform: 'uppercase',
              lineHeight: 1.2,
            }}
          >
            Portal
          </span>
        </div>
        <div
          style={{
            fontSize: '9px',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#8DA4C4',
            marginTop: '1px',
            lineHeight: 1.1,
            whiteSpace: 'nowrap',
          }}
        >
          Secretariat Admin
        </div>
      </div>
    </div>
  );
};

export default Logo;
