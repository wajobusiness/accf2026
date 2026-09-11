import React from 'react';

export const LiveSiteAction: React.FC = () => {
  return (
    <div
      style={{
        marginTop: '16px',
        padding: '12px 10px 4px 10px',
        borderTop: '1px solid rgba(212, 175, 55, 0.15)',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.12) 0%, rgba(14, 30, 62, 0.5) 100%)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          color: '#F0D078',
          fontSize: '12.5px',
          fontWeight: 600,
          letterSpacing: '0.02em',
          textDecoration: 'none',
          boxSizing: 'border-box',
          transition: 'all 0.2s ease',
        }}
        className="accbcf-sidebar-public-btn"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
              boxShadow: '0 0 8px #10B981',
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
          <span>Public Website</span>
        </div>
        <span style={{ fontSize: '13px', opacity: 0.85 }}>↗</span>
      </a>
    </div>
  );
};

export default LiveSiteAction;
