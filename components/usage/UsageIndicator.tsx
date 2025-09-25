"use client";
import React, { useEffect, useState } from 'react'

interface UsageData {
  auditsThisMonth: number
  siteCrawlsThisMonth: number
  limits: { audits: number; siteCrawls: number }
  warnings?: { audits: string; siteCrawls: string }
}

export default function UsageIndicator(){
  const [data, setData] = useState<UsageData | null>(null)
  const [error, setError] = useState<string|null>(null)

  useEffect(()=>{
    let mounted = true
    fetch('/api/usage').then(r=>r.json()).then(j=>{ if(mounted && !j.error) setData(j); else if(mounted && j.error) setError(j.error) }).catch(e=>{ if(mounted) setError(e.message) })
    return ()=>{ mounted = false }
  },[])

  if (error) return <span className="text-xs text-red-500">Usage load error</span>
  if (!data) return <span className="text-xs text-muted-foreground animate-pulse">Loading usage…</span>
  const auditPct = Math.min(100, Math.round(data.auditsThisMonth / data.limits.audits * 100))
  const crawlPct = Math.min(100, Math.round(data.siteCrawlsThisMonth / data.limits.siteCrawls * 100))
  const colorFor = (level?: string) => {
    switch(level){
      case 'high': return 'bg-yellow-400'
      case 'near-limit': return 'bg-orange-500'
      case 'exceeded': return 'bg-red-600'
      default: return 'bg-blue-500'
    }
  }
  const crawlColorFor = (level?: string) => {
    switch(level){
      case 'high': return 'bg-yellow-400'
      case 'near-limit': return 'bg-orange-500'
      case 'exceeded': return 'bg-red-600'
      default: return 'bg-emerald-500'
    }
  }
  return (
    <div className="flex items-center gap-3 text-xs" aria-label="Usage consumption" role="group">
      <div className="flex items-center gap-1" title={`Audits: ${data.auditsThisMonth}/${data.limits.audits}`} aria-label={`Audits used ${data.auditsThisMonth} of ${data.limits.audits}`} role="meter" aria-valuenow={auditPct} aria-valuemin={0} aria-valuemax={100}>
        <span className="font-medium">Audits</span>
        <div className="w-20 h-2 bg-slate-200 rounded overflow-hidden"><div className={`h-full ${colorFor(data.warnings?.audits)}`} style={{width: auditPct+'%'}} /></div>
        <span>{data.auditsThisMonth}/{data.limits.audits}</span>
      </div>
      <div className="flex items-center gap-1" title={`Site Crawls: ${data.siteCrawlsThisMonth}/${data.limits.siteCrawls}`} aria-label={`Site crawls used ${data.siteCrawlsThisMonth} of ${data.limits.siteCrawls}`} role="meter" aria-valuenow={crawlPct} aria-valuemin={0} aria-valuemax={100}>
        <span className="font-medium">Crawls</span>
        <div className="w-16 h-2 bg-slate-200 rounded overflow-hidden"><div className={`h-full ${crawlColorFor(data.warnings?.siteCrawls)}`} style={{width: crawlPct+'%'}} /></div>
        <span>{data.siteCrawlsThisMonth}/{data.limits.siteCrawls}</span>
      </div>
    </div>
  )
}
