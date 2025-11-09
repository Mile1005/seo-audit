"use client"

import { MainLayout } from '@/components/layout/main-layout'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, CheckCircle, BarChart3, AlertTriangle, Target, TrendingUp, Award, Zap, Star, Info } from 'lucide-react'
import Link from 'next/link'

export default function SEOScoresPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">
        
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { name: 'Home', url: 'https://www.aiseoturbo.com' },
            { name: 'Help', url: 'https://www.aiseoturbo.com/help' },
            { name: 'Getting Started', url: 'https://www.aiseoturbo.com/help/getting-started' },
            { name: 'Understanding SEO Scores', url: 'https://www.aiseoturbo.com/help/getting-started/seo-scores' }
          ]}
        />
        
        {/* JSON-LD Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Understanding SEO Scores: Complete Guide to AISEOTurbo Scoring System",
              "description": "Comprehensive guide to understanding SEO scores, metrics, and how AISEOTurbo calculates your website's search optimization performance.",
              "image": "https://aiseoturbo.com/help/seo-scores-guide.jpg",
              "author": {
                "@type": "Organization",
                "name": "AISEOTurbo",
                "url": "https://aiseoturbo.com"
              },
              "publisher": {
                "@type": "Organization",
                "name": "AISEOTurbo",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://aiseoturbo.com/logo.png"
                }
              },
              "datePublished": "2025-03-01",
              "dateModified": "2025-03-15",
              "wordCount": 2500,
              "timeRequired": "PT7M",
              "articleSection": "SEO Education",
              "keywords": ["SEO scores", "website optimization", "search rankings", "SEO metrics", "performance analysis"],
              "about": [
                {
                  "@type": "Thing",
                  "name": "Search Engine Optimization"
                },
                {
                  "@type": "Thing", 
                  "name": "Website Performance"
                },
                {
                  "@type": "Thing",
                  "name": "Digital Marketing"
                }
              ]
            })
          }}
        />

        {/* Breadcrumb */}
        <section className="bg-slate-900/50 py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
              <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
                Help Center
              </Link>
              <span className="text-gray-600" aria-hidden="true">/</span>
              <Link href="/help/getting-started" className="text-gray-400 hover:text-white transition-colors">
                Getting Started
              </Link>
              <span className="text-gray-600" aria-hidden="true">/</span>
              <span className="text-white">Understanding SEO scores</span>
            </nav>
          </div>
        </section>

        {/* Article Header */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link 
                href="/help" 
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 group"
                aria-label="Return to Help Center"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
                Back to Help Center
              </Link>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 p-3" aria-hidden="true">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-blue-400 text-sm font-medium">Getting Started</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Understanding SEO scores
                  </h1>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-gray-400 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  <span>7 min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" aria-hidden="true" />
                  <span>Last updated: March 2025</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg prose-invert max-w-none"
            >
              
              {/* Introduction */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <Target className="w-6 h-6 text-blue-400 mt-1" aria-hidden="true" />
                  <div>
                    <h2 className="text-white text-lg font-semibold mb-2">Understanding Your Scores</h2>
                    <h3 className="text-white text-lg font-semibold mb-2">What you'll learn</h3>
                    <p className="text-gray-300 mb-0">
                      Decode your SEO scores and understand what each metric means for your website's search performance. 
                      Learn how to interpret results and prioritize improvements for maximum impact.
                    </p>
                  </div>
                </div>
              </div>

              {/* Overall Score Section */}
              <h2 className="text-2xl font-bold text-white mb-6">Your overall SEO score</h2>
              
              <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-700/50 rounded-xl p-6 mb-8">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-2xl font-bold mb-4">
                    85
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Overall SEO Score</h3>
                  <p className="text-gray-300">Your website's comprehensive SEO health rating</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-green-900/30 border border-green-600/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">90+</div>
                    <div className="text-green-300 text-sm font-medium">Excellent</div>
                    <div className="text-gray-400 text-xs">Top 10% of sites</div>
                  </div>
                  <div className="bg-blue-900/30 border border-blue-600/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">70-89</div>
                    <div className="text-blue-300 text-sm font-medium">Good</div>
                    <div className="text-gray-400 text-xs">Above average</div>
                  </div>
                  <div className="bg-yellow-900/30 border border-yellow-600/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-400 mb-1">50-69</div>
                    <div className="text-yellow-300 text-sm font-medium">Needs Work</div>
                    <div className="text-gray-400 text-xs">Room for improvement</div>
                  </div>
                  <div className="bg-red-900/30 border border-red-600/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-red-400 mb-1">Below 50</div>
                    <div className="text-red-300 text-sm font-medium">Critical</div>
                    <div className="text-gray-400 text-xs">Immediate action needed</div>
                  </div>
                </div>
              </div>

              {/* Score Categories */}
              <h3 className="text-2xl font-bold text-white mb-6">Score breakdown by category</h3>
              
              <div className="space-y-6">
                
                {/* Technical SEO */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-2">
                        <Zap className="w-6 h-6 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">Technical SEO</h3>
                        <p className="text-gray-400 text-sm">Site structure, speed, and crawlability</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-cyan-400">92</div>
                      <div className="text-cyan-300 text-sm">Excellent</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-gray-300">Page Load Speed</span>
                      <span className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="w-4/5 h-full bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-green-400 text-sm font-medium">95</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-gray-300">Mobile Friendliness</span>
                      <span className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="w-full h-full bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-green-400 text-sm font-medium">100</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-gray-300">Site Security (HTTPS)</span>
                      <span className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="w-full h-full bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-green-400 text-sm font-medium">100</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-gray-300">Crawlability</span>
                      <span className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="w-3/4 h-full bg-yellow-500 rounded-full"></div>
                        </div>
                        <span className="text-yellow-400 text-sm font-medium">75</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Quality */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 p-2">
                        <Star className="w-6 h-6 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">Content Quality</h3>
                        <p className="text-gray-400 text-sm">Content optimization and relevance</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-400">78</div>
                      <div className="text-blue-300 text-sm">Good</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-gray-300">Keyword Optimization</span>
                      <span className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="w-4/5 h-full bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-green-400 text-sm font-medium">85</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-gray-300">Content Length</span>
                      <span className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="w-3/5 h-full bg-yellow-500 rounded-full"></div>
                        </div>
                        <span className="text-yellow-400 text-sm font-medium">65</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-gray-300">Readability Score</span>
                      <span className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="w-4/5 h-full bg-blue-500 rounded-full"></div>
                        </div>
                        <span className="text-blue-400 text-sm font-medium">82</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-gray-300">Content Freshness</span>
                      <span className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="w-3/4 h-full bg-blue-500 rounded-full"></div>
                        </div>
                        <span className="text-blue-400 text-sm font-medium">75</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* User Experience */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 p-2">
                        <Award className="w-6 h-6 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">User Experience</h3>
                        <p className="text-gray-400 text-sm">Core Web Vitals and usability</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">88</div>
                      <div className="text-green-300 text-sm">Good</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-gray-300">Largest Contentful Paint (LCP)</span>
                      <span className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="w-5/6 h-full bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-green-400 text-sm font-medium">90</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-gray-300">First Input Delay (FID)</span>
                      <span className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="w-full h-full bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-green-400 text-sm font-medium">95</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-gray-300">Cumulative Layout Shift (CLS)</span>
                      <span className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="w-4/5 h-full bg-blue-500 rounded-full"></div>
                        </div>
                        <span className="text-blue-400 text-sm font-medium">80</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* How Scores Are Calculated */}
              <h3 className="text-2xl font-bold text-white mt-12 mb-6">How we calculate your scores</h3>
              
              <div className="bg-blue-900/20 border border-blue-600/30 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4 mb-6">
                  <Info className="w-6 h-6 text-blue-400 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="text-blue-400 text-lg font-semibold mb-2">Our scoring methodology</h3>
                    <p className="text-gray-300">
                      AISEOTurbo analyzes over 200 SEO factors using advanced AI algorithms. Our scoring system is based on:
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1" aria-hidden="true" />
                      <div>
                        <h4 className="text-white font-medium">Google's Guidelines</h4>
                        <p className="text-gray-400 text-sm">Official ranking factors and best practices</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1" aria-hidden="true" />
                      <div>
                        <h4 className="text-white font-medium">Industry Standards</h4>
                        <p className="text-gray-400 text-sm">Benchmarks from millions of websites</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1" aria-hidden="true" />
                      <div>
                        <h4 className="text-white font-medium">Real Performance Data</h4>
                        <p className="text-gray-400 text-sm">Actual user experience metrics</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1" aria-hidden="true" />
                      <div>
                        <h4 className="text-white font-medium">AI Analysis</h4>
                        <p className="text-gray-400 text-sm">Machine learning-powered insights</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Improving Your Scores */}
              <h3 className="text-2xl font-bold text-white mb-6">How to improve your scores</h3>
              
              <div className="space-y-6">
                <div className="bg-green-900/20 border border-green-600/30 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <TrendingUp className="w-6 h-6 text-green-400 mt-1" aria-hidden="true" />
                    <div>
                      <h3 className="text-green-400 text-lg font-semibold mb-2">Quick wins (1-2 weeks)</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Fix missing meta descriptions and title tags</li>
                        <li>• Optimize image alt text and file sizes</li>
                        <li>• Improve page loading speed with compression</li>
                        <li>• Add structured data markup</li>
                        <li>• Fix broken internal links</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-900/20 border border-blue-600/30 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Target className="w-6 h-6 text-blue-400 mt-1" aria-hidden="true" />
                    <div>
                      <h3 className="text-blue-400 text-lg font-semibold mb-2">Medium-term improvements (1-3 months)</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Create high-quality, original content</li>
                        <li>• Build authoritative backlinks</li>
                        <li>• Optimize for Core Web Vitals</li>
                        <li>• Improve site architecture and navigation</li>
                        <li>• Enhance mobile user experience</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-900/20 border border-purple-600/30 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Award className="w-6 h-6 text-purple-400 mt-1" aria-hidden="true" />
                    <div>
                      <h3 className="text-purple-400 text-lg font-semibold mb-2">Long-term strategy (3+ months)</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Develop comprehensive content strategy</li>
                        <li>• Build domain authority through PR and outreach</li>
                        <li>• Implement advanced technical optimizations</li>
                        <li>• Monitor and adapt to algorithm changes</li>
                        <li>• Establish thought leadership in your industry</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Troubleshooting */}
              <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-xl p-6 mt-12">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-400 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="text-yellow-400 text-lg font-semibold mb-2">Score fluctuations</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-white font-medium">Why do scores change?</h4>
                        <p className="text-gray-300 text-sm">Scores can fluctuate due to website changes, algorithm updates, or competitors' improvements.</p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">When to be concerned?</h4>
                        <p className="text-gray-300 text-sm">Significant drops (&gt;10 points) warrant investigation. Small fluctuations (±3 points) are normal.</p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Focus on trends</h4>
                        <p className="text-gray-300 text-sm">Look at score trends over weeks/months rather than daily changes for meaningful insights.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <h3 className="text-2xl font-bold text-white mt-12 mb-6">Next steps</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link 
                  href="/help/features/seo-audit"
                  className="block bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group"
                  aria-label="Learn about complete SEO audit walkthrough"
                >
                  <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    Complete SEO audit walkthrough
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Deep dive into our comprehensive audit process and how to interpret detailed results
                  </p>
                </Link>
                
                <Link 
                  href="/help/getting-started/quick-start"
                  className="block bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group"
                  aria-label="Follow the quick start guide"
                >
                  <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    Quick start guide
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Get up and running with AISEOTurbo in 10 minutes with our step-by-step guide
                  </p>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
