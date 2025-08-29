import { Metadata } from 'next'
import { MainLayout } from '../../components/layout/main-layout'

export const metadata: Metadata = {
  title: 'About Us | AISEOTurbo - AI-Powered SEO Solutions',
  description: 'Learn about AISEOTurbo mission to revolutionize SEO with cutting-edge AI technology. Meet our team and discover our commitment to helping businesses succeed online.',
  keywords: ['about aiseoturbo', 'seo company', 'ai seo team', 'seo experts'],
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
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Our Story</h2>
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6">
                Founded by SEO experts and AI enthusiasts, AISEOTurbo was born from the frustration of time-consuming manual SEO audits. 
                We envisioned a world where AI could automate the technical aspects of SEO while providing actionable insights that drive real results.
              </p>
              <p className="text-lg leading-relaxed">
                Today, we're proud to serve over 1,000+ websites, helping them increase organic traffic by an average of 40% within 90 days 
                through our AI-powered SEO analysis and recommendations.
              </p>
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
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Precision</h3>
              <p className="text-muted-foreground">We deliver accurate, data-driven SEO insights that you can act on immediately.</p>
            </div>

            <div className="text-center p-6 bg-background rounded-xl shadow-sm border">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Innovation</h3>
              <p className="text-muted-foreground">Leveraging cutting-edge AI to stay ahead of search engine algorithm changes.</p>
            </div>

            <div className="text-center p-6 bg-background rounded-xl shadow-sm border">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Collaboration</h3>
              <p className="text-muted-foreground">Working closely with our clients to understand their unique business goals.</p>
            </div>

            <div className="text-center p-6 bg-background rounded-xl shadow-sm border">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Integrity</h3>
              <p className="text-muted-foreground">Transparent reporting and honest recommendations, always putting our clients first.</p>
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
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl p-8 border">
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
