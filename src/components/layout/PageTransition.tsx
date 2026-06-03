'use client';

import { type ReactNode, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

/**
 * Transição entre rotas — overlay ink que faz "wipe" de reveal (de cima p/ baixo)
 * somado a um fade-up do conteúdo da página a cada mudança de pathname.
 *
 * NOTA DE VERSÃO: o React 19.2.4 stable NÃO exporta `unstable_ViewTransition`
 * (só existe no canal react@experimental), e o `experimental.viewTransition` do
 * Next depende justamente desse componente. Por isso usamos o fallback GSAP —
 * confiável em todos os browsers e coerente com a espinha editorial calma da HX.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const content = contentRef.current;
      if (!overlay || !content) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline();
        tl.fromTo(
          overlay,
          { scaleY: 1 },
          {
            scaleY: 0,
            transformOrigin: 'top center',
            duration: 0.6,
            ease: 'power3.inOut',
          },
        ).fromTo(
          content,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.3',
        );
      });

      // Reduced motion: sem wipe nem fade — conteúdo visível imediatamente.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(overlay, { scaleY: 0 });
        gsap.set(content, { autoAlpha: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { dependencies: [pathname] },
  );

  return (
    <>
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[80] origin-top bg-hx-ink"
        style={{ transform: 'scaleY(0)' }}
      />
      <div ref={contentRef}>{children}</div>
    </>
  );
}
