import React from 'react'
import { prisma } from '../../../lib/prisma'

interface SharePageProps { params: { token: string } }

export const dynamic = 'force-dynamic'

async function getData(token: string) {
  if ((prisma as any).publicShare === undefined) return null
  const share = await (prisma as any).publicShare.findUnique({
    where: { token },
    select: { token:true, expiresAt:true, auditRun: { select: { id:true, url:true, status:true, score:true, result:true, createdAt:true, completedAt:true } } }
  })
  if (!share) return null
  if (share.expiresAt && new Date(share.expiresAt) < new Date()) return null
  return share
}

export default async function SharePage({ params }: SharePageProps) {
  const data = await getData(params.token)
  if (!data) return <div className="p-10 max-w-2xl mx-auto"><h1 className="text-2xl font-semibold mb-4">Link Invalid or Expired</h1><p className="text-muted-foreground">Request a new share link from the dashboard.</p></div>
  const run = data.auditRun
  const scores = run.result?.comprehensiveResults?.scores || run.result?.scores || {}
  const issues = run.result?.comprehensiveResults?.issues || []
  const quick = run.result?.comprehensiveResults?.quick_wins || []
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <header>
        <h1 className="text-3xl font-bold">SEO Audit (Shared)</h1>
        <p className="text-sm text-muted-foreground">Read-only view. Generated {new Date(run.createdAt).toLocaleString()} for {run.url}</p>
      </header>
      <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {['overall','performance','accessibility','seo','best_practices'].map(key => (
          <div key={key} className="p-4 border rounded text-center">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">{key.replace('_',' ')}</div>
            <div className="text-xl font-semibold">{scores?.[key as keyof typeof scores] ?? '—'}</div>
          </div>
        ))}
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Quick Wins ({quick.length})</h2>
        <ul className="space-y-2 text-sm">
          {quick.map((q:any,i:number)=>(<li key={i} className="p-3 border rounded"><span className="font-medium">{q.title}</span> – {q.description}</li>))}
          {!quick.length && <li className="text-muted-foreground">None</li>}
        </ul>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Issues ({issues.length})</h2>
        <ul className="space-y-2 text-sm">
          {issues.slice(0,50).map((iss:any,i:number)=>(<li key={i} className="p-3 border rounded"><span className="font-medium">[{iss.severity}] {iss.title}</span><br />{iss.description}</li>))}
          {issues.length>50 && <li className="text-xs text-muted-foreground">Truncated to first 50 issues.</li>}
        </ul>
      </section>
    </div>
  )
}