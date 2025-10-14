"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { KeywordResearch } from '@/components/keywords/keyword-research';
import { RankingDashboard } from '@/components/keywords/ranking-dashboard';
import { KeywordOpportunities } from '@/components/keywords/keyword-opportunities';
import { Search, TrendingUp, Lightbulb } from 'lucide-react';

export default function KeywordsPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'research' | 'rankings' | 'opportunities'>('research');
  const [projectId, setProjectId] = useState('demo-project-1');
  
  useEffect(() => {
    const id = searchParams.get('project');
    if (id) {
      setProjectId(id);
    }
  }, [searchParams]);

  const renderTabContent = () => {
    switch (activeTab) {
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
            onClick={() => setActiveTab('research')}
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
            onClick={() => setActiveTab('rankings')}
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
            onClick={() => setActiveTab('opportunities')}
          >
            <Lightbulb className="h-4 w-4" />
            Opportunities
          </button>
        </div>
        
        {renderTabContent()}
      </div>
    </div>
  );
}
