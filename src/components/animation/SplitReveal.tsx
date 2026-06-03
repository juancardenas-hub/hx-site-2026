'use client';

import { useRef, type ReactNode, type HTMLAttributes } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, SplitText } from '@/lib/gsap';

interface SplitRevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Type of split: by words (default) or by chars. */
  type?: 'words' | 'chars';
  /** Stagger between elements (seconds). Default 0.08. */
  stagger?: number;
  /** Duration per element (seconds). Default 0.6. */
  duration?: number;
  /** Y offset to start from (px). Default 40. */
  y?: number;
}

/**
 * SplitReveal — word/char stagger reveal usando GSAP SplitText (free desde abril/2025).
 * Padrão motionsites: stagger 0.08s, y 40→0, opacity 0→1, ease expo.out.
 */
export function SplitReveal({
  children,
  type = 'words',
  stagger = 0.08,
  duration = 0.6,
  y = 40,
  className,
  ...rest
}: SplitRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const split = new SplitText(ref.current, { type });
      const targets = type === 'words' ? split.words : split.chars;
      gsap.from(targets, {
        y,
        opacity: 0,
        stagger,
        duration,
        ease: 'expo.out',
      });

      return () => split.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  );
}
