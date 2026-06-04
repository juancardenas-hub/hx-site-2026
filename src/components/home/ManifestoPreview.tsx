import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { EyebrowMono } from '@/components/ui/EyebrowMono';
import { ScrollReveal } from '@/components/animation/ScrollReveal';

/**
 * Prévia do Manifesto na home — uma única pull-quote editorial que carrega a
 * tese da HX, com CTA discreto para a página completa.
 */
export function ManifestoPreview() {
  return (
    <Section variant="paper" aria-label="Manifesto">
      <Container>
        <EyebrowMono className="block">03 / MANIFESTO</EyebrowMono>

        <ScrollReveal>
          <blockquote className="mt-10 max-w-5xl font-display text-[clamp(2.25rem,5.5vw,6rem)] font-light italic leading-[1.05] tracking-ed-tight">
            Recusamos a agência que entrega criatividade sem método. E a que
            entrega método sem alma.
          </blockquote>
        </ScrollReveal>

        <Link
          href="/manifesto"
          className="group mt-12 inline-flex items-center gap-3 font-mono text-ed-xs uppercase tracking-ed-caps text-hx-ink transition-colors duration-300 hover:text-hx-gray-text"
        >
          <span>Ler o manifesto completo</span>
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </Container>
    </Section>
  );
}
