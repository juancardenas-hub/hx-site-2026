'use client';

import { useRef, type HTMLAttributes, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

interface BlurInProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Delay before animation starts (seconds). Default 0. */
  delay?: number;
  /** Duration of the animation (seconds). Default 0.6. */
  duration?: number;
  /** Y offset to start from (px). Default 20. */
  y?: number;
}

/**
 * BlurIn (motionsites-equivalent in GSAP).
 * Anima: opacity 0→1, filter: blur(10px)→blur(0), y: 20→0.
 * Respeita prefers-reduced-motion via globals.css.
 */
export function BlurIn({
  children,
  delay = 0,
  duration = 0.6,
  y = 20,
  className,
  ...rest
}: BlurInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.from(ref.current, {
        opacity: 0,
        filter: 'blur(10px)',
        y,
        duration,
        delay,
        ease: 'power3.out',
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  );
}
