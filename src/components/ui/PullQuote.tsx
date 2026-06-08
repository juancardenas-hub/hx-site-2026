import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

/**
 * Pull-quote editorial reutilizável — Fraunces italic, peso leve.
 * Use para destacar uma frase-âncora dentro de texto corrido.
 */
export function PullQuote({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-light italic leading-snug tracking-ed-tight',
        className,
      )}
      {...rest}
    >
      {children}
    </p>
  );
}
