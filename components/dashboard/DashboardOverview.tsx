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
import DashboardEmptyState from './DashboardEmptyState'
import LatestAuditWidget from './LatestAuditWidget'

export default function DashboardOverview() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<any>(null)
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [gscConnected, setGscConnected] = useState(false)
  const [gscLoading, setGscLoading] = useState(false)
  const [gscError, setGscError] = useState<string | null>(null)

  // Fetch real dashboard stats
  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/dashboard/stats')
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setStats(data.stats)
          
          // Process recent activity from API data
          const activities = []
          
          // Add recent audits
          if (data.recentActivity?.audits && data.recentActivity.audits.length > 0) {
            for (const audit of data.recentActivity.audits) {
              const timeAgo = getTimeAgo(new Date(audit.createdAt))
              activities.push({
                type: audit.status === 'COMPLETED' ? 'audit-completed' : 'audit-started',
                message: audit.status === 'COMPLETED' 
                  ? `Site audit completed${audit.overallScore ? ` with score ${audit.overallScore}/100` : ''}`
                  : 'Site audit in progress',
                timestamp: timeAgo
              })
            }
          }
          
          // Add backlink activity
          if (data.stats?.backlinks?.new_this_month > 0) {
            activities.push({
              type: 'backlinks',
              message: `${data.stats.backlinks.new_this_month} new backlinks detected this month`,
              timestamp: 'This month'
            })
          }
          
          // Add keyword improvements
          if (data.stats?.keywords?.improved > 0) {
            activities.push({
              type: 'keyword-improvement',
              message: `${data.stats.keywords.improved} keywords improved`,
              timestamp: 'Last 30 days'
            })
          }
          
          setRecentActivity(activities.slice(0, 5))
        }
      }
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }
  
  // Helper function to format time ago
  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)
    
    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  // Check GSC connection status
  useEffect(() => {
    checkGscStatus()
  }, [])

  const checkGscStatus = async () => {
    try {
      const response = await fetch('/api/gsc/status')
      if (response.ok) {
        const data = await response.json()
        setGscConnected(data.connected)
      }
    } catch (error) {
      console.error('Failed to check GSC status:', error)
    }
  }

  const handleGscConnect = async () => {
    setGscLoading(true)
    setGscError(null)
    
    try {
      const response = await fetch('/api/gsc/connect')
      const data = await response.json()
      
      if (data.success && data.authUrl) {
        // Redirect to Google OAuth
        window.location.href = data.authUrl
      } else {
        setGscError(data.error || 'Failed to initiate connection')
      }
    } catch (error) {
      console.error('GSC Connect error:', error)
      setGscError('Network error. Please try again.')
    } finally {
      setGscLoading(false)
    }
  }

  const handleGscDisconnect = async () => {
    if (!confirm('Are you sure you want to disconnect Google Search Console?')) {
      return
    }
    
    setGscLoading(true)
    
    try {
      const response = await fetch('/api/gsc/status', { method: 'DELETE' })
      const data = await response.json()
      
      if (data.success) {
        setGscConnected(false)
        alert('Google Search Console disconnected successfully')
      } else {
        alert('Failed to disconnect: ' + data.error)
      }
    } catch (error) {
      console.error('GSC Disconnect error:', error)
      alert('Network error. Please try again.')
    } finally {
      setGscLoading(false)
    }
  }

  // Transform real stats into display format
  const data = stats ? {
    metrics: {
      healthScore: stats.health_score,
      searchVisibility: stats.search_visibility,
      keywords: {
        total: stats.keywords.total,
        improved: stats.keywords.improved,
        top10: stats.keywords.top10
      },
      backlinks: {
        total: stats.backlinks.total,
        newThisMonth: stats.backlinks.new_this_month,
        referringDomains: stats.backlinks.referring_domains
      },
      traffic: {
        organicVisitors: stats.traffic.organic_visitors,
        changePercent: stats.traffic.change_percent
      },
      audits: {
        criticalIssues: stats.audits.critical_issues,
        warnings: stats.audits.warnings,
        total: stats.audits.total
      }
    },
    trends: {
      keywords: [45, 52, 48, 61, 55, 67, 72, 58, 63, 71, 69, 76],
      traffic: [1200, 1350, 1180, 1420, 1380, 1650, 1480, 1590, 1720, 1650, 1780, 1850]
    }
  } : {
    metrics: {
      healthScore: 0,
      searchVisibility: 0,
      keywords: { total: 0, improved: 0, top10: 0 },
      backlinks: { total: 0, newThisMonth: 0, referringDomains: 0 },
      traffic: { organicVisitors: 0, changePercent: 0 },
      audits: { criticalIssues: 0, warnings: 0, total: 0 }
    },
    trends: {
      keywords: [],
      traffic: []
    }
  }

  const isDataLoading = loading

  // Check if user has data
  const hasProjects = stats?.projects > 0
  const hasAudits = stats?.audits?.total > 0
  
  // Don't replace entire page - integrate CTAs into metric cards instead

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">SEO Dashboard - Monitor & Optimize Performance</h1>
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
          {!hasAudits ? (
            <div className="space-y-3 text-center py-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Run your first SEO audit to see health metrics
              </p>
              <a href="/dashboard/audit">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  Run First Audit
                </button>
              </a>
            </div>
          ) : (
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
              <a href="/dashboard/audit">
                <button className="w-full mt-2 px-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  View Latest Audit →
                </button>
              </a>
            </div>
          )}
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
          {!gscConnected ? (
            <div className="space-y-3 text-center py-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Connect Google Search Console to view real search data
              </p>
              <button 
                onClick={handleGscConnect}
                disabled={gscLoading}
                className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium disabled:opacity-50"
              >
                {gscLoading ? 'Connecting...' : 'Set Up GSC'}
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">7-day trend</div>
              <Sparkline data={data.trends.keywords} color="green" />
            </div>
          )}
        </MetricWidget>

        {/* Top Keywords */}
        <MetricWidget
          title="Tracked Keywords"
          value={data.metrics.keywords.total}
          change={data.metrics.keywords.total > 0 ? { value: data.metrics.keywords.improved, type: 'increase', period: '30d' } : undefined}
          icon={<MagnifyingGlassIcon className="w-5 h-5 text-purple-600" />}
          description="Total number of keywords being monitored"
          loading={isDataLoading}
        >
          {data.metrics.keywords.total === 0 ? (
            <div className="space-y-3 text-center py-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Start tracking keyword rankings
              </p>
              <a href="/dashboard/keywords">
                <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                  Add Keywords
                </button>
              </a>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-400">Top 10 positions</span>
                <StatusBadge status="success" size="sm">{data.metrics.keywords.top10}</StatusBadge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-400">Improved (30d)</span>
                <StatusBadge status="info" size="sm">{data.metrics.keywords.improved}</StatusBadge>
              </div>
            </div>
          )}
        </MetricWidget>

        {/* Backlinks */}
        <MetricWidget
          title="Total Backlinks"
          value={data.metrics.backlinks.total}
          change={data.metrics.backlinks.total > 0 ? { value: data.metrics.backlinks.newThisMonth, type: 'increase', period: '30d' } : undefined}
          icon={<LinkIcon className="w-5 h-5 text-indigo-600" />}
          description="Number of external sites linking to your website"
          loading={isDataLoading}
        >
          {data.metrics.backlinks.total === 0 ? (
            <div className="space-y-3 text-center py-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Monitor your backlink profile
              </p>
              <a href="/dashboard/backlinks">
                <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                  View Backlinks
                </button>
              </a>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-400">Referring domains</span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">{data.metrics.backlinks.referringDomains}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-400">New this month</span>
                <StatusBadge status="success" size="sm">+{data.metrics.backlinks.newThisMonth}</StatusBadge>
              </div>
            </div>
          )}
        </MetricWidget>

        {/* Technical SEO - Replaces Organic Traffic */}
        <MetricWidget
          title="Technical SEO"
          value={hasAudits ? data.metrics.healthScore : 0}
          change={hasAudits ? { value: 8.5, type: 'increase', period: '7d' } : undefined}
          icon={<ChartBarIcon className="w-5 h-5 text-blue-600" />}
          description="Technical optimization score from latest audit"
          loading={isDataLoading}
        >
          {!hasAudits ? (
            <div className="space-y-3 text-center py-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Run audit to see technical metrics
              </p>
              <a href="/dashboard/audit">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  Run Audit
                </button>
              </a>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-400">SEO Score</span>
                <StatusBadge status={data.metrics.healthScore >= 80 ? 'success' : 'warning'} size="sm">
                  {data.metrics.healthScore}/100
                </StatusBadge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-400">Performance</span>
                <StatusBadge status="info" size="sm">Good</StatusBadge>
              </div>
            </div>
          )}
        </MetricWidget>

        {/* All Issues */}
        <MetricWidget
          title="SEO Issues"
          value={data.metrics.audits.total}
          change={hasAudits ? { value: -5, type: 'decrease', period: '7d' } : undefined}
          icon={<ExclamationTriangleIcon className="w-5 h-5 text-red-600" />}
          description="Issues found in latest audit"
          loading={isDataLoading}
        >
          {!hasAudits ? (
            <div className="space-y-3 text-center py-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Run audit to identify SEO issues
              </p>
              <a href="/dashboard/audit">
                <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                  Run First Audit
                </button>
              </a>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Critical</span>
                <StatusBadge status="error" size="sm">{data.metrics.audits.criticalIssues}</StatusBadge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Warnings</span>
                <StatusBadge status="warning" size="sm">{data.metrics.audits.warnings}</StatusBadge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Notices</span>
                <StatusBadge status="info" size="sm">{Math.max(0, data.metrics.audits.total - data.metrics.audits.criticalIssues - data.metrics.audits.warnings)}</StatusBadge>
              </div>
              <a href="/dashboard/audit">
                <button className="w-full mt-3 px-3 py-2 text-xs font-medium bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                  View All Issues →
                </button>
              </a>
            </div>
          )}
        </MetricWidget>
      </div>

      {/* Latest Audit Widget - Removed to avoid duplication with Critical Issues card */}

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <a href="/dashboard/audit" className="block">
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all group">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/40 transition-colors">
                    <DocumentMagnifyingGlassIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">Run Site Audit</span>
                </div>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Free</span>
              </button>
            </a>
            
            <a href="/dashboard/keywords" className="block">
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all group">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/40 transition-colors">
                    <MagnifyingGlassIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">Add Keywords</span>
                </div>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Pro</span>
              </button>
            </a>
            
            <a href="/dashboard/competitors" className="block">
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-purple-300 dark:hover:border-purple-700 transition-all group">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-900/40 transition-colors">
                    <UsersIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">Analyze Competitors</span>
                </div>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Pro</span>
              </button>
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity && recentActivity.length > 0 ? (
              recentActivity.map((activity: any, index: number) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'audit-completed' ? 'bg-emerald-500' :
                    activity.type === 'backlinks' ? 'bg-blue-500' :
                    activity.type === 'keyword-improvement' ? 'bg-yellow-500' :
                    activity.type === 'critical-issue' ? 'bg-red-500' :
                    'bg-slate-400'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-900 dark:text-white">{activity.message}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{activity.timestamp}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No recent activity. Run your first audit to get started!
                </p>
                <a href="/dashboard/audit" className="inline-block mt-3">
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    Run First Audit
                  </button>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Google Search Console Integration */}
      <div className={`bg-gradient-to-r rounded-xl border p-6 ${
        gscConnected 
          ? 'from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border-emerald-200 dark:border-emerald-800'
          : 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center shadow-sm">
              {gscConnected ? (
                <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-emerald-500 rounded"></div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Google Search Console
                {gscConnected && <span className="ml-2 text-sm font-normal text-emerald-600 dark:text-emerald-400">● Connected</span>}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {gscConnected 
                  ? 'Access real-time search analytics and performance data'
                  : 'Connect to view search analytics, impressions, and click data'
                }
              </p>
              {gscError && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                  {gscError}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {gscConnected ? (
              <button 
                onClick={handleGscDisconnect}
                disabled={gscLoading}
                className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium disabled:opacity-50"
              >
                {gscLoading ? 'Disconnecting...' : 'Disconnect'}
              </button>
            ) : (
              <button 
                onClick={handleGscConnect}
                disabled={gscLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50"
              >
                {gscLoading ? 'Connecting...' : 'Connect'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
