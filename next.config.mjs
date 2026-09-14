import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'tqeqccszyxstsxtoffzf.supabase.co',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/media/file/:path*',
        destination:
          'https://tqeqccszyxstsxtoffzf.supabase.co/storage/v1/object/public/media/:path*',
      },
    ];
  },
}

export default withPayload(nextConfig)
