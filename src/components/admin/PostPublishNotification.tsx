'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useDocumentInfo, useFormProcessing, toast } from '@payloadcms/ui';

export const PostPublishNotification: React.FC = () => {
  const docInfo = useDocumentInfo();
  const isProcessing = useFormProcessing();
  const [justPublished, setJustPublished] = useState(false);
  const [copied, setCopied] = useState(false);
  const prevLastUpdateTime = useRef(docInfo?.lastUpdateTime);
  const wasProcessing = useRef(false);
  const hasMounted = useRef(false);

  const initialData = (docInfo?.initialData || {}) as Record<string, any>;
  const currentData = (docInfo?.data || {}) as Record<string, any>;
  const slug = currentData?.slug || initialData?.slug || '';
  const status = currentData?.status || initialData?.status || 'published';
  const isPublished = status === 'published';
  const hasId = Boolean(docInfo?.id);

  // Monitor save and publish completion
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    const lastUpdatedChanged =
      docInfo?.lastUpdateTime &&
      prevLastUpdateTime.current &&
      docInfo.lastUpdateTime > prevLastUpdateTime.current;

    const processingFinished = wasProcessing.current && !isProcessing;

    if ((lastUpdatedChanged || processingFinished) && hasId) {
      setJustPublished(true);
      
      const successMsg = isPublished
        ? '✓ News Article Successfully Posted & Live!'
        : '✓ News Article Saved as Draft';
      
      const successDesc = isPublished
        ? `Article "${currentData?.title || 'News'}" is now live on the official ACCBCF website.`
        : 'Article saved successfully. Change status to Published when ready to go live.';

      try {
        toast.success(successMsg, {
          description: successDesc,
          duration: 6000,
        });
      } catch {
        // Fallback if toast context is not ready
      }

      const timer = setTimeout(() => {
        setJustPublished(false);
      }, 10000);

      return () => clearTimeout(timer);
    }

    prevLastUpdateTime.current = docInfo?.lastUpdateTime;
    wasProcessing.current = isProcessing;
  }, [docInfo?.lastUpdateTime, isProcessing, hasId, isPublished, currentData?.title]);

  const liveUrl = slug ? `/en/news/${slug}` : '/en/news';
  const fullLiveUrl = typeof window !== 'undefined' ? `${window.location.origin}${liveUrl}` : `https://www.africachinachairmenforum.com${liveUrl}`;

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(fullLiveUrl);
      setCopied(true);
      try {
        toast.info('Public article URL copied to clipboard');
      } catch {
        // ignore
      }
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div
      style={{
        width: '100%',
        boxSizing: 'border-box',
        marginBottom: '16px',
        borderRadius: '10px',
        overflow: 'hidden',
        border: justPublished
          ? '1px solid #10B981'
          : isPublished
          ? '1px solid rgba(16, 185, 129, 0.35)'
          : '1px solid rgba(212, 175, 55, 0.25)',
        background: justPublished
          ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.18) 0%, rgba(7, 14, 30, 0.95) 100%)'
          : isPublished
          ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(11, 23, 46, 0.9) 100%)'
          : 'linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(7, 14, 30, 0.9) 100%)',
        boxShadow: justPublished
          ? '0 0 20px rgba(16, 185, 129, 0.3), 0 4px 12px rgba(0,0,0,0.5)'
          : '0 4px 12px rgba(0,0,0,0.25)',
        padding: '14px 16px',
        transition: 'all 0.3s ease',
      }}
      className="accbcf-post-publish-banner"
    >
      {/* Header Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          marginBottom: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: isPublished ? '#10B981' : '#F59E0B',
              boxShadow: isPublished ? '0 0 10px #10B981' : '0 0 8px #F59E0B',
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: isPublished ? '#10B981' : '#F59E0B',
            }}
          >
            {isPublished ? 'Live On Website' : 'Draft Mode'}
          </span>
        </div>

        {hasId && (
          <span
            style={{
              fontSize: '10px',
              color: '#94A3B8',
              fontFamily: 'monospace',
            }}
          >
            ID: #{docInfo.id}
          </span>
        )}
      </div>

      {/* Just Published Celebration Message */}
      {justPublished && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 10px',
            marginBottom: '10px',
            borderRadius: '6px',
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            color: '#34D399',
            fontSize: '12px',
            fontWeight: 700,
          }}
        >
          <span>🎉</span>
          <span>Article successfully posted and published to the live portal!</span>
        </div>
      )}

      {/* Article Status & Link Description */}
      <p
        style={{
          fontSize: '11.5px',
          lineHeight: '1.45',
          color: '#CBD5E1',
          margin: '0 0 12px 0',
        }}
      >
        {hasId ? (
          isPublished ? (
            <>
              This article is <strong>live and syndicated</strong> on the public ACCBCF website. Readers worldwide can view this story.
            </>
          ) : (
            <>
              This article is currently a <strong>draft</strong>. When you are ready, switch status to <em>Published</em> and click Save.
            </>
          )
        ) : (
          <>
            You are drafting a <strong>new article</strong>. Once published, it will be immediately syndicated to the homepage news feed.
          </>
        )}
      </p>

      {/* Action Buttons */}
      {hasId && slug && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '8px 12px',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              color: '#FFFFFF',
              fontSize: '11.5px',
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '0.02em',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
              transition: 'opacity 0.2s ease',
            }}
          >
            <span>View Live Article</span>
            <span style={{ fontSize: '13px' }}>↗</span>
          </a>

          <button
            type="button"
            onClick={handleCopy}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '6px 10px',
              borderRadius: '6px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#E2E8F0',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <span>{copied ? '✓ Link Copied!' : '📋 Copy Public URL'}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export const PostPublishControlsBadge: React.FC = () => {
  const docInfo = useDocumentInfo();
  const initialData = (docInfo?.initialData || {}) as Record<string, any>;
  const currentData = (docInfo?.data || {}) as Record<string, any>;
  const slug = currentData?.slug || initialData?.slug || '';
  const status = currentData?.status || initialData?.status || 'published';
  const isPublished = status === 'published';
  const hasId = Boolean(docInfo?.id);

  if (!hasId || !slug) {
    return null;
  }

  const liveUrl = `/en/news/${slug}`;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        marginRight: '12px',
      }}
    >
      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          borderRadius: '6px',
          background: isPublished
            ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 78, 59, 0.3) 100%)'
            : 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(120, 53, 15, 0.3) 100%)',
          border: isPublished
            ? '1px solid rgba(16, 185, 129, 0.4)'
            : '1px solid rgba(245, 158, 11, 0.4)',
          color: isPublished ? '#34D399' : '#FBBF24',
          fontSize: '11.5px',
          fontWeight: 700,
          textDecoration: 'none',
          transition: 'all 0.2s ease',
        }}
        title="Open live news article in new tab"
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: isPublished ? '#10B981' : '#F59E0B',
            boxShadow: isPublished ? '0 0 8px #10B981' : '0 0 6px #F59E0B',
            display: 'inline-block',
          }}
        />
        <span>{isPublished ? 'Live on Site' : 'Draft'} ↗</span>
      </a>
    </div>
  );
};

export default PostPublishNotification;

