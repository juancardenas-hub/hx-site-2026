import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { EyebrowMono } from '@/components/ui/EyebrowMono';
import { Rule } from '@/components/ui/Rule';
import { BlurIn } from '@/components/animation/BlurIn';
import { SplitReveal } from '@/components/animation/SplitReveal';
import { ScrollReveal } from '@/components/animation/ScrollReveal';

export default function DesignSystemTest() {
  return (
    <main>
      {/* HEADER DA PÁGINA DE TESTE */}
      <Section variant="paper" compact>
        <Container>
          <EyebrowMono>HX / DESIGN SYSTEM / SMOKE TEST</EyebrowMono>
          <BlurIn>
            <h1 className="mt-6 font-display text-ed-3xl tracking-ed-tight">
              Design System — Prompt 02
            </h1>
          </BlurIn>
          <p className="mt-4 font-body text-ed-lg text-hx-gray-text">
            Página temporária para validar tokens, componentes UI e animações.
            Será substituída no Prompt 04 pelo hero da home.
          </p>
        </Container>
      </Section>

      <Rule />

      {/* PALETA */}
      <Section variant="paper" compact>
        <Container>
          <EyebrowMono>01 / PALETA</EyebrowMono>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Swatch name="hx-ink" hex="#121212" className="bg-hx-ink text-hx-paper" />
            <Swatch name="hx-lime" hex="#D6ED69" className="bg-hx-lime text-hx-ink" />
            <Swatch name="hx-paper" hex="#F9F9F9" className="bg-hx-paper text-hx-ink border border-hx-ink-border" />
            <Swatch name="hx-cream" hex="#F8EADC" className="bg-hx-cream text-hx-ink" />
            <Swatch name="hx-ink-90" hex="#1A1A1A" className="bg-hx-ink-90 text-hx-paper" />
            <Swatch name="hx-mid" hex="#4D4D4D" className="bg-hx-mid text-hx-paper" />
            <Swatch name="hx-gray-text" hex="#828282" className="bg-hx-gray-text text-hx-paper" />
            <Swatch name="hx-light" hex="#F4F4F4" className="bg-hx-light text-hx-ink" />
          </div>
        </Container>
      </Section>

      <Rule />

      {/* TIPOGRAFIA */}
      <Section variant="paper-lite" compact>
        <Container>
          <EyebrowMono>02 / TIPOGRAFIA</EyebrowMono>
          <div className="mt-8 space-y-8">
            <div>
              <EyebrowMono>FRAUNCES — DISPLAY</EyebrowMono>
              <p className="mt-3 font-display text-ed-5xl tracking-ed-tight leading-none">
                Method.
              </p>
              <p className="mt-3 font-display text-ed-3xl tracking-ed-tight">
                Criamos marcas que existem.
              </p>
              <p className="mt-3 font-display text-ed-xl italic">
                E que ficam.
              </p>
            </div>
            <div>
              <EyebrowMono>INTER — BODY</EyebrowMono>
              <p className="mt-3 font-body text-ed-lg">
                Texto de corpo em Inter — escala 20px / leading relaxed para leitura editorial confortável.
              </p>
              <p className="mt-3 font-body text-ed-base">
                Texto de corpo padrão em 16px.
              </p>
            </div>
            <div>
              <EyebrowMono>JETBRAINS MONO — CAPTIONS</EyebrowMono>
              <p className="mt-3 font-mono text-ed-sm">
                CASE Nº 002 / 2026 — SETOR TECNOLOGIA
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Rule />

      {/* COMPONENTES UI */}
      <Section variant="paper" compact>
        <Container>
          <EyebrowMono>03 / COMPONENTES UI</EyebrowMono>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button>Iniciar Projeto</Button>
            <Button variant="secondary">Ver Trabalhos</Button>
            <Button variant="ghost">Saiba Mais</Button>
          </div>
        </Container>
      </Section>

      <Rule />

      {/* ANIMAÇÕES */}
      <Section variant="ink" compact>
        <Container>
          <EyebrowMono className="text-hx-lime">04 / ANIMAÇÕES</EyebrowMono>
          <div className="mt-8 space-y-12">
            <SplitReveal>
              <h2 className="font-display text-ed-3xl tracking-ed-tight">
                SplitReveal — word stagger reveal
              </h2>
            </SplitReveal>
            <ScrollReveal>
              <p className="font-body text-ed-lg max-w-2xl">
                ScrollReveal — este parágrafo aparece com fade + y quando entra na viewport.
                Role para vê-lo animar (uma vez só).
              </p>
            </ScrollReveal>
            <BlurIn delay={0.3}>
              <p className="font-mono text-ed-sm uppercase tracking-ed-caps text-hx-lime">
                BlurIn — entrada com blur + y
              </p>
            </BlurIn>
          </div>
        </Container>
      </Section>

      <Rule variant="lime" />

      {/* CTA FINAL — SEÇÃO LIME (5% allowance) */}
      <Section variant="lime" compact>
        <Container>
          <EyebrowMono>05 / CTA FINAL (5% LIME ALLOWANCE)</EyebrowMono>
          <h2 className="mt-6 font-display text-ed-3xl tracking-ed-tight">
            Esta seção usa lime como background pleno. Esta é a única licença de página inteira lime.
          </h2>
        </Container>
      </Section>
    </main>
  );
}

function Swatch({
  name,
  hex,
  className,
}: {
  name: string;
  hex: string;
  className: string;
}) {
  return (
    <div className={`p-6 ${className}`}>
      <p className="font-mono text-ed-xs uppercase tracking-ed-caps">{name}</p>
      <p className="mt-1 font-mono text-ed-sm">{hex}</p>
    </div>
  );
}
