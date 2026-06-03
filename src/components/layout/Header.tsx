'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/cn';
import { Logo } from '@/components/ui/Logo';

interface NavItem {
  label: string;
  href: string;
}

const NAV: NavItem[] = [
  { label: 'Início', href: '/' },
  { label: 'Trabalhos', href: '/trabalhos' },
  { label: 'Desafios', href: '/desafios' },
  { label: 'Método', href: '/metodo' },
  { label: 'Manifesto', href: '/manifesto' },
  { label: 'Estúdio', href: '/estudio' },
  { label: 'Contato', href: '/contato' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const headerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Sticky transparente → paper/95 + blur ao passar de 50px.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Timeline do mobile menu: slide-from-top do overlay + fade/stagger dos itens.
  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) return;
      const items = overlay.querySelectorAll<HTMLElement>('[data-menu-item]');

      // Estado inicial: overlay fora da tela (acima), itens invisíveis.
      gsap.set(overlay, { yPercent: -100 });
      gsap.set(items, { autoAlpha: 0, y: 24 });

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ paused: true });
        tl.to(overlay, { yPercent: 0, duration: 0.5, ease: 'power3.inOut' })
          .to(
            items,
            { autoAlpha: 1, y: 0, stagger: 0.06, duration: 0.4, ease: 'power2.out' },
            '-=0.15',
          );
        tlRef.current = tl;
        return () => {
          tlRef.current = null;
        };
      });

      // Reduced motion: sem slide nem stagger — estados finais imediatos.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        const tl = gsap.timeline({ paused: true });
        tl.to(overlay, { yPercent: 0, duration: 0 }).to(
          items,
          { autoAlpha: 1, y: 0, duration: 0 },
          0,
        );
        tlRef.current = tl;
        return () => {
          tlRef.current = null;
        };
      });

      return () => mm.revert();
    },
    { scope: headerRef },
  );

  // Play/reverse conforme abre/fecha + trava o scroll do body.
  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (open) {
      tl.timeScale(1).play();
      document.body.style.overflow = 'hidden';
    } else {
      tl.timeScale(1.5).reverse();
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-out',
        scrolled
          ? 'bg-hx-paper/95 backdrop-blur-md'
          : 'bg-transparent backdrop-blur-0',
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between px-6 md:px-12">
        {/* LOGO */}
        <Link
          href="/"
          aria-label="HeadXperience — página inicial"
          className="relative z-[70] text-hx-ink transition-opacity duration-300 hover:opacity-70"
        >
          <Logo className="h-7" title="HeadXperience" />
        </Link>

        {/* NAV DESKTOP */}
        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => {
              const active =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'font-mono text-ed-xs uppercase tracking-ed-caps transition-colors duration-200',
                      active
                        ? 'text-hx-ink'
                        : 'text-hx-gray-text hover:text-hx-ink',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* HAMBURGER (mobile) */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          className="relative z-[70] flex h-10 w-10 flex-col items-center justify-center gap-[7px] lg:hidden"
        >
          <span
            className={cn(
              'block h-px w-7 origin-center transition-all duration-300 ease-out',
              open ? 'translate-y-[4px] rotate-45 bg-hx-paper' : 'bg-hx-ink',
            )}
          />
          <span
            className={cn(
              'block h-px w-7 origin-center transition-all duration-300 ease-out',
              open ? '-translate-y-[4px] -rotate-45 bg-hx-paper' : 'bg-hx-ink',
            )}
          />
        </button>
      </div>

      {/* MOBILE MENU FULLSCREEN */}
      <div
        id="mobile-menu"
        ref={overlayRef}
        inert={!open}
        aria-hidden={!open}
        className="fixed inset-0 z-[60] flex flex-col justify-center bg-hx-ink px-6 lg:hidden"
      >
        <nav aria-label="Navegação principal (mobile)">
          <ul className="flex flex-col gap-2">
            {NAV.map((item, i) => (
              <li key={item.href} data-menu-item>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-4 py-1 text-hx-paper"
                >
                  <span className="font-mono text-ed-xs text-hx-gray-soft">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-ed-2xl tracking-ed-tight transition-colors duration-200 group-hover:text-hx-lime">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div data-menu-item className="mt-16 border-t border-hx-ink-border pt-8">
          <p className="font-mono text-ed-xs uppercase tracking-ed-caps text-hx-gray-soft">
            HeadXperience — Curitiba / PR
          </p>
          <a
            href="mailto:contato@headxperience.com"
            className="mt-2 inline-block font-body text-ed-base text-hx-paper transition-colors hover:text-hx-lime"
          >
            contato@headxperience.com
          </a>
        </div>
      </div>
    </header>
  );
}
