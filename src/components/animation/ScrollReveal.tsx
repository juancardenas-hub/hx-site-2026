'use client';

import { useRef, type ReactNode, type HTMLAttributes } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface ScrollRevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Trigger position relative to viewport. Default "top 70%". */
  start?: string;
  /** Y offset to start from. Default 30. */
  y?: number;
  /** Animation duration in seconds. Default 0.8. */
  duration?: number;
}

/**
 * ScrollReveal — equivalente GSAP do whileInView motionsites.
 * Quando o elemento entra na viewport (70% do topo), anima opacity 0→1 + y 30→0.
 * Once: true por padrão (não repete ao sair/voltar).
 */
export function ScrollReveal({
  children,
  start = 'top 70%',
  y = 30,
  duration = 0.8,
  className,
  ...rest
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.set(ref.current, { opacity: 0, y });
      ScrollTrigger.create({
        trigger: ref.current,
        start,
        once: true,
        onEnter: () => {
          gsap.to(ref.current, {
            opacity: 1,
            y: 0,
            duration,
            ease: 'power3.out',
          });
        },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  );
}
