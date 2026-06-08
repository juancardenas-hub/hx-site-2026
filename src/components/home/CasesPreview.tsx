'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { EyebrowMono } from '@/components/ui/EyebrowMono';

interface CaseItem {
  cliente: string;
  setor: string;
  ano: string;
  title: string;
  slug: string;
  cover: string;
}

interface NdaItem {
  nda: true;
  setor: string;
  desafio: string;
  ano: string;
  stat: string;
  statLabel: string;
}

// 2 cases reais (placeholders até o Prompt 09/11) + 1 card NDA.
const CASES: CaseItem[] = [
  {
    cliente: 'Atelier Norte',
    setor: 'Moda',
    ano: '2025',
    title: 'Reposicionamento que devolveu desejo à marca.',
    slug: 'atelier-norte',
    cover: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
  },
  {
    cliente: 'Clínica Vértix',
    setor: 'Saúde',
    ano: '2025',
    title: 'Marca de saúde que passou a soar premium sem perder confiança.',
    slug: 'clinica-vertix',
    cover: 'linear-gradient(135deg, #272727 0%, #121212 100%)',
  },
];

const NDA: NdaItem = {
  nda: true,
  setor: 'Financeiro',
  desafio: 'Reposicionar',
  ano: '2024',
  stat: '+38%',
  statLabel: 'awareness em 6 meses',
};

export function CasesPreview() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;
      const cards = gsap.utils.toArray<HTMLElement>('[data-case]', grid);
      const covers = gsap.utils.toArray<HTMLElement>('[data-reveal]', grid);

      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(cards, { opacity: 0, y: 40 });
        gsap.set(covers, { clipPath: 'inset(0 0 100% 0)' });

        const st = ScrollTrigger.create({
          trigger: grid,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            const tl = gsap.timeline();
            tl.to(cards, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              stagger: 0.12,
            }).to(
              covers,
              {
                clipPath: 'inset(0 0 0% 0)',
                duration: 0.9,
                ease: 'power3.inOut',
                stagger: 0.12,
              },
              0.1,
            );
          },
        });
        return () => st.kill();
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(cards, { opacity: 1, y: 0 });
        gsap.set(covers, { clipPath: 'inset(0 0 0% 0)' });
      });

      return () => mm.revert();
    },
    { scope: gridRef },
  );

  return (
    <Section variant="paper" aria-label="Trabalhos recentes">
      <Container>
        <EyebrowMono className="block">04 / TRABALHOS RECENTES</EyebrowMono>

        <div
          ref={gridRef}
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {CASES.map((c) => (
            <Link
              key={c.slug}
              href={`/trabalhos/${c.slug}`}
              data-case
              className="group block"
            >
              <div
                data-reveal
                className="relative aspect-[4/5] overflow-hidden bg-hx-ink"
              >
                <div
                  className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ background: c.cover }}
                >
                  <span className="px-6 text-center font-display text-ed-xl italic text-hx-paper/15">
                    {c.cliente}
                  </span>
                </div>
                <div className="absolute inset-0 bg-hx-ink/0 transition-colors duration-500 group-hover:bg-hx-ink/20" />
                <span className="absolute bottom-5 left-5 font-mono text-ed-xs uppercase tracking-ed-caps text-hx-lime opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  Ver case →
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between font-mono text-ed-xs uppercase tracking-ed-caps text-hx-gray-text">
                <span>{c.setor}</span>
                <span>{c.ano}</span>
              </div>
              <h3 className="mt-2 font-display text-ed-lg leading-tight tracking-ed-tight">
                {c.title}
              </h3>
            </Link>
          ))}

          {/* CARD NDA — sem imagem, tratamento editorial */}
          <div
            data-case
            className="flex aspect-[4/5] flex-col justify-between bg-hx-ink-90 p-7 text-hx-paper"
          >
            <span className="font-mono text-ed-xs uppercase tracking-ed-caps text-hx-lime">
              [ NDA ]
            </span>
            <div>
              <p className="font-display text-[clamp(3rem,5vw,4.5rem)] font-semibold leading-none tracking-ed-tight">
                {NDA.stat}
              </p>
              <p className="mt-3 font-mono text-ed-xs uppercase tracking-ed-caps text-hx-gray-soft">
                {NDA.statLabel}
              </p>
            </div>
            <p className="font-mono text-ed-xs uppercase tracking-ed-caps leading-relaxed text-hx-gray-soft">
              {NDA.setor} · {NDA.desafio} · {NDA.ano}
              <br />
              Case sob confidencialidade
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
