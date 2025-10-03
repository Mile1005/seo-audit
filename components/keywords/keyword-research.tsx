'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Search, TrendingUp, Target, BarChart3, Download, Plus, Star, Crown, Zap, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KeywordOverview } from './keyword-overview';

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

interface KeywordResearchProps {
  projectId: string;
}

export function KeywordResearch({ projectId }: KeywordResearchProps) {
  const [keywords, setKeywords] = useState<KeywordData[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [isPremium, setIsPremium] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordData | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'overview'>('list');

  // Load existing keywords when component mounts
  const loadExistingKeywords = useCallback(async () => {
    try {
      const response = await fetch(`/api/keywords/research?projectId=${projectId}`, {
        headers: {
          'x-user-id': 'demo-user'
        }
      });
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setKeywords(result.data.keywords || []);
        }
      }
    } catch (error) {
      console.error('Error loading keywords:', error);
    }
  }, [projectId]);

  useEffect(() => {
    loadExistingKeywords();
  }, [loadExistingKeywords]);

  // loadExistingKeywords moved above & memoized

  const handleResearchKeywords = async () => {
    if (!keywordInput.trim()) {
      console.log('No keyword input provided');
      return;
    }
    
    setIsLoading(true);
    console.log('Starting keyword research...');
    console.log('Raw input:', keywordInput);
    
    try {
      const keywordList = keywordInput
        .split('\n')
        .map(k => k.trim())
        .filter(k => k.length > 0);

      console.log('Parsed keyword list:', keywordList);
      console.log('Project ID:', projectId);

      const response = await fetch('/api/keywords/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'demo-user'
        },
        body: JSON.stringify({
          projectId,
          keywords: keywordList,
          location: 'US',
          language: 'en',
          device: 'DESKTOP'
        })
      });

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('API response:', result);
      
      if (result.success) {
        console.log('Keywords received:', result.data.keywords);
        setKeywords(prev => [...result.data.keywords, ...prev]);
        setKeywordInput('');
        console.log('State updated successfully');
      } else {
        console.error('Error researching keywords:', result.error);
        alert('Error researching keywords: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error occurred. Please try again.');
    } finally {
      setIsLoading(false);
      console.log('Research completed');
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 30) return 'bg-green-500';
    if (difficulty < 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty < 30) return 'Easy';
    if (difficulty < 60) return 'Medium';
    return 'Hard';
  };

  const getVolumeColor = (volume: number) => {
    if (volume > 10000) return 'text-green-600';
    if (volume > 1000) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const PremiumFeature = ({ children, feature }: { children: React.ReactNode, feature: string }) => {
    if (isPremium) return <>{children}</>;
    
    return (
      <div className="relative">
        <div className="opacity-50 pointer-events-none">
          {children}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded">
          <div className="bg-white p-2 rounded-lg shadow-lg text-center">
            <Crown className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
            <p className="text-xs font-semibold">Premium Feature</p>
            <p className="text-xs text-gray-600">{feature}</p>
          </div>
        </div>
      </div>
    );
  };

  // Handle keyword selection
  const handleKeywordClick = (keyword: KeywordData) => {
    setSelectedKeyword(keyword);
    setViewMode('overview');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedKeyword(null);
  };

  // Show detailed overview if a keyword is selected
  if (viewMode === 'overview' && selectedKeyword) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <Button 
          variant="outline" 
          onClick={handleBackToList}
          className="flex items-center gap-2 bg-white hover:bg-blue-50 border-2 border-blue-200 text-blue-700 font-semibold shadow-md hover:shadow-lg transition-all duration-200 px-6 py-2.5"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Keywords
        </Button>
        <KeywordOverview keyword={selectedKeyword} projectId={projectId} />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header with subtle gradient */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Search className="h-6 w-6 text-blue-600" />
            Keyword Research
          </h2>
          <p className="text-sm text-slate-600 mt-1">Discover and analyze keywords for your SEO strategy</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge 
            variant={isPremium ? "default" : "secondary"} 
            className={`gap-1 px-3 py-1.5 ${isPremium ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'} border-2 ${isPremium ? 'border-yellow-500' : 'border-slate-300'} shadow-sm transition-all duration-200 font-semibold`}
          >
            {isPremium ? <Crown className="h-3 w-3" /> : <Star className="h-3 w-3" />}
            {isPremium ? 'Premium' : 'Free Tier'}
          </Badge>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsPremium(!isPremium)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-0 text-white font-medium shadow-md transition-all duration-200 hover:shadow-lg"
          >
            {isPremium ? 'Switch to Free' : 'Upgrade to Premium'}
          </Button>
        </div>
      </div>

      {/* Research Input - Beautiful Semrush Style */}
      <Card className="border-0 shadow-lg bg-white overflow-hidden transition-all duration-300 hover:shadow-xl">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Search className="h-5 w-5 text-white" />
            </div>
            Research Keywords
          </CardTitle>
          <CardDescription className="text-slate-600">
            Enter keywords to research (one per line, up to {isPremium ? '1000' : '100'} keywords)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="space-y-3">
            <textarea
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              placeholder="seo audit&#10;keyword research&#10;best seo tools&#10;how to do keyword research"
              className="min-h-[140px] w-full p-4 border-2 border-slate-300 rounded-xl resize-y focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-slate-50 text-slate-900 placeholder:text-slate-500 font-medium hover:bg-white"
              maxLength={isPremium ? 10000 : 1000}
            />
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600 font-medium flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                  {keywordInput.split('\n').filter(k => k.trim()).length}
                </span>
                keywords entered
              </span>
              <span className="text-slate-500">
                Limit: <span className="font-semibold text-slate-700">{isPremium ? '1000' : '100'}</span>
              </span>
            </div>
          </div>
          
          <div className="flex gap-3 pt-2">
            <Button 
              onClick={handleResearchKeywords}
              disabled={isLoading || !keywordInput.trim()}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Researching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Research Keywords
                </>
              )}
            </Button>
            {keywords.length > 0 && (
              <Button 
                variant="outline"
                onClick={() => setKeywordInput('')}
                className="bg-slate-100 border-2 border-slate-400 text-slate-800 hover:bg-slate-200 hover:border-slate-500 font-semibold shadow-sm transition-all duration-200"
              >
                Clear Input
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Empty State - Beautiful Illustration */}
      {keywords.length === 0 && !isLoading && (
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
          <CardContent className="flex flex-col items-center justify-center py-16 px-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-blue-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-6 shadow-xl">
                <Search className="h-12 w-12 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Start Your Keyword Research</h3>
            <p className="text-slate-600 text-center max-w-md mb-6 leading-relaxed">
              Enter keywords above to discover search volume, difficulty, CPC, and actionable insights to boost your SEO strategy.
            </p>
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              <Badge className="bg-blue-100 text-blue-700 border-0 px-3 py-1.5 hover:bg-blue-200 transition-colors cursor-pointer">
                SEO audit
              </Badge>
              <Badge className="bg-purple-100 text-purple-700 border-0 px-3 py-1.5 hover:bg-purple-200 transition-colors cursor-pointer">
                keyword research
              </Badge>
              <Badge className="bg-green-100 text-green-700 border-0 px-3 py-1.5 hover:bg-green-200 transition-colors cursor-pointer">
                best seo tools
              </Badge>
            </div>
            <p className="text-xs text-slate-500">Click examples to try them out</p>
          </CardContent>
        </Card>
      )}

      {/* Keywords Results - Premium Semrush Table */}
      {keywords.length > 0 && (
        <Card className="border-0 shadow-xl bg-white overflow-hidden animate-in slide-in-from-bottom duration-500">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-slate-900 text-xl flex items-center gap-2">
                  <div className="p-1.5 bg-green-500 rounded-lg">
                    <BarChart3 className="h-4 w-4 text-white" />
                  </div>
                  Researched Keywords 
                  <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-bold text-green-700 bg-green-100 rounded-full">
                    {keywords.length}
                  </span>
                </CardTitle>
                <CardDescription className="text-slate-600 mt-1">
                  Click on any keyword to see detailed analysis with trends and insights
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2 bg-white border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b-2 border-slate-200">
                  <tr>
                    <th className="text-left p-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Keyword</th>
                    <th className="text-left p-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Volume</th>
                    <th className="text-left p-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Difficulty</th>
                    <th className="text-left p-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">CPC</th>
                    <th className="text-left p-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Intent</th>
                    <th className="text-left p-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Competition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {keywords.map((keyword, index) => (
                    <tr 
                      key={keyword.id} 
                      className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer transition-all duration-200 group"
                      onClick={() => handleKeywordClick(keyword)}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="p-4 font-semibold text-blue-600 group-hover:text-blue-800 transition-colors">
                        <div className="flex items-center gap-2">
                          <Search className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          {keyword.keyword}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`font-bold text-lg ${getVolumeColor(keyword.searchVolume)}`}>
                          {formatNumber(keyword.searchVolume)}
                        </span>
                        <p className="text-xs text-slate-500">searches/mo</p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${getDifficultyColor(keyword.difficulty)} shadow-sm`}></div>
                          <div>
                            <span className="font-bold text-slate-900">{Math.round(keyword.difficulty)}%</span>
                            <p className="text-xs text-slate-500">{getDifficultyLabel(keyword.difficulty)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-slate-900 text-lg">${keyword.cpc.toFixed(2)}</span>
                        <p className="text-xs text-slate-500">per click</p>
                      </td>
                      <td className="p-4">
                        <Badge 
                          variant="outline" 
                          className={`text-xs font-semibold border-0 ${
                            keyword.intent === 'COMMERCIAL' ? 'bg-blue-100 text-blue-700' :
                            keyword.intent === 'INFORMATIONAL' ? 'bg-purple-100 text-purple-700' :
                            keyword.intent === 'NAVIGATIONAL' ? 'bg-green-100 text-green-700' :
                            keyword.intent === 'TRANSACTIONAL' ? 'bg-orange-100 text-orange-700' :
                            'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {keyword.intent || 'Unknown'}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Progress value={keyword.competition * 100} className="w-20 h-2" />
                          <span className="text-sm font-semibold text-slate-700">{Math.round(keyword.competition * 100)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
