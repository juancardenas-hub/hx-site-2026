import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Background variant matching brand palette */
  variant?: 'paper' | 'paper-lite' | 'cream' | 'ink' | 'lime';
  /** Reduce vertical padding for compact sections */
  compact?: boolean;
}

const variantStyles: Record<NonNullable<SectionProps['variant']>, string> = {
  paper: 'bg-hx-paper text-hx-ink',
  'paper-lite': 'bg-hx-paper-lite text-hx-ink',
  cream: 'bg-hx-cream text-hx-ink',
  ink: 'bg-hx-ink text-hx-paper',
  lime: 'bg-hx-lime text-hx-ink',
};

/**
 * Seção editorial semântica com padding vertical generoso.
 * Use sempre em vez de <section> cru para garantir respiro consistente.
 */
export function Section({
  variant = 'paper',
  compact = false,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      className={cn(
        variantStyles[variant],
        compact ? 'py-16 md:py-20' : 'py-24 md:py-32',
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
}
