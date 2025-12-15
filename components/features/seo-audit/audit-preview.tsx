"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
  FileText,
  BarChart3,
  Target,
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function AuditPreview() {
  const t = useTranslations("featurePages.seoAudit.auditPreview");

  const mockIssues = [
    {
      type: "critical",
      title: t("mockIssues.metaDescriptions"),
      count: 12,
      icon: AlertTriangle,
      color: "text-red-500",
    },
    {
      type: "warning",
      title: t("mockIssues.slowImages"),
      count: 8,
      icon: Clock,
      color: "text-yellow-500",
    },
    {
      type: "success",
      title: t("mockIssues.optimizedHeadings"),
      count: 45,
      icon: CheckCircle,
      color: "text-green-500",
    },
  ];

  const features = [
    {
      icon: Target,
      title: t("features.priorityMatrix.title"),
      desc: t("features.priorityMatrix.desc"),
    },
    {
      icon: BarChart3,
      title: t("features.aiSuggestions.title"),
      desc: t("features.aiSuggestions.desc"),
    },
    {
      icon: FileText,
      title: t("features.benchmark.title"),
      desc: t("features.benchmark.desc"),
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t("header.title")}
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">{t("header.subtitle")}</p>

          <div className="space-y-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors duration-200"
                >
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          {/* Mock Report Container */}
          <div className="rounded-xl border bg-background p-6 shadow-lg relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">{t("report.title")}</h3>
              <div className="text-sm text-muted-foreground">{t("report.domain")}</div>
            </div>

            {/* Overall Score */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center mb-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg"
            >
              <div className="text-3xl font-bold text-blue-600 mb-1">78</div>
              <div className="text-sm text-muted-foreground">{t("report.overallScore")}</div>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "78%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="bg-blue-500 h-2 rounded-full"
                />
              </div>
            </motion.div>

            {/* Issues List */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground mb-3">{t("report.keyIssues")}</h4>
              {mockIssues.map((issue, index) => {
                const Icon = issue.icon;
                return (
                  <motion.div
                    key={issue.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-3 rounded-lg border hover:border-primary/20 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${issue.color}`} />
                      <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                        {issue.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                        {issue.count}
                      </span>
                      <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="mt-6 p-3 bg-primary/5 rounded-lg border border-primary/20"
            >
              <div className="text-sm text-center text-muted-foreground">
                {t("report.moreInsights")}
              </div>
            </motion.div>
          </div>

          {/* Floating elements */}
          <motion.div
            animate={{
              y: [0, -5, 0],
              rotate: [0, 2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-20 blur-sm"
          />
          <motion.div
            animate={{
              y: [0, 8, 0],
              rotate: [0, -3, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-pink-400 to-orange-600 rounded-full opacity-20 blur-sm"
          />
        </motion.div>
      </div>
    </section>
  );
}
