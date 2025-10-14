'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { TrendingUp, TrendingDown, Minus, Target, Eye, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface KeywordPosition {
  id: string;
  keyword: string;
  position: number | null;
  previousRank: number | null;
  url: string | null;
  title: string | null;
  searchVolume: number | null;
  difficulty: number | null;
  changeType: 'UP' | 'DOWN' | 'NEW' | 'SAME' | 'LOST' | null;
  checkedAt: string;
  featured: boolean;
  localPack: boolean;
}

interface RankingDashboardProps {
  projectId: string;
}

export function RankingDashboard({ projectId }: RankingDashboardProps) {
  const [keywords, setKeywords] = useState<KeywordPosition[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'all' | 'ranked' | 'unranked'>('all');

  const loadKeywordRankings = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/keywords/research?projectId=${projectId}`, {
        headers: {
          'x-user-id': 'demo-user' // Demo auth
        }
      });
      const result = await response.json();
      if (result.success) {
        const transformedKeywords = result.data.keywords.map((keyword: any) => ({
          id: keyword.id,
          keyword: keyword.keyword,
            position: keyword.positions?.[0]?.position || null,
            previousRank: keyword.positions?.[0]?.previousRank || null,
            url: keyword.positions?.[0]?.url || null,
            title: keyword.positions?.[0]?.title || null,
            searchVolume: keyword.searchVolume,
            difficulty: keyword.difficulty,
            changeType: keyword.positions?.[0]?.changeType || null,
            checkedAt: keyword.positions?.[0]?.checkedAt || keyword.updatedAt,
            featured: keyword.positions?.[0]?.featured || false,
            localPack: keyword.positions?.[0]?.localPack || false
        }));
        setKeywords(transformedKeywords);
      } else {
        console.error('Error loading rankings:', result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadKeywordRankings();
  }, [loadKeywordRankings]);

  // loadKeywordRankings moved above & memoized

  const getChangeIcon = (changeType: string | null, position: number | null, previousRank: number | null) => {
    if (!changeType || !position) return <Minus className="h-4 w-4 text-gray-400" />;
    
    switch (changeType) {
      case 'UP':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'DOWN':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'NEW':
        return <Target className="h-4 w-4 text-blue-500" />;
      case 'SAME':
        return <Minus className="h-4 w-4 text-gray-400" />;
      case 'LOST':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  const getPositionColor = (position: number | null) => {
    if (!position) return 'text-gray-400';
    if (position <= 3) return 'text-green-600 font-bold';
    if (position <= 10) return 'text-green-500';
    if (position <= 20) return 'text-yellow-600';
    if (position <= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const getPositionBadge = (position: number | null) => {
    if (!position) return 'Not Ranked';
    if (position <= 3) return 'Top 3';
    if (position <= 10) return 'Page 1';
    if (position <= 20) return 'Page 2';
    if (position <= 50) return 'Top 50';
    return 'Beyond 50';
  };

  const getPositionBadgeVariant = (position: number | null): "default" | "secondary" | "destructive" | "outline" => {
    if (!position) return 'outline';
    if (position <= 3) return 'default';
    if (position <= 10) return 'secondary';
    return 'outline';
  };

  const filteredKeywords = keywords.filter(keyword => {
    if (filterStatus === 'ranked') return keyword.position !== null;
    if (filterStatus === 'unranked') return keyword.position === null;
    return true;
  });

  const rankedKeywords = keywords.filter(k => k.position !== null);
  const avgPosition = rankedKeywords.length > 0 
    ? Math.round(rankedKeywords.reduce((sum, k) => sum + (k.position || 0), 0) / rankedKeywords.length)
    : 0;
  
  const topKeywords = rankedKeywords.filter(k => k.position && k.position <= 10).length;
  const newKeywords = keywords.filter(k => k.changeType === 'NEW').length;
  const improvedKeywords = keywords.filter(k => k.changeType === 'UP').length;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header - Beautiful Gradient */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 rounded-xl border border-green-100 dark:border-green-800">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            Keyword Rankings
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Track your keyword positions and performance over time
          </p>
        </div>
        <Button 
          onClick={loadKeywordRankings}
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Refresh Rankings
        </Button>
      </div>

      {/* Statistics Cards - Premium Design */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/10 dark:to-gray-900/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-blue-500 rounded-lg shadow-md">
                <Target className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Total Keywords</span>
            </div>
            <p className="text-4xl font-black text-blue-600 dark:text-blue-400">{keywords.length}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-2">
              {rankedKeywords.length} ranked
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-green-50 to-white dark:from-green-900/10 dark:to-gray-900/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-green-500 rounded-lg shadow-md">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Page 1 Rankings</span>
            </div>
            <p className="text-4xl font-black text-green-600 dark:text-green-400">{topKeywords}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-2">
              Top 10 positions
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-orange-50 to-white dark:from-orange-900/10 dark:to-gray-900/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-orange-500 rounded-lg shadow-md">
                <Eye className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Avg Position</span>
            </div>
            <p className="text-4xl font-black text-orange-600 dark:text-orange-400">{avgPosition || 'N/A'}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-2">
              For ranked keywords
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/10 dark:to-gray-900/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-purple-500 rounded-lg shadow-md">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Improvements</span>
            </div>
            <p className="text-4xl font-black text-purple-600 dark:text-purple-400">{improvedKeywords}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-2">
              Keywords moved up
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons - Modern Pill Design */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={filterStatus === 'all' ? 'default' : 'outline'}
          onClick={() => setFilterStatus('all')}
          className={filterStatus === 'all' 
            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md hover:shadow-lg' 
            : 'bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
          }
        >
          All Keywords ({keywords.length})
        </Button>
        <Button
          variant={filterStatus === 'ranked' ? 'default' : 'outline'}
          onClick={() => setFilterStatus('ranked')}
          className={filterStatus === 'ranked' 
            ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md hover:shadow-lg' 
            : 'bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
          }
        >
          Ranked ({rankedKeywords.length})
        </Button>
        <Button
          variant={filterStatus === 'unranked' ? 'default' : 'outline'}
          onClick={() => setFilterStatus('unranked')}
          className={filterStatus === 'unranked' 
            ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-md hover:shadow-lg' 
            : 'bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
          }
        >
          Unranked ({keywords.length - rankedKeywords.length})
        </Button>
      </div>

      {/* Rankings Table - Premium Design */}
      {filteredKeywords.length > 0 ? (
        <Card className="border-0 shadow-lg bg-white dark:bg-slate-800">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900/10 dark:to-blue-900/10 border-b border-slate-200 dark:border-slate-700">
            <CardTitle className="text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Keyword Rankings
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Current positions and changes for your tracked keywords
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {filteredKeywords.map((keyword) => (
                <div
                  key={keyword.id}
                  className="p-5 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-xl hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-md transition-all duration-200"
                >
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                    <div className="md:col-span-2">
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100">{keyword.keyword}</h4>
                      <div className="flex gap-2 mt-2">
                        <Badge 
                          variant={getPositionBadgeVariant(keyword.position)}
                          className={`text-xs font-semibold ${
                            !keyword.position 
                              ? 'bg-slate-200 text-slate-700 border-2 border-slate-300' 
                              : keyword.position <= 3 
                              ? 'bg-green-500 text-white' 
                              : keyword.position <= 10 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-orange-100 text-orange-700 border-2 border-orange-300'
                          }`}
                        >
                          {getPositionBadge(keyword.position)}
                        </Badge>
                        {keyword.featured && (
                          <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700 font-semibold">
                            Featured
                          </Badge>
                        )}
                        {keyword.localPack && (
                          <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 font-semibold">
                            Local Pack
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        {getChangeIcon(keyword.changeType, keyword.position, keyword.previousRank)}
                        <span className={`font-bold text-2xl ${getPositionColor(keyword.position)}`}>
                          {keyword.position || 'NR'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium mt-1">
                        Current Position
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <p className="font-semibold text-slate-700 dark:text-slate-300 text-lg">
                        {keyword.previousRank || 'N/A'}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                        Previous
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <p className="font-semibold text-slate-700 dark:text-slate-300 text-lg">
                        {keyword.searchVolume ? keyword.searchVolume.toLocaleString() : 'N/A'}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                        Volume
                      </p>
                    </div>
                    
                    <div className="text-center">
                      {keyword.difficulty && (
                        <Progress 
                          value={keyword.difficulty} 
                          className="w-20 h-2.5 mx-auto" 
                        />
                      )}
                      <p className="text-xs text-slate-500 font-medium mt-1">
                        Difficulty: {keyword.difficulty}%
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-slate-600 font-medium">
                        {new Date(keyword.checkedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  {keyword.url && (
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                      <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                        <strong className="text-slate-900 dark:text-slate-100">URL:</strong> {keyword.url}
                      </p>
                      {keyword.title && (
                        <p className="text-sm text-slate-600 dark:text-slate-400 truncate mt-1">
                          <strong className="text-slate-900 dark:text-slate-100">Title:</strong> {keyword.title}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-50 to-blue-50">
          <CardContent className="p-12 text-center">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No rankings found</h3>
            <p className="text-muted-foreground mb-4">
              {filterStatus === 'all' 
                ? 'No keywords are being tracked yet. Add some keywords to start tracking their rankings.'
                : `No ${filterStatus} keywords found. Try changing the filter or add more keywords.`
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
