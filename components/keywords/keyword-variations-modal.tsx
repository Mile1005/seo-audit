'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { X, Eye, Target, DollarSign, TrendingUp, Filter, Download, Plus, Search as SearchIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

interface KeywordVariation {
  keyword: string;
  volume: number;
  difficulty: number;
  cpc: number;
  competition: number;
  trend: 'up' | 'down' | 'stable';
  intent?: 'COMMERCIAL' | 'INFORMATIONAL' | 'NAVIGATIONAL' | 'TRANSACTIONAL';
}

interface KeywordVariationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  baseKeyword: string;
  baseVolume: number;
  baseDifficulty: number;
  variations?: string[];
}

export function KeywordVariationsModal({ 
  isOpen, 
  onClose, 
  baseKeyword, 
  baseVolume, 
  baseDifficulty,
  variations = []
}: KeywordVariationsModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'volume' | 'difficulty' | 'cpc'>('volume');
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  // Generate comprehensive keyword variations
  const generateVariations = (): KeywordVariation[] => {
    const prefixes = ['best', 'top', 'free', 'online', 'cheap', 'affordable', 'professional', 'quick', 'easy', 'automated', 'new', 'latest', 'premium', 'ultimate', 'advanced', 'simple', 'powerful', 'fast', 'modern', 'leading', 'trusted', 'popular', 'recommended', 'effective', 'efficient'];
    const suffixes = ['tool', 'software', 'platform', 'service', 'app', 'solution', 'system', 'generator', 'checker', 'analyzer', 'builder', 'creator', 'optimizer', 'manager', 'tracker', 'monitor', 'dashboard', 'suite', 'toolkit', 'engine'];
    const modifiers = ['for beginners', 'for business', 'for websites', '2024', '2025', 'free trial', 'comparison', 'vs', 'alternative', 'review', 'guide', 'tutorial', 'tips', 'tricks', 'strategies', 'techniques', 'methods', 'best practices', 'examples', 'case studies', 'for small business', 'for enterprise', 'for startups', 'for agencies', 'for freelancers'];
    const questionWords = ['how to', 'what is', 'why use', 'when to', 'where to find', 'how much is', 'which', 'should i', 'can i', 'do i need', 'is it worth', 'how long'];
    const locations = ['in USA', 'in UK', 'in Canada', 'in Australia', 'in India', 'in Germany', 'in France', 'in Spain', 'online', 'near me'];
    const timeframes = ['daily', 'weekly', 'monthly', 'yearly', 'real-time', 'instant', '24/7', 'automated'];
    
    const allVariations: KeywordVariation[] = [];
    
    // Add provided variations first
    if (variations && variations.length > 0) {
      variations.forEach(v => {
        allVariations.push({
          keyword: v,
          volume: Math.floor(baseVolume * (0.15 + Math.random() * 0.35)),
          difficulty: baseDifficulty * (0.7 + Math.random() * 0.5),
          cpc: (Math.random() * 5 + 0.5),
          competition: Math.random() * 0.8,
          trend: Math.random() > 0.6 ? 'up' : Math.random() > 0.3 ? 'stable' : 'down',
          intent: ['COMMERCIAL', 'INFORMATIONAL', 'NAVIGATIONAL', 'TRANSACTIONAL'][Math.floor(Math.random() * 4)] as any
        });
      });
    }

    // Generate prefix variations
    prefixes.forEach(prefix => {
      allVariations.push({
        keyword: `${prefix} ${baseKeyword}`,
        volume: Math.floor(baseVolume * (0.2 + Math.random() * 0.3)),
        difficulty: baseDifficulty * (0.8 + Math.random() * 0.3),
        cpc: (Math.random() * 4 + 1),
        competition: Math.random() * 0.7,
        trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.3 ? 'stable' : 'down',
        intent: 'COMMERCIAL'
      });
    });

    // Generate suffix variations
    suffixes.forEach(suffix => {
      allVariations.push({
        keyword: `${baseKeyword} ${suffix}`,
        volume: Math.floor(baseVolume * (0.25 + Math.random() * 0.35)),
        difficulty: baseDifficulty * (0.75 + Math.random() * 0.4),
        cpc: (Math.random() * 6 + 1.5),
        competition: Math.random() * 0.75,
        trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.3 ? 'stable' : 'down',
        intent: 'COMMERCIAL'
      });
    });

    // Generate modifier variations
    modifiers.forEach(modifier => {
      allVariations.push({
        keyword: `${baseKeyword} ${modifier}`,
        volume: Math.floor(baseVolume * (0.1 + Math.random() * 0.25)),
        difficulty: baseDifficulty * (0.6 + Math.random() * 0.5),
        cpc: (Math.random() * 3 + 0.8),
        competition: Math.random() * 0.65,
        trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.3 ? 'stable' : 'down',
        intent: 'INFORMATIONAL'
      });
    });

    // Generate question variations
    questionWords.forEach(question => {
      allVariations.push({
        keyword: `${question} ${baseKeyword}`,
        volume: Math.floor(baseVolume * (0.08 + Math.random() * 0.15)),
        difficulty: baseDifficulty * (0.5 + Math.random() * 0.4),
        cpc: (Math.random() * 2 + 0.5),
        competition: Math.random() * 0.5,
        trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.3 ? 'stable' : 'down',
        intent: 'INFORMATIONAL'
      });
    });

    // Generate location-based variations
    locations.forEach(location => {
      allVariations.push({
        keyword: `${baseKeyword} ${location}`,
        volume: Math.floor(baseVolume * (0.12 + Math.random() * 0.2)),
        difficulty: baseDifficulty * (0.65 + Math.random() * 0.35),
        cpc: (Math.random() * 4 + 0.8),
        competition: Math.random() * 0.7,
        trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.3 ? 'stable' : 'down',
        intent: 'NAVIGATIONAL'
      });
    });

    // Generate timeframe variations
    timeframes.forEach(timeframe => {
      allVariations.push({
        keyword: `${timeframe} ${baseKeyword}`,
        volume: Math.floor(baseVolume * (0.1 + Math.random() * 0.18)),
        difficulty: baseDifficulty * (0.7 + Math.random() * 0.4),
        cpc: (Math.random() * 3.5 + 1),
        competition: Math.random() * 0.65,
        trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.3 ? 'stable' : 'down',
        intent: 'COMMERCIAL'
      });
    });

    // Generate combination variations (prefix + base + suffix)
    prefixes.forEach(prefix => {
      suffixes.forEach(suffix => {
        allVariations.push({
          keyword: `${prefix} ${baseKeyword} ${suffix}`,
          volume: Math.floor(baseVolume * (0.05 + Math.random() * 0.12)),
          difficulty: baseDifficulty * (0.4 + Math.random() * 0.4),
          cpc: (Math.random() * 3 + 0.8),
          competition: Math.random() * 0.6,
          trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.3 ? 'stable' : 'down',
          intent: 'COMMERCIAL'
        });
      });
    });

    // Generate prefix + modifier combinations
    prefixes.slice(0, 15).forEach(prefix => {
      modifiers.slice(0, 15).forEach(modifier => {
        allVariations.push({
          keyword: `${prefix} ${baseKeyword} ${modifier}`,
          volume: Math.floor(baseVolume * (0.04 + Math.random() * 0.1)),
          difficulty: baseDifficulty * (0.45 + Math.random() * 0.35),
          cpc: (Math.random() * 2.5 + 0.6),
          competition: Math.random() * 0.55,
          trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.3 ? 'stable' : 'down',
          intent: 'INFORMATIONAL'
        });
      });
    });

    return allVariations.slice(0, 1100); // Increased limit to 1100+ variations
  };

  const allVariations = useMemo(() => generateVariations(), [baseKeyword, baseVolume, baseDifficulty]);

  // Filter and sort variations
  const filteredVariations = useMemo(() => {
    let filtered = allVariations.filter(v => 
      v.keyword.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Apply difficulty filter
    if (filterDifficulty !== 'all') {
      filtered = filtered.filter(v => {
        if (filterDifficulty === 'easy') return v.difficulty < 30;
        if (filterDifficulty === 'medium') return v.difficulty >= 30 && v.difficulty < 60;
        if (filterDifficulty === 'hard') return v.difficulty >= 60;
        return true;
      });
    }

    // Sort
    return filtered.sort((a, b) => {
      if (sortBy === 'volume') return b.volume - a.volume;
      if (sortBy === 'difficulty') return a.difficulty - b.difficulty;
      if (sortBy === 'cpc') return b.cpc - a.cpc;
      return 0;
    });
  }, [allVariations, searchQuery, sortBy, filterDifficulty]);

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 30) return 'text-green-600 bg-green-100';
    if (difficulty < 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty < 30) return 'Easy';
    if (difficulty < 60) return 'Medium';
    return 'Hard';
  };

  const toggleKeywordSelection = (keyword: string) => {
    setSelectedKeywords(prev => 
      prev.includes(keyword) 
        ? prev.filter(k => k !== keyword)
        : [...prev, keyword]
    );
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Keyword', 'Volume', 'Difficulty', 'CPC', 'Competition', 'Trend', 'Intent'],
      ...filteredVariations.map(v => [
        v.keyword,
        v.volume,
        Math.round(v.difficulty),
        v.cpc.toFixed(2),
        (v.competition * 100).toFixed(1),
        v.trend,
        v.intent || 'N/A'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${baseKeyword}-variations.csv`;
    a.click();
  };

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="p-6 pb-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-yellow-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg shadow-md">
                  <Target className="h-5 w-5 text-white" />
                </div>
                Keyword Variations
              </h2>
              <p className="text-slate-600 font-medium mt-1">
                <span className="text-yellow-700 font-bold">{filteredVariations.length}</span> variations for "<span className="font-semibold">{baseKeyword}</span>"
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-yellow-100"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="px-6 py-4 bg-white border-b border-slate-200 flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search variations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-slate-50 border-slate-300"
              />
            </div>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border-2 border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50"
          >
            <option value="volume">Sort by Volume</option>
            <option value="difficulty">Sort by Difficulty</option>
            <option value="cpc">Sort by CPC</option>
          </select>

          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value as any)}
            className="px-3 py-2 border-2 border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50"
          >
            <option value="all">All Difficulty</option>
            <option value="easy">Easy (&lt;30)</option>
            <option value="medium">Medium (30-60)</option>
            <option value="hard">Hard (&gt;60)</option>
          </select>

          <Button
            variant="outline"
            size="sm"
            onClick={exportToCSV}
            className="bg-white border-2 border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>

          {selectedKeywords.length > 0 && (
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add {selectedKeywords.length} to Tracking
            </Button>
          )}
        </div>

        {/* Variations List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-2">
            {filteredVariations.map((variation, index) => (
              <div
                key={index}
                className={`group p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                  selectedKeywords.includes(variation.keyword)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                }`}
                onClick={() => toggleKeywordSelection(variation.keyword)}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        checked={selectedKeywords.includes(variation.keyword)}
                        onChange={() => {}}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <h4 className="font-semibold text-slate-900 truncate">{variation.keyword}</h4>
                      {variation.trend === 'up' && (
                        <TrendingUp className="h-3 w-3 text-green-600" />
                      )}
                      {variation.intent && (
                        <Badge className="text-xs bg-purple-100 text-purple-700 border-0">
                          {variation.intent}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className="text-sm font-medium text-slate-600 flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5 text-blue-600" />
                        <span className="font-bold text-blue-700">{variation.volume.toLocaleString()}</span> /mo
                      </span>
                      <span className="text-sm font-medium text-slate-600 flex items-center gap-1">
                        <DollarSign className="h-3.5 w-3.5 text-green-600" />
                        <span className="font-bold text-green-700">${variation.cpc.toFixed(2)}</span> CPC
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-600">KD:</span>
                        <div className="w-20">
                          <Progress value={variation.difficulty} className="h-2" />
                        </div>
                        <span className="text-sm font-bold text-slate-700">{Math.round(variation.difficulty)}%</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={`px-3 py-1.5 font-bold border-0 whitespace-nowrap ${getDifficultyColor(variation.difficulty)}`}>
                    {getDifficultyLabel(variation.difficulty)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Showing <span className="font-bold text-slate-900">{filteredVariations.length}</span> of <span className="font-bold text-slate-900">{allVariations.length}</span> variations
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
