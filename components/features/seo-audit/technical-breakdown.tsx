"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Clock, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";

export default function TechnicalBreakdown() {
  const t = useTranslations('featurePages.seoAudit.technicalBreakdown');
  
  const items = [
    { label: t('items.metaTags'), score: 92, status: "excellent", icon: CheckCircle },
    { label: t('items.headings'), score: 88, status: "good", icon: CheckCircle },
    { label: t('items.coreWebVitals'), score: 76, status: "needs-work", icon: AlertCircle },
    { label: t('items.indexation'), score: 95, status: "excellent", icon: CheckCircle },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 80) return "bg-blue-500";
    if (score >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-green-500";
      case "good": return "text-blue-500";
      case "needs-work": return "text-yellow-500";
      default: return "text-red-500";
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl lg:text-4xl font-bold text-foreground mb-8"
        >
          {t('header.title')}
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-xl border bg-background p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
        >
          {/* Overall Score */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{t('overallScore.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('overallScore.subtitle')}</p>
              </div>
            </div>
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", damping: 15, stiffness: 300, delay: 0.5 }}
              className="text-3xl font-bold text-blue-600"
            >
              88
            </motion.div>
          </motion.div>

          <div className="space-y-4">
            {items.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${getStatusColor(item.status)}`} />
                    <span className="text-muted-foreground">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-40 h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                        className={`h-full ${getScoreColor(item.score)} relative`}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </motion.div>
                    </div>
                    <motion.span 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      className="text-foreground font-medium min-w-[2rem] text-right"
                    >
                      {item.score}
                    </motion.span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}