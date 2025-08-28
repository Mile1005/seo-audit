import { HeroSection } from "@/components/hero/hero-section"
import { TrustLogos } from "@/components/hero/trust-logos"
import { FeaturesShowcase } from "@/components/features/features-showcase"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <TrustLogos />
      <FeaturesShowcase />
      
      {/* TODO: Add remaining sections in future phases */}
      <div className="h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <h2 className="text-2xl font-bold mb-4">Phase 3 Coming Soon</h2>
          <p>Interactive demo preview and pricing sections will be added next.</p>
        </div>
      </div>
    </main>
  );
}
