'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { EyebrowMono } from '@/components/ui/EyebrowMono';
import { ScrollReveal } from '@/components/animation/ScrollReveal';

interface Capability {
  num: string;
  title: string;
  desc: string;
  slug: string;
}

const CAPABILITIES: Capability[] = [
  {
    num: '01',
    title: 'Lançar',
    desc: 'Uma marca ou produto que ainda não existe no mundo — do conceito ao primeiro olhar.',
    slug: 'lancar',
  },
  {
    num: '02',
    title: 'Reposicionar',
    desc: 'Uma marca que já existe mas parou de significar o que precisa significar.',
    slug: 'reposicionar',
  },
  {
    num: '03',
    title: 'Crescer',
    desc: 'Marca e performance no mesmo plano — presença que constrói e também converte.',
    slug: 'crescer',
  },
  {
    num: '04',
    title: 'Conteúdo',
    desc: 'Narrativas e peças que sustentam a marca no tempo, não só na campanha.',
    slug: 'conteudo',
  },
];

export function Capabilities() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-card]', gridRef.current);
      if (!cards.length) return;

      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(cards, { opacity: 0, y: 32 });
        const st = ScrollTrigger.create({
          trigger: gridRef.current!,
          start: 'top 75%',
          once: true,
          onEnter: () =>
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              stagger: 0.1,
            }),
        });
        return () => st.kill();
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(cards, { opacity: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: gridRef },
  );

  return (
    <Section variant="ink" aria-label="O que fazemos">
      <Container>
        <EyebrowMono className="block text-hx-lime">02 / O QUE FAZEMOS</EyebrowMono>
        <ScrollReveal>
          <h2 className="mt-6 max-w-2xl font-display text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[0.95] tracking-ed-tight">
            Quatro frentes. Um método.
          </h2>
        </ScrollReveal>

        <div
          ref={gridRef}
          className="mt-16 grid grid-cols-1 gap-px sm:grid-cols-2 xl:grid-cols-4"
        >
          {CAPABILITIES.map((c) => (
            <Link
              key={c.slug}
              href={`/desafios/${c.slug}`}
              data-card
              className="group relative flex flex-col border-t border-hx-ink-border px-1 pt-6 pb-10 transition-colors duration-300 hover:border-hx-lime"
            >
              <span className="font-mono text-ed-xs uppercase tracking-ed-caps text-hx-gray-soft transition-colors duration-300 group-hover:text-hx-lime">
                {c.num}
              </span>
              <h3 className="mt-8 font-display text-ed-2xl leading-tight tracking-ed-tight">
                {c.title}
              </h3>
              <p className="mt-3 max-w-xs font-body text-ed-base leading-relaxed text-hx-gray-text">
                {c.desc}
              </p>
              <span
                aria-hidden="true"
                className="mt-8 inline-block font-display text-ed-xl text-hx-paper transition-all duration-300 group-hover:translate-x-1 group-hover:text-hx-lime"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
