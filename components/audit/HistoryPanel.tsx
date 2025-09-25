"use client";
import { useEffect, useState, useMemo } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { cn } from '../../lib/utils'

interface HistoryItem {
  id: string
  url: string
  status: string
  score: number | null
  scores?: { overall:number; performance:number; accessibility:number; seo:number; best_practices:number }
  createdAt: string
  completedAt?: string | null
  error?: string | null
  // optional full result when expanded fetch
  result?: any
}

export function HistoryPanel({ currentUrl }: { currentUrl?: string }) {
  const [items, setItems] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string|undefined>()
  const [selectedCurrent, setSelectedCurrent] = useState<string|undefined>()
  const [selectedBaseline, setSelectedBaseline] = useState<string|undefined>()
  const [diff, setDiff] = useState<{newIssues:number;resolvedIssues:number;unchanged:number}|undefined>()
  const [loadingDiff, setLoadingDiff] = useState(false)

  useEffect(() => {
    if (!currentUrl) return
    setLoading(true)
    fetch(`/api/seo-audit/history?url=${encodeURIComponent(currentUrl)}`)
      .then(r => r.json())
      .then(data => {
        setItems(data.items||[])
        setError(undefined)
      })
      .catch(e => setError(e.message||'Failed to load history'))
      .finally(()=>setLoading(false))
  }, [currentUrl])

  // Fetch full result for an auditRunId
  const fetchFull = async (id: string): Promise<any|null> => {
    const row = items.find(i=>i.id===id)
    if (row?.result) return row.result
    try {
      const res = await fetch(`/api/seo-audit/history?auditId=${id}`) // fallback not implemented; using existing data only
      // (In a future enhancement create dedicated endpoint to fetch single run result)
      return null
    } catch { return null }
  }

  useEffect(() => {
    const run = async () => {
      if (!selectedCurrent || !selectedBaseline) { setDiff(undefined); return }
      setLoadingDiff(true)
      // Current run is the first (selectedCurrent), baseline second
      // Attempt to use already persisted full results if present
      try {
        const currentRow = items.find(i=>i.id===selectedCurrent)
        const prevRow = items.find(i=>i.id===selectedBaseline)
        const currentIssues = (currentRow as any)?.result?.comprehensiveResults?.issues || []
        const prevIssues = (prevRow as any)?.result?.comprehensiveResults?.issues || []
        if (currentIssues.length || prevIssues.length) {
          const { diffIssues } = await import('../../lib/diff/issues')
          const d = diffIssues(currentIssues, prevIssues)
          setDiff({ newIssues: d.newIssues.length, resolvedIssues: d.resolvedIssues.length, unchanged: d.unchanged.length })
        } else {
          setDiff(undefined)
        }
      } catch {
        setDiff(undefined)
      } finally { setLoadingDiff(false) }
    }
    run()
  }, [selectedCurrent, selectedBaseline, items])

  // Build simple sparkline from scores
  const sparkline = (list: HistoryItem[]) => {
    const points = list.filter(i=>i.score!=null).slice().reverse() // chronological
    if (!points.length) return <div className="text-xs text-muted-foreground">No data</div>
    const values = points.map(p=>p.score as number)
    const min = Math.min(...values)
    const max = Math.max(...values)
    const range = Math.max(1, max-min)
    const width = 120
    const height = 30
    const step = width / Math.max(1, points.length-1)
    const path = points.map((p,idx)=>{
      const x = idx*step
      const y = height - (( (p.score as number) - min)/range)*height
      return `${idx===0?'M':'L'}${x.toFixed(1)},${y.toFixed(1)}`
    }).join(' ')
    return (
      <svg width={width} height={height} className="overflow-visible">
        <path d={path} fill="none" stroke="currentColor" strokeWidth={2} className="text-primary" />
      </svg>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20 border-2 border-slate-200 dark:border-slate-700">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-3">
          <div className="p-2 bg-blue-500 rounded-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          Audit History (last {items.length} runs)
          {items.length > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {items.filter(i => i.status === 'completed').length} completed
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {loading && (
          <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
            <span className="text-sm text-blue-700 dark:text-blue-300">Loading audit history...</span>
          </div>
        )}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-red-700 dark:text-red-300">Error loading history</span>
            </div>
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
          </div>
        )}
        
        {/* Score Trend Chart */}
        {items.length > 0 && (
          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">Score Trend</h4>
            <div className="flex items-end justify-center">
              {sparkline(items)}
            </div>
          </div>
        )}
        
        {/* Audit History List */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {items.map((i, index) => {
            const active = i.id === selectedCurrent || i.id === selectedBaseline
            const isRecent = index < 3
            const scoreColor = i.score 
              ? i.score >= 90 ? 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400'
              : i.score >= 70 ? 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400'
              : 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400'
              : 'text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400'
            
            return (
              <button 
                type="button" 
                key={i.id} 
                onClick={() => {
                  if (!selectedCurrent) setSelectedCurrent(i.id)
                  else if (!selectedBaseline && i.id !== selectedCurrent) setSelectedBaseline(i.id)
                  else if (i.id === selectedCurrent) setSelectedCurrent(undefined)
                  else if (i.id === selectedBaseline) setSelectedBaseline(undefined)
                }}
                className={`w-full group relative overflow-hidden rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                  active 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg' 
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md'
                }`}
              >
                {isRecent && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-700">
                      Recent
                    </Badge>
                  </div>
                )}
                
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-sm text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                        {i.id.slice(0,8)}
                      </span>
                      {i.status === 'completed' && (
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-slate-700 dark:text-slate-200">
                        {new Date(i.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      
                      {i.scores && (
                        <div className="flex gap-2 flex-wrap">
                          <span className="text-xs text-slate-500 dark:text-slate-400">SEO: {i.scores.seo}</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">Perf: {i.scores.performance}</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">A11y: {i.scores.accessibility}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <div className={`px-3 py-1.5 rounded-full text-sm font-semibold ${scoreColor}`}>
                      {i.score ?? '—'}
                    </div>
                    
                    {i.status !== 'completed' && (
                      <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 rounded-full uppercase tracking-wide">
                        {i.status}
                      </span>
                    )}
                  </div>
                </div>
                
                {active && (
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                )}
              </button>
            )
          })}
          
          {!items.length && !loading && !error && (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">No audit history</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Run your first audit to see results here</p>
            </div>
          )}
        </div>
        
        {/* Instructions */}
        {/* Enhanced Compare Instructions */}
        {items.length > 1 && (
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border border-blue-200 dark:border-blue-700 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold text-blue-700 dark:text-blue-300">Compare Audits</span>
            </div>
            <p className="text-sm text-blue-600 dark:text-blue-300 mb-2">
              Select two audit runs to see detailed improvements and changes between them
            </p>
            <div className="text-xs text-blue-500 dark:text-blue-400">
              👆 Click on any two audit cards below to compare results
              {selectedCurrent && !selectedBaseline && (
                <span className="block mt-1 text-green-600 dark:text-green-400 font-medium">
                  ✅ First audit selected. Click another audit to compare.
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Enhanced Comparison Results */}
        {(selectedCurrent && selectedBaseline) && (
          <div className="p-6 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-900/10 dark:via-blue-900/10 dark:to-purple-900/10 border-2 border-green-300 dark:border-green-700 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-green-800 dark:text-green-200">Detailed Audit Comparison</h4>
                  <p className="text-sm text-green-600 dark:text-green-400">Analyzing improvements and changes</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedCurrent(undefined);
                  setSelectedBaseline(undefined);
                  setDiff(undefined);
                }}
                className="px-3 py-1 bg-slate-500 hover:bg-slate-600 text-white rounded text-xs transition-colors"
              >
                Reset
              </button>
            </div>
            
            {loadingDiff && (
              <div className="flex items-center gap-3 p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                <span className="text-sm text-blue-700 dark:text-blue-300">Analyzing differences between audit runs...</span>
              </div>
            )}
            
            {diff && !loadingDiff && (
              <div className="space-y-4">
                {/* Audit Run Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border-l-4 border-blue-500">
                    <h5 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">📊 Current Run</h5>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                      ID: {selectedCurrent.slice(0, 8)} • {new Date(items.find(i => i.id === selectedCurrent)?.createdAt || '').toLocaleDateString()}
                    </div>
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      Score: {items.find(i => i.id === selectedCurrent)?.score || 'N/A'}
                    </div>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border-l-4 border-purple-500">
                    <h5 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">📈 Baseline Run</h5>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                      ID: {selectedBaseline.slice(0, 8)} • {new Date(items.find(i => i.id === selectedBaseline)?.createdAt || '').toLocaleDateString()}
                    </div>
                    <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      Score: {items.find(i => i.id === selectedBaseline)?.score || 'N/A'}
                    </div>
                  </div>
                </div>

                {/* Issues Analysis */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/20 dark:to-green-900/10 border border-green-200 dark:border-green-700 rounded-lg">
                    <div className="text-3xl font-bold text-green-700 dark:text-green-400">{diff.resolvedIssues}</div>
                    <div className="text-sm font-medium text-green-600 dark:text-green-500 mb-1">Issues Fixed</div>
                    <div className="text-xs text-green-500 dark:text-green-600">🎉 Great progress!</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/20 dark:to-red-900/10 border border-red-200 dark:border-red-700 rounded-lg">
                    <div className="text-3xl font-bold text-red-700 dark:text-red-400">{diff.newIssues}</div>
                    <div className="text-sm font-medium text-red-600 dark:text-red-500 mb-1">New Issues</div>
                    <div className="text-xs text-red-500 dark:text-red-600">⚠️ Needs attention</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg">
                    <div className="text-3xl font-bold text-slate-700 dark:text-slate-300">{diff.unchanged}</div>
                    <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Unchanged</div>
                    <div className="text-xs text-slate-500 dark:text-slate-500">➖ Persistent</div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-700 rounded-lg">
                  <h5 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-3 flex items-center gap-2">
                    📈 Performance Analysis
                  </h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div className="text-center">
                      <div className={`text-lg font-bold ${
                        ((items.find(i => i.id === selectedCurrent)?.score || 0) - 
                         (items.find(i => i.id === selectedBaseline)?.score || 0)) > 0 
                          ? 'text-green-600 dark:text-green-400' 
                          : ((items.find(i => i.id === selectedCurrent)?.score || 0) - 
                             (items.find(i => i.id === selectedBaseline)?.score || 0)) < 0
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}>
                        {((items.find(i => i.id === selectedCurrent)?.score || 0) - 
                          (items.find(i => i.id === selectedBaseline)?.score || 0)) > 0 ? '+' : ''}
                        {((items.find(i => i.id === selectedCurrent)?.score || 0) - 
                          (items.find(i => i.id === selectedBaseline)?.score || 0))}
                      </div>
                      <div className="text-indigo-700 dark:text-indigo-300 text-xs">Score Change</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                        {diff.resolvedIssues > diff.newIssues ? '📈' : diff.newIssues > diff.resolvedIssues ? '📉' : '➖'}
                      </div>
                      <div className="text-purple-700 dark:text-purple-300 text-xs">Overall Trend</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                        {Math.abs(diff.newIssues - diff.resolvedIssues)}
                      </div>
                      <div className="text-orange-700 dark:text-orange-300 text-xs">Net Change</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-teal-600 dark:text-teal-400">
                        {Math.round(((diff.resolvedIssues - diff.newIssues) / Math.max(1, diff.newIssues + diff.resolvedIssues + diff.unchanged)) * 100)}%
                      </div>
                      <div className="text-teal-700 dark:text-teal-300 text-xs">Improvement Rate</div>
                    </div>
                  </div>
                </div>

                {/* Actionable Insights */}
                <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-700 rounded-lg">
                  <h5 className="font-semibold text-amber-900 dark:text-amber-100 mb-2 flex items-center gap-2">
                    💡 Actionable Insights
                  </h5>
                  <div className="text-sm text-amber-800 dark:text-amber-200">
                    {diff.resolvedIssues > diff.newIssues ? 
                      `🎉 Excellent progress! You've successfully resolved ${diff.resolvedIssues} issues while only introducing ${diff.newIssues} new ones. Your optimization efforts are paying off. Keep monitoring and addressing any new issues that arise.` :
                      diff.newIssues > diff.resolvedIssues ? 
                      `⚠️ Mixed results detected. While you've resolved ${diff.resolvedIssues} issues, ${diff.newIssues} new problems have emerged. Focus on identifying what caused the new issues and prioritize fixing them while maintaining your previous improvements.` :
                      `➖ Stable performance with balanced changes. You've resolved ${diff.resolvedIssues} issues but ${diff.newIssues} new ones appeared. Consider reviewing your optimization strategy and focus on the ${diff.unchanged} persistent issues that remain.`
                    }
                  </div>
                </div>

                {/* Next Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
                    <h6 className="font-medium text-blue-800 dark:text-blue-200 mb-1 text-sm">🎯 Next Steps</h6>
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      {diff.newIssues > 0 ? 
                        `Priority: Address ${diff.newIssues} new issues to prevent regression.` :
                        'Focus on optimizing performance and addressing remaining issues.'
                      }
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
                    <h6 className="font-medium text-green-800 dark:text-green-200 mb-1 text-sm">📊 Monitor Progress</h6>
                    <p className="text-xs text-green-700 dark:text-green-300">
                      Run regular audits to track improvements and catch new issues early.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!diff && !loadingDiff && (
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  💡 Unable to compare these audits. Both runs must be completed successfully and contain detailed results for comparison.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
