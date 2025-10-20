import { MainLayout } from "@/components/layout/main-layout"
import { Breadcrumbs } from "@/components/navigation/breadcrumbs"
import { StructuredData, generateCaseStudySchema } from "@/components/seo/StructuredData"
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
  ShoppingCart,
  Package,
  CreditCard,
  Search
} from "lucide-react"

// SEO metadata
export const metadata: Metadata = {
  title: 'E-commerce SEO - 420% Sales Growth | AI SEO Turbo',
  description: 'E-commerce fashion boutique case study: 280% organic traffic growth, 300+ ranked product pages, 420% conversion increase with AI-powered SEO.',
  keywords: [
    'ecommerce SEO case study',
    'product page optimization',
    'online store SEO',
    'fashion boutique SEO',
    'conversion rate optimization',
    'product ranking SEO',
    'retail SEO success'
  ],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/case-studies/stylecraft-boutique'
  },
  openGraph: {
    images: ['/logo.png'],
    title: 'E-commerce SEO Case Study - 420% Sales Increase StyleCraft Boutique | AI SEO Turbo',
    description: 'E-commerce fashion boutique case study: 280% organic traffic growth, 300+ ranked product pages, 420% conversion increase with AI-powered SEO.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-commerce SEO Case Study - 420% Sales Increase StyleCraft Boutique | AI SEO Turbo',
    description: 'E-commerce fashion boutique case study: 280% organic traffic growth, 300+ ranked product pages, 420% conversion increase with AI-powered SEO.',
  }
}

const challengePoints = [
  "Poor product page optimization leading to low search visibility",
  "High bounce rates from unoptimized product descriptions",
  "Missing product schema markup and rich snippets",
  "Inconsistent category and product page structure",
  "Lack of mobile-optimized shopping experience"
]

const solutionSteps = [
  {
    title: "Product Page Optimization",
    description: "AI-powered product description enhancement and keyword optimization",
    icon: Package
  },
  {
    title: "Technical SEO Fixes",
    description: "Site speed optimization, mobile improvements, and schema implementation",
    icon: Zap
  },
  {
    title: "Category Structure",
    description: "Optimized product categorization and internal linking architecture",
    icon: Search
  },
  {
    title: "Conversion Optimization",
    description: "Enhanced product pages and checkout flow optimization",
    icon: CreditCard
  }
]

const results = [
  {
    metric: "Online Sales",
    value: "+420%",
    description: "Revenue growth from organic traffic",
    icon: ShoppingCart
  },
  {
    metric: "Product Rankings",
    value: "300+",
    description: "Product pages ranking in search results",
    icon: Target
  },
  {
    metric: "Bounce Rate",
    value: "-45%",
    description: "Reduction in bounce rates",
    icon: TrendingUp
  },
  {
    metric: "Avg Order Value",
    value: "+25%",
    description: "Increased average order value",
    icon: CreditCard
  }
]

const timeline = [
  {
    month: "Month 1",
    title: "Audit & Analysis Phase",
    description: "Comprehensive e-commerce SEO audit and product catalog analysis",
    results: ["Product catalog audit completed", "Technical SEO issues identified", "Keyword opportunities mapped"]
  },
  {
    month: "Month 2",
    title: "Content & Technical Optimization",
    description: "Product page optimization and technical SEO implementation",
    results: ["200+ product pages optimized", "Schema markup implemented", "Site speed improved by 35%"]
  },
  {
    month: "Month 3-4",
    title: "Scale & Conversion Focus",
    description: "Category optimization and conversion rate improvements",
    results: ["+420% sales increase achieved", "300+ product pages ranking", "Mobile experience optimized"]
  }
]

export default function StyleCraftBoutiqueCaseStudy() {
  const caseStudySchema = generateCaseStudySchema({
    title: "StyleCraft Boutique: E-commerce SEO Success - 420% Conversion Increase",
    description: "Comprehensive e-commerce SEO case study showing how StyleCraft Boutique transformed their online retail performance with AI-powered optimization.",
    datePublished: "2024-10-14T10:00:00+00:00",
    dateModified: "2025-10-17T10:00:00+00:00",
    url: "https://www.aiseoturbo.com/case-studies/stylecraft-boutique",
    companyName: "StyleCraft Boutique",
    industry: "E-commerce - Fashion Retail",
    reviewRating: 5,
    reviewAuthor: "Emma Thompson",
    reviewText: "Our online sales have never been better. AI SEO Turbo helped us understand exactly what our customers were searching for. We went from being a local boutique to a digital retail leader, and our revenue reflects that transformation."
  });

  return (
    <MainLayout>
      <StructuredData data={caseStudySchema} />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <Breadcrumbs
              items={[
                { name: 'Case Studies', url: 'https://www.aiseoturbo.com/case-studies' },
                { name: 'StyleCraft Boutique', url: 'https://www.aiseoturbo.com/case-studies/stylecraft-boutique' }
              ]}
              darkMode={true}
              className="mb-8"
            />

            {/* Hero Content */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-pink-500/10 rounded-full mb-6">
                <ShoppingCart className="w-10 h-10 text-pink-400" aria-hidden="true" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  StyleCraft Boutique
                </span>
                <br />
                <span className="bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">
                  E-commerce SEO Success
                </span>
              </h1>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                How a fashion boutique transformed their online retail performance,
                achieving 420% sales growth through AI-powered product optimization.
              </p>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {results.map((result) => (
                  <div key={result.metric} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <result.icon className="w-8 h-8 text-pink-400 mx-auto mb-2" aria-hidden="true" />
                    <div className="text-2xl font-bold text-pink-400 mb-1">{result.value}</div>
                    <div className="text-sm text-gray-400">{result.metric}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/features/seo-audit">
                  <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-pink-600/25 hover:shadow-xl hover:shadow-pink-500/30 hover:scale-105 border border-pink-500/20">
                    <Target className="w-5 h-5 mr-2" aria-hidden="true" />
                    Optimize Your E-commerce SEO
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
                  The Challenge: Invisible in Online Retail
                </h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  StyleCraft Boutique was a beloved local fashion retailer with high-quality products
                  and excellent customer service. However, their online presence was struggling with
                  poor search visibility and ineffective product optimization.
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
                  <div className="text-4xl font-bold text-red-400 mb-2">78%</div>
                  <div className="text-gray-400 mb-4">Bounce Rate</div>
                  <div className="text-4xl font-bold text-red-400 mb-2">$45</div>
                  <div className="text-gray-400">Average Order Value</div>
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
              The Solution: AI-Powered E-commerce Optimization
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              StyleCraft Boutique implemented comprehensive e-commerce SEO strategies
              using AI SEO Turbo's specialized retail optimization features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutionSteps.map((step, index) => (
              <div key={index} className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 hover:border-slate-600 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-pink-400" aria-hidden="true" />
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
                4-Month E-commerce Transformation
              </h2>
              <p className="text-xl text-gray-400">
                From local boutique to online retail leader
              </p>
            </div>

            <div className="space-y-8">
              {timeline.map((phase, index) => (
                <div key={index} className="flex gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{phase.month.split(' ')[1]}</span>
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
                  "Our online sales have never been better. AI SEO Turbo helped us understand exactly
                  what our customers were searching for. We went from being a local boutique to a
                  digital retail leader, and our revenue reflects that transformation."
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-pink-500/10 rounded-full flex items-center justify-center">
                    <span className="text-pink-400 font-bold">ET</span>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold">Emma Thompson</div>
                    <div className="text-gray-400">Owner, StyleCraft Boutique</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* E-commerce Achievements Section */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">
                E-commerce SEO Achievements
              </h2>
              <p className="text-xl text-gray-400">
                Retail-specific optimizations that drove massive conversion growth
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">Product Performance</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-300">300+ product pages ranking in search</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-300">45% reduction in bounce rates</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-300">25% increase in average order value</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">Technical Improvements</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-300">Product schema markup implemented</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-300">Mobile shopping experience optimized</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-300">Category page structure improved</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* ROI Calculator */}
            <div className="bg-gradient-to-r from-pink-900/20 to-purple-900/20 rounded-xl p-8 border border-pink-500/20">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Retail ROI Impact</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-400 mb-2">380%</div>
                  <div className="text-gray-400">Overall ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">$185K</div>
                  <div className="text-gray-400">Additional Annual Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">2 months</div>
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
              <Link href="/case-studies/gearhub-pro" className="group">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-orange-400" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                        GearHub Pro
                      </h3>
                      <p className="text-gray-400 text-sm">Niche E-commerce Leadership</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    290% conversion increase for specialty retailer
                  </p>
                  <div className="flex items-center text-orange-400 text-sm font-medium">
                    Read Case Study
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </div>
                </div>
              </Link>

              <Link href="/case-studies/peak-performance" className="group">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-blue-400" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                        Peak Performance
                      </h3>
                      <p className="text-gray-400 text-sm">Local SEO Domination</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    Local pack #1 for 15 service categories
                  </p>
                  <div className="flex items-center text-blue-400 text-sm font-medium">
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-500/10 rounded-full mb-6">
              <ShoppingCart className="w-8 h-8 text-pink-400" aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Online Retail?
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed text-lg">
              Join StyleCraft Boutique and thousands of online retailers achieving
              remarkable e-commerce SEO results with AI-powered optimization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/features/seo-audit">
                <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-pink-600/25 hover:shadow-xl hover:shadow-pink-500/30 hover:scale-105 border border-pink-500/20">
                  <Target className="w-5 h-5 mr-2" aria-hidden="true" />
                  Get Your E-commerce SEO Audit
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                  <Users className="w-5 h-5 mr-2" aria-hidden="true" />
                  Talk to Retail Experts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
