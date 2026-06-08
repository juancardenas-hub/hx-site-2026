import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { EyebrowMono } from '@/components/ui/EyebrowMono';
import { Rule } from '@/components/ui/Rule';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { DesafioHero } from '@/components/desafios/DesafioHero';
import { DesafioNav } from '@/components/desafios/DesafioNav';
import { CTAFinal } from '@/components/home/CTAFinal';
import { DESAFIOS, getDesafio } from '@/content/desafios';

export function generateStaticParams() {
  return DESAFIOS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = getDesafio(slug);
  if (!d) return {};
  return {
    title: `${d.titulo} — Desafios`,
    description: d.subtitulo,
  };
}

export default async function DesafioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const desafio = getDesafio(slug);
  if (!desafio) notFound();

  return (
    <>
      <DesafioHero desafio={desafio} />

      <Section variant="paper">
        <Container>
          <div className="grid grid-cols-1 gap-y-16 md:grid-cols-12 md:gap-x-12">
            {/* SIDEBAR */}
            <aside className="md:col-span-3">
              <DesafioNav current={desafio.slug} />
            </aside>

            {/* CORPO */}
            <div className="md:col-span-8 md:col-start-5">
              {/* SINTOMAS */}
              <section aria-label="Sintomas">
                <EyebrowMono className="block text-hx-gray-text">
                  Soa familiar?
                </EyebrowMono>
                <div className="mt-10 space-y-8">
                  {desafio.sintomas.map((s) => (
                    <ScrollReveal key={s} y={20}>
                      <p className="font-display text-[clamp(1.5rem,3.5vw,2.75rem)] font-light italic leading-tight tracking-ed-tight">
                        <span className="text-hx-lime">“</span>
                        {s}
                        <span className="text-hx-lime">”</span>
                      </p>
                    </ScrollReveal>
                  ))}
                </div>
              </section>

              <Rule className="my-20" />

              {/* NOSSO JEITO */}
              <section aria-label="Nosso jeito">
                <EyebrowMono className="block text-hx-gray-text">
                  Nosso jeito
                </EyebrowMono>
                <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
                  {desafio.nossoJeito.map((p) => (
                    <ScrollReveal key={p.num} y={24}>
                      <div className="border-t border-hx-ink pt-5">
                        <span className="font-mono text-ed-xs uppercase tracking-ed-caps text-hx-gray-text">
                          {p.num}
                        </span>
                        <h3 className="mt-4 font-display text-ed-xl leading-tight tracking-ed-tight">
                          {p.titulo}
                        </h3>
                        <p className="mt-3 font-body text-ed-base leading-relaxed text-hx-gray-text">
                          {p.texto}
                        </p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </section>

              <Rule className="my-20" />

              {/* ENTREGAS */}
              <section aria-label="O que entregamos">
                <EyebrowMono className="block text-hx-gray-text">
                  O que entregamos
                </EyebrowMono>
                <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
                  {desafio.entregas.map((e) => (
                    <li
                      key={e}
                      className="flex gap-3 border-t border-hx-ink-border pt-4 font-body text-ed-lg"
                    >
                      <span className="text-hx-lime">→</span>
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <Rule className="my-20" />

              {/* CASE RELACIONADO */}
              <section aria-label="Case relacionado">
                <EyebrowMono className="block text-hx-gray-text">
                  Case relacionado
                </EyebrowMono>
                <Link
                  href={`/trabalhos/${desafio.caseRelacionado.slug}`}
                  className="group mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-hx-ink">
                    <div
                      className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ background: desafio.caseRelacionado.cover }}
                    >
                      <span className="font-display text-ed-xl italic text-hx-ink/20">
                        {desafio.caseRelacionado.cliente}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-4 font-mono text-ed-xs uppercase tracking-ed-caps text-hx-gray-text">
                      <span>{desafio.caseRelacionado.cliente}</span>
                      <span>·</span>
                      <span>{desafio.caseRelacionado.setor}</span>
                      <span>·</span>
                      <span>{desafio.caseRelacionado.ano}</span>
                    </div>
                    <h3 className="mt-4 font-display text-ed-2xl leading-tight tracking-ed-tight">
                      {desafio.caseRelacionado.titulo}
                    </h3>
                    <p className="mt-6 font-display text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-none tracking-ed-tight">
                      {desafio.caseRelacionado.stat}
                    </p>
                    <p className="mt-2 font-mono text-ed-xs uppercase tracking-ed-caps text-hx-gray-text">
                      {desafio.caseRelacionado.statLabel}
                    </p>
                    <span className="mt-6 font-mono text-ed-xs uppercase tracking-ed-caps text-hx-ink transition-colors group-hover:text-hx-lime">
                      Ver case →
                    </span>
                  </div>
                </Link>
              </section>
            </div>
          </div>
        </Container>
      </Section>

      <CTAFinal
        eyebrow={`DESAFIO ${desafio.num}`}
        headline={desafio.ctaTexto}
        subtext="Sem formulário longo, sem proposta enrolada. Fale direto com o estúdio."
      />
    </>
  );
}
