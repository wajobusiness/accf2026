import React from 'react';

export const LiveSiteAction: React.FC = () => {
  return (
    <a
      href="/"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 14px',
        borderRadius: '8px',
        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(200, 168, 78, 0.05) 100%)',
        border: '1px solid rgba(212, 175, 55, 0.35)',
        color: '#F0D078',
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '0.04em',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
      }}
      className="accbcf-live-site-btn"
    >
      <span
        style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          backgroundColor: '#10B981',
          boxShadow: '0 0 8px #10B981',
          display: 'inline-block',
        }}
      />
      <span>Visit Public Website</span>
      <span style={{ fontSize: '11px', opacity: 0.8 }}>↗</span>
    </a>
  );
};

export default LiveSiteAction;
