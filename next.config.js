/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    // Removido contentDispositionType e contentSecurityPolicy que causavam erros 400/406
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
