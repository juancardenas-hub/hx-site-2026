'use client';

import { Fragment, useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { Container } from '@/components/ui/Container';
import { EyebrowMono } from '@/components/ui/EyebrowMono';
import { HeroBackground } from '@/components/home/HeroBackground';

interface Word {
  t: string;
  accent?: boolean;
  suffix?: string;
}

// Headline explodida em palavras controladas no JSX (em vez de SplitText)
// para preservar o accent box lime de "MÉTODO" intacto durante o reveal.
const WORDS: Word[] = [
  { t: 'CRIAMOS' },
  { t: 'MARCAS' },
  { t: 'QUE' },
  { t: 'EXISTEM' },
  { t: 'COM' },
  { t: 'MÉTODO', accent: true, suffix: '.' },
  { t: 'E' },
  { t: 'QUE' },
  { t: 'FICAM', suffix: '.' },
];

const MARQUEE = ['BRAND', 'EXPERIENCE', 'METHOD', 'CULTURE', 'DATA', 'RESULT'];

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const hLineRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const words = gsap.utils.toArray<HTMLElement>('[data-word]', root);
      const fades = gsap.utils.toArray<HTMLElement>('[data-fade]', root);

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Estado inicial — palavras abaixo + invisíveis, secundários ocultos.
        gsap.set(words, { yPercent: 120, opacity: 0 });
        gsap.set(fades, { opacity: 0, y: 24 });

        const tl = gsap.timeline();
        // 1) Headline palavra-a-palavra (y 120% -> 0, expo.out)
        tl.to(words, {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.08,
        })
          // 2) Eyebrow, sub e rodapé fadem depois
          .to(
            fades,
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.1 },
            '-=0.5',
          );

        // H-extension: travessão cruza a viewport conforme o hero sai (scrub).
        gsap.fromTo(
          hLineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          },
        );

        // Marquee outline — translateX infinito (2 grupos = loop sem emenda).
        const marqueeTween = gsap.to(marqueeRef.current, {
          xPercent: -50,
          ease: 'none',
          duration: 28,
          repeat: -1,
        });

        // "ROLE ↓" pulsando.
        const arrowTween = gsap.to(arrowRef.current, {
          y: 6,
          repeat: -1,
          yoyo: true,
          duration: 0.8,
          ease: 'sine.inOut',
        });

        return () => {
          marqueeTween.kill();
          arrowTween.kill();
        };
      });

      // Reduced motion: estados finais imediatos, sem scroll-scrub nem loops.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(words, { yPercent: 0, opacity: 1 });
        gsap.set(fades, { opacity: 1, y: 0 });
        gsap.set(hLineRef.current, { scaleX: 1 });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <>
      <section
        ref={rootRef}
        className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-hx-paper pt-28 pb-32"
        aria-label="Apresentação HeadXperience"
      >
        {/* FUNDO WEBGL (shader noise) + fallback estático */}
        <HeroBackground />

        {/* H-EXTENSION — travessão do H que cruza a viewport no scroll */}
        <div
          ref={hLineRef}
          aria-hidden="true"
          className="absolute inset-x-0 top-[58%] z-[1] h-[2px] origin-left bg-hx-ink"
          style={{ transform: 'scaleX(0)' }}
        />

        <Container className="relative z-10">
          {/* EYEBROW */}
          <EyebrowMono data-fade className="block">
            01 / HEADXPERIENCE — CREATIVE AGENCY — CURITIBA / PR
          </EyebrowMono>

          {/* HEADLINE — único h1 semântico */}
          <h1 className="mt-8 max-w-[14ch] font-display text-[clamp(3.25rem,11vw,15rem)] font-semibold uppercase leading-[0.85] tracking-ed-tight">
            {WORDS.map((w, i) => (
              <Fragment key={i}>
                <span data-word className="inline-block will-change-transform">
                  {w.accent ? (
                    <span className="box-decoration-clone bg-hx-lime px-[0.12em] py-[0.02em] text-hx-ink">
                      {w.t}
                    </span>
                  ) : (
                    w.t
                  )}
                  {w.suffix}
                </span>
                {i < WORDS.length - 1 ? ' ' : ''}
              </Fragment>
            ))}
          </h1>

          {/* SUB-HEADLINE */}
          <p
            data-fade
            className="mt-10 max-w-md font-body text-ed-lg font-medium text-hx-gray-text"
          >
            Agência de brand experience em Curitiba. No cruzamento entre a
            ousadia da Faria Lima e o rigor do Vale do Pinhão.
          </p>
        </Container>

        {/* RODAPÉ DO HERO — ROLE ↓ (esq) + CTA (dir) */}
        <Container
          data-fade
          className="absolute inset-x-0 bottom-10 z-10 flex items-end justify-between"
        >
          <span className="font-mono text-ed-xs uppercase tracking-ed-caps text-hx-gray-text">
            Role{' '}
            <span ref={arrowRef} className="inline-block">
              ↓
            </span>
          </span>

          <Link
            href="/contato"
            className="inline-flex items-center gap-3 bg-hx-lime px-6 py-3 font-mono text-ed-xs uppercase tracking-ed-caps text-hx-ink transition-colors duration-300 ease-out hover:bg-hx-ink hover:text-hx-lime"
          >
            <span>Inicie um projeto</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="square"
              aria-hidden="true"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </Link>
        </Container>
      </section>

      {/* MARQUEE OUTLINE GIGANTE */}
      <div
        className="overflow-hidden border-y border-hx-ink-border bg-hx-paper py-6"
        aria-hidden="true"
      >
        <div ref={marqueeRef} className="flex w-max flex-nowrap">
          {[0, 1].map((group) => (
            <div key={group} className="flex flex-nowrap">
              {MARQUEE.map((word, i) => (
                <span
                  key={`${group}-${i}`}
                  className="text-stroke-ink whitespace-nowrap px-6 font-display text-[clamp(3rem,12vw,11rem)] font-semibold uppercase leading-none tracking-ed-tight"
                >
                  {word}
                  <span className="px-2 text-hx-lime" style={{ WebkitTextStroke: '0' }}>
                    ×
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
