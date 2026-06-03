import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

interface RuleProps extends HTMLAttributes<HTMLHRElement> {
  variant?: 'ink' | 'lime' | 'soft';
}

const variantStyles: Record<NonNullable<RuleProps['variant']>, string> = {
  ink: 'border-hx-ink',
  lime: 'border-hx-lime',
  soft: 'border-hx-gray-soft',
};

/**
 * Linha editorial horizontal de 1px. Use para separar blocos editoriais.
 * Inspirada na rule horizontal do wordmark Swiss-editorial da HX.
 */
export function Rule({ variant = 'ink', className, ...rest }: RuleProps) {
  return (
    <hr
      className={cn('border-0 border-t', variantStyles[variant], className)}
      {...rest}
    />
  );
}
