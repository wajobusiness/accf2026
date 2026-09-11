import React from 'react';

export const LoginNotice: React.FC = () => {
  return (
    <div
      style={{
        marginBottom: '20px',
        padding: '12px 16px',
        borderRadius: '8px',
        background: 'rgba(212, 175, 55, 0.08)',
        border: '1px solid rgba(212, 175, 55, 0.25)',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: '#D4AF37',
          textTransform: 'uppercase',
        }}
      >
        🔒 Official Diplomatic Secretariat Gateway
      </div>
      <div
        style={{
          fontSize: '12px',
          color: '#94A3B8',
          marginTop: '4px',
          lineHeight: 1.4,
        }}
      >
        Authorized access for ACCBCF Secretariat Directors, Bilateral Desk Officers & Verified Editors only.
      </div>
    </div>
  );
};

export default LoginNotice;
