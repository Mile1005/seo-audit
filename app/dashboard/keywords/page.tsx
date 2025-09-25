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
        <div className="flex space-x-1 bg-muted p-1 rounded-lg mb-6">
          <button 
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'research' 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('research')}
          >
            <Search className="h-4 w-4" />
            Research
          </button>
          <button 
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'rankings' 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('rankings')}
          >
            <TrendingUp className="h-4 w-4" />
            Rankings
          </button>
          <button 
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'opportunities' 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
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
