"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Bell,
  Eye,
  Calendar,
  BarChart3,
  PieChart,
  Users,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Settings,
  Play,
  Pause,
  RefreshCw
} from "lucide-react";
import { Button } from "../../ui/button";
import { useTranslations } from "next-intl";

export default function MonitoringDashboard() {
  const t = useTranslations('featurePages.competitorAnalysis.monitoringDashboard');
  const [timeRange, setTimeRange] = useState("7d");
  const [isMonitoring, setIsMonitoring] = useState(true);

  const timeRanges = [
    { value: "1d", label: t('timeRanges.24h') },
    { value: "7d", label: t('timeRanges.7d') },
    { value: "30d", label: t('timeRanges.30d') },
    { value: "90d", label: t('timeRanges.90d') }
  ];

  const monitoringStats = [
    { 
      label: t('stats.activeMonitors'), 
      value: "12", 
      change: "+3", 
      positive: true,
      description: t('stats.activeMonitorsDesc')
    },
    { 
      label: t('stats.alertsToday'), 
      value: "8", 
      change: "+2", 
      positive: false,
      description: t('stats.alertsTodayDesc')
    },
    { 
      label: t('stats.keywordsTracked'), 
      value: "247", 
      change: "+15", 
      positive: true,
      description: t('stats.keywordsTrackedDesc')
    },
    { 
      label: t('stats.checkFreq'), 
      value: "6h", 
      change: "0", 
      positive: null,
      description: t('stats.checkFreqDesc')
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: "ranking_change",
      competitor: "semrush.com",
      keyword: "seo audit tool",
      change: -2,
      previousRank: 1,
      currentRank: 3,
      timestamp: "2 hours ago",
      severity: "high"
    },
    {
      id: 2,
      type: "new_content",
      competitor: "ahrefs.com",
      title: "Complete Technical SEO Guide 2024",
      url: "/blog/technical-seo-guide",
      timestamp: "4 hours ago",
      severity: "medium"
    },
    {
      id: 3,
      type: "backlink_gain",
      competitor: "screaming-frog.co.uk",
      domain: "moz.com",
      linkCount: 3,
      timestamp: "6 hours ago",
      severity: "medium"
    },
    {
      id: 4,
      type: "ranking_gain",
      competitor: "sitechecker.pro",
      keyword: "website analyzer",
      change: +4,
      previousRank: 8,
      currentRank: 4,
      timestamp: "12 hours ago",
      severity: "high"
    }
  ];

  const competitorMetrics = [
    {
      name: "semrush.com",
      status: "active",
      keywords: 89,
      avgPosition: 3.2,
      change: -0.8,
      visibility: 78,
      lastUpdate: "5 min ago"
    },
    {
      name: "ahrefs.com",
      status: "active", 
      keywords: 76,
      avgPosition: 4.1,
      change: +0.3,
      visibility: 65,
      lastUpdate: "8 min ago"
    },
    {
      name: "screaming-frog.co.uk",
      status: "active",
      keywords: 54,
      avgPosition: 5.7,
      change: +1.2,
      visibility: 52,
      lastUpdate: "3 min ago"
    },
    {
      name: "sitechecker.pro",
      status: "paused",
      keywords: 28,
      avgPosition: 7.3,
      change: -0.5,
      visibility: 34,
      lastUpdate: "2 hours ago"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-500/10 text-red-400 border-red-500/20";
      case "medium": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "low": return "bg-green-500/10 text-green-400 border-green-500/20";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "ranking_change":
      case "ranking_gain":
        return <BarChart3 className="w-4 h-4" />;
      case "new_content":
        return <Eye className="w-4 h-4" />;
      case "backlink_gain":
        return <Globe className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getChangeIndicator = (change: number | null) => {
    if (change === null || change === 0) {
      return <Minus className="w-3 h-3 text-muted-foreground" />;
    }
    return change > 0 ? (
      <ArrowUpRight className="w-3 h-3 text-green-600" />
    ) : (
      <ArrowDownRight className="w-3 h-3 text-red-600" />
    );
  };

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
            {t('title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-between items-center mb-8 p-6 bg-card rounded-xl border"
        >
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isMonitoring ? "bg-green-500" : "bg-red-500"}`}></div>
              <span className="text-sm font-medium text-foreground">
                {isMonitoring ? t('controls.monitoringActive') : t('controls.monitoringPaused')}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <label htmlFor="monitoring-time-range" className="sr-only">Select time range for monitoring</label>
              <select 
                id="monitoring-time-range"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Select time range for monitoring dashboard"
              >
                {timeRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsMonitoring(!isMonitoring)}
            >
              {isMonitoring ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isMonitoring ? t('controls.pause') : t('controls.resume')}
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              {t('controls.refresh')}
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              {t('controls.settings')}
            </Button>
          </div>
        </motion.div>

        {/* Monitoring Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {monitoringStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="bg-card p-6 rounded-xl border hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center">
                  {getChangeIndicator(stat.positive === null ? 0 : stat.positive ? 1 : -1)}
                  <span className={`text-sm ml-1 ${
                    stat.positive === null ? "text-muted-foreground" :
                    stat.positive ? "text-green-600" : "text-red-600"
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="text-sm font-medium text-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Alerts */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-2 bg-card rounded-xl border overflow-hidden"
          >
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <Bell className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{t('alerts.title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('alerts.subtitle')}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  {t('alerts.viewAll')}
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {recentAlerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  className="flex items-start space-x-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className={`p-2 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-foreground truncate">
                        {alert.type === "ranking_change" && 
                          t('alerts.rankingDrop', { competitor: alert.competitor, positions: Math.abs(alert.change!) })}
                        {alert.type === "ranking_gain" && 
                          t('alerts.rankingGain', { competitor: alert.competitor, positions: alert.change! })}
                        {alert.type === "new_content" && 
                          t('alerts.newContent', { competitor: alert.competitor })}
                        {alert.type === "backlink_gain" && 
                          t('alerts.backlinkGain', { competitor: alert.competitor, count: alert.linkCount! })}
                      </h4>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {alert.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {alert.type === "ranking_change" && 
                        `"${alert.keyword}" moved from #${alert.previousRank} to #${alert.currentRank}`}
                      {alert.type === "ranking_gain" && 
                        `"${alert.keyword}" moved from #${alert.previousRank} to #${alert.currentRank}`}
                      {alert.type === "new_content" && 
                        `"${alert.title}"`}
                      {alert.type === "backlink_gain" && 
                        `New links from ${alert.domain}`}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Competitor Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-card rounded-xl border overflow-hidden"
          >
            <div className="p-6 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Activity className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{t('competitorStatus.title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('competitorStatus.subtitle')}</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {competitorMetrics.map((competitor, index) => (
                <motion.div
                  key={competitor.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        competitor.status === "active" ? "bg-green-500" : "bg-red-500"
                      }`}></div>
                      <span className="font-medium text-foreground text-sm">
                        {competitor.name}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {competitor.lastUpdate}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="text-muted-foreground">{t('competitorStatus.keywords')}</div>
                      <div className="font-medium text-foreground">{competitor.keywords}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">{t('competitorStatus.avgPosition')}</div>
                      <div className="flex items-center">
                        <span className="font-medium text-foreground mr-1">
                          {competitor.avgPosition}
                        </span>
                        <span className={`text-xs ${
                          competitor.change > 0 ? "text-red-600" : 
                          competitor.change < 0 ? "text-green-600" : 
                          "text-muted-foreground"
                        }`}>
                          ({competitor.change > 0 ? "+" : ""}{competitor.change})
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">{t('competitorStatus.visibility')}</div>
                      <div className="font-medium text-foreground">{competitor.visibility}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">{t('competitorStatus.status')}</div>
                      <div className={`font-medium capitalize ${
                        competitor.status === "active" ? "text-green-600" : "text-red-600"
                      }`}>
                        {competitor.status}
                      </div>
                    </div>
                  </div>
                  
                  {index < competitorMetrics.length - 1 && (
                    <hr className="border-border" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Monitoring Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-12 bg-card border rounded-xl p-8"
        >
          <div className="text-center">
            <h3 className="text-xl font-bold text-foreground mb-4">
              {t('cta.title')}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg">
                <Bell className="w-4 h-4 mr-2" />
                {t('cta.setupBtn')}
              </Button>
              <Button variant="outline" size="lg">
                <Eye className="w-4 h-4 mr-2" />
                {t('cta.reportsBtn')}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
