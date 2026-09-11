import React from 'react';

export const DashboardHeader: React.FC = () => {
  return (
    <div
      style={{
        marginBottom: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
      className="accbcf-dashboard-hero"
    >
      {/* Main Executive Banner */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #070E1E 0%, #0B172E 40%, #0E1E3E 100%)',
          border: '1px solid rgba(212, 175, 55, 0.28)',
          boxShadow: '0 12px 36px -8px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(212, 175, 55, 0.1)',
          padding: '32px 36px',
        }}
      >
        {/* Subtle decorative background glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, rgba(212, 175, 55, 0) 70%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
          }}
        >
          {/* Brand & Titles */}
          <div style={{ maxWidth: '640px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 12px',
                borderRadius: '999px',
                background: 'rgba(212, 175, 55, 0.12)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                color: '#F0D078',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '14px',
              }}
            >
              <span>🏛️ Sovereign Bilateral Platform</span>
              <span style={{ opacity: 0.4 }}>•</span>
              <span style={{ color: '#10B981' }}>● Live Database Connected</span>
            </div>

            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '26px',
                fontWeight: 800,
                letterSpacing: '-0.01em',
                lineHeight: 1.25,
                margin: 0,
                color: '#FFFFFF',
              }}
            >
              Africa China Chairmen of Business Forum
            </h1>

            <div
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#C8A84E',
                letterSpacing: '0.06em',
                marginTop: '6px',
              }}
            >
              非中商业领袖论坛 · Institutional Executive Administration
            </div>

            <p
              style={{
                fontSize: '13px',
                lineHeight: 1.6,
                color: '#94A3B8',
                marginTop: '10px',
                marginBottom: 0,
              }}
            >
              Connecting Governments, Empowering Business Leaders & Chairmen, and Fostering Shared
              Sovereign Prosperity across African and Chinese Markets.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              minWidth: '220px',
            }}
          >
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #D4AF37 0%, #B38B3F 100%)',
                color: '#070E1E',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(212, 175, 55, 0.35)',
                transition: 'transform 0.15s ease',
              }}
            >
              <span>Visit Live Public Portal</span>
              <span>↗</span>
            </a>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <a
                href="/admin/collections/posts/create"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  borderRadius: '7px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  color: '#F1F5F9',
                  fontSize: '12px',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <span>✍️ New Dispatch</span>
              </a>

              <a
                href="/admin/collections/committeeMembers/create"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  borderRadius: '7px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  color: '#F1F5F9',
                  fontSize: '12px',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <span>👥 Add Leader</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bilateral Metric & Governance Ribbon */}
        <div
          style={{
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(212, 175, 55, 0.18)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
          }}
        >
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '10px',
              background: 'rgba(11, 23, 46, 0.6)',
              border: '1px solid rgba(212, 175, 55, 0.12)',
            }}
          >
            <div style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Diplomatic Editorial
            </div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF', marginTop: '4px' }}>
              Dispatches & Briefs
            </div>
            <div style={{ fontSize: '11px', color: '#C8A84E', marginTop: '2px' }}>
              Verified bilateral reports
            </div>
          </div>

          <div
            style={{
              padding: '12px 16px',
              borderRadius: '10px',
              background: 'rgba(11, 23, 46, 0.6)',
              border: '1px solid rgba(212, 175, 55, 0.12)',
            }}
          >
            <div style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Governance Structure
            </div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF', marginTop: '4px' }}>
              14 Committee Leaders
            </div>
            <div style={{ fontSize: '11px', color: '#C8A84E', marginTop: '2px' }}>
              Board, Advisory & Secretariat
            </div>
          </div>

          <div
            style={{
              padding: '12px 16px',
              borderRadius: '10px',
              background: 'rgba(11, 23, 46, 0.6)',
              border: '1px solid rgba(212, 175, 55, 0.12)',
            }}
          >
            <div style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Strategic Corridors
            </div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF', marginTop: '4px' }}>
              5 Priority Sectors
            </div>
            <div style={{ fontSize: '11px', color: '#C8A84E', marginTop: '2px' }}>
              Energy, Mining, Agri, Infra, Tech
            </div>
          </div>

          <div
            style={{
              padding: '12px 16px',
              borderRadius: '10px',
              background: 'rgba(11, 23, 46, 0.6)',
              border: '1px solid rgba(212, 175, 55, 0.12)',
            }}
          >
            <div style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Multilingual Reach
            </div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF', marginTop: '4px' }}>
              5 Official Languages
            </div>
            <div style={{ fontSize: '11px', color: '#C8A84E', marginTop: '2px' }}>
              EN · 中文 · FR · العربية · PT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
