"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Globe, 
  Smartphone, 
  Monitor, 
  Target,
  MapPin,
  Clock,
  BarChart3,
  CheckCircle,
  Settings,
  Plus,
  Search,
  Filter
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "../../ui/button";

export default function TrackingCapabilities() {
  const t = useTranslations('featurePages.keywordTracking.trackingCapabilities');
  const [selectedPlan, setSelectedPlan] = useState("professional");

  const plans = [
    {
      id: "starter",
      name: t('plans.starter.name'),
      keywords: t('plans.starter.keywords'),
      locations: t('plans.starter.locations'),
      frequency: t('plans.starter.frequency'),
      devices: [t('plans.starter.devices.desktop'), t('plans.starter.devices.mobile')],
      price: t('plans.starter.price')
    },
    {
      id: "professional",
      name: t('plans.professional.name'),
      keywords: t('plans.professional.keywords'),
      locations: t('plans.professional.locations'),
      frequency: t('plans.professional.frequency'),
      devices: [t('plans.professional.devices.desktop'), t('plans.professional.devices.mobile'), t('plans.professional.devices.tablet')],
      price: t('plans.professional.price')
    },
    {
      id: "enterprise",
      name: t('plans.enterprise.name'),
      keywords: t('plans.enterprise.keywords'),
      locations: t('plans.enterprise.locations'),
      frequency: t('plans.enterprise.frequency'),
      devices: [t('plans.enterprise.devices.all'), t('plans.enterprise.devices.custom')],
      price: t('plans.enterprise.price')
    }
  ];

  const trackingFeatures = [
    {
      icon: Globe,
      title: t('features.globalLocation.title'),
      description: t('features.globalLocation.description'),
      details: [
        t('features.globalLocation.details.item1'),
        t('features.globalLocation.details.item2'),
        t('features.globalLocation.details.item3'),
        t('features.globalLocation.details.item4')
      ],
      color: "blue"
    },
    {
      icon: Smartphone,
      title: t('features.multiDevice.title'),
      description: t('features.multiDevice.description'),
      details: [
        t('features.multiDevice.details.item1'),
        t('features.multiDevice.details.item2'),
        t('features.multiDevice.details.item3'),
        t('features.multiDevice.details.item4')
      ],
      color: "green"
    },
    {
      icon: Clock,
      title: t('features.updateFrequency.title'),
      description: t('features.updateFrequency.description'),
      details: [
        t('features.updateFrequency.details.item1'),
        t('features.updateFrequency.details.item2'),
        t('features.updateFrequency.details.item3'),
        t('features.updateFrequency.details.item4')
      ],
      color: "purple"
    },
    {
      icon: Search,
      title: t('features.searchEngine.title'),
      description: t('features.searchEngine.description'),
      details: [
        t('features.searchEngine.details.item1'),
        t('features.searchEngine.details.item2'),
        t('features.searchEngine.details.item3'),
        t('features.searchEngine.details.item4')
      ],
      color: "orange"
    }
  ];

  const locationExamples = [
    { country: t('locations.unitedStates.country'), cities: t('locations.unitedStates.cities'), flag: "🇺🇸" },
    { country: t('locations.unitedKingdom.country'), cities: t('locations.unitedKingdom.cities'), flag: "🇬🇧" },
    { country: t('locations.canada.country'), cities: t('locations.canada.cities'), flag: "🇨🇦" },
    { country: t('locations.australia.country'), cities: t('locations.australia.cities'), flag: "🇦🇺" },
    { country: t('locations.germany.country'), cities: t('locations.germany.cities'), flag: "🇩🇪" },
    { country: t('locations.france.country'), cities: t('locations.france.cities'), flag: "🇫🇷" },
    { country: t('locations.japan.country'), cities: t('locations.japan.cities'), flag: "🇯🇵" },
    { country: t('locations.brazil.country'), cities: t('locations.brazil.cities'), flag: "🇧🇷" }
  ];

  const getFeatureColor = (color: string) => {
    switch (color) {
      case "blue": return "from-blue-600 to-blue-700";
      case "green": return "from-green-600 to-green-700";
      case "purple": return "from-purple-600 to-purple-700";
      case "orange": return "from-orange-600 to-orange-700";
      default: return "from-gray-600 to-gray-700";
    }
  };

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
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t('header.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('header.subtitle')}
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {trackingFeatures.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-xl border p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getFeatureColor(feature.color)} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {feature.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {feature.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Global Coverage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card rounded-xl border p-8 mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {t('globalCoverage.title')}
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('globalCoverage.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {locationExamples.map((location, index) => (
              <motion.div
                key={location.country}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="text-center p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="text-2xl mb-2">{location.flag}</div>
                <div className="font-medium text-foreground text-sm">{location.country}</div>
                <div className="text-xs text-muted-foreground">{location.cities}</div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <Button variant="outline">
              <MapPin className="w-4 h-4 mr-2" />
              {t('globalCoverage.viewAll')}
            </Button>
          </div>
        </motion.div>

        {/* Tracking Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card rounded-xl border overflow-hidden"
        >
          <div className="p-8 border-b">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {t('plansSection.title')}
            </h3>
            <p className="text-muted-foreground">
              {t('plansSection.subtitle')}
            </p>
          </div>
          
          <div className="p-8">
            <div className="grid lg:grid-cols-3 gap-6">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`relative p-6 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                    selectedPlan === plan.id
                      ? "border-primary bg-primary/5 shadow-lg transform scale-105"
                      : "border-border hover:border-primary/50 hover:shadow-md"
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.id === "professional" && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                        {t('plansSection.mostPopular')}
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-foreground mb-2">{plan.name}</h4>
                    <div className="text-3xl font-bold text-primary mb-4">
                      {plan.price}
                      <span className="text-sm text-muted-foreground font-normal">{t('plansSection.perMonth')}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{t('plansSection.keywords')}</span>
                      <span className="font-medium text-foreground">{plan.keywords}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{t('plansSection.locations')}</span>
                      <span className="font-medium text-foreground">{plan.locations}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{t('plansSection.updates')}</span>
                      <span className="font-medium text-foreground">{plan.frequency}</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="text-sm text-muted-foreground mb-2">{t('plansSection.devices')}:</div>
                      <div className="flex flex-wrap gap-1">
                        {plan.devices.map((device, deviceIndex) => (
                          <span 
                            key={deviceIndex}
                            className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
                          >
                            {device}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className={`w-full mt-6 ${
                      selectedPlan === plan.id 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted text-foreground hover:bg-primary hover:text-primary-foreground"
                    }`}
                  >
                    {selectedPlan === plan.id ? t('plansSection.selected') : t('plansSection.choosePlan')}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Setup CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-card border rounded-xl p-8">
            <h3 className="text-xl font-bold text-foreground mb-4">
              {t('setupCta.title')}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t('setupCta.description')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                <Plus className="w-5 h-5 mr-2" />
                {t('setupCta.addKeywords')}
              </Button>
              <Button variant="outline" size="lg">
                <Settings className="w-5 h-5 mr-2" />
                {t('setupCta.configure')}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
