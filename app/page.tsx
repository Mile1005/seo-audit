import { HeroSection } from "@/components/hero/hero-section"
import { TrustLogos } from "@/components/hero/trust-logos"
import { FeaturesShowcase } from "@/components/features/features-showcase"
import { InteractiveDemo } from "@/components/demo/interactive-demo"
import { TestimonialsCarousel } from "@/components/testimonials/testimonials-carousel"
import { ROICalculator } from "@/components/pricing/roi-calculator"
import { PricingCards } from "@/components/pricing/pricing-cards"
import { EmailCaptureInline } from "@/components/lead/email-capture-inline"
import { ExitIntentModal } from "@/components/lead/exit-intent-modal"
import { ContentGate } from "@/components/lead/content-gate"

export default function Home() {
  // Sample content for the content gate
  const sampleContent = {
    title: "47-Point SEO Audit Checklist",
    description: "The complete technical SEO checklist used by 1000+ websites to increase organic traffic by 40% in 90 days.",
    previewText: `This comprehensive checklist covers every aspect of technical SEO optimization:

    1. TECHNICAL FOUNDATION
    • Site crawlability and indexation
    • XML sitemaps optimization
    • Robots.txt configuration
    • URL structure analysis
    
    2. PAGE SPEED OPTIMIZATION  
    • Core Web Vitals assessment
    • Image compression and formats
    • CSS and JavaScript optimization
    • Server response time analysis
    
    3. MOBILE OPTIMIZATION
    • Mobile-first indexing readiness
    • Responsive design validation
    • Touch target sizing
    • Viewport configuration
    
    [Content continues below - unlock to see all 47 points...]`,
    fullContent: `This comprehensive checklist covers every aspect of technical SEO optimization:

    1. TECHNICAL FOUNDATION
    ✓ Site crawlability and indexation
    ✓ XML sitemaps optimization  
    ✓ Robots.txt configuration
    ✓ URL structure analysis
    ✓ Internal linking strategy
    ✓ Canonical tags implementation
    ✓ Schema markup validation
    ✓ HTTPS implementation
    ✓ Redirect chain analysis
    ✓ 404 error identification
    
    2. PAGE SPEED OPTIMIZATION (10 points)
    ✓ Core Web Vitals assessment
    ✓ Image compression and formats
    ✓ CSS and JavaScript optimization
    ✓ Server response time analysis
    ✓ Browser caching configuration
    ✓ CDN implementation
    ✓ Lazy loading setup
    ✓ Font optimization
    ✓ Third-party script audit
    ✓ Database optimization
    
    3. MOBILE OPTIMIZATION (8 points)
    ✓ Mobile-first indexing readiness
    ✓ Responsive design validation
    ✓ Touch target sizing
    ✓ Viewport configuration
    ✓ Mobile page speed
    ✓ App store optimization
    ✓ AMP implementation
    ✓ Mobile usability testing
    
    4. CONTENT OPTIMIZATION (12 points)
    ✓ Title tag optimization
    ✓ Meta description crafting
    ✓ Header tag structure
    ✓ Keyword density analysis
    ✓ Content length optimization
    ✓ Readability assessment
    ✓ Internal linking strategy
    ✓ Image alt text optimization
    ✓ Content freshness audit
    ✓ Duplicate content check
    ✓ Featured snippet optimization
    ✓ Video SEO optimization
    
    5. LOCAL SEO ESSENTIALS (7 points)
    ✓ Google Business Profile optimization
    ✓ NAP consistency audit
    ✓ Local keyword targeting
    ✓ Customer review management
    ✓ Local schema markup
    ✓ Local link building
    ✓ Location page optimization
    
    Use this checklist to systematically improve your website's SEO performance and drive more organic traffic.`,
    type: 'checklist' as const,
    downloadUrl: '/downloads/seo-checklist.pdf'
  }

  return (
    <main className="min-h-screen">
      <HeroSection />
      <TrustLogos />
      <FeaturesShowcase />
      <InteractiveDemo />
      
      {/* Mid-page Email Capture */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4">
          <EmailCaptureInline
            source="mid-page"
            variant="accent"
            className="max-w-lg mx-auto"
            offer={{
              title: "Free SEO Checklist",
              description: "47 proven optimization points",
              icon: <div className="text-blue-400">📋</div>
            }}
          />
        </div>
      </section>

      <TestimonialsCarousel />
      
      {/* Content Gate Demo */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Exclusive
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Premium Content
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Unlock our most comprehensive SEO resources with your email
            </p>
          </div>
          
          <ContentGate content={sampleContent} />
        </div>
      </section>

      <ROICalculator />
      <PricingCards />
      
      {/* Footer Email Capture */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <EmailCaptureInline
            source="footer"
            title="Don't Miss SEO Updates"
            description="Join 10,000+ marketers getting weekly SEO insights and tips"
            ctaText="Subscribe Now"
            variant="minimal"
            className="max-w-2xl mx-auto"
          />
        </div>
      </section>

      {/* Exit Intent Modal */}
      <ExitIntentModal isEnabled={true} />
    </main>
  );
}
