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
  ExternalLink
} from "lucide-react"
import { notFound } from 'next/navigation'

// SEO metadata
export const metadata: Metadata = {
  title: 'Digital Agency SEO - 340% Traffic Growth | AI SEO Turbo',
  description: 'Digital marketing agency case study: 340% organic traffic increase, 150+ top 10 keywords, 450% ROI with AI SEO Turbo and proven strategy.',
  keywords: [
    'digital marketing agency SEO case study',
    'SEO traffic growth',
    'organic traffic increase',
    'SEO ROI case study',
    'keyword ranking success',
    'SEO agency results',
    'AI SEO case study'
  ],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/case-studies/digital-growth-agency'
  },
  openGraph: {
    images: ['/logo.png'],
    url: 'https://www.aiseoturbo.com/case-studies/digital-growth-agency',
    siteName: 'AI SEO Turbo',
    title: 'Digital Marketing Agency SEO Success - 340% Traffic Growth Case Study | AI SEO Turbo',
    description: 'Digital marketing agency case study: 340% organic traffic increase, 150+ top 10 keywords, 450% ROI with AI SEO Turbo and proven strategy.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Marketing Agency SEO Success - 340% Traffic Growth Case Study | AI SEO Turbo',
    description: 'Digital marketing agency case study: 340% organic traffic increase, 150+ top 10 keywords, 450% ROI with AI SEO Turbo and proven strategy.',
  }
}

const challengePoints = [
  "Manual SEO processes consuming 40+ hours weekly per client",
  "Inconsistent results across different client campaigns",
  "Difficulty scaling SEO efforts for growing client portfolio",
  "High client churn due to unpredictable results",
  "Limited ability to provide data-driven recommendations"
]

const solutionSteps = [
  {
    title: "AI-Powered Audit Implementation",
    description: "Deployed automated SEO audits that scan websites 10x faster than manual processes",
    icon: Zap
  },
  {
    title: "Competitor Analysis Integration",
    description: "Real-time competitor tracking and gap analysis for strategic advantage",
    icon: BarChart3
  },
  {
    title: "Content Optimization Engine",
    description: "AI-driven content recommendations that improved on-page SEO scores by 85%",
    icon: Target
  },
  {
    title: "Workflow Automation",
    description: "Streamlined reporting and client communication processes",
    icon: Globe
  }
]

const results = [
  {
    metric: "Organic Traffic",
    value: "+340%",
    description: "Consistent month-over-month growth across all client sites",
    icon: TrendingUp
  },
  {
    metric: "Keyword Rankings",
    value: "150+",
    description: "Keywords ranking in top 10 positions",
    icon: Target
  },
  {
    metric: "Client Retention",
    value: "+85%",
    description: "Improved client satisfaction and loyalty",
    icon: Users
  },
  {
    metric: "Time Efficiency",
    value: "60%",
    description: "Reduction in manual SEO work hours",
    icon: Zap
  }
]

const timeline = [
  {
    month: "Month 1",
    title: "Implementation & Training",
    description: "Team training on AI SEO Turbo platform and initial client migrations",
    results: ["Platform setup completed", "Team fully trained", "First client migrated"]
  },
  {
    month: "Month 2-3",
    title: "Optimization Phase",
    description: "Active implementation of AI recommendations across client portfolios",
    results: ["+120% traffic increase", "50+ keywords improved", "Client feedback positive"]
  },
  {
    month: "Month 4-6",
    title: "Scale & Refinement",
    description: "Expanded to all clients with refined processes and reporting",
    results: ["+340% total traffic growth", "150+ top 10 rankings", "85% client retention increase"]
  }
]

export default function DigitalGrowthAgencyCaseStudy() {
  const caseStudySchema = generateCaseStudySchema({
    title: "Digital Growth Agency: 340% Traffic Increase with AI SEO Turbo",
    description: "How Digital Growth Agency achieved 340% organic traffic growth using AI-powered SEO tools and automation.",
    datePublished: "2024-10-14T10:00:00+00:00",
    dateModified: "2025-10-17T10:00:00+00:00",
    url: "https://www.aiseoturbo.com/case-studies/digital-growth-agency",
    companyName: "Digital Growth Agency",
    industry: "Digital Marketing Agency",
    reviewRating: 5,
    reviewAuthor: "Sarah Chen",
    reviewText: "AI SEO Turbo transformed our agency workflow. We now deliver consistent results and have increased our client retention by 85%. The AI insights are like having a team of SEO experts working 24/7."
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
                { name: 'Digital Growth Agency', url: 'https://www.aiseoturbo.com/case-studies/digital-growth-agency' }
              ]}
              darkMode={true}
              className="mb-8"
            />

            {/* Hero Content */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/10 rounded-full mb-6">
                <Award className="w-10 h-10 text-green-400" aria-hidden="true" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  Digital Growth Agency
                </span>
                <br />
                <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                  340% Traffic Increase
                </span>
              </h1>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                How a digital marketing agency transformed their workflow and client results using AI-powered SEO automation.
              </p>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {results.map((result) => (
                  <div key={result.metric} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <result.icon className="w-8 h-8 text-green-400 mx-auto mb-2" aria-hidden="true" />
                    <div className="text-2xl font-bold text-green-400 mb-1">{result.value}</div>
                    <div className="text-sm text-gray-400">{result.metric}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/features/seo-audit">
                  <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-green-600/25 hover:shadow-xl hover:shadow-green-500/30 hover:scale-105 border border-green-500/20">
                    <Target className="w-5 h-5 mr-2" aria-hidden="true" />
                    Get Your Free SEO Audit
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
                  The Challenge: Manual SEO Struggles
                </h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Digital Growth Agency was a fast-growing digital marketing firm serving 50+ clients.
                  Despite their expertise, they struggled with manual SEO processes that consumed
                  excessive time and delivered inconsistent results.
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
                  <div className="text-4xl font-bold text-red-400 mb-2">40+</div>
                  <div className="text-gray-400 mb-4">Hours per week per client</div>
                  <div className="text-4xl font-bold text-red-400 mb-2">65%</div>
                  <div className="text-gray-400">Client churn rate</div>
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
              The Solution: AI-Powered SEO Automation
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              Digital Growth Agency partnered with AI SEO Turbo to transform their SEO workflow
              with intelligent automation and data-driven insights.
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
                Implementation Timeline & Results
              </h2>
              <p className="text-xl text-gray-400">
                A 6-month journey from manual processes to AI-powered success
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
                  "AI SEO Turbo transformed our agency workflow. We now deliver consistent results
                  and have increased our client retention by 85%. The AI insights are like having
                  a team of SEO experts working 24/7."
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <span className="text-blue-400 font-bold">SC</span>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold">Sarah Chen</div>
                    <div className="text-gray-400">CEO, Digital Growth Agency</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Results Section */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">
                Measurable Business Impact
              </h2>
              <p className="text-xl text-gray-400">
                Beyond the numbers: how AI SEO Turbo transformed their business
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">Client Portfolio Growth</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-300">Expanded from 50 to 75 active clients</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-300">85% increase in client retention</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-300">Premium pricing model successfully implemented</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">Operational Efficiency</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-300">60% reduction in manual SEO work</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-300">10x faster website audits</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-300">Automated monthly reporting</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* ROI Calculator */}
            <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-xl p-8 border border-green-500/20">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Return on Investment</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">450%</div>
                  <div className="text-gray-400">Overall ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">3.2x</div>
                  <div className="text-gray-400">Revenue Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">6 months</div>
                  <div className="text-gray-400">Payback Period</div>
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
              More Success Stories
            </h2>
            <p className="text-gray-400 mb-12">
              See how other businesses achieved remarkable results with AI SEO Turbo
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
                    520% traffic increase for enterprise SaaS company
                  </p>
                  <div className="flex items-center text-blue-400 text-sm font-medium">
                    Read Case Study
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </div>
                </div>
              </Link>

              <Link href="/case-studies/stylecraft-boutique" className="group">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-green-400" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors">
                        StyleCraft Boutique
                      </h3>
                      <p className="text-gray-400 text-sm">E-commerce SEO Success</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    420% conversion increase for fashion retailer
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full mb-6">
              <TrendingUp className="w-8 h-8 text-blue-400" aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your SEO Results?
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed text-lg">
              Join Digital Growth Agency and hundreds of other businesses achieving
              remarkable SEO results with AI-powered automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/features/seo-audit">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 border border-blue-500/20">
                  <Target className="w-5 h-5 mr-2" aria-hidden="true" />
                  Get Your Free SEO Audit
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                  <Users className="w-5 h-5 mr-2" aria-hidden="true" />
                  Talk to Our Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
