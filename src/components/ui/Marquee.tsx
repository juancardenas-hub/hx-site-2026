'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/cn';

interface MarqueeProps {
  items: string[];
  /** Duração de um ciclo (s). Default 28. */
  duration?: number;
  className?: string;
  itemClassName?: string;
}

/**
 * Marquee horizontal infinita (translateX) com 2 grupos idênticos = loop sem
 * emenda. Respeita prefers-reduced-motion (estática). Separador × em lime.
 */
export function Marquee({
  items,
  duration = 28,
  className,
  itemClassName,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tween = gsap.to(track, {
          xPercent: -50,
          ease: 'none',
          duration,
          repeat: -1,
        });
        return () => tween.kill();
      });
      return () => mm.revert();
    },
    { scope: trackRef },
  );

  return (
    <div className={cn('overflow-hidden', className)} aria-hidden="true">
      <div ref={trackRef} className="flex w-max flex-nowrap">
        {[0, 1].map((group) => (
          <div key={group} className="flex flex-nowrap">
            {items.map((item, i) => (
              <span
                key={`${group}-${i}`}
                className={cn('whitespace-nowrap', itemClassName)}
              >
                {item}
                <span className="px-6 text-hx-lime">×</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
