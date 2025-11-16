/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.figma.com',
        pathname: '/api/mcp/asset/**',
      },
    ],
  },
  // Enable React strict mode
  reactStrictMode: true,
  // Compress responses
  compress: true,
  // Optimize production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Optimize package imports and code splitting
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-google-recaptcha', 'react-phone-number-input'],
    // optimizeCss: true, // Disabled - requires critters package
    webpackBuildWorker: true,
  },
  // Performance optimizations
  poweredByHeader: false,
  // Use Netlify Next.js runtime (not static export) to support API routes
  // output: 'export',
  trailingSlash: true,
  // Production source maps
  productionBrowserSourceMaps: false,
  // Turbopack configuration
  turbopack: {},
}

module.exports = nextConfig
