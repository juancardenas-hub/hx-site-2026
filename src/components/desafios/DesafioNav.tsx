'use client';

import Link from 'next/link';
import { cn } from '@/lib/cn';
import { DESAFIOS } from '@/content/desafios';

/**
 * Sidebar sticky (desktop) com navegação entre os 4 desafios + link para o índice.
 * Estreita e em mono para não competir com o corpo de texto — apenas orienta.
 * Oculta no mobile (a hierarquia lá é o hero + header).
 */
export function DesafioNav({ current }: { current: string }) {
  return (
    <nav
      aria-label="Navegação entre desafios"
      className="hidden md:block md:sticky md:top-28"
    >
      <p className="font-mono text-ed-xs uppercase tracking-ed-caps text-hx-gray-text">
        Desafios
      </p>
      <ul className="mt-6 space-y-3">
        {DESAFIOS.map((d) => {
          const active = d.slug === current;
          return (
            <li key={d.slug}>
              <Link
                href={`/desafios/${d.slug}`}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex items-baseline gap-3 font-mono text-ed-xs uppercase tracking-ed-caps transition-colors duration-200',
                  active
                    ? 'text-hx-ink'
                    : 'text-hx-gray-text hover:text-hx-ink',
                )}
              >
                <span className={active ? 'text-hx-lime' : ''}>{d.num}</span>
                <span>{d.titulo}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <Link
        href="/desafios"
        className="mt-8 inline-block font-mono text-ed-xs uppercase tracking-ed-caps text-hx-gray-text underline-offset-4 transition-colors duration-200 hover:text-hx-ink hover:underline"
      >
        ← Todos os desafios
      </Link>
    </nav>
  );
}
