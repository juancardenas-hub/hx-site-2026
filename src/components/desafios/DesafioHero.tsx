import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { EyebrowMono } from '@/components/ui/EyebrowMono';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import type { Desafio, DesafioAccent } from '@/content/desafios';

// Acento varia por desafio; tipografia sempre preto+branco como base.
const ACCENT: Record<
  DesafioAccent,
  { variant: 'paper' | 'cream' | 'ink' | 'paper-lite'; eyebrow: string; sub: string }
> = {
  lime: { variant: 'paper', eyebrow: 'text-hx-lime', sub: 'text-hx-gray-text' },
  cream: { variant: 'cream', eyebrow: 'text-hx-ink', sub: 'text-hx-mid' },
  ink: { variant: 'ink', eyebrow: 'text-hx-lime', sub: 'text-hx-gray-soft' },
  'paper-lite': { variant: 'paper-lite', eyebrow: 'text-hx-ink', sub: 'text-hx-gray-text' },
};

export function DesafioHero({ desafio }: { desafio: Desafio }) {
  const a = ACCENT[desafio.accent];
  return (
    <Section variant={a.variant} className="pt-40">
      <Container>
        <EyebrowMono className={`block ${a.eyebrow}`}>{desafio.eyebrow}</EyebrowMono>
        <ScrollReveal>
          <h1 className="mt-8 font-display text-[clamp(3rem,9vw,9rem)] font-semibold uppercase leading-[0.9] tracking-ed-tight">
            {desafio.titulo}
          </h1>
        </ScrollReveal>
        <p className={`mt-8 max-w-2xl font-display text-[clamp(1.5rem,3vw,2.5rem)] font-light italic leading-snug tracking-ed-tight`}>
          {desafio.subtitulo}
        </p>
        <p className={`mt-10 max-w-2xl font-body text-ed-lg leading-relaxed ${a.sub}`}>
          {desafio.narrativa}
        </p>
      </Container>
    </Section>
  );
}
