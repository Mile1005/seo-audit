'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity,
  Eye,
  MousePointer,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  BarChart3,
  LineChart,
  Calendar,
  ArrowUpRight,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface TrafficMetrics {
  date: string;
  impressions: number;
  clicks: number;
  ctr: number;
  averagePosition: number;
  conversions: number;
  revenue: number;
}

interface TrafficSummary {
  totalImpressions: number;
  totalClicks: number;
  averageCTR: number;
  averagePosition: number;
  totalConversions: number;
  totalRevenue: number;
  impressionsChange: number;
  clicksChange: number;
  revenueChange: number;
}

interface TrafficAnalyticsProps {
  keywordId: string;
  keyword: string;
  currentRank?: number;
}

export function TrafficAnalytics({ keywordId, keyword, currentRank = 5 }: TrafficAnalyticsProps) {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [trafficData, setTrafficData] = useState<TrafficMetrics[]>([]);
  const [summary, setSummary] = useState<TrafficSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTrafficData();
  }, [keywordId, timeRange]);

  const getDaysCount = () => {
    switch (timeRange) {
      case '7d': return 7;
      case '30d': return 30;
      case '90d': return 90;
      default: return 30;
    }
  };

  const fetchTrafficData = async () => {
    try {
      setLoading(true);
      setError(null);

      const days = getDaysCount();
      const response = await fetch(
        `/api/keywords/analytics?keywordId=${keywordId}&days=${days}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch traffic analytics');
      }

      const result = await response.json();

      if (result.success) {
        setTrafficData(result.data.trafficData);
        setSummary(result.data.summary);
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (err) {
      console.error('Error fetching traffic analytics:', err);
      setError(err instanceof Error ? err.message : 'Failed to load traffic analytics');
    } finally {
      setLoading(false);
    }
  };

  // Calculate peak values for visualization
  const maxImpressions = Math.max(...trafficData.map(d => d.impressions), 1);
  const maxClicks = Math.max(...trafficData.map(d => d.clicks), 1);

  if (loading) {
    return (
      <Card className="border-0 shadow-xl bg-gradient-to-br from-indigo-50 via-white to-blue-50 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-indigo-100">
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg shadow-md">
              <Activity className="h-5 w-5 text-white" />
            </div>
            Traffic Analytics & Revenue
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            <span className="ml-3 text-slate-600">Loading traffic data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-0 shadow-xl bg-gradient-to-br from-indigo-50 via-white to-blue-50 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-indigo-100">
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg shadow-md">
              <Activity className="h-5 w-5 text-white" />
            </div>
            Traffic Analytics & Revenue
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-slate-700 mb-4">{error}</p>
            <button
              onClick={fetchTrafficData}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!summary || trafficData.length === 0) {
    return (
      <Card className="border-0 shadow-xl bg-gradient-to-br from-indigo-50 via-white to-blue-50 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-indigo-100">
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg shadow-md">
              <Activity className="h-5 w-5 text-white" />
            </div>
            Traffic Analytics & Revenue
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-12">
            <Activity className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-700 mb-2">No traffic data available yet</p>
            <p className="text-sm text-slate-600">
              Traffic analytics will appear here once position data is collected
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-indigo-50 via-white to-blue-50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-indigo-100">
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg shadow-md">
            <Activity className="h-5 w-5 text-white" />
          </div>
          Traffic Analytics & Revenue
        </CardTitle>
        <CardDescription className="text-slate-600 font-medium">
          Real-time traffic data, click-through rates, and revenue projections for "{keyword}"
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        {/* Time Range Selector */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <Calendar className="h-4 w-4 text-slate-600" />
          <span className="text-sm text-slate-600 mr-2">Time Range:</span>
          <div className="flex gap-2">
            {['7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  timeRange === range
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-indigo-300'
                }`}
              >
                {range === '7d' && 'Last 7 Days'}
                {range === '30d' && 'Last 30 Days'}
                {range === '90d' && 'Last 90 Days'}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Impressions */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                <Eye className="h-6 w-6 text-white" />
              </div>
              {summary && summary.impressionsChange !== 0 && (
                <Badge className={summary.impressionsChange > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                  {summary.impressionsChange > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {Math.abs(summary.impressionsChange)}%
                </Badge>
              )}
            </div>
            <p className="text-xs text-blue-100 mb-1">Total Impressions</p>
            <p className="text-3xl font-bold text-white mb-2">
              {summary && summary.totalImpressions ? summary.totalImpressions.toLocaleString() : '0'}
            </p>
            <div className="flex items-center gap-2 text-xs text-blue-100">
              <Progress value={75} className="h-1 bg-blue-400" />
              <span>75% visibility</span>
            </div>
          </div>

          {/* Clicks */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                <MousePointer className="h-6 w-6 text-white" />
              </div>
              {summary && summary.clicksChange !== 0 && (
                <Badge className={summary.clicksChange > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                  {summary.clicksChange > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {Math.abs(summary.clicksChange)}%
                </Badge>
              )}
            </div>
            <p className="text-xs text-purple-100 mb-1">Total Clicks</p>
            <p className="text-3xl font-bold text-white mb-2">
              {summary && summary.totalClicks ? summary.totalClicks.toLocaleString() : '0'}
            </p>
            <div className="flex items-center gap-2 text-xs text-purple-100">
              <span>CTR: {summary && summary.averageCTR ? summary.averageCTR.toFixed(2) : '0.00'}%</span>
              <span>•</span>
              <span>Avg Pos: {summary && summary.averagePosition ? summary.averagePosition.toFixed(1) : '0.0'}</span>
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              {summary && summary.revenueChange !== 0 && (
                <Badge className={summary.revenueChange > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                  {summary.revenueChange > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {Math.abs(summary.revenueChange)}%
                </Badge>
              )}
            </div>
            <p className="text-xs text-green-100 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-white mb-2">
              ${summary && summary.totalRevenue ? (summary.totalRevenue / 1000).toFixed(1) : '0.0'}K
            </p>
            <div className="flex items-center gap-2 text-xs text-green-100">
              <Target className="h-3 w-3" />
              <span>{summary && summary.totalConversions ? summary.totalConversions : 0} conversions</span>
            </div>
          </div>
        </div>

        {/* Traffic Chart */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <LineChart className="h-5 w-5 text-indigo-600" />
              Impressions & Clicks Trend
            </h4>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                <span className="text-slate-600">Impressions</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-slate-600">Clicks</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {trafficData.map((day, idx) => (
              <div key={idx} className="group hover:bg-slate-50 rounded-lg p-3 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-slate-600 w-24">{day.date}</span>
                  <div className="flex-1 flex items-center gap-2">
                    {/* Impressions Bar */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-600">Impressions</span>
                        <span className="text-xs font-bold text-indigo-700">{day.impressions.toLocaleString()}</span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-400 to-indigo-600 transition-all duration-300"
                          style={{ width: `${(day.impressions / maxImpressions) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Clicks Bar */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-600">Clicks</span>
                        <span className="text-xs font-bold text-purple-700">{day.clicks.toLocaleString()}</span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-300"
                          style={{ width: `${(day.clicks / maxClicks) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="flex items-center gap-3">
                    <Badge className="bg-blue-100 text-blue-700">
                      CTR: {day.ctr}%
                    </Badge>
                    <Badge className="bg-slate-100 text-slate-700">
                      Pos: {day.averagePosition}
                    </Badge>
                    <Badge className="bg-green-100 text-green-700">
                      ${day && day.revenue ? (day.revenue / 1000).toFixed(1) : '0.0'}K
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
            <h5 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-indigo-600" />
              Performance Summary
            </h5>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Average CTR</span>
                <span className="font-bold text-slate-900">{summary && summary.averageCTR ? summary.averageCTR.toFixed(2) : '0.00'}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Average Position</span>
                <span className="font-bold text-slate-900">#{summary && summary.averagePosition ? summary.averagePosition.toFixed(1) : '0.0'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Conversion Rate</span>
                <span className="font-bold text-slate-900">
                  {summary && summary.totalConversions && summary.totalClicks ? ((summary.totalConversions / summary.totalClicks) * 100).toFixed(2) : '0.00'}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Revenue per Click</span>
                <span className="font-bold text-slate-900">
                  ${summary && summary.totalRevenue && summary.totalClicks ? (summary.totalRevenue / summary.totalClicks).toFixed(2) : '0.00'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 shadow-lg">
            <h5 className="font-bold text-white mb-4 flex items-center gap-2">
              <ArrowUpRight className="h-5 w-5" />
              Growth Opportunities
            </h5>
            <div className="space-y-3 text-sm text-white">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-white mt-1.5"></div>
                <p>
                  Improving position by 1 spot could increase CTR by ~5-7%
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-white mt-1.5"></div>
                <p>
                  Current trajectory suggests {summary.clicksChange > 0 ? 'continued growth' : 'optimization needed'}
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-white mt-1.5"></div>
                <p>
                  Focus on SERP features to maximize visibility
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
