import { Hero } from '@/components/home/Hero';
import { ResultsStrip } from '@/components/home/ResultsStrip';
import { Capabilities } from '@/components/home/Capabilities';
import { ManifestoPreview } from '@/components/home/ManifestoPreview';

export default function Home() {
  return (
    <>
      <Hero />
      <ResultsStrip />
      <Capabilities />
      {/* CasesPreview entra aqui no Prompt 05b */}
      <ManifestoPreview />
      {/* CTAFinal entra no Prompt 05b */}
    </>
  );
}
