import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/prisma'

// Force dynamic rendering since this route reads from request.url
export const dynamic = 'force-dynamic'

/**
 * GET /api/seo-audit/export/pdf?auditId=...
 * Returns a fully self-contained HTML report suitable for printing/saving as PDF.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const auditId = searchParams.get('auditId')
    if (!auditId) return NextResponse.json({ error: 'auditId required' }, { status: 400 })

    const auditRunModel = (prisma as any).auditRun
    if (!auditRunModel) {
      return NextResponse.json({ error: 'storage unavailable' }, { status: 501 })
    }

    const run = await auditRunModel.findUnique({
      where: { id: auditId },
      select: { id: true, result: true, createdAt: true }
    })

    if (!run) return NextResponse.json({ error: 'not found' }, { status: 404 })

    const html = generateReportHTML(run.result, auditId, run.createdAt)
    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `inline; filename="seo-audit-report-${auditId}.html"`,
        'Cache-Control': 'no-store'
      }
    })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'failed' }, { status: 500 })
  }
}

function generateReportHTML(result: any, auditId: string, createdAt: Date | string): string {
  const url = result?.url || result?.comprehensiveResults?.url || 'N/A'
  const comp = result?.comprehensiveResults || {}
  const scores = comp?.scores || {}
  const stats = comp?.stats || {}
  const issues = comp?.issues || []
  const quickWins = comp?.quick_wins || []
  const created = new Date(createdAt)

  const scoreClass = (n: number) => n >= 80 ? 'score-good' : n >= 60 ? 'score-fair' : 'score-poor'
  const fmt = (v: any) => (v ?? v === 0) ? String(v) : '-'

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>SEO Audit Report - ${escapeHtml(url)}</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; margin:0; color:#111827; background:#ffffff; }
    .container { max-width: 980px; margin: 0 auto; padding: 24px; }
    .header { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color:#fff; padding: 28px; border-radius: 12px; }
    .header h1 { margin:0 0 4px; font-size: 28px; }
    .header .meta { opacity: .9; font-size: 14px; }

    .grid { display:grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap:16px; margin: 24px 0; }
    .card { background:#f9fafb; border:1px solid #e5e7eb; border-radius: 10px; padding:16px; }
    .card h3 { margin:0 0 8px; font-size: 14px; color:#374151; font-weight:600; }
    .score { font-size: 28px; font-weight: 800; margin: 6px 0; }
    .score-good { color:#10b981; }
    .score-fair { color:#f59e0b; }
    .score-poor { color:#ef4444; }
    .muted { color:#6b7280; font-size: 12px; }

    .section { margin: 28px 0; border:1px solid #e5e7eb; border-radius: 10px; }
    .section h2 { margin:0; padding:14px 16px; background:#f3f4f6; border-bottom:1px solid #e5e7eb; font-size:18px; }
    .section .content { padding:16px; }

    .metrics { display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 12px; }
    .row { display:flex; justify-content:space-between; border-bottom:1px solid #f3f4f6; padding:8px 0; }
    .row:last-child { border-bottom:0; }

    .list { list-style:none; padding:0; margin:0; }
    .issue { background:#fef2f2; border-left:4px solid #ef4444; padding:10px 12px; margin:8px 0; border-radius: 6px; }
    .quick { background:#eff6ff; border-left:4px solid #3b82f6; padding:10px 12px; margin:8px 0; border-radius: 6px; }
    .small { font-size: 12px; color:#374151; }

    @media print {
      .container { max-width: 100%; padding: 0; }
      .header { border-radius: 0; }
      a { color: inherit; text-decoration: none; }
    }
  </style>
  <base target="_blank" />
  <meta name="robots" content="noindex" />
  <meta name="color-scheme" content="light" />
  <meta name="x-generated" content="seo-audit" />
  <meta name="x-audit-id" content="${escapeHtml(auditId)}" />
  <meta name="x-generated-at" content="${created.toISOString()}" />
  <meta name="x-url" content="${escapeHtml(url)}" />
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>SEO Audit Report</h1>
      <div class="meta">Website: <strong>${escapeHtml(url)}</strong></div>
      <div class="meta">Audit ID: <strong>${escapeHtml(auditId)}</strong> • Generated: ${created.toLocaleString()}</div>
    </div>

    <div class="grid">
      <div class="card">
        <h3>Overall Score</h3>
        <div class="score ${scoreClass(Number(result?.score ?? scores.overall ?? 0))}">${fmt(result?.score ?? scores.overall ?? 0)}</div>
        <div class="muted">0-59 Poor • 60-79 Fair • 80-100 Good</div>
      </div>
      <div class="card">
        <h3>Performance</h3>
        <div class="score ${scoreClass(Number(scores.performance ?? 0))}">${fmt(scores.performance ?? 0)}</div>
      </div>
      <div class="card">
        <h3>Accessibility</h3>
        <div class="score ${scoreClass(Number(scores.accessibility ?? 0))}">${fmt(scores.accessibility ?? 0)}</div>
      </div>
      <div class="card">
        <h3>SEO</h3>
        <div class="score ${scoreClass(Number(scores.seo ?? 0))}">${fmt(scores.seo ?? 0)}</div>
      </div>
    </div>

    <div class="section">
      <h2>Page Metrics</h2>
      <div class="content">
        <div class="metrics">
          <div class="row"><span>Word count</span><strong>${fmt(stats.word_count)}</strong></div>
          <div class="row"><span>Reading time (min)</span><strong>${fmt(stats.reading_time_min)}</strong></div>
          <div class="row"><span>Images</span><strong>${fmt(stats.images_count)}</strong></div>
          <div class="row"><span>Scripts</span><strong>${fmt(stats.scripts_count)}</strong></div>
          <div class="row"><span>Internal links</span><strong>${fmt(stats.internal_links)}</strong></div>
          <div class="row"><span>External links</span><strong>${fmt(stats.external_links)}</strong></div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>Quick Wins (${quickWins.length})</h2>
      <div class="content">
        ${quickWins.length === 0 ? '<div class="muted">None found</div>' : ''}
        <ul class="list">
          ${quickWins.slice(0, 15).map((q:any) => `
            <li class="quick">
              <div><strong>${escapeHtml(q.title || 'Quick win')}</strong></div>
              ${q.description ? `<div class="small">${escapeHtml(q.description)}</div>` : ''}
              ${q.location ? `<div class="small">Location: ${escapeHtml(q.location)}</div>` : ''}
            </li>
          `).join('')}
        </ul>
        ${quickWins.length > 15 ? `<div class="muted">Showing first 15 of ${quickWins.length}</div>` : ''}
      </div>
    </div>

    <div class="section">
      <h2>Priority Issues (${issues.length})</h2>
      <div class="content">
        ${issues.length === 0 ? '<div class="muted">No issues detected</div>' : ''}
        <ul class="list">
          ${issues.slice(0, 20).map((i:any) => `
            <li class="issue">
              <div><strong>${escapeHtml(i.title || 'Issue')}</strong> ${i.severity ? `<span class="small">(${escapeHtml(String(i.severity))})</span>` : ''}</div>
              ${i.description ? `<div class="small">${escapeHtml(i.description)}</div>` : ''}
              ${i.recommendation ? `<div class="small">Recommendation: ${escapeHtml(i.recommendation)}</div>` : ''}
              ${i.location ? `<div class="small">Location: ${escapeHtml(i.location)}</div>` : ''}
            </li>
          `).join('')}
        </ul>
        ${issues.length > 20 ? `<div class="muted">Showing first 20 of ${issues.length}</div>` : ''}
      </div>
    </div>

    <div class="muted">Generated by SEO Audit • ${created.toLocaleString()}</div>
  </div>
</body>
</html>`
}

function escapeHtml(input: any): string {
  const s = String(input ?? '')
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}