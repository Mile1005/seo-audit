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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Keyword Rankings</h2>
          <p className="text-muted-foreground">
            Track your keyword positions and performance over time
          </p>
        </div>
        <Button onClick={loadKeywordRankings}>
          <Calendar className="h-4 w-4 mr-2" />
          Refresh Rankings
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Total Keywords</span>
            </div>
            <p className="text-2xl font-bold">{keywords.length}</p>
            <p className="text-xs text-muted-foreground">
              {rankedKeywords.length} ranked
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Page 1 Rankings</span>
            </div>
            <p className="text-2xl font-bold">{topKeywords}</p>
            <p className="text-xs text-muted-foreground">
              Top 10 positions
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Avg Position</span>
            </div>
            <p className="text-2xl font-bold">{avgPosition || 'N/A'}</p>
            <p className="text-xs text-muted-foreground">
              For ranked keywords
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Improvements</span>
            </div>
            <p className="text-2xl font-bold">{improvedKeywords}</p>
            <p className="text-xs text-muted-foreground">
              Keywords moved up
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2">
        <Button
          variant={filterStatus === 'all' ? 'default' : 'outline'}
          onClick={() => setFilterStatus('all')}
        >
          All Keywords ({keywords.length})
        </Button>
        <Button
          variant={filterStatus === 'ranked' ? 'default' : 'outline'}
          onClick={() => setFilterStatus('ranked')}
        >
          Ranked ({rankedKeywords.length})
        </Button>
        <Button
          variant={filterStatus === 'unranked' ? 'default' : 'outline'}
          onClick={() => setFilterStatus('unranked')}
        >
          Unranked ({keywords.length - rankedKeywords.length})
        </Button>
      </div>

      {/* Rankings Table */}
      {filteredKeywords.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Keyword Rankings</CardTitle>
            <CardDescription>
              Current positions and changes for your tracked keywords
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredKeywords.map((keyword) => (
                <div
                  key={keyword.id}
                  className="p-4 border rounded-lg hover:border-gray-300 transition-colors"
                >
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                    <div className="md:col-span-2">
                      <h4 className="font-medium">{keyword.keyword}</h4>
                      <div className="flex gap-2 mt-1">
                        <Badge 
                          variant={getPositionBadgeVariant(keyword.position)}
                          className="text-xs"
                        >
                          {getPositionBadge(keyword.position)}
                        </Badge>
                        {keyword.featured && (
                          <Badge variant="secondary" className="text-xs">
                            Featured
                          </Badge>
                        )}
                        {keyword.localPack && (
                          <Badge variant="secondary" className="text-xs">
                            Local Pack
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        {getChangeIcon(keyword.changeType, keyword.position, keyword.previousRank)}
                        <span className={`font-bold text-lg ${getPositionColor(keyword.position)}`}>
                          {keyword.position || 'NR'}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Current Position
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <p className="font-semibold">
                        {keyword.previousRank || 'N/A'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Previous
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <p className="font-semibold">
                        {keyword.searchVolume ? keyword.searchVolume.toLocaleString() : 'N/A'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Volume
                      </p>
                    </div>
                    
                    <div className="text-center">
                      {keyword.difficulty && (
                        <Progress 
                          value={keyword.difficulty} 
                          className="w-16 h-2 mx-auto" 
                        />
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        Difficulty
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">
                        {new Date(keyword.checkedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  {keyword.url && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm text-muted-foreground truncate">
                        <strong>URL:</strong> {keyword.url}
                      </p>
                      {keyword.title && (
                        <p className="text-sm text-muted-foreground truncate mt-1">
                          <strong>Title:</strong> {keyword.title}
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
        <Card>
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
