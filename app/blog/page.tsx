import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SEO Blog | AISEOTurbo - Expert SEO Tips and Insights',
  description: 'Stay ahead with the latest SEO strategies, AI-powered insights, and expert tips from AISEOTurbo. Learn how to boost your search rankings and drive more traffic.',
  keywords: ['seo blog', 'seo tips', 'search engine optimization', 'ai seo insights', 'digital marketing'],
}

export default function BlogPage() {
  const blogPosts = [
    {
      title: 'Complete SEO Audit Checklist for 2025',
      excerpt: 'A comprehensive 47-point checklist to audit your website for SEO issues and opportunities. Used by 1000+ websites to increase organic traffic.',
      date: 'March 15, 2025',
      readTime: '12 min read',
      category: 'Technical SEO',
      featured: true
    },
    {
      title: 'AI-Powered SEO: The Future is Here',
      excerpt: 'Discover how artificial intelligence is revolutionizing search engine optimization and how to leverage AI for better rankings.',
      date: 'March 10, 2025',
      readTime: '8 min read',
      category: 'AI & SEO'
    },
    {
      title: 'Core Web Vitals Optimization Guide',
      excerpt: 'Master Google Core Web Vitals with our step-by-step guide to improve page speed and user experience.',
      date: 'March 5, 2025',
      readTime: '10 min read',
      category: 'Performance'
    },
    {
      title: 'Technical SEO Best Practices',
      excerpt: 'Essential technical SEO strategies that every website owner should implement to improve search visibility.',
      date: 'February 28, 2025',
      readTime: '15 min read',
      category: 'Technical SEO'
    },
    {
      title: 'Local SEO Strategies That Work',
      excerpt: 'Boost your local search rankings with these proven strategies for local businesses and service providers.',
      date: 'February 20, 2025',
      readTime: '9 min read',
      category: 'Local SEO'
    },
    {
      title: 'Content SEO: Creating Search-Friendly Content',
      excerpt: 'Learn how to create content that both users and search engines love with our comprehensive content SEO guide.',
      date: 'February 15, 2025',
      readTime: '11 min read',
      category: 'Content SEO'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              SEO <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Insights</span> and Tips
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Stay ahead of the curve with expert SEO strategies, AI-powered insights, and actionable tips to boost your search rankings.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8">Featured Article</h2>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl p-8 border mb-16">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center mb-4">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                      Technical SEO
                    </span>
                    <span className="ml-4 text-muted-foreground text-sm">March 15, 2025  12 min read</span>
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-4">
                    Complete SEO Audit Checklist for 2025
                  </h3>
                  <p className="text-muted-foreground text-lg mb-6">
                    A comprehensive 47-point checklist to audit your website for SEO issues and opportunities. 
                    Used by 1000+ websites to increase organic traffic by 40% in 90 days.
                  </p>
                  <button className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                    Read Full Article
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center">
                    <svg className="w-16 h-16 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Posts Grid */}
            <h2 className="text-3xl font-bold text-foreground mb-8">Latest Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(1).map((post, index) => (
                <article key={index} className="bg-background border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span>{post.date}</span>
                        <svg className="w-4 h-4 ml-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{post.readTime}</span>
                      </div>
                      
                      <button className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm">
                        Read more
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="mt-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl p-8 text-center border">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Stay Updated with SEO Insights
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get the latest SEO tips, strategies, and industry insights delivered directly to your inbox. 
                Join 5,000+ SEO professionals who trust our newsletter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
