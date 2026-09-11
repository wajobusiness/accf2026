import React from 'react';

export const DashboardHeader: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        boxSizing: 'border-box',
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
      className="accbcf-dashboard-header"
    >
      {/* Executive Hero Banner */}
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #070E1E 0%, #0B172E 50%, #0E1E3E 100%)',
          border: '1px solid rgba(212, 175, 55, 0.22)',
          boxShadow: '0 6px 20px -4px rgba(0, 0, 0, 0.4)',
          padding: '16px 20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px',
            width: '100%',
          }}
        >
          {/* Left: Emblem + Titles */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '260px' }}>
            <img
              src="/images/accbcf-logo.svg"
              alt="ACCBCF"
              style={{
                height: '38px',
                width: 'auto',
                objectFit: 'contain',
                flexShrink: 0,
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h1
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '18px',
                    fontWeight: 800,
                    margin: 0,
                    color: '#FFFFFF',
                    lineHeight: 1.2,
                  }}
                >
                  Africa China Chairmen of Business Forum
                </h1>
                <span
                  style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: '#10B981',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '999px',
                    padding: '1px 6px',
                    textTransform: 'uppercase',
                  }}
                >
                  ● Active
                </span>
              </div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#C8A84E',
                  letterSpacing: '0.04em',
                  marginTop: '2px',
                }}
              >
                非中商业领袖论坛 · Institutional Executive Secretariat & Admin Portal
              </div>
            </div>
          </div>

          {/* Right: Quick Action Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                height: '32px',
                padding: '0 14px',
                borderRadius: '6px',
                background: 'linear-gradient(135deg, #D4AF37 0%, #AA8022 100%)',
                color: '#060D1D',
                fontSize: '11.5px',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(212, 175, 55, 0.3)',
                whiteSpace: 'nowrap',
                boxSizing: 'border-box',
              }}
            >
              <span>Visit Public Site</span>
              <span style={{ fontSize: '11px' }}>↗</span>
            </a>

            <a
              href="/admin/collections/posts/create"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                height: '32px',
                padding: '0 12px',
                borderRadius: '6px',
                background: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                color: '#F0D078',
                fontSize: '11.5px',
                fontWeight: 600,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                boxSizing: 'border-box',
              }}
            >
              <span>✍️ + New Dispatch</span>
            </a>

            <a
              href="/admin/collections/committeeMembers/create"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                height: '32px',
                padding: '0 12px',
                borderRadius: '6px',
                background: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                color: '#F0D078',
                fontSize: '11.5px',
                fontWeight: 600,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                boxSizing: 'border-box',
              }}
            >
              <span>👥 + Add Leader</span>
            </a>
          </div>
        </div>

        {/* Bottom Metrics Ribbon: Compact 4 Columns */}
        <div
          style={{
            marginTop: '14px',
            paddingTop: '12px',
            borderTop: '1px solid rgba(212, 175, 55, 0.14)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '8px',
            width: '100%',
          }}
          className="accbcf-metrics-grid"
        >
          <div
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              background: 'rgba(9, 21, 44, 0.7)',
              border: '1px solid rgba(212, 175, 55, 0.1)',
            }}
          >
            <div style={{ fontSize: '10px', color: '#8DA4C4', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Editorial Dispatches
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', marginTop: '1px' }}>
              Policy & Briefs
            </div>
          </div>

          <div
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              background: 'rgba(9, 21, 44, 0.7)',
              border: '1px solid rgba(212, 175, 55, 0.1)',
            }}
          >
            <div style={{ fontSize: '10px', color: '#8DA4C4', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Governance Structure
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', marginTop: '1px' }}>
              14 Committee Leaders
            </div>
          </div>

          <div
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              background: 'rgba(9, 21, 44, 0.7)',
              border: '1px solid rgba(212, 175, 55, 0.1)',
            }}
          >
            <div style={{ fontSize: '10px', color: '#8DA4C4', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Strategic Corridors
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', marginTop: '1px' }}>
              5 Priority Sectors
            </div>
          </div>

          <div
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              background: 'rgba(9, 21, 44, 0.7)',
              border: '1px solid rgba(212, 175, 55, 0.1)',
            }}
          >
            <div style={{ fontSize: '10px', color: '#8DA4C4', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Bilateral Reach
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', marginTop: '1px' }}>
              5 Working Languages
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
