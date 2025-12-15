"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Lightbulb, TrendingUp, Target, Star, ArrowRight, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface KeywordOpportunity {
  id: string;
  keyword: string;
  searchVolume: number;
  difficulty: number;
  cpc: number;
  competition: number;
  currentPosition: number | null;
  opportunityScore: number;
  opportunityType: "quick-win" | "high-volume" | "low-competition" | "trending";
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
  const [selectedType, setSelectedType] = useState<string>("all");

  const loadOpportunities = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/keywords/research?projectId=${projectId}`);

      const result = await response.json();
      if (result.success) {
        const analyzed = analyzeOpportunities(result.data.keywords);
        setOpportunities(analyzed);
      } else {
        console.error("Error loading opportunities:", result.error);
      }
    } catch (error) {
      console.error("Error:", error);
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
      .map((keyword) => {
        const currentPosition = keyword.positions?.[0]?.position || null;
        const searchVolume = keyword.searchVolume || 0;
        const difficulty = keyword.difficulty || 0;
        const competition = keyword.competition || 0;

        // Calculate opportunity score (0-100)
        let opportunityScore = 0;
        let opportunityType: KeywordOpportunity["opportunityType"] = "quick-win";
        let reasoning = "";

        // Quick wins: High volume, low difficulty, not ranked or ranking poorly
        if (searchVolume > 1000 && difficulty < 30 && (!currentPosition || currentPosition > 20)) {
          opportunityScore = 85 + (searchVolume / 1000) * 0.01;
          opportunityType = "quick-win";
          reasoning =
            "High search volume with low difficulty - excellent opportunity for quick ranking gains";
        }
        // High volume opportunities
        else if (searchVolume > 5000 && difficulty < 60) {
          opportunityScore = 70 + (searchVolume / 1000) * 0.005;
          opportunityType = "high-volume";
          reasoning = "High search volume keyword worth the investment in optimization";
        }
        // Low competition opportunities
        else if (difficulty < 25 && competition < 0.3) {
          opportunityScore = 60 + (searchVolume / 100) * 0.01;
          opportunityType = "low-competition";
          reasoning = "Low competition makes this keyword easier to rank for";
        }
        // Trending/growing keywords
        else if (searchVolume > 500 && difficulty < 50) {
          opportunityScore = 50 + (searchVolume / 100) * 0.005;
          opportunityType = "trending";
          reasoning = "Emerging keyword with growth potential";
        } else {
          // Lower priority
          opportunityScore = Math.max(0, 40 - difficulty + searchVolume / 1000);
          opportunityType = "quick-win";
          reasoning = "Standard optimization opportunity";
        }

        // Boost score for keywords we're already tracking but ranking poorly
        if (currentPosition && currentPosition > 10 && currentPosition <= 50) {
          opportunityScore += 15;
          reasoning += " - Already indexed, small improvements could yield big gains";
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
          device: keyword.device,
        };
      })
      .filter((opp) => opp.opportunityScore > 30) // Only show decent opportunities
      .sort((a, b) => b.opportunityScore - a.opportunityScore);
  };

  const getOpportunityIcon = (type: string) => {
    switch (type) {
      case "quick-win":
        return <Star className="h-4 w-4 text-yellow-500" />;
      case "high-volume":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "low-competition":
        return <Target className="h-4 w-4 text-blue-500" />;
      case "trending":
        return <Lightbulb className="h-4 w-4 text-purple-500" />;
      default:
        return <Lightbulb className="h-4 w-4 text-gray-500" />;
    }
  };

  const getOpportunityLabel = (type: string) => {
    switch (type) {
      case "quick-win":
        return "Quick Win";
      case "high-volume":
        return "High Volume";
      case "low-competition":
        return "Low Competition";
      case "trending":
        return "Trending";
      default:
        return "Opportunity";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-orange-600";
  };

  const getScoreBadgeVariant = (
    score: number
  ): "default" | "secondary" | "destructive" | "outline" => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "outline";
  };

  const filteredOpportunities = opportunities.filter(
    (opp) => selectedType === "all" || opp.opportunityType === selectedType
  );

  const opportunityTypes = [
    { value: "all", label: "All Opportunities", count: opportunities.length },
    {
      value: "quick-win",
      label: "Quick Wins",
      count: opportunities.filter((o) => o.opportunityType === "quick-win").length,
    },
    {
      value: "high-volume",
      label: "High Volume",
      count: opportunities.filter((o) => o.opportunityType === "high-volume").length,
    },
    {
      value: "low-competition",
      label: "Low Competition",
      count: opportunities.filter((o) => o.opportunityType === "low-competition").length,
    },
    {
      value: "trending",
      label: "Trending",
      count: opportunities.filter((o) => o.opportunityType === "trending").length,
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-20 bg-gradient-to-r from-slate-100 to-purple-100 rounded-xl mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-32 bg-gradient-to-br from-slate-100 to-white rounded-xl shadow-md"
              ></div>
            ))}
          </div>
          <div className="h-64 bg-gradient-to-br from-slate-100 to-white rounded-xl shadow-md"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header - Beautiful Gradient */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-50 to-orange-50 dark:from-purple-900/10 dark:to-orange-900/10 rounded-xl border border-purple-100 dark:border-purple-800">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            Keyword Opportunities
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Discover high-potential keywords for your SEO strategy
          </p>
        </div>
        <Button
          onClick={loadOpportunities}
          className="bg-gradient-to-r from-purple-600 to-orange-600 hover:from-purple-700 hover:to-orange-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Filter className="h-4 w-4 mr-2" />
          Refresh Analysis
        </Button>
      </div>

      {/* Statistics Cards - Premium Design */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/10 dark:to-gray-900/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-blue-500 rounded-lg shadow-md">
                <Lightbulb className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                Total Opportunities
              </span>
            </div>
            <p className="text-4xl font-black text-blue-600 dark:text-blue-400">
              {opportunities.length}
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/10 dark:to-gray-900/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-yellow-500 rounded-lg shadow-md">
                <Star className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                Quick Wins
              </span>
            </div>
            <p className="text-4xl font-black text-yellow-600 dark:text-yellow-400">
              {opportunities.filter((o) => o.opportunityType === "quick-win").length}
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-green-50 to-white dark:from-green-900/10 dark:to-gray-900/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-green-500 rounded-lg shadow-md">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                High Volume
              </span>
            </div>
            <p className="text-4xl font-black text-green-600 dark:text-green-400">
              {opportunities.filter((o) => o.opportunityType === "high-volume").length}
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/10 dark:to-gray-900/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-purple-500 rounded-lg shadow-md">
                <Target className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                Avg Score
              </span>
            </div>
            <p className="text-4xl font-black text-purple-600 dark:text-purple-400">
              {opportunities.length > 0
                ? Math.round(
                    opportunities.reduce((sum, o) => sum + o.opportunityScore, 0) /
                      opportunities.length
                  )
                : 0}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons - Modern Pill Design */}
      <div className="flex flex-wrap gap-2">
        {opportunityTypes.map((type) => (
          <Button
            key={type.value}
            variant={selectedType === type.value ? "default" : "outline"}
            onClick={() => setSelectedType(type.value)}
            disabled={type.count === 0}
            className={
              selectedType === type.value
                ? "bg-gradient-to-r from-purple-600 to-orange-600 text-white shadow-md hover:shadow-lg"
                : "bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
            }
          >
            {type.label} ({type.count})
          </Button>
        ))}
      </div>

      {/* Opportunities List - Premium Design */}
      {filteredOpportunities.length > 0 ? (
        <Card className="border-0 shadow-lg bg-white dark:bg-slate-800">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-purple-50 dark:from-slate-900/10 dark:to-purple-900/10 border-b border-slate-200 dark:border-slate-700">
            <CardTitle className="text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              Keyword Opportunities
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Prioritized list of keywords with the highest potential impact
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {filteredOpportunities.map((opportunity) => (
                <div
                  key={opportunity.id}
                  className="p-5 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-xl hover:border-purple-200 dark:hover:border-purple-700 hover:shadow-md transition-all duration-200"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-start">
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                          {opportunity.keyword}
                        </h4>
                        <Badge
                          variant={getScoreBadgeVariant(opportunity.opportunityScore)}
                          className={`text-xs font-bold ${
                            opportunity.opportunityScore >= 80
                              ? "bg-green-500 text-white"
                              : opportunity.opportunityScore >= 60
                                ? "bg-yellow-500 text-white"
                                : "bg-orange-500 text-white"
                          }`}
                        >
                          {opportunity.opportunityScore}/100
                        </Badge>
                      </div>
                      <div className="flex gap-2 mb-2">
                        <Badge
                          variant="outline"
                          className={`text-xs font-semibold border-2 ${
                            opportunity.opportunityType === "quick-win"
                              ? "bg-yellow-100 text-yellow-700 border-yellow-400"
                              : opportunity.opportunityType === "high-volume"
                                ? "bg-green-100 text-green-700 border-green-400"
                                : opportunity.opportunityType === "low-competition"
                                  ? "bg-blue-100 text-blue-700 border-blue-400"
                                  : "bg-purple-100 text-purple-700 border-purple-400"
                          }`}
                        >
                          {getOpportunityIcon(opportunity.opportunityType)}
                          <span className="ml-1">
                            {getOpportunityLabel(opportunity.opportunityType)}
                          </span>
                        </Badge>
                        {opportunity.currentPosition && (
                          <Badge
                            variant="secondary"
                            className="text-xs bg-blue-100 text-blue-700 font-semibold"
                          >
                            Position {opportunity.currentPosition}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {opportunity.reasoning}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="font-bold text-lg text-green-600">
                        {opportunity.searchVolume.toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-500 font-medium">Volume</p>
                    </div>

                    <div className="text-center">
                      <div className="w-20 mx-auto">
                        <Progress value={opportunity.difficulty} className="h-2.5" />
                      </div>
                      <p className="text-xs text-slate-600 font-medium mt-1">
                        {Math.round(opportunity.difficulty)}% difficulty
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="font-bold text-lg text-purple-600">
                        ${opportunity.cpc.toFixed(2)}
                      </p>
                      <p className="text-xs text-slate-500 font-medium">CPC</p>
                    </div>

                    <div className="text-center">
                      <div className="w-20 mx-auto">
                        <Progress value={opportunity.competition * 100} className="h-2.5" />
                      </div>
                      <p className="text-xs text-slate-600 font-medium mt-1">Competition</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex gap-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
                      <span>Device: {opportunity.device}</span>
                      <span>Location: {opportunity.country}</span>
                      {opportunity.intent && <span>Intent: {opportunity.intent}</span>}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-orange-600 text-white border-0 hover:from-purple-700 hover:to-orange-700 shadow-sm"
                    >
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
        <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900/10 dark:to-purple-900/10">
          <CardContent className="p-12 text-center">
            <div className="animate-bounce mb-4">
              <Lightbulb className="h-12 w-12 text-purple-400 dark:text-purple-300 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
              No opportunities found
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              {selectedType === "all"
                ? "No keyword opportunities detected. Add more keywords to analyze potential opportunities."
                : `No ${getOpportunityLabel(selectedType).toLowerCase()} opportunities found. Try a different filter or add more keywords.`}
            </p>
            <Button
              onClick={loadOpportunities}
              className="bg-gradient-to-r from-purple-600 to-orange-600 hover:from-purple-700 hover:to-orange-700 text-white shadow-md"
            >
              Refresh Analysis
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
