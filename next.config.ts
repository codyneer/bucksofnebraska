import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.buzzsprout.com',
      },
      {
        // Facebook CDN — deer gallery photos pulled from the page album
        protocol: 'https',
        hostname: '**.fbcdn.net',
      },
    ],
  },
}

export default nextConfig
