"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  Globe, 
  Bell,
  Target,
  Clock,
  Play,
  CheckCircle
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "../../../components/ui/button";
import { MainLayout } from "../../../components/layout/main-layout";
import { Breadcrumbs } from "../../../components/navigation/breadcrumbs";
import TrackingCapabilities from "../../../components/features/keyword-tracking/tracking-capabilities";
import SerpFeatures from "../../../components/features/keyword-tracking/serp-features";
import PerformanceAnalytics from "../../../components/features/keyword-tracking/performance-analytics";
import AlertSystem from "../../../components/features/keyword-tracking/alert-system";
import { StructuredData, generateFeatureSchema, generateFAQSchema } from "../../../components/seo/StructuredData";

export default function KeywordTrackingPage() {
  const t = useTranslations('featurePages.keywordTracking');
  const tHero = useTranslations('featurePages.keywordTracking.hero');
  const tCta = useTranslations('featurePages.keywordTracking.cta');
  
  const featureSchema = generateFeatureSchema({
    name: "Keyword Rank Tracking Tool",
    description: "Real-time keyword ranking tracker that monitors your search positions across Google, tracks SERP features, provides competitor insights, and sends alerts when rankings change.",
    url: "https://www.aiseoturbo.com/features/keyword-tracking",
    features: [
      "Daily Rank Tracking",
      "Local & Global Rankings",
      "SERP Feature Monitoring",
      "Competitor Tracking",
      "Ranking Alerts & Notifications",
      "Historical Data Analysis",
      "Search Volume Insights",
      "Ranking Distribution Reports",
      "Mobile vs Desktop Tracking",
      "190+ Location Support"
    ],
    category: "Keyword Tracking"
  });

  const faqSchema = generateFAQSchema([
    {
      question: "How often are keyword rankings updated?",
      answer: "Rankings are updated daily for all tracked keywords. Professional and Enterprise plans offer on-demand updates and real-time alerts when significant ranking changes occur."
    },
    {
      question: "Can I track rankings in different locations?",
      answer: "Yes! Track rankings in 190+ countries and cities worldwide. Monitor both local and global rankings to understand your search visibility across different markets."
    },
    {
      question: "How many keywords can I track?",
      answer: "Starter plan: 10 keywords, Professional plan: 500 keywords, Enterprise plan: unlimited keywords. All plans include historical data and ranking alerts."
    },
    {
      question: "What SERP features are tracked?",
      answer: "We track 15+ SERP features including featured snippets, knowledge panels, local packs, image packs, video results, People Also Ask, and more."
    },
    {
      question: "Can I track competitor keyword rankings?",
      answer: "Absolutely! Monitor competitor rankings for the same keywords you track, compare performance, and identify opportunities where competitors rank but you don't."
    }
  ]);

  const heroMetrics = [
    { label: tHero('metrics.keywordsTracked.label'), value: tHero('metrics.keywordsTracked.value'), description: tHero('metrics.keywordsTracked.description') },
    { label: tHero('metrics.dailyUpdates.label'), value: tHero('metrics.dailyUpdates.value'), description: tHero('metrics.dailyUpdates.description') },
    { label: tHero('metrics.globalLocations.label'), value: tHero('metrics.globalLocations.value'), description: tHero('metrics.globalLocations.description') },
    { label: tHero('metrics.serpFeatures.label'), value: tHero('metrics.serpFeatures.value'), description: tHero('metrics.serpFeatures.description') }
  ];

  const rankingPreview = [
    {
      keyword: "seo audit tool",
      position: 4,
      change: +2,
      volume: 12100,
      url: "/features/seo-audit",
      featured: ["organic", "related-questions"]
    },
    {
      keyword: "competitor analysis tool",
      position: 7,
      change: +3,
      volume: 8200,
      url: "/features/competitor-analysis",
      featured: ["organic"]
    },
    {
      keyword: "website crawler",
      position: 2,
      change: 0,
      volume: 5400,
      url: "/features/site-crawler",
      featured: ["organic", "people-also-ask", "related-searches"]
    },
    {
      keyword: "ai seo assistant",
      position: 12,
      change: -1,
      volume: 3200,
      url: "/features/ai-assistant",
      featured: ["organic"]
    }
  ];

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-emerald-400";
    if (change < 0) return "text-rose-400";
    return "text-muted-foreground";
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return "↗";
    if (change < 0) return "↘";
    return "→";
  };

  return (
    <MainLayout>
      <StructuredData data={featureSchema} />
      <StructuredData data={faqSchema} />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumbs
            items={[
              { name: 'Features', url: 'https://www.aiseoturbo.com/features' },
              { name: 'Keyword Tracking', url: 'https://www.aiseoturbo.com/features/keyword-tracking' }
            ]}
            className="mb-4"
          />
        </div>
        
        {/* Hero Section */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Lightweight grid background for consistency & low paint cost */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
          
          <div className="relative max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Content */}
              <motion.div
                initial={false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.001 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <div className="inline-flex items-center px-4 py-2 bg-green-500/10 rounded-full text-green-400 text-sm font-medium">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    {tHero('badge')}
                  </div>
                  
                  <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
                    {tHero('title')}
                  </h1>
                  
                  <p className="text-xl text-slate-300 leading-relaxed">
                    {tHero('subtitle')}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    <Target className="w-5 h-5 mr-2" />
                    {tHero('cta.track')}
                  </Button>
                  <Button variant="outline" size="lg">
                    <Play className="w-5 h-5 mr-2" />
                    {tHero('cta.demo')}
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-6 pt-4">
                  <div className="flex items-center space-x-2 text-sm text-slate-400">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{tHero('trustIndicators.uptime')}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-400">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{tHero('trustIndicators.dailyUpdates')}</span>
                  </div>
                </div>
              </motion.div>

              {/* Right Content - Ranking Dashboard Preview */}
              <motion.div
                initial={false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.001 }}
                className="relative"
              >
                <div className="bg-card rounded-2xl border shadow-2xl overflow-hidden">
                  {/* Dashboard Header */}
                  <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold">{tHero('dashboard.title')}</h2>
                        <p className="text-sm opacity-90">{tHero('dashboard.subtitle')}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm">{tHero('dashboard.live')}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Rankings Table */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {rankingPreview.map((item) => (
                        <motion.div
                          key={item.keyword}
                          initial={false}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.001 }}
                          className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                        >
                          <div className="flex-1">
                            <div className="font-medium text-foreground mb-1">
                              {item.keyword}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {item.volume.toLocaleString()} {tHero('dashboard.monthlySearches')}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="text-center">
                              <div className="text-lg font-bold text-foreground">#{item.position}</div>
                              <div className="text-xs text-muted-foreground">{tHero('dashboard.position')}</div>
                            </div>
                            
                            <div className="text-center">
                              <div className={`text-sm font-medium ${getChangeColor(item.change)}`}>
                                {getChangeIcon(item.change)} {item.change > 0 ? '+' : ''}{item.change}
                              </div>
                              <div className="text-xs text-muted-foreground">{tHero('dashboard.change')}</div>
                            </div>
                            
                            <div className="flex space-x-1">
                              {item.featured.map((feature, featureIndex) => (
                                <div 
                                  key={featureIndex}
                                  className="w-2 h-2 bg-blue-500 rounded-full"
                                  title={feature}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Quick Stats */}
                    <div className="mt-6 pt-4 border-t">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-emerald-400">+12</div>
                          <div className="text-xs text-muted-foreground">{tHero('dashboard.improved')}</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-rose-400">-3</div>
                          <div className="text-xs text-muted-foreground">{tHero('dashboard.declined')}</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-muted-foreground">5</div>
                          <div className="text-xs text-muted-foreground">{tHero('dashboard.unchanged')}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {heroMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={false}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2 }}
                  className="text-center p-6 bg-card rounded-xl border hover:shadow-lg transition-shadow"
                >
                  <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                  <div className="text-sm font-medium text-foreground mb-1">{metric.label}</div>
                  <div className="text-xs text-muted-foreground">{metric.description}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Feature Sections */}
  {/* Defer heavy sections: load client-side and only when on screen */}
  <SerpFeatures />
  <TrackingCapabilities />
  <PerformanceAnalytics />
  <AlertSystem />

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card border rounded-2xl p-12"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {tCta('title')}
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                {tCta('description')}
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  <Target className="w-5 h-5 mr-2" />
                  {tCta('startTrial')}
                </Button>
                <Button variant="outline" size="lg">
                  <Bell className="w-5 h-5 mr-2" />
                  {tCta('setupAlerts')}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
