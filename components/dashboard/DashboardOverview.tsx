'use client'

import { useState, useEffect } from 'react'
import { 
  ChartBarIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  LinkIcon,
  UsersIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  DocumentMagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import { MetricWidget, ProgressBar, StatusBadge, Sparkline } from '@/components/dashboard/MetricWidget'
import { useProjects, useProjectOverview } from '../../hooks/useApi'

export default function DashboardOverview() {
  const { projects, isLoading: projectsLoading } = useProjects(1, 1)
  const firstProject = projects[0]
  const { overview, isLoading: overviewLoading } = useProjectOverview(firstProject?.id || '')
  
  const [loading, setLoading] = useState(true)

  // Simulate data loading for demo
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  // Use real data if available, fallback to mock data
  const data = overview || {
    metrics: {
      healthScore: 87,
      searchVisibility: 12.4,
      keywords: { total: 1247, improved: 374 },
      backlinks: { total: 8200, newThisMonth: 820 },
      traffic: { organicVisitors: 45200, changePercent: 8.7 },
      audits: { criticalIssues: 23 }
    },
    trends: {
      keywords: [45, 52, 48, 61, 55, 67, 72, 58, 63, 71, 69, 76],
      traffic: [1200, 1350, 1180, 1420, 1380, 1650, 1480, 1590, 1720, 1650, 1780, 1850]
    }
  }

  const isDataLoading = loading || projectsLoading || overviewLoading

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Monitor your SEO performance and track key metrics
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
            <ClockIcon className="w-4 h-4" />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Health Score */}
        <MetricWidget
          title="Health Score"
          value={data.metrics.healthScore}
          change={{ value: 8.5, type: 'increase', period: '30d' }}
          icon={<ChartBarIcon className="w-5 h-5 text-blue-600" />}
          description="Overall website health based on technical SEO factors"
          loading={isDataLoading}
        >
          <div className="space-y-3">
            <ProgressBar 
              value={data.metrics.healthScore} 
              max={100} 
              color="green" 
              showLabel 
              label="Score"
            />
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Critical Issues</span>
              <StatusBadge status="warning" size="sm">{data.metrics.audits.criticalIssues} found</StatusBadge>
            </div>
          </div>
        </MetricWidget>

        {/* Search Visibility */}
        <MetricWidget
          title="Search Visibility"
          value={data.metrics.searchVisibility}
          change={{ value: 12.3, type: 'increase', period: '30d' }}
          icon={<EyeIcon className="w-5 h-5 text-emerald-600" />}
          description="Percentage of search traffic your site captures"
          loading={isDataLoading}
        >
          <div className="space-y-2">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">7-day trend</div>
            <Sparkline data={data.trends.keywords} color="green" />
          </div>
        </MetricWidget>

        {/* Top Keywords */}
        <MetricWidget
          title="Tracked Keywords"
          value={data.metrics.keywords.total}
          change={{ value: data.metrics.keywords.improved, type: 'increase', period: '30d' }}
          icon={<MagnifyingGlassIcon className="w-5 h-5 text-purple-600" />}
          description="Total number of keywords being monitored"
          loading={isDataLoading}
        >
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400">Top 10 positions</span>
              <StatusBadge status="success" size="sm">124</StatusBadge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400">Position 1-3</span>
              <StatusBadge status="info" size="sm">89</StatusBadge>
            </div>
          </div>
        </MetricWidget>

        {/* Backlinks */}
        <MetricWidget
          title="Total Backlinks"
          value={data.metrics.backlinks.total}
          change={{ value: data.metrics.backlinks.newThisMonth, type: 'increase', period: '30d' }}
          icon={<LinkIcon className="w-5 h-5 text-indigo-600" />}
          description="Number of external sites linking to your website"
          loading={isDataLoading}
        >
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400">Referring domains</span>
              <span className="text-sm font-medium text-slate-900 dark:text-white">1.2K</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400">New this month</span>
              <StatusBadge status="success" size="sm">+{data.metrics.backlinks.newThisMonth}</StatusBadge>
            </div>
          </div>
        </MetricWidget>

        {/* Organic Traffic */}
        <MetricWidget
          title="Organic Traffic"
          value={data.metrics.traffic.organicVisitors}
          change={{ value: data.metrics.traffic.changePercent, type: 'increase', period: '30d' }}
          icon={<ArrowTrendingUpIcon className="w-5 h-5 text-emerald-600" />}
          description="Monthly visitors from organic search results"
          loading={isDataLoading}
        >
          <div className="space-y-2">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Monthly trend</div>
            <Sparkline data={data.trends.traffic} color="green" />
          </div>
        </MetricWidget>

        {/* Critical Issues */}
        <MetricWidget
          title="Critical Issues"
          value={data.metrics.audits.criticalIssues}
          change={{ value: -5, type: 'decrease', period: '7d' }}
          icon={<ExclamationTriangleIcon className="w-5 h-5 text-red-600" />}
          description="SEO issues that require immediate attention"
          loading={isDataLoading}
        >
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400">High priority</span>
              <StatusBadge status="error" size="sm">8</StatusBadge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400">Medium priority</span>
              <StatusBadge status="warning" size="sm">15</StatusBadge>
            </div>
          </div>
        </MetricWidget>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <DocumentMagnifyingGlassIcon className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-slate-900 dark:text-white">Run Site Audit</span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">Free</span>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center">
                  <MagnifyingGlassIcon className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-sm font-medium text-slate-900 dark:text-white">Add Keywords</span>
              </div>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Pro</span>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <UsersIcon className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-slate-900 dark:text-white">Analyze Competitors</span>
              </div>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Pro</span>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-900 dark:text-white">Site audit completed</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-900 dark:text-white">15 new backlinks detected</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">6 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-900 dark:text-white">Keyword ranking improved</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">1 day ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-900 dark:text-white">3 critical issues found</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Integration Placeholder */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center shadow-sm">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-emerald-500 rounded"></div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Google Integration</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Connect Google Search Console and PageSpeed Insights for real-time data
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            Connect
          </button>
        </div>
      </div>
    </div>
  )
}
