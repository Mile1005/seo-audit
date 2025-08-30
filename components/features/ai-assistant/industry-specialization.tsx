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
  Globe
} from "lucide-react";
import { Button } from "../../ui/button";

export default function IndustrySpecialization() {
  const [selectedIndustry, setSelectedIndustry] = useState("ecommerce");

  const industries = [
    {
      id: "ecommerce",
      name: "E-commerce",
      icon: ShoppingCart,
      description: "Online retail and marketplace optimization",
      color: "blue",
      clients: "2,500+",
      avgImprovement: "+65%"
    },
    {
      id: "saas",
      name: "SaaS & Tech",
      icon: Building,
      description: "Software and technology companies",
      color: "purple",
      clients: "1,800+",
      avgImprovement: "+58%"
    },
    {
      id: "healthcare",
      name: "Healthcare",
      icon: Heart,
      description: "Medical practices and health services",
      color: "red",
      clients: "1,200+",
      avgImprovement: "+72%"
    },
    {
      id: "education",
      name: "Education",
      icon: GraduationCap,
      description: "Schools, universities, and online learning",
      color: "green",
      clients: "950+",
      avgImprovement: "+48%"
    },
    {
      id: "finance",
      name: "Finance",
      icon: Briefcase,
      description: "Financial services and fintech",
      color: "yellow",
      clients: "750+",
      avgImprovement: "+82%"
    },
    {
      id: "automotive",
      name: "Automotive",
      icon: Car,
      description: "Car dealerships and auto services",
      color: "gray",
      clients: "650+",
      avgImprovement: "+55%"
    }
  ];

  const industrySpecializations = {
    ecommerce: {
      challenges: [
        "Product page optimization for thousands of SKUs",
        "Category page structure and internal linking",
        "Shopping intent keyword targeting",
        "Product schema markup implementation",
        "Site speed optimization for image-heavy pages"
      ],
      solutions: [
        "Automated product description optimization",
        "Dynamic category page SEO templates",
        "Commercial keyword research and mapping",
        "Product rich snippets implementation",
        "Image optimization and lazy loading"
      ],
      keyMetrics: [
        { label: "Product Pages Optimized", value: "2.3M+", description: "Across all clients" },
        { label: "Average Conversion Lift", value: "+34%", description: "From SEO traffic" },
        { label: "Page Speed Improvement", value: "+2.8s", description: "Average load time reduction" },
        { label: "Organic Revenue Growth", value: "+127%", description: "Year-over-year average" }
      ],
      caseStudy: {
        client: "Fashion Retailer",
        challenge: "10,000+ product pages with poor search visibility",
        solution: "AI-powered product page optimization and schema implementation",
        results: [
          "185% increase in organic traffic",
          "92% of products now appear in rich snippets",
          "67% improvement in conversion rate from SEO traffic"
        ]
      },
      recommendations: [
        "Implement product schema markup for rich snippets",
        "Optimize category pages for broad commercial keywords",
        "Create buying guides and comparison content",
        "Improve site architecture for better crawling",
        "Focus on mobile-first shopping experience"
      ]
    },
    saas: {
      challenges: [
        "Complex technical product explanations for search",
        "Long sales cycles requiring nurture content",
        "High competition for commercial keywords",
        "Developer and business decision-maker targeting",
        "Feature-based vs benefit-based content strategy"
      ],
      solutions: [
        "Technical content that ranks and converts",
        "Multi-stage funnel content optimization",
        "Long-tail keyword strategy for niche features",
        "Dual-audience content architecture",
        "Benefit-driven landing page optimization"
      ],
      keyMetrics: [
        { label: "SaaS Clients Served", value: "1,800+", description: "From startups to enterprise" },
        { label: "Average MRR Growth", value: "+156%", description: "From organic channels" },
        { label: "Lead Quality Score", value: "8.7/10", description: "SEO vs other channels" },
        { label: "Free Trial Conversion", value: "+43%", description: "From organic traffic" }
      ],
      caseStudy: {
        client: "Project Management SaaS",
        challenge: "Low organic visibility for competitive keywords",
        solution: "Comprehensive content strategy targeting the full customer journey",
        results: [
          "312% increase in organic leads",
          "89% improvement in keyword rankings",
          "156% growth in trial-to-paid conversions"
        ]
      },
      recommendations: [
        "Create in-depth feature comparison content",
        "Develop use case and industry-specific landing pages",
        "Build comprehensive knowledge base for long-tail traffic",
        "Implement software schema for better categorization",
        "Focus on integration and API documentation SEO"
      ]
    },
    healthcare: {
      challenges: [
        "YMYL (Your Money Your Life) content compliance",
        "Medical accuracy and expertise requirements",
        "Local SEO for multiple practice locations",
        "Patient privacy and HIPAA considerations",
        "Trust signals and authority building"
      ],
      solutions: [
        "YMYL-compliant content optimization",
        "Medical expert content review process",
        "Multi-location SEO strategy",
        "Privacy-first website optimization",
        "Authority and trust signal implementation"
      ],
      keyMetrics: [
        { label: "Healthcare Practices", value: "1,200+", description: "Successfully optimized" },
        { label: "Patient Appointments", value: "+89%", description: "From organic search" },
        { label: "Local Pack Rankings", value: "94%", description: "Top 3 position rate" },
        { label: "Trust Score Improvement", value: "+67%", description: "E-A-T signals" }
      ],
      caseStudy: {
        client: "Multi-Location Dental Practice",
        challenge: "Poor local visibility across 15 locations",
        solution: "Comprehensive local SEO strategy with location-specific optimization",
        results: [
          "278% increase in appointment bookings",
          "92% of locations ranking in local pack",
          "145% improvement in online reviews"
        ]
      },
      recommendations: [
        "Implement comprehensive local SEO for each location",
        "Create condition-specific landing pages with expert content",
        "Build strong review and reputation management system",
        "Focus on mobile experience for local searches",
        "Develop patient education content hub"
      ]
    }
  };

  const currentIndustry = industrySpecializations[selectedIndustry as keyof typeof industrySpecializations];

  const getIndustryColor = (color: string) => {
    switch (color) {
      case "blue": return "from-blue-600 to-blue-700";
      case "purple": return "from-purple-600 to-purple-700";
      case "red": return "from-red-600 to-red-700";
      case "green": return "from-green-600 to-green-700";
      case "yellow": return "from-yellow-600 to-yellow-700";
      case "gray": return "from-gray-600 to-gray-700";
      default: return "from-blue-600 to-blue-700";
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
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Industry-Specific SEO Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI understands the unique challenges and opportunities in your industry, 
            providing specialized recommendations that drive results.
          </p>
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
                <Icon className={`w-8 h-8 mx-auto mb-3 ${isActive ? "text-white" : "text-muted-foreground"}`} />
                <h3 className={`font-semibold text-sm mb-2 ${isActive ? "text-white" : "text-foreground"}`}>
                  {industry.name}
                </h3>
                <p className={`text-xs mb-3 ${isActive ? "text-white/80" : "text-muted-foreground"}`}>
                  {industry.description}
                </p>
                <div className="space-y-1">
                  <div className={`text-xs ${isActive ? "text-white/90" : "text-muted-foreground"}`}>
                    {industry.clients} clients
                  </div>
                  <div className={`text-xs font-medium ${isActive ? "text-white" : "text-green-600"}`}>
                    {industry.avgImprovement} avg growth
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
                  Common Challenges
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
                  Our Solutions
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
                Industry Performance Metrics
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
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Success Story: {currentIndustry.caseStudy.client}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Challenge:</h4>
                      <p className="text-muted-foreground">{currentIndustry.caseStudy.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Solution:</h4>
                      <p className="text-muted-foreground">{currentIndustry.caseStudy.solution}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-4">Results:</h4>
                  <div className="space-y-3">
                    {currentIndustry.caseStudy.results.map((result, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg"
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
                Key Recommendations for Your Industry
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
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-purple-200 dark:border-purple-800">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Get Industry-Specific Recommendations
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our AI has been trained on successful strategies from thousands of companies 
              in your industry. Get personalized recommendations that work.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Users className="w-5 h-5 mr-2" />
                Start Industry Analysis
              </Button>
              <Button variant="outline" size="lg">
                <Globe className="w-5 h-5 mr-2" />
                View All Industries
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
