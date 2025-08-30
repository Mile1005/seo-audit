"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Clock, Target, Star, ChevronRight } from "lucide-react";

export default function ResultsShowcase() {
  const results = [
    { 
      stat: "+112%", 
      label: "Organic traffic in 60 days",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-600"
    },
    { 
      stat: "-38%", 
      label: "Load time reduction",
      icon: Clock,
      color: "from-blue-500 to-cyan-600"
    },
    { 
      stat: "+27", 
      label: "Avg. position improvement",
      icon: Target,
      color: "from-purple-500 to-pink-600"
    },
  ];

  const testimonials = [
    {
      quote: "This audit completely transformed our SEO strategy. The insights were actionable and results came quickly.",
      author: "Sarah Johnson",
      role: "Marketing Director",
      rating: 5
    },
    {
      quote: "Finally, an SEO audit that''s both comprehensive and easy to understand. Highly recommend!",
      author: "Mike Chen",
      role: "Founder",
      rating: 5
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -8, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-32 right-16 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-orange-600/20 rounded-full blur-xl"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-center"
        >
          Real Results
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
        >
          See how our comprehensive SEO audits have helped businesses like yours achieve measurable growth
        </motion.p>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16"
        >
          {results.map((result, index) => {
            const Icon = result.icon;
            return (
              <motion.div 
                key={result.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.4 + index * 0.1,
                  type: "spring",
                  damping: 20,
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: "spring", damping: 15, stiffness: 300 }
                }}
                className="group relative rounded-xl border bg-background p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${result.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${result.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <motion.div 
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring", 
                      damping: 15, 
                      stiffness: 300,
                      delay: 0.6 + index * 0.1
                    }}
                    className="text-4xl font-bold text-primary mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-gray-900 group-hover:to-gray-600 transition-all duration-300"
                  >
                    {result.stat}
                  </motion.div>
                  <div className="text-muted-foreground group-hover:text-gray-600 transition-colors duration-300">
                    {result.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-background rounded-xl p-6 border shadow-sm hover:shadow-lg transition-all duration-300 relative"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 1 + index * 0.1 + i * 0.05,
                      type: "spring",
                      damping: 15,
                      stiffness: 300
                    }}
                  >
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </div>
              <blockquote className="text-muted-foreground mb-4 italic">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}