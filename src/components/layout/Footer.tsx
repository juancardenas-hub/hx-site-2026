'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { Logo } from '@/components/ui/Logo';

const NAV = [
  { label: 'Trabalhos', href: '/trabalhos' },
  { label: 'Desafios', href: '/desafios' },
  { label: 'Método', href: '/metodo' },
  { label: 'Manifesto', href: '/manifesto' },
  { label: 'Estúdio', href: '/estudio' },
  { label: 'Contato', href: '/contato' },
];

const MARQUEE_PHRASE = "LET'S CREATE EPIC STUFF";

export function Footer() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Marquee infinita via translateX. Dois grupos idênticos = loop sem emenda.
  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tween = gsap.to(track, {
          xPercent: -50,
          ease: 'none',
          duration: 24,
          repeat: -1,
        });
        return () => tween.kill();
      });
      // Reduced motion: marquee estática (sem translateX infinito).

      return () => mm.revert();
    },
    { scope: trackRef },
  );

  return (
    <footer className="bg-hx-ink text-hx-paper">
      {/* MARQUEE */}
      <div
        className="overflow-hidden border-b border-hx-ink-border py-8"
        aria-hidden="true"
      >
        <div ref={trackRef} className="flex w-max flex-nowrap">
          {[0, 1].map((group) => (
            <div key={group} className="flex flex-nowrap">
              {Array.from({ length: 4 }).map((_, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap px-8 font-display text-ed-3xl tracking-ed-tight text-hx-paper"
                >
                  {MARQUEE_PHRASE}
                  <span className="px-8 text-hx-lime">×</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 4 COLUNAS */}
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-12 px-6 py-20 md:grid-cols-2 md:px-12 lg:grid-cols-4">
        {/* COL 1 — LOGO + TAGLINE */}
        <div>
          <Logo className="h-7 text-hx-paper" title="HeadXperience" />
          <p className="mt-6 max-w-xs font-body text-ed-base leading-relaxed text-hx-gray-soft">
            Brand experience com método. No cruzamento entre a ousadia da Faria
            Lima e o rigor do Vale do Pinhão.
          </p>
        </div>

        {/* COL 2 — NAVEGAÇÃO */}
        <nav aria-label="Navegação do rodapé">
          <p className="font-mono text-ed-xs uppercase tracking-ed-caps text-hx-gray-soft">
            Navegação
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-body text-ed-base text-hx-paper transition-colors duration-200 hover:text-hx-lime"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* COL 3 — CONTATO */}
        <div>
          <p className="font-mono text-ed-xs uppercase tracking-ed-caps text-hx-gray-soft">
            Contato
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            <li>
              <a
                href="https://wa.me/5541000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-ed-base text-hx-paper transition-colors duration-200 hover:text-hx-lime"
              >
                WhatsApp Business
              </a>
            </li>
            <li>
              <a
                href="mailto:contato@headxperience.com"
                className="font-body text-ed-base text-hx-paper transition-colors duration-200 hover:text-hx-lime"
              >
                contato@headxperience.com
              </a>
            </li>
          </ul>
        </div>

        {/* COL 4 — ENDEREÇO + SOCIAL */}
        <div>
          <p className="font-mono text-ed-xs uppercase tracking-ed-caps text-hx-gray-soft">
            Estúdio
          </p>
          <address className="mt-6 font-body text-ed-base not-italic leading-relaxed text-hx-paper">
            Curitiba — Paraná
            <br />
            Brasil
          </address>
          <ul className="mt-6 flex gap-5">
            {[
              { label: 'Instagram', href: 'https://instagram.com/headxperience' },
              { label: 'LinkedIn', href: 'https://linkedin.com/company/headxperience' },
              { label: 'Behance', href: 'https://behance.net/headxperience' },
            ].map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-ed-xs uppercase tracking-ed-caps text-hx-gray-soft transition-colors duration-200 hover:text-hx-lime"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* BARRA INFERIOR */}
      <div className="border-t border-hx-ink-border">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-2 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-12">
          <p className="font-mono text-ed-xs uppercase tracking-ed-caps text-hx-gray-soft">
            <span className="text-hx-lime">© 2026</span> HeadXperience Studio
          </p>
          <p className="font-mono text-ed-xs uppercase tracking-ed-caps text-hx-gray-soft">
            Criatividade com método
          </p>
        </div>
      </div>
    </footer>
  );
}
