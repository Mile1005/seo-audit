import { HeroSection } from "@/components/hero/hero-section"
import { TrustLogos } from "@/components/hero/trust-logos"
import { FeaturesShowcase } from "@/components/features/features-showcase"
import { InteractiveDemo } from "@/components/demo/interactive-demo"
import { TestimonialsCarousel } from "@/components/testimonials/testimonials-carousel"
import { ROICalculator } from "@/components/pricing/roi-calculator"
import { PricingCards } from "@/components/pricing/pricing-cards"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <TrustLogos />
      <FeaturesShowcase />
      <InteractiveDemo />
      <TestimonialsCarousel />
      <ROICalculator />
      <PricingCards />
      
      {/* TODO: Add remaining sections in future phases */}
      <div className="h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <h2 className="text-2xl font-bold mb-4">Phase 5 Coming Soon</h2>
          <p>Final CTAs and footer will be added next.</p>
        </div>
      </div>
    </main>
  );
}
