import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { EyebrowMono } from '@/components/ui/EyebrowMono';
import { Rule } from '@/components/ui/Rule';
import { CountUp } from '@/components/ui/CountUp';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { MethodStep, type MethodStepData } from '@/components/metodo/MethodStep';

export const metadata: Metadata = {
  title: 'Método',
  description:
    'Criatividade com método. Não é slogan — é processo. As 5 etapas da HeadXperience, da descoberta à otimização.',
};

const STEPS: MethodStepData[] = [
  {
    num: '01',
    title: 'Descobrir',
    objetivo:
      'Entender o problema antes de propor qualquer solução. Imersão em negócio, mercado, marca e dado.',
    entregas: ['Briefing reverso', 'Auditoria de marca', 'Leitura de concorrência', 'Hipóteses iniciais'],
    duracao: '1–2 semanas',
  },
  {
    num: '02',
    title: 'Definir',
    objetivo:
      'Transformar a descoberta em direção. Posicionamento, território e critérios de decisão no papel.',
    entregas: ['Posicionamento', 'Território criativo', 'Metas e métricas', 'Plataforma de marca'],
    duracao: '1–2 semanas',
  },
  {
    num: '03',
    title: 'Criar',
    objetivo:
      'Dar forma à direção. Identidade, narrativa e peças — cada escolha com rationale por trás.',
    entregas: ['Identidade visual', 'Sistema de design', 'Narrativa e tom', 'Peças-chave'],
    duracao: '3–6 semanas',
  },
  {
    num: '04',
    title: 'Ativar',
    objetivo:
      'Colocar a marca no mundo. Lançamento, mídia e conteúdo conectados ao objetivo, não soltos.',
    entregas: ['Plano de ativação', 'Produção', 'Mídia paga e orgânica', 'Kit de lançamento'],
    duracao: '2–4 semanas',
  },
  {
    num: '05',
    title: 'Otimizar',
    objetivo:
      'Ler o que o mundo respondeu e ajustar. O dado de hoje é a próxima decisão criativa.',
    entregas: ['Leitura de performance', 'Recomendações', 'Iteração', 'Relatório de aprendizado'],
    duracao: 'contínuo',
  },
];

const SEM_METODO = [
  'Ideias que dependem de sorte',
  'Retrabalho a cada troca de opinião',
  'Resultado que ninguém sabe explicar',
  'Marca que muda de cara toda campanha',
];

const COM_METODO = [
  'Decisão com rationale, não achismo',
  'Escopo claro do início ao fim',
  'Resultado que se mede e se repete',
  'Marca coerente ao longo do tempo',
];

const STATS = [
  { to: 3.2, decimals: 1, suffix: 'x', label: 'Mais consistência quando arte e dado andam juntos' },
  { to: 100, suffix: '%', label: 'Decisões criativas com rationale registrado' },
  { to: 5, prefix: '0', label: 'Etapas — nenhuma pulada' },
  { to: 14, label: 'Dias até o primeiro artefato verificável' },
];

const TOOLS = [
  'Figma',
  'Adobe CC',
  'After Effects',
  'Notion',
  'GA4',
  'Looker Studio',
  'Meta Ads',
  'Google Ads',
  'Webflow',
  'Hotjar',
];

const MODELOS = [
  {
    nome: 'Projeto',
    desc: 'Escopo fechado, com começo e fim definidos.',
    tempo: '4–12 semanas',
    indicado: 'Um lançamento, um reposicionamento ou uma identidade pontual.',
  },
  {
    nome: 'Partnership',
    desc: 'Um time de marca acoplado ao seu, mês a mês.',
    tempo: 'A partir de 6 meses',
    indicado: 'Quem precisa de ritmo contínuo de criação e leitura de dado.',
  },
  {
    nome: 'Sprint',
    desc: 'Imersão curta e intensa para destravar uma decisão.',
    tempo: '1–2 semanas',
    indicado: 'Quando falta clareza antes de investir grande.',
  },
];

export default function MetodoPage() {
  return (
    <>
      {/* HERO */}
      <Section variant="paper" className="pt-40">
        <Container>
          <EyebrowMono className="block">MÉTODO HX</EyebrowMono>
          <h1 className="mt-8 max-w-4xl font-display text-[clamp(2.5rem,6vw,6rem)] font-semibold leading-[1.02] tracking-ed-tight">
            Criatividade com método. Não é slogan — é processo.
          </h1>
          <p className="mt-8 max-w-2xl font-body text-ed-xl leading-relaxed text-hx-gray-text">
            Toda decisão criativa passa por cinco etapas. Toda etapa entrega
            artefatos verificáveis. Sem isso, é sorte.
          </p>
        </Container>
      </Section>

      {/* 5 ETAPAS — ZIG-ZAG */}
      <Section variant="paper-lite">
        <Container>
          <div className="space-y-24 md:space-y-32">
            {STEPS.map((step, i) => (
              <MethodStep
                key={step.num}
                {...step}
                align={i % 2 === 0 ? 'left' : 'right'}
                first={i === 0}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* POR QUE MÉTODO IMPORTA — 2 COLUNAS */}
      <Section variant="paper">
        <Container>
          <EyebrowMono className="block">Por que método importa</EyebrowMono>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <p className="font-mono text-ed-sm uppercase tracking-ed-caps text-hx-gray-text">
                Sem método
              </p>
              <ul className="mt-6 space-y-4">
                {SEM_METODO.map((item) => (
                  <li
                    key={item}
                    className="border-t border-hx-ink-border pt-4 font-body text-ed-lg text-hx-gray-text"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-ed-sm uppercase tracking-ed-caps text-hx-ink">
                Com método
              </p>
              <ul className="mt-6 space-y-4">
                {COM_METODO.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 border-t border-hx-ink pt-4 font-body text-ed-lg"
                  >
                    <span className="text-hx-lime">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* STATS — lime sobre ink */}
      <Section variant="ink">
        <Container>
          <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="pr-6">
                <CountUp
                  to={s.to}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  decimals={s.decimals}
                  className="font-display text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-none tracking-ed-tight text-hx-lime"
                />
                <p className="mt-4 max-w-[18ch] font-mono text-ed-xs uppercase tracking-ed-caps text-hx-gray-soft">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FERRAMENTAS */}
      <Section variant="paper-lite" compact>
        <Container>
          <EyebrowMono className="block">Ferramentas</EyebrowMono>
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 md:grid-cols-5">
            {TOOLS.map((t) => (
              <span
                key={t}
                className="font-mono text-ed-sm uppercase tracking-ed-caps text-hx-gray-soft transition-colors duration-300 hover:text-hx-lime"
              >
                {t}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      {/* COMO CONTRATAMOS — 3 MODELOS (altura igual) */}
      <Section variant="paper">
        <Container>
          <EyebrowMono className="block">Como contratamos</EyebrowMono>
          <div className="mt-12 grid grid-cols-1 gap-px md:grid-cols-3">
            {MODELOS.map((m) => (
              <div
                key={m.nome}
                className="flex h-full flex-col border-t border-hx-ink px-1 pt-6"
              >
                <h3 className="font-display text-ed-2xl leading-tight tracking-ed-tight">
                  {m.nome}
                </h3>
                <p className="mt-4 font-body text-ed-base leading-relaxed text-hx-gray-text">
                  {m.desc}
                </p>
                <div className="mt-auto pt-8">
                  <p className="font-mono text-ed-xs uppercase tracking-ed-caps text-hx-ink">
                    {m.tempo}
                  </p>
                  <p className="mt-2 font-mono text-ed-xs uppercase tracking-ed-caps leading-relaxed text-hx-gray-text">
                    {m.indicado}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Rule />

      {/* CTA → TRABALHOS */}
      <Section variant="paper">
        <Container>
          <ScrollReveal>
            <h2 className="max-w-3xl font-display text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-ed-tight">
              Quer ver o método aplicado?
            </h2>
          </ScrollReveal>
          <Link
            href="/trabalhos"
            className="group mt-10 inline-flex items-center gap-3 bg-hx-lime px-8 py-4 font-mono text-ed-xs uppercase tracking-ed-caps text-hx-ink transition-colors duration-300 ease-out hover:bg-hx-ink hover:text-hx-lime"
          >
            <span>Ver trabalhos</span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </Container>
      </Section>
    </>
  );
}
