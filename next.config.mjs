/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable image optimization with modern formats
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'irlbjqultodcnayxblng.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'i0.wp.com',
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache
  },
  // Enable compression
  compress: true,
  // Add empty turbopack config to silence warning
  turbopack: {},
  // Optimize production builds
  productionBrowserSourceMaps: false,
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
  },
  // Domain redirection
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.fashionfabric.info',
          },
        ],
        destination: 'https://fashionfabric.info/:path*',
        permanent: true,
      },
      {
        source: '/collection',
        destination: '/collection/hospitality',
        permanent: true,
      },
    ]
  },
  // Basic security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          }
        ],
      },
    ]
  },
  webpack: (config, { isServer }) => {
    // Fix for pdfjs-dist worker
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        canvas: false,
      }
    }

    // Allow .mjs files
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    })

    return config
  },
}

export default nextConfig
