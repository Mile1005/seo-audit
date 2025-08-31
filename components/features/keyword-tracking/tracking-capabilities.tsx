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
import { Button } from "../../ui/button";

export default function TrackingCapabilities() {
  const [selectedPlan, setSelectedPlan] = useState("professional");

  const plans = [
    {
      id: "starter",
      name: "Starter",
      keywords: "1,000",
      locations: "5",
      frequency: "Daily",
      devices: ["Desktop", "Mobile"],
      price: "$49"
    },
    {
      id: "professional",
      name: "Professional",
      keywords: "5,000",
      locations: "25",
      frequency: "Daily",
      devices: ["Desktop", "Mobile", "Tablet"],
      price: "$149"
    },
    {
      id: "enterprise",
      name: "Enterprise",
      keywords: "25,000+",
      locations: "Unlimited",
      frequency: "Real-time",
      devices: ["All Devices", "Custom"],
      price: "$499"
    }
  ];

  const trackingFeatures = [
    {
      icon: Globe,
      title: "Global Location Tracking",
      description: "Monitor rankings in 190+ countries and 2,500+ cities",
      details: [
        "Country-level tracking for global reach",
        "City-specific results for local businesses",
        "ZIP code precision for hyper-local targeting",
        "Custom location combinations for franchises"
      ],
      color: "blue"
    },
    {
      icon: Smartphone,
      title: "Multi-Device Monitoring",
      description: "Track rankings across desktop, mobile, and tablet devices",
      details: [
        "Desktop vs mobile ranking differences",
        "Tablet-specific search results",
        "Voice search ranking tracking",
        "App store optimization monitoring"
      ],
      color: "green"
    },
    {
      icon: Clock,
      title: "Flexible Update Frequency",
      description: "Choose from daily updates to real-time monitoring",
      details: [
        "Daily updates for standard tracking",
        "Hourly monitoring for competitive campaigns",
        "Real-time alerts for critical keywords",
        "Custom scheduling for specific needs"
      ],
      color: "purple"
    },
    {
      icon: Search,
      title: "Search Engine Coverage",
      description: "Monitor rankings across Google, Bing, Yahoo, and more",
      details: [
        "Google desktop and mobile results",
        "Bing comprehensive coverage",
        "Yahoo search tracking",
        "Regional search engines (Baidu, Yandex)"
      ],
      color: "orange"
    }
  ];

  const locationExamples = [
    { country: "United States", cities: "2,100+ cities", flag: "🇺🇸" },
    { country: "United Kingdom", cities: "500+ cities", flag: "🇬🇧" },
    { country: "Canada", cities: "350+ cities", flag: "🇨🇦" },
    { country: "Australia", cities: "200+ cities", flag: "🇦🇺" },
    { country: "Germany", cities: "400+ cities", flag: "🇩🇪" },
    { country: "France", cities: "300+ cities", flag: "🇫🇷" },
    { country: "Japan", cities: "250+ cities", flag: "🇯🇵" },
    { country: "Brazil", cities: "180+ cities", flag: "🇧🇷" }
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
            Comprehensive Tracking Capabilities
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Monitor keyword rankings with precision across multiple devices, locations, 
            and search engines for complete visibility into your SEO performance.
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
              Global Location Coverage
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Track rankings in 190+ countries and 2,500+ cities worldwide. 
              Get precise local search data for any market you serve.
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
              View All Locations
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
              Choose Your Tracking Scale
            </h3>
            <p className="text-muted-foreground">
              Select the plan that matches your keyword tracking needs, from small businesses to large enterprises.
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
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-foreground mb-2">{plan.name}</h4>
                    <div className="text-3xl font-bold text-primary mb-4">
                      {plan.price}
                      <span className="text-sm text-muted-foreground font-normal">/month</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Keywords</span>
                      <span className="font-medium text-foreground">{plan.keywords}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Locations</span>
                      <span className="font-medium text-foreground">{plan.locations}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Updates</span>
                      <span className="font-medium text-foreground">{plan.frequency}</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="text-sm text-muted-foreground mb-2">Devices:</div>
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
                    {selectedPlan === plan.id ? "Selected" : "Choose Plan"}
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
              Ready to Start Tracking?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Set up your keyword tracking in minutes. Add your keywords, select locations, 
              and start monitoring your search performance immediately.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                <Plus className="w-5 h-5 mr-2" />
                Add Keywords Now
              </Button>
              <Button variant="outline" size="lg">
                <Settings className="w-5 h-5 mr-2" />
                Configure Tracking
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
