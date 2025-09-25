'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Search, TrendingUp, Target, BarChart3, Download, Plus, Star, Crown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    if (!keywordInput.trim()) return;
    
    setIsLoading(true);
    try {
      const keywordList = keywordInput
        .split('\n')
        .map(k => k.trim())
        .filter(k => k.length > 0);

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

      const result = await response.json();
      
      if (result.success) {
        setKeywords(prev => [...result.data.keywords, ...prev]);
        setKeywordInput('');
      } else {
        console.error('Error researching keywords:', result.error);
        alert('Error researching keywords: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error occurred. Please try again.');
    } finally {
      setIsLoading(false);
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

  return (
    <div className="space-y-6">
      {/* Premium Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Keyword Research</h2>
          <p className="text-sm text-gray-600">Discover and analyze keywords for your SEO strategy</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={isPremium ? "default" : "secondary"} className="gap-1">
            {isPremium ? <Crown className="h-3 w-3" /> : <Star className="h-3 w-3" />}
            {isPremium ? 'Premium' : 'Free'}
          </Badge>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsPremium(!isPremium)}
          >
            {isPremium ? 'Switch to Free' : 'Upgrade to Premium'}
          </Button>
        </div>
      </div>

      {/* Research Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Research Keywords
          </CardTitle>
          <CardDescription>
            Enter keywords to research (one per line, up to {isPremium ? '1000' : '100'} keywords)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <textarea
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              placeholder="seo audit keyword research&#10;best seo tools&#10;how to do keyword research"
              className="min-h-[120px] w-full p-3 border border-gray-300 rounded-md resize-y"
              maxLength={isPremium ? 10000 : 1000}
            />
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>
                {keywordInput.split('\n').filter(k => k.trim()).length} keywords entered
              </span>
              <span>
                {isPremium ? '1000' : '100'} keyword limit
              </span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={handleResearchKeywords}
              disabled={isLoading || !keywordInput.trim()}
              className="flex items-center gap-2"
            >
              {isLoading ? 'Researching...' : 'Research Keywords'}
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Keywords Results */}
      {keywords.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Keywords ({keywords.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Keyword</th>
                    <th className="text-left p-2">Volume</th>
                    <th className="text-left p-2">Difficulty</th>
                    <th className="text-left p-2">CPC</th>
                    <th className="text-left p-2">Intent</th>
                    <th className="text-left p-2">Competition</th>
                  </tr>
                </thead>
                <tbody>
                  {keywords.map((keyword) => (
                    <tr key={keyword.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-medium">{keyword.keyword}</td>
                      <td className={`p-2 ${getVolumeColor(keyword.searchVolume)}`}>
                        {formatNumber(keyword.searchVolume)}
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getDifficultyColor(keyword.difficulty)}`}></div>
                          <span>{Math.round(keyword.difficulty)}</span>
                          <span className="text-xs text-gray-500">
                            ({getDifficultyLabel(keyword.difficulty)})
                          </span>
                        </div>
                      </td>
                      <td className="p-2">${keyword.cpc.toFixed(2)}</td>
                      <td className="p-2">
                        <Badge variant="outline" className="text-xs">
                          {keyword.intent || 'Unknown'}
                        </Badge>
                      </td>
                      <td className="p-2">
                        <Progress value={keyword.competition * 100} className="w-16" />
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
