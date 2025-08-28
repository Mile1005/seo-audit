"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Rocket, 
  Zap, 
  Target, 
  TrendingUp, 
  Users, 
  Globe,
  CheckCircle,
  ArrowRight,
  Star,
  Quote
} from "lucide-react";

export default function IntegrationOptions() {
  const integrations = [
    {
      name: "Google Search Console",
      description: "Import your existing GSC data for comprehensive analysis",
      icon: Globe,
      features: ["Search performance data", "Index coverage reports", "Core Web Vitals"],
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Google Analytics",
      description: "Combine crawl data with user behavior insights",
      icon: TrendingUp,
      features: ["Traffic patterns", "User experience metrics", "Conversion tracking"],
      color: "from-green-500 to-green-600"
    },
    {
      name: "PageSpeed Insights",
      description: "Automated performance testing for all discovered pages",
      icon: Zap,
      features: ["Core Web Vitals", "Performance scores", "Optimization suggestions"],
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "SEO Director, TechCorp",
      content: "The site crawler found issues we didn't even know existed. Our organic traffic increased 40% after fixing them.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Digital Marketing Manager",
      content: "Automated monitoring saves us 10+ hours per week. The alerts are spot-on and actionable.",
      rating: 5
    },
    {
      name: "Emma Thompson",
      role: "Technical SEO Consultant",
      content: "Most comprehensive crawling tool I've used. The visual site mapping is a game-changer for client reports.",
      rating: 5
    }
  ];

  const pricingFeatures = [
    "Crawl up to 10,000 pages",
    "50+ automated issue detections",
    "Real-time monitoring & alerts",
    "Visual site architecture mapping",
    "Google integrations",
    "Priority support"
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Integration Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Powerful Integrations
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with your existing tools for a complete SEO workflow
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {integrations.map((integration, index) => {
              const Icon = integration.icon;
              return (
                <motion.div
                  key={integration.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-card rounded-2xl p-8 border hover:shadow-lg transition-all duration-300"
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${integration.color} flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3">{integration.name}</h3>
                  <p className="text-muted-foreground mb-6">{integration.description}</p>
                  
                  <ul className="space-y-2">
                    {integration.features.map((feature, featureIndex) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.1 + featureIndex * 0.05 }}
                        className="flex items-center text-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Trusted by SEO Professionals
            </h2>
            <p className="text-xl text-muted-foreground">
              See what industry experts say about our site crawler
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-card rounded-2xl p-8 border relative"
              >
                <Quote className="w-8 h-8 text-primary/20 absolute top-6 right-6" />
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.content}"
                </p>
                
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 rounded-3xl p-12 text-center text-white relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-white/20 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-white/20 translate-x-1/2 translate-y-1/2" />
            <div className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full bg-white/20 -translate-x-1/2 -translate-y-1/2" />
          </div>
          
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", damping: 15, stiffness: 300, delay: 1 }}
              className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <Rocket className="w-10 h-10" />
            </motion.div>
            
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Start Your Free Site Crawl Today
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Discover hidden SEO issues and opportunities across your entire website in minutes
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
              {pricingFeatures.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  className="flex items-center text-left"
                >
                  <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90"
              >
                <Target className="w-5 h-5 mr-2" />
                Start Free Crawl
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10"
              >
                <Users className="w-5 h-5 mr-2" />
                Book Demo
              </Button>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="text-sm opacity-75 mt-6"
            >
              No credit card required  14-day free trial  Cancel anytime
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}