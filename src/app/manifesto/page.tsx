import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { EyebrowMono } from '@/components/ui/EyebrowMono';
import { Rule } from '@/components/ui/Rule';
import { PullQuote } from '@/components/ui/PullQuote';
import { Marquee } from '@/components/ui/Marquee';
import { TextReveal } from '@/components/animation/TextReveal';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { CTAFinal } from '@/components/home/CTAFinal';

export const metadata: Metadata = {
  title: 'Manifesto',
  description:
    'Recusamos a agência que entrega criatividade sem método. E a que entrega método sem alma. A tese da HeadXperience.',
};

const PRINCIPLES = [
  {
    num: '01',
    statement: 'Forma é argumento.',
    gloss: 'O jeito como algo é dito também diz. Estética não é enfeite — é parte da prova.',
  },
  {
    num: '02',
    statement: 'Dado é matéria-prima, não troféu.',
    gloss: 'Ele entra no começo da conversa, não na última lâmina de resultados.',
  },
  {
    num: '03',
    statement: 'Método liberta, não engessa.',
    gloss: 'Restrição clara é o que deixa a criatividade ousar com segurança.',
  },
  {
    num: '04',
    statement: 'Estratégia sem execução é opinião.',
    gloss: 'Só prometemos aquilo que conseguimos fazer acontecer.',
  },
  {
    num: '05',
    statement: 'Marca é o que sobra quando a campanha acaba.',
    gloss: 'Trabalhamos para o que fica, não para o pico de uma semana.',
  },
];

function BlockLabel({ children }: { children: string }) {
  return (
    <EyebrowMono className="mb-8 block text-hx-gray-text">{children}</EyebrowMono>
  );
}

export default function ManifestoPage() {
  return (
    <>
      {/* HERO */}
      <Section variant="cream" className="pt-40">
        <Container>
          <EyebrowMono className="block">MANIFESTO HX</EyebrowMono>
          <h1 className="mt-8 max-w-5xl font-display text-[clamp(2.5rem,6vw,6rem)] font-semibold leading-[1.02] tracking-ed-tight">
            Recusamos a agência que entrega criatividade sem método. E a que
            entrega método sem alma.
          </h1>
        </Container>
      </Section>

      {/* CORPO */}
      <Section variant="paper">
        <Container tight>
          {/* BLOCO 1 — A NOSSA TESE */}
          <BlockLabel>A nossa tese</BlockLabel>
          <div className="space-y-8">
            <TextReveal>
              <p className="font-body text-ed-xl leading-relaxed">
                Existe um falso dilema no mercado: ou a marca é bonita, ou a
                marca funciona. Ou se entrega à intuição, ou se rende à
                planilha. Nós não acreditamos nessa escolha.
              </p>
            </TextReveal>
            <TextReveal>
              <p className="font-body text-ed-xl leading-relaxed">
                Criatividade com método não é um meio-termo morno entre as duas
                coisas. É a recusa de abrir mão de qualquer uma delas — forma e
                dado na mesma mesa, desde a primeira conversa.
              </p>
            </TextReveal>
            <TextReveal>
              <p className="font-body text-ed-xl leading-relaxed">
                Uma ideia que não se sustenta em evidência é sorte. Um número
                que não vira forma é relatório. O nosso trabalho vive no ponto
                onde os dois se obrigam a ser melhores.
              </p>
            </TextReveal>
          </div>

          <Rule className="my-24 md:my-32" />

          {/* PULL-QUOTE */}
          <ScrollReveal>
            <PullQuote className="max-w-3xl">
              Método não é o contrário de ousadia — é o que torna a ousadia
              repetível.
            </PullQuote>
          </ScrollReveal>

          <Rule className="my-24 md:my-32" />

          {/* BLOCO 2 — DE ONDE VIEMOS */}
          <BlockLabel>De onde viemos</BlockLabel>
          <div className="space-y-8">
            <ScrollReveal>
              <p className="font-body text-ed-xl leading-relaxed">
                Somos de Curitiba — e isso não é um detalhe de endereço. A
                cidade carrega o rigor de quem mede antes de afirmar: a
                disciplina do Vale do Pinhão, o hábito de tratar processo como
                matéria séria.
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <p className="font-body text-ed-xl leading-relaxed">
                Mas olhamos para fora. Para a ousadia que se faz na Faria Lima,
                para a coragem de marcas que arriscam significado. Vivemos nesse
                cruzamento — o rigor que a criatividade brasileira costuma
                terceirizar e a ambição que o método costuma reprimir.
              </p>
            </ScrollReveal>
          </div>

          <Rule className="my-24 md:my-32" />

          {/* BLOCO 3 — COMO PENSAMOS (5 princípios) */}
          <BlockLabel>Como pensamos</BlockLabel>
          <div>
            {PRINCIPLES.map((p, i) => (
              <div key={p.num}>
                {i > 0 && <Rule variant="soft" className="my-10 opacity-40" />}
                <ScrollReveal y={20}>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-[5rem_1fr] md:gap-10">
                    <span className="font-mono text-ed-sm text-hx-gray-text">
                      {p.num}
                    </span>
                    <div>
                      <p className="font-display text-[clamp(1.75rem,3.5vw,3rem)] font-medium leading-tight tracking-ed-tight">
                        {p.statement}
                      </p>
                      <p className="mt-3 max-w-xl font-body text-ed-base text-hx-gray-text">
                        {p.gloss}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>

          <Rule className="my-24 md:my-32" />

          {/* BLOCO 4 — O QUE PROMETEMOS */}
          <BlockLabel>O que prometemos</BlockLabel>
          <ScrollReveal>
            <p className="max-w-3xl font-body text-ed-xl leading-relaxed">
              Não prometemos paixão nem pressa. Prometemos clareza sobre o
              porquê de cada decisão, forma que aguenta ser olhada de perto e
              números que você pode conferir. Se a marca precisa existir com
              intenção — e continuar existindo depois — é com isso que a gente
              se importa.
            </p>
            <p className="mt-10 font-mono text-ed-sm uppercase tracking-ed-caps text-hx-ink">
              — Equipe HX, Curitiba
            </p>
          </ScrollReveal>
        </Container>
      </Section>

      {/* MARQUEE SUTIL */}
      <Marquee
        items={['ARTE', 'MÉTODO', 'DADO', 'FORMA', 'ALMA', 'CULTURA']}
        className="border-y border-hx-ink-border bg-hx-paper py-5"
        itemClassName="px-6 font-mono text-ed-sm uppercase tracking-ed-caps text-hx-gray-text"
      />

      {/* CTA FINAL */}
      <CTAFinal
        eyebrow="VAMOS CONVERSAR"
        headline="Se isso ressoa, vamos conversar."
        subtext="Sem formulário longo, sem proposta enrolada. Fale direto com o estúdio."
      />
    </>
  );
}
