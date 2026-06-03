import { EyebrowMono } from '@/components/ui/EyebrowMono';

/**
 * Placeholder da home. O hero brutalist entra no Prompt 04.
 * Mantido alto (min-h-screen) para validar o comportamento sticky do Header
 * e a transição transparente → paper/95 ao rolar.
 */
export default function Home() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <EyebrowMono>01 / HEADXPERIENCE — CREATIVE AGENCY — CURITIBA / PR</EyebrowMono>
      <h1 className="mt-6 font-display text-ed-3xl tracking-ed-tight">
        Hero virá aqui
      </h1>
      <p className="mt-4 max-w-md font-body text-ed-lg text-hx-gray-text">
        Layout chrome (header + footer) em validação. Role para ver o header
        ganhar fundo paper e o rodapé com a marquee.
      </p>
    </section>
  );
}
