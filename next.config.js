/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/components': require('path').resolve(__dirname, 'components'),
      '@/lib': require('path').resolve(__dirname, 'lib'),
    }
    return config
  },
  typescript: {
    ignoreBuildErrors: true  // 忽略 TypeScript 错误
  },
  eslint: {
    ignoreDuringBuilds: true  // 忽略 ESLint 错误
  }
}

module.exports = nextConfig 