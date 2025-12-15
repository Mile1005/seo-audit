"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Building,
  Heart,
  GraduationCap,
  Briefcase,
  Car,
  Home,
  Plane,
  Utensils,
  Gamepad2,
  TrendingUp,
  Target,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Users,
  Globe,
} from "lucide-react";
import { Button } from "../../ui/button";
import { useTranslations } from "next-intl";

export default function IndustrySpecialization() {
  const t = useTranslations("featurePages.aiAssistant.industrySpecialization");
  const [selectedIndustry, setSelectedIndustry] = useState("ecommerce");

  const industries = [
    {
      id: "ecommerce",
      name: t("industries.ecommerce.name"),
      icon: ShoppingCart,
      description: t("industries.ecommerce.description"),
      color: "blue",
      clients: t("industries.ecommerce.clients"),
      avgImprovement: t("industries.ecommerce.avgImprovement"),
    },
    {
      id: "saas",
      name: t("industries.saas.name"),
      icon: Building,
      description: t("industries.saas.description"),
      color: "purple",
      clients: t("industries.saas.clients"),
      avgImprovement: t("industries.saas.avgImprovement"),
    },
    {
      id: "healthcare",
      name: t("industries.healthcare.name"),
      icon: Heart,
      description: t("industries.healthcare.description"),
      color: "red",
      clients: t("industries.healthcare.clients"),
      avgImprovement: t("industries.healthcare.avgImprovement"),
    },
    {
      id: "education",
      name: t("industries.education.name"),
      icon: GraduationCap,
      description: t("industries.education.description"),
      color: "green",
      clients: t("industries.education.clients"),
      avgImprovement: t("industries.education.avgImprovement"),
    },
    {
      id: "finance",
      name: t("industries.finance.name"),
      icon: Briefcase,
      description: t("industries.finance.description"),
      color: "yellow",
      clients: t("industries.finance.clients"),
      avgImprovement: t("industries.finance.avgImprovement"),
    },
    {
      id: "automotive",
      name: t("industries.automotive.name"),
      icon: Car,
      description: t("industries.automotive.description"),
      color: "gray",
      clients: t("industries.automotive.clients"),
      avgImprovement: t("industries.automotive.avgImprovement"),
    },
  ];

  const industrySpecializations = {
    ecommerce: {
      challenges: [
        t("specializations.ecommerce.challenges.challenge1"),
        t("specializations.ecommerce.challenges.challenge2"),
        t("specializations.ecommerce.challenges.challenge3"),
        t("specializations.ecommerce.challenges.challenge4"),
        t("specializations.ecommerce.challenges.challenge5"),
      ],
      solutions: [
        t("specializations.ecommerce.solutions.solution1"),
        t("specializations.ecommerce.solutions.solution2"),
        t("specializations.ecommerce.solutions.solution3"),
        t("specializations.ecommerce.solutions.solution4"),
        t("specializations.ecommerce.solutions.solution5"),
      ],
      keyMetrics: [
        {
          label: t("specializations.ecommerce.keyMetrics.metric1.label"),
          value: t("specializations.ecommerce.keyMetrics.metric1.value"),
          description: t("specializations.ecommerce.keyMetrics.metric1.description"),
        },
        {
          label: t("specializations.ecommerce.keyMetrics.metric2.label"),
          value: t("specializations.ecommerce.keyMetrics.metric2.value"),
          description: t("specializations.ecommerce.keyMetrics.metric2.description"),
        },
        {
          label: t("specializations.ecommerce.keyMetrics.metric3.label"),
          value: t("specializations.ecommerce.keyMetrics.metric3.value"),
          description: t("specializations.ecommerce.keyMetrics.metric3.description"),
        },
        {
          label: t("specializations.ecommerce.keyMetrics.metric4.label"),
          value: t("specializations.ecommerce.keyMetrics.metric4.value"),
          description: t("specializations.ecommerce.keyMetrics.metric4.description"),
        },
      ],
      caseStudy: {
        client: t("specializations.ecommerce.caseStudy.client"),
        challenge: t("specializations.ecommerce.caseStudy.challenge"),
        solution: t("specializations.ecommerce.caseStudy.solution"),
        results: [
          t("specializations.ecommerce.caseStudy.result1"),
          t("specializations.ecommerce.caseStudy.result2"),
          t("specializations.ecommerce.caseStudy.result3"),
        ],
      },
      recommendations: [
        t("specializations.ecommerce.recommendations.recommendation1"),
        t("specializations.ecommerce.recommendations.recommendation2"),
        t("specializations.ecommerce.recommendations.recommendation3"),
        t("specializations.ecommerce.recommendations.recommendation4"),
        t("specializations.ecommerce.recommendations.recommendation5"),
      ],
    },
    saas: {
      challenges: [
        t("specializations.saas.challenges.challenge1"),
        t("specializations.saas.challenges.challenge2"),
        t("specializations.saas.challenges.challenge3"),
        t("specializations.saas.challenges.challenge4"),
        t("specializations.saas.challenges.challenge5"),
      ],
      solutions: [
        t("specializations.saas.solutions.solution1"),
        t("specializations.saas.solutions.solution2"),
        t("specializations.saas.solutions.solution3"),
        t("specializations.saas.solutions.solution4"),
        t("specializations.saas.solutions.solution5"),
      ],
      keyMetrics: [
        {
          label: t("specializations.saas.keyMetrics.metric1.label"),
          value: t("specializations.saas.keyMetrics.metric1.value"),
          description: t("specializations.saas.keyMetrics.metric1.description"),
        },
        {
          label: t("specializations.saas.keyMetrics.metric2.label"),
          value: t("specializations.saas.keyMetrics.metric2.value"),
          description: t("specializations.saas.keyMetrics.metric2.description"),
        },
        {
          label: t("specializations.saas.keyMetrics.metric3.label"),
          value: t("specializations.saas.keyMetrics.metric3.value"),
          description: t("specializations.saas.keyMetrics.metric3.description"),
        },
        {
          label: t("specializations.saas.keyMetrics.metric4.label"),
          value: t("specializations.saas.keyMetrics.metric4.value"),
          description: t("specializations.saas.keyMetrics.metric4.description"),
        },
      ],
      caseStudy: {
        client: t("specializations.saas.caseStudy.client"),
        challenge: t("specializations.saas.caseStudy.challenge"),
        solution: t("specializations.saas.caseStudy.solution"),
        results: [
          t("specializations.saas.caseStudy.result1"),
          t("specializations.saas.caseStudy.result2"),
          t("specializations.saas.caseStudy.result3"),
        ],
      },
      recommendations: [
        t("specializations.saas.recommendations.recommendation1"),
        t("specializations.saas.recommendations.recommendation2"),
        t("specializations.saas.recommendations.recommendation3"),
        t("specializations.saas.recommendations.recommendation4"),
        t("specializations.saas.recommendations.recommendation5"),
      ],
    },
    healthcare: {
      challenges: [
        t("specializations.healthcare.challenges.challenge1"),
        t("specializations.healthcare.challenges.challenge2"),
        t("specializations.healthcare.challenges.challenge3"),
        t("specializations.healthcare.challenges.challenge4"),
        t("specializations.healthcare.challenges.challenge5"),
      ],
      solutions: [
        t("specializations.healthcare.solutions.solution1"),
        t("specializations.healthcare.solutions.solution2"),
        t("specializations.healthcare.solutions.solution3"),
        t("specializations.healthcare.solutions.solution4"),
        t("specializations.healthcare.solutions.solution5"),
      ],
      keyMetrics: [
        {
          label: t("specializations.healthcare.keyMetrics.metric1.label"),
          value: t("specializations.healthcare.keyMetrics.metric1.value"),
          description: t("specializations.healthcare.keyMetrics.metric1.description"),
        },
        {
          label: t("specializations.healthcare.keyMetrics.metric2.label"),
          value: t("specializations.healthcare.keyMetrics.metric2.value"),
          description: t("specializations.healthcare.keyMetrics.metric2.description"),
        },
        {
          label: t("specializations.healthcare.keyMetrics.metric3.label"),
          value: t("specializations.healthcare.keyMetrics.metric3.value"),
          description: t("specializations.healthcare.keyMetrics.metric3.description"),
        },
        {
          label: t("specializations.healthcare.keyMetrics.metric4.label"),
          value: t("specializations.healthcare.keyMetrics.metric4.value"),
          description: t("specializations.healthcare.keyMetrics.metric4.description"),
        },
      ],
      caseStudy: {
        client: t("specializations.healthcare.caseStudy.client"),
        challenge: t("specializations.healthcare.caseStudy.challenge"),
        solution: t("specializations.healthcare.caseStudy.solution"),
        results: [
          t("specializations.healthcare.caseStudy.result1"),
          t("specializations.healthcare.caseStudy.result2"),
          t("specializations.healthcare.caseStudy.result3"),
        ],
      },
      recommendations: [
        t("specializations.healthcare.recommendations.recommendation1"),
        t("specializations.healthcare.recommendations.recommendation2"),
        t("specializations.healthcare.recommendations.recommendation3"),
        t("specializations.healthcare.recommendations.recommendation4"),
        t("specializations.healthcare.recommendations.recommendation5"),
      ],
    },
  };

  const currentIndustry =
    industrySpecializations[selectedIndustry as keyof typeof industrySpecializations];

  const getIndustryColor = (color: string) => {
    switch (color) {
      case "blue":
        return "from-blue-600 to-blue-700";
      case "purple":
        return "from-purple-600 to-purple-700";
      case "red":
        return "from-red-600 to-red-700";
      case "green":
        return "from-green-600 to-green-700";
      case "yellow":
        return "from-yellow-600 to-yellow-700";
      case "gray":
        return "from-gray-600 to-gray-700";
      default:
        return "from-blue-600 to-blue-700";
    }
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
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{t("title")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        {/* Industry Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
        >
          {industries.map((industry) => {
            const Icon = industry.icon;
            const isActive = selectedIndustry === industry.id;

            return (
              <motion.button
                key={industry.id}
                onClick={() => setSelectedIndustry(industry.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-6 rounded-xl border-2 transition-all duration-300 text-center ${
                  isActive
                    ? `border-${industry.color}-500 bg-gradient-to-br ${getIndustryColor(industry.color)} text-white shadow-lg`
                    : "border-border bg-card hover:border-primary/50 hover:shadow-md"
                }`}
              >
                <Icon
                  className={`w-8 h-8 mx-auto mb-3 ${isActive ? "text-white" : "text-muted-foreground"}`}
                />
                <h3
                  className={`font-semibold text-sm mb-2 ${isActive ? "text-white" : "text-foreground"}`}
                >
                  {industry.name}
                </h3>
                <p
                  className={`text-xs mb-3 ${isActive ? "text-white/80" : "text-muted-foreground"}`}
                >
                  {industry.description}
                </p>
                <div className="space-y-1">
                  <div
                    className={`text-xs ${isActive ? "text-white/90" : "text-muted-foreground"}`}
                  >
                    {industry.clients} {t("labels.clients")}
                  </div>
                  <div
                    className={`text-xs font-medium ${isActive ? "text-white" : "text-green-600"}`}
                  >
                    {industry.avgImprovement} {t("labels.avgGrowth")}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Industry Deep Dive */}
        {currentIndustry && (
          <motion.div
            key={selectedIndustry}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Challenges & Solutions */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-card rounded-xl border p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-red-500" />
                  {t("sections.commonChallenges")}
                </h3>
                <ul className="space-y-3">
                  {currentIndustry.challenges.map((challenge, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{challenge}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="bg-card rounded-xl border p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  {t("sections.ourSolutions")}
                </h3>
                <ul className="space-y-3">
                  {currentIndustry.solutions.map((solution, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{solution}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="bg-card rounded-xl border p-6">
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />
                {t("sections.performanceMetrics")}
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {currentIndustry.keyMetrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="text-center p-4 bg-muted/30 rounded-lg"
                  >
                    <div className="text-2xl font-bold text-primary mb-1">{metric.value}</div>
                    <div className="text-sm font-medium text-foreground mb-1">{metric.label}</div>
                    <div className="text-xs text-muted-foreground">{metric.description}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Case Study */}
            <div className="bg-card border rounded-xl p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {t("caseStudy.successStory")}: {currentIndustry.caseStudy.client}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">
                        {t("caseStudy.challenge")}:
                      </h4>
                      <p className="text-muted-foreground">{currentIndustry.caseStudy.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">
                        {t("caseStudy.solution")}:
                      </h4>
                      <p className="text-muted-foreground">{currentIndustry.caseStudy.solution}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-4">{t("caseStudy.results")}:</h4>
                  <div className="space-y-3">
                    {currentIndustry.caseStudy.results.map((result, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center space-x-3 p-3 bg-card rounded-lg"
                      >
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-foreground">{result}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-card rounded-xl border p-6">
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                <Target className="w-5 h-5 mr-2 text-purple-500" />
                {t("sections.keyRecommendations")}
              </h3>
              <div className="grid lg:grid-cols-2 gap-4">
                {currentIndustry.recommendations.map((recommendation, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg"
                  >
                    <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{recommendation}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-card border rounded-xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">{t("cta.title")}</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">{t("cta.description")}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Users className="w-5 h-5 mr-2" />
                {t("cta.primaryButton")}
              </Button>
              <Button variant="outline" size="lg">
                <Globe className="w-5 h-5 mr-2" />
                {t("cta.secondaryButton")}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
