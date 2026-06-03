import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

/**
 * Eyebrow editorial — label uppercase em JetBrains Mono com tracking aberto.
 * Use para identificar seções: "01 / MANIFESTO", "CASE Nº 002 / 2025".
 */
export function EyebrowMono({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-block font-mono text-ed-xs uppercase tracking-ed-caps',
        'text-hx-gray-text',
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
