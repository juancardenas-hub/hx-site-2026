'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

const HOVER_SELECTOR = 'a, button, [data-cursor="hover"]';

/**
 * Cursor custom HX — dot de 12px que segue o mouse com gsap.quickTo (lerp suave).
 *
 * Cor: branco + `mix-blend-mode: difference` → inverte automaticamente contra
 * qualquer fundo (escuro sobre paper, claro sobre o footer ink). Ao passar por
 * elementos interativos, cresce 3x e vira lime sólido (sem blend).
 *
 * Ativo SÓ em desktop com ponteiro fino (mouse) e sem prefers-reduced-motion.
 * Em mobile/touch nada é renderizado e o cursor nativo permanece.
 */
export function CursorFollow() {
  const dotRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const mm = gsap.matchMedia();

    mm.add(
      '(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
      () => {
        gsap.set(dot, { xPercent: -50, yPercent: -50, opacity: 0, scale: 1 });
        document.documentElement.classList.add('has-custom-cursor');

        const xTo = gsap.quickTo(dot, 'x', { duration: 0.4, ease: 'power3.out' });
        const yTo = gsap.quickTo(dot, 'y', { duration: 0.4, ease: 'power3.out' });

        let shown = false;
        const onMove = (e: PointerEvent) => {
          if (!shown) {
            gsap.to(dot, { opacity: 1, duration: 0.3 });
            shown = true;
          }
          xTo(e.clientX);
          yTo(e.clientY);
        };

        const onOver = (e: PointerEvent) => {
          if ((e.target as Element)?.closest?.(HOVER_SELECTOR)) {
            dot.classList.add('is-hover');
            gsap.to(dot, { scale: 3, duration: 0.3, ease: 'power2.out' });
          }
        };
        const onOut = (e: PointerEvent) => {
          if ((e.target as Element)?.closest?.(HOVER_SELECTOR)) {
            dot.classList.remove('is-hover');
            gsap.to(dot, { scale: 1, duration: 0.3, ease: 'power2.out' });
          }
        };

        const onDocLeave = () => gsap.to(dot, { opacity: 0, duration: 0.2 });
        const onDocEnter = () => gsap.to(dot, { opacity: 1, duration: 0.2 });

        window.addEventListener('pointermove', onMove);
        document.addEventListener('pointerover', onOver);
        document.addEventListener('pointerout', onOut);
        document.documentElement.addEventListener('mouseleave', onDocLeave);
        document.documentElement.addEventListener('mouseenter', onDocEnter);

        return () => {
          window.removeEventListener('pointermove', onMove);
          document.removeEventListener('pointerover', onOver);
          document.removeEventListener('pointerout', onOut);
          document.documentElement.removeEventListener('mouseleave', onDocLeave);
          document.documentElement.removeEventListener('mouseenter', onDocEnter);
          document.documentElement.classList.remove('has-custom-cursor');
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="cursor-dot pointer-events-none fixed left-0 top-0 z-[9999] hidden h-3 w-3 rounded-full lg:block"
    />
  );
}
