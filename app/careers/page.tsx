import { MainLayout } from "@/components/layout/main-layout"
import { generateSEOMeta } from "@/lib/seo"
import { Metadata } from 'next'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Users,
  Target,
  Heart,
  Zap,
  MapPin,
  Clock,
  DollarSign,
  ArrowRight,
  CheckCircle
} from "lucide-react"

// SEO metadata
export const metadata: Metadata = generateSEOMeta({
  title: "Careers - Join AI SEO Turbo",
  description: "Join our mission to revolutionize SEO with AI. We're looking for talented individuals passionate about search engine optimization and cutting-edge technology.",
  keywords: ["careers", "jobs", "SEO", "AI", "technology", "remote work"],
  canonical: "/careers"
})

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We're on a mission to democratize SEO insights and help businesses succeed online."
  },
  {
    icon: Zap,
    title: "Innovation First",
    description: "We embrace cutting-edge AI technology and push the boundaries of what's possible."
  },
  {
    icon: Heart,
    title: "People Focused",
    description: "Our team comes first. We invest in growth, well-being, and work-life balance."
  },
  {
    icon: Users,
    title: "Collaborative",
    description: "We believe the best solutions come from diverse perspectives and teamwork."
  }
]

const benefits = [
  "Competitive salary & equity",
  "100% remote work",
  "Flexible hours",
  "Health, dental & vision insurance",
  "Unlimited PTO",
  "Professional development budget",
  "Home office stipend",
  "Team retreats & events"
]

const openPositions = [
  {
    title: "Senior Full-Stack Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$120k - $160k",
    description: "Build scalable web applications and APIs that power our AI-driven SEO platform."
  },
  {
    title: "SEO Specialist",
    department: "Product",
    location: "Remote",
    type: "Full-time",
    salary: "$80k - $110k",
    description: "Drive organic growth strategies and optimize our content for search engines."
  },
  {
    title: "AI/ML Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$130k - $180k",
    description: "Develop and improve our machine learning models for SEO analysis and recommendations."
  },
  {
    title: "Product Manager",
    department: "Product",
    location: "Remote",
    type: "Full-time",
    salary: "$110k - $140k",
    description: "Define product strategy and work closely with engineering to deliver exceptional user experiences."
  }
]

export default function CareersPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full mb-6">
              <Users className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Join Our Team
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Help us revolutionize SEO with AI. We're building the future of search engine optimization
              and looking for passionate individuals to join our mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#positions">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 border border-blue-500/20">
                  View Open Positions
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              These principles guide everything we do and shape the culture we build together.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <div key={value.title} className="text-center">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Why Join AI SEO Turbo?</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                We offer more than just a job. We provide an environment where you can grow,
                learn, and make a real impact on the future of SEO.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">Our Culture</h3>
              <p className="text-gray-400 mb-6">
                We're a small, focused team that values transparency, collaboration, and innovation.
                Every team member has a direct impact on our product and company direction.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Team Size</span>
                  <span className="text-white font-semibold">15 people</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Remote Work</span>
                  <span className="text-green-400 font-semibold">100%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Avg. Tenure</span>
                  <span className="text-white font-semibold">2.5 years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Growth Rate</span>
                  <span className="text-blue-400 font-semibold">300% YoY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Open Positions</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We're always looking for talented individuals to join our growing team.
              Check out our current openings below.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {openPositions.map((position) => (
              <div key={position.title} className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 hover:border-slate-700 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{position.title}</h3>
                    <p className="text-blue-400 text-sm font-medium">{position.department}</p>
                  </div>
                  <div className="text-right text-sm text-gray-400">
                    <div className="flex items-center mb-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {position.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {position.type}
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed">{position.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-green-400">
                    <DollarSign className="w-4 h-4 mr-1" />
                    <span className="font-semibold">{position.salary}</span>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105">
                    Apply Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Don't See Your Role?</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              We're always interested in meeting talented people. Send us your resume and let's talk about
              how you can contribute to our mission.
            </p>
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-purple-600/25 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105 border border-purple-500/20">
                Send Us Your Resume
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}