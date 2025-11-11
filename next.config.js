/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Required for static export
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
  // Optimize package imports
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Performance optimizations
  poweredByHeader: false,
  // Output for Netlify
  output: 'export',
  trailingSlash: true,
}

module.exports = nextConfig
