import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Footer from '../components/layout/Footer';

export const dynamic = 'force-dynamic';

function StaticHeader() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              AISEO Turbo
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/seo-audit" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              SEO Audit
            </Link>
            <Link href="/site-crawler" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Site Crawler
            </Link>
            <Link href="/backlinks" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Backlinks
            </Link>
            <Link href="/rank-tracker" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Rank Tracker
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {
      id: 0,
      title: "SEO Audit",
      description: "Comprehensive website analysis with technical SEO, on-page optimization, and performance insights.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      features: [
        "Technical SEO audit",
        "On-page optimization checks",
        "Performance and speed insights"
      ],
      link: "/seo-audit"
    },
    {
      id: 1,
      title: "Site Crawler",
      description: "Advanced website crawling to discover technical issues, broken links, and site structure problems.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      features: [
        "Crawl your entire website",
        "Find broken links and missing tags",
        "Site structure visualization"
      ],
      link: "/site-crawler"
    },
    {
      id: 2,
      title: "Rank Tracker",
      description: "Monitor your keyword rankings and track performance changes over time with detailed analytics.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      features: [
        "Track keyword rankings",
        "Monitor ranking changes",
        "Competitor analytics"
      ],
      link: "/rank-tracker"
    },
    {
      id: 3,
      title: "Backlink Analysis",
      description: "Analyze your backlink profile, discover new opportunities, and monitor competitor link strategies.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      features: [
        "Backlink profile analysis",
        "Discover new opportunities",
        "Competitor link monitoring"
      ],
      link: "/backlinks"
    }
  ];

  return (
    <>
      <StaticHeader />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-gray-900 leading-tight">
              Speed up{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                search marketing
              </span>{' '}
              goals achievement
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Start your analysis for free
            </p>
            <div className="flex items-center justify-center max-w-2xl mx-auto">
              <div className="relative w-full">
                <input 
                  type="text" 
                  placeholder="Enter domain, keyword or URL here" 
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all shadow-lg"
                />
                <Link 
                  href="/seo-audit"
                  className="absolute right-2 top-2 px-8 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Search
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span>Based on 600+ reviews</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center font-bold text-gray-600">G2</div>
                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center font-bold text-gray-600">C</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features/Tabbed Tools Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">MARKETING TOOLS TO SPEED UP SEO TASKS</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to optimize your website and improve search rankings with our comprehensive SEO toolkit
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {tabs.map((tab) => (
                <div key={tab.id} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      {tab.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{tab.title}</h3>
                      <p className="text-gray-600 mb-4">{tab.description}</p>
                      <ul className="mb-4 list-disc list-inside text-gray-600">
                        {tab.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                      <Link
                        href={tab.link}
                        className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                      >
                        Learn More
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Illustration */}
            <div className="lg:pl-12">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-6">Get Comprehensive SEO Insights</h3>
                  <p className="text-xl mb-8 text-blue-100">
                    Our AI-powered tools analyze every aspect of your website's SEO performance and provide actionable recommendations.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-green-300 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg">100+ SEO factors analyzed</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-green-300 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg">Real-time monitoring</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-green-300 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg">Detailed reports & insights</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">USE THE RIGHT DATA</h2>
            <p className="text-xl text-gray-600">Powered by comprehensive SEO databases and real-time analysis</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">1.5B</div>
              <div className="text-gray-600 font-medium">Domains</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">8.6B</div>
              <div className="text-gray-600 font-medium">Keywords</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">529B</div>
              <div className="text-gray-600 font-medium">Backlinks</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">5.6B</div>
              <div className="text-gray-600 font-medium">Keyword Suggestions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">230</div>
              <div className="text-gray-600 font-medium">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">2.2B</div>
              <div className="text-gray-600 font-medium">Google SERPs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">PEOPLE LOVE OUR SEO TOOLS</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied customers who trust our SEO platform</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6 italic">
                "This SEO audit tool helped us identify critical issues we never knew existed. Our organic traffic increased by 150% in just 3 months!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <div className="font-semibold text-gray-900">Sarah Johnson</div>
                  <div className="text-sm text-gray-600">Marketing Director, TechCorp</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6 italic">
                "The backlink analysis feature is incredible. We discovered high-quality link opportunities that our competitors were missing."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <div className="font-semibold text-gray-900">Mike Chen</div>
                  <div className="text-sm text-gray-600">SEO Specialist, Growth Agency</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6 italic">
                "Best SEO tool I've used. The AI-powered insights are spot-on and the interface is incredibly user-friendly."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <div className="font-semibold text-gray-900">Emma Rodriguez</div>
                  <div className="text-sm text-gray-600">Founder, E-commerce Store</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about our SEO audit tools</p>
          </div>
          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Who should use our SEO audit tool?</h3>
              <p className="text-gray-600">
                Our SEO audit tool is perfect for business owners, bloggers, digital marketers, web developers, SEO professionals, and basically anyone who wants to improve their website's search engine rankings and online visibility.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What's required to use our SEO tools?</h3>
              <p className="text-gray-600">
                All you need is a website URL to get started. Our tools work with any website regardless of the platform it's built on - WordPress, Shopify, Wix, custom HTML, or any other CMS.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Do I need technical knowledge to use these tools?</h3>
              <p className="text-gray-600">
                Absolutely not. Our SEO audit tools are designed to be user-friendly and accessible to everyone. You'll get clear, actionable recommendations that don't require any technical expertise to understand or implement.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">How long does an SEO audit take?</h3>
              <p className="text-gray-600">
                Most audits complete within 1-2 minutes. Larger websites with more pages may take up to 5 minutes. You'll receive a comprehensive report with detailed insights and actionable recommendations.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Is my data secure and private?</h3>
              <p className="text-gray-600">
                Yes, absolutely. We take data privacy seriously. Your website data is analyzed securely and is never shared with third parties. We only collect the information necessary to provide you with accurate SEO insights.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Can I use this for client websites?</h3>
              <p className="text-gray-600">
                Yes, you can use our SEO audit tools for client websites. Many SEO professionals and agencies use our platform to provide comprehensive audits and reports to their clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Ready to Boost Your SEO Rankings?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-blue-100 mb-10"
          >
            Join over 10,000 websites that have improved their search rankings with our AI-powered SEO tools.
            Start your comprehensive SEO audit today and discover opportunities to grow your organic traffic.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/seo-audit"
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 inline-block"
            >
              Start Free SEO Audit
            </Link>
            <Link
              href="/site-crawler"
              className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 inline-block"
            >
              Explore All Tools
            </Link>
          </motion.div>
          <p className="text-blue-100 text-sm mt-6">
            ✓ No credit card required  ✓ Get results in under 2 minutes  ✓ 100% free audit
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
      {/* Enhanced Stats Section */}
      <section className="relative py-20 bg-gradient-to-br from-white via-blue-50 to-purple-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(147,51,234,0.05)_1px,transparent_0)] bg-[length:40px_40px]" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900">
                USE the right data
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {[
                { value: "1.50B", label: "Domains" },
                { value: "8.62B", label: "Keywords" },
                { value: "529B", label: "Backlinks" },
                { value: "5.6B", label: "Keywords suggestions" },
                { value: "230", label: "Countries" },
                { value: "2.21B", label: "Google SERPs" }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Enhanced Final CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-white">
              Try all paid features during 7 days for free
            </h2>
            <div>
              <a
                href="https://app.aiseoturbo.com/signup"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Get access with no charges
              </a>
            </div>
          </div>
        </div>
      </section>
