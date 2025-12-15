"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Calendar,
  Clock,
  Bell,
  TrendingUp,
  Shield,
  Target,
  BarChart3,
  Mail,
  Smartphone,
  Settings,
  PlayCircle,
  PauseCircle,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function MonitoringFeatures() {
  const t = useTranslations("featurePages.siteCrawler.monitoring");

  const monitoringPlans = [
    {
      name: t("dailyMonitor"),
      frequency: t("dailyFrequency"),
      features: [t("dailyFeature1"), t("dailyFeature2"), t("dailyFeature3")],
      icon: Calendar,
      color: "from-blue-500 to-blue-600",
      popular: false,
    },
    {
      name: t("smartMonitor"),
      frequency: t("smartFrequency"),
      features: [t("smartFeature1"), t("smartFeature2"), t("smartFeature3"), t("smartFeature4")],
      icon: Target,
      color: "from-purple-500 to-purple-600",
      popular: true,
    },
    {
      name: t("realtimeMonitor"),
      frequency: t("realtimeFrequency"),
      features: [
        t("realtimeFeature1"),
        t("realtimeFeature2"),
        t("realtimeFeature3"),
        t("realtimeFeature4"),
      ],
      icon: Shield,
      color: "from-green-500 to-green-600",
      popular: false,
    },
  ];

  const alertTypes = [
    { type: t("new404Errors"), count: 3, severity: "high", icon: XCircle, color: "text-red-500" },
    {
      type: t("missingMetaTags"),
      count: 12,
      severity: "medium",
      icon: AlertTriangle,
      color: "text-yellow-500",
    },
    { type: t("slowPages"), count: 5, severity: "medium", icon: Clock, color: "text-orange-500" },
    { type: t("brokenLinks"), count: 8, severity: "high", icon: XCircle, color: "text-red-500" },
    {
      type: t("crawlErrors"),
      count: 2,
      severity: "low",
      icon: AlertTriangle,
      color: "text-gray-500",
    },
  ];

  const crawlHistory = [
    { date: t("today"), status: t("completed"), pages: 2847, issues: 28, duration: "2h 34m" },
    { date: t("yesterday"), status: t("completed"), pages: 2845, issues: 31, duration: "2h 41m" },
    {
      date: "2 " + t("daysAgo"),
      status: t("completed"),
      pages: 2834,
      issues: 35,
      duration: "2h 28m",
    },
    { date: "3 " + t("daysAgo"), status: t("failed"), pages: 1205, issues: 18, duration: "1h 12m" },
    {
      date: "4 " + t("daysAgo"),
      status: t("completed"),
      pages: 2821,
      issues: 29,
      duration: "2h 45m",
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

        {/* Monitoring Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid lg:grid-cols-3 gap-8 mb-16"
        >
          {monitoringPlans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className={`relative bg-card rounded-2xl p-8 border hover:shadow-lg transition-all duration-300 ${
                  plan.popular ? "ring-2 ring-primary" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      {t("mostPopular")}
                    </span>
                  </div>
                )}

                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-r ${plan.color} flex items-center justify-center mb-6`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-6">{plan.frequency}</p>

                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 + featureIndex * 0.05 }}
                      className="flex items-center text-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Live Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid lg:grid-cols-2 gap-8 mb-16"
        >
          {/* Alert Center */}
          <div className="bg-card rounded-2xl p-8 border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">{t("recentAlerts")}</h3>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center"
              >
                <Bell className="w-5 h-5 text-primary mr-2" />
                <span className="text-sm text-primary font-medium">5 {t("newAlerts")}</span>
              </motion.div>
            </div>

            <div className="space-y-4">
              {alertTypes.map((alert, index) => {
                const Icon = alert.icon;
                return (
                  <motion.div
                    key={alert.type}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <Icon className={`w-5 h-5 ${alert.color} mr-3`} />
                      <div>
                        <div className="font-medium text-foreground">{alert.type}</div>
                        <div className="text-sm text-muted-foreground capitalize">
                          {alert.severity} {t("priority")}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-foreground">{alert.count}</div>
                      <div className="text-xs text-muted-foreground">{t("issues")}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Crawl History */}
          <div className="bg-card rounded-2xl p-8 border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">{t("crawlHistory")}</h3>
              <div className="flex items-center space-x-2">
                <PlayCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-muted-foreground">{t("autoScheduled")}</span>
              </div>
            </div>

            <div className="space-y-3">
              {crawlHistory.map((crawl, index) => (
                <motion.div
                  key={crawl.date}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                >
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-3 ${
                        crawl.status === "completed"
                          ? "bg-green-500"
                          : crawl.status === "failed"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                      }`}
                    />
                    <div>
                      <div className="font-medium text-foreground">{crawl.date}</div>
                      <div className="text-sm text-muted-foreground">{crawl.duration}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">
                      {crawl.pages} {t("pages")}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {crawl.issues} {t("issues")}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-2xl p-8"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{t("smartNotifications")}</h3>
              <p className="text-muted-foreground mb-6">{t("smartNotifDesc")}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center p-4 bg-card rounded-lg border">
                  <Mail className="w-6 h-6 text-blue-500 mr-3" />
                  <div>
                    <div className="font-medium text-foreground">{t("emailAlerts")}</div>
                    <div className="text-sm text-muted-foreground">{t("emailDesc")}</div>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-card rounded-lg border">
                  <Smartphone className="w-6 h-6 text-green-500 mr-3" />
                  <div>
                    <div className="font-medium text-foreground">{t("mobilePush")}</div>
                    <div className="text-sm text-muted-foreground">{t("mobileDesc")}</div>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-card rounded-lg border">
                  <Bell className="w-6 h-6 text-purple-500 mr-3" />
                  <div>
                    <div className="font-medium text-foreground">{t("inAppAlerts")}</div>
                    <div className="text-sm text-muted-foreground">{t("inAppDesc")}</div>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-card rounded-lg border">
                  <Settings className="w-6 h-6 text-orange-500 mr-3" />
                  <div>
                    <div className="font-medium text-foreground">{t("customRules")}</div>
                    <div className="text-sm text-muted-foreground">{t("customDesc")}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border">
              <h4 className="text-lg font-semibold text-foreground mb-4">
                {t("performanceTrends")}
              </h4>

              {/* Trend Chart Placeholder */}
              <div className="relative h-40 bg-muted/30 rounded-lg mb-4 overflow-hidden">
                <div className="absolute inset-0 flex items-end justify-between p-4">
                  {[...Array(7)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${Math.random() * 80 + 20}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.8 + i * 0.1 }}
                      className="w-6 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t"
                    />
                  ))}
                </div>
                <div className="absolute top-4 left-4">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">+12%</div>
                  <div className="text-xs text-muted-foreground">{t("seoScore")}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">-8%</div>
                  <div className="text-xs text-muted-foreground">{t("issuesFound")}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
