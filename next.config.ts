import type { NextConfig } from 'next';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Será preenchido com o domínio do WP no Prompt 11a.
      // Exemplo: { protocol: 'https', hostname: 'cms.headxperience.com' }
    ],
  },
  // experimental.viewTransition fica DESLIGADO de propósito: ele depende do
  // componente React <ViewTransition> (unstable_ViewTransition), que NÃO existe
  // no react 19.2.4 stable — só no canal react@experimental. As transições de
  // rota são feitas via overlay GSAP em PageTransition.tsx (cross-browser).
};

export default nextConfig;
