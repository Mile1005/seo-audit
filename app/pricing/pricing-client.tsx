"use client";

import React from "react";
import { MainLayout } from "../../components/layout/main-layout";
import { PricingCards } from "../../components/pricing/pricing-cards";
import { ROICalculator } from "../../components/pricing/roi-calculator";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Star,
  Crown,
  Users,
  Clock,
  Shield,
  Phone,
} from "lucide-react";
import { EmailCaptureInline } from "../../components/lead/email-capture-inline";
import { handleCTAClick } from "../../lib/cta-utils";

export default function PricingClientComponent() {
  const faqData = [
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. Your account will remain active until the end of your current billing period.",
    },
    {
      question: "Is there a free trial for paid plans?",
      answer:
        "Yes! We offer a 14-day free trial for both Pro and Agency plans. No credit card required to start your trial.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual subscriptions.",
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer:
        "Absolutely! You can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately, and we'll prorate the billing accordingly.",
    },
    {
      question: "Do you offer custom enterprise plans?",
      answer:
        "Yes, for large organizations with specific needs, we offer custom enterprise solutions. Contact our sales team to discuss your requirements.",
    },
    {
      question: "What kind of support do you provide?",
      answer:
        "Free users get email support, Pro users get priority email support, and Agency users get dedicated phone and Slack support with a dedicated account manager.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Digital Marketing Director",
      company: "TechFlow Solutions",
      content:
        "The Pro plan has been incredible value. We've increased our organic traffic by 40% in just 3 months. The automated reports save me hours each week.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "SEO Agency Owner",
      company: "Growth Digital",
      content:
        "The Agency plan's white-label reports and multi-client dashboard are game-changers for our business. We're now managing 20+ clients more efficiently than ever.",
      rating: 5,
    },
    {
      name: "Emily Thompson",
      role: "E-commerce Manager",
      company: "StyleHub",
      content:
        "Started with the free plan and quickly upgraded to Pro. The competitor analysis features alone have helped us identify new opportunities worth thousands in revenue.",
      rating: 5,
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-slate-950 py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                  Choose Your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                    Growth Plan
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
                  Start with our free plan and scale as you grow. No hidden fees, no long-term
                  contracts. Cancel anytime.
                </p>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">1,000+</div>
                  <div className="text-gray-400">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">40%</div>
                  <div className="text-gray-400">Average Traffic Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">24/7</div>
                  <div className="text-gray-400">Support Available</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing Cards Section */}
        <PricingCards />

        {/* Feature Comparison Table */}
        <section className="py-20 bg-slate-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">Compare All Features</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Detailed breakdown of what's included in each plan
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-slate-800/30 border border-slate-700/30 rounded-2xl p-8 overflow-x-auto"
            >
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="pb-4 text-white font-semibold">Features</th>
                    <th className="pb-4 text-center text-white font-semibold">
                      <div className="flex items-center justify-center space-x-2">
                        <Zap className="w-5 h-5 text-gray-400" />
                        <span>Free</span>
                      </div>
                    </th>
                    <th className="pb-4 text-center text-white font-semibold">
                      <div className="flex items-center justify-center space-x-2">
                        <Star className="w-5 h-5 text-green-400" />
                        <span>Pro</span>
                      </div>
                    </th>
                    <th className="pb-4 text-center text-white font-semibold">
                      <div className="flex items-center justify-center space-x-2">
                        <Crown className="w-5 h-5 text-purple-400" />
                        <span>Agency</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  {[
                    {
                      feature: "SEO Audits",
                      free: "3 per month",
                      pro: "Unlimited",
                      agency: "Unlimited",
                    },
                    {
                      feature: "Websites",
                      free: "1 website",
                      pro: "5 websites",
                      agency: "Unlimited",
                    },
                    {
                      feature: "Technical Analysis",
                      free: "Basic",
                      pro: "Advanced",
                      agency: "Advanced",
                    },
                    { feature: "Competitor Analysis", free: "❌", pro: "✅", agency: "✅" },
                    { feature: "Keyword Tracking", free: "❌", pro: "✅", agency: "✅" },
                    { feature: "White-label Reports", free: "❌", pro: "✅", agency: "✅" },
                    { feature: "API Access", free: "❌", pro: "✅", agency: "✅" },
                    { feature: "Multi-client Dashboard", free: "❌", pro: "❌", agency: "✅" },
                    { feature: "Team Collaboration", free: "❌", pro: "❌", agency: "✅" },
                    { feature: "Custom Branding", free: "❌", pro: "❌", agency: "✅" },
                    {
                      feature: "Support",
                      free: "Email",
                      pro: "Priority Email",
                      agency: "Phone & Slack",
                    },
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-slate-700/30">
                      <td className="py-3 font-medium">{row.feature}</td>
                      <td className="py-3 text-center">{row.free}</td>
                      <td className="py-3 text-center">{row.pro}</td>
                      <td className="py-3 text-center">{row.agency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </section>

        {/* ROI Calculator */}
        <ROICalculator />

        {/* Customer Testimonials */}
        <section className="py-20 bg-slate-950">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">What Our Customers Say</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Real results from real customers across all our plans
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-6"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                    <div className="text-sm text-gray-500">{testimonial.company}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-slate-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Everything you need to know about our pricing and plans
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {faqData.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="mb-6"
                >
                  <div className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">{faq.question}</h3>
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-900 to-blue-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Boost Your SEO?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of businesses that have improved their search rankings with our
                AI-powered SEO tools.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <motion.a
                  href="/signup"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 inline-flex items-center justify-center space-x-2"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCTAClick("FREE_TRIAL", "Start Free Trial", "pricing-final-cta");
                  }}
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.a>

                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 inline-flex items-center justify-center space-x-2"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCTAClick("CONTACT", "Contact Sales", "pricing-final-cta");
                  }}
                >
                  <Phone className="w-5 h-5" />
                  <span>Contact Sales</span>
                </motion.a>
              </div>

              <div className="flex items-center justify-center space-x-6 text-gray-400 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span>14-day free trial</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Email Capture */}
        <section className="py-16 bg-slate-950">
          <div className="container mx-auto px-4">
            <EmailCaptureInline
              source="pricing-page"
              title="Still Have Questions?"
              description="Get our pricing guide and comparison chart delivered to your inbox"
              ctaText="Send Me the Guide"
              variant="minimal"
              className="max-w-lg mx-auto"
            />
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
