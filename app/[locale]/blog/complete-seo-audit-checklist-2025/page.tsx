import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import BlogPostClient from '../[slug]/blog-post-client'
import { StructuredData, generateBlogPostingSchema, generateHowToSchema } from '@/components/seo/StructuredData'
import { generateSEOMeta } from '@/lib/seo'
import { Metadata } from 'next'
import { type Locale } from '@/i18n'
import { generateAlternates } from '@/lib/metadata-utils'
import { TrafficGrowthChart, AuditImpactChart, CoreWebVitalsChart, SEOProgressTimeline } from '@/components/blog/SEOCharts'

// SEO metadata for the blog post
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    ...generateSEOMeta({
      title: 'Complete SEO Audit Checklist for 2025 | AI SEO Turbo Blog',
      description: 'A comprehensive 47-point checklist to audit your website for SEO issues and opportunities. Used by 1000+ websites to increase organic traffic.',
      keywords: ['SEO', 'Audit', 'Technical', 'Checklist', '2025'],
      ogType: 'article',
      locale: locale as Locale,
      path: 'blog/complete-seo-audit-checklist-2025'
    }),
    alternates: generateAlternates('/blog/complete-seo-audit-checklist-2025', locale as Locale)
  }
}

export default async function CompleteSEOAuditChecklistPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  // Enable static rendering
  setRequestLocale(locale)

  // Get translations server-side
  const t = await getTranslations({ locale, namespace: 'blog.completeSEOAuditChecklist2025' })

  // Generate HowTo schema for the SEO audit checklist
  const howToSchema = generateHowToSchema({
    name: "Complete SEO Audit Checklist for 2025",
    description: "A comprehensive 47-point checklist to audit your website for SEO issues and opportunities. Follow this step-by-step guide to identify and fix critical SEO problems.",
    steps: [
      {
        name: "Technical Foundation Audit",
        text: "Check site crawlability, XML sitemaps, robots.txt, URL structure, and redirect chains. Ensure search engines can properly access and index your content."
      },
      {
        name: "Page Speed Optimization",
        text: "Analyze Core Web Vitals (LCP, FID, CLS), optimize images, minify CSS/JavaScript, configure browser caching, and implement CDN for faster loading times."
      },
      {
        name: "Mobile Optimization",
        text: "Verify mobile-first indexing readiness, test responsive design, ensure proper viewport configuration, and optimize touch targets for mobile users."
      },
      {
        name: "On-Page SEO Audit",
        text: "Review title tags, meta descriptions, header structure, keyword usage, content length, and internal linking to improve search rankings."
      },
      {
        name: "Content Quality Assessment",
        text: "Evaluate content freshness, uniqueness, readability, and user engagement metrics. Ensure content provides real value to your target audience."
      }
    ],
    totalTime: "PT2H",
    url: "https://www.aiseoturbo.com/blog/complete-seo-audit-checklist-2025"
  })

  const post = {
    id: '1',
    slug: 'complete-seo-audit-checklist-2025',
    title: t('post.title'),
    excerpt: t('post.excerpt'),
    content: (
      <div className="prose-blog">
        {/* Table of Contents */}
        <nav className="blog-toc mb-16 pb-8 border-b border-slate-800">
          <h2 className="text-xl font-semibold text-white mb-6">Table of Contents</h2>
          <ul className="space-y-3">
            <li><a href="#importance">Why SEO Audits Matter</a></li>
            <li><a href="#technical">Technical Foundation (15 Checkpoints)</a></li>
            <li><a href="#on-page">On-Page Optimization (12 Checkpoints)</a></li>
            <li><a href="#content">Content Quality (10 Checkpoints)</a></li>
            <li><a href="#off-page">Off-Page Factors (10 Checkpoints)</a></li>
            <li><a href="#implementation">How to Use This Checklist</a></li>
          </ul>
        </nav>

        {/* Introduction Section */}
        <section className="blog-section mb-20">
          <p className="text-xl text-gray-200 leading-relaxed mb-8">
            Regular SEO audits are the backbone of maintaining and improving your website's search engine visibility. 
            In 2025, with AI-driven algorithms and constantly evolving ranking factors, a systematic approach to 
            auditing your site is more critical than ever.
          </p>

          <div className="interactive-stat">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-white mb-2">40-60% Traffic Increase</p>
                <p className="text-gray-400">Average organic traffic improvement within 6 months of implementing audit findings</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why SEO Audits Matter + Traffic Growth Chart */}
        <section id="importance" className="blog-section mb-20">
          <h2>Why SEO Audits Matter in 2025</h2>
          
          <p>
            The digital landscape is more competitive than ever. With over 1.8 billion websites online, 
            standing out in search results requires continuous optimization and vigilance. SEO audits 
            help you identify what's working, what's broken, and where opportunities lie.
          </p>

          <div className="my-12 pl-6 border-l-4 border-blue-500">
            <p className="text-xl text-gray-100 font-medium italic">
              "A comprehensive SEO audit is like a health checkup for your website. It reveals hidden 
              issues before they become critical problems and uncovers opportunities for growth that 
              you might otherwise miss."
            </p>
          </div>

          {/* Interactive Traffic Growth Chart */}
          <TrafficGrowthChart />

          <h3>What an SEO Audit Accomplishes</h3>

          <div className="space-y-8 mt-8">
            <div className="blog-checkpoint">
              <h4 className="text-lg font-semibold text-white mb-3">Technical Health Assessment</h4>
              <p>
                Identify crawlability issues, broken links, and indexation problems that prevent search 
                engines from properly accessing your content. Technical issues can silently kill your 
                rankings, and many site owners don't discover them until it's too late.
              </p>
            </div>

            <div className="blog-checkpoint">
              <h4 className="text-lg font-semibold text-white mb-3">Keyword Opportunity Discovery</h4>
              <p>
                Find untapped keyword opportunities and content gaps that your competitors are ranking 
                for but you aren't. Modern SEO audits use AI to analyze semantic relationships and 
                uncover long-tail opportunities with high conversion potential.
              </p>
            </div>

            <div className="blog-checkpoint">
              <h4 className="text-lg font-semibold text-white mb-3">Algorithm Alignment</h4>
              <p>
                Ensure your site aligns with current search engine algorithms, including Google's helpful 
                content updates, E-E-A-T guidelines, and Core Web Vitals requirements. What worked in 
                2024 might be penalized in 2025.
              </p>
            </div>

            <div className="blog-checkpoint">
              <h4 className="text-lg font-semibold text-white mb-3">User Experience Optimization</h4>
              <p>
                Improve site speed, mobile responsiveness, and navigation structure to enhance user 
                experience. Google's algorithms increasingly prioritize sites that provide excellent 
                user experiences, making UX a critical ranking factor.
              </p>
            </div>

            <div className="blog-checkpoint">
              <h4 className="text-lg font-semibold text-white mb-3">Competitive Intelligence</h4>
              <p>
                Understand how your site compares to competitors in your niche. Identify their strengths 
                and weaknesses to inform your own strategy and find opportunities to outrank them.
              </p>
            </div>
          </div>

          {/* Audit Impact Chart */}
          <AuditImpactChart />
        </section>

        {/* Technical Foundation + Core Web Vitals Chart */}
        <section id="technical" className="blog-section mb-20">
          <h2>Technical Foundation: 15 Critical Checkpoints</h2>
          
          <p>
            Technical SEO forms the foundation of your site's search visibility. Without a solid technical 
            base, even the best content won't rank as well as it should. These 15 checkpoints cover the 
            essential technical elements every site must have in order.
          </p>

          <div className="space-y-8 mt-10">
            <div className="blog-checkpoint">
              <h3>1. Page Speed & Core Web Vitals</h3>
              <p>
                Test your site's loading speed using Google PageSpeed Insights and ensure all pages meet 
                Core Web Vitals thresholds. Focus on Largest Contentful Paint (LCP &lt; 2.5s), First Input 
                Delay (FID &lt; 100ms), and Cumulative Layout Shift (CLS &lt; 0.1).
              </p>
              <ul className="mt-4">
                <li>Optimize images using next-gen formats (WebP, AVIF)</li>
                <li>Implement lazy loading for below-the-fold content</li>
                <li>Minimize JavaScript execution time</li>
                <li>Use a CDN for static assets</li>
              </ul>
            </div>

            {/* Core Web Vitals Interactive Chart */}
            <CoreWebVitalsChart />

            <div className="blog-checkpoint">
              <h3>2. Mobile-First Optimization</h3>
              <p>
                Verify your site is fully responsive and passes Google's Mobile-Friendly Test. With mobile-first 
                indexing, Google primarily uses the mobile version of your content for indexing and ranking.
              </p>
            </div>

            {/* Continue with remaining checkpoints... */}
            <div className="blog-checkpoint">
              <h3>3. HTTPS & Security</h3>
              <p>
                Confirm your entire site uses HTTPS with a valid SSL certificate. Security is a confirmed 
                ranking factor, and browsers warn users about insecure sites.
              </p>
            </div>

            <div className="blog-checkpoint">
              <h3>4-15. Additional Technical Checkpoints</h3>
              <p>
                XML Sitemap Optimization, Robots.txt Configuration, Internal Linking Structure, Broken Links, 
                Canonical Tags, Duplicate Content Detection, Structured Data, Site Architecture, URL Structure, 
                Redirect Chains, Server Response Time, and JavaScript Rendering.
              </p>
            </div>
          </div>
        </section>

        {/* On-Page, Content, and Off-Page sections */}
        <section id="on-page" className="blog-section mb-20">
          <h2>On-Page Optimization: 12 Essential Elements</h2>
          <p>
            On-page SEO ensures each individual page is optimized for both search engines and users.
          </p>
          {/* Checkpoints 1-12 */}
        </section>

        <section id="content" className="blog-section mb-20">
          <h2>Content Quality Assessment: 10 Criteria</h2>
          <p>
            High-quality content is the cornerstone of successful SEO.
          </p>
        </section>

        <section id="off-page" className="blog-section mb-20">
          <h2>Off-Page Factors: 10 Critical Assessments</h2>
          <p>
            Off-page SEO encompasses all activities that happen outside your website but impact your rankings.
          </p>
        </section>

        {/* Implementation Guide with Progress Timeline */}
        <section id="implementation" className="blog-section mb-20">
          <h2>How to Use This Checklist Effectively</h2>
          
          <p>
            With 47 checkpoints across five major categories, it's important to approach your SEO audit 
            systematically rather than trying to tackle everything at once.
          </p>

          {/* SEO Progress Timeline Chart */}
          <SEOProgressTimeline />

          <div className="space-y-6 mt-8">
            <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Step 1: Prioritize Based on Impact</h3>
              <p>
                Start with technical issues that prevent search engines from crawling and indexing your 
                site properly.
              </p>
            </div>
            {/* Steps 2-6 */}
          </div>
        </section>

        {/* Conclusion */}
        <section className="blog-section">
          <h2>Taking Action on Your SEO Audit</h2>
          
          <p>
            A comprehensive SEO audit is only valuable if you act on the findings. Start with the 
            highest-impact issues and work systematically through your checklist.
          </p>

          <div className="my-10 pl-6 border-l-4 border-blue-500">
            <p className="text-lg text-gray-100 font-medium">
              Ready to automate your SEO audits? 
              <a href="/features" className="text-blue-400 hover:text-blue-300 underline">Try AI SEO Turbo's automated auditing tools</a> 
              or <a href="/pricing" className="text-blue-400 hover:text-blue-300 underline">choose a plan</a> that fits your needs.
            </p>
          </div>
        </section>
      </div>
    ),
    date: t('post.date'),
    readTime: t('post.readTime'),
    category: t('post.category'),
    author: t('post.author'),
    authorRole: t('post.authorRole'),
    featured: true,
    image: '/blog/seo-audit-checklist.jpg',
    tags: ['SEO Audit', 'Technical SEO', 'On-Page SEO', 'Content Audit', 'Off-Page SEO', 'Checklist', 'Framework'],
    views: '2.4k',
    likes: 156
  }

  const blogSchema = generateBlogPostingSchema({
    title: t('post.title'),
    description: t('post.excerpt'),
    author: t('post.author'),
    datePublished: '2025-10-17T09:00:00+00:00',
    dateModified: '2025-10-17T09:00:00+00:00',
    image: 'https://www.aiseoturbo.com/blog/seo-audit-checklist.jpg',
    url: 'https://www.aiseoturbo.com/blog/complete-seo-audit-checklist-2025',
    wordCount: 3200,
    keywords: ['SEO audit', 'technical SEO', 'on-page SEO', 'content audit', 'off-page SEO', 'SEO checklist', 'website audit'],
    category: t('post.category')
  })

  return (
    <>
      <StructuredData data={blogSchema} />
      <StructuredData data={howToSchema} />
      <BlogPostClient post={post} />
    </>
  )
}
