import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Tighten container width (default false = 1440px max) */
  tight?: boolean;
}

/**
 * Container editorial — max-w-[1440px] com padding lateral responsivo.
 * Use como wrapper de toda seção do site.
 */
export function Container({
  tight = false,
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-6 md:px-12',
        tight ? 'max-w-[960px]' : 'max-w-[1440px]',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
