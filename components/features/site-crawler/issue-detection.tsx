"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Link,
  Image,
  FileText,
  Code,
  Search,
  Zap,
  Shield,
} from "lucide-react";

export default function IssueDetection() {
  const t = useTranslations("featurePages.siteCrawler.issueDetection");

  const issueCategories = [
    {
      icon: XCircle,
      title: t("criticalIssues"),
      count: 12,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
      issues: [t("critical1"), t("critical2"), t("critical3"), t("critical4")],
    },
    {
      icon: AlertTriangle,
      title: t("highPriority"),
      count: 28,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
      issues: [t("high1"), t("high2"), t("high3"), t("high4")],
    },
    {
      icon: AlertCircle,
      title: t("mediumPriority"),
      count: 45,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
      issues: [t("medium1"), t("medium2"), t("medium3"), t("medium4")],
    },
    {
      icon: CheckCircle,
      title: t("optimized"),
      count: 156,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      issues: [t("opt1"), t("opt2"), t("opt3"), t("opt4")],
    },
  ];

  const detectionFeatures = [
    {
      icon: Link,
      title: t("linkAnalysis"),
      description: t("linkAnalysisDesc"),
      items: [t("linkFeature1"), t("linkFeature2"), t("linkFeature3"), t("linkFeature4")],
    },
    {
      icon: Zap,
      title: t("performanceIssues"),
      description: t("performanceDesc"),
      items: [t("perfFeature1"), t("perfFeature2"), t("perfFeature3"), t("perfFeature4")],
    },
    {
      icon: Code,
      title: t("technicalSeo"),
      description: t("technicalDesc"),
      items: [t("techFeature1"), t("techFeature2"), t("techFeature3"), t("techFeature4")],
    },
    {
      icon: Image,
      title: t("contentOptimization"),
      description: t("contentDesc"),
      items: [
        t("contentFeature1"),
        t("contentFeature2"),
        t("contentFeature3"),
        t("contentFeature4"),
      ],
    },
    {
      icon: Search,
      title: t("crawlability"),
      description: t("crawlabilityDesc"),
      items: [t("crawlFeature1"), t("crawlFeature2"), t("crawlFeature3"), t("crawlFeature4")],
    },
    {
      icon: Shield,
      title: t("securityStructure"),
      description: t("securityDesc"),
      items: [t("secFeature1"), t("secFeature2"), t("secFeature3"), t("secFeature4")],
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{t("title")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        {/* Issue Categories Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {issueCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`${category.bgColor} ${category.borderColor} border rounded-xl p-6 hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`w-8 h-8 ${category.color}`} />
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      damping: 15,
                      stiffness: 300,
                      delay: 0.5 + index * 0.1,
                    }}
                    className={`text-2xl font-bold ${category.color}`}
                  >
                    {category.count}
                  </motion.span>
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-3">{category.title}</h3>

                <ul className="space-y-1">
                  {category.issues.map((issue, issueIndex) => (
                    <motion.li
                      key={issue}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.7 + index * 0.1 + issueIndex * 0.05 }}
                      className="text-sm text-muted-foreground"
                    >
                      {issue}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Detection Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {detectionFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="bg-card rounded-xl p-6 border hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>

                <ul className="space-y-2">
                  {feature.items.map((item, itemIndex) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.9 + index * 0.1 + itemIndex * 0.05 }}
                      className="flex items-center text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Sample Issue Report */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-card rounded-2xl p-8 border"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">{t("sampleReport")}</h3>
            <p className="text-muted-foreground">{t("sampleSubtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <XCircle className="w-5 h-5 text-red-500 mr-2" />
                {t("criticalFound")}
              </h4>
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
                <div className="text-sm font-medium text-red-400 mb-2">{t("error404")}</div>
                <div className="text-sm text-red-300 mb-3">{t("errorDetail")}</div>
                <div className="text-xs text-red-400">{t("errorImpact")}</div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                {t("suggestedSolution")}
              </h4>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="text-sm font-medium text-green-400 mb-2">
                  {t("immediateAction")}
                </div>
                <ul className="text-sm text-green-300 space-y-1">
                  <li>• {t("action1")}</li>
                  <li>• {t("action2")}</li>
                  <li>• {t("action3")}</li>
                  <li>• {t("action4")}</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
