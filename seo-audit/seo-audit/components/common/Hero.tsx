"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export default function Hero({ title, subtitle, children }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    // GSAP animations
    const tl = gsap.timeline();
    
    tl.fromTo(heroRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Parallax effect (reduced intensity)
    gsap.to(heroRef.current, {
      yPercent: -10, // Reduced from -20
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Create floating particles (reduced count and intensity)
    if (particlesRef.current) {
      for (let i = 0; i < 12; i++) { // Reduced from 20
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particle.style.opacity = '0.3'; // Reduced opacity
        particlesRef.current.appendChild(particle);
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden animated-bg pt-20 pb-10">
      {/* Animated Background Particles */}
      <div ref={particlesRef} className="particles" />
      
      {/* Gradient Overlay (reduced intensity) */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary/30 via-transparent to-accent-primary/5" />
      
      {/* Main Content */}
      <div ref={heroRef} className="relative z-10 container-width text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 md:space-y-8"
        >
          {/* Main Title */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold gradient-text leading-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {title}
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {subtitle}
          </motion.p>
          
          {/* Floating Elements (reduced intensity) */}
          <motion.div
            className="flex justify-center space-x-3 md:space-x-4 mt-8 md:mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="floating">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-accent-primary/40 rounded-full glow-soft" />
            </div>
            <div className="floating" style={{ animationDelay: '0.5s' }}>
              <div className="w-2 h-2 md:w-3 md:h-3 bg-accent-secondary/40 rounded-full glow-soft" />
            </div>
            <div className="floating" style={{ animationDelay: '1s' }}>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-accent-tertiary/40 rounded-full glow-soft" />
            </div>
          </motion.div>
          
          {/* Children Content */}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-8 md:mt-12"
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-accent-primary/60 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-2 md:h-3 bg-accent-primary/60 rounded-full mt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
}
