"use client";

import React, { useState } from "react";
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
  Sparkles,
  Check,
  X,
} from "lucide-react";
import { EmailCaptureInline } from "../../components/lead/email-capture-inline";
import { handleCTAClick } from "../../lib/cta-utils";
import { MainLayout } from "../../components/layout/main-layout";
import { Breadcrumbs } from "../../components/navigation/breadcrumbs";
import {
  StructuredData,
  generateMultiPlanProductSchema,
  generateFAQSchema,
} from "../../components/seo/StructuredData";
import { useTranslations } from "next-intl";

export default function PricingPage() {
  const t = useTranslations("pricing");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const pricingPlans = [
    {
      name: t("plans.starter.name"),
      description: t("plans.starter.description"),
      price: { monthly: 0, yearly: 0 },
      originalPrice: { monthly: 29, yearly: 290 },
      popular: false,
      cta: t("plans.starter.cta"),
      features: [
        t("plans.starter.features.feature1"),
        t("plans.starter.features.feature2"),
        t("plans.starter.features.feature3"),
        t("plans.starter.features.feature4"),
        t("plans.starter.features.feature5"),
      ],
      limitations: [
        t("plans.starter.limitations.limit1"),
        t("plans.starter.limitations.limit2"),
        t("plans.starter.limitations.limit3"),
      ],
    },
    {
      name: t("plans.professional.name"),
      description: t("plans.professional.description"),
      price: { monthly: 49, yearly: 39 },
      originalPrice: { monthly: 99, yearly: 990 },
      popular: true,
      cta: t("plans.professional.cta"),
      features: [
        t("plans.professional.features.feature1"),
        t("plans.professional.features.feature2"),
        t("plans.professional.features.feature3"),
        t("plans.professional.features.feature4"),
        t("plans.professional.features.feature5"),
        t("plans.professional.features.feature6"),
        t("plans.professional.features.feature7"),
        t("plans.professional.features.feature8"),
      ],
      limitations: [
        t("plans.professional.limitations.limit1"),
        t("plans.professional.limitations.limit2"),
      ],
    },
    {
      name: t("plans.enterprise.name"),
      description: t("plans.enterprise.description"),
      price: { monthly: 199, yearly: 159 },
      originalPrice: { monthly: 399, yearly: 3990 },
      popular: false,
      cta: t("plans.enterprise.cta"),
      features: [
        t("plans.enterprise.features.feature1"),
        t("plans.enterprise.features.feature2"),
        t("plans.enterprise.features.feature3"),
        t("plans.enterprise.features.feature4"),
        t("plans.enterprise.features.feature5"),
        t("plans.enterprise.features.feature6"),
        t("plans.enterprise.features.feature7"),
        t("plans.enterprise.features.feature8"),
        t("plans.enterprise.features.feature9"),
      ],
      limitations: [],
    },
  ];

  const testimonials = [
    {
      name: t("testimonials.items.testimonial1.name"),
      role: t("testimonials.items.testimonial1.role"),
      company: t("testimonials.items.testimonial1.company"),
      content: t("testimonials.items.testimonial1.content"),
      rating: 5,
      avatar: "/testimonials/sarah-chen.jpg",
    },
    {
      name: t("testimonials.items.testimonial2.name"),
      role: t("testimonials.items.testimonial2.role"),
      company: t("testimonials.items.testimonial2.company"),
      content: t("testimonials.items.testimonial2.content"),
      rating: 5,
      avatar: "/testimonials/mike-rodriguez.jpg",
    },
    {
      name: t("testimonials.items.testimonial3.name"),
      role: t("testimonials.items.testimonial3.role"),
      company: t("testimonials.items.testimonial3.company"),
      content: t("testimonials.items.testimonial3.content"),
      rating: 5,
      avatar: "/testimonials/emily-watson.jpg",
    },
  ];

  const faqs = [
    {
      question: t("faq.questions.q1.question"),
      answer: t("faq.questions.q1.answer"),
    },
    {
      question: t("faq.questions.q2.question"),
      answer: t("faq.questions.q2.answer"),
    },
    {
      question: t("faq.questions.q3.question"),
      answer: t("faq.questions.q3.answer"),
    },
    {
      question: t("faq.questions.q4.question"),
      answer: t("faq.questions.q4.answer"),
    },
    {
      question: t("faq.questions.q5.question"),
      answer: t("faq.questions.q5.answer"),
    },
    {
      question: t("faq.questions.q6.question"),
      answer: t("faq.questions.q6.answer"),
    },
  ];

  // Generate Product schema for all pricing plans (now returns array of individual Product schemas)
  const productSchemas = generateMultiPlanProductSchema(
    pricingPlans.map((plan) => ({
      name: `${plan.name} Plan`,
      price: String(plan.price.monthly),
      currency: "USD",
      description: plan.description,
    }))
  );

  // Generate FAQ schema from pricing FAQs
  const faqSchema = generateFAQSchema(
    faqs.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    }))
  );

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Hero Section */}
        <section className="relative py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20" />
          <div className="relative container mx-auto px-6">
            {/* Breadcrumbs */}
            <div className="mb-8">
              <Breadcrumbs
                items={[{ name: "Pricing", url: "https://www.aiseoturbo.com/pricing" }]}
                darkMode={true}
              />
            </div>

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
                <span className="text-purple-300 font-medium">{t("hero.badge")}</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  {t("hero.title1")}
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {t("hero.title2")}
                </span>
              </h1>

              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                {t("hero.subtitle")}
              </p>

              {/* Billing Toggle */}
              <motion.div
                className="flex items-center justify-center gap-4 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span
                  className={`text-lg ${billingCycle === "monthly" ? "text-white" : "text-slate-400"}`}
                >
                  {t("hero.billing.monthly")}
                </span>
                <motion.button
                  onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                  className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                    billingCycle === "yearly"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600"
                      : "bg-slate-600"
                  } p-2`}
                  style={{ minWidth: "44px", minHeight: "44px" }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Switch to ${billingCycle === "monthly" ? "yearly" : "monthly"} billing`}
                  role="switch"
                  aria-checked={billingCycle === "yearly"}
                >
                  <motion.div
                    className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                    animate={{ x: billingCycle === "yearly" ? 32 : 4 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
                <span
                  className={`text-lg ${billingCycle === "yearly" ? "text-white" : "text-slate-400"}`}
                >
                  {t("hero.billing.yearly")}
                </span>
                <motion.div
                  className="bg-green-500/20 border border-green-500/30 rounded-full px-3 py-1"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-green-400 text-sm font-medium">
                    {t("hero.billing.saveLabel")}
                  </span>
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
                      ? "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-2 border-purple-500/50"
                      : "bg-slate-800/60 border border-slate-600/50"
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
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    >
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                        {t("plans.professional.popularBadge")}
                      </div>
                    </motion.div>
                  )}

                  <motion.div
                    className="text-center mb-8"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.h2 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                      {plan.name}
                    </motion.h2>
                    <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300 mb-6">
                      {plan.description}
                    </p>

                    <motion.div
                      className="mb-6"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.span className="text-5xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        ${plan.price[billingCycle]}
                      </motion.span>
                      <span className="text-slate-400 ml-2 group-hover:text-slate-300 transition-colors duration-300">
                        /
                        {billingCycle === "monthly"
                          ? t("plans.billing.monthly")
                          : t("plans.billing.yearly")}
                      </span>
                      {plan.originalPrice[billingCycle] > 0 && (
                        <div className="mt-2">
                          <span className="text-slate-500 line-through text-lg">
                            ${plan.originalPrice[billingCycle]}/
                            {billingCycle === "monthly"
                              ? t("plans.billing.monthly")
                              : t("plans.billing.monthly")}
                          </span>
                          <span className="ml-2 bg-red-500/20 text-red-400 px-2 py-1 rounded text-sm">
                            {t("plans.billing.discount")}
                          </span>
                        </div>
                      )}
                    </motion.div>

                    <motion.button
                      onClick={() =>
                        handleCTAClick("/signup", plan.cta, `pricing-${plan.name.toLowerCase()}`)
                      }
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                        plan.popular
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/50"
                          : "bg-slate-700 text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:shadow-lg hover:shadow-purple-500/30"
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
                          staggerChildren: 0.1,
                        },
                      },
                    }}
                  >
                    {plan.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center gap-3 group/feature"
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0 },
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
                        <span className="text-slate-300 group-hover/feature:text-white transition-colors duration-200">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                    {plan.limitations.map((limitation, limitIndex) => (
                      <motion.div
                        key={limitIndex}
                        className="flex items-center gap-3 group/limitation"
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0 },
                        }}
                        whileHover={{ x: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
                          <X className="w-5 h-5 text-red-400 flex-shrink-0 group-hover/limitation:text-red-300 transition-colors duration-200" />
                        </motion.div>
                        <span className="text-slate-400 group-hover/limitation:text-slate-300 transition-colors duration-200">
                          {limitation}
                        </span>
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
                  {t("faq.title")}
                </span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">{t("faq.subtitle")}</p>
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
                      opacity: openFaq === index ? 1 : 0,
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
                  {t("testimonials.title")}
                </span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                {t("testimonials.subtitle")}
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
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">{testimonial.name}</div>
                      <div className="text-slate-400 text-sm">
                        {testimonial.role}, {testimonial.company}
                      </div>
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
                  {t("cta.title")}
                </span>
              </h2>

              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                {t("cta.subtitle")}
              </p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.button
                  onClick={() =>
                    handleCTAClick("/signup", t("cta.primaryButton"), "pricing-cta-primary")
                  }
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 flex items-center gap-2 justify-center"
                >
                  {t("cta.primaryButton")}
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                <motion.button
                  onClick={() =>
                    handleCTAClick("/contact", t("cta.secondaryButton"), "pricing-cta-secondary")
                  }
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-slate-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-600 transition-all duration-300 flex items-center gap-2 justify-center"
                >
                  <Phone className="w-5 h-5" />
                  {t("cta.secondaryButton")}
                </motion.button>
              </motion.div>

              <div className="max-w-md mx-auto">
                <EmailCaptureInline
                  source="pricing-page"
                  placeholder={t("cta.emailPlaceholder")}
                  ctaText={t("cta.emailCta")}
                  variant="accent"
                />
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Structured Data - Individual Product schemas for Google Merchant Center */}
      {productSchemas.map((schema, index) => (
        <StructuredData key={index} data={schema} />
      ))}
      <StructuredData data={faqSchema} />
    </MainLayout>
  );
}
