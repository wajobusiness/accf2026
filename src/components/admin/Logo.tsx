import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '6px 0' }}>
      <img
        src="/images/accbcf-logo.svg"
        alt="ACCBCF Seal"
        style={{
          height: '46px',
          width: 'auto',
          objectFit: 'contain',
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            fontFamily: 'serif',
            fontWeight: 800,
            fontSize: '18px',
            letterSpacing: '0.08em',
            color: '#B38B3F',
            lineHeight: 1.1,
          }}
        >
          ACCBCF
        </div>
        <div
          style={{
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#64748B',
            marginTop: '2px',
          }}
        >
          Institutional Admin Portal
        </div>
      </div>
    </div>
  );
};

export default Logo;
