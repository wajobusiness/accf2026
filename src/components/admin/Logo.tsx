import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '8px 4px',
        textDecoration: 'none',
      }}
    >
      <div
        style={{
          position: 'relative',
          padding: '2px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.4) 0%, rgba(200, 168, 78, 0.1) 100%)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src="/images/accbcf-logo.svg"
          alt="ACCBCF Seal"
          style={{
            height: '44px',
            width: 'auto',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 800,
              fontSize: '19px',
              letterSpacing: '0.06em',
              background: 'linear-gradient(135deg, #F0D078 0%, #D4AF37 50%, #AA8022 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.1,
            }}
          >
            ACCBCF
          </span>
          <span
            style={{
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: '#10B981',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '999px',
              padding: '2px 7px',
              textTransform: 'uppercase',
            }}
          >
            Official
          </span>
        </div>
        <div
          style={{
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#94A3B8',
            marginTop: '3px',
            lineHeight: 1.2,
          }}
        >
          Secretariat Admin Portal
        </div>
      </div>
    </div>
  );
};

export default Logo;
