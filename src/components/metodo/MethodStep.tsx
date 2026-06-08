'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { cn } from '@/lib/cn';
import { EyebrowMono } from '@/components/ui/EyebrowMono';

export interface MethodStepData {
  num: string;
  title: string;
  objetivo: string;
  entregas: string[];
  duracao: string;
}

interface MethodStepProps extends MethodStepData {
  /** Lado do zig-zag no desktop. */
  align: 'left' | 'right';
  /** Esconde o conector animado no primeiro passo. */
  first?: boolean;
}

export function MethodStep({
  num,
  title,
  objetivo,
  entregas,
  duracao,
  align,
  first = false,
}: MethodStepProps) {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(el, { opacity: 0, x: align === 'right' ? 40 : -40 });
        const tweens: gsap.core.Tween[] = [];
        const st = ScrollTrigger.create({
          trigger: el,
          start: 'top 78%',
          once: true,
          onEnter: () => {
            tweens.push(
              gsap.to(el, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }),
            );
            if (lineRef.current) {
              gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' });
              tweens.push(
                gsap.to(lineRef.current, {
                  scaleX: 1,
                  duration: 0.7,
                  ease: 'power2.inOut',
                }),
              );
            }
          },
        });
        return () => {
          st.kill();
          tweens.forEach((t) => t.kill());
        };
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(el, { opacity: 1, x: 0 });
        if (lineRef.current) gsap.set(lineRef.current, { scaleX: 1 });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-12">
      <div
        ref={ref}
        className={cn(
          'md:col-span-7',
          align === 'right' ? 'md:col-start-6' : 'md:col-start-1',
        )}
      >
        {/* Conector animado entre etapas */}
        {!first && (
          <div
            ref={lineRef}
            aria-hidden="true"
            className="mb-12 h-px w-full bg-hx-ink-border"
          />
        )}

        <div className="flex items-baseline gap-6">
          <span
            aria-hidden="true"
            className="font-display text-[clamp(3.5rem,8vw,8rem)] font-semibold leading-none tracking-ed-tight text-hx-lime"
          >
            {num}
          </span>
          <h3 className="font-display text-ed-2xl leading-none tracking-ed-tight">
            {/* leitura acessível: "Etapa 01 — Descobrir" */}
            <span className="sr-only">{`Etapa ${num} — `}</span>
            {title}
          </h3>
        </div>

        <p className="mt-8 max-w-xl font-body text-ed-lg leading-relaxed text-hx-gray-text">
          {objetivo}
        </p>

        <div className="mt-8">
          <EyebrowMono className="block text-hx-gray-text">Entregas</EyebrowMono>
          <ul className="mt-4 space-y-2">
            {entregas.map((e) => (
              <li
                key={e}
                className="flex gap-3 font-mono text-ed-sm uppercase tracking-ed-caps"
              >
                <span className="text-hx-lime">→</span>
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 font-mono text-ed-xs uppercase tracking-ed-caps text-hx-gray-text">
          Duração típica · {duracao}
        </p>
      </div>
    </div>
  );
}
