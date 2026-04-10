/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Bypass de erros 400 no servidor/VPS
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
  },
  // Otimizações para produção
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  // Otimizações de performance
  experimental: {
    optimizeCss: false, // Desabilitado para evitar problemas
  },
  // Configurações para build
  typescript: {
    // Não falhar build se houver erros de tipo (apenas avisar)
    ignoreBuildErrors: false,
  },
  eslint: {
    // Não falhar build se houver erros de lint (apenas avisar)
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig
