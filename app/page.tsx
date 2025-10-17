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
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              AI SEO Audit Tool That <span className="text-blue-600">Delivers Results</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Stop guessing what hurts your SEO. Our AI-powered audit tool analyzes 47+ technical factors, 
              identifies critical issues, and provides actionable recommendations that actually move the needle.
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert mx-auto">
            <h2>Why Choose AI SEO Turbo for Your Website Optimization?</h2>
            <p>
              As a web developer or SEO professional, you know that manual SEO audits are time-consuming and often miss critical issues. 
              Our AI SEO audit tool changes everything by automating the analysis process while providing expert-level insights 
              that rival the best SEO consultants.
            </p>

            <h3>Advanced Technical SEO Analysis</h3>
            <p>
              Our proprietary AI algorithms crawl your website just like Google does, identifying issues that traditional tools miss. 
              From Core Web Vitals optimization to schema markup validation, we cover every aspect of technical SEO that impacts rankings.
            </p>
            <ul>
              <li><strong>47-Point Technical Audit:</strong> Comprehensive analysis covering crawlability, indexation, and performance</li>
              <li><strong>AI-Powered Recommendations:</strong> Actionable fixes prioritized by impact on search rankings</li>
              <li><strong>Competitor Intelligence:</strong> See what your competitors are doing right (and wrong)</li>
              <li><strong>Real-Time Monitoring:</strong> Track improvements and catch new issues before they hurt rankings</li>
            </ul>

            <h3>Proven Results for Real Businesses</h3>
            <p>
              Don't just take our word for it. Our platform has helped thousands of businesses achieve measurable SEO success:
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg my-8">
              <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2">Case Study: E-commerce Growth</h4>
              <p className="text-blue-700 dark:text-blue-300 mb-4">
                A small business owner used our AI SEO audit to identify and fix 23 critical issues. 
                Result: 340% increase in organic traffic within 90 days, from solving mobile usability problems and improving site speed.
              </p>
              <a href="/case-studies" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                Read More Success Stories →
              </a>
            </div>

            <h3>Expert-Grade SEO Tools Built for Professionals</h3>
            <p>
              Whether you're a freelance web developer optimizing client sites, an in-house SEO specialist managing enterprise campaigns, 
              or a small business owner handling your own digital marketing, AI SEO Turbo provides the professional-grade tools you need.
            </p>

            <h4>For Web Developers:</h4>
            <p>
              Get technical SEO insights that complement your development workflow. Our API integrations and detailed technical reports 
              help you deliver better results to clients while reducing audit time by 80%.
            </p>

            <h4>For SEO Professionals:</h4>
            <p>
              Access advanced competitor analysis, keyword tracking, and backlink monitoring that scales with your agency's needs. 
              White-label reporting and team collaboration features make client management effortless.
            </p>

            <h4>For Small Business Owners:</h4>
            <p>
              No SEO experience required. Our AI assistant guides you through optimization with plain-English explanations and 
              step-by-step action plans that anyone can follow.
            </p>

            <h3>Start Your SEO Success Story Today</h3>
            <p>
              Join over 10,000 marketers, developers, and business owners who trust AI SEO Turbo to optimize their websites. 
              Our platform combines cutting-edge AI technology with proven SEO methodologies to deliver results that matter.
            </p>
            <p>
              Ready to see what hidden SEO issues are holding back your rankings? 
              <a href="/demo" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Try our free demo</a> 
              or <a href="/dashboard/audit" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">run your first audit</a> today.
            </p>
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
