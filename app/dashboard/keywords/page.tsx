"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { KeywordResearch } from '@/components/keywords/keyword-research';
import { RankingDashboard } from '@/components/keywords/ranking-dashboard';
import { KeywordOpportunities } from '@/components/keywords/keyword-opportunities';
import { Search, TrendingUp, Lightbulb } from 'lucide-react';

function TabSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="space-y-4">
        <div className="h-8 bg-slate-700 rounded-lg w-1/3"></div>
        <div className="h-4 bg-slate-700 rounded w-2/3"></div>
      </div>

      {/* Cards grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 bg-slate-700 rounded w-16"></div>
              <div className="h-8 w-8 bg-slate-700 rounded-lg"></div>
            </div>
            <div className="h-12 bg-slate-700 rounded mb-2"></div>
            <div className="h-3 bg-slate-700 rounded w-24 mb-4"></div>
            <div className="h-6 bg-slate-700 rounded w-32"></div>
          </div>
        ))}
      </div>

      {/* Chart skeleton */}
      <div className="bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-700">
        <div className="h-6 bg-slate-700 rounded w-48 mb-4"></div>
        <div className="h-64 bg-slate-700 rounded"></div>
      </div>

      {/* Additional content skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
            <div className="h-6 bg-slate-700 rounded w-40 mb-4"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="h-16 bg-slate-700 rounded-lg"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function KeywordsPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'research' | 'rankings' | 'opportunities'>('research');
  const [projectId, setProjectId] = useState('demo-project-1');
  const [isTabLoading, setIsTabLoading] = useState(false);
  const [tabContent, setTabContent] = useState<React.ReactNode>(null);

  useEffect(() => {
    const id = searchParams.get('project');
    if (id) {
      setProjectId(id);
    }
  }, [searchParams]);

  const handleTabChange = async (newTab: 'research' | 'rankings' | 'opportunities') => {
    if (newTab === activeTab) return;

    setIsTabLoading(true);
    setActiveTab(newTab);

    // Small delay to show loading state and prevent white flash
    setTimeout(() => {
      setTabContent(renderTabContent(newTab));
      setIsTabLoading(false);
    }, 150);
  };

  const renderTabContent = (tab: 'research' | 'rankings' | 'opportunities') => {
    switch (tab) {
      case 'research':
        return <KeywordResearch projectId={projectId} />;
      case 'rankings':
        return <RankingDashboard projectId={projectId} />;
      case 'opportunities':
        return <KeywordOpportunities projectId={projectId} />;
      default:
        return <KeywordResearch projectId={projectId} />;
    }
  };

  // Initialize with first tab content
  useEffect(() => {
    setTabContent(renderTabContent(activeTab));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Keywords</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Research keywords, track rankings, and identify optimization opportunities
        </p>
      </div>
      
      <div className="w-full">
        <div className="flex space-x-2 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-1.5 rounded-xl mb-6 shadow-sm">
          <button 
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
              activeTab === 'research' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
            onClick={() => handleTabChange('research')}
          >
            <Search className="h-4 w-4" />
            Research
          </button>
          <button 
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
              activeTab === 'rankings' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
            onClick={() => handleTabChange('rankings')}
          >
            <TrendingUp className="h-4 w-4" />
            Rankings
          </button>
          <button 
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
              activeTab === 'opportunities' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
            onClick={() => handleTabChange('opportunities')}
          >
            <Lightbulb className="h-4 w-4" />
            Opportunities
          </button>
        </div>
        
        {isTabLoading ? <TabSkeleton /> : tabContent}
      </div>
    </div>
  );
}
