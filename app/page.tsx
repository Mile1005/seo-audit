import { HeroSection } from "@/components/hero/hero-section"
import { TrustLogos } from "@/components/hero/trust-logos"
import { MainLayout } from "@/components/layout/main-layout"
import { generateSEOMeta, generateStructuredData, pageSEO } from "@/lib/seo"
import { LazyWrapper } from "@/components/performance/LazyWrapper"
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { headers } from 'next/headers'
import Head from 'next/head'
import { StructuredData, generateServiceSchema } from "@/components/seo/StructuredData"
import { CheckCircle, ArrowRight } from 'lucide-react'

// Optimized dynamic imports with better loading states
// Import our optimized skeletons
import { 
  FeaturesSkeleton, 
  DemoSkeleton, 
  TestimonialsSkeleton, 
  ROISkeleton, 
  PricingSkeleton 
} from "@/components/ui/skeletons"

// Above-the-fold components - Load immediately with minimal JS
const EmailCaptureInline = dynamic(() => 
  import("@/components/lead/email-capture-inline").then(mod => ({ default: mod.EmailCaptureInline })), 
  { 
    loading: () => <div className="h-16 bg-gray-900 dark:bg-gray-900 animate-pulse rounded" />
  }
)

// EMERGENCY: All below-the-fold components now load on interaction only
const DynamicFeaturesShowcase = dynamic(() => 
  import("@/components/dynamic/heavy-components").then(mod => ({ default: mod.DynamicFeaturesShowcase })), 
  {
    loading: () => <FeaturesSkeleton />
  }
)

const DynamicInteractiveDemo = dynamic(() => 
  import("@/components/dynamic/heavy-components").then(mod => ({ default: mod.DynamicInteractiveDemo })), 
  {
    loading: () => <DemoSkeleton />
  }
)

const DynamicTestimonialsCarousel = dynamic(() => 
  import("@/components/dynamic/heavy-components").then(mod => ({ default: mod.DynamicTestimonialsCarousel })), 
  {
    loading: () => <TestimonialsSkeleton />
  }
)

const DynamicROICalculator = dynamic(() => 
  import("@/components/dynamic/heavy-components").then(mod => ({ default: mod.DynamicROICalculator })), 
  {
    loading: () => <ROISkeleton />
  }
)

const DynamicPricingCards = dynamic(() => 
  import("@/components/dynamic/heavy-components").then(mod => ({ default: mod.DynamicPricingCards })), 
  {
    loading: () => <PricingSkeleton />
  }
)

// EMERGENCY: Load modals only when actually needed (not on page load)
const ExitIntentModal = dynamic(() => 
  import("@/components/lead/exit-intent-modal").then(mod => ({ default: mod.ExitIntentModal }))
)

const ContentGate = dynamic(() => 
  import("@/components/lead/content-gate").then(mod => ({ default: mod.ContentGate }))
)

// SEO metadata for the homepage - Force deployment
export const metadata: Metadata = generateSEOMeta(pageSEO.home)

// Structured data for the homepage
const structuredData = {
  website: generateStructuredData('website'),
  organization: generateStructuredData('organization'),
  product: generateStructuredData('product')
}

// Service schema for SEO audit service
const serviceSchema = generateServiceSchema({
  name: "AI-Powered SEO Audit Service",
  description: "Comprehensive AI-driven SEO analysis and optimization recommendations for websites. Our advanced algorithms analyze 100+ SEO factors to provide actionable insights for improving search rankings.",
  provider: "AISEOTurbo",
  serviceType: "SEO Audit & Analysis",
  areaServed: "Worldwide"
})

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
      <Head>
        <link rel="preload" href="/images/hero/hero-laptop-dashboard.svg" as="image" type="image/svg+xml" fetchPriority="high" />
      </Head>
      <HeroSection />
      <TrustLogos />
      
      {/* SEO-Optimized Content Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Why Choose Us Section - MOVED FIRST */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Why Choose AI SEO Turbo?
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Join thousands of businesses using our AI-powered platform to achieve measurable SEO success
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                  Advanced Technical SEO Analysis
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Our proprietary AI algorithms crawl your website just like Google does, identifying issues that traditional tools miss.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">47-Point Technical Audit covering all critical factors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">AI-Powered recommendations prioritized by impact</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">Competitor intelligence and market insights</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-2xl">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">300%</div>
                  <div className="text-slate-600 dark:text-slate-400 mb-6">Average traffic increase in 90 days</div>
                  <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">10,000+</div>
                  <div className="text-slate-600 dark:text-slate-400">Businesses optimized</div>
                </div>
              </div>
            </div>
          </div>

          {/* AI SEO Audit Tool That Delivers Results - MOVED SECOND */}
          <div className="mb-16">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                AI SEO Audit Tool That <span className="text-blue-600">Delivers Results</span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Stop guessing what hurts your SEO. Our AI-powered audit tool analyzes 47+ technical factors, 
                identifies critical issues, and provides actionable recommendations that actually move the needle.
              </p>
            </div>

            {/* Key Benefits Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <div className="text-center p-6 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">47-Point Analysis</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Comprehensive technical SEO audit covering every critical factor</p>
              </div>

              <div className="text-center p-6 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">AI-Powered</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Advanced algorithms that rival expert SEO consultants</p>
              </div>

              <div className="text-center p-6 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Actionable Fixes</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Prioritized recommendations that actually improve rankings</p>
              </div>

              <div className="text-center p-6 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Real Results</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Average 300% traffic increase in first 90 days</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-2xl mb-16">
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-2xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
                Real Results from Real Businesses
              </h3>
              <p className="text-blue-800 dark:text-blue-200 mb-6">
                A small business owner used our AI SEO audit to identify and fix 23 critical issues.
                Result: <span className="font-bold">340% increase in organic traffic within 90 days</span>,
                from solving mobile usability problems and improving site speed.
              </p>
              <a href="/case-studies" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                Read More Success Stories
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Professional Tools Section */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Expert-Grade SEO Tools for Professionals
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Whether you're a developer, SEO specialist, or business owner, we provide the tools you need to succeed.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">For Developers</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm">API integrations and technical reports that complement your workflow</p>
              </div>

              <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">For SEO Specialists</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Advanced competitor analysis and enterprise-scale monitoring</p>
              </div>

              <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">For Business Owners</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm">No SEO experience required - AI guides you to success</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* EMERGENCY: Lazy load all below-the-fold content */}
      <LazyWrapper fallback={<FeaturesSkeleton />} rootMargin="200px">
        <DynamicFeaturesShowcase />
      </LazyWrapper>
      
      <LazyWrapper fallback={<DemoSkeleton />} rootMargin="200px">
        <DynamicInteractiveDemo />
      </LazyWrapper>
      
      {/* Mid-page Email Capture - Keep lightweight */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4">
          <LazyWrapper fallback={<div className="h-16 animate-pulse bg-gray-800 rounded" />}>
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
          </LazyWrapper>
        </div>
      </section>

      <LazyWrapper fallback={<TestimonialsSkeleton />} rootMargin="200px">
        <DynamicTestimonialsCarousel />
      </LazyWrapper>
      
      {/* Content Gate Demo - Lazy load */}
      <LazyWrapper fallback={<div className="h-96 bg-slate-900 animate-pulse" />} rootMargin="200px">
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
      </LazyWrapper>

      <LazyWrapper fallback={<ROISkeleton />} rootMargin="200px">
        <DynamicROICalculator />
      </LazyWrapper>
      
      <LazyWrapper fallback={<PricingSkeleton />} rootMargin="200px">
        <DynamicPricingCards />
      </LazyWrapper>
      
      {/* Footer Email Capture - Lazy load */}
      <LazyWrapper fallback={<div className="h-32 bg-slate-900 animate-pulse" />} rootMargin="100px">
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
      </LazyWrapper>

      {/* EMERGENCY: Load modals only on user interaction */}
      <LazyWrapper fallback={null}>
        <ExitIntentModal isEnabled={true} />
      </LazyWrapper>

      {/* Structured Data - Keep inline for SEO */}
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
      
      {/* Service Schema */}
      <StructuredData data={serviceSchema} />
    </MainLayout>
  );
}
