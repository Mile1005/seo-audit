"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePerformanceMetrics } from "@/lib/performance";
import { cn } from "@/lib/utils";
import { Activity, Zap, Clock, TrendingUp, AlertTriangle } from "lucide-react";

interface PerformanceDisplayProps {
  className?: string;
  showDetails?: boolean;
  autoRefresh?: boolean;
}

/**
 * Real-time performance metrics display component
 */
export function PerformanceMonitorDisplay({
  className,
  showDetails = false,
  autoRefresh = true,
}: PerformanceDisplayProps) {
  const metrics = usePerformanceMetrics();
  const [isVisible, setIsVisible] = useState(false);

  // Auto-refresh metrics
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // Metrics are automatically updated by the hook
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getMetricStatus = (
    value: number | undefined,
    thresholds: { good: number; poor: number }
  ) => {
    if (!value) return "unknown";
    if (value <= thresholds.good) return "good";
    if (value <= thresholds.poor) return "needs-improvement";
    return "poor";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-400 bg-green-500/10 border-green-500/20";
      case "needs-improvement":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
      case "poor":
        return "text-red-400 bg-red-500/10 border-red-500/20";
      default:
        return "text-muted-foreground bg-muted border-border";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return "✅";
      case "needs-improvement":
        return "⚠️";
      case "poor":
        return "❌";
      default:
        return "⏳";
    }
  };

  const metricConfigs = [
    {
      key: "lcp",
      name: "LCP",
      fullName: "Largest Contentful Paint",
      thresholds: { good: 2500, poor: 4000 },
      unit: "ms",
      icon: <Zap className="w-4 h-4" />,
      description: "Time until the largest element is rendered",
    },
    {
      key: "inp",
      name: "INP",
      fullName: "Interaction to Next Paint",
      thresholds: { good: 200, poor: 500 },
      unit: "ms",
      icon: <Activity className="w-4 h-4" />,
      description: "Responsiveness to user interactions",
    },
    {
      key: "cls",
      name: "CLS",
      fullName: "Cumulative Layout Shift",
      thresholds: { good: 0.1, poor: 0.25 },
      unit: "",
      icon: <TrendingUp className="w-4 h-4" />,
      description: "Visual stability of the page",
    },
    {
      key: "fcp",
      name: "FCP",
      fullName: "First Contentful Paint",
      thresholds: { good: 1800, poor: 3000 },
      unit: "ms",
      icon: <Clock className="w-4 h-4" />,
      description: "Time until first content is rendered",
    },
    {
      key: "ttfb",
      name: "TTFB",
      fullName: "Time to First Byte",
      thresholds: { good: 600, poor: 1500 },
      unit: "ms",
      icon: <Activity className="w-4 h-4" />,
      description: "Server response time",
    },
  ];

  if (!isVisible && Object.keys(metrics).length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Core Web Vitals Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Activity className="w-5 h-5" />
            Core Web Vitals
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsVisible(!isVisible)}
              className="ml-auto"
            >
              {isVisible ? "Hide" : "Show"} Details
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {metricConfigs.map((config) => {
              const value = metrics[config.key as keyof typeof metrics] as number;
              const status = getMetricStatus(value, config.thresholds);
              const statusColor = getStatusColor(status);
              const statusIcon = getStatusIcon(status);

              return (
                <div
                  key={config.key}
                  className={cn("p-3 rounded-lg border text-center transition-colors", statusColor)}
                >
                  <div className="flex items-center justify-center gap-1 mb-1">
                    {config.icon}
                    <span className="font-semibold text-sm">{config.name}</span>
                    <span className="text-sm">{statusIcon}</span>
                  </div>
                  <div className="text-lg font-bold">
                    {value !== undefined ? (
                      <>
                        {config.key === "cls" ? value.toFixed(3) : Math.round(value)}
                        <span className="text-xs ml-1">{config.unit}</span>
                      </>
                    ) : (
                      <span className="text-sm text-gray-500">Loading...</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Metrics */}
      {isVisible && showDetails && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metricConfigs.map((config) => {
                const value = metrics[config.key as keyof typeof metrics] as number;
                const status = getMetricStatus(value, config.thresholds);

                return (
                  <div
                    key={config.key}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {config.icon}
                      <div>
                        <div className="font-semibold">{config.fullName}</div>
                        <div className="text-sm text-gray-600">{config.description}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">
                        {value !== undefined ? (
                          <>
                            {config.key === "cls" ? value.toFixed(3) : Math.round(value)}
                            <span className="text-sm ml-1">{config.unit}</span>
                          </>
                        ) : (
                          "Loading..."
                        )}
                      </div>
                      <Badge
                        variant={
                          status === "good"
                            ? "default"
                            : status === "needs-improvement"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {status === "good"
                          ? "Good"
                          : status === "needs-improvement"
                            ? "Needs Improvement"
                            : "Poor"}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

/**
 * Compact performance indicator for always-visible monitoring
 */
export function PerformanceIndicator({ className }: { className?: string }) {
  const metrics = usePerformanceMetrics();
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate overall score
  const calculateScore = () => {
    const scores = [];

    if (metrics.lcp) scores.push(metrics.lcp <= 2500 ? 100 : metrics.lcp <= 4000 ? 75 : 50);
    if (metrics.inp) scores.push(metrics.inp <= 200 ? 100 : metrics.inp <= 500 ? 75 : 50);
    if (metrics.cls) scores.push(metrics.cls <= 0.1 ? 100 : metrics.cls <= 0.25 ? 75 : 50);
    if (metrics.fcp) scores.push(metrics.fcp <= 1800 ? 100 : metrics.fcp <= 3000 ? 75 : 50);
    if (metrics.ttfb) scores.push(metrics.ttfb <= 600 ? 100 : metrics.ttfb <= 1500 ? 75 : 50);

    return scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  };

  const score = calculateScore();
  const scoreColor =
    score >= 90 ? "text-green-500" : score >= 70 ? "text-yellow-500" : "text-red-500";

  if (Object.keys(metrics).length === 0) {
    return null;
  }

  return (
    <div className={cn("fixed bottom-4 right-4 z-50", className)}>
      <Card className="shadow-lg">
        <CardContent className="p-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 w-full text-left"
          >
            <Activity className="w-4 h-4" />
            <span className="font-semibold">Performance</span>
            <span className={cn("font-bold", scoreColor)}>{score}</span>
          </button>

          {isExpanded && (
            <div className="mt-3 pt-3 border-t space-y-2">
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>LCP: {metrics.lcp ? Math.round(metrics.lcp) : "--"}ms</div>
                <div>INP: {metrics.inp ? Math.round(metrics.inp) : "--"}ms</div>
                <div>CLS: {metrics.cls ? metrics.cls.toFixed(3) : "--"}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Performance alerts for critical issues
 */
export function PerformanceAlerts({ className }: { className?: string }) {
  const metrics = usePerformanceMetrics();
  const [alerts, setAlerts] = useState<Array<{ type: string; message: string }>>([]);

  useEffect(() => {
    const newAlerts = [];

    if (metrics.lcp && metrics.lcp > 4000) {
      newAlerts.push({
        type: "critical",
        message: `LCP is ${Math.round(metrics.lcp)}ms (target: <2.5s)`,
      });
    }

    if (metrics.cls && metrics.cls > 0.25) {
      newAlerts.push({
        type: "critical",
        message: `CLS is ${metrics.cls.toFixed(3)} (target: <0.1)`,
      });
    }

    if (metrics.inp && metrics.inp > 500) {
      newAlerts.push({
        type: "warning",
        message: `INP is ${Math.round(metrics.inp)}ms (target: <200ms)`,
      });
    }

    setAlerts(newAlerts);
  }, [metrics]);

  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-2", className)}>
      {alerts.map((alert, index) => (
        <div
          key={index}
          className={cn(
            "flex items-center gap-2 p-3 rounded-lg border",
            alert.type === "critical"
              ? "bg-red-50 border-red-200 text-red-700"
              : "bg-yellow-50 border-yellow-200 text-yellow-700"
          )}
        >
          <AlertTriangle className="w-4 h-4" />
          <span className="text-sm font-medium">{alert.message}</span>
        </div>
      ))}
    </div>
  );
}
