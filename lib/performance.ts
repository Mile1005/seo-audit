'use client';

import React, { useState, useEffect } from 'react';

interface PerformanceConfig {
  enableAnalytics?: boolean;
  enableConsoleLogging?: boolean;
  thresholds?: {
    lcp: number;
    inp: number; // Updated to INP
    cls: number;
    fcp: number;
    ttfb: number;
  };
}

interface PerformanceMetrics {
  lcp?: number;
  inp?: number; // Replaced FID with INP
  cls?: number;
  fcp?: number;
  ttfb?: number;
  resourceTimings?: PerformanceResourceTiming[];
  navigationTiming?: PerformanceNavigationTiming | null;
}

interface MetricData {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

/**
 * Core Web Vitals and Performance Monitoring System
 */
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private config: PerformanceConfig;
  private metrics: PerformanceMetrics = {};
  private listeners: Array<(metrics: PerformanceMetrics) => void> = [];

  constructor(config: PerformanceConfig = {}) {
    this.config = {
      enableAnalytics: true,
      enableConsoleLogging: false,
      thresholds: {
        lcp: 2500, // Good: <2.5s, Needs Improvement: 2.5s-4s, Poor: >4s
        inp: 200,  // Good: <200ms, Needs Improvement: 200ms-500ms, Poor: >500ms
        cls: 0.1,  // Good: <0.1, Needs Improvement: 0.1-0.25, Poor: >0.25
        fcp: 1800, // Good: <1.8s, Needs Improvement: 1.8s-3s, Poor: >3s
        ttfb: 600, // Good: <600ms, Needs Improvement: 600ms-1.5s, Poor: >1.5s
      },
      ...config,
    };
  }

  static getInstance(config?: PerformanceConfig): PerformanceMonitor {
    if (!this.instance) {
      this.instance = new PerformanceMonitor(config);
    }
    return this.instance;
  }

  /**
   * Initialize Core Web Vitals monitoring
   */
  async initializeCoreWebVitals(): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      // Dynamic import of web-vitals (FID replaced with INP in v4+)
      const { onCLS, onFCP, onINP, onLCP, onTTFB } = await import('web-vitals');

      // Largest Contentful Paint
      onLCP((metric: any) => {
        this.handleMetric('lcp', metric);
      });

      // Interaction to Next Paint (replaced FID)
      onINP((metric: any) => {
        this.handleMetric('inp', metric);
      });

      // Cumulative Layout Shift
      onCLS((metric: any) => {
        this.handleMetric('cls', metric);
      });

      // First Contentful Paint
      onFCP((metric: any) => {
        this.handleMetric('fcp', metric);
      });

      // Time to First Byte
      onTTFB((metric: any) => {
        this.handleMetric('ttfb', metric);
      });
    } catch (error) {
      console.warn('Failed to load web-vitals:', error);
      // Fallback to manual performance monitoring
      this.initializeFallbackMonitoring();
    }
  }

  /**
   * Fallback monitoring when web-vitals is not available
   */
  private initializeFallbackMonitoring(): void {
    if (typeof window === 'undefined') return;

    // Manual TTFB calculation
    if ('performance' in window && 'navigation' in performance) {
      const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationTiming) {
        const ttfb = navigationTiming.responseStart - navigationTiming.requestStart;
        this.handleMetric('ttfb', { name: 'TTFB', value: ttfb } as any);
      }
    }

    // Manual FCP using PerformanceObserver
    if ('PerformanceObserver' in window) {
      try {
        const fcpObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              this.handleMetric('fcp', { name: 'FCP', value: entry.startTime } as any);
              fcpObserver.disconnect();
            }
          }
        });
        fcpObserver.observe({ entryTypes: ['paint'] });
      } catch (error) {
        console.warn('Failed to observe FCP:', error);
      }
    }
  }

  /**
   * Handle individual metric updates
   */
  private handleMetric(name: string, metric: any): void {
    const value = metric.value;
    
    // Store the metric
    (this.metrics as any)[name] = value;

    // Check against thresholds
    const threshold = this.config.thresholds?.[name as keyof typeof this.config.thresholds];
    const status = threshold ? this.getMetricStatus(value, threshold, name) : 'good';

    // Log to console if enabled
    if (this.config.enableConsoleLogging) {
      console.log(`${name.toUpperCase()}: ${value}ms (${status})`);
    }

    // Send to analytics
    if (this.config.enableAnalytics) {
      this.sendToAnalytics(name, value, status);
    }

    // Notify listeners
    this.notifyListeners();
  }

  /**
   * Get metric status based on thresholds
   */
  private getMetricStatus(value: number, threshold: number, metricName: string): 'good' | 'needs-improvement' | 'poor' {
    // Different thresholds for different metrics
    switch (metricName) {
      case 'cls':
        if (value <= 0.1) return 'good';
        if (value <= 0.25) return 'needs-improvement';
        return 'poor';
      
      case 'lcp':
        if (value <= 2500) return 'good';
        if (value <= 4000) return 'needs-improvement';
        return 'poor';
      
      case 'fid':
        if (value <= 100) return 'good';
        if (value <= 300) return 'needs-improvement';
        return 'poor';
      
      case 'fcp':
        if (value <= 1800) return 'good';
        if (value <= 3000) return 'needs-improvement';
        return 'poor';
      
      case 'ttfb':
        if (value <= 600) return 'good';
        if (value <= 1500) return 'needs-improvement';
        return 'poor';
      
      default:
        return value <= threshold ? 'good' : 'poor';
    }
  }

  /**
   * Send metrics to analytics service
   */
  private sendToAnalytics(name: string, value: number, status: string): void {
    // Google Analytics 4
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-ignore
      window.gtag('event', 'web_vitals', {
        event_category: 'Performance',
        event_label: name.toUpperCase(),
        value: Math.round(value),
        custom_parameter_1: status,
      });
    }

    // Vercel Analytics
    if (typeof window !== 'undefined' && 'va' in window) {
      // @ts-ignore
      window.va('track', 'Web Vitals', {
        metric: name,
        value: Math.round(value),
        status,
      });
    }

    // Custom analytics endpoint
    this.sendToCustomAnalytics(name, value, status);
  }

  /**
   * Send to custom analytics endpoint
   */
  private async sendToCustomAnalytics(name: string, value: number, status: string): Promise<void> {
    try {
      await fetch('/api/analytics/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          metric: name,
          value: Math.round(value),
          status,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          url: window.location.href,
        }),
      });
    } catch (error) {
      console.warn('Failed to send performance metrics:', error);
    }
  }

  /**
   * Get resource performance timings
   */
  getResourceTimings(): PerformanceResourceTiming[] {
    if (typeof window === 'undefined' || !('performance' in window)) return [];

    return performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  }

  /**
   * Get navigation timing
   */
  getNavigationTiming(): PerformanceNavigationTiming | null {
    if (typeof window === 'undefined' || !('performance' in window)) return null;

    const [navigationTiming] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    return navigationTiming || null;
  }

  /**
   * Calculate page load performance
   */
  getPageLoadMetrics() {
    const navigation = this.getNavigationTiming();
    if (!navigation) return null;

    return {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      load: navigation.loadEventEnd - navigation.loadEventStart,
      domInteractive: navigation.domInteractive - navigation.fetchStart,
      domComplete: navigation.domComplete - navigation.fetchStart,
      firstByte: navigation.responseStart - navigation.requestStart,
      dns: navigation.domainLookupEnd - navigation.domainLookupStart,
      tcp: navigation.connectEnd - navigation.connectStart,
      request: navigation.responseStart - navigation.requestStart,
      response: navigation.responseEnd - navigation.responseStart,
    };
  }

  /**
   * Monitor largest contentful paint elements
   */
  monitorLCPElements(): void {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        if (lastEntry) {
          console.log('LCP Element:', lastEntry);
          
          // Send LCP element info to analytics
          if (this.config.enableAnalytics && 'gtag' in window) {
            // @ts-ignore
            window.gtag('event', 'lcp_element', {
              element: 'unknown',
              url: window.location.href,
              size: 0,
            });
          }
        }
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (error) {
      console.warn('Failed to observe LCP elements:', error);
    }
  }

  /**
   * Add performance metrics listener
   */
  addListener(callback: (metrics: PerformanceMetrics) => void): void {
    this.listeners.push(callback);
  }

  /**
   * Remove performance metrics listener
   */
  removeListener(callback: (metrics: PerformanceMetrics) => void): void {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  /**
   * Notify all listeners of metric updates
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener(this.metrics);
      } catch (error) {
        console.warn('Performance listener error:', error);
      }
    });
  }

  /**
   * Get current metrics
   */
  getMetrics(): PerformanceMetrics {
    return {
      ...this.metrics,
      resourceTimings: this.getResourceTimings(),
      navigationTiming: this.getNavigationTiming(),
    };
  }

  /**
   * Generate performance report
   */
  generateReport() {
    const coreWebVitals = this.getMetrics();
    const pageLoad = this.getPageLoadMetrics();
    const recommendations = this.generateRecommendations(coreWebVitals, pageLoad);

    return {
      coreWebVitals,
      pageLoad,
      recommendations,
    };
  }

  /**
   * Generate performance recommendations
   */
  private generateRecommendations(
    coreWebVitals: PerformanceMetrics,
    pageLoad: any
  ): string[] {
    const recommendations: string[] = [];

    // LCP recommendations
    if (coreWebVitals.lcp && coreWebVitals.lcp > 2500) {
      recommendations.push('Optimize Largest Contentful Paint: Consider optimizing images, using CDN, or improving server response times');
    }

    // INP recommendations (replaced FID)
    if (coreWebVitals.inp && coreWebVitals.inp > 200) {
      recommendations.push('Improve Interaction to Next Paint: Reduce JavaScript execution time and optimize third-party scripts');
    }

    // CLS recommendations
    if (coreWebVitals.cls && coreWebVitals.cls > 0.1) {
      recommendations.push('Reduce Cumulative Layout Shift: Add size attributes to images and ensure fonts load properly');
    }

    // TTFB recommendations
    if (coreWebVitals.ttfb && coreWebVitals.ttfb > 600) {
      recommendations.push('Improve Time to First Byte: Optimize server response times and consider using a CDN');
    }

    return recommendations;
  }
}

/**
 * Initialize performance monitoring
 */
export function initializePerformanceMonitoring(config?: PerformanceConfig): PerformanceMonitor {
  const monitor = PerformanceMonitor.getInstance(config);
  
  // Initialize on client-side only
  if (typeof window !== 'undefined') {
    monitor.initializeCoreWebVitals();
    monitor.monitorLCPElements();
  }
  
  return monitor;
}

/**
 * React hook for performance metrics
 */
export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const monitor = PerformanceMonitor.getInstance();
    
    const updateMetrics = (newMetrics: PerformanceMetrics) => {
      setMetrics(newMetrics);
    };
    
    monitor.addListener(updateMetrics);
    setMetrics(monitor.getMetrics());
    
    return () => {
      monitor.removeListener(updateMetrics);
    };
  }, []);
  
  return metrics;
}
