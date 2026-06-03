import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Será preenchido com o domínio do WP no Prompt 11a.
      // Exemplo: { protocol: 'https', hostname: 'cms.headxperience.com' }
    ],
  },
  // View Transitions API será habilitada no Prompt 03b — não ativar ainda
  // porque depende de versão exata do Next.js e pode causar warnings.
};

export default nextConfig;
