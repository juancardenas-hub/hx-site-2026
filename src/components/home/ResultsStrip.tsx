import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { CountUp } from '@/components/ui/CountUp';

interface StatData {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}

// Placeholders editoriais — viram conteúdo de CMS no Prompt 11.
const STATS: StatData[] = [
  { to: 4, prefix: '0', label: 'Frentes de atuação' },
  { to: 40, prefix: '+', label: 'Marcas atendidas' },
  { to: 5, prefix: '0', label: 'Etapas do método' },
  { to: 100, suffix: '%', label: 'Projetos com método' },
];

export function ResultsStrip() {
  return (
    <Section variant="paper-lite" compact aria-label="Resultados em números">
      <Container>
        <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="border-l border-hx-ink-border pl-6">
              <CountUp
                to={s.to}
                prefix={s.prefix}
                suffix={s.suffix}
                decimals={s.decimals}
                className="font-display text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-none tracking-ed-tight"
              />
              <p className="mt-4 font-mono text-ed-xs uppercase tracking-ed-caps text-hx-gray-text">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
