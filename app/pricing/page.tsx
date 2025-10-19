"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Zap, Star, Crown, Users, Clock, Shield, Phone, Sparkles, Check, X } from "lucide-react"
import { EmailCaptureInline } from "../../components/lead/email-capture-inline"
import { handleCTAClick } from "../../lib/cta-utils"
import { MainLayout } from "../../components/layout/main-layout"
import { StructuredData, generateProductSchema, generateFAQSchema } from "../../components/seo/StructuredData"

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for small websites and beginners",
    price: { monthly: 0, yearly: 0 },
    originalPrice: { monthly: 29, yearly: 290 },
    popular: false,
    cta: "Get Started Free",
    features: [
      "1 website audit per month",
      "Basic SEO recommendations",
      "Technical issue detection",
      "Meta tags analysis",
      "Email support"
    ],
    limitations: [
      "Limited to 10 pages per audit",
      "No priority support",
      "Basic reporting only"
    ]
  },
  {
    name: "Professional",
    description: "Ideal for growing businesses and agencies",
    price: { monthly: 49, yearly: 39 },
    originalPrice: { monthly: 99, yearly: 990 },
    popular: true,
    cta: "Start Professional",
    features: [
      "10 website audits per month",
      "Advanced SEO recommendations",
      "Competitor analysis",
      "Content optimization suggestions",
      "Performance monitoring",
      "Priority email support",
      "Custom reporting",
      "API access"
    ],
    limitations: [
      "Limited to 100 pages per audit",
      "No phone support"
    ]
  },
  {
    name: "Enterprise",
    description: "For large organizations with complex needs",
    price: { monthly: 199, yearly: 159 },
    originalPrice: { monthly: 399, yearly: 3990 },
    popular: false,
    cta: "Contact Sales",
    features: [
      "Unlimited website audits",
      "White-label reporting",
      "Advanced competitor tracking",
      "Custom integrations",
      "Dedicated account manager",
      "Phone support",
      "SLA guarantee",
      "Custom training sessions",
      "Advanced API features"
    ],
    limitations: []
  }
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Marketing Director",
    company: "TechFlow Solutions",
    content: "AI SEO Turbo transformed our website performance. We saw a 150% increase in organic traffic within 3 months.",
    rating: 5,
    avatar: "/testimonials/sarah-chen.jpg"
  },
  {
    name: "Mike Rodriguez",
    role: "SEO Specialist",
    company: "Digital Growth Agency",
    content: "The AI-powered insights are incredible. It caught issues our previous tools missed and provided actionable solutions.",
    rating: 5,
    avatar: "/testimonials/mike-rodriguez.jpg"
  },
  {
    name: "Emily Watson",
    role: "E-commerce Manager",
    company: "StyleHub Retail",
    content: "Our conversion rate improved by 40% after implementing the recommended optimizations. ROI was immediate.",
    rating: 5,
    avatar: "/testimonials/emily-watson.jpg"
  }
]

const faqs = [
  {
    question: "How does the AI SEO audit work?",
    answer: "Our AI analyzes your website's technical structure, content quality, performance metrics, and SEO factors. It then provides personalized recommendations based on current best practices and search engine guidelines."
  },
  {
    question: "Can I upgrade or downgrade my plan anytime?",
    answer: "Yes! You can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at your next billing cycle."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund."
  },
  {
    question: "How accurate are the AI recommendations?",
    answer: "Our AI is trained on millions of websites and constantly updated with the latest SEO best practices. Recommendations have a 95%+ accuracy rate and are regularly validated by SEO experts."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes! Our Starter plan is completely free and includes 1 website audit per month. No credit card required to get started."
  },
  {
    question: "What kind of support do you provide?",
    answer: "We offer email support for all plans, priority email support for Professional users, and dedicated phone support for Enterprise customers. Response times vary by plan level."
  }
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Generate Product schemas for all pricing plans
  const productSchemas = pricingPlans.map(plan => 
    generateProductSchema({
      name: `AISEOTurbo ${plan.name} Plan`,
      description: plan.description,
      price: String(plan.price.monthly),
      currency: "USD",
      url: "https://www.aiseoturbo.com/pricing",
      features: plan.features
    })
  )

  // Generate FAQ schema from pricing FAQs
  const faqSchema = generateFAQSchema(
    faqs.map(faq => ({
      question: faq.question,
      answer: faq.answer
    }))
  )

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Hero Section */}
        <section className="relative py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20" />
          <div className="relative container mx-auto px-6">
            <motion.div 
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full px-6 py-3 mb-8"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span className="text-purple-300 font-medium">Limited Time: 60% Off All Plans</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Choose Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  SEO Success Plan
                </span>
              </h1>
              
              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Transform your website with AI-powered SEO audits. Get actionable insights, 
                boost your rankings, and increase organic traffic with our intelligent optimization platform.
              </p>

              {/* Billing Toggle */}
              <motion.div 
                className="flex items-center justify-center gap-4 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className={`text-lg ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
                  Monthly
                </span>
                <motion.button
                  onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                  className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                    billingCycle === 'yearly' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-slate-600'
                  } p-2`}
                  style={{ minWidth: '44px', minHeight: '44px' }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Switch to ${billingCycle === 'monthly' ? 'yearly' : 'monthly'} billing`}
                  role="switch"
                  aria-checked={billingCycle === 'yearly'}
                >
                  <motion.div
                    className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                    animate={{ x: billingCycle === 'yearly' ? 32 : 4 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
                <span className={`text-lg ${billingCycle === 'yearly' ? 'text-white' : 'text-slate-400'}`}>
                  Yearly
                </span>
                <motion.div 
                  className="bg-green-500/20 border border-green-500/30 rounded-full px-3 py-1"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-green-400 text-sm font-medium">Save 20%</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="relative py-20">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  className={`relative group ${
                    plan.popular 
                      ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-2 border-purple-500/50' 
                      : 'bg-slate-800/60 border border-slate-600/50'
                  } backdrop-blur-xl rounded-2xl p-8 hover:bg-slate-800/80 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <motion.div 
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                      animate={{ 
                        y: [0, -2, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                        Most Popular
                      </div>
                    </motion.div>
                  )}

                  <motion.div 
                    className="text-center mb-8"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.h2 
                      className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300"
                    >
                      {plan.name}
                    </motion.h2>
                    <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300 mb-6">{plan.description}</p>
                    
                    <motion.div 
                      className="mb-6"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.span 
                        className="text-5xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
                      >
                        ${plan.price[billingCycle]}
                      </motion.span>
                      <span className="text-slate-400 ml-2 group-hover:text-slate-300 transition-colors duration-300">
                        /{billingCycle === 'monthly' ? 'month' : 'month, billed annually'}
                      </span>
                      {plan.originalPrice[billingCycle] > 0 && (
                        <div className="mt-2">
                          <span className="text-slate-500 line-through text-lg">
                            ${plan.originalPrice[billingCycle]}/{billingCycle === 'monthly' ? 'mo' : 'mo'}
                          </span>
                          <span className="ml-2 bg-red-500/20 text-red-400 px-2 py-1 rounded text-sm">
                            60% OFF
                          </span>
                        </div>
                      )}
                    </motion.div>

                    <motion.button
                      onClick={() => handleCTAClick('/signup', plan.cta, `pricing-${plan.name.toLowerCase()}`)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/50'
                          : 'bg-slate-700 text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:shadow-lg hover:shadow-purple-500/30'
                      }`}
                    >
                      {plan.cta}
                    </motion.button>
                  </motion.div>

                  {/* Features */}
                  <motion.div 
                    className="space-y-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                  >
                    {plan.features.map((feature, featureIndex) => (
                      <motion.div 
                        key={featureIndex} 
                        className="flex items-center gap-3 group/feature"
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0 }
                        }}
                        whileHover={{ x: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0 group-hover/feature:text-green-300 transition-colors duration-200" />
                        </motion.div>
                        <span className="text-slate-300 group-hover/feature:text-white transition-colors duration-200">{feature}</span>
                      </motion.div>
                    ))}
                    {plan.limitations.map((limitation, limitIndex) => (
                      <motion.div 
                        key={limitIndex} 
                        className="flex items-center gap-3 group/limitation"
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0 }
                        }}
                        whileHover={{ x: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.3 }}
                        >
                          <X className="w-5 h-5 text-red-400 flex-shrink-0 group-hover/limitation:text-red-300 transition-colors duration-200" />
                        </motion.div>
                        <span className="text-slate-400 group-hover/limitation:text-slate-300 transition-colors duration-200">{limitation}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section - MOVED FIRST */}
        <section className="relative py-20">
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Frequently Asked Questions
                </span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Everything you need to know about our AI SEO platform
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-slate-800/60 backdrop-blur-xl border border-slate-600/50 rounded-xl overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <motion.button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-slate-700/50 transition-colors duration-200"
                    whileHover={{ backgroundColor: "rgba(51, 65, 85, 0.5)" }}
                  >
                    <span className="text-white font-semibold text-lg">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: openFaq === index ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-6 h-6 text-purple-400" />
                    </motion.div>
                  </motion.button>
                  
                  <motion.div
                    initial={false}
                    animate={{ 
                      height: openFaq === index ? "auto" : 0,
                      opacity: openFaq === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6">
                      <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials - MOVED SECOND */}
        <section className="relative py-20">
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Trusted by 10,000+ Businesses
                </span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                See how our AI-powered SEO audits have transformed businesses worldwide
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  className="bg-slate-800/60 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-8 hover:bg-slate-800/80 transition-all duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-slate-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">{testimonial.name}</div>
                      <div className="text-slate-400 text-sm">{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-pink-900/30" />
          <div className="relative container mx-auto px-6">
            <motion.div 
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Ready to Transform Your SEO?
                </span>
              </h2>
              
              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Join thousands of businesses already boosting their organic traffic with AI-powered SEO insights.
                Start your free audit today and see the difference intelligent optimization can make.
              </p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.button
                  onClick={() => handleCTAClick('/signup', 'Start Free Audit', 'pricing-cta-primary')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 flex items-center gap-2 justify-center"
                >
                  Start Free Audit
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  onClick={() => handleCTAClick('/contact', 'Contact Sales', 'pricing-cta-secondary')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-slate-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-600 transition-all duration-300 flex items-center gap-2 justify-center"
                >
                  <Phone className="w-5 h-5" />
                  Contact Sales
                </motion.button>
              </motion.div>

              <div className="max-w-md mx-auto">
                <EmailCaptureInline 
                  source="pricing-page"
                  placeholder="Enter your email for exclusive SEO tips"
                  ctaText="Get SEO Tips"
                />
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Structured Data */}
      <StructuredData data={productSchemas} />
      <StructuredData data={faqSchema} />
    </MainLayout>
  )
}
