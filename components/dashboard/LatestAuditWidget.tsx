'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  ExternalLink,
  TrendingUp,
  Award,
  Clock
} from 'lucide-react'
import Link from 'next/link'

interface LatestAuditProps {
  audit: {
    id: string
    url: string
    score: number
    completedAt: string
    status: string
    topIssues: Array<{
      id: string
      title: string
      description: string
      severity: string
      type: string
      fixed: boolean
    }>
    quickWins: number
    totalIssues: number
  }
}

export default function LatestAuditWidget({ audit }: LatestAuditProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500'
    if (score >= 70) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getScoreGradient = (score: number) => {
    if (score >= 90) return 'from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-green-200 dark:border-green-700'
    if (score >= 70) return 'from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 border-yellow-200 dark:border-yellow-700'
    return 'from-red-50 to-pink-50 dark:from-red-900/10 dark:to-pink-900/10 border-red-200 dark:border-red-700'
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity.toUpperCase()) {
      case 'CRITICAL':
        return <Badge variant="destructive" className="text-xs">Critical</Badge>
      case 'HIGH':
        return <Badge variant="destructive" className="text-xs bg-orange-500">High</Badge>
      case 'MEDIUM':
        return <Badge variant="secondary" className="text-xs">Medium</Badge>
      default:
        return <Badge variant="outline" className="text-xs">Low</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffHours < 1) return 'Just now'
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffHours < 48) return 'Yesterday'
    return date.toLocaleDateString()
  }

  return (
    <Card className={`bg-gradient-to-br ${getScoreGradient(audit.score)} border-2`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Latest SEO Audit
            </CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Clock className="h-3 w-3" />
              {formatDate(audit.completedAt)}
            </CardDescription>
          </div>
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(audit.score)}`}>
              {audit.score}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Score</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {audit.totalIssues}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Issues Found</div>
          </div>
          <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-emerald-600">
              {audit.quickWins}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Quick Wins</div>
          </div>
          <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {audit.topIssues.filter(i => i.fixed).length}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Fixed</div>
          </div>
        </div>

        {/* Top Issues */}
        {audit.topIssues.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              Top Issues
            </h4>
            <div className="space-y-2">
              {audit.topIssues.slice(0, 3).map((issue) => (
                <div
                  key={issue.id}
                  className="flex items-start justify-between gap-2 p-2 bg-white/50 dark:bg-slate-800/50 rounded"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {getSeverityBadge(issue.severity)}
                      <span className="text-xs font-medium text-slate-900 dark:text-white truncate">
                        {issue.title}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-1">
                      {issue.description}
                    </p>
                  </div>
                  {issue.fixed && (
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Link href={`/dashboard/audit?domain=${encodeURIComponent(audit.url)}`} className="flex-1">
            <Button variant="default" size="sm" className="w-full">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Full Report
            </Button>
          </Link>
          <Link href="/dashboard/audit" className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              Run New Audit
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
