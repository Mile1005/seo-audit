'use client';

import React, { useState, useEffect } from 'react';
import { 
  Award, 
  MapPin, 
  MessageCircle, 
  Image, 
  Video, 
  ShoppingBag, 
  Book, 
  Link2, 
  Star, 
  Newspaper, 
  Grid3x3,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Loader2,
  Target
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface SERPFeature {
  id: string;
  name: string;
  status: 'present' | 'absent' | 'opportunity';
  position?: number;
  yourRank?: number;
  description?: string;
}

interface SERPFeaturesSectionProps {
  keywordId: string;
  keyword: string;
}

export function SERPFeaturesSection({ keywordId, keyword }: SERPFeaturesSectionProps) {
  const [features, setFeatures] = useState<SERPFeature[]>([]);
  const [visibilityScore, setVisibilityScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  useEffect(() => {
    fetchSERPFeatures();
  }, [keywordId]);

  const fetchSERPFeatures = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/keywords/serp-features?keywordId=${keywordId}`);

      if (response.status === 401) {
        throw new Error('Sign in to view SERP features.');
      }

      if (!response.ok) {
        throw new Error('Failed to fetch SERP features');
      }

      const result = await response.json();

      if (result.success) {
        setFeatures(result.data.features);
        setVisibilityScore(result.data.visibilityScore);
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (err) {
      console.error('Error fetching SERP features:', err);
      setError(err instanceof Error ? err.message : 'Failed to load SERP features');
    } finally {
      setLoading(false);
    }
  };

  const getFeatureIcon = (featureId: string) => {
    const icons: Record<string, React.ElementType> = {
      'featured-snippet': Award,
      'local-pack': MapPin,
      'people-also-ask': MessageCircle,
      'image-pack': Image,
      'video-results': Video,
      'shopping-results': ShoppingBag,
      'knowledge-panel': Book,
      'site-links': Link2,
      'reviews-ratings': Star,
      'top-stories': Newspaper,
      'carousel': Grid3x3
    };
    return icons[featureId] || Target;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'opportunity':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'absent':
        return <XCircle className="h-5 w-5 text-slate-400" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300';
      case 'opportunity':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300';
      case 'absent':
        return 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300';
      default:
        return 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300';
    }
  };

  if (loading) {
    return (
      <Card className="border-0 shadow-xl bg-gradient-to-br from-amber-50 via-white to-yellow-50 dark:from-amber-900/10 dark:via-gray-900/10 dark:to-yellow-900/10 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/10 dark:to-yellow-900/10 border-b border-amber-100 dark:border-amber-800">
          <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <div className="p-2 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-lg shadow-md">
              <Award className="h-5 w-5 text-white" />
            </div>
            SERP Features Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
            <span className="ml-3 text-slate-600 dark:text-slate-400">Loading SERP features...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-0 shadow-xl bg-gradient-to-br from-amber-50 via-white to-yellow-50 dark:from-amber-900/10 dark:via-gray-900/10 dark:to-yellow-900/10 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/10 dark:to-yellow-900/10 border-b border-amber-100 dark:border-amber-800">
          <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <div className="p-2 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-lg shadow-md">
              <Award className="h-5 w-5 text-white" />
            </div>
            SERP Features Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-slate-700 mb-4">{error}</p>
            <button
              onClick={fetchSERPFeatures}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const presentFeatures = features.filter(f => f.status === 'present').length;
  const opportunityFeatures = features.filter(f => f.status === 'opportunity').length;

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-amber-50 via-white to-yellow-50 dark:from-amber-900/10 dark:via-gray-900/10 dark:to-yellow-900/10 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/10 dark:to-yellow-900/10 border-b border-amber-100 dark:border-amber-800">
        <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <div className="p-2 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-lg shadow-md">
            <Award className="h-5 w-5 text-white" />
          </div>
          SERP Features Analysis
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400 font-medium">
          Dominate search results with feature optimization for "{keyword}"
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        {/* Visibility Score */}
        <div className="mb-6 p-6 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-amber-100 mb-1">SERP Visibility Score</p>
              <p className="text-4xl font-bold text-white">{visibilityScore}%</p>
            </div>
            <div className="text-right">
              <Badge className="bg-white/20 backdrop-blur-sm text-white mb-2">
                {presentFeatures} Active Features
              </Badge>
              <p className="text-xs text-amber-100">{opportunityFeatures} Opportunities</p>
            </div>
          </div>
          <Progress value={visibilityScore} className="h-2 bg-amber-400" />
          <p className="text-xs text-amber-100 mt-2">
            {visibilityScore >= 75 ? 'Excellent visibility!' : visibilityScore >= 50 ? 'Good progress, optimize more features' : 'Optimize features to increase visibility'}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {features.map((feature) => {
            const Icon = getFeatureIcon(feature.id);
            const isSelected = selectedFeature === feature.id;

            return (
              <button
                key={feature.id}
                onClick={() => setSelectedFeature(isSelected ? null : feature.id)}
                className={`text-left bg-white dark:bg-slate-800 rounded-xl border-2 ${
                  isSelected ? 'border-amber-400 shadow-lg' : 'border-slate-200 dark:border-slate-600 hover:border-amber-300 dark:hover:border-amber-500'
                } transition-all duration-200 overflow-hidden`}
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-3 rounded-lg ${
                      feature.status === 'present'
                        ? 'bg-green-100 dark:bg-green-900/20'
                        : feature.status === 'opportunity'
                        ? 'bg-yellow-100 dark:bg-yellow-900/20'
                        : 'bg-slate-100 dark:bg-slate-700'
                    }`}>
                      <Icon className={`h-6 w-6 ${
                        feature.status === 'present'
                          ? 'text-green-600 dark:text-green-400'
                          : feature.status === 'opportunity'
                          ? 'text-yellow-600 dark:text-yellow-400'
                          : 'text-slate-400 dark:text-slate-300'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-slate-900 dark:text-slate-100">{feature.name}</h4>
                        {getStatusIcon(feature.status)}
                      </div>
                      
                      <Badge className={getStatusBadge(feature.status)}>
                        {feature.status === 'present' && 'Active'}
                        {feature.status === 'opportunity' && 'Opportunity'}
                        {feature.status === 'absent' && 'Not Available'}
                      </Badge>

                      {feature.position !== undefined && feature.status === 'present' && (
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                          Position: #{feature.position}
                          {feature.yourRank && ` • Your Rank: #${feature.yourRank}`}
                        </p>
                      )}

                      {feature.description && (
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">{feature.description}</p>
                      )}
                    </div>
                  </div>
                </div>

                {isSelected && feature.description && (
                  <div className="border-t border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 p-4 animate-in slide-in-from-top duration-300">
                    <p className="text-sm text-slate-700 dark:text-slate-300">{feature.description}</p>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-50 dark:bg-green-900/10 rounded-xl border-2 border-green-200 dark:border-green-800 p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              <h5 className="font-bold text-slate-900 dark:text-slate-100">Active</h5>
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{presentFeatures}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Features present in SERP</p>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/10 rounded-xl border-2 border-yellow-200 dark:border-yellow-800 p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <h5 className="font-bold text-slate-900 dark:text-slate-100">Opportunities</h5>
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{opportunityFeatures}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Features you can target</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-600 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              <h5 className="font-bold text-slate-900 dark:text-slate-100">Total</h5>
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{features.length}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">SERP features analyzed</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
