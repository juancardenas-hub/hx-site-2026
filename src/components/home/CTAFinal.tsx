import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { EyebrowMono } from '@/components/ui/EyebrowMono';
import { ScrollReveal } from '@/components/animation/ScrollReveal';

const WHATSAPP_URL = 'https://wa.me/5541000000000';
const EMAIL = 'contato@headxperience.com';

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="square"
      aria-hidden="true"
      className="transition-transform duration-300 group-hover:translate-x-1"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

interface CTAFinalProps {
  /** Eyebrow mono no topo. Omitido = sem eyebrow. */
  eyebrow?: string;
  /** Headline principal. */
  headline?: string;
  /** Texto de apoio. Omitido = sem subtexto. */
  subtext?: string;
}

/**
 * CTA full-bleed lime reutilizável — único tipo de bloco lime pleno do site
 * (momento sancionado dos 5%). Botões com a assinatura HX (inversão ink↔lime no
 * hover), sem ícone verde flutuante genérico de WhatsApp. Copy parametrizável.
 */
export function CTAFinal({
  eyebrow = '05 / VAMOS CONVERSAR',
  headline = 'Vamos criar algo que fique.',
  subtext = 'Sem formulário longo, sem proposta enrolada. Fale direto com o estúdio.',
}: CTAFinalProps = {}) {
  return (
    <Section variant="lime" aria-label="Vamos conversar">
      <Container>
        {eyebrow ? (
          <EyebrowMono className="block text-hx-ink/60">{eyebrow}</EyebrowMono>
        ) : null}

        <ScrollReveal>
          <h2 className="mt-8 max-w-3xl font-display text-[clamp(2.5rem,6vw,6rem)] font-semibold leading-[0.95] tracking-ed-tight text-hx-ink">
            {headline}
          </h2>
        </ScrollReveal>

        {subtext ? (
          <p className="mt-8 max-w-md font-body text-ed-lg text-hx-ink/70">
            {subtext}
          </p>
        ) : null}

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Link
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 bg-hx-ink px-8 py-4 font-mono text-ed-xs uppercase tracking-ed-caps text-hx-lime transition-colors duration-300 ease-out hover:bg-hx-paper hover:text-hx-ink"
          >
            <span>Abrir WhatsApp</span>
            <Arrow />
          </Link>

          <Link
            href={`mailto:${EMAIL}`}
            className="group inline-flex items-center justify-center gap-3 border border-hx-ink px-8 py-4 font-mono text-ed-xs uppercase tracking-ed-caps text-hx-ink transition-colors duration-300 ease-out hover:bg-hx-ink hover:text-hx-lime"
          >
            <span>Escrever por e-mail</span>
            <Arrow />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
