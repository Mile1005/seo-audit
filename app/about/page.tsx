import { Metadata } from 'next'
import { MainLayout } from '../../components/layout/main-layout'

// Force dynamic rendering to fix Vercel lambda routing
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'About Us - SEO Experts & AI Innovation | AI SEO Turbo',
  description: 'Learn about our mission to revolutionize SEO with AI technology. Meet the team committed to helping businesses succeed online with cutting-edge tools.',
  keywords: ['about aiseoturbo', 'seo company', 'ai seo team', 'seo experts'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/about'
  },
  openGraph: {
    title: 'About Us - SEO Experts & AI Innovation | AI SEO Turbo',
    description: 'Learn about our mission to revolutionize SEO with AI technology. Meet the team committed to helping businesses succeed online with cutting-edge tools.',
    url: 'https://www.aiseoturbo.com/about',
    type: 'website',
    locale: 'en_US',
    siteName: 'AISEOTurbo',
    images: [
      {
        url: 'https://www.aiseoturbo.com/logo.png',
        width: 1200,
        height: 630,
        alt: 'AISEOTurbo - AI-Powered SEO Audits',
      }
    ]
  }
}

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-background">{/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">AISEOTurbo</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              We're revolutionizing SEO with cutting-edge AI technology, helping businesses achieve better search rankings and drive more traffic.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                How AI SEO Turbo was born from a simple observation about the SEO industry
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">The Problem We Solved</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Traditional SEO audits were too slow, too expensive, and often missed critical technical issues that could make or break search rankings.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">Days of manual analysis required</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">Thousands of dollars in consulting fees</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">Critical issues often missed</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-2xl">
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">15+</div>
                  <div className="text-muted-foreground mb-6">Years Combined Experience</div>
                  <div className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">10,000+</div>
                  <div className="text-muted-foreground">Businesses Served Worldwide</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Our Mission</h3>
                  <p className="text-muted-foreground">
                    Democratize SEO insights and help businesses of all sizes succeed online through cutting-edge AI technology.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Our Vision</h3>
                  <p className="text-muted-foreground">
                    Become the world's most trusted AI-powered SEO platform, making professional-grade optimization accessible to everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do at AISEOTurbo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6 bg-background rounded-xl shadow-sm border">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Precision</h3>
              <p className="text-muted-foreground">We deliver accurate, data-driven SEO insights that you can act on immediately.</p>
            </div>

            <div className="text-center p-6 bg-background rounded-xl shadow-sm border">
              <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Innovation</h3>
              <p className="text-muted-foreground">Leveraging cutting-edge AI to stay ahead of search engine algorithm changes.</p>
            </div>

            <div className="text-center p-6 bg-background rounded-xl shadow-sm border">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Collaboration</h3>
              <p className="text-muted-foreground">Working closely with our clients to understand their unique business goals.</p>
            </div>

            <div className="text-center p-6 bg-background rounded-xl shadow-sm border">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Integrity</h3>
              <p className="text-muted-foreground">Transparent reporting and honest recommendations, always putting our clients first.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 text-center">Our Expertise</h2>
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <h3>Technical SEO Mastery</h3>
              <p className="text-lg leading-relaxed mb-6">
                Our team includes certified SEO specialists with deep expertise in Google's algorithms, Core Web Vitals, and technical optimization.
                We stay ahead of algorithm updates by continuously training our AI models on the latest search engine documentation and performance data.
              </p>

              <h3>AI & Machine Learning Innovation</h3>
              <p className="text-lg leading-relaxed mb-6">
                Our AI engineers specialize in natural language processing, computer vision, and predictive analytics. This allows us to identify
                SEO opportunities that traditional tools miss, such as semantic content gaps, user intent mismatches, and emerging search trends.
              </p>

              <h3>Data-Driven Methodology</h3>
              <p className="text-lg leading-relaxed mb-6">
                Every recommendation is backed by data from millions of websites and billions of search queries. Our proprietary algorithms
                analyze ranking factors, user behavior patterns, and competitive landscapes to provide actionable insights that drive measurable results.
              </p>

              <h3>Proven Track Record</h3>
              <p className="text-lg leading-relaxed">
                Our clients include startups, agencies, and enterprise brands who've achieved remarkable growth through our platform.
                From local businesses gaining market dominance to global brands scaling their organic traffic, we deliver consistent results
                across industries and business sizes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Our Team</h2>
            <div className="prose prose-lg mx-auto text-muted-foreground mb-8">
              <p className="text-lg leading-relaxed">
                Our diverse team combines deep SEO expertise with cutting-edge AI knowledge. 
                We're passionate about helping businesses succeed online through innovative technology and proven strategies.
              </p>
            </div>
            <div className="bg-card rounded-xl p-8 border">
              <blockquote className="text-xl font-medium text-foreground mb-4">
                "We're not just building tools  we're crafting solutions that transform how businesses approach SEO."
              </blockquote>
              <cite className="text-muted-foreground">- The AISEOTurbo Team</cite>
            </div>
          </div>
        </div>
      </section>
    </div>
    </MainLayout>
  )
}
