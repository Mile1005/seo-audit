"use client";

import React from "react";
import { motion } from "framer-motion";
import { FeatureCard } from "./feature-card";
import { features } from "../../data/features";
import { handleCTAClick } from "@/lib/cta-utils";
import { useTranslations } from "next-intl";

export function FeaturesShowcase() {
  const t = useTranslations("home.features");

  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full px-4 py-2 text-sm mb-6"
          >
            <span className="text-cyan-300">✨ {t("badge")}</span>
          </motion.div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              {t("title1")}
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              {t("title2")}
            </span>
          </h2>

          {/* Subheadline */}
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">{t("bottomCta.title")}</h3>
            <p className="text-gray-300 mb-6">{t("bottomCta.subtitle")}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/dashboard"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-cyan-500/25 inline-flex items-center justify-center"
                id="features-start-audit-cta"
                onClick={(e) => {
                  e.preventDefault();
                  handleCTAClick("START_AUDIT", "Start Your Free Audit", "features-showcase");
                }}
              >
                {t("cta")}
              </motion.a>

              <motion.a
                href="/demo"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 backdrop-blur-sm inline-flex items-center justify-center"
                id="features-view-demo-cta"
                onClick={(e) => {
                  e.preventDefault();
                  handleCTAClick("/demo", "View Sample Report", "features-showcase");
                }}
              >
                {t("bottomCta.viewSampleReport")}
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturesShowcase;
