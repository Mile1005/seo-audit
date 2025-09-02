"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Zap, Star, Crown, Users, Clock, Shield, Phone, Sparkles, Check, X } from "lucide-react"
import { EmailCaptureInline } from "../../components/lead/email-capture-inline"
import { handleCTAClick } from "../../lib/cta-utils"

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly')
  const [activeCalculator, setActiveCalculator] = useState({
    monthlyRevenue: 50000,
    currentConversion: 2.5,
    trafficIncrease: 30,
    conversionImprovement: 15
  })

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
      company: "Digital Growth Co",
      content: "Agency plan is perfect for our team. The white-label reports and client management features have helped us scale from 10 to 50+ clients.",
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

  const pricingPlans = [
    {
      name: "Free",
      price: { monthly: 0, annually: 0 },
      description: "Perfect for getting started with SEO",
      features: [
        "5 audits per month",
        "Basic SEO analysis",
        "Keyword suggestions",
        "Performance tracking",
        "Email support",
        "Community access"
      ],
      limitations: [
        "Limited to 5 pages per audit",
        "Basic reporting only",
        "No white-label options"
      ],
      cta: "Start Free",
      popular: false,
      color: "slate"
    },
    {
      name: "Pro",
      price: { monthly: 29, annually: 24 },
      description: "For growing businesses and professionals",
      features: [
        "Unlimited audits",
        "Advanced SEO analysis",
        "Competitor research",
        "Keyword tracking",
        "Performance forecasting",
        "Priority email support",
        "White-label reports",
        "API access",
        "Team collaboration"
      ],
      limitations: [],
      cta: "Start Free Trial",
      popular: true,
      color: "purple"
    },
    {
      name: "Agency",
      price: { monthly: 79, annually: 65 },
      description: "For agencies and large teams",
      features: [
        "Everything in Pro",
        "Unlimited team members",
        "Client management",
        "Custom branding",
        "Advanced reporting",
        "Phone & Slack support",
        "Dedicated account manager",
        "Custom integrations",
        "Training & onboarding"
      ],
      limitations: [],
      cta: "Start Free Trial",
      popular: false,
      color: "gradient"
    }
  ]

  // ROI Calculator Logic
  const calculateROI = () => {
    const monthlyIncrease = (activeCalculator.monthlyRevenue * activeCalculator.trafficIncrease) / 100
    const conversionBoost = (monthlyIncrease * activeCalculator.conversionImprovement) / 100
    const totalMonthlyGain = monthlyIncrease + conversionBoost
    const annualGain = totalMonthlyGain * 12
    const planCost = billingCycle === 'monthly' ? 29 * 12 : 24 * 12
    const roi = ((annualGain - planCost) / planCost) * 100
    
    return {
      monthlyIncrease: Math.round(totalMonthlyGain),
      annualGain: Math.round(annualGain),
      roi: Math.round(roi)
    }
  }

  const roiResults = calculateROI()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full filter blur-3xl"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-pink-600/20 to-purple-600/20 rounded-full filter blur-3xl"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
        
        {/* Floating Shapes */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute top-1/4 right-1/4 w-4 h-4 bg-purple-500/30 rounded-full"
        />
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute top-1/3 left-1/4 w-6 h-6 bg-pink-500/30 rounded-full"
        />
      </div>

      {/* Navigation Spacer */}
      <div className="h-16"></div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full text-sm text-slate-300 mb-8"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            Transparent Pricing
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            Choose Your{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto"
          >
            Start with our free plan and scale as your SEO needs grow. No hidden fees, no long-term contracts,
            just powerful tools to boost your rankings.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <button
              onClick={() => handleCTAClick('/features/seo-audit', 'Start Free Audit', 'pricing-hero')}
              className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Free Audit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-2 text-slate-400">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>No credit card required</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full text-sm text-slate-300 mb-6">
              <Crown className="w-4 h-4 text-yellow-400" />
              Simple, Transparent Pricing
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                SEO Growth Plan
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Everything you need to dominate search rankings and grow your organic traffic
            </p>
          </motion.div>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex justify-center mb-12"
          >
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  billingCycle === 'monthly'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annually')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 relative ${
                  billingCycle === 'annually'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Annual
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-slate-800/50 backdrop-blur-sm border rounded-2xl p-8 ${
                  plan.popular
                    ? 'border-purple-500/50 shadow-2xl shadow-purple-500/20 scale-105'
                    : 'border-slate-700/50 hover:border-slate-600/50'
                } transition-all duration-300 hover:transform hover:scale-105`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-slate-400 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-white">
                      ${plan.price[billingCycle]}
                    </span>
                    <span className="text-slate-400 ml-2">
                      /{billingCycle === 'monthly' ? 'month' : 'month, billed annually'}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCTAClick('/signup', plan.cta, `pricing-${plan.name.toLowerCase()}`)}
                    className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl'
                        : 'bg-slate-700 text-white hover:bg-slate-600'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>

                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-slate-300">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, limitIndex) => (
                    <div key={limitIndex} className="flex items-center gap-3">
                      <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <span className="text-slate-500">{limitation}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Calculate Your{" "}
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                SEO ROI
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              See how AISEOTurbo can impact your business growth and revenue
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8"
          >
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Calculator Inputs */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Your Business Metrics</h3>
                
                <div>
                  <label className="block text-slate-300 mb-2">Monthly Revenue</label>
                  <input
                    type="range"
                    min="10000"
                    max="1000000"
                    step="10000"
                    value={activeCalculator.monthlyRevenue}
                    onChange={(e) => setActiveCalculator({...activeCalculator, monthlyRevenue: parseInt(e.target.value)})}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="text-2xl font-bold text-purple-400 mt-2">
                    ${activeCalculator.monthlyRevenue.toLocaleString()}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-2">Current Conversion Rate</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={activeCalculator.currentConversion}
                    onChange={(e) => setActiveCalculator({...activeCalculator, currentConversion: parseFloat(e.target.value)})}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="text-2xl font-bold text-purple-400 mt-2">
                    {activeCalculator.currentConversion}%
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-2">Expected Traffic Increase</label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={activeCalculator.trafficIncrease}
                    onChange={(e) => setActiveCalculator({...activeCalculator, trafficIncrease: parseInt(e.target.value)})}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="text-2xl font-bold text-purple-400 mt-2">
                    {activeCalculator.trafficIncrease}%
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/30">
                <h3 className="text-2xl font-bold text-white mb-6">Conservative Estimates Based On Customer Data:</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="text-slate-400">
                    • 30% average increase in organic traffic
                  </div>
                  <div className="text-slate-400">
                    • 15% improvement in conversion rate
                  </div>
                  <div className="text-slate-400">
                    • Results typically seen within 3-6 months
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                    <div className="text-sm text-slate-400 mb-2">Monthly Increase</div>
                    <div className="text-2xl font-bold text-green-400">
                      ${roiResults.monthlyIncrease.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                    <div className="text-sm text-slate-400 mb-2">Annual Impact</div>
                    <div className="text-2xl font-bold text-green-400">
                      ${roiResults.annualGain.toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-400">Additional annual revenue after plan costs</div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCTAClick('/signup', 'Start Achieving These Results', 'roi-calculator')}
                  className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  🎯 Start Achieving These Results
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Customer Success Stories */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full text-sm text-slate-300 mb-6">
              <Star className="w-4 h-4 text-yellow-400" />
              Customer Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Trusted by Growing Businesses
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              See how our customers are achieving remarkable SEO results with our platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-slate-600/50 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-slate-400 text-sm">{testimonial.role}</div>
                  <div className="text-slate-500 text-sm">{testimonial.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-400">
              Everything you need to know about our pricing and plans
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-slate-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Boost Your SEO?
            </h2>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses that trust AISEOTurbo to grow their organic traffic and improve their search rankings.
            </p>
            
            <EmailCaptureInline
              title="Still Have Questions?"
              description="Get our pricing guide and comparison chart delivered to your inbox"
              ctaText="Get Pricing Guide"
              source="pricing_page_bottom"
            />

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => handleCTAClick('/features/seo-audit', 'Start Free Audit', 'final-cta')}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Start Free Audit
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-6 text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span>No long-term contracts</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
