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
  Cloud,
  Briefcase,
  DollarSign,
  UserCheck
} from "lucide-react"

// SEO metadata
export const metadata: Metadata = {
  title: 'B2B SaaS SEO - 350% Lead Generation | AI SEO Turbo',
  description: 'B2B SaaS company case study: 410% organic traffic growth, 180+ keywords ranked, 350% qualified leads with AI-powered content and strategy.',
  keywords: [
    'B2B lead generation case study',
    'SaaS SEO success',
    'qualified leads SEO',
    'B2B keyword strategy',
    'enterprise lead generation',
    'SaaS traffic growth',
    'content marketing SEO'
  ],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/case-studies/cloudsync-pro'
  },
  openGraph: {
    images: ['/logo.png'],
    url: 'https://www.aiseoturbo.com/case-studies/cloudsync-pro',
    siteName: 'AI SEO Turbo',
    title: 'B2B SaaS Lead Generation Case Study - 350% Leads CloudSync Pro | AI SEO Turbo',
    description: 'B2B SaaS company case study: 410% organic traffic growth, 180+ keywords ranked, 350% qualified leads with AI-powered content and strategy.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B2B SaaS Lead Generation Case Study - 350% Leads CloudSync Pro | AI SEO Turbo',
    description: 'B2B SaaS company case study: 410% organic traffic growth, 180+ keywords ranked, 350% qualified leads with AI-powered content and strategy.',
  }
}

const challengePoints = [
  "Struggling to generate qualified leads in competitive B2B market",
  "Poor brand awareness among enterprise decision-makers",
  "Ineffective content marketing and thought leadership positioning",
  "High cost per lead with traditional marketing channels",
  "Difficulty ranking for enterprise search queries"
]

const solutionSteps = [
  {
    title: "Advanced Keyword Research",
    description: "Deep analysis of enterprise search intent and long-tail keyword opportunities",
    icon: Target
  },
  {
    title: "Content Strategy Optimization",
    description: "AI-powered content recommendations for B2B buyer journey optimization",
    icon: Briefcase
  },
  {
    title: "Technical SEO Implementation",
    description: "Enterprise-level technical optimizations and site performance improvements",
    icon: Cloud
  },
  {
    title: "Lead Nurturing Integration",
    description: "SEO-driven lead magnets and conversion optimization",
    icon: UserCheck
  }
]

const results = [
  {
    metric: "Qualified Leads",
    value: "+350%",
    description: "Increase in marketing qualified leads",
    icon: Users
  },
  {
    metric: "Brand Awareness",
    value: "+290%",
    description: "Improvement in brand recognition",
    icon: Target
  },
  {
    metric: "Cost per Lead",
    value: "-55%",
    description: "Reduction in acquisition costs",
    icon: DollarSign
  },
  {
    metric: "Sales Cycle",
    value: "-30%",
    description: "Shorter time to conversion",
    icon: TrendingUp
  }
]

const timeline = [
  {
    month: "Month 1-2",
    title: "Research & Strategy Phase",
    description: "Comprehensive B2B keyword research and competitive analysis",
    results: ["Enterprise keyword mapping completed", "Buyer persona research finished", "Content strategy developed"]
  },
  {
    month: "Month 3-4",
    title: "Content & Optimization",
    description: "Content creation and technical SEO implementation",
    results: ["50+ B2B content pieces optimized", "Technical SEO issues resolved", "Lead magnets created"]
  },
  {
    month: "Month 5",
    title: "Scale & Conversion Focus",
    description: "Advanced targeting and conversion rate optimization",
    results: ["+350% leads achieved", "55% cost reduction", "30% shorter sales cycle"]
  }
]

export default function CloudSyncProCaseStudy() {
  const caseStudySchema = generateCaseStudySchema({
    title: "CloudSync Pro: B2B Lead Generation Success - 350% Qualified Leads Increase",
    description: "Comprehensive B2B SEO case study showing how CloudSync Pro transformed their lead generation with AI-powered content and keyword strategies.",
    datePublished: "2024-10-14T10:00:00+00:00",
    dateModified: "2025-10-17T10:00:00+00:00",
    url: "https://www.aiseoturbo.com/case-studies/cloudsync-pro",
    companyName: "CloudSync Pro",
    industry: "B2B SaaS",
    reviewRating: 5,
    reviewAuthor: "David Park",
    reviewText: "AI SEO Turbo gave us the competitive edge we needed in the B2B market. Our lead quality and quantity have dramatically improved, and we're now reaching enterprise decision-makers who were previously invisible to us. The ROI has been incredible."
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
                { name: 'CloudSync Pro', url: 'https://www.aiseoturbo.com/case-studies/cloudsync-pro' }
              ]}
              darkMode={true}
              className="mb-8"
            />

            {/* Hero Content */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-500/10 rounded-full mb-6">
                <Cloud className="w-10 h-10 text-purple-400" aria-hidden="true" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  CloudSync Pro
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-blue-600 bg-clip-text text-transparent">
                  B2B Lead Generation
                </span>
              </h1>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                How a B2B SaaS company transformed their lead generation pipeline,
                achieving 350% more qualified leads through strategic content and SEO optimization.
              </p>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {results.map((result) => (
                  <div key={result.metric} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <result.icon className="w-8 h-8 text-purple-400 mx-auto mb-2" aria-hidden="true" />
                    <div className="text-2xl font-bold text-purple-400 mb-1">{result.value}</div>
                    <div className="text-sm text-gray-400">{result.metric}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/features/seo-audit">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-purple-600/25 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105 border border-purple-500/20">
                    <Target className="w-5 h-5 mr-2" aria-hidden="true" />
                    Boost Your B2B Lead Generation
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
                  The Challenge: Invisible in B2B Search
                </h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  CloudSync Pro offered enterprise-grade cloud synchronization solutions but struggled
                  to reach their target audience of IT decision-makers and enterprise buyers. Despite
                  quality products, they lacked visibility in B2B search results.
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
                  <div className="text-4xl font-bold text-red-400 mb-2">$85</div>
                  <div className="text-gray-400 mb-4">Cost per Lead</div>
                  <div className="text-4xl font-bold text-red-400 mb-2">24</div>
                  <div className="text-gray-400">Days Sales Cycle</div>
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
              The Solution: Strategic B2B SEO & Content Marketing
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              CloudSync Pro implemented a comprehensive B2B SEO strategy using AI SEO Turbo's
              advanced keyword research and content optimization capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutionSteps.map((step, index) => (
              <div key={index} className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 hover:border-slate-600 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-purple-400" aria-hidden="true" />
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
                5-Month B2B Transformation
              </h2>
              <p className="text-xl text-gray-400">
                From B2B obscurity to lead generation powerhouse
              </p>
            </div>

            <div className="space-y-8">
              {timeline.map((phase, index) => (
                <div key={index} className="flex gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
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
                  "AI SEO Turbo gave us the competitive edge we needed in the B2B market. Our lead quality
                  and quantity have dramatically improved, and we're now reaching enterprise decision-makers
                  who were previously invisible to us. The ROI has been incredible."
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                    <span className="text-purple-400 font-bold">DP</span>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold">David Park</div>
                    <div className="text-gray-400">VP of Marketing, CloudSync Pro</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B2B Achievements Section */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">
                B2B Lead Generation Achievements
              </h2>
              <p className="text-xl text-gray-400">
                Enterprise-focused optimizations that transformed lead quality and quantity
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">Lead Quality Improvements</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-300">350% increase in qualified leads</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-300">85% higher lead-to-customer conversion</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-300">30% shorter sales cycle</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">Content & SEO Performance</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-300">180+ long-tail keywords ranking</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-300">290% brand awareness increase</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-300">Enterprise thought leadership established</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* ROI Calculator */}
            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl p-8 border border-purple-500/20">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">B2B Marketing ROI Impact</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">520%</div>
                  <div className="text-gray-400">Overall ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">$425K</div>
                  <div className="text-gray-400">Additional Annual Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">3 months</div>
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
              More B2B Success Stories
            </h2>
            <p className="text-gray-400 mb-12">
              See how other B2B companies achieved remarkable results with AI SEO Turbo
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link href="/case-studies/techflow-solutions" className="group">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-blue-400" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                        TechFlow Solutions
                      </h3>
                      <p className="text-gray-400 text-sm">Enterprise SEO Transformation</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    520% traffic increase for enterprise SaaS
                  </p>
                  <div className="flex items-center text-blue-400 text-sm font-medium">
                    Read Case Study
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </div>
                </div>
              </Link>

              <Link href="/case-studies/digital-growth-agency" className="group">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-green-400" aria-hidden="true" />
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
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-full mb-6">
              <Cloud className="w-8 h-8 text-purple-400" aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your B2B Lead Generation?
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed text-lg">
              Join CloudSync Pro and other B2B leaders achieving remarkable lead generation
              results with AI-powered SEO and content strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/features/seo-audit">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-purple-600/25 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105 border border-purple-500/20">
                  <Target className="w-5 h-5 mr-2" aria-hidden="true" />
                  Get Your B2B SEO Audit
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                  <Users className="w-5 h-5 mr-2" aria-hidden="true" />
                  Talk to B2B Experts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
