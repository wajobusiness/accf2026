'use client';

import React, { useState } from 'react';
import { useFormFields } from '@payloadcms/ui';
import { extractYouTubeVideoId, getYouTubeThumbnailUrls } from '@/lib/videoUtils';

export const VideoPreviewField: React.FC = () => {
  const [isPlayingTest, setIsPlayingTest] = useState(false);

  const youtubeUrl = useFormFields(([fields]) => fields?.youtubeUrl?.value as string | undefined);
  const videoTitle = useFormFields(([fields]) => fields?.title?.value as string | Record<string, string> | undefined);
  const eventName = useFormFields(([fields]) => fields?.eventName?.value as string | Record<string, string> | undefined);

  const displayTitle = typeof videoTitle === 'string' ? videoTitle : videoTitle?.en || Object.values(videoTitle || {})[0] || '';
  const displayEvent = typeof eventName === 'string' ? eventName : eventName?.en || Object.values(eventName || {})[0] || '';

  const videoId = extractYouTubeVideoId(youtubeUrl);
  const thumbnails = videoId ? getYouTubeThumbnailUrls(videoId) : null;

  if (!youtubeUrl) {
    return (
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '14px 16px',
          borderRadius: '10px',
          backgroundColor: 'rgba(212, 175, 55, 0.05)',
          border: '1px dashed rgba(212, 175, 55, 0.3)',
          marginBottom: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#D4AF37', fontSize: '12px', fontWeight: 600 }}>
          <span>📺</span>
          <span>Paste a YouTube Video URL below to generate the video preview & thumbnail</span>
        </div>
      </div>
    );
  }

  if (!videoId) {
    return (
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '14px 16px',
          borderRadius: '10px',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.35)',
          marginBottom: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#EF4444', fontSize: '12px', fontWeight: 700 }}>
          <span>⚠️</span>
          <span>Invalid YouTube URL. Please enter a valid YouTube link (e.g. https://youtu.be/... or https://www.youtube.com/watch?v=...)</span>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: '100%',
        boxSizing: 'border-box',
        padding: '16px',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, rgba(7, 14, 30, 0.95) 0%, rgba(14, 30, 62, 0.9) 100%)',
        border: '1px solid rgba(212, 175, 55, 0.35)',
        boxShadow: '0 6px 18px rgba(0,0,0,0.35)',
        marginBottom: '20px',
      }}
    >
      {/* Top Header Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
              boxShadow: '0 0 10px #10B981',
              display: 'inline-block',
            }}
          />
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#10B981', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Valid YouTube Video Linked
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '10.5px', color: '#94A3B8', fontFamily: 'monospace' }}>
            ID: {videoId}
          </span>
          <button
            type="button"
            onClick={() => setIsPlayingTest(!isPlayingTest)}
            style={{
              fontSize: '11px',
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: '6px',
              backgroundColor: isPlayingTest ? 'rgba(239, 68, 68, 0.2)' : 'rgba(212, 175, 55, 0.2)',
              border: isPlayingTest ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(212, 175, 55, 0.4)',
              color: isPlayingTest ? '#FCA5A5' : '#F0D078',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {isPlayingTest ? '✕ Close Player Test' : '▶ Test Playback'}
          </button>
        </div>
      </div>

      {/* Video / Thumbnail Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#000000',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {isPlayingTest ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={displayTitle || 'YouTube Video Player'}
            style={{ width: '100%', height: '100%', border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              cursor: 'pointer',
            }}
            onClick={() => setIsPlayingTest(true)}
          >
            <img
              src={thumbnails?.maxres || thumbnails?.hq}
              alt="YouTube Video Thumbnail"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
              onError={(e) => {
                // Fallback to HQ thumbnail if maxres is not available
                if (thumbnails?.hq && (e.currentTarget.src !== thumbnails.hq)) {
                  e.currentTarget.src = thumbnails.hq;
                }
              }}
            />
            {/* Play Button Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s ease',
              }}
            >
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #D4AF37 0%, #AA8022 100%)',
                  boxShadow: '0 0 20px rgba(212, 175, 55, 0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#070E1E',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Bottom Title Bar */}
            {(displayTitle || displayEvent) && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '10px 14px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
                  color: '#FFFFFF',
                }}
              >
                {displayEvent && (
                  <div style={{ fontSize: '10px', color: '#F0D078', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>
                    {displayEvent}
                  </div>
                )}
                {displayTitle && (
                  <div style={{ fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {displayTitle}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', fontSize: '11px', color: '#94A3B8' }}>
        <span>Thumbnail automatically synced to YouTube high-resolution CDN</span>
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#F0D078', textDecoration: 'none', fontWeight: 600 }}
        >
          Open on YouTube ↗
        </a>
      </div>
    </div>
  );
};

export default VideoPreviewField;

