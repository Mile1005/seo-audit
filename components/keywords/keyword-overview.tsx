'use client';

import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Target, DollarSign, Eye, Zap, Globe, Lightbulb, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { KeywordVariationsModal } from './keyword-variations-modal';
import { QuestionsModal } from './questions-modal';
import { KeywordStrategyModal } from './keyword-strategy-modal';
import { SERPFeaturesSection } from './serp-features-section';
import { SmartAlertSystem } from './smart-alert-system';
import { MultiLocationTracking } from './multi-location-tracking';
import { CompetitiveIntelligence } from './competitive-intelligence';
import { TrafficAnalytics } from './traffic-analytics';

interface KeywordData {
  id: string;
  keyword: string;
  searchVolume: number;
  difficulty: number;
  cpc: number;
  competition: number;
  intent?: string;
  status: 'ACTIVE' | 'PAUSED';
  country: string;
  device: string;
  createdAt: string;
}

interface KeywordOverviewProps {
  keyword: KeywordData;
  projectId: string;
  variations?: string[];
  questions?: string[];
}

export function KeywordOverview({ keyword, projectId, variations = [], questions = [] }: KeywordOverviewProps) {
  const [isVariationsModalOpen, setIsVariationsModalOpen] = useState(false);
  const [isQuestionsModalOpen, setIsQuestionsModalOpen] = useState(false);
  const [isStrategyModalOpen, setIsStrategyModalOpen] = useState(false);

  const getDifficultyLevel = (difficulty: number) => {
    if (difficulty < 30) return { label: 'Very Easy', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (difficulty < 50) return { label: 'Easy', color: 'text-green-500', bgColor: 'bg-green-50' };
    if (difficulty < 70) return { label: 'Medium', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    if (difficulty < 85) return { label: 'Hard', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    return { label: 'Very Hard', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const getIntentColor = (intent?: string) => {
    switch (intent) {
      case 'COMMERCIAL': return 'bg-blue-100 text-blue-700';
      case 'INFORMATIONAL': return 'bg-purple-100 text-purple-700';
      case 'NAVIGATIONAL': return 'bg-green-100 text-green-700';
      case 'TRANSACTIONAL': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const difficultyLevel = getDifficultyLevel(keyword.difficulty);
  const competitiveDensity = (keyword.competition * 0.01).toFixed(2);

  // Generate realistic trend data with seasonal variations
  const trendData = Array.from({ length: 12 }, (_, i) => {
    // Create realistic seasonal patterns (higher in certain months)
    const seasonalFactors = [0.85, 0.80, 0.90, 0.95, 1.0, 0.95, 0.85, 0.88, 0.92, 0.98, 1.05, 0.93];
    return {
      month: i,
      value: Math.round(keyword.searchVolume * seasonalFactors[i])
    };
  });

  // Calculate competitive metrics
  const competitiveMetrics = {
    globalVolume: Math.floor(keyword.searchVolume * (2.5 + Math.random())),
    cpc: keyword.cpc,
    competitiveDensity: parseFloat(competitiveDensity)
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-700">
      {/* Main Header - Stunning Gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 p-8 shadow-2xl">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white">
                {keyword.keyword}
              </h2>
            </div>
            <div className="flex items-center gap-4 text-blue-100">
              <span className="flex items-center gap-1.5 text-sm">
                <Globe className="h-4 w-4" />
                {keyword.country}
              </span>
              <span className="text-blue-300">·</span>
              <span className="text-sm">{keyword.device}</span>
              <span className="text-blue-300">·</span>
              <span className="text-sm">Updated {new Date(keyword.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <Badge className={`${getIntentColor(keyword.intent)} text-base px-5 py-2.5 font-semibold shadow-lg`}>
            {keyword.intent || 'Unknown'} Intent
          </Badge>
        </div>
      </div>

      {/* Key Metrics Grid - Premium Cards with Animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Volume */}
        <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/10 dark:to-gray-900/10 overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <CardHeader className="pb-3 relative">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Volume</CardTitle>
              <div className="p-2 bg-blue-500 rounded-lg shadow-md">
                <Eye className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-1">
              {keyword.searchVolume.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-3">Monthly searches</p>
            <div className="flex items-center gap-1.5 bg-green-50 px-2 py-1 rounded-full w-fit">
              <TrendingUp className="h-3.5 w-3.5 text-green-600" />
              <span className="text-xs text-green-700 font-bold">+5% this month</span>
            </div>
          </CardContent>
        </Card>

        {/* Global Volume */}
        <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-purple-50 to-white overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <CardHeader className="pb-3 relative">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Global Volume</CardTitle>
              <div className="p-2 bg-purple-500 rounded-lg shadow-md">
                <Globe className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-4xl font-black text-purple-600 mb-1">
              {competitiveMetrics.globalVolume.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 font-medium mb-3">All countries</p>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-600">US Market</span>
                <span className="text-purple-700">{keyword.searchVolume.toLocaleString()}</span>
              </div>
              <Progress value={45} className="h-2 bg-slate-100" />
            </div>
          </CardContent>
        </Card>

        {/* Keyword Difficulty */}
        <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-orange-50 to-white overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <CardHeader className="pb-3 relative">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Difficulty</CardTitle>
              <div className="p-2 bg-orange-500 rounded-lg shadow-md">
                <Target className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex items-baseline gap-2 mb-1">
              <div className="text-4xl font-black text-orange-600">{Math.round(keyword.difficulty)}%</div>
              <Badge className={`${difficultyLevel.bgColor} ${difficultyLevel.color} border-0 px-2.5 py-0.5 font-bold`}>
                {difficultyLevel.label}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 font-medium mb-3">Ranking difficulty</p>
            <Progress value={keyword.difficulty} className="h-2 bg-slate-100" />
          </CardContent>
        </Card>

        {/* CPC */}
        <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-green-50 to-white dark:from-green-900/10 dark:to-gray-900/10 overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <CardHeader className="pb-3 relative">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">CPC</CardTitle>
              <div className="p-2 bg-green-500 rounded-lg shadow-md">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-4xl font-black text-green-600 mb-1">
              ${keyword.cpc.toFixed(2)}
            </div>
            <p className="text-xs text-slate-500 font-medium mb-3">Cost per click</p>
            <Badge className="bg-green-100 text-green-700 border-0 px-2.5 py-1 text-xs font-semibold">
              Comp. Density: {competitiveDensity}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Trend Chart - Beautiful Interactive */}
      <Card className="border-0 shadow-xl bg-white overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900/10 dark:to-blue-900/10 border-b border-slate-200 dark:border-slate-700">
          <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            Search Trend
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">12-month search volume trend with interactive visualization</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {trendData.map((point, index) => {
              const height = (point.value / Math.max(...trendData.map(d => d.value))) * 100;
              const isHighest = point.value === Math.max(...trendData.map(d => d.value));
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                  <div 
                    className={`w-full rounded-t-lg transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl ${
                      isHighest 
                        ? 'bg-gradient-to-t from-green-500 to-green-400' 
                        : 'bg-gradient-to-t from-blue-500 to-blue-400'
                    } hover:from-purple-500 hover:to-purple-400 group-hover:scale-105`}
                    style={{ height: `${height}%`, minHeight: '8px' }}
                    title={`${Math.round(point.value).toLocaleString()} searches`}
                  />
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -mt-16 bg-slate-900 text-white px-3 py-2 rounded-lg shadow-xl text-xs font-semibold whitespace-nowrap">
                    {Math.round(point.value).toLocaleString()} searches
                  </div>
                  <span className="text-xs font-semibold text-slate-600 group-hover:text-blue-600 transition-colors">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-400"></div>
              <span className="text-slate-600 font-medium">Regular Month</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-green-500 to-green-400"></div>
              <span className="text-slate-600 font-medium">Peak Month</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Keyword Ideas - Premium Design */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Keyword Variations */}
        <Card className="border-0 shadow-xl bg-white overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-yellow-100">
            <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
              <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg shadow-md">
                <Zap className="h-5 w-5 text-white" />
              </div>
              Keyword Variations
            </CardTitle>
            <CardDescription className="text-slate-600 font-medium">
              <span className="text-yellow-700 font-bold">{variations.length || 1063}</span> variations · 
              Total volume: <span className="text-yellow-700 font-bold">{(keyword.searchVolume * 3.1).toLocaleString()}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {(variations.length > 0 ? variations : [
                `${keyword.keyword} tool`,
                `${keyword.keyword} free`,
                `best ${keyword.keyword}`,
                `${keyword.keyword} online`,
                `${keyword.keyword} software`
              ]).slice(0, 5).map((variation, index) => {
                const volume = Math.floor(keyword.searchVolume * (0.2 + Math.random() * 0.3));
                const kd = Math.floor(keyword.difficulty * (0.7 + Math.random() * 0.4));
                return (
                  <div 
                    key={index} 
                    className="group flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900/10 dark:to-blue-900/10 rounded-xl hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md border border-transparent hover:border-blue-200 dark:hover:border-blue-700"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">{variation}</p>
                      <div className="flex items-center gap-4 mt-1.5">
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {volume.toLocaleString()}
                        </span>
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          {kd}% KD
                        </span>
                      </div>
                    </div>
                    <Badge 
                      className={`ml-3 px-3 py-1 font-bold border-0 ${
                        kd < 30 ? 'bg-green-100 text-green-700' : 
                        kd < 60 ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-red-100 text-red-700'
                      }`}
                    >
                      {kd < 30 ? 'Easy' : kd < 60 ? 'Medium' : 'Hard'}
                    </Badge>
                  </div>
                );
              })}
              <button 
                onClick={() => setIsVariationsModalOpen(true)}
                className="w-full text-center text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
              >
                View all {variations.length || 1063} variations →
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        <Card className="border-0 shadow-xl bg-white overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-100">
            <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md">
                <Lightbulb className="h-5 w-5 text-white" />
              </div>
              Questions
            </CardTitle>
            <CardDescription className="text-slate-600 font-medium">
              <span className="text-blue-700 font-bold">{questions.length || 73}</span> questions · 
              Total volume: <span className="text-blue-700 font-bold">{Math.floor(keyword.searchVolume * 0.8).toLocaleString()}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {(questions.length > 0 ? questions : [
                `what is ${keyword.keyword}`,
                `how to do ${keyword.keyword}`,
                `why is ${keyword.keyword} important`,
                `when to use ${keyword.keyword}`,
                `where to find ${keyword.keyword}`
              ]).slice(0, 5).map((question, index) => {
                const volume = Math.floor(keyword.searchVolume * (0.05 + Math.random() * 0.15));
                return (
                  <div 
                    key={index} 
                    className="group flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-purple-50 dark:from-slate-900/10 dark:to-purple-900/10 rounded-xl hover:from-purple-100 hover:to-blue-100 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md border border-transparent hover:border-purple-200 dark:hover:border-purple-700"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors flex items-start gap-2">
                        <span className="text-purple-500 mt-1">❓</span>
                        {question}
                      </p>
                      <div className="flex items-center gap-2 mt-2 ml-6">
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 px-2 py-1 rounded-full flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {volume.toLocaleString()} searches/mo
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
              <button 
                onClick={() => setIsQuestionsModalOpen(true)}
                className="w-full text-center text-sm bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
              >
                View all {questions.length || 73} questions →
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Keyword Strategy - Premium Design */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 via-white to-blue-50 overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300" onClick={() => setIsStrategyModalOpen(true)}>
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 border-b border-green-100 dark:border-green-800">
          <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <div className="p-2 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg shadow-md">
              <Target className="h-5 w-5 text-white" />
            </div>
            Keyword Strategy
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400 font-medium">Get topics, pillar and subpages automatically - Click to view full strategy</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="group p-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-4 h-4 bg-white rounded-full shadow-md animate-pulse"></div>
                <span className="font-bold text-white text-lg">{keyword.keyword}</span>
              </div>
              <p className="text-sm text-blue-100 font-medium">Main target keyword</p>
              <div className="mt-3 pt-3 border-t border-blue-400/30">
                <span className="text-xs text-blue-100">Primary focus</span>
              </div>
            </div>
            <div className="group p-5 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-slate-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full shadow-md"></div>
                <span className="font-bold text-slate-900 text-lg">Supporting keywords</span>
              </div>
              <p className="text-sm text-slate-600 font-medium">10 related terms</p>
              <div className="mt-3 pt-3 border-t border-slate-200">
                <span className="text-xs text-slate-500">Secondary targets</span>
              </div>
            </div>
            <div className="group p-5 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-slate-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-4 h-4 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full shadow-md"></div>
                <span className="font-bold text-slate-900 text-lg">Long-tail</span>
              </div>
              <p className="text-sm text-slate-600 font-medium">25+ opportunities</p>
              <div className="mt-3 pt-3 border-t border-slate-200">
                <span className="text-xs text-slate-500">Easy wins</span>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl border border-blue-200">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Lightbulb className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 mb-1">Pro Tip</h4>
                <p className="text-sm text-slate-700">Start with your main keyword, create pillar content, then target supporting keywords in related articles. Finally, capture long-tail variations for quick wins.</p>
              </div>
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-sm transition-colors duration-200 shadow-md whitespace-nowrap">
                View Full Strategy →
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <KeywordVariationsModal
        isOpen={isVariationsModalOpen}
        onClose={() => setIsVariationsModalOpen(false)}
        baseKeyword={keyword.keyword}
        baseVolume={keyword.searchVolume}
        baseDifficulty={keyword.difficulty}
        variations={variations}
      />

      <QuestionsModal
        isOpen={isQuestionsModalOpen}
        onClose={() => setIsQuestionsModalOpen(false)}
        baseKeyword={keyword.keyword}
        baseVolume={keyword.searchVolume}
        questions={questions}
      />

      <KeywordStrategyModal
        isOpen={isStrategyModalOpen}
        onClose={() => setIsStrategyModalOpen(false)}
        baseKeyword={keyword.keyword}
        baseVolume={keyword.searchVolume}
      />

      {/* SERP Features Section */}
      <SERPFeaturesSection keywordId={keyword.id} keyword={keyword.keyword} />

      {/* Smart Alert System */}
      <SmartAlertSystem keywordId={keyword.id} projectId={projectId} keyword={keyword.keyword} currentRank={5} />

      {/* Multi-Location & Multi-Device Tracking */}
      <MultiLocationTracking keywordId={keyword.id} keyword={keyword.keyword} />

      {/* Competitive Intelligence */}
      <CompetitiveIntelligence 
        keywordId={keyword.id} 
        projectId={projectId} 
        keyword={keyword.keyword} 
        yourRank={5} 
      />

      {/* Traffic Analytics */}
      <TrafficAnalytics keywordId={keyword.id} keyword={keyword.keyword} currentRank={5} />

      {/* Demo Data Disclaimer */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500 rounded-lg flex-shrink-0">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-slate-900 mb-2">📊 Demo Data Notice</h4>
              <p className="text-slate-700 mb-3">
                The data displayed above is <strong>demonstration data</strong> designed to showcase the platform's capabilities. 
                This includes keyword metrics, competitor analysis, SERP features, location tracking, traffic analytics, and alerts.
              </p>
              <p className="text-slate-700 mb-4">
                For <strong>real-time, accurate data</strong> from Google Search Console, Google Analytics, and live SERP tracking, 
                please upgrade to our <strong className="text-blue-600">PRO plan</strong>.
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Upgrade to PRO for Real Data
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
