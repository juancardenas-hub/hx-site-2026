import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { EyebrowMono } from '@/components/ui/EyebrowMono';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { DESAFIOS } from '@/content/desafios';

export const metadata: Metadata = {
  title: 'Desafios',
  description:
    'Organizamos o trabalho por desafio do cliente, não por serviço: lançar, reposicionar, crescer e conteúdo.',
};

export default function DesafiosIndexPage() {
  return (
    <>
      <Section variant="paper" className="pt-40">
        <Container>
          <EyebrowMono className="block">DESAFIOS</EyebrowMono>
          <h1 className="mt-8 max-w-4xl font-display text-[clamp(2.5rem,6vw,6rem)] font-semibold leading-[1.02] tracking-ed-tight">
            Não vendemos serviços. Resolvemos desafios.
          </h1>
          <p className="mt-8 max-w-2xl font-body text-ed-xl leading-relaxed text-hx-gray-text">
            Todo projeto começa por uma pergunta do cliente, não por um item de
            tabela. São quatro frentes — e todas passam pelo mesmo método.
          </p>
        </Container>
      </Section>

      <Section variant="paper-lite">
        <Container>
          <div className="grid grid-cols-1 gap-px md:grid-cols-2">
            {DESAFIOS.map((d) => (
              <ScrollReveal key={d.slug} y={28}>
                <Link
                  href={`/desafios/${d.slug}`}
                  className="group flex h-full flex-col border-t border-hx-ink px-1 pt-8 pb-12 transition-colors duration-300 hover:border-hx-lime"
                >
                  <span className="font-mono text-ed-xs uppercase tracking-ed-caps text-hx-gray-text transition-colors duration-300 group-hover:text-hx-lime">
                    {d.num}
                  </span>
                  <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] leading-none tracking-ed-tight">
                    {d.titulo}
                  </h2>
                  <p className="mt-5 max-w-md font-body text-ed-lg leading-relaxed text-hx-gray-text">
                    {d.subtitulo}
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-8 inline-block font-display text-ed-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:text-hx-lime"
                  >
                    →
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
