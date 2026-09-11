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
        gap: '6px',
        height: '30px',
        padding: '0 12px',
        borderRadius: '6px',
        background: 'rgba(212, 175, 55, 0.1)',
        border: '1px solid rgba(212, 175, 55, 0.35)',
        color: '#F0D078',
        fontSize: '11.5px',
        fontWeight: 600,
        letterSpacing: '0.03em',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        cursor: 'pointer',
      }}
      className="accbcf-live-site-btn"
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: '#10B981',
          boxShadow: '0 0 6px #10B981',
          display: 'inline-block',
        }}
      />
      <span>Live Public Site</span>
      <span style={{ fontSize: '10px', opacity: 0.8 }}>↗</span>
    </a>
  );
};

export default LiveSiteAction;
