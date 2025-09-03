
"use client";

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { MainLayout } from '../../components/layout/main-layout';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { BarChart3, Globe, Search, TrendingUp, Rocket, BugPlay, KeyRound } from 'lucide-react';
import { useState } from 'react';

// Mock data for demonstration
const mockStats = {
  sitesAudited: 3,
  keywordsTracked: 12,
  avgScore: 82,
  issuesFound: 7,
};
const mockAudits = [
  { id: 1, site: 'example.com', date: '2025-09-01', score: 88, issues: 2 },
  { id: 2, site: 'myblog.net', date: '2025-08-28', score: 75, issues: 5 },
];
const mockCrawls = [
  { id: 1, site: 'example.com', date: '2025-09-01', pages: 120, status: 'Complete' },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [auditLoading, setAuditLoading] = useState(false);
  const [crawlLoading, setCrawlLoading] = useState(false);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  if (!session) {
    redirect('/login');
  }

  // Action handlers (replace with real API calls)
  const handleStartAudit = async () => {
    setAuditLoading(true);
    setTimeout(() => setAuditLoading(false), 1200);
  };
  const handleStartCrawl = async () => {
    setCrawlLoading(true);
    setTimeout(() => setCrawlLoading(false), 1200);
  };

  return (
    <MainLayout>
      <DashboardHeader user={{
        id: session.user?.id || 'unknown',
        email: session.user?.email || '',
        name: session.user?.name || '',
      }} />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
            Welcome back, {session.user?.name || session.user?.email}!
          </h1>
          <p className="text-lg text-blue-200 mb-4">Your AI-powered SEO dashboard</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="p-6 bg-gradient-to-br from-blue-900 to-slate-900 border-blue-800 shadow-xl hover:scale-105 transition-transform">
            <div className="flex items-center gap-4">
              <Globe className="h-10 w-10 text-blue-400" />
              <div>
                <p className="text-sm text-blue-200">Sites Audited</p>
                <p className="text-3xl font-bold text-white">{mockStats.sitesAudited}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-green-900 to-slate-900 border-green-800 shadow-xl hover:scale-105 transition-transform">
            <div className="flex items-center gap-4">
              <KeyRound className="h-10 w-10 text-green-400" />
              <div>
                <p className="text-sm text-green-200">Keywords Tracked</p>
                <p className="text-3xl font-bold text-white">{mockStats.keywordsTracked}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-purple-900 to-slate-900 border-purple-800 shadow-xl hover:scale-105 transition-transform">
            <div className="flex items-center gap-4">
              <TrendingUp className="h-10 w-10 text-purple-400" />
              <div>
                <p className="text-sm text-purple-200">Avg. Score</p>
                <p className="text-3xl font-bold text-white">{mockStats.avgScore}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-orange-900 to-slate-900 border-orange-800 shadow-xl hover:scale-105 transition-transform">
            <div className="flex items-center gap-4">
              <BarChart3 className="h-10 w-10 text-orange-400" />
              <div>
                <p className="text-sm text-orange-200">Issues Found</p>
                <p className="text-3xl font-bold text-white">{mockStats.issuesFound}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-6 mb-10">
          <Button onClick={handleStartAudit} disabled={auditLoading} className="flex items-center gap-2 px-8 py-4 text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg hover:from-blue-700 hover:to-cyan-600 transition-all">
            <Rocket className="w-6 h-6" />
            {auditLoading ? 'Starting SEO Audit...' : 'Start SEO Audit'}
          </Button>
          <Button onClick={handleStartCrawl} disabled={crawlLoading} className="flex items-center gap-2 px-8 py-4 text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-lg hover:from-green-700 hover:to-emerald-600 transition-all">
            <BugPlay className="w-6 h-6" />
            {crawlLoading ? 'Starting Crawl...' : 'Start Crawl'}
          </Button>
          <Button disabled className="flex items-center gap-2 px-8 py-4 text-lg font-bold bg-gradient-to-r from-gray-600 to-gray-800 text-gray-300 shadow-lg cursor-not-allowed" title="Keyword tracking coming soon!">
            <KeyRound className="w-6 h-6" />
            Track Keywords
          </Button>
        </div>

        {/* Recent Audits & Crawls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6 bg-slate-900 border-slate-800 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Recent Audits</h2>
              <Button size="sm" className="bg-blue-700 hover:bg-blue-800 text-white">
                <Search className="h-4 w-4 mr-2" />New Audit
              </Button>
            </div>
            <div className="divide-y divide-slate-800">
              {mockAudits.length === 0 ? (
                <div className="text-center py-8 text-blue-200">No audits yet</div>
              ) : (
                mockAudits.map(audit => (
                  <div key={audit.id} className="py-4 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">{audit.site}</div>
                      <div className="text-xs text-blue-200">{audit.date}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-blue-400">{audit.score}</span>
                      <span className="text-sm text-orange-400">{audit.issues} issues</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
          <Card className="p-6 bg-slate-900 border-slate-800 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Recent Crawls</h2>
              <Button size="sm" className="bg-green-700 hover:bg-green-800 text-white">
                <BugPlay className="h-4 w-4 mr-2" />New Crawl
              </Button>
            </div>
            <div className="divide-y divide-slate-800">
              {mockCrawls.length === 0 ? (
                <div className="text-center py-8 text-green-200">No crawls yet</div>
              ) : (
                mockCrawls.map(crawl => (
                  <div key={crawl.id} className="py-4 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">{crawl.site}</div>
                      <div className="text-xs text-green-200">{crawl.date}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-green-400">{crawl.pages} pages</span>
                      <span className="text-sm text-green-300">{crawl.status}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
