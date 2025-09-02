"use client"

import React from "react"
import { MainLayout } from "../../components/layout/main-layout"
import { PricingCards } from "../../components/pricing/pricing-cards"
import { ROICalculator } from "../../components/pricing/roi-calculator"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Zap, Star, Crown, Users, Clock, Shield, Phone } from "lucide-react"
import { EmailCaptureInline } from "../../components/lead/email-capture-inline"
import { handleCTAClick } from "../../lib/cta-utils"

export default function PricingPage() {
  const faqData = [
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. Your account will remain active until the end of your current billing period."
    },
    {
      question: "Is there a free trial for paid plans?",
      answer: "Yes! We offer a 14-day free trial for both Pro and Agency plans. No credit card required to start your trial."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual subscriptions."
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "Absolutely! You can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately, and we'll prorate the billing accordingly."
    },
    {
      question: "Do you offer custom enterprise plans?",
      answer: "Yes, for large organizations with specific needs, we offer custom enterprise solutions. Contact our sales team to discuss your requirements."
    },
    {
      question: "What kind of support do you provide?",
      answer: "Free users get email support, Pro users get priority email support, and Agency users get dedicated phone and Slack support with a dedicated account manager."
    }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Digital Marketing Director",
      company: "TechFlow Solutions",
      content: "The Pro plan has been incredible value. We've increased our organic traffic by 40% in just 3 months. The automated reports save me hours each week.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "SEO Agency Owner",
      company: "Digital Growth Labs",
      content: "Agency plan is perfect for managing multiple clients. The white-label reports and API access have streamlined our entire workflow.",
      rating: 5
    },
    {
      name: "Emily Thompson",
      role: "E-commerce Manager",
      company: "Fashion Forward",
      content: "Started with the free plan and quickly upgraded to Pro. The competitor analysis feature alone has helped us outrank our competition.",
      rating: 5
    }
  ]

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-3xl"></div>
          <div className="container mx-auto px-4 relative">
            <motion.div 
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-full px-4 py-2 text-sm font-medium text-blue-800 mb-6">
                <Zap className="w-4 h-4" />
                Transparent Pricing
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
                Choose Your 
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Perfect Plan</span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Start with our free plan and scale as your SEO needs grow. No hidden fees, no long-term contracts, just powerful tools to boost your rankings.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    handleCTAClick('START_AUDIT', 'Start Free Audit', 'pricing_hero')
                  }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Start Free Audit
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>No credit card required</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <PricingCards />
          </div>
        </section>

        {/* ROI Calculator */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <ROICalculator />
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-200 rounded-full px-4 py-2 text-sm font-medium text-yellow-800 mb-4">
                <Star className="w-4 h-4" />
                Customer Success Stories
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Trusted by Growing Businesses
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                See how our customers are achieving remarkable SEO results with our platform
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                    <p className="text-sm text-blue-600 font-medium">{testimonial.company}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-teal-100 border border-green-200 rounded-full px-4 py-2 text-sm font-medium text-green-800 mb-4">
                <Shield className="w-4 h-4" />
                Frequently Asked Questions
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Everything You Need to Know
              </h2>
              <p className="text-xl text-slate-600">
                Got questions? We've got answers. If you don't find what you're looking for, feel free to contact us.
              </p>
            </motion.div>

            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-200"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{faq.question}</h3>
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-white/90 mb-6">
                <Crown className="w-4 h-4" />
                Ready to Get Started?
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Join Thousands of Successful Businesses
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Start your SEO journey today with our free plan and upgrade as you grow
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    handleCTAClick('START_AUDIT', 'Start Free Analysis', 'pricing_final')
                  }}
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-blue-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Start Free Analysis
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-4 text-blue-100">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>10,000+ users</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>Setup in 2 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    <span>24/7 support</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <EmailCaptureInline
              title="Still Have Questions?"
              description="Get our pricing guide and comparison chart delivered to your inbox"
              ctaText="Send Me the Guide"
              variant="minimal"
              source="pricing_page"
              className="max-w-lg mx-auto"
            />
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
