import { MainLayout } from "@/components/layout/main-layout"
import { generateSEOMeta } from "@/lib/seo"
import { Metadata } from 'next'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  Users,
  Target,
  ArrowRight,
  CheckCircle,
  Star,
  Calendar,
  Award,
  BarChart3,
  Zap,
  Globe,
  ArrowLeft,
  Share2,
  Download,
  ExternalLink,
  Server,
  Shield,
  Cpu
} from "lucide-react"

// SEO metadata
export const metadata: Metadata = {
  title: 'Enterprise SaaS SEO - 520% Traffic Growth | AI SEO Turbo',
  description: 'Enterprise SaaS company case study: 520% organic traffic increase, 200+ top keywords, 680% ROI with AI-powered technical SEO and optimization.',
  keywords: [
    'enterprise SEO case study',
    'SaaS SEO success',
    'technical SEO enterprise',
    'enterprise traffic growth',
    'B2B SEO results',
    'enterprise keyword ranking',
    'SaaS SEO ROI'
  ],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/case-studies/techflow-solutions'
  },
  openGraph: {
    title: 'Enterprise SaaS SEO Case Study - 520% Traffic Growth TechFlow Solutions | AI SEO Turbo',
    description: 'Enterprise SaaS company case study: 520% organic traffic increase, 200+ top keywords, 680% ROI with AI-powered technical SEO and optimization.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise SaaS SEO Case Study - 520% Traffic Growth TechFlow Solutions | AI SEO Turbo',
    description: 'Enterprise SaaS company case study: 520% organic traffic increase, 200+ top keywords, 680% ROI with AI-powered technical SEO and optimization.',
  }
}

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "TechFlow Solutions: Enterprise SEO Transformation - 520% Traffic Increase",
  "description": "Comprehensive enterprise SEO case study showing how TechFlow Solutions achieved remarkable results with AI-powered optimization.",
  "datePublished": "2024-10-14",
  "dateModified": "2024-10-14",
  "author": {
    "@type": "Organization",
    "name": "AI SEO Turbo"
  },
  "publisher": {
    "@type": "Organization",
    "name": "AI SEO Turbo",
    "logo": {
      "@type": "ImageObject",
      "url": "/images/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.aiseoturbo.com/case-studies/techflow-solutions"
  },
  "about": [
    {
      "@type": "Thing",
      "name": "Enterprise SEO"
    },
    {
      "@type": "Thing",
      "name": "SaaS Optimization"
    },
    {
      "@type": "Thing",
      "name": "Technical SEO"
    }
  ]
}

const challengePoints = [
  "Complex enterprise website with 500+ pages and technical SEO issues",
  "Poor search visibility despite high-quality content and products",
  "Slow site performance and mobile optimization problems",
  "Inconsistent ranking for core business keywords",
  "Lack of comprehensive technical SEO monitoring"
]

const solutionSteps = [
  {
    title: "Comprehensive Technical Audit",
    description: "Full website crawl and analysis identifying 200+ technical SEO issues",
    icon: Server
  },
  {
    title: "Site Performance Optimization",
    description: "Core Web Vitals improvements and mobile optimization implementation",
    icon: Zap
  },
  {
    title: "Content & Keyword Strategy",
    description: "Advanced keyword research and content optimization for enterprise keywords",
    icon: Target
  },
  {
    title: "Ongoing AI Monitoring",
    description: "Continuous monitoring and automated optimization recommendations",
    icon: Cpu
  }
]

const results = [
  {
    metric: "Organic Traffic",
    value: "+520%",
    description: "Sustained enterprise-level traffic growth",
    icon: TrendingUp
  },
  {
    metric: "Keyword Rankings",
    value: "200+",
    description: "Keywords ranking in top 5 positions",
    icon: Target
  },
  {
    metric: "Lead Quality",
    value: "+85%",
    description: "Improved lead quality and conversion rates",
    icon: Users
  },
  {
    metric: "Cost per Lead",
    value: "-65%",
    description: "Significant reduction in acquisition costs",
    icon: BarChart3
  }
]

const timeline = [
  {
    month: "Month 1-2",
    title: "Discovery & Audit Phase",
    description: "Comprehensive technical audit and competitor analysis",
    results: ["500+ page technical audit completed", "200+ SEO issues identified", "Competitor gap analysis finished"]
  },
  {
    month: "Month 3-4",
    title: "Implementation Phase",
    description: "Technical fixes, content optimization, and site improvements",
    results: ["Site speed improved by 40%", "Mobile optimization completed", "100+ pages optimized"]
  },
  {
    month: "Month 5-8",
    title: "Optimization & Scale",
    description: "Advanced keyword targeting and continuous optimization",
    results: ["+520% traffic increase achieved", "200+ top 5 keyword rankings", "Lead quality improved by 85%"]
  }
]

export default function TechFlowSolutionsCaseStudy() {
  return (
    <MainLayout>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-8" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                Home
              </Link>
              <span className="text-gray-600" aria-hidden="true">/</span>
              <Link href="/case-studies" className="text-gray-400 hover:text-white transition-colors">
                Case Studies
              </Link>
              <span className="text-gray-600" aria-hidden="true">/</span>
              <span className="text-white">TechFlow Solutions</span>
            </nav>

            {/* Hero Content */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500/10 rounded-full mb-6">
                <Server className="w-10 h-10 text-blue-400" aria-hidden="true" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  TechFlow Solutions
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Enterprise SEO Transformation
                </span>
              </h1>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                How a leading SaaS company overcame complex technical challenges to achieve
                520% organic traffic growth and dominate enterprise search results.
              </p>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {results.map((result) => (
                  <div key={result.metric} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <result.icon className="w-8 h-8 text-blue-400 mx-auto mb-2" aria-hidden="true" />
                    <div className="text-2xl font-bold text-blue-400 mb-1">{result.value}</div>
                    <div className="text-sm text-gray-400">{result.metric}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/features/seo-audit">
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 border border-blue-500/20">
                    <Target className="w-5 h-5 mr-2" aria-hidden="true" />
                    Get Your Enterprise SEO Audit
                  </Button>
                </Link>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                  <Share2 className="w-5 h-5 mr-2" aria-hidden="true" />
                  Share This Success Story
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  The Challenge: Enterprise-Scale SEO Complexity
                </h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  TechFlow Solutions is a leading enterprise SaaS platform serving Fortune 500 companies.
                  Despite their market leadership, they struggled with poor search visibility due to
                  complex technical SEO issues across their extensive website.
                </p>
                <ul className="space-y-3" role="list">
                  {challengePoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" aria-hidden="true"></div>
                      <span className="text-gray-300">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-400 mb-2">500+</div>
                  <div className="text-gray-400 mb-4">Website Pages</div>
                  <div className="text-4xl font-bold text-red-400 mb-2">200+</div>
                  <div className="text-gray-400">Technical SEO Issues</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">
              The Solution: Comprehensive Enterprise SEO Strategy
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              TechFlow Solutions implemented a full-scale enterprise SEO transformation
              using AI SEO Turbo's advanced technical auditing and optimization capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutionSteps.map((step, index) => (
              <div key={index} className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 hover:border-slate-600 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-blue-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">
                8-Month Enterprise SEO Journey
              </h2>
              <p className="text-xl text-gray-400">
                From technical chaos to search dominance
              </p>
            </div>

            <div className="space-y-8">
              {timeline.map((phase, index) => (
                <div key={index} className="flex gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{phase.month.split('-')[0]}</span>
                    </div>
                  </div>
                  <div className="flex-1 bg-slate-800/50 rounded-xl p-8 border border-slate-700">
                    <h3 className="text-xl font-bold text-white mb-3">{phase.title}</h3>
                    <p className="text-gray-400 mb-4">{phase.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {phase.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                          <span className="text-gray-300 text-sm">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700">
              <div className="text-center mb-8">
                <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" aria-hidden="true" />
                <blockquote className="text-2xl text-white font-medium mb-6 leading-relaxed">
                  "The depth of analysis and actionable insights from AI SEO Turbo are unparalleled.
                  We've seen results that exceeded our wildest expectations. The enterprise-level
                  technical SEO capabilities transformed our search presence completely."
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <span className="text-blue-400 font-bold">MR</span>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold">Michael Rodriguez</div>
                    <div className="text-gray-400">CTO, TechFlow Solutions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Achievements Section */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">
                Technical SEO Achievements
              </h2>
              <p className="text-xl text-gray-400">
                Enterprise-level technical improvements that drove massive results
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">Site Performance</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-300">40% improvement in page load speed</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-300">100% Core Web Vitals compliance</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-300">Mobile optimization completed</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">SEO Infrastructure</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-300">XML sitemap optimization</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-300">Schema markup implementation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-300">Internal linking structure optimized</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* ROI Calculator */}
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-8 border border-blue-500/20">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Enterprise ROI Impact</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">680%</div>
                  <div className="text-gray-400">Overall ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">$2.3M</div>
                  <div className="text-gray-400">Additional Annual Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">4 months</div>
                  <div className="text-gray-400">ROI Payback Period</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              More Enterprise Success Stories
            </h2>
            <p className="text-gray-400 mb-12">
              See how other businesses achieved remarkable results with AI SEO Turbo
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link href="/case-studies/digital-growth-agency" className="group">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-400" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors">
                        Digital Growth Agency
                      </h3>
                      <p className="text-gray-400 text-sm">Agency Workflow Transformation</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    340% traffic increase for digital marketing agency
                  </p>
                  <div className="flex items-center text-green-400 text-sm font-medium">
                    Read Case Study
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </div>
                </div>
              </Link>

              <Link href="/case-studies/cloudsync-pro" className="group">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-purple-400" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                        CloudSync Pro
                      </h3>
                      <p className="text-gray-400 text-sm">B2B Lead Generation</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    350% qualified leads increase for B2B SaaS
                  </p>
                  <div className="flex items-center text-purple-400 text-sm font-medium">
                    Read Case Study
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full mb-6">
              <Server className="w-8 h-8 text-blue-400" aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Enterprise SEO?
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed text-lg">
              Join TechFlow Solutions and other enterprise leaders achieving remarkable
              SEO results with AI-powered technical optimization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/features/seo-audit">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 border border-blue-500/20">
                  <Target className="w-5 h-5 mr-2" aria-hidden="true" />
                  Get Your Enterprise SEO Audit
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                  <Users className="w-5 h-5 mr-2" aria-hidden="true" />
                  Talk to Enterprise Experts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
