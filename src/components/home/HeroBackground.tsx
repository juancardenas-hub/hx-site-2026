'use client';

import { useSyncExternalStore } from 'react';
import dynamic from 'next/dynamic';

// Three/R3F só entram neste chunk dinâmico — nunca no bundle inicial.
// ssr:false garante que nada de WebGL roda no servidor nem no mobile fallback.
const ShaderField = dynamic(
  () => import('./ShaderField').then((m) => m.ShaderField),
  { ssr: false },
);

// Fundo estático sutil — paper + brisa de lime. É o que aparece no SSR e o
// fallback definitivo em mobile / pointer coarse / reduced-motion / sem WebGL.
const STATIC_BG =
  'radial-gradient(110% 75% at 82% 8%, rgba(214,237,105,0.10), transparent 55%), #f9f9f9';

const QUERIES = [
  '(prefers-reduced-motion: reduce)',
  '(max-width: 767px)',
  '(pointer: coarse)',
] as const;

let webglMemo: boolean | null = null;
function hasWebGL(): boolean {
  if (webglMemo !== null) return webglMemo;
  try {
    const c = document.createElement('canvas');
    webglMemo = !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    webglMemo = false;
  }
  return webglMemo;
}

// useSyncExternalStore: lê capacidade do browser sem setState-in-effect,
// SSR-safe (snapshot do servidor = false → fallback estático) e reativo
// a mudanças de viewport / preferência de movimento.
function subscribe(onChange: () => void) {
  const mqls = QUERIES.map((q) => window.matchMedia(q));
  mqls.forEach((m) => m.addEventListener('change', onChange));
  return () => mqls.forEach((m) => m.removeEventListener('change', onChange));
}

function getSnapshot(): boolean {
  const [reduce, small, coarse] = QUERIES.map((q) => window.matchMedia(q).matches);
  return !reduce && !small && !coarse && hasWebGL();
}

export function HeroBackground() {
  const useCanvas = useSyncExternalStore(subscribe, getSnapshot, () => false);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0" style={{ background: STATIC_BG }} />
      {useCanvas && <ShaderField />}
    </div>
  );
}
