import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  // ASSINATURA HX: lime → ink, hover inverte para ink → lime
  primary: 'bg-hx-lime text-hx-ink hover:bg-hx-ink hover:text-hx-lime',
  // Outline editorial
  secondary:
    'border border-hx-ink text-hx-ink bg-transparent hover:bg-hx-ink hover:text-hx-paper',
  // Mínimo — só texto + chevron
  ghost: 'text-hx-ink bg-transparent hover:text-hx-lime',
};

/**
 * Botão HX — assinatura da marca: fundo lime, texto ink, chevron-right.
 * Hover inverte (ink + lime) — a única reversão cromática "permitida" no site.
 */
export function Button({
  variant = 'primary',
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center gap-3',
        'px-6 py-3 font-mono text-ed-xs uppercase tracking-ed-caps',
        'transition-colors duration-300 ease-out',
        'focus-visible:outline-none',
        variantStyles[variant],
        className,
      )}
      {...rest}
    >
      <span>{children}</span>
      <ChevronRight />
    </button>
  );
}

function ChevronRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
