/**
 * Link Velocity Tracker
 *
 * Analyzes backlink acquisition patterns over time to detect:
 * - Natural growth vs. artificial spikes
 * - Link building campaigns
 * - Negative SEO attacks
 * - Seasonal patterns
 *
 * Industry Standards:
 * - Natural growth: <5% increase per week
 * - Spike threshold: >20% increase in 24 hours
 * - Healthy profile: Steady growth with occasional peaks
 */

import {
  BacklinkData,
  VelocityAnalysis,
  VelocityDataPoint,
  VelocityTrend,
  VelocitySpikeDetection,
} from "../types";

export class LinkVelocityTracker {
  /**
   * Analyze velocity over time periods
   */
  analyzeVelocity(backlinks: BacklinkData[], startDate?: Date, endDate?: Date): VelocityAnalysis {
    // Sort by discovery date
    const sortedLinks = [...backlinks]
      .filter((link) => link.foundDate)
      .sort((a, b) => new Date(a.foundDate!).getTime() - new Date(b.foundDate!).getTime());

    if (sortedLinks.length === 0) {
      return this.getEmptyAnalysis();
    }

    // Set date range
    const start = startDate || new Date(sortedLinks[0].foundDate!);
    const end = endDate || new Date();

    // Generate time series data
    const dailyData = this.generateDailyData(sortedLinks, start, end);
    const weeklyData = this.aggregateWeekly(dailyData);
    const monthlyData = this.aggregateMonthly(dailyData);

    // Detect spikes
    const spikeDetection = this.detectSpikes(dailyData);

    // Calculate trend
    const trend = this.calculateTrend(weeklyData);

    // Calculate velocity metrics
    const metrics = this.calculateVelocityMetrics(dailyData, weeklyData);

    // Generate recommendations
    const recommendations = this.generateRecommendations(spikeDetection, trend, metrics);

    return {
      dailyData,
      weeklyData,
      monthlyData,
      trend,
      spikeDetection,
      metrics,
      recommendations,
    };
  }

  /**
   * Generate daily data points
   */
  private generateDailyData(
    backlinks: BacklinkData[],
    startDate: Date,
    endDate: Date
  ): VelocityDataPoint[] {
    const dataPoints: VelocityDataPoint[] = [];
    const linksByDate = new Map<string, BacklinkData[]>();

    // Group links by date
    for (const link of backlinks) {
      const dateStr = new Date(link.foundDate!).toISOString().split("T")[0];
      if (!linksByDate.has(dateStr)) {
        linksByDate.set(dateStr, []);
      }
      linksByDate.get(dateStr)!.push(link);
    }

    // Generate data points for each day
    let cumulativeCount = 0;
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split("T")[0];
      const linksOnDate = linksByDate.get(dateStr) || [];
      const newLinks = linksOnDate.length;

      cumulativeCount += newLinks;

      dataPoints.push({
        date: new Date(currentDate),
        count: cumulativeCount,
        newLinks,
        lostLinks: 0, // TODO: Track lost links when we have historical data
        netGrowth: newLinks,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dataPoints;
  }

  /**
   * Aggregate to weekly data
   */
  private aggregateWeekly(dailyData: VelocityDataPoint[]): VelocityDataPoint[] {
    const weeklyData: VelocityDataPoint[] = [];

    for (let i = 0; i < dailyData.length; i += 7) {
      const weekData = dailyData.slice(i, i + 7);
      const newLinks = weekData.reduce((sum, d) => sum + d.newLinks, 0);
      const lostLinks = weekData.reduce((sum, d) => sum + d.lostLinks, 0);

      weeklyData.push({
        date: weekData[0].date,
        count: weekData[weekData.length - 1].count,
        newLinks,
        lostLinks,
        netGrowth: newLinks - lostLinks,
      });
    }

    return weeklyData;
  }

  /**
   * Aggregate to monthly data
   */
  private aggregateMonthly(dailyData: VelocityDataPoint[]): VelocityDataPoint[] {
    const monthlyMap = new Map<string, VelocityDataPoint[]>();

    for (const point of dailyData) {
      const monthKey = `${point.date.getFullYear()}-${point.date.getMonth()}`;
      if (!monthlyMap.has(monthKey)) {
        monthlyMap.set(monthKey, []);
      }
      monthlyMap.get(monthKey)!.push(point);
    }

    const monthlyData: VelocityDataPoint[] = [];

    for (const [, monthData] of monthlyMap) {
      const newLinks = monthData.reduce((sum, d) => sum + d.newLinks, 0);
      const lostLinks = monthData.reduce((sum, d) => sum + d.lostLinks, 0);

      monthlyData.push({
        date: monthData[0].date,
        count: monthData[monthData.length - 1].count,
        newLinks,
        lostLinks,
        netGrowth: newLinks - lostLinks,
      });
    }

    return monthlyData;
  }

  /**
   * Detect suspicious spikes
   */
  private detectSpikes(dailyData: VelocityDataPoint[]): VelocitySpikeDetection {
    const spikes: VelocitySpikeDetection["spikes"] = [];

    for (let i = 1; i < dailyData.length; i++) {
      const current = dailyData[i];
      const previous = dailyData[i - 1];

      if (previous.count === 0) continue;

      const percentageIncrease = ((current.count - previous.count) / previous.count) * 100;

      // Detect significant increases
      if (percentageIncrease > 20) {
        let severity: "low" | "medium" | "high" | "critical" = "low";

        if (percentageIncrease > 100) severity = "critical";
        else if (percentageIncrease > 50) severity = "high";
        else if (percentageIncrease > 30) severity = "medium";

        spikes.push({
          date: current.date,
          count: current.newLinks,
          percentageIncrease,
          severity,
        });
      }
    }

    // Determine if growth is natural
    const hasSuspiciousSpikes = spikes.some(
      (s) => s.severity === "high" || s.severity === "critical"
    );
    const naturalGrowth = spikes.length === 0 || (spikes.length <= 3 && !hasSuspiciousSpikes);

    return {
      hasSuspiciousSpikes,
      spikes,
      naturalGrowth,
    };
  }

  /**
   * Calculate velocity trend
   */
  private calculateTrend(weeklyData: VelocityDataPoint[]): VelocityTrend {
    if (weeklyData.length < 3) {
      return {
        type: "stable",
        confidence: 0.3,
        description: "Insufficient data for trend analysis",
      };
    }

    // Calculate average weekly growth
    const recentWeeks = weeklyData.slice(-4);
    const avgWeeklyGrowth =
      recentWeeks.reduce((sum, w) => sum + w.newLinks, 0) / recentWeeks.length;

    // Calculate variance
    const variance =
      recentWeeks.reduce((sum, w) => {
        return sum + Math.pow(w.newLinks - avgWeeklyGrowth, 2);
      }, 0) / recentWeeks.length;

    const stdDev = Math.sqrt(variance);
    const coefficientOfVariation = avgWeeklyGrowth > 0 ? stdDev / avgWeeklyGrowth : 0;

    // Determine trend type
    let type: VelocityTrend["type"];
    let description: string;

    if (avgWeeklyGrowth > 20) {
      type = "rapid";
      description = "Rapid growth - monitor for naturalness";
    } else if (avgWeeklyGrowth > 5) {
      type = "steady";
      description = "Steady, healthy growth pattern";
    } else if (avgWeeklyGrowth > -2) {
      type = "stable";
      description = "Stable link profile with minimal growth";
    } else {
      type = "declining";
      description = "Declining backlink count - investigate lost links";
    }

    // Check for volatility
    if (coefficientOfVariation > 1.5) {
      type = "volatile";
      description = "Volatile growth pattern - indicates inconsistent link building";
    }

    // Calculate confidence based on data availability
    const confidence = Math.min(0.95, 0.5 + weeklyData.length / 20);

    return { type, confidence, description };
  }

  /**
   * Calculate velocity metrics
   */
  private calculateVelocityMetrics(
    dailyData: VelocityDataPoint[],
    weeklyData: VelocityDataPoint[]
  ): Record<string, number> {
    const recentWeek = weeklyData[weeklyData.length - 1];
    const previousWeek = weeklyData[weeklyData.length - 2];
    const recentMonth = dailyData.slice(-30);

    const avgDailyGrowth =
      recentMonth.length > 0
        ? recentMonth.reduce((sum, d) => sum + d.newLinks, 0) / recentMonth.length
        : 0;

    const avgWeeklyGrowth =
      weeklyData.length > 0
        ? weeklyData.reduce((sum, w) => sum + w.newLinks, 0) / weeklyData.length
        : 0;

    const weekOverWeekChange =
      previousWeek && previousWeek.newLinks > 0
        ? ((recentWeek.newLinks - previousWeek.newLinks) / previousWeek.newLinks) * 100
        : 0;

    const totalLinks = dailyData[dailyData.length - 1]?.count || 0;
    const growthRate30d =
      dailyData.length >= 30
        ? ((totalLinks - dailyData[dailyData.length - 30].count) / totalLinks) * 100
        : 0;

    return {
      avgDailyGrowth,
      avgWeeklyGrowth,
      weekOverWeekChange,
      growthRate30d,
      totalLinks,
    };
  }

  /**
   * Generate recommendations
   */
  private generateRecommendations(
    spikeDetection: VelocitySpikeDetection,
    trend: VelocityTrend,
    metrics: Record<string, number>
  ): string[] {
    const recommendations: string[] = [];

    // Spike warnings
    if (spikeDetection.hasSuspiciousSpikes) {
      const criticalSpikes = spikeDetection.spikes.filter((s) => s.severity === "critical");
      const highSpikes = spikeDetection.spikes.filter((s) => s.severity === "high");

      if (criticalSpikes.length > 0) {
        recommendations.push(
          "🚨 CRITICAL: Detected massive link spikes - possible negative SEO attack or artificial link building"
        );
        recommendations.push(
          "⚡ ACTION: Review recent backlinks and use disavow file for suspicious links"
        );
      } else if (highSpikes.length > 0) {
        recommendations.push("⚠️ WARNING: Detected significant link spikes - investigate source");
        recommendations.push(
          "🔍 Review: Check if these are from legitimate sources or link schemes"
        );
      }
    } else if (spikeDetection.naturalGrowth) {
      recommendations.push("✅ Natural growth pattern detected - healthy velocity");
    }

    // Trend recommendations
    switch (trend.type) {
      case "rapid":
        recommendations.push("⚡ Rapid growth: Ensure links are from diverse, quality sources");
        recommendations.push(
          "💡 Recommendation: Slow down link acquisition to appear more natural"
        );
        break;

      case "steady":
        recommendations.push("✅ Steady growth: Maintain current link building strategy");
        recommendations.push("🎯 Goal: Continue acquiring 5-10 quality links per week");
        break;

      case "stable":
        recommendations.push("ℹ️ Stable profile: Consider increasing link building efforts");
        recommendations.push("💡 Suggestion: Target 3-5 new quality backlinks per week");
        break;

      case "declining":
        recommendations.push("🔴 ALERT: Losing backlinks - investigate lost links");
        recommendations.push(
          "⚡ ACTION: Check for removed content, broken links, or domain issues"
        );
        recommendations.push("📧 Outreach: Contact sites that removed links to restore them");
        break;

      case "volatile":
        recommendations.push("⚠️ Volatile pattern: Inconsistent link building detected");
        recommendations.push("📊 Recommendation: Establish consistent, scheduled link building");
        break;
    }

    // Growth rate recommendations
    if (metrics.avgWeeklyGrowth < 2) {
      recommendations.push("📈 Low growth rate: Increase link building activities");
      recommendations.push("🎯 Target: Aim for 5-10 quality backlinks per week");
    } else if (metrics.avgWeeklyGrowth > 30) {
      recommendations.push("⚠️ Very high growth rate: May appear unnatural to search engines");
      recommendations.push("💡 Recommendation: Slow down and focus on quality over quantity");
    }

    // Week-over-week change
    if (Math.abs(metrics.weekOverWeekChange) > 50) {
      recommendations.push("⚠️ Large week-over-week variation: Aim for more consistent growth");
    }

    return recommendations;
  }

  /**
   * Compare velocity with competitors
   */
  compareVelocity(
    yourBacklinks: BacklinkData[],
    competitorBacklinks: BacklinkData[]
  ): {
    yours: VelocityAnalysis;
    competitor: VelocityAnalysis;
    comparison: string[];
  } {
    const yours = this.analyzeVelocity(yourBacklinks);
    const competitor = this.analyzeVelocity(competitorBacklinks);

    const comparison: string[] = [];

    // Compare growth rates
    const yourGrowth = yours.metrics.avgWeeklyGrowth;
    const compGrowth = competitor.metrics.avgWeeklyGrowth;

    if (yourGrowth < compGrowth * 0.5) {
      comparison.push(
        `🔴 You're acquiring links ${(compGrowth / yourGrowth - 1) * 100}% slower than competitor`
      );
      comparison.push("💡 Increase link building efforts to catch up");
    } else if (yourGrowth > compGrowth * 2) {
      comparison.push(
        `✅ You're acquiring links ${(yourGrowth / compGrowth - 1) * 100}% faster than competitor`
      );
      comparison.push("⚠️ Ensure growth remains natural - avoid over-optimization");
    }

    // Compare trends
    if (yours.trend.type === "declining" && competitor.trend.type !== "declining") {
      comparison.push("🔴 ALERT: You're losing backlinks while competitor is growing");
    } else if (yours.trend.type !== "declining" && competitor.trend.type === "declining") {
      comparison.push("✅ Opportunity: Competitor is losing backlinks - capture their traffic");
    }

    // Compare naturalness
    if (yours.spikeDetection.naturalGrowth && !competitor.spikeDetection.naturalGrowth) {
      comparison.push("✅ Your growth pattern is more natural than competitor");
      comparison.push("🎯 Opportunity: Competitor may face penalties for artificial growth");
    }

    return { yours, competitor, comparison };
  }

  /**
   * Predict future growth
   */
  predictGrowth(
    backlinks: BacklinkData[],
    daysAhead: number = 30
  ): Array<{ date: Date; predictedCount: number; confidence: number }> {
    const analysis = this.analyzeVelocity(backlinks);
    const predictions: Array<{ date: Date; predictedCount: number; confidence: number }> = [];

    const lastPoint = analysis.dailyData[analysis.dailyData.length - 1];
    const avgDailyGrowth = analysis.metrics.avgDailyGrowth;

    let currentCount = lastPoint.count;
    let confidence = 0.9;

    for (let i = 1; i <= daysAhead; i++) {
      currentCount += avgDailyGrowth;
      confidence *= 0.98; // Decrease confidence over time

      const predictedDate = new Date(lastPoint.date);
      predictedDate.setDate(predictedDate.getDate() + i);

      predictions.push({
        date: predictedDate,
        predictedCount: Math.round(currentCount),
        confidence,
      });
    }

    return predictions;
  }

  /**
   * Empty analysis for no data
   */
  private getEmptyAnalysis(): VelocityAnalysis {
    return {
      dailyData: [],
      weeklyData: [],
      monthlyData: [],
      trend: {
        type: "stable",
        confidence: 0,
        description: "No data available",
      },
      spikeDetection: {
        hasSuspiciousSpikes: false,
        spikes: [],
        naturalGrowth: true,
      },
      metrics: {
        avgDailyGrowth: 0,
        avgWeeklyGrowth: 0,
        weekOverWeekChange: 0,
        growthRate30d: 0,
        totalLinks: 0,
      },
      recommendations: ["No backlink data available for velocity analysis"],
    };
  }
}

/**
 * Singleton instance
 */
let trackerInstance: LinkVelocityTracker | null = null;

export function getLinkVelocityTracker(): LinkVelocityTracker {
  if (!trackerInstance) {
    trackerInstance = new LinkVelocityTracker();
  }
  return trackerInstance;
}
