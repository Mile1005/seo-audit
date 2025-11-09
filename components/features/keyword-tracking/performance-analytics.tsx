"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Eye,
  MousePointer,
  Target,
  Calendar,
  ArrowUp,
  ArrowDown,
  Filter,
  Download,
  Share2,
  Zap,
  Activity,
  Users,
  Clock,
  Globe
} from "lucide-react";
import { Button } from "../../ui/button";

export default function PerformanceAnalytics() {
  const t = useTranslations('featurePages.keywordTracking.performanceAnalytics');
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d");
  const [selectedMetric, setSelectedMetric] = useState("rankings");

  const timeframes = [
    { id: "7d", label: t('timeframes.7d') },
    { id: "30d", label: t('timeframes.30d') },
    { id: "90d", label: t('timeframes.90d') },
    { id: "1y", label: t('timeframes.1y') }
  ];

  const metrics = [
    { id: "rankings", label: t('metrics.rankings.label'), icon: TrendingUp, color: "blue" },
    { id: "visibility", label: t('metrics.visibility.label'), icon: Eye, color: "green" },
    { id: "traffic", label: t('metrics.traffic.label'), icon: Users, color: "purple" },
    { id: "clicks", label: t('metrics.clicks.label'), icon: MousePointer, color: "orange" }
  ];

  const performanceData = {
    "7d": {
      rankings: { current: 15.2, change: +2.1, trend: "up" },
      visibility: { current: 67.8, change: +5.3, trend: "up" },
      traffic: { current: 12847, change: +856, trend: "up" },
      clicks: { current: 3429, change: +127, trend: "up" }
    },
    "30d": {
      rankings: { current: 18.7, change: +4.8, trend: "up" },
      visibility: { current: 73.4, change: +12.1, trend: "up" },
      traffic: { current: 45623, change: +7234, trend: "up" },
      clicks: { current: 11287, change: +1876, trend: "up" }
    },
    "90d": {
      rankings: { current: 22.3, change: +8.9, trend: "up" },
      visibility: { current: 81.2, change: +18.7, trend: "up" },
      traffic: { current: 128456, change: +23891, trend: "up" },
      clicks: { current: 34562, change: +6789, trend: "up" }
    },
    "1y": {
      rankings: { current: 31.8, change: +15.2, trend: "up" },
      visibility: { current: 89.6, change: +34.8, trend: "up" },
      traffic: { current: 567234, change: +123456, trend: "up" },
      clicks: { current: 145678, change: +34567, trend: "up" }
    }
  };

  const currentData = performanceData[selectedTimeframe as keyof typeof performanceData];

  const keywordPerformance = [
    { keyword: t('keywordTable.keywords.keyword1'), position: 3, change: +2, traffic: 1247, difficulty: 65 },
    { keyword: t('keywordTable.keywords.keyword2'), position: 7, change: +1, traffic: 892, difficulty: 58 },
    { keyword: t('keywordTable.keywords.keyword3'), position: 12, change: +5, traffic: 634, difficulty: 72 },
    { keyword: t('keywordTable.keywords.keyword4'), position: 15, change: +3, traffic: 445, difficulty: 55 },
    { keyword: t('keywordTable.keywords.keyword5'), position: 8, change: -1, traffic: 723, difficulty: 68 }
  ];

  const analyticsFeatures = [
    {
      icon: BarChart3,
      title: t('analyticsFeatures.rankingTrends.title'),
      description: t('analyticsFeatures.rankingTrends.description'),
      metrics: [
        t('analyticsFeatures.rankingTrends.metrics.item1'),
        t('analyticsFeatures.rankingTrends.metrics.item2'),
        t('analyticsFeatures.rankingTrends.metrics.item3'),
        t('analyticsFeatures.rankingTrends.metrics.item4')
      ]
    },
    {
      icon: Eye,
      title: t('analyticsFeatures.visibilityMetrics.title'),
      description: t('analyticsFeatures.visibilityMetrics.description'),
      metrics: [
        t('analyticsFeatures.visibilityMetrics.metrics.item1'),
        t('analyticsFeatures.visibilityMetrics.metrics.item2'),
        t('analyticsFeatures.visibilityMetrics.metrics.item3'),
        t('analyticsFeatures.visibilityMetrics.metrics.item4')
      ]
    },
    {
      icon: Users,
      title: t('analyticsFeatures.trafficAnalysis.title'),
      description: t('analyticsFeatures.trafficAnalysis.description'),
      metrics: [
        t('analyticsFeatures.trafficAnalysis.metrics.item1'),
        t('analyticsFeatures.trafficAnalysis.metrics.item2'),
        t('analyticsFeatures.trafficAnalysis.metrics.item3'),
        t('analyticsFeatures.trafficAnalysis.metrics.item4')
      ]
    },
    {
      icon: Target,
      title: t('analyticsFeatures.competitiveIntel.title'),
      description: t('analyticsFeatures.competitiveIntel.description'),
      metrics: [
        t('analyticsFeatures.competitiveIntel.metrics.item1'),
        t('analyticsFeatures.competitiveIntel.metrics.item2'),
        t('analyticsFeatures.competitiveIntel.metrics.item3'),
        t('analyticsFeatures.competitiveIntel.metrics.item4')
      ]
    }
  ];

  const getMetricColor = (color: string) => {
    switch (color) {
      case "blue": return "text-blue-400 bg-blue-500/10";
      case "green": return "text-green-400 bg-green-500/10";
      case "purple": return "text-purple-400 bg-purple-500/10";
      case "orange": return "text-orange-400 bg-orange-500/10";
      default: return "text-muted-foreground bg-muted";
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
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
            {t('header.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('header.subtitle')}
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          {/* Timeframe Selector */}
          <div className="flex bg-muted rounded-lg p-1">
            {timeframes.map((timeframe) => (
              <button
                key={timeframe.id}
                onClick={() => setSelectedTimeframe(timeframe.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  selectedTimeframe === timeframe.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {timeframe.label}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              {t('controls.filter')}
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              {t('controls.export')}
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              {t('controls.share')}
            </Button>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            const data = currentData[metric.id as keyof typeof currentData];
            const isActive = selectedMetric === metric.id;
            
            return (
              <motion.button
                key={metric.id}
                onClick={() => setSelectedMetric(metric.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`p-6 rounded-xl border-2 text-left transition-all duration-300 ${
                  isActive 
                    ? "border-primary bg-primary/10 shadow-lg"
                    : "border-border bg-card hover:border-primary/50 hover:shadow-md"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${getMetricColor(metric.color)}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex items-center space-x-1">
                    {data.trend === "up" ? (
                      <ArrowUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-sm font-medium ${
                      data.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}>
                      {data.change > 0 ? "+" : ""}{data.change}
                    </span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {metric.id === "rankings" ? data.current.toFixed(1) : formatNumber(data.current)}
                </div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Performance Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-card rounded-xl border p-8 mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-foreground">
              {metrics.find(m => m.id === selectedMetric)?.label} {t('chart.trend')}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{t('chart.last')} {timeframes.find(t => t.id === selectedTimeframe)?.label}</span>
            </div>
          </div>
          
          {/* Simulated Chart */}
          <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Activity className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{t('chart.visualization')}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {t('chart.drillDown')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Keyword Performance Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-card rounded-xl border p-6 mb-12"
        >
          <h3 className="text-xl font-semibold text-foreground mb-6">{t('keywordTable.title')}</h3>
          
          <div 
            className="overflow-x-auto" 
            tabIndex={0}
            role="region"
            aria-label="Performance analytics table"
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">{t('keywordTable.headers.keyword')}</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">{t('keywordTable.headers.position')}</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">{t('keywordTable.headers.change')}</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">{t('keywordTable.headers.traffic')}</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">{t('keywordTable.headers.difficulty')}</th>
                </tr>
              </thead>
              <tbody>
                {keywordPerformance.map((keyword, index) => (
                  <motion.tr
                    key={keyword.keyword}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-3 px-2">
                      <span className="font-medium text-foreground">{keyword.keyword}</span>
                    </td>
                    <td className="py-3 px-2">
                      <span className="text-foreground font-medium">#{keyword.position}</span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center space-x-1">
                        {keyword.change > 0 ? (
                          <ArrowUp className="w-4 h-4 text-green-600" />
                        ) : (
                          <ArrowDown className="w-4 h-4 text-red-600" />
                        )}
                        <span className={`text-sm font-medium ${
                          keyword.change > 0 ? "text-green-600" : "text-red-600"
                        }`}>
                          {keyword.change > 0 ? "+" : ""}{keyword.change}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <span className="text-muted-foreground">{formatNumber(keyword.traffic)}</span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${keyword.difficulty > 70 ? "bg-red-500" : keyword.difficulty > 50 ? "bg-yellow-500" : "bg-green-500"}`}
                            style={{ width: `${keyword.difficulty}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-muted-foreground">{keyword.difficulty}</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Analytics Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {analyticsFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-xl border p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {feature.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span className="text-sm text-muted-foreground">{metric}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Advanced Analytics CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-card border rounded-xl p-8">
            <Zap className="w-16 h-16 text-purple-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {t('cta.title')}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <BarChart3 className="w-5 h-5 mr-2" />
                {t('cta.unlock')}
              </Button>
              <Button variant="outline" size="lg">
                <Globe className="w-5 h-5 mr-2" />
                {t('cta.viewDemo')}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
