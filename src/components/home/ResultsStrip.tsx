'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

interface StatData {
  to: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

// Placeholders editoriais — viram conteúdo de CMS no Prompt 11.
const STATS: StatData[] = [
  { to: 4, prefix: '0', label: 'Frentes de atuação' },
  { to: 40, prefix: '+', label: 'Marcas atendidas' },
  { to: 5, prefix: '0', label: 'Etapas do método' },
  { to: 100, suffix: '%', label: 'Projetos com método' },
];

function Stat({ to, prefix = '', suffix = '', label }: StatData) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const finalText = `${prefix}${to}${suffix}`;

  useGSAP(
    () => {
      const el = numRef.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      // Só conta com movimento permitido; sob reduced-motion fica o valor final.
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const obj = { v: 0 };
        el.textContent = `${prefix}0${suffix}`;
        const st = ScrollTrigger.create({
          trigger: wrapRef.current!,
          start: 'top 85%',
          once: true,
          onEnter: () =>
            gsap.to(obj, {
              v: to,
              duration: 1.6,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = `${prefix}${Math.round(obj.v)}${suffix}`;
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
    <div ref={wrapRef} className="border-l border-hx-ink-border pl-6">
      {/* Ghost invisível reserva a largura final → counter-up sem layout shift */}
      <div className="relative inline-block font-display text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-none tracking-ed-tight tabular-nums">
        <span aria-hidden="true" className="invisible">
          {finalText}
        </span>
        <span ref={numRef} className="absolute inset-0">
          {finalText}
        </span>
      </div>
      <p className="mt-4 font-mono text-ed-xs uppercase tracking-ed-caps text-hx-gray-text">
        {label}
      </p>
    </div>
  );
}

export function ResultsStrip() {
  return (
    <Section variant="paper-lite" compact aria-label="Resultados em números">
      <Container>
        <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
          {STATS.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
