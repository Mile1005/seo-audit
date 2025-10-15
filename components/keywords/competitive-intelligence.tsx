'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  TrendingUp,
  TrendingDown,
  Target,
  Award,
  BarChart3,
  PieChart,
  AlertCircle,
  Trophy,
  Zap,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Competitor {
  id: string;
  domain: string;
  rank: number;
  previousRank: number;
  shareOfVoice: number;
  commonKeywords: number;
  uniqueKeywords: number;
  estimatedTraffic: number;
  domainAuthority: number;
  opportunities: number;
  gaps?: CompetitiveGap[];
}

interface CompetitiveGap {
  keyword: string;
  theirRank: number;
  yourRank: number | null;
  volume: number;
  difficulty: number;
  opportunity: 'high' | 'medium' | 'low';
}

interface CompetitiveIntelligenceProps {
  keywordId: string;
  projectId: string;
  keyword: string;
  yourRank?: number;
}

export function CompetitiveIntelligence({ keywordId, projectId, keyword, yourRank = 5 }: CompetitiveIntelligenceProps) {
  const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(null);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [yourShareOfVoice, setYourShareOfVoice] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCompetitorData();
  }, [keywordId, projectId]);

  const fetchCompetitorData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/keywords/competitors?keywordId=${keywordId}&projectId=${projectId}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch competitor data');
      }

      const result = await response.json();

      if (result.success) {
        setCompetitors(result.data.competitors);
        setYourShareOfVoice(result.data.yourShareOfVoice);
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (err) {
      console.error('Error fetching competitors:', err);
      setError(err instanceof Error ? err.message : 'Failed to load competitor data');
    } finally {
      setLoading(false);
    }
  };

  const selectedCompetitorData = selectedCompetitor
    ? competitors.find((c) => c.id === selectedCompetitor)
    : null;

  const competitiveGaps = selectedCompetitorData?.gaps || [];

  const getOpportunityColor = (opportunity: string) => {
    switch (opportunity) {
      case 'high':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-900/10 dark:via-gray-900/10 dark:to-pink-900/10 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 border-b border-purple-100 dark:border-purple-800">
          <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-md">
              <Users className="h-5 w-5 text-white" />
            </div>
            Competitive Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            <span className="ml-3 text-slate-600 dark:text-slate-400">Loading competitor data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-900/10 dark:via-gray-900/10 dark:to-pink-900/10 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 border-b border-purple-100 dark:border-purple-800">
          <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-md">
              <Users className="h-5 w-5 text-white" />
            </div>
            Competitive Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-slate-700 dark:text-slate-300 mb-4">{error}</p>
            <button
              onClick={fetchCompetitorData}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (competitors.length === 0) {
    return (
      <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-900/10 dark:via-gray-900/10 dark:to-pink-900/10 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 border-b border-purple-100 dark:border-purple-800">
          <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-md">
              <Users className="h-5 w-5 text-white" />
            </div>
            Competitive Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-700 dark:text-slate-300 mb-2">No competitor data available yet</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Competitors will appear here once ranking data is collected
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-900/10 dark:via-gray-900/10 dark:to-pink-900/10 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 border-b border-purple-100 dark:border-purple-800">
          <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-md">
              <Users className="h-5 w-5 text-white" />
            </div>
            Competitive Intelligence
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400 font-medium">
            Track competitors, analyze share of voice, and discover ranking opportunities
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          {/* Share of Voice Overview */}
          <div className="mb-6 p-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <PieChart className="h-6 w-6" />
              Market Share of Voice
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <p className="text-xs text-purple-100 mb-1">Your Share</p>
                <p className="text-3xl font-bold text-white">{yourShareOfVoice}%</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <p className="text-xs text-purple-100 mb-1">Top Competitor</p>
                <p className="text-3xl font-bold text-white">
                  {competitors[0]?.shareOfVoice || 0}%
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <p className="text-xs text-purple-100 mb-1">Your Rank</p>
                <p className="text-3xl font-bold text-white">#{yourRank}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <p className="text-xs text-purple-100 mb-1">Competitors</p>
                <p className="text-3xl font-bold text-white">{competitors.length}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-white mb-1">
                <span>Your Domain</span>
                <span className="font-bold">{yourShareOfVoice}%</span>
              </div>
              <Progress value={yourShareOfVoice} className="h-2 bg-purple-400" />
            </div>
          </div>

          {/* Competitor Leaderboard */}
          <div className="mb-6">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-purple-600" />
              Competitor Rankings
            </h3>
            <div className="space-y-3">
              {competitors.map((competitor, idx) => {
                const change = competitor.previousRank - competitor.rank;
                const isSelected = selectedCompetitor === competitor.id;

                return (
                  <button
                    key={competitor.id}
                    onClick={() => setSelectedCompetitor(isSelected ? null : competitor.id)}
                    className={`w-full group bg-white dark:bg-slate-800 rounded-xl border-2 ${
                      isSelected ? 'border-purple-400 bg-purple-50 dark:bg-purple-900/20' : 'border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600'
                    } transition-all duration-200 overflow-hidden hover:shadow-lg`}
                  >
                    <div className="p-4">
                      <div className="flex items-center gap-4">
                        {/* Rank Badge */}
                        <div
                          className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                            idx === 0
                              ? 'bg-yellow-100 text-yellow-700'
                              : idx === 1
                              ? 'bg-slate-200 text-slate-700'
                              : idx === 2
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          #{competitor.rank}
                        </div>

                        {/* Competitor Info */}
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-bold text-slate-900 dark:text-slate-100">{competitor.domain}</h4>
                            {change !== 0 && (
                              <Badge className={change > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                                {change > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                                {Math.abs(change)}
                              </Badge>
                            )}
                            <Badge className="bg-purple-100 text-purple-700">
                              DA: {competitor.domainAuthority}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-4 gap-3 text-xs">
                            <div>
                              <p className="text-slate-600 dark:text-slate-400 mb-1">Share of Voice</p>
                              <p className="font-bold text-slate-900 dark:text-slate-100">{competitor.shareOfVoice}%</p>
                              <Progress value={competitor.shareOfVoice} className="h-1 mt-1" />
                            </div>
                            <div>
                              <p className="text-slate-600 dark:text-slate-400 mb-1">Common Keywords</p>
                              <p className="font-bold text-slate-900 dark:text-slate-100">{competitor.commonKeywords.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-slate-600 dark:text-slate-400 mb-1">Est. Traffic</p>
                              <p className="font-bold text-slate-900 dark:text-slate-100">{(competitor.estimatedTraffic / 1000).toFixed(1)}K</p>
                            </div>
                            <div>
                              <p className="text-slate-600 dark:text-slate-400 mb-1">Opportunities</p>
                              <Badge className="bg-green-100 text-green-700">
                                <Target className="h-3 w-3 mr-1" />
                                {competitor.opportunities}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {/* Expand Icon */}
                        <AlertCircle
                          className={`h-5 w-5 text-slate-400 ${isSelected ? 'rotate-180' : ''} transition-transform`}
                        />
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isSelected && competitiveGaps.length > 0 && (
                      <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 p-4 animate-in slide-in-from-top duration-300">
                        <div className="mb-4">
                          <h5 className="font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                            <Zap className="h-4 w-4 text-yellow-600" />
                            Competitive Gaps & Opportunities
                          </h5>
                          <div className="space-y-2">
                            {competitiveGaps.map((gap, gapIdx) => (
                              <div key={gapIdx} className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex-1">
                                    <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">{gap.keyword}</p>
                                  </div>
                                  <Badge className={getOpportunityColor(gap.opportunity)}>
                                    {gap.opportunity.toUpperCase()}
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-4 gap-2 text-xs">
                                  <div>
                                    <p className="text-slate-600 dark:text-slate-400">Their Rank</p>
                                    <Badge className="bg-purple-100 text-purple-700 mt-1">#{gap.theirRank}</Badge>
                                  </div>
                                  <div>
                                    <p className="text-slate-600 dark:text-slate-400">Your Rank</p>
                                    <Badge
                                      className={
                                        gap.yourRank ? 'bg-blue-100 text-blue-700 mt-1' : 'bg-gray-100 text-gray-700 mt-1'
                                      }
                                    >
                                      {gap.yourRank ? `#${gap.yourRank}` : 'Not Ranking'}
                                    </Badge>
                                  </div>
                                  <div>
                                    <p className="text-slate-600 dark:text-slate-400">Volume</p>
                                    <p className="font-bold text-slate-900 mt-1">{gap.volume.toLocaleString()}</p>
                                  </div>
                                  <div>
                                    <p className="text-slate-600 dark:text-slate-400">Difficulty</p>
                                    <p className="font-bold text-slate-900 dark:text-slate-100 mt-1">{gap.difficulty}/100</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-700 p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                <h5 className="font-bold text-slate-900 dark:text-slate-100">Avg. Competitor Rank</h5>
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                #{Math.round(competitors.reduce((sum, c) => sum + c.rank, 0) / competitors.length)}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-700 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-green-600" />
                <h5 className="font-bold text-slate-900 dark:text-slate-100">Total Opportunities</h5>
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                {competitors.reduce((sum, c) => sum + c.opportunities, 0)}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-700 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-5 w-5 text-yellow-600" />
                <h5 className="font-bold text-slate-900 dark:text-slate-100">Market Position</h5>
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">#{yourRank}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">of {competitors.length + 1} competitors</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
