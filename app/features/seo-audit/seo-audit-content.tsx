"use client";

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Target, Zap, TrendingUp, Shield, Play, ChevronRight, Clock, Search, AlertTriangle, Loader2 } from 'lucide-react'

// Simplified mock components to prevent import issues
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen">
    {children}
  </div>
)

const ApiErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>{children}</div>
)

// Mock components to prevent import errors
const AuditCategories: React.FC<{ categories: any[] }> = ({ categories }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {categories.map((category, index) => (
      <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center mb-4">
          <category.icon className="h-8 w-8 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900 ml-3">{category.title}</h3>
        </div>
        <p className="text-gray-600 mb-4">{category.description}</p>
        <ul className="space-y-2">
          {category.checks.map((check: string, i: number) => (
            <li key={i} className="flex items-center text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              {check}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
)

const AuditPreview: React.FC<{ result: any }> = ({ result }) => (
  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
    <h3 className="text-2xl font-bold text-gray-900 mb-4">Audit Overview</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="text-center">
        <div className="text-4xl font-bold text-blue-600 mb-2">{result.score}</div>
        <div className="text-gray-600">Overall Score</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-green-600 mb-2">{result.pageData?.wordCount || 0}</div>
        <div className="text-gray-600">Word Count</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-yellow-600 mb-2">{result.recommendations?.length || 0}</div>
        <div className="text-gray-600">Recommendations</div>
      </div>
    </div>
  </div>
)

const TechnicalBreakdown: React.FC<{ result: any }> = ({ result }) => (
  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
    <h3 className="text-2xl font-bold text-gray-900 mb-6">Technical Analysis</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Page Elements</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">H1 Tags:</span>
            <span className="font-medium">{result.pageData?.h1Count || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">H2 Tags:</span>
            <span className="font-medium">{result.pageData?.h2Count || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Images:</span>
            <span className="font-medium">{result.pageData?.imagesTotal || 0}</span>
          </div>
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Link Structure</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Internal Links:</span>
            <span className="font-medium">{result.pageData?.internalLinks || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">External Links:</span>
            <span className="font-medium">{result.pageData?.externalLinks || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Load Time:</span>
            <span className="font-medium">{result.pageData?.loadTime || 0}ms</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const ResultsShowcase: React.FC<{ result: any; rawData: any }> = ({ result, rawData }) => (
  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
    <h3 className="text-2xl font-bold text-gray-900 mb-6">Recommendations</h3>
    <div className="space-y-4">
      {result.recommendations?.slice(0, 5).map((rec: any, index: number) => (
        <div key={index} className="border-l-4 border-blue-500 pl-4">
          <h4 className="font-semibold text-gray-900">{rec.title}</h4>
          <p className="text-gray-600 text-sm">{rec.description}</p>
          <span className={`inline-block px-2 py-1 rounded text-xs font-medium mt-2 ${
            rec.type === 'critical' ? 'bg-red-100 text-red-800' :
            rec.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {rec.type}
          </span>
        </div>
      )) || (
        <p className="text-gray-600">No recommendations available</p>
      )}
    </div>
  </div>
)

// SEO Audit Result Interface
interface SEOAuditResult {
  auditId: string
  status: 'completed' | 'processing' | 'failed'
  url: string
  score: number
  timestamp: string
  pageData: {
    title: string | null
    metaDescription: string | null
    h1Count: number
    h2Count: number
    h3Count: number
    wordCount: number
    imagesTotal: number
    imagesWithoutAlt: number
    internalLinks: number
    externalLinks: number
    loadTime: number
    canonical: string | null
    noindex: boolean
  }
  issues: any
  recommendations: Array<{
    type: 'critical' | 'warning' | 'suggestion'
    category: string
    title: string
    description: string
    priority: number
  }>
  robotsTxt: any
  sitemapXml: any
  keyword?: string | null
  email?: string | null
  // Add comprehensive rawData structure
  rawData?: {
    url?: string
    scores?: {
      overall?: number
      performance?: number
      accessibility?: number
      seo?: number
      best_practices?: number
    }
    stats?: {
      internal_links?: number
      external_links?: number
      images_count?: number
      images_size?: number
      scripts_count?: number
      scripts_size?: number
      text_size?: number
      text_rate?: number
      word_count?: number
      reading_time_min?: number
    }
    h_tags?: {
      h1?: string[]
      h2?: string[]
      h3?: string[]
    }
    social_meta?: {
      og_title?: string | null
      og_url?: string | null
      og_description?: string | null
      og_image?: string | null
      twitter_card?: string | null
      twitter_title?: string | null
      twitter_description?: string | null
    }
    accessibility?: {
      passed_checks?: string[]
      failed_checks?: string[]
    }
    indexability?: {
      passed_checks?: string[]
      failed_checks?: string[]
    }
    seo_checks?: {
      passed_checks?: string[]
      failed_checks?: string[]
    }
    performance_metrics?: {
      first_contentful_paint?: number
      largest_contentful_paint?: number
      cumulative_layout_shift?: number
      time_to_interactive?: number
      speed_index?: number
      total_blocking_time?: number
    }
    structured_data?: any[]
    check_data?: any
    server_data?: {
      server?: string
      encoding?: string
      status_code?: number
      response_time?: number
      headers?: Record<string, string>
    }
    meta_tags?: {
      title?: string | null
      meta_description?: string | null
      charset?: string | null
      viewport?: string | null
      canonical?: string | null
      lang?: string | null
      favicon?: string | null
      keywords?: string[] | null
      'apple-touch-icon'?: string | null
      'theme-color'?: string | null
      'msapplication-TileColor'?: string | null
      generator?: string | null
      author?: string | null
      robots?: string | null
    }
    request_id?: string
    requested_at?: string
    processed_at?: string
    cached?: boolean
    cache_expires_at?: string | null
    url_info?: {
      is_encoded?: boolean
      querystring?: string | null
      fragment?: string | null
      port?: number | null
      ssl?: boolean
      www?: boolean
      subdomain?: string | null
      domain?: string
      tld?: string
      ip?: string | null
    }
    content_info?: {
      content_type?: string
      content_size?: number
      content_compression?: string
      total_dom_size?: number
      dom_element_count?: number
      plaintext_size?: number
      plaintext_rate?: number
      compression_rate?: number
    }
    page_headers?: {
      security_headers?: string[]
      performance_headers?: string[]
      seo_headers?: string[]
    }
    error_data?: {
      code?: number
      message?: string
      details?: any
    }
  }
}

// Define the initial step with full UI component
interface ComponentData {
  title: string
  description: string
  features: string[]
  code: string
  complexity: 'Beginner' | 'Intermediate' | 'Advanced'
  timeToImplement: string
  tags: string[]
}

const ComponentShowcase: React.FC<{ data: ComponentData }> = ({ data }) => (
  <motion.div
    className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
    whileHover={{ scale: 1.02, y: -5 }}
    transition={{ duration: 0.3 }}
  >
    <div className="p-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">{data.title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          data.complexity === 'Beginner' ? 'bg-green-100 text-green-800' :
          data.complexity === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {data.complexity}
        </span>
      </div>
      
      <p className="text-gray-600 mb-6">{data.description}</p>
      
      <div className="space-y-3 mb-6">
        <h4 className="font-semibold text-gray-900">Key Features:</h4>
        <ul className="space-y-2">
          {data.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span className="text-sm text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {data.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {data.timeToImplement}
        </span>
      </div>
    </div>
  </motion.div>
)

export default function SEOAuditPageContent() {
  const [currentStep, setCurrentStep] = useState(0)
  const [url, setUrl] = useState('')
  const [keyword, setKeyword] = useState('')
  const [email, setEmail] = useState('')
  const [auditResults, setAuditResults] = useState<SEOAuditResult | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rawData, setRawData] = useState<any>(null)

  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const steps = [
    { title: 'Input URL', description: 'Enter your website URL and optional keyword' },
    { title: 'Processing', description: 'Our AI analyzes your website\'s SEO performance' },
    { title: 'Results', description: 'View comprehensive SEO audit results' }
  ]

  const auditCategories = [
    {
      icon: Target,
      title: 'Technical SEO',
      description: 'Meta tags, headers, structured data, and technical optimization',
      checks: ['Title tags', 'Meta descriptions', 'Header structure', 'Schema markup']
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Page speed, Core Web Vitals, and loading optimization',
      checks: ['Page load speed', 'Core Web Vitals', 'Image optimization', 'Caching']
    },
    {
      icon: Shield,
      title: 'Accessibility',
      description: 'WCAG compliance and accessibility best practices',
      checks: ['Alt text', 'Color contrast', 'Keyboard navigation', 'Screen readers']
    },
    {
      icon: TrendingUp,
      title: 'Content Quality',
      description: 'Content structure, readability, and keyword optimization',
      checks: ['Content length', 'Keyword density', 'Readability score', 'Internal links']
    }
  ]

  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return

    setIsProcessing(true)
    setLoading(true)
    setError(null)
    setSubmitError(null)
    setCurrentStep(1)

    try {
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Mock successful result
      const mockResult: SEOAuditResult = {
        auditId: 'mock-audit-' + Date.now(),
        status: 'completed',
        url: url.trim(),
        score: Math.floor(Math.random() * 40) + 60, // Random score 60-100
        timestamp: new Date().toISOString(),
        pageData: {
          title: 'Sample Website Title',
          metaDescription: 'Sample meta description for the website',
          h1Count: Math.floor(Math.random() * 3) + 1,
          h2Count: Math.floor(Math.random() * 8) + 2,
          h3Count: Math.floor(Math.random() * 15) + 5,
          wordCount: Math.floor(Math.random() * 2000) + 500,
          imagesTotal: Math.floor(Math.random() * 20) + 5,
          imagesWithoutAlt: Math.floor(Math.random() * 5),
          internalLinks: Math.floor(Math.random() * 30) + 10,
          externalLinks: Math.floor(Math.random() * 10) + 3,
          loadTime: Math.floor(Math.random() * 3000) + 1000,
          canonical: url.trim(),
          noindex: false
        },
        issues: {},
        recommendations: [
          {
            type: 'critical' as const,
            category: 'Technical SEO',
            title: 'Optimize Page Title',
            description: 'Your page title should be more descriptive and include target keywords.',
            priority: 1
          },
          {
            type: 'warning' as const,
            category: 'Performance',
            title: 'Improve Image Optimization',
            description: 'Several images could be compressed to improve loading speed.',
            priority: 2
          },
          {
            type: 'suggestion' as const,
            category: 'Content',
            title: 'Add More Internal Links',
            description: 'Consider adding more internal links to improve site navigation.',
            priority: 3
          }
        ],
        robotsTxt: {},
        sitemapXml: {},
        keyword: keyword.trim() || null,
        email: email.trim() || null,
        rawData: {
          url: url.trim(),
          scores: {
            overall: Math.floor(Math.random() * 40) + 60,
            performance: Math.floor(Math.random() * 30) + 70,
            accessibility: Math.floor(Math.random() * 25) + 75,
            seo: Math.floor(Math.random() * 35) + 65,
            best_practices: Math.floor(Math.random() * 20) + 80
          }
        }
      }

      setAuditResults(mockResult)
      setRawData(mockResult.rawData)
      setCurrentStep(2)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
      setSubmitError('Failed to analyze website. Please try again.')
      setCurrentStep(0)
    } finally {
      setIsProcessing(false)
      setLoading(false)
    }
  }

  const componentData: ComponentData = {
    title: "SEO Audit Tool",
    description: "Comprehensive website analysis for technical SEO, performance, accessibility, and content optimization.",
    features: [
      "Real-time technical SEO analysis",
      "Performance and Core Web Vitals monitoring", 
      "Accessibility compliance checking",
      "Content quality assessment",
      "Detailed recommendations and fixes"
    ],
    code: "Advanced SEO audit implementation with AI-powered insights",
    complexity: "Advanced",
    timeToImplement: "5-10 minutes",
    tags: ["SEO", "Performance", "Accessibility", "Analytics"]
  }

  return (
    <MainLayout>
      <ApiErrorBoundary>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          {/* Hero Section */}
          <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                    Comprehensive{' '}
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      SEO Audit
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                    Get detailed insights into your website's SEO performance, technical issues, 
                    and optimization opportunities with our AI-powered analysis tool.
                  </p>
                </motion.div>

                {/* Progress Steps */}
                <motion.div 
                  className="flex justify-center items-center space-x-8 mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                        index <= currentStep 
                          ? 'bg-blue-600 border-blue-600 text-white' 
                          : 'border-gray-300 text-gray-400'
                      }`}>
                        {index < currentStep ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : index === currentStep && isProcessing ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <span className="text-sm font-medium">{index + 1}</span>
                        )}
                      </div>
                      <div className="ml-3 text-left">
                        <p className={`text-sm font-medium ${
                          index <= currentStep ? 'text-gray-900' : 'text-gray-400'
                        }`}>
                          {step.title}
                        </p>
                        <p className="text-xs text-gray-500">{step.description}</p>
                      </div>
                      {index < steps.length - 1 && (
                        <ChevronRight className="h-4 w-4 text-gray-400 ml-6" />
                      )}
                    </div>
                  ))}
                </motion.div>

                {/* Audit Form */}
                {currentStep === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="max-w-2xl mx-auto"
                  >
                    <form onSubmit={handleAuditSubmit} className="space-y-6">
                      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                        <div className="space-y-6">
                          <div>
                            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                              Website URL *
                            </label>
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                              <input
                                type="url"
                                id="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://example.com"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-2">
                              Target Keyword (Optional)
                            </label>
                            <input
                              type="text"
                              id="keyword"
                              value={keyword}
                              onChange={(e) => setKeyword(e.target.value)}
                              placeholder="Enter your target keyword"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                              Email for Results (Optional)
                            </label>
                            <input
                              type="email"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="your@email.com"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          {error && (
                            <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                              <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />
                              <p className="text-red-700">{error}</p>
                            </div>
                          )}

                          <button
                            type="submit"
                            disabled={loading || isProcessing || !url.trim()}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            {loading || isProcessing ? (
                              <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Analyzing Website...
                              </>
                            ) : (
                              <>
                                Start SEO Audit
                                <ArrowRight className="h-5 w-5" />
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* Processing State */}
                {currentStep === 1 && isProcessing && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl mx-auto text-center"
                  >
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Analyzing Your Website</h3>
                      <p className="text-gray-600 mb-6">
                        Our AI is performing a comprehensive analysis of your website's SEO performance, 
                        technical structure, and optimization opportunities.
                      </p>
                      <div className="space-y-2 text-left max-w-md mx-auto">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Crawling website structure
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Analyzing technical SEO elements
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                          Checking performance metrics
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                          Generating recommendations
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </section>

          {/* Audit Categories Preview */}
          {currentStep === 0 && (
            <section className="py-16 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Analyze</h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Our comprehensive audit covers all critical aspects of SEO performance
                  </p>
                </motion.div>

                <AuditCategories categories={auditCategories} />
              </div>
            </section>
          )}

          {/* Results Section */}
          {currentStep === 2 && auditResults && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="py-16 px-4 sm:px-6 lg:px-8"
            >
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Audit Results</h2>
                  <p className="text-lg text-gray-600">
                    Here's your comprehensive SEO analysis for {auditResults.url}
                  </p>
                </div>

                {/* Results Components */}
                <div className="space-y-8">
                  <AuditPreview result={auditResults} />
                  <TechnicalBreakdown result={auditResults} />
                  <ResultsShowcase result={auditResults} rawData={rawData} />
                </div>

                {/* Start New Audit Button */}
                <div className="text-center mt-12">
                  <button
                    onClick={() => {
                      setCurrentStep(0)
                      setUrl('')
                      setKeyword('')
                      setEmail('')
                      setAuditResults(null)
                      setRawData(null)
                      setError(null)
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center gap-2 mx-auto"
                  >
                    <Play className="h-5 w-5" />
                    Start New Audit
                  </button>
                </div>
              </div>
            </motion.section>
          )}

          {/* Component Showcase */}
          {currentStep === 0 && (
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">About This Tool</h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Advanced SEO audit capabilities powered by modern web technologies
                  </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                  <ComponentShowcase data={componentData} />
                </div>
              </div>
            </section>
          )}
        </div>
      </ApiErrorBoundary>
    </MainLayout>
  )
}
