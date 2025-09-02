import { HeroSection } from "@/components/hero/hero-section"
import { TrustLogos } from "@/components/hero/trust-logos"
import { MainLayout } from "@/components/layout/main-layout"
import { generateSEOMeta, generateStructuredData, pageSEO } from "@/lib/seo"
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { headers } from 'next/headers'

// Lazy load heavy components for better Core Web Vitals
const EmailCaptureInline = dynamic(() => import("@/components/lead/email-capture-inline").then(mod => ({ default: mod.EmailCaptureInline })), {
  loading: () => <div className="h-16 bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
})

const ExitIntentModal = dynamic(() => import("@/components/lead/exit-intent-modal").then(mod => ({ default: mod.ExitIntentModal })), {
  loading: () => <div className="h-8" />
})

const ContentGate = dynamic(() => import("@/components/lead/content-gate").then(mod => ({ default: mod.ContentGate })), {
  loading: () => <div className="h-8" />
})

// Heavy components
const DynamicFeaturesShowcase = dynamic(() => import("@/components/dynamic/heavy-components").then(mod => ({ default: mod.DynamicFeaturesShowcase })), {
  loading: () => <div className="h-64 bg-gray-50 dark:bg-gray-800 animate-pulse rounded-lg flex items-center justify-center"><span className="text-gray-400">Loading features...</span></div>
})

const DynamicInteractiveDemo = dynamic(() => import("@/components/dynamic/heavy-components").then(mod => ({ default: mod.DynamicInteractiveDemo })), {
  loading: () => <div className="h-96 bg-gray-50 dark:bg-gray-800 animate-pulse rounded-lg flex items-center justify-center"><span className="text-gray-400">Loading demo...</span></div>
})

const DynamicTestimonialsCarousel = dynamic(() => import("@/components/dynamic/heavy-components").then(mod => ({ default: mod.DynamicTestimonialsCarousel })), {
  loading: () => <div className="h-48 bg-gray-50 animate-pulse rounded-lg flex items-center justify-center"><span className="text-gray-400">Loading testimonials...</span></div>
})

const DynamicROICalculator = dynamic(() => import("@/components/dynamic/heavy-components").then(mod => ({ default: mod.DynamicROICalculator })), {
  loading: () => <div className="h-80 bg-gray-50 animate-pulse rounded-lg flex items-center justify-center"><span className="text-gray-400">Loading calculator...</span></div>
})

const DynamicPricingCards = dynamic(() => import("@/components/dynamic/heavy-components").then(mod => ({ default: mod.DynamicPricingCards })), {
  loading: () => <div className="h-64 bg-gray-50 animate-pulse rounded-lg flex items-center justify-center"><span className="text-gray-400">Loading pricing...</span></div>
})

// SEO metadata for the homepage
export const metadata: Metadata = generateSEOMeta(pageSEO.home)

// Structured data for the homepage
const structuredData = {
  website: generateStructuredData('website'),
  organization: generateStructuredData('organization'),
  product: generateStructuredData('product')
}

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
    <MainLayout>
      <HeroSection />
      <TrustLogos />
      <DynamicFeaturesShowcase />
      <DynamicInteractiveDemo />
      
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

      <DynamicTestimonialsCarousel />
      
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

      <DynamicROICalculator />
      <DynamicPricingCards />
      
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

      {/* Structured Data */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            structuredData.website,
            structuredData.organization,
            structuredData.product
          ])
        }}
      />
    </MainLayout>
  );
}
