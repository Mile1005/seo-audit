"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  Search,
  MapPin,
  Image,
  Video,
  Star,
  ShoppingCart,
  MessageSquare,
  BookOpen,
  Calendar,
  Users,
  TrendingUp,
  Eye,
  BarChart3,
  Target,
} from "lucide-react";
import { Button } from "../../ui/button";

export default function SerpFeatures() {
  const t = useTranslations("featurePages.keywordTracking.serpFeatures");
  const [selectedFeature, setSelectedFeature] = useState("featured-snippets");

  const serpFeatures = [
    {
      id: "featured-snippets",
      name: t("features.featuredSnippets.name"),
      icon: BookOpen,
      description: t("features.featuredSnippets.description"),
      color: "blue",
      examples: [
        t("features.featuredSnippets.examples.item1"),
        t("features.featuredSnippets.examples.item2"),
        t("features.featuredSnippets.examples.item3"),
        t("features.featuredSnippets.examples.item4"),
      ],
    },
    {
      id: "local-pack",
      name: t("features.localPack.name"),
      icon: MapPin,
      description: t("features.localPack.description"),
      color: "green",
      examples: [
        t("features.localPack.examples.item1"),
        t("features.localPack.examples.item2"),
        t("features.localPack.examples.item3"),
        t("features.localPack.examples.item4"),
      ],
    },
    {
      id: "people-also-ask",
      name: t("features.peopleAlsoAsk.name"),
      icon: MessageSquare,
      description: t("features.peopleAlsoAsk.description"),
      color: "purple",
      examples: [
        t("features.peopleAlsoAsk.examples.item1"),
        t("features.peopleAlsoAsk.examples.item2"),
        t("features.peopleAlsoAsk.examples.item3"),
        t("features.peopleAlsoAsk.examples.item4"),
      ],
    },
    {
      id: "image-pack",
      name: t("features.imagePack.name"),
      icon: Image,
      description: t("features.imagePack.description"),
      color: "orange",
      examples: [
        t("features.imagePack.examples.item1"),
        t("features.imagePack.examples.item2"),
        t("features.imagePack.examples.item3"),
        t("features.imagePack.examples.item4"),
      ],
    },
    {
      id: "video-results",
      name: t("features.videoResults.name"),
      icon: Video,
      description: t("features.videoResults.description"),
      color: "red",
      examples: [
        t("features.videoResults.examples.item1"),
        t("features.videoResults.examples.item2"),
        t("features.videoResults.examples.item3"),
        t("features.videoResults.examples.item4"),
      ],
    },
    {
      id: "shopping-results",
      name: t("features.shoppingResults.name"),
      icon: ShoppingCart,
      description: t("features.shoppingResults.description"),
      color: "yellow",
      examples: [
        t("features.shoppingResults.examples.item1"),
        t("features.shoppingResults.examples.item2"),
        t("features.shoppingResults.examples.item3"),
        t("features.shoppingResults.examples.item4"),
      ],
    },
  ];

  const featureData = {
    "featured-snippets": {
      visibility: "78%",
      clickthrough: "35%",
      opportunity: t("featureData.featuredSnippets.opportunity"),
      description: t("featureData.featuredSnippets.description"),
      optimization: [
        t("featureData.featuredSnippets.optimization.item1"),
        t("featureData.featuredSnippets.optimization.item2"),
        t("featureData.featuredSnippets.optimization.item3"),
        t("featureData.featuredSnippets.optimization.item4"),
        t("featureData.featuredSnippets.optimization.item5"),
      ],
      tracking: [
        t("featureData.featuredSnippets.tracking.item1"),
        t("featureData.featuredSnippets.tracking.item2"),
        t("featureData.featuredSnippets.tracking.item3"),
        t("featureData.featuredSnippets.tracking.item4"),
      ],
    },
    "local-pack": {
      visibility: "65%",
      clickthrough: "44%",
      opportunity: t("featureData.localPack.opportunity"),
      description: t("featureData.localPack.description"),
      optimization: [
        t("featureData.localPack.optimization.item1"),
        t("featureData.localPack.optimization.item2"),
        t("featureData.localPack.optimization.item3"),
        t("featureData.localPack.optimization.item4"),
        t("featureData.localPack.optimization.item5"),
      ],
      tracking: [
        t("featureData.localPack.tracking.item1"),
        t("featureData.localPack.tracking.item2"),
        t("featureData.localPack.tracking.item3"),
        t("featureData.localPack.tracking.item4"),
      ],
    },
    "people-also-ask": {
      visibility: "42%",
      clickthrough: "23%",
      opportunity: t("featureData.peopleAlsoAsk.opportunity"),
      description: t("featureData.peopleAlsoAsk.description"),
      optimization: [
        t("featureData.peopleAlsoAsk.optimization.item1"),
        t("featureData.peopleAlsoAsk.optimization.item2"),
        t("featureData.peopleAlsoAsk.optimization.item3"),
        t("featureData.peopleAlsoAsk.optimization.item4"),
        t("featureData.peopleAlsoAsk.optimization.item5"),
      ],
      tracking: [
        t("featureData.peopleAlsoAsk.tracking.item1"),
        t("featureData.peopleAlsoAsk.tracking.item2"),
        t("featureData.peopleAlsoAsk.tracking.item3"),
        t("featureData.peopleAlsoAsk.tracking.item4"),
      ],
    },
  };

  const currentFeatureData = featureData[selectedFeature as keyof typeof featureData];

  const getFeatureColor = (color: string) => {
    switch (color) {
      case "blue":
        return "from-blue-600 to-blue-700";
      case "green":
        return "from-green-600 to-green-700";
      case "purple":
        return "from-purple-600 to-purple-700";
      case "orange":
        return "from-orange-600 to-orange-700";
      case "red":
        return "from-red-600 to-red-700";
      case "yellow":
        return "from-yellow-600 to-yellow-700";
      default:
        return "from-gray-600 to-gray-700";
    }
  };

  const getOpportunityColor = (opportunity: string) => {
    switch (opportunity) {
      case "Critical":
        return "text-red-400 bg-red-500/10";
      case "High":
        return "text-orange-400 bg-orange-500/10";
      case "Medium":
        return "text-yellow-400 bg-yellow-500/10";
      case "Low":
        return "text-green-400 bg-green-500/10";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  const serpMetrics = [
    {
      label: t("metrics.tracked.label"),
      value: "15+",
      description: t("metrics.tracked.description"),
    },
    {
      label: t("metrics.visibilityLift.label"),
      value: "+156%",
      description: t("metrics.visibilityLift.description"),
    },
    {
      label: t("metrics.clickShare.label"),
      value: "+67%",
      description: t("metrics.clickShare.description"),
    },
    {
      label: t("metrics.opportunityDetection.label"),
      value: t("metrics.opportunityDetection.value"),
      description: t("metrics.opportunityDetection.description"),
    },
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
            {t("header.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("header.subtitle")}</p>
        </motion.div>

        {/* SERP Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
        >
          {serpFeatures.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = selectedFeature === feature.id;

            return (
              <motion.button
                key={feature.id}
                onClick={() => setSelectedFeature(feature.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                  isActive
                    ? `border-${feature.color}-500 bg-gradient-to-br ${getFeatureColor(feature.color)} text-white shadow-lg`
                    : "border-border bg-card hover:border-primary/50 hover:shadow-md"
                }`}
              >
                <Icon
                  className={`w-8 h-8 mx-auto mb-2 ${isActive ? "text-white" : "text-muted-foreground"}`}
                />
                <h3
                  className={`font-semibold text-sm mb-1 ${isActive ? "text-white" : "text-foreground"}`}
                >
                  {feature.name}
                </h3>
                <p className={`text-xs ${isActive ? "text-white/80" : "text-muted-foreground"}`}>
                  {feature.description}
                </p>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Feature Details */}
        {currentFeatureData && (
          <motion.div
            key={selectedFeature}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-card rounded-xl border p-8 mb-12"
          >
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Stats */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {t("featureDetails.performanceMetrics")}
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="text-muted-foreground">
                      {t("featureDetails.visibilityRate")}
                    </span>
                    <span className="font-bold text-primary">{currentFeatureData.visibility}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="text-muted-foreground">
                      {t("featureDetails.clickThroughRate")}
                    </span>
                    <span className="font-bold text-primary">
                      {currentFeatureData.clickthrough}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="text-muted-foreground">
                      {t("featureDetails.opportunityLevel")}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getOpportunityColor(currentFeatureData.opportunity)}`}
                    >
                      {currentFeatureData.opportunity}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mt-4">
                  {currentFeatureData.description}
                </p>
              </div>

              {/* Optimization */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {t("featureDetails.optimizationStrategy")}
                </h3>
                <ul className="space-y-2">
                  {currentFeatureData.optimization.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Target className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tracking */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {t("featureDetails.whatWeTrack")}
                </h3>
                <ul className="space-y-2">
                  {currentFeatureData.tracking.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Eye className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* SERP Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {serpMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 bg-card rounded-xl border hover:shadow-lg transition-shadow"
            >
              <div className="text-2xl font-bold text-primary mb-2">{metric.value}</div>
              <div className="text-sm font-medium text-foreground mb-1">{metric.label}</div>
              <div className="text-xs text-muted-foreground">{metric.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Visual Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card rounded-xl border p-8"
        >
          <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
            {t("visualExample.title")}
          </h3>

          <div className="bg-muted/30 rounded-lg p-6 space-y-4">
            {/* Featured Snippet Example */}
            <div className="bg-card rounded-lg border p-4">
              <div className="flex items-center space-x-2 mb-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span className="text-xs text-muted-foreground">
                  {t("visualExample.featuredSnippet.label")}
                </span>
              </div>
              <h4 className="font-medium text-foreground mb-2">
                {t("visualExample.featuredSnippet.question")}
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                {t("visualExample.featuredSnippet.answer")}
              </p>
              <div className="text-xs text-blue-600">aiseoturbo.com › features › seo-audit</div>
            </div>

            {/* Local Pack Example */}
            <div className="bg-card rounded-lg border p-4">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-4 h-4 text-green-600" />
                <span className="text-xs text-muted-foreground">
                  {t("visualExample.localPack.label")}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-8 bg-muted rounded mb-1"></div>
                  <div className="text-xs font-medium">SEO Agency</div>
                  <div className="flex items-center justify-center text-xs text-yellow-500">
                    <Star className="w-3 h-3 mr-1" />
                    4.9 (127)
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-8 bg-muted rounded mb-1"></div>
                  <div className="text-xs font-medium">Digital Marketing</div>
                  <div className="flex items-center justify-center text-xs text-yellow-500">
                    <Star className="w-3 h-3 mr-1" />
                    4.7 (89)
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-8 bg-muted rounded mb-1"></div>
                  <div className="text-xs font-medium">SEO Consultant</div>
                  <div className="flex items-center justify-center text-xs text-yellow-500">
                    <Star className="w-3 h-3 mr-1" />
                    4.8 (156)
                  </div>
                </div>
              </div>
            </div>

            {/* People Also Ask Example */}
            <div className="bg-card rounded-lg border p-4">
              <div className="flex items-center space-x-2 mb-2">
                <MessageSquare className="w-4 h-4 text-purple-600" />
                <span className="text-xs text-muted-foreground">
                  {t("visualExample.peopleAlsoAsk.label")}
                </span>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-foreground">
                  ▶ {t("visualExample.peopleAlsoAsk.q1")}
                </div>
                <div className="text-sm text-foreground">
                  ▶ {t("visualExample.peopleAlsoAsk.q2")}
                </div>
                <div className="text-sm text-foreground">
                  ▶ {t("visualExample.peopleAlsoAsk.q3")}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-card border rounded-xl p-8">
            <h3 className="text-xl font-bold text-foreground mb-4">{t("cta.title")}</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">{t("cta.description")}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/dashboard/keywords">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <BarChart3 className="w-5 h-5 mr-2" />
                  {t("cta.startTracking")}
                </Button>
              </Link>
              <Link href="/dashboard/keywords">
                <Button variant="outline" size="lg">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  {t("cta.viewOpportunities")}
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
