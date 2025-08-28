import { HeroSection } from "@/components/hero/hero-section"
import { TrustLogos } from "@/components/hero/trust-logos"
import { FeaturesShowcase } from "@/components/features/features-showcase"
import { InteractiveDemo } from "@/components/demo/interactive-demo"
import { TestimonialsCarousel } from "@/components/testimonials/testimonials-carousel"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <TrustLogos />
      <FeaturesShowcase />
      <InteractiveDemo />
      <TestimonialsCarousel />
      
      {/* TODO: Add remaining sections in future phases */}
      <div className="h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <h2 className="text-2xl font-bold mb-4">Phase 4 Coming Soon</h2>
          <p>Pricing and additional sections will be added next.</p>
        </div>
      </div>
    </main>
  );
}
