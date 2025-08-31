"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Target,
  Eye,
  Filter,
  Calendar
} from "lucide-react";
import { Button } from "../../ui/button";

export default function SerpComparison() {
  const [selectedKeyword, setSelectedKeyword] = useState("seo audit tool");
  const [timeRange, setTimeRange] = useState("30d");

  const keywords = [
    "seo audit tool",
    "website analyzer", 
    "seo checker",
    "site audit software",
    "technical seo"
  ];

  const serpData = [
    { 
      keyword: "seo audit tool", 
      yourRank: 4, 
      yourChange: +2,
      competitors: [
        { name: "semrush.com", rank: 1, change: 0 },
        { name: "ahrefs.com", rank: 2, change: +1 },
        { name: "screaming-frog.co.uk", rank: 3, change: -1 },
        { name: "yoursite.com", rank: 4, change: +2 },
        { name: "sitechecker.pro", rank: 5, change: -1 }
      ],
      volume: 12100,
      difficulty: 67
    },
    {
      keyword: "website analyzer",
      yourRank: 7,
      yourChange: +3,
      competitors: [
        { name: "gtmetrix.com", rank: 1, change: 0 },
        { name: "pingdom.com", rank: 2, change: 0 },
        { name: "web.dev", rank: 3, change: +1 },
        { name: "webpagetest.org", rank: 4, change: -1 },
        { name: "tools.google.com", rank: 5, change: 0 },
        { name: "seoptimer.com", rank: 6, change: +1 },
        { name: "yoursite.com", rank: 7, change: +3 }
      ],
      volume: 8200,
      difficulty: 54
    }
  ];

  const currentData = serpData.find(data => data.keyword === selectedKeyword);

  const performanceMetrics = [
    { label: "Avg. Position", value: "4.2", change: "+1.8", positive: true },
    { label: "Visibility Score", value: "78%", change: "+12%", positive: true },
    { label: "Click Share", value: "23%", change: "+8%", positive: true },
    { label: "Impressions", value: "45.2K", change: "+15%", positive: true }
  ];

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
            SERP Intelligence & Position Tracking
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Monitor keyword rankings across search engines and track competitor movements in real-time
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
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <label htmlFor="keyword-selector" className="sr-only">Select keyword to analyze</label>
              <select 
                id="keyword-selector"
                value={selectedKeyword}
                onChange={(e) => setSelectedKeyword(e.target.value)}
                className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Select keyword to analyze"
              >
                {keywords.map(keyword => (
                  <option key={keyword} value={keyword}>{keyword}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <label htmlFor="time-range-selector" className="sr-only">Select time range</label>
              <select 
                id="time-range-selector"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Select time range for analysis"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 3 months</option>
                <option value="1y">Last year</option>
              </select>
            </div>
          </div>

          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {performanceMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="bg-card p-6 rounded-xl border text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
              <div className="text-sm text-muted-foreground mb-2">{metric.label}</div>
              <div className={`text-sm font-medium flex items-center justify-center ${
                metric.positive ? "text-green-600" : "text-red-600"
              }`}>
                {metric.positive ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {metric.change}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* SERP Ranking Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-card rounded-xl border overflow-hidden"
        >
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  SERP Positions for "{selectedKeyword}"
                </h3>
                <p className="text-sm text-muted-foreground">
                  Search Volume: {currentData?.volume.toLocaleString()} • Difficulty: {currentData?.difficulty}%
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Live Data</span>
              </div>
            </div>
          </div>

          <div 
            className="overflow-x-auto" 
            tabIndex={0}
            role="region"
            aria-label="SERP comparison table"
          >
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-semibold text-foreground">Rank</th>
                  <th className="text-left p-4 font-semibold text-foreground">Domain</th>
                  <th className="text-center p-4 font-semibold text-foreground">Change</th>
                  <th className="text-center p-4 font-semibold text-foreground">Trend</th>
                  <th className="text-center p-4 font-semibold text-foreground">Est. Traffic</th>
                </tr>
              </thead>
              <tbody>
                {currentData?.competitors.map((competitor, index) => (
                  <motion.tr
                    key={competitor.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                    className={`border-b hover:bg-muted/30 transition-colors ${
                      competitor.name === "yoursite.com" ? "bg-primary/10 border-primary/20" : ""
                    }`}
                  >
                    <td className="p-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        competitor.rank === 1 ? "bg-yellow-500 text-white" :
                        competitor.rank === 2 ? "bg-gray-400 text-white" :
                        competitor.rank === 3 ? "bg-orange-500 text-white" :
                        "bg-muted text-foreground"
                      }`}>
                        {competitor.rank}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-foreground">{competitor.name}</div>
                      {competitor.name === "yoursite.com" && (
                        <div className="text-xs text-blue-600 font-medium">Your Site</div>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <div className={`font-medium ${
                        competitor.change > 0 ? "text-green-600" :
                        competitor.change < 0 ? "text-red-600" :
                        "text-muted-foreground"
                      }`}>
                        {competitor.change > 0 ? `+${competitor.change}` : 
                         competitor.change < 0 ? competitor.change : 
                         "—"}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      {competitor.change > 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-600 mx-auto" />
                      ) : competitor.change < 0 ? (
                        <TrendingDown className="w-4 h-4 text-red-600 mx-auto" />
                      ) : (
                        <div className="w-4 h-1 bg-muted rounded mx-auto"></div>
                      )}
                    </td>
                    <td className="p-4 text-center text-muted-foreground">
                      {Math.round((currentData?.volume || 0) * (competitor.rank === 1 ? 0.35 : 
                        competitor.rank === 2 ? 0.18 : 
                        competitor.rank === 3 ? 0.12 : 
                        0.08))}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Insights Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 grid md:grid-cols-2 gap-8"
        >
          <div className="bg-card border rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-semibold text-foreground">Opportunity</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Your site moved up 2 positions for "{selectedKeyword}" this month. 
              With improved content optimization, you could reach position #2.
            </p>
            <Button size="sm" variant="outline">
              View Recommendations
            </Button>
          </div>

          <div className="bg-card border rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <Eye className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-semibold text-foreground">Competitor Alert</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              "ahrefs.com" gained 1 position and "screaming-frog.co.uk" dropped. 
              Monitor their content changes for competitive insights.
            </p>
            <Button size="sm" variant="outline">
              Set Alert
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
