'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Lightbulb, TrendingUp, Target, Star, ArrowRight, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface KeywordOpportunity {
  id: string;
  keyword: string;
  searchVolume: number;
  difficulty: number;
  cpc: number;
  competition: number;
  currentPosition: number | null;
  opportunityScore: number;
  opportunityType: 'quick-win' | 'high-volume' | 'low-competition' | 'trending';
  reasoning: string;
  intent: string | null;
  country: string;
  device: string;
}

interface KeywordOpportunitiesProps {
  projectId: string;
}

export function KeywordOpportunities({ projectId }: KeywordOpportunitiesProps) {
  const [opportunities, setOpportunities] = useState<KeywordOpportunity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');

  const loadOpportunities = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/keywords/research?projectId=${projectId}`, {
        headers: {
          'x-user-id': 'demo-user' // Demo auth
        }
      });

      const result = await response.json();
      if (result.success) {
        const analyzed = analyzeOpportunities(result.data.keywords);
        setOpportunities(analyzed);
      } else {
        console.error('Error loading opportunities:', result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadOpportunities();
  }, [loadOpportunities]);

  // loadOpportunities moved above & memoized

  const analyzeOpportunities = (keywords: any[]): KeywordOpportunity[] => {
    return keywords
      .map(keyword => {
        const currentPosition = keyword.positions?.[0]?.position || null;
        const searchVolume = keyword.searchVolume || 0;
        const difficulty = keyword.difficulty || 0;
        const competition = keyword.competition || 0;
        
        // Calculate opportunity score (0-100)
        let opportunityScore = 0;
        let opportunityType: KeywordOpportunity['opportunityType'] = 'quick-win';
        let reasoning = '';

        // Quick wins: High volume, low difficulty, not ranked or ranking poorly
        if (searchVolume > 1000 && difficulty < 30 && (!currentPosition || currentPosition > 20)) {
          opportunityScore = 85 + (searchVolume / 1000) * 0.01;
          opportunityType = 'quick-win';
          reasoning = 'High search volume with low difficulty - excellent opportunity for quick ranking gains';
        }
        // High volume opportunities
        else if (searchVolume > 5000 && difficulty < 60) {
          opportunityScore = 70 + (searchVolume / 1000) * 0.005;
          opportunityType = 'high-volume';
          reasoning = 'High search volume keyword worth the investment in optimization';
        }
        // Low competition opportunities
        else if (difficulty < 25 && competition < 0.3) {
          opportunityScore = 60 + (searchVolume / 100) * 0.01;
          opportunityType = 'low-competition';
          reasoning = 'Low competition makes this keyword easier to rank for';
        }
        // Trending/growing keywords
        else if (searchVolume > 500 && difficulty < 50) {
          opportunityScore = 50 + (searchVolume / 100) * 0.005;
          opportunityType = 'trending';
          reasoning = 'Emerging keyword with growth potential';
        }
        else {
          // Lower priority
          opportunityScore = Math.max(0, 40 - difficulty + (searchVolume / 1000));
          opportunityType = 'quick-win';
          reasoning = 'Standard optimization opportunity';
        }

        // Boost score for keywords we're already tracking but ranking poorly
        if (currentPosition && currentPosition > 10 && currentPosition <= 50) {
          opportunityScore += 15;
          reasoning += ' - Already indexed, small improvements could yield big gains';
        }

        // Cap the score
        opportunityScore = Math.min(100, Math.max(0, opportunityScore));

        return {
          id: keyword.id,
          keyword: keyword.keyword,
          searchVolume,
          difficulty,
          cpc: keyword.cpc || 0,
          competition,
          currentPosition,
          opportunityScore: Math.round(opportunityScore),
          opportunityType,
          reasoning,
          intent: keyword.intent,
          country: keyword.country,
          device: keyword.device
        };
      })
      .filter(opp => opp.opportunityScore > 30) // Only show decent opportunities
      .sort((a, b) => b.opportunityScore - a.opportunityScore);
  };

  const getOpportunityIcon = (type: string) => {
    switch (type) {
      case 'quick-win':
        return <Star className="h-4 w-4 text-yellow-500" />;
      case 'high-volume':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'low-competition':
        return <Target className="h-4 w-4 text-blue-500" />;
      case 'trending':
        return <Lightbulb className="h-4 w-4 text-purple-500" />;
      default:
        return <Lightbulb className="h-4 w-4 text-gray-500" />;
    }
  };

  const getOpportunityLabel = (type: string) => {
    switch (type) {
      case 'quick-win':
        return 'Quick Win';
      case 'high-volume':
        return 'High Volume';
      case 'low-competition':
        return 'Low Competition';
      case 'trending':
        return 'Trending';
      default:
        return 'Opportunity';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getScoreBadgeVariant = (score: number): "default" | "secondary" | "destructive" | "outline" => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'outline';
  };

  const filteredOpportunities = opportunities.filter(opp => 
    selectedType === 'all' || opp.opportunityType === selectedType
  );

  const opportunityTypes = [
    { value: 'all', label: 'All Opportunities', count: opportunities.length },
    { value: 'quick-win', label: 'Quick Wins', count: opportunities.filter(o => o.opportunityType === 'quick-win').length },
    { value: 'high-volume', label: 'High Volume', count: opportunities.filter(o => o.opportunityType === 'high-volume').length },
    { value: 'low-competition', label: 'Low Competition', count: opportunities.filter(o => o.opportunityType === 'low-competition').length },
    { value: 'trending', label: 'Trending', count: opportunities.filter(o => o.opportunityType === 'trending').length }
  ];

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
          <h2 className="text-2xl font-bold">Keyword Opportunities</h2>
          <p className="text-muted-foreground">
            Discover high-potential keywords for your SEO strategy
          </p>
        </div>
        <Button onClick={loadOpportunities}>
          <Filter className="h-4 w-4 mr-2" />
          Refresh Analysis
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Total Opportunities</span>
            </div>
            <p className="text-2xl font-bold">{opportunities.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Quick Wins</span>
            </div>
            <p className="text-2xl font-bold">
              {opportunities.filter(o => o.opportunityType === 'quick-win').length}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">High Volume</span>
            </div>
            <p className="text-2xl font-bold">
              {opportunities.filter(o => o.opportunityType === 'high-volume').length}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Avg Score</span>
            </div>
            <p className="text-2xl font-bold">
              {opportunities.length > 0 
                ? Math.round(opportunities.reduce((sum, o) => sum + o.opportunityScore, 0) / opportunities.length)
                : 0
              }
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {opportunityTypes.map(type => (
          <Button
            key={type.value}
            variant={selectedType === type.value ? 'default' : 'outline'}
            onClick={() => setSelectedType(type.value)}
            disabled={type.count === 0}
          >
            {type.label} ({type.count})
          </Button>
        ))}
      </div>

      {/* Opportunities List */}
      {filteredOpportunities.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Keyword Opportunities</CardTitle>
            <CardDescription>
              Prioritized list of keywords with the highest potential impact
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredOpportunities.map((opportunity) => (
                <div
                  key={opportunity.id}
                  className="p-4 border rounded-lg hover:border-gray-300 transition-colors"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-start">
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{opportunity.keyword}</h4>
                        <Badge 
                          variant={getScoreBadgeVariant(opportunity.opportunityScore)}
                          className="text-xs"
                        >
                          {opportunity.opportunityScore}/100
                        </Badge>
                      </div>
                      <div className="flex gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {getOpportunityIcon(opportunity.opportunityType)}
                          <span className="ml-1">{getOpportunityLabel(opportunity.opportunityType)}</span>
                        </Badge>
                        {opportunity.currentPosition && (
                          <Badge variant="secondary" className="text-xs">
                            Position {opportunity.currentPosition}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {opportunity.reasoning}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <p className="font-semibold text-green-600">
                        {opportunity.searchVolume.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">Volume</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 mx-auto">
                        <Progress 
                          value={opportunity.difficulty} 
                          className="h-2" 
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {Math.round(opportunity.difficulty)}% difficulty
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <p className="font-semibold">
                        ${opportunity.cpc.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">CPC</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 mx-auto">
                        <Progress 
                          value={opportunity.competition * 100} 
                          className="h-2" 
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Competition
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t flex items-center justify-between">
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>Device: {opportunity.device}</span>
                      <span>Location: {opportunity.country}</span>
                      {opportunity.intent && (
                        <span>Intent: {opportunity.intent}</span>
                      )}
                    </div>
                    <Button variant="outline" size="sm">
                      Start Optimizing
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <Lightbulb className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No opportunities found</h3>
            <p className="text-muted-foreground mb-4">
              {selectedType === 'all' 
                ? 'No keyword opportunities detected. Add more keywords to analyze potential opportunities.'
                : `No ${getOpportunityLabel(selectedType).toLowerCase()} opportunities found. Try a different filter or add more keywords.`
              }
            </p>
            <Button onClick={loadOpportunities}>
              Refresh Analysis
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
