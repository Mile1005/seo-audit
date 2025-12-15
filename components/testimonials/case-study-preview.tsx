"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Clock } from "lucide-react";
import { handleCTAClick } from "@/lib/cta-utils";
import { type Testimonial } from "../../data/testimonials";
import { useTranslations } from "next-intl";

interface CaseStudyPreviewProps {
  testimonial: Testimonial;
  className?: string;
}

export function CaseStudyPreview({ testimonial, className = "" }: CaseStudyPreviewProps) {
  const t = useTranslations();
  if (!testimonial.caseStudy) return null;

  const { caseStudy, name, company, category } = testimonial;

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "agency":
        return "from-blue-500 to-cyan-500";
      case "smb":
        return "from-green-500 to-emerald-500";
      case "ecommerce":
        return "from-orange-500 to-yellow-500";
      case "saas":
        return "from-purple-500 to-pink-500";
      default:
        return "from-gray-500 to-slate-500";
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "agency":
        return t("home.testimonials.caseStudies.categories.agency");
      case "smb":
        return t("home.testimonials.caseStudies.categories.smb");
      case "ecommerce":
        return t("home.testimonials.caseStudies.categories.ecommerce");
      case "saas":
        return t("home.testimonials.caseStudies.categories.saas");
      default:
        return t("home.testimonials.caseStudies.categories.agency");
    }
  };

  return (
    <motion.div
      className={`
        bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm 
        border border-slate-700/40 rounded-xl p-6 group hover:border-purple-500/30 
        transition-all duration-300 ${className}
      `}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <div
              className={`
              inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
              bg-gradient-to-r ${getCategoryColor(category)} text-white
            `}
            >
              {getCategoryLabel(category)}
            </div>
          </div>
          <h3 className="font-semibold text-white text-lg">{company}</h3>
          <p className="text-gray-400 text-sm">
            {t("home.testimonials.caseStudies.labels.caseStudyWith", { name })}
          </p>
        </div>

        <div className="flex items-center space-x-1 text-purple-400">
          <TrendingUp className="w-4 h-4" />
        </div>
      </div>

      {/* Before/After Metrics */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">
            {t("home.testimonials.caseStudies.labels.before")}
          </span>
          <span className="text-sm font-medium text-red-400">{t(caseStudy.beforeMetricKey)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">
            {t("home.testimonials.caseStudies.labels.after")}
          </span>
          <span className="text-sm font-medium text-green-400">{t(caseStudy.afterMetricKey)}</span>
        </div>

        <div className="border-t border-slate-700/50 pt-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">
              {t("home.testimonials.caseStudies.labels.improvement")}
            </span>
            <span className="text-sm font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              {t(caseStudy.improvementKey)}
            </span>
          </div>
        </div>
      </div>

      {/* Timeframe */}
      <div className="flex items-center space-x-2 mb-6 p-3 bg-slate-800/30 rounded-lg border border-slate-700/30">
        <Clock className="w-4 h-4 text-blue-400" />
        <span className="text-sm text-gray-300">
          {t("home.testimonials.caseStudies.labels.achievedIn")}{" "}
          <span className="font-semibold text-white">{t(caseStudy.timeframeKey)}</span>
        </span>
      </div>

      {/* CTA */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="
          w-full bg-white/5 hover:bg-white/10 border border-white/20 hover:border-purple-500/30 
          text-white rounded-lg py-3 px-4 flex items-center justify-center space-x-2 
          transition-all duration-200 group-hover:bg-purple-500/10
        "
        onClick={() => {
          const link = testimonial.caseStudy?.link || "/case-studies";
          handleCTAClick(link, "Read Full Case Study", "case-study-preview");
        }}
      >
        <span className="font-medium">
          {t("home.testimonials.caseStudies.labels.readFullCaseStudy")}
        </span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
      </motion.button>
    </motion.div>
  );
}
