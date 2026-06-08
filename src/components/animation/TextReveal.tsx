'use client';

import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap';

interface TextRevealProps {
  children: ReactNode;
  /** Split por palavras (default) ou caracteres. */
  type?: 'words' | 'chars';
  /** Stagger entre elementos (s). Default 0.014 — leve para corpo de texto. */
  stagger?: number;
  /** Duração por elemento (s). Default 0.5. */
  duration?: number;
  /** Offset Y inicial (px). Default 18. */
  y?: number;
  /** Posição do trigger. Default "top 80%". */
  start?: string;
  className?: string;
}

/**
 * TextReveal — word/char stagger DISPARADO NO SCROLL (ao contrário do SplitReveal,
 * que anima no mount). Ideal para parágrafos editoriais que entram conforme a
 * leitura desce. Stagger pequeno por padrão para não pesar em corpo de texto.
 */
export function TextReveal({
  children,
  type = 'words',
  stagger = 0.014,
  duration = 0.5,
  y = 18,
  start = 'top 80%',
  className,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const split = new SplitText(el, { type });
        const targets = type === 'words' ? split.words : split.chars;
        gsap.set(targets, { opacity: 0, y });

        const st = ScrollTrigger.create({
          trigger: el,
          start,
          once: true,
          onEnter: () =>
            gsap.to(targets, {
              opacity: 1,
              y: 0,
              duration,
              ease: 'power3.out',
              stagger,
            }),
        });

        return () => {
          st.kill();
          split.revert();
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
