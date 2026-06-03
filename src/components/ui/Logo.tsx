import { type SVGProps } from 'react';
import { cn } from '@/lib/cn';

interface LogoProps extends SVGProps<SVGSVGElement> {
  /** Texto acessível do logo (vira aria-label) */
  title?: string;
}

/**
 * Monograma oficial HX (H + X geométrico).
 * Path único recolorável via `currentColor` — funciona tanto em ink (header)
 * quanto em paper/lime (footer), bastando definir a cor do texto no pai.
 * Asset-fonte: public/brand/hx-monogram.svg (viewBox 2350.07 × 934).
 */
export function Logo({ title = 'HeadXperience', className, ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 2350.07 934"
      role="img"
      aria-label={title}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('block h-auto w-auto', className)}
      {...props}
    >
      <path d="M183.01.5c1.6,112.72,1.8,226.47-.12,339.38-7.3,54.53-47.57,78.45-80.92,116.12l34.67,35.43c28.33-23.93,48.76-56.28,84.84-69.95,10.62-4.03,21.78-6.42,33.04-7.96h705.49V.5h184v933h-184l-.05-331.55c3.37-58.32,45.61-85.53,81.98-124.09l-35.43-35.4c-27,22.57-46.72,53.45-80.14,67.89-13.77,5.95-27.92,8.8-42.87,10.13H184s0,413.01,0,413.01H0V.5s183,0,183,0Z" />
      <path d="M1188.49.5l165.26.24,347.26,289.74c33.17,34.26,36.81,77.3,34.49,123.01h50c1.59-36.45-4.71-75.18,7.25-110.25,6.61-19.37,17.09-33.43,30.72-48.28L2072.99.5h259.5l-505.03,519.5,503.03,413.5h-165l-337.47-282.03c-20.7-18.08-35.58-41.71-41.06-68.94-4.11-20.4-1.94-41.34-2.47-62.03h-49c-.7,54.74,8.15,105.65-30.49,150.01-32.4,37.2-72.7,74.8-107.49,110.51-49.61,50.92-100.08,100.88-149.03,152.47h-259l505-519.47L1188.49.5Z" />
    </svg>
  );
}
