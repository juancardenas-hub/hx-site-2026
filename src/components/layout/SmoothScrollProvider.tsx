'use client';

import { type ReactNode } from 'react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

/**
 * Inicializa o smooth scroll (Lenis) uma única vez e sincroniza com ScrollTrigger.
 * O hook já respeita prefers-reduced-motion (desliga o lerp e usa scroll nativo).
 *
 * Lenis 1.x usa scroll real (não transform-wrap), então elementos `position: fixed`
 * como o Header continuam funcionando normalmente.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useSmoothScroll();
  return <>{children}</>;
}
