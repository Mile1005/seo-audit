"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
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
  Minus
} from "lucide-react";
import { Button } from "../../ui/button";

export default function AlertSystem() {
  const [selectedAlert, setSelectedAlert] = useState("ranking-changes");
  const [alertFilter, setAlertFilter] = useState("all");

  const alertTypes = [
    {
      id: "ranking-changes",
      name: "Ranking Changes",
      icon: TrendingUp,
      description: "Position improvements or drops",
      color: "blue",
      count: 23
    },
    {
      id: "traffic-anomalies",
      name: "Traffic Anomalies",
      icon: Activity,
      description: "Unusual traffic patterns",
      color: "green",
      count: 8
    },
    {
      id: "competitor-moves",
      name: "Competitor Moves",
      icon: Users,
      description: "Competitor ranking changes",
      color: "purple",
      count: 15
    },
    {
      id: "serp-features",
      name: "SERP Features",
      description: "New feature opportunities",
      icon: Eye,
      color: "orange",
      count: 12
    },
    {
      id: "technical-issues",
      name: "Technical Issues",
      icon: AlertTriangle,
      description: "Crawl errors and issues",
      color: "red",
      count: 3
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: "ranking-changes",
      severity: "high",
      title: "Major ranking improvement detected",
      description: "5 keywords moved to first page positions",
      keywords: ["seo audit tool", "website analysis", "technical seo"],
      timestamp: "2 minutes ago",
      change: +5,
      icon: TrendingUp,
      status: "unread"
    },
    {
      id: 2,
      type: "competitor-moves",
      severity: "medium",
      title: "Competitor overtook your position",
      description: "semrush.com moved above you for 'seo analysis'",
      keywords: ["seo analysis"],
      timestamp: "15 minutes ago",
      change: -2,
      icon: Users,
      status: "read"
    },
    {
      id: 3,
      type: "serp-features",
      severity: "medium",
      title: "Featured snippet opportunity",
      description: "New PAA box appeared for tracked keywords",
      keywords: ["how to do seo audit", "seo audit checklist"],
      timestamp: "1 hour ago",
      change: 0,
      icon: Eye,
      status: "unread"
    },
    {
      id: 4,
      type: "traffic-anomalies",
      severity: "high",
      title: "Traffic spike detected",
      description: "156% increase in organic traffic from mobile",
      keywords: ["mobile seo", "responsive design"],
      timestamp: "3 hours ago",
      change: +156,
      icon: Activity,
      status: "read"
    },
    {
      id: 5,
      type: "technical-issues",
      severity: "critical",
      title: "Crawl errors increased",
      description: "12 new 404 errors found on your website",
      keywords: [],
      timestamp: "6 hours ago",
      change: -12,
      icon: AlertTriangle,
      status: "unread"
    }
  ];

  const notificationChannels = [
    {
      id: "email",
      name: "Email",
      icon: Mail,
      description: "Get alerts via email",
      enabled: true,
      frequency: "instant"
    },
    {
      id: "push",
      name: "Push Notifications",
      icon: Smartphone,
      description: "Browser and mobile push",
      enabled: true,
      frequency: "instant"
    },
    {
      id: "slack",
      name: "Slack",
      icon: Slack,
      description: "Team collaboration alerts",
      enabled: false,
      frequency: "daily"
    },
    {
      id: "webhook",
      name: "Webhook",
      icon: Globe,
      description: "Custom integrations",
      enabled: false,
      frequency: "instant"
    }
  ];

  const alertSettings = [
    {
      category: "Ranking Thresholds",
      settings: [
        { name: "Position changes", value: "±3 positions", description: "Alert when ranking changes by 3+ positions" },
        { name: "First page entries", value: "Enabled", description: "Alert when keywords enter top 10" },
        { name: "Top 3 achievements", value: "Enabled", description: "Alert when reaching top 3 positions" }
      ]
    },
    {
      category: "Traffic Alerts",
      settings: [
        { name: "Traffic anomalies", value: "±25%", description: "Alert on significant traffic changes" },
        { name: "CTR changes", value: "±15%", description: "Alert on click-through rate changes" },
        { name: "Impression changes", value: "±30%", description: "Alert on search impression changes" }
      ]
    },
    {
      category: "Competitor Monitoring",
      settings: [
        { name: "New competitors", value: "Enabled", description: "Alert when new competitors appear" },
        { name: "Position overtakes", value: "Enabled", description: "Alert when competitors overtake you" },
        { name: "SERP feature wins", value: "Enabled", description: "Alert when competitors win features" }
      ]
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-600 bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800";
      case "high": return "text-orange-600 bg-orange-100 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800";
      case "medium": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800";
      case "low": return "text-green-600 bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800";
      default: return "text-muted-foreground bg-muted border-border";
    }
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <ArrowUp className="w-4 h-4 text-green-600" />;
    if (change < 0) return <ArrowDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  const filteredAlerts = alertFilter === "all" 
    ? recentAlerts 
    : recentAlerts.filter(alert => alert.status === alertFilter);

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
            Smart Alert System
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay informed with intelligent alerts for ranking changes, traffic anomalies, 
            competitor moves, and technical issues. Never miss important SEO developments.
          </p>
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
                <Icon className={`w-8 h-8 mx-auto mb-2 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                <h3 className={`font-semibold text-sm mb-1 ${isActive ? "text-foreground" : "text-foreground"}`}>
                  {type.name}
                </h3>
                <p className={`text-xs ${isActive ? "text-muted-foreground" : "text-muted-foreground"}`}>
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
              <select 
                value={alertFilter}
                onChange={(e) => setAlertFilter(e.target.value)}
                className="bg-muted border border-border rounded-lg px-3 py-2 text-sm"
              >
                <option value="all">All Alerts</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
              
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
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
                              <span className={`text-sm font-medium ${
                                alert.change > 0 ? "text-green-600" : "text-red-600"
                              }`}>
                                {alert.change > 0 ? "+" : ""}{alert.change}
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
            <h3 className="text-xl font-semibold text-foreground mb-6">Notification Channels</h3>
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
                      <div className={`w-10 h-6 rounded-full transition-colors ${
                        channel.enabled ? "bg-primary" : "bg-muted"
                      }`}>
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform mt-1 ${
                          channel.enabled ? "translate-x-5" : "translate-x-1"
                        }`}></div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Alert Settings */}
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-xl font-semibold text-foreground mb-6">Alert Configuration</h3>
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
                        transition={{ duration: 0.4, delay: (categoryIndex * 3 + settingIndex) * 0.1 }}
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
          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-8 border border-orange-200 dark:border-orange-800">
            <Zap className="w-16 h-16 text-orange-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Never Miss Critical SEO Changes
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Set up intelligent alerts and stay ahead of ranking changes, technical issues, 
              and competitor moves with our advanced monitoring system.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                <Bell className="w-5 h-5 mr-2" />
                Setup Smart Alerts
              </Button>
              <Button variant="outline" size="lg">
                <Settings className="w-5 h-5 mr-2" />
                Configure Notifications
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
