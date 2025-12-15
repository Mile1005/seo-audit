"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import {
  Bell,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Smartphone,
  Slack,
  Settings,
  Filter,
  Calendar,
  Target,
  Zap,
  Users,
  Globe,
  Activity,
  BarChart3,
  Eye,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react";
import { Button } from "../../ui/button";

export default function AlertSystem() {
  const t = useTranslations("featurePages.keywordTracking.alertSystem");
  const router = useRouter();
  const [selectedAlert, setSelectedAlert] = useState("ranking-changes");
  const [alertFilter, setAlertFilter] = useState("all");

  const alertTypes = [
    {
      id: "ranking-changes",
      name: t("alertTypes.rankingChanges.name"),
      icon: TrendingUp,
      description: t("alertTypes.rankingChanges.description"),
      color: "blue",
      count: 23,
    },
    {
      id: "traffic-anomalies",
      name: t("alertTypes.trafficAnomalies.name"),
      icon: Activity,
      description: t("alertTypes.trafficAnomalies.description"),
      color: "green",
      count: 8,
    },
    {
      id: "competitor-moves",
      name: t("alertTypes.competitorMoves.name"),
      icon: Users,
      description: t("alertTypes.competitorMoves.description"),
      color: "purple",
      count: 15,
    },
    {
      id: "serp-features",
      name: t("alertTypes.serpFeatures.name"),
      description: t("alertTypes.serpFeatures.description"),
      icon: Eye,
      color: "orange",
      count: 12,
    },
    {
      id: "technical-issues",
      name: t("alertTypes.technicalIssues.name"),
      icon: AlertTriangle,
      description: t("alertTypes.technicalIssues.description"),
      color: "red",
      count: 3,
    },
  ];

  const recentAlerts = [
    {
      id: 1,
      type: "ranking-changes",
      severity: "high",
      title: t("recentAlerts.alert1.title"),
      description: t("recentAlerts.alert1.description"),
      keywords: ["seo audit tool", "website analysis", "technical seo"],
      timestamp: t("recentAlerts.alert1.timestamp"),
      change: +5,
      icon: TrendingUp,
      status: "unread",
    },
    {
      id: 2,
      type: "competitor-moves",
      severity: "medium",
      title: t("recentAlerts.alert2.title"),
      description: t("recentAlerts.alert2.description"),
      keywords: ["seo analysis"],
      timestamp: t("recentAlerts.alert2.timestamp"),
      change: -2,
      icon: Users,
      status: "read",
    },
    {
      id: 3,
      type: "serp-features",
      severity: "medium",
      title: t("recentAlerts.alert3.title"),
      description: t("recentAlerts.alert3.description"),
      keywords: ["how to do seo audit", "seo audit checklist"],
      timestamp: t("recentAlerts.alert3.timestamp"),
      change: 0,
      icon: Eye,
      status: "unread",
    },
    {
      id: 4,
      type: "traffic-anomalies",
      severity: "high",
      title: t("recentAlerts.alert4.title"),
      description: t("recentAlerts.alert4.description"),
      keywords: ["mobile seo", "responsive design"],
      timestamp: t("recentAlerts.alert4.timestamp"),
      change: +156,
      icon: Activity,
      status: "read",
    },
    {
      id: 5,
      type: "technical-issues",
      severity: "critical",
      title: t("recentAlerts.alert5.title"),
      description: t("recentAlerts.alert5.description"),
      keywords: [],
      timestamp: t("recentAlerts.alert5.timestamp"),
      change: -12,
      icon: AlertTriangle,
      status: "unread",
    },
  ];

  const notificationChannels = [
    {
      id: "email",
      name: t("channels.email.name"),
      icon: Mail,
      description: t("channels.email.description"),
      enabled: true,
      frequency: "instant",
    },
    {
      id: "push",
      name: t("channels.push.name"),
      icon: Smartphone,
      description: t("channels.push.description"),
      enabled: true,
      frequency: "instant",
    },
    {
      id: "slack",
      name: t("channels.slack.name"),
      icon: Slack,
      description: t("channels.slack.description"),
      enabled: false,
      frequency: "daily",
    },
    {
      id: "webhook",
      name: t("channels.webhook.name"),
      icon: Globe,
      description: t("channels.webhook.description"),
      enabled: false,
      frequency: "instant",
    },
  ];

  const alertSettings = [
    {
      category: t("alertSettings.rankingThresholds.title"),
      settings: [
        {
          name: t("alertSettings.rankingThresholds.positionChanges.name"),
          value: t("alertSettings.rankingThresholds.positionChanges.value"),
          description: t("alertSettings.rankingThresholds.positionChanges.description"),
        },
        {
          name: t("alertSettings.rankingThresholds.firstPageEntries.name"),
          value: t("alertSettings.rankingThresholds.firstPageEntries.value"),
          description: t("alertSettings.rankingThresholds.firstPageEntries.description"),
        },
        {
          name: t("alertSettings.rankingThresholds.top3Achievements.name"),
          value: t("alertSettings.rankingThresholds.top3Achievements.value"),
          description: t("alertSettings.rankingThresholds.top3Achievements.description"),
        },
      ],
    },
    {
      category: t("alertSettings.trafficAlerts.title"),
      settings: [
        {
          name: t("alertSettings.trafficAlerts.trafficAnomalies.name"),
          value: t("alertSettings.trafficAlerts.trafficAnomalies.value"),
          description: t("alertSettings.trafficAlerts.trafficAnomalies.description"),
        },
        {
          name: t("alertSettings.trafficAlerts.ctrChanges.name"),
          value: t("alertSettings.trafficAlerts.ctrChanges.value"),
          description: t("alertSettings.trafficAlerts.ctrChanges.description"),
        },
        {
          name: t("alertSettings.trafficAlerts.impressionChanges.name"),
          value: t("alertSettings.trafficAlerts.impressionChanges.value"),
          description: t("alertSettings.trafficAlerts.impressionChanges.description"),
        },
      ],
    },
    {
      category: t("alertSettings.competitorMonitoring.title"),
      settings: [
        {
          name: t("alertSettings.competitorMonitoring.newCompetitors.name"),
          value: t("alertSettings.competitorMonitoring.newCompetitors.value"),
          description: t("alertSettings.competitorMonitoring.newCompetitors.description"),
        },
        {
          name: t("alertSettings.competitorMonitoring.positionOvertakes.name"),
          value: t("alertSettings.competitorMonitoring.positionOvertakes.value"),
          description: t("alertSettings.competitorMonitoring.positionOvertakes.description"),
        },
        {
          name: t("alertSettings.competitorMonitoring.serpFeatureWins.name"),
          value: t("alertSettings.competitorMonitoring.serpFeatureWins.value"),
          description: t("alertSettings.competitorMonitoring.serpFeatureWins.description"),
        },
      ],
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-400 bg-red-500/10 border-red-500/20";
      case "high":
        return "text-orange-400 bg-orange-500/10 border-orange-500/20";
      case "medium":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
      case "low":
        return "text-green-400 bg-green-500/10 border-green-500/20";
      default:
        return "text-muted-foreground bg-muted border-border";
    }
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <ArrowUp className="w-4 h-4 text-emerald-400" />;
    if (change < 0) return <ArrowDown className="w-4 h-4 text-rose-400" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  const filteredAlerts =
    alertFilter === "all"
      ? recentAlerts
      : recentAlerts.filter((alert) => alert.status === alertFilter);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t("header.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("header.subtitle")}</p>
        </motion.div>

        {/* Alert Types Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12"
        >
          {alertTypes.map((type, index) => {
            const Icon = type.icon;
            const isActive = selectedAlert === type.id;

            return (
              <motion.button
                key={type.id}
                onClick={() => setSelectedAlert(type.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-center relative ${
                  isActive
                    ? "border-primary bg-primary/10 shadow-lg"
                    : "border-border bg-card hover:border-primary/50 hover:shadow-md"
                }`}
              >
                {type.count > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {type.count}
                  </div>
                )}
                <Icon
                  className={`w-8 h-8 mx-auto mb-2 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                />
                <h3
                  className={`font-semibold text-sm mb-1 ${isActive ? "text-foreground" : "text-foreground"}`}
                >
                  {type.name}
                </h3>
                <p
                  className={`text-xs ${isActive ? "text-muted-foreground" : "text-muted-foreground"}`}
                >
                  {type.description}
                </p>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Alert Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card rounded-xl border p-6 mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-foreground">Recent Alerts</h3>
            <div className="flex items-center space-x-4">
              {/* Filter */}
              <label htmlFor="alert-filter" className="sr-only">
                Filter alerts
              </label>
              <select
                id="alert-filter"
                value={alertFilter}
                onChange={(e) => setAlertFilter(e.target.value)}
                className="bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground"
              >
                <option value="all">{t("alertFeed.filter.all")}</option>
                <option value="unread">{t("alertFeed.filter.unread")}</option>
                <option value="read">{t("alertFeed.filter.read")}</option>
              </select>

              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                {t("alertFeed.settings")}
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredAlerts.map((alert, index) => {
              const Icon = alert.icon;
              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)} ${
                    alert.status === "unread" ? "bg-opacity-100" : "bg-opacity-50"
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-foreground">{alert.title}</h4>
                        <div className="flex items-center space-x-2">
                          {alert.change !== 0 && (
                            <div className="flex items-center space-x-1">
                              {getChangeIcon(alert.change)}
                              <span
                                className={`text-sm font-medium ${
                                  alert.change > 0 ? "text-emerald-400" : "text-rose-400"
                                }`}
                              >
                                {alert.change > 0 ? "+" : ""}
                                {alert.change}
                              </span>
                            </div>
                          )}
                          <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>

                      {alert.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {alert.keywords.map((keyword, keywordIndex) => (
                            <span
                              key={keywordIndex}
                              className="inline-block bg-muted px-2 py-1 rounded text-xs text-muted-foreground"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex-shrink-0">
                      {alert.status === "unread" && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Notification Channels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {/* Channels */}
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              {t("notificationChannels.title")}
            </h3>
            <div className="space-y-4">
              {notificationChannels.map((channel, index) => {
                const Icon = channel.icon;
                return (
                  <motion.div
                    key={channel.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium text-foreground">{channel.name}</div>
                        <div className="text-sm text-muted-foreground">{channel.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">{channel.frequency}</span>
                      <div
                        className={`w-10 h-6 rounded-full transition-colors ${
                          channel.enabled ? "bg-primary" : "bg-muted"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 bg-white rounded-full transition-transform mt-1 ${
                            channel.enabled ? "translate-x-5" : "translate-x-1"
                          }`}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Alert Settings */}
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              {t("configuration.title")}
            </h3>
            <div className="space-y-6">
              {alertSettings.map((category, categoryIndex) => (
                <div key={category.category}>
                  <h4 className="font-medium text-foreground mb-3">{category.category}</h4>
                  <div className="space-y-2">
                    {category.settings.map((setting, settingIndex) => (
                      <motion.div
                        key={setting.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: (categoryIndex * 3 + settingIndex) * 0.1,
                        }}
                        className="flex items-center justify-between p-2 hover:bg-muted/30 rounded"
                      >
                        <div>
                          <div className="text-sm font-medium text-foreground">{setting.name}</div>
                          <div className="text-xs text-muted-foreground">{setting.description}</div>
                        </div>
                        <div className="text-sm text-primary font-medium">{setting.value}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Smart Alerts CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-card border rounded-xl p-8">
            <Zap className="w-16 h-16 text-orange-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-foreground mb-4">{t("cta.title")}</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">{t("cta.description")}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                onClick={() => router.push("/dashboard/keywords")}
              >
                <Bell className="w-5 h-5 mr-2" />
                {t("cta.setup")}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push("/dashboard/keywords")}
              >
                <Settings className="w-5 h-5 mr-2" />
                {t("cta.configure")}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
