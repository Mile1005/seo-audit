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
  Package,
  Crown,
  TrendingDown,
  Heart,
  MapPin,
  Trophy
} from "lucide-react"

// SEO metadata
export const metadata: Metadata = {
  title: 'Outdoor Gear SEO - 290% Conversions | AI SEO Turbo',
  description: 'Outdoor gear e-commerce case study: 380% organic traffic growth, 250+ niche keywords ranked, 290% conversion increase with specialized SEO.',
  keywords: [
    'outdoor gear SEO case study',
    'niche e-commerce optimization',
    'specialty retail SEO',
    'outdoor equipment keywords',
    'hiking gear SEO',
    'camping equipment optimization',
    'niche market conversion SEO'
  ],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/case-studies/gearhub-pro'
  },
  openGraph: {
    title: 'Outdoor Gear E-commerce SEO Case Study - 290% Conversions GearHub Pro | AI SEO Turbo',
    description: 'Outdoor gear e-commerce case study: 380% organic traffic growth, 250+ niche keywords ranked, 290% conversion increase with specialized SEO.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Outdoor Gear E-commerce SEO Case Study - 290% Conversions GearHub Pro | AI SEO Turbo',
    description: 'Outdoor gear e-commerce case study: 380% organic traffic growth, 250+ niche keywords ranked, 290% conversion increase with specialized SEO.',
  }
}

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "GearHub Pro: Niche E-commerce Leadership - 290% Conversion Increase",
  "description": "Comprehensive niche e-commerce case study showing how GearHub Pro became the go-to resource in their specialized market through strategic SEO optimization.",
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
    "@id": "https://www.aiseoturbo.com/case-studies/gearhub-pro"
  },
  "about": [
    {
      "@type": "Thing",
      "name": "Niche E-commerce SEO"
    },
    {
      "@type": "Thing",
      "name": "Specialty Retail"
    },
    {
      "@type": "Thing",
      "name": "Niche Market Strategy"
    }
  ]
}

const challengePoints = [
  "Struggling to compete with larger e-commerce players in specialized niche",
  "Poor visibility for highly specific product searches and long-tail keywords",
  "Limited brand authority in the specialized community",
  "Difficulty attracting qualified customers who understood the niche",
  "High competition from general retailers selling similar products"
]

const solutionSteps = [
  {
    title: "Niche Keyword Targeting",
    description: "Deep analysis of specialized search terms and long-tail keyword opportunities",
    icon: Target
  },
  {
    title: "Technical SEO Optimization",
    description: "Site performance improvements and specialized product schema implementation",
    icon: Zap
  },
  {
    title: "Content Marketing Strategy",
    description: "Niche-specific content creation and thought leadership positioning",
    icon: Crown
  },
  {
    title: "Community Engagement",
    description: "Building authority through specialized community and expert positioning",
    icon: Heart
  }
]

const results = [
  {
    metric: "Niche Traffic",
    value: "+380%",
    description: "Growth in specialized search traffic",
    icon: TrendingUp
  },
  {
    metric: "Niche Keywords",
    value: "250+",
    description: "Specialized keywords ranking",
    icon: Target
  },
  {
    metric: "Conversions",
    value: "+290%",
    description: "Conversion rate improvement",
    icon: Package
  },
  {
    metric: "Repeat Customers",
    value: "+65%",
    description: "Loyal customer growth",
    icon: Heart
  }
]

const timeline = [
  {
    month: "Month 1-2",
    title: "Niche Research & Strategy",
    description: "Deep niche analysis, competitor research, and specialized keyword mapping",
    results: ["Niche opportunity analysis completed", "Specialized keyword strategy developed", "Competitor positioning assessed"]
  },
  {
    month: "Month 3-4",
    title: "Content & Technical Optimization",
    description: "Niche content creation and technical SEO implementation",
    results: ["50+ specialized content pieces created", "Technical SEO optimized", "Product schema implemented"]
  },
  {
    month: "Month 5-7",
    title: "Authority Building & Scale",
    description: "Community engagement and advanced niche targeting",
    results: ["250+ niche keywords ranking", "380% traffic increase", "65% repeat customer growth"]
  }
]

export default function GearHubProCaseStudy() {
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
              <span className="text-white">GearHub Pro</span>
            </nav>

            {/* Hero Content */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500/10 rounded-full mb-6">
                <Crown className="w-10 h-10 text-yellow-400" aria-hidden="true" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  GearHub Pro
                </span>
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-600 bg-clip-text text-transparent">
                  Niche Market Leadership
                </span>
              </h1>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                How a specialty e-commerce store carved out market leadership in a competitive niche,
                achieving 380% traffic growth and becoming the go-to resource for specialized products.
              </p>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {results.map((result) => (
                  <div key={result.metric} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <result.icon className="w-8 h-8 text-yellow-400 mx-auto mb-2" aria-hidden="true" />
                    <div className="text-2xl font-bold text-yellow-400 mb-1">{result.value}</div>
                    <div className="text-sm text-gray-400">{result.metric}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/features/seo-audit">
                  <Button className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-yellow-600/25 hover:shadow-xl hover:shadow-yellow-500/30 hover:scale-105 border border-yellow-500/20">
                    <Target className="w-5 h-5 mr-2" aria-hidden="true" />
                    Dominate Your Niche Market
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
                  The Challenge: Lost in a Crowded Niche
                </h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  GearHub Pro specialized in high-end specialty gear for a specific enthusiast community.
                  Despite quality products and passionate customers, they were struggling to stand out
                  in a market dominated by larger retailers who treated their niche as an afterthought.
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
                  <div className="text-4xl font-bold text-red-400 mb-2">35%</div>
                  <div className="text-gray-400 mb-4">Market Share</div>
                  <div className="text-4xl font-bold text-red-400 mb-2">Page 5+</div>
                  <div className="text-gray-400">Niche Search Rankings</div>
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
              The Solution: Strategic Niche Market Domination
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              GearHub Pro implemented a specialized SEO strategy using AI SEO Turbo's advanced
              niche keyword research and content optimization capabilities tailored for specialty markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutionSteps.map((step, index) => (
              <div key={index} className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 hover:border-slate-600 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-yellow-400" aria-hidden="true" />
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
                7-Month Niche Leadership Journey
              </h2>
              <p className="text-xl text-gray-400">
                From niche player to market authority
              </p>
            </div>

            <div className="space-y-8">
              {timeline.map((phase, index) => (
                <div key={index} className="flex gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full flex items-center justify-center">
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
                  "AI SEO Turbo helped us carve out our space in a competitive niche. We've become the
                  go-to resource for our specialty, and our customers now find us first when they're
                  searching for authentic, specialized products in our category."
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center">
                    <span className="text-yellow-400 font-bold">AR</span>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold">Alex Rivera</div>
                    <div className="text-gray-400">Founder, GearHub Pro</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Niche Achievements Section */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">
                Niche Market Achievements
              </h2>
              <p className="text-xl text-gray-400">
                Specialized optimizations that established market leadership
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">Niche Search Performance</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-300">250+ specialized niche keywords ranking</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-300">380% increase in niche search traffic</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-300">45% market share growth in specialty category</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">Authority & Community</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-300">320% increase in brand authority</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-300">65% growth in repeat customers</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-300">Established as thought leader in specialty niche</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* ROI Calculator */}
            <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-xl p-8 border border-yellow-500/20">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Niche Market ROI Impact</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">410%</div>
                  <div className="text-gray-400">Overall ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">$165K</div>
                  <div className="text-gray-400">Additional Annual Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">5 months</div>
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
              More E-commerce Success Stories
            </h2>
            <p className="text-gray-400 mb-12">
              See how other online retailers achieved remarkable results with AI SEO Turbo
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link href="/case-studies/stylecraft-boutique" className="group">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-pink-400" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-pink-400 transition-colors">
                        StyleCraft Boutique
                      </h3>
                      <p className="text-gray-400 text-sm">E-commerce SEO Success</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    420% conversion increase for fashion retailer
                  </p>
                  <div className="flex items-center text-pink-400 text-sm font-medium">
                    Read Case Study
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </div>
                </div>
              </Link>

              <Link href="/case-studies/peak-performance" className="group">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-orange-400" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                        Peak Performance
                      </h3>
                      <p className="text-gray-400 text-sm">Local SEO Domination</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    Local pack #1 for 15 service categories
                  </p>
                  <div className="flex items-center text-orange-400 text-sm font-medium">
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/10 rounded-full mb-6">
              <Crown className="w-8 h-8 text-yellow-400" aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Lead Your Niche Market?
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed text-lg">
              Join GearHub Pro and other specialty businesses achieving remarkable niche market
              success with AI-powered specialized SEO strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/features/seo-audit">
                <Button className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-yellow-600/25 hover:shadow-xl hover:shadow-yellow-500/30 hover:scale-105 border border-yellow-500/20">
                  <Target className="w-5 h-5 mr-2" aria-hidden="true" />
                  Get Your Niche SEO Audit
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                  <Users className="w-5 h-5 mr-2" aria-hidden="true" />
                  Talk to Niche Experts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
