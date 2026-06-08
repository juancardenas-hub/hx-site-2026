'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { cn } from '@/lib/cn';

interface CountUpProps {
  /** Valor final. */
  to: number;
  prefix?: string;
  suffix?: string;
  /** Casas decimais (ex: 1 para "3.2"). Default 0. */
  decimals?: number;
  /** Duração da contagem (s). Default 1.6. */
  duration?: number;
  /** Classes (tamanho/fonte) aplicadas ao número. */
  className?: string;
}

/**
 * Counter-up disparado no scroll, com suporte a decimais (ex: 3.2x).
 *
 * Técnica anti-stutter: um "ghost" invisível com o valor final reserva a largura
 * da caixa, e o número animado fica em overlay absoluto → zero layout shift.
 * `tabular-nums` mantém os dígitos com largura fixa. reduced-motion = valor final.
 */
export function CountUp({
  to,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1.6,
  className,
}: CountUpProps) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const fmt = (v: number) => `${prefix}${v.toFixed(decimals)}${suffix}`;
  const finalText = fmt(to);

  useGSAP(
    () => {
      const el = numRef.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const obj = { v: 0 };
        el.textContent = fmt(0);
        const st = ScrollTrigger.create({
          trigger: wrapRef.current!,
          start: 'top 85%',
          once: true,
          onEnter: () =>
            gsap.to(obj, {
              v: to,
              duration,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = fmt(obj.v);
              },
            }),
        });
        return () => st.kill();
      });

      return () => mm.revert();
    },
    { scope: wrapRef },
  );

  return (
    <span
      ref={wrapRef}
      className={cn('relative inline-block tabular-nums', className)}
    >
      <span aria-hidden="true" className="invisible">
        {finalText}
      </span>
      <span ref={numRef} className="absolute inset-0">
        {finalText}
      </span>
    </span>
  );
}
