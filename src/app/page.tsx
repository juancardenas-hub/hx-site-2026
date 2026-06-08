import { Hero } from '@/components/home/Hero';
import { ResultsStrip } from '@/components/home/ResultsStrip';
import { Capabilities } from '@/components/home/Capabilities';
import { CasesPreview } from '@/components/home/CasesPreview';
import { ManifestoPreview } from '@/components/home/ManifestoPreview';
import { CTAFinal } from '@/components/home/CTAFinal';

export default function Home() {
  return (
    <>
      <Hero />
      <ResultsStrip />
      <Capabilities />
      <CasesPreview />
      <ManifestoPreview />
      <CTAFinal />
    </>
  );
}
