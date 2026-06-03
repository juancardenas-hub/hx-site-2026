import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ),
  title: {
    default: 'HX — HeadXperience | Brand Experience em Curitiba',
    template: '%s | HX — HeadXperience',
  },
  description:
    'Criamos marcas que existem com método. E que ficam. Agência de brand experience em Curitiba.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'HeadXperience',
    title: 'HX — HeadXperience',
    description:
      'Criamos marcas que existem com método. E que ficam. Agência de brand experience em Curitiba.',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
